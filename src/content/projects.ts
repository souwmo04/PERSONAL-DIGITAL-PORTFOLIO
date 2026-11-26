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
  {
    slug: "meditalk-ai",
    index: "B",
    title: "Meditalk AI",
    tagline: "A healthcare assistant you can talk to, or show a prescription.",
    description:
      "An AI-powered healthcare assistant with conversational guidance, voice interaction and document reading.",
    kind: "Full-stack application",
    areas: ["Conversational AI", "Speech", "OCR", "Healthcare"],
    problem:
      "Medical information is everywhere, but it is hard to use. Prescriptions and reports are handwritten or dense. Typing symptoms is a barrier for many people, and general chatbots don't keep the context of a person's own documents.",
    approach: [
      "A conversational assistant built on the Gemini API, prompted to give general guidance and to send people to clinicians, not to diagnose.",
      "Speech input and output, so people can talk to it instead of typing.",
      "OCR for prescriptions and medical reports, so the assistant can explain what a document says.",
      "A FastAPI backend with MongoDB that keeps conversation history and uploaded documents for each user.",
    ],
    features: [
      { title: "Talk, don't type", detail: "Speech-to-text input and spoken replies." },
      { title: "Read the paperwork", detail: "OCR turns prescriptions and reports into text the assistant can explain." },
      { title: "Remembers context", detail: "History is stored, so follow-up questions make sense." },
      { title: "Knows its limits", detail: "Guidance, not diagnosis, with clear prompts to see a professional." },
    ],
    stack: ["FastAPI", "React", "MongoDB", "Gemini API", "Speech recognition", "OCR"],
    visual: "meditalk",
    links: {},
  },
  {
    slug: "couplecare-ai",
    index: "C",
    title: "CoupleCare AI",
    tagline: "Relationship support that speaks Bangla as naturally as English.",
    description:
      "A bilingual Bangla–English relationship support assistant built on retrieval-augmented generation and local LLMs.",
    kind: "Applied NLP",
    areas: ["Retrieval-Augmented Generation", "Local LLMs", "Conversational AI", "Knowledge retrieval"],
    problem:
      "People rarely ask for help with relationships in a second language. Most support tools are English-only, and general chatbots can drift or make things up on sensitive topics. Many people also don't want such private conversations sent to a cloud API.",
    approach: [
      "Ground every response in a curated knowledge base through retrieval, so answers come from vetted material rather than from the model's memory alone.",
      "Run the language model locally, so conversations stay on the user's machine.",
      "Handle Bangla, English and the code-mixed way people actually write, in both retrieval and generation.",
      "Keep conversational memory within a session, so support feels continuous instead of one-off.",
    ],
    pipeline: [
      { label: "Query", detail: "Bangla, English or mixed" },
      { label: "Embed", detail: "Multilingual embeddings" },
      { label: "Retrieve", detail: "Top-k passages from the knowledge base" },
      { label: "Generate", detail: "Local LLM, grounded in the context" },
    ],
    stack: ["Python", "Local LLMs", "RAG", "Vector search", "Multilingual embeddings"],
    visual: "couplecare",
    links: {},
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
