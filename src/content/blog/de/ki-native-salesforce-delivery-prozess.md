---
title: "KI-nativer Delivery-Prozess für Salesforce in 14 Schritten"
description: "KI-nativer Delivery-Prozess für Salesforce vom Workshop bis zur Produktion: was der Agent macht, wo Personen an fünf Toren entscheiden."
pubDate: 2026-10-30
lang: de
slug: ki-native-salesforce-delivery-prozess
translationKey: ai-native-delivery-process
topic: devops
categories: [devops, ai]
tags: [KI-native Delivery, Coding-Agenten, Jira, DevOps, Anforderungsmanagement, Maschinenbau]
takeaways:
  - "Im KI-nativen Delivery-Prozess für Salesforce ist das Jira-Ticket die ausführbare Spezifikation: Ein Agent macht die Fleißarbeit bis zum Pull Request, Personen entscheiden an fünf Toren."
  - "Der rote Faden ist eine lückenlose Kette vom Satz im Workshop-Transkript über Anforderung, Story, Commit und Test bis zur Release Note; jede Zeile Code lässt sich auf eine Aussage des Kunden zurückführen."
  - "Das wichtigste Tor ist die Spec-Freigabe „Ready for Agent“ durch Business Analyst und Architekt, weil ein Fehler dort am billigsten zu korrigieren ist."
  - "Die Pipeline bleibt deterministisch und ohne KI-Entscheidungen; nur sie hat Zugang zur Produktion, der Agent arbeitet ausschließlich in Scratch Orgs und Sandboxes."
  - "Rückmeldungen aus dem Abnahmetest ordnet der Agent mit Beleg aus dem bestätigten Protokoll als Bug, Change Request oder Klärungsbedarf ein; Scope Creep wird damit sichtbar."
faq:
  - q: "Was ist der Unterschied zwischen KI-gestützter und KI-nativer Salesforce-Delivery?"
    a: "KI-gestützt heißt, der alte Prozess bekommt einen Coding-Assistenten. KI-nativ heißt, der Prozess ist um den Agenten herum gebaut: Er analysiert, protokolliert, entwirft und programmiert, Personen kuratieren und entscheiden an festen Toren."
  - q: "Darf ein KI-Agent nach Produktion deployen?"
    a: "Nein. Produktionszugänge liegen ausschließlich bei der Pipeline, die eine bereits validierte Deployment-ID per Quick Deploy ausrollt. Der Agent arbeitet in Scratch Orgs und Sandboxes, die ausdrücklich für ihn freigegeben sind."
  - q: "Dürfen Workshops mit dem Kunden aufgezeichnet werden?"
    a: "Nur mit Einwilligung aller Teilnehmenden, bei Konzernkunden oft zusätzlich mit dem Betriebsrat, und mit Klärung, in wessen Tenant das Transkript liegt. Will der Kunde keine Aufzeichnung, diktiert der Business Analyst direkt nach dem Termin eine Zusammenfassung, die denselben Weg geht."
  - q: "Wer verantwortet die Qualität der Agenten-Ergebnisse?"
    a: "Fachlich der Business Analyst, technisch der Architekt über die Regeldatei im Repository, im Code der Entwickler, der jeden Pull Request reviewt. Der Agent entscheidet nichts Verbindliches."
draft: false
---

Ein KI-nativer Delivery-Prozess für Salesforce macht das Jira-Ticket zur ausführbaren Spezifikation. Ein Agent erledigt die Fleißarbeit von der Workshop-Vorbereitung bis zum Pull Request, die Pipeline prüft deterministisch, und Personen entscheiden an fünf festen Toren: Protokoll, Spec, Code-Review, Bugs und Change Requests, Release. Der Prozess hat 14 Schritte von der ersten Anforderung bis zur Produktion. Er hält eine Kette zusammen, die klassische Projekte selten schaffen: Jede Zeile Code führt auf einen Satz zurück, den jemand beim Kunden gesagt hat. Für Hersteller ändert sich vor allem eines: Der Fachbereich sieht viel früher etwas Lauffähiges und muss dafür schneller bestätigen.

## Was heißt KI-nativ in einem Salesforce-Projekt?

