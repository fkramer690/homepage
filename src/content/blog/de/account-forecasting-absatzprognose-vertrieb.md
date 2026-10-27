---
title: "Account Forecasting: Absatzprognose im Vertrieb"
description: "Wann sich Account Forecasting der Manufacturing Cloud für die Absatzprognose lohnt, welche Daten es braucht und wo die Planung im ERP beginnen sollte."
pubDate: 2026-10-27
lang: de
slug: account-forecasting-absatzprognose-vertrieb
translationKey: manufacturing-cloud-account-forecasting
topic: data
tags: [Manufacturing Cloud, Account Forecasting, Absatzprognose, ERP, Fertigung]
series: { id: manufacturing-cloud, part: 4 }
takeaways:
  - "Account Forecasting plant Mengen und Umsätze pro Kunde, Produkt und Zeitraum und rechnet dafür Aufträge, Opportunities und Sales Agreements zusammen."
  - "Die Prognose ist nur so gut wie die Auftragshistorie dahinter. Bei Herstellern liegt sie im ERP und muss per Schnittstelle nach Salesforce."
  - "Kunden mal Produkte mal Zeiträume ergibt schnell Millionen Kombinationen. Salesforce zählt die Prognosedatensätze gegen ein Limit, deshalb gehört der Zuschnitt vor den Start."
  - "Salesforce liefert die Sicht des Vertriebs. Kapazitäten, Material und Produktionsplanung bleiben im ERP oder im Planungssystem, und eine Zahl muss als führend gelten."
faq:
  - q: "Was ist Account Forecasting in der Manufacturing Cloud?"
    a: "Account Forecasting ist die Absatzprognose der Manufacturing Cloud. Sie plant Mengen und Umsätze pro Kunde, Produkt und Zeitraum und nutzt dafür laut Salesforce Aufträge, Opportunities, Sales Agreements und eigene Objekte, die die Data Processing Engine zusammenrechnet."
  - q: "Wie oft wird die Prognose angepasst?"
    a: "Das legt ein Anpassungszeitraum fest, zum Beispiel die erste Woche jedes Monats. In dieser Zeit ändern Account Manager die Werte, danach ist die Prognose für den Zeitraum fest."
  - q: "Ersetzt Account Forecasting die Produktionsplanung?"
    a: "Nein. Account Forecasting liefert die Erwartung des Vertriebs pro Kunde und Produkt. Kapazitäten, Material und Produktionspläne gehören weiter ins ERP oder in ein Planungssystem, das die Vertriebsprognose als Eingang nutzt."
  - q: "Gibt es Limits für Account Forecasting?"
    a: "Ja. Salesforce zählt unter anderem die Prognosedatensätze pro Kunde, Produkt und Zeitraum sowie Neuberechnungen gegen ein Limit. Wird es überschritten, laufen weitere Berechnungen erst wieder, wenn alte Datensätze gelöscht sind."
draft: false
---

Account Forecasting lohnt sich für Hersteller, deren Vertrieb Mengen pro Kunde und Produkt über Monate planen soll und deren Geschäft zu großen Teilen aus wiederkehrenden Abnahmen besteht. Die Funktion der Manufacturing Cloud rechnet Aufträge, Opportunities und Sales Agreements zu einer Prognose zusammen, die Account Manager anpassen. Sie trägt aber nur, wenn die Auftragshistorie aus dem ERP verlässlich ankommt, wenn der Zuschnitt aus Kunden, Produkten und Zeiträumen ins Limit passt und wenn klar ist, wo die Planung im ERP übernimmt. Diesen Teil der Serie schreibe ich als Leitfaden für die Bewertung, nicht als Projektbericht.

## Was ist Account Forecasting in der Manufacturing Cloud?

Account Forecasting ist die Absatzprognose der Manufacturing Cloud. Sie plant Mengen und Umsätze pro Kunde, Produkt und Zeitraum. In der aktuellen Form, Advanced Account Forecasting, beschreibt die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=ind.aaf_admin_customize_task.htm&type=5) einige Bausteine:

- **Forecast Set:** die Konfiguration für ein Planungsziel, mit Dimensionen, Kennzahlen, Anpassungszeiträumen und Berechnungseinstellungen.
- **Dimensionen:** die Achsen der Prognose, etwa Kunde und Produkt oder Produktkategorie.
- **Period Groups:** Dauer und Anzahl der Zeiträume, also Woche, Monat, Quartal oder Jahr. Für Wochen braucht es laut Hilfe ein eigenes Geschäftsjahr in Salesforce.
- **Data Processing Engine:** der Teil, der Aufträge, Opportunities, Sales Agreements und eigene Objekte filtert und zusammenrechnet. Gesteuert wird das über Flows.

