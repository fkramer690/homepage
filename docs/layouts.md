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

## Timeline, learning path and topic tabs (masterclass hubs)

Chosen 2026-10-29 for every masterclass hub (variant C of three; Fabian found the
old card grids "sehr erschlagend"). Built in `src/components/MasterclassHub.astro`.

- Deadlines: a horizontal timeline (`.mc-timeline`), one dot per date, the next
  date filled cyan; vertical on phones.
- Chapters: a numbered path in two columns (`.mc-path`), cyan ring with the number,
  bold title and one-sentence summary, a thin grey line connecting the steps.
- Article clusters: topic chips as tabs (`.mc-tab-bar`), one white panel with the
  topic text and the links in two columns; only the chosen topic is open.
- Every section heading gets one or two sentences below it.
- Fits: long, ordered content (courses, step plans) and many links grouped by topic.

## Photos of Fabian

Chosen 2026-10-29 (all seven placements of the mockups). 30 scene photos, 18 motifs,
most in two versions (other shirt or other counterpart). All versions stay in
`src/assets/photos/`; alt texts DE/EN and crop focus in `src/data/photos.ts`;
always rendered through `src/components/Photo.astro` (AVIF/WebP, lazy unless the
photo is above the fold). On one page, vary the versions so shirts and
counterparts do not repeat. The studio portrait and the stage photo stay for
author box, contact, schema and the speaking page.

- Start page hero: portrait in the hall in a framed box right of the text, hidden below 900px.
- Start page "Arbeitsweise": one 3:2 photo above each of the four steps.
- Service pages and questions page: square photo right of the page head, as wide
  as the side column (`.service-head.has-photo`, mapping `servicePhotos`); 16:9 full width below 960px.
- Masterclass overview: 3:2 photo at the top of the side column.
- Masterclass hubs with a photo in `coursePhotos` show it in the hero instead of the layer drawing.
- Freelance architect page: framed photo next to "Aus meiner Praxis".

## Filter side column (blog overview)

Chosen 2026-10-29 for `/blog/` and `/en/blog/` (variant B of three; Fabian wanted
a second filter by author next to the topic). Built in `src/components/BlogIndex.astro`.

- Left a sticky side column (`.blog-filter`, width `--side`): two lists with a
  small mono heading, "Autor" (round photo, name, focus line, count) and "Thema"
  (icon from `src/icons/` per category in `src/lib/categories.ts`, count);
  dashed dividers, the chosen entry gets a cyan left border and grey background.
  Below: number of articles shown and "Filter zurücksetzen".
- Right the article cards in two columns, newest visible one as wide card.
- The filters combine; each list counts within the other one's choice and greys
  out empty entries. An article counts for its author and its `coAuthor`. The
  choice sits in the hash (`#juliane+change-management`), old topic links
  (`#field-service`) still work.
- Below 960px the column becomes a folded "Filter" box above the grid.
- Fits: overviews with many items and two or more filter dimensions.

## Two authors

Chosen 2026-10-29 (box variant C, card variant 1 of three each) for articles with
a `coAuthor`. Fabian did not want two author boxes stacked.

- Author box at the article end (`src/components/AuthorBox.astro` with `coAuthor`):
  one box; on top both round photos overlapping, "Über die Autoren", both names and
  one joint line; below two white cards side by side, one per author, with their
  part in mono caps ("Architektur und Releases", "Menschen und Veränderung"), name,
  one short line, LinkedIn and profile link. Below 560px head and cards stack.
- Blog overview cards: author line with small round photos (28px, overlapping for
  two authors) before the names, for every card.
- Fits: anything written or delivered by two people together.
