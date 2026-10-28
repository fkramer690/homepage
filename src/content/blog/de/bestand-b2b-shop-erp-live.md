---
title: "Bestand im B2B-Shop: live aus dem ERP oder kopiert?"
description: "Soll ein B2B-Shop auf Salesforce Bestand aus SAP kopieren oder live abfragen? Omnichannel Inventory, die Inventory-Extension und was Händler sehen sollten."
pubDate: 2026-10-28
lang: de
slug: bestand-b2b-shop-erp-live
translationKey: commerce-stock-availability-erp
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: integration
tags: [B2B Commerce, Bestand, SAP, Verfügbarkeitsprüfung, Omnichannel Inventory, ERP-Anbindung]
takeaways:
  - "Standardmäßig liest Salesforce B2B Commerce den Bestand aus Omnichannel Inventory; die Extension Commerce_Domain_Inventory_Service ersetzt das durch eigene Logik, etwa eine Live-Abfrage im ERP."
  - "Omnichannel Inventory hält eine nahezu aktuelle Kopie pro Lagerort und Lagerortgruppe, ersetzt laut Salesforce aber nicht das führende Bestandssystem. Das ERP bleibt Master."
  - "Eine Kopie ist schnell und hält den Shop am Laufen, wenn SAP steht; eine Live-Verfügbarkeitsprüfung ist genau und liefert einen bestätigten Termin, aber SAP muss im Checkout antworten."
  - "Händler brauchen ein brauchbares Signal statt einer exakten Menge: lieferbar, auf Anfrage oder ein bestätigter Termin. Das schützt Bestände auch vor Wettbewerbern und Wiederverkäufern."
  - "Beide B2B-Editionen nennen auf der Preisseite 20 Lagerorte; Unified Omnichannel Inventory aus Winter '27 ist für Filial- und Onlinebestand beschrieben, prüfen Sie die Eignung für B2B."
faq:
  - q: "Woher bekommt Salesforce B2B Commerce die Bestandsdaten?"
    a: "Standardmäßig aus Omnichannel Inventory, einem Salesforce-Dienst, der Verfügbarkeit pro Lagerort und Lagerortgruppe hält. Mit der Inventory-Extension kann der Shop stattdessen eine andere Quelle fragen, zum Beispiel SAP live."
  - q: "Ist Omnichannel Inventory das führende System für den Bestand?"
    a: "Nein. Salesforce schreibt, dass Omnichannel Inventory das führende Bestandssystem, das ERP oder die Lagerverwaltung nicht ersetzt. Es hält eine Kopie, die das ERP über Import- oder Update-APIs aktuell halten muss."
  - q: "Sollte ein B2B-Shop exakte Bestandsmengen zeigen?"
    a: "Meist nicht. Händler müssen wissen, ob ein Teil sofort, auf Anfrage oder zu einem bestätigten Termin kommt. Exakte Mengen führen zu Rückfragen wegen reservierter Bestände und verraten Wettbewerbern mehr als nötig."
  - q: "Wie viele Lagerorte sind in B2B Commerce enthalten?"
    a: "Die Preisseite nennt für Growth und Advanced Edition jeweils 20 Lagerorte (Inventory Locations). Wenn Sie mehr Werke oder Lager planen, klären Sie vor Vertragsabschluss mit Salesforce, wie Lagerorte gezählt werden."
draft: false
---

Ein B2B-Shop auf Salesforce sollte beim Stöbern eine Kopie des Bestands zeigen und das ERP nur dort live fragen, wo ein Versprechen entsteht, im Checkout. Im Standard liest B2B Commerce den Bestand aus Omnichannel Inventory, einem Salesforce-Dienst, den SAP befüllen muss. Mit der Inventory-Extension kann der Shop stattdessen die Verfügbarkeitsprüfung in SAP aufrufen. Die liefert einen bestätigten Termin, kostet aber Wartezeit und Last. Händler brauchen selten exakte Mengen. Sie müssen wissen, ob ein Teil sofort, auf Anfrage oder zu einem bestätigten Termin kommt. SAP bleibt in jedem Fall führend für den Bestand.

## Woher bekommt der Shop den Bestand?

Salesforce B2B Commerce berechnet Bestand über zwei Extension Points, die in den [verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) stehen:

- **Commerce_Domain_Inventory_Service** reserviert und verfolgt verfügbaren Bestand. Die Dokumentation sagt: "By default, this extension uses the Omnichannel Inventory (OCI) system for inventory data."
- **Commerce_Domain_Inventory_CartCalculator** berechnet mit diesem Dienst den Bestand für Warenkorb und Checkout.

