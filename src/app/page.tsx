import { IntroProvider } from "@/components/motion/Intro";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Research } from "@/components/sections/Research";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <IntroProvider>
      <Hero />
      <About />
      <Experience />
      <Achievements />
      <Research />
      <Projects />
      <Stack />
      <Contact />
    </IntroProvider>
  );
}
