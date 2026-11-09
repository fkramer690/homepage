---
title: "Nearshore-Salesforce-Teams mit KI-Agenten: was sich ändert"
description: "Was sich ändert, wenn Nearshore- und Offshore-Teams für Salesforce in Osteuropa oder Indien mit KI-Agenten arbeiten: Review-Last, Rollen, Einarbeitung und Zugriffsregeln."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: nearshore-salesforce-teams-ki-agenten
translationKey: nearshore-teams-with-ai-agents
topic: governance
categories: [architecture, ai]
tags: [Nearshore, KI-Coding, Code-Review, Einarbeitung, Partnersteuerung, Maschinenbau]
takeaways:
  - "Planen Sie die Review-Kapazität mit Wissen über Ihre Org und nicht die Zahl der Entwickler."
  - "In einer McKinsey-Umfrage melden Führungskräfte 11,8 Prozent Zeitersparnis, aber nur 6,2 Prozent weniger Nacharbeit: Tempo wächst schneller als Qualität."
  - "In einer Anthropic-Studie schnitten junge Entwickler, die eine Bibliothek mit KI lernten, im Test mit 50 statt 67 Prozent ab, am schwächsten beim Debugging."
  - "Jede Rotation im Team ist ein Zugriffsereignis: Werkzeugkonto, Org-Zugang und lokale Agenten-Transkripte werden pro Person aufgeräumt."
  - "Die Agenten-Einstellungen gehören dem Kunden, und Agenten bekommen nur Zugang zu Sandboxes und Scratch Orgs, nie Zugangsdaten für Produktion."
faq:
  - q: "Werden Nearshore-Teams für Salesforce mit KI-Agenten kleiner?"
    a: "Vielleicht, aber ich würde Entwickler erst reduzieren, wenn Durchlaufzeit und Nacharbeit gemessen sind. Sicherer ist zuerst eine andere Mischung: mehr Review-Kapazität mit Org-Wissen pro Team. Meine Startgröße von etwa acht Entwicklern pro eng gekoppeltem Strang gilt weiter, geprüft an den Review-Warteschlangen."
  - q: "Wer sollte KI-generierten Code aus einem Nearshore-Team prüfen?"
    a: "Zuerst ein Senior im Nearshore-Team, bei jedem Pull Request. Änderungen an gemeinsamen Objekten, Sharing, Datenmodell oder Schnittstellen brauchen zusätzlich die Freigabe des Code Owners auf Kundenseite; eine CODEOWNERS-Datei mit Branch Protection erzwingt diese Freigabe für die passenden Pfade im Repository."
  - q: "Sollten Junior-Entwickler im Nearshore-Team Coding-Agenten nutzen?"
    a: "Ja, mit Aufgaben, die Verständnis aufbauen, und mit gemessenen Ergebnissen. In der Studie von Anthropic schnitten Teilnehmende, die konzeptionelle Fragen stellten oder sich generierten Code erklären ließen, im Test deutlich besser ab als die, die die Arbeit ganz an die KI abgaben. Die Studie zeigt kurzfristiges Verständnis, keine langfristige Kompetenz."
  - q: "Welche Konten sollten Nearshore-Entwickler für Coding-Agenten nutzen?"
    a: "Kommerzielle Konten, die der Kunde stellt oder freigibt, nie private Tarife. Unter kommerziellen Bedingungen trainiert Anthropic nicht mit Claude-Code-Daten; bei Free, Pro und Max hängt das von einer Nutzereinstellung ab."
draft: false
---

