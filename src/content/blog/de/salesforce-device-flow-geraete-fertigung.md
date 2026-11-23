---
title: "Salesforce Device Flow: Einschränkung für Fertigungsgeräte"
metaTitle: "Salesforce Device Flow ab 30.11.: betroffene Apps finden"
description: "Ab 30.11.2026 sperrt Salesforce Device-Flow-Anmeldungen über Connected Apps. So finden Sie die betroffenen Apps, die Geräte dahinter und den passenden Weg."
pubDate: 2026-11-23
lang: de
slug: salesforce-device-flow-geraete-fertigung
translationKey: salesforce-device-flow
topic: security
categories: [architecture, devops]
contactBrief: integration
tags: [Device Flow, OAuth, External Client Apps, Connected Apps, Shopfloor, Schnittstellen]
takeaways:
  - "Ab 30.11.2026 dürfen nur lokale External Client Apps mit dem Callback https://localhost und ohne weiteren OAuth-Flow den Device Flow nutzen."
  - "Der Anmeldeverlauf zeigt, welche Apps den Device Flow genutzt haben, bis zu sechs Monate zurück. Welche und wie viele Geräte dahinterstehen, zeigt er nicht."
  - "Bedient eine App auch andere Clients, wird sie geteilt. Sie entscheiden, wer den Consumer Key behält; nur die anderen Clients brauchen neue Zugangsdaten."
  - "Jedes Device-Flow-Token gehört dem Salesforce-Benutzer, der den Code bestätigt hat. Ein gemeinsames Terminal arbeitet also mit dessen Berechtigungen."
faq:
  - q: "Was ist der OAuth 2.0 Device Flow in Salesforce?"
    a: "Mit dem Device Flow meldet sich ein Gerät mit eingeschränkter Eingabe oder Anzeige bei Salesforce an, etwa ein Terminal oder ein Kommandozeilenwerkzeug. Das Gerät zeigt einen Code an, eine Person gibt ihn im Browser eines anderen Geräts ein und genehmigt den Zugriff. Anschließend erhält das Gerät ein Token für das Salesforce-Benutzerkonto dieser Person."
  - q: "Was ändert sich am 30.11.2026 beim Device Flow?"
    a: "Laut Salesforce dürfen ab dem 30.11.2026 nur lokale External Client Apps mit der Callback-URL https://localhost und ohne weiteren aktivierten OAuth-Flow den Device Flow nutzen. Device-Flow-Anmeldungen über Connected Apps und paketierte External Client Apps schlagen dann fehl, ein Opt-out gibt es nicht."
  - q: "Wie finde ich heraus, ob meine Org den Device Flow nutzt?"
    a: "Öffnen Sie im Setup den Anmeldeverlauf (Login History), blenden Sie die Spalte Login Subtype ein und suchen Sie nach OAuth Device. Der Verlauf reicht bis zu sechs Monate zurück, ein leeres Ergebnis ist deshalb kein Beweis; prüfen Sie auch die Warnhinweise im App Manager und im External Client App Manager und fragen Sie nach selten genutzten Geräten."
  - q: "Braucht jedes Gerät einen neuen Consumer Key?"
    a: "Nein. Lässt die bestehende Connected App die automatische Migration zu, behält Salesforce Consumer Key und Secret. Neue Zugangsdaten brauchen nur die Clients, die Sie in eine neue External Client App verschieben."
draft: false
---

Der Salesforce Device Flow ist die OAuth-Anmeldung für Geräte ohne richtige Tastatur oder Browser. Ab dem 30.11.2026 erlaubt Salesforce diesen Flow nur noch über lokale External Client Apps mit der Callback-URL `https://localhost` und ohne weiteren aktivierten OAuth-Flow. Device-Flow-Anmeldungen über Connected Apps und paketierte External Client Apps schlagen dann fehl. Der Anmeldeverlauf zeigt in zehn Minuten, welche Apps den Flow genutzt haben, bis zu sechs Monate zurück; ein leeres Ergebnis ist ein erster Hinweis, kein Beweis. Danach ordnen Sie jeder App ihre Geräte zu und entscheiden: migrieren, umkonfigurieren, ersetzen oder abschalten.

