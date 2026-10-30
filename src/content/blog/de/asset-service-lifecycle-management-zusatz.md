---
title: "Asset Service Lifecycle Management: Lohnt das Add-on?"
description: "Was die Add-ons Asset Service Lifecycle Management (75 Dollar) und Connected Assets zu Field Service ergänzen, was der Kern kann und wann es sich rechnet."
pubDate: 2026-10-28
lang: de
slug: asset-service-lifecycle-management-zusatz
translationKey: asset-service-lifecycle-management-addon
topic: field-service
categories: [field-service, manufacturing-cloud]
contactBrief: licences
tags: [Field Service, Asset Management, Lizenzen, Garantie, Connected Assets]
takeaways:
  - "Asset Service Lifecycle Management kostet 75 Dollar pro Nutzer und Monat, Connected Assets 15.000 Dollar pro Org und Monat (Preisliste Field Service, Oktober 2026, Add-ons nur in Dollar)."
  - "Assets, Asset-Hierarchien, Wartungspläne, Serviceverträge und Entitlements gehören zum Field-Service-Kern. Das Add-on ergänzt Abläufe wie Deckungsauswahl, Reparaturangebote, Rückrufe und Depotreparatur."
  - "Die Preisliste führt Asset Coverage View und interaktive Hierarchie als zukaufbar, sogar bei Agentforce 1 Field Service."
  - "Mehrere Funktionen des Add-ons, etwa Inventur und Nachschub, überschneiden sich mit dem ERP. Führt SAP den Bestand, bringen sie wenig."
  - "Garantieansprüche, Rückrufe und Servicekampagnen gibt es auch in Manufacturing Cloud. Legen Sie fest, welches Produkt sie führt, bevor Sie beide kaufen."
faq:
  - q: "Was ist Asset Service Lifecycle Management in Salesforce?"
    a: "Ein kostenpflichtiges Add-on für Field Service und mehrere Branchen-Clouds. Die Salesforce-Hilfe nennt unter anderem Asset Coverage View, interaktive Asset-Hierarchie, Work Order Estimation, Product Service Campaigns, Depotreparatur, Advanced Exchange, Lagerfunktionen und Stundenzettel."
  - q: "Was kostet Asset Service Lifecycle Management?"
    a: "Laut Preisliste Field Service vom Oktober 2026 kostet es 75 Dollar pro Nutzer und Monat bei jährlicher Abrechnung; die deutsche Preisseite nennt die Add-ons nur in Dollar. Connected Assets kostet separat 15.000 Dollar pro Org und Monat."
  - q: "Ist Asset Service Lifecycle Management in Agentforce 1 Field Service enthalten?"
    a: "Laut Vergleichstabelle der Preisliste nicht. Dort steht für Asset Coverage View und Interactive Hierarchy bei Dispatcher, Technician, Field Service Plus und Agentforce 1 Field Service jeweils zukaufbar. Lassen Sie das im Angebot bestätigen."
  - q: "Brauche ich Connected Assets für Wartung nach Betriebsstunden?"
    a: "Nein. Wartungspläne mit nutzungsbasierten Regeln gehören zum Field-Service-Kern. Ein Betriebsstundenzähler, den ERP oder IoT-Plattform einmal am Tag ans Asset schreibt, reicht aus. Connected Assets ergänzt Konnektoren, Telemetrie in Echtzeit und den Asset Health Score."
draft: false
---

Asset Service Lifecycle Management (ASLM) ist ein Add-on für Salesforce Field Service und kostet laut Preisliste vom Oktober 2026 75 Dollar pro Nutzer und Monat. Es ergänzt Abläufe rund um die installierte Basis: eine Deckungsansicht pro Asset, eine interaktive Asset-Hierarchie, Reparaturangebote, Rückrufkampagnen, Depotreparatur, Lagerfunktionen und Stundenzettel. Assets, Wartungspläne, Serviceverträge und Entitlements stecken schon in der Basislizenz. Connected Assets ist ein eigenes Add-on für 15.000 Dollar pro Org und Monat für Telemetrie. Ich würde ASLM kaufen, wenn Sie Reparaturen anbieten, Rückrufe fahren oder Teile im Depot reparieren. Für reine Wartungspläne reicht die Basislizenz.

## Was steckt in Asset Service Lifecycle Management?

