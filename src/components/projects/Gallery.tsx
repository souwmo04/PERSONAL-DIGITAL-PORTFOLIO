"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Shot } from "@/content/types";

const EASE = [0.16, 1, 0.3, 1] as const;

function Frame({ shot, priority = false, sizes }: { shot: Shot; priority?: boolean; sizes: string }) {
  const figure = shot.kind === "figure";
  const mobile = shot.kind === "mobile";
  return (
    <div
      className={`relative overflow-hidden ${
        mobile
          ? "mx-auto w-full max-w-[15rem] rounded-[2rem] border-[6px] border-white/10 bg-black shadow-2xl"
          : figure
            ? "rounded-2xl bg-white p-2 sm:p-4"
            : "rounded-2xl border border-line bg-night"
      }`}
    >
      {!mobile && !figure ? (
        <div aria-hidden className="flex items-center gap-1.5 border-b border-line bg-white/[0.03] px-3 py-2">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </div>
      ) : null}
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
      />
    </div>
  );
}

/**
 * Screenshot gallery: first shot large, the rest in a grid; phone shots in a
 * device frame, charts on a light panel. Any image opens a full-screen viewer
 * (arrow keys to move, Esc to close, focus returned on close).
 */
export function Gallery({ shots, title }: { shots: Shot[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  // The portal mounts on first open (an event, so no hydration mismatch) and stays for exit animations.
  const [portalReady, setPortalReady] = useState(false);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + shots.length) % shots.length)), [shots.length]);

  useEffect(() => {
    if (open === null) return;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const [first, ...rest] = shots;
  const mobiles = rest.filter((s) => s.kind === "mobile");
  const others = rest.filter((s) => s.kind !== "mobile");

  const renderTrigger = (shot: Shot, sizes: string, priority = false) => (
    <figure key={shot.src}>
      <button
        type="button"
        onClick={(e) => {
          lastTrigger.current = e.currentTarget;
          setPortalReady(true);
          setOpen(shots.indexOf(shot));
        }}
        className="group relative block w-full text-left"
        aria-label={`Open image: ${shot.caption ?? shot.alt}`}
        data-cursor
      >
        <Frame shot={shot} priority={priority} sizes={sizes} />
        <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-void/70 text-text opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand aria-hidden className="size-4" />
        </span>
      </button>
      {shot.caption ? <figcaption className="mt-3 text-sm text-dim">{shot.caption}</figcaption> : null}
    </figure>
  );

  return (
    <div>
      {renderTrigger(first, "(min-width: 1024px) 64rem, 100vw", true)}

      {others.length ? (
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {others.map((s) => (
            renderTrigger(s, "(min-width: 640px) 50vw, 100vw")
          ))}
        </div>
      ) : null}

      {mobiles.length ? (
        <div className="mt-10 grid grid-cols-2 gap-6 sm:flex sm:justify-center sm:gap-10">
          {mobiles.map((s) => (
            <div key={s.src} className="sm:w-60">
              {renderTrigger(s, "15rem")}
            </div>
          ))}
        </div>
      ) : null}

      {/* Portal: ancestors animate transform/filter, which would trap position: fixed. */}
      {portalReady
        ? createPortal(
      <AnimatePresence>
        {open !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshots`}
            className="fixed inset-0 z-[120] flex flex-col bg-void/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          >
            <div className="flex items-center justify-between px-[var(--gutter)] py-4" onClick={(e) => e.stopPropagation()}>
              <p className="text-sm text-dim">
                <span className="text-text">{shots[open].caption ?? title}</span>
                <span className="ml-3 font-mono text-xs">
                  {open + 1} / {shots.length}
                </span>
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="grid size-11 place-items-center rounded-full border border-line hover:border-violet/50"
                aria-label="Close"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-10 sm:px-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={shots[open].src}
                  initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={`relative max-h-full ${shots[open].kind === "mobile" ? "w-auto" : "w-full max-w-6xl"}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={shots[open].src}
                    alt={shots[open].alt}
                    width={shots[open].width}
                    height={shots[open].height}
                    sizes="100vw"
                    className={`mx-auto h-auto max-h-[78vh] w-auto rounded-xl object-contain ${
                      shots[open].kind === "figure" ? "bg-white p-3" : ""
                    }`}
                  />
                </motion.div>
              </AnimatePresence>

              {shots.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(-1);
                    }}
                    className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-void/60 hover:border-violet/50 sm:left-6"
                    aria-label="Previous image"
                  >
                    <ChevronLeft aria-hidden className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(1);
                    }}
                    className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-void/60 hover:border-violet/50 sm:right-6"
                    aria-label="Next image"
                  >
                    <ChevronRight aria-hidden className="size-5" />
                  </button>
                </>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}
