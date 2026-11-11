---
title: "Nearshore-Salesforce-Teams mit KI-Agenten: was sich ändert"
description: "Was sich ändert, wenn Nearshore- und Offshore-Teams für Salesforce mit KI-Agenten arbeiten: Review-Last, Rollen, Einarbeitung und Zugriffsregeln."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: nearshore-salesforce-teams-ki-agenten
translationKey: nearshore-teams-with-ai-agents
topic: governance
categories: [architecture, ai]
tags: [Nearshore, KI-Coding, Code-Review, Einarbeitung, Partnersteuerung, Maschinenbau]
takeaways:
  - "Planen Sie die Review-Kapazität nach dem verfügbaren Wissen über Ihre Org und nicht nach der Zahl der Entwickler."
  - "In einer McKinsey-Umfrage melden Führungskräfte 11,8 Prozent Zeitersparnis, aber nur 6,2 Prozent weniger Nacharbeit: Tempo wächst schneller als Qualität."
  - "In einer Anthropic-Studie schnitten Juniorentwickler, die eine Bibliothek mit KI lernten, im Test mit 50 statt 67 Prozent ab, am schwächsten beim Debugging."
  - "Jede Rotation im Team ist ein Zugriffsereignis: Werkzeugkonto, Org-Zugang und lokale Agenten-Transkripte müssen pro Person bereinigt werden."
  - "Die Agenten-Einstellungen gehören dem Kunden, und Agenten erhalten nur Zugang zu Sandboxes und Scratch Orgs, nie Zugangsdaten für die Produktion."
faq:
  - q: "Werden Nearshore-Teams für Salesforce mit KI-Agenten kleiner?"
    a: "Vielleicht, aber ich würde Entwickler erst reduzieren, wenn Durchlaufzeit und Nacharbeit gemessen sind. Sicherer ist zunächst eine andere Teamzusammensetzung: mehr Review-Kapazität durch Personen mit Org-Wissen pro Team. Meine Startgröße von etwa acht Entwicklern pro eng gekoppeltem Strang gilt weiter; ich überprüfe sie anhand der Review-Warteschlangen."
  - q: "Wer sollte KI-generierten Code aus einem Nearshore-Team prüfen?"
    a: "Ein Senior im Nearshore-Team prüft zuerst jeden Pull Request. Änderungen an gemeinsamen Objekten, Sharing, Datenmodell oder Schnittstellen brauchen zusätzlich die Freigabe des Code Owners auf Kundenseite; eine CODEOWNERS-Datei mit Branch Protection erzwingt diese Freigabe für die passenden Pfade im Repository."
  - q: "Sollten Junior-Entwickler im Nearshore-Team Coding-Agenten nutzen?"
    a: "Ja, sie sollten Aufgaben erhalten, die Verständnis aufbauen, und die Ergebnisse sollten gemessen werden. In der Studie von Anthropic schnitten Teilnehmende, die konzeptionelle Fragen stellten oder sich generierten Code erklären ließen, im Test deutlich besser ab als die, die die Arbeit ganz an die KI abgaben. Die Studie zeigt kurzfristiges Verständnis, keine langfristige Kompetenz."
  - q: "Welche Konten sollten Nearshore-Entwickler für Coding-Agenten nutzen?"
    a: "Nearshore-Entwickler sollten kommerzielle Konten nutzen, die der Kunde stellt oder freigibt, nie private Tarife. Unter kommerziellen Bedingungen trainiert Anthropic nicht mit Claude-Code-Daten; bei Free, Pro und Max hängt das von einer Nutzereinstellung ab."
draft: false
---

Erzeugen Nearshore-Teams für Salesforce mit KI-Agenten mehr Änderungen pro Entwickler, kann das Review zum Engpass werden; messen Sie das, statt es anzunehmen. Für einen Hersteller wird Review-Kapazität bei Personen, die Ihre Org und Ihre Prozesse kennen, zur Planungsgröße, nicht die Zahl der Entwickler. Das Einlesen in eine fremde Org kann durch Agenten schneller werden, baut aber nicht automatisch das Urteilsvermögen auf, das ein Reviewer später braucht. Und jede Rotation im Team wird zum Zugriffsereignis: Werkzeugkonten, Org-Zugänge und lokale Agenten-Transkripte müssen pro Person bereinigt werden. Die Regeln aus meinem Nearshore-Artikel gelten weiter; mit Agenten wird es nur teurer, sie zu brechen.

