---
title: "AIforce: Salesforce in Claude und Slack erklärt"
description: "Was AIforce ist (Salesforce in Claude, Slackforce, Agentforce Coworker), was hinter SIForce steckt und was die IT-Leitung eines Herstellers jetzt tun sollte."
pubDate: 2026-10-27
lang: de
slug: aiforce-salesforce-in-claude-und-slack
translationKey: aiforce-salesforce-in-claude-slack
topic: ai
categories: [ai]
tags: [AIforce, Claude, Slack, Agentforce Coworker, MCP, Maschinenbau]
takeaways:
  - "AIforce, vorgestellt am 15. September 2026, macht Salesforce-Daten und Workflows aus Claude, Slack und Lightning nutzbar, über Salesforce in Claude, Slackforce, Agentforce Coworker und das Headless Toolkit."
  - "Die Umbenennung in SIForce beruht auf einem Post von Marc Benioff auf X vom 9. Oktober 2026, belegt nur durch Sekundärquellen; eine Pressemitteilung gibt es nicht, Unterlagen sollten beim Namen AIforce bleiben."
  - "Salesforce in Claude ist eine Beta mit 37 Vertriebs-Skills; Skills für Service, Marketing und Branchen sind nur angekündigt, Aftersales und Außendienst können also noch nichts testen."
  - "Jede AIforce-Anfrage läuft mit den eigenen Salesforce-Berechtigungen des Nutzers; zu weit gefasste Freigaben von heute werden morgen in einem Chatfenster sichtbar."
  - "Laut Salesforce können sich Preise und Pakete noch ändern, und der Flex-Credit-Satz für agentische API- und MCP-Aufrufe steht weiter auf TBA; budgetieren Sie einen Piloten, keinen Rollout."
faq:
  - q: "Was ist AIforce bei Salesforce?"
    a: "AIforce ist eine Interface-Schicht, die Salesforce zur Dreamforce am 15. September 2026 angekündigt hat. Sie macht Salesforce-Daten, Workflows und Berechtigungen aus Claude, Slack und der Lightning-Oberfläche nutzbar. Bestandteile sind Salesforce in Claude, Slackforce, Agentforce Coworker und das Headless Toolkit."
  - q: "Heißt AIforce jetzt SIForce?"
    a: "Marc Benioff hat am 9. Oktober 2026 auf X geschrieben, AIforce heiße offiziell SIForce. Salesforce Ben und andere Medien haben darüber berichtet, eine Pressemitteilung von Salesforce gab es aber nicht, und bis zum 27. Oktober 2026 habe ich kein Salesforce-Dokument mit dem Namen SIForce gefunden."
  - q: "Was brauche ich für Salesforce in Claude?"
    a: "Laut Anthropics Einrichtungsanleitung: einen bezahlten Claude-Plan, die Freigabe über Salesforces Beta-Anmeldung und Zugang zur aktuellen Sales Cloud Enterprise Edition. Ein Salesforce-Admin aktiviert den MCP-Server und stellt eine External Client App bereit, ein Claude-Owner richtet den Connector ein."
  - q: "Brauchen wir Slack, um AIforce zu nutzen?"
    a: "Nein. Salesforce in Claude und Agentforce Coworker funktionieren ohne Slack. Slackforce ist nur relevant, wenn Ihr Unternehmen schon in Slack arbeitet; in einem Teams-Unternehmen würde ich Slack dafür nicht kaufen."
  - q: "Braucht Agentforce Coworker Data 360?"
    a: "Ja. Die Einrichtungsdokumentation nennt Data Cloud oder Data 360 als Voraussetzung für nutzungsbasierten und sitzbasierten Zugang, dazu Enterprise, Unlimited oder Agentforce 1 Edition."
draft: false
---

AIforce ist die Schicht, die Salesforce zur Dreamforce am 15. September 2026 vorgestellt hat, damit Daten, Workflows und Berechtigungen aus Claude, Slack und der Lightning-Oberfläche nutzbar werden. Für die IT-Leitung eines Herstellers sieht der ehrliche Stand so aus: Salesforce in Claude ist eine Beta für den Vertrieb, Agentforce Coworker braucht Data 360, und die Umbenennung in SIForce ist bisher ein Post des CEO auf X. Einen Rollout würde ich jetzt nicht planen. Ich würde Berechtigungen aufräumen, pro Nutzergruppe eine Oberfläche festlegen und einen kleinen Piloten im Vertrieb starten.

