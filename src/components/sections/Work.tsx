import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectFigure } from "@/components/projects/ProjectFigure";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

function Meta({ project, tone = "light" }: { project: Project; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={`meta flex flex-wrap items-baseline gap-x-4 gap-y-1 ${dark ? "text-fog" : "text-muted"}`}>
      <span className={dark ? "text-signal" : "text-vermilion"}>Project {project.index}</span>
      <span>{project.kind}</span>
    </div>
  );
}

function Stack({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  return (
    <ul className={`meta flex flex-wrap gap-x-3 gap-y-1.5 ${tone === "dark" ? "text-fog" : "text-graphite"}`} aria-label="Technology stack">
      {items.map((s, i) => (
        <li key={s}>
          {s}
          {i < items.length - 1 ? <span aria-hidden className="ml-3 opacity-40">/</span> : null}
        </li>
      ))}
    </ul>
  );
}

/* A — DashLens: a full-bleed figure with a narrow text column and the pipeline as a numbered strip. */
function DashLensFeature({ p }: { p: Project }) {
  return (
    <article aria-labelledby={`${p.slug}-t`} className="grid-page gap-y-10">
      <Reveal className="col-span-4 md:col-span-8 lg:col-span-4">
        <Meta project={p} />
        <h3 id={`${p.slug}-t`} className="display mt-5 text-[clamp(3rem,7vw,6rem)]">{p.title}</h3>
        <p className="heading mt-4 text-[1.5rem] leading-snug italic text-graphite">{p.tagline}</p>
        <p className="mt-6 text-[1rem] leading-relaxed text-graphite">{p.problem}</p>
        <div className="mt-6"><Stack items={p.stack} /></div>
        <ProjectLinks project={p} className="mt-8" />
      </Reveal>
      <Reveal as="figure" delay={0.1} className="col-span-4 md:col-span-8 lg:col-span-8">
        <div className="border rule bg-paper-2/60 p-3 sm:p-6">
          <ProjectFigure project={p} />
        </div>
        <figcaption className="mt-3 text-sm text-graphite">
          <span className="meta mr-2 text-ink">Fig. 2</span>
          A question about a dashboard is answered by looking, acting, then looking again.
        </figcaption>
      </Reveal>
      {p.pipeline ? (
        <ol className="col-span-4 grid grid-cols-1 border-t border-ink sm:grid-cols-5 md:col-span-8 lg:col-span-12">
          {p.pipeline.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.06} className="border-b rule py-4 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
              <span className="meta text-vermilion">{String(i + 1).padStart(2, "0")}</span>
              <p className="heading mt-2 text-[1.35rem]">{s.label}</p>
              <p className="mt-1 text-sm text-graphite">{s.detail}</p>
            </Reveal>
          ))}
        </ol>
      ) : null}
    </article>
  );
}

