---
title: "Advanced Pricing im B2B-Shop: Wann Revenue Cloud?"
description: "Wann ein Salesforce-B2B-Shop Advanced Pricing powered by Revenue Cloud braucht: Lizenzen, Pricing Procedures, Vertragspreise und wann die SAP-Preisfindung reicht."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: advanced-pricing-b2b-shop-revenue-cloud
translationKey: commerce-advanced-pricing-revenue-cloud
topic: revenue
categories: [b2b-commerce, revenue-cloud]
tags: [B2B Commerce, Revenue Cloud, Advanced Pricing, Vertragspreise, Pricing Procedures]
takeaways:
  - "Advanced Pricing im Shop braucht Commerce Growth oder Advanced plus Revenue Cloud Advanced, gekauft über den Account Executive."
  - "Preisbücher liefern weiter den Listenpreis, Procedures, Entscheidungstabellen und Vertragspreise rechnen den Rest. Bundles und RFQ kommen mit."
  - "Die Salesforce-Hilfe nennt Advanced Pricing for Commerce Powered by Revenue Cloud als Voraussetzung für Request for Quote in B2B-Stores."
  - "Der Hauptnutzen ist ein gemeinsames Preis-Framework für Angebote, Aufträge und Shop. Am meisten bringt es, wenn der Vertrieb schon in Revenue Cloud kalkuliert."
  - "Rechnet SAP alle Kundenpreise, wäre Advanced Pricing eine zweite Preis-Engine. Ein Live-Aufruf ans ERP vermeidet das, wenn SAP schnell genug antwortet."
faq:
  - q: "Was ist Advanced Pricing for Commerce Powered by Revenue Cloud?"
    a: "Die Preis-Engine von Revenue Cloud, eingesetzt in einem B2B-Commerce-Store. Preisbücher liefern weiter den Basis-Listenpreis; darauf berechnet sie Preise mit Pricing Procedures, Entscheidungstabellen und Vertragspreisen, und Salesforce nennt sie als Grundlage für Funktionen wie Request for Quote."
  - q: "Welche Lizenzen braucht Advanced Pricing in B2B Commerce?"
    a: "Laut Salesforce-Hilfe eine Lizenz Commerce Growth oder Commerce Advanced zusammen mit Revenue Cloud Advanced. Die Revenue Settings müssen aktiviert sein. Gekauft werden die Lizenzen über den Salesforce Account Executive."
  - q: "Kann ein B2B-Store Vertragspreise aus Revenue Cloud zeigen?"
    a: "Ja. Die Salesforce-Hilfe führt vertragsbasierte Preise für B2B-Stores unter Advanced Pricing. In Revenue Cloud stehen Vertragspreise auf Contract Item Price-Datensätzen und werden von der Pricing Procedure angewendet, sobald der Vertrag aktiv ist."
  - q: "Brauche ich Revenue Cloud, wenn SAP meine Preise berechnet?"
    a: "Nicht unbedingt. Ist und bleibt SAP der Preis-Master, erspart ein Live-Aufruf an SAP über die Pricing Extension den Nachbau derselben Logik in Revenue Cloud, sofern SAP die Antwortzeiten und die Verfügbarkeit des Shops schafft. Revenue Cloud lohnt sich, wenn der Vertrieb dort schon Angebote rechnet."
draft: false
---

Ein B2B-Shop braucht Advanced Pricing powered by Revenue Cloud, wenn seine Preise Regeln folgen, die Preisbücher nicht abbilden, und wenn diese Regeln schon in Salesforce liegen oder dort liegen sollen. Salesforce verkauft das als Agentforce Revenue Management for B2B Commerce: eine Lizenz Commerce Growth oder Advanced plus Revenue Cloud Advanced. Dazu kommen Pricing Procedures, Entscheidungstabellen und Vertragspreise, und dieselbe Lizenzkombination schaltet konfigurierbare Bundles und Qualification Rules frei, und Salesforce nennt es als Voraussetzung für Request for Quote. Meine Regel: Es lohnt sich, wenn der Vertrieb schon in Revenue Cloud kalkuliert. Ist SAP der Preis-Master, bekommen Sie vor allem eine zweite Preis-Engine.

## Was bringt Advanced Pricing in einen B2B-Store?

Die Standardpreisfindung in Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet, basiert auf Preisbüchern und einer Preisstrategie. Das deckt Listenpreise und Händlerstufen ab, wie ich in [Kundenpreise in B2B Commerce](../kundenpreise-b2b-commerce-preisbuecher-erp/) beschreibe. Einfache Mengenstaffeln gehen dort auch, mit Price Adjustment Schedules. Komplexere Berechnungen, etwa Zuschläge nach Produktattribut oder Vertragspreise mit eigenen Staffeln, brauchen eigenen Code oder eine Preis-Engine.

Die [Salesforce-Hilfe zu Agentforce Revenue Management for B2B Commerce](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) zählt auf, was die Revenue-Cloud-Seite in den Store bringt. Nicht alles davon ist Preisfindung: Bundles, Request for Quote, Qualification Rules und Abonnements kommen mit derselben Lizenzkombination.

