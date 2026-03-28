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
}: {
  item: Role;
  index: number;
  isFirst: boolean;
  categoryColors: CategoryColors;
}) {
  const [open, setOpen] = useState(isFirst);

  return (
    <li
      className="relative pl-9 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Timeline node */}
      {isFirst && (
        <div className="absolute left-0 top-5 h-3 w-3 animate-ping rounded-full bg-cyan-400/30" />
      )}
      <div
        className={`absolute left-0 top-5 h-3 w-3 rounded-full border-2 border-cyan-400/80 bg-slate-950 ${
          isFirst ? 'ring-2 ring-cyan-400/25 ring-offset-1 ring-offset-slate-950' : ''
        }`}
      />

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left transition hover:border-slate-700"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-cyan-300">{item.period}</p>
            <h3 className="mt-1 text-base font-semibold leading-snug text-white sm:text-lg">
              {item.role}
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> · </span>
              {item.company}
            </h3>
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
            className={`mt-2 shrink-0 text-slate-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          >
            <polyline points="2,4 7,10 12,4" />
          </svg>
        </div>

        {/* Smooth height animation via CSS grid trick */}
        <div
          className={`grid transition-all duration-300 ${
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            {item.summary && (
              <p className="mt-2 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
                {item.summary}
              </p>
            )}
            {item.skills.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.skills.map((skill) => {
                  const colors =
                    categoryColors[skill.category ?? ''] ?? categoryColors['__default'];
                  return (
                    <li
                      key={`${item.id}-${skill.id}`}
                      className={`rounded-full border px-2.5 py-0.5 text-xs ${colors.pill}`}
                    >
                      {skill.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </button>
    </li>
  );
}
