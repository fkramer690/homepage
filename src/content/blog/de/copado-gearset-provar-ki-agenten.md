---
title: "Copado, Gearset und Provar: KI-Agenten im Check"
description: "Copado Agentia, Gearsets Agent Cam und Provar MCP bringen KI in die Salesforce-Pipeline. Was sie tun, welchen Status sie haben und was Sie vorher fragen."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: copado-gearset-provar-ki-agenten
translationKey: devops-ai-agents-copado-gearset
topic: devops
categories: [devops, ai]
tags: [Copado, Gearset, Provar, KI-Agenten, DevOps, Due Diligence]
takeaways:
  - "Agentia ist in Advanced und Pro enthalten, Agentia Headless seit 20. Oktober GA, Cam gibt es auf Anfrage, Provar MCP für Provar-Automation-Kunden ohne Aufpreis."
  - "Copado nennt Vertex AI mit Gemini und Claude, aber kein Modell je Agent; Gearsets KI-Bedingungen nennen OpenAI, AWS, US-Rechenzentren und 90 Tage Aufbewahrung."
  - "Fragen Sie vor dem Kauf schriftlich nach Modell, Datenregion, Aufbewahrung, Verbrauchsdeckel und wer freigibt, was der Agent liefert."
  - "Ein Team mit Open-Source-DevOps-Werkzeugen wie sfdx-hardis deckt mit einem allgemeinen Coding-Agenten und einem selbst gewählten Anbieter Teile davon ab."
faq:
  - q: "Was ist Copado Agentia?"
    a: "Copado Agentia ist Copados Paket aus KI-Agenten für die Salesforce-Auslieferung, angekündigt am 13. April 2026. Copado beschreibt Agenten für Planung, Entwicklung, Test, Release und Betrieb, einen Context Hub aus Org-Metadaten und Pipeline-Historie sowie Governance-Funktionen wie Freigabeschritte und Audit Trails."
  - q: "Ist Gearset Cam allgemein verfügbar?"
    a: "Gearset hat Cam am 2. September 2026 mit Zahlen aus Pilotprojekten vorgestellt. Heute führt die Preisseite den Gearset Agent mit \"Request a quote\", aber ohne GA-Hinweis und ohne Preis. Den Status und das Service Level würde ich deshalb im Bestellformular festhalten."
  - q: "Welches KI-Modell nutzen Copado Agentia und Gearset Cam?"
    a: "Copados Datenschutzhinweis vom 5. August 2026 nennt Google Cloud Vertex AI mit Gemini- und Claude-Modellen als Basis seiner KI-Funktionen, aber nicht, welches Modell welche Agentia-Funktion nutzt. Gearsets allgemeine KI-Bedingungen führen OpenAI und Amazon Web Services als Anbieter. Fragen Sie beide schriftlich nach dem genauen Modell je Funktion."
  - q: "Schickt Provar MCP Daten an Provar?"
    a: "Laut Provars Dokumentation läuft der MCP-Server vollständig auf dem lokalen Rechner und sendet keine Projektdateien, keinen Testcode und keine Zugangsdaten an Provar, außer Sie aktivieren eine optionale API-Validierung. Der angebundene KI-Assistent sieht den Kontext trotzdem, also gilt Ihr Vertrag mit diesem Anbieter."
  - q: "Brauche ich einen bezahlten DevOps-Agenten, wenn mein Team Claude Code oder Copilot nutzt?"
    a: "Nicht unbedingt. Ein allgemeiner Coding-Agent schreibt die Änderung, eine Pipeline in Ihrem Besitz steuert sie. Bezahlte DevOps-Agenten bringen eine aufbereitete Sicht auf Ihre Org sowie eine vom Hersteller gepflegte Governance-Schicht mit. Das hilft Teams, die schon einen geregelten Lieferprozess haben und Integration und Support vom Hersteller wollen."
draft: false
---

