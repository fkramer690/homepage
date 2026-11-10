---
title: "Salesforce Contracts: Reicht das Vertragsmanagement?"
description: "Was Salesforce Contracts vom Angebot bis zur Unterschrift und zu Pflichten abdeckt, was es kostet und wann die Rechtsabteilung ihr eigenes CLM-Werkzeug behält."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: salesforce-contracts-vertragsmanagement
translationKey: salesforce-contracts-revenue-cloud
topic: revenue
categories: [revenue-cloud]
contactBrief: make-or-buy
tags: [Salesforce Contracts, Vertragsmanagement, Revenue Cloud, DocuSign, Klauselbibliothek, Make-or-Buy]
takeaways:
  - "Verträge entstehen über APIs aus einer Opportunity, einem Angebot oder einem Auftrag und starten mit den Daten, die der Vertrieb schon erfasst hat."
  - "Salesforce Contracts steht ab 50 Euro je Nutzer und Monat in der Preisliste, plus Voraussetzungsprodukte. Revenue Cloud Advanced enthält Contracts & Orders."
  - "Die Rechtsabteilung behält ihr eigenes CLM, wenn sie Einkauf, NDAs und Konzernverträge an einer Stelle verwaltet."
  - "Sales Agreements in Manufacturing Cloud und Serviceverträge aus Service Cloud bleiben eigene Objekte. Legen Sie fest, welcher Datensatz welche Frage klärt."
faq:
  - q: "Was ist Salesforce Contracts?"
    a: "Salesforce Contracts ist das Produkt für Vertragsmanagement (Contract Lifecycle Management) von Salesforce und gehört zu Revenue Cloud, die Salesforce inzwischen Revenue Management nennt. Es deckt die Erstellung mit Vorlagen und Klauselbibliothek, die Verhandlung in Word, Freigaben, die elektronische Unterschrift über DocuSign, Aktivierung und Pflichtenverwaltung auf der Salesforce-Plattform ab. Für DocuSign, Word und die KI-Funktionen gelten zusätzliche Voraussetzungen."
  - q: "Was kostet Salesforce Contracts?"
    a: "Die Preisseite von Salesforce nennt Salesforce Contracts ab 50 Euro oder 50 Dollar je Nutzer und Monat bei jährlicher Abrechnung und weist darauf hin, dass für die SKU Voraussetzungsprodukte erforderlich sind. Bei Revenue Cloud Advanced für 200 Euro sind Contracts & Orders als enthalten aufgeführt."
  - q: "Können Juristen Verträge in Word bearbeiten?"
    a: "Ja. Laut Trailhead können Nutzer Vertragsdokumente über die Microsoft-Office-365-Integration in Word online bearbeiten und die Änderungen zurück in Salesforce Contracts speichern. Dafür braucht es Microsoft-365-Lizenzen, eine Azure-App und SharePoint oder OneDrive als Ablage."
  - q: "Ersetzt Salesforce Contracts ein CLM-Werkzeug der Rechtsabteilung?"
    a: "Für standardisierte Kundenverträge aus dem Vertriebsprozess kann es reichen, wenn Erstellung, Redlining, Freigabe, Unterschrift, Ablage und Pflichtenverwaltung die Anforderungen der Rechtsabteilung abdecken. Verwaltet die Rechtsabteilung Einkaufsverträge, NDAs, Arbeitsverträge und Konzernverträge in einem Repository, bleibt meist ein eigenes CLM-Werkzeug, und Salesforce übergibt den unterschriebenen Kundenvertrag."
draft: false
---

Salesforce Contracts reicht für Kundenverträge, die aus dem Vertriebsprozess entstehen: Lieferverträge, Serviceverträge und Rahmenverträge auf Basis Ihrer eigenen Vorlagen. Es erzeugt den Vertrag aus Angebot oder Auftrag, nutzt eine Klauselbibliothek, lässt die Rechtsabteilung in Word arbeiten, schickt den Vertrag über DocuSign zur Unterschrift und verfolgt danach die Pflichten. In der Preisliste steht es ab 50 Euro je Nutzer und Monat, dazu kommen vorausgesetzte Salesforce-Produkte, ein DocuSign-Konto und für Word Microsoft 365. Ein eigenes Werkzeug für das Vertragsmanagement sollte die Rechtsabteilung behalten, wenn sie Einkauf, NDAs und Konzernverträge an einer Stelle führt oder die meisten Verträge auf dem Papier des Kunden entstehen und Salesforce deren Prüfung im Test nicht abdeckt.

