import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { publications } from "@/content/publications";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/cv`, changeFrequency: "monthly", priority: 0.6 },
    ...publications.map((p) => ({
      url: `${base}/research/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${base}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
