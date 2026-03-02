export default function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-mono text-muted border border-border">
      {label}
    </span>
  );
}
