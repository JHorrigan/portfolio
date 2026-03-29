'use client';

import { useState } from 'react';
import AnimatedSpine from './AnimatedSpine';
import RoleCard from './RoleCard';

type Skill = { id: number; name: string; category: string | null };

type Role = {
  id: number;
  period: string;
  company: string;
  role: string;
  summary: string | null;
  highlights: string[] | null;
  sort_order: number | null;
  skills: Skill[];
};

type CategoryColors = Record<string, { border: string; label: string; pill: string }>;

const CATEGORY_ORDER = ['Backend', 'Frontend', 'AI / ML', 'Cloud & DevOps', 'Delivery', 'Database', 'Soft Skills'];

export default function CareerTimeline({
  journey,
  categoryColors,
}: {
  journey: Role[];
  categoryColors: CategoryColors;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = CATEGORY_ORDER.filter((cat) =>
    journey.some((role) => role.skills.some((s) => s.category === cat))
  );

  return (
    <div className="mt-8">
      {/* Filter chips */}
      <div className="mb-6">
      <p className="mb-2 font-mono text-[10px] font-semibold tracking-[0.2em] text-slate-600 uppercase">Stack Filters</p>
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

      {/* Timeline */}
      <div className="relative">
        <AnimatedSpine />
        <ol className="space-y-3">
          {journey.map((item, index) => {
            const dimmed =
              activeCategory !== null &&
              !item.skills.some((s) => s.category === activeCategory);
            return (
              <RoleCard
                key={item.id}
                item={item}
                index={index}
                isFirst={index === 0}
                categoryColors={categoryColors}
                activeCategory={activeCategory}
                dimmed={dimmed}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
}
