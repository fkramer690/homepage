---
title: "Salesforce Pricing: Wie Revenue Cloud Preise berechnet"
description: "Wie Pricing Procedures, Decision Tables und Kontextdefinitionen in Revenue Cloud einen Preis berechnen und was das für Pflege und Regressionstests heißt."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-preisprozeduren
translationKey: revenue-cloud-pricing-procedures
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, Salesforce Pricing, Preisfindung, Pricing Procedures, Preiswasserfall, Tests]
takeaways:
  - "Eine Pricing Procedure arbeitet Preiselemente in fester Reihenfolge ab, etwa Listenpreis, Mengenrabatt, Attributrabatt und manuellen Rabatt."
  - "Die Prozedur liest Decision Tables, nicht die Objekte. Ohne Aktualisierung nach jeder Preisänderung rechnet das Angebot mit alten Werten."
  - "Der Preiswasserfall zeigt jeden Schritt vom Listenpreis zum Nettopreis. Er erklärt dem Vertrieb einen Preis und ist die Grundlage für Tests."
  - "Jede Pricing Procedure braucht eine verantwortliche Person, Versionen und feste Regressionsfälle, die vor jeder Änderung laufen."
faq:
  - q: "Was ist eine Pricing Procedure in Revenue Cloud?"
    a: "Eine Pricing Procedure ist eine feste Abfolge von Preiselementen, die aus einem Listenpreis einen Nettopreis macht. Jedes Element nimmt seine Eingaben aus der Kontextdefinition oder dem vorherigen Element, wendet seine Logik an und gibt das Ergebnis weiter."
  - q: "Was ist der Unterschied zwischen Preisbuch und Decision Table?"
    a: "Das Preisbuch speichert die Preise. Decision Tables sind Nachschlagetabellen, die die Pricing Procedure liest. Sie werden aus Preisbucheinträgen, Mengenstaffeln oder Vertragspreisen befüllt, wenn Sie sie aktualisieren oder Sync Pricing Data ausführen."
  - q: "Was ist der Preiswasserfall in Salesforce Pricing?"
    a: "Der Preiswasserfall zeigt jeden Rechenschritt vom Listenpreis bis zum Endpreis. Sie sehen ihn, wenn Sie eine Pricing Procedure simulieren, und wenn Sie im Angebot mit der Maus über den Nettostückpreis einer Position fahren."
  - q: "Können andere Systeme die Preisberechnung von Revenue Cloud nutzen?"
    a: "Ja. Die Salesforce Pricing Business APIs enthalten eine Ressource für Headless Pricing, die einen Kontext anlegt und in einem Aufruf bepreist, dazu Ressourcen für den Preiswasserfall. Ein Portal oder ein Agent kann so einen Preis abfragen, ohne ein Angebot anzulegen."
  - q: "Wie testet man eine Änderung an einer Pricing Procedure?"
    a: "Einzelfälle mit der Simulation im Pricing Procedure Builder und die ganze Änderung gegen einen festen Satz von Referenzangeboten mit dokumentierten Soll-Nettopreisen. Live geht die Änderung erst, wenn alle Fälle stimmen."
draft: false
---

Revenue Cloud berechnet Preise mit Salesforce Pricing. Das Preisbuch hält den Listenpreis, Decision Tables machen die Preisdaten für die Engine lesbar, eine Kontextdefinition bringt die Angebotsposition in die Berechnung, und eine Pricing Procedure arbeitet die Schritte in fester Reihenfolge ab, etwa Listenpreis, Mengenrabatt, Attributrabatt, manueller Rabatt und Aggregatpreis. Der Preiswasserfall zeigt anschließend jeden Schritt. Für Hersteller heißt das: Preislogik wird Konfiguration, die auf jedem Angebot Preise verändert. Ich behandle eine Pricing Procedure deshalb wie Code: eine verantwortliche Person, Versionen und Regressionsfälle vor jeder Änderung.

## Woraus besteht Salesforce Pricing?

