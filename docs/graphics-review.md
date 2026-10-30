# Graphics review (Grafik-Bewertung)

Fabian rates every graphic on the site. The register `docs/graphics-review.json`
says for each graphic whether it is rated and how; `scripts/check-graphics-review.mjs`
runs in `npm run build` and fails when a graphic is missing from it. So a new graphic
can never slip past the review, and it is always clear what was rated and what was not.

## Ratings

| Rating | Meaning | What follows |
|---|---|---|
| 1 | Super | Becomes a reference: entry in `docs/layouts.md`, reuse it for similar content |
| 2 | Okay, could be better some day | Stays as it is; listed below under "Rated 2" |
| 3 | Not good enough | Todo in `docs/backlog.md` ("Grafiken verbessern") |
| `null` | Open, not rated yet | Goes into the next review round |

## Register

One entry per graphic, keyed `<kind>:<name>`:

```json
"block:kennzahlen": {"title": "Kennzahlen", "proposal": 1, "rating": 1, "ratedOn": "2026-10-30", "note": "optional"}
```

- `proposal`: Claude's suggestion (1 to 3), shown in the review; `rating`: Fabian's
  decision, `null` until he has rated; `ratedOn`: date of his rating (required once rated).
- Kinds found in the code, checked automatically in both directions (every graphic has
  an entry, every entry has a graphic):
  - `block:` content blocks from `src/lib/content-blocks.mjs`, one entry per block or
    one per variant (`block:hinweis-tipp`, `block:stufen-treppe`)
  - `png:` explanatory graphics in `src/assets/blog/` (DE and EN count as one)
  - `cert:` certification graphics in `src/assets/certifications/` (wide and narrow count as one)
  - `card:` blog card drawings in `src/lib/card-drawings.ts`
  - `hub:` masterclass hub drawings (every masterclass without a photo in `coursePhotos`)
  - `icon:` icons in `src/icons/`
- Kinds kept by hand (the check cannot find them): `layout:` page layouts and patterns,
  `page:` graphic page elements and animations (start page hero, progress line, logo
  band, ...), `og:` preview images. Whoever builds a new layout, page element,
  animation or preview image adds its entry in the same pull request.

## Adding a graphic

Every pull request that adds a graphic adds its entry with `"rating": null` and a
`proposal`. Do not rate on Fabian's behalf: only he sets `rating`. The build prints how
many graphics are still open.

## Review round

When open entries have piled up, or when Fabian asks for it:

1. Screenshot every open entry (German page, desktop) and present them in one overview
   with Claude's proposal and a one-line reason; Fabian rates 1, 2 or 3.
2. Write his ratings and `ratedOn` into the register, 1s into `docs/layouts.md`,
   3s as todos into `docs/backlog.md`, 2s into the list below.

First round: 30.10.2026, overview https://claude.ai/artifact/KusEFgFZ7i7THrd8Lz2FeC (ratings are stored in the page and copied into the register afterwards).

## Rated 2

From the first round (30.10.2026); they stay as they are unless a backlog item says otherwise
(G-numbers in `docs/backlog.md`):

- Layout: speaking page pattern (tabs, figures strip, tiles)
- Content blocks: `hinweis achtung`, `hinweis offen`, `praxis`, `zeitleiste`, `pro-contra`, `vertiefung`
- Explanatory PNGs: make-or-buy-roi, nearshore-team-setup, tool-ownership; with a todo:
  document-builder-workarounds (G8), sfdx-hardis-training-levels (G6),
  which-clouds (G6), winter-27-org-display (G8)
- Certification graphic "basics" (G8), masterclass hub drawings (G7)
- Start page: figures strip, logo band (G9), masterclass list (G10), reference cards (G11)
