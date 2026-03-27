'use client';

import { useState } from 'react';

type MarqueeItem = { id: number; label: string; image_url: string | null };

function MarqueeTile({ item }: { item: MarqueeItem }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <article
      className="h-24 w-36 shrink-0 cursor-pointer perspective-[800px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className={`relative h-full transition-transform duration-500 transform-3d ${
          flipped ? 'transform-[rotateY(180deg)]' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/80 backface-hidden">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.label}
              className="h-8 w-8 object-contain opacity-60"
            />
          ) : (
            <span className="text-lg font-bold text-slate-600">
              {item.label.charAt(0)}
            </span>
          )}
          <span className="px-2 text-center font-mono text-[10px] tracking-widest text-slate-500">
            {item.label.toUpperCase()}
          </span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-cyan-400/25 bg-slate-900/95 backface-hidden transform-[rotateY(180deg)]">
          <div className="text-center">
            <div className="mb-1 h-px w-8 mx-auto bg-linear-to-r from-transparent via-cyan-400 to-transparent" />
            <span className="text-sm font-semibold text-white">{item.label}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function HeroMarquee({ items }: { items: MarqueeItem[] }) {
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex gap-3 animate-marquee"
        style={{
          width: 'max-content',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((item, i) => (
          <MarqueeTile key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
