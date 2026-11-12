---
title: "Manufacturing Cloud Add-ons: was extra kostet"
metaTitle: "Manufacturing Cloud Pricing: was die Add-ons extra kosten"
description: "Welche Add-ons der Manufacturing Cloud extra kosten, von Portallizenzen bis Agentforce und Connected Assets, was sich geändert hat und was Sie fragen sollten."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: manufacturing-cloud-zusatzkosten-add-ons
translationKey: manufacturing-cloud-add-ons-costs
topic: governance
categories: [manufacturing-cloud, architecture]
contactBrief: licences
tags: [Manufacturing Cloud, Lizenzen, Add-ons, Experience Cloud, Agentforce, Make-or-buy]
takeaways:
  - "Portallizenzen kosten 15 $ pro Login oder 35 $ pro Mitglied für Kunden, 20 $ oder 50 $ für Partner, pro Monat zum Listenpreis."
  - "Das Agentforce-Add-on kostet laut Add-on-Seite 150 $ pro Nutzer und Monat; die Übersichtsseite nennt pro Login, die Einheit muss im Angebot bestätigt werden."
  - "Rebate Management ist seit 18. August 2026 nicht mehr verlängerbar; Nachfolger ist Channel Revenue Management."
  - "Im Rechenbeispiel würden Connected Assets und zusätzliche OmniStudio-Aufrufe die Add-on-Kosten mehr als verdoppeln."
faq:
  - q: "Was kostet die Salesforce Manufacturing Cloud?"
    a: "Laut Preisseite (geprüft am 9. November 2026) kosten Sales Core und Service Core 275 € pro Nutzer und Monat, die Max-Editionen 650 €, Sales & Service Max 700 €, jährlich abgerechnet. Hinzu kommen Add-ons: Portallizenzen ab 15 $ pro Login und Monat, das Agentforce-Add-on für 150 $ im Monat und Channel Revenue Management für 30.000 $ pro Org und Jahr."
  - q: "Was kosten Portallizenzen für die Manufacturing Cloud?"
    a: "Laut Add-on-Seite (geprüft am 9. November 2026) kostet Experience Cloud for Manufacturing als Customer Community Plus 15 $ pro Login oder 35 $ pro Mitglied und Monat, als Partner Community 20 $ pro Login oder 50 $ pro Mitglied, jährlich abgerechnet. Die Experience-Cloud-Seite nennt dieselben Beträge in Euro."
  - q: "Brauche ich das Agentforce-Add-on bei einer Max-Edition?"
    a: "Die Add-on-Seite nennt das Agentforce for Manufacturing Cloud Add-on für Core und Advanced. Die Max-Editionen enthalten die volle Agentforce-for-Industries-Ausstattung. Die Nutzung durch Mitarbeitende ist in beiden Fällen nicht verbrauchsabhängig; Agenten für Kunden, Prompts und Data 360 verbrauchen weiterhin Flex Credits."
  - q: "Ist Channel Revenue Management in der Manufacturing Cloud enthalten?"
    a: "Nein. Die Add-on-Seite führt Channel Revenue Management for Manufacturing separat für 30.000 $ pro Org und Jahr auf. Für Partnerzugang, weitere Nutzer und Payouts können zusätzliche Kosten anfallen. Es ist außerdem der Nachfolger von Rebate Management, das seit 18. August 2026 nicht mehr verlängerbar ist."
  - q: "Was passiert, wenn die OmniStudio-Aufrufe das Limit der Edition überschreiten?"
    a: "Core enthält 100.000 OmniStudio-Aufrufe pro Monat, Max 1.000.000. Die Add-on-Seite führt 2 Millionen zusätzliche Aufrufe für 10.000 $ pro Einheit und Monat auf, also 120.000 $ im Jahr. Wie Aufrufe für Ihre Prozesse gezählt werden, sollten Sie vor dem Go-live klären."
  - q: "Welche Add-on-Preise der Manufacturing Cloud sind unklar?"
    a: "Unklar sind die Einheit des Agentforce-Add-ons (Add-on-Seite pro Nutzer, Übersichtsseite pro Login), die Payout-Kosten von Channel Revenue Management und die Editionsbasis, weil sich zwei Fußnoten zu Enterprise und Unlimited Edition widersprechen."
draft: false
---

Die Add-ons der Manufacturing Cloud kosten zusätzlich zur Edition. Wer Prozesse für Händler oder Kunden öffnet, braucht Portallizenzen, die 15 $ bis 50 $ im Monat kosten. Das Agentforce-Add-on zu 150 $ im Monat, Channel Revenue Management for Manufacturing zu 30.000 $ pro Org und Jahr und Connected Assets zu 15.000 $ pro Org und Monat hängen vom Prozess ab. In einem angenommenen Szenario mit 150 Nutzern und 400 Händlern erhöhen die gewählten Add-ons die Lizenzzeile um rund 40 Prozent. Einzelne Salesforce-Seiten widersprechen sich bei Einheiten, und Rebate Management ist nicht mehr verlängerbar. Jedes Add-on gehört deshalb mit bestätigtem Preis ins Angebot.

