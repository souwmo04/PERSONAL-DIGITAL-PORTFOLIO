"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  external?: boolean;
};

/**
 * The site's one solid button. On fine pointers it leans gently toward the
 * cursor (max ~6px). Used for the two primary calls to action only.
 */
export function MagneticButton({ href, children, variant = "solid", className = "", external }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 12);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 10);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "meta inline-flex h-12 items-center gap-3 px-6 transition-colors duration-200 select-none";
  const look =
    variant === "solid"
      ? "bg-ink text-paper hover:bg-vermilion"
      : "border border-ink/80 text-ink hover:bg-ink hover:text-paper";

  const content = (
    <motion.span ref={ref} style={{ x: sx, y: sy }} className={`${base} ${look} ${className}`}>
      {children}
    </motion.span>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" onPointerMove={onMove} onPointerLeave={reset} className="inline-block">
      {content}
    </a>
  ) : (
    <Link href={href} onPointerMove={onMove} onPointerLeave={reset} className="inline-block">
      {content}
    </Link>
  );
}
