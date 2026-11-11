---
title: "Manufacturing Cloud und SAP: welche Daten wohin"
description: "Welche Daten zwischen SAP und Manufacturing Cloud fließen, in welche Richtung und wie oft: Ist-Mengen, Aufträge, Gutschriften für Boni und Login-Fristen."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: manufacturing-cloud-sap-integration-datenfluesse
translationKey: manufacturing-cloud-erp-integration
topic: data
categories: [manufacturing-cloud, architecture]
contactBrief: integration
tags: [Manufacturing Cloud, SAP, ERP-Anbindung, MuleSoft, Sales Agreements, Boni]
takeaways:
  - "Lagerbestände liefert SAP als Kennzahl neben der Fehlmenge. Bonusauszahlungen werden in SAP zu Gutschriften, Garantie braucht eine eigene Schnittstelle."
  - "Die Aktion Refresh Actuals Calculation berechnet die Ist-Mengen eines Sales Agreements pro Zeitraum neu, seit API-Version 47.0."
  - "Ein einheitlicher Takt für alle Daten kostet entweder API-Aufrufe oder das Vertrauen der Händler in den Auftragsstatus."
  - "Ab 1. Dezember 2026 brauchen Schnittstellen mit SOAP login() die Berechtigung Use Any API Auth. Mit Summer '27 entfällt login() in API 31.0 bis 64.0."
faq:
  - q: "Welche Daten müssen von SAP in die Manufacturing Cloud fließen?"
    a: "Accounts mit ihrer Hierarchie, Produkte und entweder Aufträge oder Auftragssummen pro Kunde, Produkt und Zeitraum als Ist-Mengen für Sales Agreements. Der Lagerbestand ist als zusätzliche Kennzahl neben der Fehlmenge nützlich."
  - q: "Welche Daten fließen aus der Manufacturing Cloud zurück nach SAP?"
    a: "Freigegebene Bonusauszahlungen, aus denen SAP Gutschriften erzeugt, und freigegebene Garantiebeträge, die die Buchhaltung mit dem Händler abrechnet. Welcher SAP-Beleg daraus entsteht, hängt von Ihrem Garantie- und Buchungsprozess ab. Für Aufträge bleibt SAP das führende System."
  - q: "Brauche ich MuleSoft, um SAP an die Manufacturing Cloud anzubinden?"
    a: "Nein. Der MuleSoft Accelerator for Manufacturing liefert Vorlagen für den Abgleich von Accounts, Produkten und Aufträgen und für Bonus-Gutschriften, und Salesforce bietet MuleSoft als Add-on auf Anfrage an. Eine andere Integrationsplattform kann dieselben Flüsse umsetzen, wenn sie SAP- und Salesforce-APIs, Mapping, Wiederholungen und Monitoring abdeckt."
  - q: "Wie oft sollten Ist-Mengen aus SAP geladen werden?"
    a: "Für Sales Agreements, die sich über Monate erstrecken, reicht ein täglicher Lauf. Den Auftragsstatus, nach dem ein Händler oder ein Agent fragt, sollte man live in SAP abfragen statt ihn zu kopieren."
  - q: "Welche Fristen betreffen ERP-Schnittstellen zu Salesforce?"
    a: "Ab 1. Dezember 2026 braucht jeder Nutzer, der sich per SOAP login() anmeldet, die Berechtigung Use Any API Auth. SOAP login() in den API-Versionen 31.0 bis 64.0 entfällt mit Summer '27, und SOAP-, REST- und Bulk-API in den Versionen 31.0 bis 40.0 funktionieren ab Summer '28 nicht mehr."
draft: false
---

Zwischen SAP und der Manufacturing Cloud fließen Stammdaten und Ist-Mengen nach Salesforce; Zahlungen und Abrechnungsdaten fließen zurück nach SAP. Accounts, Produkte und Aufträge oder Auftragssummen stammen aus SAP, täglich für die Ist-Mengen und live für den Auftragsstatus. Freigegebene Bonusauszahlungen und Garantiebeträge werden an SAP übergeben, wo die Buchhaltung sie abrechnet, Boni als Gutschrift. Der MuleSoft Accelerator for Manufacturing deckt Accounts, Produkte und Aufträge aus SAP S/4HANA sowie Bonus-Gutschriften ab, legt aber keine Sales Agreements an und hat keinen Garantiefluss. Legen Sie vor dem Bau ein führendes System pro Objekt fest und prüfen Sie, ob eine Schnittstelle noch SOAP API login() aufruft, denn dafür gelten ab 1. Dezember 2026 strengere Regeln.

## Welche Daten fließen zwischen SAP und der Manufacturing Cloud?

