---
title: "Festpreis statt Aufwand: KI in Salesforce-Projekten"
description: "Verschiebt KI Salesforce-Projekte von Abrechnung nach Aufwand zum Festpreis? Vier Vergütungsmodelle, neue Partner-Anreize und ein durchgerechnetes Szenario."
pubDate: 2026-10-27
lang: de
slug: festpreis-statt-aufwand-ki-salesforce
translationKey: fixed-price-ai-salesforce-partners
topic: governance
categories: [architecture, ai]
contactBrief: partner-governance
tags: [Festpreis, Abrechnung nach Aufwand, Partnersteuerung, KI-Coding, Partnerprogramm, Maschinenbau]
takeaways:
  - "Bei Stundenabrechnung verliert ein Partner für jeden Tag, den ein Coding-Agent spart, Umsatz und hat wenig Grund, Ihnen den Gewinn zu zeigen."
  - "Salesforce hat im März 2026 angekündigt, Partnervergütung an aktiven Verbrauch zu koppeln, und das FDE Partner Network belohnt Agenten in Produktion."
  - "McKinsey fand 11,8 Prozent Zeitersparnis, aber nur 6,2 Prozent weniger Nacharbeit, deshalb sollten Preise gemessenen Durchlaufzeiten folgen."
  - "Erfolgsanteile funktionieren als Teil des Honorars, gekoppelt an eine selbst gemessene Kennzahl und mit einer Obergrenze für Flex Credits pro Vorgang."
faq:
  - q: "Werden Festpreisprojekte in Salesforce durch KI günstiger?"
    a: "Nicht automatisch. Ein Festpreis auf Basis der alten Schätzung gibt den gesamten KI-Gewinn an den Partner. Günstiger wird es für Sie nur, wenn Preise gegen gemessenen Aufwand nachverhandelt werden, etwa alle sechs Monate."
  - q: "Wann ist Abrechnung nach Aufwand weiterhin richtig?"
    a: "Bei Discovery, undokumentierten ERP- oder MES-Schnittstellen und im Produktionssupport, wo niemand den Aufwand verlässlich schätzen kann. Eine Obergrenze und ein fester Prüftermin halten das unter Kontrolle."
  - q: "Was belohnt das neue Salesforce-Partnerprogramm?"
    a: "Laut Salesforce-Ankündigung vom 2. März 2026 hängt die Partnervergütung an aktivem Verbrauch statt an bereitgestellten Lizenzen, und Zuschüsse nach dem Verkauf belohnen Aktivierung und Verbrauch von Agenten. Das FDE Partner Network knüpft Anreize an Agenten in Produktion."
  - q: "Kann ich meinen Partner für einen Agentforce-Agenten nach Erfolg bezahlen?"
    a: "Ja, als Anteil am Honorar. Koppeln Sie einen Teil an eine Kennzahl, die Sie selbst messen, etwa den Anteil korrekter Antworten in einer monatlichen Stichprobe, und halten Sie Datenqualität und ERP-Verfügbarkeit ausdrücklich auf Ihrer Seite des Vertrags."
draft: false
---

KI-Coding drückt Salesforce-Projekte für Arbeitspakete mit klaren Abnahmekriterien in Richtung Festpreis, während die Abrechnung nach Aufwand für Discovery und undokumentierte Schnittstellen ihren Platz behält. Hinter der Frage Festpreis oder Aufwand steht eine andere: Wer behält den Produktivitätsgewinn, wenn ein Partner mit Coding-Agenten baut? Bei Stundenabrechnung verliert der Partner für jeden Tag, den der Agent spart, Umsatz, und hat wenig Grund, Ihnen die Ersparnis zu zeigen. Salesforce bezahlt Partner inzwischen für Verbrauch und für Agenten in Produktion. Ich würde Ergebnisse bezahlen, wo Sie sie messen können, und Stunden nur dort, wo niemand schätzen kann.

## Warum gerät die Abrechnung nach Aufwand durch KI unter Druck?

