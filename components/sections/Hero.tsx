export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-57px)] flex items-center overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,224,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,224,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <p
          className="font-mono text-xs text-accent tracking-[0.4em] uppercase mb-6"
          style={{ animation: "fadeUp 0.6s ease 0.1s both" }}
        >
          Full Stack Software Engineer
        </p>

        <h1
          className="font-mono text-5xl md:text-7xl font-bold text-text leading-tight mb-6"
          style={{ animation: "fadeUp 0.6s ease 0.3s both" }}
        >
          James Horrigan
          <span
            className="text-accent ml-1"
            style={{ animation: "blink 1s step-end infinite" }}
          >
            _
          </span>
        </h1>

        <p
          className="font-mono text-sm text-muted mb-12"
          style={{ animation: "fadeUp 0.6s ease 0.5s both" }}
        >
          Python · AWS · React · AI · Serverless — 25+ years
        </p>

        <a
          href="#career"
          className="inline-block font-mono text-sm text-accent border border-accent px-6 py-3 hover:bg-accent hover:text-bg transition-colors"
          style={{ animation: "fadeUp 0.6s ease 0.7s both" }}
        >
          View Career →
        </a>
      </div>
    </section>
  );
}