## Was ist Salesforce Contracts?

Salesforce Contracts ist das Werkzeug von Salesforce für Contract Lifecycle Management (CLM), also für alles vom Entwurf eines Vertrags bis zur Verlängerung oder Kündigung. Es gehört zu Revenue Cloud, die Salesforce inzwischen Revenue Management nennt; die Editionen heißen auf der Preisseite weiterhin Revenue Cloud Growth und Advanced. Mit dem verwalteten Paket Salesforce CPQ ist das nicht dasselbe: Wer von CPQ kommt, führt Revenue Management neu ein, statt es nur zu aktivieren. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-contracts-foundations/dive-into-salesforce-contracts-capabilities) durchläuft ein Vertrag fünf Phasen: Erstellung, Verhandlung, Freigabe, Ausführung mit elektronischer Unterschrift und Aktivierung.

Für die Architektur zählen zwei Punkte. Erstens legen Vertragstypen fest, um welches Dokument es sich handelt, etwa einen Verkaufsvertrag oder eine Geheimhaltungsvereinbarung. Jeder Typ kann einen eigenen Lebenszyklus haben, mit einem Statusmodell, das regelt, welche Aktionen in welcher Phase erlaubt sind. Zweitens lassen sich Verträge über APIs ohne Oberfläche anlegen und ändern, etwa aus "opportunities, orders, quotes, or any standard Salesforce object" heraus. Der Vertrag beginnt also mit den Daten, die der Vertrieb schon erfasst hat, und nicht mit einem leeren Dokument.

