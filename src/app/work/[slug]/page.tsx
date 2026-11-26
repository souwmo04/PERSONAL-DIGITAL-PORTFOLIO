import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { ProjectArt } from "@/components/projects/ProjectArt";
import { Reveal } from "@/components/motion/Reveal";
import { BlurChars } from "@/components/motion/Text";
import { OutLink, PageShell } from "@/components/ui/PageShell";

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
    <Reveal as="section" aria-labelledby={id} className="grid gap-4 border-t border-line pt-8 md:grid-cols-[12rem_1fr] md:gap-10">
      <h2 id={id} className="eyebrow pt-1 text-iris">
        {label}
      </h2>
      <div>{children}</div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <PageShell back="/#work" backLabel="All projects">
      <article>
        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill">{p.kind}</span>
            <span className="font-mono text-xs text-dim">Project {p.index}</span>
          </div>
          <h1 className="heading-xl mt-6 text-[clamp(3.25rem,10vw,8rem)]">
            <BlurChars text={p.title} className="text-gradient" />
          </h1>
          <Reveal delay={0.25}>
            <p className="font-display mt-6 max-w-3xl text-[clamp(1.3rem,2.6vw,2rem)] leading-snug text-text/90">{p.tagline}</p>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-dim">{p.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Research areas">
              {p.areas.map((a) => (
                <li key={a} className="chip">
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {p.links.github ? <OutLink href={p.links.github}>GitHub</OutLink> : null}
              {p.links.paper ? <OutLink href={p.links.paper}>Paper</OutLink> : null}
              {p.links.demo ? <OutLink href={p.links.demo}>Live demo</OutLink> : null}
            </div>
          </Reveal>
        </header>

        <Reveal className="group mt-16 overflow-hidden rounded-[2rem] border border-line">
          <ProjectArt visual={p.visual} className="aspect-[16/9] md:aspect-[21/9]" />
        </Reveal>

        <div className="mt-20 space-y-14">
          <Block id="problem" label="Problem">
            <p className="font-display text-[clamp(1.25rem,2.2vw,1.65rem)] leading-snug">{p.problem}</p>
          </Block>

          <Block id="approach" label="Technical approach">
            <ol className="space-y-3">
              {p.approach.map((a, n) => (
                <li key={n} className="flex gap-4 rounded-2xl glass p-5 text-[1.02rem] leading-relaxed">
                  <span className="font-mono text-sm text-violet">0{n + 1}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
          </Block>

          {p.pipeline ? (
            <Block id="architecture" label="Architecture">
              <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                {p.pipeline.map((s, n) => (
                  <li key={s.label} className="relative flex-1 rounded-2xl border border-violet/20 bg-violet/[0.06] p-4">
                    <span className="font-mono text-xs text-violet">0{n + 1}</span>
                    <p className="font-display mt-2 font-semibold">{s.label}</p>
                    <p className="mt-1 text-sm text-dim">{s.detail}</p>
                    {n < p.pipeline!.length - 1 ? (
                      <ArrowRight aria-hidden className="absolute -right-3 top-1/2 z-10 hidden size-4 -translate-y-1/2 text-iris sm:block" />
                    ) : null}
                  </li>
                ))}
              </ol>
            </Block>
          ) : null}

          {p.features ? (
            <Block id="features" label="Features">
              <dl className="grid gap-3 sm:grid-cols-2">
                {p.features.map((f) => (
                  <div key={f.title} className="rounded-2xl glass p-5">
                    <dt className="font-display font-semibold">{f.title}</dt>
                    <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-dim">{f.detail}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          ) : null}

          {p.contributions ? (
            <Block id="contributions" label="Contributions">
              <ul className="space-y-3">
                {p.contributions.map((c) => (
                  <li key={c} className="flex gap-3 text-[1.02rem] leading-relaxed">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-violet shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {p.evaluation ? (
            <Block id="evaluation" label="Experiments">
              <p className="text-[1.02rem] leading-relaxed text-dim">{p.evaluation}</p>
            </Block>
          ) : null}

          <Block id="stack" label="Technology stack">
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </Block>

          {p.screenshots?.length ? (
            <Block id="screens" label="Screens">
              <div className="grid gap-6 md:grid-cols-2">
                {p.screenshots.map((s) => (
                  <figure key={s.src}>
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={s.width}
                      height={s.height}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-auto w-full rounded-2xl border border-line"
                    />
                    <figcaption className="mt-2 text-sm text-dim">{s.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </Block>
          ) : null}
        </div>

        <Link
          href={`/work/${next.slug}`}
          className="group mt-28 flex items-center justify-between gap-6 overflow-hidden rounded-[2rem] glass p-8 transition-colors hover:border-violet/40 md:p-12"
        >
          <span>
            <span className="eyebrow text-faint">Next project</span>
            <span className="heading-xl mt-3 block text-[clamp(2.25rem,6vw,4.5rem)] transition-colors group-hover:text-iris">
              {next.title}
            </span>
          </span>
          <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:border-violet group-hover:bg-violet group-hover:text-void">
            <ArrowRight aria-hidden className="size-5 transition-transform duration-500 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </article>
    </PageShell>
  );
}
