---
title: "Coding-Agenten für Salesforce: Claude Code, Codex, Copilot"
description: "Welcher externe Coding-Agent passt zu Ihrem Salesforce-Team oder Partner? Vergleich nach Anbindung, Datenresidenz, Kosten und Governance für Hersteller."
lang: de
slug: externe-coding-agenten
translationKey: masterclass-04
chapter: 4
short: "Externe Coding-Agenten"
summary: "Claude Code, Codex, Copilot und DevOps-Agenten im Vergleich: was das Werkzeug entscheidet und was Vertrag, Datenresidenz und Regeln entscheiden."
takeaways:
  - "Claude Code, Codex, Copilot und Cursor können mit Salesforce arbeiten, weil Salesforce seine Skills und gehosteten MCP-Server für jeden kompatiblen Agenten öffnet."
  - "Einen unabhängigen Benchmark für Apex, LWC oder Flow gibt es nicht; testen Sie Kandidaten an 10 bis 20 Aufgaben aus Ihrem eigenen Backlog."
  - "Die First-Party-API von Anthropic bietet nur Inferenz in den USA oder global; regionale Verarbeitung für Claude gibt es über Amazon Bedrock oder Google Cloud."
  - "Anthropic nennt für Claude Code im Schnitt rund 13 $ pro Entwickler und aktivem Tag, OpenAI für Codex 100 bis 200 $ im Monat; der Seatpreis ist selten die echte Rechnung."
  - "Regeldatei, Pipeline und Freigabeliste der Werkzeuge gehören dem Kunden, damit ein Partner- oder Toolwechsel die Qualitätsregeln nicht mitnimmt."
articles: [vibes-claude-code-copilot-comparison, ai-coding-works-council-gdpr, ai-coding-costs-salesforce-project]
faq:
  - q: "Welcher Coding-Agent ist für Salesforce am besten?"
    a: "Öffentlich belegen lässt sich das nicht, weil es keinen unabhängigen Apex-Benchmark gibt. Dass Salesforce intern und in Agentforce Vibes auf Claude setzt, ist ein Signal. Entscheiden Sie nach einem kurzen Test an Ihrem eigenen Code und nach Vertrag, Datenresidenz und Kosten."
  - q: "Darf unser Partner mit eigenen KI-Werkzeugen an unserer Org arbeiten?"
    a: "Ja, wenn der Vertrag regelt, welche Werkzeuge und Modelle erlaubt sind, wo Daten verarbeitet werden, dass nur in Sandboxes gearbeitet wird und dass jede Änderung über Review und Pipeline läuft. Ohne diese Regeln wissen Sie nicht, wo Ihr Code und Ihre Testdaten landen."
  - q: "Gibt es Claude Code mit Verarbeitung in der EU?"
    a: "Über die First-Party-API von Anthropic nicht, dort gibt es nur die Inferenzorte USA und global. Amazon Bedrock und Google Cloud bieten regionale Endpunkte, laut Anthropic mit 10 Prozent Aufschlag. Welche Modelle in welcher EU-Region laufen, klären Sie mit dem Cloud-Anbieter."
  - q: "Muss der Betriebsrat der Einführung von Coding-Agenten zustimmen?"
    a: "In aller Regel ja. Laut CMS sind KI-Systeme regelmäßig objektiv geeignet, Verhaltens- oder Leistungsdaten zu erheben, und damit greift § 87 Abs. 1 Nr. 6 BetrVG. Planen Sie die Abstimmung vor dem Pilot ein."
draft: false
---

Für Salesforce-Arbeit taugen 2026 alle großen Coding-Agenten, von Claude Code über OpenAI Codex bis GitHub Copilot. Der Grund liegt bei Salesforce: Skills und gehostete MCP-Server funktionieren mit jedem kompatiblen Agenten. Welches Werkzeug Ihr Team oder Ihr Partner nutzt, bestimmt die Codequalität deshalb weniger als Regeldatei, Review und Pipeline. Für einen Hersteller zählen bei der Auswahl vier Fragen: Wo werden Code und Daten verarbeitet, was steht im Vertrag, wie wird abgerechnet und wer kontrolliert die Regeln. Einen unabhängigen Apex-Benchmark, der das beste Modell kürt, gibt es nicht.

## Welche Coding-Agenten kommen für Salesforce infrage?

