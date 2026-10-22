type MarqueeProps = {
  text: string;
  /** Number of copies per track — more copies = tighter repetition. */
  repeat?: number;
  slow?: boolean;
  className?: string;
};

/**
 * Infinite horizontal ticker. The track holds two identical halves and slides
 * by exactly -50%, so the loop is seamless with no JS.
 */
export default function Marquee({
  text,
  repeat = 4,
  slow = false,
  className = "",
}: MarqueeProps) {
  const half = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className="shrink-0 px-6">
      {text}
    </span>
  ));

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* The visual track repeats the text many times; expose it to screen
          readers exactly once. */}
      <span className="sr-only">{text}</span>
      <div
        aria-hidden
        className={`flex w-max ${slow ? "animate-marquee-slow" : "animate-marquee"}`}
      >
        <div className="flex shrink-0">{half}</div>
        <div className="flex shrink-0">{half}</div>
      </div>
    </div>
  );
}
