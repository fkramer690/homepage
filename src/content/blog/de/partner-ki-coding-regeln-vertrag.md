---
title: "Partner codet mit KI: Was in den Vertrag gehört"
description: "Ihr Salesforce-Partner programmiert mit KI-Agenten? Neun Prüfpunkte für SOW und Rahmenvertrag: Tools, Daten, Produktion, Review, Rechte, Haftung."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: partner-ki-coding-regeln-vertrag
translationKey: partners-ai-coding-sow-rules
topic: governance
categories: [architecture, ai]
contactBrief: partner-governance
tags: [Partnersteuerung, KI-Coding, Leistungsbeschreibung, Datenschutz, Code-Review, Maschinenbau]
takeaways:
  - "Bei Claude Code unter kommerziellen Bedingungen trainiert Anthropic nicht mit Ihrem Code, bei Free, Pro und Max entscheidet eine Nutzereinstellung."
  - "Vollständig von KI erzeugter Code ist nach Ansicht von CMS urheberrechtlich nicht geschützt, eine Rechteklausel überträgt dann weniger, als sie verspricht."
  - "Die Freistellung eines Modellanbieters schützt seinen Vertragspartner, meist den Partner, und schließt veränderten oder kombinierten Output aus."
  - "Veracode misst für ungeprüfte Modellausgaben 56 Prozent Sicherheits-Passrate, Apex wurde nicht getestet. Review und Prüfungen gehören in den Vertrag."
faq:
  - q: "Kann ich meinem Salesforce-Partner KI-Coding-Tools verbieten?"
    a: "Können Sie, und für einzelne Hochrisikobereiche kann das richtig sein. Allgemein würde ich es nicht tun, denn ein Verbot lässt sich kaum prüfen. Lassen Sie den Partner Tools und Modellwege offenlegen, begrenzen Sie, welche Daten das Modell sieht, und verlangen Sie dasselbe Review und dieselben Sicherheitsprüfungen für jede Zeile."
  - q: "Wem gehört Code, den ein KI-Agent für mein Projekt geschrieben hat?"
    a: "Nach Ansicht von CMS ist vollständig KI-generierter Code nach deutschem Urheberrecht nicht geschützt, weil nur ein Mensch Urheber sein kann. Menschliche Anteile können geschützt sein, und Rechte Dritter oder Geschäftsgeheimnisse gelten trotzdem. Die Rechteklausel sollte ein Anwalt formulieren; dieser Beitrag ist keine Rechtsberatung."
  - q: "Welche Daten darf der Coding-Agent eines Partners sehen?"
    a: "Code und Metadaten nach einer Prüfung auf personenbezogene Daten, Secrets und vertrauliche Logik. Produktivdaten, personenbezogene Daten, Händlerpreise und Kundenstammdaten aus Servicefällen nein. Der Org-Typ allein schützt nicht: Agenten sollten mit synthetischen oder dokumentiert maskierten Daten arbeiten."
  - q: "Schützt mich die Freistellung des Modellanbieters als Kunde?"
    a: "Meist nicht direkt. Anthropic etwa verteidigt unter seinen Commercial Terms den eigenen Kunden, mit Ausnahmen wie verändertem oder mit anderem Code kombiniertem Output. Hält der Partner das Konto, ist dieser Kunde der Partner, Ihr Schutz muss also aus dem Partnervertrag kommen."
draft: false
---

Programmiert Ihr Salesforce-Umsetzungspartner mit KI-Agenten, prüfen Sie den Vertrag auf Regeln für KI-Coding, die eine klassische Leistungsbeschreibung selten abdeckt: welche Tools und Modellwege genutzt werden, welche Daten ins Modell dürfen, kein Produktionszugriff für Agenten, dasselbe Review und dieselben Sicherheitsprüfungen für jede Zeile und wem Code gehört, den eine Maschine geschrieben hat. Verbieten würde ich KI-Coding nicht. Ich würde den Partner offenlegen lassen, wie er arbeitet, und das prüfbar machen. Heikel ist für Hersteller vor allem, was ein Agent lesen kann: Servicefälle, Händlerpreise und SAP-Zugangsdaten.

```hinweis achtung
Ich bin Architekt, kein Anwalt. Die Punkte unten beschreiben, was ich aus technischer Sicht prüfe und schriftlich sehen möchte. Sie sind keine Rechtsberatung. Ihre Rechtsabteilung oder ein Anwalt macht daraus Klauseln, die zu Ihrem Rahmenvertrag passen.
```

## Warum braucht KI-Coding durch Partner eigene Klauseln?

Ein klassisches SOW (Statement of Work, die Leistungsbeschreibung) regelt Lieferumfang, Abnahme, Rechte und Vertraulichkeit. Stillschweigend geht es davon aus, dass Menschen des Partners den Code auf Rechnern des Partners geschrieben haben. Mit einem Coding-Agenten ändern sich drei Dinge.

