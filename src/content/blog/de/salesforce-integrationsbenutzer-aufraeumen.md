---
title: "Salesforce Integration User: Adminrechte entziehen"
description: "Technische Benutzer mit Adminrechten sind ein Risiko. So stellen Sie Integrationen auf die Salesforce Integration User Lizenz und schmale Permission Sets um."
pubDate: 2026-11-06
lang: de
slug: salesforce-integrationsbenutzer-aufraeumen
translationKey: salesforce-integration-users-cleanup
topic: data
categories: [architecture]
contactBrief: integration
tags: [Salesforce Integration User, technische Benutzer, Berechtigungen, Schnittstellen, Sicherheit, Permission Sets]
takeaways:
  - "Integrationsbenutzer mit dem Profil Systemadministrator können jeden Datensatz ändern. Jede Anfrage nach Adminrechten ist eine Ausnahme mit Begründung."
  - "Laut Salesforce enthalten Enterprise, Unlimited und Performance Edition fünf Integration-User-Lizenzen ohne Aufpreis, beschränkt auf API-Zugriff."
  - "Die Lizenz begrenzt die Rechte eines Benutzers nicht automatisch. Permission Sets und Freigaben entscheiden, welche Daten die Integration erreicht."
  - "Manche Berechtigungsarten, etwa Apex-Klassenzugriff, fehlen in Permission Sets mit der Integrationslizenz. Prüfen Sie das vor der Umstellung."
  - "Umstellen mit getestetem Cutover, den alten Benutzer sofort einfrieren und Reaktivierung nur als dokumentierten Notfallschritt erlauben."
faq:
  - q: "Was ist der Salesforce Integration User?"
    a: "Ein Benutzer mit der Lizenz Salesforce Integration und dem Profil Minimum Access - API Only Integrations. Er kann sich nur über die API anmelden, nicht über die Oberfläche. Objekt- und Feldrechte bekommt er über Permission Sets."
  - q: "Wie viele Integration-User-Lizenzen sind kostenlos?"
    a: "Laut Salesforce erhalten Enterprise, Unlimited und Performance Edition automatisch fünf Salesforce-Integration-Lizenzen ohne Aufpreis. Weitere gibt es über den Account Executive."
  - q: "Braucht eine Schnittstelle Adminrechte?"
    a: "Meist nicht. Salesforce empfiehlt, mit minimalen Rechten zu testen und nur Nötiges zu ergänzen. Behandeln Sie die Forderung eines Anbieters nach dem Administratorprofil als Ausnahme: Der Anbieter muss sie begründen, und Sie testen, ob sie nötig ist."
  - q: "Darf eine Integration den Benutzer einer anderen mitnutzen?"
    a: "Besser nicht. Ein geteilter Benutzer bekommt die Summe aller Rechte, und die Felder Erstellt von und Zuletzt geändert von zeigen nicht mehr, welche Schnittstelle etwas geändert hat. Salesforce empfiehlt einen Benutzer je Integration."
draft: false
---

Technische Benutzer für Schnittstellen haben oft mehr Rechte als jeder Mensch im Unternehmen: das Profil Systemadministrator, „Alle Daten ändern“, eine Anmeldung per Passwort. Zum Aufräumen stellen Sie jede Integration, deren Bedarf zur Lizenz passt, auf einen eigenen Salesforce Integration User mit reinem API-Zugriff und Permission Sets nach dem Minimalprinzip um. Dieser Artikel zeigt, was die Lizenz leistet und wo sie endet, wie Sie Benutzer, Apps und Anmeldungen erfassen und wie die Umstellung ohne Ausfall gelingt, ohne dass der alte Adminbenutzer offen bleibt.

## Warum haben Integrationsbenutzer zu viele Rechte?

Das Risiko beginnt meist bei der Einrichtung: Ein Anbieter oder Partner braucht schnell Zugang, der schnellste Weg ist ein Benutzer mit Systemadministrator-Profil, und sobald die Schnittstelle läuft, fasst niemand den Benutzer mehr an. Bei einer Prüfung sollten Sie auf drei Muster achten:

```tabelle
titel: Drei Muster, auf die Sie bei der Prüfung achten
spalten: Muster | Wie es aussieht | Was es Sie kostet
Admin für alles | Die ERP-Schnittstelle für Kunden und Aufträge hat das Profil Systemadministrator | Sie kann jeden Datensatz ändern, obwohl sie eine Handvoll Objekte schreibt *
Ein Benutzer für mehrere Systeme | ERP, Marketingtool und Middleware melden sich mit demselben Benutzer an | Summe aller Rechte, die Felder Erstellt von und Zuletzt geändert von zeigen nicht mehr, welche Schnittstelle etwas geändert hat
Anmeldung per Passwort | Benutzername und Passwort, oft mit Sicherheitstoken | OAuth Username-Password und SOAP login() werden im Lauf von 2027 abgeschaltet
fazit: Jedes Muster allein reicht, um den Benutzer auf die Liste für die Umstellung zu setzen.
```