KI-native Delivery bedeutet, den Lieferprozess um den Agenten herum zu bauen, statt dem alten Prozess einen Coding-Assistenten hinzuzufügen. Wie sich dadurch die Teamaufstellung ändert, habe ich in [KI-native Delivery: kleinere Salesforce-Teams](../ki-kleinere-salesforce-teams-delivery/) beschrieben. Hier geht es um den Ablauf selbst. Er ist mein Zielbild: Einzelne Schritte nutze ich schon, durchgängig vom Workshop bis zur Produktion setze ich ihn im nächsten Projekt auf, und ein paar Lücken sind noch zu schließen. Er ruht auf vier Ideen:

```saeulen
dach: KI-native Delivery
contract | Ticket | ist die Spezifikation | Ein Agent setzt eine Story nur so gut um, wie ihre Akzeptanzkriterien geschrieben sind.
ai | Agent | macht die Fleißarbeit | Org-Analyse, Protokoll, Stories, Prototyp, Code, Tests und Release Notes entwirft der Agent.
pipeline | Pipeline | prüft deterministisch | Sie validiert und deployt, ohne dass irgendwo ein Modell entscheidet.
team | Personen | entscheiden an Toren | Sie führen jedes Gespräch mit dem Kunden selbst, der Agent sitzt in keinem Termin.
basis: Ein Prozess, um den Agenten herum gebaut
```

Der Unterschied zu KI-gestützt: Dort bekommt der alte Prozess einen Coding-Assistenten, der Business Analyst tippt weiter Stories ab, und der Kunde sieht erst im Abnahmetest etwas Lauffähiges. Hier liefert der Agent Protokoll, Stories und einen Prototyp, und jede Rückmeldung wird gegen das bestätigte Protokoll eingeordnet.

## Wie läuft der Prozess vom Workshop bis zur Produktion?

Der Prozess hat drei Phasen mit zusammen 14 Schritten. Jede Grafik zeigt eine Phase in drei Spuren: was Personen im Gespräch tun, was der Agent erledigt und was die Pipeline prüft. Die dunklen Balken sind die Tore, an denen eine Person verbindlich entscheidet. Die blaue Spalte rechts zeigt den Status des Jira-Tickets und wer ihn setzt: Der Agent legt Stories direkt in Jira an, die Pipeline schaltet den Status nach Validierung und Deployment selbst weiter.

### Discovery: der Agent bereitet vor, Personen führen das Gespräch

```prozess
titel: Phase 1 von 3 · Discovery
spuren: Personen | Agent | Pipeline
ticket: Jira
Agent | Workshop vorbereiten | Org-Analyse, Agenda, Hypothesen
Personen | Discovery-Workshop | Kunde, BA, Architekt; Transkript läuft
Agent | Auswertung | Protokoll, Story-Entwürfe mit Zeitstempel | Stories angelegt · Agent
tor: Kunde bestätigt das Protokoll
Agent | Prototyp | In einer Scratch Org, in Stunden
Personen | Refinement am Prototyp | Kunde klickt durch, Transkript läuft
Agent | Story-Diff und Impact | Änderungen, Testfälle, Metadaten | Stories aktualisiert · Agent
tor: BA und Architekt geben die Story frei | Ready for Agent · BA
```

Vor dem Workshop analysiert der Agent die bestehende Org: Objekte, Flows, Validierungsregeln, Berechtigungen. Daraus entwirft er Agenda, Hypothesen und gezielte Fragen, etwa: „Auf Opportunity laufen drei Flows, die sich überschneiden. Wer ist dafür fachlich zuständig?“ Der Business Analyst schärft die Agenda und streicht Hypothesen, die politisch heikel sind. Wie eine solche Org-Analyse aussieht, steht in [KI-Org-Analyse: technische Schulden finden](../ki-org-analyse-technische-schulden/).

Im Workshop moderiert der Business Analyst und muss nicht mitschreiben. Aus dem Transkript erzeugt der Agent ein Protokoll mit Entscheidungen, offenen Fragen und Verantwortlichen sowie Entwürfe für Epics und Stories in Jira, jeweils mit Zeitstempel. Er trennt hart zwischen „Kunde hat gesagt“ und „Agent interpretiert“. Der Business Analyst kuratiert: streichen, schärfen, Fit-Gap ergänzen (Standard, Konfiguration oder Code), falsch erkannte Fachbegriffe und verwechselte Sprecher korrigieren.

