---
title: "Forward Deployed Engineer bei Salesforce erklärt"
metaTitle: "Forward Deployed Engineer (FDE) bei Salesforce erklärt"
description: "Was ein Forward Deployed Engineer bei Salesforce macht, was er kostet, wann er sich für Hersteller lohnt und was die IT-Leitung vor dem Einsatz klären muss."
pubDate: 2026-11-11
lang: de
slug: forward-deployed-engineer-salesforce
translationKey: salesforce-forward-deployed-engineer
topic: ai
categories: [ai, architecture]
tags: [Forward Deployed Engineer, FDE, Agentforce, Implementierungspartner, Salesforce Architekt, KI-Agenten]
takeaways:
  - "Salesforce setzt FDEs in Pods ein: zwei Engineers und ein Deployment Strategist, die einen Agentforce-Anwendungsfall in Ihrer Org in Produktion bringen."
  - "Seit April 2026 stellen auch Partner aus dem FDE Partner Network solche Engineers. Ihre Anreize sind daran geknüpft, dass Agenten produktiv laufen."
  - "Einen öffentlichen Preis gibt es nicht. Gartner schätzt FDE-Honorare auf über 200.000 US-Dollar pro Quartal und Anwendungsfall."
  - "Ein FDE arbeitet für einen Anwendungsfall. Entscheidungen, Standards und den Betrieb nach der Hypercare muss weiter jemand auf Kundenseite tragen."
faq:
  - q: "Was ist ein Forward Deployed Engineer bei Salesforce?"
    a: "Ein Forward Deployed Engineer ist ein Engineer von Salesforce oder eines Partners, der direkt in der Org des Kunden einen Agentforce-Anwendungsfall entwirft, baut und bis in den Produktivbetrieb begleitet. Er meldet Plattformgrenzen an das Produktmanagement von Salesforce zurück."
  - q: "Was kostet ein Forward Deployed Engineer?"
    a: "Salesforce veröffentlicht keinen Preis. Gartner schätzt, dass FDE-Honorare 200.000 US-Dollar pro Quartal und Anwendungsfall übersteigen können, Bei klar umrissenen Aufgaben lohnt der Vergleich mit klassischen Partnermodellen."
  - q: "Ersetzt ein FDE den Implementierungspartner?"
    a: "Nein. Ein FDE-Pod bringt einen Anwendungsfall in Produktion. Prozessdesign über mehrere Clouds, SAP-Anbindung, Datenmigration und die laufende Weiterentwicklung bleiben beim Implementierungspartner oder bei Ihrem eigenen Team."
  - q: "Was ist das FDE Partner Network von Salesforce?"
    a: "Eine Auswahl von Partnern, die Salesforce am 15. April 2026 vorgestellt hat, darunter Accenture, Deloitte, Capgemini und PwC. Sie erhalten direkten Kontakt zu den Produktteams, und ihre Anreize sind daran geknüpft, dass Agenten in Produktion gehen."
draft: false
---

Ein Forward Deployed Engineer (FDE) bei Salesforce ist ein Entwickler, der in der Org eines Kunden einen konkreten Agentforce-Anwendungsfall baut und bis in den Produktivbetrieb begleitet. Er ist bei Salesforce selbst angestellt oder seit April 2026 auch bei einem Partner aus dem FDE Partner Network. Für einen Hersteller lohnt sich ein FDE, wenn bei einem klar umrissenen Agentforce-Anwendungsfall mit messbarem Nutzen Plattformgrenzen, Daten oder Berechtigungen das größte Risiko sind. Den Implementierungspartner ersetzt er nicht, und auch nicht die Person auf Kundenseite, die Entscheidungen vorbereitet und den Agenten nach dem Go-live verantwortet.

## Was ist ein Forward Deployed Engineer?

