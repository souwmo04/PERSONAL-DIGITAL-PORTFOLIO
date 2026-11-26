import { site } from "@/content/site";

/** Author list in published order, with the site owner highlighted. */
export function AuthorList({ authors, className = "" }: { authors: string[]; className?: string }) {
  return (
    <p className={className}>
      {authors.map((a, i) => (
        <span key={a}>
          {a === site.name ? (
            <span className="print-dark font-medium text-text underline decoration-violet decoration-2 underline-offset-4">{a}</span>
          ) : (
            a
          )}
          {i < authors.length - 2 ? ", " : i === authors.length - 2 ? ", and " : ""}
        </span>
      ))}
    </p>
  );
}
