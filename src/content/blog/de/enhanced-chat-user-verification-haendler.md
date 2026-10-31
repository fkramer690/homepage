---
title: "Enhanced Chat User Verification: angemeldete Händler"
description: "Wie Händler im Portal per User Verification angemeldet chatten, warum ihr Verlauf dann bleibt und wer das Token erzeugt, wenn Sie Enhanced Chat v2 einführen."
pubDate: 2026-10-31
lang: de
slug: enhanced-chat-user-verification-haendler
translationKey: enhanced-chat-user-verification
topic: security
categories: [ai, architecture]
contactBrief: integration
tags: [Enhanced Chat, User Verification, Händlerportal, Experience Cloud, JWT, Agentforce]
series: { id: enhanced-chat, part: 4 }
takeaways:
  - "User Verification im Enhanced Chat meldet einen Händler mit einem signierten JSON Web Token (JWT) an, das Ihr Portal beim Login ausstellt und Salesforce mit Ihrem öffentlichen Schlüssel prüft."
  - "Angemeldete Händler behalten ihren Chatverlauf über Logout, Login und Geräte hinweg; bei anonymen Besuchern verschwindet er im Web spätestens nach sechs Stunden."
  - "Auf einem Kanal mit User Verification erscheint der Chat-Button erst, wenn ein gültiges Token da ist. Für die öffentliche Website ohne Login plane ich deshalb einen eigenen, anonymen Kanal."
  - "Den Händler-Account, nach dem Agent und Flows filtern, leite ich aus dem signierten Token ab und nie aus einem versteckten Pre-Chat-Feld, das im Browser gesetzt wird."
  - "Das Token erzeugt Ihr System, nicht Salesforce. Schlüssel, Laufzeit und Erneuerung gehören deshalb von Anfang an in die Aufwandsschätzung und zur IT-Sicherheit."
faq:
  - q: "Was ist User Verification im Salesforce Enhanced Chat?"
    a: "Eine Anmeldung des Chatnutzers über ein signiertes JSON Web Token. Salesforce prüft das Token mit einem hinterlegten öffentlichen Schlüssel und ordnet dem Nutzer über den Claim sub seinen Chatverlauf zu."
  - q: "Wie lange bleibt der Chatverlauf ohne Anmeldung erhalten?"
    a: "Im Web so lange, wie die Einstellung Authorization Token Expiration Time for Unverified Users erlaubt, höchstens sechs Stunden. Danach ist der Verlauf aus dem Chatfenster verschwunden."
  - q: "Welche Signatur braucht das Token?"
    a: "Laut Salesforce RS256 oder RS512 mit einem RSA-Schlüssel von mindestens 2.048 Bit. Den öffentlichen Schlüssel laden Sie als JSON Web Key in ein Keyset im Setup."
  - q: "Gilt User Verification auch für WhatsApp oder SMS?"
    a: "Nein. Salesforce beschreibt User Verification nur für Enhanced Web Chat und Enhanced In-App Chat, nicht für WhatsApp, SMS, Facebook Messenger, Apple Messages, LINE oder Bring Your Own Channel."
  - q: "Muss ich für Enhanced Chat v2 die User Verification neu einrichten?"
    a: "Nach der Vergleichstabelle von Salesforce funktioniert User Verification in v1 und v2 gleich. Sie hängt am Messaging-Kanal, das neue v2-Deployment nutzt also dieselbe Einstellung."
draft: true
---

Wenn Ihre Händler im Portal angemeldet sind, sollten sie auch im Enhanced Chat angemeldet sein. Salesforce nennt das User Verification: Ihr Portal stellt beim Login ein signiertes JSON Web Token aus, der Chat schickt es an Salesforce, und Salesforce prüft es mit Ihrem öffentlichen Schlüssel. Danach behält der Händler seinen Chatverlauf über Geräte und Logins hinweg, und Agent wie Flows wissen sicher, für welchen Account sie arbeiten. Die öffentliche Website bleibt anonym. Diese Trennung entscheide ich am Anfang, weil sie bestimmt, wie viele Deployments Sie bauen und wer das Token liefert.

Dies ist Teil 4 der Serie zu Enhanced Chat v2, früher Messaging for In-App and Web. Das Datenmodell mit Messaging End User und Conversation steht in Teil 3, das Routing zum Agenten in Teil 5.

## Was ist User Verification im Enhanced Chat?

User Verification ist die Anmeldung des Chatnutzers über ein JSON Web Token, kurz JWT. Ein JWT ist ein kleiner, signierter Datensatz mit drei Teilen: Kopf, Inhalt und Signatur. Die Signatur beweist, dass niemand den Inhalt verändert hat. Verschlüsselt ist er nicht, jeder kann ihn lesen. Deshalb gehören keine Preise oder Kundendaten hinein.

