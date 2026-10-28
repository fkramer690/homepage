---
title: "Copado, Gearset und Provar: KI-Agenten im Check"
description: "Copado Agentia, Gearset Cam und Provar MCP bringen KI-Agenten in die Salesforce-Pipeline. Was sie tun, welchen Status sie haben und was Sie vorher fragen."
pubDate: 2026-10-27
lang: de
slug: copado-gearset-provar-ki-agenten
translationKey: devops-ai-agents-copado-gearset
topic: devops
categories: [devops, ai]
tags: [Copado, Gearset, Provar, KI-Agenten, DevOps, Due Diligence]
takeaways:
  - "Copado Agentia, Gearset Cam und Provar MCP sind KI-Agenten von Salesforce-DevOps- und Testanbietern; im Oktober 2026 stammt alles Bekannte darüber von den Seiten der Hersteller selbst."
  - "Laut Copado ist Agentia in den Editionen Advanced und Pro verfügbar, Gearset hat Cam am 2. September 2026 mit Pilotkunden gestartet, Provar MCP ist ein lokales Plugin ohne Aufpreis für Provar-Automation-Kunden."
  - "Weder Copado noch Gearset nennt das Modell hinter dem Agenten; Gearsets allgemeine KI-Bedingungen nennen OpenAI und Amazon Web Services, Rechenzentren in den USA und 90 Tage Aufbewahrung."
  - "Fragen Sie vor dem Kauf schriftlich, welches Modell läuft, wo Daten verarbeitet werden, wie lange sie gespeichert bleiben, wie der Verbrauch gedeckelt ist und wer freigibt, was der Agent liefert."
  - "Ein Team mit Open-Source-DevOps wie sfdx-hardis deckt mit einem allgemeinen Coding-Agenten und einem selbst gewählten Modell vieles davon ab."
faq:
  - q: "Was ist Copado Agentia?"
    a: "Copado Agentia ist Copados Paket aus KI-Agenten für die Salesforce-Auslieferung, angekündigt am 13. April 2026. Copado beschreibt Agenten für Planung, Entwicklung, Test, Release und Betrieb, einen Context Hub aus Org-Metadaten und Pipeline-Historie sowie Governance-Funktionen wie Freigabeschritte und Audit Trails."
  - q: "Ist Gearset Cam allgemein verfügbar?"
    a: "Gearsets Ankündigung vom 2. September 2026 beschreibt Piloten mit ausgewählten Kunden und spricht nicht von GA. Die Produktseite nennt keinen Preis und bietet eine Demo an. Status und Service Level würde ich deshalb im Bestellformular festhalten."
  - q: "Welches KI-Modell nutzen Copado Agentia und Gearset Cam?"
    a: "Keiner der beiden Anbieter nennt das Modell auf seinen Produktseiten. Gearsets allgemeine KI-Bedingungen führen OpenAI und Amazon Web Services als Anbieter; für Copado habe ich keine öffentliche Aussage gefunden, die Agentia abdeckt. Fragen Sie beide schriftlich."
  - q: "Schickt Provar MCP Daten an Provar?"
    a: "Laut Provars Dokumentation läuft der MCP-Server vollständig auf dem lokalen Rechner und sendet keine Projektdateien, keinen Testcode und keine Zugangsdaten an Provar, außer Sie aktivieren eine optionale API-Validierung. Der angebundene KI-Assistent sieht den Kontext trotzdem, also gilt Ihr Vertrag mit diesem Anbieter."
  - q: "Brauche ich einen bezahlten DevOps-Agenten, wenn mein Team Claude Code oder Copilot nutzt?"
    a: "Nicht unbedingt. Ein allgemeiner Coding-Agent schreibt die Änderung, eine Pipeline in Ihrem Besitz steuert sie. Bezahlte DevOps-Agenten bringen eine aufbereitete Sicht auf Ihre Org und eine vom Hersteller gepflegte Governance-Schicht mit. Das hilft Teams ohne eigenes Git- und Pipeline-Wissen."
draft: false
---

Copado Agentia, Gearset Cam und Provar MCP sind die KI-Agenten, die drei Salesforce-DevOps- und Testanbieter 2026 herausgebracht haben, und bisher beruht alles darüber auf Herstellerangaben. Laut Copado ist Agentia in den Editionen Advanced und Pro verfügbar, Gearset hat Cam mit Pilotkunden gestartet, Provar MCP ist ein kostenloses lokales Plugin für Kunden von Provar Automation. Bevor ein Maschinenbauer zahlt, würde ich vier Fragen stellen: Welches Modell läuft, wo werden die Daten verarbeitet, wie lange werden sie gespeichert und wer gibt frei, was der Agent liefert? Von den beiden Anbietern mit eigenem Agenten beantwortet nur Gearset öffentlich einen Teil davon.

