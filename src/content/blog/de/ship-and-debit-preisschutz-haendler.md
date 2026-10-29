---
title: "Ship and Debit: Händleransprüche in Salesforce"
description: "Wann sich Channel Revenue Management für Ship-and-Debit- und Preisschutz-Ansprüche von Distributoren lohnt, was es kostet und welche Kanaldaten es braucht."
pubDate: 2026-10-28
lang: de
slug: ship-and-debit-preisschutz-haendler
translationKey: channel-revenue-ship-and-debit
topic: revenue
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Channel Revenue Management, Ship and Debit, Preisschutz, Distributoren]
takeaways:
  - "Ship and Debit gleicht einem Distributor aus, dass er an einen benannten Endkunden unter seinem eigenen Einkaufspreis verkauft, zu einem vereinbarten Sonderpreis. Die Differenz fordert er beim Hersteller ein."
  - "Channel Revenue Management prüft Ansprüche gegen Programmregeln, Sonderpreiskonditionen und Transaktionsdaten und markiert Dubletten, falsche Mengen und nicht berechtigte Verkäufe."
  - "Channel Revenue Management for Manufacturing steht als Add-on mit 30.000 Dollar pro Org und Jahr in der Liste. Partnerzugang kostet extra, eine andere Salesforce-Seite nennt Rebate Management ab 75 Dollar ohne Einheit."
  - "Boni belohnen Menge über einen Zeitraum. Ship and Debit und Preisschutz gleichen Preise aus, pro Geschäft oder bei sinkenden Listenpreisen."
  - "Ohne Abverkaufsdaten und Distributorbestand prüft die Validierung Belege, nicht Verkäufe. Genau dort entstehen Überzahlungen."
faq:
  - q: "Was ist Ship and Debit?"
    a: "Ship and Debit, auch Sonderpreisvereinbarung genannt, ist ein Vertrag mit einem reduzierten Preis für einen bestimmten Endkunden. Der Distributor verkauft unter seinem Einkaufspreis und fordert die Differenz mit Verkaufsnachweis beim Hersteller ein."
  - q: "Was unterscheidet Ship and Debit von einem Bonus?"
    a: "Ein Bonus belohnt einen Händler nachträglich für Menge über einen Zeitraum. Ship and Debit gleicht die Preisdifferenz für bestimmte Verkäufe an bestimmte Endkunden aus, Anspruch für Anspruch."
  - q: "Was kostet Channel Revenue Management?"
    a: "Die Add-on-Seite der Manufacturing Cloud nennt 30.000 Dollar pro Org und Jahr für Channel Revenue Management for Manufacturing. Die allgemeine Preisseite zeigt keinen Preis, setzt eine Sales-Cloud- oder CRM-Lizenz voraus und führt Partnerzugang, weitere Nutzer und Auszahlungen als zukaufbar auf."
  - q: "Brauchen Distributoren eine Portallizenz, um Ansprüche einzureichen?"
    a: "Im Ablauf auf Trailhead reichen Sachbearbeiter der Distributoren Ansprüche über ein Partnerportal in Experience Cloud ein. Partner Community for Manufacturing kostet laut Liste 20 Dollar pro Login oder 50 Dollar pro Mitglied und Monat. Welche Lizenz Salesforce dafür verlangt, klären Sie mit Ihrem Account-Team."
draft: false
---

Channel Revenue Management lohnt sich für Ship and Debit, wenn ein Hersteller viele Sonderpreisansprüche von Distributoren bekommt und heute von Hand prüft. Ship and Debit heißt: Der Distributor verkauft an einen benannten Endkunden unter seinem eigenen Einkaufspreis und fordert die Differenz ein. Salesforce prüft solche Ansprüche gegen Programmregeln und Transaktionsdaten und ergänzt Preisschutz für sinkende Listenpreise. Das Add-on steht mit 30.000 Dollar pro Org und Jahr in der Liste, Partnerzugang extra. Es trägt nur, wenn Abverkaufs- und Bestandsdaten der Distributoren ankommen, denn ohne sie prüft die Validierung nur, ob die Belege zum Programm passen.

## Was ist Ship and Debit?

Ship and Debit ist ein Sonderpreis für ein Geschäft. Die [Trailhead-Unit](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) nennt es Special Pricing Agreement, also Sonderpreisvereinbarung: einen Vertrag, der den reduzierten Preis für einen bestimmten Kunden festlegt, mit Laufzeit und enthaltenen Produkten. Jedes Programm gilt für eine Kombination aus Distributor und Endkunde.

