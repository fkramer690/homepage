---
title: "Salesforce Field Service Einführung: Warum in Wellen?"
description: "Salesforce Field Service in Wellen einführen: was eine Welle enthält, welche Themen früh zum Betriebsrat gehören und warum jedes Land eigene Regeln hat."
pubDate: 2026-10-27
lang: de
slug: salesforce-field-service-einfuehrung
translationKey: field-service-rollout
topic: field-service
categories: [field-service]
series: { id: field-service, part: 7 }
tags: [Field Service, Außendienst, Einführung, Betriebsrat, Datenschutz, Fertigung]
takeaways:
  - "Jede Welle bringt eigene Daten, Disponenten, Techniker und Partner mit. Die erste Welle ist der Test für alle weiteren."
  - "Beim Betriebsrat standen in meinen Projekten zwei Themen vorn: was Techniker voneinander sehen und wo sie sind. Zeigen Sie ihm das ganze System."
  - "Die Standortverfolgung der App lässt sich in Intervall und Genauigkeit einstellen und pro Techniker abschalten. Das gehört in die Gespräche."
  - "Je Land gelten andere Regeln. Wellen nach Ländern erlauben, die Konfiguration an die jeweiligen Regeln anzupassen."
faq:
  - q: "Wie führt man Salesforce Field Service am besten ein?"
    a: "In Wellen, also Region für Region oder Land für Land. Jede Welle umfasst die Stammdaten, Servicegebiete, Disponenten, Techniker und Partner einer Region. Die erste Welle ist zugleich der Test für alle weiteren."
  - q: "Muss der Betriebsrat bei Field Service beteiligt werden?"
    a: "In Deutschland in der Regel ja. Nach § 87 BetrVG bestimmt der Betriebsrat unter anderem bei technischen Einrichtungen mit, die Verhalten oder Leistung überwachen können, und bei Arbeitszeitregeln. § 90 BetrVG verlangt zusätzlich Unterrichtung und Beratung bei neuen Arbeitsabläufen. Standortdaten und Zeiterfassung sind typische Themen, Statuszeiten, Kennzahlen und automatische Planung können es auch sein. Die rechtliche Einordnung gehört zur Rechtsabteilung."
  - q: "Kann man die Standortverfolgung in der Field Service App einschränken?"
    a: "Ja. Intervall und Genauigkeit sind einstellbar, von etwa 10 Metern bis etwa einem Kilometer. Einzelne Techniker lassen sich ausschließen, und mit Appointment Assistant kann die Verfolgung auf den Status En Route begrenzt werden."
  - q: "Was gehört in eine Einführungswelle?"
    a: "Bereinigte Stammdaten der Region, eingerichtete Servicegebiete und Scheduling Policy, geschulte Disponenten und Techniker, angebundene Partner, geklärte Vereinbarungen mit Betriebsrat und Datenschutz sowie Kennzahlen, die vor und nach dem Start gemessen werden."
draft: false
---

Salesforce Field Service führe ich immer in Wellen ein, Region für Region oder Land für Land. Jede Welle bringt ihre eigenen Stammdaten, Disponenten, Techniker und Partner mit, und die erste Welle ist der Test für alle weiteren. Dazu kommt ein Thema, das oft zu spät auf den Tisch kommt: der Betriebsrat. In meinen Projekten spielte er vor allem bei der Sichtbarkeit der Techniker untereinander eine Rolle, etwa bei Timesheets, und beim Standort der Techniker. Beides sollte proaktiv angesprochen werden, zusammen mit allem anderen, was das System über Techniker erfasst. Und je Region und Land gelten andere Rahmenbedingungen, die vor jeder Welle zu prüfen sind.

Dies ist der letzte Teil der Serie. Die Teile davor beschreiben, was in jeder Welle stehen muss: die Entscheidung in [Teil 1](../salesforce-field-service-lohnt-sich/), die Stammdaten in [Teil 2](../salesforce-field-service-stammdaten/), die Planung in [Teil 3](../salesforce-field-service-terminplanung-automatisieren/), die Ersatzteile in [Teil 4](../salesforce-field-service-ersatzteile-erp/), die Verträge in [Teil 5](../salesforce-field-service-wartungsvertraege/) und die Partner in [Teil 6](../salesforce-field-service-servicepartner/). Alle Fragen zum Produkt mit Kurzantwort sammelt der Themen-Hub [Salesforce Field Service für Hersteller](../../masterclass/field-service/).

## Die erste Welle ist der Test für alle weiteren

Field Service verändert den Arbeitstag von Disponenten und Technikern. Ein Disponent, der seit Jahren mit einer Plantafel arbeitet, prüft plötzlich Vorschläge einer Engine. Ein Techniker, der Berichte auf Papier geschrieben hat, dokumentiert in einer App. Das gelingt nicht für alle gleichzeitig.

