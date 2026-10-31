---
title: "Rahmenverträge und Prognosen in der Manufacturing Cloud"
description: "Sales Agreements, Account Forecasting, Programmgeschäft und Vertriebsziele in der Manufacturing Cloud: was sie leisten und welche ERP-Daten sie brauchen."
lang: de
slug: rahmenvertraege-und-prognosen
course: manufacturing-cloud
translationKey: mfg-02
chapter: 2
pubDate: 2026-10-28
short: "Rahmenverträge und Prognosen"
summary: "Sales Agreements, Account Forecasting, Programmgeschäft und Vertriebsziele: was sie leisten und welche ERP-Daten sie brauchen."
takeaways:
  - "Das Sales Agreement hält geplante Menge, Ist-Menge und Prognose pro Kunde, Produkt und Zeitraum in einem Datensatz."
  - "Die Ist-Mengen kommen aus dem ERP. Wie sie berechnet werden, legt der Actuals Calculation Mode fest, den jedes Sales Agreement bei der Anlage übernimmt."
  - "Salesforce empfiehlt Advanced Account Forecasting mit eigenen Forecast Sets pro Geschäftsbereich, freien Dimensionen und der Data Processing Engine."
  - "Ziele, Prognosen und Ist-Mengen ergeben nur zusammen Sinn, wenn alle drei dieselbe Kundenebene, dieselbe Produktebene und denselben Periodentyp nutzen."
  - "Produktions-, Material- und Kapazitätsplanung bleiben im ERP oder Planungssystem. Vor dem Start muss feststehen, welche Absatzzahl führend ist."
articles: [manufacturing-cloud-quote-to-agreement, manufacturing-cloud-sales-agreements-actuals, manufacturing-cloud-account-forecasting, manufacturing-cloud-program-based-business, manufacturing-cloud-account-manager-targets, sales-planning-agent-agreements]
faq:
  - q: "Was ist ein Sales Agreement in der Manufacturing Cloud?"
    a: "Ein Rahmenvertrag mit einem Kunden über Mengen pro Produkt und Zeitraum. Es hängt an einem Account und einem Preisbuch, Salesforce verteilt die Gesamtmenge auf Monate oder Quartale und stellt Plan, Ist und Prognose pro Zeitraum nebeneinander."
  - q: "Woher kommen die Ist-Mengen in einem Sales Agreement?"
    a: "Aus Aufträgen in Salesforce, direkt oder über Verträge verknüpft, aus einem Upload per API oder aus einer eigenen Definition der Data Processing Engine. Liegen die Aufträge im ERP, lädt eine Schnittstelle die Mengen pro Kunde, Produkt und Zeitraum."
  - q: "Was ist der Unterschied zwischen Account Forecasting und Advanced Account Forecasting?"
    a: "Account Forecasting nutzt eine Konfiguration für die ganze Org und plant nur auf Ebene Kunde, Produkt und Zeitraum. Advanced Account Forecasting erlaubt eigene Forecast Sets pro Geschäftsbereich, Region oder Land, freie Dimensionen wie Produktkategorie und angepasste Berechnungen. Salesforce empfiehlt die erweiterte Variante."
  - q: "Ersetzt die Manufacturing Cloud die Absatz- und Produktionsplanung im ERP?"
    a: "Nein. Sie liefert die Sicht des Vertriebs pro Kunde und Produkt. Was produziert wird, mit welchem Material und auf welcher Anlage, plant weiter das ERP oder ein Planungssystem, das die Vertriebsprognose als Eingang nutzt."
  - q: "Braucht jede Funktion dieses Kapitels eine eigene Lizenz?"
    a: "Sales Agreements, Prognosen, Programmgeschäft und Ziele haben jeweils eigene Schalter und Berechtigungssätze. Welche davon Ihre Edition enthält, steht nicht für jede Funktion auf der Preisseite. Lassen Sie sich die Liste im Angebot bestätigen."
draft: false
---

Die Vertriebsplanung der Manufacturing Cloud hat vier Bausteine. Sales Agreements halten Rahmenverträge mit Mengen pro Kunde, Produkt und Zeitraum und vergleichen sie mit den Ist-Mengen. Account Forecasting, heute in der Variante Advanced Account Forecasting, rechnet daraus mit Aufträgen und Opportunities eine Absatzprognose. Das Programmgeschäft leitet für Zulieferer den Komponentenbedarf aus OEM-Programmen ab. Account Manager Targets verteilen Jahresziele von der Vertriebsleitung bis auf Kunde und Produkt. Alle vier tragen nur, wenn Auftragshistorie und Ist-Mengen aus dem ERP verlässlich ankommen und Ziel, Prognose und Ist dieselbe Struktur haben. Die Planung von Produktion und Material bleibt im ERP.

