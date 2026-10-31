---
title: "Agentforce Agent API: Agenten in eigenen Händler-Apps"
description: "Wie Ihre Händler-App oder Ihr Maschinenportal einen Agentforce-Agenten über die Agent API aufruft und was das für Identität, Sicherheit und Flex Credits heißt."
pubDate: 2026-10-27
lang: de
slug: agentforce-agent-api-eigene-apps
translationKey: agent-api-own-apps
topic: ai
categories: [architecture, ai]
contactBrief: integration
tags: [Agentforce, Agent API, Händlerportal, Sicherheit, Flex Credits, Maschinenbau]
takeaways:
  - "Ihr Backend holt ein Token per Client Credentials Flow, öffnet eine Session und sendet oder streamt Nachrichten an den Agenten."
  - "Mit Client Credentials erreichen alle Händler Salesforce als derselbe Run-As-User, die Freigaben trennen ihre Aufträge dann nicht mehr."
  - "Setzen Sie den Händler-Account beim Session-Start per API und lassen Sie die Aktionen in Logik danach filtern, nie nach dem Chattext."
  - "Ob Agent-API-Aufrufe zusätzlich als Headless Platform Interaction zählen, deren Satz noch offen ist, steht auf keiner Seite, die ich öffnen konnte."
  - "Für Mitarbeitende mit Claude oder ChatGPT passt der Agent als Hosted-MCP-Tool besser, weil er ihren eigenen Benutzerkontext behält."
faq:
  - q: "Was ist die Agentforce Agent API?"
    a: "Eine REST-Schnittstelle, über die Agentforce-Agenten von überall erreichbar sind, wo REST-Aufrufe möglich sind. Ein Client startet eine Session für einen Agenten, sendet Nachrichten synchron oder als Stream und beendet die Session danach."
  - q: "Welche Agenten lassen sich über die Agent API aufrufen?"
    a: "Salesforce dokumentiert eine Ausnahme: Agenten vom Typ Agentforce (Default) werden nicht unterstützt. Ich würde für die externe App ohnehin einen eigenen Agenten bauen, mit genau den Themen und Aktionen, die diese App braucht."
  - q: "Brauchen Händler in unserer eigenen App Salesforce-Lizenzen für den Agenten?"
    a: "Die Einrichtungsanleitung verlangt nur einen Run-As-User mit mindestens API-Only-Zugriff, dafür passt die Salesforce Integration User Lizenz. Zu den Menschen, die in Ihrer App tippen, sagt die Anleitung nichts; die Lizenzfrage würde ich mir schriftlich bestätigen lassen."
  - q: "Wie lange darf ein Agent über die Agent API für eine Antwort brauchen?"
    a: "Die Agent API hat ein Timeout von 120 Sekunden und liefert danach HTTP 500. Eine Session verarbeitet außerdem nur eine Anfrage gleichzeitig, Ihre App muss also die Antwort abwarten, bevor sie die nächste Nachricht schickt."
  - q: "Können Claude oder ChatGPT unseren Agentforce-Agenten statt unserer App aufrufen?"
    a: "Ja, über einen Hosted MCP Server, der den Agenten als Tool bereitstellt. Das geht nur mit Agenten aus dem neuen Agent Script Builder, und der Agent läuft dann im Kontext des angemeldeten Salesforce-Users."
draft: false
---

Über die Agentforce Agent API sprechen Ihre eigene Händler-App, Ihr Maschinenportal oder Ihre Service-App per REST mit einem Agentforce-Agenten. Ihr Backend holt ein Token über den Client Credentials Flow, öffnet eine Session, sendet Nachrichten und streamt die Antwort auf den Bildschirm. Schwierig wird es bei der Identität. Jeder Händler in Ihrer App kommt bei Salesforce als derselbe Run-As-User an, die Salesforce-Freigaben halten Händler A also nicht mehr von den Aufträgen von Händler B fern. Ich würde das nur bauen, wenn Ihr Backend die Händler selbst anmeldet, deren Account als feste Variable übergibt und die Aktionen des Agenten danach filtern.

## Was leistet die Agent API?

