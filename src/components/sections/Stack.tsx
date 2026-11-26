import { Reveal } from "@/components/motion/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { skillGroups } from "@/content/experience";

function Row({ items, reverse, duration }: { items: string[]; reverse?: boolean; duration: string }) {
  const loop = [...items, ...items];
  return (
    <div className="mask-fade-x group/row flex overflow-hidden">
      <ul
        className={`flex w-max shrink-0 gap-4 pr-4 group-hover/row:[animation-play-state:paused] ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {loop.map((s, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex h-16 items-center gap-3 rounded-2xl glass px-6 text-[0.98rem] font-medium whitespace-nowrap transition-colors hover:border-violet/40 hover:text-iris"
          >
            <span className="size-1.5 rounded-full bg-violet shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Stack() {
  const all = skillGroups.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  return (
    <section id="stack" aria-labelledby="stack-title" className="section-y relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[24rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/20 blur-[150px]" />
      <div className="container-page">
        <SectionTitle id="stack-title" eyebrow="Toolkit" title="Tech" accent="stack" lead="The tools I use to go from an idea to a model to a product." />
      </div>

      <Reveal className="mt-16 space-y-4" blur={false}>
        <Row items={all.slice(0, half)} duration="45s" />
        <Row items={all.slice(half)} reverse duration="50s" />
      </Reveal>

      <div className="container-page mt-20">
        <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {skillGroups.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.06} className="bg-void p-6 sm:last:col-span-2 lg:last:col-span-1">
              <dt className="font-display font-semibold">{g.label}</dt>
              <p className="mt-1 text-xs text-faint">{g.note}</p>
              <dd className="mt-4 text-sm leading-relaxed text-dim">{g.items.join(" · ")}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
