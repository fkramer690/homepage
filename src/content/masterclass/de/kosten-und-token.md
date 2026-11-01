---
title: "KI-Kosten in Salesforce: Token, Flex Credits, Budget"
description: "Was KI-Entwicklung und Agentforce-Betrieb in Salesforce kosten: Token-Preise, Flex Credits, Editionen, Rechenbeispiele und Budgetregeln für Hersteller."
lang: de
slug: kosten-und-token
translationKey: masterclass-07
chapter: 7
short: "Kosten und Token"
summary: "Wie Token-Preise in der Entwicklung und Flex Credits im Agentforce-Betrieb zusammenspielen und wie ein Hersteller beides budgetiert."
takeaways:
  - "Coding-Agenten rechnen nach Tokens ab, Agentforce-Agenten nach Aktionen und Prompts in Flex Credits. Beides gehört in getrennte Budgetzeilen."
  - "Prompt-Caching ist der größte Hebel bei Coding-Agenten: Eine Beispielsession mit Claude Opus 5.5 kostet mit Cache rund 2,34 $, ohne Cache rund 12,40 $."
  - "Anthropic nennt für Claude Code rund 13 $ pro Entwickler und aktivem Tag. Seat-Preise kaufen heute ein Nutzungsbudget, keine unbegrenzte Nutzung."
  - "Core, Advanced und Max enthalten 500.000, 1 Mio. und 2,75 Mio. Flex Credits pro Org und Jahr. Ein Händleragent kann im ersten Jahr rund 3 Mio. verbrauchen."
  - "Data 360 für Ersatzteilkataloge und der noch unbepreiste Zähler für Headless Platform Interactions fehlen in Schätzungen am häufigsten."
articles: [flex-credits-agentforce-costs, salesforce-editions-core-advanced-max, dealer-service-agent-costs, ai-coding-costs-salesforce-project, data-360-costs-for-agents, headless-platform-interactions-budget]
faq:
  - q: "Was kostet ein Coding-Agent wie Claude Code pro Entwickler?"
    a: "Anthropic nennt für Unternehmenseinsätze im Schnitt rund 13 $ pro Entwickler und aktivem Tag und 150 bis 250 $ im Monat, für 90 Prozent der Nutzer unter 30 $ pro aktivem Tag. Team- und Enterprise-Seats begrenzen die Nutzung über ein Fünfstunden- und ein Wochenfenster."
  - q: "Ist die Flat Fee für Agentforce Vibes günstiger als Flex Credits?"
    a: "Bei täglicher agentischer Arbeit meist ja. Die Flat Fee kostet 125 € pro Nutzer und Monat. Bei 30.000 Tokens pro Anfrage auf einem Standard-Modell liegt der Break-even bei rund 420 Anfragen im Monat, etwa 20 pro Arbeitstag."
  - q: "Kostet deutscher Text mehr Tokens als englischer?"
    a: "Anthropic schreibt nur, dass die Zeichen pro Token von Modell und Sprache abhängen. Eine offizielle Quote für Deutsch habe ich nicht gefunden. Zählen Sie ein typisches Lastenheft mit der kostenlosen Token-Zählung der Claude API, bevor Sie budgetieren."
  - q: "Welche Agentforce-Kosten fehlen in Schätzungen am häufigsten?"
    a: "Prompts nach Modellstufe, Testläufe in der Sandbox, die Verarbeitung von Dokumenten in Data 360 und Headless Platform Interactions, deren Satz auf der Rate Card noch TBA ist. Im Beispiel eines Ersatzteilagenten machen Textaktionen nur 55 Prozent der monatlichen Credits aus."
draft: false
---

KI im Salesforce-Projekt kostet in zwei Währungen. Coding-Agenten wie Claude Code, Codex, Copilot oder Agentforce Vibes rechnen nach Tokens ab, und der Kontext, den der Agent bei jedem Schritt neu sendet, treibt die Rechnung stärker als der Prompt. Agentforce-Agenten im Betrieb rechnen nach Aktionen und Prompts in Flex Credits ab, zu einem halben Cent pro Credit. Wer beides in eine Zeile schreibt, verschätzt sich. Die größten Hebel sind Prompt-Caching in der Entwicklung und, im Betrieb, Data 360 und Testlast, die in vielen Schätzungen fehlen.

## Zwei Währungen: Tokens und Flex Credits

Die beiden Rechenwelten im Vergleich:

| | Entwicklung mit Coding-Agenten | Betrieb von Agentforce-Agenten |
|---|---|---|
| Abrechnungseinheit | Tokens: Input, Cache, Output | Flex Credits pro Aktion, Prompt, MB, Zeile |
| Beispiele | Claude Code, Codex, Copilot, Agentforce Vibes | Händleragent, Serviceagent, Garantieprüfung |
| Wer zahlt | Partner oder Auftraggeber, je nach Vertrag | Auftraggeber, über den Salesforce-Vertrag |
| Größter Hebel | Caching, Modellwahl, kurze Sessions | Aktionen pro Gespräch, Dokumentenvolumen, Tests |
| Typischer blinder Fleck | Output- und Thinking-Tokens | Data 360, Headless Platform Interactions |

Agentforce Vibes sitzt dazwischen. Es zählt Tokens, laut [Abrechnungsdokumentation](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html) in Einheiten von 2.000 Tokens, aufgerundet, bezahlt wird aber in Flex Credits oder über eine Flat Fee pro Nutzer.

Bei den Coding-Werkzeugen ist 2026 aus Request-Zählern ein Token-Budget geworden. GitHub Copilot rechnet laut [GitHub-Dokumentation](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/billing/billing-for-individuals) in AI Credits zu 0,01 $ (US-Listenpreis) ab, jeder Token wird „based on the model used“ bepreist. Codex rechnet laut [OpenAI](https://help.openai.com/en/articles/20001106-codex-rate-card-2) seit dem 2. April 2026 in Credits pro Million Tokens ab. Der Seat-Preis kauft also ein Budget, und die API-Preistabelle wird zum gemeinsamen Nenner jeder Kalkulation. Welches Werkzeug für welche Aufgabe passt, steht in [Kapitel 6](../entscheidungsmatrix-ki-werkzeuge/), die Anbieter selbst in [Kapitel 4](../externe-coding-agenten/).

## Was ist ein Token, und warum zählt der Kontext mehr als der Prompt?

Ein Token ist die kleinste Einheit, die ein Sprachmodell verarbeitet: ein Wort, ein Wortteil oder ein einzelnes Zeichen. Laut [Anthropic-Glossar](https://platform.claude.com/docs/en/about-claude/glossary) steht ein Token bei Claude ab Version 4.7 für etwa 3,5 englische Zeichen, und der neuere Tokenizer erzeugt rund 30 Prozent mehr Tokens für denselben Text als frühere Modelle. Grob nach dieser Faustregel landet eine Apex-Klasse mit 40.000 Zeichen auf den 5.5-Modellen bei etwa 11.400 Tokens, auf älteren Modellen bei rund 30 Prozent weniger. Code und deutsche Texte können abweichen: Anthropic schreibt nur, dass die Zeichen pro Token von Modell und Sprache abhängen. Eine offizielle Quote für Deutsch habe ich nicht gefunden. Die [Token-Zählung der Claude API](https://platform.claude.com/docs/en/build-with-claude/token-counting) ist kostenlos; zählen Sie damit ein echtes Lastenheft und eine typische Klasse aus Ihrem Repository.

Der Tokenizer verschiebt auch Preisvergleiche. Sonnet 4.6 kostet 3 $ pro Million Input-Tokens, Sonnet 5.5 nur 2 $, braucht für denselben Text aber rund 30 Prozent mehr Tokens. Nach meiner Rechnung bleibt Sonnet 5.5 günstiger, nur um etwa 13 statt 33 Prozent.

Teuer wird agentisches Arbeiten durch die Schleife, nicht durch die Frage des Entwicklers. Die [Kostendokumentation von Claude Code](https://code.claude.com/docs/en/costs) nennt die Treiber:

| Treiber | Was passiert |
|---|---|
| Kontext bei jedem Schritt | Claude Code sendet bei jeder Anfrage die ganze Unterhaltung, und jeder Tool-Aufruf erzeugt eine weitere Anfrage mit den Ergebnissen. |
| Thinking als Output | Thinking-Tokens werden als Output abgerechnet, bei Opus 5.5, Sonnet 5.5 und Haiku 5.5 lässt sich Thinking nicht abschalten. Output kostet bei Claude 5.5 das Fünffache des Inputs. |
| Cache-Miss nach Pausen | Die erste Nachricht nach einer Pause, die länger dauert als die Cache-Lebensdauer, verarbeitet den vollen Kontext neu. |
| Agent Teams | Im Plan-Modus verbrauchen sie rund das Siebenfache einer normalen Session. |
| Regeldateien und MCP | Die CLAUDE.md wird bei jedem Start geladen, Anthropic empfiehlt unter 200 Zeilen. CLI-Werkzeuge sind sparsamer im Kontext als MCP-Server. |

## Was kostet KI-gestützte Entwicklung?

### Token-Preise der Claude API

Preise in USD pro Million Tokens laut [Claude-Preisseite](https://platform.claude.com/docs/en/about-claude/pricing), Stand 27. Oktober 2026:

| Modell | Input | Cache-Write 5 Min. | Cache-Read | Output |
|---|---|---|---|---|
| Claude Opus 5.5 | 4,00 $ | 5,00 $ | 0,20 $ | 20,00 $ |
| Claude Sonnet 5.5 | 2,00 $ | 2,50 $ | 0,10 $ | 10,00 $ |
| Claude Haiku 5.5, Prompt bis 100.000 Tokens | 0,10 $ | 0,125 $ | 0,01 $ | 0,50 $ |
| Claude Haiku 5.5, Prompt über 100.000 Tokens | 0,50 $ | 0,625 $ | 0,05 $ | 2,50 $ |
| Claude Opus 4.5 bis 4.8 | 5,00 $ | 6,25 $ | 0,50 $ | 25,00 $ |
| Claude Sonnet 4.6 | 3,00 $ | 3,75 $ | 0,30 $ | 15,00 $ |

Drei Regeln von derselben Seite zählen für die Planung. Die Batch API halbiert Input und Output. Der Cache-Read zum 0,05-fachen Input-Preis gilt nur für Opus 5.5 und Sonnet 5.5, ältere Modelle und Haiku 5.5 liegen beim 0,1-Fachen. Und Haiku 5.5 springt über 100.000 Prompt-Tokens, Cache eingerechnet, auf den fünffachen Satz. Agentische Sessions wachsen schnell darüber, Haiku ist also vor allem für kurze Aufgaben billig. Zum Vergleich: [GPT-5.5](https://developers.openai.com/api/docs/models/gpt-5.5.md) kostet 5 $ Input, 0,50 $ Cache und 30 $ Output, und über 272.000 Input-Tokens das Doppelte beim Input und das 1,5-Fache beim Output für die ganze Session.

### Seats und Abos

| Angebot | Preis pro Nutzer und Monat (US-Listenpreis in USD, Vibes in EUR) | Was der Preis kauft |
|---|---|---|
| Claude Pro | 20 $, jährlich 17 $ | Claude Code, Kontingent ohne veröffentlichte Tokenzahl |
| Claude Max | ab 100 $ | größeres Kontingent |
| Claude Team, Standard oder Premium | 25 $ oder 125 $, jährlich 20 $ oder 100 $ | Kontingent im Fünfstunden- und Wochenfenster, geteilt mit Chat |
| Claude Enterprise | 20 $ pro Seat jährlich, mindestens 20 Seats | Nutzung zusätzlich zu API-Preisen |
| GitHub Copilot Business oder Enterprise | 19 $ oder 39 $ | 1.900 oder 3.900 AI Credits, gepoolt |
| Codex | laut OpenAI im Schnitt 100 bis 200 $ Verbrauch | Credits pro Million Tokens |
| Agentforce Vibes Flat Fee | 125 € | Premium-Modell bis 2.500 Anfragen oder 36 Mio. Tokens pro 30 Tage |
| Gemini Code Assist Standard oder Enterprise | rund 19 $ oder 45 $ bei Jahresbindung | aus Stundensätzen umgerechnet |

Quellen: [claude.com/pricing](https://claude.com/pricing), [Copilot-Pläne](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan), [Codex Rate Card](https://help.openai.com/en/articles/20001106-codex-rate-card-2), [Vibes-Preise](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/), [Vibes-Abrechnung](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html), [Gemini-Preise](https://cloud.google.com/products/gemini/pricing). Cursor fehlt, weil ich die offizielle Preisseite nicht öffnen konnte.

Für Claude Code nennt Anthropic im [Unternehmenseinsatz](https://code.claude.com/docs/en/costs) diese Werte:

```kennzahlen
13 $ | im Schnitt pro Entwickler und aktivem Tag
150 bis 250 $ | pro Entwickler und Monat
unter 30 $ | pro aktivem Tag bei 90 Prozent der Nutzer
quelle: Anthropic, Kostendokumentation von Claude Code für Unternehmenseinsätze
```

Bei 20 aktiven Tagen sind das 260 $ zu API-Preisen. Ein Team-Premium-Seat kann für intensive Nutzer günstiger sein, solange die Fenster reichen; wie viele Tokens das sind, nennt die Preisseite nicht. Ich würde einen Monat zu API-Preisen messen und erst dann Seats kaufen. Wer die Kosten trägt, Auftraggeber oder Partner, behandle ich in [KI-Coding-Kosten im Salesforce-Projekt](../../../blog/ki-coding-kosten-salesforce-projekt/). Meine Grundhaltung: Arbeitet der Agent in Ihrem Repository und Ihren Sandboxes, gehören die Konten Ihnen, aus denselben Gründen wie bei den [DevOps-Werkzeugen](../../../blog/warum-kunden-devops-tools-selbst-besitzen-sollten/).

### Rechenbeispiel: eine agentische Session

Annahmen: 40 Modellaufrufe, der Kontext wächst von 20.000 auf 120.000 Tokens, im Schnitt 70.000. Pro Aufruf kommen 2.500 neue Tokens dazu, 1.500 Tokens Output inklusive Thinking, Caching mit fünf Minuten.

| Posten | Rechnung |
|---|---|
| Cache-Writes | 20.000 + 40 × 2.500 = 120.000 Tokens × 5,00 $ pro Mio. = **0,60 $** |
| Cache-Reads | 40 × 67.500 = 2,7 Mio. Tokens × 0,20 $ pro Mio. = **0,54 $** |
| Output | 40 × 1.500 = 60.000 Tokens × 20,00 $ pro Mio. = **1,20 $** |
| Summe mit Opus 5.5 | **2,34 $** |

Ohne Caching kosten 2,8 Mio. Input-Tokens zu 4 $ allein 11,20 $, mit Output **12,40 $**, gut das Fünffache. Mit Sonnet 5.5 und Caching: 0,30 + 0,27 + 0,60 = **1,17 $**. Fünf Opus-Sessions am Tag ergeben 11,70 $, nahe an Anthropics 13 $ pro aktivem Tag. Output macht rund 2 Prozent der Tokens und gut die Hälfte der Kosten aus. Deshalb ist Sonnet als Standard und Opus für Architekturfragen auch Anthropics eigene Empfehlung.

### Rechenbeispiel: Agentforce Vibes nach Verbrauch oder Flat Fee

1. Eine Anfrage mit 6.500 Tokens zählt als vier Einheiten, das Beispiel stammt aus der Abrechnungsdokumentation.
2. Auf einem Standard-Modell wie Sonnet 4.6: 4 × 4 Credits = 16 Credits = **0,08 €**. Opus läuft als Advanced: 4 × 16 = 64 Credits = **0,32 €**.
3. Eine agentische Anfrage mit 30.000 Tokens: 15 Einheiten × 4 = 60 Credits = **0,30 €**.
4. Break-even der Flat Fee: 125 € ÷ 0,30 € ≈ **417 Anfragen im Monat**, rund 20 pro Arbeitstag. In Tokens: 25.000 Credits ÷ 4 × 2.000 = **12,5 Mio. Tokens** auf Standard-Modellen.

Wer täglich agentisch arbeitet, fährt mit der Flat Fee günstiger, bis zur Grenze von 2.500 Anfragen oder 36 Mio. Tokens auf dem Premium-Modell. Danach geht es mit Flex Credits oder dem enthaltenen GPT-5 weiter.

### Batch: ein Org-Assessment vor dem Programmstart

Angenommen, eine zehn Jahre alte Org mit 2.000 Apex-Klassen soll vor dem Neustart zusammengefasst werden, mit 8.000 Tokens Input und 1.000 Tokens Output pro Klasse auf Sonnet 5.5 über die Batch API: 16 Mio. × 1 $ + 2 Mio. × 5 $ = **26 $** statt 52 $. Weil Thinking bei den 5.5-Modellen immer läuft, kann der Output höher liegen; selbst das Dreifache fällt in keinem Programmbudget auf.

## Agentforce im Betrieb: Aktionen und Prompts in Flex Credits

Agentforce rechnet in Flex Credits ab, laut [Agentforce-Preisseite](https://www.salesforce.com/eu/agentforce/pricing/) zu 500 € je 100.000 Credits. Die Multiplikatoren stehen in der [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) mit Stand 31. August 2026:

| Posten | Credits Produktion / Sandbox | Preis in Produktion |
|---|---|---|
| Standard- oder Custom-Aktion | 20 / 16 | 0,10 € |
| Sprachaktion | 30 / 24 | 0,15 € |
| Prompt Basic, Standard, Advanced je 2.000 Tokens | 2, 4, 16 | 0,01 €, 0,02 €, 0,08 € |
| Help-Agent-Lösung | 400 / 0 | 2,00 € |
| Data 360 Unstructured Processing, Basisstufe | 150 / 120 pro MB | 0,75 € pro MB |
| Data 360 Queries, Basisstufe | 3 / 2,4 pro Mio. Zeilen | 0,015 € |
| Headless Platform Interaction | TBA | offen |

Laut [Modellübersicht von Salesforce](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm&type=5) laufen Claude Sonnet 4.6, Sonnet 5 und GPT-5 als Standard, Claude Opus und GPT 5.5 als Advanced. Dieselbe Zusammenfassung kostet auf Opus das Vierfache. Laut Preisseite werden nicht genutzte Flex Credits nicht in die nächste Vertragslaufzeit übertragen. Flex Credits und das Modell mit 2 € pro Gespräch werden nicht in derselben Org unterstützt. Daneben gibt es Agentforce-Add-ons ab 125 € pro Nutzer und Monat, etwa für Sales und Field Service, und die Agentforce User License zu 5 € plus Flex Credits. Für Großkunden beschreibt [Forrester](https://www.forrester.com/blogs/ai-agents-become-economic-actors-salesforce-rewrites-the-rules-of-pricing) das AELA, eine Festgebühr über zwei bis drei Jahre für die Verbrauchsprodukte; Vertragsbedingungen nennt der Beitrag nicht. Wie Sie pro Aktion schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](../../../blog/flex-credits-agentforce-kosten-pro-aktion/).

### Was die Editionen enthalten

Die [Preisseite der Sales Cloud](https://www.salesforce.com/eu/products/sales-pricing/) nennt für Core „500K Flex Credits/org/year“, für Advanced 1 Mio. und für Max 2,75 Mio. pro Org und Jahr. Zum Listenpreis sind das 2.500 €, 5.000 € und 13.750 €. Gegenüber Lizenzen von 195 €, 395 € und 550 € pro Nutzer und Monat sind die Pools klein: Credits sind kein Grund für eine Edition. Die neuen Preise für die Industries-Editionen, wichtig für die Manufacturing Cloud, hat Salesforce für [„later this fall“](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) angekündigt. Die Abwägung pro Edition steht in [Salesforce-Editionen Core, Advanced, Max](../../../blog/salesforce-editionen-core-advanced-max/).

### Rechenbeispiel: ein Agent für Händleranfragen

Annahme: 3.000 Gespräche im Monat zu Auftragsstatus, Lieferterminen und Ersatzteilen, je drei Aktionen und zwei Standard-Prompts.

| Posten | Rechnung |
|---|---|
| Aktionen | 3.000 × 3 × 20 = 180.000 Credits |
| Prompts | 3.000 × 2 × 4 = 24.000 Credits |
| Summe | 204.000 Credits = **1.020 € im Monat**, im Modell pro Gespräch wären es 6.000 € |
| Zwölf Monate | 2.448.000 Credits, mehr als die Pools von Core und Advanced, knapp unter Max |

Mit der Aufbereitung von 2.000 MB Ersatzteilkatalogen in Data 360 (300.000 Credits) und den Sandbox-Tests kommt das erste Jahr auf rund 3 Mio. Credits oder 15.000 €. Die vollständige Rechnung mit Testlast und Lösungspreis steht in [Agentforce-Serviceagent für Händler](../../../blog/serviceagent-haendleranfragen-kosten/).

### Die zwei häufigsten Lücken

**Data 360.** Stützt sich ein Agent auf Handbücher, Explosionszeichnungen oder Ersatzteilkataloge, kostet 1 GB unstrukturierter Dokumente in der Basisstufe rund 150.000 Credits, etwa 750 €, und das Vierfache, wenn Explosionszeichnungen LLM-basiertes Intelligent Processing zu 600 Credits pro MB brauchen. In der Sandbox gibt es keine Mengenstaffel. Testen Sie mit einem Ausschnitt und sortieren Sie veraltete Katalogstände vorher aus. Mehr in [Data-360-Kosten für KI-Agenten](../../../blog/data-360-kosten-fuer-ki-agenten/).

**Headless Platform Interactions.** Greifen Claude, ChatGPT oder andere Agenten über MCP oder API auf Salesforce zu, soll laut [SalesforceBen](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/) jeder erfolgreiche Aufruf eines registrierten Agenten zählen, nur in aktiven Produktions-Orgs und mit 30 Tagen Vorlauf. Klassische Integrationen bleiben bei ihrer heutigen Preislogik. Wer Claude auf Salesforce-Daten nutzt, zahlt dann doppelt: Anthropic für Tokens, Salesforce für Interaktionen. Die Menge können Sie schätzen, wie in [Kapitel 3](../mcp-und-schnittstellen/) gezeigt; den Budgetposten beschreibe ich in [MCP-Zugriffe auf Salesforce als Budgetrisiko](../../../blog/mcp-zugriffe-salesforce-budgetrisiko/).

```hinweis offen
Der Satz für Headless Platform Interactions steht auf der Rate Card noch als TBA. Lassen Sie sich vom Account Executive bestätigen, wie Pool, mehrere Orgs und Headless Platform Interactions abgerechnet werden.
```

## Rechenbeispiel: das erste KI-Jahr eines Maschinenbauers

Nehmen wir einen Maschinenbauer mit 80 Nutzern in der Service Cloud auf Core Edition, SAP S/4 und einem Partner, dessen sechs Entwickler mit Claude Code zu API-Preisen arbeiten. Geplant sind der Händleragent von oben, ein Org-Assessment und Hosted MCP für 25 Mitarbeitende im Innendienst. Alle Mengen sind Annahmen.

| Posten | Annahme | Pro Jahr zum Listenpreis (Anthropic in USD, Salesforce in EUR) |
|---|---|---|
| Coding-Agenten des Partners | 6 × 20 aktive Tage × 13 $ × 12 Monate | 18.720 $ |
| Händleragent mit Data 360 und Tests | rund 3 Mio. Credits | rund 15.000 € |
| Abzüglich Core-Pool | 500.000 Credits, falls sonst ungenutzt | minus 2.500 € |
| Org-Assessment über Batch | einmalig | 26 $ |
| Headless Platform Interactions | 42.000 Aufrufe im Monat | unbekannt, Satz TBA |
| **Summe ohne HPI** | | **rund 18.750 $ plus rund 12.500 €** |

Zum Vergleich: Die 80 Core-Lizenzen kosten zum Listenpreis 187.200 € im Jahr. Der KI-Verbrauch ist hier nicht die große Zahl. Das Risiko liegt woanders: Arbeitet das Partnerteam standardmäßig mit Opus statt Sonnet, kann sich die Entwicklungszeile verdoppeln, wie das Session-Beispiel zeigt. Und der HPI-Satz kann die Rechnung für den Innendienst später verändern, ohne dass jemand etwas am System geändert hat.

## Wie budgetieren Sie KI-Kosten im Salesforce-Projekt?

1. **Zwei Budgetzeilen führen:** Tokens für die Entwicklung, Flex Credits für den Betrieb, mit getrennten Verantwortlichen.
2. **Eigene Dokumente zählen:** Lastenheft, Regeldatei und typische Klassen mit der Token-Zählung messen statt Faustregeln aus Blogs zu übernehmen.
3. **Modell nach Aufgabe wählen:** Sonnet als Standard, Opus für Architektur und schwierige Fehler, Haiku für kurze Massenaufgaben unter 100.000 Tokens.
4. **Kontext klein halten:** `/clear` zwischen Aufgaben, Regeldatei unter 200 Zeilen, nur benötigte MCP-Server. Die Regeln für sauberen KI-Code stehen in [Kapitel 8](../best-practices-ki-code/).
5. **Seats nach Messung kaufen:** einen Monat zu API-Preisen oder nach Verbrauch laufen lassen, dann pro Person über Flat Fee oder Seat entscheiden.
6. **Agentforce pro Gesprächstyp schätzen:** Aktionen, Prompts, Sandbox-Tests und Dokumente in MB, Credits entlang des Go-live-Plans kaufen, weil nicht genutzte Credits nicht übertragen werden.
7. **Reserve für offene Zähler einplanen**, bis die Abrechnung oben bestätigt ist.
8. **Monatlich messen:** Das [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) zeigt den Agentforce-Verbrauch nach Agent, Aktion und Kanal und setzt ein aktiviertes Data 360 voraus; für Claude dienen Spend-Report oder Console.

Diese Fragen gehören zu meiner Arbeit in [Make-or-buy und Lizenzprognosen](../../../leistungen/make-or-buy-lizenzen/). Alle Kapitel der Masterclass finden Sie auf der [Übersichtsseite](../).
