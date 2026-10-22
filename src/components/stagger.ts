/**
 * Index-based delay for staggering sibling <Reveal> elements, capped so long
 * grids don't leave the last items waiting seconds.
 *
 * Lives outside Reveal.tsx because that file is "use client" — server
 * components can render a client *component*, but cannot call a function
 * exported from a client module.
 */
export function stagger(index: number, step = 70, max = 8) {
  return Math.min(index, max) * step;
}