Salesforce Pricing ist die Preisfindung in Revenue Cloud, das in der Salesforce-Dokumentation derzeit auch Revenue Management oder Agentforce Revenue Management heißt. Gearbeitet wird in der App Price Management. Laut der Trailhead-Einheit [Configure Pricing for Products](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/configure-pricing-for-products) bilden vier Teile die Grundlage:

- **Preisbücher** halten die Produktpreise. Ein Produkt muss im Standardpreisbuch stehen, bevor es in ein eigenes Preisbuch kommt, wie [Explore Salesforce Pricing](https://trailhead.salesforce.com/content/learn/modules/price-management-with-revenue-cloud/explore-salesforce-pricing) erklärt.
- **Decision Tables** sind die Brücke zu den Daten. Pricing Procedures lesen Preisbucheinträge nicht direkt, Regeln in den Decision Tables holen die Werte aus den zugrunde liegenden Tabellen.
- **Kontextdefinitionen** beschreiben, welche Daten hinein- und herausgehen. Standard ist SalesTransactionContext, der Verkaufsvorgänge mit Angeboten, Assets und Aufträgen verbindet. Ein Pricing-Admin kann ihn um eigene Felder erweitern.
- **Pricing Procedures** sind die eigentliche Berechnung.

Dazu kommen Preisanpassungspläne für Mengenstaffeln, Vertragspreise auf Contract-Item-Price-Datensätzen und [abgeleitete Preise](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/implement-derived-pricing), bei denen sich der Preis eines Produkts aus einem anderen ergibt, etwa ein Zubehörteil mit 10 Prozent vom Listenpreis des Hauptprodukts.

Wer von Salesforce CPQ kommt: Was dort Price Rules und das Quote Calculator Plugin erledigt haben, muss in Pricing Procedures neu gebaut werden. Automatisch umgewandelt wird nichts. Die übrigen Unterschiede stehen in [Salesforce CPQ und Revenue Cloud: die Unterschiede](../salesforce-cpq-revenue-cloud-unterschiede/).

## Wie berechnet eine Pricing Procedure einen Preis?

Salesforce beschreibt eine Pricing Procedure als festgelegte Menge von Preiselementen in einer Ausführungsreihenfolge. Jedes Element nimmt seine Eingaben aus der Kontextdefinition, wendet seine Logik an und gibt das Ergebnis an das nächste Element weiter. Das Endergebnis geht zurück an die Kontextdefinition, die es in die Angebotsposition schreibt.

Die Trailhead-Beispiele bauen eine Prozedur aus diesen Elementen:

1. **Pricing Setting** ordnet die Position zu und legt die Ausgaben fest: Preiswasserfall, Nettostückpreis und Zwischensumme.
2. **List Price** sucht den Preisbucheintrag nach Produkt, Preisbuch und Verkaufsmodell. Ist "Use contract-based pricing" gesetzt, sucht das Element zuerst einen [Vertragspreis im aktiven Vertrag des Kunden](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/configure-contract-based-pricing).
3. **Volume Discount** liest die Staffeln eines Preisanpassungsplans nach Menge und Gültigkeitsdatum. Das [Trailhead-Beispiel](https://trailhead.salesforce.com/content/learn/modules/price-management-with-revenue-cloud/add-volume-and-manual-discounts) nutzt 10 Prozent ab 100 Stück und 25 Prozent ab 300.
4. **Attributrabatt** passt den Preis abhängig von Produktattributen an, zum Beispiel für eine günstigere Variante mit einfacher Steuerung.
5. **Manual Discount** übernimmt den Rabatt, den der Vertrieb nach Art und Wert eingibt.
6. **Aggregate Price** [fasst Werte über mehrere Positionen zusammen](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/apply-aggregate-pricing), etwa je Produktfamilie. Das passiert auf Positionsebene, in den Kopf des Angebots rollt Revenue Cloud diese Summen nicht hoch.

Die Reihenfolge ist Geschäftslogik. Ob der manuelle Rabatt vor oder nach dem Mengenrabatt greift, verändert den Nettopreis, ebenso, ob ein Vertragspreis den Listenpreis ersetzt, bevor Staffeln wirken. Das entscheiden Vertriebsleitung und Controlling, nicht die Person, die die Prozedur baut.

Eine neue Prozedur beginnt als leere Version V1, jedes hinzugefügte Element wird ein Schritt. Welche Prozedur gilt, legen Sie in den Revenue Settings als Standard-Pricing-Procedure fest. Nach einer Änderung speichern und aktivieren Sie die Version.

## Decision Tables nach jeder Preisänderung aktualisieren

Dieser Schritt wird in den ersten Wochen am leichtesten vergessen. Ändern Sie einen Preisbucheintrag oder eine Mengenstaffel, rechnet das Angebot weiter mit dem alten Wert, bis die Decision Table aktualisiert ist. Trailhead zeigt zwei Wege: Sync Pricing Data im Salesforce Pricing Setup ausführen oder einzelne Decision Tables im Setup aktualisieren, etwa Volume Discount Entries oder für Vertragspreise Contract Pricing Entries und Contract Pricing Volume Tiers.

```hinweis achtung
Kommen bei einem Hersteller die Listenpreise jede Nacht aus SAP, gehört die Aktualisierung in den Ladejob. Der Ladevorgang ist erst fertig, wenn die Decision Tables aktuell sind. Ich würde danach eine Prüfung einbauen, die eine Handvoll Referenzpreise vergleicht, denn eine vergessene Aktualisierung erzeugt keine Fehlermeldung, nur falsche Preise.
```

## Was zeigt der Preiswasserfall?

Der Preiswasserfall zeigt jeden Rechenschritt vom Listenpreis bis zum Endpreis. Sie sehen ihn an zwei Stellen: in der Simulation des Pricing Procedure Builder und an der Angebotsposition, wenn Sie mit der Maus über den Nettostückpreis fahren. Im Beispiel zu Vertragspreisen zeigt er den Vertragspreis als Basis und den Mengenrabatt darauf.

Für den Vertrieb beantwortet er die Frage "Warum ist der Preis so?" ohne Ticket an die IT. Für das Controlling dokumentiert er, wie ein Preis zustande kam. Für Tests ist er das nützlichste Werkzeug: Die Simulation hat einen vereinfachten Modus mit Eingabefeldern und einen erweiterten Modus mit JSON-Eingabe. Trailhead merkt an, dass Entwickler meist den JSON-Modus bevorzugen, und ich sehe das genauso, denn ein JSON-Fall lässt sich speichern und nach jeder Änderung wieder ausführen.

## Können andere Systeme Revenue Cloud nach einem Preis fragen?

Ja. Die [Salesforce Pricing Business APIs](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/pricing_business_apis.htm) im Revenue Management Developer Guide (Winter '27, API 68.0) enthalten Ressourcen für Headless Pricing, für die Aktualisierung der Nachschlagetabellen und für den Preiswasserfall.

```vertiefung Für Entwickler
titel: Welche Ressourcen der Pricing Business APIs brauchen Sie?
- `/connect/core-pricing/pricing` für Headless Pricing, das in einem Aufruf einen Kontext anlegt und befüllt und Preise je Position samt Fehlern zurückgibt
- `/connect/core-pricing/price-contexts/{contextId}`, um einen bestehenden Kontext zu bepreisen
- `/connect/core-pricing/sync/{pricingSyncOrigin}`, um die Nachschlagetabellen zu aktualisieren
- `/connect/core-pricing/waterfall`, um den Preiswasserfall einer Position zu schreiben und zu lesen
```

Das zählt, wenn derselbe Preis in einem Händlerportal, einem B2B-Shop oder in der Antwort eines Agenten erscheinen soll. Den Shop behandle ich in [Advanced Pricing im B2B-Shop](../advanced-pricing-b2b-shop-revenue-cloud/) und im Kapitel [Preise, Warenkorb und Checkout](../../masterclass/b2b-commerce/preise-warenkorb-checkout/). Ein Agent sollte die Pricing API aufrufen und nie selbst einen Preis ausrechnen, nach derselben Regel, die ich in [Agent Script: Geschäftsregeln gehören nicht ins LLM](../agent-script-regeln-statt-llm/) beschreibe.

## Jede Pricing Procedure braucht eine verantwortliche Person

Eine Pricing Procedure ändert Preise auf jedem Angebot. Ich behandle sie wie Code, auch wenn sie per Klick gebaut wird:

- **Eine verantwortliche Person.** Meist ein Pricing-Admin im Vertriebsinnendienst oder in Sales Operations, Änderungen gibt das Controlling frei. Der Implementierungspartner baut, entscheidet aber nicht.
- **Versionen.** Jede Änderung wird eine neue Version mit einer kurzen Notiz, was sich warum geändert hat.
- **Regressionsfälle.** Ein fester Satz von Referenzangeboten mit dokumentierten Soll-Nettopreisen: Standardprodukte, jede Mengenstaffel, Vertragskunden, Attributrabatte, manuelle Rabatte über und unter den Freigabegrenzen. Jede Änderung läuft gegen alle Fälle, bevor sie live geht.
- **Deployment.** Prozeduren wandern als Metadaten zwischen Orgs, Preisbücher, Staffeln und Vertragspreise dagegen sind Daten. Laut der [Gearset-Dokumentation](https://docs.gearset.com/en/articles/10776213-how-to-deploy-pricing-procedures) sind Pricing Procedures in der Metadata API ExpressionSetDefinitions, ein Deployment legt in der Ziel-Org eine neue Version an, und danach müssen die Decision Tables aktualisiert werden. Wie das in eine Pipeline passt, steht in [Revenue Cloud Deployments](../revenue-cloud-konfiguration-deployment/).

Wie Tests und Reviews allgemein in den Release-Prozess gehören, behandelt das Kapitel [Qualität, Tests und Reviews](../../masterclass/devops-release-management/qualitaet-tests-reviews/) der DevOps-Masterclass.

## Rechenbeispiel: Pumpenhersteller mit Händlern und Vertragspreisen

Ein Pumpenhersteller verkauft 60 Produktfamilien über den eigenen Vertrieb und über Händler. Die Listenpreise kommen jede Nacht aus SAP ins Standardpreisbuch. Händler bekommen einen Mengenrabatt, 20 Großkunden haben Vertragspreise für zwei Jahre, und eine Variante mit einfacher Steuerung ist 8 Prozent günstiger.

Die Prozedur enthielte den Listenpreis mit vertragsbasierter Preisfindung, einen Attributrabatt für die Steuerung, den Mengenrabatt, den manuellen Rabatt und ein Aggregat je Produktfamilie. Der Nachtjob lädt die Preise und startet danach den Sync. Der Regressionssatz umfasst 25 Referenzangebote, die jede Produktgruppe, jede Mengenstaffel und mehrere Vertragskunden abdecken. Wünscht der Vertrieb eine Aktion, baut der Pricing-Admin eine neue Version in einer Sandbox, lässt die 25 Fälle laufen, das Controlling prüft die Abweichungen im Preiswasserfall, und erst dann wird die Version in der Produktion aktiviert.

Ob SAP oder Salesforce Händler- und Vertragspreise überhaupt berechnen sollte, ist eine eigene Entscheidung. Die behandle ich in [Kundenpreise: SAP-Konditionen oder Salesforce Pricing?](../kundenpreise-sap-konditionen-oder-salesforce-pricing/).

## Die Preislogik als Schritte aufschreiben

Schreiben Sie Ihre Preislogik als Schritte auf, bevor jemand den Builder öffnet: Welcher Preis ist der Ausgangspunkt, welche Rabatte folgen in welcher Reihenfolge, welche brauchen eine Freigabe? Diese Liste wird zugleich die Prozedur und die ersten Regressionsfälle. Wie die Preisfindung mit Katalog und Konfigurator zusammenspielt, erklärt das Kapitel [Katalog, Konfigurator, Preise](../../masterclass/revenue-cloud/produktkatalog-konfigurator-preise/) der Masterclass Revenue Cloud, die Freigaben behandelt [Rabattfreigaben in Revenue Cloud](../revenue-cloud-rabattfreigaben/).
