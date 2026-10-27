---
title: "Partner codet mit KI: Was in den Vertrag gehört"
description: "Ihr Salesforce-Partner programmiert mit KI-Agenten? Neun Prüfpunkte für SOW und Rahmenvertrag: Tools, Daten, Produktion, Review, Rechte, Haftung."
pubDate: 2026-10-27
lang: de
slug: partner-ki-coding-regeln-vertrag
translationKey: partners-ai-coding-sow-rules
topic: governance
categories: [architecture, ai]
contactBrief: partner-governance
tags: [Partnersteuerung, KI-Coding, Leistungsbeschreibung, Datenschutz, Code-Review, Maschinenbau]
takeaways:
  - "Programmiert ein Salesforce-Partner mit KI-Agenten, sollte die Leistungsbeschreibung offengelegte Tools und Modellwege, erlaubte Daten, keinen Produktionszugriff, Review jeder Zeile, Rechte und Haftung regeln."
  - "Anthropic trainiert nicht mit Code, der unter kommerziellen Bedingungen an Claude Code geht; bei Free, Pro und Max hängt das Training an einer Nutzereinstellung. Private Konten gehören nicht ins Kundenprojekt."
  - "Vollständig von KI erzeugter Code ist nach deutschem Recht laut CMS gemeinfrei; eine Klausel, die alle Rechte auf den Kunden überträgt, kann also weniger übertragen, als sie verspricht."
  - "Die Urheberrechts-Freistellung eines Modellanbieters schützt dessen eigenen Kunden, also den Partner, nicht den Hersteller, der den Code bekommt."
  - "Veracode misst 2026 für ungeprüften KI-Code eine Sicherheits-Passrate von 56 Prozent, für Java 30 Prozent; deshalb gehören Review und Pipeline-Prüfungen in den Vertrag."
faq:
  - q: "Kann ich meinem Salesforce-Partner KI-Coding-Tools verbieten?"
    a: "Können Sie, ich würde es aber nicht tun. Ein Verbot lässt sich kaum prüfen und kostet Tempo. Lassen Sie den Partner Tools und Modellwege offenlegen, begrenzen Sie, welche Daten das Modell sieht, und verlangen Sie dasselbe Review für jede Zeile."
  - q: "Wem gehört Code, den ein KI-Agent für mein Projekt geschrieben hat?"
    a: "Laut CMS ist vollständig KI-generierter Code nach deutschem Recht gemeinfrei, weil nur ein Mensch Urheber sein kann. Menschliche Anteile können geschützt sein. Die Rechteklausel sollte ein Anwalt formulieren; dieser Beitrag ist keine Rechtsberatung."
  - q: "Welche Daten darf der Coding-Agent eines Partners sehen?"
    a: "Code und Metadaten ja. Produktivdaten, personenbezogene Daten, Händlerpreise und Kundenstammdaten aus Servicefällen nein. Agenten sollten in Scratch Orgs oder Developer-Sandboxes mit anonymisierten Daten arbeiten."
  - q: "Schützt mich die Freistellung des Modellanbieters als Kunde?"
    a: "Meist nicht direkt. Anthropic etwa hat 2023 angekündigt, unter seinen Commercial Terms die eigenen Kunden zu verteidigen. Im Partnerprojekt ist dieser Kunde der Partner, Ihr Schutz muss also aus dem Partnervertrag kommen."
draft: false
---

Programmiert Ihr Salesforce-Umsetzungspartner mit KI-Agenten, braucht der Vertrag Regeln für KI-Coding, die eine klassische Leistungsbeschreibung nicht abdeckt: welche Tools und Modellwege genutzt werden, welche Daten ins Modell dürfen, kein Produktionszugriff für Agenten, dasselbe Review für jede Zeile und wem Code gehört, den eine Maschine geschrieben hat. Verbieten würde ich KI-Coding nicht. Ich würde den Partner offenlegen lassen, wie er arbeitet, und das prüfbar machen. Heikel ist für Hersteller vor allem, was ein Agent lesen kann: Servicefälle, Händlerpreise und SAP-Zugangsdaten.

