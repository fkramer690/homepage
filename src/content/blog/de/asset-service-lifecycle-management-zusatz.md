---
title: "Asset Service Lifecycle Management: Lohnt sich das Add-on?"
description: "Was die Add-ons Asset Service Lifecycle Management (75 Dollar) und Connected Assets zu Field Service ergänzen, was der Kern kann und wann es sich rechnet."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: asset-service-lifecycle-management-zusatz
translationKey: asset-service-lifecycle-management-addon
topic: field-service
categories: [field-service, manufacturing-cloud]
contactBrief: licences
tags: [Field Service, Asset Management, Lizenzen, Garantie, Connected Assets]
takeaways:
  - "Connected Assets kostet 15.000 Dollar pro Org und Monat. Es rechnet sich, wenn Echtzeitereignisse genug Stillstand verhindern, nicht über die Flottengröße."
  - "Assets und Wartungspläne sind Field-Service-Kern, Serviceverträge und Entitlements Service Cloud. Das Add-on bringt Deckungsansicht, Angebote, Rückrufaktionen."
  - "Seit November 2026 nennt die Preisseite ASLM und Connected Assets bei Field Service Max, die Tabelle führt sie aber weiter als zukaufbar."
  - "Lagerfunktionen überschneiden sich mit dem ERP. Führt SAP Nachschub und Inventur, nutzen Sie ASLM nur für Serviceschritte wie Reservierung und Fahrzeuglager."
  - "Garantieansprüche, Rückrufe und Servicekampagnen gibt es auch in Manufacturing Cloud. Legen Sie fest, welches Produkt sie führt, bevor Sie beide kaufen."
faq:
  - q: "Was ist Asset Service Lifecycle Management in Salesforce?"
    a: "Ein kostenpflichtiges Add-on für Field Service und mehrere Branchen-Clouds. Die Salesforce-Hilfe nennt unter anderem Asset Coverage View, interaktive Asset-Hierarchie, Work Order Estimation, Product Service Campaigns, Depotreparatur, Advanced Exchange, Lagerfunktionen und Stundenzettel."
  - q: "Was kostet Asset Service Lifecycle Management?"
    a: "Die Add-on-Seite von Salesforce nennt 75 Dollar pro Nutzer und Monat bei jährlicher Abrechnung, in Dollar, für Field-Service-Editionen. Connected Assets kostet separat 15.000 Dollar pro Org und Monat. Die Field-Service-Preisseite führt beide Preise seit ihrer Aktualisierung vom 5. November 2026 nicht mehr."
  - q: "Ist Asset Service Lifecycle Management in Field Service Max enthalten?"
    a: "Die Preisseite ist mit Stand 9. November 2026 widersprüchlich. Die Zusammenfassung von Field Service Max für 650 Dollar nennt Asset Service Lifecycle Management und Connected Assets, die Vergleichstabelle führt deren Funktionen weiter als zukaufbar. Lassen Sie Anspruch und enthaltene Kapazität im Bestellformular bestätigen."
  - q: "Brauche ich Connected Assets für nutzungsbasierte Wartung?"
    a: "Nein. Wartungspläne mit nutzungsbasierten Regeln gehören zum Field-Service-Kern. Ein Betriebsstundenzähler, den ERP oder IoT-Plattform einmal am Tag ans Asset schreibt, reicht aus, wenn ein Tag Verzögerung vertretbar ist. Connected Assets ergänzt Konnektoren, Telemetrie in Echtzeit und den Asset Health Score."
draft: false
---

Asset Service Lifecycle Management (ASLM) ist ein Add-on für Salesforce Field Service und kostet laut Add-on-Seite von Salesforce im November 2026 75 Dollar pro Nutzer und Monat. Es ergänzt Abläufe rund um die installierte Basis: eine Deckungsansicht pro Asset, eine interaktive Asset-Hierarchie, Reparaturangebote, Rückrufkampagnen, Depotreparatur, Lagerfunktionen und Stundenzettel. Assets und Wartungspläne stecken schon im Field-Service-Kern, Serviceverträge und Entitlements in Service Cloud. Connected Assets ist ein eigenes Add-on für 15.000 Dollar pro Org und Monat für Telemetrie. Ich würde ASLM kaufen, wenn Sie Reparaturangebote erstellen, Rückrufaktionen durchführen oder Teile im Depot reparieren. Für reine Wartungspläne reicht die Basislizenz.

