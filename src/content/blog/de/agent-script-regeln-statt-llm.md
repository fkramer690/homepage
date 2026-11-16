---
title: "Agent Script: Geschäftsregeln gehören nicht ins LLM"
description: "Kreditlimit, Garantieberechtigung und Preisfreigabe gehören in Agent-Script-Logik statt ins LLM. Wie hybrides Reasoning funktioniert und was Sie prüfen sollten."
pubDate: 2026-10-27
updatedDate: 2026-11-11
lang: de
slug: agent-script-regeln-statt-llm
translationKey: agent-script-deterministic-rules
topic: ai
categories: [ai]
tags: [Agent Script, Agentforce, KI-Agenten, Maschinenbau, Garantie, Architektur]
takeaways:
  - "Das LLM versteht die Anfrage und erklärt das Ergebnis. Die Entscheidung trifft Agent-Script-Logik oder der Flow-, Apex- oder ERP-Aufruf dahinter."
  - "Im neuen Agentforce (seit Februar 2026) laufen Logikanweisungen als Code ohne LLM-Aufruf; Prompt-Knoten und einige Plattformschritte rufen das Modell auf."
  - "Eine Aktion mit available-when-Bedingung verschwindet aus der Werkzeugliste des LLM, solange die Bedingung falsch ist."
  - "Gate-Variablen müssen vom Code gesetzt werden, nie vom LLM; sonst führt das Gate genau die Schwankung wieder ein, die es verhindern soll."
  - "before_reasoning wird bei jedem Parse ausgeführt; eine ERP-Abfrage ohne Schutzbedingung wird dort mehrmals pro Nutzereingabe ausgeführt."
faq:
  - q: "Was ist hybrides Reasoning in Agentforce?"
    a: "Hybrides Reasoning heißt, dass ein Agent deterministische Logik mit LLM-Reasoning kombiniert. In Agent Script laufen Logikanweisungen als Code ohne LLM-Aufruf, Prompt-Anweisungen werden zu einem Prompt für das Modell zusammengesetzt. Die Atlas Reasoning Engine entscheidet an jedem Schritt, welcher Weg gilt."
  - q: "Was bewirkt available when in Agent Script?"
    a: "Es ist eine Bedingung an einer Aktion. Ist sie falsch, entfernt die Plattform die Aktion aus der Werkzeugliste des LLM; das Modell kann sie weder auswählen noch aufrufen. Salesforce Architects nennt das ein hartes Gate auf Plattformebene."
  - q: "Laufen Agenten aus dem alten Agentforce Builder weiter?"
    a: "Ja. Laut Salesforce ist die Entwicklung am alten Builder eingefroren, neue Agenten entstehen seit Juli 2026 nur noch im neuen Builder, bestehende Agenten bleiben bearbeitbar. Salesforce Help beschreibt ein Upgrade, das eine neue Version im neuen Builder anlegt und Subagenten, Aktionen und Einstellungen in Agent Script überführt; wird sie aktiviert, wird die vorherige Version deaktiviert."
  - q: "Sollte der Agent das Kreditlimit selbst berechnen?"
    a: "Nein. Kreditlimit und Obligo werden im ERP gepflegt. Der Agent liest das Ergebnis über eine API-Aktion und nutzt es als Gate; die Auftragsaktion prüft es beim Anlegen des Auftrags erneut. Wer die Regel in Salesforce nachbaut, erzeugt eine zweite Fassung, die vom ERP abweicht."
draft: false
---

Über Kreditlimit, Garantieberechtigung und Preisfreigabe entscheidet deterministische Logik, nicht das Sprachmodell: Agent-Script-Logik oder, bei transaktionalen Regeln, das System, in dem die Regel geführt wird. Seit Februar 2026 ist das neue Agentforce mit hybridem Reasoning allgemein verfügbar: Logikanweisungen laufen als Code, das LLM wird an Prompt-Knoten aufgerufen. Nutzen Sie diese Trennung bewusst. Wenn das Modell eine Regel interpretiert, kann es bei gleicher Eingabe einen anderen Weg wählen; „der Agent hat entschieden“ trägt weder im Audit noch im Streit mit einem Händler. Die Regel entscheidet, das LLM versteht die Anfrage und erklärt das Ergebnis.

## Was ist hybrides Reasoning in Agent Script?

Hybrides Reasoning heißt, dass ein Agent deterministische Logik mit LLM-Reasoning verbindet. Salesforce Architects beschreibt das frühere Agentforce-Modell deutlich: Das LLM traf jede Entscheidung zur Laufzeit, „with no guaranteed path through the workflow“, gleiche Eingaben konnten also unterschiedliche Wege nehmen. Der [Architekturleitfaden zu hybridem Reasoning](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) stellt dem eine Regel entgegen: „if you can express a decision as code, it should be written as logic.“

