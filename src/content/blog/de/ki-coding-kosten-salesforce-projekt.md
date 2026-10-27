---
title: "KI-Coding-Kosten im Salesforce-Projekt: wer zahlt?"
description: "Was KI-Coding mit Claude Code, Codex, Copilot oder Agentforce Vibes im Salesforce-Projekt kostet, wie die Token-Rechnung funktioniert und wer zahlen sollte."
pubDate: 2026-10-27
lang: de
slug: ki-coding-kosten-salesforce-projekt
translationKey: ai-coding-costs-salesforce-project
topic: devops
tags: [KI-Coding, Claude Code, GitHub Copilot, Agentforce Vibes, Partnersteuerung, Kosten]
takeaways:
  - "KI-Coding kostet im Salesforce-Projekt zu Listenpreisen etwa 19 $ bis 250 $ pro Entwickler und Monat, von Copilot Business mit Inklusiv-Credits bis Claude Code zu API-Preisen."
  - "Anthropic nennt für Claude Code rund 13 $ pro Entwickler und aktivem Arbeitstag; Caching macht wiederholten Kontext billig, teuer sind Output und Thinking."
  - "Im Szenario kosten KI-Werkzeuge für ein Partnerteam mit acht Personen etwa 650 $ bis 1.500 $ im Monat, rund ein Prozent der Tagessätze des Teams."
  - "Agentforce Vibes im Verbrauchsmodell zieht aus denselben Flex Credits wie Ihre Agenten in Produktion und zählt in Einheiten zu 2.000 Tokens; Opus kostet 16 Credits pro Einheit."
  - "Bei Abrechnung nach Aufwand sollte der Kunde die Accounts besitzen und die Tokens zahlen; beim Festpreis zahlt der Partner, und der Vertrag nennt erlaubte Werkzeuge und Datenregeln."
faq:
  - q: "Was kostet Claude Code pro Entwickler und Monat?"
    a: "Anthropic nennt für Unternehmenseinsätze zu API-Preisen im Schnitt rund 13 $ pro Entwickler und aktivem Tag und 150 $ bis 250 $ pro Monat. Ein Premium-Seat im Claude-Team-Plan kostet 125 $ im Monat, bei Jahreszahlung 100 $, mit Nutzungskontingent statt Token-Rechnung."
  - q: "Ist GitHub Copilot für Salesforce-Arbeit günstiger als Claude Code?"
    a: "Der Seat ist günstiger: Copilot Business kostet 19 $ pro Nutzer und Monat und enthält 1.900 AI Credits, also 19 $ Modellnutzung. Agenten-Sessions verbrauchen Credits zum Token-Preis des Modells, über den gepoolten Credits kostet jeder Credit 0,01 $. Bei intensiver Agentennutzung schrumpft der Abstand."
  - q: "Wer sollte KI-Coding-Werkzeuge bezahlen, Kunde oder Umsetzungspartner?"
    a: "Das folgt dem Vertragsmodell. Bei Aufwand bekommt der Kunde den Produktivitätsgewinn über weniger abgerechnete Tage, also sollte er die Accounts besitzen und zahlen. Beim Festpreis behält der Partner den Gewinn und trägt die Token-Kosten."
  - q: "Verbraucht Agentforce Vibes meine Agentforce Flex Credits?"
    a: "Im Verbrauchsmodell ja. Laut Salesforce nutzt es dieselben Credits wie Agentforce, gezählt in Einheiten zu 2.000 Tokens. Die Flat Fee von 125 $ pro Nutzer und Monat vermeidet das, begrenzt Premium-Modelle aber auf 2.500 Requests oder 36 Mio. Tokens pro 30 Tage."
  - q: "Warum ist Prompt-Caching für KI-Coding-Kosten so wichtig?"
    a: "Ein Coding-Agent schickt bei jedem Schritt das ganze Gespräch erneut. Bei Claude Opus 5.5 und Sonnet 5.5 kostet ein Cache-Treffer 5 Prozent des normalen Input-Preises; im Rechenbeispiel wird aus einer Session für rund 9,80 $ eine für rund 2,20 $."
draft: false
---

