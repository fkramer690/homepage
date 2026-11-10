---
title: "Revenue Cloud, Manufacturing Cloud oder B2B Commerce?"
description: "Welches Salesforce-Produkt welchen Teil des Herstellervertriebs abdeckt: konfigurierte Angebote, Rahmenverträge und Prognosen oder Händlerbestellungen im Shop."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: revenue-cloud-manufacturing-cloud-commerce-abgrenzung
translationKey: revenue-cloud-vs-manufacturing-cloud-commerce
topic: revenue
categories: [revenue-cloud, manufacturing-cloud, b2b-commerce]
tags: [Revenue Cloud, Manufacturing Cloud, B2B Commerce, Angebote, Architektur, Fertigung]
takeaways:
  - "Revenue Cloud ist unter den dreien das Angebotssystem, vom Konfigurator über Angebot bis Auftrag; die volle Abrechnung braucht eine eigene Billing-Lizenz."
  - "Manufacturing Cloud verfolgt das Seriengeschäft mit Sales Agreements und Account Forecasts. Bei komplex konfigurierten Angeboten sollte Revenue Cloud führen."
  - "B2B Commerce lässt Händler und Kunden selbst bestellen. Bei Herstellern ist es am stärksten für bekannte Artikel wie Ersatzteile und Verbrauchsmaterial."
  - "Zwei getrennt gebaute Angebotsmodelle können zwei Preise für dieselbe Maschine ergeben. Legen Sie pro Prozessschritt fest, welches Produkt führt."
faq:
  - q: "Was ist der Unterschied zwischen Revenue Cloud und Manufacturing Cloud?"
    a: "Revenue Cloud konfiguriert und bepreist Produkte, erstellt Angebote und führt das Geschäft bis zum Auftrag sowie, mit der Billing-Lizenz, bis zur Abrechnung. Manufacturing Cloud plant und misst wiederkehrendes Geschäft mit Sales Agreements und Account Forecasts. Ein Angebot aus Revenue Cloud kann der Ausgangspunkt für ein Sales Agreement in Manufacturing Cloud sein."
  - q: "Brauche ich Revenue Cloud für B2B Commerce?"
    a: "Nicht für einen Shop mit Preisbüchern. Die Salesforce-Hilfe nennt für Agentforce Revenue Management for B2B Commerce eine Commerce-Growth- oder Commerce-Advanced-Lizenz plus eine Revenue-Cloud-Advanced-Lizenz. Diese Lizenzkombination ergänzt den Shop um Preisprozeduren, konfigurierbare Bundles, Abonnements und Request for Quote."
  - q: "Kann Manufacturing Cloud den Produktkatalog von Revenue Cloud nutzen?"
    a: "Das geht. Trailhead beschreibt ein zentrales Produktmodell mit Headless-Composable-APIs und schreibt, dass Agentforce Manufacturing die Produkt- und Preisinformationen aus dem Katalog nutzen kann. Dafür sind die Revenue-Cloud-Lizenz, Konfiguration und ein klares Datenmodell nötig; automatisch passiert das nicht."
  - q: "Welches Produkt sollte ein Maschinenbauer zuerst einführen?"
    a: "Das Produkt für den Schritt, der heute am meisten wehtut. Konfigurierte Angebote sprechen für Revenue Cloud, Rahmenverträge für Manufacturing Cloud, Händlerboni für Channel Revenue Management, Ersatzteilbestellungen per E-Mail für B2B Commerce. Alle drei auf einmal für eine Roadmap-Folie zu kaufen, lohnt sich selten."
draft: false
---

Revenue Cloud, Manufacturing Cloud und B2B Commerce decken unterschiedliche Teile des Vertriebs eines Herstellers ab. Revenue Cloud konfiguriert und bepreist Produkte, erstellt Angebote und führt das Geschäft bis zum Auftrag und, mit einer weiteren Lizenz, bis zur Abrechnung. Manufacturing Cloud plant und misst das Seriengeschäft mit Sales Agreements und Account Forecasts. B2B Commerce lässt Händler und Kunden bekannte Artikel im Shop nachbestellen. Die drei überschneiden sich bei Katalog, Preis und Angebot, und genau dort scheitern Projekte. Meine Regel: ein Katalog, ein Preismaster, ein Angebotsmodell und pro Prozessschritt ein Produkt, das führt.

