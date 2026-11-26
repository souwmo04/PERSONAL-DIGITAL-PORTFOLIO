import type { Project } from "@/content/types";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function ProjectLinks({
  project,
  showCase = true,
  className = "",
}: {
  project: Project;
  showCase?: boolean;
  className?: string;
}) {
  const { github, paper, demo } = project.links;
  return (
    <p className={`flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem] ${className}`}>
      {showCase ? <ArrowLink href={`/work/${project.slug}`}>Read the case study</ArrowLink> : null}
      {github ? <ArrowLink href={github}>GitHub</ArrowLink> : null}
      {paper ? <ArrowLink href={paper}>Paper</ArrowLink> : null}
      {demo ? <ArrowLink href={demo}>Live demo</ArrowLink> : null}
    </p>
  );
}
