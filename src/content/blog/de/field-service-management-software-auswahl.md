---
title: "Field Service Management Software für Hersteller"
description: "Field Service Management Software für Hersteller: wann Salesforce Field Service passt, wann SAP Field Service Management, IFS oder ServiceNow."
pubDate: 2026-10-31
lang: de
slug: field-service-management-software-auswahl
translationKey: field-service-management-software
topic: field-service
categories: [field-service, architecture]
contactBrief: make-or-buy
tags: [Field Service Management, FSM Software, SAP Field Service Management, IFS, ServiceNow, Salesforce Field Service]
takeaways:
  - "Jede Field Service Management Software deckt dieselben Kernaufgaben ab: Terminplanung, mobile App für Techniker, Anlagen und Verträge, Ersatzteile und die Rückmeldung an das ERP."
  - "Welche passt, entscheidet vor allem das System, das heute führt: Service Cloud und Portale sprechen für Salesforce, S/4HANA als Rückgrat für SAP, IFS-ERP für IFS und ServiceNow für ServiceNow."
  - "SAP Field Service Management sitzt laut SAP zwischen SAP Service Cloud und S/4HANA. Stammdaten, Auftragsanlage und Abrechnung bleiben im ERP."
  - "Die größten Risiken liegen bei allen Produkten an denselben Stellen: Qualität der Anlagendaten, Akzeptanz der Techniker und Schnittstellen zum ERP."
  - "Vergleichen Sie Anbieter an Ihren eigenen Einsätzen, mit echten Anlagen und echten Technikern, statt an Funktionslisten."
faq:
  - q: "Was ist eine Field Service Management Software?"
    a: "Eine Field Service Management Software plant und steuert Einsätze von Technikern beim Kunden. Sie verteilt Aufträge nach Qualifikation und Verfügbarkeit, schickt sie an eine mobile App und dokumentiert Arbeitszeit, Material und Ergebnis für die Abrechnung im ERP."
  - q: "Was ist SAP Field Service Management?"
    a: "SAP Field Service Management ist die Cloud-Lösung von SAP für Planung, Disposition und mobile Ausführung von Serviceeinsätzen. Laut SAP bleibt S/4HANA das Rückgrat für Stammdaten, Auftragsanlage und Abrechnung, SAP Service Cloud übernimmt die Kundeninteraktion."
  - q: "Ist Salesforce Field Service besser als SAP Field Service Management?"
    a: "Das hängt davon ab, welches System bei Ihnen führt. Läuft der Kundenservice schon in der Service Cloud, spricht viel für Salesforce. Ist S/4HANA das Rückgrat und soll der Service dort enden, ist SAP Field Service Management naheliegend."
  - q: "Wann kommt ServiceNow für den Außendienst in Frage?"
    a: "Wenn ServiceNow im Unternehmen bereits für Kundenservice oder Workflows gesetzt ist. ServiceNow bietet Field Service Management in zwei Paketen an, Advanced und Prime, wobei nur Prime die Schedule Optimization enthält."
draft: false
---

Für Hersteller kommen bei Field Service Management Software vor allem vier Produkte in Frage: Salesforce Field Service, SAP Field Service Management, IFS Cloud Field Service Management und ServiceNow Field Service Management. Alle planen Einsätze, haben eine mobile App und melden Arbeit und Material an das ERP zurück. Welches passt, hängt weniger an den Funktionen als daran, welches System bei Ihnen heute führt. Ich arbeite mit Salesforce und beschreibe die anderen Produkte nach Herstellerangaben. Dieser Artikel zeigt, wann welcher Weg naheliegt und wie Sie die Auswahl angehen.

## Was gehört zu einer Field Service Management Software?

Unabhängig vom Anbieter deckt eine Field Service Management Software sechs Aufgaben ab:

- **Terminplanung und Disposition.** Einsätze werden nach Qualifikation, Verfügbarkeit und Fahrzeit verteilt, manuell auf einer Plantafel oder automatisch durch eine Optimierung.
- **Mobile App.** Techniker sehen Auftrag, Anlage und Historie, auch offline, und erfassen Zeit, Material, Fotos und Unterschrift.
- **Anlagen und installierte Basis.** Welche Maschine steht wo, in welcher Konfiguration, mit welcher Historie.
- **Verträge und Wartungspläne.** Was ist abgedeckt, wann ist die nächste Wartung fällig.
- **Ersatzteile.** Bestand im Lager und im Fahrzeug, Bestellung und Rücklauf.
- **Servicepartner.** Externe Techniker und Subunternehmer, die Einsätze übernehmen.

Die Abrechnung läuft bei Herstellern fast immer im ERP. Deshalb ist die Schnittstelle zum ERP bei jedem Produkt Teil der Auswahl, auch beim Produkt des ERP-Herstellers.

## Welche Anbieter kommen für Hersteller in Frage?

| Produkt | Grundlage | Naheliegend, wenn |
|---|---|---|
| Salesforce Field Service | Service Cloud, eine Plattform mit Vertrieb, Service und Portalen | Kundenservice und Vertrieb schon in Salesforce laufen |
| SAP Field Service Management | Cloud-Lösung von SAP zwischen SAP Service Cloud und S/4HANA | S/4HANA das Rückgrat ist und Serviceaufträge dort enden |
| IFS Cloud Field Service Management | Teil von IFS Cloud, neben ERP und Enterprise Asset Management von IFS | IFS bereits als ERP oder für Anlagenmanagement im Einsatz ist |
| ServiceNow Field Service Management | ServiceNow-Plattform, laut ServiceNow im CRM-Angebot neben Customer Service Management | ServiceNow für Kundenservice oder Workflows gesetzt ist |

Eine fünfte Option für Salesforce-Kunden ist ServiceMax, das heute zu PTC gehört und auf Salesforce aufsetzt. Den Vergleich habe ich in [ServiceMax oder Salesforce Field Service?](../servicemax-oder-salesforce-field-service/) beschrieben.

## Wann passt Salesforce Field Service?

Salesforce Field Service baut auf der Service Cloud auf. Fall, Arbeitsauftrag, Anlage und Kunde liegen in einem Datenmodell mit Vertrieb, Kundenportal und Partnerportal. Das ist die Stärke: Ein Kunde meldet eine Störung im Portal, der Innendienst macht daraus einen Arbeitsauftrag, und der Techniker sieht dieselbe Historie. Wie dieser Weg aussieht, beschreibe ich in [Vom Case zum Arbeitsauftrag](../field-service-case-zu-arbeitsauftrag/).

Salesforce Field Service lohnt sich am meisten bei vielen kurzen Einsätzen pro Tag, weil die Optimierung dort viel bewirkt. Bei wenigen langen Einsätzen ist der Nutzen kleiner. Die Rechnung dazu steht in [Salesforce Field Service: Wann lohnt es sich?](../salesforce-field-service-lohnt-sich/).

Der Preis dafür ist die Schnittstelle zum ERP. Ersatzteile, installierte Basis und Abrechnung kommen bei Herstellern meist aus SAP oder einem anderen ERP. Welche Daten dabei fließen, zeigt [Ersatzteile aus dem ERP in Field Service](../salesforce-field-service-ersatzteile-erp/).

## Wann passt SAP Field Service Management?

