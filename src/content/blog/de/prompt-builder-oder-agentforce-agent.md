---
title: "Prompt Builder oder Agentforce-Agent: was wann passt"
description: "Wann ein Prompt-Builder-Template für Servicebericht, Fallzusammenfassung und Händlerantwort reicht, wann Sie einen Agenten brauchen und was beides kostet."
pubDate: 2026-10-27
lang: de
slug: prompt-builder-oder-agentforce-agent
translationKey: prompt-builder-or-agent
topic: ai
categories: [ai]
tags: [Prompt Builder, Agentforce, Flex Credits, KI-Agenten, Maschinenbau, Governance]
takeaways:
  - "Serviceberichtstext, Fallzusammenfassung, Antwortentwurf und nächtliche Garantieübersicht erledigt ein Template, weil ein Mensch den Text zuerst liest."
  - "Einen Agenten mit Aktionen brauchen Sie, wenn das System den nächsten Schritt selbst wählt, ohne Mensch dazwischen antwortet oder Datensätze schreibt."
  - "Auf einem Standard-Modell kostet ein Prompt 4 Flex Credits pro 2.000 Tokens, jede Agentenaktion 20 Credits plus ihre Prompts."
  - "Für Winter '26 hat Salesforce JSON-Ausgabe und asynchrone Batches mit bis zu 1.000 Prompts für Prompt Builder genannt."
  - "Ein getestetes Template wird zur Referenzaktion, wenn später ein Agent kommt, und ist deshalb keine verlorene Arbeit."
faq:
  - q: "Was ist der Unterschied zwischen Prompt Builder und einem Agentforce-Agenten?"
    a: "Prompt Builder erstellt wiederverwendbare Prompt-Templates, die ein Button, ein Flow, Apex oder ein Agent für genau einen Generierungsschritt aufruft. Ein Agentforce-Agent entscheidet zur Laufzeit, welche Aktion er ausführt, führt ein Gespräch und ändert Datensätze nur über vordefinierte Aktionen."
  - q: "Kann ein Agentforce-Agent ein Prompt-Template nutzen?"
    a: "Ja. Ein Prompt-Template kann neben Flow und Apex die Referenzaktion hinter einer eigenen Agentenaktion sein. Salesforce bezeichnet Flow- und Apex-Aktionen als deterministisch und Template-Aktionen als Aktionen mit einem gewissen Grad an Zufall."
  - q: "Was kostet ein Prompt-Template pro Aufruf?"
    a: "Salesforce zählt Prompts pro Aufruf des LLM-Gateways in Einheiten von bis zu 2.000 Tokens, aufgerundet. Eine Einheit kostet 2 Credits bei Basic-, 4 bei Standard- und 16 bei Advanced-Modellen. Bei 500 € pro 100.000 Credits kostet eine Zusammenfassung mit 5.000 Tokens auf einem Standard-Modell 0,06 €."
  - q: "Wird ein Prompt-Template doppelt berechnet, wenn ein Agent es aufruft?"
    a: "Der Hilfeartikel von Salesforce zu den abrechenbaren Nutzungsarten sagt nicht, ob ein Template als Agentenaktion als eine Aktion plus Prompts zählt. Ich plane beides ein und vergleiche im Pilotbetrieb mit dem tatsächlichen Verbrauch."
  - q: "Wie teste ich ein Prompt-Template im Vergleich zu einem Agenten?"
    a: "Agententests laufen nur in Sandboxes, verbrauchen Credits und können Daten ändern. Für Templates hat Salesforce auf der Dreamforce 2026 Batch Prompt Testing als Beta angekündigt, das ein Template in einem Durchlauf gegen viele echte Eingaben laufen lässt."
draft: false
---

Prompt Builder oder Agentforce-Agent: Ein Template reicht, wenn ein Datensatz hineingeht, ein Text herauskommt und ein Mensch ihn liest, bevor etwas passiert. Serviceberichtstexte, Fallzusammenfassungen, Antwortentwürfe für Händler und eine nächtliche Übersicht offener Garantiefälle passen in dieses Muster. Einen Agenten brauchen Sie, wenn das System den nächsten Schritt selbst wählt, einem Händler ohne Mensch dazwischen antwortet oder Datensätze schreibt. Ein Standard-Prompt kostet 4 Flex Credits pro 2.000 Tokens, eine Agentenaktion 20 Credits vor jedem Prompt. Ich starte mit dem Template und ergänze den Agenten nur, wo der Dialog sich rechnet.

