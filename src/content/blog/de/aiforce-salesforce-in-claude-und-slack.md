---
title: "AIforce: Salesforce in Claude und Slack erklärt"
description: "Was AIforce ist (Salesforce in Claude, Slackforce, Agentforce Coworker), was hinter SIForce steckt und was die IT-Leitung eines Herstellers jetzt tun sollte."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: aiforce-salesforce-in-claude-und-slack
translationKey: aiforce-salesforce-in-claude-slack
topic: ai
categories: [ai]
tags: [AIforce, Claude, Slack, Agentforce Coworker, MCP, Maschinenbau]
takeaways:
  - "AIforce startete mit Claudeforce (Salesforce in Claude), Slackforce und Agentforce Coworker, technisch getragen vom Headless Toolkit."
  - "SIForce beruht nur auf einem X-Post von Marc Benioff vom 9. Oktober 2026; eine Pressemitteilung fehlt. Unterlagen bleiben deshalb bei AIforce."
  - "Salesforce in Claude ist eine Beta mit 37 Vertriebs-Skills und hat keine Service-Skills. Der Service kann stattdessen Coworker mit CRM-Daten testen."
  - "Salesforce in Claude und nutzergebundene MCP-Aufrufe laufen mit den Rechten des Nutzers; zu weite Freigaben werden also im Chatfenster sichtbar."
  - "Coworker kostet 50 US-Dollar je Nutzer, der MCP-Satz ist mit TBA angegeben, und Preise können sich ändern. Budgetieren Sie einen Piloten, keinen Rollout."
faq:
  - q: "Was ist AIforce bei Salesforce?"
    a: "AIforce ist eine Interface-Schicht, die Salesforce zur Dreamforce am 15. September 2026 angekündigt hat. Sie macht Salesforce-Daten, Workflows und Berechtigungen aus Claude, Slack und der Lightning-Oberfläche nutzbar. Gestartet ist sie mit Claudeforce (Salesforce in Claude), Slackforce und Agentforce Coworker, technisch getragen vom Headless Toolkit."
  - q: "Heißt AIforce jetzt SIForce?"
    a: "Marc Benioff hat am 9. Oktober 2026 auf X geschrieben, AIforce heiße offiziell SIForce. Salesforce Ben und andere Medien haben darüber berichtet; eine Pressemitteilung von Salesforce gab es aber nicht. Am 9. November 2026 verwenden die Produkt-, Hilfe- und Preisseiten von Salesforce weiter AIforce."
  - q: "Was brauche ich für Salesforce in Claude?"
    a: "Die Salesforce-Hilfe nennt Enterprise, Performance, Unlimited und Developer Edition sowie ein direktes Anthropic-Abonnement (Claude Enterprise, Team oder Console); in der Tabelle dort steht allerdings nur Claude Enterprise. Dazu kommt die Freigabe über die Beta-Anmeldung. Ein Salesforce-Admin aktiviert den MCP-Server und stellt eine External Client App bereit, und ein Claude-Owner richtet den Connector ein."
  - q: "Brauchen wir Slack, um AIforce zu nutzen?"
    a: "Nein. Salesforce in Claude und Agentforce Coworker funktionieren ohne Slack, und Salesforce gibt Coworker in Microsoft Teams ab November 2026 als allgemein verfügbar an. Slackforce ist nur relevant, wenn Ihr Unternehmen schon in Slack arbeitet; in einem Teams-Unternehmen würde ich Slack dafür nicht kaufen."
  - q: "Braucht Agentforce Coworker Data 360?"
    a: "Ja. Die Einrichtungsdokumentation nennt Data Cloud oder Data 360 als Voraussetzung für nutzungsbasierten und sitzbasierten Zugang, dazu Enterprise, Unlimited oder Agentforce 1 Edition. CRM-Daten werden automatisch als Quelle hinzugefügt; zusätzliche Data-360-Quellen und Indexierung verbrauchen Credits."
draft: false
---