## Was ändert sich für Nearshore-Teams in Salesforce mit KI-Agenten?

In [meinem Artikel zur Größe von Nearshore-Teams](../nearshore-teams-salesforce-acht-entwickler/) beschreibe ich, was Nearshore-Teams öfter bremst als fehlende Skills: Rotation, Fluktuation, zu senior besetzte Teams und fehlender Rückhalt beim Kunden. Coding-Agenten wie Claude Code, Codex, Copilot oder Agentforce Vibes beseitigen keinen davon. Sie verschieben den Druck: ins Review, in die Rollenmischung, in die Einarbeitung und auf die Zugriffe.

```praxis
Ich habe mit Nearshore-Teams in Osteuropa sowie Nearshore- und Offshore-Teams in Indien gearbeitet, und Rotation, Fluktuation, zu senior besetzte Teams und fehlender Rückhalt beim Kunden waren in beiden Regionen dieselben Bremsen.
```

Meine Startgröße von etwa acht Entwicklern pro eng gekoppeltem Strang gilt weiterhin, ebenso eine vor dem ersten Sprint vereinbarte Mindestverweildauer. Die Größenordnung prüfe ich an Abstimmungsaufwand und Review-Warteschlangen. Das Pod-Modell mit Architekt, Builder-Reviewer und Fachexperte beschreibe ich in [KI-native Delivery: kleinere Salesforce-Teams](../ki-kleinere-salesforce-teams-delivery/). Hier geht es um ein Team, das in einem anderen Land und einem anderen Unternehmen angesiedelt ist, nearshore in Osteuropa oder offshore in Indien.

## Warum wird das Review zum Engpass?

McKinsey hat 334 Produkt- und Engineering-Verantwortliche befragt und fasst zusammen: „Speed is improving faster than quality“ ([Beyond the copilot](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle)). Der [DORA-Report 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) warnt, dass ohne starke Tests, Versionskontrolle und schnelles Feedback „an increase in change volume leads to instability“. Veracode hat im Juli 2026 die [Sicherheits-Bestehensquote](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) für rohe Modellausgabe gemessen. Apex-Ergebnisse enthält der Bericht nicht, die Zahlen sind also eine allgemeine Warnung, kein Salesforce-Benchmark.

```kennzahlen
11,8 % | von Führungskräften gemeldete Zeitersparnis im Schnitt
6,2 % | gemeldet weniger Nacharbeit
56 % | Sicherheits-Bestehensquote für rohen KI-generierten Code
30 % | Sicherheits-Bestehensquote für Java
quelle: McKinsey, Beyond the copilot, August 2026; Veracode GenAI Code Security Report, Juli 2026
```

Wo Agenten das Änderungsvolumen tatsächlich erhöhen, konzentriert sich die zusätzliche Review-Last im Nearshore-Team auf sehr wenige Personen. Das Review ist nicht der einzige mögliche Engpass: unklare Anforderungen, Testdaten, SAP-Abhängigkeiten und UAT-Kapazität können stärker bremsen. Die Mischung, die ich empfehle, wenige Seniors für Architektur und Reviews plus Entwickler, die gern umsetzen, funktioniert bei menschlichem Schreibtempo. Mit Agenten müssen dieselben wenigen Seniors mehr und größere Pull Requests prüfen. Geben sie diese zu schnell frei, gelangen die Fehler in Ihre Integrations-Sandbox. Prüfen sie gründlich, wird der Zeitgewinn zur Wartezeit. Bei einem Team in Indien beginnt der Arbeitstag zudem Stunden vor dem Arbeitstag Ihres deutschen Teams; ein Pull Request für Ihren Architekten wartet also, bis Deutschland online ist. Dafür würde ich Folgendes einrichten:

