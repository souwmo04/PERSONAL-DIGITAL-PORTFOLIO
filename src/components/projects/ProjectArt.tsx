"use client";

import { motion } from "motion/react";
import type { ProjectVisual } from "@/content/types";

/**
 * Small animated, abstract artwork for each project card: a visual cue for
 * what the project does. None of it is a screenshot.
 */
export function ProjectArt({ visual, className = "" }: { visual: ProjectVisual; className?: string }) {
  return (
    <div aria-hidden className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.35),transparent_60%),radial-gradient(circle_at_80%_90%,rgba(103,232,249,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]" />
      <div className="absolute inset-0 grid place-items-center transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]">
        {visual === "dashlens" && <Dash />}
        {visual === "meditalk" && <Wave />}
        {visual === "couplecare" && <Bilingual />}
        {visual === "spectra" && <Cells />}
      </div>
    </div>
  );
}

function Dash() {
  const bars = [40, 66, 52, 92, 58, 74];
  return (
    <div className="relative flex h-32 items-end gap-2.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className={`w-6 rounded-t-md ${i === 3 ? "bg-gradient-to-t from-violet-deep to-iris shadow-[0_0_24px_rgba(167,139,250,0.7)]" : "bg-white/15"}`}
          initial={{ height: 0 }}
          whileInView={{ height: h }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <motion.span
        className="absolute -inset-x-3 top-0 h-px bg-aqua/80 shadow-[0_0_10px_rgba(103,232,249,0.9)]"
        animate={{ y: [0, 128, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-void/70 px-3 py-1 text-[0.7rem] text-iris">
        Which region grew fastest?
      </span>
    </div>
  );
}

function Wave() {
  const n = 28;
  return (
    <div className="flex h-24 items-center gap-1.5">
      {Array.from({ length: n }, (_, i) => {
        const base = 10 + Math.abs(Math.sin(i * 0.7)) * 60;
        return (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-violet-deep via-violet to-iris"
            animate={{ height: [base * 0.4, base, base * 0.6] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatType: "mirror", delay: i * 0.05, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}

function Bilingual() {
  return (
    <div className="relative h-36 w-56">
      <motion.span
        className="absolute left-2 top-2 grid size-24 place-items-center rounded-full border border-violet/40 bg-violet/15 text-5xl text-iris backdrop-blur"
        animate={{ x: [0, 14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        অ
      </motion.span>
      <motion.span
        className="font-display absolute bottom-2 right-2 grid size-24 place-items-center rounded-full border border-aqua/30 bg-aqua/10 text-5xl font-semibold text-aqua/90 backdrop-blur"
        animate={{ x: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        A
      </motion.span>
    </div>
  );
}

function Cells() {
  const cells = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div className="grid grid-cols-6 gap-1.5">
      {cells.map((i) => (
        <motion.span
          key={i}
          className={`size-7 rounded-md ${i === 9 ? "bg-iris shadow-[0_0_18px_rgba(196,181,253,0.9)]" : "bg-white/10"}`}
          animate={i === 9 ? undefined : { opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: (i % 6) * 0.15 + Math.floor(i / 6) * 0.1 }}
        />
      ))}
    </div>
  );
}
