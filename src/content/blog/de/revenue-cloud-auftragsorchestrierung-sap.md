---
title: "Auftrag an SAP übergeben: Dynamic Revenue Orchestrator"
description: "Wie der Dynamic Revenue Orchestrator einen Revenue-Cloud-Auftrag in Schritte zerlegt, wo die Übergabe an SAP hingehört und wann eine Schnittstelle reicht."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-auftragsorchestrierung-sap
translationKey: revenue-cloud-order-orchestration-erp
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: integration
tags: [Revenue Cloud, Dynamic Revenue Orchestrator, SAP, Auftragsabwicklung, Schnittstellen]
takeaways:
  - "In Revenue Cloud gelangt ein aktivierter Auftrag über einen datensatzgesteuerten Flow zum Dynamic Revenue Orchestrator, zum Beispiel sobald der Status auf Activated wechselt."
  - "Die Dekomposition zerlegt die kommerziellen Produkte, die ein Kunde kauft, in technische Produkte für nachgelagerte Systeme, gesteuert über Product Fulfillment Decomposition Rules."
  - "Ein Orchestrierungsplan kennt fünf Schritttypen: Auto Task, Callout, Manual Task, Milestone und Pause. Die Übergabe an SAP gehört in einen Callout."
  - "Fehlgeschlagene Schritte heißen Fallout: DRO wiederholt sie wie eingestellt und legt sie dann in eine Queue, in der jemand Daten korrigiert, neu startet oder den Schritt manuell abschließt."
  - "Geht ein Auftrag in einem Stück an SAP und passiert danach in Salesforce nichts mehr, reicht eine einfache Schnittstelle ohne DRO und spart ein Add-on."
faq:
  - q: "Was ist der Dynamic Revenue Orchestrator in Salesforce?"
    a: "Der Dynamic Revenue Orchestrator (DRO) ist die Auftragsabwicklung in Revenue Cloud. Er zerlegt Aufträge in technische Produkte und führt einen Orchestrierungsplan mit Schritten in Salesforce und in externen Systemen wie einem ERP aus."
  - q: "Brauche ich DRO, um Aufträge aus Revenue Cloud an SAP zu senden?"
    a: "Nein. Ein datensatzgesteuerter Flow oder ein Aufruf über Middleware kann einen aktivierten Auftrag direkt an SAP senden. DRO lohnt sich, wenn ein Auftrag mehrere abhängige Schritte mit Verantwortlichen und Fristen auslöst."
  - q: "Was kostet der Dynamic Revenue Orchestrator?"
    a: "Die Preisseite von Revenue Cloud führt Dynamic Revenue Orchestration als zukaufbares Add-on zu Revenue Cloud Advanced, mit dem Hinweis auf Freemium-Zugang. Was dieser Zugang umfasst, steht dort nicht. Lassen Sie sich das schriftlich bestätigen, bevor Sie damit planen."
  - q: "Was passiert, wenn SAP einen Auftrag aus Revenue Cloud ablehnt?"
    a: "In DRO wird der Schritt zum Fallout. Er wird so oft wiederholt wie eingestellt und landet dann in einer Queue, in der jemand die Daten korrigiert, den Schritt neu startet oder ihn manuell abschließt."
  - q: "Welche Schritttypen hat ein Orchestrierungsplan?"
    a: "Fünf: Ein Auto Task startet einen Flow, ein Callout ruft ein externes System auf, ein Manual Task wartet auf eine Person, ein Milestone markiert einen Meilenstein, und eine Pause hält den Plan an, bis eine andere Aufgabe erledigt ist."
draft: false
---

In Revenue Cloud geht ein aktivierter Auftrag an den Dynamic Revenue Orchestrator (DRO), meist über einen datensatzgesteuerten Flow. DRO zerlegt die kommerziellen Produkte, die der Kunde gekauft hat, in technische Produkte und führt einen Orchestrierungsplan aus: Auto Tasks, Callouts, manuelle Aufgaben, Meilensteine und Pausen in fester Reihenfolge. Die Übergabe an SAP gehört in einen Callout, der die SAP-Auftragsnummer zurückschreibt, und Fehler landen als Fallout in einer Queue. DRO ist ein Add-on zu Revenue Cloud Advanced. Geht Ihr Auftrag in einem Stück an SAP und passiert danach in Salesforce nichts mehr, reicht eine einfache Schnittstelle.

