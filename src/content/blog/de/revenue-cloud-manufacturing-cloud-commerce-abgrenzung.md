---
title: "Revenue Cloud, Manufacturing Cloud oder B2B Commerce?"
description: "Welches Salesforce-Produkt welchen Teil des Herstellervertriebs abdeckt: konfigurierte Angebote, Rahmenverträge und Boni oder Händlerbestellungen im Shop."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-manufacturing-cloud-commerce-abgrenzung
translationKey: revenue-cloud-vs-manufacturing-cloud-commerce
topic: revenue
categories: [revenue-cloud, manufacturing-cloud, b2b-commerce]
tags: [Revenue Cloud, Manufacturing Cloud, B2B Commerce, Angebote, Architektur, Fertigung]
takeaways:
  - "Revenue Cloud bepreist und verkauft konfigurierte Angebote, vom Katalog und Konfigurator über Angebot und Auftrag bis zur Abrechnung. Unter den dreien ist es das Angebotssystem."
  - "Manufacturing Cloud verfolgt das Seriengeschäft: Sales Agreements mit Plan gegen Ist, Account Forecasts und Händlerboni. Konfigurierte Angebote gehören in Revenue Cloud."
  - "B2B Commerce lässt Händler und Kunden bekannte Artikel wie Ersatzteile und Verbrauchsmaterial selbst bestellen, in einem Shop mit Käufergruppen, Preisbüchern, Warenkorb und Checkout."
  - "Die drei überschneiden sich bei Katalog, Preis und Angebot. Manufacturing Cloud und B2B Commerce können Katalog und Preislogik von Revenue Cloud nutzen, aber nur, wenn Sie sich auf ein Modell festlegen."
  - "Zwei Angebotsmodelle oder zwei Angebotsagenten für dieselben Produkte führen zu zwei Preisen für dieselbe Maschine. Legen Sie pro Prozessschritt fest, welches Produkt führt."
faq:
  - q: "Was ist der Unterschied zwischen Revenue Cloud und Manufacturing Cloud?"
    a: "Revenue Cloud konfiguriert, bepreist und bietet Produkte an und führt das Geschäft über Auftrag und Abrechnung weiter. Manufacturing Cloud plant und misst wiederkehrendes Geschäft mit Sales Agreements, Account Forecasts und Boni. Ein Angebot aus Revenue Cloud kann der Ausgangspunkt für ein Sales Agreement in Manufacturing Cloud sein."
  - q: "Brauche ich Revenue Cloud für B2B Commerce?"
    a: "Nicht für einen Shop mit Preisbüchern. Die Salesforce-Hilfe nennt für Agentforce Revenue Management for B2B Commerce eine Commerce-Growth- oder Commerce-Advanced-Lizenz plus eine Revenue-Cloud-Advanced-Lizenz. Dazu kommen Preisprozeduren, konfigurierbare Bundles, Abonnements und Request for Quote."
  - q: "Kann Manufacturing Cloud den Produktkatalog von Revenue Cloud nutzen?"
    a: "Ja. Trailhead beschreibt ein zentrales Produktmodell mit Headless-Composable-APIs und schreibt, dass Agentforce Manufacturing die Produkt- und Preisinformationen aus dem Katalog nutzen kann."
  - q: "Welches Produkt sollte ein Maschinenbauer zuerst einführen?"
    a: "Das für den Schritt, der heute am meisten wehtut. Konfigurierte Angebote sprechen für Revenue Cloud, Rahmenverträge und Boni für Manufacturing Cloud, Ersatzteilbestellungen per E-Mail für B2B Commerce. Alle drei auf einmal für eine Roadmap-Folie zu kaufen, lohnt sich selten."
draft: false
---

Revenue Cloud, Manufacturing Cloud und B2B Commerce decken unterschiedliche Teile des Vertriebs eines Herstellers ab. Revenue Cloud konfiguriert, bepreist und bietet Produkte an und führt das Geschäft über Auftrag bis zur Abrechnung. Manufacturing Cloud plant und misst das Seriengeschäft mit Sales Agreements, Account Forecasts und Boni. B2B Commerce lässt Händler und Kunden bekannte Artikel im Shop nachbestellen. Die drei überschneiden sich bei Katalog, Preis und Angebot, und genau dort laufen Projekte schief. Meine Regel: ein Katalog, ein Preismaster, ein Angebotsmodell und pro Prozessschritt genau ein Produkt, das führt.

## Was leistet welches Produkt?

