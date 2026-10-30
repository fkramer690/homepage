---
title: "Penny Perfect Pricing: ERP-Preise in Salesforce?"
description: "Penny Perfect Pricing bringt Preisfindung nach SAP-Muster in die Manufacturing Cloud. Wann sie zu Telesales passt und warum meist das ERP Preis-Master bleibt."
pubDate: 2026-10-28
lang: de
slug: penny-perfect-pricing-erp-preise
translationKey: penny-perfect-pricing-erp-prices
topic: revenue
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Penny Perfect Pricing, SAP, Preisfindung, Telesales, Winter '27]
takeaways:
  - "Penny Perfect Pricing ist eine Preisfindung für Positionen von Advanced Orders in Manufacturing Cloud, Automotive Cloud und Consumer Goods Cloud; ihre 19 Objekte gibt es ab API-Version 68.0 (Winter '27)."
  - "Die Objekte bilden die SAP-Konditionstechnik nach: Kalkulationsschema, Preisspezifikationen, Suchstrategien, Schlüsseltypen und Konditionssätze mit Mengenstaffeln."
  - "Sie berechnet Preise für Telesales-Aufträge; Angebote gehören zu Revenue Cloud und Shoppreise zu B2B Commerce, beides ersetzt sie nicht."
  - "Die Entwicklerdokumentation nennt keine Lizenz und keinen Standardweg, Konditionssätze aus SAP zu laden; fragen Sie Salesforce schriftlich, bevor Sie damit planen."
  - "Zwei Preisfindungen laufen auseinander. Legen Sie einen Preis-Master fest und welcher Preis gilt, wenn Salesforce und SAP abweichen, bevor der erste Auftrag bepreist wird."
faq:
  - q: "Was ist Penny Perfect Pricing in Salesforce?"
    a: "Eine Preisfindung, die Preise für Positionen von Advanced Orders in Echtzeit berechnet, etwa im Telesales. Salesforce führt sie unter Winter '27 für die Manufacturing Cloud und dokumentiert sie für Manufacturing, Automotive und Consumer Goods Cloud."
  - q: "Ersetzt Penny Perfect Pricing die Preisfindung in SAP?"
    a: "Technisch kann sie Preise mit derselben Logik in Salesforce berechnen. Ob sie das sollte, hängt davon ab, ob Sie die Konditionssätze synchron halten können. Für die meisten Hersteller mit SAP würde ich SAP als Preis-Master behalten."
  - q: "Ist Penny Perfect Pricing in der Manufacturing-Cloud-Lizenz enthalten?"
    a: "Das habe ich am 28. Oktober 2026 in keiner offiziellen Quelle gefunden. Die Preisseite erwähnt sie nicht, und die Entwicklerdokumentation enthält keine Angaben zu Lizenz oder Permission Sets. Fragen Sie Ihren Account Executive schriftlich."
  - q: "Kann ich Penny Perfect Pricing für Angebote oder den B2B-Shop nutzen?"
    a: "Die Dokumentation beschreibt sie für Positionen von Advanced Orders, also den Telesales-Bestellablauf. Angebote gehören zu Revenue Cloud und Shoppreise zu B2B Commerce, die ihre eigene Preisfindung haben."
draft: false
---

Für die meisten Hersteller mit SAP sollte das ERP Preis-Master bleiben, und Penny Perfect Pricing lohnt einen Blick nur dort, wo Aufträge in Salesforce erfasst werden. Penny Perfect Pricing kam mit Winter '27 als Preisfindung für Positionen von Advanced Orders, dem Telesales-Bestellablauf in der Manufacturing Cloud. Ihre Objekte bilden die SAP-Konditionstechnik nach, sie kann also kundenspezifische Preise berechnen, ohne das ERP zu fragen. Die Entwicklerdokumentation nennt keine Lizenz und keinen Standardweg, SAP-Konditionssätze zu laden. Zwei Preisfindungen laufen auseinander, wenn keine führt. Legen Sie das zuerst fest und lassen Sie sich die Lizenzfrage schriftlich beantworten.

