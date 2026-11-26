import Link from "next/link";
import { ArrowUpRight, Award, BookOpen, Rocket, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { achievements } from "@/content/experience";

const icons = [Rocket, ShieldCheck, Award, BookOpen];

export function Achievements() {
  return (
    <section id="achievements" aria-labelledby="ach-title" className="section-y relative">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-violet-deep/15 blur-[160px]" />
      <div className="container-page">
        <SectionTitle
          id="ach-title"
          eyebrow="Recognition"
          title="Awards &"
          accent="achievements"
          lead="Hackathons, competitions and a publication, each one built with a team."
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-2">
          {achievements.map((a, i) => {
            const Icon = icons[i % icons.length];
            const inner = (
              <SpotlightCard className="h-full p-7 md:p-9">
                <div className="flex items-start justify-between gap-6">
                  <span className="grid size-12 place-items-center rounded-2xl border border-violet/25 bg-violet/10 text-iris">
                    <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-xs text-dim">{a.year}</span>
                </div>
                <p className="heading-xl mt-8 text-[clamp(2.2rem,4.5vw,3.4rem)] text-gradient">{a.rank}</p>
                <p className="eyebrow mt-2 text-faint">{a.rankNote}</p>
                <h3 className="font-display mt-6 text-xl font-semibold">{a.event}</h3>
                <p className="mt-1 text-[0.95rem] text-dim">{a.scope}</p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {a.team ? <span className="chip">{a.team}</span> : null}
                  {a.detail ? <span className="chip">{a.detail}</span> : null}
                  {a.href ? (
                    <span className="ml-auto inline-flex items-center gap-1 text-sm text-iris">
                      Read paper notes <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5" />
                    </span>
                  ) : null}
                </div>
              </SpotlightCard>
            );
            return (
              <Reveal as="li" key={a.event + a.year} delay={(i % 2) * 0.1}>
                {a.href ? (
                  <Link href={a.href} className="block h-full rounded-3xl">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
