---
title: "Ship and Debit: Händleransprüche in Salesforce"
metaTitle: "Salesforce Ship and Debit: Ablauf, Kosten und Daten"
description: "Ship and Debit in Salesforce: wie Ansprüche geprüft werden, welche Abverkaufs- und Bestandsdaten nötig sind und was zum Listenpreis von 30.000 Dollar dazukommt."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: ship-and-debit-preisschutz-haendler
translationKey: channel-revenue-ship-and-debit
topic: revenue
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Channel Revenue Management, Ship and Debit, Preisschutz, Distributoren]
takeaways:
  - "Bei Ship and Debit verkauft der Distributor einem benannten Endkunden unter seinem Einkaufspreis und fordert die Differenz beim Hersteller ein."
  - "Channel Revenue Management prüft Ansprüche gegen Programmregeln und Transaktionsdaten und markiert Dubletten, falsche Mengen und unberechtigte Verkäufe."
  - "Channel Revenue Management for Manufacturing steht mit 30.000 Dollar pro Org und Jahr in der Preisliste. Partnerzugang und weitere Nutzer kosten extra."
  - "Boni belohnen Menge über einen Zeitraum. Ship and Debit und Preisschutz gleichen Preisdifferenzen aus, je Geschäft oder bei sinkenden Listenpreisen."
  - "Ohne strukturierte Abverkaufsdaten bleibt die Prüfung belegbasiert, ohne Distributorbestand fehlt der Abgleich. Genau dort entstehen Überzahlungen."
faq:
  - q: "Was ist Ship and Debit?"
    a: "Bei Ship and Debit genehmigt der Hersteller einem Distributor einen Sonderpreis für bestimmte Produkte, Endkunden, Mengen und Zeiträume. Der Distributor verkauft aus seinem Lager unter seinem Einkaufspreis und fordert die Differenz danach mit Verkaufsnachweis beim Hersteller ein. Die Sonderpreisvereinbarung legt die Konditionen fest, der Anspruch löst die Erstattung aus."
  - q: "Was unterscheidet Ship and Debit von einem Bonus?"
    a: "Ein Bonus belohnt einen Händler nachträglich für die abgesetzte Menge in einem Zeitraum. Ship and Debit gleicht die Preisdifferenz für bestimmte Verkäufe an bestimmte Endkunden aus, Anspruch für Anspruch."
  - q: "Was kostet Channel Revenue Management?"
    a: "Die Add-on-Seite der Manufacturing Cloud nennt 30.000 Dollar pro Org und Jahr für Channel Revenue Management for Manufacturing. Die allgemeine Preisseite zeigt keinen Preis, setzt eine Sales-Cloud- oder CRM-Lizenz voraus und führt Partnerzugang, weitere Nutzer und Auszahlungen als zukaufbar auf. Den Verbrauch misst Salesforce am Gesamtwert der berechneten Auszahlungen; wie viel davon enthalten ist, muss im Angebot stehen."
  - q: "Welche Daten braucht Salesforce für Ship and Debit?"
    a: "Mindestens Sonderpreiskonditionen, berechtigte Distributoren und Endkunden sowie Verkaufsnachweise. Für eine weitgehend automatische Prüfung braucht es zusätzlich strukturierte Abverkaufsdaten und einen Abgleich mit Lieferungen, Retouren und dem Distributorbestand."
  - q: "Brauchen Distributoren eine Portallizenz, um Ansprüche einzureichen?"
    a: "Im Ablauf auf Trailhead reichen Sachbearbeiter der Distributoren Ansprüche über ein Partnerportal in Experience Cloud ein. Partner Community for Manufacturing kostet laut Liste 20 Dollar pro Login oder 50 Dollar pro Mitglied und Monat. Welche Lizenz Salesforce dafür verlangt, klären Sie mit Ihrem Account-Team."
draft: false
---

