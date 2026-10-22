# 12WIRED

Next.js rebuild of [12wired.com](https://www.12wired.com) — a Jakarta-based
artist management and label collective.

## Stack

- Next.js 15 (App Router, React 19)
- Tailwind CSS v4 (theme tokens in `src/app/globals.css`)
- TypeScript, fully static — no database or API

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run start
```

## Structure

```
src/app/                    routes
  page.tsx                  home (Hero / Releases / Events / Moments / About)
  artists/                  artist roster
  event-details/[slug]/     one page per event, prerendered via generateStaticParams
  sitemap.ts, robots.ts     generated from the same data files
src/components/             section + chrome components
src/data/                   all site content lives here
```

## Editing content

Everything shown on the site comes from `src/data/`:

| File          | Drives                                            |
| ------------- | ------------------------------------------------- |
| `site.ts`     | name, tagline, contact details, nav, socials      |
| `releases.ts` | Releases grid (cover art + streaming link)        |
| `events.ts`   | Upcoming tours list **and** the event detail pages |
| `artists.ts`  | `/artists` roster                                 |
| `moments.ts`  | Moments photo strip                               |

Adding an event to `events.ts` creates its detail page and sitemap entry
automatically — the `slug` becomes the URL.

Images live in `public/images/`. Cover art goes in `public/images/releases/`.

## Known gaps

- `artists.ts` is reconstructed from the names appearing in releases and event
  line-ups; several entries have no photo yet and fall back to a `12W` tile.
- `moments.ts` reuses existing site photos — the live Moments gallery loads
  lazily, so those originals weren't available. Swap in the real shots.
