---
title: "KI-Coding-Tools in Deutschland: Betriebsrat und DSGVO"
description: "Claude Code, Copilot oder Codex an einem deutschen Standort einführen: wann der Betriebsrat zustimmt, was in die Betriebsvereinbarung gehört, wo Ihr Code läuft."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: ki-coding-betriebsrat-dsgvo
translationKey: ai-coding-works-council-gdpr
topic: governance
categories: [architecture, ai]
tags: [KI-Coding, Betriebsrat, DSGVO, Datenresidenz, Claude Code, GitHub Copilot]
takeaways:
  - "Gibt es einen Betriebsrat und kann das Tool Beschäftigte überwachen, braucht es laut CMS seine Zustimmung oder einen Spruch der Einigungsstelle."
  - "Claude Code zeigt Admins akzeptierte Codezeilen pro Person, GitHub liefert Copilot-Metriken pro Nutzer, und genau das regelt die Betriebsvereinbarung."
  - "EU-Inferenz bieten Bedrock mit festen EU-Profilen, Copilot auf GitHub Enterprise Cloud mit Datenresidenz und OpenAI. Die Anthropic-API hat keine EU-Region."
  - "Ein Eilbeschluss von 2024 sah bei privaten Konten in einem Sonderfall kein Mitbestimmungsrecht. Das ist kein Freibrief, und es gelten Verbraucherbedingungen."
  - "Planen Sie Betriebsrat und Datenschutz vor dem Pilotprojekt und trennen Sie die Einführung des Tools von späteren Änderungen an Teamgrößen oder Rollen."
faq:
  - q: "Muss der Betriebsrat Claude Code oder GitHub Copilot zustimmen?"
    a: "In aller Regel ja, wenn das Unternehmen die Konten bereitstellt. Laut CMS reicht die objektive Möglichkeit, Leistung oder Verhalten zu überwachen, eine Absicht ist nicht nötig. Beide Tools erzeugen Nutzungsdaten pro Person. Dieser Beitrag ist keine Rechtsberatung."
  - q: "Gibt es Claude Code mit Datenverarbeitung in der EU?"
    a: "Über die Anthropic-API geht das nicht; sie bietet für die Inferenz nur „us“ oder „global“ an. Über Amazon Bedrock bevorzugt Claude Code in einer EU-Region die EU-Inferenzprofile, garantiert ist das aber nicht: Legen Sie EU-Profile fest und sperren Sie andere per IAM. Alternativ stehen Claude-Modelle in GitHub Copilot für Unternehmen auf GitHub Enterprise Cloud mit EU-Datenresidenz zur Verfügung."
  - q: "Brauche ich einen Auftragsverarbeitungsvertrag mit Anthropic?"
    a: "Laut Anthropic ist das DPA mit Standardvertragsklauseln automatisch Teil der Commercial Terms, gilt also für Team, Enterprise und API. Wer Claude über Amazon Bedrock nutzt, fällt unter die Bedingungen von AWS. Ob das Ihren Anforderungen genügt, entscheidet Ihr Unternehmen als Verantwortlicher nach Beratung durch den Datenschutzbeauftragten."
  - q: "Dürfen Entwickler einfach private KI-Konten nutzen?"
    a: "Ich rate davon ab. Das Arbeitsgericht Hamburg sah 2024 in einem erstinstanzlichen Eilverfahren bei privaten ChatGPT-Konten kein Mitbestimmungsrecht, weil der Arbeitgeber keine Daten erhält. Das Gericht stützte sich auf diese besondere Konstellation, eine allgemeine Ausnahme ist das nicht. Dafür unterliegt Ihr Code dann Verbraucherbedingungen, bei Claude etwa mit Training je nach Nutzereinstellung."
  - q: "Gilt das auch für Standorte außerhalb Deutschlands?"
    a: "Die Regeln zum Betriebsrat sind deutsches Recht und gelten für Ihre deutschen Standorte und deren Beschäftigte. Die DSGVO gilt in der ganzen EU. Manche Konzerne mit deutschen Werken oder Entwicklungszentren entscheiden sich deshalb womöglich, den deutschen Prozess als Konzernstandard für KI-Tools zu nutzen."
draft: false
---

