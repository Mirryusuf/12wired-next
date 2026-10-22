"use client";

import { usePathname } from "next/navigation";

/**
 * Replays a short fade on every route change — the `key` remounts the subtree
 * when the pathname changes, which restarts the CSS animation.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}
