---
title: "Salesforce-Editionen Core, Advanced, Max für Hersteller"
description: "Was die Editionen Core, Advanced und Max für die Lizenzplanung von Herstellern bedeuten, wie weit die Flex-Credit-Pools reichen und wann Credits Max tragen."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: salesforce-editionen-core-advanced-max
translationKey: salesforce-editions-core-advanced-max
topic: governance
categories: [architecture, ai]
contactBrief: licences
tags: [Lizenzen, Editionen, Flex Credits, Agentforce, Make-or-buy, Maschinenbau]
takeaways:
  - "Core, Advanced und Max kosten in Sales und Service Cloud 195 €, 395 € und 550 € pro Nutzer und Monat; bisherige Editionen behalten ihre Preise."
  - "Die Pools umfassen 500.000, 1 Mio. und 2,75 Mio. Flex Credits pro Org, die zum Listenpreis 2.500 €, 5.000 € und 13.750 € kosten würden."
  - "Im Rechenbeispiel braucht ein Serviceagent für 1.500 Händleranfragen im Monat mit je drei Aktionen 1,08 Mio. Credits im Jahr."
  - "Der Wechsel von Core auf Advanced kostet bei 200 Nutzern 480.000 € im Jahr mehr, die Credits bringen nur 2.500 €. Wählen Sie nach Funktionen."
  - "Die Manufacturing Cloud führt nur Core und Max; Field Service hat seit November 2026 eigene Editionen Core, Advanced und Max."
faq:
  - q: "Müssen Bestandskunden auf Core, Advanced oder Max wechseln?"
    a: "Nein. Laut Salesforce bleiben die Preise für Bestandskunden auf bisherigen Editionen unverändert; die Bedingungen der Verlängerung regelt trotzdem Ihr Vertrag. Ob Enterprise und Unlimited bei jeder Verlängerung weiter angeboten werden, ist nicht bestätigt; klären Sie das vor den Verlängerungsgesprächen."
  - q: "Gelten die Flex Credits der neuen Editionen pro Nutzer oder pro Org?"
    a: "Pro Org. Die Preistabellen nennen für Core 500K Flex Credits pro Org und bei Max ausdrücklich pro Org und Jahr. Lassen Sie sich den Zeitraum im Order Form bestätigen. Nicht genutzte Credits verfallen zum Ende der Bestellung."
  - q: "Wie viele Agentforce-Aktionen deckt der Core-Pool?"
    a: "500.000 Credits reichen für 25.000 Standardaktionen zu je 20 Credits, also rund 2.080 im Monat. Prompts, Sandbox-Tests und Data-360-Verarbeitung werden ebenfalls in Flex Credits abgerechnet, die tatsächliche Zahl liegt also darunter."
  - q: "Lohnt sich die Max-Edition für einen Maschinenbauer?"
    a: "Max lohnt sich, wenn Sie die Funktionen brauchen, etwa die volle Agentforce-for-Industries-Ausstattung der Manufacturing Cloud oder Service Rep Assistant und Contact-Center-Funktionen in der Service Cloud. Nur wegen der Credits ist sie für die meisten Nutzerzahlen viel zu teuer: 2,25 Mio. zusätzliche Credits kosten zum Listenpreis rund 11.250 €."
  - q: "Was kostet die Manufacturing Cloud in den neuen Editionen?"
    a: "Die Preisseite nennt Sales Core und Service Core zu 275 € und die Max-Editionen zu 650 € oder 700 € pro Nutzer und Monat bei jährlicher Abrechnung. Eine Advanced-Edition gibt es dort nicht (Stand 9. November 2026)."
draft: false
---

Die Salesforce-Editionen Core, Advanced und Max verändern die Lizenzplanung eines Herstellers vor allem bei der nächsten Vertragsverlängerung. Bestehende Editionen behalten ihre Preise, und die enthaltenen Flex-Credit-Pools sind klein im Vergleich zu den Lizenzkosten: Die 500.000 Credits in Core würden zum Listenpreis 2.500 € kosten. Schon ein einzelner Serviceagent für Händleranfragen kann mehr verbrauchen als der Advanced-Pool. Ich würde die Edition deshalb nach den Funktionen wählen, die Vertrieb und Service brauchen, und den Verbrauch der Agenten als eigene Budgetzeile planen. Manufacturing Cloud und seit November 2026 auch Field Service haben eigene Editionspreise.

## Was hat sich mit Core, Advanced und Max geändert?

