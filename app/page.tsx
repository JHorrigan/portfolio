import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Career from "@/components/sections/Career";
import Skills from "@/components/sections/Skills";
import Portfolio from "@/components/sections/Portfolio";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Career />
        <Skills />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}
