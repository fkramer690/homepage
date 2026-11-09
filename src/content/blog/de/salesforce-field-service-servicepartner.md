---
title: "Salesforce Field Service: Servicepartner einbinden"
description: "Externe Servicepartner und Subunternehmer in Salesforce Field Service einbinden: gleiche Arbeitsweise wie intern, passende Modelle, Lizenzen und Grenzen."
pubDate: 2026-10-27
lang: de
slug: salesforce-field-service-servicepartner
translationKey: field-service-service-partners
topic: field-service
categories: [field-service]
series: { id: field-service, part: 6 }
tags: [Field Service, Außendienst, Servicepartner, Subunternehmer, Experience Cloud, Fertigung]
takeaways:
  - "Disponent und Techniker sollen gleich arbeiten, egal ob ein interner oder ein externer Techniker den Einsatz übernimmt."
  - "Entweder ist jeder Partnertechniker eine eigene Service Resource, oder der Partner ist eine Kapazitätsressource. Für gleiche Arbeit passt das erste besser."
  - "Partnertechniker nutzen dieselbe App. Sie brauchen eine Experience-Cloud-Lizenz und Field-Service-Permission-Set-Licenses; Contractor Plus bündelt das."
  - "Ein Gebiet pro Partner trennt Daten nur zusammen mit privaten Freigabeeinstellungen und einer Prüfung, welche übergeordneten Datensätze mitgehen."
  - "Bewusst unterschiedlich bleiben Datenzugriff und Abrechnung. Ein Partner sieht nur, was er für seinen Einsatz braucht."
faq:
  - q: "Wie bindet man Subunternehmer in Salesforce Field Service ein?"
    a: "Die Partnerfirma wird als Account mit Kontakten angelegt, die Techniker bekommen Experience-Cloud-Benutzer mit Field-Service-Berechtigungen und werden als Service Resources Mitglied der Gebiete, in denen sie arbeiten. Dann plant die Engine sie wie interne Techniker ein. Den Datenzugriff regelt das Sharing-Modell gesondert."
  - q: "Welche Lizenz brauchen externe Techniker für Field Service?"
    a: "Technisch brauchen sie eine Experience-Cloud-Lizenz (Customer Community Plus oder Partner Community), die Permission Set Licenses Field Service Scheduling und, für die App, Field Service Mobile sowie ein Permission Set mit den Objektrechten. Kaufmännisch verkauft Salesforce Contractor-Pakete pro Nutzer oder pro Login; laut Salesforce enthält Contractor Plus Partner-Community-Lizenzen."
  - q: "Was ist eine kapazitätsbasierte Ressource in Field Service?"
    a: "Eine Ressource, meist ein Partner, deren Arbeit pro Zeitraum begrenzt ist, etwa acht Stunden oder fünf Termine am Tag. Sie eignet sich, wenn der Partner seine Leute selbst einteilt, unterstützt aber einige Funktionen wie Abwesenheiten nicht."
  - q: "Dürfen interne Mitarbeitende Contractor-Lizenzen nutzen?"
    a: "Nein. Laut Salesforce sind Contractor-Lizenzen nur für externe Dienstleister gedacht, nicht für eigene Mitarbeitende."
draft: false
---

Externe Servicepartner und Subunternehmer gehören in Salesforce Field Service in die eigenen Prozesse. Das Ziel ist, dass die beiden Welten nicht auseinanderdriften: Disponent und Techniker arbeiten möglichst gleich, egal ob ein interner oder externer Techniker den Einsatz übernimmt. Technisch heißt das meist, jeden Partnertechniker als eigene Ressource einzuplanen, ihm dieselbe mobile App zu geben und den Datenzugriff für Partner als eigenes Architekturthema zu entwerfen. In mehreren meiner Projekte war genau das das Ziel.

Dieser Artikel ist Teil 6 der Serie. Die Lizenzpreise für Subunternehmer stehen in [Teil 1](../salesforce-field-service-lohnt-sich/), wie die Planungsengine entscheidet, steht in [Teil 3](../salesforce-field-service-terminplanung-automatisieren/).

## Interne und externe Techniker arbeiten gleich

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

