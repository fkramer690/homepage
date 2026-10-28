---
title: "Audit-Trail für KI-Agenten in Salesforce: welche Logs?"
description: "Welche Salesforce-Logs zeigen, was ein Agent oder ein externes KI-Tool mit einem Datensatz tat, welche Lizenzen sie brauchen und wie lange sie Daten halten."
pubDate: 2026-10-27
lang: de
slug: audit-trail-ki-agenten-salesforce
translationKey: audit-trail-ai-agents
topic: security
categories: [architecture, ai]
tags: [Audit-Trail, Event Monitoring, Agentforce, Hosted MCP, Betriebsrat, Fertigung]
takeaways:
  - "Ein Audit-Trail für KI-Agenten in Salesforce besteht aus mehreren Logs: Trust-Layer-Auditdaten, Session Tracing, API-Ereignisprotokolle, Setup Audit Trail, Feldhistorie und die Logs des KI-Anbieters."
  - "Trust-Layer-Audit-Trail und Session Tracing liegen in Data 360 und speichern Prompts, Antworten und Aktionseingaben; die Salesforce-Seiten, die ich gelesen habe, nennen dafür keine Aufbewahrungsdauer."
  - "Aufrufe über Hosted MCP erscheinen mit dem benannten Benutzer in den API-Logs; ohne kostenpflichtiges Event Monitoring werden diese Dateien nur einen Tag aufbewahrt."
  - "Bezahltes Event Monitoring hält Logs standardmäßig 30 Tage und bis zu ein Jahr, aber nie vor Vertragsbeginn; die Entscheidung gehört deshalb vor den Go-live."
  - "Personenbezogene Logs zur Nutzung von Agenten und KI-Tools sind auch Überwachungsdaten; Aufbewahrung, Leserechte und Auswertungen klären Sie mit Datenschutz und Betriebsrat in einer Runde."
faq:
  - q: "Wo speichert Salesforce den Audit-Trail eines Agentforce-Agenten?"
    a: "In Data 360. Laut Salesforce-Hilfe liegen dort die Audit- und Feedbackdaten der generativen KI, darunter der maskierte Prompt, die Antwort des LLM und die unmaskierte Antwort, die der Benutzer gesehen hat. Die Datenerfassung muss im Einstein-Setup eingeschaltet werden."
  - q: "Wie lange bewahrt Salesforce API- und Ereignisprotokolle auf?"
    a: "Ohne Zusatzprodukt erhalten Orgs der Enterprise, Unlimited und Performance Edition wenige Ereignistypen, darunter API Total Usage und Login, mit einem Tag Aufbewahrung. Mit Shield oder dem Event-Monitoring-Add-on sind es standardmäßig 30 Tage, maximal ein Jahr."
  - q: "Kann ich sehen, was Claude über Hosted MCP in Salesforce gelesen hat?"
    a: "Auf der Salesforce-Seite ja. Hosted-MCP-Aufrufe erscheinen in den Standard-API-Logs unter dem benannten Benutzer und lassen sich mit API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP filtern. Was das Modell danach mit den Daten macht, steht in keinem Salesforce-Log."
  - q: "Wie lange reicht der Setup Audit Trail zurück?"
    a: "Laut Objektreferenz von Salesforce enthält der Setup Audit Trail Änderungen im Setup für mindestens die letzten 180 Tage. Für eine längere Historie der Agentenkonfiguration würde ich Agentendefinitionen in einer Versionsverwaltung halten."
  - q: "Verlangt der EU AI Act sechs Monate Agenten-Logs?"
    a: "Artikel 26 verpflichtet Betreiber von Hochrisiko-KI-Systemen, die automatisch erzeugten Logs unter ihrer Kontrolle mindestens sechs Monate aufzubewahren, sofern anderes Recht nichts anderes regelt. Viele Serviceagenten sind nicht hochriskant, ich nehme sechs Monate trotzdem als Richtwert. Keine Rechtsberatung."
draft: false
---

Ein Audit-Trail für KI-Agenten in Salesforce setzt sich aus mindestens fünf Logs zusammen, und keines beantwortet jede Frage allein. Der Audit-Trail des Trust Layers und Session Tracing protokollieren Agentengespräche in Data 360. Zugriffe externer KI-Tools über Hosted MCP landen in den API-Logs, die die kostenlose Stufe von Event Monitoring einen Tag lang aufbewahrt. Der Setup Audit Trail deckt Konfigurationsänderungen für mindestens 180 Tage ab, die Feldhistorie 18 bis 24 Monate. Ich würde vor dem Go-live pro Log festlegen, wer es lesen darf, wie lange es bleibt und wer die Aufbewahrung bezahlt.

