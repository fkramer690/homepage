---
title: "Commerce Extensions: Eigenentwicklung, die Updates übersteht"
description: "Wie Sie eigene Preis-, Bestands- und Checkout-Logik in Salesforce B2B Commerce als Extensions bauen, damit sie Releases und einen Partnerwechsel übersteht."
pubDate: 2026-10-28
lang: de
slug: commerce-extensions-eigenentwicklung
translationKey: commerce-extensions-custom-code
topic: commerce
categories: [b2b-commerce, devops]
tags: [B2B Commerce, Extensions, Apex, SFDX, Release-Management, Partnersteuerung]
takeaways:
  - "Commerce Extensions sind Apex-Klassen, die sich an benannten Erweiterungspunkten von Salesforce B2B Commerce einklinken, etwa bei Preisen, Bestand, Steuer, Versand oder Auftragsanlage."
  - "Domain Extensions können einen ganzen Dienst erweitern oder ersetzen, Endpoint Extensions ändern nur Anfrage oder Antwort eines Connect-API-Endpunkts und können ihn nicht ersetzen."
  - "Salesforce empfiehlt ausdrücklich, in Domain Extensions super() aufzurufen, damit Ihr Code den Standard ergänzt und nicht nachbaut und spätere Releases weiter ankommen."
  - "Extensions sind der bevorzugte Weg, Salesforce Commerce anzupassen, ältere Integrationen werden weiter unterstützt, und Zahlungen lassen sich nicht per Extension anpassen."
  - "Extension-Klassen, ihre Registrierung und ihr Mapping auf den Store gehören in Repository und Pipeline des Kunden, damit jeder Partner sie übernehmen kann."
faq:
  - q: "Was sind Salesforce Commerce Extensions?"
    a: "Apex-Klassen, sogenannte Extension Provider, die Salesforce an benannten Erweiterungspunkten von B2B Commerce ausführt. Sie ändern, wie Preise, Bestand, Steuer, Versand, Checkout oder einzelne Connect-API-Endpunkte arbeiten, ohne den Store zu ersetzen."
  - q: "Was unterscheidet eine Domain Extension von einer Endpoint Extension?"
    a: "Eine Domain Extension arbeitet auf einem fachlichen Bereich wie Preisen und kann den Standarddienst erweitern oder ersetzen, was mehrere API-Endpunkte betreffen kann. Eine Endpoint Extension ändert Anfrage oder Antwort eines einzelnen Connect-API-Endpunkts und kann dessen Standardverhalten nicht ersetzen."
  - q: "Wie werden Commerce Extensions registriert?"
    a: "Salesforce empfiehlt die Salesforce CLI mit dem Commerce-Plug-in: sf commerce:extension:register registriert die Apex-Klasse, sf commerce:extension:map ordnet sie einem Store zu. Alternativ gehen die Objekte RegisteredExternalService und StoreIntegratedService oder die Connect API."
  - q: "Kann man Zahlungen mit einer Commerce Extension anpassen?"
    a: "Nein. Salesforce schreibt, dass Zahlungen derzeit nicht per Extension angepasst werden können. Payment Gateways werden stattdessen über eine eigene Zahlungsintegration angebunden."
  - q: "Sollten wir alte Checkout-Integrationen auf Extensions umbauen?"
    a: "Salesforce nennt Extensions den bevorzugten Weg und schreibt, dass Integrationen voll unterstützt bleiben. Ich würde umbauen, wenn der Code ohnehin geändert werden muss, nicht als eigenes Projekt."
draft: false
---

Eigene Shop-Logik in Salesforce B2B Commerce übersteht Releases, wenn sie als Commerce Extensions gebaut ist, die den Standard ergänzen statt ihn zu ersetzen. Extensions sind Apex-Klassen, die Salesforce an benannten Erweiterungspunkten wie Preis, Bestand oder Auftragsanlage ausführt. Domain Extensions sollten `super()` aufrufen, wie Salesforce ausdrücklich empfiehlt: Dann läuft der Standarddienst weiter, und Ihr Code ergänzt nur, was bei Ihnen anders ist. Endpoint Extensions ändern Anfrage oder Antwort einer API. Zahlungen sind nicht erweiterbar. Die zweite Hälfte der Antwort ist Eigentum: Code, Registrierung und Mapping gehören in Ihr Repository und Ihre Pipeline, nicht in die eines Partners.

## Was sind Commerce Extensions?

Salesforce beschreibt [Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) als Mechanismus, mit Apex die Funktionen anzupassen, die B2B- und B2C-Storefronts antreiben. Die Apex-Klasse heißt Extension Provider. Erreicht eine Käuferaktion, ein Connect-API-Aufruf oder eine andere Extension einen Erweiterungspunkt, prüft die Plattform, ob dem Namen dieses Erweiterungspunkts ein Provider zugeordnet ist, und führt ihn aus.

