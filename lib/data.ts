import type { Role, SkillGroup } from "@/types";

export const roles: Role[] = [
  {
    company: "Intrum",
    title: "Full Stack Software Engineer",
    period: "Oct 2023 – Jul 2025",
    location: "Ormskirk, UK",
    summary: [
      "Delivered customer-facing web portals allowing users to login, view account data, arrange payment plans, and make online payments — significantly reducing contact centre call volumes.",
      "Built Amazon Cognito custom authentication flows and white-labelling features to enable product flexibility across clients.",
      "Developed a content delivery solution for media assets via Amazon CloudFront edge locations.",
      "Built UI to stream live Amazon Connect call transcripts with AI sentiment analysis to agents.",
    ],
    tech: ["React", "Python", "AWS Lambda", "API Gateway", "Amazon Cognito", "CloudFront", "MUI", "Docker", "Azure DevOps", "Serverless"],
  },
  {
    company: "CiiVSOFT",
    title: "CTO / Software Engineer",
    period: "Jan 2019 – Jul 2023",
    location: "Warrington, UK",
    summary: [
      "Designed a highly scalable Python architecture for concurrent data ingestion from enterprise-level applicant tracking systems, processing thousands of job applications per hour.",
      "Built an in-house NLP resume parser using spaCy and AWS, removing a costly third-party dependency and improving scalability at scale.",
      "Went live with first enterprise client; subsequently onboarded Alstom, Agoda, Babcock, EDP, and Glovo across Europe.",
      "Formed and led a development team — daily standups, code reviews, mentoring, JIRA sprint management.",
      "Replaced key infrastructure with serverless microservices using EventBridge, Step Functions, DynamoDB, and Lambda.",
    ],
    tech: ["Python", "AWS", "Django", "Celery", "spaCy", "NLP", "DynamoDB", "Step Functions", "EventBridge", "Lambda", "Docker", "Flask"],
  },
  {
    company: "Pricesearcher.com",
    title: "Data Platform Engineer",
    period: "Jan 2017 – Dec 2018",
    location: "Preston, UK",
    summary: [
      "Processed 300M+ live product price changes daily from merchants using Python and AWS.",
      "Built a universal feed processor handling any format (CSV, XML, JSON, FTP) with parallel processing for speed and scalability.",
      "Led two large-scale data migration projects including moving 300M products from Elasticsearch to DynamoDB and a full-database identifier migration across 1.3B records.",
    ],
    tech: ["Python", "AWS", "SQS", "Elasticsearch", "DynamoDB", "EBS"],
  },
  {
    company: "Capita Customer Management",
    title: "Innovations Technician",
    period: "Mar 2016 – Dec 2016",
    location: "Leeds, UK",
    summary: [
      "Built real-time web applications using Node.js (Express, Koa) including a productivity tracker and a gamified sales performance tool.",
      "Developed front-end UI with HTML5, CSS3, Bootstrap, JavaScript, and jQuery; integrated MongoDB via Socket.IO.",
      "Supported multi-site application launches across Glasgow, Runcorn, and Liverpool.",
    ],
    tech: ["Node.js", "Express", "Koa", "Socket.IO", "MongoDB", "JavaScript", "jQuery"],
  },
  {
    company: "Capita Customer Management",
    title: "Web Administrator / Communications Manager",
    period: "Jan 2008 – Mar 2016",
    location: "Liverpool, UK",
    summary: [
      "Administered multi-site intranet platforms and built ad-hoc web features in HTML, CSS, and jQuery to automate team workflows.",
      "Delivered internal tools including call loggers, workload management systems, and quality scoring trackers — saving significant manual effort across operations.",
    ],
    tech: ["HTML", "CSS", "jQuery", "VBA"],
  },
  {
    company: "Marconi PLC",
    title: "Software Engineer",
    period: "Aug 1998 – Sep 2006",
    location: "UK",
    summary: [
      "Developed payphone software in embedded C, resolving defects in the generic software base to international client requirements.",
      "Built Windows-based utilities in C++ to automate time-consuming engineering tasks.",
      "Performed unit testing using Hitachi emulation equipment.",
    ],
    tech: ["C", "C++", "Embedded Systems"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Backend",
    skills: ["Python", "AWS Lambda", "API Gateway", "DynamoDB", "Celery", "Django", "Flask", "Node.js"],
  },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "MUI", "JavaScript"],
  },
  {
    label: "AI / ML",
    skills: ["spaCy", "NLP", "Generative AI", "Amazon Connect AI"],
  },
  {
    label: "Cloud & DevOps",
    skills: ["AWS", "Serverless", "Docker", "CI/CD", "Azure DevOps", "EventBridge", "Step Functions", "CloudFront", "Amazon Cognito"],
  },
  {
    label: "Data",
    skills: ["Elasticsearch", "DynamoDB", "SQS", "MongoDB", "SQL"],
  },
];