## Welche Fragen stellen Revision, Datenschutz und Betriebsrat?

Bei einem Maschinenbauer entstehen sie rund um Garantie, Händler und Kundendienst:

- **Interne Revision oder Kundenaudit:** Wer hat die Anweisungen des Agenten oder die Garantieregel vor der strittigen Entscheidung geändert?
- **Datenschutzbeauftragte:** Welche personenbezogenen Daten von Händlermitarbeitenden, Endkunden und Technikern landen in Prompts und Logs, und wann werden sie gelöscht?
- **Betriebsrat:** Lassen sich diese Logs nutzen, um einzelne Servicemitarbeitende auszuwerten?
- **IT-Leitung:** Welche Datensätze hat ein externes KI-Tool letzte Woche gelesen, und unter welchem Benutzer?

Jede Frage führt zu einem anderen Log, mit eigener Lizenz und eigener Aufbewahrung:

| Log | Beantwortet | Voraussetzung | Aufbewahrung |
|---|---|---|---|
| Trust-Layer-Audit-Trail | Prompt, Antwort, Toxizitätswerte, Feedback | Data 360, Datenerfassung eingeschaltet | Auf den gelesenen Seiten nicht genannt |
| Session Tracing | Subagent, Aktion, Eingabe, Ausgabe, Fehler pro Schritt | Data 360, Tracing eingeschaltet | Nicht genannt; Export-API (Beta) liest die letzten 72 Stunden |
| API-Ereignisprotokolle | Welcher Benutzer las welche Objekte über Hosted MCP oder einen anderen API-Client | Kostenlose Stufe oder Event Monitoring | 1 Tag kostenlos; 30 Tage bis 1 Jahr bezahlt |
| Unique-Query-Ereignisse | Welche SOQL-Abfragen, Filter und Reports liefen | Nicht in der kostenlosen Stufe | Wie Event Monitoring |
| Setup Audit Trail | Wer hat was im Setup geändert | Standard | Mindestens 180 Tage |
| Feldhistorie | Welcher Feldwert sich wann durch wen änderte | Standard; Field Audit Trail als Add-on | 18 bis 24 Monate; Archiv bis zur Löschung |
| Audit-Logs von Claude Enterprise | Anmeldungen, Datei-Uploads, angelegte oder gelöschte Unterhaltungen | Enterprise-Plan | Export umfasst 180 Tage |

## Was protokollieren die Agenten-Logs in Salesforce?

**Der Audit-Trail des Trust Layers.** Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=ai.generative_ai_audit_trail.htm&language=en_US&type=5) enthält er bei aktivem Masking den maskierten Prompt, die Antwort des LLM und "the full unmasked response that was served to the user", also die unmaskierte Antwort an den Benutzer. Gespeichert wird in Data 360, sobald die Datenerfassung eingeschaltet ist; eine Aufbewahrungsdauer nennt die Seite nicht. Was der Trust Layer bei Agenten maskiert, steht in [was der Einstein Trust Layer schützt](../einstein-trust-layer-was-er-schuetzt/).