Bestätigt der Kunde das Protokoll, steht die Scope-Baseline. Danach baut der Agent in Stunden einen Prototyp in einer Scratch Org, einer kurzlebigen Test-Org, mit Objekten, Feldern, Layouts und einem einfachen Flow. Im Refinement reagiert der Kunde auf etwas Echtes statt auf Papier. Der Agent schreibt danach keinen neuen Story-Satz, sondern einen Diff gegen die bestehenden Stories: „Akzeptanzkriterium 2 geändert, weil der Kunde bei 00:41:07 sagte …“, ergänzt um betroffene Metadaten, Testfälle und Impact gegen den Stand im Repository.

### Bauen: der Agent programmiert, der Entwickler reviewt

```prozess
titel: Phase 2 von 3 · Bauen
spuren: Personen | Agent | Pipeline
ticket: Jira
start: 7 | 3
Agent | Implementierung | Plan, Freigabe, Code und Tests | In Arbeit · Agent
Agent | Pull Request | Beschreibung, Jira-Link, KI-Review | In Review · Agent
tor: Entwickler reviewt und merged
Pipeline | CI-Validierung | Delta als Check-Deploy, Tests, Analyzer | Validiert · Pipeline
zurueck: Fehler: Agent liest das Log und fixt, höchstens 2 Versuche
```

Erst wenn Business Analyst und Architekt eine Story auf „Ready for Agent“ setzen, beginnt die Umsetzung. Der Agent liest das Ticket, legt einen Feature-Branch an, schreibt einen Umsetzungsplan und setzt ihn erst nach Freigabe durch den Entwickler um: Apex, Lightning Web Components oder Flow, jeweils mit Tests. Bei unklaren Anforderungen liest er die verlinkte Stelle im Transkript, statt zu raten. Er schreibt die Beschreibung des Pull Requests mit Ticket-Link und Komponentenliste, ein KI-Reviewer kommentiert vorab.

Gemergt wird nur nach dem Review durch einen Entwickler. Der Entwickler reviewt in diesem Prozess mehr, als er schreibt. Warum ich auf dieses Tor nie verzichte, steht in [Warum Pull-Request-Reviews Pflicht sind](../warum-pull-request-reviews-pflicht-sind/).

Danach läuft die Pipeline: ein Delta-Paket mit `sfdx-git-delta`, ein Check-only-Deploy gegen die Integrations-Sandbox, definierte Tests und ein Code-Analyzer-Gate. Schlägt sie fehl, bekommt der Agent das Log und darf einen Fix-Commit liefern, höchstens zwei Versuche. Danach übernimmt der Entwickler. Welche Prüfungen ich für KI-Code in die Pipeline setze, beschreibe ich in [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/).

### Release: der Kunde testet, der Agent ordnet ein

```prozess
titel: Phase 3 von 3 · Release
spuren: Personen | Agent | Pipeline
ticket: Jira
start: 10 | 4
Pipeline | Deploy nach UAT | Agent schreibt Testskripte ins Ticket | In UAT · Pipeline
Personen | Abnahmetest | Kunde testet, BA begleitet
Agent | Feedback-Triage | Bug, Change Request oder Klärung | Bug oder CR angelegt · Agent
tor: BA und Kunde entscheiden über Bugs und CRs
zurueck: Bugs zurück an 07, Change Requests als neue Story an 06
tor: Kunde gibt das Release frei | Freigegeben · Kunde
Pipeline | Release nach Produktion | Quick Deploy der validierten ID | Erledigt · Pipeline
Agent | Release Notes und Handbuch | BA liest gegen
fazit: **Regel:** Der Agent hat keinen Zugang zur Produktion. Dorthin deployt nur die Pipeline.
```

Nach dem Merge deployt die Pipeline in die UAT-Sandbox, und der Agent schreibt Testskripte direkt aus den Akzeptanzkriterien ins Ticket. Der Kunde testet, der Business Analyst begleitet die Sessions. Jede Rückmeldung ordnet der Agent ein: **Bug**, wenn sie einem bestätigten Kriterium widerspricht, **Change Request**, wenn sie neu ist, **Klärungsbedarf**, wenn der Beleg fehlt. Business Analyst und Kunde bestätigen die Einordnung. Bugs gehen zurück in die Implementierung, Change Requests werden als neue Story bewertet, auch kommerziell. Scope Creep wird damit sichtbar, mit Beleg statt Bauchgefühl. Wie ein Abnahmetest mit dem Fachbereich aufgebaut ist, steht in [Salesforce-UAT mit dem Fachbereich](../salesforce-uat-abnahmetest-fachbereich/).

