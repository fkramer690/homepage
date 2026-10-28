---
title: "Mehrsprachige Agentforce-Agenten für Händler im Export"
description: "Welche Sprachen Agentforce in Text und Voice beherrscht, was Übersetzung kostet, warum andere Sprachen mehr Tokens brauchen und wie Sie Wissen pflegen."
pubDate: 2026-10-27
lang: de
slug: mehrsprachige-agentforce-agenten-export
translationKey: multilingual-dealer-agents
topic: ai
categories: [ai, manufacturing-cloud]
tags: [Agentforce, Mehrsprachigkeit, Knowledge, Flex Credits, Händlerservice, Maschinenbau]
takeaways:
  - "Salesforce listet für den Agentforce Service Agent 56 Sprachen, 25 davon als Beta, darunter Russisch, Slowakisch und Ukrainisch. Agentforce Voice nennt sieben Sprachen und ergänzt \"many others\"."
  - "Übersetzung kostet 4.000 Flex Credits pro Million Zeichen, rund 20 €. Ein übersetztes Händlergespräch kostet damit etwa fünf Cent."
  - "Andere Sprachen brauchen oft mehr Tokens als Englisch, und Prompts werden in Einheiten von 2.000 Tokens abgerechnet. Dieselbe Antwort in einer anderen Sprache kann deshalb zwei Einheiten kosten statt einer."
  - "Standardmäßig filtert der Retriever Wissensartikel nach der Sitzungssprache. Ein italienischer Händler findet nur italienische Artikel, solange Sie keinen eigenen Retriever bauen."
  - "Ich würde Wissen in ein oder zwei Sprachen pflegen, Sicherheits- und Gewährleistungsinhalte pro Land halten und jede freigegebene Sprache vor dem Go-live testen."
faq:
  - q: "Welche Sprachen unterstützt Agentforce?"
    a: "Die Hilfeseite zum Agentforce Service Agent nennt 56 Sprachen. 31 tragen kein Beta-Label, darunter Deutsch, Französisch, Italienisch, Spanisch, Polnisch, Tschechisch und Türkisch. 25 sind Beta, etwa Russisch, Ukrainisch, Slowakisch und Arabisch; dort liegt die Qualitätssicherung laut Salesforce beim Kunden."
  - q: "Spricht Agentforce Voice Französisch oder Polnisch?"
    a: "Die Produktseite von Agentforce Voice nennt Englisch, Französisch, Spanisch, Italienisch, Deutsch, Portugiesisch und Japanisch. Die Dreamforce-Ankündigung 2026 spricht von kanadischem Französisch, lassen Sie sich Französisch für Frankreich also bestätigen. Polnisch wird nicht genannt, die Seite ergänzt aber „many others“."
  - q: "Was kostet Übersetzung in Agentforce?"
    a: "Die Flex-Credits-Rate-Card nennt für Translation 4.000 Credits pro Million übersetzter Zeichen, zum Listenpreis rund 20 €. Welche Agentenfunktionen diesen Zähler nutzen, steht auf keiner Preisseite. Fragen Sie Ihren Account Executive."
  - q: "Brauche ich Wissensartikel in jeder Händlersprache?"
    a: "Nicht zwingend. Der Standard-Retriever filtert nach Sitzungssprache. Entweder pflegen Sie Artikel pro Sprache, oder Sie bauen einen eigenen Retriever ohne Sprachfilter. Salesforce selbst hält das Wissen seiner Help-Seite auf Englisch und übersetzt Frage und Antwort."
  - q: "Warum sind Prompts auf Deutsch oder Polnisch teurer als auf Englisch?"
    a: "Derselbe Text zerfällt in anderen Sprachen oft in mehr Tokens, und Salesforce rechnet Prompts in Einheiten von 2.000 Eingabe- und Ausgabetokens ab. Überschreitet ein Prompt diese Grenze, zählt er doppelt. Aktionen kosten pro Aufruf, unabhängig von der Sprache."
draft: false
---

Mehrsprachige Agentforce-Agenten können Händler in den meisten Exportmärkten heute bedienen. Salesforce listet für den Agentforce Service Agent 56 Sprachen, 25 davon als Beta, und nennt für Agentforce Voice sieben. Die Übersetzung selbst ist mit 4.000 Flex Credits pro Million Zeichen günstig. Die eigentlichen Entscheidungen liegen woanders: Prompts in anderen Sprachen brauchen mehr Tokens, und der Retriever findet standardmäßig nur Wissensartikel in der Sitzungssprache des Händlers. Ich würde Wissen in ein oder zwei Sprachen pflegen, Sicherheits- und Gewährleistungsinhalte pro Land halten und jede Sprache vor dem Go-live testen.

