---
title: "Kundenpreise: SAP-Konditionen oder Salesforce Pricing?"
description: "Sollen Händler- und Kundenpreise aus SAP-Konditionen kommen oder in Revenue Cloud neu entstehen? Drei Wege mit Aufwand, Risiken und Entscheidungsregel."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: kundenpreise-sap-konditionen-oder-salesforce-pricing
translationKey: customer-prices-sap-or-salesforce-pricing
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: integration
tags: [Revenue Cloud, SAP, Konditionen, Salesforce Pricing, Schnittstellen, Preisführung]
takeaways:
  - "Rechnen SAP und Salesforce denselben Nettopreis, weichen sie ab, und die Differenz muss der Vertriebsinnendienst klären."
  - "Der MuleSoft Accelerator for SAP beschreibt die SAP-Auftragssimulation für Salesforce CPQ, nicht für Revenue Cloud."
  - "Bei Weg B erfolgt die Preisberechnung schnell und nachvollziehbar, aber nur, wenn SAP denselben Preis nicht mehr berechnet."
  - "Preise für EDI-, Telefon- oder Shop-Aufträge ohne Salesforce bleiben meist in SAP, außer alle Kanäle rufen einen gemeinsamen Preisdienst auf."
faq:
  - q: "Sollen Kundenpreise in SAP oder in Salesforce berechnet werden?"
    a: "Dort, wo die Konditionen gepflegt werden und wo sie auch für Aufträge gelten, die nicht aus Salesforce stammen. Bleibt SAP das Auftragssystem für alle Kanäle, bleiben Kunden- und Vertragskonditionen deshalb meist in SAP, während pro Geschäft verhandelte Rabatte in Revenue Cloud berechnet werden können."
  - q: "Kann Revenue Cloud Nettopreise live aus SAP holen?"
    a: "Im Standard ist das nicht vorgesehen. Der MuleSoft Accelerator for SAP beschreibt einen Nettopreisabruf über die SAP-Auftragssimulation für Salesforce CPQ. Für Revenue Cloud bauen Sie den Aufruf selbst und sollten die Antwortzeit mit echten Angebotsgrößen testen."
  - q: "Was ist das Risiko, SAP-Konditionen nach Salesforce zu kopieren?"
    a: "Die Logik ist dann zweimal vorhanden. Jede Konditionsänderung in SAP muss geladen und synchronisiert werden, bevor das Angebot stimmt, und rechnet SAP den Auftrag neu, zeigen Angebot und Auftragsbestätigung unterschiedliche Preise."
  - q: "Wo liegen Vertragspreise in Revenue Cloud?"
    a: "Sie liegen auf Contract-Item-Price-Datensätzen, die einem aktiven Vertrag zugeordnet sind, optional mit eigenen Mengenstaffeln. Das Listenpreis-Element der Pricing Procedure nutzt sie, wenn vertragsbasierte Preisfindung eingeschaltet ist."
draft: false
---

Bleibt SAP das Auftragssystem für alle Kanäle, sollten Kunden- und Händlerpreise meist dort gerechnet werden, wo die Konditionen heute gepflegt werden, und Revenue Cloud sollte sie abfragen statt sie zu kopieren. Das ist Weg A: SAP rechnet, Salesforce holt den Nettopreis per API. Weg B baut die Konditionen in Salesforce Pricing nach und passt, wenn der Vertrieb die Preisfindung dauerhaft übernimmt. Weg C, Listenpreise aus SAP und Rabatte in Salesforce, passt, wenn der Vertrieb Rabatte wirklich pro Geschäft entscheidet. Egal welcher Weg: Jede Preisart erhält ein führendes System, nie zwei, schriftlich festgelegt vor dem ersten Angebot.

## Warum braucht jeder Preis genau ein führendes System?

SAP rechnet Preise mit der Konditionstechnik: Kundenpreise, Preislisten, Rabatte je Materialgruppe, Zuschläge und Staffeln, jeweils mit eigenem Gültigkeitszeitraum. Revenue Cloud rechnet mit [Pricing Procedures](/blog/revenue-cloud-preisprozeduren/), Preisbüchern und Decision Tables. Beide können einen Nettopreis liefern. Das Problem beginnt, wenn beide denselben Preis berechnen.

