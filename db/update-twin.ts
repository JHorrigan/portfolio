/**
 * Non-destructive update for the digital twin's role data.
 *
 * Unlike `seed.ts`, this NEVER truncates or deletes. The live database has
 * drifted well beyond seed.ts (41 skills vs 12, 8 roles vs 7, a completely
 * rewritten profile), so running seed.ts would destroy real data.
 *
 * It leaves hero, hero_summary, title, email and the URLs alone - they are
 * current and read well. Only profile.summary is rewritten.
 *
 * It only:
 *   - UPDATEs profile.summary
 *   - UPDATEs the MyTrade role: title, period, summary, highlights
 *   - UPDATEs the XPLORATECH.AI role title
 *   - UPDATEs the CiiVSOFT role title
 *   - INSERTs skills that are genuinely absent (case-insensitive check)
 *   - UPDATEs three portfolio card descriptions
 *
 * Safe to run more than once. Run with:
 *   npx tsx db/update-twin.ts --force
 */
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, ilike } from 'drizzle-orm';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const NEW_SKILLS = [
  { name: 'LLM Integration', category: 'AI / ML', sort_order: 42 },
  { name: 'RAG', category: 'AI / ML', sort_order: 43 },
  { name: 'Agentic Development', category: 'AI / ML', sort_order: 44 },
  { name: 'Terraform', category: 'Cloud & DevOps', sort_order: 45 },
  { name: 'Fargate', category: 'Cloud & DevOps', sort_order: 46 },
];

// Original text kept almost verbatim. Two changes:
//   - the "around 500,000 products" count is removed (no public catalogue counts)
//   - "Sole engineer" -> "Founding engineer", matching the title and the wording
//     settled for the CV and LinkedIn
//   - the vague closing performance line is replaced with the real figures
const MYTRADE_SUMMARY =
  'Designed and built MYTRADEBARGAINS, a UK price and product search platform for trade professionals. ' +
  'Live since May 2026, aggregating UK merchant feeds into a single searchable index. ' +
  'Founding engineer within a small commercial team, working with AI coding agents across a Python API, ' +
  'multiple Next.js applications, Postgres with pgvector, and a Fargate pipeline that refreshes the full ' +
  'catalogue nightly. Search combines keyword matching with LLM embeddings, so a query finds the right ' +
  'products even when the wording differs, and the same pipeline categorises products and enriches ' +
  'supplier profiles automatically. Also built the admin and operational tooling the business runs on. ' +
  'Performance work took the worst endpoint from a 21-second average to under half a second while cutting ' +
  'running costs. Contract completed August 2026.';

const MYTRADE_HIGHLIGHTS = [
  'Cut the worst-performing endpoint from a 21-second average to under 0.4 seconds, removing 73% of all slow requests. Category browsing went from 5.5s to 0.9s and search settled at a 537ms average.',
  'Rebuilt product categorisation on vector embeddings and retrieval, raising confident automatic classification from 16% to 69% and cutting uncertain outcomes from 29% to 3%.',
  'Re-architected ingestion onto per-supplier AWS Fargate Spot tasks for around 70% less compute cost, resumable so an interrupted task continues rather than restarts.',
  'Applied LLMs and vector embeddings across supplier discovery, record enrichment, catalogue classification and semantic search, with every call tracked for tokens and cost.',
  'Provisioned and ran the back-office automation platform on Terraform-managed AWS EC2 running n8n with no SSH access, carrying around 15 version-controlled workflows.',
];

// Only `summary` is replaced. `hero`, `hero_summary`, title, email and the URLs
// are deliberately left alone - they are current and read well.
const PROFILE_SUMMARY =
  'I am a full stack engineer with 30 years of experience, working across various industries, and for ' +
  'companies of all sizes as a contractor and full-time employee. I have a proven track record of leading ' +
  'complex projects and driving measurable business outcomes.\n\n' +
  'My recent work is AI-native. I most recently built and launched a UK trade price-comparison platform ' +
  'end to end, delivering sub-second search and browse, cutting its worst endpoint from a 21-second average ' +
  'to under 0.4 seconds, and raising automatic product classification from 16% to 69% using vector ' +
  'embeddings and retrieval. Earlier delivery includes a 70% reduction in customer call volumes for a debt ' +
  'management company, £1.3 million in hiring cost savings for a transport giant, and improved search ' +
  'coverage through the ingestion of 300 million products for an ambitious product search company.\n\n' +
  'I am also the founder of XPLORATECH.AI, the limited company I have contracted through since 2023, ' +
  'providing full-stack engineering and modern AI engineering to agencies and product teams.\n\n' +
  'My core skillset is Next.js, React and Tailwind CSS on the frontend, served via AWS, and supported by ' +
  'AWS services and Python on the backend. I build agentic applications with scalable LLM integration, and ' +
  'I have adopted the latest agentic development tools throughout my workflow, alongside the engineering ' +
  'standards and verification that keep that output reliable.';