/* B — Meditalk: a features ledger on the left, the device on the right. */
function MeditalkFeature({ p }: { p: Project }) {
  return (
    <article aria-labelledby={`${p.slug}-t`} className="grid-page items-center gap-y-12">
      <Reveal className="col-span-4 md:col-span-8 lg:col-span-6">
        <Meta project={p} />
        <h3 id={`${p.slug}-t`} className="display mt-5 text-[clamp(3rem,7vw,6rem)]">{p.title}</h3>
        <p className="heading mt-4 max-w-[26ch] text-[1.5rem] leading-snug italic text-graphite">{p.tagline}</p>
        <dl className="mt-10 grid gap-x-8 sm:grid-cols-2">
          {p.features?.map((f, i) => (
            <div key={f.title} className="border-t rule py-4">
              <dt className="flex items-baseline gap-2 font-medium">
                <span className="meta text-vermilion">{String(i + 1).padStart(2, "0")}</span>
                {f.title}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-graphite">{f.detail}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6"><Stack items={p.stack} /></div>
        <ProjectLinks project={p} className="mt-8" />
      </Reveal>
      <Reveal as="figure" delay={0.1} className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-8">
        <div className="bg-paper-2/70 px-4 py-10 sm:px-10">
          <ProjectFigure project={p} />
        </div>
        <figcaption className="mt-3 text-sm text-graphite">
          <span className="meta mr-2 text-ink">Fig. 3</span>
          Talk, show a document, get a plain-language explanation.
        </figcaption>
      </Reveal>
    </article>
  );
}

/* C — CoupleCare: a typographic statement, then the bilingual retrieval figure across the width. */
function CoupleCareFeature({ p }: { p: Project }) {
  return (
    <article aria-labelledby={`${p.slug}-t`} className="grid-page gap-y-12">
      <Reveal className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-4">
        <Meta project={p} />
        <h3 id={`${p.slug}-t`} className="display mt-5 text-[clamp(3rem,7vw,6rem)]">
          {p.title}
        </h3>
        <p className="heading mt-6 max-w-[30ch] text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.15]">
          {p.tagline}
        </p>
      </Reveal>
      <Reveal as="figure" delay={0.1} className="col-span-4 border-y border-ink py-10 md:col-span-8 lg:col-span-12">
        <ProjectFigure project={p} />
        <figcaption className="mt-8 text-sm text-graphite">
          <span className="meta mr-2 text-ink">Fig. 4</span>
          A mixed Bangla–English question, the passages retrieved for it, and a grounded reply from a local model. Illustrative.
        </figcaption>
      </Reveal>
      <Reveal className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-4">
        <p className="meta text-muted">Problem</p>
        <p className="mt-3 text-[1rem] leading-relaxed text-graphite">{p.problem}</p>
      </Reveal>
      <Reveal delay={0.08} className="col-span-4 md:col-span-4 lg:col-span-4">
        <p className="meta text-muted">Stack</p>
        <div className="mt-3"><Stack items={p.stack} /></div>
        <ProjectLinks project={p} className="mt-8" />
      </Reveal>
    </article>
  );
}

/* D — SpectraLUSC: an inverted, lab-dark plate. */
function SpectraFeature({ p }: { p: Project }) {
  return (
    <article aria-labelledby={`${p.slug}-t`} className="bg-ink px-5 py-12 text-paper sm:px-10 md:py-16 lg:px-14">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <Reveal>
          <Meta project={p} tone="dark" />
          <h3 id={`${p.slug}-t`} className="display mt-5 text-[clamp(3rem,7vw,6rem)]">
            Spectra<span className="italic text-signal">LUSC</span>
          </h3>
          <p className="heading mt-4 text-[1.5rem] leading-snug italic text-fog">{p.tagline}</p>
          <p className="mt-6 text-[1rem] leading-relaxed text-fog">{p.problem}</p>
          <div className="mt-6"><Stack items={p.stack} tone="dark" /></div>
          <div className="mt-8 [&_a]:text-paper">
            <ProjectLinks project={p} />
          </div>
        </Reveal>
        <Reveal as="figure" delay={0.1}>
          <ProjectFigure project={p} />
          <figcaption className="mt-4 text-sm text-fog">
            <span className="meta mr-2 text-paper">Fig. 5</span>
            Tile-level predictions, and where a model looks on one tile. Synthetic imagery.
          </figcaption>
        </Reveal>
      </div>
    </article>
  );
}

export function Work() {
  const [dash, medi, couple, spectra] = projects;
  return (
    <section id="work" aria-labelledby="work-title" className="section-y">
      <div className="container-page">
        <SectionHeader
          n="03"
          label="Selected work"
          id="work-title"
          title={["Four problems,", <em key="e" className="italic">four shapes.</em>]}
          note="Each project is shown in the form that explains it best: a figure, a conversation, a sentence, a plate. Every case study goes deeper into the problem, the approach and the stack."
        />
        <div className="mt-20 space-y-28 md:mt-28 md:space-y-40">
          <DashLensFeature p={dash} />
          <MeditalkFeature p={medi} />
          <CoupleCareFeature p={couple} />
          <SpectraFeature p={spectra} />
        </div>
      </div>
    </section>
  );
}
