'use client';

import { useState } from 'react';

export default function ReadMore({ paragraphs }: { paragraphs: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? paragraphs : paragraphs.slice(0, 1);

  return (
    <>
      {visible.map((para, i) => (
        <p key={i} className="mt-4 first:mt-0 text-sm leading-7 text-page-2 md:text-base md:leading-8">
          {para}
        </p>
      ))}
      {paragraphs.length > 1 && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-4 flex items-center gap-1.5 rounded-full border border-default px-3 py-1 text-xs font-medium text-muted transition hover:border-default hover:text-page-2"
        >
          {expanded ? 'Read less' : 'Read more'}
          <svg
            width="12" height="12" viewBox="0 0 12 12"
            fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          >
            <polyline points="2,4 6,8 10,4" />
          </svg>
        </button>
      )}
    </>
  );
}