Ein Coding-Agent ist ein KI-Werkzeug, das selbst Dateien liest, Befehle ausführt, Tests startet und Änderungen als Commit oder Pull Request vorbereitet. Salesforces eigenes Werkzeug, Agentforce Vibes, beschreibe ich in [Kapitel 2](../salesforce-werkzeuge-ki-entwicklung/). Hier geht es um die externen Agenten, die Ihre Entwickler oder Ihr Implementierungspartner oft schon auf dem Laptop haben.

| Werkzeug | Anbieter | Salesforce-Anbindung | Abrechnung |
|---|---|---|---|
| Claude Code | Anthropic | offizielles Plugin `salesforce-development` mit rund 40 Skills und drei MCP-Servern | Seat mit Kontingent (Team, Enterprise) oder Token über API und Cloud-Anbieter |
| OpenAI Codex | OpenAI | Skills-Bibliothek sf-skills, von Salesforce als kompatibel genannt | Credits pro Token, in ChatGPT-Plänen enthalten |
| GitHub Copilot | GitHub | MCP-Client in VS Code, Agent HQ mit Claude- und Codex-Agenten | Seat mit AI Credits zu 0,01 $ |
| Cursor | Anysphere | von Salesforce für sf-skills und Hosted MCP als kompatibel genannt | Preise vor Einsatz beim Anbieter prüfen |
| Agentforce Vibes (zum Vergleich) | Salesforce | nativ, Skills vorinstalliert | Flex Credits oder Unmetered-Lizenz |

