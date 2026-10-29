# Icons

Every icon of the site lives here as one SVG file. Use them through
`src/components/Icon.astro` (`<Icon name="clock" class="rc-icon" />`, the name is
the file name without `.svg`); the Markdown plugins use `src/lib/icons.mjs`.
Never paste SVG markup for an icon into a component: add a file here instead.

## Style

- Line icons, no fills except small accents. Rounded caps and joins.
- Grey strokes plus **one** cyan accent (`#1BA1E2`). Grey is `#8a8a8e` on the
  recruiter-page set and `#5a5a5e` on the start-page step set.
- Content icons use a 48 × 48 view box, UI icons 24 × 24 (or smaller) and take
  their colour from `currentColor`.
- Decorative only: the text next to an icon carries the meaning, so icons are
  always `aria-hidden`.

## Catalogue

| Icon | View box | Used on |
| --- | --- | --- |
| `clock` | 48 | Recruiter page: answer within one working day, process step "Answer" |
| `scale` | 48 | Recruiter page: honest assessment |
| `profile` | 48 | Recruiter page: exclusively through you |
| `calendar` | 48 | Recruiter page: availability (calendar with tick) |
| `handshake` | 48 | Recruiter page: loyalty |
| `building` | 48 | Recruiter page: the end client |
| `compass` | 48 | Recruiter page: role, phase, decision scope |
| `sliders` | 48 | Recruiter page: duration, utilisation, start |
| `budget` | 48 | Recruiter page: budget range |
| `feedback` | 48 | Recruiter page: feedback after submission |
| `mail` | 48 | Recruiter page: process step "Request" |
| `check` | 48 | Recruiter page: process step "Approval" (circle with tick) |
| `interview` | 48 | Recruiter page: process step "Client interview" |
| `contract` | 48 | Recruiter page: process step "Contract and start" |
| `swap` | 48 | Recruiter page: arrows between "You get" and "I need" (cyan only) |
| `analyse` | 48 | Start page, approach step 1 |
| `design` | 48 | Start page, approach step 2 |
| `steer` | 48 | Start page, approach step 3 |
| `implement` | 48 | Start page, approach step 4 |
| `book-call` | 24 | Floating contact button "Book a call" |
| `message` | 24 | Floating contact button "Send a message" |
| `external` | 12 | Arrow after every external link (components, Markdown, content blocks) |
| `tick` | 18 | Content block `pro-contra`, pro items |
| `cross` | 18 | Content block `pro-contra`, contra items |

## Not in this folder

- The logo (`src/components/Logo.astro`, takes props for the inverse variant) and
  the favicons in `public/`.
- Text markers set in CSS (`src/styles/global.css`): `✓`/`✕` in comparison lists
  and the recruiter rules list, `?` in the first-call questions, `+`/`−` on the
  certification list and the `vertiefung` content block.
- Diagrams (`src/assets/diagrams/`), card drawings (`src/lib/card-drawings.ts`) and
  explanatory graphics (`src/assets/blog/`): these are illustrations, not icons.
