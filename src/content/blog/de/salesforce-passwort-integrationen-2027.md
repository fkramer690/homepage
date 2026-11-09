---
title: "Salesforce: Passwort-Integrationen enden 2027"
metaTitle: "Salesforce Username-Password Flow: Abschaltung 20. Feb. 2027"
description: "Salesforce schaltet den OAuth Username-Password Flow am 20. Februar 2027 ab und SOAP login() mit Summer '27. So finden Sie betroffene Integrationen."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: salesforce-passwort-integrationen-2027
translationKey: salesforce-password-integrations-2027
topic: security
categories: [devops]
contactBrief: integration
tags: [Integration, Sicherheit, OAuth, Release-Management, Partnersteuerung]
takeaways:
  - "Ab dem 20. Februar 2027 schlagen Logins über den OAuth Username-Password Flow für Connected Apps fehl."
  - "SOAP login() braucht ab 1. Dezember 2026 die Berechtigung Use Any API Auth und entfällt mit Summer '27. Eine höhere API-Version ist kein Ausweg."
  - "Ersatz sind Client Credentials oder JWT Bearer für Server-zu-Server-Integrationen und der Web Server Flow mit PKCE für Anwendungen mit echten Benutzern."
  - "Token-Anfragen scheitern mit invalid_grant, die Folgen bleiben aber oft unbemerkt. Die Suche beginnt in Login History und Middleware-Logs."
  - "Jede Integration braucht einen benannten Verantwortlichen auf Kundenseite, einen eigenen Integrationsuser pro System und Zugangsdaten im Tresor des Kunden."
faq:
  - q: "Wann funktioniert der OAuth Username-Password Flow nicht mehr?"
    a: "Salesforce setzt die Abschaltung am 20. Februar 2027 für alle Orgs durch. Integrationen, die ein Token mit grant_type=password anfordern, schlagen ab dann mit dem Fehler invalid_grant fehl."
  - q: "Was ersetzt den OAuth Username-Password Flow?"
    a: "Für Server-zu-Server-Integrationen der Client Credentials Flow mit einem Run-As-Benutzer oder der JWT Bearer Flow mit Zertifikat. Anwendungen, die im Namen einzelner Benutzer handeln, nutzen den Web Server Flow mit PKCE."
  - q: "Wie finde ich Integrationen, die noch den Passwort-Flow nutzen?"
    a: "Filtern Sie die Login History nach dem Login-Subtyp OAuth Username-Password oder nutzen Sie die SOQL-Abfrage, die Salesforce dafür veröffentlicht, durchsuchen Sie Code und Middleware-Konfigurationen nach grant_type=password und lassen Sie sich von allen Herstellern von Paketen und Konnektoren den Flow schriftlich bestätigen."
  - q: "Löst ein Umstieg auf External Client Apps das Problem?"
    a: "Nein. External Client Apps unterstützen den Username-Password Flow überhaupt nicht. Das externe System selbst muss auf einen unterstützten Flow wie Client Credentials oder JWT Bearer umgestellt werden."
  - q: "Kann ich die Abschaltung vor Februar 2027 testen?"
    a: "Ja. Schalten Sie in einer Full- oder Partial-Copy-Sandbox die Einstellung Allow OAuth Username-Password Flows aus und lassen Sie Ihre Integrationen dagegen laufen. Salesforce Help beschreibt außerdem, wie Sie den Flow für die ganze Org sperren. So schalten Sie ihn in Produktion zu Ihrem eigenen Termin ab, bevor Salesforce es tut."
---

Salesforce-Integrationen, die ein Token mit Benutzername und Passwort anfordern (`grant_type=password`), haben ein Ablaufdatum. Am 20. Februar 2027 schaltet Salesforce den OAuth 2.0 Username-Password Flow für Connected Apps ab, und diese Integrationen funktionieren dann nicht mehr. Parallel wird der Login über die SOAP-API in mehreren Schritten strenger. Für Unternehmen mit ERP-Anbindungen, Middleware, Data Loadern, Backup-Tools und Reporting-Exporten ist das ein Projekt mit festem Termin, und der schwierigste Teil ist, jede betroffene Integration zu finden, bevor sie ausfällt.

