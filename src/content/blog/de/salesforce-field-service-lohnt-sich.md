---
title: "Salesforce Field Service: Wann lohnt es sich?"
metaTitle: "Lohnt sich Salesforce Field Service? Kriterien und Kosten"
description: "Die Planung in Salesforce Field Service lohnt sich vor allem bei vielen kurzen Einsätzen. Kriterien, Lizenzkosten und Alternativen für den Außendienst."
pubDate: 2026-10-26
lang: de
slug: salesforce-field-service-lohnt-sich
translationKey: field-service-worth-it
topic: field-service
categories: [field-service]
series: { id: field-service, part: 1 }
tags: [Field Service, Außendienst, Lizenzen, Make-or-buy, Fertigung]
takeaways:
  - "Termin- und Routenoptimierung bringen am meisten, wenn Techniker viele kurze Einsätze am Tag fahren: mehr Einsätze, weniger Fahrzeit."
  - "Bei wenigen langen Einsätzen bringt die Routenplanung wenig. Dann müssen mobile Arbeit, Dokumentation, Verträge oder Partner den Business Case tragen."
  - "Dispatcher und Technician kosten je 175 € pro Nutzer und Monat (Enterprise Edition). 40 Techniker und 4 Disponenten kosten 92.400 € im Jahr."
  - "Technician- und Dispatcher-Lizenzen dürfen nicht für Fallbearbeitung im Contact Center genutzt werden. Wer beides tut, braucht Field Service Plus für 230 €."
  - "Ein erster Datencheck nutzt vier Zahlen: Einsätze pro Tag, Fahrzeitanteil, Fehlzuordnungen bei Qualifikationen und Teilen und Erstlösungsquote."
faq:
  - q: "Was ist Salesforce Field Service?"
    a: "Salesforce Field Service ist das Produkt für den Außendienst auf Basis der Service Cloud. Es plant Einsätze nach Qualifikation, Verfügbarkeit und Fahrzeit, schickt sie an eine mobile App für Techniker, die auch offline funktioniert, und dokumentiert Arbeit, Material und Unterschrift."
  - q: "Was kostet Salesforce Field Service?"
    a: "Laut Salesforce-Preisseite (Stand Oktober 2026) kosten Dispatcher und Technician je 175 € pro Nutzer und Monat in der Enterprise Edition, Field Service Plus 230 €. In der Unlimited Edition nennt die Fußnote 330 und 380 US-Dollar, jeweils mit Jahresvertrag."
  - q: "Brauche ich für Field Service eine Service-Cloud-Lizenz?"
    a: "Ja, Field Service setzt mindestens eine Service-Cloud-Lizenz voraus, und zusätzlich wird mindestens eine Dispatcher-Lizenz benötigt, damit die Terminplanung funktioniert. Field Service Plus erfüllt die Service-Cloud-Voraussetzung selbst."
  - q: "Gibt es Lizenzen für externe Servicepartner?"
    a: "Ja. Für Subunternehmer gibt es Contractor-Plus-Lizenzen für 80 € pro Nutzer und Monat oder 32 € pro Login. Sie lohnen sich für Partner, die nur gelegentlich Einsätze übernehmen."
draft: false
---

Die Planung in Salesforce Field Service lohnt sich vor allem für Hersteller, deren Techniker viele kurze Einsätze am Tag fahren. Dort verbessern Termin- und Routenoptimierung die Kennzahlen: mehr Einsätze pro Tag, weniger Fahrzeit, mehr eingehaltene Termine. Bei wenigen langen Einsätzen, etwa Inbetriebnahmen über Tage oder Wochen, bringt die Routenoptimierung wenig. Dann müssen die mobile App mit Offline-Arbeit und Dokumentation oder die Steuerung von Anlagen, Verträgen, Teilen und Partnern den Business Case tragen. Die Lizenzkosten von 175 € pro Techniker und Monat lassen sich dann schwerer rechtfertigen. Bevor ein Angebot unterschrieben wird, sollte deshalb klar sein, welche Art von Außendienst das Unternehmen tatsächlich hat und welchen dieser drei Nutzen es braucht.

## Was macht Salesforce Field Service?

