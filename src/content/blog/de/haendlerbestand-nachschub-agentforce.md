---
title: "Händlerbestand und Nachschub mit Agentforce"
description: "Kann Agentforce Händlerbestände prüfen und Nachschub auslösen? Was die Fertigungsvorlagen können und warum ATP, Preise und Kreditlimit im ERP bleiben."
pubDate: 2026-10-27
lang: de
slug: haendlerbestand-nachschub-agentforce
translationKey: distributor-replenishment-agent
topic: data
categories: [manufacturing-cloud, ai]
tags: [Agentforce, Manufacturing Cloud, Händler, Lagerbestand, SAP, ERP]
takeaways:
  - "Die Inventory-Vorlage kam im August 2025, die Automatisierung der Distributor-Beschaffung steht für Summer '26 auf der Produktseite."
  - "Eine Nachschubanforderung ist zunächst ein Product Request in Salesforce. Verbindlich wird sie erst mit der Auftragsnummer aus dem ERP."
  - "Vier Sperren setzt Code, nicht das Modell: Kreditstatus aus dem ERP, Mengengrenze, Freigabe durch den Händler und Dublettenprüfung."
  - "Ich starte lesend und lasse den Agenten erst Aufträge anlegen, wenn der Simulationsaufruf ins ERP getestet ist."
faq:
  - q: "Kann Agentforce Nachschubaufträge für Händler automatisch auslösen?"
    a: "Technisch ja: Die Inventory-Vorlage für die Fertigung enthält eine Aktion, die einen Product Request anlegt, und Salesforce führt für Summer '26 die Automatisierung der Distributor-Beschaffung. Ich würde den Agenten Aufträge vorschlagen und vorbereiten lassen; annehmen sollte sie das ERP nach Prüfung von Verfügbarkeit, Preis und Kredit."
  - q: "Welche Daten müssen in SAP oder proALPHA bleiben?"
    a: "Verfügbarkeitsprüfung (ATP) und bestätigte Termine, Preise und Konditionen, Kreditlimits und Sperren sowie der Kundenauftrag selbst. Salesforce kann gemeldete Händlerbestände, Min/Max-Regeln und den Nachschubvorschlag halten."
  - q: "Wie aktuell ist der Bestand, den der Agent sieht?"
    a: "So aktuell wie die letzte Meldung. Händlerbestände kommen meist per Portal-Upload, EDI oder Schnittstelle nach Salesforce. Der Agent sollte das Datum der letzten Meldung nennen und den Händler die Mengen vor der Bestellung bestätigen lassen."
  - q: "Brauche ich Manufacturing Cloud für einen Bestandsagenten?"
    a: "Die Salesforce-Hilfe nennt den Inventory-Subagenten für Enterprise, Performance und Unlimited Edition mit dem Add-on Agentforce for Manufacturing je Benutzer oder für die Agentforce 1 Manufacturing Edition. Die Bestandsobjekte gehören zu Manufacturing Cloud. Die Max-Editionen enthalten die volle Suite von Agentforce for Industries, die Core-Editionen enthalten Flex Credits."
draft: false
---

Agentforce kann Händlerbestände prüfen und Nachschub auslösen, sollte aber nicht entscheiden, ob die Ware verfügbar ist, zu welchem Preis sie geliefert wird und ob das Kreditlimit des Händlers den Auftrag erlaubt. Die Inventory-Vorlage von Agentforce for Manufacturing sucht Bestände und legt Nachschubanforderungen an, und Salesforce führt für Summer '26 die Automatisierung der Distributor-Beschaffung. Verfügbarkeit, Preise, Kreditlimit und der Auftrag selbst bleiben in SAP oder proALPHA. Der Agent schlägt vor und bereitet vor, das ERP bestätigt. Ich würde lesend starten und schreibende Aktionen nur hinter Sperren freigeben, die Code setzt, nie das Modell.

## Was bietet Agentforce for Manufacturing für Händlerbestände?

