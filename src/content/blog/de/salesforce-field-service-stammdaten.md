---
title: "Field Service: Welche Daten braucht die Planung?"
description: "Salesforce Field Service plant nur so gut wie seine Stammdaten. Welche Daten die Planung braucht, woher sie kommen und wer sie im Außendienst pflegt."
pubDate: 2026-10-26
lang: de
slug: salesforce-field-service-stammdaten
translationKey: field-service-master-data
topic: field-service
categories: [field-service]
series: { id: field-service, part: 2 }
tags: [Field Service, Außendienst, Datenmodell, Stammdaten, Fertigung]
takeaways:
  - "Salesforce Field Service braucht vor dem ersten Einsatz sechs Arten von Stammdaten: Servicegebiete mit Arbeitszeiten, Techniker mit Qualifikationen, Arbeitstypen, Anlagen, Öffnungszeiten der Kunden und Abwesenheiten."
  - "Die Planungsengine prüft nur, was in diesen Daten steht. Ein Techniker ohne hinterlegte Qualifikation ist für Einsätze mit Qualifikationsanforderung kein Kandidat, ein falsch hinterlegter wird falsch eingeplant."
  - "Öffnungszeiten der Kunden zählen bei der Planung nur, wenn die Work Rule für Besuchszeiten in der Scheduling Policy aktiv ist. Ohne sie plant Field Service auch Termine, zu denen niemand beim Kunden öffnet."
  - "Für jede Art von Stammdaten sollte vor dem Start feststehen, aus welchem System sie kommt und wer sie pflegt. Die meisten Daten liegen schon im ERP, bei der Personalabteilung oder bei den Disponenten."
  - "Ein guter Startpunkt sind die Fehleinsätze der letzten Monate: Jeder Fehleinsatz zeigt, welche Daten gefehlt haben."
faq:
  - q: "Welche Stammdaten braucht Salesforce Field Service?"
    a: "Mindestens Servicegebiete mit Arbeitszeiten, Techniker als Service Resources mit ihren Qualifikationen, Arbeitstypen mit Dauer und benötigten Qualifikationen, die Anlagen beim Kunden, die Öffnungszeiten der Kunden und die Abwesenheiten der Techniker."
  - q: "Wie viele Techniker gehören in ein Servicegebiet?"
    a: "Salesforce empfiehlt bis zu 50 Service Resources pro Servicegebiet. Größere Gebiete mit vielen Technikern und Disponenten machen Optimierung und Disposition schwerer."
  - q: "Wie bildet Field Service die Qualifikationen von Technikern ab?"
    a: "Qualifikationen sind Skills, die einem Techniker mit einem Level von 0 bis 99,99 zugeordnet werden. Arbeitstypen und Arbeitsaufträge tragen die benötigten Skills. Die Work Rule Match Skills sorgt dafür, dass nur passende Techniker eingeplant werden."
  - q: "Woher kommen die Daten für Field Service?"
    a: "Anlagen kommen meist aus dem ERP, Qualifikationen und Abwesenheiten aus Personal- und Schulungssystemen, Servicegebiete und Arbeitstypen aus der Serviceleitung. Wichtig ist, für jede Datenart ein führendes System und einen Verantwortlichen festzulegen."
draft: false
---

Salesforce Field Service plant nur so gut wie die Stammdaten, die es kennt. Bevor die Planungsengine den ersten Einsatz vergibt, braucht sie sechs Arten von Daten: Servicegebiete mit Arbeitszeiten, Techniker mit ihren Qualifikationen, Arbeitstypen mit Dauer und Anforderungen, die Anlagen beim Kunden, die Öffnungszeiten der Kunden und die Abwesenheiten der Techniker. Fehlt eines davon oder ist es veraltet, schickt die Engine den falschen Techniker oder schickt ihn zur falschen Zeit. Die meisten dieser Daten gibt es im Unternehmen schon, verteilt auf ERP, Personalabteilung und die Köpfe der Disponenten.

Ob sich Field Service für Ihren Außendienst überhaupt lohnt, beschreibe ich im ersten Teil dieser Serie: [Salesforce Field Service: Wann lohnt es sich?](../salesforce-field-service-lohnt-sich/). Hier geht es um die Frage danach: Was muss stehen, bevor die Planung startet?

## Warum scheitern Einsätze an fehlenden Daten?