## Was steckt in Asset Service Lifecycle Management?

Salesforce verkauft Field Service heute als Field Service and Operations. Bis zum 5. November 2026 zeigte die [Preisliste](https://www.salesforce.com/de/products/field-service/pricing/) zwei Asset-Add-ons; heute nennt die [Add-on-Seite von Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) Asset Service Lifecycle Management weiter mit 75 Dollar pro Nutzer und Monat für Field-Service-Editionen und Connected Assets mit 15.000 Dollar pro Org und Monat. Beide wurden [im Juni 2024](https://www.salesforce.com/news/stories/field-service-asset-management-news/) als separate Add-ons angekündigt. Die [Produktseite zum Asset Management](https://www.salesforce.com/service/field-service-management/asset-management/) beschreibt ASLM in Marketingsprache, deshalb habe ich die Funktionsliste aus dem [ASLM-Bereich der Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.aslm_asset_service_lifecycle_management.htm&type=5) genommen:

| Funktion | Was sie laut Hilfe tut | Wer sie beim Maschinenbauer nutzt |
|---|---|---|
| Asset Coverage View | Listet die Ansprüche eines Assets auf, darunter Wartungspläne, Garantien und Serviceverträge | Hotline, Innendienst |
| Asset Interactive Hierarchy | Zeigt komplexe Assets und ihre Unter-Assets als navigierbaren Baum | Hotline, Techniker |
| Work Order Estimation | Schätzt Kosten und Aufwand vor dem Einsatz und erzeugt Angebote | Innendienst, Vertrieb |
| Product Service Campaign | Steuert Serviceaktionen, Rückrufe oder Nachrüstungen für eine große Zahl von Produkten | Serviceleitung, Qualität |
| Depot Repair | Erzeugt Arbeitsaufträge aus Retourenpositionen für die Reparatur im Depot | Reparaturzentrum |
| Advanced Exchange und Service Parts Return | Steuert Rücksendung und Ersatz defekter Teile | Ersatzteilteam |
| Lagerfunktionen | Reservierung, Chargen, Suche und Umlagerung, Inventur, Nachschub | Lager, Techniker |
| Timesheets and Labor Cost Optimization | Stundenzettel mit Arbeitszeitregeln | Techniker, Lohnbuchhaltung |
| Agentforce for ASLM | Agentenvorlagen für Asset-Service, Lager und Zusatzverkauf; sie brauchen eigene Agentforce-Lizenzen und Credits | Mehrere Rollen |

Zwei Details zählen für die Planung. Work Order Estimation läuft laut [Einrichtungsanleitung](https://help.salesforce.com/s/articleView?id=sf.aslm_woe_setup_configure.htm&language=en_US&type=5) als konfigurierbarer Flow. Field Service ist Pflicht; Omnistudio-Dokumentenerzeugung für das Angebot und Salesforce Pricing für Rabatte nach Deckung sind optional. Mit Pricing wird daraus ein echtes Einrichtungsprojekt mit Preisprozeduren und Nachschlagetabellen. Und die Hilfe nennt die ASLM-Funktionen [verfügbar mit Field Service und mehreren Branchen-Clouds](https://help.salesforce.com/s/articleView?id=xcloud.aslm_editions.htm&language=en_US&type=5), darunter Manufacturing Cloud und Automotive Cloud, jeweils in Enterprise, Unlimited und Developer Edition.

## Die Field-Service-Basislizenz enthält mehr, als viele Angebote vermuten lassen

Assets mit über- und untergeordneten Assets und Wartungspläne mit Wartungsregeln gehören zu jeder Field-Service-Org; Serviceverträge und Entitlements kommen aus der Service-Cloud-Basis, die Field Service voraussetzt. Wie diese drei Vertragsobjekte zusammenspielen, beschreibe ich in [Wartungsverträge in Field Service abbilden](../salesforce-field-service-wartungsvertraege/). Product Service Campaigns gehören dagegen nicht zum Kern: Das Objekt steht im Datenmodell, aber laut Salesforce-Hilfe schalten Sie zum [Einrichten und Nutzen von Product Service Campaign](https://help.salesforce.com/s/articleView?id=sf.aslm_psc_enable_aslm.htm&language=en_US&type=5) Asset Service Lifecycle Management ein. Und das [Datenmodell für Garantien](https://developer.salesforce.com/docs/platform/data-models/guide/field-service-warranty-management.html) für Field Service and Operations enthält Garantiebedingungen, Produktgarantiebedingungen und Asset-Garantien.

Das Add-on kauft also Arbeit, die auf dem Datenmodell aufsetzt:

- **Deckung an der Hotline.** Mit der [Asset Coverage View](https://help.salesforce.com/s/articleView?id=xcloud.fs_entitlements_use.htm&language=en_US&type=5) filtert die Hotline Ansprüche nach übergeordnetem, untergeordnetem oder Wurzel-Asset oder nach Account und verknüpft den passenden mit "Choose Coverage" mit Case oder Arbeitsauftrag. Ohne das Add-on baut jemand diese Maske selbst.
- **Angebot vor dem Einsatz.** Eine Reparaturschätzung, die anhand von Entitlements und Garantien festlegt, was der Kunde zahlt.
- **Kampagnen in großer Zahl.** Die Produktseite nennt Automatisierung und Durchführung von Servicekampagnen, von den Kampagnenpositionen bis zu Arbeitsaufträgen für Hunderte Assets.

Die Editionen haben sich am 5. November 2026 geändert. Die [Preisliste](https://www.salesforce.com/service/field-service-management/pricing/) verkauft jetzt Field Service+ Core für 250 Dollar, Field Service+ Advanced für 450 Dollar und Field Service Max für 650 Dollar; Field Service Plus und Agentforce 1 Field Service sind daraus verschwunden. Die Zusammenfassung von Field Service Max nennt Asset Service Lifecycle Management und Connected Assets, die Vergleichstabelle führt die Zeile "Asset Coverage View and Interactive Hierarchy" und Connected Assets aber weiter als "Available for purchase". Die Asset-Management-Seite schreibt dagegen, manche Editionen enthielten diese Funktionen bereits, ohne sie zu nennen.

```hinweis offen
Lassen Sie im Bestellformular klären, was für Ihre Edition gilt und mit welcher Kapazität: zukaufbar laut Vergleichstabelle oder enthalten laut Zusammenfassung von Field Service Max.
```

## Ein Hersteller mit SAP braucht nur einen Teil von ASLM

Fünf der Funktionen betreffen den Bestand: Reservierung, Chargen, Suche und Umlagerung, Inventur und Nachschub. In den meisten Fertigungsunternehmen führt aus meiner Sicht das ERP Bestand und Materialstamm, Field Service hält eine Kopie für das Fahrzeuglager und die verbrauchten Teile. Diese Aufteilung erkläre ich in [Ersatzteile zwischen ERP und Salesforce](../salesforce-field-service-ersatzteile-erp/). Plant SAP den Nachschub und führt die Inventur, droht mit denselben Funktionen in Salesforce eine zweite Wahrheit. ASLM kann trotzdem bei Serviceschritten helfen, die die ERP-Schnittstelle schlecht abdeckt, etwa Teile für einen Arbeitsauftrag reservieren, Fahrzeuglager und Rücksendungen.

Zum Maschinenbauer passen meist die Funktionen, die das ERP auf der Serviceseite schlecht abdeckt: die Deckungsansicht für die Hotline, die Hierarchie für Maschinen mit vielen Baugruppen, die Schätzung für Reparaturangebote und Kampagnen für Nachrüstungen. Depotreparatur lohnt sich für Unternehmen, die zurückgeschickte Baugruppen im eigenen Reparaturzentrum instand setzen.

## Was bringt Connected Assets, und wann sind 15.000 Dollar im Monat gerechtfertigt?

Connected Assets ist das Telemetrie-Add-on. Die Asset-Management-Seite nennt vorgefertigte Konnektoren, Telemetrie in Echtzeit, einen Asset Health Score aus Alter, Nutzung, Telemetrie und Reparaturhistorie und ein "Actionable Telematics Framework". Die Ankündigung vom Juni 2024 beschreibt die Idee: Überschreitet der Health Score eine Schwelle, kann das System eine automatische Korrektur versuchen, etwa ein Firmware-Update, und bei Misserfolg einen Arbeitsauftrag anlegen.

```kennzahlen
15.000 $ | Connected Assets pro Org und Monat
180.000 $ | pro Org und Jahr zum Listenpreis
10.000 | verbundene digitale Assets laut Asset-Management-Seite
quelle: Salesforce Add-on-Seite Manufacturing Cloud, Stand November 2026, und Asset-Management-Seite
```

Aus meiner Sicht rechnet sich der Listenpreis nur, wenn Signale in Echtzeit Servicearbeit auslösen sollen, ohne dass jemand auf ein Dashboard schaut, und die dadurch vermiedenen Ausfallzeiten mindestens 180.000 Dollar im Jahr wert sind. Die Flottengröße allein entscheidet das nicht; zehn kritische Maschinen können mehr rechtfertigen als Tausende unkritische. Fragen Sie auch, wie viele Event-Orchestrierungen und wie viel Data-360-Verbrauch der Preis enthält. Für die meisten Maschinenbauer ist der erste Schritt kleiner. Ein Betriebsstundenzähler, den das ERP oder die IoT-Plattform einmal täglich in das Asset schreibt, reicht für Wartungspläne nach Nutzung im Field-Service-Kern. Einige verdichtete Zustandssignale über Data 360 können je nach Verbrauch und Integration deutlich weniger kosten als das Add-on, wie die Rechnung in [Predictive Maintenance: welche Datenbasis Sie brauchen](../predictive-maintenance-salesforce-datenbasis/) zeigt.

## Wer führt die Garantie: Field Service, ASLM oder Manufacturing Cloud?

Diese Entscheidung würde ich vor jedem Kauf treffen. Die Asset-Management-Seite nennt "warranty definition and claims management" unter ASLM, der ASLM-Bereich der Hilfe behandelt aber Deckung an Case, Arbeitsauftrag und Schätzung, keinen vollständigen Anspruchsprozess. Manufacturing Cloud, inzwischen auch Agentforce Manufacturing genannt, hat einen eigenen Garantieprozess mit Garantiebedingungen, Händleransprüchen, Prüfung und Lieferantenregress, beschrieben in [Garantieansprüche von Händlern in Salesforce](../garantieansprueche-haendler-salesforce/), und Winter '27 hat den [Prüfagenten für Garantieansprüche](../garantie-pruefagent-winter-27/) eingeführt. Product Service Campaigns tauchen in beiden Produkten auf. Fragen Sie, welche SKUs und Permission Set Licenses jeder Schritt braucht.

Meine Faustregel:

- **Händler reichen Garantieansprüche ein, und Sie holen sich Kosten vom Lieferanten zurück.** Dann führt Manufacturing Cloud die Garantie. Das behandelt das [Kapitel Garantie und After-Sales der Manufacturing-Cloud-Masterclass](../../masterclass/manufacturing-cloud/garantie-und-after-sales/).
- **Ihre eigenen Techniker müssen bei der Terminbuchung die Deckung sehen.** Dann reicht die Asset Coverage View, und Ansprüche bleiben im ERP.
- **Beides trifft zu.** Ein Produkt führt Garantiebedingungen und Ansprüche, das andere liest sie. Zwei Garantiemodelle am selben Asset liefern demselben Kunden zwei Antworten.

## Rechenbeispiel: ein Komponentenhersteller mit 30 Nutzern

Ein Hersteller von Hydraulikkomponenten arbeitet mit SAP als ERP und Field Service für 30 Nutzer, davon 8 in Hotline und Innendienst auf Field Service+ Core, 4 Disponenten und 18 Techniker. Der Service verkauft Reparaturen zurückgeschickter Pumpen und fährt ein bis zwei Nachrüstkampagnen im Jahr. Alle Zahlen sind Annahmen.

**Variante A, das Add-on für alle.** 30 × 75 Dollar × 12 = 27.000 Dollar im Jahr zum Listenpreis. Auf den Seiten, die ich öffnen konnte, sagt Salesforce nicht, ob jeder Field-Service-Nutzer das Add-on braucht, also ist das die Obergrenze. Die Einrichtung von Schätzung mit Preisprozeduren und Kampagnen dauert angenommen 20 Partnertage.

**Variante B, Kern plus Eigenbau.** Eine Lightning-Komponente, die Entitlements auf der Asset-Seite zeigt, ein Flow für Reparaturangebote mit Preisen aus dem ERP und Kampagnenpositionen per Tabellenimport. Angenommen 60 Partnertage Aufbau und 10 Tage Pflege pro Jahr, weil jedes Release und jede Vertragsänderung die Eigenentwicklung berührt.

**Der Vergleich.** Bei einem angenommenen Tagessatz von 1.200 Dollar kostet Variante A über zwei Jahre 24.000 Dollar Einrichtung plus 54.000 Dollar Lizenzen, zusammen 78.000 Dollar. Variante B kostet 72.000 Dollar plus 24.000 Dollar Pflege, zusammen 96.000 Dollar, und jeder Fehler gehört dem Unternehmen. Unter diesen Annahmen ist Variante A über zwei Jahre 18.000 Dollar günstiger, bei drei genutzten Funktionen: Deckungsansicht, Schätzung für Depotreparaturen und Kampagnen. Weniger lizenzierte Nutzer, zusätzliche Abhängigkeiten wie Salesforce Pricing oder ein anderer Aufbauaufwand ändern das Ergebnis. Bräuchte das Unternehmen nur die Deckungsansicht, würde ich Salesforce vor jedem Eigenbau um ein Angebot nur für die Hotline-Nutzer bitten. Wie ich solche Varianten vergleiche, beschreibe ich unter [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

## Asset-Prozesse auflisten und die Führung festlegen

Wie Assets, Wartung und Teile zusammenhängen, behandelt das [Kapitel Assets, Wartung, Teile und Partner der Field-Service-Masterclass](../../masterclass/field-service/field-service-assets-wartung-teile/). Der zweite Schritt unten entscheidet, ob ASLM oder Manufacturing Cloud die Garantie führt. Vor dem Angebot würde ich so vorgehen:

1. **Listen Sie Ihre Asset-Prozesse auf**: Deckungsprüfung an der Hotline, Reparaturangebote, Rückrufe und Nachrüstungen, Depotreparatur, Inventur im Fahrzeuglager.
2. **Legen Sie für jeden Prozess fest, wer ihn führt**: Field-Service-Kern, ASLM, Manufacturing Cloud oder das ERP.
3. **Stellen Sie Salesforce drei Fragen schriftlich**: welche Nutzer das Add-on brauchen, ob Ihre Edition, etwa Field Service Max, es schon enthält und mit welcher Kapazität, und ob Ihre Manufacturing-Cloud-Lizenz dieselben Funktionen abdeckt.
4. **Stellen Sie Connected Assets zurück**, bis tägliche Zähler und einige verdichtete Signale zeigen, dass Telemetrie in Echtzeit Serviceentscheidungen ändern würde.
