---
title: "Buyer Groups und Entitlements: Wer sieht welches Produkt?"
description: "Käufergruppen und Entitlement Policies in Salesforce B2B Commerce richtig schneiden: Datenmodell, harte Grenzen und warum eine Gruppe pro Händler scheitert."
pubDate: 2026-10-28
lang: de
slug: buyer-groups-entitlements-sichtbarkeit
translationKey: commerce-buyer-groups-entitlements
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, Käufergruppen, Entitlement Policies, Sichtbarkeit, Händler, Datenmodell]
takeaways:
  - "In Salesforce B2B Commerce entscheiden Entitlement Policies, welche Produkte ein Käufer sieht, und Buyer Groups, welche Policies und Preisbücher für einen Käuferaccount gelten."
  - "Ein Käuferaccount kann standardmäßig 20 Buyer Groups angehören, eine Entitlement Policy bedient bis zu 200 Buyer Groups, ein Produkt sollte höchstens 2.000 Buyer Groups zugeordnet sein."
  - "Über 2.000 Buyer Groups pro Produkt indiziert Salesforce für die Suche nur die ersten 2.000. Beim Datenimport wird die Grenze nicht geprüft, der Fehler zeigt sich erst im Shop."
  - "Schneiden Sie Buyer Groups nach Land, Händlerstufe und Marke, nie eine Gruppe pro Händler. Dann bleibt die Zahl der Gruppen stabil, wenn neue Händler dazukommen."
  - "Eine Zuordnung per Regel geht über eine Apex-Erweiterung oder über Qualification Rules aus Revenue Management, beides mit Bedingungen, die Sie vorher kennen sollten."
faq:
  - q: "Was ist eine Buyer Group in Salesforce B2B Commerce?"
    a: "Eine Buyer Group, auf Deutsch Käufergruppe, bündelt Käuferaccounts mit demselben Shopzugang, denselben Entitlement Policies und Preisbüchern. Käufer erreichen einen Store nur über eine Buyer Group, jeder Käuferaccount braucht also mindestens eine Mitgliedschaft."
  - q: "Was ist eine Entitlement Policy?"
    a: "Eine Entitlement Policy verbindet Buyer Groups mit Produkten. Über ihre Felder CanViewProduct und CanViewPrice steuert sie, ob Mitglieder das Produkt und seinen Preis sehen. Eine Buyer Group kann beliebig viele Policies haben."
  - q: "Wie vielen Buyer Groups kann ein Käuferaccount angehören?"
    a: "Standardmäßig 20. Salesforce führt das als Soft Limit, das der Support erhöhen kann. Mit der Apex-Erweiterung für die Gruppenzuordnung nennt die Limitseite 30."
  - q: "Lässt sich die Gruppenzugehörigkeit zur Laufzeit berechnen?"
    a: "Ja. Der Erweiterungspunkt Commerce_Domain_BuyerGroup_EvaluationService führt eigene Apex-Logik zur Zuordnung aus. Salesforce empfiehlt dafür, CDN und Edge Network abzuschalten, weil zwischengespeicherte Seiten sonst eine falsche Zuordnung zeigen können."
draft: false
---

In Salesforce B2B Commerce sieht ein Händler ein Produkt, wenn sein Käuferaccount zu einer Buyer Group gehört und diese Buyer Group eine Entitlement Policy mit dem Produkt hat. Preise laufen über denselben Weg, über Preisbücher an der Buyer Group. Die Sichtbarkeit von Produkten ist deshalb eine Frage, wie Sie Käufergruppen schneiden. Meine Empfehlung für Hersteller: Gruppen nach Land, Händlerstufe und Marke bilden, ihre Zahl klein halten und nie eine Gruppe pro Händler anlegen. Die Grenzen von 20 Buyer Groups pro Account und 2.000 Buyer Groups pro Produkt im Suchindex bestrafen dieses Design später, wenn der Shop schon läuft.

## Wie funktioniert die Sichtbarkeit in B2B Commerce?

Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping)), steuert den Zugang über eine Kette von Standardobjekten. Die [Trailhead-Einheit zum Zugang von Käufern](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) fasst es in einem Satz zusammen: Käufer sind über Buyer Groups mit Stores verbunden.

- **Käuferaccount** (Buyer Account): ein normaler Account, der für den Einkauf freigeschaltet ist. Seine Kontakte werden Käufer oder Buyer Manager.
- **Buyer Group** (BuyerGroup): bündelt Käuferaccounts mit gleichen Einstellungen. Jede Mitgliedschaft ist ein BuyerGroupMember-Datensatz.
- **Store-Zuordnung** (WebStoreBuyerGroup): verbindet eine Buyer Group mit einem Store.
- **Entitlement Policy** (CommerceEntitlementPolicy): verbindet Buyer Groups mit Produkten. Laut [Übersicht zum Datenmodell](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-dev-data-model.html) hat sie die Felder CanViewProduct und CanViewPrice.
- **Preisbuch der Buyer Group** (BuyerGroupPricebook): ordnet Preisbücher den Buyer Groups zu.

