---
title: "KI-nativer Delivery-Prozess für Salesforce in 14 Schritten"
description: "KI-nativer Delivery-Prozess für Salesforce vom Workshop bis zur Produktion: was der Agent macht, wo Personen an fünf Toren entscheiden, was die Pipeline prüft."
pubDate: 2026-10-30
updatedDate: 2026-11-09
lang: de
slug: ki-native-salesforce-delivery-prozess
translationKey: ai-native-delivery-process
topic: devops
categories: [devops, ai]
tags: [KI-native Delivery, Coding-Agenten, Jira, DevOps, Anforderungsmanagement, Maschinenbau]
takeaways:
  - "Ein Agent macht die Fleißarbeit vom Workshop-Protokoll bis zum Pull Request, Personen entscheiden an fünf festen Toren."
  - "Jede deployte Änderung führt über Story, Commit und Test auf eine freigegebene Anforderung zurück, am besten auf eine Entscheidung im bestätigten Protokoll."
  - "Das wichtigste Tor ist die Spec-Freigabe „Ready for Agent“ durch Business Analyst und Architekt, weil ein Fehler dort am billigsten zu korrigieren ist."
  - "Die Pipeline bleibt deterministisch und prüft vor dem Merge. Nur ihre eigene Identität erreicht die Produktion; der Agent hat keine Produktionszugänge."
  - "Rückmeldungen aus dem Abnahmetest ordnet der Agent mit Beleg aus dem Protokoll als Bug, Change Request oder Klärungsbedarf ein."
faq:
  - q: "Was ist der Unterschied zwischen KI-gestützter und KI-nativer Salesforce-Delivery?"
    a: "KI-gestützt heißt, einzelne Tätigkeiten im bestehenden Prozess erhalten KI-Hilfe. KI-nativ heißt, Übergaben an Agenten, maschinenlesbare Spezifikationen, Berechtigungen und Tore gehören von Anfang an zum Prozessdesign: Der Agent analysiert, protokolliert, entwirft und programmiert, Personen kuratieren und entscheiden an festen Toren."
  - q: "Darf ein KI-Agent in die Produktion deployen?"
    a: "Nein. Validierung gegen Produktion und Deployment laufen nur über die Pipeline mit eigener technischer Identität: Sie validiert das Release-Artefakt gegen Produktion und rollt genau diese Validierungs-ID innerhalb von zehn Tagen per Quick Deploy aus. Der Agent arbeitet in Scratch Orgs und Sandboxes und hat keine Produktionszugänge auf seinem Rechner."
  - q: "Dürfen Workshops mit dem Kunden aufgezeichnet werden?"
    a: "Nur nach rechtlicher und datenschutzrechtlicher Prüfung. Alle müssen informiert sein, unbefugte Aufnahmen des nichtöffentlich gesprochenen Worts können strafbar sein, und der Betriebsrat kann mitbestimmen. Zweck, Aufbewahrung und wo Transkript und Agent die Daten verarbeiten, müssen vorher feststehen. Will der Kunde keine Aufzeichnung, diktiert der Business Analyst direkt nach dem Termin eine Zusammenfassung, die denselben Weg geht."
  - q: "Wer verantwortet die Qualität der Agenten-Ergebnisse?"
    a: "Fachlich der Business Analyst, technisch der Architekt über die Regeldatei im Repository, beim Code der Entwickler, der jeden Pull Request reviewt. Der Agent entwirft und löst umkehrbare automatische Schritte aus, aber jede verbindliche Entscheidung braucht eine Person mit Namen."
draft: false
---

