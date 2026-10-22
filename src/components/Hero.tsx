import Image from "next/image";
import Marquee from "./Marquee";
import PointerField from "./PointerField";

export default function Hero() {
  return (
    <section className="relative">
      <PointerField className="relative flex min-h-[72svh] items-end overflow-hidden sm:min-h-[80svh] lg:min-h-[88svh]">
        {/* Inset past the edges so the parallax shift never exposes a gap. */}
        <div className="hero-par-bg absolute -inset-[5%]">
          {/* Overscaled on first paint, then settles — gives the still a push. */}
          <Image
            src="/images/hero-still-young.jpg"
            alt=""
            fill
            priority
            sizes="110vw"
            className="animate-hero-zoom object-cover object-[50%_30%] md:object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />

        <div className="relative w-full px-5 pb-12 sm:pb-16 md:px-10 md:pb-24">
          <div className="hero-par-mark mx-auto max-w-[1400px]">
            <Image
              src="/images/logo-wordmark.png"
              alt="12WIRED"
              width={760}
              height={200}
              priority
              className="w-[min(74vw,680px)] animate-fade-up object-contain [animation-delay:250ms] sm:w-[min(82vw,680px)] lg:w-[min(90vw,680px)]"
            />
            <p className="label mt-4 animate-fade-up text-cream/70 [animation-delay:650ms] sm:mt-6">
              Where talent meets opportunities
            </p>
          </div>
        </div>

      </PointerField>

      <Marquee
        text="STILL YOUNG OUT NOW"
        className="border-y border-ink/20 bg-flame py-3 text-base font-medium uppercase tracking-tight text-cream sm:py-4 sm:text-xl md:py-5 md:text-3xl"
      />
    </section>
  );
}