Wer Claude Code, GitHub Copilot oder Codex für Salesforce-Entwickler an einem deutschen Standort einführt, braucht in aller Regel die Zustimmung des Betriebsrats nach § 87 Abs. 1 Nr. 6 BetrVG, weil diese Tools Nutzungsdaten pro Person erzeugen können. Beim Datenschutz geht es darum, welche Daten über welchen Kanal Ihre Umgebung verlassen, vom Kontext des Agenten bis zur Region der Inferenz. Die Anthropic-API bietet keine EU-Region; Bedrock, Copilot und OpenAI bieten EU-Verarbeitung unter bestimmten Bedingungen. Planen Sie beides vor dem Pilotprojekt, denn wo es einen Betriebsrat gibt, darf das Tool ohne dessen Zustimmung oder einen Spruch der Einigungsstelle nicht in Betrieb gehen.

Vorweg: Ich bin Salesforce-Architekt, kein Anwalt. Was folgt, ist meine technische Sicht auf die Fragen, die Betriebsrat und Datenschutzbeauftragte stellen werden. Es ist keine Rechtsberatung. Die Betriebsvereinbarung und die Bewertung der Datenübermittlung gehören in die Hände Ihrer Rechtsabteilung oder eines Fachanwalts.

## Warum muss ein bestehender Betriebsrat einem KI-Coding-Tool zustimmen?

