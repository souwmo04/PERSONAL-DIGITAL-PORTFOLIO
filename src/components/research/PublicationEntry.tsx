"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { Publication } from "@/content/types";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { AuthorList } from "./AuthorList";
import { BibtexBlock } from "./BibtexBlock";
import { ResultsTable } from "./ResultsTable";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A publication typeset like a reference entry, with expandable detail. */
export function PublicationEntry({ pub, index }: { pub: Publication; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article className="grid-page border-t border-ink pt-6" aria-labelledby={`${panelId}-title`}>
      {/* Margin: index, year, venue */}
      <div className="col-span-4 mb-6 flex items-baseline gap-4 md:col-span-2 md:block lg:col-span-3">
        <span className="heading text-[3.5rem] leading-none italic text-vermilion md:text-[4.5rem]">[{index}]</span>
        <div className="meta space-y-1 text-muted md:mt-4">
          <p className="text-ink">{pub.year}</p>
          <p>{pub.venueShort}</p>
          {pub.pages ? <p>pp. {pub.pages}</p> : null}
        </div>
      </div>

      <div className="col-span-4 md:col-span-6 lg:col-span-9">
        <div className="flex flex-wrap gap-2">
          {pub.tags.map((t) => (
            <span key={t} className="meta border rule px-2 py-1 text-graphite">
              {t}
            </span>
          ))}
        </div>

        <h3 id={`${panelId}-title`} className="heading mt-5 max-w-[24ch] text-[clamp(1.75rem,3.4vw,2.9rem)] leading-[1.05]">
          {pub.title}
        </h3>

        <AuthorList authors={pub.authors} className="mt-5 text-[0.98rem] text-graphite" />
        <p className="mt-2 text-sm italic text-graphite">
          {pub.venue}. {pub.publisher}
          {pub.location ? `, ${pub.location}` : ""}, {pub.month ? `${pub.month} ` : ""}
          {pub.year}.
        </p>

        <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-relaxed">{pub.summary}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.95rem]">
          {pub.links.paper ? <ArrowLink href={pub.links.paper}>ACL Anthology</ArrowLink> : null}
          {pub.links.pdf ? <ArrowLink href={pub.links.pdf}>PDF</ArrowLink> : null}
          {pub.links.code ? <ArrowLink href={pub.links.code}>Code</ArrowLink> : null}
          <ArrowLink href={`/research/${pub.slug}`}>Paper notes</ArrowLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="meta ml-auto inline-flex items-center gap-2 border-b border-ink pb-1 transition-colors hover:text-vermilion"
          >
            <Plus aria-hidden className={`size-3.5 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
            {open ? "Hide details" : "Contributions & results"}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="grid gap-10 pt-10 lg:grid-cols-2">
                <div>
                  {pub.context ? (
                    <>
                      <p className="meta text-muted">Setting</p>
                      <p className="mt-3 text-[0.97rem] leading-relaxed text-graphite">{pub.context}</p>
                    </>
                  ) : null}
                  <p className="meta mt-8 text-muted">Contributions</p>
                  <ol className="mt-3 space-y-3">
                    {pub.contributions.map((c, i) => (
                      <li key={i} className="grid grid-cols-[1.75rem_1fr] text-[0.97rem] leading-relaxed">
                        <span className="meta pt-1 text-vermilion">{String(i + 1).padStart(2, "0")}</span>
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
      </div>
    </article>
  );
}
