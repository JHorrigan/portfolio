'use client';

import { useState } from 'react';

type SkillGroup = { title: string; items: string[] };
type CategoryColors = Record<string, { border: string; label: string; pill: string; line: string }>;

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
        <p className="mb-2 font-mono text-[10px] font-semibold tracking-[0.2em] text-faint uppercase">Category Filters</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition duration-150 ${
              activeCategory === null
                ? 'border-(--accent)/60 bg-(--accent)/10 text-accent'
                : 'border-default text-subtle hover:border-default hover:text-muted'
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
                  isActive ? colors.pill : 'border-default text-subtle hover:border-default hover:text-muted'
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
              className={`rounded-xl border border-card-outline bg-card-50 p-3 md:p-4 transition-opacity duration-300 ${dimmed ? 'opacity-25' : ''}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-0.5 h-4 shrink-0 rounded-full bg-linear-to-b to-transparent ${colors.line}`} />
                <h3 className={`text-xs font-semibold tracking-[0.14em] ${colors.label}`}>
                  {group.title.toUpperCase()}
                </h3>
                <span className="font-mono text-[10px] text-faint">{group.items.length}</span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
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
