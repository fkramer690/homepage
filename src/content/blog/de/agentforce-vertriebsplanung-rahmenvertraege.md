---
title: "Agentforce Vertriebsplanung: was der Agent wirklich kann"
description: "Was die Vorlage Agentforce for Sales Planning mit Sales Agreements und Prognosen macht, was Salesforce offenlässt und welche ERP-Daten zuerst stehen müssen."
pubDate: 2026-10-27
lang: de
slug: agentforce-vertriebsplanung-rahmenvertraege
translationKey: sales-planning-agent-agreements
topic: data
categories: [manufacturing-cloud, ai]
tags: [Agentforce, Manufacturing Cloud, Sales Agreements, Account Forecasting, ERP, Vertriebsplanung]
takeaways:
  - "Laut Salesforce-Hilfe beantwortet der Sales-Planning-Agent Fragen zu Sales Agreements, schreibt Performance-Zusammenfassungen, hilft bei Besuchen und E-Mails und ändert Sales Agreements in Massen."
  - "Die Hilfe dokumentiert drei Subagents: Sales Agreement Management, Sales Agreement Bulk Update und Program Forecasts to Opportunities. Keiner davon arbeitet laut Beschreibung mit Account Forecasts."
  - "Die proaktiven Hinweise auf Abweichungen im Produktionsplan aus der Ankündigung vom August 2025 finden sich in den Hilfeseiten zur Vorlage nicht, soweit ich sehen konnte."
  - "Jede Aussage zur Vertragserfüllung beruht auf Ist-Mengen aus dem ERP. Ohne täglichen Ist-Datenfluss pro Kunde, Produkt und Zeitraum meldet der Agent Rückstände, die es nicht gibt."
  - "Agentforce Manufacturing ist auf Trailhead auch der Produktname. Eine Funktion mit diesem Etikett ist also nicht automatisch ein Agent. Fragen Sie nach Subagent, Aktion und Lizenz."
faq:
  - q: "Was ist Agentforce for Sales Planning?"
    a: "Eine Agentenvorlage für die Manufacturing Cloud. Laut Salesforce-Hilfe beantwortet sie Fragen zu Sales Agreements, erstellt Performance-Zusammenfassungen, unterstützt bei Besuchen und E-Mails, ändert Sales Agreements in Massen und wandelt Programmprognosen in Opportunities um."
  - q: "Welche Lizenz braucht der Sales-Planning-Agent?"
    a: "Die Hilfe nennt Enterprise, Performance oder Unlimited Edition mit dem Add-on Agentforce for Manufacturing oder die Agentforce 1 Manufacturing Edition. Jeder Nutzer braucht das Add-on. Klären Sie mit Ihrem Account-Team, wie das zu den neuen Max-Editionen passt."
  - q: "Arbeitet der Agent auch mit Account Forecasts?"
    a: "Die Hilfeseite zur Vorlage nennt Account Forecasts im Text nicht, und keiner der drei dokumentierten Subagents befasst sich damit. Das Neuberechnen von Prognosen gibt es als Flow-Aktion, die eine eigene Agenten-Aktion aufrufen könnte. Das ist dann Ihre eigene Entwicklung."
  - q: "Woher kommen die Ist-Mengen, die der Agent auswertet?"
    a: "Aus den Ist-Werten in den Zeitplänen der Sales-Agreement-Produkte. Liegen die Aufträge in SAP oder proALPHA, muss eine Schnittstelle sie laden, etwa per Bulk API im Modus Manually using API upload. Ein täglicher Job aktualisiert danach die Sales Agreements."
draft: false
---

Agentforce for Sales Planning ist eine Agentenvorlage für die Vertriebsplanung in der Manufacturing Cloud. Sie beantwortet Fragen zu Sales Agreements (Rahmenverträgen mit Abnahmemengen), schreibt Performance-Zusammenfassungen, hilft bei Kundenbesuchen und ändert Verträge in Massen. So steht es heute in der Salesforce-Hilfe. Zwei Punkte aus der Ankündigung vom August 2025 sind dort dünn: proaktive Hinweise, wenn Produktionsplan und Absatz auseinanderlaufen, und jede Arbeit mit Account Forecasts. Alle Aussagen zur Vertragserfüllung beruhen auf Ist-Mengen aus dem ERP. Für Hersteller kommt der Datenfluss aus SAP oder proALPHA deshalb vor dem Agenten.

