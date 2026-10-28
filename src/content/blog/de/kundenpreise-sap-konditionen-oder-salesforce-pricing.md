---
title: "Kundenpreise: SAP-Konditionen oder Salesforce Pricing?"
description: "Sollen Händler- und Kundenpreise aus SAP-Konditionen kommen oder in Revenue Cloud neu entstehen? Drei Wege im Vergleich, mit Aufwand, Risiken und Faustregel."
pubDate: 2026-10-28
lang: de
slug: kundenpreise-sap-konditionen-oder-salesforce-pricing
translationKey: customer-prices-sap-or-salesforce-pricing
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: integration
tags: [Revenue Cloud, SAP, Konditionen, Salesforce Pricing, Schnittstellen, Preisführung]
takeaways:
  - "Jede Preisart braucht genau ein führendes System. Rechnen SAP und Salesforce denselben Nettopreis, laufen sie auseinander, und die Differenz landet im Vertriebsinnendienst."
  - "Weg A: SAP rechnet, Salesforce fragt den Nettopreis per API ab. Der MuleSoft Accelerator for SAP beschreibt das mit der SAP-Auftragssimulation für Salesforce CPQ, nicht für Revenue Cloud."
  - "Weg B baut SAP-Konditionen in Revenue Cloud nach, mit Preisbüchern, Staffeln, Vertragspreisen und Decision Tables. Die Preisfindung ist schnell und nachvollziehbar, aber SAP muss aufhören, denselben Preis zu rechnen."
  - "Weg C lädt Listenpreise aus SAP und rechnet Rabatte in Salesforce Pricing. Das passt, wenn der Vertrieb Rabatte wirklich pro Geschäft entscheidet."
  - "Preise, die auch für Aufträge per EDI, Telefon oder Shop ohne Salesforce gelten, sollten in SAP bleiben."
faq:
  - q: "Sollen Kundenpreise in SAP oder in Salesforce berechnet werden?"
    a: "Dort, wo die Konditionen gepflegt werden und wo sie auch für Aufträge gelten, die nicht aus Salesforce kommen. Bei den meisten Herstellern mit SAP bleiben Kunden- und Vertragskonditionen deshalb in SAP, während pro Geschäft verhandelte Rabatte in Revenue Cloud gerechnet werden können."
  - q: "Kann Revenue Cloud Nettopreise live aus SAP holen?"
    a: "Nicht im Standard. Der MuleSoft Accelerator for SAP beschreibt einen Nettopreisabruf über die SAP-Auftragssimulation für Salesforce CPQ. Für Revenue Cloud bauen Sie den Aufruf selbst und sollten die Antwortzeit mit echten Angebotsgrößen testen."
  - q: "Was ist das Risiko, SAP-Konditionen nach Salesforce zu kopieren?"
    a: "Die Logik existiert zweimal. Jede Konditionsänderung in SAP muss geladen und synchronisiert werden, bevor das Angebot stimmt, und rechnet SAP den Auftrag neu, zeigen Angebot und Auftragsbestätigung unterschiedliche Preise."
  - q: "Wo liegen Vertragspreise in Revenue Cloud?"
    a: "Auf Contract-Item-Price-Datensätzen, die an einem aktiven Vertrag hängen, optional mit eigenen Mengenstaffeln. Das Listenpreis-Element der Pricing Procedure nutzt sie, wenn vertragsbasierte Preisfindung eingeschaltet ist."
draft: false
---

Bei den meisten Herstellern mit SAP sollten Kunden- und Händlerpreise dort gerechnet werden, wo die Konditionen heute gepflegt werden, und Revenue Cloud sollte sie abfragen statt sie zu kopieren. Das ist Weg A: SAP rechnet, Salesforce holt den Nettopreis per API. Weg B baut die Konditionen in Salesforce Pricing nach und passt, wenn der Vertrieb die Preisfindung dauerhaft übernimmt. Weg C, Listenpreise aus SAP und Rabatte in Salesforce, passt, wenn der Vertrieb Rabatte wirklich pro Geschäft entscheidet. Egal welcher Weg: Jede Preisart bekommt ein führendes System, nie zwei, schriftlich festgelegt vor dem ersten Angebot.

## Warum braucht jeder Preis genau ein führendes System?

SAP rechnet Preise mit der Konditionstechnik: Kundenpreise, Preislisten, Rabatte je Materialgruppe, Zuschläge und Staffeln, jeweils mit eigenem Gültigkeitszeitraum. Revenue Cloud rechnet mit [Pricing Procedures](../revenue-cloud-preisprozeduren/), Preisbüchern und Decision Tables. Beide können einen Nettopreis liefern. Das Problem beginnt, wenn beide es für denselben Preis tun.

Das Angebot ist der erste verbindliche Preis, den Ihr Kunde sieht, die Auftragsbestätigung aus SAP der zweite. Rechnen zwei Engines diese Preise, weichen sie früher oder später ab: eine abgelaufene Aktion, ein Frachtzuschlag, eine Rundungsregel, eine Kondition, die in SAP nach dem letzten Ladelauf geändert wurde. Dann muss jemand entscheiden, welcher Preis gilt, den Auftrag korrigieren und es dem Kunden erklären. Hat das vor dem Go-live niemand entschieden, erledigt es der Vertriebsinnendienst, Auftrag für Auftrag.