Ein Betriebsrat ist die gewählte Interessenvertretung der Beschäftigten an einem deutschen Standort. § 87 Abs. 1 Nr. 6 BetrVG gibt ihm ein Mitbestimmungsrecht bei technischen Einrichtungen, die geeignet sind, Verhalten oder Leistung der Beschäftigten zu überwachen. Laut einer [Analyse von CMS vom Juli 2026](https://cms.law/de/deu/legal-updates/ki-transformation-und-betriebsrat-mitbestimmung-richtig-gestalten) bestehen bei KI-Systemen „in aller Regel“ solche Mitbestimmungsrechte. Maßgeblich ist nach der Rechtsprechung des BAG die objektive Möglichkeit zur Überwachung, auch ohne jede Absicht. Die Folge formuliert CMS deutlich: Ohne Zustimmung des Betriebsrats oder einen Spruch der Einigungsstelle darf der Arbeitgeber das System nicht einführen. Ob die Pläne der Bundesregierung daran etwas ändern, lässt CMS ausdrücklich offen.

Bei Coding-Agenten muss man die Überwachungsmöglichkeit nicht lange suchen: Die Hersteller liefern sie in ihren Dashboards mit.

- **Claude Code** zeigt in der [Nutzungsanalyse](https://support.claude.com/en/articles/12157520-claude-code-usage-analytics) Owners im Team-Plan sowie Owners und Admins im Enterprise-Plan die E-Mail-Adresse und die akzeptierten Codezeilen jedes Mitglieds im laufenden Monat; die Daten lassen sich als CSV exportieren. Mit der GitHub-Integration (Beta) zeigt die Nutzungsanalyse zusätzlich gemergte und eröffnete Pull Requests pro Person.
- **GitHub Copilot** liefert [Nutzungsmetriken](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/copilot-usage-metrics/copilot-metrics) über APIs auf Unternehmens-, Organisations-, Repository- und Nutzerebene, mit Akzeptanzrate, Codezeilen und Pull-Request-Kennzahlen.

Das sind Nutzungs- und Ergebnissignale pro Person. Ein gültiges Maß für Entwicklerleistung sind sie nicht, aber sie eignen sich zur Verhaltens- oder Leistungskontrolle, und eine Rangliste „akzeptierte Zeilen pro Entwickler“ ist mit zwei Klicks erstellt. Prüfen Sie für Codex vor dem Pilotprojekt, was die Workspace-Auswertungen pro Person zeigen, und behandeln Sie sie genauso.

Es gibt eine Ausnahme, die gern zitiert wird. Das Arbeitsgericht Hamburg hat am 16. Januar 2024 (24 BVGa 1/24) in einem erstinstanzlichen Eilverfahren entschieden, dass bei ChatGPT über private Konten der Beschäftigten kein Mitbestimmungsrecht besteht, weil der Arbeitgeber keine Daten darüber hat, wer wann was genutzt hat. CMS weist in der [Besprechung des Beschlusses](https://cms.law/de/deu/legal-updates/kein-mitbestimmungsrecht-des-betriebsrats-bei-chatgpt-co) darauf hin, dass das anders zu beurteilen ist, sobald der Arbeitgeber Konten oder Lizenzen bereitstellt. Das Gericht stützte sich auf die konkrete Konstellation, und die Browsernutzung war bereits kollektiv geregelt. Für ein Salesforce-Team mit Firmenlizenzen hilft die Entscheidung also nicht.

Eine gute Nachricht für die Planung: Laut CMS ist ein KI-Werkzeug, das zusätzlich bereitgestellt wird, ohne Organisation oder Verantwortlichkeiten zu ändern, keine Betriebsänderung nach § 111 BetrVG. Interessenausgleich und Sozialplan stehen dann nicht im Raum. Das ändert sich, wenn Sie das Tool mit kleineren Teams oder neuen Rollen verknüpfen. CMS empfiehlt, beides zeitlich und inhaltlich zu trennen und das zu dokumentieren. Wer gleichzeitig auf [KI-native Delivery mit kleineren Teams](/blog/ki-kleinere-salesforce-teams-delivery/) umstellt, sollte das ernst nehmen.

## Was gehört in die Betriebsvereinbarung für Coding-Agenten?

CMS empfiehlt Rahmenbetriebsvereinbarungen, die das Verfahren für neue IT- und KI-Anwendungen regeln, und weist darauf hin, dass ein solches Verfahren bei grundlegenderen KI-Transformationen mit Personalabbau nicht ausreicht. Viele Industrieunternehmen haben schon eine IT-Rahmenvereinbarung; dann braucht jedes Tool eine Anlage. Aus technischer Sicht sollte diese Anlage für jede Datenquelle festhalten, wer sie sieht und wofür:

| Datenquelle | Was sie zeigt | Mein Vorschlag für die Anlage |
|---|---|---|
| Claude-Code-Analyse | akzeptierte Zeilen pro Person und Monat | Zugriff nur für benannte Admins, keine Leistungsbewertung einzelner Personen |
| GitHub-Beitragsmetriken (Beta) | Pull Requests pro Person mit und ohne Claude Code | nicht aktivieren, solange Teamkennzahlen genügen |
| Copilot-Metriken | Nutzung bis auf Nutzerebene | Auswertung nur aggregiert auf Teamebene |
| Lokale Sitzungsprotokolle | alles, was der Agent gelesen und geschrieben hat | Aufbewahrungsdauer festlegen |
| Audit- und Kostendaten | wer wann welches Budget verbraucht | Zweck auf Abrechnung und Sicherheit begrenzen |

Zwei Details aus der [Datennutzungsseite von Claude Code](https://code.claude.com/docs/en/data-usage) gehören in jede Anlage. Erstens speichert Claude Code Sitzungsprotokolle standardmäßig 30 Tage lokal im Klartext, einstellbar über `cleanupPeriodDays`. Zweitens beträgt die Aufbewahrung bei kommerziellen Konten 30 Tage; Zero Data Retention ist nicht Teil des normalen Enterprise-Plans, das Account-Team schaltet diese Option nach Prüfung der Berechtigung pro Organisation frei. Mit Zero Data Retention fallen laut Anthropic auch die GitHub-Beitragsmetriken weg, was die Verhandlung mit dem Betriebsrat vereinfachen kann.

Um den Nutzen des Tools zu messen, brauchen Sie keine Daten pro Person. Ob KI Ihr Programm schneller macht, messen Sie mit Durchlaufzeit, Fehlerdurchschlupf und Nacharbeit je Story und Team, wie in [KI-Nutzen im Salesforce-Projekt messen](/blog/ki-nutzen-salesforce-projekt-messen/) beschrieben. Diese Zusage ist der Kern, um den es in den meisten Verhandlungen geht.

## Was verlangt die DSGVO von KI-Coding-Tools?

Die vollständige Datenschutzprüfung umfasst Rollen und Auftragsverarbeitungsvertrag, Rechtsgrundlage für Beschäftigtendaten, Löschkonzept, technische Maßnahmen, Unterauftragnehmer, Drittlandtransfers, die Information der Beschäftigten und die Frage, ob eine Datenschutz-Folgenabschätzung nötig ist. Drei Punkte sind bei Coding-Agenten besonders wichtig und müssen geklärt werden, bevor die erste Lizenz zugewiesen wird.

**Vertragsgrundlage.** Laut [Anthropic](https://support.claude.com/en/articles/7996862-how-do-i-view-and-sign-your-data-processing-addendum-dpa) ist das DPA mit Standardvertragsklauseln automatisch Teil der Commercial Terms. Wer Claude über Amazon Bedrock nutzt, fällt unter die Bedingungen von AWS. Bei Copilot und Codex werden die Verträge mit GitHub und OpenAI geschlossen.

**Training und Kontotyp.** Anthropic [trainiert nicht mit Code und Prompts](https://code.claude.com/docs/en/data-usage), die unter kommerziellen Bedingungen an Claude Code übermittelt werden. Bei Free, Pro und Max hängt das Training von einer Nutzereinstellung ab, die Aufbewahrung kann dann fünf Jahre betragen. Deshalb halte ich private Konten für den schlechtesten Weg, den Betriebsrat zu umgehen: Sie tauschen ein lösbares Mitbestimmungsthema gegen ein ungelöstes Datenschutzthema.

**Daten im Kontext.** Als interne Regel gilt: Keine personenbezogenen Produktivdaten gelangen in den Kontext eines Coding-Agenten, außer der Anwendungsfall ist ausdrücklich freigegeben, rechtmäßig und erforderlich. Für einen Hersteller heißt das: keine Servicefälle mit Kundennamen, keine Händlerkontakte und keine Techniker-Einsatzdaten aus der Full-Copy-Sandbox. Agenten arbeiten in Scratch Orgs und Developer-Sandboxes mit anonymisierten Daten. Die Datenklassen im Detail stehen in [Partner codet mit KI: Was in den Vertrag gehört](/blog/partner-ki-coding-regeln-vertrag/).

## EU-Inferenz gibt es über Bedrock, Copilot und OpenAI

Die DSGVO verlangt nicht grundsätzlich eine Verarbeitung nur in der EU. Ein Drittlandtransfer braucht aber eine gültige Grundlage, und bei Standardvertragsklauseln gehören eine Transferprüfung und, wo nötig, zusätzliche Schutzmaßnahmen dazu. Manche Datenschutzbeauftragte in der Industrie wollen für Code mit Händlerkonditionen oder Garantieregeln trotzdem EU-Verarbeitung. Wenn das bei Ihnen gilt, sieht die Lage so aus:

- **Anthropic-API und Claude-Pläne:** Laut [Dokumentation zur Datenresidenz](https://platform.claude.com/docs/en/manage-claude/data-residency) gibt es für die Inferenz nur „us“ oder „global“, die Speicherung im Workspace nur „us“. US-Inferenz kostet den 1,1-fachen Preis. Eine EU-Option fehlt.
- **Claude Code über Amazon Bedrock:** In einer `eu-*`-Region bevorzugt Claude Code laut [Anthropic](https://code.claude.com/docs/en/amazon-bedrock) die `eu.`-Inferenzprofile, aber das Präfix ist laut Dokumentation „a preference, not a guarantee“. Für Datenresidenz legen Sie EU-Inferenzprofile für jedes Modell fest und beschränken die IAM-Richtlinie darauf. Telemetrie, Fehlerberichte und Feedback-Berichte an Anthropic sind auf Bedrock laut [Datennutzungsseite](https://code.claude.com/docs/en/data-usage) standardmäßig aus.
- **GitHub Copilot:** Für Unternehmen auf GitHub Enterprise Cloud mit Datenresidenz hält die [Richtlinie](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency) „Restrict Copilot to data residency compliant models“ Inferenz und Daten für allgemein verfügbare Funktionen in der Region. Eine normale GitHub.com-Organisation erhält das nicht. Die Richtlinie ist standardmäßig aus, Anfragen im Rahmen dieser Richtlinie verbrauchen 10 Prozent mehr AI Credits. Claude Opus 5.5 und Sonnet 5.5 stehen auf der EU-Modellliste.
- **OpenAI:** API-Projekte mit [europäischer Datenresidenz](https://openai.com/index/introducing-data-residency-in-europe/) gibt es seit Februar 2025, für unterstützte Modelle und Endpunkte. Für berechtigte Kunden von ChatGPT Enterprise gibt es laut einem Update desselben Beitrags seit Januar 2026 Inferenz in der Region. Codex App und CLI sind laut [OpenAI](https://help.openai.com/en/articles/9903489) abgedeckt, Codex Web nicht; Routing, Anmeldung und externe Apps oder MCP-Server können laut OpenAI außerhalb der Region laufen.

Den vollständigen Vergleich der Tools nach Vertrag, Kosten und Governance finden Sie in [Agentforce Vibes, Claude Code, Codex oder Copilot?](/blog/agentforce-vibes-claude-code-copilot-vergleich/). Für Agentforce-Agenten im HR-Umfeld gelten zusätzlich eigene Fristen aus dem EU AI Act, siehe [EU AI Act: Fristen für Agentforce](/blog/eu-ai-act-fristen-agentforce/).

## Beispiel: Freigabe vor dem Pilotprojekt

Nehmen wir einen Maschinenbauer mit Hauptwerk in Deutschland, Betriebsrat, SAP, Sales Cloud, Service Cloud und Field Service, fünf internen Salesforce-Entwicklern, zwei Admins und einem Nearshore-Partner. Alle Angaben sind Annahmen, die das Vorgehen zeigen sollen. Die IT möchte Copilot für alle und Claude Code für zwei Entwickler, die mit dem Salesforce-Plugin arbeiten wollen.

```schritte
Bestandsaufnahme | Woche 1 · IT
  Angenommen, drei Entwickler nutzen bereits private Pro-Konten. Das ist die Hamburger Konstellation, aber Code mit Rabattlogik unterliegt dort Verbraucherbedingungen. Die IT stoppt das und kündigt Firmenkonten an.
Information des Betriebsrats | Woche 2 · IT
  Die IT legt für jedes Tool die Tabelle oben vor. Die Hauptsorge des Betriebsrats ist die Zeilenstatistik pro Person.
Anlage zur IT-Rahmenvereinbarung | Wochen 3 bis 6
  Copilot-Metriken nur auf Teamebene, GitHub-Beitragsmetriken bleiben aus, keine Leistungsbewertung aus Tooldaten, lokale Protokolle werden nach 14 Tagen gelöscht. Parallel entscheidet der Datenschutz: die EU-Richtlinie in Copilot, weil das Unternehmen GitHub Enterprise Cloud mit Datenresidenz nutzt, und Claude Code über Bedrock mit festgelegten EU-Profilen. Alle Nutzer, auch die Entwickler des Partners, erhalten eine dokumentierte Schulung zur KI-Kompetenz nach Artikel 4 der KI-Verordnung: zulässige Daten, Code Review, Secrets, Prompt Injection und Plugins.
Pilotphase | ab Woche 7
  Copilot und Claude Code starten mit den Regeln aus der Anlage, auch die Entwickler des Partners arbeiten auf Lizenzen des Kunden.
```

Die Supportseite nennt die Nutzungsanalyse nur für den Team-Plan, den Enterprise-Plan und die Console; Bedrock gehört nicht dazu. Die Kostendaten liegen dann im AWS-Konto des Kunden, und die Anlage regelt, wer sie sieht.

Sechs Wochen klingen lang, aber ein Pilotprojekt, das mittendrin gestoppt wird, kostet nach meiner Einschätzung mehr. Die tatsächliche Dauer hängt von bestehenden Vereinbarungen und der Organisation ab.

## Inventar: Wer nutzt welches KI-Tool mit welchem Konto

1. **Inventar erstellen:** Wer nutzt heute welches KI-Tool, mit welchem Konto?
2. **Betriebsrat früh informieren**, mit einer Liste der Daten, die jedes Tool erzeugt, und wer sie sieht.
3. **Anlage pro Tool** zur Rahmenvereinbarung, mit der Zusage, Nutzen auf Teamebene zu messen.
4. **Datenschutz klären:** Vertragsgrundlage, Kontotyp, Datenklassen und Region.
5. **Technisch umsetzen:** Dashboards einschränken, `cleanupPeriodDays` setzen, EU-Modelle festlegen, EU-Richtlinie in Copilot aktivieren, wo verfügbar.
6. **Alle Nutzer schulen**, wie es die Pflicht zur KI-Kompetenz nach der KI-Verordnung verlangt.

Gibt es eine IT-Rahmenvereinbarung und eine klare Beschreibung der Datenflüsse, geht die Freigabe nach meiner Erfahrung schneller als bei einem unvorbereiteten Pilotprojekt; eine feste Dauer kann niemand zusagen. Wie Teams und Partner neue Regeln im Alltag übernehmen, gehört zu meiner Arbeit im [Change Management](/leistungen/change-management/); den Rahmen für Rollen und Review beschreibt [Kapitel 9 der Masterclass](/masterclass/ki-salesforce/teamarbeit-und-delivery/).
