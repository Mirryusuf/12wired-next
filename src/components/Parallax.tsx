"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ParallaxProps = {
  src: string;
  alt?: string;
  className?: string;
  /** Share of the band's height the image travels across a full scroll pass. */
  strength?: number;
};

/**
 * Full-bleed image band whose image drifts against the scroll. The image is
 * inset by -20% so there is headroom to travel into without exposing an edge.
 */
export default function Parallax({
  src,
  alt = "",
  className = "",
  strength = 0.15,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // -1 when the band sits a viewport below centre, +1 a viewport above.
      const progress =
        (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      setOffset(progress * strength * rect.height);
    };

    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`relative h-[45svh] overflow-hidden md:h-[70svh] ${className}`}
    >
      <div
        className="absolute inset-x-0 -inset-y-[20%] will-change-transform"
        style={{ transform: `translate3d(0, ${offset.toFixed(1)}px, 0)` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover object-[36%_30%]"
        />
      </div>
      <div className="absolute inset-0 bg-ink/20" />
    </div>
  );
}
