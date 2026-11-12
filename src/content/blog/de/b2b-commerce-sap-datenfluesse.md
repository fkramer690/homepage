---
title: "B2B Commerce und SAP: Welche Daten fließen wohin?"
description: "Welche Daten zwischen Salesforce B2B Commerce und SAP fließen: Stammdaten per Batch, Live-Abfragen in Warenkorb und Checkout, Auftrag raus, Status zurück."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: b2b-commerce-sap-datenfluesse
translationKey: commerce-sap-data-flows
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: integration
tags: [B2B Commerce, SAP, ERP-Anbindung, Commerce Extensions, MuleSoft, Schnittstellen]
takeaways:
  - "Daten fließen in vier Richtungen: Stammdaten per Batch, Live-Abfragen in Warenkorb und Checkout, der Auftrag zu SAP, Status, Lieferung und Rechnung zurück."
  - "Accounts, Produkte, Kategorien, Preisbücher und Berechtigungen werden nach Salesforce kopiert; der Produktimport verarbeitet CSV-Dateien in asynchronen Jobs."
  - "Preis, Bestand, Steuer, Fracht und die Prüfung vor dem Absenden nutzen Extension Points wie Commerce_Domain_Pricing_Service."
  - "Salesforce empfiehlt seit Winter '24 Extensions gegenüber den älteren Checkout-Integrationen. Zahlungen lassen sich nicht per Extension anpassen."
  - "Connected-App-Schnittstellen mit dem OAuth Username-Password Flow müssen vor dem 20. Februar 2027 umgestellt werden, meist auf Client Credentials."
faq:
  - q: "Welche Daten braucht Salesforce B2B Commerce aus SAP?"
    a: "Salesforce B2B Commerce braucht Kundenstämme, Produkte mit Kategorien, Preise und die Regeln, wer welches Produkt sehen darf. Dazu kommen Live-Antworten auf Abfragen zu Preis, Verfügbarkeit und Kredit im Checkout. Nach der Bestellung braucht der Shop die SAP-Auftragsnummer, den Lieferstatus und die Rechnungen zurück."
  - q: "Gibt es einen Standard-Konnektor zwischen B2B Commerce und SAP?"
    a: "Ein solcher Konnektor gehört nicht zu B2B Commerce. MuleSoft bietet einen Accelerator for SAP mit wiederverwendbaren SAP- und Salesforce-APIs und Vorlagen, darunter Quote-to-Cash zwischen Sales Cloud und S/4HANA, als Startpunkt. Die Shop-Anbindung bauen Sie mit Commerce Extensions und Import-APIs."
  - q: "Sollen Preise und Bestand nach Salesforce kopiert oder live aus SAP abgefragt werden?"
    a: "Das entscheiden Sie für jede Datenart. Eine Kopie ist schnell und hält den Shop am Laufen, wenn SAP steht; eine Live-Abfrage ist genau, kostet aber Wartezeit und Last. Ich kopiere, wo ein gewisses Datenalter vertretbar ist, und frage live ab, wo die Antwort für den aktuellen Auftrag verbindlich sein muss."
  - q: "Brauche ich MuleSoft für B2B Commerce und SAP?"
    a: "Nicht unbedingt. Direkte Apex-Callouts mit Named Credentials können für einen Shop mit wenigen schnellen Live-Abfragen reichen, wenn Timeouts, Wiederholungen und Monitoring bewusst geplant sind. Eine Middleware lohnt sich, wenn mehrere Salesforce Clouds und Agenten dieselben SAP-Daten nutzen."
draft: false
---

Zwischen Salesforce B2B Commerce und SAP fließen Daten in vier Richtungen. Stammdaten wie Accounts, Produkte, Preisbücher und Berechtigungen werden per Batch nach Salesforce übertragen. In Warenkorb und Checkout fragt der Shop über Commerce Extensions live bei SAP nach Preis, Verfügbarkeit und Kredit. Der fertige Auftrag geht an SAP. Auftragsbestätigung, Lieferung und Rechnung werden zurückgemeldet, damit Händler den Status im Shop sehen. SAP bleibt führend für Preise, Bestand, Kredit und den Auftrag. Salesforce bildet das Einkaufserlebnis ab und hält eine Kopie der Daten, die es dafür braucht. Die eigentliche Arbeit besteht darin, für jede Datenart zu entscheiden: kopieren oder live abfragen.

## Welche Daten fließen zwischen B2B Commerce und SAP?

