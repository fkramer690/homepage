---
title: "Manufacturing Cloud: Wann lohnt sie sich?"
description: "Manufacturing Cloud kostet 80 € mehr pro Nutzer und Monat als Sales Cloud. Woran Hersteller erkennen, ob Sales Agreements, Rebates und Garantie das tragen."
pubDate: 2026-10-26
lang: de
slug: manufacturing-cloud-wann-lohnt-sie-sich
translationKey: manufacturing-cloud-worth-it
topic: governance
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Make-or-buy, Lizenzen, Architektur, Fertigung]
series: { id: manufacturing-cloud, part: 1 }
takeaways:
  - "Die Manufacturing Cloud lohnt sich, wenn ein Hersteller Rahmenverträge mit geplanten Mengen über Monate oder Jahre steuert und Plan gegen Ist in Salesforce sehen will."
  - "Laut Preisliste kostet Manufacturing Cloud Sales Core 275 € pro Nutzer und Monat, Sales Cloud Core 195 €. Bei 200 Vertriebsnutzern sind das 192.000 € Aufpreis pro Jahr."
  - "Sales Agreements sind die Kernfunktion für den Vertrieb. Passt das Geschäft nicht zu langfristigen Mengenvereinbarungen, fehlt der wichtigste Grund für die Lizenz."
  - "Rebate Management, Garantieprozesse und Händlerportale können den Fall tragen, auch wenn Sales Agreements keine Rolle spielen."
  - "Die Entscheidung gehört in einen ROI-Case über mehrere Jahre, der Lizenzen, Umsetzung und Wartung einer Eigenentwicklung gegeneinander rechnet."
faq:
  - q: "Was ist die Salesforce Manufacturing Cloud?"
    a: "Die Manufacturing Cloud ist die Branchenlösung von Salesforce für Hersteller. Sie baut auf Sales Cloud und Service Cloud auf und ergänzt Funktionen wie Sales Agreements, Rebate Management, Garantieabwicklung und ein Datenmodell für Fertigungsunternehmen."
  - q: "Was kostet die Manufacturing Cloud?"
    a: "Laut Salesforce-Preisseite (Stand Oktober 2026) kosten Sales Core und Service Core je 275 € pro Nutzer und Monat, die Max-Editionen 650 € bis 700 €, jeweils mit Jahresvertrag. Die Fußnoten zu Enterprise und Unlimited Edition widersprechen sich, deshalb gehört der genaue Preis ins Angebot."
  - q: "Was ist ein Sales Agreement in Salesforce?"
    a: "Ein Sales Agreement ist eine langfristige Vereinbarung zwischen Hersteller und Kunde über Preise und Mengen von Produkten, aufgeteilt in wöchentliche, monatliche, quartalsweise oder jährliche Zeiträume. Salesforce stellt geplante und tatsächliche Mengen gegenüber."
  - q: "Kann man Sales Agreements mit Sales Cloud nachbauen?"
    a: "Eine einfache Version mit Rahmenvertrag, Produkten und Plan-Ist-Vergleich lässt sich auf der Kernplattform bauen. Je mehr Logik dazukommt, etwa Verlängerungen, Freigaben und Prognosen, desto teurer wird die Wartung, und genau das gehört in den ROI-Case."
  - q: "Brauchen alle Nutzer eine Manufacturing-Cloud-Lizenz?"
    a: "Das sollte die Lizenzprognose beantworten, nicht das Angebot. Ich ordne Nutzer danach zu, was sie im System tun. Ob ein gemischter Lizenzmix in Ihrer Org möglich ist, klären Sie im Angebot mit Salesforce schriftlich."
draft: false
---

Die Manufacturing Cloud lohnt sich für Hersteller, deren Vertrieb über Rahmenverträge mit geplanten Mengen läuft und die Plan gegen Ist pro Kunde und Produkt in Salesforce steuern wollen. Laut Preisliste kostet sie im Vertrieb 80 € pro Nutzer und Monat mehr als Sales Cloud. Dieser Aufpreis trägt sich nur, wenn Sales Agreements, Rebate Management oder Garantieprozesse zu dem passen, wie das Unternehmen tatsächlich verkauft und Service leistet. Ich habe beide Ausgänge erlebt: einen weltweiten Rollout mit der Manufacturing Cloud und ein Projekt, in dem eine Eigenentwicklung auf der Kernplattform die bessere Wahl war.

## Was ist die Salesforce Manufacturing Cloud?

