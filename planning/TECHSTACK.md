# Tech Stack Reference

Research findings for the portfolio project. Sources checked March 2026.

---

## Next.js 15

**Current stable:** 15.2+. Use `create-next-app@latest`.

### App Router
- All routes live under `app/`. Pages Router is legacy — do not use it.
- Every component is a React Server Component (RSC) by default. Only add `"use client"` where interactivity is required (event handlers, browser APIs, useState/useEffect).
- For a mostly-static portfolio, almost nothing needs `"use client"`.

### Turbopack
- Now the **default bundler** in Next.js 15 — no configuration needed, just `npm run dev`.
- Dramatically faster hot reload vs. Webpack.

### Metadata API
- Use `export const metadata` in `app/layout.tsx` for page title, description, OG tags.
- No need for `react-helmet` or manual `<head>` management.

```ts
// app/layout.tsx
export const metadata = {
  title: 'James Horrigan | Full Stack Software Engineer',
  description: 'Portfolio of James Horrigan...',
}
```

### Static rendering
- A portfolio with no dynamic data fetching is **fully statically rendered** by default. No configuration needed. `npm run build` produces static HTML.

---

## Tailwind CSS v4

**Released:** January 22, 2025. Supported in `create-next-app@15.2+` via `--tailwind` flag.

### CSS-first configuration — key change from v3
- No `tailwind.config.js` file. All customisation goes in `globals.css` using the `@theme` directive.
- No `@tailwind base/components/utilities` directives. Replace with:

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-accent: #00ffe0;
  --color-bg: #0a0a0f;
  --font-mono: 'JetBrains Mono', monospace;
}
```

- Tokens defined in `@theme` become Tailwind utility classes automatically: `bg-bg`, `text-accent`, `font-mono`.

### Automatic content detection
- No `content` array to configure. Tailwind v4 scans your project automatically.

### Performance
- Full builds ~5x faster than v3. Incremental rebuilds ~100x faster (measured in microseconds).
- Production CSS output ~70% smaller than v3 (typically 6–12 KB gzipped vs. 20–30 KB).

### PostCSS setup
- Plugin is now `@tailwindcss/postcss` (not `tailwindcss` directly).
- `create-next-app --tailwind` handles this automatically.

### Browser support
- Requires Safari 16.4+, Chrome 111+, Firefox 128+. Fine for a portfolio.

---

## Fonts

Use `next/font/google` — the correct approach for Next.js 15.

- Fonts are **self-hosted** at build time. No browser requests to Google servers.
- Eliminates Cumulative Layout Shift (CLS) via automatic `size-adjust` fallback metrics.
- Use **variable fonts** where available for best performance.

```ts
// app/layout.tsx
import { JetBrains_Mono, Inter } from 'next/font/google'

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})
```

Then expose as CSS variables and reference in `@theme`:
```css
@theme {
  --font-mono: var(--font-mono-next);
  --font-sans: var(--font-sans-next);
}
```

---

## Animations

The plan calls for "subtle CSS-only" animations — this is the right call for performance.

### What to use
- `@keyframes` + Tailwind `animate-*` utilities for entrance effects
- `animation-timeline: scroll()` — native scroll-driven animations, now baseline in modern browsers (Chrome 115+, Firefox 110+, Safari 15.4+). No JavaScript needed.
- `transition-*` utilities for hover states
- Only animate `transform` and `opacity` — GPU-accelerated, no layout recalculation

### What not to use
- **Framer Motion**: heavyweight for a static portfolio; no justification here
- **GSAP**: same — overkill
- **AOS / Animate.css**: external dependencies for something achievable in CSS

### CSS custom animation example
```css
/* In globals.css */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
Use with Tailwind `[animation:fade-up_0.4s_ease_forwards]` or extend `@theme`.

---

## Project Structure (confirmed best practice)

```
app/
  layout.tsx        # root layout: fonts, metadata, nav
  page.tsx          # single page, composes all sections
  globals.css       # @import "tailwindcss" + @theme tokens
components/
  sections/         # Hero, About, Career, Skills, Portfolio, Footer
  ui/               # Tag, SectionHeading, etc.
lib/
  data.ts           # all content as typed TS — no content in components
types/
  index.ts          # shared TypeScript types (Role, Skill, etc.)
```

No `src/` directory needed for a single-page site this size.

---

## Decisions & Rationale

| Decision | Choice | Reason |
|----------|--------|--------|
| Bundler | Turbopack (default) | Faster dev, no config |
| Tailwind config | CSS `@theme` (v4) | No JS config file, smaller output |
| Fonts | `next/font/google` | Self-hosted, no CLS |
| Animations | CSS-only | No JS dependency, GPU-accelerated |
| Component model | RSC-first, `"use client"` only where needed | Minimal JS bundle |
| Design tokens | Tailwind `@theme` in globals.css | Single source of truth |

---

## Sources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Install Tailwind with Next.js](https://tailwindcss.com/docs/guides/nextjs)
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Next.js 15 Best Practices — RaftLabs](https://www.raftlabs.com/blog/building-with-next-js-best-practices-and-benefits-for-performance-first-teams/)
- [Tailwind v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)
- [Google Fonts in Next.js 15 + Tailwind v4](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4)
