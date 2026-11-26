"use client";

import { useRef } from "react";

/**
 * Glass card with a soft violet spotlight that follows the cursor and a
 * border that lights up near it.
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
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Tag
      ref={ref as React.Ref<never>}
      onPointerMove={onMove}
      className={`group/spot relative overflow-hidden rounded-3xl glass transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-violet/30 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(167,139,250,0.14), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </Tag>
  );
}