Salesforce verkauft Field Service heute als Field Service and Operations. Die [Preisliste](https://www.salesforce.com/de/products/field-service/pricing/) zeigt zwei Asset-Add-ons: Asset Service Lifecycle Management für 75 Dollar pro Nutzer und Monat und Connected Assets für 15.000 Dollar pro Org und Monat. Die Lizenzen nennt die deutsche Seite in Euro, die Add-ons nur in Dollar. Beide wurden [im Juni 2024](https://www.salesforce.com/news/stories/field-service-asset-management-news/) als separate Add-ons angekündigt. Die [Produktseite zum Asset Management](https://www.salesforce.com/service/field-service-management/asset-management/) beschreibt ASLM in Marketingsprache, deshalb habe ich die Funktionsliste aus dem [ASLM-Bereich der Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.aslm_asset_service_lifecycle_management.htm&type=5) genommen:

| Funktion | Was sie laut Hilfe tut | Wer sie beim Maschinenbauer nutzt |
|---|---|---|
| Asset Coverage View | Listet die Ansprüche eines Assets auf, darunter Wartungspläne, Garantien und Serviceverträge | Hotline, Innendienst |
| Asset Interactive Hierarchy | Zeigt komplexe Assets und ihre Unter-Assets als navigierbaren Baum | Hotline, Techniker |
| Work Order Estimation | Schätzt Kosten und Aufwand vor dem Einsatz und erzeugt Angebote | Innendienst, Vertrieb |
| Product Service Campaign | Wartet, ruft zurück oder rüstet Produkte in großer Zahl nach | Serviceleitung, Qualität |
| Depot Repair | Erzeugt Arbeitsaufträge aus Retourenpositionen für die Reparatur im Depot | Reparaturzentrum |
| Advanced Exchange und Service Parts Return | Steuert Rücksendung und Ersatz defekter Teile | Ersatzteilteam |
| Lagerfunktionen | Reservierung, Chargen, Suche und Umlagerung, Inventur, Nachschub | Lager, Techniker |
| Timesheets and Labor Cost Optimization | Stundenzettel mit Arbeitszeitregeln | Techniker, Lohnbuchhaltung |
| Agentforce for ASLM | Agentenvorlagen für Asset-Service, Lager und Zusatzverkauf | Mehrere Rollen |

Zwei Details zählen für die Planung. Work Order Estimation läuft laut [Einrichtungsanleitung](https://help.salesforce.com/s/articleView?id=sf.aslm_woe_setup_configure.htm&language=en_US&type=5) als Screen Flow auf Omnistudio-Dokumentenerzeugung und Salesforce Pricing. Das ist ein echtes Einrichtungsprojekt mit Preisprozeduren und Nachschlagetabellen. Und die Hilfe nennt die ASLM-Funktionen [verfügbar mit Field Service und mehreren Branchen-Clouds](https://help.salesforce.com/s/articleView?id=xcloud.aslm_editions.htm&language=en_US&type=5), darunter Manufacturing Cloud und Automotive Cloud, jeweils in Enterprise, Unlimited und Developer Edition.

## Was ist schon in der Field-Service-Basislizenz enthalten?

Mehr, als viele Angebote vermuten lassen. Assets mit über- und untergeordneten Assets, Wartungspläne mit Wartungsregeln, Serviceverträge und Entitlements gehören zu jeder Field-Service-Org. Wie diese drei Vertragsobjekte zusammenspielen, beschreibe ich in [Wartungsverträge in Field Service abbilden](../salesforce-field-service-wartungsvertraege/). Product Service Campaigns als Objekte stehen ebenfalls in der [Field-Service-Einrichtung](https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_setup_product_service_campaigns.htm&type=5), mit einem Hinweis für Orgs, die vor Spring '21 angelegt wurden. Und das [Datenmodell für Garantien](https://developer.salesforce.com/docs/platform/data-models/guide/field-service-warranty-management.html) für Field Service and Operations enthält Garantiebedingungen, Produktgarantien und Asset-Garantien.

Das Add-on kauft also Arbeit, die auf dem Datenmodell aufsetzt:

- **Deckung an der Hotline.** Mit der [Asset Coverage View](https://help.salesforce.com/s/articleView?id=xcloud.fs_entitlements_use.htm&language=en_US&type=5) filtert die Hotline Ansprüche nach übergeordnetem, untergeordnetem oder Wurzel-Asset oder nach Account und verknüpft den passenden mit "Choose Coverage" mit Case oder Arbeitsauftrag. Ohne das Add-on baut jemand diese Maske selbst.
- **Angebot vor dem Einsatz.** Eine Reparaturschätzung, die anhand von Entitlements und Garantien festlegt, was der Kunde zahlt.
- **Kampagnen in großer Zahl.** Die Produktseite nennt Automatisierung und Durchführung von Servicekampagnen. Der Kern liefert die Objekte, ASLM das Werkzeug, um sie für Hunderte Assets zu füllen.

Was mich in der [Vergleichstabelle der Preisliste](https://www.salesforce.com/service/field-service-management/pricing/) überrascht hat: Die Zeile "Asset Coverage View and Interactive Hierarchy" steht bei Dispatcher, Technician, Field Service Plus und sogar bei Agentforce 1 Field Service für 650 € auf "Available for Purchase". Auch die größte Edition enthält sie also nicht. Die Asset-Management-Seite schreibt dagegen, manche Editionen enthielten diese Funktionen bereits, ohne sie zu nennen.

```hinweis offen
Lassen Sie im Angebot klären, was für Ihre Edition gilt: zukaufbar laut Preisliste oder enthalten laut Asset-Management-Seite.
```

## Welche ASLM-Funktionen braucht ein Hersteller mit SAP wirklich?

Weniger, als die Liste nahelegt. Fünf der Funktionen betreffen den Bestand: Reservierung, Chargen, Suche und Umlagerung, Inventur und Nachschub. In den meisten Fertigungsunternehmen führt aus meiner Sicht das ERP Bestand und Materialstamm, Field Service hält eine Kopie für das Fahrzeuglager und die verbrauchten Teile. Diese Aufteilung erkläre ich in [Ersatzteile zwischen ERP und Salesforce](../salesforce-field-service-ersatzteile-erp/). Plant SAP den Nachschub und führt die Inventur, erzeugen dieselben Funktionen in Salesforce eine zweite Wahrheit.

Zum Maschinenbauer passen meist die Funktionen, die das ERP auf der Serviceseite schlecht abdeckt: die Deckungsansicht für die Hotline, die Hierarchie für Maschinen mit vielen Baugruppen, die Schätzung für Reparaturangebote und Kampagnen für Nachrüstungen. Depotreparatur lohnt sich für Unternehmen, die zurückgeschickte Baugruppen im eigenen Reparaturzentrum instand setzen.

## Was bringt Connected Assets, und wann sind 15.000 Dollar im Monat gerechtfertigt?

Connected Assets ist das Telemetrie-Add-on. Die Asset-Management-Seite nennt vorgefertigte Konnektoren, Telemetrie in Echtzeit, einen Asset Health Score aus Alter, Nutzung, Telemetrie und Reparaturhistorie und ein "Actionable Telematics Framework". Die Ankündigung vom Juni 2024 beschreibt die Idee: Überschreitet der Health Score eine Schwelle, kann das System eine automatische Korrektur versuchen, etwa ein Firmware-Update, und bei Misserfolg einen Arbeitsauftrag anlegen.

```kennzahlen
15.000 $ | Connected Assets pro Org und Monat
180.000 $ | pro Org und Jahr zum Listenpreis
10.000 | verbundene digitale Assets laut Asset-Management-Seite
quelle: Salesforce Preisliste Field Service, Stand Oktober 2026, und Asset-Management-Seite
```

Aus meiner Sicht rechnet sich der Listenpreis nur, wenn eine große vernetzte Flotte Signale liefert, die Servicearbeit auslösen sollen, ohne dass jemand auf ein Dashboard schaut. Für die meisten Maschinenbauer ist der erste Schritt kleiner. Ein Betriebsstundenzähler, den ERP oder IoT-Plattform einmal am Tag schreibt, reicht für Wartungspläne nach Nutzung im Field-Service-Kern. Verdichtete Zustandssignale über Data 360 kosten einen Bruchteil des Add-ons, wie die Rechnung in [Predictive Maintenance: welche Datenbasis Sie brauchen](../predictive-maintenance-salesforce-datenbasis/) zeigt.

## Wer führt die Garantie: Field Service, ASLM oder Manufacturing Cloud?

Diese Entscheidung würde ich vor jedem Kauf treffen. Die Asset-Management-Seite nennt "warranty definition and claims management" unter ASLM. Manufacturing Cloud hat einen eigenen Garantieprozess mit Garantiebedingungen, Händleransprüchen und Lieferantenregress, beschrieben in [Garantieansprüche von Händlern in Salesforce](../garantieansprueche-haendler-salesforce/), und Winter '27 bringt den [Prüfagenten für Garantieansprüche](../garantie-pruefagent-winter-27/). Product Service Campaigns tauchen in beiden Produkten auf.

Meine Faustregel:

- **Händler reichen Garantieansprüche ein, und Sie holen sich Kosten vom Lieferanten zurück.** Dann führt Manufacturing Cloud die Garantie. Das behandelt das [Kapitel Garantie und After-Sales der Manufacturing-Cloud-Masterclass](../../masterclass/manufacturing-cloud/garantie-und-after-sales/).
- **Ihre eigenen Techniker müssen bei der Terminbuchung die Deckung sehen.** Dann reicht die Asset Coverage View, und Ansprüche bleiben im ERP.
- **Beides trifft zu.** Ein Produkt führt Garantiebedingungen und Ansprüche, das andere liest sie. Zwei Garantiemodelle am selben Asset liefern demselben Kunden zwei Antworten.

## Ein typisches Szenario, als Annahme: ein Komponentenhersteller mit 30 Nutzern

Ein typisches Szenario, als Annahme: Ein Hersteller von Hydraulikkomponenten arbeitet mit SAP als ERP und Field Service für 30 Nutzer, davon 8 in Hotline und Innendienst auf Field Service Plus, 4 Disponenten und 18 Techniker. Der Service verkauft Reparaturen zurückgeschickter Pumpen und fährt ein bis zwei Nachrüstkampagnen im Jahr. Alle Zahlen sind Annahmen.

**Variante A, das Add-on für alle.** 30 × 75 Dollar × 12 = 27.000 Dollar im Jahr zum Listenpreis. Auf den Seiten, die ich öffnen konnte, sagt Salesforce nicht, ob jeder Field-Service-Nutzer das Add-on braucht, also ist das die Obergrenze. Die Einrichtung von Schätzung mit Preisprozeduren und Kampagnen dauert angenommen 20 Partnertage.

**Variante B, Kern plus Eigenbau.** Eine Lightning-Komponente, die Entitlements auf der Asset-Seite zeigt, ein Flow für Reparaturangebote mit Preisen aus dem ERP und Kampagnenpositionen per Tabellenimport. Angenommen 60 Partnertage Aufbau und 10 Tage Pflege pro Jahr, weil jedes Release und jede Vertragsänderung die Eigenentwicklung berührt.

**Der Vergleich.** Für die Rechnung setze ich Dollar und Euro gleich, so wie die Preisliste die Lizenzen in beiden Währungen gleich bepreist (175 € oder 175 Dollar). Bei angenommen 1.200 Euro Tagessatz kostet Variante A über zwei Jahre 24.000 Euro Einrichtung plus rund 54.000 Euro Lizenzen, zusammen 78.000 Euro. Variante B kostet 72.000 Euro plus 24.000 Euro Pflege, zusammen 96.000 Euro, und jeder Fehler gehört dem Unternehmen. Genutzt werden drei Funktionen: Deckungsansicht, Schätzung für Depotreparaturen und Kampagnen. Bei drei genutzten Funktionen gewinnt das Add-on. Bräuchte das Unternehmen nur die Deckungsansicht, würde ich Salesforce vor jedem Eigenbau um ein Angebot nur für die Hotline-Nutzer bitten. Wie ich solche Varianten vergleiche, beschreibe ich unter [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

## Wo fangen Sie an?

1. **Listen Sie Ihre Asset-Prozesse auf**: Deckungsprüfung an der Hotline, Reparaturangebote, Rückrufe und Nachrüstungen, Depotreparatur, Inventur im Fahrzeuglager.
2. **Legen Sie für jeden Prozess fest, wer ihn führt**: Field-Service-Kern, ASLM, Manufacturing Cloud oder das ERP.
3. **Stellen Sie Salesforce drei Fragen schriftlich**: welche Nutzer das Add-on brauchen, ob Ihre Edition Teile davon schon enthält und ob Ihre Manufacturing-Cloud-Lizenz dieselben Funktionen abdeckt.
4. **Stellen Sie Connected Assets zurück**, bis tägliche Zähler und einige verdichtete Signale zeigen, dass Telemetrie in Echtzeit Serviceentscheidungen ändern würde.

Wie Assets, Wartung und Teile zusammenhängen, behandelt das [Kapitel Assets, Wartung, Teile und Partner der Field-Service-Masterclass](../../masterclass/field-service/field-service-assets-wartung-teile/).

Asset Service Lifecycle Management lohnt sich, wenn Sie mehrere seiner Abläufe nutzen, und selten für reine Wartungspläne.
