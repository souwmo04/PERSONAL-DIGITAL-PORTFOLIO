"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Illustrative figure: one code-mixed question, the passages retrieved for it,
 * and a grounded reply that runs on a local model.
 */
export function CoupleCareFigure({ className = "" }: { className?: string }) {
  const passages = [
    { tag: "communication", text: "Set aside a short, regular time to talk without screens." },
    { tag: "conflict", text: "Describe the feeling, not the fault: “I feel…” rather than “you always…”" },
    { tag: "যোগাযোগ", text: "ছোট ছোট কথোপকথন সম্পর্কের ভিত শক্ত করে।" },
  ];

  return (
    <div
      className={`grid gap-6 md:grid-cols-[1.1fr_1fr_1.1fr] md:items-center ${className}`}
      role="img"
      aria-label="Illustration of CoupleCare AI: a question mixing Bangla and English goes to a retriever, which finds three passages from a knowledge base, and a local model writes a grounded reply."
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="meta text-muted">Query · mixed language</p>
        <p className="heading mt-3 text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.15]">
          আমরা আজকাল কম কথা বলি. <em className="italic text-graphite">How do we fix that?</em>
        </p>
      </motion.div>

      <ol className="space-y-2" aria-hidden>
        {passages.map((p, i) => (
          <motion.li
            key={p.tag}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: EASE }}
            className="border rule bg-paper p-3"
            style={{ marginLeft: i * 10 }}
          >
            <span className="meta text-vermilion">k={i + 1} · {p.tag}</span>
            <p className="mt-1 text-[0.82rem] leading-snug text-graphite">{p.text}</p>
          </motion.li>
        ))}
      </ol>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
        className="border-l border-ink pl-5"
      >
        <p className="meta text-muted">Reply · local LLM</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed">
          প্রতিদিন দশ মিনিট, ফোন ছাড়া — just to talk about the day. Small, regular conversations tend to matter
          more than one big one.
        </p>
        <p className="meta mt-4 text-muted">grounded in passages 1–3 · runs on device</p>
      </motion.div>
    </div>
  );
}
