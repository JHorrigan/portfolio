import { getPortfolio, getProfile, getRoles, getSkillGroups } from '../db/queries';
import DigitalTwin from './components/DigitalTwin';
import NavMenu from './components/NavMenu';

const CATEGORY_COLORS: Record<string, { border: string; label: string; pill: string }> = {
  'Backend':        { border: 'border-cyan-400/25',    label: 'text-cyan-300',    pill: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200' },
  'Frontend':       { border: 'border-violet-400/25',  label: 'text-violet-300',  pill: 'border-violet-400/30 bg-violet-400/10 text-violet-200' },
  'AI / ML':        { border: 'border-emerald-400/25', label: 'text-emerald-300', pill: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' },
  'Cloud & DevOps': { border: 'border-amber-400/25',   label: 'text-amber-300',   pill: 'border-amber-400/30 bg-amber-400/10 text-amber-200' },
  'Delivery':       { border: 'border-rose-400/25',    label: 'text-rose-300',    pill: 'border-rose-400/30 bg-rose-400/10 text-rose-200' },
  '__default':      { border: 'border-slate-700',      label: 'text-slate-300',   pill: 'border-slate-700 bg-slate-900/70 text-slate-200' },
};

const TITLE_BADGE_STYLES = [
  'border-cyan-300/35 bg-cyan-300/10 text-cyan-200',
  'border-emerald-300/35 bg-emerald-300/10 text-emerald-200',
  'border-amber-300/35 bg-amber-300/10 text-amber-200',
  'border-rose-300/35 bg-rose-300/10 text-rose-200',
];

export default async function Home() {
  const [profile, journey, skillGroups, portfolioItems] = await Promise.all([
    getProfile(),
    getRoles(),
    getSkillGroups(),
    getPortfolio(),
  ]);

  const titleBadges = Array.isArray(profile?.title) && profile.title.length > 0
    ? profile.title
    : ['Full Stack Software Engineer'];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(14,116,144,0.2),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/80 to-transparent" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:gap-10 md:px-10 md:py-14">
        <header className="glass relative z-10 flex items-center justify-between gap-4 rounded-2xl px-6 py-4">
          <p className="text-sm font-semibold tracking-widest text-cyan-300 md:text-lg">
            JAMES HORRIGAN
          </p>
          <NavMenu email={profile?.email} />
        </header>

        <section className="glass rounded-3xl p-5 md:p-12">
          <div className="mb-6 flex flex-wrap gap-2 md:mb-7">
            {titleBadges.map((title, index) => (
              <p
                key={`${title}-${index}`}
                className={`inline-flex rounded-full border px-3 py-0.5 text-[11px] font-semibold tracking-[0.16em] md:px-4 md:py-1 md:text-xs ${TITLE_BADGE_STYLES[index % TITLE_BADGE_STYLES.length]}`}
              >
                {title.toUpperCase()}
              </p>
            ))}
          </div>
          <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-6xl">
            {profile?.hero ?? 'Enterprise-grade engineering with an edge for AI, serverless, and modern product delivery.'}
          </h1>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
            {profile?.hero_summary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-cyan-400 px-5 py-2.5 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                LinkedIn Profile
              </a>
            )}
            {profile?.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-600 px-5 py-2.5 text-center text-sm font-semibold text-slate-200 transition hover:border-slate-300 hover:bg-slate-900"
              >
                GitHub
              </a>
            )}
            <a
              href="#ask"
              className="rounded-full border border-cyan-400/40 px-5 py-2.5 text-center text-sm font-semibold text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-400/10"
            >
              Ask Digital Twin
            </a>
          </div>
        </section>

        <section id="about" className="glass rounded-3xl p-5 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            About Me
          </h2>
          {profile?.summary?.split('\n\n').map((para, i) => (
            <p key={i} className="mt-4 max-w-4xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
              {para}
            </p>
          ))}
        </section>

        <section id="skills" className="glass rounded-3xl p-5 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Skills
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {skillGroups.map((group) => {
              const colors = CATEGORY_COLORS[group.title] ?? CATEGORY_COLORS['__default'];
              return (
                <article
                  key={group.title}
                  className={`rounded-xl border bg-slate-900/50 p-3 md:p-4 ${colors.border}`}
                >
                  <h3 className={`text-xs font-semibold tracking-[0.14em] ${colors.label}`}>
                    {group.title.toUpperCase()}
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {group.items.map((skill) => (
                      <li
                        key={skill}
                        className={`rounded-full border px-2.5 py-0.5 text-xs ${colors.pill}`}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section id="journey" className="glass rounded-3xl p-5 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Career Journey
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
            {profile?.career_summary}
          </p>

          <ol className="mt-8 space-y-4">
            {journey.map((item) => (
              <li
                key={`${item.company}-${item.period}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
              >
                <p className="text-xs font-semibold tracking-[0.14em] text-cyan-300">
                  {item.period}
                </p>
                <h3 className="mt-1 text-base font-semibold leading-snug text-white sm:text-lg">
                  {item.role}
                  <br className="sm:hidden" />
                  <span className="hidden sm:inline"> · </span>
                  {item.company}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-300 md:text-lg md:leading-8">{item.summary}</p>
                {item.skills.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {item.skills.map((skill) => (
                      <li
                        key={`${item.id}-${skill.id}`}
                        className={`rounded-full border px-2.5 py-0.5 text-xs ${
                          (CATEGORY_COLORS[skill.category ?? ''] ?? CATEGORY_COLORS['__default']).pill
                        }`}
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section id="portfolio" className="glass rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Live Projects</h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Products and platforms built and shipped.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {portfolioItems.map((item) => (
              <article
                key={item.id}
                className="group relative flex flex-col rounded-2xl border border-slate-700/60 bg-slate-900/50 overflow-hidden transition hover:border-cyan-400/40 hover:bg-slate-900/80"
              >
                {/* Cyan accent top bar */}
                <div className="h-px w-full bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold text-white tracking-tight">{item.title}</h3>
                  {item.url && (
                    <p className="mt-1 font-mono text-xs text-slate-500 truncate">
                      {item.url.replace('https://', '')}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-3 text-sm text-slate-400 flex-1">{item.description}</p>
                  )}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 self-start rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 text-xs font-semibold text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-400/15"
                    >
                      Visit
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 8L8 2M5 2h3v3" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "James Horrigan",
              jobTitle: titleBadges.join(' | '),
              email: profile?.email ?? undefined,
              sameAs: [profile?.linkedin_url, profile?.github_url].filter(
                (v): v is string => v != null
              ),
            }),
          }}
        />
        <DigitalTwin />

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
        </footer>
      </main>
    </div>
  );
}
