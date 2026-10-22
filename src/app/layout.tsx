import type { Metadata } from "next";
import IntroOverlay from "@/components/IntroOverlay";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `HOME | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description:
    "12WIRED — where talent meets opportunities. Founded in Jakarta in 2020, driven to illuminate Indonesia's most electrifying, diverse talents.",
  metadataBase: new URL(site.url),
  openGraph: {
    title: `HOME | ${site.name}`,
    description: "WHERE TALENT MEETS OPPORTUNITIES",
    url: site.url,
    siteName: site.name,
    images: ["/images/logo-wordmark.png"],
  },
  icons: { icon: "/images/logo-mark.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The boot script below stamps a class on <html> before React hydrates,
    // so the server markup intentionally differs here.
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        {/* Runs before the rest of <body> paints, so the overlay is up on the
            first frame instead of flashing the home page first. Home only, and
            only on a real page load — clicking back to "/" from another route
            never re-runs this, which is the behaviour we want. No JS at all
            means no flag, so the site just loads. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(location.pathname==="/")document.documentElement.classList.add("intro-pending")}catch(e){}',
          }}
        />

        {/* Without JS the reveal elements would never get data-visible, so pin
            them to their visible state. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-flame focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <IntroOverlay />
        <SiteHeader />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
