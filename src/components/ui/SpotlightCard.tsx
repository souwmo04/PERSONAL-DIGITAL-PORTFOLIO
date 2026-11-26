"use client";

import { useTilt } from "./useTilt";

/**
 * Glass card with hover effects: a 3D tilt toward the cursor, a soft spotlight
 * that follows it, a light beam running around the border, and a lift with glow.
 */
export function SpotlightCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const tilt = useTilt(6);
  return (
    <Tag {...tilt} className={`fx-card group/spot relative overflow-hidden rounded-3xl glass hover:border-violet/30 ${className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--color-violet) 16%, transparent), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </Tag>
  );
}
