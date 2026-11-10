---
title: "Installierte Basis in Manufacturing Cloud: Assets"
description: "Welche Anlagendaten die Manufacturing Cloud braucht, bevor Garantie, Rückrufe und Agenten arbeiten: Seriennummern, Meilensteine, Beteiligte, Flotten."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: installierte-basis-asset-meilensteine
translationKey: manufacturing-cloud-installed-base-assets
topic: service
categories: [manufacturing-cloud, field-service]
tags: [Manufacturing Cloud, Installierte Basis, Assets, Garantie, Seriennummern, After-Sales]
takeaways:
  - "Asset-Meilensteine gibt es seit API 58.0. Sie halten Ereignisse wie Fertigung, Registrierung oder Weiterverkauf mit Datum, Status und Quellsystem fest."
  - "Participant-Datensätze verbinden mehrere Firmen und Personen mit einer Maschine, Flotten bündeln die Maschinen eines Kunden."
  - "ERP, Händlerregistrierung und Inbetriebnahme kennen jeweils nur einen Teil. Für jedes Feld muss ein Owner festgelegt sein, bevor der erste Antrag geprüft wird."
  - "Wartungspläne gehören zu Field Service. Connected Assets kostet als Add-on 15.000 US-Dollar pro Org und Monat; in Field Service Max ist es enthalten."
faq:
  - q: "Was ist ein Asset-Meilenstein in der Manufacturing Cloud?"
    a: "Ein Asset-Meilenstein hält ein wichtiges Ereignis im Lebenszyklus einer Maschine fest, etwa Fertigung, Registrierung oder Weiterverkauf. Er enthält Datum, Status (Active, Expired oder Tentative), Ort sowie den Namen und die ID des Quellsystems. Das Objekt gibt es ab API-Version 58.0."
  - q: "Welche Anlagendaten braucht die Garantieprüfung in Salesforce?"
    a: "Für die Identifikation der Maschine brauchen Sie Seriennummer, Produkt und Betreiber-Account. Für die Prüfung der Deckung brauchen Sie eine Asset-Garantie mit Start- und Enddatum aus der Garantiebedingung und das Fehlerdatum an der Antragsposition. Der Garantiebeginn ist je nach Ihren Bedingungen das Kauf- oder Installationsdatum. Ist die Garantie an die Nutzung gebunden, brauchen Sie zusätzlich Betriebsstunden oder Zyklen pro Maschine."
  - q: "Was ist eine Flotte in der Manufacturing Cloud?"
    a: "Eine Flotte ist eine Gruppe von Maschinen, die im kommerziellen Betrieb, im Service oder im Transport eingesetzt werden. Sie hat einen Owner-Account, einen Standort, einen Typ, einen Status und kann hierarchisch eingeordnet sein. Fleet-Asset-Datensätze ordnen Maschinen mit Start- und Enddatum sowie Nutzung der Flotte zu."
  - q: "Brauche ich Connected Assets für eine installierte Basis in Salesforce?"
    a: "Nein. Assets, Meilensteine, Beteiligte und Flotten sind Datensätze, die Sie aus dem ERP, dem Händlerportal und der Inbetriebnahme laden. Connected Assets ergänzt Telemetriedaten; die Add-on-Seite nennt 15.000 US-Dollar pro Org und Monat bei jährlicher Abrechnung, und Field Service Max enthält es."
draft: false
---

Bevor die Manufacturing Cloud die Garantieprüfung, Rückrufe oder einen Agenten unterstützen kann, braucht jede Maschine ein Asset mit Seriennummer, Produkt, Betreiber, Standort und dem Datum, an dem die Garantie beginnt. Die Manufacturing Cloud ergänzt drei Dinge: Asset-Meilensteine für Ereignisse im Lebenszyklus, Beteiligte auf Account- und Kontaktebene und Flotten für Kunden mit vielen Maschinen. Das Datenmodell ist der leichte Teil. Schwierig ist die Herkunft der Daten, denn ERP-Lieferung, Registrierung durch den Händler und Inbetriebnahme kennen jeweils nur einen Teil. Ich würde festlegen, wem welches Feld gehört, bevor der erste Garantieantrag geprüft wird.

## Was muss die Manufacturing Cloud über jede Maschine wissen?