Channel Revenue Management lohnt sich für Ship and Debit, wenn ein Hersteller viele Sonderpreisansprüche von Distributoren erhält und heute von Hand prüft. Ship and Debit heißt: Der Distributor verkauft an einen benannten Endkunden unter seinem eigenen Einkaufspreis und fordert die Differenz ein. Salesforce prüft solche Ansprüche gegen Programmregeln und Transaktionsdaten und ergänzt Preisschutz für sinkende Listenpreise. Das Add-on steht mit 30.000 Dollar pro Org und Jahr in der Preisliste. Der Partnerzugang kostet extra. Es trägt sich nur, wenn Abverkaufs- und Bestandsdaten der Distributoren geliefert werden, denn ohne sie prüft die Validierung vor allem, ob die Belege zum Programm passen.

## Was ist Ship and Debit?

Ship and Debit ist ein Sonderpreis für ein Geschäft, und der Name beschreibt die zwei Schritte: Der Distributor liefert (ship) zum genehmigten Sonderpreis und belastet (debit) danach den Hersteller mit der Differenz. Die [Trailhead-Unit](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) nennt die Grundlage Special Pricing Agreement, also Sonderpreisvereinbarung: einen Vertrag, der den reduzierten Preis für einen bestimmten Kunden festlegt, mit Laufzeit und enthaltenen Produkten. Jedes Programm gilt für eine Kombination aus Distributor und Endkunde.

Die Mechanik im Trailhead-Beispiel: Ein Distributor kauft Sensormodule für 100 Dollar und verkauft sie für 90 Dollar an Endkunden, die mehr als 1.000 Stück abnehmen. Der Hersteller erstattet 10 Dollar pro Stück. Der Distributor gewinnt das Projekt, der Hersteller hält den Listenpreis für alle anderen.

