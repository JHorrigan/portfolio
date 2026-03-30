'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '#journey', label: 'Career' },
  { href: '#skills', label: 'Skills' },
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Projects' },
  { href: '#ask', label: 'Digital Twin' },
  { href: '#contact', label: 'Contact' },
];



function useActiveSection() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const ids = NAV_LINKS.map(({ href }) => href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-30% 0px -65% 0px' },
    );

    elements.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (window.scrollY < 80) setActive('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return active;
}

function DownloadCvButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-btn transition hover:bg-accent-soft"
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
          <div className="absolute right-0 top-full z-50 mt-2 flex min-w-[140px] flex-col gap-1 rounded-2xl border border-default-60 bg-card-95 p-2 backdrop-blur-sm">
            <a
              href="/cv.pdf"
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-page-2 transition hover:bg-raised"
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
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-page-2 transition hover:bg-raised"
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

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <div className="relative flex items-center gap-2">
      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-2">
        {NAV_LINKS.map((link) => {
          const isActive = link.href === activeSection;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`relative flex items-center px-3 py-1.5 text-sm font-semibold transition ${
                isActive ? 'text-accent' : 'text-muted hover:text-page-2'
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-cyan-400 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
            </a>
          );
        })}
        <DownloadCvButton />
      </div>

      {/* Mobile burger */}
      <button
        className="md:hidden rounded-lg border border-default p-2 text-page-2 transition hover:border-default-60 hover:bg-card-70"
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
        <div className="absolute right-0 top-full z-50 mt-2 flex min-w-37.5 flex-col gap-1 rounded-2xl border border-default-60 bg-card-95 p-3 backdrop-blur-sm md:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === activeSection;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:bg-raised ${
                  isActive ? 'text-accent' : 'text-page-2'
                }`}
              >
                {link.label}
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />}
              </a>
            );
          })}
          <div className="mt-1 border-t border-default-50 pt-1">
            <a
              href="/cv.pdf"
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-page-2 transition hover:bg-raised"
            >
              Download CV (PDF)
            </a>
            <a
              href="/cv.docx"
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-page-2 transition hover:bg-raised"
            >
              Download CV (DOCX)
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
