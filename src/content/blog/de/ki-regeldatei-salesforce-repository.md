---
title: "KI-Regeldatei im Salesforce-Repository: wem gehört sie?"
description: "Warum Ihr Salesforce-Repository eine KI-Regeldatei braucht (CLAUDE.md, AGENTS.md, .vibes/rules), wer sie verantwortet und was Settings und CI erzwingen."
pubDate: 2026-10-27
lang: de
slug: ki-regeldatei-salesforce-repository
translationKey: ai-rules-file-salesforce-repo
topic: devops
categories: [devops, ai]
tags: [KI-Coding, DevOps, Partnersteuerung, Claude Code, Agentforce Vibes, Maschinenbau]
takeaways:
  - "Ihr Salesforce-Repository braucht eine KI-Regeldatei, sobald jemand mit einem Agenten programmiert: CLAUDE.md für Claude Code, AGENTS.md für Codex und Copilot, .vibes/rules/ für Agentforce Vibes."
  - "Die Datei liegt im Repository des Kunden und hat eine benannte verantwortliche Person auf Kundenseite; Partner schlagen Änderungen per Pull Request vor, statt ihre Vorlage zum Standard zu machen."
  - "Laut Anthropic behandelt Claude CLAUDE.md als Kontext, nicht als erzwungene Konfiguration; was jedes Mal gelten muss, gehört in Deny-Regeln, Hooks, Pipeline-Gates und Branch Protection."
  - "Claude Code liest AGENTS.md nur, wenn es keine CLAUDE.md oder CLAUDE.local.md gibt; eine zweizeilige CLAUDE.md mit @AGENTS.md hält eine gemeinsame Datei für alle Werkzeuge gültig."
  - "Schützen Sie die Regeldateien mit CODEOWNERS: Copilot Code Review liest die Anweisungen aus dem Branch des Pull Requests, eine Änderung der Datei beeinflusst also das Review genau dieser Änderung."
faq:
  - q: "Brauche ich für jedes Coding-Werkzeug eine eigene KI-Regeldatei?"
    a: "Meist nicht. Eine AGENTS.md bedient Codex und Copilot, Claude Code über eine kurze CLAUDE.md, die sie importiert. Agentforce Vibes liest .vibes/rules/, und die Vibes-Dokumentation erwähnt AGENTS.md nicht. Pflegen Sie dort eine kurze Regel und ändern Sie sie im selben Pull Request."
  - q: "Wer sollte die KI-Regeldatei in einem Partnerprojekt verantworten?"
    a: "Eine benannte Person auf Kundenseite, meist der Lead-Architekt oder der interne Tech Lead, plus Vertretung. Partner schlagen Änderungen per Pull Request vor; ein CODEOWNERS-Eintrag mit Branch Protection macht die Freigabe der verantwortlichen Person zur Pflicht."
  - q: "Verhindert eine Regeldatei, dass ein Agent nach Produktion deployt?"
    a: "Nein. Das Modell darf eine Richtlinie für nicht zutreffend halten. Halten Sie Produktionszugänge von Entwicklerrechnern fern, deployen Sie nur über die Pipeline, sperren Sie Produktions-Aliase per Deny-Regel und deaktivieren Sie Agentforce Vibes für Produktions-Orgs im Setup."
  - q: "Wie lang sollte eine KI-Regeldatei sein?"
    a: "Anthropic empfiehlt unter 200 Zeilen pro CLAUDE.md, OpenAI schreibt, eine kurze, genaue AGENTS.md sei nützlicher als eine lange Datei voller vager Regeln. Ergänzen Sie eine Zeile, wenn sich ein Review-Fund wiederholt, und streichen Sie, was die Pipeline schon prüft."
draft: false
---

Eine KI-Regeldatei ist die Markdown-Datei, die ein Coding-Agent zu Beginn jeder Sitzung liest: `CLAUDE.md` bei Claude Code, `AGENTS.md` bei Codex und Copilot, `.vibes/rules/` bei Agentforce Vibes. Ihr Salesforce-Repository braucht eine, sobald jemand intern oder beim Partner mit einem Agenten programmiert, sonst folgt jedes Werkzeug und jeder Partner eigenen Konventionen. Die Datei gehört dem Kunden und hat auf Ihrer Seite eine benannte verantwortliche Person, meist den Lead-Architekten. Sie leitet den Agenten an. Was jedes Mal gelten muss, gehört in Settings, Hooks und Pipeline.

## Was ist eine KI-Regeldatei, und welches Werkzeug liest welche Datei?

