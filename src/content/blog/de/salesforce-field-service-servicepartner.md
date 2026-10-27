---
title: "Field Service: Wie bindet man Servicepartner ein?"
description: "Externe Servicepartner und Subunternehmer in Salesforce Field Service einbinden: gleiche Arbeitsweise wie intern, passende Modelle, Lizenzen und Grenzen."
pubDate: 2026-10-27
lang: de
slug: salesforce-field-service-servicepartner
translationKey: field-service-service-partners
topic: field-service
category: field-service
series: { id: field-service, part: 6 }
tags: [Field Service, Außendienst, Servicepartner, Subunternehmer, Experience Cloud, Fertigung]
takeaways:
  - "Externe Servicepartner gehören in die eigenen Prozesse. Ziel ist, dass Disponent und Techniker gleich arbeiten, egal ob ein interner oder externer Techniker den Einsatz übernimmt."
  - "Field Service kennt zwei Modelle: Jeder Partnertechniker ist eine eigene Service Resource, oder nur der Partner ist eine Ressource mit Kapazität. Für eine gleiche Arbeitsweise passt das erste besser."
  - "Partnertechniker arbeiten mit derselben mobilen App wie interne. Dafür brauchen sie eine Community-Lizenz und die Permission Set Licenses für Field Service Scheduling und Mobile."
  - "Ein eigenes Servicegebiet pro Partnerfirma sorgt dafür, dass der Partner nur seine eigenen Leute und Termine sieht."
  - "Bewusst unterschiedlich bleiben Datenzugriff und Abrechnung. Ein Partner sieht nur, was er für seinen Einsatz braucht."
faq:
  - q: "Wie bindet man Subunternehmer in Salesforce Field Service ein?"
    a: "Die Partnerfirma wird als Account mit Kontakten angelegt, die Techniker bekommen Community-Benutzer mit Field-Service-Berechtigungen und werden als Service Resources in ein eigenes Servicegebiet gesetzt. Dann plant die Engine sie wie interne Techniker ein."
  - q: "Welche Lizenz brauchen externe Techniker für Field Service?"
    a: "Sie brauchen eine Community-Lizenz, laut Salesforce Customer Community Plus oder Partner Community, plus die Permission Set Licenses für Field Service Scheduling und Mobile. Salesforce bietet dafür Contractor-Lizenzen pro Nutzer oder pro Login an."
  - q: "Was ist eine kapazitätsbasierte Ressource in Field Service?"
    a: "Eine Ressource, meist ein Partner, deren Arbeit pro Zeitraum begrenzt ist, etwa acht Stunden oder fünf Termine am Tag. Sie eignet sich, wenn der Partner seine Leute selbst einteilt, unterstützt aber einige Funktionen wie Abwesenheiten nicht."
  - q: "Dürfen interne Mitarbeitende Contractor-Lizenzen nutzen?"
    a: "Nein. Laut Salesforce sind Contractor-Lizenzen nur für externe Dienstleister gedacht, nicht für eigene Mitarbeitende."
draft: false
---

Externe Servicepartner und Subunternehmer gehören in Salesforce Field Service in die eigenen Prozesse. Das Ziel ist, dass die beiden Welten nicht auseinanderdriften: Disponent und Techniker arbeiten möglichst gleich, egal ob ein interner oder externer Techniker den Einsatz übernimmt. Technisch heißt das meist, jeden Partnertechniker als eigene Ressource einzuplanen, ihm dieselbe mobile App zu geben und den Partner über ein eigenes Servicegebiet abzugrenzen. In mehreren meiner Projekte war genau das das Ziel.

Dieser Artikel ist Teil 6 der Serie. Die Lizenzpreise für Subunternehmer stehen in [Teil 1](../salesforce-field-service-lohnt-sich/), wie die Planungsengine entscheidet, steht in [Teil 3](../salesforce-field-service-terminplanung-automatisieren/).

