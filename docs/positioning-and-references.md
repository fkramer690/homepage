# Positioning and references

How the site describes what Fabian does and how it shows proof. Applies to the start page, service pages, the partner and speaking pages, profile texts (LinkedIn, portals, Google and Bing profiles) and every reference or case study. The content rules of the [blog guidelines](blog-guidelines.md) apply as well: plain language, no AI slop, only experience Fabian has confirmed, no client names, never the energy or utility sector.

The rules adopt ideas from three skills on gtmskills.com (category-of-one-positioning, b2b-case-study-production, citation-gap-outreach). They were read, not installed; nothing from them runs in this repository.

## Positioning: a category, not a better offer

Fabian is not one more Salesforce consultant who is a bit better or cheaper. The category is **Salesforce architecture for manufacturers, on the client side**: one architect who works for the manufacturer, not for an implementation partner or for Salesforce, and owns the overall architecture across all partners. If a buyer reads the start page and thinks "another Salesforce partner", the page has failed; if they think "this is a different role", it works.

The category rests on three things that are already on the site and confirmed by Fabian. Keep them consistent everywhere:

| Part | Where it lives | Content |
|---|---|---|
| The reframed problem (old way against new way) | start page, block "The role" (`role` in `src/i18n/<lang>.ts`) | Old way: several partners, one org, nobody owns the whole; every partner signs off their own work. New way: one owner for the overall architecture, independent review before every delivery, "does it belong in Salesforce at all" settled first |
| The audience | hero, tagline (`hero`, `tagline` in `src/i18n`) | Manufacturers (machinery and plant engineering), topics after-sales, service, field service, B2B sales; readers are CIO, IT leadership, Head of CRM/Salesforce |
| The mechanism | service pages, phases on the start page | How the result comes about: inventory, standards all partners follow, reviews, one release process with automated checks. Mechanism before result |

### Rules

1. **Position against the old way, never against a named competitor or partner.** Not "better than agency X", but "without one owner, every partner builds their own piece".
2. **Avoid the shared language of the market.** Before a new headline, lead or profile text goes live, compare it with how implementation partners and freelancers describe themselves. Words every competitor uses do not belong in it: "ganzheitlich", "maßgeschneidert", "End-to-End", "Ihr Partner für", "We help X do Y with Z", "holistic", "tailored", "trusted advisor". The blog guidelines' filler list stays the binding minimum.
3. **Name the buyer concretely.** Manufacturer, the topic (service, after-sales, field service, partner management) and the situation (several partners, migration, tool selection); never "the Mittelstand" or "companies" alone.
4. **Mechanism before result.** A page first shows how the result comes about (steps, checks, documents), then what it brings. A promise without a visible mechanism is only a claim.
5. **Fabian's own words win.** Sentences Fabian said in a call or wrote himself (quotes, LinkedIn posts, his answers in the backlog) are kept as close to the original as the wording rules allow; they are not polished into marketing copy. Example: "Not everything that can be built in Salesforce should be built in Salesforce."
6. **Category language is repeated, not varied.** Once a phrase works ("on the client side", "architecture across all partners", "one owner for the overall architecture"), use the same phrase in hero, profiles, author box and talk abstracts. A phrase that needs a paragraph of explanation is dropped.
7. **Nothing invented.** No method name, framework or figure that Fabian has not confirmed. A named method only comes from Fabian's real way of working, with one real proof point per step.

Changes to the category itself (audience, problem, mechanism) are Fabian's decision. New positioning wording starts from an interview with him: per pain point what is broken, why, and what his fix is, in his words (backlog GT1).

## References and case studies

A reference works when a buyer recognises their own situation in the first hundred words and finds the cause and effect plausible to the end. It is written for the sceptical reader who has been burned by a partner before.

### Anonymise without bleaching

Client names never appear next to a reference (the logo band in the references section is deliberately not linked to the project cards, see `src/data/clients.ts`). Drop the identifiers, keep the texture:

| Keep (durable attributes) | Drop or generalise |
|---|---|
| Size band (employees, revenue band, number of countries or users as a range) | Company name, brand, product names of the client |
| Industry segment (machinery, plant engineering, component supplier) | Exact location, plant names |
| Region (DACH, Europe, global) | Exact go-live dates, contract values |
| Situation (several partners, migration from a legacy CRM, field service rollout) | Names of people, partner names unless they have agreed |
| Salesforce products and the shape of the problem | Anything only one company in the market has |

"A mid-sized company improved efficiency" protects the client by making the story worthless. "A machinery manufacturer with 2,000 to 5,000 employees, service in more than ten countries, three implementation partners in one org" (an illustration, not a client) is specific enough for a peer and general enough that nobody can prove who it is.

**Re-identification check before every publication:** Could a competitor, former colleague or journalist name the client from the attributes plus a LinkedIn search for Fabian's project history? If yes, widen a range or drop one attribute.

### Numbers

- At most two numbers per reference, each from the project record and confirmed by Fabian. Everything else is narrative: what changed in operation, who stopped doing what, which meeting got shorter.
- Never round up, never estimate, never "roughly double" a factor of 1.7. A reference without a clean number is published without a number.
- The same number reads the same on every page (start page, service page, profiles); `scripts/check-blog.mjs` does not catch contradictions between pages, so check them by hand.

### Structure

1. Situation in the buyer's words (the problem the reader personally carries: the escalation, the report, the partner nobody can reach)
2. Fabian's role (what he decided, not only what he did)
3. The hard moment: where the project nearly went wrong and what was decided then. A story with a wobble in the middle reads true; a straight line reads like an ad
4. Result: at most two numbers plus the operational change
5. What it means for a similar company (one sentence that links to the matching service page)

### Approval

- Every name, logo, quote and exact figure needs written approval before publication. An anonymised draft speeds up the approval; it does not replace it where an NDA applies. Two references are still waiting for NDA approval (see the open points in project memory); until then they appear only fully anonymised or not at all.
- Never imply a cause and effect Fabian would not defend in front of the client.
- The client should be able to read the reference, confirm every sentence and be comfortable that nobody can prove it is them.

### A series, placed where buyers decide

One reference is an anecdote; five or six are evidence. Plan them as coverage: one per service (architecture, partner management, DevOps, integration, field service, make or buy) or per problem shape, so every buyer finds a mirror. Publish the ones with the strongest confirmed numbers first.

References belong where a buyer is already evaluating: "Project in focus" on the start page, the matching service page, the summary after a first call, the appendix of an offer, a proof line in a LinkedIn message. They are not a weekly LinkedIn series; pushed at followers who are not evaluating, the fifth one reads as repetition.

## Being named where AI answers look (citation gaps)

AI assistants answer buyer questions from a small set of sources: portal profiles, comparison lists, community threads, articles. If fk-sd.de or Fabian is missing there, good pages on the site do not help in those answers. This complements the backlink work; it does not replace it.

- **Where the list comes from:** the KI-Suche runs (`.github/workflows/ai-visibility.yml`) and the SEO-Prüfstand (project files, `seo-standard/skripte/22_zitatluecken.py`) list which domains fed how many answers.
- **Order by answers fed, not by domain authority.** A small portal that feeds nine answers beats a well-known magazine that feeds one.
- **The request matches the source:** portal or directory: create or complete the profile; comparison or list page: ask for inclusion with evidence (real differences, a day-rate range, one reference); article: offer the number or example the page is missing; community: only with a real account and a real answer to a real question, otherwise leave it.
- **Never** pay for placements presented as editorial mentions, never create accounts or order forum posts.
- **Measure before and after:** after each entry, ask the prompts that source fed again (next KI-Suche run) and note the change. If the answers do not move, the entry lacks substance (numbers, comparison, the concrete service): improve it before adding new targets.

The current target list for fk-sd.de is item GT3 in the backlog (project files, see [backlog.md](backlog.md)).
