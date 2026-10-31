---
title: "Vom Legacy Chat zu Enhanced Chat: was Sie neu bauen müssen"
description: "Legacy Chat zu Enhanced Chat migrieren: was das Migrationswerkzeug übernimmt und was Sie bei Pre-Chat, Routing, Berichten und Lizenz neu bauen."
pubDate: 2026-10-31
lang: de
slug: legacy-chat-enhanced-chat-migration
translationKey: enhanced-chat-legacy-migration
topic: service
categories: [architecture, ai]
tags: [Enhanced Chat, Legacy Chat, Messaging for In-App and Web, Service Cloud, Omni-Channel, Maschinenbau]
series: { id: enhanced-chat, part: 2 }
takeaways:
  - "Wer vom Legacy Chat auf Enhanced Chat umsteigt, baut Pre-Chat, Routing, Berichte und das Website-Snippet neu; das Migrationswerkzeug von Salesforce übernimmt nur Branding und Custom Labels."
  - "Das Routing wandert vom Code auf der Website in einen Omni-Channel-Flow, der an eine Queue, einen Menschen oder einen Agentforce-Agenten verteilt."
  - "Enhanced Chat hat ein anderes Datenmodell: Berichte entstehen neu auf Messaging Sessions, Messaging Session Metrics und AgentWork, alte Chat-Berichte werden gelöscht."
  - "Ob Ihre Lizenz reicht, sehen Sie in fünf Minuten im Setup unter Messaging Settings; fehlt der Kanaltyp Enhanced Chat, brauchen Sie Digital Engagement."
  - "Legacy Chat und Enhanced Chat können in einer Org parallel laufen, also stellen Sie Marke für Marke oder Land für Land um und schalten den alten Chat erst danach ab."
faq:
  - q: "Wann wurde der Legacy Chat von Salesforce abgeschaltet?"
    a: "Salesforce hat den Legacy Chat, früher Live Agent, zum 14. Februar 2026 abgekündigt. Bis dahin gab es nur noch Sicherheitsupdates; Nachfolger ist Enhanced Chat, früher Messaging for In-App and Web."
  - q: "Gibt es ein Werkzeug, das den Legacy Chat automatisch migriert?"
    a: "Ja, im Setup unter Migrate Chat Deployments legt ein Klick auf Migrate ein Enhanced-Chat-Deployment an. Es übernimmt Branding und Custom Labels; Pre-Chat, Routing, Sensitive Data Rules und Berichte bauen Sie selbst neu."
  - q: "Brauche ich für Enhanced Chat eine neue Lizenz?"
    a: "Nicht unbedingt. Erscheint unter Messaging Settings bei New Channel der Kanaltyp Enhanced Chat, ist er in Ihrer Lizenz enthalten; sonst brauchen Sie laut Salesforce Digital Engagement."
  - q: "Kann ich Legacy Chat und Enhanced Chat gleichzeitig betreiben?"
    a: "Ja, beide können in derselben Org aktiv sein. Damit lässt sich Website für Website oder Region für Region umstellen, während der Rest noch auf dem alten Chat läuft."
  - q: "Sollte ich bei der Migration direkt auf Enhanced Chat v2 gehen?"
    a: "Für Nachzügler meist ja, weil sie ohnehin ein neues Deployment anlegen. Prüfen Sie vorher, ob Sie eine der Funktionen brauchen, die v2 noch fehlen, etwa Pre-Chat bei jeder Sitzung oder Opt-out-Keywords."
draft: true
---

Wer vom Legacy Chat auf Salesforce Enhanced Chat migriert, baut vier Dinge neu: das Pre-Chat-Formular, das Routing als Omni-Channel-Flow, die Berichte auf einem neuen Datenmodell und das Code-Snippet auf der Website. Das Migrationswerkzeug von Salesforce übernimmt nur Branding und Custom Labels. Ob Ihre Lizenz reicht, sehen Sie in fünf Minuten im Setup. Enhanced Chat hieß früher Messaging for In-App and Web; der alte Chat sollte am 14. Februar 2026 enden. Wer heute noch Legacy Chat auf der Website hat, plant deshalb ein kleines Projekt mit Sandbox, Tests und Wellen.

## Wo steht der Legacy Chat heute?

