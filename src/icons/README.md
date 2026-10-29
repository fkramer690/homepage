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
| `clock` | 48 | Recruiter page: answer within one working day, process step "Answer"; proof bar: years |
| `scale` | 48 | Recruiter page: honest assessment |
| `profile` | 48 | Recruiter page: exclusively through you |
| `calendar` | 48 | Recruiter page: availability (calendar with tick) |
| `handshake` | 48 | Recruiter page: loyalty; questions page group "Ownership and partners" |
| `building` | 48 | Recruiter page: the end client; proof bar: enterprise projects |
| `compass` | 48 | Recruiter page: role, phase, decision scope |
| `sliders` | 48 | Recruiter page: duration, utilisation, start |
| `budget` | 48 | Recruiter page: budget range; masterclass overview: Revenue Cloud |
| `feedback` | 48 | Recruiter page: feedback after submission |
| `mail` | 48 | Recruiter page: process step "Request" |
| `check` | 48 | Recruiter page: process step "Approval" (circle with tick) |
| `interview` | 48 | Recruiter page: process step "Client interview"; proof bar: teams · developers |
| `contract` | 48 | Recruiter page: process step "Contract and start" |
| `swap` | 48 | Recruiter page: arrows between "You get" and "I need" (cyan only) |
| `analyse` | 48 | Start page, approach step 1 |
| `design` | 48 | Start page, approach step 2 |
| `steer` | 48 | Start page, approach step 3 |
| `implement` | 48 | Start page, approach step 4 |
| `architecture` | 48 | Start page: service card "Architecture & solution design" |
| `partners` | 48 | Start page: service card "Partner governance" |
| `pipeline` | 48 | Start page: service card "DevOps & release management"; masterclass overview: DevOps |
| `integration` | 48 | Start page: service card "Integration"; questions page group "Data and interfaces" |
| `team` | 48 | Start page: further services, "Project management & nearshore" |
| `license` | 48 | Start page: further services, "Make-or-buy & licence forecasts" |
| `change` | 48 | Start page: further services, "Change management" |
| `badge` | 48 | Start page proof bar: certifications |
| `unlinked` | 48 | Start page proof bar: no ties to vendors or partners |
| `target` | 48 | Questions page group "Goal and deadline" |
| `gear` | 48 | Questions page group "Operations" |
| `lessons` | 48 | Questions page group "Finally" (flag with cross) |
| `ai` | 48 | Masterclass overview: AI & Agentforce |
| `factory` | 48 | Masterclass overview: Manufacturing Cloud |
| `cart` | 48 | Masterclass overview: B2B Commerce |
| `field-service` | 48 | Masterclass overview: Field Service (service van with wrench) |
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
