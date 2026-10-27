---
title: "Agentforce: Business Value und Datenqualität zuerst"
description: "Fast alle Unternehmen haben Agentforce getestet, doch viele Projekte hängen im Pilot fest. Warum Business Value und Datenqualität über den Erfolg entscheiden."
pubDate: 2026-10-23
lang: de
slug: agentforce-business-value-datenqualitaet
translationKey: agentforce-business-value-data-quality
topic: ai
categories: [ai]
tags: [Agentforce, KI-Agenten, Datenqualität, Business Case, Architektur]
takeaways:
  - "Laut einer Umfrage von Oppenheimer haben 85 Prozent der Salesforce-Kunden Agentforce getestet oder eingeführt, fast die Hälfte steckt aber noch in Pilot oder Test."
  - "Agentforce-Projekte scheitern selten an der Technik, sondern an einem fehlenden Business Case, schlechter Datenqualität und unklaren Berechtigungen."
  - "Jeder Agent braucht ein messbares fachliches Ziel, bevor der erste Prompt geschrieben wird, etwa Bearbeitungszeit, Erstlösungsquote oder eingesparte Stunden pro Woche."
  - "Ein Agent ist nur so gut wie die Daten und das Wissen, die er liest; Stammdaten, Wissensartikel und Zugriffsregeln aufzuräumen gehört zum Projekt und ist keine Vorarbeit für andere."
  - "Starten Sie mit einem engen, häufigen Anwendungsfall, lassen Sie bei folgenreichen Entscheidungen einen Menschen mitentscheiden und messen Sie ab dem ersten Tag."
faq:
  - q: "Warum bleiben so viele Agentforce-Projekte in der Pilotphase?"
    a: "Häufige Gründe sind ein fehlender Business Case, unvollständige oder widersprüchliche Daten, unklare Zugriffsrechte und keine vereinbarte Erfolgsmessung. Die Technik selbst ist selten der Engpass."
  - q: "Was gehört in einen Agentforce Business Case?"
    a: "Ein klarer Prozess, heutiges Volumen und heutige Kosten, ein messbares Ziel wie kürzere Bearbeitungszeit oder mehr Fälle ohne Eskalation, die erwarteten Verbrauchskosten und ein Verantwortlicher im Fachbereich."
  - q: "Wie wichtig ist Datenqualität für KI-Agenten?"
    a: "Entscheidend. Ein Agent antwortet und handelt auf Basis von CRM-Daten, Wissensartikeln und angebundenen Systemen. Dubletten, veraltete Datensätze oder widersprüchliche Artikel führen direkt zu falschen Antworten oder Aktionen."
  - q: "Welcher Anwendungsfall eignet sich als erstes Agentforce-Projekt?"
    a: "Ein enger, häufiger und gut dokumentierter Prozess mit klaren Regeln, zum Beispiel Standardfragen im Service aus gepflegten Wissensartikeln beantworten oder Fallzusammenfassungen für Servicemitarbeitende vorbereiten."
---

Agentforce-Projekte gelingen, wenn Business Value und Datenqualität an erster Stelle stehen und die Technik an zweiter. Die meisten Salesforce-Kunden haben Agentforce inzwischen ausprobiert, trotzdem verlassen viele Projekte die Pilotphase nie. Nach meiner Erfahrung liegt das selten am Agenten selbst. Es fehlen ein Business Case, Daten, denen der Agent trauen kann, und durchdachte Zugriffsregeln. Mein erster Agentforce-Pilot war eine grüne Banane: ein Produkt, das ausgeliefert wurde, bevor es reif war. Heute sind mehrere Agentforce-Projekte, an denen ich beteiligt bin, in der Umsetzung, und der Unterschied liegt fast ausschließlich darin, wie sie gestartet sind.

## Wo steht die Agentforce-Einführung wirklich?

