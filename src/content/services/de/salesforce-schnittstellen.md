---
title: "Salesforce-Integration mit ERP, Middleware und Telefonie"
description: "Salesforce angebunden an SAP und andere ERP-Systeme, Middleware und Telefonie wie Genesys oder Microsoft Teams, mit einer Integrationsarchitektur beim Kunden."
lang: de
slug: salesforce-schnittstellen
translationKey: service-integration
contactBrief: integration
order: 4
lead: "Salesforce ist nie das einzige System. Aufträge, Preise, Bestände und Rechnungen liegen im ERP, und der Service läuft über Telefon und E-Mail. Ich entwerfe die Integrationsarchitektur auf Kundenseite und arbeite mit ausgewählten Partnern, die Schnittstellen in großen internationalen Programmen gebaut haben."
situations:
  - "Salesforce braucht Daten aus SAP oder einem anderen ERP, etwa Kunden, Produkte, Preise, Aufträge oder Rechnungen, und es ist unklar, welches System für welche Daten führt."
  - "Punkt-zu-Punkt-Schnittstellen sind über Jahre gewachsen, und jede Änderung in einem System bricht etwas in einem anderen."
  - "Das Contact Center nutzt eine Telefonieplattform ohne Anbindung an die Service Cloud, und Agenten kopieren Daten zwischen Bildschirmen."
  - "Schnittstellen melden sich noch mit Benutzername und Passwort an, und niemand hat den Umstieg auf moderne Authentifizierung geplant."
deliverables:
  - "Ich nehme auf, welche Systeme es gibt, welche Daten sie halten und wo bestehende Schnittstellen Probleme machen."
  - "Ich entscheide mit Ihnen, ob eine Middleware nötig ist oder eine direkte Anbindung reicht."
  - "Ich hole einen spezialisierten Integrationspartner dazu, wenn Sie keinen haben, und prüfe sein Design, bevor gebaut wird."
  - "In der Umsetzung prüfe ich Fehlerbehandlung, Monitoring und End-to-End-Tests gegen die echten Prozesse."
results:
  - "Eine Systemlandkarte mit dem führenden System für jede Art von Daten"
  - "Schnittstellenspezifikationen, nach denen Umsetzungspartner bauen können"
  - "Ein Konzept für die Telefonie-Anbindung an die Service Cloud, zum Beispiel mit Genesys, Mirage oder Microsoft Teams"
  - "Integrationsbenutzer mit minimalen Rechten und moderner Authentifizierung"
phases:
  - title: "Systemlandkarte"
    icon: "analyse"
    text: "Ich halte fest, welche Systeme es gibt, welche Daten sie halten, welche Schnittstellen schon laufen und wo sie Probleme machen."
  - title: "Integrationsarchitektur"
    icon: "integration"
    text: "Wir legen das führende System pro Objekt fest, die Integrationsmuster und ob eine Middleware nötig ist. Der Ansatz hängt von der Größe des Unternehmens und der Zahl der Systeme ab."
  - title: "Spezifikation und Partner"
    icon: "contract"
    text: "Ich schreibe die Schnittstellenspezifikationen und hole einen passenden Integrationspartner dazu, falls der Kunde keinen hat. Das Design prüfe ich, bevor gebaut wird."
  - title: "Umsetzung und Test"
    icon: "check"
    text: "In der Umsetzung prüfe ich, ob Schnittstellen der Architektur folgen, ob Fehlerbehandlung und Monitoring existieren und ob End-to-End-Tests die echten Prozesse abdecken."
faq:
  - q: "Mit welchen Systemen wird Salesforce bei Herstellern meist verbunden?"
    a: "Fast immer mit einem ERP, sehr oft SAP, manchmal mit anderen Systemen wie proALPHA. Dazu kommen Telefonie und E-Mail für den Service, Produkt- und Preisdaten, Dokumentenerstellung und oft eine Datenplattform. Salesforce ist nie das einzige System."
  - q: "Brauchen wir eine Middleware für die Salesforce-Integration?"
    a: "Das hängt von der Größe des Unternehmens und der Zahl der Systeme ab. Bei wenigen stabilen Schnittstellen kann eine direkte Anbindung reichen. Bei vielen Systemen, mehreren Teams und häufigen Änderungen macht eine Middleware Schnittstellen leichter änderbar, überwachbar und wiederverwendbar."
  - q: "Wie wird Telefonie an die Service Cloud angebunden?"
    a: "Über eine CTI-Integration, die Anrufe in die Service Cloud bringt, sodass Agenten beim Klingeln den Kunden und die offenen Fälle sehen. Ich habe mit den CTI-Anbietern Genesys und Mirage gearbeitet, und Microsoft Teams wird als Telefonieplattform wichtiger. Telefon und E-Mail bleiben in den meisten Serviceorganisationen die Kernkanäle."
blogTags: [integration, oauth, security, sicherheit, service cloud]
---

