import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import Marquee from "./Marquee";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20">
      <Marquee
        text={site.tagline}
        className="border-y border-cream/10 bg-sand py-3 text-base font-medium uppercase tracking-tight text-ink sm:py-4 sm:text-xl md:text-3xl"
      />

      <div className="relative overflow-hidden">
        <Image
          src="/images/about-mario-zwinkle.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-ink/60" />

        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 py-24 md:px-10 md:py-36">
          <div className="max-w-3xl space-y-6">
            <Reveal variant="up" as="p" className="text-2xl font-medium uppercase leading-tight md:text-4xl">
              Founded in Jakarta in 2020,
            </Reveal>
            <Reveal
              variant="up"
              delay={140}
              as="p"
              className="text-2xl font-medium uppercase leading-tight text-cream/75 md:text-4xl"
            >
              driven to illuminate Indonesia&apos;s most electrifying, diverse talents
            </Reveal>
            <Reveal variant="fade" delay={320} as="p" className="label pt-4 text-cream/60">
              Check out the latest in our artist collection
            </Reveal>
            <Reveal variant="up" delay={420}>
              <Link
                href="/artists"
                className="label inline-block border border-cream px-7 py-3 transition-colors duration-300 hover:border-flame hover:bg-flame hover:text-cream"
              >
                Read more
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
