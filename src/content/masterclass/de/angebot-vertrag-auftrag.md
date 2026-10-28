---
title: "Angebot, Vertrag, Auftrag in Revenue Cloud"
description: "Wie Angebot, Rabattfreigabe, Angebotsagent, Salesforce Contracts, Auftragsorchestrierung und Assets in Revenue Cloud zusammenspielen und wo SAP übernimmt."
lang: de
slug: angebot-vertrag-auftrag
course: revenue-cloud
translationKey: revenue-03
chapter: 3
pubDate: 2026-10-28
short: "Angebot, Vertrag, Auftrag"
summary: "Freigaben, Angebotsagent, Salesforce Contracts, Auftragsorchestrierung und Assets: der Weg vom Angebot bis zur Übergabe an SAP."
takeaways:
  - "In Revenue Cloud läuft jeder Verkauf über ein Angebot und einen Auftrag auf Standardobjekten, auch Nachtrag, Verlängerung und Kündigung. Wer Mengen direkt am Asset ändert, zerstört die Historie."
  - "Rabatt- und Margenfreigaben laufen über Advanced Approvals mit Vorschau, parallelen Freigebenden und Audit Trail; Schwelle und Freigebender kommen aus Regeln, nie aus einem Agenten."
  - "Der Angebotsagent erstellt und ändert Angebote aus normaler Sprache, aber nur so gut wie Katalog, synchronisierte Preise und Konfigurationsregeln in Salesforce dahinter."
  - "Die Übergabe an SAP gehört in einen Callout-Schritt des Dynamic Revenue Orchestrator; geht ein Auftrag in einem Stück an SAP, reicht eine einfache Schnittstelle ohne dieses Add-on."
  - "Revenue Cloud und Field Service arbeiten auf demselben Asset-Objekt; legen Sie vor dem ersten Sprint fest, ob verkaufte Abos und physische Maschinen dieselben Datensätze teilen."
articles: [revenue-cloud-discount-approvals, revenue-cloud-quoting-agent, partner-sales-assistant-dealer-quotes, salesforce-contracts-revenue-cloud, revenue-cloud-order-orchestration-erp, revenue-cloud-installed-base-assets]
faq:
  - q: "Wie wird in Revenue Cloud aus einem Angebot ein Auftrag?"
    a: "Der Vertrieb setzt das Angebot auf Accepted und erzeugt über Create Order einen Auftrag. Mit der Aktivierung wechselt der Auftrag von Draft auf Activated und ist nicht mehr direkt editierbar; ein Flow legt die Assets am Kundenkonto an oder übergibt den Auftrag an den Dynamic Revenue Orchestrator."
  - q: "Wie viele Positionen darf ein Angebot in Revenue Cloud haben?"
    a: "Für Winter '27 nennt Salesforce in den Release Highlights bis zu 15.000 Transaktionspositionen pro Geschäft. Für lange Angebote gibt es Gruppen von Angebotspositionen, Filter, Suche und fixierte Spalten im Transaction Line Editor."
  - q: "Brauche ich den Dynamic Revenue Orchestrator, um Aufträge an SAP zu senden?"
    a: "Nein. Ein datensatzgesteuerter Flow oder ein Middleware-Aufruf bei Aktivierung reicht, wenn der Auftrag in einem Stück an SAP geht. DRO lohnt sich, wenn ein Auftrag Arbeit in mehreren Systemen auslöst, die voneinander abhängt und Fristen hat."
  - q: "Reicht Salesforce Contracts für Kundenverträge?"
    a: "Für Verträge aus dem Vertriebsprozess auf eigenem Papier meist ja: Vorlagen, Klauselbibliothek, Word über Microsoft 365, DocuSign und Pflichtenverfolgung. Verwaltet die Rechtsabteilung auch Einkauf, NDAs und Konzernverträge zentral, bleibt ihr eigenes CLM-Werkzeug."
  - q: "Dürfen Händler und Kunden mit dem Angebotsagenten arbeiten?"
    a: "Mit Winter '27, allgemein verfügbar seit 12. Oktober 2026, hat Salesforce Self-Service-Angebote für Kunden und Angebote für Partner in ihrem Arbeitsbereich angekündigt. Die Lizenzen für externe Nutzer klären Sie gesondert, bevor ein Händler ein Agentenangebot sieht."
draft: false
---

