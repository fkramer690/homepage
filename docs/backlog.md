# Homepage – Backlog (Stand 28.10.2026)

Einzige gepflegte Fassung des Backlogs. Andere Projekte (z. B. der tägliche Blog-Artikel-Lauf) lesen diese Datei. Das Repo ist öffentlich: keine Kundennamen, NDA-Details, Preise oder internen Notizen hier eintragen.

## Priorität 1: Artikel aus der Long-Tail-Recherche (DataForSEO, 28.10.2026)

Grundlage: DataForSEO-Recherche vom 28.10.2026 (Google Deutschland, Suchen pro Monat). Auch in Deutschland wird überwiegend mit englischen Produktbegriffen gesucht, deshalb die englischen Begriffe in Titel und Einstieg der DE-Artikel aufnehmen. Alle Begriffe werden ab 2.11.2026 wöchentlich getrackt (seo/keywords.json). Claude entwirft, Fabian gibt frei.

Neue Artikel:
- L1. **Salesforce-Implementierungspartner auswählen** (Fabian 28.10.2026: ganz nach oben). Begriffe: „salesforce implementation partner“ (30), „salesforce partner deutschland“ (20). Arbeitstitel „Salesforce-Implementierungspartner auswählen: 7 Prüffragen“ / „How to choose a Salesforce implementation partner“. Inhalt: Ausschreibung, Warnsignale im Angebot, Referenzprüfung, Vertrag (Teamkontinuität, Tool-Eigentum, Festpreis vs. Aufwand). Verlinken: Partnersteuerung, Festpreis-Artikel, Partnerwechsel/KI-Org-Analyse, Object Ownership Matrix. *Vorher 3–4 Fragen an Fabian zu eigenen Partnerauswahlen.* (Ersetzt S4.)
- L2. **SAP an Salesforce anbinden: Überblick** für IT-Leitung. Begriffe: „sap to salesforce“ (170), „salesforce sap integration“ und Varianten (40). Bündelt die bestehenden SAP-Teilartikel (Manufacturing Cloud, B2B Commerce, Revenue Cloud, Agentforce). (Ersetzt S3.)
- L3. **SAP CRM oder Salesforce** (Wartungsende SAP CRM, Wechselgründe). Begriffe: „sap vs salesforce“ / „salesforce vs sap“ (110). (Ersetzt S2.)
- L4. **Field Service Management Software: wann Salesforce, wann SAP, IFS oder ServiceNow?** Begriffe: „field service management software“ (590), „sap field service management“ (210), „field service management system“ (90). Größtes Volumen, Entscheidungsartikel für CIOs.
- L5. **Was ist Agentforce? Erklärt für die IT-Leitung.** Begriffe: „was ist agentforce“ (20), „what is agentforce“ (20). Definition zuerst, dann Einordnung, Links auf die Agentforce-Artikel.
- L6. **Manufacturing Cloud vs. Sales Cloud.** Begriff: „salesforce manufacturing cloud vs sales cloud“ (10).
- L7. **Salesforce-Release-Kalender: was die IT-Leitung je Release prüfen muss.** Begriffe: „salesforce release notes“ (90), „salesforce release schedule/cycle/dates“ (je 20). Evergreen-Seite, je Release aktualisieren.

Bestehende Artikel nachschärfen (Titel, Einstieg, FAQ um den Suchbegriff ergänzen):
- L8. Salesforce-Lizenzen-Artikel auf „salesforce lizenz kosten“ (20).
- L9. Field-Service-Lizenzen-Artikel auf „salesforce field service license / pricing / license comparison“ (je 10).
- L10. Manufacturing-Cloud-Add-ons-Artikel auf „salesforce manufacturing cloud pricing“ (10).
- L11. CPQ-Verkaufsende-Artikel auf „salesforce cpq end of life / retirement / replacement“ (je 10).
- L12. Field-Service-Einführung auf „salesforce field service implementation guide“ (10); laut Benchmark rankt für „field service einführung“ bisher der Artikel „lohnt sich“ statt des Einführungsartikels.

## Blog: Themen aus dem täglichen Lauf (übernommen 28.10.2026)

Der tägliche Lauf schreibt einen Artikel pro Tag (EN + DE) und ergänzt hier neue Ideen. Reihenfolge: zuerst Priorität 1 (L1 bis L7), dann diese Liste. Ideen ohne bestätigtes Praxisbeispiel sind markiert.

- B1. SAP-Thema (Leitsystem für Kunden, Preise, Aufträge) → aufgegangen in L2 und L3.
- B2. Embedded Chat für 12 Sprachen: was ein Proof of Concept klären muss.
- B3. Center of Excellence auf Kundenseite: Format und Rhythmus.
- B4. MuleSoft oder Jitterbit: welche Middleware für Salesforce und das ERP? *Braucht Beispiel von Fabian.*
- B5. Salesforce an proALPHA anbinden: was anders ist als bei SAP. *Braucht Beispiel von Fabian.*
- B6. Technische Benutzer mit zu vielen Rechten: Integrationen aufräumen.
- B7. Teams Phone als Telefonie für den Service (Folgeartikel zu Open CTI). *Braucht Erfahrung aus dem CTI-Rollout.*
- B8. Spring '27: was ändert sich für Hersteller? (News, sobald die Release Notes erscheinen, ca. Mitte Januar 2027; passt zu L7.)

Erledigt im täglichen Lauf: Manufacturing Cloud lohnt sich (#41), Object Ownership Matrix (#42), Salesforce-Lizenzen (#43), Field Service lohnt sich (#44), Nearshore-Teams (#55), Open CTI endet 2028 (#82, Entwurf).

## Priorität: Sichtbarkeit und SEO (Audit 26.10.2026)

Technik erledigt in PR #51 (Sitemap, IndexNow, Schema, Titel, interne Links).

Inhalte (Claude entwirft, Fabian gibt frei):
- S1. Landingpages After-Sales und Field Service.
- ~~S2, S3, S4~~ → jetzt L3, L2, L1 oben.
- ~~S5. Seite „Fragen, die ich in jedem Projekt stelle“~~ (umgesetzt 26.10.2026, PR #54, siehe Punkt 3 unten).

Macht Fabian selbst (Quick Wins):
- QA. Google-Unternehmensprofil anlegen (Unternehmen mit Einzugsgebiet, Adresse ausblenden).
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