Bekannt gemacht hat die Rolle vor allem Palantir. Dort arbeiteten Engineers direkt beim Kunden und bauten die Software vor Ort, wie der [Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers) beschreibt. OpenAI, Anthropic, Google und Microsoft haben das Modell für ihre KI-Produkte übernommen. Salesforce nutzt es für Agentforce, teils auch für Data 360.

Bei Salesforce arbeiten FDEs in sogenannten Pods. Ein Pod besteht laut [Salesforce-Blog](https://www.salesforce.com/blog/fdes-back-to-build-agentforce/) aus zwei FDEs und einem Deployment Strategist. Die FDEs bauen Agenten, Aktionen, Integrationen und Guardrails, also die Grenzen, innerhalb derer ein Agent handeln darf. Die Stellenanzeigen von Salesforce verlangen produktiven Code in Python, JavaScript, Java oder Apex. Der Deployment Strategist berät den Kunden zum Anwendungsfall, zu den Messgrößen und zur Einführung.

Eine zweite Aufgabe unterscheidet den FDE von einem Berater. Laut [Salesforce Engineering](https://engineering.salesforce.com/accelerating-agentforce-deployments-from-6-months-to-3-weeks-across-150-enterprises/) dokumentieren die FDEs jeden technischen Blocker und spielen ihn in die Produkt-Roadmap zurück, statt eine Einzellösung für den Kunden zu bauen. Sie berichten wöchentlich an das Produktmanagement. Ein FDE arbeitet also für Ihren Anwendungsfall und für das Produkt seines Arbeitgebers zugleich.

## Wie Salesforce das FDE-Modell aufgebaut hat

Salesforce hat das eigene FDE-Modell 2025 öffentlich gemacht und 2026 auf Partner ausgeweitet:

```zeitleiste
2025-07-14 | Salesforce-Blog eines Senior FDE: Antwortzeit eines Agenten von 15 auf 3 bis 4 Sekunden gesenkt
2025-11-15 | Salesforce beschreibt das Pod-Modell mit zwei FDEs und einem Deployment Strategist
2026-04-15 | Start des FDE Partner Network mit Accenture und Deloitte als Launch-Partnern
2026-08-12 | Deloitte meldet das erste FDE-Projekt eines globalen Systemintegrators
2026-09-29 | Gartner warnt vor Aufpreisen ohne Liefertiefe und vor hohen Abbruchquoten
```

Zum [FDE Partner Network](https://www.salesforce.com/news/stories/salesforce-launches-forward-deployed-engineer-partner-network-announcement/) gehören neben Accenture und Deloitte unter anderem Capgemini, Cognizant, IBM Consulting, KPMG, PwC, Slalom, TCS und einige Regionalfirmen. Die Partner erhalten einen direkten Draht zu den Produktteams. Salesforce knüpft ihre Anreize daran, dass Agenten in Produktion gehen, und beschreibt vier Bausteine: Lösungsarchitektur, Agentendesign, Go-live mit Hypercare sowie Adoption und Change Management.

Einzelne Engineers der Partner lassen sich als FDE-Praktiker verifizieren. Laut [diginomica](https://diginomica.com/node/31193) gehören dazu ein Wissenstest, ein Workshop über zwei Tage und der Nachweis an einem echten Kundenprojekt. Salesforce nannte dort 84 Partner und über 800 verifizierte Praktiker. Was das neue Partnermodell für die Interessen Ihres Implementierungspartners bedeutet, steht im Kapitel [AIforce und Systemintegratoren](../../masterclass/ki-salesforce/aiforce-und-systemintegratoren/) der KI-Masterclass.

## Was ein FDE kostet und wer ihn bezahlt

Salesforce veröffentlicht keinen Preis für den Einsatz eigener FDEs. Auch die Partner haben keine einfache Antwort: Accenture sagte laut diginomica, Tagessätze für FDEs seien schwer festzulegen, weil die Leute knapp sind, und forderte Preisklarheit von Salesforce.

Die einzige öffentlich genannte Größenordnung stammt von Gartner. Laut [CIO Dive](https://www.ciodive.com/news/can-forward-deployed-engineers-fdes-fix-ai-gartner/831833/) schätzt Gartner, dass FDE-Honorare 200.000 US-Dollar pro Quartal und Anwendungsfall übersteigen können. Weltweit gibt es demnach rund 2.000 aktive FDEs bei etwa viermal so viel Bedarf. Gartner erwartet außerdem, dass rund 70 Prozent der anbietergeführten KI-Engineering-Einsätze bis 2028 abgebrochen werden.

```hinweis achtung
Gartner warnt, dass der Begriff „Forward Deployed“ lose verwendet wird. Manche Anbieter verlangen Aufpreise ohne die Liefertiefe, das Programm-Management und das Change Management, die den Preis rechtfertigen würden. Fragen Sie nach Agenten, die der Anbieter in Produktion gebracht hat, und nach den Leuten, die sie gebaut haben.
```

Für eine IT-Leitung heißt das: Ein FDE-Einsatz ist eine Investition in einen einzelnen Anwendungsfall, und sie ist teuer. Bei einer klar beschriebenen Aufgabe ohne Plattformrisiko ist ein guter Implementierungspartner mit festem Team oft günstiger und besser planbar. Wer keine eigene Engineering-Kompetenz aufbaut, zahlt laut CIO Dive auf Dauer diese Aufpreise.

## FDE, Implementierungspartner und Architekt auf Kundenseite

Ein FDE-Pod ergänzt ein Programm, in dem meist schon andere Rollen arbeiten. Die Aufteilung sieht dann so aus:

```tabelle
titel: Wer im Agentforce-Programm wofür verantwortlich ist
spalten: Rolle | Arbeitet für | Liefert
FDE-Pod von Salesforce | Salesforce | Einen Agenten in Produktion, Feedback an das Produkt *
FDE eines Partners | Den Partner mit FDE-Designation | Dasselbe, eingebettet ins Lieferteam des Partners
Implementierungspartner | Den Partner | Prozesse, Integration, Migration, Weiterentwicklung
Architekt auf Kundenseite | Den Hersteller | Zielbild, Standards, Entscheidungen, Übergabe in den Betrieb *
fazit: Der FDE-Pod ist zeitlich und auf einen Anwendungsfall begrenzt. Die anderen Rollen bleiben über die Laufzeit des Programms.
```

In meinem größten Programm arbeiteten fünf Implementierungspartner mit über 30 Entwicklern in acht Streams an einer Org. Ein FDE-Pod wäre dort eine weitere Partei gewesen, die in derselben Org entwickelt. Er muss sich an dieselben Entwicklungsstandards halten, an die [Object Ownership Matrix](../object-ownership-matrix-salesforce/), die festlegt, welcher Stream welches Objekt verantwortet, und an denselben Release-Prozess. Sonst baut ein sehr gutes Team einen sehr guten Agenten, den nach der Hypercare niemand sauber weiterführen kann.

Diese Einordnung gehört zur [Partnersteuerung](../../leistungen/partnersteuerung/): Wer bringt welche Regeln mit, wer gibt frei, wem gehören Repository und Pipeline. Ein FDE-Pod ändert daran nichts. Er macht die Fragen dringlicher, weil er schnell arbeitet und das Projekt nach wenigen Wochen verlässt.

## Was Salesforce-FDEs als größte Bremsen nennen

Der FDE-Director für Agentforce hat im Engineering-Blog von Salesforce zusammengefasst, was Einführungen bei über 150 Unternehmen gebremst hat. Wichtig sind vor allem die ersten beiden Punkte, weil sie organisatorisch sind:

- **Entscheidungsstau.** KI-Gremien und Architekturboards brauchen lange für Grundsatzentscheidungen, Governance-Reviews zu Sicherheit, Compliance und Monitoring verlangen ausführliche Scorecards. Mittelständler entscheiden laut Salesforce schneller.
- **Unfertige Plattformen.** Viele Orgs sind mitten in einer Migration, die Daten sind auf mehrere Systeme verteilt. Ob Data 360 sie per API oder per Zero Copy einbindet, ist eine Architekturfrage mit Folgen für Leistung und Kosten.
- **Zu viele Anweisungen.** Kunden schreiben immer mehr Regeln in die Anweisungen des Agenten, und der Agent antwortet dadurch schlechter. Feste Geschäftslogik gehört in Flows oder Code, wie ich in [Agent Script: Geschäftsregeln gehören nicht ins LLM](../agent-script-regeln-statt-llm/) beschreibe.
- **Fehlende Tests.** Einzelne Testsätze zeigen nicht, ob ein Gespräch über mehrere Schritte funktioniert. Salesforce hat dafür ein eigenes Framework für Tests über mehrere Gesprächsrunden gebaut. Wie Sie das in Ihrem Projekt lösen, steht in [Agentforce-Agenten testen](../agentforce-agenten-testen-freigeben/).

Salesforce gibt an, die Einführungszeit so von etwa sechs Monaten auf wenige Wochen gesenkt zu haben. Die Methode dahinter ist nicht offengelegt. Die ersten beiden Bremsen kann aber kein FDE allein lösen. Wenn im Architekturboard niemand die Entscheidung vorbereitet hat, wartet auch der beste Pod. Darum geht es auch in [Entscheider als Engpass im KI-Salesforce-Projekt](../entscheider-engpass-ki-salesforce-projekt/).

## Wann lohnt sich ein FDE für Hersteller?

Ich würde einen FDE-Einsatz an diesen Kriterien festmachen:

- **Ein Anwendungsfall mit messbarem Wert.** Zum Beispiel ein Serviceagent für Händleranfragen mit einer klaren Zielgröße wie Lösungsquote oder Bearbeitungszeit. Ohne Basislinie und Zielwert lässt sich der Preis nicht rechtfertigen.
- **Das größte Risiko ist die Plattform.** Der Anwendungsfall braucht Data 360, komplexe Berechtigungen, neue Funktionen oder kurze Antwortzeiten. Dort hilft der direkte Draht zum Produktteam am meisten.
- **Jemand übernimmt danach.** Ihr Team oder Ihr Implementierungspartner kann den Agenten nach der Hypercare weiterentwickeln. Sonst kaufen Sie einen Prototyp mit Produktionszugang.
- **Die Entscheidungswege sind kurz.** Datenzugang, Berechtigungen und die Freigabe im Architekturboard lassen sich in Tagen klären, nicht in Monaten.

Nicht lohnen würde sich ein FDE, wenn der größte Aufwand das Prozessdesign über mehrere Clouds, eine tiefe SAP-Anbindung oder eine Datenbereinigung ist. Das ist Arbeit für einen Implementierungspartner über Monate. Und wenn noch offen ist, ob ein Agent überhaupt der richtige Weg ist, klären Sie das zuerst. Die Kriterien dafür stehen in [Agentforce für Hersteller: jetzt starten oder warten?](../agentforce-ja-oder-nein-hersteller/)

## Erster Schritt: drei Zuständigkeiten klären, bevor der Pod anfängt

Bevor ein FDE-Pod oder ein Partner-FDE in Ihrer Org beginnt, schreiben Sie drei Namen auf: wer im Architekturboard Entscheidungen zum Agenten innerhalb einer Woche herbeiführt, wer Datenzugang und Berechtigungen freigibt und wer den Agenten nach der Hypercare fachlich und technisch verantwortet. Fehlt einer dieser Namen, besetzen Sie die Rolle vor dem Start, intern oder mit einem Architekten auf Ihrer Seite, und vereinbaren Sie mit dem Pod, welche Kennzahl nach 90 Tagen erreicht sein muss.
