import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log('Truncating tables...');
  await sql`TRUNCATE TABLE profile, skills, roles, portfolio RESTART IDENTITY CASCADE`;

  console.log('Seeding profile...');
  await db.insert(schema.profile).values({
    title: [
      'Full Stack Software Engineer',
      'Python + AWS Specialist',
      'AI Product Builder',
    ],
    hero: 'Enterprise-grade engineering with an edge for AI, serverless, and modern product delivery.',
    hero_summary:
      'I am James Horrigan, a software engineer with 25+ years in technology, specialising in Python, AWS, and scalable architecture. I design and deliver reliable platforms that balance performance, security, and real user value.',
    summary:
      'My core discipline is backend engineering with Python and cloud computing on AWS, including 9 years of commercial serverless delivery. I also work across React, Next.js, and Tailwind CSS to build complete product experiences when full stack execution is needed.\n\nI am a detail-focused problem solver who thrives on clear communication, high standards, and constant learning. I enjoy building systems that are technically robust and strategically aligned to business outcomes.',
    career_summary:
      'From embedded software engineering to modern cloud and AI-enabled platforms, each role has built depth in scalability, reliability, and customer-facing product impact.',
    location: 'Ormskirk, England',
    email: 'jahorrigan1411@gmail.com',
    linkedin_url: 'https://www.linkedin.com/in/jameshorrigan',
    github_url: 'https://github.com/JHorrigan',
  });

  console.log('Seeding skills...');
  await db.insert(schema.skills).values([
    { name: 'Python', category: 'Backend', sort_order: 0 },
    { name: 'API Development', category: 'Backend', sort_order: 1 },
    { name: 'Serverless', category: 'Backend', sort_order: 2 },
    { name: 'React', category: 'Frontend', sort_order: 3 },
    { name: 'Next.js', category: 'Frontend', sort_order: 4 },
    { name: 'Tailwind CSS', category: 'Frontend', sort_order: 5 },
    { name: 'Generative AI', category: 'AI / ML', sort_order: 6 },
    { name: 'NLP', category: 'AI / ML', sort_order: 7 },
    { name: 'AWS', category: 'Cloud & DevOps', sort_order: 8 },
    { name: 'Docker', category: 'Cloud & DevOps', sort_order: 9 },
    { name: 'CI/CD', category: 'Cloud & DevOps', sort_order: 10 },
    { name: 'Agile Delivery', category: 'Delivery', sort_order: 11 },
  ]);

  console.log('Seeding roles...');
  await db.insert(schema.roles).values([
    {
      period: 'October 2023 — July 2025',
      company: 'Intrum',
      role: 'Full Stack Software Engineer',
      summary:
        'Built customer-facing debt management portals and APIs with React, Python, and AWS serverless architecture. Delivered secure authentication, white-labelling, high-speed content delivery, and AI-assisted agent tooling.',
      highlights: null,
      related_skills: null,
      sort_order: 0,
    },
    {
      period: 'January 2019 — July 2023',
      company: 'CiiVSOFT',
      role: 'CTO / Software Engineer',
      summary:
        'Designed scalable Python systems for enterprise hiring automation, launched NLP parsing products, and led engineering delivery across major European client onboarding programs.',
      highlights: null,
      related_skills: null,
      sort_order: 1,
    },
    {
      period: 'January 2017 — December 2018',
      company: 'Pricesearcher.com',
      role: 'Data Platform Engineer',
      summary:
        'Engineered high-throughput Python data pipelines for hundreds of millions of live product updates, including large-scale migrations and platform-level optimisation work.',
      highlights: null,
      related_skills: null,
      sort_order: 2,
    },
    {
      period: 'March 2016 - December 2016',
      company: 'Capita Customer Management',
      role: 'Innovations Technician',
      summary:
        'Built innovation-focused internal tooling and rapid prototypes to improve operational efficiency and support faster decision-making across customer operations.',
      highlights: null,
      related_skills: null,
      sort_order: 3,
    },
    {
      period: 'January 2008 — March 2016',
      company: 'Capita Customer Management',
      role: 'Web Administrator / Communications Manager',
      summary:
        'Created real-time operational web tooling and reporting systems, improving decision speed and reducing manual workload across multiple business sites.',
      highlights: null,
      related_skills: null,
      sort_order: 4,
    },
    {
      period: 'August 1998 — December 2006',
      company: 'Marconi PLC',
      role: 'Software Engineer',
      summary:
        'Started in embedded software, delivering production C/C++ solutions, testing workflows, and engineering utilities while building a strong software lifecycle foundation.',
      highlights: null,
      related_skills: null,
      sort_order: 5,
    },
    {
      period: 'August 1996 — August 1998',
      company: 'Marconi PLC',
      role: 'Trainee Software Engineer',
      summary:
        'Completed foundational engineering training while supporting software delivery, testing activities, and technical documentation in a production environment.',
      highlights: null,
      related_skills: null,
      sort_order: 6,
    },
  ]);

  console.log('Seeding portfolio...');
  await db.insert(schema.portfolio).values([
    {
      title: 'Project Case Study #1',
      description: 'Coming soon',
      image_url: null,
      sort_order: 0,
    },
    {
      title: 'Project Case Study #2',
      description: 'Coming soon',
      image_url: null,
      sort_order: 1,
    },
    {
      title: 'Project Case Study #3',
      description: 'Coming soon',
      image_url: null,
      sort_order: 2,
    },
  ]);

  console.log('Done. Database seeded.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
