import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const TO_EMAIL = 'james@xploratech.ai';
const FROM_EMAIL = 'portfolio@xploratech.ai';

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 422 });
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 });
  }
  if (typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Please enter a message.' }, { status: 422 });
  }

  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: 'Input too long.' }, { status: 422 });
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email.trim(),
    subject: `Portfolio contact from ${name.trim()}`,
    text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
      <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
      <hr />
      <p>${escapeHtml(message.trim()).replace(/\n/g, '<br />')}</p>
    `,
  });

  if (error) {
    console.error('[contact]', error);
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