## Was ändert sich genau und wann?

Drei Änderungen überlagern sich und werden leicht verwechselt:

1. **Ab 1. Dezember 2026: SOAP login() braucht eine Berechtigung.** Laut dem Entwickler-Leitfaden von Salesforce zum Winter-'27-Release brauchen Benutzer, die sich über den SOAP-Aufruf login() anmelden, die Berechtigung „Use Any API Auth“. Ohne sie wird der Login abgelehnt.
2. **20. Februar 2027: Der OAuth Username-Password Flow endet.** Integrationen, die ein Access Token mit `grant_type=password` anfordern, schlagen ab diesem Datum mit dem Fehler `invalid_grant` fehl. Je nach Netzwerkeinstellung enthält der Passwortwert auch das Security Token. Salesforce hat das als [Release Update](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5) veröffentlicht und den Termin bereits einmal verschoben, von Winter '27 auf Februar 2027.
3. **Summer '27: SOAP login() entfällt.** Den SOAP-Aufruf login() gibt es nur bis API-Version 64.0, und diese Versionen funktionieren mit dem Summer-'27-Upgrade Ihrer Org nicht mehr. Eine höhere API-Version ist also kein Ausweg, der Login muss auf OAuth umgestellt werden. Zusätzlich bekommen SOAP-, REST- und Bulk-API in den Versionen 31.0 bis 40.0 ab Summer '27 keine Updates mehr und fallen ab Summer '28 aus.

