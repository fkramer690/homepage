---
title: "Penny Perfect Pricing: ERP-Preise in Salesforce?"
description: "Penny Perfect Pricing bringt Preisfindung nach SAP-Muster in die Manufacturing Cloud. Wann sie zu Telesales passt und warum meist das ERP Preis-Master bleibt."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: penny-perfect-pricing-erp-preise
translationKey: penny-perfect-pricing-erp-prices
topic: revenue
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Penny Perfect Pricing, SAP, Preisfindung, Telesales, Winter '27]
takeaways:
  - "Penny Perfect Pricing gibt es auch in Automotive Cloud und Consumer Goods Cloud. Ihre 19 Objekte sind seit API 68.0 (Winter '27) verfügbar."
  - "Die Objekte bilden die SAP-Konditionstechnik nach, von Kalkulationsschema und Suchstrategie bis zu Konditionssätzen mit Staffeln."
  - "In der Manufacturing Cloud bepreist sie Telesales-Aufträge. Angebote in Revenue Cloud und Shoppreise in B2B Commerce ersetzt sie nicht."
  - "Legen Sie vor dem ersten Auftrag fest, wer Preisregeln und Konditionsdaten verantwortet und welches System Auftrags- und Rechnungspreis bestimmt."
faq:
  - q: "Was ist Penny Perfect Pricing in Salesforce?"
    a: "Eine Preisfindungs-Engine, die Preise für Positionen von Advanced Orders in Echtzeit berechnet, etwa im Telesales. Salesforce führt sie mit Winter '27 für die Manufacturing Cloud ein und dokumentiert sie für Manufacturing, Automotive und Consumer Goods Cloud."
  - q: "Ersetzt Penny Perfect Pricing die Preisfindung in SAP?"
    a: "Sie kann unterstützte Preismuster nach ERP-Art in Salesforce nachbilden, innerhalb dokumentierter Grenzen wie 28 Schemaschritten und nur, wenn sich Ihre eigene SAP-Logik darauf abbilden lässt. Ob sie das sollte, hängt davon ab, ob Sie die Konditionssätze synchron halten können. Für die meisten Hersteller mit SAP würde ich SAP als Preis-Master behalten."
  - q: "Ist Penny Perfect Pricing in der Manufacturing-Cloud-Lizenz enthalten?"
    a: "Sie setzt die Enterprise oder Unlimited Edition von Manufacturing, Automotive oder Consumer Goods Cloud voraus und braucht mehrere Add-ons, die die Salesforce-Hilfe auflistet, etwa Core Pricing und das Add-on Manufacturing Foundation oder das Penny-Perfect Pricing Add-on. Die Preise dafür sind nicht öffentlich. Fragen Sie Ihren Account Executive schriftlich."
  - q: "Kann ich Penny Perfect Pricing für Angebote oder den B2B-Shop nutzen?"
    a: "Die Dokumentation beschreibt sie für Positionen von Advanced Orders, also den Telesales-Bestellablauf in der Manufacturing Cloud. Angebote gehören zu Revenue Cloud und Shoppreise zu B2B Commerce, die ihre eigene Preisfindung haben."
draft: false
---

Für die meisten Hersteller mit SAP sollte das ERP Preis-Master bleiben, und Penny Perfect Pricing lohnt einen Blick nur dort, wo Aufträge in Salesforce erfasst werden. Mit Winter '27 hielt Penny Perfect Pricing als Preisfindung für Positionen von Advanced Orders, dem Telesales-Bestellablauf, Einzug in die Manufacturing Cloud; die Consumer Goods Cloud nutzte sie schon vorher. Ihre Objekte bilden die SAP-Konditionstechnik nach, sie kann also kundenspezifische Preise berechnen, ohne das ERP zu fragen. Salesforce dokumentiert die Add-ons und einen CSV-Ladeprozess; einen SAP-Connector und öffentliche Preise nennt Salesforce nicht. Zwei Preisfindungen weichen voneinander ab, wenn die Rollen nicht klar sind. Legen Sie diese zuerst fest.

