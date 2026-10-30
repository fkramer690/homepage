---
title: "Manufacturing Cloud: Funktionen, Kosten, Business Case"
description: "Was Salesforce Manufacturing Cloud enthält, was Editionen und Add-ons kosten, wer welche Lizenz braucht und wann Sales Cloud mit Eigenbau die bessere Wahl ist."
lang: de
slug: einordnung-und-business-case
course: manufacturing-cloud
translationKey: mfg-01
chapter: 1
pubDate: 2026-10-28
short: "Einordnung und Business Case"
summary: "Was Manufacturing Cloud enthält, was es kostet und wann Sales Cloud mit Eigenbau die bessere Wahl ist."
takeaways:
  - "Manufacturing Cloud ist eine Branchenlösung auf Sales Cloud und Service Cloud mit eigenem Datenmodell; Trailhead nennt dasselbe Produkt Agentforce Manufacturing."
  - "Laut Preisliste kostet Manufacturing Cloud Sales Core 275 Dollar pro Nutzer und Monat, Sales Cloud Core 195 Dollar. Bei 120 Vertriebsnutzern sind das 115.200 Dollar Aufschlag pro Jahr."
  - "Max kostet 650 statt 275 Dollar und bringt 2,75 Millionen statt 500.000 Flex Credits pro Org und Jahr, zehnmal so viele Omnistudio-Aufrufe und als einzige Edition die volle Agentforce-for-Industries-Suite."
  - "Portallizenzen, das Agentforce-Add-on, Channel Revenue Management und Connected Assets stehen nicht in der Edition und kommen oft erst spät ins Angebot."
  - "Ohne Rahmenverträge, Händlerboni oder Garantieabwicklung über Partner fehlt der Grund für die Branchenlizenz; dann rechne ich Sales Cloud mit Eigenbau über fünf Jahre dagegen."
articles: [manufacturing-cloud-worth-it, manufacturing-cloud-feature-map, manufacturing-cloud-add-ons-costs, salesforce-editions-core-advanced-max, salesforce-licence-types]
faq:
  - q: "Was ist Salesforce Manufacturing Cloud?"
    a: "Manufacturing Cloud ist die Branchenlösung von Salesforce für Hersteller. Sie baut auf Sales Cloud und Service Cloud auf und bringt ein eigenes Datenmodell sowie Funktionen wie Rahmenverträge (Sales Agreements), Absatzprognosen, Händlerboni, Garantieabwicklung und Rückrufaktionen mit."
  - q: "Ist Agentforce Manufacturing dasselbe wie Manufacturing Cloud?"
    a: "Ja. Produkt- und Preisseiten sprechen von Manufacturing Cloud, etwa Manufacturing Cloud Sales Core. Trailhead und die Fußnoten der Preisseite nennen dasselbe Produkt Agentforce Manufacturing."
  - q: "Was kostet Manufacturing Cloud?"
    a: "Laut Preisseite im Oktober 2026 kosten Sales Core und Service Core je 275 Dollar pro Nutzer und Monat, Sales Max und Service Max 650 Dollar und Sales & Service Max 700 Dollar, jeweils mit Jahresvertrag. Zwei Fußnoten zu Enterprise und Unlimited Edition widersprechen sich; der verbindliche Preis steht erst im Angebot."
  - q: "Brauchen alle Nutzer eine Manufacturing-Cloud-Lizenz?"
    a: "Nicht automatisch. Ich ordne Nutzer nach dem zu, was sie im System tun: Rahmenverträge und Prognosen, Garantiefälle, Lesen und Freigeben. Ob ein gemischter Lizenzbestand in Ihrer Org zulässig ist, lassen Sie sich im Angebot schriftlich bestätigen."
  - q: "Enthält Manufacturing Cloud ein Angebotssystem mit Konfigurator?"
    a: "Nein. Die Funktionslisten auf Trailhead und den Produktseiten nennen Produktkatalog-Management, aber kein Angebotssystem mit Konfigurator, Freigaben und Vertragserstellung. Dafür kommen Revenue Cloud, ein Partnerprodukt oder ein Eigenbau infrage."
draft: false
---

