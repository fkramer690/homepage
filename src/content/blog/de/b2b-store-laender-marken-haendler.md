---
title: "Ein B2B-Store oder mehrere: Länder, Marken, Händler"
description: "Wann ein Hersteller in Salesforce B2B Commerce mehrere Stores statt einem braucht: Store-Limits, enthaltene Storefronts, Käufergruppen und Aufwand."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: b2b-store-laender-marken-haendler
translationKey: commerce-stores-countries-brands
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, Store-Design, Käufergruppen, Länder, Marken]
takeaways:
  - "Länder und Händlerstufen brauchen selten einen eigenen Store. Käufergruppen, Entitlement Policies und Preisbücher bilden sie in einem Store ab."
  - "Ein Store unterstützt bis zu 25 Sprachen, einen Katalog und fünf Preisbücher. Eine Org kann bis zu 100 B2B-Stores haben."
  - "Ein zweiter Store lohnt sich, wenn Marke, Katalogstruktur, Checkout oder das ERP dahinter wirklich anders sind."
  - "Growth enthält 6 Storefronts, Advanced 10, weitere kosten extra. Jeder Store bringt Einstellungen, Extensions und Regressionstests nach jedem Release mit."
faq:
  - q: "Wie viele Stores kann eine Salesforce-Org für B2B Commerce haben?"
    a: "Laut Store-Limits sind 100 B2B-Stores pro Org als festes Limit erlaubt. Das enthaltene Kontingent ist früher erreicht: Commerce Cloud B2B Growth enthält 6 Storefronts, Advanced 10. Weitere Storefronts sind als Add-on ohne veröffentlichten Preis erhältlich."
  - q: "Brauche ich pro Land einen eigenen B2B-Store?"
    a: "Meistens nicht. Ein Store unterstützt bis zu 25 Sprachen, Warenkörbe in der Standardwährung des Käuferkontos oder einer anderen unterstützten Währung sowie länderspezifische Sortimente und Preise über Käufergruppen. Ein eigener Store pro Land lohnt sich nur, wenn Checkout oder ERP abweichen."
  - q: "Können zwei B2B-Stores einen Katalog teilen?"
    a: "Ja. Ein Store kann nur mit einem Katalog verbunden sein, ein Katalog aber mit mehreren Stores. Zwei Marken mit denselben Teilen können also Produktdaten teilen und trotzdem eine eigene Storefront haben."
  - q: "Wie viele Preisbücher kann ein B2B-Store haben?"
    a: "Einem Store lassen sich als festes Limit fünf Preisbücher zuordnen. Käufergruppen haben eigene Preisbücher, mit 50 pro Käufergruppe als weichem Limit. In der Praxis ist entscheidend: Ein einzelner Preisaufruf wertet als festes Limit höchstens 25 gültige Preisbücher aus."
draft: false
---

Die meisten Hersteller brauchen in Salesforce B2B Commerce einen Store pro Marke oder pro Gesellschaft mit eigenem Checkout. Für alles andere reichen Käufergruppen. Länder und Händlerstufen rechtfertigen selten einen eigenen Store: Ein Store unterstützt bis zu 25 Sprachen, Warenkörbe in der Währung des Käufers und unterschiedliche Sortimente und Preise über Käufergruppen. Ein zweiter Store lohnt sich, wenn Katalogstruktur, Markenauftritt, Checkout oder das ERP dahinter wirklich abweichen. Jeder weitere Store bringt Einstellungen, Tests und Release-Aufwand mit. Die Editionen enthalten 6 (Growth) oder 10 (Advanced) Storefronts, weitere Storefronts kosten extra.

## Was entscheidet über die Zahl der B2B-Stores?

Der Store ist die Nabe von Salesforce B2B Commerce, das Salesforce laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) inzwischen in "Agentforce Commerce for B2B" umbenannt hat. Um den Store herum liegen Katalog, Käufergruppen (Buyer Groups), Entitlement Policies und Preisbücher. [Trailhead zum Datenmodell](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) beschreibt das als Speichen um eine Nabe und sagt, dass ein Unternehmen mehrere Stores für verschiedene Geschäftsbereiche oder Regionen anlegen kann.

