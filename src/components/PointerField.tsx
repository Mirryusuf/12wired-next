"use client";

import { useEffect, useRef } from "react";

type PointerFieldProps = {
  children: React.ReactNode;
  className?: string;
  /** How hard the value chases the cursor — lower is heavier. */
  ease?: number;
};

/**
 * Publishes the cursor position as --px / --py (-1..1 from the element's
 * centre) so children can parallax off it in plain CSS. The value is eased in
 * a rAF loop, and the loop only runs while the element is on screen.
 */
export default function PointerField({
  children,
  className,
  ease = 0.07,
}: PointerFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parallax only moves while the cursor moves, so it survives a
    // reduced-motion preference — just quieter.
    const amp = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.35 : 1;

    let raf = 0;
    let running = false;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (event: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      tx = ((event.clientX - r.left) / r.width) * 2 - 1;
      ty = ((event.clientY - r.top) / r.height) * 2 - 1;
    };

    const frame = () => {
      cx += (tx - cx) * ease;
      cy += (ty - cy) * ease;
      el.style.setProperty("--px", (cx * amp).toFixed(4));
      el.style.setProperty("--py", (cy * amp).toFixed(4));
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(frame);
    };

    // Don't burn frames on a hero that has been scrolled past.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startLoop() : stop()),
      { threshold: 0 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      stop();
    };
  }, [ease]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