## Welche Add-ons nennt Salesforce für die Manufacturing Cloud?

Die [Add-on-Seite](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) listet elf Add-ons (geprüft am 9. November 2026), alle Preise in US-Dollar, in der Regel jährlich abgerechnet. Für die meisten Hersteller sind diese relevant:

| Add-on | Listenpreis | Verfügbar mit | Wofür |
|---|---|---|---|
| Experience Cloud for Manufacturing, Customer Community Plus | 15 $ pro Login oder 35 $ pro Mitglied, pro Monat | Core, Advanced, Max | Kundenportal |
| Experience Cloud for Manufacturing, Partner Community | 20 $ pro Login oder 50 $ pro Mitglied, pro Monat | Core, Advanced, Max | Händler- und Partnerportal |
| Agentforce for Manufacturing Cloud Add-on | 150 $ pro Nutzer und Monat | Core, Advanced | Agenten und KI für Core-Nutzer |
| Channel Revenue Management for Manufacturing | 30.000 $ pro Org und Jahr | Sales Core, Advanced, Max | Anreize und Bestände im Kanal |
| Connected Assets | 15.000 $ pro Org und Monat, jährlich abgerechnet | Core, Advanced, Sales Max | Telemetrie aus Maschinen |
| Asset Service Lifecycle Management | 75 $ pro Nutzer und Monat | Field-Service-Editionen | Anlagenverwaltung bis in den Außendienst |
| OmniStudio, 2 Millionen zusätzliche Aufrufe | 10.000 $ pro Einheit und Monat (120.000 $ im Jahr) | Core, Advanced, Max | Mehr geführte Prozesse |
| MuleSoft Anypoint Platform | auf Anfrage | Core, Advanced | Integration |

