---
title: "Manufacturing Cloud Add-ons: was extra kostet"
description: "Welche Add-ons der Manufacturing Cloud extra kosten, von Portallizenzen bis Agentforce und Connected Assets, und wo sich die Salesforce-Seiten widersprechen."
pubDate: 2026-10-28
lang: de
slug: manufacturing-cloud-zusatzkosten-add-ons
translationKey: manufacturing-cloud-add-ons-costs
topic: governance
categories: [manufacturing-cloud, architecture]
contactBrief: licences
tags: [Manufacturing Cloud, Lizenzen, Add-ons, Experience Cloud, Agentforce, Make-or-buy]
takeaways:
  - "Fast jeder Hersteller braucht zur Manufacturing Cloud mindestens Portallizenzen: 15 $ pro Login oder 35 $ pro Mitglied für Kunden, 20 $ oder 50 $ für Partner, pro Monat zum Listenpreis."
  - "Das Agentforce for Manufacturing Cloud Add-on kostet 150 $ im Monat. Die Add-on-Seite sagt pro Nutzer, die Preisseite pro Login. Lassen Sie sich die Einheit schriftlich geben."
  - "Channel Revenue Management for Manufacturing kostet 30.000 $ pro Org und Jahr, Connected Assets 15.000 $ pro Org und Monat. Beide lohnen sich nur für bestimmte Prozesse."
  - "Salesforce-Seiten widersprechen sich bei Manufacturing Intelligence (220 $ pro Login oder ab 165 $) und bei Rebate Management (ab 75 $ ohne Einheit oder Teil von Channel Revenue Management)."
  - "In einem angenommenen Szenario mit 150 Nutzern und 400 Händlern erhöhen typische Add-ons die Lizenzzeile um rund 40 Prozent; Connected Assets und zusätzliche Omnistudio-Aufrufe würden sie verdoppeln."
faq:
  - q: "Was kosten Portallizenzen für die Manufacturing Cloud?"
    a: "Laut Add-on-Seite (Stand Oktober 2026) kostet Experience Cloud for Manufacturing als Customer Community Plus 15 $ pro Login oder 35 $ pro Mitglied und Monat, als Partner Community 20 $ pro Login oder 50 $ pro Mitglied, jährlich abgerechnet. Die Experience-Cloud-Seite nennt dieselben Beträge in Euro."
  - q: "Brauche ich das Agentforce-Add-on bei einer Max-Edition?"
    a: "Die Add-on-Seite nennt das Agentforce for Manufacturing Cloud Add-on für Core und Advanced. Die Max-Editionen enthalten die volle Agentforce-for-Industries-Ausstattung. Der Verbrauch der Agenten wird in beiden Fällen in Flex Credits abgerechnet."
  - q: "Ist Channel Revenue Management in der Manufacturing Cloud enthalten?"
    a: "Nein. Die Add-on-Seite verkauft Channel Revenue Management for Manufacturing separat für 30.000 $ pro Org und Jahr. Trailhead beschreibt Ship and Debit als Funktion von Channel Revenue Management."
  - q: "Was passiert, wenn die Omnistudio-Aufrufe das Limit der Edition überschreiten?"
    a: "Core enthält 100.000 Omnistudio-Aufrufe pro Monat, Max 1.000.000. Die Add-on-Seite verkauft 2 Millionen zusätzliche Aufrufe für 10.000 $ pro Einheit und Monat, also 120.000 $ im Jahr. Wie Aufrufe für Ihre Prozesse gezählt werden, sollten Sie vor dem Go-live klären."
  - q: "Welche Add-on-Preise der Manufacturing Cloud sind unklar?"
    a: "Die Einheit des Agentforce-Add-ons (Nutzer oder Login), der Preis von Manufacturing Intelligence (220 $ pro Login oder ab 165 $), der Preis von Rebate Management (ab 75 $ ohne Einheit) und die Editionsbasis, weil sich zwei Fußnoten zu Enterprise und Unlimited Edition widersprechen."
draft: false
---