Drei Objekte entscheiden, ob ein Store reicht:

- **Käufergruppen** verbinden Käuferkonten mit einem Store. Ein Store kann viele Käufergruppen haben, und jede Gruppe erhält eigene Entitlement Policies und Preisbücher.
- **Entitlement Policies** legen fest, welche Produkte eine Käufergruppe sehen und kaufen darf.
- **Der Katalog** enthält den Kategoriebaum und die Produkte. Ein Store hat genau einen Katalog, laut [Produkt- und Katalogdatenmodell](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-catalog.html) kann derselbe Katalog aber mehrere Stores bedienen.

Der Store ist also, zusammen mit der Experience-Cloud-Site, die ihn zeigt, die Einheit für das, was Käufer als "den Shop" erleben: Katalogstruktur, Checkout und die Logik dahinter, meist auch Auftritt und Domain. Wer was zu welchem Preis sieht, entscheidet sich eine Ebene tiefer, in den Käufergruppen. Wie man sie schneidet, steht in [Buyer Groups und Entitlements](/blog/buyer-groups-entitlements-sichtbarkeit/).

## 25 Sprachen, ein Katalog, fünf Preisbücher pro Store

Diese Limits stammen von den Salesforce-Developers-Seiten zu [Store-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-store-limits.html), [Produkt-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-limits.html), [Preisbuch-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-price-book-limits.html) und [Käufergruppen-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html), Stand Oktober 2026:

| Limit | Wert | Art |
|---|---|---|
| B2B-Stores pro Org | 100 | fest |
| Kataloge pro Store | 1 | fest |
| Sprachen pro Store | 25 | weich |
| Preisbücher, die einem Store zugeordnet sind | 5 | fest |
| Preisbücher pro Käufergruppe | 50 (ein Hinweis nennt 25) | weich |
| Gültige Preisbücher pro Preisaufruf | 25 | fest |
| Käufergruppen pro Käuferkonto | 20 (ein Hinweis nennt 100; 30 mit Apex-Extension) | weich |
| Produkte pro Store | 4 Millionen, davon 1 Million mit der Salesforce-Suche | fest (nicht bei externer Suche) |

Weiche Limits kann der Salesforce-Support anheben, feste nicht. Die 100 Stores erreicht kein Hersteller, den ich mir vorstellen kann. In der Praxis werden der eine Katalog und die fünf Store-Preisbücher früher zum limitierenden Faktor. Eine Marke, die einen eigenen, getrennt veröffentlichten Kategoriebaum braucht, passt schlecht in einen gemeinsamen Store. Eine Preisstruktur mit vielen Listen gehört in Käufergruppen-Preisbücher statt in Store-Preisbücher. Pro Preisaufruf werden höchstens 25 gültige Preisbücher ausgewertet. Woher die Preise selbst stammen sollten, behandelt [Kundenpreise: Preisbücher oder ERP](/blog/kundenpreise-b2b-commerce-preisbuecher-erp/).

```hinweis offen
Die Limit-Seiten widersprechen sich stellenweise: 50 oder 25 Preisbücher pro Käufergruppe, 20 oder 100 Käufergruppen pro Käuferkonto. Erreicht Ihr Design annähernd eine dieser Zahlen, lassen Sie sich den Wert für Ihre Org von Salesforce bestätigen.
```

## Wann reicht ein Store mit Käufergruppen?

