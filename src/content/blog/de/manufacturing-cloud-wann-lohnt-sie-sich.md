---
title: "Manufacturing Cloud vs. Sales Cloud: Wann lohnt sie sich?"
description: "Manufacturing Cloud Sales Core kostet laut Liste 80 € mehr pro Nutzer und Monat als Sales Cloud. Woran Hersteller erkennen, ob Sales Agreements das tragen."
pubDate: 2026-10-26
updatedDate: 2026-11-09
lang: de
slug: manufacturing-cloud-wann-lohnt-sie-sich
translationKey: manufacturing-cloud-worth-it
topic: governance
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Make-or-buy, Lizenzen, Architektur, Fertigung]
series: { id: manufacturing-cloud, part: 1 }
takeaways:
  - "Sales Core kostet laut Liste 275 € pro Nutzer und Monat, Sales Cloud Core 195 €. Bei 200 Nutzern sind das 192.000 € Differenz zum Listenpreis im Jahr."
  - "Ohne langfristige Mengenvereinbarungen fehlt der klarste Grund für die Lizenz; die übrigen Funktionen gehören einzeln geprüft."
  - "Garantie gehört zur Servicevariante, Rebates sind ein separates Produkt. Beide brauchen einen eigenen Business Case."
  - "Die Entscheidung gehört in einen ROI-Case über mehrere Jahre, der Lizenzen, Umsetzung und Wartung einer Eigenentwicklung gegeneinander rechnet."
faq:
  - q: "Was ist der Unterschied zwischen Manufacturing Cloud und Sales Cloud?"
    a: "Die Manufacturing Cloud erweitert die Plattform, Sales Cloud und Service Cloud; welche Funktionen enthalten sind, hängt von der Vertriebs-, Service- oder kombinierten Variante ab. Die Manufacturing Cloud for Sales ergänzt Sales Agreements für Rahmenverträge mit geplanten Mengen, Account Forecasting und ein Datenmodell für Hersteller. Die Garantieabwicklung gehört zur Manufacturing Cloud for Service, Rebates werden separat lizenziert. Laut Preisliste kostet Manufacturing Cloud Sales Core 275 € pro Nutzer und Monat, Sales Cloud Core 195 €."
  - q: "Was ist die Salesforce Manufacturing Cloud?"
    a: "Die Manufacturing Cloud ist die Branchenlösung von Salesforce für Hersteller. Sie gibt es als Vertriebs- und als Servicevariante auf Basis von Sales Cloud und Service Cloud, mit Funktionen wie Sales Agreements, Account Forecasting, Garantieabwicklung und einem Datenmodell für Fertigungsunternehmen."
  - q: "Was kostet die Manufacturing Cloud?"
    a: "Laut Salesforce-Preisseite (geprüft am 9. November 2026) kosten Sales Core und Service Core je 275 € pro Nutzer und Monat, die Max-Editionen 650 € bis 700 €, jeweils mit Jahresvertrag. Die Fußnoten zu Enterprise und Unlimited Edition widersprechen sich, deshalb gehört der genaue Preis ins Angebot."
  - q: "Was ist ein Sales Agreement in Salesforce?"
    a: "Ein Sales Agreement ist eine langfristige Vereinbarung zwischen Hersteller und Kunde über Preise und Mengen von Produkten, aufgeteilt in einmalige, wöchentliche, monatliche, quartalsweise oder jährliche Zeiträume. Salesforce stellt geplante und tatsächliche Mengen gegenüber."
  - q: "Kann man Sales Agreements mit Sales Cloud nachbauen?"
    a: "Eine einfache Version mit Rahmenvertrag, Produkten und Plan-Ist-Vergleich lässt sich auf der Kernplattform bauen. Je mehr Logik dazukommt, etwa Verlängerungen, Freigaben und Prognosen, desto teurer wird die Wartung, und genau das gehört in den ROI-Case."
  - q: "Brauchen alle Nutzer eine Manufacturing-Cloud-Lizenz?"
    a: "Nein. Laut Salesforce-Hilfe können in einer Org Manufacturing-Cloud-Nutzer und normale Sales- oder Service-Cloud-Nutzer gemeinsam eingesetzt werden. Ich ordne Lizenzen danach zu, was Nutzer im System tun, und lasse mir die Aufteilung der SKUs im Angebot bestätigen."
draft: false
---