Die Manufacturing Cloud ist eine Industry Cloud, also ein Branchenpaket, das Salesforce auf Sales Cloud und Service Cloud aufsetzt. Es bringt ein eigenes Datenmodell für Hersteller mit und eine Reihe von Funktionen, die es in der Kernplattform nicht gibt. Auf der [Produktseite](https://www.salesforce.com/manufacturing/cloud/) nennt Salesforce derzeit unter anderem:

- **Sales Agreements** für langfristige Vereinbarungen über Preise und Mengen.
- **Rebate Management** für Bonus- und Rückvergütungsprogramme mit Händlern und Kunden.
- **Garantieabwicklung**, bei der Partner und Kunden Ansprüche über Portale oder API einreichen. Mit Winter '27 kommt ein Agent dazu, der Deckung prüft und mögliche Betrugsfälle markiert.
- **Business Rules Engine und Omnistudio**, mit denen sich Regeln und geführte Abläufe ohne Code bauen lassen.

Ein Hinweis zum Namen: Auf der Preisseite heißt das Produkt in den Fußnoten noch „Agentforce Manufacturing“, auf der Produktseite wieder Manufacturing Cloud. Salesforce hat im September 2026 mehrere ältere Produktnamen zurückgeholt. Gemeint ist dasselbe Produkt.

## Was kostet die Manufacturing Cloud im Vergleich zu Sales Cloud?

Die Listenpreise auf der [Preisseite der Manufacturing Cloud](https://salesforce.com/editions-pricing/manufacturing-cloud/) und der [Preisseite von Sales Cloud](https://www.salesforce.com/products/sales-cloud-pricing/) sehen im Oktober 2026 so aus, pro Nutzer und Monat bei jährlicher Abrechnung:

| Edition | Sales Cloud | Manufacturing Cloud |
|---|---|---|
| Core | 195 € | 275 € (Sales Core oder Service Core) |
| Max | 550 € | 650 € (Sales Max oder Service Max) |
| Sales und Service Max | | 700 € |

Eine Unklarheit nenne ich offen: Die Preisseite der Manufacturing Cloud hat zwei Fußnoten, die sich widersprechen. Die eine sagt, die Preise gelten für die Enterprise Edition und die Unlimited Edition koste 425 US-Dollar. Die andere sagt, die Preise gelten für die Unlimited Edition. Welcher Preis für Ihre Edition gilt, steht erst im Angebot.

Rechnen wir mit den Core-Preisen. Der Aufpreis liegt bei 80 € pro Nutzer und Monat, also 960 € pro Nutzer und Jahr. Bei 200 Vertriebsnutzern sind das 192.000 € pro Jahr zum Listenpreis, über fünf Jahre knapp eine Million. Listenpreise sind selten das Ende der Verhandlung, aber die Größenordnung zeigt, warum die Frage eine eigene Entscheidung verdient.

## Was macht ein Sales Agreement?

Ein Sales Agreement ist eine langfristige Vereinbarung zwischen Hersteller und Kunde über Preis und Menge von Produkten. Laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_salesagreement.htm) teilt es die Laufzeit in Zeiträume auf, wöchentlich, monatlich, quartalsweise oder jährlich. Für jeden Zeitraum und jedes Produkt stehen geplante und tatsächliche Mengen und Umsätze nebeneinander.

Die tatsächlichen Werte kommen laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/configure-sales-agreements-to-negotiate-better) auf drei Wegen ins System: automatisch aus direkten Aufträgen, automatisch aus Aufträgen über Verträge oder manuell per API. Bei Herstellern liegen Aufträge fast immer im ERP. In der Praxis heißt das: Die Aufträge oder ihre Summen müssen aus SAP oder einem anderen ERP nach Salesforce, sonst zeigt das Sales Agreement einen Plan ohne Ist.

Gedacht ist das für das sogenannte Run-Rate-Geschäft. Ein Kunde nimmt über ein oder mehrere Jahre regelmäßig dieselben Produkte ab, und der Vertrieb will sehen, ob er seine Zusagen einhält. Unterschreitet ein Kunde die vereinbarte Menge, ist das der Anlass für ein Gespräch über Preis und Rabatt.

## Wann passt die Manufacturing Cloud nicht?

In einem Fertigungsprojekt habe ich die Manufacturing Cloud bewertet und mich dagegen entschieden. Sales Agreements, die zentrale Vertriebsfunktion, waren für das Geschäft nicht relevant. Das Unternehmen verkaufte nicht über langfristige Mengenvereinbarungen, und damit fiel der wichtigste Grund für die Lizenz weg. Eine eigene Lösung auf der Kernplattform war günstiger und einfacher zu warten.

Daraus habe ich eine Regel mitgenommen: Eine Industry Cloud wird nach ihren Funktionen gekauft, nicht nach dem Branchennamen. „Wir sind Hersteller, also Manufacturing Cloud“ ist kein Business Case. Passt die Kernfunktion nicht, zahlt das Unternehmen für Funktionen, die es nicht nutzt, und baut trotzdem um die herum, die nicht passen.

Es gibt eine zweite Konstellation, in der ich vorsichtig bin. Liegen Rahmenverträge und Abrufe heute sauber im ERP, stellt sich die Frage, ob Salesforce sie überhaupt führen soll. Zwei Systeme, die beide Mengen und Preise pflegen, sind früher oder später uneinig. Dann kann es reichen, dass Salesforce die Zahlen aus dem ERP anzeigt, und dafür braucht es keine Industry Cloud.