- **Komplexe Preise** mit Pricing Recipes, Entscheidungstabellen, Context Definitions und Pricing Procedures, angewendet auf Angebote, Aufträge und Abonnements ohne eigenen Code.
- **Staffelpreise**, bei denen Mengenrabatte an Schwellen greifen und die Staffeln dem Käufer angezeigt werden.
- **Konfigurierbare Bundles** mit einer constraint-basierten Konfigurations-Engine für auftragsbezogen gefertigte Produkte.
- **Request for Quote**, damit Käufer aus dem Warenkorb eine Preisverhandlung starten.
- **Qualification Rules**, die Sichtbarkeit von Produkten und Kategorien je Käufergruppe aus Kontodaten ableiten und die manuelle Pflege von Entitlement Policies ersetzen.
- **Abonnements** für digitale Produkte mit einmaligem, unbefristetem oder befristetem Verkaufsmodell.

Zwei Begriffe vorab, weil der Rest des Artikels sie nutzt. Eine Pricing Procedure ist die geordnete Folge von Schritten, die aus einem Listenpreis einen Nettopreis macht. Eine Entscheidungstabelle (Decision Table) ist eine Nachschlagetabelle, die die Procedure liest, etwa den Rabatt je Kundengruppe und Materialgruppe. Der [Preisbereich der Salesforce-Hilfe für B2B-Stores](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.comm_pricebooks.htm&type=5) hat eigene Artikel zu Advanced Pricing, darunter Pricing Procedure Plans, das Aktualisieren der Entscheidungstabellen des Stores, eigene Felder in der Pricing Procedure und vertragsbasierte Preise für B2B-Stores.

## Commerce Growth oder Advanced plus Revenue Cloud Advanced

Laut Salesforce-Hilfe sind die Revenue-Management-Funktionen für B2B Commerce in Orgs mit einer Lizenz Commerce Growth oder Commerce Advanced zusammen mit einer Lizenz Revenue Cloud Advanced verfügbar. Die Revenue Settings müssen aktiviert sein, und die Lizenzen kaufen Sie über Ihren Account Executive.

