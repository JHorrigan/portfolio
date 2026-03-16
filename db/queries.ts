import { asc, eq } from 'drizzle-orm';
import { db } from './index';
import { portfolio, profile, roles, roleSkills, skills } from './schema';

export async function getProfile() {
  const rows = await db.select().from(profile).limit(1);
  return rows[0] ?? null;
}

export async function getRoles() {
  const rows = await db
    .select({
      id: roles.id,
      period: roles.period,
      company: roles.company,
      role: roles.role,
      summary: roles.summary,
      highlights: roles.highlights,
      sort_order: roles.sort_order,
      skillId: skills.id,
      skillName: skills.name,
      skillCategory: skills.category,
    })
    .from(roles)
    .leftJoin(roleSkills, eq(roleSkills.role_id, roles.id))
    .leftJoin(skills, eq(roleSkills.skill_id, skills.id))
    .orderBy(asc(roles.sort_order), asc(roleSkills.sort_order), asc(skills.sort_order));

  const roleMap = new Map<number, {
    id: number;
    period: string;
    company: string;
    role: string;
    summary: string | null;
    highlights: string[] | null;
    sort_order: number | null;
    skills: Array<{ id: number; name: string; category: string | null }>;
  }>();

  for (const row of rows) {
    if (!roleMap.has(row.id)) {
      roleMap.set(row.id, {
        id: row.id,
        period: row.period,
        company: row.company,
        role: row.role,
        summary: row.summary,
        highlights: row.highlights,
        sort_order: row.sort_order,
        skills: [],
      });
    }

    const roleEntry = roleMap.get(row.id);
    if (!roleEntry) continue;

    if (row.skillName && row.skillId != null) {
      const alreadyAdded = roleEntry.skills.some((skill) => skill.id === row.skillId);
      if (!alreadyAdded) {
        roleEntry.skills.push({
          id: row.skillId,
          name: row.skillName,
          category: row.skillCategory,
        });
      }
    }
  }

  return Array.from(roleMap.values());
}

export async function getPortfolio() {
  return db.select().from(portfolio).orderBy(asc(portfolio.sort_order));
}

export async function getSkillGroups() {
  const rows = await db.select().from(skills).orderBy(asc(skills.sort_order));
  const map = new Map<string, string[]>();
  for (const row of rows) {
    const cat = row.category ?? 'Other';
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(row.name);
  }
  return Array.from(map.entries()).map(([title, items]) => ({ title, items }));
}
