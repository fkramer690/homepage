---
title: "Agent Script: Geschäftsregeln gehören nicht ins LLM"
description: "Kreditlimit, Garantieberechtigung und Preisfreigabe gehören in Agent-Script-Logik statt ins LLM. Wie hybrides Reasoning funktioniert und was Sie prüfen sollten."
pubDate: 2026-10-27
lang: de
slug: agent-script-regeln-statt-llm
translationKey: agent-script-deterministic-rules
topic: ai
categories: [ai]
tags: [Agent Script, Agentforce, KI-Agenten, Maschinenbau, Garantie, Architektur]
takeaways:
  - "Das LLM versteht die Anfrage und erklärt das Ergebnis. Die Entscheidung trifft Agent-Script-Logik oder der Flow-, Apex- oder ERP-Aufruf dahinter."
  - "Im neuen Agentforce, seit Februar 2026 verfügbar, laufen Logikanweisungen als Code ohne LLM-Aufruf, nur Prompt-Anweisungen lösen einen aus."
  - "Eine Aktion mit available-when-Bedingung verschwindet aus der Werkzeugliste des LLM, solange die Bedingung falsch ist."
  - "Gate-Variablen muss Code setzen, nie das LLM; sonst bringt das Gate genau die Schwankung zurück, die es verhindern soll."
  - "before_reasoning läuft bei jedem Parse; eine ERP-Abfrage dort ohne Schutzbedingung läuft mehrmals pro Nutzereingabe."
faq:
  - q: "Was ist hybrides Reasoning in Agentforce?"
    a: "Hybrides Reasoning heißt, dass ein Agent deterministische Logik mit LLM-Reasoning kombiniert. In Agent Script laufen Logikanweisungen als Code ohne LLM-Aufruf, Prompt-Anweisungen interpretiert das Modell. Die Atlas Reasoning Engine entscheidet an jedem Schritt, welcher Weg gilt."
  - q: "Was bewirkt available when in Agent Script?"
    a: "Es ist eine Bedingung an einer Aktion. Ist sie falsch, entfernt die Plattform die Aktion aus der Werkzeugliste des LLM, das Modell kann sie weder auswählen noch aufrufen. Salesforce Architects nennt das ein hartes Gate auf Plattformebene."
  - q: "Laufen Agenten aus dem alten Agentforce Builder weiter?"
    a: "Ja. Laut Salesforce ist die Entwicklung am alten Builder eingefroren, neue Agenten entstehen seit Juli 2026 nur noch im neuen Builder, ein Enddatum gibt es nicht. Umstellen heißt neu bauen; wird der neue Agent aktiviert, wird der alte deaktiviert."
  - q: "Sollte der Agent das Kreditlimit selbst berechnen?"
    a: "Nein. Kreditlimit und Obligo werden im ERP gepflegt. Der Agent liest das Ergebnis über eine API-Aktion und nutzt es als Gate. Wer die Regel in Salesforce nachbaut, erzeugt eine zweite Fassung, die vom ERP wegdriftet."
draft: false
---

Kreditlimitprüfung, Garantieberechtigung und Preisfreigabe gehören in Agent-Script-Logik und nicht in das Urteil des Sprachmodells. Seit Februar 2026 ist das neue Agentforce mit hybridem Reasoning allgemein verfügbar: Logikanweisungen laufen als Code, das LLM wird nur dort gerufen, wo Sie Prompt-Anweisungen schreiben. Nutzen Sie diese Trennung bewusst. Eine Regel, die das Modell interpretiert, kann bei gleicher Eingabe einen anderen Weg nehmen, und „der Agent hat entschieden“ hält weder im Audit noch im Streit mit einem Händler. Die Regel entscheidet, das LLM versteht die Anfrage und erklärt das Ergebnis.

## Was ist hybrides Reasoning in Agent Script?