- **Zwei Review-Stufen.** Ein Senior im Nearshore-Team prüft jeden Pull Request zuerst, mit den Prüfpunkten aus [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/). Änderungen an gemeinsamen Objekten, Sharing, Datenmodell oder Schnittstellen brauchen zusätzlich die Freigabe Ihres Code Owners. GitHub [fordert Code Owner automatisch an](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners), wenn ein Pull Request ihre Dateien berührt, und Branch Protection kann ihre Freigabe zur Pflicht machen. Welche Objekte gemeinsam genutzt werden, legt die [Object Ownership Matrix](../object-ownership-matrix-salesforce/) fest.
- **Review-Stunden in den Vertrag.** Verträge nach Aufwand können Anreize für zusätzliche Entwickler setzen, solange Review-Kapazität und Ergebnisse nicht eigens gesteuert werden; mit Agenten verlängert ein weiterer Entwickler vor allem die Review-Schlange.
- **Kleine Pull Requests mit dem Plan des Agenten.** Der Plan beantwortet Fragen, die der Reviewer sonst über die Zeitzonengrenze hinweg stellen müsste.
- **Nach Risiko sortieren.** McKinsey empfiehlt, dass Änderungen mit höherem Risiko „require stronger evidence and accountable human review“: kundenwirksames Verhalten, regulierte Daten, sicherheitskritischer Code. Bei einem Maschinenbauer müssen Garantieregeln, Preise und alle Änderungen, die nach SAP buchen, von Ihrem Reviewer geprüft werden; eine geänderte Beschriftung im Händlerportal nicht.

## Wer einen Agenten steuert, prüft mehr, als er tippt

