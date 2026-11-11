---
title: "Salesforce Enhanced Chat v2: Lohnt der Wechsel von v1?"
description: "Was Enhanced Chat v2 gegenüber v1 neu bringt, welche elf Funktionen fehlen und für wen sich der Wechsel lohnt. Mit Prüfliste für die Umstellung im Web-Chat."
pubDate: 2026-10-31
lang: de
slug: salesforce-enhanced-chat-v2-wechsel
translationKey: enhanced-chat-v2-switch
topic: service
categories: [ai, architecture]
series: { id: enhanced-chat, part: 1 }
tags: [Enhanced Chat, Messaging for In-App and Web, Service Cloud, Agentforce, Händlerportal, Maschinenbau]
takeaways:
  - "Enhanced Chat v2 ist eine neue Oberfläche für den Enhanced Web Chat der Service Cloud; Kanal, Routing und Lizenz bleiben, und laut Salesforce ist der Wechsel von v1 optional."
  - "Nur v2 kann Custom Lightning Types, Token Streaming, Agentforce Voice, die Context Events API und den Inline-Modus; das sind genau die Funktionen, die ein Agentforce-Agent im Chat braucht."
  - "Laut Vergleichstabelle von Salesforce fehlen in v2 elf Funktionen aus v1, darunter Tippanzeige, Emoji-Tastatur, Fallback Message, Opt-Out-Keywords und die Messaging Components Form, Time Selector und Notification."
  - "Die Umstellung läuft über ein neues Embedded Service Deployment am bestehenden Messaging Channel; v1 und v2 sollten nicht auf derselben Domain laufen, weil Nachrichten in v1 sonst fehlen können."
  - "Wer im Web-Chat einen Agentforce-Agenten einsetzt oder plant, sollte auf v2 wechseln; wer nur Menschen chatten lässt und auf Formulare im Chat angewiesen ist, kann bei v1 bleiben."
faq:
  - q: "Was ist Salesforce Enhanced Chat v2?"
    a: "Enhanced Chat v2 ist laut Salesforce eine neue Kundenoberfläche für den Enhanced Web Chat der Service Cloud, ausgelegt auf Agentforce-Agenten. Der Messaging-Kanal, das Routing über Omni-Channel und die Daten bleiben dieselben wie in v1."
  - q: "Muss ich von Enhanced Chat v1 auf v2 wechseln?"
    a: "Nein. Salesforce schreibt, der Wechsel von v1 auf v2 sei optional. Ein Abschaltdatum für v1 habe ich bis zum 31. Oktober 2026 auf den Salesforce-Seiten nicht gefunden."
  - q: "Ist Enhanced Chat dasselbe wie Messaging for In-App and Web?"
    a: "Ja. Messaging for In-App and Web ist der frühere Name des Kanals, der heute Enhanced Chat heißt. v1 und v2 sind zwei Oberflächen für die Web-Variante dieses Kanals."
  - q: "Brauche ich für Enhanced Chat v2 eine neue Lizenz?"
    a: "Für den Wechsel von v1 auf v2 nicht, weil v2 denselben Kanal nutzt. Wer noch vom alten Chat kommt, braucht je nach Vertrag Digital Engagement; das zeigt sich daran, ob Enhanced Chat in den Messaging Settings als Kanaltyp erscheint."
  - q: "Gilt Enhanced Chat v2 auch für WhatsApp und die Mobile App?"
    a: "Nein. Laut Salesforce gilt v2 nur für Enhanced Web Chat, nicht für Enhanced In-App Chat, WhatsApp, SMS, Apple Messages for Business, LINE oder Bring Your Own Channel."
draft: true
---

Wechseln Sie auf Salesforce Enhanced Chat v2, sobald im Web-Chat ein Agentforce-Agent antwortet oder antworten soll. Nur v2 zeigt strukturierte Antworten als eigene Oberfläche, streamt Antworten Wort für Wort und bekommt die aktuelle Seite des Besuchers als Kontext. Bleiben Sie bei v1, wenn nur Menschen chatten und Sie Formulare oder Terminauswahl im Chat brauchen, denn diese Messaging Components fehlen in v2. Der Wechsel ist laut Salesforce optional, kostet keine neue Lizenz und betrifft nur die Oberfläche auf der Website. Er braucht aber ein neues Deployment und einen sauberen Test.

