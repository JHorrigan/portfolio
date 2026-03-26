import { getPortfolio, getProfile, getRoles, getSkillGroups } from '../db/queries';
import DigitalTwin from './components/DigitalTwin';
import NavMenu from './components/NavMenu';
import PortfolioCard from './components/PortfolioCard';
import ReadMore from './components/ReadMore';
import RoleCard from './components/RoleCard';

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
        <header className="glass relative z-10 flex items-center justify-between gap-4 rounded-2xl px-6 py-4 animate-fade-in-up [animation-delay:0ms]">
          <p className="text-sm font-semibold tracking-widest text-cyan-300 md:text-lg">
            JAMES HORRIGAN
          </p>
          <NavMenu email={profile?.email} />
        </header>

        <section className="glass relative overflow-hidden rounded-3xl p-6 md:p-16 animate-fade-in-up [animation-delay:80ms]">
          {/* Inner hero glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.07),transparent_55%)]" />

          <div className="mb-6 flex flex-wrap gap-2 md:mb-8">
            {titleBadges.map((title, index) => (
              <p
                key={`${title}-${index}`}
                className={`inline-flex rounded-full border px-3 py-0.5 text-[11px] font-semibold tracking-[0.16em] md:px-4 md:py-1 md:text-xs ${TITLE_BADGE_STYLES[index % TITLE_BADGE_STYLES.length]}`}
              >
                {title.toUpperCase()}
              </p>
            ))}
          </div>

          <h1
            className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-7xl"
            style={{ textShadow: '0 0 80px rgba(103,232,249,0.22)' }}
          >
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

          {/* Scroll hint */}
          <div className="mt-10 flex flex-col items-start gap-1.5">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-600">SCROLL</span>
            <svg
              className="animate-bounce text-slate-600"
              width="16" height="16" viewBox="0 0 16 16"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="3,5 8,11 13,5" />
            </svg>
          </div>
        </section>

        <section id="journey" className="glass rounded-3xl p-5 md:p-10 animate-fade-in-up [animation-delay:160ms]">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-white md:text-3xl">
            <span className="h-5 w-1 shrink-0 rounded-full bg-cyan-400" />
            Career Journey
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-lg md:leading-8">
            {profile?.career_summary}
          </p>

          <div className="relative mt-8">
            {/* Timeline spine */}
            <div className="absolute left-1.25 top-6 bottom-6 w-px bg-linear-to-b from-cyan-400/50 via-slate-700/40 to-transparent" />
            <ol className="space-y-3">
              {journey.map((item, index) => (
                <RoleCard
                  key={item.id}
                  item={item}
                  isFirst={index === 0}
                  categoryColors={CATEGORY_COLORS}
                />
              ))}
            </ol>
          </div>
        </section>

        <section id="skills" className="glass rounded-3xl p-5 md:p-10 animate-fade-in-up [animation-delay:240ms]">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-white md:text-3xl">
            <span className="h-5 w-1 shrink-0 rounded-full bg-cyan-400" />
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

        <section id="about" className="glass rounded-3xl p-5 md:p-10 animate-fade-in-up [animation-delay:320ms]">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-white md:text-3xl">
            <span className="h-5 w-1 shrink-0 rounded-full bg-cyan-400" />
            About Me
          </h2>
          <ReadMore paragraphs={(profile?.summary ?? '').split('\n\n').filter(Boolean)} />
        </section>

        <section id="portfolio" className="glass rounded-3xl p-8 md:p-10 animate-fade-in-up [animation-delay:400ms]">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-white md:text-3xl">
            <span className="h-5 w-1 shrink-0 rounded-full bg-cyan-400" />
            Live Projects
          </h2>
          <p className="mt-3 max-w-2xl text-slate-400">
            Products and platforms built and shipped.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {portfolioItems.map((item, i) => {
              const gradients = [
                'linear-gradient(135deg, #0c4a6e 0%, #020617 60%, #083344 100%)',
                'linear-gradient(135deg, #064e3b 0%, #020617 60%, #052e16 100%)',
                'linear-gradient(135deg, #2e1065 0%, #020617 60%, #1e1b4b 100%)',
              ];
              const accentColors = ['#67e8f9', '#6ee7b7', '#c4b5fd'];
              return (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  gradient={gradients[i % gradients.length]}
                  accent={accentColors[i % accentColors.length]}
                />
              );
            })}
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

        <footer className="py-6 md:py-10">
          <div className="mb-6 h-px bg-linear-to-r from-transparent via-cyan-300/40 to-transparent" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-widest text-slate-300">JAMES HORRIGAN</p>
              {profile?.location && (
                <p className="mt-1 text-xs text-slate-500">{profile.location}</p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
              {profile?.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="transition hover:text-cyan-300">
                  LinkedIn
                </a>
              )}
              {profile?.github_url && (
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="transition hover:text-cyan-300">
                  GitHub
                </a>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="transition hover:text-cyan-300">
                  {profile.email}
                </a>
              )}
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-600">© 2025 James Horrigan</p>
        </footer>
      </main>
    </div>
  );
}
