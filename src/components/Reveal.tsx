"use client";

import { useEffect, useRef, useState } from "react";
import { whenIntroReady } from "./intro-ready";

type Variant = "up" | "fade" | "scale" | "clip" | "left" | "right";

type RevealProps = {
  children: React.ReactNode;
  /** Entrance style — see the [data-reveal] rules in globals.css. */
  variant?: Variant;
  /** Transition delay in ms. Use an index-based value to stagger siblings. */
  delay?: number;
  /** Element to render. Defaults to a div; pass "li" inside lists. */
  as?: React.ElementType;
  className?: string;
};

/**
 * One IntersectionObserver for the whole page rather than one per element —
 * every <Reveal> registers with it and unsubscribes after firing once.
 */
let observer: IntersectionObserver | null = null;
const onVisible = new Map<Element, () => void>();

function observe(el: Element, callback: () => void) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        onVisible.get(entry.target)?.();
        onVisible.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    // Fire a little before the element is fully on screen.
    { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
  );

  onVisible.set(el, callback);
  observer.observe(el);

  return () => {
    onVisible.delete(el);
    observer?.unobserve(el);
  };
}

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  as,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const Tag: React.ElementType = as ?? "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hold off while the intro covers the page — otherwise everything above
    // the fold reveals behind the overlay and is already done on arrival.
    let unobserve: (() => void) | undefined;
    const cancel = whenIntroReady(() => {
      unobserve = observe(el, () => setVisible(true));
    });

    return () => {
      cancel();
      unobserve?.();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={variant}
      data-visible={visible ? "" : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