## Was ist Penny Perfect Pricing?

Salesforce stellt sie in den [Winter '27 Release Highlights auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-manfacturing-media-netzero-nonprofit) mit einem Satz vor: "Apply SAP-grade pricing precision across every manufacturing order, with multimarket, multi-unit of measure (UoM), calculation schema, and ERP integration built into Manufacturing Cloud." Gemeint ist Preisgenauigkeit auf SAP-Niveau, mit mehreren Märkten, mehreren Mengeneinheiten, Kalkulationsschema und ERP-Anbindung. Winter '27 ist [seit 12. Oktober 2026 allgemein verfügbar](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/). Der Name ist nicht neu: Die Consumer Goods Cloud nutzte Penny Perfect Pricing schon für ihre Aufträge. Neu sind der Einsatz in der Manufacturing Cloud und das gemeinsame Objektmodell ab API 68.0.

Konkreter wird der [Developer Guide](https://developer.salesforce.com/docs/industries/penny-perfect-pricing/guide/overview.html). Penny Perfect Pricing liefert danach genaue Preise in Echtzeit für Positionen von Advanced Orders. Penny Perfect Pricing und die APIs, mit denen sie arbeitet, können:

- Sofortpreise für Positionen liefern, während ein Auftrag erfasst wird,
- die endgültigen Preise eines Auftrags berechnen,
- Preisdaten anlegen,
- einen vollständigen Auftrag mit einem einzigen Aufruf aufgeben,
- Account-Hierarchien für Reporting und Analysen flach darstellen.

Der Guide beschreibt 19 Objekte, alle ab API-Version 68.0 verfügbar, und gibt an, dass Manufacturing Cloud, Automotive Cloud und Consumer Goods Cloud sie nutzen. Im [Developer Guide der Manufacturing Cloud](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_penny_perfect_pricing_dev.htm) hat sie einen eigenen Eintrag, direkt neben Advanced Orders for Telesales.

## In der Struktur ist sie nah an der SAP-Preisfindung

SAP berechnet Preise mit der Konditionstechnik: Laut [SAP Learning](https://learning.sap.com/courses/configuring-pricing-in-sap-s-4hana-sales) enthält ein Kalkulationsschema die Konditionsarten, jede Konditionsart hat eine Zugriffsfolge, und die Zugriffsfolge sucht in Konditionstabellen nach einem gültigen Konditionssatz, einschließlich Staffeln nach Menge.

Die [Objektreferenz](https://developer.salesforce.com/docs/industries/penny-perfect-pricing/references/penny-perfect-pricing-objects) von Penny Perfect Pricing liest sich wie eine Übersetzung dieses Modells. Salesforce veröffentlicht die Zuordnung nicht; die rechte Spalte ist meine Lesart der Objektbeschreibungen:

| Objekt in Penny Perfect Pricing | Beschreibung in der Referenz | Nächstes SAP-Gegenstück |
|---|---|---|
| Pricing Calculation Schema | geordnete Folge von Rechenschritten | Kalkulationsschema |
| Pricing Specification | "Pricing Condition Template", eine Art von Preiskondition | Konditionsart |
| Pricing Search Strategy | geordnete Schritte, wie die Engine Konditionen sucht | Zugriffsfolge |
| Pricing Key Type | Kombination aus bis zu 10 Schlüsselattributen | Schlüssel der Konditionstabelle |
| External Pricing Key Value | "a resolved pricing condition record" | Konditionssatz |
| External Pricing Key Value Tier | Mengen- oder Volumenstaffel | Staffel |

Dazu kommen gemeinsame Objekte wie Account, Product2, Account-Beziehungen und interne Organisationseinheiten, die geschäftsbereichsspezifische Einstellungen pro Account enthalten.

Die Ähnlichkeit hat zwei Seiten. Wer die SAP-Preisfindung kennt, erkennt die Logik wieder. Diese Nähe bedeutet aber auch ähnlichen Konfigurationsaufwand: Jede Preisregel, jede Zugriffsfolge und jeder Konditionssatz, der für den Auftragskanal in Salesforce relevant ist, braucht ein unterstütztes Gegenstück. Für eigene SAP-Routinen oder Formeln braucht es eine ausdrückliche Klärung.

## Wo passt Penny Perfect Pricing, und wo nicht?

In der Manufacturing Cloud ist Telesales der am klarsten dokumentierte Einsatz, also der Auftragseingang am Telefon. Die APIs von [Advanced Orders for Telesales](https://developer.salesforce.com/docs/industries/advanced-orders-for-telesales/overview) durchsuchen Sortimente und Produkte, zeigen früher bestellte Produkte, liefern gültige Liefertermine, holen Sofortpreise und geben einen Auftrag mit einem Aufruf auf. Die [Produktseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/) nennt im Abschnitt zu Winter '27 eine "unified telesales order view". Penny Perfect Pricing ist der Preisschritt in diesem Ablauf.

Zwei andere Preisfindungen ersetzt sie nicht:

- **Angebote** mit Konfiguration, Freigabe und Vertragsbedingungen gehören zu Revenue Cloud. Penny Perfect Pricing bepreist Auftragspositionen, keine Angebote.
- **Shoppreise** für Händler, die online bestellen, stammen aus der eigenen Preisfindung von B2B Commerce: Preisbücher, Preisstrategien, ein eigener Pricing Provider wie ein Live-Aufruf ins ERP oder Advanced Pricing powered by Revenue Cloud, wie in [Kundenpreise in B2B Commerce](/blog/kundenpreise-b2b-commerce-preisbuecher-erp/) und im Masterclass-Kapitel [Preise, Warenkorb, Checkout](/masterclass/b2b-commerce/preise-warenkorb-checkout/) beschrieben.

Agenten, die Händlerangebote erstellen, etwa der AI Partner Sales Assistant, haben dasselbe Problem von der anderen Seite: Hält Salesforce nur Listenpreise, nennt der Agent Listenpreise. Das beschreibe ich in [KI-Angebote für Händler mit dem Partner Sales Assistant](/blog/ki-angebote-haendler-partner-sales-assistant/).

## Was ist dokumentiert, und was nicht?

Als ich den Artikel am 28. Oktober 2026 geschrieben habe, fand ich weder Angaben zur Lizenzierung noch eine Beschreibung des Ladeprozesses. Inzwischen dokumentiert die Salesforce-Hilfe beides, geprüft am 9. November 2026:

1. **Editionen und Add-ons.** Penny Perfect Pricing setzt für Manufacturing, Automotive und Consumer Goods Cloud die [Enterprise oder Unlimited Edition](https://help.salesforce.com/s/articleView?id=xcloud.ppp_editions_permissions.htm&language=en_US&type=5) voraus. Dazu kommen [Pflicht-Add-ons](https://help.salesforce.com/s/articleView?id=xcloud.ppp_verify_addons.htm&language=en_US&type=5): Core Pricing Design Time, Core Pricing Run Time, Core Pricing Monthly Per Unit Entitlement, das Add-on Manufacturing Foundation oder das Penny-Perfect Pricing Add-on, Industries Sales Excellence, Data Pipelines und Data Processing Engine. Permission Set Licenses und Permission Sets kommen hinzu. Die [Preisseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/) nennt für diese Add-ons keinen Preis.
2. **Konditionssätze laden.** Salesforce [beschreibt einen Ladeprozess](https://help.salesforce.com/s/articleView?id=xcloud.ppp_load_condition_data.htm&language=en_US&type=5): Konditionen aus dem ERP als CSV exportieren, mit dem Data Loader in External Pricing Key Value und External Pricing Key Value Tier importieren und dann den mitgelieferten Data-Processing-Engine-Job "External Pricing Key Value Consolidation" ausführen. Erst wenn dieser Job erfolgreich ausgeführt wurde, lassen sich Aufträge bepreisen. Delta-Läufe nutzen das letzte Sync-Datum. Für die Einplanung braucht es einen Flow. Einen SAP-Connector gibt es nicht: Extraktion, Mapping und Monitoring bleiben Integrationsarbeit.
3. **Grenzen.** Die [Considerations](https://help.salesforce.com/s/articleView?id=xcloud.ppp_considerations.htm&language=en_US&type=5) nennen bis zu 1.000 Positionen pro Auftrag, 40 Millionen Konditionssätze pro Verkaufsorganisation, 28 Schritte im Kalkulationsschema, 7 Account- und 5 Produkt-Hierarchieebenen sowie 2, 4 oder 6 Nachkommastellen. Sie berechnet nur Nettopreise, bucht nichts ins Hauptbuch, erzeugt keine Steuerrechnungen und arbeitet in diesem Release nicht mit Standard-Promotions aus Commerce oder Loyalty zusammen.
4. **Mengeneinheiten, Steuern und Märkte.** Die [Hilfe der Manufacturing Cloud](https://help.salesforce.com/s/articleView?id=ind.mfg_ppp_pointer.htm&language=en_US&type=5) nennt die Umrechnung von Mengeneinheiten sowie primäre und sekundäre Steuern. Wie mehrere Märkte auf Verkaufsorganisationen abgebildet werden, würde ich in einer Sandbox testen, bevor ich mich darauf verlasse.

```hinweis offen
Der Ladeprozess ist also vorhanden. Die SAP-Extraktion und ihr Monitoring setzen Sie selbst um. Fragen Sie schriftlich nach dem Preis der Add-ons und prüfen Sie die Grenzen an Ihren größten Aufträgen und Ihrem Konditionsvolumen, bevor ein Projektplan davon abhängt.
```

## Zwei Preisfindungen laufen auseinander, weil Konditionen sich ändern

Konditionssätze ändern sich ständig. Die Preisabteilung legt in SAP jede Woche Kundenrabatte an, beendet Aktionen und passt Staffeln an. Rechnet Salesforce mit Kopien, muss jede Änderung ankommen, bevor der nächste Auftrag bepreist wird. Typische Lücken:

- **Zeitpunkt.** Eine Kondition ändert sich in SAP um zehn Uhr, die Kopie wird über Nacht aktualisiert, und der Telesales-Mitarbeiter nennt den ganzen Tag den Preis von gestern.
- **Neue Konditionsarten.** Die Finanzabteilung führt in SAP einen Zuschlag ein. Niemand ergänzt die passende Preisspezifikation im Kalkulationsschema in Salesforce.
- **Rundung.** "Penny perfect" setzt identische Rundung in jedem Schritt voraus. Schon eine Abweichung in der Rechenreihenfolge kann dazu führen, dass sich Auftrags- und Rechnungspreis um ein paar Cent pro Position unterscheiden, was Kunden bei großen Aufträgen bemerken.
- **Welcher Preis gilt.** Übernimmt SAP den Salesforce-Preis, wenn der Auftrag ankommt, oder ermittelt es einen eigenen? Rechnen beide, erhält der Kunde womöglich eine Auftragsbestätigung mit einem Preis und eine Rechnung mit einem anderen.

Diese Lücken lassen sich beherrschen, wenn vier Rollen feststehen, bevor sich ein Mitarbeiter auf einen Salesforce-Preis verlässt: wer die Preisregeln verantwortet, wer die Konditionsdaten, welches System den Auftragspreis rechnet und welches den Rechnungspreis bestimmt, dazu eine Regel für Abweichungen. SAP kann der Master für Regeln und Daten bleiben, während Salesforce den Auftragspreis aus Kopien berechnet.

## Rechenbeispiel: Telesales für Ersatzteile

Angenommen, ein Maschinenbauer nimmt mit einem Telesales-Team von zehn Personen Ersatzteilaufträge am Telefon an: 30.000 Ersatzteile, 2.500 Kunden, Preise aus SAP mit vier Konditionsarten: Listenpreis, Kundenrabatt, Mindermengenzuschlag und Mengenstaffeln. Die Aufträge sollen in Salesforce erfasst werden, wo der Mitarbeiter auch die installierte Basis und offene Fälle des Kunden sieht.

**Variante A: SAP bleibt Preis-Master.** Salesforce fragt SAP pro Position nach dem Preis, während der Auftrag erfasst wird, über eine API, wie sie in [Agentforce und SAP: Auftragsstatus über MuleSoft](/blog/agentforce-sap-auftragsstatus/) beschrieben ist. Salesforce zeigt den aktuellen SAP-Preis, und Auftrags- und Rechnungspreis stimmen überein, solange SAP den Auftrag mit denselben Partnern, demselben Datum und denselben Mengen bepreist. Der Nachteil ist die Abhängigkeit: Ist SAP in einem Wartungsfenster, kann das Team keine Aufträge bepreisen.

**Variante B: Penny Perfect Pricing rechnet.** Die vier Konditionsarten werden als Preisspezifikationen nachgebaut, und die Konditionssätze für 2.500 Kunden werden als External Pricing Key Values kopiert, mit Delta-Ladung und Konsolidierungslauf mehrmals am Tag. Die Grenzen von 1.000 Positionen pro Auftrag und 28 Schemaschritten sind hier kein Problem, sollten aber geprüft werden. Preise liegen sofort vor, ohne SAP. Der Aufwand liegt im Abgleich und in einer zweiten Preiskonfiguration, die jemand verantwortet.

Ich würde A wählen, wenn SAP schnell antwortet und zuverlässig erreichbar ist. B würde ich prüfen, wenn die Preislogik stabil ist, sich Konditionen selten ändern und das Team weiterarbeiten muss, wenn SAP nicht antwortet. In beiden Fällen sollte SAP den endgültigen Rechnungspreis bestimmen, und die Schnittstelle sollte jeden Auftrag markieren, bei dem die beiden Preise abweichen.

## Konditionsarten zählen und Preis-Master festlegen

1. **Zählen Sie Ihre Konditionsarten** und wie oft sich Konditionssätze pro Woche ändern.
2. **Halten Sie die vier Rollen fest**: wer Preisregeln und Konditionsdaten verantwortet, welches System den Auftragspreis rechnet und welches den Rechnungspreis bestimmt, und welcher Preis gilt, wenn Salesforce und SAP abweichen.
3. **Fragen Sie Salesforce schriftlich**, was die nötigen Add-ons für Ihre Edition kosten, und prüfen Sie die dokumentierten Grenzen an Ihren größten Aufträgen und Ihrem Konditionsvolumen.
4. **Planen Sie die Datenflüsse** zusammen mit der übrigen SAP-Schnittstelle, wie in [Manufacturing Cloud und SAP: welche Daten wohin](/blog/manufacturing-cloud-sap-integration-datenfluesse/).
5. **Testen Sie mit echten Aufträgen**: Bepreisen Sie 200 historische Aufträge in beiden Systemen und vergleichen Sie sie Position für Position.

Das vollständige Kapitel zu ERP-Anbindung, Agenten und Rollout finden Sie unter [ERP, KI und Rollout](/masterclass/manufacturing-cloud/erp-ki-und-rollout/) in der Masterclass Manufacturing Cloud. Die Grenze zwischen ERP und Salesforce zu ziehen, gehört zu meiner [Arbeit als Salesforce-Architekt](/leistungen/salesforce-architektur/).
