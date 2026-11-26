import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navItems, site } from "@/content/site";
import { LocalTime } from "@/components/ui/LocalTime";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-page py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="heading-xl text-[clamp(2.5rem,8vw,6rem)] text-white/[0.07]" aria-hidden>
              Fahim Foysal
            </p>
            <p className="mt-2 text-sm text-dim">AI researcher &amp; software engineer · {site.location}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-dim">
              {navItems.map((n) => (
                <li key={n.id}>
                  <Link href={`/#${n.id}`} className="transition-colors hover:text-iris">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. Designed &amp; built from scratch.</p>
          <p>
            Dhaka · <LocalTime />
          </p>
          <a href="#top" className="group inline-flex items-center gap-2 text-dim hover:text-text">
            Back to top
            <ArrowUp aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
