---
title: "Händler und Partnerkanal in der Manufacturing Cloud"
description: "Händlerboni, Ship and Debit, Partnerportal und Händlerbesuche in der Manufacturing Cloud: was es gibt, was es kostet und welche Daten aus dem ERP kommen."
lang: de
slug: haendler-und-partnerkanal
course: manufacturing-cloud
translationKey: mfg-03
chapter: 3
pubDate: 2026-10-28
short: "Händler und Partnerkanal"
summary: "Händlerboni, Ship and Debit, Partnerportal und Händlerbesuche: was Manufacturing Cloud für den Vertrieb über Händler bietet."
takeaways:
  - "Für den Händlerkanal gibt es rund um Manufacturing Cloud Rebate Management, ein Partnerportal und Partner Visit Management; Ship and Debit und Preisschutz kommen mit Channel Revenue Management als Add-on."
  - "Channel Revenue Management for Manufacturing steht mit 30.000 Dollar pro Org und Jahr in der Add-on-Liste; Partnerzugang wird laut Salesforce zusätzlich gekauft."
  - "Händler, die Boni sehen, Ansprüche einreichen oder Sales Agreements nutzen, brauchen Partner Community for Manufacturing: 20 Dollar pro Login oder 50 Dollar pro Mitglied und Monat."
  - "Partner Visit Management, Partner Lead Management und Partner Performance Management haben eigene Schalter seit API-Version 56.0 und sind standardmäßig aus."
  - "Salesforce rechnet und gibt frei, das ERP zahlt aus. Bestellen mit Katalog, Warenkorb und Checkout gehört zu B2B Commerce, nicht ins Partnerportal."
articles: [manufacturing-cloud-rebate-management, channel-revenue-ship-and-debit, manufacturing-cloud-customer-portal, manufacturing-cloud-partner-visit-management, partner-sales-assistant-dealer-quotes, distributor-replenishment-agent]
faq:
  - q: "Welche Lizenz brauchen Händler im Partnerportal der Manufacturing Cloud?"
    a: "Partner Community for Manufacturing, laut Add-on-Liste 20 Dollar pro Login oder 50 Dollar pro Mitglied und Monat. Customer Community Plus for Manufacturing kostet 15 oder 35 Dollar, ist aber für Kunden gedacht; Bonusansprüche und Leads nennt Salesforce Help nur für die Partnerlizenz. Lassen Sie sich den Umfang im Angebot bestätigen."
  - q: "Was ist der Unterschied zwischen Rebate Management und Ship and Debit?"
    a: "Rebate Management belohnt Menge: Ein Händler erreicht über einen Zeitraum eine Staffel und bekommt nachträglich einen Bonus. Ship and Debit gleicht einen Sonderpreis für einen bestimmten Endkunden aus, Anspruch für Anspruch."
  - q: "Was kostet Channel Revenue Management for Manufacturing?"
    a: "Die Add-on-Seite der Manufacturing Cloud nennt 30.000 Dollar pro Org und Jahr. Die allgemeine Preisseite nennt keinen Preis, verlangt eine Sales-Cloud- oder CRM-Lizenz und führt Partnerzugang, zusätzliche Benutzer und Auszahlungen als zukaufbar. Eine andere Seite nennt Rebate Management ab 75 Dollar ohne Einheit."
  - q: "Können Händler im Partnerportal Ersatzteile bestellen?"
    a: "Einfache Bestellungen ja. Wer Händlern einen Katalog mit ihren Preisen, Warenkorb, Checkout und Nachbestellung geben will, braucht B2B Commerce. Diese Grenze sollte vor dem Portalprojekt entschieden sein."
draft: false
---

Für den Vertrieb über Händler gibt es rund um Manufacturing Cloud vier Bausteine: Rebate Management für Händlerboni, Channel Revenue Management für Ship and Debit und Preisschutz, ein Partnerportal auf Experience Cloud for Manufacturing und Partner Visit Management für Händlerbesuche. Welche Sie brauchen, hängt vom Kanalmodell ab. Händler, die weiterverkaufen, brauchen Boni, Portal und Besuche; Distributoren mit eigenem Lager und Projektgeschäft brauchen zusätzlich Ship and Debit. Salesforce rechnet und gibt frei, ausgezahlt wird im ERP. Teuer wird es an zwei Stellen: Channel Revenue Management steht mit 30.000 Dollar pro Org und Jahr in der Liste, und jeder Händler im Portal braucht eine Partnerlizenz.

