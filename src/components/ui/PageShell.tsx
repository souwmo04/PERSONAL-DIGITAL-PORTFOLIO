import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Shared frame for inner pages: back link, ambient glow, container. */
export function PageShell({ back, backLabel, children }: { back: string; backLabel: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden pb-28 pt-32 md:pt-40">
      <div aria-hidden className="no-print pointer-events-none absolute -left-40 -top-40 -z-10 size-[34rem] rounded-full bg-violet-deep/20 blur-[150px]" />
      <div aria-hidden className="no-print pointer-events-none absolute -right-40 top-60 -z-10 size-[28rem] rounded-full bg-violet/10 blur-[150px]" />
      <div className="container-page">
        <Link href={back} className="no-print group inline-flex items-center gap-2 text-sm text-dim hover:text-text">
          <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-1" />
          {backLabel}
        </Link>
        {children}
      </div>
    </div>
  );
}

export function OutLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm transition-colors hover:border-violet/50 hover:text-iris"
    >
      {children} <span aria-hidden>↗</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
