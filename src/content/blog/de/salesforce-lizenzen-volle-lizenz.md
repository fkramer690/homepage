---
title: "Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?"
description: "Nicht jeder Nutzer braucht eine volle Salesforce-Lizenz. Welche Lizenztypen es gibt, was sie kosten und wie eine Lizenzprognose sechsstellig sparen kann."
pubDate: 2026-10-26
lang: de
slug: salesforce-lizenzen-volle-lizenz
translationKey: salesforce-licence-types
topic: governance
tags: [Lizenzen, Make-or-buy, Business Case, Platform, Experience Cloud]
takeaways:
  - "Nicht jeder Salesforce-Nutzer braucht eine volle Lizenz. Wer nur liest, freigibt oder in einem engen eigenen Prozess arbeitet, kommt oft mit einer Platform-Lizenz aus."
  - "Laut Preisliste kostet Sales Cloud Core 195 € pro Nutzer und Monat, Platform Starter 25 €. Bei 100 Nutzern, die nur lesen und freigeben, sind das 204.000 € Unterschied pro Jahr."
  - "Platform-Lizenzen haben harte Grenzen: keine Opportunities, wenige Custom Objects, und Standardfunktionen dürfen nicht mit eigener Entwicklung nachgebaut werden, um Lizenzen zu sparen."
  - "Externe Nutzer wie Händler und Kunden brauchen keine internen Lizenzen. Portallizenzen gibt es ab 4 € pro Login oder 10 € pro Mitglied."
  - "Eine Lizenzprognose gruppiert Nutzer nach dem, was sie im System tatsächlich tun, und gehört vor die Verhandlung, nicht danach."
faq:
  - q: "Welche Salesforce-Lizenztypen gibt es?"
    a: "Für interne Nutzer gibt es volle Lizenzen wie Sales Cloud und Service Cloud, günstigere Platform-Lizenzen für eigene Apps und spezielle Lizenzen wie Field Service Technician. Für externe Nutzer gibt es Portallizenzen, für Schnittstellen eigene Integrationslizenzen ohne Benutzeroberfläche."
  - q: "Was kann ein Nutzer mit Salesforce Platform Starter nicht?"
    a: "Platform-Nutzer arbeiten mit Accounts, Kontakten, Berichten und eigenen Objekten, aber nicht mit Opportunities und den meisten Vertriebs- und Servicefunktionen. Platform Starter erlaubt 10 eigene Objekte, Platform Plus 110."
  - q: "Brauchen Schnittstellen eine volle Salesforce-Lizenz?"
    a: "In der Regel nicht. Enterprise, Unlimited und Performance Edition bringen eine begrenzte Zahl kostenloser Salesforce-Integration-Lizenzen mit, die nur API-Zugriff erlauben. Weitere lassen sich zukaufen."
  - q: "Wann ist der beste Zeitpunkt, Salesforce-Lizenzen zu verhandeln?"
    a: "Das Geschäftsjahr von Salesforce endet am 31. Januar. Zum Jahresende gibt es oft Spielraum, Produkte aus der eigenen Roadmap für wenig Aufpreis mitzunehmen, wenn das Unternehmen weiß, was es in zwei bis drei Jahren braucht."
draft: false
---

Nein, nicht jeder Salesforce-Nutzer braucht eine volle Lizenz. Volle Lizenzen wie Sales Cloud oder Service Cloud werden gern standardmäßig für alle angeboten, auch für Nutzer, die nur Daten lesen, Datensätze freigeben oder in einem engen Prozess arbeiten. Für diese Gruppen gibt es günstigere Salesforce-Lizenzen, und bei großen Nutzergruppen liegt der Unterschied leicht im sechsstelligen Bereich pro Jahr. Die Frage ist nur, ob jemand vor der Unterschrift prüft, was die Nutzer im System wirklich tun.

## Welche Salesforce-Lizenzen gibt es?

Salesforce verkauft Lizenzen pro Nutzer. Welche Lizenz ein Nutzer hat, bestimmt, welche Objekte und Funktionen er überhaupt sehen darf. Für Fertigungsunternehmen sind diese Typen relevant, mit Listenpreisen pro Nutzer und Monat bei jährlicher Abrechnung (Stand Oktober 2026):

