import Link from "next/link";
import { ArrowUpRight, Award, BookOpen, Rocket, ShieldCheck, Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { FxCard } from "@/components/ui/FxCard";
import { achievements } from "@/content/experience";

const icons = [Rocket, ShieldCheck, BookOpen, Award];

export function Achievements() {
  const featured = achievements.slice(0, 4);
  const more = achievements.slice(4);

  return (
    <section id="achievements" aria-labelledby="ach-title" className="section-y relative">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-violet-deep/15 blur-[160px]" />
      <div className="container-page">
        <SectionTitle
          id="ach-title"
          eyebrow="Recognition"
          title="Awards &"
          accent="achievements"
          lead="Hackathons, shared tasks and community work, each one done with a team."
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-2">
          {featured.map((a, i) => {
            const Icon = icons[i % icons.length];
            const inner = (
              <SpotlightCard className="h-full p-7 md:p-9">
                <div className="flex items-start justify-between gap-6">
                  <span className="grid size-12 place-items-center rounded-2xl border border-violet/25 bg-violet/10 text-iris">
                    <Icon aria-hidden className="size-5" strokeWidth={1.6} />
                  </span>
                  {a.year ? <span className="font-mono text-xs text-dim">{a.year}</span> : null}
                </div>
                <p className="heading-xl mt-8 text-[clamp(2.2rem,4.5vw,3.4rem)] text-gradient">{a.rank}</p>
                <p className="eyebrow mt-2 text-faint">{a.rankNote}</p>
                <h3 className="font-display mt-6 text-xl font-semibold">{a.event}</h3>
                <p className="mt-1 text-[0.95rem] text-dim">{a.scope}</p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {a.team ? <span className="chip">{a.team}</span> : null}
                  {a.href ? (
                    <span className="ml-auto inline-flex items-center gap-1 text-sm text-iris">
                      Read paper notes
                      <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5" />
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

        {more.length ? (
          <div className="mt-10">
            <Reveal>
              <h3 className="eyebrow text-faint">More recognition</h3>
            </Reveal>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((a, i) => (
                <Reveal as="li" key={a.event + a.rank} delay={(i % 3) * 0.06}>
                  <FxCard className="group flex h-full items-start gap-4 rounded-2xl glass p-5 hover:border-violet/30">
                    <Star aria-hidden className="mt-0.5 size-4 shrink-0 text-violet transition-transform duration-500 group-hover:rotate-[72deg]" />
                    <div className="min-w-0">
                      <p className="font-display font-semibold leading-snug">
                        {a.rank} <span className="font-sans font-normal text-dim">{a.rankNote.toLowerCase()}</span>
                      </p>
                      <p className="mt-1 text-sm text-iris">{a.event}</p>
                      <p className="mt-1 text-xs text-faint">
                        {[a.scope, a.year].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </FxCard>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
