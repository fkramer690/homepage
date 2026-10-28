---
title: "Ein B2B-Store oder mehrere: Länder, Marken, Händler"
description: "Wann ein Hersteller mehrere Stores in Salesforce B2B Commerce braucht statt einem: Store-Limits, enthaltene Storefronts, Käufergruppen und Aufwand pro Store."
pubDate: 2026-10-28
lang: de
slug: b2b-store-laender-marken-haendler
translationKey: commerce-stores-countries-brands
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, Store-Design, Käufergruppen, Länder, Marken]
takeaways:
  - "In Salesforce B2B Commerce brauchen Länder und Händlerstufen selten einen eigenen Store, Käufergruppen, Entitlement Policies und Preisbücher bilden sie in einem Store ab."
  - "Ein Store unterstützt bis zu 25 Sprachen, einen Katalog und fünf Preisbücher, eine Org kann bis zu 100 B2B-Stores haben."
  - "Ein zweiter Store lohnt sich, wenn Marke, Katalogstruktur, Checkout oder das ERP dahinter wirklich anders sind."
  - "Growth enthält 6 Storefronts, Advanced 10. Jeder weitere Store bringt Seiten, Übersetzungen, Extension-Zuordnungen und Regressionstests nach jedem Release mit."
faq:
  - q: "Wie viele Stores kann eine Salesforce-Org für B2B Commerce haben?"
    a: "Die Store-Limits erlauben 100 B2B-Stores pro Org als festes Limit. Kaufmännisch ist früher Schluss: Commerce Cloud B2B Growth enthält 6 Storefronts, Advanced 10."
  - q: "Brauche ich pro Land einen eigenen B2B-Store?"
    a: "Meistens nicht. Ein Store unterstützt bis zu 25 Sprachen, Warenkörbe in der Währung des Käuferkontos sowie länderspezifische Sortimente und Preise über Käufergruppen. Ein eigener Store pro Land lohnt sich nur, wenn Checkout oder ERP abweichen."
  - q: "Können zwei B2B-Stores einen Katalog teilen?"
    a: "Ja. Ein Store kann nur mit einem Katalog verbunden sein, ein Katalog aber mit mehreren Stores. Zwei Marken mit denselben Teilen können also Produktdaten teilen und trotzdem eine eigene Storefront haben."
  - q: "Wie viele Preisbücher kann ein B2B-Store haben?"
    a: "Einem Store lassen sich fünf Preisbücher zuordnen, als festes Limit. Käufergruppen haben eigene Preisbücher. Die Limit-Tabelle nennt 50 pro Käufergruppe, ein Hinweis auf derselben Seite 25, lassen Sie sich die Zahl von Salesforce bestätigen."
draft: false
---

Die meisten Hersteller brauchen in Salesforce B2B Commerce einen Store pro Marke oder pro Gesellschaft mit eigenem Checkout und für alles andere Käufergruppen. Länder und Händlerstufen rechtfertigen selten einen eigenen Store: Ein Store schafft bis zu 25 Sprachen, Warenkörbe in der Währung des Käufers und unterschiedliche Sortimente und Preise über Käufergruppen. Ein zweiter Store wird nötig, wenn Katalogstruktur, Auftritt, Checkout oder das ERP dahinter wirklich abweichen. Jeder weitere Store vervielfacht Inhalte, Tests und Release-Aufwand, und die Editionen enthalten nur 6 (Growth) oder 10 (Advanced) Storefronts.

## Was entscheidet über die Zahl der B2B-Stores?

Der Store ist die Nabe von Salesforce B2B Commerce, das Salesforce laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) inzwischen auch als "Agentforce Commerce for B2B" vermarktet. Um den Store herum liegen Katalog, Käufergruppen (Buyer Groups), Entitlement Policies und Preisbücher. [Trailhead zum Datenmodell](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-experience-data-model/organize-your-store) beschreibt das als Speichen um eine Nabe und sagt, dass ein Unternehmen mehrere Stores für verschiedene Geschäftsbereiche oder Regionen anlegen kann.

Drei Objekte entscheiden, ob ein Store reicht:

- **Käufergruppen** verbinden Käuferkonten mit einem Store. Ein Store kann viele Käufergruppen haben, und jede Gruppe bekommt eigene Entitlement Policies und Preisbücher.
- **Entitlement Policies** legen fest, welche Produkte eine Käufergruppe sehen und kaufen darf.
- **Der Katalog** enthält den Kategoriebaum und die Produkte. Ein Store hat genau einen Katalog, laut [Produkt- und Katalogdatenmodell](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-catalog.html) kann derselbe Katalog aber mehrere Stores bedienen.

