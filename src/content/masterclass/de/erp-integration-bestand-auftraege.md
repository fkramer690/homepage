---
title: "B2B Commerce und ERP: Bestand, Preise und Aufträge"
description: "Wie ein B2B-Shop auf Salesforce mit SAP zusammenarbeitet: Datenflüsse, Commerce Extensions, Bestand live oder kopiert, wem der Auftrag gehört, Headless."
lang: de
slug: erp-integration-bestand-auftraege
course: b2b-commerce
translationKey: commerce-04
chapter: 4
pubDate: 2026-10-28
short: "ERP-Anbindung"
summary: "Welche Daten zwischen Shop und ERP fließen, was live abgefragt wird und wem der Auftrag gehört."
takeaways:
  - "Das ERP bleibt führend für Preise, Bestand, Kredit und den Auftrag; Salesforce B2B Commerce hält das Einkaufserlebnis und eine Kopie dessen, was der Shop dafür braucht."
  - "Für jedes Datum entscheiden Sie, ob es nach Salesforce kopiert oder live abgefragt wird: kopieren, was sich selten ändert, live fragen, wo ein falscher Wert Geld oder Vertrauen kostet."
  - "Live-Abfragen laufen über Commerce Extensions wie Commerce_Domain_Pricing_Service und Commerce_Domain_Inventory_Service; Salesforce empfiehlt sie seit Winter '24 gegenüber den älteren Checkout-Integrationen."
  - "Shop-Bestellungen landen meist als unmanaged Order Summaries in Salesforce, SAP wickelt ab, und die Schnittstelle schreibt Auftragsnummer, Termine, Lieferungen und Rechnungen zurück."
  - "Jede Schnittstelle, die sich noch per OAuth Username-Password Flow bei Salesforce anmeldet, muss vor dem 20. Februar 2027 umgestellt sein."
articles: [commerce-sap-data-flows, commerce-stock-availability-erp, commerce-order-to-erp, commerce-extensions-custom-code, commerce-headless-b2b, agentforce-sap-order-status, legacy-erp-without-api-agents, salesforce-password-integrations-2027]
faq:
  - q: "Gibt es einen fertigen Konnektor zwischen Salesforce B2B Commerce und SAP?"
    a: "Nein, ein solcher Konnektor gehört nicht zu B2B Commerce. Der MuleSoft Accelerator for SAP bringt API-Vorlagen mit, darunter einen Quote-to-Cash-Fall zwischen Sales Cloud und S/4HANA. Die Shop-Seite bauen Sie mit Commerce Extensions und den Import- und Order-Summary-APIs."
  - q: "Brauche ich Salesforce Order Management für einen B2B-Shop?"
    a: "Nicht, wenn SAP den Auftrag abwickelt. Der Shop legt dann unmanaged Order Summaries an, und die Schnittstelle hält sie aktuell. Order Management lohnt sich, wenn Salesforce selbst zuteilen, versenden, stornieren und retournieren soll."
  - q: "Woher nimmt B2B Commerce standardmäßig Bestand und Preise?"
    a: "Laut Extensions-Dokumentation kommt der Bestand aus Omnichannel Inventory und der Preis aus Salesforce-Preisbüchern. Versand kostet ohne Extension nichts. Jede dieser Quellen lässt sich per Extension durch eine Abfrage im ERP ersetzen."
  - q: "Kann ich Zahlungen über eine Commerce Extension anpassen?"
    a: "Nein. Salesforce schreibt, dass Zahlungen derzeit nicht per Extension angepasst werden können. Für Payment Gateways bleibt die Zahlungsintegration der Weg. Händler kaufen in der Fertigung aber meist auf Rechnung mit Bestellnummer."
  - q: "Lohnt sich ein headless B2B-Shop für einen Hersteller?"
    a: "Nur wenn schon eine Website oder Kunden-App existiert, die Käufer nutzen, und ein Team sie über Jahre betreibt. Für den ersten Shop ist ein LWR-Store günstiger, weil Salesforce ihn hostet und skaliert."
draft: false
---

