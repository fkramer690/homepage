---
title: "Agentforce im Enhanced Chat: Übergabe an Menschen"
description: "Wie Enhanced Chat v2 Chats an den Agentforce-Agenten routet, wann er an Ihr Service-Team übergibt und was passiert, wenn gerade niemand frei ist."
pubDate: 2026-10-31
lang: de
slug: enhanced-chat-agentforce-uebergabe
translationKey: enhanced-chat-agentforce-handover
topic: service
categories: [ai]
tags: [Enhanced Chat, Agentforce, Omni-Channel, Eskalation, Service Cloud, Maschinenbau]
series: { id: enhanced-chat, part: 5 }
takeaways:
  - "Im Enhanced Chat entscheiden zwei Omni-Channel-Flows über das Gespräch: Der eingehende Flow schickt die Sitzung an den Agentforce-Agenten, der ausgehende übergibt sie an eine Queue mit Menschen."
  - "Ist bei der Übergabe niemand frei, macht laut Salesforce der Agent weiter, und die Eskalation wird nur einmal pro Sitzung versucht; ein zweiter Wunsch nach einem Menschen läuft dann ins Leere."
  - "Routing, Fallback-Queue und Eskalation funktionieren in Enhanced Chat v1 und v2 gleich; die Fallback Message aus v1 gibt es in v2 laut Vergleichstabelle nicht."
  - "Maschinenstillstand, Sicherheitsthemen und Kulanz würde ich im eingehenden Flow anhand fester Pre-Chat-Felder direkt an Menschen leiten, ohne dass ein Sprachmodell darüber entscheidet."
faq:
  - q: "Wie übergibt ein Agentforce-Agent im Enhanced Chat an einen Menschen?"
    a: "Der Escalation-Subagent erkennt den Anlass, etwa wenn der Kunde nach einer Person fragt. Dann ruft der Agent den ausgehenden Omni-Channel-Flow auf, der mit der Aktion Route Work Sitzung und Verlauf an eine Queue mit Service-Mitarbeitenden schickt."
  - q: "Was passiert, wenn bei der Eskalation niemand verfügbar ist?"
    a: "Laut Trailhead übernimmt der Agent das Gespräch wieder, und Salesforce versucht die Eskalation nur einmal pro Sitzung. Laut Salesforce Help lässt sich der Escalation-Subagent so anpassen, dass er in diesem Fall einen Case anlegt."
  - q: "Sieht der Mitarbeiter, was der Kunde vorher mit dem Agenten geschrieben hat?"
    a: "Ja. Laut Salesforce Help wird der Gesprächsverlauf mit den Nachrichten und den gesammelten Informationen an das nächste Ziel übergeben. Eine KI-Zusammenfassung über Einstein Work Summaries entsteht laut Help erst am Ende des Gesprächs."
  - q: "Ändert sich das Routing beim Wechsel von Enhanced Chat v1 auf v2?"
    a: "Nach der Vergleichstabelle von Salesforce nicht: Flow-basiertes Routing, Queue, Fallback-Queue und Routing-Eskalation stehen in beiden Versionen bereit. Prüfen Sie aber, ob Sie in v1 die Fallback Message nutzen, denn die fehlt in v2."
draft: true
---

Im Enhanced Chat entscheidet ein Omni-Channel-Flow, wer ein Gespräch bekommt, und nicht der Code auf Ihrer Website. Der eingehende Flow schickt die Messaging Session an den Agentforce Service Agent und fällt auf eine Queue zurück, wenn das nicht klappt. Will der Kunde einen Menschen, übergibt der Agent über einen ausgehenden Flow Sitzung und Verlauf an Ihr Service-Team. Ist dort niemand frei, macht der Agent weiter, und Salesforce versucht die Eskalation nur einmal pro Sitzung. Bei der Übergabe an Menschen würde ich deshalb zuerst den Fall „niemand frei“ planen und erst dann den Agenten.

