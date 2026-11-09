---
title: "Händlerbestand und Nachschub mit Agentforce"
description: "Kann Agentforce Händlerbestände prüfen und Nachschub auslösen? Was die Fertigungsvorlagen können und warum ATP, Preise und Kreditlimit im ERP bleiben."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: haendlerbestand-nachschub-agentforce
translationKey: distributor-replenishment-agent
topic: data
categories: [manufacturing-cloud, ai]
tags: [Agentforce, Manufacturing Cloud, Händler, Lagerbestand, SAP, ERP]
takeaways:
  - "Der Inventory-Subagent sucht Bestände und legt Product Requests an. Händlerbestellungen sind eine eigene Summer-'26-Funktion mit eigenem Ablauf."
  - "Keine Standardaktion macht aus einem Product Request eine Bestellung oder einen ERP-Auftrag. Diese Brücke ist Ihr Integrationsprojekt."
  - "Vier Sperren setzt Code, nicht das Modell, und die schreibende API prüft sie erneut: Kreditstatus, Mengengrenze, Händlerfreigabe, Dublettenprüfung."
  - "Ich starte mit reinem Lesezugriff und lasse den Agenten erst Aufträge anlegen, wenn der Simulationsaufruf ins ERP getestet ist."
faq:
  - q: "Kann Agentforce Nachschubaufträge für Händler automatisch auslösen?"
    a: "Nicht von Haus aus. Der dokumentierte Inventory-Subagent legt Product Requests an, keine Bestellungen. Seit Summer '26 beschreibt Salesforce einen eigenen Ablauf für Händlerbestellungen mit Freigabe und Übergabe ans ERP. Beides zu verbinden ist individuelle Arbeit. Ich würde den Agenten Aufträge vorschlagen und vorbereiten lassen; annehmen sollte sie das ERP nach Prüfung von Verfügbarkeit, Preis und Kredit."
  - q: "Welche Daten müssen in SAP oder proALPHA bleiben?"
    a: "Das ist eine Architekturentscheidung, keine Produktvorgabe. Ich würde Verfügbarkeitsprüfung (ATP) und bestätigte Termine, Kundenkonditionen, Kreditlimits und Sperren, Kundenauftrag und Rechnung im ERP lassen. Salesforce kann Händlerbestände, Min/Max-Regeln, den Nachschubvorschlag und mit dem Summer-'26-Ablauf auch die Händlerbestellung halten."
  - q: "Wie aktuell ist der Bestand, den der Agent sieht?"
    a: "Kommt der Bestand aus einem externen System, nur so aktuell wie die letzte erfolgreiche Übertragung. Der Agent sollte dieses Datum nennen und den Händler die Mengen vor der Bestellung bestätigen lassen. Buchen Händler Wareneingänge direkt in Salesforce, kann Salesforce das operative Bestandsregister führen."
  - q: "Brauche ich Manufacturing Cloud für einen Bestandsagenten?"
    a: "Die Salesforce-Hilfe nennt den Inventory-Subagenten für Enterprise, Performance und Unlimited Edition mit dem Add-on Agentforce for Manufacturing je Benutzer oder für die Agentforce 1 Manufacturing Edition. Bestandsdatenmodell und Nachschubregeln gibt es nicht nur in Manufacturing Cloud, den vorgefertigten Subagenten schon. Die aktuelle Preisseite stellt die Max-Editionen mit der Suite Agentforce for Industries dar, lassen Sie sich die genaue Berechtigung im Angebot bestätigen."
draft: false
---

Agentforce kann Händlerbestände prüfen und Nachschub vorbereiten, sollte aber nicht entscheiden, ob die Ware verfügbar ist, zu welchem Preis sie geliefert wird und ob das Kreditlimit des Händlers den Auftrag erlaubt. Der Inventory-Subagent von Agentforce for Manufacturing sucht Bestände und legt Product Requests an, und seit Summer '26 gibt es einen eigenen Ablauf für Händlerbestellungen. In meiner Zielarchitektur bleiben Verfügbarkeit, Kundenkonditionen, Kreditlimit und Kundenauftrag in SAP oder proALPHA. Der Agent schlägt vor und bereitet vor, das ERP bestätigt. Ich würde mit reinem Lesezugriff beginnen und schreibende Aktionen nur hinter Sperren freigeben, die Code setzt, nie das Modell.

## Was bietet Agentforce for Manufacturing für Händlerbestände?

