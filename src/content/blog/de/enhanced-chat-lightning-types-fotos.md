---
title: "Enhanced Chat Lightning Types: Karten, Fotos, Streaming"
description: "Wie ein Agentforce-Agent im Enhanced Chat v2 Ersatzteilkarten zeigt, Fotos vom Typenschild annimmt und Antworten streamt, und wo die Grenzen liegen."
pubDate: 2026-10-31
lang: de
slug: enhanced-chat-lightning-types-fotos
translationKey: enhanced-chat-beyond-text
topic: service
categories: [ai, architecture]
tags: [Enhanced Chat, Agentforce, Lightning Types, Service Cloud, Ersatzteile, Händlerportal]
series: { id: enhanced-chat, part: 7 }
takeaways:
  - "Mit Custom Lightning Types zeigt ein Agentforce-Agent im Enhanced Chat v2 strukturierte Antworten als Karte, etwa ein Ersatzteil mit Bild, Verfügbarkeit und Preis; v1 kann sie nicht darstellen."
  - "Seit dem Winter-'27-Release, ausgerollt ab der Woche des 21. September 2026, nehmen Service-Agenten Screenshots, Belege und PDFs im Enhanced Chat v1 und v2 an."
  - "Im Modus managed landen hochgeladene Dateien in einer Systemvariable, und Ihre Agentenlogik entscheidet, was damit passiert; für Fotos vom Typenschild ist das der Modus, den ich wählen würde."
  - "Token Streaming zeigt Antworten Wort für Wort, aber der Trust Layer prüft erst die fertige Antwort; der Client muss gestreamten Text wieder entfernen können."
  - "Terminauswahl, Formular und Benachrichtigung aus den Messaging Components fehlen in v2; wer sie braucht, baut sie als Lightning Type nach oder bleibt vorerst bei v1."
faq:
  - q: "Was ist ein Custom Lightning Type in Agentforce?"
    a: "Ein Bundle aus einem Pflicht-Schema (schema.json) und optionalen Dateien für Eingabe und Anzeige. Das Schema beschreibt die Daten, die eine Agentenaktion zurückgibt, die Anzeige rendert sie über eine Lightning Web Component als Karte im Chat."
  - q: "Funktionieren Custom Lightning Types im Enhanced Chat v1?"
    a: "Nein. Die Vergleichstabelle von Salesforce führt Custom Lightning Types nur für Enhanced Chat v2. Für den Service-Agenten im Web-Chat ist der Kanalordner enhancedWebChat vorgesehen."
  - q: "Kann ein Kunde im Enhanced Chat ein Foto an den Agenten schicken?"
    a: "Ja, seit dem Winter-'27-Release nehmen Service-Agenten Screenshots, Belege und PDFs in Enhanced Chat v1 und v2 an. Das Verhalten steuert der Upload-Modus des Agenten: auto, managed, disabled oder error."
  - q: "Ist Token Streaming im Enhanced Chat sicher?"
    a: "Der Trust Layer kann eine gestreamte Antwort erst prüfen, wenn sie vollständig ist. Fällt die Prüfung durch, kommt ein Validierungssignal, und der Client sollte den bereits gezeigten Text entfernen."
draft: true
---

Im Enhanced Chat v2 zeigt ein Agentforce-Agent mehr als Text: Mit Custom Lightning Types wird das Ergebnis einer Aktion zur Karte im Chat, etwa ein Ersatzteil mit Bild, Verfügbarkeit und Preis. Seit dem Winter-'27-Release nimmt derselbe Agent Fotos, Screenshots und PDFs an, zum Beispiel ein Bild vom Typenschild. Mit Token Streaming erscheinen seine Antworten Wort für Wort. Die Lightning Types gibt es nur in v2, den Datei-Upload in v1 und v2. Ich würde mit einer einzigen Karte anfangen, die eine Frage beantwortet, die Ihr Service heute am häufigsten per Telefon bekommt.

## Was sind Custom Lightning Types im Enhanced Chat?