// ---------------------------------------------------------------------------
// Career section content. The hero stats (1.3M, 70%, 300M, 1.3B, <1s) were
// claims the page never substantiated - the roles that earned them said nothing
// about them. These summaries and highlights close that gap.
// ---------------------------------------------------------------------------

const ROLE_CONTENT: Record<string, { summary: string; highlights: string[] }> = {
  Intrum: {
    summary:
      'Led full stack development of a new customer self-service portal for a European debt management group, ' +
      'built with React, Python, API Gateway and AWS serverless architecture and deployed across multiple ' +
      'regulated client bases. Delivered secure authentication, white-labelling, high-speed content delivery ' +
      'and AI-assisted tooling for contact centre agents.',
    highlights: [
      'Reduced call volumes to the contact centre by 70% after launch of the self-service portal.',
      'Cut page load latency by over 40% with a content delivery solution on AWS Lambda and CloudFront.',
      'Implemented OAuth2 authentication and white-labelling across regulated client deployments, supporting client-specific branding and authentication flows that helped secure top-tier clients.',
      'Built an Amazon Connect agent interface presenting AI-powered call transcripts, sentiment analysis and RAG interactions, improving agent performance.',
    ],
  },
  CiiVSOFT: {
    summary:
      'Led the engineering function as CTO, designing a scalable Python architecture for concurrent data ' +
      'ingestion from enterprise applicant tracking systems, with real-time business logic providing automated ' +
      'hiring assistance. Built the team, ran code reviews and mentoring, and delivered client onboarding ' +
      'across Europe. Stack was Python, Django, Celery, Docker and AWS, using asynchronous and multiprocessing ' +
      'techniques to overcome IO and CPU-bound limits.',
    highlights: [
      'Delivered £1.3 million in hiring cost savings for a transport operator.',
      'Built an in-house NLP resume parser with Flask and spaCy, removing a costly and unreliable third-party dependency, processing thousands of job applications per hour for the first enterprise client.',
      'Onboarded major European clients including Alstom, Agoda, Babcock, EDP and Glovo.',
      'Replaced key infrastructure with serverless microservices on EventBridge, Step Functions, Lambda and DynamoDB.',
    ],
  },
  'Pricesearcher.com': {
    summary:
      'Worked in the data platform team behind a vertical product search engine, using Python and AWS to ' +
      'process live product and price data direct from merchants at least once a day. Built a feed processor ' +
      'designed to handle any feed in any format - CSV, XML, JSON and text, from URL and FTP sources - using ' +
      'parallel processing and queues for speed and scale.',
    highlights: [
      'Processed 300 million live products and price changes daily, direct from merchants.',
      'Led a migration of 300 million products from Elasticsearch to DynamoDB, rewriting the processors from PHP to Python with zero downtime.',
      'Applied a field value change across a database of 1.3 billion products, updating both the data and the processors that read it.',
      'Built bespoke feed processors for Amazon, eBay and German marketplace Billiger, and rebuilt the downloader to handle frequent downloads from around 1,000 clients.',
    ],
  },
};

const MYTRADE_SUMMARY_TIGHT =
  'Designed and built MYTRADEBARGAINS, a UK price and product search platform for trade professionals, from ' +
  'an empty repository to a live product earning affiliate revenue from launch day in May 2026. Founding ' +
  'engineer within a small commercial team, across a Python serverless API, multiple Next.js applications, ' +
  'Postgres with pgvector, and a Fargate pipeline that refreshes the full catalogue nightly. Search combines ' +
  'keyword matching with LLM embeddings, so a query finds the right products even when the wording differs, ' +
  'and the same pipeline categorises products and enriches supplier profiles automatically. Also built the ' +
  'admin and operational tooling the business runs on, and the engineering harness behind the AI-assisted ' +
  'workflow itself - written standards, isolated workstreams and deploy locking.';

// Rebalanced: three years of contracting leads, the AI method follows as one
// sentence. The previous version gave a third of its length to the January 2026
// retraining, which foregrounded a two-month period over a three-year record.
// "certifying" softened to "training" - the courses are Udemy completions, not
// accredited qualifications, and should not read as formal credentials.
const XPLORA_SUMMARY =
  'My own limited company, and the vehicle I contract and build through. Since 2023 I have delivered full ' +
  'stack engineering for agencies and product teams on contract, across the debt management and construction ' +
  'supply sectors, taking production systems end to end from front end through back end to infrastructure. ' +
  'I specialise in vector search, retrieval pipelines and language-model features running in production. ' +
  'Alongside client work I build and operate my own products, and rebuilt the consultancy\'s own ' +
  'infrastructure with serverless APIs, an internal admin platform and an agency site. My delivery method is ' +
  'now AI-native: agent workflows, written coding standards and automated verification built around ' +
  'AI-assisted engineering, backed by self-directed training in AI-assisted development and n8n automation.';

