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
        {visual === "scan" && <Scan />}
        {visual === "map" && <MapPins />}
        {visual === "flame" && <Flame />}
        {visual === "weather" && <Weather />}
        {visual === "accent" && <Accent />}
        {visual === "agent" && <Agent />}
        {visual === "car" && <Car />}
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

function Scan() {
  return (
    <div className="relative h-40 w-32 rounded-xl border border-white/20 bg-white/[0.04] p-4">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="mb-2.5 block h-1.5 rounded-full bg-white/15" style={{ width: `${[90, 70, 85, 60, 78, 45][i]}%` }} />
      ))}
      <span className="absolute -left-2 -top-2 size-5 border-l-2 border-t-2 border-iris" />
      <span className="absolute -right-2 -top-2 size-5 border-r-2 border-t-2 border-iris" />
      <span className="absolute -bottom-2 -left-2 size-5 border-b-2 border-l-2 border-iris" />
      <span className="absolute -bottom-2 -right-2 size-5 border-b-2 border-r-2 border-iris" />
      <motion.span
        className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-violet/40 to-transparent"
        animate={{ top: ["-10%", "85%", "-10%"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.7rem] text-iris">বাংলা · English OCR</span>
    </div>
  );
}

function MapPins() {
  const pins = [
    [18, 30], [42, 22], [66, 38], [30, 60], [55, 66], [78, 58], [48, 44], [22, 80], [70, 82],
  ];
  return (
    <div className="relative h-40 w-64">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" preserveAspectRatio="none">
        <path d="M5,40 C25,10 60,5 92,25 C98,55 85,90 50,95 C20,98 2,75 5,40Z" fill="rgba(167,139,250,0.08)" stroke="rgba(167,139,250,0.4)" strokeWidth="0.6" />
        <path d="M10,55 C35,48 60,62 95,50" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
        <path d="M45,5 C48,40 40,70 52,98" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      </svg>
      {pins.map(([x, y], i) => (
        <motion.span
          key={i}
          className={`absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${i % 3 === 0 ? "bg-iris shadow-[0_0_12px_rgba(196,181,253,0.9)]" : "bg-white/25"}`}
          style={{ left: `${x}%`, top: `${y}%` }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 300, damping: 15 }}
        />
      ))}
    </div>
  );
}

function Flame() {
  return (
    <div className="relative size-40">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 m-auto rounded-full"
          style={{
            width: `${100 - i * 28}%`,
            height: `${100 - i * 28}%`,
            background: ["rgba(124,58,237,0.25)", "rgba(167,139,250,0.35)", "rgba(103,232,249,0.55)"][i],
            filter: "blur(6px)",
          }}
          animate={{ scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 2.4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <span className="absolute inset-0 m-auto size-3 rounded-full bg-white shadow-[0_0_20px_6px_rgba(255,255,255,0.6)]" />
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.7rem] text-iris">spherical flame · microgravity</span>
    </div>
  );
}

function Weather() {
  return (
    <div className="relative h-36 w-56">
      <motion.span
        className="absolute right-6 top-2 size-20 rounded-full bg-gradient-to-br from-iris to-violet-deep shadow-[0_0_50px_rgba(167,139,250,0.6)]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.span
        className="absolute bottom-6 left-2 h-14 w-36 rounded-full bg-white/15 backdrop-blur"
        animate={{ x: [0, 18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="absolute h-3 w-px bg-aqua/70"
          style={{ left: `${20 + i * 14}%`, top: "78%" }}
          animate={{ y: [0, 18], opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

function Accent() {
  const regions = ["S. Asian", "African", "English", "E. Asian"];
  return (
    <div className="flex flex-col items-center gap-5">
      <Wave />
      <div className="flex gap-2">
        {regions.map((r, i) => (
          <span key={r} className={`rounded-full px-2.5 py-1 text-[0.65rem] ${i === 0 ? "bg-violet text-void" : "border border-line text-dim"}`}>
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

function Agent() {
  const steps = ["Join", "Transcribe", "Summarise", "Report"];
  return (
    <div className="flex items-center gap-2">
      {steps.map((st, i) => (
        <div key={st} className="flex items-center gap-2">
          <motion.span
            className="rounded-xl border border-violet/30 bg-violet/10 px-3 py-2 text-xs text-iris"
            animate={{ borderColor: ["rgba(167,139,250,0.3)", "rgba(196,181,253,0.9)", "rgba(167,139,250,0.3)"] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6 }}
          >
            {st}
          </motion.span>
          {i < steps.length - 1 ? <span className="h-px w-4 bg-white/25" /> : null}
        </div>
      ))}
    </div>
  );
}

function Car() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className={`flex h-16 w-20 flex-col justify-end rounded-xl border p-2 ${i === 1 ? "border-violet/60 bg-violet/15" : "border-line bg-white/[0.03]"}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
        >
          <span className="mb-1 h-3 w-full rounded-t-full bg-white/20" />
          <span className="h-1 w-2/3 rounded-full bg-white/15" />
        </motion.div>
      ))}
    </div>
  );
}