Nach der Freigabe rollt die Pipeline die bereits validierte Deployment-ID per Quick Deploy aus. Der Agent schreibt Release Notes und eine Anwenderhilfe in der Sprache des Fachbereichs, der Business Analyst liest gegen.

## Wer entscheidet in diesem Prozess was?

Agent und Pipeline entscheiden nichts Verbindliches. Jede Entscheidung, die Scope, Qualität oder Produktion betrifft, trifft eine Person mit Namen.

```tabelle
titel: Wer in welcher Phase entscheidet
spalten: | Discovery | Bauen | Release
Kunde | Erzählt und bestätigt das Protokoll * | Beantwortet Rückfragen | Testet und gibt das Release frei *
Business Analyst | Moderiert, kuratiert und gibt die Spec frei * | Klärt Fachfragen | Begleitet den Test, entscheidet über CRs *
Architekt | Setzt Leitplanken und gibt die Spec frei * | Pflegt die Regeldatei | Achtet auf Datenmodell und Sharing
Entwickler | Prüft den Prototyp | Gibt Pläne frei, reviewt und merged * | Übernimmt bei Eskalation
Agent | Analysiert, protokolliert, entwirft | Baut Code und Tests | Testskripte, Triage, Release Notes
Pipeline | Noch nicht beteiligt | Validiert, setzt den Jira-Status | Deployt, setzt den Jira-Status
marke: Tor
fazit: Markiert sind die Entscheidungen an den fünf Toren. Alles andere ist Vorarbeit dafür.
```

Für die Rollen ändert sich mehr als die Werkzeuge. Der Business Analyst schreibt weniger und entscheidet mehr; seine Kernkompetenz wird, Widersprüche zwischen Gesagtem und Gemeintem zu erkennen. Der Architekt wird zum Hüter der Regeldatei, der Markdown-Datei im Repository mit Trigger-Framework, Namenskonventionen, Sharing-Regeln und Verboten, die der Agent zu Beginn jeder Sitzung liest. Sie ist der größte Hebel für die Qualität aller Agenten-Ergebnisse, siehe [KI-Regeldatei im Salesforce-Repository](../ki-regeldatei-salesforce-repository/). Der Kunde braucht mehr Disziplin bei Bestätigungen, sonst kippt die Geschwindigkeit in Chaos.

## Ein Beispiel: vom Satz im Workshop zur Release Note

Ein Szenario als Annahme, um die Kette zu zeigen. Im Discovery-Workshop eines Maschinenbauers sagt der Vertriebsleiter bei Minute 14: „Eine Opportunity unter 10.000 Euro schließen wir nicht ab.“

- Der Agent macht daraus im Protokoll die Anforderung „Opportunity erst ab 10.000 Euro schließen“, mit Verweis auf 00:14:52, und eine Story mit diesem Akzeptanzkriterium.
- Im Refinement am Prototyp fällt dem Vertriebsleiter auf, dass verlorene Opportunities auch unter 10.000 Euro geschlossen werden müssen. Der Agent zeigt das als Diff zur Story: Die Regel gilt nur für „Closed Won“. Business Analyst und Architekt geben frei.
- Der Agent baut eine Validierungsregel auf der Opportunity, schreibt den Test für 9.999 und 10.000 Euro und verlinkt das Ticket im Commit. Der Entwickler reviewt, die Pipeline validiert und setzt das Ticket auf „In UAT“.
- Im Abnahmetest meldet eine Vertriebsmitarbeiterin, dass kleine Ersatzteilaufträge trotzdem als gewonnen gelten sollen. Der Agent ordnet das als Change Request ein, weil kein bestätigtes Kriterium eine Ausnahme vorsieht.
- Die Release Note nennt die neue Mindestsumme für gewonnene Opportunities.

Fragt ein Jahr später jemand, warum die Regel bei 10.000 Euro greift, führt die Kette in zwei Klicks zur Aussage im Workshop.

