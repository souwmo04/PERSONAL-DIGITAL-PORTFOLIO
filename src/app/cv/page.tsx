import type { Metadata } from "next";
import { contactLinks, site } from "@/content/site";
import { publications, researchInterests } from "@/content/publications";
import { projects } from "@/content/projects";
import { achievements, skillGroups } from "@/content/experience";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: `Curriculum vitae of ${site.name}: AI researcher and software engineer.`,
  alternates: { canonical: "/cv" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-2 border-t rule py-5 sm:grid-cols-[9rem_1fr] sm:gap-6 print:break-inside-avoid print:py-3">
      <h2 className="meta pt-1 text-muted">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

/** A printable CV, generated from the same data as the site. */
export default function CvPage() {
  const pdf = site.cv.pdf;
  return (
    <div className="pb-24 pt-28 md:pt-36 print:p-0">
      <div className="container-page max-w-[52rem]">
        <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4 border border-ink p-4">
          <p className="text-sm text-graphite">
            {pdf ? "A PDF copy is available." : "This page is a printable CV. Use “Save as PDF” in the print dialog."}
          </p>
          {pdf ? (
            <a href={pdf} download className="meta bg-ink px-5 py-3 text-paper hover:bg-vermilion">
              Download PDF
            </a>
          ) : (
            <PrintButton />
          )}
        </div>

        <header className="pb-6">
          <h1 className="display text-[clamp(2.75rem,7vw,4.5rem)]">{site.name}</h1>
          <p className="mt-3 text-[1.0625rem]">{site.roles.join(" · ")}</p>
          <p className="meta mt-3 flex flex-wrap gap-x-4 gap-y-1 text-graphite">
            <span>{site.location}</span>
            {contactLinks.map((l) => (
              <a key={l.label} href={l.href} className="link-under">
                {l.label === "Email" ? site.email : l.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            ))}
          </p>
        </header>

        <Section title="Education">
          <p className="font-medium">BSc in Computer Science and Engineering</p>
          <p className="text-sm text-graphite">North South University, Bangladesh · Expected December 2026</p>
        </Section>

        <Section title="Research">
          <p className="font-medium">Research Assistant, TriModal AI Lab</p>
          <p className="text-sm text-graphite">North South University · Current</p>
          <p className="mt-2 text-sm leading-relaxed">
            Vision-language and multimodal models; DashLens, vision-language dashboard question answering for accessibility.
          </p>
        </Section>

        <Section title="Publications">
          <ol className="space-y-3">
            {publications.map((p, i) => (
              <li key={p.slug} className="text-sm leading-relaxed">
                [{i + 1}] {p.authors.map((a) => (a === site.name ? <strong key={a}>{a}</strong> : a)).reduce<React.ReactNode[]>((acc, a, j) => (j ? [...acc, ", ", a] : [a]), [])}.{" "}
                {p.year}. <em>{p.title}</em>. In {p.venue}, pages {p.pages}. {p.publisher}.{" "}
                {p.doi ? <span>DOI {p.doi}</span> : null}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Projects">
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.slug} className="text-sm leading-relaxed">
                <span className="font-medium">{p.title}</span>: {p.description}{" "}
                <span className="text-graphite">({p.stack.slice(0, 4).join(", ")})</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Achievements">
          <ul className="space-y-2">
            {achievements.map((a) => (
              <li key={a.event + a.year} className="text-sm leading-relaxed">
                <span className="font-medium">
                  {a.event} {a.year}
                </span>
                : {a.rankNote} {a.rank}, {a.scope}
                {a.team ? ` · ${a.team}` : ""}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <dl className="space-y-1.5 text-sm">
            {skillGroups.map((g) => (
              <div key={g.id} className="grid grid-cols-[10rem_1fr] gap-3">
                <dt className="text-graphite">{g.label}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Interests">
          <p className="text-sm leading-relaxed">{researchInterests.map((r) => r.name).join(" · ")}</p>
        </Section>
      </div>
    </div>
  );
}
