---
title: "Commerce Extensions: Eigenentwicklung mit geringerem Releaserisiko"
description: "Wie Sie eigene Preis-, Bestands- und Checkout-Logik in Salesforce B2B Commerce als Extensions bauen, damit sie weniger Releaserisiko birgt und einen Partnerwechsel übersteht."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: commerce-extensions-eigenentwicklung
translationKey: commerce-extensions-custom-code
topic: commerce
categories: [b2b-commerce, devops]
tags: [B2B Commerce, Extensions, Apex, SFDX, Release-Management, Partnersteuerung]
takeaways:
  - "Commerce Extensions sind Apex-Klassen an benannten Erweiterungspunkten, etwa für Preise, Bestand, Steuer, Versand oder Auftragsanlage."
  - "Domain Extensions erweitern oder ersetzen einen ganzen Dienst. Endpoint Extensions ändern nur Anfrage oder Antwort eines Connect-API-Endpunkts."
  - "Verändert eine Domain Extension den Standard, empfiehlt Salesforce super(), damit Ergänzungen späterer Releases erhalten bleiben."
  - "Extensions sind der bevorzugte Weg. Cart Calculate Extensions und ältere Integrationen lassen sich in einem Store nicht mischen."
  - "Extension-Klassen, ihre Registrierung und ihr Mapping gehören in Repository und Pipeline des Kunden, damit jeder Partner sie übernehmen kann."
faq:
  - q: "Was sind Salesforce Commerce Extensions?"
    a: "Apex-Klassen, sogenannte Extension Provider, die Salesforce an benannten Erweiterungspunkten von B2B Commerce ausführt. Sie ändern, wie Preise, Bestand, Steuer, Versand, Checkout oder einzelne Connect-API-Endpunkte arbeiten, ohne den Store zu ersetzen."
  - q: "Was unterscheidet eine Domain Extension von einer Endpoint Extension?"
    a: "Eine Domain Extension arbeitet auf einem fachlichen Bereich wie Preisen und kann den Standarddienst erweitern oder ersetzen, was mehrere API-Endpunkte betreffen kann. Eine Endpoint Extension ändert Anfrage oder Antwort eines einzelnen Connect-API-Endpunkts und kann dessen Standardverhalten nicht ersetzen."
  - q: "Wie werden Commerce Extensions registriert?"
    a: "Salesforce empfiehlt die Salesforce CLI mit dem Commerce-Plug-in: sf commerce:extension:register registriert die Apex-Klasse, sf commerce:extension:map ordnet sie einem Store zu. Alternativ gehen die Objekte RegisteredExternalService und StoreIntegratedService oder die Connect API."
  - q: "Kann man Zahlungen mit einer Commerce Extension anpassen?"
    a: "Nein. Salesforce schreibt, dass Zahlungen derzeit nicht per Extension angepasst werden können. Payment Gateways werden stattdessen über eine eigene Zahlungsintegration angebunden."
  - q: "Können alte Checkout-Integrationen und Cart Calculate Extensions im selben Store laufen?"
    a: "Nein. Laut Salesforce ist die Cart Calculate API nicht mit Integrationen kompatibel: Ein Store nutzt entweder Extensions oder Integrationen. Ein ab Spring '24 erstellter LWR-Store muss Cart Calculate deaktivieren, um Integrationen zu behalten. Aura-Stores unterstützen Cart Calculate gar nicht. Integrationen bleiben voll unterstützt, deshalb würde ich wechseln, wenn der Code ohnehin geändert werden muss, und die Entscheidung für den ganzen Store treffen."
draft: false
---

Eigene Shop-Logik in Salesforce B2B Commerce birgt das geringste Releaserisiko, wenn sie als Commerce Extensions gebaut ist, die den Standard ergänzen statt ihn zu ersetzen. Extensions sind Apex-Klassen, die Salesforce an benannten Erweiterungspunkten wie Preis, Bestand oder Auftragsanlage ausführt. Domain Extensions, die den Standard verändern, sollten ihn über super() aufrufen, wie Salesforce ausdrücklich empfiehlt, und nur davor oder danach ergänzen, was bei Ihnen anders ist. Endpoint Extensions ändern Anfrage oder Antwort einer API. Zahlungen sind nicht erweiterbar. Die zweite Hälfte der Antwort ist Eigentum: Code, Registrierung und Mapping gehören in Ihr Repository und Ihre Pipeline, nicht in die eines Partners.