Als Salesforce am 21. August 2025 [Agentforce for Manufacturing ankündigte](https://www.salesforce.com/news/stories/agentforce-for-manufacturing-announcement/), beschrieb es die Inventory-Management-Vorlage in zwei Sätzen: Mitarbeitende können "quickly search for inventory", und "Agentforce can also automatically request inventory to be replenished across distributor locations based on customer needs." Die Inventory-Vorlage galt ab diesem Tag als verfügbar; laut Ankündigung baut Agentforce for Manufacturing auf Data Cloud und der Atlas Reasoning Engine auf und bringt Agenten in Manufacturing Cloud und Field Service. Die [Trailhead-Einheit zu Agentforce Manufacturing](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) formuliert vorsichtiger und spricht von "replenishment recommendations", also Nachschubempfehlungen.

Die Salesforce-Hilfe zum [Inventory-Management-Subagenten](https://help.salesforce.com/s/articleView?language=en_US&id=ind.mfg_gen_ai_agentforce_inventory_management_topic.htm&type=5) nennt drei Aktionen: Get Search Criteria and Results, Create Product Request und Summarize Inventory Details. Sie verlangt das Add-on Agentforce for Manufacturing für jeden Benutzer oder die Agentforce 1 Manufacturing Edition. Zu Eingaben und Ausgaben sagen die öffentlichen Seiten wenig, das genaue Verhalten prüfen Sie also besser in einer Sandbox.

Für Summer '26 verspricht die [Produktseite von Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/), "distributor procurement" zu automatisieren, um manuellen Aufwand und Kosten zu senken. Der Entwicklerleitfaden zu Manufacturing Cloud dokumentiert ein Objekt [PurchaseOrder](https://developer.salesforce.com/docs/atlas.en-us.264.0.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_purchaseorder.htm) mit dem Nutzungstyp `DistributorManagement` und ein Objekt [GoodsReceivedNote](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_goodsreceivednote.htm), das den Wareneingang zu einer Bestellung bestätigt, beide ab API-Version 65.0. Ich lese das so, dass dies das Datenmodell hinter dem Satz auf der Produktseite ist. Salesforce verbindet beides aber nicht ausdrücklich, und eine Hilfeseite, die die Distributor-Beschaffung beschreibt, habe ich nicht gefunden.

```hinweis offen
Salesforce schreibt auf der eigenen [Seite zu KI in der Fertigung](https://www.salesforce.com/manufacturing/artificial-intelligence/) selbst, dass die vorgefertigten Funktionen "may not reflect actual product details". Ich würde den Partner deshalb bitten, die Vorlage in Ihrer Sandbox mit Ihren Daten zu zeigen, bevor jemand damit plant.
```

## Händlerbestand und Nachschubregeln liegen in Salesforce

Manufacturing Cloud nutzt die Bestandsobjekte aus Field Service. Ein [ProductItem](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_productitem.htm) ist ein Produkt an einem Standort, mit Mengen für Bestand, verfügbar, reserviert, beim Lieferanten bestellt und unterwegs. Ein Händlerlager kann ein solcher Standort sein.

Die Nachschubregeln liegen in [InventoryReplenishmentPolicy](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_inventoryreplenishmentpolicy.htm), verfügbar ab API-Version 63.0. Eine Regel enthält Mindest- und Höchstmenge für ein Produkt oder eine Produktkategorie an einem Standort, einen Lieferstandort und eine Formel für die Menge; das dokumentierte Beispiel ist Höchstmenge minus Bestand. Die Standardaktion ist ein Product Request. Laut [Hilfeartikel zum Inventory Replenishment](https://help.salesforce.com/s/articleView?id=ind.mfg_inventory_replenishment.htm&language=en_US&type=5) läuft ein automatischer Prozess periodisch, findet Artikel unter ihrer Schwelle und führt die Nachschubaktion aus.

Für Entscheider folgen daraus zwei Punkte:

- **Ein Product Request ist ein Datensatz in Salesforce.** Er reserviert keinen Bestand in SAP und erzeugt keinen Kundenauftrag. Irgendetwas muss daraus einen ERP-Auftrag machen, und diese Schnittstelle ist Ihr Projekt, kein Teil der Vorlage. Sollen Händler stattdessen selbst in einem B2B-Shop nachbestellen, siehe [Nachbestellen im B2B-Shop](../nachbestellen-b2b-shop-vorlagen/).
- **Der Bestand ist eine Kopie.** Händler melden ihren Bestand per Portal-Upload, EDI oder Schnittstelle. Melden sie wöchentlich, arbeitet der Agent mit Zahlen, die bis zu sieben Tage alt sind, und muss das sagen.

## Wo muss SAP oder proALPHA führendes System bleiben?

Überall dort, wo eine Zahl genau eine richtige Antwort hat, die das ERP berechnet. Für einen Maschinenbauer mit Händlervertrieb würde ich so trennen:

| Daten | Führendes System | Was der Agent tut |
|---|---|---|
| Gemeldeter Händlerbestand | Salesforce | liest und fasst zusammen |
| Min/Max pro Händlerstandort | Salesforce, Verantwortung Vertriebsinnendienst | schlägt eine Menge vor |
| Verfügbarkeit und bestätigter Termin (ATP) | SAP oder proALPHA | gibt weiter, was das ERP liefert |
| Preise, Rabatte, Zuschläge | SAP oder proALPHA | zeigt den ERP-Preis, nie einen Portal-Listenpreis |
| Kreditlimit und Sperren | SAP oder proALPHA | stoppt und übergibt |
| Der Auftrag selbst | SAP oder proALPHA | meldet die ERP-Auftragsnummer |

Die lesende Seite, also wie ein Agent den Auftragsstatus über MuleSoft aus SAP holt, beschreibe ich in [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/). Nachschub ergänzt die schreibende Richtung. Die API braucht deshalb einen Simulationsaufruf, der Preis, Verfügbarkeit und Kreditstatus zurückgibt, ohne etwas anzulegen, und einen getrennten Aufruf zum Anlegen. Hat Ihr ERP keine solche Schnittstelle, lesen Sie zuerst [altes ERP ohne API](../altes-erp-ohne-api-ki-agenten/).

Wem welche Zeile gehört, ist genauso eine Governance-Frage wie eine technische. Pflegt der Vertriebsinnendienst Min/Max in Salesforce und die Logistik Sicherheitsbestände in SAP, müssen beide festlegen, was gilt. Das ist dieselbe Disziplin wie bei der [Object Ownership Matrix](../object-ownership-matrix-salesforce/).

## Schreibende Aktionen brauchen Sperren in Code

Der Leitfaden der Salesforce Architects zu [Hybrid Reasoning mit Agent Script](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) gibt die Regel vor: "if you can express a decision as code, it should be written as logic." Eine Aktion, deren `available when`-Bedingung falsch ist, verschwindet aus der Werkzeugliste des Modells. Der Leitfaden warnt auch: Wer das LLM die Sperrvariable setzen lässt, holt sich genau die Schwankung zurück, die die Sperre verhindern soll.

Für einen Nachschubauftrag würde ich vier Sperren in Code setzen:

1. **Kreditstatus aus dem ERP.** Der Simulationsaufruf setzt eine Variable; bei einer Sperre sieht das Modell die Aktion zum Anlegen gar nicht.
2. **Eine Mengengrenze.** Aufträge, die zum Beispiel die Höchstmenge der Regel oder eine Wertgrenze überschreiten, gehen zur Freigabe an den Vertriebsinnendienst statt direkt ins ERP.
3. **Bestätigung durch den Händler.** Der Agent zeigt Positionen, ERP-Preise und bestätigte Termine, und der Händler gibt ausdrücklich frei.
4. **Eine Dublettenprüfung.** Agenten wiederholen Aufrufe. Jeder Vorschlag trägt eine eindeutige Referenz, und die ERP-Schnittstelle lehnt einen zweiten Auftrag mit derselben Referenz ab.

Wie diese Bausteine funktionieren, steht in [Agent Script: Geschäftsregeln gehören nicht ins LLM](../agent-script-regeln-statt-llm/). Was Simulations- und Anlageaufrufe an Verbrauch kosten, rechne ich in [Flex Credits pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/) vor.

## Rechenbeispiel: Nachschub für 120 Händler

Nehmen wir einen Hersteller von Druckluftkomponenten mit SAP S/4HANA, 120 Händlern in Deutschland, Österreich und den Benelux-Ländern und einem Händlerportal auf Experience Cloud. Alle Zahlen in diesem Beispiel sind Annahmen.

Angenommen, jeder Händler lädt montags den Bestand für 300 Schnelldreher unter den Ersatzteilen hoch. Mit einer Min/Max-Regel pro Teil und Händlerstandort sind das 36.000 Regeln. Die pflegt niemand von Hand. Die Mindestmenge sollte deshalb aus dem Verbrauch oder aus der [Absatzprognose mit Account Forecasting](../account-forecasting-absatzprognose-vertrieb/) kommen, und der Vertriebsinnendienst pflegt nur die Ausnahmen.

In der Nacht auf Dienstag findet der periodische Prozess bei einem Händler 40 Teile unter Mindestmenge und legt Product Requests an. Am Dienstag öffnet der Händler das Portal. Der Agent fasst den Vorschlag zusammen, sagt dazu, dass die Bestände vom Montag stammen, und fragt, ob die Mengen noch stimmen. Der Händler streicht zwei Positionen. Dann ruft der Agent die SAP-Simulation auf. Die Preise kommen aus SAP, nicht aus der Portal-Preisliste. Drei Positionen haben noch keinen bestätigten Termin, und genau das sagt der Agent. Der Händler bestätigt, der Anlageaufruf liefert eine SAP-Auftragsnummer, und der Agent meldet sie.

```ablauf
sf: Händlerbestand, Product Request, Agent im Portal
erp: SAP-Simulation, SAP-Auftrag
ext: Kreditmanagement
Händlerbestand --unter Mindestmenge--> Product Request
Product Request --> Agent im Portal
Agent im Portal --> SAP-Simulation
SAP-Simulation ..Preis und Termin..> Agent im Portal
Agent im Portal --nach Freigabe--> SAP-Auftrag
SAP-Auftrag ..Auftragsnummer..> Agent im Portal
Agent im Portal --bei Kreditsperre--> Kreditmanagement
```

Nehmen wir nun an, derselbe Händler liegt über seinem Kreditlimit. Die Simulation meldet eine Sperre, die Aktion zum Anlegen bleibt verborgen, und der Agent übergibt das Gespräch mit dem Vorschlag an das Kreditmanagement. Die Kreditlage erklärt er nicht selbst; was ein Händler über eine Sperre erfährt, ist eine fachliche Entscheidung und gehört in die Antwort der API.

In so einem Piloten würde ich vor allem Datenthemen erwarten, keine KI-Themen: Händler, die nicht pünktlich melden, Teile mit falscher Materialnummer und Min/Max-Werte, die seit Jahren niemand angesehen hat. Upload-Dateien sind außerdem nicht vertrauenswürdige Eingaben, ein Risiko, das ich in [Prompt Injection über Händlerportale](../prompt-injection-haendlerportal-agentforce/) beschreibe.

## Erster Schritt: führendes System pro Datenzeile festlegen

1. **Führendes System festlegen** für jede Zeile der Tabelle oben, abgestimmt zwischen Vertrieb und Logistik.
2. **Händlerbestände verlässlich einspielen.** Rhythmus und Format vereinbaren und das Meldedatum überall anzeigen, wo der Bestand erscheint.
3. **Zuerst lesend arbeiten.** Bestandsübersichten und Nachschubvorschläge, Aufträge laufen weiter auf dem gewohnten Weg.
4. **Den ERP-Simulationsaufruf vor dem Anlageaufruf bauen** und die unangenehmen Fälle testen: Kreditsperre, fehlender bestätigter Termin, geänderte Preise, SAP nicht erreichbar.
5. **Die vier Sperren und eine Freigabegrenze einbauen**, erst dann legt der Agent Aufträge an.
6. **Lizenzen früh klären.** Auf der [EU-Preisseite von Manufacturing Cloud](https://www.salesforce.com/eu/manufacturing/cloud/) nennen die Core-Editionen (Listenpreis 275 € pro Nutzer und Monat) Flex Credits für KI, Agentforce und Daten, die Max-Editionen (650 €) enthalten die volle Suite von Agentforce for Industries. Lassen Sie sich die Summer-'26-Funktionen zur Distributor-Beschaffung vom Partner in Ihrer Sandbox zeigen.

Den größeren Teil der Arbeit macht das Schnittstellendesign zwischen Salesforce und ERP aus, also das, was ich unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/) anbiete. Das Gesamtbild der Agenten in der Fertigung finden Sie im Masterclass-Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/).