Das Angebot enthält meist den ersten Preis, den Ihr Kunde sieht, die Auftragsbestätigung aus SAP den zweiten. Berechnen zwei Engines diese Preise, weichen sie früher oder später voneinander ab: wegen einer abgelaufenen Aktion, eines Frachtzuschlags, einer Rundungsregel oder einer Kondition, die in SAP nach dem letzten Ladelauf geändert wurde. Dann muss jemand entscheiden, welcher Preis gilt, den Auftrag korrigieren und es dem Kunden erklären. Wurde das vor dem Go-live nicht entschieden, muss der Vertriebsinnendienst die Klärung Auftrag für Auftrag übernehmen.

Salesforce hat inzwischen sogar eine Preis-Engine in Manufacturing Cloud, Penny Perfect Pricing, die Konditionssätze und Kalkulationsschemata nach ERP-Vorbild für Telesales-Aufträge abbildet. Warum das die Frage nach dem führenden System nicht erledigt, beschreibe ich in [Penny Perfect Pricing](/blog/penny-perfect-pricing-erp-preise/), und hier gilt dasselbe.

## Weg A: SAP rechnet, Salesforce fragt

Das Muster ist im [MuleSoft Accelerator for SAP, Use Case 3a](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/) beschrieben. SAP S/4HANA ist dort das führende System für Preiskonditionen. In der Variante mit Salesforce CPQ klickt der Vertrieb auf Calculate, die Integration ruft SAP über MuleSoft-APIs auf und erhält den Nettopreis für die angefragte Menge zurück, einschließlich Staffeln und Vertragspreisen aus SAP. Eine API nutzt dafür die SAP-Auftragssimulation und prüft zusätzliche Rabatte gegen Grenzwerte, die in SAP gepflegt sind. Wird der Auftrag in Salesforce angelegt, wird er auch in SAP angelegt:

```ablauf
sf: Angebot, Auftrag
ext: MuleSoft-APIs
erp: Auftragssimulation, SAP-Auftrag
Angebot --Calculate--> MuleSoft-APIs
MuleSoft-APIs --> Auftragssimulation
Auftragssimulation ..Nettopreis..> Angebot
Angebot --> Auftrag
Auftrag --Anlage--> SAP-Auftrag
SAP-Auftrag ..Auftragsnummer..> Auftrag
```

Der Accelerator deckt Sales Cloud und Salesforce CPQ ab, nicht Revenue Cloud. Für Revenue Cloud bauen Sie den Aufruf selbst. Salesforce beschreibt Procedure Plans mit dem Apex-Namespace [RevSignaling](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/apex_namespace_RevSignaling.htm) als Möglichkeit, den Standardablauf der Preisfindung um eigene Logik zu erweitern. Prüfen Sie zuerst die dokumentierten Einschränkungen solcher Hooks, etwa die nötige Lizenz, die Kontexte, in denen externe Aufrufe unterstützt werden, und die Apex Governor Limits. Ob ein synchroner SAP-Aufruf dort in Ihre Antwortzeiten passt, testen Sie in einem Prototyp mit echten Angebotsgrößen, und legen Sie fest, was passiert, wenn SAP nicht antwortet. Die einfachere Alternative ist ein fester Zeitpunkt, etwa eine Aktion "Preis prüfen" vor der Freigabe, statt eines Aufrufs bei jeder Neuberechnung.

```pro-contra
pro: Stärken von Weg A
- Das Angebot zeigt den SAP-Preis. Angebot und Auftragsbestätigung passen zusammen, solange SAP den Auftrag mit denselben Eingaben und demselben Preisdatum rechnet.
- Konditionen werden an einer Stelle gepflegt.
contra: Schwächen von Weg A
- Jeder Aufruf ist von SAP und der Middleware abhängig.
- Ein Angebot mit vielen Positionen wartet auf die Antwort.
- Der Preiswasserfall in Salesforce zeigt nur das Ergebnis, die Erklärung bleibt in SAP.
```

