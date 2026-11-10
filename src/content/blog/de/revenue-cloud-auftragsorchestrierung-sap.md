---
title: "Auftrag an SAP übergeben: Dynamic Revenue Orchestrator"
description: "Wie der Dynamic Revenue Orchestrator einen Revenue-Cloud-Auftrag in Schritte zerlegt, wo die Übergabe an SAP hingehört und wann eine Schnittstelle reicht."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: revenue-cloud-auftragsorchestrierung-sap
translationKey: revenue-cloud-order-orchestration-erp
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: integration
tags: [Revenue Cloud, Dynamic Revenue Orchestrator, SAP, Auftragsabwicklung, Schnittstellen]
takeaways:
  - "Die Dekomposition zerlegt kommerzielle Produkte in technische Produkte für nachgelagerte Systeme, gesteuert über Decomposition Rules."
  - "Ein Plan nutzt fünf allgemeine Schritttypen plus Staged Assetize: Auto Task, Callout, Manual Task, Milestone und Pause. Die Übergabe an SAP erfolgt als Callout."
  - "Eine Fallout Rule steuert Wiederholungen und die Zuweisung an eine Queue. Ohne passende Fallout Rule scheitert der Schritt endgültig und wird nicht wiederholt."
  - "Geht ein Auftrag in einem Stück an SAP und passiert danach in Salesforce nichts mehr, reicht meist eine einfache Schnittstelle ohne DRO."
faq:
  - q: "Was ist der Dynamic Revenue Orchestrator in Salesforce?"
    a: "Der Dynamic Revenue Orchestrator (DRO) übernimmt die Auftragsabwicklung in Revenue Cloud für Aufträge, die Sie an ihn übergeben. Er zerlegt Aufträge in technische Produkte und führt einen Orchestrierungsplan mit Schritten in Salesforce und in externen Systemen wie einem ERP aus."
  - q: "Brauche ich DRO, um Aufträge aus Revenue Cloud an SAP zu senden?"
    a: "Nein. Ein datensatzgetriggerter Flow oder ein Aufruf über Middleware kann einen aktivierten Auftrag direkt an SAP senden. DRO lohnt sich, wenn ein Auftrag mehrere abhängige Schritte mit Verantwortlichen und Fristen auslöst."
  - q: "Was kostet der Dynamic Revenue Orchestrator?"
    a: "Die Preisseite von Revenue Cloud führt Dynamic Revenue Orchestration als zukaufbare Option zu Revenue Cloud Advanced auf und weist auf einen Freemium-Zugang hin, nennt aber keinen separaten Preis für DRO. Was dieser Zugang umfasst, steht dort nicht. Lassen Sie sich das schriftlich bestätigen, bevor Sie damit planen."
  - q: "Was passiert, wenn SAP einen Auftrag aus Revenue Cloud ablehnt?"
    a: "In DRO wird der Schritt zum Fallout. Mit einer passenden Fallout Rule wird er gemäß Konfiguration wiederholt und anschließend einer Queue zugewiesen, in der jemand die Daten korrigiert und den Schritt neu startet. Ohne passende Regel scheitert er endgültig und wird nicht wiederholt. Ein manueller Abschluss sollte eine genehmigte Ausnahme sein."
  - q: "Welche Schritttypen hat ein Orchestrierungsplan?"
    a: "Sechs: Ein Auto Task startet einen Flow, ein Callout ruft ein externes System auf, ein Manual Task wartet auf eine Person, ein Milestone markiert einen Meilenstein, eine Pause hält den Plan an, bis eine Resume-On-Regel erfüllt ist, und Staged Assetize erzeugt Assets für einige Positionen, während andere noch bearbeitet werden."
draft: false
---

In Revenue Cloud geht ein aktivierter Auftrag an den Dynamic Revenue Orchestrator (DRO), meist über einen datensatzgetriggerten Flow. DRO zerlegt die kommerziellen Produkte, die der Kunde gekauft hat, in technische Produkte und führt einen Orchestrierungsplan aus: Auto Tasks, Callouts, manuelle Aufgaben, Meilensteine, Pausen und weitere Schritte in fester Reihenfolge. Die Übergabe an SAP gehört in einen Callout, der die SAP-Auftragsnummer zurückschreibt, und Fehler landen als Fallout in einer Queue. DRO ist ein Add-on zu Revenue Cloud Advanced. Geht Ihr Auftrag in einem Stück an SAP und passiert danach in Salesforce nichts mehr, reicht eine einfache Schnittstelle.

## Was macht der Dynamic Revenue Orchestrator?

