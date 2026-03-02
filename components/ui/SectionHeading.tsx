export default function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12">
      <p className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-2">{label}</p>
      <h2 className="font-mono text-3xl font-bold text-text">{title}</h2>
      <div className="mt-4 h-px bg-border" />
    </div>
  );
}
