"use client";

import { useEffect, useRef } from "react";

/**
 * Infinite horizontal strip that scrolls itself but is still a real scroll
 * container, so touch swipe, trackpad and drag all work. Children must be two
 * identical halves — the loop is a wrap of `scrollLeft` by half the track, so
 * the seam only disappears if both halves are the same width.
 *
 * It drives `scrollLeft` rather than a CSS transform because a transform
 * animation cannot be scrolled by hand.
 */
export default function Reel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = reduced ? 20 : 39; // px per second

    let raf = 0;
    let last = performance.now();
    let holdUntil = 0; // auto-advance stays off until this timestamp
    let hovering = false;
    let dragging = false;
    let dragFrom = 0;
    /*
     * Authoritative sub-pixel position. Reading scrollLeft back after writing
     * it returns a rounded value, so `scrollLeft += 0.32` each frame rounds to
     * zero progress and the strip never moves. We accumulate here instead and
     * only ever write.
     */
    let pos = el.scrollLeft;

    const half = () => el.scrollWidth / 2;
    const hold = (ms = 1400) => (holdUntil = performance.now() + ms);

    const frame = (now: number) => {
      // Clamp dt so a backgrounded tab doesn't jump the strip on return.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const h = half();

      if (hovering || dragging || now <= holdUntil) {
        // Someone else is moving it — follow along rather than fight them.
        pos = el.scrollLeft;
      } else {
        pos += speed * dt;
        // Forward wrap only. Backward wrap is handled in the drag handler,
        // where we can adjust before the browser clamps at 0 — doing both here
        // makes the two wraps chase each other every frame.
        if (h > 0 && pos >= h) pos -= h;
        el.scrollLeft = pos;
      }

      raf = requestAnimationFrame(frame);
    };

    const onEnter = () => (hovering = true);
    const onLeave = () => (hovering = false);

    const onPointerDown = (event: PointerEvent) => {
      // Touch gets the browser's own momentum scrolling, which feels better
      // than anything we'd hand-roll.
      if (event.pointerType === "touch") return;
      dragging = true;
      dragFrom = event.clientX;
      el.setPointerCapture(event.pointerId);
      el.classList.add("is-dragging");
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - dragFrom;
      dragFrom = event.clientX;
      const h = half();
      let next = el.scrollLeft - dx;
      if (next < 0 && h > 0) next += h; // wrap before the browser clamps to 0
      el.scrollLeft = next;
    };

    const endDrag = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      hold();
      el.releasePointerCapture?.(event.pointerId);
      el.classList.remove("is-dragging");
    };

    // Native scrolling (trackpad, touch) should also hold the auto-advance.
    const onWheel = () => hold();
    const onTouchStart = () => hold(4000);
    const onTouchEnd = () => hold();

    raf = requestAnimationFrame(frame);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div ref={ref} className={`reel ${className}`}>
      <ul className="reel-track">{children}</ul>
    </div>
  );
}