Eine Regeldatei enthält dauerhafte Projektanweisungen in einfachem Markdown: Befehle, Konventionen, Fallstricke und was „fertig“ bedeutet. Der Agent lädt sie beim Start einer Sitzung in seinen Kontext und muss Ihr Projekt nicht jedes Mal neu erkunden. Jedes große Werkzeug kennt so eine Datei, nur unter anderem Namen:

| Werkzeug | Datei im Repository | Wichtiges Detail |
|---|---|---|
| Claude Code | `CLAUDE.md`, pfadbezogene Regeln in `.claude/rules/` | liest `AGENTS.md` nur, wenn es keine `CLAUDE.md` gibt |
| OpenAI Codex | `AGENTS.md` | eine Datei näher am aktuellen Verzeichnis gewinnt |
| GitHub Copilot | `.github/copilot-instructions.md`, `AGENTS.md` oder eine `CLAUDE.md` im Wurzelverzeichnis | die nächstgelegene `AGENTS.md` hat Vorrang |
| Agentforce Vibes | `.vibes/rules/` | jede Regel gilt „Always“ oder per Dateimuster |

Quellen: [Claude-Code-Doku zu Memory](https://code.claude.com/docs/en/memory), [OpenAI Codex Best Practices](https://developers.openai.com/codex/learn/best-practices), [GitHub Docs](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions), [Agentforce Vibes Rules](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-rules.html).

Arbeitet Ihr Team mit mehreren Werkzeugen, entscheiden zwei Details, ob eine Datei reicht. Laut [GitHub-Changelog vom 28. August 2025](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions) liest der Copilot Coding Agent `AGENTS.md` neben GitHubs eigenen Formaten, außerdem `CLAUDE.md` und `GEMINI.md`. Claude Code liest `AGENTS.md` ab Version 2.1.277, aber nur, wenn im Arbeitsverzeichnis oder darüber keine `CLAUDE.md` oder `CLAUDE.local.md` liegt. Die Vibes-Dokumentation erwähnt `AGENTS.md` gar nicht, Vibes braucht also eine eigene kurze Regel in `.vibes/rules/`.

```hinweis achtung
Legt sich ein Entwickler eine persönliche `CLAUDE.local.md` an, liest Claude die gemeinsame `AGENTS.md` nicht mehr, ohne dass es jemand merkt. Anthropic empfiehlt dafür eine `CLAUDE.md`, die die gemeinsame Datei mit `@AGENTS.md` importiert.
```

## Warum gehört die Regeldatei dem Kunden?

Partner bringen gern ihre eigene Vorlage mit. Das geht am Anfang schnell und wird später teuer, aus den Gründen in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/): Wer die Regeln schreibt, setzt den Standard. Für Regeldateien sehe ich drei konkrete Gründe.

**Die Datei hält Entscheidungen fest, die nur Sie treffen können.** Welche API-Version neue Apex-Klassen nutzen, welcher Named Credential der einzige Weg zu SAP ist, welches von zwei Garantiedatumsfeldern gepflegt wird. Die Zeile zur API-Version ist keine Formalie: Ab API 67.0 läuft Apex laut [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm) standardmäßig im Benutzerkontext, und Klassen ohne Sharing-Deklaration laufen im Kontext des aktuellen Benutzers. Ob eine alte Klasse auf 67.0 wechseln darf, ist eine Architekturentscheidung für Ihre Org, keine Gewohnheit des Partners.

**Die Datei überdauert den Partner.** Endet ein Auftrag, bleiben die Konventionen in Ihrem Repository.

**Die Datei hält Partner vergleichbar.** Eine Datei, eine Definition of Done für alle Teams. Mit zwei Partnern und zwei Vorlagen auf einer Org wird sonst still die lautere Vorlage zu Ihrem Standard.

Verantwortung heißt: Eine benannte Person auf Kundenseite gibt jede Änderung frei, typischerweise der Lead-Architekt oder der interne Tech Lead, mit Vertretung. Partner schlagen vor, sie mergen nicht. Das würde ich in die Anlage schreiben, die ich in [was in den Vertrag gehört, wenn Partner mit KI programmieren](../partner-ki-coding-regeln-vertrag/) beschreibe.

## Was gehört in die Regeldatei, und was muss anderswo erzwungen werden?