Ein KI-nativer Delivery-Prozess für Salesforce macht das Jira-Ticket zur ausführbaren Spezifikation. Ein Agent erledigt die Fleißarbeit von der Workshop-Vorbereitung bis zum Pull Request, die Pipeline prüft deterministisch, und Personen entscheiden an fünf festen Toren: Protokoll, Spec, Code-Review, Bugs und Change Requests, Release. Der Prozess hat 14 Schritte von der ersten Anforderung bis zur Produktion. Er hält eine Kette zusammen, die klassische Projekte selten schaffen: Jede deployte Änderung führt auf eine freigegebene Anforderung zurück, am besten auf eine Entscheidung, die jemand beim Kunden bestätigt hat. Für Hersteller ändert sich vor allem eines: Der Fachbereich sieht viel früher etwas Lauffähiges und muss dafür schneller bestätigen.

## Was heißt KI-nativ in einem Salesforce-Projekt?

KI-native Delivery bedeutet, den Lieferprozess um den Agenten herum zu bauen, statt dem alten Prozess einen Coding-Assistenten hinzuzufügen. Wie sich dadurch die Teamaufstellung ändert, habe ich in [KI-native Delivery: kleinere Salesforce-Teams](../ki-kleinere-salesforce-teams-delivery/) beschrieben. Hier geht es um den Ablauf selbst. Er ist mein Zielbild: Einzelne Schritte nutze ich schon, durchgängig vom Workshop bis zur Produktion setze ich ihn im nächsten Projekt auf, und ein paar Lücken sind noch zu schließen. Er beruht auf vier Ideen:

```saeulen
dach: KI-native Delivery
contract | Ticket | ist die Spezifikation | Ein Agent setzt eine Story nur so gut um, wie ihre Akzeptanzkriterien geschrieben sind.
ai | Agent | macht die Fleißarbeit | Org-Analyse, Protokoll, Stories, Prototyp, Code, Tests und Release Notes entwirft der Agent.
pipeline | Pipeline | prüft deterministisch | Sie validiert und deployt, ohne dass irgendwo ein Modell entscheidet.
team | Personen | entscheiden an Toren | Sie führen jedes Gespräch mit dem Kunden selbst, der Agent nimmt an keinem Termin teil.
basis: Ein Prozess, um den Agenten herum gebaut
```

Der Unterschied zur KI-gestützten Delivery besteht darin, dass einzelne Tätigkeiten im bestehenden Prozess KI-Hilfe erhalten. Hier sind Übergaben an Agenten, maschinenlesbare Spezifikationen, Berechtigungen und Tore von Anfang an eingeplant. Der Agent liefert Protokoll, Stories und einen Prototyp, und jede Rückmeldung wird gegen das bestätigte Protokoll eingeordnet.

## Wie läuft der Prozess vom Workshop bis zur Produktion?

Der Prozess hat drei Phasen mit zusammen 14 Schritten. Jede Grafik zeigt eine Phase in drei Spuren: was Personen im Gespräch tun, was der Agent erledigt und was die Pipeline prüft. Die dunklen Balken sind die Tore, an denen eine Person verbindlich entscheidet. Die blaue Spalte rechts zeigt den Status des Jira-Tickets und wer ihn setzt: Der Agent legt Stories direkt in Jira an, die Pipeline schaltet den Status nach Validierung und Deployment selbst weiter. Beide nutzen eigene Bot-Identitäten mit nur den nötigen Übergängen.

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

Vor dem Workshop analysiert der Agent die bestehende Org: Objekte, Flows, Validierungsregeln, Berechtigungen. Daraus entwirft er eine Agenda, Hypothesen und gezielte Fragen, etwa: „Auf der Opportunity laufen drei Flows, die sich überschneiden. Wer ist dafür fachlich zuständig?“ Der Business Analyst schärft die Agenda und streicht Hypothesen, die politisch heikel sind. Wie eine solche Org-Analyse aussieht, steht in [KI-Org-Analyse: technische Schulden finden](../ki-org-analyse-technische-schulden/).

