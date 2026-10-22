import Image from "next/image";
import Link from "next/link";
import { nav, site, socials } from "@/data/site";
import Reveal from "./Reveal";

export default function SiteFooter() {
  return (
    <footer className="border-t border-cream/10 bg-ink px-5 py-16 md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1fr_auto_auto]">
        <Reveal variant="up" className="space-y-6">
          <Image
            src="/images/logo-wordmark.png"
            alt={site.name}
            width={220}
            height={60}
            className="h-10 w-auto object-contain"
          />
          <div className="space-y-1 text-sm text-cream/70">
            <a
              href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
              className="block transition-colors hover:text-flame"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email.toLowerCase()}`}
              className="block transition-colors hover:text-flame"
            >
              {site.email}
            </a>
            <p className="max-w-xs pt-2 leading-relaxed">{site.address}</p>
          </div>
        </Reveal>

        <Reveal variant="up" delay={120} as="nav" className="flex flex-col gap-3">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-link label self-start transition-colors hover:text-flame"
            >
              {item.label}
            </Link>
          ))}
        </Reveal>

        <Reveal variant="up" delay={220} as="nav" className="flex flex-col gap-3">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="nav-link label self-start text-cream/60 transition-colors hover:text-flame"
            >
              {item.label}
            </a>
          ))}
        </Reveal>
      </div>

      <Reveal variant="fade" delay={300} as="p" className="label mx-auto mt-16 max-w-[1400px] text-cream/40">
        {site.copyright}
      </Reveal>
    </footer>
  );
}