Hybrides Reasoning heißt, dass ein Agent deterministische Logik mit LLM-Reasoning verbindet. Salesforce Architects beschreibt das frühere Agentforce-Modell deutlich: Das LLM traf jede Entscheidung zur Laufzeit, „with no guaranteed path through the workflow“, gleiche Eingaben konnten also unterschiedliche Wege nehmen. Der [Architekturleitfaden zu hybridem Reasoning](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) setzt eine Regel dagegen: „if you can express a decision as code, it should be written as logic.“

Agent Script ist die deklarative Sprache dafür. Sie kennt zwei Arten von Anweisungen. Logikanweisungen, also Bedingungen und Aktionsaufrufe, laufen als Code ohne LLM. Prompt-Anweisungen sind natürliche Sprache für das Modell, und jede löst einen LLM-Aufruf aus. Ein Compiler macht aus dem Script einen Agent Graph, den die Atlas Reasoning Engine als Zustandsautomat ausführt. Laut demselben Leitfaden ist das neue Agentforce seit Februar 2026 allgemein verfügbar.

Für bestehende Agenten bleibt das nicht lange freiwillig. Salesforce hat im [Juli 2026](https://www.salesforce.com/blog/upgrade-to-agent-script/) geschrieben, dass die Entwicklung am alten Builder eingefroren ist und neue Agenten nur noch im neuen Builder entstehen. Ein Enddatum gibt es noch nicht, aber jeder Agent, den Sie jetzt beauftragen, ist ein Agent-Script-Agent.

## Warum gehören Kreditlimit, Garantie und Preisfreigabe nicht ins LLM?

Weil es Entscheidungen mit einer richtigen Antwort sind. Ein Händler liegt über dem Kreditlimit oder nicht. Eine Maschine hat Garantie oder nicht. Ein Rabatt braucht eine Freigabe oder nicht. Ich sehe vier Gründe, diese Entscheidungen aus dem Modell herauszuhalten.

**Audit und Streitfälle.** Ein Händler, dessen Garantieantrag abgelehnt wurde, fragt nach dem Grund. Der Leitfaden nennt nicht deterministische Ausführung eine Lücke im Audit, und ich sehe das genauso. Eine Regel im Code gibt am Dienstag dieselbe Antwort wie am Montag und ist nachvollziehbar. Agentenversionen liegen außerdem als Metadaten vor: Das [AiAuthoringBundle](https://developer.salesforce.com/blogs/2026/05/new-agentforce-metadata-and-development-lifecycle) hält versionierte Ordner, Sie können also zeigen, welche Regelversion aktiv war.

**Die Regel hat schon ein Zuhause.** In der Fertigung stehen Kreditlimit und Obligo in SAP oder proALPHA. Garantiebedingungen stehen in der Manufacturing Cloud oder im ERP. Preiskonditionen stehen im ERP oder im CPQ, eine Entscheidung, die ich in [Kundenpreise: SAP-Konditionen oder Salesforce Pricing?](../kundenpreise-sap-konditionen-oder-salesforce-pricing/) beschreibe. Ein Agent sollte das Ergebnis dieses Systems lesen, nicht die Regel im Prompt nachbauen. Zwei Orte mit derselben Regel laufen auseinander, und die Prompt-Fassung ist die, die niemand testet.

**Kosten und Antwortzeit.** Der Leitfaden schreibt: „Every unnecessary LLM call adds latency, cost, and variability“, und ein einfaches Gespräch brauchte früher mindestens drei LLM-Zyklen. Jede Berechnung, die Sie in Logik verlagern, ist eine Stelle weniger, an der das Modell danebenliegen kann.

**Fremde Eingaben.** Händlerportale, Garantieformulare und E-Mails schreiben Menschen außerhalb Ihres Unternehmens. Hängt eine Regel davon ab, wie das Modell Freitext liest, kann dieser Text das Modell schieben. Das beschreibe ich in [Prompt Injection über Händlerportale](../prompt-injection-haendlerportal-agentforce/).

## So setzt Agent Script eine Regel durch

Für Entscheider zählen vier Bausteine. Ihr Partner sollte Ihnen zeigen können, wo jede Regel sitzt.

- **Bedingungen im Reasoning-Block.** Laut [Agent-Script-Doku](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-conditionals.html) werden `if` und `else` ausgewertet, bevor der Prompt das LLM erreicht, und nur die passende Anweisung wird geschickt. Den Zweig, der nicht gilt, sieht das Modell nie.
- **available when.** Eine Bedingung an einer Aktion. Ist sie falsch, ist die Aktion für das LLM [vollständig verborgen](https://developer.salesforce.com/sample-apps/agent-script-recipes/action-configuration/available-when-filtering) und kann nicht aufgerufen werden. Das ist das Gate für „Auftrag anlegen“ oder „Antrag genehmigen“.
- **before_reasoning und after_reasoning.** `before_reasoning` läuft deterministisch zu Beginn jedes Parse, für Authentifizierung, Berechtigungsprüfung und das Laden von Kontext. `after_reasoning` läuft nach dem Modell, für Prüfungen und Übergänge. Ein Parse passiert beim ersten Eintritt, nach jedem Werkzeugaufruf und bei jeder Nutzereingabe.
- **Eskalation.** `@utils.escalate` [übergibt das Gespräch an eine Servicemitarbeiterin](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-utils.html) über Omni-Channel.

Eine vereinfachte Skizze eines Kredit-Gates für Ersatzteilaufträge:

```
before_reasoning:
    if @variables.credit_checked == False:
        run @actions.get_credit_status
            with dealer_id=@variables.dealer_id
            set @variables.credit_ok=@outputs.credit_ok
        set @variables.credit_checked = True

reasoning:
    instructions: ->
        if @variables.credit_ok == False:
            | Explain that credit management must release the order first.
    actions:
        create_order: @actions.create_spare_parts_order
            available when @variables.credit_ok == True
```

Drei Details aus dem Leitfaden sollten Sie bei Ihrem Partner erfragen.

```vertiefung Für Entwickler
titel: Gate-Variablen, Schutzbedingung und is_displayable
- **Code setzt die Gate-Variablen.** Setzt sie das LLM, „you've reintroduced the variability the gate was designed to prevent.“
- **Die Schutzbedingung in der Skizze zählt.** Ohne sie läuft die ERP-Abfrage in `before_reasoning` bei jedem Parse, also mehrmals pro Eingabe, und jeder Lauf ist ein ERP-Aufruf.
- **`is_displayable` beendet die Schleife.** Eine solche Aktion beendet die Reasoning-Schleife, sobald ihr Ergebnis angezeigt wird, und `after_reasoning` entfällt. Eine Prüfung dort läuft dann nie.
```

```hinweis offen
Die [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) berechnet Aktionen mit 20 Credits, sagt aber nicht, ob vom Script ausgelöste Aufrufe anders zählen. Bei einer ERP-Abfrage in `before_reasoning` würde ich mir das im Angebot bestätigen lassen.
```

## Rechenbeispiel: Händleragent für Ersatzteile und Garantie

Nehmen wir einen Maschinenbauer mit SAP, Sales Cloud, Service Cloud und Händlerportal. Die Zahlen sind Annahmen, die das Vorgehen zeigen. Der Agent bearbeitet im Monat 800 Ersatzteilaufträge und 150 Garantie-Vorprüfungen und berührt dabei Kreditlimit, Garantie und Preisfreigabe.

**Kreditlimit.** Das SAP-Kreditmanagement entscheidet. Eine MuleSoft-API liefert pro Händler ein Kennzeichen, wie in [Agentforce und SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/) beschrieben. Der Agent liest es einmal pro Sitzung und sperrt damit die Auftragsaktion. Angenommen, 4 Prozent der Händler sind jeweils gesperrt: Ihnen erklärt das Modell, dass das Kreditmanagement den Auftrag freigeben muss, und bietet an, die Anfrage weiterzuleiten. Einen Bestellknopf sieht es nie.

**Garantieberechtigung.** Angenommen, die Regel lautet 24 Monate ab Inbetriebnahme oder 5.000 Betriebsstunden, je nachdem, was zuerst eintritt. Das Modell sammelt Seriennummer und Fehlerbeschreibung aus dem Freitext. Eine Flow- oder Apex-Aktion liest dann die Anlagengarantie und liefert berechtigt, nicht berechtigt oder Daten fehlen, jeweils mit Begründung. Das Modell formuliert die Antwort. Fehlt das Inbetriebnahmedatum, lautet das Ergebnis „Daten fehlen“, und der Fall geht an einen Menschen statt an eine Vermutung. Wie die Manufacturing Cloud Garantien abbildet, steht in [Garantieansprüche von Händlern](../garantieansprueche-haendler-salesforce/), den Winter-'27-Agenten für diese Prüfung beschreibe ich in [der Garantie-Prüfagent](../garantie-pruefagent-winter-27/).

**Preisfreigabe.** Angenommen, Händler dürfen bei Ersatzteilen bis zu 8 Prozent Zusatzrabatt ohne Freigabe erhalten. Darüber verhandelt der Agent nicht. Ein Flow startet die Genehmigung beim Vertriebsleiter, und das Modell sagt dem Händler, dass die Anfrage beim Vertrieb liegt. Die Schwelle steht an einer Stelle, gepflegt vom Vertrieb, und nicht als Satz im Prompt.

Dem Modell bleibt, was es gut kann: „Die Hydraulikpumpe an unserer Maschine von 2023 leckt schon wieder“ zu verstehen und daraus eine Seriennummernabfrage und eine Fehlerkategorie zu machen.

## Was bleibt beim LLM?

Mehr, als es klingt. Das Modell erkennt die Absicht, füllt Pflichtangaben aus Freitext, fasst einen Fall für den Techniker zusammen, erklärt eine Ablehnung höflich in der Sprache des Händlers und erkennt, wann ein Gespräch einen Menschen braucht. Gartner empfiehlt Agenten [dort, wo Entscheidungen nötig sind](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), und Automatisierung für Routineabläufe. Ich lese das genauso: Das Urteil, was der Händler will, gehört dem Modell, die Regel danach gehört in Code.

Agent Script ist auch nicht immer der richtige Ort für die Regel selbst. Hat die Regel viele Varianten, etwa Garantiebedingungen pro Produktfamilie und Bauteil, gehört sie ins Datenmodell oder in die Business Rules Engine, die die [Seite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/) für Claims, Boni und Angebote nennt. Das Script ruft sie dann auf. Gehört die Regel dem ERP, ruft das Script das ERP. Agent Script entscheidet, wann eine Regel geprüft wird und was mit dem Ergebnis passiert.

## Alle Entscheidungen auflisten, bevor der Partner baut

Bevor Ihr Partner mit dem Bau beginnt, würde ich diese Schritte durchgehen:

```schritte
Entscheidungen auflisten
  Alle Entscheidungen, die der Agent berührt, sammeln und die mit einer richtigen Antwort markieren.
Führendes System benennen
  Für jede Regel festhalten, wo sie lebt: ERP, Manufacturing Cloud, Business Rules Engine oder Flow.
Gates festlegen
  Welche Aktion ist unter welcher Bedingung verfügbar, und welcher Code setzt die Variable?
„Daten fehlen“ definieren
  Ein eigenes Ergebnis, das an einen Menschen geht.
Regeln wie Code testen
  Mit Fällen auf beiden Seiten jeder Schwelle, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) beschrieben.
```

Diesen Teil eines Agentendesigns prüfe ich auf Kundenseite im Rahmen der [Salesforce-Architektur](../../leistungen/salesforce-architektur/), weil er entscheidet, ob sich der Agent später prüfen lässt. Ob Ihr Prozess überhaupt reif für einen Agenten ist, steht in [Agentforce für Hersteller: jetzt starten oder warten](../agentforce-ja-oder-nein-hersteller/).
