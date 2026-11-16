---
title: "Connected Apps in External Client Apps migrieren"
metaTitle: "Connected App zu External Client App: Migrationsplan"
description: "Salesforce beendet den Support für Connected Apps im Summer '27. So ordnen Sie ERP- und Middleware-Schnittstellen ein: migrieren, neu bauen, Anbieter."
pubDate: 2026-11-30
lang: de
slug: connected-app-external-client-app-migrieren
translationKey: connected-app-external-client-app-migration
topic: security
categories: [architecture, devops]
contactBrief: integration
tags: [External Client Apps, Connected Apps, OAuth, Schnittstellen, Release Updates, Maschinenbau]
takeaways:
  - "Connected Apps laufen nach Summer '27 weiter. Salesforce liefert dann keine Fehlerbehebungen, Sicherheitsupdates, Flow-Updates und keinen Support mehr."
  - "Früher greifen harte Termine: Device Flow ab 30. November 2026, Username-Password Flow am 20. Februar 2027."
  - "Der Button im App Manager behält Consumer Key und Secret. Richtlinien und IP-Allowlists trotzdem prüfen, nicht alles wird übernommen."
  - "Den Username-Password Flow erkennt der Button nicht. Stellen Sie diese Schnittstellen zuerst auf einen unterstützten Flow um."
  - "Lokale External Client Apps werden beim Sandbox-Refresh nicht kopiert. Die Pipeline muss sie deployen."
faq:
  - q: "Funktionieren Connected Apps ab Summer '27 nicht mehr?"
    a: "Doch. Laut Salesforce laufen bestehende Connected Apps weiter. Salesforce beendet den Support: keine Fehlerbehebungen, keine Sicherheitsupdates, keine Updates der Autorisierungsflows und kein technischer Support."
  - q: "Braucht die Middleware nach der Migration neue Zugangsdaten?"
    a: "Meist nicht, wenn Sie den Button Migrate to External Client App verwenden. Laut Salesforce-Hilfe bleiben Consumer Key, Consumer Secret und gültige Refresh Tokens erhalten. Richtlinien wie die IP-Allowlist für Refresh Tokens müssen Sie trotzdem prüfen."
  - q: "Kann ich eine Connected App aus einem AppExchange-Paket migrieren?"
    a: "Nicht in Ihrer Org. Der Anbieter liefert die Migration als Paket-Upgrade; fragen Sie schriftlich nach Version, Termin und danach, ob Tokens und Sitzungen erhalten bleiben."
  - q: "Kann ich noch eine neue Connected App anlegen?"
    a: "Seit Spring '26 ist das Anlegen neuer Connected Apps eingeschränkt. Derzeit kann der Salesforce-Support es auf Anfrage freischalten, Salesforce empfiehlt für jede neue Integration aber External Client Apps."
draft: false
---

Salesforce beendet den Support für Connected Apps im Summer '27. Bestehende Apps laufen weiter, erhalten aber keine Fehlerbehebungen, Sicherheitsupdates und Updates der Autorisierungsflows mehr. Connected Apps in External Client Apps zu migrieren, beginnt deshalb jetzt mit einer Bestandsaufnahme: Schnittstellen im Device Flow oder Username-Password Flow haben frühere, harte Fristen, geeignete lokale Apps können bis Summer '27 wechseln. Für die meisten eigenen Schnittstellen reicht der Button Migrate to External Client App im App Manager, weil er Consumer Key und Secret behält. Apps mit Single Sign-on und Apps aus dem Paket eines Anbieters brauchen einen anderen Weg.

## Müssen Sie jede Connected App migrieren?

Eine Connected App ist der Eintrag in Salesforce, über den sich ein externes System per OAuth anmeldet: der ERP-Konnektor, die Middleware, das Dokumententool, die E-Commerce-Plattform, das Single Sign-on für das Händlerportal. Nicht jede App geht denselben Weg. Ich sortiere sie nach Herkunft und nach dem, was sie nutzen, denn das entscheidet, wer die Arbeit macht:

