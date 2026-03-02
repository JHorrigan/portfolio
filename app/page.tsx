import { /*getPortfolio,*/ getProfile, getRoles, getSkillGroups } from '../db/queries';

export default async function Home() {
  const year = new Date().getFullYear();
  const [profile, journey, skillGroups /*, portfolioItems*/] = await Promise.all([
    getProfile(),
    getRoles(),
    getSkillGroups(),
    // getPortfolio(),
  ]);

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
            <div className="hidden md:flex items-center gap-2">
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
            </div>
            {profile?.email && (
              <a
                className="rounded-full border border-cyan-300/40 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/10"
                href={`mailto:${profile.email}`}
              >
                Contact
              </a>
            )}
          </div>
        </header>

        <section className="glass rounded-3xl p-8 md:p-12">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-cyan-200">
            {profile?.title?.toUpperCase() ?? 'FULL STACK SOFTWARE ENGINEER'}
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {profile?.hero ?? 'Enterprise-grade engineering with an edge for AI, serverless, and modern product delivery.'}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            {profile?.hero_summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                LinkedIn Profile
              </a>
            )}
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-300 hover:bg-slate-900"
              >
                GitHub
              </a>
            )}
            {/* <a
              href="#portfolio"
              className="rounded-full border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-300 hover:bg-slate-900"
            >
              Portfolio Links
            </a> */}
          </div>
        </section>

        <section id="about" className="glass rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            About Me
          </h2>
          {profile?.summary?.split('\n\n').map((para, i) => (
            <p key={i} className="mt-4 max-w-4xl leading-8 text-slate-300">
              {para}
            </p>
          ))}
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
            {profile?.career_summary}
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

        {/* <section id="portfolio" className="glass rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Portfolio Links (Future)
          </h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            Dedicated case studies and live projects will be linked here as the
            portfolio expands.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {portfolioItems.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-slate-200"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                )}
              </article>
            ))}
          </div>
        </section> */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "James Horrigan",
              jobTitle: profile?.title ?? "Full Stack Software Engineer",
              email: profile?.email ?? undefined,
              sameAs: [profile?.linkedin_url, profile?.github_url].filter(
                (v): v is string => v != null
              ),
            }),
          }}
        />
        <footer className="pb-2 text-center text-sm text-slate-400">
          <p>
            {profile?.location && <span>{profile.location} · </span>}
            Email:{' '}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="text-cyan-300 hover:text-cyan-200"
              >
                {profile.email}
              </a>
            )}
          </p>
          <p className="mt-2">© {year} James Horrigan</p>
        </footer>
      </main>
    </div>
  );
}
