import Link from "next/link";
import { ArrowUpRight, ArrowRight, ArrowDown } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  direction?: "out" | "right" | "down";
  download?: boolean;
};

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);

/** Text link with an arrow glyph and a drawn underline. */
export function ArrowLink({ href, children, className = "", direction, download }: Props) {
  const external = isExternal(href);
  const dir = direction ?? (external ? "out" : "right");
  const Icon = dir === "out" ? ArrowUpRight : dir === "down" ? ArrowDown : ArrowRight;
  const inner = (
    <>
      <span className="link-draw pb-0.5">{children}</span>
      <Icon
        aria-hidden
        className="size-[1em] shrink-0 transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={1.5}
      />
      {external && !href.startsWith("mailto:") ? <span className="sr-only">(opens in a new tab)</span> : null}
    </>
  );
  const cls = `group inline-flex items-center gap-1.5 ${className}`;

  if (external || download) {
    return (
      <a
        href={href}
        className={cls}
        {...(external && !href.startsWith("mailto:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