Bei einem B2B-Shop auf Salesforce bleibt das ERP führend für Preise, Bestand, Kredit und den Auftrag. Salesforce B2B Commerce hält das Einkaufserlebnis und eine Kopie dessen, was der Shop dafür braucht. Die eigentliche Arbeit ist eine Entscheidung pro Datum: kopieren oder live abfragen. Stammdaten kommen per Batch, Preis, Verfügbarkeit und Kredit fragt der Shop in Warenkorb und Checkout über Commerce Extensions live ab, der Auftrag geht an SAP, und Status, Lieferung und Rechnung kommen zurück. Schreiben Sie Object Ownership Matrix und Schnittstellenliste, bevor jemand die Shopseiten entwirft. Jede Passwort-Anmeldung einer Schnittstelle muss vor dem 20. Februar 2027 ersetzt sein.

## Welche Daten fließen zwischen Shop und ERP?

In [Kapitel 3](../preise-warenkorb-checkout/) ging es darum, was der Käufer im Warenkorb sieht und zahlt. Hier geht es darum, woher diese Werte kommen. Salesforce vermarktet das Produkt inzwischen auch als [Agentforce Commerce for B2B](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping); an der Integrationsarchitektur ändert der Name nichts.

Am Anfang jeder Schnittstellendiskussion zeichne ich dieselbe Landkarte mit vier Blöcken:

| Daten | Richtung | Wann |
|---|---|---|
| Kundenstämme, Käufer, Produkte, Kategorien, Preisbücher, Käufergruppen | ERP nach Salesforce | Batch, nachts oder bei Änderung |
| Preis, Verfügbarkeit, Kredit, Steuer, Fracht | Shop fragt das ERP | Live, in Warenkorb und Checkout |
| Auftrag mit Bestellnummer, Lieferadresse, Wunschtermin | Salesforce nach ERP | Beim Absenden |
| Auftragsnummer, bestätigte Termine, Lieferung, Rechnung | ERP nach Salesforce | Bei Änderung |

Die Tabelle sieht einfach aus. Die Entscheidungen stecken in zwei Fragen pro Zeile: Welches System schreibt, und wie alt dürfen die Daten im Shop sein? Die ausführliche Fassung mit Produktimport-API und der Ableitung von Käufergruppen aus SAP steht in [B2B Commerce und SAP: Welche Daten fließen wohin?](../../../blog/b2b-commerce-sap-datenfluesse/).

Käufergruppen und Entitlement Policies stehen fast nie so im ERP. Sie werden aus Verkaufsorganisation, Kundengruppe oder Marke abgeleitet, wie in [Kapitel 2](../katalog-suche-sichtbarkeit/) beschrieben. Schreiben Sie diese Ableitung als Regel auf, sonst pflegt jemand die Gruppen von Hand, und der Shop läuft dem ERP davon.

## Kopieren oder live abfragen: nach welcher Regel?

Meine Regel lautet: kopieren, was sich seltener ändert, als ein Händler klickt, und live fragen, wo ein falscher Wert Geld oder Vertrauen kostet. Die Abwägung ist bei Preisen und Bestand dieselbe:

- **Kopie:** schnell, der Shop läuft weiter, wenn das ERP steht, aber die Daten sind so alt wie das letzte Update.
- **Live-Abfrage:** genau, aber jeder Aufruf kostet Wartezeit für den Händler und Last im ERP, und Sie brauchen eine Antwort auf die Frage, was der Shop tut, wenn das ERP nicht antwortet.

Vertragspreise aus der SAP-Konditionslogik und die Kreditprüfung gehören meist in die Live-Gruppe, Listenpreise, Händlerstaffeln und Produktdaten in die Kopie. Für jede Live-Abfrage schreiben Sie eine Rückfallregel auf, bevor die erste Zeile Code entsteht. Ein ERP ohne nutzbare API ändert die Rechnung: Dann bleibt oft nur eine lesende Replik hinter einer kleinen API, wie ich in [Altes ERP ohne API](../../../blog/altes-erp-ohne-api-ki-agenten/) beschreibe. Für einen Shop würde ich darüber nur lesen, nie Aufträge über Masken erfassen.

