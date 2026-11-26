import { LineReveal, Reveal } from "@/components/motion/Reveal";

/** Section opener: a glowing pill, a large two-tone heading and a short lead. */
export function SectionTitle({
  eyebrow,
  title,
  accent,
  lead,
  id,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  id?: string;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <header className={`flex flex-col ${center ? "items-center text-center" : "items-start"}`}>
      <Reveal blur={false} y={12}>
        <span className="pill">
          <span className="size-1.5 rounded-full bg-violet shadow-[0_0_10px_2px_rgba(167,139,250,0.7)]" />
          {eyebrow}
        </span>
      </Reveal>
      <h2 id={id} className="heading-xl mt-6 text-[clamp(2.6rem,7vw,5.5rem)]">
        <LineReveal
          lines={[
            <span key="t">
              {title} {accent ? <span className="text-gradient">{accent}</span> : null}
            </span>,
          ]}
        />
      </h2>
      {lead ? (
        <Reveal delay={0.15} className={`mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed text-dim ${center ? "mx-auto" : ""}`}>
          {lead}
        </Reveal>
      ) : null}
    </header>
  );
}
