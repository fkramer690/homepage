# Content blocks (library)

Fourteen building blocks that loosen up blog articles and masterclass chapters. They are written in Markdown as a fenced code block whose language is the block name, so articles stay free of HTML. `src/lib/content-blocks-plugin.mjs` turns them into markup at build time (logic in `src/lib/content-blocks.mjs`, styles under "Content blocks" in `src/styles/global.css`), and `scripts/check-blog.mjs` validates them. Rules for when to use them: "Content blocks" in [blog-guidelines.md](blog-guidelines.md).

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

## 9. Stufen (stage tiles)

Three to seven stages of a model in one row, `Letter | Name | Subtitle | Question`. A trailing `*` marks the stages the cases below refer to (cyan frame). Optional zero to three cases `fall: Title | situation | consequence` (EN `case:`) as grey cards with a cyan left bar. Approved by Fabian 2026-10-29 for ADKAR on the change management page; fits models such as ADKAR or maturity levels. Look (Fabian chose the "Pfeilkette" 2026-10-30): letter and name sit in one continuous chain of arrow heads (light cyan, marked stages full cyan with white text), subtitle and question stand below without a frame, separated by thin lines; on mobile the chain runs downwards.

````
```stufen
A | Awareness | Bewusstsein | Warum ändert sich etwas? *
D | Desire | Bereitschaft | Will ich mitmachen?
K | Knowledge | Wissen | Wie geht es?
fall: Es fehlt Awareness | Ein Vertriebsteam weiß nicht, wofür die Daten gebraucht werden. | Das erklärt der Vertriebsleiter, nicht der Trainer.
```
````

Variant `treppe` (staircase), approved by Fabian 2026-10-29 for the maturity stages in DevOps chapter 1: the tiles rise in equal steps, the risk sits in its own row below so the steps stay proportional. Each stage `Number | Name | Subtitle | Description | Risk` (the subtitle is a short mono line such as the chapters), a trailing `*` gives the tile a grey background. Optional zero to three bands `band: 1-2 | Text` below the risk row (a trailing `*` makes the band cyan), then the cases as above.

````
```stufen treppe
1 | Klicks und Change Sets | Kapitel 1 | Im Setup oder per Change Set, von Hand | Überschreiben, keine Historie
2 | Repository als Ablage | Kapitel 2, 3 | Weiter von Hand, Git ist eine Kopie | Repository und Org laufen auseinander
3 | Pull Requests mit Prüfung | Kapitel 4, 5, 6 | Review und Validierungs-Deployment je Pull Request | Prüfungen werden umgangen *
band: 1-2 | Quelle der Wahrheit: die Org
band: 3-3 | Quelle der Wahrheit: das Repository *
fall: Von Stufe 2 zu 3 | Die Quelle der Wahrheit wandert ins Repository. | Direkte Änderungen in der Org sind ab dann ein Fehler.
```
````

Animation of the variant `treppe` (Fabian 2026-10-30, kept slow on purpose): when the staircase scrolls into view the steps rise one after another, then the risk row and the bands appear; once per page view (`src/components/BlockMotion.astro`, CSS in `global.css`). Reduced motion or no script: the still picture.

## 10. Vergleich (without / with)

Two columns like the start page comparison: `ohne: Title` (EN `without:`) with grey crosses, then `mit: Title` (EN `with:`) with cyan ticks and a cyan frame, two to five `- points` each. Approved by Fabian 2026-10-29. Use it for before and after; for a decision use `pro-contra`.

````
```vergleich
ohne: Einmal im Quartal ein großes Paket
- Fachbereiche sehen Änderungen erst in Produktion.
- Probleme aus dem Alltag landen in E-Mails.
mit: Kleine Releases mit festem Weg
- Fachbereiche wissen vor dem Release, was sich ändert.
- Rückmeldungen kommen auf festem Weg in den Backlog.
```
````

## 11. Hebel (lever cards)

Two or three levers side by side as cards of equal height: `Title | effect`, then the description on an indented line. The label "Hebel 01" / "Lever 01" is added automatically, the effect stands at the bottom of the card behind a dashed line. Only effects that the description or the page states. Approved by Fabian 2026-10-29 for the licence levers on the make-or-buy service page.

