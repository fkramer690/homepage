---
title: "KI-Coding-Tools im Unternehmen: Betriebsrat und DSGVO"
description: "Claude Code, Copilot oder Codex einführen: wann der Betriebsrat zustimmen muss, was in die Betriebsvereinbarung gehört und wo Ihre Daten verarbeitet werden."
pubDate: 2026-10-27
lang: de
slug: ki-coding-betriebsrat-dsgvo
translationKey: ai-coding-works-council-gdpr
topic: governance
categories: [architecture, ai]
tags: [KI-Coding, Betriebsrat, DSGVO, Datenresidenz, Claude Code, GitHub Copilot]
takeaways:
  - "Stellt ein Unternehmen Coding-Agenten über Firmenkonten bereit, gilt laut CMS in aller Regel § 87 Abs. 1 Nr. 6 BetrVG; ohne Zustimmung des Betriebsrats oder Einigungsstelle darf das Tool nicht live gehen."
  - "Claude Code zeigt Administratoren akzeptierte Codezeilen pro Person und Monat, GitHub liefert Copilot-Metriken bis auf Nutzerebene; genau diese Auswertungen gehören in die Betriebsvereinbarung."
  - "Die Anthropic-API bietet für die Inferenz nur „us“ oder „global“; EU-Verarbeitung gibt es über Amazon Bedrock in einer EU-Region, Copilot mit EU-Datenresidenz oder OpenAI mit europäischer Datenresidenz."
  - "Private KI-Konten ersparen vielleicht die Mitbestimmung, aber der Code läuft dann unter Verbraucherbedingungen, und das Unternehmen verliert die Kontrolle über Training, Aufbewahrung und Offboarding."
  - "Planen Sie Betriebsrat und Datenschutz vor dem Pilot, nicht danach, und trennen Sie die Einführung des Tools von späteren Änderungen an Teamgrößen oder Rollen."
faq:
  - q: "Muss der Betriebsrat Claude Code oder GitHub Copilot zustimmen?"
    a: "In aller Regel ja, wenn das Unternehmen die Konten bereitstellt. Laut CMS reicht die objektive Möglichkeit, Leistung oder Verhalten zu überwachen, eine Absicht ist nicht nötig. Beide Tools erzeugen Nutzungsdaten pro Person. Dieser Beitrag ist keine Rechtsberatung."
  - q: "Gibt es Claude Code mit Datenverarbeitung in der EU?"
    a: "Nicht über die Anthropic-API, die für die Inferenz nur „us“ oder „global“ anbietet. Über Amazon Bedrock in einer EU-Region nutzt Claude Code EU-Inferenzprofile. Alternativ stehen Claude-Modelle in GitHub Copilot mit aktivierter EU-Datenresidenz zur Verfügung."
  - q: "Brauche ich einen Auftragsverarbeitungsvertrag mit Anthropic?"
    a: "Laut Anthropic ist das DPA mit Standardvertragsklauseln automatisch Teil der Commercial Terms, gilt also für Team, Enterprise und API. Wer Claude über Amazon Bedrock nutzt, fällt unter die Bedingungen von AWS. Ob das Ihren Anforderungen genügt, entscheidet Ihr Datenschutzbeauftragter."
  - q: "Dürfen Entwickler einfach private KI-Konten nutzen?"
    a: "Ich rate davon ab. Das Arbeitsgericht Hamburg sah 2024 in einem erstinstanzlichen Eilverfahren bei privaten ChatGPT-Konten kein Mitbestimmungsrecht, weil der Arbeitgeber keine Daten erhält. Dafür läuft Ihr Code dann unter Verbraucherbedingungen, bei Claude etwa mit Training je nach Nutzereinstellung."
  - q: "Gilt das auch für Standorte außerhalb Deutschlands?"
    a: "Die Regeln zum Betriebsrat sind deutsches Recht und gelten für Ihre deutschen Standorte und deren Beschäftigte. Die DSGVO gilt in der ganzen EU. Manche Konzerne mit deutschen Werken oder Entwicklungszentren entscheiden sich deshalb womöglich, den deutschen Prozess als Konzernstandard für KI-Tools zu nutzen."
draft: false
---

Wer in einem deutschen Unternehmen Claude Code, GitHub Copilot oder Codex für die eigenen Salesforce-Entwickler einführt, braucht in aller Regel die Zustimmung des Betriebsrats nach § 87 Abs. 1 Nr. 6 BetrVG, weil diese Tools Nutzungsdaten pro Person erzeugen. Dazu kommen zwei Fragen für den Datenschutz: welche Daten in den Kontext des Agenten dürfen und wo die Inferenz läuft. Die Anthropic-API bietet keine EU-Region; Amazon Bedrock, Copilot und OpenAI schon. Planen Sie beides vor dem Pilot, denn wo es einen Betriebsrat gibt, darf das Tool ohne dessen Zustimmung oder einen Spruch der Einigungsstelle nicht live gehen.

