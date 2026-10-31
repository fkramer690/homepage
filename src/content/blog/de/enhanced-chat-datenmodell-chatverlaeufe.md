---
title: "Enhanced Chat Datenmodell: wo Chatverläufe liegen"
description: "Welche Enhanced-Chat-Daten in Ihrer Salesforce-Org liegen, warum die Nachrichten off platform gespeichert werden und was Sie im Kundenservice berichten können."
pubDate: 2026-10-31
lang: de
slug: enhanced-chat-datenmodell-chatverlaeufe
translationKey: enhanced-chat-data-model
topic: service
categories: [architecture, ai]
tags: [Enhanced Chat, Messaging for In-App and Web, Datenmodell, Berichte, Data Cloud, DSGVO]
series: { id: enhanced-chat, part: 3 }
takeaways:
  - "Im Enhanced Chat liegen Sitzung, Kunde, Teilnehmer und Kennzahlen als normale Datensätze in Ihrer Org, die einzelnen Nachrichten (ConversationEntry) liegen off platform in einer eigenen Datenbank von Salesforce."
  - "Off-Platform-Objekte stehen nicht im Object Manager, sind nicht per SOQL abfragbar und tauchen in keinem Standardbericht auf; Berichte zeigen also, wie viele und wie schnell, aber nicht, was geschrieben wurde."
  - "An die Chatinhalte kommen Sie über die Conversation Data API, eine Synchronisierung nach Data Cloud oder das Bulk-Export-Werkzeug, das höchstens alle sieben Tage läuft."
  - "Was der Service später auswerten will, etwa Seriennummer, Maschinentyp oder Anliegen, gehört als Feld an die Messaging-Sitzung oder den Fall, bevor der Chat live geht."
  - "Löschen geht per Flow oder Apex über die Conversation Service API; Aufbewahrungsdauer und Speicherort der Off-Platform-Daten nennt die Dokumentation nicht, die lassen Sie sich schriftlich bestätigen."
faq:
  - q: "Wo speichert Salesforce die Nachrichten aus Enhanced Chat?"
    a: "Die einzelnen Nachrichten (ConversationEntry) liegen laut Salesforce off platform in einer eigenen, für Messaging gebauten Datenbank. Sitzung, Kunde und Kennzahlen liegen als normale Datensätze in der Org."
  - q: "Kann ich Chatverläufe aus Enhanced Chat in Salesforce-Berichten auswerten?"
    a: "Nicht mit Standardberichten. Berichtbar sind Messaging Session, Messaging Session Metrics und AgentWork; für die Inhalte brauchen Sie die Conversation Data API, Data Cloud oder den Bulk Export."
  - q: "Ändert Enhanced Chat v2 das Datenmodell?"
    a: "Nein. v2 ist laut Salesforce eine neue Oberfläche für denselben Messaging-Kanal, die Sitzungen landen in denselben Objekten wie bei v1."
  - q: "Wie lösche ich Chatdaten eines Kunden aus Enhanced Chat?"
    a: "Mit den Aktionen der Conversation Service API in Flow oder Apex: ganze Konversationen per ID oder einen Teilnehmer mit allen Messaging-Daten. Die Löschung läuft asynchron, den Abschluss prüfen Sie über ConversationApiLog."
draft: true
---

Im Enhanced Chat Datenmodell liegen Sitzung, Kunde und Kennzahlen als normale Datensätze in Ihrer Salesforce-Org, die Nachrichten selbst nicht. Jede einzelne Nachricht ist ein ConversationEntry und liegt laut Salesforce off platform, in einer eigenen Datenbank neben der Org. Für Berichte heißt das: Sie sehen, wie viele Chats es gab, wie schnell geantwortet wurde und welcher Fall daraus entstand, aber nicht, was der Händler geschrieben hat. Wer Inhalte auswerten will, braucht die Conversation Data API, Data Cloud oder den Bulk Export. Das gilt für Enhanced Chat v1 und v2 gleichermaßen, und es sollte vor dem Go-live entschieden sein.

