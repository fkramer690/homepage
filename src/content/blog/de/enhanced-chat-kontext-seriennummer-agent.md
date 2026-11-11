---
title: "Enhanced Chat Kontext: Seriennummer und Seite an den Agenten"
description: "Wie Hidden Pre-Chat und Context Events in Enhanced Chat v2 Seriennummer, Seite und Suche an den Agentforce-Agenten übergeben und wo die Grenzen liegen."
pubDate: 2026-10-31
lang: de
slug: enhanced-chat-kontext-seriennummer-agent
translationKey: enhanced-chat-context
topic: ai
categories: [ai, architecture]
tags: [Enhanced Chat, Agentforce, Pre-Chat, Context Events, Seriennummer, Händlerportal]
series: { id: enhanced-chat, part: 6 }
takeaways:
  - "Hidden Pre-Chat übergibt feste Werte wie Seriennummer oder Händlernummer einmal vor Beginn der Konversation; über Channel-Parameter und Omni-Channel-Flow landen sie an der Messaging Session und beim Agenten."
  - "Context Events gibt es nur in Enhanced Chat v2: utilAPI.setSessionContext schickt die aktuelle Seite und die letzte Suche, und der Agent liest diesen Kontext mit jeder Nachricht neu."
  - "Das Schema der Context Events ist fest auf currentPage und search begrenzt, eine Seriennummer bekommt dort kein eigenes Feld; sie kommt per Pre-Chat oder steht in der URL der Seite."
  - "Für den Willkommenstext des Agenten zählen nur Pre-Chat-Werte, Context Events wertet der Agent erst ab der ersten Nachricht des Kunden aus."
  - "Alles, was der Browser schickt, kann der Besucher ändern; Seriennummer und Seite sind Hinweise für den Agenten, die Identität eines Händlers kommt aus der User Verification."
faq:
  - q: "Was ist Hidden Pre-Chat im Enhanced Chat?"
    a: "Hidden Pre-Chat sind Felder, die Ihre Website per JavaScript an Salesforce schickt, ohne dass der Kunde sie sieht. Es gibt nur eigene Felder, alle vom Typ Text, und sie müssen gesetzt sein, bevor die Konversation beginnt."
  - q: "Was sind Context Events in Enhanced Chat v2?"
    a: "Context Events übergeben mit utilAPI.setSessionContext die aktuelle Seite und die letzte Suche des Besuchers an den Agentforce-Agenten. Der Agent liest den Kontext mit jeder Nachricht; die Methode gibt es nur in Enhanced Chat v2."
  - q: "Kann ich über Context Events eigene Felder wie die Seriennummer schicken?"
    a: "Nein. Salesforce verlangt genau das dokumentierte Schema mit currentPage und search. Eine Seriennummer übergeben Sie als Hidden-Pre-Chat-Feld oder bauen die Seiten-URL so, dass sie die Maschine enthält."
  - q: "Warum nutzt der Willkommenstext meinen Seitenkontext nicht?"
    a: "Salesforce schreibt, dass Kontext aus Context Events nicht für die Willkommensnachricht verwendet wird. Soll der Agent die Maschine schon in der Begrüßung nennen, muss der Wert per Hidden Pre-Chat kommen."
draft: true
---

Ein Agentforce-Agent im Enhanced Chat weiß nur, um welche Maschine es geht, wenn Ihre Website es ihm sagt. Dafür gibt es zwei Wege mit verschiedenem Zeitpunkt. Hidden Pre-Chat übergibt vor dem Start der Konversation feste Werte wie Seriennummer, Kundennummer oder Händlernummer; sie landen über Channel-Parameter und Omni-Channel-Flow an der Messaging Session und von dort als Kontextvariable beim Agenten. Context Events, nur in Enhanced Chat v2, schicken mit jeder Nachricht die aktuelle Seite und die letzte Suche. Meine Regel: Was sich im Gespräch nicht ändert, kommt per Pre-Chat, was sich ändert, per Context Event. Keins von beiden ersetzt eine Anmeldung.