Als Salesforce am 21. August 2025 [Agentforce for Manufacturing ankündigte](https://www.salesforce.com/news/stories/agentforce-for-manufacturing-announcement/), beschrieb es die Inventory-Management-Vorlage in zwei Sätzen: Mitarbeitende können "quickly search for inventory", und "Agentforce can also automatically request inventory to be replenished across distributor locations based on customer needs." Die Inventory-Vorlage galt ab diesem Tag als verfügbar; laut Ankündigung baut Agentforce for Manufacturing auf Data Cloud (heute Data 360) und der Atlas Reasoning Engine auf und bringt Agenten in Manufacturing Cloud, die die Salesforce-Hilfe inzwischen Agentforce Manufacturing nennt, und Field Service. Die [Trailhead-Einheit zu Agentforce Manufacturing](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) formuliert vorsichtiger und spricht von "replenishment recommendations", also Nachschubempfehlungen.

Die Salesforce-Hilfe zum [Inventory-Management-Subagenten](https://help.salesforce.com/s/articleView?language=en_US&id=ind.mfg_gen_ai_agentforce_inventory_management_topic.htm&type=5) nennt drei Aktionen: Get Search Criteria and Results, Create Product Request und Summarize Inventory Details. Sie verlangt das Add-on Agentforce for Manufacturing für jeden Benutzer oder die Agentforce 1 Manufacturing Edition. Zu Eingaben und Ausgaben sagen die öffentlichen Seiten wenig, das genaue Verhalten prüfen Sie also besser in einer Sandbox.

Mit Summer '26 hat Salesforce die Verwaltung von Händlerbestellungen eingeführt, und die Hilfe beschreibt den [Ablauf](https://help.salesforce.com/s/articleView?id=ind.mfg_distributor_purchase_order_management_workflow.htm&language=de&type=5): Der Händler legt in einer Partner-Site auf Experience Cloud eine Bestellung an und reicht sie ein, die Stückpreise kommen aus dem gewählten aktiven Preisbuch, ein Vertriebsleiter prüft die Mengen anhand der Wertgrenzen und des verfügbaren Bestands und gibt die Bestellung frei, und die Freigabe startet die Integration, die Kundenauftrag und Rechnung im ERP erzeugt. Bei Lieferung erfasst ein Wareneingangsbeleg die Mengen, und "Update Inventory" erhöht den Bestand am Lagerort. Dafür braucht es die Bestellverwaltung, Account-Beziehungen und passende Partnerberechtigungen, es ist also Konfigurationsarbeit und kein Schalter. Der Entwicklerleitfaden zu Manufacturing Cloud dokumentiert ein Objekt [PurchaseOrder](https://developer.salesforce.com/docs/atlas.en-us.264.0.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_purchaseorder.htm) mit dem Nutzungstyp `DistributorManagement` und ein Objekt [GoodsReceivedNote](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_goodsreceivednote.htm), das den Wareneingang zu einer Bestellung bestätigt, beide ab API-Version 65.0. Wichtig ist, was beide Funktionen nicht tun: Der Inventory-Subagent hat keine Aktion, die eine Bestellung anlegt, und Salesforce dokumentiert keine Standardumwandlung von Product Request zu Bestellung.

```hinweis offen
Salesforce schreibt auf der eigenen [Seite zu KI in der Fertigung](https://www.salesforce.com/manufacturing/artificial-intelligence/) selbst, dass die vorgefertigten Funktionen "may not reflect actual product details". Ich würde den Partner deshalb bitten, die Vorlage in Ihrer Sandbox mit Ihren Daten zu zeigen, bevor jemand damit plant.
```

## Händlerbestand und Nachschubregeln liegen in Salesforce

Manufacturing Cloud nutzt die Bestandsobjekte aus Field Service. Ein [ProductItem](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_productitem.htm) ist ein Produkt an einem Standort, mit Mengen für Bestand, verfügbar, reserviert, beim Lieferanten bestellt und unterwegs. Ein Händlerlager kann ein solcher Standort sein.

Die Nachschubregeln liegen in [InventoryReplenishmentPolicy](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_inventoryreplenishmentpolicy.htm), verfügbar ab API-Version 63.0. Eine Regel enthält Mindest- und Höchstmenge für ein Produkt oder eine Produktkategorie an einem Standort, einen Quellstandort und eine Formel für die Menge; das dokumentierte Beispiel ist Höchstmenge minus Bestand. Die Standardaktion ist ein Product Request. Laut [Hilfeartikel zum Inventory Replenishment](https://help.salesforce.com/s/articleView?id=ind.mfg_inventory_replenishment.htm&language=en_US&type=5) läuft ein automatischer Prozess periodisch, findet Artikel unter ihrer Schwelle und führt die Nachschubaktion aus.

Für Entscheider folgen daraus zwei Punkte:

- **Ein Product Request ist ein Datensatz in Salesforce.** Er reserviert keinen Bestand in SAP und erzeugt weder Kundenauftrag noch Bestellung. Irgendetwas muss daraus einen Auftrag machen, und diese Schnittstelle ist Ihr Projekt, kein Teil der Vorlage. Sollen Händler stattdessen selbst in einem B2B-Shop nachbestellen, siehe [Nachbestellen im B2B-Shop](../nachbestellen-b2b-shop-vorlagen/).
- **Extern gemeldeter Bestand ist eine Kopie.** Melden Händler ihren Bestand wöchentlich per Portal-Upload, EDI oder Schnittstelle, arbeitet der Agent mit Zahlen, die bis zu sieben Tage alt sind, und muss das sagen, zusammen mit dem Status der letzten erfolgreichen Übertragung. Buchen Händler Wareneingänge in Salesforce, kann Salesforce stattdessen das operative Bestandsregister führen.

## Wo muss SAP oder proALPHA führendes System bleiben?

Überall dort, wo eine Zahl genau eine richtige Antwort hat, die das ERP berechnet. Das ist eine Architekturentscheidung, keine Salesforce-Vorgabe. Für einen Maschinenbauer mit Händlervertrieb würde ich so trennen:

| Daten | Führendes System | Was der Agent tut |
|---|---|---|
| Gemeldeter Händlerbestand | Salesforce | liest und fasst zusammen |
| Min/Max pro Händlerstandort | Salesforce, Verantwortung Vertriebsinnendienst | schlägt eine Menge vor |
| Verfügbarkeit und bestätigter Termin (ATP) | SAP oder proALPHA | gibt weiter, was das ERP liefert |
| Kundenpreise, Rabatte, Zuschläge | SAP oder proALPHA | zeigt den ERP-Preis; einen Preisbuchpreis nur, wo er der vereinbarte Preis ist |
| Kreditlimit und Sperren | SAP oder proALPHA | stoppt und übergibt |
| Nachschubvorschlag (Product Request) | Salesforce | bereitet ihn vor |
| Händlerbestellung | Salesforce oder ERP, je nach Zielbild | bereitet sie zur Freigabe vor |
| Kundenauftrag und Rechnung | SAP oder proALPHA | meldet die ERP-Auftragsnummer |

Die lesende Seite, also wie ein Agent den Auftragsstatus über MuleSoft aus SAP holt, beschreibe ich in [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/). Nachschub ergänzt die schreibende Richtung. Die API braucht deshalb einen Simulationsaufruf, der Preis, Verfügbarkeit und Kreditstatus zurückgibt, ohne etwas anzulegen, und einen getrennten Aufruf zum Anlegen. Hat Ihr ERP keine solche Schnittstelle, lesen Sie zuerst [altes ERP ohne API](../altes-erp-ohne-api-ki-agenten/).

Wem welche Zeile gehört, ist genauso eine Governance-Frage wie eine technische. Pflegt der Vertriebsinnendienst Min/Max in Salesforce und die Logistik Sicherheitsbestände in SAP, müssen beide festlegen, was gilt. Das ist dieselbe Disziplin wie bei der [Object Ownership Matrix](../object-ownership-matrix-salesforce/).

## Schreibende Aktionen brauchen Sperren in Code

Der Leitfaden der Salesforce Architects zu [Hybrid Reasoning mit Agent Script](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) gibt die Regel vor: "if you can express a decision as code, it should be written as logic." Eine Aktion, deren `available when`-Bedingung falsch ist, verschwindet aus der Werkzeugliste des Modells. Der Leitfaden warnt auch: Wer das LLM die Sperrvariable setzen lässt, holt sich genau die Schwankung zurück, die die Sperre verhindern soll.

Für einen Nachschubauftrag würde ich vier Sperren in Code setzen:

1. **Kreditstatus aus dem ERP.** Der Simulationsaufruf setzt eine Variable; bei einer Sperre sieht das Modell die Aktion zum Anlegen gar nicht. Das stoppt nur diesen Agenten: Die API zum Anlegen prüft den Kredit beim Buchen erneut.
2. **Eine Mengengrenze.** Aufträge, die zum Beispiel die Höchstmenge der Regel oder eine Wertgrenze überschreiten, gehen zur Freigabe an den Vertriebsinnendienst statt direkt ins ERP.
3. **Bestätigung durch den Händler.** Der Agent zeigt Positionen, ERP-Preise und bestätigte Termine, und der Händler gibt ausdrücklich frei.
4. **Eine Dublettenprüfung.** Zeitüberschreitungen, wiederholte Eingaben oder Middleware können dieselbe Anfrage zweimal senden. Jeder Vorschlag trägt eine eindeutige Referenz, und die ERP-Schnittstelle lehnt einen zweiten Auftrag mit derselben Referenz ab.

Wie diese Bausteine funktionieren, steht in [Agent Script: Geschäftsregeln gehören nicht ins LLM](../agent-script-regeln-statt-llm/). Was Simulations- und Anlageaufrufe an Verbrauch kosten, rechne ich in [Flex Credits pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/) vor.

## Rechenbeispiel: Nachschub für 120 Händler

Nehmen wir einen Hersteller von Druckluftkomponenten mit SAP S/4HANA, 120 Händlern in Deutschland, Österreich und den Benelux-Ländern und einem Händlerportal auf Experience Cloud. Alle Zahlen in diesem Beispiel sind Annahmen.

Angenommen, jeder Händler lädt montags den Bestand für 300 Schnelldreher unter den Ersatzteilen hoch. Mit einer Min/Max-Regel pro Teil und Händlerstandort sind das in der feinsten Variante 36.000 Regeln; Regeln pro Produktkategorie oder für mehrere Standorte senken die Zahl. Die pflegt niemand von Hand. Die Mindestmenge sollte deshalb aus dem Verbrauch oder aus der [Absatzprognose mit Account Forecasting](../account-forecasting-absatzprognose-vertrieb/) kommen, und der Vertriebsinnendienst pflegt nur die Ausnahmen.

In der Nacht auf Dienstag findet der periodische Prozess bei einem Händler 40 Teile unter Mindestmenge und legt Product Requests an. Am Dienstag öffnet der Händler das Portal. Der Agent fasst den Vorschlag zusammen, sagt dazu, dass die Bestände vom Montag stammen, und fragt, ob die Mengen noch stimmen. Der Händler streicht zwei Positionen. Dann ruft der Agent die SAP-Simulation auf. Die Preise kommen aus SAP, weil in diesem Beispiel SAP die Kundenkonditionen führt. Drei Positionen haben noch keinen bestätigten Termin, und genau das sagt der Agent. Der Händler bestätigt, der Anlageaufruf liefert eine SAP-Auftragsnummer, und der Agent meldet sie.

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

## Führendes System pro Datenzeile festlegen

1. **Führendes System festlegen** für jede Zeile der Tabelle oben, freigegeben von Vertrieb und Supply Chain.
2. **Händlerbestände verlässlich einspielen.** Rhythmus und Format vereinbaren und das Meldedatum überall anzeigen, wo der Bestand erscheint.
3. **Zuerst lesend arbeiten.** Bestandsübersichten und Nachschubvorschläge, Aufträge laufen weiter auf dem gewohnten Weg.
4. **Den ERP-Simulationsaufruf vor dem Anlageaufruf bauen** und die unangenehmen Fälle testen: Kreditsperre, fehlender bestätigter Termin, geänderte Preise, SAP nicht erreichbar.
5. **Die vier Sperren und eine Freigabegrenze einbauen**, erst dann legt der Agent Aufträge an.
6. **Lizenzen früh klären.** Auf der [EU-Preisseite von Manufacturing Cloud](https://www.salesforce.com/eu/manufacturing/cloud/) nennen die Core-Editionen (Listenpreis 275 € pro Nutzer und Monat bei jährlicher Abrechnung, Stand 9. November 2026) Flex Credits für KI, Agentforce und Daten, die Max-Editionen (ab 650 €) enthalten die Suite Agentforce for Industries. Die Hilfeseite des Inventory-Subagenten nennt weiter das Add-on Agentforce for Manufacturing oder die Agentforce 1 Manufacturing Edition, lassen Sie sich die Berechtigung also im Angebot bestätigen. Lassen Sie sich den Summer-'26-Ablauf für Händlerbestellungen vom Partner in Ihrer Sandbox zeigen.

Den größeren Teil der Arbeit macht das Schnittstellendesign zwischen Salesforce und ERP aus, also das, was ich unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/) anbiete. Das Gesamtbild der Agenten in der Fertigung finden Sie im Masterclass-Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/).
