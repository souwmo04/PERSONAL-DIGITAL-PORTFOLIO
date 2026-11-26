"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cvHref, navItems, site } from "@/content/site";
import { RollText } from "@/components/ui/RollText";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY, scrollYProgress } = useScroll();

  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 320 && !open);
  });

  useEffect(() => {
    if (!isHome) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className={`absolute inset-0 -z-10 transition-opacity duration-500 ${
            scrolled || open ? "opacity-100" : "opacity-0"
          } border-b border-line bg-void/70 backdrop-blur-xl`}
        />
        <nav aria-label="Primary" className="container-page flex h-[4.25rem] items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name}, home`}>
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-iris to-violet-deep text-[0.7rem] font-semibold text-void">
              FF
            </span>
            <RollText text="fahim.foysal" className="hidden font-display text-sm font-medium sm:inline-flex" />
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <Link
                    href={href(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative block px-3 py-2 text-[0.74rem] font-medium uppercase tracking-[0.14em] transition-colors ${
                      isActive ? "text-text" : "text-dim hover:text-text"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <RollText text={item.label} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href={cvHref}
              className="group hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors hover:border-violet/50 md:flex"
            >
              <RollText text="Resume" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="relative grid size-11 place-items-center rounded-full border border-line xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden className="relative block h-3 w-4">
                <span className={`absolute left-0 h-px w-full bg-text transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
                <span className={`absolute left-0 h-px w-full bg-text transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
              </span>
            </button>
          </div>
        </nav>
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-violet-deep via-violet to-aqua"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-void/95 pt-24 backdrop-blur-2xl xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 size-80 rounded-full bg-violet-deep/30 blur-[100px]" />
            <ul className="container-page flex flex-1 flex-col gap-2">
              {navItems.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, delay: 0.05 + i * 0.05, ease: EASE }}
                  >
                    <Link
                      href={href(item.id)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-2"
                      autoFocus={i === 0}
                    >
                      <span className="font-mono text-xs text-violet">{item.n}</span>
                      <span className="heading-xl text-[clamp(2.1rem,9vw,3.5rem)]">{item.label}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="container-page flex items-center justify-between pb-10 text-sm text-dim">
              <a href={`mailto:${site.email}`} className="hover:text-text">
                {site.email}
              </a>
              <Link href={cvHref} onClick={() => setOpen(false)} className="hover:text-text">
                Resume
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
