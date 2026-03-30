'use client';

import { useRef, useState } from 'react';

type MarqueeItem = { id: number; label: string; description: string | null; image_url: string | null };

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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-default-60 bg-card-80 backface-hidden px-3">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.label}
              className="mx-auto h-10 w-auto max-w-24 object-contain opacity-70"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <span className="text-lg font-bold text-faint">{item.label.charAt(0)}</span>
          )}
          <span className="w-full text-center font-mono text-[10px] tracking-widest text-subtle truncate">
            {item.label.toUpperCase()}
          </span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-cyan-400/25 bg-card-95 backface-hidden transform-[rotateY(180deg)] px-3">
          <div className="h-px w-8 bg-linear-to-r from-transparent via-(--accent) to-transparent" />
          <span className="text-xs font-semibold text-page">{item.label}</span>
          {item.description && (
            <span className="text-center text-[10px] leading-tight text-muted">{item.description}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function HeroMarquee({ items }: { items: MarqueeItem[] }) {
  const [paused, setPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [animDelay, setAnimDelay] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const touchStartX = useRef(0);
  const animatedRef = useRef<HTMLDivElement>(null);
  const doubled = [...items, ...items];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setDragOffset(e.touches[0].clientX - touchStartX.current);
  };

  const handleTouchEnd = () => {
    if (animatedRef.current) {
      const el = animatedRef.current;
      const computed = window.getComputedStyle(el);
      const matrix = new DOMMatrix(computed.transform);
      const currentX = matrix.m41;
      const halfWidth = el.scrollWidth / 2;
      const duration = parseFloat(computed.animationDuration) * 1000;

      const combinedX = currentX + dragOffset;
      let newProgress = (-combinedX) / halfWidth;
      newProgress = ((newProgress % 1) + 1) % 1;

      setAnimDelay(-newProgress * duration);
      setAnimKey((k) => k + 1);
    }

    setDragOffset(0);
    setPaused(false);
  };

  return (
    <div
      className="overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div style={{ transform: `translateX(${dragOffset}px)` }}>
        <div
          key={animKey}
          ref={animatedRef}
          className="flex gap-3 animate-marquee"
          style={{
            width: 'max-content',
            animationPlayState: paused ? 'paused' : 'running',
            animationDelay: `${animDelay}ms`,
          }}
        >
          {doubled.map((item, i) => (
            <MarqueeTile key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