Welche Anmeldeverfahren wann enden, steht in [Salesforce-Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/). Das Risiko des ersten Musters liegt auf der Hand: Gelangen die Zugangsdaten nach außen, etwa bei einem Anbieter, hat der Angreifer die Rechte des Administrators. Wie schnell das gehen kann, zeigt der Vorfall, den ich in [Connected Apps und KI-Tools: Lehren aus Salesloft Drift](../connected-apps-oauth-ki-integrationen/) beschreibe.

## Die Integration-User-Lizenz beschränkt den Benutzer auf die API

Salesforce bietet eine eigene Lizenz für Integrationen zwischen Systemen. Laut [Salesforce Admin Blog](https://admin.salesforce.com/blog/2023/best-practices-for-configuring-your-integration-user) erhalten Enterprise, Unlimited und Performance Edition automatisch fünf Salesforce-Integration-Lizenzen ohne Aufpreis. Weitere gibt es über den Account Executive.

Das kann auch volle Lizenzen freimachen. Ein Integrationsbenutzer mit Sales- oder Service-Cloud-Lizenz belegt eine Lizenz, die ein Mensch nutzen könnte; die Umstellung kann also einen Zukauf vermeiden. Welche Lizenzen Benutzer wirklich brauchen, beschreibe ich in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/)

Zur Lizenz gehört das Profil Minimum Access - API Only Integrations. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=User-Permission-for-API-Integration-User&language=en_US&type=1) erlaubt dieses Profil den API-Zugriff und beschränkt den Benutzer zugleich darauf; der reine API-Zugriff lässt sich nicht abschalten. Eine Anmeldung über die Oberfläche ist damit ausgeschlossen.

```hinweis achtung
Die Lizenz begrenzt die Rechte des Benutzers nicht von selbst. Die zugehörige Permission Set License Salesforce API Integration stellt viele administrative Rechte zur Verfügung; was der Benutzer bekommt, entscheiden Ihre Permission Sets. Und manche Berechtigungsarten fehlen in Permission Sets mit dieser Lizenz, zum Beispiel Apex-Klassenzugriff, benutzerdefinierte Berechtigungen und Zugriff auf Named Credentials. Als Ausweichlösung nennt Salesforce ein zweites Permission Set ohne diese Lizenz. Prüfen Sie das für jede Integration vor der Umstellung.
```