SAP beschreibt in seinem [Lernportal zu SAP Field Service Management](https://learning.sap.com/courses/managing-sap-field-service-management/exploring-sap-solution-portfolio-for-service) eine klare Arbeitsteilung: S/4HANA ist das Rückgrat für Stammdaten, Logistik, Finanzen und Auftragsabwicklung. SAP Service Cloud übernimmt die Interaktion mit Endkunden, etwa Ticketing. SAP Field Service Management liegt dazwischen und deckt Planung, Disposition und mobile Ausführung ab, mit Apps für iOS, Android und Windows, die laut SAP vollständig offline arbeiten. Mit Crowd Service bindet es Servicepartner und Subunternehmer ein.

Für Hersteller, deren Serviceaufträge ohnehin in S/4HANA angelegt und abgerechnet werden, ist das ein starkes Argument. Laut SAP gibt es mit SAP Service and Asset Manager außerdem eine mobile App, die direkt auf S/4HANA arbeitet. Wer SAP prüft, sollte deshalb früh klären, welche der beiden Apps gemeint ist.

Die Frage, die dabei bleibt: Wo liegt der Kundenkontakt? Wenn Vertrieb und Kundenservice in Salesforce laufen, der Außendienst aber in SAP, verteilt sich die Sicht auf den Kunden auf zwei Welten. Das ist dieselbe Abwägung wie bei der Wahl des CRM selbst.

## Wann kommen IFS oder ServiceNow in Frage?

**IFS** stellt [Field Service Management](https://www.ifs.com/solutions/field-service-management) als Teil von IFS Cloud vor, neben ERP und Enterprise Asset Management. Die Planung wirbt mit KI-gestützter Optimierung, die für jeden Auftrag den passend qualifizierten Techniker sucht. Naheliegend ist IFS, wenn das Unternehmen IFS bereits als ERP oder für das Anlagenmanagement nutzt.

**ServiceNow** bietet [Field Service Management](https://www.servicenow.com/products/field-service-management/pricing.html) in zwei Paketen an. FSM Advanced enthält unter anderem Disposition, Dispatcher Workspace, mobile Apps, geplante Arbeit, Ersatzteile und Subunternehmer. FSM Prime ergänzt Schedule Optimization und Workforce Optimization. Preise gibt es nur auf Anfrage. Naheliegend ist ServiceNow, wenn es im Unternehmen schon für Kundenservice oder Workflows gesetzt ist.

```praxis
In meinen Field-Service-Projekten mit Wartung, Störungseinsätzen und Inbetriebnahmen kamen Ersatzteile und installierte Basis aus dem ERP, und die Terminplanung lief automatisch. Die Stolpersteine waren die Qualität der Anlagendaten, die Akzeptanz der Techniker und die Schnittstellen zum ERP. Diese drei Punkte hängen kaum vom Produkt ab und gehören in jede Auswahl.
```

## Wie gehen Sie die Auswahl an?

Funktionslisten der vier Anbieter sehen sich ähnlich. Unterschiede zeigen sich erst an Ihren eigenen Einsätzen. Ich empfehle diese Reihenfolge:

```schritte
Ausgangslage | 2 bis 4 Wochen · Kunde
  Führendes System, Einsatzarten, Zahl der Techniker und ERP-Schnittstellen aufnehmen.
Vorauswahl | 2 Wochen · Kunde
  Zwei Anbieter wählen, die zum führenden System passen.
Szenarien | 4 bis 6 Wochen · Kunde und Anbieter
  Echte Einsätze mit echten Anlagendaten durchspielen, mit Technikern.
Rechnung | 2 Wochen · Kunde
  Lizenzen, Schnittstellen und Betrieb über mehrere Jahre vergleichen.
```

Für die Szenarien eignen sich drei typische Einsätze: eine Wartung nach Plan, eine Störung mit Ersatzteil und eine Inbetriebnahme über mehrere Tage. Lassen Sie Techniker die mobile App selbst bedienen, nicht nur zuschauen. Und prüfen Sie mit echten Anlagendaten aus dem ERP, wie die [Anlagenhierarchie](../field-service-asset-hierarchie-maschinen/) im neuen System aussieht.

Bei der Rechnung gehören die Lizenzen nach Rolle dazu, also Disponenten, Techniker und Servicepartner. Für Salesforce habe ich das in [Field-Service-Lizenzen nach Rolle](../field-service-lizenzen-rollen-dispatcher-techniker/) aufgeschlüsselt. Wie ich solche Entscheidungen mit Kunden vorbereite, steht unter [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

Die beste Field Service Management Software ist die, die zu Ihrem führenden System passt und mit der Ihre Techniker morgens gern losfahren.
