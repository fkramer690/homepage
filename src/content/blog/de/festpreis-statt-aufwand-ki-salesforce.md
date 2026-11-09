---
title: "Festpreis statt Aufwand: KI in Salesforce-Projekten"
description: "Verschiebt KI Salesforce-Projekte von Abrechnung nach Aufwand zum Festpreis? Vier Vergütungsmodelle, neue Partner-Anreize und ein durchgerechnetes Szenario."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: festpreis-statt-aufwand-ki-salesforce
translationKey: fixed-price-ai-salesforce-partners
topic: governance
categories: [architecture, ai]
contactBrief: partner-governance
tags: [Festpreis, Abrechnung nach Aufwand, Partnersteuerung, KI-Coding, Partnerprogramm, Maschinenbau]
takeaways:
  - "Bei Stundenabrechnung rechnet ein Partner für jeden gesparten Tag weniger ab. Sie sehen den Gewinn nur in der Zeiterfassung oder als zusätzlichen Umfang."
  - "Salesforce hat im März 2026 verbrauchsabhängige Vergütung im Consulting Track angekündigt, das FDE Partner Network knüpft Anreize an Agenten in Produktion."
  - "In einer McKinsey-Umfrage nannten Befragte 11,8 Prozent Zeitersparnis, aber nur 6,2 Prozent weniger Nacharbeit. Bepreisen Sie selbst gemessenen Aufwand."
  - "Erfolgsanteile funktionieren als Teil des Honorars, gekoppelt an eine selbst gemessene Kennzahl und mit Verbrauchsobergrenze pro Vorgang."
faq:
  - q: "Werden Festpreisprojekte in Salesforce durch KI günstiger?"
    a: "Nicht automatisch. Ein Festpreis auf Basis der alten Schätzung gibt den gesamten KI-Gewinn an den Partner. Günstiger wird es für Sie nur, wenn Preise gegen gemessenen Aufwand überprüft werden, etwa alle sechs Monate."
  - q: "Wann ist Abrechnung nach Aufwand weiterhin richtig?"
    a: "Bei Discovery, undokumentierten ERP- oder MES-Schnittstellen und im Produktionssupport, wo niemand den Aufwand verlässlich schätzen kann. Eine Obergrenze und ein fester Prüftermin halten das unter Kontrolle."
  - q: "Was belohnt das neue Salesforce-Partnerprogramm?"
    a: "Laut Salesforce-Ankündigung vom 2. März 2026 hängt die Partnervergütung im umgebauten Consulting Track an aktivem Verbrauch statt an bereitgestellten Lizenzen, und Zuschüsse nach dem Verkauf belohnen Aktivierung und Verbrauch von Agenten. Welche Anreize greifen, hängt von der Berechtigung des Partners ab. Das FDE Partner Network knüpft Anreize an Agenten in Produktion."
  - q: "Kann ich meinen Partner für einen Agentforce-Agenten nach Erfolg bezahlen?"
    a: "Ja, als Anteil am Honorar. Koppeln Sie einen Teil an eine Kennzahl, die Sie selbst messen, etwa den Anteil korrekter Antworten in einer klar definierten monatlichen Stichprobe, und legen Sie fest, welche Seite für welche Abhängigkeit verantwortlich ist, etwa Stammdaten und ERP-Verfügbarkeit."
draft: false
---

KI-Coding drückt Salesforce-Projekte für Arbeitspakete mit klaren Abnahmekriterien in Richtung Festpreis, während die Abrechnung nach Aufwand für Discovery und undokumentierte Schnittstellen ihren Platz behält. Hinter der Frage Festpreis oder Aufwand steht eine andere: Wer behält den Produktivitätsgewinn, wenn ein Partner mit Coding-Agenten baut? Bei Stundenabrechnung rechnet der Partner für jeden Tag, den der Agent spart, weniger ab, und der Gewinn erreicht Sie nur, wenn Sie ihn sehen. Salesforce hat zudem Anreize für berechtigte Partner angekündigt, die an Verbrauch und an Agenten in Produktion hängen. Ich würde Ergebnisse bezahlen, wo Sie sie messen können, und Stunden nur dort, wo niemand schätzen kann.

## Warum gerät die Abrechnung nach Aufwand durch KI unter Druck?

Abrechnung nach Aufwand, im Englischen Time and Materials (T&M), heißt: Sie bezahlen die tatsächlich geleisteten Personentage, unabhängig vom Ergebnis. Der Anreiz war schon immer schief, denn ein langsameres Team verdient mehr. Das ließ sich aushalten, solange Sie ähnliche Aufgaben in derselben Org über die Zeit vergleichen konnten, auch wenn der Aufwand immer von Org-Komplexität, technischen Schulden, Schnittstellen und der Qualität der Anforderungen abhing.

