---
title: "Field Service einführen: Warum in Wellen?"
description: "Salesforce Field Service in Wellen einführen: was eine Welle enthält, welche Themen früh zum Betriebsrat gehören und warum jedes Land eigene Regeln hat."
pubDate: 2026-10-27
lang: de
slug: salesforce-field-service-einfuehrung
translationKey: field-service-rollout
topic: field-service
series: { id: field-service, part: 7 }
tags: [Field Service, Außendienst, Einführung, Betriebsrat, Datenschutz, Fertigung]
takeaways:
  - "Salesforce Field Service führe ich immer in Wellen ein, Region für Region oder Land für Land. Jede Welle bringt ihre eigenen Daten, Disponenten, Techniker und Partner mit."
  - "Der Betriebsrat spielt bei zwei Themen eine Rolle: bei der Sichtbarkeit der Techniker untereinander, etwa bei Timesheets, und beim Standort der Techniker."
  - "Beide Themen sollten proaktiv auf den Tisch, bevor die erste Welle startet, und nicht erst, wenn die App schon auf den Geräten ist."
  - "Die Standortverfolgung der Field Service App lässt sich in Intervall und Genauigkeit einstellen und für einzelne Techniker ausschalten. Diese Einstellungen gehören in die Gespräche mit dem Betriebsrat."
  - "Je Region und Land gelten andere Rahmenbedingungen. Wellen nach Ländern erlauben, die Konfiguration an die jeweiligen Regeln anzupassen."
faq:
  - q: "Wie führt man Salesforce Field Service am besten ein?"
    a: "In Wellen, also Region für Region oder Land für Land. Jede Welle umfasst die Stammdaten, Servicegebiete, Disponenten, Techniker und Partner einer Region. Die erste Welle ist zugleich der Test für alle weiteren."
  - q: "Muss der Betriebsrat bei Field Service beteiligt werden?"
    a: "In Deutschland hat der Betriebsrat nach § 87 BetrVG ein Mitbestimmungsrecht bei technischen Einrichtungen, die Verhalten oder Leistung von Mitarbeitenden überwachen können. Standortdaten und Zeiterfassung fallen typischerweise darunter. Die rechtliche Einordnung gehört zur Rechtsabteilung."
  - q: "Kann man die Standortverfolgung in der Field Service App einschränken?"
    a: "Ja. Intervall und Genauigkeit sind einstellbar, von etwa 10 Metern bis etwa einem Kilometer. Einzelne Techniker lassen sich ausschließen, und mit Appointment Assistant kann die Verfolgung auf den Status En Route begrenzt werden."
  - q: "Was gehört in eine Einführungswelle?"
    a: "Bereinigte Stammdaten der Region, eingerichtete Servicegebiete und Scheduling Policy, geschulte Disponenten und Techniker, angebundene Partner, geklärte Vereinbarungen mit Betriebsrat und Datenschutz sowie Kennzahlen, die vor und nach dem Start gemessen werden."
draft: false
---

Salesforce Field Service führe ich immer in Wellen ein, Region für Region oder Land für Land. Jede Welle bringt ihre eigenen Stammdaten, Disponenten, Techniker und Partner mit, und die erste Welle ist der Test für alle weiteren. Dazu kommt ein Thema, das oft zu spät auf den Tisch kommt: der Betriebsrat. Er spielt eine Rolle bei der Sichtbarkeit der Techniker untereinander, etwa bei Timesheets, und beim Standort der Techniker. Beides sollte proaktiv angesprochen werden. Und je Region und Land gelten andere Rahmenbedingungen, die vor jeder Welle zu prüfen sind.

Dies ist der letzte Teil der Serie. Die Teile davor beschreiben, was in jeder Welle stehen muss: die Entscheidung in [Teil 1](../salesforce-field-service-lohnt-sich/), die Stammdaten in [Teil 2](../salesforce-field-service-stammdaten/), die Planung in [Teil 3](../salesforce-field-service-terminplanung-automatisieren/), die Ersatzteile in [Teil 4](../salesforce-field-service-ersatzteile-erp/), die Verträge in [Teil 5](../salesforce-field-service-wartungsvertraege/) und die Partner in [Teil 6](../salesforce-field-service-servicepartner/).

## Warum in Wellen und nicht auf einen Schlag?

Field Service verändert den Arbeitstag von Disponenten und Technikern. Ein Disponent, der seit Jahren mit einer Plantafel arbeitet, prüft plötzlich Vorschläge einer Engine. Ein Techniker, der Berichte auf Papier geschrieben hat, dokumentiert in einer App. Das gelingt nicht für alle gleichzeitig.

Eine Welle begrenzt das Risiko. Fehlen in der ersten Region Qualifikationen oder Öffnungszeiten, betrifft das ein Servicegebiet und nicht den ganzen Außendienst. Die Fehler der ersten Welle werden zu Prüfpunkten für die nächste. Dazu kommt ein praktischer Grund: Die Stammdaten aus Teil 2 lassen sich Region für Region bereinigen. Wer alles auf einmal startet, muss alles auf einmal sauber haben.

Eine Welle sollte umfassen:

- die bereinigten Stammdaten der Region: Anlagen, Qualifikationen, Öffnungszeiten, Abwesenheiten
- die Servicegebiete und die Scheduling Policy, mit Freigabe durch den Disponenten wie in Teil 3
- die Partner der Region, wie in Teil 6 beschrieben
- Schulungen für Disponenten und Techniker kurz vor dem Start
- die geklärten Vereinbarungen mit Betriebsrat und Datenschutz für dieses Land
- Kennzahlen, die vor und nach dem Start gemessen werden

