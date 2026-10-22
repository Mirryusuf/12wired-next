/**
 * The MOMENTS gallery images are loaded lazily on the live site, so they were
 * not part of the downloaded assets. These are the photos that *were* in the
 * download — swap `src` for the real gallery shots when you have them.
 */
export type Moment = { src: string; alt: string };

export const moments: Moment[] = [
  { src: "/images/break-manja.jpg", alt: "MANJA live" },
  { src: "/images/about-mario-zwinkle.png", alt: "Mario Zwinkle" },
  { src: "/images/hero-still-young.jpg", alt: "MANJA — Still Young" },
  { src: "/images/moments-bg.jpg", alt: "12WIRED on stage" },
];
