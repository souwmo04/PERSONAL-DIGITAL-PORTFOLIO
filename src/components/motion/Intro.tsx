"use client";

import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const IntroContext = createContext(true);

/** True once the loader has started its exit (or was skipped). */
export const useIntroDone = () => useContext(IntroContext);

const NAME = "Fahim Foysal";
const GLYPHS = "01<>/{}[]#$%&*+=?ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** A deliberately silly build log. Each line appears at its progress threshold. */
const LOG = [
  { at: 0, text: "$ npm run fahim --mode=portfolio", tone: "cmd" },
  { at: 8, text: "› brewing chai for the GPU ☕", tone: "log" },
  { at: 22, text: "› downloading more RAM… (legally)", tone: "log" },
  { at: 36, text: "› teaching the neurons Bangla: শেখা হচ্ছে…", tone: "log" },
  { at: 50, text: "› bribing the attention heads", tone: "log" },
  { at: 64, text: "› fixing bugs, adding features (same thing)", tone: "log" },
  { at: 80, text: "› it works on my machine ✓", tone: "log" },
  { at: 96, text: "✓ compiled with 0 errors (we checked twice)", tone: "ok" },
] as const;

const LOAD_MS = 3600;
const HOLD_MS = 350;
const EXIT_MS = 1000;
const EASE = [0.76, 0, 0.24, 1] as const;
const STORAGE_KEY = "ff-intro";

function curve(t: number) {
  const eased = 1 - Math.pow(1 - t, 2.2);
  const stall = 0.04 * Math.sin(Math.PI * Math.min(1, t * 1.6));
  return Math.min(1, Math.max(0, eased - stall));
}

/** Letters scramble through glyphs and lock in from left to right. */
function scramble(elapsed: number) {
  const settleStart = 250;
  const perLetter = 110;
  return Array.from(NAME)
    .map((ch, i) => {
      if (ch === " ") return " ";
      return elapsed > settleStart + i * perLetter ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    })
    .join("");
}