**Session Tracing.** Mit [Agentforce 3](https://www.salesforce.com/news/press-releases/2025/06/23/agentforce-3-announcement) schrieb Salesforce, Agentforce erfasse "all agent activity in a native, extensible session-tracing data model", gebaut auf OpenTelemetry und für August 2025 als allgemein verfügbar angekündigt. Das [Objekt für Interaktionsschritte](https://developer.salesforce.com/docs/data/data-cloud-dmo-mapping/guide/c360dm-si-aiagentinteractionstepdmo-dmo.html) enthält Schritttyp, Aktionsname, Ein- und Ausgabetext, Fehlermeldung, Benutzer und Zeitstempel. Dieses Log erklärt, warum ein Agent einen Garantieantrag abgelehnt hat: welche Aktion mit welcher Seriennummer lief und was sie zurückgab.

**Agent Platform Tracing.** Ein [Beitrag im Developer-Blog vom Mai 2026](https://developer.salesforce.com/blogs/2026/05/agent-platform-tracing-debug-agentforce-with-trace-trees-soql-and-slack) beschreibt Spans für LLM-Aufrufe, Flows und Apex in Data 360, über dieselbe Trace-ID mit Session Tracing verknüpft, und warnt: "There's no backfill of historical data." Was vor dem Einschalten passiert, ist nicht protokolliert.

```vertiefung Für Entwickler
titel: Wie kommen Agenten-Traces ins SIEM?
Für ein SIEM (das zentrale Log-System der Security) ist die [Session Trace OTel API](https://developer.salesforce.com/docs/ai/agentforce/guide/otel-api.md) in der Beta. Sie liefert Sessions, die in den letzten 72 Stunden begonnen haben, eine Session pro Abfrage; ein natives Push ist "planned".
```

Diese Logs sind selbst ein Speicher personenbezogener Daten: Die Eingabe einer Aktion "Garantie prüfen" enthält Seriennummern, Händlernamen und manchmal den Endkunden. Was die Speicherung an Data-360-Verbrauch kostet, steht auf keiner der Seiten, die ich geöffnet habe.

## Wie verfolgen Sie ein externes KI-Tool über die API-Logs?

Liest Claude, ChatGPT oder Cursor Salesforce-Daten über Hosted MCP, erscheinen die Aktionen laut den [Security Best Practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) "in standard Salesforce API logs with full user attribution". Sie filtern sie mit `API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP`. Die Logs zeigen Operationen, Objekte und Zeitstempel pro Benutzer; das Berechtigungsmodell steht in [Hosted MCP Server und Datenzugriff](../salesforce-hosted-mcp-server-datenzugriff/).

Der Haken ist die Aufbewahrung. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/event_monitoring/event_monitoring_intro) erhalten Orgs der Enterprise, Unlimited und Performance Edition einige Ereignistypen kostenlos, darunter Login, Logout und API Total Usage, mit einem Tag Aufbewahrung. Nach meiner Lesart hat eine Org ohne Add-on, die diese Dateien nicht täglich herunterlädt, gar keine MCP-Historie.

Mit Shield oder dem Event-Monitoring-Add-on bleiben Logs laut [Event-Monitoring-FAQ](https://help.salesforce.com/s/articleView?id=000396295&language=en_US&type=1) standardmäßig 30 Tage und bis zu ein Jahr. Die Angreifer im Fall Salesloft Drift waren [laut The Hacker News](https://thehackernews.com/2025/08/salesloft-oauth-breach-via-drift-ai.html) vom 8. August bis mindestens 18. August 2025 aktiv. Eine Frage an Tag zehn braucht also Logs ab Tag eins. Die Token-Seite dieses Vorfalls beschreibe ich in [Connected Apps und OAuth: Lehren aus Drift](../connected-apps-oauth-ki-integrationen/).

```hinweis achtung
Bezahlte Logs "cannot be retrieved retroactively for periods before the contract start date". Event Monitoring, das Sie erst nach einem Vorfall kaufen, zeigt diesen Vorfall nicht.
```

Die bezahlte Stufe bringt Ereignistypen wie [Unique Query](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile_unique_query_event_elf.htm), das verarbeitete SOQL-Abfragen, Filter-IDs und Report-IDs erfasst. Daran sehen Sie, ob ein KI-Client die Preisvereinbarung eines Händlers abgefragt hat oder die aller Händler.

Die Salesforce-Logs enden dort, wo die Daten Salesforce verlassen. Für Claude gibt es [Audit-Logs von Anthropic](https://support.claude.com/en/articles/9970975-access-audit-logs) nur für Enterprise-Organisationen. Sie erfassen Anmeldungen, Datei-Uploads und angelegte, gelöschte oder umbenannte Unterhaltungen, ohne Chatinhalte, und ein Export umfasst die letzten 180 Tage. Jedem anderen KI-Anbieter würde ich dieselben Fragen stellen: welche Ereignisse, wie lange, welcher Export.

## Welche Logs zeigen, wer den Agenten geändert hat?

Für die Konfiguration enthält der [Setup Audit Trail](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_setupaudittrail.htm) Änderungen im Setup "for at least the last 180 days". Eine Prüfung der Garantieentscheidung vom letzten Jahr findet die Änderung dort nicht mehr. Ich würde Agentendefinitionen in einer Versionsverwaltung halten und über eine Pipeline ausrollen, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) beschrieben, denn eine Repository-Historie läuft nicht ab.

Für Daten deckt die Feldhistorie laut [Field-Audit-Trail-Leitfaden](https://developer.salesforce.com/docs/platform/field-history-retention/guide/field-audit-trail.html) bis zu 20 Felder pro Objekt für 18 bis 24 Monate ab. Field Audit Trail, erhältlich mit Shield oder als eigene Lizenz, erweitert das auf 200 Felder pro Objekt und archiviert die Historie in einem Big Object, bis Sie sie löschen. Schreibt ein Agent unter eigenem Benutzer, zeigt die Feldhistorie auf Garantiestatus und genehmigtem Betrag, welche Änderungen vom Agenten kamen.

## Wie lange sollten Logs aufbewahrt werden?

[Artikel 26 des EU AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26) verpflichtet Betreiber von Hochrisiko-KI-Systemen, die automatisch erzeugten Logs unter ihrer Kontrolle "at least six months" aufzubewahren, sofern anderes Unionsrecht oder nationales Recht nichts anderes vorsieht. Nach meiner Lesart ist ein Serviceagent für Händler in der Regel nicht hochriskant; die Einordnung steht in [EU AI Act: Fristen für Agentforce](../eu-ai-act-fristen-agentforce/). Das ist meine Einschätzung, keine Rechtsberatung.

Sechs Monate nehme ich trotzdem als Richtwert, und die Tabelle zeigt die Lücken: ein Tag für kostenlose API-Logs, standardmäßig 30 Tage für bezahlte und keine genannte Dauer für die Logs in Data 360. Länger heißt allerdings nicht automatisch besser. Logs pro benanntem Benutzer zeigen, wer wann was gefragt hat, und damit sind sie in Deutschland ein Thema für den Betriebsrat, siehe [KI-Coding, Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/).

## Ein typisches Szenario: drei Fragen in einem Quartal

Nehmen wir einen Maschinenbauer mit 90 Händlern, einem Agentforce-Serviceagenten im Händlerportal, der Fragen zum Garantiestatus beantwortet und Anträge anlegt, und 25 Mitarbeitenden im Service-Innendienst, die über Hosted MCP mit Claude Enterprise arbeiten. Event Monitoring ist nicht gekauft. Alle Zahlen sind Annahmen.

**Woche 3, Datenschutz.** Die Datenschutzbeauftragte fragt, wo die Namen von Händlermitarbeitenden landen: im Audit-Trail, der die Antwort unmaskiert speichert, und in den Schrittein- und -ausgaben von Session Tracing. Mangels dokumentierter Aufbewahrung legt das Unternehmen sechs Monate und einen Löschjob fest. Die IT lädt ab sofort die API-Logs täglich ins SIEM.

**Woche 7, Betriebsrat.** Die Betriebsvereinbarung erlaubt monatliche Auswertungen je Abteilung; personenbezogene Auswertungen nur nach einem Sicherheitsvorfall und mit Information an den Betriebsrat.

**Woche 11, eine Händlerbeschwerde.** Ein Händler sagt, ein Wettbewerber kannte seine Nettopreise. Wer hat seine Preisvereinbarung in den letzten 40 Tagen über MCP gelesen? Ohne täglichen Download gäbe es nur die Datei von gestern. Mit ihm liefert der Filter auf `SALESFORCE_HOSTED_MCP` drei Benutzer aus dem Händlermanagement, und die Untersuchung geht weiter.

## Was sollten Sie vor dem Go-live klären?

1. **Auditdatenerfassung und Tracing einschalten**, bevor das erste produktive Gespräch läuft. Nachträglich wird nichts befüllt.
2. **Ein Log-Inventar schreiben**: beantwortete Frage, Verantwortliche, Leserechte, Aufbewahrung, Löschung.
3. **Über die API-Logs entscheiden**: täglicher Export ins SIEM oder bezahltes Event Monitoring. Den Preis fand ich auf keiner geöffneten Seite; fragen Sie Ihren Account Executive.
4. **Die Felder protokollieren, die Agenten schreiben**, etwa Garantiestatus und genehmigten Betrag.
5. **Agentendefinitionen außerhalb des Setups versionieren.**
6. **Betriebsvereinbarung und Löschkonzept des Datenschutzes gemeinsam klären**, denn beide betreffen dieselben Logs.

Ein Log-Inventar mit Verantwortlichen gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Agenten treffen Entscheidungen in Ihrer Org, also brauchen die Logs, die diese Entscheidungen erklären, einen Verantwortlichen und eine Aufbewahrungsdauer, bevor die erste Prüferin fragt. Wenn Sie Ihr Log-Inventar vor dem Go-live eines Agenten durchgehen möchten, [schreiben Sie mir](#contact).
