---
title: "Assets in Revenue Cloud: Nachträge und Verlängerungen"
description: "Wie Revenue Cloud verkaufte Produkte als Assets führt, wie Nachträge, Verlängerungen und Kündigungen ablaufen und wie das zu Field-Service-Assets passt."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-assets-nachtraege-verlaengerungen
translationKey: revenue-cloud-installed-base-assets
topic: revenue
categories: [revenue-cloud, field-service]
tags: [Revenue Cloud, Assets, Nachträge, Vertragsverlängerung, installierte Basis, Field Service]
takeaways:
  - "In Revenue Cloud erscheinen die verkauften Produkte nach der Aktivierung des Auftrags als Assets am Kundenkonto. Jede spätere Änderung läuft über ein neues Angebot und einen neuen Auftrag."
  - "Ein Nachtragsangebot zeigt die Startmenge, die Änderung als positives oder negatives Delta und die resultierende Endmenge, zum Beispiel 5 plus 8 ergibt 13."
  - "Jede Änderung erzeugt eine Asset Action, und Asset State Periods halten Menge, Betrag und monatlich wiederkehrenden Umsatz je Zeitraum fest. Ihre Felder sind nicht editierbar."
  - "Verlängerungen laufen automatisch mit der Laufzeit des Assets oder mit abweichender Laufzeit. Eine Kündigung setzt die Menge auf das Negative der Gesamtmenge, die Endmenge ist null."
  - "Field Service nutzt dasselbe Asset-Objekt für die installierte Maschine mit Seriennummer. Entscheiden Sie früh, ob verkaufte Abos und Maschinen dieselben Datensätze teilen."
faq:
  - q: "Was ist ein lifecycle-managed Asset in Salesforce?"
    a: "Ein Asset, bei dem das Kennzeichen Lifecycle-managed asset gesetzt ist. Salesforce erfasst jede Änderung daran als Asset Action und hält Menge, Betrag und monatlich wiederkehrenden Umsatz je Zeitraum in Asset State Periods fest."
  - q: "Wie ändere ich ein Abonnement in Revenue Cloud?"
    a: "Sie erstellen einen Nachtrag zum Asset. Revenue Cloud legt ein Nachtragsangebot mit der Änderung als Delta an, daraus entsteht ein Auftrag, den Sie aktivieren. Das Asset erhält dann eine neue Asset Action und eine neue State Period."
  - q: "Welche Verlängerungsoptionen gibt es in Revenue Cloud?"
    a: "Automatic Renewal verlängert das Abonnement am Laufzeitende mit der hinterlegten Verlängerungslaufzeit des Assets. Override Renewal Term setzt eigene Start- und Enddaten und erzeugt ein Angebot oder einen Auftrag, der den ungenutzten Teil der laufenden Periode gutschreibt."
  - q: "Können Revenue Cloud und Field Service dieselben Assets nutzen?"
    a: "Beide arbeiten auf dem Standardobjekt Asset. Revenue Cloud führt, was verkauft wurde, mit Menge und wiederkehrendem Umsatz, Field Service die installierte Maschine mit Seriennummer und Hierarchie. Aus meiner Sicht trägt ein Datensatz beides nur, wenn jede Maschine als eigene Position mit Menge eins verkauft wird."
draft: false
---

In Revenue Cloud wird aus dem, was ein Kunde gekauft hat, mit der Aktivierung des Auftrags ein Asset am Kundenkonto. Jede spätere Änderung, ob Nachtrag, Verlängerung oder Kündigung, läuft über ein neues Angebot und einen neuen Auftrag auf dieses Asset. Salesforce erfasst jede Änderung als Asset Action und hält Menge, Betrag und monatlich wiederkehrenden Umsatz je Zeitraum in Asset State Periods fest. Field Service nutzt dasselbe Asset-Objekt für die installierte Maschine mit Seriennummer. Den meisten Maschinenbauern empfehle ich zwei Arten von Asset-Datensätzen, einen für das Verkaufte und einen für die physische Maschine, mit einer festgelegten Verknüpfung.

## Wie entstehen Assets in Revenue Cloud?