**Daten verlassen das Haus über einen neuen Kanal.** Dateien, Metadaten und Tool-Ergebnisse, die der Agent in den Modellkontext holt, gehen an den eingestellten Modellanbieter; der genaue Weg hängt von Tool, Anbieter und Gateway ab. Ob der damit trainiert, hängt am Vertragstyp, nicht am Tool. Anthropic schreibt, dass es [nicht mit Code oder Prompts trainiert, die unter kommerziellen Bedingungen an Claude Code gehen](https://code.claude.com/docs/en/data-usage) (Team, Enterprise, API); bei den Verbraucherplänen Free, Pro und Max hängt das Training an einer Nutzereinstellung. Kommerzielle Konten haben eine Standard-Aufbewahrung von 30 Tagen. Dazu speichert Claude Code Sitzungsprotokolle standardmäßig 30 Tage lokal im Klartext. Auf dem Laptop eines Entwicklers liegt also eine Kopie dessen, was der Agent gelesen hat.

**Die Codemenge wächst schneller als die Review-Kapazität.** Veracode hat im Bericht von 2026 die [Sicherheits-Passrate von KI-generiertem Code](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) gemessen. Getestet wurden über 100 reine Modelle ohne Sicherheitsvorgaben, ohne Tooling und ohne menschliches Review. Apex war nicht dabei, und der Java-Wert sagt über Apex mit seiner eigenen Laufzeit und seinem eigenen Sicherheitsmodell nichts Belastbares. Der Schluss bleibt: Review plus automatische Sicherheitsprüfungen sind die Kontrolle, also gehören beide in den Vertrag.

```kennzahlen
56 % | durchschnittliche Sicherheits-Passrate für KI-generierten Code
30 % | Passrate für Java in denselben Tests (Apex wurde nicht getestet)
quelle: Veracode, GenAI Code Security Report 2026
```

**Die Rechtelage wird unscharf.** Nach Ansicht von [CMS](https://cms.law/de/deu/legal-updates/ki-generierter-softwarecode-in-der-due-diligence) ist Code, der ganz ohne menschlichen Beitrag entsteht, nach deutschem Urheberrecht nicht geschützt, weil nur ein Mensch Urheber sein kann, und die AGB des Anbieters ändern daran nichts. Ob ein Arbeitsergebnis diese Schwelle erreicht, hängt vom Einzelfall ab, und Rechte Dritter können trotzdem bestehen. Und die Zusagen des Anbieters gelten seinem eigenen Kunden. Anthropics [Commercial Terms](https://www.anthropic.com/legal/commercial-terms) (gültig seit 17. Juni 2025) verteidigen den Kunden, der sie unterschrieben hat, und schließen Ansprüche aus verändertem Output, aus Output in Kombination mit fremder Technik oder fremden Inhalten und aus eigenen Eingaben des Kunden aus. Code in einer Salesforce-Org ist fast immer verändert und kombiniert. Hält der Partner das Konto, ist dieser Kunde der Partner, nicht Sie.

## Welche Regeln für KI-Coding gehören in den Partnervertrag?

Diese neun Punkte nutze ich als Prüfliste für Leistungsbeschreibungen und Rahmenverträge. Nicht jedes Programm braucht alle in derselben Tiefe.

1. **Offenlegung von Tools und Modellwegen.** Der Partner nennt jedes Coding-Tool, den Modellanbieter, den Weg (direkte API, Cloud-Anbieter oder ein Salesforce-Werkzeug wie Agentforce Vibes) und den Vertragstyp. Änderungen kündigt er vor dem Einsatz an. Der Weg entscheidet, wo Daten verarbeitet werden: Anthropics eigene API bietet als Inferenzregion nur [„us“ oder „global“](https://platform.claude.com/docs/en/manage-claude/data-residency), bei Amazon Bedrock folgt die Region dem Endpunkt. OpenAI hat im Februar 2025 [europäische Datenresidenz](https://openai.com/index/introducing-data-residency-in-europe/) für berechtigte Endpunkte in neu angelegten API-Projekten eingeführt, der Partner sollte also Projektregion, Endpunkt und Aufbewahrungseinstellung dokumentieren.
2. **Nur kommerzielle Konten.** Keine privaten Pro- oder Max-Konten im Kundenprojekt. Stellen Sie die Lizenzen selbst, bestimmen Sie auch die Einstellungen, wie in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) beschrieben. Wer die Tokens bezahlt, ist eine eigene Verhandlung, siehe [KI-Coding-Kosten im Salesforce-Projekt](../ki-coding-kosten-salesforce-projekt/).
3. **Datenklassen für den Agentenkontext.** Code und Metadaten dürfen ins Modell, wenn ein Scan oder Review bestätigt, dass sie keine personenbezogenen Daten, Secrets oder vertrauliche Logik außerhalb der vereinbarten Klasse enthalten; auch Metadaten enthalten Benutzernamen, Endpunkte und Preislogik. Produktivdaten, personenbezogene Daten, Händlerpreislisten, Konditionen und Kundendaten aus Servicefällen nicht. Der Org-Typ ist keine Kontrolle: Eine Developer-Sandbox kopiert Metadaten, keine Datensätze, lässt sich aber nachträglich mit echten Daten füllen. Agenten arbeiten mit synthetischen oder dokumentiert maskierten Daten, geprüft nach jedem Refresh. Eine Full-Copy-Sandbox enthält eine Kopie der Produktivdaten. Verarbeitet der Partner personenbezogene Daten in Ihrem Auftrag, nennt der Vertrag auch die Verarbeitungskette: Unterauftragsverarbeiter einschließlich Modellanbieter, Verarbeitungsländer, Übermittlungsgrundlage, Löschfristen und Meldung von Vorfällen.
4. **Kein Produktionszugriff für Agenten.** Deployments nach Produktion laufen über die Pipeline mit menschlicher Freigabe. Salesforce erlaubt, [Agentforce Vibes für eine Produktions-Org im Setup abzuschalten](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes), das stoppt aber nur Vibes, wenn die Produktion die Standard-Org ist. Andere KI-Tools, die Salesforce CLI oder MCP-Server hält es nicht auf. Der lokale [Salesforce DX MCP Server](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-mcp.html), der nur ausdrücklich freigegebene Orgs erreichte, hat am 2. November 2026 das Ende seiner Laufzeit erreicht, siehe [Ende des Salesforce DX MCP Server](../salesforce-dx-mcp-server-ende/). Was die Regel wirklich durchsetzt: keine Produktions-Zugangsdaten auf Entwicklerrechnern, keine Produktions-Org in Agenten- oder MCP-Konfigurationen, getrennte technische Identitäten und regelmäßige Prüfung der autorisierten Orgs. Zugangsdaten wie der SAP-Integrationsnutzer bleiben außer Reichweite des Agenten; Anthropics [Leitfaden für sicheren Betrieb](https://code.claude.com/docs/en/agent-sdk/secure-deployment) beschreibt einen Proxy, der sie einsetzt, ohne dass der Agent sie je sieht.
5. **Dasselbe Review und dieselben Prüfungen für jede Zeile.** Jeder Pull Request hat einen benannten menschlichen Verantwortlichen und nennt Tool, Modell und Art der KI-Nutzung (erzeugt, geändert oder nur geprüft), und die Pipeline-Prüfungen gelten unverändert: Salesforce Code Analyzer, Secret Scanning, Regeln zu CRUD/FLS und Sharing, Prüfung dynamischer SOQL und ein Lizenzscan. Salesforce formuliert es in der eigenen Vibes-Dokumentation so: [„Permission modes protect your filesystem. Code review protects your application.“](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-trust.html) Wie Reviews ablaufen, steht in [warum Pull-Request-Reviews Pflicht sind](../warum-pull-request-reviews-pflicht-sind/), worauf es bei KI-Code ankommt, in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/).
6. **Regeldatei in Ihrem Repository.** Konventionen für Agenten wie API-Version, Sharing und Teststandards stehen in einer KI-Regeldatei in Ihrem Repository und gelten für jeden Partner. Tools lesen unterschiedliche Dateinamen, also zeigt der Partner, dass sein Tool sie lädt; verbindliche Kontrolle bleibt die Pipeline. Mehr dazu in [eine KI-Regeldatei für das Salesforce-Repository](../ki-regeldatei-salesforce-repository/).
7. **Rechte und Lizenzen.** Die Rechteklausel erfasst menschliche und KI-generierte Anteile, und der Partner dokumentiert, wo KI eingesetzt wurde, was CMS für spätere Due-Diligence-Prüfungen empfiehlt. Fragen Sie, wie mit Treffern aus öffentlichem Code umgegangen wird: GitHub Copilot kann [Vorschläge blockieren, die öffentlichem Code entsprechen](https://github.blog/news-insights/product-news/code-referencing-now-generally-available-in-github-copilot-and-with-microsoft-azure-ai/), oder sie mit Lizenzhinweis anzeigen.
8. **Die Haftung bleibt, wo sie war.** Der Partner steht für seine Lieferungen ein, egal welches Werkzeug sie erzeugt hat. Gewährleistung, Abnahmekriterien und Mängelbehandlung gelten wie bisher, ohne Ausnahme für „von KI erzeugt“. CMS warnt, dass Freistellungen der Anbieter oft weitreichende Ausschlüsse haben; sie ersetzen die des Partners also nicht.
9. **Nachweise und Ausstieg.** Neue Tools, Anbieter oder Wege brauchen vor dem Einsatz eine Freigabe. Sie dürfen Tool-Liste, Kontenliste und relevante Einstellungen zu Beginn, bei jeder wesentlichen Änderung und bei begründetem Verdacht anfordern, und der Partner meldet abgeflossene Zugangsdaten oder fehlgeleitete Daten unverzüglich. Zum Ende des Auftrags bestätigt der Partner, dass lokale Protokolle, Caches, Cloud-Sitzungen und Feedback-Uploads mit Ihrem Code gelöscht sind, oder nennt, was aufbewahrt werden muss und warum.

## Beispiel: zwei Partner, ein Fragebogen

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud und Field Service für den Außendienst auf einer Org, SAP als ERP und zwei Partnern. Partner A baut mit sechs Entwicklern das Händlerportal und die Serviceprozesse, Partner B mit drei Entwicklern die SAP-Schnittstelle. Alle Details sind Annahmen, die das Vorgehen zeigen sollen.

Bevor die Leistungsbeschreibungen verlängert werden, schickt die IT beiden Partnern einen einseitigen Fragebogen: Tools, Modellwege, Kontotypen, Sandboxes mit echten Daten, wer welche Zugangsdaten hat. Die Antworten im Szenario:

- Partner A nutzt einen Coding-Agenten mit Firmenkonto, zwei Entwickler weichen aber gelegentlich auf private Konten aus, wenn das Firmenkontingent aufgebraucht ist.
- Der Agent von Partner A arbeitet in einer Full-Copy-Sandbox mit echten Servicefällen samt Kundennamen und Seriennummern der Maschinen.
- Partner B hat das Passwort des SAP-Integrationsnutzers in einer lokalen Datei im Projektordner, den der Agent lesen kann.
- Partner B lässt Vorschläge zu, die öffentlichem Code entsprechen, und hat die Lizenzhinweise nie angesehen.

Nur der letzte Befund könnte im Code-Review oder Lizenzscan auffallen, die anderen drei nicht, denn der Code selbst ist in Ordnung. Die Lösung ist eine zweiseitige Anlage zum Rahmenvertrag mit den neun Punkten oben, dazu einige Wochen, um Partner A auf eine Developer-Sandbox mit maskierten Daten umzustellen und die Zugangsdaten von Partner B in den Tresor des Kunden zu verlegen. Für neue Leistungsbeschreibungen gilt die Anlage automatisch.

## Was ändert sich, wenn mehrere Partner an einer Org arbeiten?

Agenten machen Änderungen billig, auch Änderungen an Objekten, die ein anderer Stream verantwortet. Ein Agent, der bei einer Story fürs Händlerportal eine Validierungsregel auf dem Account „repariert“, weiß nicht, dass der Service-Stream davon abhängt. Damit wird die [Object Ownership Matrix](../object-ownership-matrix-salesforce/) wichtiger. Eine CODEOWNERS-Datei im Repository fragt den verantwortlichen Stream automatisch als Reviewer an, wenn ein Pull Request seine Objekte berührt.

Die Anlage sollte für alle Partner identisch sein. Bringt jeder Partner eigene KI-Regeln mit, wird stillschweigend die strengste oder die lauteste zu Ihrem Standard, und Partner lassen sich schwerer vergleichen. Damit die Regeln nach einigen Monaten nicht verwässern, braucht es mehr als den Vertrag: Pipeline, Review und einen festen Termin für neue Fälle, beschrieben in [Reinforcement: Standards bei Partnern verankern](../standards-partner-verankern-reinforcement/). Diese Regeln auf Kundenseite festzulegen, gehört zu meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/).

## Einen Fragebogen an jeden Partner schicken

```schritte
Fragebogen verschicken
  An jeden Partner, auch an kleine, die nur eine Schnittstelle liefern.
Daten einteilen
  In das, was ein Agent sehen darf, und das, was nicht, gemeinsam mit Ihrem Datenschutzbeauftragten.
Anlage entwerfen
  Mit Ihrer Rechtsabteilung, angehängt an den Rahmenvertrag, damit sie für jede Leistungsbeschreibung gilt.
Technisch durchsetzen
  Keine Produktions-Zugangsdaten auf Entwicklerrechnern, Vibes für Produktion abgeschaltet, Deployments nur über die Pipeline, CODEOWNERS für gemeinsame Objekte.
Bei jeder Änderung prüfen
  Tools, Tarife und Nutzungsbedingungen ändern sich schneller als Verträge, also löst ein neues Tool oder ein neuer Weg eine Prüfung aus, dazu eine jährliche Durchsicht.
```