Salesforce Help nennt das Produkt inzwischen Agentforce Manufacturing (formerly Manufacturing Cloud); ich bleibe beim alten Namen, weil Editionen und Funktionen ihn noch tragen. Die Sales Agreements darin sind auf Daten angewiesen, die das Produkt nicht selbst erzeugt. Ein Sales Agreement, also ein Rahmenvertrag mit Planmengen pro Zeitraum, vergleicht geplante mit tatsächlichen Mengen. Die tatsächlichen Mengen entstehen bei Herstellern in SAP, wo Aufträge angelegt, bestätigt und ausgeliefert werden. Bei Boni und Garantie ist es umgekehrt: Salesforce berechnet oder gibt frei, SAP zahlt.

So würde ich die Datenflüsse bei einem typischen Hersteller mit SAP als ERP aufteilen:

| Daten | Führendes System | Richtung | Takt |
|---|---|---|---|
| Accounts und Account-Hierarchie | SAP | SAP nach Salesforce | täglich, nur Änderungen |
| Produkte und Produkthierarchie | SAP | SAP nach Salesforce | täglich, nur Änderungen |
| Aufträge oder Auftragssummen als Ist-Mengen | SAP | SAP nach Salesforce | täglich |
| Lagerbestand als Kennzahl neben der Fehlmenge | SAP | SAP nach Salesforce | täglich |
| Auftragsstatus für Händler | SAP | Live-Aufruf, keine Kopie | bei Anfrage |
| Freigegebene Bonusauszahlungen | Salesforce | Salesforce nach SAP | bei Freigabe |
| Freigegebene Garantiebeträge | Salesforce | Salesforce nach SAP | bei Freigabe |
| Zahlungsstatus der Gutschriften | SAP | SAP nach Salesforce | nach Zeitplan |

Preise sind mit Winter '27 eine eigene Frage, weil Salesforce jetzt eine eigene Preisfindung für Aufträge anbietet, mit eigenen Add-ons. Darum geht es in [Penny Perfect Pricing: ERP-Preise in Salesforce?](../penny-perfect-pricing-erp-preise/). Den Gesamtzusammenhang, von den Datenflüssen bis zum Rollout, behandelt das Masterclass-Kapitel [ERP, KI und Rollout](../../masterclass/manufacturing-cloud/erp-ki-und-rollout/).

## Was deckt der MuleSoft Accelerator for Manufacturing ab?