Die Manufacturing Cloud lohnt sich für Hersteller, deren Vertrieb über Rahmenverträge mit geplanten Mengen läuft und die Plan gegen Ist pro Kunde und Produkt in Salesforce steuern wollen. Laut Preisliste kostet sie im Vertrieb 80 € pro Nutzer und Monat mehr als Sales Cloud. Für die meisten Hersteller mit wiederkehrenden Mengen sind Sales Agreements der klarste Grund für diesen Aufpreis. Garantie und Rebates sind eigene Entscheidungen, weil Salesforce sie über die Servicevariante und ein separates Produkt lizenziert. Ich habe beide Varianten erlebt: einen weltweiten Rollout mit der Manufacturing Cloud und ein Projekt, in dem eine Eigenentwicklung auf der Kernplattform die bessere Wahl war.

## Was ist die Salesforce Manufacturing Cloud?

Die Manufacturing Cloud ist das Branchenangebot von Salesforce für Hersteller. Laut Salesforce-Hilfe ist sie kein Managed Package. Sie erweitert die Salesforce Platform, Sales Cloud und Service Cloud um lizenzierte Funktionen. Sie bringt ein eigenes Datenmodell für Hersteller mit und eine Reihe von Funktionen, die es in der Kernplattform nicht gibt. Welche Funktionen Sie bekommen, hängt von der Variante ab. Die [Funktionszuordnung in der Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.mfg_feature_mapping.htm&language=en_US&type=5) teilt sie so auf:

- **Manufacturing Cloud for Sales:** Sales Agreements für langfristige Vereinbarungen über Preise und Mengen, Account Forecasting, Zielvorgaben für Account Manager, Program-Based Business und Partnerbesuche.
- **Manufacturing Cloud for Service:** Garantieabwicklung mit Garantieansprüchen und Lieferantenregress, Produktservicekampagnen, Rücksendungen von Serviceteilen und Funktionen rund um Anlagen.
- **Separate Produkte, die mit der Manufacturing Cloud zusammenarbeiten:** Rebate Management ist dort aufgeführt, nicht bei den Kernfunktionen. Salesforce verlängert Verträge für die Rebate-Management-Produkte seit dem 18. August 2026 nicht mehr und nennt Channel Revenue Management, ein kostenpflichtiges Add-on, als Nachfolger ([Knowledge-Artikel](https://help.salesforce.com/s/articleView?id=005393495&language=en_US&type=1)).
- **Agenten:** Der Warranty Claims Adjudication Agent, den die [Produktseite](https://www.salesforce.com/manufacturing/cloud/) für Winter '27 ankündigt, braucht zusätzlich zur Servicevariante das Add-on Agentforce for Manufacturing oder eine Agentforce-1-Edition.

Ein Hinweis zum Namen: In den [Release Notes](https://help.salesforce.com/s/articleView?id=release-notes.rn_manufacturing.htm&language=en_US&type=5) steht „Manufacturing Cloud is now Agentforce Manufacturing“, auf Produkt- und Preisseite heißt das Produkt Manufacturing Cloud. Dieser Artikel nutzt den Namen der Preisseiten. Lassen Sie sich Produktname und SKU im Angebot bestätigen.

## Was kostet die Manufacturing Cloud im Vergleich zu Sales Cloud?

Die Listenpreise auf der [Preisseite der Manufacturing Cloud](https://salesforce.com/editions-pricing/manufacturing-cloud/) und der [Preisseite von Sales Cloud](https://www.salesforce.com/products/sales-cloud-pricing/) sehen am 9. November 2026 so aus. Sie gelten pro Nutzer und Monat bei jährlicher Abrechnung:

| Edition | Sales Cloud | Manufacturing Cloud |
|---|---|---|
| Core | 195 € | 275 € (Sales Core oder Service Core) |
| Max | 550 € | 650 € (Sales Max oder Service Max) |
| Sales und Service Max | | 700 € |

```hinweis offen
Die Preisseite der Manufacturing Cloud hat zwei Fußnoten, die sich widersprechen. Die eine sagt, die Preise gelten für die Enterprise Edition und die Unlimited Edition koste 425 US-Dollar. Die andere sagt, die Preise gelten für die Unlimited Edition. Welcher Preis für Ihre Edition gilt, steht erst im Angebot.
```

Rechnen wir mit den Core-Preisen. Der Aufpreis liegt bei 80 € pro Nutzer und Monat, also 960 € pro Nutzer und Jahr. Bräuchten alle 200 Vertriebsnutzer Sales Core, wären das 192.000 € pro Jahr zum Listenpreis, über fünf Jahre knapp eine Million. Das ist die Differenz zum Listenpreis in einem vereinfachten Core-Szenario, nicht die echte Rechnung: Nicht jeder Nutzer arbeitet mit Sales Agreements, die Editionen bündeln unterschiedliche Plattformleistungen, und Listenpreise sind selten das Ende der Verhandlung. Die Größenordnung zeigt trotzdem, warum die Frage eine eigene Entscheidung verdient.

## Was macht ein Sales Agreement?

Ein Sales Agreement ist eine langfristige Vereinbarung zwischen Hersteller und Kunde über Preise und Mengen von Produkten. Laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_salesagreement.htm) teilt es die Laufzeit in einmalige, wöchentliche, monatliche, quartalsweise oder jährliche Zeiträume auf. Für jeden Zeitraum und jedes Produkt stehen geplante und tatsächliche Mengen und Umsätze nebeneinander.

Die tatsächlichen Werte kommen laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/configure-sales-agreements-to-negotiate-better) auf drei Wegen ins System: automatisch aus direkten Aufträgen, automatisch aus Aufträgen über Verträge oder manuell per API. Bei vielen Herstellern liegen die führenden Aufträge im ERP oder einem Order-Management-System. In der Praxis heißt das: Die Aufträge oder ihre Summen müssen aus SAP oder einem anderen ERP nach Salesforce, sonst zeigt das Sales Agreement einen Plan ohne Ist.

Gedacht ist das für das sogenannte Run-Rate-Geschäft. Ein Kunde nimmt über ein oder mehrere Jahre regelmäßig dieselben Produkte ab, und der Vertrieb will sehen, ob der Kunde seine Zusagen einhält. Unterschreitet ein Kunde die vereinbarte Menge, ist das der Anlass für ein Gespräch über Preis und Rabatt.

## Wann passt die Manufacturing Cloud nicht?

```praxis
In einem Fertigungsprojekt habe ich die Manufacturing Cloud bewertet und mich dagegen entschieden. Sales Agreements, die zentrale Vertriebsfunktion, waren für das Geschäft nicht relevant. Das Unternehmen verkaufte nicht über langfristige Mengenvereinbarungen, und damit fiel der wichtigste Grund für die Lizenz weg. Die Standardlösung passte nicht gut genug, und der Lizenzaufpreis hätte sich nicht gerechnet. In diesem Fall war es günstiger, die nötigen Funktionen selbst auf der Kernplattform zu entwickeln.
```

Daraus habe ich eine Regel mitgenommen: Eine Industry Cloud wird nach ihren Funktionen gekauft, nicht nach dem Branchennamen. „Wir sind Hersteller, also Manufacturing Cloud“ ist kein Business Case. Passt die Kernfunktion nicht, zahlt das Unternehmen für ungenutzte Funktionen und baut für die Lücken trotzdem eigene Lösungen.

Es gibt eine zweite Konstellation, in der ich vorsichtig bin. Liegen Rahmenverträge und Abrufe heute sauber im ERP, stellt sich die Frage, ob Salesforce sie überhaupt führen soll. Zwei Systeme, die beide Mengen und Preise pflegen, sind früher oder später uneinig. Dann kann eine reine Anzeige der ERP-Zahlen auf der Kernplattform reichen, ohne Manufacturing-Cloud-Lizenz für jeden Nutzer.

## Im weltweiten Rollout gaben die Sales Agreements den Ausschlag

Ich habe auch die andere Seite erlebt: einen weltweiten Rollout der Manufacturing Cloud bei einem globalen Hersteller, zusammen mit CPQ, einem Produktkonfigurator und einem Kundenportal. Der wichtigste Grund für die Manufacturing Cloud waren dort die Sales Agreements. Der Vertrieb musste erkennen, welche Kunden die vereinbarten Mengen noch nicht abgenommen hatten, und planen, wie sich die offenen Mengen unter Berücksichtigung der aktuellen Lagerkapazitäten noch realisieren lassen. Genau für diese Frage ist der Plan-Ist-Vergleich im Sales Agreement gedacht, und den Lagerbestand kann man laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/configure-sales-agreements-to-negotiate-better) als eigene Kennzahl pro Zeitraum mitführen. Wie sich CPQ seitdem verändert hat und wie Revenue Cloud zur Manufacturing Cloud passt, steht in [Kapitel 1 der Masterclass Revenue Cloud](../../masterclass/revenue-cloud/revenue-cloud-ueberblick/).

Die Manufacturing Cloud for Sales lohnt sich nach meiner Erfahrung, wenn Rahmenverträge mit Mengen der Normalfall sind: Der Vertrieb verhandelt Jahresmengen pro Kunde und Produkt und will sehen, wer hinter seiner Zusage zurückbleibt und wie sich die offenen Mengen aus dem aktuellen Lagerbestand noch liefern lassen. In meinem Projekt ging es um ein Geschäft mit wiederkehrenden Mengen. Im Maschinen- und Anlagenbau findet sich dasselbe Muster meist bei Ersatzteilen, Verbrauchsmaterial, Komponenten und Seriengeschäft, weniger bei einmaligen Anlagenprojekten.

Für die übrigen Funktionen braucht es jeweils einen eigenen Business Case:

- **Garantie über Händler und Partner.** Ansprüche kommen von außen, und die Prüfung kostet heute viel Handarbeit. Das ist die Manufacturing Cloud for Service, verglichen wird also mit Service Cloud, nicht mit Sales Cloud.
- **Ein Händlerkanal mit Bonusprogrammen.** Rebates werden heute in Tabellen berechnet, und Händler fragen regelmäßig nach ihrem Stand. Das ist ein separates Produkt mit eigenem Preis, heute Channel Revenue Management.
- **Die Roadmap sieht die Funktionen in zwei bis drei Jahren vor.** Dann lohnt es sich, Preisbindungen oder optionale Positionen mit Aktivierungsdatum ins erste Angebot zu verhandeln, statt Lizenzen Jahre vor der Nutzung zu kaufen.

Trifft keiner dieser Punkte zu und werden auch Funktionen wie Advanced Account Forecasting oder Program-Based Business nicht benötigt, bleibe ich bei Sales Cloud und Service Cloud und baue gezielt, was fehlt.

## Industry Cloud oder Eigenentwicklung ist ein Make-or-buy über Jahre

Der Preis im ersten Jahr ist dabei die uninteressanteste Zahl. Ich rechne für beide Optionen:

1. **Lizenzen pro Nutzergruppe**, mit dem erwarteten Wachstum. Nicht jeder Nutzer arbeitet mit Sales Agreements. Wer nur Fälle bearbeitet oder Daten liest, braucht vielleicht eine andere Lizenz. Salesforce erlaubt, in einer Org Manufacturing-Cloud-Nutzer neben Nutzern mit Standardlizenzen für Sales Cloud oder Service Cloud einzusetzen; lassen Sie sich diese Aufteilung im Angebot bestätigen.
2. **Umsetzung** durch interne Teams und Partner. Auch eine Industry Cloud muss konfiguriert, integriert und getestet werden.
3. **Wartung und Upgrades.** Eigener Code muss gegen jedes Salesforce-Release getestet und ab und zu angepasst werden. Eine Funktion aus dem Standard entwickelt Salesforce weiter, Konfiguration, Berechtigungen und Release-Tests bleiben aber bei Ihnen.
4. **Folgekosten**, etwa Add-ons, die später nötig werden, oder der Aufwand, später doch umzusteigen.

Die Frage dahinter ist einfach: Ist der jährliche Wert der zurückgeholten Mengen, der vermiedenen Margenverluste und der eingesparten Handarbeit größer als die jährlichen Kosten für Lizenzen und Betrieb? Kann niemand die erste Zahl schätzen, ist der Business Case noch nicht fertig.

Der Vergleich kippt oft an Punkt 3. Eine schlanke Eigenentwicklung für einen Plan-Ist-Vergleich ist überschaubar. Kommen Verlängerungen, Freigaben, Prognosen und Händlerzugriff dazu, wächst sie zu einem Produkt, das jemand dauerhaft pflegen muss. Wie ich solche Fälle rechne, beschreibe ich unter [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

Ein Punkt gehört noch dazu: Wer die Manufacturing Cloud wegen der Agenten kauft, sollte zuerst die Lizenzsituation und die Daten prüfen. Der Garantie-Agent braucht ein eigenes Add-on, unterstützt den Prüfer, statt selbst zu entscheiden, spricht nur Englisch (USA) und verbraucht Credits. Außerdem kann er nur auf Basis der Anlagen- und Vertragsdaten dahinter prüfen, wie ich in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/) beschreibe.

## Vertrieb und Service befragen

Bevor ein Angebot auf dem Tisch liegt, helfen drei Fragen an den eigenen Vertrieb und Service: Wie viel Prozent des Umsatzes laufen über Rahmenverträge mit Mengen? Wie werden Händlerboni heute gerechnet? Wer prüft Garantieansprüche, und wie lange dauert das? Die Antworten zeigen früher als eine Demo, ob die Manufacturing Cloud zu Ihrem Geschäft passt.

Danach gehört die Frage in die [Salesforce-Architektur](../../leistungen/salesforce-architektur/), mit einem Eintrag im Entscheidungslog, damit die Gründe auch nach einem Partnerwechsel nachvollziehbar bleiben. Das vollständige Bild aus Funktionen, Add-ons und Lizenzen steht in [Kapitel 1 der Masterclass Manufacturing Cloud](../../masterclass/manufacturing-cloud/einordnung-und-business-case/).