| Lizenz | Für wen | Listenpreis |
|---|---|---|
| Sales Cloud Core | Vertrieb mit Leads, Opportunities, Forecasts | 195 € |
| Platform Plus | Interne Nutzer eigener Apps, bis 110 eigene Objekte | 100 € |
| Platform Starter | Interne Nutzer eigener Apps, bis 10 eigene Objekte | 25 € |
| Field Service Technician | Techniker im Außendienst | 175 € |
| Service Portal Member | Kunden im Self-Service-Portal | 10 € pro Mitglied |
| Service Portal Login | Kunden, die selten kommen | 4 € pro Login |
| Partner Relationship Management | Händler und Partner im Portal | 25 € pro Mitglied |

Die Preise stammen von den Salesforce-Seiten für [Sales Cloud](https://www.salesforce.com/products/sales-cloud-pricing/), [Platform](https://www.salesforce.com/eu/editions-pricing/app-cloud/), [Field Service](https://www.salesforce.com/service/field-service-management/pricing/), [Self-Service-Portale](https://www.salesforce.com/products/customer-self-service-pricing/) und [Partnerportale](https://www.salesforce.com/products/experience-cloud/pricing/partner-relationship-management/). Listenpreise sind ein Ausgangspunkt. Das Angebot weicht fast immer ab.

Dazu kommen Schnittstellen. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.integration_user.htm&type=5) bekommen Orgs in Enterprise, Unlimited und Performance Edition eine begrenzte Zahl kostenloser Salesforce-Integration-Lizenzen. Sie erlauben nur API-Zugriff, keine Benutzeroberfläche. Eine Schnittstelle zu SAP braucht also keine volle Lizenz, und sie sollte auch keine haben, weil ein technischer Benutzer mit voller Lizenz meist mehr Rechte hat als nötig.

## Wo zahlen Unternehmen zu viel?

Im Pre-Sales habe ich mit Salesforce zusammengearbeitet und kenne die Angebote von beiden Seiten. Ein Muster habe ich dabei oft gesehen: Das Angebot rechnet mit der Zahl der Mitarbeitenden, die Salesforce nutzen sollen, und gibt allen dieselbe volle Lizenz. Dabei fallen drei Gruppen durch das Raster:

- **Leser.** Geschäftsführung, Controlling oder Produktmanagement schauen sich Berichte und Dashboards an, bearbeiten aber keine Opportunities.
- **Freigeber.** Wer nur Rabatte, Angebote oder Aufträge freigibt, arbeitet wenige Minuten pro Woche im System.
- **Nutzer eines engen Prozesses.** Ein Team, das nur eine eigene App nutzt, etwa für Reklamationen oder interne Anfragen, braucht weder Vertriebs- noch Servicefunktionen.

Gemeinsam ist ihnen: Sie nutzen die Hauptaktivitäten nicht oder übernehmen nur am Rande verwandte Tätigkeiten. Ein Beispiel aus einem Field-Service-Projekt: Bei einem Kunden haben wir auf Basis der Servicetermine Reiseanträge erstellt, als eigenes Objekt, und sie von dort den Technikern zur Verfügung gestellt. Die Kollegen, die die Reiseanträge bearbeiteten, brauchten dafür keine Field-Service-Lizenz. Sie arbeiteten zu einem Bruchteil der Kosten einer vollen Lizenz.

Ein Rechenbeispiel mit Listenpreisen: 100 Nutzer, die nur lesen und freigeben. Mit Sales Cloud Core sind das 195 € pro Nutzer und Monat, mit Platform Starter 25 €. Der Unterschied liegt bei 170 € pro Nutzer und Monat, also 204.000 € pro Jahr. Über eine Vertragslaufzeit von drei Jahren sind das mehr als 600.000 €.

Bei externen Nutzern ist der Fehler noch teurer. Händler oder Kunden, die mit internen Lizenzen arbeiten, weil ein Portal „später“ kommen sollte, kosten ein Vielfaches einer Portallizenz.

## Was können Platform-Lizenzen nicht?

Platform-Lizenzen haben harte Grenzen, und wer sie ignoriert, verletzt den Vertrag:

- **Keine Opportunities**, keine Forecasts und kaum Vertriebs- oder Servicefunktionen. Platform-Nutzer arbeiten mit Accounts, Kontakten, Berichten und eigenen Objekten.
- **Wenige eigene Objekte.** Platform Starter erlaubt 10, Platform Plus 110.
- **Kein Nachbau.** Laut [Salesforce Ben](https://www.salesforceben.com/salesforce-platform-licenses/) müssen Kunden für Standardfunktionen zahlen, wenn sie diese mit eigener Entwicklung nachbauen. Eine eigene „Opportunity light“ für Platform-Nutzer ist also kein Sparmodell.

Ähnliche Grenzen gibt es bei Speziallizenzen. Laut Preisseite dürfen Dispatcher- und Technician-Lizenzen von Field Service nicht für ein Contact Center oder die Fallbearbeitung genutzt werden. Ein Techniker, der auch Kundenanfragen bearbeitet, braucht deshalb Field Service Plus.

Deshalb gehört die Lizenzfrage in die Architektur. Ob ein Freigabeprozess auf Platform-Lizenzen läuft, hängt davon ab, welche Objekte er berührt. Wer den Prozess auf Opportunities baut, hat die Lizenzentscheidung damit schon getroffen.

## Wie erstelle ich eine Lizenzprognose?

Eine Lizenzprognose beantwortet, welche Lizenztypen ein Unternehmen in welcher Menge braucht, heute und in den nächsten Jahren. Ich gehe dabei so vor:

1. **Nutzer nach Tätigkeit gruppieren**, nicht nach Abteilung. Ein Vertriebsinnendienst, der Aufträge erfasst, ist eine andere Gruppe als ein Key Account Manager.
2. **Pro Gruppe festhalten, welche Objekte sie liest und bearbeitet.** Daraus ergibt sich die kleinste Lizenz, die passt.
3. **Wachstum schätzen**, etwa neue Länder, neue Geschäftsbereiche oder ein Portal, das in zwei Jahren kommt.
4. **Gegen das Angebot legen.** Weicht das Angebot ab, gibt es eine Begründung oder einen Verhandlungspunkt.

Bei bestehenden Orgs hilft ein Blick auf die Login-Historie und die zuletzt bearbeiteten Datensätze. Nutzer mit voller Lizenz, die sich einmal im Monat anmelden, sind Kandidaten für eine andere Lizenz oder für gar keine.

Der Zeitpunkt zählt auch. Das [Geschäftsjahr von Salesforce](https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Fourth-Quarter-Fiscal-2026-Results/default.aspx) endet am 31. Januar. Zum Jahresende oder bei Aktionen gibt es oft Spielraum, Produkte aus den nächsten zwei bis drei Jahren der eigenen Roadmap für wenig Aufpreis mitzunehmen. Das funktioniert nur, wenn das Unternehmen weiß, wonach es fragen soll.

## Wann ist die volle Lizenz trotzdem richtig?

Sparen um jeden Preis ist auch falsch. Eine volle Lizenz ist richtig, wenn ein Nutzer Leads, Opportunities, Fälle oder Forecasts bearbeitet, auch wenn er das nur gelegentlich tut. Sie ist auch richtig, wenn absehbar ist, dass eine Gruppe in einem Jahr mehr braucht. Ein Lizenzwechsel mitten in der Vertragslaufzeit kostet Verhandlungszeit, und ein Prozess, der um eine zu kleine Lizenz herumgebaut wurde, kostet Wartung.

Dieselbe Abwägung gilt bei Industry Clouds. Wann sich zum Beispiel die Manufacturing Cloud gegenüber Sales Cloud lohnt, ist eine eigene Make-or-buy-Frage, die ich unter [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/) beschreibe. Bei KI-Funktionen kommen Verbrauchs-Credits dazu, und dort zählt zuerst der Nutzen, wie in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/) beschrieben.

## Wo sollten Sie anfangen?

Liegt eine Verlängerung oder ein neues Angebot an, nehmen Sie sich eine Stunde für drei Fragen: Wie viele Nutzer mit voller Lizenz haben im letzten Quartal eine Opportunity oder einen Fall bearbeitet? Welche externen Nutzer arbeiten heute mit internen Lizenzen? Welche Schnittstellen laufen über einen Benutzer mit voller Lizenz?

Die Antworten zeigen, wie viel Spielraum im Angebot steckt. Die volle Lizenz für alle ist die bequemste Lösung, selten die günstigste. Wenn bei Ihnen eine Verlängerung oder ein Angebot ansteht und Sie eine unabhängige Prüfung möchten, [schreiben Sie mir](#contact) oder lesen Sie mehr [über mich](../../#about).