Der [MuleSoft Accelerator for Manufacturing](https://docs.mulesoft.com/manufacturing/latest/) liefert vorgefertigte APIs, Implementierungsvorlagen und eine Referenzarchitektur. Das verlinkte Exchange-Asset ist Version 1.4.0 vom 25. Oktober 2023 (geprüft am 9. November 2026); nutzen Sie es als Referenz und prüfen Sie die SAP-APIs gegen Ihre Releases. Der Accelerator nennt drei Anwendungsfälle für die Fertigung: Abgleich von Accounts, Produkten und Aufträgen, Verwaltung von Vertriebsboni und Total Productive Maintenance. Zwei davon betreffen die Manufacturing Cloud.

**Abgleich von Accounts, Produkten und Aufträgen.** Laut der [Beschreibung auf Exchange](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-manufacturing/minor/1.4/pages/qrc-zzh/Use%20case%201%20-%20Account%20and%20product%20and%20order%20sync/) holt er Account-, Produkt- und Auftragsdaten aus SAP S/4HANA in die Manufacturing Cloud, einschließlich Account- und Produkthierarchien. Der Abgleich erfolgt in eine Richtung, SAP ist das führende System, und er arbeitet in Echtzeit oder im Batch. Drei Details sollten Sie lesen, bevor Sie damit planen:

- Ein Auftrag wird nur dann mit einem Sales Agreement verknüpft, wenn das Agreement aktiv ist, der Kunde zum Account des Agreements passt und das Produkt oder seine primäre Kategorie übereinstimmt.
- Unterstützt wird nur ein Produktkatalog.
- Auf SAP-Seite sind ein Communication Arrangement für Produkthierarchien und ein eigenes Kennzeichenfeld im Materialstamm nötig.

**Vertriebsboni.** Laut dem [Anwendungsfall zu Boni](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-manufacturing/minor/1.4/pages/Use%20case%202%20-%20Sales%20rebate%20management/) ist die Manufacturing Cloud das führende System für Bonusauszahlungen. Wird eine Auszahlung freigegeben, erzeugt ein Ereignis in SAP eine Gutschrift im Entwurfsstatus. Die dokumentierte Massenverarbeitung arbeitet anders: Sie holt alle neuen Auszahlungen "irrespective of status" und schickt sie an SAP. Ihre Umsetzung braucht daher einen Statusfilter und einen entsprechenden Test. Ein geplanter Lauf setzt den Status der Auszahlung später auf bezahlt, sobald SAP die Gutschrift bezahlt hat. Kundenaufträge fließen von SAP in die Manufacturing Cloud. Wie Bonusprogramme auf Salesforce-Seite funktionieren, steht in [Rebate Management: Händlerboni ohne Excel](../rebate-management-haendlerboni/).

Was der Accelerator nicht abdeckt: Er legt keine Sales Agreements an und nennt keinen Garantiefluss. Für den freigegebenen Betrag aus einem Garantieanspruch, den ich wie in [Garantieansprüche von Händlern](../garantieansprueche-haendler-salesforce/) beschrieben im ERP als Gutschrift an den Händler buchen würde, ist eine eigene Schnittstelle erforderlich.

Ein Widerspruch, den Sie früh klären sollten: Im Auftragsabgleich fließen Kunden in eine Richtung, mit SAP als Master. Im Anwendungsfall zu Boni werden Kunden in beide Richtungen abgeglichen, und jedes der beiden Systeme kann führend sein. Beides stammt aus demselben Accelerator. Legen Sie eine Regel für Kundenstammdaten fest, bevor Sie beide Vorlagen einsetzen.

Salesforce listet MuleSoft Anypoint Platform auf der [Seite mit den Add-ons der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) mit "Request a quote" und veröffentlicht dort keinen Preis. Ist MuleSoft in Ihrem Unternehmen bereits im Einsatz, sparen die Vorlagen Designzeit. MuleSoft nur für diese Flüsse zu kaufen, lohnt sich aus meiner Sicht selten. Eine andere Integrationsplattform kann dieselben Flüsse umsetzen, wenn sie SAP- und Salesforce-APIs, Mapping, Wiederholungen und Monitoring abdeckt.

## Wie kommen die Ist-Mengen in die Sales Agreements?

Sales Agreements beziehen ihre Ist-Mengen aus Aufträgen in Salesforce, aus einem Upload per API oder aus einer Definition in der Data Processing Engine. Die Einstellung Actuals Calculation Mode legt fest, welcher Weg gilt. Laut [Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.mfg_sa_actuals_reference.htm&language=en_US&type=5) rechnet Salesforce mit dem Modus, der bei der Aktivierung des Agreements gilt; eine Änderung während der aktiven Laufzeit berücksichtigt der automatische Prozess nicht. Die vier Modi und wann welcher passt, beschreibe ich in [Sales Agreements: fehlende Abnahmemengen erkennen](../sales-agreements-abnahmemengen-erp/).

Für die Schnittstelle zählt eine Aktion: [Refresh Actuals Calculation](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_actions_refresh_actuals_calculation.htm). Sie ist seit API-Version 47.0 für Nutzer mit dem Permission Set Manufacturing Sales Agreements verfügbar und berechnet die Ist-Mengen eines Sales Agreements neu. Über zwei Schalter wählen Sie die Zeiträume: nur den aktuellen Zeitraum, den aktuellen und vergangene Zeiträume oder den aktuellen und künftige Zeiträume. Wie viele künftige Zeiträume berücksichtigt werden, legt ein Feld am Sales Agreement fest. Setzt man beide Schalter auf true, schlägt der Aufruf fehl, und laut Dokumentation lässt sich die Aktion nur über ein Datenbank-Rollback rückgängig machen.

Daraus ergibt sich ein sauberes Muster für die Schnittstelle. Wurden verspätete Aufträge oder Korrekturen für einen abgeschlossenen Monat aus SAP übertragen, ruft die Middleware die Aktion für die betroffenen Agreements mit der Einstellung für den aktuellen und die vergangenen Zeiträume auf. Ohne diesen Schritt zeigt das Agreement bis zum nächsten regulären Lauf die Fehlmenge des Vormonats, und Account Manager sprechen Kunden auf Mengen an, die längst abgenommen sind.

## Der Takt folgt der Frage, die die Daten beantworten

Der Takt folgt der Frage, die die Daten beantworten. Sales Agreements erstrecken sich über Monate oder ein Jahr, also reicht ein täglicher Lauf für die Ist-Mengen. Ein Händler, der nach dem Status seines Auftrags fragt, will den aktuellen Stand kennen. Den Auftragsstatus sollte man deshalb live in SAP abfragen, wie in [Agentforce und SAP: Auftragsstatus über MuleSoft](../agentforce-sap-auftragsstatus/). Ein Takt für alles verschwendet entweder API-Aufrufe oder zeigt dort alte Daten, wo es auf aktuelle Daten ankommt.

Das Volumen entscheidet zwischen ganzen Aufträgen und Summen. Ein Rechenbeispiel mit angenommenen Zahlen: 800 Accounts mit Sales Agreements, im Schnitt 40 Produkte pro Agreement und Monatszeiträume. Summen pro Kunde, Produkt und Monat ergeben höchstens 800 × 40 = 32.000 Werte im Monat, und ein täglicher Delta-Lauf überträgt nur die geänderten Werte. Jede Auftragsposition zusätzlich zu replizieren, kostet Datenspeicher und einen Verknüpfungsschritt pro Auftrag. Das lohnt sich nur, wenn Vertrieb oder Service die Aufträge selbst in Salesforce einsehen sollen.

Der Lagerbestand gehört in denselben täglichen Lauf. Eine Fehlmenge ist anders zu bewerten, wenn die Ware auf Lager ist, als wenn sie ohnehin knapp ist.

## Welche Login-Fristen betreffen ERP-Schnittstellen?

Viele ERP-Schnittstellen zu Salesforce wurden vor Jahren mit einem technischen Nutzer und einem Passwort eingerichtet. Laut dem [Developer Guide zu Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) gelten drei Stufen:

```zeitleiste
2026-12-01 | Wer sich über SOAP API login() anmeldet, braucht die Berechtigung Use Any API Auth, sonst schlägt die Anmeldung fehl
Summer '27 | SOAP login() in den API-Versionen 31.0 bis 64.0 entfällt; SOAP-, REST- und Bulk-API 31.0 bis 40.0 erhalten keine Korrekturen mehr
Summer '28 | Aufrufe an SOAP-, REST- und Bulk-API 31.0 bis 40.0 schlagen fehl
```

Salesforce rät im selben Guide, diese Schnittstellen auf OAuth mit External Client Apps umzustellen. Ein Ist-Mengen-Lauf, der unbemerkt ausfällt, ist schlimmer als einer, der eine Fehlermeldung erzeugt, weil der Vertrieb eine alte Fehlmenge sieht und ihm glaubt. Wie Sie alle betroffenen Schnittstellen finden, steht in [Salesforce-Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/).

## Jedes Objekt braucht ein führendes System und eine Person

Für jede Zeile der Tabelle oben brauchen Sie ein führendes System und eine benannte Person; beides sollte vor der Umsetzung schriftlich festgehalten werden. Die [Object Ownership Matrix](../object-ownership-matrix-salesforce/) leistet das für Objekte innerhalb der Org; für eine ERP-Schnittstelle ergänze ich zwei Spalten: Richtung und Takt.

Diese Fragen stellen sich in fast jedem Design:

- **Account-Hierarchie.** Liegt der Auftraggeber aus SAP auf derselben Ebene wie der Account mit dem Sales Agreement? Wenn nicht, ist eine Zuordnungstabelle mit einem Verantwortlichen erforderlich.
- **Produktidentität.** Ist eine verkaufbare Variante in SAP und in Salesforce genau ein Produkt? Der Accelerator verknüpft Aufträge über das Produkt oder die primäre Kategorie mit Agreements.
- **Korrekturen.** Wer stößt die Neuberechnung der Ist-Mengen an, wenn SAP eine Gutschrift oder Retoure für einen vergangenen Zeitraum bucht?
- **Fehler.** Wer erhält die Meldung, wenn der nächtliche Lauf ausfällt, und bis wann muss der Fehler behoben sein?

Wie ich Schnittstellen zwischen ERP, Middleware und Salesforce aufsetze, beschreibe ich unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Tabelle mit Objekten, Richtung und Takt füllen

1. **Füllen Sie die Tabelle** mit Ihren Objekten, führendem System, Richtung und Takt.
2. **Entscheiden Sie, ob Sie Ist-Mengen als Aufträge oder als Summen abbilden**, bevor das erste Sales Agreement live geht.
3. **Prüfen Sie den Accelerator** gegen Ihr SAP-Release und Ihre Katalogstruktur, und klären Sie die Regel für Kundenstammdaten.
4. **Planen Sie die Geldflüsse zurück**: Bonusauszahlungen und Garantiebeträge, jeweils mit einem Status, der an Salesforce zurückgemeldet wird.
5. **Listen Sie jeden Schnittstellennutzer** und seine Anmeldemethode vor dem 1. Dezember 2026 auf.

Die ausgefüllte Tabelle ist in meinen Projekten das erste Dokument, noch vor dem ersten Workshop zu Sales Agreements. Die Manufacturing Cloud verarbeitet das, was SAP liefert, deshalb steht das Schnittstellendesign vor dem Funktionsdesign.
