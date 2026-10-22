import Image from "next/image";
import { releases } from "@/data/releases";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import { stagger } from "./stagger";

export default function Releases() {
  return (
    <section id="releases" className="scroll-mt-20 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variant="clip" as="h2" className="display-xl mb-12 md:mb-16">
          Releases
        </Reveal>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {releases.map((release, i) => (
            <Reveal
              key={`${release.artist}-${release.title}`}
              as="li"
              variant="up"
              delay={stagger(i)}
            >
              <a
                href={release.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group block"
              >
                <TiltCard className="relative aspect-square overflow-hidden bg-ink-soft">
                  <Image
                    src={release.cover}
                    alt={`${release.artist} — ${release.title}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="label translate-y-2 border border-cream px-5 py-2 transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
                      Play
                    </span>
                  </div>
                </TiltCard>

                <div className="mt-4 space-y-1">
                  <p className="label text-cream/55">{release.artist}</p>
                  <p className="text-sm font-medium uppercase leading-snug transition-colors group-hover:text-flame md:text-base">
                    {release.title}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
