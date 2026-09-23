# James Horrigan — Portfolio

Personal portfolio site for James Horrigan, Full Stack Software Engineer.
Live at [jameshorrigan.com](https://jameshorrigan.com).

Single-page site with a database-backed content model, a GitHub activity graph, and a
chat "digital twin" that answers questions about his experience.

## Stack

- **Framework:** Next.js 16.1.6 (App Router, React 19.2.3, React Compiler enabled)
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme inline` in `app/globals.css`)
- **Language:** TypeScript (strict)
- **Database:** Neon Postgres + Drizzle ORM
- **Fonts:** Geist Sans + Geist Mono via `next/font/google`
- **Hosting:** Vercel

## Development

```bash
npm install
npx next dev --webpack   # http://localhost:3000  (see note below)
npm run build            # production build
npm run start            # serve production build
```

Database:

```bash
npx drizzle-kit push         # push schema changes
npx tsx db/seed.ts --force   # truncate + re-seed (--force is required)
```

### Two things that will catch you out

- **Use `npx next dev --webpack`, not `npm run dev`.** The Turbopack dev server
  refresh-loops on a pre-existing HMR panic. `package.json` is deliberately left on the
  default; production builds are unaffected.
- **Database content changes can take up to an hour to appear in a local build.** `/`
  carries `revalidate: 1h`, and `next build` reuses the prerendered route from
  `.next/cache` while it is still inside that window. Run `rm -rf .next && npm run build`
  to see fresh content immediately. Production self-refreshes regardless.

## Environment

Set in `.env.local` locally and in the Vercel project for deploys:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon connection string |
| `OPENAI_API_KEY` | Digital twin chat |
| `IP_SALT` | Salts hashed IPs used for chat rate limiting |
| `RESEND_API_KEY` | Contact form email delivery |
| `GITHUB_TOKEN` | Classic PAT with `read:user`, for the contribution graph |

`GITHUB_TOKEN` fails soft: if the fetch fails, the Build Activity section is omitted
rather than breaking the page.

## Architecture

```text
app/
  layout.tsx          # fonts, OG/Twitter metadata
  page.tsx            # async RSC, all sections inline, reads the DB at build time
  globals.css         # Tailwind import, theme tokens, .glass utility
  api/chat/route.ts   # digital twin, streaming, rate limited 5/IP/24h
  api/contact/route.ts # contact form, sends via Resend
  components/         # 14 client components + ContributionGraph (server)
db/
  schema.ts           # profile, skills, roles, roleSkills, portfolio, education, chatRateLimits
  queries.ts          # getProfile(), getRoles(), getSkillGroups(), getPortfolio()
  seed.ts             # truncate + re-seed
lib/
  github.ts           # GraphQL contribution calendar, rolling 6-month window
planning/             # PLAN.md (open work), HISTORY.md (shipped), design notes
public/               # CV (PDF + DOCX) and project screenshots
```

Page sections: hero, journey, skills, about, portfolio, activity, ask, contact.

**RSC-first.** `"use client"` is used only where interaction requires it, which is most of
`app/components/`. All page-level markup lives in `page.tsx`.

**Content lives in the database, not in the code.** Copy changes are a seed or SQL edit,
not a deploy.

## Deployment

Pushes to `main` on `JHorrigan/portfolio` auto-deploy to Vercel.

## Further reading

`AGENTS.md` is the authoritative project reference: design tokens, conventions, database
detail, and the accumulated gotchas worth knowing before changing anything.
