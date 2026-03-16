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

function DownloadCvButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-slate-600 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-slate-400 hover:bg-slate-900/70"
      >
        Download CV
        <svg
          width="11" height="11" viewBox="0 0 11 11" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="2,3 5.5,7 9,3" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 flex min-w-[140px] flex-col gap-1 rounded-2xl border border-slate-700/60 bg-slate-900/95 p-2 backdrop-blur-sm">
            <a
              href="/cv.pdf"
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.5 1v8M3.5 6.5l3 3 3-3" /><path d="M1 10.5v1a1 1 0 001 1h9a1 1 0 001-1v-1" />
              </svg>
              PDF
            </a>
            <a
              href="/cv.docx"
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6.5 1v8M3.5 6.5l3 3 3-3" /><path d="M1 10.5v1a1 1 0 001 1h9a1 1 0 001-1v-1" />
              </svg>
              DOCX
            </a>
          </div>
        </>
      )}
    </div>
  );
}

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
        <DownloadCvButton />
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
          <div className="mt-1 border-t border-slate-700/50 pt-1">
            <a
              href="/cv.pdf"
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Download CV (PDF)
            </a>
            <a
              href="/cv.docx"
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Download CV (DOCX)
            </a>
          </div>
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