Für den Chat zählt vor allem ein Feld im Inhalt, der Claim `sub` (Subject). Er identifiziert den Nutzer. Laut [Salesforce-Hilfe](https://help.salesforce.com/apex/HTViewHelpDoc?id=service.user_verification_terms.htm) sucht Enhanced Chat über diesen Wert den Verlauf des Nutzers und speichert ihn im Feld Messaging Platform Key am Datensatz Messaging End User. Der Wert in `sub` ist damit dauerhaft der Schlüssel zum Verlauf eines Händlers. Ändert er sich, etwa weil das Portal die Benutzer-ID wechselt, sieht der Händler seine alten Gespräche nicht mehr.

Die technischen Vorgaben sind knapp. Das Token muss mit RS256 oder RS512 signiert sein, der RSA-Schlüssel braucht mindestens 2.048 Bit. Den öffentlichen Teil des Schlüssels laden Sie als JSON Web Key in ein Keyset im Setup. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/messaging-optimization-for-in-app-and-web/verify-end-user-share-msg-history) richten Sie drei Dinge ein: das Keyset auf der Setup-Seite User Verification, die Verifizierung samt Token-Laufzeit am Messaging-Kanal und den Aufruf, der das Token aus der Website an Salesforce übergibt.

User Verification gilt nur für Enhanced Web Chat und Enhanced In-App Chat. WhatsApp, SMS und die anderen Messaging-Kanäle kennen sie nicht. In Enhanced Chat v2 funktioniert sie laut [Vergleichstabelle](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5) wie in v1.

## Was ändert sich für den Händler, wenn er angemeldet ist?

Der Unterschied zeigt sich beim zweiten Gespräch. Ein anonymer Besucher, der eine Frage zu einer Ersatzteillieferung stellt und am nächsten Tag wiederkommt, fängt von vorn an. Ein angemeldeter Händler sieht seine Frage von gestern und die Antwort darauf, auch wenn er inzwischen vom Büro-PC aufs Tablet in der Werkstatt gewechselt hat.

```tabelle
titel: Enhanced Web Chat: anonym oder angemeldet
spalten: | Anonym | Angemeldet *
Verlauf im Chatfenster | verschwindet nach der Token-Laufzeit, höchstens 6 Stunden | bleibt, auch nach Logout und erneutem Login *
Geräte | nur im aktuellen Browser | Web und App, wenn der Nutzer dort verifiziert ist *
Wer ist das? | unbekannt, nur was der Besucher eintippt | Claim sub, geprüft per Signatur *
Chat-Button | sofort sichtbar | erst nach gültigem Token
Salesforce-Token | Laufzeit bis 6 Stunden | Standard 60 Minuten, erneuerbar
fazit: Quellen: Trailhead „Verify End Users and Share Messaging History“, Developer Guide „User Verification“, Stand 31.10.2026.
```

Für den Service im Maschinenbau ist der Verlauf mehr als Komfort. Händler klären oft über Tage einen Fall: Rückfrage zur Seriennummer, Foto vom Typenschild, Bestellung des Teils, Liefertermin. Mit Verlauf liest der Mitarbeiter im Service oder der Agentforce-Agent nach, was schon geklärt ist, statt dieselben Fragen ein zweites Mal zu stellen.

## Wie läuft die Anmeldung im Chat technisch ab?

