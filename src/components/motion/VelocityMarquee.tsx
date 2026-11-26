"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";

/**
 * A giant, slightly tilted strip of words between sections. It drifts on its
 * own, speeds up with your scroll velocity and reverses when you scroll up.
 * Words alternate between solid and outline type.
 */
export function VelocityMarquee({
  words,
  baseSpeed = 2.2,
  tilt = -2,
}: {
  words: string[];
  baseSpeed?: number;
  tilt?: number;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const direction = useRef(1);
  const pos = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseSpeed * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * Math.abs(f);
    x.set(x.get() - move);
  });

  const row = [...words, ...words];
  return (
    <div aria-hidden className="relative overflow-hidden py-10" style={{ transform: `rotate(${tilt}deg)` }}>
      <div className="border-y border-line bg-gradient-to-r from-violet-deep/10 via-violet/5 to-aqua/10 py-5">
        <motion.div style={{ x: pos }} className="flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {row.map((w, i) => (
                <span key={`${copy}-${i}`} className="flex items-center">
                  <span
                    className={`heading-xl px-6 text-[clamp(2.5rem,7vw,5.5rem)] ${
                      i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_rgba(196,181,253,0.55)]" : "text-gradient"
                    }`}
                  >
                    {w}
                  </span>
                  <span className="text-[clamp(1.5rem,3vw,2.5rem)] text-violet">✦</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
