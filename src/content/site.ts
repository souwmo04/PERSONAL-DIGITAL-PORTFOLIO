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
  /** Canonical URL. Set NEXT_PUBLIC_SITE_URL once you have a domain;
   *  on Vercel the production URL is picked up automatically. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  roles: ["AI Researcher", "Machine Learning Engineer", "Software Developer"],
  location: "Bangladesh",
  timezone: "Asia/Dhaka",
  email: "fahim.foysal0411@gmail.com",

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
    "I study how machines can read the world the way people do: through text, images and the interfaces in between. I'm a Computer Science undergraduate at North South University and a research assistant at the TriModal AI Lab. My work sits where vision-language models meet real software, and where AI is useful to people that technology usually forgets.",

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
    linkedin: "",
    scholar: "",
    acl: "https://aclanthology.org/people/fahim-foysal/",
    orcid: "",
    openreview: "",
  },
} as const;

/** Ordered contact channels. Empty hrefs are filtered out. */
export const contactLinks: LinkItem[] = [
  { label: "Email", href: `mailto:${site.email}`, display: site.email },
  { label: "LinkedIn", href: site.social.linkedin, display: "Profile" },
  { label: "GitHub", href: site.social.github, display: "@souwmo04" },
  { label: "Google Scholar", href: site.social.scholar, display: "Citations" },
  { label: "ACL Anthology", href: site.social.acl, display: "Author page" },
  { label: "OpenReview", href: site.social.openreview, display: "Profile" },
  { label: "ORCID", href: site.social.orcid, display: "iD" },
].filter((l) => l.href);

export const navItems = [
  { id: "about", label: "About", n: "01" },
  { id: "research", label: "Research", n: "02" },
  { id: "work", label: "Work", n: "03" },
  { id: "record", label: "Record", n: "04" },
  { id: "toolkit", label: "Toolkit", n: "05" },
  { id: "contact", label: "Contact", n: "06" },
] as const;

export const cvHref = site.cv.pdf || site.cv.page;