Im Workshop moderiert der Business Analyst und muss nicht mitschreiben. Aus dem Transkript erzeugt der Agent ein Protokoll mit Entscheidungen, offenen Fragen und Verantwortlichen sowie Entwürfe für Epics und Stories in Jira, jeweils mit Zeitstempel. Er trennt hart zwischen „Kunde hat gesagt“ und „Agent interpretiert“. Der Business Analyst kuratiert das Ergebnis: Er streicht, schärft, ergänzt den Fit-Gap (Standard, Konfiguration oder Code) und korrigiert falsch erkannte Fachbegriffe und verwechselte Sprecher.

Mit dem bestätigten Protokoll stehen die vereinbarten Anforderungen fest; die Scope-Baseline entsteht erst mit der Spec-Freigabe. Für abgegrenzte Konfiguration baut der Agent oft in wenigen Stunden einen ersten Prototyp mit Objekten, Feldern, Layouts und einem einfachen Flow. Er entsteht in einer Scratch Org, einer kurzlebigen Test-Org, sofern Org-Definition, Pakete, Lizenzen und synthetische Daten schon bereitstehen. Im Refinement reagiert der Kunde auf etwas Echtes statt auf Papier. Danach schreibt der Agent die Stories nicht neu, sondern liefert einen Diff gegen die bestehenden: „Akzeptanzkriterium 2 geändert, weil der Kunde bei 00:41:07 sagte …“, ergänzt um betroffene Metadaten, Testfälle und Impact gegen den Stand im Repository.

### Bauen: der Agent programmiert, der Entwickler reviewt

```prozess
titel: Phase 2 von 3 · Bauen
spuren: Personen | Agent | Pipeline
ticket: Jira
start: 7 | 3
Agent | Implementierung | Plan, Freigabe, Code und Tests | In Arbeit · Agent
Agent | Pull Request | Beschreibung, Jira-Link, KI-Review | In Review · Agent
Pipeline | CI-Validierung | Check-Deploy, Tests, Analyzer vor Merge | Validiert · Pipeline
zurueck: Fehler: Agent liest das Log und fixt, höchstens 2 Versuche
tor: Entwickler reviewt und merged
```

Erst wenn Business Analyst und Architekt eine Story auf „Ready for Agent“ setzen, beginnt die Umsetzung. Der Agent liest das Ticket, legt einen Feature-Branch an, schreibt einen Umsetzungsplan und setzt ihn erst nach Freigabe durch den Entwickler um: Apex, Lightning Web Components oder Flow, jeweils mit Tests. Bei unklaren Anforderungen liest er die verlinkte Stelle im Transkript, statt zu raten. Er schreibt die Beschreibung des Pull Requests mit Ticket-Link und Komponentenliste, ein KI-Reviewer kommentiert vorab.

Vor jedem Merge läuft die Pipeline als Pflichtprüfung am Pull Request. Sie erstellt ein Delta-Paket, etwa mit dem Drittanbieter-Werkzeug `sfdx-git-delta` in fester Version und mit vollständigem Deployment als Fallback, führt ein Check-only-Deploy gegen die Integrations-Sandbox aus, startet definierte Tests und prüft ein Gate mit Code Analyzer v5, dessen Regeln und Schwellen versioniert im Repository liegen. Schlägt sie fehl, erhält der Agent das Log und darf einen Fix-Commit liefern, höchstens zwei Versuche. Danach übernimmt der Entwickler.

Gemergt wird nur mit grüner Pipeline und nach dem Review durch einen Entwickler. Der Entwickler reviewt in diesem Prozess mehr, als er schreibt. Warum ich auf dieses Tor nie verzichte, steht in [Warum Pull-Request-Reviews Pflicht sind](../warum-pull-request-reviews-pflicht-sind/).

Welche Prüfungen ich für KI-Code in die Pipeline setze, beschreibe ich in [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/).

### Release: der Kunde testet, der Agent ordnet ein