## Was können Copado Agentia, Gearset Cam und Provar MCP?

Die Beschreibungen unten stammen von den Herstellern selbst; einen unabhängigen Test bei Salesforce Ben oder vergleichbarer Salesforce-Fachpresse habe ich nicht gefunden.

- **Copado Agentia.** Angekündigt am 13. April 2026 in [Copados Pressemitteilung](https://www.copado.com/resources/blog/copado-introduces-agentia-tm-bringing-context-aware-ai-agents-to-salesforce-devops). Ein Context Hub verbindet Org-Metadaten, Abhängigkeiten, Pipelines und Historie mit Ihrer eigenen Dokumentation und Ihren Richtlinien. Darauf setzen Agenten für Planung, Entwicklung, Test, Release und Betrieb auf, ein Orchestrate Agent koordiniert sie, und mit Agentia Studio bauen Sie eigene Abläufe und Agentforce-Agenten. Als eingebaute Governance nennt Copado richtlinienbasierte Kontrollen, automatisierte Tests, Freigabeschritte, Audit Trails und rollenbasierte Zugriffe.
- **Gearset Cam.** Laut [Gearsets Ankündigung vom 2. September 2026](https://assets.gearset.com/2026/09/01112431/Gearset-2026-Cam-Announcement.pdf) übernimmt Cam ein Ticket, fragt bei unklaren Anforderungen nach, plant und baut die Änderung und prüft, ob sie deploybar ist, bevor ein Pull Request entsteht. Die Arbeit läuft durch den bestehenden Release-Prozess des Teams, mit denselben Tests und Reviews wie menschliche Änderungen, und ein Audit Trail hält fest, was Cam gebaut hat und warum.
- **Provar MCP.** Veröffentlicht am 1. Juli 2026 im [Provar-Blog](https://provar.com/blog/product/provar-mcp-bringing-ai-to-salesforce-test-automation/). Provar MCP ist ein Open-Source-Plugin für die Salesforce CLI. Damit liest ein KI-Assistent wie Claude, GitHub Copilot oder Cursor Org-Metadaten, erzeugt Provar-Tests und Page Objects, prüft sie gegen mehr als 240 Qualitätsregeln, führt sie aus und analysiert Fehlschläge. Es deckt nur die Testautomatisierung ab.

Copado und Gearset verkaufen einen Agenten, der Ihre Org verändert. Provar ergänzt den KI-Assistenten, den Ihre Entwickler ohnehin nutzen, um ein Werkzeug. Das macht die Prüfung bei Provar deutlich kürzer.

## Was ist allgemein verfügbar, was noch Pilot?

Für einen Industriebetrieb zählt der Produktstatus, weil ein Pilot selten mit Service Level oder festem Preis kommt. Stand 27. Oktober 2026 sagen die Hersteller Folgendes:

| Produkt | Status laut Hersteller | Preis veröffentlicht | Modell genannt |
|---|---|---|---|
| Copado Agentia | "available today" in den Editionen Agentia Advanced und Agentia Pro (April 2026) | nein | nein |
| Copado Agentia Headless (Agenten in der IDE) | "officially GA" auf Copados Dreamforce-2026-Seite, ohne Datum | nein | nein |
| Gearset Cam | gestartet mit Piloten bei "a selection of Gearset customers", kein GA-Hinweis | nein | nein |
| Provar MCP | in der Provar-Automation-Lizenz enthalten, CLI-Plugin aus dem Beta-Kanal installiert | kein Aufpreis | nutzt Ihren KI-Assistenten |

Quellen: Copado-Pressemitteilung, [Copados Dreamforce-2026-Seite](https://www.copado.com/dreamforce-2026-copado), Gearset-Ankündigung und [Gearsets Agentenseite](https://gearset.com/solutions/gearset-agent/), [Dokumentation zu Provar MCP](https://documentation.provar.com/documentation/v3/provar-mcp/).

Die einzige harte Zahl liefert Gearset:

```kennzahlen
44 % | der Pull Requests eines Teams erstellte Cam bei einem Kunden innerhalb einer Woche
75 % | dieser Pull Requests wurden erfolgreich gemergt
quelle: Gearset-Ankündigung vom 2. September 2026
```

Das ist ein Kunde, gemessen vom Hersteller, nach einer Woche. Es zeigt, dass Cam in einer echten Org mergefähige Pull Requests erzeugen kann, mehr nicht. Jeder vierte wurde nicht gemergt, und jeder lief durch das Review des Teams.

## Welches Modell, welche Region, welche Aufbewahrung?

Hier unterscheiden sich die drei Produkte am stärksten, und hier sollte ein Hersteller mit DSGVO-Pflichten und Betriebsrat zuerst hinschauen.

**Gearset** veröffentlicht allgemeine KI-Bedingungen in seinen [Product and Location Specific Terms](https://gearset.com/legal/product-and-location-terms/), in einer Fassung gültig ab 15. September 2026. Cam wird darin nicht namentlich genannt, die Regeln gelten aber für Gearsets KI-Funktionen insgesamt:

- Zu den Anbietern gehören "OpenAI and Amazon Web Services", mit "data centres in the United States and as otherwise specified in the Documentation".
- Gearset speichert Ein- und Ausgaben 90 Tage oder, wo die Software es anbietet, kürzer, wenn Sie das einstellen; die Modellanbieter speichern nichts.
- Gearset trainiert keine Modelle mit Kundendaten, darf Ein- und Ausgaben aber nutzen, um seine Dienste zu bewerten und zu verbessern.
- Der Verbrauch wird in Credits gemessen, mit einer monatlichen Obergrenze aus dem Bestellformular. Ist sie erreicht, sperrt Gearset die KI-Funktionen bis zum Monatsende.
- Der Kunde darf die KI-Funktionen nicht nutzen, um menschliche Entscheidungen ganz oder im Wesentlichen zu ersetzen.

```hinweis achtung
Rechenzentren in den USA bedeuten eine Übermittlung in ein Drittland. Die muss Ihr Datenschutzbeauftragter bewerten, bevor produktive Metadaten hineingehen.
```

**Copado** nennt für Agentia auf den Seiten, die ich geöffnet habe, weder Modell noch Region. Das öffentliche Datenblatt "Copado AI and your data" stammt vom Juni 2024 und behandelt CopadoGPT und Test Copilot, nicht Agentia; ich konnte nur die Zusammenfassungsseite lesen. Über die Qualität der Antworten sagt das nichts. Sie brauchen sie aber schriftlich, bevor Sie unterschreiben.

**Provar MCP** läuft laut Dokumentation "entirely on your local machine" und sendet keine Projektdateien, keinen Testcode und keine Zugangsdaten an Provar, solange Sie die optionale API-Validierung nicht einschalten. Metadaten und Testfälle erreichen aber den KI-Assistenten, den Sie anbinden. Die Datenfrage verschiebt sich damit in Ihren Vertrag mit Anthropic, GitHub oder Cursor, den Sie ohnehin geklärt haben sollten; dazu mehr im Beitrag zu [Betriebsrat und DSGVO bei KI-Coding](../ki-coding-betriebsrat-dsgvo/). Nach meiner Lesart der Herstellerseiten ist Provar MCP das am leichtesten freizugebende der drei Produkte. Meine Lesart der Bedingungen ist keine Rechtsberatung.

## Ein typisches Szenario: ein Maschinenbauer mit Copado und Nearshore-Partner

Nehmen wir einen Maschinenbauer mit Sales Cloud für den Händlervertrieb, Field Service für den Außendienst und einer Schnittstelle zu SAP S/4HANA für Ersatzteile und Gewährleistung. Die Pipeline läuft auf Copado. Drei interne Entwickler arbeiten mit einem Partner, der sechs Nearshore-Entwickler stellt, und der Partner programmiert bereits mit Claude Code über Accounts, die dem Kunden gehören. Alle Zahlen sind Annahmen.

Copado bietet ein Upgrade auf Agentia an. So würde ich vorgehen:

1. **Bauen und Steuern trennen.** Der Coding-Agent schreibt schon Apex und Flows. Die Frage an Agentia lautet, ob Context Hub und Freigabeschritte etwas bringen, das die bestehende Pipeline und die [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/) nicht leisten.
2. **Die vier Antworten schriftlich holen.** Modell und Anbieter, Verarbeitungsregion, Aufbewahrung sowie Abrechnung und Obergrenze des Verbrauchs. Bis sie auf Papier stehen, sieht Agentia nur eine Developer Sandbox ohne Kunden- und Händlerdaten.
3. **Einen engen Tickettyp pilotieren.** Etwa 20 kleine Änderungen am Objekt für Gewährleistungsanträge: neue Felder, Picklist-Werte, eine Validierungsregel. Messen Sie, wie viele Pull Requests ohne Nacharbeit gemergt werden und wie lange das Review dauert, im Vergleich zu gleichartigen Tickets, die der Coding-Agent allein erledigt.
4. **Provar MCP ergänzen, wenn Provar schon lizenziert ist.** Die Regressionstests für das Händlerportal sind das naheliegende Ziel. Es kostet nichts extra, und die Daten bleiben in einer bereits freigegebenen Werkzeugkette.
5. **Nach sechs Wochen entscheiden**, auf Basis von Zahlen aus Ihrer eigenen Org, nicht anhand der 44 und 75 Prozent des Herstellers.

Mit Gearset bleiben die Schritte gleich; Schritt 2 startet bei Gearsets veröffentlichten Bedingungen und fragt nach einer EU-Region.

## Wann reichen Open Source und ein allgemeiner Coding-Agent?

Ein Team, das bereits [sfdx-hardis](../sfdx-hardis-einfuehrung-salesforce-devops/) nutzt, bekommt vieles, was bezahlte DevOps-Agenten bieten, ohne zweiten KI-Vertrag. Laut der [KI-Einrichtungsanleitung von sfdx-hardis](https://sfdx-hardis.cloudity.com/salesforce-ai-setup/) erklärt es Deployment-Fehler, beschreibt Flows und Apex-Klassen und verbessert die erzeugte Dokumentation. Als Anbieter kommen Agentforce, OpenAI, Anthropic, Google oder ein lokales Ollama-Modell in Frage, eingestellt über Umgebungsvariablen oder über ein firmeneigenes Gateway geleitet. Sie wählen das Modell und damit die Region. Die automatische Fehlerkorrektur per Coding-Agent ist in Beta, und die Anleitung verlangt, dass ein Experte diese Änderungen vor dem Merge prüft.

Kombinieren Sie das mit Claude Code, Codex oder Copilot für die Entwicklung, verglichen in [Agentforce Vibes, Claude Code, Codex oder Copilot](../agentforce-vibes-claude-code-copilot-vergleich/), und eine Pipeline in Ihrem Besitz entscheidet, was in Produktion geht. Der Preis dafür ist der Support.

```pro-contra
pro: Ein bezahlter DevOps-Agent passt, wenn
- Ihrem Team eigenes Git- und Pipeline-Wissen fehlt
- Sie eine aufbereitete Sicht auf Org und Pipeline wollen
- der Hersteller die Governance-Schicht pflegen soll
- Sie für Setup und Support jemanden bezahlen wollen
contra: Open Source und Coding-Agent reichen, wenn
- Ihr Team bereits sfdx-hardis nutzt
- Sie Modell und damit Region selbst wählen wollen
- Sie oder Ihr Architekt das Setup verantworten
```

## Was sollten Sie vor dem Kauf fragen?

Diese Fragen würde ich jedem DevOps-Anbieter stellen, der einen KI-Agenten verkauft, und die Antworten ins Bestellformular schreiben lassen:

- Welches Modell und welcher Anbieter betreiben den Agenten, und informieren Sie uns vor einem Wechsel?
- In welcher Region werden Eingaben verarbeitet, und gibt es eine EU-Region?
- Wie lange werden Prompts, Code und Metadaten gespeichert, bei Ihnen und beim Modellanbieter, und fließen sie ins Training?
- Wie wird der Verbrauch gemessen, wo liegt die monatliche Obergrenze, und was passiert, wenn wir sie erreichen?
- Ist das Produkt allgemein verfügbar, in Beta oder im Pilot, und welches Service Level gilt?
- Wer gibt die Pull Requests des Agenten frei, und kann er jemals ohne Menschen deployen?
- Was passiert mit dem Kontext, den der Agent über unsere Org aufgebaut hat, wenn wir wechseln?

Die letzten beiden Fragen hängen mit Punkten zusammen, die ich an anderer Stelle beschreibe: Der Kunde sollte [seine DevOps-Tools selbst besitzen](../warum-kunden-devops-tools-selbst-besitzen-sollten/), und dieselben Regeln gehören in die [Verträge mit Partnern, die mit KI programmieren](../partner-ki-coding-regeln-vertrag/). Das Aufsetzen gehört zu meiner Arbeit im [DevOps- und Release-Management](../../leistungen/devops-und-release-management/), die breitere Werkzeugwahl steht in [Kapitel 4 der KI-Masterclass](../../masterclass/ki-salesforce/externe-coding-agenten/).

Ein DevOps-KI-Agent ist sein Geld wert, sobald der Anbieter Modell, Region und Aufbewahrung schriftlich beantwortet und ein Pilot in Ihrer eigenen Org Ihr heutiges Setup schlägt. Wenn Sie vor einer Bestellung von Agentia oder Cam eine zweite Meinung möchten, [schreiben Sie mir](#contact).
