import { createHash } from 'crypto';
import { eq } from 'drizzle-orm';
import OpenAI from 'openai';
import { db } from '@/db/index';
import { chatRateLimits } from '@/db/schema';
import { getProfile, getRoles, getSkillGroups } from '@/db/queries';

const RATE_LIMIT = 5;
const WINDOW_HOURS = 24;
const MAX_INPUT_LENGTH = 500;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function hashIp(ip: string): string {
  return createHash('sha256').update(ip + (process.env.IP_SALT ?? 'default-salt')).digest('hex');
}

function getClientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

async function checkRateLimit(ipHash: string): Promise<{ allowed: boolean; remaining: number }> {
  const now = new Date();
  const windowCutoff = new Date(now.getTime() - WINDOW_HOURS * 60 * 60 * 1000);

  const rows = await db
    .select()
    .from(chatRateLimits)
    .where(
      eq(chatRateLimits.ip_hash, ipHash)
    );

  const existing = rows[0];

  if (!existing || existing.window_start < windowCutoff) {
    await db
      .insert(chatRateLimits)
      .values({ ip_hash: ipHash, count: 1, window_start: now })
      .onConflictDoUpdate({
        target: chatRateLimits.ip_hash,
        set: { count: 1, window_start: now },
      });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (existing.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  await db
    .update(chatRateLimits)
    .set({ count: existing.count + 1 })
    .where(eq(chatRateLimits.ip_hash, ipHash));

  return { allowed: true, remaining: RATE_LIMIT - existing.count - 1 };
}

function buildSystemPrompt(
  profile: Awaited<ReturnType<typeof getProfile>>,
  roles: Awaited<ReturnType<typeof getRoles>>,
  skillGroups: Awaited<ReturnType<typeof getSkillGroups>>
): string {
  const profileText = profile
    ? [
        `Name: James Horrigan`,
        `Titles: ${profile.title?.join(', ')}`,
        `Location: ${profile.location}`,
        `Summary: ${profile.summary}`,
        `Career summary: ${profile.career_summary}`,
        `GitHub: ${profile.github_url}`,
        `LinkedIn: ${profile.linkedin_url}`,
      ].join('\n')
    : '';

  const rolesText = roles
    .map(
      (r) =>
        `- ${r.role} at ${r.company} (${r.period}): ${r.summary ?? ''}` +
        (r.highlights?.length ? `\n  Highlights: ${r.highlights.join('; ')}` : '') +
        (r.skills?.length ? `\n  Skills used: ${r.skills.map((s) => s.name).join(', ')}` : '')
    )
    .join('\n');

  const skillsText = skillGroups
    .map((g) => `${g.title}: ${g.items.join(', ')}`)
    .join('\n');

  return `You are a digital twin of James Horrigan, a software engineer. Answer questions about James concisely and professionally, based only on the data below. If asked about something not covered, say you don't have that information. Do not speculate or invent details. Keep responses to 2-4 sentences unless a longer answer is clearly needed.

PROFILE:
${profileText}

CAREER HISTORY:
${rolesText}

SKILLS:
${skillsText}`;
}

export async function POST(req: Request) {
  const ipHash = hashIp(getClientIp(req));

  const { allowed, remaining } = await checkRateLimit(ipHash);
  if (!allowed) {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again tomorrow.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let message: string;
  try {
    const body = await req.json();
    message = String(body.message ?? '').trim().slice(0, MAX_INPUT_LENGTH);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!message) {
    return new Response(JSON.stringify({ error: 'Message is required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const [profile, roles, skillGroups] = await Promise.all([
    getProfile(),
    getRoles(),
    getSkillGroups(),
  ]);

  const systemPrompt = buildSystemPrompt(profile, roles, skillGroups);

  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    max_tokens: 300,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message },
    ],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? '';
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.enqueue(encoder.encode(`\n__remaining:${remaining}__`));
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Remaining': String(remaining),
    },
  });
}