Zu Beginn jeder Schnittstellendiskussion erstelle ich dieselbe Übersicht. Für einen typischen B2B-Shop auf Salesforce hat sie vier Blöcke:

| Daten | Richtung | Wann | Typischer Weg |
|---|---|---|---|
| Kundenstämme, Käufer, Produkte, Kategorien, Preisbücher, Käufergruppen, Berechtigungen | SAP nach Salesforce | Batch, nachts oder bei Änderung | Import-APIs, Middleware |
| Preis, Verfügbarkeit, Kredit, Steuer, Fracht | Shop fragt SAP | Live, in Warenkorb und Checkout | Commerce Extensions |
| Auftrag mit Bestellnummer, Lieferadresse, Wunschtermin | Salesforce nach SAP | Beim Absenden | Auftragsexport nach dem Checkout |
| Auftragsnummer, bestätigte Termine, Lieferung, Rechnung | SAP nach Salesforce | Bei Änderung | Order Summary und zugehörige Order Item Summaries; Lieferungen und Rechnungen brauchen ein eigenes Modell |

Die Tabelle sieht einfach aus. Die Entscheidungen stecken in der zweiten Spalte jeder Zeile: Welches System schreibt, und wie alt dürfen die Daten im Shop sein?

## Stammdaten kommen per Batch als Kopie

Kopieren Sie Daten, wo ein gewisses Datenalter vertretbar ist und der Shop weiterlaufen muss, wenn SAP langsam ist; fragen Sie live ab, wo die Antwort für den aktuellen Auftrag verbindlich sein muss. Kopiert werden also meist SAP-Kundenstämme, die in Salesforce zu Accounts und Buyer Accounts werden, Ansprechpartner, die zu Käufern werden, Materialien, die zu Produkten werden, Produkthierarchien, die zu Kategorien werden, und die Preise für den Shop.

Für Produkte bietet Salesforce eine [Produktimport-API](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-import-apis.html). Sie liest eine CSV-Datei, deren Spaltenüberschriften Produkt-, Kategorie- und Preisbuchinformationen zugeordnet sind, und läuft als asynchroner Job mit abfragbarem Status. Preisbücher werden über die Import-Einstellungen desselben Jobs zugeordnet. Das reicht für die Erstbefüllung und für regelmäßige Updates aus einer Middleware, die die Datei schreibt.

Käufergruppen (Buyer Groups) und Entitlement Policies, also die Regeln, wer welches Produkt sieht, stehen selten so in SAP. Sie müssen abgeleitet werden, zum Beispiel aus Verkaufsorganisation, Kundengruppe oder Marke. Schreiben Sie diese Ableitung als Regel auf. Sonst pflegt jemand die Käufergruppen von Hand in Salesforce, und der Shop weicht innerhalb weniger Monate von SAP ab.

Wem welches Objekt gehört, beantwortet meine [Object Ownership Matrix](/blog/object-ownership-matrix-salesforce/). Für einen Shop ergänze ich eine Spalte: kopiert oder live.

## Preis, Bestand, Steuer und Fracht live über Extension Points

Salesforce B2B Commerce hat benannte Extension Points, an denen eigener Apex-Code einen Dienst übernimmt. Die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) zeigt die für SAP wichtigen:

- **Commerce_Domain_Pricing_Service** für Preise. Standardmäßig nutzt er Salesforce-Preisbücher.
- **Commerce_Domain_Inventory_Service** für Bestand. Standardmäßig nutzt er Omnichannel Inventory.
- **Commerce_Domain_Tax_CartCalculator** und **Commerce_Domain_Shipping_CartCalculator** für Steuer und Fracht. Ohne Anpassung berechnet der Shop gar keine Fracht.
- **Commerce_Domain_Checkout_PlaceOrder** mit der Methode `validate` ist der Ort für eine Kreditprüfung oder die Prüfung auf eine Auftragssperre direkt vor dem Absenden.
- **Commerce_Domain_Checkout_CreateOrder**, der aus dem Warenkorb den Auftrag erzeugt.

Jede Extension kann SAP live aufrufen. Jeder Live-Aufruf bedeutet aber Wartezeit für den Händler, Last auf SAP und eine Frage, die niemand gern beantwortet: Was macht der Shop, wenn SAP nicht antwortet?