```tabelle
titel: Welchen Weg jede Connected App nimmt
spalten: App in Ihrer Org | Weg | Wer die Arbeit macht
Geeignete eigene lokale App mit Client Credentials oder JWT Bearer | Migrations-Button im App Manager * | Ihr Admin, in der Sandbox getestet
Eigene Schnittstelle mit Benutzername und Passwort | Erst den Flow umstellen, dann den Button nutzen | Middleware-Team und Ihr Admin
User Provisioning, Apex-Handler, Triple DES in SAML oder Standard-Benachrichtigungen | Blocker entfernen oder ändern, dann den Button nutzen; User Provisioning gibt es in External Client Apps nicht | Ihr Admin und der Systemverantwortliche
Single Sign-on oder Canvas | Kein Button: neue External Client App mit neuen Zugangsdaten | Ihr Admin und der Systemverantwortliche
Dynamic Client Registration | In External Client Apps noch nicht unterstützt: Umbau mit dem Anbieter planen | Systemverantwortlicher und Anbieter
App aus dem Managed Package eines Anbieters | Anbieter liefert die Migration in einer neuen Paketversion | Anbieter; Sie fragen nach Version und Termin
Client im Device Flow, etwa ein Terminal in der Fertigung | Eigene lokale External Client App bis 30. November 2026 | Ihr Admin
App ohne Benutzer oder Tokens | Löschen statt migrieren | Ihr Admin, nach Rücksprache mit dem Verantwortlichen
```

Rechenbeispiel: Ein Hersteller hat neun Connected Apps. Vier sind eigene Schnittstellen zu SAP und zur Middleware mit JWT Bearer, zwei stammen aus Anbieterpaketen, eine meldet sich noch mit Benutzername und Passwort an, eine ist die Single-Sign-on-App, über die Salesforce Händler in einem externen Ersatzteilkatalog anmeldet, und eine hat seit einem Jahr keine Tokens mehr. Der Button deckt sofort vier Apps ab und nach der Flow-Umstellung auch die Passwort-Schnittstelle. Zwei hängen vom Anbieter ab, eine wird neu gebaut, eine gelöscht.

## Welche Termine können eine Schnittstelle stoppen?

