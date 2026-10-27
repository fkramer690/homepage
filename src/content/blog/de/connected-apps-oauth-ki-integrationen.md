---
title: "Connected Apps und KI-Tools: Lehren aus Salesloft Drift"
description: "Was der Salesloft-Drift-Vorfall über Connected Apps, OAuth-Tokens und KI-Integrationen in Salesforce lehrt und welche Kontrollen Hersteller jetzt brauchen."
pubDate: 2026-10-27
lang: de
slug: connected-apps-oauth-ki-integrationen
translationKey: oauth-connected-apps-ai-lessons
topic: security
categories: [architecture, ai]
tags: [Connected Apps, OAuth, Sicherheit, KI-Integrationen, External Client Apps, Maschinenbau]
takeaways:
  - "Im August 2025 exportierten Angreifer mit gestohlenen OAuth-Tokens der KI-Chat-App Drift Cases, Accounts, User und Opportunities aus Salesforce-Orgs, ohne eine Schwachstelle in Salesforce auszunutzen."
  - "Jedes SaaS-Tool mit einem Refresh Token für Ihre Org gehört zu Ihrer Sicherheitsgrenze; den Schaden bestimmen Rechte des Integrationsusers, Scopes, Token-Richtlinie und IP-Beschränkung."
  - "Seit September 2025 sperrt Salesforce nicht installierte Connected Apps für die meisten Benutzer, seit Spring '26 brauchen neue Connected Apps den Support, neue External Client Apps erzwingen Token-Rotation."
  - "Die meisten OAuth-Kontrollen in der App eines Anbieters können Admins nicht prüfen; KI-Anbieter sollten schriftlich bestätigen, wie sie Ihre Tokens speichern, rotieren und beschränken."
  - "Maschinenbauer sollten Servicefälle nach Passwörtern und Fernwartungszugängen durchsuchen, denn der Drift-Angreifer hat exportierte Datensätze gezielt nach Zugangsdaten durchsucht."
faq:
  - q: "War der Salesloft-Drift-Vorfall eine Sicherheitslücke in Salesforce?"
    a: "Nein. Google Threat Intelligence und Salesforce stellen beide fest, dass er nicht auf eine Schwachstelle der Salesforce-Plattform zurückgeht. Der Angreifer nutzte gültige OAuth-Tokens, die aus der Drift-Anwendung gestohlen wurden; Salesforce sah also normalen API-Zugriff einer autorisierten App."
  - q: "Was unterscheidet eine Connected App von einer External Client App?"
    a: "Beide lassen externe Systeme per OAuth auf Salesforce zugreifen. External Client Apps sind standardmäßig geschlossen, trennen Admin-Richtlinien von Entwicklereinstellungen und sind vollständig als Metadaten abbildbar. Seit Spring '26 schränkt Salesforce das Anlegen neuer Connected Apps ein und empfiehlt External Client Apps."
  - q: "Wie sehe ich, welche Apps Zugriff auf unsere Salesforce-Org haben?"
    a: "Im Setup zeigt Connected Apps OAuth Usage jede App mit Tokens, die Zahl ihrer Benutzer und ob sie installiert ist. Dort können Sie die Tokens einer App widerrufen oder die App sperren, was ihre aktiven Sitzungen sofort beendet."
  - q: "Brauchen wir Event Monitoring, um einen Vorfall wie Drift aufzuklären?"
    a: "Ohne Add-on bekommen Enterprise- und Unlimited-Orgs nur ausgewählte Ereignistypen mit einem Tag Aufbewahrung. Die Drift-Aktivität begann am 8. August 2025 und wurde am 20. August bekannt; für einen brauchbaren Rückblick braucht es bezahltes Event Monitoring mit 30 Tagen oder mehr."
  - q: "Welche Refresh-Token-Richtlinie sollte eine KI-Integration haben?"
    a: "Standard bei Connected Apps ist „gültig bis zum Widerruf“. Für KI-Tools, die auf Servern des Anbieters laufen, würde ich Ablauf bei Nichtnutzung setzen, die Login-IP-Bereiche des Integrationsusers auf die veröffentlichten Adressbereiche des Anbieters beschränken und Token-Rotation verlangen, die neue External Client Apps erzwingen."
draft: false
---

Der Salesloft-Drift-Vorfall hat gezeigt, dass eine Connected App ein unüberwachter Weg in Ihre Org sein kann, und KI-Integrationen fügen jedes Quartal neue hinzu. Im August 2025 haben Angreifer mit gestohlenen OAuth-Tokens einer KI-Chat-App Daten aus Kunden-Orgs exportiert, ohne in Salesforce selbst einzubrechen. Jedes Tool, das ein Refresh Token für Ihre Org hält, gehört zu Ihrer Sicherheitsgrenze. Ein Hersteller braucht pro App einen Verantwortlichen, enge Scopes, einen eigenen Integrationsuser mit wenig Rechten und eine Token-Richtlinie, dazu Logs, die weit genug zurückreichen.

