import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about } from "@/content/about";
import { timeline } from "@/content/experience";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y">
      <div className="container-page">
        <SectionHeader n="01" label="About" id="about-title" title={about.title} />

        {/* Lead + margin notes */}
        <div className="grid-page mt-16 gap-y-10 md:mt-24">
          <aside className="col-span-4 space-y-8 md:col-span-2 lg:col-span-3" aria-label="Margin notes">
            {about.margin.map((m, i) => (
              <Reveal key={m.k} delay={i * 0.08} className="max-w-[15rem] border-l border-vermilion/60 pl-3">
                <p className="meta text-vermilion">Note {i + 1}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-graphite">
                  <span className="text-ink">{m.k}.</span> {m.v}
                </p>
              </Reveal>
            ))}
          </aside>

          <div className="col-span-4 md:col-span-6 lg:col-span-8">
            <Reveal>
              <p className="heading text-[clamp(1.6rem,3.1vw,2.6rem)] leading-[1.18] tracking-[-0.02em] first-letter:float-left first-letter:mr-3 first-letter:mt-[0.06em] first-letter:text-[3.4em] first-letter:leading-[0.8] first-letter:italic first-letter:text-vermilion">
                {about.lead}
              </p>
            </Reveal>

            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {about.chapters.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.08} as="article" className="border-t rule pt-4">
                  <h3 className="meta flex items-baseline gap-2 text-muted">
                    <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                    {c.label}
                  </h3>
                  <p className="mt-4 text-[0.97rem] leading-relaxed text-graphite">{c.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Trajectory */}
        <div className="grid-page mt-24 gap-y-8 md:mt-32">
          <div className="col-span-4 md:col-span-2 lg:col-span-3">
            <p className="meta text-muted">Trajectory</p>
          </div>
          <ol className="col-span-4 md:col-span-6 lg:col-span-9">
            {timeline.map((t, i) => (
              <Reveal
                as="li"
                key={t.title}
                delay={i * 0.06}
                className="group grid grid-cols-[5.5rem_1fr] gap-x-6 border-t rule py-6 last:border-b md:grid-cols-[8rem_1fr_auto]"
              >
                <span className="meta pt-1.5 text-muted transition-colors group-hover:text-vermilion">{t.period}</span>
                <div>
                  <h3 className="heading text-[1.6rem] leading-tight">{t.title}</h3>
                  <p className="mt-1 text-sm text-ink">{t.org}</p>
                  <p className="mt-3 max-w-[40rem] text-[0.95rem] leading-relaxed text-graphite">{t.detail}</p>
                </div>
                <span className="meta col-start-2 mt-3 text-muted md:col-start-3 md:mt-1.5">
                  {t.kind === "research" ? "Research" : "Education"}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Now / Next */}
        <div className="grid-page mt-24 gap-y-12 md:mt-32">
          <Reveal className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-4">
            <p className="meta text-muted">Now</p>
            <ul className="mt-5 space-y-3">
              {about.now.map((n) => (
                <li key={n} className="flex gap-3 text-[1.0625rem] leading-snug">
                  <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-vermilion" />
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-9">
            <p className="meta text-muted">Next</p>
            <p className="heading mt-5 text-[1.5rem] leading-snug italic text-graphite">{about.next}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
