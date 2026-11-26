"use client";

import { MotionConfig } from "motion/react";

/**
 * Global motion settings. `reducedMotion="user"` makes every Motion animation
 * honour the OS "reduce motion" setting: transforms are skipped, fades stay.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
