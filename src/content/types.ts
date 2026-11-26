/**
 * Shared content types. Every piece of portfolio content lives in /src/content
 * as plain typed data, so you can update it without touching components.
 */

export type LinkItem = {
  label: string;
  href: string;
  /** Short handle or value shown next to the label, e.g. "@souwmo04". */
  display?: string;
};

export type Publication = {
  slug: string;
  title: string;
  /** Authors in the published order. */
  authors: string[];
  venue: string;
  venueShort: string;
  year: number;
  month?: string;
  pages?: string;
  publisher?: string;
  location?: string;
  anthologyId?: string;
  doi?: string;
  /** Plain-language summary written for this site (not the verbatim abstract). */
  summary: string;
  /** Short context about the shared task / problem setting. */
  context?: string;
  contributions: string[];
  /** Reported results, copied from the paper. Never estimate these. */
  results?: { label: string; value: string; note?: string }[];
  tags: string[];
  links: {
    paper?: string;
    pdf?: string;
    code?: string;
    doi?: string;
  };
  bibtex: string;
};

export type ProjectVisual = "dashlens" | "meditalk" | "couplecare" | "spectra";

export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  kind: string;
  /** Used by the project filter tabs. */
  category: "Research" | "Applied AI";
  year?: string;
  areas: string[];
  problem: string;
  approach: string[];
  /** Ordered steps of the system, used for architecture figures. */
  pipeline?: { label: string; detail: string }[];
  features?: { title: string; detail: string }[];
  /** Honest status of evaluation; leave as a note until results are public. */
  evaluation?: string;
  contributions?: string[];
  stack: string[];
  visual: ProjectVisual;
  /** Optional screenshots placed in /public/projects/<slug>/. */
  screenshots?: { src: string; alt: string; width: number; height: number }[];
  links: {
    github?: string;
    paper?: string;
    demo?: string;
  };
};

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  detail: string;
  kind: "research" | "education";
};

export type Achievement = {
  year: string;
  rank: string;
  rankNote: string;
  event: string;
  scope: string;
  team?: string;
  detail?: string;
  href?: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  note: string;
  items: string[];
};
