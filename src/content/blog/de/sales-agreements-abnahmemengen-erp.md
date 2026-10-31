---
title: "Sales Agreements: Fehlende Abnahmemengen erkennen"
description: "Wie Hersteller mit Sales Agreements und ERP-Daten sehen, welche Kunden hinter ihren Abnahmemengen liegen, und warum der Lagerbestand danebengehört."
pubDate: 2026-10-26
lang: de
slug: sales-agreements-abnahmemengen-erp
translationKey: manufacturing-cloud-sales-agreements-actuals
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Sales Agreements, ERP, Integration, Fertigung]
series: { id: manufacturing-cloud, part: 3 }
takeaways:
  - "Den Actuals Calculation Mode übernimmt jedes Sales Agreement bei der Anlage. Eine spätere Änderung gilt nur für neue Agreements."
  - "Bei internationalen Kunden mit vielen Gesellschaften ist die Account-Ebene des Sales Agreements jedes Mal eine eigene Entscheidung."
  - "Der Lagerbestand gehört als Kennzahl neben die Abweichung. Erst beides zusammen zeigt, welche offenen Mengen sich realistisch noch liefern lassen."
  - "Salesforce zeigt die Lücke. Wie sie geschlossen wird, verhandeln Menschen, abhängig von Saison und Größe der Abweichung."
faq:
  - q: "Woher kommen die Ist-Mengen in einem Sales Agreement?"
    a: "Aus Aufträgen in Salesforce, die direkt oder über Verträge mit dem Sales Agreement verknüpft sind, aus einem Upload per API oder aus einer eigenen Data-Processing-Engine-Definition. Liegen die Aufträge im ERP, müssen sie oder ihre Summen per Schnittstelle nach Salesforce kommen."
  - q: "Wie oft werden die Ist-Mengen aktualisiert?"
    a: "Laut Salesforce-Hilfe berechnet ein täglicher automatischer Lauf die Ist-Mengen. Für ein aktiviertes Sales Agreement kann ein Nutzer die Berechnung zusätzlich von Hand anstoßen."
  - q: "Kann ich den Lagerbestand im Sales Agreement anzeigen?"
    a: "Ja, als eigene Kennzahl. Laut Trailhead legt man dafür Zahlenfelder auf Sales Agreement Product und Sales Agreement Product Schedule an und ordnet sie in den Field Mappings for Custom Metrics zu. Die Werte selbst muss eine Schnittstelle liefern, etwa aus dem ERP."
  - q: "Muss ich alle ERP-Aufträge nach Salesforce übertragen?"
    a: "Nein. Für den Plan-Ist-Vergleich reichen Summen pro Kunde, Produkt und Zeitraum, die per API geladen werden. Ganze Aufträge lohnen sich, wenn Vertrieb oder Service sie in Salesforce ohnehin sehen sollen."
draft: false
---

Mit Sales Agreements sieht der Vertrieb, welche Kunden hinter ihren vereinbarten Abnahmemengen liegen, aber nur, wenn die Ist-Mengen aus dem ERP zuverlässig pro Kunde, Produkt und Zeitraum in Salesforce ankommen. Genau das war in einem weltweiten Manufacturing-Cloud-Rollout, den ich begleitet habe, die zentrale Frage: Welche Kunden haben ihre Mengen noch nicht abgenommen, und wie lassen sich die offenen Mengen noch realisieren, mit Blick auf das aktuelle Lager? Drei Entscheidungen bestimmen, ob das funktioniert: wie die Ist-Mengen berechnet werden, auf welcher Ebene der Account-Struktur das Sales Agreement liegt und ob der Lagerbestand danebensteht.

## Welche Frage beantwortet ein Sales Agreement im Alltag?

Was ein Sales Agreement ist und wann sich die Manufacturing Cloud dafür lohnt, beschreibe ich in [Manufacturing Cloud vs. Sales Cloud: Wann lohnt sie sich?](../manufacturing-cloud-wann-lohnt-sie-sich/). Hier geht es um den Betrieb danach.

Im Alltag stellt der Vertrieb eine einfache Frage: Wer liegt hinter seiner Zusage? Ein Kunde hat für das Jahr eine Menge zugesagt, aufgeteilt in Monate oder Quartale. Pro Zeitraum und Produkt stehen im Sales Agreement geplante Menge, tatsächliche Menge und Prognose nebeneinander. Die Abweichung ist die Zahl, mit der Account Manager arbeiten.

Diese Zahl hängt an den Ist-Mengen dahinter. Die Planmengen pflegt der Vertrieb beim Abschluss selbst. Die Ist-Mengen entstehen bei Herstellern fast immer woanders, im ERP, wo Aufträge angelegt, bestätigt und ausgeliefert werden. Damit wird die Frage nach den Abnahmemengen zuerst eine Frage der Schnittstelle.

## Woher kommen die Ist-Mengen, wenn die Aufträge im ERP liegen?

