'use client';

import { useState } from 'react';

type PortfolioItem = {
  id: number;
  title: string;
  description: string | null;
  url: string | null;
  image_url: string | null;
};

export default function PortfolioCard({
  item,
  gradient,
  accent,
}: {
  item: PortfolioItem;
  gradient: string;
  accent: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <article
      className="h-52 cursor-pointer perspective-[1000px]"
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className={`relative h-full transition-transform duration-500 transform-3d ${
          flipped ? 'transform-[rotateY(180deg)]' : ''
        }`}
      >
        {/* Front — screenshot / gradient with title overlay */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-slate-700/60 backface-hidden">
          {item.image_url ? (
            <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full" style={{ background: gradient }} />
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
          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent p-5">
            <p className="mb-1 truncate font-mono text-xs" style={{ color: `${accent}99` }}>
              {item.url?.replace('https://', '')}
            </p>
            <h3 className="text-lg font-bold leading-tight tracking-tight text-white">
              {item.title}
            </h3>
            <p className="mt-1.5 text-xs text-slate-400">tap to explore →</p>
          </div>
        </div>

        {/* Back — detail */}
        <div className="absolute inset-0 flex flex-col rounded-2xl border border-slate-700/60 bg-slate-900/95 p-5 backface-hidden transform-[rotateY(180deg)]">
          <div
            className="mb-4 h-px w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
          />
          <h3 className="font-semibold tracking-tight text-white">{item.title}</h3>
          {item.description && (
            <p className="mt-2 flex-1 text-sm text-slate-400">{item.description}</p>
          )}
          <div className="mt-4 flex items-center justify-between">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
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
            <span className="ml-auto text-xs text-slate-500">← tap to close</span>
          </div>
        </div>
      </div>
    </article>
  );
}
