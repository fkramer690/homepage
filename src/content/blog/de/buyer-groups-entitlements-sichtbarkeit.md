---
title: "Buyer Groups und Entitlements: Wer sieht welches Produkt?"
description: "Käufergruppen und Entitlement Policies in Salesforce B2B Commerce richtig schneiden: Datenmodell, harte Grenzen und warum eine Gruppe pro Händler scheitert."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: buyer-groups-entitlements-sichtbarkeit
translationKey: commerce-buyer-groups-entitlements
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, Käufergruppen, Entitlement Policies, Sichtbarkeit, Händler, Datenmodell]
takeaways:
  - "Entitlement Policies entscheiden, welche Produkte ein Käufer sieht. Buyer Groups entscheiden, welche Policies und Preisbücher für seinen Account gelten."
  - "Ein Käuferaccount gehört höchstens 20 Buyer Groups an, eine Policy bedient bis zu 200 Gruppen, ein Produkt sollte höchstens 2.000 Gruppen zugeordnet sein."
  - "Bei mehr als 2.000 Gruppen pro Produkt indiziert die Suche nur die ersten 2.000. Der Import prüft diese harte Grenze nicht, der Fehler zeigt sich erst im Shop."
  - "Schneiden Sie Berechtigungsgruppen nach Land, Händlerstufe und Marke, nie eine pro Händler. Gruppen addieren sich, sie filtern einander nicht."
  - "Eine Apex-Erweiterung ordnet Buyer Groups zur Laufzeit zu. Qualification Rules ersetzen Entitlement Policies für die Sichtbarkeit."
faq:
  - q: "Was ist eine Buyer Group in Salesforce B2B Commerce?"
    a: "Eine Buyer Group, auf Deutsch Käufergruppe, bündelt Käuferaccounts mit demselben Shopzugang, denselben Entitlement Policies und Preisbüchern. Ein angemeldeter Käufer braucht eine Buyer Group, die dem Store zugeordnet ist, und dazu Zugang zur Store-Site über ein Profil oder Permission Set."
  - q: "Was ist eine Entitlement Policy?"
    a: "Eine Entitlement Policy verbindet Buyer Groups mit Produkten. Über ihre Felder CanViewProduct und CanViewPrice steuert sie, ob Mitglieder das Produkt und seinen Preis sehen. Eine Buyer Group kann beliebig viele Policies haben."
  - q: "Wie vielen Buyer Groups kann ein Käuferaccount angehören?"
    a: "Standardmäßig 20. Salesforce führt das als Soft Limit, das der Support erhöhen kann. Mit der Apex-Erweiterung für die Gruppenzuordnung gilt der konfigurierte Wert plus 10, im Standard also 30."
  - q: "Lassen sich Buyer Groups zur Laufzeit zuordnen?"
    a: "Ja. Der Erweiterungspunkt Commerce_Domain_BuyerGroup_EvaluationService führt eigene Apex-Logik aus und ordnet Benutzern Buyer Groups dynamisch zu. BuyerGroupMember-Datensätze legt er nicht an. Salesforce empfiehlt dafür, CDN und Edge Network abzuschalten, weil zwischengespeicherte Seiten sonst eine falsche Zuordnung zeigen können."
  - q: "Warum findet ein Händler ein Produkt nicht, für das er berechtigt ist?"
    a: "Prüfen Sie zuerst zwei Dinge. Nach Änderungen an den Produkten oder Buyer Groups einer Policy muss der Suchindex neu aufgebaut werden, sonst zeigt die Suche die Änderung nicht. Ist das Produkt außerdem mehr als 2.000 Buyer Groups zugeordnet, ignoriert die Suche alle weiteren Gruppen nach den ersten 2.000."
draft: false
---

In einem Salesforce-B2B-Commerce-Store mit Entitlement Policies sieht ein Händler ein Produkt, wenn sein Käuferaccount zu einer Buyer Group gehört und diese Buyer Group eine Entitlement Policy enthält, der das Produkt zugeordnet ist. Preise werden im Standard auf demselben Weg gesteuert: über Preisbücher an der Buyer Group. Deshalb hängt die Produktsichtbarkeit davon ab, nach welchen Kriterien Sie Käufergruppen bilden. Meine Empfehlung für Hersteller: Gruppen nach Land, Händlerstufe und Marke bilden, ihre Zahl klein halten und nie eine Berechtigungsgruppe pro Händler anlegen. Mit diesem Design werden die Grenzen von 20 Buyer Groups pro Account und 2.000 Buyer Groups pro Produkt im Suchindex später zum Problem, wenn der Shop schon läuft.