Salesforce-Integration heißt, Salesforce mit den Systemen zu verbinden, die das Unternehmen schon betreibt, damit Daten einmal erfasst werden und Prozesse über Systemgrenzen hinweg funktionieren. Bei Herstellern ist das fast immer ein ERP, sehr oft SAP, manchmal Systeme wie proALPHA. Im Service gehören auch Telefonie und E-Mail dazu, weil sie noch immer die Kernkanäle sind. Ich entwerfe die Integrationsarchitektur auf Kundenseite und entscheide mit dem Kunden, welcher Partner sie baut.

## Welches System führt für welche Daten?

Die meisten Integrationsprobleme beginnen mit einer unklaren Antwort auf diese Frage. Können sowohl Salesforce als auch das ERP eine Kundenadresse oder einen Preis ändern, sind sich die beiden Systeme früher oder später uneinig. Der erste Schritt ist deshalb eine Systemlandkarte mit einem führenden System für jede Art von Daten. Eine typische Aufteilung sieht so aus:

```tabelle
titel: Systemlandkarte: welches System bei welchen Daten führt
spalten: | Salesforce | ERP
Kunden und Kontakte | Interessenten und Kontakte * | Kunden mit Aufträgen und Rechnungen *
Produkte und Preise | Liest, was der Vertrieb braucht | Meist das führende System *
Aufträge und Rechnungen | Sichtbar für Vertrieb und Service | Hier angelegt oder bestätigt *
Fälle und Servicehistorie | Fälle und Servicehistorie * | Aufträge und installierte Produkte als Verweis
marke: führt
fazit: Ändern darf jeweils nur das führende System, das andere liest oder verweist.
```
Die Details unterscheiden sich in jedem Unternehmen. Deshalb gehört diese Landkarte zur [Salesforce-Architektur](../salesforce-architektur/) und wird nicht der einzelnen Schnittstelle überlassen.

## Braucht es eine Middleware?

Der Ansatz hängt von der Größe des Unternehmens und der Zahl der Systeme ab. Bei wenigen stabilen Schnittstellen kann eine direkte Anbindung die einfachste Lösung sein. Bei vielen Systemen, mehreren Teams und häufigen Änderungen lohnt sich eine Middleware wie MuleSoft oder eine andere Integrationsplattform.

```pro-contra
pro: Was eine Middleware bringt
- Schnittstellen werden wiederverwendbar.
- Fehler sind an einer Stelle sichtbar.
- Schnittstellen lassen sich leichter ändern und überwachen.
contra: Wann sie sich nicht lohnt
- Es gibt nur wenige Systeme.
- Die Schnittstellen sind stabil und ändern sich selten.
```

Für die Umsetzung arbeite ich mit ausgewählten Partnern, die Integrationserfahrung aus großen internationalen Programmen haben. So bekommt der Kunde einen Partner, der zur Größe der Aufgabe passt, während Architektur und Spezifikationen auf Kundenseite bleiben.

## Beim Klingeln sieht der Agent den Kunden in der Service Cloud

In den meisten Serviceorganisationen sind Telefon und E-Mail noch die wichtigsten Kanäle. Eine CTI-Integration bringt Anrufe in die Service Cloud, sodass Agenten beim Klingeln den Kunden, die installierten Produkte und die offenen Fälle sehen.

```ablauf
ext: Anruf, Telefonieplattform
sf: Service Cloud, Kunde, Installierte Produkte, Offene Fälle
Anruf --> Telefonieplattform
Telefonieplattform --CTI-Integration--> Service Cloud
Service Cloud --> Kunde
Service Cloud --> Installierte Produkte
Service Cloud --> Offene Fälle
```

Ich habe mit den CTI-Anbietern Genesys und Mirage gearbeitet, und Microsoft Teams wird als Telefonieplattform wichtiger, weil viele Unternehmen es intern schon nutzen.

## Integrationsbenutzer brauchen weniger Rechte und eine neue Anmeldung

Jede Schnittstelle hat einen technischen Benutzer, und diese Benutzer haben oft mehr Rechte als nötig. Auch die Authentifizierung ändert sich: Schnittstellen, die sich mit Benutzername und Passwort anmelden, müssen auf moderne Verfahren umsteigen, wie in [Salesforce-Passwort-Integrationen enden 2027](../../blog/salesforce-passwort-integrationen-2027/) beschrieben. Integrationsbenutzer, ihre Rechte und ihre Authentifizierung prüfe ich als Teil der Architektur. Die Termine für die Anmeldung von Integrationen:

```zeitleiste
2026-12-01 | SOAP login() braucht die Berechtigung Use Any API Auth
2027-02-20 | OAuth Username-Password Flow für Connected Apps endet
Summer '27 | SOAP login() in den API-Versionen 31.0 bis 64.0 entfällt
Summer '28 | SOAP-, REST- und Bulk-API in den Versionen 31.0 bis 40.0 fallen aus
```
