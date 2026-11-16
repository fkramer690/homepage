---
title: "Assets in Revenue Cloud: Nachträge und Verlängerungen"
description: "Wie Revenue Cloud verkaufte Produkte als Assets führt, wie Nachträge, Verlängerungen und Kündigungen ablaufen und wie das zu Field-Service-Assets passt."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: revenue-cloud-assets-nachtraege-verlaengerungen
translationKey: revenue-cloud-installed-base-assets
topic: revenue
categories: [revenue-cloud, field-service]
tags: [Revenue Cloud, Assets, Nachträge, Vertragsverlängerung, installierte Basis, Field Service]
takeaways:
  - "Ein Nachtragsangebot zeigt Startmenge, Änderung als positives oder negatives Delta und Endmenge, zum Beispiel 5 plus 8 ergibt 13."
  - "Asset State Periods halten Menge, Betrag und monatlichen Umsatz je Zeitraum fest. Sie sind vom System geführte Historie, keine Stammdaten für Schnittstellen."
  - "Eine Kündigung setzt die Menge auf den negativen Wert der Gesamtmenge, die Endmenge ist dann null."
  - "Field Service nutzt dasselbe Asset-Objekt für die Maschine. Entscheiden Sie früh, ob Abos und Maschinen Datensätze teilen und wie sie verknüpft werden."
faq:
  - q: "Was ist ein lifecycle-managed Asset in Salesforce?"
    a: "Es ist ein Asset, bei dem das Kennzeichen Lifecycle-managed asset gesetzt ist. Salesforce erfasst jede Änderung daran als Asset Action und hält Menge, Betrag und monatlich wiederkehrenden Umsatz je Zeitraum in Asset State Periods fest."
  - q: "Wie ändere ich ein Abonnement in Revenue Cloud?"
    a: "Sie erstellen einen Nachtrag zum Asset. Im Standardablauf legt Revenue Cloud ein Nachtragsangebot mit der Änderung als Delta an, daraus entsteht ein Auftrag, den Sie aktivieren. Das Asset erhält dann eine neue Asset Action und eine neue State Period. Der Ablauf lässt sich auch so einstellen, dass direkt ein Auftrag entsteht, und die Asset-Lifecycle-APIs ändern Assets ohne Angebot."
  - q: "Welche Verlängerungsoptionen gibt es in Revenue Cloud?"
    a: "Automatic Renewal verlängert das Abonnement am Laufzeitende mit der hinterlegten Verlängerungslaufzeit des Assets. Override Renewal Term setzt abweichende Start- und Enddaten und erzeugt ein Angebot oder einen Auftrag mit einer Gutschrift für den ungenutzten Teil der laufenden Periode. Ob daraus eine Gutschrift, eine Verrechnung mit der nächsten Rechnung oder eine Erstattung wird, entscheidet die Abrechnung."
  - q: "Können Revenue Cloud und Field Service dieselben Assets nutzen?"
    a: "Beide verwenden das Standardobjekt Asset. Revenue Cloud verwaltet die verkauften Leistungen mit Menge und wiederkehrendem Umsatz, Field Service verwaltet die installierte Maschine mit Seriennummer und Hierarchie. Technisch kann ein Datensatz beide Feldgruppen enthalten. Ich nutze einen gemeinsamen Datensatz nur, wenn jede Maschine als eigene Position mit Menge eins verkauft wird."
  - q: "Lassen sich aus SAP migrierte Assets in Revenue Cloud ändern?"
    a: "Nicht, wenn Sie nur Asset-Datensätze laden. Nachträge, Verlängerungen und Kündigungen brauchen die Historie aus Asset Actions und Asset State Periods. Bauen Sie diese Historie über die Asset-Lifecycle-APIs oder aus historischen Aufträgen in zeitlicher Reihenfolge auf, und testen Sie vor dem Go-live einen Nachtrag auf migrierten Assets."
draft: false
---

Bei Produkten, die Assets erzeugen sollen, legt Revenue Cloud für das Gekaufte ein Asset am Kundenkonto an, sobald der Auftrag verarbeitet ist, meist bei dessen Aktivierung. Im Standardablauf durchlaufen alle späteren Nachträge, Verlängerungen und Kündigungen ein neues Angebot und einen neuen Auftrag auf dieses Asset. Salesforce erfasst jede Änderung als Asset Action und hält Menge, Betrag und monatlich wiederkehrenden Umsatz je Zeitraum in Asset State Periods fest. Field Service nutzt dasselbe Asset-Objekt für die installierte Maschine mit Seriennummer. Den meisten Maschinenbauern empfehle ich zwei Arten von Asset-Datensätzen, einen für das Verkaufte und einen für die physische Maschine, mit einer festgelegten Verknüpfung.

