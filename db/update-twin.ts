/**
 * Non-destructive update for the digital twin's profile data.
 *
 * Unlike `seed.ts`, this NEVER truncates or deletes. It only:
 *   - UPDATEs the profile row in place
 *   - INSERTs skills that are not already present
 *   - INSERTs the MyTrade role if it is not already present
 *   - UPDATEs two existing role rows whose details had drifted
 *
 * Safe to run more than once. Run with:
 *   npx tsx db/update-twin.ts --force
 */
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { and, eq } from 'drizzle-orm';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const NEW_SKILLS = [
  { name: 'Vector Search', category: 'AI / ML', sort_order: 12 },
  { name: 'LLM Integration', category: 'AI / ML', sort_order: 13 },
  { name: 'RAG', category: 'AI / ML', sort_order: 14 },
  { name: 'Agentic Development', category: 'AI / ML', sort_order: 15 },
  { name: 'PostgreSQL', category: 'Backend', sort_order: 16 },
  { name: 'Terraform', category: 'Cloud & DevOps', sort_order: 17 },
];

const MYTRADE = {
  period: 'March 2026 — August 2026',
  company: 'MyTrade Technologies',
  role: 'Founding Engineer',
  summary:
    'Founding engineer on MyTrade Bargains, a UK trade price-comparison platform built from scratch and taken live in May 2026, earning affiliate revenue from launch. Python serverless API on AWS, five Next.js applications, PostgreSQL and DynamoDB, all infrastructure as code.',
  highlights: [
    'Cut the worst-performing endpoint from a 21-second average to under 0.4 seconds, removing 73% of all slow requests. Category browsing went from 5.5s to 0.9s and search settled at a 537ms average.',
    'Rebuilt product categorisation on vector embeddings and retrieval, raising confident automatic classification from 16% to 69% and cutting uncertain outcomes from 29% to 3%.',
    'Re-architected ingestion onto per-supplier AWS Fargate Spot tasks for around 70% less compute cost, resumable so an interrupted task continues rather than restarts.',
    'Applied LLMs and vector embeddings across supplier discovery, record enrichment, catalogue classification and semantic search, with every call tracked for tokens and cost.',
    'Provisioned and ran the back-office automation platform on Terraform-managed AWS EC2 running n8n with no SSH access, carrying around 15 version-controlled workflows.',
  ],
  sort_order: -1, // sorts above existing roles without renumbering them
  skillNames: [
    'Python', 'Vector Search', 'LLM Integration', 'RAG', 'AWS',
    'Next.js', 'PostgreSQL', 'Terraform', 'Agentic Development', 'Serverless',
  ],
};

async function update() {
  console.log('Updating profile (in place, no delete)...');
  await db.update(schema.profile).set({
    email: 'james@xploratech.ai',
    hero_summary:
      'I am James Horrigan, a full stack engineer with 30 years in technology, specialising in Python, AWS, and AI-native product delivery. I design and deliver reliable platforms that balance performance, security, and real user value.',
    summary:
      'My core discipline is backend engineering with Python and cloud computing on AWS, including 9 years of commercial serverless delivery. I also work across React, Next.js, and Tailwind CSS to build complete product experiences when full stack execution is needed.\n\nMy recent work is AI-native: vector search and embeddings, retrieval pipelines, and language-model features running in production, alongside the engineering standards and verification that keep AI-assisted output reliable.\n\nI am a detail-focused problem solver who thrives on clear communication, high standards, and constant learning. I enjoy building systems that are technically robust and strategically aligned to business outcomes.',
  });

  console.log('Adding skills that are missing...');
  const existingSkills = await db.select().from(schema.skills);
  const skillIdByName = new Map(existingSkills.map((s) => [s.name, s.id]));

  for (const skill of NEW_SKILLS) {
    if (skillIdByName.has(skill.name)) {
      console.log(`  skip (exists): ${skill.name}`);
      continue;
    }
    const [inserted] = await db
      .insert(schema.skills)
      .values(skill)
      .returning({ id: schema.skills.id });
    skillIdByName.set(skill.name, inserted.id);
    console.log(`  added: ${skill.name}`);
  }

  console.log('Correcting drifted role details...');
  await db.update(schema.roles)
    .set({ period: 'October 2023 — June 2025' })
    .where(eq(schema.roles.company, 'Intrum'));
  await db.update(schema.roles)
    .set({ role: 'CTO and Software Engineer' })
    .where(eq(schema.roles.company, 'CiiVSOFT'));

  console.log('Adding the MyTrade role if absent...');
  const existing = await db.select().from(schema.roles).where(
    and(
      eq(schema.roles.company, MYTRADE.company),
      eq(schema.roles.role, MYTRADE.role)
    )
  );

  if (existing.length > 0) {
    console.log('  already present - updating in place');
    await db.update(schema.roles)
      .set({
        period: MYTRADE.period,
        summary: MYTRADE.summary,
        highlights: MYTRADE.highlights,
      })
      .where(eq(schema.roles.id, existing[0].id));
    console.log('Done.');
    return;
  }

  const { skillNames, ...roleRow } = MYTRADE;
  const [role] = await db
    .insert(schema.roles)
    .values(roleRow)
    .returning({ id: schema.roles.id });
  console.log(`  added role id ${role.id}`);

  const links = skillNames
    .map((name, index) => ({ skillId: skillIdByName.get(name), index }))
    .filter((x): x is { skillId: number; index: number } => Boolean(x.skillId))
    .map(({ skillId, index }) => ({
      role_id: role.id,
      skill_id: skillId,
      sort_order: index,
    }));

  if (links.length > 0) {
    await db.insert(schema.roleSkills).values(links);
    console.log(`  linked ${links.length} skills`);
  }

  console.log('Done. Nothing was deleted.');
}

if (!process.argv.includes('--force')) {
  console.error('Aborted. This script updates profile data in place (no truncate, no delete).');
  console.error('Run with --force to confirm: npx tsx db/update-twin.ts --force');
  process.exit(1);
}

update().catch((err) => {
  console.error(err);
  process.exit(1);
});