In Revenue Cloud läuft jeder Verkauf über ein Angebot und einen Auftrag auf Standardobjekten: das Erstgeschäft genauso wie Nachtrag, Verlängerung und Kündigung. Rabatte und Margen gibt Advanced Approvals nach festen Regeln frei, ein Angebotsagent kann Angebote aus normaler Sprache vorbereiten, und Salesforce Contracts erzeugt den Vertrag aus dem Angebot. Der aktivierte Auftrag geht an den Dynamic Revenue Orchestrator, der ihn zerlegt und per Callout an SAP übergibt, oder bei einfachen Fällen direkt über eine Schnittstelle. Was verkauft wurde, bleibt als Asset am Kunden. Meine Empfehlung: Legen Sie vor dem Bau fest, wo SAP übernimmt und wem das Asset gehört.

## Wie läuft ein Verkauf vom Angebot bis zum Auftrag?

Revenue Cloud heißt in Help und Developer Guide derzeit Revenue Management, auf Trailhead Agentforce Revenue Management. Den Teil zwischen Angebot und Auftrag nennt Salesforce Transaction Management. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/efficient-sales-with-revenue-cloud/get-started-with-transaction-management) unterstützt es Angebote und Auftragserfassung, „whether it's an initial sale, amendment, or renewal“. Der Weg sieht so aus:

1. Der Vertrieb legt ein Angebot an, wählt Produkte aus dem Katalog, konfiguriert sie und lässt sie bepreisen. Katalog, Konfigurator und Preisprozeduren stehen in [Kapitel 2](../produktkatalog-konfigurator-preise/).
2. Weicht der Preis von der Freigabematrix ab, startet eine Freigabe.
3. Der Kunde bekommt das Angebot, auf Wunsch zusammen mit einem Vertrag aus Salesforce Contracts.
4. Ist das Angebot angenommen, erzeugt der Vertrieb daraus einen Auftrag. Nach dem [Trailhead-Modul zu Aufträgen](https://trailhead.salesforce.com/content/learn/modules/efficient-sales-with-revenue-cloud/create-and-fulfill-orders) setzt er das Angebot auf Accepted und klickt Create Order.
5. Mit der Aktivierung wechselt der Auftrag von Draft auf Activated und lässt sich nicht mehr direkt ändern. Ein Flow legt für jede Auftragsposition ein Asset am Kundenkonto an oder übergibt den Auftrag zuerst an die Orchestrierung.
6. SAP bekommt den Auftrag und übernimmt Lieferung, bestätigte Termine und meist die Rechnung.

Für Architekten ist ein Punkt entscheidend: Es gibt keinen Nebenweg. Eine Mengenänderung, eine Verlängerung oder eine Kündigung ist wieder ein Angebot und wieder ein Auftrag. Das ist mehr Prozess als ein geändertes Feld, hält aber Preise, Freigaben und Historie konsistent.

## Was leistet das Angebot im Transaction Management?

Das Angebot bearbeiten Vertriebsmitarbeiter im Transaction Line Editor, einer Tabelle ähnlich einer Kalkulation. Laut [Trailhead zur Arbeit mit Angeboten](https://trailhead.salesforce.com/content/learn/modules/efficient-sales-with-revenue-cloud/work-with-quotes) gibt es dort Bearbeitung direkt in der Zeile, auch für mehrere Positionen auf einmal, Filter, Suche und fixierte Spalten. Bundles werden aus dem Aktionsmenü der Position konfiguriert. Ein Mouseover auf den Nettopreis zeigt den Preis-Wasserfall, also jede Stufe vom Listenpreis bis zum Endpreis.

Für Hersteller mit langen Stücklisten sind zwei Punkte wichtig. Angebotspositionen lassen sich in Gruppen ordnen, von Hand oder automatisch nach einer Spalte, etwa nach Produktkategorie oder Standort. Und für Winter '27 nennt Salesforce in den [Release Highlights](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-marketing-commerce-revenue-management) bis zu 15.000 Transaktionspositionen pro Geschäft. Ein Ersatzteilangebot für eine ganze Anlage passt damit in ein Angebot.

Gruppen würde ich nach einer Struktur bilden, die der Kunde wiedererkennt: eine Gruppe pro Linie oder pro Werk. Dann lassen sich spätere Nachträge der richtigen Stelle zuordnen, und der Kunde findet im Angebot seine eigene Anlage wieder.

## Wer gibt Rabatte und Margen frei?

Freigaben laufen in Revenue Cloud über Advanced Approvals. Der [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm) beschreibt Aktionen für parallele oder sequenzielle Freigabeketten mit Audit Trail und Business APIs, die die Freigabestufen schon vor dem Absenden zeigen. Diese Vorschau würde ich vom ersten Tag an nutzen, damit niemand ein Angebot absendet und dann rätselt, bei wem es liegt.

Die Freigabematrix halte ich kurz: Rabatt auf den Listenpreis, Marge pro Angebot, Auftragsgröße, abweichende Zahlungsbedingungen. Jeder Auslöser hat genau einen Verantwortlichen für die Schwelle. Für die Marge braucht jede Position Kosten aus dem ERP. Fehlen sie, geben Sie besser nur nach Rabatt und Auftragsgröße frei als nach einem Margenfeld, dem niemand traut. Matrix, Kostenquellen und den Umbau aus CPQ beschreibe ich in [Rabattfreigaben in Revenue Cloud](../../../blog/revenue-cloud-rabattfreigaben/).

Eine Regel gilt auch mit Agenten: Schwelle und Freigebender kommen aus dem Workflow. Ein Agent darf Freigaben einreichen, suchen und zusammenfassen, er entscheidet sie nicht. Warum Geschäftsregeln nicht ins Sprachmodell gehören, steht in [Agent Script: Regeln statt LLM](../../../blog/agent-script-regeln-statt-llm/). Wer von CPQ kommt, plant Freigaben als Neubau, denn das Advanced-Approvals-Paket von CPQ wird nicht übernommen; mehr dazu in [Kapitel 5](../von-cpq-zu-revenue-cloud/).

## Was kann der Angebotsagent heute?

Der Angebotsagent erstellt, ändert und fasst Angebote zusammen. Laut [Trailhead-Quick-Start](https://trailhead.salesforce.com/content/learn/projects/quick-start-build-an-agent-to-create-quotes-fast/build-your-first-agentforce-quoting-agent) hält er sich an Katalog- und Fulfillment-Regeln, bietet also nur gültige Produkte an, bleibt bei Preisen und Rabatten in den Leitplanken des Systems und kann auch Nachträge zu Assets anbieten. Die Arbeit macht der Subagent Quote Management mit Aktionen auf Basis von Flows. Vor dem ersten Angebot steht im Setup „Sync Pricing Data“ in Salesforce Pricing.

Mit Winter '27, laut [Salesforce](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/) allgemein verfügbar seit 12. Oktober 2026, kommen drei Gruppen dazu: Self-Service-Angebote für Kunden, Angebote für Partner in ihrem eigenen Arbeitsbereich und vorbereitete Verlängerungsangebote für Account Executives. Für Hersteller halte ich die Verlängerungen für den nützlichsten Teil, weil Wartungs- und Fernüberwachungsabos jedes Jahr Routinearbeit erzeugen.

Was der Agent nicht kann: Regeln sehen, die in SAP-Variantenkonfiguration, im PLM oder im Kopf eines Anwendungstechnikers liegen. Für konfigurierte Maschinen mit solchen Regeln würde ich ihn noch nicht einsetzen. Was vorher stehen muss und wo er falsch ist, beschreibe ich in [Angebotsagent in Revenue Cloud](../../../blog/revenue-cloud-angebotsagent-agentforce/). Die Kosten laufen über Flex Credits: Die [Agentforce-Preisseite](https://www.salesforce.com/agentforce/pricing/) nennt 500 Dollar je 100.000 Credits und rechnet in ihren Beispielen mit 20 Credits pro Standardaktion. Wie Sie das budgetieren, steht im Kapitel [Kosten und Token](../../ki-salesforce/kosten-und-token/) der KI-Masterclass.

Arbeiten Ihre Händler in Manufacturing Cloud, gibt es dort einen eigenen Agenten, den [AI Partner Sales Assistant](../../../blog/ki-angebote-haendler-partner-sales-assistant/). Zwei Angebotsagenten auf zwei Angebotsmodellen würde ich vermeiden. Wo Agenten in der Fertigung sonst helfen, zeigt das Kapitel [KI-Agenten in der Fertigung](../../ki-salesforce/ki-agenten-in-der-fertigung/). Bestellen Kunden ohnehin selbst, gehört der Warenkorb in den Shop; das behandelt die B2B-Commerce-Masterclass in [Preise, Warenkorb, Checkout](../../b2b-commerce/preise-warenkorb-checkout/).

## Salesforce Contracts oder das CLM der Rechtsabteilung?

Salesforce Contracts ist das Vertragsmanagement von Revenue Cloud. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-contracts-foundations/dive-into-salesforce-contracts-capabilities) entstehen Verträge über APIs direkt aus Opportunities, Angeboten oder Aufträgen. Dazu kommen eine Klauselbibliothek mit freigegebenen Formulierungen, Bearbeitung in Word online über Microsoft 365, DocuSign für die Unterschrift, KI für Klauselvorschläge und das Auslesen von Dokumenten sowie Pflichten nach der Unterschrift, etwa Liefertermine oder Kündigungsfristen.

Die [Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/contracts-pricing/) nennt Salesforce Contracts ab 50 Euro je Nutzer und Monat bei jährlicher Abrechnung, mit dem Hinweis auf Voraussetzungsprodukte. Revenue Cloud Advanced für 200 Euro führt laut [Revenue-Cloud-Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) Contracts & Orders, bei Growth ist Contract Lifecycle Management ein Zusatzkauf.

Meine Linie: Für Kundenverträge aus dem Vertriebsprozess auf eigenem Papier reicht Salesforce Contracts meist. Verwaltet die Rechtsabteilung Einkauf, NDAs und Konzernverträge in einem eigenen Werkzeug, oder kommen die meisten Verträge als Einkaufsbedingungen des Kunden, bleibt dieses Werkzeug, und Salesforce übergibt den unterschriebenen Vertrag. Achten Sie außerdem auf drei Dinge mit dem Namen „Vertrag“: den Vertrag in Salesforce Contracts, das Sales Agreement in Manufacturing Cloud und den Servicevertrag in Field Service. Die Abgrenzung steht in [Salesforce Contracts: Reicht das Vertragsmanagement?](../../../blog/salesforce-contracts-vertragsmanagement/).

## Wie kommt der Auftrag zu SAP?

Der aktivierte Auftrag gelangt nach [Trailhead](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/manage-orders) über einen datensatzgesteuerten Flow zum Dynamic Revenue Orchestrator (DRO). DRO macht zwei Dinge. Die Dekomposition zerlegt die kommerziellen Produkte, die der Kunde kauft, in technische Produkte für nachgelagerte Systeme. Die Orchestrierung führt einen Plan mit [fünf Schritttypen](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/explore-order-orchestration) aus: Auto Task, Callout, Manual Task, Milestone und Pause, gruppiert in Swimlanes pro System und mit Fristen pro Schritt.

Die Übergabe an SAP gehört in einen Callout früh im Plan, weil Produktion, Lieferung und Rechnung davon abhängen. Drei Regeln würde ich festschreiben: Die Salesforce-Auftrags-ID geht als Referenz mit, damit ein erneuter Versuch keinen zweiten SAP-Auftrag anlegt. Die SAP-Auftragsnummer kommt zurück. Und nach der Übergabe führt SAP Lieferung, Termine und Rechnung, Salesforce zeigt sie nur an. Lehnt SAP ab, etwa wegen fehlendem Warenempfänger oder Kreditsperre, wird der Schritt zum Fallout: Er wird so oft wiederholt wie eingestellt und landet dann in einer Queue, die eine Person im Auftragsmanagement abarbeitet.

```ablauf
sf: Aktivierter Auftrag, DRO, Fallout-Queue
erp: SAP-Auftrag, Lieferung und Rechnung
Aktivierter Auftrag --Flow--> DRO
DRO --Callout--> SAP-Auftrag
SAP-Auftrag ..SAP-Nummer zurück..> DRO
DRO ..Ablehnung..> Fallout-Queue
SAP-Auftrag --> Lieferung und Rechnung
```

Geht der Auftrag in einem Stück an SAP und passiert danach in Salesforce nichts mehr, reicht eine einfache Schnittstelle bei Aktivierung. Details und Kriterien stehen in [Auftrag an SAP übergeben](../../../blog/revenue-cloud-auftragsorchestrierung-sap/). Welches System welchen Schritt führt, behandelt [Revenue Cloud und SAP: Wer führt was?](../../../blog/revenue-cloud-sap-quote-to-cash-aufteilung/), und beim Entwurf der Schnittstelle unterstütze ich im Rahmen von [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/).

```hinweis offen
DRO ist laut Preisseite ein Add-on zu Revenue Cloud Advanced mit „Freemium access available“. Was das umfasst, steht dort nicht. Lassen Sie sich den Umfang schriftlich bestätigen, bevor Sie die Orchestrierung einplanen.
```

## Was passiert nach dem Auftrag mit den Assets?

Mit der Aktivierung des Auftrags erscheinen die verkauften Produkte als Assets am Kundenkonto. Jede spätere Änderung läuft laut [Trailhead zu Nachträgen](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments) über ein Nachtragsangebot mit Startmenge, Delta und Endmenge, dann über einen Auftrag. Jede Änderung erzeugt eine Asset Action, und Asset State Periods halten Menge, Betrag und monatlich wiederkehrenden Umsatz je Zeitraum fest. [Verlängerungen](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-renewals-and-cancellations) laufen automatisch mit der Laufzeit des Assets oder mit abweichender Laufzeit, eine Kündigung setzt die Endmenge auf null. Eine SAP-Schnittstelle sollte diese Mengen deshalb nie überschreiben.

Field Service nutzt dasselbe Asset-Objekt, dort als Maschine beim Kunden mit Seriennummer und Baugruppenhierarchie. Revenue Cloud zählt Mengen, Field Service braucht einen Datensatz pro Seriennummer. Für die meisten Maschinenbauer empfehle ich zwei Arten von Assets, das verkaufte und die physische Maschine, mit einer festgelegten Verknüpfung. Beide Modelle mit ihren Risiken vergleiche ich in [Assets in Revenue Cloud: Nachträge und Verlängerungen](../../../blog/revenue-cloud-assets-nachtraege-verlaengerungen/). Wie Field Service Maschinen, Wartung und Teile abbildet, steht im Kapitel [Assets, Wartung und Teile](../../field-service/field-service-assets-wartung-teile/). Wer welches Objekt führt, gehört in eine [Object Ownership Matrix](../../../blog/object-ownership-matrix-salesforce/), bevor zwei Teams Trigger auf Asset gegeneinander bauen.

## Ein typisches Szenario, als Annahme: Ersatzteilpaket und Fernüberwachung

Ein Hersteller von Verpackungsanlagen verkauft einem Bestandskunden auf einem Angebot zwei Dinge: ein Verschleißteilpaket für drei Linien und ein Fernüberwachungsabo für dieselben drei Maschinen, zwölf Monate Laufzeit. Alle Details sind Annahmen.

- **Angebot.** Eine Gruppe pro Linie, darin Teilepaket und Abo. Die Verschleißteile kommen mit Listenpreis aus SAP, das Abo mit Preis aus Salesforce Pricing. Der Rabatt von 18 Prozent liegt über der Schwelle von 15 Prozent und geht an die Vertriebsleitung; die Vorschau zeigt das vor dem Absenden.
- **Vertrag.** Salesforce Contracts erzeugt aus dem Angebot einen Vertrag mit Standardklauseln zur Datennutzung, unterschrieben per DocuSign.
- **Auftrag.** DRO zerlegt den Auftrag in einen SAP-Kundenauftrag für die Teile per Callout und eine Aktivierung der Fernüberwachung als Auto Task. Die Teile laufen danach komplett in SAP.
- **Assets.** Das Abo wird pro Maschine als eigene Position verkauft, mit Menge eins, und mit dem Maschinen-Asset aus Field Service verknüpft. Fällt später eine Maschine weg, kündigt ein Nachtrag genau diese Position.
- **Verlängerung.** Vor Ablauf bereitet der Agent das Verlängerungsangebot vor, der Vertrieb prüft und sendet es.

Die Rechnung für das Abo kann aus SAP oder aus Revenue Cloud Billing kommen. Diese Entscheidung und die wiederkehrende Abrechnung behandelt [Kapitel 4](../abrechnung-und-nutzungsbasierte-preise/), etwa in [Wartungsverträge wiederkehrend abrechnen](../../../blog/wartungsvertraege-wiederkehrend-abrechnen/).

## Was sollten Sie vor dem Bau entscheiden?

Bevor ein Partner das erste Angebotslayout baut, würde ich diese Punkte schriftlich klären:

- **Freigabematrix:** Auslöser, Schwellen, Verantwortliche und die Quelle der Kostendaten.
- **Agent:** welche Angebotsarten er übernimmt und welche beim Innendienst bleiben, und ob Händler über Revenue Cloud oder Manufacturing Cloud anbieten.
- **Vertrag:** welche Verträge in Salesforce Contracts entstehen und welche bei der Rechtsabteilung.
- **Auftrag:** DRO oder einfache Schnittstelle, wer die Fallout-Queue abarbeitet, welche Prüfungen vor der Aktivierung laufen.
- **Assets:** gezählt oder an eine Seriennummer gebunden, und wem das Asset-Objekt gehört.

Alle Kapitel finden Sie auf der [Übersichtsseite](../). Revenue Cloud trägt den Weg vom Angebot zum Auftrag gut, wenn jede Änderung über Angebot und Auftrag läuft und die Übergabe an SAP vorher festgelegt ist. Wenn Sie diese Entscheidungen für Ihr Unternehmen durchgehen möchten, [schreiben Sie mir](#contact).
