---
title: "Enhanced Chat im Betrieb: Grenzen, Kennzahlen und Kosten"
description: "Welche Rate Limits für Salesforce Enhanced Chat gelten, welche Kennzahlen Sie nach dem Go-live messen und woraus sich die Kosten für Chat und Agent ergeben."
pubDate: 2026-10-31
lang: de
slug: enhanced-chat-betrieb-kennzahlen-kosten
translationKey: enhanced-chat-operations-costs
topic: ai
categories: [ai, architecture]
tags: [Enhanced Chat, Rate Limits, Kennzahlen, Flex Credits, Service Cloud, Maschinenbau]
series: { id: enhanced-chat, part: 9 }
takeaways:
  - "Enhanced Chat hat feste Rate Limits: 200 Token-Anfragen pro Minute und Org, drei Chatstarts pro Seite in 30 Sekunden, 22 Nachrichten und 12 Dateien pro Konversation und Minute."
  - "Antwortzeiten und Nachrichtenzahlen kommen aus Messaging Session Metrics, Annahme- und Bearbeitungszeit aus AgentWork; die Bearbeitungszeit sagt bei asynchronem Chat wenig aus."
  - "Die Chatinhalte selbst liegen off platform und stehen nicht in Standardberichten; wer Themen auswerten will, braucht Data Cloud oder die Analysen des Agenten."
  - "Die Kosten setzen sich aus drei Teilen zusammen: Lizenzen für Servicekräfte, Flex Credits für den Agentforce-Agenten und der Aufwand für Pflege und Auswertung."
  - "Bauen Sie Berichte, Lasttest und Credit-Schwellen vor dem Go-live: Eine Schwelle, die erst nach der ersten Monatsrechnung steht, kommt zu spät."
faq:
  - q: "Welche Rate Limits gelten für Salesforce Enhanced Chat?"
    a: "Laut Salesforce Help 200 Access-Token- und 200 Renew-Anfragen pro Minute und Org, drei Chatstarts pro Seite in 30 Sekunden, 22 Nachrichten und 12 Dateien pro Konversation und Minute sowie drei Transkript-Downloads pro Konversation und Stunde."
  - q: "Wo finde ich die Antwortzeiten im Enhanced Chat?"
    a: "Im Berichtstyp Messaging Session mit Messaging Session Metrics. Pro abgeschlossener Sitzung entstehen sechs Datensätze, je einer pro Messgröße, etwa erste Antwortzeit oder durchschnittliche Antwortzeit der Servicekraft."
  - q: "Kann ich Chatverläufe aus Enhanced Chat in Salesforce-Berichten auswerten?"
    a: "Nein. Die einzelnen Nachrichten liegen in einer eigenen Datenbank außerhalb der Plattform, und Conversations stehen nicht in Standardberichten. Für Themenauswertungen brauchen Sie Data Cloud oder die Analysen des Agenten."
  - q: "Was kostet Salesforce Enhanced Chat?"
    a: "Für Servicekräfte listet Salesforce Contact Center Digital zu 75 € pro Nutzer und Monat bei jährlicher Abrechnung; bisherige Chat-Kunden haben Enhanced Chat teils schon. Beantwortet ein Agentforce-Agent, kommen Flex Credits dazu, 20 Credits oder 0,10 € pro Aktion."
draft: false
---

Salesforce Enhanced Chat im Betrieb verlangt Antworten auf drei Fragen: Welche Grenzen gelten, welche Kennzahlen messen Sie und was kostet der Kanal? Die Rate Limits sind fest, etwa 200 Token-Anfragen pro Minute und Org und drei Chatstarts pro Seite in 30 Sekunden. Kennzahlen kommen aus Messaging Session Metrics und AgentWork, die Chatinhalte selbst stehen nicht in Standardberichten. Die Kosten bestehen aus Lizenzen für Servicekräfte, Flex Credits für den Agentforce-Agenten und dem Aufwand für Pflege und Auswertung. Berichte und Credit-Schwellen baue ich vor dem Go-live.

Das ist der letzte Teil der Serie. Die Teile davor behandeln Umstellung, Datenmodell, Identität, Routing, Kontext, Oberfläche und Portal; hier geht es um die Zeit nach dem Go-live, wenn Service und IT den Kanal betreiben.

## Welche Rate Limits gelten für Enhanced Chat?