In Serviceprojekten habe ich immer wieder dasselbe Muster gesehen. Techniker waren vor Ort und konnten ihren Job nicht ausführen. Mal waren die Ersatzteile nicht da. Mal war die Maschine nicht zugänglich. Mal stand der falsche Techniker vor der Anlage, oder der richtige war nicht arbeitsfähig. Teils lag es am Kunden, teils an der Planung der Techniker.

Jeder dieser Fehleinsätze kostet eine Anfahrt, einen Technikertag und meist einen zweiten Termin. Und fast jeder lässt sich auf eine Information zurückführen, die bei der Planung gefehlt hat:

- **Ersatzteile nicht da:** Niemand wusste, welche Anlage genau beim Kunden steht und welches Teil dafür gebraucht wird.
- **Maschine nicht zugänglich:** Die Zeiten, zu denen der Kunde Zugang gewährt, waren nirgends hinterlegt.
- **Falscher Techniker:** Die Qualifikationen der Techniker waren nicht oder nicht aktuell gepflegt.
- **Techniker nicht arbeitsfähig:** Abwesenheiten oder Einschränkungen waren der Planung nicht bekannt.

Eine Planungssoftware ändert daran zunächst nichts. Sie macht die Lücken nur schneller sichtbar, weil sie Entscheidungen automatisch trifft, die vorher ein erfahrener Disponent aus dem Gedächtnis getroffen hat.

## Welche Daten braucht Salesforce Field Service?

Salesforce beschreibt die Objekte im [Core Data Model von Field Service](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm). Für die Planung zählen vor allem diese sechs Bereiche. Die englischen Objektnamen stehen in Klammern, weil sie in jedem Projekt so auftauchen.

### Servicegebiete und Arbeitszeiten

Ein Servicegebiet (Service Territory) ist der Bereich, in dem Arbeit geplant wird, meist geografisch. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_basics/field_service_basics_enable) sind Servicegebiete und Arbeitszeiten (Operating Hours) die Grundlage: ohne sie hat die Planungsengine keine Grenzen, in denen sie arbeiten kann.

Techniker werden Mitglied in Gebieten (Service Territory Member). Laut den [Richtlinien für Servicegebiete](https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5) hat jeder Techniker genau ein primäres Gebiet, dazu optional sekundäre Gebiete als Aushilfe und Relocation-Gebiete für befristete Einsätze an anderen Orten. Salesforce empfiehlt bis zu 50 Techniker pro Gebiet. Am Mitglied lässt sich auch die Startadresse hinterlegen, etwa die Wohnadresse, wenn ein Techniker morgens von zu Hause losfährt. Fehlt sie, rechnet die Engine die Fahrzeit vom falschen Ort.

### Techniker und Qualifikationen

Jeder Techniker ist eine Service Resource. Seine Qualifikationen sind Skills, die ihm mit einem Level zugeordnet werden. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=fs_required_skills.htm&language=en_US&type=5) liegt das Level zwischen 0 und 99,99, und was ein Level bedeutet, legt das Unternehmen selbst fest. Sinnvoll ist eine Skala, die Ihre Serviceleitung schon kennt, etwa Schulungsstufen des Herstellers.

Wichtig ist der Unterschied zwischen Hinterlegen und Durchsetzen. Erst die Work Rule [Match Skills](https://help.salesforce.com/s/articleView?id=pfs_optimization_theory_work_rules_match_skills.htm&language=en_US&type=5) sorgt dafür, dass nur Techniker mit passenden Skills eingeplant werden. Ein Techniker ganz ohne Skills ist dann für keinen Einsatz mit Skill-Anforderung mehr Kandidat. Das ist gewollt, zeigt aber auch, wie hart eine Lücke in den Daten durchschlägt.

### Arbeitstypen

Ein Arbeitstyp (Work Type) ist die Vorlage für eine Art von Einsatz, etwa Jahreswartung, Störungsbehebung oder Inbetriebnahme. Er legt die geschätzte Dauer und die benötigten Skills fest. Arbeitsaufträge erben die Skills ihres Arbeitstyps. Wer zehn sauber gepflegte Arbeitstypen hat, muss nicht bei jedem Auftrag von Hand eintragen, wer ihn übernehmen darf.

### Anlagen und Standorte

Anlagen (Assets) sind die Maschinen beim Kunden. Arbeitsaufträge lassen sich mit einer Anlage verknüpfen, und Anlagen lassen sich als Hierarchie abbilden, also eine Maschine mit ihren Baugruppen. Damit sieht der Techniker die Historie der Anlage, und der Innendienst sieht, welches Teil zu welcher Maschine passt.

Standorte (Locations) sind Orte wie Lager, Fahrzeuge oder Kundenstandorte. Ein Servicefahrzeug ist ein mobiler Standort mit eigenem Bestand. Wie Teile, Lager und ERP zusammenspielen, ist ein eigenes Thema und bekommt einen eigenen Teil in dieser Serie.

### Öffnungszeiten der Kunden

Kunden haben eigene Zeiten, zu denen ein Techniker an die Maschine kommt. In Field Service hinterlegen Sie sie als Arbeitszeiten am Account. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=sf.pfs_optimization_theory_work_rules_visiting_hours.htm&type=5) übernimmt jeder neue Arbeitsauftrag sie als Besuchszeiten (Visiting Hours). Die Planung beachtet sie aber nur, wenn die Work Rule für Besuchszeiten in der Scheduling Policy aktiv ist. Ein Disponent kann sie übersteuern, sieht dann aber einen Regelverstoß.