Salesforce bietet laut [Hilfe](https://help.salesforce.com/apex/HTViewHelpDoc?id=sa_admin_actualscalc_task.htm&language=en_us) vier Wege, die über die Einstellung Actuals Calculation Mode gewählt werden:

| Modus | Woher die Ist-Mengen kommen | Passt, wenn |
|---|---|---|
| Automatically from direct orders | Aktive Aufträge in Salesforce, die mit dem Sales Agreement verknüpft sind | Aufträge ohne Verträge in Salesforce liegen |
| Automatically from orders through contracts | Aktive Aufträge, die über Verträge mit dem Sales Agreement verknüpft sind | Aufträge über Verträge laufen |
| Manually using API upload | Mengen, die eine Schnittstelle in regelmäßigen Abständen hochlädt | Aufträge und Verträge in einem externen System liegen |
| Data Processing Engine | Eine angepasste Berechnung, etwa aus Aufträgen oder eigenen Objekten | die Standardlogik nicht reicht |

Laut [Salesforce-Hilfe zu den Actuals](https://help.salesforce.com/s/articleView?id=sf.mfg_sa_actuals_parent.htm&language=en_US&type=5) berechnet ein täglicher Lauf die Werte, und für ein aktiviertes Sales Agreement lässt sich die Berechnung zusätzlich von Hand anstoßen. Wer morgens eine Liste der Kunden mit Rückstand erwartet, bekommt also den Stand des letzten Laufs. Für Abnahmemengen über Monate reicht das in der Regel.

Ein Detail aus der Hilfe hat Folgen für die Planung:

```hinweis achtung
Jedes Sales Agreement übernimmt den Modus bei seiner Anlage. Ändert der Admin den Standard später, gilt das nur für neue Agreements.
```

Wer mit einem Modus startet und nach einem Jahr umstellt, hat zwei Sorten von Agreements in der Org. Ich lege den Modus deshalb fest, bevor das erste produktive Sales Agreement angelegt wird, und schreibe die Entscheidung ins Entscheidungslog.

Liegen die Aufträge im ERP, gibt es zwei Architekturen:

- **Aufträge nach Salesforce replizieren.** Die Aufträge kommen als Order-Datensätze nach Salesforce und werden mit dem Sales Agreement verknüpft. Vorteil: Vertrieb und Service sehen die Aufträge selbst, nicht nur Summen. Nachteil: mehr Datenvolumen, und die Verknüpfung zum richtigen Agreement muss die Schnittstelle oder eine Automatisierung herstellen.
- **Summen per API laden.** Das ERP oder die Middleware rechnet die Mengen pro Kunde, Produkt und Zeitraum und lädt nur diese Werte. Vorteil: schlank, und das ERP bleibt die einzige Stelle, an der Aufträge gezählt werden. Nachteil: Wer wissen will, welche Aufträge hinter einer Zahl stehen, muss ins ERP schauen.

```ablauf
sf: Order-Datensätze, Sales Agreement
erp: ERP-Aufträge
ext: Middleware
ERP-Aufträge --Replikation--> Order-Datensätze
Order-Datensätze --verknüpft--> Sales Agreement
ERP-Aufträge --> Middleware
Middleware --Summen per API--> Sales Agreement
```

Welche Variante passt, hängt davon ab, was Salesforce sonst noch über Aufträge wissen muss. Die Grundregel ist dieselbe wie bei jeder Integration: ein führendes System pro Datenart. Wie ich das für Kunden, Produkte, Preise und Aufträge aufteile, beschreibe ich unter [Integration mit ERP, Middleware und Telefonie](../../leistungen/salesforce-schnittstellen/). Welche Daten insgesamt zwischen SAP und der Manufacturing Cloud fließen, steht in [Manufacturing Cloud und SAP: welche Daten wohin](../manufacturing-cloud-sap-integration-datenfluesse/).

## Was ich im Projekt gesehen habe

```praxis
Bei einem globalen Hersteller habe ich einen weltweiten Rollout der Manufacturing Cloud begleitet. Der wichtigste Grund für die Lizenz waren die Sales Agreements. Der Vertrieb sollte erkennen, welche Kunden ihre vereinbarten Mengen noch nicht abgenommen hatten, und planen, wie sich die offenen Mengen noch realisieren lassen. Sowohl die Aufträge als auch die Lagerbestände kamen aus dem ERP.
```

Flughöhe, Lagerbestand und Verhandlung waren schwieriger, als die Funktion vermuten lässt.

Die Flughöhe zuerst. Ein Sales Agreement hängt an einem Account. Bei einem internationalen Kunden mit einer großen Account-Struktur, also Konzern, Landesgesellschaften und Werke, stellt sich die Frage, auf welcher Ebene die Zusage gilt. Das ist nicht immer einfach und hängt vom Kunden ab. Dazu mehr im nächsten Abschnitt.

Dann der Lagerbestand. Eine Abweichung allein sagt noch nicht, was zu tun ist. Ob ein Rückstand ein Problem ist, hängt davon ab, ob die Ware im Lager liegt und Platz braucht oder ob sie ohnehin knapp ist.

Und schließlich die Verhandlung. Wie eine offene Menge realisiert wird, verhandeln Menschen miteinander, individuell pro Kunde. Es kommt auf die Saison an und darauf, wie stark die Abweichung ist. Salesforce liefert die Grundlage für dieses Gespräch und ersetzt es nicht.

## Auf welcher Ebene der Account-Struktur gehört ein Sales Agreement hin?

Die Antwort hängt davon ab, wer die Zusage gegeben hat und wo die Aufträge ankommen. Drei typische Konstellationen:

- **Zusage und Aufträge auf derselben Ebene.** Eine Landesgesellschaft verhandelt ihre Mengen selbst und bestellt selbst. Dann gehört das Sales Agreement an diesen Account, und die Zuordnung der Ist-Mengen ist einfach.
- **Zusage auf Konzernebene, Aufträge aus den Werken.** Der Einkauf des Konzerns verhandelt eine Gesamtmenge, bestellt wird von mehreren Gesellschaften. Dann muss die Schnittstelle Aufträge mehrerer Auftraggeber im ERP auf ein Agreement zusammenführen, oder es gibt ein Agreement pro Gesellschaft mit einer Summe darüber.
- **Gemischt.** Ein Teil der Produkte wird zentral verhandelt, ein Teil lokal. Das kommt bei großen Kunden häufiger vor, als man beim Design hofft.

Die zweite Konstellation entscheidet sich oft an der Kundennummer im ERP. Steht dort der Auftraggeber, aber nicht der Konzern, braucht die Schnittstelle eine Zuordnungstabelle, die jemand pflegt. Ohne sie landen Ist-Mengen am falschen Agreement, und der Bericht zeigt einen Rückstand, den es nicht gibt. Diese Pflege ist ein Prozess mit einem Verantwortlichen, keine einmalige Datenmigration.

Ich kläre die Ebene deshalb pro Kunde, nicht einmal für alle. Für die großen Kunden mit Rahmenverträgen ist das eine Liste von überschaubarer Länge, und jede Zeile darauf erspart später eine Diskussion über falsche Zahlen.

## Der Lagerbestand gehört neben die Abweichung

Eine Liste der Kunden mit Rückstand ist ein guter Anfang. Handeln kann der Vertrieb erst, wenn er weiß, ob die offene Menge lieferbar ist und ob sie das Lager belastet.

Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/configure-sales-agreements-to-negotiate-better) lässt sich der Lagerbestand als eigene Kennzahl im Sales Agreement mitführen. Dazu legt man Zahlenfelder auf Sales Agreement Product und Sales Agreement Product Schedule an und ordnet sie in den Field Mappings for Custom Metrics zu. Die Werte selbst kommen aus einem externen System, und wie sie hineinkommen, ist wieder Sache der Schnittstelle.

Zwei Beispiele, wie sich dieselbe Abweichung unterschiedlich lesen lässt:

- **Rückstand bei vollem Lager.** Die Ware ist produziert, der Kunde ruft nicht ab, und der Lagerplatz wird für anderes gebraucht. Hier lohnt sich das Gespräch zuerst.
- **Rückstand bei knappem Lager.** Die Ware ist ohnehin knapp. Ein Kunde, der weniger abruft, entlastet gerade, und ein vorgezogener Abruf würde andere Kunden treffen.

Dazu kommt die Saison. Ein Rückstand im ersten Quartal kann bei saisonalem Geschäft normal sein und sich bis zum Sommer von selbst ausgleichen. Eine gute Ansicht zeigt deshalb Abweichung, Lager und Zeitraum zusammen, damit niemand im Februar einen Kunden anruft, der im Juni ohnehin bestellt.

## Die Verhandlung bleibt beim Menschen

Salesforce kann Kunden nach Abweichung sortieren, Lager und Saison danebenstellen und eine Aufgabe für den Account Manager anlegen. Ob ein Kunde einen Preisnachlass bekommt, einen Abruf vorzieht oder die Zusage im nächsten Jahr angepasst wird, entscheiden Menschen, die den Kunden kennen.

Ich würde diesen Schritt auch nicht automatisieren wollen. Die Gründe für einen Rückstand reichen von einer schwachen Saison beim Kunden bis zu einem Wettbewerber, der gerade billiger liefert, und keine Kennzahl im System kennt sie. Wer Agenten auf solche Daten ansetzen möchte, sollte zuerst die Datenqualität prüfen, wie ich in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/) beschreibe.

## Erster Schritt: Modus für die Ist-Mengen festlegen

Bevor das erste Sales Agreement produktiv angelegt wird, klären Sie diese Punkte:

1. **Modus für die Ist-Mengen.** Aufträge in Salesforce oder Summen per API, festgelegt vor dem ersten Agreement.
2. **Ebene pro Kunde.** Für jeden großen Kunden mit Rahmenvertrag: An welchem Account hängt die Zusage, und welche Auftraggeber im ERP gehören dazu?
3. **Lagerbestand als Kennzahl.** Welches System liefert ihn, wie oft und auf welcher Ebene?
4. **Die Ansicht für den Vertrieb.** Welche Liste sieht ein Account Manager am Montagmorgen, und was tut er damit?

Den Modus lege ich mit dem ERP-Team fest, bevor das erste Agreement angelegt wird, weil eine spätere Änderung nur für neue Agreements gilt. Die Liste für Montagmorgen baue ich danach mit zwei Account Managern.
