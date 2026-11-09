---
title: "Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?"
metaTitle: "Salesforce-Lizenzkosten: Braucht jeder eine volle Lizenz?"
description: "Nicht jeder Nutzer braucht eine volle Salesforce-Lizenz. Welche Lizenztypen es gibt, was sie kosten und wie eine Lizenzprognose sechsstellig sparen kann."
pubDate: 2026-10-26
updatedDate: 2026-11-09
lang: de
slug: salesforce-lizenzen-volle-lizenz
translationKey: salesforce-licence-types
topic: governance
categories: [architecture]
contactBrief: licences
tags: [Lizenzen, Make-or-buy, Business Case, Platform, Experience Cloud]
takeaways:
  - "Wer nur liest, freigibt oder in einem engen eigenen Prozess arbeitet, kommt oft mit einer Platform-Lizenz aus."
  - "Sales Cloud Core kostet 195 € pro Nutzer und Monat, Platform Starter 25 €, bei 100 Nutzern sind das 204.000 € Unterschied im Jahr."
  - "Platform-Lizenzen schließen Opportunities, Leads und Forecasts aus, erlauben wenige Custom Objects und decken keine Kundenservice-Arbeit an Fällen."
  - "Händler und Kunden brauchen keine internen Lizenzen. Lizenzen für Self-Service-Portale gibt es ab 4 € pro Login oder 10 € pro Mitglied."
  - "Eine Lizenzprognose gruppiert Nutzer nach dem, was sie im System tatsächlich tun, und gehört vor die Verhandlung, nicht danach."
faq:
  - q: "Was kostet eine Salesforce-Lizenz?"
    a: "Zum Listenpreis (Stand Oktober 2026, jährliche Abrechnung) kostet Sales Cloud Core 195 € pro Nutzer und Monat, Platform Plus 100 €, Platform Starter 25 € und Field Service Technician 175 €. Portallizenzen für Kunden gibt es ab 4 € pro Login oder 10 € pro Mitglied. Die Lizenzkosten hängen vor allem davon ab, wie viele Nutzer wirklich eine volle Lizenz brauchen."
  - q: "Welche Salesforce-Lizenztypen gibt es?"
    a: "Für interne Nutzer gibt es volle Lizenzen wie Sales Cloud und Service Cloud, günstigere Platform-Lizenzen für eigene Apps und spezielle Lizenzen wie Field Service Technician. Für externe Nutzer gibt es Portallizenzen, für Schnittstellen eigene Integrationslizenzen ohne Benutzeroberfläche."
  - q: "Was kann ein Nutzer mit Salesforce Platform Starter nicht?"
    a: "Platform-Nutzer arbeiten mit Accounts, Kontakten, Berichten und eigenen Objekten und sehen Fälle, Assets und Arbeitsaufträge, aber keine Leads, Opportunities, Angebote oder Forecasts, und sie dürfen nicht als Servicemitarbeitende im Kundenservice arbeiten. Platform Starter erlaubt 10 eigene Objekte, Platform Plus 110."
  - q: "Brauchen Schnittstellen eine volle Salesforce-Lizenz?"
    a: "In der Regel nicht. Enterprise, Unlimited und Performance Edition bringen derzeit fünf kostenlose Salesforce-Integration-Lizenzen mit, die nur API-Zugriff erlauben. Weitere lassen sich zukaufen."
  - q: "Wann ist der beste Zeitpunkt, Salesforce-Lizenzen zu verhandeln?"
    a: "Das Geschäftsjahr von Salesforce endet am 31. Januar. Das kann den Zeitpunkt beeinflussen, die Konditionen sind aber kundenspezifisch. Roadmap-Produkte nehme ich nur früh mit, wenn Startdaten und erwartete Nutzung den Gesamtvertrag günstiger machen."
  - q: "Wo kaufe ich Salesforce-Lizenzen?"
    a: "In der Regel direkt bei Salesforce über den zuständigen Account Executive, kleinere Editionen auch online. Preis und Vertrag kommen von Salesforce, welche Rolle welche Lizenz braucht, klären Sie auf Kundenseite, mit Zuarbeit des Implementierungspartners."
