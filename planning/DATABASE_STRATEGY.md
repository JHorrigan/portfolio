# Database Strategy — Portfolio Dynamic Data

Generated: 2026-03-02

## Goal

Replace hardcoded inline data in `app/page.tsx` (journey, skills, about text) with a database-backed CMS layer, removing dependency on `planning/linkedin.pdf`. All content should be editable without a code deploy.

---

## Options Evaluated

### Supabase (Postgres)

- Free: 500 MB DB, 2 projects, unlimited API requests
- Gotcha: **projects pause after 7 consecutive days of inactivity** — a real problem for a low-traffic portfolio (data retained but site goes offline)
- RSC fit: excellent (`@supabase/ssr` package explicitly designed for App Router)
- Verdict: good technology, but the inactivity pause makes it unreliable for a portfolio with no keep-alive mechanism

### PlanetScale (MySQL)

- **No free tier as of April 2024** (removed in a cost-cutting round, minimum now $39/month)
- Verdict: not viable

### Neon (Serverless Postgres) — **Recommended**

- Free: 0.5 GB storage, 100 CU-hours/month (generous for a portfolio)
- No inactivity pause — compute scales to zero when idle; data always available
- RSC fit: excellent — `@neondatabase/serverless` is an HTTP-based driver purpose-built for serverless/edge and RSC
- ORM: Drizzle ORM (`drizzle-orm/neon-http`) is the standard pairing — typed queries, schema migrations, minimal boilerplate
- Postgres dialect — standard SQL, strong type system, easy schema evolution
- Verdict: **best fit for this project**

### Turso (libSQL / SQLite) — Strong Alternative

- Free: 5 GB storage, 500 million rows read/month — very generous
- No inactivity pause
- RSC fit: good (`@libsql/client` works in Node.js RSC; use HTTP variant for edge)
- ORM: Drizzle ORM has first-class Turso/libSQL support
- Gotcha: younger platform, SQLite dialect (fine for simple structured data)
- Verdict: strong option if SQLite semantics are preferred or maximum free limits are needed

### Firebase Firestore

- Free: 1 GB, 50K reads/day, no inactivity pause
- RSC fit: friction — client SDK is browser-only; RSC requires Admin SDK + service account credentials
- Verdict: adds unnecessary complexity for an RSC-first stack

### MongoDB Atlas (M0)

- Free: 512 MB, shared infrastructure
- RSC fit: adequate (native driver, but connection pool caching required in serverless)
- NoSQL — no schema enforcement unless handled in app code
- Verdict: viable but connection caching overhead and NoSQL model are not ideal here

---

## Decision: Neon + Drizzle ORM

**Stack:**
- Database: [Neon](https://neon.tech) — serverless Postgres, free tier, no pause
- ORM: [Drizzle ORM](https://orm.drizzle.team) — lightweight, typed, SQL-first
- Driver: `@neondatabase/serverless` (HTTP mode, works in RSC and edge)

**Why:**
- Standard Postgres — easy to migrate elsewhere if needed
- No operational gotchas on free tier (no pause, no daily quotas)
- Drizzle generates TypeScript types from schema — replaces ad-hoc inline arrays with typed data layer
- RSC-first: queries run server-side with no client-side bundle impact

---

## Data to Move to Database

| Table | Replaces | Key Columns |
|---|---|---|
| `profile` | Hardcoded hero/about text, social links | title, hero, summary, linkedin_url, github_url |
| `skills` | `skills[]` in page.tsx | id, name, category, sort_order |
| `roles` | `journey[]` in page.tsx | id, period, company, role, summary, highlights (text[]), related_skills (int[]), sort_order |
| `education` | None (new) | id, qualification, source, date, sort_order |

### Schema Detail

```sql
profile (
  id            serial primary key,
  title         text,
  hero          text,
  summary       text,
  linkedin_url  text,
  github_url    text
)

skills (
  id          serial primary key,
  name        text not null,
  category    text,
  sort_order  integer default 0
)

roles (
  id              serial primary key,
  period          text not null,
  company         text not null,
  role            text not null,
  summary         text,
  highlights      text[],        -- bullet points (Postgres array)
  related_skills  integer[],     -- references skills.id
  sort_order      integer default 0
)

education (
  id            serial primary key,
  qualification text not null,
  source        text,
  date          text,
  sort_order    integer default 0
)
```

---

## Implementation Plan

### Phase A — Setup (no UI changes yet)

1. Create Neon project (free tier), copy connection string
2. Add `@neondatabase/serverless` and `drizzle-orm` + `drizzle-kit` as dependencies
3. Define schema in `db/schema.ts`
4. Run `drizzle-kit push` to create tables
5. Seed initial data (migrate content from current `page.tsx` inline arrays)

### Phase B — Wire to Page

6. Create `db/index.ts` — Neon HTTP client + Drizzle instance
7. Create `db/queries.ts` — typed queries: `getRoles()`, `getSkills()`, `getProfile()`
8. Replace inline arrays in `page.tsx` with server-side query calls (RSC — no `use client` needed)
9. Verify build passes and page renders correctly

### Phase C — Admin (optional, future)

10. Add a simple password-protected admin route to edit content without a deploy
11. Or: use Neon's built-in SQL editor / Drizzle Studio for direct edits (simpler)

---

## Environment Variable

```env
DATABASE_URL=postgres://...neon.tech/neondb?sslmode=require
```

Add to `.env.local` for dev, and to Vercel environment variables for production.

---

## Dependencies to Add

```bash
npm install @neondatabase/serverless drizzle-orm
npm install -D drizzle-kit
```

---

## Files to Create

```
db/
  schema.ts    # Drizzle table definitions
  index.ts     # Neon client + Drizzle instance
  queries.ts   # getRoles(), getSkills(), getProfile()
```

`page.tsx` — replace inline arrays with query calls (top-level async RSC).
