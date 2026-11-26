import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { CopyButton } from "@/components/ui/CopyButton";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { contactLinks, cvHref, site } from "@/content/site";

export function Contact() {
  const others = contactLinks.filter((l) => l.label !== "Email");
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ink pb-20 pt-[var(--section-y)] text-paper">
      <div className="container-page">
        <header className="grid-page border-t border-white/15 pt-5">
          <div className="col-span-4 mb-10 flex items-baseline gap-3 md:col-span-2 lg:col-span-3">
            <span className="meta text-signal">§ 06</span>
            <span className="meta text-fog">Contact</span>
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-9">
            <StatusIndicator tone="dark" />
          </div>
        </header>

        <h2 id="contact-title" className="display mt-12 text-[clamp(3.25rem,10vw,9.5rem)] md:mt-20">
          <LineReveal
            lines={[
              "Have an interesting",
              <>problem? <em className="italic text-signal">Let&rsquo;s</em></>,
              <em key="x" className="italic">explore it together.</em>,
            ]}
          />
        </h2>

        <div className="grid-page mt-16 gap-y-12 md:mt-24">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-7">
            <p className="meta text-fog">Write to</p>
            <a
              href={`mailto:${site.email}`}
              className="heading group mt-3 inline-flex max-w-full items-center gap-3 break-all text-[clamp(1.5rem,4vw,3.25rem)] leading-tight"
            >
              <span className="link-draw">{site.email}</span>
              <ArrowUpRight aria-hidden className="size-[0.8em] shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.25} />
            </a>
            <div className="mt-4 text-fog">
              <CopyButton value={site.email} label="Copy address" />
            </div>
            <p className="mt-10 max-w-[30rem] text-[1rem] leading-relaxed text-fog">
              Research collaborations, internships, or a hard problem in multimodal AI or accessibility.
              I read every message.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
            <p className="meta text-fog">Elsewhere</p>
            <ul className="mt-3 border-t border-white/15">
              {others.map((l) => (
                <li key={l.label} className="border-b border-white/15">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4"
                  >
                    <span className="text-[1.0625rem]">{l.label}</span>
                    <span className="meta flex items-center gap-2 text-fog transition-colors group-hover:text-signal">
                      {l.display}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-b border-white/15">
                <Link href={cvHref} className="group flex items-center justify-between py-4">
                  <span className="text-[1.0625rem]">Curriculum vitae</span>
                  <span className="meta flex items-center gap-2 text-fog transition-colors group-hover:text-signal">
                    {site.cv.pdf ? "PDF" : "View & save"}
                    <FileText aria-hidden className="size-3.5" />
                  </span>
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