Wer einen Agenten steuert, verbringt mehr Zeit mit Beschreiben, Prüfen und Korrigieren als mit Tippen. Salesforce beschreibt das für die eigenen Entwickler in [vier Kompetenzstufen](https://engineering.salesforce.com/how-salesforce-built-an-agentic-engineering-enablement-strategy-for-thousands-of-software-engineers/): AI-Assisted, AI-Validating, AI-Orchestrating und AI-Native. Auf der zweiten Stufe gilt: „Engineers shift from trusting AI output to validating it.“

Salesforce hat diese Stufen als gemeinsame Sprache fürs Lernen entwickelt, nicht um Entwickler zu bewerten; deshalb nutze ich sie fürs Coaching, nicht zur Partnerbewertung. Um ein vorgeschlagenes Team einzuschätzen, frage ich nach Belegen: Agenten-Pull-Requests, die die Seniors geprüft haben, ihre Fehlerdurchschlupfquote und wie sie die Werkzeuge einstellen. Die Seniors, die die Reviews tragen, sollten Agentenausgaben bereits validieren, bevor Agenten Code für die Produktion schreiben.

Die zweite Verschiebung betrifft das Fachwissen. Ein Agent kennt Apex und Flow. Er weiß zum Beispiel nicht, ob der Garantiebeginn bei Maschinen aus dem Händlerverkauf verlässlich erfasst ist oder ob ein Werk Ersatzteilnummern anders pflegt. Ein Nearshore-Team war schon immer weit von diesem Wissen entfernt, und mit Agenten wird eine falsche Annahme innerhalb von Stunden zu funktionierendem Code. Umso wichtiger wird der Fachexperte auf Ihrer Seite. Was das Team über Ihre Org lernt, gehört in die [KI-Regeldatei in Ihrem Repository](../ki-regeldatei-salesforce-repository/), damit es die nächste Rotation übersteht.

## Wie ändert sich die Einarbeitung mit Agenten?

Agenten können die Einarbeitungsphase in den ersten Wochen verkürzen; ob die Einarbeitung insgesamt schneller wird, sollten Sie aber messen, etwa an der Zeit bis zur ersten eigenständigen Änderung. Ein neuer Entwickler kann den Agenten die Metadaten in einer Sandbox lesen lassen und sich erklären lassen, welche Flows, Trigger und Validierungsregeln für den Arbeitsauftrag (Work Order) ausgeführt werden, bevor er etwas ändert.

Das Risiko: Die neue Person baut nie das Verständnis eines Reviewers auf. In einer [Studie von Anthropic](https://www.anthropic.com/research/AI-assistance-coding-skills) vom Januar 2026 lernten 52 Entwickler, überwiegend auf Junior-Level, eine unbekannte Python-Bibliothek. Die Gruppe mit KI-Assistent erreichte im Test danach 50 Prozent, die Gruppe ohne 67 Prozent, mit der größten Lücke beim Debugging, und war nicht signifikant schneller. Wer konzeptionelle Fragen stellte oder sich generierten Code erklären ließ, erreichte etwa 65 bis 86 Prozent; wer Programmieren oder Debugging an die KI abgab, erreichte unter 40 Prozent. Die Stichprobe ist klein, und die Autoren erwarten bei agentischen Werkzeugen einen größeren Effekt.

Für ein Nearshore-Team zählt das, weil die Juniors von heute die Reviewer sind, die Sie nach der nächsten Rotation brauchen. Delegieren sie in den ersten Monaten alles, kann niemand einen Senior ersetzen, der das Team verlässt.

Ich würde die Einarbeitung deshalb auf Erklärphasen ausrichten: Der Agent erklärt bestehende Automatisierung, die neue Person schreibt den Test, und Reviews fremder Agenten-Pull-Requests beginnen im ersten Monat. Einen Vier-Wochen-Plan finden Sie in [Kapitel 9 meiner Masterclass KI](../../masterclass/ki-salesforce/teamarbeit-und-delivery/). Etwa 38 Prozent der Befragten nennen bei McKinsey fehlende Lernzeit als eine der größten Hürden. Ich würde die Einarbeitungstage deshalb im Nearshore-Plan festhalten und vereinbaren, wer sie bezahlt.

## Welche Zugriffsregeln gelten, wenn Nearshore-Entwickler Agenten nutzen?

Werkzeuge, Modellwege, Datenklassen und der Ausschluss von Produktionszugriff gehören in den Vertrag, siehe [Partner codet mit KI: was in den Vertrag gehört](../partner-ki-coding-regeln-vertrag/). Bei Nearshore-Teams müssen drei Punkte strenger geregelt werden, weil Personen wechseln.

**Einstellungen, die der Entwickler nicht ändern kann.** Laut [Dokumentation zu Berechtigungen](https://code.claude.com/docs/en/permissions) lassen sich die verwalteten Einstellungen (Managed Settings) von Claude Code nicht durch Nutzer- oder Projekteinstellungen überschreiben. Dorthin gehören Verbotsregeln wie `Read(./.env)` und `disableBypassPermissionsMode`, das Sitzungen ohne Freigabeabfragen verhindert. Das sind Richtlinien, keine belastbare Grenze, denn Unterprozesse können Dateien trotzdem lesen; halten Sie Secrets außerhalb des Arbeitsverzeichnisses und nutzen Sie Sandboxing oder isolierte Entwicklungsumgebungen. Sorgen Sie dafür, dass Agentforce Vibes [für die Produktion deaktiviert ist](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes), und halten Sie Produktions-Zugangsdaten von jedem anderen Coding-Agenten fern. Der lokale Salesforce DX MCP Server, der nur auf ausdrücklich freigegebene Orgs zugreifen konnte, hat am 2. November 2026 das Ende seines Lebenszyklus erreicht, siehe [Ende des Salesforce DX MCP Server](../salesforce-dx-mcp-server-ende/).

**Rotation ist ein Zugriffsereignis.** Claude Code speichert Sitzungstranskripte standardmäßig 30 Tage im Klartext unter `~/.claude/projects/`, so [Anthropics Seite zur Datennutzung](https://code.claude.com/docs/en/data-usage). Verlässt ein Entwickler das Team, verbleiben auf seinem Laptop die Daten, die der Agent gelesen hat. Bei kommerziellen Konten werden Daten standardmäßig 30 Tage auf dem Server gespeichert; mit Feedback gesendete Transkripte können deutlich länger aufbewahrt werden. In der Offboarding-Checkliste pro Person wird festgehalten, dass Werkzeugkonto und Org-Zugang entfernt, Repository-Klone, Caches und Cloud-Sitzungen erfasst und lokale Transkripte, die Ihren Code enthalten, gelöscht sind; der Partner bestätigt die Umsetzung. Feedback-Uploads würde ich zentral abschalten.

**Nur vereinbarte Datenklassen.** Nicht freigegebene personenbezogene, vertrauliche oder exportkontrollierte Daten bleiben aus dem Agentenkontext, unabhängig vom Standort des Entwicklers; Sandboxes enthalten maskierte oder synthetische Daten. Servicefälle mit Kundennamen, Seriennummern und Händlerpreisen sind typische Beispiele. Wo Prompts verarbeitet werden, hängt vom Modellweg ab: Anthropics eigene API bietet als [Inferenzregion](https://platform.claude.com/docs/en/manage-claude/data-residency) nur „us“ und „global“, die Speicherung wird separat konfiguriert, und bei Bedrock oder Vertex gelten andere Regeln. Für Ihre eigenen Mitarbeitenden muss zusätzlich der Betriebsrat eingebunden werden, siehe [KI-Coding-Werkzeuge, Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/).

## Rechenbeispiel: der Field-Service-Stream mit einem Nearshore-Team

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service für den Außendienst, einem Händlerportal und SAP. Ein Nearshore-Partner verantwortet den Field-Service-Stream mit sieben Entwicklern und einem Senior, der die Reviews übernimmt; beim Kunden gibt es einen Architekten und einen Admin. Der Partner führt Coding-Agenten ein. Alle Zahlen sind Annahmen.

- **Vor den Agenten:** etwa 25 Pull Requests pro Sprint, erstes Review innerhalb eines Arbeitstags.
- **Nach vier Sprints:** etwa 40 größere Pull Requests pro Sprint. Die mediane Wartezeit auf ein Review steigt auf drei Tage, und der Architekt des Kunden muss mehr Änderungen an Work Order und Asset prüfen, die auch der Service-Stream nutzt.
- **Entscheidungen:** ein zweiter Reviewer beim Partner, abgerechnet als Review-Stunden, CODEOWNERS für Work Order, Asset und die SAP-Schnittstelle, und eine Größengrenze pro Pull Request.
- **Rotation im fünften Monat:** Die Offboarding-Checkliste wird innerhalb eines Tages abgearbeitet, und der Nachfolger startet mit zwei Wochen Erklär-Aufgaben zur Automatisierung der Arbeitsaufträge.

Ob die Arbeit im Stream schneller geworden ist, bleibt offen, bis Durchlaufzeit und Nacharbeit mit der Ausgangslage verglichen sind, siehe [KI-Nutzen im Salesforce-Projekt messen](../ki-nutzen-salesforce-projekt-messen/). Der zusätzliche Entwickler, den der Partner zuerst angeboten hat, hätte nur die Schlange verlängert.

## Reviewer pro Team zählen

1. **Reviewer pro Team zählen**, nicht nur Entwickler, und ihren Rückstau prüfen.
2. **Beim Partner Belege für Agenten-Reviews der Seniors anfordern**, keine Stufe pro Person.
3. **Code Owner festlegen** für gemeinsame Objekte, Sharing, Datenmodell und Schnittstellen.
4. **Managed Settings, Org-Allowlists und die Offboarding-Checkliste einrichten**, bevor Agenten Code schreiben.
5. **Einarbeitungszeit einplanen** und klären, wer sie bezahlt.
6. **Durchlaufzeit und Nacharbeit messen**, vorher und nachher.

Für Punkt 1 reicht ein Blick auf die offenen Pull Requests und darauf, wie lange sie im Schnitt auf ein Review warten. Teamaufstellungen, Review-Kapazität und Rotationsregeln zu planen, gehört zu meiner [Programmsteuerung mit Nearshore-Teams](../../leistungen/projektsteuerung-nearshore/).
