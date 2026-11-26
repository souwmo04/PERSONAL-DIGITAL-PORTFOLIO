/**
 * Text that rolls upward letter by letter on hover: a second copy slides in
 * from below as the first slides out. Pure CSS; the parent needs `group`.
 */
export function RollText({ text, className = "" }: { text: string; className?: string }) {
  const letters = Array.from(text);
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="flex">
        {letters.map((ch, i) => (
          <span
            key={i}
            className="relative inline-block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            <span className="block">{ch === " " ? " " : ch}</span>
            <span className="absolute left-0 top-full block text-iris">{ch === " " ? " " : ch}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