## Was ist der Salesforce Device Flow?

Die [Salesforce-Hilfe zum OAuth 2.0 Device Flow](https://help.salesforce.com/s/articleView?id=xcloud.remoteaccess_oauth_device_flow.htm&type=5&language=en_US) beschreibt ihn für Apps auf Geräten mit eingeschränkter Eingabe oder Anzeige, etwa Smart-TVs, Haushaltsgeräte und andere IoT-Geräte, und nennt auch Kommandozeilen-Apps. Die Anmeldung läuft in vier Schritten:

```schritte
Anfordern | Gerät · Sekunden
  Das Gerät fordert bei Salesforce einen Gerätecode und einen Benutzercode an.
Anzeigen | Gerät · Sekunden
  Das Gerät zeigt den Benutzercode und die Bestätigungs-URL.
Bestätigen | Person · innerhalb von 10 Minuten
  Jemand öffnet die URL am Handy oder PC, meldet sich an und gibt den Code ein.
Abfragen | Gerät · bis zur Freigabe
  Das Gerät fragt in Abständen nach, bis Salesforce das Token liefert.
```

Laut derselben Seite sind Gerätecode und Benutzercode zehn Minuten gültig. Ein Refresh Token, mit dem das Gerät ohne Person neue Zugriffstokens erhält, gibt es nur, wenn die App den Scope für Refresh Tokens enthält. Für ein Terminal in der Halle entscheidet das, wie oft der Device Flow wiederholt werden muss: Ohne nutzbares Refresh Token muss eine Person jedes Mal einen neuen Code bestätigen, wenn das Zugriffstoken nicht mehr gilt.

## Was sich am 30.11.2026 ändert

Der [Salesforce-Artikel zu den Device-Flow-Einschränkungen](https://help.salesforce.com/s/articleView?id=005461280&type=1) vom 07.10.2026 nennt vier Bedingungen, die eine App ab dem 30.11.2026 erfüllen muss. Wenn Sie den Device Flow in einer External Client App aktivieren, setzt Salesforce den Callback auf `https://localhost` und deaktiviert die übrigen OAuth-Flows dieser App.

```tabelle
titel: Bedingungen für den Device Flow ab dem 30.11.2026
spalten: Bedingung | Erlaubt | Nicht mehr erlaubt
App-Typ | External Client App * | Connected App
Verteilungsstatus | Lokal (Local) * | Paketiert, etwa aus einem AppExchange-Paket
Callback-URL | https://localhost * | Jede andere Callback-URL
Weitere OAuth-Flows | Keine * | Device Flow plus Web Server, JWT Bearer oder andere in derselben App
fazit: Quelle: Salesforce-Wissensartikel 005461280 und das Release Update im Setup.
```

Gesperrt wird nur die Anmeldung über den Device Flow. Eine Connected App, die zusätzlich einen anderen unterstützten Flow nutzt, funktioniert für diesen Flow weiter. Die Änderung am Device Flow ist eine von mehreren datierten Änderungen in der [Salesforce-Roadmap für Connected Apps und External Client Apps](https://help.salesforce.com/s/articleView?id=005461287&type=1):

```zeitleiste
2026-08 | Salesforce zeigt Warnhinweise im Setup und schränkt einige Konfigurationsänderungen ein
2026-11-04 | Refresh Tokens, die 30 Tage ungenutzt sind, laufen ab (Produktion)
2026-11-30 | Device Flow nur noch über lokale External Client Apps
2027-02-20 | Username-Password-Flow für Connected Apps, User-Agent- und Hybrid-Flow enden
Summer '27 | Support-Ende für Connected Apps
```

Die 30-Tage-Regel ist eine eigene Kontrolle und kann auch eine konforme Device-Flow-App treffen. Laut dem [Salesforce-Artikel zur Leerlaufgrenze für Refresh Tokens](https://help.salesforce.com/s/articleView?id=005461275&type=1) verfällt ein Refresh Token, das 30 Tage nicht genutzt wurde, zusammen mit seinem Zugriffstoken. Ein Terminal, das nur zur Inventur läuft, braucht deshalb womöglich wieder eine Person mit Code, auch wenn seine App die neuen Device-Flow-Regeln erfüllt. Scheitert die Anmeldung eines Geräts rund um diese Termine, klären Sie zuerst, ob die Device-Flow-Sperre oder die 30-Tage-Regel greift, bevor Sie die App-Konfiguration ändern.

## Ein erster Befund in zehn Minuten

Salesforce nennt zwei Stellen. Öffnen Sie im Setup den Anmeldeverlauf (Login History), blenden Sie die Spalte Login Subtype ein und filtern Sie nach OAuth Device. Die Spalte Application zeigt, über welche App jede Anmeldung lief. Laut Salesforce reicht der Anmeldeverlauf bis zu sechs Monate zurück; eine App, die nur einmal im Jahr genutzt wird, fehlt dort womöglich. Die zweite Stelle sind die Warnhinweise, die Salesforce seit August 2026 für nicht konforme Apps im App Manager und im External Client App Manager zeigt.

Jede Quelle belegt etwas anderes, und keine zählt Geräte:

```tabelle
titel: Was jede Quelle über die Nutzung des Device Flow aussagt
spalten: Quelle | Was sie belegt | Was sie nicht belegt
Anmeldeverlauf, Subtyp OAuth Device | Device-Flow-Anmeldungen der letzten bis zu sechs Monate, je App und Benutzer | Wie viele Geräte dahinterstehen, ob selten genutzte Apps fehlen
Warnhinweis im App Manager | Die App ist heute nicht konform | Ob sie noch jemand braucht
App-Verantwortlicher und Anbieter | Zweck, Benutzer, geplante Lösung | Ob der Device Flow tatsächlich genutzt wird
Bestand der Werks-IT oder Geräteverwaltung | Physische Geräte, Standorte, Fernzugriff | Welche Anmeldung jedes Gerät nutzt
fazit: Beginnen Sie mit Anmeldeverlauf und Warnhinweisen, dann ordnen Sie mit den Verantwortlichen die Geräte zu.
```

Kennen Sie eine App, nennen Ihnen die Verantwortlichen die Geräte dahinter. In einem Fertigungsunternehmen würde ich nach Terminals und Kiosk-PCs in Produktion und Lager fragen, nach Wandbildschirmen mit der Service-Queue, nach Handscannern mit eigener App und nach Kommandozeilenwerkzeugen des Salesforce-Teams. Viele dieser Geräte melden sich anders an, etwa über einen Browser oder eine Middleware; die Liste hilft deshalb erst, wenn der Anmeldeverlauf eine App genannt hat und Sie die richtigen Personen fragen.

Rechenbeispiel: Der Anmeldeverlauf zeigt in sechs Monaten 40 Device-Flow-Anmeldungen über zwei Apps. Die eine gehört zum Anbieter der Wandbildschirme und wurde aus einem verwalteten Paket installiert. Die andere ist eine Connected App, die die Werks-IT für Lagerterminals gebaut hat, mit zusätzlich aktiviertem Web Server Flow für ein Web-Werkzeug; die Werks-IT zählt 12 Terminals dahinter. Die Paket-App geht an den Anbieter, denn eine paketierte App darf den Device Flow gar nicht mehr nutzen: Fragen Sie schriftlich nach dem neuen Anmeldeverfahren, ob in Ihrer Org eine lokale App angelegt werden muss, wie die Zugangsdaten auf die Geräte gelangen und wann erneut eine Person den Code bestätigen muss. Die App der Werks-IT wird geteilt, wie im nächsten Abschnitt beschrieben. Die Konfiguration in Salesforce kann klein sein; die Dauer bestimmen Bestandsaufnahme, Tests, Freigaben und der Zugang zu den Terminals über Fernwartung, Werkszugang und Wartungsfenster.

## Welcher Client behält den Consumer Key?

Für eigene Connected Apps empfiehlt Salesforce eine lokale External Client App: über die automatische Migration im App Manager, wenn die App sie zulässt, sonst durch Anpassen einer bestehenden oder Anlegen einer neuen External Client App. Laut dem [Salesforce-Hilfeartikel zur Migration](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_to_external_client_app_migration.htm&language=en_US&type=5) behält die Migration Consumer Key und Secret, und der Artikel nennt Konfigurationen, die sie verhindern, etwa Canvas oder einen eigenen Apex-Handler. Zeigt der App Manager keine Migration an, ist das das Ergebnis der Eignungsprüfung und kein Bedienfehler.

Weil das Aktivieren des Device Flow die übrigen Flows abschaltet, muss eine App, die Geräte und einen anderen Client bedient, geteilt werden. Sie entscheiden, welche Seite den bestehenden Consumer Key behält:

```vergleich
ohne: Neue App für die Geräte
- Das Web-Werkzeug behält die migrierte App und ihren Key.
- Jedes Terminal braucht den neuen Consumer Key.
- Der Rollout läuft durch Werke, Schichten und Wartungsfenster.
mit: Migrierte App bleibt bei den Geräten
- Die Terminals behalten ihren Consumer Key.
- In der migrierten App wird der Device Flow aktiviert.
- Nur das Web-Werkzeug erhält eine neue App mit neuen Zugangsdaten.
```

Der zweite Weg ist meist günstiger, wenn die Geräte schwer erreichbar sind und das eigene Team das Web-Werkzeug pflegt. Prüfen Sie nach jeder Migration Richtlinien und IP-Allowlists, statt von einer identischen Konfiguration auszugehen. Testen Sie in einer Sandbox mit diesem Katalog:

- Die automatische Migration behält in der Test-Org die Zugangsdaten, und der Plan für Produktion braucht keine neuen Zugangsdaten auf den Clients, die die App behalten.
- Bestehende Refresh Tokens der Geräte bleiben gültig, oder es ist klar, wer die Geräte neu anmeldet.
- Kein anderer Client verliert den Zugang, wenn die übrigen Flows abgeschaltet werden.
- Der Geschäftsprozess funktioniert durchgehend, nicht nur die Token-Anfrage.
- Die bestehenden Tokens des umziehenden Clients sind bekannt, es ist festgelegt, wann sie widerrufen werden, und der alte Client kann die verbleibende App danach nicht mehr nutzen.
- Ein Rückfallplan ist dokumentiert: wer entscheidet und welche Konfiguration wiederhergestellt wird, wenn sich die Produktions-Org anders verhält als die Sandbox.

```vertiefung Für Entwickler
titel: Device-Flow-Aufrufe und die Abfrage im Anmeldeverlauf
- Abfrage aus dem Salesforce-Artikel: SELECT Application FROM LoginHistory WHERE LoginSubType = 'OAuth Device'
- Das Gerät fordert die Codes per POST an /services/oauth2/token mit response_type=device_code und der Client-ID an; danach fragt es denselben Endpunkt mit grant_type=device und dem Gerätecode ab, höchstens so oft, wie das zurückgegebene Intervall erlaubt.
- Das Refresh Token gibt es nur mit dem Scope refresh_token in der App. Gehen Sie für Gerätecode und Benutzercode von keinem festen Format und keiner festen Länge aus.
```

## Mit wessen Identität arbeitet das Terminal?

Der Device Flow meldet nicht „das Terminal“ an. Eine Person bestätigt den Code mit ihrer eigenen Salesforce-Anmeldung, und das Token gehört danach diesem Benutzer. An einem gemeinsam genutzten Lagerterminal läuft jede Buchung als dieser Benutzer; eine Deaktivierung oder eine Änderung seiner Berechtigungen, Rolle oder Freigaben kann den Zugriff des Geräts verändern oder beenden. Bevor Sie den Device Flow für ein Gerät beibehalten, halten Sie je Geräte-App diese Punkte fest:

```eintrag Geräte-App in der Schnittstellenliste
App und Verantwortliche | Welche App, wer auf beiden Seiten verantwortlich ist
Prozess und Geräte | Was die Geräte tun, wie viele, an welchen Standorten
Identität | Welcher Salesforce-Benutzer den Code bestätigt, persönlich oder technisch *
Rollout | Aus der Ferne oder vor Ort, Wartungsfenster, Zusage des Anbieters
Test und Rückfall | Testnachweis, wer über die Rückkehr entscheidet
fazit: Muss der Prozess ohne jede Person laufen, die das Gerät freigibt, ist der Device Flow das falsche Muster.
```

Für Server-zu-Server-Integrationen ohne Person empfiehlt der [Salesforce-Artikel zum Ende des Username-Password-Flows](https://help.salesforce.com/s/articleView?id=005461279&type=1) den Client Credentials Flow; wie ich solche technischen Benutzer aufräume, steht unter [Salesforce-Integrationsbenutzer aufräumen](/blog/salesforce-integrationsbenutzer-aufraeumen/). Dieselben Middleware- und Werksteams trifft keine drei Monate später die nächste Frist, wenn die [Passwort-Integrationen im Februar 2027 enden](/blog/salesforce-passwort-integrationen-2027/).

## Was mit übersehenen Geräten passiert

Ab dem 30.11.2026 schlägt jede Device-Flow-Anmeldung über eine nicht konforme App fehl. Ob vorher ausgestellte Tokens gültig bleiben, sagt der Salesforce-Artikel nicht; rechnen Sie spätestens bei der nächsten Anmeldung mit dem Fehler, womöglich Tage später, nach einem Stillstand über das Wochenende oder einem Neustart. Was die Benutzer sehen, hängt vom Client ab: eine Anmeldeaufforderung, ein leeres Dashboard, aufgestaute Buchungen oder eine gescheiterte Synchronisation. Im Mehrschichtbetrieb fällt das oft in eine Schicht, in der niemand aus der Salesforce-Administration erreichbar ist.

Sagen Sie dem Service Desk und der Werks-IT, wie die Fehlerbilder aussehen können und wo die Liste der Geräte-Apps liegt. Ein Ticket „Terminal 4 kann sich nicht anmelden“ geht dann direkt an die richtige Person, ohne eine Fehlersuche im Netzwerk. Geräte-Apps gehören in die regelmäßige Prüfung der [Release Updates vor der Durchsetzung](/blog/salesforce-release-updates-testen/), denn die nächste Änderung an OAuth betrifft sie wieder. Wenn Sie eine zweite Meinung zu Ihrer Schnittstellenliste möchten: Mein Vorgehen steht auf der Seite [Salesforce-Schnittstellen](/leistungen/salesforce-schnittstellen/).

## Erster Schritt: Anmeldeverlauf in Produktion nach OAuth Device filtern

Öffnen Sie heute den Anmeldeverlauf Ihrer Produktions-Org, blenden Sie die Spalte Login Subtype ein und filtern Sie nach OAuth Device. Ist die Liste leer, prüfen Sie die Warnhinweise im App Manager und im External Client App Manager, fragen Sie die Werks-IT nach Geräten, die nur ein- oder zweimal im Jahr laufen, und halten Sie das Ergebnis fest. Zeigt sie Apps, tragen Sie jede mit Verantwortlichen, Geräten, Identität und Weg (migrieren, umkonfigurieren, ersetzen oder abschalten) in die Schnittstellenliste ein, und testen Sie die erste vor dem 30.11.2026 in einer Sandbox.