Coding-Agenten brechen diese Stabilität auf. Lässt ein Entwickler Claude Code oder Agentforce Vibes die Apex-Klasse, die Testklasse und das Deployment-Manifest entwerfen, kann der Bauschritt deutlich schrumpfen. Bei Aufwandsabrechnung stellt der Partner dann weniger Tage in Rechnung oder nutzt die frei werdende Kapazität für weitere Stories aus Ihrem Backlog. Den Gewinn haben Sie nur, wenn der gesparte Aufwand in der Zeiterfassung sichtbar wird oder zu zusätzlich geliefertem Umfang führt. Ich unterstelle hier keine böse Absicht. Ich sehe eine Informationslücke, die das Vergütungsmodell schließen muss.

Wie groß der Gewinn ist, bleibt offen, und das zählt für die Preisgestaltung. McKinseys [Umfrage unter 334 Produkt- und Engineering-Verantwortlichen](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) (veröffentlicht im August 2026, durchgeführt im Mai) zeigt, was die Befragten selbst über den Entwicklungszyklus angaben:

```kennzahlen
11,8 % | Zeitersparnis im Schnitt
6,2 % | weniger Nacharbeit
30 % | gaben an, dass die Produktivität ihrer Teams gesunken ist
quelle: McKinsey, Umfrage unter Produkt- und Engineering-Verantwortlichen (334 gesamt, 173 ab Director-Ebene), Selbstauskunft, August 2026
```

