import About from "@/components/About";
import Events from "@/components/Events";
import Hero from "@/components/Hero";
import Moments from "@/components/Moments";
import Parallax from "@/components/Parallax";
import Releases from "@/components/Releases";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Releases />
      <Parallax src="/images/break-manja.jpg" />
      <Events />
      <Moments />
      <About />
    </>
  );
}