Salesforce verschärft den OAuth-Zugang seit 2025, und die verbleibenden Termine liegen zwischen November 2026 und Mitte 2027. Die [Roadmap für Connected Apps und External Client Apps](https://help.salesforce.com/s/articleView?id=005461287&type=1) nennt sie:

```zeitleiste
Spring '26 | Neue Connected Apps nur nach Freischaltung durch den Salesforce-Support
2026-11-04 | Refresh Tokens verfallen nach 30 Tagen ohne Nutzung (Produktion, gestaffelt)
2026-11-30 | Device Flow nur noch über lokale External Client Apps
2027-02-20 | Username-Password, User-Agent und Hybrid Flow enden
Summer '27 | Ende des Supports für Connected Apps
```

Device Flow und die drei abgeschalteten Flows sind harte Termine: Danach schlagen Anmeldungen über diese Flows fehl. Für den Device Flow verlangt der [Salesforce-Artikel zu den Device-Flow-Einschränkungen](https://help.salesforce.com/s/articleView?id=005461280&type=1) eine lokale External Client App mit einem dafür zugelassenen Callback und ohne weiteren OAuth-Flow. Der Artikel vom Oktober 2026 nennt nur https://localhost; prüfen Sie die zugelassenen Werte in den aktuellen Release Notes zu Winter '27, bevor Sie die App anlegen.

Summer '27 ist anders. Laut [Salesforce-Artikel zum Support-Ende für Connected Apps](https://help.salesforce.com/s/articleView?id=005228017&type=1) laufen bestehende Connected Apps weiter, Salesforce liefert aber keine Fehlerbehebungen, Sicherheitsupdates und keinen technischen Support mehr. Für eine Schnittstelle, die Aufträge, Preise oder Serviceeinsätze überträgt, würde ich dieses Risiko nicht tragen und behandle Summer '27 als Frist. Salesforce bietet die Migration als Release Update Migrate All Connected Apps to External Client Apps an; der [Salesforce-Admin-Blog zu Winter '27](https://admin.salesforce.com/blog/2026/jens-top-winter-27-release-features-for-admins) beschreibt es. Ich würde mit den Schnittstellen beginnen, die sich am leichtesten migrieren lassen, und daraus lernen, bevor die kritischen folgen.

## External Client Apps sind standardmäßig geschlossen

Eine External Client App erfüllt dieselbe Aufgabe wie eine Connected App: Sie lässt ein externes System per OAuth auf Salesforce zugreifen. Die Unterschiede betreffen die Governance. Laut [Salesforce-Vergleich beider App-Typen](https://help.salesforce.com/s/articleView?id=xcloud.connected_apps_and_external_client_apps_features.htm&language=en_US&type=5) funktioniert eine External Client App nur in einer Org, in der sie angelegt oder installiert wurde, und braucht deshalb keine eigene API-Zugriffskontrolle. Entwicklereinstellungen und Admin-Richtlinien sind getrennt: Der Entwickler legt Flows und Scopes fest, der Admin entscheidet in seiner Org über zugelassene Benutzer, IP-Lockerung und Token-Laufzeit. User Provisioning gibt es in External Client Apps nicht.

External Client Apps unterstützen weniger Flows: Client Credentials, JWT Bearer, Web Server, Device und Code and Credentials. Es fehlen der Username-Password Flow sowie User-Agent und Hybrid Flow. Als Ersatz empfiehlt der [Salesforce-Artikel zum Ende des Username-Password Flow](https://help.salesforce.com/s/articleView?id=005461279&type=1) den Web Server Flow mit PKCE, wo sich eine Person anmeldet, und den Client Credentials Flow für Server-zu-Server-Integrationen. JWT Bearer bleibt eine Option, wenn Ihre Middleware Zertifikate und Schlüsselrotation beherrscht. Details stehen in [Salesforce: Passwort-Integrationen enden 2027](/blog/salesforce-passwort-integrationen-2027/).

## Was der Migrations-Button behält und was nicht

Laut [Salesforce-Hilfe zur Migration](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_to_external_client_app_migration.htm&language=en_US&type=5) legt der Button im App Manager aus einer geeigneten Connected App eine lokale External Client App an. Die Middleware sendet weiter denselben Consumer Key und dasselbe Secret.

```staerken-grenzen
titel: Migrate to External Client App: stark für eigene Schnittstellen
+ Zugangsdaten | Consumer Key und Secret bleiben gleich, der Client braucht keine neuen Zugangsdaten *
+ Sitzungen | Gültige Refresh Tokens bleiben gültig, wo der Flow sie nutzt, etwa beim Web Server Flow
+ Original | Die Connected App bleibt als schreibgeschützte Version erhalten
- Erkennung | Der Username-Password Flow wird nicht erkannt, die Schnittstelle fällt danach aus
- Richtlinien | IP-Allowlist für Refresh Tokens wurde im Juli 2026 nicht übernommen (bekannter Fehler)
- Werkzeuge | Nur über den Button im Setup, keine API und keine CLI
- Sandbox | Die neue App ist lokal und wird beim Sandbox-Refresh nicht kopiert
besser: Für nicht geeignete Apps: neue External Client App mit neuen Zugangsdaten und geplantem Wechsel.
```

Die Grenze bei den Richtlinien stammt aus einem [Salesforce-Wissensartikel zur IP-Allowlist für Refresh Tokens](https://help.salesforce.com/s/articleView?id=005387022&type=1). Salesforce hat den Fehler im Juli 2026 dokumentiert und eine Korrektur angekündigt. Prüfen Sie, ob Ihr Release sie enthält; bis dahin vergleichen Sie die Werte und tragen sie von Hand nach. Salesforce warnt außerdem davor, das schreibgeschützte Original zu löschen, weil beide Apps denselben Consumer nutzen. Prüfen Sie vor jeder Migration, welchen Flow die Schnittstelle tatsächlich nutzt. Der Anmeldeverlauf des Integrationsbenutzers zeigt es, der Button nicht.

```hinweis achtung
Eine Schnittstelle, die sich noch mit Benutzername und Passwort anmeldet, fällt nach der Migration aus, weil External Client Apps diesen Flow nicht unterstützen. Stellen Sie sie zuerst auf einen unterstützten Flow um und klicken Sie erst danach auf den Button.
```

## Fragen an Anbieter und Partner vor der Migration

In der Org eines Herstellers gehören die Connected Apps selten einem Team: Der ERP-Konnektor kommt vom Middleware-Partner, Dokumententool und Konfigurator von AppExchange-Anbietern, die Anmeldung für das Händlerportal von einem weiteren Partner. Auf Kundenseite würde ich allen dieselben Fragen schriftlich stellen und die Antworten in der Bestandsaufnahme festhalten:

- Welchen Flow nutzt Ihre Schnittstelle in Produktion, und unter welchem Integrationsbenutzer läuft sie?
- Bei Paket-Apps: In welcher Paketversion liefern Sie eine External Client App aus, und wann?
- Wer verwahrt das Consumer Secret oder das Zertifikat, und wer rotiert es?
- Auf welche Richtlinien verlässt sich Ihre Schnittstelle: IP-Bereiche, zugelassene Benutzer, Scopes, Token-Laufzeit?
- Wie weisen Sie nach dem Wechsel nach, dass die Schnittstelle funktioniert: welcher Smoke Test, welcher Abgleich mit dem ERP?

Ein Verantwortlicher auf Kundenseite legt das Muster für alle fest, zum Beispiel eine External Client App je System und Verantwortlichem, getrennt, wo Flow, Scopes oder Rotation sich unterscheiden, und ein eigener Consumer je Umgebung. Ohne diese Entscheidung baut jeder Partner seine eigene Variante. Wie ich mehrere Partner in einer Org steuere, beschreibt die Seite zur [Partnersteuerung](/leistungen/partnersteuerung/).

## Sandboxes und Pipeline brauchen einen Plan

Die Sache mit den Sandboxes würde ich am sorgfältigsten planen. Laut Salesforce-Vergleich werden Connected Apps beim Sandbox-Refresh mitkopiert, lokale External Client Apps ausdrücklich nicht. Prüfen Sie das Verhalten für Ihre Apps bei einem Refresh. Nach der Migration fehlt die App nach jedem Sandbox-Refresh, und der Integrationstest mit SAP schlägt fehl, bis jemand sie wieder einrichtet. Das betrifft jede Sandbox, gegen die Schnittstellen laufen, etwa UAT und die Full Copy vor dem Go-live; den Aufbau mit mehreren Partnern beschreibe ich in [Sandbox-Strategie mit mehreren Partnern](/blog/salesforce-sandbox-strategie-mehrere-partner/).

Deshalb gehört die External Client App ins Repository und in die Pipeline. Laut [Salesforce-Anleitung zum Deployment von External Client Apps](https://help.salesforce.com/s/articleView?id=xcloud.meta_configure_packageable_external_client_apps.htm&language=en_US&type=5) kann eine deployte App entweder auf den Consumer der Quell-Org verweisen oder einen eigenen Consumer erhalten. Die erste Variante macht jede Sandbox von der Quell-Org abhängig: Wird die App dort gelöscht, schlägt der OAuth-Flow in den anderen Orgs fehl. Für ERP-Schnittstellen bevorzuge ich einen eigenen Consumer je Umgebung, damit eine Sandbox nie mit Produktionszugangsdaten arbeitet. Die Pipeline erzeugt oder deployt die OAuth-Einstellungen je Umgebung, der Schnittstellenverantwortliche erhält Client-ID und Secret über den Secret Store, und die Rotation wird vor dem Go-live einmal getestet.

```vertiefung Für Entwickler
titel: Welche Metadaten gehören ins Repository?
- Versionieren Sie die App-Definition (ExternalClientApplication) sowie Flows und Scopes (ExtlClntAppOauthSettings).
- Consumer Key, Callback-URLs und Zertifikat (ExtlClntAppGlobalOauthSettings) bleiben außerhalb der Versionsverwaltung; Werte je Umgebung setzen.
- Richtlinien entstehen beim Deployment mit Standardwerten. Entscheiden Sie je Richtlinie, ob die Pipeline eine freigegebene Basis deployt oder der Admin sie lokal pflegt.
- In einer Scratch Org lässt sich eine External Client App nicht über das Setup anlegen. Rufen Sie sie aus einer langlebigen Org ab und deployen oder installieren Sie sie dort.
```

Wie der Release-Prozess mit Metadaten und Pipeline aufgebaut ist, beschreibt die Seite zu [DevOps und Release Management](/leistungen/devops-und-release-management/).

## Wie migrieren Sie eine ERP-Schnittstelle ohne Ausfall?

Der Klick auf den Button dauert eine Minute. Die Arbeit liegt davor und danach. Ich plane jede Schnittstelle wie ein kleines Release mit Go/No-Go-Entscheidung:

```schritte
Bestandsaufnahme | Admin
  Jede App aus dem App Manager, dazu Benutzer und Tokens aus Connected Apps OAuth Usage und Flows aus dem Anmeldeverlauf.
Flow umstellen | vor Februar 2027 · Middleware-Team
  Passwort-Anmeldungen in einem eigenen Release auf einen unterstützten Flow umstellen, vor der App-Migration.
Sandbox-Test | Admin und Fachbereich
  Migrieren, Richtlinien und IP-Allowlist vergleichen, den echten Token-Flow aus der Middleware-Laufzeit ausführen.
Produktion | Wartungsfenster · Admin
  Go/No-Go anhand des Sandbox-Ergebnisses, dann der Button; Fehlerprotokolle und Abgleich mit dem ERP.
Alte Wege schließen | nach einem vollen Zyklus · Admin
  Username-Password und User-Agent Flow in den OAuth-Einstellungen der Org sperren.
```

Flow-Umstellung und App-Migration sind zwei Releases, damit sich ein Fehler einem der beiden zuordnen lässt. Wie lange der Sandbox-Test läuft, hängt von der Schnittstelle ab: mindestens ein kompletter Nachtlauf, eine Wiederholung nach einem technischen Fehler, eine Änderung oder Stornierung und die Rückmeldung aus dem ERP, Datensatz für Datensatz abgeglichen. Legen Sie den Wechsel nicht auf das Wochenende eines Salesforce-Releases, damit sich Fehler einer Ursache zuordnen lassen; die Termine stehen in [Salesforce-Release-Termine prüfen](/blog/salesforce-release-notes-termine-pruefen/). Der [Salesforce-Artikel zur Steuerung eingehender Integrationen](https://www.salesforce.com/blog/architecting-inbound-governance-external-client-apps/) empfiehlt, nur vom Admin freigegebene Benutzer vorab zu autorisieren und Username-Password und User-Agent Flow in den OAuth-Einstellungen zu sperren, weil bestehende Connected Apps und Paket-Apps sie sonst weiter nutzen können.

Bei jeder Schnittstelle prüfe ich auch den Benutzer dahinter. Die Migration ist ein guter Zeitpunkt, einen Integrationsbenutzer mit Adminrechten durch einen eigenen Benutzer mit der Lizenz Salesforce Integration zu ersetzen, wie in [Salesforce Integration User: Adminrechte entziehen](/blog/salesforce-integrationsbenutzer-aufraeumen/) beschrieben. Der App-Typ regelt, wie sich das System anmeldet; der Benutzer entscheidet, welche Datensätze es sieht. Wie ich Schnittstellen mit Kunden plane, steht unter [Salesforce-Schnittstellen](/leistungen/salesforce-schnittstellen/).

## Erster Schritt: jede Connected App mit Flow und Verantwortlichem erfassen

Übertragen Sie jede Connected App aus dem App Manager in eine Liste mit sechs Spalten: Herkunft (eigen oder Paket), Flow, Verantwortlicher, letzte Nutzung aus Connected Apps OAuth Usage, Blocker für den Button und Weg (Button, Flow umstellen, neu bauen, Anbieter oder löschen). Geben Sie die Device-Flow-Apps mit der Frist 30. November an Ihren Admin, die Passwort-Schnittstellen mit der Frist 20. Februar 2027 an das Middleware-Team und die Paket-Apps mit schriftlicher Frage nach dem Termin an die Anbieter. Migrieren Sie danach zuerst Ihre eigene Server-zu-Server-Schnittstelle mit den wenigsten Abhängigkeiten in einer Sandbox, und nehmen Sie die External Client App vor dem nächsten Sandbox-Refresh in die Pipeline auf.