**Revenue Cloud** ist das Quote-to-Cash-Produkt von Salesforce. Trailhead nennt es inzwischen Agentforce Revenue Management, die Produktseite auf salesforce.com wieder Revenue Cloud. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management) besteht es aus Product Catalog Management, Product Configurator, Salesforce Pricing und Rate Management, Transaction Management für Angebote, Aufträge und Assets, dem Dynamic Revenue Orchestrator, Salesforce Contracts und der Abrechnung. Die [Produktseite](https://www.salesforce.com/uk/products/revenue-cycle-management) verspricht einen einzigen, attributbasierten Katalog, der Produkte in allen Kanälen bereitstellt. Revenue Cloud Advanced steht auf der [Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) mit 200 Euro pro Nutzer und Monat bei jährlicher Abrechnung.

**Manufacturing Cloud** ist die Industry Cloud für das Seriengeschäft. Die [Produktseite](https://www.salesforce.com/manufacturing/cloud/) nennt für Sales Core Rahmenvereinbarungen ("run-rate agreements") und Bedarfsprognosen, Summer '26 brachte Verbesserungen im Rebate Management. Im Kern steht das Sales Agreement: geplante und tatsächliche Mengen pro Kunde, Produkt und Periode. Ob das zu Ihrem Geschäft passt, steht in [Manufacturing Cloud: Wann lohnt sie sich?](../manufacturing-cloud-wann-lohnt-sie-sich/). Für Boni gibt es einen eigenen Beitrag zu [Rebate Management für Händlerboni](../rebate-management-haendlerboni/).

**B2B Commerce** ist der Salesforce-Shop für Geschäftskunden, den Salesforce inzwischen auch als Agentforce Commerce for B2B vermarktet. Händler melden sich an, sehen die Produkte, die ihre Käufergruppe kaufen darf, zu ihrem Preis, füllen einen Warenkorb und bestellen. Das lohnt sich für Ersatzteile, Verbrauchsmaterial und Zubehör mit bekannten Teilenummern. Die [Masterclass B2B Commerce](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/) behandelt den Shop im Detail.

## Wo überschneiden sich die drei Produkte?

An drei Stellen: Katalog, Preis und Angebot.

**Katalog.** Trailhead beschreibt den Katalog von Revenue Cloud als zentrales Produktmodell mit Headless-Composable-APIs und nennt ein Beispiel: "Agentforce Manufacturing can use the product and pricing information from the product catalog." Der Katalog lässt sich also teilen. Arbeitet Manufacturing Cloud mit einfachen Produkten und Preisbüchern, während Revenue Cloud daneben Klassifizierungen und Attribute pflegt, haben Sie zwei Kataloge für dieselben Maschinen.

**Preis.** B2B Commerce rechnet standardmäßig mit Preisbüchern. Für regelbasierte Preise nutzt es Revenue Cloud: Die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) nennt für Agentforce Revenue Management for B2B Commerce eine Commerce-Growth- oder Commerce-Advanced-Lizenz zusammen mit einer Revenue-Cloud-Advanced-Lizenz. Preisprozeduren gelten dann einheitlich für Angebote, Aufträge und Abonnements. Wann sich das lohnt, steht in [Advanced Pricing im B2B-Shop](../advanced-pricing-b2b-shop-revenue-cloud/).

**Angebot.** Hier wird es eng. Revenue Cloud hat Angebote und mit Winter '27 einen [Angebotsagenten](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/) mit "self-service quoting for customer buyers" und "integrated quoting for partners". Manufacturing Cloud bewirbt einen AI Partner Sales Assistant und einen AI Sales Concierge, die Angebote erstellen. B2B Commerce hat Request for Quote, das laut derselben Hilfeseite zu den Revenue-Cloud-Funktionen gehört. Drei Wege zu einem Angebot für denselben Händler. Die Agenten vergleiche ich in [KI-Angebote für Händler](../ki-angebote-haendler-partner-sales-assistant/), den Weg vom Warenkorb zum Angebot in [Request for Quote im B2B-Shop](../request-for-quote-b2b-shop-angebot/).

## Welches Produkt führt welchen Prozessschritt?

Diese Tabelle ist mein Ausgangspunkt. Sie setzt SAP oder ein anderes ERP hinter allen drei Produkten voraus.

| Prozessschritt | Führendes Produkt | Hinweis |
|---|---|---|
| Maschine konfigurieren und anbieten | Revenue Cloud | Konfigurator, Preise, Freigabe |
| Kundenpreise berechnen | Revenue Cloud Pricing oder das ERP | Ein Master für Angebot und Shop |
| Jahresmengen pro Kunde, Plan gegen Ist | Manufacturing Cloud | Sales Agreement, Istwerte aus dem ERP |
| Händlerboni | Manufacturing Cloud | Rebate Management |
| Ersatzteile und Verbrauchsmaterial nachbestellen | B2B Commerce | Shop, Preisbücher, Warenkorb |
| Händler macht aus dem Warenkorb eine Angebotsanfrage | B2B Commerce mit Revenue Cloud | Bearbeitung durch denselben Innendienst |
| Abonnements, Verlängerungen, Nachträge | Revenue Cloud | Assets mit Laufzeiten |
| Rechnung | ERP oder Revenue Cloud Billing | Siehe Aufteilung mit SAP |

Zwei Zeilen brauchen einen Kommentar. Aus einem konfigurierten Angebot kann ein Sales Agreement werden: Manufacturing Cloud kann das Agreement aus einem Angebot anlegen, wie in [vom Angebot zum Sales Agreement](../angebot-zu-sales-agreement-produktkonfigurator/) beschrieben. Revenue Cloud entscheidet dann, was zu welchem Preis verkauft wird, Manufacturing Cloud misst, ob der Kunde die vereinbarte Menge abnimmt. Rahmenverträge und Prognosen im Detail behandelt das Masterclass-Kapitel [Rahmenverträge und Prognosen](../../masterclass/manufacturing-cloud/rahmenvertraege-und-prognosen/).

Die Rechnungszeile ist eine eigene Entscheidung, die ich in [Revenue Cloud und SAP: Wer führt was im Quote-to-Cash?](../revenue-cloud-sap-quote-to-cash-aufteilung/) beschreibe.

## Was sollten Sie vermeiden?

Vier Konstellationen würde ich in keinem Design-Review durchgehen lassen:

1. **Zwei Kataloge.** Produkte und Attribute einmal für Revenue Cloud und einmal für den Shop oder für Manufacturing Cloud gepflegt. Jede neue Variante muss dann doppelt angelegt werden, und eine davon fehlt irgendwann.
2. **Zwei Preismaster.** Preisbücher für den Shop, Preisprozeduren für das Angebot, Konditionen in SAP. Der Händler sieht im Shop einen Preis und im Angebot einen anderen.
3. **Zwei Angebotsmodelle.** Händler bieten auf Standardangeboten mit Preisbüchern in Manufacturing Cloud an, der Innendienst in Revenue Cloud. Berichte, Freigaben und die Übergabe an das ERP gibt es dann doppelt.
4. **Zwei Angebotsagenten** auf diesen beiden Angebotsmodellen. Jeder Agent braucht eigene Tests, Leitplanken und ein eigenes Verbrauchsbudget, und ihre Antworten können sich widersprechen.

## Ein typisches Szenario, als Annahme

Ein Hersteller von Industriekompressoren verkauft konfigurierte Maschinen über einen Innendienst und 200 Händler. Händler bestellen Filter und Ersatzteile per E-Mail nach. Zehn Großkunden haben Jahresmengenverträge, und Händler bekommen einen Jahresbonus, der in Tabellen berechnet wird.

Alle drei Produkte könnten passen, und ich würde sie nicht gleichzeitig einführen. Am meisten schmerzen die Ersatzteilbestellungen per E-Mail, also kommt B2B Commerce mit Preisbüchern zuerst. Die Kompressorangebote sind der zweite Kandidat: Kosten Konfigurationsfehler heute Geld, folgt Revenue Cloud, und ab dann nutzt der Shop dessen Katalog und, sobald Vertragspreise in Salesforce liegen, dessen Preislogik. Manufacturing Cloud kommt erst dazu, wenn die Mengenverträge von zehn Großkunden die Lizenz für die Nutzer rechtfertigen, die sie betreuen. Bis dahin kann ein Bericht auf den Istwerten aus dem ERP reichen. Die Bonustabelle wartet auf diese Entscheidung.

Die Reihenfolge ist weniger wichtig als die Regel dahinter: Das zweite Produkt nutzt Katalog und Preismaster des ersten.

## Wo starten Sie?

Schreiben Sie Ihren Vertriebsprozess in Schritten auf, von der Anfrage bis zur Nachbestellung, und markieren Sie den Schritt, der heute am meisten Zeit oder Geld kostet. Prüfen Sie dann für diesen Schritt die Überschneidungen: welcher Katalog, welcher Preismaster, welches Angebotsmodell. Das Masterclass-Kapitel [Revenue Cloud: Überblick und Entscheidung](../../masterclass/revenue-cloud/revenue-cloud-ueberblick/) hilft bei der ersten Produktentscheidung, und die Produktgrenzen gehören in das Decision Log Ihrer [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Revenue Cloud verkauft, Manufacturing Cloud misst, B2B Commerce lässt Händler bestellen, und jeder Schritt braucht genau eines davon als Verantwortlichen. Wenn Sie prüfen möchten, wo Ihre Grenzen liegen sollten, [schreiben Sie mir](#contact).
