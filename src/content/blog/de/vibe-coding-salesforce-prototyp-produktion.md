---
title: "Vibe Coding in Salesforce: Prototyp oder Produktion?"
description: "Wo Vibe Coding in Salesforce Herstellern hilft, vom Händlerportal-Mock-up bis zum Service-Cockpit, und warum Produktivcode Review, Tests und CI braucht."
pubDate: 2026-10-27
lang: de
slug: vibe-coding-salesforce-prototyp-produktion
translationKey: vibe-coding-prototype-not-production
topic: devops
categories: [devops, ai]
tags: [Vibe Coding, Agentforce Vibes, KI-Coding, Prototyping, DevOps, Maschinenbau]
takeaways:
  - "Vibe Coding passt zu Workshop-Prototypen wie einem Händlerportal-Mock-up, gebaut in einer Developer Edition mit Testdaten und danach verworfen."
  - "Code für eine Org mit Händler-, Garantie- oder Servicedaten braucht agentic engineering: Ein Mensch prüft, Tests und Pipeline-Gates entscheiden."
  - "Der Prototyp wird zur Spezifikation mit Masken und Abnahmekriterien. Die Produktivumsetzung beginnt neu im Repository des Kunden."
  - "Eine Developer Edition bekommt 110 Anfragen an Agentforce Vibes für einen Monat, eine Scratch Org lebt standardmäßig 7 und höchstens 30 Tage."
  - "Reine Modelle schreiben fast immer kompilierbaren Code, aber laut Veracode bestehen nur 56 Prozent die Sicherheitstests."
faq:
  - q: "Was ist Vibe Coding in Salesforce?"
    a: "Vibe Coding heißt, einem Coding-Agenten wie Agentforce Vibes oder Claude Code eine Funktion zu beschreiben und das Ergebnis zu übernehmen, ohne den Code zu lesen. In Salesforce entstehen so schnell lauffähige LWCs, Apex-Klassen und Metadaten. Für Prototypen ist das nützlich, für Produktion riskant."
  - q: "Darf ein per Vibe Coding gebauter Prototyp in Produktion?"
    a: "So wie er ist, würde ich ihn nicht deployen. Prototypen entstehen meist als Administrator mit Testdaten, ohne Sharing-Modell, Bulk-Tests und Versionsverwaltung. Nutzen Sie den Prototyp als Spezifikation und bauen Sie die Funktion über Plan, Review und Pipeline neu."
  - q: "Welche Org eignet sich für Vibe-Coding-Prototypen?"
    a: "Eine Developer Edition oder eine Scratch Org ohne echte Kundendaten und ohne Verbindung zu SAP oder anderen Produktivsystemen. In der produktiven Org können Admins Agentforce Vibes im Setup unter Agentforce Vibes Extensions abschalten."
  - q: "Was unterscheidet Vibe Coding von agentic engineering?"
    a: "Martin Fowler trennt beides: Beim Vibe Coding liest niemand den erzeugten Code; beim agentic engineering schreibt ein Sprachmodell den Code, Entwickler prüfen ihn aber und achten auf seine Struktur. Produktive Salesforce-Arbeit braucht das Zweite."
draft: false
---

Vibe Coding in Salesforce lohnt sich dort, wo der Code weggeworfen werden soll: ein klickbares Händlerportal-Mock-up für den Anforderungsworkshop, ein Service-Cockpit als LWC, das der Serviceleitung zeigt, wie die Maske aussehen könnte, ein Skript, das eine Testorg mit Ersatzteilen füllt. Bauen Sie so etwas in einer Developer Edition oder Scratch Org mit Testdaten. Für alles, was in eine Org mit Händler-, Garantie- oder Servicedaten geht, wechseln Sie zu agentic engineering: freigegebener Plan, menschliches Review, Tests und Pipeline-Gates. Der Prototyp wird zur Spezifikation, die Produktivumsetzung beginnt neu in Ihrem Repository.

## Was bedeutet Vibe Coding, und wo hört es auf?

