"use client";

import { motion } from "motion/react";
import type { ComponentProps, ElementType } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article" | "p" | "span" | "header" | "figure";
} & Omit<ComponentProps<"div">, "ref" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">;

/** Fades and lifts content once, when it first scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 20, as = "div", ...rest }: RevealProps) {
  const Tag = motion[as] as ElementType;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Masked line reveal for display typography: each line slides up from behind a clip. */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  animateOnMount = false,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.06em] block overflow-hidden pb-[0.14em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "105%" }}
            {...(animateOnMount
              ? { animate: { y: "0%" } }
              : { whileInView: { y: "0%" }, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
