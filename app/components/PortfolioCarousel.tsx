'use client';

import { useEffect, useState } from 'react';
import PortfolioCard from './PortfolioCard';

type PortfolioItem = {
  id: number;
  title: string;
  description: string | null;
  url: string | null;
  image_url: string | null;
};

const GRADIENTS = [
  'linear-gradient(135deg, #0c4a6e 0%, #020617 60%, #083344 100%)',
  'linear-gradient(135deg, #064e3b 0%, #020617 60%, #052e16 100%)',
  'linear-gradient(135deg, #2e1065 0%, #020617 60%, #1e1b4b 100%)',
  'linear-gradient(135deg, #7c2d12 0%, #020617 60%, #431407 100%)',
];
const ACCENTS = ['#67e8f9', '#6ee7b7', '#c4b5fd', '#fdba74'];

const AUTO_ADVANCE_MS = 5000;
const TRANSITION_MS = 700;

export default function PortfolioCarousel({ items }: { items: PortfolioItem[] }) {
  const N = items.length;
  // Render three full copies. Logical viewport starts in the middle copy so we
  // can drift in either direction; on transitionend we silently snap back into
  // the middle copy's index range without any visible jump.
  const track = [...items, ...items, ...items];

  const [perView, setPerView] = useState(1);
  const [offset, setOffset] = useState(N);
  const [transition, setTransition] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setPerView(mq.matches ? 3 : 1);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setOffset((o) => o + 1), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const handleTransitionEnd = () => {
    if (offset >= 2 * N) {
      setTransition(false);
      setOffset((o) => o - N);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransition(true))
      );
    } else if (offset < N) {
      setTransition(false);
      setOffset((o) => o + N);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransition(true))
      );
    }
  };

  const handleNext = () => setOffset((o) => o + 1);
  const handlePrev = () => setOffset((o) => o - 1);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translate3d(${-offset * (100 / perView)}%, 0, 0)`,
            transition: transition
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : 'none',
          }}
        >
          {track.map((item, i) => {
            const originalIndex = i % N;
            return (
              <div
                key={`${item.id}-${i}`}
                className="shrink-0 basis-full px-2 md:basis-1/3"
              >
                <PortfolioCard
                  item={item}
                  gradient={GRADIENTS[originalIndex % GRADIENTS.length]}
                  accent={ACCENTS[originalIndex % ACCENTS.length]}
                />
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous projects"
        className="absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full border border-default-60 bg-card-80 p-2 text-page-2 backdrop-blur transition hover:border-(--accent) hover:text-accent md:p-3"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next projects"
        className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full border border-default-60 bg-card-80 p-2 text-page-2 backdrop-blur transition hover:border-(--accent) hover:text-accent md:p-3"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