Sichtbarkeit und Preis hängen also an denselben Buyer Groups. Deshalb plane ich beides zusammen. Wie die Preisseite funktioniert und wann Preise besser live aus dem ERP kommen, steht in [Kundenpreise in B2B Commerce](../kundenpreise-b2b-commerce-preisbuecher-erp/).

## Welche Grenzen bestimmen das Design?

Salesforce dokumentiert die Grenzen für [Buyer Groups und Käuferaccounts](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) und für [Entitlements](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) auf zwei Seiten. Soft Limits kann der Salesforce-Support erhöhen, harte Grenzen nicht. Für Hersteller zählen diese, Stand Oktober 2026:

| Grenze | Wert | Art |
|---|---|---|
| Buyer Groups pro Käuferaccount | 20 | soft |
| Buyer Groups pro Käuferaccount mit Apex-Erweiterung zur Gruppenzuordnung | 30 | soft |
| Buyer Groups pro Entitlement Policy | 200 | hart |
| Buyer Entitlements pro Produkt (Buyer Groups, denen ein Produkt zugeordnet ist) | 2.000 | hart |
| Produkte pro Entitlement Policy | 3 Mio. | soft |
| Entitlement Policies pro Org | 105.000 | hart |
| Accounts pro Käufer im Account Switcher | 200 | soft |

```hinweis achtung
Die Grenze von 2.000 hat die unangenehmste Wirkung. Salesforce schreibt, dass nur die ersten 2.000 Buyer Groups eines Produkts für die Suche indiziert werden und weitere Buyer Groups in der Suche keine Berechtigung liefern. Beim Datenimport wird die Grenze nicht geprüft. Der Import läuft also fehlerfrei, und manche Händler finden das Produkt einfach nicht mehr.
```

Zu den 200 Buyer Groups pro Policy warnt Salesforce, dass ein Überschreiten zu Skalierungsproblemen führen kann. Die Grenze im Account Switcher betrifft Händler mit vielen Niederlassungen: Ein Käufer, der für mehr als 200 Accounts bestellt, braucht einen eigenen Switcher, der Standard versagt bei 2.000.

## Warum nicht eine Buyer Group pro Händler?

Die Idee liegt nahe, weil sie das ERP abbildet: Jeder Kunde hat eigene Konditionen, also bekommt jeder Kunde eine eigene Buyer Group, eine eigene Policy und ein eigenes Preisbuch. Mit 50 Händlern geht das. Mit wachsender Zahl kippt die Rechnung:

- Ein Ersatzteil, das jeder Händler kaufen darf, ist so vielen Buyer Groups zugeordnet, wie es Händler gibt. Bei 2.000 Händlern stößt jedes gängige Teil an die Suchgrenze.
- Eine Policy wie "alle Ersatzteile" bedient höchstens 200 Buyer Groups. Mit 1.000 Händlergruppen brauchen Sie mindestens fünf Kopien derselben Policy und müssen sie gleich halten.
- Jeder neue Händler bedeutet eine neue Gruppe, neue Policy-Zuordnungen und eine neue Preisbuch-Zuordnung. Das Onboarding wird zum Datenprojekt.

Individuelle Preise sind selten ein guter Grund für individuelle Gruppen. Bei Herstellern mit SAP oder einem ähnlichen ERP kommen Nettopreise meist aus Konditionen pro Kunde. Die gehören entweder in einen Live-Preisaufruf oder in wenige Preisbücher pro Stufe, nicht in ein Preisbuch pro Händler.

## Wie sollte ein Hersteller Buyer Groups schneiden?

Ich bilde Buyer Groups aus Merkmalen, die sich selten ändern und die im ERP-Kundenstamm schon stehen:

1. **Land oder Verkaufsorganisation.** Sie bestimmt Sortiment, Sprache, Währung und rechtliche Einschränkungen wie Exportkontrolle.
2. **Händlerstufe.** Zum Beispiel Servicepartner, Vertriebspartner oder Endkunde. Sie bestimmt das Preisbuch und manchmal die Sichtbarkeit, etwa Serviceteile nur für zertifizierte Partner.
3. **Marke oder Produktlinie**, wenn Händler nur eine Marke führen.

Entitlement Policies folgen dann Sortimenten, nicht Kunden: "Ersatzteile allgemein", "Ersatzteile für Servicepartner", "Verbrauchsmaterial", "Zubehör Marke B".

