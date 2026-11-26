import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { contactLinks, cvHref, navItems, site } from "@/content/site";
import { LocalTime } from "@/components/ui/LocalTime";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="bg-ink text-paper">
      <div className="container-page">
        <div className="grid-page gap-y-12 border-t border-white/15 py-14">
          <div className="col-span-4 md:col-span-3 lg:col-span-4">
            <p className="heading text-[2rem] italic">Fahim Foysal</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fog">
              AI researcher and software engineer. Vision, language and the interfaces between them.
            </p>
          </div>

          <nav aria-label="Footer" className="col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-6">
            <p className="meta mb-4 text-fog">Index</p>
            <ul className="space-y-2 text-sm">
              {navItems.map((n) => (
                <li key={n.id}>
                  <Link href={`/#${n.id}`} className="link-draw">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <p className="meta mb-4 text-fog">Elsewhere</p>
            <ul className="space-y-2 text-sm">
              {contactLinks
                .filter((l) => l.label !== "Email")
                .map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-draw">
                      {l.label}
                    </a>
                  </li>
                ))}
              <li>
                <Link href={cvHref} className="link-draw">
                  Curriculum vitae
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-3 lg:col-start-10">
            <p className="meta mb-4 text-fog">Colophon</p>
            <p className="text-sm leading-relaxed text-fog">
              Set in Newsreader, Geist and JetBrains Mono. Designed and built from scratch with Next.js and Motion.
            </p>
          </div>
        </div>

        <div className="meta flex flex-col gap-4 border-t border-white/15 py-6 text-fog sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>
            {site.location} · <LocalTime />
          </p>
          <a href="#top" className="group inline-flex items-center gap-2 text-paper">
            Back to top
            <ArrowUp aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
