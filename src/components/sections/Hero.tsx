import { ArrowDown } from "lucide-react";
import { AttentionField } from "@/components/hero/AttentionField";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { LocalTime } from "@/components/ui/LocalTime";
import { contactLinks, cvHref, site } from "@/content/site";

export function Hero() {
  const socials = contactLinks.filter((l) => l.label !== "Email");
  return (
    <section aria-labelledby="hero-title" className="relative pt-24 md:pt-28">
      <div className="container-page">
        {/* Top meta strip */}
        <Reveal y={0} className="grid-page meta border-b rule pb-4 text-muted">
          <p className="col-span-2 md:col-span-2 lg:col-span-3">Index — 2026</p>
          <p className="hidden md:col-span-3 md:block lg:col-span-5">{site.roles.join(" · ")}</p>
          <p className="col-span-2 text-right md:col-span-3 lg:col-span-4">
            {site.location} · <LocalTime />
          </p>
        </Reveal>

        <div className="grid-page gap-y-14 pt-12 md:pt-16 lg:pt-20">
          {/* Left — typographic introduction */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <h1 id="hero-title" className="display text-[clamp(3.4rem,10.5vw,9.75rem)]">
              <LineReveal animateOnMount delay={0.1} lines={["Hello,", <>I&rsquo;m <em className="italic">Fahim.</em></>]} />
            </h1>

            <p className="heading mt-8 max-w-[22ch] text-[clamp(1.6rem,3.3vw,2.75rem)] leading-[1.08] text-graphite">
              <LineReveal
                animateOnMount
                delay={0.35}
                lines={[
                  <>Exploring <em className="italic text-ink">intelligence.</em></>,
                  <>Building meaningful technology.</>,
                ]}
              />
            </p>

            <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,15.5rem)] md:gap-12">
              <Reveal delay={0.55}>
                <p className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-graphite">{site.intro}</p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <MagneticButton href="#work">
                    View selected work <ArrowDown aria-hidden className="size-3.5" />
                  </MagneticButton>
                  <MagneticButton href={cvHref} variant="ghost">
                    Download CV
                  </MagneticButton>
                </div>
              </Reveal>

              <Reveal delay={0.7} as="div" className="space-y-6 border-t rule pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <StatusIndicator />
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="meta text-muted">Currently</dt>
                    <dd className="mt-1">{site.status.detail}</dd>
                  </div>
                  <div>
                    <dt className="meta text-muted">Write to</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${site.email}`} className="link-under [overflow-wrap:anywhere]">
                        {site.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="meta text-muted">Find me</dt>
                    <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                      {socials.map((s) => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw">
                          {s.label}
                        </a>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>

          {/* Right — Fig. 1 */}
          <Reveal
            delay={0.4}
            y={0}
            as="figure"
            className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-8"
          >
            <div className="border rule bg-paper-2/40 p-4 sm:p-6">
              <AttentionField />
            </div>
            <figcaption className="mt-3 flex items-start justify-between gap-6 text-sm text-graphite">
              <span>
                <span className="meta mr-2 text-ink">Fig. 1</span>
                Attention across three kinds of tokens: words, image patches and interface elements.
                Move your cursor to place the query.
              </span>
            </figcaption>
          </Reveal>
        </div>

        <div className="mt-16 flex items-center justify-between border-b rule pb-4 md:mt-24">
          <a href="#about" className="meta group inline-flex items-center gap-2 text-muted hover:text-ink">
            <ArrowDown aria-hidden className="size-3.5 transition-transform group-hover:translate-y-0.5" />
            Scroll
          </a>
          <p className="meta text-muted">§ 00 — Introduction</p>
        </div>
      </div>
    </section>
  );
}
