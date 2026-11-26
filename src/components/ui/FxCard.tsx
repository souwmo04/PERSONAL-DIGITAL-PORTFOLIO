"use client";

import { useTilt } from "./useTilt";

/** Adds the shared card hover effects (tilt, border beam, lift) to any block. */
export function FxCard({ children, className = "", max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
  const tilt = useTilt(max);
  return (
    <div {...tilt} className={`fx-card relative ${className}`}>
      {children}
    </div>
  );
}
