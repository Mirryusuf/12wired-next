import Image from "next/image";
import { moments } from "@/data/moments";
import Reel from "./Reel";
import Reveal from "./Reveal";

export default function Moments() {
  // Two identical halves so translateX(-50%) wraps seamlessly. Spacing lives
  // in each item's padding rather than a flex `gap` — a gap would also sit
  // between the two halves, making -50% land half a gap off and visibly jump.
  const strip = moments.map((moment) => moment);

  return (
    <section id="moments" className="relative scroll-mt-20 overflow-hidden">
      <Image
        src="/images/moments-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-ink/70" />

      <div className="relative px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal variant="clip" as="h2" className="display-xl mb-12 md:mb-16">
            Moments
          </Reveal>
        </div>

        {/* Runs on its own, and can still be swiped or dragged by hand. */}
        <Reveal variant="fade">
          <Reel>
            {[0, 1].map((copy) =>
              strip.map((moment) => (
                <li
                  key={`${copy}-${moment.src}`}
                  className="shrink-0 pr-4 md:pr-6"
                  // The second pass is the same photos again — don't announce them twice.
                  aria-hidden={copy === 1 || undefined}
                >
                  <div className="relative aspect-[4/5] w-[78vw] overflow-hidden bg-ink-soft md:aspect-[3/4] md:w-[32vw]">
                    <Image
                      src={moment.src}
                      alt={copy === 0 ? moment.alt : ""}
                      fill
                      draggable={false}
                      sizes="(min-width: 768px) 32vw, 78vw"
                      className="object-cover"
                    />
                  </div>
                </li>
              )),
            )}
          </Reel>
        </Reveal>
      </div>
    </section>
  );
}
