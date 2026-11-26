"use client";

import { motion } from "motion/react";
import type { ComponentProps, ElementType } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  blur?: boolean;
  as?: "div" | "li" | "section" | "article" | "p" | "span" | "header" | "figure";
} & Omit<ComponentProps<"div">, "ref" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">;

/** Fades, lifts and un-blurs content once as it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 28, x = 0, blur = true, as = "div", ...rest }: RevealProps) {
  const Tag = motion[as] as ElementType;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Masked line reveal for headings. */
export function LineReveal({
  lines,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <motion.span
            className="block"
            initial={{ y: "110%", rotate: 2 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