Zwei Fakten aus den offiziellen Preisseiten für das Budget. Die [B2B-Commerce-Editionen](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) stehen auf "Contact for Pricing" und die Seite beschreibt die Abrechnung als Anteil am Bruttowarenwert (GMV) über die Storefront; einen Prozentsatz veröffentlicht Salesforce nicht, und welche Kennzahl für Sie gilt, regelt der Vertrag. Die [Preisseite von Revenue Cloud](https://www.salesforce.com/sales/revenue-lifecycle-management/pricing/) nennt für Revenue Cloud Advanced 200 US-Dollar pro Nutzer und Monat bei jährlicher Abrechnung (geprüft am 9. November 2026) und beschreibt es als eigenes Produkt, das zusätzlich zum Sales-Cloud-Abonnement gekauft wird.

```hinweis offen
Wie viele Nutzer mit Revenue Cloud Advanced ein Store mit externen Käufern braucht, steht auf keiner der beiden Seiten. Stellen Sie diese Frage, bevor Sie den Business Case rechnen, denn die Antwort kann die Lizenzkosten stark verändern.
```

## Wie kommen Vertragspreise zum Käufer?

Vertragspreise sind der häufigste Grund, warum Hersteller sich Advanced Pricing ansehen. Ein großer Händler verhandelt für zwei Jahre einen Preis für eine Reihe von Ersatzteilen, und der Shop soll genau diesen Preis zeigen.

Die [Trailhead-Einheit zu vertragsbasierten Preisen](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/configure-contract-based-pricing) zeigt, wie Revenue Cloud das löst. Der verhandelte Preis steht auf einem Contract Item Price-Datensatz, der an einem Vertrag hängt. Mengenrabatte darauf kommen aus Contract Item Price Adjustment Tiers. Die Pricing Procedure hat einen Listenpreis-Schritt mit der Option "Use contract-based pricing", der einen Vertragspreis am aktiven Vertrag sucht und den Listenpreis damit ersetzt. Zwei Details im Betrieb sind wichtig: Der Vertrag muss aktiviert sein, und die betroffenen Entscheidungstabellen für Vertragspreise (Einträge, Anpassungsstaffeln, Volumenstaffeln) müssen aktualisiert werden, bevor die Preisfindung die Daten sieht. Die Einheit zeigt das an einem Angebot, in dem ein Vertrag ausgewählt wird. Im Store werden Vertragspreise in den Store-Einstellungen eingeschaltet, und Salesforce sucht den passenden Vertrag zum Käuferkonto nach Produkt, Verkaufsmodell, Währung und Datum; die Salesforce-Hilfe hat dazu einen eigenen Artikel zu vertragsbasierten Preisen in B2B-Stores.

Bei diesem Aktualisieren würde ich im Design zuerst hinsehen. Entstehen Vertragspreise in Salesforce, gehört das Aktualisieren zum Prozess. Kommen sie aus SAP, braucht jede SAP-Änderung einen Import plus ein Aktualisieren, bevor der Shop stimmt.

```ablauf
erp: Vertragspreis SAP
sf: Contract Item Price, Entscheidungstabelle, Pricing Procedure, Warenkorb
Vertragspreis SAP --Import--> Contract Item Price
Contract Item Price --Aktualisieren--> Entscheidungstabelle
Entscheidungstabelle --> Pricing Procedure
Pricing Procedure --Vertragspreis--> Warenkorb
```

## Wann lohnt sich Advanced Pricing?

Das stärkste Argument ist Einheitlichkeit. Salesforce schreibt in seinem [Beitrag zu den B2B-Neuerungen für Spring '26](https://www.salesforce.com/blog/b2b-commerce-innovations-spring-26/), Käufer sollten über Website, Agent und Vertrieb hinweg "one price, one catalog, and one history" sehen. Mit Advanced Pricing nutzen Angebot und Warenkorb des Händlers dasselbe Preis-Framework, dieselben Entscheidungstabellen und Vertragspreise. Gleiche Preise erfordern trotzdem bewusste Abstimmung, weil Store-Procedures einen eigenen Commerce-Subtyp, ein Rezept und ein Kontext-Mapping haben.

```pro-contra
pro: Ich würde es empfehlen, wenn
- der Vertrieb schon in Revenue Cloud Angebote rechnet und die Preislogik dort pflegt
- der Shop konfigurierte Bundles oder auftragsbezogene Varianten verkauft
- Vertragspreise in Salesforce verhandelt und gespeichert werden, nicht in SAP
- Sie Request for Quote wollen, das laut Salesforce-Hilfe Advanced Pricing voraussetzt
contra: Vorsichtig wäre ich, wenn
- SAP jeden Kundenpreis berechnet und das weiter tun soll; dann bauen Sie die SAP-Logik in Entscheidungstabellen nach (zwei Engines, die übereinstimmen müssen) oder rufen SAP ohnehin auf
- der Vertrieb in SAP oder einem anderen CPQ-Werkzeug kalkuliert und keinen Wechsel plant
- der Shop vor allem Ersatzteile zu Stufenpreisen verkauft, die Preisbücher und Price Adjustment Schedules abdecken
```

Wo Ihre Preis-Engine grundsätzlich liegen sollte, behandelt das Kapitel [Produktkatalog, Konfigurator und Preise](../../masterclass/revenue-cloud/produktkatalog-konfigurator-preise/) der Masterclass Revenue Cloud. Für den Shop folgt die Entscheidung dem Preis-Master: Das System, dem der Vertrieb bei einem Angebot vertraut, sollte auch den Warenkorb rechnen.

## Rechenbeispiel: Ersatzteilshop mit 30 Vertragskunden

Angenommen, ein Hersteller von Verpackungsmaschinen hat vor einem Jahr Revenue Cloud für Maschinenangebote eingeführt, mit Pricing Procedures für Länderzuschläge und Vertragspreisen für 30 Schlüsselkunden. Jetzt will er einen Shop für Ersatzteile und Service-Kits für seine 300 Kunden. SAP hält weiter die Listenpreise.

Hier ist Advanced Pricing ein starker Kandidat. Listenpreise kommen wie heute aus SAP in Preisbücher, eine Store-Procedure, die auf denselben Regeln und Entscheidungstabellen basiert, ergänzt den Länderzuschlag und wendet die Vertragspreise an, und Schlüsselkunden sehen im Shop, was ihr Vertriebsmitarbeiter anbieten würde. Große oder ungewöhnliche Bestellungen gehen über Request for Quote an denselben Innendienst.

Ändern Sie eine Annahme: Der Hersteller kalkuliert Maschinen in SAP und hat kein Revenue Cloud. Dann würde ich Ersatzteile mit Preisbüchern für die Stufen und einem Live-Aufruf an SAP für die 30 Schlüsselkunden bepreisen und keine Preis-Engine nur für den Shop kaufen.

## Preislogik und Vertragspreise aufschreiben

Schreiben Sie drei Dinge auf, bevor Sie mit Salesforce über Lizenzen sprechen: wo Ihre Preislogik heute liegt, wer Vertragspreise pflegt und ob Sie Request for Quote oder konfigurierte Bundles im Shop brauchen. Zeigen zwei der drei Antworten auf Salesforce, lohnt sich ein Proof of Concept mit Ihren echten Procedures. Die Lizenzfrage gehört in dieselbe Prüfung, die ich unter [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/) beschreibe.

Das Gesamtbild zu Preisen, Angeboten und Checkout steht im Kapitel [Preise, Warenkorb, Checkout](../../masterclass/b2b-commerce/preise-warenkorb-checkout/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/). Wie Käufer aus dem Warenkorb ein Angebot machen, zeigt [Request for Quote im B2B-Shop](../request-for-quote-b2b-shop-angebot/), die Händlerseite von KI-Angeboten [KI-Angebote mit dem Partner Sales Assistant](../ki-angebote-haendler-partner-sales-assistant/).
