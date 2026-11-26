import type { Manuscript, Publication } from "./types";

/**
 * Publications — sourced from the ACL Anthology record
 * https://aclanthology.org/2025.banglalp-1.60/
 *
 * Rules for this file: copy titles, author order, venues and numbers exactly
 * from the published record. Do not round, estimate or embellish.
 */
export const publications: Publication[] = [
  {
    slug: "nsu-piedpiper-blp-2025",
    title:
      "NSU_PiedPiper at BLP-2025 Task 2: A Chain-of-Thought with Iterative Debugging Approach for Code Generation with Bangla Instruction",
    authors: [
      "Ahmad Fahmid",
      "Fahim Foysal",
      "Wasif Haider",
      "Shafin Rahman",
      "Md Adnan Arefeen",
    ],
    venue:
      "Proceedings of the Second Workshop on Bangla Language Processing (BLP-2025)",
    venueShort: "BLP-2025 · IJCNLP-AACL 2025",
    year: 2025,
    month: "December",
    pages: "595–600",
    publisher: "Association for Computational Linguistics",
    location: "Mumbai, India",
    anthologyId: "2025.banglalp-1.60",
    doi: "10.18653/v1/2025.banglalp-1.60",
    notes: [
      "Equal contribution: Ahmad Fahmid, Fahim Foysal and Wasif Haider.",
      "10th place in BLP-2025 Shared Task 2 · USD 200 workshop subsidy.",
    ],
    context:
      "BLP-2025 Task 2 was the first shared task on code generation from Bangla: systems receive a programming problem written in Bangla and must produce executable Python that passes hidden tests.",
    summary:
      "Most strong code models are trained mostly on English, and Bangla programming instructions are scarce and often hard to read correctly. We prompt Qwen2.5-Coder-14B to reason step by step, with few-shot examples, before it writes any code. After the competition, we added a debugging stage: the model reads its own failing output and gets up to three attempts to repair the program.",
    contributions: [
      "A chain-of-thought prompting pipeline with few-shot examples that turns Bangla problem statements into Python using an open 14B code model, Qwen2.5-Coder-14B.",
      "An iterative debugger prompt, added after the competition, that gives the model up to three attempts to fix failing programs.",
    ],
    results: [
      { label: "Shared test set", value: "93%", note: "during the competition" },
      { label: "Hidden test set", value: "82.6%", note: "public + private" },
      {
        label: "With iterative debugging",
        value: "100%",
        note: "shared test set, +7 points, post-competition",
      },
    ],
    tags: ["Code generation", "Bangla NLP", "LLMs", "Chain-of-thought", "Low-resource"],
    links: {
      paper: "https://aclanthology.org/2025.banglalp-1.60/",
      pdf: "https://aclanthology.org/2025.banglalp-1.60.pdf",
      doi: "https://doi.org/10.18653/v1/2025.banglalp-1.60",
    },
    bibtex: `@inproceedings{fahmid-etal-2025-nsu,
    title = "{NSU}\\_{P}ied{P}iper at {BLP}-2025 Task 2: A Chain-of-Thought with Iterative Debugging Approach for Code Generation with {B}angla Instruction",
    author = "Fahmid, Ahmad and Foysal, Fahim and Haider, Wasif and Rahman, Shafin and Arefeen, Md Adnan",
    booktitle = "Proceedings of the Second Workshop on Bangla Language Processing (BLP-2025)",
    month = dec,
    year = "2025",
    address = "Mumbai, India",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2025.banglalp-1.60/",
    doi = "10.18653/v1/2025.banglalp-1.60",
    pages = "595--600"
}`,
  },
];

export const researchInterests = [
  { name: "Large Language Models", note: "reasoning, code, low-resource languages" },
  { name: "Vision-Language Models", note: "grounding language in pixels" },
  { name: "Multimodal AI", note: "text, image, interface, speech" },
  { name: "Computer Vision", note: "medical and document imagery" },
  { name: "Natural Language Processing", note: "Bangla and beyond" },
  { name: "Human-Computer Interaction", note: "AI that fits how people work" },
  { name: "AI Agents", note: "models that act inside GUIs" },
  { name: "Accessible AI Systems", note: "for people technology leaves out" },
];

/** Manuscripts that are not published. Only the title is shown. */
export const manuscripts: Manuscript[] = [
  {
    title:
      "SpectraLUSC: An Efficient and Explainable Hyperspectral Framework for Pixel-Level Lung Squamous Cell Carcinoma Classification",
    shortTitle: "SpectraLUSC",
    area: "Medical imaging · Hyperspectral · Explainable AI",
  },
];