## Weg B: Konditionen in Salesforce Pricing nachbauen

Revenue Cloud hat die Werkzeuge dafür: Preisbücher je Land und Währung, Preisanpassungspläne für Mengenstaffeln und [Contract-Item-Price-Datensätze](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/configure-contract-based-pricing) für ausgehandelte Kundenpreise, mit eigenen Mengenstaffeln. Das Listenpreis-Element nutzt sie, wenn vertragsbasierte Preisfindung eingeschaltet ist. Nach Änderungen müssen die betroffenen Decision Tables für Vertragspreise, etwa Contract Pricing Entries und Contract Pricing Volume Tiers, aktualisiert werden, sobald der Ladelauf abgeschlossen ist.

Stärken: Die Preisfindung ist schnell, funktioniert ohne SAP, und der Preiswasserfall erklärt jeden Schritt. Dieselbe Preislogik lässt sich über die Pricing API auch einem Portal, einem Shop oder einem Agenten anbieten, wenn diese Kanäle denselben Kontext und dieselbe Pricing Procedure nutzen.

Schwächen: SAP-Konditionen lassen sich selten eins zu eins übertragen. Jede Kondition mit ihrer Gültigkeit muss übersetzt, geladen und aktuell gehalten werden. Und solange SAP den Preis aus Salesforce nicht als festen Preis im Auftrag übernimmt, rechnet SAP mit eigener Logik neu, und Sie haben zwei Engines. Weg B funktioniert nur, wenn die Preishoheit wirklich auf Salesforce übergeht und SAP diese Preise für Aufträge aus Salesforce nicht mehr rechnet.

## Weg C: Listenpreise aus SAP, Rabatte in Salesforce

Die Listenpreise werden aus SAP ins Preisbuch geladen, danach folgt der Sync der Decision Tables. Mengenrabatte, Attributrabatte und manuelle Rabatte rechnet die Pricing Procedure in Salesforce, und der Freigabeprozess entscheidet, welche Rabatte genehmigt werden müssen.

Das passt, wenn Listenpreise stabil sind und der Vertrieb Rabatte pro Geschäft verhandelt, wie bei Maschinen und Anlagen. Das Risiko ist ein doppelter Rabatt: Hält SAP noch einen Kundenrabatt, der im Auftrag automatisch greift, und gewährt der Vertrieb in Salesforce einen Rabatt, erhält der Kunde beides. Bei diesem Weg darf SAP diese Konditionen also nicht auf Aufträge aus Salesforce anwenden, oder Salesforce darf diese Rabatte nicht gewähren.

## Wie schneiden die drei Wege im Vergleich ab?

| Kriterium | A: SAP rechnet | B: Nachbau in Salesforce | C: Listenpreis aus SAP |
|---|---|---|---|
| Führendes System | SAP | Salesforce | SAP für Listenpreise, Salesforce für Rabatte |
| Tempo im Angebot | Abhängig von SAP und Middleware | Schnell | Schnell |
| Angebot gleich Auftragsbestätigung | Ja, wenn SAP dieselben Eingaben bekommt | Nur wenn SAP den Preis übernimmt | Nur wenn SAP keine eigenen Rabatte addiert |
| Erklärung des Preises | In SAP | Preiswasserfall in Salesforce | Preiswasserfall für Rabatte |
| Aufwand beim Aufbau | API, Middleware, Fehlerbehandlung | Migration der Konditionen, Ladeläufe, Syncs | Ladejob und Sync |
| Laufender Aufwand | Betrieb der Schnittstelle | Pflege der Preisdaten in Salesforce, SAP übernimmt den Preis | Regeln für Rabatte und Freigaben |

Ich ordne den Wegen keine Euro-Beträge zu, weil sie von Ihren Konditionen, Ihrer Middleware und der Größe Ihrer Angebote abhängen. Aus meiner Sicht kostet die Abstimmungsarbeit, wenn zwei Engines unterschiedliche Preise liefern, auf Dauer mehr als der Aufbau, und vermeiden lässt sie sich nur mit einem klar führenden System.

