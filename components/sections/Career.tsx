import { roles } from "@/lib/data";
import Tag from "@/components/ui/Tag";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Career() {
  return (
    <section id="career" className="scroll-mt-[57px] py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="// 02" title="Career" />

        <div className="relative">
          {/* Vertical accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-px" style={{ backgroundColor: "rgba(0,255,224,0.2)" }} />

          <div className="space-y-16 pl-8">
            {roles.map((role, i) => (
              <div key={i} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[33px] top-1.5 w-2 h-2 bg-accent" />

                <p className="font-mono text-xs text-accent tracking-wider mb-1">{role.period}</p>
                <h3 className="font-mono text-xl font-bold text-text">{role.company}</h3>
                <p className="font-mono text-sm text-muted mb-4">
                  {role.title} · {role.location}
                </p>

                <ul className="space-y-2 mb-5">
                  {role.summary.map((point, j) => (
                    <li key={j} className="flex gap-3 text-sm text-muted">
                      <span className="text-accent font-mono shrink-0 mt-0.5">›</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {role.tech.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