Das Asset ist der Anker im After-Sales. Die [Serviceseite der Manufacturing Cloud](https://salesforce.com/manufacturing/cloud/service) beschreibt die Asset Service Console als Ort, an dem „serial number and associated contacts“ erfasst werden und „warranties, cases, work orders, and claims tied to an asset“ sichtbar sind. Jeder dieser Datensätze hängt am Asset, direkt oder wie Garantieanträge über ihre Antragspositionen. Fehlt ein sauber identifiziertes Asset, werden Deckungsprüfung, Rückruf und Agentenantworten lückenhaft.

Aus meiner Sicht braucht jede Maschine mindestens diese Daten:

- **Seriennummer.** Der fachliche Schlüssel, den ERP, PLM, Händler und Salesforce kennen. Als technischen Integrationsschlüssel würde ich die Asset-ID des Quellsystems behalten und eine Eindeutigkeitsregel festlegen, etwa Produkt plus Seriennummer.
- **Produkt.** Der Maschinentyp, damit Garantiebedingungen und Kampagnen nach Produkt auswählen können.
- **Betreiber-Account und Standort.** Wer die Maschine betreibt und wo sie steht.
- **Garantiebeginn.** Kauf- oder Installationsdatum, je nach Ihren Bedingungen. Wie die Garantie des einzelnen Assets damit arbeitet, steht in [Garantieansprüche von Händlern](../garantieansprueche-haendler-salesforce/).
- **Nutzung**, wenn Ihre Garantie an Betriebsstunden oder Zyklen gebunden ist.

Hauptbaugruppen können als untergeordnete Assets unter der Maschine stehen. Wie diese Hierarchie bei Ersatzteilen hilft, beschreibt [Ersatzteile per Seriennummer](../ersatzteile-seriennummer-ki-agent/).

## Was halten Asset-Meilensteine fest?

Ein Asset-Meilenstein ist ein datiertes Ereignis im Leben einer Maschine. Die [Objektreferenz AssetMilestone](https://developer.salesforce.com/docs/atlas.en-us.264.0.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_assetmilestone.htm) beschreibt ihn als „the key events in the lifecycle of an asset, such as manufacturing, registration, or resale“. Das Objekt gibt es ab API-Version 58.0; es ist über eine Master-Detail-Beziehung mit dem Asset verknüpft. Die Felder:

| Feld | Inhalt |
|---|---|
| MilestoneDate, ExpiredDate | Wann das Ereignis stattfand und ab wann es nicht mehr gilt |
| MilestoneType | Art des Ereignisses; die Referenz nennt keine Werte, Sie legen sie selbst fest |
| Stage, StageComment | Active, Expired oder Tentative, mit Begründung, etwa warum ein Datum noch vorläufig ist |
| Address, Location | Wo das Ereignis stattfand |
| SourceSystemName, SourceSystemIdentifier | Welches System das Ereignis gemeldet hat, und die ID dort |

Zwei Felder sind mir am wichtigsten. Die Quellsystem-Felder machen jedes Datum nachvollziehbar: Sie sehen, ob das Lieferdatum aus dem ERP stammt oder von einem Händler eingegeben wurde. Und der Status Tentative passt zu einer typischen Lücke: Der Händler meldet ein Übergabedatum, das noch niemand bestätigt hat.

Meilensteine bilden allerdings nur die Historie ab. Der Garantiebeginn sollte trotzdem als ein einziger Wert geführt werden: als Startdatum an der Asset-Garantie, am Asset nur gespiegelt, wenn Sie ihn dort brauchen, und abgeleitet nach einer schriftlichen Regel wie „Installationsmeilenstein, sonst Lieferung plus 90 Tage“. Sonst wählt jeder Sachbearbeiter einen anderen Meilenstein.

## Hersteller, Händler, Betreiber und Servicepartner hängen an einer Maschine

Der Hersteller baut sie, ein Händler verkauft sie, ein Kunde betreibt sie, ein Servicepartner wartet sie. Die Manufacturing Cloud verbindet diese Beteiligten über zwei Verbindungsobjekte mit der Maschine; laut Salesforce-Entwicklerleitfaden gibt es beide ab API 59.0:

- **Asset Account Participant** verbindet einen Account mit einem Asset. Die [Referenz](https://developer.salesforce.com/docs/atlas.en-us.246.0.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_assetaccountparticipant.htm) nennt „Customer“ als Rolle.
- **Asset Contact Participant** verbindet einen Kontakt mit einem Asset. Die [Referenz](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_assetcontactparticipant.htm) nennt „Service Manager“ als Rolle.

```hinweis achtung
Beide Rollenfelder sind eingeschränkte Auswahllisten; in der Dokumentation sind nur wenige Werte aufgeführt. Prüfen Sie in einer Sandbox, ob Sie Rollen wie Händler oder Servicepartner ergänzen können, bevor Sie die Freigaben im Portal darauf aufbauen.
```

Für Kunden mit vielen Maschinen gibt es Flotten. Die [Referenz zu Fleet](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_fleet.htm) beschreibt „a group of assets used in commercial, service, or transport operations in the manufacturing industry“, mit Owner-Account, Standort, übergeordneter Flotte, Status und den Typen Commercial, Employee, Executive und Material. Der [Fleet-Asset-Datensatz](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_fleetasset.htm) verbindet eine Maschine mit Start- und Enddatum mit der Flotte und hält ihre Nutzung mit Maßeinheit fest. Das passt zu einem Vermieter oder einem Logistikkunden mit Gabelstaplern an mehreren Standorten.

## Die Anlagendaten kommen aus drei Quellen

Keine der Quellen kennt alles. Ein Rechenbeispiel mit angenommenen Zahlen: Ein Maschinenbauer verkauft 6.000 Maschinen im Jahr, überwiegend über 50 Händler. Das ERP kennt Seriennummer, Produkt, Baudatum und den Händler, an den geliefert wurde. Den Endkunden kennt es nicht.

| Daten | Quelle | Owner |
|---|---|---|
| Seriennummer, Produkt, Baudatum | ERP-Lieferung oder Fertigung | ERP |
| Händler, der die Maschine erhalten hat | ERP-Lieferung | ERP |
| Endkunde, Übergabedatum | Registrierung im Händlerportal | Händler erfasst, Hersteller prüft |
| Installationsdatum, Standort | Inbetriebnahmeprotokoll | Service |
| Betriebsstunden | Händler, Kunde oder Telemetrie | Hängt von den Garantiebedingungen ab |

In diesem Szenario hängt der Garantiebeginn vom Händler ab. Ist die Registrierung freiwillig, fehlt bei einem großen Teil der Maschinen das Startdatum, und jeder Antrag zu diesen Maschinen muss manuell bearbeitet werden. Ich würde die Registrierung im Portal zur Pflicht machen, am besten verknüpft mit einem Vorteil für den Händler, etwa dass Garantieanträge nur für registrierte Maschinen angenommen werden. Welche Lizenz Händler dafür brauchen, steht im Beitrag zum [Kundenportal der Manufacturing Cloud](../manufacturing-cloud-kundenportal/).

Die Owner-Spalte ist die eigentliche Arbeit. Schreiben Sie sie pro Feld auf, wie in der [Object Ownership Matrix](../object-ownership-matrix-salesforce/), und planen Sie die ERP-Schnittstelle danach. Wie ich dabei unterstütze, steht unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Was zeigt die Asset Service Console?

Sie zeigt alle Datensätze, die einer Maschine zugeordnet sind. Laut Serviceseite zeigt sie „alerts, milestones, and service history“ eines Assets, dazu Garantien, Cases, Arbeitsaufträge und Garantieanträge. Der [Überblick auf Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) nennt sie einen Arbeitsplatz „to manage cases, assets, warranties, and service histories“.

Eine Konsole wirkt nur so vollständig wie die Daten dahinter. Das gilt genauso für den [Garantie-Prüfagenten aus Winter '27](../garantie-pruefagent-winter-27/): Er stützt sich wie ein Mensch auf Asset-, Garantie- und Antragsdaten, fragt aber nicht nach, wenn sie fehlen. Der Beitrag schlägt einen einfachen Test vor: Zählen Sie, zu wie vielen Seriennummern aus den Anträgen des Vorjahres ein Asset mit Startdatum existiert.

## Beim Arbeitsauftrag beginnt Field Service

Assets, Meilensteine, Beteiligte und Flotten bilden die gemeinsame Grundlage. Wartungspläne, Arbeitsaufträge, Servicetermine und Technikerbestände gehören zu Field Service, beschrieben im [Kapitel zu Assets und Wartung der Field-Service-Masterclass](../../masterclass/field-service/field-service-assets-wartung-teile/) und im Beitrag zu [Wartungsverträgen](../salesforce-field-service-wartungsvertraege/). Entwerfen Sie das Asset-Modell einmal für beide, nicht pro Projekt.

Zwei Add-ons werden hier oft diskutiert. Laut [Add-on-Seite](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) kostet Connected Assets 15.000 US-Dollar pro Org und Monat bei jährlicher Abrechnung und stellt Telemetriedaten bereit; Asset Service Lifecycle Management kostet 75 US-Dollar pro Nutzer und Monat und kann zu den Field-Service-Editionen hinzugebucht werden (Field Service Max enthält laut Field-Service-Preisseite ASLM und Connected Assets). Für eine saubere installierte Basis brauchen Sie keines davon. Ob Telemetrie sich lohnt, steht in [Predictive Maintenance in Salesforce](../predictive-maintenance-salesforce-datenbasis/).

## Lücken in den Garantieanträgen des Vorjahres zählen

```schritte
Lücken zählen
  Nehmen Sie die Garantieanträge des Vorjahres und prüfen Sie, wie viele Seriennummern als Asset mit Betreiber und Startdatum existieren.
Regel für den Garantiebeginn schreiben
  Welcher Meilenstein startet die Garantie, und was gilt, wenn er fehlt.
Owner pro Feld festlegen
  ERP, Händler oder Service, einer pro Feld.
Meilensteintypen definieren
  Lieferung, Registrierung, Installation, Weiterverkauf, Verschrottung: nur die, die jemand wirklich pflegt.
Registrierung zur Pflicht machen
  Als festen Schritt im Händlerprozess.
```

Die Quote aus dem ersten Schritt berechne ich als Seriennummern mit Betreiber und Startdatum geteilt durch alle Anträge; an ihr messe ich das Projekt. Einen vollständigen Überblick zum After-Sales finden Sie im [Kapitel Garantie und After-Sales](../../masterclass/manufacturing-cloud/garantie-und-after-sales/) der Masterclass Manufacturing Cloud.
