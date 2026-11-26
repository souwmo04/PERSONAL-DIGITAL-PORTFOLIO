"use client";

import { motion } from "motion/react";
import { Mic, ScanLine } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Illustrative figure: one conversation showing voice input, OCR and a reply. */
export function MeditalkFigure({ className = "" }: { className?: string }) {
  const bars = [4, 9, 14, 7, 18, 11, 22, 9, 15, 6, 12, 19, 8, 13, 5, 10, 16, 7];
  const item = (d: number) => ({
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { delay: d, duration: 0.6, ease: EASE },
  });

  return (
    <div
      className={`relative mx-auto w-full max-w-[22rem] border border-ink bg-paper ${className}`}
      role="img"
      aria-label="Illustration of a Meditalk AI conversation: a voice message, a scanned prescription read with OCR, and the assistant's plain-language explanation."
    >
      <div className="meta flex items-center justify-between border-b border-ink px-4 py-3 text-muted" aria-hidden>
        <span className="text-ink">Meditalk</span>
        <span>● session 14</span>
      </div>

      <div className="space-y-4 p-4" aria-hidden>
        {/* Voice message */}
        <motion.div {...item(0.2)} className="ml-auto w-[78%] bg-ink p-3 text-paper">
          <div className="meta mb-2 flex items-center gap-2 text-fog">
            <Mic className="size-3" /> voice · 0:06
          </div>
          <div className="flex h-6 items-center gap-[3px]">
            {bars.map((h, i) => (
              <span key={i} className="w-[3px] bg-paper/80" style={{ height: h }} />
            ))}
          </div>
          <p className="mt-2 text-[0.8rem] leading-snug text-fog">
            &ldquo;What is this medicine for, and when do I take it?&rdquo;
          </p>
        </motion.div>

        {/* OCR document */}
        <motion.div {...item(0.6)} className="relative ml-auto w-[78%] overflow-hidden border border-ink/70 bg-paper-2 p-3">
          <div className="meta mb-2 flex items-center gap-2 text-muted">
            <ScanLine className="size-3" /> prescription.jpg
          </div>
          <div className="space-y-1.5 font-serif text-[0.95rem] italic text-graphite">
            <p>Rx — Tab. ████████ 500mg</p>
            <p>1 + 0 + 1 · after meals</p>
            <p>7 days</p>
          </div>
          <motion.span
            className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-vermilion/25 to-transparent"
            initial={{ top: "-20%" }}
            whileInView={{ top: "110%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 1.4, ease: "linear" }}
          />
        </motion.div>

        {/* Assistant reply */}
        <motion.div {...item(1.6)} className="w-[86%] border-l-2 border-vermilion pl-3">
          <p className="meta mb-1.5 text-muted">Assistant</p>
          <p className="text-[0.85rem] leading-relaxed">
            This says to take one tablet in the morning and one at night, after meals, for seven days.
            Your doctor or pharmacist can confirm what it is for.
          </p>
        </motion.div>
      </div>

      <p className="meta border-t rule px-4 py-2.5 text-muted" aria-hidden>
        Illustrative · speech → OCR → LLM
      </p>
    </div>
  );
}