Das gilt für Salesforce B2B Commerce auf der Core-Plattform, das Salesforce inzwischen auch als Agentforce Commerce for B2B vermarktet. Die getrennte B2C-Commerce-Architektur nutzt stattdessen Hooks, ein Team mit B2C-Erfahrung findet dort also nicht denselben Mechanismus.

Es gibt zwei Arten:

- **Domain Extensions** gehören zu einem fachlichen Bereich. Ein Provider kann das Standardverhalten erweitern oder ersetzen, und eine Änderung kann mehrere Endpunkte betreffen. Beispiel: Ein Preis-Provider erweitert `commercestorepricing.PricingService` und überschreibt `processPrice` für Produktlisten und Detailseiten sowie `processTransactionalPrice` für Warenkorb und Checkout.
- **Endpoint Extensions** gehören zu einer Connect-API-Ressource. Der Provider erweitert `ConnectApi.BaseEndpointExtension` und kann die Anfrage vor und die Antwort nach dem Aufruf ändern. Er kann das Standardverhalten nicht ersetzen und kein `super()` aufrufen.

## Welche Erweiterungspunkte gibt es?

Die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) ist kurz genug, um sie ganz zu lesen. Für einen Hersteller mit SAP oder einem anderen ERP zählen vor allem diese:

| Bedarf | Erweiterungspunkt |
|---|---|
| Kundenpreis aus dem ERP | `Commerce_Domain_Pricing_Service`, `Commerce_Domain_Pricing_CartCalculator` |
| Bestand oder Verfügbarkeit aus dem ERP | `Commerce_Domain_Inventory_Service`, `Commerce_Domain_Inventory_CartCalculator` |
| Steuer und Versand | `Commerce_Domain_Tax_Service`, `Commerce_Domain_Tax_CartCalculator`, `Commerce_Domain_Shipping_CartCalculator` |
| Kreditlimit oder Sperren vor der Bestellung prüfen | `Commerce_Domain_Checkout_PlaceOrder` |
| Auftragsdatensatz formen | `Commerce_Domain_Checkout_CreateOrder` |
| Eigene Zuordnung zu Käufergruppen | `Commerce_Domain_BuyerGroup_EvaluationService` |
| Produkte und Suchergebnisse filtern oder anreichern | `Commerce_Endpoint_Catalog_Products`, `Commerce_Endpoint_Search_ProductSearch` |

Die Seite nennt auch die Standards, die Sie ersetzen: Bestand kommt aus Omnichannel Inventory, Preise aus Salesforce-Preisbüchern, Steuer aus dem Salesforce-Steuerdienst, und Versand kostet nichts, bis Sie ihn erweitern. Ein Detail von derselben Seite: Nutzt der Store Faster Add-to-Cart, braucht jedes Produkt einen Eintrag in einem Store-Preisbuch, bevor Sie die Preis-Extension umsetzen, auch wenn der echte Preis später aus dem ERP kommt.

Welche Daten live aus dem ERP kommen und welche nach Salesforce kopiert werden, ist eine eigene Designentscheidung. Sie steht in [B2B Commerce und SAP: Welche Daten fließen wohin?](../b2b-commerce-sap-datenfluesse/).

## Warum sollte eine Domain Extension super() aufrufen?

Salesforce schreibt, man empfehle ausdrücklich, `super()` aufzurufen, um die Kompatibilität mit der Plattform zu sichern. In der Praxis gibt es drei Arten, einen Domain Provider zu schreiben:

1. Die Methode komplett ersetzen, ohne `super()`.
2. `super()` aufrufen und das Ergebnis anpassen, etwa einen ERP-Rabatt auf den Standardpreis anwenden.
3. Vor `super()` etwas tun, etwa die ERP-Kundennummer des Käufers lesen, und dann den Standard laufen lassen.

Variante 2 und 3 überstehen Releases besser. Ergänzt Salesforce den Standarddienst, etwa um ein neues Feld oder eine Promotion-Funktion, bekommt ein Provider mit `super()` das automatisch. Ein Provider, der alles ersetzt, hat den Standard still auf dem Stand des Tages eingefroren, an dem er geschrieben wurde. Bei einem Review von Partnercode wäre ein kompletter Ersatz ohne `super()` meine erste Frage. Manchmal ist er begründet, etwa wenn das ERP der einzige Preis-Master ist, aber dann gehört die Begründung in den Code und ins Architektur-Entscheidungslog.