Die Einzelheiten stehen im Salesforce-Artikel zu [fehlenden Berechtigungen mit der API-Integration-Lizenz](https://help.salesforce.com/s/articleView?id=001453686&language=en_US&type=1). Halten Sie das Profil auf minimalem Zugriff; es steuert Standardwerte, Anmeldezeiten und IP-Bereiche. Objekt- und Feldrechte kommen über ein eigenes Permission Set oder eine Permission Set Group, wenn mehrere wiederverwendbare Sets zusammenkommen. Der Zugriff auf Datensätze folgt weiter den Freigaben. OAuth-Scopes und Richtlinien der App sind eine eigene Ebene: Sie begrenzen, wie sich die Anwendung anmeldet und welche APIs sie nutzen darf, nicht welche Datensätze sie sieht. Das entspricht dem Aufbau, den ich für Menschen in [Berechtigungskonzept mit Permission Sets](../salesforce-berechtigungskonzept-permission-sets/) beschreibe.

## Benutzer, Apps und Anmeldeverfahren erfassen

Die Bestandsaufnahme umfasst mehr als Benutzerdatensätze. Gehen Sie alle aktiven Benutzer durch, die keinem Menschen gehören, und prüfen Sie auch Personen, deren Zugangsdaten eine Schnittstelle noch nutzt. Halten Sie je Eintrag fest:

```tabelle
titel: Bestandsaufnahme der Integrationsbenutzer
spalten: Prüfung | Wo Sie es sehen | Warnzeichen
Profil und Rechte | Benutzerdetails, zugewiesene Permission Sets | Systemadministrator, Alle Daten ändern, Alle Daten anzeigen *
Anmeldeverfahren | Anmeldeverlauf des Benutzers | Benutzername und Passwort, SOAP login() *
Aufrufende Anwendung | Anmeldeverlauf, External Client Apps und Connected Apps | Mehrere Anwendungen mit demselben Benutzer
IP-Bereiche | Profil | Keine Anmelde-IP-Bereiche, obwohl der Aufrufer feste Adressen hat
Zugangsdaten | Middleware, Secret Store | Secret oder privater Schlüssel in einer Konfigurationsdatei, keine Rotation
Zuständigkeit | Meist nirgends | Niemand weiß, wofür der Benutzer da ist
fazit: Eine Zeile je Integration, nicht je Benutzer: Ein geteilter Benutzer taucht dann mehrfach auf, und das ist bereits ein Befund.
```

Für die ERP-Schnittstelle ergeben sich die Objekte meist aus den Datenflüssen, wie in [Manufacturing Cloud und SAP: Datenflüsse](../manufacturing-cloud-sap-integration-datenfluesse/) beschrieben.

Am heikelsten sind Benutzer, für die sich niemand zuständig fühlt. Prüfen Sie vor dem Sperren den Anmeldeverlauf, die Jobpläne und die Konfiguration der Middleware, denn eine nur quartalsweise oder zum Jahresende laufende Schnittstelle hat sich womöglich seit Wochen nicht angemeldet. Bleibt die Abhängigkeit unklar, frieren Sie den Benutzer für einen festen Zeitraum ein, mit einem benannten Ansprechpartner für Eskalationen.

## Die Rechte folgen aus dem, was die Schnittstelle tut

Bauen Sie das Permission Set je Schnittstelle aus drei Quellen: den dokumentierten Datenflüssen, der Liste der Objekte und Felder vom Anbieter und dem, was die Schnittstelle in Sandbox-Tests tatsächlich tut. Trennen Sie Lesen und Schreiben: Eine Schnittstelle, die Aufträge aus Salesforce ins ERP holt, braucht Lesezugriff auf Aufträge und Schreibzugriff nur auf das Statusfeld.

Laut Admin Blog braucht eine Schnittstelle in der Regel kein Systemadministrator-Profil, auch wenn der Anbieter danach fragt. Salesforce empfiehlt, mit minimalen Rechten zu testen und nur Nötiges zu ergänzen. Testen Sie über einen vollständigen Geschäftszyklus: Monatsabschluss, geplante Jobs und Fehlerpfade brauchen oft Rechte, die eine normale Woche nicht zeigt.

Dazu kommen Anmeldung und Zugangsdaten. Neue Integrationen nutzen eine External Client App: Laut [OAuth-Dokumentation von Salesforce](https://developer.salesforce.com/docs/platform/api-rest/guide/intro-oauth-and-connected-apps.html) ist das Anlegen neuer Connected Apps seit Spring '26 eingeschränkt, bestehende laufen weiter. Für Integrationen ohne Oberfläche ersetzen der Client Credentials Flow mit Run-as-Benutzer oder der JWT Bearer Flow die Anmeldung per Passwort. Legen Sie Client Secrets und private JWT-Schlüssel in einen Secret Store, mit Verantwortlichem, Ablaufdatum, Rotationstermin und einem Weg, sie im Notfall zu widerrufen. Anmelde-IP-Bereiche im Profil helfen, wo die aufrufende Plattform feste ausgehende Adressen hat; bei Cloud-Middleware können die Bereiche groß sein oder sich ändern, also vereinbaren Sie, wer Änderungen meldet.

## Wie gelingt die Umstellung ohne Ausfall?

Die Umstellung im laufenden Betrieb ist der heikle Teil. Sicherer ist ein getesteter Cutover mit kurzem Rückweg:

```schritte
Vorbereiten | Sandbox · Integration
  Neuer Benutzer, Permission Sets, App, Secret. Mit echten Datenflüssen und Fehlerfällen testen.
Umstellen | Wartungsfenster · Integration
  Neue Zugangsdaten in der Middleware, alte entfernt.
Alten Benutzer einfrieren | am selben Tag · Admin
  Alten Benutzer einfrieren; Reaktivierung nur als dokumentierter Notfallschritt.
Beobachten | Geschäftszyklus · Betrieb
  Fehlerprotokolle plus übertragene Datensätze, Rückstau und Abgleich mit dem ERP.
Deaktivieren | nach dem Zyklus · Admin
  Alten Benutzer abschalten, Lizenz frei.
```

Wer den alten Benutzer am Tag der Umstellung einfriert, schließt den privilegierten Zugang. Fehlt ein Recht, ergänzen Sie es im neuen Permission Set; den alten Benutzer wieder zu aktivieren bleibt eine Ausnahme mit Frist. Prüfen Sie fachliche Zahlen, nicht nur technische Protokolle: Anzahl der angekommenen Aufträge, offene Fehler und den Abgleich zwischen beiden Systemen. Legen Sie die Umstellung nicht auf das Wochenende eines Salesforce-Release, dann lassen sich Fehler leichter zuordnen; die Termine stehen in [Salesforce-Release-Termine: Was die IT je Release prüft](../salesforce-release-notes-termine-pruefen/). Wie ich Schnittstellen mit Kunden plane, steht unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Die riskantesten Integrationsbenutzer zuerst umstellen

Nehmen Sie aus der Bestandsaufnahme jeden Integrationsbenutzer mit Adminprofil oder „Alle Daten ändern“, dazu die mit Anmeldung per Passwort, ungeschützten Zugangsdaten oder ohne Zuständigen, und benennen Sie für jeden einen Verantwortlichen auf Kundenseite. Fragen Sie jeden Anbieter schriftlich nach den Objekten, die seine Schnittstelle liest und schreibt, nach dem Anmeldeverfahren und nach den IP-Adressen, von denen sie aufruft. Prüfen Sie, ob die Integration eine Berechtigungsart braucht, die Permission Sets mit der Integrationslizenz nicht bieten, bauen Sie dann das erste Permission Set und testen Sie es in der Sandbox über einen vollständigen Geschäftszyklus.
