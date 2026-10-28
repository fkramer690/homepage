---
title: "Teamarbeit und Delivery mit KI im Salesforce-Programm"
description: "Wie sich Rollen, Ablauf, Review-Gates, Kennzahlen und Mitbestimmung ändern, wenn Ihr Salesforce-Team mit Coding-Agenten arbeitet, und was Sie zuerst regeln."
lang: de
slug: teamarbeit-und-delivery
translationKey: masterclass-09
chapter: 9
short: "Teamarbeit und Delivery"
summary: "Wie Hersteller Rollen, Review-Gates, Kennzahlen und Betriebsrat aufstellen, wenn Partner und eigene Teams mit Coding-Agenten liefern."
takeaways:
  - "Mit Coding-Agenten verschiebt sich der Engpass im Salesforce-Programm vom Schreiben des Codes zur Prüfung und zur fachlichen Abnahme; dort sollten Hersteller Kapazität einplanen."
  - "Laut McKinsey-Umfrage 2026 sparen Teams im Schnitt 11,8 Prozent Zeit, aber nur 6,2 Prozent Nacharbeit, und 30 Prozent der Befragten melden sinkende Produktivität."
  - "Ich empfehle für jede agentengenerierte Änderung einen benannten menschlichen Owner, feste Review-Gates mit klaren Verantwortlichen und eine schriftliche Definition of Done."
  - "KI-Systeme lösen laut CMS in aller Regel Mitbestimmung nach § 87 Abs. 1 Nr. 6 BetrVG aus; Coding-Agenten mit Nutzungsstatistiken pro Person gehören nach meiner Einschätzung klar dazu."
  - "Die Verordnung (EU) 2026/1744 verschiebt die Hochrisiko-Pflichten des AI Act auf den 2. Dezember 2027 (Anhang III) und 2. August 2028 (Anhang I); Coding-Assistenten betrifft das meist nicht."
articles: [smaller-teams-ai-native-delivery, measuring-ai-benefit-salesforce-projects, nearshore-teams-with-ai-agents, partners-ai-coding-sow-rules, ai-coding-works-council-gdpr, eu-ai-act-agentforce-deadlines]
faq:
  - q: "Wird ein Salesforce-Team mit Coding-Agenten kleiner?"
    a: "Oft ja. In der McKinsey-Umfrage 2026 meldeten 79 Prozent der Spitzenreiter kleinere Squads, im Median von etwa zehn auf sieben Personen. Für Hersteller wächst dafür der Anteil der Fachbereiche, weil jemand aus Service oder Vertrieb täglich abnehmen muss."
  - q: "Wer gibt KI-generierten Code im Salesforce-Projekt frei?"
    a: "Ein benannter Mensch, nie der Agent. Ich empfehle einen Code-Owner je Pull Request, die automatischen Prüfungen der Pipeline und eine fachliche Abnahme durch den Domain-Lead. Ins Produktivsystem gelangt Code nur über die Pipeline mit Freigabe durch den Release Manager."
  - q: "Muss der Betriebsrat Coding-Agenten zustimmen?"
    a: "In aller Regel ja. Laut CMS reicht die objektive Möglichkeit, Leistung oder Verhalten zu überwachen, eine Absicht ist nicht nötig. Ohne Zustimmung oder Spruch der Einigungsstelle darf der Arbeitgeber das System nicht einführen. Das ist keine Rechtsberatung."
  - q: "Wie messe ich, ob KI mein Salesforce-Programm schneller macht?"
    a: "Mit Durchlaufzeit pro Story, Fehlerdurchschlupf, Nacharbeit und den DORA-Kennzahlen, gemessen gegen eine Basislinie aus der Zeit vor den Werkzeugen. Selbstauskünfte taugen nicht: In der METR-Studie waren Entwickler 19 Prozent langsamer und hielten sich für 20 Prozent schneller."
draft: false
---

