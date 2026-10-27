---
title: "MCP-Zugriffe auf Salesforce: Budgetrisiko ohne Preis"
description: "Warum MCP- und API-Aufrufe von Claude, ChatGPT und anderen KI-Agenten zum Budgetposten werden, was Headless Platform Interactions sind und wie Sie planen."
pubDate: 2026-10-27
lang: de
slug: mcp-zugriffe-salesforce-budgetrisiko
translationKey: headless-platform-interactions-budget
topic: ai
tags: [MCP, Flex Credits, Headless Platform Interactions, Claude, Budget, Maschinenbau]
takeaways:
  - "Salesforce wird jeden erfolgreichen MCP- oder agentischen API-Aufruf eines registrierten externen Agenten als Headless Platform Interaction in Flex Credits abrechnen; die Rate Card vom 31. August 2026 nennt den Satz TBA."
  - "Laut Salesforce Ben läuft die Abrechnung noch nicht, Salesforce kündigt sie 30 Tage vorher an, und Sandboxes, Scratch Orgs und Developer Edition Orgs sind ausgenommen."
  - "Der externe Agent bestimmt, wie viele Aufrufe eine Frage kostet; im Szenario vervierfachen acht statt zwei Aufrufe pro Frage die Rechnung, so stark wie ein höherer Satz."
  - "Wer Claude oder ChatGPT auf Salesforce-Daten nutzt, zahlt doppelt: den KI-Anbieter für Tokens oder Lizenzen und Salesforce für die Interaktionen."
  - "Budgetieren Sie eine Spanne mit drei angenommenen Sätzen, zählen Sie Aufrufe pro Aufgabe in der Sandbox und verhandeln Sie eine Obergrenze, bevor die Abrechnung beginnt."
faq:
  - q: "Was ist eine Headless Platform Interaction bei Salesforce?"
    a: "Das ist der Flex-Credit-Zähler für erfolgreiche Aufrufe, die ein registrierter KI-Agent über MCP oder eine als agentisch eingestufte API an Salesforce richtet. Die Flex Credits Rate Card vom 31. August 2026 führt ihn mit dem Satz TBA."
  - q: "Kosten MCP-Aufrufe auf Salesforce heute schon Geld?"
    a: "Noch nicht. Laut Salesforce Ben wird agentische Nutzung noch nicht gemessen, und Kunden erhalten 30 Tage vor Beginn eine Ankündigung. Die Dokumentation der Hosted MCP Servers sagt aber schon, dass die Nutzung abgerechnet werden kann."
  - q: "Sind unsere bestehenden ERP- und Middleware-Schnittstellen betroffen?"
    a: "Laut Salesforce Ben behalten bestehende API-Integrationen ihre bisherigen Konditionen. Der neue Zähler gilt für Verkehr, den Salesforce als agentisch einstuft und nach der Registrierung eines Agenten getrennt erkennt."
  - q: "Kosten Sandbox-Tests mit Claude oder anderen MCP-Clients Flex Credits?"
    a: "Laut Salesforce Ben wird nur in aktiven Produktions-Orgs gemessen, Sandboxes, Scratch Orgs und Developer Edition Orgs sind ausgenommen. Die Sandbox ist damit der richtige Ort, um vor dem Go-live die Aufrufe pro Aufgabe zu zählen."
  - q: "Decken die Flex Credits der Max Edition die MCP-Nutzung ab?"
    a: "Salesforce sagt, künftige Max-Editionen enthalten ein Kontingent für Headless 360, nennt aber keine Größe. Solange diese Zahl fehlt, würde ich kein MCP-Volumen dagegen planen."
draft: false
---

MCP-Zugriffe auf Salesforce werden zum Budgetrisiko, weil jeder erfolgreiche Aufruf eines externen KI-Agenten wie Claude oder ChatGPT künftig Flex Credits kostet, gezählt als Headless Platform Interactions. Die Flex Credits Rate Card vom 31. August 2026 nennt den Satz „TBA“, und die Abrechnung beginnt erst 30 Tage nach einer Ankündigung. Sie haben also einen Kostenposten, dessen Menge Ihre Nutzer und deren KI-Werkzeuge bestimmen und dessen Preis Salesforce noch nicht festgelegt hat. Ich würde jetzt eine Spanne budgetieren, Aufrufe pro Aufgabe in der Sandbox zählen und eine Obergrenze in den Vertrag bringen.