Die übrigen betreffen Feedback Management und Umfragepakete. Eine Merkwürdigkeit: Die Seite nennt Add-ons „verfügbar mit Advanced“, die [Preisseite](https://www.salesforce.com/manufacturing/cloud/pricing/) bepreist aber nur Core- und Max-Editionen, wie ich in [Salesforce-Editionen Core, Advanced und Max](/blog/salesforce-editionen-core-advanced-max/) beschrieben habe. Die Editionen selbst führt die Preisseite in Euro mit denselben Beträgen wie in Dollar auf; für die meisten Add-ons fand ich nur Dollarpreise.

## Portallizenzen für Händler und Kunden kosten 15 $ bis 50 $ im Monat

Für Hersteller, die Rahmenverträge, Garantieansprüche, Aufträge oder Serviceprozesse für Händler oder Kunden öffnen, sind Portallizenzen der häufigste Zusatzposten. Eine Mitgliedslizenz ist einem Nutzer fest zugeordnet, der sich beliebig oft anmelden kann. Eine Login-Lizenz wird als monatliches Kontingent gekauft, und laut [Salesforce-Hilfe zu Experience-Cloud-Lizenzen](https://help.salesforce.com/s/articleView?id=sf.users_license_types_communities.htm&language=en_US&type=5) zählen mehrere Anmeldungen am selben Tag als ein Daily Unique Login.

Daraus ergibt sich eine einfache Schwelle. Ein Partnermitglied kostet 50 $, ein Partnerlogin 20 $, die Mitgliedslizenz lohnt sich also ab dem dritten Login-Tag im Monat. Bei Kunden sind es 35 $ gegenüber 15 $, ebenfalls ab dem dritten Tag. Als Faustregel sollten Händler, die wöchentlich Aufträge und Rahmenverträge prüfen, Mitgliedslizenzen erhalten; für Händler, die einmal im Quartal einen Garantieanspruch einreichen, reichen Login-Lizenzen. Bei saisonaler Nutzung planen Sie auf Basis der Daily Unique Logins über das gesamte Jahr.

Welche Objekte externe Nutzer mit welcher Lizenz sehen können, etwa Sales Agreements oder Bonusansprüche, steht in [Teil 7: das Kundenportal der Manufacturing Cloud](/blog/manufacturing-cloud-kundenportal/). Sollen Händler Ersatzteile in einem Shop mit Warenkorb und Checkout bestellen, ist das B2B Commerce mit eigenem Kostenmodell, siehe Kapitel 1 der [Masterclass B2B Commerce](/masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/).

## Agentforce: Add-on oder Max-Edition?

Die Add-on-Seite nennt das Agentforce for Manufacturing Cloud Add-on mit „$150/user/month“. Die Preisseite führt dasselbe Add-on mit „from $150 per login per month“.

```hinweis offen
Ein Preis pro Nutzer und ein Preis pro Login sind verschiedene Verträge. Die detaillierte Add-on-Seite und die [Agentforce-Preisseite](https://www.salesforce.com/agentforce/pricing/) nennen beide pro Nutzer, also plane ich mit einem Preis pro Nutzer und lasse mir die Einheit im Angebot bestätigen.
```

Das Add-on ist für Core und Advanced verfügbar; die Max-Editionen enthalten die „full Agentforce for Industries suite“. Zum Listenpreis kosten Core plus Add-on 425 $ pro Nutzer und Monat, Max 650 $. Benötigen nur 20 Key Account Manager Agenten, sieht die Abwägung so aus:

```pro-contra
pro: Add-on zu Core
- 36.000 $ im Jahr für die 20 Nutzer
- Der Wechsel derselben 20 Nutzer von Core zu Max kostet 90.000 $, sofern Core und Max in einer Org überhaupt kombiniert werden dürfen
contra: Was Max zusätzlich bringt
- 2,75 Millionen statt 500.000 Flex Credits pro Org und Jahr
- Höhere Plattformgrenzen, etwa bei OmniStudio-Aufrufen
- Editionen sind Org-Lizenzen, eine Mischung aus Core und Max muss das Account-Team ausdrücklich bestätigen
```

Die Nutzung durch Mitarbeitende ist mit dem Add-on nicht verbrauchsabhängig, und für Max nennt die Preisseite Agentforce Coworker mit „Unmetered usage“. Agenten für Kunden, Prompts und Data-360-Verarbeitung verbrauchen weiterhin Flex Credits; für Core ohne Add-on nennt die Preisseite Agentforce „via Flex Credits“. Wie Sie den Verbrauch schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](/blog/flex-credits-agentforce-kosten-pro-aktion/) und im Masterclass-Kapitel [Kosten und Token](/masterclass/ki-salesforce/kosten-und-token/).

## Welche Add-ons brauchen nur manche Hersteller?

**Channel Revenue Management for Manufacturing, 30.000 $ pro Org und Jahr.** Dazu gehören Ship and Debit und Preisschutz für Distributoren. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) nennt Ship and Debit „a feature within Channel Revenue Management“. Die 30.000 $ sind der Basispreis mit zehn Admin-Nutzern; laut [Preisseite von Channel Revenue Management](https://www.salesforce.com/sales/channel-revenue-management/pricing/) fallen für Partnerzugang, weitere Nutzer und Payouts zusätzliche Kosten an, und Payouts verbrauchen Credits nach ihrem Gesamtwert. Das Add-on lohnt sich für Hersteller, die über lagerhaltende Distributoren mit Preisansprüchen verkaufen, nicht für wenige Händler mit Jahresbonus.

**Rebate Management: nicht mehr verlängerbar.** Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=005393495&language=en_US&type=1) ist Rebate Management, auch Rebate Management for Manufacturing und das Nutzer-Add-on, seit 18. August 2026 nicht mehr verlängerbar. Bestehende Verträge gelten bis zum Vertragsende; Nachfolger ist Channel Revenue Management, das „Rebate Management and Payouts“ als Funktion aufführt. Das „Rebate Management from $75“ auf der [Experience-Cloud-Seite](https://salesforce.com/manufacturing/cloud/experience-cloud) bezieht sich auf das alte Add-on. Was Rebate Management leistet, steht in [Teil 5 der Serie](/blog/rebate-management-haendlerboni/).

**Connected Assets, 15.000 $ pro Org und Monat.** Das sind 180.000 $ im Jahr für Maschinentelemetrie in Salesforce. Es lohnt sich erst, wenn die Servicehistorie gut genug ist, um auf die Daten zu reagieren, wie in [Predictive Maintenance: welche Daten Sie brauchen](/blog/predictive-maintenance-salesforce-datenbasis/) beschrieben.

**Manufacturing Intelligence, 220 $ pro Login und Monat.** Die [eigene Seite](https://salesforce.com/manufacturing/cloud/manufacturing-intelligence) nennt CRM Analytics Plus für 165 $ und Manufacturing Intelligence für 220 $ pro Login und Monat, jährlich abgerechnet. Das „from $165“ auf der Experience-Cloud-Seite bezieht sich auf das günstigere der beiden Angebote. Bevor jemand das einplant, würde ich mir den Inhalt schriftlich bestätigen lassen.

**Asset Service Lifecycle Management, 75 $ pro Nutzer und Monat,** gehört zu Field-Service-Editionen und betrifft nur Unternehmen, die auch Field Service lizenzieren.

## Plattformgrenzen werden zu Add-ons, sobald ein Prozess darauf läuft

Jede Edition enthält Grenzen, die großzügig wirken, bis ein Prozess sie ausschöpft. Laut Preisseite:

| Pro Edition | Core | Max |
|---|---|---|
| Flex Credits | 500.000 pro Org und Jahr | 2.750.000 pro Org und Jahr |
| OmniStudio-Aufrufe | 100.000 pro Monat | 1.000.000 pro Monat |
| Business-Rules-Engine-Aufrufe | 10.000 pro Monat | 50.000 pro Monat |
| Datenspeicher | 20 MB pro Nutzer | 1 GB pro Nutzer |

Nach 100.000 OmniStudio-Aufrufen in Core ist der nächste verfügbare Block eine Einheit mit 2 Millionen Aufrufen für 10.000 $ im Monat. Eine kleinere Einheit nennt die Seite nicht. Für die Business Rules Engine, die laut Produktseite Garantieansprüche freigibt, nennt diese Seite keinen Add-on-Preis; Salesforce bietet zusätzliche Aufrufblöcke an anderer Stelle an; fragen Sie den Preis im Angebot ab. Wenn Garantieansprüche, Bonusregeln und Portalprozesse über diese Engines abgewickelt werden, fragen Sie, wie Aufrufe gezählt werden und was ein zusätzlicher Block kostet, bevor die Prozesse gebaut sind.

## Rechenbeispiel: 150 Nutzer und 400 Händler

Ein Maschinenbauer lizenziert 150 Vertriebsnutzer auf Manufacturing Cloud Sales Core und öffnet ein Portal für 400 Händler. 100 Händler melden sich wöchentlich an, 300 etwa einmal im Monat. 20 Key Account Manager erhalten Agenten, und das Unternehmen verkauft über Distributoren mit Preisschutz. Alle Zahlen sind Annahmen, alle Preise Listenpreise pro Jahr:

| Zeile | Rechnung | Pro Jahr |
|---|---|---|
| Sales Core | 150 Nutzer x 275 $ x 12 | 495.000 $ |
| Partner Community | (100 Mitglieder x 50 $ + 300 Logins x 20 $) x 12 | 132.000 $ |
| Agentforce-Add-on | 20 Nutzer x 150 $ x 12 | 36.000 $ |
| Channel Revenue Management | pro Org | 30.000 $ |
| **Add-ons** | | **198.000 $** |

In diesem Szenario erhöhen die Add-ons die Lizenzzeile um 40 Prozent; Payouts in Channel Revenue Management sind darin noch nicht enthalten. Nutzt dasselbe Unternehmen zusätzlich Connected Assets für 180.000 $ und benötigt weitere OmniStudio-Aufrufe für 120.000 $, steigen die Add-on-Kosten auf 498.000 $ und entsprechen damit etwa den Kosten der 150 Lizenzen selbst. Umsetzung, Integration und Flex Credits über den Pool hinaus fallen zusätzlich an.

## Was sollten Sie vor der Unterschrift schriftlich haben?

1. **Die Preisbasis.** Die Editionskarten sind eindeutig, aber zwei ältere Fußnoten widersprechen sich: Eine Fußnote besagt, die Preise gelten für die Enterprise Edition und Unlimited koste 425 $; die andere besagt, sie gelten für die Unlimited Edition. Lassen Sie sich Edition und SKU in der Order Form bestätigen.
2. **Die Einheit des Agentforce-Add-ons:** pro Nutzer oder pro Login.
3. **Boni:** Rebate Management ist seit 18. August 2026 nicht mehr verlängerbar; fragen Sie nach Channel Revenue Management mit Partnerzugang und Payout-Credits und, falls Sie Rebate Management heute nutzen, nach dem Migrationsweg.
4. **Manufacturing Intelligence:** was es über CRM Analytics Plus hinaus enthält.
5. **Portallizenzen pro Gruppe,** mit den Objekten, die jede Gruppe sehen muss.
6. **OmniStudio und Business Rules Engine:** wie Aufrufe gezählt werden und was ein zusätzlicher Block kostet.
7. **Add-ons für Jahr zwei und drei** zum heutigen Preis, wenn sie auf der Roadmap stehen.

Auch intern benötigt nicht jeder die Branchenlizenz, wie in [braucht jeder eine volle Lizenz](/blog/salesforce-lizenzen-volle-lizenz/) beschrieben. Der vollständige Business Case steht in Kapitel 1 der [Masterclass Manufacturing Cloud](/masterclass/manufacturing-cloud/einordnung-und-business-case/), die zugehörige Funktionsliste in [Manufacturing Cloud Funktionen: was enthalten ist](/blog/manufacturing-cloud-funktionen-ueberblick/). Lizenzprognosen gehören zu meiner Arbeit bei [Make-or-buy und Lizenzen](/leistungen/make-or-buy-lizenzen/).
