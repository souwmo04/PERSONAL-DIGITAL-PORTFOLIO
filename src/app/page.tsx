import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Research } from "@/components/sections/Research";
import { Work } from "@/components/sections/Work";
import { Record } from "@/components/sections/Record";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Research />
      <Work />
      <Record />
    </>
  );
}