## Was sind Headless Platform Interactions?

Headless Platform Interactions sind eine neue Verbrauchsart auf der [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) mit Stand 31. August 2026. Die Zeile steht unter Customer 360 Platform, als Multiplikator steht dort „TBA“, und eine Fußnote sagt, dass diese Verbrauchsarten nur für Headless 360 gelten und zu den übrigen Verbrauchsarten hinzukommen. Headless 360 ist Salesforces Name dafür, die Plattform für externe Agenten zu öffnen: laut Developer Blog [mehr als 4.000 APIs, über 60 MCP-Tools und mehr als 220 CLI-Befehle](https://developer.salesforce.com/blogs/2026/05/headless-360-what-it-means-for-developers).

Die Details stehen in einem Salesforce-Hilfeartikel (005360285), den ich nur über den [Bericht von Salesforce Ben vom 24. September 2026](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/) nachvollziehen konnte:

- Jeder erfolgreiche Aufruf eines registrierten Agenten an Salesforce, über MCP oder eine direkte API, die als agentisch eingestuft wird, zählt als eine Headless Platform Interaction.
- Der Verbrauch erscheint im Digital Wallet.
- Agentische Nutzung wird noch nicht gemessen, Kunden erhalten 30 Tage vor Beginn eine Ankündigung.
- Gemessen wird nur in aktiven Produktions-Orgs. Sandboxes, Scratch Orgs und Developer Edition Orgs sind ausgenommen.
- Bestehende API-Integrationen behalten ihre bisherigen Konditionen.

Die [Dokumentation der Hosted MCP Servers](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/hosted-mcp-servers-overview.md) sagt schon heute, die Server seien „intended only for customers with Flex Credits and you may be billed for server usage“. Als Salesforce sie am [29. April 2026 allgemein verfügbar gemacht](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available) hat, für Enterprise Edition und höher, stand in der Ankündigung nichts zu Preisen. Wenn Sie Claude im Frühjahr angebunden und unter „kostenlos“ verbucht haben, hat diese Annahme jetzt ein Ablaufdatum, und das kennt noch niemand.

## Warum werden externe Agenten zum Budgetposten?

Bei einem Agentforce-Agenten legen Sie die Aktionen selbst fest und wissen, dass eine Auftragsstatus-Anfrage etwa zwei Aktionen zu je 20 Credits kostet. Bei einem externen Agenten bestimmen Sie die Zahl der Aufrufe nicht. Salesforce Ben zitiert es deutlich: Der Preis pro Interaktion ist fest, die Zahl der Interaktionen hängt aber vom Verhalten und der Umsetzung des fremden Agenten ab. Claude beantwortet „Welche Aufträge dieses Händlers sind verspätet?“ vielleicht mit einer Abfrage, vielleicht mit einer Suche, fünf Datensatz-Lesezugriffen und zwei Nachfragen, weil die erste Antwort unvollständig war.

Drei Effekte machen das für einen Hersteller zur Budgetfrage:

- **Sie zahlen doppelt.** Der KI-Anbieter berechnet Tokens oder Lizenzen, Salesforce die Interaktionen. Zu diesem Schluss kommt auch Salesforce Ben.
- **Der Pool ist geteilt.** Flex Credits für Interaktionen kommen aus demselben Pool wie Agentforce-Aktionen, Prompts und Data 360. Nicht genutzte Credits [verfallen zum Ende der Bestellung](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), zu viel kaufen kostet also ebenfalls Geld.
- **Das Volumen wächst ohne Projekt.** Sobald einige Key Account Manager Salesforce in Claude nutzen, ziehen Kolleginnen und Kollegen nach. Dafür stellt niemand einen Change Request, das erste Signal ist das Digital Wallet.

Daneben gibt es eine zweite Grenze, die mit Flex Credits nichts zu tun hat. Agenten, die die REST API direkt aufrufen, verbrauchen das [tägliche API-Kontingent der Org](https://developer.salesforce.com/docs/platform/salesforce-app-limits-cheatsheet/guide/salesforce-app-limits-platform-api.html): in der Enterprise Edition 100.000 plus 1.000 pro Salesforce-Lizenz in 24 Stunden, geteilt von allen Aufrufern. Ihre SAP-Schnittstelle und Ihre Middleware nutzen dasselbe Kontingent. Die Grenze ist weich, oberhalb der Schutzgrenze des Systems schlagen Aufrufe aber mit [REQUEST_LIMIT_EXCEEDED](https://developer.salesforce.com/blogs/2024/11/api-limits-and-monitoring-your-api-usage) fehl. Ob Hosted-MCP-Aufrufe dagegen zählen, steht in der Dokumentation, die ich gelesen habe, nicht. Ich würde das klären, bevor es Ihnen ein voller Monatsabschluss zeigt.

## Ein typisches Szenario: Key Account Manager mit Claude

Nehmen wir einen Maschinenbauer mit 60 Key Account und Händlermanagern, die Claude mit Salesforce nutzen. Jede und jeder stellt an 220 Arbeitstagen 15 Fragen am Tag: offene Aufträge eines Händlers, letzte Serviceeinsätze an einer installierten Maschine, Garantiefälle des Quartals. Das sind 198.000 Fragen im Jahr. Alle Zahlen sind Annahmen, und die drei Sätze unten sind hypothetisch, weil Salesforce keinen veröffentlicht hat.

Entscheidend ist die Zahl der Aufrufe pro Frage. Mit den generischen sObject-Tools braucht Claude für eine Antwort oft mehrere Lesezugriffe; angenommen sind acht. Mit einem gezielten Custom Tool, zum Beispiel einem Autolaunched Flow „Auftragsübersicht Händler“, der alles in einer Antwort liefert, sind zwei angenommen. Ein Flex Credit kostet [zum Listenpreis 0,005 $](https://www.salesforce.com/agentforce/pricing/).

| Angenommener Satz pro Interaktion | 2 Aufrufe pro Frage | 8 Aufrufe pro Frage |
|---|---|---|
| 1 Credit | 396.000 Credits, 1.980 $ | 1.584.000 Credits, 7.920 $ |
| 4 Credits | 1.584.000 Credits, 7.920 $ | 6.336.000 Credits, 31.680 $ |
| 20 Credits (wie eine Aktion) | 7.920.000 Credits, 39.600 $ | 31.680.000 Credits, 158.400 $ |

Zwei Dinge fallen auf. Erstens verändert das Tool-Design die Rechnung um den Faktor vier, genauso stark wie der Sprung vom niedrigsten zum mittleren Satz. Zweitens enthält die [Max Edition](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) 2,75 Mio. Flex Credits. In der mittleren Zeile mit generischen Tools würde allein dieses Team den Pool 2,3-mal verbrauchen, bevor eine einzige Agentforce-Aktion oder Data-360-Abfrage läuft. Salesforce kündigt an, dass künftige Max-Editionen „an allocation for Headless 360 capacity“ enthalten, ohne eine Größe zu nennen. Solange diese Zahl fehlt, würde ich nichts dagegen planen.

Die Claude-Lizenzen für die 60 Nutzer kommen dazu. Wie die Alternative im eigenen Haus aussieht, beschreibe ich in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/) und für einen Händleragenten in [was ein Serviceagent für Händleranfragen kostet](../serviceagent-haendleranfragen-kosten/).

## Wie budgetieren Sie einen Zähler ohne Preis?

1. **Laufende Agenten finden.** Fragen Sie, welche Teams Claude, ChatGPT, Copilot oder eigene Skripte an Salesforce angebunden haben. Hosted-MCP-Verkehr erscheint laut den [Security Best Practices](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/security-best-practices.html) in den API-Logs mit Nutzerzuordnung und lässt sich über `API_CLIENT_CATEGORY = SALESFORCE_HOSTED_MCP` filtern.
2. **Aufrufe pro Aufgabe in der Sandbox zählen.** Sandboxes werden nicht gemessen, das kostet also nichts. Nehmen Sie die zehn häufigsten Fragen je Nutzergruppe und protokollieren Sie, wie viele Aufrufe jede braucht.
3. **Gezielte Server pro Rolle bauen.** Salesforces eigene [Hinweise zu Custom Servers](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/custom-servers.html) sagen, dass ein KI-Client ab einigen Dutzend Tools Mühe hat, das richtige zu wählen, und empfehlen einen Server pro Rolle. Ein Flow oder eine Invocable Apex Action, die eine vollständige Händlerübersicht liefert, spart bei jeder Frage Aufrufe. Wer über diese Server was lesen darf, behandle ich in [Hosted MCP Server und Datenzugriff](../salesforce-hosted-mcp-server-datenzugriff/).
4. **Registrierte Agenten vorbereiten.** Salesforce Ben berichtet von einem neuen Agentic-Identity-Modell: Agenten bekommen eigene Zugangsdaten, und Verbindungen müssen auf OAuth-Zugangsdaten dieser Identität umgestellt werden. Heute läuft Hosted MCP als benannter Nutzer. Planen Sie diese Umstellung mit Ihrem Implementierungspartner.
5. **Eine Spanne budgetieren.** Nehmen Sie die drei angenommenen Sätze aus dem Szenario, den mittleren als Plan, den oberen als Risikoreserve.
6. **Vor der Ankündigung verhandeln.** Fragen Sie Ihren Account Executive nach dem Satz, einer Obergrenze oder einem festen Kontingent und ob das Max-Kontingent für Sie gilt. 30 Tage sind für einen Budgetzyklus zu kurz. Salesforce schreibt zu AIforce, [„Pricing and packaging are subject to change“](https://www.salesforce.com/news/stories/aiforce-announcement/), und das gilt in beide Richtungen.
7. **Warnschwellen setzen.** Das Digital Wallet bietet Schwellenwert-Alarme und Aufschlüsselungen, setzt aber [aktiviertes Data 360 voraus](https://www.salesforce.com/agentforce/digital-wallet/). Läuft Ihre Org ohne Data 360, klären Sie jetzt, wie Sie den Verbrauch überhaupt sehen.

## Wo sollten externe Agenten nicht über Salesforce gehen?

Nicht jede Frage gehört auf diesen Weg. Stehen Auftragsstatus, Bestand und Kreditlimits nur in SAP oder proALPHA, fügt ein Agent, der das ERP über Salesforce erreicht, einen bezahlten Zwischenschritt hinzu, ohne Information zu gewinnen. Spiegelt Salesforce die ERP-Daten nur, entscheiden Sie, wo der Agent liest, bevor der Zähler startet. Das ist eine Architekturfrage für [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/), und die kaufmännische Seite, Claude-Lizenzen gegen Agentforce gegen gar nichts, gehört in [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

Massenarbeit würde ich von externen Agenten fernhalten. Eine Claude-Sitzung, die 5.000 Datensätze der installierten Basis auf fehlenden Garantiebeginn prüft, erzeugt Tausende Interaktionen; ein Bericht oder ein Batch-Job erledigt dasselbe kostenlos. MCP passt zum Dialog, nicht zur Datenbereinigung. Die Grundlagen von MCP und die Entscheidungen der IT-Leitung stehen in [MCP für die IT-Leitung](../mcp-salesforce-erklaert-it-leitung/), was AIforce zusätzlich bringt, in [AIforce: Salesforce in Claude und Slack](../aiforce-salesforce-in-claude-und-slack/).

Externe Agenten auf Salesforce-Daten werden pro Aufruf Geld kosten, also messen Sie die Aufrufe und verhandeln Sie den Preis, solange der Zähler noch steht. Wenn Sie eine zweite Meinung zu Ihrer Schätzung möchten, [schreiben Sie mir](#contact).