## Was macht der Dynamic Revenue Orchestrator?

Der Dynamic Revenue Orchestrator ist der Teil von Revenue Cloud, der übernimmt, sobald ein Auftrag verkauft ist. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/meet-dynamic-revenue-orchestrator) nennt ihn die Engine für die Auftragsabwicklung von Anfang bis Ende und teilt ihn in zwei Teile: Die Dekomposition zerlegt den Auftrag in technische Produkte und Leistungen, die Orchestrierung bildet die Schritte zur Erfüllung über Systeme hinweg ab, samt Fallout-Management für fehlgeschlagene Schritte. Trailhead ordnet DRO unter "Agentforce Revenue Management" ein, einem der Namen, die Salesforce derzeit für Revenue Cloud verwendet. Auf der Preisseite heißt das Add-on "Dynamic Revenue Orchestration".

Trailhead nennt drei Rollen, und ich würde sie vor dem ersten Sprint besetzen:

- **DRO-Admin:** richtet DRO ein und konfiguriert Fallout- und SLA-Einstellungen.
- **Fulfillment Designer:** baut Dekompositionsregeln und Orchestrierungspläne und testet sie.
- **Fulfillment Operator:** bearbeitet manuelle Aufgaben in den Queues und löst fehlgeschlagene Schritte.

Die Operator-Rolle würde ich in der Auftragsabwicklung oder im Innendienst ansiedeln, nicht in der IT. Dort weiß man, warum ein Auftrag hängt, und genau diese Leute brauchen Schulung und Lizenz.

## Wie kommt ein Auftrag vom Angebot zu DRO?

Der Weg beginnt mit einem angenommenen Angebot, aus dem ein Auftrag wird. Laut [Trailhead zur Auftragsverwaltung](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/manage-orders) legen Sie einen datensatzgesteuerten Flow an, der den Auftrag an DRO übergibt, zum Beispiel wenn sein Status auf Activated wechselt. Zwei Kontextdefinitionen transportieren die Daten: SalesTransactionContext enthält den Auftrag und seine Fulfillment-Positionen, FulfillmentAssetContext dient der Dekomposition und ist auf die Asset-Objekte gemappt.

Die Aktivierung ist ein fachliches Ereignis. Legen Sie fest, wer einen Auftrag aktivieren darf und was vorher erfüllt sein muss: Freigaben abgeschlossen, Kunde in SAP angelegt, Kreditprüfung bestanden. Diese Prüfungen gehören in die Startbedingungen des Flows oder in Validierungsregeln, statt sich darauf zu verlassen, dass der Vertrieb daran denkt.

## Was bedeutet Dekomposition eines Auftrags?

Die Dekomposition trennt, was der Kunde sieht, von dem, was die Abwicklung braucht. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/discover-order-decomposition) ist ein kommerzielles Produkt jedes Produkt, das ein Kunde im Katalog findet. Ein technisches Produkt liegt ebenfalls im Katalog, ist für Kunden in der Regel verborgen und richtet sich nach den Anforderungen nachgelagerter Systeme wie Abrechnung, Fulfillment oder Logistik. Product Fulfillment Decomposition Rules ordnen eine Quelle, also ein Produkt oder eine Produktklassifizierung, einem technischen Produkt zu, inklusive Feldern und Attributen, und können Bedingungen enthalten.

Ein typisches Szenario, als Annahme: Ein Kunde kauft "Verpackungslinie L200 mit Inbetriebnahme und Fernüberwachung". Die Dekomposition macht daraus drei technische Produkte: eine Kundenauftragsposition für SAP, einen Inbetriebnahme-Einsatz für den Service und die Freischaltung des Überwachungsdienstes. Weder der Kunde noch der Vertrieb sieht diese drei.

