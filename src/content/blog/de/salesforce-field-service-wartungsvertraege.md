---
title: "Field Service: Wie bildet man Wartungsverträge ab?"
description: "Service Contracts, Maintenance Plans und Entitlements in Salesforce Field Service: was welches Objekt abbildet und wie Reaktionszeiten die Planung steuern."
pubDate: 2026-10-27
lang: de
slug: salesforce-field-service-wartungsvertraege
translationKey: field-service-maintenance-contracts
topic: field-service
categories: [field-service]
series: { id: field-service, part: 5 }
tags: [Field Service, Außendienst, Wartungsverträge, Entitlements, Fertigung]
takeaways:
  - "Wartungsverträge verteilen sich in Salesforce Field Service auf drei Objekte: Service Contract für das, was verkauft wurde, Maintenance Plan für die geplanten Wartungen und Entitlement für den zugesagten Service-Level."
  - "Entitlements haben mit Wartungsverträgen nur bedingt zu tun. Sie können auch aus einer Garantie oder einem Supportpaket kommen und beschreiben, worauf ein Kunde Anspruch hat."
  - "Maintenance Plans erzeugen Arbeitsaufträge für Wartungen im Voraus, laut Salesforce höchstens 2.600 Arbeitsaufträge und Positionen pro Lauf."
  - "Entitlements können die Priorität im Dispatching beeinflussen. Field Service plant Termine mit hoher Priorität zuerst und kann dafür Termine mit niedriger Priorität verdrängen."
  - "Reaktionszeiten aus dem Vertrag werden über Entitlement-Prozesse mit Milestones am Arbeitsauftrag gemessen und damit nachweisbar."
faq:
  - q: "Was ist der Unterschied zwischen Service Contract und Entitlement?"
    a: "Ein Service Contract ist die Vereinbarung mit dem Kunden, mit Positionen für die abgedeckten Produkte oder Anlagen. Ein Entitlement beschreibt den Anspruch auf eine Serviceleistung, etwa eine Reaktionszeit, und kann an einem Vertrag, einer Anlage oder einem Account hängen."
  - q: "Wie erzeugt Field Service Wartungstermine?"
    a: "Ein Maintenance Plan legt fest, wie oft Anlagen gewartet werden, und erzeugt die Arbeitsaufträge für einen festgelegten Zeitraum im Voraus, auf Wunsch automatisch. Abweichende Intervalle für einzelne Anlagen regeln Maintenance Work Rules."
  - q: "Wie misst Salesforce Reaktionszeiten im Außendienst?"
    a: "Über einen Entitlement-Prozess vom Typ Work Order. Er besteht aus Milestones, etwa einer Zeit bis zum Termin vor Ort, die am Arbeitsauftrag laufen und zeigen, ob die Zusage eingehalten wurde."
  - q: "Wie beeinflusst die Priorität die Planung in Field Service?"
    a: "Die Priorität liegt standardmäßig auf einer Skala von 1 bis 10, wobei 1 die höchste ist. Bei knappen Technikern plant die Optimierung Termine mit hoher Priorität zuerst und kann Termine mit niedriger Priorität verdrängen."
draft: false
---

Ein Wartungsvertrag verteilt sich in Salesforce Field Service auf drei Objekte. Der Service Contract hält fest, was verkauft wurde. Der Maintenance Plan erzeugt die geplanten Wartungen. Das Entitlement beschreibt, auf welchen Service-Level der Kunde Anspruch hat, etwa eine Reaktionszeit. Entitlements haben dabei mit Wartungsverträgen nur bedingt zu tun, denn ein Anspruch kann auch aus einer Garantie oder einem Supportpaket kommen. In einem Projekt waren Entitlements Teil des Umfangs und haben die Priorisierung im Dispatching beeinflusst. Genau dort zeigt sich der Wert für den Außendienst.

Dieser Artikel ist Teil 5 der Serie. Wie Field Service plant und was der Disponent prüft, steht in [Teil 3](../salesforce-field-service-terminplanung-automatisieren/). Welche Stammdaten, etwa Anlagen und Öffnungszeiten, dafür nötig sind, steht in [Teil 2](../salesforce-field-service-stammdaten/).