Die Zahlen aus dem Oktober 2026 zeigen ein geteiltes Bild. Eine Umfrage der Investmentbank Oppenheimer unter Salesforce-Kunden, [über die Salesforce Ben berichtet](https://www.salesforceben.com/85-of-customers-have-tried-agentforce-but-demand-hasnt-picked-up-why/), ergab, dass 85 Prozent Agentforce getestet oder eingeführt haben. In derselben Umfrage gab fast die Hälfte an, noch in der Pilot- oder Testphase zu sein. Salesforce selbst meldet mehr als 29.000 bezahlte Abschlüsse.

Gleichzeitig wächst die Nachfrage nach Agentforce-Wissen schnell. Laut dem Talent-Report von 10K, ebenfalls [von Salesforce Ben aufgegriffen](https://www.salesforceben.com/agentforce-jobs-are-booming-while-projects-stall-in-pilot/), stiegen die Nennungen von Agentforce in Salesforce-Stellenanzeigen um 63 Prozent gegenüber dem Vorjahr, während die Nachfrage nach Salesforce-Fachkräften insgesamt um 13 Prozent sank.

![Agentforce im Oktober 2026: 85 Prozent der befragten Salesforce-Kunden haben Agentforce getestet oder eingeführt, fast die Hälfte steckt noch in der Pilot- oder Testphase, Salesforce meldet mehr als 29.000 bezahlte Abschlüsse, und Agentforce-Nennungen in Salesforce-Stellenanzeigen stiegen gegenüber dem Vorjahr um 63 Prozent, während die Nachfrage nach Salesforce-Fachkräften insgesamt um 13 Prozent sank. Viel Interesse, viele Demos, der produktive Einsatz hinkt hinterher.](../../../assets/blog/agentforce-adoption-de.png)

Unternehmen experimentieren und stellen ein, aber der produktive Einsatz hinkt hinterher. Das deckt sich mit dem, was ich auf Kundenseite sehe: viel Interesse, viele Demos und eine Lücke zwischen einer überzeugenden Demo und einem Agenten, der jeden Tag zuverlässig arbeitet.

## Was habe ich aus meinem ersten Piloten gelernt?

Der erste Agentforce-Pilot, an dem ich beteiligt war, kam schlicht zu früh. Die Plattform war jung und für unser Vorhaben noch nicht reif genug. Das ist ein normales Risiko bei neuer Technik, und es hat mich gelehrt, genauer auf die Bedingungen rund um einen Agenten zu schauen als auf den Agenten selbst.

Drei Bedingungen müssen erfüllt sein, bevor ein Pilot startet:

- **Ein messbares Ziel.** „KI im Service ausprobieren“ ist kein Ziel. Ohne eine Zahl, die besser werden soll, kann niemand entscheiden, ob der Pilot erfolgreich war.
- **Verlässliche Daten.** Ein Agent liest Wissensartikel und CRM-Datensätze, die meist nie für einen automatischen Leser gepflegt wurden. Dubletten und veraltete Inhalte tauchen sofort in den Antworten auf.
- **Klare Verantwortung im Fachbereich.** Betreibt die IT den Piloten allein und verantwortet niemand in der Abteilung das Ergebnis, endet der Pilot als Demo.

Die Projekte, die jetzt in der Umsetzung sind, bauen auf diesen Bedingungen auf, und sie kommen voran.

## Warum steht der Business Value an erster Stelle?

Ein KI-Agent kostet auf mehreren Wegen Geld: Lizenzen oder Verbrauchs-Credits, Umsetzung, Tests, Wartung und die Zeit der Menschen, die ihn beaufsichtigen. Salesforce packt Verbrauchs-Credits in seine Editionen, und Partner und Kunden diskutieren noch, wie agentische API- und MCP-Aufrufe abgerechnet werden. Das macht einen klaren Business Case wichtiger, nicht unwichtiger.

Ein guter Agentforce Business Case beantwortet ein paar einfache Fragen:

1. **Welcher Prozess?** Ein Prozess, konkret beschrieben, zum Beispiel „Fragen von B2B-Kunden zum Lieferstatus beantworten“.
2. **Wie groß ist er heute?** Volumen pro Monat, durchschnittliche Bearbeitungszeit, Kosten pro Fall, Fehlerquote.
3. **Was soll sich ändern?** Eine Zielzahl, zum Beispiel 30 Prozent der Anfragen ohne Servicemitarbeitende beantwortet oder zwei Minuten weniger Bearbeitungszeit pro Fall.
4. **Was kostet es?** Umsetzung, erwarteter Verbrauch und der Aufwand für Wissenspflege und Tests.
5. **Wer verantwortet das Ergebnis?** Eine Person im Fachbereich, nicht in der IT, die berichtet, ob das Ziel erreicht wird.

Kann ein Anwendungsfall diese Fragen nicht beantworten, ist er nicht reif für einen Agenten. Das ist kein Scheitern. Es spart Geld, das sonst in einen Piloten fließt, den niemand bewerten kann.

## Warum entscheidet die Datenqualität als Zweites?

Ein Agent antwortet und handelt auf Basis dessen, was er lesen kann: CRM-Datensätze, Wissensartikel, Dokumente und Daten aus angebundenen Systemen. Was dort falsch ist, wird zu einer falschen Antwort oder Aktion, vorgetragen mit großer Überzeugung.

In der Praxis prüfe ich diese Punkte, bevor ein Agent live geht:

- **Stammdaten.** Sind Accounts, Kontakte und Anlagen frei von Dubletten? Ist klar, welcher Datensatz der richtige ist? Ein Agent, der den falschen Account wählt, schickt falsche Informationen an den falschen Kunden.
- **Wissen.** Sind Wissensartikel aktuell, widerspruchsfrei und hat jemand die Verantwortung dafür? Zwei Artikel mit widersprüchlichen Rückgaberegeln führen zu widersprüchlichen Antworten.
- **Prozessdaten.** Werden Status, Termine und Felder zuverlässig gepflegt? Wird der Liefertermin in Salesforce nur einmal pro Woche aktualisiert, gibt der Agent veraltete Antworten.
- **Zugriffsrechte.** Was darf der Agent sehen und wem darf er was zeigen? Freigaberegeln, Feldberechtigungen und Datenklassifizierung müssen stimmen, bevor ein Agent damit arbeitet, denn Salesforce wendet sie auch auf Agenten an.

Salesforce baut dafür mehr Werkzeuge, etwa die Agent Context Engine, die Agenten geregelten Kontext aus Data 360 zusammenstellt. Ich beschreibe sie ausführlicher in [die Agent Context Engine erklärt](../salesforce-agent-context-engine-erklaert/). Aber auch die beste Kontextschicht kann nur weitergeben, was in den Daten steht.

Daten aufräumen ist keine glanzvolle Arbeit, und man schiebt sie leicht auf „später“ oder zu jemand anderem. In den Projekten, die vorankommen, steht sie von Anfang an im Projektplan.

## Wie sollte ein Agentforce-Projekt starten?

Aus dem, was ich gelernt habe, funktioniert diese Reihenfolge:

1. **Einen engen, häufigen Prozess wählen** mit klaren Regeln und guter Dokumentation. Servicefragen aus gepflegten Wissensartikeln oder Fallzusammenfassungen für Servicemitarbeitende sind typische Kandidaten.
2. **Den Ist-Zustand messen**, bevor irgendetwas gebaut wird.
3. **Die Daten für genau diesen Prozess aufräumen**, inklusive Wissen, Stammdaten und Berechtigungen.
4. **Den Agenten mit einem Menschen in der Schleife bauen** für jede folgenreiche Entscheidung, etwa Rabatte, Gutschriften oder Vertragsänderungen. Salesforce bietet inzwischen Freigabeschritte, mit denen ein Agent solche Entscheidungen an eine Person übergibt.
5. **Mit echten Fällen testen**, auch den unangenehmen, und festlegen, was der Agent nicht tun darf.
6. **In einem begrenzten Kanal oder einer Region live gehen**, gegen das Ziel messen und erst dann ausweiten.

Das ist ganz normale Projektdisziplin, angewendet auf eine neue Art von System. Agenten sollten durch denselben Release-Prozess laufen wie jede andere Änderung, mit Konfiguration im Repository und Deployment über eine Pipeline, wie ich es in [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/) beschreibe.

## Welche Rolle spielt der Architekt?

Auf Kundenseite ist meine Aufgabe in Agentforce-Projekten, den Fokus auf dem Nutzen zu halten und dafür zu sorgen, dass die Grundlagen tragen: Datenmodell, Schnittstellen, Berechtigungen und Release-Prozess. Partner und Hersteller möchten verständlicherweise zeigen, was die Technik kann. Jemand muss fragen, ob ein bestimmter Agent seine Kosten wert ist und ob die Daten ihn tragen. Das ist ein Kernteil von [Architektur und Partnersteuerung](../../leistungen/salesforce-architektur/).

Agentforce kann echten Nutzen bringen, aber nur dort, wo ein klares fachliches Ziel auf Daten trifft, denen der Agent trauen kann. Wenn Sie ein Agentforce-Projekt planen oder eines aus der Pilotphase holen möchten, [schreiben Sie mir](#contact).
