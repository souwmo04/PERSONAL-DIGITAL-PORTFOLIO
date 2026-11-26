"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useEffect, useState } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;
const IntroContext = createContext(true);

/** True once the intro curtain has lifted (or was skipped). */
export const useIntroDone = () => useContext(IntroContext);

/**
 * First-visit intro: a counter climbs to 100 under the name, then the
 * curtain lifts in two panels. Shown once per session, skipped for reduced
 * motion.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"pending" | "show" | "done">("pending");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("ff-intro") === "1";
    if (reduce || seen) {
      // The intro decision depends on sessionStorage and media queries, which only exist on the client.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }
    setPhase("show");
    window.__lenis?.stop();
    const startT = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - startT) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setCount(Math.round(eased * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
      else
        window.setTimeout(() => {
          sessionStorage.setItem("ff-intro", "1");
          setPhase("done");
          window.__lenis?.start();
        }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <IntroContext.Provider value={phase === "done"}>
      <AnimatePresence>
        {phase !== "done" ? (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[150] flex"
            aria-hidden
            exit={{ transition: { duration: 1 } }}
          >
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="h-full w-1/2 bg-night"
                exit={{ y: "-100%" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
              />
            ))}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {phase === "show" ? (
                <>
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="heading-xl text-[clamp(2rem,6vw,4rem)] text-gradient"
                    >
                      Fahim Foysal
                    </motion.p>
                  </div>
                  <div className="mt-6 h-px w-48 overflow-hidden bg-line">
                    <div
                      className="h-full bg-gradient-to-r from-violet-deep via-violet to-aqua"
                      style={{ width: `${count}%` }}
                    />
                  </div>
                  <p className="eyebrow mt-4 tabular-nums text-dim">{String(count).padStart(3, "0")}</p>
                </>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </IntroContext.Provider>
  );
}