METRs [randomisierte Studie](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) maß erfahrene Entwickler Anfang 2025 mit KI als 19 Prozent langsamer; das [Update vom Februar 2026](https://metr.org/blog/2026-02-24-uplift-update/) deutet auf eine Beschleunigung hin, nennt die eigenen Daten aber „an unreliable signal“. Bevor Sie auf Basis einer Partneraussage nachverhandeln, messen Sie selbst, wie in [KI-Nutzen im Salesforce-Projekt messen](../ki-nutzen-salesforce-projekt-messen/) beschrieben.

Der Gewinn ist also bei manchen Aufgaben real und im Durchschnitt unsicher. Ein Vergütungsmodell muss regeln, wer diese Unsicherheit trägt.

## Was hat sich bei den Partner-Anreizen von Salesforce geändert?

Ihr Partner hat zwei Einnahmequellen: Ihre Rechnungen und Salesforce. Die zweite hat sich 2026 verändert.

- **Neues Partnerprogramm, 2. März 2026.** Salesforce hat den [Consulting Track umgebaut](https://www.salesforce.com/news/stories/rewarding-value-through-new-salesforce-partner-program/), mit zwei Stufen, Summit und Select, und koppelt die Partnervergütung „to active consumption rather than seat provisioning“. Zuschüsse für Implementierungen nach dem Verkauf belohnen „agent activation and consumption“. Salesforce nennt als Ziel „$1 billion in revenue from partner incentives“. Ein Startdatum nennt die Ankündigung nicht, und welche Anreize ein Partner erhält, hängt von seiner Berechtigung ab.
- **Forward Deployed Engineering (FDE) Partner Network, 15. April 2026.** Ein [exklusiver Kreis](https://www.salesforce.com/news/stories/salesforce-launches-forward-deployed-engineer-partner-network-announcement/) mit Accenture und Deloitte als Launch-Partnern, ausgewählt nach Produktionsergebnissen und Branchentiefe, Fertigungsindustrie eingeschlossen. Die Anreize hängen daran, dass Agenten in Produktion gehen.

Salesforces eigene Preise bewegen sich in dieselbe Richtung. Die [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) vom 3. November 2026 führt die Nutzungsart Help Agent Resolutions mit 400 Credits in Produktion und 0 in der Sandbox, beim Listenpreis von [500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) (Stand 9. November 2026) also 2 € pro gelöstem Fall. Andere Nutzungsarten, etwa Aktionen, zählen auch in der Sandbox. Salesforce beschreibt das [Agentic Enterprise License Agreement (AELA)](https://www.salesforce.com/pricing/flexible-buying-models/) als Festpreis für eine feste Laufzeit mit unbegrenztem Zugriff auf seine verbrauchsbasierten Dienste und ohne Mehrkosten.

Für einen Hersteller hat das zwei Seiten. Ein Partner, der beim Go-live verdient, hat weniger Interesse an Piloten, die nie produktiv werden. Verbrauchsorientierte Anreize können Ihrem Ziel entgegenlaufen, die Zahl der Agenten-Aktionen pro Händleranfrage niedrig zu halten; ob sie das tun, hängt von der Berechtigung des Partners und dem konkreten Anreiz ab. Ich würde jeden Partner fragen, welche Salesforce-Incentives ein Projekt auslöst. Die Anreize sind legitim, aber sie erklären, warum ein Angebot so aussieht, wie es aussieht.

## Vier Vergütungsmodelle und wo sie passen

| Modell | Sie bezahlen | Wer behält den KI-Gewinn | Passt im Maschinenbau |
|---|---|---|---|
| Nach Aufwand | geleistete Personentage | Sie, wenn gesparter Aufwand in der Zeiterfassung oder als zusätzlicher Umfang sichtbar wird | Discovery, undokumentierte ERP- oder MES-Schnittstellen, Produktionssupport |
| Festpreis pro Arbeitspaket | ein abgenommenes Ergebnis | der Partner | Formulare im Händlerportal, Erfassung von Garantieanträgen, Flows und Apex mit prüfbaren Kriterien |
| Preiskatalog nach Story-Größe | Stories der Größe S, M oder L | geteilt, wenn Sie regelmäßig neu bepreisen | laufende Änderungen nach dem Go-live |
| Erfolgsanteil | ein gemessenes Geschäftsergebnis | geteilt | Agenten mit einer Kennzahl, die Sie selbst messen |

**Ein Festpreis braucht eine prüfbare Leistungsbeschreibung.** „Ein Händler reicht einen Garantieantrag mit Seriennummer, Fehlercode und Fotos ein; der Antrag wird gegen den Garantiebeginn der Anlage geprüft und für die Gutschrift an SAP übergeben“ lässt sich abnehmen. „Händlerservice verbessern“ nicht. KI macht das Bauen günstiger, gegen eine unklare Anforderung hilft sie nicht. [CMS weist darauf hin](https://cms.law/de/deu/legal-updates/meilensteine-und-abnahme-in-it-projekten), dass Softwareentwicklung in IT-Verträgen häufig dem Werkvertragsrecht mit Abnahme unterstellt wird, während beim Dienstvertrag von Gesetzes wegen keine Abnahme vorgesehen ist. Das Vergütungsmodell entscheidet nicht über den Vertragstyp: Maßgeblich ist, ob ein Erfolg oder sorgfältiges Tätigwerden geschuldet ist, und auch ein Dienstvertrag kann Tests und Freigaben vorsehen. Lassen Sie das juristisch prüfen; dies ist keine Rechtsberatung.

**Ein Preiskatalog passt zu Betrieb und Weiterentwicklung.** Sie vereinbaren einmal Preise pro Story-Größe, der Partner profitiert von jeder Effizienz, und Sie bekommen planbare Kosten. Eine Bedingung gehört dazu: Prüfen Sie den Katalog alle sechs Monate gegen gemessenen Aufwand, sonst behält der Partner den Gewinn für immer. Die Durchlaufzeit allein taugt dafür wenig, weil sie Wartezeiten auf Fachbereich, Testdaten und Freigaben enthält. Betrachten Sie aktive Bearbeitungszeit, Nacharbeit, Fehler nach Abnahme und Paketgröße getrennt.

**Erfolgsanteile funktionieren als Anteil, nicht als ganzes Honorar.** Kein Partner kontrolliert Ihre Anlagendaten, die Verfügbarkeit Ihres SAP-Systems oder wie viele Händler das Portal nutzen. Ein Honorar, das komplett an der Nutzung hängt, ist für beide Seiten ein Glücksspiel. Nach meiner Einschätzung sind 10 bis 20 Prozent des Honorars, gekoppelt an eine Kennzahl, eine diskutable Größenordnung.

**Wer die Tokens bezahlt, gehört in den Preis.** McKinsey schätzt, dass Tokens, Rechenleistung, Infrastruktur und KI-Betrieb bis zu 20 Prozent der bisherigen Personalkosten erreichen können. Sie bleiben bei der Seite, der der Vertrag sie zuweist, beim Festpreis wie bei Aufwandsabrechnung. Nutzt ein Partner Agentforce Vibes in Ihrer Org, kann das Ihre Flex Credits verbrauchen. Die Zahlen stehen in [was KI-Coding im Salesforce-Projekt kostet](../ki-coding-kosten-salesforce-projekt/).

## Rechenbeispiel: Verlängerung eines Rahmenvertrags

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, Field Service für den Außendienst und SAP. Er arbeitet mit einem Implementierungspartner auf Basis eines Rahmenvertrags über 600 Personentage im Jahr zu 1.100 € pro Tag, insgesamt 660.000 €. Bei der Verlängerung erklärt der Partner, sein Team baue jetzt mit Coding-Agenten, und möchte den Tagessatz halten. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

Für das nächste Jahr sind drei Arbeitspakete geplant.

**Garantieantrag im Händlerportal.** Die SAP-Schnittstelle für Gutschriften existiert, die Regeln sind dokumentiert. Klassische Schätzung: 45 Personentage, 49.500 €. Der Partner rechnet mit Agenten mit etwa 30 Tagen. Nach Aufwand zahlten Sie 33.000 €, und der Partner verlöre für seine Ehrlichkeit 16.500 € Umsatz. Ein Festpreis von 49.500 € ließe ihm alles. Ich würde einen Festpreis von rund 41.000 € anbieten: Liefert der Partner in 30 Tagen, steigt sein effektiver Umsatz auf etwa 1.370 € pro Tag, Sie sparen 17 Prozent, und die Abnahme erfolgt gegen schriftliche Testfälle.

**Ersatzteildaten aus dem Altsystem einer Tochtergesellschaft.** Niemand kennt das Datenmodell, eine API-Dokumentation gibt es nicht. Jeder Festpreis würde einen hohen Risikoaufschlag verstecken. Ich würde zehn Tage Discovery nach Aufwand mit Obergrenze einkaufen und den Bau erst zum Festpreis vergeben, wenn die Schnittstelle verstanden ist.

**Agent für Händlerfragen zur Ersatzteilverfügbarkeit.** Festpreis bis zum Go-live, dazu ein variabler Anteil von 15 Prozent, fällig nach drei Monaten, wenn eine zufällige monatliche Stichprobe von Antworten zu mindestens 90 Prozent korrekt ist, als Beispiel. Der Vertrag muss festlegen, was als korrekt gilt, welche Fehler kritisch sind (etwa eine falsche Verfügbarkeitszusage), wie groß die Stichprobe mindestens ist und wer strittige Fälle bewertet. Der Maschinenbauer verantwortet die Messung und die Ersatzteilstammdaten, der Partner Prompts, Aktionen, Tests, Fehlerbehandlung und das Monitoring veralteter oder fehlender Daten. Eine Obergrenze in der Verbrauchseinheit pro beantworteter Anfrage, je nach Kaufmodell Flex Credits oder gelöste Fälle, schützt vor einem Agenten, der teurer wird.

Der Tagessatz nach Aufwand bleibt für Discovery und Support bei 1.100 €. Neu ist, dass der Partner bei Festpreispaketen mehr verdient, wenn er schneller arbeitet, statt Umsatz zu verlieren.

## Das Backlog nach Art der Arbeit sortieren

1. **Sortieren Sie das Backlog** in Pakete mit prüfbaren Abnahmekriterien, Discovery-Arbeit und laufende Änderungen. Jede Art bekommt ihr eigenes Modell.
2. **Messen Sie eine Basislinie** für aktive Bearbeitungszeit und Nacharbeit, bevor Sie nachverhandeln, damit Sie auf Daten bepreisen statt auf Behauptungen.
3. **Verlangen Sie Offenlegung** der eingesetzten Coding-Agenten und der Salesforce-Incentives, die das Projekt auslöst. Die Vertragsklauseln für KI-Nutzung beschreibe ich in [Partner mit KI-Coding: Regeln im Vertrag](../partner-ki-coding-regeln-vertrag/).
4. **Klären Sie, wer bezahlt**: Tokens und Flex Credits in Entwicklung, Sandbox-Tests und Produktion.
5. **Prüfen Sie Preise alle sechs Monate** gegen gemessene Zahlen. Kleinere, KI-native Teams verändern auch die Kostenbasis, siehe [KI und kleinere Salesforce-Teams](../ki-kleinere-salesforce-teams-delivery/).

Solche kommerziellen Regeln aufzusetzen gehört zu meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/), auf Kundenseite und ohne Anteil am Umsatz eines Partners. Für die Basislinie aus Punkt 2 geben etwa 20 vergleichbare Stories aus Ihrem Ticketsystem eine erste Richtung, wenn Sie sie nach Art und Größe gruppieren und aktive Arbeit von Wartezeit trennen.