Salesforce hat den Kanal mehrmals umbenannt, deshalb zuerst die Namen. Legacy Chat ist der alte, synchrone Web-Chat der Service Cloud, früher Live Agent, auf der Website als „Embedded Chat“ eingebunden. Laut [Trailhead-Modul zur Migration](https://trailhead.salesforce.com/content/learn/modules/migrating-from-legacy-chat-to-enhanced-chat/explore-enhanced-chat) war er seit einiger Zeit im Wartungsmodus, bekam nur noch Sicherheitsupdates und war zum 14. Februar 2026 abgekündigt. Der Nachfolger hieß zuerst Messaging for In-App and Web und heißt heute Enhanced Chat. Er ist asynchron: Ein Kunde beginnt ein Gespräch, schließt den Tab und macht später weiter, auch auf einem anderen Gerät.

Enhanced Chat v2 ist dann der nächste Schritt innerhalb von Enhanced Chat, eine neue Oberfläche für denselben Kanal. Was v2 kann und was ihm noch fehlt, steht in Teil 1 dieser Serie. Dieser Teil behandelt den größeren Sprung: von der alten Chat-Technik auf den Messaging-Kanal.

Für Hersteller ist das selten nur ein Chatfenster. Der Chat hängt im Händlerportal, auf der Ersatzteilseite oder auf der Website je Marke und Land, oft mit Apex-Triggern, die Seriennummern auswerten oder Fälle anlegen. All das hängt am alten Datenmodell.

## Was übernimmt das Migrationswerkzeug und was nicht?

Salesforce bietet im Setup unter **Migrate Chat Deployments** ein Werkzeug, das per Klick auf Migrate ein Enhanced-Chat-Deployment anlegt. Laut [Trailhead-Einheit „Walk Through a Migration“](https://trailhead.salesforce.com/content/learn/modules/migrating-from-legacy-chat-to-enhanced-chat/walk-through-a-migration) bleiben dabei Branding und Custom Labels erhalten. Der Rest ist Handarbeit. Salesforce empfiehlt, alles zuerst in einer Sandbox zu machen.

```saeulenwechsel
bisher: Bisher: Legacy Chat
alt: Oberfläche | branding, custom labels
alt: Gesprächsstart | pre-chat-formular, website-snippet
alt: Steuerung | direct-to-button-routing, apex-trigger, sensitive data rules
alt: Auswertung | chat-berichte
titel: Enhanced Chat: übernommen und neu gebaut
Deployment * | Farben, Logos < Branding | Texte < Custom Labels
Pre-Chat | Sichtbare und versteckte Felder < Pre-Chat-Formular | Zuordnung im Flow < Pre-Chat-Formular
Website | Neues Snippet < Website-Snippet | Experience Cloud: Embedded Messaging < Website-Snippet
Omni-Channel-Flow | Queue, Mensch, Agent < Direct-to-Button-Routing | Apex und Flows prüfen < Apex-Trigger | Regeln neu anlegen < Sensitive Data Rules
Berichte | Messaging Sessions, Metrics < Chat-Berichte | AgentWork < Chat-Berichte
fazit: **Übernommen:** nur das Deployment mit Branding und Custom Labels, und nur über das Migrationswerkzeug.
fazit: **Neu gebaut:** alles andere.
```

Vor dem Umbau steht ein Inventar. Salesforce nennt den **Chat Transition Readiness Report**, der aktive Deployments, Konfigurationen und Anpassungen auflistet. Dazu gehört alles, was am alten Chat hängt: Apex-Trigger und Klassen, Omni-Channel-Flows, Sensitive Data Rules, Berichte, Direct-to-Button-Routing und Automatisierung auf Chat-Ereignissen. Für jeden Eintrag entscheiden Sie: weg, ersetzen oder anpassen. Eine Voraussetzung vorab: Enhanced Chat lässt sich nur in Lightning Experience einrichten, nicht in Salesforce Classic.

## Was müssen Sie am Pre-Chat neu bauen?

Das Pre-Chat-Formular wird nicht migriert. Enhanced Chat hat laut Salesforce „a different underlying structure“, also bauen Sie es neu: sichtbare Felder wie Name, E-Mail und Kurzbeschreibung, versteckte Felder, die die Website befüllt, optional eine AGB-Zustimmung und eine eigene Lightning-Web-Komponente. Die Werte landen über Parameter-Zuordnungen an der Messaging Session und im Omni-Channel-Flow, der damit zum Beispiel Kontakt oder Auftrag sucht und an die Sitzung hängt.

Für Hersteller lohnt hier ein zweiter Blick. Im Händlerportal kennt die Seite bereits Händlernummer, Land und oft die Seriennummer der Maschine, die der Händler gerade ansieht. Diese Werte gehören in versteckte Felder statt in ein Formular, das der Händler ausfüllen muss. Wie das technisch geht und was die neuen Context Events in v2 zusätzlich können, behandle ich in Teil 6 der Serie.

Planen Sie dabei auf v2: Dort gibt es den Pre-Chat nur einmal pro Konversation, nicht vor jeder Sitzung. Ein Formular, das bei jedem neuen Gespräch die Seriennummer abfragt, funktioniert dort anders als heute.

## Wie ändert sich das Routing?

Im Legacy Chat steckte ein Teil des Routings in der Website. Direct-to-Button-Routing hieß, dass der Code auf der Seite entschied, an welchen Chat-Button und damit an welche Gruppe das Gespräch geht. Enhanced Chat verteilt in Salesforce: Ein Omni-Channel-Flow „gives you the flexibility to route to AI agents, queues, or directly to a service rep“, schreibt Salesforce.

Die Vorbereitung in der Org ist überschaubar: Omni-Channel einschalten, einen Service Channel und eine Queue anlegen, den Flow bauen und die Messaging-Werkzeuge in die Service Console aufnehmen. Der eigentliche Aufwand ist fachlich. Die Regel „Ersatzteilanfragen aus Österreich gehen an das Team in Wien“ stand bisher vielleicht in JavaScript auf der Länderseite. Jetzt steht sie im Flow, und jemand muss sie dort finden und pflegen.

Das ist auch der Punkt, an dem ein Agentforce-Agent dazukommt. Er hängt als Ziel im selben Flow, mit einer Ausweich-Queue, falls er nicht erreichbar ist. Wer vorher einen Einstein Bot im alten Chat hatte, entscheidet hier, welche Pfade fest bleiben und welche an den Agenten gehen; meine Kriterien stehen in [Einstein Bot auf Agentforce umstellen](../einstein-bots-agentforce-umstellen/). Die Übergabe vom Agenten an Menschen ist Thema von Teil 5.

## Welche Berichte müssen Sie neu bauen?

Alle, die auf den alten Chat-Objekten stehen. Salesforce schreibt deutlich: „be prepared to replace your current reports with new reports.“ Enhanced Chat hat ein anderes Datenmodell, und die Kennzahlen liegen auf anderen Objekten:

```tabelle
titel: Wo die Chat-Kennzahlen in Enhanced Chat liegen
spalten: Kennzahl | Objekt | Wo Sie sie sehen
Antwortzeit | Messaging Session Metrics * | Berichtstyp Messaging KPIs
Anzahl Nachrichten | Messaging Session Metrics * | Berichtstyp Messaging KPIs
Bearbeitungszeit | AgentWork | Bericht auf AgentWork
Zeit bis zur Annahme | AgentWork | Bericht auf AgentWork
Laufende Gespräche | Messaging Session | Omni Supervisor, Supervisor Wallboard
fazit: Messaging KPIs ist ein eigener Berichtstyp mit Messaging Sessions als Haupt- und Messaging Session Metrics als zweitem Objekt. Berichte auf den alten Chat-Objekten löschen Sie.
```

Zwei Folgen für die Planung. Erstens: Die Kennzahlen vor und nach der Umstellung sind nicht eins zu eins vergleichbar, weil ein asynchrones Gespräch über Stunden offen bleiben kann. Legen Sie mit der Serviceleitung fest, welche Werte nach dem Go-live als Vergleich gelten, bevor die ersten Berichte im Lenkungskreis landen. Zweitens: Die einzelnen Nachrichten liegen nicht als normale Datensätze in der Org. Wer Chatinhalte auswerten will, etwa nach Fehlerbildern oder Maschinentypen, braucht dafür einen eigenen Weg. Das Datenmodell erkläre ich in Teil 3.

## Brauchen Sie eine neue Lizenz?

Vielleicht. Laut Salesforce haben Legacy-Chat-Kunden Zugriff auf Enhanced Chat, manche brauchen aber Digital Engagement. Der Test im Setup dauert fünf Minuten: Messaging Settings öffnen, auf New Channel und Next klicken und prüfen, ob „Enhanced Chat“ (oder „Messaging for In-App and Web“) als Kanaltyp erscheint. Erscheint er nicht, „you must upgrade to Digital Engagement“.

Auf der [Preisseite für digitale Kanäle](https://www.salesforce.com/service/digital-customer-engagement-platform/pricing/) heißt das Produkt heute Contact Center Digital, für 75 € pro Nutzer und Monat bei jährlicher Abrechnung, mit Web- und In-App-Chat, WhatsApp, SMS und weiteren Kanälen; Stand 31. Oktober 2026. Ein Agentforce-Agent im Chat kostet zusätzlich über Flex Credits, die Rechnung dazu steht in [Flex Credits: Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).

```hinweis offen
Machen Sie den Test im Setup in Produktion, nicht nur in der Sandbox, und lassen Sie sich vom Account Executive schriftlich bestätigen, für welche Nutzer Enhanced Chat in Ihrem Vertrag enthalten ist.
```

## In welcher Reihenfolge stellen Sie um?

Legacy Chat und Enhanced Chat können laut Salesforce in derselben Org parallel aktiv sein. Das ist für Hersteller mit mehreren Marken, Ländern oder Portalen der wichtigste Satz der ganzen Migration, denn er erlaubt eine Umstellung in Wellen. Salesforce nennt als Muster eine Marke nach der anderen, eine Region oder Sprache nach der anderen und eine Testgruppe über ein A/B-Werkzeug auf der Website. Meine Reihenfolge:

```schritte
Inventar | Readiness Report
  Deployments, Apex, Flows, Regeln und Berichte am alten Chat auflisten und je Eintrag entscheiden.
Org vorbereiten | Sandbox
  Lightning, Omni-Channel, Service Channel, Queue, Flow und Service Console einrichten.
Kanal bauen | Sandbox
  Deployment mit dem Migrationswerkzeug anlegen, Pre-Chat, Flow und Regeln neu bauen.
Erste Welle | eine Marke oder ein Land
  Neues Snippet einsetzen, altes entfernen, Berichte neu aufsetzen, Rückmeldungen nach zwei Wochen.
Abschalten | nach der letzten Welle
  Alten Flow löschen und Legacy Chat erst deaktivieren, wenn alle Seiten umgestellt sind.
```

Für die Website heißt das konkret: Auf einer externen Seite ersetzen Sie das alte Snippet (`embedded_svc`) durch das neue (`embeddedservice_bootstrap`). In einer Experience-Cloud-Site ziehen Sie die Komponente Embedded Messaging in den Footer des Templates. Planen Sie größere Umstellungen in Zeiten mit wenig Chatverkehr, schulen Sie Service-Mitarbeitende auf asynchrones Arbeiten und die neuen Werkzeuge der Console, und testen Sie mit Test Messaging am Deployment für Kunden, Service-Mitarbeitende und Supervisoren. Wie ich die Wochen nach dem Go-live begleite, steht in [Hypercare nach dem Salesforce-Go-live](../hypercare-phase-salesforce-go-live/).

```praxis
PLATZHALTER, nicht veröffentlichen: Fabians Projekt. Kam der Kunde vom Legacy Chat oder war Enhanced Chat neu? Was war beim Umbau von Pre-Chat, Routing oder Berichten der größte Aufwand, und was würde er heute anders machen?
```

## Wo sollten Sie anfangen?

Fangen Sie mit dem Lizenztest und dem Readiness Report an, beides geht an einem Vormittag, und Sie wissen danach, ob Sie über Vertrag oder über Technik reden müssen. Wer heute noch Legacy Chat im Code hat, baut den Chat ohnehin neu und sollte das direkt auf Enhanced Chat v2 tun. Bei der Bewertung der Architektur helfe ich als [unabhängiger Salesforce-Architekt](../../leistungen/salesforce-architektur/) auf Kundenseite.
