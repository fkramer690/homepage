---
title: "Agentforce-Piloten: Business Value und Datenqualität zuerst"
description: "Viele Salesforce-Kunden haben Agentforce getestet, doch viele hängen im Pilot fest. Warum Business Value und Datenqualität entscheiden, wie der Start gelingt."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: agentforce-business-value-datenqualitaet
translationKey: agentforce-business-value-data-quality
topic: ai
categories: [ai]
tags: [Agentforce, KI-Agenten, Datenqualität, Business Case, Architektur]
takeaways:
  - "In einer Oppenheimer-Umfrage hatten 85 Prozent der antwortenden Salesforce-Kunden Agentforce getestet oder eingeführt; fast die Hälfte im Pilot oder Test."
  - "In den Projekten, die ich sehe, bremsen fehlender Business Case, schlechte Daten und unklare Berechtigungen öfter als die Agentenkonfiguration."
  - "Jeder Agent braucht vor dem ersten Prompt eine zentrale Nutzenkennzahl sowie Grenzwerte für Qualität, Eskalation und Kosten pro erfolgreichem Ergebnis."
  - "Stammdaten, Wissensartikel und Zugriffsregeln aufzuräumen gehört zum Agentenprojekt, denn genau diese Daten liest der Agent."
  - "Starten Sie mit einem engen, häufigen Fall, lassen Sie bei riskanten oder unumkehrbaren Entscheidungen einen Menschen entscheiden und messen Sie ab Tag eins."
faq:
  - q: "Warum bleiben so viele Agentforce-Projekte in der Pilotphase?"
    a: "Häufige Gründe sind ein fehlender Business Case, unvollständige oder widersprüchliche Daten, unklare Zugriffsrechte und keine vereinbarte Erfolgsmessung. In den Projekten, die ich heute sehe, bremsen diese Punkte öfter als die Technik, auch wenn die Produktreife in meinem ersten Piloten eine echte Grenze war."
  - q: "Was gehört in einen Agentforce Business Case?"
    a: "In einen Agentforce Business Case gehören ein klarer Prozess, das heutige Volumen und die heutigen Kosten, ein messbares Ziel wie kürzere Bearbeitungszeit oder mehr Fälle ohne Eskalation, die erwarteten Verbrauchskosten und eine verantwortliche Person im Fachbereich."
  - q: "Wie wichtig ist Datenqualität für KI-Agenten?"
    a: "Sehr wichtig, aber allein nicht ausreichend. Ein Agent antwortet und handelt auf Basis von CRM-Daten, Wissensartikeln und angebundenen Systemen. Dubletten, veraltete Datensätze oder widersprüchliche Artikel erhöhen das Risiko falscher Antworten oder Aktionen. Über die Zuverlässigkeit entscheiden auch Datenabruf, Anweisungen, Berechtigungen, Aktionen und Tests."
  - q: "Welcher Anwendungsfall eignet sich als erstes Agentforce-Projekt?"
    a: "Geeignet ist ein klar begrenzter, häufiger und gut dokumentierter Prozess mit klaren Regeln, zum Beispiel Standardfragen im Service anhand gepflegter Wissensartikel zu beantworten oder Fallzusammenfassungen für Servicemitarbeitende vorzubereiten."
---

Agentforce-Projekte gelingen, wenn Business Value und Datenqualität an erster Stelle stehen und die Technik an zweiter Stelle. Die meisten Salesforce-Kunden in einer aktuellen Umfrage haben Agentforce ausprobiert, trotzdem verlassen viele Projekte die Pilotphase nie. In den Projekten, die ich heute sehe, liegt das seltener am Agenten selbst. Es fehlen ein Business Case, Daten, denen der Agent trauen kann, und durchdachte Zugriffsregeln. Mein erster Agentforce-Pilot war eine grüne Banane: ein Produkt, das ausgeliefert wurde, bevor es reif war. Heute sind mehrere Agentforce-Projekte, an denen ich beteiligt bin, in der Umsetzung, und der Unterschied liegt vor allem darin, wie sie gestartet sind.