Auf der [Produktseite](https://www.salesforce.com/manufacturing/cloud/sales/) nennt Salesforce dazu Account Manager Targets, mit denen Wachstumsziele für Account Manager in messbare Ziele pro Kunde, Produkt und Region übersetzt werden.

Der Unterschied zur Prognose, die viele aus Sales Cloud kennen: Dort schätzt der Vertrieb vor allem, welche Opportunities in welchem Quartal abschließen. Account Forecasting plant das laufende Geschäft mit, also die Mengen, die Bestandskunden Monat für Monat abnehmen. Für einen Hersteller mit viel wiederkehrendem Geschäft ist das oft der größere Teil des Umsatzes.

## Welche Daten braucht die Prognose?

Drei Quellen tragen die Prognose, und zwei davon liegen bei Herstellern selten in Salesforce:

1. **Auftragshistorie.** Was ein Kunde in den letzten Monaten abgenommen hat, ist der beste Ausgangspunkt für die nächsten. Diese Historie liegt im ERP. Trailhead beschreibt genau dieses Problem in seinem Beispiel: Die Prognosen waren ungenau, weil der Vertrieb keinen Zugriff auf die Historie aus dem ERP hatte.
2. **Sales Agreements.** Vereinbarte Mengen sind eine feste Größe in der Prognose. Wie die Ist-Mengen dafür aus dem ERP kommen, beschreibe ich in [Teil 3: Sales Agreements, fehlende Abnahmemengen erkennen](../sales-agreements-abnahmemengen-erp/).
3. **Opportunities.** Neugeschäft, das noch nicht abgeschlossen ist. Das ist die einzige Quelle, die ohnehin in Salesforce entsteht.

Für die Architektur heißt das: Account Forecasting ist zuerst ein Integrationsprojekt. In dem weltweiten Rollout, den ich in Teil 3 beschreibe, kamen Aufträge und Lagerbestände aus dem ERP. Genau diese Daten braucht auch eine Prognose. Wer Account Forecasting einführen will, plant die Schnittstelle für die Auftragshistorie deshalb vor der Konfiguration des Forecast Sets. Wie ich führende Systeme für Aufträge und Preise festlege, steht unter [Integration mit ERP, Middleware und Telefonie](../../leistungen/salesforce-schnittstellen/).

## Wie groß wird die Prognose?

Größer, als man beim ersten Workshop denkt. Die Prognose speichert einen Wert pro Kunde, Produkt und Zeitraum. Ein Rechenbeispiel: 2.000 Kunden, 500 Produkte und 24 Monate ergeben 24 Millionen mögliche Kombinationen. Nicht jeder Kunde kauft jedes Produkt, aber die Größenordnung zeigt das Problem.

Salesforce zählt diese Datensätze gegen ein Limit. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/define-account-forecast-settings) zeigt das Setup den Verbrauch für Prognosedatensätze pro Kunde, Produkt und Zeitraum, für Neuberechnungen und für Neugenerierungen, mit einer Ampel von grün bis rot. Wird das Limit bei einer Neugenerierung überschritten, läuft sie noch zu Ende. Danach laufen weitere Berechnungen und der Wechsel in den nächsten Zeitraum erst wieder, wenn alte Datensätze gelöscht sind.

Daraus ergeben sich drei Entscheidungen für den Zuschnitt:

- **Produkt oder Produktkategorie.** Eine Prognose auf Kategorieebene ist um Größenordnungen kleiner und für viele Vertriebsfragen genau genug.
- **Welche Kunden.** Eine Prognose pro Kunde lohnt sich für die großen Kunden mit Rahmenverträgen. Für den langen Rest kann eine Prognose auf Ebene von Region oder Kundengruppe reichen.
- **Wie viele Zeiträume.** 24 Monate Anzeige plus Vergangenheit sind schnell eingestellt. Jeder zusätzliche Monat multipliziert die Datensätze.

Ich lege diesen Zuschnitt fest, bevor das erste Forecast Set aktiviert wird, und rechne die erwartete Zahl der Datensätze gegen das Limit, das im Angebot steht.

## Wie oft und von wem wird angepasst?

Die Prognose rechnet das System, die Anpassung machen Menschen. Laut Trailhead legt der Admin dafür eine Anpassungsfrequenz und einen Anpassungszeitraum in Tagen fest, zum Beispiel die erste Woche jedes Monats. In dieser Zeit ändern Account Manager ihre Werte, danach gilt die Prognose für den Zeitraum.