Der Store ist also die Einheit für alles, was Käufer als "den Shop" erleben: Auftritt, Domain, Katalogstruktur, Checkout und die Logik dahinter. Wer was zu welchem Preis sieht, entscheidet sich eine Ebene tiefer, in den Käufergruppen. Wie man sie schneidet, steht in [Buyer Groups und Entitlements](../buyer-groups-entitlements-sichtbarkeit/).

## Welche Limits prägen die Entscheidung?

Diese Limits stammen von den Salesforce-Developers-Seiten zu [Store-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-store-limits.html), [Produkt-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-limits.html), [Preisbuch-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-price-book-limits.html) und [Käufergruppen-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html), Stand Oktober 2026:

| Limit | Wert | Art |
|---|---|---|
| B2B-Stores pro Org | 100 | fest |
| Kataloge pro Store | 1 | fest |
| Sprachen pro Store | 25 | weich |
| Preisbücher, die einem Store zugeordnet sind | 5 | fest |
| Preisbücher pro Käufergruppe | 50 in der Tabelle, 25 in einem Hinweis | weich |
| Käufergruppen pro Käuferkonto | 20 (30 mit Apex-Extension) | weich |
| Produkte pro Store | 4 Millionen, davon 1 Million durchsuchbar | fest |

Weiche Limits hebt der Salesforce-Support auf Anfrage an, feste nicht. Die 100 Stores sind für jeden Hersteller, den ich mir vorstellen kann, weit weg. Früher greifen der eine Katalog und die fünf Store-Preisbücher. Eine Marke, die einen eigenen Kategoriebaum braucht, bekommt ihn in einem gemeinsamen Store nicht, und eine Preisstruktur mit vielen Listen gehört in Käufergruppen-Preisbücher statt in Store-Preisbücher. Woher die Preise selbst kommen sollten, behandelt [Kundenpreise: Preisbücher oder ERP](../kundenpreise-b2b-commerce-preisbuecher-erp/).

## Wann reicht ein Store mit Käufergruppen?

Für Länder in den meisten Fällen. Sprachen werden pro Store eingestellt, bis zu 25. Zu Währungen sagt der Developer Guide zu [Währungswechseln](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-cart-currency-change.html), dass der Warenkorb die Standardwährung des Kontos nutzt und Produkte und Preisbücher für jede Währung eingerichtet sein müssen, die der Store unterstützt. Ein Händler in der Schweiz und einer in Deutschland können also im selben Store in CHF und EUR kaufen. Ein Detail zählt fürs Design: Warenkörbe unterstützen keinen automatischen Währungswechsel, und Salesforce empfiehlt, die Währungsauswahl abzuschalten, sobald ein Artikel im Warenkorb liegt.

