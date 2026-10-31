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

## Type scale and mono (binding)

Chosen 2026-10-31 (Fabian: "Skala + Mono reduzieren"). Part of the polished design pass.

- **Seven font sizes, nothing in between**, as tokens in `src/styles/global.css`:
  `--fs-xs` 12px, `--fs-sm` 14px, `--fs-ui` 15px, `--fs-base` 17px (running
  text), `--fs-md` 19px (h3, card titles, lead), `--fs-lg` 26px, `--fs-xl` 36px.
  h1/h2 and hero headlines stay fluid (`clamp`). Never write a new `rem`/`px`
  font size outside these tokens. Content blocks (`.cb-*`) still carry their own
  sizes; they move to the tokens in a later step.
- **Mono (IBM Plex Mono) only for eyebrows and uppercase labels, numbers,
  dates and step counters**, always at `--fs-xs`. Links ("Mehr erfahren"),
  meta lines, captions, tags, filter texts, back links and proof bar labels are
  set in Sora.

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

## Quote after a comparison (start page, role section)

Chosen 2026-10-30. A quote must not stand on its own under a list; it sums up one
point that is visibly marked in the list above it. Fabian called both variants good
examples to reuse in blog articles (backlog item 17).

- **Stage band (built, variant B):** mark the matching pair in the comparison (left
  struck through in grey, right bold in cyan-dark), one short lead sentence, then a
  dark band with the photo on the right fading into anthracite and the quote in italic
  white with a cyan bar and a mono attribution line (`.role-quote`, `.compare-hit`).
  On phones the photo sits on top, the quote below. Needs a photo that is at least as
  wide as the photo half of the band.
- **Principle card (variant A, not built):** a dashed cyan line runs from the "with"
  column down into a dark full-width card: round photo (cyan ring), mono kicker
  "Mein Grundsatz", the quote, mono attribution. More compact than the band; fits
  when there is no good wide photo.

Mockups of both: project files `homepage/rolle-zitat/`.

## Topic tiles + side column + compact list (questions page)

Chosen 2026-10-29 for `/fragen/` and `/en/questions/` (variant A of three; Fabian
found the 14 stacked cards "zu viel untereinander geklatscht"). Five topic tiles
with icon and question count as jump links under the lead. Each group: icon and
title in a sticky left column, the questions on the right as one white box with
dashed dividers and a cyan number, instead of one card per question. Since the
page width rule the groups sit inside the reading column of `ReadingGrid`.
Fits: long lists grouped by topic (FAQ-like pages, checklists).

Extended 2026-10-30 (variant B of three, "noch geiler"): the page head moved into the
dark grid area with a booking button (like the service pages), a figures strip
(`.sp-stats`, question and topic counts computed from the data) sits above the topic
tiles, the answers fold away (`<details>` per question, `+` like the blog FAQ, answers
stay in the HTML and the FAQPage schema), and question 14 closes the list as a quote
band (`.role-quote`) before the author box. Texts in `src/data/questions.ts`.

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
- Start page "Ausgewählte Projekte": one wide photo per project panel. The
  "Arbeitsweise" steps have no photos any more (Fabian 2026-10-30: otherwise too
  many photos of him on one page).
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

## Search bar above the articles (blog overview)

Chosen 2026-10-30 for `/blog/` and `/en/blog/` (variant B of three: side-column
field, bar above the articles, full-text result list). Built in
`src/components/BlogIndex.astro`, next to the filter side column.

- Above the article column a 54px search field (`search` icon, "/" shortcut hint),
  below it "Oft gesucht" chips with fixed terms from `t.blog.searchPopularTerms`
  and, while searching, "N Treffer für „…“ × Suche leeren".
- Searches title, description, tags and topic names, every word must match. Hits
  are marked in the card title and description; no wide card while searching.
- Combines with author and topic: the side-column counts follow the search. The
  query sits in `?q=`, the filters stay in the hash.
- Below 960px the bar sits above the folded "Filter" box.
- Fits: overviews with enough items that people look for a term, not a category.

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

## Service pages: dark head and alternating bands