Am 3. September 2026 hat Salesforce [drei Editionen für Sales, Service und Industries angekündigt](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/). Für Sales Cloud und Service Cloud gelten folgende Preise und enthaltene Credits:

| Edition | Listenpreis pro Nutzer und Monat | Flex Credits pro Org | Credits zum Listenpreis |
|---|---|---|---|
| Core | 195 € | 500.000 | 2.500 € |
| Advanced | 395 € | 1.000.000 | 5.000 € |
| Max | 550 € | 2.750.000 | 13.750 € |

Die [Preisseite der Sales Cloud](https://www.salesforce.com/eu/products/sales-pricing/) nennt die Pools pro Org, die [Preisseite der Service Cloud](https://www.salesforce.com/eu/service/pricing/) für Max ausdrücklich „per org per year“. Den Zeitraum für Core und Advanced lassen Sie sich im Order Form bestätigen. Alle drei Editionen werden jährlich abgerechnet. Den Wert der Credits habe ich mit dem Listenpreis von [500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) berechnet.

Jede Edition enthält Slack, Tableau Next, Datensicherheit und den Premier Success Plan. Die Unterschiede, auf die es für Hersteller ankommt, betreffen KI- und Servicefunktionen. In der Service Cloud bringt Advanced den Help Agent Casey, Max die volle Agentforce-for-Service-Ausstattung mit Service Rep Assistant, Agentforce Coworker ohne Verbrauchsabrechnung und Contact-Center-Funktionen wie Workforce Engagement. In der Sales Cloud bringt Max Agentforce for Sales, Sales Planning und Salesforce Maps. Was Casey und Service Rep Assistant für ein Serviceteam leisten, steht in [KI-Assistenten in der Service Cloud](../service-cloud-casey-und-service-rep-assistant/).

Für Bestandskunden schreibt Salesforce: „Existing customer pricing on legacy editions remains unchanged.“ Kunden mit Agentforce 1 Edition können ohne Aufpreis auf Max wechseln. Für Neukunden listet die Sales-Cloud-Seite nur noch Free, Starter, Pro Suite, Core, Advanced und Max. Ob Enterprise und Unlimited bei Ihrer Verlängerung noch angeboten werden, ist [nicht bestätigt](https://www.salesforceben.com/salesforce-announces-3-replacement-editions-bundling-ai-slack-and-security/). Die versprochenen „70% more value“ von Core gegenüber Enterprise zählen nur, wenn Ihre Teams nutzen, was im Paket steckt.

Die Frage nach der Edition betrifft nur Nutzer, die eine volle CRM-Lizenz brauchen. Leser, Freigeber und Händler brauchen oft keine, wie in [braucht jeder eine volle Lizenz](../salesforce-lizenzen-volle-lizenz/) beschrieben. Das würde ich zuerst klären, denn jeder Nutzer auf einer Platform- oder Portallizenz ist ein Nutzer, für den Sie weder Core noch Max zahlen.

## Ein Flex-Credit-Pool reicht für 25.000 bis 137.500 Aktionen im Jahr

Laut [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) (Stand 3. November 2026) kostet eine Standard- oder Custom-Aktion in Produktion 20 Credits. Daraus ergeben sich für die Pools folgende Aktionszahlen:

- **Core:** 25.000 Aktionen im Jahr, rund 2.080 im Monat.
- **Advanced:** 50.000 Aktionen im Jahr, rund 4.170 im Monat.
- **Max:** 137.500 Aktionen im Jahr, rund 11.460 im Monat.

Das sind Obergrenzen, denn die Rate Card rechnet nicht nur Aktionen in Flex Credits ab:

- **Prompts** kosten je nach Modellklasse 2 bis 16 Credits.
- **Sandbox-Tests** kosten 16 Credits pro Aktion; einen Agenten zu testen ist also nicht kostenlos.
- **Data 360** berechnet im Basistarif 150 Credits pro MB für unstrukturierte Dokumente wie Handbücher und Ersatzteilkataloge. Die Seite der Manufacturing Cloud beschreibt die Core-Credits als „Flex credits for AI, Agentforce, Data, and more“.
- **Headless Platform Interactions**, die Abrechnungseinheit für Agentenaufrufe über API oder MCP, stehen mit dem Vermerk „TBA“ in der Liste. Salesforce kündigt für Max künftig ein Kontingent an Headless-360-Kapazität an, ohne Datum. Warum daraus ein Budgetrisiko wird, beschreibe ich in [MCP-Zugriffe als Budgetrisiko](../flex-credits-agentforce-kosten-pro-aktion/).

Zwei Vertragsdetails zählen. Credits müssen bis zum Ende der Bestellung verbraucht sein und werden nicht übertragen. Und die Preisseiten nennen den Pool pro Org, unabhängig von der Nutzerzahl: Nach dem Wortlaut der Preisseiten bekommt eine Org mit 30 Nutzern dieselben 500.000 Credits wie eine mit 3.000. Betreiben Sie getrennte Orgs für Vertrieb und Service oder für Regionen, fragen Sie, wie der Pool verteilt wird. Wie Sie den Verbrauch pro Aktion schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).

## Rechenbeispiel: 200 Nutzer und ein Händleragent

Nehmen wir einen Maschinenbauer mit SAP, 120 Nutzern in der Sales Cloud und 80 in der Service Cloud auf der Enterprise Edition, deren Verlängerung im Frühjahr 2027 ansteht. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen. Geplant ist ein Agent, der Händleranfragen zu Auftragsstatus, Lieferterminen und Ersatzteilverfügbarkeit beantwortet.

Angenommener Verbrauch pro Jahr:

- **Produktion:** 1.500 Anfragen im Monat mit je drei Aktionen, 54.000 Aktionen zu 20 Credits: 1.080.000 Credits.
- **Prompts:** zwei Standard-Prompts pro Anfrage zu 4 Credits: 144.000 Credits.
- **Tests:** vier Testzyklen mit je 500 Gesprächen und drei Aktionen pro Gespräch zu je 16 Credits: 96.000 Credits.
- **Data 360:** 1.000 MB Handbücher und Ersatzteillisten, einmal verarbeitet zu 150 Credits pro MB: 150.000 Credits.

Zusammen rund 1,47 Mio. Credits im Jahr. Zum Listenpreis für 200 Nutzer und mit Zukauf in Paketen zu 100.000 Credits ergibt sich:

| Edition | Lizenzen pro Jahr | Enthaltene Credits | Zuzukaufen | Summe |
|---|---|---|---|---|
| Core | 468.000 € | 500.000 | 1.000.000 für 5.000 € | 473.000 € |
| Advanced | 948.000 € | 1.000.000 | 500.000 für 2.500 € | 950.500 € |
| Max | 1.320.000 € | 2.750.000 | keine, 1,28 Mio. verfallen | 1.320.000 € |

Der Schritt von Core zu Advanced kostet 480.000 € im Jahr und bringt 500.000 Credits mit 2.500 € Listenpreis. In dieser Größenordnung sind Credits kein Argument für eine Edition. Entscheidend sind die Funktionen: Braucht der Service Casey, nutzt der Vertrieb Sales Programs? Wenn ja, wechseln Sie wegen dieser Funktionen. Wenn nein, ist Core plus zugekaufte Credits günstiger. Eine vierte Option ist, auf der Enterprise Edition zu unveränderten Preisen zu bleiben und 1,5 Mio. Credits für 7.500 € zum Listenpreis zuzukaufen, plus die Agentforce-Lizenz, die Ihr Vertrag vorsieht. Den Agenten selbst rechne ich ausführlich in [was ein Serviceagent für Händleranfragen kostet](../flex-credits-agentforce-kosten-pro-aktion/) durch.

## Was gilt für Manufacturing Cloud und Field Service?

**Manufacturing Cloud.** Neue Preise für die Industries-Editionen hat Salesforce für „later this fall“ angekündigt. Stand 9. November 2026 zeigt die [Preisseite der Manufacturing Cloud](https://www.salesforce.com/eu/manufacturing/cloud/), zuletzt am 6. Oktober geändert, Sales Core und Service Core zu 275 € und die Max-Editionen zu 650 €, Sales & Service Max zu 700 €, jährlich abgerechnet. Laut [US-Preisseite](https://www.salesforce.com/manufacturing/cloud/pricing/) enthält Core 500K Flex Credits pro Org, Max 2,75 Mio. Für eine Advanced-Edition nennt die Seite keinen Preis, und die volle Agentforce-for-Industries-Ausstattung steht nur bei Max. Was als Add-on dazukommt, steht in [Manufacturing Cloud Add-ons: was extra kostet](../manufacturing-cloud-zusatzkosten-add-ons/). Die Fußnoten zu Enterprise und Unlimited widersprechen sich; das habe ich in [wann sich die Manufacturing Cloud lohnt](../manufacturing-cloud-wann-lohnt-sie-sich/) beschrieben.

```hinweis achtung
Fällt Ihre Verlängerung in die nächsten Monate, würde ich keine drei Jahre Manufacturing-Cloud-Lizenzen unterschreiben, ohne zu fragen, ob weitere Industries-Editionen wie Advanced kommen, und ohne das Recht, dann zu wechseln.
```

**Field Service.** Seit November 2026 hat die [US-Preisseite von Field Service](https://www.salesforce.com/service/field-service-management/pricing/), zuletzt am 5. November geändert, eigene Editionen: Field Service+ Core, Field Service+ Advanced und Field Service Max, in der US-Fassung zu 250 $, 450 $ und 650 $ pro Nutzer und Monat, mit 500K, 1 Mio. und 2,75 Mio. Flex Credits pro Org. Dispatcher und Technician bleiben Rollenlizenzen zu 175 $ und enthalten keine Credits; dort braucht der Scheduling Agent laut Seite zugekaufte Flex Credits. Field Service Plus und Agentforce 1 Field Service stehen dort nicht mehr; die [deutsche Preisseite](https://www.salesforce.com/de/products/field-service/pricing) zeigt sie am 9. November 2026 noch zu 230 € und 650 €. Welches Modell für Ihren Vertrag gilt, klären Sie im Angebot. Ein Maschinenbauer mit Außendienst sollte deshalb weiter rollenbezogen planen: Editionen für das Büro, Technician-Lizenzen plus zugekaufte Credits für die meisten Techniker. Welche Lizenz zu welcher Rolle passt, steht in [Field-Service-Lizenzen nach Rolle](../field-service-lizenzen-rollen-dispatcher-techniker/), ob sich Field Service überhaupt lohnt, in [lohnt sich Salesforce Field Service](../salesforce-field-service-lohnt-sich/).

**Revenue Cloud.** Für Angebote und Abrechnung hat Revenue Cloud eigene Editionen, beschrieben in [Revenue Cloud Preise: Growth, Advanced und Add-ons](../revenue-cloud-editionen-preise/).

## Wann lohnt sich Max für einen Hersteller?

Bei einer Nutzerbasis wie im Beispiel mit 200 Nutzern lohnt sich Max wegen der Funktionen, nicht wegen der Credits.

```pro-contra
pro: Max kann sinnvoll sein, wenn
- der Service **Service Rep Assistant und Contact-Center-Funktionen** ohnehin braucht
- Nutzer der Manufacturing Cloud die **volle Agentforce-for-Industries-Ausstattung** brauchen, die die Preisseite nur bei Max nennt
- Sie heute **Agentforce 1 Edition** haben; der Wechsel auf Max kostet nichts extra
- viele Mitarbeitende **Agentforce Coworker** nutzen, den die Service-Cloud-Seite bei Max ohne Verbrauchsabrechnung aufführt
contra: Was die Credits nicht aufwiegen
- Gegenüber Core enthält Max 2,25 Mio. Credits mehr, zum Listenpreis rund 11.250 €
- Der Preisunterschied für 200 Nutzer liegt bei 852.000 € im Jahr
```

Eine Edition gilt für die ganze Org. Core- und Max-Lizenzen in einer Org zu mischen, ist also nicht der normale Weg. Braucht nur eine kleine Gruppe von Power-Usern KI-Funktionen, fragen Sie, ob es diese Funktionen als Add-on pro Nutzer gibt, statt alle 200 Nutzer auf eine höhere Edition anzuheben. Genau diese Abwägungen gehören zu meiner Arbeit in [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

## Die Nutzerbasis vor der Verlängerung bereinigen

1. **Nutzerbasis bereinigen.** Klären Sie, wer überhaupt eine volle Lizenz braucht, bevor Sie Editionen vergleichen.
2. **Funktionen pro Nutzergruppe auflisten,** die es nur in Advanced oder Max gibt, und heutige Add-ons, die eine Edition ersetzen würde.
3. **Credits pro Agent und Jahr schätzen,** mit Prompts, Sandbox-Tests und Data 360, nicht nur Aktionen in Produktion.
4. **Drei Antworten schriftlich einholen:** Pool pro Org und Jahr, Verteilung auf mehrere Orgs und was mit ungenutzten Credits zum Ende der Bestellung passiert.
5. **Monitoring aufsetzen.** Das [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) zeigt den Verbrauch nach Agent, Aktion und Kanal und warnt bei Schwellenwerten; es setzt Data 360 voraus.
6. **Bei der Manufacturing Cloud** fragen, ob weitere Industries-Editionen kommen, und sich das Recht zum Wechsel sichern.
