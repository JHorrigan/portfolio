# Tech Stack Reference

Stack: **Next.js 16.1.6 + React 19, Tailwind CSS v4, TypeScript strict, Neon Postgres + Drizzle ORM**

---

## Next.js / React

- App Router only. Pages Router is legacy — do not use.
- Every component is RSC by default. Add `"use client"` only for event handlers, browser APIs, useState/useEffect.
- Turbopack is the default dev bundler — no config needed.
- Metadata: `export const metadata` in `app/layout.tsx`. No react-helmet.
- Fonts: `next/font/google` — self-hosted at build time, eliminates CLS.

---

## Tailwind CSS v4 — key differences from v3

- **No `tailwind.config.js`**. All config lives in `globals.css` via `@theme`.
- **No `@tailwind base/components/utilities`**. Replace with `@import "tailwindcss"`.
- Tokens in `@theme` become utilities automatically: `--color-accent: #67e8f9` → `text-accent`, `bg-accent`.
- PostCSS plugin is `@tailwindcss/postcss` (not `tailwindcss`).
- Content scanning is automatic — no `content` array needed.
- Shorthand utilities: use `opacity-(--var)` not `opacity-[var(--var)]`, `min-w-35` not `min-w-[140px]`.
- CSS variable syntax in utilities: `bg-(--accent)` not `bg-[var(--accent)]`.

---

## TypeScript

- Strict mode on. No `any` unless unavoidable.
- Drizzle schema generates types — use inferred types from `db/schema.ts` rather than hand-writing interfaces.
