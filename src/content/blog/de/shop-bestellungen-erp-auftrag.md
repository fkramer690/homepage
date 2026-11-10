---
title: "Shop-Bestellungen ins ERP: Wem gehört der Auftrag?"
metaTitle: "Salesforce B2B Commerce und SAP: Wer führt den Auftrag?"
description: "Soll SAP oder Salesforce Order Management Bestellungen aus B2B Commerce führen? Managed oder unmanaged Order Summaries, Rückmeldungen aus SAP und Lizenzen."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: shop-bestellungen-erp-auftrag
translationKey: commerce-order-to-erp
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: integration
tags: [B2B Commerce, Order Management, SAP, Order Summary, ERP-Anbindung, Bestellhistorie]
takeaways:
  - "Jede Order Summary trägt einen OrderLifeCycleType: managed heißt, Salesforce Order Management führt den Auftrag; unmanaged heißt, ein System wie SAP führt ihn."
  - "Steuert SAP bereits Verfügbarkeitsprüfung, Lieferung und Fakturierung, bleibt es meist Herr des Auftrags. Die Schnittstelle schreibt den Status zurück."
  - "Growth Edition enthält Order Management Lite, Advanced das volle Order Management; Aufträge aus anderen Kanälen brauchen ein separat gekauftes Order Management."
  - "Laut Salesforce legen LWR-Stores managed Summaries an. Stellen Sie das WebStore-Feld OrderLifeCycleType vor dem ersten Auftrag auf unmanaged."
  - "Die Extension Commerce_Domain_Checkout_CreateOrder passt den Auftrag an, bevor er den Shop verlässt, etwa mit Feldern, die SAP braucht."
faq:
  - q: "Brauche ich Salesforce Order Management für B2B Commerce?"
    a: "Nicht, wenn SAP den Lebenszyklus des Auftrags führt. Der Shop legt dann unmanaged Order Summaries an. In LWR-Stores geschieht das nach Umstellung des WebStore-Felds OrderLifeCycleType; die Schnittstelle hält die Summaries aktuell. Order Management lohnt sich, wenn Salesforce selbst Aufträge zuteilen, ausliefern, stornieren und retournieren soll."
  - q: "Was ist der Unterschied zwischen managed und unmanaged Order Summaries?"
    a: "Managed heißt, Salesforce Order Management verarbeitet den Auftrag und berechnet die Finanzfelder selbst. Unmanaged heißt, ein externes System wie SAP verarbeitet ihn, und Änderungen dort müssen nach Salesforce zurückgeschrieben werden. Der Typ wird beim Anlegen der Order Summary festgelegt."
  - q: "Kann Salesforce Order Management auch Telefon- und EDI-Aufträge verwalten?"
    a: "Ja, aber laut Preisseite erfordern Aufträge aus anderen Kanälen oder aus Drittsystemen ein separat erworbenes Salesforce Order Management, wenn sie dessen Funktionen nutzen. Ob das auch für eine reine Anzeige in der Bestellhistorie gilt, klären Sie schriftlich mit Salesforce."
  - q: "Welche Berechtigung braucht der Integrationsnutzer, um Aufträge zu aktualisieren?"
    a: "Laut Developer Guide dürfen Nutzer mit der Berechtigung B2B Commerce Integrator User oder Edit Unmanaged Order Summaries unmanaged Order Summaries exportieren und aktualisieren. Geben Sie eine dieser Berechtigungen einem eigenen Integrationsnutzer, nicht einer Person."
draft: false
---

Wenn SAP bereits Verfügbarkeitsprüfung, Lieferung und Fakturierung steuert, sollte es auch den Auftrag aus dem B2B-Shop führen. Das ist bei den meisten Herstellern so. Der Shop legt in Salesforce einen Auftrag und eine Order Summary an und schickt die Bestellung an SAP. SAP legt den Kundenauftrag an, liefert und fakturiert. Salesforce kennzeichnet solche Summaries als unmanaged, und die Schnittstelle schreibt Status, Lieferungen und Rechnungen zurück, damit Käufer sie im Shop sehen. Salesforce Order Management, in Growth als Lite und in Advanced vollständig enthalten, lohnt sich, wenn Salesforce Aufträge selbst zuteilen, versenden, stornieren und retournieren soll. In einem Unternehmen, das die Auftragsabwicklung schon in SAP betreibt, wären das zwei Auftragssysteme.

## Was passiert mit einer Bestellung in B2B Commerce?

Sendet ein Käufer in einem B2B-Shop auf Salesforce eine Bestellung ab, wandelt der Shop den Warenkorb in einen Auftrag um und legt eine Order Summary an. Die Order Summary ist der Datensatz, den Käufer in ihrer Bestellhistorie sehen und mit dem Schnittstellen anschließend arbeiten.

