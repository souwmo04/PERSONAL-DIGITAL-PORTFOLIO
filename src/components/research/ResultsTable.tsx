import type { Publication } from "@/content/types";

/** Reported results as a small academic table ("Table 1"). */
export function ResultsTable({ results, caption }: { results: NonNullable<Publication["results"]>; caption?: string }) {
  return (
    <figure>
      <table className="w-full border-collapse text-left text-sm">
        <caption className="mb-3 caption-top text-left text-sm text-graphite">
          <span className="meta mr-2 text-ink">Table 1</span>
          {caption ?? "Results as reported in the paper."}
        </caption>
        <thead>
          <tr className="border-y border-ink">
            <th scope="col" className="meta py-2 pr-4 font-normal text-muted">Setting</th>
            <th scope="col" className="meta py-2 pr-4 font-normal text-muted">Note</th>
            <th scope="col" className="meta py-2 text-right font-normal text-muted">Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={r.label} className={i === results.length - 1 ? "border-b border-ink" : "border-b rule"}>
              <th scope="row" className="py-2.5 pr-4 font-normal">{r.label}</th>
              <td className="py-2.5 pr-4 text-graphite">{r.note}</td>
              <td className="heading py-2.5 text-right text-[1.35rem] tabular-nums">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
