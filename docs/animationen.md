# Animierte Grafiken auf fk-sd.de – Vorgehen und Stand

Übergabe aus einer Claude-Sitzung vom 30.10.2026, zum Weiterarbeiten im Claude-Projekt.

## Ziel

Die Homepage fk-sd.de mit animierten Grafiken aufwerten, an Stellen, an denen Bewegung etwas erklärt statt nur zu dekorieren.

## Ablauf und Entscheidungen

1. **Analyse der Startseite.** Inhalt der Live-Seite gelesen und das Repo `fkramer690/homepage` (Astro, GitHub Pages) ausgewertet. Danach gab es eine Rangliste, wo Animation Sinn macht:
   - **Rolle „Ohne / Mit Architekt“** (stärkste Idee): Partner liefern ohne zentrale Verantwortung auf sich kreuzenden Wegen in die Org, mit Architekt läuft alles über einen Knoten und kommt als ein geprüfter Strom an.
   - **Hero:** Die Blueprint-Zeichnung (Maßlinien, Fadenkreuze) zeichnet sich selbst.
   - **Arbeitsweise:** Eine Fortschrittslinie läuft von 01 bis 04, jeder Schritt hellt auf.
   - Nur genannt, nicht gebaut: Kennzahlen zählen hoch, Datenpunkte fließen in der Karte „04 Integration“.
   - **Bewusst keine Animation:** Referenzen (die Logo-Leiste läuft schon), Fotos (kein Ken-Burns-Effekt), Über mich, Erstgespräch, Kontakt, statische Diagramme in Blog und Masterclass.
2. **Entwürfe auf einem Design-Canvas** ("Animationen fk-sd.de", drei Artboards mit echten Fotos und Farben der Seite): https://claude.ai/artifact/11YmTg7Q9AZvooM6JUPLfR
3. **Fabians Entscheidung:**
   - Hero: ja.
   - Arbeitsweise: ja.
   - Rollen-Grafik: nicht auf die Startseite, sondern auf Unterseiten. Nach Sichtung der Leistungsseiten und Blogartikel gewählt: Leistungsseite **Partnersteuerung** und Blogartikel **„Warum Pull-Request-Reviews in Großprojekten Pflicht sind“**.
4. **Umsetzung direkt im Repo** über eigene Branches und Pull Requests. Vor jedem Push lief `npm run build` mit allen Prüfskripten.

## Stand