Beim Testen gibt es einen Haken. Die Basisklassen liegen in einem Salesforce-Namespace, und der [Guide zum Mocken der Basisklasse](https://developer.salesforce.com/docs/commerce/extensions/guide/mock-the-base-apex-class.html) erklärt, dass das Apex-Testframework nicht über Namespaces hinweg mocken kann. Das dokumentierte Muster: den Provider `virtual` machen, den `super()`-Aufruf in eine eigene `@TestVisible`-Methode legen und diese im Test in einer Unterklasse überschreiben. ERP-Aufrufe werden mit `HttpCalloutMock` simuliert, wie im Guide zum [Testen eines Extension Providers](https://developer.salesforce.com/docs/commerce/extensions/guide/write-tests-for-an-extension-provider.html) beschrieben. Liefert ein Partner Extensions ohne diese Tests, ist die Testabdeckung meist durch Aufrufe ohne echte Prüfungen erreicht.

## Extensions oder die älteren Integrationen?

Vor den Extensions wurde Checkout-Logik über Integrationen angebunden: ein Apex-Interface, das einen Calculator ersetzt. Salesforce schreibt heute, Extensions seien der bevorzugte Weg, Salesforce Commerce anzupassen, und Integrationen blieben voll unterstützt. Extensions decken mehr ab, mit fünf Warenkorb-Calculators plus Preisdienst und weiteren Diensten, wo Integrationen vier Checkout-Calculators hatten.

Meine Regel: Neue Logik kommt in Extensions. Bestehende Integrationen bleiben, bis der Code sich ohnehin ändern muss, etwa weil sich die ERP-Schnittstelle ändert oder der Store von Aura auf LWR wechselt. Funktionierende Integrationen nur umzuschreiben, weil es einen neueren Mechanismus gibt, lohnt sich selten.

Zahlungen sind die Ausnahme. Salesforce schreibt: Zahlungen können derzeit nicht per Extension angepasst werden. Payment Gateways behalten ihren eigenen Adapter, siehe [B2B-Checkout: Bestellnummer, Karte oder Rechnung?](../b2b-checkout-bestellnummer-rechnung/).

## Wie überstehen Extensions einen Partnerwechsel?

Registrierung und Mapping sind zwei getrennte Schritte, und beide sind Konfiguration, die jemand in jeder Umgebung nachbauen muss. Salesforce empfiehlt die CLI: `sf plugins install @salesforce/commerce`, dann `sf commerce:extension:register` für die Klasse und `sf commerce:extension:map` für den Store. Dasselbe geht über die Objekte `RegisteredExternalService` und `StoreIntegratedService` oder die Connect API, und die Shop-Verantwortlichen können Domain Extensions in der Administrationsoberfläche zuordnen.

Diese letzte Möglichkeit ist das Risiko. Ein Mapping, das von Hand in Produktion geändert wurde, ist in Git unsichtbar. Ein typisches Szenario, als Annahme: Ein Partner ordnet in Produktion direkt einen neuen Preis-Provider zu, um einen dringenden Preisfehler zu beheben. Die Änderung kommt nie ins Repository, und das nächste Deployment aus der Pipeline ordnet wieder den alten Provider zu. Niemand merkt es, bis Händler sich über falsche Preise beschweren.

Was ich in Vertrag und Pipeline festlegen würde:

- Extension-Klassen, Tests und die Befehle für Registrierung und Mapping liegen im Repository des Kunden, wie ich es in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) begründe.
- Die Pipeline führt die CLI-Befehle pro Umgebung aus, damit Mappings reproduzierbar sind. Salesforce weist darauf hin, dass für Extensions die neueste Salesforce CLI nötig ist, also legen Sie die CLI-Version fest und heben sie bewusst an.
- Jede Änderung an einer Extension läuft durch ein [Pull-Request-Review](../warum-pull-request-reviews-pflicht-sind/), das `super()`, Timeouts der ERP-Aufrufe und echte Prüfungen in den Tests kontrolliert.
- Manuelles Mapping in Produktion bleibt Notfällen vorbehalten, und am selben Tag folgt ein Commit.

Wie Store-Konfiguration mit den Metadaten wandert, beschreibt die DevOps-Masterclass im Kapitel [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/), den Aufbau der Pipeline im Kapitel [Pipeline aufbauen](../../masterclass/devops-release-management/pipeline-aufbauen/).

## Wo starten Sie?

Listen Sie jede eigene Logik in Ihrem Store auf und ordnen Sie sie einem Erweiterungspunkt, einer alten Integration oder einer eigenen Komponente zu. Markieren Sie jeden Domain Provider, der kein `super()` aufruft, und fragen Sie nach dem Grund. Prüfen Sie dann, ob sich Registrierung und Mapping aus dem Repository in einer frischen Sandbox wieder aufbauen lassen. Klappt das nicht, haben Sie Ihre größte Abhängigkeit vom aktuellen Partner gefunden. Die ERP-Seite derselben Entscheidungen ist Teil des Kapitels [ERP-Anbindung](../../masterclass/b2b-commerce/erp-integration-bestand-auftraege/), und dieselben Extensions bedienen auch eine [headless Storefront](../headless-b2b-commerce-eigenes-frontend/).

Extensions, die den Standard aufrufen und in Ihrer Pipeline leben, sind Eigenentwicklung, die Sie auch nach dem nächsten Release und dem nächsten Partner noch pflegen können; wenn Sie Ihre eigenen einmal prüfen lassen möchten, [schreiben Sie mir](#contact).
