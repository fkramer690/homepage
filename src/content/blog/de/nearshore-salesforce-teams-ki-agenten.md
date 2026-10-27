---
title: "Nearshore-Salesforce-Teams mit KI-Agenten: was sich ändert"
description: "Was sich ändert, wenn Nearshore-Teams für Salesforce in Osteuropa oder Indien mit KI-Agenten arbeiten: Review-Last, Rollen, Einarbeitung und Zugriffsregeln."
pubDate: 2026-10-27
lang: de
slug: nearshore-salesforce-teams-ki-agenten
translationKey: nearshore-teams-with-ai-agents
topic: governance
categories: [architecture, ai]
tags: [Nearshore, KI-Coding, Code-Review, Einarbeitung, Partnersteuerung, Maschinenbau]
takeaways:
  - "Arbeiten Nearshore-Teams für Salesforce mit KI-Agenten, wandert der Engpass vom Schreiben ins Review; geplant werden muss die Review-Kapazität mit Wissen über Ihre Org, nicht die Zahl der Entwickler."
  - "In McKinseys Umfrage von 2026 sparten Teams im Schnitt 11,8 Prozent Zeit, aber nur 6,2 Prozent Nacharbeit; es kommt also mehr Code beim Review an, ohne im selben Maß besser zu werden."
  - "In einer Studie von Anthropic erreichten überwiegend junge Entwickler, die eine neue Bibliothek mit KI-Assistent lernten, im Test danach 50 statt 67 Prozent, mit der größten Lücke beim Debugging."
  - "Jede Rotation im Nearshore-Team wird zum Zugriffsereignis: Werkzeugkonto, Org-Zugang und lokale Agenten-Transkripte, die Claude Code standardmäßig 30 Tage im Klartext speichert, werden pro Person aufgeräumt."
  - "Die Agenten-Einstellungen gehören dem Kunden: verwaltete Einstellungen, die Entwickler nicht überschreiben können, Agenten nur in Sandboxes und Scratch Orgs, Agentforce Vibes in Produktion deaktiviert."
faq:
  - q: "Werden Nearshore-Teams für Salesforce mit KI-Agenten kleiner?"
    a: "Vielleicht, aber ich würde Entwickler erst reduzieren, wenn Durchlaufzeit und Nacharbeit gemessen sind. Sicherer ist zuerst eine andere Mischung: mehr Review-Kapazität mit Org-Wissen pro Team. Die Obergrenze von etwa acht Entwicklern pro Team gilt weiter."
  - q: "Wer sollte KI-generierten Code aus einem Nearshore-Team prüfen?"
    a: "Zuerst ein Senior im Nearshore-Team, bei jedem Pull Request. Änderungen an gemeinsamen Objekten, Sharing, Datenmodell oder Schnittstellen brauchen zusätzlich die Freigabe des Code Owners auf Kundenseite; eine CODEOWNERS-Datei mit Branch Protection erzwingt das."
  - q: "Sollten Junior-Entwickler im Nearshore-Team Coding-Agenten nutzen?"
    a: "Ja, mit Aufgaben, die Verständnis aufbauen. In der Studie von Anthropic schnitten Teilnehmende, die konzeptionelle Fragen stellten oder sich generierten Code erklären ließen, im Test deutlich besser ab als die, die die Arbeit ganz an die KI abgaben."
  - q: "Welche Konten sollten Nearshore-Entwickler für Coding-Agenten nutzen?"
    a: "Kommerzielle Konten, die der Kunde stellt oder freigibt, nie private Tarife. Unter kommerziellen Bedingungen trainiert Anthropic nicht mit Claude-Code-Daten; bei Free, Pro und Max hängt das von einer Nutzereinstellung ab."
draft: false
---

Nearshore-Teams für Salesforce, die mit KI-Agenten arbeiten, erzeugen mehr Code pro Entwickler, und damit wandert der Engpass ins Review. Für einen Hersteller wird die Review-Kapazität mit Wissen über Ihre Org und Ihre Prozesse zur Planungsgröße, nicht die Zahl der Entwickler. Die Einarbeitung geht beim Lesen einer fremden Org schneller, kann aber das Urteilsvermögen überspringen, das ein Reviewer später braucht. Und jede Rotation im Team wird zum Zugriffsereignis: Werkzeugkonten, Org-Zugänge und lokale Agenten-Transkripte müssen pro Person aufgeräumt werden. Die Regeln aus meinem Nearshore-Artikel gelten weiter; mit Agenten wird es nur teurer, sie zu brechen.

