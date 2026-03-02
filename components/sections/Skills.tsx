import { skillGroups } from "@/lib/data";
import Tag from "@/components/ui/Tag";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-[57px] py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="// 03" title="Skills" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div key={group.label} className="border border-border p-6">
              <p className="font-mono text-xs text-accent tracking-wider uppercase mb-4">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Tag key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
