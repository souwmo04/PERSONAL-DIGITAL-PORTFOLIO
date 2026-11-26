import type { Project } from "./types";

/**
 * Selected projects.
 *
 * - Add screenshots by placing images in /public/projects/<slug>/ and listing
 *   them in `screenshots`. Until then, each project shows its own drawn figure.
 * - Links left empty are hidden, so nothing on the site breaks.
 * - `evaluation` stays a plain note until results are public. Do not put
 *   unpublished numbers here.
 */
export const projects: Project[] = [
  {
    slug: "dashlens",
    index: "A",
    title: "DashLens",
    tagline: "Asking a dashboard a question, and getting a real answer.",
    description:
      "An intelligent vision-language system for accessible, interactive dashboard question answering.",
    kind: "Research system",
    areas: [
      "Vision-Language Models",
      "Dashboard interaction",
      "Visual question answering",
      "GUI agents",
      "Accessibility",
    ],
    problem:
      "Dashboards are where organisations put their most important numbers. They are also one of the least accessible things on the web. A chart is a picture: a screen reader sees a canvas, and a person who can't see it, or can't read it quickly, is shut out. Interactive dashboards add filters, tabs and tooltips, so the answer often isn't on screen until someone clicks the right control.",
    approach: [
      "Treat the dashboard as a visual interface, not a data table: the system works from what is rendered on screen, the way a person does.",
      "Use a vision-language model to read charts, legends and labels, and ground each question in the region of the dashboard that answers it.",
      "Let the system act like a GUI agent when the answer is hidden: choose a filter, open a tab or hover a point, then look again.",
      "Return answers in plain language with a pointer to the evidence, so screen-reader users can check and follow up.",
    ],
    pipeline: [
      { label: "Observe", detail: "Dashboard screenshot + interface structure" },
      { label: "Ground", detail: "Locate charts, axes, legends, controls" },
      { label: "Reason", detail: "VLM answers or plans an interaction" },
      { label: "Act", detail: "Click, filter, hover, then re-observe" },
      { label: "Explain", detail: "Accessible answer with cited region" },
    ],
    evaluation:
      "This is ongoing research. Experimental results will be added here once the work is published.",
    contributions: [
      "Frames dashboard question answering as an accessibility problem, not only a chart-reading benchmark.",
      "Combines visual question answering with GUI-agent interaction, for answers that are only reachable through the interface.",
      "Produces answers that point back to their visual evidence.",
    ],
    stack: ["Python", "PyTorch", "Hugging Face", "Vision-Language Models", "GUI automation"],
    visual: "dashlens",
    links: {},
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
