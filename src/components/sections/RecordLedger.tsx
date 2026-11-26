"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Achievement } from "@/content/types";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Achievements as a ledger, filterable by year. */
export function RecordLedger({ items }: { items: Achievement[] }) {
  const years = Array.from(new Set(items.map((a) => a.year))).sort().reverse();
  const [year, setYear] = useState<string>("all");
  const shown = year === "all" ? items : items.filter((a) => a.year === year);

  return (
    <div>
      <div role="group" aria-label="Filter by year" className="mb-8 flex items-center gap-1">
        {["all", ...years].map((y) => (
          <button
            key={y}
            type="button"
            aria-pressed={year === y}
            onClick={() => setYear(y)}
            className="meta border border-transparent px-3 py-2 text-muted transition-colors hover:text-ink aria-pressed:border-ink aria-pressed:text-ink"
          >
            {y === "all" ? "All" : y}
          </button>
        ))}
        <span className="meta ml-auto text-muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      <ol className="border-t border-ink">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((a) => {
            const body = (
              <>
                <span className="meta pt-3 text-muted md:pt-4">{a.year}</span>
                <div className="min-w-0">
                  <p className="display text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[0.95] transition-colors duration-300 group-hover:text-vermilion">
                    {a.rank}
                  </p>
                  <p className="meta mt-2 text-muted">{a.rankNote}</p>
                </div>
                <div className="col-span-2 mt-4 md:col-span-1 md:mt-3">
                  <p className="text-[1.125rem] font-medium">{a.event}</p>
                  <p className="mt-1 text-[0.95rem] text-graphite">{a.scope}</p>
                  {a.team ? <p className="meta mt-3 text-muted">{a.team}</p> : null}
                  {a.detail ? <p className="mt-3 text-sm italic text-graphite">{a.detail}</p> : null}
                </div>
                {a.href ? (
                  <ArrowRight
                    aria-hidden
                    className="col-start-2 mt-4 size-4 text-muted transition-transform group-hover:translate-x-1 group-hover:text-vermilion md:col-start-auto md:mt-5"
                    strokeWidth={1.5}
                  />
                ) : (
                  <span className="hidden md:block" />
                )}
              </>
            );
            const cls =
              "group grid grid-cols-[3.5rem_1fr] gap-x-5 border-b rule py-6 md:grid-cols-[5rem_minmax(0,1.2fr)_minmax(0,1fr)_1.5rem] md:gap-x-8 md:py-8";
            return (
              <motion.li
                key={a.event + a.year}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {a.href ? (
                  <Link href={a.href} className={cls}>
                    {body}
                  </Link>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ol>
    </div>
  );
}
