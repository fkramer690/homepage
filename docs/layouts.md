# Layouts Fabian liked

Layouts Fabian explicitly approved. Reuse them for similar content before
designing something new, and add new entries here when he approves another one.

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
dashed dividers and a cyan number, instead of one card per question.
Fits: long lists grouped by topic (FAQ-like pages, checklists).
