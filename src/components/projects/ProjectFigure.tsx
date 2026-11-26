import Image from "next/image";
import type { Project } from "@/content/types";
import { DashLensFigure } from "./figures/DashLensFigure";
import { MeditalkFigure } from "./figures/MeditalkFigure";
import { CoupleCareFigure } from "./figures/CoupleCareFigure";
import { SpectraFigure } from "./figures/SpectraFigure";

/** Picks the drawn figure for a project. */
export function ProjectFigure({ project, className = "" }: { project: Project; className?: string }) {
  switch (project.visual) {
    case "dashlens":
      return (
        <div className="-mx-3 overflow-x-auto px-3 sm:mx-0 sm:px-0" tabIndex={0} aria-label="DashLens figure, scrollable">
          <DashLensFigure className={`h-auto w-full min-w-[34rem] ${className}`} />
        </div>
      );
    case "meditalk":
      return <MeditalkFigure className={className} />;
    case "couplecare":
      return <CoupleCareFigure className={className} />;
    case "spectra":
      return <SpectraFigure className={className} />;
  }
}

/** Real screenshots, if any were added to the project's data. */
export function ProjectScreenshots({ project }: { project: Project }) {
  if (!project.screenshots?.length) return null;
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {project.screenshots.map((s, i) => (
        <figure key={s.src}>
          <Image
            src={s.src}
            alt={s.alt}
            width={s.width}
            height={s.height}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-auto w-full border rule"
          />
          <figcaption className="mt-2 text-sm text-graphite">
            <span className="meta mr-2 text-ink">Screen {i + 1}</span>
            {s.alt}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