Wenn Coding-Agenten in einem Salesforce-Programm Code schreiben, wird das Schreiben billig und die Prüfung teuer. Teamarbeit und Delivery mit KI heißen deshalb vor allem: kleinere Teams mit klaren Rollen, ein benannter Mensch, der jede Änderung verantwortet, feste Review-Gates bis zur fachlichen Abnahme und Kennzahlen, die gegen eine Basislinie messen. Für Hersteller liegt die größte Änderung auf der eigenen Seite. Service, Vertrieb oder Aftersales müssen täglich entscheiden und abnehmen, und Betriebsrat und Datenschutz gehören vor den Pilot, nicht dahinter.

## Wo liegt der Engpass, wenn Agenten programmieren?

Drei Quellen beschreiben dasselbe Muster aus unterschiedlichen Richtungen. Die ausführlichste Beschreibung für Salesforce kommt von einem Praktiker: Amit Chaudhary skizziert auf [ApexHours](https://www.apexhours.com/ai-native-delivery-for-salesforce/) am 19. Oktober 2026 „AI-native delivery“, also einen Delivery-Prozess, der von Anfang an um KI-Agenten herum gebaut ist. Das ist ein Praxis-Framework ohne Messdaten, die Zahlen liefern McKinsey und DORA.

| Dimension | ApexHours (Praxisquelle, Okt. 2026) | McKinsey (Umfrage, Aug. 2026) | DORA (2025) |
|---|---|---|---|
| Basis | Erfahrungsbericht für Salesforce | 334 Produkt- und Engineering-Leads, Mai 2026 | knapp 5.000 Befragte |
| Team | kleine Pods: Architekt, Builder-Reviewer, Domain- oder BA-Lead | 79 % der Spitzenreiter mit kleineren Squads, Median von etwa 10 auf 7 | keine Teamgröße |
| Engpass | Review und Verantwortung | 11,8 % Zeitersparnis, aber nur 6,2 % weniger Nacharbeit | KI erhöht den Durchsatz, schadet weiter der Stabilität |
| Prozess | Intent statt Lastenheft, tägliche Demo, gleiche Gates für Mensch und Agent | Workflow vor der KI umbauen: mehr als doppelt so oft über 20 % Gewinn | kleine Batches, Versionskontrolle, Plattform-Engineering |
| Messung | Durchlaufzeit, Fehlerdurchschlupf, Nacharbeit, Anteil akzeptierter KI-Arbeit | 86 % der Spitzenreiter messen Ergebnisse statt Nutzung | DORA-Kennzahlen |

Quellen: [McKinsey: Beyond the copilot](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle), [DORA Report 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report), [DORA Capabilities](https://dora.dev/capabilities/).

McKinseys Zahlen dämpfen die Erwartungen. Nur 25 Prozent der Führungskräfte ab Direktorenebene berichten von deutlicher Beschleunigung, 30 Prozent der Befragten von sinkender Produktivität. Rund 80 Prozent der Entwickler gewinnen im Schnitt etwa 3 Prozent, die oberen 20 Prozent etwa 55 Prozent. DORA formuliert es so: „AI doesn't fix a team; it amplifies what's already there.“

Für ein Salesforce-Programm bei einem Hersteller lese ich daraus: Wer nur Lizenzen für Coding-Agenten kauft, bekommt schnelleren Code und dieselbe Warteschlange vor Review, Integrationstest mit SAP und Abnahme durch den Service. Was sich an der Organisation ändern muss, vertieft der Artikel [KI-native Delivery mit kleineren Salesforce-Teams](../../../blog/ki-kleinere-salesforce-teams-delivery/).

## Welche Rollen braucht ein Salesforce-Team mit Coding-Agenten?

Die Rollen werden breiter, die Verantwortung schärfer. ApexHours fasst die Governance in einem Satz: „A named human owns every artifact.“ Agenten entwerfen, Menschen entscheiden. So würde ich die Rollen bei einem Hersteller schneiden:

| Rolle | Verantwortung | Wer bei einem Hersteller |
|---|---|---|
| Architekt | Intent, Datenmodell, Sharing-Modell, Flow oder Apex, Regeldatei | idealerweise auf Kundenseite oder unabhängig |
| Builder-Reviewer | Agenten steuern, Diffs prüfen, Tests bewerten, Code-Owner im Pull Request | Partner oder eigene Entwickler |
| Domain-Lead | Akzeptanzkriterien, tägliche Abnahme in der Demo | Garantiesachbearbeitung, Disposition im Außendienst, Händlervertrieb |
| Plattform und DevOps (geteilt) | Pipeline, Org-Strategie, Freigaben für Werkzeuge, Kostenüberwachung | interne IT oder Partner mit klarer Übergabe |
| Coding-Agent | Entwürfe, Code, Tests, Dokumentation, Runbooks | arbeitet nur in Scratch Orgs und Sandboxes |

Für die kritischste Rolle bei einem Hersteller halte ich den Domain-Lead. Ohne jemanden, der täglich entscheidet, ob ein Garantie-Workflow oder eine Ersatzteilreservierung so stimmt, baut ein schnelles Team schnell am Bedarf vorbei. Diese Zeit muss die Serviceleitung freigeben, bevor der Partner sein Team umbaut.

### Nearshore-Teams und Partner

Bei Nearshore-Teams verschiebt sich die Last ebenfalls zum Review. Mehr Code pro Entwickler heißt mehr Pull Requests pro Reviewer, und genau dort fehlt in vielen Teams die Seniorität. Warum ich Nearshore-Teams ohnehin bei etwa acht Entwicklern begrenze, steht in [Nearshore-Teams für Salesforce: warum höchstens acht](../../../blog/nearshore-teams-salesforce-acht-entwickler/). Was sich mit Agenten an Rollen, Einarbeitung und Zugriffsregeln ändert, beschreibe ich in [Nearshore-Salesforce-Teams mit KI-Agenten](../../../blog/nearshore-salesforce-teams-ki-agenten/).

Arbeitet ein Partner mit Agenten, gehören die Spielregeln in den Vertrag. ApexHours nennt erlaubte Werkzeuge, Datenumgang ohne Produktiv- und personenbezogene Daten, Rechte am Code und Offenlegung des KI-Einsatzes, geregelt vor dem Kick-off. Meine Prüfpunkte dazu stehen in [Partner codet mit KI: was in den Vertrag gehört](../../../blog/partner-ki-coding-regeln-vertrag/), wie sich die Anreize der Partner verschieben, in [Kapitel 5](../aiforce-und-systemintegratoren/).

## Wie sieht der Ablauf vom Intent bis zum Release aus?

ApexHours ersetzt das klassische Lastenheft durch einen „Intent“: eine ergebnisorientierte Anforderung mit gewünschtem Ergebnis, Begründung, betroffenen Nutzern, Rahmenbedingungen und Erfolgskriterien. Den Status-Standup ersetzt eine tägliche Demo mit funktionierender Software. Für Schnittstellen zu SAP oder Regeln mit finanzieller Wirkung, etwa Garantiegutschriften, würde ich trotzdem eine präzise Spezifikation behalten.

Daraus ergibt sich ein Ablauf, den ich für Salesforce-Programme empfehle:

1. **Intent erfassen**, ergänzt um Datenmodell, echte Feld-API-Namen, Sharing-Anforderungen und Mengengerüst.
2. **Org lesen lassen**: Der Agent analysiert Metadaten in einer Sandbox und meldet Abhängigkeiten.
3. **Plan freigeben**: Der Architekt prüft, ob der Plan Intent und Ausschlüsse abdeckt.
4. **Bauen in kleinen Schritten** in einer Scratch Org oder Feature-Sandbox ohne Kundendaten, Tests zuerst.
5. **Pull Request** mit gekennzeichnetem KI-Anteil, Review durch den Code-Owner, Prüfungen in der Pipeline.
6. **Tägliche Demo**: Der Domain-Lead nimmt am laufenden System ab.
7. **Release über die Pipeline** mit menschlicher Freigabe; kein Agent hat Rechte in Produktion.

### Review-Gates als Empfehlung

Welche automatischen Prüfungen in die Pipeline gehören, beschreibt [Kapitel 8](../best-practices-ki-code/). Hier geht es um die Frage, wer an welcher Stelle entscheidet. Mein Vorschlag:

| Gate | Prüfung | Wer | Blockiert? |
|---|---|---|---|
| G0 Plan | Plan deckt Intent und Ausschlüsse ab | Architekt | ja |
| G1 Lokal | Code Analyzer ohne Blocker, Tests grün, Testausgabe als Beleg | Hook im Werkzeug des Entwicklers | ja |
| G2 Agenten-Review | Abweichung von der Spezifikation, Sicherheitsmuster | zweiter Agent als Reviewer | nein, nur Hinweise |
| G3 Mensch | Logik, Sharing, Datenmodell, Lesbarkeit | benannter Code-Owner | ja |
| G4 Pipeline | Analyzer, Apex-Tests, Validierungs-Deployment | CI | ja |
| G5 Fachabnahme | Akzeptanzkriterien in der Demo | Domain-Lead | ja |
| G6 Release | Change-Freigabe, Rollback-Plan | Release Manager | ja |

G2 ist bewusst nicht blockierend. Ein zweiter Agent findet Auffälligkeiten, die Verantwortung bleibt bei G3.

 Warum jeder Pull Request ein menschliches Review braucht, unabhängig davon, wer den Code geschrieben hat, steht in [warum Pull-Request-Reviews Pflicht sind](../../../blog/warum-pull-request-reviews-pflicht-sind/). Für Agentforce-Agenten selbst kommt ein Testgate mit Testing Center hinzu, beschrieben in [Agentforce-Agenten testen und freigeben](../../../blog/agentforce-agenten-testen-freigeben/).

### Definition of Done als Empfehlung

Diese Punkte würde ich für jede agentengenerierte Salesforce-Änderung schriftlich festhalten:

- Benannter Owner und Reviewer im Pull Request.
- Code Analyzer ohne Blocker.
- Apex-Tests grün, mit positiven, negativen und Bulk-Fällen, fachlichen Asserts und `runAs` bei Logik mit Sharing-Bezug.
- Validierungs-Deployment gegen die Integrations-Sandbox erfolgreich.
- Neue Felder und Objekte in Permission Sets, keine Änderung an Sharing Settings ohne Freigabe.
- API-Version unverändert oder bewusst angehoben und getestet.
- KI-Anteil gekennzeichnet, Regeldatei bei neuen Konventionen ergänzt.
- Fachliche Abnahme in der Demo dokumentiert.

## Welche Kennzahlen zeigen, ob KI Ihr Programm schneller macht?

Selbstauskünfte taugen nicht als Beleg. In der [METR-Studie](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) brauchten 16 erfahrene Entwickler in ihren eigenen großen Repositories mit KI 19 Prozent länger und schätzten hinterher, sie seien 20 Prozent schneller gewesen. METR hat die Ergebnisse inzwischen selbst als veraltet markiert, die Lehre über Selbsteinschätzung bleibt.

| Kennzahl | Definition | Warum |
|---|---|---|
| Durchlaufzeit pro Story | Freigabe des Intents bis Produktion | Kernergebnis aus Sicht des Fachbereichs |
| Fehlerdurchschlupf | Fehler nach Release im Verhältnis zu allen Fehlern | Qualität statt Tempo |
| Nacharbeit | Aufwand an bereits „fertigen“ Stories | sinkt laut McKinsey langsamer als die Zeitersparnis |
| Anteil akzeptierter KI-Arbeit | übernommene im Verhältnis zu erzeugten Änderungen | steuert Regeldatei und Arbeitsweise |
| DORA-Kennzahlen | Change Lead Time, Deployment-Häufigkeit, Wiederherstellungszeit, Change Fail Rate, Deployment Rework Rate | vergleichbar über Teams und Partner |
| KI-Kosten pro Story | Werkzeug- und Tokenkosten durch gelieferte Stories | Budgetsteuerung |

Die fünf DORA-Kennzahlen stehen im [DORA-Leitfaden](https://dora.dev/guides/dora-metrics/). Entscheidend ist die Basislinie: Erfassen Sie die Werte, bevor der erste Agent kommt, und berichten Sie sie als Trend, nie als Rangliste von Personen. Warum die Rangliste auch arbeitsrechtlich heikel ist, folgt im nächsten Abschnitt. Wie Sie die Messung aufsetzen und welche Zahlen in die Irre führen, beschreibe ich in [KI-Nutzen im Salesforce-Projekt messen](../../../blog/ki-nutzen-salesforce-projekt-messen/). Die Kostenseite behandelt [Kapitel 7](../kosten-und-token/).

### Lernzeit gehört ins Budget

Laut McKinsey nennen rund 38 Prozent der Befragten fehlende Zeit zum Lernen als eines der größten Hindernisse, und eingebettetes Coaching ist bei den Spitzenreitern etwa 30 Prozent häufiger. Ich empfehle eine Einarbeitung über vier Wochen: Werkzeug mit Org-Freigabeliste einrichten und Regeldatei lesen, dann Bugfixes mit Testvorgabe unter Begleitung, dann ein erstes Feature mit Plan und gekennzeichnetem Pull Request, zuletzt Reviews fremder Agenten-Pull-Requests. Diese Wochen sollten im Projektplan stehen, nicht als Nebenbei-Aufgabe.

## Betriebsrat, DSGVO und EU AI Act

### Betriebsrat

Laut [CMS](https://cms.law/de/deu/legal-updates/ki-transformation-und-betriebsrat-mitbestimmung-richtig-gestalten) bestehen bei KI-Systemen „in aller Regel“ Mitbestimmungsrechte nach § 87 Abs. 1 Nr. 6 BetrVG. Maßgeblich ist die objektive Möglichkeit zur Überwachung, auch ohne jede Absicht. Ohne Zustimmung des Betriebsrats oder Spruch der Einigungsstelle darf der Arbeitgeber das System nicht einführen. CMS empfiehlt Rahmenbetriebsvereinbarungen, die das Vorgehen für IT- und KI-Anwendungen regeln.

Wie konkret das bei Coding-Agenten wird, zeigt die [Nutzungsanalyse von Claude Code](https://support.claude.com/en/articles/12157520-claude-code-usage-analytics): Administratoren sehen für jedes Teammitglied die akzeptierten Codezeilen im Monat, in der Beta auch gemergte Pull Requests pro Person. Das ist genau die Art Leistungsdaten, um die es in § 87 geht. Ich würde die Abstimmung deshalb vor dem Pilot einplanen. Das betrifft Ihre eigenen Entwickler, Admins und Reviewer direkt. Das ist meine Einschätzung als Architekt, keine Rechtsberatung.

### DSGVO

Produktivdaten und personenbezogene Daten gehören nicht in den Kontext eines Coding-Agenten. Agenten arbeiten in Scratch Orgs und Sandboxes mit anonymisierten Testdaten, Händler- und Kundenstammdaten aus der Full-Copy-Sandbox bleiben draußen. Für die Modellwege gilt: Die Anthropic-API bietet laut [Dokumentation zur Datenresidenz](https://platform.claude.com/docs/en/manage-claude/data-residency) für die Inferenz nur „us“ und „global“, eine EU-Option fehlt. Über Amazon Bedrock oder Google Cloud bestimmt der regionale Endpunkt den Ort. Die Optionen der Anbieter vergleicht [Kapitel 4](../externe-coding-agenten/), den Weg durch Betriebsrat und Datenschutz der Artikel [KI-Coding, Betriebsrat und DSGVO](../../../blog/ki-coding-betriebsrat-dsgvo/).

### EU AI Act

Die Verordnung (EU) 2026/1744 ist laut [White & Case](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act) am 24. Juli 2026 im Amtsblatt erschienen und am 27. Juli in Kraft getreten.

| Was | Frist | Quelle |
|---|---|---|
| Hochrisiko nach Anhang III, darunter Beschäftigung | 2. Dezember 2027 | White & Case |
| Hochrisiko nach Anhang I, in Produkte eingebettete KI | 2. August 2028 | White & Case |
| Großteil der Transparenzpflichten aus Art. 50 | seit 2. August 2026 | White & Case |
| Kennzeichnung nach Art. 50(2) für generative Systeme, die vor dem 2. August 2026 am Markt waren | 2. Dezember 2026 | [Cuatrecasas](https://www.cuatrecasas.com/en/spain/intellectual-property/art/digital-omnibus-ai-has-been-published) |

Coding-Assistenten im Salesforce-Projekt sind nach meiner Einschätzung in aller Regel keine Hochrisiko-Systeme. Ein Agentforce-Agent, der Bewerbungen vorsortiert, könnte dagegen unter Anhang III fallen. Für Maschinenbauer gibt es eine zweite, getrennte Baustelle: Laut Cuatrecasas wandert die Maschinenverordnung in Abschnitt B von Anhang I, die inhaltlichen Hochrisiko-Anforderungen sollen über delegierte Rechtsakte kommen, spätestens am 2. August 2028. Das betrifft KI in Ihren Maschinen, nicht Ihr CRM, und gehört zu Produktentwicklung und Rechtsabteilung. Was die Fristen für Agentforce-Projekte bedeuten, steht in [EU AI Act: Fristen für Agentforce](../../../blog/eu-ai-act-fristen-agentforce/); Agenten in Service und Vertrieb behandelt [Kapitel 10](../ki-agenten-in-der-fertigung/).

## Ein typisches Szenario: die ersten acht Wochen bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service, einem Händlerportal und SAP S/4. Ein Nearshore-Partner stellt sechs Entwickler, intern gibt es einen Architekten und zwei Admins. Der Partner möchte mit Coding-Agenten arbeiten. Alle Zahlen und Umstände sind Annahmen.

So würde ich die ersten acht Wochen aufsetzen:

```schritte
Basislinie und Betriebsrat | Woche 1 bis 2 · Programmleitung
  Drei Monate Historie aus Jira und Git: angenommen 35 Stories im Monat, 16 Arbeitstage Durchlaufzeit, 10 Prozent Nacharbeit. Parallel geht ein Entwurf der Rahmenvereinbarung an den Betriebsrat, mit dem Verzicht auf Auswertungen pro Person als Kernpunkt.
Vertrag und Regeln | Woche 2 · Partner und interner Architekt
  Der Partner legt Werkzeuge und Modellwege offen, Agenten erhalten nur Zugriff auf Scratch Orgs und Developer-Sandboxes. Die Regeldatei liegt im Repository des Herstellers, verantwortet vom internen Architekten.
Ein Strom als Pilot | Woche 3 bis 6 · Domain-Lead
  Ersatzteilbestellung im Händlerportal, weil der Prozess klar ist und wenig an SAP-Buchungen hängt. Eine Disponentin aus dem Ersatzteilvertrieb ist zur Hälfte freigestellt und nimmt täglich ab. Die Gates G0 bis G6 gelten ab dem ersten Pull Request.
Einarbeitung | Woche 3 bis 6 · zwei Entwickler des Partners
  Zwei Entwickler durchlaufen die vier Wochen, die übrigen arbeiten zunächst weiter wie bisher. Das liefert nebenbei eine Vergleichsgruppe.
Auswertung | Woche 7 bis 8
  Angenommen sinkt die Durchlaufzeit im Pilotstrom auf 12 Tage, die Nacharbeit steigt aber auf 13 Prozent, weil die Pull Requests größer wurden. Konsequenz: kleinere Pull Requests als Regel, ein zweiter Reviewer auf Kundenseite, dann der nächste Strom.
```

Der Garantiestrom kommt erst danach, weil Gutschriften in SAP gebucht werden und dort ein Ende-zu-Ende-Test vor jedem Release bleibt. Diese Reihenfolge ist Teil dessen, was ich in der [Projektsteuerung für Salesforce-Programme](../../../leistungen/projektsteuerung-nearshore/) aufsetze; die Freigabe der Fachbereiche und die Kommunikation ins Team gehören ins [Change Management](../../../leistungen/change-management/). Alle Kapitel finden Sie in der [Übersicht der Masterclass](../).

KI beschleunigt ein Salesforce-Programm nur so weit, wie Review, Abnahme und Mitbestimmung mithalten, und das organisieren Sie als Auftraggeber. Wenn Sie Ihr Team und Ihre Partner darauf vorbereiten möchten, [schreiben Sie mir](#contact).
