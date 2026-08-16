'use client';

import { useEffect, useState } from 'react';

type PortfolioItem = {
  id: number;
  title: string;
  description: string | null;
  url: string | null;
  image_url: string | null;
  image_urls?: string[] | null;
};

const SLIDE_MS = 4200;
const FADE_MS = 700;

export default function PortfolioCard({
  item,
  gradient,
  accent,
}: {
  item: PortfolioItem;
  gradient: string;
  accent: string;
}) {
  const [tapFlipped, setTapFlipped] = useState(false);
  const [canHover, setCanHover] = useState(true);

  // Prefer the array; fall back to the single legacy image. Any file that fails
  // to load is dropped from rotation, so a missing screenshot degrades to the
  // remaining slides rather than showing a broken image.
  const declared = item.image_urls?.length ? item.image_urls : item.image_url ? [item.image_url] : [];
  const [broken, setBroken] = useState<string[]>([]);
  const slides = declared.filter((src) => !broken.includes(src));
  const [slide, setSlide] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Only cycle while the front face is showing. Hovering flips the card, so
  // advancing on hover or click is not available to us here.
  const paused = tapFlipped || slides.length < 2 || reduceMotion;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSlide((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  useEffect(() => {
    if (slide >= slides.length) setSlide(0);
  }, [slide, slides.length]);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    const update = () => {
      setCanHover(mq.matches);
      if (mq.matches) setTapFlipped(false);
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <article
      className={`group h-72 perspective-[1000px] ${canHover ? '' : 'cursor-pointer'}`}
      onClick={canHover ? undefined : () => setTapFlipped((f) => !f)}
    >
      <div
        className={`relative h-full transition-transform duration-500 transform-3d group-hover:transform-[rotateY(180deg)] ${tapFlipped ? 'transform-[rotateY(180deg)]' : ''}`}
      >
        {/* Front — screenshot / gradient with title overlay */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-default-60 backface-hidden">
          {/* Backdrop only visible when a card has no usable image. */}
          <div className="absolute inset-0" style={{ background: gradient }} />
          {slides.length > 0 &&
            slides.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={
                  slides.length > 1
                    ? `${item.title} — screen ${i + 1} of ${slides.length}`
                    : item.title
                }
                onError={() => setBroken((b) => (b.includes(src) ? b : [...b, src]))}
                className="absolute inset-0 h-full w-full object-cover transition-opacity ease-out"
                style={{
                  opacity: i === slide ? 1 : 0,
                  transitionDuration: `${reduceMotion ? 0 : FADE_MS}ms`,
                }}
              />
            ))}
          {slides.length > 1 && (
            <div className="absolute right-4 top-4 z-10 flex gap-1" aria-hidden="true">
              {slides.map((src, i) => (
                <span
                  key={src}
                  className="h-0.5 w-5 rounded-full transition-all duration-500"
                  style={{
                    background: i === slide ? accent : `${accent}33`,
                    boxShadow: i === slide ? `0 0 6px ${accent}80` : 'none',
                  }}
                />
              ))}
            </div>
          )}
          {/* dot-grid accent overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${accent}33 1px, transparent 1px), linear-gradient(90deg, ${accent}33 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
          {/* title + hint overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/95 via-black/50 to-transparent p-5">
            <p className="mb-1 truncate font-mono text-xs" style={{ color: `${accent}99` }}>
              {item.url?.replace('https://', '')}
            </p>
            <h3 className="text-lg font-bold leading-tight tracking-tight text-white">
              {item.title}
            </h3>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-xs text-muted">{canHover ? 'hover to explore' : 'tap to explore'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Back — detail */}
        <div className="absolute inset-0 flex flex-col rounded-2xl border border-default-60 bg-card-95 p-5 backface-hidden transform-[rotateY(180deg)]">
          <div
            className="mb-4 h-px w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
          />
          <div className="flex items-center gap-2">
            <div className="w-0.5 h-5 shrink-0 rounded-full bg-linear-to-b to-transparent" style={{ background: `linear-gradient(to bottom, ${accent}, transparent)` }} />
            <h3 className="font-semibold tracking-tight text-page">{item.title}</h3>
          </div>
          {item.description && (
            <p className="mt-2 flex-1 text-sm text-muted">{item.description}</p>
          )}
          <div className="mt-4 flex items-center justify-between">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition hover:opacity-80"
                style={{ borderColor: `${accent}50`, color: accent }}
              >
                Visit
                <svg
                  width="10" height="10" viewBox="0 0 10 10"
                  fill="none" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M2 8L8 2M5 2h3v3" />
                </svg>
              </a>
            )}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-faint">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}