## Warum steht das Sales Agreement im Mittelpunkt?

Viele Hersteller verdienen ihr Geld mit wiederkehrendem Geschäft: Ein Kunde nimmt Monat für Monat ähnliche Mengen ab, oft auf Basis eines Rahmenvertrags mit Jahresmenge. Im Englischen heißt das Run-Rate-Geschäft. Für dieses Geschäft zählt vor allem eine Frage: Liegt der Kunde im Plan?

Das Sales Agreement beantwortet sie. Laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_salesagreement.htm) hängt es an einem Account und einem Preisbuch. Pro Produkt wird eine Gesamtmenge eingetragen, die Salesforce auf die Zeiträume verteilt, und das Enddatum ergibt sich aus Startdatum, Häufigkeit und Anzahl der Zeiträume. Ein Agreement startet als Entwurf, wird freigegeben und aktiviert sich am Startdatum. Pro Zeitraum stehen dann Plan, Ist und Prognose nebeneinander.

Die [Hinweise in der Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.mfg_sa_considerations.htm&language=en_US&type=5) setzen Grenzen: höchstens 1.500 Produkte oder Produktkategorien und 72 Zeitpläne pro Agreement. Für einen Ersatzteilvertrag mit tausenden Positionen ist das eine Designfrage, bevor es eine technische wird.

```kennzahlen
1.500 | Produkte oder Produktkategorien höchstens pro Sales Agreement
72 | Zeitpläne höchstens pro Sales Agreement
quelle: Salesforce-Hilfe, Hinweise zu Sales Agreements
```

Warum ich das Sales Agreement für den wichtigsten Grund halte, über die Manufacturing Cloud nachzudenken, steht in [Kapitel 1](../einordnung-und-business-case/). Wie es im Alltag arbeitet, beschreibt [Sales Agreements: fehlende Abnahmemengen erkennen](../../../blog/sales-agreements-abnahmemengen-erp/).

## Vom Angebot zum Sales Agreement

Ein Sales Agreement plant Mengen pro Produkt. Daraus folgt eine Anforderung an alles, was vorher passiert: Jede Variante, die geplant und gemessen werden soll, braucht eine eigene Produktidentität, die auch das ERP als Materialnummer kennt. Bei konfigurierbaren Produkten entscheidet deshalb der Konfigurator, wann aus einer Konfiguration ein Produkt wird.

Für die Übergabe gibt es einen Standardweg. Die [Connect API der Manufacturing Cloud](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/connect_resources_sales_agreement.htm) erzeugt ein Sales Agreement aus einem Angebot, einer Opportunity oder einem eigenen Objekt, gesteuert über ein Mapping vom Typ ConvertToSalesAgreement. Das Mapping muss Account-Ebene, Produkt, Preis und Laufzeit sauber lösen. Den Preis gebe ich einmal frei, am Angebot, und nicht ein zweites Mal am Agreement. Die Details stehen in [vom Angebot zum Sales Agreement](../../../blog/angebot-zu-sales-agreement-produktkonfigurator/).