Abrechnung nach Aufwand, im Englischen Time and Materials (T&M), heißt: Sie bezahlen die tatsächlich geleisteten Personentage, unabhängig vom Ergebnis. Der Anreiz war schon immer schief, denn ein langsameres Team verdient mehr. Das ließ sich aushalten, weil der Aufwand für Salesforce-Arbeit recht stabil war. Ein Flow, eine Lightning-Seite oder ein Apex-Trigger mit Tests dauerte bei jedem guten Team ungefähr gleich lang.

Coding-Agenten brechen diese Stabilität auf. Lässt ein Entwickler Claude Code oder Agentforce Vibes die Apex-Klasse, die Testklasse und das Deployment-Manifest entwerfen, kann der Bauschritt deutlich schrumpfen. Bei Aufwandsabrechnung stellt der Partner dann weniger Tage in Rechnung und verdient weniger. Alle Anreize sprechen dafür, den Agenten still zu nutzen und abzurechnen wie bisher. Ich unterstelle hier keine böse Absicht. Ich sehe ein Geschäftsmodell, das Ehrlichkeit bestraft.

Wie groß der Gewinn ist, bleibt offen, und das zählt für die Preisgestaltung. McKinseys [Umfrage unter 334 Produkt- und Engineering-Verantwortlichen](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) (veröffentlicht im August 2026, durchgeführt im Mai) fand über den Entwicklungszyklus diese Werte:

```kennzahlen
11,8 % | Zeitersparnis im Schnitt
6,2 % | weniger Nacharbeit
30 % | der Befragten sehen die Produktivität ihrer Teams gesunken
quelle: McKinsey, Umfrage unter 334 Produkt- und Engineering-Verantwortlichen, August 2026
```

