---
title: "Enhanced Chat im Portal: Inline-Modus, Branding, Sprachen"
description: "Wie Sie Salesforce Enhanced Chat v2 ins Händlerportal einbetten: schwebend oder inline, Branding ohne Code und drei Sprachebenen für zwölf Händlersprachen."
pubDate: 2026-10-31
lang: de
slug: enhanced-chat-portal-inline-modus-sprachen
translationKey: enhanced-chat-portal
topic: service
categories: [ai, architecture]
tags: [Enhanced Chat, Experience Cloud, Händlerportal, Mehrsprachigkeit, Agentforce, Service Cloud]
series: { id: enhanced-chat, part: 8 }
takeaways:
  - "Den Inline-Modus gibt es nur in Enhanced Chat v2. Der Chat füllt dann einen Container der Seite statt als Button über ihr zu schweben."
  - "Inline passt, wenn der Chat Teil eines Arbeitsschritts im Portal ist, etwa auf der Seite einer Maschine. Für allgemeine Fragen auf jeder Seite bleibt der schwebende Button die bessere Wahl."
  - "Farben, Schriften, Logo, Avatare und Fenstergröße stellen Sie im Embedded Service Deployment ohne Code ein. Eigene Oberflächen im Chat laufen über Custom Lightning Types."
  - "Mehrsprachigkeit hat im Chat drei Ebenen: die Oberfläche, den KI-Agenten und die Menschen im Service. Jede wird getrennt eingerichtet und getestet."
  - "Real-Time Translations nimmt eigene Terminologie für höchstens zehn Sprachen an. Bei zwölf Händlersprachen müssen Sie entscheiden, welche zwei ohne Glossar laufen."
faq:
  - q: "Was ist der Inline-Modus in Enhanced Chat v2?"
    a: "Im Inline-Modus zeigt Enhanced Chat v2 das Chatfenster direkt in einem div-Element Ihrer Seite an statt als schwebenden Button. Sie setzen dafür im Code-Snippet displayMode auf inline und geben mit targetElement den Container an. In v1 gibt es den Modus nicht."
  - q: "Wie binde ich Enhanced Chat in eine Experience-Cloud-Site ein?"
    a: "Sie ziehen die Komponente Embedded Messaging in die Seitenvorlage oder fügen das Code-Snippet des Deployments ein, veröffentlichen Deployment und Site und tragen die Domain der Site in die CORS-Allowlist ein. Ohne den CORS-Eintrag lädt der Chat nicht, und es erscheint keine klare Fehlermeldung."
  - q: "In welcher Sprache erscheint Enhanced Chat?"
    a: "Die Oberfläche folgt der Spracheinstellung im Code-Snippet (settings.language). Auf LWR-Sites übernimmt v2 mit der Einstellung useHostSiteLanguage die Sprache der Site. Die Sprache des KI-Agenten setzen Sie getrennt davon über ein Pre-Chat-Feld und den Omni-Channel-Flow."
  - q: "Brauche ich für mehrsprachigen Chat eine Übersetzungs-App?"
    a: "Für den KI-Agenten nicht, er antwortet in der Sitzungssprache. Für Menschen im Service gibt es Real-Time Translations von Salesforce, das die Agentforce-for-Service-SKU und eine eigene Permission Set License braucht."
draft: true
---

Für ein Händlerportal würde ich Salesforce Enhanced Chat v2 dort inline einbetten, wo der Chat zu einem Arbeitsschritt gehört, etwa auf der Seite einer Maschine oder eines Servicefalls, und überall sonst beim schwebenden Button bleiben. Den Inline-Modus gibt es nur in v2. Das Branding stellen Sie im Embedded Service Deployment ohne Code ein. Aufwendig wird es bei den Sprachen: Oberfläche, KI-Agent und Servicemitarbeitende haben je eine eigene Spracheinstellung. Zwölf Händlersprachen sind machbar, wenn Sie alle drei Ebenen einrichten und jede Sprache vor dem Go-live testen.

## Schwebend oder inline: wann passt welcher Enhanced-Chat-Modus?