Erzeugen Nearshore-Teams für Salesforce mit KI-Agenten mehr Änderungen pro Entwickler, kann das Review zum Engpass werden; messen Sie das, statt es anzunehmen. Für einen Hersteller wird die Review-Kapazität mit Wissen über Ihre Org und Ihre Prozesse zur Planungsgröße, nicht die Zahl der Entwickler. Die Einarbeitung kann beim Lesen einer fremden Org schneller gehen, kann aber das Urteilsvermögen überspringen, das ein Reviewer später braucht. Und jede Rotation im Team wird zum Zugriffsereignis: Werkzeugkonten, Org-Zugänge und lokale Agenten-Transkripte müssen pro Person aufgeräumt werden. Die Regeln aus meinem Nearshore-Artikel gelten weiter; mit Agenten wird es nur teurer, sie zu brechen.

## Was ändert sich für Nearshore-Teams in Salesforce mit KI-Agenten?

In [meinem Artikel zur Größe von Nearshore-Teams](../nearshore-teams-salesforce-acht-entwickler/) beschreibe ich, was Nearshore-Teams öfter bremst als fehlende Skills: Rotation, Fluktuation, zu senior besetzte Teams und fehlender Rückhalt beim Kunden. Coding-Agenten wie Claude Code, Codex, Copilot oder Agentforce Vibes beseitigen keinen davon. Sie verschieben den Druck: ins Review, in die Rollenmischung, in die Einarbeitung und auf die Zugriffe.

```praxis
Ich habe mit Nearshore-Teams in Osteuropa sowie Nearshore- und Offshore-Teams in Indien gearbeitet, und Rotation, Fluktuation, zu senior besetzte Teams und fehlender Rückhalt beim Kunden waren in beiden Regionen dieselben Bremsen.
```

Meine Startgröße von etwa acht Entwicklern pro eng gekoppeltem Strang und eine Mindestverweildauer, vereinbart vor dem ersten Sprint, bleiben, wie sie sind; die Acht prüfe ich an Abstimmungsaufwand und Review-Warteschlangen. Das Pod-Modell mit Architekt, Builder-Reviewer und Fachexperte beschreibe ich in [KI-native Delivery: kleinere Salesforce-Teams](../ki-kleinere-salesforce-teams-delivery/). Hier geht es um ein Team, das in einem anderen Land und einem anderen Unternehmen sitzt, nearshore in Osteuropa oder offshore in Indien.

## Warum wird das Review zum Engpass?

McKinsey hat 334 Produkt- und Engineering-Verantwortliche befragt und fasst zusammen: „Speed is improving faster than quality“ ([Beyond the copilot](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle)). Der [DORA-Report 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) warnt, dass ohne starke Tests, Versionskontrolle und schnelles Feedback „an increase in change volume leads to instability“. Veracode hat im Juli 2026 die [Sicherheits-Bestehensquote](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) von roher Modellausgabe gemessen. Apex-Ergebnisse enthält der Bericht nicht, die Zahlen sind also eine allgemeine Warnung, kein Salesforce-Benchmark.

```kennzahlen
11,8 % | gemeldete Zeitersparnis im Schnitt
6,2 % | gemeldet weniger Nacharbeit
56 % | Sicherheits-Bestehensquote für rohen KI-generierten Code
30 % | Sicherheits-Bestehensquote für Java
quelle: McKinsey, Beyond the copilot, August 2026; Veracode GenAI Code Security Report, Juli 2026
```

Wo Agenten das Änderungsvolumen tatsächlich erhöhen, landet es im Nearshore-Team bei sehr wenigen Personen. Das Review ist nicht der einzige mögliche Engpass: unklare Anforderungen, Testdaten, SAP-Abhängigkeiten und UAT-Kapazität können stärker bremsen. Die Mischung, die ich empfehle, wenige Seniors für Architektur und Reviews plus Entwickler, die gern umsetzen, funktioniert bei menschlichem Schreibtempo. Mit Agenten bekommen dieselben wenigen Seniors mehr und größere Pull Requests. Winken sie durch, landen die Fehler in Ihrer Integrations-Sandbox. Prüfen sie gründlich, wird der Zeitgewinn zur Wartezeit. Bei einem Team in Indien beginnt der Arbeitstag zudem Stunden vor Ihrem, ein Pull Request für Ihren Architekten wartet also, bis Deutschland online ist. Das würde ich aufsetzen:

- **Zwei Review-Stufen.** Ein Senior im Nearshore-Team prüft jeden Pull Request zuerst, mit den Prüfpunkten aus [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/). Änderungen an gemeinsamen Objekten, Sharing, Datenmodell oder Schnittstellen brauchen zusätzlich die Freigabe Ihres Code Owners. GitHub [fordert Code Owner automatisch an](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), wenn ein Pull Request ihre Dateien berührt, und Branch Protection kann ihre Freigabe zur Pflicht machen. Welche Objekte gemeinsam genutzt werden, legt die [Object Ownership Matrix](../object-ownership-matrix-salesforce/) fest.
- **Review-Stunden in den Vertrag.** Verträge nach Aufwand können zusätzliche Entwickler belohnen, solange Review-Kapazität und Ergebnisse nicht eigens gesteuert werden, und mit Agenten verlängert ein weiterer Entwickler vor allem die Review-Schlange.
- **Kleine Pull Requests mit dem Plan des Agenten.** Der Plan beantwortet die Frage, die der Reviewer sonst über die Zeitzone hinweg stellen müsste.
- **Nach Risiko sortieren.** McKinsey empfiehlt, dass Änderungen mit höherem Risiko „require stronger evidence and accountable human review“: kundenwirksames Verhalten, regulierte Daten, sicherheitskritischer Code. Bei einem Maschinenbauer gehen Garantieregeln, Preise und alles, was nach SAP bucht, an Ihren Reviewer; eine geänderte Beschriftung im Händlerportal nicht.

## Wer einen Agenten steuert, prüft mehr, als er tippt

