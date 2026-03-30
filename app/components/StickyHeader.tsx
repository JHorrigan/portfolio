'use client';

import { useEffect, useState } from 'react';
import NavMenu from './NavMenu';
import ThemeToggle from './ThemeToggle';

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
          ? 'bg-card-80 border-default-60 shadow-lg shadow-black/40'
          : 'bg-card-50 border-default-30'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-0.5 h-5 shrink-0 rounded-full bg-linear-to-b from-(--accent) to-transparent" />
        <p className="text-sm font-semibold tracking-widest text-accent md:text-lg">
          {name}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <NavMenu />
      </div>
    </header>
  );
}