## Commerce Extensions: Wo fragt der Shop das ERP?

Commerce Extensions sind Apex-Klassen, die Salesforce an benannten Erweiterungspunkten ausführt. Die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) nennt die Punkte, die für eine ERP-Anbindung zählen, und ihre Standards:

| Bedarf | Erweiterungspunkt | Standard ohne Extension |
|---|---|---|
| Kundenpreis | `Commerce_Domain_Pricing_Service` | Salesforce-Preisbücher |
| Bestand | `Commerce_Domain_Inventory_Service` | Omnichannel Inventory |
| Steuer | `Commerce_Domain_Tax_CartCalculator` | Salesforce-Steuerdienst |
| Fracht | `Commerce_Domain_Shipping_CartCalculator` | keine Frachtkosten |
| Kredit, Liefersperre | `Commerce_Domain_Checkout_PlaceOrder`, Methode `validate` | Standardprüfungen |
| Auftrag formen | `Commerce_Domain_Checkout_CreateOrder` | Auftrag aus dem Warenkorb |

Laut der [Seite zur Integrationsarchitektur](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-integration-architecture.html) gibt es Extensions für Preise, Bestand, Versand und Steuer seit Winter '24, und Salesforce empfiehlt sie gegenüber dem älteren Checkout-Integrations-Framework, das weiter unterstützt wird. Zahlungen lassen sich laut [Extensions-Leitfaden](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) nicht per Extension anpassen.

```vertiefung Für Entwickler
titel: Extensions wartbar halten: `super()` und Registrierung im Repository
Für die Wartbarkeit zählen zwei Punkte aus demselben Leitfaden. Salesforce empfiehlt ausdrücklich, in Domain Extensions `super()` aufzurufen, damit Ihr Code den Standard ergänzt und spätere Releases weiter ankommen. Und Registrierung und Zuordnung zum Store laufen am einfachsten über die Salesforce CLI mit dem Commerce-Plug-in, alternativ über die Objekte `RegisteredExternalService` und `StoreIntegratedService`. Damit können Code, Registrierung und Mapping im Repository und in der Pipeline des Kunden liegen. Wie Sie Partnercode daraufhin prüfen, steht in [Commerce Extensions: Eigenentwicklung, die Updates übersteht](../../../blog/commerce-extensions-eigenentwicklung/), wie Store-Konfiguration durch die Umgebungen wandert, im Kapitel [Daten und Konfiguration](../../devops-release-management/daten-und-konfiguration/) der DevOps-Masterclass.
```

Meine Regel für Bestandsshops: Neue Logik kommt in Extensions, funktionierende alte Integrationen bleiben, bis sich der Code ohnehin ändern muss.

## Bestand: Kopie in Omnichannel Inventory oder Live-Prüfung in SAP?

Im Standard liest der Shop den Bestand aus Omnichannel Inventory. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/omnichannel-inventory/get-started-with-omnichannel-inventory) beschreibt den Dienst mit nahezu aktueller Verfügbarkeit pro Lagerort und Lagerortgruppe und sagt zugleich, dass er das führende Bestandssystem nicht ersetzt, auch kein ERP. SAP muss die Kopie also befüllen. Die [B2B-Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) nennt für Growth und Advanced jeweils 20 Lagerorte. Ein Hersteller mit vielen Werken und Regionallagern klärt vor der Unterschrift, wie Salesforce Lagerorte zählt.

Die Alternative ist die Inventory-Extension, die die Verfügbarkeitsprüfung in SAP aufruft. Sie liefert einen bestätigten Termin, den eine Bestandskopie nie kennt, weil SAP dabei je nach Customizing auch geplante Zugänge und bestehende Bedarfe berücksichtigt. Ich würde diese Logik nicht in Salesforce nachbauen.

Meine Empfehlung ist eine Mischung: Produktliste und Produktseite lesen die Kopie und zeigen "lieferbar" oder "auf Anfrage", der Checkout fragt SAP live nach dem Termin. Exakte Mengen braucht ein Händler selten. Details und eine Vergleichstabelle stehen in [Bestand im B2B-Shop: live aus dem ERP oder kopiert?](../../../blog/bestand-b2b-shop-erp-live/). Ein Agent, der Händlern den Auftragsstatus nennt, folgt derselben Regel und gibt nur den bestätigten Termin aus SAP weiter, wie in [Agentforce und SAP: Auftragsstatus über MuleSoft](../../../blog/agentforce-sap-auftragsstatus/) beschrieben.