```prozess
titel: Phase 3 von 3 · Release
spuren: Personen | Agent | Pipeline
ticket: Jira
start: 10 | 4
Pipeline | Deploy nach UAT | Freigegebene Testskripte im Ticket | In UAT · Pipeline
Personen | Abnahmetest | Kunde testet, BA begleitet
Agent | Feedback-Triage | Bug, Change Request oder Klärung | Bug oder CR angelegt · Agent
tor: BA und Kunde entscheiden über Bugs und CRs
zurueck: Bugs zurück an 07, Change Requests als neue Story an 06
Agent | Release Notes und Anwenderhilfe | Entwürfe, BA prüft
tor: Kunde gibt das Release frei | Freigegeben · Kunde
Pipeline | Release nach Produktion | In Produktion validieren, Quick Deploy | Erledigt · Pipeline
fazit: **Regel:** Der Agent hat keinen Zugang zur Produktion. Dorthin deployt nur die Pipeline.
```

Nach dem Merge deployt die Pipeline in die UAT-Sandbox. Die Testskripte mit Negativfällen, Rollenrechten und Regression hat der Agent aus den Akzeptanzkriterien entworfen; freigegeben wurden sie vor diesem Deployment. Der Kunde testet, der Business Analyst begleitet die Sessions. Jede Rückmeldung ordnet der Agent ein: **Bug**, wenn sie einem bestätigten Kriterium widerspricht, **Change Request**, wenn sie neu ist, **Klärungsbedarf**, wenn der Beleg fehlt. Business Analyst und Kunde bestätigen die Einordnung. Bugs gehen zurück in die Implementierung, Change Requests werden als neue Story bewertet, auch kommerziell. Scope Creep wird damit sichtbar, mit Beleg statt Bauchgefühl. Wie ein Abnahmetest mit dem Fachbereich aufgebaut ist, steht in [Salesforce-UAT mit dem Fachbereich](../salesforce-uat-abnahmetest-fachbereich/).

Vor der Release-Entscheidung entwirft der Agent Release Notes und eine Anwenderhilfe in der Sprache des Fachbereichs, die der Business Analyst gegenliest. Nach der Freigabe validiert die Pipeline das unveränderte Release-Artefakt gegen Produktion, mit den dort nötigen Tests, und rollt genau diese Validierungs-ID innerhalb von zehn Tagen per Quick Deploy aus. Eine Validierung gegen eine Sandbox lässt sich für Produktion nicht wiederverwenden.

## Verbindlich entscheiden nur Personen mit Namen

Agent und Pipeline liefern Entwürfe und lösen automatische, umkehrbare Schritte aus, etwa einen Jira-Status. Jede verbindliche Entscheidung, die Scope, Qualität oder Produktion betrifft, trifft eine Person mit Namen.

```tabelle
titel: Wer in welcher Phase entscheidet
spalten: | Discovery | Bauen | Release
Kunde | Erzählt und bestätigt das Protokoll * | Beantwortet Rückfragen | Testet und gibt das Release frei *
Business Analyst | Moderiert, kuratiert und gibt die Spec frei * | Klärt Fachfragen | Begleitet den Test, entscheidet über CRs *
Architekt | Setzt Leitplanken und gibt die Spec frei * | Pflegt die Regeldatei | Achtet auf Datenmodell und Sharing
Entwickler | Prüft den Prototyp | Gibt Pläne frei, reviewt und merged * | Übernimmt bei Eskalation
Agent | Analysiert, protokolliert, entwirft | Baut Code und Tests | Entwirft Testskripte, ordnet Rückmeldungen ein, schreibt Release Notes
Pipeline | Noch nicht beteiligt | Validiert, setzt den Jira-Status | Deployt, setzt den Jira-Status
marke: Tor
fazit: Markiert sind die Entscheidungen an den fünf Toren. Alles andere ist Vorarbeit dafür.
```

