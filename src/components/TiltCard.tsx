"use client";

import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Leans a card toward the cursor. No rAF loop — the transform is written
 * straight from the pointer event and a short CSS transition does the
 * smoothing, which keeps two dozen of these on a page cheap.
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const track = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const r = el.getBoundingClientRect();
    // Quieter, but not gone, when the user prefers reduced motion — the lean
    // only happens while they move the cursor over the card.
    const amp = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.35 : 1;
    el.style.setProperty("--tx", ((((event.clientX - r.left) / r.width) * 2 - 1) * amp).toFixed(3));
    el.style.setProperty("--ty", ((((event.clientY - r.top) / r.height) * 2 - 1) * amp).toFixed(3));
  };

  const reset = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--tx", "0");
    event.currentTarget.style.setProperty("--ty", "0");
  };

  return (
    <div className={`tilt-card ${className}`} onPointerMove={track} onPointerLeave={reset}>
      {children}
    </div>
  );
}
