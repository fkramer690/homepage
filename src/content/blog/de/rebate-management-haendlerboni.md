---
title: "Rebate Management: Händlerboni statt Excel"
description: "Wann sich Rebate Management der Manufacturing Cloud für Händlerboni lohnt, woher die Umsätze kommen und warum die Auszahlung weiter im ERP passiert."
pubDate: 2026-10-27
lang: de
slug: rebate-management-haendlerboni
translationKey: manufacturing-cloud-rebate-management
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Rebate Management, Händlerboni, ERP, Fertigung]
series: { id: manufacturing-cloud, part: 5 }
takeaways:
  - "Rebate Management rechnet Bonusprogramme für Händler und Kunden in Salesforce: Programm, Teilnehmer, Staffeln, Abrechnungszeiträume und Freigabe der Auszahlung."
  - "Die Berechnung braucht Transaktionen im Objekt Transaction Journal. Bei Herstellern kommen sie meist aus Rechnungen im ERP, manchmal als Upload der Händler über ein Portal."
  - "Salesforce rechnet und gibt frei, das ERP zahlt aus. Laut Salesforce holt eine Schnittstelle die freigegebenen Beträge und Rückstellungen ins ERP, wo die Finanzabteilung sie abrechnet."
  - "Vor dem Start muss feststehen, was als bonusrelevanter Umsatz zählt: Auftrag, Lieferung oder Rechnung, mit oder ohne Retouren."
  - "Rebate Management lohnt sich bei vielen Händlern mit gestaffelten Programmen. Ein einfacher Jahresbonus für wenige Kunden läuft oft auch im ERP."
faq:
  - q: "Was ist Rebate Management in Salesforce?"
    a: "Rebate Management ist die Funktion der Manufacturing Cloud für Bonus- und Rückvergütungsprogramme. Sie verwaltet Programme, Teilnehmer und Staffeln, rechnet Auszahlungen pro Zeitraum über die Data Processing Engine und führt sie durch eine Freigabe."
  - q: "Woher kommen die Umsätze für die Bonusberechnung?"
    a: "Aus dem Objekt Transaction Journal. Salesforce füllt es aus Aufträgen in Salesforce, aus CSV-Uploads der Partner über Experience Cloud oder per API und Data Loader aus externen Systemen wie dem ERP."
  - q: "Zahlt Salesforce die Boni aus?"
    a: "Nein. Salesforce rechnet die Beträge und gibt sie frei. Eine Schnittstelle überträgt die freigegebenen Auszahlungen und Rückstellungen ins ERP, und die Finanzabteilung rechnet sie dort ab, zum Beispiel als Gutschrift."
draft: false
---

Rebate Management lohnt sich für Hersteller, die Bonusprogramme für viele Händler mit Staffeln und Zeiträumen heute in Tabellen rechnen und deren Händler regelmäßig nach ihrem Stand fragen. Die Funktion der Manufacturing Cloud verwaltet Programme und Teilnehmer, rechnet die Boni pro Zeitraum und führt sie durch eine Freigabe. Ausgezahlt wird weiter im ERP. Ob sich das trägt, entscheidet sich an zwei Stellen: woher die bonusrelevanten Umsätze kommen und was genau als Umsatz zählt. Wie Teil 4 schreibe ich diesen Teil als Leitfaden für die Bewertung, nicht als Projektbericht.

## Was macht Rebate Management?