Der Dynamic Revenue Orchestrator ist die Komponente von Revenue Cloud, die nach dem Verkauf die Abwicklung eines Auftrags übernimmt. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/meet-dynamic-revenue-orchestrator) nennt ihn die Engine für die Auftragsabwicklung von Anfang bis Ende und teilt ihn in zwei Teile: Die Dekomposition zerlegt den Auftrag in technische Produkte und Leistungen, die Orchestrierung bildet die Schritte zur Erfüllung über Systeme hinweg ab, samt Fallout-Management für fehlgeschlagene Schritte. Trailhead ordnet DRO unter "Agentforce Revenue Management" ein, dem Namen, den Salesforce jetzt für Revenue Cloud verwendet. Auf der Preisseite steht weiterhin Revenue Cloud, und das Add-on heißt dort "Dynamic Revenue Orchestration".

Trailhead nennt drei Rollen, und ich würde sie vor dem ersten Sprint besetzen:

- **DRO-Admin:** richtet DRO ein und konfiguriert Fallout- und SLA-Einstellungen.
- **Fulfillment Designer:** baut Dekompositionsregeln und Orchestrierungspläne und testet sie.
- **Fulfillment Operator:** bearbeitet manuelle Aufgaben in den Queues und löst fehlgeschlagene Schritte.

Die Operator-Rolle würde ich in der Auftragsabwicklung oder im Innendienst ansiedeln, nicht in der IT. Dort weiß man, warum ein Auftrag hängt. Jede dieser Personen muss geschult sein und benötigt die Fulfillment User Permission Set License sowie das DRO Permission Set für ihre Rolle.

## Ein datensatzgetriggerter Flow übergibt den Auftrag an DRO

Der Weg beginnt mit einem angenommenen Angebot, aus dem ein Auftrag wird. Laut [Trailhead zur Auftragsverwaltung](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/manage-orders) legen Sie einen datensatzgetriggerten Flow an, der den Auftrag an DRO übergibt, zum Beispiel wenn sein Status auf Activated wechselt. Zwei Kontextdefinitionen transportieren die Daten: SalesTransactionContext enthält den Auftrag und seine Fulfillment-Positionen, FulfillmentAssetContext dient der Dekomposition und ist auf die Asset-Objekte gemappt.

Ohne einen solchen Flow erreicht kein Auftrag DRO, und einfache Aufträge können ihn bewusst umgehen. Die Aktivierung ist ein fachliches Ereignis. Legen Sie fest, wer einen Auftrag aktivieren darf und was vorher erfüllt sein muss: Freigaben abgeschlossen, Kunde in SAP angelegt, Kreditprüfung bestanden. Diese Prüfungen gehören in die Startbedingungen des Flows oder in Validierungsregeln. Verlassen Sie sich nicht darauf, dass der Vertrieb daran denkt.

## Was bedeutet Dekomposition eines Auftrags?

Die Dekomposition trennt, was der Kunde sieht, von dem, was die Abwicklung braucht. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/discover-order-decomposition) ist ein kommerzielles Produkt jedes Produkt, das ein Kunde im Katalog findet. Ein technisches Produkt liegt ebenfalls im Katalog, ist für Kunden in der Regel verborgen und richtet sich nach den Anforderungen nachgelagerter Systeme wie Abrechnung, Fulfillment oder Logistik. Product Fulfillment Decomposition Rules ordnen eine Quelle, also ein Produkt oder eine Produktklassifizierung, einem technischen Produkt zu, inklusive Feldern und Attributen, und können Bedingungen enthalten.

Ein Rechenbeispiel: Ein Kunde kauft "Verpackungslinie L200 mit Inbetriebnahme und Fernüberwachung". Die Dekomposition erzeugt daraus drei technische Produkte: eine Kundenauftragsposition für SAP, einen Inbetriebnahme-Einsatz für den Service und die Freischaltung des Überwachungsdienstes. Diese drei technischen Produkte bleiben für den Kunden und den Vertrieb verborgen.

Trailhead sagt auch, dass einfache Aufträge keine Dekomposition brauchen und direkt orchestriert werden können. Da sich Regeln auf Produktklassifizierungen beziehen können, lässt sich mit einer Regel eine ganze Produktfamilie abdecken, ohne für jede Maschine eine eigene Regel anzulegen. Das hält die Regeln pflegbar, auch wenn der Katalog Hunderte Varianten hat.

## Schritttypen im Orchestrierungsplan

Ein Orchestrierungsplan teilt die Abwicklung in Schritte, die in festgelegter Reihenfolge laufen. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/explore-order-orchestration) nennt fünf Schritttypen. Die aktuelle [Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.fulfillment_step_types.htm&language=en_US&type=5) ergänzt die Liste um Staged Assetize als sechsten Schritttyp. Er erzeugt Assets für abgeschlossene Positionen, während andere noch bearbeitet werden. Die Beispiele in der rechten Spalte sind meine Annahmen für einen Maschinenbauer:

| Schritttyp | Was er tut | Beispiel aus der Fertigung |
|---|---|---|
| Auto Task | Startet einen Salesforce-Flow | Arbeitsauftrag für die Inbetriebnahme anlegen |
| Callout | Ruft ein Drittsystem auf | Kundenauftrag in SAP anlegen |
| Manual Task | Wartet auf Eingabe oder Bestätigung einer Person | Anwendungstechnik bestätigt das Layout |
| Milestone | Markiert einen Meilenstein für Abhängigkeiten | Maschine geliefert |
| Pause | Hält den Plan an, bis eine Resume-On-Regel erfüllt ist | Warten, bis der Inbetriebnahmestatus der Position auf abgeschlossen gesetzt ist |

Schritte liegen in Swimlanes, meist eine pro abwickelndem System, und können voneinander abhängen. Muss ein Schritt nur auf einen anderen warten, reicht eine Abhängigkeit, und eine Pause ist nicht nötig. Der Scope eines Schritts legt fest, ob er einmal pro Plan, pro Bundle, pro Position oder pro benutzerdefinierter Gruppierung entsteht, etwa ein SAP-Auftrag pro Werk oder Standort. Für jeden Schritt kann eine geschätzte Dauer als SLA hinterlegt werden, ebenso eine Jeopardy-Schwelle, die warnt, bevor das SLA verletzt wird: Im Trailhead-Beispiel wird ein 24-Stunden-Schritt nach 23 Stunden markiert.

## Die Übergabe an SAP gehört in einen Callout

Die Übergabe gehört früh im Plan in einen Callout. SAP braucht den Kundenauftrag, bevor es Produktion planen, liefern und fakturieren kann, also hängen die meisten anderen Schritte davon ab.

Ein Referenzmuster von Salesforce für Revenue Cloud und SAP habe ich nicht gefunden. Am nächsten kommt der [MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/), 2021 für Sales Cloud und Salesforce CPQ dokumentiert, nicht für Revenue Cloud oder DRO: Das Anlegen des Auftrags in Salesforce stößt den Auftrag in SAP S/4HANA an, und die SAP-Auftragsnummer erscheint in Salesforce. Daraus übernehme ich nur die Ideen zur Korrelation und Auftragsnummer. Die übrigen Regeln sind meine eigenen Architekturentscheidungen:

1. Der Callout schickt einen stabilen Idempotenzschlüssel mit, etwa die Salesforce-Auftrags-ID, und die Integrationsschicht oder SAP prüft ihn, bevor ein Auftrag angelegt wird. Nur die ID zu senden verhindert keine Duplikate.
2. Die SAP-Auftragsnummer kommt zurück und wird am Salesforce-Auftrag gespeichert, entweder in der synchronen Antwort oder bei einem asynchronen Muster durch einen späteren Callback. Nach einem HTTP 202 bleibt der Callout in Bearbeitung, bis das Ergebnis eintrifft.
3. In der hier angenommenen Architektur ist SAP nach der Übergabe für Lieferung, bestätigte Termine und Rechnung verantwortlich. Salesforce zeigt den Status an und ändert ihn nicht.
4. Änderungen nach der Übergabe brauchen ein explizites Nachtragsdesign. Revenue Cloud kann einen verknüpften Zusatzauftrag anlegen, DRO gleicht den laufenden Plan ab und kann Kompensationsschritte ausführen. Ob SAP eine Änderung, eine Stornierung oder einen Ersatzauftrag erhält, ist eine Integrationsentscheidung. Wie Nachträge auf der Asset-Seite funktionieren, steht in [Assets, Nachträge und Verlängerungen](../revenue-cloud-assets-nachtraege-verlaengerungen/).

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

Welches System welchen Schritt vom Angebot bis zur Rechnung verantwortet, behandelt [Revenue Cloud und SAP: Wer führt was?](../revenue-cloud-sap-quote-to-cash-aufteilung/). Dieselbe Aufteilung gehört in Ihre [Object Ownership Matrix](../object-ownership-matrix-salesforce/), damit kein Partner einen zweiten Weg zu SAP baut. Wie Händler den Auftragsstatus aus SAP abfragen, steht in [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/).

## Was passiert, wenn SAP den Auftrag ablehnt?

