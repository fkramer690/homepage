---
title: "Account Forecasting: Absatzprognose im Vertrieb"
description: "Wann sich Account Forecasting der Manufacturing Cloud für die Absatzprognose lohnt, welche Daten es braucht und wo die Planung im ERP beginnen sollte."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: account-forecasting-absatzprognose-vertrieb
translationKey: manufacturing-cloud-account-forecasting
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Account Forecasting, Absatzprognose, ERP, Fertigung]
series: { id: manufacturing-cloud, part: 4 }
takeaways:
  - "Account Forecasting plant Mengen und Umsätze pro Kunde, Produkt und Zeitraum und rechnet dafür Aufträge, Opportunities und Sales Agreements zusammen."
  - "Die Prognose kann auf der Auftragshistorie aufbauen. Sie liegt bei Herstellern im ERP und muss per Schnittstelle in Salesforce übertragen werden."
  - "Kunden mal Produkte mal Zeiträume ergibt schnell Millionen Datensätze. Salesforce empfiehlt Grenzen, der Zuschnitt gehört vor den Start."
  - "Salesforce liefert die Sicht des Vertriebs, das ERP plant Kapazitäten. Jede Zahl braucht Verantwortliche, Version und Übergabetermin."
faq:
  - q: "Was ist Account Forecasting in der Manufacturing Cloud?"
    a: "Account Forecasting ist die Absatzprognose der Manufacturing Cloud. Sie plant Mengen und Umsätze pro Kunde, Produkt und Zeitraum und nutzt dafür laut Salesforce Aufträge, Opportunities, Sales Agreements und eigene Objekte, die die Data Processing Engine zusammenrechnet."
  - q: "Wie oft wird die Prognose angepasst?"
    a: "Das wird über Anpassungszeiträume festgelegt, zum Beispiel über die erste Woche jedes Monats. In dieser Zeit ändern Account Manager die Werte, danach ist die Prognose für den Zeitraum fest."
  - q: "Ersetzt Account Forecasting die Produktionsplanung?"
    a: "Nein. Account Forecasting liefert die Erwartung des Vertriebs pro Kunde und Produkt. Kapazitäten, Material und Produktionspläne gehören weiter ins ERP oder in ein Planungssystem, das die Vertriebsprognose als Eingangsgröße nutzt."
  - q: "Gibt es Limits für Account Forecasting?"
    a: "Ja. Für Advanced Account Forecasting empfiehlt Salesforce unter anderem höchstens 10 Forecast Sets, 3 eigene Dimensionen, 56 Zeiträume und 4 Neugenerierungen pro Jahr. Auch für die Berechnungsläufe nennt die Hilfe Mengengrenzen; größere Mengen müssen aufgeteilt werden."
draft: false
---

Account Forecasting lohnt sich für Hersteller mit wiederkehrenden Abnahmen, deren Vertrieb Mengen pro Kunde und Produkt über Monate planen soll. Die Funktion der Manufacturing Cloud rechnet Aufträge, Opportunities und Sales Agreements zu einer Absatzprognose zusammen, die Account Manager anpassen. Sie funktioniert nur unter drei Bedingungen: Die Auftragshistorie kommt verlässlich aus dem ERP, der Zuschnitt aus Kunden, Produkten und Zeiträumen passt zu den Mengen, die Salesforce empfiehlt, und es ist klar, wo die Planung im ERP übernimmt.

Diesen Teil der Serie schreibe ich als Leitfaden für die Bewertung, nicht als Projektbericht.

## Was ist Account Forecasting in der Manufacturing Cloud?

Account Forecasting ist die Absatzprognose der Manufacturing Cloud. Sie plant Mengen und Umsätze pro Kunde, Produkt und Zeitraum. In der aktuellen Form, Advanced Account Forecasting, beschreibt die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=ind.aaf_admin_customize_task.htm&type=5) einige Bausteine:

