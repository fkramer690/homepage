---
title: "Revenue Cloud für Hersteller: Wann lohnt es sich?"
description: "Wann sich Revenue Cloud für Maschinen- und Komponentenhersteller lohnt, wann Sales Cloud und SAP reichen, was es kostet und was vorher feststehen muss."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-lohnt-sich-hersteller
translationKey: revenue-cloud-worth-it-manufacturers
topic: revenue
categories: [revenue-cloud, architecture]
tags: [Revenue Cloud, CPQ, Quote-to-Cash, Make-or-Buy, SAP, Fertigung]
takeaways:
  - "Ist ein Angebot nur eine Preisabfrage in SAP für ein kleines Sortiment, reichen meist Angebote in Sales Cloud und eine ERP-Schnittstelle."
  - "Revenue Cloud Advanced kostet 200 Euro pro Nutzer und Monat zusätzlich zu Sales Cloud, für 50 Angebotsnutzer 120.000 Euro im Jahr."
  - "Salesforce CPQ wird an Neukunden nicht mehr verkauft. Ein neues Projekt wählt zwischen Revenue Cloud, einem Partnerprodukt und einem eigenen Ansatz."
  - "Bevor ein Partner ausgewählt wird, sollte feststehen, wo Preise berechnet werden und welches System die Rechnung stellt."
faq:
  - q: "Was ist Salesforce Revenue Cloud?"
    a: "Revenue Cloud ist das Quote-to-Cash-Produkt von Salesforce auf der Kernplattform. Es umfasst Produktkatalog, Preise, Konfigurator, Angebote und Aufträge, Verträge, Auftragsorchestrierung und als Zusatzprodukt die Abrechnung."
  - q: "Lohnt sich Revenue Cloud bei einem kleinen Sortiment?"
    a: "Meist nicht. Bei wenigen Produkten, wenigen Varianten und Preisen aus SAP decken Angebote in Sales Cloud mit einer ERP-Schnittstelle den Bedarf zu deutlich geringeren Lizenzkosten."
  - q: "Brauche ich Sales Cloud für Revenue Cloud?"
    a: "Ja. Laut Preisseite von Salesforce ist Revenue Cloud ein kostenpflichtiges Zusatzprodukt, das zusätzlich zu einem Sales-Cloud-Abonnement gekauft wird."
  - q: "Kann ich stattdessen noch Salesforce CPQ kaufen?"
    a: "Als Neukunde nicht. Salesforce verkauft keine neuen CPQ-Lizenzen an Neukunden. Bestandskunden können CPQ weiter nutzen, Nutzer nachkaufen und verlängern."
draft: false
---

Revenue Cloud lohnt sich für Maschinen- und Komponentenhersteller, wenn ein Angebot mehr ist als eine Preisabfrage: viele Varianten und Optionen, Wartungsverträge oder Abonnements auf demselben Angebot, häufige Nachträge und Angebote mit Hunderten Positionen. Wählt der Vertrieb dagegen ein paar Materialnummern und SAP rechnet den Preis, reichen meist Angebote in Sales Cloud und eine ERP-Schnittstelle. Zum Listenpreis kostet Revenue Cloud Advanced 200 Euro pro Nutzer und Monat zusätzlich zu Sales Cloud. Vor der Partnerauswahl würde ich zwei Fragen klären: Welches System rechnet die Preise, und welches System stellt die Rechnung?

## Was umfasst Revenue Cloud?

Revenue Cloud ist das Quote-to-Cash-Produkt von Salesforce, also der Weg vom Produktkatalog bis zur Rechnung, direkt auf der Salesforce-Plattform gebaut. Das Trailhead-Modul [Agentforce Revenue Management Foundations](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management) nennt diese Bausteine:

- **Product Catalog Management:** ein Produktmodell, das Salesforce als einzige Quelle der Wahrheit für Produktdaten beschreibt.
- **Salesforce Pricing:** Preisregeln einschließlich Rabatten, nutzbar über mehrere Kanäle.
- **Rate Management:** Tarife nach Verbrauch, mit Staffeln und Mengen.
- **Product Configurator:** gültige Merkmalskombinationen für komplexe Produkte, Bundles und Attribute.
- **Transaction Management:** Angebote und Aufträge, einschließlich der Assets nach dem Verkauf.
- **Salesforce Contracts:** Verträge und die Pflichten daraus.
- **Dynamic Revenue Orchestrator:** die Schritte nach dem Auftrag bis zur Erfüllung.
- **Billing:** Rechnungen, Steuerberechnung, Zahlungsbedingungen und Gutschriften.

