import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publications } from "@/content/publications";
import { AuthorList } from "@/components/research/AuthorList";
import { BibtexBlock } from "@/components/research/BibtexBlock";
import { ResultsTable } from "@/components/research/ResultsTable";
import { Reveal } from "@/components/motion/Reveal";
import { BlurChars } from "@/components/motion/Text";
import { OutLink, PageShell } from "@/components/ui/PageShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/research/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) return {};
  return {
    title: pub.title,
    description: pub.summary,
    alternates: { canonical: `/research/${pub.slug}` },
    openGraph: { type: "article", title: pub.title, description: pub.summary },
  };
}

export default async function PublicationPage({ params }: PageProps<"/research/[slug]">) {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    author: pub.authors.map((name) => ({ "@type": "Person", name })),
    datePublished: String(pub.year),
    publisher: { "@type": "Organization", name: pub.publisher },
    isPartOf: { "@type": "PublicationVolume", name: pub.venue },
    url: pub.links.paper,
    sameAs: pub.links.doi,
  };

  return (
    <PageShell back="/#research" backLabel="Research">
      <article>
        <header className="mt-10 max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill">Paper notes</span>
            <span className="font-mono text-xs text-dim">
              {pub.venueShort} · {pub.year}
              {pub.pages ? ` · pp. ${pub.pages}` : ""}
            </span>
          </div>
          <h1 className="font-display mt-7 text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            <BlurChars text={pub.title} stagger={0.008} />
          </h1>
          <Reveal delay={0.3}>
            <AuthorList authors={pub.authors} className="mt-7 text-[1.05rem] text-dim" />
            <p className="mt-2 text-sm italic text-faint">
              {pub.venue}. {pub.publisher}
              {pub.location ? `, ${pub.location}` : ""}, {pub.month ? `${pub.month} ` : ""}
              {pub.year}.{pub.doi ? ` DOI ${pub.doi}.` : ""}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {pub.links.paper ? <OutLink href={pub.links.paper}>ACL Anthology</OutLink> : null}
              {pub.links.pdf ? <OutLink href={pub.links.pdf}>PDF</OutLink> : null}
              {pub.links.doi ? <OutLink href={pub.links.doi}>DOI</OutLink> : null}
              {pub.links.code ? <OutLink href={pub.links.code}>Code</OutLink> : null}
            </div>
          </Reveal>
        </header>

        <div className="mt-20 grid gap-12 lg:grid-cols-[14rem_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-28 space-y-2 border-l border-line pl-4 text-sm text-dim">
              {pub.context ? <li><a className="hover:text-iris" href="#setting">Setting</a></li> : null}
              <li><a className="hover:text-iris" href="#summary">Summary</a></li>
              <li><a className="hover:text-iris" href="#contributions">Contributions</a></li>
              {pub.results ? <li><a className="hover:text-iris" href="#results">Results</a></li> : null}
              <li><a className="hover:text-iris" href="#cite">Cite</a></li>
            </ul>
          </nav>

          <div className="max-w-3xl space-y-16">
            {pub.context ? (
              <Reveal as="section" aria-labelledby="setting">
                <h2 id="setting" className="eyebrow text-iris">Setting</h2>
                <p className="mt-4 text-[1.125rem] leading-relaxed">{pub.context}</p>
              </Reveal>
            ) : null}
            <Reveal as="section" aria-labelledby="summary">
              <h2 id="summary" className="eyebrow text-iris">Summary</h2>
              <p className="font-display mt-4 text-[1.45rem] leading-snug">{pub.summary}</p>
              <p className="mt-4 text-sm text-faint">
                A plain-language summary written for this site. The full abstract is on the ACL Anthology page.
              </p>
            </Reveal>
            <Reveal as="section" aria-labelledby="contributions">
              <h2 id="contributions" className="eyebrow text-iris">Contributions</h2>
              <ol className="mt-5 space-y-4">
                {pub.contributions.map((c, i) => (
                  <li key={i} className="flex gap-4 rounded-2xl glass p-5 text-[1.0625rem] leading-relaxed">
                    <span className="font-mono text-sm text-violet">0{i + 1}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            {pub.results ? (
              <Reveal as="section" aria-labelledby="results">
                <h2 id="results" className="eyebrow mb-4 text-iris">Results</h2>
                <ResultsTable results={pub.results} />
              </Reveal>
            ) : null}
            <Reveal as="section" aria-labelledby="cite">
              <h2 id="cite" className="eyebrow mb-4 text-iris">Cite</h2>
              <BibtexBlock bibtex={pub.bibtex} />
            </Reveal>
          </div>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </PageShell>
  );
}
