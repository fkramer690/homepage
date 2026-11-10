---
title: "Salesforce Field Service: Welche Daten braucht die Planung?"
description: "Sechs Datenbereiche entscheiden über die Planung in Salesforce Field Service: was technisch Pflicht ist, woher die Daten kommen und wer sie pflegt."
pubDate: 2026-10-26
lang: de
slug: salesforce-field-service-stammdaten
translationKey: field-service-master-data
topic: field-service
categories: [field-service]
series: { id: field-service, part: 2 }
tags: [Field Service, Außendienst, Datenmodell, Stammdaten, Fertigung]
takeaways:
  - "Sechs Datenbereiche entscheiden, wie gut geplant wird: Gebiete, Qualifikationen, Arbeitstypen, Anlagen, Öffnungszeiten und Abwesenheiten."
  - "Ein Techniker ohne hinterlegte Qualifikation ist für Einsätze, die sie verlangen, kein Kandidat. Wer falsch hinterlegt ist, wird falsch eingeplant."
  - "Öffnungszeiten der Kunden zählen nur, wenn die Work Rule für Besuchszeiten aktiv ist. Sonst bucht Field Service Termine, zu denen niemand öffnet."
  - "Für jede Datenart steht vor dem Start fest, welches System führt und wer sie pflegt. Das meiste liegt schon im ERP, im Personalwesen oder bei Disponenten."
  - "Die Fehleinsätze der letzten Monate zeigen, welche Daten zuerst in guter Qualität vorliegen müssen."
faq:
  - q: "Welche Stammdaten braucht Salesforce Field Service?"
    a: "Technisch braucht die Planung Servicegebiete mit Arbeitszeiten, Techniker als Service Resources, eine Scheduling Policy und Termine mit geokodierbarer Adresse, frühestem Start und Fälligkeit. Wie gut die Planung funktioniert, hängt dann von Qualifikationen, Arbeitstypen, Anlagen, Öffnungszeiten der Kunden und Abwesenheiten ab."
  - q: "Wie viele Techniker gehören in ein Servicegebiet?"
    a: "Salesforce empfiehlt bis zu 50 Service Resources pro Servicegebiet. Größere Gebiete mit vielen Technikern und Disponenten machen Optimierung und Disposition schwerer."
  - q: "Wie bildet Field Service die Qualifikationen von Technikern ab?"
    a: "Qualifikationen sind Skills, die einem Techniker mit einem Level von 0 bis 99,99 zugeordnet werden. Arbeitstypen und Arbeitsaufträge enthalten die benötigten Skills. Die Work Rule Match Skills sorgt dafür, dass nur passende Techniker eingeplant werden."
  - q: "Woher kommen die Daten für Field Service?"
    a: "Anlagen stammen meist aus dem ERP, Qualifikationen und Abwesenheiten aus Personal- und Schulungssystemen, Servicegebiete und Arbeitstypen aus der Serviceleitung. Wichtig ist, für jede Datenart ein führendes System und einen Verantwortlichen festzulegen."
draft: false
---

Salesforce Field Service plant mit den Daten, die es kennt, und mit keinen anderen. Sechs Datenbereiche entscheiden, wie gut der Plan wird: Servicegebiete mit Arbeitszeiten, Techniker mit ihren Qualifikationen, Arbeitstypen mit Dauer und Anforderungen, die Anlagen beim Kunden, die Öffnungszeiten der Kunden und die Abwesenheiten der Techniker. Technisch braucht die Engine zum Start weniger: Gebiete, Ressourcen, eine Scheduling Policy und Termine mit Adresse, frühestem Start und Fälligkeit. Fehlt aber einer der sechs Bereiche oder ist er veraltet, schickt die Engine den falschen Techniker oder schickt ihn zur falschen Zeit. Die meisten dieser Daten gibt es im Unternehmen schon, verteilt auf ERP, Personalabteilung und die Köpfe der Disponenten.

Ob sich Field Service für Ihren Außendienst überhaupt lohnt, beschreibe ich im ersten Teil dieser Serie: [Salesforce Field Service: Wann lohnt es sich?](../salesforce-field-service-lohnt-sich/). Hier geht es um die nächste Frage: Was muss vorhanden sein, bevor die Planung startet?

## Fehlende Daten führen zu Fehleinsätzen

