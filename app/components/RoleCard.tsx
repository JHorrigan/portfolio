'use client';

import { useState } from 'react';

type Skill = { id: number; name: string; category: string | null };

type Role = {
  id: number;
  period: string;
  company: string;
  role: string;
  summary: string | null;
  skills: Skill[];
};

type CategoryColors = Record<string, { border: string; label: string; pill: string }>;

export default function RoleCard({
  item,
  index,
  isFirst,
  categoryColors,
  activeCategory = null,
  dimmed = false,
}: {
  item: Role;
  index: number;
  isFirst: boolean;
  categoryColors: CategoryColors;
  activeCategory?: string | null;
  dimmed?: boolean;
}) {
  const [open, setOpen] = useState(isFirst);
  const [showFullSummary, setShowFullSummary] = useState(false);
  const year = isFirst
    ? String(new Date().getFullYear())
    : item.period.match(/\d{4}/g)?.at(-1);

  return (
    <li
      // `opacity-25!` is deliberate: `animate-fade-in-up` fills `both`, so its
      // finished `to { opacity: 1 }` keyframe outranks a plain declaration and
      // silently cancelled the dim.
      className={`relative pl-9 animate-fade-in-up transition-opacity duration-300 ${dimmed ? 'opacity-25!' : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Timeline node */}
      {isFirst && (
        <div className="absolute left-0 top-5 h-3 w-3 animate-ping rounded-full bg-(--accent)/30" />
      )}
      <div
        className={`absolute left-0 top-5 h-3 w-3 rounded-full border-2 border-(--accent)/80 bg-page ${
          isFirst ? 'ring-2 ring-(--accent)/25 ring-offset-1 ring-offset-transparent' : ''
        }`}
      />

      {/* The expandable panel is a sibling of the toggle, not a child: the
          summary needs its own "More" control on mobile, and a button inside a
          button is invalid. */}
      <div
        className={`relative overflow-hidden rounded-2xl border bg-card-70 transition duration-200 hover:-translate-y-0.5 hover:shadow-[inset_3px_0_0_var(--accent)] role-card-border ${open ? 'shadow-[inset_3px_0_0_var(--accent)]' : ''}`}
      >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="relative w-full cursor-pointer p-4 text-left"
      >
        {year && (
          <span
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none font-mono font-bold leading-none text-page opacity-[0.04]"
            style={{ fontSize: 'clamp(4rem, 10vw, 7rem)' }}
          >
            {year}
          </span>
        )}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-accent">{item.period}</p>
            <h3 className="mt-1 text-base font-semibold leading-snug text-page sm:text-lg">{item.role}</h3>
            <p className="mt-0.5 text-sm text-muted">{item.company}</p>
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`mt-2 shrink-0 text-subtle transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          >
            <polyline points="2,4 7,10 12,4" />
          </svg>
        </div>
      </button>

      {/* Smooth height animation via CSS grid trick */}
      <div
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
          <div className="overflow-hidden px-4 pb-4">
            {item.summary && (
              <>
                <p
                  className={`text-sm leading-7 text-page-2 md:text-base md:leading-8 ${
                    showFullSummary ? '' : 'line-clamp-5 md:line-clamp-none'
                  }`}
                >
                  {item.summary}
                </p>
                {/* Narrow screens only -- on desktop the summary never runs long
                    enough to be worth a control. */}
                <button
                  onClick={() => setShowFullSummary((v) => !v)}
                  aria-expanded={showFullSummary}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent transition hover:opacity-80 md:hidden"
                >
                  {showFullSummary ? 'Less' : 'More'}
                  <svg
                    width="11" height="11" viewBox="0 0 12 12"
                    fill="none" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform duration-300 ${showFullSummary ? 'rotate-180' : ''}`}
                  >
                    <polyline points="2,4 6,8 10,4" />
                  </svg>
                </button>
              </>
            )}
            {item.skills.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.skills.map((skill) => {
                  const colors =
                    categoryColors[skill.category ?? ''] ?? categoryColors['__default'];
                  return (
                    <li
                      key={`${item.id}-${skill.id}`}
                      className={`rounded-full border px-2.5 py-0.5 text-xs transition-opacity duration-200 ${colors.pill} ${
                        activeCategory && skill.category !== activeCategory ? 'opacity-25' : ''
                      }`}
                    >
                      {skill.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
      </div>
      </div>
    </li>
  );
}