Salesforce Manufacturing Cloud lohnt sich, wenn Ihr Geschäft auf Rahmenverträgen mit geplanten Mengen, auf Händlerboni oder auf Garantieabwicklung über Partner läuft. Es ist eine Branchenlösung auf Sales Cloud und Service Cloud und kostet laut Preisliste 80 Dollar pro Nutzer und Monat mehr als Sales Cloud Core. Dazu kommen Add-ons, die nicht in der Edition stecken: Portallizenzen für Händler, Agentforce für Core-Nutzer, Channel Revenue Management und Connected Assets. Passt keine der Kernfunktionen zu Ihrem Vertrieb, ist Sales Cloud mit gezieltem Eigenbau meist günstiger. Die Entscheidung gehört in eine Make-or-Buy-Rechnung über fünf Jahre, mit Lizenzprognose pro Nutzergruppe.

## Was ist Salesforce Manufacturing Cloud?

Manufacturing Cloud ist eine Industry Cloud, also ein Paket für eine Branche, das Salesforce auf Sales Cloud und Service Cloud setzt. Es bringt ein eigenes Datenmodell für Hersteller und Funktionen mit, die die Standardprodukte nicht haben. Trailhead beschreibt es im [Quick Look zu Agentforce Manufacturing](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) als Erweiterung der Kernprodukte Agentforce Sales und Agentforce Service, so heißen dort Sales Cloud und Service Cloud.