Der [Developer Guide zu Salesforce Contracts](https://developer.salesforce.com/docs/atlas.en-us.clm_developer_guide.meta/clm_developer_guide/clm_objects_overview.htm) nennt die Standardobjekte dahinter, darunter ContractDocumentVersion für Dokumentversionen, DocumentClause für Klauseln, ContractType und Obligation. Für Entscheider heißt das: Verträge sind normale Salesforce-Daten und lassen sich in Berechtigungen, Berichte, Flows und Schnittstellen einbeziehen.

## Vom Angebot bis zur Unterschrift: Vorlagen, Klauseln, Word und DocuSign

Die Erstellung ist der stärkste Teil. Trailhead nennt diese Funktionen:

- **Document Template Designer**, um Vorlagen mit wenig oder ganz ohne IT-Hilfe zu bauen, die mit Daten aus dem Datensatz gefüllt werden.
- **Vorlagenfilter**, damit für einen Vertrag nur die passenden Vorlagen erscheinen.
- **Klauselbibliothek** mit "reusable, pre-approved legal language and terms".
- **Microsoft-365-Integration**: Nutzer bearbeiten das Dokument in Word online und speichern die Änderungen zurück in Salesforce. Die Einrichtung braucht eine Azure-App und SharePoint oder OneDrive als Ablage.
- **Generative KI** für das Erzeugen von Klauseln und das Extrahieren von Vertragsdaten, mit eigenen Lizenzvoraussetzungen.
- **Versionsverwaltung**: Eine Änderung, etwa an der Laufzeit, erzeugt automatisch eine neue Version.
- **DocuSign** für die elektronische Unterschrift.

Für einen Hersteller entscheiden Klauselbibliothek und Word-Integration über die Akzeptanz. Der Vertrieb will aus dem Angebot schnell einen Vertrag, die Rechtsabteilung will freigegebene Klauseln und in Word verhandeln, nicht in einem Webformular. Salesforce Contracts gibt beiden Seiten ihr Werkzeug am selben Datensatz. Weil Word-Dokumente dabei in SharePoint oder OneDrive liegen, legen Sie vorab fest, welche Ablage für Aufbewahrung, Löschung und Berechtigungen führend ist.

Die Freigabe folgt derselben Logik wie bei Angeboten. Haben Sie Freigaben für Rabatte schon modelliert, nutzen Sie dasselbe Freigabe-Framework auch für abweichende Klauseln, mit eigenen fachlichen Regeln: Den Rabatt gibt der Vertrieb frei, die Haftungsklausel gibt die Rechtsabteilung frei, die Zahlungsbedingung die Finanzabteilung. Wie ich eine solche Matrix aufsetze, steht in [Rabattfreigaben in Revenue Cloud](../revenue-cloud-rabattfreigaben/).

## Was passiert nach der Unterschrift?

Nach der Aktivierung verfolgt Salesforce Contracts die Pflichten aus dem Vertrag. Laut der [Trailhead-Einheit zu Obligations](https://trailhead.salesforce.com/content/learn/modules/deep-dive-into-salesforce-contracts/track-and-manage-obligations) ist eine Pflicht eine Zusage aus einem unterschriebenen Vertrag, etwa ein Lieferplan, eine Zahlungsbedingung oder eine Compliance-Anforderung. Jede Pflicht hat einen Verantwortlichen und den Status Compliant, Non-Compliant oder At Risk, und Nutzer bekommen Erinnerungen vor Fristen. Die Einheit zeigt Pflichten, die manuell zum Vertrag angelegt werden. Den Status setzt also ein Mensch, solange keine Schnittstelle ihn aus anderen Systemen ableitet.

Für Maschinenbauer ist das nützlich bei Zusagen, die außerhalb des ERP liegen: Vertragsstrafen bei Lieferverzug, Dokumentationspflichten bei der Abnahme, Kündigungsfristen für Preisanpassungen. Liefertermine und Rechnungen selbst bleiben dort, wo sie verarbeitet werden, meist in SAP. Solche Vorgänge würde ich nicht als Pflichten nachbauen. Soll Salesforce den Status einer Pflicht aus SAP-Daten setzen, etwa bei Lieferverzug, braucht es eine Schnittstelle und eine klar definierte Regel, wann die Pflicht verletzt ist.

Für Vertragsmanager gibt es eine Console-App als zentralen Arbeitsplatz. Salesforce Contracts Analytics, mit Dashboards zu Vertrags- und Lebenszyklusdaten, ist ein kostenpflichtiger Zusatz mit eigenen Analytics-Lizenzen.

## Was kostet Salesforce Contracts?

Die [Preisseite zu Salesforce Contracts](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/contracts-pricing/) nennt einen Preis je Nutzer und Monat bei jährlicher Abrechnung. Enthalten sind Vertragserstellung und Dokumentenablage, Integrationen für Redlining und elektronische Unterschrift sowie Pflichtenverwaltung. Eine Fußnote sagt, dass die SKU "requires prerequisite products". Laut FAQ ist das Produkt auf die Zusammenarbeit mit Sales Cloud ausgelegt.

Nutzen Sie ohnehin Revenue Cloud, sehen Sie sich zuerst die Editionen an. Laut [Preisseite zu Revenue Cloud](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) enthält Revenue Cloud Advanced Contracts & Orders. Für Revenue Cloud Growth führt die Tabelle Contract Lifecycle Management als zukaufbar auf. Enthalten ist es in Growth also nicht.

```kennzahlen
50 € | Salesforce Contracts je Nutzer und Monat (auch 50 $), jährliche Abrechnung, braucht Voraussetzungsprodukte
150 € | Revenue Cloud Growth je Nutzer und Monat, Contract Lifecycle Management zukaufbar
200 € | Revenue Cloud Advanced je Nutzer und Monat, mit Contracts & Orders
quelle: Salesforce-Preisseiten zu Salesforce Contracts und Revenue Cloud
```

```hinweis offen
Aus der Funktionsmatrix auf beiden Preisseiten ist nicht klar erkennbar, welche Edition welche Vertragsfunktion enthält. Lassen Sie sich im Angebot bestätigen, welche Kombination aus Basisprodukt und Contracts gilt, zusammen mit dem, was die DocuSign-Integration auf Seiten von DocuSign voraussetzt.
```

Mehr zur Lizenzplanung finden Sie in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Sales Agreements und Serviceverträge bleiben eigene Objekte

Hersteller mit mehreren Salesforce-Produkten stoßen schnell auf drei Dinge, die "Vertrag" heißen. Sie beantworten unterschiedliche Fragen.

| Datensatz | Produkt | Beantwortet |
|---|---|---|
| Vertrag mit Dokumentversionen | Salesforce Contracts | Was haben wir unterschrieben, mit welchen Klauseln? |
| Sales Agreement | Manufacturing Cloud | Welche Mengen und Preise wurden je Periode vereinbart, und werden sie erreicht? |
| Servicevertrag mit Entitlements | Service Cloud, in Field Service für Arbeitsaufträge genutzt | Welche Anlagen sind abgedeckt, mit welchem Service-Level? |

Das Sales Agreement vergleicht geplante mit tatsächlichen Mengen. Mehr dazu steht in [Sales Agreements und Abnahmemengen](../sales-agreements-abnahmemengen-erp/). Der Servicevertrag mit Entitlements steuert, was der Techniker leisten darf. Mehr dazu steht in [Wartungsverträge in Field Service](../salesforce-field-service-wartungsvertraege/). Salesforce Contracts hält das unterschriebene Dokument. Ein Rahmenvertrag kann alle drei Ebenen betreffen: den Rechtstext, den Mengenplan und die Serviceabdeckung. Legen Sie früh fest, welcher Datensatz für welches Feld führend ist, sonst pflegen Sie die Laufzeit an drei Stellen.

## Wann sollte die Rechtsabteilung ihr eigenes CLM-Werkzeug behalten?

In diesen Fällen würde ich ein bestehendes CLM-Werkzeug außerhalb von Salesforce behalten oder ein neues wählen:

- **Die Rechtsabteilung führt alle Vertragsarten zentral.** Einkaufsverträge, NDAs, Arbeits- und Konzernverträge gehören in ein Repository, und Kundenverträge sind nur ein kleiner Teil.
- **Die meisten Verträge entstehen auf dem Papier des Kunden.** Große OEM-Kunden schicken ihre eigenen Einkaufsbedingungen. Dann zählen Prüfung und Redlining fremder Dokumente mehr als Vorlagen. Salesforce Contracts bietet dafür Redlining in Word und KI-gestützte Extraktion; testen Sie mit echten Kundendokumenten, ob das der Rechtsabteilung reicht.
- **Die Rechtsabteilung arbeitet nicht in Salesforce.** Bräuchten Juristen eine Lizenz nur für die Vertragsprüfung, summiert sich der Preis je Nutzer, und die Akzeptanz leidet.

Dann erzeugt Salesforce die kaufmännischen Daten, und eine Schnittstelle verbindet beide Systeme über eine gemeinsame Vertrags-ID. Ein Rechenbeispiel: Ein Zulieferer von Antriebskomponenten hat eine eigene Rechtsabteilung mit einem bestehenden CLM-Werkzeug für alle Konzernverträge. Der Vertrieb verschickt 300 Standard-Lieferverträge im Jahr aus Angeboten. Hier würde ich die Standardverträge in Salesforce Contracts mit freigegebenen Klauseln und DocuSign erzeugen und nur Verträge mit abweichenden Klauseln schon im Entwurfsstatus an das Werkzeug der Rechtsabteilung übergeben. Die unterschriebene Fassung, der Status und die Fristen werden von dort in den Salesforce-Datensatz zurückgeschrieben. So bleiben Routinefälle schnell, und Ausnahmen bleiben bei den Juristen. Diese Make-or-Buy-Frage gehört zu meiner Arbeit an [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

## Kundenverträge zählen und in drei Gruppen sortieren

Zählen Sie Ihre Kundenverträge pro Jahr und sortieren Sie sie in drei Gruppen: eigene Vorlage ohne Änderungen, eigene Vorlage mit verhandelten Klauseln, Papier des Kunden. Überwiegen die ersten beiden Gruppen, spricht viel für Salesforce Contracts; die Anforderungen der Rechtsabteilung an Ablage, Aufbewahrung und Prüfung müssen trotzdem in die Auswahl einfließen. Bauen Sie dann mit der Rechtsabteilung die Klauselbibliothek, bevor die erste Vorlage entsteht. Wie Verträge in den Prozess vom Angebot zum Auftrag passen, zeigt das Kapitel [Angebot, Vertrag, Auftrag](../../masterclass/revenue-cloud/angebot-vertrag-auftrag/).