````
```hebel
Der Lizenztyp | Leicht sechsstellig pro Jahr bei großer Nutzerbasis
  Volle Lizenzen werden oft standardmäßig angeboten, auch für Nutzer, die nur Daten lesen oder Datensätze freigeben.
Der Zeitpunkt | Produkte für zwei bis drei Jahre für wenig Aufpreis
  Zum Ende des Geschäftsjahres des Herstellers oder bei Aktionen gibt es oft Spielraum.
```
````

## 12. Eintrag (log entry)

One entry of a log or register as a card: dark head with the title after the block name and the label "Eintrag" / "Entry", then two to six `Field | value` rows on the grid. A trailing `*` marks at most one row (cyan dot). Optional last line `fazit:` (EN `note:`) at the bottom in cyan. Approved by Fabian 2026-10-29 for the decision log on the architecture service page; use it to show what a deliverable looks like, not for invented example data.

````
```eintrag Entscheidungslog
Entscheidung | Was wurde entschieden?
Optionen | Welche Wege standen zur Wahl?
Folgen | Was bedeutet die Entscheidung später? *
fazit: Fragt zwei Jahre später jemand, warum ein Prozess so gebaut wurde, steht die Antwort hier.
```
````

## 13. Säulen (pillars)

Three to five pillars in one row, each `icon | Name | Subtitle | Text`. The icon is a file name from `src/icons/`, numbers are added automatically. Keep the name to one word or two (it must fit one line in a quarter of the text column), the subtitle short and the text one full sentence. Optional `dach: Title` (EN `roof:`) as a dark bar above and `basis: Title` (EN `base:`) as a grey bar below. Title, subtitle and text start at the same height in every pillar and all pillars end together; on phones they stand below each other with the icon on the left. Approved by Fabian 2026-10-29 for the pipeline basics on the DevOps service page (with roof and base).

````
```saeulen
dach: Eine gute Salesforce-Pipeline
check | Prüfungen | Bei jedem Pull Request | Ein Validierungs-Deployment, Apex-Tests und Codeanalyse laufen vor dem Review.
gear | Automatisierung | Nach dem Deployment | Was früher von Hand lief, ist Teil des Deployments.
analyse | Review | Für jede Änderung | Menschen prüfen Design und Lesbarkeit.
basis: Auf der Git-Plattform des Kunden
```
````

Animation (Fabian 2026-10-30, slow): when the block scrolls into view the base appears, the pillars grow from it one after another and the roof lands last; once per page view, same script and fallback as the staircase.

## 14. Partnerfluss (partner flow, animated)

Two animated panels side by side: without a central owner, Partner A, B, C and the internal IT deliver on their own crossing paths into the Salesforce org and conflicts flash where they cross; with one, everything runs through a hub and arrives as one checked stream. Variant after the name: `architekt` (EN `architect`, hub "Architekt" / "Architect") or `review` (hub "Review"). The node labels are fixed per language; the file gives each panel a title and a one-line caption as `ohne: Title | caption` and `mit: Title | caption` (EN `without:`, `with:`). Drawing and labels in `src/lib/content-blocks.mjs`, animation under "Partner flow" in `global.css` (still picture with reduced motion), labels checked by `scripts/check-graphics.mjs` (class `pf-drawing`). Approved by Fabian 2026-10-30 for the partner governance service page and the pull request review article; use it only where the text is about several partners or teams delivering into one org.

````
```partnerfluss review
ohne: Ohne Review | Jedes Team deployt auf eigenem Weg, Konflikte fallen erst in UAT oder Produktion auf.
mit: Mit Pull-Request-Review | Jede Änderung geht durch ein Review, bevor sie in die Org kommt.
```
````

## 15. Tabelle (light table)

