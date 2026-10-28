---
title: "Salesforce Field Service: Wann lohnt es sich?"
description: "Salesforce Field Service lohnt sich bei vielen kurzen Einsätzen, kaum bei langen Projekten. Kriterien, Lizenzkosten und Alternativen für den Außendienst."
pubDate: 2026-10-26
lang: de
slug: salesforce-field-service-lohnt-sich
translationKey: field-service-worth-it
topic: field-service
categories: [field-service]
series: { id: field-service, part: 1 }
tags: [Field Service, Außendienst, Lizenzen, Make-or-buy, Fertigung]
takeaways:
  - "Salesforce Field Service lohnt sich am meisten bei vielen kurzen Einsätzen pro Techniker und Tag, weil Termin- und Routenoptimierung dort die Kennzahlen deutlich verbessern."
  - "Bei wenigen langen Einsätzen, etwa Inbetriebnahmen über mehrere Tage oder Wochen, ist der Nutzen der Optimierung viel kleiner, und andere Lösungen können reichen."
  - "Dispatcher- und Technician-Lizenzen kosten laut Preisliste je 175 € pro Nutzer und Monat in der Enterprise Edition. 40 Techniker und 4 Disponenten kosten damit 92.400 € pro Jahr."
  - "Technician- und Dispatcher-Lizenzen dürfen nicht für Fallbearbeitung im Contact Center genutzt werden. Wer beides tut, braucht Field Service Plus für 230 €."
  - "Die Entscheidung beginnt mit vier Zahlen aus dem eigenen Außendienst: Einsätze pro Tag, Anteil der Fahrzeit, Zahl der Qualifikationen und Erstlösungsquote."
faq:
  - q: "Was ist Salesforce Field Service?"
    a: "Salesforce Field Service ist das Produkt für den Außendienst auf Basis der Service Cloud. Es plant Einsätze nach Qualifikation, Verfügbarkeit und Fahrzeit, schickt sie an eine mobile App für Techniker, die auch offline funktioniert, und dokumentiert Arbeit, Material und Unterschrift."
  - q: "Was kostet Salesforce Field Service?"
    a: "Laut Salesforce-Preisseite (Stand Oktober 2026) kosten Dispatcher und Technician je 175 € pro Nutzer und Monat in der Enterprise Edition, Field Service Plus 230 €. In der Unlimited Edition nennt die Fußnote 330 und 380 US-Dollar, jeweils mit Jahresvertrag."
  - q: "Brauche ich für Field Service eine Service-Cloud-Lizenz?"
    a: "Ja, Field Service setzt mindestens eine Service-Cloud-Lizenz voraus, und Techniker brauchen mindestens einen Dispatcher, damit die Terminplanung funktioniert. Field Service Plus erfüllt die Service-Cloud-Voraussetzung selbst."
  - q: "Gibt es Lizenzen für externe Servicepartner?"
    a: "Ja. Für Subunternehmer gibt es Contractor-Plus-Lizenzen für 80 € pro Nutzer und Monat oder 32 € pro Login. Sie lohnen sich für Partner, die nur gelegentlich Einsätze übernehmen."
draft: false
---

Salesforce Field Service lohnt sich für Hersteller, deren Techniker viele kurze Einsätze am Tag fahren. Dort verbessern Termin- und Routenoptimierung die Kennzahlen deutlich: mehr Einsätze pro Tag, weniger Fahrzeit, mehr Termine eingehalten. Bei wenigen langen Einsätzen, etwa Inbetriebnahmen über Tage oder Wochen, ist der Nutzen viel kleiner, und die Lizenzkosten von 175 € pro Techniker und Monat tragen sich schwerer. Bevor ein Angebot unterschrieben wird, sollte deshalb klar sein, welche Art von Außendienst das Unternehmen tatsächlich hat.

## Was macht Salesforce Field Service?

Salesforce Field Service ist das Produkt für den Außendienst auf Basis der Service Cloud. Salesforce nennt es inzwischen Field Service and Operations. Es deckt drei Teile ab:

- **Terminplanung und Optimierung.** Eine Planungsengine wählt für jeden Einsatz einen passenden Techniker und ein Zeitfenster.
- **Mobile App.** Techniker sehen ihre Einsätze, Anlagen und Historie, auch offline, und erfassen Arbeitszeit, Material, Fotos und Unterschrift.
- **Dokumentation.** Serviceberichte entstehen direkt aus der App. Was der Standard dabei kann und wo er Grenzen hat, beschreibe ich in [Service Documents: reicht der Document Builder?](../salesforce-service-documents-document-builder-servicebericht/).

Der Kern ist die Planung. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-scheduling-basics/examine-scheduling-policies) arbeitet sie mit zwei Arten von Regeln. Work Rules filtern Techniker aus, die einen Einsatz nicht übernehmen können, etwa weil eine Qualifikation fehlt. Service Objectives bewerten die übrigen Kandidaten, zum Beispiel nach geringster Fahrzeit, frühestem Termin oder bevorzugtem Techniker. Beides zusammen ergibt eine Scheduling Policy.

## Wann lohnt sich Field Service?

Die Optimierung bringt dort am meisten, wo es viel zu optimieren gibt. Nach meiner Erfahrung hängt das an der Art der Arbeit, den Standorten und der Dauer der Einsätze. Den größten Nutzen sehe ich bei:

- **Vielen kurzen Einsätzen pro Tag**, etwa Wartung, Störungsbehebung oder Prüfungen. Ein typisches Beispiel sind Telekommunikationsunternehmen, deren Techniker bis zu 16 Termine am Tag haben.
- **Einem hohen Anteil Fahrzeit**, weil Kunden über eine Region verteilt sind.
- **Vielen Qualifikationen und Ersatzteilen**, die zusammenpassen müssen, damit der richtige Techniker mit dem richtigen Teil kommt.
- **Zugesagten Reaktionszeiten** aus Serviceverträgen, die eingehalten und nachgewiesen werden müssen.

Salesforce selbst stützt diese Richtung mit eigener Forschung. In einem [Beitrag zur Terminplanung](https://www.salesforce.com/blog/field-service-scheduling/) nennt Salesforce Planung den größten Effizienzblocker für Techniker und schreibt, dass 47 Prozent der Termine nicht wie geplant verlaufen. Wer täglich Dutzende Einsätze umplant, spart dort am meisten.

## Wann lohnt sich Field Service nicht?

Bei wenigen langen Einsätzen ist der Nutzen viel kleiner. Ein Techniker, der eine Anlage über zwei Wochen in Betrieb nimmt, braucht keine Routenoptimierung. Er braucht einen Projektplan, Zugang zu Zeichnungen und eine saubere Dokumentation am Ende.

Typisch dafür sind Inbetriebnahmen, Umbauten oder Revisionen, bei denen ein Team tagelang an einem Ort arbeitet. Der Unterschied zu 16 Terminen am Tag ist groß: Dort zählen Zugang zu Unterlagen, Abstimmung mit dem Kunden und eine vollständige Abnahme mehr als die Frage, welcher Techniker am Nachmittag wo ist. Wenn Sie solche Einsätze trotzdem in Field Service planen, siehe [mehrtägige Einsätze und Teams](../field-service-mehrtaegige-einsaetze-inbetriebnahme/).

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

Zwei Bedingungen aus dem Kleingedruckten zählen für die Lizenzplanung. Field Service setzt mindestens eine Service-Cloud-Lizenz voraus, und Techniker brauchen mindestens einen Dispatcher, damit die Planung funktioniert. Die zweite betrifft den Innendienst:

```hinweis achtung
Dispatcher- und Technician-Lizenzen dürfen nicht für Contact Center oder Fallbearbeitung genutzt werden. Wer im Innendienst Fälle bearbeitet und zugleich Einsätze plant, braucht Field Service Plus.
```

Welche Rolle welche Lizenz braucht, Subunternehmer eingeschlossen, steht in [Kapitel 1 der Masterclass Field Service](../../masterclass/field-service/field-service-lohnt-sich-lizenzen/).

## Woran entscheide ich?

Ich beginne mit vier Zahlen aus dem eigenen Außendienst, noch bevor es um das Produkt geht:

1. **Einsätze pro Techniker und Tag.** Liegen sie im Schnitt deutlich über eins, gibt es etwas zu optimieren.
2. **Anteil der Fahrzeit an der Arbeitszeit.** Je höher, desto mehr bringt Routenoptimierung.
3. **Zahl der Qualifikationen und Teile, die zusammenpassen müssen.** Je mehr, desto schwerer ist die Planung von Hand.
4. **Erstlösungsquote**, also wie oft ein Einsatz beim ersten Besuch erledigt ist. Ist sie niedrig, weil Teile oder Qualifikation fehlen, hilft bessere Planung direkt.

Diese Zahlen lassen sich meist aus dem ERP oder der bestehenden Einsatzplanung ziehen. Sind sie unbekannt, ist das schon ein Ergebnis: Dann fehlt die Grundlage für jeden Business Case, egal mit welchem Produkt.

Danach kommt die Frage nach den Daten. Field Service plant nur so gut, wie Anlagen, Standorte, Qualifikationen und Verfügbarkeiten gepflegt sind. Ein Techniker, dessen Qualifikationen nirgends hinterlegt sind, wird von der Engine falsch eingeplant. Welche Daten das genau sind, beschreibe ich in [Teil 2 dieser Serie](../salesforce-field-service-stammdaten/).

```praxis
In meinen Field-Service-Projekten mit Wartung, Störungseinsätzen und Inbetriebnahmen, automatischer Terminplanung sowie Ersatzteilen und installierter Basis aus dem ERP lagen die Stolpersteine an drei Stellen: Datenqualität der Anlagen, Akzeptanz bei den Technikern und die Schnittstellen zum ERP.
```

## Wo sollten Sie anfangen?

Erheben Sie die vier Zahlen für einen Monat und eine Region. Zeigen sie viele kurze Einsätze mit viel Fahrzeit, rechnen Sie den Business Case für Field Service mit Lizenzen, Umsetzung und Wartung über mehrere Jahre. Zeigen sie wenige lange Einsätze, prüfen Sie zuerst, ob Service Cloud, ein Portal oder das ERP die Lücke schließen. Was die mobile App heute für Techniker kann, steht in [Field Service Mobile im Außendienst](../salesforce-field-service-mobile-aussendienst/).

Field Service lohnt sich, wenn Ihr Außendienst viele kurze Termine fährt, und selten, wenn er lange Projekte betreut. Wenn Sie vor dieser Entscheidung stehen und eine unabhängige Einschätzung möchten, [schreiben Sie mir](#contact).
