# Homepage – Backlog (Stand 05.11.2026)

Einzige gepflegte Fassung des Backlogs. Andere Projekte (z. B. der tägliche Blog-Artikel-Lauf) lesen diese Datei. Das Repo ist öffentlich: keine Kundennamen, NDA-Details, Preise oder internen Notizen hier eintragen.

## Status DataForSEO-Maßnahmen (laufend gepflegt)

Stand 28.10.2026. Grundlage: Ranking-Lauf, KI-Check und OnPage-Crawl vom 28.10.2026 (Dashboard: https://claude.ai/artifact/Qap3hcsJD6EFXHXfKaeQhJ).

| # | Maßnahme | Wer | Status |
|---|---|---|---|
| D1 | Tracking: Ranking wöchentlich, KI-Check und OnPage-Crawl monatlich, Auswertung am 2. | Claude | erledigt (PR #91 bis #97, #100) |
| D2 | Alt-Text Porträt (Autorenbox, Kontakt) | Claude | erledigt (PR #100) |
| D3 | Strukturdaten: FAQ-Fragen mit answerCount und text (434 Seiten) | Claude | erledigt (PR #101) |
| D4 | Field-Service-Artikel verlinken und schärfen: „lohnt sich“ verlinkt Lizenzen und Einführung, Titel beginnen mit „Salesforce Field Service“, EN parallel (= L9, L12) | Claude | erledigt (PR #103) |
| D5 | Manufacturing-Cloud-Artikel auf „Manufacturing Cloud vs. Sales Cloud“ geschärft, FAQ zum Unterschied (= L6, statt eigenem Artikel, damit zwei Seiten nicht um denselben Begriff konkurrieren) | Claude | erledigt (PR #103) |
| D6 | Übersichtsseiten Blog, Leistungen, Masterclasses mit zweitem Einleitungsabsatz (Crawl: zu wenig Text) | Claude | erledigt (PR #103) |
| D7 | Freelancer-Profile nach Marktanalyse (https://claude.ai/artifact/Wzou8L3jKRP7rpTnRyk89w): Pflicht freelancermap, freelance.de, LinkedIn; danach GULP, Malt, XING, Trailblazer-Profil, FRATCH. Überall gleicher Titel und Schwerpunkt (Field Service, Manufacturing, Partnersteuerung). Hinweis: Kein Portal erlaubt einen Link auf die Website, Profile bei GULP und freelance.de sind anonym | Fabian | offen |
| D8 | L1 Partnerauswahl: Antworten auf 4 Fragen (Warnsignal im Angebot, Standardfragen im Pitch, gescheiterte Partnerwahl, Referenzprüfung) | Fabian | erledigt 06.11.2026 |
| D9 | Wirkung prüfen: Positionen von D4 und D5 nach 2 bis 3 Montagsläufen vergleichen | Claude | ab 16.11.2026 |
| D10 | Profil-URLs mit Namen (LinkedIn, XING, Trailblazer, freelancermap, Malt) als sameAs ins Schema, sobald D7 steht | Claude | erledigt 30.10.2026 (PR #215, #217-#219: LinkedIn, XING, Trailblazer, GitHub, GULP, freelance.de, freelancermap, Fratch, Malt; offen: LinkedIn-Firmenseite, Google-Profil) |
| D11 | Seite „Freiberuflicher Salesforce Architect“ (DE `/freiberuflicher-salesforce-architect/`, EN `/en/freelance-salesforce-architect/`): Anlässe, Abgrenzung zum Implementierungspartner, Ergebnisse, Praxisbeispiel, Konditionen, FAQ; im Footer verlinkt | Claude | erledigt (29.10.2026) |
| D12 | Artikel „Salesforce-Freelancer oder Agentur: wann was passt“ (DE + EN, Kategorie Architektur & Partnersteuerung) | Claude | erledigt (29.10.2026) |
| D13 | CV-Download auf der Recruiter-Seite (`/partner/recruiter/`, `/en/partners/recruiters/`) mit Hinweis: Hier liegt immer die aktuelle Version, ältere Versionen bitte nicht mehr bei Kunden einreichen. Lebenslauf gibt es nur in einer Version (Englisch) | Fabian (CV-PDF), dann Claude | erledigt (Download PR #163, Hinweis „immer aktuelle Fassung“ PR #187) |
| D14 | Open CTI (PR #82): Antworten auf 3 Fragen (meister Aufwand im globalen CTI-Rollout und Rolle von MuleSoft und Teams, lief Mirage über Open CTI mit Swyx, Lehre aus dem Rollout als Praxisbeispiel) | Fabian | offen |
| D15 | SAP-Überblick (PR #113, L2): Antworten auf 2 Fragen (war das ERP bei den Sales Agreements mit Ist-Mengen ein SAP, Erfahrung mit SAP Integration Suite statt MuleSoft) | Fabian | offen |
| D16 | Ranking-Auswertung Change-Management-Reihe (Hub und Spokes): Zwischenstand ca. 26.11.2026, Auswertung ca. 24.12.2026 | Claude | ab 26.11.2026 |
| D17 | sameAs-Analyse: Wirken die Profile im Schema (Person: GitHub, GULP, freelance.de, freelancermap, XING, Fratch, Trailblazer, Malt; Organization: Google-Profil)? Prüfen: Knowledge Panel bzw. Entität bei Google für „Fabian Kramer Salesforce“, Nennung von Fabian und fk-sd.de im monatlichen KI-Check, Verweise aus den Profilen in Search Console („Links“) und Cloudflare Analytics, Vergleich mit Stand 28.10.2026 (fk-sd.de in 0 von 40 KI-Antworten). Danach entscheiden, welche Profile gepflegt oder gestrichen werden | Claude | ab 01.02.2027 |
| D18 | Folgeaktionen aus Suchanfragen (07.11.2026): Snippets geschärft (Well-Architected, Prompt Builder, Flex Credits, Manufacturing Cloud vs. Service Cloud), FAQ ergänzt (Sales Planning, Scheduling Console, Lizenzkauf, ServiceMax-Frage nach oben); wöchentliche Liste „Was tun?“ in `stats/actions/` | Claude | erledigt (07.11.2026) |
| D19 | Revenue Cloud: Kannibalisierung bei „CPQ zu Revenue Cloud“ prüfen, sobald `query_page_days` zwei Wochen Daten hat (welche Seite Google pro Anfrage zeigt), dann bündeln wie bei sfdx-hardis | Claude | ab 23.11.2026 |

Ausgangswerte 28.10.2026: „document builder limitations“ (EN) Platz 6, „field service lizenzen salesforce“ 11 (rankt mit „lohnt sich“), „salesforce field service“ 27 (170 Suchen), „field service einführung“ 29 (rankt mit „lohnt sich“), „manufacturing cloud vs sales cloud“ 30, „salesforce field service license“ 38, „salesforce document builder“ 39. KI-Übersichten bei 51 von 52 Begriffen, fk-sd.de in keiner zitiert. KI-Assistenten (ChatGPT, Claude, Perplexity, Google AI Mode): 0 Nennungen.

## Lehren aus dem Google Spam Update September 2026 (Prüfung 02.11.2026)

Grundlage: Video-Analyse der Gewinner und Verlierer des Spam Updates (abgeschlossen 08.10.2026) und Prüfung von fk-sd.de dagegen, Bericht: https://claude.ai/artifact/HqLpKNj5Gj4u9AgrQUEBA3. Schon erfüllt: Aussage und Termin-Button mobil auf dem ersten Bildschirm (Start, Leistungsseiten, Freiberufler-Seite, Masterclass-Hubs), Artikel starten mit den Kernaussagen, Zitat-Test ohne fremde Treffer, kaum Content Drift.

| # | Maßnahme | Impact | Aufwand | Wer | Status |
|---|---|---|---|---|---|
| U1 | Veröffentlichungstempo drosseln: 197 DE-Artikel, davon 146 am 27. und 28.10.2026, passen zum Muster „Scaled Content Abuse“. Bis Ende Januar 2027 höchstens 1 bis 2 Artikel pro Woche, bevorzugt mit Praxis von Fabian (D8, D14, D15). In Search Console (Seiten-Bericht) prüfen, wie viele Artikel indexiert sind; nach 3 Monaten nicht indexierte Artikel in stärkere zusammenlegen | hoch | klein | Claude prüft, Fabian entscheidet | offen |
| U2 | Themen-Hubs für das, was verkauft wird: Field Service (34 Artikel), Manufacturing Cloud (29), Revenue Cloud (27), B2B Commerce (26) haben keine indexierte Hub-Seite, die Blog-Kategorien sind nur #-Filter. Empfohlen: Masterclass-Hubs zu Themen-Hubs ausbauen (Kapitel plus alle Artikel des Themas, gruppiert nach Fragen wie Lohnt es sich, Lizenzen, Einführung, SAP); Alternative: indexierte Kategorieseiten | hoch | mittel | Claude | Field Service umgesetzt 07.11.2026 (Hub /masterclass/field-service/ mit Fragen-Liste, Titel auf „Salesforce Field Service“); Manufacturing Cloud, Revenue Cloud, B2B Commerce offen |
| U3 | Leistungsseiten verlinken ihr Thema: statt 3 automatisch über Tags gewählter Artikel unter FAQ und Autorenbox eine kuratierte Liste (5 bis 8 Artikel plus passende Masterclass) im Lesefluss | hoch | mittel | Claude | offen |
| U4 | Kannibalisierung Masterclass und Blog auflösen, je Paar eine Hauptseite festlegen, die andere kürzen und verlinken: Change-Rollout Länder (Kapitel) und „Change Management weltweiter Rollout“ (8 gleiche Sätze), ADKAR-Diagnose und „Change Management Salesforce-Einführung“ (6), „Releases dem Fachbereich kommunizieren“ und Kapitel „Sponsor und Kommunikation“ (5), Nearshore-Artikel und Leistungsseite (3) | mittel | mittel | Claude | offen |
| U5 | /leistungen/ mobil: erster Bildschirm zeigt nur zwei Absätze, keine Leistung. Zweiten Absatz unter die Karten | mittel | klein | Claude | offen |
| U6 | Content Drift beobachten: Julianes allgemeine Change-Artikel (Change-Kurve, Stakeholder-Analyse, Was ist Change Management) bleiben an Change-Leistungsseite und Blog, nicht auf der Startseite; bei D16 prüfen, ob sie passende Besucher bringen | klein | klein | Claude | ab 24.12.2026 |
| U7 | Messung nach Video-Methode: im Montagslauf die Anzahl Begriffe auf Platz 1 bis 3 zählen und mit den drei stärksten Wettbewerbern aus den SERPs vergleichen (zusammen mit D9) | mittel | klein | Claude | ab 16.11.2026 |

## Information Gain der Blogartikel (Prüfung 03.11.2026)

Grundlage: Prüfung aller 197 DE-Artikel (EN-Paare inhaltlich gleich) auf eigene Erfahrung gegenüber Allgemeinwissen, Bericht: https://claude.ai/artifact/FF5s3rcdih9KbwiyT8xHJq. Googles Leitfaden zur KI-Suche (Mai 2026) gewichtet Inhalte mit eigener Erfahrung höher als „commodity content“. Befund: 101 von 197 Artikeln ohne Satz aus eigener Projekterfahrung, 144 mit angenommenen Szenarien, fast alle aus dem 27. und 28.10.2026. Stark: sfdx-hardis-Training, Manufacturing Cloud „wann lohnt sie sich“, PR-Reviews, Freelancer/CoE/Ownership Matrix, Document-Builder-Workarounds. Schwach: Agentforce-Kosten- und Agentenartikel, Revenue Cloud, B2B Commerce.

| # | Maßnahme | Impact | Aufwand | Wer | Status |
|---|---|---|---|---|---|
| IG1 | Die 15 schwachen Artikel mit den meisten Impressionen aus der Search Console ziehen und pro Artikel 2 bis 3 Fragen an Fabian formulieren (echte Größenordnung, Entscheidung mit Grund, Fehler aus dem Test) | hoch | klein | Claude | offen |
| IG2 | Antworten als Praxis-Kasten und klare Meinung einbauen (DE + EN), in Paketen von 5 Artikeln | hoch | mittel | Fabian liefert Fakten, Claude baut ein | offen |
| IG3 | Dünne Kostenartikel zu Agentforce zu einem starken Artikel zusammenlegen (Flex Credits, AELA, Digital Wallet, Serviceagent-Kosten, MCP-Budgetrisiko), alte URLs weiterleiten; passt zu U1 | mittel | mittel | Claude schlägt vor, Fabian entscheidet | offen |
| IG4 | Artikel ohne Aussicht auf eigene Erfahrung (v. a. Revenue Cloud und B2B Commerce ohne eigene Projekte) auf Kürzen, Zusammenlegen oder noindex prüfen | mittel | mittel | Claude prüft, Fabian entscheidet | offen |
| IG5 | Eigene Daten erzeugen statt Doku zusammenfassen: Tests in einer Dev-Org (z. B. Teilenummern in der B2B-Suche), kleine Umfrage unter Kunden oder LinkedIn-Kontakten | mittel | mittel | Fabian | offen |

## KI-Such-Checkliste (Prüfung 03.11.2026)

Grundlage: „AI Search Checklist“ der Agentur Contact (81 Punkte: Seitenbausteine, Alleinstellung, zitierfähige Texte, Aktualität, Nebenfragen wie Kosten, Dauer, Risiken, Alternativen). Schon erfüllt: Antwort im ersten Absatz, Kernaussagen, Frage-H2, aufklappbare FAQ, Autorenbox, Inhaltsblöcke und Tabellen, eigene Grafiken, sameAs-Profile, dateModified und „aktualisiert am“, llms.txt, Monatsprüfung (J7). Eigene Erfahrung und Daten: IG1 bis IG5. Bewusst weggelassen: Aktualisierung alle 30 Tage und Jahreszahl im Titel (künstliche Aktualität, widerspricht J14), YouTube-Video in jedem Artikel, Wettbewerber namentlich nennen (passt nicht zur Rolle auf Kundenseite), Satzbau-Prüfung „Semantic Triples“.

| # | Maßnahme | Impact | Aufwand | Wer | Status |
|---|---|---|---|---|---|
| KS1 | Leistungsseiten beantworten die Fragen vor einer Anfrage: je Seite „Passt, wenn / passt nicht, wenn“, grober Aufwand und Dauer, was nach dem ersten Gespräch passiert, Alternativen (Inhouse, Partner allein, Freelancer) und wann welche besser passt. Als 2 bis 3 FAQ oder kurzer Abschnitt, Regel in docs/service-pages.md | hoch | mittel | Fabian liefert Aufwand und Dauer, Claude baut ein | offen |
| KS2 | Blog-Richtlinien, Abschnitt KI-Suche: jede H2 für sich verständlich (kein „wie oben beschrieben“, Build-Check auf solche Rückverweise) und Produkte, Funktionen und Releases beim Namen nennen statt „das Tool“ | mittel | klein | Claude | offen |
| KS3 | Auswahl- und Vergleichsartikel (z. B. L1 Partnerwahl) nennen die Kriterien, nach denen die Empfehlung entsteht | mittel | klein | Claude | offen |
| KS4 | Eigenes kleines Werkzeug als zitierfähige Ressource, z. B. Flex-Credits-Rechner oder Make-or-Buy-Check (DE + EN) | mittel | mittel | Claude schlägt vor, Fabian entscheidet | offen |

## Befunde Jev-Analyse und jev-seo-Audit (29.10.2026)

Grundlage: Jev-Lauf (jev-1.14.0) über Start, EN, Leistungen, Freiberufler-Seite und 392 Blog-URLs sowie jev-seo-Audit (450 URLs), beide 29.10.2026. Bericht: https://claude.ai/artifact/4d9jFTDK2EbewV53cLymFN. Fehlalarme ohne Maßnahme: HTTPS-Weiterleitung, 110 kaputte Links und 37 Seiten mit 404 (jev-seo löst relative Links falsch auf), noindex auf Impressum und Datenschutz (gewollt). Reihenfolge nach Impact und Aufwand.

| # | Maßnahme | Impact | Aufwand | Wer | Status |
|---|---|---|---|---|---|
| J1 | E-Mail-Adresse im Kontaktblock der Startseite neben LinkedIn (Jev: direkter Kontakt 0,04; Formular und Bookings decken die meisten Besucher ab, deshalb nur dort) | klein | klein | Claude | erledigt (PR #145) |
| J2 | Vertrauensbelege auf Leistungs- und Masterclass-Übersicht: Kennzahlen und Zertifikate (Jev-Vertrauen Leistungen 1,36 von 4, jev-seo 0,45) | hoch | klein | Claude | erledigt (PR #145) |
| J3 | Kennzahl „8 · 32“ als „32 Entwickler in 8 Teams“ ausschreiben | mittel | klein | Claude | erledigt (PR #145) |
| J4 | Kundenlogos mit width und height gegen Layout-Sprünge (92 Bilder auf / und /en) | klein | klein | Claude | erledigt (PR #145) |
| J5 | EN-Footer: Impressum und Datenschutz als deutschsprachig kennzeichnen | klein | klein | Claude | erledigt (PR #145) |
| J6 | Faktencheck der 17 Artikel mit „unbelegten“ Preisen und Fristen: 108 Sätze mit Salesforce-Quelle gegen die Quellseiten geprüft, alle abrufbaren Zahlen und alle Rechnungen stimmen; Jev folgt keinen Links (Bericht `/mnt/project-files/typesafe/faktencheck-blog-2026-10-29.md`) | mittel | mittel | Claude | erledigt (29.10.2026) |
| J7 | Review-Rhythmus für zeitkritische Artikel (82 % veralten laut Jev in 12 Monaten): `scripts/stale-articles.mjs` plus monatlicher Workflow, der ein Issue „Artikel prüfen“ pflegt (Preise älter als 6 Monate, verstrichene Fristen und Releases); geprüft = `updatedDate` setzen | hoch | mittel | Claude | erledigt (PR #148, Monatslauf seit #165 als Claude-Task) |
| J8 | Kundenstimmen und Ergebnisse je Referenz (= Weitere Ideen 4 und 11), stärkster Hebel für Vertrauen | hoch | mittel | Fabian liefert, Claude baut ein | Backlog, wartet auf Fabian |
| J9 | Blog-Übersicht /blog und /en/blog (je ca. 690 KB HTML, gzip übertragen nur ca. 105 KB): Kartengrafiken außerhalb des Bildschirms nicht rendern (content-visibility) | klein | klein | Claude | erledigt (PR #146) |
| J10 | Ein klarer nächster Schritt auf der Leistungsübersicht (Jev 0,35; bisher kein Button). Die Freiberufler-Seite hat bereits Buttons im Hero und Kontaktbereich | mittel | klein | Claude | erledigt (PR #146) |
| J11 | Kernaussage nach vorn: /partner und vier Artikel (AELA, Buyer Agent WhatsApp, Account Forecasting, Garantieansprüche) | mittel | mittel | Claude | erledigt (PR #150) |
| J12 | Masterclass und Blog abgrenzen: H1 der Hubs Manufacturing Cloud und B2B Commerce auf „vom Business Case bis zum Rollout“ statt der „lohnt sich“-Frage, die die Artikel besetzen (verlinkt sind sie schon) | mittel | klein | Claude | erledigt (PR #146) |
| J13 | Einstiegsartikel für Leser ohne benanntes Problem (nur 4 von 196 Artikeln): [Themenliste mit 14 Vorschlägen](https://claude.ai/artifact/QLb9Ss97LuuwdBYvnn8VSm), Empfehlung Runde 1 mit Nr. 1, 2, 3, 6 und 14; pro Thema braucht es ein Praxisbeispiel von Fabian | mittel | groß | Fabian wählt aus, Claude schreibt | Backlog, wartet auf Fabians Themenauswahl |
| J14 | Veröffentlichungsdaten: 174 von 196 DE-Artikeln tragen 27. bis 29.10.2026. Das sind die echten Daten (Website seit 23.10.2026 online), sie bleiben; nie rückdatieren. „Aktualisiert am“ nur nach echter Prüfung (J7) | mittel | klein | Fabian | entschieden, keine Änderung |
| J15 | Logo-Band: Freigaben der Kunden liegen vor (Fabian, 29.10.2026) | mittel | klein | Fabian | erledigt |
| J16 | /blog/change-management-modelle wirkt generisch (Spezifität 0,38): Praxisbeispiel ergänzen | klein | mittel | Juliane | Backlog, wartet auf Juliane |
| J17 | Relative Links auf absolute Pfade umstellen: 496 Stellen in den Inhalten, im Browser alle korrekt, nur ein Crawler-Fehler | klein | mittel | später | zurückgestellt |
| J18 | PageSpeed-Key (PAGESPEED_API_KEY) besorgen und jev-seo mit Core Web Vitals wiederholen | klein | klein | Fabian | Key als Secret PAGESPEED_API_KEY gesetzt (31.10.2026); monatlicher PageSpeed-Lauf `.github/workflows/pagespeed.yml`, Ergebnisse auf dem Branch stats unter stats/pagespeed/ |
| J19 | HSTS und Sicherheits-Header: bei GitHub Pages nur über vorgeschaltetes CDN möglich | klein | mittel | später | zurückgestellt |
| J20 | 21 tote Quellenlinks (404) in 50+ Artikeln und Kapiteln, meist entfernte Trailhead-Module: 16 durch geprüfte Quellen ersetzt, 5 ohne gleichwertige Quelle neutral formuliert („laut Salesforce“). Die monatliche Prüfliste (J7) meldet künftig tote Links mit | hoch | mittel | Claude | erledigt (PR #151) |
| J21 | Fünf Aussagen ohne gleichwertige Quelle seit #151 gegenlesen (stehen jetzt als „laut Salesforce“): Visualforce-Store weiter unterstützt; Lizenzen und Rechte von Käufer und Buyer Manager; Store-Suche (Standardfelder, alle Begriffe, keine Teiltreffer); Flosum Salesforce-nativ; Beispiel 35/35/30 % und drei Schnitte bei Account Manager Targets | klein | klein | Fabian | Backlog |

Kein Handlungsbedarf: ich/wir auf der Startseite (getrennt nach Fabian, Juliane und gemeinsamem Angebot; „wir“ im Gesprächsabschnitt meint Kunde und Fabian), doppelte Logos (zweite Kopie hat bereits aria-hidden), Antwortzeit über 0,8 s (Einzelwert).

## Lehren aus dem Video „Platz 1 in 48 Stunden“ (Prüfung 05.11.2026)

Grundlage: Video eines SEO-Beraters, wie er eine Suche in 48 Stunden auf Platz 1 bei Google und in der KI-Suche bringt. Schon erfüllt: Kernaussagen oben, Autorenbox mit Foto und Profilen, 2 bis 6 FAQ mit kurzen Antworten, Vergleichstabellen (Blöcke `vergleich`, `tabelle`), Termin-Box in der Seitenspalte, Information Gain (IG1 bis IG5), Tracking und Nachbessern (D1, D9, U7). Bewusst nicht übernommen: „vs“-Seiten gegen Wettbewerber (funktioniert laut Video nur mit bekannter Marke) und viele schnelle Seiten (widerspricht U1).

| # | Maßnahme | Impact | Aufwand | Wer | Status |
|---|---|---|---|---|---|
| R1 | LinkedIn-Artikel als eigener Ranking-Kanal: für die 3 bis 5 wichtigsten Artikel (z. B. L1 Partnerwahl, Field Service lohnt sich, Document-Builder-Grenzen) je einen LinkedIn-Artikel, umgeschrieben statt kopiert (eigener Einstieg, kürzer, anderes Beispiel), mit Link auf den Artikel. Am besten auf der LinkedIn-Unternehmensseite (QB Schritt 7) und vom Profil geteilt. Unterschied zu QB Schritt 8 und Weitere Ideen 5: dort Teaser-Posts, hier vollständige Artikel, die selbst bei Google und in KI-Antworten erscheinen sollen. Wirkung im Montagslauf mittracken | hoch | mittel | Claude schreibt die Fassungen, Fabian veröffentlicht | offen |
| R2 | YouTube als eigener Ranking-Kanal: zu denselben Kernartikeln je ein kurzes Erklärvideo auf einem eigenen YouTube-Kanal, Titel mit dem Suchbegriff, Beschreibung mit Link auf den Artikel. Auf der Website bleibt das Video selbst gehostet (Blog-Richtlinien, keine Cookies), YouTube ist zusätzliche Fundstelle; Kanal-URL kommt als sameAs ins Schema. Videos mit HyperFrames möglich | mittel | mittel | Fabian entscheidet über Kanal und Gesicht im Video, Claude bereitet Skripte vor | offen |
| R3 | Handlungsaufforderung im Artikeltext: bisher nur Termin-Box in der Seitenspalte und Kontaktbereich am Ende. Laut Video wirken zusätzlich zwei kurze Hinweise im Text nach ca. 15 bis 20 % und 30 bis 50 % des Artikels. Umsetzung zentral in `BlogPost.astro` (nach dem n-ten H2-Abschnitt eingefügt, nie per Markdown), Text aus dem Kontakt-Brief des Artikels. Passend zur Suchabsicht: Entscheidungs- und Vergleichsartikel → „Gespräch buchen“, reine Wissensartikel → Material zum Mitnehmen (siehe R4). Vorher Mockup, Fabian wählt | hoch | mittel | Claude, Freigabe Fabian | offen |
| R4 | Material für Wissensartikel (Lead Magnet), damit R3 dort nicht nur „Termin buchen“ anbietet: z. B. Prüfliste Partnerwahl, Field-Service-Readiness-Check oder das Werkzeug aus KS4. Ein Angebot je Kategorie reicht | mittel | mittel | Claude schlägt vor, Fabian entscheidet | offen |
| R5 | Begriffe nach Stärke der Konkurrenz wählen: vor jedem neuen Artikel (L-Liste, B13) mit DataForSEO prüfen, ob unter den Top 10 Seiten mit ähnlicher oder geringerer Domain-Stärke als fk-sd.de stehen. Wenn nur starke Domains ranken: Begriff eher über R1/R2 angehen oder einen spezifischeren Long-Tail-Begriff mit Kaufabsicht („beste X für Y“, „Alternativen zu“, „Erfahrungen“) nehmen. Als Schritt in den `blog-article`-Skill bzw. docs/blog-guidelines.md aufnehmen | mittel | klein | Claude | offen |

## Priorität 1: Artikel aus der Long-Tail-Recherche (DataForSEO, 28.10.2026)

Grundlage: DataForSEO-Recherche vom 28.10.2026 (Google Deutschland, Suchen pro Monat). Auch in Deutschland wird überwiegend mit englischen Produktbegriffen gesucht, deshalb die englischen Begriffe in Titel und Einstieg der DE-Artikel aufnehmen. Alle Begriffe werden ab 2.11.2026 wöchentlich getrackt (seo/keywords.json). Claude entwirft, Fabian gibt frei.

Neue Artikel:
- L1. **Salesforce-Implementierungspartner auswählen** (Fabian 28.10.2026: ganz nach oben). Begriffe: „salesforce implementation partner“ (30), „salesforce partner deutschland“ (20). Arbeitstitel „Salesforce-Implementierungspartner auswählen: 7 Prüffragen“ / „How to choose a Salesforce implementation partner“. Inhalt: Ausschreibung, Warnsignale im Angebot, Referenzprüfung, Vertrag (Teamkontinuität, Tool-Eigentum, Festpreis vs. Aufwand). Verlinken: Partnersteuerung, Festpreis-Artikel, Partnerwechsel/KI-Org-Analyse, Object Ownership Matrix. *Entwurf 06.11.2026 mit Fabians Antworten (D8), ChatGPT-Review.* (Ersetzt S4.)
- L2. **SAP an Salesforce anbinden: Überblick** für IT-Leitung. Begriffe: „sap to salesforce“ (170), „salesforce sap integration“ und Varianten (40). Bündelt die bestehenden SAP-Teilartikel (Manufacturing Cloud, B2B Commerce, Revenue Cloud, Agentforce). (Ersetzt S3.)
- L3. **SAP CRM oder Salesforce** (Wartungsende SAP CRM, Wechselgründe). Begriffe: „sap vs salesforce“ / „salesforce vs sap“ (110). (Ersetzt S2.)
- L4. **Field Service Management Software: wann Salesforce, wann SAP, IFS oder ServiceNow?** Begriffe: „field service management software“ (590), „sap field service management“ (210), „field service management system“ (90). Größtes Volumen, Entscheidungsartikel für CIOs. *Entwurf 31.10.2026 (PR #241).*
- L5. **Was ist Agentforce? Erklärt für die IT-Leitung.** Begriffe: „was ist agentforce“ (20), „what is agentforce“ (20). Definition zuerst, dann Einordnung, Links auf die Agentforce-Artikel. *Entwurf 1.11.2026 (PR #268).*
- L6. **Manufacturing Cloud vs. Sales Cloud.** Begriff: „salesforce manufacturing cloud vs sales cloud“ (10). *Umgesetzt als Schärfung des bestehenden Artikels (D5, PR #103).*
- L7. **Salesforce-Release-Kalender: was die IT-Leitung je Release prüfen muss.** Begriffe: „salesforce release notes“ (90), „salesforce release schedule/cycle/dates“ (je 20). Evergreen-Seite, je Release aktualisieren. *Entwurf 2.11.2026 (PR #269), am 6.11.2026 mit ChatGPT-Review überarbeitet und auf Spring '27 aktualisiert (Preview 8.1., Produktion 16.1./6.2./20.2.2027). Je Release nachziehen.*

Bestehende Artikel nachschärfen (Titel, Einstieg, FAQ um den Suchbegriff ergänzen):
- L8. Salesforce-Lizenzen-Artikel auf „salesforce lizenz kosten“ (20).
- L9. Field-Service-Lizenzen-Artikel auf „salesforce field service license / pricing / license comparison“ (je 10). *Erledigt (D4, PR #103).*
- L10. Manufacturing-Cloud-Add-ons-Artikel auf „salesforce manufacturing cloud pricing“ (10).
- L11. CPQ-Verkaufsende-Artikel auf „salesforce cpq end of life / retirement / replacement“ (je 10).
- L12. Field-Service-Einführung auf „salesforce field service implementation guide“ (10); laut Benchmark rankt für „field service einführung“ bisher der Artikel „lohnt sich“ statt des Einführungsartikels. *Erledigt (D4, PR #103).*

## Blog: Themen aus dem täglichen Lauf (übernommen 28.10.2026)

Der tägliche Lauf schreibt einen Artikel pro Tag (EN + DE) und ergänzt hier neue Ideen. Reihenfolge: zuerst Priorität 1 (L1 bis L7), dann diese Liste. Ideen ohne bestätigtes Praxisbeispiel sind markiert.

- B1. SAP-Thema (Leitsystem für Kunden, Preise, Aufträge) → aufgegangen in L2 und L3.
- B2. Embedded Chat für 12 Sprachen: was ein Proof of Concept klären muss.
- B3. Center of Excellence auf Kundenseite: Format und Rhythmus. *Erledigt (#125).*
- B4. MuleSoft oder Jitterbit: welche Middleware für Salesforce und das ERP? *Braucht Beispiel von Fabian.*
- B5. Salesforce an proALPHA anbinden: was anders ist als bei SAP. *Braucht Beispiel von Fabian.*
- B6. Technische Benutzer mit zu vielen Rechten: Integrationen aufräumen.
- B7. Teams Phone als Telefonie für den Service (Folgeartikel zu Open CTI). *Braucht Erfahrung aus dem CTI-Rollout.*
- B8. Spring '27: was ändert sich für Hersteller? (News, sobald die Release Notes erscheinen, ca. Mitte Januar 2027; passt zu L7.)
- B9. Führendes System pro Objekt: Welches System führt Kunden, Preise und Anlagen, wenn SAP und Salesforce beide Daten halten? (Begriff aus der Homepage-Suche 29.10.2026, kommt auf Schnittstellen- und Architekturseite und in ca. 20 Artikeln vor; Abgrenzung zu L2 klären.)
- ~~B10. Key User~~ (umgesetzt 29.10.2026 als Spoke der Change-Management-Reihe B11). Key User: Was Key User leisten müssen und wie viel Zeit der Fachbereich freistellen muss. (Begriffssuche 29.10.2026; passt als Spoke in die Change-Management-Reihe B11.)
- ~~B11. Change Management nach Prosci/ADKAR als Hub-and-Spoke-Reihe~~ (umgesetzt 29.10.2026, von Fabian freigegeben): Hub „Warum Salesforce-Einführungen scheitern“ plus sechs Spokes (Key User, weltweiter Rollout, Techniker-Akzeptanz Field Service, Release-Kommunikation, Reinforcement bei Partnern, Nutzung messen). Manufacturing-Cloud-Teil 8 und Leistungsseite verlinken den Hub.
- ~~B12. Weitere Change-Management-Spokes (29.10.2026, Keyword-Liste `/mnt/project-files/seo/change-management-keywords.md`): Hypercare-Phase (1.000 + 720 Suchen), Schulungskonzept und Akzeptanz im Vertrieb als Spokes 7 bis 9 umgesetzt.~~ Change-Management-Prozess (320) als Spoke 10 umgesetzt, angewandt auf Salesforce-Projektphasen; Phasen und Modelle allgemein decken Julianes Grundlagenartikel ab (#136).
- B13. **Techniker-Einsatzplanung automatisieren: Schritt für Schritt** / „How to automate technician scheduling and dispatch“ (Idee Fabian 03.11.2026, Kategorie Field Service). Winkel: Anleitung für Head of Service und IT-Leitung, vom manuellen Disponieren zur Automatik in Stufen: Stammdaten als Voraussetzung (Skills, Gebiete, Arbeitszeiten, Anfahrt), Scheduling Policy, automatische Einplanung per Flow, Optimierung über Nacht, Ausnahmen beim Disponenten, Kennzahlen (Termintreue, Fahrzeit, Erstlösungsquote). Begriffe (Volumen vor dem Schreiben mit DataForSEO prüfen): „technician scheduling and dispatch“, „automated dispatch“, „field service scheduling software“, „Einsatzplanung Techniker“, „Disposition Außendienst automatisieren“. Abgrenzung klären (Kannibalisierung, siehe U4): „Field Service: Wie viel Planung darf automatisch laufen?“ (`field-service-scheduling-automation`) deckt die Frage nach dem Maß an Automatik schon ab; neuer Artikel nur als praktische Anleitung, die darauf verlinkt, sonst den bestehenden Artikel auf die Begriffe schärfen. Verlinken: Scheduling Console, Enhanced Scheduling (ESO), Bereitschaft und Schichten, Stammdaten, Lizenzen Dispatcher/Techniker. *Braucht Praxisbeispiel von Fabian; Tempo nach U1.*
- B18. Service Cloud in Salesforce, Außendienst in SAP Field Service Management: was die Schnittstelle vom Fall zum Serviceauftrag leisten muss (Folgeartikel zu L4). *Braucht Beispiel von Fabian.*
- B19. Mobile App für Techniker im Vergleich: Salesforce Field Service App, SAP FSM App und SAP Service and Asset Manager (Folgeartikel zu L4). *Braucht Beispiel von Fabian.*
- B20. Agent Script für Serviceregeln: Garantie, Rücksendung und Seriennummer fest im Agenten statt im Prompt (Folgeartikel zu L5). *Braucht Beispiel von Fabian.*
- B21. Schreibende Agentenaktionen ins ERP: Berechtigung, Plausibilität und Protokoll, bevor ein Agent Liefertermine oder Rücksendungen ändert (Folgeartikel zu L5). *Braucht Beispiel von Fabian.*
- B22. Release Updates im Setup: welche erzwungenen Updates der nächsten Releases Hersteller-Orgs treffen und wie man sie vorab in der Sandbox testet (Folgeartikel zu L7, aus Release Notes recherchierbar).
- B23. Regressionstests für Salesforce-Releases automatisieren: welche Kernprozesse zuerst, wer sie pflegt (Folgeartikel zu L7). *Braucht Beispiel von Fabian.*
- B26. Discovery für Salesforce-Projekte: welche Randfälle vor dem Festpreis auf den Tisch müssen (Folgeartikel zu L1, Begriffe „salesforce discovery phase“, „Fit-Gap-Analyse Salesforce“ vorher prüfen). *Braucht Beispiel von Fabian.*
- B27. Schlüsselperson des Partners geht: Übergabe planen, bevor die Qualität nachlässt (Folgeartikel zu L1). *Braucht Beispiel von Fabian.*

Erledigt im täglichen Lauf: Manufacturing Cloud lohnt sich (#41), Object Ownership Matrix (#42), Salesforce-Lizenzen (#43), Field Service lohnt sich (#44), Nearshore-Teams (#55), Open CTI endet 2028 (#82, Entwurf), Implementierungspartner auswählen (L1, #292). Aus der Begriffssuche vom 29.10.2026: Sandbox-Strategie, Berechtigungskonzept, UAT, Entwicklungsstandards und Definition of Done, Entscheidungslog, globales Template, DORA-Metriken, Dubletten und Stammdaten (ein PR, Entwurf). Entscheider als Engpass im KI-Salesforce-Projekt (Idee Fabian 05.11.2026, Entwurf; Praxisblock aus seiner Nachricht, konkretes Beispiel offen).

## Priorität: Sichtbarkeit und SEO (Audit 26.10.2026)

Technik erledigt in PR #51 (Sitemap, IndexNow, Schema, Titel, interne Links).

Inhalte (Claude entwirft, Fabian gibt frei):
- S1. Landingpages After-Sales und Field Service.
- ~~S2, S3, S4~~ → jetzt L3, L2, L1 oben.
- ~~S5. Seite „Fragen, die ich in jedem Projekt stelle“~~ (umgesetzt 26.10.2026, PR #54, siehe Punkt 3 unten).

Macht Fabian selbst (Quick Wins):
- ~~QA. Google Business Profile (Google-Unternehmensprofil) anlegen: Unternehmen mit Einzugsgebiet, Adresse ausblenden. Anleitung als Video: https://www.youtube.com/watch?v=wYupOi4DIh8~~ (erledigt 31.10.2026; Profil als sameAs der Organisation im Schema)
- QB. LinkedIn abstimmen, Anleitung mit fertigen Texten: https://claude.ai/artifact/7iboGaKLpFfe2wZZkSVeLU
  - ~~Website in Kontaktinfo~~ (erledigt 26.10.2026)
  - Headline, Info-Text und Top-Kenntnisse ersetzen (Schritt 2+3, ca. 15 Min.)
  - Erfahrung FK Solution Design + Blue-Apes-Satz (Schritt 4)
  - Im Fokus: 5 Links auf www.fk-sd.de, alte github.io-Einträge raus (Schritt 5)
  - Dienstleistungen anbieten (Schritt 6)
  - Optional Unternehmensseite „FK Solution Design GmbH“ anlegen, URL an Claude → kommt ins Schema als sameAs (Schritt 7)
  - Artikel teasern, Entwürfe in linkedin/ (Schritt 8; Claude schreibt auf Wunsch weitere)
  - Optional Profil-URL kürzen, neue URL an Claude (Website-Links umstellen)
- ~~QC. Bing Webmaster Tools~~ (erledigt 26.10.2026, per Meta-Tag verifiziert, PR #53).
- QD. Backlinks sammeln (Trailhead, Konferenz-/Sessionize-Seiten, Blue Apes) und URLs an Claude geben (kommen ins Schema als sameAs).
- QE. Ab ca. 9.11.2026: Search Console Bericht „Seiten“ und PageSpeed Insights prüfen.
- QF. Unternehmensverzeichnisse: Einträge mit überall gleichem Namen, gleicher Adresse und Telefonnummer wie im Google-Profil anlegen, jeweils mit Link auf www.fk-sd.de. Vorschläge: Bing Places (Import aus dem Google-Profil möglich), Apple Business Connect, Gelbe Seiten, Das Örtliche, Cylex, 11880. North Data und Firmenwissen ziehen Daten aus dem Handelsregister, dort nur prüfen und ggf. Website ergänzen. Fertige Eintrags-URLs an Claude geben (kommen ggf. ins Schema als sameAs).
- QG. Verzeichniseinträge (Liste Fabian 30.10.2026), alle mit gleichem Namen, gleicher Adresse und Telefonnummer und Link auf www.fk-sd.de. Nur kostenlose Basiseinträge, keine Bezahlpakete. Nicht ins Schema als sameAs (Verzeichnisse, keine eigenen Profile).
  - Webkataloge (wenig Aufwand, alte Domains, kaum Traffic, Freischaltung dauert Wochen bis Monate): onlinestreet.de, suchnase.de, webspider24.de (strenge Regeln vorher lesen), bunte-suche.de, go-findyou.de.
  - Firmenverzeichnisse (gehen schnell online, teils viel Traffic): dasoertliche.de, werkenntdenbesten.de, gelbeseiten.de, stadtbranchenbuch.com, provenexpert.com (eher Bewertungsplattform), dastelefonbuch.de, Creditreform (kostenloser Firmeneintrag, Daten auch für Firmenwissen; Website ergänzen).
  - Ergänzung 30.10.2026: webwiki.de (Webkatalog, auch für Blogs) sowie die B2B-Plattformen europages.de und wlw.de (Wer liefert was); beide eher für Hersteller, aber in 10 Minuten erledigt.
  - Ohne Backlink, wichtig für lokale Sichtbarkeit: Google-Unternehmensprofil (siehe QA), Bing Places (Import aus Google), Apple Maps (Apple Business Connect).
- QH. ~~Gastartikel bei Salesforce Break nachhaken~~ Erledigt 05.11.2026: Die Autorenseite https://salesforcebreak.com/author/fabiankramerbaaa9dc933/ zeigt jetzt Namen, Bio und einen Link auf www.fk-sd.de/en (nofollow). Autorenseite steht in den sameAs-Profilen, der Artikel ist auf der Vorträge-Seite beim Talk „Flow Performance“ verlinkt.
- QM. Backlinks aus KI-Quellen (Recherche 31.10.2026): Quellen, die ChatGPT, Claude, Gemini, Perplexity und Google AI Mode im KI-Check vom 28.10.2026 und in Websuchen zu Fabians Themen zitieren. Wettbewerber aussortiert, nur kostenlose oder verdiente Links. Reihenfolge nach Nutzen:
  - sfdx-hardis-Doku, Seite „Articles & Videos“ (KI-Antworten zu DevOps zitieren die Doku mehrfach): Fabians sfdx-hardis-Artikel dort aufnehmen lassen. Weg: Pull Request auf docs/articles-videos.md im Repo hardisgroupcom/sfdx-hardis oder kurz beim Maintainer anfragen. Claude kann den PR-Text vorbereiten.
  - Salesforce Ben (in fünf KI-Antworten zitiert, u. a. zu Document Builder, SAP-Anbindung, Field Service): eigenen Fachartikel als Gastautor einreichen, nur Originaltext, nicht werblich. Autorenprofil mit Link auf www.fk-sd.de. Themenvorschlag: Document-Builder-Grenzen oder Field-Service-Rollout in Wellen.
  - CIO.de / COMPUTERWOCHE (Foundry-Expertennetzwerk, Zielgruppe CIO): kostenlos, Bewerbung per Mail, 500 bis 1.500 Wörter, mindestens zwei Beiträge pro Jahr, Autorenprofil mit Link.
  - DIGITAL BUSINESS Magazin (WIN-Verlag, von Google AI Mode zur Frage „Lohnt sich die Manufacturing Cloud für Mittelständler?“ zitiert): Fachbeitrag zur Manufacturing Cloud anbieten. Weg: Redaktion über kontakt.win-verlag.de/de/dbm anfragen, vorher klären, ob Fachbeiträge kostenlos sind (gesponserte Beiträge ablehnen).
  - Salesforce Dictionary (in drei KI-Antworten zu DevOps und Field Service zitiert): fehlende Begriffe über salesforcedictionary.com/contribute einreichen, Beitrag erscheint mit Byline. Ob ein Link auf die Website möglich ist, beim Eintragen prüfen.
  - Reddit r/salesforce (KI-Antworten zu DevOps und Document Builder zitieren Threads): Fragen zu Field Service, Document Builder und sfdx-hardis fachlich beantworten, Link nur, wenn ein eigener Artikel die Frage wirklich besser beantwortet. Bringt kaum Linkkraft, aber KI-Sichtbarkeit.
  - ensun.io (B2B-Anbietersuche, erscheint bei „Salesforce Consulting Germany“): prüfen, ob ein kostenloses Firmenprofil mit Website-Link möglich ist.
  - Bewusst weggelassen: Clutch und The Manifest (kostenloses Profil ohne Website-Link, Link erst ab 499 USD im Jahr), consultingheads (KI-zitiert, aber Profile sind nicht öffentlich), bilarna (SEO-Werkzeug, kein Verzeichnis), Top-10-Listen von Beratungshäusern (Wettbewerber). Freelancer-Portale stehen schon unter D7 und QG.
- QI. Salesforce-Partnerprogramm und AppExchange: Mitgliedschaft der FK Solution Design GmbH im Salesforce Partner Program prüfen (Bedingungen und Kosten für eine Ein-Personen-GmbH, Navigator-Zertifizierungen) und danach ein Consultant-Listing auf AppExchange („Consultants“) mit Expertise, Branchen und Link auf www.fk-sd.de anlegen. Hoher Aufwand, aber starke Quelle für Google und KI-Suche. Listing-URL danach an Claude (kommt ins Schema als sameAs der Organisation).
- QJ. Gastauftritte in Podcasts (Link in den Shownotes, Beschreibung selbst bestimmen). Kandidaten EN: Salesforce Way, Salesforce Developers Podcast (beide in der sfdx-hardis-Doku verlinkt), Salesforce Admins Podcast. DE: deutschsprachige CRM-, IT-Leitungs- und Industrie-4.0-Podcasts noch recherchieren. Themen: DevOps mit Open Source (sfdx-hardis), Flow-Performance, Partnersteuerung für Fertiger.
- QK. Expertenzitate und Pressekontakte: kostenlose Profile bei Qwoted und Source of Sources anlegen und passende Anfragen (Salesforce, CRM, IT-Strategie, Fertigung) beantworten. Journalisten, die über Fabian geschrieben haben, nach ein paar Monaten wieder anschreiben und Zitate oder Hilfe anbieten.
- QL. Routine LinkedIn: 15 Minuten am Tag durchdachte Kommentare bei Salesforce-Leuten, CIO-Medien und möglichen Linkgebern (Beziehung zuerst, nicht nach Links fragen).

## Grafiken verbessern (Grafik-Ranking 30.10.2026)

Aus Fabians Bewertung: alle Grafiken mit 3 und alle mit einer Notiz, die einen Auftrag enthält. Je Punkt ein eigener Thread im Projekt, der klärt, was genau geändert wird, und Mockups liefert. Notizen wörtlich im Register (`docs/graphics-review.json`, Feld `note`).

| # | Thema | Bewertung | Status |
|---|---|---|---|
| G1 | Ablauf-Diagramme: Kantenbeschriftung liegt auf der Linie, viel Leerraum | 3 | erledigt 30.10.2026 (Variante A: Beschriftung als Schild, kompakter, Handy von oben nach unten) |
| G2 | Content-Block Schritte neu gestalten | 3 | Erledigt 30.10.2026: Pfeilband mit Ringen |
| G3 | Content-Block Stufen (Kacheln) neu gestalten | 3 | Erledigt 30.10.2026: Variante A Pfeilkette |
| G4 | Vorschaubilder: Standardbild auf Deutsch und Englisch, Artikelbilder mit Logo-Zeile „FK Solution Design / Salesforce Architecture“ | 3 und 1 | Erledigt: Logo-Zeile auf allen Vorschaubildern, Rubrik oben rechts, Standardbild je Sprache aus dem Hero-Text |
| G5 | Erklärgrafiken neu: integration-leading-system, object-ownership-matrix, sfdx-hardis-vs-commercial, service-documents-limits | 3 und 2 | Erledigt 30.10.2026: helle HTML-Bausteine `tabelle` (1A, 2A, 3A) und `staerken-grenzen` (4B), PNGs entfernt |
| G6 | Erklärgrafiken animieren: well-architected-mapping, devops-pipeline, which-clouds, sfdx-hardis-training-levels (dort auch Kontrast, Level 3) | 3, 1 und 2 | Erledigt 30.10.2026: animierte HTML-Bausteine im dunklen Look A (`pipeline`, `saeulenwechsel` Säule für Säule, `basis-addons`, `level` mit Level 3 weiß auf dunklerem Blau), PNGs entfernt |
| G7 | Masterclass-Kopfzeichnungen und Treppe (Säulen) animieren | 2 und 1 | Erledigt 30.10.2026: Kopfzeichnungen bauen sich einmal auf (Variante A, ohne Punkt), Treppe und Säulen bauen sich langsam beim Reinscrollen auf |
| G8 | Quick Wins: Zertifikatsgrafik „Schnittstellen“ läuft aus der Box, graue Boxen der Document-Builder-Grafik niedriger, Orange in winter-27-org-display ersetzen (gehört nicht zur Palette) | 2 | Erledigt 30.10.2026: Text in zwei Zeilen, graue Boxen auf Texthöhe gekürzt, Orange durch Hellgrau ersetzt |
| G9 | Logo-Band auf der Startseite ca. 20 % größer | 2 | Erledigt 30.10.2026: Variante B, Logos und Abstände 30 % größer, auch auf dem Handy |
| G10 | Vorschlag Masterclass-Liste auf der Startseite | 2 | Erledigt 30.10.2026: Variante A, Liste in weißer Box mit Icon und Themenzeile je Masterclass |
| G11 | Vorschlag Referenz-Karten auf der Startseite | 2 | Erledigt 30.10.2026: Projekt im Fokus, nummerierte Liste plus Panel mit Foto, Ausgangslage, Rolle und Ergebnis; Projektliste unter „Über mich“ durch Verweis ersetzt |

## Weitere Ideen

Ideen für mehr persönliche Note, von Fabian freigegeben, später abarbeiten:

1. ~~**Porträtfoto**~~ (umgesetzt 23.10.2026) – echte Arbeitssituation (Whiteboard, Workshop) in „Über mich“ und als kleiner Kreis im Kontaktbereich. *Braucht: Foto von Fabian.*
2. **„Warum Kundenseite?“** – 2–3 Sätze: selbst Implementierungspartner (Blue Apes) mitgegründet und verkauft, kennt beide Seiten. *Text entwirft Claude.*
3. ~~**„Fragen, die ich in jedem Projekt stelle“**~~ (umgesetzt 26.10.2026, PR #54) – Seite /fragen/ bzw. /en/questions/, Inhalte in src/data/questions.ts. Optional: aus Blog-Artikeln verlinken.
4. **Kundenstimmen** – 3 Stimmen mit Name und Rolle, Firma darf anonym bleiben („Head of CRM, globaler Hersteller“). Ideal: ein Kunde, ein Implementierungspartner, ein Projektleiter. Quelle: vorhandene LinkedIn-Empfehlungen oder direkte Anfrage. Platz: unter den Referenzen. *Braucht: Zitate von Fabian (Website-Vergleich 23.10.2026).*
5. **Notizen aus LinkedIn** – 3 aktuelle Posts als Teaser mit Link, ohne Plugin. *Braucht: Auswahl der Posts.*
6. **Persönliches** – ein Satz abseits der Arbeit plus Unterschrift unter „Über mich“. *Braucht: Satz/Unterschrift von Fabian.*
7. **Network & Alliances (Salesforce-Partner)** – Abschnitt zu Partnern und Netzwerk, Überschrift „Network & Alliances“. *Abstimmen: Wie passt das zur Positionierung „unabhängig von Herstellern und Partnern“? Braucht: Liste der Partner.*
8. ~~**Zertifizierungen**~~ (umgesetzt 23.10.2026, /certifications) – alle 25 Salesforce-Zertifizierungen (8 Architect) und 15 weitere aus dem CV, mit Jahr, plus Begründung für Enterprise-Projekte. Neue Zertifizierungen in src/data/certifications.ts ergänzen.
9. ~~**Blog**~~ (umgesetzt 23.10.2026, /blog, erster Artikel zu DevOps) – eigene Unterseite /notes bzw. /blog mit Fachbeiträgen (EN/DE), Inhalte als Markdown im Repo.
10. ~~**Speaker & Events**~~ (umgesetzt 23.10.2026, PR #30 + #32, Inhalte in src/data/speaking.ts; optional: Event des Bühnenfotos, einzelne User-Group-Vorträge) – Unterseite /speaking (DE /de/speaking) steht seit 23.10.2026 als TBD-Platzhalter, verlinkt aus „Über mich“. Offen: Seite ausformulieren mit Vorträgen, Talks und Community-Events (Titel, Event, Datum, ggf. Folien/Video-Link, Bühnenfoto). *Braucht: Liste der Auftritte.* Danach noindex entfernen.

11. **Ergebnisse je Referenz** (aus dem Website-Vergleich, 23.10.2026) – jede der 5 Referenzkarten bekommt Ausgangslage, Entscheidung und Ergebnis mit einer Zahl (vorher → nachher, z. B. Länder/Nutzer live, Durchlaufzeit, Fehler nach Releases, Lizenz- oder Kosteneinsparung, Zeit bis Go-live). Kundennamen bleiben anonym. *Braucht: Fabian arbeitet das im Detail auf.*

12. ~~**Abschnitt „Warum ein 30-Minuten-Gespräch?“**~~ (umgesetzt 23.10.2026, PR #38; Website-Vergleich 23.10.2026) – statt eines festen Einstiegsprodukts: Das Gespräch klärt den größten Pain und den Fokus, keine Front zu viel, und wie das Ergebnis nachhaltig bleibt (Healthcheck/Cleanup bringt nichts, wenn die Ursachen bleiben). Auch die Form der Zusammenarbeit wird im Gespräch geklärt, nicht auf der Seite festgelegt: Projektstart oder schon live? Was schafft das Team inhouse, wo fehlt Expertise? Coaching/Ideengeber oder feste Ressource im Projekt? Diese Fragen kommen als „Was wir im Gespräch klären“ in den Abschnitt. Keine Angebotsliste. Platz: vor dem Kontaktbereich, kurz auch im Hero-CTA-Umfeld. *Textentwurf: Claude, Freigabe: Fabian.*

13. **Blog-Artikelserie Salesforce Revenue Cloud** (von Fabian gewünscht 27.10.2026) – Serie von Fachbeiträgen im Blog (EN/DE). *Entwurf: Claude, Freigabe: Fabian.*

14. **Blog-Artikelserie Salesforce B2B Commerce** (von Fabian gewünscht 27.10.2026) – Serie von Fachbeiträgen im Blog (EN/DE). *Entwurf: Claude, Freigabe: Fabian.*

15. **Eigener Kontakt für Julianes Artikel** (von Fabian gewünscht 29.10.2026) – Julianes Artikel (und ggf. ihr Profil) bekommen Julianes eigenen Buchungslink und/oder ihre E-Mail statt Fabians Bookings und Formular. Bis dahin läuft jeder Kontakt über Fabian. *Braucht: Buchungslink oder E-Mail von Juliane.*

16. ~~**Alle Grafiken durchgehen und die besten nominieren**~~ (erledigt 30.10.2026) – Fabian hat alle 302 Grafiken bewertet (Übersicht https://claude.ai/artifact/KusEFgFZ7i7THrd8Lz2FeC, Register `docs/graphics-review.json`, Ablauf `docs/graphics-review.md`). Die 1er stehen in `docs/layouts.md`, die Todos unter „Grafiken verbessern“ oben. Neue Grafiken laufen über das Register automatisch in die nächste Runde.

17. **Zitat nach einem Vergleich in Blogartikeln** (von Fabian gewünscht 30.10.2026) – die beiden Muster aus der Startseite (Rolle → Zitat) auch in Blogartikeln einsetzen: „Bühnenband“ (Foto rechts, Zitat kursiv auf dunklem Verlauf, gebaut auf der Startseite) und „Grundsatz-Karte“ (gestrichelte Linie aus der Vergleichsspalte in eine dunkle Karte mit rundem Foto). Beschreibung in `docs/layouts.md` („Quote after a comparison“). Dafür als Content-Block in die Bibliothek aufnehmen und passende Artikel mit einem Vergleich plus Kernsatz auswählen. *Entwurf: Claude, Freigabe: Fabian.*

18. **Kundenstimme mit Zahlen unter den Referenzen** (von Fabian gewünscht 06.11.2026, Muster von 21st.dev „Single Voice Spotlight Testimonial“) – ein großes Zitat mit Rolle und Branche (Firma anonym), rechts drei Ergebniszahlen, heller Kasten unter „Projekt im Fokus“ auf der Startseite (Variante A, Mockups in den Projektdateien unter `homepage/21st-dev-mockups/`). Ergänzt Punkt 4 und 11. *Braucht: echtes Zitat und drei belegbare Zahlen von Fabian.*

Weitere offene Punkte:
- Fallstudien-Seiten (Ausgangslage, Architekturentscheidungen, Ergebnis, Grafik), sobald die Kundenfreigaben vorliegen. Status klärt Fabian.
- Logo-Paket (ZIP) hochladen
- ~~Eigene Domain anschließen~~ (erledigt 26.10.2026, www.fk-sd.de)
