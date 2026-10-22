"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, socials } from "@/data/site";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
          className={`fixed inset-x-0 top-0 z-50 animate-slide-down transition-colors duration-300 ${
          scrolled || open ? "bg-ink/95 backdrop-blur" : "bg-transparent"
        }`}
    >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between px-5 transition-[height] duration-500 ease-out-expo md:px-10 ${
            scrolled && !open ? "h-16" : "h-20"
          }`}
        >
          <Link
            href="/"
            className="relative z-10 transition-transform duration-500 ease-out-expo hover:scale-110"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo-mark.png"
              alt="12WIRED"
              width={48}
              height={48}
              priority
              className="h-10 w-10 object-contain md:h-12 md:w-12"
            />
          </Link>

          {/* The four socials only fit alongside the nav from xl up — below that
              they overflowed and clipped. They are still in the footer. */}
          <nav className="hidden items-center gap-5 md:flex lg:gap-7 xl:gap-8">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="nav-link label text-cream/90 transition-colors hover:text-flame"
              >
                {item.label}
              </Link>
            ))}
            <span className="hidden h-4 w-px bg-cream/25 xl:block" />
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="nav-link label hidden text-cream/60 transition-colors hover:text-flame xl:block"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="label relative z-10 transition-colors duration-300 hover:text-flame md:hidden"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>

      </header>

      {/*
        Mobile overlay menu — links slide in one after another.

        Deliberately a sibling of <header>, not a child. The header carries
        `backdrop-blur` while the menu is open and a transform while it slides
        in, and an ancestor with backdrop-filter or transform makes
        position:fixed resolve against *that element* instead of the viewport.
        Nested inside, this overlay was clipped to the 80px header bar.

        The column starts at the top rather than centring: on a tall phone a
        centred block just floats in the middle with dead space above and
        below. min-h-full plus overflow-y-auto still lets it scroll on short
        landscape viewports, which otherwise push HOME and ARTISTS off-screen.
      */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-ink transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col justify-start gap-1 px-5 pb-12 pt-24">
        {nav.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            className={`w-fit text-[clamp(1.75rem,9vw,3rem)] font-medium uppercase leading-[0.95] tracking-tight text-cream transition-all duration-700 ease-out-expo hover:text-flame ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <div
          style={{ transitionDelay: open ? `${160 + nav.length * 70}ms` : "0ms" }}
          className={`mt-8 flex flex-wrap gap-x-6 gap-y-2 transition-opacity duration-700 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="label text-cream/60 transition-colors hover:text-flame"
            >
              {item.label}
            </a>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}
