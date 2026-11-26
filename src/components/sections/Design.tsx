"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Palette } from "lucide-react";
import { useRef } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BehanceIcon } from "@/components/ui/BrandIcons";
import { site } from "@/content/site";

/** Abstract "poster wall" tiles. Decorative, not reproductions of real work. */
const TILES = [
  { g: "from-violet-deep via-violet to-iris", r: -6, label: "Event identity" },
  { g: "from-aqua/80 via-cyan-700 to-night", r: 4, label: "Posters" },
  { g: "from-pink-400 via-fuchsia-600 to-violet-deep", r: -3, label: "Social media" },
  { g: "from-amber-300 via-orange-500 to-rose-700", r: 5, label: "Workshops" },
  { g: "from-iris via-indigo-500 to-night", r: -5, label: "Conferences" },
];

export function Design() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-10%", "6%"]);

  return (
    <section id="design" aria-labelledby="design-title" className="section-y relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 -z-10 size-[32rem] rounded-full bg-pink-500/10 blur-[160px]" />
      <div className="container-page">
        <SectionTitle
          id="design-title"
          eyebrow="Beyond code"
          title="Graphic"
          accent="design"
          lead="A year and a half designing for the IEEE NSU Student Branch: event identities, posters and promotional material for workshops and conferences."
        />
      </div>

      {/* Drifting poster wall */}
      <div ref={ref} aria-hidden className="mt-16 space-y-5">
        {[x1, x2].map((x, row) => (
          <motion.div key={row} style={{ x }} className="flex justify-center gap-5">
            {[...TILES, ...TILES].slice(row * 2, row * 2 + 6).map((t, i) => (
              <div
                key={i}
                className={`group relative h-44 w-36 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br ${t.g} shadow-2xl transition-transform duration-700 ease-out-expo hover:scale-105 sm:h-56 sm:w-44`}
                style={{ rotate: `${t.r}deg` }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
                <div className="absolute inset-x-4 top-4 space-y-1.5">
                  <span className="block h-1.5 w-2/3 rounded-full bg-white/60" />
                  <span className="block h-1.5 w-1/3 rounded-full bg-white/40" />
                </div>
                <span className="absolute bottom-4 left-4 right-4 font-display text-lg font-semibold leading-tight text-white/90">
                  {t.label}
                </span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="container-page mt-16 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <Reveal className="rounded-3xl glass p-7 md:p-9">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl border border-pink-300/30 bg-pink-300/10 text-pink-200">
              <Palette aria-hidden className="size-5" strokeWidth={1.6} />
            </span>
            <div>
              <p className="font-display font-semibold">Graphics Designer, Sub Executive</p>
              <p className="text-sm text-dim">IEEE NSU Student Branch · Apr 2023 – Jan 2025</p>
            </div>
          </div>
          <ul className="mt-6 space-y-2.5 text-[0.97rem] text-dim">
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-pink-300" />
              Visual and promotional material for technical events, workshops and conferences
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-pink-300" />
              Delivered under strict deadlines with the organising teams
            </li>
            <li className="flex gap-3">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-pink-300" />
              Best Sub Executive Body Member (2023–2025) and Best Volunteer of the Year (2022–2023)
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col justify-between gap-8 rounded-3xl border border-pink-300/20 bg-gradient-to-br from-pink-500/10 via-void to-void p-7 md:p-9">
          <div>
            <p className="eyebrow text-pink-200">Portfolio</p>
            <p className="font-display mt-4 text-[1.5rem] font-semibold leading-snug">
              See the full design work on Behance.
            </p>
          </div>
          {site.social.behance ? (
            <MagneticButton href={site.social.behance}>
              <BehanceIcon className="size-4" aria-hidden /> View on Behance
              <ArrowUpRight aria-hidden className="size-4" />
            </MagneticButton>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
