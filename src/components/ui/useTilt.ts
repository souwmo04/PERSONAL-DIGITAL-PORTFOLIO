"use client";

import { useCallback } from "react";

/**
 * Pointer handlers that tilt an `.fx-card` toward the cursor (mouse only), and
 * expose the cursor position as --mx/--my for spotlight effects.
 */
export function useTilt(max = 6) {
  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      if (e.pointerType !== "mouse") return;
      el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
    },
    [max],
  );
  const onPointerLeave = useCallback((e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  }, []);
  return { onPointerMove, onPointerLeave };
}