## Welche Kanalmodelle gibt es bei Herstellern?

Bevor Sie über Funktionen sprechen, lohnt ein Blick darauf, wie Ihre Ware zum Endkunden kommt. Hersteller nutzen typischerweise drei Modelle, oft nebeneinander:

| Kanalmodell | Typisch für | Was in der Manufacturing Cloud passt |
|---|---|---|
| Direkter Vertrieb an Schlüsselkunden | Komponenten, Serienteile für OEMs | Sales Agreements und Prognosen aus [Kapitel 2](../rahmenvertraege-und-prognosen/), Kundenportal |
| Händler, die weiterverkaufen und Service leisten | Landmaschinen, Baumaschinen, Nutzfahrzeuge | Rebate Management, Partnerportal, Partner Visit Management, Garantie über Händler |
| Distributoren mit eigenem Lager | Elektronik, Antriebstechnik, Industriebedarf | zusätzlich Ship and Debit, Preisschutz, Bestandsdaten der Distributoren |

Die Tabelle ist meine Einordnung, keine Vorgabe von Salesforce. Sie hilft beim Lesen eines Angebots: Ein Partner, der einem Händlernetz mit 80 Landmaschinenhändlern Ship and Debit verkauft, löst vermutlich ein Problem, das Sie nicht haben. Umgekehrt reicht einem Distributionsgeschäft mit vielen Sonderpreisen ein Bonusprogramm nicht.

Ob sich Manufacturing Cloud insgesamt rechnet, behandelt [Kapitel 1](../einordnung-und-business-case/). Dieses Kapitel geht davon aus, dass die Entscheidung gefallen ist, und klärt, welche Kanalfunktionen Sie einschalten, kaufen oder weglassen.

## Händlerboni mit Rebate Management

Rebate Management verwaltet Bonusprogramme: Programm, Teilnehmer, Bonusarten mit Staffeln, Auszahlungszeiträume und die Freigabe der Beträge. Gerechnet wird mit der Data Processing Engine auf Basis von Transaktionen im Objekt Transaction Journal. Die Details, auch die drei Wege, auf denen Umsätze in dieses Objekt kommen, stehen in [Rebate Management: Händlerboni statt Excel](../../../blog/rebate-management-haendlerboni/).

Für die Entscheidung zählen drei Punkte:

- **Die Umsätze kommen fast immer aus dem ERP.** Rechnungen entstehen dort, also liefert eine Schnittstelle sie als Transaktionen. Ohne diese Schnittstelle rechnet Rebate Management mit dem, was zufällig in Salesforce liegt.
- **Was als bonusrelevanter Umsatz zählt, entscheidet kein System.** Bestellung, Lieferung oder Rechnung, mit oder ohne Retouren, welche Produktgruppen: Das gehört schriftlich festgelegt, bevor das erste Programm angelegt wird.
- **Salesforce zahlt nicht aus.** Freigegebene Beträge und Rückstellungen gehen ins ERP, die Buchhaltung bucht dort die Gutschrift.

Lohnend wird das ab Dutzenden Händlern mit gestaffelten Programmen, die heute jemand in einer Tabelle rechnet. Einen einfachen Jahresbonus für fünf Kunden kann das ERP oft über Konditionen abbilden, ohne zweite Logik in Salesforce.

## Ship and Debit und Preisschutz mit Channel Revenue Management

Ship and Debit ist ein Sonderpreis für ein Geschäft. Salesforce beschreibt es auf [Trailhead](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) als Vertrag, der den rabattierten Preis für einen bestimmten Kunden, die Laufzeit und die Produkte festlegt. Der Distributor verkauft unter seinem Einkaufspreis und fordert die Differenz beim Hersteller ein. Preisschutz gleicht Lagerware aus, wenn der Hersteller den Listenpreis senkt. Beides prüft Channel Revenue Management gegen Programmregeln und Transaktionsdaten. Wie ein Anspruch durchläuft und welche Prüfungen Salesforce beschreibt, steht in [Ship and Debit: Händleransprüche in Salesforce](../../../blog/ship-and-debit-preisschutz-haendler/).

Beim Preis widersprechen sich die Salesforce-Seiten:

| Quelle | Aussage |
|---|---|
| [Add-ons der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) | Channel Revenue Management for Manufacturing, 30.000 Dollar pro Org und Jahr, mit den Sales-Editionen Core und Advanced sowie Max |
| [Preisseite Channel Revenue Management](https://www.salesforce.com/sales/channel-revenue-management/pricing/) | kein Preis, Angebot auf Anfrage; verlangt eine Sales-Cloud- oder CRM-Lizenz; enthält 10 Channel-Manager-Admins; Partnerzugang, weitere Benutzer und Auszahlungen zukaufbar |
| [Experience-Cloud-Seite der Manufacturing Cloud](https://salesforce.com/manufacturing/cloud/experience-cloud) | Rebate Management „from $75“, ohne Einheit |

```hinweis offen
Die 75 Dollar passen nicht zu den 30.000. Ich würde mir schriftlich geben lassen, ob Rebate Management in Ihrer Edition schon enthalten ist, was das Add-on zusätzlich kostet und wie viele Auszahlungen der Preis abdeckt.
```

Inhaltlich ist die Grenze einfach: Boni belohnen Menge über einen Zeitraum, Ship and Debit und Preisschutz gleichen Preis aus, Geschäft für Geschäft. Ship and Debit braucht Abverkaufs- und Bestandsdaten der Distributoren. Ohne sie prüft die Validierung nur, ob die Belege zum Programm passen, und nicht, ob der Verkauf stattgefunden hat.

## Welche Lizenz brauchen Händler im Partnerportal?

Partner Community for Manufacturing. Die [Add-on-Liste](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) nennt zwei Portallizenzen der Experience Cloud for Manufacturing, jeweils pro Monat:

| Lizenz | Pro Login | Pro Mitglied | Gedacht für |
|---|---|---|---|
| Partner Community for Manufacturing | 20 Dollar | 50 Dollar | Händler, Distributoren, Lieferanten |
| Customer Community Plus for Manufacturing | 15 Dollar | 35 Dollar | Kunden |

Was jede Lizenz abdeckt, beschreibt Salesforce Help; die Übersicht habe ich in [Kundenportal in der Manufacturing Cloud](../../../blog/manufacturing-cloud-kundenportal/) aufbereitet. Für die Partnerlizenz nennt Help unter anderem Sales Agreements, Account Forecasts, Leads, Angebote, Garantie- und Bonusansprüche und Besuche. Für Customer Community Plus nennt Help Cases, Knowledge, Bestellungen, Assets und Garantien. Ein Händler, der seinen Bonusstand sehen, Ship-and-Debit-Ansprüche einreichen oder Leads bearbeiten soll, braucht also die Partnerlizenz. Die günstigere Kundenlizenz spart nur dort, wo Händler wie Kunden behandelt werden.

Drei Entscheidungen fallen vor dem Bau:

1. **Login oder Mitglied.** Welche Variante günstiger ist, hängt davon ab, wie oft sich ein Händlerbenutzer anmeldet. Lassen Sie sich die Zählweise im Angebot erklären und rechnen Sie mit echten Anmeldezahlen, falls es heute schon ein Portal gibt.
2. **Was Händler sehen.** Das Sales Agreement trägt Felder wie Marge und Kosten. Händler sehen eine reduzierte Sicht, mit Mengen, Preisen, Laufzeit und Ist-Mengen, und nur ihre eigenen Kunden.
3. **Wer die Stammdaten führt.** Ändert ein Händler im Portal seine Adresse, wird Salesforce für dieses Feld zum Erfassungssystem. Eine Liste der änderbaren Felder, eine Richtung pro Feld und sichtbare Fehler bei der Übertragung ins ERP gehören dazu.

Wie Sie Lizenzen über fünf Jahre gegen einen Eigenbau rechnen, beschreibe ich unter [Make-or-Buy und Lizenzprognosen](../../../leistungen/make-or-buy-lizenzen/).

## Händlerbesuche mit Partner Visit Management

Partner Visit Management plant Besuche bei Händlern und Distributoren und macht sie vergleichbar. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/partner-visit-management-for-dealers-and-distributors/get-started-with-partner-visit-management) hat ein Besuch Ort, Anweisungen und einen zugewiesenen Außendienstler. Aufgaben geben dem Besuch einen Zweck, etwa Quartalsziele besprechen oder Bestand prüfen, und tragen Kennzahlen wie Anzahl Ersatzteile, Ausschussquote oder Termine für Sicherheitsschulungen. Der Außendienst erfasst die Istwerte am Handy, der Innendienst vergleicht sie mit den Sollwerten.

Die Funktion hat einen eigenen Schalter. In den [IndustriesManufacturingSettings](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm) heißt er `enablePartnerVisitManagement`, verfügbar seit API-Version 56.0, daneben `enablePartnerLeadManagement` und `enablePartnerPerformanceManagement`. Alle drei stehen standardmäßig auf aus. „Wir haben Manufacturing Cloud“ heißt also noch nicht, dass Besuche, Partner-Leads oder Partnerleistung laufen. Im Angebot sollte stehen, welche dieser Funktionen der Partner einrichtet.

```hinweis offen
Zwei Punkte sind in den Quellen offen: welche Lizenz der Außendienst für die Besuchs-App braucht und ob sie offline arbeitet. Beides gehört schriftlich geklärt, bevor Sie planen.
```

Den Ablauf vom Besuchsplan bis zur Kennzahl und die Frage, wann ein einfaches Besuchsberichtsobjekt reicht, behandelt [Partner Visit Management: Händlerbesuche mit KPIs](../../../blog/partner-visit-management-haendlerbesuche/). Meine kurze Regel: Ohne fünf vereinbarte Kennzahlen mit Sollwert pro Händlergruppe sammelt die Funktion Daten, die niemand vergleicht.

## Händlerleistung messen: Dashboards und ihre Daten

Die [CRM-Analytics-Vorlage für Manufacturing Cloud](https://trailhead.salesforce.com/content/learn/modules/crm-analytics-dashboards-for-account-manager-targets/explore-sales-targets) bringt vorkonfigurierte Dashboards mit, die der Admin auf Startseiten und Datensatzseiten einbettet. Für den Kanal sind diese relevant:

- **Rebate Program Embedded** auf dem Bonusprogramm: Programmleistung, Rangliste der Teilnehmer und Produkte, Kandidaten für Zusatzverkauf.
- **Order Rebates Embedded** auf dem Auftrag: zugehörige Bonusprogramme und die Käufe, die einem Teilnehmer bis zur nächsten Staffel fehlen.
- **Account Insights Embedded** auf dem Account: Wirkung der Bonusprogramme auf den Umsatz des Kunden.

Für Ship and Debit nennt die [Trailhead-Einheit](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) ebenfalls CRM-Analytics-Dashboards. Welche CRM-Analytics-Lizenz dafür nötig ist, sagen die Einheiten nicht.

Jedes dieser Dashboards zeigt nur, was als Daten ankommt. Rechnungen als Transaktionen kommen aus dem ERP, Abverkauf und Lagerbestand der Distributoren kommen von den Distributoren selbst, per Upload, EDI oder Schnittstelle. Wenn ein Händler wöchentlich meldet, ist jede Zahl bis zu sieben Tage alt, und das Dashboard sollte das Datum der letzten Meldung zeigen. Welche Daten zwischen ERP und Salesforce fließen, entscheide ich im Rahmen der [Schnittstellenarchitektur](../../../leistungen/salesforce-schnittstellen/).

## Agenten im Kanal: erst lesen, dann schreiben

Für den Kanal nennt Salesforce zwei Agentenfunktionen. Der AI Partner Sales Assistant aus Summer '26 soll laut [Produktseite](https://www.salesforce.com/manufacturing/cloud/) Produkte finden und Angebote bauen; für dasselbe Release nennt die Seite die Automatisierung der Distributor-Beschaffung. Was er an Katalog, Preisen pro Händlerstufe und Rabattgrenzen voraussetzt, steht in [KI-Angebote für Händler: Partner Sales Assistant](../../../blog/ki-angebote-haendler-partner-sales-assistant/). Die Inventory-Vorlage von Agentforce for Manufacturing sucht Bestände, fasst sie zusammen und legt Nachschubanforderungen an; die Details stehen in [Händlerbestand und Nachschub mit Agentforce](../../../blog/haendlerbestand-nachschub-agentforce/).

Das Agentforce for Manufacturing Cloud Add-on steht mit 150 Dollar pro Benutzer und Monat in der [Add-on-Liste](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/), verfügbar mit Core und Advanced. Welche Lizenz Händler im Portal für die Agenten brauchen, war in den Quellen nicht zu finden.

Meine Reihenfolge im Kanal:

```schritte
Lesend starten
  Bestandszusammenfassung, Bonusstand, Status einer Anfrage.
Vorschläge statt Aufträge
  Der Agent bereitet einen Nachschub oder ein Angebot vor, ein Mensch oder das ERP bestätigt.
Schreiben hinter Sperren
  Schreibende Aktionen nur hinter Sperren im Code: Kreditstatus aus dem ERP, Mengengrenze, Bestätigung durch den Händler, Prüfung auf Dubletten.
```

Jedes Feld, das ein Händler im Portal beschreibt, ist Eingabe von außen, die ein Agent liest. Wie Sie das absichern, steht in [Prompt Injection im Händlerportal](../../../blog/prompt-injection-haendlerportal-agentforce/). Wo diese Agenten neben den übrigen Agenten in der Fertigung stehen, zeigt das Kapitel [KI-Agenten in der Fertigung](../../ki-salesforce/ki-agenten-in-der-fertigung/) der KI-Masterclass.

## Wo endet das Partnerportal und wo beginnt B2B Commerce?

Beim Warenkorb. Das Partnerportal der Manufacturing Cloud zeigt Händlern ihre Sales Agreements, Boni, Leads und Garantieansprüche und nimmt Anfragen und einfache Bestellungen an. Sobald Händler Ersatzteile aus einem Katalog mit ihren eigenen Preisen suchen, in einen Warenkorb legen, auf Rechnung bestellen und regelmäßig nachbestellen sollen, brauchen Sie einen Shop. Das ist B2B Commerce, mit eigener Lizenz und eigenem Projekt.

Beides läuft auf Experience Cloud und kann in einer Org zusammenleben. Die Frage ist, wer was baut und wer was bezahlt. Ich würde vor dem Portalprojekt festlegen, welche Händleraktionen ins Portal gehören und welche in den Shop, sonst baut der Portalpartner einen halben Warenkorb nach. Wann sich ein Shop lohnt, behandelt das erste Kapitel der [B2B-Commerce-Masterclass](../../b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/).

## Ein typisches Szenario, als Annahme

Ein Hersteller von Kompaktmaschinen verkauft über 80 Händler in Deutschland, Österreich und der Schweiz, mit jeweils drei Portalbenutzern. Ersatzteile gehen zusätzlich über sechs Distributoren. Alle Zahlen sind Annahmen.

- **Rebate Management:** ja. Drei Staffeln, quartalsweise, heute in einer Tabelle beim Vertriebsinnendienst. Die Rechnungen kommen nachts aus SAP ins Transaction Journal.
- **Partnerportal:** 240 Händlerbenutzer mit Partner Community for Manufacturing. Als Mitgliedslizenz zum Listenpreis sind das 240 × 50 × 12 = 144.000 Dollar im Jahr, bevor über Login-Lizenzen oder Rabatte gesprochen wurde.
- **Partner Visit Management:** ja, nach einem Pilot in einer Region mit fünf Kennzahlen.
- **Ship and Debit:** nein. Sechs Distributoren mit wenigen Sonderpreisen rechtfertigen keine 30.000 Dollar im Jahr; schärfere Freigaberegeln reichen.
- **Agenten:** später, lesend, nachdem Bonusdaten und Bestände ein Quartal lang gestimmt haben.

Die größte Position ist hier das Portal und nicht die Bonuslogik. Händlerbenutzer fehlen in einem ersten Angebot leicht, deshalb würde ich sie vor jeder Lizenzverhandlung zählen, ebenso wie die Rollen der Partner, die das Portal bauen; das gehört zur [Partnersteuerung](../../../leistungen/partnersteuerung/).

Garantieansprüche, die Händler einreichen, und Rückrufaktionen über das Händlernetz behandelt [Kapitel 4](../garantie-und-after-sales/). Alle Kapitel finden Sie auf der [Übersichtsseite](../).

Der Händlerkanal in der Manufacturing Cloud lohnt sich, wenn Sie die Funktionen nach Ihrem Kanalmodell auswählen und Portallizenzen und ERP-Daten vor dem ersten Programm einplanen.
