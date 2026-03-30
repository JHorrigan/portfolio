'use client';

import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const inputClass =
    'w-full rounded-2xl border border-default-60 bg-card-60 px-4 py-3 text-sm text-page placeholder-subtle outline-none transition focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30';

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-4 py-10">
        <p className="font-mono text-xs font-semibold tracking-[0.22em] text-accent uppercase">Message Sent</p>
        <div className="flex items-center gap-4">
          <div className="w-0.5 h-10 shrink-0 rounded-full bg-linear-to-b from-(--accent) to-transparent" />
          <p className="text-2xl font-bold tracking-tight text-page">Thanks — I&apos;ll be in touch soon.</p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 flex items-center gap-1.5 self-start rounded-full border border-default px-3 py-1 text-xs font-medium text-muted transition hover:border-default hover:text-page-2"
        >
          Send another
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,4 6,8 10,4" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-subtle uppercase">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            maxLength={100}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-subtle uppercase">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            maxLength={254}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold tracking-widest text-subtle uppercase">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project…"
          required
          maxLength={2000}
          rows={5}
          className={`${inputClass} resize-none`}
        />
        <p className="text-right text-[10px] text-faint">{message.length}/2000</p>
      </div>

      {status === 'error' && (
        <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-2.5 text-sm text-rose-300">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-1 flex items-center justify-center gap-2 self-start rounded-full bg-accent px-6 py-3 text-sm font-semibold text-btn shadow-[0_0_24px_rgba(103,232,249,0.30)] transition hover:bg-accent-soft hover:shadow-[0_0_36px_rgba(103,232,249,0.50)] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22,2 15,22 11,13 2,9" />
            </svg>
            Send message
          </>
        )}
      </button>
    </form>
  );
}