Öffnungszeiten lösen nicht jeden Zugangsfall. Wenn eine Maschine für die Wartung abgeschaltet werden muss, braucht es eine Abstimmung mit dem Kunden. Wie man das in der Planung abbildet, gehört in den nächsten Teil der Serie.

### Abwesenheiten

Abwesenheiten (Resource Absences) blockieren Zeit im Kalender eines Technikers. Salesforce kennt die Typen Urlaub, Besprechung, Schulung und Krankheit. Bei der Optimierung werden Techniker laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_create_absences.htm&type=5) nicht für Termine eingeplant, die mit ihren Abwesenheiten kollidieren. Das funktioniert nur, wenn Urlaub und Schulungen auch in Salesforce ankommen und nicht nur in der Zeiterfassung stehen.

## Woher kommen die Daten, und wer pflegt sie?

Kaum eine dieser Datenarten entsteht in Field Service. Deshalb lege ich vor dem Start für jede Art ein führendes System und einen Verantwortlichen fest. Als Ausgangspunkt schlage ich diese Aufteilung vor und passe sie an das Unternehmen an:

| Daten | Führendes System | Verantwortlich |
|---|---|---|
| Servicegebiete und Arbeitszeiten | Salesforce | Serviceleitung |
| Techniker und Qualifikationen | Personal- oder Schulungssystem | Personalabteilung mit Serviceleitung |
| Arbeitstypen | Salesforce | Serviceleitung |
| Anlagen beim Kunden | ERP | Auftragsabwicklung oder Inbetriebnahme |
| Öffnungszeiten der Kunden | Salesforce | Innendienst |
| Abwesenheiten | Zeiterfassung | Personalabteilung |

Daraus folgen die Schnittstellen. Anlagen und Qualifikationen von Hand in Salesforce zu pflegen, geht für einen Piloten, aber nicht für den Betrieb. Wie man die Führung zwischen ERP und Salesforce klärt, beschreibe ich auf der Seite [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Qualifikationen und Abwesenheiten sind Daten über Mitarbeitende. Klären Sie früh mit Datenschutz und, wo vorhanden, mit dem Betriebsrat, welche davon in Salesforce landen dürfen. Das gilt auch für die neuen Funktionen der App, die ich in [Field Service Mobile im Außendienst](../salesforce-field-service-mobile-aussendienst/) beschreibe.

## Wo sollten Sie anfangen?

Nehmen Sie die Fehleinsätze der letzten drei Monate in einer Region. Ordnen Sie jeden einer Ursache zu: Teile, Zugang, Qualifikation, Verfügbarkeit oder etwas anderes. Die Ursache mit den meisten Fehleinsätzen zeigt, welche Daten Sie zuerst sauber brauchen. Gibt es keine Liste der Fehleinsätze, ist auch das ein Ergebnis, denn dann fehlt die Messgröße, an der sich Field Service später messen lassen muss.

Danach prüfen Sie für jede der sechs Datenarten: Gibt es sie, wo liegt sie, wer pflegt sie? Erst wenn diese Fragen beantwortet sind, lohnt es sich, die Planung selbst einzurichten. Darum geht es im nächsten Teil der Serie.

Wenn Sie vor dieser Bestandsaufnahme stehen und einen unabhängigen Blick auf Ihre Daten möchten, [schreiben Sie mir](#contact).
