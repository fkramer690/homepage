---
title: "Agentforce Vibes, Claude Code, Codex oder Copilot?"
description: "Welchen Coding-Agenten sollten Ihr Salesforce-Team oder Ihr Partner nutzen? Eine Entscheidung nach Verträgen, EU-Datenresidenz, Kostenmodell und Governance."
pubDate: 2026-10-27
lang: de
slug: agentforce-vibes-claude-code-copilot-vergleich
translationKey: vibes-claude-code-copilot-comparison
topic: devops
categories: [devops, ai]
tags: [KI-Coding, Agentforce Vibes, Claude Code, GitHub Copilot, Datenresidenz, Partnersteuerung]
takeaways:
  - "Welchen Coding-Agenten ein Salesforce-Team nutzt, entscheiden vor allem vier Punkte auf Kundenseite: bestehende Verträge, EU-Datenresidenz, Kostenmodell und Governance, erst danach das Modell."
  - "Agentforce Vibes ist in der Hyperforce EU Operating Zone nicht verfügbar; liegt Ihre Org dort, bleiben Copilot, Claude Code über einen Cloud-Anbieter und Codex."
  - "Die First-Party-API von Anthropic bietet nur Inferenz in den USA oder global, GitHub Copilot dagegen seit April 2026 EU-Datenresidenz für alle allgemein verfügbaren Funktionen, mit 10 Prozent mehr AI Credits."
  - "Codex unterstützt EU-Datenresidenz nur mit ChatGPT Enterprise und nur in Codex-App und CLI; ChatGPT Business hat keine Datenresidenz, Codex Web ist ausgenommen."
  - "Ich empfehle höchstens zwei freigegebene Coding-Agenten, Konten im Besitz des Kunden und eine Regeldatei im Kunden-Repository, die jeder Agent liest."
faq:
  - q: "Welcher Coding-Agent ist für die Salesforce-Entwicklung am besten?"
    a: "Mir ist kein öffentlicher Benchmark bekannt, der das für Apex, LWC oder Flow klärt. Salesforce hat sein erstes offizielles Plugin für Claude Code gebaut, Agentforce Vibes läuft in Ihrem Salesforce-Vertrag, Copilot in GitHub. Entscheiden Sie nach Vertrag, Datenresidenz und Governance und testen Sie dann an Aufgaben aus Ihrem Backlog."
  - q: "Können wir Agentforce Vibes in der EU nutzen?"
    a: "Ja, für Orgs außerhalb der Hyperforce EU Operating Zone. Laut Salesforce ist Vibes in der EU Operating Zone und in der Government Cloud nicht verfügbar; Daten bleiben in der Trust Boundary von Salesforce und werden nach der Sitzung nicht gespeichert."
  - q: "Gibt es Claude Code mit Verarbeitung in der EU?"
    a: "Über die eigene API von Anthropic nicht, dort gibt es nur Inferenz in den USA oder global. Claude Code kann über Amazon Bedrock in einer EU-Region laufen, oder Ihr Team nutzt Claude-Modelle in Copilot mit aktivierter EU-Datenresidenz."
  - q: "Sollte der Partner seinen eigenen Coding-Agenten mitbringen?"
    a: "Standardmäßig würde ich das nicht erlauben. Arbeitet der Partner mit eigenen Konten, steuern Sie weder Datenresidenz noch Aufbewahrung noch Offboarding. Geben Sie Partnerentwicklern Seats in Ihrer GitHub-, Claude- oder ChatGPT-Organisation oder eine Vibes-Lizenz in Ihrer Org."
draft: false
---

Ob Agentforce Vibes, Claude Code, Codex oder Copilot: Die Wahl des Coding-Agenten für Salesforce ist eher eine Kundenentscheidung als eine Vorliebe der Entwickler. Vier Punkte auf Ihrer Seite entscheiden: welche Verträge und Werkzeuge Sie schon haben, ob Code und Prompts in der EU verarbeitet werden müssen, welches Kostenmodell Sie steuern können und welche Governance Ihre IT-Sicherheit erwartet. Liegt Ihre Org in der Hyperforce EU Operating Zone, fällt Vibes weg. Ist EU-Verarbeitung Pflicht, fällt die eigene API von Anthropic weg, Copilot oder Bedrock kommen dazu. Die Modellqualität entscheidet zuletzt.