## Was bildet welches Objekt ab?

Die Begriffe klingen ähnlich und werden in Projekten oft vermischt. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=service.entitlements_terms.htm&language=en_US&type=5) gilt:

| Objekt | Was es abbildet | Beispiel |
|---|---|---|
| Service Contract | Die Vereinbarung mit dem Kunden | Wartungsvertrag für eine Fertigungslinie, drei Jahre |
| Contract Line Item | Die abgedeckten Produkte oder Anlagen | Zwei Pressen und ein Roboter aus dieser Linie |
| Maintenance Plan | Wie oft gewartet wird | Inspektion alle sechs Monate |
| Entitlement | Worauf der Kunde Anspruch hat | Techniker vor Ort innerhalb von 24 Stunden |
| Entitlement-Prozess mit Milestones | Wie der Anspruch gemessen wird | Uhr läuft ab Anlage des Arbeitsauftrags |

Der Service Contract ist die kaufmännische Seite; wie er wiederkehrend abgerechnet wird, steht in [Wartungsverträge wiederkehrend abrechnen mit Revenue Cloud](../wartungsvertraege-wiederkehrend-abrechnen/). Der Maintenance Plan ist die planbare Arbeit. Das Entitlement ist die ungeplante Arbeit mit Zusage, also die Störung, bei der eine Reaktionszeit gilt. Ein Vertrag kann alle drei haben, muss aber nicht. Ein reiner Garantiefall hat oft nur ein Entitlement an der Anlage und keinen Wartungsplan. Wie Garantieansprüche in der Manufacturing Cloud laufen, steht in [Kapitel 4 der Masterclass Manufacturing Cloud](../../masterclass/manufacturing-cloud/garantie-und-after-sales/).

## Wie entstehen die geplanten Wartungen?

Ein Maintenance Plan legt fest, wie oft die Anlagen eines Kunden gewartet werden, und erzeugt die Arbeitsaufträge dafür. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.fs_create_maintenance.htm&language=en_US&type=5) hängt er an Account und Kontakt, kann auf einen Service Contract verweisen und listet die abgedeckten Anlagen. Abweichende Intervalle, etwa für eine Anlage im Dreischichtbetrieb, regeln Maintenance Work Rules direkt an der Anlage.

Zwei Einstellungen verdienen Aufmerksamkeit:

- **Vorlauf der Erzeugung.** Er legt fest, wie weit im Voraus Arbeitsaufträge entstehen. Ein zu kurzer Vorlauf lässt der Planung keinen Spielraum, ein zu langer füllt das System mit Aufträgen, die sich bis dahin noch ändern.
- **Grenze pro Lauf.** Ein Lauf erzeugt höchstens 2.600 Arbeitsaufträge und Positionen zusammen. Bei einem Kunden mit vielen Anlagen und kurzem Intervall ist das schneller erreicht, als man denkt.

Wartungen sind die Einsätze, bei denen die Automatik aus Teil 3 am ehesten ohne Disponent laufen kann. Sie sind planbar, wiederkehrend und haben meist einen festen Arbeitstyp mit bekannten Qualifikationen und Teilen.

## Wie steuern Entitlements das Dispatching?

Ein Entitlement allein ändert an der Planung nichts. Es wird erst wirksam, wenn es zwei Dinge auslöst: eine Messung und eine Priorität.

**Messung.** Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=service.entitlements_supported_objects.htm&type=5) laufen Milestones auch an Arbeitsaufträgen. Dafür braucht es einen Entitlement-Prozess vom Typ Work Order. Ein Prozess vom Typ Case läuft auf einem Arbeitsauftrag nicht, auch wenn derselbe Anspruch dahintersteht. Der Milestone zeigt dann, ob der Techniker in der zugesagten Zeit vor Ort war, und macht die Zusage gegenüber dem Kunden nachweisbar.

