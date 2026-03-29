import { getHeroStats, getMarqueeItems, getPortfolio, getProfile, getRoles, getSkillGroups } from '../db/queries';
import ContactForm from './components/ContactForm';
import DigitalTwin from './components/DigitalTwin';
import NavMenu from './components/NavMenu';
import PortfolioCard from './components/PortfolioCard';
import ReadMore from './components/ReadMore';
import CareerTimeline from './components/CareerTimeline';
import HeroMarquee from './components/HeroMarquee';
import ScrollReveal from './components/ScrollReveal';

const CATEGORY_COLORS: Record<string, { border: string; label: string; pill: string }> = {
  'Backend':        { border: 'border-cyan-400/25',    label: 'text-cyan-300',    pill: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200' },
  'Frontend':       { border: 'border-violet-400/25',  label: 'text-violet-300',  pill: 'border-violet-400/30 bg-violet-400/10 text-violet-200' },
  'AI / ML':        { border: 'border-emerald-400/25', label: 'text-emerald-300', pill: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' },
  'Cloud & DevOps': { border: 'border-amber-400/25',   label: 'text-amber-300',   pill: 'border-amber-400/30 bg-amber-400/10 text-amber-200' },
  'Delivery':       { border: 'border-rose-400/25',    label: 'text-rose-300',    pill: 'border-rose-400/30 bg-rose-400/10 text-rose-200' },
  '__default':      { border: 'border-slate-700',      label: 'text-slate-300',   pill: 'border-slate-700 bg-slate-900/70 text-slate-200' },
};

const STAT_COLORS: Record<string, { from: string; text: string }> = {
  cyan:    { from: 'from-cyan-400',    text: 'text-cyan-400' },
  violet:  { from: 'from-violet-400',  text: 'text-violet-400' },
  amber:   { from: 'from-amber-400',   text: 'text-amber-400' },
  emerald: { from: 'from-emerald-400', text: 'text-emerald-400' },
  rose:    { from: 'from-rose-400',    text: 'text-rose-400' },
};

const TITLE_BADGE_STYLES = [
  'border-cyan-300/35 bg-cyan-300/10 text-cyan-200',
  'border-emerald-300/35 bg-emerald-300/10 text-emerald-200',
  'border-amber-300/35 bg-amber-300/10 text-amber-200',
  'border-rose-300/35 bg-rose-300/10 text-rose-200',
];

export default async function Home() {
  const [profile, journey, skillGroups, portfolioItems, marqueeItems, heroStats] = await Promise.all([
    getProfile(),
    getRoles(),
    getSkillGroups(),
    getPortfolio(),
    getMarqueeItems(),
    getHeroStats(),
  ]);

  const titleBadges = Array.isArray(profile?.title) && profile.title.length > 0
    ? profile.title
    : ['Full Stack Software Engineer'];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(14,116,144,0.2),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/80 to-transparent" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:gap-10 md:px-10 md:py-14">
        <ScrollReveal delay={0} className="relative z-50">
        <header className="glass flex items-center justify-between gap-4 rounded-2xl px-6 py-4">
          <p className="text-sm font-semibold tracking-widest text-cyan-300 md:text-lg">
            JAMES HORRIGAN
          </p>
          <NavMenu />
        </header>
        </ScrollReveal>

        <ScrollReveal delay={80}>
        <section className="relative flex min-h-[calc(100svh-7rem)] md:min-h-[calc(100svh-10rem)] flex-col justify-start pt-8 sm:pt-12 md:pt-14 lg:pt-16 px-4 sm:px-8 md:px-10 lg:px-14">

          {/* Background decorative glyph */}
          <div
            className="pointer-events-none absolute right-8 top-14 select-none font-bold leading-none text-slate-800/50 sm:top-4 md:right-16 md:top-0"
            style={{ fontSize: 'clamp(8rem, 22vw, 20rem)', fontFamily: 'var(--font-geist-mono)' }}
            aria-hidden="true"
          >
            AI
          </div>

          <div className="mb-4 hidden flex-wrap gap-2 sm:mb-6 sm:flex md:mb-8">
            {titleBadges.map((title, index) => (
              <p
                key={`${title}-${index}`}
                className={`inline-flex rounded-full border px-3 py-0.5 text-[10px] font-semibold tracking-[0.16em] sm:text-[11px] md:px-4 md:py-1 md:text-xs ${TITLE_BADGE_STYLES[index % TITLE_BADGE_STYLES.length]}`}
              >
                {title.toUpperCase()}
              </p>
            ))}
          </div>

          <div className="flex items-stretch gap-4 md:gap-6">
            <div className="w-0.5 shrink-0 rounded-full bg-linear-to-b from-cyan-400 to-cyan-400/10" />
            <h1
              className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
              style={{ textShadow: '0 0 80px rgba(103,232,249,0.22)' }}
            >
              {(profile?.hero ?? 'AI-first engineering. Enterprise-grade delivery.').split('AI-first').map((part, i, arr) => (
                <span key={i}>
                  {i > 0 && <span className="text-cyan-400">AI-first</span>}
                  {part}
                </span>
              ))}
            </h1>
          </div>

          <div className="mt-5 hidden flex-wrap items-center gap-x-3 gap-y-1.5 sm:mt-6 sm:flex md:mt-8">
            {['30 yrs in tech', 'Founder & CTO', 'Enterprise & Startup', 'AI-first'].map((stat, i, arr) => (
              <span key={stat} className="flex items-center gap-x-3">
                <span className={`text-sm font-medium md:text-base ${stat === 'AI-first' ? 'text-cyan-400' : 'text-slate-300'}`}>
                  {stat}
                </span>
                {i < arr.length - 1 && <span className="text-slate-600">·</span>}
              </span>
            ))}
          </div>

          {/* Visual stats strip */}
          {heroStats.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-8 sm:gap-6 md:flex md:flex-wrap md:gap-x-10 md:gap-y-4">
              {heroStats.map(({ id, value, label, color }) => {
                const c = STAT_COLORS[color] ?? STAT_COLORS['cyan'];
                return (
                  <div key={id} className="flex items-stretch gap-3">
                    <div className={`w-0.5 shrink-0 rounded-full bg-linear-to-b to-transparent ${c.from}`} />
                    <div>
                      <div className={`text-2xl font-bold sm:text-3xl ${c.text}`}>{value}</div>
                      <div className="mt-0.5 text-[11px] font-medium tracking-widest text-slate-400 uppercase">{label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex gap-3 sm:mt-8">
            {profile?.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(103,232,249,0.30)] transition hover:bg-cyan-300 hover:shadow-[0_0_36px_rgba(103,232,249,0.50)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            )}
            <a
              href="#ask"
              className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/5 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-400/10 hover:shadow-[0_0_24px_rgba(103,232,249,0.15)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Ask Digital Twin
            </a>
          </div>

          {/* Marquee + scroll indicator */}
          <div className="mt-auto pt-8 sm:pt-10 flex flex-col gap-6 sm:gap-8">
            <HeroMarquee items={marqueeItems} />
          <div className="flex justify-center pb-8 sm:pb-10 md:pb-12 lg:pb-14 pt-2">
            <a
              href="#journey"
              aria-label="Scroll to next section"
              className="animate-bounce text-slate-400 transition hover:text-slate-200"
            >
              <svg
                width="28" height="28" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </a>
          </div>
          </div>

        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="journey" className="px-1 py-2">
          {/* Section strip header */}
          <div className="relative overflow-hidden py-5">
            <span aria-hidden className="pointer-events-none absolute -top-3 left-0 select-none font-mono text-[5rem] font-black leading-none tracking-tighter text-white opacity-[0.03] md:text-[8rem]">
              CAREER
            </span>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="font-mono text-xs font-semibold tracking-[0.22em] text-cyan-400 uppercase">Career Journey</h2>
              </div>
              <span className="font-mono text-xs tracking-[0.15em] text-slate-600">1996 — 2026</span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              {profile?.career_summary}
            </p>
          </div>

          <CareerTimeline journey={journey} categoryColors={CATEGORY_COLORS} />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="skills" className="px-1 py-2">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-white md:text-3xl">
            <span className="h-7 w-0.5 shrink-0 rounded-full bg-linear-to-b from-cyan-400 to-cyan-400/10" />
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
        </ScrollReveal>

        <ScrollReveal>
        <section id="about" className="glass rounded-3xl p-5 md:p-10">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-white md:text-3xl">
            <span className="h-7 w-0.5 shrink-0 rounded-full bg-linear-to-b from-cyan-400 to-cyan-400/10" />
            About Me
          </h2>
          <ReadMore paragraphs={(profile?.summary ?? '').split('\n\n').filter(Boolean)} />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="portfolio" className="glass rounded-3xl p-8 md:p-10">
          <h2 className="flex items-center gap-3 text-2xl font-semibold text-white md:text-3xl">
            <span className="h-7 w-0.5 shrink-0 rounded-full bg-linear-to-b from-cyan-400 to-cyan-400/10" />
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
        </ScrollReveal>

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

        <ScrollReveal>
        <section id="contact" className="glass rounded-3xl p-5 md:p-10">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-white md:text-3xl">
                <span className="h-7 w-0.5 shrink-0 rounded-full bg-linear-to-b from-cyan-400 to-cyan-400/10" />
                Get in touch
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
                Have a project in mind, a role to discuss, or just want to say hello? Drop me a message and I'll get back to you.
              </p>
              <div className="mt-8 flex flex-col gap-4">
                {profile?.email && (
                  <a href={`mailto:${profile.email}`} className="group flex items-center gap-3 text-sm text-slate-400 transition hover:text-cyan-300">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-900/60 transition group-hover:border-cyan-400/40">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    {profile.email}
                  </a>
                )}
                {profile?.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-sm text-slate-400 transition hover:text-cyan-300">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-900/60 transition group-hover:border-cyan-400/40">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </span>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
        </ScrollReveal>

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