Für Händlerstufen ebenfalls. Eine Käufergruppe pro Stufe, jede mit eigenem Preisbuch, deckt Gold-, Silber- und Standardhändler ab. Ob ein Käufer mit mehreren Preisbüchern den niedrigsten Preis sieht oder den aus dem Preisbuch mit der höchsten Priorität, ist laut [Salesforce-Hilfe zu Preisstrategien](https://help.salesforce.com/s/articleView?id=sf.comm_priority_pricing.htm&language=en_US&type=5) eine Store-Einstellung: Best Price oder Priority Price.

Auch für Ländersortimente. Ein Teil, das in einem Land nicht verkauft werden darf, bleibt einfach aus der Entitlement Policy dieses Landes heraus.

Meine Regel für den Schnitt: Käufergruppen nach Land und Händlerstufe, nie eine Gruppe pro Konto. Bei [2.000 Buyer Entitlements pro Produkt](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) als festem Limit wird ein Teil, das 3.000 einzeln gruppierte Händler kaufen dürfen, nur für die ersten 2.000 Gruppen indexiert, der Rest findet es in der Suche nicht.

## Wann lohnt sich ein zweiter Store?

Einen zweiten Store würde ich in vier Fällen einplanen:

1. **Eine andere Marke mit eigenem Auftritt.** Jeder Store wird im Experience Builder gestaltet, und die [Hilfe zu B2B Commerce](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5) führt eigene Domain und Veröffentlichung als Schritte pro Store. Ein Händler der Marke B sollte sich nicht in einem Shop anmelden, der wie Marke A aussieht.
2. **Eine andere Katalogstruktur.** Ein Katalog pro Store heißt ein Kategoriebaum. Sortiert Marke B ihre Teile nach Maschinenbaureihe und Marke A nach Funktion, brauchen sie zwei Kataloge und damit zwei Stores.
3. **Ein anderer Checkout oder ein anderes ERP.** Commerce Extensions für Preise, Bestand, Steuer oder Auftragsanlage werden laut [Extensions Guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) mit `sf commerce:extension:map` einem Store zugeordnet. Eine Gesellschaft, die aus einem anderen ERP verkauft, braucht andere Aufrufe und läuft einfacher als eigener Store.
4. **Andere Käufer.** Laut Hilfe kann ein Unternehmen einen B2B- und einen D2C-Kanal aus einer Org mit gemeinsamen Daten betreiben. Endkunden neben Händlern bedeuten also einen eigenen D2C-Store, bei geteilten Produktdaten.

Teilen sich zwei Marken die meisten Teile, hilft der gemeinsame Katalog: zwei Storefronts, ein Satz Produktdaten.

## Was kostet jeder weitere Store?

Die Lizenzseite ist kurz. Die [B2B-Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) nennt 6 Storefronts in Growth und 10 in Advanced und keinen Preis für weitere. Kommt Ihre Planung in die Nähe, gehören die Zahl der Storefronts und der Preis für zusätzliche in den Vertrag. Die GMV-Gebühr fällt auf den Umsatz über die Storefronts an, ein zweiter Store ändert sie also nur, wenn er neue Bestellungen bringt, siehe [B2B Commerce Preise und das GMV-Modell](../b2b-commerce-preise-gmv-modell/).

Die Aufwandsseite ist länger. Jeder Store hat eigene Seiten, Navigation, Übersetzungen, Extension-Zuordnungen und Einstellungen. Nach jedem der drei Salesforce-Releases im Jahr braucht jeder Store seinen Regressionstest, und jede eigene Komponente wird in jedem Store getestet, der sie nutzt. Wie man diesen Rhythmus plant, steht im DevOps-Kapitel zur [Release-Planung](../../masterclass/devops-release-management/release-planung-salesforce-releases/). Zwei Stores sind nicht doppelt so viel Arbeit wie einer, aber deutlich mehr als ein Store mit zwei Käufergruppen.

## Ein typisches Szenario: zwei Marken in 14 Ländern

Ein typisches Szenario, als Annahme: Ein Maschinenbauer verkauft Ersatzteile unter zwei Marken. Marke A ist in 9 Ländern vertreten, Marke B, vor einigen Jahren zugekauft, in 5 Ländern. Marke B läuft noch auf einem eigenen ERP-Mandanten. Die Händler von Marke A haben drei Stufen, die von Marke B zwei.

Ein Store pro Land wären 14 Stores, mehr als die 10 Storefronts in Advanced und 14 Regressionstests pro Release. Ein Store für alles würde Händler der Marke B in einen Shop mit dem Auftritt und den ERP-Aufrufen von Marke A setzen.

Der Schnitt im Szenario: zwei Stores, einer pro Marke. Marke A bekommt Käufergruppen pro Land und Stufe, 27 insgesamt, Marke B 10. Jedes Käuferkonto steckt in ein oder zwei Gruppen, weit unter den 20 pro Konto. Einen gemeinsamen Katalog nutzen beide Stores nur, wenn die Kategoriebäume passen. Im Szenario tun sie das nicht, es gibt also zwei Kataloge. Zwei Stores passen bequem in die 6 Storefronts von Growth.

Das folgt derselben Logik wie ein [weltweiter Rollout von Manufacturing Cloud](../manufacturing-cloud-weltweit-ausrollen/): Die Marke ist vom ersten Tag an eine Frage für das Template, auch wenn das erste Land nur eine hat.

## Womit sollten Sie anfangen?

```schritte
Alles auf eine Seite
  Eine Zeile pro Marke, Gesellschaft, ERP-Mandant, Land, Währung, Sprache und Händlerstufe.
Echte Unterschiede markieren
  Nur Zeilen, die sich in Auftritt, Katalogstruktur, Checkout oder ERP unterscheiden, bekommen einen eigenen Store. Alles andere wird eine Käufergruppe.
Limits prüfen
  Sprachen pro Store, Store-Preisbücher und Käufergruppen pro Käuferkonto gegen die Tabelle oben zählen.
Das Kaufmännische klären
  Zahl der Storefronts und Preis für weitere schriftlich festhalten.
```

Das Kapitel [Katalog, Suche, Sichtbarkeit](../../masterclass/b2b-commerce/katalog-suche-sichtbarkeit/) der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/) ordnet diese Entscheidung in das gesamte Store-Design ein, und wie ich solche Schnitte angehe, beschreibe ich unter [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Ein Store pro Marke oder ERP und Käufergruppen für Länder und Stufen ist der Standard, von dem ich nur mit konkretem Grund abweichen würde. Wenn Sie Ihren Schnitt prüfen wollen, [schreiben Sie mir](#contact).