Eine Anmerkung vorweg: Ich bin Architekt, kein Anwalt. Die Punkte unten beschreiben, was ich aus technischer Sicht prüfe und schriftlich sehen möchte. Sie sind keine Rechtsberatung. Ihre Rechtsabteilung oder ein Anwalt macht daraus Klauseln, die zu Ihrem Rahmenvertrag passen.

## Warum braucht KI-Coding durch Partner eigene Klauseln?

Ein klassisches SOW (Statement of Work, die Leistungsbeschreibung) regelt Lieferumfang, Abnahme, Rechte und Vertraulichkeit. Stillschweigend geht es davon aus, dass Menschen des Partners den Code auf Rechnern des Partners geschrieben haben. Mit einem Coding-Agenten ändern sich drei Dinge.

**Daten verlassen das Haus über einen neuen Kanal.** Was der Agent liest, geht als Prompt an einen Modellanbieter. Ob der damit trainiert, hängt am Vertragstyp, nicht am Tool. Anthropic schreibt, dass es [nicht mit Code oder Prompts trainiert, die unter kommerziellen Bedingungen an Claude Code gehen](https://code.claude.com/docs/en/data-usage) (Team, Enterprise, API); bei den Verbraucherplänen Free, Pro und Max hängt das Training an einer Nutzereinstellung. Kommerzielle Konten haben eine Standard-Aufbewahrung von 30 Tagen. Dazu speichert Claude Code Sitzungsprotokolle standardmäßig 30 Tage lokal im Klartext. Auf dem Laptop eines Entwicklers liegt also eine Kopie dessen, was der Agent gelesen hat.

**Die Codemenge wächst schneller als die Review-Kapazität.** Veracode hat 2026 mehr als 100 Modelle getestet und eine [durchschnittliche Sicherheits-Passrate von 56 Prozent](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) gemessen, für Java, den nächsten Verwandten von Apex, 30 Prozent. Getestet wurden reine Modelle ohne Tooling und ohne menschliches Review. Das Review ist die Kontrolle, also gehört es in den Vertrag.

**Die Rechtelage wird unscharf.** Laut [CMS](https://cms.law/de/deu/legal-updates/ki-generierter-softwarecode-in-der-due-diligence) ist vollständig von KI erzeugter Code nach deutschem Recht gemeinfrei, weil nur ein Mensch Urheber sein kann, und die AGB des Anbieters ändern daran nichts. Und die Zusagen des Anbieters gelten seinem eigenen Kunden. Als Anthropic im Dezember 2023 seine [Urheberrechts-Freistellung](https://www.anthropic.com/news/expanded-legal-protections-api-improvements) einführte, versprach es, „our customers“ zu verteidigen. Im Partnerprojekt ist dieser Kunde der Partner, nicht Sie.

## Welche Regeln für KI-Coding gehören in den Partnervertrag?

Diese neun Punkte nutze ich als Prüfliste für Leistungsbeschreibungen und Rahmenverträge. Nicht jedes Programm braucht alle in derselben Tiefe.

1. **Offenlegung von Tools und Modellwegen.** Der Partner nennt jedes Coding-Tool, den Modellanbieter, den Weg (direkte API, Cloud-Anbieter oder ein Salesforce-Werkzeug wie Agentforce Vibes) und den Vertragstyp. Änderungen kündigt er vor dem Einsatz an. Der Weg entscheidet, wo Daten verarbeitet werden: Anthropics eigene API bietet als Inferenzregion nur [„us“ oder „global“](https://platform.claude.com/docs/en/manage-claude/data-residency), bei Amazon Bedrock folgt die Region dem Endpunkt. OpenAI bietet seit Februar 2025 [europäische Datenresidenz für API-Projekte](https://openai.com/index/introducing-data-residency-in-europe/).
2. **Nur kommerzielle Konten.** Keine privaten Pro- oder Max-Konten im Kundenprojekt. Stellen Sie die Lizenzen selbst, bestimmen Sie auch die Einstellungen, wie in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) beschrieben. Wer die Tokens bezahlt, ist eine eigene Verhandlung, siehe [KI-Coding-Kosten im Salesforce-Projekt](../ki-coding-kosten-salesforce-projekt/).
3. **Datenklassen für den Agentenkontext.** Code und Metadaten dürfen ins Modell. Produktivdaten, personenbezogene Daten, Händlerpreislisten, Konditionen und Kundendaten aus Servicefällen nicht. Agenten arbeiten in Scratch Orgs oder Developer-Sandboxes mit anonymisierten Daten. Eine Full-Copy-Sandbox zählt als Produktivdaten.
4. **Kein Produktionszugriff für Agenten.** Deployments nach Produktion laufen über die Pipeline mit menschlicher Freigabe. Salesforce erlaubt, [Agentforce Vibes für eine Produktions-Org im Setup abzuschalten](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes), und der [Salesforce DX MCP Server](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-mcp.html) erreicht nur Orgs, die ausdrücklich freigegeben sind. Zugangsdaten wie der SAP-Integrationsnutzer bleiben außer Reichweite des Agenten; Anthropics [Leitfaden für sicheren Betrieb](https://code.claude.com/docs/en/agent-sdk/secure-deployment) beschreibt einen Proxy, der sie einsetzt, ohne dass der Agent sie je sieht.
5. **Dasselbe Review für jede Zeile.** Jeder Pull Request hat einen benannten menschlichen Verantwortlichen, der KI-Anteil steht in der Beschreibung, und die Pipeline-Prüfungen gelten unverändert. Salesforce formuliert es in der eigenen Vibes-Dokumentation so: [„Permission modes protect your filesystem. Code review protects your application.“](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-trust.html) Wie Reviews ablaufen, steht in [warum Pull-Request-Reviews Pflicht sind](../warum-pull-request-reviews-pflicht-sind/), worauf es bei KI-Code ankommt, in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/).
6. **Regeldatei in Ihrem Repository.** Konventionen für Agenten wie API-Version, Sharing und Teststandards stehen in einer KI-Regeldatei in Ihrem Repository und gelten für jeden Partner. Mehr dazu in [eine KI-Regeldatei für das Salesforce-Repository](../ki-regeldatei-salesforce-repository/).
7. **Rechte und Lizenzen.** Die Rechteklausel erfasst menschliche und KI-generierte Anteile, und der Partner dokumentiert, wo KI eingesetzt wurde, was CMS für spätere Due-Diligence-Prüfungen empfiehlt. Fragen Sie, wie mit Treffern aus öffentlichem Code umgegangen wird: GitHub Copilot kann [Vorschläge blockieren, die öffentlichem Code entsprechen](https://github.blog/news-insights/product-news/code-referencing-now-generally-available-in-github-copilot-and-with-microsoft-azure-ai/), oder sie mit Lizenzhinweis anzeigen.
8. **Die Haftung bleibt, wo sie war.** Der Partner steht für seine Lieferungen ein, egal welches Werkzeug sie erzeugt hat. Gewährleistung, Abnahmekriterien und Mängelbehandlung gelten wie bisher, ohne Ausnahme für „von KI erzeugt“. CMS warnt, dass Freistellungen der Anbieter oft weitreichende Ausschlüsse haben; sie ersetzen die des Partners also nicht.
9. **Nachweise und Ausstieg.** Sie dürfen Tool-Liste, Kontenliste und relevante Einstellungen zu Beginn und einmal im Jahr anfordern. Zum Ende des Auftrags bestätigt der Partner, dass lokale Protokolle und Caches mit Ihrem Code gelöscht sind.

## Ein typisches Szenario: zwei Partner, ein Fragebogen

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud und Field Service für den Außendienst auf einer Org, SAP als ERP und zwei Partnern. Partner A baut mit sechs Entwicklern das Händlerportal und die Serviceprozesse, Partner B mit drei Entwicklern die SAP-Schnittstelle. Alle Details sind Annahmen, die das Vorgehen zeigen sollen.

Bevor die Leistungsbeschreibungen verlängert werden, schickt die IT beiden Partnern einen einseitigen Fragebogen: Tools, Modellwege, Kontotypen, Sandboxes mit echten Daten, wer welche Zugangsdaten hat. Die Antworten im Szenario:

- Partner A nutzt einen Coding-Agenten mit Firmenkonto, zwei Entwickler weichen aber gelegentlich auf private Konten aus, wenn das Firmenkontingent aufgebraucht ist.
- Der Agent von Partner A arbeitet in einer Full-Copy-Sandbox mit echten Servicefällen samt Kundennamen und Seriennummern der Maschinen.
- Partner B hat das Passwort des SAP-Integrationsnutzers in einer lokalen Datei im Projektordner, den der Agent lesen kann.
- Partner B lässt Vorschläge zu, die öffentlichem Code entsprechen, und hat die Lizenzhinweise nie angesehen.

Keiner dieser vier Befunde wäre im Code-Review aufgefallen, denn der Code selbst ist in Ordnung. Die Lösung ist eine zweiseitige Anlage zum Rahmenvertrag mit den neun Punkten oben, dazu einige Wochen, um Partner A auf eine Developer-Sandbox mit anonymisierten Daten umzustellen und die Zugangsdaten von Partner B in den Tresor des Kunden zu verlegen. Für neue Leistungsbeschreibungen gilt die Anlage automatisch.

## Was ändert sich, wenn mehrere Partner an einer Org arbeiten?

Agenten machen Änderungen billig, auch Änderungen an Objekten, die ein anderer Stream verantwortet. Ein Agent, der bei einer Story fürs Händlerportal eine Validierungsregel auf dem Account „repariert“, weiß nicht, dass der Service-Stream davon abhängt. Damit wird die [Object Ownership Matrix](../object-ownership-matrix-salesforce/) wichtiger. Eine CODEOWNERS-Datei im Repository fragt den verantwortlichen Stream automatisch als Reviewer an, wenn ein Pull Request seine Objekte berührt.

Die Anlage sollte für alle Partner identisch sein. Bringt jeder Partner eigene KI-Regeln mit, wird stillschweigend die strengste oder die lauteste zu Ihrem Standard, und Partner lassen sich schwerer vergleichen. Diese Regeln auf Kundenseite festzulegen, gehört zu meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/).

## Wo sollten Sie anfangen?

1. **Den Fragebogen verschicken**, an jeden Partner, auch an kleine, die nur eine Schnittstelle liefern.
2. **Ihre Daten einteilen** in das, was ein Agent sehen darf, und das, was nicht, gemeinsam mit Ihrem Datenschutzbeauftragten.
3. **Die Anlage mit Ihrer Rechtsabteilung entwerfen** und an den Rahmenvertrag hängen, damit sie für jede Leistungsbeschreibung gilt.
4. **Technisch durchsetzen**: Vibes für Produktion abgeschaltet, Deployments nur über die Pipeline, CODEOWNERS für gemeinsame Objekte.
5. **Einmal im Jahr prüfen**, denn Tools, Tarife und Nutzungsbedingungen ändern sich schneller als Verträge.

KI-Coding durch Partner ist in Ordnung, wenn der Vertrag regelt, welche Tools, welche Daten und welches Review gelten, und Sie das prüfen können. Wenn Sie eine zweite Meinung zu Ihren Partnerverträgen aus technischer Sicht möchten, [schreiben Sie mir](#contact).