## Was ändert sich für Nearshore-Teams in Salesforce mit KI-Agenten?

In [meinem Artikel zur Größe von Nearshore-Teams](../nearshore-teams-salesforce-acht-entwickler/) beschreibe ich, was Nearshore-Teams öfter bremst als fehlende Skills: Rotation, Fluktuation, zu senior besetzte Teams und fehlender Rückhalt beim Kunden. Ich habe mit Nearshore-Teams in Osteuropa und Indien gearbeitet, und diese Faktoren waren in beiden Regionen dieselben. Coding-Agenten wie Claude Code, Codex, Copilot oder Agentforce Vibes beseitigen keinen davon. Sie verschieben den Druck: ins Review, in die Rollenmischung, in die Einarbeitung und auf die Zugriffe.

Die Obergrenze von etwa acht Entwicklern pro Team und eine Mindestverweildauer, vereinbart vor dem ersten Sprint, bleiben, wie sie sind. Das Pod-Modell mit Architekt, Builder-Reviewer und Fachexperte beschreibe ich in [KI-native Delivery: kleinere Salesforce-Teams](../ki-kleinere-salesforce-teams-delivery/). Hier geht es um ein Team, das in einem anderen Land und einem anderen Unternehmen sitzt.

## Warum wird das Review zum Engpass?

In McKinseys Umfrage unter 334 Produkt- und Engineering-Verantwortlichen sparten die Befragten im Schnitt 11,8 Prozent Zeit, die Nacharbeit sank aber nur um 6,2 Prozent: „Speed is improving faster than quality“ ([Beyond the copilot](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle)). Der [DORA-Report 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) warnt, dass ohne starke Tests, Versionskontrolle und schnelles Feedback „an increase in change volume leads to instability“. Veracode hat im Juli 2026 für rohen KI-generierten Code eine [Sicherheits-Bestehensquote von 56 Prozent](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) gemessen, für Java, den nächsten Verwandten von Apex, 30 Prozent.

Im Nearshore-Team landet das bei sehr wenigen Personen. Die Mischung, die ich empfehle, wenige Seniors für Architektur und Reviews plus Entwickler, die gern umsetzen, funktioniert bei menschlichem Schreibtempo. Mit Agenten bekommen dieselben wenigen Seniors mehr und größere Pull Requests. Winken sie durch, landen die Fehler in Ihrer Integrations-Sandbox. Prüfen sie gründlich, wird der Zeitgewinn zur Wartezeit. Bei einem Team in Indien beginnt der Arbeitstag zudem Stunden vor Ihrem, ein Pull Request für Ihren Architekten wartet also, bis Deutschland online ist. Das würde ich aufsetzen:

- **Zwei Review-Stufen.** Ein Senior im Nearshore-Team prüft jeden Pull Request zuerst, mit den Prüfpunkten aus [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/). Änderungen an gemeinsamen Objekten, Sharing, Datenmodell oder Schnittstellen brauchen zusätzlich die Freigabe Ihres Code Owners. GitHub [fordert Code Owner automatisch an](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), wenn ein Pull Request ihre Dateien berührt, und Branch Protection kann ihre Freigabe zur Pflicht machen. Welche Objekte gemeinsam genutzt werden, legt die [Object Ownership Matrix](../object-ownership-matrix-salesforce/) fest.
- **Review-Stunden in den Vertrag.** Ein Partner, der nach Köpfen bezahlt wird, verdient an zusätzlichen Entwicklern, und mit Agenten verlängert ein weiterer Entwickler vor allem die Review-Schlange.
- **Kleine Pull Requests mit dem Plan des Agenten.** Der Plan beantwortet die Frage, die der Reviewer sonst über die Zeitzone hinweg stellen müsste.
- **Nach Risiko sortieren.** McKinsey empfiehlt, dass Änderungen mit höherem Risiko „require stronger evidence and accountable human review“: kundenwirksames Verhalten, regulierte Daten, sicherheitskritischer Code. Bei einem Maschinenbauer gehen Garantieregeln, Preise und alles, was nach SAP bucht, an Ihren Reviewer; eine geänderte Beschriftung im Händlerportal nicht.

## Welche Rollen verschieben sich im Nearshore-Team?

