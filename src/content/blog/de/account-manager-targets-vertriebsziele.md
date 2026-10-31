---
title: "Account Manager Targets: Vertriebsziele pro Kunde"
description: "Was Account Manager Targets in der Manufacturing Cloud leisten, wie Ziele auf Kunden und Produkte fließen und welche Daten die Excel-Zielplanung ablösen."
pubDate: 2026-10-28
lang: de
slug: account-manager-targets-vertriebsziele
translationKey: manufacturing-cloud-account-manager-targets
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Account Manager Targets, Vertriebsziele, Absatzprognose, CRM Analytics]
takeaways:
  - "Änderungen laufen nicht von selbst nach unten. Der Manager gibt sie weiter, oder ein Flow ruft Update Account Manager Target Values auf."
  - "Verlässt jemand das Team oder ändert sich die Managerhierarchie, werden Zuordnungen ungültig und müssen neu verteilt werden."
  - "Ziel, Prognose und Ist passen nur zusammen, wenn alle drei dieselben Kunden, Produkte und Zeiträume nutzen."
  - "Provisionen rechnet die Funktion nicht. Salesforce verkauft dafür Spiff, viele Hersteller nutzen die Lohnabrechnung."
faq:
  - q: "Was sind Account Manager Targets in der Manufacturing Cloud?"
    a: "Eine Funktion der Manufacturing Cloud für Jahresziele im Vertrieb. Manager legen ein Ziel auf Umsatz, Stückzahl oder eine eigene Kennzahl an, verteilen es auf ihre direkten Mitarbeitenden, und diese verteilen es weiter auf Kunden, Produkte und Monate."
  - q: "Ersetzen Account Manager Targets die Excel-Zielplanung?"
    a: "Sie können den Verteilungsteil ersetzen: wer welches Ziel für welchen Kunden, welches Produkt und welchen Monat hat. Provisionen rechnen sie nicht, und die Zielerreichung zeigen sie nur, wenn Istwerte in derselben Struktur in Salesforce ankommen."
  - q: "Was passiert mit Zielen, wenn ein Account Manager das Unternehmen verlässt?"
    a: "Laut Trailhead werden die Zuordnungen ungültig. Der Manager weist sie dann einem anderen Teammitglied zu, verschiebt sie in die Teamzuordnungen, ändert den Owner oder löscht sie."
  - q: "Welche Lizenz brauchen Account Manager Targets?"
    a: "Laut Developer Guide setzt die Aktion Update Account Manager Target Values eine Manufacturing-Cloud-Lizenz voraus. Die Preisseite nennt die Funktion, zeigt aber nicht pro Edition, wo sie enthalten ist. Lassen Sie sich das für Ihre Edition von Salesforce bestätigen."
draft: false
---

Account Manager Targets können den Verteilungsteil der Excel-Zielplanung ersetzen: wer welches Jahresziel für welche Kunden, Produkte und Monate hat. Die Funktion der Manufacturing Cloud legt Vertriebsziele auf Umsatz, Stückzahl oder eine eigene Kennzahl an und verteilt sie über die Teamhierarchie nach unten. Provisionen rechnet sie nicht, und die Zielerreichung zeigt sie nur, wenn Istwerte in derselben Kunden- und Produktstruktur in Salesforce ankommen wie Prognosen und Sales Agreements. Klären Sie vor dem Einschalten Hierarchie, Preisbuch, Datensatzlimit und die Quelle der Istwerte. Dann kann die Tabelle weg.

## Was sind Account Manager Targets?

