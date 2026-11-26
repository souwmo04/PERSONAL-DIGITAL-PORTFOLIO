import { Reveal, LineReveal } from "@/components/motion/Reveal";

type Props = {
  n: string;
  label: string;
  title: React.ReactNode[];
  note?: React.ReactNode;
  id?: string;
  tone?: "light" | "dark";
};

/**
 * Section opener: margin column carries "§ 0N / Label" and an optional note,
 * content column carries the serif heading. Sits on a hairline rule.
 */
export function SectionHeader({ n, label, title, note, id, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <header className={`grid-page border-t pt-5 ${dark ? "border-white/15" : "rule"}`}>
      <div className="col-span-4 mb-10 flex items-baseline gap-3 md:col-span-2 lg:col-span-3 lg:mb-0">
        <span className={`meta ${dark ? "text-signal" : "text-vermilion"}`}>§ {n}</span>
        <span className={`meta ${dark ? "text-fog" : "text-muted"}`}>{label}</span>
      </div>
      <div className="col-span-4 md:col-span-6 lg:col-span-9">
        <h2 id={id} className="heading text-[clamp(2.5rem,6.4vw,5.5rem)]">
          <LineReveal lines={title} />
        </h2>
        {note ? (
          <Reveal delay={0.2} className={`mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed ${dark ? "text-fog" : "text-graphite"}`}>
            {note}
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
