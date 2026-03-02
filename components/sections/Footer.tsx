export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/jameshorrigan"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-wider"
          >
            LinkedIn
          </a>
          <a
            href="mailto:jahorrigan1411@gmail.com"
            className="font-mono text-xs text-muted hover:text-accent transition-colors uppercase tracking-wider"
          >
            jahorrigan1411@gmail.com
          </a>
        </div>
        <p className="font-mono text-xs text-muted">© 2025 James Horrigan</p>
      </div>
    </footer>
  );
}