## Wem gehört der Auftrag?

Sendet ein Käufer die Bestellung ab, legt B2B Commerce einen Auftrag und eine Order Summary an. Das Feld `OrderLifeCycleType` unterscheidet laut [Developer Guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html) zwei Fälle: managed, von Salesforce Order Management angelegt, und unmanaged, vom Shop angelegt. Unmanaged Summaries darf ein Nutzer mit der Berechtigung B2B Commerce Integrator User oder Edit Unmanaged Order Summaries aktualisieren. Geben Sie sie einem eigenen Integrationsnutzer, keiner Person.

Die Editionen unterscheiden sich hier deutlich. Growth enthält Order Management Lite, Advanced das volle Order Management. Aufträge aus anderen Kanälen oder Drittsystemen brauchen laut Preisseite ein separat gekauftes Order Management, und Bestandskunden mit Order Management verlängern auf Advanced.

```hinweis offen
Was Order Management Lite in Growth weglässt, schlüsselt die Preisseite nicht auf. Lassen Sie sich das schriftlich geben, bevor Sie eine Edition wählen.
```

Order Management deckt laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/scom-order-management/scom-som-get-started) Zuteilung, Erfüllung und Service mit Stornos, Retouren und Umtausch ab und exportiert Rechnungen ins ERP. Ein Maschinenbauer mit SAP SD, Lagerverwaltung und Fakturierung hat all das schon. Dazu kommen Telefon-, E-Mail- und EDI-Aufträge, die weiter in SAP landen. Deshalb sollte bei den meisten Herstellern SAP Herr des Auftrags bleiben: Der Shop nimmt an, SAP wickelt ab, die Schnittstelle schreibt Auftragsnummer, Termine, Lieferungen und Rechnungen zurück. Die Begründung und was im Rückweg mindestens ankommen muss, steht in [Shop-Bestellungen ins ERP: Wem gehört der Auftrag?](../../../blog/shop-bestellungen-erp-auftrag/).

```ablauf
sf: Checkout, Order Summary
erp: SAP-Auftrag, Lieferung, Rechnung
Checkout --unmanaged--> Order Summary
Checkout --Auftrag an SAP--> SAP-Auftrag
SAP-Auftrag --> Lieferung
SAP-Auftrag --> Rechnung
SAP-Auftrag ..Nummer, Termine..> Order Summary
Lieferung ..zurück..> Order Summary
Rechnung ..zurück..> Order Summary
```

Planen Sie den Rückweg so sorgfältig wie den Hinweg. Ein Händler, der drei Tage lang "Bestellung eingegangen" sieht, ruft im Innendienst an.

## Middleware oder direkte Callouts?

Für einen Shop mit zwei oder drei Live-Abfragen und einem Auftragsexport reichen direkte Apex-Callouts mit Named Credentials. Eine Middleware lohnt sich, wenn dieselben SAP-Daten auch Service, Field Service und Agenten versorgen. Dann bedient eine Auftragsstatus-API den Shop, den Agenten und den Innendienst, und alle zeigen denselben Termin. Warum Agenten bestehende APIs mitnutzen sollten, beschreibt das Kapitel [MCP und Schnittstellen](../../ki-salesforce/mcp-und-schnittstellen/) der KI-Masterclass.

Der [MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/) enthält einen Quote-to-Cash-Fall, der Auftrags-, Bestands- und Kundendaten zwischen Sales Cloud und S/4HANA synchronisiert, und einen Fall für B2B-EDI. Das sind API-Vorlagen als Startpunkt. Eine fertige Anbindung für einen B2B-Commerce-Store ist es nicht.

