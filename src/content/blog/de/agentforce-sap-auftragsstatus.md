---
title: "Agentforce und SAP: Auftragsstatus über MuleSoft"
description: "Wie ein Agentforce-Agent Auftragsstatus und Verfügbarkeit aus SAP S/4HANA über MuleSoft und API Catalog liefert und welche Prüfungen deterministisch bleiben."
pubDate: 2026-10-27
lang: de
slug: agentforce-sap-auftragsstatus
translationKey: agentforce-sap-order-status
topic: ai
categories: [ai, architecture]
tags: [Agentforce, SAP, MuleSoft, Schnittstellen, Maschinenbau, Händlerservice]
takeaways:
  - "Ein Agentforce-Agent liest den Auftragsstatus aus SAP S/4HANA über eine API: Eine in Topic Center freigeschaltete MuleSoft-API, in Exchange veröffentlicht und in den API Catalog synchronisiert, wird zur Agenten-Aktion."
  - "Laut MuleSoft-Dokumentation sind Topic-Instructions nicht deterministisch und sollen keine Geschäftsregeln enthalten; welcher Händler welchen Auftrag sehen darf, regeln API und Code."
  - "Verfügbarkeit kommt aus der Verfügbarkeitsprüfung in SAP; der Agent gibt den bestätigten Termin weiter und schätzt nie selbst aus Bestand oder Wiederbeschaffungszeit."
  - "Eine schmale Agenten-API mit drei Operationen und vorberechneten Feldern wie Gesamtstatus und nächstem bestätigtem Termin liefert stabilere Antworten als generische OData-Services."
  - "Geben Sie dem Agenten eine eigene Client-Anwendung im API Manager, damit ein Rate Limit pro Vertrag einen Agenten in der Schleife stoppt, bevor das Händlerportal langsam wird."
faq:
  - q: "Kann Agentforce den Auftragsstatus aus SAP S/4HANA lesen?"
    a: "Ja, über eine API. Der dokumentierte Weg führt über MuleSoft: Der SAP S/4HANA OData Connector liest die OData-APIs von S/4HANA Cloud oder On-Premise, und die Mule-API wird über Topic Center und API Catalog zur Agenten-Aktion."
  - q: "Brauche ich MuleSoft, um Agentforce an SAP anzubinden?"
    a: "Nein. Eine External-Service-Aktion funktioniert mit jeder REST-API, die eine OpenAPI-Beschreibung und eine Named Credential hat. MuleSoft bringt den SAP-Connector, Governance-Regelsätze und Gateway-Policies wie Rate Limits mit; das lohnt sich vor allem, wenn es schon im Einsatz ist."
  - q: "Welche Prüfungen gehören nicht in das Sprachmodell?"
    a: "Welcher Händler welchen Auftrag sehen darf, die Verfügbarkeitsprüfung und bestätigte Termine, Kredit- und Liefersperren sowie jede schreibende Aktion wie eine Terminänderung. Das läuft in SAP, in der API oder in Agent Script; das Modell versteht die Frage und formuliert die Antwort."
  - q: "Sollte ein Agentforce-Agent MCP statt einer API-Aktion nutzen?"
    a: "Für Agentforce selbst ist die Aktion aus dem API Catalog der dokumentierte Weg. MuleSoft kann dieselbe API zu einem MCP-Server machen, was für externe Agenten wichtig wird. Den aktuellen Status des nativen MCP-Clients von Agentforce würde ich vor einem produktiven Agenten prüfen."
  - q: "Was passiert, wenn SAP nicht erreichbar ist?"
    a: "Die Aktion schlägt fehl. Der Agent muss das sagen und einen Rückruf oder eine Übergabe anbieten, statt aus alten Daten zu antworten, und dieser Fall gehört vor dem Go-live in die Testfälle."
draft: false
---

Ein Agentforce-Agent beantwortet Auftragsstatus und Verfügbarkeit aus SAP S/4HANA, indem er in dem Moment, in dem der Händler fragt, eine API aufruft. Der dokumentierte Weg führt über MuleSoft: Eine Mule-API liest S/4HANA, wird in Topic Center für Agenten-Topics und Aktionen freigeschaltet, in Exchange veröffentlicht und in den API Catalog von Salesforce synchronisiert, wo sie zur Agenten-Aktion wird. Alles mit einer richtigen Antwort bleibt deterministisch: welcher Händler welchen Auftrag sehen darf, die Verfügbarkeitsprüfung, der bestätigte Termin. Das liegt in SAP und in der API. Das Modell versteht die Frage und formuliert die Antwort.

