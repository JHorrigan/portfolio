'use client';

import { useEffect, useState } from 'react';
import NavMenu from './NavMenu';

export default function StickyHeader({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`flex items-center justify-between gap-4 rounded-2xl px-6 py-4 border transition-all duration-300 backdrop-blur-sm ${
        scrolled
          ? 'bg-slate-900/80 border-slate-700/60 shadow-lg shadow-slate-950/40'
          : 'bg-slate-900/20 border-slate-700/20'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-0.5 h-5 shrink-0 rounded-full bg-linear-to-b from-cyan-400 to-cyan-400/10" />
        <p className="text-sm font-semibold tracking-widest text-cyan-300 md:text-lg">
          {name}
        </p>
      </div>
      <NavMenu />
    </header>
  );
}
