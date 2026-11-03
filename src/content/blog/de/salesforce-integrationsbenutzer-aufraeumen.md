---
title: "Salesforce Integration User: Rechte aufräumen"
description: "Technische Benutzer mit Adminrechten sind ein Risiko. So stellen Sie Integrationen auf die Salesforce Integration User Lizenz und schmale Permission Sets um."
pubDate: 2026-11-03
lang: de
slug: salesforce-integrationsbenutzer-aufraeumen
translationKey: salesforce-integration-users-cleanup
topic: data
categories: [architecture]
contactBrief: integration
tags: [Salesforce Integration User, technische Benutzer, Berechtigungen, Schnittstellen, Sicherheit, Permission Sets]
takeaways:
  - "Viele ERP- und Middleware-Schnittstellen melden sich mit einem Benutzer an, der das Profil System Administrator hat. Gebraucht wird das selten."
  - "Enterprise, Unlimited und Performance Edition enthalten laut Salesforce fünf Integration-User-Lizenzen ohne Aufpreis, beschränkt auf API-Zugriff."
  - "Die Lizenz allein macht einen Benutzer nicht schmal. Welche Objekte und Felder er sieht, legen Permission Sets fest."
  - "Pro Integration ein eigener Benutzer mit Verantwortlichem, Login-IP-Bereichen und nur den Rechten, die ein Monat Betrieb bestätigt hat."
faq:
  - q: "Was ist der Salesforce Integration User?"
    a: "Ein Benutzer mit der Lizenz Salesforce Integration und dem Profil Minimum Access - API Only Integrations. Er kann sich nur über die API anmelden, nicht über die Oberfläche. Seine Objektrechte erhält er über Permission Sets."
  - q: "Wie viele Integration-User-Lizenzen sind kostenlos?"
    a: "Laut Salesforce erhalten Enterprise, Unlimited und Performance Edition automatisch fünf Salesforce-Integration-Lizenzen ohne Aufpreis, die Developer Edition eine. Weitere Lizenzen gibt es über den Account Executive."
  - q: "Braucht eine Schnittstelle Adminrechte?"
    a: "Fast nie. Salesforce empfiehlt, mit minimalen Rechten zu testen und nur bei Bedarf zu ergänzen. Anbieter verlangen den Administrator oft für die Einrichtung, die Schnittstelle selbst braucht ihn selten."
  - q: "Darf eine Integration den Benutzer einer anderen mitnutzen?"
    a: "Besser nicht. Ein geteilter Benutzer bekommt die Summe aller Rechte, und im Protokoll lässt sich nicht mehr erkennen, welche Schnittstelle eine Änderung gemacht hat. Salesforce empfiehlt einen Benutzer pro Integration."
draft: false
---

Technische Benutzer für Schnittstellen haben in vielen Salesforce-Orgs mehr Rechte als jeder Mensch im Unternehmen: Profil System Administrator, Ändern aller Daten, oft ein Passwort ohne Ablaufdatum. Wer das aufräumen will, stellt jede Integration auf einen eigenen Salesforce Integration User mit API-Zugriff und schmalen Permission Sets um. Dieser Artikel zeigt, was die Lizenz leistet, wie Sie die Bestandsaufnahme machen und wie die Umstellung ohne Ausfall gelingt.

## Warum haben Integrationsbenutzer zu viele Rechte?

Die meisten Integrationsbenutzer entstehen unter Zeitdruck. Ein Anbieter oder Partner braucht für die Einrichtung einen Zugang, und der schnellste Weg ist ein Benutzer mit dem Profil System Administrator. Die Schnittstelle läuft, und niemand fasst den Benutzer danach wieder an.

Drei Muster sind bei Herstellern häufig:

- **Admin für alles.** Die ERP-Schnittstelle für Kunden und Aufträge hat dieselben Rechte wie der Administrator, obwohl sie fünf Objekte schreibt.
- **Ein Benutzer für mehrere Systeme.** ERP, Marketing-Tool und Middleware melden sich mit demselben Benutzer an. Er bekommt die Summe aller Rechte, und im Protokoll ist nicht mehr zu erkennen, welche Schnittstelle eine Änderung gemacht hat.
- **Passwort und Sicherheitstoken.** Die Anmeldung läuft noch mit Benutzername und Passwort. Diese Anmeldung endet 2027, wie in [Salesforce-Passwort-Integrationen enden 2027](../salesforce-passwort-integrationen-2027/) beschrieben.

Das Risiko liegt auf der Hand. Gelangen die Zugangsdaten nach außen, etwa bei einem Anbieter, hat der Angreifer die Rechte des Administrators. Wie schnell das geht, zeigt der Vorfall, den ich in [Connected Apps und KI-Tools: Lehren aus Salesloft Drift](../connected-apps-oauth-ki-integrationen/) beschreibe.

## Die Integration-User-Lizenz beschränkt den Benutzer auf die API

Salesforce bietet für technische Benutzer eine eigene Lizenz. Laut [Admin-Blog von Salesforce](https://admin.salesforce.com/blog/2023/best-practices-for-configuring-your-integration-user) erhalten Enterprise, Unlimited und Performance Edition automatisch fünf Salesforce-Integration-Lizenzen ohne Aufpreis, die Developer Edition eine. Weitere gibt es über den Account Executive.

Das spart nebenbei Geld. Ein Integrationsbenutzer mit voller Sales- oder Service-Cloud-Lizenz belegt eine Lizenz, die sonst ein Mensch nutzen könnte. Bei mehr als fünf Schnittstellen fragen Sie weitere Integration-Lizenzen an. Einen Benutzer für mehrere Schnittstellen zu nutzen, spart zwar eine Lizenz, kostet aber die Trennung der Rechte und die Nachvollziehbarkeit im Protokoll. Welche Lizenzen Nutzer wirklich brauchen, beschreibe ich in [Salesforce-Lizenzen: braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

Mit der Lizenz kommt das Profil Minimum Access - API Only Integrations. Laut [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2024/02/invoke-rest-apis-with-the-salesforce-integration-user-and-oauth-client-credentials) schaltet es den API-Zugriff ein und beschränkt den Benutzer zugleich auf die API. Beides lässt sich nicht ändern. Eine Anmeldung über die Oberfläche ist damit ausgeschlossen.

```hinweis achtung
Die Lizenz macht den Benutzer nicht automatisch schmal. Die zugehörige Permission Set License Salesforce API Integration erlaubt laut Salesforce dieselben Benutzer- und Objektrechte wie das Profil System Administrator. Was der Benutzer tatsächlich darf, entscheiden Ihre Permission Sets.
```

Salesforce empfiehlt deshalb, das Profil selbst leer zu halten. Es steuert nur Standardwerte, Login-Zeiten und IP-Bereiche. Alle Objekt- und Feldrechte kommen über Permission Sets, gebündelt in einer Permission Set Group pro Integration. Das passt zu dem Aufbau, den ich in [Berechtigungskonzept mit Permission Sets](../salesforce-berechtigungskonzept-permission-sets/) für menschliche Benutzer beschreibe.

## Die Bestandsaufnahme beginnt bei den Benutzern

Gehen Sie für die Bestandsaufnahme alle aktiven Benutzer durch, die keiner Person gehören. Für jeden halten Sie fest:

| Prüfpunkt | Wo Sie es sehen | Warnsignal |
|---|---|---|
| Profil | Benutzerdetails | System Administrator oder ein kopiertes Adminprofil |
| Systemrechte | Profil und zugewiesene Permission Sets | Alle Daten ändern, Alle Daten anzeigen |
| Anmeldeart | Login-Verlauf des Benutzers | Anmeldung mit Benutzername und Passwort |
| Nutzer | Login-Verlauf, Connected Apps OAuth Usage | mehrere Anwendungen mit demselben Benutzer |
| IP-Bereiche | Profil | keine Login-IP-Bereiche hinterlegt |
| Verantwortung | nirgends dokumentiert | niemand kann sagen, wofür der Benutzer da ist |

Am Ende steht eine Liste mit einer Zeile pro Benutzer: welche Schnittstelle ihn nutzt, wer auf Kundenseite verantwortlich ist und welche Objekte die Schnittstelle liest oder schreibt. Für die ERP-Schnittstelle ergibt sich das meist aus den Datenflüssen, wie in [Manufacturing Cloud und SAP: Datenflüsse](../manufacturing-cloud-sap-integration-datenfluesse/) beschrieben.

Benutzer, für die sich niemand findet, sind die heikelsten. Prüfen Sie im Login-Verlauf, ob und von wo sie sich zuletzt angemeldet haben, bevor Sie sie sperren.

## Die Rechte folgen aus dem, was die Schnittstelle tut

Für jede Schnittstelle bauen Sie ein Permission Set aus der Liste der Objekte und Felder, die sie wirklich braucht. Lesen und Schreiben trennen Sie dabei sauber: Eine Schnittstelle, die Aufträge aus Salesforce ins ERP holt, braucht Leserechte auf Aufträge und Schreibrechte nur auf das Statusfeld.

Laut Admin-Blog braucht eine Schnittstelle das Profil System Administrator meist nicht, auch wenn der Anbieter danach fragt. Salesforce empfiehlt, mit minimalen Rechten zu testen und nur bei Bedarf zu ergänzen. Danach beobachten Sie die Integration einen Monat lang, um sicherzugehen, dass sie alle nötigen Rechte hat.

Zwei Einstellungen kommen dazu. Login-IP-Bereiche im Profil begrenzen die Anmeldung auf die Adressen, die der Anbieter veröffentlicht oder auf Nachfrage nennt. Und die Anmeldung läuft künftig über OAuth, etwa den Client Credentials Flow mit einem Run-As-User, statt über Passwort und Sicherheitstoken.

## Wie stellen Sie ohne Ausfall um?

Eine Schnittstelle im laufenden Betrieb umzustellen, ist der heikle Teil. Sicherer ist ein paralleler Weg:

1. **Neuen Benutzer anlegen.** Mit Integration-Lizenz, leerem Profil, Permission Set Group und IP-Bereichen.
2. **In der Sandbox testen.** Mit denselben Datenflüssen wie in Produktion, inklusive Fehlerfällen.
3. **Umstellen in einem Wartungsfenster.** Die Schnittstelle bekommt die neuen Zugangsdaten, der alte Benutzer bleibt aktiv, aber ungenutzt.
4. **Beobachten.** Fehlerprotokolle der Middleware und Login-Verlauf einen Monat lang prüfen.
5. **Alten Benutzer deaktivieren.** Erst wenn keine Anmeldung mehr kommt.

Den alten Benutzer erst am Ende zu deaktivieren, gibt Ihnen einen Rückweg, falls ein Recht fehlt. Planen Sie die Umstellung außerdem nicht in die Wochen eines Salesforce-Releases, damit Fehler eindeutig zuzuordnen sind. Wie ich Schnittstellen mit Kunden plane, steht unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Die drei Integrationsbenutzer mit den meisten Rechten zuerst umstellen

Ziehen Sie aus der Bestandsaufnahme die drei Integrationsbenutzer mit Adminprofil oder dem Recht, alle Daten zu ändern, und benennen Sie für jeden einen Verantwortlichen auf Kundenseite. Fordern Sie beim jeweiligen Anbieter schriftlich die Liste der Objekte an, die seine Schnittstelle liest und schreibt, und die IP-Adressen, von denen sie sich anmeldet. Damit bauen Sie das erste Permission Set und testen es in der Sandbox.