Salesforce hat inzwischen sogar eine Preis-Engine, die die SAP-Konditionstechnik für Telesales-Aufträge in Manufacturing Cloud nachbildet. Warum das die Frage nach dem führenden System nicht erledigt, beschreibe ich in [Penny Perfect Pricing](../penny-perfect-pricing-erp-preise/), und hier gilt dasselbe.

## Weg A: SAP rechnet, Salesforce fragt

Das Muster ist im [MuleSoft Accelerator for SAP, Use Case 3a](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/) beschrieben. SAP S/4HANA ist dort das führende System für Preiskonditionen. In der Variante mit Salesforce CPQ klickt der Vertrieb auf Calculate, die Integration ruft SAP über MuleSoft-APIs auf und bekommt den Nettopreis für die angefragte Menge zurück, einschließlich Staffeln und Vertragspreisen aus SAP. Eine API nutzt dafür die SAP-Auftragssimulation und prüft zusätzliche Rabatte gegen Grenzwerte, die in SAP gepflegt sind. Wird der Auftrag in Salesforce angelegt, entsteht er auch in SAP, und die SAP-Auftragsnummer kommt zurück.

Der Accelerator deckt Sales Cloud und Salesforce CPQ ab, nicht Revenue Cloud. Für Revenue Cloud bauen Sie den Aufruf selbst. Salesforce dokumentiert Procedure Plans mit dem Apex-Namespace [RevSignaling](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/apex_namespace_RevSignaling.htm) als Weg, den Standardablauf der Preisfindung um eigene Logik zu erweitern. Ob ein synchroner SAP-Aufruf dort in Ihre Antwortzeiten passt, testen Sie in einem Prototyp mit echten Angebotsgrößen. Die einfachere Alternative ist ein fester Zeitpunkt, etwa eine Aktion "Preis prüfen" vor der Freigabe, statt eines Aufrufs bei jeder Neuberechnung.

Stärken: Das Angebot zeigt den SAP-Preis, Angebot und Auftragsbestätigung passen zusammen, und Konditionen werden an einer Stelle gepflegt. Schwächen: Jeder Aufruf hängt an SAP und der Middleware, ein Angebot mit vielen Positionen wartet auf die Antwort, und der Preiswasserfall in Salesforce zeigt nur das Ergebnis, die Erklärung bleibt in SAP.

## Weg B: Konditionen in Salesforce Pricing nachbauen

Revenue Cloud hat die Werkzeuge dafür: Preisbücher je Land und Währung, Preisanpassungspläne für Mengenstaffeln und [Contract-Item-Price-Datensätze](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/configure-contract-based-pricing) für ausgehandelte Kundenpreise, mit eigenen Mengenstaffeln. Das Listenpreis-Element nutzt sie, wenn vertragsbasierte Preisfindung eingeschaltet ist. Nach jeder Änderung müssen die Decision Tables Contract Pricing Entries und Contract Pricing Volume Tiers aktualisiert werden.

Stärken: Die Preisfindung ist schnell, funktioniert ohne SAP, und der Preiswasserfall erklärt jeden Schritt. Derselbe Preis steht über die Pricing API auch einem Portal, einem Shop oder einem Agenten zur Verfügung.

Schwächen: SAP-Konditionen lassen sich selten eins zu eins übertragen. Jede Kondition mit ihrer Gültigkeit muss übersetzt, geladen und aktuell gehalten werden. Und solange SAP den Preis aus Salesforce nicht als festen Preis im Auftrag übernimmt, rechnet SAP mit eigener Logik neu, und Sie haben zwei Engines. Weg B funktioniert nur, wenn die Preishoheit wirklich zu Salesforce wandert und SAP diese Preise für Aufträge aus Salesforce nicht mehr rechnet.

## Weg C: Listenpreise aus SAP, Rabatte in Salesforce

Die Listenpreise werden aus SAP ins Preisbuch geladen, danach folgt der Sync der Decision Tables. Mengenrabatte, Attributrabatte, manuelle Rabatte und ihre Freigaben laufen in der Pricing Procedure in Salesforce.

Das passt, wenn Listenpreise stabil sind und der Vertrieb Rabatte pro Geschäft verhandelt, wie bei Maschinen und Anlagen. Das Risiko ist ein doppelter Rabatt: Hält SAP noch einen Kundenrabatt, der im Auftrag automatisch greift, und gewährt der Vertrieb in Salesforce einen Rabatt, bekommt der Kunde beides. Auf diesem Weg darf SAP diese Konditionen also nicht auf Aufträge aus Salesforce anwenden, oder Salesforce darf sie nicht gewähren.

## Wie schneiden die drei Wege im Vergleich ab?

