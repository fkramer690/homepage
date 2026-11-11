---
title: "KI-Coding-Kosten im Salesforce-Projekt: wer zahlt?"
description: "Was KI-Coding mit Claude Code, Codex, Copilot oder Agentforce Vibes im Salesforce-Projekt kostet, wie die Token-Rechnung funktioniert und wer zahlen sollte."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: ki-coding-kosten-salesforce-projekt
translationKey: ai-coding-costs-salesforce-project
topic: devops
categories: [devops, ai]
tags: [KI-Coding, Claude Code, GitHub Copilot, Agentforce Vibes, Partnersteuerung, Kosten]
takeaways:
  - "Anthropic nennt für Claude Code rund 13 $ pro Entwickler und aktivem Arbeitstag; Caching macht wiederholten Kontext billig, teuer sind Output und Thinking."
  - "Im Rechenbeispiel kosten KI-Werkzeuge für ein Partnerteam mit acht Personen etwa 650 $ bis 1.500 $ im Monat, also rund ein Prozent der monatlichen Teamkosten."
  - "Agentforce Vibes nutzt im Verbrauchsmodell dieselben Flex Credits wie Ihre Agenten in Produktion; Opus kostet 16 Credits pro 2.000 Tokens."
  - "Meine bevorzugte Aufteilung: Bei Abrechnung nach Aufwand besitzt der Kunde die Accounts und zahlt die Tokens, beim Festpreis zahlt der Partner."
faq:
  - q: "Was kostet Claude Code pro Entwickler und Monat?"
    a: "Anthropic nennt für Unternehmenseinsätze zu API-Preisen im Schnitt rund 13 $ pro Entwickler und aktivem Tag und 150 $ bis 250 $ pro Monat. Ein Premium-Seat im Claude-Team-Plan kostet 125 $ im Monat, bei Jahreszahlung 100 $, mit Nutzungskontingent statt Token-Rechnung."
  - q: "Ist GitHub Copilot für Salesforce-Arbeit günstiger als Claude Code?"
    a: "Der Seat ist günstiger: Copilot Business kostet 19 $ pro Nutzer und Monat und enthält 1.900 AI Credits, also 19 $ Modellnutzung. Agenten-Sessions verbrauchen Credits zum Token-Preis des Modells; wenn die gepoolten Credits aufgebraucht sind, kostet jeder weitere Credit 0,01 $. Bei intensiver Agentennutzung schrumpft der Abstand."
  - q: "Wer sollte KI-Coding-Werkzeuge bezahlen, Kunde oder Umsetzungspartner?"
    a: "Meine Empfehlung folgt dem Vertragsmodell. Bei Abrechnung nach Aufwand profitiert der Kunde vom Produktivitätsgewinn nur durch weniger abgerechnete Tage, also sollte er die Accounts besitzen und zahlen. Beim Festpreis behält der Partner den Gewinn und trägt die Token-Kosten, auch wenn der Kunde die Accounts aus Sicherheitsgründen trotzdem selbst verwalten kann."
  - q: "Verbraucht Agentforce Vibes meine Agentforce Flex Credits?"
    a: "Im Verbrauchsmodell ja. Laut Salesforce nutzt es dieselben Credits wie Agentforce, gezählt in Einheiten zu 2.000 Tokens. Das Unmetered-Add-on für 125 € pro Nutzer und Monat deckt GPT-5 als enthaltenes Modell und Claude Sonnet 4.6 als Premium-Modell bis 2.500 Requests oder 36 Mio. Tokens pro 30 Tage ab. Opus gibt es nur im Verbrauchsmodell."
  - q: "Warum ist Prompt-Caching für KI-Coding-Kosten so wichtig?"
    a: "Ein Coding-Agent schickt bei jedem Schritt das ganze Gespräch erneut. Bei Claude Opus 5.5 und Sonnet 5.5 kostet ein Cache-Treffer 5 Prozent des normalen Input-Preises; im Rechenbeispiel wird aus einer Session für rund 9,80 $ eine für rund 2,20 $."