Die Add-ons der Manufacturing Cloud kosten zusätzlich zur Edition, und fast jeder Hersteller braucht mindestens eines davon: Portallizenzen für Händler und Kunden, 15 $ bis 50 $ im Monat. Das Agentforce-Add-on zu 150 $ im Monat, Channel Revenue Management for Manufacturing zu 30.000 $ pro Org und Jahr und Connected Assets zu 15.000 $ pro Org und Monat hängen vom Prozess ab. In einem angenommenen Szenario mit 150 Nutzern und 400 Händlern erhöhen typische Add-ons die Lizenzzeile um rund 40 Prozent. Mehrere Salesforce-Seiten widersprechen sich bei Preisen und Einheiten. Jedes Add-on gehört deshalb mit bestätigtem Preis ins Angebot.

## Welche Add-ons nennt Salesforce für die Manufacturing Cloud?

Die [Add-on-Seite](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) listet im Oktober 2026 elf Add-ons, alle Preise in US-Dollar. Für die meisten Hersteller zählen diese:

| Add-on | Listenpreis | Verfügbar mit | Wofür |
|---|---|---|---|
| Experience Cloud for Manufacturing, Customer Community Plus | 15 $ pro Login oder 35 $ pro Mitglied, pro Monat | Core, Advanced, Max | Kundenportal |
| Experience Cloud for Manufacturing, Partner Community | 20 $ pro Login oder 50 $ pro Mitglied, pro Monat | Core, Advanced, Max | Händler- und Partnerportal |
| Agentforce for Manufacturing Cloud Add-on | 150 $ pro Nutzer und Monat | Core, Advanced | Agenten und KI für Core-Nutzer |
| Channel Revenue Management for Manufacturing | 30.000 $ pro Org und Jahr | Sales Core, Advanced, Max | Anreize und Bestände im Kanal |
| Connected Assets | 15.000 $ pro Org und Monat, jährlich abgerechnet | Core, Advanced, Sales Max | Telemetrie aus Maschinen |
| Asset Service Lifecycle Management | 75 $ pro Nutzer und Monat | Field-Service-Editionen | Anlagenverwaltung bis in den Außendienst |
| Omnistudio, 2 Millionen zusätzliche Aufrufe | 10.000 $ pro Einheit und Monat (120.000 $ im Jahr) | Core, Advanced, Max | Mehr geführte Prozesse |
| MuleSoft Anypoint Platform | auf Anfrage | Core, Advanced | Integration |