Das Angebot selbst gehört nicht zur Manufacturing Cloud. [Salesforce CPQ](https://www.salesforce.com/sales/cpq/end-of-life/) wird an Neukunden nicht mehr verkauft, neue Funktionen entstehen in Revenue Cloud. Katalog, Konfigurator und Preise behandelt die Masterclass Revenue Cloud in [Produktkatalog, Konfigurator und Preise](../../revenue-cloud/produktkatalog-konfigurator-preise/).

## Ist-Mengen: warum die ERP-Schnittstelle alles entscheidet

Die Planmengen pflegt der Vertrieb beim Abschluss. Die Ist-Mengen entstehen bei Herstellern fast immer im ERP, wo Aufträge angelegt und ausgeliefert werden. Ohne sie zeigt ein Sales Agreement nur einen Plan.

Wie die Ist-Mengen berechnet werden, legt laut [Salesforce-Hilfe](https://help.salesforce.com/apex/HTViewHelpDoc?id=sa_admin_actualscalc_task.htm&language=en_us) die Einstellung Actuals Calculation Mode fest: aus direkt verknüpften Aufträgen, aus Aufträgen über Verträge, per Upload über die API oder mit einer eigenen Definition der Data Processing Engine. Jedes Agreement übernimmt den Modus bei seiner Anlage. Wer nach einem Jahr umstellt, hat zwei Sorten Agreements in der Org. Ich lege den Modus deshalb vor dem ersten produktiven Agreement fest.

Liegen die Aufträge im ERP, schreibt eine Schnittstelle laut [Hilfe zum Import](https://help.salesforce.com/s/articleView?id=ind.mfg_sa_actuals_api_external.htm&language=en_US&type=5) Actual Quantity und Actual Amount in die Zeitpläne der Agreement-Produkte, per Bulk API oder Data Loader. Ein täglicher Job um 1:00 Uhr in der Zeitzone der Org aktualisiert danach die Agreements. Für eine Neuberechnung außerhalb dieses Laufs gibt es seit API-Version 47.0 die Aktion [Refresh Actuals Calculation](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_actions_refresh_actuals_calculation.htm). Sie rechnet für ein Agreement den aktuellen Zeitraum, auf Wunsch auch vergangene oder künftige Zeiträume neu, und verlangt den Berechtigungssatz Manufacturing Sales Agreements.

```ablauf
erp: ERP-Aufträge
sf: Agreement-Zeitpläne, Täglicher Job, Refresh Actuals, Sales Agreement
ERP-Aufträge --per Bulk API--> Agreement-Zeitpläne
Agreement-Zeitpläne --> Täglicher Job
Täglicher Job --um 1:00 Uhr--> Sales Agreement
Refresh Actuals ..bei Bedarf..> Sales Agreement
```

Drei Entscheidungen bestimmen, ob die Zahlen stimmen:

- **Account-Ebene.** Verhandelt der Konzern und bestellen die Werke, muss die Schnittstelle Aufträge mehrerer Auftraggeber im ERP einem Agreement zuordnen. Diese Zuordnungstabelle braucht einen Verantwortlichen.
- **Summen oder Aufträge.** Für den Plan-Ist-Vergleich reichen Summen pro Kunde, Produkt und Zeitraum. Ganze Aufträge lohnen sich, wenn Vertrieb oder Service sie ohnehin in Salesforce sehen sollen.
- **Lagerbestand daneben.** Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/configure-sales-agreements-to-negotiate-better) lassen sich eigene Kennzahlen wie der Bestand im Agreement mitführen. Erst damit sieht der Vertrieb, ob eine offene Menge lieferbar ist.

Welches System für welche Daten führend ist, kläre ich im Rahmen von [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/).

```praxis
Ich habe Rahmenverträge mit Ist-Mengen aus dem ERP in Manufacturing Cloud eingeführt, und die ERP-Schnittstelle war dabei einer der Stolpersteine. Klären Sie deshalb früh, welche Aufträge und Lieferungen als Ist zählen und wer die Daten verantwortet.
```

## Account Forecasting oder Advanced Account Forecasting?

Account Forecasting ist die Absatzprognose der Manufacturing Cloud: Mengen und Umsätze pro Kunde, Produkt und Zeitraum, gerechnet aus Aufträgen, Opportunities und Sales Agreements und von Menschen angepasst. Es gibt sie in zwei Varianten.

| | Account Forecasting | Advanced Account Forecasting |
|---|---|---|
| Konfiguration | eine für die ganze Org | eigene Forecast Sets pro Geschäftsbereich, Region oder Land |
| Granularität | nur Kunde, Produkt und Zeitraum | freie Dimensionen, etwa Produktkategorie oder Region |
| Berechnung | fest | Vorlagen der Data Processing Engine, klonbar |
| Anpassung | ein Zeitraum | eigene Anpassungszeiträume pro Profil, etwa Partner, Account Manager, Regionalleiter |

So beschreibt es das [Trailhead-Modul zu Advanced Account Forecasting](https://trailhead.salesforce.com/content/learn/modules/advanced-account-forecasting-with-manufacturing-cloud/explore-advanced-account-forecasting). Die vordefinierten Vorlagen heißen dort Generate, Regenerate, Rollover und Recalculate Account Forecast. Salesforce empfiehlt in der [Unit zur Prognosestrategie](https://trailhead.salesforce.com/content/learn/modules/advanced-account-forecasting-with-manufacturing-cloud/decide-your-forecasting-strategies) die erweiterte Variante und nennt als zweite Option, beide für getrennte Geschäftsbereiche nebeneinander zu betreiben. Für eine Neueinführung sehe ich keinen Grund, mit der einfachen Variante zu starten.

Zwei Folgen für die Architektur. Erstens ist Account Forecasting zuerst ein Integrationsprojekt, weil die Auftragshistorie im ERP liegt. Zweitens zählt Salesforce die Prognosedatensätze gegen ein Limit; 2.000 Kunden, 500 Produkte und 24 Monate ergeben rechnerisch 24 Millionen Kombinationen. Den Zuschnitt aus Kunden, Produkten und Zeiträumen beschreibe ich in [Account Forecasting für die Absatzprognose](../../../blog/account-forecasting-absatzprognose-vertrieb/).

Forecast Sets, Dimensionen und geklonte DPE-Definitionen sind Konfiguration. Sie gehören in den Release-Prozess wie jede andere Änderung, wie im DevOps-Kapitel [Daten und Konfiguration](../../devops-release-management/daten-und-konfiguration/) beschrieben.

## Programmgeschäft für Zulieferer von OEM-Programmen

Das Programmgeschäft (Program Based Business) ist für Zulieferer gedacht, deren Teile in Serienprodukte großer Kunden gehen. Startet ein OEM ein Programm, muss der Zulieferer lange vor dem ersten Auftrag schätzen, wie viele seiner Teile jede Variante braucht.

Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/get-started-with-program-based-business) kommen Programm- und Variantenprognosen als CSV-Dateien, oft aus externen Marktdaten. Daraus berechnen Vorlagen der Data Processing Engine die Komponentenprognosen, auf Basis von Menge pro Einheit, Mindestmenge und Vorlaufzeit jeder Komponente. Eine freigegebene Prognose wird über die Transformation API zur Opportunity und nach dem Gewinn über die Sales Agreement Connect API zum Rahmenvertrag. Voraussetzung sind Advanced Account Forecasting, Data Pipelines und die Funktion selbst.

Bei einer Handvoll Programmen oder wenn ein Planungssystem den Komponentenbedarf schon ableitet, entsteht eine zweite Prognose statt einer besseren. Wann es sich lohnt, steht in [Programmgeschäft: Prognosen für Zulieferer](../../../blog/programmgeschaeft-zulieferer-prognose/).

## Account Manager Targets: Ziele von oben nach unten

Account Manager Targets ersetzen den Verteilungsteil der Excel-Zielplanung. Laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/manufacturing_standard_object_account_manager_target.htm) legt die Vertriebsleitung ein Jahresziel auf Umsatz, Stückzahl oder eine eigene Kennzahl an und verteilt es über die Manager- oder Forecast-Hierarchie. Jede Ebene verteilt weiter auf Kunden, Produkte und Monate; ein Umsatzziel pro Produkt rechnet Salesforce über den Listenpreis aus dem Preisbuch, das bei der Einrichtung als Default gewählt wurde, in Stück um.

Änderungen laufen nicht von selbst nach unten. Ein Manager gibt sie weiter, oder ein Flow ruft die Aktion [Update Account Manager Target Values](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_actions_account_manager_target.htm) auf. Nach einer Umorganisation werden Zuordnungen ungültig und müssen neu verteilt werden. Provisionen rechnet die Funktion nicht. Die Details, auch zum Datensatzlimit, stehen in [Account Manager Targets: Vertriebsziele pro Kunde](../../../blog/account-manager-targets-vertriebsziele/).

## Welche Daten braucht eine Absatzplanung in Salesforce?

Mehr aus dem ERP, als die meisten Workshops annehmen. Die Übersicht:

| Baustein | Was aus Salesforce kommt | Was von außen kommen muss |
|---|---|---|
| Sales Agreements | Plan pro Kunde, Produkt und Zeitraum | Ist-Mengen und Lagerbestand aus dem ERP, Materialnummern |
| Account Forecasting | Opportunities, Anpassungen | Auftragshistorie aus dem ERP |
| Programmgeschäft | Anpassungen, Opportunities | Programm- und Variantenprognosen, Menge pro Einheit, Vorlaufzeiten |
| Account Manager Targets | Ziele und Verteilung | Ist-Umsatz in derselben Struktur, ein gepflegtes Feld Manager |

Die wichtigste Regel steht in keiner Tabelle: Ziel, Prognose und Ist brauchen dieselbe Kundenebene, dieselbe Produktebene und denselben Periodentyp. Liegt das Ziel auf Produkten und die Prognose auf Produktkategorien, oder bucht das ERP den Umsatz auf den Auftraggeber und das Ziel hängt am Konzern, vergleicht das Monatsreview drei Zahlen, die nicht zusammenpassen können. Ich lege diese drei Ebenen fest, bevor die erste Funktion eingeschaltet wird.

## Wo endet die Planung in Salesforce?

Bei der Frage, was produziert wird. Salesforce liefert die Erwartung des Vertriebs: welcher Kunde welche Menge in welchem Monat abnehmen wird. Ob diese Menge produziert werden kann, mit welchem Material und auf welcher Anlage, entscheidet die Planung im ERP oder in einem eigenen Planungssystem.

Daraus folgen zwei Festlegungen. Es gibt eine führende Absatzzahl und einen Termin, an dem sie übergeben wird; zwei gepflegte Prognosen laufen auseinander. Und die Übergabe braucht die Granularität, mit der das ERP plant, also oft Materialnummer und Werk. Eine Prognose auf Produktkategorie hilft der Produktionsplanung dann nur begrenzt.

## Was kann der Sales-Planning-Agent dazu beitragen?

Auf den Sales Agreements sitzt die Agentenvorlage Agentforce for Sales Planning. Die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=ind.mfg_gen_ai_agentforce_sales_planning_agent.htm&language=en_US&type=5) nennt drei Subagents: Sales Agreement Management, Sales Agreement Bulk Update und Program Forecasts to Opportunities. Der Agent beantwortet Fragen zu Agreements, schreibt Zusammenfassungen, hilft bei Besuchen und E-Mails und ändert Agreements in Massen. Mit Account Forecasts oder Zielen arbeitet laut Beschreibung keiner der drei.

