---
title: "KI-Regeldatei im Salesforce-Repository: wem gehört sie?"
description: "Warum Ihr Salesforce-Repository eine KI-Regeldatei braucht (CLAUDE.md, AGENTS.md, .vibes/rules), wer sie verantwortet und was Settings und CI erzwingen."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: ki-regeldatei-salesforce-repository
translationKey: ai-rules-file-salesforce-repo
topic: devops
categories: [devops, ai]
tags: [KI-Coding, DevOps, Partnersteuerung, Claude Code, Agentforce Vibes, Maschinenbau]
takeaways:
  - "Sobald intern oder beim Partner mit Agenten programmiert wird, braucht das gemeinsame Repository eine Regeldatei: CLAUDE.md, AGENTS.md oder .vibes/rules/."
  - "Die Datei liegt im Repository des Kunden und hat dort eine verantwortliche Person; Partner schlagen Änderungen per Pull Request vor."
  - "Claude behandelt CLAUDE.md laut Anthropic als Kontext. Was immer gelten muss, gehört in Deny-Regeln, Hooks, Pipeline-Gates und Branch Protection."
  - "Claude Code liest AGENTS.md nur, wenn keine CLAUDE.md existiert; eine einzeilige CLAUDE.md, die sie importiert, hält eine gemeinsame Datei für alle Werkzeuge."
  - "Schützen Sie die Regeldateien mit CODEOWNERS, denn Copilot Code Review liest die Anweisungen aus dem Head-Branch des Pull Requests."
faq:
  - q: "Brauche ich für jedes Coding-Werkzeug eine eigene KI-Regeldatei?"
    a: "Meist nicht. Eine AGENTS.md bedient Codex und Copilot; Claude Code nutzt sie über eine kurze CLAUDE.md, die sie importiert. Agentforce Vibes liest .vibes/rules/, und die Vibes-Dokumentation erwähnt AGENTS.md nicht. Pflegen Sie dort eine kurze Regel und ändern Sie sie im selben Pull Request."
  - q: "Wer sollte die KI-Regeldatei in einem Partnerprojekt verantworten?"
    a: "Eine benannte Person auf Kundenseite, meist der Lead-Architekt oder der interne Tech Lead, plus Vertretung. Partner schlagen Änderungen per Pull Request vor; ein CODEOWNERS-Eintrag mit Branch Protection macht die Freigabe der verantwortlichen Person zur Pflicht."
  - q: "Verhindert eine Regeldatei, dass ein Agent nach Produktion deployt?"
    a: "Nein. Das Modell darf eine Richtlinie für nicht zutreffend halten. Halten Sie Produktionszugänge von Entwicklerrechnern fern, deployen Sie nur über die Pipeline, sperren Sie Produktions-Aliase per Deny-Regel und deaktivieren Sie Agentforce Vibes für Produktions-Orgs im Setup."
  - q: "Wie lang sollte eine KI-Regeldatei sein?"
    a: "Anthropic empfiehlt unter 200 Zeilen pro CLAUDE.md, OpenAI schreibt, eine kurze, genaue AGENTS.md sei nützlicher als eine lange Datei voller vager Regeln. Ergänzen Sie eine Zeile, wenn sich ein Review-Fund wiederholt, und streichen Sie, was die Pipeline schon prüft."
draft: false
---

Eine KI-Regeldatei ist die Markdown-Datei, die ein Coding-Agent als dauerhafte Anweisung lädt, meist zu Beginn einer Sitzung: CLAUDE.md bei Claude Code, AGENTS.md bei Codex und Copilot, Regeldateien in .vibes/rules/ bei Agentforce Vibes. Aus meiner Sicht braucht ein gemeinsames Salesforce-Repository eine KI-Regeldatei, sobald intern oder beim Partner mit einem Agenten programmiert wird, sonst folgen jedes Werkzeug und jeder Partner eigenen Konventionen. Die Datei gehört dem Kunden; auf Ihrer Seite ist dafür eine verantwortliche Person benannt, meist der Lead-Architekt. Sie leitet den Agenten an. Was jedes Mal gelten muss, gehört in Settings, Hooks und die Pipeline.

## Was ist eine KI-Regeldatei, und welches Werkzeug liest welche Datei?

Eine Regeldatei enthält dauerhafte Projektanweisungen in einfachem Markdown: Befehle, Konventionen, Fallstricke und was „fertig“ bedeutet. Der Agent lädt die Datei beim Start einer Sitzung in seinen Kontext, Pfadregeln erst, wenn er passende Dateien bearbeitet. So muss er Ihr Projekt nicht jedes Mal neu erkunden. Die vier Werkzeuge hier nutzen unterschiedliche Namen:

```tabelle
titel: Welches Werkzeug welche Datei liest
spalten: Werkzeug | Datei im Repository | Wichtiges Detail
Claude Code | CLAUDE.md, dazu Pfadregeln in .claude/rules/ | Liest AGENTS.md nur, wenn es keine CLAUDE.md gibt *
OpenAI Codex | AGENTS.md | Eine Datei näher am aktuellen Ordner gewinnt
GitHub Copilot | .github/copilot-instructions.md, AGENTS.md; CLAUDE.md im Coding Agent, Code Review und CLI | Copilot Chat in VS Code ignoriert CLAUDE.md *
Agentforce Vibes | Regeldateien in .vibes/rules/ | Jede Regel gilt immer oder per Dateimuster *
```

Quellen: [Claude-Code-Doku zu Memory](https://code.claude.com/docs/en/memory), [OpenAI Codex Best Practices](https://developers.openai.com/codex/learn/best-practices), [GitHub Docs](https://docs.github.com/en/copilot/reference/custom-instructions-support), [Agentforce Vibes Rules](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-rules.html).

Arbeitet Ihr Team mit mehreren Werkzeugen, entscheiden zwei Details, ob eine Datei reicht. Laut [GitHub-Changelog vom 28. August 2025](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions) liest der Copilot Coding Agent AGENTS.md neben GitHubs eigenen Formaten, außerdem CLAUDE.md und GEMINI.md. Claude Code liest AGENTS.md ab Version 2.1.277, aber nur, wenn im Arbeitsverzeichnis oder darüber keine CLAUDE.md oder CLAUDE.local.md liegt. Die Vibes-Dokumentation erwähnt AGENTS.md gar nicht, Vibes braucht also eine eigene kurze Regel in .vibes/rules/.

```hinweis achtung
Legt sich ein Entwickler eine persönliche CLAUDE.local.md an, liest Claude die gemeinsame AGENTS.md nicht mehr, ohne dass es jemand merkt. Anthropic empfiehlt dafür eine kurze CLAUDE.md, die die gemeinsame Datei importiert.
```

## Die Regeldatei gehört dem Kunden

Partner bringen gern ihre eigene Vorlage mit. Das geht am Anfang schnell, wird aber später aus den Gründen teuer, die ich in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) beschreibe: Wer die Regeln schreibt, setzt den Standard. Für Regeldateien sehe ich drei konkrete Gründe.

**Die Datei hält Entscheidungen fest, die nur Sie treffen können.** Dazu gehört, welche API-Version neue Apex-Klassen nutzen, welcher Named Credential der einzige Weg zu SAP ist und welches von zwei Garantiedatumsfeldern gepflegt wird. Die Zeile zur API-Version ist keine Formalie: Ab API 67.0 läuft Apex laut [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm) bei Datenbankzugriffen standardmäßig im User Mode, und Klassen ohne Sharing-Deklaration laufen `with sharing`. Das sind zwei getrennte Stellschrauben. Ob eine alte Klasse auf 67.0 oder höher wechseln darf, ist eine Architekturentscheidung für Ihre Org, keine Gewohnheit des Partners.

**Die Datei überdauert den Partner.** Endet ein Auftrag, bleiben die Konventionen in Ihrem Repository.

**Die Datei hält Partner vergleichbar.** Eine Datei, eine Definition of Done für alle Teams. Mit zwei Partnern und zwei Vorlagen auf einer Org wird sonst still die lautere Vorlage zu Ihrem Standard.

Verantwortung heißt: Eine benannte Person auf Kundenseite gibt jede Änderung frei, typischerweise der Lead-Architekt oder der interne Tech Lead, mit Vertretung. Partner schlagen vor, sie mergen nicht. Das würde ich in die Anlage schreiben, die ich in [was in den Vertrag gehört, wenn Partner mit KI programmieren](../partner-ki-coding-regeln-vertrag/) beschreibe.

## Was gehört in die Regeldatei, und was muss anderswo erzwungen werden?

Anthropic benennt die Grenze klar: Claude behandelt CLAUDE.md-Dateien „as context, not enforced configuration“. In den [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices) heißt es weiter: „If something has to happen every time, make it a hook, a deny rule, or a managed setting. CLAUDE.md is for guidelines, and Claude is allowed to decide a guideline doesn't apply.“ OpenAI ergänzt zur Länge: „A short, accurate AGENTS.md is more useful than a long file full of vague rules.“

Die Datei enthält also, was der Agent nicht im Code sieht. Anthropics Liste: die genauen Befehle, mit denen sich Arbeit prüfen lässt, Stellen, an denen der Code in die Irre führt, Entscheidungen, die nirgends im Repository stehen, und „anything you've had to correct twice already“. Die Memory-Doku nennt weniger als 200 Zeilen pro Datei als Ziel. Für das Repository eines Maschinenbauers könnten die Abschnitte so aussehen. Die Datei selbst halte ich auf Englisch, damit Nearshore-Teams und Partner sie ohne Übersetzung lesen können:

```eintrag AGENTS.md
Verantwortlich | Lead-Architekt; Änderungen nur per Pull Request
Orgs | Scratch-Orgs oder die Entwicklungs-Sandbox, nie UAT oder Produktion
Befehle | Die genauen Befehle für eine Testklasse, die Codeanalyse und ein Validierungsdeployment
Apex | Neue Klassen auf der freigegebenen API-Version, derzeit 68.0 (Winter '27), mit expliziter Sharing-Deklaration; kein Versionswechsel bei bestehenden Klassen ohne Auftrag *
SAP | Aufrufe nur über die hinterlegte Verbindung zu S/4, nie Adressen im Code
Datenmodell | Welches Garantiedatumsfeld die SAP-Schnittstelle pflegt und welches ein schreibgeschützter Migrationsrest ist
fazit: Rund 90 Zeilen im Beispiel unten. „Fertig“ heißt echte Tests und die Testausgabe im Pull Request.
```

Alles, was ohne Ausnahme gelten muss, gehört an eine Stelle, über die das Modell nicht verhandeln kann:

```tabelle
titel: Wohin die harten Regeln gehören
spalten: Regel | Wohin sie gehört | Warum dort
Kein direktes Lesen von Anmeldedateien, keine Deploy-Befehle gegen Produktion | Deny-Regeln in den eingecheckten Claude-Settings | Blockieren direkte Versuche des Agenten in jedem Berechtigungsmodus, keine Sicherheitsgrenze *
Kein „fertig“ bei roten Tests | Ein Hook, der läuft, wenn der Agent aufhören will | Schickt den Agenten zurück an die Arbeit
Codeanalyse, Tests, Validierungsdeployment | Pipeline als Merge-Gate | Läuft unabhängig vom Werkzeug *
Kein Agent in Produktion | Keine Produktionszugänge auf Entwicklerrechnern; Vibes je Produktions-Org aus | Eine Textdatei entzieht keinen bestehenden Zugriff
Änderungen an Sharing, Datenmodell, Regeldateien | Branch-Schutz mit Code Owners | Eine Person auf Ihrer Seite gibt frei *
```

