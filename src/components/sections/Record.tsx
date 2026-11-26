import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RecordLedger } from "./RecordLedger";
import { achievements } from "@/content/experience";

export function Record() {
  return (
    <section id="record" aria-labelledby="record-title" className="section-y">
      <div className="container-page">
        <SectionHeader
          n="04"
          label="Experience & record"
          id="record-title"
          title={["The record,", <em key="e" className="italic">so far.</em>]}
          note="Research, competitions and the teams I built things with."
        />

        <div className="grid-page mt-16 gap-y-12 md:mt-24">
          {/* Research position */}
          <Reveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <p className="meta text-muted">Position</p>
          </Reveal>
          <Reveal delay={0.05} className="col-span-4 md:col-span-6 lg:col-span-9">
            <div className="grid gap-6 border-t border-ink pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <p className="meta text-vermilion">Current · Research</p>
                <h3 className="heading mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-none">Research Assistant</h3>
                <p className="mt-3 text-[1.0625rem]">TriModal AI Lab, North South University</p>
              </div>
              <ul className="space-y-3 text-[0.97rem] leading-relaxed text-graphite md:pt-7">
                <li className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-ink" />
                  Vision-language and multimodal models, with a focus on interfaces and accessibility.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-ink" />
                  Working on DashLens, a vision-language approach to dashboard question answering.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-ink" />
                  Co-author of a BLP-2025 workshop paper in the ACL Anthology.
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Achievements ledger */}
          <Reveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <p className="meta text-muted">Achievements</p>
            <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-graphite">
              Hackathons and competitions, with the teams that made them possible.
            </p>
          </Reveal>
          <div className="col-span-4 md:col-span-6 lg:col-span-9">
            <RecordLedger items={achievements} />
          </div>
        </div>
      </div>
    </section>
  );
}