## Was unterscheidet ein Prompt-Template von einem Agenten?

[Prompt Builder](https://trailhead.salesforce.com/content/learn/modules/prompt-builder-basics/get-to-know-prompt-builder) erstellt wiederverwendbare Prompt-Templates. Trailhead nennt vier Typen: Sales Email, Field Generation, Record Summary und Flex für alles Übrige. Ein Template liest Salesforce-Daten über Merge-Felder, Flow, Data 360 oder Apex, und der aufgelöste Prompt läuft durch den Einstein Trust Layer, der sensible Daten maskiert. Aufgerufen wird das Template von außen: über einen Einstein-Button neben einem Feld auf der Datensatzseite oder als [aufrufbare Aktion in Flow, Apex oder der Connect REST API](https://developer.salesforce.com/blogs/2024/04/invoke-prompt-templates-from-flow-apex-or-the-rest-api).

Ein Agent entscheidet selbst, welche Aktion als Nächstes kommt. Laut [Trailhead zur Anpassung von Agenten](https://trailhead.salesforce.com/content/learn/modules/agent-customization-quick-look/customize-your-agents) kann ein Agent Daten lesen, aber "can't change records without a predefined agent action". Aktionen basieren auf Flow, Apex oder einem Prompt-Template. Salesforce nennt Flow- und Apex-Aktionen deterministisch und schreibt, eine Template-Aktion "involves a degree of randomness".

Die eigentliche Frage lautet also: Wer entscheidet über den nächsten Schritt? Beim Template entscheidet Ihr Prozess: Der Techniker drückt den Button, der Flow läuft um zwei Uhr nachts. Beim Agenten entscheidet das Sprachmodell innerhalb von Grenzen, die Sie entwerfen. Wie das geht, beschreibe ich in [Agent Script statt LLM-Urteil](../agent-script-regeln-statt-llm/).

## Aufgaben im After-Sales, die ein Template abdeckt

Vier typische Aufgaben im After-Sales-Service funktionieren gut mit einem Template:

- **Serviceberichtstext.** Aus den Notizen des Technikers und den verbauten Ersatzteilen am Arbeitsauftrag wird ein lesbarer Text für den Kunden. Ein Field-Generation-Template schreibt in ein langes Textfeld; schreibgeschützte Felder unterstützt es laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/prompt-builder-basics/build-a-field-generation-prompt-template) nicht. Der Techniker im Außendienst korrigiert den Text, bevor der Bericht rausgeht.
- **Fallzusammenfassung.** Ein Record-Summary-Template fasst einen Fall mit E-Mails und Verlauf zusammen, wenn der Second-Level-Support oder Field Service übernimmt. Der Leser ist ein Kollege, der die Maschine kennt.
- **Antwortentwurf für Händler.** Ein Sales-Email- oder Flex-Template entwirft die Antwort auf die Frage eines Händlers nach einem Ersatzteil oder Liefertermin. Die Servicemitarbeiterin prüft und versendet ihn.
- **Nächtliche Übersicht offener Garantiefälle.** Der [Salesforce-Entwicklerblog vom Oktober 2025](https://developer.salesforce.com/blogs/2025/10/build-and-optimize-agents-with-new-agentforce-360-features) nennt für Winter '26 die Batch-Verarbeitung: bis zu 1.000 Prompts laufen asynchron, gestartet aus einem Flow oder über einen `AiJobRun`-Datensatz in Apex. Derselbe Beitrag ergänzt JSON-Ausgabe mit Syntaxprüfung, sodass das Ergebnis direkt in Felder geht. Die Garantiesachbearbeitung startet morgens mit einem kurzen Stand pro Fall. Den Prozess dahinter beschreibe ich in [Garantieansprüche von Händlern](../garantieansprueche-haendler-salesforce/).

Der Blog kennzeichnet nur Prompt Builder selbst als GA. Prüfen Sie deshalb die Release Notes für Ihre Org, bevor Sie den Batch einplanen.

Alle vier haben dieselbe Form: eine bekannte Eingabe, ein Generierungsschritt und ein Mensch, der das Ergebnis liest. Der Text selbst bestellt nichts, bucht keinen Termin und erstellt keine Gutschrift.

## Wann brauchen Sie einen Agenten mit Aktionen?

Ich würde einen Agenten nur bauen, wenn mindestens eine dieser Bedingungen gilt:

1. **Niemand liest die Antwort vorher.** Ein Händler fragt um 22 Uhr im Portal, und die Antwort geht direkt raus. Dann brauchen Sie Leitplanken, Tests und einen Eskalationsweg.
2. **Die Reihenfolge der Schritte hängt von der Antwort ab.** Händler identifizieren, Anspruch prüfen, Auftragsstatus aus SAP lesen, Alternativteil anbieten. Ein Flow schafft das bei festem Ablauf; ein Agent lohnt sich, wenn die Frage des Händlers den Weg bestimmt.
3. **Etwas muss geschrieben werden.** Einen Fall anlegen, einen Außendiensttermin buchen oder eine Ersatzteilbestellung auslösen ist eine Aktion.
4. **Das Gespräch hat mehrere Runden.** Rückfragen wie "und der Dichtungssatz?" brauchen Kontext über mehrere Nachrichten.

Trifft keine Bedingung zu, bringt der Agent Kosten und Testaufwand ohne Mehrwert. Eine SAP-Abfrage plus ein Text ist ein Flow, der ein Template aufruft.

## Was kostet ein Prompt im Vergleich zu einer Agentenaktion?

Salesforce zählt Prompts pro Aufruf des LLM-Gateways. Laut [Hilfeartikel zu den abrechenbaren Nutzungsarten](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5) deckt ein Prompt bis zu 2.000 Tokens Ein- und Ausgabe ab, aufgerundet; 6.500 Tokens zählen als vier Prompts. Die [Rate Card vom 31. August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) bepreist sie nach Modellstufe, die [Seite zur Modellunterstützung](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm&type=5) ordnet die Modelle zu:

| Zähler | Credits | Beispielmodelle | Listenpreis in EUR |
|---|---|---|---|
| Basic Prompt | 2 | GPT-5 Mini | 0,01 € |
| Standard Prompt | 4 | Claude Haiku 4.5, Claude Sonnet 4.6, Claude Sonnet 5, GPT-5 | 0,02 € |
| Advanced Prompt | 16 | Claude Opus 4.8, GPT 5.5 | 0,08 € |
| Agentenaktion | 20 (Sandbox 16) | | 0,10 € |

Die Euro-Werte beruhen auf dem Listenpreis von 500 € pro 100.000 Credits auf der [EU-Preisseite von Agentforce](https://www.salesforce.com/eu/agentforce/pricing/). Prompts kosten in der Sandbox genauso viel wie in Produktion.

Eine Fallzusammenfassung mit 5.000 Tokens ist auf einem Standard-Modell drei Prompts, also 12 Credits. Auf einem Advanced-Modell kostet dieselbe Zusammenfassung 48 Credits, mehr als zwei Agentenaktionen. Günstig macht ein Template erst die Modellstufe, die Sie wählen.

```hinweis offen
Der Hilfeartikel sagt nicht, ob ein Template, das ein Agent als Aktion aufruft, als eine Aktion plus Prompts zählt. Ich plane beides ein, bis der Pilot den tatsächlichen Verbrauch zeigt.
```

Alle weiteren Zähler stehen in [Flex Credits pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).

## Rechenbeispiel: erst Templates, dann der Händleragent

Nehmen wir einen Maschinenbauer mit Service Cloud, Field Service, Händlerportal und SAP. Alle Mengen sind Annahmen, gerechnet auf einem Standard-Modell:

| Aufgabe pro Monat | Annahme | Credits |
|---|---|---|
| Fallzusammenfassungen | 2.000 × 5.000 Tokens = 3 Prompts × 4 | 24.000 |
| Antwortentwürfe für Händler | 1.500 × 3.000 Tokens = 2 Prompts × 4 | 12.000 |
| Serviceberichtstexte | 600 × 4.000 Tokens = 2 Prompts × 4 | 4.800 |
| Garantie-Batch | 80 geänderte Fälle × 20 Nächte × 2 Prompts × 4 | 12.800 |
| **Templates gesamt** | | **53.600, etwa 268 €** |

Die Serviceleitung möchte nun, dass Händler im Portal ohne Servicemitarbeiter Antworten bekommen. Angenommen, der Agent führt pro Gespräch vier Aktionen aus und ruft das Antwort-Template einmal mit zwei Prompts auf. 1.500 Gespräche kosten dann 1.500 × (80 + 8) = 132.000 Credits, etwa 660 € im Monat. Das ist das Elffache der 60 € für die Entwürfe.

Hinzu kommen Tests. Eine Suite mit 100 Gesprächen zu je vier Aktionen à 16 Credits und zwei Prompts kostet 7.200 Credits pro Lauf. Zehn Läufe vor dem Go-live sind 72.000 Credits, etwa 360 €.

Der Agent lohnt sich, wenn er mehr Arbeitszeit im Service spart als die zusätzlichen 600 € im Monat und die Tests kosten, etwa wenn Händler in anderen Zeitzonen heute bis zum nächsten Morgen warten. Antwortet Ihr Service ohnehin innerhalb einer Stunde, würde ich bei den Entwürfen bleiben. Die vollständige Rechnung für einen Auftragsstatus-Agenten finden Sie unter [was ein Serviceagent für Händleranfragen kostet](../serviceagent-haendleranfragen-kosten/).

## Ein Template testen Sie anders als einen Agenten

Ein Template hat eine Eingabe und eine Ausgabe, also testen Sie es mit echten Datensätzen. Salesforce hat auf der [Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/) Batch Prompt Testing als Beta angekündigt, das ein Template in einem Durchlauf gegen viele echte Eingaben laufen lässt. Reference Visibility ist GA und zeigt vor einer Änderung jeden Flow und jede Aktion, die von einem Template abhängt. Templates sind Metadaten vom Typ [GenAiPromptTemplate](https://developer.salesforce.com/docs/atlas.en-us.252.0.api_meta.meta/api_meta/meta_genaiprompttemplate.htm), gehören also ins Repository und durch die Pipeline wie ein Flow.

Ein Agent braucht mehr. [Agententests laufen nur in Sandboxes](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html), und Salesforce warnt: "running tests consumes requests and credits and can modify data". Sie testen Aktionswahl und Antworten, legen Erfolgsquoten fest und entscheiden, unter welchem Benutzer der Agent läuft, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) beschrieben. Für einen Entwurf, den der Service ohnehin korrigiert, steht dieser Aufwand in keinem Verhältnis.

Ein Flex-Template funktioniert auch außerhalb von Salesforce. [Hosted MCP Server](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/prompt-builder.html) veröffentlichen es als MCP-Prompt, den ein Benutzer in Claude oder Cursor auswählt, mit dessen Berechtigungen und demselben Credit-Verbrauch wie in der Salesforce-Oberfläche. ChatGPT unterstützt MCP-Prompts laut dieser Seite nicht.

## Mit den Textaufgaben in Service und Vertrieb beginnen

```schritte
Textaufgaben auflisten
  In Service und Vertrieb, mit Volumen und Leser.
Templates bauen
  Für die Aufgaben, bei denen ein Mensch den Text liest. Starten Sie auf einem Standard-Modell und wechseln Sie nur, wenn Tests eine Qualitätslücke zeigen.
Nachbearbeitung messen
  Versendet der Service die meisten Entwürfe unverändert, ist das das Argument für den nächsten Schritt.
Einen Agenten ergänzen
  Nur dort, wo niemand vorher lesen soll, der Weg variiert oder etwas geschrieben werden muss. Verwenden Sie das getestete Template als Referenzaktion des Agenten.
```

Welches Werkzeug auf der Salesforce-Plattform zu welcher Aufgabe passt, steht im Masterclass-Kapitel zu [Salesforce-Werkzeugen für KI-Entwicklung](../../masterclass/ki-salesforce/salesforce-werkzeuge-ki-entwicklung/). Solche Entscheidungen sind Teil meiner [Salesforce-Architekturarbeit](../../leistungen/salesforce-architektur/).