## Wann lohnt sie sich doch?

Ich habe auch die andere Seite erlebt: einen weltweiten Rollout der Manufacturing Cloud bei einem globalen Hersteller, zusammen mit CPQ, einem Produktkonfigurator und einem Kundenportal. Der wichtigste Grund für die Manufacturing Cloud waren dort die Sales Agreements. Der Vertrieb musste erkennen, welche Kunden die vereinbarten Mengen noch nicht abgenommen hatten, und planen, wie sich die offenen Mengen noch realisieren lassen, unter Berücksichtigung der aktuellen Lagerkapazitäten. Genau für diese Frage ist der Plan-Ist-Vergleich im Sales Agreement gebaut, und eine Kennzahl wie den Lagerbestand kann man laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/configure-sales-agreements-to-negotiate-better) als eigene Kennzahl pro Zeitraum mitführen.

Die Manufacturing Cloud lohnt sich nach meiner Erfahrung, wenn mindestens einer dieser Punkte klar zutrifft:

- **Rahmenverträge mit Mengen sind der Normalfall.** Der Vertrieb verhandelt Jahresmengen pro Kunde und Produkt und will sehen, wer hinter der Zusage liegt und wie sich die offenen Mengen mit dem vorhandenen Lager noch liefern lassen.
- **Ein Händlerkanal mit Bonusprogrammen.** Rebates werden heute in Tabellen gerechnet, und Händler fragen regelmäßig nach ihrem Stand.
- **Garantie über Händler und Partner.** Ansprüche kommen von außen, und die Prüfung kostet heute viel Handarbeit.
- **Die Roadmap braucht die Funktionen in zwei bis drei Jahren.** Dann lohnt es sich, sie früh im Angebot mitzuverhandeln, statt sie später einzeln zu kaufen.

Trifft keiner dieser Punkte zu, bleibe ich bei Sales Cloud und Service Cloud und baue gezielt, was fehlt.

## Wie entscheide ich zwischen Industry Cloud und Eigenentwicklung?

Die Entscheidung ist ein Make-or-buy über mehrere Jahre. Der Preis im ersten Jahr ist dabei die uninteressanteste Zahl. Ich rechne für beide Optionen:

1. **Lizenzen pro Nutzergruppe**, mit dem erwarteten Wachstum. Nicht jeder Nutzer arbeitet mit Sales Agreements. Wer nur Fälle bearbeitet oder Daten liest, braucht vielleicht eine andere Lizenz. Ob ein gemischter Mix in Ihrer Org geht, lassen Sie sich schriftlich bestätigen.
2. **Umsetzung** durch interne Teams und Partner. Auch eine Industry Cloud muss konfiguriert, integriert und getestet werden.
3. **Wartung und Upgrades.** Eigener Code verursacht bei jedem Salesforce-Release Aufwand. Eine Funktion aus dem Standard entwickelt Salesforce weiter.
4. **Folgekosten**, etwa Add-ons, die später nötig werden, oder der Aufwand, später doch umzusteigen.

Der Vergleich kippt oft an Punkt 3. Eine schlanke Eigenentwicklung für einen Plan-Ist-Vergleich ist überschaubar. Kommen Verlängerungen, Freigaben, Prognosen und Händlerzugriff dazu, wächst sie zu einem Produkt, das jemand dauerhaft pflegen muss. Wie ich solche Fälle rechne, beschreibe ich unter [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

Ein Punkt gehört noch dazu: Wer die Manufacturing Cloud wegen der Agenten kauft, sollte zuerst die Daten prüfen. Ein Agent, der Garantieansprüche bewertet, ist nur so gut wie die Anlagen- und Vertragsdaten dahinter, wie ich in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/) beschreibe.

## Wo sollten Sie anfangen?

Bevor ein Angebot auf dem Tisch liegt, helfen drei Fragen an den eigenen Vertrieb und Service: Wie viel Prozent des Umsatzes laufen über Rahmenverträge mit Mengen? Wie werden Händlerboni heute gerechnet? Wer prüft Garantieansprüche, und wie lange dauert das? Die Antworten zeigen schneller als jede Demo, ob die Manufacturing Cloud zu Ihrem Geschäft passt.

Danach gehört die Frage in die [Salesforce-Architektur](../../leistungen/salesforce-architektur/), mit einem Eintrag im Entscheidungslog, damit die Gründe auch nach einem Partnerwechsel nachvollziehbar bleiben.

Die Manufacturing Cloud lohnt sich, wenn ihre Kernfunktionen Ihr Geschäft abbilden, und nicht, weil Sie Hersteller sind. Wenn bei Ihnen ein Angebot für die Manufacturing Cloud vorliegt und Sie eine unabhängige Zweitmeinung möchten, [schreiben Sie mir](#contact).