Trailhead sagt auch, dass einfache Aufträge keine Dekomposition brauchen und direkt orchestriert werden können. Weil Regeln auf Produktklassifizierungen zeigen dürfen, deckt eine Regel eine ganze Produktfamilie ab statt jeder einzelnen Maschine. Das hält die Regeln pflegbar, auch wenn der Katalog Hunderte Varianten hat.

## Welche Schritte führt ein Orchestrierungsplan aus?

Ein Orchestrierungsplan teilt die Abwicklung in Schritte, die in festgelegter Reihenfolge laufen. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/explore-order-orchestration) nennt fünf Schritttypen. Die Beispiele in der rechten Spalte sind meine Annahmen für einen Maschinenbauer:

| Schritttyp | Was er tut | Beispiel aus der Fertigung |
|---|---|---|
| Auto Task | Startet einen Salesforce-Flow | Arbeitsauftrag für die Inbetriebnahme anlegen |
| Callout | Ruft ein Drittsystem auf | Kundenauftrag in SAP anlegen |
| Manual Task | Wartet auf Eingabe oder Bestätigung einer Person | Anwendungstechnik bestätigt das Layout |
| Milestone | Markiert einen Meilenstein für Abhängigkeiten | Maschine geliefert |
| Pause | Hält den Plan an, bis eine andere Aufgabe erledigt ist | Warten auf abgeschlossene Inbetriebnahme |

Schritte liegen in Swimlanes, meist eine pro abwickelndem System, und können voneinander abhängen. Der Scope eines Schritts legt fest, ob er einmal pro Plan, pro Bundle oder pro Position entsteht. Jeder Schritt kann eine geschätzte Dauer als SLA tragen und eine Jeopardy-Schwelle, die warnt, bevor das SLA reißt: Im Trailhead-Beispiel wird ein 24-Stunden-Schritt nach 23 Stunden markiert.

## Wo gehört die Übergabe an SAP hin?

In einen Callout, früh im Plan. SAP braucht den Kundenauftrag, bevor es Produktion planen, liefern und fakturieren kann, also hängen die meisten anderen Schritte davon ab.

Ein Referenzmuster von Salesforce für Revenue Cloud und SAP habe ich nicht gefunden. Am nächsten kommt der [MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/), dokumentiert für Sales Cloud und Salesforce CPQ: Das Anlegen des Auftrags in Salesforce löst den Auftrag in SAP S/4HANA aus, und die SAP-Auftragsnummer erscheint in Salesforce. Diese Regeln würde ich auf Revenue Cloud übertragen:

1. Der Callout schickt die Salesforce-Auftrags-ID als Referenz mit, damit eine Wiederholung den vorhandenen SAP-Auftrag findet, statt einen zweiten anzulegen.
2. Die SAP-Auftragsnummer kommt zurück und wird am Salesforce-Auftrag gespeichert.
3. Nach der Übergabe führt SAP Lieferung, bestätigte Termine und Rechnung. Salesforce zeigt den Status an und ändert ihn nicht.
4. Änderungen nach der Übergabe laufen als neue Aufträge in Revenue Cloud, die DRO erneut an SAP übergibt. Wie Nachträge auf der Asset-Seite funktionieren, steht in [Assets, Nachträge und Verlängerungen](../revenue-cloud-assets-nachtraege-verlaengerungen/).

```ablauf
sf: Auftrag, DRO-Plan, Fallout-Queue
erp: SAP-Kundenauftrag, Lieferung, Rechnung
Auftrag --aktiviert--> DRO-Plan
DRO-Plan --Callout--> SAP-Kundenauftrag
SAP-Kundenauftrag ..Auftragsnummer..> Auftrag
SAP-Kundenauftrag ..abgelehnt..> Fallout-Queue
SAP-Kundenauftrag --> Lieferung
Lieferung --> Rechnung
```

Welches System welchen Schritt vom Angebot bis zur Rechnung führt, behandelt [Revenue Cloud und SAP: Wer führt was?](../revenue-cloud-sap-quote-to-cash-aufteilung/). Dieselbe Aufteilung gehört in Ihre [Object Ownership Matrix](../object-ownership-matrix-salesforce/), damit kein Partner einen zweiten Weg zu SAP baut. Wie Händler den Auftragsstatus aus SAP abfragen, steht in [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/).

