---
title: "Mehrsprachige Agentforce-Agenten für Händler im Export"
description: "Welche Sprachen Agentforce in Text und Voice beherrscht, was Übersetzung und Tokens kosten und wie Sie Wissen für Händler in Exportmärkten pflegen."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: mehrsprachige-agentforce-agenten-export
translationKey: multilingual-dealer-agents
topic: ai
categories: [ai, manufacturing-cloud]
tags: [Agentforce, Mehrsprachigkeit, Knowledge, Flex Credits, Händlerservice, Maschinenbau]
takeaways:
  - "Für den Agentforce Service Agent listet Salesforce 56 Sprachen, 25 davon Beta. Agentforce Voice hat sieben GA-Sprachen, Polnisch und Tschechisch als Beta."
  - "Für den Translation-Zähler fallen 4.000 Flex Credits pro Million Zeichen an, rund 20 €; Real-Time Translations nutzt zuerst 250.000 freie Zeichen pro Nutzer."
  - "Tokenzahlen hängen von Modell und Sprache ab, und Prompts zählen in Einheiten von 2.000 Tokens. Eine längere Antwort kann so zwei Einheiten kosten."
  - "Der Standard-Retriever filtert Wissensartikel nach der festen Sitzungssprache; eine italienische Sitzung findet also nur italienische Artikel."
  - "Ich würde Wissen in ein oder zwei Sprachen pflegen, Sicherheits- und Gewährleistungsinhalte pro Land halten und jede Sprache vor dem Go-live testen."
faq:
  - q: "Welche Sprachen unterstützt Agentforce?"
    a: "Die Hilfeseite zum Agentforce Service Agent nennt 56 Sprachen. 31 tragen kein Beta-Label, darunter Deutsch, Französisch, Italienisch, Spanisch, Polnisch, Tschechisch und Türkisch. 25 sind Beta, etwa Russisch, Ukrainisch, Slowakisch und Arabisch; dort liegt die Qualitätssicherung laut Salesforce beim Kunden. Geprüft hat Salesforce Standardaktionen und Informationsabruf, nicht Ihre Fachbegriffe."
  - q: "Spricht Agentforce Voice Französisch oder Polnisch?"
    a: "Ja. Die Hinweise zu Agentforce Voice in der Salesforce-Hilfe führen Französisch für Frankreich und Kanada als allgemein verfügbar, neben Englisch, Deutsch, Italienisch, Japanisch, Portugiesisch und Spanisch. Polnisch und Tschechisch sind Beta. Ein Voice-Agent spricht nur seine Standardsprache, üblich ist daher eine Hotline-Nummer pro Sprache."
  - q: "Was kostet Übersetzung in Agentforce?"
    a: "Die Flex-Credits-Rate-Card nennt für Translation 4.000 Credits pro Million übersetzter Zeichen, zum Listenpreis rund 20 €. Salesforce dokumentiert den Zähler für Funktionen wie Real-Time Translations. Diese Funktion nutzt zuerst 250.000 freie Zeichen pro Nutzer und Monat. Dass ein Agent, der in der Sprache des Händlers antwortet, diesen Zähler nutzt, habe ich auf keiner Salesforce-Seite gefunden."
  - q: "Brauche ich Wissensartikel in jeder Händlersprache?"
    a: "Nicht zwingend. Der Standard-Retriever filtert nach Sitzungssprache. Entweder pflegen Sie Artikel pro Sprache, oder Sie bauen einen eigenen Retriever ohne Sprachfilter. Salesforce selbst hält das Wissen seiner Help-Seite auf Englisch und übersetzt Frage und Antwort."
  - q: "Warum sind Prompts auf Deutsch oder Polnisch teurer als auf Englisch?"
    a: "Nicht automatisch. Tokenzahlen hängen von Modell und Sprache ab, und Salesforce rechnet Prompts in Einheiten von insgesamt 2.000 Eingabe- und Ausgabetokens ab. Überschreitet ein Prompt diese Grenze, zählt er doppelt. Messen Sie mit Ihrem Modell und echten Händlerfragen. Aktionen kosten pro Aufruf, unabhängig von der Sprache."