Copado Agentia, Cam als Gearset Agent und Provar MCP sind die KI-Angebote, die drei Salesforce-DevOps- und Testanbieter 2026 herausgebracht haben. Bisher werden sie nur von den Herstellern beschrieben. Laut Copado ist Agentia in den Editionen Advanced und Pro verfügbar, Gearset verkauft Cam nach der Pilotphase zu einem Preis auf Anfrage, Provar MCP ist eine kostenlose lokale Werkzeugschicht für den KI-Assistenten von Provar-Automation-Kunden. Bevor ein Maschinenbauer zahlt, würde ich vier Fragen stellen: Welches Modell läuft, wo werden die Daten verarbeitet, wie lange werden sie gespeichert und wer gibt frei, was der Agent liefert? Beide Agentenanbieter beantworten das öffentlich nur zum Teil.

## Was können Copado Agentia, Gearset Cam und Provar MCP?

Die Beschreibungen unten stammen von den Herstellern selbst; einen unabhängigen Test bei Salesforce Ben oder in vergleichbarer Salesforce-Fachpresse habe ich nicht gefunden.

- **Copado Agentia.** Angekündigt am 13. April 2026 in [Copados Pressemitteilung](https://www.copado.com/resources/blog/copado-introduces-agentia-tm-bringing-context-aware-ai-agents-to-salesforce-devops). Ein Context Hub verbindet Org-Metadaten, Abhängigkeiten, Pipelines und Historie mit Ihrer eigenen Dokumentation und Ihren Richtlinien. Darauf bauen Agenten für Planung, Entwicklung, Test, Release und Betrieb auf, ein Orchestrate Agent koordiniert sie, und mit Agentia Studio bauen Sie eigene Abläufe und Agentforce-Agenten. Was davon in welcher Edition enthalten ist, lassen Sie sich im Angebot bestätigen. Als eingebaute Governance nennt Copado richtlinienbasierte Kontrollen, automatisierte Tests, Freigabeschritte, Audit Trails und rollenbasierte Zugriffe.
- **Cam, der Gearset Agent.** Laut [Gearsets Ankündigung vom 2. September 2026](https://assets.gearset.com/2026/09/01112431/Gearset-2026-Cam-Announcement.pdf) übernimmt Cam ein Ticket, fragt bei unklaren Anforderungen nach, plant und baut die Änderung und prüft, ob sie deploybar ist, bevor ein Pull Request entsteht. Die Arbeit durchläuft mit Audit Trail den bestehenden Release-Prozess des Teams, mit denselben Tests und Reviews wie menschliche Änderungen.
- **Provar MCP.** Veröffentlicht am 1. Juli 2026 im [Provar-Blog](https://provar.com/blog/product/provar-mcp-bringing-ai-to-salesforce-test-automation/). Provar MCP ist kein eigener Agent. Es dient als "AI-assisted quality layer" in der Provar DX CLI: ein MCP-Server, über den ein KI-Assistent wie Claude, GitHub Copilot oder Cursor Org-Metadaten liest, Provar-Tests und Page Objects erzeugt, sie gegen Qualitätsregeln prüft, ausführt und Fehlschläge analysiert. Der Blog nennt mehr als 240 Regeln, die aktuelle Dokumentation 170+; fragen Sie Provar, welche Zahl gilt.

Copado und Gearset verkaufen einen Agenten, der Änderungen für Ihren Release-Prozess erzeugt; Cams veröffentlichter Ablauf endet mit einem Pull Request, nicht mit einem direkten Deployment. Provar erweitert den KI-Assistenten, den Ihre Entwickler ohnehin nutzen, um ein Werkzeug. Das verschiebt, was Sie prüfen müssen.

## Was allgemein verfügbar ist und was noch Pilot

Für einen Industriebetrieb zählt der Produktstatus, weil ein Pilotprojekt selten ein Service Level oder einen festen Preis hat. Stand 9. November 2026 sagen die Hersteller Folgendes:

| Produkt | Status laut Hersteller | Preis veröffentlicht | Modell genannt |
|---|---|---|---|
| Copado Agentia | "available today" in den Editionen Agentia Advanced und Agentia Pro (April 2026) | nein | Vertex AI mit Gemini und Claude, kein Modell je Funktion |
| Copado Agentia Headless (Agenten in CLI und IDE) | allgemein verfügbar seit 20. Oktober 2026 | nein | Vertex AI mit Gemini und Claude, kein Modell je Funktion |
| Cam, der Gearset Agent | gestartet im September 2026 mit Pilotergebnissen, Preis auf Anfrage, kein GA-Hinweis | nein | nein; KI-Bedingungen nennen OpenAI und AWS |
| Provar MCP | in der Provar-Automation-Lizenz enthalten, CLI-Plugin aus dem Beta-Kanal installiert | kein Aufpreis | nutzt Ihren KI-Assistenten |

Quellen: Copado-Pressemitteilung, [Copados GA-Meldung zu Agentia Headless](https://www.copado.com/resources/blog/bring-your-own-agent-keep-your-pipeline-agentia-headless-is-now-generally-available), [Copados Datenschutzhinweis](https://www.copado.com/legal/privacy), Gearset-Ankündigung, [Gearsets Preisseite](https://gearset.com/pricing/) und [Gearsets Agentenseite](https://gearset.com/solutions/gearset-agent/), [Dokumentation zu Provar MCP](https://documentation.provar.com/documentation/v3/provar-mcp/).

Die einzige harte Zahl liefert Gearset:

```kennzahlen
44 % | der Pull Requests eines Teams erstellte Cam bei einem Kunden innerhalb einer Woche
75 % | dieser Pull Requests wurden erfolgreich gemergt
quelle: Gearset-Ankündigung vom 2. September 2026
```

Die Zahlen stammen von einem Kunden, wurden vom Hersteller gemessen und beziehen sich auf eine Woche. Sie zeigen, dass Cam in einer echten Org mergefähige Pull Requests erzeugen kann, mehr nicht. Ob das übrige Viertel im Review scheiterte, noch offen war oder verworfen wurde, sagt die Ankündigung nicht. Jeder Pull Request durchlief das Review des Teams.

## Modell, Region und Aufbewahrung unterscheiden die drei am stärksten

Hier unterscheiden sich die drei Produkte am stärksten, und hier sollte ein Hersteller mit DSGVO-Pflichten und Betriebsrat zuerst genau prüfen.

**Gearset** veröffentlicht allgemeine KI-Bedingungen in seinen [Product and Location Specific Terms](https://gearset.com/legal/product-and-location-terms/), in einer Fassung gültig ab 15. September 2026. Cam wird darin nicht namentlich genannt, die Regeln gelten aber für Gearsets KI-Funktionen insgesamt:

- Zu den Anbietern gehören "OpenAI and Amazon Web Services", mit "data centres in the United States and as otherwise specified in the Documentation".
- Gearset speichert Ein- und Ausgaben 90 Tage oder, wo die Software es anbietet, kürzer, wenn Sie das einstellen; die Modellanbieter speichern nichts.
- Gearset trainiert keine Modelle mit Kundendaten, darf Ein- und Ausgaben aber nutzen, um seine Dienste zu bewerten und zu verbessern.
- Der Verbrauch wird in Credits gemessen, mit einer monatlichen Obergrenze aus dem Bestellformular. Ist sie erreicht, sperrt Gearset die KI-Funktionen bis zum Monatsende.
- Der Kunde darf die KI-Funktionen nicht nutzen, um menschliche Entscheidungen ganz oder im Wesentlichen zu ersetzen.

```hinweis achtung
Rechenzentren in den USA bedeuten eine Übermittlung in ein Drittland. Die muss Ihr Datenschutzbeauftragter bewerten, bevor produktive Metadaten dort verarbeitet werden.
```

**Copado** nennt in seinem [Datenschutzhinweis](https://www.copado.com/legal/privacy), gültig ab 5. August 2026, Google Cloud Vertex AI, "which incorporates third party models like Google Gemini and Anthropic's Claude Models", als Basis seiner KI-Funktionen, und die Entwicklerseite führt API-Endpunkte in den USA (Standard), der EU und drei weiteren Regionen. Welches Modell von welcher Agentia-Funktion genutzt wird und ob der EU-Endpunkt die Verarbeitung in der EU hält, steht dort nicht. Ich würde mir im Bestellformular bestätigen lassen, dass diese Bedingungen für die gekaufte Edition gelten.

**Provar MCP** läuft laut Dokumentation "entirely on your local machine" und sendet keine Projektdateien, keinen Testcode und keine Zugangsdaten an Provar, solange Sie die optionale API-Validierung nicht einschalten. Metadaten und Testfälle erreichen aber den KI-Assistenten, den Sie anbinden. Die Datenfrage richtet sich damit nach Ihrem Vertrag mit Anthropic, GitHub oder Cursor; dazu mehr im Beitrag zu [Betriebsrat und DSGVO bei KI-Coding](../ki-coding-betriebsrat-dsgvo/). Die Anbindung schafft also einen neuen Datenfluss und Berechtigungsweg: welche Ordner der Assistent lesen darf, welche Werkzeuge er selbst aufrufen darf und ob er Testläufe startet. Path Scoping und Audit Logs aus der Provar-Dokumentation helfen bei dieser Freigabe. Meine Lesart der Bedingungen ist keine Rechtsberatung.

## Beispiel: ein Maschinenbauer mit Copado und Nearshore-Partner

Nehmen wir einen Maschinenbauer mit Sales Cloud für den Händlervertrieb, Field Service für die Servicetechniker und einer Schnittstelle zu SAP S/4HANA für Ersatzteile und Gewährleistung. Die Pipeline läuft auf Copado. Drei interne Entwickler arbeiten mit einem Partner, der sechs Nearshore-Entwickler stellt, und der Partner programmiert bereits mit Claude Code über Accounts, die dem Kunden gehören. Alle Zahlen sind Annahmen.

Copado bietet ein Upgrade auf Agentia an. So würde ich vorgehen:

1. **Bauen und Steuern trennen.** Der Coding-Agent schreibt schon Apex und Flows. Die Frage an Agentia lautet, ob Context Hub und Freigabeschritte etwas leisten, das die bestehende Pipeline und die [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/) nicht leisten.
2. **Die vier Antworten schriftlich holen.** Modell und Anbieter, Verarbeitungsregion, Aufbewahrung sowie Abrechnung und Obergrenze des Verbrauchs. Bis sie schriftlich vorliegen, sieht Agentia nur eine Developer Sandbox ohne Kunden- und Händlerdaten.
3. **Einen engen Tickettyp pilotieren.** Etwa 20 kleine Änderungen am Objekt für Gewährleistungsanträge: neue Felder, Picklist-Werte, eine Validierungsregel. Messen Sie, wie viele Pull Requests ohne Nacharbeit gemergt werden und wie lange das Review dauert. Vergleichen Sie die Ergebnisse mit gleichartigen Tickets, die der Coding-Agent allein erledigt.
4. **Provar MCP ergänzen, wenn Provar schon lizenziert ist.** Die Regressionstests für das Händlerportal sind das naheliegende Ziel. Eine eigene Gebühr fällt nicht an, aber die Anbindung an den Coding-Agenten ist ein neuer Datenfluss, der eine eigene Freigabe braucht.
5. **Nach sechs Wochen entscheiden**, auf Basis von Zahlen aus Ihrer eigenen Org, nicht anhand der 44 und 75 Prozent des Herstellers.

Mit Gearset bleiben die Schritte gleich; Schritt 2 beginnt bei Gearsets veröffentlichten Bedingungen und bei der Frage nach einer EU-Region.

## Wann reichen Open Source und ein allgemeiner Coding-Agent?

Ein Team, das bereits [sfdx-hardis](../sfdx-hardis-einfuehrung-salesforce-devops/) nutzt, erhält Teile dessen, was bezahlte DevOps-Agenten bieten, ohne zweiten KI-Vertrag, nicht aber deren Kontext-, Test- und Governance-Schichten. Laut der [KI-Einrichtungsanleitung von sfdx-hardis](https://sfdx-hardis.cloudity.com/salesforce-ai-setup/) erklärt es Deployment-Fehler und beschreibt Flows und Apex-Klassen. Als Anbieter kommen Agentforce, OpenAI, Anthropic, Google oder ein lokales Ollama-Modell in Frage. Die Anbindung wird über Umgebungsvariablen eingestellt oder über ein firmeneigenes Gateway geleitet. Sie wählen den Anbieter und, wo Anbieter und Vertrag es zulassen, die Region; ein lokales Modell hält die Inferenz lokal. Die automatische Fehlerkorrektur per Coding-Agent befindet sich in der Beta-Phase, und die Anleitung verlangt, dass ein Experte diese Änderungen vor dem Merge prüft.

Kombinieren Sie das mit Claude Code, Codex oder Copilot für die Entwicklung, verglichen in [Agentforce Vibes, Claude Code, Codex oder Copilot](../agentforce-vibes-claude-code-copilot-vergleich/), und eine Pipeline in Ihrem Besitz entscheidet, was in Produktion gelangt. Dafür übernimmt Ihr Team Setup und Support selbst.

```pro-contra
pro: Ein bezahlter DevOps-Agent passt, wenn
- Sie schon einen geregelten Lieferprozess haben und Support für den Agenten wollen
- Sie eine aufbereitete Sicht auf Ihre Org und Pipeline wollen
- der Hersteller die Governance-Schicht pflegen soll
- Sie für Setup und Support jemanden bezahlen wollen
contra: Open Source und Coding-Agent reichen, wenn
- Ihr Team bereits sfdx-hardis nutzt
- Sie Anbieter und Region selbst wählen wollen
- Sie oder Ihr Architekt das Setup verantworten
```

## Diese Fragen vor dem Kauf schriftlich stellen

Diese Fragen würde ich jedem DevOps-Anbieter stellen, der einen KI-Agenten verkauft, und die Antworten ins Bestellformular schreiben lassen:

- Welches Modell nutzt der Agent, welcher Anbieter betreibt es, und informieren Sie uns vor einem Wechsel?
- In welcher Region werden Eingaben verarbeitet, und gibt es eine EU-Region?
- Wie lange werden Prompts, Code und Metadaten gespeichert, bei Ihnen und beim Modellanbieter, und fließen sie ins Training?
- Wie wird der Verbrauch gemessen, wo liegt die monatliche Obergrenze, und was passiert, wenn wir sie erreichen?
- Ist das Produkt allgemein verfügbar, in der Beta-Phase oder in der Pilotphase, und welches Service Level gilt?
- Wer gibt die Pull Requests des Agenten frei, und kann er jemals ohne menschliche Freigabe deployen?
- Was passiert mit dem Kontext, den der Agent über unsere Org aufgebaut hat, wenn wir wechseln?

Die letzten beiden Fragen hängen mit Punkten zusammen, die ich an anderer Stelle beschreibe: Der Kunde sollte [seine DevOps-Tools selbst besitzen](../warum-kunden-devops-tools-selbst-besitzen-sollten/), und dieselben Regeln gehören in die [Verträge mit Partnern, die mit KI programmieren](../partner-ki-coding-regeln-vertrag/). Die Einrichtung gehört zu meiner Arbeit im [DevOps- und Release-Management](../../leistungen/devops-und-release-management/), die breitere Werkzeugwahl behandle ich in [Kapitel 4 der KI-Masterclass](../../masterclass/ki-salesforce/externe-coding-agenten/).
