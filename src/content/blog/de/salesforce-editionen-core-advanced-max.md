---
title: "Salesforce-Editionen Core, Advanced, Max für Hersteller"
description: "Was die Salesforce-Editionen Core, Advanced und Max für die Lizenzplanung von Herstellern bedeuten, wie weit Flex-Credit-Pools reichen und wann Max sich lohnt."
pubDate: 2026-10-27
lang: de
slug: salesforce-editionen-core-advanced-max
translationKey: salesforce-editions-core-advanced-max
topic: governance
categories: [architecture, ai]
contactBrief: licences
tags: [Lizenzen, Editionen, Flex Credits, Agentforce, Make-or-buy, Maschinenbau]
takeaways:
  - "Seit dem 3. September 2026 verkauft Salesforce Sales und Service Cloud als Core, Advanced und Max zu 195 €, 395 € und 550 € pro Nutzer und Monat; für Bestandskunden bleiben die Preise bisheriger Editionen unverändert."
  - "Die Preisseiten nennen die enthaltenen Flex Credits pro Org und Jahr: 500.000 in Core, 1 Mio. in Advanced, 2,75 Mio. in Max, zum Listenpreis 2.500 €, 5.000 € und 13.750 € wert."
  - "Ein Serviceagent für 1.500 Händleranfragen im Monat mit je drei Aktionen verbraucht 1,08 Mio. Credits im Jahr, mehr als der Advanced-Pool, noch ohne Prompts, Tests und Data 360."
  - "Der Wechsel von 200 Nutzern von Core auf Advanced kostet zum Listenpreis 480.000 € im Jahr für 500.000 Credits im Wert von 2.500 €. Wählen Sie die Edition nach Funktionen."
  - "Die neuen Preise für die Industries-Editionen, wichtig für die Manufacturing Cloud, waren am 27. Oktober 2026 noch nicht veröffentlicht, und Field Service hat weiter ein eigenes Lizenzmodell."
faq:
  - q: "Müssen Bestandskunden auf Core, Advanced oder Max wechseln?"
    a: "Nein. Laut Salesforce bleiben die Preise für Bestandskunden auf bisherigen Editionen unverändert. Ob Enterprise und Unlimited bei jeder Verlängerung weiter angeboten werden, ist nicht bestätigt; fragen Sie das vor den Verlängerungsgesprächen."
  - q: "Gelten die Flex Credits der neuen Editionen pro Nutzer oder pro Org?"
    a: "Die Preisseiten von Sales Cloud, Service Cloud und Manufacturing Cloud nennen sie pro Org und Jahr, in Core zum Beispiel 500K Flex Credits/org/year. Nicht genutzte Credits verfallen zum Ende der Bestellung."
  - q: "Wie viele Agentforce-Aktionen deckt der Core-Pool?"
    a: "500.000 Credits reichen für 25.000 Standardaktionen zu je 20 Credits, also rund 2.080 im Monat. Prompts, Sandbox-Tests und Data-360-Verarbeitung werden ebenfalls in Flex Credits abgerechnet, die tatsächliche Zahl liegt also darunter."
  - q: "Lohnt sich die Max-Edition für einen Maschinenbauer?"
    a: "Max lohnt sich, wenn Sie die Funktionen brauchen, etwa die volle Agentforce-for-Industries-Ausstattung der Manufacturing Cloud oder Service Rep Assistant und Contact-Center-Funktionen in der Service Cloud. Nur wegen der Credits ist sie viel zu teuer: 2,25 Mio. zusätzliche Credits kosten zum Listenpreis rund 11.250 €."
  - q: "Was kostet die Manufacturing Cloud in den neuen Editionen?"
    a: "Die Preisseite nennt Sales Core und Service Core zu 275 € und die Max-Editionen zu 650 € oder 700 € pro Nutzer und Monat bei jährlicher Abrechnung. Neue Industries-Preise hat Salesforce für den Herbst angekündigt; am 27. Oktober 2026 waren sie noch nicht veröffentlicht."
draft: false
---