Der Rest sind Feedback Management und Umfragepakete. Eine Merkwürdigkeit: Die Seite nennt Add-ons „verfügbar mit Advanced“, die [Preisseite](https://www.salesforce.com/manufacturing/cloud/pricing/) bepreist aber nur Core- und Max-Editionen, wie ich in [Salesforce-Editionen Core, Advanced und Max](../salesforce-editionen-core-advanced-max/) beschrieben habe. Die Editionen selbst nennt die Preisseite in Euro mit denselben Beträgen wie in Dollar, für die meisten Add-ons fand ich nur Dollarpreise.

## Was kosten Händler und Kunden im Portal?

Portallizenzen sind das Add-on, um das kaum ein Hersteller herumkommt. Eine Mitgliedslizenz gehört einem Nutzer, der sich beliebig oft anmelden kann. Eine Login-Lizenz wird als monatliches Kontingent gekauft, und laut [Salesforce-Hilfe zu Experience-Cloud-Lizenzen](https://help.salesforce.com/s/articleView?id=sf.users_license_types_communities.htm&language=en_US&type=5) zählen mehrere Anmeldungen am selben Tag als ein Daily Unique Login.

Daraus ergibt sich eine einfache Schwelle. Ein Partnermitglied kostet 50 $, ein Partnerlogin 20 $, die Mitgliedslizenz lohnt sich also ab dem dritten Login-Tag im Monat. Bei Kunden sind es 35 $ gegen 15 $, ebenfalls ab dem dritten Tag. Händler, die wöchentlich Aufträge und Rahmenverträge prüfen, gehören auf Mitgliedslizenzen, solche, die einmal im Quartal einen Garantieanspruch einreichen, auf Logins.

Welche Objekte externe Nutzer mit welcher Lizenz sehen, etwa Sales Agreements oder Bonusansprüche, steht in [Teil 7: das Kundenportal der Manufacturing Cloud](../manufacturing-cloud-kundenportal/). Sollen Händler Ersatzteile in einem Shop mit Warenkorb und Checkout bestellen, ist das B2B Commerce mit eigenem Kostenmodell, siehe Kapitel 1 der [Masterclass B2B Commerce](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/).

## Agentforce: Add-on oder Max-Edition?

Die Add-on-Seite nennt das Agentforce for Manufacturing Cloud Add-on mit „$150/user/month“. Die Preisseite führt dasselbe Add-on mit „from $150 per login per month“. Ein Preis pro Nutzer und ein Preis pro Login sind verschiedene Verträge: Bei Logins kosten Nutzer, die den Agenten selten verwenden, weniger, bei Nutzern zählt jede benannte Person. Mit keiner der beiden Einheiten würde ich planen, bevor sie im Angebot steht.

Das Add-on gibt es für Core und Advanced. Die Max-Editionen enthalten die „full Agentforce for Industries suite“, 2,75 Millionen statt 500.000 Flex Credits pro Org und Jahr und höhere Plattformgrenzen. Zum Listenpreis kosten Core plus Add-on 425 $ pro Nutzer und Monat, Max 650 $. Brauchen nur 20 Key Account Manager Agenten, kostet das Add-on 36.000 $ im Jahr. Dieselben 20 Nutzer von Core auf Max zu heben, kostet 90.000 $, und ob eine Org Core- und Max-Nutzer mischen darf, ist eine Frage an das Account-Team.

In beiden Fällen kostet jede Aktion eines Agenten Flex Credits; für Core nennt die Preisseite Agentforce „via Flex Credits“. Wie Sie den Verbrauch schätzen, steht in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/) und im Masterclass-Kapitel [Kosten und Token](../../masterclass/ki-salesforce/kosten-und-token/).

## Welche Add-ons brauchen nur manche Hersteller?

**Channel Revenue Management for Manufacturing, 30.000 $ pro Org und Jahr.** Hier liegen Ship and Debit und Preisschutz für Distributoren. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/ship-and-debit-process-management/get-to-know-ship-and-debit) nennt Ship and Debit „a feature within Channel Revenue Management“. Das lohnt sich für Hersteller, die über lagerhaltende Distributoren mit Preisansprüchen verkaufen, nicht für ein paar Händler mit Jahresbonus.