## Wie entstehen Assets in Revenue Cloud?

[Trailhead zu Kunden-Assets](https://trailhead.salesforce.com/modules/field_service_maint/units/field_service_maint_assets) beschreibt ein Asset in Salesforce als bestimmtes gekauftes oder installiertes Produkt. Revenue Cloud, das Salesforce in Hilfe und Trailhead inzwischen auch Agentforce Revenue Management nennt, legt diese Datensätze für entsprechend eingerichtete Produkte aus Aufträgen an; das übernimmt eine Automatisierung wie ein datensatzgesteuerter Flow. Laut [Trailhead zu Asset-Nachträgen](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments) gilt der Auftrag mit der Aktivierung als erfüllt, und die Assets erscheinen am Kundenkonto im Bereich Managed Assets. Läuft der Auftrag vorher durch den Dynamic Revenue Orchestrator, werden die Assets in der Trailhead-Übung geprüft, sobald die Orchestrierungsschritte abgeschlossen sind. Wie das funktioniert, steht in [Auftrag an SAP übergeben mit DRO](/blog/revenue-cloud-auftragsorchestrierung-sap/).

Salesforce nennt das lifecycle-managed Assets. Neben den klassischen Feldern wie Seriennummer, übergeordnetem Asset und Root-Asset hat das Asset-Objekt laut [Feldreferenz von Salesforce](https://developer.salesforce.com/docs/atlas.en-us.226.0.sfFieldRef.meta/sfFieldRef/salesforce_field_reference_Asset.htm) ein Kennzeichen Lifecycle-managed asset, eine aktuelle Menge und einen aktuellen monatlich wiederkehrenden Umsatz. Zwei verbundene Objekte halten die Historie:

- **Asset Action:** laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.264.0.object_reference.meta/object_reference/sforce_api_objects_assetaction.htm) eine Änderung an einem lifecycle-managed Asset. Trailhead zeigt Geschäftskategorien wie Upsells, Renewals und Cancellations.
- **Asset State Period:** laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetstateperiod.htm) ein Zeitraum, in dem ein Asset dieselbe Menge, denselben Betrag und denselben monatlich wiederkehrenden Umsatz hat. Nachträge und Verlängerungen fügen einen neuen Zeitraum hinzu.

Die Felder beider Objekte lassen sich nicht direkt bearbeiten, behandeln Sie sie also als vom System geführte Historie. Die Historie entsteht aus Angeboten und Aufträgen oder über die [Asset-Lifecycle-APIs](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/features_asset_lifecycle_use_cases.htm). Das gilt auch für eine Migration: Assets, die ohne Asset Actions und State Periods aus SAP geladen werden, lassen sich nicht verlässlich ändern oder verlängern. Bauen Sie die Historie dieser Assets über die Asset-Lifecycle-APIs oder aus historischen Aufträgen in zeitlicher Reihenfolge auf.

```hinweis achtung
Eine Schnittstelle aus SAP sollte Mengen an lifecycle-managed Assets nicht wie gewöhnliche Stammdaten überschreiben. Eine Mengenänderung ist eine kaufmännische Änderung und gehört in Angebot und Auftrag oder in einen Aufruf der Asset-Lifecycle-APIs, damit Asset Actions und State Periods stimmig bleiben.
```

## Wie funktioniert ein Nachtrag?

Im Standardablauf beginnt ein Nachtrag als Angebot, aus dem ein Auftrag wird. Das Trailhead-Beispiel: Ein Kunde hat fünf Lizenzen und braucht acht weitere. Der Vertrieb wählt das Asset, klickt auf Amend und setzt ein Nachtragsdatum, also den Tag, ab dem die Änderung gilt. Revenue Cloud legt ein Nachtragsangebot mit drei Mengenangaben an:

```kennzahlen
5 | Startmenge: was der Kunde heute hat
+8 | Menge: das Delta, zum Reduzieren eine negative Zahl wie -3
13 | Endmenge: das Ergebnis
quelle: Trailhead, Manage Customer Asset Amendments (Asset Lifecycle Management with Revenue Cloud)
```

