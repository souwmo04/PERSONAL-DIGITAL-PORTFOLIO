import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { publications } from "@/content/publications";
import { AuthorList } from "@/components/research/AuthorList";
import { BibtexBlock } from "@/components/research/BibtexBlock";
import { ResultsTable } from "@/components/research/ResultsTable";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";

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

  const scholarlyJsonLd = {
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
    <article className="pb-24 pt-28 md:pt-36">
      <div className="container-page">
        <Link href="/#research" className="meta group inline-flex items-center gap-2 text-muted hover:text-ink">
          <ArrowLeft aria-hidden className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          Research
        </Link>

        <header className="grid-page mt-10 gap-y-8 border-t border-ink pt-6">
          <div className="meta col-span-4 space-y-1 text-muted md:col-span-2 lg:col-span-3">
            <p className="text-vermilion">Paper notes</p>
            <p className="text-ink">{pub.year}</p>
            <p>{pub.venueShort}</p>
            {pub.pages ? <p>pp. {pub.pages}</p> : null}
            {pub.anthologyId ? <p>ID {pub.anthologyId}</p> : null}
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-9">
            <h1 className="heading text-[clamp(2.1rem,5vw,4.25rem)] leading-[1.02]">{pub.title}</h1>
            <AuthorList authors={pub.authors} className="mt-6 text-[1.05rem] text-graphite" />
            <p className="mt-2 text-sm italic text-graphite">
              {pub.venue}. {pub.publisher}
              {pub.location ? `, ${pub.location}` : ""}, {pub.month ? `${pub.month} ` : ""}
              {pub.year}.
              {pub.doi ? ` DOI ${pub.doi}.` : ""}
            </p>
            <p className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem]">
              {pub.links.paper ? <ArrowLink href={pub.links.paper}>ACL Anthology</ArrowLink> : null}
              {pub.links.pdf ? <ArrowLink href={pub.links.pdf}>PDF</ArrowLink> : null}
              {pub.links.doi ? <ArrowLink href={pub.links.doi}>DOI</ArrowLink> : null}
              {pub.links.code ? <ArrowLink href={pub.links.code}>Code</ArrowLink> : null}
            </p>
          </div>
        </header>

        <div className="grid-page mt-20 gap-y-14">
          <aside className="col-span-4 md:col-span-2 lg:col-span-3">
            <p className="meta text-muted">On this page</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {pub.context ? <li><a className="link-draw" href="#setting">Setting</a></li> : null}
              <li><a className="link-draw" href="#summary">Summary</a></li>
              <li><a className="link-draw" href="#contributions">Contributions</a></li>
              {pub.results ? <li><a className="link-draw" href="#results">Results</a></li> : null}
              <li><a className="link-draw" href="#cite">Cite</a></li>
            </ul>
          </aside>

          <div className="col-span-4 max-w-[44rem] space-y-16 md:col-span-6 lg:col-span-7">
            {pub.context ? (
              <Reveal as="section" aria-labelledby="setting">
                <h2 id="setting" className="meta text-muted">Setting</h2>
                <p className="mt-4 text-[1.125rem] leading-relaxed">{pub.context}</p>
              </Reveal>
            ) : null}
            <Reveal as="section" aria-labelledby="summary">
              <h2 id="summary" className="meta text-muted">Summary</h2>
              <p className="heading mt-4 text-[1.6rem] leading-snug">{pub.summary}</p>
              <p className="mt-4 text-sm text-muted">
                A plain-language summary written for this site. The full abstract is on the ACL Anthology page.
              </p>
            </Reveal>
            <Reveal as="section" aria-labelledby="contributions">
              <h2 id="contributions" className="meta text-muted">Contributions</h2>
              <ol className="mt-4 space-y-4">
                {pub.contributions.map((c, i) => (
                  <li key={i} className="grid grid-cols-[2rem_1fr] border-t rule pt-4 text-[1.0625rem] leading-relaxed">
                    <span className="meta pt-1.5 text-vermilion">{String(i + 1).padStart(2, "0")}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            {pub.results ? (
              <Reveal as="section" aria-labelledby="results">
                <h2 id="results" className="meta mb-4 text-muted">Results</h2>
                <ResultsTable results={pub.results} />
              </Reveal>
            ) : null}
            <Reveal as="section" aria-labelledby="cite">
              <h2 id="cite" className="meta mb-4 text-muted">Cite</h2>
              <BibtexBlock bibtex={pub.bibtex} />
            </Reveal>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyJsonLd) }}
      />
    </article>
  );
}