## Wo passen Vertragspreise und Sales Agreements hinein?

Kundenspezifische Vertragspreise folgen derselben Regel. Werden sie in SAP verhandelt und gepflegt, eignen sich Weg A oder eine Replikation in Contract-Item-Price-Datensätze mit klarer Verantwortung. Werden sie in Salesforce verhandelt, kann Revenue Cloud sie führen.

Sales Agreements in Manufacturing Cloud planen Mengen je Periode und enthalten einen Verkaufspreis je Produkt. Ich würde diesen Preis einmal im Angebot freigeben und ihn in das Agreement übernehmen, wie in [Vom Angebot zum Sales Agreement](/blog/angebot-zu-sales-agreement-produktkonfigurator/) beschrieben. Das ist meine Designentscheidung, keine Produktgrenze: Das Agreement braucht dann keine eigene Preislogik, und Preisänderungen erfolgen über ein neues Angebot.

Der B2B-Shop muss denselben Preis zeigen wie das Angebot. Wie Preisbücher und ein Live-Aufruf ins ERP dort funktionieren, steht in [Kundenpreise in B2B Commerce](/blog/kundenpreise-b2b-commerce-preisbuecher-erp/) und im Kapitel [Preise, Warenkorb und Checkout](/masterclass/b2b-commerce/preise-warenkorb-checkout/). Dasselbe gilt für KI-erstellte Händlerangebote, siehe [KI-Angebote für Händler mit dem Partner Sales Assistant](/blog/ki-angebote-haendler-partner-sales-assistant/).

## Rechenbeispiel: Förderanlagen mit 200 Händlern

Angenommen, ein Hersteller von Förderanlagen verkauft Maschinen über den Direktvertrieb und Ersatzteile über 200 Händler. In SAP sind Listenpreise je Land, Händlerrabatte je Materialgruppe und Kundenpreise für 30 Großkunden hinterlegt. Maschinenangebote haben 20 bis 80 Positionen und werden in der Konfiguration oft neu berechnet. Händler bestellen Ersatzteile außerdem per EDI.

Ich würde nach Preisart trennen. Für Maschinen würde ich Weg C wählen: Listenpreise werden jede Nacht aus SAP geladen, Rabatte und Freigaben werden in Revenue Cloud verwaltet, und SAP übernimmt den Auftragspreis als festen Preis. Für Ersatzteile würde ich Weg A wählen: Händlerrabatte und Großkundenpreise bleiben in SAP, weil sie auch für EDI-Aufträge gelten, und Salesforce ruft den Nettopreis bei SAP ab, wenn das Angebot vor dem Versand geprüft wird. Das Ergebnis ist ein führendes System je Preisart, festgehalten in der [Object Ownership Matrix](/blog/object-ownership-matrix-salesforce/).

## Preisarten auflisten und je Preisart das führende System festlegen

Listen Sie Ihre Preisarten auf: Listenpreis, Händlerrabatt, Kundenpreis, Vertragspreis, Aktion, Frachtzuschlag. Notieren Sie für jede, wo sie heute gepflegt wird, wer sie ändert, wie oft, und ob sie auch für Aufträge gilt, die nicht aus Salesforce stammen. Die letzte Frage entscheidet meistens: Preise, die für EDI-, Telefon- oder Shop-Aufträge ohne Salesforce gelten, bleiben in SAP, außer alle Kanäle rufen einen gemeinsamen Preisdienst auf. Notieren Sie je Preisart auch, welches System sie rechnet und ob SAP den Auftrag neu bepreisen darf. Die Aufteilung von Quote-to-Cash zwischen den Systemen behandelt [Revenue Cloud und SAP: Wer führt was?](/blog/revenue-cloud-sap-quote-to-cash-aufteilung/). Den Zusammenhang behandelt das Kapitel [Katalog, Konfigurator, Preise](/masterclass/revenue-cloud/produktkatalog-konfigurator-preise/) der Masterclass Revenue Cloud. Die Schnittstelle selbst zu entwerfen, gehört zu meiner Arbeit an [Salesforce-Schnittstellen](/leistungen/salesforce-schnittstellen/).