## Was ist beim Salesloft-Drift-Vorfall passiert?

Drift ist ein KI-Chat-Agent von Salesloft, den Unternehmen über eine Connected App mit Salesforce verbunden hatten. Laut [Google Threat Intelligence](https://cloud.google.com/blog/topics/threat-intelligence/data-theft-salesforce-instances-via-salesloft-drift) nutzte eine als UNC6395 geführte Gruppe vom 8. bis mindestens 18. August 2025 gestohlene OAuth-Access- und Refresh-Tokens der Drift-App. Der Angreifer fragte in Kunden-Orgs Cases, Accounts, User und Opportunities ab, exportierte die Ergebnisse und löschte danach die Query-Jobs; die Logs blieben erhalten.

GTIG geht davon aus, dass es vor allem um Zugangsdaten ging: AWS-Schlüssel, Passwörter und Snowflake-Tokens in den exportierten Datensätzen. [The Hacker News](https://thehackernews.com/2025/08/salesloft-oauth-breach-via-drift-ai.html) berichtet, dass GTIG mehr als 700 potenziell betroffene Organisationen kannte, Salesforce sprach von einer „small number of customers“.

Am 20. August widerriefen Salesloft und Salesforce laut GTIG alle aktiven Drift-Tokens, Salesforce nahm die App aus dem AppExchange. Laut der [Sicherheitsmeldung von Salesforce](https://help.salesforce.com/s/articleView?id=005134951&language=en_US&type=1) wurden am 28. August alle Salesloft-Integrationen abgeschaltet und am 7. September wieder freigegeben, außer Drift. Das GTIG-Update vom 28. August ergänzte, dass auch Drift-Email-Tokens gegen Google Workspace eingesetzt wurden und Kunden jedes in Drift gespeicherte Token als kompromittiert behandeln sollten.

GTIG und Salesforce stellen beide fest, dass der Vorfall nicht auf eine Schwachstelle der Salesforce-Plattform zurückgeht. Das stimmt und hilft Ihnen trotzdem nicht: Salesforce sah eine autorisierte App, die mit gültigen Tokens die API aufrief, und das sieht auf den ersten Blick aus wie eine normale Synchronisation.

## Warum betrifft das gerade KI-Integrationen?

Drift war ein KI-Tool. Die meisten Unternehmen schließen gerade weitere an: Meeting-Recorder, die Gesprächsnotizen in Opportunities schreiben, E-Mail-Assistenten, Chatbots, die Leads und Fälle anlegen. Jedes läuft auf den Servern des Anbieters und hält ein Refresh Token für Ihre Org, standardmäßig bis jemand es widerruft. Vier Fragen entscheiden über den Schaden, wenn ein solches Token gestohlen wird:

- **Als welcher Benutzer handelt das Token?** Hat der Anbieter beim Einrichten einen Admin verlangt, liest das Token, was ein Admin liest.
- **Welche Scopes wurden erteilt?** GTIG warnt ausdrücklich vor zu weiten Scopes wie `full`.
- **Wie lange gilt das Token?** „Gültig bis zum Widerruf“ ist laut [Dokumentation der OAuth-Richtlinien](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_manage_oauth.htm&language=en_US&type=5) der Standard bei Connected Apps.
- **Von wo darf es genutzt werden?** Der Angreifer kam von Cloud-Hosts und Tor-Ausgangsknoten, die Login-IP-Bereiche, beschränkt auf die Adressen des Anbieters, abgewiesen hätten.

Drift war nicht der letzte Fall. Im November 2025 hat Salesforce die [OAuth-Tokens widerrufen](https://help.salesforce.com/s/articleView?id=005229029&language=en_US&type=1), die von Gainsight veröffentlichte Anwendungen nutzten, nach auffälligen Zugriffen über VPN- und Tor-Adressen, wieder ohne Schwachstelle in der Plattform. Angreifer brauchen kein Loch in Salesforce, wenn eine OAuth-App ihnen den Schlüssel gibt.

Für einen Hersteller haben die exportierten Objekte besonderes Gewicht. Opportunities und Accounts enthalten Händlerkonditionen und Projektpreise. Die User-Abfrage im GTIG-Bericht zog Namen, Titel, E-Mails und Mobilnummern aktiver Benutzer, eine fertige Phishing-Liste. Und in den Servicefällen eines Maschinenbauers würde ich genau das erwarten, wonach GTIG suchen lässt: Login-URLs, VPN-Daten und Passwörter, eingetragen von Technikern, die Fernzugriff auf eine Maschine im Werk eines Kunden brauchten. Das trifft zuerst den Kunden.

## Was hat Salesforce seitdem geändert?

Salesforce hat den OAuth-Zugang in mehreren Schritten verschärft:

- **Anfang September 2025: nicht installierte Connected Apps gesperrt.** Apps, die Benutzer autorisiert haben, ohne dass ein Admin sie installiert hat, sind für die meisten Benutzer nicht mehr erreichbar, laut [Salesforce-Admins-Blog](https://admin.salesforce.com/blog/2025/get-ready-for-changes-to-connected-app-usage-restrictions). Wer „Approve Uninstalled Connected Apps“ oder „Use Any API Client“ hat, umgeht die Sperre; diese Berechtigungen sollten also selten sein.
- **Spring '26: keine neuen Connected Apps.** Das Anlegen ist standardmäßig gesperrt, außer über Paketinstallation, und die Freischaltung braucht eine Anfrage beim Support, laut [Spring-'26-Überblick für Architekten](https://www.salesforce.com/blog/spring-26-release-architect-highlights/).
- **External Client Apps als Ersatz.** Eine ECA ist standardmäßig geschlossen und funktioniert in einer Org erst, wenn ein Admin sie installiert. Admin-Richtlinien lassen sich nicht paketieren, ein Anbieter kann Ihnen also keine laxe Token-Richtlinie mitliefern, und ECAs sind laut [Entwickler-Blog](https://developer.salesforce.com/blogs/2025/01/secure-your-org-with-external-client-apps) vollständig als Metadaten abbildbar. Ihre Richtlinien können im Repository liegen und durchs Review gehen.
- **Refresh-Token-Rotation bei neuen ECAs**, standardmäßig aktiv und gesperrt. Laut Salesforce verkleinert sie den Schaden eines gestohlenen Refresh Tokens deutlich ([Help-Artikel](https://help.salesforce.com/s/articleView?id=005390912&language=en_US&type=1)).
- **Pflichtkontrollen für Partner-Apps.** Apps, die in mehr als zwei Produktions-Orgs von Kunden laufen, mussten bis 11. Mai 2026 PKCE, Refresh-Token-Rotation, einen Ablauf nach 30 Tagen Inaktivität und eine IP-Allowlist für Refresh Tokens aktivieren, soweit die jeweilige Kontrolle auf den OAuth-Flow der App anwendbar ist, laut [Partner-FAQ](https://help.salesforce.com/s/articleView?id=005387798&language=en_US&type=1).

Ein Satz in dieser FAQ ist für Käufer wichtig: Die meisten dieser Kontrollen können Admins nicht direkt prüfen. Sie verlassen sich auf die Auskunft des Anbieters, also lassen Sie sie sich schriftlich geben.

ECAs unterstützen außerdem den Username-Password Flow nicht. Was das für ältere ERP- und Middleware-Anbindungen heißt, steht in [Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/).

## Welche Kontrollen braucht ein Hersteller jetzt?

Das würde ich für jede Connected App und ECA in Produktion verlangen, beginnend mit den KI-Tools:

1. **Eine Bestandsliste mit Verantwortlichen.** Connected Apps OAuth Usage im Setup listet jede App, ihre Benutzer und ob sie installiert ist. Jeder Eintrag bekommt einen fachlichen Verantwortlichen und einen Zweck. Apps, die niemand beansprucht, werden gesperrt, was ihre Sitzungen sofort beendet; kündigen Sie das vorher an.
2. **Installieren und vorab autorisieren.** „Admin approved users are pre-authorized“ setzen und den Zugang über ein Permission Set pro App vergeben.
3. **Ein eigener Integrationsuser pro serverseitiger App.** Die Lizenz Salesforce Integration mit dem Profil „Minimum Access - API Only Integrations“ erlaubt laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=platform.integration_user.htm&type=5) nur API-Zugriff. Das Profil selbst ist konfigurierbar; ich würde die Rechte der App über Permission Sets ergänzen. Ein Chatbot auf der Website muss Leads und Fälle anlegen, keine Opportunities lesen.
4. **API Enabled nur über Permission Sets**, wie GTIG empfiehlt, damit ein normaler Benutzer nicht versehentlich einen API-Client autorisiert.
5. **Kein Scope `full`.** Besteht ein Anbieter darauf, fragen Sie schriftlich nach dem Grund.
6. **Eine Token-Richtlinie.** „Gültig bis zum Widerruf“ durch Ablauf bei Nichtnutzung ersetzen. Bei IP-Grenzen hilft die Connected-App-Einstellung „Enforce IP restrictions“ allein wenig: Sie ist laut [Dokumentation der OAuth-Richtlinien](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_manage_oauth.htm&language=en_US&type=5) ohnehin der Standard und wendet nur die in der Org konfigurierten IP-Bereiche an, etwa die im Profil des Benutzers. Die eigentliche Kontrolle sind die veröffentlichten Adressbereiche des Anbieters als Login-IP-Bereiche im Profil des Integrationsusers oder die IP-Allowlist für Refresh Tokens einer External Client App.
7. **Logs, die zurückreichen.** Ohne Add-on bekommen Enterprise- und Unlimited-Orgs ausgewählte Ereignistypen mit einem Tag Aufbewahrung, laut [Event-Monitoring-FAQ](https://help.salesforce.com/s/articleView?id=000396295&language=en_US&type=1). Bezahlte Logs halten standardmäßig 30 Tage, bis zu einem Jahr, und beginnen erst mit dem Vertragsbeginn. Drift lief mindestens zehn Tage, bevor es bekannt wurde.
8. **Keine Zugangsdaten in Datensätzen.** Fälle, Kommentare und E-Mails nach Passwörtern, VPN-Begriffen und AWS-Schlüsseln durchsuchen, wie GTIG sie auflistet, und dem Service einen Tresor für Fernwartungszugänge geben.
9. **Ein Fragebogen für Anbieter und eine Widerrufsübung.** Fragen Sie jeden Anbieter, wo Ihre Tokens liegen und ob Rotation und IP-Allowlist aktiv sind. Intern legen Sie fest, wer nachts die Tokens einer App widerruft und welcher Prozess dann stillsteht.

Das meiste davon ist Konfiguration. Event Monitoring kostet Geld und verdient eine bewusste Entscheidung.

## Ein typisches Szenario: neun Apps bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, SAP und 80 Händlern. Alle Zahlen sind Annahmen. Connected Apps OAuth Usage zeigt neun Apps, darunter die SAP-Middleware, ein Backup-Tool, einen KI-Meeting-Recorder für 25 Vertriebsmitarbeitende, einen KI-Chatbot für Ersatzteilanfragen auf der Website und eine App, die niemand kennt.

Der Chatbot ist das Drift-Muster. Sein Integrationsuser wurde im Proof of Concept von einem Systemadministrator kopiert, der Scope ist `full`, das Refresh Token gilt bis zum Widerruf, IP-Beschränkungen sind gelockert. Er muss Leads und Fälle anlegen. Er könnte jede Preisvereinbarung mit Händlern lesen.

Der Meeting-Recorder läuft pro Benutzer, jeder mit seinen eigenen Rechten, ähnlich dem Named-User-Modell in [Hosted MCP Server und Datenzugriff](../salesforce-hosted-mcp-server-datenzugriff/). Der Unterschied: Der Anbieter speichert 25 Refresh Tokens auf seinen eigenen Servern.

Die Korrekturen dauern angenommen zwei Wochen. Der Chatbot bekommt einen eigenen Integrationsuser, der nur Leads und Fälle anlegen darf, `full` entfällt, die IP-Bereiche des Anbieters kommen als Login-IP-Bereiche in sein Profil. Der Meeting-Recorder wird installiert, auf ein Permission Set beschränkt, seine Tokens laufen nach 30 Tagen ohne Nutzung ab. Die unbekannte App wird gesperrt. Eine Suche in den Servicefällen findet, angenommen, 340 Datensätze mit Passwörtern oder Fernwartungsdaten; sie werden bereinigt und die Zugänge mit den betroffenen Kunden geändert.

Nichts davon verhindert, dass ein Anbieter Ihre Tokens verliert. Es entscheidet, was ein gestohlenes Token kann: von einer fremden Adresse nichts, von einer erlaubten Leads anlegen, aber keine Händlerpreise lesen.

## Wo sollten Sie anfangen?

Fangen Sie mit den KI-Tools an, weil sie die neuesten und am wenigsten geprüften sind: Markieren Sie jede App, die Salesforce-Daten an ein Modell schickt, und prüfen Sie für diese zuerst Benutzer, Scopes und Token-Richtlinie. Ihr zweites Risiko ist [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/). Eine Liste aller Schnittstellen mit benannten Verantwortlichen gehört zu meiner Arbeit an [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Jede Connected App ist ein Schlüssel zu Ihrer Org in fremder Hand, also geben Sie jeder einen Verantwortlichen, einen engen Benutzer und ein Ablaufdatum. Wenn Sie vor dem nächsten KI-Tool einen zweiten Blick auf Ihre Connected Apps möchten, [schreiben Sie mir](#contact).