draft: false
---

Nein, nicht jeder Salesforce-Nutzer braucht eine volle Lizenz. Volle Lizenzen wie Sales Cloud oder Service Cloud werden gern standardmäßig für alle angeboten, auch für Nutzer, die nur Daten lesen, Datensätze freigeben oder in einem engen Prozess arbeiten. Für diese Gruppen gibt es günstigere Salesforce-Lizenzen, und bei großen Nutzergruppen liegt der Unterschied leicht im sechsstelligen Bereich pro Jahr. Die Frage ist nur, ob jemand vor der Unterschrift prüft, was die Nutzer im System wirklich tun.

## Welche Salesforce-Lizenzen gibt es?

Salesforce verkauft die meisten Lizenzen pro Nutzer. Die Lizenz setzt die Obergrenze der Objekte und Funktionen; Permission Set Licenses, Berechtigungen und Vertrag bestimmen den Rest. Für Fertigungsunternehmen sind diese Typen relevant, mit Listenpreisen pro Nutzer und Monat bei jährlicher Abrechnung (Stand Oktober 2026):

| Lizenz | Für wen | Listenpreis |
|---|---|---|
| Sales Cloud Core | Vertrieb mit Leads, Opportunities, Forecasts | 195 € |
| Platform Plus | Interne Nutzer eigener Apps, bis 110 eigene Objekte | 100 € |
| Platform Starter | Interne Nutzer eigener Apps, bis 10 eigene Objekte | 25 € |
| Field Service Technician | Techniker im Außendienst | 175 € |
| Service Portal Member | Kunden im Self-Service-Portal (setzt eine Service-Cloud-Edition voraus) | 10 € pro Mitglied |
| Service Portal Login | Kunden, die selten kommen (setzt eine Service-Cloud-Edition voraus) | 4 € pro Login |
| Partner Relationship Management | Händler und Partner im Portal | 25 € pro Mitglied |

Die Preise stammen von den Salesforce-Seiten für [Sales Cloud](https://www.salesforce.com/products/sales-cloud-pricing/), [Platform](https://www.salesforce.com/eu/editions-pricing/app-cloud/), [Field Service](https://www.salesforce.com/service/field-service-management/pricing/), [Self-Service-Portale](https://www.salesforce.com/products/customer-self-service-pricing/) und [Partnerportale](https://www.salesforce.com/products/experience-cloud/pricing/partner-relationship-management/). Listenpreise sind ein Ausgangspunkt, keine Lösungskosten: Field Service braucht zum Beispiel zusätzlich mindestens eine Service-Cloud- und eine Dispatcher-Lizenz. Seit 5. November 2026 führt die US-Seite von Field Service außerdem Field-Service+-Editionen, siehe [Field-Service-Lizenzen nach Rolle](../field-service-lizenzen-rollen-dispatcher-techniker/).

Dazu kommen Schnittstellen. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.integration_user.htm&type=5) bekommen Orgs in Enterprise, Unlimited und Performance Edition derzeit fünf kostenlose Salesforce-Integration-Lizenzen. Sie erlauben nur API-Zugriff, keine Benutzeroberfläche. Für eine typische Schnittstelle zu SAP prüfen Sie deshalb zuerst die Integrationslizenz, bevor jemand eine volle Lizenz vergibt, weil ein technischer Benutzer mit voller Lizenz meist mehr Rechte hat als nötig. Benötigte Objekte, APIs und Paketrechte prüfen Sie vorher.

## Wo zahlen Unternehmen zu viel?

Im Pre-Sales habe ich mit Salesforce zusammengearbeitet und kenne die Angebote von beiden Seiten. Ein Muster habe ich dabei oft gesehen: Das Angebot rechnet mit der Zahl der Mitarbeitenden, die Salesforce nutzen sollen, und gibt allen dieselbe volle Lizenz. Dabei fallen drei Gruppen durch das Raster:

- **Leser.** Geschäftsführung, Controlling oder Produktmanagement schauen sich Berichte und Dashboards an, bearbeiten aber keine Opportunities.
- **Freigeber.** Wer nur Rabatte, Angebote oder Aufträge freigibt, arbeitet wenige Minuten pro Woche im System.
- **Nutzer eines engen Prozesses.** Ein Team, das nur eine eigene App nutzt, etwa für Reklamationen oder interne Anfragen, braucht weder Vertriebs- noch Servicefunktionen.

Gemeinsam ist ihnen: Sie nutzen die Hauptaktivitäten nicht oder übernehmen nur am Rande verwandte Tätigkeiten.

```praxis
In einem Field-Service-Projekt haben wir bei einem Kunden auf Basis der Servicetermine Reiseanträge erstellt, als eigenes Objekt, und sie von dort den Technikern zur Verfügung gestellt. Die Kollegen, die die Reiseanträge bearbeiteten, brauchten dafür keine Field-Service-Lizenz. Sie arbeiteten zu einem Bruchteil der Kosten einer vollen Lizenz.
```

Ein Rechenbeispiel mit Listenpreisen: 100 Nutzer, die Accounts und Kontakte lesen und Datensätze in einer eigenen App ohne ausgeschlossene CRM-Objekte freigeben. Der Unterschied liegt bei 170 € pro Nutzer und Monat, über eine Vertragslaufzeit von drei Jahren bei mehr als 600.000 €.

```kennzahlen
195 € | Sales Cloud Core pro Nutzer und Monat
25 € | Platform Starter pro Nutzer und Monat
204.000 € | Unterschied pro Jahr bei 100 Nutzern, die nur lesen und freigeben
quelle: Salesforce-Preisseiten für Sales Cloud und Platform, Listenpreise Stand Oktober 2026
```

Bei externen Nutzern ist der Fehler noch teurer. Händler oder Kunden, die mit internen Lizenzen arbeiten, weil ein Portal „später“ kommen sollte, kosten ein Vielfaches einer Portallizenz. Käufer, die in einem B2B-Shop bestellen, brauchen einen eigenen Lizenztyp, siehe [B2B Commerce Lizenzen für Käufer: Wer braucht welche?](../b2b-commerce-lizenzen-kaeufer/).

## Keine Opportunities, wenige Custom Objects: die Grenzen der Platform-Lizenz

Platform-Lizenzen haben harte Grenzen, und das Order Form macht sie verbindlich:

- **Keine Leads, Opportunities, Angebote oder Forecasts.** Platform-Nutzer arbeiten mit Accounts, Kontakten, Berichten und eigenen Objekten. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.users_license_types_communities_lightning_platform_details.htm&type=5) sehen sie auch Fälle, Assets und Arbeitsaufträge, dürfen aber nicht als Servicemitarbeitende im Kundenservice arbeiten.
- **Wenige eigene Objekte.** Platform Starter erlaubt 10, Platform Plus 110.
- **Kein Nachbau.** Ein eigenes Datenmodell hebt die Einschränkungen aus Order Form und Produktbedingungen nicht auf. Laut [Salesforce Ben](https://www.salesforceben.com/salesforce-platform-licenses/) müssen Kunden für Standardfunktionen zahlen, wenn sie diese mit eigener Entwicklung nachbauen. Eine eigene „Opportunity light“ für Platform-Nutzer ist also kein Sparmodell.

Ähnliche Grenzen gibt es bei Speziallizenzen. Laut Preisseite dürfen Dispatcher- und Technician-Lizenzen von Field Service nicht für ein Contact Center oder die Fallbearbeitung genutzt werden. Ein Techniker, der auch Kundenanfragen bearbeitet, braucht deshalb Field Service Plus.

Deshalb gehört die Lizenzfrage in die Architektur. Ob ein Freigabeprozess auf Platform-Lizenzen läuft, hängt davon ab, welche Objekte er berührt. Wer den Prozess auf Opportunities baut, hat die Lizenzentscheidung damit schon getroffen.

## So erstelle ich eine Lizenzprognose

Eine Lizenzprognose beantwortet, welche Lizenztypen ein Unternehmen in welcher Menge braucht, heute und in den nächsten Jahren. Ich gehe dabei so vor:

```schritte
Nutzer nach Tätigkeit gruppieren
  Nicht nach Abteilung. Ein Vertriebsinnendienst, der Aufträge erfasst, ist eine andere Gruppe als ein Key Account Manager.
Objekte pro Gruppe festhalten
  Welche Objekte liest und bearbeitet die Gruppe? Daraus ergibt sich die kleinste Lizenz, die passt.
Wachstum schätzen
  Etwa neue Länder, neue Geschäftsbereiche oder ein Portal, das in zwei Jahren kommt.
Gegen das Angebot legen
  Weicht das Angebot ab, gibt es eine Begründung oder einen Verhandlungspunkt.
```

Bei bestehenden Orgs hilft ein Blick auf die Login-Historie und die zuletzt bearbeiteten Datensätze. Wer sich mit voller Lizenz nur einmal im Monat anmeldet, ist ein Grund zum genaueren Hinsehen, kein Beweis: Entscheidend ist, was er bei dieser Anmeldung tut.

Für seltene Nutzer gibt es außerdem eine nutzungsabhängige Variante: Salesforce verkauft [Platform-Logins](https://www.salesforce.com/platform/enterprise-app-development/pricing/) mit etwa den Rechten von Platform Starter. Für Freigeber, die sich nur wenige Male im Jahr anmelden, lohnt der Vergleich mit benannten Lizenzen.

Der Zeitpunkt zählt auch. Das [Geschäftsjahr von Salesforce](https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Fourth-Quarter-Fiscal-2026-Results/default.aspx) endet am 31. Januar. Das kann den Zeitpunkt beeinflussen, Rabatte und Paketkonditionen sind aber kundenspezifisch. Roadmap-Produkte würde ich nur früh mitnehmen, wenn Startdaten, Reduktionsrechte und erwartete Nutzung den Gesamtvertrag günstiger machen; sonst werden sie Shelfware.

## Wann ist die volle Lizenz trotzdem richtig?

Sparen um jeden Preis ist auch falsch. Eine volle Lizenz ist richtig, wenn ein Nutzer Leads, Opportunities oder Forecasts bearbeitet oder als Servicemitarbeiter Fälle bearbeitet, auch wenn er das nur gelegentlich tut. Sie ist auch richtig, wenn absehbar ist, dass eine Gruppe in einem Jahr mehr braucht. Ein Lizenzwechsel mitten in der Vertragslaufzeit kostet Verhandlungszeit, und ein Prozess, der um eine zu kleine Lizenz herumgebaut wurde, kostet Wartung.

Dieselbe Abwägung gilt bei Industry Clouds. Wann sich zum Beispiel die Manufacturing Cloud gegenüber Sales Cloud lohnt, ist eine eigene Make-or-buy-Frage, die ich unter [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/) beschreibe. Bei KI-Funktionen kommen je nach Produkt Kosten pro Nutzer oder nach Verbrauch dazu, und dort zählt zuerst der Nutzen, wie in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/) beschrieben.

## Prüfen, wer im letzten Jahr an Opportunities oder Fällen gearbeitet hat

Liegt eine Verlängerung oder ein neues Angebot an, beginnen Sie mit drei Fragen: Wie viele Nutzer mit voller Lizenz haben in den letzten zwölf Monaten an Opportunities oder Fällen gearbeitet? Welche externen Nutzer arbeiten heute mit internen Lizenzen? Welche Schnittstellen laufen über einen Benutzer mit voller Lizenz?

Die Antworten zeigen, wie viel Spielraum im Angebot steckt. Als erster Anhaltspunkt hilft ein Bericht über Opportunities und Fälle, gruppiert nach „Zuletzt geändert von“, neben der Login-Historie. Er zeigt nur den letzten Bearbeiter, deshalb brauchen Leser, Freigeber und saisonale Nutzer Gespräche mit den Prozessverantwortlichen, bevor jemand eine Lizenz ändert.
