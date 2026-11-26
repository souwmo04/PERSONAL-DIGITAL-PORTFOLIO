"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Wraps a home-page section so it rises into place as you scroll. It starts
 * slightly smaller, lower and with rounded corners, like a card being dealt
 * onto the table, then settles to full width. The motion is tied to scroll
 * position (scrubbed), not played once.
 *
 * No transform is left behind once the section has settled, so fixed and
 * sticky children keep working afterwards.
 */
export function ScrollStage({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const scale = useTransform(p, [0, 1], [0.9, 1]);
  const y = useTransform(p, [0, 1], [90, 0]);
  const radius = useTransform(p, [0, 1], [48, 0]);
  const opacity = useTransform(p, [0, 0.6], [0.35, 1]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, borderRadius: radius, opacity }}
      className={`origin-top overflow-hidden will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
