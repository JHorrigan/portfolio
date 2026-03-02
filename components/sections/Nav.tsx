const links = [
  { label: "About", href: "#about" },
  { label: "Career", href: "#career" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="h-px bg-accent" />
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-mono text-accent font-bold text-sm tracking-[0.2em]">JH</span>
        <nav className="flex items-center gap-4 sm:gap-8">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[10px] sm:text-xs text-muted hover:text-accent transition-colors tracking-wider uppercase"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