Anthropic benennt die Grenze klar: Claude behandelt `CLAUDE.md`-Dateien „as context, not enforced configuration“. In den [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices) heißt es weiter: „If something has to happen every time, make it a hook, a deny rule, or a managed setting. `CLAUDE.md` is for guidelines, and Claude is allowed to decide a guideline doesn't apply.“ OpenAI ergänzt zur Länge: „A short, accurate `AGENTS.md` is more useful than a long file full of vague rules.“

Die Datei enthält also, was der Agent nicht im Code sieht. Anthropics Liste: die genauen Befehle, mit denen sich Arbeit prüfen lässt, Stellen, an denen der Code in die Irre führt, Entscheidungen, die nirgends im Repository stehen, und „anything you've had to correct twice already“. Die Memory-Doku nennt als Ziel unter 200 Zeilen pro Datei. Ein Beispiel für das Repository eines Maschinenbauers, Feld- und Aliasnamen sind Platzhalter. Ich halte die Datei englisch, damit Nearshore-Teams und Partner sie ohne Übersetzung lesen:

```markdown
# AGENTS.md (owner: lead architect; changes only via pull request)

## Orgs
- Work against scratch orgs or the alias mb-dev; never mb-uat or mb-prod

## Commands
- One test class: sf apex run test -n <TestClass> -o mb-dev -r human -w 10
- Static analysis: sf code-analyzer run --target force-app
- Validate: sf project deploy validate -o mb-int --test-level RunLocalTests

## Apex
- New classes: API 67.0, explicit sharing declaration, WITH USER_MODE
- Do not raise the API version of existing classes unless the task says so
- SAP calls only via Named Credential SAP_S4, never endpoints in code

## Data model pitfalls
- Warranty end: use Asset.Warranty_End__c (maintained by the SAP interface);
  Asset.Legacy_Warranty_Date__c is a migration leftover, read only
- Dealer portal code never uses without sharing

## Done means
- Positive, negative and bulk tests with real asserts
- Test command and its output in the pull request; AI-generated parts marked
```

Alles, was ohne Ausnahme gelten muss, gehört an einen Ort, mit dem das Modell nicht verhandeln kann:

| Regel | Wohin sie gehört | Warum dort |
|---|---|---|
| Kein Lesen der Anmeldedateien der sf CLI, keine Befehle gegen Produktions-Aliase | Deny-Regeln in `.claude/settings.json`, eingecheckt | Deny-Regeln gelten in jedem Berechtigungsmodus, auch in Auto und `bypassPermissions` |
| Kein „fertig“, solange Tests oder Code Analyzer rot sind | `Stop`-Hook | Exit-Code 2 schickt Claude zurück an die Arbeit |
| Code Analyzer, Apex-Tests, Validierungs-Deployment | Pipeline als Merge-Gate | läuft unabhängig davon, welches Werkzeug den Code schrieb |
| Kein Agent in Produktion | keine Produktionszugänge auf Entwicklerrechnern; Vibes pro Produktions-Org deaktiviert | die Regeldatei kann keinen Zugriff entziehen, der besteht |
| Änderungen an Sharing, Datenmodell, Regeldateien | Branch Protection mit CODEOWNERS | eine Person auf Ihrer Seite gibt frei |

Die eingecheckten Deny-Regeln für Claude Code sehen so aus:

```json
{
  "permissions": {
    "deny": [
      "Read(~/.sf/**)",
      "Read(~/.sfdx/**)",
      "Bash(sf * -o mb-prod*)",
      "Bash(sf * --target-org mb-prod*)"
    ]
  }
}
```