## Was ist AIforce?

Salesforce nennt AIforce „a live interface layer that brings the full power of Salesforce to wherever people and agents work“ ([Ankündigung vom 15. September 2026](https://www.salesforce.com/news/stories/aiforce-announcement/)). Einfach gesagt: Nutzer stellen Fragen, ändern Datensätze und starten Workflows aus einem anderen Werkzeug heraus, ohne Salesforce zu öffnen. Im Architekturbild von Salesforce liegt AIforce über Data 360, Customer 360 und Agentforce. Es besteht aus vier Teilen:

- **Claudeforce bzw. Salesforce in Claude.** Ein vorkonfigurierter MCP-Server in Claude mit 37 Vertriebs-Skills, dazu ein Salesforce-Development-Plugin für Claude Code mit mehr als 40 Skills. MCP (Model Context Protocol) ist der offene Standard, über den ein KI-Werkzeug Funktionen in einem anderen System aufruft; ich erkläre ihn in [MCP für die IT-Leitung](../mcp-salesforce-erklaert-it-leitung/).
- **Slackforce.** Slackforce Surfaces für Live-Oberflächen in Slack, Slackbot als persönlicher Assistent über Slack- und Salesforce-Daten, Slack CRM und Slack Code.
- **Agentforce Coworker.** Ein KI-Teammitglied in Lightning, das Accounts, Aktivitäten und Historie auswertet und die Agentforce-Agenten aufruft, die Sie schon im Einsatz haben.
- **Headless Toolkit.** MCPs, APIs, Plugins und Skills, die die Plattform für eigene KI-Werkzeuge öffnen.

Zwei Richtungen werden leicht verwechselt. In der [Claudeforce-Meldung vom 27. August 2026](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) nennt Salesforce Claude als Reasoning-Modell der Atlas Reasoning Engine und als Standardmodell für Agentforce Coworker und Slackbot; über Amazon Bedrock sei Claude innerhalb der Salesforce Trust Boundary verfügbar. Das ist Claude in Salesforce. Salesforce in Claude ist die Gegenrichtung: Ihre CRM-Daten gehen in die Claude-App, die Ihre Mitarbeitenden nutzen. Für den Datenschutz sind das zwei verschiedene Fälle.

## Heißt AIforce jetzt SIForce?

Offiziell noch nicht. Am 9. Oktober 2026 hat Marc Benioff auf X geschrieben: „The era of Super Intelligence is here. AIForce is officially SIForce.“ Das kann ich nur über Sekundärquellen bestätigen. [Salesforce Ben berichtete am 12. Oktober](https://www.salesforceben.com/salesforce-renames-aiforce-to-siforce-after-trump-order/), es gebe offenbar keine offizielle Ankündigung von Salesforce, und man habe Salesforce um eine Stellungnahme gebeten. Bis heute habe ich keine Pressemitteilung und keinen Hilfeartikel von Salesforce gefunden, der SIForce verwendet.

Hintergrund ist eine US-Executive-Order vom 29. September 2026, [„Inaugurating The Era of Super Intelligence“](https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/). Sie verpflichtet die Ministerien und Behörden der Exekutive, in eigenen Dokumenten „Super Intelligence“ statt „Artificial Intelligence“ zu schreiben. Private Unternehmen kommen darin nicht vor; Salesforce musste also nichts umbenennen. Salesforce Ben zählt SIForce als dritten Namen für diese Schicht in gut sechs Monaten, nach Headless 360 zur TDX im April und AIforce zur Dreamforce.

In Ihren eigenen Unterlagen würde ich „AIforce“ schreiben und einmal „(vom CEO als SIForce angekündigt)“ ergänzen. In Bestellformularen und Verträgen steht der Name, den Salesforce dort druckt, und der zählt.
```zeitleiste
2026-04-29 | Hosted MCP Server allgemein verfügbar
2026-08-27 | Claudeforce: Claude wird Standardmodell für Coworker und Slackbot
2026-09-15 | AIforce zur Dreamforce vorgestellt
2026-09-29 | US-Executive-Order „Super Intelligence“ für Behörden
2026-10-09 | Marc Benioff auf X: AIforce heißt SIForce
2026-10-12 | Salesforce Ben findet keine offizielle Ankündigung
```

## Was ist heute tatsächlich verfügbar?

Die Ankündigungen sind größer als das, was sich einschalten lässt. Stand 27. Oktober 2026:

- **Salesforce in Claude** ist eine Beta. Laut [Anthropics Einrichtungsanleitung](https://support.claude.com/en/articles/16952184-set-up-salesforce-in-claude-for-your-organization) läuft es auf bezahlten Claude-Plänen für Organisationen, die Salesforce über die Beta-Anmeldung freigibt, setzt die aktuelle Sales Cloud Enterprise Edition voraus und funktioniert im Chat und in Claude Cowork im Web und auf dem Desktop. Claude handelt als eigenes Salesforce-Konto des Nutzers und fragt standardmäßig vor jeder Änderung nach Freigabe.
- **Agentforce Coworker** ist laut Ankündigung „instantly available“. Salesforces eigener [Coworker-Blog](https://www.salesforce.com/blog/agentforce-coworker-salesforce-ai-teammate/) schreibt sowohl „Generally Available“ als auch „in beta“ und nennt Microsoft Teams, ChatGPT, Claude und eine Desktop-App als „coming later this year“. Die [Einrichtungsdokumentation](https://developer.salesforce.com/docs/data/agentforce-coworker/guide/agentforce-coworker-turn-on-infrastructure.html) verlangt Enterprise, Unlimited oder Agentforce 1 Edition sowie Data Cloud oder Data 360.
- **Slackforce** steht im [Dreamforce-2026-Überblick](https://www.salesforce.com/blog/dreamforce-2026-announcements/) als GA im Oktober; eine eigene Release-Meldung dazu habe ich nicht gefunden. Slackbot-Aktionen haben bereits feste Preise in Flex Credits, je Slack-Workspace, laut [Rate Card vom 31. August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf).
- **Hosted MCP Server**, über die externe KI-Werkzeuge wie Claude auf eine Org zugreifen, sind [seit dem 29. April 2026 allgemein verfügbar](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available), ab Enterprise Edition. Die aktuelle Dokumentation ergänzt, dass sie für Kunden mit Flex Credits gedacht sind und die Nutzung berechnet werden kann. Wer darüber was lesen darf, behandle ich in [Hosted MCP Server und Datenzugriff](../salesforce-hosted-mcp-server-datenzugriff/).

```kennzahlen
37 | Vertriebs-Skills in Salesforce in Claude (Beta)
40 Flex Credits | je Standard-Aktion in Slackbot
200 Flex Credits | je Advanced-Aktion in Slackbot
quelle: Anthropic zu Salesforce in Claude; Salesforce Flex Credits Rate Card vom 31.08.2026
```

Zu den Kosten sagt die Ankündigung: „Pricing and packaging are subject to change.“ Die Rate Card führt Headless Platform Interactions, den Zähler für agentische API- und MCP-Aufrufe, als „TBA“. Warum daraus ein Budgetposten wird, steht in [MCP-Zugriffe als Budgetrisiko](../mcp-zugriffe-salesforce-budgetrisiko/).

## Was bedeutet AIforce für einen Hersteller?

Im Moment hilft AIforce dem Vertrieb mehr als dem Service. Laut [Anthropic](https://claude.com/blog/salesforce-in-claude) decken die 37 Skills Account-Recherche, Gesprächsvorbereitung, Pipeline-Review und CRM-Pflege ab. Das passt zu Key Account Managern und Händlerbetreuern, die Besuche vorbereiten und Opportunities pflegen. Skills für Service, Marketing, Commerce und Branchen nennt die Ankündigung von Salesforce erst für „the near future“. Aftersales und Außendienst (Field Service) haben also noch nichts zu testen.

Der zweite Punkt ist das ERP. Salesforce in Claude liest Salesforce. Stehen Auftragsstatus, Liefertermine und Bestände nur in SAP oder proALPHA, bekommt ein Vertriebsmitarbeiter auf die Frage „Welche Aufträge dieses Händlers sind verspätet?“ eine Antwort auf unvollständiger Datenbasis, vorgetragen mit voller Überzeugung. Welche ERP-Daten nach Salesforce gehören oder hinter eine API, die der Agent aufrufen kann, muss geklärt sein, bevor jemand ein Chatfenster öffnet.

Der dritte Punkt ist das Kollaborationswerkzeug. Viele Maschinenbauer arbeiten in Microsoft Teams. Dort bringt Slackforce nichts, und für Coworker in Teams sagt Salesforce nur „later this year“. Slack würde ich nicht kaufen, um eine KI-Oberfläche zu bekommen.

Der vierte Punkt sind die Berechtigungen. „Every transaction runs as the authenticated user“, schreibt Salesforce zu Hosted MCP. Das ist richtig, und genau darin liegt das Risiko. Sehen Ihre Vertriebsmitarbeitenden alle Cases, Garantieanträge und Händler-Preisvereinbarungen, weil die Freigaben vor Jahren zu großzügig gesetzt wurden, zeigt ein Chat das in Sekunden statt nach zehn Klicks.

## Ein typisches Szenario: ein Maschinenbauer mit Teams und SAP

Nehmen wir einen Maschinenbauer mit 80 Sales-Cloud-Nutzern in Vertrieb und Händlerbetreuung, Service Cloud im Aftersales, SAP als ERP und Microsoft Teams für die Zusammenarbeit. Alle Zahlen und Umstände sind Annahmen. Einige Vertriebsmitarbeitende kopieren schon heute Account-Daten in private KI-Werkzeuge.

Die IT-Leitung sortiert die vier AIforce-Teile:

- **Salesforce in Claude:** Pilotkandidat für zehn Key Account Manager, sofern die Edition für die Beta qualifiziert und das Unternehmen einen bezahlten Claude-Plan kauft. Vor dem Piloten wird das Freigabemodell für Cases und Preisvereinbarungen geprüft, und die Freigabe vor jedem Schreibvorgang bleibt eingeschaltet.
- **Agentforce Coworker:** wartet. Das Unternehmen hat keine Data-360-Lizenz, und Teams ist erst angekündigt.
- **Slackforce:** nicht relevant, das Unternehmen arbeitet in Teams.
- **Headless Toolkit:** relevant für die IT und den Implementierungspartner, denn Hosted MCP Server und das Claude-Code-Plugin sind der Entwicklerpfad. Was Partner damit dürfen, gehört in den Vertrag.

Heraus kommen ein kleiner Pilot im Vertrieb und eine Woche Aufräumen bei den Berechtigungen. Nach meiner Einschätzung ist das die richtige Größe für eine Beta, deren Preise Salesforce noch nicht festgelegt hat.

## Was sollte die IT-Leitung jetzt tun?

1. **Die Schattennutzung finden.** Fragen Sie, welche Teams schon Salesforce-Daten in Claude, ChatGPT oder Copilot kopieren. Ein gesteuerter Connector mit den eigenen Berechtigungen des Nutzers ist besser als Copy and Paste.
2. **Pro Nutzergruppe eine Oberfläche festlegen.** Zum Beispiel Lightning für den Innendienst im Service, Claude für Key Account Manager, Teams für alle anderen. Fünf parallele KI-Oberflächen bedeuten fünf Supportthemen.
3. **Freigaben und Feldberechtigungen prüfen** für Cases, Garantieanträge, Preisvereinbarungen und Händler-Accounts, bevor ein Chatwerkzeug sie liest.
4. **Den Claude-Vertrag lesen.** Salesforce verspricht, dass der Modellanbieter Geschäftsdaten nicht speichert („not retained by the model provider“). Prüfen Sie Auftragsverarbeitung, Trainingseinstellungen und Hosting-Region in Ihrem eigenen Vertrag mit Anthropic, denn dorthin gehen die Daten.
5. **Einen Piloten budgetieren.** Die Preise können sich ändern, der MCP-Satz ist offen. Ob sich Data 360 für Coworker lohnt oder Claude-Plätze für den Vertrieb, ist eine Frage für [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).
6. **In der Dokumentation beim Namen AIforce bleiben**, bis Salesforce SIForce schriftlich bestätigt.

Ob Sie eigene Agentforce-Agenten bauen, ist eine eigene Entscheidung; dazu mehr in [Agentforce für Hersteller: jetzt starten oder warten?](../agentforce-ja-oder-nein-hersteller/).

AIforce bringt Salesforce in die Werkzeuge, die Ihre Leute ohnehin nutzen, und die Arbeit der IT bleibt dieselbe: erst Berechtigungen, Daten und Verträge. Wenn Sie eine zweite Meinung möchten, welcher Teil zu Ihrer Organisation passt, [schreiben Sie mir](#contact).