```vertiefung Für Entwickler
titel: Deny-Regeln und Hook für Claude Code
- **Deny-Regeln** in der eingecheckten `.claude/settings.json`: `Read(~/.sf/**)`, `Read(~/.sfdx/**)`, `Bash(sf * -o mb-prod*)` und `Bash(sf * --target-org mb-prod*)`. Sie gelten in jedem Berechtigungsmodus, auch im Modus Auto und in `bypassPermissions`.
- **Stop-Hook:** ein Skript, das Tests und Code Analyzer ausführt und mit Exit-Code 2 endet, solange etwas rot ist; Claude arbeitet dann weiter. Merge-Gate bleibt die Pipeline.
- **Verweisdatei:** eine `CLAUDE.md` mit der einzigen Zeile `@AGENTS.md` und eine Vibes-Regel mit dem Dateimuster `**/*.cls`.
- **Befehle für die Regeldatei:** `sf apex run test -n MyClassTest -o mb-dev`, `sf code-analyzer run --target force-app`, `sf project deploy start --dry-run -o mb-int --test-level RunLocalTests` (`sf project deploy validate` ist laut Salesforce für Produktions-Orgs gedacht).
```

Auch Deny-Regeln haben Grenzen. Laut [Berechtigungsdoku von Anthropic](https://code.claude.com/docs/en/permissions) prüft eine Bash-Regel den Befehlstext, den der Agent schreibt, und sie „isn't a security boundary around the program“: Derselbe Befehl kann durchrutschen, wenn er in einen weiteren Shell-Aufruf verpackt ist. Die eigentliche Grenze ist, dass Produktionszugänge nie auf einem Entwicklerrechner gespeichert werden und nur die Pipeline nach Produktion deployt. Agentforce Vibes lässt sich laut Salesforce im Setup unter Agentforce Vibes Extensions [für eine Produktions-Org deaktivieren](https://developer.salesforce.com/blogs/2025/12/five-pro-tips-for-using-agentforce-vibes). Wenn Sie die Claude-Lizenzen selbst bereitstellen und Managed Settings zentral verteilen, kann laut Anthropic keine persönliche Settings-Datei diese Managed Settings überschreiben.

## Beispiel: drei Werkzeuge, zwei Partner, eine Datei

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service für den Außendienst, einem Händlerportal auf Experience Cloud und SAP S/4 als ERP. Partner A baut Portal und Serviceprozesse mit sechs Nearshore-Entwicklern und Claude Code. Partner B baut die SAP-Schnittstelle mit drei Entwicklern und Copilot. Zwei interne Entwickler nutzen Agentforce Vibes. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

Im Repository liegt die CLAUDE.md von Partner A aus einem früheren Projekt, rund 300 Zeilen, die API 62.0 für alle Klassen vorgibt. Die copilot-instructions.md von Partner B sagt nichts zu API-Versionen und erlaubt direkte HTTP-Callouts „für schnelle Tests“. Vibes arbeitet nur mit seinen eingebauten Regeln. Der interne Architekt schreibt mehrmals pro Sprint denselben Review-Kommentar zu fehlenden Sharing-Deklarationen.

Der Kunde richtet daraufhin ein:

- Eine AGENTS.md mit rund 90 Zeilen, verantwortet vom internen Architekten, aufgebaut aus dem alten Coding-Standard und den Review-Funden der letzten Sprints.
- Eine einzeilige CLAUDE.md, die AGENTS.md importiert, und eine Vibes-Regel für Apex-Dateien, die den Apex-Abschnitt wiederholt.
- Eingecheckte Deny-Regeln für den Produktions-Alias sowie Code Analyzer, Tests und Validierungs-Deployment als Merge-Gates in der Pipeline des Kunden.
- CODEOWNERS für alle Regel- und Settings-Dateien.

Partner A reicht seine Vorlage als Pull Request ein; nur eine Handvoll Zeilen wird übernommen. Ich rechne mit zwei Tagen für die erste Fassung und danach mit einer halben Stunde pro Sprint. Der Reviewer prüft weiter, schreibt aber nicht mehr dieselben Kommentare.

## Änderungen laufen per Pull Request mit CODEOWNERS

Regeldateien sind Teil Ihrer Kontrollen. Laut GitHub-Dokumentation liest Copilot Code Review die Anweisungen aus dem Head-Branch des Pull Requests. Ein Pull Request, der copilot-instructions.md ändert, ändert also die Anweisungen, nach denen sein eigenes KI-Review arbeitet. Genauso lässt sich eine eingecheckte Deny-Regel per Pull Request löschen wie jede andere Zeile.

Deshalb würde ich jede Regel- und Settings-Datei unter [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) stellen: AGENTS.md, CLAUDE.md, .claude/, .vibes/ und den gesamten Ordner .github/, denn laut GitHub muss auch der CODEOWNERS-Datei selbst eine verantwortliche Person zugeordnet sein. Mit „Require review from Code Owners“ in der Branch Protection wird die Freigabe zur Pflicht, solange niemand ungeprüfte Bypass-Rechte hat. GitHub verlangt Schreibrechte für Code Owner; damit Sie Zugriffe, Rulesets und Bypass-Rechte selbst steuern, sollte das Repository in Ihrer Organisation liegen. Dieselbe Logik gilt für gemeinsam genutzte Objekte, wie in der [Object Ownership Matrix](../object-ownership-matrix-salesforce/) beschrieben.

Die Datei wächst aus Belegen, nicht aus Wunschlisten. OpenAI empfiehlt, Regeln nach wiederholten Fehlern zu ergänzen; Anthropic empfiehlt das nach der zweiten Korrektur. In der Praxis sind die Review-Funde nach Kategorie die Grundlage, wie in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/) beschrieben. Zeilen fliegen wieder raus, sobald ein Pipeline-Gate sie abdeckt. Nach jedem Salesforce-Release prüft die verantwortliche Person zuerst die Zeile zur API-Version.

## Vorhandene Regeldateien im Repository aufnehmen

```schritte
Bestand aufnehmen
  Suchen Sie im Repository nach CLAUDE.md, AGENTS.md, .github/copilot-instructions.md und .vibes/rules/, und fragen Sie jeden Partner, welche Werkzeuge er nutzt.
Verantwortliche benennen
  Eine Person mit Vertretung auf Ihrer Seite.
Erste Fassung schreiben
  Unter 200 Zeilen, aus Ihrem Coding-Standard und den letzten Review-Funden.
Verweise anlegen
  Eine kurze CLAUDE.md, die auf AGENTS.md verweist, und eine Vibes-Regel.
Harte Regeln auslagern
  Deny-Regeln, ein Hook, der den Agenten bei roten Tests nicht aufhören lässt, und die Gates aus [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/), Vibes in Produktion deaktiviert.
Dateien schützen
  Mit CODEOWNERS und Branch Protection.
```

Das Einrichten gehört zu meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/) und in der [Partnersteuerung](../../leistungen/partnersteuerung/). Für die erste Fassung rechne ich mit wenigen Tagen.
