/**
 * The home page's entrance animations are held while the intro overlay is up —
 * otherwise they play out behind it and are over before anyone sees them.
 * Everything that needs to start "when the page is actually visible" waits on
 * this instead of on mount.
 */
export const INTRO_DONE_EVENT = "12w:intro-done";

/**
 * Runs `callback` once the intro is gone — immediately if it was never due
 * (any route other than home, or no JS flag set). Returns an unsubscribe.
 */
export function whenIntroReady(callback: () => void): () => void {
  if (typeof document === "undefined") return () => {};

  if (!document.documentElement.classList.contains("intro-pending")) {
    callback();
    return () => {};
  }

  document.addEventListener(INTRO_DONE_EVENT, callback, { once: true });
  return () => document.removeEventListener(INTRO_DONE_EVENT, callback);
}