## Wie funktioniert die Sichtbarkeit in B2B Commerce?

Salesforce B2B Commerce, das in Teilen der Salesforce-Dokumentation auch "Agentforce Commerce for B2B" heißt ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping)), steuert den Zugang über eine Kette von Standardobjekten. Die [Trailhead-Einheit zum Zugang von Käufern](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) fasst es in einem Satz zusammen: Käufer sind über Buyer Groups mit Stores verbunden.

- **Käuferaccount** (Buyer Account): ein normaler Account, der für den Einkauf freigeschaltet ist. Seine Kontakte werden als Käufer oder Buyer Manager eingerichtet.
- **Buyer Group** (BuyerGroup): bündelt Käuferaccounts mit gleichen Einstellungen. Jede Mitgliedschaft ist ein BuyerGroupMember-Datensatz.
- **Store-Zuordnung** (WebStoreBuyerGroup): verbindet eine Buyer Group mit einem Store.
- **Entitlement Policy** (CommerceEntitlementPolicy): verbindet Buyer Groups mit Produkten. Laut [Übersicht zum Datenmodell](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-dev-data-model.html) hat sie die Felder CanViewProduct und CanViewPrice.
- **Preisbuch der Buyer Group** (BuyerGroupPricebook): ordnet Preisbücher den Buyer Groups zu.

Sichtbarkeit und Preis hängen also an denselben Buyer Groups. Store-Preisbücher, Vertragspreise und ein eigener Pricing Service sind weitere Preisquellen. Deshalb plane ich beides zusammen. Wie die Preisseite funktioniert und wann Preise besser live aus dem ERP abgerufen werden, steht in [Kundenpreise in B2B Commerce](/blog/kundenpreise-b2b-commerce-preisbuecher-erp/).

## 20, 200 und 2.000: die Grenzen für das Design

Salesforce dokumentiert die Grenzen für [Buyer Groups und Käuferaccounts](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) und für [Entitlements](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) auf zwei Seiten. Soft Limits kann der Salesforce-Support erhöhen, harte Grenzen nicht. Für Hersteller sind, Stand November 2026, diese Grenzen relevant:

| Grenze | Wert | Art |
|---|---|---|
| Buyer Groups pro Käuferaccount | 20 | soft |
| Buyer Groups pro Käuferaccount mit Apex-Erweiterung zur Gruppenzuordnung | konfigurierter Wert plus 10 (30 im Standard) | soft |
| Buyer Groups pro Entitlement Policy | 200 | hart |
| Buyer Entitlements pro Produkt (Buyer Groups, denen ein Produkt zugeordnet ist) | 2.000 | hart |
| Produkte pro Entitlement Policy | 3 Mio. | soft |
| Entitlement Policies pro Org | 105.000 | hart |
| Accounts pro Käufer im Account Switcher | 200 | soft |

```hinweis achtung
Die Grenze von 2.000 hat die unangenehmste Wirkung. Salesforce schreibt, dass nur die ersten 2.000 Buyer Groups eines Produkts für die Suche indiziert werden und weitere Buyer Groups in der Suche keine Berechtigung mehr gewähren. Beim Datenimport wird die Grenze nicht geprüft. Der Import läuft also fehlerfrei, und manche Händler finden das Produkt einfach nicht mehr.
```

Dasselbe Symptom hat auch eine harmlose Ursache: Nach Änderungen an den Produkten oder Buyer Groups, die eine Policy enthält, muss der Suchindex neu aufgebaut werden. Ich zähle bei jedem Datenimport die Zuordnungen pro Produkt und warne lange vor 2.000.

Bei den 200 Buyer Groups pro Policy warnt Salesforce, dass ein Überschreiten zu Skalierungsproblemen führen kann. Die Grenze im Account Switcher betrifft Händler mit vielen Niederlassungen: Ein Käufer, der für mehr als 200 Accounts bestellt, braucht einen eigenen Switcher, der Standard versagt bei 2.000.

