import Link from "next/link";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { CopyButton } from "@/components/ui/CopyButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { contactLinks, cvHref, site } from "@/content/site";

export function Contact() {
  const others = contactLinks.filter((l) => l.label !== "Email");
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40rem] bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.35),transparent_65%)]" />
      <div className="container-page flex flex-col items-center text-center">
        <Reveal blur={false}>
          <StatusIndicator />
        </Reveal>

        <h2 id="contact-title" className="heading-xl mt-8 text-[clamp(2.8rem,9vw,7.5rem)]">
          <LineReveal
            lines={[
              "Have an interesting problem?",
              <span key="b" className="text-gradient">
                Let&rsquo;s explore it together.
              </span>,
            ]}
          />
        </h2>

        <Reveal delay={0.2} className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-dim">
          Research collaborations, internships, or a hard problem in multimodal AI or accessibility. I read every message.
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-col items-center gap-4">
          <MagneticButton href={`mailto:${site.email}`}>
            <Mail aria-hidden className="size-4" /> {site.email}
          </MagneticButton>
          <CopyButton value={site.email} label="Copy address" />
        </Reveal>

        <Reveal delay={0.4} className="mt-16 w-full max-w-3xl">
          <ul className="grid gap-3 sm:grid-cols-2">
            {others.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl glass px-5 py-4 transition-colors hover:border-violet/40"
                >
                  <span className="font-medium">{l.label}</span>
                  <span className="flex items-center gap-2 text-sm text-dim group-hover:text-iris">
                    {l.display}
                    <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <Link
                href={cvHref}
                className="group flex items-center justify-between rounded-2xl glass px-5 py-4 transition-colors hover:border-violet/40"
              >
                <span className="font-medium">Curriculum vitae</span>
                <span className="flex items-center gap-2 text-sm text-dim group-hover:text-iris">
                  {site.cv.pdf ? "PDF" : "View & save"}
                  <FileText aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