Zwischen zwei Wellen braucht es Luft. Die ersten Wochen nach dem Start einer Region sind die Zeit, in der Disponenten Vorschläge häufig ändern und Techniker Fragen zur App haben. Wer in dieser Phase schon die nächste Welle startet, verteilt die Aufmerksamkeit des Projektteams zu dünn. Hilfreich ist, wenn Disponenten der nächsten Welle vorher in der laufenden Region zuschauen. Sie lernen dort mehr als in jeder Schulung, weil sie echte Fälle aus ihrem eigenen Alltag sehen.

## Welche Themen gehören früh zum Betriebsrat?

Field Service sammelt Daten über Mitarbeitende. Zwei Themen haben in meinen Projekten dabei eine Rolle gespielt.

**Sichtbarkeit untereinander.** Wer sieht wessen Termine, Arbeitszeiten und Timesheets? Field Service bietet laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.fs_set_up_timesheets.htm&language=en_US&type=5) Timesheets, in denen Techniker ihre Zeiten für eine Woche oder einen Monat erfassen, inklusive Fahrt- und Pausenzeiten, mit einem Genehmigungsprozess. Ob ein Techniker die Zeiten und Termine seiner Kollegen sieht, ob der Teamleiter alle sieht und wer genehmigt, entscheidet das Sharing. Das gehört geklärt, bevor es eingerichtet wird.

**Standort.** Die mobile App kann laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=service.mfs_resource_tracking.htm&type=5) den Standort der Techniker regelmäßig an Salesforce übertragen. Er landet im Feld Last Known Location an der Service Resource, und auf Wunsch lässt sich eine Historie mitschreiben. Für die Planung ist das nützlich, weil die Engine weiß, wo ein Techniker gerade ist. Für den Betriebsrat ist es ein Werkzeug, das Verhalten und Leistung sichtbar machen kann.

Die gute Nachricht: Die Technik lässt sich einstellen. Darüber würde ich mit dem Betriebsrat konkret sprechen:

| Einstellung | Spielraum |
|---|---|
| Intervall | Wie oft die App den Standort überträgt, in Minuten |
| Genauigkeit | Fein (etwa 10 m), mittel (etwa 100 m) oder grob (etwa 1 km) |
| Ausnahmen | Einzelne Techniker lassen sich von der Verfolgung ausschließen |
| Zeitraum | Mit Appointment Assistant nur im Status En Route, also auf dem Weg zum Kunden |
| Historie | Ob alte Standorte gespeichert werden oder nur der letzte |

Dazu kommen die Qualifikationen und Abwesenheiten aus Teil 2 und die Spracheingabe, die ich in [Field Service Mobile im Außendienst](../salesforce-field-service-mobile-aussendienst/) beschreibe. Auch das sind Daten über Mitarbeitende.

In Deutschland hat der Betriebsrat nach [§ 87 BetrVG](https://www.gesetze-im-internet.de/betrvg/__87.html) ein Mitbestimmungsrecht bei technischen Einrichtungen, die Verhalten oder Leistung der Arbeitnehmer überwachen. Wie das im Einzelfall auszulegen ist, klärt die Rechtsabteilung. Aus Projektsicht zählt vor allem der Zeitpunkt. Wer erst mit dem Betriebsrat spricht, wenn die App fertig konfiguriert ist, riskiert Wochen Verzug und eine Konfiguration, die noch einmal umgebaut werden muss.

## Warum unterscheiden sich Regionen und Länder?

Ein internationaler Außendienst hat nicht eine Rechtslage, sondern viele. Mitbestimmung, Datenschutz und Arbeitszeitregeln unterscheiden sich je Land, manchmal auch je Region oder Standort mit eigener Arbeitnehmervertretung. Was in einem Land mit einer kurzen Abstimmung geht, braucht in einem anderen eine Betriebsvereinbarung.

Das spricht für Wellen nach Ländern. Jede Welle prüft die Rahmenbedingungen ihres Landes, bevor sie startet. Die Konfiguration muss das mitmachen: Die Mobile-Einstellungen lassen sich je Profil unterschiedlich zuordnen, sodass etwa die Standortverfolgung in einem Land aktiv ist und in einem anderen nicht. Das sollte von Anfang an so angelegt sein, damit das zweite Land nicht die Einstellungen des ersten erbt.

## Woran messen Sie den Erfolg einer Welle?

Jede Welle braucht Zahlen von vorher und nachher. Ich würde die nehmen, die in der Serie schon vorkamen:

- die vier Zahlen aus Teil 1: Einsätze pro Tag, Fahrzeitanteil, Qualifikationen und Erstlösungsquote
- die Fehleinsätze aus Teil 2 und ihre Ursachen
- den Anteil der Vorschläge, die der Disponent vor der Freigabe ändert, aus Teil 3
- die eingehaltenen Reaktionszeiten aus Teil 5

Bessern sich die Zahlen in der ersten Welle nicht, liegt es meiner Einschätzung nach selten am Produkt. Meist fehlen Daten, oder die Planung wird noch nebenher gemacht.

## Wo sollten Sie anfangen?

Wählen Sie für die erste Welle eine Region mit sauberen Daten, einem offenen Serviceleiter und überschaubarer Größe. Nehmen Sie den Betriebsrat in die Planung dieser Welle auf, nicht erst in ihre Abnahme. Und prüfen Sie vor jeder weiteren Welle die Rahmenbedingungen des Landes, bevor Sie Termine zusagen.

Damit endet die Serie. Wenn Sie eine Einführung von Field Service planen und einen unabhängigen Architekten auf Ihrer Seite möchten, [schreiben Sie mir](#contact).
