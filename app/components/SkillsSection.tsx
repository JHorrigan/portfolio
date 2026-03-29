'use client';

import { useState } from 'react';

type SkillGroup = { title: string; items: string[] };
type CategoryColors = Record<string, { border: string; label: string; pill: string }>;

const CATEGORY_ORDER = ['Backend', 'Frontend', 'AI / ML', 'Cloud & DevOps', 'Delivery', 'Database', 'Soft Skills'];

export default function SkillsSection({
  skillGroups,
  categoryColors,
}: {
  skillGroups: SkillGroup[];
  categoryColors: CategoryColors;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = CATEGORY_ORDER.filter((cat) =>
    skillGroups.some((g) => g.title === cat)
  );

  return (
    <>
      {/* Filter chips */}
      <div className="mb-6">
        <p className="mb-2 font-mono text-[10px] font-semibold tracking-[0.2em] text-slate-600 uppercase">Category Filters</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition duration-150 ${
              activeCategory === null
                ? 'border-cyan-400/60 bg-cyan-400/10 text-cyan-300'
                : 'border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400'
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const colors = categoryColors[cat] ?? categoryColors['__default'];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? null : cat)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition duration-150 ${
                  isActive ? colors.pill : 'border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category cards */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {skillGroups.map((group) => {
          const colors = categoryColors[group.title] ?? categoryColors['__default'];
          const dimmed = activeCategory !== null && group.title !== activeCategory;
          return (
            <article
              key={group.title}
              className={`rounded-xl border bg-slate-900/50 p-3 md:p-4 transition-opacity duration-300 ${colors.border} ${dimmed ? 'opacity-25' : ''}`}
            >
              <h3 className={`text-xs font-semibold tracking-[0.14em] ${colors.label}`}>
                {group.title.toUpperCase()}
              </h3>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className={`rounded-full border px-2.5 py-0.5 text-xs ${colors.pill}`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </>
  );
}