Eine Welle begrenzt das Risiko. Fehlen in der ersten Region Qualifikationen oder Öffnungszeiten, betrifft das ein Servicegebiet und nicht den ganzen Außendienst. Die Fehler der ersten Welle werden zu Prüfpunkten für die nächste. Dazu kommt ein praktischer Grund: Die Stammdaten aus Teil 2 lassen sich Region für Region bereinigen. Wer alles auf einmal startet, muss alles auf einmal sauber haben.

```praxis
In meinen Field-Service-Projekten mit Wartung, Störungseinsätzen und Inbetriebnahmen lagen die Stolpersteine an drei Stellen: Datenqualität der Anlagen, Akzeptanz bei den Technikern und Schnittstellen zum ERP. Alle drei bekommt man in einer Region leichter in den Griff als im ganzen Außendienst auf einmal.
```

Eine Welle sollte umfassen:

- die bereinigten Stammdaten der Region: Anlagen, Qualifikationen, Öffnungszeiten, Abwesenheiten
- die Servicegebiete und die Scheduling Policy, mit Freigabe durch den Disponenten wie in Teil 3
- die Partner der Region, wie in Teil 6 beschrieben
- Schulungen für Disponenten und Techniker kurz vor dem Start
- die geklärten Vereinbarungen mit Betriebsrat und Datenschutz für dieses Land
- Kennzahlen, die vor und nach dem Start gemessen werden

Zwischen zwei Wellen braucht es Luft. Die ersten Wochen nach dem Start einer Region sind die Zeit, in der Disponenten Vorschläge häufig ändern und Techniker Fragen zur App haben. Wer in dieser Phase schon die nächste Welle startet, verteilt die Aufmerksamkeit des Projektteams zu dünn. Hilfreich ist, wenn Disponenten der nächsten Welle vorher in der laufenden Region zuschauen. Sie lernen dort mehr als in jeder Schulung, weil sie echte Fälle aus ihrem eigenen Alltag sehen. Warum Schulung allein nicht reicht, damit Techniker die App annehmen, beschreibe ich in [Field Service App: wie Techniker sie annehmen](../field-service-app-akzeptanz-techniker/).

## Welche Themen gehören früh zum Betriebsrat?

Field Service sammelt Daten über Mitarbeitende. Zwei Themen haben in meinen Projekten dabei die größte Rolle gespielt.

**Sichtbarkeit untereinander.** Wer sieht wessen Termine, Arbeitszeiten und Timesheets? Field Service bietet laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.fs_set_up_timesheets.htm&language=en_US&type=5) Timesheets, in denen Techniker ihre Zeiten für eine Woche oder einen Monat erfassen, inklusive Fahrt- und Pausenzeiten, mit einem Genehmigungsprozess. Ob ein Techniker die Zeiten und Termine seiner Kollegen sieht, ob der Teamleiter alle sieht und wer genehmigt, entscheidet das Sharing. Das gehört geklärt, bevor es eingerichtet wird.

**Standort.** Die mobile App kann laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=service.mfs_resource_tracking.htm&type=5) den Standort der Techniker regelmäßig an Salesforce übertragen. Er landet im Feld Last Known Location an der Service Resource, und auf Wunsch lässt sich eine Historie mitschreiben. Die Planung nutzt ihn für bestimmte Fälle, nicht für die normale Planung. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.pfs_emergency.htm&language=en_US&type=5) berechnet der Notfall-Dispatch die Fahrzeit vom letzten bekannten Standort, solange er aktuell genug ist; sonst vom letzten Termin oder der Startadresse. Die reguläre Fahrzeitplanung arbeitet mit Terminadressen, vorherigen Terminen und der Startadresse. Für den Betriebsrat ist die Standortverfolgung ein Werkzeug, das Verhalten und Leistung sichtbar machen kann. Fragen Sie deshalb, welcher Anwendungsfall sie wirklich braucht.

Die Technik lässt sich einstellen. Darüber würde ich mit dem Betriebsrat konkret sprechen:

| Einstellung | Spielraum |
|---|---|
| Intervall | Wie oft die App den Standort überträgt, in Minuten |
| Genauigkeit | Fein (etwa 10 m), mittel (etwa 100 m) oder grob (etwa 1 km) |
| Ausnahmen | Einzelne Techniker lassen sich von der Verfolgung ausschließen |
| Zeitraum | Mit Appointment Assistant nur im Status En Route, also auf dem Weg zum Kunden |
| Historie | Ob alte Standorte gespeichert werden oder nur der letzte |