Damit ist auch die Namensfrage beantwortet. Die [Preisseite](https://www.salesforce.com/manufacturing/cloud/pricing/) verkauft „Manufacturing Cloud Sales Core“, ihre Fußnoten sprechen von „Agentforce Manufacturing for Sales“. Es ist ein Produkt mit zwei Namen. Ich schreibe in dieser Masterclass Manufacturing Cloud, weil das Angebot so heißen wird. Wichtiger ist eine Folge des neuen Namens: Nicht jede Funktion mit „Agentforce“ im Namen ist ein Agent. Fragen Sie bei jeder nach Subagent, Aktion und Lizenz.

## Welche Funktionen stecken in Manufacturing Cloud?

Die Funktionen lassen sich nach vier Bereichen ordnen. Die Liste folgt dem Trailhead Quick Look und den Produktseiten:

| Bereich | Funktionen | Kapitel |
|---|---|---|
| Vertrieb | Rahmenverträge (Sales Agreements), Account Forecasting und Advanced Account Forecasting, Programmgeschäft, Account Manager Targets, Besuchsmanagement | 2 |
| Service | Service Console und Asset Service Console, Warranty Lifecycle Management, Product Service Campaigns, Aufwandsschätzung vor Arbeitsbeginn, Bestandsfunktionen | 4 |
| Kanal | Rebate Management, Partner Lead, Partner Performance und Partner Visit Management | 3 |
| Werkzeuge | Omnistudio, Business Rules Engine, Data Processing Engine | alle |

Welche Frage jede Funktion beantwortet und wo sie aufhört, steht in [Manufacturing Cloud Funktionen: was enthalten ist](../../../blog/manufacturing-cloud-funktionen-ueberblick/). Für den Business Case sind zwei Punkte daraus entscheidend.

Erstens hat fast jede Vertriebs- und Partnerfunktion einen eigenen Schalter. Die [Metadaten IndustriesManufacturingSettings](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm) führen je ein Feld für Rahmenverträge, Account Forecasts, Advanced Forecasting, Targets, Programme und die drei Partnerfunktionen, alle standardmäßig auf false. Eine Lizenz sagt also nichts darüber, was in Ihrer Org läuft. Eine Org kann jahrelang Manufacturing Cloud bezahlen und nur Rahmenverträge nutzen.

Zweitens stehen in der Funktionsliste auch Dinge, die Salesforce getrennt verkauft. Trailhead führt Ship and Debit und Price Protection unter „Rebates“ und Connected Assets unter „Agentforce Service“. Auf der [Add-on-Seite](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) haben beide einen eigenen Preis.

Was in keiner dieser Listen steht, ist ein Angebotssystem mit Konfigurator, Freigaben und Vertragserstellung. Trailhead nennt nur Produktkatalog-Management. Angebote und Konfiguration behandelt die Masterclass zu Revenue Cloud, beginnend mit dem [Überblick und der Entscheidung](../../revenue-cloud/revenue-cloud-ueberblick/) und dem Kapitel zu [Produktkatalog, Konfigurator und Preisen](../../revenue-cloud/produktkatalog-konfigurator-preise/).

## Was kostet Manufacturing Cloud im Vergleich zu Sales Cloud?

Die Listenpreise im Oktober 2026, pro Nutzer und Monat, jährlich abgerechnet, laut [Manufacturing-Cloud-Preisseite](https://www.salesforce.com/manufacturing/cloud/pricing/) und [Sales-Cloud-Preisseite](https://www.salesforce.com/sales-cloud/pricing/):

| Edition | Sales Cloud | Manufacturing Cloud |
|---|---|---|
| Core | 195 Dollar | 275 Dollar (Sales Core oder Service Core) |
| Advanced | 395 Dollar | nicht ausgewiesen |
| Max | 550 Dollar | 650 Dollar (Sales Max oder Service Max) |
| Sales & Service Max | | 700 Dollar |

```kennzahlen
80 Dollar | Aufschlag in Core pro Nutzer und Monat
960 Dollar | Aufschlag in Core pro Nutzer und Jahr
115.200 Dollar | Aufschlag pro Jahr bei 120 Vertriebsnutzern
quelle: Preisseiten von Manufacturing Cloud und Sales Cloud, Listenpreise Oktober 2026
```

Die Preisseite nennt auch Euro-Preise, für Sales Core 275 Euro.

Eine Unklarheit gehört in jede Kalkulation. Die Preisseite hat zwei Fußnoten, die sich widersprechen. Die eine sagt, die Preise gelten für Enterprise Edition, und Unlimited koste 425 Dollar. Die andere sagt, sie gelten für Unlimited Edition, und Enterprise koste 275 Dollar. Welcher Preis für Ihre Edition gilt, zeigt erst das Angebot. Außerdem hat Salesforce [im September 2026 angekündigt](https://www.salesforce.com/in/news/?p=14535), dass „new pricing for Agentforce Industry Editions will go into effect later this fall“. Die Seite der Manufacturing Cloud nutzt schon Core und Max, ihre Fußnoten sprechen aber noch von Enterprise und Unlimited. Wie sich die neuen Editionen unterscheiden, steht in [Salesforce-Editionen Core, Advanced und Max](../../../blog/salesforce-editionen-core-advanced-max/). Wer jetzt verlängert, sollte sich den Wechsel der Edition offenhalten, bis die Branchenpreise feststehen.

### Core oder Max: was sich außer dem Preis ändert

Der Abstand zwischen Core und Max ist groß, und er kauft mehr als Agenten. Die Preisseite listet pro Edition:

| Pro Edition | Core | Max |
|---|---|---|
| Flex Credits | 500.000 pro Org und Jahr | 2.750.000 pro Org und Jahr |
| Omnistudio-Aufrufe | 100.000 pro Monat | 1.000.000 pro Monat |
| Business-Rules-Engine-Aufrufe | 10.000 pro Monat | 50.000 pro Monat |
| Datenspeicher | 20 MB pro Nutzer | 1 GB pro Nutzer |
| Agentforce | über Flex Credits | volle Agentforce-for-Industries-Suite |

Flex Credits sind die Verbrauchswährung, in der Salesforce Agentenaktionen, Prompts und Datenverarbeitung abrechnet. Wie weit ein Pool reicht, rechnet das Kapitel [Kosten und Token](../../ki-salesforce/kosten-und-token/) der KI-Masterclass vor. Die Pools gelten pro Org, unabhängig von der Zahl der Nutzer.

Für Hersteller zählen die Aufrufgrenzen oft mehr als die Credits. Omnistudio baut geführte Prozesse, die Business Rules Engine prüft Regeln, etwa bei der Freigabe von Garantieansprüchen. Laufen Garantie, Boni und Portalprozesse auf diesen Engines, sind 10.000 Regelaufrufe im Monat schnell erreicht. Für Max spricht aus meiner Sicht nur ein Bedarf an Funktionen, den Core nicht abdeckt. Für mehr Credits allein ist Max zu teuer.

## Welche Add-ons kommen später ins Angebot?

Die Edition ist die erste Zeile eines Angebots. Die folgenden Add-ons stehen auf der Add-on-Seite und gehören von Anfang an in die Kalkulation, nicht erst in die letzte Angebotsrunde:

| Add-on | Preis und Umfang |
|---|---|
| Portallizenzen | Experience Cloud for Manufacturing kostet für Kunden 15 Dollar pro Login oder 35 Dollar pro Mitglied und Monat, für Partner 20 oder 50 Dollar. Wer Händler anbindet, braucht sie fast immer. |
| Agentforce for Manufacturing Cloud Add-on | Die Add-on-Seite nennt 150 Dollar pro Nutzer und Monat, die Preisseite „ab 150 Dollar“ pro Login. Die Einheit gehört schriftlich ins Angebot. |
| Channel Revenue Management for Manufacturing | 30.000 Dollar pro Org und Jahr, hier liegen Ship and Debit und Price Protection für Distributoren. |
| Connected Assets | 15.000 Dollar pro Org und Monat, jährlich abgerechnet, für Maschinendaten in Salesforce. |
| Omnistudio-Zusatzaufrufe | 2 Millionen Aufrufe für 10.000 Dollar pro Monat, eine kleinere Einheit gibt es nicht. |
| Manufacturing Intelligence | Die [eigene Seite](https://salesforce.com/manufacturing/cloud/manufacturing-intelligence) nennt 220 Dollar pro Login und Monat, die [Experience-Cloud-Seite](https://salesforce.com/manufacturing/cloud/experience-cloud) „ab 165 Dollar“ ohne Einheit. Dieselbe Seite listet Rebate Management „ab 75 Dollar“, ebenfalls ohne Einheit. |

Wie viel das in einem angenommenen Szenario mit 150 Nutzern und 400 Händlern ausmacht, rechnet [Manufacturing Cloud Add-ons: was extra kostet](../../../blog/manufacturing-cloud-zusatzkosten-add-ons/) vor. Dort erhöhen die typischen Add-ons die Lizenzzeile um etwa 40 Prozent.

## Wer braucht welche Lizenz?

Das Angebot eines Partners oder Account Teams geht oft davon aus, dass alle Nutzer die Branchenlizenz bekommen. Ich baue stattdessen eine Lizenzprognose nach Tätigkeit:

1. **Vertrieb mit Rahmenverträgen und Prognosen** braucht Sales Core oder Sales Max.
2. **Sachbearbeitung für Garantieansprüche und Rückrufe** arbeitet mit Servicefunktionen, also Service Core oder Service Max. Wer beide Seiten braucht, landet bei Sales & Service Max für 700 Dollar.
3. **Lesen, Freigeben, Berichte** braucht oft keine volle Lizenz. Ob eine Platform-Lizenz die nötigen Objekte sehen darf, etwa einen Rahmenvertrag, klären Sie vor dem Kauf. Grenzen und Preise der Platform-Lizenzen stehen in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../../../blog/salesforce-lizenzen-volle-lizenz/).
4. **Händler und Kunden** bekommen Portallizenzen, Mitglied bei häufiger Nutzung, Login bei seltener.
5. **Schnittstellen** zum ERP laufen über Integrationsnutzer ohne Oberfläche.

```hinweis offen
Welche Funktionen ein Sales-Core-Nutzer aus dem Servicebereich nutzen darf, steht nicht auf der Preisseite. Ob ein gemischter Bestand aus Core, Max und Sales Cloud in einer Org zulässig ist, ebenfalls nicht. Beides lassen Sie sich schriftlich bestätigen, bevor die Lizenzzahl in den Vertrag geht.
```

## Wann ist Manufacturing Cloud die falsche Wahl?

Der wichtigste Fall: Ihr Vertrieb arbeitet nicht mit langfristigen Mengenvereinbarungen. Rahmenverträge sind die zentrale Vertriebsfunktion. Ein Rahmenvertrag hält Preise und geplante Mengen pro Kunde, Produkt und Periode fest und stellt ihnen die Ist-Mengen gegenüber. In [Teil 1 der Serie](../../../blog/manufacturing-cloud-wann-lohnt-sie-sich/) beschreibe ich ein Fertigungsprojekt, in dem genau diese Funktion keine Rolle spielte; dort war ein Eigenbau auf der Plattform günstiger und leichter zu warten.

Der zweite Fall: Rahmenverträge und Abrufe liegen bereits sauber im ERP. Dann stellt sich die Frage, ob Salesforce sie überhaupt führen soll. Zwei Systeme, die beide Mengen und Preise pflegen, laufen früher oder später auseinander. Oft reicht es, wenn Salesforce die Zahlen aus dem ERP anzeigt.

Der dritte Fall: Das eigentliche Problem liegt im Angebot, mit vielen Varianten und Konfigurationsregeln. Manufacturing Cloud löst es nicht. Dann gehört die Entscheidung zu Revenue Cloud oder einem anderen Weg für Angebote, und Manufacturing Cloud kommt höchstens später für die Rahmenverträge dazu.

## Lohnt sich Manufacturing Cloud für einen Maschinenbauer ohne Rahmenverträge?

Nur, wenn eine andere Funktion den Aufschlag allein trägt. Ein Maschinenbauer verkauft oft Einzelanlagen im Projektgeschäft, ohne wiederkehrende Mengen. Dann fällt der Hauptgrund weg, und drei Kandidaten bleiben:

- **Garantie über Händler.** Ansprüche kommen von außen über ein Portal und werden heute von Hand geprüft. Warranty Lifecycle Management mit Regeln für die Freigabe kann das tragen. Das ist eine Servicefunktion, die Nutzer brauchen also Service Core.
- **Rückrufe und Nachrüstungen** über viele ausgelieferte Maschinen. Product Service Campaigns setzen eine gepflegte installierte Basis mit Seriennummern voraus.
- **Händlerboni**, die heute in Tabellen berechnet werden.

Trifft keiner dieser Punkte klar zu, bleibe ich bei Sales Cloud und Service Cloud. Die Funktionen im Detail behandeln [Kapitel 3 zum Händlerkanal](../haendler-und-partnerkanal/) und [Kapitel 4 zu Garantie und After-Sales](../garantie-und-after-sales/).

## Make-or-Buy über fünf Jahre

Die Entscheidung zwischen Branchenlösung und Eigenbau ist eine Make-or-Buy-Frage über mehrere Jahre. Der Preis im ersten Jahr ist dabei die am wenigsten interessante Zahl. Für beide Varianten rechne ich vier Blöcke:

1. **Lizenzen pro Nutzergruppe**, mit erwartetem Wachstum und den Add-ons aus dem Fahrplan.
2. **Einführung** durch interne Teams und Partner. Auch eine Branchenlösung muss konfiguriert, angebunden und getestet werden.
3. **Wartung und Releases.** Eigener Code verursacht bei jedem der drei Salesforce-Releases im Jahr Aufwand. Eine Standardfunktion entwickelt Salesforce weiter.
4. **Folgekosten**, etwa ein späterer Wechsel oder Add-ons, die erst im dritten Jahr nötig werden.

Ein typisches Szenario, als Annahme: Ein Komponentenhersteller mit 120 Vertriebsnutzern will Plan gegen Ist pro Kunde und Produkt sehen. Die Listenpreise stammen von den Preisseiten, alle anderen Zahlen sind Annahmen.

| Fünf Jahre | Manufacturing Cloud Sales Core | Sales Cloud Core mit Eigenbau |
|---|---|---|
| Lizenzaufschlag, 120 Nutzer | 576.000 Dollar | 0 |
| Einführung Rahmenverträge | 80.000 Dollar | 150.000 Dollar |
| Wartung und Releases | 50.000 Dollar | 150.000 Dollar |
| **Summe** | **706.000 Dollar** | **300.000 Dollar** |

Für eine schlanke Plan-gegen-Ist-Ansicht gewinnt der Eigenbau deutlich. Das Bild dreht sich, sobald Verlängerungen, Freigaben, Prognosen, Händlerzugriff und Boni dazukommen. Jede dieser Funktionen erhöht Einführung und Wartung im Eigenbau, während der Lizenzaufschlag gleich bleibt. Rechnen Sie deshalb den Funktionsumfang, den Sie in drei Jahren brauchen, und nicht nur den ersten Schritt.

Das Ergebnis gehört in ein Entscheidungsprotokoll: welche Funktionen geprüft wurden, welche Zahlen galten, wer entschieden hat. Nach einem Partnerwechsel ist das oft das einzige Dokument, das erklärt, warum die Org so aussieht, wie sie aussieht. Wie ich solche Rechnungen aufbaue, beschreibe ich unter [Make-or-Buy und Lizenzprognosen](../../../leistungen/make-or-buy-lizenzen/); die Einordnung in die Gesamtarchitektur gehört zur [Salesforce-Architektur](../../../leistungen/salesforce-architektur/).

## Womit sollten Sie anfangen?

Bevor ein Angebot auf dem Tisch liegt, helfen drei Fragen an Vertrieb und Service: Welcher Anteil des Umsatzes läuft über Mengenvereinbarungen? Wie werden Händlerboni heute berechnet? Wer prüft Garantieansprüche, und wie lange dauert das? Die Antworten zeigen schneller als jede Demo, ob Manufacturing Cloud passt. Liegt schon ein Angebot vor, prüfen Sie es gegen die Checkliste aus dem Funktionsüberblick: jede Funktion aus dem Business Case mit der Lizenz, die sie abdeckt.

Lautet die Antwort Rahmenverträge, geht es in [Kapitel 2 um Rahmenverträge und Prognosen](../rahmenvertraege-und-prognosen/) weiter, mit den Daten, die dafür aus dem ERP kommen müssen. Alle Kapitel finden Sie auf der [Übersichtsseite](../).

Manufacturing Cloud lohnt sich, wenn seine Kernfunktionen zu Ihrem Geschäft passen, und eine Rechnung über fünf Jahre zeigt das früher als der erste Workshop.
