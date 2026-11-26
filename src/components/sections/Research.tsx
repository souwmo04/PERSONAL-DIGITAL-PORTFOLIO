import { Reveal } from "@/components/motion/Reveal";
import { PublicationEntry } from "@/components/research/PublicationEntry";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { publications, researchInterests } from "@/content/publications";
import { site } from "@/content/site";

export function Research() {
  return (
    <section id="research" aria-labelledby="research-title" className="section-y bg-paper-2/45">
      <div className="container-page">
        <SectionHeader
          n="02"
          label="Research"
          id="research-title"
          title={["Questions,", <em key="e" className="italic">carefully</em>, "answered."]}
          note="Research I've contributed to, typeset the way it was published. Author order, venues and numbers are copied from the official record."
        />

        <div className="mt-16 md:mt-24">
          <div className="grid-page mb-6">
            <p className="meta col-span-4 text-muted md:col-span-8 lg:col-span-9 lg:col-start-4">
              Publications — {publications.length}
            </p>
          </div>
          <div className="space-y-16">
            {publications.map((p, i) => (
              <Reveal key={p.slug}>
                <PublicationEntry pub={p} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Index of interests */}
        <div className="grid-page mt-24 gap-y-8 md:mt-32">
          <div className="col-span-4 md:col-span-2 lg:col-span-3">
            <p className="meta text-muted">Index of interests</p>
            <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-graphite">
              The themes my reading, experiments and side projects keep coming back to.
            </p>
          </div>
          <ol className="col-span-4 grid gap-x-12 md:col-span-6 md:grid-cols-2 lg:col-span-9">
            {researchInterests.map((r, i) => (
              <Reveal
                as="li"
                key={r.name}
                delay={(i % 2) * 0.05}
                className="group flex items-baseline gap-3 border-b rule py-4"
              >
                <span className="meta w-6 shrink-0 text-muted group-hover:text-vermilion">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="heading text-[1.35rem] leading-tight">{r.name}</span>
                <span aria-hidden className="mx-1 hidden flex-1 translate-y-[-0.2em] border-b border-dotted border-fog sm:block" />
                <span className="hidden text-right text-sm text-muted sm:block">{r.note}</span>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="grid-page mt-12">
          <p className="col-span-4 flex flex-wrap gap-x-8 gap-y-2 text-[0.95rem] md:col-span-6 lg:col-span-9 lg:col-start-4">
            <ArrowLink href={site.social.acl}>ACL Anthology profile</ArrowLink>
            {site.social.scholar ? <ArrowLink href={site.social.scholar}>Google Scholar</ArrowLink> : null}
            {site.social.openreview ? <ArrowLink href={site.social.openreview}>OpenReview</ArrowLink> : null}
          </p>
        </div>
      </div>
    </section>
  );
}