## Was passiert, wenn SAP den Auftrag ablehnt?

Dann wird der Schritt zum Fallout. Trailhead beschreibt Fallout als Auftrag, der wegen fehlenden Bestands, falscher Angaben, eines Systemfehlers oder aus einem anderen Grund gescheitert ist. Sie stellen eine Anzahl Wiederholungen ein. Scheitern auch diese, wandert der Schritt in eine Queue, in der jemand das Problem löst und neu startet. Wo eine Wiederholung keinen Sinn ergibt, kann der Schritt manuell als erledigt markiert werden. Das [Datenmodell für die Designzeit](https://developer.salesforce.com/docs/platform/data-models/guide/dro-design-time.html) enthält eigene Objekte für Fallout-Regeln, Jeopardy-Regeln und Zuweisungsregeln für Aufgaben. Das ist also Konfiguration und kein eigener Code.

Typische Ablehnungen aus SAP, als Annahme: Der Warenempfänger ist in SAP noch nicht angelegt, ein Material ist für den Vertrieb gesperrt, oder der Kunde hat eine Kreditsperre. Eine Wiederholung hilft bei keinem davon. Die Queue braucht deshalb eine verantwortliche Person in der Auftragsabwicklung, eine Zielzeit und eine kurze Liste, was zu prüfen ist. Sonst wird Fallout zu einer Liste, die niemand liest, während der Kunde wartet.

## Wann reicht eine einfache Schnittstelle ohne DRO?

DRO lohnt sich, wenn ein Auftrag an mehreren Stellen Arbeit auslöst, die voneinander abhängt. Ein klassischer Maschinenverkauf ist oft einfacher: Der Auftrag geht in einem Stück an SAP, und Produktion, Lieferung und Rechnung passieren dort. Dann reicht ein datensatzgesteuerter Flow oder ein Middleware-Aufruf bei der Aktivierung, mit denselben Regeln für Referenz, Auftragsnummer und Fehlerbehandlung.

Ich würde DRO prüfen, wenn mindestens zwei dieser Punkte zutreffen:

- Eine Auftragsposition erzeugt Arbeit in mehr als einem System, etwa in SAP, im Service und auf einer Überwachungsplattform.
- Schritte hängen voneinander ab, und jemand muss sehen, wo ein Auftrag hängt.
- Zusagen haben Fristen, die pro Schritt überwacht werden sollen.
- Aufträge mischen Einmalprodukte und Abonnements, die unterschiedlich abgewickelt werden.

Zu den Kosten: Die [Preisseite von Revenue Cloud](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) führt Dynamic Revenue Orchestration als zukaufbares Add-on zu Revenue Cloud Advanced, das laut Liste 200 Euro pro Nutzer und Monat kostet, mit dem Hinweis "Freemium access available".

```hinweis offen
Was dieser Freemium-Zugang umfasst, steht auf der Preisseite nicht. Lassen Sie es sich schriftlich geben, bevor Ihr Design davon abhängt.
```

## Wo starten Sie?

Nehmen Sie Ihre fünf häufigsten Auftragsarten und skizzieren Sie für jede, was nach der Unterschrift passiert: welches System, welches Team, in welcher Reihenfolge. Endet jede Skizze mit "den Rest macht SAP", beginnen Sie mit einer einfachen Schnittstelle. Sehen Sie mehrere Systeme und Abhängigkeiten, bilden Sie zuerst eine Auftragsart in DRO ab, samt Callout an SAP und Fallout-Queue, und testen Sie die Ablehnungen vor dem Normalfall. Das Kapitel [Angebot, Vertrag, Auftrag](../../masterclass/revenue-cloud/angebot-vertrag-auftrag/) zeigt, wo dieser Schritt im Gesamtprozess sitzt, und das Schnittstellendesign gehört zu meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

DRO lohnt sich, wenn ein Auftrag mehrere Systeme in Bewegung setzt, und für eine einzelne Übergabe an SAP reicht eine einfache Schnittstelle. Wenn Sie eine zweite Meinung zu Ihrer Auftragsabwicklung möchten, [schreiben Sie mir](#contact).
