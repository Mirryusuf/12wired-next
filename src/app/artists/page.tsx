import Image from "next/image";
import type { Metadata } from "next";
import { artists } from "@/data/artists";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { stagger } from "@/components/stagger";

export const metadata: Metadata = { title: "ARTISTS" };

export default function ArtistsPage() {
  return (
    <section className="px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal variant="clip" as="h1" className="display-xl mb-12 md:mb-16">
          Artists
        </Reveal>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {artists.map((artist, i) => (
            <Reveal key={artist.name} as="li" variant="up" delay={stagger(i)}>
              <div className="group">
                <TiltCard className="relative aspect-[3/4] overflow-hidden bg-ink-soft">
                  {artist.image ? (
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                    />
                  ) : (
                    <span className="label absolute inset-0 flex items-center justify-center text-cream/30 transition-colors duration-500 group-hover:text-flame/60">
                      12W
                    </span>
                  )}
                  {/* Flame wash wipes up from the bottom edge on hover. */}
                  <div className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-flame/50 to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
                </TiltCard>
                <p className="mt-4 text-sm font-medium uppercase transition-colors duration-300 group-hover:text-flame md:text-base">
                  {artist.name}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