Jede Antwort zum Rückstand eines Kunden beruht auf den Ist-Mengen aus dem ERP. Fehlt eine Tochtergesellschaft im Datenfluss, meldet der Agent einen Rückstand, den es nicht gibt. Was die Vorlage kann und welche Lizenz sie braucht, steht in [Agentforce Vertriebsplanung: was der Agent wirklich kann](../../../blog/agentforce-vertriebsplanung-rahmenvertraege/), den Überblick über Agenten in der Fertigung gibt [KI-Agenten in der Fertigung](../../ki-salesforce/ki-agenten-in-der-fertigung/).

## Rechenbeispiel: 200 Rahmenverträge für Industrieventile

Ein Hersteller von Industrieventilen mit 30 Account Managern hat 200 Rahmenverträge mit Händlern und Anlagenbauern, Aufträge in SAP. Heute pflegt jeder Account Manager eine Tabelle mit Plan und Prognose, die der Vertriebscontroller monatlich zusammenführt.

Die Reihenfolge, die ich vorschlagen würde:

```schritte
Ebenen festlegen
  Account-Ebene pro großem Kunden, Produktkategorie oder Produkt, Monat als Periodentyp.
Ist-Datenfluss bauen
  Summen pro Kunde, Produkt und Monat aus SAP, täglich geladen, mit Ladedatum im Bericht.
Sales Agreements einführen
  Modus für die Ist-Mengen vor dem ersten Agreement, die 20 größten Verträge gegen SAP abgeglichen.
Advanced Account Forecasting
  Ein Forecast Set und ein festes Anpassungsfenster in der ersten Monatswoche.
Ziele
  Erst im nächsten Geschäftsjahr, wenn Ist und Prognose dieselbe Struktur haben.
```

Programmgeschäft braucht dieser Hersteller nicht, weil er nicht in OEM-Programme liefert. Den Agenten würde ich erst prüfen, wenn der Ist-Datenfluss ein Quartal lang stabil läuft.

## Erster Schritt: den Ist-Datenfluss aus dem ERP klären

Klären Sie vor dem ersten Sales Agreement, wie die Ist-Mengen aus dem ERP kommen und auf welcher Kunden-, Produkt- und Periodenebene Ziel, Prognose und Ist zusammenpassen. Rahmenverträge und Prognosen betreffen den Direktvertrieb an große Kunden. Wer über Händler verkauft, braucht zusätzlich Boni, Portale und Händlerbesuche; das behandelt [Kapitel 3: Händler und Partnerkanal](../haendler-und-partnerkanal/). Alle Kapitel finden Sie auf der [Übersichtsseite](../).