KI-Coding kostet im Salesforce-Projekt weniger, als die meisten Budgetdiskussionen annehmen: etwa 19 $ bis 250 $ pro Entwickler und Monat zu Listenpreisen. Copilot Business kostet 19 $, Seats für Claude und ChatGPT 20 $ bis 125 $, und Anthropic beziffert Claude Code zu API-Preisen auf 150 $ bis 250 $ im Monat. Für ein Partnerteam mit acht Personen sind das rund 650 $ bis 1.500 $ im Monat, etwa ein Prozent der Tagessätze. Schwieriger ist die Frage, wem die Accounts gehören und wer das Verbrauchsrisiko trägt. Meine Regel: bei Aufwand zahlt der Kunde, beim Festpreis der Partner.

## Was kostet KI-Coding pro Entwickler und Monat?

Die meisten Coding-Werkzeuge verkaufen inzwischen einen Seat mit Budget und rechnen jede Nutzung jenseits davon pro Token ab. Hier die US-Listenpreise vom 27. Oktober 2026:

- **Claude Code zu API-Preisen.** Anthropic [nennt](https://code.claude.com/docs/en/costs) für Unternehmenseinsätze rund 13 $ pro Entwickler und aktivem Tag und 150 $ bis 250 $ pro Monat; 90 Prozent der Nutzer bleiben unter 30 $ pro aktivem Tag.
- **Claude Team und Enterprise.** Laut [Preisseite von Anthropic](https://claude.com/pricing) kostet ein Team-Standard-Seat 25 $ im Monat (20 $ jährlich), Premium 125 $ (100 $ jährlich), Enterprise 20 $ pro Seat plus Nutzung zu API-Preisen. Die Nutzung zieht aus einem Kontingent, das sich in einem Fünf-Stunden- und einem Wochenfenster erneuert. Wie viele Tokens das sind, veröffentlicht Anthropic nicht.
- **OpenAI Codex.** Die [Codex Rate Card](https://help.openai.com/en/articles/20001106-codex-rate-card-2) nennt im Schnitt rund 100 $ bis 200 $ pro Entwickler und Monat. OpenAI führt Codex unter den Funktionen von [ChatGPT Business](https://openai.com/business/pricing/) zu 25 $ pro Seat (20 $ jährlich).
- **GitHub Copilot.** Business kostet [19 $ pro Nutzer mit 1.900 AI Credits](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan), Enterprise 39 $ mit 3.900. Ein Credit kostet 0,01 $, die Credits werden [organisationsweit gepoolt](https://docs.github.com/de/copilot/concepts/billing/organizations-and-enterprises/usage-based-billing), Code-Vervollständigungen kosten keine Credits.
- **Agentforce Vibes.** Flat Fee von 125 $ oder 125 € pro Nutzer und Monat oder Verbrauch in Flex Credits, dazu unten mehr.

Der Seat-Preis sagt wenig über die Rechnung. GitHub rechnet Tokens zum Preis des jeweiligen Modells in Credits um, die 19 $ Inklusivnutzung reichen also nur für eine Handvoll der Agenten-Sessions unten.

## Wie wird aus Tokens eine Rechnung?

Ein Token ist die Einheit, in der Modelle abrechnen, grob ein Wort- oder Codestück. Ein Coding-Agent arbeitet in einer Schleife: Er liest Dateien, führt einen Befehl aus und schickt alles zurück an das Modell. In einem Salesforce-Repository besteht dieser Kontext aus Regeldatei, Apex-Klassen, Metadaten-XML und Testausgaben. Drei Regeln auf der [Preisseite von Anthropic](https://platform.claude.com/docs/en/about-claude/pricing) bestimmen den Preis:

- **Caching.** Bereits gesendeter Kontext kommt aus dem Prompt-Cache. Bei Claude Opus 5.5 kostet ein Cache-Treffer 0,20 $ pro Million Tokens statt 4 $, also 5 Prozent des Input-Preises. Das Schreiben in den Fünf-Minuten-Cache kostet das 1,25-Fache.
- **Output und Thinking.** Output kostet bei Opus 5.5 20 $ pro Million Tokens, das Fünffache des Inputs. Thinking-Tokens zählen als Output und lassen sich bei Opus 5.5 und Sonnet 5.5 [nicht abschalten](https://code.claude.com/docs/en/costs).
- **Modellwahl.** Sonnet 5.5 kostet die Hälfte: 2 $ Input, 10 $ Output, 0,10 $ Cache-Treffer pro Million Tokens.

### Rechenbeispiel: eine Agenten-Session

Angenommen, ein Entwickler lässt den Agenten einen Trigger-Handler für Garantieanträge samt Tests bauen. Die Session hat 30 Modellaufrufe, der Kontext wächst von 25.000 auf rund 115.000 Tokens, jeder Aufruf liefert 2.000 Output-Tokens inklusive Thinking. Alle Zahlen sind Annahmen.

- Cache-Writes: 115.000 Tokens zu 5 $ pro Million = 0,58 $
- Cache-Reads: 30 Aufrufe mit je rund 68.000 Tokens, 2,04 Mio. zu 0,20 $ pro Million = 0,41 $
- Output: 60.000 Tokens zu 20 $ pro Million = 1,20 $
- **Summe mit Opus 5.5: rund 2,20 $.** Mit Sonnet 5.5: rund 1,10 $.

Ohne Caching kosten die 2,16 Mio. Input-Tokens 8,62 $ und die Session rund 9,80 $. Der Output macht unter 3 Prozent der Tokens und mehr als die Hälfte der Kosten aus. Sechs solcher Sessions pro Arbeitstag ergeben rund 13 $, Anthropics Durchschnitt.

Zwei Effekte treiben das nach oben: Claude ab 4.7 erzeugt für denselben Text rund 30 Prozent mehr Tokens, und Agent Teams verbrauchen im Plan-Modus etwa siebenmal so viele Tokens wie eine normale Session.

## Ein typisches Szenario: ein Partnerteam baut Serviceprozesse

Nehmen wir einen Maschinenbauer mit SAP, Service Cloud, Field Service für den Außendienst und einem Händlerportal. Ein Nearshore-Partnerteam mit acht Personen baut das nächste Release: sechs Entwickler, die an 18 Tagen im Monat mit einem Coding-Agenten arbeiten, dazu ein Lead Consultant und eine Projektleiterin mit Chat-Seats. Alle Mengen sind Annahmen, die Preise die Listenpreise von oben.

- **Claude Code zu API-Preisen:** 6 × 18 × 13 $ = 1.404 $, plus zwei Standard-Seats, rund 1.450 $ im Monat, ohne Obergrenze, solange niemand eine setzt.
- **Claude Team:** sechs Premium- und zwei Standard-Seats = 800 $ im Monat, 640 $ bei Jahreszahlung. Planbar, aber wer sein Kontingent aufbraucht, wartet auf das nächste Fenster, außer der Admin hat Usage Credits freigeschaltet.
- **Codex in ChatGPT Business:** mit OpenAIs Durchschnitt 600 $ bis 1.200 $ für die sechs Entwickler plus zwei Seats.
- **Copilot Business:** acht Seats = 152 $ mit einem Pool von 15.200 Credits. Liegt GitHubs Modellpreis nahe an Anthropics Listenpreis, reicht der Pool für rund 70 Sessions, zwei Arbeitstage bei sechs Sessions pro Entwickler und Tag. Danach wird jeder Credit berechnet, und der Monat endet bei rund 1.400 $.

Bei einem angenommenen Mischsatz von 800 $ pro Person und Tag kostet das Team selbst 8 × 18 × 800 $ = 115.200 $ im Monat. KI-Coding kommt mit etwa einem Prozent dazu. McKinsey [erwartet](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle), dass die Ausgaben für Tokens, Rechenleistung, Infrastruktur und AI Ops auf bis zu 20 Prozent der bisherigen Personalkosten steigen können, je mehr Arbeit Agenten übernehmen. Die größeren Risiken sind aus meiner Sicht heute ein Zähler ohne Limit und die offene Frage, wem der Produktivitätsgewinn gehört.

## Warum braucht Agentforce Vibes eine eigene Rechnung?

Agentforce Vibes ist der Coding-Agent von Salesforce. Zwei Punkte sind wichtig:

1. **Vibes im Verbrauchsmodell nutzt die Flex Credits Ihrer Agenten.** Laut [Preisseite von Vibes](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/) verbraucht es „the same credits used by Agentforce“. Ein Partnerteam auf Verbrauchsbasis zieht also aus dem Pool, den Sie für einen Serviceagenten für Händleranfragen eingeplant haben, siehe [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).
2. **Die Einheit sind 2.000 Tokens.** Die [Abrechnungsdokumentation](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html) zählt Input und Output in Einheiten zu 2.000 Tokens, aufgerundet. Opus-Modelle laufen als Advanced Prompts, laut [Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) 16 Credits pro Einheit, also 0,08 $. Ob erneut gesendeter Kontext voll zählt, sagt Salesforce nicht. Wenn ja, kostet ein einzelner Opus-Request mit 70.000 Tokens Kontext 560 Credits oder 2,80 $, mehr als die ganze Session oben. Ich würde das eine Woche im Digital Wallet messen, bevor jemand auf Verbrauch arbeitet.

Die Flat Fee begrenzt Premium-Modelle auf 2.500 Requests oder 36 Mio. Tokens pro 30 Tage, und Opus gibt es nur im Verbrauchsmodell. In der EU Operating Zone ist Vibes nicht verfügbar. Dafür spricht: Die Lizenz liegt in der Org des Kunden, und laut [FAQ](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html) bleiben die Daten innerhalb der Vertrauensgrenze von Salesforce. Die Werkzeugwahl selbst behandle ich in [Agentforce Vibes, Claude Code oder Copilot](../agentforce-vibes-claude-code-copilot-vergleich/).

## Wer sollte KI-Coding bezahlen, Kunde oder Partner?

Die Antwort folgt dem Vertragsmodell. Bei Abrechnung nach Aufwand zahlt der Kunde Tage. Werden die Entwickler des Partners schneller, zahlt der Kunde weniger Tage, also sollte er auch die Tokens zahlen. Beim Festpreis behält der Partner den Gewinn und trägt die Kosten. Es gibt drei Varianten:

- **Der Kunde stellt die Accounts.** Die Entwickler des Partners arbeiten mit Seats in der Claude-, ChatGPT- oder GitHub-Organisation des Kunden oder mit einer Vibes-Lizenz in seiner Org. Der Kunde setzt Limits, sieht die Ausgaben pro Person und entzieht den Zugang, wenn der Partner geht. Das ist dieselbe Logik wie bei [DevOps-Werkzeugen im Besitz des Kunden](../warum-kunden-devops-tools-selbst-besitzen-sollten/).
- **Der Partner bringt eigene Werkzeuge mit.** Die Kosten stecken im Tagessatz, das Verbrauchsrisiko auch. Ihr Quellcode läuft dann aber über einen Vertrag, den Sie nie gelesen haben. Der Vertrag mit dem Partner muss deshalb erlaubte Werkzeuge, Modelle und Datenregeln nennen, siehe [Regeln für Partner mit KI-Coding im Vertrag](../partner-ki-coding-regeln-vertrag/).
- **Weiterberechnung zum Selbstkostenpreis.** Der Partner stellt die Tokens monatlich in Rechnung. Das würde ich nur mit Obergrenze pro Entwickler, Verbrauchsbericht pro Person und ohne Aufschlag akzeptieren, sonst hat niemand einen Grund, Sonnet statt Opus zu wählen.

Bei Aufwand bevorzuge ich die erste Variante: Für 650 $ bis 1.500 $ im Monat behält der Kunde Daten, Limits und Offboarding in der Hand. In deutschen Unternehmen redet der Betriebsrat mit, siehe [KI-Coding, Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/). Ob Sie überhaupt Seats kaufen, gehört zu meiner Arbeit in [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

## Wie behalten Sie die Kosten für KI-Coding im Griff?

1. **Klären Sie vor dem ersten Sprint, wer zahlt**, und schreiben Sie es in den Vertrag.
2. **Setzen Sie Limits.** Claude Team und Enterprise bieten Ausgabenlimits pro Organisation, Gruppe und Mitglied für Nutzung über das Seat-Kontingent hinaus, die Claude Console Limits pro Workspace, GitHub Budgets pro Nutzer und Kostenstelle.
3. **Sonnet als Standard.** Anthropic empfiehlt Sonnet für die meisten Coding-Aufgaben und Opus für komplexe Architekturentscheidungen.
4. **Halten Sie die Regeldatei kurz.** Anthropic rät, CLAUDE.md unter 200 Zeilen zu halten, siehe [die KI-Regeldatei im Repository](../ki-regeldatei-salesforce-repository/).
5. **Pilotieren Sie zwei Wochen mit zwei Entwicklern** und lesen Sie die echten Ausgaben ab.
6. **Budgetieren Sie das Review.** Ein menschlicher Reviewer für generiertes Apex kostet mehr als die Tokens, siehe [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/).

KI-Coding kostet im Szenario etwa ein Prozent eines Salesforce-Partnerteams, also klären Sie Accounts und Limits, bevor Sie über den Preis verhandeln. Wenn Sie eine zweite Meinung zu Ihrem Setup oder zum Angebot Ihres Partners möchten, [schreiben Sie mir](#contact).