A comparison or assignment as a light HTML table instead of a table image, so the text stays readable on phones and for search engines. First line `titel:` (EN `title:`), then `spalten: Corner | Column | Column` (EN `columns:`, two to four columns, the corner may stay empty), then one row per line `Row label | cell | cell` (two to eight rows). A trailing `*` marks a cell (light cyan with a cyan bar) or, in the `spalten:` line, a whole column. `Name ~ short name` gives a long column a shorter label for phones. Optional `marke: Word` (EN `mark:`) puts that word as a tag in front of every marked cell, optional `fazit:` (EN `note:`) adds the dashed note below. On phones every row becomes a card with the column names as small labels. Variant `matrix`: marked cells show their text as a solid cyan tag, the others as quiet grey text that phones leave out, for responsibility matrices. Approved by Fabian 2026-10-30 (G5) for the system map on the integration service page, the object ownership matrix and the sfdx-hardis comparison.

````
```tabelle
titel: Systemlandkarte: welches System bei welchen Daten führt
spalten: | Salesforce | ERP
Kunden und Kontakte | Interessenten und Kontakte * | Kunden mit Aufträgen und Rechnungen *
Produkte und Preise | Liest, was der Vertrieb braucht | Meist das führende System *
marke: führt
fazit: Typische Aufteilung. Die Details unterscheiden sich in jedem Unternehmen.
```
````

````
```tabelle matrix
titel: Object Ownership Matrix, vereinfachtes Beispiel
spalten: Objekt | Stream Vertrieb | Stream Service
Account | Verantwortlich * | stimmt sich ab
Case | stimmt sich ab | Verantwortlich *
```
````

## 16. Stärken und Grenzen (strengths and limits)

What a tool does well and where it stops: `titel:` (EN `title:`), two to four strengths `+ Title | text` as tiles with a cyan tick (a trailing `*` highlights one, e.g. the licence), two to six limits `- Title | text` as a compact ✕ list in a white box (headed "Grenzen" / "Limits"), optional `besser: Text` (EN `better:`) as a line "Dafür besser" / "Better suited" below. Approved by Fabian 2026-10-30 (G5) for the Document Builder article.

````
```staerken-grenzen
titel: Document Builder: stark für den Servicebericht vor Ort
+ Unterschrift | Kunde und Techniker, auch offline in der mobilen App
+ Enthalten | in der Field-Service-Lizenz, 250 Dokumente pro Nutzer und Monat *
- Format | nur PDF und nur synchron
- Android | nur Servicetermin
besser: Für Prüfprotokolle und Massenläufe: Salesforce Document Generation oder ein AppExchange-Tool.
```
````

## Confirmed experience (for `praxis`)

Only these, in Fabian's wording, without client names, industry or size:

- Independent Salesforce Enterprise Architect on the client side for manufacturing companies, about 8 years of Salesforce, 20+ enterprise projects.
- Built the release process in one programme: at first every pull request went across his desk, then he handed it over to an internal colleague.
- Introduced sales agreements with actuals from the ERP in Manufacturing Cloud; the ERP interface was a stumbling block.
- Field Service projects with maintenance, breakdown jobs and commissioning, automatic scheduling, spare parts and installed base from the ERP; stumbling blocks: asset data quality, technician acceptance, ERP interfaces.
- Center of Excellence in his largest programme: technical call every two weeks, 60 minutes, only the technical leads of the streams; topics submitted in advance, agenda sent beforehand, a backlog of reserve topics; Fabian chaired it, later an internal colleague.
- Hypercare usually combined with implementing feedback and quick wins, at times up to three months with weekly status calls (confirmed 29 October 2026).
- Training in all common forms, depending on the client: train the trainer via key users, separate training sandbox, training per role (confirmed 29 October 2026).
- Principle: when new processes or systems are introduced, there must be no way back; as long as the old way remains an option, no change happens (Fabian, 29 October 2026).
- Project stories that already stand in articles published before 28 October 2026 (written with Fabian), e.g. the global Manufacturing Cloud rollout with CPQ, configurator and customer portal.
- In one manufacturing project, sales agreements (a core feature of Manufacturing Cloud) were not relevant for the business, so a custom solution on the core platform was cheaper and simpler to maintain (confirmed 23 October 2026, make-or-buy service page).

Add new items here only after Fabian confirms them.
