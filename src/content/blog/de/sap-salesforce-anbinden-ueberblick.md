---
title: "SAP an Salesforce anbinden: Überblick für die IT-Leitung"
description: "SAP to Salesforce: welches System führt, welche Muster passen, MuleSoft oder SAP Integration Suite und was der Wechsel auf S/4HANA für Schnittstellen heißt."
pubDate: 2026-10-29
lang: de
slug: sap-salesforce-anbinden-ueberblick
translationKey: sap-salesforce-integration-overview
topic: data
categories: [architecture]
contactBrief: integration
tags: [SAP, Salesforce SAP Integration, MuleSoft, S/4HANA, Schnittstellen, ERP]
takeaways:
  - "Am Anfang einer SAP-to-Salesforce-Integration steht eine Landkarte: Für jede Art von Daten führt genau ein System, und das andere liest."
  - "Von sechs Integrationsmustern reichen für SAP meist drei: Stammdaten per Batch, Preise und Verfügbarkeit live, Aufträge mit Status zurück."
  - "Als Middleware passen MuleSoft oder SAP Integration Suite. Bei wenigen stabilen Schnittstellen kann eine direkte Anbindung reichen."
  - "SAP ECC verliert Ende 2027 die reguläre Wartung. Schnittstellen sollten so geschnitten sein, dass der Wechsel auf S/4HANA nicht alles neu macht."
  - "Manufacturing Cloud, B2B Commerce, Revenue Cloud, Field Service und Agentforce haben eigene Datenflüsse, jeweils mit Detailartikel."
faq:
  - q: "Wie verbinde ich SAP mit Salesforce?"
    a: "Über eine Middleware wie MuleSoft oder SAP Integration Suite oder direkt über die APIs beider Systeme. Vorher steht die Frage, welches System für Kunden, Produkte, Preise und Aufträge führt, und welches Muster jede Verbindung braucht: Batch, Live-Abfrage oder Übergabe mit Statusmeldung."
  - q: "Brauche ich MuleSoft für SAP und Salesforce?"
    a: "Nein. MuleSoft bringt fertige Konnektoren für SAP S/4HANA und für ältere SAP-Systeme mit. SAP Integration Suite oder andere Plattformen können dasselbe. Bei wenigen stabilen Schnittstellen kann auch eine direkte Anbindung reichen."
  - q: "Kann Salesforce SAP-Daten anzeigen, ohne sie zu kopieren?"
    a: "Ja, mit Salesforce Connect. Externe Objekte lesen Daten zur Laufzeit über OData 2.0 oder 4.0 oder einen eigenen Adapter. Das passt für große Datenmengen, von denen Nutzer jeweils nur wenig brauchen, etwa Rechnungen oder Lieferungen."
  - q: "Was ändert der Wechsel von SAP ECC auf S/4HANA für Salesforce?"
    a: "Schnittstellen auf Basis von BAPI, RFC und IDoc werden oft durch OData-APIs von S/4HANA ersetzt. Wer heute baut, sollte die SAP-Seite hinter einer stabilen Schnittstelle in der Middleware kapseln, damit Salesforce den Wechsel kaum bemerkt."
draft: false
---

SAP an Salesforce anzubinden heißt, für jede Art von Daten ein führendes System festzulegen und dann für jede Verbindung das passende Muster zu wählen: Stammdaten per Batch, Preise und Verfügbarkeit live, Aufträge per Übergabe mit Status zurück. Erst danach geht es um die Technik, also MuleSoft, SAP Integration Suite oder eine direkte Anbindung. Wer im Englischen nach „SAP to Salesforce“ oder „Salesforce SAP Integration“ sucht, findet meist Werkzeuglisten. Für die IT-Leitung zählt die Reihenfolge davor. Dieser Überblick bündelt, was ich in den Detailartikeln zu einzelnen Salesforce-Produkten beschrieben habe.

## Welches System führt für welche Daten?

Die meisten Integrationsprobleme beginnen mit einer unklaren Antwort auf diese Frage. Können Salesforce und SAP dieselbe Kundenadresse oder denselben Preis ändern, sind sich die beiden Systeme früher oder später uneinig. Eine typische Aufteilung bei Herstellern sieht so aus:

| Daten | Führendes System | Salesforce |
|---|---|---|
| Interessenten und Kontakte | Salesforce | legt an und pflegt |
| Kunden mit Aufträgen und Rechnungen | SAP | liest, ergänzt Vertriebssicht |
| Produkte und Stücklisten | SAP | liest, was Vertrieb und Service brauchen |
| Preise und Konditionen | meist SAP | fragt ab oder rechnet nach Regeln |
| Aufträge, Lieferungen, Rechnungen | SAP | übergibt Aufträge, zeigt Status |
| Fälle, Einsätze, Servicehistorie | Salesforce | führt, mit Verweis auf SAP-Aufträge |

Die Details unterscheiden sich in jedem Unternehmen, vor allem bei Preisen. Ob Kundenpreise aus SAP-Konditionen kommen oder in Salesforce neu entstehen, vergleiche ich in [Kundenpreise: SAP-Konditionen oder Salesforce Pricing?](../kundenpreise-sap-konditionen-oder-salesforce-pricing/). Diese Landkarte gehört zur Architektur und nicht in die Spezifikation einer einzelnen Schnittstelle.

## Für SAP reichen meist drei Integrationsmuster

Salesforce beschreibt in seinem [Architektur-Leitfaden](https://architect.salesforce.com/docs/architect/fundamentals/guide/integration-patterns.html) sechs Integrationsmuster, sortiert nach Richtung und Zeitpunkt. Für SAP reichen meist drei davon:

- **Batch Data Synchronization** für Stammdaten wie Kunden, Produkte und Preislisten. Sie ändern sich selten und kommen nachts oder stündlich.
- **Request and Reply** für Live-Abfragen, etwa Verfügbarkeit, kundenspezifischer Preis oder Auftragsstatus. Laut Leitfaden passt das Muster für kleine Datenmengen in Echtzeit, nicht für Massendaten.
- **Fire and Forget** für die Übergabe von Aufträgen an SAP. Salesforce wartet nicht, SAP bestätigt später, und der Status kommt zurück.

Ein viertes Muster wird oft übersehen: **Data Virtualization**. Mit Salesforce Connect lesen [externe Objekte](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_objects_external_objects.htm) Daten zur Laufzeit über OData 2.0 oder 4.0, ohne sie in Salesforce zu speichern. Das passt für Rechnungen oder Lieferungen, von denen ein Servicemitarbeiter jeweils nur die eines Kunden braucht.

Für komplexe Fälle empfiehlt der Leitfaden eine Middleware: wenn Daten transformiert, aus mehreren Systemen zusammengeführt oder über mehrere Systeme hinweg konsistent gehalten werden müssen.

## MuleSoft, SAP Integration Suite oder direkt?

Welcher Weg passt, hängt von der Zahl der Systeme, der Zahl der Teams und davon ab, wie oft sich Schnittstellen ändern.

- **MuleSoft** bringt für beide SAP-Welten Konnektoren mit. Der [SAP S/4HANA OData Connector](https://docs.mulesoft.com/sap-s4hana-cloud-connector/latest/) unterstützt die OData-APIs von S/4HANA Cloud und S/4HANA on-premise. Der [SAP Connector](https://docs.mulesoft.com/sap-connector/latest/) arbeitet mit BAPI, RFC und IDoc, also mit den Techniken älterer Systeme wie ECC.
- **SAP Integration Suite** ist die Plattform von SAP. Für Salesforce gibt es dort Adapter von Partnern. Das passt, wenn die SAP-Organisation die Schnittstellen betreiben soll und die Plattform schon im Haus ist.
- **Direkte Anbindung** über die APIs beider Systeme kann bei wenigen, stabilen Schnittstellen die einfachste Lösung sein.

```pro-contra
pro: Middleware
- Schnittstellen werden wiederverwendbar, etwa ein Auftragsstatus für Portal, Shop und Agent
- Fehler sind an einer Stelle sichtbar
- Der Wechsel von ECC auf S/4HANA bleibt hinter der Middleware
contra: Was sie kostet
- Lizenz und Betrieb einer weiteren Plattform
- Ein Team, das die Plattform beherrscht
- Bei zwei, drei Schnittstellen oft mehr Aufwand als Nutzen
```

Ich war an einem globalen CTI-Rollout mit MuleSoft beteiligt und arbeite für die Umsetzung mit Partnern, die Integrationserfahrung aus großen internationalen Programmen haben. Architektur und Plattformwahl bleiben dabei auf Kundenseite, und ich entscheide mit dem Kunden, welcher Partner sie umsetzt. Wie ich Schnittstellen plane, steht unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Was ändert der Wechsel auf S/4HANA?

Viele Hersteller betreiben noch SAP ECC und planen den Umstieg auf S/4HANA. SAP hat die Fristen im [Februar 2020](https://news.sap.com/2020/02/sap-s4hana-maintenance-2040-clarity-choice-sap-business-suite-7/) festgelegt:

```zeitleiste
2027-12-31 | Reguläre Wartung für SAP Business Suite 7 (ECC) endet
2030-12-31 | Optionale verlängerte Wartung für ECC endet
2040-12-31 | Wartungszusage für SAP S/4HANA
```

Für Salesforce heißt das: Eine Schnittstelle, die heute per BAPI oder IDoc an ECC hängt, wird mit S/4HANA oft auf OData-APIs umgebaut. Wer jetzt baut, sollte die SAP-Seite deshalb hinter einer stabilen Schnittstelle in der Middleware kapseln. Salesforce ruft dann „Auftragsstatus abfragen“ auf und muss nicht wissen, ob dahinter ECC oder S/4HANA antwortet. Laufen Salesforce-Einführung und S/4HANA-Umstieg parallel, gehört diese Abhängigkeit in den gemeinsamen Programmplan.

## Jedes Salesforce-Produkt hat eigene Datenflüsse

Jedes Salesforce-Produkt braucht andere Daten aus SAP. Die Details stehen in eigenen Artikeln:

- **Manufacturing Cloud:** Ist-Mengen für Sales Agreements, Aufträge und Gutschriften, beschrieben in [Manufacturing Cloud und SAP: welche Daten wohin](../manufacturing-cloud-sap-integration-datenfluesse/).
- **B2B Commerce:** Stammdaten per Batch, Live-Abfragen in Warenkorb und Checkout, Auftrag raus und Status zurück, in [B2B Commerce und SAP](../b2b-commerce-sap-datenfluesse/).
- **Revenue Cloud:** wer im Quote-to-Cash was führt, in [Revenue Cloud und SAP](../revenue-cloud-sap-quote-to-cash-aufteilung/).
- **Field Service:** Ersatzteile, Bestand und installierte Basis, in [Ersatzteile im Außendienst](../salesforce-field-service-ersatzteile-erp/).
- **Agentforce:** Auftragsstatus und Verfügbarkeit für einen Agenten über MuleSoft, in [Agentforce und SAP](../agentforce-sap-auftragsstatus/).

```praxis
Ich habe Sales Agreements mit Ist-Mengen aus dem ERP in der Manufacturing Cloud eingeführt, und die ERP-Schnittstelle war dabei der Stolperstein. In Field-Service-Projekten kamen Ersatzteile und installierte Basis aus dem ERP, und auch dort waren die ERP-Schnittstellen einer der Stolpersteine.
```

## Mit der Landkarte der Daten beginnen

Zeichnen Sie die Landkarte, bevor Sie über Werkzeuge sprechen: eine Zeile pro Datenart, eine Spalte für das führende System, eine für die Richtung und eine für den Zeitpunkt, also Batch, live oder Übergabe. Prüfen Sie dann, welche Schnittstellen es heute schon gibt und welche davon an ECC-Techniken hängen, die mit S/4HANA wegfallen. Erst mit dieser Liste lässt sich entscheiden, ob sich eine Middleware lohnt und welche.

Legen Sie außerdem für jede Schnittstelle einen Verantwortlichen auf Kundenseite fest und prüfen Sie, mit welchem technischen Benutzer sie sich anmeldet. Integrationsbenutzer haben oft mehr Rechte als nötig, und Anmeldungen mit Benutzername und Passwort laufen aus, wie in [Salesforce-Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/) beschrieben.