Rebate Management bildet ein Bonusprogramm von der Definition bis zur Freigabe der Auszahlung ab. Die [Salesforce-Hilfe zum Ablauf](https://help.salesforce.com/s/articleView?id=sf.admin_rebates_workflow.htm&language=en_US&type=5) beschreibt die Schritte so:

1. **Programm anlegen.** Der Programmverantwortliche legt das Programm an und bestimmt die Häufigkeit der Auszahlung, monatlich, quartalsweise oder jährlich.
2. **Teilnehmer aufnehmen.** Partnerkonten werden Mitglieder des Programms.
3. **Bonusarten und Staffeln definieren.** Jede Bonusart hat eine Berechnung und Staffeln, zum Beispiel ein höherer Prozentsatz ab einem bestimmten Umsatz. Staffeln können nach eigenen Kriterien variieren.
4. **Transaktionen laden.** Die Umsätze der Teilnehmer landen im Objekt Transaction Journal.
5. **Berechnen.** Ein geplanter Flow startet die Data Processing Engine, die Transaktionen pro Teilnehmer und Zeitraum zusammenrechnet und den Bonus ermittelt.
6. **Prüfen und freigeben.** Account Manager und Programmverantwortliche prüfen die Beträge, passen sie bei Bedarf an und geben sie frei, von Hand oder über eine Freigabe durch Vorgesetzte.
7. **Abrechnen.** Eine Schnittstelle holt die freigegebenen Beträge ins ERP.

Bis zum Berechnungsdatum steht der Status eines Teilnehmers auf „Calculation in Progress“, danach auf „Calculated“. Damit sieht der Vertrieb während des Zeitraums, wo ein Händler steht, und nicht erst am Jahresende.

## Woher kommen die Transaktionen?

Die Berechnung ist nur so gut wie die Umsätze im Transaction Journal. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.admin_rebates_populate_transaction_data.htm&language=en_US&type=5) gibt es drei Wege:

| Quelle | Wie sie ins Transaction Journal kommt | Passt, wenn |
|---|---|---|
| Aufträge in Salesforce | Eine vordefinierte Data-Processing-Engine-Definition überträgt aktive Aufträge | Aufträge ohnehin in Salesforce liegen |
| Belege der Partner | Partner laden Rechnungen oder Nachweise als CSV über Experience Cloud hoch | der Bonus am Abverkauf des Händlers hängt |
| Externe Systeme | Schnittstelle, Bulk API oder Data Loader, zum Beispiel aus dem ERP | Rechnungen im ERP liegen |

Bei den meisten Herstellern wird es der dritte Weg sein, weil die Rechnungen im ERP entstehen. Damit steht wieder dieselbe Frage im Raum wie bei Sales Agreements in [Teil 3](../sales-agreements-abnahmemengen-erp/): Welche Daten liefert das ERP, auf welcher Ebene und wie oft?

Der zweite Weg ist für einen bestimmten Programmtyp interessant. Hängt der Bonus am Abverkauf des Händlers an seine Kunden, kennt nur der Händler die Zahlen. Dann lädt er sie selbst hoch, und der Hersteller braucht eine Prüfung, bevor daraus eine Auszahlung wird.

## Was zählt als bonusrelevanter Umsatz?

Diese Frage beantwortet kein System. Laut Hilfe entscheiden Programmverantwortliche, was eine Transaktion enthält und ob pro Transaktion oder über eine Summe gerechnet wird. Ich würde vor dem Bau drei Punkte schriftlich festhalten:

- **Auftrag, Lieferung oder Rechnung.** Ein Bonus auf Aufträge läuft der Rechnung voraus, ein Bonus auf Rechnungen ist näher an dem, was die Finanzabteilung bucht. Welche Variante gilt, sollte im Händlervertrag stehen.
- **Retouren und Gutschriften.** Wird eine Retoure vom Umsatz abgezogen, und in welchem Zeitraum? Fehlt diese Regel, rechnet Salesforce einen Bonus auf Umsatz, der nie geblieben ist.
- **Welche Produkte.** Viele Programme schließen Produktgruppen aus oder gewichten sie anders. Diese Kriterien müssen als Felder in den Transaktionen stehen, sonst kann die Staffel sie nicht berücksichtigen.

Diese Regeln stehen heute meist in der Tabelle, mit der jemand im Vertrieb oder in der Finanzabteilung rechnet. Der erste Schritt einer Einführung ist deshalb, diese Tabelle zu lesen und jede Formel darin in eine Regel zu übersetzen.

## Was bleibt im ERP?

Die Auszahlung. Laut Hilfe holt eine Schnittstelle die freigegebenen Beträge und Rückstellungen ins ERP, und die Finanzabteilung rechnet sie dort ab, per Scheck, Gutschrift oder anders.

Für die Architektur ergibt sich daraus eine klare Aufteilung. **Salesforce führt** Programme, Teilnehmer, Staffeln, die Berechnung und die Freigabe, **das ERP führt** Rechnungen, Gutschriften, Rückstellungen und die Buchung:

```ablauf
erp: Rechnungen, Auszahlung
sf: Transaction Journal, Berechnung, Freigabe
Rechnungen --Schnittstelle--> Transaction Journal
Transaction Journal --> Berechnung
Berechnung --> Freigabe
Freigabe --Beträge--> Auszahlung
```

Die Rückstellungen verdienen einen eigenen Termin mit der Finanzabteilung. Wer einen Jahresbonus monatlich zurückstellt, braucht jeden Monat eine Zahl. Kommt sie aus Salesforce, muss sie pünktlich zum Monatsabschluss im ERP sein. Wie ich führende Systeme pro Datenart festlege, beschreibe ich unter [Integration mit ERP, Middleware und Telefonie](../../leistungen/salesforce-schnittstellen/).

## Was sehen Händler?

Optional ihre Beträge. Laut Hilfe können Partner ihre Auszahlungen über Experience Cloud sehen. Für Händler, die heute per E-Mail nach ihrem Stand fragen, ist das der sichtbarste Nutzen.

Laut der Übersicht der Portallizenzen, die ich in [Teil 7: Kundenportal in der Manufacturing Cloud](../manufacturing-cloud-kundenportal/) beschreibe, nennt Salesforce Bonusansprüche bei der Lizenz Partner Community for Manufacturing. Wer Händlern Boni im Portal zeigen will, plant also Partnerlizenzen ein, nicht die günstigere Kundenlizenz.

```hinweis achtung
Ein Händler, der seinen Zwischenstand sieht, richtet sein Verhalten danach aus. Fehlen dort Retouren oder sind Zahlen eine Woche alt, entsteht Ärger am Ende des Zeitraums. Ich würde den Zwischenstand erst freischalten, wenn die Berechnung ein paar Zeiträume lang intern gestimmt hat.
```

## Wann lohnt sich Rebate Management?

```praxis
In einem Fertigungsprojekt habe ich die Manufacturing Cloud bewertet und mich dagegen entschieden, weil die Kernfunktion nicht zum Geschäft passte.
```

Die Regel daraus gilt hier genauso: Eine Funktion wird gekauft, wenn sie zum Geschäft passt. Für Rebate Management heißt das, ich würde es empfehlen, wenn mehrere dieser Punkte zutreffen:

- **Viele Teilnehmer.** Dutzende oder Hunderte Händler, keine Handvoll Kunden.
- **Gestaffelte Programme.** Mehrere Stufen, Produktgruppen oder Zeiträume, die sich jedes Jahr ändern.
- **Fehler in der Tabelle.** Die Berechnung ist heute aufwendig, fehleranfällig oder hängt an einer Person.
- **Händler fragen nach.** Der Innendienst beantwortet regelmäßig Anfragen zum Bonusstand.

Zurückhaltend wäre ich bei einem einfachen Jahresbonus für wenige Kunden. Den können viele ERP-Systeme über Konditionen abrechnen, ohne eine zweite Logik in Salesforce. Boni belohnen Menge; Preisansprüche von Distributoren sind ein anderer Prozess, siehe [Ship and Debit](../ship-and-debit-preisschutz-haendler/). Ob sich die Manufacturing Cloud insgesamt lohnt, behandelt [Teil 1 der Serie](../manufacturing-cloud-wann-lohnt-sie-sich/).

## Wo sollten Sie anfangen?

Bevor das erste Programm angelegt wird, klären Sie vier Punkte:

1. **Die heutige Tabelle.** Jede Formel darin als Regel aufschreiben.
2. **Bonusrelevanter Umsatz.** Auftrag, Lieferung oder Rechnung, mit Retouren und Produktgruppen.
3. **Transaktionen.** Welches System liefert sie, auf welcher Ebene und wie oft?
4. **Abrechnung.** Wann kommen Freigaben und Rückstellungen ins ERP, abgestimmt mit dem Monatsabschluss?

Rebate Management ersetzt die Tabelle, wenn die Regeln darin vorher sauber aufgeschrieben sind und das ERP weiter auszahlt.
