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
    'w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30';

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-semibold text-white">Message sent</p>
          <p className="mt-1 text-sm text-slate-400">Thanks — I'll be in touch soon.</p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-xs text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline transition"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase">Name</label>
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
          <label className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase">Email</label>
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
        <label className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project…"
          required
          maxLength={2000}
          rows={5}
          className={`${inputClass} resize-none`}
        />
        <p className="text-right text-[10px] text-slate-600">{message.length}/2000</p>
      </div>

      {status === 'error' && (
        <p className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-2.5 text-sm text-rose-300">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-1 flex items-center justify-center gap-2 self-start rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(103,232,249,0.30)] transition hover:bg-cyan-300 hover:shadow-[0_0_36px_rgba(103,232,249,0.50)] disabled:opacity-60 disabled:cursor-not-allowed"
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