## Welche Sprachen unterstützt Agentforce in Text und Voice?

Die [Hinweisseite zum Agentforce Service Agent](https://help.salesforce.com/s/articleView?language=en_US&id=sf.service_agent_considerations.htm&type=5) nennt 56 Sprachen. 25 tragen ein Beta-Label, darunter Russisch, Ukrainisch, Slowakisch, Serbisch, Litauisch und Arabisch. Die übrigen 31 haben keines, etwa Deutsch, Französisch für Frankreich und Kanada, Italienisch, Spanisch, Polnisch, Tschechisch und Türkisch.

Das Label hat Folgen. Im [Leitfaden zur Mehrsprachigkeit in Agentforce](https://www.salesforce.com/blog/multi-language-guide/) schreibt Salesforce, dass bei Beta-Sprachen der Kunde für die Qualitätssicherung verantwortlich ist. GA bedeutet dort, dass Salesforce die Antwortqualität geprüft hat. Für einen Exporteur heißt das: Händler in Tschechien sind abgedeckt, Händler nebenan in der Slowakei sind ein Beta-Fall, den Sie selbst testen.

Für Voice ist die Liste kürzer. Die [Produktseite von Agentforce Voice](https://www.salesforce.com/agentforce/voice/) nennt Englisch, Französisch, Spanisch, Italienisch, Deutsch, Portugiesisch und Japanisch, dazu „many others“, ohne zu sagen, welche. Die [Dreamforce-Ankündigungen 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/) sprechen von „Canadian French“, und ein [Hilfeartikel](https://help.salesforce.com/s/articleView?language=en_US&id=ai.agentforce_voice.htm&type=5) sagt noch, Agentforce Voice werde nur auf Englisch unterstützt. Wie eine Hotline aufgebaut sein sollte, steht in [Störungshotline mit Agentforce Voice](../stoerungshotline-agentforce-voice-deutsch/).

```hinweis offen
Lassen Sie sich Französisch für Frankreich bestätigen, bevor Sie eine Sprachhotline für französische Händler planen. Gleiches gilt für Polnisch und Tschechisch, die die Produktseite nicht nennt.
```

## Wie wählt der Agent seine Sprache?

Der Leitfaden, geschrieben für den bisherigen Agentforce Builder, beschreibt drei Einstellungen. Die **End User Language** kommt aus dem Kanal, im Enhanced Chat aus einem Pre-Chat-Feld, das sich aus der Browsersprache füllen lässt. Die **Standardsprache** greift als Rückfall. **Zusätzliche Sprachen** vervollständigen die Liste der erlaubten Sprachen.

Zu Beginn der Sitzung speichert Agentforce die ermittelte Sprache als Localization Context. Laut Leitfaden ändert sich dieser Wert während der gesamten Sitzung nicht. Die Antwortsprache folgt dagegen jeder Nachricht, solange die Sprache erlaubt ist.

Für ein Händlerportal hat das zwei Folgen. Erstens filtert die Sitzungssprache das Wissen. So wie ich den Leitfaden lese, bekommt ein polnischer Händler mit englischem Browser Antworten auf Polnisch, gebaut aus englischen Artikeln. Zweitens übernehmen eigene Aktionen die Sprache nicht automatisch. Aktionen, die externe Dienste aufrufen, brauchen eine ausdrückliche Einrichtung in Apex oder Flow. Hält Ihr ERP Teilebezeichnungen pro Sprache vor, muss die Aktion die richtige anfordern.

## Was kostet die Übersetzung zur Laufzeit?

Die [Flex-Credits-Rate-Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) vom 31. August 2026 nennt drei Sprachzähler, hier umgerechnet zum [EU-Listenpreis von 500 € pro 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/). Der Translation-Zähler läuft auch in der Sandbox.

```kennzahlen
4.000 Credits | Translation pro Million Zeichen, rund 20 €
6.000 Credits | Text to Speech pro Million Zeichen, rund 30 €
150 Credits | Speech to Text pro Stunde Transkription, rund 0,75 €
quelle: Salesforce Flex Credits Rate Card vom 31.08.2026,
  EU-Listenpreis laut Agentforce-Preisseite
```

Ein Händlergespräch mit 2.500 Zeichen zu übersetzen kostet 10 Credits, 0,05 €. Drei Aktionen im selben Gespräch kosten 60 Credits.

Unklar ist, wann der Zähler läuft. Der [Hilfeartikel zu abrechenbaren Nutzungsarten](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5) misst Übersetzung nach verarbeiteten Zeichen und verweist auf die Dokumentation der jeweiligen Funktion. Die Preisseite sagt, Flex Credits gelten gleichermaßen für Aktionen, Prompts, Übersetzungen und Voice-Aktionen. Welche Agentenfunktionen den Translation-Zähler nutzen, habe ich auf keiner Salesforce-Seite gefunden. Fragen Sie Ihren Account Executive und beobachten Sie [Digital Wallet](../digital-wallet-agentforce-kostenkontrolle/).

Für Servicemitarbeitende gibt es eine eigene Funktion. [Real-Time Translations](https://help.salesforce.com/s/articleView?language=en_US&id=service.messaging_translate_2.htm&type=5) übersetzt Enhanced Chat und Messaging zwischen Händler und Mitarbeitenden. Sie braucht die Agentforce-for-Service-SKU plus eine Permission Set License und nimmt eigene Terminologie für bis zu 10 Sprachen an. Wie die Nutzung abgerechnet wird, steht auf den Hilfeseiten, die ich gelesen habe, nicht.

## Warum brauchen Prompts in anderen Sprachen mehr Tokens?

Ein Token ist die Einheit, die ein Sprachmodell liest und schreibt, oft ein Wortteil. Das [Help Center von OpenAI](https://help.openai.com/en/articles/4936856-understanding-and-counting-tokens) nennt als Faustregel ein Token pro etwa vier Zeichen und merkt an, dass andere Sprachen ein anderes Verhältnis zwischen Zeichen, Wörtern und Tokens haben können.


Bei Flex Credits wirkt das in Stufen. Laut Hilfeartikel zählen Prompts in Einheiten von 2.000 Tokens, aufgerundet, Eingabe und Ausgabe zusammen. Das Beispiel dort: Ein Prompt mit 6.500 Tokens zählt als vier Prompts. Aktionen kosten pro Aufruf, egal in welcher Sprache. Eine Antwort mit Wissensbezug, die auf Englisch 1.750 Tokens braucht, passt in eine Einheit. Braucht dieselbe Antwort in einer anderen Sprache ein Viertel mehr Tokens, eine angenommene Größe, sind es rund 2.190 Tokens und zwei Einheiten, also 8 statt 4 Credits auf einem Standard-Modell. Die Methode steht in [Flex Credits und Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/), die Grundlagen im Masterclass-Kapitel [Kosten und Token](../../masterclass/ki-salesforce/kosten-und-token/).

Die Qualität ist der zweite Grund, pro Sprache zu testen. Der Leitfaden warnt, dass die meisten großen Sprachmodelle überwiegend mit Englisch trainiert sind. Ich würde die Anweisungen einmal schreiben und in jeder erlaubten Sprache testen.

## Wissen pro Sprache pflegen oder zur Laufzeit übersetzen?

Standardmäßig folgt das Wissen der Sitzungssprache. Wissensartikel haben ein Sprachfeld, und laut Leitfaden filtert der Retriever Artikel heraus, deren Sprache nicht zum Kontext passt. Ein italienischer Händler findet nur italienische Artikel. Pflegen Sie nur Deutsch und Englisch, hat der Agent keine Grundlage, es sei denn, Sie bauen, was der Leitfaden vorschlägt: einen eigenen Retriever ohne Sprachfilter. Hochgeladene Dateien haben keinen Localization Context, ihre Ausgabe bleibt laut Leitfaden in der Originalsprache. So wie ich das lese, kann ein deutsches PDF-Handbuch einem französischen Händler deutschen Text liefern.

Salesforce nutzt für die eigene Help-Seite eine Pivotsprache. [Jim Roth, President of Customer Success bei Salesforce](https://www.salesforce.com/blog/agentforce-language-capabilities/), beschreibt es so: Die Frage wird ins Englische übersetzt, Data Cloud durchsucht die englische Wissensbasis, Agentforce übersetzt die Antwort zurück. Sieben Sprachen decken dort 94 Prozent des weltweiten Fallvolumens ab, ohne Hunderttausende Dokumente zu übersetzen.

Artikel pro Sprache kosten Aufwand, den die Rate Card nicht zeigt. [Salesforce Knowledge](https://help.salesforce.com/s/articleView?language=en_US&id=sf.knowledge_setup_multilingual.htm&type=5) unterstützt pro Sprache eine zuständige Person und einen Prüfer, den Export an einen Übersetzungsdienstleister und laut [Lightning Knowledge Guide](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/lightning_knowledge_guide.pdf) eine Markierung „Out of Date“, wenn sich der Ausgangsartikel ändert. Einmal hinzugefügte Sprachen lassen sich nicht entfernen. Bei zwölf Händlersprachen erzeugt jede Änderung an einem deutschen Artikel bis zu zwölf Übersetzungsaufgaben. Handbücher in einem Data-360-Index werden pro Sprache erneut verarbeitet, im Basistarif mit 150 Credits pro MB, siehe [Data-360-Kosten für KI-Agenten](../data-360-kosten-fuer-ki-agenten/).

Meine Aufteilung für einen Maschinenbauer:

- **Pro Sprache:** Sicherheitshinweise und Gewährleistungsbedingungen, die sich je Land unterscheiden.
- **Nur Hauptsprachen:** Artikel zur Fehlersuche und FAQs.
- **Über eine Pivotsprache:** Handbücher und Ersatzteilkataloge.
- **Ohne Übersetzung:** Auftragsstatus und Liefertermine, die der Agent aus dem ERP liest.

Maschinelle Übersetzung benennt Teile um, und der Leitfaden verspricht nicht, dass sein Workaround mit Keep-Tags einen Begriff zuverlässig schützt. Teilebezeichnungen gehören in eine Terminologieliste und in die Testfälle.

## Ein typisches Szenario: Händler in 20 Ländern

Nehmen wir einen Maschinenbauer mit Händlern in 20 Ländern und 13 Sprachen an. Das Wissen wird auf Deutsch und Englisch gepflegt, die Handbücher umfassen 150 MB pro Sprache. Angenommen sind 4.000 Händlergespräche im Monat, davon 1.600 in den elf übrigen Sprachen. Alle Mengen sind Annahmen, die Multiplikatoren stammen aus der Rate Card.

| Posten | Credits | EUR |
|---|---|---|
| Aktionen, 4.000 × 3 × 20, monatlich | 240.000 | 1.200 |
| Zusätzliche Prompt-Einheiten, 1.600 × 4, monatlich | 6.400 | 32 |
| Übersetzung, 1.600 × 2.500 Zeichen, monatlich | 16.000 | 80 |
| Handbücher indexiert in 2 Sprachen, einmalig | 45.000 | 225 |
| Handbücher indexiert in 13 Sprachen, einmalig | 292.500 | 1.463 |
| Sandbox-Tests, 13 × 40 Gespräche, einmalig | 29.120 | 146 |

Die zusätzlichen Prompt-Einheiten unterstellen, dass einer von zwei Prompts pro Gespräch die Grenze von 2.000 Tokens überschreitet. Ein Testgespräch rechnet mit drei Aktionen zu 16 Sandbox-Credits und zwei Prompts zu je 4. Die vollständige Methode steht in [Agentforce-Serviceagent für Händler: Kosten pro Monat](../serviceagent-haendleranfragen-kosten/).

Die Sprache kostet im Szenario rund 112 € im Monat zusätzlich zu 1.200 € für Aktionen. Handbücher in allen 13 Sprachen zu indexieren kostet das Sechseinhalbfache des Index in zwei Sprachen, und jede Version braucht Pflege. Die Budgetfrage ist die Zahl der gepflegten Sprachen, nicht der Preis pro Zeichen.

## Wo sollten Sie anfangen?

1. **Händlersprachen nach Volumen auflisten**, aus den Fällen und E-Mails der letzten drei Monate.
2. **Jede Sprache prüfen** auf der Hilfeseite: ohne Label, Beta oder fehlend. Voice gesondert prüfen.
3. **Standard- und Zusatzsprachen festlegen** und klären, wie das Portal die Sitzungssprache setzt.
4. **Die Aufteilung des Wissens entscheiden** und ob Sie einen eigenen Retriever brauchen.
5. **Eine Terminologieliste schreiben** mit Teilebezeichnungen und Fehlercodes.
6. **Jede erlaubte Sprache testen** mit echten Händlerfragen.

Bei einem Rollout über mehrere Länder wird die Sprache eine Spalte in der Tabelle aus [Manufacturing Cloud weltweit ausrollen](../manufacturing-cloud-weltweit-ausrollen/). Sprachauswahl und Retriever-Design gehören zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Ein mehrsprachiger Händleragent kostet bei der Übersetzung wenig, das Geld steckt im Wissen und in den Tests, die Sie pro Sprache betreiben. Wenn Sie die Sprachen für Ihr Händlernetz planen möchten, [schreiben Sie mir](#contact).