Meine Regel: Live abfragen, wo ein falscher Wert Geld oder Vertrauen kostet, alles andere kopieren. Vertragspreise aus der SAP-Konditionslogik gehören oft in die erste Gruppe, das behandle ich in [Kundenpreise in B2B Commerce](/blog/kundenpreise-b2b-commerce-preisbuecher-erp/). Bestand ist ein eigener Fall mit eigenem Artikel zu [Bestand live oder kopiert](/blog/bestand-b2b-shop-erp-live/). Die Kreditprüfung gehört in `validate`, bevor der Auftrag existiert, wie in [B2B-Checkout mit Bestellnummer](/blog/b2b-checkout-bestellnummer-rechnung/) beschrieben.

## Extensions oder die älteren Integrationen?

Die [Seite zur Integrationsarchitektur](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-integration-architecture.html) ist eindeutig: Seit Winter '24 bietet Salesforce Commerce Extensions für Preise, Bestand, Fracht, Steuer und weitere Dienste an und empfiehlt sie gegenüber dem älteren Checkout-Integrations-Framework. Das alte Framework wird weiter unterstützt, ein Abschaltdatum nennt die Seite nicht.

Eine Ausnahme gibt es. Laut [Extensions-Leitfaden](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) lassen sich Zahlungen noch nicht per Extension anpassen, für Zahlungen bleibt das ältere Integrationsframework der Weg. Mit SAP hat das selten zu tun, weil Händler meist auf Rechnung mit Bestellnummer kaufen.

Für neue Shops würde ich jeden synchronen SAP-Aufruf im Warenkorb und Checkout, etwa für Preis, Bestand, Steuer und die Auftragsprüfung, als Extension bauen. Batch-Importe, der Auftragsexport und Rückmeldungen aus SAP nutzen Import-APIs, Middleware oder andere Integrationsmuster. Registrierung und Zuordnung zum Store erfolgen über die Salesforce CLI und können damit im Repository und in der Pipeline liegen. Mehr dazu in [Commerce Extensions: Eigenentwicklung, die Updates übersteht](/blog/commerce-extensions-eigenentwicklung/).

## Wie kommt der Auftrag zu SAP, und was kommt zurück?

Sendet der Händler die Bestellung ab, legt B2B Commerce in Salesforce einen Auftrag und eine Order Summary an. Die Order Summary hat ein Feld `OrderLifeCycleType`. Laut [Developer Guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html) kennzeichnet "unmanaged" eine von B2B Commerce angelegte Summary, deren Lebenszyklus ein externes System steuert, und Änderungen dort "must be reflected in Salesforce". B2B Commerce legt standardmäßig Unmanaged Orders an. Der Lifecycle-Typ lässt sich nach Anlage der Summary nicht mehr ändern, und die meisten Funktionen von Salesforce Order Management greifen bei Unmanaged Orders nicht. Entscheiden Sie also früh, wem der Auftrag gehört.

Bei SAP-Anbindungen ist eine Unmanaged Order der Normalfall. Der Auftrag wird exportiert, SAP legt den Kundenauftrag an, und die Schnittstelle schreibt den Status zurück. Behandeln Sie den Auftragsexport als eigenen Integrationsprozess, meist asynchron nach Anlage des Salesforce-Auftrags, mit Wiederholungslogik, einer Dublettenprüfung, die verhindert, dass SAP den Auftrag doppelt anlegt, und einer Regel für Aufträge, die SAP ablehnt:

```ablauf
sf: Checkout, Order Summary
erp: Kredit und Preis, Kundenauftrag, Lieferung und Rechnung
Checkout --live abfragen--> Kredit und Preis
Checkout --> Order Summary
Order Summary --Auftrag raus--> Kundenauftrag
Kundenauftrag --> Lieferung und Rechnung
Kundenauftrag ..Nummer, Termine..> Order Summary
Lieferung und Rechnung ..Status zurück..> Order Summary
```

Nutzer mit einer der Berechtigungen B2B Commerce Integrator User oder Edit Unmanaged Order Summaries dürfen unterstützte Felder dieser Summaries und verknüpfter Datensätze aktualisieren. Auftragsnummer und Bestätigung lassen sich auf der Order Summary abbilden; mehrere Lieferungen mit Sendungsverfolgung oder Teilrechnungen brauchen eigene Objekte oder einen Link zu den SAP-Belegen. Wem der Auftrag gehören sollte und wann Salesforce Order Management stattdessen sinnvoll ist, steht in [Shop-Bestellungen ins ERP](/blog/shop-bestellungen-erp-auftrag/).

Planen Sie den Rückweg so sorgfältig wie den Hinweg. Ein Händler, der drei Tage lang "Bestellung eingegangen" sieht, ruft im Innendienst an, und der Shop hat keine Arbeit erspart.

