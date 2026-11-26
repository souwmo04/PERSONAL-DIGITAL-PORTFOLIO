"use client";

import { motion } from "motion/react";
import { BookOpen, GraduationCap, Mail } from "lucide-react";
import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon, OrcidIcon } from "@/components/ui/BrandIcons";

/** Fixed vertical icon rail on the left edge (desktop only). */
export function SocialRail() {
  const items = [
    { label: "GitHub", href: site.social.github, Icon: GithubIcon },
    { label: "ACL Anthology", href: site.social.acl, Icon: BookOpen },
    { label: "Google Scholar", href: site.social.scholar, Icon: GraduationCap },
    { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedinIcon },
    { label: "ORCID", href: site.social.orcid, Icon: OrcidIcon },
    { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
  ].filter((i) => i.href);

  return (
    <motion.aside
      aria-label="Social links"
      className="fixed bottom-0 left-6 z-40 hidden flex-col items-center gap-5 xl:flex"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {items.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className="grid size-9 place-items-center rounded-full text-dim transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 hover:text-iris"
        >
          <Icon className="size-[18px]" aria-hidden />
        </a>
      ))}
      <span aria-hidden className="h-24 w-px bg-gradient-to-b from-line to-transparent" />
    </motion.aside>
  );
}