draft: false
---

KI-Coding kostet im Salesforce-Projekt weniger, als die meisten Budgetdiskussionen annehmen. Seats beginnen bei 19 $ pro Entwickler und Monat, und Anthropic und OpenAI nennen für typische Agentennutzung rund 100 $ bis 250 $ pro Entwickler und Monat; intensive Nutzung nach Verbrauch kann darüber liegen. In meinem Rechenbeispiel belaufen sich die Kosten für ein Partnerteam mit acht Personen auf rund 650 $ bis 1.500 $ im Monat, etwa ein Prozent der monatlichen Teamkosten. Schwieriger ist die Frage, wem die Accounts gehören und wer das Verbrauchsrisiko trägt. Meine bevorzugte Aufteilung: Bei Abrechnung nach Aufwand zahlt der Kunde, beim Festpreis der Partner.

## Was kostet KI-Coding pro Entwickler und Monat?

Die Produkte kombinieren Seats, enthaltene Kontingente und Abrechnung nach Verbrauch unterschiedlich, und Nutzung über dem Kontingent ist nicht immer automatisch freigeschaltet. Hier sind die Listenpreise vom 27. Oktober 2026, geprüft am 9. November 2026; außer bei Salesforce sind es US-Listenpreise in USD:

- **Claude Code zu API-Preisen.** Anthropic [nennt](https://code.claude.com/docs/en/costs) für Unternehmenseinsätze rund 13 $ pro Entwickler und aktivem Tag und 150 $ bis 250 $ pro Monat; 90 Prozent der Nutzer bleiben unter 30 $ pro aktivem Tag.
- **Claude Team und Enterprise.** Laut [Preisseite von Anthropic](https://claude.com/pricing) kostet ein Team-Standard-Seat 25 $ im Monat, bei jährlicher Abrechnung 20 $, Premium 125 $, bei jährlicher Abrechnung 100 $, Enterprise 20 $ pro Seat plus Nutzung zu API-Preisen. Die Nutzung wird auf ein Kontingent angerechnet, das sich in einem Fünf-Stunden- und einem Wochenfenster erneuert. Wie vielen Tokens das entspricht, veröffentlicht Anthropic nicht.
- **OpenAI Codex.** Die [Codex Rate Card](https://help.openai.com/en/articles/20001106-codex-rate-card-2) nennt im Schnitt rund 100 $ bis 200 $ pro Entwickler und Monat. OpenAI führt Codex unter den Funktionen von [ChatGPT Business](https://openai.com/business/pricing/) zu 25 $ pro Standard-Seat und Monat, bei jährlicher Abrechnung 20 $.
- **GitHub Copilot.** Business kostet [19 $ pro Nutzer mit 1.900 AI Credits](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan), Enterprise 39 $ mit 3.900. Ein Credit kostet 0,01 $, die Credits werden [organisationsweit gepoolt](https://docs.github.com/de/copilot/concepts/billing/organizations-and-enterprises/usage-based-billing), Code-Vervollständigungen kosten keine Credits.
- **Agentforce Vibes.** Agentforce Vibes wird über Flex Credits oder über ein Unmetered-Add-on für 125 € pro Nutzer und Monat mit Grenzen abgerechnet, dazu unten mehr.

Der Seat-Preis sagt wenig über die Gesamtrechnung aus. GitHub rechnet Tokens zum Preis des jeweiligen Modells in Credits um; die 19 $ Inklusivnutzung reichen also nur für wenige der unten beschriebenen Agenten-Sessions.

## So wird aus Tokens eine Rechnung

Ein Token ist die Einheit, in der die Nutzung von Modellen abgerechnet wird, grob ein Wort- oder Codestück. Ein Coding-Agent arbeitet in einer Schleife: Er liest Dateien, führt einen Befehl aus und schickt alles zurück an das Modell. In einem Salesforce-Repository besteht dieser Kontext aus einer Regeldatei, Apex-Klassen, Metadaten-XML und Testausgaben. Drei Regeln auf der [Preisseite von Anthropic](https://platform.claude.com/docs/en/about-claude/pricing) bestimmen den Preis:

- **Caching.** Bereits gesendeter Kontext wird aus dem Prompt-Cache geladen. Bei Claude Opus 5.5 kostet ein Cache-Treffer 0,20 $ pro Million Tokens statt 4 $, also 5 Prozent des Input-Preises. Das Schreiben in den Fünf-Minuten-Cache kostet das 1,25-Fache.
- **Output und Thinking.** Output kostet bei Opus 5.5 20 $ pro Million Tokens, das Fünffache des Inputs. Thinking-Tokens zählen als Output und lassen sich bei Opus 5.5 und Sonnet 5.5 [nicht abschalten](https://code.claude.com/docs/en/costs).
- **Modellwahl.** Sonnet 5.5 kostet die Hälfte: 2 $ Input, 10 $ Output, 0,10 $ Cache-Treffer pro Million Tokens.

### Rechenbeispiel: eine Agenten-Session

Angenommen, ein Entwickler beauftragt den Agenten, einen Trigger-Handler für Garantieanträge samt Tests zu erstellen. Die Session umfasst 30 Modellaufrufe, der Kontext wächst von 25.000 auf rund 115.000 Tokens, und jeder Aufruf liefert 2.000 Output-Tokens inklusive Thinking. Alle Zahlen sind Annahmen.

- Cache-Writes: 115.000 Tokens zu 5 $ pro Million = 0,58 $
- Cache-Reads: 30 Aufrufe mit je rund 68.000 Tokens, 2,04 Mio. zu 0,20 $ pro Million = 0,41 $
- Output: 60.000 Tokens zu 20 $ pro Million = 1,20 $

```kennzahlen
2,20 $ | Session mit Opus 5.5 und Caching
1,10 $ | dieselbe Session mit Sonnet 5.5
9,80 $ | dieselbe Session mit Opus 5.5 ohne Caching
quelle: eigene Rechnung mit den Listenpreisen der Preisseite von Anthropic, Stand 27.10.2026
```

Ohne Caching kosten allein die 2,16 Mio. Input-Tokens 8,62 $. Auf den Output entfallen weniger als 3 Prozent der Tokens, aber mehr als die Hälfte der Kosten. Sechs solcher Sessions pro Arbeitstag führen zu Kosten von rund 13 $ und entsprechen damit Anthropics Durchschnitt.

Zwei Effekte erhöhen die Kosten: Claude ab 4.7 erzeugt für denselben Text rund 30 Prozent mehr Tokens, und Agent Teams verbrauchen im Plan-Modus etwa siebenmal so viele Tokens wie eine normale Session.

## Rechenbeispiel: ein Partnerteam mit acht Personen baut Serviceprozesse

Nehmen wir einen Maschinenbauer mit SAP, Service Cloud, Field Service für seine Servicetechniker und einem Händlerportal. Ein Nearshore-Partnerteam mit acht Personen baut das nächste Release: sechs Entwickler, die an 18 Tagen im Monat mit einem Coding-Agenten arbeiten, dazu ein Lead Consultant und eine Person aus der Projektleitung mit Chat-Seats. Alle Mengen sind Annahmen, die Preise sind die Listenpreise vom 27. Oktober 2026.

- **Claude Code zu API-Preisen:** 6 × 18 × 13 $ = 1.404 $, plus zwei Standard-Seats, rund 1.450 $ im Monat, ohne Obergrenze, solange niemand eine setzt.
- **Claude Team:** sechs Premium- und zwei Standard-Seats = 800 $ im Monat, 640 $ bei Jahreszahlung. Die Kosten sind planbar, aber wer sein Kontingent aufbraucht, wartet auf das nächste Fenster, außer der Admin hat Usage Credits freigeschaltet.
- **Codex in ChatGPT Business:** acht Business-Seats mit enthaltener Nutzung, dazu Workspace Credits für Entwickler, die ihr Kontingent aufbrauchen. OpenAIs Durchschnitt von 100 $ bis 200 $ pro Entwickler ergibt als grober Richtwert 600 $ bis 1.200 $ im Monat für die sechs Entwickler, ist aber kein Listenpreis.
- **Copilot Business:** acht Seats = 152 $ mit einem Pool von 15.200 Credits. Werden die Sessions auf Claude Opus 5.5 zu Anthropics Listenpreisen ausgeführt, reicht der Pool für rund 70 Sessions, also für zwei Arbeitstage bei sechs Sessions pro Entwickler und Tag. Danach wird jeder Credit berechnet, und die Monatskosten liegen bei rund 1.400 $.

Das sind Budgetszenarien, keine Preise für dieselbe Leistung: Die Kontingente hinter den Seats sind nicht in Tokens veröffentlicht. Wenn man einen Mischsatz von 800 $ pro Person und Tag in USD ansetzt, kostet das Team selbst 8 × 18 × 800 $ = 115.200 $ im Monat. KI-Coding erhöht die Kosten um etwa ein Prozent. McKinsey [schreibt](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle), dass die Ausgaben für Tokens, Rechenleistung, Infrastruktur und AI Ops auf bis zu 20 Prozent der bisherigen Personalkosten steigen können, wenn Agenten mehr Arbeit übernehmen. Die größeren Risiken sind aus meiner Sicht heute ein Verbrauchszähler ohne Limit und die offene Frage, wem der Produktivitätsgewinn gehört.

## Agentforce Vibes braucht eine eigene Rechnung

Agentforce Vibes ist der Coding-Agent von Salesforce. Zwei Punkte sind wichtig:

1. **Vibes im Verbrauchsmodell nutzt die Flex Credits Ihrer Agenten.** Laut [Preisseite von Vibes](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/) verbraucht es „the same credits used by Agentforce“. Ein Partnerteam auf Verbrauchsbasis verbraucht also Credits aus dem Pool, den Sie für einen Serviceagenten für Händleranfragen eingeplant haben, siehe [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).
2. **Eine Einheit umfasst 2.000 Tokens.** Die [Abrechnungsdokumentation](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html) zählt Input und Output in Einheiten zu 2.000 Tokens, aufgerundet. Opus-Modelle werden als Advanced Prompts abgerechnet, laut [Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) vom 3. November 2026 mit 16 Credits pro Einheit, also 0,08 €.

```hinweis offen
Ob erneut gesendeter Kontext voll zählt, sagt Salesforce nicht. Wenn ja, kostet ein einzelner Opus-Request mit 70.000 Tokens Kontext 560 Credits oder 2,80 €, also mehr als die oben berechnete gesamte Session. Ich würde das eine Woche im Digital Wallet messen, bevor im Verbrauchsmodell gearbeitet wird.
```

Das Unmetered-Add-on deckt GPT-5 als enthaltenes Modell und Claude Sonnet 4.6 als Premium-Modell bis 2.500 Requests oder 36 Mio. Tokens pro 30 Tage ab. Danach wird über Flex Credits abgerechnet, oder Sie wechseln auf das enthaltene Modell; Opus gibt es nur im Verbrauchsmodell. In der EU Operating Zone ist Vibes nicht verfügbar. Für Vibes spricht: Die Lizenz liegt in der Org des Kunden, und laut [FAQ](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html) bleiben die Daten innerhalb der Vertrauensgrenze von Salesforce. Damit sind Datenresidenz, Aufbewahrung und die Frage, welcher Quellcode verarbeitet werden darf, noch nicht geklärt; diese Punkte würde ich getrennt prüfen. Die Werkzeugwahl selbst behandle ich in [Agentforce Vibes, Claude Code oder Copilot](../agentforce-vibes-claude-code-copilot-vergleich/).

## Wer sollte KI-Coding bezahlen, Kunde oder Partner?

Meine bevorzugte Aufteilung folgt dem Vertragsmodell. Bei Abrechnung nach Aufwand bezahlt der Kunde abgerechnete Tage. Wenn die Entwickler des Partners schneller werden, werden dem Kunden weniger Tage berechnet, also sollte er auch die Tokens zahlen. Beim Festpreis behält der Partner den Gewinn und trägt die Kosten. Wer den Werkzeugvertrag schließt, in wessen Organisation Code und Nutzungsdaten liegen und wer die Kosten trägt, sind allerdings getrennte Fragen. Es gibt drei Varianten:

- **Der Kunde stellt die Accounts.** Die Entwickler des Partners arbeiten mit Seats in der Claude-, ChatGPT- oder GitHub-Organisation des Kunden oder mit einer Vibes-Lizenz in seiner Org. Der Kunde setzt Limits, sieht die Ausgaben pro Person und entzieht den Zugang, wenn die Zusammenarbeit mit dem Partner endet. Das ist dieselbe Logik wie bei [DevOps-Werkzeugen im Besitz des Kunden](../warum-kunden-devops-tools-selbst-besitzen-sollten/).
- **Der Partner bringt eigene Werkzeuge mit.** Die Kosten sind im Tagessatz enthalten, das Verbrauchsrisiko ebenfalls. Ihr Quellcode wird dann aber auf Grundlage eines Vertrags verarbeitet, den Sie nie gelesen haben. Der Vertrag mit dem Partner muss deshalb erlaubte Werkzeuge, Modelle und Datenregeln nennen, siehe [Regeln für Partner mit KI-Coding im Vertrag](../partner-ki-coding-regeln-vertrag/).
- **Weiterberechnung zum Selbstkostenpreis.** Der Partner stellt die Token-Kosten monatlich in Rechnung. Das würde ich nur mit Obergrenze pro Entwickler, Verbrauchsbericht pro Person und ohne Aufschlag akzeptieren; sonst besteht kein Anreiz, Sonnet statt Opus zu wählen.

Bei Abrechnung nach Aufwand bevorzuge ich die erste Variante: Für 650 $ bis 1.500 $ im Monat behält der Kunde die Kontrolle über Daten, Limits und Offboarding. In Deutschland ist der Betriebsrat zu unterrichten und zu beraten, wenn KI Arbeitsabläufe verändert; wenn Nutzungsdaten eine Überwachung von Beschäftigten ermöglichen, kann Mitbestimmung greifen, siehe [KI-Coding, Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/). Die Frage, ob Sie überhaupt Seats kaufen, ist Teil meiner Arbeit in [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

## Vor dem ersten Sprint klären, wer zahlt

1. **Klären Sie vor dem ersten Sprint, wer zahlt**, und halten Sie es in der Leistungsbeschreibung fest.
2. **Setzen Sie Limits.** Claude Team und Enterprise bieten Ausgabenlimits pro Organisation, Gruppe und Mitglied für Nutzung über das Seat-Kontingent hinaus, die Claude Console bietet Limits pro Workspace, GitHub bietet Budgets pro Nutzer und Kostenstelle.
3. **Sonnet als Standard.** Anthropic empfiehlt Sonnet für die meisten Coding-Aufgaben und Opus für komplexe Architekturentscheidungen.
4. **Halten Sie die Regeldatei kurz.** Anthropic rät, CLAUDE.md unter 200 Zeilen zu halten, siehe [die KI-Regeldatei im Repository](../ki-regeldatei-salesforce-repository/).
5. **Pilotieren Sie zwei Wochen mit zwei Entwicklern** und werten Sie die tatsächlichen Ausgaben aus.
6. **Budgetieren Sie das Review.** Ein menschlicher Reviewer für generiertes Apex ist teurer als die Token-Kosten, siehe [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/).