## Was leistet welches Produkt?

**Revenue Cloud** ist das Quote-to-Cash-Produkt von Salesforce. Salesforce hat es in Agentforce Revenue Management umbenannt (vormals Revenue Cloud); der alte Name lebt in Lizenzen wie Revenue Cloud Advanced weiter, deshalb nutze ich ihn hier. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management) besteht es aus Product Catalog Management, Product Configurator, Salesforce Pricing und Rate Management, Transaction Management für Angebote, Aufträge und Assets, dem Dynamic Revenue Orchestrator, Salesforce Contracts und der Abrechnung. Die [Produktseite](https://www.salesforce.com/uk/products/revenue-cycle-management) verspricht einen einzigen, attributbasierten Katalog, der Produkte in allen Kanälen bereitstellt. Revenue Cloud Advanced wird auf der [Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) mit 200 Euro pro Nutzer und Monat bei jährlicher Abrechnung ausgewiesen, Stand 9. November 2026. Advanced deckt die Abrechnung nur teilweise ab: Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=ind.revenue_licenses_areas_and_features.htm&language=en_US&type=5) brauchen Rechnungs-PDFs und ihr Versand per E-Mail, nutzungsbasierte Rechnungen, Zahlungen, Erstattungen und Mahnwesen die separate Revenue-Cloud-Billing-Lizenz.

**Manufacturing Cloud** ist die Industry Cloud für das Seriengeschäft. Die [Produktseite](https://www.salesforce.com/manufacturing/cloud/) nennt für Sales Core Rahmenvereinbarungen ("run-rate agreements") und Bedarfsprognosen. Salesforce vermarktet sie inzwischen als Agentforce Manufacturing, Editionen wie Sales Core tragen weiter den Namen Manufacturing Cloud. Im Kern steht das Sales Agreement: geplante und tatsächliche Mengen pro Kunde, Produkt und Periode. Ob das zu Ihrem Geschäft passt, lesen Sie in [Manufacturing Cloud vs. Sales Cloud: Wann lohnt sie sich?](../manufacturing-cloud-wann-lohnt-sie-sich/). Händlerboni sind beim Neukauf kein Manufacturing-Cloud-Thema mehr: Laut [Salesforce](https://help.salesforce.com/s/articleView?id=005393495&language=en_US&type=1) ist Rebate Management seit 18. August 2026 nicht mehr verlängerbar, Nachfolger ist Channel Revenue Management, ein eigenes Produkt. Hintergrund zu Händlerboni finden Sie in [Rebate Management für Händlerboni](../rebate-management-haendlerboni/).

**B2B Commerce** ist der Salesforce-Shop für Geschäftskunden und wird als Commerce Cloud B2B Growth oder Advanced Edition verkauft. Händler melden sich an, sehen die Produkte, die ihre Käufergruppe kaufen darf, mit den für sie geltenden Preisen, füllen einen Warenkorb und bestellen. Mit Revenue Cloud lassen sich dort auch konfigurierbare Bundles und Abonnements verkaufen. Für Hersteller lohnt sich B2B Commerce aber vor allem bei Ersatzteilen, Verbrauchsmaterial und Zubehör mit bekannten Teilenummern. Die [Masterclass B2B Commerce](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/) behandelt den Shop im Detail.

## Wo überschneiden sich die drei Produkte?

An drei Stellen: Katalog, Preis und Angebot.

**Katalog.** Trailhead beschreibt den Katalog von Revenue Cloud als zentrales Produktmodell mit Headless-Composable-APIs und nennt ein Beispiel: "Agentforce Manufacturing can use the product and pricing information from the product catalog." Der Katalog lässt sich also teilen, mit Revenue-Cloud-Lizenz und Konfiguration; der Shop braucht darüber weiter eigene Buyer Groups, Kategorien und Preisbücher. Arbeitet Manufacturing Cloud mit einfachen Produkten und Preisbüchern, während Revenue Cloud daneben Klassifizierungen und Attribute pflegt, haben Sie zwei Kataloge für dieselben Maschinen.

**Preis.** B2B Commerce rechnet standardmäßig mit Preisbüchern. Für regelbasierte Preise nutzt es Revenue Cloud: Die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) nennt für Agentforce Revenue Management for B2B Commerce eine Commerce-Growth- oder Commerce-Advanced-Lizenz zusammen mit einer Revenue-Cloud-Advanced-Lizenz. Preisprozeduren gelten dann einheitlich für Angebote, Aufträge und Abonnements. Wann sich das lohnt, steht in [Advanced Pricing im B2B-Shop](../advanced-pricing-b2b-shop-revenue-cloud/).

**Angebot.** Hier wird es eng. Revenue Cloud unterstützt Angebote und bietet mit Winter '27 einen [Angebotsagenten](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/) mit "self-service quoting for customer buyers" und "integrated quoting for partners". Salesforce bewirbt für Manufacturing Cloud einen AI Partner Sales Assistant und einen AI Sales Concierge, die Angebote erstellen. B2B Commerce bietet Request for Quote; die Funktion gehört laut derselben Hilfeseite zu den Revenue-Cloud-Funktionen. Das sind drei Einstiege, nicht zwingend drei Angebotsmodelle: Request for Quote startet im Warenkorb; das Angebot wird dann in Sales Cloud oder Revenue Cloud bearbeitet. Die Manufacturing-Agenten arbeiten mit Standardangeboten und Preisbüchern. Das Risiko beginnt, wenn Innendienst und Agenten unterschiedliche Angebotsobjekte und Preislogik nutzen. Keiner dieser Agenten ist in der Basislizenz enthalten; sie brauchen Agentforce-Add-ons. Prüfen Sie also Lizenz und Kanal für jedes Szenario. Die Agenten vergleiche ich in [KI-Angebote für Händler](../ki-angebote-haendler-partner-sales-assistant/), den Weg vom Warenkorb zum Angebot in [Request for Quote im B2B-Shop](../request-for-quote-b2b-shop-angebot/).

## Welches Produkt führt welchen Prozessschritt?

Diese Tabelle ist mein Ausgangspunkt. Sie setzt SAP oder ein anderes ERP hinter allen drei Produkten voraus.

| Prozessschritt | Führendes Produkt | Hinweis |
|---|---|---|
| Maschine konfigurieren und Angebot erstellen | Revenue Cloud | Konfigurator, Preise, Freigabe |
| Kundenpreise berechnen | Revenue Cloud Pricing oder das ERP | Ein Master für Angebot und Shop |
| Jahresmengen pro Kunde, Plan gegen Ist | Manufacturing Cloud | Sales Agreement, Istwerte aus dem ERP |
| Händlerboni | Channel Revenue Management | Nachfolger von Rebate Management |
| Ersatzteile und Verbrauchsmaterial nachbestellen | B2B Commerce | Shop, Preisbücher, Warenkorb |
| Händler macht aus dem Warenkorb eine Angebotsanfrage | B2B Commerce mit Revenue Cloud | Bearbeitung durch denselben Innendienst |
| Abonnements, Verlängerungen, Nachträge | Revenue Cloud | Assets mit Laufzeiten |
| Rechnung | ERP oder Revenue Cloud Billing | Billing-Lizenz nötig, siehe Aufteilung mit SAP |

Zwei Zeilen brauchen einen Kommentar. Aus einem konfigurierten Angebot kann ein Sales Agreement werden: Manufacturing Cloud kann das Agreement aus einem Angebot anlegen, wie in [vom Angebot zum Sales Agreement](../angebot-zu-sales-agreement-produktkonfigurator/) beschrieben. Revenue Cloud entscheidet dann, was zu welchem Preis verkauft wird, Manufacturing Cloud misst, ob der Kunde die vereinbarte Menge abnimmt. Rahmenverträge und Prognosen im Detail behandelt das Masterclass-Kapitel [Rahmenverträge und Prognosen](../../masterclass/manufacturing-cloud/rahmenvertraege-und-prognosen/).

Die Rechnungszeile ist eine eigene Entscheidung, die ich in [Revenue Cloud und SAP: Wer führt was im Quote-to-Cash?](../revenue-cloud-sap-quote-to-cash-aufteilung/) beschreibe.

## Vier Konstellationen, die ich im Design-Review stoppe

Vier Konstellationen würde ich in keinem Design-Review durchgehen lassen:

1. **Zwei Kataloge.** Produkte und Attribute werden einmal für Revenue Cloud und einmal für den Shop oder für Manufacturing Cloud gepflegt. Jede neue Variante muss dann doppelt angelegt werden, und eine davon fehlt irgendwann.
2. **Zwei Preismaster.** Es gibt Preisbücher für den Shop, Preisprozeduren für das Angebot und Konditionen in SAP. Der Händler sieht im Shop einen Preis und im Angebot einen anderen.
3. **Zwei Angebotsmodelle.** Händler erstellen in Manufacturing Cloud Standardangebote mit Preisbüchern, der Innendienst erstellt Angebote in Revenue Cloud. Berichte, Freigaben und die Übergabe an das ERP gibt es dann doppelt.
4. **Zwei Angebotsagenten** arbeiten auf diesen beiden Angebotsmodellen. Jeder Agent braucht eigene Tests, Leitplanken und ein eigenes Verbrauchsbudget, und die Antworten der Agenten können sich widersprechen.

## Praxisbeispiel: Kompressorenhersteller mit 200 Händlern

Ein Hersteller von Industriekompressoren verkauft konfigurierte Maschinen über einen Innendienst und 200 Händler. Händler bestellen Filter und Ersatzteile per E-Mail nach. Zehn Großkunden haben Jahresmengenverträge, und Händler erhalten einen Jahresbonus, der in Tabellen berechnet wird.

Alle drei Produkte könnten passen, und ich würde sie nacheinander einführen:

```schritte
B2B Commerce mit Preisbüchern
  Steht an erster Stelle, weil die Ersatzteilbestellungen per E-Mail am meisten schmerzen.
Revenue Cloud
  Die Kompressorangebote sind der zweite Kandidat. Kosten Konfigurationsfehler heute Geld, folgt Revenue Cloud, und ab dann nutzt der Shop dessen Katalog und, sobald Vertragspreise in Salesforce liegen, dessen Preislogik.
Manufacturing Cloud
  Folgt erst, wenn die Mengenverträge von zehn Großkunden die Lizenz für die Nutzer rechtfertigen, die sie betreuen. Bis dahin kann ein Bericht auf den Istwerten aus dem ERP reichen. Die Bonustabelle ist eine eigene Entscheidung über Channel Revenue Management.
```

Die Reihenfolge ist weniger wichtig als die Regel dahinter: Legen Sie vor dem ersten Produkt fest, welches System Master für Katalog und Preise ist (Revenue Cloud oder das ERP), und jedes weitere Produkt nutzt ihn.

## Den teuersten Schritt im Vertriebsprozess markieren

Schreiben Sie Ihren Vertriebsprozess in Schritten auf, von der Anfrage bis zur Nachbestellung, und markieren Sie den Schritt, der heute am meisten Zeit oder Geld kostet. Prüfen Sie dann für diesen Schritt die Überschneidungen: welcher Katalog, welcher Preismaster, welches Angebotsmodell. Das Masterclass-Kapitel [Revenue Cloud: Überblick und Entscheidung](../../masterclass/revenue-cloud/revenue-cloud-ueberblick/) hilft bei der ersten Produktentscheidung, und die Produktgrenzen gehören in das Decision Log Ihrer [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
