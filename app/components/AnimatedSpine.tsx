'use client';

import { useEffect, useRef, useState } from 'react';

export default function AnimatedSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="absolute left-1.25 top-6 bottom-6 w-px origin-top bg-linear-to-b from-(--accent)/50 via-(--border)/40 to-transparent"
      style={{
        transform: visible ? 'scaleY(1)' : 'scaleY(0)',
        transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: visible ? '150ms' : '0ms',
      }}
    />
  );
}
