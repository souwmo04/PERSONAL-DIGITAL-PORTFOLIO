import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillGroups } from "@/content/experience";

export function Toolkit() {
  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="section-y bg-paper-2/45">
      <div className="container-page">
        <SectionHeader
          n="05"
          label="Technical expertise"
          id="toolkit-title"
          title={["The toolkit."]}
          note="Grouped by what each tool is for. No percentages: you can't measure fluency with a bar."
        />

        <dl className="mt-16 md:mt-24">
          {skillGroups.map((g, i) => (
            <Reveal key={g.id} delay={i * 0.04} className="grid-page group border-t rule py-7 last:border-b md:py-9">
              <dt className="col-span-4 mb-4 md:col-span-3 md:mb-0 lg:col-span-3">
                <span className="meta text-muted transition-colors group-hover:text-vermilion">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="heading ml-3 text-[1.5rem]">{g.label}</span>
                <p className="mt-2 text-sm text-muted md:ml-8">{g.note}</p>
              </dt>
              <dd className="col-span-4 md:col-span-5 lg:col-span-9">
                <ul className="flex flex-wrap gap-x-6 gap-y-1 md:gap-x-8">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="heading text-[clamp(1.6rem,3.6vw,2.75rem)] leading-tight transition-colors duration-200 hover:italic hover:text-vermilion"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