Account Manager Targets sind die Funktion der Manufacturing Cloud für Jahresziele im Vertrieb. Auf der [Produktseite](https://salesforce.com/manufacturing/cloud/sales) beschreibt Salesforce das Ziel so: Wachstumspläne der Organisation in messbare Ziele für die Teams mit Kundenkontakt übersetzen. Die Objektreferenz führt das Ziel als [AcctMgrTarget](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/manufacturing_standard_object_account_manager_target.htm). Agentforce Manufacturing ist der neuere Produktname, den Trailhead verwendet. Ein Agent steckt in den Zielen nicht.

Die Bausteine laut Trailhead-Modul:

- **Kennzahl.** Umsatz, Stückzahl oder eine eigene Kennzahl. Im Beispiel ergänzt der Admin Werte wie Quantity, CSAT und NPS im Object Manager.
- **Geschäftsjahr.** Ziele nutzen das im Setup definierte Geschäftsjahr. Ein Manager legt sie für das laufende und die zwei folgenden Jahre an.
- **Verteilungsrhythmus.** Monatlich, quartalsweise oder jährlich. Standardmäßig wird das Ziel gleichmäßig auf die Perioden verteilt, Account Manager ändern den Anteil pro Periode.
- **Teamhierarchie.** Entweder die Managerhierarchie aus dem Feld Manager am Benutzer oder die Forecast-Hierarchie aus dem Collaborative Forecasting der Sales Cloud.
- **Preisbuch.** Ein Standardpreisbuch, mit dem ein Umsatzziel in eine Stückzahl umgerechnet wird.

Im Setup hat die Funktion einen eigenen Schalter, und Nutzer brauchen das Permission Set Manufacturing Account Manager Targets. In den Metadaten heißt der Schalter `enableIndustriesMfgTargets`, laut [Referenz zu IndustriesManufacturingSettings](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm) seit API-Version 49.0.

## Das Ziel läuft von der Vertriebsleitung bis zum Produkt

Von oben nach unten. Das Objekt [AcctMgrTarget](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/manufacturing_standard_object_account_manager_target.htm) speichert dafür Maßeinheit, Zielwert und den Prozentsatz vom übergeordneten Ziel: Die Vertriebsleitung legt ein Umsatzziel für das Jahr an und gibt den direkten Mitarbeitenden Prozentsätze, zum Beispiel 35, 35 und 30 Prozent. Wer einen Prozentsatz einträgt, bekommt den Wert berechnet, und umgekehrt. Jede Ebene kann einen Teil behalten und den Rest weitergeben.

Unterhalb der Teamebene kommen drei weitere Schnitte dazu; die [Verteilung](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/manufacturing_standard_object_account_manager_target_distribution.htm) speichert dafür Kunde, Produkt und Preisbuch:

1. **Nach Kunde.** Ein Anteil des Ziels geht an einen Schlüsselkunden, Salesforce füllt den Betrag aus.
2. **Nach Produkt.** Ein Anteil geht an ein Produkt. Salesforce teilt den Betrag durch den Listenpreis aus dem Standardpreisbuch und erhält eine Stückzahl.
3. **Nach Monat.** Das Ziel wird gleichmäßig auf zwölf Monate verteilt, jeder Monat lässt sich ändern.

Zwei Details zählen in der Praxis. Erstens müssen die verteilten Werte nicht genau das Elternziel ergeben. Trailhead nennt das eine Funktion, weil ein Manager einen Teil behalten kann. Für das Controlling heißt es: Lücken oder Überdeckungen fallen nur auf, wenn ein Bericht sie zeigt. Zweitens laufen Änderungen nicht von selbst nach unten. Der Manager klickt Propagate to Assignments, und Salesforce benachrichtigt die Betroffenen in der App.

```vertiefung Für Entwickler
titel: Ziele per Flow aktualisieren
Für Automatisierung gibt es die [Aktion Update Account Manager Target Values](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_actions_account_manager_target.htm), seit API-Version 49.0. Sie bekommt die ID eines Zieldatensatzes und aktualisiert die Zuordnungen auf Basis von Wert und Prozentsatz des Elternziels. Ein Flow kann sie aufrufen, wenn die Geschäftsführung im März das Jahresziel ändert. Laut Developer Guide setzt die Aktion eine Manufacturing-Cloud-Lizenz voraus.
```

## Was passiert nach einer Umorganisation?

Ziele werden ungültig. Trailhead nennt als typische Gründe, dass jemand das Unternehmen verlässt oder sich die Managerhierarchie ändert. Pro ungültiger Zuordnung hat der Manager vier Möglichkeiten:

| Option | Was sie tut |
|---|---|
| Reassign to Team Member | Gibt die Zuordnung an jemanden ohne eigene Zuordnung auf diesem Ziel |
| Move to Team Assignments | Verschiebt sie in den Teambereich, wenn Kennzahl und Geschäftsjahr passen |
| Change Owner | Gibt sie an einen anderen Nutzer in der Hierarchie |
| Delete Assignment | Löscht sie |

Bei einem Hersteller, der seinen Vertrieb jeden Januar neu schneidet, ist das echte Arbeit. Ist die Managerhierarchie die Grundlage, muss das Feld Manager an jedem Benutzer stimmen, bevor Ziele verteilt werden. Dieses Feld pflegt oft, wer Benutzer anlegt, und nicht die Vertriebsleitung. Ich würde für die Zielsaison eine verantwortliche Person benennen.

## Ziel, Prognose und Ist brauchen dieselbe Struktur

Dieselbe Struktur. Salesforce verspricht, die Leistung von der Zielerreichung bis zur Prognose an einem Ort zu verfolgen. Das funktioniert nur, wenn drei Zahlen zusammenpassen:

- **Ziel** pro Account Manager, Kunde, Produkt und Monat, aus dieser Funktion.
- **Prognose** pro Kunde, Produkt und Zeitraum, aus dem [Account Forecasting](../account-forecasting-absatzprognose-vertrieb/).
- **Ist** pro Kunde, Produkt und Zeitraum, meist aus dem ERP, wie bei [Sales Agreements und Abnahmerückständen](../sales-agreements-abnahmemengen-erp/) beschrieben.

Liegt das Ziel auf Produkten und die Prognose auf Produktkategorien, vergleicht das Review zwei Zahlen, die nicht zusammenpassen können. Dasselbe passiert, wenn das ERP den Umsatz auf den Auftraggeber bucht und das Ziel an einem übergeordneten Account hängt. Ich würde vor dem ersten Ziel eine Kundenebene, eine Produktebene und einen Periodentyp für alle drei festlegen. Wie der Istwert-Feed aus SAP aussehen sollte, gehört zu meiner Arbeit an [Schnittstellen zu ERP und Middleware](../../leistungen/salesforce-schnittstellen/).

Für den Vergleich beschreibt Trailhead [Dashboards der CRM-Analytics-Vorlage](https://trailhead.salesforce.com/content/learn/modules/crm-analytics-dashboards-for-account-manager-targets/explore-sales-targets) für Ziele, darunter ein Team-Performance-Dashboard für die Datensatzseite des Ziels. Es stellt Ziele den Istdaten des laufenden und des vergangenen Jahres gegenüber und zeigt den nicht verteilten Anteil. Es stammt aus der CRM-Analytics-App für die Manufacturing Cloud, und sein Inhalt hängt von den Objekten ab, die der Admin beim Anlegen der App auswählt. Eine Lizenz nennt die Unit nicht. Die aktuelle [Preisseite](https://www.salesforce.com/manufacturing/cloud/pricing/) führt Tableau Next pro Edition auf und erwähnt CRM Analytics nicht. Fragen Sie Salesforce deshalb, ob Ihre Edition das Dashboard enthält.

## Rechenbeispiel: 40 Account Manager und ein Datensatzlimit

Die Zahlen sind angenommen: Ein Hersteller von Antriebskomponenten hat eine Vertriebsleitung, sechs Regionalleiter und 40 Account Manager. Jeder Account Manager betreut 150 Kunden, und die Ziele sollen pro Kunde, Produkt und Monat für 60 Produkte laufen.

Verteilte jeder Account Manager jeden Kunden auf jedes Produkt und jeden Monat, wären das 40 × 150 × 60 × 12, also 4,32 Millionen Periodendatensätze. Die Setup-Unit auf Trailhead nennt ein Limit für Datensätze vom Typ Account Manager Periodic Target Distribution, das der Account Executive von Salesforce mit dem Admin festlegt. Das Beispiel dort nutzt 10 Millionen.

```hinweis offen
Ein Beispielwert ist keine Zusage für Ihren Vertrag. Ich würde die erwartete Zahl der Periodendatensätze vor dem ersten Zieljahr rechnen und das Limit im Angebot bestätigen lassen.
```

In der Praxis würde ich das Szenario zuschneiden: Kundenziele für die 20 größten Kunden pro Person, Produktkategorie statt Produkt, der Rest als Teamziel. Das deckt den Großteil des Umsatzes und hält die Datensätze deutlich unter einer Million.

## Wo bleiben Provisionen und Prämien?

Außerhalb dieser Funktion. Account Manager Targets verteilen und zeigen Ziele, sie rechnen keine Provision, keine Beschleuniger und keine Auszahlung. Dafür verkauft Salesforce ein eigenes Produkt, [Salesforce Spiff](https://salesforce.com/sales/incentive-compensation-management), gelistet mit 75 Dollar pro Nutzer und Monat. Viele Hersteller rechnen variable Vergütung ohnehin in der Lohnabrechnung oder im HR-System, oft mit einer Betriebsvereinbarung dahinter.

Die saubere Trennung: Salesforce hält Ziel und Zielerreichung, das Vergütungssystem liest beides und rechnet die Auszahlung. Dann muss das Ziel in Salesforce das sein, auf das sich die Zielvereinbarung bezieht, eingefroren zu einem festen Stichtag. Ändern Manager Ziele im Lauf des Jahres, dokumentieren Sie, wer was geändert hat. Spätestens bei der Bonusrunde fragt jemand nach.

Auch der Sales-Planning-Agent arbeitet nicht mit Zielen. Welche Subagenten Salesforce dokumentiert, steht in [was der Vertriebsplanungs-Agent wirklich kann](../agentforce-vertriebsplanung-rahmenvertraege/). Wo Ziele neben Sales Agreements und Prognosen stehen, zeigt das Kapitel [Rahmenverträge und Prognosen](../../masterclass/manufacturing-cloud/rahmenvertraege-und-prognosen/) der Masterclass.

## Hierarchie und Ebenen mit Vertrieb und Controlling festlegen

1. **Hierarchie.** Managerhierarchie oder Forecast-Hierarchie, und wer das Feld Manager pflegt.
2. **Ebenen.** Eine Kundenebene, eine Produktebene, ein Periodentyp für Ziel, Prognose und Ist.
3. **Datensätze.** Erwartete Periodendatensätze gegen das Limit im Angebot.
4. **Lizenz.** Funktion und Dashboard für Ihre Edition schriftlich bestätigt.

Die Ebenen lege ich in einem Termin mit Vertriebsleitung und Controlling fest, weil das Controlling die Istwerte liefert. Erst danach rechne ich die Periodendatensätze aus und lasse mir das Limit im Angebot bestätigen.