## Warum sollte der Kunde entscheiden und nicht der Entwickler?

Entwickler und Partner kommen mit Vorlieben. Ein Nearshore-Team kennt vielleicht Claude Code, Ihre internen Entwickler haben Copilot in VS Code, und Ihr Salesforce-Account-Executive bietet Agentforce Vibes an. Jede dieser Entscheidungen schickt Ihren Quellcode, Ihre Metadaten und manchmal Testdaten aus einer Sandbox unter einem bestimmten Vertrag zu einem Modellanbieter. Bei einem Hersteller stecken in diesem Code Rabattfreigaben, Händlerkonditionen, Garantieregeln und die Schnittstellendefinitionen zu SAP oder proALPHA.

Der Abstand zwischen den Werkzeugen ist kleiner, als das Marketing vermuten lässt. Salesforce beschreibt seine offene Skills-Bibliothek als [kompatibel mit jedem Coding-Agenten](https://developer.salesforce.com/blogs/2026/06/the-salesforce-developers-guide-to-the-summer-26-release) und nennt Claude Code und Codex; die Hosted MCP Server verbinden sich mit jedem MCP-fähigen Client. Sein erstes offizielles Plugin hat Salesforce für Claude Code gebaut: Laut [Ankündigung vom 19. August 2026](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) bündelt es rund 40 Skills, drei MCP-Server, Hooks zur Deployment-Validierung und einen lesenden Agenten für Architektur-Reviews. Den Funktionsvergleich finden Sie in [Kapitel 4 der Masterclass KI](../../masterclass/ki-salesforce/externe-coding-agenten/). Hier geht es um die Entscheidung.

## Vier Fragen, die den Coding-Agenten für Salesforce bestimmen

### 1. Welche Verträge und Werkzeuge haben Sie schon?

Jede Option hängt an einem Vertrag, den Sie vielleicht bereits haben:

- **Agentforce Vibes** läuft über Ihren Salesforce-Vertrag: Laut [Preisseite](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/) als Flat Fee zu 125 € pro Nutzer und Monat oder mit Flex Credits nach Verbrauch, die „the same credits used by Agentforce“ verbrauchen.
- **GitHub Copilot** läuft über GitHub. Seit Februar 2026 sind Claude und Codex [als Coding-Agenten in Copilot Business verfügbar](https://github.blog/changelog/2026-02-26-claude-and-codex-now-available-for-copilot-business-pro-users/), nach Enterprise und Pro+, sobald ein Admin „Partner Agents“ freischaltet. Ein Vertrag deckt dann drei Agenten ab.
- **Claude Code** ist in jedem bezahlten Claude-Plan enthalten. [Claude Enterprise](https://claude.com/pricing) kostet 20 $ pro Seat und Monat plus Nutzung zu API-Preisen, mindestens 20 Seats (US-Listenpreis). Über Amazon Bedrock wird es [pro Token über Ihr AWS-Konto abgerechnet](https://code.claude.com/docs/en/costs).
- **Codex** gehört zu [ChatGPT Business und Enterprise](https://openai.com/business/pricing/).

Besteht einer dieser Verträge schon, sind Einkauf, Auftragsverarbeitungsvertrag und SSO oft erledigt. Das spart Wochen.

### 2. Müssen Code und Prompts in der EU verarbeitet werden?

Diese Frage streicht Optionen. Was die Anbieter auf ihren eigenen Seiten sagen:

| Weg | Verarbeitung in der EU |
|---|---|
| Agentforce Vibes | [nicht verfügbar in der EU Operating Zone](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html); Daten bleiben in der Trust Boundary von Salesforce und werden nach der Sitzung nicht gespeichert; Verarbeitungsregion nicht genannt |
| Claude Code über die Anthropic-API oder Claude-Pläne | [Inferenz nur „us“ oder „global“](https://platform.claude.com/docs/en/manage-claude/data-residency), Workspace-Speicher nur in den USA |
| Claude Code über Amazon Bedrock | Region folgt dem Endpunkt; Claude Code nutzt in `eu-*`-Regionen die [`eu.`-Inference-Profile](https://code.claude.com/docs/en/amazon-bedrock.md); regionale Endpunkte kosten laut Anthropic [10 Prozent Aufschlag](https://platform.claude.com/docs/en/about-claude/pricing) |
| GitHub Copilot | [EU-Datenresidenz seit 13. April 2026](https://github.blog/changelog/2026-04-13-copilot-data-residency-in-us-eu-and-fedramp-compliance-now-available) für alle allgemein verfügbaren Funktionen inklusive Cloud Agent und CLI, standardmäßig aus, 10 Prozent mehr AI Credits |
| Codex | Datenresidenz nur mit ChatGPT Enterprise; [Codex-App und CLI unterstützt, Codex Web ausgenommen](https://help.openai.com/en/articles/9903489) |

Zwei Details zählen für Salesforce-Teams. Die [EU-Modellliste für Copilot](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/github-copilot-with-data-residency) enthält Claude Opus 5.5 und Sonnet 5.5; ein Team kann also ohne AWS-Konto mit Claude-Modellen unter EU-Verarbeitung arbeiten. Ob der Betriebsrat mitbestimmt, ist eine eigene Frage, beschrieben in [KI-Coding, Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/).

```hinweis offen
Bei Vibes nennt Salesforce keine Verarbeitungsregion. Ich würde sie mir von Salesforce schriftlich geben lassen, bevor Ihr Datenschutzbeauftragter zustimmt.
```

### 3. Welches Kostenmodell können Sie steuern?

Die Werkzeuge unterscheiden sich weniger im Preis als darin, wer die Ausgaben sieht:

- **Copilot** enthält Credits im Wert des Seatpreises, [19 $ oder 39 $ pro Nutzer](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan) (US-Listenpreis), gepoolt über das Unternehmen, danach 0,01 $ pro Credit. Admins setzen [Budgets pro Unternehmen, Kostenstelle und Nutzer](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/).
- **Claude Team und Enterprise** zehren von einem Kontingent pro Seat. Wer mehr braucht, aktiviert Usage Credits mit Ausgabelimits pro Organisation, Gruppe oder Mitglied.
- **Claude Code über Bedrock** erscheint auf der AWS-Rechnung. Die Analytics von Anthropic erfassen das nicht; Zahlen pro Nutzer brauchen OpenTelemetry oder ein Gateway.
- **Vibes nach Verbrauch** zieht aus demselben Flex-Credit-Pool wie Ihre produktiven Agenten. Ein Partnerteam kann das Budget aufbrauchen, das Sie für einen Serviceagenten für Händleranfragen eingeplant haben.

Die Rechnung für ein ganzes Team und die Frage, ob Kunde oder Partner zahlt, stehen in [was KI-Coding im Salesforce-Projekt kostet](../ki-coding-kosten-salesforce-projekt/).

### 4. Welche Governance erwartet Ihre IT-Sicherheit?

- **Identität und Audit.** Claude Enterprise ergänzt das SSO, das schon Team hat, um SCIM, Audit-Logs, eine Compliance-API und eigene Aufbewahrungsregeln. ChatGPT Business hat SSO, aber kein SCIM, keine rollenbasierten Rechte und keine Compliance-API; Enterprise hat alle drei.
- **Umfang der Nutzung.** Bei OpenAI können Admins [Codex Local und Codex Cloud getrennt steuern](https://help.openai.com/en/articles/11369540), also die CLI erlauben und delegierte Cloud-Aufgaben sperren. Vibes lässt sich in Setup [für eine Produktiv-Org abschalten](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes).
- **Training und Aufbewahrung.** Anthropic [trainiert nicht mit Code unter kommerziellen Bedingungen](https://code.claude.com/docs/en/data-usage) und bewahrt ihn 30 Tage auf; Zero Data Retention für Claude Code schaltet das Account-Team pro Organisation frei. OpenAI nutzt Eingaben von Geschäftskunden standardmäßig nicht fürs Training.
- **Eine Regeldatei.** Der Copilot Coding Agent [liest AGENTS.md und CLAUDE.md](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions). Eine Datei in Ihrem Repository kann also mehrere Werkzeuge steuern, siehe [die KI-Regeldatei im Salesforce-Repository](../ki-regeldatei-salesforce-repository/).

## Ein typisches Szenario: zwei freigegebene Werkzeuge statt vier

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud und Field Service für den Außendienst auf einer EU-Org außerhalb der EU Operating Zone, dazu SAP S/4HANA und GitHub Enterprise Cloud. Der Datenschutzbeauftragte verlangt EU-Verarbeitung für Code, der Händlerkonditionen enthält. Zwei interne Admins pflegen Flows, drei interne Entwickler bauen Apex und LWC, ein Partner stellt sechs Nearshore-Entwickler für das Händlerportal. All das ist angenommen, um das Vorgehen zu zeigen.

Auf dem Tisch liegen vier Wünsche: Die Admins wollen Vibes, die internen Entwickler Copilot, der Partner Claude Code mit eigenen Konten, und ein Entwickler fragt nach Codex.

So würde ich entscheiden:

1. **Copilot Enterprise als Standard für alle neun Entwickler**, mit aktivierter EU-Datenresidenz. Es läuft über den bestehenden GitHub-Vertrag, Partnerentwickler bekommen Seats in der Organisation des Kunden, und Claude Sonnet 5.5 steht unter EU-Verarbeitung bereit. Enterprise statt Business, weil Agentensitzungen Credits verbrauchen und Enterprise 39 $ statt 19 $ pro Seat enthält. Zum US-Listenpreis: 9 × 39 $ = 351 $ im Monat inklusive gepoolter Credits, mit 10 Prozent mehr Credits pro Anfrage.
2. **Vibes als Flat Fee für die zwei Admins**, 2 × 125 € = 250 € im Monat, unter einer Bedingung: Salesforce bestätigt die Verarbeitungsregion schriftlich. Bis dahin nutzen die Admins Copilot.
3. **Keine Partnerkonten.** Besteht der Partner wegen des offiziellen Plugins auf Claude Code, läuft es über das AWS-Konto des Kunden in einer EU-Region, mit Budget und OpenTelemetry.
4. **Vorerst kein Codex.** ChatGPT Business hat keine Datenresidenz, und Enterprise wäre ein dritter Vertrag für einen Entwickler.

Am Ende stehen zwei Werkzeuge und eine `AGENTS.md`, die der interne Architekt verantwortet. Wie sich das im Partnervertrag niederschlägt, steht in [Partner codet mit KI: was in den Vertrag gehört](../partner-ki-coding-regeln-vertrag/).

## Wann ist welches Werkzeug die falsche Wahl?

- **Agentforce Vibes:** Die Org liegt in der EU Operating Zone oder der Government Cloud, Nutzung nach Verbrauch würde mit den für Agenten eingeplanten Flex Credits konkurrieren, oder ein großer Teil der Arbeit ist Middleware und SAP-Mapping außerhalb von Salesforce.
- **Claude Code mit Anthropic-Konten:** EU-Inferenz ist Pflicht. Bedrock löst das, dafür verzichten Sie auf die Nutzungs-Dashboards von Anthropic.
- **GitHub Copilot:** Ihre Repositories liegen nicht in GitHub, Cloud Agent und Partner Agents hätten also nichts zu bearbeiten.
- **Codex:** Sie haben nur ChatGPT Business und brauchen EU-Verarbeitung, oder das Team will Codex Web, das selbst mit Enterprise von der Residenz ausgenommen ist.

## Wie entscheiden Sie in vier Wochen?

```schritte
Bestand aufnehmen | Woche 1
  Prüfen Sie, ob die Org in der EU Operating Zone liegt, und listen Sie Ihre Verträge mit Salesforce, GitHub, Anthropic, OpenAI und AWS.
Regeln klären | Woche 2
  Klären Sie die Residenzregel mit dem Datenschutz und starten Sie das Verfahren mit dem Betriebsrat.
Freigeben | Woche 3
  Geben Sie höchstens zwei Werkzeuge frei, alle Konten auf den Kunden, und schreiben Sie die Regeldatei.
Testen | Woche 4
  Lassen Sie 10 bis 15 Backlog-Aufgaben durch die freigegebenen Werkzeuge und dieselben Pipeline-Prüfungen laufen, wie in [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/) beschrieben.
```

Diese Regeln über mehrere Partner hinweg festzulegen, gehört zu meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/) und im [DevOps- und Release-Management](../../leistungen/devops-und-release-management/).

Wählen Sie den Coding-Agenten nach Vertrag, Residenz und Governance, und halten Sie die Qualität in Regeldatei und Pipeline, die Ihnen gehören.