Eine kapazitätsbasierte Ressource kann laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=service.fs_define_resource_capacity.htm&type=5) eine bestimmte Menge Arbeit pro Zeitraum übernehmen, zum Beispiel acht Stunden oder fünf Termine am Tag. Sie unterstützt aber nicht alles. Die Liste unterscheidet sich leicht zwischen der klassischen Engine und Enhanced Scheduling and Optimization; für Letztere nennt Salesforce unter anderem Abwesenheiten, die Optimierung einzelner Ressourcen und komplexe Arbeit als nicht unterstützt.

Für das Ziel einer gleichen Arbeitsweise passt das erste Modell besser. Das zweite ist sinnvoll für Partner, die nur gelegentlich einspringen und ihre Leute ohnehin selbst steuern.

## Was brauchen Partner technisch?

Die Schritte stehen in der [Salesforce-Hilfe für Contractor-Zugänge](https://help.salesforce.com/s/articleView?id=fs_contractor_access.htm&language=en_US&type=5). Kurz gefasst: Die Partnerfirma ist ein Account, ihre Leute sind Kontakte mit Benutzern einer Experience Cloud Site (Customer Community Plus oder Partner Community), dazu kommen die Permission Set Licenses Field Service Scheduling und Field Service Mobile und ein Permission Set mit den Objektrechten. Ein eigenes Profil und eigene Mobile-Einstellungen erlauben, die App für Partner zu konfigurieren, ohne die interne Version zu ändern. Partnertechniker werden Mitglied der Gebiete, in denen sie arbeiten. Soll der Partner-Manager selbst disponieren, lässt sich laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=service.fs_scheduling_console_parent.htm&language=en_US&type=5) die [Scheduling Console](../field-service-scheduling-console-disponenten/), die ab Summer '26 die Classic Dispatch Console ablöst, in die Experience Cloud Site einbauen.

Kaufmännisch verkauft Salesforce Contractor-Pakete pro Nutzer für regelmäßige Partner und Login-basierte Pakete für saisonale Einsätze. Laut [Salesforce](https://help.salesforce.com/s/articleView?id=005036403&language=en_US&type=1) enthält Contractor Plus Partner-Community-Lizenzen, nicht Customer Community Plus. Wie man Lizenzen über alle Rollen verteilt, beschreibe ich in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/) und in [Salesforce Field Service Lizenzen: Wer braucht welche?](../field-service-lizenzen-rollen-dispatcher-techniker/).

```hinweis achtung
Contractor-Lizenzen sind nur für externe Dienstleister, nicht für eigene Mitarbeitende.
```

## Wie sieht ein Partnereinsatz von Anfang bis Ende aus?

Einmal zur Veranschaulichung durchgespielt, im ersten Modell: Bei einem Kunden in einer Region ohne eigene Techniker fällt eine Anlage aus. Der Arbeitsauftrag entsteht wie jeder andere, mit Arbeitstyp, benötigten Qualifikationen und Teilen. Die Engine findet einen Partnertechniker mit passender Qualifikation, der Mitglied dieses Gebiets ist, und schlägt ihn vor. Der Disponent prüft den Vorschlag wie in Teil 3 und gibt ihn frei. Der Partnertechniker sieht den Termin in seiner App, mit Anlage, Historie und Checkliste. Vor Ort erfasst er Arbeitszeit, verbaute Teile und Messwerte und lässt den Kunden unterschreiben. Der Servicebericht entsteht aus derselben Vorlage wie bei internen Technikern. Was der Standard dabei kann, beschreibe ich in [Service Documents: reicht der Document Builder?](../salesforce-service-documents-document-builder-servicebericht/).

Für den Kunden sieht der Einsatz damit genauso aus wie einer mit eigenem Techniker. Für den Innendienst liegt alles an derselben Anlage. Und die Partnerrechnung lässt sich gegen die Rückmeldung aus der App prüfen, statt gegen einen handschriftlichen Bericht.

## Datenzugriff, Abrechnung und Nachweise bleiben getrennt

Gleiche Arbeitsweise heißt nicht gleiche Rechte. Drei Dinge würde ich bewusst trennen:

- **Datenzugriff.** Ein Partnertechniker sieht seine Termine, die Anlage und die Historie, die er für den Einsatz braucht. Vertragsdetails, Preise und andere Kunden sieht er nicht. Ein Servicegebiet oder ein Profil allein leistet das nicht. Das Profil steuert Objekt- und Feldrechte, nicht, welche Datensätze jemand sieht. Für die Trennung braucht es private organisationsweite Standards und ein bewusst gesetztes externes Sharing-Modell, dazu die Freigabeeinstellungen von Field Service. Laut [Salesforce](https://help.salesforce.com/s/articleView?id=002470705&language=en_US&type=1) kann das Teilen eines Termins mit einem Gebiet auch übergeordnete Datensätze wie Accounts, Anlagen und Arbeitsaufträge mitteilen; welche, lässt sich einstellen. Testen Sie das vor dem Start mit einem Partnerbenutzer. Klären Sie außerdem mit dem Datenschutz, welche Kundendaten ein Partner sehen darf, und halten Sie das im Vertrag mit dem Partner fest.
- **Abrechnung.** Interne Einsätze laufen über Kostenstellen, Partnereinsätze über eine Rechnung. Die Rückmeldung aus der App, also Arbeitszeit und verbaute Teile aus [Teil 4](../salesforce-field-service-ersatzteile-erp/), ist die Grundlage, um diese Rechnung zu prüfen.
- **Qualifikationsnachweise.** Bei eigenen Technikern pflegt die Personalabteilung die Qualifikationen. Beim Partner muss festgelegt sein, wer sie meldet und wer sie prüft, bevor die Engine den Partner für einen Einsatz einplant.

## Was müssen Sie entscheiden?

Partneranbindung ist kein IT-Projekt. Diese Entscheidungen gehören Serviceleitung, Einkauf und Datenschutz:

- **Welches Modell für welchen Partner.** Entscheidend ist, wer die einzelnen Techniker plant und ob ihre Qualifikationen, Verfügbarkeit und Rückmeldungen je Person in Salesforce liegen sollen. Wenn ja, passt das erste Modell, auch für einen selten eingesetzten Spezialisten. Plant der Partner seine Leute selbst, reicht das zweite. Entscheiden Sie je Partner und halten Sie fest, warum.
- **Wie der Datenschutz geregelt ist.** Der Partner sieht Kundendaten. Verantwortlichkeiten, Vertragsgrundlage, welche Daten wofür und Aufbewahrungsfristen müssen mit dem Datenschutz geklärt sein, bevor der erste Benutzer angelegt wird, nicht erst nach der ersten Kundenfrage.
- **Wie die Partnerrechnung geprüft wird.** Sind Arbeitszeit und Teile aus der App die Grundlage, muss das im Partnervertrag stehen.
- **Was passiert, wenn ein Partner geht.** Anlagenhistorie, Serviceberichte und Messwerte bleiben in Ihrer Org, weil der Partner in Ihrem System gearbeitet hat. Deaktivieren Sie die Benutzer, behalten Sie die Serviceunterlagen und legen Sie mit dem Datenschutz fest, was mit den personenbezogenen Daten der Partnerleute passiert: aufbewahren, löschen oder anonymisieren. Dass die Servicehistorie bleibt, spricht stark für das erste Modell.

Drei Warnzeichen, dass das Partnermodell nicht trägt: Der Disponent führt einen eigenen Plan für Partner, Partnereinsätze haben keinen Servicebericht an der Anlage, und die Partnerrechnung lässt sich nur gegen handschriftliche Berichte prüfen.

## Erster Schritt: aufschreiben, wie ein Einsatz zum wichtigsten Partner kommt

Nehmen Sie Ihren wichtigsten Partner und schreiben Sie auf, wie ein Einsatz heute zu ihm kommt und wie die Rückmeldung zurückkommt. Jeder Schritt, der anders läuft als bei internen Technikern, ist ein Kandidat für die Angleichung. Starten Sie mit einem Partner und einem Servicegebiet, bevor Sie alle anbinden. Mischformen sind erlaubt: Ein großer Stammpartner arbeitet im ersten Modell, ein kleiner Partner für Spitzenzeiten im zweiten. Wichtig ist, dass die Entscheidung je Partner bewusst fällt und dokumentiert ist. Wie die Einführung danach in Wellen läuft, zeigt der [letzte Teil der Serie](../salesforce-field-service-einfuehrung/).
