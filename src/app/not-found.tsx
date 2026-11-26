import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80dvh] flex-col justify-center pb-20 pt-32">
      <p className="meta text-vermilion">Error 404 · Not found</p>
      <h1 className="display mt-6 text-[clamp(3.5rem,12vw,10rem)]">
        A missing <em className="italic">page.</em>
      </h1>
      <p className="mt-8 max-w-[34rem] text-[1.0625rem] leading-relaxed text-graphite">
        This page may have moved, or it never existed. Like an unanswered reference in a draft, it points somewhere
        that isn&rsquo;t there yet.
      </p>
      <Link href="/" className="meta mt-10 inline-flex h-12 w-fit items-center bg-ink px-6 text-paper hover:bg-vermilion">
        Return to the index
      </Link>
    </section>
  );
}