Das verlangt einen festen Rhythmus im Vertrieb. Eine Prognose, die nur angepasst wird, wenn jemand daran denkt, unterscheidet sich nach drei Monaten kaum von der Rechnung des Systems. Ich frage deshalb vor der Einführung:

- **Wer passt an?** Der Account Manager für seine Kunden, ein Vertriebsleiter für die Region oder beide nacheinander?
- **Wann?** Im selben Rhythmus, in dem auch Produktion und Einkauf planen. Sonst kommt die Vertriebsprognose zu spät für die Entscheidung, für die sie gebraucht wird.
- **Wie wird abgeweicht?** Ein Feld für den Grund einer größeren Anpassung kostet wenig und macht die Zahl später nachvollziehbar.

## Wo endet die Absatzprognose in Salesforce?

Bei der Frage, was produziert wird. Account Forecasting liefert die Erwartung des Vertriebs: welcher Kunde welche Menge welchen Produkts in welchem Monat abnehmen wird. Ob diese Menge produziert werden kann, mit welchem Material und auf welcher Anlage, entscheidet die Planung im ERP oder in einem eigenen Planungssystem.

Für die Architektur sind zwei Punkte wichtig:

1. **Eine führende Zahl.** Gibt es eine Vertriebsprognose in Salesforce und eine Absatzplanung im ERP, muss festgelegt sein, welche Zahl gilt und wann sie übergeben wird. Zwei Prognosen, die beide gepflegt werden, laufen auseinander, und dann diskutiert das Meeting über Zahlen statt über Kunden.
2. **Eine Richtung.** Fließt die Vertriebsprognose ins ERP, braucht die Schnittstelle dieselbe Granularität wie die Planung dort. Plant das ERP auf Materialnummer und Werk, hilft eine Prognose auf Produktkategorie nur begrenzt.

Ein Hinweis zu Agentforce: Laut Trailhead erzeugt Agentforce Manufacturing zu Beginn jedes Anpassungszeitraums automatisch Prognosen für neue Produkte. Das klingt praktisch. Ich würde es erst nutzen, wenn die Historie aus dem ERP sauber ankommt, weil eine automatische Prognose auf schlechten Daten nur schneller falsch ist.

## Wann lohnt sich Account Forecasting?

Ich würde Account Forecasting empfehlen, wenn mehrere dieser Punkte zutreffen:

- **Viel wiederkehrendes Geschäft.** Ein großer Teil des Umsatzes kommt aus regelmäßigen Abnahmen von Bestandskunden.
- **Sales Agreements sind schon geplant.** Dann liegen die vereinbarten Mengen ohnehin in Salesforce, und die Prognose baut darauf auf.
- **Die Vertriebsprognose wird heute in Tabellen gepflegt.** Pro Account Manager eine Datei, die jemand monatlich zusammenführt.
- **Produktion oder Einkauf warten auf die Zahl.** Es gibt einen festen Termin, an dem die Vertriebssicht gebraucht wird.

Zurückhaltend wäre ich bei wenigen, großen Projekten statt laufender Abnahmen, bei einer Absatzplanung, die im ERP gut funktioniert und nur Lesezugriff im CRM braucht, und wenn die Auftragshistorie nicht nach Salesforce kommen kann. Dann zahlt das Unternehmen für eine Funktion, die mit den eigenen Daten nicht arbeiten kann. Ob sich die Manufacturing Cloud insgesamt lohnt, behandelt [Teil 1 der Serie](../manufacturing-cloud-wann-lohnt-sie-sich/).

## Wo sollten Sie anfangen?

Bevor das erste Forecast Set konfiguriert wird, klären Sie vier Punkte:

1. **Auftragshistorie.** Welche Daten kommen aus dem ERP, auf welcher Ebene und wie oft?
2. **Zuschnitt.** Produkt oder Kategorie, welche Kunden, wie viele Zeiträume, gerechnet gegen das Limit.
3. **Rhythmus.** Wer passt wann an, abgestimmt mit der Planung in Produktion und Einkauf.
4. **Führende Zahl.** Welche Prognose gilt, und wie kommt sie ins ERP?

Account Forecasting ist eine gute Absatzprognose, wenn die Daten aus dem ERP stimmen und klar ist, wo die Planung übernimmt. Wenn Sie gerade bewerten, ob die Funktion zu Ihrem Vertrieb passt, [schreiben Sie mir](#contact).
