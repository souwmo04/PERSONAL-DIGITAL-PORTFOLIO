import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Research } from "@/components/sections/Research";
import { Projects } from "@/components/sections/Projects";
import { Design } from "@/components/sections/Design";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { ScrollStage } from "@/components/motion/ScrollStage";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollStage className="bg-night">
        <About />
      </ScrollStage>
      <VelocityMarquee words={["AI Research", "Vision-Language", "Multimodal", "Bangla NLP", "Accessible AI"]} />
      <ScrollStage>
        <Experience />
      </ScrollStage>
      <ScrollStage className="bg-night">
        <Achievements />
      </ScrollStage>
      <ScrollStage>
        <Research />
      </ScrollStage>
      <ScrollStage className="bg-night">
        <Projects />
      </ScrollStage>
      <VelocityMarquee words={["Build", "Ship", "Design", "Research", "Repeat"]} tilt={2} baseSpeed={2.6} />
      <ScrollStage>
        <Design />
      </ScrollStage>
      <ScrollStage className="bg-night">
        <Stack />
      </ScrollStage>
      <ScrollStage>
        <Contact />
      </ScrollStage>
    </>
  );
}
