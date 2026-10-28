---
title: "Field Service Lizenzen: Welche Rolle braucht welche?"
description: "Hotline, Disposition, Techniker, Backoffice, Servicepartner: welche Field-Service-Lizenz jede Rolle braucht, was sie kostet und welche Regeln zählen."
pubDate: 2026-10-28
lang: de
slug: field-service-lizenzen-rollen-dispatcher-techniker
translationKey: field-service-licences-by-role
topic: field-service
categories: [field-service]
contactBrief: licences
tags: [Field Service, Lizenzen, Dispatcher, Techniker, Contractor Plus, Außendienst]
takeaways:
  - "Dispatcher und Technician kosten je 175 € pro Nutzer und Monat, Field Service Plus 230 €, Contractor Plus 80 € pro Nutzer oder 32 € pro Login (Preisliste Oktober 2026, Enterprise Edition, Jahresvertrag)."
  - "Dispatcher- und Technician-Lizenzen dürfen nicht für Contact Center oder Case Management genutzt werden. Wer in der Hotline auch disponiert, braucht Field Service Plus."
  - "Jede Field-Service-Org braucht mindestens eine Service-Cloud-Lizenz, und Techniker und Contractors brauchen mindestens eine Dispatcher-Lizenz, damit die Planung funktioniert."
  - "Für Techniker von Servicepartnern ist die Nutzerlizenz ab 2,5 Logins im Monat günstiger. Pro Login lohnt sich für Partner, die nur in Spitzen aushelfen."
  - "Eine Lizenzmatrix nach Rollen, gebaut aus dem, was Menschen wirklich im System tun, gehört vor das erste Angebot in den Business Case."
faq:
  - q: "Welche Lizenz braucht ein Disponent in Field Service?"
    a: "Wer nur Einsätze plant und freigibt, braucht die Dispatcher-Lizenz für 175 € pro Nutzer und Monat. Bearbeitet dieselbe Person auch Cases im Contact Center, verlangt die Preisliste Field Service Plus für 230 €."
  - q: "Darf eine Techniker-Lizenz für die Service-Hotline genutzt werden?"
    a: "Nein. Laut Preisliste dürfen Dispatcher- und Technician-Lizenzen nicht für Contact Center, Call Center oder Case Management genutzt werden. Hotline-Mitarbeitende brauchen Service Cloud oder Field Service Plus."
  - q: "Was kostet Contractor Plus?"
    a: "Laut Salesforce-Preisliste vom Oktober 2026 kostet Contractor Plus 80 € pro Nutzer und Monat oder 32 € pro Login. Die Lizenz gibt Servicepartnern Zugang zu Portal und mobiler App."
  - q: "Brauche ich für Field Service eine Service-Cloud-Lizenz?"
    a: "Ja. Die Preisliste verlangt mindestens eine Service-Cloud-Nutzerlizenz in der Org. Field Service Plus enthält Service-Funktionen, Hotline-Mitarbeitende mit Field Service Plus zählen also mit."
draft: false
---

In Salesforce Field Service braucht jede Rolle der Serviceorganisation ihre eigene Lizenz, und die Preisliste setzt feste Regeln für den Mix. Disponenten und Techniker bekommen Dispatcher oder Technician für 175 € pro Nutzer und Monat. Die Hotline, die Cases bearbeitet, braucht Service Cloud, und wenn sie auch disponiert, Field Service Plus für 230 €. Techniker von Servicepartnern bekommen Contractor Plus für 80 € pro Nutzer oder 32 € pro Login. Zwei Regeln entscheiden die meisten Rechnungen: Dispatcher und Technician dürfen kein Case Management machen, und jede Org braucht mindestens eine Service-Cloud- und eine Dispatcher-Lizenz.

## Was kosten die Field Service Lizenzen?