- **Forecast Set:** die Konfiguration für ein Planungsziel, mit Dimensionen, Kennzahlen, Anpassungszeiträumen und Berechnungseinstellungen.
- **Dimensionen:** die Achsen der Prognose, etwa Kunde und Produkt oder Produktkategorie.
- **Period Groups:** Dauer und Anzahl der Zeiträume, also Woche, Monat, Quartal oder Jahr. Für Wochen braucht es laut Hilfe ein eigenes Geschäftsjahr in Salesforce.
- **Data Processing Engine:** der Teil, der Aufträge, Opportunities, Sales Agreements und eigene Objekte filtert und zusammenrechnet. Gesteuert wird das über Flows.

Auf der [Produktseite](https://www.salesforce.com/manufacturing/cloud/sales/) nennt Salesforce dazu Account Manager Targets, mit denen Wachstumsziele für Account Manager in messbare Ziele pro Kunde, Produkt und Region übersetzt werden.

Der Unterschied zur Prognose, die viele aus Sales Cloud kennen: Dort schätzt der Vertrieb vor allem, welche Opportunities in welchem Quartal abgeschlossen werden. Account Forecasting plant das laufende Geschäft mit, also die Mengen, die Bestandskunden Monat für Monat abnehmen. Für einen Hersteller mit viel wiederkehrendem Geschäft ist das oft der größere Teil des Umsatzes.

## Die Prognose braucht Daten aus dem ERP

Eine feste Salesforce-Formel gibt es nicht. Für jede Kennzahl im Forecast Set legt das Unternehmen fest, ob die Data Processing Engine sie berechnet, eine Prognoseformel sie ableitet oder Nutzer den Wert eingeben oder importieren. Die Berechnungsvorlage von Salesforce rechnet Aufträge, Opportunities und Sales Agreements zusammen, und zwei davon liegen bei Herstellern selten in Salesforce:

1. **Auftragshistorie.** Bei Produkten, die Kunden regelmäßig kaufen, ist das, was ein Kunde in den letzten Monaten abgenommen hat, ein guter Ausgangspunkt für die nächsten Monate. Bei neuen Produkten oder nach einer Marktverschiebung sagt sie weniger. Diese Historie liegt im ERP. Trailhead beschreibt genau dieses Problem in seinem Beispiel: Die Prognosen waren ungenau, weil der Vertrieb keinen Zugriff auf die Historie aus dem ERP hatte.
2. **Sales Agreements.** Vereinbarte Mengen sind eine feste Größe in der Prognose. Wie die Ist-Mengen dafür aus dem ERP kommen, beschreibe ich in [Teil 3: Sales Agreements, fehlende Abnahmemengen erkennen](../sales-agreements-abnahmemengen-erp/).
3. **Opportunities.** Neugeschäft, das noch nicht abgeschlossen ist. Das ist die einzige Quelle, die ohnehin in Salesforce entsteht.

```ablauf
sf: Sales Agreements, Opportunities, Absatzprognose
erp: Auftragshistorie, Planung im ERP
Auftragshistorie --Schnittstelle--> Absatzprognose
Sales Agreements --> Absatzprognose
Opportunities --> Absatzprognose
Absatzprognose ..Übergabe..> Planung im ERP
```

Für die Architektur heißt das: Account Forecasting ist zuerst ein Integrationsprojekt. In dem weltweiten Rollout, den ich in Teil 3 beschreibe, kamen Aufträge und Lagerbestände aus dem ERP. Genau diese Daten braucht auch eine Prognose. Wer Account Forecasting einführen will, plant die Schnittstelle für die Auftragshistorie deshalb vor der Konfiguration des Forecast Sets. Wie ich führende Systeme für Aufträge und Preise festlege, steht unter [Integration mit ERP, Middleware und Telefonie](../../leistungen/salesforce-schnittstellen/).

## Wie groß wird die Prognose?

Größer, als man beim ersten Workshop denkt. Advanced Account Forecasting speichert die Werte als Forecast-Fact-Datensätze, je einen pro Kombination aus Dimensionen und Zeitraum. Ein Rechenbeispiel: 2.000 Kunden, 500 Produkte und 24 Monate ergeben bis zu 24 Millionen Kombinationen. Nicht jeder Kunde kauft jedes Produkt, deshalb schätzen Sie zuerst, wie viele Kombinationen tatsächlich vorkommen. Die Größenordnung zeigt trotzdem das Problem.

In den [Hinweisen zu Advanced Account Forecasting](https://help.salesforce.com/s/articleView?id=ind.aaf_considerations_concept.htm&language=en_US&type=5) empfiehlt Salesforce unter anderem höchstens 10 Forecast Sets, 3 eigene Dimensionen, 56 Zeiträume und 4 Neugenerierungen pro Jahr. Auch für die Läufe der Data Processing Engine dahinter nennt die Hilfe Mengengrenzen; größere Mengen müssen aufgeteilt werden. Das sind Empfehlungen, keine harten Grenzen, aber wer darüber plant, sollte es sich von Salesforce bestätigen lassen.

Dieselbe Seite warnt davor, das ältere Account Forecasting und Advanced Account Forecasting gleichzeitig zu aktivieren, weil das Daten beschädigen kann. Salesforce empfiehlt Advanced Account Forecasting für neue Einführungen und eine [Migration](https://help.salesforce.com/s/articleView?id=ind.aaf_admin_migrate_af.htm&language=en_US&type=5) für bestehende. Dieser Artikel behandelt nur Advanced Account Forecasting.

Daraus ergeben sich drei Entscheidungen für den Zuschnitt:

- **Produkt oder Produktkategorie.** Eine Prognose auf Kategorieebene ist um Größenordnungen kleiner und für viele Vertriebsfragen genau genug.
- **Welche Kunden.** Eine Prognose pro Kunde lohnt sich für die großen Kunden mit Rahmenverträgen. Für den langen Rest kann eine Prognose auf Ebene von Region oder Kundengruppe reichen.
- **Wie viele Zeiträume.** 24 Monate Anzeigezeitraum plus Vergangenheit sind schnell eingestellt. Jeder zusätzliche Monat erhöht die Zahl der Datensätze.

Ich lege diesen Zuschnitt fest, bevor das erste Forecast Set aktiviert wird, und rechne die erwartete Zahl der Prognosedatensätze gegen die Mengen, die Salesforce dokumentiert.

## Wie oft und von wem wird angepasst?

Das System berechnet die Prognose, Menschen nehmen die Anpassungen vor. Dafür legt der Admin im Forecast Set Anpassungszeiträume fest, zum Beispiel die erste Woche jedes Monats. In dieser Zeit ändern Account Manager ihre Werte, danach gilt die Prognose für den Zeitraum.

Das verlangt einen festen Rhythmus im Vertrieb. Eine Prognose, die nur angepasst wird, wenn jemand daran denkt, unterscheidet sich nach drei Monaten kaum von der Systemberechnung. Ich frage deshalb vor der Einführung:

- **Wer passt an?** Der Account Manager für seine Kunden, ein Vertriebsleiter für die Region oder beide nacheinander?
- **Wann?** Im selben Rhythmus, in dem auch Produktion und Einkauf planen. Sonst kommt die Vertriebsprognose zu spät für die Entscheidung, für die sie gebraucht wird.
- **Wie werden Abweichungen dokumentiert?** Ein Feld für den Grund einer größeren Anpassung kostet wenig und macht die Zahl später nachvollziehbar.

## Die Absatzprognose endet, wo die Produktionsplanung beginnt

Die Absatzprognose endet bei der Frage, was produziert wird. Account Forecasting liefert die Erwartung des Vertriebs: welcher Kunde welche Menge welchen Produkts in welchem Monat abnehmen wird. Ob diese Menge produziert werden kann, mit welchem Material und auf welcher Anlage, entscheidet die Planung im ERP oder in einem eigenen Planungssystem. Wie Prognosen, Sales Agreements und Ziele zusammenspielen, steht in [Kapitel 2 der Masterclass Manufacturing Cloud](../../masterclass/manufacturing-cloud/rahmenvertraege-und-prognosen/).

Für die Architektur sind zwei Punkte wichtig:

1. **Eine klare Rolle für jede Zahl.** Eine Vertriebsprognose in Salesforce und eine Absatzplanung im ERP dürfen sich unterscheiden, weil die eine die unbeschränkte Sicht des Vertriebs ist und die andere Kapazitäten berücksichtigt. Festgelegt sein muss, welche Zahl welcher Entscheidung dient, wem sie gehört, welche Version wann übergeben wird und wie Kapazitätsgrenzen zurück zum Vertrieb kommen. Zwei Prognosen für denselben Zweck, die beide gepflegt werden, laufen auseinander, und dann diskutieren die Beteiligten im Meeting über Zahlen statt über Kunden.
2. **Passende Granularität.** Fließt die Vertriebsprognose ins ERP, braucht die Schnittstelle dieselbe Granularität wie die Planung dort. Plant das ERP auf Materialnummer und Werk, hilft eine Prognose auf Produktkategorie nur begrenzt.

Ein Hinweis zu Agentforce: Laut Trailhead erzeugt „Agentforce Manufacturing“ zu Beginn jedes Anpassungszeitraums automatisch Prognosen für neue Produkte. Agentforce Manufacturing ist dort der Produktname. So wie ich die Trailhead-Einheit lese, ist das die Prognoseberechnung zum Periodenstart und kein Agent, und die Salesforce-Hilfe zum Sales-Planning-Agenten dokumentiert dafür keinen Subagenten ([was der Agent wirklich kann](../agentforce-vertriebsplanung-rahmenvertraege/)). Automatische Prognosen zum Periodenstart klingen praktisch. Ich würde mich erst darauf verlassen, wenn die Historie aus dem ERP sauber ankommt, weil eine automatische Prognose auf schlechten Daten nur schneller falsch ist.

## Wann lohnt sich Account Forecasting?

Ich würde Account Forecasting empfehlen, wenn mehrere der ersten vier Bedingungen zutreffen:

```pro-contra
pro: Account Forecasting lohnt sich
- **Viel wiederkehrendes Geschäft:** Ein großer Teil des Umsatzes kommt aus regelmäßigen Abnahmen von Bestandskunden.
- **Sales Agreements sind schon geplant:** Die vereinbarten Mengen liegen ohnehin in Salesforce, und die Prognose baut darauf auf.
- **Die Vertriebsprognose liegt heute in Tabellen:** Für jeden Account Manager gibt es eine Datei, die jemand monatlich zusammenführt.
- **Produktion oder Einkauf warten auf die Zahl:** Es gibt einen festen Termin, an dem die Vertriebssicht gebraucht wird.
contra: Zurückhaltend wäre ich
- Bei wenigen, großen Projekten statt laufender Abnahmen.
- Bei einer Absatzplanung, die im ERP gut funktioniert und nur Lesezugriff im CRM braucht.
- Wenn die Auftragshistorie nicht nach Salesforce kommen kann.
```

Im letzten Fall zahlt das Unternehmen für eine Funktion, die mit den eigenen Daten nicht arbeiten kann. Ob sich die Manufacturing Cloud insgesamt lohnt, behandelt [Teil 1 der Serie](../manufacturing-cloud-wann-lohnt-sie-sich/).

## Auftragshistorie und Zuschnitt vor dem ersten Forecast Set klären

Bevor das erste Forecast Set konfiguriert wird, klären Sie diese Punkte:

1. **Auftragshistorie.** Welche Daten kommen aus dem ERP, auf welcher Ebene und wie oft?
2. **Zuschnitt.** Produkt oder Kategorie, welche Kunden, wie viele Zeiträume, gerechnet gegen die empfohlenen Mengen.
3. **Rhythmus.** Wer passt wann an, abgestimmt mit der Planung in Produktion und Einkauf.
4. **Rollen der Zahlen.** Welche Prognose dient welcher Entscheidung, wem gehört sie, und wie kommt sie ins ERP?

Die Größenordnung des Zuschnitts rechne ich im ersten Workshop aus: Kunden mal Produkte mal Zeiträume, verglichen mit den Mengen, die Salesforce empfiehlt. Passen die tatsächlich vorkommenden Kombinationen nicht, plane ich auf Ebene der Produktkategorie und kürze den Horizont, bevor jemand das erste Forecast Set anlegt.