Wer einen Agenten steuert, verbringt mehr Zeit mit Beschreiben, Prüfen und Korrigieren als mit Tippen. Salesforce beschreibt das für die eigenen Entwickler in [vier Kompetenzstufen](https://engineering.salesforce.com/how-salesforce-built-an-agentic-engineering-enablement-strategy-for-thousands-of-software-engineers/): AI-Assisted, AI-Validating, AI-Orchestrating und AI-Native. Auf der zweiten Stufe gilt: „Engineers shift from trusting AI output to validating it.“

Salesforce hat diese Stufen als gemeinsame Sprache fürs Lernen gebaut, nicht um Entwickler zu bewerten, also nutze ich sie fürs Coaching, nicht zur Partnerbewertung. Um ein vorgeschlagenes Team einzuschätzen, frage ich nach Belegen: Agenten-Pull-Requests, die die Seniors geprüft haben, ihre Fehlerdurchschlupfquote und wie sie die Werkzeuge einstellen. Die Seniors, die die Reviews tragen, sollten Agentenausgaben prüfen können, bevor Agenten Code für Produktion schreiben.

Die zweite Verschiebung betrifft das Fachwissen. Ein Agent kennt Apex und Flow. Er weiß zum Beispiel nicht, ob der Garantiebeginn bei Maschinen aus dem Händlerverkauf verlässlich ist oder ob ein Werk Ersatzteilnummern anders pflegt. Ein Nearshore-Team war immer weit weg von diesem Wissen, und mit Agenten wird eine falsche Annahme innerhalb von Stunden zu funktionierendem Code. Umso wichtiger wird der Fachexperte auf Ihrer Seite. Was das Team über Ihre Org lernt, gehört in die [KI-Regeldatei in Ihrem Repository](../ki-regeldatei-salesforce-repository/), damit es die nächste Rotation übersteht.

## Wie ändert sich die Einarbeitung mit Agenten?

Agenten können die ersten Wochen verkürzen, ob die Einarbeitung insgesamt schneller wird, sollten Sie aber messen, etwa an der Zeit bis zur ersten eigenständigen Änderung. Ein neuer Entwickler kann den Agenten die Metadaten in einer Sandbox lesen lassen und sich erklären lassen, welche Flows, Trigger und Validierungsregeln auf dem Arbeitsauftrag (Work Order) laufen, bevor er etwas ändert.

Das Risiko: Die neue Person baut nie das Verständnis eines Reviewers auf. In einer [Studie von Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills) vom Januar 2026 lernten 52 überwiegend junge Entwickler eine unbekannte Python-Bibliothek. Die Gruppe mit KI-Assistent erreichte im Test danach 50 Prozent, die Gruppe ohne 67 Prozent, mit der größten Lücke beim Debugging, und war nicht signifikant schneller. Wer konzeptionelle Fragen stellte oder sich generierten Code erklären ließ, kam auf etwa 65 bis 86 Prozent, wer Programmieren oder Debugging an die KI abgab, auf unter 40 Prozent. Die Stichprobe ist klein, und die Autoren erwarten bei agentischen Werkzeugen einen größeren Effekt.

Für ein Nearshore-Team zählt das, weil die Juniors von heute die Reviewer sind, die Sie nach der nächsten Rotation brauchen. Delegieren sie in den ersten Monaten alles, kann niemand einen Senior ersetzen, der geht.

Ich würde die Einarbeitung deshalb um Erklären herum bauen: Der Agent erklärt bestehende Automatisierung, die neue Person schreibt den Test, und Reviews fremder Agenten-Pull-Requests beginnen im ersten Monat. Einen Vier-Wochen-Plan finden Sie in [Kapitel 9 meiner Masterclass KI](../../masterclass/ki-salesforce/teamarbeit-und-delivery/). Etwa 38 Prozent der Befragten nennen bei McKinsey fehlende Lernzeit als eine der größten Hürden. Ich würde die Einarbeitungstage deshalb in den Nearshore-Plan schreiben und vereinbaren, wer sie bezahlt.

## Welche Zugriffsregeln gelten, wenn Nearshore-Entwickler Agenten nutzen?

Werkzeuge, Modellwege, Datenklassen und kein Produktionszugriff gehören in den Vertrag, siehe [Partner codet mit KI: was in den Vertrag gehört](../partner-ki-coding-regeln-vertrag/). Bei Nearshore-Teams werden drei Punkte schärfer, weil Personen wechseln.

**Einstellungen, die der Entwickler nicht ändern kann.** Laut [Dokumentation zu Berechtigungen](https://code.claude.com/docs/en/permissions) lassen sich die verwalteten Einstellungen (Managed Settings) von Claude Code nicht durch Nutzer- oder Projekteinstellungen überschreiben. Dorthin gehören Verbotsregeln wie `Read(./.env)` und `disableBypassPermissionsMode`, das Sitzungen ohne Freigabeabfragen verhindert. Das sind Richtlinien, keine dichte Grenze, denn Unterprozesse können Dateien trotzdem lesen; halten Sie Secrets außerhalb des Arbeitsverzeichnisses und nutzen Sie Sandboxing oder isolierte Entwicklungsumgebungen. Sorgen Sie dafür, dass Agentforce Vibes [für Produktion aus ist](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes), und halten Sie Produktions-Zugangsdaten von jedem anderen Coding-Agenten fern. Der lokale Salesforce DX MCP Server, der nur ausdrücklich freigegebene Orgs erreichte, hat am 2. November 2026 sein Lebensende erreicht, siehe [Ende des Salesforce DX MCP Server](../salesforce-dx-mcp-server-ende/).

**Rotation ist ein Zugriffsereignis.** Claude Code speichert Sitzungstranskripte standardmäßig 30 Tage im Klartext unter `~/.claude/projects/`, so [Anthropics Seite zur Datennutzung](https://code.claude.com/docs/en/data-usage). Verlässt ein Entwickler das Team, liegt auf seinem Laptop, was der Agent gelesen hat, und kommerzielle Konten halten Daten standardmäßig 30 Tage auf dem Server; mit Feedback gesendete Transkripte können deutlich länger liegen. Die Offboarding-Checkliste pro Person entfernt Werkzeugkonto und Org-Zugang, erfasst Repository-Klone, Caches und Cloud-Sitzungen, und der Partner bestätigt, dass lokale Transkripte mit Ihrem Code gelöscht sind. Feedback-Uploads würde ich zentral abschalten.

**Nur vereinbarte Datenklassen.** Nicht freigegebene personenbezogene, vertrauliche oder exportkontrollierte Daten bleiben aus dem Agentenkontext, egal wo der Entwickler sitzt; Sandboxes enthalten maskierte oder synthetische Daten. Servicefälle mit Kundennamen, Seriennummern und Händlerpreisen sind typische Beispiele. Wo Prompts verarbeitet werden, hängt vom Modellweg ab: Anthropics eigene API bietet als [Inferenzregion](https://platform.claude.com/docs/en/manage-claude/data-residency) nur „us“ und „global“, die Speicherung ist eine eigene Einstellung, und bei Bedrock oder Vertex gelten andere Regeln. Für Ihre eigenen Mitarbeitenden kommt der Betriebsrat dazu, siehe [KI-Coding-Werkzeuge, Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/).

## Rechenbeispiel: der Field-Service-Stream mit einem Nearshore-Team

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service für den Außendienst, einem Händlerportal und SAP. Ein Nearshore-Partner trägt den Field-Service-Stream mit sieben Entwicklern und einem Senior, der prüft; beim Kunden gibt es einen Architekten und einen Admin. Der Partner führt Coding-Agenten ein. Alle Zahlen sind Annahmen.

- **Vor den Agenten:** etwa 25 Pull Requests pro Sprint, erstes Review innerhalb eines Arbeitstags.
- **Nach vier Sprints:** etwa 40 größere Pull Requests pro Sprint. Die mittlere Wartezeit auf ein Review steigt auf drei Tage, und der Architekt des Kunden sieht mehr Änderungen an Work Order und Asset, die auch der Service-Stream nutzt.
- **Entscheidungen:** ein zweiter Reviewer beim Partner, abgerechnet als Review-Stunden, CODEOWNERS für Work Order, Asset und die SAP-Schnittstelle, und eine Größengrenze pro Pull Request.
- **Rotation im fünften Monat:** Die Offboarding-Checkliste läuft innerhalb eines Tages, und der Nachfolger startet mit zwei Wochen Erklär-Aufgaben zur Automatisierung der Arbeitsaufträge.

Ob der Stream schneller geworden ist, bleibt offen, bis Durchlaufzeit und Nacharbeit mit der Ausgangslage verglichen sind, siehe [KI-Nutzen im Salesforce-Projekt messen](../ki-nutzen-salesforce-projekt-messen/). Der zusätzliche Entwickler, den der Partner zuerst angeboten hat, hätte nur die Schlange verlängert.

## Reviewer pro Team zählen

1. **Reviewer pro Team zählen**, nicht nur Entwickler, und ihren Rückstau prüfen.
2. **Beim Partner Belege für Agenten-Reviews der Seniors anfordern**, keine Stufe pro Person.
3. **Code Owner festlegen** für gemeinsame Objekte, Sharing, Datenmodell und Schnittstellen.
4. **Managed Settings, Org-Allowlists und die Offboarding-Checkliste einrichten**, bevor Agenten Code schreiben.
5. **Einarbeitungszeit einplanen** und klären, wer sie bezahlt.
6. **Durchlaufzeit und Nacharbeit messen**, vorher und nachher.

Für Punkt 1 reicht ein Blick auf die offenen Pull Requests und darauf, wie lange sie im Schnitt auf ein Review warten. Teamaufstellungen, Review-Kapazität und Rotationsregeln zu planen, gehört zu meiner [Programmsteuerung mit Nearshore-Teams](../../leistungen/projektsteuerung-nearshore/).