Das Produkt hatte mehrere Namen, darunter Revenue Lifecycle Management und Agentforce Revenue Management. Welcher wo gilt, steht in [Revenue Cloud, RLM, RCA: Welcher Name gilt jetzt?](../revenue-cloud-produktnamen-rlm-rca/).

Für ein neues Projekt ist eine Option weggefallen.

```hinweis achtung
Laut der [Salesforce-Seite zum Verkaufsende von CPQ](https://www.salesforce.com/sales/cpq/end-of-life/) verkauft Salesforce keine CPQ-Lizenzen mehr an Neukunden.
```

Dieselbe Seite beschreibt CPQ als Managed Package und Revenue Cloud Advanced als Nachfolger, nativ auf der Plattform gebaut. Bestandskunden können CPQ weiter nutzen, Nutzer nachkaufen und verlängern, eine erzwungene Migration gibt es nicht.

## Wann lohnt sich Revenue Cloud für einen Hersteller?

Ich suche im heutigen Angebotsprozess nach diesen Signalen:

- **Viele Varianten mit Regeln.** Hat eine Maschine Dutzende Optionen, die sich ausschließen oder bedingen, spart ein Konfigurator mit Kombinationsprüfung Nacharbeit in der Auftragsabwicklung. Der Katalog arbeitet mit Attributen, nicht jede Variante braucht einen eigenen Produktdatensatz.
- **Service und Abonnements auf demselben Angebot.** Ersatzteilpaket, Wartungsvertrag und ein Abo für Fernüberwachung auf einem Angebot sind ein typischer Fall. Abonnements sind laut [Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) schon in Revenue Cloud Growth enthalten.
- **Häufige Änderungen nach dem Verkauf.** Erweiterungen, Verlängerungen und Kündigungen laufen wieder über Angebot, Auftrag und Asset. Je öfter sich Verträge ändern, desto mehr ist diese Struktur wert.
- **Große Angebote.** Für Winter '27 nennt Salesforce in den [Release Highlights](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-marketing-commerce-revenue-management) bis zu 15.000 Transaktionspositionen pro Geschäft.
- **Mehrere Kanäle auf einem Katalog.** Trailhead beschreibt Composable APIs, über die andere Clouds Katalog- und Preisdaten nutzen, mit Agentforce Manufacturing als Beispiel.

Zwei oder drei dieser Signale zusammen rechtfertigen einen genaueren Blick. Eines allein selten.

## Wann ist Revenue Cloud die falsche Antwort?

Für Hersteller, deren Angebote überwiegend Standardartikel mit Preisen aus dem ERP sind, ist Revenue Cloud meist zu viel. Ich sehe vier Fälle:

- **Das Angebot ist eine Preisabfrage in SAP.** Der Vertrieb wählt Materialnummern, SAP rechnet den Nettopreis aus seinen Konditionen. Dann braucht Salesforce eine Schnittstelle zu SAP, keine eigene Preisberechnung.
- **Wenige Produkte, wenige Varianten.** Ein Sortiment von 200 Artikeln ohne Optionen braucht keinen regelbasierten Konfigurator.
- **Die Regeln liegen woanders und bleiben dort.** Stecken die Variantenregeln in der SAP-Variantenkonfiguration oder in den Köpfen der Anwendungstechnik, und niemand pflegt sie doppelt, bleibt der Konfigurator in Salesforce leer.
- **Kein wiederkehrender Umsatz.** Ist jeder Verkauf eine einzelne Maschine und bleibt die Rechnung in SAP FI, liegen die stärksten Teile des Produkts brach.

Die Alternativen sind Angebote in Sales Cloud mit ERP-Schnittstelle, ein CPQ-Produkt eines Partners oder ein eigener Ansatz auf der Plattform, wie in [Vom Angebot zum Sales Agreement: der Konfigurator](../angebot-zu-sales-agreement-produktkonfigurator/) beschrieben. Ob zusätzlich Manufacturing Cloud passt, ist eine eigene Frage, die [Manufacturing Cloud vs. Sales Cloud: Wann lohnt sie sich?](../manufacturing-cloud-wann-lohnt-sie-sich/) beantwortet.

## Advanced kostet 200 Euro pro Nutzer zusätzlich zu Sales Cloud

Die [Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) (zuletzt geändert am 28. September 2026) nennt zwei Editionen pro Nutzer und Monat bei jährlicher Abrechnung:

| Edition | Listenpreis | Enthält |
|---|---|---|
| Revenue Cloud Growth | 150 Euro | Angebote und Konfigurator, Auftragserfassung, Abonnements |
| Revenue Cloud Advanced | 200 Euro | Alles aus Growth plus Verträge und Aufträge, Verbrauch und Rechnungsstellung, KI und Analytics |

Die FAQ derselben Seite sagt, dass Revenue Cloud ein kostenpflichtiges Zusatzprodukt ist, das zusätzlich zu einem Sales-Cloud-Abonnement gekauft wird. Revenue Cloud Billing ist ein weiteres Zusatzprodukt, der Preis nur auf Anfrage.

Eine Rechnung zum Listenpreis, als Annahme: 50 Vertriebsnutzer, die Angebote erstellen, bekommen Revenue Cloud Advanced. Das sind 50 × 200 Euro × 12 = 120.000 Euro im Jahr. Haben diese Nutzer noch kein Sales Cloud, kommen mit Sales Cloud Core zu 195 Euro pro Nutzer und Monat 117.000 Euro hinzu. Umsetzung, SAP-Integration und Wartung kommen obendrauf. Wer wirklich eine Lizenz braucht, klärt eine Lizenzprognose, wie in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/) beschrieben. Editionen und Zusatzprodukte im Detail stehen in [Revenue Cloud Preise: Growth, Advanced und Add-ons](../revenue-cloud-editionen-preise/).

## Rechenbeispiel: 400 Angebote im Monat, eines von zehn ist ein Projekt

Ein Komponentenhersteller verkauft Ventile und Antriebe in rund 3.000 Varianten. Der größte Teil des Geschäfts läuft über 120 Händler mit eigenen Preislisten, gepflegt als Konditionen in SAP. Der Innendienst erstellt 400 Angebote im Monat. Neun von zehn sind Standardartikel, die SAP in Sekunden bepreist. Eines von zehn ist ein Projektangebot mit kundenspezifischer Variante, Wartungsvertrag und Inbetriebnahme.

Für die 360 Standardangebote im Monat bringt Revenue Cloud wenig. Der Preis kommt ohnehin aus SAP, und die Händlerkonditionen müssten nachgebaut oder bei jedem Angebot abgefragt werden. Für die 40 Projektangebote sieht es anders aus: Optionen mit Regeln, ein Vertrag mit Laufzeit und spätere Nachträge sind genau das, wofür das Produkt gebaut ist.

Meine Empfehlung in so einem Fall: zuerst entscheiden, ob SAP der Preismaster bleibt, und dann nur den Projektvertrieb lizenzieren. Mit 15 Nutzern auf Advanced sind das 36.000 Euro im Jahr zum Listenpreis statt eines sechsstelligen Betrags für den ganzen Vertrieb. Wie die Entscheidung über den Preismaster läuft, steht in [Kundenpreise: SAP-Konditionen oder Salesforce Pricing?](../kundenpreise-sap-konditionen-oder-salesforce-pricing/).

## Erster Schritt: Preismaster und Rechnungssystem vor der Partnerauswahl festlegen

Partner fragen nach Funktionen. Die Entscheidungen, die Kosten und Zeitplan treiben, sind andere, und sie gehören dem Unternehmen:

1. **Preismaster.** Rechnet SAP den Preis oder Salesforce Pricing? Für denselben Preis nie beide.
2. **Rechnungssystem.** Bleibt die Rechnung in SAP FI, oder kommt sie aus Revenue Cloud Billing? Das entscheidet das Finanzwesen, nicht das CRM-Team.
3. **Verantwortung für den Konfigurator.** Wer pflegt die Variantenregeln nach dem Go-live, und in welchem System?
4. **Parallelbetrieb mit CPQ.** Bestandskunden von CPQ entscheiden selbst, ob und wann sie umsteigen. Das [Kapitel zum Umstieg von CPQ](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/) beschreibt die Optionen.

Wie die Schritte vom Angebot bis zur Rechnung zwischen Revenue Cloud und SAP aufgeteilt werden, behandelt [Revenue Cloud und SAP: Wer führt was im Quote-to-Cash?](../revenue-cloud-sap-quote-to-cash-aufteilung/). Das [Überblickskapitel der Masterclass Revenue Cloud](../../masterclass/revenue-cloud/revenue-cloud-ueberblick/) ordnet alles ein, und die Architekturseite gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