Vorweg: Ich bin Salesforce-Architekt, kein Anwalt. Was folgt, ist meine technische Sicht auf die Fragen, die Betriebsrat und Datenschutzbeauftragte stellen werden. Es ist keine Rechtsberatung. Die Betriebsvereinbarung und die Bewertung der Datenübermittlung gehören in die Hände Ihrer Rechtsabteilung oder eines Fachanwalts.

## Warum muss ein bestehender Betriebsrat einem KI-Coding-Tool zustimmen?

§ 87 Abs. 1 Nr. 6 BetrVG gibt dem Betriebsrat ein Mitbestimmungsrecht bei technischen Einrichtungen, die geeignet sind, Verhalten oder Leistung der Beschäftigten zu überwachen. Laut einer [Analyse von CMS vom Juli 2026](https://cms.law/de/deu/legal-updates/ki-transformation-und-betriebsrat-mitbestimmung-richtig-gestalten) bestehen bei KI-Systemen „in aller Regel“ solche Mitbestimmungsrechte. Maßgeblich ist nach der Rechtsprechung des BAG die objektive Möglichkeit zur Überwachung, auch ohne jede Absicht. Die Folge formuliert CMS deutlich: Ohne Zustimmung des Betriebsrats oder einen Spruch der Einigungsstelle darf der Arbeitgeber das System nicht einführen. Ob die Pläne der Bundesregierung daran etwas ändern, lässt CMS ausdrücklich offen.

Bei Coding-Agenten muss man die Überwachungsmöglichkeit nicht lange suchen, die Hersteller liefern sie als Dashboard:

- **Claude Code** zeigt in der [Nutzungsanalyse](https://support.claude.com/en/articles/12157520-claude-code-usage-analytics) Owners im Team-Plan sowie Owners und Admins im Enterprise-Plan die E-Mail-Adresse und die akzeptierten Codezeilen jedes Mitglieds im laufenden Monat, exportierbar als CSV. Mit der GitHub-Integration (Beta) kommen gemergte und eröffnete Pull Requests pro Person dazu.
- **GitHub Copilot** liefert [Nutzungsmetriken](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/copilot-usage-metrics/copilot-metrics) über APIs auf Unternehmens-, Organisations-, Repository- und Nutzerebene, mit Akzeptanzrate, Codezeilen und Pull-Request-Kennzahlen.

Das sind Leistungsdaten im Wortsinn. Eine Rangliste „akzeptierte Zeilen pro Entwickler“ ist mit zwei Klicks erstellt, auch wenn niemand das vorhat.

Es gibt eine Ausnahme, die gern zitiert wird. Das Arbeitsgericht Hamburg hat am 16. Januar 2024 (24 BVGa 1/24) in einem erstinstanzlichen Eilverfahren entschieden, dass bei ChatGPT über private Konten der Beschäftigten kein Mitbestimmungsrecht besteht, weil der Arbeitgeber keine Daten darüber hat, wer wann was genutzt hat. CMS weist in der [Besprechung des Beschlusses](https://cms.law/de/deu/legal-updates/kein-mitbestimmungsrecht-des-betriebsrats-bei-chatgpt-co) darauf hin, dass das anders zu beurteilen ist, sobald der Arbeitgeber Konten oder Lizenzen bereitstellt. Für ein Salesforce-Team mit Firmenlizenzen hilft die Entscheidung also nicht.

Eine gute Nachricht für die Planung: Laut CMS ist ein KI-Werkzeug, das zusätzlich bereitgestellt wird, ohne Organisation oder Verantwortlichkeiten zu ändern, keine Betriebsänderung nach § 111 BetrVG. Interessenausgleich und Sozialplan stehen dann nicht im Raum. Das ändert sich, wenn Sie das Tool mit kleineren Teams oder neuen Rollen verknüpfen. CMS empfiehlt, beides zeitlich und inhaltlich zu trennen und das zu dokumentieren. Wer gleichzeitig auf [KI-native Delivery mit kleineren Teams](../ki-kleinere-salesforce-teams-delivery/) umstellt, sollte das ernst nehmen.

## Was gehört in die Betriebsvereinbarung für Coding-Agenten?

CMS empfiehlt Rahmenbetriebsvereinbarungen, die das Verfahren für neue IT- und KI-Anwendungen regeln, und weist darauf hin, dass das bei grundlegenderen KI-Transformationen mit Personalabbau nicht funktioniert. Viele Industrieunternehmen haben schon eine IT-Rahmenvereinbarung; dann braucht jedes Tool eine Anlage. Aus technischer Sicht sollte diese Anlage für jede Datenquelle sagen, wer sie sieht und wofür:

| Datenquelle | Was sie zeigt | Mein Vorschlag für die Anlage |
|---|---|---|
| Claude-Code-Analyse | akzeptierte Zeilen pro Person und Monat | Zugriff nur für benannte Admins, keine Leistungsbewertung einzelner Personen |
| GitHub-Beitragsmetriken (Beta) | Pull Requests pro Person mit und ohne Claude Code | nicht aktivieren, solange Teamkennzahlen genügen |
| Copilot-Metriken | Nutzung bis auf Nutzerebene | Auswertung nur aggregiert auf Teamebene |
| Lokale Sitzungsprotokolle | alles, was der Agent gelesen und geschrieben hat | Aufbewahrungsdauer festlegen |
| Audit- und Kostendaten | wer wann welches Budget verbraucht | Zweck auf Abrechnung und Sicherheit begrenzen |

Zwei Details aus der [Datennutzungsseite von Claude Code](https://code.claude.com/docs/en/data-usage) gehören in jede Anlage. Erstens speichert Claude Code Sitzungsprotokolle standardmäßig 30 Tage lokal im Klartext, einstellbar über `cleanupPeriodDays`. Zweitens beträgt die Aufbewahrung bei kommerziellen Konten 30 Tage; Zero Data Retention gibt es für Claude Code im Enterprise-Plan nur auf Antrag über das Account-Team. Mit Zero Data Retention fallen laut Anthropic auch die GitHub-Beitragsmetriken weg, was die Verhandlung mit dem Betriebsrat vereinfachen kann.

Für den Nutzen des Tools brauchen Sie keine Daten pro Person. Ob KI Ihr Programm schneller macht, messen Sie mit Durchlaufzeit, Fehlerquote und Nacharbeit pro Story auf Teamebene, wie in [KI-Nutzen im Salesforce-Projekt messen](../ki-nutzen-salesforce-projekt-messen/) beschrieben. Diese Zusage ist der Kern, um den es in den meisten Verhandlungen geht.

## Was verlangt die DSGVO von KI-Coding-Tools?

Drei Punkte sollte Ihr Datenschutzbeauftragter klären, bevor die erste Lizenz zugewiesen wird.

**Vertragsgrundlage.** Laut [Anthropic](https://support.claude.com/en/articles/7996862-how-do-i-view-and-sign-your-data-processing-addendum-dpa) ist das DPA mit Standardvertragsklauseln automatisch Teil der Commercial Terms. Wer Claude über Amazon Bedrock nutzt, fällt unter die Bedingungen von AWS. Bei Copilot und Codex laufen die Verträge über GitHub und OpenAI.

**Training und Kontotyp.** Anthropic [trainiert nicht mit Code und Prompts](https://code.claude.com/docs/en/data-usage), die unter kommerziellen Bedingungen an Claude Code gehen. Bei Free, Pro und Max hängt das Training an einer Nutzereinstellung, die Aufbewahrung kann dann fünf Jahre betragen. Deshalb halte ich private Konten für den schlechtesten Weg, den Betriebsrat zu umgehen: Sie tauschen ein lösbares Mitbestimmungsthema gegen ein ungelöstes Datenschutzthema.

**Daten im Kontext.** Personenbezogene Daten gehören nicht in den Kontext eines Coding-Agenten. Für einen Hersteller heißt das: keine Servicefälle mit Kundennamen, keine Händlerkontakte und keine Techniker-Einsatzdaten aus der Full-Copy-Sandbox. Agenten arbeiten in Scratch Orgs und Developer-Sandboxes mit anonymisierten Daten. Die Datenklassen im Detail stehen in [Partner codet mit KI: Was in den Vertrag gehört](../partner-ki-coding-regeln-vertrag/).

## Wo läuft die Inferenz, und braucht es die EU?

Die DSGVO schreibt nicht vor, dass Daten die EU nie verlassen; dafür gibt es Standardvertragsklauseln. Manche Datenschutzbeauftragte in der Industrie wollen für Code mit Händlerkonditionen oder Garantieregeln trotzdem EU-Verarbeitung. Wenn das bei Ihnen gilt, sieht die Lage so aus:

- **Anthropic-API und Claude-Pläne:** Laut [Dokumentation zur Datenresidenz](https://platform.claude.com/docs/en/manage-claude/data-residency) gibt es für die Inferenz nur „us“ oder „global“, die Speicherung im Workspace nur „us“. US-Inferenz kostet das 1,1-Fache. Eine EU-Option fehlt.
- **Claude Code über Amazon Bedrock:** In einer `eu-*`-Region nutzt Claude Code laut [Anthropic](https://code.claude.com/docs/en/amazon-bedrock) automatisch die `eu.`-Inferenzprofile. Telemetrie, Fehlerberichte und Feedback-Berichte an Anthropic sind auf Bedrock laut [Datennutzungsseite](https://code.claude.com/docs/en/data-usage) standardmäßig aus.
- **GitHub Copilot:** Mit der [Richtlinie für Datenresidenz](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency) bleiben Inferenz und Daten in der EU, für alle allgemein verfügbaren Funktionen. Die Richtlinie ist standardmäßig aus und kostet 10 Prozent mehr AI Credits. Claude Opus 5.5 und Sonnet 5.5 stehen auf der EU-Modellliste.
- **OpenAI:** API-Projekte mit [europäischer Datenresidenz](https://openai.com/index/introducing-data-residency-in-europe/) gibt es seit Februar 2025, mit Zero Data Retention; bestehende Projekte lassen sich laut dem Beitrag zum Start nicht umstellen, prüfen Sie also die aktuelle Dokumentation. Für berechtigte Kunden von ChatGPT Enterprise gibt es laut einem Update desselben Beitrags seit Januar 2026 Inferenz in der Region. Codex App und CLI sind laut [OpenAI](https://help.openai.com/en/articles/9903489) abgedeckt, Codex Web nicht.

Den vollständigen Vergleich der Tools nach Vertrag, Kosten und Governance finden Sie in [Agentforce Vibes, Claude Code, Codex oder Copilot?](../agentforce-vibes-claude-code-copilot-vergleich/). Für Agentforce-Agenten im HR-Umfeld kommen eigene Fristen aus dem EU AI Act dazu, siehe [EU AI Act: Fristen für Agentforce](../eu-ai-act-fristen-agentforce/).

## Ein typisches Szenario: Freigabe vor dem Pilot

Nehmen wir einen Maschinenbauer mit Betriebsrat, SAP, Sales Cloud, Service Cloud und Field Service, fünf internen Salesforce-Entwicklern, zwei Admins und einem Nearshore-Partner. Alle Angaben sind Annahmen, die das Vorgehen zeigen sollen. Die IT möchte Copilot für alle und Claude Code für zwei Entwickler, die mit dem Salesforce-Plugin arbeiten wollen.

```schritte
Bestandsaufnahme | Woche 1 · IT
  Angenommen, drei Entwickler nutzen bereits private Pro-Konten. Das ist die Hamburger Konstellation, aber Code mit Rabattlogik läuft dort unter Verbraucherbedingungen. Die IT stoppt das und kündigt Firmenkonten an.
Information des Betriebsrats | Woche 2 · IT
  Die IT legt für jedes Tool die Tabelle oben vor. Die Hauptsorge des Betriebsrats ist die Zeilenstatistik pro Person.
Anlage zur IT-Rahmenvereinbarung | Wochen 3 bis 6
  Copilot-Metriken nur auf Teamebene, GitHub-Beitragsmetriken bleiben aus, keine Leistungsbewertung aus Tooldaten, lokale Protokolle werden nach 14 Tagen gelöscht. Parallel entscheidet der Datenschutz: EU-Residenz in Copilot an, Claude Code über Bedrock in einer EU-Region.
Pilot | ab Woche 7
  Copilot und Claude Code starten mit den Regeln aus der Anlage, auch die Entwickler des Partners arbeiten auf Lizenzen des Kunden.
```

Die Supportseite nennt die Nutzungsanalyse nur für Team, Enterprise und die Console, Bedrock gehört nicht dazu. Die Kostendaten liegen dann im AWS-Konto des Kunden, und die Anlage regelt, wer sie sieht.

Sechs Wochen klingen lang. Ein Pilot, den der Betriebsrat nach vier Wochen stoppt, kostet mehr.

## Wo sollten Sie anfangen?

1. **Inventar erstellen:** Wer nutzt heute welches KI-Tool, mit welchem Konto?
2. **Betriebsrat früh informieren**, mit einer Liste der Daten, die jedes Tool erzeugt, und wer sie sieht.
3. **Anlage pro Tool** zur Rahmenvereinbarung, mit der Zusage, Nutzen auf Teamebene zu messen.
4. **Datenschutz klären:** Vertragsgrundlage, Kontotyp, Datenklassen und Region.
5. **Technisch umsetzen:** Dashboards einschränken, `cleanupPeriodDays` setzen, EU-Richtlinie in Copilot aktivieren.

Wie Teams und Partner neue Regeln im Alltag übernehmen, gehört zu meiner Arbeit im [Change Management](../../leistungen/change-management/); den Rahmen für Rollen und Review beschreibt [Kapitel 9 der Masterclass](../../masterclass/ki-salesforce/teamarbeit-und-delivery/).

KI-Coding-Tools gehen an einem deutschen Standort mit Betriebsrat erst live, wenn Betriebsrat und Datenschutz zugestimmt haben, und mit guter Vorbereitung dauert das nach meiner Einschätzung Wochen statt Monate.
