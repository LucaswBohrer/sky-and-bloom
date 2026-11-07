import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Experiments } from "@/components/experiments/Experiments";
import { Playground } from "@/components/playground/Playground";
import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { CursorTrail } from "@/components/effects/CursorTrail";

export default function Home() {
  return (
    <>
      <a
        href="#experiments"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-deep focus:px-5 focus:py-2.5 focus:text-white"
      >
        Skip to content
      </a>
      <CursorTrail />
      <Navbar />
      <main>
        <Hero />
        <Experiments />
        <Playground />
        <About />
        <Contact />
      </main>
    </>
  );
}
