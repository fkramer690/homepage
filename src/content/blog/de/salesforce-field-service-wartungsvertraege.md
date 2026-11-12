---
title: "Salesforce Field Service: Wartungsverträge abbilden"
description: "Service Contracts, Maintenance Plans und Entitlements in Salesforce Field Service: was welches Objekt abbildet und wie Reaktionszeiten in die Planung kommen."
pubDate: 2026-10-27
lang: de
slug: salesforce-field-service-wartungsvertraege
translationKey: field-service-maintenance-contracts
topic: field-service
categories: [field-service]
series: { id: field-service, part: 5 }
tags: [Field Service, Außendienst, Wartungsverträge, Entitlements, Fertigung]
takeaways:
  - "Ein Wartungsvertrag nutzt meist drei Objekte: Service Contract (was verkauft wurde), Maintenance Plan (Wartungen) und Entitlement (Service-Level)."
  - "Entitlements können auch aus einer Garantie oder einem Supportpaket stammen. Sie beschreiben, worauf ein Kunde Anspruch hat."
  - "Maintenance Plans erzeugen Wartungsaufträge im Voraus. Bemessen Sie große Pläne nach Anlagen, Regeln und Vorlauf, denn jeder Lauf hat eine Grenze."
  - "Entitlements wirken auf die Planung, wenn eine Automatisierung den Service-Level in eine Priorität übersetzt. Termine mit hoher Priorität haben Vorrang."
  - "Reaktionszeiten aus dem Vertrag werden über Entitlement-Prozesse mit Milestones am Arbeitsauftrag gemessen und damit nachweisbar."
faq:
  - q: "Was ist der Unterschied zwischen Service Contract und Entitlement?"
    a: "Ein Service Contract ist die Vereinbarung mit dem Kunden, mit Positionen für die abgedeckten Produkte oder Anlagen. Ein Entitlement beschreibt den Anspruch auf eine Serviceleistung, etwa eine Reaktionszeit, und kann mit einem Vertrag, einer Anlage oder einem Account verknüpft sein."
  - q: "Wie erzeugt Field Service Wartungstermine?"
    a: "Ein Maintenance Plan legt fest, wie oft Anlagen gewartet werden, und erzeugt die Arbeitsaufträge für einen festgelegten Zeitraum im Voraus, auf Wunsch automatisch. Abweichende Intervalle für einzelne Anlagen regeln Maintenance Work Rules."
  - q: "Wie misst Salesforce Reaktionszeiten im Außendienst?"
    a: "Salesforce misst Reaktionszeiten über einen Entitlement-Prozess vom Typ Work Order. Er besteht aus Milestones, etwa einer Frist bis zum Vor-Ort-Termin, die am Arbeitsauftrag laufen und zeigen, ob die Zusage eingehalten wurde."
  - q: "Wie beeinflusst die Priorität die Planung in Field Service?"
    a: "Die Priorität liegt standardmäßig auf einer Skala von 1 bis 10, wobei 1 die höchste ist. Wenn Techniker knapp sind, plant die Optimierung Termine mit hoher Priorität zuerst und kann Termine mit niedriger Priorität verdrängen. Ein Entitlement wirkt sich nur darauf aus, wenn ein Flow oder eine Formel es in diese Priorität übersetzt."
draft: false
---

Ein Wartungsvertrag nutzt in Salesforce Field Service typischerweise drei getrennte Objekte. Der Service Contract hält fest, was verkauft wurde. Der Maintenance Plan erzeugt die geplanten Wartungen. Das Entitlement beschreibt, auf welchen Service-Level der Kunde Anspruch hat, etwa eine Reaktionszeit. Entitlements haben dabei mit Wartungsverträgen nur bedingt zu tun, denn ein Anspruch kann auch aus einer Garantie oder einem Supportpaket stammen. In einem Projekt waren Entitlements Teil des Projektumfangs und haben die Priorisierung im Dispatching beeinflusst. Von selbst tun sie das nicht: Eine Automatisierung muss den Service-Level in eine Planungspriorität übersetzen. Genau dort zeigt sich der Wert für den Außendienst.

Dieser Artikel ist Teil 5 der Serie. Wie Field Service plant und was der Disponent prüft, steht in [Teil 3](/blog/salesforce-field-service-terminplanung-automatisieren/). Welche Stammdaten, etwa Anlagen und Öffnungszeiten, dafür nötig sind, steht in [Teil 2](/blog/salesforce-field-service-stammdaten/).

## Was bildet welches Objekt ab?

Die Begriffe klingen ähnlich und werden in Projekten oft vermischt. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=service.entitlements_terms.htm&language=en_US&type=5) gilt:

| Objekt | Was es abbildet | Beispiel |
|---|---|---|
| Service Contract | Die Vereinbarung mit dem Kunden | Wartungsvertrag für eine Fertigungslinie, drei Jahre |
| Contract Line Item | Die abgedeckten Produkte oder Anlagen | Zwei Pressen und ein Roboter aus dieser Linie |
| Maintenance Plan | Wie oft gewartet wird | Inspektion alle sechs Monate |
| Entitlement | Worauf der Kunde Anspruch hat | Techniker vor Ort innerhalb von 24 Stunden |
| Entitlement-Prozess mit Milestones | Wie der Anspruch gemessen wird | Uhr läuft ab Anlage des Arbeitsauftrags |

Der Service Contract ist die kaufmännische Seite; wie er wiederkehrend abgerechnet wird, steht in [Wartungsverträge wiederkehrend abrechnen mit Revenue Cloud](/blog/wartungsvertraege-wiederkehrend-abrechnen/). Der Maintenance Plan ist die planbare Arbeit. Das Entitlement ist ein Anspruch auf einen Service-Level; im Außendienst zählt er vor allem bei Störungen, für die eine Reaktionszeit gilt. Ein Vertrag kann alle drei haben, muss aber nicht. Ein reiner Garantiefall hat oft nur ein Entitlement für die Anlage und keinen Wartungsplan. Wie Garantieansprüche in der Manufacturing Cloud abgebildet werden, steht in [Kapitel 4 der Masterclass Manufacturing Cloud](/masterclass/manufacturing-cloud/garantie-und-after-sales/).

## Wie entstehen die geplanten Wartungen?

Ein Maintenance Plan legt fest, wie oft die Anlagen eines Kunden gewartet werden, und erzeugt die Arbeitsaufträge dafür. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.fs_create_maintenance.htm&language=en_US&type=5) ist er mit Account und Kontakt verknüpft, kann auf einen Service Contract verweisen und listet die abgedeckten Anlagen. Abweichende Intervalle, etwa für eine Anlage im Dreischichtbetrieb, regeln Maintenance Work Rules direkt an der Anlage.

Zwei Einstellungen verdienen Aufmerksamkeit:

- **Vorlauf der Erzeugung.** Er legt fest, wie weit im Voraus Arbeitsaufträge entstehen. Ein zu kurzer Vorlauf lässt der Planung keinen Spielraum, ein zu langer füllt das System mit Aufträgen, die sich bis dahin noch ändern.
- **Grenze pro Lauf.** Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.fs_limits.htm&language=en_US&type=5) erzeugt ein Lauf höchstens 2.600 Arbeitsaufträge je Maintenance Plan, was praktisch auch die Zahl der Anlagen je Plan begrenzt. Mit mehreren Maintenance Work Rules je Anlage sinkt die praktische Grenze weiter. Bei einem Kunden mit vielen Anlagen und kurzem Intervall ist das schneller erreicht, als man denkt. Salesforce empfiehlt, Intervall, Vorlauf oder die Zahl der Anlagen je Plan zu verringern.

Wartungen sind die Einsätze, bei denen die Automatik aus Teil 3 am ehesten ohne Disponenten auskommen kann. Sie sind planbar, wiederkehrend und haben meist einen festen Arbeitstyp mit bekannten Qualifikationen und Teilen.

## Wie beeinflussen Entitlements das Dispatching?

Ein Entitlement allein ändert an der Planung nichts. Es wird erst wirksam, wenn es zwei Dinge auslöst: eine Messung und eine Priorität.

**Messung.** Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=service.entitlements_supported_objects.htm&type=5) laufen Milestones auch an Arbeitsaufträgen. Ein eingerichteter Milestone kann zeigen, ob der Techniker in der zugesagten Zeit vor Ort war, sofern ein vereinbarter Status oder Zeitstempel die Ankunft markiert. Das macht die Zusage gegenüber dem Kunden nachweisbar.

```hinweis achtung
Milestones am Arbeitsauftrag brauchen einen Entitlement-Prozess vom Typ Work Order. Ein Prozess vom Typ Case gilt nicht für einen Arbeitsauftrag, auch wenn derselbe Anspruch dahintersteht.
```

**Priorität.** Field Service plant nach einem Prioritätsfeld. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.pfs_scheduling_priority_optimization.htm&language=en_US&type=5) liegt sie standardmäßig auf einer Skala von 1 bis 10, wobei 1 die höchste ist; eine Formel übersetzt die Priorität des Arbeitsauftrags dorthin. Sind Techniker knapp, plant die Optimierung Termine mit hoher Priorität zuerst und kann dafür Termine mit niedriger Priorität verdrängen.

Die Verbindung zwischen Entitlement und Priorität baut man selbst, meist mit einem Flow: Ein Arbeitsauftrag mit einem Entitlement „Reaktion in 24 Stunden“ erhält eine höhere Priorität als einer ohne Zusage. So fließt die Zusage aus dem Vertrag direkt in die Entscheidung der Planungsengine ein, und der Disponent muss nicht bei jeder Störung im Vertrag nachsehen.

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