Es gibt also zwei Wege. Entweder befüllt SAP Omnichannel Inventory, und der Shop nutzt den Standard. Oder eine eigene Apex-Klasse ersetzt den Inventory-Dienst und fragt SAP oder eine Middleware direkt.

Zum Namen: Salesforce vermarktet B2B Commerce inzwischen auch als "Agentforce Commerce for B2B". An der Bestandslogik ändert das nichts.

## Was ist Omnichannel Inventory, und was nicht?

[Trailhead](https://trailhead.salesforce.com/content/learn/modules/omnichannel-inventory/get-started-with-omnichannel-inventory) beschreibt Omnichannel Inventory als Dienst mit "near real-time inventory availability at the location level". Er kennt Lagerorte (Locations) wie Lager und Werke und Lagerortgruppen (Location Groups), die mehrere Lagerorte zusammenfassen. Eine Lagerortgruppe kann einem Storefront zugeordnet werden. Reservierungen senken die verkaufbare Menge, sobald ein Käufer bestellt.

Dieselbe Seite sagt auch, was der Dienst nicht ist: Er "does not replace the inventory system of record" und ersetzt weder ERP noch Lagerverwaltung noch Supply-Chain-System. Für einen Hersteller heißt das: SAP führt den Bestand, Omnichannel Inventory hält eine Kopie.

Die Kopie kommt über APIs hinein. Laut der [Trailhead-Einheit zu den Omnichannel-Inventory-APIs](https://trailhead.salesforce.com/content/learn/modules/omnichannel-inventory/explore-omnichannel-inventory-apis) laden Sie für größere Mengen Bestandsdateien hoch und schicken aus einem externen System Echtzeit-Updates der Mengen. Lagerorte und Lagerortgruppen müssen vor dem ersten Import angelegt sein.

Die [B2B-Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) nennt für Growth und Advanced Edition jeweils 20 Inventory Locations. Für die meisten Ersatzteilgeschäfte reicht das. Ein Hersteller mit vielen Werken und Regionallagern sollte vor der Unterschrift klären, wie Salesforce Lagerorte zählt.

## Kopie oder live: welche Abwägung?

Es ist dieselbe Entscheidung wie bei den Preisen, nur mit anderen Zahlen. Für den Lenkungskreis bringe ich sie in eine Tabelle:

| | Kopie in Omnichannel Inventory | Live-Abfrage in SAP |
|---|---|---|
| Geschwindigkeit im Shop | Schnell, kein Aufruf in SAP | Jede Prüfung wartet auf SAP |
| Genauigkeit | So alt wie das letzte Update | Aktuell zum Zeitpunkt des Aufrufs |
| SAP nicht erreichbar | Shop zeigt weiter Bestand | Shop braucht eine Rückfallregel |
| Last auf SAP | Batch- und Delta-Updates | Ein Aufruf pro Produktliste, Warenkorb oder Checkout |
| Bestätigter Termin | Nein, nur Mengen | Ja, aus der Verfügbarkeitsprüfung |
| Bauaufwand | Kopie befüllen, Lagerorte abbilden | Inventory-Extension, Fehlerbehandlung |

Meist entscheidet die Zeile mit dem bestätigten Termin. Die Verfügbarkeitsprüfung in SAP, oft ATP (Available to Promise) genannt, liest mehr als eine Bestandszahl. Laut [SAP-Lernmaterial](https://learning.sap.com/courses/performing-the-availability-check/acquiring-a-basic-understanding-of-available-to-promise-atp-_ae470c8e-1483-46ce-b5cc-e80647e8a32b) berücksichtigt sie Bestand und, je nach Customizing, geplante Zugänge und bestehende Bedarfe. Lässt sich der Wunschtermin nicht halten, schlägt sie den nächstmöglichen Termin vor. Eine Kopie der Bestandszahl in Salesforce weiß davon nichts.

Deshalb würde ich ATP-Logik nicht in Salesforce nachbauen. Wer es versucht, pflegt am Ende eine zweite Verfügbarkeitsprüfung, die immer ein bisschen falsch liegt.

## Was sollten Händler tatsächlich sehen?

Die meisten Händler brauchen nicht "37 Stück in Werk 1200". Sie brauchen die Antwort auf eine Frage: Wann habe ich das Teil?

Ich schlage drei Zustände für Produktliste und Produktseite vor:

- **Lieferbar**, wenn die Kopie genug Bestand in der passenden Lagerortgruppe zeigt.
- **Auf Anfrage**, wenn das Teil auftragsbezogen gefertigt wird oder die Kopie nichts zeigt.
- **Liefertermin**, im Checkout, aus der Live-Verfügbarkeitsprüfung in SAP.

```ablauf
erp: Bestand in SAP, Verfügbarkeit SAP
sf: Kopie in OCI, Produktliste, Checkout
Bestand in SAP --Updates--> Kopie in OCI
Kopie in OCI --Zustand--> Produktliste
Produktliste --> Checkout
Checkout --Extension--> Verfügbarkeit SAP
Verfügbarkeit SAP ..Termin..> Checkout
```

Das hat drei Vorteile. Die Produktliste bleibt schnell, weil sie nur die Kopie liest. Der eine Moment, in dem der Shop etwas verspricht, die Bestellung, nutzt den genauen Wert. Und exakte Mengen bleiben intern, was zählt, wenn Wiederverkäufer oder Wettbewerber Zugang zum Shop haben.

Dieselbe Logik gilt für Agenten. In meinem Artikel zum [Auftragsstatus aus SAP](../agentforce-sap-auftragsstatus/) gibt der Agent den bestätigten Termin aus SAP weiter und schätzt nie einen aus Beständen. Ein Shop sollte es genauso halten.

## Ein typisches Szenario, als Annahme

Ein Pumpenhersteller verkauft 12.000 Ersatzteile an 250 Händler. Der Bestand liegt in SAP in drei Lagern. Die Architektur könnte so aussehen:

1. SAP schickt Bestandsänderungen alle 15 Minuten an Omnichannel Inventory, nachts eine Vollübertragung.
2. Die drei Lager sind Lagerorte, zusammengefasst in einer Lagerortgruppe für den Europa-Shop.
3. Die Produktliste zeigt "lieferbar" oder "auf Anfrage" aus der Kopie.
4. Im Checkout ruft die Inventory-Extension über die Middleware die SAP-Verfügbarkeitsprüfung für die Warenkorbpositionen auf und zeigt den bestätigten Termin pro Position.
5. Antwortet SAP nicht in einer festgelegten Zeit, nimmt der Shop die Bestellung mit "Termin folgt" an, und SAP bestätigt später.

```hinweis achtung
Den fünften Punkt vergessen Teams am häufigsten. Schreiben Sie die Rückfallregel auf, bevor die erste Zeile Code entsteht.
```

## Wie passt das zu Field Service und Händlerbeständen?

Der Bestand, den der Shop zeigt, ist oft derselbe, aus dem Field-Service-Techniker entnehmen. In meinem Artikel zu [Ersatzteilen in Field Service](../salesforce-field-service-ersatzteile-erp/) führt das ERP den Bestand bis ins Servicefahrzeug, Salesforce arbeitet mit einer Kopie. Der Shop ist ein zweiter Verbraucher derselben Daten. Lesen beide verschiedene Kopien mit unterschiedlichen Update-Zyklen, sehen Techniker und Händler für dasselbe Teil verschiedene Zahlen.

Händlerbestände sind noch einmal ein eigenes Thema. Bestand beim Händler und Nachschubvorschläge dafür behandle ich in [Agentforce für Händlerbestand und Nachschub](../haendlerbestand-nachschub-agentforce/). Der Shop zeigt nur den eigenen Bestand des Herstellers.

## Was ist mit Unified Omnichannel Inventory in Winter '27?

Die [Winter-'27-Highlights auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-marketing-commerce-revenue-management) nennen Unified Omnichannel Inventory: Filial- und Onlinebestand in einem Echtzeit-Datensatz, gegen "Ghost Stock" und für Abholung in der Filiale. B2B erwähnt die Beschreibung nicht. Für einen Hersteller mit Werken und Lagern statt Filialen würde ich in einer Sandbox prüfen, ob sich etwas ändert, bevor ich damit plane.

## Wo starten Sie?

Legen Sie pro Ansicht fest, welche Bestandsquelle gilt: Produktliste, Produktseite, Warenkorb, Checkout. Definieren Sie dann die drei Zustände für Händler, den Update-Zyklus der Kopie und die Rückfallregel, wenn SAP nicht antwortet. Wie der Bestand in die gesamte Schnittstellenliste passt, steht in [B2B Commerce und SAP: Welche Daten fließen wohin](../b2b-commerce-sap-datenfluesse/), und das [Kapitel zur ERP-Anbindung der Masterclass](../../masterclass/b2b-commerce/erp-integration-bestand-auftraege/) ordnet es ein. Solche Schnittstellen unabhängig zu prüfen, gehört zu meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Zeigen Sie die Kopie zum Stöbern und den SAP-Termin für das Versprechen; wenn Sie Ihr Bestandskonzept vor dem Bau prüfen lassen möchten, [schreiben Sie mir](#contact).
