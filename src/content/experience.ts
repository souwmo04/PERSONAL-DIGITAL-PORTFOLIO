import type { Achievement, SkillGroup, TimelineEntry } from "./types";

/** Career, community and education, newest first. */
export const timeline: TimelineEntry[] = [
  {
    period: "Sep 2025 – Present",
    title: "Research Assistant",
    org: "TriModal AI Lab, North South University",
    detail: "Research in machine learning, NLP and multimodal AI under faculty supervision.",
    points: [
      "Design, train and evaluate deep learning models with PyTorch and TensorFlow",
      "Build data preprocessing pipelines, dataset curation strategies and evaluation benchmarks",
      "Help write papers, analyse experiments and prepare work for international venues",
      "Working on DashLens, a vision-language approach to accessible dashboard question answering",
    ],
    kind: "research",
  },
  {
    period: "Dec 2025",
    title: "Workshop paper, ACL Anthology",
    org: "BLP-2025 at IJCNLP-AACL 2025",
    detail:
      "Co-first author (equal contribution) of a system paper for the first shared task on code generation from Bangla instructions. The team placed 10th in the shared task.",
    kind: "research",
  },
  {
    period: "Apr 2023 – Jan 2025",
    title: "Graphics Designer, Sub Executive",
    org: "IEEE NSU Student Branch",
    detail: "Designed visual and promotional material for the branch's technical events, workshops and conferences.",
    points: [
      "Worked with organising teams to deliver designs under strict deadlines",
      "Named Best Sub Executive Body Member (2023–2025)",
    ],
    kind: "design",
  },
  {
    period: "2022 – 2023",
    title: "Volunteer",
    org: "IEEE NSU Student Branch",
    detail: "Volunteered across branch events and was named Best Volunteer of the Year (2022–2023).",
    kind: "leadership",
  },
  {
    period: "Expected Dec 2026",
    title: "BSc in Computer Science & Engineering",
    org: "North South University, Bangladesh",
    detail:
      "Coursework includes Machine Learning (CSE445), Pattern Recognition & Neural Networks (CSE465), Linear Algebra, Probability & Statistics, and the Design & Analysis of Algorithms.",
    kind: "education",
  },
  {
    period: "2021",
    title: "Higher Secondary Certificate (HSC)",
    org: "Milestone College",
    detail: "Higher secondary education.",
    kind: "education",
  },
  {
    period: "2016 – 2019",
    title: "SSC (2019) · JSC (2016)",
    org: "Adamjee Cantonment Public School",
    detail: "Junior and secondary school certificates.",
    kind: "education",
  },
];

/**
 * Achievements. Keep wording factual: rank, scope, team.
 * The first four are shown as large cards; the rest appear in a compact list.
 * Leave `year` empty if you don't want a year shown.
 */
export const achievements: Achievement[] = [
  {
    year: "2026",
    rank: "Champion",
    rankNote: "Regional",
    event: "NASA Space Apps Challenge",
    scope: "Rangpur Region",
    team: "Team Oblivion",
  },
  {
    year: "2026",
    rank: "Top 10",
    rankNote: "Finalist",
    event: "CyberFrames",
    scope: "Awarded BDT 30,000",
    team: "Team Five_step_verification",
  },
  {
    year: "2025",
    rank: "10th",
    rankNote: "Shared task ranking",
    event: "BLP-2025 Task 2: Bangla Code Generation",
    scope: "Published in the ACL Anthology · USD 200 workshop subsidy",
    team: "Team NSU_PiedPiper",
    href: "/research/nsu-piedpiper-blp-2025",
  },
  {
    year: "2025",
    rank: "1st Runner-up",
    rankNote: "Regional · Global Nominee",
    event: "NASA Space Apps Challenge",
    scope: "Barishal Region",
    team: "Team Sirius",
  },
  {
    year: "2025",
    rank: "Best Ambassador",
    rankNote: "Award",
    event: "ICAI 2025",
    scope: "Ambassador recognition",
  },
  {
    year: "2025",
    rank: "Top 10",
    rankNote: "Finalist",
    event: "UIU CSE Fest 2025",
    scope: "Finalist",
  },
  {
    year: "",
    rank: "Top 10",
    rankNote: "Finalist",
    event: "BUET Game Jam",
    scope: "Finalist",
  },
  {
    year: "2023 – 2025",
    rank: "Best Sub Executive",
    rankNote: "Body Member",
    event: "IEEE NSU Student Branch",
    scope: "Graphics team",
  },
  {
    year: "2022 – 2023",
    rank: "Best Volunteer",
    rankNote: "of the Year",
    event: "IEEE NSU Student Branch",
    scope: "Volunteer recognition",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    label: "Programming",
    note: "Languages I think in",
    items: ["Python", "C", "C++", "Java", "JavaScript", "TypeScript", "Dart"],
  },
  {
    id: "ml",
    label: "AI & Machine Learning",
    note: "Building and training models",
    items: ["PyTorch", "TensorFlow", "Hugging Face", "Scikit-learn", "NumPy", "Pandas"],
  },
  {
    id: "research",
    label: "AI Research",
    note: "Areas I work in",
    items: ["LLMs", "RAG", "NLP", "Computer Vision", "VLMs", "Fine-tuning", "Transformers", "CNN", "LSTM"],
  },
  {
    id: "development",
    label: "Development",
    note: "Turning models into products",
    items: ["React", "Next.js", "FastAPI", "Django", "Node.js", "Flutter", "MongoDB", "MySQL"],
  },
  {
    id: "tools",
    label: "Tools",
    note: "Everyday environment",
    items: ["Git", "GitHub", "Docker", "Linux", "Jupyter", "Google Colab", "Selenium"],
  },
];
