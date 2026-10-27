---
title: "Salesforce: Passwort-Integrationen enden 2027"
description: "Der OAuth Username-Password Flow endet am 20. Februar 2027, der SOAP-Login wird strenger. Was Enterprise-Teams jetzt prüfen sollten und wie sie umstellen."
pubDate: 2026-10-23
lang: de
slug: salesforce-passwort-integrationen-2027
translationKey: salesforce-password-integrations-2027
topic: security
category: devops
tags: [Integration, Sicherheit, OAuth, Release-Management, Partnersteuerung]
takeaways:
  - "Salesforce schaltet den OAuth 2.0 Username-Password Flow für Connected Apps am 20. Februar 2027 ab; Integrationen, die sich mit Benutzer, Passwort und Security Token anmelden, schlagen dann fehl."
  - "SOAP-API-Logins brauchen ab 1. Dezember 2026 die Berechtigung Use Any API Auth, und SOAP login() in den API-Versionen 31.0 bis 64.0 entfällt mit Summer '27."
  - "Ersatz sind der Client Credentials Flow für Server-zu-Server-Integrationen, der JWT Bearer Flow für zertifikatsbasiertes Vertrauen und der Web Server Flow mit PKCE für Anwendungen mit echten Benutzern."
  - "Fehler fallen oft nicht auf: Eine nächtliche Synchronisation aktualisiert einfach keine Datensätze mehr. Die Bestandsaufnahme beginnt deshalb mit Login History, Middleware-Logs und Herstellerauskünften."
  - "Jede Integration braucht einen benannten Verantwortlichen auf Kundenseite, einen eigenen Integrationsuser und Zugangsdaten im Tresor des Kunden."
faq:
  - q: "Wann funktioniert der OAuth Username-Password Flow nicht mehr?"
    a: "Salesforce setzt die Abschaltung am 20. Februar 2027 für alle Orgs durch. Integrationen, die ein Token mit grant_type=password, Benutzer, Passwort und Security Token anfordern, schlagen ab dann fehl."
  - q: "Was ersetzt den OAuth Username-Password Flow?"
    a: "Für Server-zu-Server-Integrationen der Client Credentials Flow mit einem Run-As-Benutzer oder der JWT Bearer Flow mit Zertifikat. Anwendungen, die im Namen einzelner Benutzer handeln, nutzen den Web Server Flow mit PKCE."
  - q: "Wie finde ich Integrationen, die noch den Passwort-Flow nutzen?"
    a: "Filtern Sie die Login History nach dem Login-Subtyp OAuth Username-Password, durchsuchen Sie Code und Middleware-Konfigurationen nach grant_type=password und lassen Sie sich von allen Herstellern von Paketen und Konnektoren den Flow schriftlich bestätigen."
  - q: "Löst ein Umstieg auf External Client Apps das Problem?"
    a: "Nein. External Client Apps unterstützen den Username-Password Flow überhaupt nicht. Das externe System selbst muss auf einen unterstützten Flow wie Client Credentials oder JWT Bearer umgestellt werden."
---

Salesforce-Integrationen, die sich mit Benutzername, Passwort und Security Token anmelden, haben ein Ablaufdatum. Am 20. Februar 2027 schaltet Salesforce den OAuth 2.0 Username-Password Flow für Connected Apps ab, und diese Integrationen funktionieren dann nicht mehr. Parallel wird der Login über die SOAP-API in mehreren Schritten strenger. Für Unternehmen mit ERP-Anbindungen, Middleware, Data Loadern, Backup-Tools und Reporting-Exporten ist das ein Projekt mit festem Termin, und der schwierigste Teil ist, jede betroffene Integration zu finden, bevor sie still ausfällt.

## Was ändert sich genau und wann?

Drei Änderungen überlagern sich und werden leicht verwechselt:

1. **Ab 1. Dezember 2026: SOAP login() braucht eine Berechtigung.** Laut dem Entwickler-Leitfaden von Salesforce zum Winter-'27-Release brauchen Benutzer, die sich über den SOAP-Aufruf login() anmelden, die Berechtigung „Use Any API Auth“. Ohne sie wird der Login abgelehnt.
2. **20. Februar 2027: Der OAuth Username-Password Flow endet.** Integrationen, die ein Access Token mit `grant_type=password` plus Benutzer, Passwort und Security Token anfordern, schlagen ab diesem Datum fehl. Salesforce hat das als [Release Update](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5) veröffentlicht und den Termin bereits einmal verschoben, von Winter '27 auf Februar 2027.
3. **Summer '27: SOAP login() in älteren API-Versionen entfällt.** Der SOAP-Aufruf login() in den API-Versionen 31.0 bis 64.0 funktioniert nicht mehr. Zusätzlich bekommen SOAP-, REST- und Bulk-API in den Versionen 31.0 bis 40.0 ab Summer '27 keine Updates mehr und fallen ab Summer '28 aus.

