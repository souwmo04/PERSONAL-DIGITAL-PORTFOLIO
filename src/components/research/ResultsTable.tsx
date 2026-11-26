import type { Publication } from "@/content/types";

/** Reported results as small stat tiles, copied from the paper. */
export function ResultsTable({ results }: { results: NonNullable<Publication["results"]> }) {
  return (
    <figure>
      <figcaption className="eyebrow mb-3 text-faint">Results as reported in the paper</figcaption>
      <dl className="grid gap-3 sm:grid-cols-3">
        {results.map((r) => (
          <div key={r.label} className="rounded-2xl border border-line bg-white/[0.02] p-4">
            <dd className="heading-xl text-[2rem] text-gradient">{r.value}</dd>
            <dt className="mt-2 text-sm text-text">{r.label}</dt>
            {r.note ? <p className="mt-1 text-xs text-faint">{r.note}</p> : null}
          </div>
        ))}
      </dl>
    </figure>
  );
}