**Rebate Management: ein Preiswiderspruch.** Die [Experience-Cloud-Seite](https://salesforce.com/manufacturing/cloud/experience-cloud) nennt „Rebate Management from $75“ ohne Einheit. Die [Preisseite von Channel Revenue Management](https://www.salesforce.com/sales/channel-revenue-management/pricing/) führt „Rebate Management and Payouts“ als Funktion eines Angebots auf Anfrage und vermerkt „Requires a Sales Cloud or CRM license“. Ob Boni in Ihrer Edition enthalten sind, ab 75 $ pro irgendetwas kosten oder Channel Revenue Management brauchen, kann ich aus diesen Seiten nicht ablesen. Was Rebate Management leistet, steht in [Teil 5 der Serie](../rebate-management-haendlerboni/).

**Connected Assets, 15.000 $ pro Org und Monat.** Das sind 180.000 $ im Jahr für Maschinentelemetrie in Salesforce. Es lohnt sich erst, wenn die Servicehistorie gut genug ist, um auf die Daten zu reagieren, wie in [Predictive Maintenance: welche Daten Sie brauchen](../predictive-maintenance-salesforce-datenbasis/) beschrieben.

**Manufacturing Intelligence: noch ein Preiswiderspruch.** Die [eigene Seite](https://salesforce.com/manufacturing/cloud/manufacturing-intelligence) nennt 220 $ pro Login und Monat, jährlich abgerechnet. Die Experience-Cloud-Seite führt es „from $165“, ohne Einheit. Inhaltlich beschreibt die Seite nur Erkenntnisse „throughout the entire sales and revenue cycle“. Bevor jemand das einplant, will ich Preis und Inhalt schriftlich sehen.

**Asset Service Lifecycle Management, 75 $ pro Nutzer und Monat,** gehört zu Field-Service-Editionen und betrifft nur Unternehmen, die auch Field Service lizenzieren.

## Wann werden Plattformgrenzen zu Add-ons?

Jede Edition enthält Grenzen, die großzügig wirken, bis ein Prozess darauf läuft. Laut Preisseite:

| Pro Edition | Core | Max |
|---|---|---|
| Flex Credits | 500.000 pro Org und Jahr | 2.750.000 pro Org und Jahr |
| Omnistudio-Aufrufe | 100.000 pro Monat | 1.000.000 pro Monat |
| Business-Rules-Engine-Aufrufe | 10.000 pro Monat | 50.000 pro Monat |
| Datenspeicher | 20 MB pro Nutzer | 1 GB pro Nutzer |

Der nächste Schritt nach 100.000 Omnistudio-Aufrufen in Core ist eine Einheit mit 2 Millionen Aufrufen für 10.000 $ im Monat. Eine kleinere Einheit nennt die Seite nicht. Für die Business Rules Engine, die laut Produktseite Garantieansprüche freigibt, nennt die Seite gar keinen Add-on-Preis. Wenn Garantieansprüche, Bonusregeln und Portalprozesse auf diesen Engines laufen, fragen Sie, wie Aufrufe gezählt werden und was ein zusätzlicher Block kostet, bevor die Prozesse gebaut sind.

## Ein typisches Szenario, als Annahme: 150 Nutzer und 400 Händler

Ein Maschinenbauer lizenziert 150 Vertriebsnutzer auf Manufacturing Cloud Sales Core und öffnet ein Portal für 400 Händler. 100 Händler melden sich wöchentlich an, 300 etwa einmal im Monat. 20 Key Account Manager bekommen Agenten, und das Unternehmen verkauft über Distributoren mit Preisschutz. Alle Zahlen sind Annahmen, alle Preise Listenpreise pro Jahr:

| Zeile | Rechnung | Pro Jahr |
|---|---|---|
| Sales Core | 150 Nutzer x 275 $ x 12 | 495.000 $ |
| Partner Community | (100 Mitglieder x 50 $ + 300 Logins x 20 $) x 12 | 132.000 $ |
| Agentforce-Add-on | 20 Nutzer x 150 $ x 12 | 36.000 $ |
| Channel Revenue Management | pro Org | 30.000 $ |
| **Add-ons** | | **198.000 $** |

Die Add-ons erhöhen die Lizenzzeile um 40 Prozent. Will dasselbe Unternehmen auch Connected Assets (180.000 $) und reichen die Omnistudio-Aufrufe nicht (120.000 $), kosten die Add-ons mehr als die 150 Lizenzen selbst. Umsetzung, Integration und Flex Credits über den Pool hinaus kommen dazu.

## Was sollten Sie vor der Unterschrift schriftlich haben?

1. **Die Preisbasis.** Die Preisseite hat zwei Fußnoten: Die eine sagt, die Preise gelten für die Enterprise Edition und Unlimited koste 425 $, die andere sagt, sie gelten für die Unlimited Edition. Welche gilt für Sie?
2. **Die Einheit des Agentforce-Add-ons:** pro Nutzer oder pro Login.
3. **Rebate Management:** enthalten, „ab 75 $“ pro was, oder Channel Revenue Management.
4. **Manufacturing Intelligence:** 220 $ oder ab 165 $, und was enthalten ist.
5. **Portallizenzen pro Gruppe,** mit den Objekten, die jede Gruppe sehen muss.
6. **Omnistudio und Business Rules Engine:** wie Aufrufe gezählt werden und was ein zusätzlicher Block kostet.
7. **Add-ons für Jahr zwei und drei** zum heutigen Preis, wenn sie auf der Roadmap stehen.

Auch intern braucht nicht jeder die Branchenlizenz, wie in [braucht jeder eine volle Lizenz](../salesforce-lizenzen-volle-lizenz/) beschrieben. Der ganze Business Case steht in Kapitel 1 der [Masterclass Manufacturing Cloud](../../masterclass/manufacturing-cloud/einordnung-und-business-case/), die Funktionsliste dahinter in [Manufacturing Cloud Funktionen: was enthalten ist](../manufacturing-cloud-funktionen-ueberblick/). Lizenzprognosen gehören zu meiner Arbeit bei [Make-or-buy und Lizenzen](../../leistungen/make-or-buy-lizenzen/).

Der Editionspreis ist nur die erste Zeile eines Angebots für die Manufacturing Cloud, über die Summe entscheiden die Add-ons. Wenn Sie ein Angebot Zeile für Zeile prüfen lassen möchten, [schreiben Sie mir](#contact).