Der Ablauf im Browser ist im [Developer Guide](https://developer.salesforce.com/docs/service/messaging-web/guide/user-verification.html) beschrieben. Für die Planung reichen vier Schritte.

```schritte
Login im Portal | Identity Provider
  Der Händler meldet sich an, Ihr System stellt ein JWT mit seiner ID in sub aus.
Token übergeben | Website
  Die Seite übergibt das Token mit setIdentityToken, in jedem Tab und nach jedem Neuladen.
Token prüfen | Salesforce
  Salesforce prüft die Signatur mit dem Keyset, zeigt den Chat-Button und öffnet die Sitzung mit dem Verlauf.
Erneuern oder abmelden | Website
  Läuft das Token ab, kommt ein neues innerhalb von 30 Sekunden. Beim Logout ruft die Seite clearSession auf.
```

Zwei Details übersehen Teams leicht. Das Token liegt nur im Speicher des Browsers. Jedes Neuladen der Seite und jeder neue Tab braucht deshalb einen neuen Aufruf. Und wenn der Händler nach Ablauf beider Tokens wieder tippt, feuert das Ereignis `onEmbeddedMessagingIdentityTokenExpired`. Kommt dann binnen 30 Sekunden kein neues Token, räumt der Chat die Sitzung selbst ab. Ihr Portal braucht also einen Weg, ein frisches Token zu holen, ohne dass der Händler sich neu anmeldet.

## Wer erzeugt das Token?

Ihr System, nicht Salesforce. In den Quellen, die ich gelesen habe, beschreibt Salesforce, wie der Chat ein Token prüft, aber nicht, wo es herkommt. Ist Ihr Händlerportal eine Experience-Cloud-Site, braucht es trotzdem einen kleinen Dienst, der das Token signiert, etwa in Apex mit einem Zertifikat oder im Identity Provider, an dem die Händler sich anmelden. Läuft das Portal außerhalb von Salesforce, übernimmt das dessen Backend.

Daraus folgen Fragen, die ich vor dem Bau kläre:

- **Welcher Wert steht in `sub`?** Ich nehme eine ID, die sich nie ändert, etwa die Benutzer-ID im Identity Provider. Die E-Mail-Adresse ist keine gute Wahl, weil Händler sie wechseln.
- **Wo liegt der private Schlüssel?** Er gehört in den Tresor der IT-Sicherheit, nicht in ein Repository. Das Keyset in Salesforce kennt nur den öffentlichen Teil.
- **Wie läuft der Schlüsselwechsel?** Das Feld `kid` im Kopf des Tokens sagt Salesforce, welcher Schlüssel gilt. Ein Keyset kann mehrere Schlüssel halten, damit alter und neuer Schlüssel eine Zeit lang parallel gelten.
- **Wie lange gilt das Token?** Kurz genug, damit ein gestohlenes Token wenig nützt, lang genug, damit das Portal nicht ständig erneuern muss.

```hinweis achtung
Echte Tokens aus Produktion gehören in kein Online-Tool zum Entschlüsseln. Salesforce warnt ausdrücklich davor; zum Testen nehmen Sie Tokens aus einer Sandbox.
```

## Reicht nicht ein verstecktes Pre-Chat-Feld mit der Händlernummer?

Für Kontext ja, für Berechtigungen nein. Hidden Pre-Chat setzt Werte wie Händler- oder Auftragsnummer per JavaScript im Browser. Was im Browser gesetzt wird, kann ein Nutzer mit den Entwicklerwerkzeugen ändern. Wenn ein Agent danach entscheidet, welche Aufträge er zeigt, sieht ein neugieriger Händler mit einer fremden Nummer die Aufträge eines anderen.

Deshalb trenne ich zwei Dinge. Wer der Händler ist, kommt aus dem signierten Token: Der Flow ordnet über den Wert in `sub` den Kontakt und den Account zu, und Aktionen des Agenten filtern in Logik nach diesem Account. Was er gerade ansieht, darf aus dem Browser kommen: Seite, Seriennummer, Suchbegriff. Das Prinzip habe ich für die [Agent API in eigenen Händler-Apps](../agentforce-agent-api-eigene-apps/) beschrieben, und es schützt auch gegen [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/). Wie Seite und Suche zum Agenten kommen, zeigt Teil 6 der Serie.

## Ein Kanal für alle oder getrennt nach Website und Portal?

Laut Developer Guide erscheint der Chat-Button auf einem verifizierten Kanal erst, wenn die Seite ein gültiges Token übergeben hat. Ein Besucher der öffentlichen Website ohne Login hat keins. Weil die Verifizierung am Messaging-Kanal hängt, plane ich zwei Kanäle mit je einem Deployment: einen anonymen für die Website, auf der Interessenten und Endkunden Fragen stellen, und einen verifizierten im Händlerportal. Das hat einen Nebeneffekt, den ich mag: Sie können beide Kanäle getrennt routen. Anonyme Anfragen gehen an den Agenten mit allgemeinem Wissen und an den Vertrieb, angemeldete Händler an den Agenten mit Zugriff auf Aufträge und Ersatzteile und an den Händlerservice.

Der Preis sind zwei Konfigurationen für Branding, Pre-Chat und Routing. Wenn Sie ohnehin auf Enhanced Chat v2 umstellen, ist das der richtige Moment, beide sauber aufzusetzen. Diese Entscheidung gehört in die [Salesforce-Architektur](../../leistungen/salesforce-architektur/) des Serviceprozesses, nicht in die Konfiguration einzelner Seiten. Wie das Portal selbst aufgebaut ist, steht im Artikel zum [Kundenportal in der Manufacturing Cloud](../manufacturing-cloud-kundenportal/).

```praxis
PLATZHALTER, Fabian ergänzt: Wie lief die Anmeldung im Chat in Ihrem Enhanced-Chat-Projekt? Gab es verifizierte Nutzer, wer hat das Token erzeugt, ein oder zwei Deployments, was war der Stolperstein?
```

## Wo fangen Sie an?

Schreiben Sie zuerst auf, welche Besucher sich anmelden und welche nicht. Dann klären Sie mit der IT-Sicherheit, wer das Token signiert, welcher Wert in `sub` steht und wie der Schlüssel gewechselt wird. Erst danach lohnt das Setup in Salesforce, und das ist der kleinere Teil der Arbeit. Ein angemeldeter Händler mit Verlauf ist im Service so viel wert, wie die Identität dahinter verlässlich ist.
