"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const IntroContext = createContext(true);

/** True once the loader has started lifting (or was skipped). */
export const useIntroDone = () => useContext(IntroContext);

/** Greetings, ending with "welcome" in Bangla. */
const WORDS = ["Hello", "Bonjour", "Hola", "Ciao", "こんにちは", "Hallo", "مرحبا", "স্বাগতম"];
const FIRST_MS = 650;
const STEP_MS = 165;
const EXIT = { duration: 1, ease: [0.76, 0, 0.24, 1] as const };
const STORAGE_KEY = "ff-intro";

/**
 * First-visit loader: "hello" in several languages, ending in Bangla, with a
 * progress counter. The sheet then lifts away on a curved edge to reveal the
 * hero.
 *
 * - Shown once per browser session. An inline script in the layout adds
 *   `intro-seen` to <html> before the first paint, so returning visitors never
 *   see a flash.
 * - Skippable with a click, Enter, Space or Escape. Skipped entirely for reduced motion.
 * - About 2 seconds in total, within common preloader guidance.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"show" | "done">("show");
  const [index, setIndex] = useState(0);
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

    const timers: number[] = [];
    let t = FIRST_MS;
    for (let i = 1; i < WORDS.length; i++) {
      timers.push(window.setTimeout(() => setIndex(i), t));
      t += STEP_MS;
    }
    timers.push(window.setTimeout(finish, t + 450));

    const onKey = (e: KeyboardEvent) => {
      if (["Escape", "Enter", " "].includes(e.key)) finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  const progress = Math.round((index / (WORDS.length - 1)) * 100);

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
            {/* Sheet */}
            <div className="absolute inset-0 overflow-hidden bg-night">
              <div aria-hidden className="absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/20 blur-[120px]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={WORDS[index]}
                    lang={index === 0 ? "en" : undefined}
                    className="flex items-center gap-4 font-display text-[clamp(2.75rem,9vw,6rem)] font-semibold tracking-tight text-text"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: index === 0 ? 0.5 : 0.12 }}
                  >
                    <span aria-hidden className="size-3 rounded-full bg-violet shadow-[0_0_20px_4px_rgba(167,139,250,0.8)] md:size-4" />
                    <span className={index === WORDS.length - 1 ? "text-gradient" : ""}>{WORDS[index]}</span>
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Footer: name, progress, hint */}
              <div className="absolute inset-x-0 bottom-0 px-[var(--gutter)] pb-8">
                <div className="mb-4 h-px w-full overflow-hidden bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-violet-deep via-violet to-aqua transition-[width] duration-150 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-end justify-between gap-6">
                  <p className="eyebrow text-faint">Fahim Foysal · Portfolio 2026</p>
                  <p className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none tabular-nums text-text/90">
                    {progress}
                    <span className="text-violet">%</span>
                  </p>
                </div>
                <p className="eyebrow mt-3 hidden text-faint/70 sm:block">Click or press Esc to skip</p>
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