Die Details stehen im [Entwickler-Leitfaden zu Winter '27](https://developer.salesforce.com/blogs/2026/10/developers-guide-to-the-winter-27-release). Normale Datenoperationen über die SOAP-API, also Abfragen, Anlegen oder Ändern, funktionieren weiter. Es ändert sich, wie sich Integrationen anmelden.

![Zeitstrahl der Salesforce-Login-Änderungen für Integrationen: Ab 1. Dezember 2026 braucht SOAP login() die Berechtigung Use Any API Auth, am 20. Februar 2027 endet der OAuth Username-Password Flow für Connected Apps, mit Summer '27 entfällt SOAP login() in den API-Versionen 31.0 bis 64.0 und die Versionen 31.0 bis 40.0 bekommen keine Updates mehr, mit Summer '28 fallen SOAP-, REST- und Bulk-API in den Versionen 31.0 bis 40.0 aus. Abfragen, Anlegen und Ändern funktionieren weiter, es ändert sich, wie sich Integrationen anmelden.](../../../assets/blog/password-flow-timeline-de.png)

## Enterprise-Organisationen trifft es stärker

Eine kleine Org hat eine Handvoll Integrationen, und der Admin kennt sie. Eine Enterprise-Org ist über Jahre gewachsen. Typische Quellen für Passwort-Logins sind:

- **ERP- und Auftragsschnittstellen**, die vor Jahren von einem Partner gebaut wurden, der heute nicht mehr dabei ist. Betreiben Sie einen B2B-Shop mit SAP, gehören dessen Datenflüsse ebenfalls auf die Liste, siehe [B2B Commerce und SAP: Welche Daten fließen wohin?](../b2b-commerce-sap-datenfluesse/).
- **Middleware und Integrationsplattformen**, in deren Konfiguration das Passwort eines technischen Benutzers hinterlegt ist.
- **Data Loader und geplante Skripte**, die auf irgendeinem Server laufen.
- **Backup-, Archiv- und Reporting-Tools**, die jede Nacht Daten abziehen.
- **Managed Packages und Konnektoren** von Herstellern, die selbst entscheiden, welchen Flow sie nutzen.

Das gemeinsame Problem: Niemand hat eine vollständige Liste. Integrationen wurden von verschiedenen Partnern gebaut, an verschiedenen Orten dokumentiert und laufen oft mit einem technischen Benutzer, den sich mehrere Systeme teilen. Wird der Flow abgeschaltet, scheitert die Token-Anfrage mit einer klaren Fehlermeldung, aber oft schaut niemand hin. Ein nächtlicher Job aktualisiert keine Datensätze mehr, ein Bericht zeigt die Zahlen von gestern, und jemand merkt es Tage später, wenn Vertrieb oder Service mit veralteten Daten arbeiten.

Deshalb sehe ich das vor allem als Governance-Aufgabe und weniger als technische. Die technische Umstellung pro Integration ist beherrschbar. Das Risiko liegt in dem, was niemand kennt.

## Wie finden Sie jede betroffene Integration?

Beginnen Sie die Bestandsaufnahme jetzt und nicht im Januar. Diese Quellen ergänzen sich:

1. **Login History.** Legen Sie eine Ansicht mit dem Filter Login-Subtyp „OAuth Username-Password“ an. Oder Sie nutzen die Abfrage aus dem [Salesforce-Knowledge-Artikel](https://help.salesforce.com/s/articleView?id=005461279&language=en_US&type=1): `SELECT Application FROM LoginHistory WHERE LoginSubType = 'OAuth Username-Password'`. Beides zeigt, welche Benutzer und Connected Apps den Flow noch nutzen. Ein Treffer belegt Nutzung, kein Treffer belegt nichts. Beachten Sie, dass die Login History nur etwa sechs Monate abdeckt. Eine Integration, die quartalsweise läuft, taucht womöglich nicht auf.
2. **Middleware und Code.** Durchsuchen Sie Integrationskonfigurationen, Skripte und Repositories nach `grant_type=password`, „Password Grant“ oder „ROPC“. Hier zahlt sich ein Git-Repository mit allem Integrationscode aus.
3. **Hersteller.** Fragen Sie jeden Anbieter eines Managed Packages, Konnektors oder SaaS-Tools mit Salesforce-Anbindung schriftlich, welchen OAuth-Flow er nutzt und wann er umstellt.
4. **Sandbox-Test.** Schalten Sie in einer Full- oder Partial-Copy-Sandbox die Einstellung „Allow OAuth Username-Password Flows“ ab und lassen Sie die Integrationen laufen. Der Test zählt nur, wenn externe Systeme, App-Konfiguration, Benutzer und geplante Jobs wirklich auf diese Sandbox zeigen. Was dort scheitert, würde im Februar in der Produktion scheitern.
5. **SOAP-Logins.** Prüfen Sie, welche Integrationsuser sich per SOAP anmelden und welche API-Versionen sie nutzen, damit Sie die Schritte im Dezember und mit Summer '27 nicht überraschen.

Das Ergebnis sollte eine einzige Liste sein: Integration, Zweck, Verantwortlicher auf Kundenseite, technischer Benutzer, Flow, API-Version, Hersteller oder Partner, Umstellungstermin. Diese Liste lohnt sich auch nach der Umstellung, als Teil der [Architekturdokumentation](../../leistungen/salesforce-schnittstellen/).

## Welcher Flow ersetzt den Passwort-Login?

Salesforce bietet mehrere OAuth-Flows an. Für die meisten Enterprise-Integrationen läuft die Wahl auf drei hinaus:

- **Client Credentials Flow.** Der Ersatz, den Salesforce für Server-zu-Server-Integrationen wie Middleware, ETL und Backup-Tools empfiehlt. Die Integration meldet sich mit Client-ID und Secret an und handelt als festgelegter Run-As-Benutzer. Kein interaktiver Login, kein Benutzerpasswort. Die Token-Anfrage geht an die My-Domain-URL, nicht an login.salesforce.com.
- **JWT Bearer Flow.** Für Integrationen, bei denen ein Zertifikat einem geteilten Secret vorgezogen wird, etwa kritische ERP-Anbindungen. Die Integration signiert ein Token mit ihrem privaten Schlüssel, Salesforce prüft es mit dem hinterlegten Zertifikat. CI/CD-Pipelines, die nach Salesforce deployen, nutzen in der Regel ebenfalls diesen Flow.
- **Web Server Flow mit PKCE.** Für Anwendungen, in denen sich echte Benutzer anmelden und in eigenem Namen handeln.

Salesforce empfiehlt für neue Integrationen External Client Apps statt klassischer Connected Apps. Eine bestehende Connected App muss wegen dieser Änderung nicht ersetzt werden; ändern muss sich der Flow. Integrationen eines Herstellers oder Managed Package stellen erst mit dessen eigenem Release um.

```hinweis achtung
Eine Connected App einfach in eine External Client App umzuziehen, löst das Problem nicht, weil External Client Apps den Username-Password Flow gar nicht unterstützen. Das externe System selbst muss die Art ändern, wie es Tokens anfordert.
```

Salesforce Time hat eine gute [Schritt-für-Schritt-Übersicht](https://salesforcetime.com/2026/10/15/salesforce-oauth-username-password-flow-retirement/) zur Umstellung.

## Was ist mit MFA?

Die Abschaltung ist unabhängig von den MFA-Vorgaben von Salesforce, die für Anmeldungen über die Oberfläche gelten; Admins und Benutzer mit erweiterten Rechten brauchen phishing-resistente Verfahren wie Sicherheitsschlüssel. MFA und die OAuth-Abschaltung zeigen in dieselbe Richtung: keine geteilten Passwörter mehr. Integrationsuser sollten sich nie interaktiv anmelden, und echte Benutzer sollten nie Accounts mit Integrationen teilen.

## Der Kunde verantwortet die Umstellung

Integrationen verbinden die Systeme des Kunden, und die Zugangsdaten gehören in seinen Tresor und nicht in die Konfiguration eines Partners. In der Praxis heißt das:

- **Ein benannter Verantwortlicher pro Integration** auf Kundenseite, auch wenn ein Partner die technische Arbeit macht.
- **Ein eigener Integrationsuser pro System oder Vertrauensgrenze**, nur mit den Rechten, die er braucht. Getrennte Benutzer lohnen sich, wo Verantwortliche, Rechte, Kritikalität oder Secret-Rotation verschieden sind. Geteilte technische Benutzer machen es unmöglich zu erkennen, welches System was tut.
- **Secrets und Zertifikate im Tresor des Kunden**, erneuert beim Partnerwechsel. Das grundsätzliche Prinzip erkläre ich in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/).
- **Änderungen über den normalen Release-Prozess**, mit der Konfiguration der neuen Connected App oder External Client App im Repository und Deployment über die Pipeline.

## Erster Schritt: Bestandsaufnahme bis Ende November 2026

Salesforce setzt die OAuth-Änderung am 20. Februar 2027 durch. Die Bestandsaufnahme sollte vor Dezember fertig sein, damit Dezember und Januar für Hersteller-Updates, Umstellung und Tests bleiben. Eine realistische Reihenfolge:

```schritte
Bestandsaufnahme | bis Ende November 2026
  Liste fertig, Verantwortliche benannt, Hersteller angefragt.
SOAP-Berechtigung | bis 30. November 2026
  Alle Benutzer finden, die sich noch über SOAP login() anmelden, und wo nötig Use Any API Auth zuweisen, bevor die Pflicht am 1. Dezember greift.
Umstellen | Dezember bis Januar
  Integrationen auf Client Credentials oder JWT Bearer umstellen, die kritischsten zuerst. In einer Sandbox mit abgeschaltetem Passwort-Flow testen.
Selbst abschalten | Anfang Februar 2027
  Den Passwort-Flow in der Produktion selbst abschalten, einige Tage vor Salesforce, mit dem Team in Bereitschaft.
SOAP login() ablösen | vor dem Summer-'27-Upgrade
  Die Anmeldung von SOAP login() auf OAuth umstellen. Eine höhere API-Version hilft nicht, weil es login() ab Version 65.0 nicht mehr gibt. Getrennt davon Daten-API-Aufrufe in den Versionen 31.0 bis 40.0 vor Summer '28 anheben.
```