## Wie kommt ein Chat im Enhanced Chat zum Agentforce-Agenten?

Das Trailhead-Modul zum [Einrichten der Messaging-Verbindung](https://trailhead.salesforce.com/content/learn/modules/agentforce-deployment-quick-look/set-up-the-messaging-connection) beschreibt das Muster knapp: „The Messaging connection relies on two Omni-Channel flows.“ Dazu kommen drei Bausteine, die viele aus dem alten Chat kennen: ein Service Channel für das Objekt Messaging Session, eine Routing-Konfiguration und eine Queue für Menschen.

Der eingehende Flow bekommt die Sitzung mit den Pre-Chat-Daten, prüft im Trailhead-Beispiel, ob der Kunde schon als Kontakt existiert, und schickt das Gespräch mit der Aktion Route Work an den Agenten. Klappt das nicht, geht die Sitzung an die Queue. Zwei Regeln aus der Dokumentation sind wichtig für den Projektplan:

- Der Agent muss aktiv sein, sonst taucht er im Flow Builder nicht als Ziel auf. Laut [Salesforce Help](https://help.salesforce.com/s/articleView?id=ai.agent_deploy_emp.htm&language=en_US&type=5) kann jeder eingehende Flow genau einen Agenten bedienen, ein Agent aber mehrere eingehende Flows haben.
- Die Fallback-Queue ist Pflicht. Das [Beispiel für ein Enhanced-Chat-Deployment](https://developer.salesforce.com/docs/ai/agentforce/guide/headless-examples-enhanced-chat-agent.html) legt sie an, weil sie nötig ist, „so that conversations can escalate to a human service rep“.

Enhanced Chat v2 ändert daran nichts. In der [Vergleichstabelle v1 zu v2](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5) stehen Flow-basiertes Routing, Queue, Fallback-Queue, Routing-Eskalation, geschätzte Wartezeit und Omni Supervisor in beiden Spalten. v2 ist eine neue Oberfläche für denselben Messaging-Kanal, die Logik dahinter bleibt im Kanal und in den Flows. Wer von v1 wechselt, baut das Routing also nicht neu.

```prozess
titel: Vom ersten Satz bis zur Übernahme durch einen Menschen
spuren: Service-Team | Agentforce | Omni-Channel
Omni-Channel | Eingehender Flow | Sitzung mit Pre-Chat-Daten per Route Work an den Agenten
zurueck: Agent nicht erreichbar: Sitzung geht an die Fallback-Queue
Agentforce | Gespräch | Agent beantwortet Fragen und ruft seine Aktionen auf
tor: Escalation-Subagent erkennt einen Anlass für einen Menschen
Omni-Channel | Ausgehender Flow | Prüft, ob in der Queue jemand frei ist
Service-Team | Übernahme | Sitzung und Verlauf kommen bei der Mitarbeiterin an
zurueck: Niemand frei: Agent macht weiter, kein zweiter Versuch in dieser Sitzung
```

## Wann sollte der Agent an einen Menschen übergeben?

Salesforce legt den Anlass in die Anweisungen des Escalation-Subagenten. Trailhead nennt als Beispiele einen Kunden, der ausdrücklich nach einer Person fragt, negative Stimmung und Anfragen außerhalb des Auftrags des Agenten. Das ist eine Entscheidung des Sprachmodells: Es liest das Gespräch und entscheidet, ob einer dieser Fälle vorliegt.

Für die meisten Fragen reicht das. Bei Herstellern gibt es aber Anliegen, bei denen ich diese Entscheidung keinem Modell überlassen würde. Eine stehende Maschine kostet den Kunden jede Stunde Geld, eine Sicherheitsmeldung hat Haftungsfolgen, und eine Kulanzzusage kann der Agent ohnehin nicht geben. Diese Fälle lassen sich früher abfangen: Der eingehende Flow kann anhand eines Pre-Chat-Felds oder eines versteckten Werts aus dem Portal entscheiden, bevor der Agent überhaupt startet. Wie Seriennummer und Händlernummer in die Sitzung kommen, ist Thema von Teil 6 dieser Serie.

```tabelle
titel: Wo welcher Übergabegrund entschieden wird (meine Empfehlung)
spalten: Anlass | Wo entscheiden | Warum
Kunde will eine Person | Escalation-Subagent | Klarer Wunsch, das Modell erkennt ihn zuverlässig
Frage außerhalb des Auftrags | Escalation-Subagent | Hängt vom Inhalt ab, feste Regeln greifen hier nicht
Maschinenstillstand | Eingehender Flow, Pre-Chat-Feld * | Jede Minute zählt, kein Umweg über den Agenten
Sicherheitsrelevante Meldung | Eingehender Flow, Pre-Chat-Feld * | Haftung, die Meldung muss unverändert ankommen
Kulanz, Preis- oder Lieferzusage | Feste Regel im Agenten, dann Übergabe | Zusage mit Folgen braucht einen Menschen
fazit: Der Escalation-Subagent bleibt für alles, was sich erst aus dem Gespräch ergibt.
```

Die Kulanzfrage ist der Grenzfall. Der Agent darf sie aufnehmen, Fotos und Seriennummer sammeln und dann übergeben. Zusagen gehören in feste Logik, wie ich es in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschreibe, damit der Agent nicht aus Höflichkeit etwas verspricht.

## Was passiert, wenn kein Mensch frei ist?

Hier liegt der Teil, den ich in Konzepten am häufigsten vermisse. Laut Trailhead prüft der ausgehende Flow, ob in der Queue jemand verfügbar ist, und übergibt nur dann. Sonst gilt: „If no reps are available and escalation fails, the agent resumes the conversation.“ Und direkt danach: „Escalation is attempted only once per session.“

```hinweis achtung
Die Eskalation läuft nur einmal pro Sitzung. Scheitert sie, weil um 18:30 Uhr niemand mehr angemeldet ist, kommt der Kunde in dieser Sitzung nicht mehr zu einem Menschen, auch wenn er zehn Minuten später erneut fragt. Planen Sie die Antwort des Agenten für diesen Fall.
```

Für einen Hersteller mit Service-Hotline von 7 bis 17 Uhr und Händlern in anderen Zeitzonen ist das der Normalfall, kein Randfall. Drei Dinge würde ich festlegen, bevor der Agent live geht:

- **Was der Agent sagt.** Die Eskalationsnachricht stellen Sie in der Messaging-Verbindung des Agenten ein. Trailhead zeigt eine neutrale Formulierung („One moment while I check if there are any … reps available“). Daneben brauchen Sie eine ehrliche Antwort für den Fall, dass niemand frei ist, mit der nächsten Erreichbarkeit.
- **Was mit dem Anliegen passiert.** Laut [Salesforce Help](https://help.salesforce.com/s/articleView?id=ai.agent_deploy_emp.htm&language=en_US&type=5) lässt sich der Escalation-Subagent so anpassen, dass er einen Case anlegt, wenn die Übergabe nicht gelingt. Bei Herstellern würde ich das zur Regel machen, mit Seriennummer und Fehlerbild im Case.
- **Was in v2 fehlt.** Die Vergleichstabelle führt „Add Fallback Message“ für v1, für v2 nicht. Wer diese Einstellung in v1 nutzt, sollte vor dem Wechsel klären, welche Nachricht der Kunde in v2 stattdessen sieht.

Die geschätzte Wartezeit lässt sich in beiden Versionen anzeigen. Bei einer kleinen Service-Mannschaft hilft sie oft mehr als jede Formulierung, weil der Kunde selbst entscheiden kann, ob er wartet oder einen Case annimmt.

## Was sieht die Service-Mitarbeiterin nach der Übergabe?

Laut Salesforce Help wird „the conversation history, including messages and information gathered“ an das nächste Ziel übergeben. Die Mitarbeiterin sieht also, was Kunde und Agent geschrieben haben, und muss nicht von vorn fragen.

Eine Zusammenfassung bekommt sie damit noch nicht. [Einstein Work Summaries](https://help.salesforce.com/s/articleView?id=service.cc_generative_ai_work_summaries.htm&language=en_US&type=5) erzeugt eine Zusammenfassung für Messaging-Sitzungen laut Help „automatically when a conversation ends“. Bei der Übergabe selbst ist das nach der Seite nicht dokumentiert. Nach zwanzig Nachrichten liest niemand gern den ganzen Verlauf, während der Kunde wartet.

Deshalb würde ich den Agenten vor der Übergabe die wichtigsten Daten in Felder schreiben lassen: Seriennummer, Maschinentyp, Fehlerbild, was der Kunde schon versucht hat. Das ist eine Aktion mehr pro eskaliertem Gespräch, also auch ein paar [Flex Credits](../flex-credits-agentforce-kosten-pro-aktion/) mehr. Dafür startet die Mitarbeiterin mit drei Feldern statt mit einem Verlauf. Wo diese Daten liegen und warum die Nachrichten selbst nicht in normalen Berichten auftauchen, erkläre ich in Teil 3 dieser Serie.

## Was ich im Projekt gesehen habe

PLATZHALTER: Praxisbeispiel aus Fabians Enhanced-Chat-v2-Projekt. Offene Punkte: Wie wurde die Übergabe gebaut, welche Anlässe gingen direkt an Menschen, wie wurde der Fall „niemand frei“ gelöst, und was hat beim Go-live nicht funktioniert? Dieser Abschnitt wird erst nach Fabians Antworten geschrieben.

## Wie testen Sie die Übergabe vor dem Go-live?

Die meisten Agenten-Tests prüfen Antworten. Für die Übergabe brauchen Sie zusätzlich Tests, in denen sich nur die Lage im Service-Team ändert. Meine Liste:

- **Kunde fragt sofort nach einem Menschen**, mit freier Mitarbeiterin in der Queue. Kommt der Verlauf vollständig an?
- **Dieselbe Frage, niemand angemeldet.** Was sagt der Agent, wird ein Case angelegt?
- **Zweiter Wunsch in derselben Sitzung** nach einer gescheiterten Eskalation. Bleibt die Antwort ehrlich?
- **Agent deaktiviert.** Landet die Sitzung in der Fallback-Queue?
- **Maschinenstillstand im Pre-Chat.** Geht das Gespräch direkt an Menschen, ohne Agenten?
- **v1 und v2 auf derselben Website.** Salesforce warnt, dass Nachrichten in v1 dann fehlen können. Testen Sie auf getrennten Domains.

Wie Sie Bestehensquoten für die Antworten des Agenten festlegen, steht in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/). Nach dem Go-live ist die Eskalationsquote die Zahl, auf die ich zuerst schaue, zusammen mit der Zahl gescheiterter Übergaben; mehr dazu in [Agentforce-Kennzahlen nach dem Go-live](../agentforce-kennzahlen-nach-go-live/). Wer einen Einstein Bot ablöst, findet die Aufteilung zwischen Menü, Agent und Mensch in [Einstein Bot auf Agentforce umstellen](../einstein-bots-agentforce-umstellen/).

## Wo fangen Sie an?

Schreiben Sie vor dem ersten Flow auf, welche Anliegen nie beim Agenten landen dürfen, wer in welchen Zeiten in der Queue sitzt und was der Kunde hört, wenn dort niemand ist. Diese drei Antworten bestimmen Ihre Flows, nicht umgekehrt, und sie gehören für mich in die [Architektur](../../leistungen/salesforce-architektur/) des Service-Kanals, bevor jemand den Agenten konfiguriert.

Eine gute Übergabe an Menschen entscheidet sich im Enhanced Chat an dem Abend, an dem niemand mehr in der Queue sitzt.