AIforce ist die Schicht, die Salesforce zur Dreamforce am 15. September 2026 vorgestellt hat, damit Daten, Workflows und Berechtigungen aus Claude, Slack und der Lightning-Oberfläche nutzbar werden. Für die IT-Leitung eines Herstellers sieht der ehrliche Stand so aus: Salesforce in Claude ist eine Beta für den Vertrieb, Agentforce Coworker braucht Data 360 und kostet als Benutzerlizenz 50 US-Dollar, und die Umbenennung in SIForce ist bisher ein Post des CEO auf X. Einen Rollout würde ich jetzt nicht planen. Ich würde Berechtigungen aufräumen, pro Nutzergruppe eine Oberfläche festlegen und einen kleinen Piloten im Vertrieb starten.

## Was ist AIforce?

Salesforce nennt AIforce „a live interface layer that brings the full power of Salesforce to wherever people and agents work“ ([Ankündigung vom 15. September 2026](https://www.salesforce.com/news/stories/aiforce-announcement/)). Einfach gesagt: Nutzer stellen Fragen, ändern Datensätze und starten Workflows aus einem anderen Werkzeug heraus, ohne Salesforce zu öffnen. Im Architekturbild von Salesforce liegt AIforce über Data 360, Customer 360 und Agentforce. Gestartet ist es mit drei Produktfamilien, getragen von einer vierten Schicht, dem Headless Toolkit:

- **Claudeforce bzw. Salesforce in Claude.** Ein vorkonfigurierter MCP-Server in Claude mit 37 Vertriebs-Skills, dazu ein Salesforce-Development-Plugin für Claude Code mit mehr als 40 Skills. MCP (Model Context Protocol) ist der offene Standard, über den ein KI-Werkzeug Funktionen in einem anderen System aufruft; ich erkläre ihn in [MCP für die IT-Leitung](../mcp-salesforce-erklaert-it-leitung/).
- **Slackforce.** Slackforce Surfaces für Live-Oberflächen in Slack, Slackbot als persönlicher Assistent über Slack- und Salesforce-Daten, Slack CRM und Slack Code.
- **Agentforce Coworker.** Ein KI-Teammitglied in Lightning, das Accounts, Aktivitäten und Historie auswertet und die Agentforce-Agenten aufruft, die Sie schon im Einsatz haben.
- **Headless Toolkit.** MCPs, APIs, Plugins und Skills, die die Plattform für eigene KI-Werkzeuge öffnen.

Zwei Richtungen werden leicht verwechselt. In der [Claudeforce-Meldung vom 27. August 2026](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) nennt Salesforce Claude als Reasoning-Modell der Atlas Reasoning Engine und als Standardmodell für Agentforce Coworker und Slackbot; über Amazon Bedrock sei Claude innerhalb der Salesforce Trust Boundary verfügbar. Das ist Claude in Salesforce. Salesforce in Claude ist die Gegenrichtung: Ihre CRM-Daten gehen in die Claude-App, die Ihre Mitarbeitenden nutzen. Für den Datenschutz sind das zwei verschiedene Fälle.

## Heißt AIforce jetzt SIForce?

Schriftlich bestätigt hat Salesforce das nicht. Am 9. Oktober 2026 hat Marc Benioff auf X geschrieben: „The era of Super Intelligence is here. AIForce is officially SIForce.“ Das kann ich nur über Sekundärquellen bestätigen. [Salesforce Ben berichtete am 12. Oktober](https://www.salesforceben.com/salesforce-renames-aiforce-to-siforce-after-trump-order/), es gebe offenbar keine offizielle Ankündigung von Salesforce, und man habe Salesforce um eine Stellungnahme gebeten. Bis zum 9. November 2026 habe ich keine Pressemitteilung, keinen Hilfeartikel und keine Preisseite von Salesforce gefunden, die SIForce verwendet.

Hintergrund ist eine US-Executive-Order vom 29. September 2026, [„Inaugurating The Era of Super Intelligence“](https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/). Sie verpflichtet die Ministerien und Behörden der Exekutive, in eigenen Dokumenten „Super Intelligence“ statt „Artificial Intelligence“ zu schreiben. Private Unternehmen fallen nicht darunter; Salesforce musste also nichts umbenennen. Salesforce Ben zählt SIForce als dritten Namen für diese Schicht in gut sechs Monaten, nach Headless 360 zur TDX im April und AIforce zur Dreamforce.

In Ihren eigenen Unterlagen würde ich „AIforce“ schreiben und einmal „(vom CEO als SIForce angekündigt)“ ergänzen. In Bestellformularen und Verträgen steht der Name, den Salesforce dort druckt, und der zählt.

```zeitleiste
2026-04-29 | Hosted MCP Server allgemein verfügbar
2026-08-27 | Claudeforce: Claude wird Standardmodell für Coworker und Slackbot
2026-09-15 | AIforce zur Dreamforce angekündigt
2026-09-29 | US-Executive-Order „Super Intelligence“ für Behörden
2026-10-09 | Marc Benioff auf X: AIforce heißt SIForce
2026-10-12 | Salesforce Ben findet keine offizielle Ankündigung
```

## Stand November 2026: vieles ist noch angekündigt

Die Ankündigungen reichen weiter als das, was sich derzeit einschalten lässt. Stand 9. November 2026:

- **Salesforce in Claude** ist eine Beta. Laut [Anthropics Einrichtungsanleitung](https://support.claude.com/en/articles/16952184-set-up-salesforce-in-claude-for-your-organization) steht es Organisationen zur Verfügung, die Salesforce über die Beta-Anmeldung freigibt, und funktioniert im Chat und in Claude Cowork im Web und auf dem Desktop. Die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=platform.set_up_salesforce_in_claude.htm&language=en_US&type=5) nennt Enterprise, Performance, Unlimited und Developer Edition und verlangt ein direktes Anthropic-Abonnement (Claude Enterprise, Team oder Console), ihre Editionstabelle dagegen nur Claude Enterprise; klären Sie das mit der Beta-Freigabe. Claude greift mit dem Salesforce-Konto und den Berechtigungen des Nutzers zu und fragt standardmäßig vor jedem Schreibvorgang nach Freigabe.
- **Agentforce Coworker** ist laut Ankündigung „instantly available“. Salesforces eigener [Coworker-Blog](https://www.salesforce.com/blog/agentforce-coworker-salesforce-ai-teammate/) schreibt sowohl „Generally Available“ als auch „in beta“ und nannte Microsoft Teams, ChatGPT, Claude und eine Desktop-App als „coming later this year“. Das [Update vom 4. November 2026](https://www.salesforce.com/news/stories/agentforce-coworker-surpasses-185k-users/) führt Teams als allgemein verfügbar im November und die Field-Service-App als erwartet im Dezember 2026; die eigenständige [Coworker-Nutzerlizenz](https://www.salesforce.com/agentforce/coworker/) kostet 50 US-Dollar pro Nutzer und Monat mit 30 MB Indexierung pro Nutzer. Prüfen Sie jede Oberfläche in Ihrer Org. Die [Einrichtungsdokumentation](https://developer.salesforce.com/docs/data/agentforce-coworker/guide/agentforce-coworker-turn-on-infrastructure.html) verlangt Enterprise, Unlimited oder Agentforce 1 Edition sowie Data Cloud oder Data 360.
- **Slackforce** steht im [Dreamforce-2026-Überblick](https://www.salesforce.com/blog/dreamforce-2026-announcements/) als GA im Oktober; Slackforce ist ein Sammelbegriff, prüfen Sie Status und Plan also für die Bausteine, die Sie wollen (Surfaces, Slackbot, Slack CRM, Slack Code). Für Slackbot-Aktionen veröffentlicht Salesforce Flex-Credit-Faktoren je Slack-Workspace, laut [Rate Card vom 3. November 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf).
- **Hosted MCP Server**, über die externe KI-Werkzeuge wie Claude auf eine Org zugreifen, sind [seit dem 29. April 2026 allgemein verfügbar](https://developer.salesforce.com/blogs/2026/04/salesforce-hosted-mcp-servers-are-now-generally-available), ab Enterprise Edition. Die aktuelle Dokumentation ergänzt, dass sie für Kunden mit Flex Credits gedacht sind und die Nutzung berechnet werden kann. Wer darüber was lesen darf, behandle ich in [Hosted MCP Server und Datenzugriff](../salesforce-hosted-mcp-server-datenzugriff/).

```kennzahlen
37 | Vertriebs-Skills in Salesforce in Claude (Beta)
40 Flex Credits | je Standard-Aktion in Slackbot
200 Flex Credits | je Advanced-Aktion in Slackbot
quelle: Anthropic zu Salesforce in Claude; Salesforce Flex Credits Rate Card vom 03.11.2026
```

Zu den Kosten sagt die Ankündigung: „Pricing and packaging are subject to change.“ Die Rate Card führt Headless Platform Interactions, den Zähler für agentische API- und MCP-Aufrufe, als „TBA“. Das heißt, es gibt noch keine Zahl, nicht aber, dass die Aufrufe kostenlos bleiben. Warum daraus ein Budgetposten wird, steht in [MCP-Zugriffe als Budgetrisiko](../flex-credits-agentforce-kosten-pro-aktion/).

## Für Hersteller hilft AIforce heute dem Vertrieb mehr als dem Service

Im Moment hilft AIforce dem Vertrieb mehr als dem Service. Laut [Anthropic](https://claude.com/blog/salesforce-in-claude) decken die 37 Skills Account-Recherche, Gesprächsvorbereitung, Pipeline-Review und CRM-Pflege ab. Das passt zu Key Account Managern und Händlerbetreuern, die Besuche vorbereiten und Opportunities pflegen. Skills für Service, Marketing, Commerce und Branchen nennt die Ankündigung von Salesforce erst für „the near future“. Salesforce in Claude hat also noch keine Service-Skills. Der Service kann aber Coworker mit Cases und anderen CRM-Daten testen, und Coworker in der Field-Service-App ist für Dezember 2026 angekündigt.

Der zweite Punkt ist das ERP. Salesforce in Claude liest Salesforce. Stehen Auftragsstatus, Liefertermine und Bestände nur in SAP oder proALPHA, erhält ein Vertriebsmitarbeiter auf die Frage „Welche Aufträge dieses Händlers sind verspätet?“ eine Antwort auf unvollständiger Datenbasis, vorgetragen mit voller Überzeugung. Welche ERP-Daten nach Salesforce gehören oder hinter eine API, die der Agent aufrufen kann, muss geklärt sein, bevor jemand ein Chatfenster öffnet.

Der dritte Punkt ist das Kollaborationswerkzeug. Viele Maschinenbauer arbeiten in Microsoft Teams. Dort bringt Slackforce nichts; Salesforce gibt Coworker in Teams dagegen ab November 2026 als allgemein verfügbar an. Slack würde ich nicht kaufen, um eine KI-Oberfläche zu erhalten.

Der vierte Punkt betrifft die Berechtigungen. „Every transaction runs as the authenticated user“, schreibt Salesforce zu Hosted MCP. Das gilt für Salesforce in Claude und nutzergebundene Verbindungen; registrierte Agenten können stattdessen mit eigener Identität und engeren Berechtigungssätzen laufen. Genau im nutzergebundenen Fall liegt aber das Risiko. Sehen Ihre Vertriebsmitarbeitenden alle Cases, Garantieanträge und Händler-Preisvereinbarungen, weil die Freigaben vor Jahren zu großzügig gesetzt wurden, zeigt ein Chat das in Sekunden statt nach zehn Klicks.

## Rechenbeispiel: ein Maschinenbauer mit Teams und SAP

Nehmen wir einen Maschinenbauer mit 80 Sales-Cloud-Nutzern in Vertrieb und Händlerbetreuung, Service Cloud im Aftersales, SAP als ERP und Microsoft Teams für die Zusammenarbeit. Alle Zahlen und Rahmenbedingungen sind Annahmen. Einige Vertriebsmitarbeitende kopieren schon heute Account-Daten in private KI-Werkzeuge.

Die IT-Leitung sortiert die vier AIforce-Teile:

- **Salesforce in Claude:** Pilotkandidat für zehn Key Account Manager, sofern die Edition für die Beta zugelassen ist und das Unternehmen Plätze in Claude Enterprise oder Team kauft. Vor dem Piloten wird das Freigabemodell für Cases und Preisvereinbarungen geprüft, und die Freigabe vor jedem Schreibvorgang bleibt eingeschaltet.
- **Agentforce Coworker:** zweiter Schritt. Es braucht Data 360 und dazu Flex Credits mit Foundations oder eine Benutzerlizenz für 50 US-Dollar pro Nutzer und Monat. Sobald Teams in der Org verfügbar ist, bietet sich ein Test mit dem Service Desk anhand von Cases an.
- **Slackforce:** nicht relevant, weil das Unternehmen in Teams arbeitet.
- **Headless Toolkit:** relevant für die IT und den Implementierungspartner, denn Hosted MCP Server und das Claude-Code-Plugin sind der Entwicklerpfad. Was Partner damit dürfen, gehört in den Vertrag.

Daraus ergeben sich ein kleiner Pilot im Vertrieb und eine Woche für das Aufräumen der Berechtigungen. Nach meiner Einschätzung ist das die richtige Größe für eine Beta, für die Salesforce den MCP-Satz noch nicht veröffentlicht hat.

## Die Schattennutzung finden, dann Rechte und Verträge prüfen

1. **Die Schattennutzung finden.** Fragen Sie, welche Teams schon Salesforce-Daten in Claude, ChatGPT oder Copilot kopieren. Ein gesteuerter Connector ist meist besser als Copy and Paste, sofern Berechtigungen, Werkzeugbeschränkungen und Aufbewahrung vorher eingestellt sind.
2. **Pro Nutzergruppe eine Oberfläche festlegen.** Zum Beispiel Lightning für den Innendienst im Service, Claude für Key Account Manager, Teams für alle anderen. Fünf parallele KI-Oberflächen bedeuten fünf Supportthemen.
3. **Freigabeeinstellungen und Sicherheit auf Feldebene prüfen** für Cases, Garantieanträge, Preisvereinbarungen und Händler-Accounts, bevor ein Chatwerkzeug sie liest.
4. **Den Claude-Vertrag lesen.** Salesforce wirbt damit, dass der Modellanbieter Geschäftsdaten nicht speichert („not retained by the model provider“). Die eigene [Seite zum Datenumgang](https://help.salesforce.com/s/articleView?id=platform.security_permissions_and_data_handling.htm&language=en_US&type=5) sagt aber: Sobald Daten über MCP bei Anthropic ankommen, gilt Ihr Vertrag mit Anthropic. Dass Daten nicht fürs Training genutzt werden, sagt nichts über ihre Speicherung. Prüfen Sie im Vertrag die Aufbewahrungsdauer von Chatverläufen, Löschfristen, Audit-Logs und Hosting-Region.
5. **Einen Piloten budgetieren.** Coworker hat einen Listenpreis, der MCP-Satz ist aber offen, und die Preise können sich ändern. Ob sich Data 360 für Coworker lohnt oder Claude-Plätze für den Vertrieb, ist eine Frage für [Make-or-buy und Lizenzplanung](../../leistungen/make-or-buy-lizenzen/).
6. **In der Dokumentation beim Namen AIforce bleiben**, bis Salesforce SIForce schriftlich bestätigt.

Ob Sie eigene Agentforce-Agenten bauen, ist eine eigene Entscheidung; dazu mehr in [Agentforce für Hersteller: jetzt starten oder warten?](../agentforce-ja-oder-nein-hersteller/). Für AIforce selbst gilt die Reihenfolge der Liste oben: erst Berechtigungen, Daten und Verträge, dann die Oberfläche.
