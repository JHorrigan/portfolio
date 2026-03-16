'use client';

import { useState } from 'react';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#journey', label: 'Career' },
  { href: '#skills', label: 'Skills' },
  { href: '#ask', label: 'Digital Twin' },
];

const pillBase =
  'rounded-full border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900/70';

const contactBase =
  'rounded-full border border-cyan-300/40 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/10';

export default function NavMenu({ email }: { email?: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-2">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={pillBase}>
            {link.label}
          </a>
        ))}
        {email && (
          <a href={`mailto:${email}`} className={contactBase}>
            Contact
          </a>
        )}
      </div>

      {/* Mobile burger */}
      <button
        className="md:hidden rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:border-slate-500 hover:bg-slate-900/70"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="2" x2="16" y2="16" />
            <line x1="16" y1="2" x2="2" y2="16" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="5" x2="16" y2="5" />
            <line x1="2" y1="9" x2="16" y2="9" />
            <line x1="2" y1="13" x2="16" y2="13" />
          </svg>
        )}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 flex min-w-[150px] flex-col gap-1 rounded-2xl border border-slate-700/60 bg-slate-900/95 p-3 backdrop-blur-sm md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              {link.label}
            </a>
          ))}
          {email && (
            <a
              href={`mailto:${email}`}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl border border-cyan-300/30 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-300/10"
            >
              Contact
            </a>
          )}
        </div>
      )}
    </div>
  );
}
