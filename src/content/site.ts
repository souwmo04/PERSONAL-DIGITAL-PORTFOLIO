import type { LinkItem } from "./types";

/**
 * Global identity + contact data.
 *
 * Links left as empty strings are hidden automatically, so the site never
 * shows a broken link. Fill them in when you have them.
 */
export const site = {
  name: "Fahim Foysal",
  firstName: "Fahim",
  nickname: "Souwmik",
  /** Canonical URL for links, the sitemap and social previews.
   *  Set NEXT_PUBLIC_SITE_URL for a custom domain. Otherwise Netlify's `URL`
   *  (the site's main address) or Vercel's production URL is used automatically. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  roles: ["AI Researcher", "Machine Learning Engineer", "Software Developer"],
  location: "Bangladesh",
  timezone: "Asia/Dhaka",
  email: "fahim.foysal0411@gmail.com",
  phone: "+880 1711-946008",
  phoneHref: "tel:+8801711946008",

  status: {
    available: true,
    label: "Open to research collaborations",
    detail: "Research Assistant at TriModal AI Lab, NSU",
  },

  /** Hero copy. */
  headline: {
    greeting: "Hello, I'm Fahim.",
    lines: ["Exploring intelligence.", "Building meaningful technology."],
  },

  intro:
    "I'm a Computer Science and Engineering undergraduate at North South University and a research assistant at the TriModal AI Lab. I'm not interested in AI only in theory: I like experimenting with models, running the research, and turning ideas into systems people can actually use.",

  description:
    "Fahim Foysal is an AI researcher and software engineer from Bangladesh working on vision-language models, multimodal AI and accessible AI systems. Research Assistant at TriModal AI Lab, North South University.",

  /** CV: /cv is a printable page generated from this data.
   *  Drop a PDF at /public/cv/Fahim-Foysal-CV.pdf and set `pdf` to use a file instead. */
  cv: {
    page: "/cv",
    pdf: "",
  },

  social: {
    github: "https://github.com/souwmo04",
    linkedin: "https://www.linkedin.com/in/fahim-foysal-26a68a251/",
    leetcode: "https://leetcode.com/u/Fahim_F_Souwmik/",
    behance: "https://www.behance.net/KingScorpe/projects",
    scholar: "https://scholar.google.com/citations?user=w6eDQZ0AAAAJ&hl=en",
    acl: "https://aclanthology.org/people/fahim-foysal/",
    orcid: "",
    openreview: "",
  },
} as const;

/** Ordered contact channels. Empty hrefs are filtered out. */
export const contactLinks: LinkItem[] = [
  { label: "Email", href: `mailto:${site.email}`, display: site.email },
  { label: "Phone", href: site.phoneHref, display: site.phone },
  { label: "LinkedIn", href: site.social.linkedin, display: "Profile" },
  { label: "GitHub", href: site.social.github, display: "@souwmo04" },
  { label: "LeetCode", href: site.social.leetcode, display: "Fahim_F_Souwmik" },
  { label: "Behance", href: site.social.behance, display: "KingScorpe" },
  { label: "Google Scholar", href: site.social.scholar, display: "Citations" },
  { label: "ACL Anthology", href: site.social.acl, display: "Author page" },
  { label: "OpenReview", href: site.social.openreview, display: "Profile" },
  { label: "ORCID", href: site.social.orcid, display: "iD" },
].filter((l) => l.href);

export const navItems = [
  { id: "about", label: "About", n: "01" },
  { id: "career", label: "Career", n: "02" },
  { id: "achievements", label: "Awards", n: "03" },
  { id: "research", label: "Research", n: "04" },
  { id: "work", label: "Projects", n: "05" },
  { id: "design", label: "Design", n: "06" },
  { id: "stack", label: "Stack", n: "07" },
  { id: "contact", label: "Contact", n: "08" },
] as const;

export const cvHref = site.cv.pdf || site.cv.page;