Standardmäßig erscheint Enhanced Chat als schwebender Button unten rechts, der ein Chatfenster über der Seite öffnet. Der [Guide zum Inline-Modus](https://developer.salesforce.com/docs/ai/agentforce/guide/enhanced-chat-inline-mode.html) beschreibt die Alternative: Der Chat wird direkt in einem div-Element der Seite angezeigt und füllt diesen Container vollständig aus. Die Größe bestimmt also Ihr Seitenlayout.

Eingerichtet wird das im Code-Snippet des Deployments mit drei Einstellungen:

- `displayMode = 'inline'` schaltet den Modus ein.
- `targetElement` zeigt auf den Container, etwa ein Element mit der Klasse `chat-container`.
- `headerEnabled = false` blendet den Kopf des Chatfensters aus, wenn Ihre Seite schon eine Überschrift hat.

Laut [Settings-Referenz](https://developer.salesforce.com/docs/service/messaging-web/references/m4w-reference/settingsAPI.html) startet der Chat im Inline-Modus automatisch. Mit `disableInlineAutoLaunch` bleibt er verborgen, bis Ihr Code `launchChat` aufruft. Vergessen Sie diesen Aufruf, sehen Händler einen leeren Kasten. Zwei Fehlkonfigurationen meldet v2 in der Browserkonsole: Inline ohne eigenen Container bettet den Chat über die ganze Seite, ein eigener Container ohne Inline lässt den Button in diesem Container schweben.

```tabelle
titel: Schwebender Button oder Inline-Modus im Händlerportal
spalten: | Schwebend | Inline
Verfügbar | v1 und v2 | nur v2 *
Ort | Button auf jeder Seite, Fenster darüber | fester Bereich in der Seite *
Größe | Breite und Höhe im Branding | so groß wie der Container
Start | Händler klickt den Button | automatisch, oder per launchChat
Passt für | allgemeine Fragen von überall | Chat zu Maschine, Auftrag, Fall *
fazit: Beide Modi nutzen denselben Kanal und dasselbe Routing. Es ändert sich nur die Darstellung.
```

Meine Faustregel: Gehört eine Frage zu einem Objekt, das der Händler gerade ansieht, gehört der Chat neben dieses Objekt. Ein Händler auf der Seite einer Seriennummer will den Agenten zu genau dieser Maschine fragen, und der Inline-Bereich macht das sichtbar. Welche Seriennummer und welche Seite der Agent mitbekommt, regeln Hidden Pre-Chat und Context Events, die Teil 6 der Serie beschreibt.

## Wie kommt Enhanced Chat in eine Experience-Cloud-Site?

Das [Trailhead-Modul zum Agentforce-Deployment](https://trailhead.salesforce.com/content/learn/modules/agentforce-deployment-quick-look/deploy-the-messaging-connection-to-a-website) zeigt den Weg über Experience Builder: die Komponente Embedded Messaging in die Seitenvorlage ziehen, die Site veröffentlichen und das Deployment ebenfalls veröffentlichen. Für eigene Websites kopieren Sie stattdessen das Code-Snippet aus Setup unter Embedded Service Deployments. Wie ein Portal für Händler grundsätzlich aufgebaut ist, steht in [Kundenportal mit Manufacturing Cloud](../manufacturing-cloud-kundenportal/).

```hinweis achtung
Tragen Sie die Domain der Site mit https:// in die CORS-Allowlist in Setup ein, bei Problemen in der Vorschau auch die Domain *.live-preview. Laut Trailhead lädt der Chat sonst überhaupt nicht, und keine Fehlermeldung erklärt, warum.
```

Zwei weitere Punkte aus den Hilfeseiten. Erstens: Salesforce warnt davor, v1 und v2 auf derselben Website zu betreiben, weil dann Nachrichten in v1 fehlen können. Stellen Sie das Portal in einem Schritt um. Zweitens: Jede Änderung am Deployment wird erst nach dem Veröffentlichen sichtbar, auch in der Testumgebung.

Offen ist für mich, wie sich der Inline-Modus in einer LWR-Site mit Experience Builder am saubersten platzieren lässt. Der Guide beschreibt nur das Snippet mit einem Container, nicht die Komponente. Das würde ich im Proof of Concept als Erstes klären.

## Was lässt sich am Branding ohne Code einstellen?

Laut [Hilfeseite zum Deployment](https://help.salesforce.com/apex/HTViewHelpDoc?id=service.miaw_create_deployment_type.htm) wählen Sie Farben und Schriften und laden Logos und Avatare hoch, ohne Entwicklungsaufwand. Die [Vergleichstabelle v1 zu v2](https://help.salesforce.com/s/articleView?language=en_US&id=service.enhanced_chat_feature_comparison.htm&type=5) führt Farben, Schriften, Bilder und Fenstergröße als gleich in beiden Versionen. Die Einstellungen liegen im Embedded Service Deployment unter Branding:

- **Farben** für Button, Kopfzeile, Nachrichten des Agenten und des Händlers, Text und Links.
- **Schriften** aus einer Auswahl oder eine eigene Schrift, dazu die Schriftgröße.
- **Bilder** für Logo im Kopf sowie Avatare für Servicemitarbeitende und den KI-Agenten.
- **Fenstergröße** für den schwebenden Modus, Breite und Höhe getrennt.

Für ein Händlerportal reicht das fast immer. Ich würde die Farben aus dem Designsystem des Portals übernehmen und dem KI-Agenten einen eigenen Avatar geben, damit Händler sehen, wann ein Mensch übernimmt. Alles, was über Farben und Bilder hinausgeht, etwa eine Ersatzteilkarte mit Bild und Preis im Chat, ist kein Branding mehr. Das läuft über Custom Lightning Types, die Teil 7 der Serie zeigt.

## Wie läuft Enhanced Chat in zwölf Sprachen?

Zwölf Sprachen sind bei Herstellern mit Händlern in Europa schnell erreicht. Im Chat gibt es dafür drei Ebenen, die unabhängig voneinander eingerichtet werden.

```tabelle
titel: Drei Sprachebenen im Enhanced Chat
spalten: Ebene | Was übersetzt wird | Wo Sie es einstellen
Oberfläche | Button, Pre-Chat-Felder, Systemmeldungen | settings.language, Custom Labels pro Sprache *
KI-Agent | Antworten des Agenten | Sitzungssprache über Pre-Chat-Feld und Flow
Service | Nachrichten zwischen Händler und Mensch | Real-Time Translations, Agentforce for Service *
fazit: Jede Ebene braucht eigene Tests. Eine richtige Oberfläche sagt nichts über die Antworten des Agenten.
```

**Die Oberfläche.** Die Sprache steht im Code-Snippet unter `embeddedservice_bootstrap.settings.language`. Eigene Texte für Begrüßung, Pre-Chat-Felder, Barrierefreiheit und Systemmeldungen pflegen Sie als [Custom Labels](https://help.salesforce.com/s/articleView?id=service.miaw_custom_labels.htm&language=en_US&type=5), und laut Help wiederholen Sie das für jede Sprache. Bei zwölf Sprachen ist das eine Übersetzungsliste, die jemand verantworten muss. Für Arabisch beschreibt ein [Knowledge-Artikel von Salesforce](https://help.salesforce.com/s/articleView?id=005237057&language=en_US&type=1), dass die Darstellung von rechts nach links erst stimmt, wenn die Sprache in den Spracheinstellungen aktiviert und im Snippet ausdrücklich gesetzt ist.

Auf LWR-Sites gibt es in v2 eine Abkürzung. Laut [Guide zur Sprache der Site](https://developer.salesforce.com/docs/service/messaging-web/guide/use-host-site-language.html) lädt der Chat in einem iframe, das standardmäßig auf Englisch steht, sodass Standardkomponenten im Chat englisch erscheinen können. Mit `useHostSiteLanguage` übernimmt der Chat die Sprache der Site. Jede Sprache muss vorher in der Site angelegt sein, sonst endet das Laden mit einem Fehler 404.

**Der KI-Agent.** Die Antwortsprache des Agenten hängt an der Sitzungssprache. Üblich ist, die Sprache der Seite als verstecktes Pre-Chat-Feld mitzugeben und im Omni-Channel-Flow in das Feld EndUserLanguage der Messaging Session zu schreiben. Welche Sprachen Agentforce beherrscht, wie der Retriever Wissen nach Sprache filtert und was Übersetzung kostet, steht in [Mehrsprachige Agentforce-Agenten für Händler im Export](../mehrsprachige-agentforce-agenten-export/).

**Die Menschen im Service.** [Real-Time Translations](https://help.salesforce.com/s/articleView?language=en_US&id=service.messaging_translate_2.htm&type=5) übersetzt eingehende Nachrichten in die Sprache des Mitarbeitenden und dessen Antworten zurück in die Sprache des Händlers. Die Funktion braucht die Agentforce-for-Service-SKU, eine Permission Set License und die Berechtigung Translate Enhanced Conversations. Eigene Terminologie nimmt sie für bis zu zehn Sprachen an. Bei zwölf Händlersprachen laufen also mindestens zwei ohne Glossar, und gerade Teilebezeichnungen sind das, was maschinelle Übersetzung falsch macht. Salesforce empfiehlt außerdem, Händler darauf hinzuweisen, dass Übersetzung im Spiel ist, etwa in der Begrüßung.

## Was ich im Projekt gesehen habe

**Platzhalter Praxisbeispiel:** Hier folgt ein anonymisiertes Beispiel aus Fabians Enhanced-Chat-Projekt, sobald er es bestätigt hat: wo der Chat eingebettet wurde, schwebend oder inline, wie viele Sprachen und welche Ebene den meisten Aufwand gemacht hat.

## Wo sollten Sie anfangen?

Ich würde mit einem Proof of Concept in zwei Sprachen beginnen, einer Hauptsprache und einer mit eigener Schrift oder Leserichtung, und erst danach auf alle zwölf erweitern.

```schritte
Seiten festlegen | 1 Woche · Portalverantwortliche
  Entscheiden, wo der Chat inline steht und wo der Button bleibt.
Deployment bauen | 1 bis 2 Wochen · Partner
  v2-Deployment, Branding, CORS und Container in der Site einrichten.
Zwei Sprachen testen | 2 Wochen · Service und Partner
  Oberfläche, Agent und Übersetzung in einer Haupt- und einer Sondersprache prüfen.
Ausrollen | je Sprache · Service
  Custom Labels, Glossar und Testfälle pro Sprache ergänzen, dann freischalten.
```

Die Dauer ist eine Annahme für ein Portal mit wenigen Seiten. Wer die Aufteilung zwischen Partner und interner IT klären will, findet mehr unter [Salesforce-Architektur](../../leistungen/salesforce-architektur/). Bei zwölf Sprachen entscheidet am Ende, wer die Übersetzungen der Oberfläche und das Glossar dauerhaft pflegt.