Für die Rollen ändert sich mehr als die Werkzeuge. Der Business Analyst schreibt weniger und entscheidet mehr; seine wichtigste Fähigkeit wird es, Widersprüche zwischen Gesagtem und Gemeintem zu erkennen. Der Architekt wird zum Hüter der Regeldatei, also der Markdown-Datei im Repository mit Trigger-Framework, Namenskonventionen, Sharing-Regeln und Verboten, die der Agent zu Beginn jeder Sitzung liest. Sie ist der größte Hebel für die Qualität aller Agenten-Ergebnisse, siehe [KI-Regeldatei im Salesforce-Repository](../ki-regeldatei-salesforce-repository/). Der Kunde braucht mehr Disziplin bei Bestätigungen, sonst wird aus Geschwindigkeit Chaos.

## Ein Beispiel: vom Satz im Workshop zur Release Note

Ein angenommenes Beispiel zeigt die Kette. Im Discovery-Workshop eines Maschinenbauers sagt der Vertriebsleiter bei Minute 14: „Eine Opportunity unter 10.000 Euro schließen wir nicht ab.“

- Der Agent macht daraus im Protokoll die Anforderung „Opportunity erst ab 10.000 Euro schließen“, mit Verweis auf 00:14:52, und eine Story mit diesem Akzeptanzkriterium.
- Im Refinement am Prototyp fällt dem Vertriebsleiter auf, dass verlorene Opportunities auch unter 10.000 Euro geschlossen werden müssen. Der Agent zeigt das als Diff zur Story: Die Regel gilt nur für „Closed Won“. Business Analyst und Architekt geben frei.
- Der Agent baut eine Validierungsregel für die Opportunity, schreibt Tests für 9.999 und 10.000 Euro und verlinkt das Ticket im Commit. Der Entwickler reviewt, die Pipeline validiert und setzt das Ticket auf „In UAT“.
- Im Abnahmetest meldet eine Vertriebsmitarbeiterin, dass kleine Ersatzteilaufträge trotzdem als gewonnen gelten sollen. Der Agent ordnet das als Change Request ein, weil kein bestätigtes Kriterium eine Ausnahme vorsieht.
- Die Release Note nennt die neue Mindestsumme für gewonnene Opportunities.

Fragt ein Jahr später jemand, warum die Regel bei 10.000 Euro greift, lässt sich die Kette in zwei Klicks bis zur bestätigten Entscheidung zurückverfolgen. Das funktioniert nur, wenn das bestätigte Protokoll mit festen Entscheidungs-IDs als Nachweis aufbewahrt wird, auch wenn das Rohtranskript gelöscht ist.

```kette
titel: Rückverfolgung: vom Satz im Workshop zur Release Note
Satz im Transkript | 00:14:52: „Eine Opportunity unter 10.000 Euro schließen wir nicht ab.“
Anforderung | Opportunity erst ab 10.000 Euro schließen
Story | Gilt nur für Closed Won, ergänzt im Refinement am Prototyp
Commit | Validierungsregel: Closed Won mit `Amount < 10000` wird abgelehnt
Test | 9.999 Euro wird abgelehnt, 10.000 Euro geht durch
Release Note | Gewonnene Opportunities brauchen mindestens 10.000 Euro
fazit: Jedes Glied verweist auf das vorige. So bleibt jede deployte Änderung belegbar.
```

## Welche Werkzeuge brauchen Sie dafür?

Der Prozess hängt an keinem bestimmten Coding-Agenten. Er braucht vier Verbindungen, Stand Oktober 2026:

- **Jira als gemeinsames Ticketsystem.** Agent und Pipeline laufen nicht in Jira, sie lesen und schreiben nur dieselben Tickets. Der Agent läuft auf dem Rechner des Entwicklers und greift über den Atlassian Rovo MCP Server auf Jira zu; laut [Atlassian](https://www.atlassian.com/blog/jira/mcp-enhancements) liest er dort auch das Development-Panel mit verknüpften Branches, Pull Requests und Commits. Die Pipeline läuft auf der Git-Plattform und setzt den Ticketstatus nach jedem Lauf selbst, damit niemand ihn von Hand pflegt.
- **Zugriff auf die Sandboxes.** Skills aus [sf-skills](https://github.com/forcedotcom/sf-skills) liefern Anweisungen, die Salesforce CLI führt Org-Aktionen aus, und das [Claude-Code-Plugin von Salesforce](https://developer.salesforce.com/blogs/2026/08/headless-development-with-skills-and-a-claude-code-plugin) ergänzt MCP-Server, die Kontext liefern. Der lokale Salesforce DX MCP Server hat am 2. November 2026 sein End of Life erreicht; was das für Ihre Partner heißt, steht in [Salesforce DX MCP Server: Ende am 2. November 2026](../salesforce-dx-mcp-server-ende/). Der Agent erreicht jede Org, deren Zugangsdaten die CLI auf seinem Rechner gespeichert hat. Ein Sandbox-Alias ist keine Sicherheitsgrenze, deshalb läuft der Agent unter eigener Identität ohne Produktionszugangsdaten, mit begrenzten Befehlen und Protokollierung.
- **Eine Git-Pipeline**, die ohne KI validiert und deployt, mit Produktionszugang nur für die Identität der Pipeline. Wie ich sie aufsetze, beschreibe ich unter [DevOps und Release Management](../../leistungen/devops-und-release-management/).
- **Transkription im Tenant des Kunden**, etwa über die Aufzeichnung in Teams, die beim Organisator gespeichert wird; deshalb sollte ein Mitarbeiter des Kunden zum Termin einladen. Diese Lösung regelt nur die Ablage: Der Modellanbieter, der das Transkript liest, braucht ebenfalls einen Auftragsverarbeitungsvertrag, eine festgelegte Verarbeitungsregion und den Ausschluss der Daten vom Training. Einwilligung und Betriebsrat behandle ich in [KI-Coding, Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/).

## Wo stolpert der Prozess?

**Im Discovery-Teil:**

- **Ein Transkript ist nicht die Wahrheit.** Ein Satz im Meeting ist keine Entscheidung. Der Agent erzeugt daraus nie verbindliche Stories ohne Prüfung durch den Business Analyst.
- **Kunden ohne Aufzeichnung.** Dann diktiert der Business Analyst direkt nach dem Termin eine Zusammenfassung, die denselben Weg geht.
- **Aufbewahrung.** Rohaufnahmen und Transkripte werden nach einer festen Frist gelöscht, die bestätigten Protokolle mit Entscheidungs-IDs und nötigen Auszügen versioniert aufbewahrt.

**In der Salesforce-Strecke:**

- **Klickentwicklung.** Admins bauen Flows und Layouts weiterhin in Sandboxes. Der Prozess braucht einen Schritt, in dem der Agent solche Änderungen abruft und committet, sonst weichen Git und Org voneinander ab.
- **Profile, Permission Sets, Destructive Changes.** Die klassischen Deploy-Fallen gehören als ausdrückliche Regeln in die Regeldatei.
- **Konfigurationsdaten.** Konfiguration, die nur als Datensätze existiert, etwa große Teile von CPQ oder Datensätze in Custom Settings, braucht eine eigene Datenstrecke. Bei Field Service ist ein Teil deploybare Metadaten und ein Teil Daten; entscheiden Sie deshalb pro Artefakttyp.

## Erster Schritt: die Spec-Freigabe

Fangen Sie mit dem Tor an, das am meisten Aufwand spart: der Spec-Freigabe. Erst wenn diese Strecke stabil läuft, lohnt sich der Rest.

```schritte
Spec-Freigabe | ein Stream · BA und Architekt
  Stories so schreiben, dass ein Agent sie ohne Rückfrage umsetzen kann.
Messen | im Code-Review · Entwickler
  Zählen, wie oft der Entwickler trotzdem nachfragen muss.
Absichern | parallel
  Aufzeichnung, Tenant und Verarbeitung im Modell klären, jeden Produktionszugang außer dem der Pipeline entfernen.
Ausbauen | wenn es stabil läuft
  Prototyp und Feedback-Triage dazunehmen.
```