## Warum nicht eine Buyer Group pro Händler?

Die Idee liegt nahe, weil sie das ERP abbildet: Jeder Kunde hat eigene Konditionen, also erhält jeder Kunde eine eigene Buyer Group, eine eigene Policy und ein eigenes Preisbuch. Mit 50 Händlern geht das. Sobald die Händlergruppen auch die gemeinsamen Policies tragen, kippt die Rechnung mit wachsender Händlerzahl:

- Ein Ersatzteil, das jeder Händler kaufen darf, ist so vielen Buyer Groups zugeordnet, wie es Händler gibt. Bei 2.000 Händlern stößt jedes gängige Teil an die Suchgrenze.
- Eine Policy wie "alle Ersatzteile" bedient höchstens 200 Buyer Groups. Mit 1.000 Händlergruppen brauchen Sie mindestens fünf Kopien derselben Policy und müssen sie synchron halten.
- Jeder neue Händler bedeutet eine neue Gruppe, neue Policy-Zuordnungen und eine neue Preisbuch-Zuordnung. Das Onboarding wird zum Datenprojekt.

Eine Händlergruppe, der nur ein Preisbuch zugeordnet ist, ist ein anderer Fall. Salesforce beschreibt dieses Muster: eine gemeinsame Gruppe und Policy für das Sortiment, dazu je Käufer eine Gruppe mit Preisbuch. Das stößt nicht an die Produktgrenze, bedeutet aber weiterhin eine Gruppe und ein Preisbuch pro Händler, die jemand pflegt.

Individuelle Preise sind selten ein guter Grund für individuelle Gruppen. In den SAP-geprägten Programmen, die ich sehe, stammen Nettopreise aus Konditionen pro Kunde. Die gehören in einen Live-Preisaufruf, in accountbezogene Vertragspreise oder in wenige Preisbücher pro Stufe, nicht in ein Preisbuch pro Händler.

## Buyer Groups nach Land, Händlerstufe und Marke schneiden

Ich bilde Buyer Groups aus Merkmalen, die sich selten ändern und die im ERP-Kundenstamm schon stehen:

1. **Land oder Verkaufsorganisation.** Sie bestimmt Sortiment, Sprache und Währung. Ein ausgeblendetes Produkt ersetzt aber keine Exportkontrollprüfung, die gehört in den Warenkorb, den Checkout oder die Auftragsanlage. Und Sichtbarkeit im Shop ist keine Datensicherheit: Die organisationsweite Freigabe für Product2 muss auf Privat bleiben, sonst finden angemeldete Benutzer über die API Produkte, für die sie nicht berechtigt sind.
2. **Händlerstufe.** Zum Beispiel Servicepartner, Vertriebspartner oder Endkunde. Sie bestimmt das Preisbuch und manchmal die Sichtbarkeit, etwa Serviceteile nur für zertifizierte Partner.
3. **Marke oder Produktlinie**, wenn Händler nur eine Marke führen.

Entitlement Policies folgen dann Sortimenten, nicht Kunden: "Ersatzteile allgemein", "Ersatzteile für Servicepartner", "Verbrauchsmaterial", "Zubehör Marke B".

Rechenbeispiel: ein Hersteller mit 800 Händlern in 12 Ländern, drei Händlerstufen und zwei Marken. Land und Stufe ergeben 36 Buyer Groups, für die zwei Marken kommen zwei weitere hinzu. Jeder Händleraccount steckt in zwei Gruppen, weit unter 20. Ein Punkt ist dabei wichtig: Buyer Groups addieren sich. Ein Händler in "Deutschland Servicepartner" und "Marke B" erhält die Policies beider Gruppen, die Markengruppe filtert die andere nicht. Soll ein Produkt nur für Servicepartner in Deutschland mit Marke B sichtbar sein, braucht es eine kombinierte Gruppe oder eine Policy, die schon nur diese Schnittmenge enthält. Ein gängiges Ersatzteil ist 36 Gruppen zugeordnet statt 800, und die Policy "Ersatzteile allgemein" bedient 36 Gruppen, weit unter 200. Ein neuer Händler bedeutet zwei Mitgliedschaften und keine neue Policy.