Dies ist Teil 3 der Serie zu Salesforce Enhanced Chat für Hersteller. Teil 2 behandelt den Umstieg vom alten Legacy Chat, Teil 4 die angemeldeten Händler im Portal. Hier geht es um die Frage, die in fast jedem Serviceprojekt nach dem ersten Monat kommt: Warum finde ich die Chats nicht in meinen Berichten?

## Wie ist das Enhanced Chat Datenmodell aufgebaut?

Enhanced Chat hieß früher Messaging for In-App and Web (MIAW). Technisch ist es ein Messaging-Kanal, und das [Messaging Object Model](https://developer.salesforce.com/docs/service/messaging-object-model/guide/messaging-object-model.html) von Salesforce beschreibt, welche Objekte dazugehören. Für den Alltag reichen sieben:

```tabelle
titel: Enhanced Chat: welches Objekt wo liegt
spalten: Objekt | Was es ist | Wo es liegt | Berichte und SOQL
MessagingChannel | Der Kanal, etwa Enhanced Web Chat | In der Org | Ja
MessagingEndUser | Der Kunde auf diesem Kanal, je Kanal ein Datensatz | In der Org | Ja
MessagingSession | Eine Sitzung mit Start, Ende, Status und Fall | In der Org | Ja *
MessagingSession­Metrics | Antwortzeiten und Nachrichtenzahlen je Sitzung | In der Org | Ja *
Conversation | Klammer über alle Sitzungen eines Kunden auf dem Kanal | In der Org | Nicht in Standardberichten
ConversationEntry | Jede einzelne Nachricht oder jedes Ereignis | Off platform | Nein
fazit: Quelle: Salesforce Messaging Object Model und On-Platform vs. Off-Platform Messaging Objects, Stand Oktober 2026.
```

Dazu kommen Participant und ConversationParticipant, die einen Menschen oder Bot über mehrere Gespräche hinweg wiedererkennen, und RelatedRecord, das eine Nachricht mit einer Sitzung oder einem Anruf verknüpft. RelatedRecord liegt ebenfalls off platform.

Die meiste Arbeit machen Admins mit MessagingSession. Dort hängen der Fall, der Kontakt, die Felder aus dem Pre-Chat-Formular und der Status. Conversation liegt zwar in der Org, Salesforce schreibt aber ausdrücklich, dass sie in Standardberichten nicht verfügbar ist.

Enhanced Chat v2 ändert daran nichts. v2 ist laut Salesforce eine neue Oberfläche für denselben Messaging-Kanal. Ob ein Händler über das v1- oder das v2-Fenster schreibt, die Sitzung landet in denselben Objekten. Was v2 mitbringt, Lightning Types, Dateien an den Agenten und Token Streaming, landet als reichhaltigere Nachricht in ConversationEntry, also ebenfalls off platform.

## Warum liegen die Chatnachrichten off platform?

Salesforce begründet es mit Last: Off-Platform-Objekte liegen in einer „separate, purpose-built database“, gebaut für das Volumen von Echtzeit-Messaging. Als Annahme gerechnet: Läge jede Nachricht als Datensatz in der Org, wären 3.000 Chats mit je 30 Nachrichten 90.000 neue Datensätze im Monat, nur für den Chat.

Die Folgen stehen auf der Seite [On-Platform vs. Off-Platform Messaging Objects](https://developer.salesforce.com/docs/service/messaging-object-model/guide/messaging-object-model-on-off-platform.html): Off-Platform-Objekte erscheinen nicht im Object Manager, sind nicht per SOQL abfragbar und nicht über Standardberichte erreichbar. Daraus folgt für mich auch: keine eigenen Felder an einer Nachricht, keine Validierung und kein Apex-Trigger, der auf eine einzelne Nachricht reagiert.

Wer vom Legacy Chat kommt, merkt das sofort. Dort stand der Verlauf im Transcript-Datensatz in der Org, und manche Berichte haben genau darauf aufgesetzt. Salesforce schreibt im [Trailhead-Modul zur Migration](https://trailhead.salesforce.com/content/learn/modules/migrating-from-legacy-chat-to-enhanced-chat/explore-enhanced-chat) entsprechend, Sie sollten darauf vorbereitet sein, Ihre bisherigen Berichte durch neue zu ersetzen. Auch die Beschreibung des alten Objekts ConversationEntry in der Object Reference gilt laut Salesforce nur noch für den Legacy Chat.

## Was lässt sich in Enhanced Chat berichten?

Berichtbar ist alles, was in der Org liegt. Für einen Serviceleiter sind das drei Quellen:

- **MessagingSession:** Anzahl Chats pro Tag, Kanal und Status, Wartezeit bis zur Annahme, verknüpfte Fälle und alle Felder, die Sie aus dem Pre-Chat oder per Flow an die Sitzung schreiben.
- **MessagingSessionMetrics:** laut [Object Reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_messagingsessionmetrics.htm) Kennzahlen wie die durchschnittliche Antwortzeit der Servicekraft, verfügbar ab API-Version 62.0 (Oktober 2024). Dazu kommen Nachrichtenzahlen je Seite.
- **AgentWork:** die Arbeitszuweisung aus Omni-Channel mit Bearbeitungszeit, wenn ein Mensch den Chat übernimmt.

Nicht berichtbar ist der Inhalt: welche Maschine, welches Ersatzteil, welche Fehlermeldung, was der Agentforce-Agent geantwortet hat. Wie Sie die Kennzahlen eines Agenten nach dem Go-live lesen, steht im Artikel zu [Agentforce-Kennzahlen nach dem Go-live](../agentforce-kennzahlen-nach-go-live/).

Meine Konsequenz daraus: Alles, was die Serviceleitung später zählen will, gehört als Feld an die Sitzung oder an den Fall. Seriennummer und Händlernummer kommen über versteckte Pre-Chat-Felder, das Anliegen setzt der Agent oder die Servicekraft beim Abschluss. Das ist eine Entscheidung im Datenmodell, die vor dem Go-live fallen muss. Nachträglich aus Chatverläufen herauszulesen, wie viele Anfragen eine Baureihe betrafen, ist teurer und ungenauer.

```praxis
PLATZHALTER, bitte durch Fabians Erfahrung ersetzen: Wie wurden im Enhanced-Chat-Projekt Chatinhalte ausgewertet (Felder an Session oder Case, Data Cloud, Export, gar nicht)? Welche Frage der Serviceleitung ließ sich mit Standardberichten nicht beantworten?
```

## Wie kommen Sie an die Chatinhalte?

Salesforce nennt auf der Seite [Access Conversation Data](https://developer.salesforce.com/docs/service/messaging-object-model/guide/messaging-object-model-access-data.html) drei Wege. Welcher passt, hängt davon ab, ob Sie einzelne Verläufe brauchen oder alle.

```tabelle
titel: Drei Wege zu den Chatnachrichten
spalten: Weg | Wofür | Grenzen
Conversation Data API (GET) | Einzelne Verläufe fast in Echtzeit, mit Bot-Nachrichten und Rich Content * | 90 Anfragen pro Nutzer und Minute
Data Cloud Sync | Alle Verläufe als Datenstrom für Analysen | Bis zu einer Stunde Verzögerung
Bulk-Export-Werkzeug | Archiv und Nachweise, alle Daten seit Beginn | Höchstens einmal alle sieben Tage
fazit: Die ältere Connect REST API für Conversation Entries liefert nur Text ohne Bot-Nachrichten. Salesforce empfiehlt für neue Integrationen die GET API.
```

**Conversation Data API.** Für eine Integration, die einen Verlauf an einen Fall hängt oder an ein Ticketsystem übergibt, ist das der Weg. Salesforce empfiehlt sie „strongly“ für alle neuen Integrationen. Sie holt einen Verlauf nach dem anderen, für Massenauswertungen ist sie zu langsam.

**Data Cloud.** Für die Frage „worüber chatten unsere Händler“ brauchen Sie alle Verläufe auf einmal. Salesforce empfiehlt dafür die Synchronisierung nach Data Cloud, mit bis zu einer Stunde Verzögerung, für die meisten Kunden laut Salesforce ohne Zusatzkosten. Wer Agentforce im Chat einsetzt, hat Data Cloud in der Regel schon eingerichtet.

**Bulk Export.** Exportiert alle Konversationsdaten seit Beginn und läuft höchstens alle sieben Tage. Salesforce positioniert ihn für Archivierung und Compliance. Als regelmäßige Schnittstelle in ein Data Warehouse taugt er nicht.

```vertiefung Für Entwickler
titel: Was die APIs im Detail unterscheidet
- Die Conversation Data API braucht eine External Client App mit Client Credentials Flow, Scope sfap_api und einen Run-as-Nutzer mit API Only User; in Setup muss Conversation Service API eingeschaltet sein.
- Die ältere Connect REST API für Conversation Entries erlaubt standardmäßig 1.000 Aufrufe pro Anwendung, Nutzer und Stunde. Jeder Aufruf markiert die Konversation als aktiv und zählt gegen das Limit gleichzeitig aktiver Konversationen der Org.
- Sprachanrufe: Einträge sind erst nach Gesprächsende mit dem VoiceCall verknüpft und vorher nicht abrufbar.
```

## Wie löschen Sie Chatdaten nach DSGVO?

Ein Händler verlangt die Löschung seiner Daten, und seine Nachrichten liegen in einer Datenbank, die Sie in Setup nicht sehen. Salesforce bietet dafür in der [Conversation Data API](https://developer.salesforce.com/docs/service/conversation-data-api/guide/delete-with-flow-and-apex.html) zwei Aktionen, die Sie in Flow oder Apex aufrufen:

- **Delete Conversations By Id** löscht eine oder mehrere Konversationen mit den zugehörigen Daten.
- **Delete Conversation Participants By Participant Entity Id** löscht einen Messaging-Kunden mit allen seinen Messaging-Daten.

In Flow gehen bis zu 50 IDs pro Aufruf. Beide Aktionen laufen asynchron: Wenn der Aufruf zurückkommt, ist noch nichts gelöscht. Den Abschluss sehen Sie erst in den ConversationApiLog-Datensätzen. Hat der Kunde noch eine offene Sitzung, schlägt die Löschung fehl, außer Sie schließen offene Sitzungen per Parameter vorher. Die Aktionen erscheinen im Flow Builder erst, wenn in Setup die Conversation Service API eingeschaltet ist.

Ich würde das als festen Teil des Löschprozesses bauen, nicht als Handarbeit im Einzelfall. Wenn Ihr Datenschutzprozess heute Kontakte und Fälle löscht, fehlt ihm sonst genau der Teil mit den Inhalten.

```hinweis offen
Wie lange Salesforce die Off-Platform-Nachrichten aufbewahrt und in welcher Region sie liegen, steht in keiner der gelesenen Entwicklerseiten. Lassen Sie sich beides für Ihre Org schriftlich bestätigen, bevor der Datenschutz den Chat freigibt.
```

Für die Frage nach der Region lohnt der Blick auf den Artikel zur [EU-Datenresidenz bei Agentforce](../agentforce-eu-datenresidenz-modelle/), denn ein Chat mit Agent berührt beide Themen.

## Wo fangen Sie an?

Bevor der erste Händler chattet, kläre ich drei Fragen mit Serviceleitung und Datenschutz:

1. **Welche Fragen soll das Reporting beantworten?** Jede Frage, die einen Inhalt braucht (Baureihe, Ersatzteil, Fehlerbild), wird zu einem Feld an MessagingSession oder Case und zu einer Regel, wer es füllt.
2. **Brauchen wir die Inhalte gesammelt?** Wenn ja, Data Cloud Sync planen und prüfen, ob die Lizenz in Ihrer Org ohne Aufpreis gilt. Wenn nur einzelne Verläufe gebraucht werden, reicht die GET API.
3. **Wie wird gelöscht und wie lange aufbewahrt?** Löschflow mit den beiden Aktionen bauen, Aufbewahrung und Region schriftlich klären.

Wer diese Entscheidungen früh im [Salesforce-Architektur-Zielbild](../../leistungen/salesforce-architektur/) festhält, muss nach dem Go-live keine Berichte nachbauen. Kurz gesagt: Im Enhanced Chat liegt das Gespräch neben der Org, und alles, was Sie zählen wollen, muss vorher als Feld in die Org.