## Was sind Commerce Extensions?

Salesforce beschreibt [Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) als Mechanismus, mit Apex die Funktionen anzupassen, die B2B- und B2C-Storefronts antreiben. Die Apex-Klasse heißt Extension Provider. Erreicht eine Käuferaktion, ein Connect-API-Aufruf oder eine andere Extension einen Erweiterungspunkt, prüft die Plattform, ob dem Namen dieses Erweiterungspunkts ein Provider zugeordnet ist, und führt ihn aus.

Das gilt für Salesforce B2B Commerce auf der Core-Plattform, das zum Portfolio gehört, das Salesforce inzwischen als Agentforce Commerce vermarktet. Die Dokumentation spricht weiterhin von B2B Commerce. Die getrennte B2C-Commerce-Architektur nutzt stattdessen Hooks, ein Team mit B2C-Erfahrung findet dort also nicht denselben Mechanismus.

Es gibt zwei Arten:

- **Domain Extensions** gehören zu einem fachlichen Bereich. Ein Provider kann das Standardverhalten erweitern oder ersetzen, und eine Änderung kann mehrere Endpunkte betreffen. Beispiel: Ein Preis-Provider passt den Standardpreis auf Produktseiten und noch einmal in Warenkorb und Checkout an.
- **Endpoint Extensions** gehören zu einer Connect-API-Ressource. Der Provider kann die Anfrage vor und die Antwort nach dem Aufruf ändern, aber das Standardverhalten nicht ersetzen.

## Erweiterungspunkte von Preis bis Auftragsanlage

Die [Liste der verfügbaren Extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) ist kurz genug, um sie ganz zu lesen. Für einen Hersteller mit SAP oder einem anderen ERP zählen vor allem diese. Auch der Promotions-Calculator gehört auf die Liste, wenn ERP-Rabatte und Store-Promotions in einem Warenkorb zusammentreffen:

```tabelle
titel: Erweiterungspunkte, die mit einem ERP zählen
spalten: Bedarf | Erweiterungspunkt | Art
Kundenpreis aus dem ERP | Preisdienst und Warenkorbberechnung | Domain *
Bestand oder Verfügbarkeit aus dem ERP | Bestandsdienst und Warenkorbberechnung | Domain *
Steuer und Versand | Steuerdienst, Steuer- und Versandberechnung | Domain
Kreditlimit oder Sperren vor der Bestellung prüfen | Bestellung abschicken im Checkout | Domain
Auftragsdatensatz formen | Auftrag anlegen im Checkout | Domain
Eigene Zuordnung zu Käufergruppen | Auswertung der Käufergruppen | Domain
Produkte und Suchergebnisse filtern oder anreichern | Produkt- und Suchendpunkte | Endpoint
```

Die Seite nennt auch die Standards, die Sie ersetzen: Bestand kommt aus Omnichannel Inventory, Preise aus Salesforce-Preisbüchern, Steuer aus dem Salesforce-Steuerdienst, und Versand kostet nichts, bis Sie ihn erweitern.

```hinweis achtung
Nutzt der Store Faster Add-to-Cart, braucht laut derselben Seite jedes Produkt einen Eintrag in einem Store-Preisbuch, bevor Sie die Preis-Extension umsetzen, auch wenn der echte Preis später aus dem ERP kommt.
```

Welche Daten live aus dem ERP kommen und welche nach Salesforce kopiert werden, ist eine eigene Designentscheidung. Sie steht in [B2B Commerce und SAP: Welche Daten fließen wohin?](../b2b-commerce-sap-datenfluesse/).

## Warum sollte eine Domain Extension den Standard weiterlaufen lassen?

Salesforce schreibt, man empfehle ausdrücklich, super() aufzurufen, um die Kompatibilität mit der Plattform zu sichern, wenn der Standard verändert und nicht vollständig ersetzt wird. Dieser Aufruf lässt den Standarddienst innerhalb Ihres Codes laufen. In der Praxis gibt es drei Arten, einen Domain Provider zu schreiben:

1. Den Standard komplett ersetzen.
2. Den Standard laufen lassen und das Ergebnis anpassen, etwa einen ERP-Rabatt auf den Standardpreis anwenden.
3. Etwas tun, bevor der Standard läuft, etwa die ERP-Kundennummer des Käufers lesen, und dann den Standard laufen lassen.

