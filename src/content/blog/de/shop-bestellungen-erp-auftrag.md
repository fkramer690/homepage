---
title: "Shop-Bestellungen ins ERP: Wem gehört der Auftrag?"
description: "Wem gehört eine Bestellung aus dem B2B-Shop auf Salesforce, Order Management oder SAP? Managed und unmanaged Order Summaries, Editionen und Status zurück."
pubDate: 2026-10-28
lang: de
slug: shop-bestellungen-erp-auftrag
translationKey: commerce-order-to-erp
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: integration
tags: [B2B Commerce, Order Management, SAP, Order Summary, ERP-Anbindung, Bestellhistorie]
takeaways:
  - "Salesforce kennzeichnet jede Order Summary mit OrderLifeCycleType: managed heißt, Salesforce Order Management führt den Lebenszyklus, unmanaged heißt, ein externes System wie SAP."
  - "Bei den meisten Herstellern bleibt SAP Herr des Auftrags: Der Shop schickt die Bestellung, SAP legt den Kundenauftrag an, Status, Lieferungen und Rechnungen kommen in die unmanaged Summary zurück."
  - "Growth Edition enthält Order Management Lite, Advanced das volle Order Management; Aufträge aus anderen Kanälen brauchen ein separat gekauftes Order Management."
  - "Käufer sehen ihre Aufträge über die Order-Summary-APIs im Shop, also entscheiden die aus SAP zurückgeschriebenen Daten, was die Bestellhistorie zeigt."
  - "Die Extension Commerce_Domain_Checkout_CreateOrder formt den Auftrag, bevor er den Shop verlässt, zum Beispiel mit Feldern, die SAP für den Kundenauftrag braucht."
faq:
  - q: "Brauche ich Salesforce Order Management für B2B Commerce?"
    a: "Nicht, wenn SAP den Lebenszyklus des Auftrags führt. Der Shop legt dann unmanaged Order Summaries an, und die Schnittstelle hält sie aktuell. Order Management lohnt sich, wenn Salesforce selbst Aufträge zuteilen, ausliefern, stornieren und retournieren soll."
  - q: "Was ist der Unterschied zwischen managed und unmanaged Order Summaries?"
    a: "Managed Order Summaries legt Salesforce Order Management an und führt sie. Unmanaged legt B2B Commerce an, wenn ein externes System den Lebenszyklus führt; Änderungen dort müssen nach Salesforce zurückgeschrieben werden."
  - q: "Kann Salesforce Order Management auch Telefon- und EDI-Aufträge verwalten?"
    a: "Ja, aber laut Preisseite brauchen Aufträge aus anderen Kanälen oder aus Drittsystemen ein separat gekauftes Salesforce Order Management. Das in den Commerce-Editionen enthaltene Order Management deckt Bestellungen über den Storefront ab."
  - q: "Welche Berechtigung braucht der Integrationsnutzer, um Aufträge zu aktualisieren?"
    a: "Laut Developer Guide dürfen Nutzer mit B2B Commerce Integrator User oder Edit Unmanaged Order Summaries unmanaged Order Summaries exportieren und aktualisieren. Geben Sie diese Berechtigung einem eigenen Integrationsnutzer, nicht einer Person."
draft: false
---

Bei den meisten Herstellern sollte SAP den Auftrag aus dem B2B-Shop führen. Der Shop legt in Salesforce Auftrag und Order Summary an und schickt die Bestellung an SAP. SAP legt den Kundenauftrag an, liefert und fakturiert. Salesforce kennzeichnet solche Summaries als unmanaged, und die Schnittstelle schreibt Status, Lieferungen und Rechnungen zurück, damit Käufer sie im Shop sehen. Salesforce Order Management, in Growth als Lite und in Advanced voll enthalten, lohnt sich, wenn Salesforce selbst zuteilen, versenden, stornieren und retournieren soll. In einem Unternehmen, das die Auftragsabwicklung schon in SAP betreibt, wären das zwei Auftragssysteme.

## Was passiert mit einer Bestellung in B2B Commerce?

Sendet ein Käufer im B2B-Shop auf Salesforce eine Bestellung ab, wandelt der Shop den Warenkorb in einen Auftrag um und legt eine Order Summary an. Die Order Summary ist der Datensatz, den Käufer in ihrer Bestellhistorie sehen, und der, mit dem Schnittstellen danach arbeiten.

Jede Order Summary hat das Feld `OrderLifeCycleType`. Der [Developer Guide zu managed und unmanaged Order Summaries](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html) definiert es so:

- **Managed** kennzeichnet eine Order Summary, die Salesforce Order Management angelegt hat. Salesforce führt den Lebenszyklus.
- **Unmanaged** kennzeichnet eine Order Summary, die B2B Commerce angelegt hat und deren Lebenszyklus "often managed by an external order management system" ist. Änderungen dort "must be reflected in Salesforce".

Dieses eine Feld beantwortet die Frage im Titel, zumindest technisch. Die organisatorische Antwort muss vorher kommen.

Zum Namen: Salesforce vermarktet B2B Commerce inzwischen auch als "Agentforce Commerce for B2B". Am Auftragsmodell ändert das nichts.

## Was leistet Salesforce Order Management?

Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/scom-order-management/scom-som-get-started) deckt Order Management die Zuteilung (welcher Standort liefert), die Erfüllung (Kommissionieren, Verpacken, Versenden, Fakturieren) und den Service ab (Stornos, Nachlässe, Retouren, Ersatzlieferungen und Umtausch). Es bietet "a single view of orders, actions taken on orders, and order history". Nach der Fakturierung exportiert es die Rechnungen ins ERP.

Das ist ein vollständiges Auftragsmanagement. Es passt zu Unternehmen, die aus mehreren Standorten liefern und Retouren und Umtausch in Salesforce abwickeln wollen, wie viele Einzelhändler. Ein Maschinenbauer mit SAP SD (Vertrieb), Lagerverwaltung und Fakturierung hat all das schon in SAP.

## Welche Edition enthält was?

Die [B2B-Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) nennt:

| | Growth Edition | Advanced Edition |
|---|---|---|
| Order Management | Order Management Lite | Volles Order Management |
| Lagerorte | 20 | 20 |
| Preis | Auf Anfrage, Anteil am GMV | Auf Anfrage, Anteil am GMV |

Zwei Fußnoten zählen mehr als die Tabelle. Aufträge "taken on other channels or integrated from any other third-party system" brauchen ein separat gekauftes Salesforce Order Management. Und Bestandskunden mit Order Management "will need to renew on Commerce Cloud Advanced".

```hinweis offen
Was Lite gegenüber der vollen Version weglässt, schlüsselt die Preisseite nicht auf. Wenn Order Management Teil Ihres Plans ist, lassen Sie sich diese Liste vor der Wahl der Edition von Salesforce geben.
```

## Warum SAP meist Herr des Auftrags bleiben sollte

Ich sehe in der Fertigung drei Gründe.

**Die meisten Aufträge kommen nicht über den Shop.** Telefon, E-Mail, EDI und Außendienst landen heute in SAP und werden es noch jahrelang tun. Würde Salesforce Order Management nur die Shop-Aufträge führen, arbeitet der Innendienst in zwei Systemen. Sollen alle Aufträge hinein, braucht es die separate Lizenz und eine Umstellung der Auftragsprozesse, die sich für ein Shop-Projekt selten rechnet.

**Die Abwicklung liegt in SAP.** Verfügbarkeitsprüfung, Lieferung, Kommissionierung, Warenausgang und Fakturierung sind dort eingerichtet, oft mit jahrelang gewachsener kundenspezifischer Logik. Das in Salesforce nachzubauen, ist ein eigenes Programm.

**Kredit, Preise und Steuern liegen in SAP.** Endgültig ist der Auftrag erst, wenn SAP ihn angenommen hat. Mein Artikel zu [Händlerbestand und Nachschub](../haendlerbestand-nachschub-agentforce/) folgt derselben Regel: Eine Anforderung wird erst zum verbindlichen Auftrag, wenn das ERP sie angenommen und eine Auftragsnummer zurückgegeben hat.

Der Shop ist also der Ort, an dem der Auftrag beginnt und an dem der Käufer ihn verfolgt. SAP ist der Ort, an dem er abgewickelt wird.

```ablauf
sf: Warenkorb, Order Summary, Bestellhistorie
erp: Kundenauftrag, Lieferung, Rechnung
Warenkorb --> Order Summary
Order Summary --Bestellung--> Kundenauftrag
Kundenauftrag --> Lieferung
Lieferung --> Rechnung
Kundenauftrag ..Auftragsnummer..> Order Summary
Lieferung ..Sendungsnummer..> Order Summary
Rechnung ..> Order Summary
Order Summary --> Bestellhistorie
```

## Was kommt aus SAP zurück, und wann?

