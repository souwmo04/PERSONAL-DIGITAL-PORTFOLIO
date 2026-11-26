import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/Text";
import { CountUp } from "@/components/ui/CountUp";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { about } from "@/content/about";
import { achievements } from "@/content/experience";
import { projects } from "@/content/projects";
import { publications } from "@/content/publications";

export function About() {
  const awards = achievements.filter((a) => a.event !== "ACL Anthology").length;
  const stats = [
    { n: publications.length, label: "ACL Anthology paper", suffix: "" },
    { n: awards, label: "Competition awards", suffix: "" },
    { n: projects.length, label: "Selected projects", suffix: "" },
    { n: 2026, label: "Graduating, NSU", suffix: "" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative">
      <div className="container-page">
        <Reveal blur={false} y={12}>
          <span className="pill">
            <span className="size-1.5 rounded-full bg-violet shadow-[0_0_10px_2px_rgba(167,139,250,0.7)]" />
            About me
          </span>
        </Reveal>
        <h2 id="about-title" className="sr-only">
          About
        </h2>

        <ScrollWords
          text={about.lead}
          className="heading-xl mt-10 max-w-[22ch] text-[clamp(1.9rem,4.6vw,3.9rem)] !font-medium !leading-[1.12] !tracking-[-0.03em]"
        />

        {/* Stats */}
        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-void p-6 md:p-8">
              <dd className="heading-xl text-[clamp(2.4rem,5vw,3.75rem)] text-gradient">
                <CountUp to={s.n} />
                {s.suffix}
              </dd>
              <dt className="mt-2 text-sm text-dim">{s.label}</dt>
            </Reveal>
          ))}
        </dl>

        {/* Chapters */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {about.chapters.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1}>
              <SpotlightCard as="article" className="h-full p-7">
                <p className="font-mono text-xs text-violet">0{i + 1}</p>
                <h3 className="font-display mt-4 text-xl font-semibold">{c.label}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-dim">{c.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/* Now / Next */}
        <div className="mt-6 grid gap-6 md:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <SpotlightCard className="h-full p-7 md:p-9">
              <p className="eyebrow text-iris">Right now</p>
              <ul className="mt-5 space-y-4">
                {about.now.map((n) => (
                  <li key={n} className="flex gap-3 text-[1.02rem] leading-snug">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-violet shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                    {n}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-violet/25 bg-gradient-to-br from-violet-deep/25 via-void to-void p-7 md:p-9">
              <div aria-hidden className="absolute -right-16 -top-16 size-56 rounded-full bg-violet/25 blur-[80px]" />
              <p className="eyebrow relative text-iris">Where I&rsquo;m headed</p>
              <p className="font-display relative mt-5 text-[1.3rem] leading-snug">{about.next}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
