"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FileText, Plus } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import type { Publication } from "@/content/types";
import { AuthorList } from "./AuthorList";
import { BibtexBlock } from "./BibtexBlock";
import { ResultsTable } from "./ResultsTable";

const EASE = [0.16, 1, 0.3, 1] as const;

function LinkBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  const cls =
    "group inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm transition-colors hover:border-violet/50 hover:text-iris";
  const icon = <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
      {icon}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}

/** A publication as a glowing glass card, with expandable contributions, results and citation. */
export function PublicationEntry({ pub, index }: { pub: Publication; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article
      aria-labelledby={`${panelId}-t`}
      className="relative overflow-hidden rounded-[2rem] border border-violet/20 bg-gradient-to-b from-violet-deep/[0.12] to-white/[0.01] p-7 md:p-12"
    >
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-violet/20 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-10 size-72 rounded-full bg-aqua/10 blur-[110px]" />

      <div className="relative flex flex-wrap items-center gap-3">
        <span className="font-mono text-sm text-violet">{String(index).padStart(2, "0")}</span>
        <span className="pill">
          <FileText aria-hidden className="size-3" /> {pub.venueShort}
        </span>
        <span className="font-mono text-xs text-dim">
          {pub.year}
          {pub.pages ? ` · pp. ${pub.pages}` : ""}
        </span>
      </div>

      <h3 id={`${panelId}-t`} className="font-display relative mt-6 max-w-4xl text-[clamp(1.5rem,3vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
        {pub.title}
      </h3>
      <AuthorList authors={pub.authors} className="relative mt-5 text-[0.98rem] text-dim" />
      <p className="relative mt-2 text-sm italic text-faint">
        {pub.venue}. {pub.publisher}
        {pub.location ? `, ${pub.location}` : ""}.
      </p>

      {pub.notes?.length ? (
        <ul className="relative mt-4 flex flex-wrap gap-2">
          {pub.notes.map((n) => (
            <li key={n} className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 text-xs text-emerald-100/90">
              {n}
            </li>
          ))}
        </ul>
      ) : null}

      <p className="relative mt-7 max-w-3xl text-[1.0625rem] leading-relaxed text-text/90">{pub.summary}</p>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {pub.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>

      <div className="relative mt-8 flex flex-wrap items-center gap-3">
        {pub.links.paper ? <LinkBtn href={pub.links.paper}>ACL Anthology</LinkBtn> : null}
        {pub.links.pdf ? <LinkBtn href={pub.links.pdf}>PDF</LinkBtn> : null}
        {pub.links.code ? <LinkBtn href={pub.links.code}>Code</LinkBtn> : null}
        <LinkBtn href={`/research/${pub.slug}`}>Paper notes</LinkBtn>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-violet/15 px-4 py-2 text-sm text-iris transition-colors hover:bg-violet/25 sm:ml-auto"
        >
          <Plus aria-hidden className={`size-4 transition-transform duration-500 ${open ? "rotate-45" : ""}`} />
          {open ? "Hide details" : "Contributions & results"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden"
          >
            <div className="grid gap-10 border-t border-line pt-10 mt-10 lg:grid-cols-2">
              <div>
                {pub.context ? (
                  <>
                    <p className="eyebrow text-faint">Setting</p>
                    <p className="mt-3 text-[0.97rem] leading-relaxed text-dim">{pub.context}</p>
                  </>
                ) : null}
                <p className="eyebrow mt-8 text-faint">Contributions</p>
                <ol className="mt-4 space-y-3">
                  {pub.contributions.map((c, i) => (
                    <li key={i} className="flex gap-3 text-[0.97rem] leading-relaxed">
                      <span className="font-mono text-xs text-violet pt-1">0{i + 1}</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="space-y-8">
                {pub.results ? <ResultsTable results={pub.results} /> : null}
                <BibtexBlock bibtex={pub.bibtex} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
