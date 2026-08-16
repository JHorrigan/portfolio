/**
 * Read-only audit of the skills / roles / role_skills graph.
 * Prints every skill by category, every role with its linked skills, and any
 * skill that is not linked to a single role.
 *
 * Run: npx tsx --env-file=.env.local db/audit-skills.ts
 */
import { asc } from 'drizzle-orm';
import { db } from './index';
import { roles, roleSkills, skills } from './schema';

async function main() {
  const allSkills = await db.select().from(skills).orderBy(asc(skills.sort_order));
  const allRoles = await db.select().from(roles).orderBy(asc(roles.sort_order));
  const links = await db.select().from(roleSkills);

  console.log('=== SKILLS BY CATEGORY ===');
  const byCat = new Map<string, typeof allSkills>();
  for (const s of allSkills) {
    const c = s.category ?? 'Other';
    if (!byCat.has(c)) byCat.set(c, []);
    byCat.get(c)!.push(s);
  }
  for (const [cat, list] of byCat) {
    console.log(`\n${cat} (${list.length})`);
    for (const s of list) console.log(`  ${s.id}\t${s.name}`);
  }

  console.log('\n\n=== ROLES AND LINKED SKILLS ===');
  for (const r of allRoles) {
    const linked = links.filter((l) => l.role_id === r.id);
    const names = linked.map((l) => {
      const s = allSkills.find((x) => x.id === l.skill_id);
      return s ? `${s.name} [${s.category}]` : `?? id=${l.skill_id}`;
    });
    console.log(`\n[${r.id}] ${r.period} | ${r.company} | ${r.role}`);
    console.log(`  linked skills (${names.length}): ${names.join(', ') || 'NONE'}`);
    console.log(`  summary: ${(r.summary ?? '').slice(0, 400)}`);
  }

  console.log('\n\n=== SKILLS LINKED TO NO ROLE ===');
  const orphans = allSkills.filter((s) => !links.some((l) => l.skill_id === s.id));
  for (const s of orphans) console.log(`  ${s.id}\t${s.name} [${s.category}]`);
  console.log(`  total orphans: ${orphans.length} of ${allSkills.length}`);

  console.log('\n\n=== CATEGORY COVERAGE ACROSS ROLES ===');
  for (const [cat] of byCat) {
    const rolesWithCat = allRoles.filter((r) =>
      links.some((l) => {
        if (l.role_id !== r.id) return false;
        const s = allSkills.find((x) => x.id === l.skill_id);
        return s?.category === cat;
      })
    );
    console.log(`  ${cat}: ${rolesWithCat.length} of ${allRoles.length} roles`);
  }
}

main();
