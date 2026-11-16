---
title: "Connected Apps und KI-Tools: Lehren aus Salesloft Drift"
description: "Was der Salesloft-Drift-Vorfall über Connected Apps, OAuth-Tokens und KI-Integrationen in Salesforce lehrt und welche Kontrollen Hersteller jetzt brauchen."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: connected-apps-oauth-ki-integrationen
translationKey: oauth-connected-apps-ai-lessons
topic: security
categories: [architecture, ai]
tags: [Connected Apps, OAuth, Sicherheit, KI-Integrationen, External Client Apps, Maschinenbau]
takeaways:
  - "Im August 2025 exportierten Angreifer mit gestohlenen OAuth-Tokens der KI-App Drift Daten aus Salesforce-Orgs, ohne eine Salesforce-Lücke zu nutzen."
  - "Jedes SaaS-Tool mit Refresh Token gehört zu Ihrem Sicherheitsperimeter. Benutzerrechte, Scopes, Token-Richtlinie und IP-Beschränkung bestimmen den Schaden."
  - "Seit September 2025 können die meisten Benutzer nicht installierte Connected Apps nicht mehr nutzen, und neue External Client Apps erzwingen Token-Rotation."
  - "Drei der vier Pflichtkontrollen für Partner-Apps können Admins nicht direkt prüfen, deshalb sollten Anbieter sie schriftlich bestätigen."
  - "Durchsuchen Sie Servicefälle nach Passwörtern und Fernwartungszugängen, denn der Drift-Angreifer suchte in exportierten Daten gezielt nach Zugangsdaten."
faq:
  - q: "War der Salesloft-Drift-Vorfall eine Sicherheitslücke in Salesforce?"
    a: "Nein. Google Threat Intelligence und Salesforce stellen beide fest, dass er nicht auf eine Schwachstelle der Salesforce-Plattform zurückgeht. Der Angreifer nutzte gültige OAuth-Tokens, die aus der Drift-Anwendung gestohlen wurden; Salesforce sah also normalen API-Zugriff einer autorisierten App."
  - q: "Was unterscheidet eine Connected App von einer External Client App?"
    a: "Beide lassen externe Systeme per OAuth auf Salesforce zugreifen. External Client Apps sind standardmäßig nicht freigegeben, trennen Admin-Richtlinien von Entwicklereinstellungen und lassen sich als Metadaten abbilden, mit Ausnahme von IP-Allowlist und Inaktivitätsablauf für Refresh Tokens. Seit Spring '26 schränkt Salesforce das Anlegen neuer Connected Apps standardmäßig ein und empfiehlt External Client Apps für neue Integrationen."
  - q: "Wie sehe ich, welche Apps Zugriff auf unsere Salesforce-Org haben?"
    a: "Im Setup zeigt Connected Apps OAuth Usage jede App mit Tokens, die Zahl ihrer Benutzer und ob sie installiert ist. Dort können Sie die Tokens einer App widerrufen oder die App sperren, was ihre aktiven Sitzungen sofort beendet."
  - q: "Brauchen wir Event Monitoring, um einen Vorfall wie Drift aufzuklären?"
    a: "Ohne Add-on erhalten Enterprise-, Performance- und Unlimited-Orgs nur ausgewählte Ereignistypen mit einer Aufbewahrungsfrist von einem Tag. Die Drift-Aktivität begann am 8. August 2025 und wurde am 20. August bekannt; für einen brauchbaren Rückblick braucht es bezahltes Event Monitoring, einen bereits laufenden Export in ein SIEM oder einen separat gekauften Abruf historischer Logs."
  - q: "Welche Refresh-Token-Richtlinie sollte eine KI-Integration haben?"
    a: "Bei vielen Connected Apps ist „gültig bis zum Widerruf“ der Standard. Für KI-Tools, die auf Servern des Anbieters laufen, würde ich einen Ablauf bei Nichtnutzung setzen, die Login-IP-Bereiche des Integrationsusers auf die veröffentlichten Adressbereiche des Anbieters beschränken und die Token-Rotation verlangen, die neue External Client Apps erzwingen."
draft: false
---

