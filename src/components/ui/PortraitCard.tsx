"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { site } from "@/content/site";

/**
 * Portrait in a glowing frame that tilts gently toward the cursor in 3D,
 * with a soft light sweep. Static for touch and reduced motion.
 */
export function PortraitCard({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glare = useTransform(
    [glareX, glareY] as never,
    ([x, y]: string[]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.18), transparent 55%)`,
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className={`[perspective:1200px] ${className}`}>
      <motion.figure
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry }}
        className="relative rounded-[2rem] bg-gradient-to-br from-iris/60 via-violet-deep/40 to-aqua/30 p-px shadow-[0_30px_80px_-30px_color-mix(in_oklab,_var(--color-violet-deep)_60%,_transparent)]"
      >
        <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-violet-deep/25 blur-3xl" />
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-night">
          <Image
            src="/images/fahim-foysal-photo.jpg"
            alt={`${site.name}, in a dark suit, standing in front of a brick wall at North South University`}
            width={960}
            height={1200}
            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 60vw, 90vw"
            className="h-auto w-full object-cover"
            priority={false}
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void/90 via-void/30 to-transparent" />
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: glare }} />
          <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
            <span>
              <span className="font-display block text-lg font-semibold">{site.name}</span>
              <span className="text-sm text-dim">
                a.k.a. {site.nickname} · North South University
              </span>
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-void/60 px-2.5 py-1 text-[0.7rem] text-emerald-200 backdrop-blur">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Dhaka
            </span>
          </figcaption>
        </div>
      </motion.figure>
    </div>
  );
}
