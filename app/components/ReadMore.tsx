'use client';

import { useState } from 'react';

export default function ReadMore({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? paragraphs : paragraphs.slice(0, 1);

  return (
    <>
      {visible.map((para, i) => (
        <p key={i} className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
          {para}
        </p>
      ))}
      {paragraphs.length > 1 && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-3 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          {expanded ? 'Read less ↑' : 'Read more ↓'}
        </button>
      )}
    </>
  );
}
