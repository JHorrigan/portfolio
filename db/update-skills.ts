/**
 * Skills graph correction, 2026-08-16.
 *
 * Fixes the Career section's stack filters, which could not highlight roles
 * correctly because the skill data behind them was wrong:
 *
 *   1. `PostgreSQL` was categorised Backend, not Database -- so clicking
 *      "Database" dimmed the MyTrade role despite Postgres being its main store.
 *   2. `Django` was categorised Frontend.
 *   3. `Typescript` (32) and `TypeScript` (165) were duplicate rows; roles linked
 *      to different ones and both rendered in the Skills section.
 *   4. Eight skills were linked to no role at all, so they could never highlight
 *      anything: Generative AI, CI/CD, pgvector, LLM Integration, RAG,
 *      Agentic Development, Terraform, Fargate.
 *   5. The `Delivery` category was empty, so its chip never rendered even though
 *      `page.tsx` defines a palette for it.
 *
 * Also links each role to the skills its CV entry actually evidences -- MyTrade
 * had 7 skills linked where the CV describes more than 25.
 *
 * NEVER truncates. Inserts and targeted updates only. Skills are matched by name
 * so a re-run is a no-op rather than a duplicate.
 *
 * Dry run: npx tsx --env-file=.env.local db/update-skills.ts
 * Apply:   npx tsx --env-file=.env.local db/update-skills.ts --apply
 */
import { and, eq } from 'drizzle-orm';
import { db } from './index';
import { roles, roleSkills, skills } from './schema';

const APPLY = process.argv.includes('--apply');

/** Category corrections for existing rows. */
const RECATEGORISE: Array<[string, string]> = [
  ['PostgreSQL', 'Database'],
  ['Django', 'Backend'],
  ['CI/CD', 'Delivery'],
];

/** New skills, in display order after the existing max sort_order of 46. */
const NEW_SKILLS: Array<[string, string]> = [
  ['Neon', 'Database'],
  ['SQL', 'Database'],
  ['Database Migrations', 'Database'],
  ['API Gateway', 'Cloud & DevOps'],
  ['CloudFront', 'Cloud & DevOps'],
  ['Cognito', 'Cloud & DevOps'],
  ['Infrastructure as Code', 'Cloud & DevOps'],
  ['AWS Bedrock', 'AI / ML'],
  ['Prompt Engineering', 'AI / ML'],
  ['Semantic Search', 'AI / ML'],
  ['Claude Code', 'AI / ML'],
  ['Celery', 'Backend'],
  ['Stripe', 'Backend'],
  ['OAuth2', 'Backend'],
  ['MUI', 'Frontend'],
  ['pytest', 'Delivery'],
  ['Playwright', 'Delivery'],
  ['Git', 'Delivery'],
  ['Agile Delivery', 'Delivery'],
  ['Technical Leadership', 'Delivery'],
  ['Solution Architecture', 'Delivery'],
];

/** Skills each role should link, by role id. Additive -- existing links stay. */
const ROLE_LINKS: Record<number, string[]> = {
  // XPLORATECH.AI -- Founder and Full Stack AI Engineer (umbrella)
  7: [
    'TypeScript', 'PostgreSQL', 'Vector Search', 'RAG', 'LLM Integration',
    'Agentic Development', 'Generative AI', 'Claude Code', 'Technical Leadership',
    'Client Communication', 'Solution Architecture',
  ],
  // MYTRADE TECHNOLOGIES -- Founding Engineer
  9: [
    'DynamoDB', 'Neon', 'SQL', 'Database Migrations', 'pgvector', 'RAG',
    'LLM Integration', 'Agentic Development', 'Semantic Search', 'AWS Bedrock',
    'Prompt Engineering', 'OpenAI', 'Anthropic', 'Claude Code', 'Terraform',
    'Fargate', 'Lambda', 'API Gateway', 'Cognito', 'CloudFront',
    'Infrastructure as Code', 'SST', 'Docker', 'n8n', 'React', 'Tailwind CSS',
    'Stripe', 'CI/CD', 'Playwright', 'pytest', 'Git', 'Solution Architecture',
    'Agile Delivery', 'Startup',
  ],
  // Intrum -- Full Stack Software Engineer
  1: [
    'Lambda', 'API Gateway', 'CloudFront', 'OAuth2', 'NLP',
    'Technical Leadership', 'Solution Architecture', 'Git', 'CI/CD',
    'MUI', 'DynamoDB',
  ],
  // CiiVSOFT -- CTO and Software Engineer
  2: [
    'Celery', 'SQL', 'Technical Leadership', 'Solution Architecture',
    'Agile Delivery', 'Git', 'CI/CD', 'pytest',
  ],
  // Pricesearcher.com -- Data Platform Engineer
  3: ['SQL', 'Database Migrations', 'Git'],
  // Capita -- Innovations Technician
  4: ['Git'],
  // Capita -- Web Administrator / Communications Manager
  5: ['SQL'],
};

/**
 * Skills to remove entirely. `Vitest` was dropped on review: the tooling was
 * wired on MyTrade but no tests were written, so it is not a claim worth
 * defending under questioning.
 */
const DELETE_SKILLS = ['Vitest'];