**Priorität.** Field Service plant nach einem Prioritätsfeld. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.pfs_scheduling_priority_optimization.htm&language=en_US&type=5) liegt sie standardmäßig auf einer Skala von 1 bis 10, wobei 1 die höchste ist. Der Arbeitsauftrag bringt ein Feld Priority mit den Werten Low bis Critical mit, das eine Formel in Zahlen übersetzt. Sind Techniker knapp, plant die Optimierung Termine mit hoher Priorität zuerst und kann dafür Termine mit niedriger Priorität verdrängen.

Die Verbindung zwischen beiden baut man selbst, meist mit einem Flow: Ein Arbeitsauftrag mit einem Entitlement „Reaktion in 24 Stunden“ bekommt eine höhere Priorität als einer ohne Zusage. So landet die Zusage aus dem Vertrag direkt in der Entscheidung der Planungsengine, und der Disponent muss nicht bei jeder Störung im Vertrag nachsehen.

Einmal durchgespielt: Bei einem Kunden mit Premium-Vertrag fällt eine Presse aus.

```schritte
Arbeitsauftrag anlegen | Innendienst
  Der Innendienst legt einen Arbeitsauftrag zur Anlage an und ordnet das Entitlement „Techniker vor Ort in 24 Stunden“ zu. Der Milestone startet.
Priorität setzen | Flow
  Ein Flow setzt die Priorität auf Critical, die Formel macht daraus eine 1.
Optimieren | Planungsengine
  Die nächste Optimierung plant den Termin vor die halbjährliche Inspektion eines anderen Kunden, die aus einem Maintenance Plan stammt und einen Tag später auch noch passt.
Freigeben | Disponent
  Der Disponent prüft den Vorschlag und gibt ihn frei.
```

Wann der Milestone als erfüllt gilt, etwa mit dem Status In Progress vor Ort, legen Sie im Entitlement-Prozess selbst fest.

## Worauf sollten Sie achten?

Erstens: Trennen Sie die Objekte von Anfang an sauber. Wer Reaktionszeiten als Textfeld am Service Contract pflegt, kann sie weder messen noch in die Planung bringen. Wer Wartungsintervalle in Entitlements versteckt, bekommt keine automatisch erzeugten Aufträge.

Zweitens: Halten Sie die Zahl der Service-Level klein. Jede Stufe braucht einen eigenen Prozess, eigene Milestones und eine eigene Prioritätsregel. Drei Stufen lassen sich erklären und prüfen, zehn nicht.

Drittens: Prüfen Sie die Öffnungszeiten. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=fs_oh_considerations.htm&language=en_US&type=5) können Entitlements eigene Arbeitszeiten für die Terminbuchung tragen, etwa kürzere Zeitfenster für Kunden mit Premium-Vertrag. Dazu kommen die Besuchszeiten am Account aus Teil 2. Wer beides pflegt, sollte wissen, was gilt, bevor ein Kunde fragt, warum sein 24-Stunden-Termin am Samstag nicht kam.

Viertens: Klären Sie die Grenze zur Garantie. Ob ein Einsatz unter Garantie, Vertrag oder gegen Rechnung läuft, entscheidet über die Abrechnung. Diese kaufmännische Seite gehört nicht in die Planung, muss aber am Arbeitsauftrag erkennbar sein. Sonst baut der Techniker ein Teil ein, das später niemand abrechnen kann, oder der Kunde bekommt eine Rechnung für einen Einsatz, der unter Garantie lief.

## Wo sollten Sie anfangen?

Nehmen Sie Ihre drei häufigsten Vertragsarten und schreiben Sie für jede auf, was der Kunde gekauft hat, welche Wartungen geplant sind und welche Reaktionszeit zugesagt ist. Daraus ergeben sich Service Contracts, Maintenance Plans und Entitlements fast von selbst. Danach legen Sie fest, welche Priorität jede Zusage in der Planung bekommt.

Im nächsten Teil der Serie geht es um Servicepartner und Subunternehmer. Wenn Sie Ihre Verträge vorher mit einem unabhängigen Blick in Field Service übersetzen möchten, [schreiben Sie mir](#contact).