## Objekte trennen, Stufen klein halten, Zeiten und Garantie klären

**Trennen Sie die Objekte von Anfang an sauber.** Wer Reaktionszeiten als Textfeld am Service Contract pflegt, kann sie weder messen noch in die Planung bringen. Wer Wartungsintervalle in Entitlements versteckt, erhält keine automatisch erzeugten Aufträge.

**Halten Sie die Zahl der Service-Level klein.** Mehrere Stufen können sich einen Entitlement-Prozess teilen, wenn Milestones mit unterschiedlichen Kriterien ausreichen. Ein eigener Prozess lohnt sich, wenn sich Stufen in Geschäftszeiten, Start- oder Endlogik unterscheiden. Jede Stufe braucht trotzdem ihre Milestones und ihre Prioritätsregel. Drei Stufen lassen sich erklären und prüfen, zehn nicht.

**Halten Sie die Zeiten auseinander.** Hier treffen drei Zeitbegriffe aufeinander, die leicht vermischt werden:

- **Die SLA-Uhr.** Geschäftszeiten im Entitlement-Prozess und in seinen Milestones entscheiden, ob eine 24-Stunden-Zusage den Samstag mitzählt.
- **Das Buchungsfenster.** Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=fs_oh_considerations.htm&language=en_US&type=5) legen Arbeitszeiten am Entitlement die Ankunftsfenster fest, die dem Kunden angeboten werden, etwa zwei statt vier Stunden für Premium-Kunden.
- **Die Verfügbarkeit des Kunden.** Die Besuchszeiten am Account aus Teil 2, die auf den Arbeitsauftrag übernommen werden, geben an, wann der Techniker an die Maschine darf.

Legen Sie für jede Vertragsart fest, welcher der drei gilt, bevor ein Kunde fragt, warum sein 24-Stunden-Termin am Samstag nicht stattfand.

**Klären Sie die Grenze zur Garantie.** Ob ein Einsatz unter Garantie, Vertrag oder gegen Rechnung erfolgt, entscheidet über die Abrechnung. Diese kaufmännische Seite gehört nicht in die Planung, muss aber am Arbeitsauftrag erkennbar sein. Sonst baut der Techniker ein Teil ein, das später niemand abrechnen kann, oder der Kunde erhält eine Rechnung für einen Einsatz, der unter Garantie erfolgte.

## Vertrieb, Service und Finanzen entscheiden, was in die Objekte gehört

Die Objekte werden konfiguriert. Was hineingehört, ist eine geschäftliche Entscheidung, die Serviceleitung, Vertrieb und Finanzen gemeinsam treffen sollten:

- **Wie viele Service-Level der Vertrieb verkaufen darf.** Jede Stufe, die der Vertrieb zusagt, muss eingerichtet und gemessen werden. Eine Planungspriorität brauchen nur Stufen, die die Reihenfolge der Einsätze ändern sollen, und mehrere Stufen können sich eine teilen. Einigen Sie sich auf eine kurze Liste, bevor der erste Vertrag verhandelt wird, nicht danach.
- **Was eine verfehlte Reaktionszeit kostet.** Vertragsstrafen, Gutschriften oder schlicht eine verlorene Verlängerung. Zusammen mit der Kritikalität der Anlage und möglichen Sicherheits- oder Rechtsfolgen entscheidet diese Zahl, wie viel Priorität eine Zusage in der Planung erhält und welcher Aufwand für eine verlässliche Messung gerechtfertigt ist.
- **Wer zwischen Garantie, Vertrag und Rechnung entscheidet.** Jemand muss das für jeden Arbeitsauftrag festlegen, am besten vor dem Einsatz. Sonst streiten Service und Finanzen nach jedem Einsatz darüber.

Drei Warnzeichen, dass das Vertragsmodell nicht trägt: Reaktionszeiten stehen in einem Textfeld, Disponenten schauen bei jeder Störung in den Vertrag, und niemand kann sagen, wie viele Zusagen im letzten Monat eingehalten wurden.

## Die drei häufigsten Vertragsarten aufschreiben

Nehmen Sie Ihre drei häufigsten Vertragsarten und schreiben Sie für jede auf, was der Kunde gekauft hat, welche Wartungen geplant sind und welche Reaktionszeit zugesagt ist. Daraus ergeben sich Service Contracts, Maintenance Plans und Entitlements fast von selbst. Danach legen Sie fest, welche Priorität jede Zusage in der Planung erhält. Wie Servicepartner und Subunternehmer in dieselbe Planung eingebunden werden, zeigt der [nächste Teil der Serie](/blog/salesforce-field-service-servicepartner/).