/** Links to remove, [roleId, skillName]. MUI belongs to Intrum, not the umbrella. */
const UNLINK: Array<[number, string]> = [[7, 'MUI']];

async function main() {
  console.log(APPLY ? '=== APPLYING ===\n' : '=== DRY RUN (pass --apply to write) ===\n');

  const before = await db.select().from(skills);
  const byName = new Map(before.map((s) => [s.name, s]));
  let maxSort = Math.max(...before.map((s) => s.sort_order ?? 0));

  // 1. Recategorise
  for (const [name, category] of RECATEGORISE) {
    const row = byName.get(name);
    if (!row) { console.log(`  SKIP recategorise, not found: ${name}`); continue; }
    if (row.category === category) { console.log(`  ok already: ${name} [${category}]`); continue; }
    console.log(`  RECATEGORISE ${name}: ${row.category} -> ${category}`);
    if (APPLY) await db.update(skills).set({ category }).where(eq(skills.id, row.id));
  }

  // 2. Merge the duplicate TypeScript rows onto the correctly-cased one
  const dupe = byName.get('Typescript');
  const keep = byName.get('TypeScript');
  if (dupe && keep) {
    const dupeLinks = await db.select().from(roleSkills).where(eq(roleSkills.skill_id, dupe.id));
    console.log(`\n  MERGE Typescript(${dupe.id}) -> TypeScript(${keep.id}), ${dupeLinks.length} link(s) to repoint`);
    if (APPLY) {
      for (const link of dupeLinks) {
        const exists = await db.select().from(roleSkills)
          .where(and(eq(roleSkills.role_id, link.role_id), eq(roleSkills.skill_id, keep.id)));
        if (exists.length === 0) {
          await db.insert(roleSkills).values({ role_id: link.role_id, skill_id: keep.id, sort_order: link.sort_order ?? 0 });
        }
      }
      await db.delete(roleSkills).where(eq(roleSkills.skill_id, dupe.id));
      await db.delete(skills).where(eq(skills.id, dupe.id));
    }
  }

  // 3. Insert new skills
  console.log('');
  for (const [name, category] of NEW_SKILLS) {
    if (byName.has(name)) { console.log(`  ok exists: ${name}`); continue; }
    maxSort += 1;
    console.log(`  INSERT ${name} [${category}] sort=${maxSort}`);
    if (APPLY) {
      const [row] = await db.insert(skills).values({ name, category, sort_order: maxSort }).returning();
      byName.set(name, row);
    }
  }

  // 4. Link skills to roles
  console.log('');
  const allRoles = await db.select().from(roles);
  const nameToId = new Map(
    (APPLY ? await db.select().from(skills) : before).map((s) => [s.name, s.id])
  );
  let linked = 0;
  let missing = 0;
  for (const [roleId, names] of Object.entries(ROLE_LINKS)) {
    const id = Number(roleId);
    const role = allRoles.find((r) => r.id === id);
    const existing = await db.select().from(roleSkills).where(eq(roleSkills.role_id, id));
    const have = new Set(existing.map((l) => l.skill_id));
    const toAdd: string[] = [];
    for (const name of names) {
      const skillId = nameToId.get(name);
      if (skillId == null) {
        if (!APPLY && NEW_SKILLS.some(([n]) => n === name)) { toAdd.push(`${name} (new)`); continue; }
        console.log(`  !! skill not found: ${name}`);
        missing += 1;
        continue;
      }
      if (have.has(skillId)) continue;
      toAdd.push(name);
      if (APPLY) {
        await db.insert(roleSkills).values({ role_id: id, skill_id: skillId, sort_order: existing.length + toAdd.length });
      }
    }
    linked += toAdd.length;
    console.log(`  [${id}] ${role?.company ?? '?'} +${toAdd.length}: ${toAdd.join(', ') || '(nothing new)'}`);
  }

  // 5. Removals
  console.log('');
  for (const [roleId, name] of UNLINK) {
    const skillId = nameToId.get(name);
    if (skillId == null) { console.log(`  ok, nothing to unlink: ${name}`); continue; }
    const found = await db.select().from(roleSkills)
      .where(and(eq(roleSkills.role_id, roleId), eq(roleSkills.skill_id, skillId)));
    if (found.length === 0) { console.log(`  ok already unlinked: role ${roleId} -/- ${name}`); continue; }
    console.log(`  UNLINK role ${roleId} -/- ${name}`);
    if (APPLY) {
      await db.delete(roleSkills)
        .where(and(eq(roleSkills.role_id, roleId), eq(roleSkills.skill_id, skillId)));
    }
  }
  for (const name of DELETE_SKILLS) {
    const skillId = nameToId.get(name);
    if (skillId == null) { console.log(`  ok already deleted: ${name}`); continue; }
    console.log(`  DELETE skill ${name} (${skillId}) and all its role links`);
    if (APPLY) {
      await db.delete(roleSkills).where(eq(roleSkills.skill_id, skillId));
      await db.delete(skills).where(eq(skills.id, skillId));
    }
  }

  console.log(`\n  links added: ${linked}, skills not found: ${missing}`);
  console.log(APPLY ? '\n=== DONE ===' : '\n=== DRY RUN, nothing written ===');
}

main();