| Kriterium | A: SAP rechnet | B: Nachbau in Salesforce | C: Listenpreis aus SAP |
|---|---|---|---|
| Führendes System | SAP | Salesforce | SAP für Listenpreise, Salesforce für Rabatte |
| Tempo im Angebot | Abhängig von SAP und Middleware | Schnell | Schnell |
| Angebot gleich Auftragsbestätigung | Ja, wenn SAP dieselben Eingaben bekommt | Nur wenn SAP den Preis übernimmt | Nur wenn SAP keine eigenen Rabatte addiert |
| Erklärung des Preises | In SAP | Preiswasserfall in Salesforce | Preiswasserfall für Rabatte |
| Aufwand beim Aufbau | API, Middleware, Fehlerbehandlung | Migration der Konditionen, Ladeläufe, Syncs | Ladejob und Sync |
| Laufender Aufwand | Betrieb der Schnittstelle | Doppelte Pflege oder geänderter Prozess in SAP | Regeln für Rabatte und Freigaben |

Euro-Beträge setze ich an die Wege nicht, weil sie von Ihren Konditionen, Ihrer Middleware und der Größe Ihrer Angebote abhängen. Aus meiner Sicht kostet die Abstimmungsarbeit, wenn zwei Engines unterschiedliche Preise liefern, auf Dauer mehr als der Aufbau, und vermeiden lässt sie sich nur mit einem klar führenden System.

## Wo passen Vertragspreise und Sales Agreements hinein?

Kundenspezifische Vertragspreise folgen derselben Regel. Werden sie in SAP verhandelt und gepflegt, dann Weg A oder eine Replikation in Contract-Item-Price-Datensätze mit klarer Verantwortung. Werden sie in Salesforce verhandelt, kann Revenue Cloud sie führen.

Sales Agreements in Manufacturing Cloud planen Mengen je Periode und tragen einen Verkaufspreis je Produkt. Ich würde diesen Preis einmal freigeben, im Angebot, und ihn in das Agreement übernehmen, wie in [Vom Angebot zum Sales Agreement](../angebot-zu-sales-agreement-produktkonfigurator/) beschrieben. Das Agreement braucht keine eigene Preislogik.

Der B2B-Shop muss denselben Preis zeigen wie das Angebot. Wie Preisbücher und ein Live-Aufruf ins ERP dort funktionieren, steht in [Kundenpreise in B2B Commerce](../kundenpreise-b2b-commerce-preisbuecher-erp/) und im Kapitel [Preise, Warenkorb und Checkout](../../masterclass/b2b-commerce/preise-warenkorb-checkout/). Dasselbe gilt für KI-erstellte Händlerangebote, siehe [KI-Angebote für Händler mit dem Partner Sales Assistant](../ki-angebote-haendler-partner-sales-assistant/).

## Ein typisches Szenario, als Annahme

Ein Hersteller von Förderanlagen verkauft Maschinen über den Direktvertrieb und Ersatzteile über 200 Händler. SAP hält Listenpreise je Land, Händlerrabatte je Materialgruppe und Kundenpreise für 30 Großkunden. Maschinenangebote haben 20 bis 80 Positionen und werden in der Konfiguration oft neu berechnet. Händler bestellen Ersatzteile außerdem per EDI.

Ich würde nach Preisart trennen. Für Maschinen Weg C: Listenpreise jede Nacht aus SAP, Rabatte und Freigaben in Revenue Cloud, und SAP übernimmt den Auftragspreis als festen Preis. Für Ersatzteile Weg A: Händlerrabatte und Großkundenpreise bleiben in SAP, weil sie auch für EDI-Aufträge gelten, und Salesforce fragt SAP nach dem Nettopreis, wenn das Angebot vor dem Versand geprüft wird. Ein führendes System je Preisart, festgehalten in der [Object Ownership Matrix](../object-ownership-matrix-salesforce/).

## Wo fangen Sie an?

Listen Sie Ihre Preisarten auf: Listenpreis, Händlerrabatt, Kundenpreis, Vertragspreis, Aktion, Frachtzuschlag. Notieren Sie für jede, wo sie heute gepflegt wird, wer sie ändert, wie oft, und ob sie auch für Aufträge gilt, die nicht aus Salesforce kommen. Die letzte Frage entscheidet meistens: Preise, die für EDI-, Telefon- oder Shop-Aufträge ohne Salesforce gelten, bleiben in SAP. Die Aufteilung von Quote-to-Cash zwischen den Systemen behandelt [Revenue Cloud und SAP: Wer führt was?](../revenue-cloud-sap-quote-to-cash-aufteilung/), den Zusammenhang das Kapitel [Katalog, Konfigurator, Preise](../../masterclass/revenue-cloud/produktkatalog-konfigurator-preise/) der Masterclass Revenue Cloud. Die Schnittstelle selbst zu entwerfen, gehört zu meiner Arbeit an [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Legen Sie je Preisart fest, welches System rechnet, und lassen Sie das andere fragen. Wenn Sie Ihre Entscheidung zum führenden Preissystem besprechen möchten, [schreiben Sie mir](#contact).