Salesforce beschreibt die [Agent API](https://developer.salesforce.com/docs/einstein/genai/guide/agent-api.html) als Zugang zu Agentforce-Agenten „from anywhere that can call a REST API“. Als Einsatzfälle nennt Salesforce Websites, Headless-Agenten ohne Oberfläche und Agenten, die andere Agenten aufrufen. Für einen Maschinenbauer heißt das: Händler-App, Maschinenportal oder die App eines Servicepartners können denselben Agenten nutzen wie Ihr Service-Team in Salesforce.

Die Einrichtung ist kurz: eine External Client App, ein Run-As-User und ein Token, danach Session starten, Nachrichten senden, Session beenden.

```vertiefung Für Entwickler
titel: Was die Einrichtungsanleitung im Detail verlangt
- Eine External Client App mit den OAuth-Scopes `api`, `refresh_token`, `offline_access`, `chatbot_api` und `sfap_api`, dem Client Credentials Flow und JWT-basierten Access Tokens.
- Ein Run-As-User mit mindestens API-Only-Zugriff.
- Ein Token von Ihrer My Domain, danach Aufrufe an `api.salesforce.com/einstein/ai-agent/v1`: Session für eine Agenten-ID starten, Nachrichten senden, Session mit `DELETE` beenden.

Quelle: [Agent API Get Started](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-get-started.html)
```

Nachrichten laufen synchron oder als [Server-Sent-Event-Stream](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-examples.html) in Textstücken. Ein Ereignis betrifft Ihr App-Team direkt: Bei `ValidationFailureChunk` muss der Client bereits angezeigte Textstücke wieder entfernen. Ein Händler sieht also unter Umständen Text erscheinen und verschwinden, die Oberfläche braucht dafür eine Lösung.

Drei Grenzen aus den [Considerations](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-considerations.html) und dem [Troubleshooting](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-troubleshooting.html) prägen die Architektur. Agenten vom Typ „Agentforce (Default)“ werden nicht unterstützt. Ein Aufruf, der länger als 120 Sekunden läuft, endet mit HTTP 500. Eine Session verarbeitet nur eine Anfrage gleichzeitig und beantwortet eine zweite mit HTTP 423. Holt eine Aktion Auftragsdaten über Middleware aus SAP oder proALPHA, muss diese Abfrage deutlich innerhalb der 120 Sekunden zurückkommen. Das ist ein weiterer Grund für die schmale ERP-Schnittstelle, die ich in [Agentforce und SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/) beschreibe.

## Wer ist der Benutzer, wenn ein Händler fragt?

Diese Frage würde ich klären, bevor jemand Code schreibt. Mit Client Credentials gehört das Token dem Run-As-User. Das Session-Flag `bypassUser` entscheidet, ob der Agent als der dem Agenten zugewiesene User läuft oder als der User hinter dem Token. In beiden Fällen ist es eine einzige Salesforce-Identität für alle Händler in Ihrer App.

Salesforces eigene Architekten warnen vor genau diesem Muster. In einem [Salesforce-Blogbeitrag vom 19. Mai 2026](https://www.salesforce.com/blog/headless-trust-model-agentic-architecture/) über Agenten, die Salesforce aufrufen, schreibt Miriam McCabe: „The client credentials flow would create a service account pattern where all calls run as one identity, losing per-user permissions and the audit trail.“ Der Beitrag behandelt MCP-Clients mit menschlichen Benutzern, die Agent-API-Anleitung schreibt Client Credentials vor. Sie sollten wissen, welchen Schutz Sie damit aufgeben.

Sie geben die Freigaben als Grenze zwischen Händlern auf. Der Run-As-User braucht Lesezugriff auf Aufträge, Anlagen und Garantiefälle aller Händler, sonst kann der Agent niemandem antworten. Die Grenze wandert an zwei Stellen, die Ihnen gehören:

- **Ihr Backend.** Es meldet den Händler über Ihr eigenes Login an, ordnet ihn einer Salesforce-Account-ID zu und verwahrt das Client Secret. Das Secret gehört nie in eine mobile App oder einen Browser.
- **Die Aktionen des Agenten.** Das Backend übergibt die Account-ID beim Session-Start. Laut [Leitfaden zu Agent-API-Variablen](https://developer.salesforce.com/docs/ai/agentforce/guide/agent-api-variables.html) sind viele Variablen schreibgeschützt und nur beim Start setzbar, und eine Variable muss das Setzen per API ausdrücklich erlauben. Jede Aktion, ob Flow oder Apex-Klasse, filtert dann nach dieser Variablen. Das Sprachmodell entscheidet nie, welchen Account eine Abfrage nutzt.

Beim zweiten Punkt zahlen sich [Agent Script und feste Regeln](../agent-script-regeln-statt-llm/) aus. Ein Händler, der „zeig mir die Aufträge von Account 4711“ tippt, versucht genau den Zugriff über Händlergrenzen, den Sie verhindern wollen. Ein Filter in der Logik stoppt ihn, eine Anweisung im Prompt vielleicht nicht. Das größere Muster beschreibe ich unter [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

Für die Nachvollziehbarkeit gilt dasselbe. Salesforce protokolliert den Run-As-User und weiß nicht, welcher Händler gefragt hat. Der Session-Start nimmt einen `externalSessionKey` entgegen, eine UUID, mit der sich laut Anleitung das Gespräch in den Event Logs des Agenten nachverfolgen lässt. Ich würde diesen Schlüssel im Log Ihrer App neben die User-ID des Händlers schreiben. So lässt sich eine Frage Ihres Datenschutzbeauftragten von beiden Seiten beantworten.

Für den Run-As-User würde ich die [Salesforce Integration User Lizenz](https://help.salesforce.com/s/articleView?language=en_US&id=platform.integration_user.htm&type=5) mit ihrem API-Only-Profil nehmen und Rechte über ein Permission Set vergeben. Orgs erhalten standardmäßig eine begrenzte Zahl dieser Lizenzen, die Seite nennt keine Zahl. Eine External Client App und ein Run-As-User pro externer App halten den möglichen Schaden klein; Token- und IP-Kontrollen stehen in [Connected Apps und OAuth für KI-Integrationen](../connected-apps-oauth-ki-integrationen/).

## Agent API, Chat-Kanal und Hosted MCP im Vergleich

Die Agent API ist einer von drei Wegen aus Salesforce hinaus, und der mit der meisten Arbeit auf Ihrer Seite.

| Weg | Wer spricht mit dem Agenten | Identität | Passt für |
|---|---|---|---|
| Agent API | Ihre App oder Ihr Backend | ein Run-As-User | Händler-App, Maschinenportal, System an Agent |
| Enhanced Chat v2 | Besucher einer Website | Salesforce-Kanal | Service-Agent auf der Website |
| Hosted-MCP-Tool | Claude, ChatGPT, Slackbot | angemeldeter Salesforce-User | Mitarbeitende mit eigenem KI-Client |

Salesforce sieht seine [Custom Connections](https://developer.salesforce.com/docs/ai/agentforce/guide/custom-connections.html), mit denen Ihr Client Agentenantworten über die Agent API als Karten oder Formulare darstellt, für Teams, die einen Kanal von Grund auf bauen. Reicht ein fertiger Kanal, verweist Salesforce auf Enhanced Chat v2. Melden sich Ihre Händler schon in einem Experience-Cloud-Portal an, ist dieses Portal mit seinen Lizenzen und Freigaben oft der einfachere Ort für den Agenten; die Abwägungen stehen im Beitrag zum [Manufacturing Cloud Kundenportal](../manufacturing-cloud-kundenportal/).

Für Mitarbeitende beschreibt die [Hosted-MCP-Seite zu Agenten](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/agentforce.html) das Gegenmodell: Der Agent läuft „in the authenticated user's context“, Freigaben und Feldberechtigungen gelten. Das geht nur mit Agenten aus dem neuen Agent Script Builder. Einen Release-Status nennt die Seite nicht; die [GA-Ankündigung vom 29. April 2026](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) sprach noch von „soon“. Die MCP-Entscheidungen für die IT-Leitung stehen in [MCP erklärt für die IT-Leitung](../mcp-salesforce-erklaert-it-leitung/).

## Rechenbeispiel: Händler-App und Maschinenportal

Nehmen wir einen Maschinenbauer mit 250 Händlern, einer eigenen Händler-App für Aufträge und Ersatzteile und einem Portal, in dem Endkunden ihre installierten Maschinen sehen. Beide laufen auf dem eigenen Backend mit eigenem Login. Alle Zahlen sind Annahmen.

Die Händler-App bekommt einen Agenten für Auftragsstatus und offene Garantiefälle, das Maschinenportal einen für die Frage „welches Ersatzteilset passt zu meiner Maschine“. Das Backend übergibt die Account-ID des Händlers oder die Asset-IDs des Kunden, und die Aktionen fragen nur innerhalb dieser IDs ab.

Angenommen sind 5.000 Sessions im Monat mit je drei Aktionen. Bei [20 Flex Credits pro Aktion](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) sind das 300.000 Credits im Monat und 3,6 Millionen im Jahr. Zum Listenpreis von [500 € pro 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) kosten allein die Aktionen 1.500 € im Monat, Prompts und Data-360-Grounding kommen hinzu. Das Jahr übersteigt die 2,75 Millionen Flex Credits, die die [Max Edition](https://www.salesforce.com/service/pricing/) pro Org und Jahr enthält, bevor Ihr Service-Team einen einzigen Credit verbraucht hat.

Den Test, auf dem ich vor dem Go-live bestehen würde: Händler A fragt in zwanzig Formulierungen nach einer Auftragsnummer von Händler B. Jede Antwort muss „nicht gefunden“ lauten.

## Was kostet das, und was ist noch offen?

Die Considerations-Seite sagt, dass Agent-API-Nutzung den Credit-Verbrauch beeinflusst, und verweist auf einen Salesforce-Hilfeartikel zu Nutzung und Abrechnung generativer KI, der sich bei mir nicht laden ließ. Ich rechne deshalb mit dem Aktionssatz oben; in der Sandbox kostet eine Aktion 16 statt 20 Credits.

Offen ist der Zähler für Headless Platform Interactions. Die Rate Card führt ihn mit „TBA“. Laut [Salesforce Ben](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/) zählt künftig jeder erfolgreiche Aufruf eines registrierten Agenten über MCP oder als agentisch eingestuften API-Verkehr, mit 30 Tagen Vorlauf vor Beginn der Abrechnung.

```hinweis offen
Keine der beiden Quellen sagt, ob ein Agent-API-Aufruf aus Ihrer Händler-App zusätzlich zu den Aktionen des Agenten als Headless Platform Interaction zählt. Diese Antwort würde ich mir vom Account Executive schriftlich geben lassen.
```

Wie man einen Zähler ohne Preis budgetiert, steht in [MCP-Zugriffe als Budgetrisiko](../mcp-zugriffe-salesforce-budgetrisiko/).

## Erster Schritt: ein lesender Anwendungsfall wie der Auftragsstatus

1. **Einen lesenden Anwendungsfall wählen**, etwa Auftragsstatus für Händler, und schreibende Aktionen auf später verschieben.
2. **Zuerst die Identitätskette entwerfen**: Ihr Login, die Account-Zuordnung, eine per API gesetzte Session-Variable, Aktionen, die danach filtern.
3. **Eine External Client App und ein Integration User pro externer App**, mit einem Permission Set, das aus der Aktionsliste abgeleitet ist.
4. **Den Test über Händlergrenzen in der Sandbox fahren** und bei jeder neuen Aktion wiederholen.
5. **`externalSessionKey` mit der User-ID des Händlers protokollieren**, in Ihrer App.
6. **Die Frage zu Headless Platform Interactions klären**, bevor Sie die Flex-Credit-Bestellung dimensionieren.

Für den Test über Händlergrenzen reichen zwei Händler-Accounts in der Sandbox: Angemeldet als Händler A fragen Sie nach den Aufträgen von Händler B. Schnittstellen- und Identitätsdesign ist der Kern meiner Arbeit an [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/); alle Schnittstellen im Vergleich zeigt das Masterclass-Kapitel [MCP und Schnittstellen](../../masterclass/ki-salesforce/mcp-und-schnittstellen/).