## Was ist Penny Perfect Pricing?

Salesforce stellt sie in den [Winter '27 Release Highlights auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-manfacturing-media-netzero-nonprofit) mit einem Satz vor: "Apply SAP-grade pricing precision across every manufacturing order, with multimarket, multi-unit of measure (UoM), calculation schema, and ERP integration built into Manufacturing Cloud." Also Preisgenauigkeit auf SAP-Niveau, mit mehreren Märkten, mehreren Mengeneinheiten, Kalkulationsschema und ERP-Anbindung. Winter '27 ist [seit 12. Oktober 2026 allgemein verfügbar](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/).

Konkreter wird der [Developer Guide](https://developer.salesforce.com/docs/industries/penny-perfect-pricing/guide/overview.html). Penny Perfect Pricing liefert danach genaue Preise in Echtzeit für Positionen von Advanced Orders. Die REST-APIs können:

- Sofortpreise für Positionen liefern, während ein Auftrag erfasst wird,
- die endgültigen Preise eines Auftrags berechnen,
- Preisdaten anlegen,
- einen vollständigen Auftrag mit einem einzigen Aufruf platzieren,
- Account-Hierarchien für Reporting und Analysen flach darstellen.

Der Guide beschreibt 19 Objekte, alle ab API-Version 68.0 verfügbar, und nennt Manufacturing Cloud, Automotive Cloud und Consumer Goods Cloud als die Clouds, die sie nutzen. Im [Developer Guide der Manufacturing Cloud](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_penny_perfect_pricing_dev.htm) hat sie einen eigenen Eintrag, direkt neben Advanced Orders for Telesales.

## Wie nah ist sie an der SAP-Preisfindung?

In der Struktur sehr nah. SAP berechnet Preise mit der Konditionstechnik: Laut [SAP Learning](https://learning.sap.com/courses/configuring-pricing-in-sap-s-4hana-sales) enthält ein Kalkulationsschema die Konditionsarten, jede Konditionsart hat eine Zugriffsfolge, und die Zugriffsfolge sucht in Konditionstabellen nach einem gültigen Konditionssatz, einschließlich Staffeln nach Menge.

Die [Objektreferenz](https://developer.salesforce.com/docs/industries/penny-perfect-pricing/references/penny-perfect-pricing-objects) von Penny Perfect Pricing liest sich wie eine Übersetzung dieses Modells. Salesforce veröffentlicht die Zuordnung nicht; die rechte Spalte ist meine Lesart der Objektbeschreibungen:

| Objekt in Penny Perfect Pricing | Beschreibung in der Referenz | Nächstes SAP-Gegenstück |
|---|---|---|
| Pricing Calculation Schema | geordnete Folge von Rechenschritten | Kalkulationsschema |
| Pricing Specification | "Pricing Condition Template", eine Art von Preiskondition | Konditionsart |
| Pricing Search Strategy | geordnete Schritte, wie die Engine Konditionen sucht | Zugriffsfolge |
| Pricing Key Type | Kombination aus bis zu 10 Schlüsselattributen | Schlüssel der Konditionstabelle |
| External Pricing Key Value | "a resolved pricing condition record" | Konditionssatz |
| External Pricing Key Value Tier | Mengen- oder Volumenstaffel | Staffel |

Dazu kommen gemeinsame Objekte wie Account, Product2, Account-Beziehungen und interne Organisationseinheiten, die geschäftsbereichsspezifische Einstellungen pro Account tragen.

Die Ähnlichkeit hat zwei Seiten. Wer die SAP-Preisfindung kennt, erkennt die Logik wieder. Sie bedeutet aber auch denselben Konfigurationsaufwand: Jede Konditionsart, jeder Zugriff und jeder Konditionssatz aus SAP bräuchte ein Gegenstück in Salesforce.

## Wo passt Penny Perfect Pricing, und wo nicht?

Sie passt zum Telesales, also zum Auftragseingang am Telefon. Die APIs von [Advanced Orders for Telesales](https://developer.salesforce.com/docs/industries/advanced-orders-for-telesales/overview) durchsuchen Sortimente und Produkte, zeigen früher bestellte Produkte, liefern gültige Liefertermine, holen Sofortpreise und platzieren einen Auftrag mit einem Aufruf. Die [Produktseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/) nennt unter Winter '27 eine "unified telesales order view". Penny Perfect Pricing ist der Preisschritt in diesem Ablauf.

Zwei andere Preisfindungen ersetzt sie nicht:

- **Angebote** mit Konfiguration, Freigabe und Vertragsbedingungen gehören zu Revenue Cloud. Penny Perfect Pricing bepreist Auftragspositionen, keine Angebote.
- **Shoppreise** für Händler, die online bestellen, kommen aus Preisbüchern in B2B Commerce oder per Live-Aufruf aus dem ERP, wie in [Kundenpreise in B2B Commerce](../kundenpreise-b2b-commerce-preisbuecher-erp/) und im Masterclass-Kapitel [Preise, Warenkorb, Checkout](../../masterclass/b2b-commerce/preise-warenkorb-checkout/) beschrieben.

Agenten, die Händlerangebote erstellen, etwa der AI Partner Sales Assistant, haben dasselbe Problem von der anderen Seite: Hält Salesforce nur Listenpreise, nennt der Agent Listenpreise. Das beschreibe ich in [KI-Angebote für Händler mit dem Partner Sales Assistant](../ki-angebote-haendler-partner-sales-assistant/).

## Was ist nicht dokumentiert?

Drei Dinge habe ich am 28. Oktober 2026 in keiner offiziellen Quelle gefunden:

1. **Lizenz.** Die [Preisseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/) erwähnt Penny Perfect Pricing nicht, und die Entwicklerseiten enthalten keine Angaben zu Lizenz oder Permission Sets.
2. **Konditionssätze aus SAP laden.** Die Highlights versprechen ERP-Anbindung, der Developer Guide beschreibt aber keinen Import und keinen Abgleich von SAP-Konditionssätzen. Das [Trailhead-Modul für Consumer Goods](https://trailhead.salesforce.com/content/learn/modules/penny-perfect-pricing-with-consumer-goods-cloud-offline-mobile-app/set-up-pricing-configuration) sagt, dass Preiskonditionen aus dem ERP genutzt werden können, und erwähnt einen Import von Konditionssätzen, ohne ihn zu beschreiben.
3. **Mehrere Märkte und Mengeneinheiten.** Die Highlights nennen beides. Die Objektreferenz, die ich gelesen habe, erklärt nicht, wie Währungen oder Umrechnung von Mengeneinheiten eingerichtet werden.

```hinweis offen
Die ERP-Anbindung bauen also Sie, und nach der Lizenz fragen auch Sie. Beides gehört schriftlich geklärt, bevor ein Projektplan davon abhängt.
```

## Warum laufen zwei Preisfindungen auseinander?

Weil sich Konditionssätze ständig ändern. Die Preisabteilung legt in SAP jede Woche Kundenrabatte an, beendet Aktionen und passt Staffeln an. Rechnet Salesforce mit Kopien, muss jede Änderung ankommen, bevor der nächste Auftrag bepreist wird. Typische Lücken:

- **Zeitpunkt.** Eine Kondition ändert sich in SAP um zehn Uhr, die Kopie kommt über Nacht, und der Telesales-Mitarbeiter nennt den ganzen Tag den Preis von gestern.
- **Neue Konditionsarten.** Die Finanzabteilung führt in SAP einen Zuschlag ein. Niemand ergänzt die passende Preisspezifikation im Kalkulationsschema in Salesforce.
- **Rundung.** "Penny perfect" setzt identische Rundung in jedem Schritt voraus. Eine Abweichung in der Rechenreihenfolge, und Auftrag und Rechnung unterscheiden sich um ein paar Cent pro Position, was Kunden bei großen Aufträgen bemerken.
- **Welcher Preis gilt.** Übernimmt SAP den Salesforce-Preis, wenn der Auftrag ankommt, oder ermittelt es einen eigenen? Rechnen beide, bekommt der Kunde womöglich eine Auftragsbestätigung mit einem Preis und eine Rechnung mit einem anderen.

Diese Lücken lassen sich beherrschen, wenn ein Preis-Master und eine Regel für Abweichungen feststehen, bevor sich ein Mitarbeiter auf einen Salesforce-Preis verlässt.

## Ein typisches Szenario: Telesales für Ersatzteile

Ein typisches Szenario, als Annahme: Ein Maschinenbauer nimmt mit einem Telesales-Team von zehn Personen Ersatzteilaufträge am Telefon an. 30.000 Ersatzteile, 2.500 Kunden, Preise aus SAP mit vier Konditionsarten: Listenpreis, Kundenrabatt, Mindermengenzuschlag und Mengenstaffeln. Die Aufträge sollen in Salesforce erfasst werden, wo der Mitarbeiter auch die installierte Basis und offene Fälle des Kunden sieht.

**Variante A: SAP bleibt Preis-Master.** Salesforce fragt SAP pro Position nach dem Preis, während der Auftrag erfasst wird, über eine API wie in [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/). Die Preise sind immer identisch. Der Preis dafür ist eine Abhängigkeit: Ist SAP im Wartungsfenster, kann das Team keine Aufträge bepreisen.

**Variante B: Penny Perfect Pricing rechnet.** Die vier Konditionsarten werden als Preisspezifikationen nachgebaut, und die Konditionssätze für 2.500 Kunden werden als External Pricing Key Values kopiert, mit einem Delta-Lauf mehrmals am Tag. Preise kommen sofort, ohne SAP. Der Aufwand liegt im Abgleich und in einer zweiten Preiskonfiguration, die jemand verantwortet.

Ich würde A wählen, wenn SAP schnell antwortet und zuverlässig erreichbar ist, und das ist der häufigere Fall. B würde ich prüfen, wenn die Preislogik stabil ist, sich Konditionen selten ändern und das Team weiterarbeiten muss, wenn SAP nicht antwortet. In beiden Fällen sollte SAP den endgültigen Rechnungspreis bestimmen, und die Schnittstelle sollte jeden Auftrag markieren, bei dem die beiden Preise abweichen.

## Wo fangen Sie an?

1. **Zählen Sie Ihre Konditionsarten** und wie oft sich Konditionssätze pro Woche ändern.
2. **Halten Sie den Preis-Master fest** und welcher Preis gilt, wenn Salesforce und SAP abweichen.
3. **Fragen Sie Salesforce schriftlich**: Welche Lizenz enthält Penny Perfect Pricing, und gibt es einen unterstützten Weg, SAP-Konditionssätze zu laden?
4. **Planen Sie die Datenflüsse** zusammen mit der übrigen SAP-Schnittstelle, wie in [Manufacturing Cloud und SAP: welche Daten wohin](../manufacturing-cloud-sap-integration-datenfluesse/).
5. **Testen Sie mit echten Aufträgen**: 200 historische Aufträge in beiden Systemen bepreist und Position für Position verglichen.

Das ganze Kapitel zu ERP-Anbindung, Agenten und Rollout ist [ERP, KI und Rollout](../../masterclass/manufacturing-cloud/erp-ki-und-rollout/) in der Masterclass Manufacturing Cloud, und die Grenze zwischen ERP und Salesforce zu ziehen, gehört zu meiner [Arbeit als Salesforce-Architekt](../../leistungen/salesforce-architektur/).

Penny Perfect Pricing bringt eine Preisfindung nach SAP-Muster nach Salesforce, aber ein System muss den Preis weiterhin führen.
