---
title: "B2B Commerce und SAP: Welche Daten fließen wohin?"
description: "Welche Daten zwischen Salesforce B2B Commerce und SAP fließen: Stammdaten per Batch, Live-Abfragen in Warenkorb und Checkout, Auftrag raus, Status zurück."
pubDate: 2026-10-28
lang: de
slug: b2b-commerce-sap-datenfluesse
translationKey: commerce-sap-data-flows
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: integration
tags: [B2B Commerce, SAP, ERP-Anbindung, Commerce Extensions, MuleSoft, Schnittstellen]
takeaways:
  - "Zwischen Salesforce B2B Commerce und SAP fließen Daten in vier Richtungen: Stammdaten per Batch, Live-Abfragen in Warenkorb und Checkout, der Auftrag raus, Status, Lieferung und Rechnung zurück."
  - "Accounts, Produkte, Kategorien, Preisbücher und Berechtigungen werden nach Salesforce kopiert; der Produktimport liest CSV-Dateien mit Produkt-, Kategorie- und Preisbuchspalten als asynchronen Job."
  - "Preis, Bestand, Steuer, Fracht und die Prüfung vor dem Absenden laufen über Commerce-Extension-Points wie Commerce_Domain_Pricing_Service und Commerce_Domain_Checkout_PlaceOrder."
  - "Salesforce empfiehlt seit Winter '24 Extensions statt der älteren Checkout-Integrationen; das alte Framework wird weiter unterstützt, Zahlungen lassen sich nicht per Extension anpassen."
  - "Jede Schnittstelle, die sich noch mit Benutzername und Passwort bei Salesforce anmeldet, muss vor dem 20. Februar 2027 auf einen anderen OAuth-Flow umgestellt werden."
faq:
  - q: "Welche Daten braucht Salesforce B2B Commerce aus SAP?"
    a: "Kundenstämme, Produkte mit Kategorien, Preise und die Regeln, wer welches Produkt sehen darf, dazu Live-Antworten zu Preis, Verfügbarkeit und Kredit im Checkout. Nach der Bestellung braucht der Shop die SAP-Auftragsnummer, den Lieferstatus und die Rechnungen zurück."
  - q: "Gibt es einen Standard-Konnektor zwischen B2B Commerce und SAP?"
    a: "Ein solcher Konnektor gehört nicht zu B2B Commerce. MuleSoft bietet einen Accelerator for SAP mit einem Quote-to-Cash-Anwendungsfall zwischen Sales Cloud und S/4HANA als Startpunkt für APIs. Die Shop-Seite bauen Sie mit Commerce Extensions und Import-APIs."
  - q: "Sollen Preise und Bestand nach Salesforce kopiert oder live aus SAP abgefragt werden?"
    a: "Das entscheiden Sie pro Datum. Eine Kopie ist schnell und hält den Shop am Laufen, wenn SAP steht, eine Live-Abfrage ist genau, kostet aber Wartezeit und Last. Ich kopiere, was sich selten ändert, und frage live ab, wo ein falscher Wert Geld kostet."
  - q: "Brauche ich MuleSoft für B2B Commerce und SAP?"
    a: "Für wenige Schnittstellen nicht. Direkte Apex-Callouts mit Named Credentials reichen für einen Shop mit zwei oder drei Live-Abfragen. Eine Middleware lohnt sich, wenn mehrere Salesforce Clouds und Agenten dieselben SAP-Daten nutzen."
draft: false
---

Zwischen Salesforce B2B Commerce und SAP fließen Daten in vier Richtungen. Stammdaten wie Accounts, Produkte, Preisbücher und Berechtigungen kommen per Batch nach Salesforce. In Warenkorb und Checkout fragt der Shop über Commerce Extensions live bei SAP nach Preis, Verfügbarkeit und Kredit. Der fertige Auftrag geht an SAP. Auftragsbestätigung, Lieferung und Rechnung kommen zurück, damit Händler den Status im Shop sehen. SAP bleibt führend für Preise, Bestand, Kredit und den Auftrag. Salesforce hält das Einkaufserlebnis und eine Kopie dessen, was es dafür braucht. Die eigentliche Arbeit ist die Entscheidung pro Datum: kopieren oder live abfragen.

## Welche Daten fließen zwischen B2B Commerce und SAP?

Am Anfang jeder Schnittstellendiskussion zeichne ich dieselbe Landkarte. Für einen typischen B2B-Shop auf Salesforce hat sie vier Blöcke:

| Daten | Richtung | Wann | Typischer Weg |
|---|---|---|---|
| Kundenstämme, Käufer, Produkte, Kategorien, Preisbücher, Käufergruppen, Berechtigungen | SAP nach Salesforce | Batch, nachts oder bei Änderung | Import-APIs, Middleware |
| Preis, Verfügbarkeit, Kredit, Steuer, Fracht | Shop fragt SAP | Live, in Warenkorb und Checkout | Commerce Extensions |
| Auftrag mit Bestellnummer, Lieferadresse, Wunschtermin | Salesforce nach SAP | Beim Absenden | Auftragsexport nach dem Checkout |
| Auftragsnummer, bestätigte Termine, Lieferung, Rechnung | SAP nach Salesforce | Bei Änderung | Update der Order Summary |

