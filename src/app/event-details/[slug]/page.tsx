import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { events, getEvent } from "@/data/events";
import Reveal from "@/components/Reveal";
import { stagger } from "@/components/stagger";
import { site } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "EVENT" };
  return {
    title: event.title,
    description: event.description?.[0] ?? `${event.schedule} — ${event.address}`,
  };
}

export default async function EventDetailsPage({ params }: Params) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const shareUrl = `${site.url}/event-details/${event.slug}`;
  const shareText = "Check out this event. Hope to see you there!";
  const shares = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <article className="px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <Reveal variant="fade">
          <Link href="/#events" className="label group text-cream/60 transition-colors hover:text-flame">
            <span className="inline-block transition-transform duration-500 ease-out-expo group-hover:-translate-x-1.5">
              ←
            </span>{" "}
            All events
          </Link>
        </Reveal>

        <Reveal variant="up" delay={100} as="p" className="label mt-10 text-flame">
          {event.dayLabel}, {event.dateLabel}
        </Reveal>
        <Reveal
          variant="clip"
          delay={180}
          as="h1"
          className="mt-4 text-3xl font-medium uppercase leading-tight md:text-5xl"
        >
          {event.title}
        </Reveal>

        <dl className="mt-10 space-y-6 border-y border-cream/15 py-8 text-sm">
          <Reveal variant="up" delay={260} className="grid gap-1 md:grid-cols-[120px_1fr] md:gap-6">
            <dt className="label text-cream/50">Time</dt>
            <dd>{event.schedule}</dd>
          </Reveal>
          <Reveal variant="up" delay={340} className="grid gap-1 md:grid-cols-[120px_1fr] md:gap-6">
            <dt className="label text-cream/50">Location</dt>
            <dd className="leading-relaxed">{event.address}</dd>
          </Reveal>
        </dl>

        {event.description?.length ? (
          <div className="mt-10 space-y-4 leading-relaxed text-cream/80">
            {event.description.map((paragraph, i) => (
              <Reveal key={paragraph} as="p" variant="up" delay={stagger(i, 90)}>
                {paragraph}
              </Reveal>
            ))}
          </div>
        ) : null}

        <Reveal variant="up" className="mt-12 flex flex-wrap items-center gap-4">
          <span className="label text-cream/50">Share</span>
          {shares.map((share) => (
            <a
              key={share.label}
              href={share.href}
              target="_blank"
              rel="noreferrer noopener"
              className="label border border-cream/30 px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-flame hover:text-flame"
            >
              {share.label}
            </a>
          ))}
        </Reveal>
      </div>
    </article>
  );
}
