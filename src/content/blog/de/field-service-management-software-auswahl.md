---
title: "Field Service Management Software für Hersteller"
description: "Field Service Management Software für Hersteller: wie Sie Salesforce Field Service, SAP Field Service Management, IFS oder ServiceNow vorauswählen."
pubDate: 2026-11-06
lang: de
slug: field-service-management-software-auswahl
translationKey: field-service-management-software
topic: field-service
categories: [field-service, architecture]
contactBrief: make-or-buy
tags: [Field Service Management, FSM Software, SAP Field Service Management, IFS, ServiceNow, Salesforce Field Service]
takeaways:
  - "Das heute führende System für Kunden, Aufträge oder Anlagen grenzt die Vorauswahl ein. Die Entscheidung ergibt sich daraus aber nicht allein."
  - "Hinter denselben Funktionsnamen stecken unterschiedliche Pakete, Add-ons und ERP-Schnittstellen. Prüfen Sie, was die angebotene Lizenz enthält."
  - "Für Hersteller zählen installierte Basis, mehrtägige Einsätze, Verträge und Garantie, Ersatzteile und die Rückmeldung an das ERP."
  - "In meinen Projekten hakte es bei Anlagendaten, Akzeptanz der Techniker und ERP-Schnittstellen. Das gibt es bei jedem Produkt, nur unterschiedlich stark."
  - "Vergleichen Sie zwei Anbieter anhand eigener Einsätze, mit Disposition, Innendienst und Technikern, statt anhand von Funktionslisten."
faq:
  - q: "Was ist eine Field Service Management Software?"
    a: "Eine Field Service Management Software plant und steuert Einsätze von Technikern beim Kunden. Sie weist Aufträge nach Qualifikation und Verfügbarkeit zu, schickt sie an eine mobile App und erfasst Arbeitszeit, Material und Ergebnisse. Diese Daten fließen meist zur Abrechnung ins ERP."
  - q: "Was ist SAP Field Service Management?"
    a: "SAP Field Service Management ist die Cloud-Lösung von SAP für Planung, Disposition und mobile Ausführung von Serviceeinsätzen. Laut SAP übernimmt typischerweise ein Backend wie S/4HANA oder SAP Service Cloud Stammdaten und die Anlage von Aufträgen, die kaufmännische Folgeverarbeitung läuft ebenfalls dort."
  - q: "Heißt S/4HANA automatisch SAP Field Service Management?"
    a: "Nein. S/4HANA setzt SAP Field Service Management auf die Vorauswahlliste, weil SAP Standardinhalte für die Integration anbietet. Gleichen Sie diese Inhalte mit Ihrem tatsächlichen S/4HANA-Prozess ab. Laufen Kundenservice und Vertrieb in Salesforce, gehört Salesforce Field Service mit auf die Liste. Entscheiden sollte der Test mit Ihren eigenen Einsätzen."
  - q: "Wann kommt ServiceNow für den Außendienst in Frage?"
    a: "Naheliegend ist ServiceNow, wenn der Kundenservice bereits auf ServiceNow Customer Service Management läuft, nicht nur das IT-Service-Management. Stand November 2026 bietet ServiceNow die Pakete Advanced und Prime an; nur Prime enthält Schedule Optimization."
draft: false
---

Wenn Hersteller Field Service Management Software suchen, kommen meist vier Plattformen in die engere Wahl: Salesforce Field Service, SAP Field Service Management, IFS Cloud Field Service Management und ServiceNow Field Service Management. Es gibt weitere, etwa Microsoft Dynamics 365 Field Service, Oracle Field Service oder ServiceMax. Das heute führende System für Kunden, Aufträge oder Anlagen grenzt die Vorauswahl ein, weil es stark beeinflusst, wie viel Integration Sie brauchen. Entscheiden sollten Sie aber anhand Ihrer eigenen Einsätze. Ich arbeite mit Salesforce und habe die anderen drei nicht eingeführt; ich beschreibe sie nach Herstellerangaben, geprüft am 6. November 2026.