## Warum fragt der Agent sonst zuerst nach der Seriennummer?

Ohne Kontext hat der Agent nur den Text, den der Kunde tippt. Ein Servicetechniker steht im Ersatzteilkatalog Ihres Portals auf der Seite einer Maschine, öffnet den Chat und fragt: „Welcher Filter passt?“ Der Agent muss zurückfragen, um welche Maschine es geht. Der Techniker sucht das Typenschild, tippt die Seriennummer ab und vertippt sich vielleicht. Die Seite, auf der er stand, kannte die Antwort längst.

Kontext entscheidet auch über das Routing. Der Omni-Channel-Flow, der eine Konversation an den Agenten oder eine Queue gibt, kann nur nach Werten verzweigen, die er bekommt. Ein Händler mit Händlernummer soll anders behandelt werden als ein anonymer Besucher der Website. Wie Agent, Queue und Übergabe an Menschen zusammenspielen, beschreibe ich in Teil 5 dieser Serie; hier geht es darum, wie die Werte überhaupt in Salesforce ankommen.

Der Agent selbst braucht die Seriennummer, damit seine Aktion die richtigen Teile findet. Welche Daten dafür aus PLM, ERP und installierter Basis kommen müssen, steht in [Ersatzteile per Seriennummer](../ersatzteile-seriennummer-ki-agent/). Dieser Artikel klärt den Schritt davor: Wie kommt die Nummer von der Webseite in die Variable des Agenten?

## Was ist der Unterschied zwischen Hidden Pre-Chat und Context Events?