Die Details stehen im [Entwickler-Leitfaden zu Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release). Normale Datenoperationen über die SOAP-API, also Abfragen, Anlegen oder Ändern, funktionieren weiter. Es ändert sich, wie sich Integrationen anmelden.

![Zeitstrahl der Salesforce-Login-Änderungen für Integrationen: Ab 1. Dezember 2026 braucht SOAP login() die Berechtigung Use Any API Auth, am 20. Februar 2027 endet der OAuth Username-Password Flow für Connected Apps, mit Summer '27 entfällt SOAP login() in den API-Versionen 31.0 bis 64.0 und die Versionen 31.0 bis 40.0 bekommen keine Updates mehr, mit Summer '28 fallen SOAP-, REST- und Bulk-API in den Versionen 31.0 bis 40.0 aus. Abfragen, Anlegen und Ändern funktionieren weiter, es ändert sich, wie sich Integrationen anmelden.](../../../assets/blog/password-flow-timeline-de.png)

## Warum trifft das Enterprise-Organisationen stärker?

Eine kleine Org hat eine Handvoll Integrationen, und der Admin kennt sie. Eine Enterprise-Org ist über Jahre gewachsen. Typische Quellen für Passwort-Logins sind:

- **ERP- und Auftragsschnittstellen**, die vor Jahren von einem Partner gebaut wurden, der heute nicht mehr dabei ist.
- **Middleware und Integrationsplattformen**, in deren Konfiguration das Passwort eines technischen Benutzers hinterlegt ist.
- **Data Loader und geplante Skripte**, die auf irgendeinem Server laufen.
- **Backup-, Archiv- und Reporting-Tools**, die jede Nacht Daten abziehen.
- **Managed Packages und Konnektoren** von Herstellern, die selbst entscheiden, welchen Flow sie nutzen.

Das gemeinsame Problem: Niemand hat eine vollständige Liste. Integrationen wurden von verschiedenen Partnern gebaut, an verschiedenen Orten dokumentiert und laufen oft mit einem technischen Benutzer, den sich mehrere Systeme teilen. Wird der Flow abgeschaltet, ist der Ausfall selten laut. Ein nächtlicher Job aktualisiert keine Datensätze mehr, ein Bericht zeigt die Zahlen von gestern, und jemand merkt es Tage später, wenn Vertrieb oder Service mit veralteten Daten arbeiten.

Deshalb sehe ich das vor allem als Governance-Aufgabe und weniger als technische. Die technische Umstellung pro Integration ist beherrschbar. Das Risiko liegt in dem, was niemand kennt.

## Wie finden Sie jede betroffene Integration?

Beginnen Sie die Bestandsaufnahme jetzt und nicht im Januar. Diese Quellen ergänzen sich:

1. **Login History.** Legen Sie eine Ansicht mit dem Filter Login-Subtyp „OAuth Username-Password“ an. Sie zeigt, welche Benutzer und Connected Apps den Flow noch nutzen. Beachten Sie, dass die Login History nur etwa sechs Monate abdeckt. Eine Integration, die quartalsweise läuft, taucht womöglich nicht auf.
2. **Middleware und Code.** Durchsuchen Sie Integrationskonfigurationen, Skripte und Repositories nach `grant_type=password`, „Password Grant“ oder „ROPC“. Hier zahlt sich ein Git-Repository mit allem Integrationscode aus.
3. **Hersteller.** Fragen Sie jeden Anbieter eines Managed Packages, Konnektors oder SaaS-Tools mit Salesforce-Anbindung schriftlich, welchen OAuth-Flow er nutzt und wann er umstellt.
4. **Sandbox-Test.** Schalten Sie in einer Full- oder Partial-Copy-Sandbox die Einstellung „Allow OAuth Username-Password Flows“ ab und lassen Sie die Integrationen laufen. Was dort scheitert, würde im Februar in der Produktion scheitern.
5. **SOAP-Logins.** Prüfen Sie, welche Integrationsuser sich per SOAP anmelden und welche API-Versionen sie nutzen, damit Sie die Schritte im Dezember und mit Summer '27 nicht überraschen.

Das Ergebnis sollte eine einzige Liste sein: Integration, Zweck, Verantwortlicher auf Kundenseite, technischer Benutzer, Flow, API-Version, Hersteller oder Partner, Umstellungstermin. Diese Liste lohnt sich auch nach der Umstellung, als Teil der [Architekturdokumentation](../../leistungen/salesforce-schnittstellen/).

