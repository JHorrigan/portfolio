# HISTORY

Shipped and deployed work, newest first. One or two short lines per slice: what shipped and when.
Rationale and bug stories live in `git show`, not here.

- **Content and card polish pass** (2026-08-16 to 2026-08-17) - project cards carry real
  screenshots cropped to card aspect, carousel pause control, GitHub contribution graph, career
  filter dimming fix, mobile layout tightening, skills corrected against the CV
  (`db/update-skills.ts`). Live on jameshorrigan.com.
- **Digital twin data alignment** (2026-08-16) - twin content matched to the published CV and
  LinkedIn via a non-destructive update script; hero stats substantiated in career summaries.
- **Phases 1-9** (to 2026-03) - site build through to launch: Next.js 16 + Tailwind v4 shell, Neon +
  Drizzle content model, career timeline, portfolio cards, digital twin chat with rate limiting, CV
  downloads, Vercel deploy on jameshorrigan.com. Current shape is documented in `@AGENTS.md`.
