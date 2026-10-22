export const site = {
  name: "12WIRED",
  tagline: "WHERE TALENT MEETS OPPORTUNITIES",
  /**
   * Canonical origin, used by metadataBase, sitemap.xml and robots.txt.
   * Vercel preview deployments get their own hostname, so this is overridable
   * via NEXT_PUBLIC_SITE_URL — without it every preview would advertise the
   * production URL as its canonical.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_ENV === "production"
      ? "https://www.12wired.com"
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://www.12wired.com"),
  phone: "+62 811-8490-904",
  email: "INFO@12WIRED.COM",
  address: "WISMA 77 TOWER 2, 3RD FLOOR WEST JAKARTA, INDONESIA 11410",
  copyright: "© 2020 BY 12WIRED",
};

export const nav = [
  { label: "HOME", href: "/" },
  { label: "ARTISTS", href: "/artists" },
  { label: "ABOUT", href: "/#about" },
  { label: "EVENTS", href: "/#events" },
];

export const socials = [
  { label: "FACEBOOK", href: "https://www.facebook.com/12wired/" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/12wired/?hl=en" },
  { label: "TIKTOK", href: "https://www.tiktok.com/@_12wired" },
  { label: "YOUTUBE", href: "https://www.youtube.com/@12WIRED." },
];