Jede Order Summary hat das Feld `OrderLifeCycleType`. Der [Developer Guide zu managed und unmanaged Order Summaries](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html) definiert es so:

- **Managed** kennzeichnet eine Order Summary, die Salesforce Order Management angelegt hat. Salesforce führt den Lebenszyklus.
- **Unmanaged** kennzeichnet eine Order Summary, die B2B Commerce angelegt hat und deren Lebenszyklus "often managed by an external order management system" ist. Änderungen dort "must be reflected in Salesforce".

Die [Salesforce-Hilfe zu den Lifecycle-Typen](https://help.salesforce.com/s/articleView?id=commerce.om_order_lifecycle_types.htm&language=en_US&type=5) beschreibt es von der Verarbeitung her: managed für Aufträge, die nur Order Management verarbeitet, unmanaged für Aufträge, die ein externes System verarbeitet. Der Typ wird beim Anlegen der Order Summary gesetzt.

```hinweis achtung
Welcher Typ beim Checkout gesetzt wird, hängt vom Store ab. Laut einem [Salesforce-Knowledge-Artikel](https://help.salesforce.com/s/articleView?id=000395308&type=1) legen LWR-Stores managed Order Summaries an. Stellen Sie den WebStore über das Feld `OrderLifeCycleType` auf unmanaged um, bevor der erste echte Auftrag entsteht. Prüfen Sie den Wert in Ihrem Store, statt sich auf einen Standard zu verlassen.
```

Dieses eine Feld beantwortet die Frage im Titel, zumindest technisch. Die organisatorische Antwort muss vorher kommen.

Zum Namen: Salesforce vermarktet B2B Commerce inzwischen auch als "Agentforce Commerce for B2B". Am Auftragsmodell ändert das nichts.

## Was leistet Salesforce Order Management?

Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/scom-order-management/scom-som-get-started) deckt Order Management die Zuteilung (welcher Standort liefert), die Erfüllung (Kommissionieren, Verpacken, Versenden, Fakturieren) und den Service ab (Stornos, Nachlässe, Retouren, Ersatzlieferungen und Umtausch). Es bietet "a single view of orders, actions taken on orders, and order history". Im Referenzablauf von Trailhead werden die Rechnungen nach der Fakturierung per Schnittstelle ins ERP exportiert.

Das ist eine eigene Auftragsabwicklung mit Flows und Schnittstellen zu Zahlung, Lager und Versand. Es passt zu Unternehmen, die aus mehreren Standorten liefern und Retouren und Umtausch in Salesforce abwickeln wollen, wie viele Einzelhändler. Ein Maschinenbauer mit SAP SD (Vertrieb), Lagerverwaltung und Fakturierung hat all das schon in SAP.

## Order Management Lite in Growth, volles Order Management in Advanced

Die [B2B-Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) nennt:

| | Growth Edition | Advanced Edition |
|---|---|---|
| Order Management | Order Management Lite | Volles Order Management |
| Lagerorte | 20 | 20 |
| Preis | Auf Anfrage, Anteil am GMV | Auf Anfrage, Anteil am GMV |

Zwei Fußnoten zählen mehr als die Tabelle. Für Aufträge "taken on other channels or integrated from any other third-party system" ist ein separat erworbenes Salesforce Order Management erforderlich. Und Bestandskunden mit Order Management "will need to renew on Commerce Cloud Advanced".

```hinweis offen
Was Lite gegenüber der vollen Version weglässt, schlüsselt die Preisseite nicht auf. Wenn Order Management Teil Ihres Plans ist, lassen Sie sich diese Liste vor der Wahl der Edition von Salesforce geben.
```

## Warum SAP meist Herr des Auftrags bleiben sollte

Ich sehe in der Fertigung drei Gründe.

**Die meisten Aufträge kommen nicht über den Shop.** Telefon, E-Mail, EDI und Außendienst landen heute in SAP und werden es noch jahrelang tun. Würde Salesforce Order Management nur die Shop-Aufträge führen, müsste der Innendienst in zwei Systemen arbeiten. Sollen alle Aufträge in Salesforce Order Management hinein, braucht es die separate Lizenz und eine Umstellung der Auftragsprozesse, die sich für ein Shop-Projekt selten rechnet.

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

Die Bestellhistorie im Shop zeigt nur, was SAP zurückschreibt. Salesforce bietet Käufern eine Reihe von [Order-Summary-APIs](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-order-summaries-apis.html): für die Bestellhistorie, eine einzelne Order Summary, Delivery Groups, Positionen, Sendungen und Sendungspositionen. Dazu kommt die Funktion Add Order to Cart, die eine frühere Bestellung für eine Nachbestellung in den Warenkorb kopiert.