Variante 2 und 3 bergen weniger Releaserisiko. Ergänzt Salesforce den Standarddienst, etwa um ein neues Feld oder eine Promotion-Funktion, bekommt ein Provider, der den Standard laufen lässt, das automatisch. Ein Provider, der alles ersetzt, verzichtet bei den überschriebenen Methoden auf diese Änderungen. Testen Sie in beiden Fällen jede Extension vor jedem Release in einer Preview-Sandbox. Bei einem Review von Partnercode wäre ein kompletter Ersatz des Standards meine erste Frage. Manchmal ist er begründet, etwa wenn das ERP der einzige Preis-Master ist, aber dann gehört die Begründung in den Code und ins Architektur-Entscheidungslog.

```vertiefung Für Entwickler
titel: Wie teste ich einen Provider, der super() aufruft?
Die Basisklassen liegen in einem Salesforce-Namespace, und der [Guide zum Mocken der Basisklasse](https://developer.salesforce.com/docs/commerce/extensions/guide/mock-the-base-apex-class.html) erklärt, dass das Apex-Testframework nicht über Namespaces hinweg mocken kann. Das dokumentierte Muster: den Provider `virtual` machen, den `super()`-Aufruf in eine eigene überschreibbare Methode legen und diese im Test in einer Unterklasse überschreiben.

ERP-Aufrufe werden mit `HttpCalloutMock` simuliert, wie im Guide zum [Testen eines Extension Providers](https://developer.salesforce.com/docs/commerce/extensions/guide/write-tests-for-an-extension-provider.html) beschrieben.
```

Codeabdeckung allein beweist nicht, dass eine Extension getestet wurde. Verlangen Sie Prüfungen für Preise, Bestandsergebnisse, Fehler und Fallback-Verhalten.

## Extensions oder die älteren Integrationen?

Vor den Extensions wurde Checkout-Logik über Integrationen angebunden: ein Apex-Interface, das einen Calculator ersetzt. Salesforce schreibt heute, Extensions seien der bevorzugte Weg, Salesforce Commerce anzupassen, und Integrationen blieben voll unterstützt. Extensions decken mehr ab, mit fünf Warenkorb-Calculators plus Preisdienst und weiteren Diensten, wo Integrationen vier Checkout-Calculators hatten.

Eine Einschränkung bestimmt die Reihenfolge: Laut dem [Guide zur Cart Calculate API](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/cart-calculate-api.html) ist die API nicht mit Integrationen kompatibel. Ein Store nutzt Cart Calculate Extensions oder Integrationen, nicht beides. Bei LWR-Stores, die ab Spring '24 erstellt wurden, ist Cart Calculate standardmäßig aktiviert und muss deaktiviert werden, um Integrationen zu behalten. Aura-Stores unterstützen die API gar nicht.

Meine Regel: Neue Stores starten mit Extensions. Bestehende Integrationen bleiben, bis der Code sich ohnehin ändern muss, etwa weil sich die ERP-Schnittstelle ändert oder der Store von Aura auf LWR wechselt. Entscheiden Sie dann für den ganzen Store, ob er auf Cart Calculate und Extensions wechselt oder die Integrationen bei deaktiviertem Cart Calculate behält. Funktionierende Integrationen nur umzuschreiben, weil es einen neueren Mechanismus gibt, lohnt sich selten.

Zahlungen sind die Ausnahme. Salesforce schreibt: Zahlungen können derzeit nicht per Extension angepasst werden. Payment Gateways behalten ihren eigenen Adapter, siehe [B2B-Checkout: Bestellnummer, Karte oder Rechnung?](../b2b-checkout-bestellnummer-rechnung/).

## Registrierung und Mapping gehören ins Repository

Registrierung und Mapping sind zwei getrennte Schritte, und beide sind Konfiguration, die jemand in jeder Umgebung nachbauen muss. Salesforce empfiehlt, beides über die Salesforce-Kommandozeile zu erledigen, die auch in einer Pipeline läuft; die Connect API und die Administrationsoberfläche gehen ebenfalls, und dort können die Shop-Verantwortlichen Domain Extensions selbst zuordnen.