## Middleware oder direkte Callouts?

MuleSoft bietet einen [Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/) für SAP ECC, S/4HANA und Salesforce. Er liefert wiederverwendbare SAP- und Salesforce-APIs, etwa für Kunden, Produkte, Aufträge, Preise und Verfügbarkeit, und Vorlagen, darunter einen Quote-to-Cash-Anwendungsfall zwischen Sales Cloud und S/4HANA und einen für B2B-EDI. Eine fertige Anbindung für einen B2B-Commerce-Store enthält er nicht; die Shop-Anbindung bleibt Ihre Aufgabe.

Direkte Apex-Callouts mit Named Credentials können für einen Shop mit wenigen schnellen Live-Abfragen reichen, wenn Timeouts, Wiederholungen und Monitoring bewusst geplant sind; Apex bietet keine garantierte Zustellung und hat standardmäßig ein Timeout von zehn Sekunden pro Callout. Der Auftragsexport profitiert auch bei einem einzelnen Shop oft von einem asynchronen Muster mit Warteschlange. Eine Middleware lohnt sich, wenn dieselben SAP-Daten auch Field Service, Manufacturing Cloud oder Agentforce-Agenten versorgen. Dann bedient eine Auftragsstatus-API den Shop, den [Auftragsstatus-Agenten](/blog/agentforce-sap-auftragsstatus/) und den Service. Warum Agenten solche APIs mitnutzen sollten, statt eigene APIs zu erhalten, erklärt die KI-Masterclass im Kapitel [MCP und Schnittstellen](/masterclass/ki-salesforce/mcp-und-schnittstellen/).

```hinweis achtung
Eine Frist gilt für viele Batch-Schnittstellen. Salesforce schaltet den [OAuth Username-Password Flow](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5) für Connected Apps am 20. Februar 2027 ab. Ein nächtlicher Produktimport mit diesem Flow erhält dann kein Access Token mehr. Für Server-zu-Server-Schnittstellen empfiehlt Salesforce den Client Credentials Flow. Anmeldungen über SOAP `login()` folgen einem eigenen Zeitplan und brauchen eine eigene Prüfung. Wie Sie diese Schnittstellen finden und umstellen, steht in [Passwort-Integrationen enden 2027](/blog/salesforce-passwort-integrationen-2027/).
```

## Rechenbeispiel: S/4HANA und 300 Händler in Europa

Ein Maschinenbauer arbeitet mit SAP S/4HANA und will einen Shop für 300 Händler in Europa mit 15.000 Ersatzteilen. Die Schnittstellenliste nach dem ersten Workshop könnte so aussehen:

1. Kundenstamm zu Accounts und Buyer Accounts, nachts.
2. Materialien und Produkthierarchie zu Produkten und Kategorien, nachts, über den Produktimport.
3. Listen- und Händlerstaffelpreise in Preisbücher, nachts.
4. Vertragspreise der 40 größten Händler live über die Pricing-Extension.
5. Bestandsstatus stündlich kopiert, bestätigter Termin live im Checkout.
6. Kreditprüfung und Auftragssperre live in `validate`.
7. Auftrag an SAP, Auftragsnummer und Status binnen Minuten zurück, Lieferungen und Rechnungen bei Änderung.

Es sind sieben Datenflüsse, drei davon mit Live-Abfragen, umgesetzt in mehr als sieben technischen Schnittstellen, wenn Erstbeladung, Deltas und Fehlerbehandlung mitzählen. In diesem Beispiel ist das ein überschaubarer Umfang für ein erstes Release, und jeder Fluss braucht einen Verantwortlichen auf Kundenseite.

## Erster Schritt: Object Ownership Matrix und Schnittstellenliste

Schreiben Sie die Object Ownership Matrix und die Schnittstellenliste, bevor jemand die Shopseiten entwirft. Notieren Sie für jede Datenart das führende System, ob die Daten kopiert oder live abgefragt werden, das maximale Alter und was passiert, wenn SAP nicht erreichbar ist. Das [Kapitel zur ERP-Anbindung der Masterclass B2B Commerce](/masterclass/b2b-commerce/erp-integration-bestand-auftraege/) bringt diese Entscheidungen in eine Reihenfolge, und eine unabhängige Prüfung von Schnittstellen gehört zu meiner Arbeit bei [Salesforce-Schnittstellen](/leistungen/salesforce-schnittstellen/).