Die Salesforce-Editionen Core, Advanced und Max verändern die Lizenzplanung eines Herstellers vor allem bei der nächsten Vertragsverlängerung. Bestehende Editionen behalten ihre Preise, und die enthaltenen Flex-Credit-Pools sind klein im Vergleich zu den Lizenzkosten: Die 500.000 Credits in Core sind zum Listenpreis 2.500 € wert. Schon ein einzelner Serviceagent für Händleranfragen kann mehr verbrauchen als der Advanced-Pool. Ich würde die Edition deshalb nach den Funktionen wählen, die Vertrieb und Service brauchen, und den Verbrauch der Agenten als eigene Budgetzeile planen. Für die Manufacturing Cloud sind die neuen Industries-Preise noch offen.

## Was hat sich mit Core, Advanced und Max geändert?

Am 3. September 2026 hat Salesforce [drei Editionen angekündigt](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/), für Sales, Service und Industries. Preise und enthaltene Credits:

| Edition | Listenpreis pro Nutzer und Monat | Flex Credits pro Org und Jahr | Wert der Credits zum Listenpreis |
|---|---|---|---|
| Core | 195 € | 500.000 | 2.500 € |
| Advanced | 395 € | 1.000.000 | 5.000 € |
| Max | 550 € | 2.750.000 | 13.750 € |

