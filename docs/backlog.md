# Homepage – Backlog (Stand 29.10.2026)

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
| D8 | L1 Partnerauswahl: Antworten auf 4 Fragen (Warnsignal im Angebot, Standardfragen im Pitch, gescheiterte Partnerwahl, Referenzprüfung) | Fabian | offen |
| D9 | Wirkung prüfen: Positionen von D4 und D5 nach 2 bis 3 Montagsläufen vergleichen | Claude | ab 16.11.2026 |
| D10 | Profil-URLs mit Namen (LinkedIn, XING, Trailblazer, freelancermap, Malt) als sameAs ins Schema, sobald D7 steht | Claude | wartet auf D7 |
| D11 | Seite „Freiberuflicher Salesforce Architect“ (DE `/freiberuflicher-salesforce-architect/`, EN `/en/freelance-salesforce-architect/`): Anlässe, Abgrenzung zum Implementierungspartner, Ergebnisse, Praxisbeispiel, Konditionen, FAQ; im Footer verlinkt | Claude | erledigt (29.10.2026) |
| D12 | Artikel „Salesforce-Freelancer oder Agentur: wann was passt“ (DE + EN, Kategorie Architektur & Partnersteuerung) | Claude | erledigt (29.10.2026) |
| D13 | CV-Download auf der Recruiter-Seite (`/partner/recruiter/`, `/en/partners/recruiters/`) mit Hinweis: Hier liegt immer die aktuelle Version, ältere Versionen bitte nicht mehr bei Kunden einreichen. Lebenslauf gibt es nur in einer Version (Englisch) | Fabian (CV-PDF), dann Claude | offen |

Ausgangswerte 28.10.2026: „document builder limitations“ (EN) Platz 6, „field service lizenzen salesforce“ 11 (rankt mit „lohnt sich“), „salesforce field service“ 27 (170 Suchen), „field service einführung“ 29 (rankt mit „lohnt sich“), „manufacturing cloud vs sales cloud“ 30, „salesforce field service license“ 38, „salesforce document builder“ 39. KI-Übersichten bei 51 von 52 Begriffen, fk-sd.de in keiner zitiert. KI-Assistenten (ChatGPT, Claude, Perplexity, Google AI Mode): 0 Nennungen.

## Priorität 1: Artikel aus der Long-Tail-Recherche (DataForSEO, 28.10.2026)

Grundlage: DataForSEO-Recherche vom 28.10.2026 (Google Deutschland, Suchen pro Monat). Auch in Deutschland wird überwiegend mit englischen Produktbegriffen gesucht, deshalb die englischen Begriffe in Titel und Einstieg der DE-Artikel aufnehmen. Alle Begriffe werden ab 2.11.2026 wöchentlich getrackt (seo/keywords.json). Claude entwirft, Fabian gibt frei.

Neue Artikel:
- L1. **Salesforce-Implementierungspartner auswählen** (Fabian 28.10.2026: ganz nach oben). Begriffe: „salesforce implementation partner“ (30), „salesforce partner deutschland“ (20). Arbeitstitel „Salesforce-Implementierungspartner auswählen: 7 Prüffragen“ / „How to choose a Salesforce implementation partner“. Inhalt: Ausschreibung, Warnsignale im Angebot, Referenzprüfung, Vertrag (Teamkontinuität, Tool-Eigentum, Festpreis vs. Aufwand). Verlinken: Partnersteuerung, Festpreis-Artikel, Partnerwechsel/KI-Org-Analyse, Object Ownership Matrix. *Wartet auf Fabians Antworten (D8).* (Ersetzt S4.)
- L2. **SAP an Salesforce anbinden: Überblick** für IT-Leitung. Begriffe: „sap to salesforce“ (170), „salesforce sap integration“ und Varianten (40). Bündelt die bestehenden SAP-Teilartikel (Manufacturing Cloud, B2B Commerce, Revenue Cloud, Agentforce). (Ersetzt S3.)
- L3. **SAP CRM oder Salesforce** (Wartungsende SAP CRM, Wechselgründe). Begriffe: „sap vs salesforce“ / „salesforce vs sap“ (110). (Ersetzt S2.)
- L4. **Field Service Management Software: wann Salesforce, wann SAP, IFS oder ServiceNow?** Begriffe: „field service management software“ (590), „sap field service management“ (210), „field service management system“ (90). Größtes Volumen, Entscheidungsartikel für CIOs.
- L5. **Was ist Agentforce? Erklärt für die IT-Leitung.** Begriffe: „was ist agentforce“ (20), „what is agentforce“ (20). Definition zuerst, dann Einordnung, Links auf die Agentforce-Artikel.
- L6. **Manufacturing Cloud vs. Sales Cloud.** Begriff: „salesforce manufacturing cloud vs sales cloud“ (10). *Umgesetzt als Schärfung des bestehenden Artikels (D5, PR #103).*
- L7. **Salesforce-Release-Kalender: was die IT-Leitung je Release prüfen muss.** Begriffe: „salesforce release notes“ (90), „salesforce release schedule/cycle/dates“ (je 20). Evergreen-Seite, je Release aktualisieren.

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

Erledigt im täglichen Lauf: Manufacturing Cloud lohnt sich (#41), Object Ownership Matrix (#42), Salesforce-Lizenzen (#43), Field Service lohnt sich (#44), Nearshore-Teams (#55), Open CTI endet 2028 (#82, Entwurf). Aus der Begriffssuche vom 29.10.2026: Sandbox-Strategie, Berechtigungskonzept, UAT, Entwicklungsstandards und Definition of Done, Entscheidungslog, globales Template, DORA-Metriken, Dubletten und Stammdaten (ein PR, Entwurf).

## Priorität: Sichtbarkeit und SEO (Audit 26.10.2026)

Technik erledigt in PR #51 (Sitemap, IndexNow, Schema, Titel, interne Links).

Inhalte (Claude entwirft, Fabian gibt frei):
- S1. Landingpages After-Sales und Field Service.
- ~~S2, S3, S4~~ → jetzt L3, L2, L1 oben.
- ~~S5. Seite „Fragen, die ich in jedem Projekt stelle“~~ (umgesetzt 26.10.2026, PR #54, siehe Punkt 3 unten).

Macht Fabian selbst (Quick Wins):
- QA. Google Business Profile (Google-Unternehmensprofil) anlegen: Unternehmen mit Einzugsgebiet, Adresse ausblenden. Anleitung als Video: https://www.youtube.com/watch?v=wYupOi4DIh8
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

Weitere offene Punkte:
- Fallstudien-Seiten (Ausgangslage, Architekturentscheidungen, Ergebnis, Grafik), sobald die Kundenfreigaben vorliegen. Status klärt Fabian.
- Logo-Paket (ZIP) hochladen
- ~~Eigene Domain anschließen~~ (erledigt 26.10.2026, www.fk-sd.de)