## Wie kommt ein Agentforce-Agent an den Auftragsstatus aus SAP?

Über eine Kette aus fünf Gliedern, und jedes Glied braucht einen Verantwortlichen. Der [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog) beschreibt die Reihenfolge: Topics, Aktionen und Instructions in Topic Center festlegen, während die API entworfen wird, die API bauen, in Anypoint Exchange veröffentlichen und mit dem API Catalog synchronisieren. Danach entstehen Named Credentials und External Services automatisch, und der Agent ruft die API als Aktion auf. Flow und Apex können dieselbe API nutzen.

Für einen Maschinenbauer sieht die Kette so aus:

1. **SAP S/4HANA** hält Kundenaufträge, Einteilungen, Lieferungen und die Verfügbarkeitsprüfung. Der [MuleSoft SAP S/4HANA OData Connector](https://docs.mulesoft.com/sap-s4hana-cloud-connector/latest/) unterstützt die OData-APIs von S/4HANA Cloud und On-Premise, kann Entitäten abfragen, Remote-Funktionen aufrufen und Batch-Requests ausführen. Auf SAP-Seite braucht er einen Kommunikationsbenutzer, der den Kommunikationsvereinbarungen für genau die APIs zugeordnet ist, die Sie freigeben wollen.
2. **Eine Mule-API** macht aus diesen OData-Services wenige Operationen, mit denen ein Agent arbeiten kann.
3. **Topic Center** markiert Operationen in der OpenAPI-Spezifikation als Agenten-Aktionen. Laut [MuleSoft-Dokumentation](https://docs.mulesoft.com/anypoint-code-builder/ai-enabling-api-project-topic-center) werden nur OAS 3.0 und 3.1 unterstützt, und Agenten-Metadaten dürfen nicht in einem per `$ref` definierten Schema stehen.
4. **Der API Catalog** in Salesforce kann laut [MuleSoft](https://docs.mulesoft.com/access-management/enabling-api-catalog) nur APIs aus Exchange synchronisieren, die verwaltete Instanzen haben. Im [Agentforce-Workshop](https://developer.salesforce.com/workshops/agentforce-workshop/mulesoft/3-explore-api-catalog) von Salesforce aktivieren Sie dann die Aktionen und vergeben sie per Permission Set an Benutzer.
5. **Der Agent** bekommt Topic und Aktionen im Agent Builder.

Zwei Voraussetzungen übersieht man leicht: eine vertrauenswürdige Verbindung zwischen der Anypoint-Organisation und einer Salesforce-Org, bei der Agentforce für die Anypoint Platform aktiviert ist, sowie ein aktivierter API Catalog in dieser Org. Liegen MuleSoft- und Salesforce-Vertrag in verschiedenen Abteilungen, klären Sie das vor dem ersten Sprint.

Eine offizielle Referenzarchitektur von Salesforce für Agentforce mit S/4HANA habe ich nicht gefunden, nur dieses allgemeine MuleSoft-Muster. Das Design Ihres Partners ist also die Architektur, und jemand auf Ihrer Seite sollte es prüfen.

Ohne MuleSoft ist eine [External-Service-Aktion](https://developer.salesforce.com/blogs/2025/05/call-third-party-apis-from-an-agent-with-external-service-actions) auf Basis eines OpenAPI-Dokuments und einer Named Credential die Alternative, etwa hinter einer anderen Middleware; Salesforce begrenzt den Upload der Spezifikation auf 10 MB. MuleSoft bringt SAP-Connector, Governance-Regelsätze und Gateway-Policies mit. Läuft es in Ihrem Unternehmen schon, würde ich es nutzen. Es für einen einzigen Agenten zu kaufen, rechnet sich selten. Welche Middleware passt, gehört zu meiner Arbeit an [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Welches API-Design macht den Agenten verlässlich?

Die API für einen Agenten sollte schmaler sein als die API für einen Entwickler. Ein generischer Kundenauftrags-Service liefert weit mehr, als ein Händler braucht, auch interne Werksdaten. Geben Sie einem Modell all das, und es wird darüber reden.

Für einen Händleragenten würde ich drei Operationen entwerfen:

- **Auftragsstatus** zur SAP-Auftragsnummer oder zur Bestellnummer des Händlers: Gesamtstatus, Positionen mit offener Menge, nächster bestätigter Termin, Sendungsnummer nach dem Versand.
- **Liefertermine** pro Position, nur mit bestätigtem Termin und Teillieferungen einzeln aufgeführt.
- **Verfügbarkeit** für Material, Menge und Wunschtermin: ja oder nein plus frühester bestätigter Termin aus der Verfügbarkeitsprüfung in SAP. Keine Bestandszahl, denn Lagerbestände sind kaufmännische Information, die Händler nicht brauchen.

Die MuleSoft-Kennzeichen legen fest, was der Agent mit jedem Feld tun darf. `x-sfdc/agent/action/publishAsAgentAction` macht eine Operation zur Aktion, `isUserInput` markiert, was der Agent beim Händler erfragt, `isDisplayable`, was er anzeigen darf, und `x-sfdc/privacy/isPii` schaltet für eine Operation den PII-Service ein. Der Blog zu External Services ergänzt, dass Beschreibungen von Aktionen und Parametern aus der Spezifikation übernommen werden. Gute Beschreibungen im OpenAPI-Dokument sind Prompt Engineering, einmal erledigt, in einer geprüften Datei.

Berechnen Sie vor, was Händler am häufigsten fragen. „Gesamtstatus“ und „nächster bestätigter Termin“ sollten Felder sein, die die API berechnet, keine Schlüsse, die das Modell aus zehn Einteilungen zieht.

## Was bleibt deterministisch?

Die Topic-Center-Dokumentation von MuleSoft sagt selbst, Instructions seien „nondeterministic, so they shouldn't include sensitive or deterministic business rules“. Diesen Satz würde ich auf die erste Seite jedes Agentendesigns schreiben. Beim Auftragsstatus betrifft er vier Punkte.

**Wer welchen Auftrag sehen darf.** Das ist das größte Risiko. Ein im Portal angemeldeter Händler ist ein Kontakt an einem Account, und der Account trägt die SAP-Auftraggebernummer. Diese Nummer muss aus der Sitzung an die API gehen, per Code gesetzt, nie aus dem Chat. Die API liefert einen Auftrag nur, wenn der Auftraggeber passt, und antwortet sonst „nicht gefunden“, genau wie bei einem Auftrag, den es nicht gibt. Übergibt das Modell Auftragsnummer und Kundennummer, liest Händler A den Auftrag von Händler B, indem er eine Nummer eintippt. Anfragen per E-Mail sind noch schwächer, weil eine Absenderadresse wenig beweist; mehr dazu in [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

**Verfügbarkeit und Termine.** SAP prüft die Verfügbarkeit. Der Agent gibt den bestätigten Termin weiter und schätzt nie selbst aus Bestand oder Wiederbeschaffungszeit. Hat SAP keinen bestätigten Termin, lautet die Antwort „noch nicht bestätigt“.

**Sperren.** Kredit- und Liefersperren sind SAP-Entscheidungen. Ob ein Händler von einer Kreditsperre erfährt oder „bitte wenden Sie sich an Ihren Vertriebsmitarbeiter“ hört, ist eine fachliche Entscheidung, die in die API-Antwort gehört, nicht in den Prompt.

**Schreibende Aktionen.** Einen Liefertermin ändern oder einen Auftrag anlegen ist eine zweite Phase, mit Gates wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/). Im ersten Release würde ich den Agenten nur lesen lassen.

## Ein typisches Szenario: Auftragsstatus für 400 Händler

Nehmen wir einen Maschinenbauer mit S/4HANA On-Premise, 400 Händlern in Europa, einem Händlerportal auf Experience Cloud und MuleSoft, das schon die Auftragsliste im Portal versorgt. Alle Zahlen sind Annahmen.

Angenommen sind 2.000 Auftragsanfragen im Monat mit bis zu drei API-Aufrufen: Auftragsstatus, Liefertermine, Verfügbarkeit einer Ersatzposition. Das sind rund 6.000 Aufrufe im Monat, etwa 300 pro Arbeitstag. SAP merkt davon nichts. Ein Fehler, durch den der Agent die API in einer Schleife aufruft, schon. Die [Rate-Limiting-SLA-Policy](https://docs.mulesoft.com/mule-gateway/policies-included-rate-limiting-sla) von MuleSoft setzt Grenzen pro Client-Anwendung über Verträge im API Manager und antwortet mit HTTP 429, sobald das Kontingent verbraucht ist. Der Agent bekommt deshalb eine eigene Client-Anwendung mit eigenem Limit, angenommen 60 Anfragen pro Minute, getrennt vom Portal. Ein Agent in der Schleife stößt an seine eigene Decke, und die Händler im Portal arbeiten weiter.

Im Szenario bringt die erste Testwoche drei Befunde. Telefonisch erfasste Aufträge haben keine Bestellnummer des Händlers, der Agent muss also auch nach SAP-Auftragsnummer suchen. Manche Händler haben für Tochtergesellschaften mehrere Auftraggebernummern, der Account braucht also eine Zuordnung, die jemand pflegt, dasselbe Problem wie bei [Sales Agreements und Ist-Mengen aus dem ERP](../sales-agreements-abnahmemengen-erp/). Und ein Werk pflegt für Ersatzteile keine bestätigten Termine, für diese Positionen kann der Agent nur „noch nicht bestätigt“ sagen. Das ist ein Datenproblem, und kein Prompt behebt es.

Was ein Gespräch in Flex Credits kostet, rechne ich in [was ein Serviceagent für Händleranfragen kostet](../serviceagent-haendleranfragen-kosten/) durch.

## Live-Aufruf oder Kopie in Salesforce?

Der Agent sollte SAP live aufrufen. Der Händler fragt nach heute, und eine nächtliche Kopie zeigt gestern. Der Preis ist eine Abhängigkeit: Während eines SAP-Wartungsfensters schlägt die Aktion fehl. Der Agent muss das dann sagen und einen Rückruf oder eine Übergabe anbieten, und dieser Fall gehört in die Testfälle, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) beschrieben.

Eine Kopie hat trotzdem ihren Platz, etwa der Fahrzeugbestand, den Techniker im Außendienst offline brauchen, wie in [Ersatzteile zwischen ERP und Field Service](../salesforce-field-service-ersatzteile-erp/). Termine aus einer solchen Kopie würde ich den Agenten nicht als aktuell ausgeben lassen.

MuleSoft kann dieselbe API auch zu einem MCP-Server machen: [Agent Fabric](https://docs.mulesoft.com/general/agent-fabric-overview) beschreibt eine MCP Bridge, die das ohne eigenen Code erledigt und die bestehenden Gateway-Policies behält. Das wird wichtig, wenn externe Agenten wie Claude die API erreichen sollen. Für Agentforce selbst ist die Aktion aus dem API Catalog der dokumentierte Weg. Einen nativen MCP-Client für Agentforce hat Salesforce als [Pilot mit dem Release von Juli 2025](https://developer.salesforce.com/blogs/2025/06/introducing-mcp-support-across-salesforce) angekündigt; dessen aktuellen Status würde ich prüfen, bevor ich einen produktiven Agenten darauf baue. Was MCP für eine IT-Leitung bedeutet, steht in [MCP in Salesforce, erklärt für die IT-Leitung](../mcp-salesforce-erklaert-it-leitung/).

## Wo sollten Sie anfangen?

1. **Die API prüfen.** Gibt es eine Mule-API oder eine andere REST-API für Kundenaufträge, und liefert sie bestätigte Termine pro Position?
2. **Zuerst die Identität klären.** Jeder Händler-Account braucht die richtigen Auftraggebernummern, gepflegt von einer benannten Person.
3. **Die Agenten-API entwerfen**, mit drei Operationen und vorberechneten Feldern, gemeinsam geprüft von Vertrieb und IT.
4. **Getrennte Client-Anwendungen** für Agent und Portal, jede mit eigenem Rate Limit.
5. **Die Fehlerfälle testen:** fremde Auftragsnummer, fehlender bestätigter Termin, SAP offline.

Hat Ihr ERP gar keine API, lesen Sie [altes ERP ohne API](../altes-erp-ohne-api-ki-agenten/); ob der Prozess überhaupt reif für einen Agenten ist, steht in [Agentforce für Hersteller: jetzt starten oder warten](../agentforce-ja-oder-nein-hersteller/).

Ein Agent, der den Auftragsstatus aus SAP liest, ist vor allem ein Schnittstellenprojekt mit einem Sprachmodell obendrauf. Wenn Sie eine zweite Meinung zum API-Design oder zu den Zugriffsregeln möchten, [schreiben Sie mir](#contact).