Die Ankündigung selbst sagt nicht, ob die Pools pro Org oder pro Jahr gelten. Die [Preisseite der Sales Cloud](https://www.salesforce.com/eu/products/sales-pricing/) schon: Ihre Vergleichstabelle nennt „500K Flex Credits/org/year“ bis „2.75M Flex Credits/org/year“, die [Preisseite der Service Cloud](https://www.salesforce.com/eu/service/pricing/) für Max dieselbe Formulierung. Alle drei Editionen werden jährlich abgerechnet. Den Wert der Credits habe ich mit dem Listenpreis von [500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) berechnet.

Jede Edition enthält Slack, Tableau Next, Datensicherheit und den Premier Success Plan. Die Unterschiede, auf die es für Hersteller ankommt, liegen bei KI- und Servicefunktionen. In der Service Cloud bringt Advanced den Help Agent Casey, Max die volle Agentforce-for-Service-Ausstattung mit Service Rep Assistant, Agentforce Coworker ohne Verbrauchsabrechnung und Contact-Center-Funktionen wie Workforce und Quality Management. In der Sales Cloud bringt Max Agentforce for Sales, Sales Planning und Salesforce Maps. Was Casey und Service Rep Assistant für ein Serviceteam leisten, steht in [KI-Assistenten in der Service Cloud](../service-cloud-casey-und-service-rep-assistant/).

Für Bestandskunden schreibt Salesforce: „Existing customer pricing on legacy editions remains unchanged.“ Kunden mit Agentforce 1 Edition können ohne Aufpreis auf Max wechseln. Für Neukunden listet die Sales-Cloud-Seite nur noch Free, Starter, Pro Suite, Core, Advanced und Max. Ob Enterprise und Unlimited bei Ihrer Verlängerung noch angeboten werden, ist [nicht bestätigt](https://www.salesforceben.com/salesforce-announces-3-replacement-editions-bundling-ai-slack-and-security/). Die versprochenen „70% more value“ von Core gegenüber Enterprise zählen nur, wenn Ihre Teams nutzen, was im Paket steckt.

Die Frage nach der Edition betrifft nur Nutzer, die eine volle CRM-Lizenz brauchen. Leser, Freigeber und Händler brauchen oft keine, wie in [braucht jeder eine volle Lizenz](../salesforce-lizenzen-volle-lizenz/) beschrieben. Das würde ich zuerst klären, denn jeder Nutzer auf einer Platform- oder Portallizenz ist einer, für den Sie weder Core noch Max zahlen.

## Wie weit reicht ein Flex-Credit-Pool?

Laut [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) kostet eine Standard- oder Custom-Aktion in Produktion 20 Credits. Damit werden aus den Pools Aktionen:

- **Core:** 25.000 Aktionen im Jahr, rund 2.080 im Monat.
- **Advanced:** 50.000 Aktionen im Jahr, rund 4.170 im Monat.
- **Max:** 137.500 Aktionen im Jahr, rund 11.460 im Monat.

Das sind Obergrenzen, denn die Rate Card rechnet mehr als Aktionen in Flex Credits ab:

- **Prompts** kosten je nach Modellklasse 2 bis 16 Credits.
- **Sandbox-Tests** kosten 16 Credits pro Aktion; einen Agenten zu testen ist also nicht kostenlos.
- **Data 360** berechnet im Basistarif 150 Credits pro MB für unstrukturierte Dokumente wie Handbücher und Ersatzteilkataloge. Die Seite der Manufacturing Cloud beschreibt die Core-Credits als „Flex credits for AI, Agentforce, Data, and more“.
- **Headless Platform Interactions**, der Zähler für Agentenaufrufe über API oder MCP, stehen mit dem Satz „TBA“ in der Liste. Salesforce kündigt für Max künftig ein Kontingent an Headless-360-Kapazität an, ohne Datum. Warum daraus ein Budgetrisiko wird, beschreibe ich in [MCP-Zugriffe als Budgetrisiko](../mcp-zugriffe-salesforce-budgetrisiko/).

Zwei Vertragsdetails zählen. Credits müssen bis zum Ende der Bestellung verbraucht sein und werden nicht übertragen. Und die Preisseiten nennen den Pool pro Org, unabhängig von der Nutzerzahl: So wie sie dastehen, bekommt eine Org mit 30 Nutzern dieselben 500.000 Credits wie eine mit 3.000. Betreiben Sie getrennte Orgs für Vertrieb und Service oder für Regionen, fragen Sie, wie der Pool verteilt wird. Wie Sie den Verbrauch pro Aktion schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/).

## Ein typisches Szenario: 200 Nutzer und ein Händleragent

Nehmen wir einen Maschinenbauer mit SAP, 120 Nutzern in der Sales Cloud und 80 in der Service Cloud auf Enterprise Edition, Verlängerung im Frühjahr 2027. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen. Geplant ist ein Agent, der Händleranfragen zu Auftragsstatus, Lieferterminen und Ersatzteilverfügbarkeit beantwortet.

Angenommener Verbrauch pro Jahr:

- **Produktion:** 1.500 Anfragen im Monat mit je drei Aktionen, 54.000 Aktionen zu 20 Credits: 1.080.000 Credits.
- **Prompts:** zwei Standard-Prompts pro Anfrage zu 4 Credits: 144.000 Credits.
- **Tests:** vier Testzyklen mit je 500 Gesprächen, drei Aktionen zu 16 Credits: 96.000 Credits.
- **Data 360:** 1.000 MB Handbücher und Ersatzteillisten, einmal verarbeitet zu 150 Credits pro MB: 150.000 Credits.

Zusammen rund 1,47 Mio. Credits im Jahr. Zum Listenpreis für 200 Nutzer:

| Edition | Lizenzen pro Jahr | Enthaltene Credits | Zuzukaufen | Summe |
|---|---|---|---|---|
| Core | 468.000 € | 500.000 | 970.000 für 4.850 € | 472.850 € |
| Advanced | 948.000 € | 1.000.000 | 470.000 für 2.350 € | 950.350 € |
| Max | 1.320.000 € | 2.750.000 | keine, 1,28 Mio. verfallen | 1.320.000 € |

Der Schritt von Core zu Advanced kostet 480.000 € im Jahr und bringt 500.000 Credits im Wert von 2.500 €. In dieser Größenordnung sind Credits kein Argument für eine Edition. Entscheidend sind die Funktionen: Braucht der Service Casey, nutzt der Vertrieb Sales Programs? Wenn ja, wechseln Sie wegen dieser Funktionen. Wenn nein, ist Core plus zugekaufte Credits günstiger. Eine vierte Option: auf Enterprise Edition zu unveränderten Preisen bleiben und die 1,47 Mio. Credits für rund 7.350 € zum Listenpreis zukaufen, plus die Agentforce-Lizenz, die Ihr Vertrag verlangt. Den Agenten selbst rechne ich ausführlich in [was ein Serviceagent für Händleranfragen kostet](../serviceagent-haendleranfragen-kosten/) durch.

## Was gilt für Manufacturing Cloud und Field Service?

**Manufacturing Cloud.** Neue Preise für die Industries-Editionen hat Salesforce für „later this fall“ angekündigt. Am 27. Oktober 2026 habe ich keine gefunden. Die [Preisseite der Manufacturing Cloud](https://www.salesforce.com/eu/manufacturing/cloud/) zeigt schon jetzt Sales Core und Service Core zu 275 € und die Max-Editionen zu 650 €, Sales & Service Max zu 700 €, jährlich abgerechnet. Laut [US-Preisseite](https://www.salesforce.com/manufacturing/cloud/pricing/) enthält Core 500K Flex Credits pro Org und Jahr, Max 2,75 Mio. Eine Advanced-Edition hat keinen Preis, und die volle Agentforce-for-Industries-Ausstattung steht nur bei Max. Die Fußnoten zu Enterprise und Unlimited widersprechen sich, das habe ich in [wann sich die Manufacturing Cloud lohnt](../manufacturing-cloud-wann-lohnt-sie-sich/) beschrieben. Fällt Ihre Verlängerung in die nächsten Monate, würde ich keine drei Jahre Manufacturing-Cloud-Lizenzen unterschreiben, bevor die Industries-Preise da sind, es sei denn, die Bestellung erlaubt danach einen Editionswechsel.

**Field Service.** Die [Preisseite von Field Service](https://www.salesforce.com/eu/service/field-service-management/pricing/) kennt kein Core, Advanced oder Max. Dispatcher und Technician kosten 175 €, Field Service Plus 230 € und Agentforce 1 Field Service 650 € pro Nutzer und Monat. Nur Letzteres enthält Credits: „1M Flex Credits & 2.5M Data Cloud Credits per org every year“. Bei den übrigen Lizenzen braucht der Scheduling Agent laut Seite Flex Credits. Ein Maschinenbauer mit Außendienst plant also zwei Modelle nebeneinander: Editionen für Vertrieb und Service im Büro, klassische Lizenzen plus zugekaufte Credits für die Techniker im Feld. Ob sich Field Service überhaupt lohnt, steht in [lohnt sich Salesforce Field Service](../salesforce-field-service-lohnt-sich/).

## Wann lohnt sich Max für einen Hersteller?

Max lohnt sich wegen der Funktionen, nie wegen der Credits. Gegenüber Core enthält Max 2,25 Mio. Credits mehr, zum Listenpreis rund 11.250 €. Der Preisunterschied für 200 Nutzer liegt bei 852.000 € im Jahr.

Max kann sinnvoll sein, wenn:

- **der Service Service Rep Assistant und Contact-Center-Funktionen** ohnehin braucht.
- **Nutzer der Manufacturing Cloud die volle Agentforce-for-Industries-Ausstattung brauchen,** die die Preisseite nur bei Max nennt.
- **Sie heute Agentforce 1 Edition haben.** Der Wechsel auf Max kostet nichts extra.
- **viele Mitarbeitende Agentforce Coworker nutzen,** den die Service-Cloud-Seite bei Max ohne Verbrauchsabrechnung führt.

Braucht nur eine kleine Gruppe von Power-Usern KI-Funktionen, fragen Sie, ob sich diese Gruppe getrennt lizenzieren lässt, statt alle 200 Nutzer anzuheben. Genau diese Abwägungen gehören zu meiner Arbeit in [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

## Was sollten Sie vor der Verlängerung prüfen?

1. **Nutzerbasis bereinigen.** Klären Sie, wer überhaupt eine volle Lizenz braucht, bevor Sie Editionen vergleichen.
2. **Funktionen pro Nutzergruppe auflisten,** die es nur in Advanced oder Max gibt, und heutige Add-ons, die eine Edition ersetzen würde.
3. **Credits pro Agent und Jahr schätzen,** mit Prompts, Sandbox-Tests und Data 360, nicht nur Aktionen in Produktion.
4. **Drei Antworten schriftlich einholen:** Pool pro Org und Jahr, Verteilung auf mehrere Orgs und was mit ungenutzten Credits zum Ende der Bestellung passiert.
5. **Monitoring aufsetzen.** Das [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) zeigt den Verbrauch nach Agent, Aktion und Kanal und warnt bei Schwellenwerten; es setzt Data 360 voraus.
6. **Bei der Manufacturing Cloud** auf die Industries-Preise warten oder sich das Recht zum Wechsel sichern.

Wählen Sie die Edition nach den Funktionen, die Ihre Teams nutzen, und führen Sie Flex Credits als eigene, gemessene Budgetzeile. Wenn Ihre Verlängerung ansteht und Sie eine unabhängige Prüfung des Angebots möchten, [schreiben Sie mir](#contact).