| PR | Inhalt | Status |
|---|---|---|
| [#190](https://github.com/fkramer690/homepage/pull/190) | Hero-Blueprint animiert, Fortschrittslinie in der Arbeitsweise | gemergt (Squash) |
| [#191](https://github.com/fkramer690/homepage/pull/191) | Inhaltsbaustein `partnerfluss` auf Partnersteuerung und im PR-Review-Artikel (DE/EN), Hero-Korrektur | offen, wartet auf Merge |

**Hero-Korrektur in #191:** Beim Prüfen im Browser zeigte sich, dass die animierten Maßlinien aus #190 größtenteils hinter dem Foto und unter der Kopfzeile lagen. Die Maßlinien hängen jetzt am Fotorahmen (oben, rechts, Fadenkreuz unten links). `Blueprint.astro` ist wieder wie vor #190. Die Hintergrundzeichnung bleibt im Hero nur auf schmalen Bildschirmen (unter 900 px), wo das Foto ausgeblendet ist.

## Technische Umsetzung (wo was liegt)

Animierte Grafiken sind **keine Dateien in `src/assets/`**. Sie sind Inline-SVG bzw. HTML im Code, die Bewegung ist CSS.

Gründe dafür:
- Ein `<img>` kann nicht beim Scrollen starten.
- Ein `<img>` kann Deutsch und Englisch nicht aus einer Vorlage liefern.
- Bei einem `<img>` sieht `scripts/check-graphics.mjs` die Beschriftungen nicht.
- `src/assets/diagrams/` ist der generierte Ausgabeordner von `render-diagrams.mjs` (Dateinamen sind Hashes).

### Hero

- **Markup:** `src/components/Home.astro`. `figure.hero-photo.is-measured` enthält die Spans `hm-top`, `hm-side`, `hm-dot` und `hm-cross`. Die Section trägt die Klasse `has-measure`.
- **Styles:** `src/styles/global.css`, Abschnitt „Measured portrait“.
- **Ablauf:** Die Maßlinien zeichnen sich einmal beim Laden, danach läuft ab und zu ein Punkt über die obere Linie.

### Arbeitsweise

- **Markup:** `Home.astro`. Ein IntersectionObserver setzt `js-progress` / `is-visible` auf `#approach .steps`.
- **Styles:** `global.css`, Abschnitt „Progress line“. Eine durchgezogene Linie läuft über die vorhandene gestrichelte Linie, die Schritte hellen nacheinander auf, das Ganze einmal pro Seitenaufruf.

### Partner-Grafik

Neuer Inhaltsbaustein, Nr. 14 in `docs/content-blocks.md`:

````
```partnerfluss review
ohne: Ohne Review | Jedes Team deployt auf eigenem Weg, Konflikte fallen erst in UAT oder Produktion auf.
mit: Mit Pull-Request-Review | Jede Änderung geht durch ein Review, bevor sie in die Org kommt.
```
````

- **Varianten:** `architekt` (EN `architect`) oder `review`. In EN-Dateien heißen die Schlüssel `without:` und `with:`.
- **Feste Beschriftungen pro Sprache:** Partner A, Partner B, Partner C, Interne IT bzw. Internal IT, Salesforce Org, Architekt/Architect bzw. Review.
- **Logik:** `src/lib/content-blocks.mjs` (`parsePartnerFlow`, Validierung, `partnerFlowSvg`).
- **Styles:** `global.css`, Abschnitt „Partner flow“.
- **Grafik-Prüfung:** In `scripts/check-graphics.mjs` ist die Klasse `pf-drawing` eingetragen.
- **Farben:** Die Konfliktmarker sind anthrazit, weil die Baustein-Regeln nur die Farben der Seite erlauben.
- **Eingesetzt:**
  - `src/content/services/de/partnersteuerung.md` und `en/partner-governance.md`, unter dem Einleitungsabsatz.
  - `src/content/blog/de/warum-pull-request-reviews-pflicht-sind.md` und `en/why-pull-request-reviews-are-a-must-in-enterprise-projects.md`, am Ende des Abschnitts „Warum brauchen Großprojekte Reviews …“.

### Für alle Animationen

- Bei `prefers-reduced-motion` gibt es keine Bewegung, nur das fertige Bild.
- Ohne JavaScript bleibt die Arbeitsweise einfach sichtbar.

### Masterclass-Kopfzeichnungen, Treppe und Säulen (G7, 30.10.2026)

- **Kopfzeichnungen** (`MasterclassHub.astro`, `global.css` Abschnitt „Hub drawing“): bauen sich einmal beim Laden auf, Schritt für Schritt (`mc-step`, `--i`), ADKAR-Stufen wachsen aus dem Boden, der Akzent wird zuletzt cyan. Fabian wählte Variante A; ein umlaufender Punkt sah ihm zu billig aus.
- **Treppe und Säulen** (`src/components/BlockMotion.astro` in `Page.astro`): bauen sich beim Reinscrollen einmal langsam auf. Fabian wollte beide ruhiger als im ersten Entwurf.
- Mockups: `/mnt/project-files/homepage/masterclass-animation/` im Projektordner.

## Offene Punkte und Ideen

- **#191 mergen.** Danach live auf `/leistungen/partnersteuerung/`, `/en/services/partner-governance/` und in beiden Fassungen des PR-Review-Artikels prüfen.
- **Kennzahlen-Leiste:** Zahlen beim Reinscrollen hochzählen lassen. Noch nicht gebaut.
- **Karte „04 Integration“:** Datenfluss zwischen SAP, MuleSoft, Genesys und Teams. Noch nicht gebaut.
- **Weitere Kandidaten für `partnerfluss`:** Artikel zur Sandbox-Strategie für mehrere Partner und zu Center-of-Excellence-Calls, DevOps-Leistungsseite („Wie passt das zu mehreren Partnern?“). Dabei die Regel „höchstens ein Baustein je 250 Wörter, vier immer erlaubt“ beachten.
- **Alter Rollen-Mockup auf dem Canvas:** Er ist inhaltlich ersetzt, kann aber als Vorlage für Social-Media-Loops (LinkedIn) oder Vortragsfolien dienen.

## Hinweise zum Weiterarbeiten

- Repo-Regeln stehen in `CLAUDE.md`, `README.md` („Where files go“), `docs/layouts.md`, `docs/content-blocks.md` und `docs/blog-guidelines.md`.
- Der Build (`npm run build`) prüft Inhalte, Links, Sitemap, Titel, Layout, Grafiken und den Hauptordner und bricht bei Verstößen ab. Diese Prüfungen nie aufweichen.
- Arbeitsweise in dieser Sitzung: ein Branch pro Thema, Pull Request mit deutscher Beschreibung, Fabian mergt. #190 wurde per Squash gemergt.

## Erklärgrafiken (G6, 30.10.2026)

Die PNGs devops-pipeline, well-architected-mapping, which-clouds und sfdx-hardis-training-levels sind jetzt Inhaltsbausteine (`pipeline`, `saeulenwechsel`, `basis-addons`, `level`, Nr. 17 in `docs/content-blocks.md`) im dunklen Look der alten PNGs (Fabians Wahl A). Die Abläufe laufen per Script in `src/components/BlockMotion.astro` (Klassen `cx-armed`, `cx-on`, `cx-in`), die Übergänge sind CSS unter „Animated explainers“ in `global.css`. Die Pipeline läuft in Schleife, solange sie sichtbar ist; die anderen einmal. Well-Architected baut sich Säule für Säule auf (Fabians Wahl 1). Entwurf: https://claude.ai/artifact/TnUsJxcnSaBhti3kj1qBu1
