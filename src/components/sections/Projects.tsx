"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectArt } from "@/components/projects/ProjectArt";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { MagneticButton } from "@/components/ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;
const FILTERS = ["All", "Research", "Applied AI", "Web & Mobile"] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [expanded, setExpanded] = useState(false);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  // "All" starts with the featured projects; a category shows everything in it.
  const shown = filter === "All" && !expanded ? filtered.filter((p) => p.featured) : filtered;
  const hiddenCount = filtered.length - shown.length;

  return (
    <section id="work" aria-labelledby="work-title" className="section-y relative">
      <div aria-hidden className="pointer-events-none absolute right-0 top-40 -z-10 size-[34rem] rounded-full bg-violet-deep/15 blur-[160px]" />
      <div className="container-page">
        <SectionTitle
          id="work-title"
          eyebrow="Built & shipped"
          title="Selected"
          accent="projects"
          lead="Research systems, applied AI, and web and mobile products, from the question to something that runs."
        />

        <div role="group" aria-label="Filter projects" className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-5 py-2.5 text-sm transition-colors ${active ? "text-void" : "text-dim hover:text-text"}`}
              >
                {active ? (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet to-iris shadow-[0_0_30px_-4px_rgba(167,139,250,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full border border-line" />
                )}
                <span className="relative flex items-center gap-2 font-medium">
                  {f}
                  <span className={`rounded-full px-1.5 text-[0.7rem] ${active ? "bg-void/20" : "bg-white/5"}`}>{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="mt-12 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)", transition: { duration: 0.35 } }}
                transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: EASE }}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] glass transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-violet/35">
                  <ProjectArt visual={p.visual} className="aspect-[16/10] border-b border-line" />
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between gap-4">
                      <span className="pill !text-[0.625rem]">{p.kind}</span>
                      <span className="font-mono text-xs text-faint">{p.index}</span>
                    </div>
                    <h3 className="font-display mt-5 text-2xl font-semibold">
                      <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[0.97rem] leading-relaxed text-dim">{p.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology stack">
                      {p.stack.slice(0, 5).map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                    <div className="relative z-10 mt-auto flex items-center gap-4 pt-7 text-sm">
                      <span className="inline-flex items-center gap-1.5 text-iris">
                        Case study
                        <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                      {p.links.github ? (
                        <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-dim hover:text-text">
                          <GithubIcon className="size-4" aria-hidden /> GitHub
                        </a>
                      ) : null}
                      {p.links.demo ? (
                        <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="text-dim hover:text-text">
                          {p.links.demoLabel ?? "Live demo"}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <div className="mt-12 flex flex-col items-center gap-5">
          {hiddenCount > 0 ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-dim transition-colors hover:border-violet/50 hover:text-text"
            >
              Show all projects ({filtered.length})
              <ChevronDown aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          ) : null}
          <MagneticButton href={site.social.github}>
            <GithubIcon className="size-4" aria-hidden /> Visit my GitHub
            <ArrowUpRight aria-hidden className="size-4" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