Die Bestellhistorie im Shop ist nur so gut wie die zurückgeschriebenen Daten. Salesforce bietet Käufern eine Reihe von [Order-Summary-APIs](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-order-summaries-apis.html): Bestellhistorie, einzelne Order Summary, Delivery Groups, Positionen, Sendungen und Sendungspositionen. Dazu kommt Add Order to Cart, das eine frühere Bestellung für eine Nachbestellung in den Warenkorb kopiert.

Bei unmanaged Summaries befüllt Ihre Schnittstelle all das. Ich würde mindestens zurückschreiben:

- die SAP-Auftragsnummer, binnen Minuten nach der Bestellung,
- bestätigte Liefertermine pro Position,
- Lieferungen mit Sendungsnummern,
- Rechnungen oder einen Link darauf,
- Stornos und Änderungen, die der Innendienst in SAP vornimmt.

Der Integrationsnutzer braucht laut Developer Guide die Berechtigung B2B Commerce Integrator User oder Edit Unmanaged Order Summaries. Nutzen Sie einen eigenen Integrationsnutzer mit Zertifikat oder Client Credentials. Passwort-Logins für Connected Apps enden am 20. Februar 2027, wie in [Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/) beschrieben.

Händler, die den Status im Chat abfragen wollen, brauchen dieselben Daten. Ein [Agent, der den Auftragsstatus aus SAP liest](../agentforce-sap-auftragsstatus/), und die Bestellhistorie im Shop sollten dieselbe API nutzen, damit beide denselben Termin zeigen.

## Wie forme ich den Auftrag für SAP?

Der Extension Point **Commerce_Domain_Checkout_CreateOrder** "creates an order from cart information during checkout", so die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html). Dort ergänzen Sie, was SAP braucht und der Standardauftrag nicht hat, etwa Verkaufsorganisation, Auftragsart oder Versandbedingung. Die Prüfung, bevor der Auftrag existiert, also Kredit oder Liefersperre, gehört in **Commerce_Domain_Checkout_PlaceOrder**, wie in [B2B-Checkout mit Bestellnummer](../b2b-checkout-bestellnummer-rechnung/) beschrieben.

Halten Sie den Auftrag schlank. Jedes zusätzliche Feld ist ein Mapping, das in jedem Salesforce-Release getestet werden muss.

## Ein typisches Szenario, als Annahme

Ein Kompressorenhersteller startet einen Shop auf Growth Edition für 180 Händler. Telefon- und EDI-Aufträge bleiben in SAP. Das Design könnte so aussehen:

1. Der Shop legt unmanaged Order Summaries an. Order Management Lite bleibt zunächst ungenutzt.
2. Die CreateOrder-Extension ergänzt Verkaufsorganisation und Auftragsart.
3. Die Middleware schickt den Auftrag an SAP und schreibt die Kundenauftragsnummer binnen zwei Minuten zurück.
4. Lieferungen und Rechnungen werden bei Änderung zurückgeschrieben, Stornos des Innendiensts ebenfalls.
5. Käufer sehen eine Bestellhistorie für Shop-Aufträge. Telefonaufträge bleiben im ersten Release im Shop unsichtbar, was der Innendienst weiß und erklärt.

Punkt fünf ist eine echte Grenze. Sollen alle SAP-Aufträge im Shop erscheinen, müssen auch Telefon- und EDI-Aufträge als Order Summaries nach Salesforce. Ob das die Fußnote der Preisseite zu Aufträgen aus anderen Kanälen berührt, klären Sie schriftlich mit Salesforce, bevor Sie Händlern eine vollständige Historie versprechen.

## Wo starten Sie?

Schreiben Sie auf, wem der Auftrag in jedem Schritt gehört, vom Warenkorb bis zur Rechnung, und welchen Status der Käufer in jedem Schritt sieht. Entscheiden Sie dann, ob Order Management überhaupt eine Rolle hat. Wie der Auftrag in die übrigen Datenflüsse passt, steht in [B2B Commerce und SAP: Welche Daten fließen wohin](../b2b-commerce-sap-datenfluesse/), und das [Kapitel zur ERP-Anbindung der Masterclass](../../masterclass/b2b-commerce/erp-integration-bestand-auftraege/) ordnet es ein. Eine unabhängige Prüfung solcher Designs gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Der Shop nimmt den Auftrag an und SAP wickelt ihn ab, solange der Status zuverlässig zurückkommt; wenn Sie gerade entscheiden, wem Ihre Aufträge gehören, [schreiben Sie mir](#contact).