**Hidden Pre-Chat** sind Felder, die Ihre Website per JavaScript an Salesforce schickt, ohne dass der Kunde sie sieht. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/messaging-optimization-for-in-app-and-web/collect-information-to-help-end-users) gibt es keine Standardfelder, nur eigene, und alle sind Textfelder. Die Website ruft [`prechatAPI.setHiddenPrechatFields`](https://developer.salesforce.com/docs/service/messaging-web/references/m4w-reference/prechatAPI.html) auf, und zwar laut Referenz „after the onEmbeddedMessagingReady event is dispatched and before the conversation begins“. Danach steht der Wert für diese Konversation fest.

**Context Events** sind neu in Enhanced Chat v2. Mit [`utilAPI.setSessionContext`](https://developer.salesforce.com/docs/service/messaging-web/guide/context-events.html) schickt die Website ein Objekt namens `_AgentContext` mit genau zwei Bereichen: `currentPage`, die URL der Seite, und `search` mit Suchergebnis, Filtern und Facetten. Salesforce schreibt dazu, das Schema müsse exakt dem Beispiel folgen. Der Agent liest diesen Kontext mit jeder Nachricht des Kunden neu, die Website kann ihn also bei jedem Seitenwechsel aktualisieren.

```tabelle
titel: Hidden Pre-Chat und Context Events im Vergleich
spalten: | Hidden Pre-Chat | Context Events
Version | Enhanced Chat v1 und v2 | nur Enhanced Chat v2 *
Zeitpunkt | einmal, vor Beginn der Konversation | mit jeder Nachricht neu *
Felder | eigene Textfelder, frei benannt * | nur currentPage und search
Weg in Salesforce | Channel-Parameter, Flow, Messaging Session | Variablen im Agentforce Builder
Willkommenstext | wird genutzt * | wird nicht genutzt
Typische Werte | Seriennummer, Händlernummer, Portal | Produktseite, Suche im Teilekatalog
fazit: Stand der Salesforce-Dokumentation 31.10.2026.
```

Für den Willkommenstext gilt eine Einschränkung, die man leicht übersieht. Salesforce schreibt, dass Kontext aus Context Events nicht für die Willkommensnachricht verwendet wird; dafür sind die Pre-Chat-Variablen da. Soll der Agent mit „Sie fragen zur Maschine mit der Seriennummer …“ beginnen, muss die Nummer per Hidden Pre-Chat kommen.

## Wie kommt die Seriennummer zum Agenten?

Der Weg eines Hidden-Pre-Chat-Werts führt über mehrere Stationen, und an jeder kann der Name falsch geschrieben sein.

```kette
titel: Der Weg einer Seriennummer von der Seite zum Agenten
Website | setHiddenPrechatFields mit dem Schlüssel Serial_Number
Messaging Channel | eigener Parameter, Channel Variable Name Serial_Number
Parameter Mapping | Flow-Variable input_SerialNumber
Omni-Channel-Flow | Update Records schreibt in das Feld Serial_Number__c
Messaging Session | eigenes Feld Serial_Number__c
Agentforce Builder | Feld im Reiter Context als Messaging Session Variable
fazit: Beispielnamen. Derselbe Name muss im JavaScript und im Channel stehen.
```

Der Schlüssel im JavaScript muss dem Channel Variable Name des Parameters am Messaging Channel entsprechen. Das Parameter Mapping macht daraus eine Flow-Variable. Der Omni-Channel-Flow schreibt den Wert mit einem Update-Records-Element in ein eigenes Feld der Messaging Session; Trailhead zeigt das mit `Order_Number` und `Order_Number__c`. Der Flow macht dabei aus jedem Pre-Chat-Wert einen Text. Zuletzt nehmen Sie das Feld laut [Salesforce Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=experience.support_context_passing_framework_variables.htm) im Agentforce Builder im Reiter Context unter Messaging Session Variables auf. Erst dann kann der Agent es an Aktionen übergeben und in Anweisungen nutzen. Ist der Agent aktiv, müssen Sie ihn für diese Änderung deaktivieren.

Bei Context Events ist der Weg kürzer. Sie legen im Agentforce Builder vier Variablen an (`currentPage`, `search_result`, `search_filters`, `search_facets`) und erlauben für jede den Schreibzugriff per API. Die Website ruft `setSessionContext` auf, oder `sendTextMessage`, das Kontext und Nachricht in einem Aufruf schickt, damit der Kontext für genau diese Nachricht schon da ist.

```vertiefung Für Entwickler
titel: Was die Website aufruft und wann
- Beide Aufrufe erst nach dem Ereignis `onEmbeddedMessagingReady`, den Listener vor `embeddedservice_bootstrap.init` registrieren.
- Hidden Pre-Chat: `embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields({ "Serial_Number": "…" })`, mit `removeHiddenPrechatFields([...])` wieder entfernen, beides vor Beginn der Konversation.
- Context Events: `embeddedservice_bootstrap.utilAPI.setSessionContext([{ name: "_AgentContext", value: { valueType: "StructuredValue", value: { currentPage: "…", search: { result: "…", filters: [], facets: [] } } } }])`, mit `then`, `catch` und `finally` für Erfolg, Fehler und Aufräumen.
- Context Events nicht in `initEmbeddedMessaging` aufrufen. Auf Experience-Cloud-Sites kommt der Code in den Head Markup der Site.
- Längen, Anzahl der Aufrufe und Größe der Daten dokumentiert Salesforce für beide Wege nicht. Das würde ich im Test ausprobieren, bevor die Website darauf baut.

Quellen: [Hidden Pre-Chat](https://developer.salesforce.com/docs/service/messaging-web/guide/pre-chat.html), [Context Events](https://developer.salesforce.com/docs/service/messaging-web/guide/context-events.html)
```

## Welche Werte gehören in den Pre-Chat, welche in den Kontext?

Für einen Hersteller ordne ich die Werte nach einer Frage: Ändert sich der Wert, während der Kunde chattet?

Per Hidden Pre-Chat kommen die Werte, die für das Gespräch feststehen. Die Händler- oder Kundennummer aus dem Portal, aus welchem Portal oder von welcher Website der Chat startet, und die Seriennummer, wenn der Kunde den Chat auf der Seite einer bestimmten Maschine öffnet. Die Sprache gehört auch dazu; sie hat mit `EndUserLanguage` eine eigene Standardvariable, wie in [mehrsprachigen Agenten für Exportmärkte](../mehrsprachige-agentforce-agenten-export/) beschrieben.

Per Context Event kommen die Werte, die sich mit jedem Klick ändern. Die Seite, auf der der Kunde gerade ist, etwa die Produktseite einer Baureihe oder eine Ersatzteilliste. Und die Suche im Teilekatalog mit Suchbegriff, gesetzten Filtern wie Baureihe oder Baujahr und Facetten.

Schwierig wird es, wenn der Kunde im Gespräch die Maschine wechselt. Die Seriennummer aus dem Pre-Chat ist dann veraltet, und Context Events haben kein Feld für eine Seriennummer. Mein Ansatz wäre, die URLs im Portal so zu bauen, dass sie die Maschine enthalten, etwa mit der Asset-ID im Pfad. Dann steht die neue Maschine in `currentPage`, und die Aktion des Agenten liest sie dort. Das ist ein Entwurf, den ich vor dem Bau testen würde, keine dokumentierte Funktion.

Offen ist für mich auch, was eine fortgesetzte Konversation mit Pre-Chat-Werten macht. Enhanced Chat hält Konversationen über Tage und Geräte, und v2 kennt beim Pre-Chat nur die Einstellung „Every Conversation“. Ob ein Händler, der nach einer Woche zurückkommt, die Seriennummer vom ersten Besuch mitbringt, beschreibt die Dokumentation nicht. Das gehört in jeden Testplan.

**[Platzhalter Praxisbeispiel, wartet auf Fabian]** Welche Werte wurden im Enhanced-Chat-Projekt per Hidden Pre-Chat übergeben, wurden Context Events genutzt, und wo ist der Wert unterwegs verloren gegangen?

## Darf der Agent den Werten aus dem Browser trauen?

Nein, nicht als Beweis. Hidden Pre-Chat und Context Events kommen aus JavaScript im Browser des Besuchers, und jeder Besucher kann sie mit den Entwicklerwerkzeugen seines Browsers ändern.

```hinweis achtung
Eine Händlernummer aus dem Hidden Pre-Chat ist eine Behauptung des Browsers. Filtern Aktionen Aufträge, Preise oder Garantiefälle nach dieser Nummer, sieht ein Besucher mit geänderter Nummer die Daten eines anderen Händlers. Die Identität kommt aus der User Verification (Teil 4 dieser Serie), Pre-Chat-Werte nur als Hinweis.
```

Eine geänderte Seriennummer ist harmlos, solange die Aktion nur passende Teile aus dem öffentlichen Katalog zeigt. Gefährlich wird es bei allem, was einem bestimmten Kunden gehört. Dafür gilt dasselbe Prinzip wie bei der [Agent API in eigenen Händler-Apps](../agentforce-agent-api-eigene-apps/): Die Aktion filtert in Logik nach einer geprüften Identität, nie nach dem, was im Chat oder im Kontext steht.

Das Suchfeld ist ein zweites Thema. `search.result` und der Suchbegriff sind Text, den der Besucher schreibt, und der Agent liest ihn mit jeder Nachricht. Damit ist das Suchfeld ein Eingang für versteckte Anweisungen, wie ich es für [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/) beschrieben habe. Ich würde nur Werte übergeben, die die Website selbst erzeugt, also Filter und Facetten aus festen Listen, und den freien Suchbegriff kürzen oder weglassen.

## Wo fangen Sie an?

Führen Sie zehn Testgespräche ohne Kontext und notieren Sie, wonach der Agent zuerst fragt. Jede dieser Rückfragen ist ein Kandidat für Hidden Pre-Chat oder Context Events. Legen Sie die Namen einmal fest und nutzen Sie sie im JavaScript, am Channel, im Flow und am Feld der Messaging Session. Diese Namen gehören in die [Architekturdokumentation](../../leistungen/salesforce-architektur/), nicht nur in den Code. Ändern Sie danach im Test jeden Wert im Browser und prüfen Sie, was der Agent dann zeigt.

Kontext spart dem Kunden die erste Rückfrage, die Sicherheit kommt trotzdem aus der Anmeldung.