## Was ist Enhanced Chat v2?

Salesforce hat den Web-Chat der Service Cloud in wenigen Jahren mehrfach umbenannt, und in Dokumentation, Trailhead und Angeboten stehen die Namen nebeneinander. Deshalb zuerst die Einordnung:

```tabelle
titel: Vom alten Chat zu Enhanced Chat v2
spalten: Name | Was es ist | Status
Chat (Legacy Chat, Live Agent) | Alter, synchroner Web-Chat | Abschaltung 14.02.2026
Messaging for In-App and Web | Neuer, asynchroner Messaging-Kanal | Früherer Name
Enhanced Chat v1 | Erste Oberfläche des Enhanced Web Chat | Läuft, kein Ende angekündigt
Enhanced Chat v2 | Neue Oberfläche, ausgelegt auf Agenten | Verfügbar, Wechsel optional *
fazit: Messaging for In-App and Web und Enhanced Chat sind derselbe Kanal. v1 und v2 sind zwei Oberflächen dafür.
```

Salesforce beschreibt v2 in der Hilfe als ["a new customer interface for Enhanced Chat"](https://help.salesforce.com/s/articleView?id=service.enhanced_chat_v2_intro.htm&language=en_US&type=5), optimiert für moderne Funktionen und agentische Anwendungsfälle. Der Satz, auf den es ankommt, steht direkt darunter: Der Wechsel von v1 auf v2 ist optional.

Für die Architektur heißt das: Der Messaging Channel, das Routing über Omni-Channel-Flows, die Queues, User Verification und die Datenablage bleiben unverändert. v2 ersetzt nur das, was der Besucher im Browser sieht, und die JavaScript-Schnittstellen dahinter. v2 gilt laut Salesforce nur für Enhanced Web Chat. Die Mobile App (Enhanced In-App Chat), WhatsApp, SMS, Apple Messages for Business, LINE und Bring Your Own Channel betrifft es nicht.

Wer heute noch den alten Chat mit `embedded_svc` im Website-Code hat, hat ein anderes Problem. Laut [Entwicklerdokumentation](https://developer.salesforce.com/docs/atlas.en-us.live_agent_rest.meta/live_agent_rest) war er für den 14. Februar 2026 zur Abschaltung vorgesehen. Die Migration vom alten Chat beschreibe ich im zweiten Teil dieser Serie, die Umstellung eines Einstein Bots in [Einstein Bot auf Agentforce umstellen](../einstein-bots-agentforce-umstellen/).

## Was bringt Enhanced Chat v2 gegenüber v1?

Die [Vergleichstabelle von Salesforce](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5) führt vier Funktionen, die nur v2 hat. Die Hilfeseite zu v2 nennt dazu Token Streaming, ein neues Design und kürzere Ladezeiten des Chatfensters.

- **Custom Lightning Types.** Der Agent antwortet mit einer eigenen Oberfläche statt mit Text, gebaut als Lightning Web Component. Für einen Hersteller ist das die Ersatzteilkarte mit Bild, Teilenummer und Verfügbarkeit oder die Liste freier Technikertermine. v1 kann diese Antworten nicht darstellen.
- **Token Streaming.** Die Antwort des Agenten erscheint Wort für Wort, während sie entsteht. Bei längeren Antworten wartet der Kunde nicht mehr mehrere Sekunden vor einem leeren Fenster.
- **Agentforce Voice.** Der Kunde kann im Chat mit dem Agenten sprechen.
- **Context Events API.** Die Website schickt mit `utilAPI.setSessionContext` laufend mit, auf welcher Seite der Besucher ist und wonach er gesucht hat. Der Agent weiß dann, dass jemand auf der Ersatzteilseite einer bestimmten Baureihe steht, ohne dass er danach fragen muss.
- **Inline-Modus.** Der Chat sitzt in einem Bereich der Seite statt als schwebender Button unten rechts, zum Beispiel als feste Spalte neben dem Serviceformular im Händlerportal.

Auffällig ist, dass alle fünf Punkte dem Agenten helfen. Für einen Servicemitarbeiter, der mit einem Händler chattet, ändert v2 wenig. Das ist die eigentliche Entscheidungsgrundlage.

## Was fehlt in Enhanced Chat v2?

Diesen Teil sollten Sie vor jeder Umstellung lesen. Laut Vergleichstabelle hat v1 elf Funktionen, die v2 nicht hat:

```staerken-grenzen
titel: Enhanced Chat v2: stark für Agenten, mit Lücken aus v1
+ Lightning Types | strukturierte Antworten wie Ersatzteilkarten, nur in v2 *
+ Kontext | aktuelle Seite und Suche an den Agenten über die Context Events API
+ Streaming | Antworten erscheinen Wort für Wort
- Komfort | keine Tippanzeige, keine Emoji-Tastatur, keine eigene Enter-Taste-Logik
- Messaging Components | Form, Time Selector und Notification fehlen
- Opt-Out | keine Opt-Out-Keywords und keine Opt-Out-Bestätigung
- Fallback | keine Fallback Message
- Pre-Chat | nur einmal je Konversation, nicht je Sitzung
- Eigene LWC | nicht mehr in der Textblase, nur in Header und Pre-Chat
besser: Für reine Chats zwischen Kunden und Menschen mit Formularen im Chat: vorerst bei v1 bleiben.
```

Drei Lücken wiegen im Maschinenbau schwerer als der Rest. Die **Messaging Components Form und Time Selector** sind in v1 der übliche Weg, im Chat Daten abzufragen oder einen Termin wählen zu lassen. Wer damit heute Serviceeinsätze vorbereitet, muss das in v2 anders lösen, etwa über einen Custom Lightning Type, den ein Agent ausspielt. Die **Tippanzeige** fehlt Kunden, die mit einem Menschen chatten: Ohne sie wirkt eine lange Antwort eines Servicemitarbeiters wie Stille. Und eigene LWC in der Textblase, mit denen sich in v1 etwa ein Auftragsstatus in der Antwort gestalten lässt, gehen in v2 nur noch in Header und Pre-Chat.

Alles andere bleibt gleich: User Verification, reCAPTCHA, sichtbarer und versteckter Pre-Chat, Routing über Flow oder Queue, Wartezeitanzeige, Anhänge, Transkript-Download, Branding mit Farben und Schriften, Custom Labels für Übersetzungen, Sensitive Data Rules, Eskalation und Omni Supervisor.

**Wichtig für die Planung:** Laut Salesforce können Nachrichten in v1 fehlen, wenn v1 und v2 auf derselben Website laufen, besonders Lightning Types, die v1 nicht darstellt. Planen Sie die Umstellung je Domain, nicht als Parallelbetrieb auf einer Seite.

## Für wen lohnt sich der Wechsel auf v2?

Entscheidend ist, wer im Chat antwortet. Meine Faustregel:

```pro-contra
pro: Auf v2 wechseln
- Ein Agentforce Service Agent antwortet im Web-Chat oder ist geplant
- Der Agent soll Ersatzteile, Status oder Termine als Karte zeigen
- Der Chat soll wissen, auf welcher Produkt- oder Teileseite der Besucher ist
- Der Chat soll fest ins Portal eingebettet sein statt als Button
contra: Vorerst bei v1 bleiben
- Nur Menschen chatten, und die Tippanzeige ist ihnen wichtig
- Form oder Time Selector tragen einen Prozess im Chat
- Kunden melden sich per Opt-Out-Keyword vom Chat ab
- Eigene LWC in der Textblase lassen sich nicht in Header oder Pre-Chat verlegen
```

Ein Beispiel, ausdrücklich als Annahme: Ein Maschinenbauer betreibt den Chat auf zwei Websites. Auf der öffentlichen Produktseite fragen anonyme Interessenten nach Baureihen, ein Agent soll antworten und bei Kaufinteresse an den Vertrieb übergeben. Im Händlerportal auf Experience Cloud chatten angemeldete Händler mit dem Innendienst und wählen über einen Time Selector einen Rückruftermin. Hier würde ich die öffentliche Website auf v2 umstellen und das Portal vorerst auf v1 lassen. Weil es zwei Domains sind, kollidieren die Versionen nicht. Wie das Portal selbst aufgebaut ist, beschreibe ich in [Kundenportal mit Manufacturing Cloud](../manufacturing-cloud-kundenportal/).

```praxis
PLATZHALTER, erst nach Fabians Antwort ausformulieren: Ausgangslage im Projekt (v1 oder alter Chat), Grund für v2, welche der fehlenden Funktionen vermisst wurde und wie lange die Umstellung gedauert hat.
```

Eine Abgrenzung noch: Wer den Agenten ohne Salesforce-Chatfenster in eine eigene App oder ein eigenes Portal holt, landet bei der Agent API. Den Vergleich der beiden Wege beschreibe ich in [Agent API für eigene Apps](../agentforce-agent-api-eigene-apps/).

## Wie läuft die Umstellung von v1 auf v2?

Salesforce beschreibt die Umstellung für einen bestehenden Kanal in der Hilfe unter [Create a v2 deployment for an existing channel](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_v2_existing_channel_deployment.htm&type=5). Sie brauchen die Berechtigungen Customize Application und Modify Metadata Through Metadata API Functions, und Digital Experiences müssen in der Org aktiviert sein.

```schritte
Bestand prüfen | Admin und Service
  Welche der elf fehlenden Funktionen nutzt das Deployment heute?
Deployment anlegen | Admin
  Neues Embedded Service Deployment, Enhanced Chat, Web, am bestehenden Kanal.
Auf v2 schalten | Admin
  Switch to v2, dann Switch & Publish; Snippet in die Website.
Testen und neu veröffentlichen | Admin und Service
  Pre-Chat, Routing, Agent und Branding prüfen, nach jeder Änderung neu veröffentlichen.
```

Beim Anlegen geben Sie die Domain der Website an; Subdomains sind eingeschlossen. Für eine Experience-Cloud-Site übernehmen Sie die Site-Domain aus Setup. Das Branding legen Sie im neuen Deployment noch einmal an, Farben, Schriften und Fenstergröße gibt es in beiden Versionen.

Zwei Dinge würde ich vorher klären. Erstens die Berichte: Sie hängen am Kanal und an den Messaging Sessions, und weil v2 nur die Oberfläche tauscht, erwarte ich, dass sie weiterlaufen. Eine Salesforce-Seite, die das bestätigt, habe ich nicht gefunden, prüfen Sie es deshalb an einem Testtag mit echten Sitzungen. Zweitens das Zurück: Wie man ein Deployment von v2 wieder auf v1 stellt, beschreibt die Hilfeseite nicht. Behalten Sie das alte v1-Deployment deshalb, bis v2 eine Weile stabil läuft, und tauschen Sie im Notfall das Snippet auf der Website.

## Wo sollten Sie anfangen?

Legen Sie die Vergleichstabelle neben Ihr aktuelles Deployment und haken Sie die elf fehlenden Funktionen ab. Ist keine davon im Einsatz, besteht der Wechsel aus Konfiguration und Test, und ein Agent im Chat hat mit v2 die besseren Werkzeuge. Trägt eine davon einen Prozess, etwa die Terminauswahl im Chat, planen Sie erst den Ersatz, dann die Umstellung. Ob Agentforce im Service für Sie überhaupt passt, klären wir in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/) vor jeder Lizenzfrage.

Enhanced Chat v2 lohnt sich dort, wo ein Agent antwortet, und kann warten, wo Menschen chatten.