Dazu kommen die Qualifikationen und Abwesenheiten aus Teil 2 und die Spracheingabe, die ich in [Field Service Mobile im Außendienst](../salesforce-field-service-mobile-aussendienst/) beschreibe. Auch das sind Daten über Mitarbeitende.

In Deutschland reicht die Mitbestimmung weiter als diese zwei Themen. [§ 87 BetrVG](https://www.gesetze-im-internet.de/betrvg/__87.html) erfasst unter anderem technische Einrichtungen, die geeignet sind, Verhalten oder Leistung zu überwachen, Beginn und Ende der Arbeitszeit und Pausen sowie Fragen der Ordnung im Betrieb. [§ 90 BetrVG](https://www.gesetze-im-internet.de/betrvg/__90.html) verlangt rechtzeitige Unterrichtung und Beratung bei neuen technischen Anlagen, Arbeitsverfahren und Arbeitsplätzen. Ich würde dem Betriebsrat deshalb keine Funktionsliste vorlegen, sondern das ganze System, mit einer kurzen Prüfung je Thema:

- Welche Daten über Techniker erfasst es: Standort, Statuszeiten, Arbeitszeit, Qualifikationen, Abwesenheiten, Spracheingaben?
- Wer sieht sie: Kollegen, Teamleitung, Disponent, Partner?
- Welche Auswertungen sind möglich: Kennzahlen, Auslastung, Vergleiche zwischen Technikern?
- Was entscheidet die Engine automatisch, und wer kann es übersteuern?

Wie das im Einzelfall auszulegen ist, klärt die Rechtsabteilung.

```hinweis achtung
Aus Projektsicht zählt vor allem der Zeitpunkt. Wer erst mit dem Betriebsrat spricht, wenn die App fertig konfiguriert ist, riskiert Wochen Verzug und eine Konfiguration, die noch einmal umgebaut werden muss.
```

## Warum unterscheiden sich Regionen und Länder?

Ein internationaler Außendienst hat nicht eine Rechtslage, sondern viele. Mitbestimmung, Datenschutz und Arbeitszeitregeln unterscheiden sich je Land, manchmal auch je Region oder Standort mit eigener Arbeitnehmervertretung. Was in einem Land mit einer kurzen Abstimmung geht, braucht in einem anderen eine Betriebsvereinbarung.

Das spricht für Wellen nach Ländern. Jede Welle prüft die Rahmenbedingungen ihres Landes, bevor sie startet. Die Konfiguration muss das mitmachen: Die Mobile-Einstellungen lassen sich je Profil unterschiedlich zuordnen, sodass etwa die Standortverfolgung in einem Land aktiv ist und in einem anderen nicht. Das sollte von Anfang an so angelegt sein, damit das zweite Land nicht die Einstellungen des ersten erbt. Halten Sie die Zahl solcher Varianten aber klein, denn Profile tragen auch Berechtigungen, und ein Profil je Land und Rolle wird schnell schwer wartbar. Was neben Recht und Technik pro Land dazugehört, vom Sponsor in der Landesleitung bis zu den Key Usern, behandelt [Kapitel 4 der Masterclass Change Management](../../masterclass/change-management/change-management-rollout-laender/).

## Woran messen Sie den Erfolg einer Welle?

Jede Welle braucht Zahlen von vorher und nachher. Ich würde die nehmen, die in der Serie schon vorkamen:

- die vier Zahlen aus Teil 1: Einsätze pro Tag, Fahrzeitanteil, Fehlzuordnungen bei Qualifikationen und Teilen und Erstlösungsquote
- die Fehleinsätze aus Teil 2 und ihre Ursachen
- den Anteil der Vorschläge, die der Disponent vor der Freigabe ändert, aus Teil 3
- die eingehaltenen Reaktionszeiten aus Teil 5

Bessern sich die Zahlen in der ersten Welle nicht, liegt es meiner Einschätzung nach eher an Daten oder an einer Planung nebenher als am Produkt. Ich prüfe trotzdem jede Ursache: Daten, Konfiguration, Integration, Akzeptanz, Prozess und die Passung des Produkts. Ein Produkt, das nicht zur Art des Außendienstes passt, ist ein Ergebnis wie jedes andere. Welche Zahlen Sie beobachten sollten, steht in [Field Service Kennzahlen nach dem Go-live](../field-service-kennzahlen-operations-home/).

## Erster Schritt: eine Region mit sauberen Daten für die erste Welle

Wählen Sie für die erste Welle eine Region mit sauberen Daten, einem offenen Serviceleiter und überschaubarer Größe. Nehmen Sie den Betriebsrat in die Planung dieser Welle auf, nicht erst in ihre Abnahme. Und prüfen Sie vor jeder weiteren Welle die Rahmenbedingungen des Landes, bevor Sie Termine zusagen.