Für Länder reicht ein Store in den meisten Fällen. Sprachen werden pro Store eingestellt, bis zu 25. Zu Währungen sagt der Developer Guide zu [Währungswechseln](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-cart-currency-change.html), dass ein Warenkorb die Standardwährung des Kontos nutzt, sofern er nicht über die Cart API in einer anderen Währung angelegt wird, und dass Produkte und Preisbücher für jede Währung eingerichtet sein müssen, die der Store unterstützt. Ein Händler in der Schweiz und einer in Deutschland können also im selben Store in CHF und EUR kaufen. Ein Detail ist für das Design wichtig: Warenkörbe unterstützen keinen automatischen Währungswechsel, und Salesforce empfiehlt, die Währungsauswahl abzuschalten, sobald ein Artikel im Warenkorb liegt. Für angemeldete B2B-Käufer kann ein Store außerdem [Markets](https://help.salesforce.com/s/articleView?id=commerce.comm_markets_b2bauthbuyers.htm&language=en_US&type=5) nutzen, die beim Standortwechsel des Käufers Produkte und Preisbücher umschalten. Die Funktion ist standardmäßig deaktiviert, und beim Ein- oder Ausschalten müssen aktive Warenkörbe gelöscht werden. Entscheiden Sie das also vor dem Go-live.

Für Händlerstufen reicht ein Store ebenfalls. Eine Käufergruppe pro Stufe, jede mit eigenem Preisbuch, deckt Gold-, Silber- und Standardhändler ab. Ob ein Käufer mit mehreren Preisbüchern den niedrigsten Preis sieht oder den aus dem Preisbuch mit der höchsten Priorität, ist laut [Salesforce-Hilfe zu Preisstrategien](https://help.salesforce.com/s/articleView?id=sf.comm_priority_pricing.htm&language=en_US&type=5) eine Store-Einstellung: Best Price oder Priority Price.

Auch für Ländersortimente reicht ein Store. Ein Teil, das in einem Land nicht verkauft werden darf, wird einfach nicht in die Entitlement Policy dieses Landes aufgenommen.

Meine Regel für den Schnitt: Käufergruppen nach Land und Händlerstufe, keine Gruppe pro Konto. Wenn 3.000 Händler jeweils über eigene Gruppen berechtigt sind, wird ein Teil bei dem festen Limit von [2.000 Buyer Entitlements pro Produkt](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) nur für die ersten 2.000 Gruppen indexiert. Die übrigen Händler finden es in der Suche nicht.

## Wann lohnt sich ein zweiter Store?

Einen zweiten Store würde ich in vier Fällen einplanen:

1. **Eine andere Marke mit eigenem Auftritt und eigener Domain.** Jeder Store wird im Experience Builder gestaltet, und die [Hilfe zu B2B Commerce](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5) nennt eigene Domain und Veröffentlichung als Schritte pro Store. Ein Händler der Marke B sollte sich nicht in einem Shop anmelden, der wie Marke A aussieht. Branding Sets können Farben und Logos innerhalb einer Site variieren, ein eigener Markenauftritt mit eigener Domain und eigenen Inhalten lässt sich mit einem eigenen Store aber einfacher abbilden.
2. **Eine andere Katalogstruktur.** Ein Katalog pro Store heißt ein Kategoriebaum. Sortiert Marke B ihre Teile nach Maschinenbaureihe und Marke A nach Funktion, sind zwei Kataloge und damit zwei Stores das sauberere Design. Die Produkte selbst lassen sich trotzdem teilen, weil dasselbe Produkt in Kategorien beider Kataloge liegen kann.
3. **Ein anderer Checkout oder ein anderes ERP.** Commerce Extensions für Preise, Bestand, Steuer oder Auftragsanlage werden laut [Extensions Guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) mit `sf commerce:extension:map` einem Store zugeordnet. Eine Extension kann Aufrufe nach Konto oder Gesellschaft verteilen. Für eine Gesellschaft, die aus einem anderen ERP mit eigenem Checkout und Auftragsprozess verkauft, ist ein eigener Store aber meist einfacher.
4. **Andere Käufer.** Laut Hilfe kann ein Unternehmen einen B2B- und einen D2C-Kanal aus einer Org mit gemeinsamen Daten betreiben. Wenn Endkunden neben Händlern bedient werden, bedeutet das also einen eigenen D2C-Store, auch bei geteilten Produktdaten.

Teilen sich zwei Marken die meisten Teile, hilft der gemeinsame Katalog: zwei Storefronts, ein Satz Produktdaten.

## Jeder weitere Store kostet Pflege nach jedem Release

Die Lizenzfrage ist schnell erklärt. Die [B2B-Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) nennt 6 Storefronts in Growth und 10 in Advanced. Die [Add-on-Seite für Commerce](https://www.salesforce.com/commerce/pricing/add-ons/) führt zusätzliche Storefronts mit "Request a Quote" und ohne Preis. Erreicht Ihre Planung annähernd das enthaltene Kontingent, gehören die Zahl der Storefronts und der Preis für zusätzliche Storefronts in den Vertrag. Die GMV-Gebühr fällt für den Umsatz über die Storefronts an. Ein zweiter Store ändert sie also nur, wenn er neue Bestellungen bringt, siehe [B2B Commerce Preise und das GMV-Modell](/blog/b2b-commerce-preise-gmv-modell/).

Beim Aufwand ist die Liste länger. Jeder Store hat eigene Extension-Zuordnungen und Einstellungen und meist auch eigene Seiten, Navigation und Übersetzungen, sofern er keine bestehende Site mitnutzt. Nach jedem der drei Salesforce-Releases im Jahr braucht jeder Store seinen Regressionstest, und jede eigene Komponente wird in jedem Store getestet, der sie nutzt. Wie man diesen Rhythmus plant, steht im DevOps-Kapitel zur [Release-Planung](/masterclass/devops-release-management/release-planung-salesforce-releases/). Zwei Stores sind nicht doppelt so viel Arbeit wie einer, aber deutlich mehr als ein Store mit zwei Käufergruppen.

## Rechenbeispiel: zwei Marken in 14 Ländern

Angenommen, ein Maschinenbauer verkauft Ersatzteile unter zwei Marken. Marke A ist in 9 Ländern vertreten, Marke B, vor einigen Jahren zugekauft, in 5 Ländern. Marke B nutzt noch einen eigenen ERP-Mandanten. Die Händler von Marke A haben drei Stufen, die von Marke B zwei.

Ein Store pro Land ergäbe 14 Stores, mehr als die 10 in Advanced enthaltenen Storefronts, und 14 Regressionstests pro Release. Ein Store für alles würde Händler der Marke B in einen Shop führen, der den Auftritt und die ERP-Aufrufe von Marke A nutzt.

Im Szenario ist der Schnitt klar: zwei Stores, einer pro Marke. Marke A erhält eine kombinierte Käufergruppe pro Land und Stufe, 9 × 3 = 27 insgesamt, Marke B 5 × 2 = 10. Jedes Käuferkonto ist ein oder zwei Gruppen zugeordnet, also weit unter den 20 pro Konto. Einen gemeinsamen Katalog nutzen beide Stores nur, wenn die Kategoriebäume passen. Im Szenario tun sie das nicht, es gibt also zwei Kataloge. Zwei Stores passen bequem in die 6 Storefronts von Growth.

Das folgt derselben Logik wie ein [weltweiter Rollout von Manufacturing Cloud](/blog/manufacturing-cloud-weltweit-ausrollen/): Die Marke muss vom ersten Tag an im Template berücksichtigt werden, auch wenn das erste Land nur eine hat.

## Erster Schritt: Marken, ERP-Mandanten und Länder auf eine Seite

```schritte
Alles auf eine Seite
  Eine Zeile pro Marke, Gesellschaft, ERP-Mandant, Land, Währung, Sprache und Händlerstufe.
Echte Unterschiede markieren
  Nur Zeilen, die sich in Auftritt, Katalogstruktur, Checkout oder ERP unterscheiden, erhalten einen eigenen Store. Alles andere wird eine Käufergruppe.
Limits prüfen
  Sprachen pro Store, Store-Preisbücher und Käufergruppen pro Käuferkonto gegen die Tabelle oben zählen.
Das Kaufmännische klären
  Zahl der Storefronts und Preis für weitere schriftlich festhalten.
```

Das Kapitel [Katalog, Suche, Sichtbarkeit](/masterclass/b2b-commerce/katalog-suche-sichtbarkeit/) der [Masterclass B2B Commerce](/masterclass/b2b-commerce/) ordnet diese Entscheidung in das gesamte Store-Design ein. Wie ich solche Schnitte angehe, beschreibe ich unter [Salesforce-Architektur](/leistungen/salesforce-architektur/).