Preisschutz ist der zweite Anwendungsfall. Salesforce beschreibt ihn als Schutz der Partnermargen bei Preisänderungen. Senkt der Hersteller einen Listenpreis, verlangen Distributoren mit Ware zum alten Preis im Lager die Differenz. Laut [Produktseite](https://www.salesforce.com/sales/channel-revenue-management/) lässt sich Preisschutz nach Partner, Preistyp, Dauer oder Berechtigung einrichten. Das Objekt dahinter, [PriceProtectionTerm](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_priceprotectionterm.htm), gibt es seit API-Version 62.0.

## Wie prüft Salesforce einen Anspruch?

Die [Trailhead-Unit zum Ablauf](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/explore-the-ship-and-debit-lifecycle) beschreibt sechs Schritte:

```schritte
Org vorbereiten | Admin
  Funktionen einschalten und die Zusammenarbeit mit Partnern über Experience Cloud einrichten.
Programm gestalten | Channel Manager
  Sonderpreiskonditionen, Berechtigungen und Anforderungen an Ansprüche festlegen, Partner und berechtigte Endkunden aufnehmen.
Verkaufen | Distributor
  Der Distributor verkauft zum Sonderpreis.
Anspruch einreichen | Sachbearbeiter beim Distributor
  Einreichung über das Partnerportal, mit Rechnungen oder Bestellungen als Verkaufsnachweis.
Prüfen | automatisch
  Prüfungen vergleichen den Anspruch mit Programmregeln, Sonderpreiskonditionen und Transaktionsdaten und markieren Dubletten, falsche Mengen und nicht berechtigte Verkäufe.
Abrechnen | Finanzabteilung
  Prüfen, korrigieren und erstatten. Das Transaction Journal hält freigegebene Auszahlungen für die Prüfung fest.
```

Flows steuern Einreichung und Freigabe, die Data Processing Engine verarbeitet große Mengen. Das zentrale Objekt ist der Rebate Partner Special Pricing Term. Er enthält Sonderpreis, Referenzpreis, erstattungsfähige Differenz, Mengenschwellen, Berechtigungen und Produkte. Ein Anspruch, der alle Prüfungen besteht, erhält den Status System Processed. Die erste Unit nennt außerdem CRM-Analytics-Dashboards und vordefinierte Workflows für die Prüfung. Voraussetzung ist außerdem das Modul Business Rules Engine.

Die Zahlung bleibt im bisherigen System. In der typischen Zielarchitektur rechnet Salesforce und gibt frei, die Gutschrift bucht das ERP; Salesforce ersetzt die Buchhaltung nicht. Ob die Übergabe beim freigegebenen Anspruch oder bei der Auszahlung ansetzt, legt das Lösungsdesign fest. Das ist dieselbe Aufteilung wie beim [Rebate Management](/blog/rebate-management-haendlerboni/), und die Schnittstelle, die freigegebene Beträge an SAP überträgt, sollte gleich mitgeplant werden.

## Was Salesforce zum Preis veröffentlicht und was offen bleibt

Salesforce veröffentlicht zwei unterschiedliche Sichten:

| Quelle | Was dort steht |
|---|---|
| [Add-ons der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) | Channel Revenue Management for Manufacturing, 30.000 Dollar pro Org und Jahr, verfügbar mit den Sales-Editionen und Max |
| [Preisseite Channel Revenue Management](https://www.salesforce.com/sales/channel-revenue-management/pricing/) | Kein Preis, Angebot auf Anfrage. Setzt eine Sales-Cloud- oder CRM-Lizenz voraus. Enthält 10 Channel-Manager-Admin-Nutzer, Kanalbestandsverfolgung, Deal- und Design-Registrierung, Rebate-, Ship-and-Debit- und Preisschutz-Management. Partnerzugang, weitere Nutzer und Auszahlungen zukaufbar |

Die 30.000 Dollar sind also der Listenpreis des Add-ons für die Org, nicht zwingend der Vertragswert. Partnerzugang für Distributoren kostet extra; welche externe Lizenz dafür passt, lässt sich aus den öffentlichen Seiten nicht eindeutig ableiten. Die [Experience-Cloud-Seite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) nennt für Partner Community for Manufacturing 20 Dollar pro Login oder 50 Dollar pro Mitglied und Monat.

```hinweis offen
Auszahlungen werden gezählt: Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=xcloud.chrm_payout_usage.htm&language=en_US&type=5) richtet sich der Verbrauch nach dem Gesamtwert aller Auszahlungen aus Boni, Ship and Debit, Preisschutz und Lagerrotation in der Vertragslaufzeit. Wie viel davon enthalten ist, sagen die Seiten nicht. Lassen Sie sich von Salesforce schriftlich geben, welcher Preis und welches Auszahlungsvolumen für Ihren Vertrag gelten.
```

Wie ich daraus einen Vergleich über fünf Jahre gegen den heutigen Prozess mache, beschreibe ich unter [Make-or-Buy und Lizenzprognose](/leistungen/make-or-buy-lizenzen/).

## Was unterscheidet Ship and Debit von Händlerboni?

Boni belohnen abgesetzte Mengen. Ein Händler erreicht über ein Quartal oder ein Jahr eine Staffel und erhält nachträglich einen Prozentsatz zurück, wie in [Rebate Management für Händlerboni](/blog/rebate-management-haendlerboni/) beschrieben. Ship and Debit gleicht Preisdifferenzen aus, Geschäft für Geschäft, für einen bestimmten Endkunden. Preisschutz gleicht ebenfalls Preisdifferenzen aus, ausgelöst durch eine Listenpreisänderung statt durch ein Geschäft.

Dieser Unterschied ändert, wer mit dem System arbeitet. Boni berechnen Programmverantwortliche am Periodenende. Ship-and-Debit-Ansprüche gehen laufend ein, von Sachbearbeitern bei Distributoren, und beim Hersteller muss sie jemand innerhalb weniger Tage bearbeiten. Trailhead verspricht Erstattungen innerhalb von Stunden statt Wochen für Ansprüche, die die automatische Prüfung bestehen. Für die anderen braucht es weiterhin einen Menschen.

Nach meiner Einschätzung brauchen viele Hersteller, die über Händler verkaufen, nur Bonusprogramme. Ship and Debit wird wichtig, wenn Distributoren Lager halten und Projekte für Endkunden anbieten, die Ihnen ebenfalls bekannt sind. Das ist typisch für Komponenten, Elektronik oder Industriebedarf im zweistufigen Vertrieb.

## Die Prüfung braucht Abverkauf und Distributorbestand

Entscheidend sind Abverkauf und Bestand. Ein Anspruch sagt: Ich habe 1.200 Stück zu 90 Dollar an Kunde X verkauft. Um das zu prüfen, braucht Salesforce drei Dinge:

- **Dass der Verkauf stattfand.** Verkaufsnachweise oder Point-of-Sale-Daten des Distributors, am besten als regelmäßige Datei, nicht als PDF pro Anspruch.
- **Dass die Ware aus Ihrer Lieferung stammt.** Kanalbestand pro Distributor, damit ein Anspruch über 1.200 Stück nicht über dem liegt, was der Distributor gekauft hat.
- **Dass der Endkunde berechtigt war.** Saubere Kundenstammdaten, damit „Kunde X GmbH“ und „Kunde X GmbH & Co. KG“ als dieselbe Firma erkannt werden, sofern sie identisch sind.

Fehlen strukturierte Abverkaufsdaten, prüft die Validierung vor allem, ob die Belege zum Programm passen. Fehlt der Bestand, prüft sie nicht, ob die beanspruchte Menge zu Lieferungen, Retouren und dem Lagerbestand des Distributors passt. Genau dieser Abgleich deckt Doppel- und Überzahlungen auf. Überzahlungen beim Preisschutz entstehen aus derselben Lücke: Ein Distributor meldet Lagerbestand zum alten Preis, den er nicht mehr hat. Die Kanalbestandsverfolgung ist im Paket enthalten, die Daten müssen trotzdem die Distributoren liefern. Wie Distributorbestand nach Salesforce gelangt und wie alt er dann ist, beschreibe ich in [Händlerbestand und Nachschub mit Agentforce](/blog/haendlerbestand-nachschub-agentforce/).

## Beispiel: 15 Distributoren und 600 Ansprüche im Monat

Die Zahlen sind Annahmen. Ein Hersteller elektronischer Komponenten verkauft über 15 Distributoren in Europa. Pro Monat gehen 600 Ship-and-Debit-Ansprüche per E-Mail ein, mit Excel-Listen im Anhang. Zwei Personen im Vertriebsinnendienst prüfen sie gegen Sonderpreisfreigaben in einem gemeinsamen Ordner und geben freigegebene Beträge an die Buchhaltung.

Mit Channel Revenue Management werden Sonderpreise als Preiskonditionen abgebildet, Distributoren reichen Ansprüche über das Portal ein, und die Prüfung lehnt Dubletten und Ansprüche über der freigegebenen Menge ab, bevor ein Mensch sie prüft. Angenommen, 80 Prozent bestehen die automatische Prüfung. Die beiden Personen bearbeiten dann 120 Ausnahmen statt 600 Ansprüche. Die 80 Prozent sind keine Salesforce-Kennzahl. Für einen Business Case würde ich vorher 100 bis 200 historische Ansprüche mit den geplanten Regeln prüfen und die echte Quote messen.

Dagegen stehen 30.000 Dollar im Jahr für das Add-on, Portallizenzen für 15 Distributoren und der Aufwand für die Schnittstellen. Was Partner im Portal sehen und welche Lizenz das abdeckt, erklärt der Artikel zum [Manufacturing-Cloud-Kundenportal](/blog/manufacturing-cloud-kundenportal/). Reichen nur drei Distributoren zwanzig Ansprüche im Monat ein, würde ich den heutigen Prozess behalten und zuerst die Freigaberegeln schärfen. Das Kapitel [Händler und Partnerkanal](/masterclass/manufacturing-cloud/haendler-und-partnerkanal/) der Masterclass zeigt, wo Ship and Debit neben Boni, Portalen und Händlerbesuchen steht.

## Ansprüche pro Monat zählen

1. **Zählen.** Ansprüche pro Monat, abgelehnte Ansprüche und die heutige Dauer bis zur Zahlung erfassen.
2. **Daten.** Prüfen, welche Distributoren Abverkauf und Bestand als Datei liefern können und wie oft.
3. **Test.** 100 bis 200 historische Ansprüche gegen die geplanten Regeln prüfen und zählen, wie viele die automatische Prüfung bestehen.
4. **Preis.** Add-on, Partnerzugang und Auszahlungsvolumen schriftlich im Angebot festhalten lassen.
5. **Prozess.** Festlegen, wer Ausnahmen freigibt und wie freigegebene Beträge ins ERP gelangen.
