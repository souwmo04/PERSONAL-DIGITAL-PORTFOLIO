import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { ProjectFigure, ProjectScreenshots } from "@/components/projects/ProjectFigure";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { Reveal } from "@/components/motion/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title}, case study`,
    description: `${p.description} ${p.tagline}`,
    alternates: { canonical: `/work/${p.slug}` },
  };
}

function Block({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" aria-labelledby={id} className="grid-page gap-y-4 border-t rule pt-6">
      <h2 id={id} className="meta col-span-4 text-muted md:col-span-2 lg:col-span-3">
        {label}
      </h2>
      <div className="col-span-4 md:col-span-6 lg:col-span-8">{children}</div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const dark = p.visual === "spectra";

  return (
    <article className="pb-24 pt-28 md:pt-36">
      <div className="container-page">
        <Link href="/#work" className="meta group inline-flex items-center gap-2 text-muted hover:text-ink">
          <ArrowLeft aria-hidden className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Selected work
        </Link>

        <header className="grid-page mt-10 gap-y-8 border-t border-ink pt-6">
          <div className="meta col-span-4 space-y-1 text-muted md:col-span-2 lg:col-span-3">
            <p className="text-vermilion">Project {p.index}</p>
            <p>{p.kind}</p>
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-9">
            <h1 className="display text-[clamp(3.5rem,11vw,9rem)]">{p.title}</h1>
            <p className="heading mt-6 max-w-[28ch] text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.12] italic text-graphite">
              {p.tagline}
            </p>
            <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-relaxed">{p.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Research areas">
              {p.areas.map((a) => (
                <li key={a} className="meta border rule px-2 py-1 text-graphite">
                  {a}
                </li>
              ))}
            </ul>
            <ProjectLinks project={p} showCase={false} className="mt-8" />
          </div>
        </header>

        <Reveal as="figure" className={`mt-16 md:mt-24 ${dark ? "bg-ink p-6 text-paper sm:p-10" : "border rule bg-paper-2/50 p-4 sm:p-10"}`}>
          <ProjectFigure project={p} />
          <figcaption className={`mt-6 text-sm ${dark ? "text-fog" : "text-graphite"}`}>
            <span className={`meta mr-2 ${dark ? "text-paper" : "text-ink"}`}>Fig. 1</span>
            Illustrative figure drawn for this page. It is not a product screenshot.
          </figcaption>
        </Reveal>

        <div className="mt-20 space-y-16 md:mt-28">
          <Block id="problem" label="Problem">
            <p className="heading text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug">{p.problem}</p>
          </Block>

          <Block id="approach" label="Technical approach">
            <ol className="space-y-4">
              {p.approach.map((a, n) => (
                <li key={n} className="grid grid-cols-[2rem_1fr] text-[1.0625rem] leading-relaxed">
                  <span className="meta pt-1.5 text-vermilion">{String(n + 1).padStart(2, "0")}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </Block>

          {p.pipeline ? (
            <Block id="architecture" label="Architecture">
              <ol className="grid border-t border-ink sm:grid-flow-col sm:auto-cols-fr">
                {p.pipeline.map((s, n) => (
                  <li key={s.label} className="relative border-b rule py-4 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
                    <span className="meta text-vermilion">{String(n + 1).padStart(2, "0")}</span>
                    <p className="heading mt-2 text-[1.3rem]">{s.label}</p>
                    <p className="mt-1 text-sm text-graphite">{s.detail}</p>
                  </li>
                ))}
              </ol>
            </Block>
          ) : null}

          {p.features ? (
            <Block id="features" label="Features">
              <dl className="grid gap-x-8 sm:grid-cols-2">
                {p.features.map((f) => (
                  <div key={f.title} className="border-t rule py-4 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                    <dt className="font-medium">{f.title}</dt>
                    <dd className="mt-1.5 text-[0.97rem] leading-relaxed text-graphite">{f.detail}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          ) : null}

          {p.contributions ? (
            <Block id="contributions" label="Contributions">
              <ul className="space-y-3">
                {p.contributions.map((c) => (
                  <li key={c} className="flex gap-3 text-[1.0625rem] leading-relaxed">
                    <span aria-hidden className="mt-[0.75em] h-px w-4 shrink-0 bg-vermilion" />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {p.evaluation ? (
            <Block id="evaluation" label="Experiments">
              <p className="text-[1.0625rem] leading-relaxed text-graphite">{p.evaluation}</p>
            </Block>
          ) : null}

          <Block id="stack" label="Technology stack">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {p.stack.map((s) => (
                <li key={s} className="heading text-[1.6rem]">
                  {s}
                </li>
              ))}
            </ul>
          </Block>

          {p.screenshots?.length ? (
            <Block id="screens" label="Screens">
              <ProjectScreenshots project={p} />
            </Block>
          ) : null}
        </div>

        <Link
          href={`/work/${next.slug}`}
          className="group mt-28 flex items-end justify-between gap-6 border-t border-ink pt-6"
        >
          <span>
            <span className="meta text-muted">Next project · {next.index}</span>
            <span className="display mt-3 block text-[clamp(2.5rem,7vw,5.5rem)] transition-colors group-hover:text-vermilion">
              {next.title}
            </span>
          </span>
          <ArrowRight aria-hidden className="mb-4 size-8 shrink-0 transition-transform group-hover:translate-x-2" strokeWidth={1.25} />
        </Link>
      </div>
    </article>
  );
}