Aus dem Angebot entsteht ein Auftrag, der aktiviert wird. Das Asset erhält eine neue Asset Action mit der Geschäftskategorie Upsells und eine neue State Period mit der höheren Menge ab dem Nachtragsdatum.

Für einen Hersteller heißt das: Ein Kunde, der die Fernüberwachung für drei weitere Maschinen bucht, erhält ein Angebot und einen Auftrag, genau wie bei einem Neugeschäft. Das ist aufwendiger, als nur eine Zahl zu ändern, und genau deshalb bleibt die Historie richtig. Das Nachtragsangebot kann Ihre Preis- und Freigaberegeln nutzen, sofern Preisprozeduren und Freigaberegeln auch Nachträge abdecken.

## Verlängerungen verlängern die Laufzeit, Kündigungen setzen die Menge auf null

[Trailhead zu Verlängerungen und Kündigungen](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-renewals-and-cancellations) beschreibt zwei Verlängerungsoptionen:

- **Automatic Renewal** verlängert das Abonnement am Ende der laufenden Periode mit der hinterlegten Verlängerungslaufzeit des Assets.
- **Override Renewal Term** setzt abweichende Start- und Enddaten. Die Option ersetzt die bisherige Verlängerungslaufzeit und erzeugt ein Angebot oder einen Auftrag mit einer Gutschrift für den ungenutzten Teil des laufenden Abonnements. Ob daraus eine Gutschrift, eine Verrechnung mit der nächsten Rechnung oder eine Erstattung wird, hängt von Ihrem Abrechnungsprozess ab.

Im Trailhead-Beispiel erzeugt das Setzen der Verlängerungslaufzeit ein Verlängerungsangebot. Daraus entsteht ein Auftrag, der aktiviert wird, und das Asset erhält eine Asset Action mit der Kategorie Renewals und einen neuen Zeitraum mit den neuen Daten.

Eine Kündigung beginnt mit einem Kündigungsdatum. Im Kündigungsangebot setzt Revenue Cloud die Menge automatisch auf den negativen Wert der Gesamtmenge des Assets, die Endmenge wird also null. Nach Aktivierung des Auftrags erhält das Asset eine Asset Action mit der Kategorie Cancellations. Anders als bei Nachträgen und Verlängerungen entsteht dabei keine neue State Period; das Dashboard zeigt den letzten Tag der laufenden Periode.

Legen Sie früh fest, wer Verlängerungen anstößt. Die automatische Verlängerung passt zu befristeten Serviceverträgen, die zu gleichen Bedingungen verlängert werden. Ein Vertrag ohne Enddatum wird besser als Evergreen-Abonnement modelliert, das keine Verlängerung braucht. Eine abweichende Laufzeit passt zu Verlängerungen, die ohnehin neu verhandelt werden, etwa mit einem neuen Preis. Ob Vertrieb, Innendienst oder ein Angebotsagent das Verlängerungsangebot vorbereitet, ist eine Prozessentscheidung, die vor dem Go-live schriftlich festgehalten werden sollte.

## Wie passen Revenue-Cloud-Assets zu Field Service?

Field Service verwendet dasselbe Asset-Objekt. Dort ist das Asset die Maschine beim Kunden, mit Seriennummer, einer Hierarchie aus Baugruppen über das Feld Parent Asset, verknüpften Arbeitsaufträgen und Wartungsplänen. Welche Daten Field Service braucht, steht in [Field Service: Stammdaten](/blog/salesforce-field-service-stammdaten/), und wie Serviceverträge und Wartungspläne mit Assets verknüpft sind, in [Wartungsverträge im Field Service abbilden](/blog/salesforce-field-service-wartungsvertraege/).

Die beiden Sichten verwenden unterschiedliche Zählweisen. Revenue Cloud zählt Mengen: Die fünf Lizenzen aus Trailhead sind ein Asset mit Menge 5. Field Service braucht einen Datensatz pro Seriennummer, denn ein Techniker repariert eine einzelne Maschine. Zwei Modelle sind möglich:

| | Ein Datensatz pro Maschine | Getrennte Datensätze, verknüpft |
|---|---|---|
| Idee | Das Asset aus dem Auftrag ist zugleich das Maschinen-Asset | Verkauftes Asset aus Revenue Cloud, Maschinen-Asset aus SAP oder Inbetriebnahme |
| Passt, wenn | Jede Maschine als eigene Position mit Menge 1 verkauft wird | Mengen über 1, Abos über mehrere Maschinen |
| Seriennummer | Wird nach Lieferung am verkauften Asset ergänzt | Am Maschinen-Asset, aus SAP |
| Risiko | Eine Position mit Menge 3 wird nicht zu drei Maschinen | Die Verknüpfung muss gepflegt werden |