Andrej Karpathy hat den Begriff im Februar 2025 geprägt: Man gibt sich ganz den „vibes“ hin und vergisst, „that the code even exists“. Simon Willison hat ihn [eingegrenzt](https://simonwillison.net/2025/May/1/not-vibe-coding/) auf „generating code with AI without caring about the code that is produced“ und betont, dass das etwas anderes ist, als KI-Werkzeuge verantwortungsvoll für Produktivcode zu nutzen. Im Mai 2026 hat Martin Fowler der verantwortungsvollen Variante einen eigenen Namen gegeben. In seinem [Bliki-Eintrag](https://martinfowler.com/bliki/VibeCoding.html) vergessen Entwickler, die ein Sprachmodell den Code schreiben lassen und ihn trotzdem prüfen, eben nicht, dass es den Code gibt. Er nennt das agentic engineering.

Die Grenze verläuft also entlang einer Frage: Liest jemand den Code? Dieselbe Sitzung in Agentforce Vibes kann in einer Developer Edition Vibe Coding sein und in einer Scratch Org aus Ihrem Repository agentic engineering. Die Begriffe und die vier Ebenen von KI im Salesforce-Projekt stehen in [Kapitel 1 der KI-Masterclass](../../masterclass/ki-salesforce/begriffe-und-landkarte/); hier geht es darum, was die Grenze für Ihre Projekte bedeutet.

## Wo hilft Vibe Coding einem Hersteller?

Fowler nennt Wegwerfsoftware und Prototypen als passende Einsätze: „Experienced programmers may also find it handy for rapid development of disposable software or prototypes.“ In einem Programm bei einem Maschinen- oder Anlagenbauer würde ich vier Kandidaten in Betracht ziehen:

- **Händlerportal-Mock-ups.** Eine Seite, auf der ein Händler Ersatzteile zu einer Maschine über die Seriennummer bestellt, gezeigt vor ein paar Händlern im Workshop, bevor jemand eine User Story schreibt. Was das echte Portal ausmacht, steht in [das Kundenportal in der Manufacturing Cloud](../manufacturing-cloud-kundenportal/).
- **Ein Service-Cockpit als LWC.** Eine Maske mit offenen Fällen, installierter Basis, nächstem Wartungstermin und zugeordnetem Techniker im Außendienst, damit die Serviceleitung zeigen kann, was fehlt. Agentforce Vibes 2.0 bietet [Live-Vorschauen für Lightning Web Components](https://developer.salesforce.com/developer-centers/agentforce-vibes/announcements/agentforce-vibes-4-1-0), das macht so etwas schnell.
- **Skripte für Testdaten.** Ersatzteile, Anlagen und Wartungsverträge in plausiblen Mengen für eine Demo.
- **Einmalige Auswertungen.** Ein Skript, das einmal zählt, welche Anlagenfelder tatsächlich gefüllt sind.

Der Nutzen liegt im Gespräch: Fachbereiche korrigieren eine lauffähige Maske schneller als ein Fachkonzept.

Die Umgebungen kosten wenig. Mit der [Ankündigung vom April 2026](https://developer.salesforce.com/blogs/2026/04/new-developer-edition-agentforce-vibes-claude-mcp) hat Salesforce Agentforce Vibes, ein VS Code im Browser und gehostete MCP-Server kostenlos in jede Developer Edition gebracht. Die [Vibes-FAQ](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html) begrenzt das pro Org, für einen Monat ab erster Nutzung, ohne Auffrischung. Teams mit Dev Hub nutzen stattdessen Scratch Orgs: Laut [Salesforce-DX-Handbuch](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-scratch-orgs.html) sind sie „source-driven and disposable“ und starten ohne Daten.

```kennzahlen
110 | Anfragen an Agentforce Vibes pro Developer Edition, oder 1,5 Mio. Tokens
7 Tage | Standardlaufzeit einer Scratch Org
30 Tage | höchste Laufzeit einer Scratch Org
quelle: Agentforce-Vibes-FAQ und Salesforce-DX-Handbuch, Stand Oktober 2026
```

## Regeln für die Prototyp-Org

Wie harmlos ein Prototyp ist, hängt an der Org, in der er läuft. Als das wohl ernsteste Risiko nennt Fowler die Sicherheit: Per Vibe Coding gebaute Anwendungen „can often expose sensitive information or worse, credentials“. Für einen Salesforce-Prototyp setze ich fünf Regeln:

1. **Keine echten Daten.** Keine Händlernamen, keine Kundenmaschinen, keine Preise aus der Preisliste. Für ein Mock-up reichen erzeugte Testdaten.
2. **Keine Verbindungen.** Keine Named Credential zu SAP oder proALPHA, kein Integrationsnutzer, keine Kopie produktiver Zugangsdaten. Die SAP-Antwort ist eine statische JSON-Datei.
3. **Kein Coding-Agent in Produktion.** Salesforce erlaubt Admins, [Agentforce Vibes pro Org abzuschalten](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes), im Setup unter Agentforce Vibes Extensions. In der produktiven Org würde ich das am ersten Tag tun. Laut Salesforce gibt es Agentforce Vibes nicht in der Hyperforce EU Operating Zone ([Vibes-FAQ](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html)); für eine Org dort stellt sich die Frage also nicht, und [Kapitel 2 der KI-Masterclass](../../masterclass/ki-salesforce/salesforce-werkzeuge-ki-entwicklung/) zeigt die Alternativen.
4. **Ein Verantwortlicher und ein Enddatum.** Scratch Orgs laufen von selbst ab. Eine Developer Edition bleibt, solange sich jemand anmeldet; also muss jemand sie stilllegen oder zumindest festhalten, was darin liegt.
5. **Eine sichtbare Kennzeichnung.** „Prototyp, nicht für Produktion“ im Titel der Komponente, damit ein Screenshot in der Lenkungskreis-Präsentation nicht zur Zusage wird.

Diese Regeln gehören auch in den Vertrag mit Ihrem Partner, wie in [Regeln für Partner, die mit KI programmieren](../partner-ki-coding-regeln-vertrag/) beschrieben.

## Warum gehört ein Vibe-Coding-Prototyp nicht in Produktion?

Ein Prototyp zeigt, dass eine Maske sinnvoll ist, aber nicht, ob der Code mit Ihren Daten, Ihren Nutzern und Ihrem Sharing-Modell besteht. Der [GenAI Code Security Report 2026](https://www.veracode.com/news/llms-are-getting-smarter-but-not-safer-veracode-2026-genai-code-security-report-finds-ai-generated-code-security-has-stalled-at-56%25-pass-rate/) von Veracode fand, dass reine Modelle zu etwa 100 Prozent kompilierbaren Code schreiben, aber nur 56 Prozent die Sicherheitstests bestehen. Mitgründer Chris Wysopal formuliert es so: „scan it, fix it, and never ship it blind.“ Code, der läuft, ist der leichte Teil.

In Salesforce hat ein Workshop-Prototyp typischerweise dieselben Lücken:

- Er wurde als Systemadministrator gebaut und durchgeklickt und hat das Sharing-Modell nie gesehen, das einen Händler von den Aufträgen eines anderen fernhält.
- Er liest Datensätze einzeln, weil die Demo zwölf davon hatte.
- Bestände und Liefertermine sind fest eingetragen, wo die Produktivversion SAP aufrufen muss.
- Er hat keine Tests, oder Tests, die nur die Abdeckung erreichen sollen.
- Seine Metadaten liegen in einer Developer Edition, außerhalb Ihres Repositorys und außerhalb jedes Reviews.

Fowler ergänzt die Wartbarkeit: Ungeprüfter Code wächst zu Code, der sich schwer ändern lässt, für Menschen wie für Sprachmodelle. Nach meiner Einschätzung dauert es länger, diese Lücken im Prototyp einzeln zu schließen, als die Funktion sauber zu bauen. Auf welche Fehler Sie bei KI-Code achten sollten, steht in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/).

## Der Weg vom Prototyp in die Produktion

Ich behandle den Prototyp als Spezifikation. Aus dem Workshop überleben Masken, Entscheidungen und Abnahmekriterien. Die Produktivumsetzung folgt dann agentic engineering:

```schritte
Das Ergebnis einfrieren
  Screenshots oder eine kurze Aufzeichnung, die Feldliste, offene Fragen und mit dem Fachbereich formulierte Abnahmekriterien, etwa „ein Händler sieht nur Aufträge zu Maschinen, die über ihn verkauft wurden“.
Im eigenen Repository starten
  Der Entwickler arbeitet in einer Scratch Org oder Developer Sandbox aus dem Repository des Kunden, mit einer Regeldatei, die Ihre Named Credentials, die API-Version und die Testregeln nennt. Warum diese Datei Ihnen gehört, steht in [die KI-Regeldatei im Salesforce-Repository](../ki-regeldatei-salesforce-repository/).
Erst planen, dann coden
  Der [Plan Mode](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-workflow-patterns.html) von Agentforce Vibes erstellt Ziele, Nicht-Ziele, Vorgehen und nummerierte Aufgaben, und „No files change until you click Approve Plan.“ Der Entwickler prüft den Plan gegen die Abnahmekriterien, Sharing und Berechtigungen zuerst.
Sicherheit von Hand konfigurieren
  Dieselbe Salesforce-Anleitung empfiehlt, Permission Sets, Profile, Sharing-Regeln und organisationsweite Standards manuell im Setup anzulegen und jede erzeugte Sicherheitsänderung vor der Übernahme zu prüfen.
Review und Gates
  Pull Request, menschliches Review, Code Analyzer, Validierungsdeployment mit Apex-Tests. Die Gates beschreibe ich in [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/).
```

Eine Ausnahme akzeptiere ich: HTML-Template und CSS einer Mock-up-LWC dürfen mit, wenn sie dasselbe Review bestehen. Apex und Datenzugriff werden immer neu gebaut.

## Rechenbeispiel: zwei Tage Workshop bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit Service Cloud, SAP S/4 und 400 Händlern, der ein Händlerportal und ein neues Service-Cockpit plant. Alle Zahlen sind Annahmen. In einem zweitägigen Anforderungsworkshop baut ein Entwickler beide Mock-ups mit Agentforce Vibes in einer frischen Developer Edition. Die Portalseite dauert etwa drei Stunden, das Cockpit etwa zwei, zusammen rund 40 der 110 Anfragen. Händler und Serviceleitung korrigieren die Masken live: Das Cockpit bekommt eine Spalte für das Garantieende, das Portal verliert einen Filter, den niemand nutzt.

Nach dem Workshop liest der Architekt den Prototyp-Code einmal, als Referenz. Die Auftragsabfrage ignoriert die Händlerzuordnung, weil der Entwickler als Administrator angemeldet war. Liefertermine kommen aus einer fest eingetragenen Liste. Das Cockpit setzt pro Fall eine eigene Abfrage ab.

Die Produktivumsetzung startet deshalb im Repository: drei User Stories, jede mit freigegebenem Plan, einem `runAs`-Test als Händlernutzer und einem SAP-Aufruf über die vorhandene MuleSoft-API. Angenommen sind dafür zwei Sprints für ein Partnerteam mit drei Personen. Ohne den Workshop wäre nach meiner Schätzung der erste Sprint dafür draufgegangen, herauszufinden, was die Masken zeigen sollen. Der Prototyp hat sich über die Anforderungen bezahlt gemacht und keine Zeile Apex beigesteuert. Was die KI-Werkzeuge für ein solches Team kosten, steht in [KI-Coding-Kosten im Salesforce-Projekt](../ki-coding-kosten-salesforce-projekt/).

## Vibe Coding in Developer Editions ausdrücklich erlauben

1. **Vibe Coding ausdrücklich erlauben**, in Developer Editions und Scratch Orgs mit Testdaten, damit es niemand still in einer gemeinsamen Sandbox tut.
2. **Agentforce Vibes in Produktion abschalten** und produktive Deployments in der Pipeline halten.
3. **Die Übergabe festlegen:** Masken, Abnahmekriterien und offene Fragen verlassen den Workshop, Apex aus dem Prototyp nicht.
4. **Pläne sichtbar machen.** Lassen Sie Ihren Partner den freigegebenen Plan an den Pull Request hängen.
5. **Die Pipeline selbst besitzen.** Sie für Programme mit mehreren Partnern aufzusetzen, ist der Kern meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/).