Salesforce nennt in der [Hilfe zu den Rate Limits](https://help.salesforce.com/apex/HTViewHelpDoc?id=service.miaw_rate_limits.htm) sechs Grenzen für Enhanced Web Chat und Enhanced In-App Chat. WhatsApp, SMS, Facebook Messenger, Apple Messages, LINE und Bring Your Own Channel fallen nicht darunter.

```kennzahlen
200 | Access-Token-Anfragen pro Minute und Org, ebenso 200 Renew-Anfragen
3 | Chatstarts pro Seite oder App in 30 Sekunden
22 | Nachrichten des Kunden pro Konversation und Minute
12 | Dateien des Kunden pro Konversation und Minute
quelle: Salesforce Help, Enhanced Chat Rate Limits, Stand 31.10.2026
```

Dazu kommen drei Transkript-Downloads pro Konversation und Stunde. Was passiert, wenn eine Grenze überschritten ist, beschreibt die Hilfeseite nicht. Das teste ich in einer Sandbox, bevor ich mich darauf verlasse.

Die wichtigste Zahl ist die erste. Ein Access Token wird angefordert, sobald ein anonymer Besucher auf den Chat-Button klickt oder ein verifizierter Nutzer per `setIdentityToken()` angemeldet wird. Die Grenze gilt pro Org, also für alle Websites, Portale und Sprachen zusammen, die an derselben Org hängen. Ein Hersteller mit Händlerportal und Länderseiten in zwölf Sprachen teilt sich diese 200 pro Minute. Im B2B-Service reicht das meist, kritisch wird es bei einer Kampagne, die tausende Besucher gleichzeitig auf eine Seite mit Chat schickt, oder wenn dieselbe Org auch Endkunden bedient.

Die anderen Grenzen treffen eher Ihre Tests als Ihre Kunden. Ein Lasttest, der von einer Seite aus Konversationen in Serie startet, läuft nach drei Starts in 30 Sekunden auf. Ein Skript, das Nachrichten schneller schickt als ein Mensch tippt, stößt an die 22 pro Minute. Planen Sie Lasttests deshalb mit vielen simulierten Seiten und realistischen Pausen.

## Welche Kennzahlen messe ich nach dem Go-live von Enhanced Chat?

Die Kennzahlen verteilen sich auf zwei Objekte. Laut der [Hilfe zu Messaging-Berichten](https://help.salesforce.com/s/articleView?language=en_US&id=service.messaging_reporting.htm&type=5) liefert Messaging Session Metrics die Antwortzeiten und Nachrichtenzahlen, AgentWork die Zeiten der Servicekraft.

```tabelle
titel: Kennzahlen für Enhanced Chat und ihre Quelle
spalten: Kennzahl | Quelle | Worauf ich achte
Erste Antwortzeit | Messaging Session Metrics * | Die Zahl, die Kunden spüren
Durchschnittliche und maximale Antwortzeit | Messaging Session Metrics | Maximum zeigt Ausreißer im Schichtwechsel
Nachrichten pro Sitzung | Messaging Session Metrics | Viele Nachrichten deuten auf fehlenden Kontext
Annahmezeit (Speed to Answer) | AgentWork | Wie lange Kunden in der Queue warten
Bearbeitungszeit (Handle Time) | AgentWork | Nur bei synchronem Chat aussagekräftig
Sitzungen ohne Menschen | Messaging Session, Agent Type Bot | Anteil, den der Agent allein beendet
fazit: Messaging Session Metrics gibt es nur für Enhanced Messaging und für Sitzungen ab dem 30.09.2024.
```

Drei Punkte fallen beim Bau der Berichte auf. Erstens entstehen pro abgeschlossener Sitzung sechs Datensätze in Messaging Session Metrics, je einer pro Messgröße. Ein Bericht über die erste Antwortzeit filtert deshalb auf den Typ `ServiceRepFirstResponseTime`, sonst mitteln Sie Antwortzeiten und Nachrichtenzahlen durcheinander. Zweitens entsteht bei jeder Weiterleitung an eine andere Servicekraft ein weiterer AgentWork-Datensatz; eine Sitzung kann also mehrere Bearbeitungszeiten haben. Drittens schreibt Salesforce selbst, dass die Bearbeitungszeit nur hilft, wenn Messaging synchron betrieben wird. Enhanced Chat ist asynchron: Ein Händler kann eine Frage stellen, in die Werkstatt gehen und eine Stunde später antworten. Dann misst die Bearbeitungszeit die Pause des Händlers. Ich nehme in diesem Fall die erste Antwortzeit und die Zahl der Sitzungen pro gelöstem Fall.

Was fehlt, sind die Inhalte. Die einzelnen Nachrichten liegen laut [Messaging Object Model](https://developer.salesforce.com/docs/service/messaging-object-model/guide/messaging-object-model.html) in einer eigenen Datenbank außerhalb der Plattform, und Conversations stehen nicht in Standardberichten. Die Frage „Worüber fragen Händler am häufigsten?“ beantwortet ein Salesforce-Bericht also nicht. Dafür brauchen Sie Data Cloud, eigene Auswertungen über die API oder die Analysen des Agenten. Beantwortet ein Agentforce-Agent die Chats, kommen Eskalations- und Task-Resolution-Quote aus Agent Analytics dazu; welche ich nach 90 Tagen ansehe, steht in [Agentforce-Kennzahlen nach dem Go-live](../agentforce-kennzahlen-nach-go-live/).

## Was kostet Enhanced Chat?

Die sichtbare Zahl ist die Lizenz für Servicekräfte. Die größeren Posten liegen oft darunter, beim Agenten und bei der Pflege des Kanals.

```eisberg
titel: Woraus sich die Kosten von Enhanced Chat zusammensetzen
sichtbar: Lizenz für Servicekräfte | Contact Center Digital, 75 € pro Nutzer und Monat, oder schon im bisherigen Chat enthalten
- Flex Credits | 20 Credits oder 0,10 € pro Aktion des Agentforce-Agenten, dazu Prompts | Agent
- Auswertung der Inhalte | Data Cloud oder eigene Auswertung, weil Nachrichten off platform liegen | Daten
- Pflege des Kanals | Pre-Chat, Übersetzungen, Lightning Types und Tests nach jedem Release | Team
fazit: Die Lizenz ist planbar. Credits und Pflege hängen davon ab, wie viele Chats der Agent übernimmt und wie oft sich das Portal ändert.
```

**Lizenz.** Wer bisher den alten Chat hatte, hat laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/migrating-from-legacy-chat-to-enhanced-chat/explore-enhanced-chat) oft schon Zugriff auf Enhanced Chat. Der Test ist einfach: Erscheint unter Messaging Settings bei „New Channel“ der Kanaltyp Enhanced Chat, ist er lizenziert, sonst brauchen Sie Digital Engagement. Auf der [Preisseite](https://www.salesforce.com/service/digital-customer-engagement-platform/pricing/?bc=SOC) heißt das Produkt Contact Center Digital und kostet 75 € pro Nutzer und Monat bei jährlicher Abrechnung, mit Chat für Web und App sowie Messaging über SMS, WhatsApp und weitere Kanäle. SMS und WhatsApp rechnet Salesforce zusätzlich nach Nutzung über eine eigene Rate Card ab. Die Lizenz gilt pro Servicekraft, nicht pro Händler, der chattet.

**Agent.** Beantwortet ein Agentforce-Agent die Chats, kostet jede Standard- oder Custom-Aktion 20 Flex Credits, also 0,10 €, dazu kommen Prompts nach Modellstufe. Die Rechnung im Detail steht in [Flex Credits: Agentforce-Kosten pro Aktion schätzen](../flex-credits-agentforce-kosten-pro-aktion/). Als Annahme gerechnet: 3.000 Chats im Monat, die der Agent mit durchschnittlich drei Aktionen beantwortet, ergeben 9.000 Aktionen, also 180.000 Credits oder 900 € im Monat ohne Prompts. Zehn Servicekräfte mit Contact Center Digital kosten zum Listenpreis 750 € im Monat. Bei diesem Volumen liegen Agent und Lizenzen also in derselben Größenordnung, und der Agent wächst mit jedem zusätzlichen Chat.

**Pflege und Auswertung.** Diesen Posten nennt keine Preisseite. Pre-Chat-Felder, Übersetzungen der Custom Labels, eigene Lightning Types und das Neuveröffentlichen des Deployments nach Änderungen kosten Zeit in jedem Release. Wer Chatinhalte auswerten will, rechnet Data Cloud dazu.

**[PLATZHALTER Praxis, Fabian: Wie habt ihr in deinem Enhanced-Chat-Projekt Betrieb und Kosten aufgesetzt? Welche Kennzahlen hat der Service tatsächlich angesehen, gab es Überraschungen bei Lizenzen, Credits oder Rate Limits? Text folgt nach deinen Antworten, bis dahin bitte nicht veröffentlichen.]**

## Wo fangen Sie vor dem Go-live an?

Die Daten für die Kennzahlen entstehen automatisch. Wer die Berichte aber erst baut, wenn sich der Vertrieb über langsame Antworten beschwert, diskutiert ohne Ausgangswerte, und eine Credit-Schwelle, die erst nach der ersten Monatsrechnung steht, kommt zu spät. Ich gehe vor dem Go-live diese Schritte durch:

```schritte
Lizenz prüfen | vor dem Build · IT
  Kanaltyp Enhanced Chat unter Messaging Settings suchen und Anzahl der Servicekräfte festlegen.
Grenzen testen | vor dem Go-live · IT
  Lasttest mit vielen Seiten und realistischen Pausen, Verhalten bei Überschreitung dokumentieren.
Berichte bauen | vor dem Go-live · Service
  Erste Antwortzeit, Annahmezeit und Anteil ohne Menschen als Dashboard für die Serviceleitung.
Credits begrenzen | vor dem Go-live · IT und Einkauf
  Schwellen in Digital Wallet setzen und eine Abschaltregel mit der Serviceleitung vereinbaren.
```

Für die Credit-Schwellen nutze ich Digital Wallet, das den Verbrauch bis auf Agent, Aktion und Kanal zeigt; wie ich damit Kosten auf Werke verteile, steht in [Digital Wallet: Agentforce-Kostenkontrolle für Werke](../digital-wallet-agentforce-kostenkontrolle/). Welche Lizenzen sich dabei sparen lassen, kläre ich in der [Make-or-buy- und Lizenzberatung](../../leistungen/make-or-buy-lizenzen/).

Enhanced Chat ist im Betrieb gut messbar, solange Berichte, Lasttest und Credit-Schwellen vor dem ersten Kunden stehen und nicht danach.