Ein Asset steht in Salesforce für ein bestimmtes gekauftes oder installiertes Produkt, so beschreibt es [Trailhead zu Kunden-Assets](https://trailhead.salesforce.com/modules/field_service_maint/units/field_service_maint_assets). Revenue Cloud legt diese Datensätze aus Aufträgen an. Laut [Trailhead zu Asset-Nachträgen](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments) ist der Auftrag mit der Aktivierung erfüllt, und die Assets erscheinen am Kundenkonto im Bereich Managed Assets. Läuft der Auftrag vorher durch den Dynamic Revenue Orchestrator, prüft die Trailhead-Übung die Assets, sobald die Orchestrierungsschritte abgeschlossen sind. Wie das funktioniert, steht in [Auftrag an SAP übergeben mit DRO](../revenue-cloud-auftragsorchestrierung-sap/).

Salesforce nennt das lifecycle-managed Assets. Neben den klassischen Feldern wie Seriennummer, übergeordnetem Asset und Root-Asset hat das Asset-Objekt laut [Feldreferenz von Salesforce](https://developer.salesforce.com/docs/atlas.en-us.226.0.sfFieldRef.meta/sfFieldRef/salesforce_field_reference_Asset.htm) ein Kennzeichen Lifecycle-managed asset, eine aktuelle Menge und einen aktuellen monatlich wiederkehrenden Umsatz. Zwei verbundene Objekte halten die Historie:

- **Asset Action:** laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.264.0.object_reference.meta/object_reference/sforce_api_objects_assetaction.htm) eine Änderung an einem lifecycle-managed Asset. Trailhead zeigt Geschäftskategorien wie Upsells, Renewals und Cancellations.
- **Asset State Period:** laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetstateperiod.htm) ein Zeitraum, in dem ein Asset dieselbe Menge, denselben Betrag und denselben monatlich wiederkehrenden Umsatz hat. Nachträge und Verlängerungen fügen einen neuen Zeitraum hinzu.

Die Felder beider Objekte lassen sich nicht bearbeiten. Die Historie entsteht aus Angeboten und Aufträgen oder über die [Asset-Lifecycle-APIs](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/features_asset_lifecycle_use_cases.htm). Eine Schnittstelle aus SAP sollte Mengen an diesen Assets deshalb nie überschreiben. Eine Mengenänderung ist eine kaufmännische Änderung und gehört in Angebot und Auftrag.

## Wie funktioniert ein Nachtrag?

Jeder Nachtrag ist ein Angebot, und aus jedem Angebot wird ein Auftrag. Das Trailhead-Beispiel: Ein Kunde hat fünf Lizenzen und braucht acht weitere. Der Vertrieb wählt das Asset, klickt auf Amend und setzt ein Nachtragsdatum, also den Tag, ab dem die Änderung gilt. Revenue Cloud legt ein Nachtragsangebot mit drei Mengen an:

- **Startmenge:** was der Kunde heute hat, 5.
- **Menge:** das Delta, +8 zum Erhöhen oder eine negative Zahl wie -3 zum Reduzieren.
- **Endmenge:** das Ergebnis, 13.

Aus dem Angebot entsteht ein Auftrag, der aktiviert wird. Das Asset erhält eine neue Asset Action mit der Geschäftskategorie Upsells und eine neue State Period mit der höheren Menge ab dem Nachtragsdatum.

Für einen Hersteller heißt das: Ein Kunde, der die Fernüberwachung für drei weitere Maschinen bucht, bekommt ein Angebot und einen Auftrag, genau wie bei einem Neugeschäft. Das ist mehr Prozess als eine Zahl zu ändern, und genau deshalb bleibt die Historie richtig. Weil der Nachtrag ein normales Angebot ist, greifen auch Ihre Preis- und Freigaberegeln.

## Wie funktionieren Verlängerungen und Kündigungen?

[Trailhead zu Verlängerungen und Kündigungen](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-renewals-and-cancellations) beschreibt zwei Verlängerungsoptionen:

- **Automatic Renewal** verlängert das Abonnement am Ende der laufenden Periode mit der hinterlegten Verlängerungslaufzeit des Assets.
- **Override Renewal Term** setzt eigene Start- und Enddaten. Die Option ersetzt die bisherige Verlängerungslaufzeit und erzeugt ein Angebot oder einen Auftrag, der den ungenutzten Teil des laufenden Abonnements gutschreibt.

Im Trailhead-Beispiel erzeugt das Setzen der Verlängerungslaufzeit ein Verlängerungsangebot. Daraus entsteht ein Auftrag, der aktiviert wird, und das Asset erhält eine Asset Action mit der Kategorie Renewals und einen neuen Zeitraum mit den neuen Daten.

Eine Kündigung beginnt mit einem Kündigungsdatum. Im Kündigungsangebot setzt Revenue Cloud die Menge automatisch auf das Negative der Gesamtmenge des Assets, die Endmenge wird also null. Nach Aktivierung des Auftrags erhält das Asset eine Asset Action mit der Kategorie Cancellations. Anders als bei Nachträgen und Verlängerungen entsteht dabei keine neue State Period; das Dashboard zeigt den letzten Tag der laufenden.

Legen Sie früh fest, wer Verlängerungen anstößt. Die automatische Verlängerung passt zu Serviceverträgen, die einfach weiterlaufen. Die abweichende Laufzeit passt zu Verlängerungen, die ohnehin neu verhandelt werden, etwa mit neuem Preis. Ob Vertrieb, Innendienst oder ein Angebotsagent das Verlängerungsangebot vorbereitet, ist eine Prozessentscheidung, die vor dem Go-live schriftlich festgehalten werden sollte.

## Wie passen Revenue-Cloud-Assets zu Field Service?

