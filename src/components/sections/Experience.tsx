"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { timeline } from "@/content/experience";

const EASE = [0.16, 1, 0.3, 1] as const;

const KIND_STYLE: Record<string, string> = {
  research: "",
  design: "!border-pink-300/30 !bg-pink-300/10 !text-pink-200",
  leadership: "!border-amber-300/30 !bg-amber-300/10 !text-amber-200",
  education: "!border-aqua/30 !bg-aqua/10 !text-cyan-100",
};

/** Career timeline: the centre line fills as you scroll; cards slide in from alternating sides. */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="career" aria-labelledby="career-title" className="section-y relative">
      <div className="container-page">
        <SectionTitle
          id="career-title"
          eyebrow="Trajectory"
          title="Career &"
          accent="journey"
          lead="Research, community work at IEEE NSU, and the schools that got me here."
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          {/* Track */}
          <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-line md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-iris via-violet to-violet-deep shadow-[0_0_12px_rgba(167,139,250,0.8)] md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-14 md:space-y-20">
            {timeline.map((t, i) => {
              const left = i % 2 === 0;
              return (
                <li key={t.title} className="relative grid md:grid-cols-2 md:gap-16">
                  {/* Node */}
                  <motion.span
                    aria-hidden
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -30% 0px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="absolute left-4 top-7 z-10 grid size-4 -translate-x-1/2 place-items-center rounded-full bg-void ring-1 ring-violet md:left-1/2"
                  >
                    <span className="size-1.5 rounded-full bg-iris shadow-[0_0_12px_3px_rgba(196,181,253,0.8)]" />
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, x: left ? -60 : 60, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 1.1, ease: EASE }}
                    className={`ml-10 md:ml-0 ${left ? "md:col-start-1" : "md:col-start-2"}`}
                  >
                    <article className="group relative overflow-hidden rounded-3xl glass p-7 transition-colors duration-500 hover:border-violet/30">
                      <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-violet/0 blur-[60px] transition-colors duration-700 group-hover:bg-violet/25" />
                      <div className="relative flex flex-wrap items-center gap-3">
                        <span className={`pill !text-[0.625rem] ${KIND_STYLE[t.kind] ?? ""}`}>{t.kind}</span>
                        <span className="flex items-center gap-2 font-mono text-xs text-dim">
                          {t.period.includes("Present") ? (
                            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                          ) : null}
                          {t.period}
                        </span>
                      </div>
                      <h3 className="font-display relative mt-5 text-2xl font-semibold leading-tight">{t.title}</h3>
                      <p className="relative mt-1 text-sm text-iris">{t.org}</p>
                      <p className="relative mt-4 text-[0.95rem] leading-relaxed text-dim">{t.detail}</p>
                      {t.points ? (
                        <ul className="relative mt-4 space-y-2">
                          {t.points.map((pt) => (
                            <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-dim">
                              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-iris" />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