METRs [randomisierte Studie](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) maß erfahrene Entwickler Anfang 2025 mit KI als 19 Prozent langsamer; das [Update vom Februar 2026](https://metr.org/blog/2026-02-24-uplift-update/) deutet auf eine Beschleunigung hin, nennt die eigenen Daten aber „an unreliable signal“. Bevor Sie auf Basis einer Partneraussage nachverhandeln, messen Sie selbst, wie in [KI-Nutzen im Salesforce-Projekt messen](../ki-nutzen-salesforce-projekt-messen/) beschrieben.

Der Gewinn ist also bei manchen Aufgaben real und im Durchschnitt unsicher. Ein Vergütungsmodell muss regeln, wer diese Unsicherheit trägt.

## Was hat sich bei den Partner-Anreizen von Salesforce geändert?

Ihr Partner hat zwei Einnahmequellen: Ihre Rechnungen und Salesforce. Die zweite hat sich 2026 verändert.

- **Neues Partnerprogramm, 2. März 2026.** Salesforce hat den [Consulting Track umgebaut](https://www.salesforce.com/news/stories/rewarding-value-through-new-salesforce-partner-program/), mit zwei Stufen, Summit und Select, und koppelt die Partnervergütung „to active consumption rather than seat provisioning“. Zuschüsse für Implementierungen nach dem Verkauf belohnen „agent activation and consumption“. Salesforce peilt 1 Mrd. US-Dollar Umsatz aus Partner-Incentives an. Ein Startdatum nennt die Ankündigung nicht.
- **Forward Deployed Engineer (FDE) Partner Network, 15. April 2026.** Ein [exklusiver Kreis](https://www.salesforce.com/news/stories/salesforce-launches-forward-deployed-engineer-partner-network-announcement/) mit Accenture und Deloitte als Launch-Partnern, ausgewählt nach Produktionsergebnissen und Branchentiefe, Fertigungsindustrie eingeschlossen. Die Anreize hängen daran, dass Agenten in Produktion gehen.

Salesforces eigene Preise bewegen sich in dieselbe Richtung. Die [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) führt Help Agent Resolutions mit 400 Credits in Produktion und 0 in der Sandbox, beim Preis von [500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) also 2 € pro gelöstem Fall. Forrester [beschreibt das Agentic Enterprise License Agreement (AELA)](https://www.forrester.com/blogs/ai-agents-become-economic-actors-salesforce-rewrites-the-rules-of-pricing) als unbegrenzte Nutzung von Agentforce, Data 360 und MuleSoft zum Festpreis über zwei oder drei Jahre.

Für einen Hersteller hat das zwei Seiten. Ein Partner, der beim Go-live verdient, hat weniger Interesse an Piloten, die nie produktiv werden. Ein Partner, der für Verbrauch belohnt wird, hat kein Interesse daran, die Zahl der Agenten-Aktionen pro Händleranfrage niedrig zu halten. Ich würde jeden Partner fragen, welche Salesforce-Incentives ein Projekt auslöst. Die Anreize sind legitim, aber sie erklären, warum ein Angebot so aussieht, wie es aussieht.

## Vier Vergütungsmodelle und wo sie passen

| Modell | Sie bezahlen | Wer behält den KI-Gewinn | Passt im Maschinenbau |
|---|---|---|---|
| Nach Aufwand | geleistete Personentage | Sie, wenn der Partner ehrlich berichtet | Discovery, undokumentierte ERP- oder MES-Schnittstellen, Produktionssupport |
| Festpreis pro Arbeitspaket | ein abgenommenes Ergebnis | der Partner | Formulare im Händlerportal, Erfassung von Garantieanträgen, Flows und Apex mit prüfbaren Kriterien |
| Preiskatalog nach Story-Größe | Stories der Größe S, M oder L | geteilt, wenn Sie regelmäßig neu bepreisen | laufende Änderungen nach dem Go-live |
| Erfolgsanteil | ein gemessenes Geschäftsergebnis | geteilt | Agenten mit einer Kennzahl, die Sie selbst messen |

**Ein Festpreis braucht eine prüfbare Leistungsbeschreibung.** „Ein Händler reicht einen Garantieantrag mit Seriennummer, Fehlercode und Fotos ein; der Antrag wird gegen den Garantiebeginn der Anlage geprüft und für die Gutschrift an SAP übergeben“ lässt sich abnehmen. „Händlerservice verbessern“ nicht. KI macht das Bauen günstiger, gegen eine unklare Anforderung hilft sie nicht. [CMS weist darauf hin](https://cms.law/de/deu/legal-updates/meilensteine-und-abnahme-in-it-projekten), dass Softwareentwicklung in IT-Verträgen häufig dem Werkvertragsrecht mit Abnahme unterstellt wird, während beim Dienstvertrag, der üblichen Form der Aufwandsabrechnung, von Gesetzes wegen keine Abnahme vorgesehen ist. Genau dieser Unterschied verschiebt das Risiko zum Partner.

**Ein Preiskatalog passt zu Betrieb und Weiterentwicklung.** Sie vereinbaren einmal Preise pro Story-Größe, der Partner profitiert von jeder Effizienz, und Sie bekommen planbare Kosten. Eine Bedingung gehört dazu: Prüfen Sie den Katalog alle sechs Monate gegen gemessene Durchlaufzeiten, sonst behält der Partner den Gewinn für immer.

**Erfolgsanteile funktionieren als Anteil, nicht als ganzes Honorar.** Kein Partner kontrolliert Ihre Anlagendaten, die Verfügbarkeit Ihres SAP-Systems oder wie viele Händler das Portal nutzen. Ein Honorar, das komplett an der Nutzung hängt, ist für beide Seiten ein Glücksspiel. Nach meiner Einschätzung sind 10 bis 20 Prozent des Honorars, gekoppelt an eine Kennzahl, eine diskutable Größenordnung.

**Wer die Tokens bezahlt, gehört in den Preis.** McKinsey schätzt, dass Tokens, Rechenleistung, Infrastruktur und KI-Betrieb bis zu 20 Prozent der bisherigen Personalkosten erreichen können. Beim Festpreis trägt das der Partner, bei Aufwandsabrechnung muss der Vertrag sagen, wer. Die Zahlen stehen in [was KI-Coding im Salesforce-Projekt kostet](../ki-coding-kosten-salesforce-projekt/).

## Rechenbeispiel: Verlängerung eines Rahmenvertrags

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, Field Service für den Außendienst und SAP. Er arbeitet mit einem Implementierungspartner auf Basis eines Rahmenvertrags über 600 Personentage im Jahr zu 1.100 € pro Tag, insgesamt 660.000 €. Bei der Verlängerung erklärt der Partner, sein Team baue jetzt mit Coding-Agenten, und möchte den Tagessatz halten. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

Für das nächste Jahr sind drei Arbeitspakete geplant.

**Garantieantrag im Händlerportal.** Die SAP-Schnittstelle für Gutschriften existiert, die Regeln sind dokumentiert. Klassische Schätzung: 45 Personentage, 49.500 €. Der Partner rechnet mit Agenten mit etwa 30 Tagen. Nach Aufwand zahlten Sie 33.000 €, und der Partner verlöre für seine Ehrlichkeit 16.500 € Umsatz. Ein Festpreis von 49.500 € ließe ihm alles. Ich würde einen Festpreis von rund 41.000 € anbieten: Der Partner verdient pro tatsächlich gearbeitetem Tag etwa 1.370 €, Sie sparen 17 Prozent, und die Abnahme erfolgt gegen schriftliche Testfälle.

**Ersatzteildaten aus dem Altsystem einer Tochtergesellschaft.** Niemand kennt das Datenmodell, eine API-Dokumentation gibt es nicht. Jeder Festpreis würde einen hohen Risikoaufschlag verstecken. Ich würde zehn Tage Discovery nach Aufwand mit Obergrenze einkaufen und den Bau erst zum Festpreis vergeben, wenn die Schnittstelle verstanden ist.

**Agent für Händlerfragen zur Ersatzteilverfügbarkeit.** Festpreis bis zum Go-live, dazu ein variabler Anteil von 15 Prozent, fällig nach drei Monaten, wenn eine monatliche Stichprobe von 50 Antworten zu mindestens 90 Prozent korrekt ist. Der Maschinenbauer verantwortet die Messung und die Ersatzteilstammdaten, der Partner Prompts, Aktionen und Tests. Eine Obergrenze für Flex Credits pro beantworteter Anfrage schützt vor einem Agenten, der teurer wird, während der Partner für Verbrauch belohnt wird.

Der Tagessatz bleibt gleich. Neu ist, dass der Partner mehr verdient, wenn er schneller arbeitet, statt Umsatz zu verlieren.

## Erster Schritt: das Backlog nach Art der Arbeit sortieren

1. **Sortieren Sie das Backlog** in Pakete mit prüfbaren Abnahmekriterien, Discovery-Arbeit und laufende Änderungen. Jede Art bekommt ihr eigenes Modell.
2. **Messen Sie eine Basislinie** für Durchlaufzeit und Nacharbeit, bevor Sie nachverhandeln, damit Sie auf Daten bepreisen statt auf Behauptungen.
3. **Verlangen Sie Offenlegung** der eingesetzten Coding-Agenten und der Salesforce-Incentives, die das Projekt auslöst. Die Vertragsklauseln für KI-Nutzung beschreibe ich in [Partner mit KI-Coding: Regeln im Vertrag](../partner-ki-coding-regeln-vertrag/).
4. **Klären Sie, wer bezahlt**: Tokens und Flex Credits in Entwicklung, Sandbox-Tests und Produktion.
5. **Prüfen Sie Preise alle sechs Monate** gegen gemessene Zahlen. Kleinere, KI-native Teams verändern auch die Kostenbasis, siehe [KI und kleinere Salesforce-Teams](../ki-kleinere-salesforce-teams-delivery/).

Solche kommerziellen Regeln aufzusetzen gehört zu meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/), auf Kundenseite und ohne Anteil am Umsatz eines Partners. Für die Basislinie aus Punkt 2 reichen die Durchlaufzeiten der letzten 20 abgeschlossenen Stories aus Ihrem Ticketsystem.