## Was macht Agentforce for Sales Planning laut Salesforce?

Salesforce hat Agentforce for Manufacturing am [21. August 2025](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) angekündigt und die Vorlage Sales Planning als „available today“ bezeichnet. Die Ankündigung beschreibt einen Agenten, der Vertrieb und Disposition auf auffällige Abweichungen in Produktionsplänen („build plans“) hinweist, gemessen an geplanten und tatsächlichen Verkäufen. Auf Basis dieser Abweichungen könne er automatisch einen Besuch beim Kunden ansetzen, mit vorgeschlagenen Gesprächspunkten für das Account-Team.

Die [Hilfeseite zur Vorlage](https://help.salesforce.com/s/articleView?id=ind.mfg_gen_ai_agentforce_sales_planning_agent.htm&language=en_US&type=5) ist bescheidener. Der Agent kann laut Hilfe Fragen zu Sales Agreements beantworten, Performance-Zusammenfassungen erstellen und bei verwandten Aufgaben helfen, etwa Besuche ansetzen oder E-Mails entwerfen. Er kann Sales Agreements in Massen ändern und Datensätze anhand verknüpfter Daten aktualisieren. Für Program Based Business, den Bereich der Manufacturing Cloud für Fertigungsprogramme, wandelt er Prognosedatensätze von Programmkomponenten in Opportunities um.

| Thema | Ankündigung, August 2025 | Hilfeseite, Oktober 2026 |
|---|---|---|
| Sales Agreements | nicht genannt | Fragen, Zusammenfassungen, Massenänderungen |
| Abweichungen im Produktionsplan | überwachen und melden | nicht beschrieben |
| Kundenbesuche | automatisch ansetzen, mit Gesprächspunkten | beim Ansetzen helfen, E-Mails entwerfen |
| Account Forecasts | nicht genannt | im Text nicht genannt |
| Programmprognosen | nicht genannt | in Opportunities umwandeln |

Die Hilfeseite nennt drei Subagents: Sales Agreement Management, Sales Agreement Bulk Update und Program Forecasts to Opportunities.

```hinweis offen
Als Lizenz nennt die Hilfeseite Enterprise, Performance oder Unlimited Edition mit dem Add-on Agentforce for Manufacturing oder die Agentforce 1 Manufacturing Edition, und „each user“ braucht das Add-on. Die [Produktseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/) führt die „full suite of Agentforce for Industries“ in den Max-Editionen. Wie beides für Ihren Vertrag zusammenpasst, gehört vor den Piloten auf den Tisch des Account-Teams.
```

## Warum ist „Agentforce Manufacturing“ nicht immer ein Agent?

Trailhead nennt das Produkt selbst inzwischen Agentforce Manufacturing. Der [Trailhead-Überblick](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) listet „Agent-powered sales agreements“ und „Advanced account forecasting“ als Funktionen, direkt neben „Agentforce for sales planning“. Agentforce-Aktionen nennt die Einheit keine.

Dieselbe Namensgebung taucht bei den Prognose-Einstellungen auf. Trailhead schreibt, Agentforce Manufacturing erzeuge zu Beginn jeder Anpassungsperiode automatisch Prognosen für neue Produkte. In [derselben Einheit](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/define-account-forecast-settings) ist das die Neuberechnung der Prognose zum Periodenstart, also eine geplante Berechnung. Ein Subagent oder Prompt kommt darin nicht vor.

Mich stört das Branding nicht. Problematisch wird es, wenn im Hersteller-Workshop „der Agent prognostiziert Ihre neuen Produkte“ im Business Case landet. Meine Frage in solchen Terminen ist immer dieselbe: welcher Subagent, welche Aktion, welche Lizenz, und wo steht das in der Hilfe?

## Wie weit arbeitet der Agent wirklich mit Sales Agreements und Account Forecasts?

Bei Sales Agreements ist die Dokumentation konkret. Der Agent liest sie, fasst sie zusammen und ändert sie in Massen. Die [Hinweise zu Sales Agreements](https://help.salesforce.com/s/articleView?id=sf.mfg_sa_considerations.htm&language=en_US&type=5) stecken den Rahmen ab:

- **Größe.** Ein Sales Agreement fasst höchstens 1.500 Produkte oder Produktkategorien und 72 Zeitpläne.
- **Massenänderung.** Sie verarbeitet höchstens 100.000 gefilterte Zeitpläne über alle gewählten Produkte. Darüber schlägt die gesamte Änderung für alle gewählten Produkte fehl.
- **Zusammenfassung.** Die KI-Zusammenfassung auf der Vertragsseite zeigt nur die drei wichtigsten Produkte und bis zu fünf Zeitpläne pro Produkt.

Ob die Massenänderung des Agenten an dieselbe Grenze stößt und ob seine Zusammenfassung denselben Ausschnitt nutzt, sagt die Hilfe nicht. Beides würde ich mit dem größten Vertrag in der Org testen, bevor sich jemand darauf verlässt.

Zu Account Forecasts schweigt die Dokumentation. Die Seite zur Vorlage nennt sie im Text nicht, und keiner der drei Subagents arbeitet damit. Es gibt [Flow-Aktionen](https://help.salesforce.com/s/articleView?id=sf.admin_manufacturing_standard_invocable_actions.htm&language=en_US&type=5) wie Calculate Advanced Account Forecasts, Recalculate Forecasts Actions und Refresh Actuals Calculation. Eine eigene Agenten-Aktion, die einen dieser Flows aufruft, ist technisch denkbar. Dann ist das aber Ihre Entwicklung, mit Ihren Tests und Ihrem Support, und keine Funktion der Vorlage. Vertriebsziele pro Kunde sind noch einmal eine eigene Funktion, siehe [Account Manager Targets](../account-manager-targets-vertriebsziele/).

Die größte Lücke ist der Abgleich mit dem Produktionsplan aus der Ankündigung. Ich habe keine Beschreibung gefunden, woher der Produktionsplan kommt, in welchem Objekt er liegt oder was einen Hinweis auslöst. So wie ich die Hilfeseite lese, antwortet der Agent, wenn jemand fragt. Die [KI-Seite für die Fertigung](https://www.salesforce.com/manufacturing/artificial-intelligence/) spricht davon, Rahmenverträge, Absatzprognosen und Opportunities „conversationally“ bereitzustellen, und ergänzt, die Funktionen könnten „not reflect actual product details“. Diesen Hinweis nehme ich wörtlich.

## Welcher Ist-Datenfluss aus dem ERP muss zuerst stehen?

Fragt ein Account Manager, welche Verträge im Rückstand sind, vergleicht der Agent Plan- und Ist-Mengen in den Zeitplänen der Sales-Agreement-Produkte. Beim Hersteller liegen die Ist-Mengen im ERP. Fehlen sie oder kommen sie spät, meldet der Agent einen Rückstand mit voller Überzeugung.

Laut [Salesforce-Hilfe zum Import von Ist-Werten](https://help.salesforce.com/s/articleView?id=ind.mfg_sa_actuals_api_external.htm&language=en_US&type=5) stellt der Admin dafür die Ist-Berechnung auf „Manually using API upload“. Eine Schnittstelle schreibt Actual Quantity und Actual Amount per Bulk API oder Data Loader in die Datensätze Sales Agreement Product Schedule, der tägliche Job läuft in der Zeitzone der Org. Wer Werte von Hand korrigiert, braucht die Berechtigung „Edit Actual Quantity of Sales Agreements Products“.

```ablauf
erp: Aufträge im ERP
sf: Product Schedules, Tagesjob, Sales Agreements, Sales-Planning-Agent
Aufträge im ERP --Ist-Mengen--> Product Schedules
Product Schedules --um 1:00 Uhr--> Tagesjob
Tagesjob --aktualisiert--> Sales Agreements
Sales Agreements --Plan und Ist--> Sales-Planning-Agent
```

Welcher Berechnungsmodus passt und warum er sich später schwer ändern lässt, beschreibe ich in [Sales Agreements: fehlende Abnahmemengen erkennen](../sales-agreements-abnahmemengen-erp/). Für den Agenten kommen drei Punkte dazu. Der Datenfluss muss jedes ERP abdecken, das Aufträge für einen Kunden bucht, auch die Tochtergesellschaft auf dem zweiten System. Die Zuordnung von Auftraggeber zu Vertrags-Account braucht einen Verantwortlichen. Und die Antwort des Agenten sollte das Datum des letzten Ladelaufs zeigen, damit ein Rückstand aus einem ausgefallenen Nachtlauf als solcher erkennbar ist.

Wer den Abgleich mit dem Produktionsplan will, braucht auch die Planmengen aus der Produktionsplanung in Salesforce. Account Forecasts brauchen zusätzlich die Auftragshistorie, wie in [Account Forecasting für die Absatzprognose](../account-forecasting-absatzprognose-vertrieb/) beschrieben. Wie ich führende Systeme zwischen ERP und Salesforce aufteile, gehört zu meinen [Schnittstellen zu ERP, Middleware und Telefonie](../../leistungen/salesforce-schnittstellen/).

## Ein typisches Szenario: die Montagsrunde bei einem Kompressorenhersteller

Nehmen wir einen Kompressorenhersteller mit 35 Account Managern und 280 Sales Agreements mit Händlern und OEM-Kunden an, Aufträge in SAP. Alle Zahlen sind Annahmen zur Veranschaulichung.

Eine Account Managerin fragt den Agenten am Montag, welche ihrer Verträge im Quartal mehr als 15 Prozent im Rückstand sind. Der Agent antwortet auf Basis des Laufs von 1:00 Uhr. Zwei Händler tauchen auf. Einer ist echt. Der andere bestellt über eine polnische Tochter, die auf einer eigenen ERP-Instanz läuft und noch nicht angebunden ist. Ohne Ladedatum in der Antwort hätte sie einen Kunden angerufen, der im Plan liegt.

Für den echten Rückstand entwirft der Agent eine E-Mail und einen Besuch mit Gesprächspunkten. Der größte Händlervertrag umfasst angenommene 900 Ersatzteilpositionen über 36 Monatszeitpläne, zusammen 32.400 Zeitpläne. Das liegt innerhalb der Grenzen. Nutzt die Zusammenfassung des Agenten denselben Ausschnitt wie die KI-Zusammenfassung auf der Vertragsseite, spricht sie über drei von 900 Positionen. Für einen Ersatzteilvertrag ist das dünn.

Dann soll eine Preiserhöhung für eine Produktfamilie in 60 Verträge. Die Massenänderung spart einen Nachmittag Klickarbeit, und sie ist eine Schreibaktion auf kaufmännischen Daten. Ich würde sie zuerst in einer Full-Copy-Sandbox laufen lassen und die Liste der Verträge von einem Menschen bestätigen lassen, bevor der Agent schreibt.

## Was würde ich vor dem Einschalten prüfen?

1. **Lizenz.** Add-on pro Nutzer, Agentforce 1 Manufacturing Edition oder eine Max-Edition: schriftlich klären. Der Verbrauch kommt dazu, siehe [Flex Credits und Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).
2. **Ist-Datenfluss.** Live, täglich und für die 20 größten Verträge mit dem ERP abgeglichen.
3. **Grenzen.** Massenänderung und Zusammenfassung mit dem größten Vertrag getestet.
4. **Sprache.** Laut Hilfe ist die Oberfläche nur auf Englisch verfügbar und in anderen Sprachen möglicherweise nicht voll unterstützt. Testen Sie mit deutschen Fragen aus Ihrem Vertrieb.
5. **Schreibrechte.** Massenänderungen nur mit Bestätigung, getestet wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) beschrieben.
6. **Hinweise.** Wer proaktive Hinweise bei Abweichungen im Produktionsplan braucht, plant sie als eigene Entwicklung oder fragt Salesforce nach einer datierten Roadmap.

Ob Agenten überhaupt zu Ihrem Unternehmen passen, behandle ich in [Agentforce für Hersteller: jetzt starten oder warten?](../agentforce-ja-oder-nein-hersteller/), den Überblick über Agenten in der Fertigung im Masterclass-Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/).

Der Sales-Planning-Agent ist ein brauchbarer Assistent auf Sales Agreements, sobald die Ist-Mengen aus dem ERP stimmen, und er kann weniger, als die Ankündigung von 2025 nahelegt. Wenn Sie ihn für Ihren Vertrieb bewerten, [schreiben Sie mir](#contact).
