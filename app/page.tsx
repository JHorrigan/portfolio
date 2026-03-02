export default function Home() {
  const year = new Date().getFullYear();

  const journey = [
    {
      period: "2023 — 2025",
      company: "Intrum",
      role: "Full Stack Software Engineer",
      summary:
        "Built customer-facing debt management portals and APIs with React, Python, and AWS serverless architecture. Delivered secure authentication, white-labelling, high-speed content delivery, and AI-assisted agent tooling.",
    },
    {
      period: "2019 — 2023",
      company: "CiiVSOFT",
      role: "CTO / Software Engineer",
      summary:
        "Designed scalable Python systems for enterprise hiring automation, launched NLP parsing products, and led engineering delivery across major European client onboarding programs.",
    },
    {
      period: "2017 — 2018",
      company: "Pricesearcher.com",
      role: "Data Platform Engineer",
      summary:
        "Engineered high-throughput Python data pipelines for hundreds of millions of live product updates, including large-scale migrations and platform-level optimisation work.",
    },
    {
      period: "2016",
      company: "Capita Customer Management",
      role: "Innovations Technician",
      summary:
        "Built innovation-focused internal tooling and rapid prototypes to improve operational efficiency and support faster decision-making across customer operations.",
    },
    {
      period: "2008 — 2016",
      company: "Capita Customer Management",
      role: "Web Administrator / Communications Manager",
      summary:
        "Created real-time operational web tooling and reporting systems, improving decision speed and reducing manual workload across multiple business sites.",
    },
    {
      period: "1998 — 2006",
      company: "Marconi PLC",
      role: "Software Engineer",
      summary:
        "Started in embedded software, delivering production C/C++ solutions, testing workflows, and engineering utilities while building a strong software lifecycle foundation.",
    },
    {
      period: "1996 — 1998",
      company: "Marconi PLC",
      role: "Trainee Software Engineer",
      summary:
        "Completed foundational engineering training while supporting software delivery, testing activities, and technical documentation in a production environment.",
    },
  ];

  const skillGroups = [
    {
      title: "Backend",
      items: ["Python", "API Development", "Serverless"],
    },
    {
      title: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      title: "AI / ML",
      items: ["Generative AI", "NLP"],
    },
    {
      title: "Cloud & DevOps",
      items: ["AWS", "Docker", "CI/CD"],
    },
    {
      title: "Delivery",
      items: ["Agile Delivery"],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(14,116,144,0.2),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/80 to-transparent" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 md:px-10 md:py-14">
        <header className="glass flex items-center justify-between gap-4 rounded-2xl px-6 py-4">
          <p className="text-sm font-semibold tracking-[0.18em] text-cyan-300">
            JAMES HORRIGAN
          </p>
          <div className="flex items-center gap-2">
            <a
              href="#about"
              className="rounded-full border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900/70"
            >
              About
            </a>
            <a
              href="#journey"
              className="rounded-full border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900/70"
            >
              Career
            </a>
            <a
              href="#skills"
              className="rounded-full border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900/70"
            >
              Skills
            </a>
            <a
              href="#portfolio"
              className="rounded-full border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900/70"
            >
              Portfolio
            </a>
            <a
              className="rounded-full border border-cyan-300/40 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/10"
              href="mailto:jahorrigan1411@gmail.com"
            >
              Contact
            </a>
          </div>
        </header>

        <section className="glass rounded-3xl p-8 md:p-12">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-cyan-200">
            FULL STACK SOFTWARE ENGINEER
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Enterprise-grade engineering with an edge for AI, serverless, and
            modern product delivery.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            I am James Horrigan, a software engineer with 25+ years in
            technology, specialising in Python, AWS, and scalable architecture.
            I design and deliver reliable platforms that balance performance,
            security, and real user value.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/jameshorrigan"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              LinkedIn Profile
            </a>
            <a
              href="#portfolio"
              className="rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-300 hover:bg-slate-900"
            >
              Portfolio Links
            </a>
          </div>
        </section>

        <section id="about" className="glass rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            About Me
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            My core discipline is backend engineering with Python and cloud
            computing on AWS, including 9 years of commercial serverless
            delivery. I also work across React, Next.js, and Tailwind CSS to
            build complete product experiences when full stack execution is
            needed.
          </p>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            I am a detail-focused problem solver who thrives on clear
            communication, high standards, and constant learning. I enjoy
            building systems that are technically robust and strategically
            aligned to business outcomes.
          </p>
        </section>

        <section id="skills" className="glass rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Skills
          </h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            Core technologies and capabilities used across platform, product,
            and delivery work.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {skillGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5"
              >
                <h3 className="text-sm font-semibold tracking-[0.12em] text-cyan-300">
                  {group.title}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-sm text-slate-200"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="journey" className="glass rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Career Journey
          </h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            From embedded software engineering to modern cloud and AI-enabled
            platforms, each role has built depth in scalability, reliability,
            and customer-facing product impact.
          </p>

          <ol className="mt-8 space-y-5">
            {journey.map((item) => (
              <li
                key={`${item.company}-${item.period}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
              >
                <p className="text-xs font-semibold tracking-[0.14em] text-cyan-300">
                  {item.period}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {item.role} · {item.company}
                </h3>
                <p className="mt-2 leading-7 text-slate-300">{item.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="portfolio" className="glass rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Portfolio Links (Future)
          </h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            Dedicated case studies and live projects will be linked here as the
            portfolio expands.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-slate-200">
              <h3 className="font-semibold text-white">Project Case Study #1</h3>
              <p className="mt-1 text-sm text-slate-300">Coming soon</p>
            </article>
            <article className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-slate-200">
              <h3 className="font-semibold text-white">Project Case Study #2</h3>
              <p className="mt-1 text-sm text-slate-300">Coming soon</p>
            </article>
            <article className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-slate-200">
              <h3 className="font-semibold text-white">Project Case Study #3</h3>
              <p className="mt-1 text-sm text-slate-300">Coming soon</p>
            </article>
          </div>
        </section>

        <footer className="pb-2 text-center text-sm text-slate-400">
          <p>
            Based in Ormskirk, England · Email:
            <a
              href="mailto:jahorrigan1411@gmail.com"
              className="text-cyan-300 hover:text-cyan-200"
            >
              jahorrigan1411@gmail.com
            </a>
          </p>
          <p className="mt-2">© {year} James Horrigan</p>
        </footer>
      </main>
    </div>
  );
}