Agent Script ist die deklarative Sprache dafür. Sie kennt zwei Arten von Anweisungen. Logikanweisungen, also Bedingungen und Aktionsaufrufe, laufen als Code ohne LLM. Prompt-Anweisungen sind natürliche Sprache für das Modell; bei einem Parse werden sie zu einem Prompt zusammengesetzt, und am Prompt-Knoten wird das Modell aufgerufen. Routing, Antwortgenerierung oder Groundedness-Prüfungen können weitere Modellaufrufe auslösen. Ein Compiler macht aus dem Script einen Agent Graph, den die Atlas Reasoning Engine als Zustandsautomat ausführt. Laut demselben Leitfaden ist das neue Agentforce seit Februar 2026 allgemein verfügbar.

Für bestehende Agenten bleibt das nicht lange freiwillig. Salesforce hat im [Juli 2026](https://www.salesforce.com/blog/upgrade-to-agent-script/) geschrieben, dass die Entwicklung am alten Builder eingefroren ist und neue Agenten nur noch im neuen Builder entstehen. Ein Enddatum gibt es noch nicht, bestehende Agenten bleiben bearbeitbar, und Salesforce bietet ein [Upgrade](https://help.salesforce.com/s/articleView?id=ai.agent_setup_create_upgrade.htm&language=de&type=5), das einen alten Agenten in eine neue Agent-Script-Version zum Prüfen und Testen überführt. Jeder Agent, den Sie jetzt beauftragen, ist ein Agent-Script-Agent.

## Warum gehören Kreditlimit, Garantie und Preisfreigabe nicht ins LLM?

Weil es Entscheidungen mit einer richtigen Antwort sind. Ein Händler liegt über dem Kreditlimit oder nicht. Eine Maschine hat Garantie oder nicht. Ein Rabatt braucht eine Freigabe oder nicht. Ich sehe fünf Gründe, diese Entscheidungen aus dem Modell herauszuhalten.

**Audit und Streitfälle.** Ein Händler, dessen Garantieantrag abgelehnt wurde, fragt nach dem Grund. Der Leitfaden nennt nicht deterministische Ausführung eine Lücke im Audit, und ich sehe das genauso. Bei gleicher Version, gleichen Eingaben und gleichem Systemzustand nimmt eine Regel im Code denselben Weg und ist nachvollziehbar. Agentenversionen liegen außerdem als Metadaten vor: Das [AiAuthoringBundle](https://developer.salesforce.com/blogs/2026/05/new-agentforce-metadata-and-development-lifecycle) hält versionierte Ordner. Um zu belegen, welche Regel für einen bestimmten Vorgang galt, sichern Sie zusätzlich Aktivierungshistorie und Laufzeit-Traces.

**Die Regel hat schon ein Zuhause.** In der Fertigung stehen Kreditlimit und Obligo in SAP oder proALPHA. Garantiebedingungen stehen in der Manufacturing Cloud oder im ERP. Preiskonditionen stehen im ERP oder im CPQ, eine Entscheidung, die ich in [Kundenpreise: SAP-Konditionen oder Salesforce Pricing?](/blog/kundenpreise-sap-konditionen-oder-salesforce-pricing/) beschreibe. Ein Agent sollte das Ergebnis dieses Systems lesen, nicht die Regel im Prompt nachbauen. Zwei Orte mit derselben Regel weichen voneinander ab, und die Prompt-Fassung ist die, die niemand testet.

**Kosten und Antwortzeit.** Der Leitfaden schreibt: „Every unnecessary LLM call adds latency, cost, and variability“, und ein einfaches Gespräch erforderte früher mindestens drei LLM-Zyklen. Jede Berechnung, die Sie in Logik verlagern, ist eine Stelle weniger, an der das Modell ein falsches Ergebnis liefern kann.

**Zu viele Anweisungen.** Die Forward Deployed Engineers von Salesforce erleben oft, dass Kunden immer mehr Regeln in die Anweisungen des Agenten schreiben. Laut [Salesforce Engineering](https://engineering.salesforce.com/accelerating-agentforce-deployments-from-6-months-to-3-weeks-across-150-enterprises/) antworten Agenten dadurch schlechter; Anweisungen sollen das Denken des Agenten lenken, die festen Entscheidungswege gehören in Workflows. Wie diese Engineers arbeiten, steht in [Forward Deployed Engineer bei Salesforce erklärt](/blog/forward-deployed-engineer-salesforce/).

**Nicht vertrauenswürdige Eingaben.** Händlerportale, Garantieformulare und E-Mails enthalten Eingaben von Menschen außerhalb Ihres Unternehmens. Hängt eine Regel davon ab, wie das Modell Freitext liest, kann dieser Text das Modell beeinflussen. Das beschreibe ich in [Prompt Injection über Händlerportale](/blog/prompt-injection-haendlerportal-agentforce/).

## So setzt Agent Script eine Regel durch

Für Entscheider sind vier Bausteine relevant. Ihr Partner sollte Ihnen zeigen können, wo jede Regel definiert ist.

- **Bedingungen im Reasoning-Block.** Laut [Agent-Script-Doku](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns-conditionals.html) werden `if` und `else` ausgewertet, bevor der Prompt das LLM erreicht, und nur die passende Anweisung wird geschickt. Den Zweig, der nicht gilt, sieht das Modell nie.
- **available when.** Eine Bedingung an einer Aktion. Ist sie falsch, ist die Aktion für das LLM [vollständig verborgen](https://developer.salesforce.com/sample-apps/agent-script-recipes/action-configuration/available-when-filtering) und kann nicht aufgerufen werden. Das ist das Gate für „Auftrag anlegen“ oder „Antrag genehmigen“. Eine Berechtigungsgrenze ist es nicht: Flow, Apex-Service oder ERP-Endpunkt hinter der Aktion müssen Regel und Berechtigung des Aufrufers beim Ausführen erneut prüfen.
- **before_reasoning und after_reasoning.** `before_reasoning` wird deterministisch zu Beginn jedes Parse ausgeführt und dient der Authentifizierung, der Berechtigungsprüfung und dem Laden von Kontext. `after_reasoning` läuft normalerweise nach dem Ende der Reasoning-Schleife, für Prüfungen und Übergänge, entfällt aber in dokumentierten Fällen. Ein Parse erfolgt beim ersten Eintritt, nach jedem Werkzeugaufruf und bei jeder Nutzereingabe.
- **Eskalation.** `@utils.escalate` [übergibt das Gespräch per Omni-Channel an eine Servicemitarbeiterin](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-utils.html).

Eine vereinfachte Skizze eines Kredit-Gates für Ersatzteilaufträge, in Worten:

```eintrag Kredit-Gate für Ersatzteilaufträge
Vor dem Reasoning | Ist die Bonität noch nicht geprüft, ruft das Skript die Bonitätsabfrage mit der Händlernummer auf, speichert das Ergebnis und vermerkt die erfolgte Prüfung
Anweisung | Ist die Bonität nicht in Ordnung, erklärt der Agent, dass das Kreditmanagement den Auftrag zuerst freigeben muss
Aktion | „Ersatzteilauftrag anlegen“ ist nur verfügbar, wenn die Bonität in Ordnung ist *
fazit: Das Modell entscheidet nie über die Bonität. Es sieht die Auftragsaktion erst, wenn der Code das Gate geöffnet hat.
```

Drei Details aus dem Leitfaden sollten Sie bei Ihrem Partner erfragen.

```vertiefung Für Entwickler
titel: Gate-Variablen, Schutzbedingung und is_displayable
- **Code setzt die Gate-Variablen.** Setzt sie das LLM, „you've reintroduced the variability the gate was designed to prevent.“
- **Die Schutzbedingung ist entscheidend** (`if @variables.credit_checked == False`). Ohne sie wird die ERP-Abfrage in `before_reasoning` bei jedem Parse ausgeführt, also mehrmals pro Eingabe, und jede Ausführung ist ein ERP-Aufruf.
- **`is_displayable` beendet die Schleife.** Ist eine Aktionsausgabe als anzeigbar markiert und zeigt das Modell sie an, endet die Reasoning-Schleife, und `after_reasoning` entfällt. Eine Prüfung an dieser Stelle wird dann nie ausgeführt.
```

```hinweis offen
Laut [Salesforce Help](https://help.salesforce.com/s/articleView?id=ai.agent_considerations.htm&language=de&type=5) lösen Agentenaktionen bei jeder Ausführung Abrechnung aus, auch wenn Reasoning-Anweisungen sie deterministisch starten. Die [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) vom 3. November 2026 nennt 20 Credits pro Aktion, 16 in einer Sandbox. Eine ERP-Abfrage ohne Schutzbedingung in `before_reasoning` kostet also bei jedem Parse Credits.
```

## Rechenbeispiel: Händleragent für Ersatzteile und Garantie

Nehmen wir einen Maschinenbauer mit SAP, Sales Cloud, Service Cloud und Händlerportal. Die Zahlen sind Annahmen, die das Vorgehen zeigen. Der Agent bearbeitet im Monat 800 Ersatzteilaufträge und 150 Garantie-Vorprüfungen; betroffen sind dabei Kreditlimit, Garantie und Preisfreigabe.

**Kreditlimit.** Das SAP-Kreditmanagement entscheidet. Eine MuleSoft-API liefert pro Händler ein Kennzeichen, wie in [Agentforce und SAP-Auftragsstatus](/blog/agentforce-sap-auftragsstatus/) beschrieben. Der Agent liest es zu Beginn der Sitzung, um das Gespräch zu steuern, und gibt die Auftragsaktion nur bei ausreichender Bonität frei; die Auftrags-API prüft den aktuellen Kreditstatus beim Anlegen erneut. Angenommen, 4 Prozent der Händler sind gesperrt: Ihnen erklärt das Modell, dass das Kreditmanagement den Auftrag freigeben muss, und bietet an, die Anfrage weiterzuleiten. Die Auftragsaktion steht dem Modell dabei nicht zur Verfügung.

**Garantieberechtigung.** Angenommen, die Regel lautet 24 Monate ab Inbetriebnahme oder 5.000 Betriebsstunden, je nachdem, was zuerst eintritt. Das Modell sammelt Seriennummer und Fehlerbeschreibung aus dem Freitext. Ein Flow oder eine Apex-Aktion liest dann die Garantiedaten des Assets und liefert das Ergebnis „berechtigt“, „nicht berechtigt“ oder „Daten fehlen“, jeweils mit Begründung. Das Modell formuliert die Antwort. Fehlt das Inbetriebnahmedatum, lautet das Ergebnis „Daten fehlen“, und der Fall wird an einen Menschen übergeben, statt auf einer Vermutung zu beruhen. Wie die Manufacturing Cloud Garantien abbildet, steht in [Garantieansprüche von Händlern](/blog/garantieansprueche-haendler-salesforce/); den Winter-'27-Agenten für diese Prüfung beschreibe ich im Beitrag [Der Garantie-Prüfagent](/blog/garantie-pruefagent-winter-27/).

**Preisfreigabe.** Angenommen, Händler dürfen bei Ersatzteilen bis zu 8 Prozent Zusatzrabatt ohne Freigabe erhalten. Darüber verhandelt der Agent nicht. Ein Flow startet die Genehmigung beim Vertriebsleiter, und das Modell sagt dem Händler, dass die Anfrage beim Vertrieb liegt. Der Vertrieb pflegt die Schwelle an einer Stelle, im Prompt steht sie nicht.

Dem Modell bleibt, was es gut kann: „Die Hydraulikpumpe an unserer Maschine von 2023 leckt schon wieder“ zu verstehen und daraus eine Seriennummernabfrage und eine Fehlerkategorie zu machen.

## Was bleibt beim LLM?

Es bleibt mehr, als es zunächst klingt. Das Modell erkennt die Absicht, füllt Pflichtangaben aus Freitext, fasst einen Fall für den Techniker zusammen, erklärt eine Ablehnung höflich in der Sprache des Händlers und erkennt im Rahmen Ihrer Eskalationsregeln, wann ein Gespräch an einen Menschen gehen sollte. Gartner empfiehlt Agenten [dort, wo Entscheidungen nötig sind](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), und Automatisierung für Routineabläufe. Ich lese das genauso: Was der Händler will, beurteilt das Modell. Die Regel danach wird als Code ausgeführt.

Agent Script ist auch nicht immer der richtige Ort für die Regel selbst. Hat die Regel viele Varianten, etwa Garantiebedingungen pro Produktfamilie und Bauteil, gehört sie ins Datenmodell oder in die Business Rules Engine, die auf der [Seite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/) für Claims, Boni und Angebote genannt wird. Das Script ruft sie dann auf. Gehört die Regel dem ERP, ruft das Script das ERP auf. In Agent Script wird festgelegt, wann eine Regel geprüft wird und was mit dem Ergebnis passiert.

## Alle Entscheidungen auflisten, bevor der Partner baut

Bevor Ihr Partner mit der Umsetzung beginnt, würde ich diese Schritte durchgehen:

```schritte
Entscheidungen auflisten
  Alle Entscheidungen, die der Agent berührt, sammeln und die mit einer richtigen Antwort markieren.
Führendes System benennen
  Für jede Regel festhalten, wo sie geführt wird: ERP, Manufacturing Cloud, Business Rules Engine oder Flow.
Gates festlegen
  Welche Aktion ist unter welcher Bedingung verfügbar, und welcher Code setzt die Variable?
„Daten fehlen“ definieren
  Ein eigenes Ergebnis, das an einen Menschen geht.
Regeln wie Code testen
  Mit Fällen auf beiden Seiten jeder Schwelle, wie in [Agentforce-Agenten testen und freigeben](/blog/agentforce-agenten-testen-freigeben/) beschrieben.
```

Diesen Teil eines Agentendesigns prüfe ich auf Kundenseite im Rahmen der [Salesforce-Architektur](/leistungen/salesforce-architektur/), weil er bestimmt, ob der Agent später auditierbar ist. Ob Ihr Prozess überhaupt reif für einen Agenten ist, steht in [Agentforce für Hersteller: jetzt starten oder warten](/blog/agentforce-ja-oder-nein-hersteller/).
