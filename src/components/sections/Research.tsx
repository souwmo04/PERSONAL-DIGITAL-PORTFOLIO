import { Reveal } from "@/components/motion/Reveal";
import { PublicationEntry } from "@/components/research/PublicationEntry";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { manuscripts, publications, researchInterests } from "@/content/publications";
import { site } from "@/content/site";
import { ArrowUpRight } from "lucide-react";

export function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="section-y relative">
      <div className="container-page">
        <SectionTitle
          id="research-title"
          eyebrow="Research & publications"
          title="Research"
          accent="papers"
          lead="Published work, with author order, venue and numbers copied from the official record."
        />

        <div className="mt-16 space-y-8">
          {publications.map((p, i) => (
            <Reveal key={p.slug}>
              <PublicationEntry pub={p} index={i + 1} />
            </Reveal>
          ))}
        </div>

        {manuscripts.length ? (
          <div className="mt-8">
            <Reveal>
              <h3 className="eyebrow text-faint">Manuscripts</h3>
            </Reveal>
            <ul className="mt-4 space-y-3">
              {manuscripts.map((m) => (
                <Reveal as="li" key={m.title}>
                  <div className="flex flex-col gap-3 rounded-2xl glass p-6 md:flex-row md:items-center md:justify-between md:gap-10">
                    <p className="font-display text-[1.1rem] font-semibold leading-snug">{m.title}</p>
                    <span className="chip shrink-0">{m.area}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold md:text-3xl">
              What I&rsquo;m <span className="text-gradient">curious about</span>
            </h3>
            <a
              href={site.social.acl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-dim hover:text-iris"
            >
              ACL Anthology profile
              <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {researchInterests.map((r, i) => (
              <Reveal as="li" key={r.name} delay={(i % 4) * 0.07}>
                <SpotlightCard className="h-full rounded-2xl p-5">
                  <p className="font-mono text-[0.7rem] text-violet">{String(i + 1).padStart(2, "0")}</p>
                  <p className="font-display mt-3 font-semibold leading-snug">{r.name}</p>
                  <p className="mt-1.5 text-sm text-dim">{r.note}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
