# James Horrigan — Portfolio

Personal portfolio site for James Horrigan, Full Stack Software Engineer.

Built with Next.js 16, TypeScript, and Tailwind CSS v4. Runs locally.

## Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme`)
- **Language:** TypeScript (strict)
- **Fonts:** Inter + JetBrains Mono via `next/font/google`
- **Bundler:** Turbopack (default)

## Dev

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve production build
```

## Structure

```
app/              # Next.js App Router — layout, page, global styles
components/
  sections/       # page sections (Hero, About, Career, etc.)
  ui/             # shared primitives (Tag, SectionHeading, etc.)
lib/
  data.ts         # all content as typed data
types/
  index.ts        # shared TypeScript types
planning/         # project planning documents
```