async function update() {
  console.log('Updating profile.summary only (hero, hero_summary, title, email untouched)...');
  await db.update(schema.profile).set({ summary: PROFILE_SUMMARY });

  console.log('Adding genuinely missing skills...');
  const existingSkills = await db.select().from(schema.skills);
  const lowerNames = new Set(existingSkills.map((s) => s.name.toLowerCase()));

  for (const skill of NEW_SKILLS) {
    if (lowerNames.has(skill.name.toLowerCase())) {
      console.log(`  skip (exists): ${skill.name}`);
      continue;
    }
    await db.insert(schema.skills).values(skill);
    console.log(`  added: ${skill.name}`);
  }

  console.log('Updating the MyTrade role in place...');
  const mytrade = await db
    .select()
    .from(schema.roles)
    .where(ilike(schema.roles.company, '%mytrade%'));

  if (mytrade.length === 0) {
    console.error('  WARNING: no MyTrade role found - nothing updated.');
  }
  for (const row of mytrade) {
    await db
      .update(schema.roles)
      .set({
        role: 'Founding Engineer',
        period: 'March 2026 — August 2026',
        summary: MYTRADE_SUMMARY,
        highlights: MYTRADE_HIGHLIGHTS,
      })
      .where(eq(schema.roles.id, row.id));
    console.log(`  id=${row.id}: "${row.role}" -> "Founding Engineer", "${row.period}" -> "March 2026 — August 2026"`);
  }

  console.log('Updating the XPLORATECH.AI role title (summary left as-is)...');
  const xplora = await db
    .select()
    .from(schema.roles)
    .where(ilike(schema.roles.company, '%xplora%'));

  for (const row of xplora) {
    await db
      .update(schema.roles)
      .set({ role: 'Founder and Full Stack AI Engineer' })
      .where(eq(schema.roles.id, row.id));
    console.log(`  id=${row.id}: "${row.role}" -> "Founder and Full Stack AI Engineer"`);
  }

  console.log('Correcting the CiiVSOFT role title...');
  await db
    .update(schema.roles)
    .set({ role: 'CTO and Software Engineer' })
    .where(eq(schema.roles.company, 'CiiVSOFT'));

  // These match the wording already sitting in seed.ts, which was edited but
  // never run. "AI Automation Agency" contradicts how XPLORATECH.AI is now
  // described everywhere else - a contracting vehicle for full-stack engineering.
  console.log('Updating portfolio card descriptions...');
  const CARDS: Array<[string, string]> = [
    ['XPLORATECH.AI', 'My limited company, and the vehicle I contract and build through'],
    ['XA3', 'Admin platform I built to run my own consultancy'],
    ['Xploratech API', 'Serverless API behind my own applications'],
  ];
  for (const [title, description] of CARDS) {
    await db
      .update(schema.portfolio)
      .set({ description })
      .where(eq(schema.portfolio.title, title));
    console.log(`  ${title}: "${description}"`);
  }

  // Remove the job-search-platform sentence from the XPLORATECH.AI summary.
  // Done as a read-modify-write rather than overwriting the whole field, so any
  // other edits made via XA3 survive. Idempotent: a no-op once removed.
  console.log('Removing the job-search platform sentence...');
  const SENTENCE =
    ' Currently building an AI-powered job search and application platform on a Next.js monorepo supported by a Python API.';
  for (const row of xplora) {
    const current = row.summary ?? '';
    if (!current.includes(SENTENCE.trim())) {
      console.log(`  id=${row.id}: already absent`);
      continue;
    }
    const cleaned = current.replace(SENTENCE, '').replace(SENTENCE.trim(), '').trimEnd();
    await db
      .update(schema.roles)
      .set({ summary: cleaned })
      .where(eq(schema.roles.id, row.id));
    console.log(`  id=${row.id}: removed (${current.length} -> ${cleaned.length} chars)`);
  }

  console.log('Updating earlier role summaries and highlights...');
  for (const [company, content] of Object.entries(ROLE_CONTENT)) {
    await db
      .update(schema.roles)
      .set({ summary: content.summary, highlights: content.highlights })
      .where(eq(schema.roles.company, company));
    console.log(`  ${company}: summary + ${content.highlights.length} highlights`);
  }

  console.log('Tightening the MyTrade summary...');
  for (const row of mytrade) {
    await db
      .update(schema.roles)
      .set({ summary: MYTRADE_SUMMARY_TIGHT })
      .where(eq(schema.roles.id, row.id));
  }

  console.log('Rebalancing the XPLORATECH.AI summary...');
  for (const row of xplora) {
    await db
      .update(schema.roles)
      .set({ summary: XPLORA_SUMMARY })
      .where(eq(schema.roles.id, row.id));
    console.log(`  id=${row.id}: ${(row.summary ?? '').length} -> ${XPLORA_SUMMARY.length} chars`);
  }

  console.log('Done. Nothing was deleted.');
}

if (!process.argv.includes('--force')) {
  console.error('Aborted. This script updates role data and profile.summary in place (no truncate, no delete).');
  console.error('Run with --force to confirm: npx tsx db/update-twin.ts --force');
  process.exit(1);
}

update().catch((err) => {
  console.error(err);
  process.exit(1);
});
