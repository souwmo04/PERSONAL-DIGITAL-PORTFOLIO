"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NeuralSphere } from "@/components/hero/NeuralSphere";
import { BlurChars, RotatingWords } from "@/components/motion/Text";
import { useIntroDone } from "@/components/motion/Intro";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { LocalTime } from "@/components/ui/LocalTime";
import { cvHref, site } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax: the sphere sinks and fades, the copy drifts up as you scroll away.
  const sphereY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  // On phones the intro card sits below the fold, so the copy must not fade out.
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const fadeIn = (d: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 1.1, delay: d, ease: EASE },
  });

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 size-[34rem] rounded-full bg-violet-deep/25 blur-[140px]" />
        <div className="absolute -right-48 top-1/3 size-[30rem] rounded-full bg-violet/20 blur-[150px]" />
        <div className="absolute bottom-[-12rem] left-1/3 size-[26rem] rounded-full bg-aqua/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-void)_85%)]" />
      </div>

      {/* Sphere */}
      <motion.div
        style={{ y: sphereY, scale: sphereScale, opacity: fade }}
        className="absolute inset-x-0 top-[17rem] mx-auto aspect-square w-[min(96vw,44rem)] md:top-[8%]"
      >
        <motion.div
          className="size-full"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 2, delay: 0.1, ease: EASE }}
        >
          <NeuralSphere className="size-full" />
        </motion.div>
      </motion.div>

      <motion.div style={desktop ? { y: copyY, opacity: fade } : undefined} className="container-page relative flex min-h-[100svh] flex-col pb-10 pt-28 md:pt-32">
        {/* Top-left: greeting + name */}
        <div>
          <motion.p {...fadeIn(0.1)} className="font-display text-lg text-iris md:text-xl">
            Hello! I&rsquo;m
          </motion.p>
          <h1 id="hero-title" className="heading-xl mt-2 text-[clamp(3rem,9vw,7.5rem)]">
            <BlurChars text="Fahim" play={ready} delay={0.2} className="block" />
            <BlurChars text="Foysal" play={ready} delay={0.42} className="block text-gradient" />
          </h1>
        </div>

        {/* Mobile: leave room for the sphere under the name */}
        <div aria-hidden className="h-[88vw] shrink-0 md:hidden" />

        {/* Right column: intro + CTAs (desktop) */}
        <motion.div
          {...fadeIn(0.9)}
          className="order-last mt-10 max-w-sm rounded-3xl border border-line bg-void/45 p-6 backdrop-blur-md md:absolute md:right-[var(--gutter)] md:top-[36%] md:order-none md:mt-0"
        >
          <StatusIndicator />
          <p className="mt-5 text-[0.98rem] leading-relaxed text-dim">{site.intro.split(". ").slice(0, 2).join(". ")}.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <MagneticButton href="#work">
              View selected work <ArrowDown aria-hidden className="size-4" />
            </MagneticButton>
            <MagneticButton href={cvHref} variant="ghost">
              Download CV <ArrowUpRight aria-hidden className="size-4" />
            </MagneticButton>
          </div>
        </motion.div>

        {/* Bottom: rotating role + meta */}
        <div className="flex flex-col gap-8 md:mt-auto md:flex-row md:items-end md:justify-between">
          <motion.div {...fadeIn(0.7)}>
            <p className="font-display text-lg text-iris">Exploring intelligence. Building meaningful technology.</p>
            <p className="heading-xl mt-1 text-[clamp(1.9rem,4.6vw,4rem)]">
              <RotatingWords words={site.roles} />
            </p>
          </motion.div>
          <motion.dl {...fadeIn(1)} className="grid grid-cols-2 gap-x-10 gap-y-1 text-sm md:text-right">
            <dt className="eyebrow text-faint">Based in</dt>
            <dt className="eyebrow text-faint">Local time</dt>
            <dd className="text-dim">{site.location}</dd>
            <dd className="text-dim">
              <LocalTime />
            </dd>
          </motion.dl>
        </div>

      </motion.div>
    </section>
  );
}
