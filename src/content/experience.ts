import type { Achievement, TimelineEntry } from "./types";

export const timeline: TimelineEntry[] = [
  {
    period: "Now",
    title: "Research Assistant",
    org: "TriModal AI Lab, North South University",
    detail:
      "Working on vision-language and multimodal systems, including DashLens, a vision-language approach to accessible dashboard question answering.",
    kind: "research",
  },
  {
    period: "2025",
    title: "Workshop paper, ACL Anthology",
    org: "BLP-2025 at IJCNLP-AACL 2025",
    detail:
      "Co-authored a system paper for the first shared task on code generation from Bangla instructions.",
    kind: "research",
  },
  {
    period: "Dec 2026",
    title: "BSc in Computer Science & Engineering",
    org: "North South University, Bangladesh",
    detail: "Expected graduation, December 2026.",
    kind: "education",
  },
];

/**
 * Achievements. Keep wording factual: rank, scope, team.
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
    rank: "1st Runner-up",
    rankNote: "Regional",
    event: "NASA Space Apps Challenge",
    scope: "Barishal Region",
    team: "Team Sirius",
  },
  {
    year: "2025",
    rank: "Published",
    rankNote: "Workshop paper",
    event: "ACL Anthology",
    scope: "BLP-2025 Workshop, IJCNLP-AACL 2025",
    detail: "NSU_PiedPiper at BLP-2025 Task 2",
    href: "/research/nsu-piedpiper-blp-2025",
  },
];
