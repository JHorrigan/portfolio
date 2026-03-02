import { skillGroups } from "@/lib/data";
import Tag from "@/components/ui/Tag";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-[57px] py-24 bg-surface">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading label="// 01" title="About" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-4 text-muted leading-relaxed text-sm">
            <p>
              I&apos;m a full stack software engineer with over 25 years of experience building
              software that scales — from embedded C payphone firmware to cloud-native Python
              microservices processing hundreds of millions of records daily.
            </p>
            <p>
              My career spans enterprise telecoms, data platforms, AI-powered recruitment
              technology, and fintech. I&apos;ve led teams, built products from zero to enterprise
              clients, and consistently delivered systems that are robust, observable, and
              maintainable.
            </p>
            <p>
              I work primarily in Python and TypeScript on AWS, with a strong interest in
              AI/ML integration, serverless architecture, and the intersection of engineering
              rigour with product thinking.
            </p>
          </div>

          <div className="space-y-6">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-xs text-accent tracking-wider uppercase mb-2">
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
      </div>
    </section>
  );
}