Ein **Custom Lightning Type** ist eine Beschreibung von Daten plus die Oberfläche, mit der Salesforce diese Daten anzeigt. Laut [Agentforce Developer Guide](https://developer.salesforce.com/docs/ai/agentforce/guide/lightning-types-custom.html) besteht er aus drei Teilen: das Schema legt Struktur und Validierung fest, der Editor die Eingabe, der Renderer die Ausgabe. Technisch ist das ein LightningTypeBundle, verfügbar ab API-Version 64.0.

```tabelle
titel: Aufbau eines Custom Lightning Type
spalten: Datei | Pflicht | Aufgabe
schema.json | ja * | Datenstruktur und Regeln als JSON Schema, bei Apex-Typen der Verweis auf die Apex-Klasse
editor.json | nein | Eigene Eingabe über eine Lightning Web Component
renderer.json | nein | Eigene Anzeige über eine Lightning Web Component, für ein Element oder eine Liste
enhancedWebChat | Kanalordner | Überschreibt die Anzeige für den Service-Agenten im Enhanced Chat v2 *
fazit: Nach dem Agentforce Developer Guide, Stand 31.10.2026.
```

Der Ablauf im Chat ist immer derselbe. Der Kunde fragt, der Agent ruft eine Aktion auf, meist eine Apex-Methode oder einen Flow, und die Aktion gibt Daten im Format des Lightning Type zurück. Der Renderer macht daraus die Karte. Wichtig für die Architektur: Die Karte zeigt nur, was die Aktion liefert. Der Agent erfindet keine Teilenummer und keinen Preis, wenn die Daten aus ERP oder PLM kommen und das Sprachmodell sie nur weiterreicht.

Für den Service-Agenten im Web-Chat legen Sie im Bundle den Kanalordner `enhancedWebChat` an. Für die mobile Ansicht gibt es `lightningMobileGenAi`, für Mitarbeiter-Agenten in Lightning Experience `lightningDesktopGenAi`. Ein Typ kann also im Chat des Kunden anders aussehen als in der Konsole Ihres Innendienstes.

## Welche Karten lohnen sich für Hersteller?

Ich würde nur Antworten als Karte bauen, die strukturiert sind und die der Kunde danach nutzt. Drei Kandidaten liegen bei Herstellern nahe, hier als Annahme formuliert:

- **Ersatzteilkarte:** Teilenummer, Bild, Verfügbarkeit, Händler- oder Kundenpreis und ein Button zum Warenkorb. Die Daten kommen aus PLM und ERP, wie in [Ersatzteile per Seriennummer](../ersatzteile-seriennummer-ki-agent/) beschrieben.
- **Auftragsstatus:** Auftragsnummer, Positionen, Liefertermin, Sendungsnummer. Eine typische Frage an den Innendienst; der Weg über MuleSoft an SAP steht in [Agentforce und SAP](../agentforce-sap-auftragsstatus/).
- **Terminvorschläge:** zwei oder drei freie Zeitfenster für einen Techniker, aus denen der Kunde wählt.

Beim dritten Punkt lohnt ein Blick in die [Vergleichstabelle von Salesforce](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5). Die fertigen Messaging Components „Time Selector“, „Form“ und „Notification“ gibt es in v1, in v2 nicht. Auch eigene LWC in der Textblase fallen in v2 weg. Rich Links und Fragen mit festen oder dynamischen Antwortoptionen gibt es in beiden Versionen. Wer heute Termine über den Time Selector anbietet, baut die Auswahl in v2 als Lightning Type nach oder bleibt mit diesem Kanal vorerst auf v1.

```staerken-grenzen
titel: Custom Lightning Types im Enhanced Chat v2
+ Strukturierte Antwort | Karte statt Fließtext, mit Daten aus der Aktion *
+ Ein Typ, mehrere Kanäle | eigene Anzeige für Web-Chat, Mobile und Lightning Experience
- Nur v2 | Enhanced Chat v1 zeigt die Typen nicht an
- Entwicklungsaufwand | Schema, Apex oder Flow und LWC je Karte
- Fehlende Bausteine | Time Selector, Form und Notification gibt es in v2 nicht
besser: Für reine Auswahlfragen reichen die Antwortoptionen, die v1 und v2 schon mitbringen.
```

Eine Warnung aus der Umstellungsanleitung gehört hierher: Laufen v1 und v2 auf derselben Website, erscheinen Nachrichten in v1 womöglich nicht. Eine Karte, die nur v2 zeigt, ist ein weiterer Grund, beide Versionen nicht parallel auf einer Domain zu betreiben.

## Kann der Agent Fotos und PDFs annehmen?

Ja. Der [Developer's Guide zum Winter-'27-Release](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release) schreibt, dass Service- und Mitarbeiter-Agenten jetzt Screenshots, Belege und PDFs in Enhanced Chat v1, Enhanced Chat v2 und Lightning Experience annehmen. Der Agent kann die Datei lesen, an einen Datensatz hängen oder als Kontext nutzen. Ausgerollt wird ab der Woche des 21. September 2026.

Gesteuert wird das über den Upload-Modus in der Konfiguration des Agenten. Der Guide nennt vier Werte: `auto` (Standard), `managed`, `disabled` und `error`. Im Modus managed landen hochgeladene Dateien in der Systemvariable `uploaded_files`, und Ihre Agentenlogik entscheidet, was damit passiert. Was auto im Detail mit einer Datei macht, beschreibt der Guide nicht; das würde ich in einer Sandbox testen, bevor ich mich darauf verlasse.

Für Hersteller ist das Foto vom Typenschild der naheliegende Fall. Der Kunde weiß die Seriennummer nicht, kann sie aber fotografieren. Ich würde dafür managed wählen: Die Logik prüft, ob ein Bild kam, lässt die Seriennummer auslesen, gleicht sie mit dem Asset in Salesforce ab und fragt nach, wenn sie nicht passt. Erst danach sucht der Agent Ersatzteile. Ein Schadensfoto hängt dieselbe Logik an den Case, damit der Techniker es vor dem Einsatz sieht.

Zwei Dinge würde ich vor dem Go-live klären. Erstens die [Rate Limits](https://help.salesforce.com/apex/HTViewHelpDoc?id=service.miaw_rate_limits.htm): 12 Dateien pro Konversation und Minute. Zweitens, was mit den Bildern passiert. Ein Foto aus der Werkhalle zeigt manchmal mehr als das Typenschild, etwa Personen oder fremde Anlagen. Wo die Datei gespeichert wird und wann sie gelöscht wird, gehört ins Datenschutzkonzept, bevor der erste Kunde ein Bild schickt. Wie Sie Eingaben im Händlerportal absichern, steht in [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

## Was bringt Token Streaming, und wo ist der Haken?

Mit **Token Streaming** erscheint die Antwort des Agenten Wort für Wort, statt nach einigen Sekunden Warten als ganzer Block. Salesforce nennt das auf der [Übersichtsseite zu v2](https://help.salesforce.com/s/articleView?id=service.enhanced_chat_v2_intro.htm&language=en_US&type=5) als eine der agentischen Funktionen. Für den Kunden fühlt sich der Chat schneller an, auch wenn die Antwort gleich lang braucht.

Der Haken steht in der [Dokumentation der Messaging API](https://developer.salesforce.com/docs/service/messaging-api/references/about/server-sent-events-payloads-token-streaming.html): Der Trust Layer kann eine Antwort erst auf Halluzinationen prüfen, wenn sie vollständig ist. Fällt die Prüfung durch, schickt Salesforce ein Validierungssignal mit dem Grund „UNGROUNDED“, und der Client kann den bereits gestreamten Text entfernen. Danach kann ein neuer Satz Tokens folgen.

```hinweis achtung
Ein Kunde kann eine gestreamte Antwort lesen, bevor der Trust Layer sie verworfen hat. Für Preise, Liefertermine und Sicherheitshinweise würde ich die Antwort deshalb als Karte aus einer Aktion liefern statt als gestreamten Freitext.
```

Wer einen eigenen Client auf der Messaging API baut, muss Streaming ab CapabilitiesVersion 63 selbst umsetzen: Tokens tragen eine fortlaufende `sequenceNumber`, können in falscher Reihenfolge ankommen und müssen sortiert werden. Für den Standard-Client von v2 nennt die API-Dokumentation dazu keine Details. Was der Trust Layer sonst prüft und maskiert, steht in [Einstein Trust Layer: was er schützt](../einstein-trust-layer-was-er-schuetzt/).

## Was ich im Projekt gesehen habe

**[Platzhalter, wartet auf Fabian]** Hier kommt ein anonymisiertes Beispiel aus Fabians Enhanced-Chat-v2-Projekt hin: welche Antworten als Karte gebaut wurden, ob Kunden Fotos schicken durften und ob Streaming aktiv war. Bis zu seiner Bestätigung bleibt der Artikel ein Entwurf.

## Womit sollten Sie anfangen?

Ich würde in dieser Reihenfolge vorgehen:

1. Die drei häufigsten Fragen aus Telefon und E-Mail Ihres Service-Teams auszählen. Ist eine davon strukturiert, etwa Auftragsstatus oder Ersatzteil, wird sie die erste Karte.
2. Die Aktion dahinter zuerst ohne Karte bauen und testen. Liefert sie die richtigen Daten, ist der Lightning Type der kleinere Schritt.
3. Den Upload-Modus bewusst wählen und mit dem Datenschutz klären, statt auto einfach stehen zu lassen.
4. Streaming nur einschalten, wenn klar ist, welche Antworten über Karten laufen und welche als Freitext gestreamt werden dürfen.

Wenn Sie heute Time Selector oder Formulare in v1 nutzen, prüfen Sie diese Lücke vor der Umstellung. Den Rahmen dafür setzt die [Salesforce-Architektur](../../leistungen/salesforce-architektur/), in der Agent, Aktionen und Datenquellen zusammenkommen.

Eine gute Karte im Chat beginnt bei sauberen Daten aus ERP und PLM, die Oberfläche ist danach der kleinere Teil.