Ein typisches Szenario, als Annahme: ein Hersteller mit 800 Händlern in 12 Ländern, drei Händlerstufen und zwei Marken. Land und Stufe ergeben 36 Buyer Groups, die zwei Marken zwei weitere. Jeder Händleraccount steckt in zwei Gruppen, weit unter 20. Ein gängiges Ersatzteil ist 36 Gruppen zugeordnet statt 800, und die Policy "Ersatzteile allgemein" bedient 36 Gruppen, weit unter 200. Ein neuer Händler bedeutet zwei Mitgliedschaften und keine neue Policy.

Ausnahmen bleiben Ausnahmen. Braucht ein Händler ein Sonderteil für eine Sondermaschine, ist eine kleine Gruppe "Sondervereinbarungen" in Ordnung. Jedem Händler nur die Teile seiner eigenen Maschinen zu zeigen, ist ein anderes Problem, das Buyer Groups nicht lösen. Die Wege dafür beschreibe ich in [nur Teile zur eigenen Maschine zeigen](../ersatzteilshop-teile-pro-maschine/). Und wenn Länder oder Marken so verschieden sind, dass sich Katalog oder Checkout unterscheiden, lautet die Frage [ein B2B-Store oder mehrere](../b2b-store-laender-marken-haendler/).

## Wann lohnen sich Regeln statt Pflege von Hand?

Mitgliedschaften und Policy-Zuordnungen sind Daten, die jemand pflegen muss. Salesforce bietet zwei Wege zur Zuordnung per Regel.

**Apex-Erweiterung für Buyer Groups.** Den Erweiterungspunkt Commerce_Domain_BuyerGroup_EvaluationService beschreibt die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) als Weg, Nutzer per eigener Apex-Logik dynamisch Buyer Groups zuzuordnen. Ihr Code könnte zur Laufzeit Land und Stufe aus dem Account lesen. Die [Apex-Referenz](https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_class_CommerceBuyGrp_BuyerGroupEvaluationService.htm) nennt die Bedingung: Bei aktivem Caching greifen Zuordnungen eventuell nicht sofort, deshalb empfiehlt Salesforce, Salesforce CDN und Edge Network abzuschalten, zuerst in einer Sandbox. Bei einem Shop mit Händlern auf mehreren Kontinenten würde ich vorher die Ladezeiten messen.

**Qualification Rules aus Revenue Management.** Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) bewerten diese Regeln die Produktsichtbarkeit für Buyer Groups dynamisch anhand der Accountdaten und ersetzen von Hand gepflegte Entitlement Policies. Sie setzen eine Commerce-Growth- oder Advanced-Lizenz plus Revenue Cloud Advanced voraus. Wenn der Vertrieb ohnehin Revenue Cloud nutzt, lohnt sich ein Blick. Nur für die Sichtbarkeit würde ich es nicht kaufen.

Mein Standard ist einfacher: Die Schnittstelle setzt Mitgliedschaften aus dem ERP-Kundenstamm, etwa in einem nächtlichen Job, der Land und Stufe auf Buyer Groups abbildet. Das ist leicht zu testen und dem Fachbereich leicht zu erklären. Regeln lohnen sich erst, wenn die Zahl der Kombinationen ständig wächst.

## Wo starten Sie?

Schreiben Sie das Berechtigungskonzept auf eine Seite, bevor jemand Daten lädt:

- die Liste der Buyer Groups mit den Kriterien, nach denen ein Account in die Gruppe kommt,
- die Liste der Entitlement Policies mit dem Sortiment, das jede abdeckt,
- eine Matrix, welche Gruppe welche Policy und welches Preisbuch bekommt,
- eine Zählung gegen die Grenzen oben, für heute und für drei Jahre später.

Die ERP-Felder, die über die Mitgliedschaft entscheiden, kommen dann in die Schnittstellenliste. Diese Seite ist das erste Ergebnis im [Kapitel zu Katalog, Suche und Sichtbarkeit](../../masterclass/b2b-commerce/katalog-suche-sichtbarkeit/) meiner [Masterclass B2B Commerce](../../masterclass/b2b-commerce/). Ob Händler die Teile, die sie sehen dürfen, dann auch finden, entscheidet die Suche, beschrieben in [Ersatzteile über die Teilenummer finden](../b2b-shop-suche-teilenummer/). Solche Konzepte zu prüfen, bevor ein Partner baut, gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Wenige Buyer Groups nach Land, Stufe und Marke halten einen B2B-Shop über Jahre beherrschbar. Wenn Sie eine zweite Meinung zu Ihrem Berechtigungskonzept möchten, [schreiben Sie mir](#contact).
