# Layouts Fabian liked

Layouts Fabian explicitly approved. Reuse them for similar content before
designing something new, and add new entries here when he approves another one.

## Page width (binding for every page)

Chosen 2026-10-29 (variant B of three; Fabian: "wirklich jetzt überall ohne
Lücken umsetzen und auch als Regel festlegen"). Every new page and component
follows it; `scripts/check-layout.mjs` runs in `npm run build` and fails on
violations.

- **One frame for all pages:** `--max: 1280px` minus the gutter, so 1216px of
  content on desktop. Header, footer and every `.container` use it. Never give
  a `.container` (or a class used with it) its own `width`/`max-width`; never
  centre a narrower box inside the frame. Content starts at the logo edge.
- **Two page types,** declared on `<main data-layout>` (prop `layout` of
  `src/layouts/Page.astro`):
  - `reading`: blog articles, service pages, masterclass chapters, questions,
    speaking, certifications, legal pages. Page head (back link, eyebrow, h1,
    lead/meta) spans the frame. All running text sits in
    `src/components/ReadingGrid.astro`: text column `--measure` (740px, about
    70 characters per line) on the left, sticky side column `--side` (300px) on
    the right with "Inhalt" (links to the h2 sections) and the booking box
    "30 Minuten, kein Pitch". Structured blocks (cards, grids, comparisons) may
    span the frame above the grid, as on the service pages.
  - `wide`: start page, overviews (blog, services, masterclasses), partner and
    recruiter pages, 404. Grids and cards use the full frame; running text in
    them keeps its own `ch` limit; no `.prose` on wide pages.
- **Below 960px** the side column disappears and the text uses the full width
  (max. `--measure`); phones look as before.

## Compact cross list in a white box ("Damit es für beide fair bleibt")

Approved 2026-10-29 ("perfekt"), live on `/partner/recruiter/` and
`/en/partners/recruiters/`, at the end of the section "Der Deal".

- One white box (`.rc-rules`, thin border, standard radius), heading `h3`, one
  short intro sentence in grey.
- Below it a list in **two columns** on desktop, one column on phones
  (`.rc-rules-list`, CSS `columns: 2`).
- Each item starts with a small cyan **✕**, then a **bold lead-in with colon**
  and one or two sentences of plain text in grey.
- Why it works: ten rules take little space, read like a checklist and do not
  shout. Fabian rejected the earlier version with ten numbered dark cards as too
  big and too harsh.
- Also used for "Typische Ausgangslage" on every service page (2026-10-29).
- Fits: rules, boundaries, "what I do not do", requirements, short criteria lists.

## Two cards with icon lists ("Der Deal")

Same page, directly above. Two cards side by side (`.rc-deal`), the left one
with a cyan top border ("Sie bekommen von mir"), the right one neutral ("Ich
brauche von Ihnen"), a round cyan swap icon between them. Each item: line icon
from `src/icons/` on the left, bold title, one or two sentences below.

## Without / with comparison (start page, role section)

Chosen 2026-10-27: two columns, grey ✕ list "without" and cyan ✓ list "with"
(`.compare`).

## Topic tiles + side column + compact list (questions page)

Chosen 2026-10-29 for `/fragen/` and `/en/questions/` (variant A of three; Fabian
found the 14 stacked cards "zu viel untereinander geklatscht"). Five topic tiles
with icon and question count as jump links under the lead. Each group: icon and
title in a sticky left column, the questions on the right as one white box with
dashed dividers and a cyan number, instead of one card per question. Since the
page width rule the groups sit inside the reading column of `ReadingGrid`.
Fits: long lists grouped by topic (FAQ-like pages, checklists).

## Side column + compact row list (masterclass overview)

Chosen 2026-10-29 for `/masterclass/` and `/en/masterclass/` (variant B of three).
Left a sticky side column (`.mc-overview-side`): one-sentence intro, figures in
a row between two lines (masterclasses, chapters, languages), then short ✓ points
with a bold lead-in. Right one white box (`.mc-overview-list`) with one row per
item: icon from `src/icons/`, short name in cyan mono, title, one-sentence
summary, facts right-aligned, arrow; dashed dividers between rows.
Fits: overview pages with a handful of equal items that each lead to their own page.
