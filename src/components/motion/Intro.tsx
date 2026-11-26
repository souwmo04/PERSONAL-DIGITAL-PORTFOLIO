"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const IntroContext = createContext(true);

/** True once the loader has started lifting (or was skipped). */
export const useIntroDone = () => useContext(IntroContext);

/** Greetings, ending with "welcome" in Bangla. */
const WORDS = ["Hello", "Bonjour", "Hola", "Ciao", "こんにちは", "Hallo", "مرحبا", "স্বাগতম"];

/** Model-loading steps, each shown from its progress threshold onward. */
const STEPS = [
  { at: 0, label: "Loading tokenizer", detail: "en · bn" },
  { at: 16, label: "Loading weights", detail: "research.safetensors" },
  { at: 34, label: "Indexing projects & papers", detail: "projects · papers" },
  { at: 52, label: "Warming up attention heads", detail: "multimodal" },
  { at: 72, label: "Aligning vision and language", detail: "VLM" },
  { at: 92, label: "Model ready", detail: "fahim-foysal-v1" },
];

const LOAD_MS = 3600; // bar fills over this time…
const HOLD_MS = 400; // …then holds at 100% before lifting (≈4s total)
const EXIT = { duration: 1, ease: [0.76, 0, 0.24, 1] as const };
const STORAGE_KEY = "ff-intro";

/** Fast start, a short "thinking" slowdown mid-way, then a confident finish. */
function curve(t: number) {
  const eased = 1 - Math.pow(1 - t, 2.2);
  const stall = 0.04 * Math.sin(Math.PI * Math.min(1, t * 1.6));
  return Math.min(1, Math.max(0, eased - stall));
}

/**
 * First-visit loader, styled as an AI model loading the page.
 *
 * Greetings cycle in eight languages, ending in Bangla. Under them, a model
 * card shows a progress bar, a layer counter and loading steps. When it hits
 * 100% the sheet lifts away on a curved edge to reveal the page.
 *
 * - About 4 seconds, shown once per browser session. An inline script in the
 *   layout adds `intro-seen` to <html> before the first paint, so returning
 *   visitors never see a flash.
 * - Skippable with a click, Enter, Space or Escape. Skipped for reduced motion.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"show" | "done">("show");
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setPhase("done");
    document.documentElement.classList.remove("intro-active");
    window.__lenis?.start();
  }, []);

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-seen")) {
      finished.current = true;
      // Returning visitor or reduced motion: the overlay is already hidden by CSS.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }
    document.documentElement.classList.add("intro-active");
    window.__lenis?.stop();

    // A timer, not requestAnimationFrame: frames pause in background tabs, timers keep counting.
    const start = performance.now();
    let hold = 0;
    const interval = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / LOAD_MS);
      setProgress(Math.round(curve(t) * 100));
      if (t >= 1) {
        clearInterval(interval);
        hold = window.setTimeout(finish, HOLD_MS);
      }
    }, 40);
    // Safety net: never trap the visitor.
    const failsafe = window.setTimeout(finish, LOAD_MS + HOLD_MS + 2500);

    const onKey = (e: KeyboardEvent) => {
      if (["Escape", "Enter", " "].includes(e.key)) finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(interval);
      clearTimeout(hold);
      clearTimeout(failsafe);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  const wordIndex = Math.min(WORDS.length - 1, Math.floor((progress / 100) * WORDS.length));
  const stepIndex = STEPS.reduce((acc, s, i) => (progress >= s.at ? i : acc), 0);
  const layer = Math.max(1, Math.round((progress / 100) * 24));
  const ready = progress >= 100;

  return (
    <IntroContext.Provider value={phase === "done"}>
      <AnimatePresence>
        {phase === "show" ? (
          <motion.div
            key="intro"
            data-intro
            role="status"
            aria-live="polite"
            aria-label="Loading Fahim Foysal's portfolio"
            onClick={finish}
            className="fixed inset-0 z-[150] cursor-pointer"
            exit={{ y: "-100%", transition: EXIT }}
          >
            <div className="absolute inset-0 overflow-hidden bg-night">
              <div aria-hidden className="absolute left-1/2 top-[38%] size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/20 blur-[120px]" />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
              />

              <div className="relative flex h-full flex-col items-center justify-center px-[var(--gutter)]">
                {/* Greeting */}
                <div className="flex h-[clamp(4rem,11vw,7rem)] items-center">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={WORDS[wordIndex]}
                      className="flex items-center gap-4 font-display text-[clamp(2.6rem,8.5vw,5.75rem)] font-semibold tracking-tight text-text"
                      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                      transition={{ duration: 0.28 }}
                    >
                      <span aria-hidden className="size-3 rounded-full bg-violet shadow-[0_0_20px_4px_rgba(167,139,250,0.8)] md:size-4" />
                      <span className={wordIndex === WORDS.length - 1 ? "text-gradient" : ""}>{WORDS[wordIndex]}</span>
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Model card */}
                <div className="mt-10 w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <p className="flex items-center gap-2.5 font-mono text-xs text-dim">
                      <span className={`size-2 rounded-full ${ready ? "bg-emerald-400" : "animate-pulse bg-violet"}`} />
                      <span className="text-text">fahim-foysal-v1</span>
                      <span className="hidden text-faint sm:inline">· portfolio model</span>
                    </p>
                    <p className="font-mono text-xs tabular-nums text-faint">layer {String(layer).padStart(2, "0")}/24</p>
                  </div>

                  {/* Bar */}
                  <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="relative h-full rounded-full bg-gradient-to-r from-violet-deep via-violet to-aqua shadow-[0_0_16px_rgba(167,139,250,0.7)]"
                      style={{ width: `${progress}%` }}
                    >
                      {!ready ? (
                        <span className="absolute inset-0 animate-[shimmer_1.2s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)] bg-[length:50%_100%] bg-no-repeat" />
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-6">
                    <ul className="min-h-[3.25rem] space-y-1 font-mono text-[0.72rem] leading-snug">
                      {STEPS.slice(Math.max(0, stepIndex - 1), stepIndex + 1).map((s, i, arr) => {
                        const current = i === arr.length - 1;
                        return (
                          <motion.li
                            key={s.label}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: current ? 1 : 0.45, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center gap-2"
                          >
                            {current && !ready ? (
                              <span className="inline-block size-3 animate-spin rounded-full border border-violet border-t-transparent" />
                            ) : (
                              <Check aria-hidden className="size-3 text-emerald-400" />
                            )}
                            <span className={current ? "text-text" : "text-faint"}>{s.label}</span>
                            <span className="hidden text-faint sm:inline">{s.detail}</span>
                          </motion.li>
                        );
                      })}
                    </ul>
                    <p className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-none tabular-nums text-text/90">
                      {progress}
                      <span className="text-violet">%</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-[var(--gutter)] pb-7">
                <p className="eyebrow text-faint">Fahim Foysal · Portfolio 2026</p>
                <p className="eyebrow hidden text-faint/70 sm:block">Click or press Esc to skip</p>
              </div>
            </div>

            {/* Curved bottom edge that flattens as the sheet lifts */}
            <svg aria-hidden className="absolute left-0 top-full h-[18vh] w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                className="fill-night"
                initial={{ d: "M0 0 L100 0 Q50 100 0 0 Z" }}
                exit={{ d: "M0 0 L100 0 Q50 0 0 0 Z", transition: EXIT }}
              />
            </svg>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </IntroContext.Provider>
  );
}