## Warum sollen interne und externe Techniker gleich arbeiten?

Viele Hersteller decken Spitzen, entfernte Regionen oder bestimmte Gewerke mit Partnern ab. Wird der Partner nebenher gesteuert, per E-Mail, Telefon und eigener Excel-Liste, entstehen zwei Welten. Der Disponent hat zwei Pläne. Der Kunde bekommt zwei Arten von Servicebericht. Ersatzteile und Arbeitszeit des Partners kommen erst mit der Rechnung an, und die Anlagenhistorie hat Lücken.

Wenn beide Welten gleich arbeiten, fällt das weg. Der Disponent sieht interne und externe Techniker im selben Plan, die Engine wählt nach denselben Regeln, und jeder Einsatz endet mit derselben Dokumentation an derselben Anlage. Auch der Partner hat etwas davon. Er bekommt Einsätze mit allen Informationen zur Anlage, statt bei jedem Auftrag nachzufragen, und er weiß früher, was in den nächsten Tagen auf ihn zukommt. Das macht ihn verlässlicher planbar, auch für seine eigenen Leute. Die Stammdaten aus [Teil 2](../salesforce-field-service-stammdaten/) gelten dann auch für Partner: Qualifikationen, Gebiete und Abwesenheiten.

## Welche Modelle bietet Field Service?

Laut [Salesforce-Hilfe](https://help.salesforce.com/apex/HTViewHelpDoc?id=fs_setting_up_contractors.htm) gibt es zwei Wege, einen Partner abzubilden:

| | Jeder Partnertechniker als Service Resource | Nur der Partner als kapazitätsbasierte Ressource |
|---|---|---|
| Planung | Engine plant jeden Techniker einzeln | Engine plant gegen eine Kapazität, der Partner teilt selbst ein |
| Mobile App | Jeder Techniker nutzt sie | Optional, oft nur der Partner-Manager |
| Qualifikationen | Je Techniker gepflegt | Nur für den Partner insgesamt |
| Aufwand | Höher, jeder Techniker braucht einen Benutzer | Niedriger |
| Gleiche Arbeitsweise wie intern | Ja | Nur teilweise |

Eine kapazitätsbasierte Ressource kann laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_define_resource_capacity.htm&type=5) eine bestimmte Menge Arbeit pro Zeitraum übernehmen, zum Beispiel acht Stunden oder fünf Termine am Tag. Sie unterstützt aber einiges nicht, etwa Abwesenheiten, die Optimierung einzelner Ressourcen oder komplexe Arbeit mit mehreren Terminen.

Für das Ziel einer gleichen Arbeitsweise passt das erste Modell besser. Das zweite ist sinnvoll für Partner, die nur gelegentlich einspringen und ihre Leute ohnehin selbst steuern.

## Was brauchen Partner technisch?