Field Service arbeitet auf demselben Asset-Objekt. Dort ist das Asset die Maschine beim Kunden, mit Seriennummer, einer Hierarchie aus Baugruppen über das Feld Parent Asset, verknüpften Arbeitsaufträgen und Wartungsplänen. Welche Daten Field Service braucht, steht in [Field Service: Stammdaten](../salesforce-field-service-stammdaten/), und wie Serviceverträge und Wartungspläne an Assets hängen, in [Wartungsverträge im Field Service abbilden](../salesforce-field-service-wartungsvertraege/).

Die beiden Sichten zählen unterschiedlich. Revenue Cloud zählt Mengen: Die fünf Lizenzen aus Trailhead sind ein Asset mit Menge 5. Field Service braucht einen Datensatz pro Seriennummer, denn ein Techniker repariert eine einzelne Maschine. Zwei Modelle sind möglich:

| | Ein Datensatz pro Maschine | Getrennte Datensätze, verknüpft |
|---|---|---|
| Idee | Das Asset aus dem Auftrag ist zugleich das Maschinen-Asset | Verkauftes Asset aus Revenue Cloud, Maschinen-Asset aus SAP oder Inbetriebnahme |
| Passt, wenn | Jede Maschine als eigene Position mit Menge 1 verkauft wird | Mengen über 1, Abos über mehrere Maschinen |
| Seriennummer | Wird nach Lieferung am verkauften Asset ergänzt | Am Maschinen-Asset, aus SAP |
| Risiko | Eine Position mit Menge 3 wird nicht zu drei Maschinen | Die Verknüpfung muss gepflegt werden |

Den meisten Maschinenbauern empfehle ich das zweite Modell. Das verkaufte Asset beantwortet "wofür zahlt der Kunde", das Maschinen-Asset beantwortet "was steht wo". Verknüpfen Sie beide über ein Lookup und vereinbaren Sie, wem welcher Datensatz gehört. In einer [Object Ownership Matrix](../object-ownership-matrix-salesforce/) ist Asset ein typisches geteiltes Objekt: Ein Stream baut Revenue Cloud, ein anderer Field Service, und beide schreiben auf Asset. Ein Eigentümer und ein Einstiegspunkt für Automatisierung verhindern, dass zwei Teams gegeneinander Trigger bauen. Wie Field Service Maschinen, Wartung und Teile abbildet, behandelt das Kapitel [Assets, Wartung und Teile](../../masterclass/field-service/field-service-assets-wartung-teile/).

## Ein typisches Szenario: Fernüberwachung pro Maschine

Ein typisches Szenario, als Annahme: Ein Maschinenbauer verkauft einem Kunden ein Abonnement zur Fernüberwachung für 12 installierte Maschinen. In Revenue Cloud ist das eine Angebotsposition mit Menge 12, also ein Asset mit Menge 12. Field Service führt 12 Maschinen-Assets mit Seriennummern aus SAP.

Ein Jahr später verkauft der Kunde zwei Maschinen weiter und kündigt die Überwachung dafür. Der Nachtrag reduziert die Menge um 2 auf 10. Revenue Cloud weiß jetzt, dass der Kunde für 10 zahlt. Welche zwei Maschinen herausgefallen sind, weiß es nicht, denn das verkaufte Asset kannte nie Seriennummern. Der Service sieht weiterhin 12 Maschinen mit aktiver Überwachung.

Es gibt zwei Auswege. Entweder Sie verkaufen die Überwachung pro Maschine, eine Position pro Seriennummer. Das macht Angebote länger und jede Änderung eindeutig. Oder Sie behalten die Menge und pflegen eine eigene Liste der abgedeckten Maschinen, verantwortet vom Innendienst. Ich bevorzuge eine Position pro Maschine, solange ein Kunde höchstens einige Dutzend Maschinen hat, weil das Asset dann die Frage beantwortet, die Technik und Abrechnung gleichermaßen stellen. Wie solche Abonnements abgerechnet werden, steht in [Wartungsverträge wiederkehrend abrechnen](../wartungsvertraege-wiederkehrend-abrechnen/).

## Wo starten Sie?

Listen Sie die Produkte auf, die nach dem Auftrag weiterleben: Abonnements, Serviceverträge, Softwarelizenzen, Überwachung. Entscheiden Sie für jedes, ob es gezählt oder an eine Seriennummer gebunden wird, wer Nachträge und Verlängerungen auslösen darf und welchen Datensatz Field Service nutzt. Halten Sie die Entscheidung in der Ownership-Matrix fest, bevor der erste Sprint in einer der beiden Clouds beginnt. Das Kapitel [Angebot, Vertrag, Auftrag](../../masterclass/revenue-cloud/angebot-vertrag-auftrag/) zeigt, wo Assets zwischen Angebot und SAP stehen.

Assets in Revenue Cloud halten verlässlich fest, was verkauft wurde, solange jede Änderung über Angebot und Auftrag läuft und die Verknüpfung zur Maschine vorab entschieden ist. Wenn Sie Ihr Modell für die installierte Basis besprechen möchten, [schreiben Sie mir](#contact).
