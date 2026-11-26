"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Tile = { cells: { x: number; y: number; r: number }[]; label: 0 | 1 | 2 };

/**
 * Illustrative figure: procedurally generated "tissue" tiles with class
 * labels, plus a magnified tile under an attention overlay. Every texture is
 * synthetic. Nothing here is patient data.
 */
export function SpectraFigure({ className = "" }: { className?: string }) {
  const tiles = useMemo<Tile[]>(() => {
    const rnd = seeded(41);
    return Array.from({ length: 12 }, (_, t) => {
      const density = 10 + Math.floor(rnd() * 18);
      const cells = Array.from({ length: density }, () => ({
        x: 6 + rnd() * 88,
        y: 6 + rnd() * 88,
        r: 2 + rnd() * (t % 3 === 0 ? 7 : 4),
      }));
      return { cells, label: (t % 3) as 0 | 1 | 2 };
    });
  }, []);

  const classes = ["Class A", "Class B", "Class C"];

  return (
    <div
      className={`grid gap-8 lg:grid-cols-[1.25fr_1fr] ${className}`}
      role="img"
      aria-label="Illustration: a grid of twelve synthetic image tiles, each labelled with a predicted class, and one tile enlarged with an attention heatmap over it."
    >
      <div className="grid grid-cols-4 gap-1.5" aria-hidden>
        {tiles.map((tile, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.04, duration: 0.5, ease: EASE }}
            className={`relative aspect-square ${i === 4 ? "outline outline-1 outline-signal" : ""}`}
          >
            <svg viewBox="0 0 100 100" className="size-full bg-[#2a2622]">
              {tile.cells.map((c, j) => (
                <circle key={j} cx={c.x} cy={c.y} r={c.r} fill="none" stroke={j % 4 === 0 ? "#c9a7b4" : "#8e7f9a"} strokeWidth="1.2" opacity="0.85" />
              ))}
            </svg>
            <span className="meta absolute bottom-1 left-1 bg-ink/70 px-1 text-[0.55rem] text-paper/80">
              {classes[tile.label].slice(-1)}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col" aria-hidden>
        <div className="relative aspect-square w-full max-w-[22rem]">
          <svg viewBox="0 0 100 100" className="size-full bg-[#2a2622]">
            <defs>
              <radialGradient id="att" cx="0.42" cy="0.46" r="0.42">
                <stop offset="0" stopColor="#e8572a" stopOpacity="0.7" />
                <stop offset="0.6" stopColor="#e8572a" stopOpacity="0.18" />
                <stop offset="1" stopColor="#e8572a" stopOpacity="0" />
              </radialGradient>
            </defs>
            {tiles[4].cells.map((c, j) => (
              <circle key={j} cx={c.x} cy={c.y} r={c.r} fill="none" stroke="#c9a7b4" strokeWidth="0.8" />
            ))}
            <motion.rect
              width="100" height="100" fill="url(#att)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1.2 }}
            />
          </svg>
        </div>
        <div className="mt-5 max-w-[22rem] space-y-2">
          {classes.map((c, i) => {
            const w = [0.14, 0.71, 0.15][i];
            return (
              <div key={c} className="grid grid-cols-[4.5rem_1fr_2.5rem] items-center gap-3">
                <span className={`meta ${i === 1 ? "text-signal" : "text-fog"}`}>{c}</span>
                <span className="h-px bg-white/15">
                  <motion.span
                    className={`block h-px ${i === 1 ? "bg-signal" : "bg-fog"}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${w * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.8, ease: EASE }}
                  />
                </span>
                <span className="meta text-right tabular-nums text-fog">{w.toFixed(2)}</span>
              </div>
            );
          })}
        </div>
        <p className="meta mt-5 text-fog">Synthetic textures · illustrative only</p>
      </div>
    </div>
  );
}