Salesforce verkauft das Produkt heute als Field Service and Operations. Die [deutsche Preisseite](https://www.salesforce.com/de/products/field-service/pricing) nennt im Oktober 2026 diese Preise pro Nutzer und Monat, bei jährlicher Abrechnung und für die Enterprise Edition. Die [US-Preisseite](https://www.salesforce.com/service/field-service-management/pricing/) zeigt dieselben Zahlen in Dollar.

| Lizenz | Was laut Preisliste enthalten ist | Listenpreis |
|---|---|---|
| Dispatcher | Terminplanung und Routenoptimierung, Zuweisung von Einsätzen | 175 € |
| Technician | Arbeitsaufträge in der mobilen App, auch offline | 175 € |
| Field Service Plus | Alles aus Dispatcher und Technician, dazu Service Cloud und Sales Cloud | 230 € |
| Contractor Plus | Portal und mobile App für Servicepartner | 80 € pro Nutzer oder 32 € pro Login |
| Agentforce 1 Field Service | Field Service Plus mit KI, Credits und weiteren Produkten | 650 € |

In der Unlimited Edition kosten Dispatcher und Technician laut Fußnote 330 Dollar, das Plus-Paket 380 Dollar. Ob sich das Paket für 650 € rechnet, ist eine eigene Rechnung, die ich in [Agentforce 1 Field Service: Wann rechnet sich das Paket?](../agentforce-1-field-service-paket-rechnung/) aufmache.

## Welche Regeln im Kleingedruckten ändern die Rechnung?

Drei Fußnoten der Preisliste sind wichtiger als die Preise selbst.

1. **Mindestens eine Service-Cloud-Nutzerlizenz.** Field Service läuft auf Service Cloud. Eine Org ohne einen einzigen Service-Cloud-Nutzer erfüllt die Bedingung nicht. Field Service Plus enthält Service-Funktionen und zählt mit.
2. **Mindestens eine Dispatcher-Lizenz.** Techniker und Contractors brauchen mindestens einen Dispatcher in der Org, um das Planungswerkzeug zu nutzen. Ein reiner Techniker-Rollout ohne Dispatcher-Lizenz funktioniert nicht.
3. **Kein Case Management mit Dispatcher oder Technician.** Laut Preisliste dürfen diese beiden Lizenzen nicht für Contact Center, Call Center oder Case Management genutzt werden. Field Service Plus darf das.

```hinweis achtung
Die dritte Regel ist für mich das größte Risiko. In kleineren Serviceteams nehmen oft dieselben drei Leute morgens die Störungshotline an und planen nachmittags die Techniker. Mit einer Dispatcher-Lizenz verstößt das gegen die Lizenzbedingungen, auch wenn das System technisch einen Case öffnen lässt.
```

## Welche Rolle braucht welche Lizenz?

Ich baue die Lizenzmatrix aus dem, was jemand im System tut, nicht aus der Stellenbezeichnung. Für die Serviceorganisation eines Herstellers sieht sie meist so aus:

| Rolle | Was sie in Salesforce tut | Lizenz |
|---|---|---|
| Hotline | Nimmt Anrufe an, bearbeitet Cases, prüft Ansprüche, legt Arbeitsaufträge an | Service Cloud |
| Hotline, die auch disponiert | Bearbeitet Cases und plant Techniker | Field Service Plus |
| Disposition | Plant, verschiebt und gibt Termine frei | Dispatcher |
| Eigene Techniker | Arbeiten Termine in der App ab, erfassen Zeit, Teile und Messwerte | Technician |
| Techniker von Servicepartnern | Übernehmen Einsätze per App oder Portal | Contractor Plus |
| Backoffice | Fakturiert, prüft Berichte, pflegt Verträge | Hängt von den bearbeiteten Objekten ab |

Service Cloud selbst gibt es inzwischen in neuen Editionen. Die [Service-Cloud-Preisseite](https://www.salesforce.com/service/pricing/) nennt Core für 195 € pro Nutzer und Monat und schreibt, dass Core die Enterprise Edition ersetzt. Für die Hotline ist das der Vergleichspreis: 195 € für Service Cloud Core gegen 230 € für Field Service Plus. Die 35 € Unterschied kaufen das Recht zu disponieren.

Das Backoffice prüfe ich am genauesten. Wer nur im ERP fakturiert, braucht gar keine Salesforce-Lizenz. Wer Serviceberichte liest oder Verträge pflegt, kommt je nach bearbeiteten Objekten vielleicht mit einer günstigeren Lizenz aus. Wie man das prüft, ohne Standardfunktionen nachzubauen, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Wann lohnt sich Contractor Plus pro Login?

Contractor Plus kostet 80 € pro Nutzer und Monat oder 32 € pro Login. Die Schwelle ist einfach: 80 geteilt durch 32 ergibt 2,5. Ein Partnertechniker, der sich mehr als zwei- bis dreimal im Monat anmeldet, ist mit einer Nutzerlizenz günstiger. Darunter gewinnt die Login-Lizenz.

```hinweis offen
Die Preisseite schreibt, dass Contractor-Lizenzen auch auf Basis monatlicher Logins erhältlich sind, und verweist für Details an den Vertrieb. Die Zählregel würde ich deshalb im Bestellformular festhalten lassen.
```

Der [Architektur-Leitfaden von Salesforce zu Servicepartnern](https://architect.salesforce.com/docs/architect/fundamentals/guide/field-service-contractor-sharing-patterns.html) beschreibt eine Contractor-Firma als Drittunternehmen, das seine eigenen Leute steuert. Für sie sind diese Lizenzen gedacht, für Ihre Servicepartner, nicht für eigene Mitarbeitende zum kleineren Preis. Wie Partnertechniker eine eigene Ressource und ein eigenes Gebiet bekommen, steht in [Field Service: Servicepartner einbinden](../salesforce-field-service-servicepartner/).

## Ein typisches Szenario: Wie sieht die Lizenzrechnung aus?

Ein typisches Szenario, als Annahme: Ein Maschinenbauer hat eine Hotline mit 6 Mitarbeitenden, 4 Disponenten, 45 eigene Techniker und zwei Servicepartner. Partner A schickt 5 Techniker, die etwa zehn Tage im Monat für den Maschinenbauer arbeiten. Partner B hat 3 Techniker, die nur in Spitzen aushelfen, jeder etwa zwei Tage im Monat.

| Rolle | Anzahl | Lizenz | Pro Monat |
|---|---|---|---|
| Hotline | 6 | Service Cloud Core zu 195 € | 1.170 € |
| Disposition | 4 | Dispatcher zu 175 € | 700 € |
| Eigene Techniker | 45 | Technician zu 175 € | 7.875 € |
| Partner A | 5 | Contractor Plus pro Nutzer zu 80 € | 400 € |
| Partner B | 3 | Contractor Plus, 6 Logins zu 32 € | 192 € |
| **Summe** | | | **10.337 €** |

Das sind 124.044 € im Jahr zum Listenpreis. Mit Nutzerlizenzen würde Partner B 240 € statt 192 € im Monat kosten. Soll die Hotline am Wochenende auch disponieren, wechseln alle sechs auf Field Service Plus: 1.380 € statt 1.170 €, also 2.520 € mehr im Jahr. Übernehmen umgekehrt die vier Disponenten abends die Störungshotline, brauchen sie ebenfalls Field Service Plus: 920 € statt 700 € im Monat.

Der Wert der Übung liegt weniger in der Summe als in den Entscheidungen, die sie erzwingt. Wer nimmt Anrufe an, wer disponiert, und wer macht beides? Steht das fest, ergibt sich die Lizenzmatrix fast von selbst.

## Was sollte vor dem Angebot klar sein?

- **Wer Case Management macht.** Jede Person, die Cases bearbeitet und auch Techniker plant, braucht Field Service Plus. Das ist zuerst eine Prozessfrage.
- **Wie Partner arbeiten.** Regelmäßige Partnertechniker mit Nutzerlizenz, gelegentliche pro Login. Die Zählregel vereinbaren.
- **Welche Edition.** Die Preise oben gelten für die Enterprise Edition. In der Unlimited Edition kosten Dispatcher und Technician 330 Dollar.
- **Welche Add-ons.** Agentforce for Field Service and Operations (125 Dollar), Visual Remote Assistant (50 Dollar) und Appointment Assistant (25 Dollar) werden pro Nutzer berechnet. Nur die Rollen, die sie nutzen, brauchen sie.
- **Wachstum.** Eine Lizenzprognose über drei Jahre, nach Rolle und Welle, verhindert, dass am ersten Tag 45 Techniker-Lizenzen gekauft werden, wenn die erste Welle 15 Techniker hat.

Wie das in den Business Case für Field Service passt, steht in [Teil 1 der Serie](../salesforce-field-service-lohnt-sich/) und in [Kapitel 1 der Masterclass Field Service](../../masterclass/field-service/field-service-lohnt-sich-lizenzen/). Bearbeitet die Serviceorganisation auch Garantieansprüche, lohnt vor dem Kauf ein Blick in das [Manufacturing-Cloud-Kapitel zu Garantie und After-Sales](../../masterclass/manufacturing-cloud/garantie-und-after-sales/), damit dieselben Personen nicht zweimal lizenziert werden.

## Wo starten Sie?

Listen Sie jede Person der Serviceorganisation mit dem auf, was sie jede Woche im System tut, und ordnen Sie dann die Lizenz nach den Regeln oben zu. Das mache ich im Rahmen von [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/), bevor die Verhandlung beginnt.

Die Lizenz folgt der Rolle und die Rolle dem Prozess, klären Sie also zuerst, wer Cases bearbeitet und wer disponiert; wenn Sie eine zweite Meinung zu Ihrer Matrix möchten, [schreiben Sie mir](#contact).
