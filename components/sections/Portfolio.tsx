import SectionHeading from "@/components/ui/SectionHeading";

const placeholders = [
  { title: "Project Alpha", description: "Full stack web application" },
  { title: "Project Beta", description: "Data pipeline & analytics" },
  { title: "Project Gamma", description: "AI / ML integration" },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-[57px] py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="// 04" title="Projects" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {placeholders.map(({ title, description }) => (
            <div key={title} className="border border-border bg-surface p-6 opacity-40">
              <p className="font-mono text-xs text-accent tracking-wider uppercase mb-3">
                Coming soon
              </p>
              <h3 className="font-mono text-lg font-bold text-text mb-2">{title}</h3>
              <p className="text-sm text-muted">{description}</p>
            </div>
          ))}
        </div>

        <p className="font-mono text-xs text-muted text-center">
          Portfolio projects will be added here.
        </p>
      </div>
    </section>
  );
}
