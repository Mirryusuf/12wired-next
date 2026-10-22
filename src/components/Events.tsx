import Link from "next/link";
import { events } from "@/data/events";
import Marquee from "./Marquee";
import Reveal from "./Reveal";
import { stagger } from "./stagger";

export default function Events() {
  return (
    <section id="events" className="scroll-mt-20">
      <Marquee
        text="EVENT DATES — SEE US LIVE"
        slow
        className="border-y border-cream/10 py-3 text-base font-medium uppercase tracking-tight text-cream/70 sm:py-4 sm:text-xl md:text-2xl"
      />

      <div className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal variant="clip" as="h2" className="display-xl mb-12 md:mb-16">
            Upcoming tours
          </Reveal>

          <ul className="border-t border-cream/15">
            {events.map((event, i) => (
              <Reveal
                key={event.slug}
                as="li"
                variant="up"
                delay={stagger(i, 60)}
                className="border-b border-cream/15"
              >
                <Link
                  href={`/event-details/${event.slug}`}
                  className="group grid gap-3 py-7 transition-colors duration-500 hover:bg-cream/[0.03] md:grid-cols-[150px_1fr_auto] md:items-baseline md:gap-8"
                >
                  <div className="label text-flame transition-transform duration-500 ease-out-expo md:group-hover:translate-x-2">
                    {event.dayLabel}, {event.dateLabel}
                  </div>

                  <div className="transition-transform duration-500 ease-out-expo md:group-hover:translate-x-2">
                    <h3 className="text-lg font-medium uppercase leading-tight transition-colors group-hover:text-flame md:text-2xl">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm text-cream/55">
                      {[event.venue, event.city].filter(Boolean).join(" / ")}
                    </p>
                  </div>

                  <span className="label shrink-0 text-cream/60 transition-colors group-hover:text-flame">
                    Learn more{" "}
                    <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
