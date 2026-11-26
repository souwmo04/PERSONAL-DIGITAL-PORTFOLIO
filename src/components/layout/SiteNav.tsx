"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { navItems, site } from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });

  // Track which section is in view (home only).
  useEffect(() => {
    if (!isHome) return;
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + Escape to close the mobile menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled || open ? "border-b border-rule bg-paper/90 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-ink"
          style={{ scaleX: progress }}
        />
        <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-baseline gap-3" aria-label={`${site.name}, home`}>
            <span className="heading text-[1.35rem] italic tracking-tight">F.F.</span>
            <span className="meta hidden text-muted transition-colors group-hover:text-ink sm:inline">
              {site.name}
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={href(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="group meta relative flex items-baseline gap-1.5 py-2 text-graphite transition-colors hover:text-ink aria-[current]:text-ink"
                  >
                    <span className={`transition-colors ${isActive ? "text-vermilion" : "text-muted"}`}>{item.n}</span>
                    <span>{item.label}</span>
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-px h-px origin-left bg-current transition-transform duration-300 ease-out-soft ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            ref={toggleRef}
            type="button"
            className="meta -mr-2 flex h-11 items-center gap-2 px-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden className="relative block h-2.5 w-5">
              <span
                className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-ink transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2"}`}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-paper pt-16 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <ul className="container-page flex flex-1 flex-col justify-center gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: EASE }}
                  className="border-b border-rule"
                >
                  <Link
                    href={href(item.id)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4"
                    autoFocus={i === 0}
                  >
                    <span className="meta text-vermilion">{item.n}</span>
                    <span className="heading text-[clamp(2.25rem,9vw,3.5rem)]">{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="container-page meta flex justify-between pb-8 text-muted">
              <span>{site.location}</span>
              <a href={`mailto:${site.email}`} className="link-under text-ink">
                Email
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
