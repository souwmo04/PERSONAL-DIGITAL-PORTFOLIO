import type { Metadata } from "next";
import { contactLinks, site } from "@/content/site";
import { manuscripts, publications, researchInterests } from "@/content/publications";
import { projects } from "@/content/projects";
import { achievements, skillGroups, timeline } from "@/content/experience";
import { PageShell } from "@/components/ui/PageShell";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description: `Curriculum vitae of ${site.name}: AI researcher and software engineer.`,
  alternates: { canonical: "/cv" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-2 border-t border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-8 print:break-inside-avoid print:border-neutral-300 print:py-3">
      <h2 className="eyebrow print-dim pt-1 text-iris">{title}</h2>
      <div className="print-dark">{children}</div>
    </section>
  );
}

/** A printable CV, generated from the same data as the site. */
export default function CvPage() {
  const pdf = site.cv.pdf;
  return (
    <PageShell back="/" backLabel="Home">
      <div className="mx-auto mt-10 max-w-[52rem] print:mt-0">
        <div className="no-print mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl glass p-4 pl-6">
          <p className="text-sm text-dim">
            {pdf ? "A PDF copy is available." : "This page is a printable CV. Choose “Save as PDF” in the print dialog."}
          </p>
          {pdf ? (
            <a href={pdf} download className="rounded-full bg-violet px-5 py-2.5 text-sm font-medium text-void">
              Download PDF
            </a>
          ) : (
            <PrintButton />
          )}
        </div>

        <header className="pb-6">
          <h1 className="heading-xl print-dark text-[clamp(2.75rem,7vw,4.5rem)]">{site.name}</h1>
          <p className="print-dark mt-3 text-[1.0625rem]">{site.roles.join(" · ")}</p>
          <p className="print-dim mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-dim">
            <span>{site.location}</span>
            {contactLinks.map((l) => (
              <a key={l.label} href={l.href} className="underline decoration-line underline-offset-4 hover:text-iris">
                {l.label === "Email" ? site.email : l.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            ))}
          </p>
        </header>

        <Section title="Education">
          <ul className="space-y-3">
            {timeline
              .filter((t) => t.kind === "education")
              .map((t) => (
                <li key={t.title}>
                  <p className="font-medium">{t.title}</p>
                  <p className="print-dim text-sm text-dim">
                    {t.org} · {t.period}
                  </p>
                </li>
              ))}
          </ul>
        </Section>

        <Section title="Experience">
          <ul className="space-y-4">
            {timeline
              .filter((t) => t.kind !== "education" && !t.title.startsWith("Workshop paper"))
              .map((t) => (
                <li key={t.title}>
                  <p className="font-medium">
                    {t.title}, {t.org}
                  </p>
                  <p className="print-dim text-sm text-dim">{t.period}</p>
                  <p className="mt-1 text-sm leading-relaxed">{t.detail}</p>
                  {t.points ? (
                    <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm leading-relaxed">
                      {t.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
          </ul>
        </Section>

        <Section title="Publications">
          <ol className="space-y-3">
            {publications.map((p, i) => (
              <li key={p.slug} className="text-sm leading-relaxed">
                [{i + 1}]{" "}
                {p.authors.map((a, j) => (
                  <span key={a}>
                    {a === site.name ? <strong>{a}</strong> : a}
                    {j < p.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
                . {p.year}. <em>{p.title}</em>. In {p.venue}, pages {p.pages}. {p.publisher}.
                {p.doi ? ` DOI ${p.doi}.` : ""}
                {p.notes?.length ? <span className="print-dim block text-dim">{p.notes.join(" ")}</span> : null}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Manuscripts">
          <ul className="space-y-2">
            {manuscripts.map((m) => (
              <li key={m.title} className="text-sm leading-relaxed">
                <em>{m.title}</em>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Projects">
          <ul className="space-y-3">
            {projects
              .filter((p) => p.slug !== "spectralusc") // listed under Manuscripts
              .map((p) => (
              <li key={p.slug} className="text-sm leading-relaxed">
                <span className="font-medium">{p.title}</span>: {p.description}{" "}
                <span className="print-dim text-dim">({p.stack.slice(0, 4).join(", ")})</span>
              </li>
              ))}
          </ul>
        </Section>

        <Section title="Achievements">
          <ul className="space-y-2">
            {achievements.map((a) => (
              <li key={a.event + a.year} className="text-sm leading-relaxed">
                <span className="font-medium">
                  {a.event}
                  {a.year ? ` ${a.year}` : ""}
                </span>
                : {a.rank} ({a.rankNote}), {a.scope}
                {a.team ? ` · ${a.team}` : ""}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <dl className="space-y-1.5 text-sm">
            {skillGroups.map((g) => (
              <div key={g.id} className="grid grid-cols-[10rem_1fr] gap-3">
                <dt className="print-dim text-dim">{g.label}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Interests">
          <p className="text-sm leading-relaxed">{researchInterests.map((r) => r.name).join(" · ")}</p>
        </Section>
      </div>
    </PageShell>
  );
}