Ausnahmen bleiben Ausnahmen. Braucht ein Händler ein Sonderteil für eine Sondermaschine, ist eine kleine Gruppe "Sondervereinbarungen" in Ordnung. Jedem Händler nur die Teile seiner eigenen Maschinen zu zeigen, ist ein anderes Problem, das Buyer Groups nicht lösen. Die Wege dafür beschreibe ich in [nur Teile zur eigenen Maschine zeigen](/blog/ersatzteilshop-teile-pro-maschine/). Und wenn Länder oder Marken so verschieden sind, dass sich Katalog oder Checkout unterscheiden, lautet die Frage [ein B2B-Store oder mehrere](/blog/b2b-store-laender-marken-haendler/).

## Wann lohnen sich Regeln statt Pflege von Hand?

Mitgliedschaften und Policy-Zuordnungen sind Daten, die jemand pflegen muss. Salesforce bietet zwei Wege, diesen Aufwand zu senken, und sie lösen verschiedene Probleme: Der eine ordnet Buyer Groups zu, der andere ersetzt Entitlement Policies.

**Apex-Erweiterung für Buyer Groups.** Den Erweiterungspunkt Commerce_Domain_BuyerGroup_EvaluationService beschreibt die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) als Weg, Nutzern per eigener Apex-Logik dynamisch Buyer Groups zuzuordnen. Ihr Code könnte zur Laufzeit Land und Stufe aus dem Account lesen. Die [Apex-Referenz](https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_class_CommerceBuyGrp_BuyerGroupEvaluationService.htm) nennt die Bedingung: Bei aktivem Caching greifen Zuordnungen eventuell nicht sofort, deshalb empfiehlt Salesforce, Salesforce CDN und Edge Network abzuschalten, zuerst in einer Sandbox. Bei einem Shop mit Händlern auf mehreren Kontinenten würde ich vorher die Ladezeiten messen.

**Qualification Rules aus Revenue Management.** Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) bewerten diese Regeln die Produktsichtbarkeit für Buyer Groups dynamisch anhand der Accountdaten und ersetzen von Hand gepflegte Entitlement Policies. Sind sie aktiv, nutzt der Store Entitlement Policies nicht mehr für die Sichtbarkeit, der Umstieg braucht also einen eigenen Testplan. Sie setzen eine Commerce-Growth- oder Advanced-Lizenz plus Revenue Cloud Advanced voraus. Wenn der Vertrieb ohnehin Revenue Cloud nutzt, lohnt sich ein Blick. Nur für die Sichtbarkeit würde ich es nicht kaufen.

Mein Standard ist einfacher: Die Schnittstelle legt Mitgliedschaften auf Basis des ERP-Kundenstamms an, etwa in einem nächtlichen Job, der Land und Stufe auf Buyer Groups abbildet. Das ist leicht zu testen und dem Fachbereich leicht zu erklären. Regeln lohnen sich erst, wenn die Zahl der Kombinationen ständig wächst.

## Erster Schritt: das Berechtigungskonzept auf einer Seite

Schreiben Sie das Berechtigungskonzept auf eine Seite, bevor jemand Daten lädt:

- die Liste der Buyer Groups mit den Kriterien, nach denen ein Account der Gruppe zugeordnet wird,
- die Liste der Entitlement Policies mit dem Sortiment, das jede abdeckt,
- eine Matrix, welche Gruppe welche Policy und welches Preisbuch erhält,
- einen Abgleich mit den Grenzen für Accounts, Policies und Produkte, für heute und für den Stand in drei Jahren.

Die ERP-Felder, die über die Mitgliedschaft entscheiden, gehören dann in die Schnittstellenliste. Diese Seite ist das erste Ergebnis im [Kapitel zu Katalog, Suche und Sichtbarkeit](/masterclass/b2b-commerce/katalog-suche-sichtbarkeit/) meiner [Masterclass B2B Commerce](/masterclass/b2b-commerce/). Ob Händler die Teile, die sie sehen dürfen, dann auch finden, entscheidet die Suche, beschrieben in [Ersatzteile über die Teilenummer finden](/blog/b2b-shop-suche-teilenummer/). Solche Konzepte zu prüfen, bevor ein Partner baut, gehört zu meiner Arbeit in der [Salesforce-Architektur](/leistungen/salesforce-architektur/).
