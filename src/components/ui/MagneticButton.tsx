"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "glow" | "ghost";
  className?: string;
};

/**
 * Pill button that leans toward the cursor and carries a slow gradient
 * sheen. Used for the main calls to action only.
 */
export function MagneticButton({ href, children, variant = "glow", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 16);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 12);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const look =
    variant === "glow"
      ? "bg-gradient-to-r from-violet-deep via-violet to-iris text-void shadow-[0_0_40px_-8px_rgba(167,139,250,0.8)] hover:shadow-[0_0_60px_-6px_rgba(167,139,250,0.95)]"
      : "border border-line bg-white/[0.03] text-text hover:border-violet/50 hover:bg-violet/10";

  const content = (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      className={`relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full px-6 text-sm font-medium transition-[box-shadow,background-color,border-color] duration-300 ${look} ${className}`}
    >
      {variant === "glow" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-[300%]"
        />
      ) : null}
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
    </motion.span>
  );

  const external = /^(https?:|mailto:)/.test(href);
  return external ? (
    <a
      href={href}
      {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="group inline-block"
    >
      {content}
    </a>
  ) : (
    <Link href={href} onPointerMove={onMove} onPointerLeave={reset} className="group inline-block">
      {content}
    </Link>
  );
}