Chosen 2026-10-29 (variant B of three; Fabian found the service pages "komplett
weiß" compared with the other pages). Built in `src/components/ServicePage.astro`
for every service page.

- Page head (back link, note, eyebrow, h1, lead, button, photo) in the dark grid
  area (`.service-hero dark grid-bg`), like the start page and recruiter page.
- Below it full-width bands that alternate white and grey (`.section` /
  `.section.alt`, class `service-band`): starting situation white, "Was ich
  mache / Was Sie bekommen" grey, collaboration steps white; on the change
  management page also the team grey, and the article list grey after the
  reading area. Cards and boxes on grey bands are white.
- The running text, FAQ and author box stay in one white band with the
  ReadingGrid.

## Profile card ("Steckbrief", start page About)

Chosen 2026-10-29 (variant C of three) for "Über mich" and "Warum zuerst 30
Minuten?" on the start page; built in `src/components/Home.astro`, texts in
`about.blocks` and `firstCall` of the i18n files.

- About: left column (`--side`) with the portrait and the facts as small white
  cards (mono label, one line). Right label, name, subtitle, then three short
  blocks between dashed lines, each with a small mono caps heading ("Was ich
  mache", "Projekte" as ✓ list, "Warum unabhängig"), then the links.
- First call: two columns, text and button left, the questions right as
  numbered grey cards with a cyan left border.
- Below 860px everything stacks; the portrait keeps at most 360px.
- Fits: person or company profiles, short "who and why" sections.

## Phase timeline (service pages, "So läuft die Zusammenarbeit")

Chosen 2026-10-29 (variant A of three; Fabian found the service pages "Text an
Text an Text"). Built in `src/components/ServicePage.astro` (`.phase-flow`).

- No cards: each phase gets a cyan ring with a line icon from `src/icons/`
  (frontmatter `phases[].icon`), the number in cyan mono, the title and its text
  in grey below.
- A dashed grey line connects the rings from left to right; below 860px the
  timeline turns vertical with the ring on the left.
- The whole text stays visible; the rings and the line break up the text.
- Fits: three to five ordered steps with one or two sentences each.

## Compact and visual: tabs, figures, tiles (speaking page)

Chosen 2026-10-29 for `/speaking/` and `/en/speaking/` (variant C of three;
Fabian: "kompakt und anschaulich", take it as the example for other pages that
read as list after list). Built in `src/components/SpeakingPage.astro`, content
in `src/data/speaking.ts`.

- **Figures strip** (`.sp-stats`) at the top of the reading column: four figures
  between two lines, dashed dividers, 2 × 2 on phones. Compute the numbers from
  the data, never type them by hand.
- **Tabs, one item open** (`.sp-tabs` with `.mc-tab-bar` / `.mc-tab-panel`, radio
  inputs, no script): the chips carry a short name and a count. Inside the panel:
  title, running text left and a narrow column right with the stations as a small
  vertical timeline (`.sp-stops`) and the video link with the `play` icon
  (`.sp-play`); below, the key points as three numbered grey tiles (`.sp-points`).
  All panels stay in the HTML for search engines.
- **Icon row box** (`.sp-more`): one white box, one row per item with a 40px icon,
  bold title, one or two sentences and an optional link; dashed dividers.
- **Topic tiles** (`.sp-topics`): three white tiles with icon and short bold text,
  one column on phones; below them the formats as cyan outline chips
  (`.sp-formats`), each with a full sentence above.
- Fits: any page that stacks several equal items (talks, offers, references) with
  a few facts each, and short lists that read better as tiles or chips.

## Pillars with roof and base (DevOps service page, "Eine gute Salesforce-Pipeline")

Chosen 2026-10-29 after two rounds (four narrow tiles and a 2 × 2 grid were "not
good enough"); Fabian: "merk dir die Grafik, die ist richtig gut geworden".
Content block ```saeulen (see `docs/content-blocks.md`), CSS `.cb-pillars`.

- Four pillars in one row, each with a cyan top line, a line icon from
  `src/icons/` and the number in grey mono, then a one-word title, a cyan mono
  line with the core ("Bei jedem Pull Request") and one full sentence.
- Title, cyan line and text start at the same height in every pillar (subgrid),
  all pillars end together.
- A dark roof bar names the whole ("Eine gute Salesforce-Pipeline"), a grey base
  bar what it stands on ("Auf der Git-Plattform des Kunden").
- On phones the pillars stand below each other with the icon on the left.
- Fits: three to five equal principles or building blocks of one thing, not a sequence.

## Project in focus (start page, "Ausgewählte Projekte")

Chosen 2026-10-30 (graphics review G11) instead of the card slider: no new icons and
no square tiles, because the services section already uses them. Built in
`src/components/Home.astro` (`.rf`), texts in `references.items` of the i18n files,
photo and crop per project in `refPhotos`.

- **Numbered list left, one panel right** (radio tabs, no script): the list shows
  number, sector and title; the active row gets a white background and a cyan left bar.
  On phones the list becomes swipeable chips with short names (`short`).
- **Panel:** wide photo of Fabian (own `focus` per project so heads stay whole), then
  number and sector, title, a definition list *Ausgangslage / Meine Rolle / Ergebnis*
  (outcome line darker) and the stack tags. All panels stay in the HTML.
- The About section no longer repeats the projects; it links up to them.
- Fits: any section with a few cases that each need context, role and result.

## References from the graphics review (30.10.2026)

Rated 1 by Fabian in the first graphics review (register `docs/graphics-review.json`,
process `docs/graphics-review.md`). All layouts above were confirmed as 1 except the
speaking page pattern, which he rated 2 (still fine to reuse, no longer the first choice).

- **Content blocks:** `kennzahlen` (big figure, one line, source below: the model for
  every figure), `vergleich` (cyan "with" column), `hebel` (lever cards with result line),
  `eintrag` (decision log with dark head row), `hinweis tipp`, `stufen treppe` (staircase
  with "source of truth" band; Fabian would like the pillars animated, backlog G7).
- **Explanatory graphics (PNG):** `agentforce-adoption` (four figures, one message),
  `devops-pipeline`, `pull-request-review-split` (machine checks vs. human checks),
  `password-flow-timeline` (deadline highlighted), `field-service-report` (one source fanning
  out to five processes), `casey-or-service-rep`, `agent-context-engine`.
- **Certification coverage graphic** with its own narrow version for phones: the model for
  any wide graphic.
- **Blog card drawings** as a series, the **icon library**, and the **article preview
  images** (`src/lib/og.ts`; logo line to be aligned with the standard image, backlog G4).
- **Start page:** hero with measure lines on the photo, "Arbeitsweise" with icons and
  progress line, service tiles with "Weitere Leistungen" box.