Wer einen Agenten steuert, verbringt mehr Zeit mit Beschreiben, Prüfen und Korrigieren als mit Tippen. Salesforce beschreibt das für die eigenen Entwickler in [vier Kompetenzstufen](https://engineering.salesforce.com/how-salesforce-built-an-agentic-engineering-enablement-strategy-for-thousands-of-software-engineers/): AI-Assisted, AI-Validating, AI-Orchestrating und AI-Native. Auf der zweiten Stufe gilt: „Engineers shift from trusting AI output to validating it.“

Dieses Raster würde ich nutzen, wenn ein Partner ein Nearshore-Team vorschlägt: Auf welcher Stufe arbeitet jede Person, und welche Agenten-Pull-Requests hat sie schon geprüft? Mindestens die Seniors, die die Reviews tragen, sollten auf der prüfenden Stufe sein, bevor Agenten Code für Produktion schreiben.

Die zweite Verschiebung betrifft das Fachwissen. Ein Agent kennt Apex und Flow. Er weiß zum Beispiel nicht, ob der Garantiebeginn bei Maschinen aus dem Händlerverkauf verlässlich ist oder ob ein Werk Ersatzteilnummern anders pflegt. Ein Nearshore-Team war immer weit weg von diesem Wissen, und mit Agenten wird eine falsche Annahme innerhalb von Stunden zu funktionierendem Code. Umso wichtiger wird der Fachexperte auf Ihrer Seite. Was das Team über Ihre Org lernt, gehört in die [KI-Regeldatei in Ihrem Repository](../ki-regeldatei-salesforce-repository/), damit es die nächste Rotation übersteht.

## Wie ändert sich die Einarbeitung mit Agenten?

Agenten verkürzen die ersten Wochen. Ein neuer Entwickler kann den Agenten die Metadaten in einer Sandbox lesen lassen und sich erklären lassen, welche Flows, Trigger und Validierungsregeln auf dem Arbeitsauftrag (Work Order) laufen, bevor er etwas ändert.

Das Risiko: Die neue Person baut nie das Verständnis eines Reviewers auf. In einer [Studie von Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills) vom Januar 2026 lernten 52 überwiegend junge Entwickler eine unbekannte Python-Bibliothek. Die Gruppe mit KI-Assistent erreichte im Test danach 50 Prozent, die Gruppe ohne 67 Prozent, mit der größten Lücke beim Debugging, und war nicht signifikant schneller. Wer konzeptionelle Fragen stellte oder sich generierten Code erklären ließ, kam auf etwa 65 bis 86 Prozent, wer Programmieren oder Debugging an die KI abgab, auf unter 40 Prozent. Die Stichprobe ist klein, und die Autoren erwarten bei agentischen Werkzeugen einen größeren Effekt.

Für ein Nearshore-Team zählt das, weil die Juniors von heute die Reviewer sind, die Sie nach der nächsten Rotation brauchen. Delegieren sie in den ersten Monaten alles, kann niemand einen Senior ersetzen, der geht.

Ich würde die Einarbeitung deshalb um Erklären herum bauen: Der Agent erklärt bestehende Automatisierung, die neue Person schreibt den Test, und Reviews fremder Agenten-Pull-Requests beginnen im ersten Monat. Einen Vier-Wochen-Plan finden Sie in [Kapitel 9 meiner Masterclass KI](../../masterclass-ki/teamarbeit-und-delivery/). Etwa 38 Prozent der Befragten nennen bei McKinsey fehlende Lernzeit als eine der größten Hürden. Ich würde die Einarbeitungstage deshalb in den Nearshore-Plan schreiben und vereinbaren, wer sie bezahlt.

## Welche Zugriffsregeln gelten, wenn Nearshore-Entwickler Agenten nutzen?

Werkzeuge, Modellwege, Datenklassen und kein Produktionszugriff gehören in den Vertrag, siehe [Partner codet mit KI: was in den Vertrag gehört](../partner-ki-coding-regeln-vertrag/). Bei Nearshore-Teams werden drei Punkte schärfer, weil Personen wechseln.

**Einstellungen, die der Entwickler nicht ändern kann.** Laut [Dokumentation zu Berechtigungen](https://code.claude.com/docs/en/permissions) lassen sich die verwalteten Einstellungen (Managed Settings) von Claude Code nicht durch Nutzer- oder Projekteinstellungen überschreiben. Dorthin gehören Verbotsregeln wie `Read(./.env)` und `disableBypassPermissionsMode`, das Sitzungen ohne Freigabeabfragen verhindert. Agentforce Vibes lässt sich [pro Org deaktivieren](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes), unter Setup, Agentforce Vibes Extensions; für Produktion würde ich das tun. Der lokale Salesforce DX MCP Server erreicht nur [ausdrücklich freigegebene Orgs](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-mcp.html); sein Lebensende beschreibe ich [hier](../salesforce-dx-mcp-server-ende/).

**Rotation ist ein Zugriffsereignis.** Claude Code speichert Sitzungstranskripte standardmäßig 30 Tage im Klartext unter `~/.claude/projects/`, so [Anthropics Seite zur Datennutzung](https://code.claude.com/docs/en/data-usage). Verlässt ein Entwickler das Team, liegt auf seinem Laptop, was der Agent gelesen hat. Die Offboarding-Checkliste pro Person entfernt Werkzeugkonto, Org-Zugang und Allowlist-Eintrag, und der Partner bestätigt, dass lokale Transkripte mit Ihrem Code gelöscht sind.

**Keine echten Daten im Agentenkontext.** Servicefälle mit Kundennamen, Seriennummern und Händlerpreisen bleiben draußen, egal wo der Entwickler sitzt. Wo Prompts verarbeitet werden, hängt vom Modellweg ab; Anthropics eigene API bietet als [Inferenzregion](https://platform.claude.com/docs/en/manage-claude/data-residency) nur „us“ und „global“. Für Ihre eigenen Mitarbeitenden kommt der Betriebsrat dazu, siehe [KI-Coding-Werkzeuge, Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/).

## Ein typisches Szenario: der Field-Service-Stream mit einem Nearshore-Team

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service für den Außendienst, einem Händlerportal und SAP. Ein Nearshore-Partner trägt den Field-Service-Stream mit sieben Entwicklern und einem Senior, der prüft; beim Kunden gibt es einen Architekten und einen Admin. Der Partner führt Coding-Agenten ein. Alle Zahlen sind Annahmen.

- **Vor den Agenten:** etwa 25 Pull Requests pro Sprint, erstes Review innerhalb eines Arbeitstags.
- **Nach vier Sprints:** etwa 40 größere Pull Requests pro Sprint. Die mittlere Wartezeit auf ein Review steigt auf drei Tage, und der Architekt des Kunden sieht mehr Änderungen an Work Order und Asset, die auch der Service-Stream nutzt.
- **Entscheidungen:** ein zweiter Reviewer beim Partner, abgerechnet als Review-Stunden, CODEOWNERS für Work Order, Asset und die SAP-Schnittstelle, und eine Größengrenze pro Pull Request.
- **Rotation im fünften Monat:** Die Offboarding-Checkliste läuft innerhalb eines Tages, und der Nachfolger startet mit zwei Wochen Erklär-Aufgaben zur Automatisierung der Arbeitsaufträge.

Ob der Stream schneller geworden ist, bleibt offen, bis Durchlaufzeit und Nacharbeit mit der Ausgangslage verglichen sind, siehe [KI-Nutzen im Salesforce-Projekt messen](../ki-nutzen-salesforce-projekt-messen/). Der zusätzliche Entwickler, den der Partner zuerst angeboten hat, hätte nur die Schlange verlängert.

## Wo sollten Sie anfangen?

1. **Reviewer pro Team zählen**, nicht nur Entwickler, und ihren Rückstau prüfen.
2. **Beim Partner die Agenten-Stufe pro Person abfragen.**
3. **Code Owner festlegen** für gemeinsame Objekte, Sharing, Datenmodell und Schnittstellen.
4. **Managed Settings, Org-Allowlists und die Offboarding-Checkliste einrichten**, bevor Agenten Code schreiben.
5. **Einarbeitungszeit einplanen** und klären, wer sie bezahlt.
6. **Durchlaufzeit und Nacharbeit messen**, vorher und nachher.

Teamaufstellungen, Review-Kapazität und Rotationsregeln zu planen, gehört zu meiner [Programmsteuerung mit Nearshore-Teams](../../leistungen/projektsteuerung-nearshore/).

Nearshore-Teams für Salesforce liefern mit KI-Agenten nur dann mehr, wenn Review-Kapazität, Einarbeitung und Zugriffsregeln mit dem Output wachsen. Wenn Sie Ihr Nearshore-Setup prüfen möchten, bevor die Agenten kommen, [schreiben Sie mir](#contact).