## 85 Prozent getestet oder eingeführt, fast die Hälfte im Piloten

Die Zahlen aus dem Oktober 2026 zeigen ein gemischtes Bild. Eine Umfrage der Investmentbank Oppenheimer unter Salesforce-Kunden, [über die Salesforce Ben berichtet](https://www.salesforceben.com/85-of-customers-have-tried-agentforce-but-demand-hasnt-picked-up-why/), ergab, dass 85 Prozent der antwortenden Kunden Agentforce getestet oder eingeführt hatten. Das betrifft die Befragten, nicht die gesamte Kundenbasis. In derselben Umfrage gab fast die Hälfte an, noch in der Pilot- oder Testphase zu sein. Salesforce meldete zum 31. Januar 2026 mehr als 29.000 Agentforce-Abschlüsse seit dem Start, ohne anzugeben, wie viele davon bezahlt waren; die letzte eigene Zahl lag bei mehr als 9.500 bezahlten Abschlüssen zum 31. Oktober 2025.

Gleichzeitig wächst die Nachfrage nach Agentforce-Wissen schnell. Laut dem Talent-Report von 10K, ebenfalls [von Salesforce Ben aufgegriffen](https://www.salesforceben.com/agentforce-jobs-are-booming-while-projects-stall-in-pilot/), stiegen die Nennungen von Agentforce in Salesforce-Stellenanzeigen um 63 Prozent gegenüber dem Vorjahr, während die Nachfrage nach Salesforce-Fachkräften insgesamt um 13 Prozent sank.

![Agentforce im Oktober 2026: 85 Prozent der befragten Salesforce-Kunden haben Agentforce getestet oder eingeführt, fast die Hälfte steckt noch in der Pilot- oder Testphase, Salesforce meldete bis Januar 2026 mehr als 29.000 Agentforce-Abschlüsse seit dem Start, und Agentforce-Nennungen in Salesforce-Stellenanzeigen stiegen gegenüber dem Vorjahr um 63 Prozent, während die Nachfrage nach Salesforce-Fachkräften insgesamt um 13 Prozent sank. Viel Interesse, viele Demos, der produktive Einsatz hinkt hinterher.](../../../assets/blog/agentforce-adoption-de.png)

Unternehmen experimentieren, und Agentforce taucht in Salesforce-Stellenanzeigen öfter als Anforderung auf, aber der produktive Einsatz hinkt hinterher. Das deckt sich mit dem, was ich auf Kundenseite sehe: viel Interesse, viele Demos und eine Lücke zwischen einer überzeugenden Demo und einem Agenten, der jeden Tag zuverlässig arbeitet.

## Mein erster Pilot kam zu früh

```praxis
Der erste Agentforce-Pilot, an dem ich beteiligt war, startete schlicht zu früh. Die Plattform war jung und für unser Vorhaben noch nicht reif genug. Das ist ein normales Risiko bei neuer Technik, und es hat mich gelehrt, genauer auf die Bedingungen rund um einen Agenten zu schauen als auf den Agenten selbst.
```

Drei Bedingungen müssen erfüllt sein, bevor ein fachlicher Pilot mit echten Nutzern startet. Ein kurzer technischer Test kann früher erfolgen, gerade um herauszufinden, was fehlt:

- **Ein messbares Ziel.** „KI im Service ausprobieren“ ist kein Ziel. Ohne eine Kennzahl, die sich verbessern soll, kann niemand entscheiden, ob der Pilot erfolgreich war.
- **Verlässliche Daten.** Ein Agent liest Wissensartikel und CRM-Datensätze, die meist nie für einen automatischen Leser gepflegt wurden. Dubletten und veraltete Inhalte tauchen sofort in den Antworten auf.
- **Klare Verantwortung im Fachbereich.** Betreibt die IT den Piloten allein und verantwortet niemand in der Abteilung das Ergebnis, endet der Pilot als Demo.

Die Projekte, die jetzt in der Umsetzung sind, bauen auf diesen Bedingungen auf, und sie machen Fortschritte.

## Warum steht der Business Value an erster Stelle?

Ein KI-Agent verursacht an mehreren Stellen Kosten: Lizenzen oder Verbrauchs-Credits, Umsetzung, Tests, Wartung und die Zeit der Menschen, die ihn beaufsichtigen. Je nach Produkt rechnet Salesforce pro Benutzer, über Flex Credits, pro Konversation oder Lösung ab oder schließt die Nutzung in bestimmte Editionen und Add-ons ein. Agentenaktionen, Prompts, Data-360-Dienste, Voice sowie Test- und Sandbox-Läufe können jeweils Einheiten verbrauchen, und Salesforce hat Flex-Credit-Gebühren für agentische MCP- und API-Aufrufe angekündigt; prüfen Sie jeweils die aktuelle Rate Card. Das macht einen klaren Business Case wichtiger, nicht unwichtiger.

Ein guter Agentforce Business Case beantwortet ein paar einfache Fragen:

1. **Welcher Prozess?** Ein konkret beschriebener Prozess, zum Beispiel „Fragen von B2B-Kunden zum Lieferstatus beantworten“.
2. **Wie groß ist er heute?** Volumen pro Monat, durchschnittliche Bearbeitungszeit, Kosten pro Fall, Fehlerquote.
3. **Was soll sich ändern?** Eine zentrale Zielkennzahl, zum Beispiel dass 30 Prozent der Anfragen ohne Servicemitarbeitende beantwortet werden oder die Bearbeitungszeit pro Fall um zwei Minuten sinkt, dazu Grenzwerte wie Eskalationsquote, wieder geöffnete Fälle und Kosten pro erfolgreichem Ergebnis, damit der Agent nicht Qualität gegen Tempo tauscht.
4. **Was kostet es?** Kosten für die Umsetzung, der erwartete Verbrauch einschließlich Tests und Data 360 sowie der Aufwand für Wissenspflege und Tests.
5. **Wer verantwortet das Ergebnis?** Eine Person im Fachbereich, nicht in der IT, die berichtet, ob das Ziel erreicht wird.

Kann ein Anwendungsfall diese Fragen nicht beantworten, ist er nicht reif für einen Agenten. Das ist kein Scheitern. Es spart Geld, das sonst in einen Piloten fließt, den niemand bewerten kann.

## Warum entscheidet die Datenqualität als Zweites?

Ein Agent antwortet und handelt auf Basis dessen, was er lesen kann: CRM-Datensätze, Wissensartikel, Dokumente und Daten aus angebundenen Systemen. Schlechte oder widersprüchliche Daten erhöhen das Risiko, dass der Agent eine falsche Antwort oder Aktion mit großer Überzeugung präsentiert. Gute Daten sind notwendig, reichen allein aber nicht aus. Auch Datenabruf, Anweisungen, Berechtigungen, Aktionen und Tests bestimmen die Zuverlässigkeit.

In der Praxis prüfe ich diese Punkte, bevor ein Agent live geht:

- **Stammdaten.** Sind Accounts, Kontakte und Assets frei von Dubletten? Ist klar, welcher Datensatz der richtige ist? Ein Agent, der den falschen Account wählt, schickt falsche Informationen an den falschen Kunden.
- **Wissen.** Sind Wissensartikel aktuell und widerspruchsfrei, und ist jemand dafür verantwortlich? Zwei Artikel mit widersprüchlichen Rückgaberegeln führen zu widersprüchlichen Antworten.
- **Prozessdaten.** Werden Status, Termine und Felder zuverlässig gepflegt? Wird der Liefertermin in Salesforce nur einmal pro Woche aktualisiert, gibt der Agent veraltete Antworten.
- **Zugriffsrechte.** Was darf der Agent sehen und wem darf er was zeigen? Freigaberegeln, Sicherheit auf Feldebene und Datenklassifizierung müssen stimmen, bevor ein Agent damit arbeitet. Welcher Benutzerkontext gilt, hängt vom Agententyp ab: Agenten für Mitarbeitende können mit den Rechten des angemeldeten Benutzers laufen, externe Service-Agenten laufen oft als eigener Agent User. Eine Kunden-ID in einer Kontextvariablen schränkt den Datenzugriff nicht von selbst ein. Flows und Aktionen müssen die Daten deshalb auf den geprüften Kunden begrenzen.

Salesforce entwickelt dafür weitere Werkzeuge, etwa die Agent Context Engine, die Agenten kontrollierten Kontext aus Data 360 bereitstellt. Prüfen Sie ihre Verfügbarkeit, bevor Sie damit planen. Ich beschreibe sie ausführlicher im Beitrag [die Agent Context Engine erklärt](../salesforce-agent-context-engine-erklaert/). Aber auch die beste Kontextschicht kann nur weitergeben, was in den Daten steht.

Daten aufzuräumen ist keine glanzvolle Arbeit, und man schiebt sie leicht auf „später“ oder auf jemand anderen. In den Projekten, die vorankommen, steht sie von Anfang an im Projektplan.

## Wie sollte ein Agentforce-Projekt starten?

Aus dem, was ich gelernt habe, funktioniert diese Reihenfolge:

```schritte
Engen Prozess wählen
  Häufig, mit klaren Regeln und guter Dokumentation. Servicefragen aus gepflegten Wissensartikeln oder Fallzusammenfassungen für Servicemitarbeitende sind typische Kandidaten.
Ist-Zustand messen
  Bevor irgendetwas gebaut wird.
Daten aufräumen
  Für genau diesen Prozess, inklusive Wissen, Stammdaten und Berechtigungen.
Mit menschlicher Prüfung arbeiten
  Bei risikoreichen, finanziell bedeutenden oder unumkehrbaren Entscheidungen, etwa größeren Rabatten, Erstattungen oder Vertragsänderungen, mit festen Schwellenwerten für Fälle mit geringem Risiko. Die Freigabe kann über bestehende Salesforce-Genehmigungsprozesse oder Flow erfolgen oder über Produkte wie Agentforce Operations; Verfügbarkeit und Lizenzen hängen vom Weg ab.
Mit echten Fällen testen
  Auch mit den unangenehmen, und festlegen, was der Agent nicht tun darf.
Begrenzt live gehen
  In einem Kanal oder einer Region, gegen das Ziel messen und erst dann ausweiten.
```

Das ist ganz normale Projektdisziplin, angewendet auf eine neue Art von System. Agenten sollten denselben Release-Prozess durchlaufen wie jede andere Änderung: mit den unterstützten Metadaten im Repository, Deployment über eine Pipeline und dokumentierten Einrichtungsschritten für das, was Salesforce nicht paketiert, etwa MCP-Server-Registrierungen, wie ich es in [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/) beschreibe.

## Der Architekt fragt, ob der Agent seine Kosten wert ist

Auf Kundenseite ist es meine Aufgabe in Agentforce-Projekten, den Fokus auf dem Nutzen zu halten und dafür zu sorgen, dass die Grundlagen tragfähig sind: Datenmodell, Schnittstellen, Berechtigungen und Release-Prozess. Partner und Hersteller möchten verständlicherweise zeigen, was die Technik kann. Jemand muss fragen, ob ein bestimmter Agent seine Kosten wert ist und ob die Daten ihn tragen. Das ist ein Kernteil von [Architektur und Partnersteuerung](../../leistungen/salesforce-architektur/).