Das Plugin für Claude Code nennt Salesforce [„our first official plugin, built for Claude Code“](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin). Es bündelt etwa 40 der über 100 Skills aus der offenen Bibliothek sf-skills und richtet die MCP-Server salesforce-api-context, salesforce-metadata-experts und salesforce-lsp ein. Für OpenCode, Codex und Cursor nennt Salesforce dieselbe Skills-Bibliothek als installierbar, ein offizielles Plugin für diese Agenten hat Salesforce bisher nicht veröffentlicht. Die gehosteten MCP-Server lassen sich laut [Summer-'26-Guide](https://developer.salesforce.com/blogs/2026/06/the-salesforce-developers-guide-to-the-summer-26-release) mit „any MCP-compatible AI client, such as Claude, ChatGPT, Cursor“ verbinden. GitHub hebt Copilot mit [Agent HQ](https://github.blog/news-insights/company-news/pick-your-agent-use-claude-and-codex-on-agent-hq/) sogar eine Ebene höher: Seit Februar 2026 laufen dort Claude- und Codex-Agenten neben dem eigenen Agenten, damals als Public Preview für Copilot Pro+ und Enterprise.

Praktisch heißt das: Claude Code bringt heute das meiste fertig verpackte Salesforce-Setup mit. Bei den anderen Agenten richtet Ihr Team Skills und MCP-Server selbst ein. Den ausführlichen Vergleich nach Vertrag, EU-Datenresidenz, Kostenmodell und Governance finden Sie in [Agentforce Vibes, Claude Code oder Copilot](../../blog/agentforce-vibes-claude-code-copilot/). Wer noch den lokalen Salesforce DX MCP Server nutzt, findet die nötige Umstellung in [Kapitel 3](../mcp-und-schnittstellen/).

## Warum das Werkzeug weniger entscheidet als Regeln und Pipeline

Salesforce hat zur TDX 2026 angekündigt, dass alles auf der Plattform zu einer API, einem MCP-Tool oder einem CLI-Befehl wird, und dabei laut [SalesforceBen](https://www.salesforceben.com/salesforce-headless-360-and-agentforce-vibes-2-0-revealed-at-tdx-2026/) Claude Code, Cursor, Codex und Windsurf ausdrücklich genannt. Die Salesforce-Kompetenz eines Agenten kommt damit aus Skills, MCP-Servern und Ihren Projektregeln, weniger aus dem Werkzeug selbst.

Die Regeln stehen in einer Regeldatei im Repository, etwa `CLAUDE.md` oder `AGENTS.md`. Sie beschreibt Namenskonventionen, verbotene Muster und die Definition of Done. Der Copilot Coding Agent liest laut [GitHub Changelog](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions) neben den eigenen Formaten auch `AGENTS.md`, `CLAUDE.md` und `GEMINI.md`. Eine gut gepflegte Datei im Kunden-Repository wirkt also über mehrere Werkzeuge hinweg. Warum diese Datei dem Kunden gehören sollte, steht in [der KI-Regeldatei im Salesforce-Repository](../../blog/ki-regeldatei-salesforce-repository/) und grundsätzlich in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/).

### Kein Benchmark für Apex

Einen unabhängigen, öffentlichen Benchmark, der Claude, GPT und Gemini an Apex, LWC oder Flow misst, habe ich nicht gefunden. Salesforce selbst hat für seine früheren Code-Modelle CodeGen2.5 und xGen-Code [bessere Genauigkeit behauptet](https://www.salesforce.com/blog/agentforce-developers-llms/), aber keine Messwerte veröffentlicht, nur eine interne Umfrage mit rund 125 eingesparten Minuten pro Woche. Was es gibt, sind Sicherheitsdaten: Veracode misst im [GenAI Code Security Report 2026](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) eine Sicherheits-Passrate von 56 Prozent für KI-generierten Code, bei Java nur 30 Prozent. Apex ist Java syntaktisch nah, ich würde diese Zahl ernst nehmen.

Ein Signal ist die Wahl von Salesforce selbst. Agentforce Vibes ist laut [GA-Ankündigung](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0) „powered by Claude and the Mastra agent orchestration engines“, und Salesforce stellt laut [Claudeforce-Pressemitteilung](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) Claude Code und Claude Enterprise allen eigenen Entwicklern und Wissensarbeitern bereit. Ein Signal ersetzt aber keine Messung an Ihrem Code. Ich empfehle eine kleine eigene Testsuite: 10 bis 20 Aufgaben aus Ihrem Backlog, etwa ein Trigger-Handler mit Bulk-Test, eine LWC für das Händlerportal und eine Flow-Änderung im Garantieprozess. Gemessen werden Deploy-Erfolg, Testergebnis und die Zahl der Review-Befunde. Welche Prüfungen jeder KI-Code bestehen muss, beschreibt [Kapitel 8](../best-practices-ki-code/).

## Anthropic, OpenAI und Google: was die Partnerschaften bedeuten

Trennen Sie zwei Entscheidungen: welches Modell Ihre Agentforce-Agenten zur Laufzeit nutzen, etwa ein Serviceagent für Händleranfragen, und welchen Coding-Agenten Ihre Entwickler nutzen. Die Partnerschaften von Salesforce wirken auf beides unterschiedlich.

| Anbieter | In Agentforce zur Laufzeit | In der Entwicklung | Meine Einordnung |
|---|---|---|---|
| Anthropic | Claude über Amazon Bedrock innerhalb der Salesforce Trust Boundary; ein Reasoning-Modell der Atlas Reasoning Engine | Standard in Agentforce Vibes; Claude Code für Salesforce-Mitarbeitende | tiefste Integration; Kunden bekommen Plugin und Skills, keine Claude-Code-Lizenzen |
| OpenAI | GPT-4o bis GPT-5.6, von Partnern betrieben in einer „shared trust zone“ | GPT-Modelle in Vibes wählbar; Codex mit sf-skills | breite Modellauswahl, EU-Datenresidenz für API-Projekte |
| Google | Gemini 2.5 bis 3.6 über Vertex AI; Gemini Enterprise laut SalesforceBen GA in der Reasoning Engine | die Vibes-Ankündigung nennt nur Claude und GPT | relevant für Agentforce, kaum für den Codepfad |

Quellen: [Supported Models](https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html), [Anthropic, Oktober 2025](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership), [Claudeforce](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/), [SalesforceBen zur Dreamforce 2026](https://www.salesforceben.com/biggest-dreamforce-26-announcements-everything-in-a-nutshell/).

Ein Detail für Ihre Architektur: Die Seite Supported Models listet Claude derzeit bis Sonnet 5 und Opus 4.8 und beschreibt das Modell „Salesforce Default“ als „managed mix of trusted models (currently including GPT-4o)“. Pressemitteilung und Dokumentation laufen also nicht im Gleichschritt. Prüfen Sie im Setup, welches Modell Ihr Agent tatsächlich nutzt, statt sich auf die Ankündigung zu verlassen.

## Wo werden Code, Metadaten und Testdaten verarbeitet?

Bei Herstellern steckt im Repository mehr, als man denkt: Preisfindung, Rabattfreigaben, Händlerkonditionen und die Schnittstellendefinitionen zu SAP. Noch heikler sind die Prompts. Wer einem Agenten Fehlerlogs aus einer Full-Copy-Sandbox gibt, schickt Kunden- und Händlerdaten an das Modell. Deshalb gehört die Frage nach dem Verarbeitungsort vor die Werkzeugwahl.

| Weg | Verarbeitungsort | Offen |
|---|---|---|
| Anthropic First-Party-API (auch Claude Code über die Console) | Inferenz „us“ oder „global“, Speicherung im Workspace nur USA | keine EU-Option |
| Claude über Amazon Bedrock oder Google Cloud | regionale Endpunkte, laut Anthropic mit 10 % Aufschlag gegenüber global | welche Modelle in welcher EU-Region, beim Cloud-Anbieter klären |
| Claude Code auf Team- oder Enterprise-Seats | in den geprüften Quellen keine EU-Option gefunden | vertraglich mit Anthropic klären |
| OpenAI API mit EU-Projekt | Verarbeitung in der Region, Anfragen und Antworten ohne Speicherung | ob Codex abgedeckt ist, sagt OpenAI dort nicht |
| ChatGPT Enterprise mit EU-Workspace | Speicherung in Europa, seit Januar 2026 optional Inferenz in Europa | dasselbe für Codex |
| GitHub Copilot | GitHub Enterprise Cloud mit Datenresidenz existiert | wo Copilot-Modellaufrufe laufen, bei GitHub erfragen |

Quellen: [Anthropic Data Residency](https://platform.claude.com/docs/en/manage-claude/data-residency), [Anthropic Pricing](https://platform.claude.com/docs/en/about-claude/pricing), [OpenAI Data Residency in Europe](https://openai.com/index/introducing-data-residency-in-europe/), [GitHub Changelog September 2026](https://github.blog/changelog/month/09-2026/).

Dazu kommt das Arbeitsrecht. Laut [CMS](https://cms.law/de/deu/legal-updates/ki-transformation-und-betriebsrat-mitbestimmung-richtig-gestalten) sind KI-Systeme regelmäßig objektiv geeignet, Verhaltens- oder Leistungsdaten zu erheben, und der Arbeitgeber darf sie ohne Zustimmung des Betriebsrats oder Spruch der Einigungsstelle nicht einführen. Coding-Agenten mit Nutzungsstatistiken fallen klar darunter. Wie Sie Betriebsrat und DSGVO früh einbinden, beschreibe ich in [KI-Coding, Betriebsrat und DSGVO](../../blog/ki-coding-betriebsrat-dsgvo/).

## Was kosten Coding-Agenten pro Entwickler?

Alle großen Anbieter rechnen inzwischen nach Token ab. Der Seatpreis kauft ein Kontingent, keine unbegrenzte Nutzung.

| Werkzeug | Abrechnung | Richtwert laut Anbieter |
|---|---|---|
| Claude Code | Token; auf Team und Enterprise aus einem Seat-Kontingent mit Fünf-Stunden- und Wochenfenster | rund 13 $ pro aktivem Tag, 150 bis 250 $ pro Monat, bei 90 % der Nutzer unter 30 $ pro aktivem Tag |
| OpenAI Codex | Credits pro Million Token, seit April 2026 | 100 bis 200 $ pro Entwickler und Monat; eine Aufgabe mit GPT-5.6 Sol braucht 5 bis 40 Credits |
| Copilot Business / Enterprise | 19 $ / 39 $ pro Nutzer und Monat mit 1.900 / 3.900 AI Credits, unternehmensweit gepoolt | 1 Credit = 0,01 $, Verbrauch nach Modell und Token |
| Agentforce Vibes | Flex Credits in Einheiten zu 2.000 Token, oder Unmetered-Lizenz | Premium-Modell begrenzt auf 2.500 Requests oder 36 Mio. Token in 30 Tagen, danach Flex Credits oder GPT-5 |

Quellen: [Claude Code Costs](https://code.claude.com/docs/en/costs), [Codex Rate Card](https://help.openai.com/en/articles/20001106-codex-rate-card-2), [GitHub Copilot Plans](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan), [Vibes Usage and Billing](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html).

Wer bei Copilot nur den Seatpreis sieht, unterschätzt den agentischen Einsatz. 1.900 Credits entsprechen 19 $ Modellnutzung. Ein Entwickler, der agentisch so viel verbraucht wie der Claude-Code-Durchschnitt von 13 $ am Tag, hat seinen Anteil am Pool nach eineinhalb Arbeitstagen aufgebraucht. Die Rechnung für ein ganzes Projekt und die Frage, ob Kunde oder Partner zahlt, stehen in [was KI-Coding im Salesforce-Projekt kostet](../../blog/ki-coding-kosten-salesforce-projekt/). Token-Preise und Caching vertieft [Kapitel 7](../kosten-und-token/).

## Und die Salesforce-spezifischen DevOps-Agenten?

Die DevOps-Anbieter haben 2026 eigene Agenten gebracht. Sie ersetzen den Coding-Agenten nicht, sie steuern, was davon in Produktion kommt.

- **Gearset Cam** übernimmt laut [Ankündigung vom 2. September 2026](https://assets.gearset.com/2026/09/01112431/Gearset-2026-Cam-Announcement.pdf) ein Ticket bis zum Pull Request und prüft vorher, ob die Änderung deploybar ist. In Piloten lieferte Cam bis zu 44 Prozent der Pull Requests eines Teams, bei einem Kunden wurden 75 Prozent davon gemergt. Das sind Herstellerzahlen.
- **Copado Agentia Headless** bringt Copados Agenten in IDE und Terminal und ist laut [Copado](https://www.copado.com/dreamforce-2026-copado) allgemein verfügbar.
- **Provar MCP** ist laut [Provar](https://provar.com/blog/product/provar-mcp-bringing-ai-to-salesforce-test-automation/) ein Open-Source-Plugin für die Salesforce CLI, das Tests erzeugt und gegen über 240 Regeln prüft. Es läuft mit Claude, Copilot und Cursor und kostet mit einer Provar-Automation-Lizenz nichts extra.

Weder Gearset noch Copado nennen in diesen Quellen das zugrunde liegende Modell. Für einen Hersteller mit Datenschutzvorgaben ist das eine Due-Diligence-Frage: welches Modell, welche Region, welche Aufbewahrung.

## Ein typisches Szenario: Werkzeugwahl bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit SAP S/4HANA, Service Cloud und einem Händlerportal auf Experience Cloud. Drei interne Entwickler arbeiten mit einem Partner, der fünf Nearshore-Entwickler stellt. Alle Zahlen sind Annahmen. Die internen Entwickler haben Copilot Business über die bestehende GitHub-Lizenz, der Partner möchte Claude Code mit eigenen Konten nutzen.

So würde ich vorgehen:

1. **Freigabeliste festlegen.** Copilot bleibt, Claude Code kommt dazu, aber über ein Konto des Kunden, entweder Enterprise-Seats oder Bedrock mit regionalem Endpunkt. Private Konten des Partners schließe ich aus, weil dann niemand weiß, wo Code und Logs landen.
2. **Regeldatei im Kunden-Repository.** Eine `AGENTS.md` als gemeinsame Basis, die Copilot liest, plus eine kurze `CLAUDE.md`, die darauf verweist. Verantwortlich ist der interne Architekt, nicht der Partner.
3. **Arbeitsorte begrenzen.** Agenten arbeiten nur in Developer-Sandboxes ohne Produktivdaten. Händlerdaten aus der Full-Copy-Sandbox gehören nicht in Prompts.
4. **Kosten realistisch schätzen.** Acht Entwickler mit angenommen 15 aktiven Tagen kosten beim Anthropic-Durchschnitt von 13 $ rund 1.560 $ im Monat. Hätten alle acht Copilot Business, wären es 152 $ Seatpreis, der gepoolte Rahmen von 15.200 Credits deckt aber nur 152 $ Modellnutzung ab. Bei ähnlich intensiver agentischer Arbeit landen beide Werkzeuge in derselben Größenordnung.
5. **Vertrag anpassen.** Der Partner legt offen, welche Werkzeuge und Modelle er nutzt, und die Kosten werden entweder in den Tagessatz eingepreist oder durchgereicht. Was in den SOW gehört, steht in [Partner, KI-Coding und Vertrag](../../blog/partner-ki-coding-regeln-vertrag/).
6. **Mit der Testsuite starten.** 15 Aufgaben aus dem Backlog, beide Werkzeuge, gleiche Gates. Danach entscheidet das Ergebnis, nicht die Vorliebe einzelner Entwickler.

Nach meiner Einschätzung dauert in so einem Setup die Abstimmung mit Betriebsrat und Datenschutz länger als die Werkzeugauswahl. Planen Sie sie deshalb zuerst ein. Die Steuerung mehrerer Partner mit unterschiedlichen Werkzeugen ist Teil meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/), die Gates gehören ins [DevOps und Release Management](../../leistungen/devops-und-release-management/). Wie Salesforce sein Partnermodell gerade auf Agenten umstellt, behandelt [Kapitel 5](../aiforce-und-systemintegratoren/).

Wählen Sie den Coding-Agenten nach Vertrag, Datenresidenz und Kosten, und legen Sie die Qualität in Regeldatei, Review und Pipeline, die Ihnen gehören. Wenn Sie Ihre Freigabeliste oder die Regeln für Ihren Partner gegenprüfen lassen möchten, [schreiben Sie mir](#contact).