Bei unmanaged Summaries befüllt Ihre Schnittstelle all das. Rechnungen sind nicht dabei: Für sie gibt es in dieser API-Liste keinen Endpunkt; deshalb brauchen Rechnungsnummer oder PDF-Link ein eigenes Feld und eine eigene Anzeige im Shop. Dasselbe gilt für jedes andere zusätzliche Feld, das Sie aus SAP zurückschreiben. Ich würde mindestens zurückschreiben:

- die SAP-Auftragsnummer, binnen Minuten nach der Bestellung,
- bestätigte Liefertermine pro Position,
- Lieferungen mit Sendungsnummern,
- Rechnungen oder einen Link auf die Rechnung,
- Stornos und Änderungen, die der Innendienst in SAP vornimmt.

Der Integrationsnutzer braucht laut Developer Guide eine der Berechtigungen B2B Commerce Integrator User oder Edit Unmanaged Order Summaries. Nutzen Sie einen eigenen Integrationsnutzer mit Zertifikat oder Client Credentials. Der OAuth Username-Password Flow für Connected Apps endet am 20. Februar 2027, wie in [Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/) beschrieben.

Händler, die den Status im Chat abfragen wollen, brauchen dieselben Daten. Ein [Agent, der den Auftragsstatus aus SAP liest](../agentforce-sap-auftragsstatus/), und die Bestellhistorie im Shop sollten dieselbe API nutzen, damit beide denselben Termin zeigen.

## Den Auftrag für SAP mit CreateOrder formen

Der Extension Point **Commerce_Domain_Checkout_CreateOrder** "creates an order from cart information during checkout", so die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html). Dort ergänzen Sie, was SAP braucht, im Standardauftrag aber fehlt, etwa Verkaufsorganisation, Auftragsart oder Versandbedingung. Prüfungen vor dem Anlegen des Auftrags, etwa Kreditprüfung oder Liefersperre, gehören in **Commerce_Domain_Checkout_PlaceOrder**, wie in [B2B-Checkout mit Bestellnummer](../b2b-checkout-bestellnummer-rechnung/) beschrieben. Diese Extension erlaubt nur einen externen Aufruf und keine Datenbankänderung. Eine synchrone Prüfung in SAP macht den Checkout außerdem von der Erreichbarkeit von SAP abhängig.

Halten Sie den Auftrag schlank. Jedes zusätzliche Feld erfordert ein Mapping, das in jedem Salesforce-Release getestet werden muss.

## Beispiel: Shop auf Growth Edition für Händler

Ein Kompressorenhersteller startet einen Shop mit Growth Edition für 180 Händler. Telefon- und EDI-Aufträge bleiben in SAP. Das Design könnte so aussehen:

1. Der Shop legt unmanaged Order Summaries an; der WebStore ist entsprechend eingestellt. Order Management Lite bleibt zunächst ungenutzt.
2. Die CreateOrder-Extension ergänzt Verkaufsorganisation und Auftragsart.
3. Die Middleware schickt den Auftrag an SAP und schreibt die Kundenauftragsnummer binnen zwei Minuten zurück.
4. Lieferungen und Rechnungen werden bei Änderung zurückgeschrieben, Stornos des Innendiensts ebenfalls.
5. Käufer sehen eine Bestellhistorie für Shop-Aufträge. Telefonaufträge bleiben im ersten Release im Shop unsichtbar. Der Innendienst weiß das und kann es erklären.

Punkt fünf ist eine echte Grenze. Sollen alle SAP-Aufträge im Shop erscheinen, müssen auch Telefon- und EDI-Aufträge als Order Summaries nach Salesforce übertragen werden. Ob das unter die Fußnote der Preisseite zu Aufträgen aus anderen Kanälen fällt, klären Sie schriftlich mit Salesforce, bevor Sie Händlern eine vollständige Historie versprechen.

## Erster Schritt: aufschreiben, wem der Auftrag in jedem Schritt gehört

Schreiben Sie auf, wem der Auftrag in jedem Schritt gehört, vom Warenkorb bis zur Rechnung, und welchen Status der Käufer in jedem Schritt sieht. Halten Sie dabei auch fest, über welche Nummer sich Salesforce-Auftrag und SAP-Kundenauftrag zuordnen lassen und was passiert, wenn SAP eine Bestellung ablehnt oder nicht erreichbar ist. Entscheiden Sie dann, ob Order Management überhaupt eine Rolle spielt. Wie der Auftrag in die übrigen Datenflüsse passt, steht in [B2B Commerce und SAP: Welche Daten fließen wohin](../b2b-commerce-sap-datenfluesse/). Das [Kapitel zur ERP-Anbindung der Masterclass](../../masterclass/b2b-commerce/erp-integration-bestand-auftraege/) ordnet den Zusammenhang ein. Eine unabhängige Prüfung solcher Designs gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).