## Welcher Flow ersetzt den Passwort-Login?

Salesforce bietet mehrere OAuth-Flows an. Für die meisten Enterprise-Integrationen läuft die Wahl auf drei hinaus:

- **Client Credentials Flow.** Die Standardwahl für Server-zu-Server-Integrationen wie Middleware, ETL und Backup-Tools. Die Integration meldet sich mit Client-ID und Secret an und handelt als festgelegter Run-As-Benutzer. Kein interaktiver Login, kein Benutzerpasswort.
- **JWT Bearer Flow.** Für Integrationen, bei denen ein Zertifikat einem geteilten Secret vorgezogen wird, etwa kritische ERP-Anbindungen. Die Integration signiert ein Token mit ihrem privaten Schlüssel, Salesforce prüft es mit dem hinterlegten Zertifikat. CI/CD-Pipelines, die nach Salesforce deployen, nutzen in der Regel ebenfalls diesen Flow.
- **Web Server Flow mit PKCE.** Für Anwendungen, in denen sich echte Benutzer anmelden und in eigenem Namen handeln.

Salesforce empfiehlt für neue Integrationen External Client Apps statt klassischer Connected Apps. Eine Falle: Eine Connected App einfach in eine External Client App umzuziehen, löst das Problem nicht, weil External Client Apps den Username-Password Flow gar nicht unterstützen. Das externe System selbst muss die Art ändern, wie es Tokens anfordert. Salesforce Time hat eine gute [Schritt-für-Schritt-Übersicht](https://salesforcetime.com/2026/10/15/salesforce-oauth-username-password-flow-retirement/) zur Umstellung.

## Was ist mit MFA?

Multi-Faktor-Authentifizierung ist das zweite Sicherheitsthema auf vielen Listen. Salesforce verlangt MFA für alle Benutzer, die sich über die Oberfläche anmelden, und Admins sowie Benutzer mit erweiterten Rechten brauchen phishing-resistente Verfahren wie Sicherheitsschlüssel. Im Oktober gab es Verwirrung über gemeldete Verzögerungen. Salesforce hat klargestellt, dass es keine unbefristeten Verschiebungen gibt und einzelne Kunden mit Fristverlängerung in den kommenden Monaten nachziehen, wie [Salesforce Ben berichtet](https://www.salesforceben.com/salesforce-confirms-new-mfa-updates-what-you-should-expect/).

MFA und die OAuth-Abschaltung zeigen in dieselbe Richtung: keine geteilten Passwörter mehr. Integrationsuser sollten sich nie interaktiv anmelden, und echte Benutzer sollten nie Accounts mit Integrationen teilen.

## Wer sollte die Umstellung verantworten?

Der Kunde. Integrationen verbinden die Systeme des Kunden, und die Zugangsdaten gehören in seinen Tresor und nicht in die Konfiguration eines Partners. In der Praxis heißt das:

- **Ein benannter Verantwortlicher pro Integration** auf Kundenseite, auch wenn ein Partner die technische Arbeit macht.
- **Ein eigener Integrationsuser pro Integration**, nur mit den Rechten, die er braucht. Geteilte technische Benutzer machen es unmöglich zu erkennen, welches System was tut.
- **Secrets und Zertifikate im Tresor des Kunden**, erneuert beim Partnerwechsel. Das grundsätzliche Prinzip erkläre ich in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/).
- **Änderungen über den normalen Release-Prozess**, mit der Konfiguration der neuen Connected App oder External Client App im Repository und Deployment über die Pipeline.

## Wie sollte der Plan aussehen?

Eine realistische Reihenfolge für die kommenden Monate:

1. **Bis Ende November 2026:** Bestandsaufnahme fertig, Verantwortliche benannt, Hersteller angefragt.
2. **Dezember 2026:** Die SOAP-Login-Berechtigung für alle Integrationsuser prüfen, bevor der 1. Dezember greift.
3. **Dezember bis Januar:** Integrationen auf Client Credentials oder JWT Bearer umstellen, die kritischsten zuerst. In einer Sandbox mit abgeschaltetem Passwort-Flow testen.
4. **Anfang Februar 2027:** Den Passwort-Flow in der Produktion selbst abschalten, einige Tage vor Salesforce, mit dem Team in Bereitschaft.
5. **Frühjahr 2027:** Verbleibende SOAP-Logins vor Summer '27 von API-Versionen unter 65.0 wegbringen.

Der Termin steht fest und die Arbeit ist planbar, solange sie mit einer vollständigen Liste beginnt. Wenn Sie Unterstützung bei der Bestandsaufnahme oder eine zweite Meinung zu Ihrer Integrationsarchitektur möchten, [schreiben Sie mir](#contact).