Die Mechanik im Trailhead-Beispiel: Ein Distributor kauft Sensormodule für 100 Dollar und verkauft sie für 90 Dollar an Endkunden, die mehr als 1.000 Stück abnehmen. Der Hersteller erstattet 10 Dollar pro Stück. Der Distributor gewinnt das Projekt, der Hersteller hält den Listenpreis für alle anderen.

Preisschutz ist der zweite Anwendungsfall. Salesforce beschreibt ihn als Schutz der Partnermargen bei Preisänderungen. Senkt der Hersteller einen Listenpreis, wollen Distributoren mit Ware zum alten Preis im Lager die Differenz. Laut [Produktseite](https://www.salesforce.com/sales/channel-revenue-management/) lässt sich Preisschutz nach Partner, Preistyp, Dauer oder Berechtigung einrichten. Das Objekt dahinter, [PriceProtectionTerm](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_priceprotectionterm.htm), gibt es seit API-Version 63.0.

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

Flows steuern Einreichung und Freigabe, die Data Processing Engine verarbeitet große Mengen. Das zentrale Objekt ist der Rebate Partner Special Pricing Term. Er enthält Sonderpreis, Referenzpreis, erstattungsfähige Differenz, Mengenschwellen, Berechtigungen und Produkte. Ein Anspruch, der alle Prüfungen besteht, bekommt den Status System Processed. Die erste Unit nennt außerdem CRM-Analytics-Dashboards und vordefinierte Workflows für die Prüfung und setzt das Modul Business Rules Engine voraus.

Die Zahlung bleibt, wo sie heute ist. Salesforce rechnet und gibt frei, die Gutschrift bucht das ERP. Das ist dieselbe Aufteilung wie beim [Rebate Management](../rebate-management-haendlerboni/), und die Schnittstelle, die freigegebene Beträge nach SAP bringt, sollte gleich mitgeplant werden.

## Was kostet Channel Revenue Management?

Salesforce veröffentlicht zwei unterschiedliche Sichten:

| Quelle | Was dort steht |
|---|---|
| [Add-ons der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) | Channel Revenue Management for Manufacturing, 30.000 Dollar pro Org und Jahr, verfügbar mit den Sales-Editionen und Max |
| [Preisseite Channel Revenue Management](https://www.salesforce.com/sales/channel-revenue-management/pricing/) | Kein Preis, Angebot auf Anfrage. Setzt eine Sales-Cloud- oder CRM-Lizenz voraus. Enthält 10 Channel-Manager-Admin-Nutzer, Kanalbestandsverfolgung, Deal- und Design-Registrierung, Rebate-, Ship-and-Debit- und Preisschutz-Management. Partnerzugang, weitere Nutzer und Auszahlungen zukaufbar |
| [Experience-Cloud-Add-on-Seite](https://salesforce.com/manufacturing/cloud/experience-cloud) | Rebate Management „ab 75 Dollar“, ohne Einheit |

Die 30.000 Dollar decken also das Add-on für die Org, Partnerzugang für Distributoren kommt dazu. Die Add-on-Seite der Manufacturing Cloud nennt für Partner Community for Manufacturing 20 Dollar pro Login oder 50 Dollar pro Mitglied und Monat. Die 75 Dollar für Rebate Management passen nicht zu den 30.000 Dollar.

```hinweis offen
Ob Auszahlungen gezählt werden und wie viele enthalten sind, sagen die Seiten nicht. Lassen Sie sich von Salesforce schriftlich geben, welcher Preis für Ihren Vertrag gilt und ob Rebate Management allein schon in Ihrer Edition steckt.
```

Wie ich daraus einen Vergleich über fünf Jahre gegen den heutigen Prozess mache, beschreibe ich unter [Make-or-Buy und Lizenzprognose](../../leistungen/make-or-buy-lizenzen/).

## Was unterscheidet Ship and Debit von Händlerboni?

Boni belohnen Menge. Ein Händler erreicht über ein Quartal oder ein Jahr eine Staffel und bekommt nachträglich einen Prozentsatz zurück, wie in [Rebate Management für Händlerboni](../rebate-management-haendlerboni/) beschrieben. Ship and Debit gleicht Preise aus, Geschäft für Geschäft, für einen bestimmten Endkunden. Preisschutz gleicht ebenfalls Preise aus, ausgelöst durch eine Listenpreisänderung statt durch ein Geschäft.

Dieser Unterschied ändert, wer mit dem System arbeitet. Boni rechnen Programmverantwortliche am Periodenende. Ship-and-Debit-Ansprüche kommen laufend, von Sachbearbeitern bei Distributoren, und beim Hersteller muss sie jemand innerhalb weniger Tage bearbeiten. Trailhead verspricht Erstattungen innerhalb von Stunden statt Wochen für Ansprüche, die die automatische Prüfung bestehen. Die anderen braucht weiter ein Mensch.

Nach meiner Einschätzung brauchen viele Hersteller, die über Händler verkaufen, nur Boni. Ship and Debit wird wichtig, wenn Distributoren Lager halten und Projekte für Endkunden anbieten, die Sie auch kennen. Das ist typisch für Komponenten, Elektronik oder Industriebedarf im zweistufigen Vertrieb.

## Welche Daten braucht die Prüfung?

Abverkauf und Bestand. Ein Anspruch sagt: Ich habe 1.200 Stück zu 90 Dollar an Kunde X verkauft. Um das zu prüfen, braucht Salesforce drei Dinge:

- **Dass der Verkauf stattfand.** Verkaufsnachweise oder Point-of-Sale-Daten des Distributors, am besten als regelmäßige Datei, nicht als PDF pro Anspruch.
- **Dass die Ware aus Ihrer Lieferung stammt.** Kanalbestand pro Distributor, damit ein Anspruch über 1.200 Stück nicht über dem liegt, was der Distributor gekauft hat.
- **Dass der Endkunde berechtigt war.** Saubere Kundenstammdaten, damit „Kunde X GmbH“ und „Kunde X GmbH & Co. KG“ dieselbe Firma sind, wenn sie es sind.

Fehlt das, prüft die Validierung, ob die Belege zum Programm passen, aber nicht, ob der Verkauf echt war. Überzahlungen beim Preisschutz entstehen aus derselben Lücke: Ein Distributor meldet Lagerbestand zum alten Preis, den er nicht mehr hat. Die Kanalbestandsverfolgung ist im Paket enthalten, die Daten müssen trotzdem von den Distributoren kommen. Wie Distributorbestand nach Salesforce kommt und wie alt er dann ist, beschreibe ich in [Händlerbestand und Nachschub mit Agentforce](../haendlerbestand-nachschub-agentforce/).

## Szenario: 15 Distributoren und 600 Ansprüche im Monat

Ein typisches Szenario, als Annahme: Ein Hersteller elektronischer Komponenten verkauft über 15 Distributoren in Europa. Pro Monat kommen 600 Ship-and-Debit-Ansprüche per E-Mail, mit Excel-Listen im Anhang. Zwei Personen im Vertriebsinnendienst prüfen sie gegen Sonderpreisfreigaben in einem gemeinsamen Ordner und geben freigegebene Beträge an die Buchhaltung.

Mit Channel Revenue Management werden Sonderpreise zu Preiskonditionen, Distributoren reichen Ansprüche über das Portal ein, und die Prüfung lehnt Dubletten und Ansprüche über der freigegebenen Menge ab, bevor ein Mensch hinsieht. Angenommen, 80 Prozent bestehen automatisch. Die beiden Personen bearbeiten dann 120 Ausnahmen statt 600 Ansprüche.

Dagegen stehen 30.000 Dollar im Jahr für das Add-on, Portallizenzen für 15 Distributoren und der Aufwand für die Schnittstellen. Was Partner im Portal sehen und welche Lizenz das abdeckt, erklärt der Artikel zum [Manufacturing-Cloud-Kundenportal](../manufacturing-cloud-kundenportal/). Schicken nur drei Distributoren zwanzig Ansprüche im Monat, würde ich den heutigen Prozess behalten und zuerst die Freigaberegeln schärfen.

Das Kapitel [Händler und Partnerkanal](../../masterclass/manufacturing-cloud/haendler-und-partnerkanal/) der Masterclass zeigt, wo Ship and Debit neben Boni, Portalen und Händlerbesuchen steht.

## Wo sollten Sie anfangen?

1. **Zählen.** Ansprüche pro Monat, abgelehnte Ansprüche und die heutige Zeit bis zur Zahlung.
2. **Daten.** Welche Distributoren Abverkauf und Bestand als Datei liefern können, und wie oft.
3. **Preis.** Add-on, Partnerzugang und Auszahlungsvolumen schriftlich im Angebot.
4. **Prozess.** Wer Ausnahmen freigibt und wie freigegebene Beträge ins ERP kommen.

Channel Revenue Management lohnt sich für Ship and Debit, wenn viele Ansprüche kommen und die Distributoren die Daten zur Prüfung liefern.