## Was muss eine Field Service Management Software für Hersteller leisten?

Die Anbieter verwenden dieselben Begriffe: Terminplanung, mobile App, Anlagen, Ersatzteile. Dahinter stecken unterschiedliche Pakete, Add-ons und Schnittstellen. Für Hersteller lohnt es sich, diese Bereiche zu prüfen:

```tabelle
titel: Was Sie bei der Field-Service-Auswahl prüfen
spalten: Bereich | Was dazugehört | Was Sie testen
Terminplanung und Disposition | Einsätze nach Qualifikation, Verfügbarkeit, Fahrzeit; manuell oder optimiert | Ihren Einsatzmix, Teams und mehrtägige Einsätze
Mobile App | Auftrag, Anlage und Historie, auch offline; Zeit, Material, Fotos, Unterschrift | Ob Techniker sie bei realen Einsätzen selbst bedienen können
Installierte Basis | Welche Maschine steht wo, in welcher Konfiguration, mit welcher Historie | Ihre Anlagenhierarchien aus dem ERP
Verträge und Garantie | Abdeckung, Ansprüche, SLAs und Wartungspläne | Ihre Vertragsarten und Garantieregeln
Ersatzteile | Bestand im Lager und im Fahrzeug, Reservierung, Rückgaben | Reservierung und Rückgaben im Zusammenspiel mit dem ERP
Berichte und Checklisten | Servicebericht, Messwerte, Abnahme durch den Kunden | Ihren Bericht und die Unterschrift vor Ort
Servicepartner | Externe Techniker und Subunternehmer | Zugang, Zuweisung, Rückmeldung und Abrechnung der Partner
Rückmeldung an das ERP | Zeit, Material und Fahrt zur Abrechnung zurückmelden | Welche Daten in welchem Paket und mit welchem Aufwand fließen
fazit: Dass es eine Funktion gibt, reicht als Prüfkriterium nicht. Entscheidend sind die nötige Lizenz oder das Add-on und der verbleibende Eigenbau.
```

Die Abrechnung bleibt bei Herstellern meist im ERP; in den Programmen, die ich kenne, war das immer so. Deshalb gehört die Schnittstelle zum ERP bei jedem Produkt zur Auswahl, auch beim Produkt des ERP-Herstellers.

## Vier Plattformen für die Vorauswahl

```tabelle
titel: Vier Plattformen für Hersteller
spalten: Produkt | Grundlage | Naheliegender Kandidat, wenn
Salesforce Field Service | Salesforce-Plattform, eng mit Service Cloud verbunden; eigene Lizenzen für Disponenten, Techniker, Subunternehmer | Kundenservice und Vertrieb schon in Salesforce laufen
SAP Field Service Management | Cloud-Lösung von SAP neben einem Backend wie S/4HANA oder SAP Service Cloud | S/4HANA für Serviceaufträge und Abrechnung führend ist
IFS Cloud Field Service Management | Teil von IFS Cloud, neben ERP und Anlagenmanagement | IFS schon als ERP oder für das Anlagenmanagement im Einsatz ist
ServiceNow Field Service Management | ServiceNow-Plattform, Teil des Angebots für Kundenservice | der Kundenservice schon auf ServiceNow läuft, nicht nur das IT-Service-Management
fazit: Ein naheliegender Kandidat ist noch keine Entscheidung. Gerade wenn Kundenkontakt und ERP in verschiedenen Systemen liegen, testen Sie mindestens eine Alternative.
```

Salesforce-Kunden begegnen außerdem ServiceMax, das heute zu PTC gehört und auf Salesforce aufsetzt. Den Vergleich habe ich in [ServiceMax oder Salesforce Field Service?](../servicemax-oder-salesforce-field-service/) beschrieben.

## Salesforce Field Service passt, wenn der Kundenkontakt in Salesforce läuft