Den meisten Maschinenbauern empfehle ich das zweite Modell. Das verkaufte Asset beantwortet die Frage, wofür der Kunde zahlt; das Maschinen-Asset beantwortet die Frage, welche Maschine an welchem Standort steht. Verknüpfen Sie beide über eine festgelegte Beziehung und vereinbaren Sie, welches Team für welchen Datensatz verantwortlich ist. Ein Lookup-Feld genügt, wenn jede Maschine zu genau einem verkauften Asset gehört. Kann eine Maschine mehreren Abos zugeordnet sein oder ändert sich die Abdeckung über die Zeit, nutzen Sie ein Verknüpfungsobjekt mit Beginn und Ende der Abdeckung. Wer den Dynamic Revenue Orchestrator nutzt, erhält zusätzlich ein Fulfillment Asset für die technische Seite des Auftrags; es ersetzt nicht das Maschinen-Asset in Field Service, also legen Sie fest, wie beide zusammenhängen. In einer [Object Ownership Matrix](/blog/object-ownership-matrix-salesforce/) ist Asset ein typisches geteiltes Objekt: Ein Stream implementiert Revenue Cloud, ein anderer Field Service, und beide schreiben Daten in das Asset-Objekt. Ein Eigentümer und ein Einstiegspunkt für Automatisierung verhindern, dass zwei Teams widersprüchliche Trigger entwickeln. Wie Field Service Maschinen, Wartung und Teile abbildet, behandelt das Kapitel [Assets, Wartung und Teile](/masterclass/field-service/field-service-assets-wartung-teile/).

## Rechenbeispiel: Fernüberwachung pro Maschine

Angenommen, ein Maschinenbauer verkauft einem Kunden ein Abonnement zur Fernüberwachung für 12 installierte Maschinen. In Revenue Cloud ist das eine Angebotsposition mit Menge 12, also ein Asset mit Menge 12. Field Service führt 12 Maschinen-Assets mit Seriennummern aus SAP.

Ein Jahr später verkauft der Kunde zwei Maschinen weiter und kündigt die Überwachung dafür. Der Nachtrag reduziert die Menge um 2 auf 10. Revenue Cloud weiß jetzt, dass der Kunde für 10 zahlt. Welche zwei Maschinen nicht mehr abgedeckt sind, weiß es nicht, denn das verkaufte Asset enthielt nie Seriennummern. Solange keine eigene Abdeckungsliste festlegt, welche zehn Maschinen abgedeckt sind, sieht der Service weiterhin 12 Maschinen mit aktiver Überwachung.

Es gibt zwei Auswege. Entweder Sie verkaufen die Überwachung pro Maschine, eine Position pro Seriennummer. Dadurch werden Angebote länger, aber jede Änderung wird eindeutig. Oder Sie bleiben bei der Mengenlogik und pflegen eine eigene Liste der abgedeckten Maschinen, für die der Innendienst verantwortlich ist. Ich bevorzuge eine Position pro Maschine, solange Angebote für den Kunden lesbar bleiben und die Seriennummern beim Angebot schon bekannt sind, weil das Asset dann die Frage beantwortet, die Technik und Abrechnung gleichermaßen stellen. Bei Hunderten Maschinen pro Kunde ist die Abdeckungsliste meist die bessere Wahl. Wie solche Abonnements abgerechnet werden, steht in [Wartungsverträge wiederkehrend abrechnen](/blog/wartungsvertraege-wiederkehrend-abrechnen/).

## Produkte auflisten, die nach dem Auftrag weiterleben

Listen Sie die Produkte auf, die nach dem Auftrag weiter genutzt oder abgerechnet werden: Abonnements, Serviceverträge, Softwarelizenzen, Überwachung. Entscheiden Sie für jedes, ob es gezählt oder an eine Seriennummer gebunden wird, wer Nachträge und Verlängerungen auslösen darf und welchen Datensatz Field Service nutzt. Halten Sie die Entscheidung in der Ownership-Matrix fest, bevor der erste Sprint in einer der beiden Clouds beginnt. Das Kapitel [Angebot, Vertrag, Auftrag](/masterclass/revenue-cloud/angebot-vertrag-auftrag/) zeigt, welche Rolle Assets zwischen Angebot und SAP spielen.