Die Tabelle sieht einfach aus. Die Entscheidungen stecken in der zweiten Spalte jeder Zeile: Welches System schreibt, und wie alt dürfen die Daten im Shop sein?

Zum Namen: Salesforce vermarktet das Produkt inzwischen auch als "Agentforce Commerce for B2B". An der Integrationsarchitektur ändert das nichts.

## Welche Stammdaten kommen per Batch?

Alles, was sich seltener ändert, als ein Händler klickt, gehört in eine Kopie. Das sind SAP-Kundenstämme, die in Salesforce zu Accounts und Buyer Accounts werden, Ansprechpartner, die zu Käufern werden, Materialien, die zu Produkten werden, Produkthierarchien, die zu Kategorien werden, und die Preise für den Shop.

Für Produkte bietet Salesforce eine [Produktimport-API](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-import-apis.html). Sie liest eine CSV-Datei, deren Spaltenüberschriften auf Produkt-, Kategorie- und Preisbuchinformationen zeigen, und läuft als asynchroner Job mit abfragbarem Status. Preisbücher werden über die Import-Einstellungen desselben Jobs zugeordnet. Das reicht für die Erstbefüllung und für regelmäßige Updates aus einer Middleware, die die Datei schreibt.

Käufergruppen (Buyer Groups) und Entitlement Policies, also die Regeln, wer welches Produkt sieht, stehen selten so in SAP. Sie müssen abgeleitet werden, zum Beispiel aus Verkaufsorganisation, Kundengruppe oder Marke. Schreiben Sie diese Ableitung als Regel auf. Sonst pflegt jemand die Käufergruppen von Hand in Salesforce, und der Shop läuft SAP innerhalb weniger Monate davon.

Wem welches Objekt gehört, beantwortet meine [Object Ownership Matrix](../object-ownership-matrix-salesforce/). Für einen Shop ergänze ich eine Spalte: kopiert oder live.

## Was sollte der Shop live bei SAP abfragen?

Salesforce B2B Commerce hat benannte Extension Points, an denen eigener Apex-Code einen Dienst übernimmt. Die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) zeigt die für SAP wichtigen:

- **Commerce_Domain_Pricing_Service** für Preise. Standardmäßig nutzt er Salesforce-Preisbücher.
- **Commerce_Domain_Inventory_Service** für Bestand. Standardmäßig nutzt er Omnichannel Inventory.
- **Commerce_Domain_Tax_CartCalculator** und **Commerce_Domain_Shipping_CartCalculator** für Steuer und Fracht. Ohne Anpassung berechnet der Shop gar keine Fracht.
- **Commerce_Domain_Checkout_PlaceOrder** mit der Methode `validate`, der Ort für eine Kredit- oder Liefersperrenprüfung direkt vor dem Absenden.
- **Commerce_Domain_Checkout_CreateOrder**, der aus dem Warenkorb den Auftrag erzeugt.

Jede Extension kann SAP live aufrufen. Jeder Live-Aufruf bedeutet aber Wartezeit für den Händler, Last auf SAP und eine Frage, die niemand gern beantwortet: Was macht der Shop, wenn SAP nicht antwortet?

Meine Regel: Live abfragen, wo ein falscher Wert Geld oder Vertrauen kostet, alles andere kopieren. Vertragspreise aus der SAP-Konditionslogik gehören oft in die erste Gruppe, das behandle ich in [Kundenpreise in B2B Commerce](../kundenpreise-b2b-commerce-preisbuecher-erp/). Bestand ist ein eigener Fall mit eigenem Artikel zu [Bestand live oder kopiert](../bestand-b2b-shop-erp-live/). Die Kreditprüfung gehört in `validate`, bevor der Auftrag existiert, wie in [B2B-Checkout mit Bestellnummer](../b2b-checkout-bestellnummer-rechnung/) beschrieben.

## Extensions oder die älteren Integrationen?

Die [Seite zur Integrationsarchitektur](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-integration-architecture.html) ist eindeutig: Seit Winter '24 bietet Salesforce Commerce Extensions für Preise, Bestand, Fracht, Steuer und weitere Dienste an und empfiehlt sie gegenüber dem älteren Checkout-Integrations-Framework. Das alte Framework wird weiter unterstützt, ein Abschaltdatum nennt die Seite nicht.

Eine Ausnahme gibt es. Laut [Extensions-Leitfaden](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) lassen sich Zahlungen noch nicht per Extension anpassen, dafür bleiben die Integrationen der Weg. Mit SAP hat das selten zu tun, weil Händler meist auf Rechnung mit Bestellnummer kaufen.