Die Schritte stehen in der [Salesforce-Hilfe für Contractor-Zugänge](https://help.salesforce.com/s/articleView?id=fs_contractor_access.htm&language=en_US&type=5). Kurz gefasst:

- **Account und Kontakte.** Die Partnerfirma ist ein Account, ihre Techniker und der Partner-Manager sind Kontakte.
- **Community-Lizenz.** Partner arbeiten als Benutzer einer Experience Cloud Site, mit Customer Community Plus oder Partner Community, je nachdem, was das Unternehmen gekauft hat.
- **Field-Service-Berechtigungen.** Die Permission Set Licenses Field Service Scheduling und Field Service Mobile, dazu ein eigenes Permission Set mit den nötigen Objektrechten.
- **Eigenes Profil und eigene Mobile-Einstellungen.** So lässt sich die App für Partner anders konfigurieren, ohne die interne Version zu ändern.
- **Ein Servicegebiet pro Partnerfirma.** Damit sieht der Partner-Manager nur seine eigenen Leute und Termine. Soll er selbst disponieren, lässt sich die Dispatch Console in die Experience Cloud Site einbauen.

Bei den Lizenzen gibt es zwei Varianten. Partner, die regelmäßig arbeiten, bekommen Lizenzen pro Nutzer. Für saisonale oder seltene Einsätze gibt es Lizenzen pro Login, laut Salesforce bis zu 20 Benutzer je gekauftem Login. Contractor-Lizenzen sind nur für externe Dienstleister, nicht für eigene Mitarbeitende. Wie man Lizenzen über alle Rollen hinweg sinnvoll verteilt, beschreibe ich in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Wie sieht ein Partnereinsatz von Anfang bis Ende aus?

Einmal durchgespielt, im ersten Modell: Bei einem Kunden in einer Region ohne eigene Techniker fällt eine Anlage aus. Der Arbeitsauftrag entsteht wie jeder andere, mit Arbeitstyp, benötigten Qualifikationen und Teilen. Die Engine findet im Servicegebiet des Partners einen Techniker mit passender Qualifikation und schlägt ihn vor. Der Disponent prüft den Vorschlag wie in Teil 3 und gibt ihn frei. Der Partnertechniker sieht den Termin in seiner App, mit Anlage, Historie und Checkliste. Vor Ort erfasst er Arbeitszeit, verbaute Teile und Messwerte und lässt den Kunden unterschreiben. Der Servicebericht entsteht aus derselben Vorlage wie bei internen Technikern. Was der Standard dabei kann, beschreibe ich in [Service Documents: reicht der Document Builder?](../salesforce-service-documents-document-builder-servicebericht/).

Für den Kunden sieht der Einsatz damit genauso aus wie einer mit eigenem Techniker. Für den Innendienst liegt alles an derselben Anlage. Und die Partnerrechnung lässt sich gegen die Rückmeldung aus der App prüfen, statt gegen einen handschriftlichen Bericht.

## Was bleibt bewusst unterschiedlich?

Gleiche Arbeitsweise heißt nicht gleiche Rechte. Drei Dinge würde ich bewusst trennen:

- **Datenzugriff.** Ein Partnertechniker sieht seine Termine, die Anlage und die Historie, die er für den Einsatz braucht. Vertragsdetails, Preise und andere Kunden sieht er nicht. Das regelt das Sharing über Servicegebiet und Profil. Klären Sie außerdem mit dem Datenschutz, welche Kundendaten ein Partner sehen darf, und halten Sie das im Vertrag mit dem Partner fest.
- **Abrechnung.** Interne Einsätze laufen über Kostenstellen, Partnereinsätze über eine Rechnung. Die Rückmeldung aus der App, also Arbeitszeit und verbaute Teile aus [Teil 4](../salesforce-field-service-ersatzteile-erp/), ist die Grundlage, um diese Rechnung zu prüfen.
- **Qualifikationsnachweise.** Bei eigenen Technikern pflegt die Personalabteilung die Qualifikationen. Beim Partner muss festgelegt sein, wer sie meldet und wer sie prüft, bevor die Engine den Partner für einen Einsatz einplant.

## Wo sollten Sie anfangen?

Nehmen Sie Ihren wichtigsten Partner und schreiben Sie auf, wie ein Einsatz heute zu ihm kommt und wie die Rückmeldung zurückkommt. Jeder Schritt, der anders läuft als bei internen Technikern, ist ein Kandidat für die Angleichung. Starten Sie mit einem Partner und einem Servicegebiet, bevor Sie alle anbinden. Mischformen sind erlaubt: Ein großer Stammpartner arbeitet im ersten Modell, ein kleiner Partner für Spitzenzeiten im zweiten. Wichtig ist, dass die Entscheidung je Partner bewusst fällt und dokumentiert ist.

Im letzten Teil der Serie geht es um die Einführung selbst. Wenn Sie vorher prüfen möchten, wie Ihre Partner in Field Service passen, [schreiben Sie mir](#contact).
