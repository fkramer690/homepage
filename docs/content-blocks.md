# Content blocks (library)

Eight building blocks that loosen up blog articles and masterclass chapters. They are written in Markdown as a fenced code block whose language is the block name, so articles stay free of HTML. `src/lib/content-blocks-plugin.mjs` turns them into markup at build time (logic in `src/lib/content-blocks.mjs`, styles under "Content blocks" in `src/styles/global.css`), and `scripts/check-blog.mjs` validates them. Rules for when to use them: "Content blocks" in [blog-guidelines.md](blog-guidelines.md).

Design: only the site's own colours and forms (cyan, anthracite, greys, dashed mono labels, cards with a short bar on top, the technical grid). No other colours, no icons beyond the cyan tick and grey cross.

Inside a block, `**bold**`, `` `code` `` and `[links](../slug/)` work; external links get the new-tab mark automatically. Write the block in the language of the file (DE keys like `quelle:` and `titel:` in German files, `source:` and `title:` in English ones; both are accepted).

## 1. Hinweis (note)

One to two short paragraphs that readers must not miss. Variant after the name: `tipp` (cyan bar), `achtung` (anthracite frame), `offen` (dashed frame, label "Schriftlich bestätigen lassen" / "Get it confirmed in writing"). At most two per text.

````
```hinweis achtung
Der OAuth Username-Password Flow für Connected Apps endet am 20.02.2027. Prüfen Sie Ihre ERP-Schnittstellen.
```
````

## 2. Praxis (from my practice)

Label "Aus meiner Praxis" / "From my practice" and the text, on the grid. **Only experience Fabian has confirmed** (see "Confirmed experience" below); never an assumption scenario. At most one per text.

````
```praxis
In einem Programm, das ich begleitet habe, lief anfangs jeder Pull Request über meinen Schreibtisch. Als der Prozess stabil lief, habe ich ihn an einen internen Kollegen übergeben.
```
````

## 3. Kennzahlen (key figures)

Two to four figures as cards, `value | description` per line, plus a `quelle:` / `source:` line (may continue on indented lines). Only figures that are stated and sourced in the text.

````
```kennzahlen
150 € | Revenue Cloud Growth pro Nutzer und Monat
200 € | Revenue Cloud Advanced pro Nutzer und Monat
0,02 | Billing Events pro US-Dollar Rechnungsbetrag
quelle: Salesforce Revenue Cloud Preisseite und Billing Rate Sheet, Stand Oktober 2026
```
````

## 4. Zeitleiste (timeline)

Three to seven dated entries, `date | text`. Dates as `YYYY-MM-DD`, `YYYY-MM` or a release name (`Summer '27`). The build sorts them and highlights the next date after the build day.

````
```zeitleiste
2026-12-01 | SOAP login() braucht die Berechtigung Use Any API Auth
2027-01-01 | E-Rechnungspflicht ab 800.000 Euro Vorjahresumsatz
2027-02-20 | OAuth Username-Password Flow für Connected Apps endet
```
````

## 5. Ablauf (flow diagram)

Three to eight boxes. First assign every box to a system: `sf:` (Salesforce, cyan), `erp:` (ERP such as SAP, anthracite), `ext:` (adjacent process, dashed). Then one edge per line: `A --> B`, `A --Label--> B` (solid) or `A ..> B`, `A ..Label..> B` (dashed, e.g. status back). Keep box labels short (one to three words), edge labels to two to four words.

````
```ablauf
sf: Angebot, Vertrag, Auftrag, Asset
erp: Lieferung, Rechnung FI
ext: Wartung Field Service
Angebot --Freigabe--> Vertrag
Vertrag --> Auftrag
Auftrag --Übergabe per API--> Lieferung
Lieferung --> Rechnung FI
Rechnung FI ..Status zurück..> Auftrag
Auftrag --> Asset
Asset ..> Wartung Field Service
```
````

After adding or changing a diagram run `node scripts/render-diagrams.mjs` (needs the Mermaid CLI and Playwright with Chromium, plus the Sora font installed locally: copy `node_modules/@fontsource/sora/files/sora-latin-{400,600}-normal.woff` to `~/.fonts/` and run `fc-cache`). It writes `src/assets/diagrams/<hash>.svg`, deletes unused ones and **fails if any label does not fit its box with at least 8 px room**; then shorten the label. Commit the SVGs: the build only reads them. If a page still shows an old diagram locally, delete `.astro/data-store.json` (content cache).

## 6. Pro-Contra

Two columns for a decision: `pro: Title`, two to five `- points`, then `contra: Title` with two to five points. Cyan ticks, grey crosses.

````
```pro-contra
pro: CPQ behalten
- Kein Migrationsprojekt, keine Doppelpflege
- Salesforce erzwingt keinen Umstieg
contra: Was Sie dafür aufgeben
- Keine neuen Funktionen mehr in CPQ
- Agenten kommen nur in Revenue Cloud
```
````

## 7. Vertiefung (collapsible detail)

Technical detail for specialists, collapsed by default (no JavaScript, the text stays readable for search engines). Label after the name, first line `titel:` / `title:`, then paragraphs or a `- list`. At most two per text.

````
```vertiefung Für Entwickler
titel: Welche Objekte deploye ich als Daten, welche als Metadaten?
Produktkatalog, Preisprozeduren und Konfiguratorregeln liegen in Revenue Cloud zum Teil als Datensätze vor.
```
````

## 8. Schritte (steps)

Three to six phases of a real sequence: `Title | duration · owner` (the part after `|` is optional), then the description on an indented line.

````
```schritte
Vorbereiten | 4 bis 6 Wochen · Kunde
  Preisführung, Vertragsmodell und Umfang der Historie entscheiden.
Strategie | 2 bis 4 Wochen · Kunde und Partner
  Parallelbetrieb, Reihenfolge der Daten und Cutover-Datum festlegen.
Umsetzen | 3 bis 6 Monate · Partner
  Katalog, Regeln und Preise neu bauen, Daten migrieren, testen.
```
````

## Confirmed experience (for `praxis`)

Only these, in Fabian's wording, without client names, industry or size:

- Independent Salesforce Enterprise Architect on the client side for manufacturing companies, about 8 years of Salesforce, 20+ enterprise projects.
- Built the release process in one programme: at first every pull request went across his desk, then he handed it over to an internal colleague.
- Introduced sales agreements with actuals from the ERP in Manufacturing Cloud; the ERP interface was a stumbling block.
- Field Service projects with maintenance, breakdown jobs and commissioning, automatic scheduling, spare parts and installed base from the ERP; stumbling blocks: asset data quality, technician acceptance, ERP interfaces.
- Project stories that already stand in articles published before 28 October 2026 (written with Fabian), e.g. the global Manufacturing Cloud rollout with CPQ, configurator and customer portal.

Add new items here only after Fabian confirms them.