```hinweis achtung
Eine Frist gilt für jede Batch-Schnittstelle. Salesforce schaltet den [OAuth Username-Password Flow](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5) für Connected Apps am 20. Februar 2027 ab. Ein nächtlicher Produktimport, der sich mit Passwort anmeldet, läuft dann nicht mehr, oft ohne dass es jemand sofort merkt. Wie Sie diese Schnittstellen finden und umstellen, steht in [Passwort-Integrationen enden 2027](../../../blog/salesforce-passwort-integrationen-2027/).
```

## Wann lohnt sich ein headless Shop?

Headless heißt: Ihre eigene Website oder App ist der Shop, und Salesforce liefert Katalog, Preise, Warenkorb, Checkout und Aufträge über die Commerce Connect REST APIs. Auf der [Seite zu den Commerce-Neuerungen](https://www.salesforce.com/de/commerce/innovations/) steht Headless B2B Commerce als heute verfügbar, mit einem React B2B Storefront Blueprint. Der [Developer Guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-journey-overview.html) verweist auf eine Referenz-App im GitHub-Repository `commerce-b2b-headless`.

Für die ERP-Anbindung ist das eine gute Nachricht: Extensions werden durch Connect-API-Aufrufe ausgelöst, dieselbe Preis- und Bestandslogik gilt also im LWR-Store und in Ihrer App. Die Kosten liegen beim Frontend. Hosting, Login, Pipeline und Regressionstests gegen jedes Salesforce-Release tragen Sie selbst. Ich würde headless nur empfehlen, wenn eine genutzte Website oder Kunden-App schon existiert und ein Team sie über Jahre betreibt. Welche Lizenz headless Käufer brauchen, habe ich in der Dokumentation nicht gefunden; das gehört schriftlich bestätigt. Mehr in [Headless B2B Commerce: eigenes Frontend, Salesforce-Kern](../../../blog/headless-b2b-commerce-eigenes-frontend/).

## Ein typisches Szenario, als Annahme

Ein Maschinenbauer mit SAP S/4HANA plant einen Shop auf Growth Edition für 250 Händler und 15.000 Ersatzteile. Telefon- und EDI-Aufträge bleiben in SAP. Die Schnittstellenliste nach dem ersten Workshop könnte so aussehen:

1. Kundenstamm zu Accounts und Buyer Accounts, nachts.
2. Materialien und Produkthierarchie zu Produkten und Kategorien, nachts.
3. Listen- und Staffelpreise in Preisbücher, nachts; Vertragspreise der 40 größten Händler live über die Pricing-Extension.
4. Bestandsstatus alle 15 Minuten in Omnichannel Inventory, bestätigter Termin live im Checkout.
5. Kredit und Liefersperre live in `validate`.
6. Auftrag an SAP, Auftragsnummer binnen Minuten zurück, Lieferungen und Rechnungen bei Änderung, als unmanaged Order Summaries.

Sechs Schnittstellen, drei davon live, alle über einen Integrationsnutzer mit Zertifikat statt Passwort. Antwortet SAP im Checkout nicht rechtzeitig, nimmt der Shop die Bestellung mit "Termin folgt" an. Jede Schnittstelle bekommt einen Verantwortlichen auf Kundenseite.

## Wo starten Sie?

Schreiben Sie zwei Dokumente, bevor jemand die Shopseiten entwirft. Erstens eine [Object Ownership Matrix](../../../blog/object-ownership-matrix-salesforce/) mit einer zusätzlichen Spalte: kopiert oder live. Zweitens eine Schnittstellenliste mit führendem System, maximalem Alter der Daten, Rückfallregel und Anmeldeverfahren pro Schnittstelle. Mit diesen beiden Seiten lässt sich jedes Partnerangebot vergleichen. Danach geht es in [Kapitel 5](../agentforce-migration-einfuehrung/) um Agenten, die auf denselben Schnittstellen aufsetzen, und um die Einführung bei den Händlern. Eine unabhängige Prüfung solcher Designs gehört zu meiner Arbeit bei [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/) und in der [Salesforce-Architektur](../../../leistungen/salesforce-architektur/).

Ein B2B-Shop ist nur so verlässlich wie seine Datenflüsse aus dem ERP, also entscheiden Sie diese vor dem Design.