Salesforce Field Service ist das Produkt für den Außendienst auf Basis der Service Cloud. Die Salesforce-Hilfe nennt es inzwischen [Agentforce Field Service and Operations](https://help.salesforce.com/s/articleView?id=fs_overview.htm&language=en_US&type=5), vormals Field Service; in Projekten nennen die meisten es weiterhin Field Service. Es deckt drei Teile ab:

- **Terminplanung und Optimierung.** Eine Planungsengine wählt für jeden Einsatz einen passenden Techniker und ein Zeitfenster.
- **Mobile App.** Techniker sehen ihre Einsätze, Anlagen und Historie, auch offline, und erfassen Arbeitszeit, Material, Fotos und Unterschrift.
- **Dokumentation.** Serviceberichte werden direkt in der App erzeugt. Was der Standard dabei kann und wo er Grenzen hat, beschreibe ich in [Service Documents: reicht der Document Builder?](../salesforce-service-documents-document-builder-servicebericht/).

Der Kern ist die Planung. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-scheduling-basics/examine-scheduling-policies) arbeitet sie mit zwei Arten von Regeln. Work Rules filtern Techniker aus, die einen Einsatz nicht übernehmen können, etwa weil eine Qualifikation fehlt. Service Objectives bewerten die übrigen Kandidaten, zum Beispiel nach geringster Fahrzeit, frühestem Termin oder bevorzugtem Techniker. Beides zusammen ergibt eine Scheduling Policy.

## Field Service lohnt sich bei vielen kurzen Einsätzen

Die Optimierung bringt dort am meisten, wo es viel zu optimieren gibt. Nach meiner Erfahrung hängt der Nutzen von der Art der Arbeit, den Standorten und der Dauer der Einsätze ab. Den größten Nutzen sehe ich bei:

- **Vielen kurzen Einsätzen pro Tag**, etwa Wartung, Störungsbehebung oder Prüfungen. Ein typisches Beispiel sind Telekommunikationsunternehmen, deren Techniker bis zu 16 Termine am Tag haben.
- **Einem hohen Anteil Fahrzeit**, weil Kunden über eine Region verteilt sind.
- **Vielen Qualifikationen**, die zusammenpassen müssen, damit der richtige Techniker kommt. Ob das richtige Teil im Fahrzeug ist, ist eine eigene Prüfung vor der Freigabe, siehe Teil 4.
- **Zugesagten Reaktionszeiten** aus Serviceverträgen, die eingehalten und nachgewiesen werden müssen.