```praxis
In Serviceprojekten habe ich immer wieder dasselbe Muster gesehen. Techniker waren vor Ort und konnten ihren Job nicht ausführen. Mal waren die Ersatzteile nicht da. Mal war die Maschine nicht zugänglich. Mal stand der falsche Techniker vor der Anlage, oder der richtige war nicht einsatzfähig. Teils lag es am Kunden, teils an der Einsatzplanung.
```

Jeder dieser Fehleinsätze kostet eine Anfahrt, einen Technikertag und meist einen zweiten Termin. Nicht jeder hat eine Datenursache. Hinter vielen steckt aber eine Information, die bei der Planung gefehlt hat. Mögliche Ursachen:

- **Ersatzteile nicht da:** Niemand wusste, welche Anlage genau beim Kunden steht und welches Teil dafür gebraucht wird, oder das Teil war nicht im Fahrzeug. Teile und Bestand behandle ich in einem eigenen Teil dieser Serie.
- **Maschine nicht zugänglich:** Die Zeiten, zu denen der Kunde Zugang gewährt, waren nirgends hinterlegt, oder der Termin wurde nie mit dem Kunden bestätigt.
- **Falscher Techniker:** Die Qualifikationen der Techniker waren nicht oder nicht aktuell gepflegt.
- **Techniker nicht einsatzfähig:** Abwesenheiten, fehlende Sicherheitsunterweisungen oder Arbeitserlaubnisse waren der Planung nicht bekannt. Kurzfristige Krankheit verhindern auch die besten Daten nicht.

Eine Planungssoftware ändert daran zunächst nichts. Sie macht die Lücken nur schneller sichtbar, weil sie Entscheidungen automatisch trifft, die vorher ein erfahrener Disponent aus dem Gedächtnis getroffen hat.

## Welche Daten braucht Salesforce Field Service?

Dabei sind zwei Arten von Daten zu trennen. Manche sind technisch Pflicht: Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.pfs_scheduling.htm&language=en_US&type=5) braucht jede Scheduling Policy die Work Rules für die Verfügbarkeit der Ressource sowie für den frühesten Start und die Fälligkeit (Earliest Start Permitted, Due Date), und Termine brauchen eine Adresse, die die Engine für Fahrzeiten geokodieren kann. Zusätzlich entscheiden sechs Datenbereiche, wie gut der Plan wird. Die Objekte dahinter beschreibt das [Core Data Model von Field Service](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm). Als Ausgangspunkt für führendes System und Verantwortung schlage ich diese Aufteilung vor; im Projekt wird sie an das Unternehmen angepasst:

| Datenbereich | Wofür die Planung ihn nutzt | Wenn er fehlt oder falsch ist | Führendes System | Verantwortlich |
|---|---|---|---|---|
| Servicegebiete (Service Territories) und Arbeitszeiten | Wo und wann geplant wird, Startadresse für die Fahrt | Fahrzeit vom falschen Ort, keine Grenzen für die Engine | Salesforce | Serviceleitung |
| Techniker (Service Resources) und Qualifikationen (Skills) | Wer einen Einsatz übernehmen darf | Falscher Techniker vor Ort | Personal- oder Schulungssystem | Personalabteilung mit Serviceleitung |
| Arbeitstypen (Work Types) | Dauer und benötigte Qualifikationen je Einsatzart | Qualifikationen an jedem Auftrag von Hand | Salesforce | Serviceleitung |
| Anlagen beim Kunden (Assets) | Welche Maschine, welche Historie, welches Teil | Lückenhafte Historie, höheres Risiko für das falsche Teil | ERP | Auftragsabwicklung oder Inbetriebnahme |
| Öffnungszeiten der Kunden (Visiting Hours) | Wann die Maschine erreichbar ist | Termin, zu dem niemand öffnet | Salesforce | Innendienst |
| Abwesenheiten (Resource Absences) | Wann ein Techniker nicht verfügbar ist | Einsätze für Techniker im Urlaub oder in der Schulung | Zeiterfassung | Personalabteilung |

Vier Details aus der Salesforce-Hilfe entscheiden, ob das in der Praxis trägt:

- **Servicegebiete.** Laut den [Richtlinien für Servicegebiete](https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5) hat jeder Techniker genau ein primäres Gebiet und optional sekundäre, und Salesforce empfiehlt bis zu 50 Techniker pro Gebiet.
- **Qualifikationen.** Das Level liegt laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=fs_required_skills.htm&language=en_US&type=5) zwischen 0 und 99,99, und was es bedeutet, legt das Unternehmen fest. Durchgesetzt werden sie erst über die Work Rule [Match Skills](https://help.salesforce.com/s/articleView?id=pfs_optimization_theory_work_rules_match_skills.htm&language=en_US&type=5); ein Techniker ohne Skills ist dann für keinen Einsatz mit Skill-Anforderung mehr Kandidat.
- **Öffnungszeiten.** Sie werden als Arbeitszeiten am Account gepflegt und laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=sf.pfs_optimization_theory_work_rules_visiting_hours.htm&type=5) in jeden neuen Arbeitsauftrag übernommen. Sie zählen nur, wenn die Work Rule für Besuchszeiten aktiv ist.
- **Abwesenheiten.** Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_create_absences.htm&type=5) plant die Optimierung Techniker nicht für Termine ein, die mit ihren Abwesenheiten kollidieren, aber nur, wenn Urlaub und Schulungen tatsächlich in Salesforce ankommen.

Wie aus einem Case ein Arbeitsauftrag mit dem passenden Arbeitstyp wird, steht in [vom Case zum Techniker](../field-service-case-zu-arbeitsauftrag/). Teile und Fahrzeugbestand behandle ich in [einem eigenen Teil](../salesforce-field-service-ersatzteile-erp/) dieser Serie.

## Was müssen Sie entscheiden, bevor die Planung startet?

Die Tabelle oben ist ein Vorschlag. Die Entscheidungen dahinter gehören Serviceleitung und IT gemeinsam, und niemand sonst wird sie treffen:

- **Ein Verantwortlicher je Datenbereich.** Jemand muss geradestehen, wenn Qualifikationen veraltet sind oder eine Anlage fehlt. Ohne Namen in der Tabelle wird Datenqualität nach dem Start niemandes Aufgabe.
- **Schnittstelle oder Handpflege.** Anlagen und Qualifikationen von Hand in Salesforce zu pflegen, geht für einen Piloten, aber nicht für den Betrieb. Jede Schnittstelle kostet Aufbau und Betrieb, jede Handliste kostet Zeit und verursacht Fehler. Entscheiden Sie je Bereich nach Menge und Änderungshäufigkeit. Wie man klärt, welches System führt, beschreibe ich auf der Seite [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).
- **Welche Ursache für Fehleinsätze Sie zuerst angehen.** Nicht alle sechs Bereiche können am ersten Tag sauber sein. Die Fehleinsätze Ihrer eigenen Region zeigen, wo das Geld verloren geht.
- **Daten über Mitarbeitende.** Qualifikationen und Abwesenheiten sind Daten über Mitarbeitende. Klären Sie früh mit den Datenschutzverantwortlichen und, wo vorhanden, mit dem Betriebsrat, welche davon in Salesforce gespeichert werden dürfen. Das gilt auch für die Funktionen der App in [Field Service Mobile im Außendienst](../salesforce-field-service-mobile-aussendienst/).

Drei Warnzeichen, dass die Datenarchitektur nicht trägt: Disponenten führen eine private Liste, wer was kann, Qualifikationen werden erst nach einem Fehleinsatz nachgepflegt, und niemand kann sagen, welches System recht hat, wenn Salesforce und ERP bei einer Anlage abweichen.

## Die Fehleinsätze der letzten drei Monate auswerten

Nehmen Sie die Fehleinsätze der letzten drei Monate in einer Region. Ordnen Sie jeden einer Ursache zu: Teile, Zugang, Qualifikation, Verfügbarkeit oder etwas anderes. Die Ursache mit den meisten Fehleinsätzen zeigt, welche Daten zuerst in guter Qualität vorliegen müssen. Gibt es keine Liste der Fehleinsätze, ist auch das ein Ergebnis, denn dann fehlt die Messgröße, an der sich Field Service später messen lassen muss.

Danach prüfen Sie für jeden der sechs Datenbereiche: Gibt es die Daten, wo liegen sie, wer pflegt sie? Erst wenn diese Fragen beantwortet sind, lohnt es sich, die Planung selbst einzurichten. Darum geht es im nächsten Teil der Serie.