Salesforce Field Service nutzt die Salesforce-Plattform und ist eng mit der Service Cloud verbunden: Ein Arbeitsauftrag kann mit Case, Account und Asset verknüpft sein. Wenn Datenmodell, Integration und Berechtigungen dafür eingerichtet sind, meldet ein Kunde eine Störung im Portal, der Innendienst macht daraus einen Arbeitsauftrag, und der Techniker sieht dieselbe Historie. Wie dieser Weg aussieht, beschreibe ich in [Vom Case zum Arbeitsauftrag](../field-service-case-zu-arbeitsauftrag/). Laut [Preisseite von Salesforce](https://www.salesforce.com/service/field-service-management/pricing/) brauchen Disponenten, Techniker und Subunternehmer eigene Lizenzen, und manche Funktionen wie Asset Service Lifecycle Management sind Add-ons; Salesforce verkauft das Produkt inzwischen als Field Service and Operations.

In meiner Kostenrechnung lohnte sich die Optimierung der Terminplanung am meisten bei vielen kurzen Einsätzen pro Tag; bei wenigen langen Einsätzen war der Nutzen kleiner. Die Annahmen finden Sie in [Salesforce Field Service: Wann lohnt es sich?](../salesforce-field-service-lohnt-sich/).

Die Abwägung: Der Medienbruch zwischen Kundenservice und Außendienst kann verschwinden. In den Architekturen, die ich kenne, blieb das ERP aber führend für Ersatzteile, installierte Basis und Abrechnung; Daten mussten also integriert oder repliziert werden. Welche Daten fließen, zeigt [Ersatzteile aus dem ERP in Field Service](../salesforce-field-service-ersatzteile-erp/).

## Wann gehört SAP Field Service Management auf die Vorauswahl?

SAP beschreibt in seinem [Lernportal zu SAP Field Service Management](https://learning.sap.com/courses/managing-sap-field-service-management/exploring-sap-solution-portfolio-for-service) eine Arbeitsteilung: Ein Backend, typischerweise S/4HANA oder SAP Service Cloud, übernimmt Stammdaten und die Anlage von Aufträgen. Die kaufmännische Folgeverarbeitung läuft meist dort oder im dahinterliegenden ERP. SAP Field Service Management deckt Planung, Disposition und mobile Ausführung ab und bietet Apps für iOS, Android und Windows, die laut SAP offline arbeiten. Mit Crowd Service bindet es Servicepartner ein.

Für Hersteller, deren Serviceaufträge in S/4HANA angelegt und abgerechnet werden, bietet SAP Standardinhalte für die Integration. Gleichen Sie diese Inhalte mit Ihrem tatsächlichen Prozess ab, etwa danach, ob es um Serviceaufträge oder Instandhaltung geht. Es bleibt eine Schnittstelle, die eingeführt und betrieben werden muss. SAP bietet außerdem SAP Service and Asset Manager an, eine mobile App, die direkt auf S/4HANA arbeitet, ohne SAP Field Service Management. Damit ändert sich die Architektur, nicht nur die App. Klären Sie früh, welche Variante in einem Angebot gemeint ist.

Laufen Vertrieb und Kundenservice in Salesforce, der Außendienst aber in SAP, ist die Sicht auf den Kunden auf zwei Systeme verteilt. Das ist dieselbe Abwägung wie bei der Wahl des CRM selbst.

## IFS und ServiceNow gehören auf die Liste, wenn sie schon führende Systeme sind

**IFS** stellt [Field Service Management](https://www.ifs.com/en/products/fsm) als Teil von IFS Cloud vor, mit Terminplanung, mobilen Technikern, Subunternehmersteuerung und Ersatzteillogistik. IFS positioniert es auch für den Einsatz neben anderen Unternehmenssystemen. Naheliegend ist IFS, wenn es bereits als ERP oder für das Anlagenmanagement läuft.

**ServiceNow** bietet [Field Service Management](https://www.servicenow.com/products/field-service-management/pricing.html) in zwei Paketen an, Stand November 2026. FSM Advanced enthält Disposition, mobile Apps, geplante Arbeit, Ersatzteile und Subunternehmersteuerung; FSM Prime ergänzt Schedule Optimization und Workforce Optimization. Preise gibt es auf Anfrage. Dass ServiceNow für IT-Tickets im Haus ist, reicht als Grund nicht; naheliegend wird es erst, wenn der Kundenservice schon auf dem Customer Service Management von ServiceNow läuft.

Bei der Terminplanung unterscheiden sich die Produkte darin, welche Bedingungen die Optimierung berücksichtigt, etwa Teams, Ersatzteile oder mehrtägige Einsätze, wie sie im Tagesverlauf neu plant und wie Disponenten eingreifen können. Testen Sie das an Ihren eigenen Einsätzen.

```praxis
In meinen Field-Service-Projekten mit Wartung, Störungseinsätzen und Inbetriebnahmen stammten Ersatzteile und installierte Basis aus dem ERP, und die Terminplanung erfolgte automatisch. Die Stolpersteine waren die Qualität der Anlagendaten, die Akzeptanz bei den Technikern und die Schnittstellen zum ERP. Diese drei Risiken gibt es bei jedem Produkt; wie groß sie werden, hängt von Produkt und Architektur ab. Sie gehören in jede Auswahl.
```

## Zwei Anbieter anhand echter Einsätze vergleichen

Die Funktionslisten ähneln sich. Unterschiede zeigen sich erst an Ihren eigenen Einsätzen, mit den Menschen, die sie abwickeln. Ich empfehle diese Reihenfolge:

```schritte
Ausgangslage | 2 bis 4 Wochen · Kunde
  Führende Systeme, Einsatzarten, Techniker, Partner, ERP-Schnittstellen.
Vorauswahl | 2 Wochen · Kunde
  Zwei oder drei Anbieter für Demos, höchstens zwei für den Szenariotest.
Szenarien | 4 bis 6 Wochen · Kunde und Anbieter
  Reale Einsätze mit Disposition, Innendienst, Ersatzteillogistik und Technikern.
Rechnung | 2 Wochen · Kunde
  Lizenzen, Add-ons, Einführung, Integration und Betrieb über Jahre.
```

Als Szenarien eignen sich drei Einsätze: eine Wartung nach Plan, eine Störung mit Ersatzteil und eine Inbetriebnahme über mehrere Tage. Lassen Sie Techniker die mobile App selbst bedienen und Disponenten einen Tag umplanen. Nutzen Sie einen freigegebenen, repräsentativen Auszug echter Anlagendaten aus dem ERP, wo nötig anonymisiert und nach dem Test gelöscht, um zu sehen, wie die [Anlagenhierarchie](../field-service-asset-hierarchie-maschinen/) im neuen System aussieht.

Die Szenarien liefern den Beleg für die fachliche Entscheidung. Daneben prüfen Sie Sicherheit und Berechtigungen, Datenresidenz, Offline-Synchronisation bei großen Datenmengen, die Überwachung fehlgeschlagener Schnittstellenläufe und das Release-Modell des Anbieters. Gewichten Sie die Prüfbereiche aus der Tabelle vor der ersten Demo, damit das Ergebnis nicht von der besten Präsentation abhängt.

Zur Rechnung gehören Lizenzen nach Rolle für Disponenten, Techniker und Servicepartner, Add-ons wie die Optimierung, Einführung, Datenmigration, Integration, Testumgebungen, Schulung und das interne Team, das die Plattform betreibt. Für Salesforce habe ich die Lizenzen in [Field-Service-Lizenzen nach Rolle](../field-service-lizenzen-rollen-dispatcher-techniker/) aufgeschlüsselt. Wie ich solche Entscheidungen mit Kunden vorbereite, steht unter [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).