Für neue Shops würde ich jeden SAP-Aufruf als Extension bauen. Registrierung und Zuordnung zum Store laufen über die Salesforce CLI und können damit im Repository und in der Pipeline liegen. Mehr dazu in [Commerce Extensions: Eigenentwicklung, die Updates übersteht](../commerce-extensions-eigenentwicklung/).

## Wie kommt der Auftrag zu SAP, und was kommt zurück?

Sendet der Händler die Bestellung ab, legt B2B Commerce in Salesforce einen Auftrag und eine Order Summary an. Die Order Summary hat ein Feld `OrderLifeCycleType`. Laut [Developer Guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html) kennzeichnet "unmanaged" eine von B2B Commerce angelegte Summary, deren Lebenszyklus in einem externen System läuft, und Änderungen dort "must be reflected in Salesforce".

Mit SAP ist das der Normalfall. Der Auftrag geht raus, SAP legt den Kundenauftrag an, und die Schnittstelle schreibt den Status zurück:

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

Nutzer mit der Berechtigung B2B Commerce Integrator User oder Edit Unmanaged Order Summaries dürfen diese Summaries aktualisieren. Wem der Auftrag gehören sollte und wann Salesforce Order Management stattdessen sinnvoll ist, steht in [Shop-Bestellungen ins ERP](../shop-bestellungen-erp-auftrag/).

Planen Sie den Rückweg so sorgfältig wie den Hinweg. Ein Händler, der drei Tage lang "Bestellung eingegangen" sieht, ruft im Innendienst an, und der Shop hat nichts gespart.

## Middleware oder direkte Callouts?

MuleSoft bietet einen [Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/) für SAP ECC, S/4HANA und Salesforce. Sein Quote-to-Cash-Anwendungsfall synchronisiert Auftrags-, Bestands- und Kundendaten zwischen Sales Cloud und S/4HANA, ein zweiter Anwendungsfall deckt B2B-EDI ab. Sie bekommen damit API-Vorlagen als Startpunkt. Eine fertige Anbindung für einen B2B-Commerce-Store enthält er nicht, die Shop-Seite bleibt Ihre Arbeit.

Direkte Apex-Callouts mit Named Credentials reichen für einen Shop mit zwei oder drei Live-Abfragen und einem Auftragsexport. Eine Middleware lohnt sich, wenn dieselben SAP-Daten auch Field Service, Manufacturing Cloud oder Agentforce-Agenten versorgen. Dann bedient eine Auftragsstatus-API den Shop, den [Auftragsstatus-Agenten](../agentforce-sap-auftragsstatus/) und den Service. Warum Agenten solche APIs mitnutzen sollten, statt eigene zu bekommen, erklärt die KI-Masterclass im Kapitel [MCP und Schnittstellen](../../masterclass/ki-salesforce/mcp-und-schnittstellen/).

```hinweis achtung
Eine Frist gilt für jede Batch-Schnittstelle. Salesforce schaltet den [OAuth Username-Password Flow](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5) für Connected Apps am 20. Februar 2027 ab. Ein nächtlicher Produktimport, der sich mit Passwort anmeldet, läuft dann nicht mehr, oft ohne dass es jemand merkt. Wie Sie diese Schnittstellen finden und umstellen, steht in [Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/).
```

## Ein typisches Szenario, als Annahme

Ein Maschinenbauer arbeitet mit SAP S/4HANA und will einen Shop für 300 Händler in Europa mit 15.000 Ersatzteilen. Die Schnittstellenliste nach dem ersten Workshop könnte so aussehen:

1. Kundenstamm zu Accounts und Buyer Accounts, nachts.
2. Materialien und Produkthierarchie zu Produkten und Kategorien, nachts, über den Produktimport.
3. Listen- und Händlerstaffelpreise in Preisbücher, nachts.
4. Vertragspreise der 40 größten Händler live über die Pricing-Extension.
5. Bestandsstatus stündlich kopiert, bestätigter Termin live im Checkout.
6. Kredit und Liefersperre live in `validate`.
7. Auftrag an SAP, Auftragsnummer und Status binnen Minuten zurück, Lieferungen und Rechnungen bei Änderung.

Sieben Schnittstellen, drei davon live. Das ist ein realistischer Umfang für ein erstes Release, und jede davon braucht einen Verantwortlichen auf Kundenseite.

## Wo starten Sie?

Schreiben Sie Object Ownership Matrix und Schnittstellenliste, bevor jemand die Shopseiten entwirft. Notieren Sie für jedes Datum das führende System, Kopie oder live, das maximale Alter und was passiert, wenn SAP nicht erreichbar ist. Das [Kapitel zur ERP-Anbindung der Masterclass B2B Commerce](../../masterclass/b2b-commerce/erp-integration-bestand-auftraege/) bringt diese Entscheidungen in eine Reihenfolge, und eine unabhängige Prüfung von Schnittstellen gehört zu meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Ein B2B-Shop ist nur so gut wie seine Datenflüsse aus SAP, also entscheiden Sie diese zuerst; wenn Sie eine zweite Meinung zu Ihrer Schnittstellenliste möchten, [schreiben Sie mir](#contact).