Auch Deny-Regeln haben Grenzen. Laut [Berechtigungsdoku von Anthropic](https://code.claude.com/docs/en/permissions) prüft eine Bash-Regel den Befehlstext, den der Agent schreibt, und sie „isn't a security boundary around the program“: Derselbe Befehl in `bash -c` verpackt fällt durch. Die eigentliche Grenze ist, dass Produktionszugänge nie auf einem Entwicklerrechner landen und nur die Pipeline nach Produktion deployt. Agentforce Vibes lässt sich laut Salesforce im Setup unter Agentforce Vibes Extensions [für eine Produktions-Org deaktivieren](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes). Stellen Sie die Claude-Lizenzen selbst, greifen Managed Settings, die laut Anthropic keine persönliche Settings-Datei überschreiben kann.

## Ein typisches Szenario: drei Werkzeuge, zwei Partner, eine Datei

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service für den Außendienst, einem Händlerportal auf Experience Cloud und SAP S/4 als ERP. Partner A baut Portal und Serviceprozesse mit sechs Nearshore-Entwicklern und Claude Code. Partner B baut die SAP-Schnittstelle mit drei Entwicklern und Copilot. Zwei interne Entwickler nutzen Agentforce Vibes. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

Im Repository liegt die `CLAUDE.md` von Partner A aus einem früheren Projekt, rund 300 Zeilen, die API 62.0 für alle Klassen vorgibt. Die `copilot-instructions.md` von Partner B sagt nichts zu API-Versionen und erlaubt direkte HTTP-Callouts „für schnelle Tests“. Vibes läuft nur mit seinen eingebauten Regeln. Der interne Architekt schreibt mehrmals pro Sprint denselben Review-Kommentar zu fehlenden Sharing-Deklarationen.

Der Kunde richtet daraufhin ein:

- Eine `AGENTS.md` mit rund 90 Zeilen, verantwortet vom internen Architekten, aufgebaut aus dem alten Coding-Standard und den Review-Funden der letzten Sprints.
- Eine zweizeilige `CLAUDE.md`, die `@AGENTS.md` importiert, und eine Vibes-Regel mit Dateimuster `**/*.cls`, die den Apex-Abschnitt wiederholt.
- Eingecheckte Deny-Regeln für den Produktions-Alias sowie Code Analyzer, Tests und Validierungs-Deployment als Merge-Gates in der Pipeline des Kunden.
- CODEOWNERS für alle Regel- und Settings-Dateien.

Die Vorlage von Partner A wird zum Vorschlags-Pull-Request; eine Handvoll Zeilen bleibt. Angenommen sind zwei Tage für die erste Fassung und danach eine halbe Stunde pro Sprint. Der Reviewer prüft weiter, schreibt aber nicht mehr dieselben Kommentare.

## Wer pflegt die Datei, und wie ändert sie sich?

Regeldateien sind Teil Ihrer Kontrollen. Laut GitHub-Dokumentation liest Copilot Code Review die Anweisungen aus dem Head-Branch des Pull Requests. Ein Pull Request, der `copilot-instructions.md` ändert, ändert also die Anweisungen, mit denen sein eigenes KI-Review läuft. Genauso lässt sich eine eingecheckte Deny-Regel per Pull Request löschen wie jede andere Zeile.

Deshalb würde ich jede Regel- und Settings-Datei unter [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) stellen: `AGENTS.md`, `CLAUDE.md`, `.claude/`, `.vibes/` und `.github/copilot-instructions.md`. Mit „Require review from Code Owners“ in der Branch Protection wird die Freigabe der verantwortlichen Person zur Pflicht. GitHub verlangt Schreibrechte für Code Owner, das funktioniert also nur, wenn das Repository in Ihrer Organisation liegt. Dieselbe Logik gilt für gemeinsam genutzte Objekte, wie in der [Object Ownership Matrix](../object-ownership-matrix-salesforce/) beschrieben.

Die Datei wächst aus Belegen, nicht aus Wunschlisten. OpenAI empfiehlt, Regeln nach wiederholten Fehlern zu ergänzen, Anthropic nach der zweiten Korrektur. In der Praxis sind die Review-Funde nach Kategorie die Grundlage, wie in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/) beschrieben. Zeilen fliegen wieder raus, sobald ein Pipeline-Gate sie abdeckt. Nach jedem Salesforce-Release prüft die verantwortliche Person zuerst die Zeile zur API-Version.

## Wo sollten Sie anfangen?

```schritte
Bestand aufnehmen
  Suchen Sie im Repository nach `CLAUDE.md`, `AGENTS.md`, `.github/copilot-instructions.md` und `.vibes/rules/`, und fragen Sie jeden Partner, welche Werkzeuge er nutzt.
Verantwortliche benennen
  Eine Person mit Vertretung auf Ihrer Seite.
Erste Fassung schreiben
  Unter 200 Zeilen, aus Ihrem Coding-Standard und den letzten Review-Funden.
Verweise anlegen
  Eine `CLAUDE.md` mit `@AGENTS.md` und eine Vibes-Regel.
Harte Regeln auslagern
  Deny-Regeln, ein `Stop`-Hook und die Gates aus [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/), Vibes in Produktion deaktiviert.
Dateien schützen
  Mit CODEOWNERS und Branch Protection.
```

Das Einrichten gehört zu meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/) und in der [Partnersteuerung](../../leistungen/partnersteuerung/). Eine KI-Regeldatei kostet wenige Tage und gibt jedem Agenten in Ihrem Repository dieselben Regeln, solange die Datei Ihnen gehört und die harten Regeln anderswo erzwungen werden.