Der Salesloft-Drift-Vorfall hat gezeigt, dass eine Connected App ein unüberwachter Zugang zu Ihrer Org sein kann. KI-Tools führen zusätzlich zu weiteren OAuth-Freigaben und technischen Identitäten. Im August 2025 haben Angreifer mit gestohlenen OAuth-Tokens einer KI-Chat-App Daten aus Kunden-Orgs exportiert, ohne in Salesforce selbst einzubrechen. Jedes Tool, das ein Refresh Token für Ihre Org hält, gehört zu Ihrem Sicherheitsperimeter. Ein Hersteller braucht pro App einen Verantwortlichen, enge Scopes, einen eigenen Integrationsuser mit wenig Rechten und eine Token-Richtlinie, dazu Logs, die weit genug zurückreichen.

## Was ist beim Salesloft-Drift-Vorfall passiert?

Drift ist ein KI-Chat-Agent von Salesloft, den Unternehmen über eine Connected App mit Salesforce verbunden hatten. Salesloft hat inzwischen angekündigt, [Drift am 31. Januar 2027 einzustellen](https://help.salesloft.com/s/article/Drift-Sunset-FAQ); verbliebene Kunden sollten die Ablösung planen, nicht nur die Absicherung. Laut [Google Threat Intelligence](https://cloud.google.com/blog/topics/threat-intelligence/data-theft-salesforce-instances-via-salesloft-drift) nutzte eine als UNC6395 geführte Gruppe im August 2025 gestohlene OAuth-Access- und Refresh-Tokens der Drift-App. Der Angreifer fragte in Kunden-Orgs Cases, Accounts, User und Opportunities ab, exportierte die Ergebnisse und löschte danach die Query-Jobs; die Logs blieben erhalten. Laut Salesloft-Update zur abgeschlossenen Untersuchung war der Angreifer zuvor zwischen März und Juni 2025 in das GitHub-Konto von Salesloft gelangt und von dort in die AWS-Umgebung von Drift, wo die OAuth-Tokens vieler Kunden lagen.

GTIG geht davon aus, dass es vor allem um Zugangsdaten ging: AWS-Schlüssel, Passwörter und Snowflake-Tokens in den exportierten Datensätzen. [The Hacker News](https://thehackernews.com/2025/08/salesloft-oauth-breach-via-drift-ai.html) berichtet, GTIG habe gegenüber dem Medium von mehr als 700 potenziell betroffenen Organisationen gesprochen. Salesforce sprach von einer „kleinen Zahl von Kunden“. Die Zahlen beziehen sich vermutlich auf Unterschiedliches: potenziell exponierte Organisationen einerseits und tatsächlich betroffene Organisationen andererseits. Keine öffentliche Primärquelle nennt eine endgültige Zahl.

```zeitleiste
2025-08-08 | Angreifer beginnen, gestohlene Drift-Tokens zu nutzen
2025-08-18 | Zugriffe laufen laut GTIG mindestens bis zu diesem Tag
2025-08-20 | Salesloft und Salesforce widerrufen alle aktiven Drift-Tokens
2025-08-28 | Salesforce schaltet alle Salesloft-Integrationen ab
2025-09-07 | Integrationen wieder freigegeben, außer Drift
```

Salesforce nahm die App außerdem aus dem AppExchange, laut seiner [Sicherheitsmeldung](https://help.salesforce.com/s/articleView?id=005134951&language=en_US&type=1). Das GTIG-Update vom 28. August ergänzte, dass auch Drift-Email-Tokens gegen Google Workspace eingesetzt wurden und Kunden jedes in Drift gespeicherte Token als kompromittiert behandeln sollten.

GTIG und Salesforce stellen beide fest, dass der Vorfall nicht auf eine Schwachstelle der Salesforce-Plattform zurückgeht. Das stimmt, ist aber kein Trost: Salesforce sah eine autorisierte App, die mit gültigen Tokens die API aufrief, und das sieht auf den ersten Blick aus wie eine normale Synchronisation.

## Warum betrifft das gerade KI-Integrationen?

Drift war ein KI-Tool. Die meisten Unternehmen schließen gerade weitere an: Meeting-Recorder, die Gesprächsnotizen in Opportunities schreiben, E-Mail-Assistenten, Chatbots, die Leads und Fälle anlegen. Viele laufen auf den Servern des Anbieters und halten ein Refresh Token für Ihre Org; bei älteren Connected Apps gilt es oft, bis jemand es widerruft. Neuere oder Partner-Apps können Rotation und Inaktivitätsablauf unterliegen, und manche Integrationen nutzen den JWT-Bearer- oder Client-Credentials-Flow ganz ohne Refresh Token. Vier Fragen entscheiden über den Schaden, wenn ein solches Token gestohlen wird:

- **Als welcher Benutzer handelt das Token?** Autorisiert ein Admin die OAuth-Freigabe mit seinem eigenen Benutzer oder ist ein Run-As-User eingetragen, arbeitet das Token mit den Rechten dieses Benutzers, begrenzt durch die erteilten Scopes.
- **Welche Scopes wurden erteilt?** GTIG warnt ausdrücklich vor zu weiten Scopes wie `full`.
- **Wie lange gilt das Token?** „Gültig bis zum Widerruf“ ist laut [Dokumentation der OAuth-Richtlinien](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_manage_oauth.htm&language=en_US&type=5) der Standard bei Connected Apps.
- **Von wo darf es genutzt werden?** Der Angreifer nutzte Cloud-Hosts und Tor-Ausgangsknoten. Login-IP-Bereiche, beschränkt auf die Adressen des Anbieters, hätten diese Zugriffe abgewiesen.

Drift war nicht der letzte Fall. Im November 2025 [widerrief Salesforce die OAuth-Tokens](https://help.salesforce.com/s/articleView?id=005229029&language=en_US&type=1) der von Gainsight veröffentlichten Anwendungen, nachdem auffällige Zugriffe über VPN- und Tor-Adressen festgestellt worden waren. Auch hier gab es keine Schwachstelle in der Plattform. Am 10. Dezember 2025 gab Salesforce die Integrationen wieder frei, nachdem Mandiant und CrowdStrike die Abhilfemaßnahmen geprüft hatten. Angreifer brauchen kein Loch in Salesforce, wenn eine OAuth-App ihnen den Schlüssel gibt.

Für einen Hersteller haben die exportierten Objekte besonderes Gewicht. Opportunities und Accounts enthalten Händlerkonditionen und Projektpreise. Die User-Abfrage im GTIG-Bericht zog Namen, Titel, E-Mails und Mobilnummern aktiver Benutzer, eine fertige Phishing-Liste. Und in den Servicefällen eines Maschinenbauers würde ich genau das erwarten, wonach GTIG zu suchen empfiehlt: Login-URLs, VPN-Daten und Passwörter, eingetragen von Technikern, die Fernzugriff auf eine Maschine im Werk eines Kunden brauchten. Betroffen ist dann zuerst der Kunde.

## Salesforce hat den OAuth-Zugang seit 2025 verschärft

Die Schritte im Einzelnen:

- **Anfang September 2025: nicht installierte Connected Apps gesperrt.** Apps, die Benutzer autorisiert haben, ohne dass ein Admin sie installiert hat, sind für die meisten Benutzer nicht mehr erreichbar. Wer sie vorher schon autorisiert hatte, behält den Zugriff, außer wenn die App den Device Flow nutzt, laut [Salesforce-Admins-Blog](https://admin.salesforce.com/blog/2025/get-ready-for-changes-to-connected-app-usage-restrictions). Wer „Approve Uninstalled Connected Apps“ oder „Use Any API Client“ hat, umgeht die Sperre; diese Berechtigungen sollten also selten sein.
- **Spring '26: Anlegen von Connected Apps eingeschränkt.** Das Anlegen ist standardmäßig gesperrt, außer bei Paketinstallationen; eine Freischaltung erfordert eine Anfrage beim Support, laut [Spring-'26-Überblick für Architekten](https://www.salesforce.com/blog/spring-26-release-architect-highlights/). Bestehende Connected Apps funktionieren weiter.
- **External Client Apps für neue Integrationen.** Eine ECA ist standardmäßig geschlossen und funktioniert in einer Org erst, wenn ein Admin sie installiert. Admin-Richtlinien lassen sich nicht paketieren; ein Anbieter kann Ihnen also keine laxe Token-Richtlinie mitliefern, und ECAs sind laut [Entwickler-Blog](https://developer.salesforce.com/blogs/2025/01/secure-your-org-with-external-client-apps) als Metadaten abbildbar. Die meisten Richtlinien können im Repository verwaltet und dort geprüft werden. Laut Partner-FAQ gibt es Ausnahmen: IP-Allowlist und Inaktivitätsablauf für Refresh Tokens lassen sich nicht als Metadaten deployen, und ein Metadaten-Update kann diese Einstellungen abschalten, solange der App-Eigentümer sie nicht gesperrt hat.
- **Refresh-Token-Rotation bei neuen ECAs.** Sie ist standardmäßig aktiv und gesperrt. Laut Salesforce verkleinert sie den Schaden eines gestohlenen Refresh Tokens deutlich ([Help-Artikel](https://help.salesforce.com/s/articleView?id=005390912&language=en_US&type=1)).
- **Pflichtkontrollen für Partner-Apps.** Laut [Partner-FAQ](https://help.salesforce.com/s/articleView?id=005387798&language=en_US&type=1) mussten Apps, die in mehr als zwei Produktions-Orgs von Kunden laufen, bis zum 11. Mai 2026 PKCE, Refresh-Token-Rotation, einen Ablauf nach 30 Tagen Inaktivität und eine IP-Allowlist für Refresh Tokens aktivieren, soweit die jeweilige Kontrolle auf den OAuth-Flow der App anwendbar ist.

```hinweis offen
Ein Satz in dieser FAQ ist für Käufer wichtig: Ob der Ablauf nach 30 Tagen aktiv ist, können Admins der Kunden-Org ableiten; PKCE, Rotation und IP-Allowlist können sie aber nicht direkt prüfen. Bei diesen Punkten verlassen Sie sich auf die Auskunft des Anbieters; lassen Sie sich diese Angaben deshalb mit dem Datum der Aktivierung schriftlich bestätigen. Ihre eigenen Einstellungen wie Installation, Benutzerzuordnung, Scopes und Profil-IP-Bereiche prüfen Sie selbst.
```

ECAs unterstützen außerdem den Username-Password Flow nicht. Was das für ältere ERP- und Middleware-Anbindungen heißt, steht in [Passwort-Integrationen enden 2027](/blog/salesforce-passwort-integrationen-2027/).

## Welche Kontrollen braucht ein Hersteller jetzt?

Das würde ich für jede Connected App und ECA in Produktion verlangen, beginnend mit den KI-Tools:

1. **Eine Bestandsliste mit Verantwortlichen.** Connected Apps OAuth Usage im Setup listet jede App, ihre Benutzer und ob sie installiert ist. Jeder Eintrag erhält einen fachlichen Verantwortlichen und einen Zweck. Apps, die niemand beansprucht, werden gesperrt, was ihre Sitzungen sofort beendet; kündigen Sie das vorher an.
2. **Installieren und vorab autorisieren.** „Admin approved users are pre-authorized“ setzen und den Zugang über ein Permission Set pro App vergeben.
3. **Ein eigener Integrationsuser pro serverseitiger App**, soweit der Anbieter und die nötigen Lizenzen das zulassen. Die Lizenz Salesforce Integration mit dem Profil „Minimum Access - API Only Integrations“ erlaubt laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=platform.integration_user.htm&type=5) nur API-Zugriff. Die Beschränkung auf API-Zugriff lässt sich nicht aufheben, andere Teile des Profils sind konfigurierbar; ich würde die Rechte der App über Permission Sets ergänzen. Ein Chatbot auf der Website muss Leads und Fälle anlegen, keine Opportunities lesen.
4. **API Enabled nur über Permission Sets**, wie GTIG empfiehlt, damit ein normaler Benutzer nicht versehentlich einen API-Client autorisiert.
5. **Kein Scope `full`.** Besteht ein Anbieter darauf, fragen Sie schriftlich nach dem Grund.
6. **Eine Token-Richtlinie.** „Gültig bis zum Widerruf“ durch Ablauf bei Nichtnutzung ersetzen. Bei IP-Beschränkungen hilft die Connected-App-Einstellung „Enforce IP restrictions“ allein wenig: Sie ist laut [Dokumentation der OAuth-Richtlinien](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_manage_oauth.htm&language=en_US&type=5) ohnehin der Standard und wendet nur die in der Org konfigurierten IP-Bereiche an, etwa die im Profil des Benutzers. Die eigentliche Kontrolle sind die veröffentlichten Adressbereiche des Anbieters als Login-IP-Bereiche im Profil des Integrationsusers oder die IP-Allowlist für Refresh Tokens einer External Client App.
7. **Logs, die zurückreichen.** Ohne Add-on erhalten Enterprise-, Performance- und Unlimited-Orgs ausgewählte Ereignistypen mit einer Aufbewahrungsfrist von einem Tag, laut [Event-Monitoring-FAQ](https://help.salesforce.com/s/articleView?id=000396295&language=en_US&type=1). Bezahlte Logs werden standardmäßig 30 Tage lang aufbewahrt, maximal bis zu einem Jahr, und die Aufbewahrung beginnt erst mit dem Vertragsbeginn. Die Drift-Aktivität dauerte mindestens zehn Tage, bevor sie bekannt wurde; ohne laufenden SIEM-Export oder Add-on müssten Sie historische Logs nachträglich kaufen.
8. **Keine Zugangsdaten in Datensätzen.** Fälle, Kommentare und E-Mails nach Passwörtern, VPN-Begriffen und AWS-Schlüsseln durchsuchen, wie GTIG sie auflistet, und dem Service einen Tresor für Fernwartungszugänge geben.
9. **Ein Fragebogen für Anbieter und eine Widerrufsübung.** Fragen Sie jeden Anbieter, wo Ihre Tokens liegen und ob Rotation und IP-Allowlist aktiv sind. Intern legen Sie fest, wer nachts die Tokens einer App widerruft und welcher Prozess dann stillsteht.

Das meiste davon ist Konfiguration. Event Monitoring kostet Geld und sollte bewusst entschieden werden.

## Praxisbeispiel: neun Apps bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, SAP und 80 Händlern. Alle Zahlen sind Annahmen. Connected Apps OAuth Usage zeigt neun Apps, darunter die SAP-Middleware, ein Backup-Tool, einen KI-Meeting-Recorder für 25 Vertriebsmitarbeitende, einen KI-Chatbot für Ersatzteilanfragen auf der Website und eine App, die niemand kennt.

Der Chatbot ist das Drift-Muster. Sein Integrationsuser wurde im Proof of Concept von einem Systemadministrator kopiert, der Scope ist `full`, das Refresh Token gilt bis zum Widerruf, IP-Beschränkungen sind gelockert. Er muss nur Leads und Fälle anlegen, könnte aber jede Preisvereinbarung mit Händlern lesen.

Der Meeting-Recorder läuft benutzerbezogen; jedes Token hat die Rechte des jeweiligen Benutzers, ähnlich dem Named-User-Modell in [Hosted MCP Server und Datenzugriff](/blog/salesforce-hosted-mcp-server-datenzugriff/). Der Unterschied: Der Anbieter speichert 25 Refresh Tokens auf seinen eigenen Servern.

In diesem Beispiel dauern die Korrekturen zwei Wochen. Der Chatbot erhält einen eigenen Integrationsuser, der nur Leads und Fälle anlegen darf, `full` entfällt, die IP-Bereiche des Anbieters werden als Login-IP-Bereiche in sein Profil eingetragen. Der Meeting-Recorder wird installiert, auf ein Permission Set beschränkt, seine Tokens laufen nach 30 Tagen ohne Nutzung ab. Die unbekannte App wird gesperrt. Eine Suche in den Servicefällen findet in diesem Beispiel 340 Datensätze mit Passwörtern oder Fernwartungsdaten; sie werden bereinigt und die Zugänge mit den betroffenen Kunden geändert.

Nichts davon verhindert, dass ein Anbieter Ihre Tokens verliert. Es entscheidet, was ein gestohlenes Token kann: Mit Login-IP-Bereichen im Profil und erzwungener IP-Beschränkung werden Anfragen von fremden Adressen abgewiesen; von einer erlaubten Adresse aus kann es Leads anlegen, aber keine Händlerpreise lesen.

## Jede App markieren, die Salesforce-Daten an ein Modell schickt

Fangen Sie mit den KI-Tools an, weil sie die neuesten und am wenigsten geprüften sind: Markieren Sie jede App, die Salesforce-Daten an ein Modell schickt, und prüfen Sie für diese zuerst Benutzer, Scopes und Token-Richtlinie. Ihr zweites Risiko ist [Prompt Injection im Händlerportal](/blog/prompt-injection-haendlerportal-agentforce/). Eine Liste aller Schnittstellen mit benannten Verantwortlichen gehört zu meiner Arbeit an [Salesforce-Schnittstellen](/leistungen/salesforce-schnittstellen/).