draft: false
---

Mehrsprachige Agentforce-Agenten können Händler in den meisten Exportmärkten heute bedienen. Salesforce listet für den Agentforce Service Agent 56 Sprachen, 25 davon als Beta, und für Agentforce Voice sieben allgemein verfügbare Sprachen. Die Übersetzung selbst ist mit 4.000 Flex Credits pro Million Zeichen günstig. Die eigentlichen Entscheidungen liegen woanders: Prompts können eine Tokenstufe überschreiten, und der Retriever findet standardmäßig nur Wissensartikel in der Sitzungssprache des Händlers. Ich würde Wissen in ein oder zwei Sprachen pflegen, Sicherheits- und Gewährleistungsinhalte pro Land halten und jede Sprache vor dem Go-live testen.

## Welche Sprachen unterstützt Agentforce in Text und Voice?

Die [Hinweisseite zum Agentforce Service Agent](https://help.salesforce.com/s/articleView?language=en_US&id=sf.service_agent_considerations.htm&type=5) nennt 56 Sprachen. 25 tragen ein Beta-Label, darunter Russisch, Ukrainisch, Slowakisch, Serbisch, Litauisch und Arabisch. Die übrigen 31 haben keines, etwa Deutsch, Französisch für Frankreich und Kanada, Italienisch, Spanisch, Polnisch, Tschechisch und Türkisch.

Das Label hat Folgen. Im [Leitfaden zur Mehrsprachigkeit in Agentforce](https://www.salesforce.com/blog/multi-language-guide/) schreibt Salesforce, dass bei Beta-Sprachen der Kunde für die Qualitätssicherung verantwortlich ist. GA bedeutet dort, dass Salesforce die Antwortqualität geprüft hat. Geprüft hat Salesforce laut Hilfeseite Standardaktionen und Informationsabruf. Für einen Exporteur heißt das: Tschechisch ist nicht als Beta markiert, das benachbarte Slowakisch ist ein Beta-Fall, den Sie selbst testen müssen. Ihre Teilenamen testen Sie in beiden Sprachen.

Für Voice ist die Liste kürzer. Die [Hinweise zu Agentforce Voice](https://help.salesforce.com/s/articleView?id=ai.agentforce_voice_considerations.htm&language=en_US&type=5) nennen sieben allgemein verfügbare Sprachen: Englisch, Französisch für Frankreich und Kanada, Deutsch, Italienisch, Japanisch, brasilianisches Portugiesisch und Spanisch. Polnisch, Tschechisch, Niederländisch und ein Dutzend weitere sind Beta. Ein Voice-Agent ist einsprachig: Er hört und antwortet nur in seiner Standardsprache. Die erlaubten Sprachen der Textagenten gelten hier nicht. Wie eine Hotline aufgebaut sein sollte, steht in [Störungshotline mit Agentforce Voice](/blog/stoerungshotline-agentforce-voice-deutsch/).

```hinweis tipp
Für französische, deutsche und italienische Händler funktioniert eine Sprachhotline mit GA-Sprachen. Polnische oder tschechische Hotlines sind Beta: Testen Sie Abruf und Teilenamen gründlich vor dem Produktivbetrieb.
```

## Woher kommt die Sprache des Agenten?

Der Leitfaden wurde für den früheren Agentforce Builder geschrieben und beschreibt drei Einstellungen. Die **End User Language** stammt aus dem Kanal, im Enhanced Chat aus einem Pre-Chat-Feld, das sich aus der Browsersprache füllen lässt. Die **Standardsprache** dient als Fallback. **Zusätzliche Sprachen**, in der [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=ai.agent_language_support.htm&language=en_US&type=5) heute Allowed Languages, vervollständigen die Liste der erlaubten Sprachen. Der Adaptive Language Mode, derzeit in Beta, kann auch außerhalb dieser Liste antworten, aber nicht in Voice.

Zu Beginn der Sitzung speichert Agentforce die ermittelte Sprache als Localization Context. Laut Leitfaden ändert sich dieser Wert während der gesamten Sitzung nicht. Die Antwortsprache richtet sich dagegen nach jeder Nachricht, solange die Sprache erlaubt ist.

Für ein Händlerportal hat das zwei Folgen. Erstens filtert die Sitzungssprache das Wissen. So wie ich den Leitfaden lese, erhält ein polnischer Händler mit englischer Browsersprache Antworten auf Polnisch, die auf englischen Artikeln basieren. Zweitens übernehmen eigene Aktionen die Sprache nicht automatisch. Aktionen, die externe Dienste aufrufen, brauchen eine ausdrückliche Einrichtung in Apex oder Flow. Hält Ihr ERP Teilebezeichnungen pro Sprache vor, muss die Aktion die richtige Sprachversion anfordern.

## Was kostet die Übersetzung zur Laufzeit?

Die [Flex-Credits-Rate-Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) vom 3. November 2026 nennt drei Sprachzähler, hier umgerechnet zum [EU-Listenpreis von 500 € pro 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/). Der Translation-Zähler gilt auch in der Sandbox.

```kennzahlen
4.000 Credits | Translation pro Million Zeichen, rund 20 €
6.000 Credits | Text to Speech pro Million Zeichen, rund 30 €
150 Credits | Speech to Text pro Stunde Transkription, rund 0,75 €
quelle: Salesforce Flex Credits Rate Card vom 03.11.2026,
  EU-Listenpreis laut Agentforce-Preisseite
```

Ein Händlergespräch mit 2.500 Zeichen zu übersetzen kostet 10 Credits, also 0,05 €. Drei Aktionen im selben Gespräch kosten 60 Credits. Die Sprachzähler sind nicht der Preis einer Voice-Hotline: Agentforce Voice rechnet Voice-Aktionen mit 30 Credits ab oder, wo vertraglich vereinbart, nach Voice-Minuten; diese haben dann Vorrang.

Unklar ist, wann der Zähler läuft. Der [Hilfeartikel zu abrechenbaren Nutzungsarten](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5) misst Übersetzung nach verarbeiteten Zeichen und verweist auf die Dokumentation der jeweiligen Funktion. Die Preisseite sagt, Flex Credits gelten gleichermaßen für Aktionen, Prompts, Übersetzungen und Voice-Aktionen. Salesforce dokumentiert den Zähler für Funktionen wie Real-Time Translations und die Übersetzung von Wissensartikeln. Dass ein Agent, der in der Sprache des Händlers antwortet, diesen Zähler nutzt, habe ich auf keiner Salesforce-Seite gefunden; das Modell schreibt die Antwort meist direkt in dieser Sprache. Beobachten Sie im Pilot das [Digital Wallet](/blog/flex-credits-agentforce-kosten-pro-aktion/).

Für Servicemitarbeitende gibt es eine eigene Funktion. [Real-Time Translations](https://help.salesforce.com/s/articleView?language=en_US&id=service.messaging_translate_2.htm&type=5) übersetzt Enhanced Chat und Messaging zwischen Händler und Mitarbeitenden. Sie braucht die Agentforce-for-Service-SKU plus eine Permission Set License und unterstützt eigene Terminologie für bis zu zehn Sprachen. Laut [Hinweisseite](https://help.salesforce.com/s/articleView?id=service.real_time_translations_considerations.htm&language=en_US&type=5) erhält jeder Nutzer mit der Agentforce-Add-on-Lizenz 250.000 Zeichen im Monat; erst darüber werden Flex Credits verbraucht.

## Prompts in anderen Sprachen können eine Tokenstufe überschreiten

Ein Token ist die Einheit, die ein Sprachmodell liest und schreibt, oft ein Wortteil. Das [Help Center von OpenAI](https://help.openai.com/en/articles/4936856-understanding-and-counting-tokens) nennt als Faustregel ein Token pro etwa vier Zeichen und merkt an, dass andere Sprachen ein anderes Verhältnis zwischen Zeichen, Wörtern und Tokens haben können.

Bei Flex Credits wirkt das in Stufen. Laut Hilfeartikel zählen Prompts in Einheiten von 2.000 Tokens, wobei Eingabe und Ausgabe zusammengezählt und aufgerundet werden. Das Beispiel dort: Ein Prompt mit 6.500 Tokens zählt als vier Prompts. Aktionen kosten pro Aufruf, egal in welcher Sprache. Eine Antwort mit Wissensbezug, die auf Englisch 1.750 Tokens braucht, passt in eine Einheit. Tokenzahlen hängen von Modell und Sprache ab. Nehmen wir an, Eingabe und Ausgabe brauchen in einer anderen Sprache zusammen ein Viertel mehr Tokens. Dann sind es rund 2.190 Tokens und zwei Einheiten, also 8 statt 4 Credits auf einem Standard-Modell. Messen Sie das mit Ihrem Modell, bevor Sie es einplanen. Die Methode steht in [Flex Credits und Agentforce-Kosten pro Aktion](/blog/flex-credits-agentforce-kosten-pro-aktion/), die Grundlagen im Masterclass-Kapitel [Kosten und Token](/masterclass/ki-salesforce/kosten-und-token/).

Die Qualität ist der zweite Grund, pro Sprache zu testen. Der Leitfaden warnt, dass die meisten großen Sprachmodelle überwiegend mit Englisch trainiert sind. Ich würde die Anweisungen einmal schreiben und in jeder erlaubten Sprache testen.

## Wissen pro Sprache pflegen oder zur Laufzeit übersetzen?

Standardmäßig folgt das Wissen dem festen Localization Context der Sitzung. Wissensartikel haben ein Sprachfeld, und laut Leitfaden filtert der Retriever Artikel heraus, deren Sprache nicht zum Kontext passt. Eine italienische Sitzung findet nur italienische Artikel. Pflegen Sie nur Deutsch und Englisch, hat der Agent keine Grundlage, es sei denn, Sie bauen einen eigenen Retriever ohne Sprachfilter, wie es der Leitfaden vorschlägt. Hochgeladene Dateien haben keinen Localization Context. Ihre Ausgabe bleibt laut Leitfaden in der Originalsprache. So wie ich das lese, kann ein deutsches PDF-Handbuch einem französischen Händler deutschen Text liefern.

Salesforce nutzt für die eigene Help-Seite eine Pivotsprache. [Jim Roth, President of Customer Success bei Salesforce](https://www.salesforce.com/blog/agentforce-language-capabilities/), beschreibt es so: Die Frage wird ins Englische übersetzt, Data Cloud durchsucht die englische Wissensbasis, Agentforce übersetzt die Antwort zurück. Sieben Sprachen decken dort 94 Prozent des weltweiten Fallvolumens ab, ohne Hunderttausende Dokumente zu übersetzen.

Artikel pro Sprache kosten Aufwand, den die Rate Card nicht zeigt. [Salesforce Knowledge](https://help.salesforce.com/s/articleView?language=en_US&id=sf.knowledge_setup_multilingual.htm&type=5) unterstützt pro Sprache eine standardmäßig zuständige Person und eine prüfende Person, den Export an einen Übersetzungsdienstleister und laut [Lightning Knowledge Guide](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/lightning_knowledge_guide.pdf) eine Markierung „Out of Date“, wenn sich der Ausgangsartikel ändert. Einmal hinzugefügte Sprachen lassen sich nicht entfernen. Bei zwölf Händlersprachen erzeugt jede Änderung an einem deutschen Artikel bis zu zwölf Übersetzungsaufgaben. Handbücher in einem Data-360-Index werden pro Sprache erneut verarbeitet, im Basistarif mit 150 Credits pro MB; ist für die Bibliothek das KI-gestützte Intelligent Processing aktiv, gilt ein eigener, höherer Zähler, und jeder Abruf verbraucht zusätzlich Credits für Data-360-Abfragen. Siehe [Data-360-Kosten für KI-Agenten](/blog/data-360-kosten-fuer-ki-agenten/).

Meine Aufteilung für einen Maschinenbauer:

- **Pro Sprache und Markt:** Sicherheitshinweise und Gewährleistungsbedingungen, die sich je Land unterscheiden. Der Sprachfilter trennt Frankreich nicht von Kanada. Diese Artikel brauchen also zusätzlich Markt- und Produktfilter.
- **Nur Hauptsprachen:** Artikel zur Fehlersuche und FAQs.
- **Über eine Pivotsprache:** Handbücher und Ersatzteilkataloge, ohne ihre Sicherheitskapitel.
- **Ohne übersetztes Wissen:** Auftragsstatus und Liefertermine, die der Agent aus dem ERP liest. Statustexte und Datumsformate brauchen trotzdem lokalisierte Bezeichnungen.

Maschinelle Übersetzung kann Teilebezeichnungen verändern, und der Leitfaden verspricht nicht, dass sein Workaround mit Keep-Tags einen Begriff zuverlässig schützt. Teilebezeichnungen gehören in eine Terminologieliste und in die Testfälle.

## Rechenbeispiel: Händler in 20 Ländern

Nehmen wir einen Maschinenbauer mit Händlern in 20 Ländern und 13 Sprachen an. Das Wissen wird auf Deutsch und Englisch gepflegt, die Handbücher umfassen 150 MB pro Sprache. Angenommen sind 4.000 Händlergespräche im Monat, davon 1.600 in den elf übrigen Sprachen. Alle Mengen sind Annahmen, die Multiplikatoren stammen aus der Rate Card.

| Posten | Credits | EUR |
|---|---|---|
| Aktionen, 4.000 × 3 × 20, monatlich | 240.000 | 1.200 |
| Zusätzliche Prompt-Einheiten, 1.600 × 4, monatlich | 6.400 | 32 |
| Übersetzung, 1.600 × 2.500 Zeichen, monatlich | 16.000 | 80 |
| Handbücher indexiert in 2 Sprachen, einmalig | 45.000 | 225 |
| Handbücher indexiert in 13 Sprachen, einmalig | 292.500 | 1.463 |
| Sandbox-Tests, 13 × 40 Gespräche, einmalig | 29.120 | 146 |

Bei den zusätzlichen Prompt-Einheiten ist unterstellt, dass einer von zwei Prompts pro Gespräch die Grenze von 2.000 Tokens überschreitet. Für ein Testgespräch sind drei Aktionen zu 16 Sandbox-Credits und zwei Prompts zu je 4 angesetzt. Die vollständige Methode steht in [Agentforce-Kosten für Hersteller](/blog/flex-credits-agentforce-kosten-pro-aktion/).

Läuft ein Übersetzungszähler und überschreitet jede fremdsprachige Interaktion eine Tokenstufe, kostet die Sprache bis zu 112 € im Monat zusätzlich zu 1.200 € für Aktionen. Handbücher in allen 13 Sprachen zu indexieren kostet das Sechseinhalbfache der Indexierung in zwei Sprachen, und jede Version braucht Pflege. Die Budgetfrage ist die Zahl der gepflegten Sprachen, nicht der Preis pro Zeichen.

## Händlersprachen nach Volumen auflisten

1. **Händlersprachen nach Volumen auflisten**, aus den Fällen und E-Mails der letzten drei Monate.
2. **Jede Sprache prüfen** auf der Hilfeseite: ohne Label, Beta oder fehlend. Voice gesondert prüfen.
3. **Standard- und Zusatzsprachen festlegen** und klären, wie das Portal die Sitzungssprache setzt.
4. **Die Aufteilung des Wissens entscheiden** und ob Sie einen eigenen Retriever brauchen.
5. **Eine Terminologieliste schreiben** mit Teilebezeichnungen und Fehlercodes.
6. **Jede erlaubte Sprache testen** mit echten Händlerfragen.

Bei einem Rollout über mehrere Länder wird die Sprache zu einer Spalte in der Tabelle aus [Manufacturing Cloud weltweit ausrollen](/blog/manufacturing-cloud-weltweit-ausrollen/). Sprachauswahl und Retriever-Design gehören zu meiner Arbeit in der [Salesforce-Architektur](/leistungen/salesforce-architektur/).
