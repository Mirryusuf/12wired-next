# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # http://localhost:3000
npm run build          # production build — also the type gate
npm run start          # serve the build
npx tsc --noEmit       # typecheck on its own
```

There is **no test suite and no ESLint config** — nothing is installed for either, and
`next build` skips linting as a result. `npx tsc --noEmit` plus a clean `next build` is
the full automated check. Don't go looking for a test runner.

See `README.md` for content-editing instructions and known content gaps.

## Architecture

Static Next.js 15 App Router site (React 19, Tailwind v4). No database, no API routes,
no runtime data fetching — every route prerenders.

### Content is data, not markup

Everything the site displays comes from `src/data/`. `events.ts` is the one with reach:
each entry generates its own detail page via `generateStaticParams` **and** its
`sitemap.xml` entry. `src/app/sitemap.ts` and `robots.ts` read the same modules, so
adding an event is a one-file change.

### Tailwind v4, no config file

There is no `tailwind.config.js`. Theme tokens (`--color-flame`, `--ease-out-expo`,
`--animate-*`) are declared in `@theme` in `src/app/globals.css`; `display-xl` and
`label` are `@utility` blocks there. A `--animate-foo` token becomes the `animate-foo`
class. Note v4 emits `scale:`/`translate:` as standalone properties, not `transform:` —
`transition-transform` covers them, but hand-written CSS must not assume `transform`.

**Utilities beat `@layer components`.** Tailwind puts utilities in a later cascade layer,
so a rule in `@layer components` cannot override an `animate-*` utility on the same
element — and because `animation` is a shorthand, the utility also re-asserts
`animation-play-state: running`, silently defeating any pause rule. The Moments reel hit
exactly this: it now declares its own `animation` inside the component class instead of
using an `animate-*` utility. Either do that, or use `!important` (which is why the
reduced-motion overrides all carry it).

### The animation system

Three independent mechanisms, deliberately kept apart:

1. **Scroll reveals** — `<Reveal>` stamps `data-reveal="<variant>"` and adds
   `data-visible` on intersection; the from/to pairs are `[data-reveal]` rules in
   `globals.css`. All instances share **one** module-level `IntersectionObserver`.
2. **Pointer parallax** — `<PointerField>` publishes the cursor as `--px`/`--py`
   (-1..1) from an eased rAF loop that pauses when off-screen; CSS leans on those vars
   (`.hero-par-bg`, `.hero-par-mark`, `.intro-tilt`). `<TiltCard>` does the same per-card
   with `--tx`/`--ty`, writing the transform straight from the event and letting a short
   CSS transition smooth it — no rAF, so two dozen cards stay cheap.
3. **Keyframes** — entry/ambient only (marquee, hero zoom, intro spin, fade-ups).

Both looping strips rely on the track being **two byte-identical halves**, so their
spacing lives in each item's padding, never a flex `gap` — a gap also lands between the
two halves, putting the wrap half a gap off and producing a visible jump. The half must
also be at least a viewport wide or a blank gap appears at the seam.

The text marquees use the `marquee` keyframe (`translateX(0)` to `-50%`). The Moments
reel (`<Reel>`) deliberately does **not**: a transform animation cannot be scrolled by
hand, so it is a real `overflow-x: auto` container whose `scrollLeft` the component
advances itself, which leaves touch swipe, trackpad and drag working. Two traps there:
`scrollLeft` rounds on write, so the position must be accumulated in a float field and
only ever written (`scrollLeft += 0.3` per frame reads back unchanged and the strip never
moves); and the forward wrap lives in the rAF while the backward wrap lives in the drag
handler — putting both in one place makes them chase each other every frame.

**Never put a CSS animation and a var-driven transform on the same element.** The
animation wins and the parallax silently dies. Wrap instead: the parallax translate goes
on an outer div, the keyframe animation on the inner one. The glow, the hero background
and the intro tagline/button are all structured this way for exactly this reason.

**`stagger()` lives in `src/components/stagger.ts`, not in `Reveal.tsx`.** Server
components render `<Reveal>` and call `stagger()`; a server component may render a client
*component* but cannot call a function exported from a `"use client"` module. Moving it
back breaks the build at prerender time, not at compile time.

### Intro overlay lifecycle

`<IntroOverlay>` sits in the root layout but is driven from outside React:

- An inline script in `layout.tsx` adds `intro-pending` to `<html>` **before first paint**,
  on `location.pathname === "/"` only, on every real page load. Doing this in React
  instead would flash the home page first. Client-side navigation back to `/` does not
  re-trigger it, which is intended.
- `<html>` carries `suppressHydrationWarning` **because of that script** — the server
  markup intentionally differs from the hydrated DOM. Removing it reintroduces a
  hydration error.
- CSS keyed on `html.intro-pending` does the gating: shows the overlay, locks body
  scroll, and sets `animation-play-state: paused` across `main`/`header`/`footer` so the
  page's entrance animations don't play out behind the splash.
- Dismissing removes the class and dispatches `12w:intro-done`. `whenIntroReady()` in
  `intro-ready.ts` is how `<Reveal>` waits for it; anything else that must start "when
  the page is actually visible" should use it too.

The 3D logo is 26 copies of the wordmark PNG stacked backwards in Z under
`transform-style: preserve-3d`, darkened by a `filter` gradient. `--intro-slice` scales
slice depth with the viewport so the extrusion stays ~20% of the logo width everywhere.

What makes it read as solid rather than as a rotating picture is **`perspective-origin`
on `.intro-stage` tracking the cursor** — moving the viewpoint is the cue the eye reads
as walking around an object, and rotation alone never got there. Two supporting choices:
the camera is close (`perspective: 900px`; 1400px looked almost flat), and the glow sits
at `translateZ(-160px)` so the perspective genuinely projects it further away instead of
sliding it around on the logo's own plane.

The specular is one gradient masked to the logo's alpha, swept by the `intro-shine`
keyframes on a plain loop — **deliberately not tied to the pointer**, which was tried and
read as the cursor dragging the highlight around. Its endpoints are calibrated against
`background-size: 220%`: the band centre sits at `1.1 - 1.2*(position/100)` of the logo
width, so `142%` and `-42%` are just off the left and right edges. Change the size and
the endpoints must be recomputed or the glint never crosses the letters.

### Reduced motion softens, it does not stop

`prefers-reduced-motion: reduce` does **not** switch animation off here. The owner's
explicit decision for this site is that the running text, the glint and the hero settle
are part of its identity, so under the preference they keep running at roughly half
speed, reveals travel a fraction of the distance, and pointer parallax drops to ~35%
amplitude (scaled in JS inside `PointerField`, `TiltCard` and `IntroOverlay`). The
override lives in one `@media` block at the bottom of `globals.css`.

This was arrived at after two stricter versions: a blanket `*` rule that killed every
transition site-wide, and a targeted `animation: none` list. Both left the site looking
dead rather than calm on machines with the OS setting on. If you need strict behaviour
back, swap the duration overrides in that block for `animation: none !important` and zero
the JS amplitude — but don't do it silently, it is a deliberate product decision.

## Verifying visual work

Two traps that cost real time here:

- **Headless Chrome reports `prefers-reduced-motion: reduce` by default**, so
  `--screenshot` captures the static fallback and animations look broken when they are
  fine. Drive Chrome over CDP instead (Node 22 has a global `WebSocket`): launch with
  `--remote-debugging-port`, `PUT /json/new`, then `Emulation.setEmulatedMedia` with
  `prefers-reduced-motion: no-preference`. `Input.dispatchMouseEvent` drives the pointer
  effects and `Runtime.evaluate` reads back `getComputedStyle(...).transform` — comparing
  that at two cursor positions proves an effect is live far better than eyeballing.
- **Don't pipe `next build` into `head`.** Closing the pipe early SIGPIPEs the build
  mid-write, leaving a `.next` that looks complete but is missing chunks; `next start`
  then dies with `Cannot find module './770.js'`. Redirect to a file and tail it instead.
- **Never leave `next dev` running while testing `next start`.** Dev recompiles into the
  same `.next`, silently clobbering the production build; `next start` then 500s on
  routes with nothing in its own log. Free the port first
  (`Get-NetTCPConnection -LocalPort <p> -State Listen` → `Stop-Process`), then
  `rm -rf .next && npm run build`.