Dann wird der Schritt zum Fallout. Trailhead beschreibt Fallout als Auftrag, der wegen fehlenden Bestands, falscher Angaben, eines Systemfehlers oder aus einem anderen Grund gescheitert ist. Eine [Fallout Rule](https://help.salesforce.com/s/articleView?id=sf.dro_fallout_design_and_management.htm&language=en_US&type=5) legt Anzahl und Intervall der Wiederholungen sowie die Queue für endgültig fehlgeschlagene Schritte fest. Ohne passende Regel wird der Schritt als endgültig fehlgeschlagen markiert und nicht wiederholt. In der Queue löst jemand das Problem und startet den Schritt neu. Der Schritt kann auch manuell als erledigt markiert werden, wodurch der Plan trotz des Fehlers weiterläuft. Das würde ich nur als genehmigte Ausnahme mit Begründung zulassen, nie für einen abgelehnten SAP-Auftrag, von dem spätere Schritte abhängen. Das [Datenmodell für die Designzeit](https://developer.salesforce.com/docs/platform/data-models/guide/dro-design-time.html) enthält eigene Objekte für Fallout-Regeln, Jeopardy-Regeln und Zuweisungsregeln für Aufgaben. Das ist also Konfiguration und kein eigener Code.

Typische Ablehnungen aus SAP, als Annahme: Der Warenempfänger ist in SAP noch nicht angelegt, ein Material ist für den Vertrieb gesperrt, oder der Kunde hat eine Kreditsperre. Eine Wiederholung hilft bei keinem davon. Die Queue braucht deshalb eine verantwortliche Person in der Auftragsabwicklung, eine Zielzeit und eine kurze Prüfliste. Die Zuweisung eines Schritts an eine Fallout-Queue versendet keine E-Mail und legt keine Aufgabe an. Dafür brauchen Sie eine eigene Benachrichtigung. Sonst wird Fallout zu einer Liste, die niemand liest, während der Kunde wartet.

## Wann reicht eine einfache Schnittstelle ohne DRO?

DRO lohnt sich, wenn ein Auftrag mehrere voneinander abhängige Abwicklungsschritte in verschiedenen Systemen auslöst. Ein klassischer Maschinenverkauf ist oft einfacher: Der Auftrag geht in einem Stück an SAP, und Produktion, Lieferung und Rechnung passieren dort. Dann reicht ein datensatzgetriggerter Flow oder ein Middleware-Aufruf bei der Aktivierung, mit denselben Regeln für Referenz, Auftragsnummer und Fehlerbehandlung.

Ich würde DRO prüfen, wenn mindestens zwei dieser Punkte zutreffen:

- Eine Auftragsposition erzeugt Arbeit in mehr als einem System, etwa in SAP, im Service und auf einer Überwachungsplattform.
- Schritte hängen voneinander ab, und jemand muss sehen, wo ein Auftrag hängt.
- Zusagen haben Fristen, die pro Schritt überwacht werden sollen.
- Aufträge mischen Einmalprodukte und Abonnements, die unterschiedlich abgewickelt werden.

Prüfen Sie bei großen konfigurierten Aufträgen auch die aktuellen [DRO-Limits](https://help.salesforce.com/s/articleView?id=ind.dro_dynamic_revenue_orchestrator_limits.htm&language=en_US&type=5), die sich für synchrone und asynchrone Übergaben unterscheiden.

Zu den Kosten: Die [Preisseite von Revenue Cloud](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) führt Revenue Cloud Advanced mit 200 Euro pro Nutzer und Monat bei jährlicher Abrechnung auf, Stand 9. November 2026. Das ist der Preis des Basisprodukts, nicht der Preis für DRO. Dynamic Revenue Orchestration ist als separat zukaufbare Option aufgeführt, mit dem Hinweis "Freemium access available".

```hinweis offen
Was dieser Freemium-Zugang umfasst, steht auf der Preisseite nicht. Lassen Sie sich den Umfang schriftlich bestätigen, bevor Ihr Design davon abhängt.
```

## Die fünf häufigsten Auftragsarten skizzieren

Nehmen Sie Ihre fünf häufigsten Auftragsarten und skizzieren Sie für jede, was nach der Unterschrift passiert: welches System und welches Team in welcher Reihenfolge beteiligt sind. Endet jede Skizze mit "den Rest macht SAP", beginnen Sie mit einer einfachen Schnittstelle. Sehen Sie mehrere Systeme und Abhängigkeiten, bilden Sie zuerst eine Auftragsart in DRO ab, samt Callout an SAP und Fallout-Queue, und testen Sie die Ablehnungen vor dem Normalfall. Das Kapitel [Angebot, Vertrag, Auftrag](../../masterclass/revenue-cloud/angebot-vertrag-auftrag/) zeigt, wo dieser Schritt im Gesamtprozess sitzt, und das Schnittstellendesign gehört zu meiner Arbeit bei [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).