/**
 * First-visit loader with a playful tech theme.
 *
 * - The name decodes letter by letter, and a few letters keep flickering
 *   between solid and outline.
 * - A tongue-in-cheek build log runs with an ASCII progress bar.
 * - On exit the name glides into its place in the navigation bar while the
 *   sheet lifts away on a curved edge.
 * - About 4 seconds, once per session (gated before first paint by an inline
 *   script in the layout), skippable with a click, Enter, Space or Escape, and
 *   off for reduced motion.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");
  const [progress, setProgress] = useState(0);
  const [word, setWord] = useState(() => NAME.replace(/\S/g, "·"));
  const [outlined, setOutlined] = useState<number[]>([]);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const controls = useAnimationControls();
  const exiting = useRef(false);

  const exit = useCallback(async () => {
    if (exiting.current) return;
    exiting.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setWord(NAME);
    setOutlined([]);
    setProgress(100);
    setPhase("exit");
    document.documentElement.classList.remove("intro-active");
    window.__lenis?.start();

    // Fly the wordmark to the nav logo.
    const target = document.querySelector<HTMLElement>("[data-nav-logo]")?.getBoundingClientRect();
    const own = wordRef.current?.getBoundingClientRect();
    if (target && own && own.height > 0) {
      const scale = target.height / own.height;
      await controls.start({
        x: target.left - own.left,
        y: target.top - own.top,
        scale,
        transition: { duration: EXIT_MS / 1000, ease: EASE },
      });
    } else {
      await new Promise((r) => setTimeout(r, EXIT_MS));
    }
    setPhase("done");
  }, [controls]);

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-seen")) {
      exiting.current = true;
      // Returning visitor or reduced motion: the overlay is already hidden by CSS.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }
    document.documentElement.classList.add("intro-active");
    window.__lenis?.stop();

    // Timers rather than animation frames: frames pause in background tabs.
    const start = performance.now();
    let hold = 0;
    const tick = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const t = Math.min(1, elapsed / LOAD_MS);
      setProgress(Math.round(curve(t) * 100));
      setWord(scramble(elapsed));
      if (t >= 1) {
        clearInterval(tick);
        hold = window.setTimeout(exit, HOLD_MS);
      }
    }, 45);
    const flicker = window.setInterval(() => {
      const letters = Array.from(NAME).map((c, i) => (c === " " ? -1 : i)).filter((i) => i >= 0);
      setOutlined(letters.filter(() => Math.random() < 0.22));
    }, 260);
    const failsafe = window.setTimeout(exit, LOAD_MS + HOLD_MS + 2500);

    const onKey = (e: KeyboardEvent) => {
      if (["Escape", "Enter", " "].includes(e.key)) exit();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearInterval(tick);
      clearInterval(flicker);
      clearTimeout(hold);
      clearTimeout(failsafe);
      window.removeEventListener("keydown", onKey);
    };
  }, [exit]);

  const visibleLog = LOG.filter((l) => progress >= l.at);
  const cells = 24;
  const filled = Math.round((progress / 100) * cells);
  const bar = "█".repeat(filled) + "░".repeat(cells - filled);

  return (
    <IntroContext.Provider value={phase !== "show"}>
      {phase !== "done" ? (
        <div data-intro className="fixed inset-0 z-[150]" onClick={exit} role="status" aria-live="polite" aria-label="Loading Fahim Foysal's portfolio">
          {/* Sheet */}
          <motion.div
            className="absolute inset-0 cursor-pointer"
            animate={phase === "exit" ? { y: "-100%" } : { y: "0%" }}
            transition={{ duration: EXIT_MS / 1000, ease: EASE }}
          >
            <div className="absolute inset-0 overflow-hidden bg-night">
              <div aria-hidden className="absolute left-1/2 top-[40%] size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/20 blur-[130px]" />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
              />

              {/* Terminal */}
              <div className="absolute inset-x-0 top-[58%] mx-auto w-[min(92vw,36rem)] px-1">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
                    <span className="size-2.5 rounded-full bg-[#28c840]/80" />
                    <span className="ml-3 font-mono text-[0.68rem] text-faint">~/fahim-foysal — zsh</span>
                  </div>
                  <ul className="flex h-[9.5rem] flex-col justify-end gap-1 overflow-hidden px-4 py-3 font-mono text-[0.74rem] leading-relaxed sm:text-[0.78rem]">
                    <AnimatePresence initial={false}>
                      {visibleLog.slice(-5).map((l) => (
                        <motion.li
                          key={l.text}
                          layout
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className={l.tone === "cmd" ? "text-iris" : l.tone === "ok" ? "text-emerald-300" : "text-dim"}
                        >
                          {l.text}
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                  <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-2.5 font-mono text-[0.72rem]">
                    <span className="truncate text-violet" aria-hidden>
                      [{bar}]
                    </span>
                    <span className="tabular-nums text-text">{progress}%</span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-[var(--gutter)] pb-7">
                <p className="eyebrow text-faint">Portfolio 2026 · Dhaka, BD</p>
                <p className="eyebrow hidden text-faint/70 sm:block">Click or press Esc to skip</p>
              </div>
            </div>

            {/* Curved bottom edge that flattens as the sheet lifts */}
            <svg aria-hidden className="absolute left-0 top-full h-[18vh] w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                className="fill-night"
                initial={{ d: "M0 0 L100 0 Q50 100 0 0 Z" }}
                animate={phase === "exit" ? { d: "M0 0 L100 0 Q50 0 0 0 Z" } : undefined}
                transition={{ duration: EXIT_MS / 1000, ease: EASE }}
              />
            </svg>
          </motion.div>

          {/* Wordmark: outside the sheet, so it can fly into the nav */}
          <div className="pointer-events-none absolute inset-x-0 top-[40%] flex -translate-y-1/2 justify-center">
            <motion.p
              ref={wordRef}
              animate={controls}
              style={{ transformOrigin: "0 0" }}
              className="font-display text-[clamp(2.75rem,10vw,7.5rem)] font-semibold leading-none tracking-tight text-text"
              aria-hidden
            >
              {Array.from(NAME).map((real, i) => {
                const shown = word[i] ?? real;
                const resolved = shown === real;
                return (
                  // The real letter reserves the width, so scrambled glyphs never make the word jump.
                  <span key={i} className="relative inline-block">
                    <span
                      className={`${resolved ? "" : "invisible"} transition-colors duration-150 ${
                        outlined.includes(i) ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-iris)]" : ""
                      }`}
                    >
                      {real === " " ? " " : real}
                    </span>
                    {!resolved ? (
                      <span className="absolute inset-0 text-center font-mono font-normal text-violet/80">{shown}</span>
                    ) : null}
                  </span>
                );
              })}
            </motion.p>
          </div>
        </div>
      ) : null}
      {children}
    </IntroContext.Provider>
  );
}
