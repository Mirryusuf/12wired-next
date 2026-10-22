"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { INTRO_DONE_EVENT } from "./intro-ready";

const LOGO = "/images/logo-wordmark.png";

/** Number of silhouette slices stacked backwards in Z to build the extrusion. */
const DEPTH = 26;

export default function IntroOverlay() {
  // "idle" while the splash is up, "leaving" during the exit animation,
  // "done" once it is gone. Returning visitors jump straight to "done".
  const [phase, setPhase] = useState<"idle" | "leaving" | "done">("idle");
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const enter = useCallback(() => {
    setPhase((current) => {
      if (current !== "idle") return current;

      timer.current = setTimeout(() => {
        // Dropping the class unlocks body scroll and un-pauses every animation
        // that was held behind the overlay; the event releases the reveals.
        document.documentElement.classList.remove("intro-pending");
        document.dispatchEvent(new Event(INTRO_DONE_EVENT));
        setPhase("done");
      }, 600);

      return "leaving";
    });
  }, []);

  useEffect(() => {
    // The boot script decides whether the intro is due; if it isn't, this
    // component should take itself out of the DOM entirely.
    if (!document.documentElement.classList.contains("intro-pending")) {
      setPhase("done");
      return;
    }

    buttonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") {
        enter();
        return;
      }
      // Only one control here, so keep Tab from reaching the page behind.
      if (event.key === "Tab") {
        event.preventDefault();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer.current);
    };
  }, [enter]);

  /**
   * Single rAF loop feeding --px / --py. The specular is deliberately not in
   * here — it runs on its own CSS loop so it reads as a sweep rather than
   * something the cursor drags around.
   */
  useEffect(() => {
    if (phase !== "idle") return;
    const root = rootRef.current;
    if (!root) return;
    if (!document.documentElement.classList.contains("intro-pending")) return;

    // Reduced motion keeps the pointer parallax (the user drives it) but drops
    // the amplitude, the autonomous idle drift and the entry glint sweep.
    const gentle = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const amp = gentle ? 0.35 : 1;

    let raf = 0;
    let lastPointer = Number.NEGATIVE_INFINITY;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    const start = performance.now();

    const onPointerMove = (event: PointerEvent) => {
      lastPointer = performance.now();
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const frame = (now: number) => {
      const t = (now - start) / 1000;

      // No pointer (touch, or the mouse has been still): drift on two sines
      // whose periods don't line up, so the motion never visibly repeats.
      if (!gentle && now - lastPointer > 2500) {
        targetX = 0.55 * Math.sin(t * 0.31) + 0.35 * Math.sin(t * 0.53);
        targetY = 0.4 * Math.sin(t * 0.23) + 0.25 * Math.sin(t * 0.47);
      }

      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;

      root.style.setProperty("--px", (curX * amp).toFixed(4));
      root.style.setProperty("--py", (curY * amp).toFixed(4));

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${site.name} intro`}
      className={`intro-root fixed inset-0 z-[200] flex-col items-center justify-center gap-10 overflow-hidden bg-ink px-5 ${
        phase === "leaving" ? "is-leaving" : ""
      }`}
    >
      <div className="intro-stage relative">
        {/* Flame bloom, centred on the logo rather than the whole overlay so
            it doesn't wash out the tagline and button below. It drifts against
            the logo to deepen the parallax. */}
        <div aria-hidden className="intro-glow-layer pointer-events-none">
          <div className="intro-glow h-[32vmin] w-[76vmin] rounded-full bg-flame blur-[80px]" />
        </div>

        <div className="intro-spin">
          <div className="intro-tilt">
            <div className="intro-logo">
              {/* Extruded body: darkened copies marching away from the viewer. */}
              {Array.from({ length: DEPTH }, (_, i) => (
                <div
                  key={i}
                  aria-hidden
                  className="intro-slab"
                  style={{
                    transform: `translateZ(calc(var(--intro-slice) * ${-(i + 1)}))`,
                    filter: `brightness(${(0.44 - (i / DEPTH) * 0.36).toFixed(3)})`,
                  }}
                >
                  <img src={LOGO} alt="" draggable={false} />
                </div>
              ))}

              {/* Front face — the only copy that carries the real colours. */}
              <img src={LOGO} alt={site.name} draggable={false} fetchPriority="high" />

              <span aria-hidden className="intro-shine" />
            </div>
          </div>
        </div>
      </div>

      <div className="intro-drift">
        <p className="label animate-fade-up text-center text-cream/70 [animation-delay:1.5s]">
          {site.tagline}
        </p>
      </div>

      <div className="intro-drift">
        <button
          ref={buttonRef}
          type="button"
          onClick={enter}
          className="label animate-fade-up border border-cream px-9 py-4 transition-colors duration-300 [animation-delay:1.8s] hover:border-flame hover:bg-flame focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame"
        >
          Enter site
        </button>
      </div>
    </div>
  );
}
