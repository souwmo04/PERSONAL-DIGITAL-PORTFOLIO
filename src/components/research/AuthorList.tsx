import { site } from "@/content/site";

/** Author list in published order, with the site owner marked. */
export function AuthorList({ authors, className = "" }: { authors: string[]; className?: string }) {
  return (
    <p className={className}>
      {authors.map((a, i) => {
        const me = a === site.name;
        return (
          <span key={a}>
            {me ? (
              <span className="text-ink underline decoration-vermilion decoration-1 underline-offset-4">{a}</span>
            ) : (
              a
            )}
            {i < authors.length - 2 ? ", " : i === authors.length - 2 ? ", and " : ""}
          </span>
        );
      })}
    </p>
  );
}