```kette
titel: Rückverfolgung: vom Satz im Workshop zur Release Note
Satz im Transkript | 00:14:52: „Eine Opportunity unter 10.000 Euro schließen wir nicht ab.“
Anforderung | Opportunity erst ab 10.000 Euro schließen
Story | Gilt nur für Closed Won, ergänzt im Refinement am Prototyp
Commit | Validierungsregel: Closed Won mit `Amount < 10000` wird abgelehnt
Test | 9.999 Euro wird abgelehnt, 10.000 Euro geht durch
Release Note | Gewonnene Opportunities brauchen mindestens 10.000 Euro
fazit: Jedes Glied verweist auf das vorige. So bleibt jede Zeile Code belegbar.
```

## Welche Werkzeuge brauchen Sie dafür?

Der Prozess hängt an keinem bestimmten Coding-Agenten. Er braucht vier Verbindungen, Stand Oktober 2026:

- **Jira als gemeinsames Ticketsystem.** Agent und Pipeline laufen nicht in Jira, sie lesen und schreiben nur dieselben Tickets. Der Agent läuft beim Entwickler und greift über den Atlassian Rovo MCP Server auf Jira zu; laut [Atlassian](https://www.atlassian.com/blog/jira/mcp-enhancements) liest er dort auch das Development-Panel mit verknüpften Branches, Pull Requests und Commits. Die Pipeline läuft auf der Git-Plattform und setzt den Ticketstatus nach jedem Lauf selbst, damit niemand ihn von Hand pflegt.
- **Zugriff auf die Sandboxes.** Über die Salesforce CLI mit den Skills aus [sf-skills](https://github.com/forcedotcom/sf-skills), das [Claude-Code-Plugin von Salesforce](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) oder Hosted MCP Server. Der lokale Salesforce DX MCP Server erreicht laut README am 2. November 2026 sein End of Life; was das für Ihre Partner heißt, steht in [Salesforce DX MCP Server: Ende am 2. November 2026](../salesforce-dx-mcp-server-ende/). Der Agent erreicht jede Org, an der die Salesforce CLI auf seinem Rechner angemeldet ist. Dort sind deshalb nur feste Sandbox-Aliase angemeldet, nie die Produktion.
- **Eine Git-Pipeline**, die ohne KI validiert und deployt, mit Produktionszugang nur für die Pipeline. Wie ich sie aufsetze, beschreibe ich unter [DevOps und Release Management](../../leistungen/devops-und-release-management/).
- **Transkription im Tenant des Kunden**, etwa über die Aufzeichnung in Teams. Einwilligung und Betriebsrat behandle ich in [KI-Coding, Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/).

## Wo stolpert der Prozess?

**Im Discovery-Teil:**

- **Ein Transkript ist keine Wahrheit.** Ein Satz im Meeting ist keine Entscheidung. Der Agent erzeugt daraus nie verbindliche Stories ohne Prüfung durch den Business Analyst.
- **Kunden ohne Aufzeichnung.** Dann diktiert der Business Analyst direkt nach dem Termin eine Zusammenfassung, die denselben Weg geht.
- **Aufbewahrung.** Transkripte nach der Abnahme löschen oder auf die bestätigten Protokolle reduzieren.

**In der Salesforce-Strecke:**

- **Klickentwicklung.** Admins bauen Flows und Layouts weiter in Sandboxes. Der Prozess braucht einen Schritt, in dem der Agent solche Änderungen abruft und committet, sonst driftet Git von der Org weg.
- **Profile, Permission Sets, Destructive Changes.** Die klassischen Deploy-Fallen gehören als ausdrückliche Regeln in die Regeldatei.
- **Konfigurationsdaten.** CPQ- und Field-Service-Setups oder Custom Settings sind kein Metadaten-Deploy und brauchen eine eigene Strecke.

## Wo sollten Sie anfangen?

Fangen Sie mit dem Tor an, das am meisten spart: der Spec-Freigabe. Erst wenn diese Strecke stabil läuft, lohnt sich der Rest.

```schritte
Spec-Freigabe | ein Stream · BA und Architekt
  Stories so schreiben, dass ein Agent sie ohne Rückfrage umsetzen kann.
Messen | im Code-Review · Entwickler
  Zählen, wie oft der Entwickler trotzdem nachfragen muss.
Absichern | parallel
  Aufzeichnung und Tenant klären, jeden Produktionszugang außer dem der Pipeline sperren.
Ausbauen | wenn es stabil läuft
  Prototyp und Feedback-Triage dazunehmen.
```

Ein KI-nativer Delivery-Prozess wird schnell, weil Personen an wenigen Toren entscheiden und alles dazwischen belegbar bleibt.