Diese letzte Möglichkeit ist das Risiko. Ein Mapping, das von Hand in Produktion geändert wurde, ist in Git unsichtbar. Angenommen, ein Partner ordnet in Produktion direkt einen neuen Preis-Provider zu, um einen dringenden Preisfehler zu beheben. Die Änderung kommt nie ins Repository, und die Pipeline wendet beim nächsten Deployment das Mapping aus dem Repository an, also den alten Provider. Niemand merkt es, bis Händler sich über falsche Preise beschweren.

```vertiefung Für Entwickler
titel: Klassennamen, Namen der Erweiterungspunkte und CLI-Befehle
- **Domain Provider für Preise:** erweitert `commercestorepricing.PricingService` und überschreibt `processPrice` (Produktlisten und Detailseiten) und `processTransactionalPrice` (Warenkorb und Checkout).
- **Endpoint Provider:** erweitert `ConnectApi.BaseEndpointExtension`; kein `super()`-Aufruf.
- **Hier verwendete Namen der Erweiterungspunkte:** `Commerce_Domain_Pricing_Service`, `Commerce_Domain_Pricing_CartCalculator`, `Commerce_Domain_Inventory_Service`, `Commerce_Domain_Inventory_CartCalculator`, `Commerce_Domain_Tax_Service`, `Commerce_Domain_Tax_CartCalculator`, `Commerce_Domain_Shipping_CartCalculator`, `Commerce_Domain_Checkout_PlaceOrder`, `Commerce_Domain_Checkout_CreateOrder`, `Commerce_Domain_BuyerGroup_EvaluationService`, `Commerce_Endpoint_Catalog_Products`, `Commerce_Endpoint_Search_Products`. Die vollständige Liste mit Promotions und aufgeteilten Lieferungen steht auf der Referenzseite.
- **Registrierung und Mapping:** `sf plugins install @salesforce/commerce`, dann `sf commerce:extension:register` für die Klasse und `sf commerce:extension:map` für den Store; alternativ die Objekte `RegisteredExternalService` und `StoreIntegratedService`.
```

Was ich in Vertrag und Pipeline festlegen würde:

- Extension-Klassen, Tests und die Befehle für Registrierung und Mapping liegen im Repository des Kunden, wie ich es in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) begründe.
- Die Pipeline führt die CLI-Befehle pro Umgebung mit den Store-Namen und IDs der jeweiligen Umgebung aus, damit Mappings reproduzierbar sind. Salesforce weist darauf hin, dass für Extensions die neueste Salesforce CLI nötig ist, also legen Sie getestete Versionen der CLI und des Commerce-Plug-ins fest und aktualisieren Sie beide in einem festen Rhythmus.
- Jede Änderung an einer Extension läuft durch ein [Pull-Request-Review](../warum-pull-request-reviews-pflicht-sind/), das prüft, ob der Standard noch läuft, und Timeouts der ERP-Aufrufe und echte Prüfungen in den Tests kontrolliert.
- Manuelles Mapping in Produktion bleibt Notfällen vorbehalten, und am selben Tag folgt ein Commit.
- Für jede Extension gibt es eine schriftliche Laufzeitregel: ERP-Timeout, Wiederholungsversuche, Fallback, Monitoring und die Anzeige für Käufer, wenn Live-Preis oder Bestand nicht verfügbar sind.

Wie Store-Konfiguration mit den Metadaten wandert, beschreibt die DevOps-Masterclass im Kapitel [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/), den Aufbau der Pipeline im Kapitel [Pipeline aufbauen](../../masterclass/devops-release-management/pipeline-aufbauen/).

## Jede eigene Logik einem Erweiterungspunkt zuordnen

Listen Sie jede eigene Logik in Ihrem Store auf und ordnen Sie sie einem Erweiterungspunkt, einer alten Integration oder einer eigenen Komponente zu. Beachten Sie dabei, dass die Warenkorbberechnung entweder mit Extensions oder mit Integrationen läuft. Markieren Sie jeden Domain Provider, der den Standard ersetzt, und fragen Sie nach dem Grund. Prüfen Sie dann, ob sich Registrierung und Mapping aus dem Repository in einer frischen Sandbox wieder aufbauen lassen. Klappt das nicht, haben Sie Ihre größte Abhängigkeit vom aktuellen Partner gefunden. Die ERP-Seite derselben Entscheidungen ist Teil des Kapitels [ERP-Anbindung](../../masterclass/b2b-commerce/erp-integration-bestand-auftraege/), und dieselben Extensions bedienen auch eine [headless Storefront](../headless-b2b-commerce-eigenes-frontend/).