Die Aussagen von Salesforce weisen in dieselbe Richtung. In einem [Beitrag zur Terminplanung](https://www.salesforce.com/blog/field-service-scheduling/) von 2025 zitiert Salesforce eigene Forschung: Planung sei das größte Hindernis für die Effizienz von Technikern, und 47 Prozent ihrer Termine verliefen nicht wie geplant. Stichprobe und Methode nennt der Beitrag nicht, und es ist Herstellerforschung. Ich lese die Zahl deshalb als Hinweis, nicht als Beleg für einen Business Case. Entscheidend ist der Anteil Ihrer eigenen Termine, die umgeplant werden.

## Bei wenigen langen Einsätzen bringt die Planung wenig

Bei wenigen langen Einsätzen ist der Nutzen der Planung viel kleiner. Ein Techniker, der eine Anlage über zwei Wochen in Betrieb nimmt, braucht keine Routenoptimierung. Er braucht einen Projektplan, Zugang zu Zeichnungen und eine saubere Dokumentation am Ende.

Typisch dafür sind Inbetriebnahmen, Umbauten oder Revisionen, bei denen ein Team tagelang an einem Ort arbeitet. Der Unterschied zu 16 Terminen am Tag ist groß: Bei solchen langen Einsätzen zählen Zugang zu Unterlagen, Abstimmung mit dem Kunden und eine vollständige Abnahme mehr als die Frage, welcher Techniker am Nachmittag wo ist. Field Service unterstützt solche Arbeit mit mehrtägigen Terminen und Teams (Crews), siehe [mehrtägige Einsätze und Teams](../field-service-mehrtaegige-einsaetze-inbetriebnahme/). Der Business Case muss sich dann aus Offline-Dokumentation, Anlagenhistorie, Wartungsverträgen, Teilen oder der Steuerung von Partnern ergeben, nicht aus der Routenoptimierung.

Für solche Fälle gibt es Alternativen, die ich vor einer Field-Service-Lizenz prüfe:

- **Service Cloud mit Arbeitsaufträgen und der Salesforce Mobile App**, wenn vor allem Dokumentation fehlt.
- **Ein Portal mit Experience Cloud**, wenn Subunternehmer oder Partner Arbeiten melden und Unterlagen austauschen.
- **Planung im ERP oder in einem Projektwerkzeug**, wenn Einsätze eher Projekte als Termine sind.

Das ist dieselbe Make-or-buy-Frage wie bei jedem anderen Salesforce-Produkt. Ich beschreibe das Vorgehen unter [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

## Was kostet Salesforce Field Service?

Die [Preisseite](https://www.salesforce.com/service/field-service-management/pricing/) nennt im Oktober 2026 diese Listenpreise pro Nutzer und Monat bei jährlicher Abrechnung in der Enterprise Edition:

| Lizenz | Für wen | Listenpreis |
|---|---|---|
| Dispatcher | Disponenten, die Einsätze planen | 175 € |
| Technician | Techniker mit der mobilen App | 175 € |
| Field Service Plus | Nutzer, die auch Fälle bearbeiten | 230 € |
| Contractor Plus | Subunternehmer | 80 € oder 32 € pro Login |

In der Unlimited Edition kosten Dispatcher und Technician laut Fußnote 330 US-Dollar, Field Service Plus 380 US-Dollar. Zusatzfunktionen wie der Appointment Assistant, der Kunden über Ankunftszeiten informiert, kosten extra.

Ein Rechenbeispiel mit Listenpreisen: 40 Techniker und 4 Disponenten in der Enterprise Edition sind 44 Lizenzen zu 175 €, also 7.700 € pro Monat oder 92.400 € pro Jahr. Dazu kommen Umsetzung, Integration mit dem ERP und Wartung.

Für die Lizenzplanung sind vor allem diese Bedingungen aus dem Kleingedruckten wichtig: Field Service setzt mindestens eine Service-Cloud-Lizenz voraus, außerdem wird mindestens eine Dispatcher-Lizenz benötigt, damit die Planung funktioniert. Eine weitere Bedingung betrifft den Innendienst:

```hinweis achtung
Dispatcher- und Technician-Lizenzen dürfen nicht für Contact Center oder Fallbearbeitung genutzt werden. Wer im Innendienst Fälle bearbeitet und zugleich Einsätze plant, braucht Field Service Plus.
```

Welche Rolle welche Lizenz braucht, Subunternehmer eingeschlossen, steht in [Salesforce Field Service Lizenzen: Wer braucht welche?](../field-service-lizenzen-rollen-dispatcher-techniker/) und in [Kapitel 1 der Masterclass Field Service](../../masterclass/field-service/field-service-lohnt-sich-lizenzen/). Die sechs häufigsten Fragen zum Produkt mit Kurzantwort sammelt der Themen-Hub [Salesforce Field Service für Hersteller](../../masterclass/field-service/).

## Woran entscheide ich?

Ich beginne mit vier Zahlen aus dem eigenen Außendienst, noch bevor es um das Produkt geht. Sie sind ein erster Datencheck, kein Entscheidungsmodell:

1. **Einsätze pro Techniker und Tag.** Liegen sie im Schnitt deutlich über eins, gibt es etwas zu optimieren.
2. **Anteil der Fahrzeit an der Arbeitszeit.** Je höher, desto mehr bringt Routenoptimierung.
3. **Qualifikationen und Teile, die zusammenpassen müssen.** Entscheidend ist nicht die Anzahl, sondern wie oft der falsche Techniker kommt oder das falsche Teil vor Ort ist. Je mehr Kombinationen es gibt, desto schwerer ist die Planung von Hand.
4. **Erstlösungsquote**, also wie oft ein Einsatz beim ersten Besuch erledigt ist. Ist sie niedrig, weil Teile oder Qualifikationen fehlen, hilft bessere Planung direkt.

Diese Zahlen lassen sich meist dem ERP oder der bestehenden Einsatzplanung entnehmen. Sind sie unbekannt, ist das schon ein Ergebnis: Dann fehlt die Grundlage für jeden Business Case, egal mit welchem Produkt.

Der Business Case selbst braucht beide Seiten. Auf der Nutzenseite stehen Kosten eines Fehleinsatzes, Wiederholungsbesuche, Aufwand der Disposition, Überstunden, verfehlte Reaktionszeiten mit ihren Vertragsfolgen und der Aufwand für Serviceberichte. Auf der Kostenseite stehen Lizenzen, Umsetzung, Integration, Betrieb und bestehende Systeme, die abgelöst werden oder bleiben. Rechnen Sie über die erwartete Nutzungsdauer, nicht nur für das erste Jahr.

Danach kommt die Frage nach den Daten. Field Service plant nur mit gepflegten Anlagen, Standorten, Qualifikationen und Verfügbarkeiten. Ein Techniker, dessen Qualifikationen nirgends hinterlegt sind, wird von der Engine falsch eingeplant. Welche Daten das genau sind, beschreibe ich in [Teil 2 dieser Serie](../salesforce-field-service-stammdaten/).

## Vier Zahlen für einen Monat und eine Region erheben

Erheben Sie die vier Zahlen für einen Monat und eine Region. Zeigen sie viele kurze Einsätze mit viel Fahrzeit, rechnen Sie den Business Case für Field Service mit Lizenzen, Umsetzung und Wartung über mehrere Jahre. Wie die Einführung danach Region für Region abläuft, beschreibe ich in [Salesforce Field Service Einführung: Warum in Wellen?](../salesforce-field-service-einfuehrung/). Zeigen sie wenige lange Einsätze, prüfen Sie zuerst, ob Service Cloud, ein Portal oder das ERP die Lücke schließen. Was die mobile App heute für Techniker leistet, steht in [Field Service Mobile im Außendienst](../salesforce-field-service-mobile-aussendienst/).
