---
title: "B2B Commerce Lizenzen für Käufer: Wer braucht welche?"
description: "Welche Salesforce-Lizenzen Käufer, Buyer Manager, Merchandiser und Vertrieb in B2B Commerce brauchen, Member oder Login und welche Limits Sie früh prüfen."
pubDate: 2026-10-28
lang: de
slug: b2b-commerce-lizenzen-kaeufer
translationKey: commerce-buyer-licences
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: licences
tags: [B2B Commerce, Lizenzen, Customer Community Plus, Experience Cloud, Händler]
takeaways:
  - "Laut Trailhead brauchen Käufer und Buyer Manager in einem Salesforce-B2B-Commerce-Store Customer Community Plus, Merchandiser die Lizenz B2B and D2C Commerce und Entwickler eine volle Salesforce-Lizenz."
  - "Käuferlizenzen sind nicht Teil der Commerce-Editionen. Die B2B-Preisseite nennt Storefronts, Order Management und Data-Cloud-Credits, aber keine Käuferlizenzen."
  - "Zum Listenpreis von Experience Cloud for Manufacturing kostet Customer Community Plus 35 € pro Mitglied oder 15 € pro Login und Monat. Ab drei Login-Tagen im Monat ist die Member-Lizenz günstiger."
  - "Customer Community Plus braucht Rollen. Standard sind 50.000 Portalrollen pro Org, Salesforce kann das für B2B erweitern."
  - "Wer für viele Accounts bestellt, nutzt den Account Switcher. Er wird ab 200 Accounts langsamer und fällt bei 2.000 aus."
faq:
  - q: "Welche Lizenz brauchen Käufer in Salesforce B2B Commerce?"
    a: "Trailhead nennt Customer Community Plus für Käufer und Buyer Manager. Käufer bekommen die Berechtigung B2B Commerce User, Buyer Manager B2B Commerce Super User und Delegated External User Administration."
  - q: "Ist für B2B-Käufer eine Member- oder eine Login-Lizenz besser?"
    a: "Das hängt an den Login-Tagen pro Monat. Bei 35 € pro Mitglied und 15 € pro Login ist ein Käufer mit bis zu zwei Login-Tagen im Monat per Login günstiger, ab drei Tagen die Member-Lizenz. Mehrere Logins an einem Tag zählen einmal."
  - q: "Sind Käuferlizenzen in der B2B-Commerce-Edition enthalten?"
    a: "Nein. Die Editionen Growth und Advanced werden als Anteil am Bruttowarenwert abgerechnet, und die Preisseite nennt keine Käuferlizenzen. Sie kommen dazu und gehören als eigene Zeile ins Angebot."
  - q: "Können Buyer Manager selbst Nutzer für ihre Firma anlegen?"
    a: "Ja. Trailhead gibt Buyer Managern die Berechtigung Delegated External User Administration. Damit verwalten sie die Käufer ihrer Firma in einem oder mehreren Buyer Accounts."
draft: false
---

Laut Trailhead brauchen Käufer und Buyer Manager in einem Salesforce-B2B-Commerce-Store eine Customer-Community-Plus-Lizenz. Merchandiser, die den Store pflegen, brauchen die Lizenz "B2B and D2C Commerce", Entwickler und Site-Builder eine volle Salesforce-Lizenz. Die Preisseite der Commerce-Editionen, die Salesforce als Anteil am Bruttowarenwert abrechnet, nennt keine dieser Nutzerlizenzen. Zum Listenpreis von Experience Cloud for Manufacturing kostet ein Käufer 35 € pro Mitglied oder 15 € pro Login und Monat. Ob Member- oder Login-Lizenzen günstiger sind, entscheidet die Frage, wie oft sich Ihre Händler tatsächlich anmelden.

## Welche Lizenzen braucht B2B Commerce?

Salesforce B2B Commerce, das Salesforce inzwischen auch als "Agentforce Commerce for B2B" vermarktet, betreibt den Shop als Site auf Experience Cloud. Jeder, der mit dem Store arbeitet, braucht eine Lizenz, welche, hängt an der Rolle. Die Trailhead-Einheit [zu Personas und Berechtigungen](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-roles-permissons-store-setup/define-personas-permissions) nennt diese Rollen:

| Rolle | Was die Rolle tut | Lizenz | Berechtigungen |
|---|---|---|---|
| Käufer (Buyer) | Sieht und kauft Produkte für eine Firma | Customer Community Plus | B2B Commerce User, Flow User |
| Buyer Manager | Gibt Bestellungen frei, verwaltet Käufer | Customer Community Plus | B2B Commerce Super User, Manage Account Address, Delegated External User Administration |
| Merchandiser | Pflegt Katalog, Store-Funktionen und Einführungen | B2B and D2C Commerce | Über die Lizenz am internen Nutzer |
| Entwickler, Frontend-Builder | Lädt Produktdaten, baut Checkout und Seiten | Volle Salesforce-Lizenz | Customize Application, Author Apex, Create and Set Up Experiences |

Die [Preisseite für B2B Commerce](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) nennt 6 oder 10 Storefronts, 20 Lagerorte, Order Management, Data-Cloud-Credits, den Merchant Agent und je 3 oder 5 Nutzer für CRM Analytics und Knowledge. Käuferlizenzen tauchen dort nicht auf. Sie kommen zur GMV-Gebühr dazu, die ich in [B2B Commerce Preise: Was das GMV-Modell kostet](../b2b-commerce-preise-gmv-modell/) beschreibe.

## Welche Lizenz brauchen Käufer und Buyer Manager?

Beide bekommen Customer Community Plus. Laut [Salesforce-Hilfe zu externen Lizenzen](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) ist diese Lizenz für externe Nutzer gedacht, die Berichte, Dashboards und das normale Freigabemodell brauchen. Partner Community beschreibt die Hilfe für B2B-Sites mit Zugriff auf Vertriebsdaten, etwa Partner Relationship Management. Für den Store erwähnt Trailhead Partner Community nicht.

Haben Ihre Händler schon Partner-Community-Lizenzen für ein Partnerportal, würde ich Salesforce schriftlich fragen, ob diese Nutzer mit ihrer vorhandenen Lizenz im Store kaufen dürfen. Zwei Lizenzen für dieselbe Person beim selben Händler sind die teuerste Antwort.

Käufer und Buyer Manager teilen sich die Lizenz und unterscheiden sich im Berechtigungssatz. Ein Buyer Manager kann laut Trailhead:

- Käufer in einem oder über mehrere Buyer Accounts verwalten,
- Warenkörbe und Bestellungen lesen, anlegen und bearbeiten, wie ein Käufer,
- Adressfelder an Kontaktadressen bearbeiten, die Käufer nur lesen.

Mit Delegated External User Administration legt der Buyer Manager beim Händler neue Mitarbeiter selbst an, ohne Ticket an Ihren Innendienst. In einer Einführung spart das mehr Arbeit als die meisten Shop-Funktionen. Deshalb gehört es in [die Einführung bei Händlern](../b2b-shop-haendler-einfuehren/).

## Member- oder Login-Lizenz: Was ist günstiger?

Die Hilfe erklärt die beiden Modelle so: Eine Member-Lizenz ist einer Person fest zugeordnet, die sich beliebig oft anmelden darf. Bei Login-Lizenzen kaufen Sie eine Zahl an Logins pro Monat, und jede Anmeldung an der Site verbraucht einen. Mehrere Anmeldungen derselben Person am selben Tag zählen einmal, Salesforce nennt das Daily Unique Login.

Die [Seite zu Experience Cloud for Manufacturing](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) nennt diese Listenpreise bei jährlicher Abrechnung:

| Lizenz | Pro Mitglied und Monat | Pro Login und Monat |
|---|---|---|
| Customer Community Plus | 35 € | 15 € |
| Partner Community | 50 € | 20 € |

Die Schwelle ist schnell gerechnet. Ein Käufer mit zwei Login-Tagen im Monat kostet per Login 30 €, als Mitglied 35 €. Ab drei Login-Tagen, also 45 €, ist die Member-Lizenz günstiger. Wer wöchentlich bestellt, bekommt deshalb eine Member-Lizenz, wer ein paar Mal im Jahr bestellt, eine Login-Lizenz.

Ein typisches Szenario, als Annahme: ein Hersteller mit 250 Händlern, jeder mit einem Buyer Manager und zwei Käufern, also 750 Nutzer. 150 davon bestellen mehrmals pro Woche und bekommen Member-Lizenzen: 150 × 35 € = 5.250 € im Monat. Die übrigen 600 melden sich im Schnitt einmal im Monat an: 600 Logins × 15 € = 9.000 €. Zusammen sind das 14.250 € im Monat oder 171.000 € im Jahr zum Listenpreis. Mit Member-Lizenzen für alle 750 Nutzer wären es 26.250 € im Monat oder 315.000 € im Jahr.

Ein Detail bestimmt die Zahl. Ein Login-Tag ist jeder Tag, an dem sich jemand anmeldet, auch nur für einen Lieferstatus. Wird der Shop zum Ort, an dem Händler Liefertermine nachsehen, steigen die Login-Tage, auch wenn die Bestellungen gleich bleiben.

## Welche Limits zählen für die Lizenzplanung?

Neben der Lizenz gibt es Grenzen, die spät auffallen, wenn niemand sie prüft. Der [Commerce-Entwicklerleitfaden zu Käufer-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) und die Hilfe nennen diese:

- **Rollen.** Customer Community Plus und Partner Community brauchen Rollen für externe Nutzer. Standard sind 50.000 Rollen über alle Portale einer Org. Laut Entwicklerleitfaden kann Salesforce das für B2B erweitern, ab einer Million Käufer sprechen Sie mit Ihrem Account-Team. Die Hilfe nennt außerdem Account Role Optimization, die eine Rolle erst anlegt, wenn ein Account einen zweiten Nutzer hat.
- **Käufer.** 1,5 Millionen Käufer und Buyer Manager zusammen, als weiches Limit.
- **Account Switcher.** Ein Käufer, der für mehrere Accounts bestellt, etwa der Zentraleinkauf einer Händlergruppe mit vielen Filialen, wechselt zwischen ihnen. Das weiche Limit liegt bei 200 Accounts. Darüber sinkt die Leistung, bei 2.000 Accounts fällt der Switcher aus. Über 200 brauchen Sie einen eigenen Switcher.
- **Berichtsabos.** Customer Community Plus enthält keine Report Subscriptions. Ein Buyer Manager, der wöchentlich einen Bericht per E-Mail erwartet, bekommt ihn auf diesem Weg nicht.

## Was gilt für Vertrieb und Innendienst?

Interne Mitarbeiter arbeiten in Salesforce mit ihrer internen Lizenz. In der Trailhead-Liste der Store-Personas kommt kein Außendienst vor. Zwei aktuelle Funktionen zielen auf ihn:

- **Bestellvorlagen**, laut [Seite zu den Commerce-Neuerungen](https://www.salesforce.com/de/commerce/innovations/) seit September 2026 allgemein verfügbar: Käufer und Vertriebsmitarbeiter legen häufige Bestellungen an, speichern sie und verwenden sie wieder.
- **Reorder Portal**: Ein Vertriebsmitarbeiter lädt einen Käufer auf eine Seite mit früheren Bestellungen ein, die er direkt nachbestellen kann. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-reorder-portal-quick-look/boost-sales-with-the-reorder-portal) braucht die Anbindung an Sales Cloud eine Agentforce-Commerce-Lizenz und eine aktivierte Digital Experience.

Mein Rat: Schreiben Sie pro interner Gruppe auf, was sie im Store tut, etwa den Shop aus Händlersicht ansehen, im Namen eines Händlers bestellen oder den Katalog pflegen, und lassen Sie sich im Angebot bestätigen, welche Lizenz welche Tätigkeit abdeckt. Welche internen Nutzer wirklich eine volle Lizenz brauchen, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Wo starten Sie?

Legen Sie eine Liste mit vier Spalten an: Rolle, Anzahl Personen, Login-Tage pro Monat und Lizenz. Füllen Sie sie aus Ihren Auftragsdaten der letzten zwölf Monate: Wer hat wie oft per Telefon, E-Mail oder Portal bestellt? Prüfen Sie dann die Limits oben, vor allem Rollen und den Account Switcher bei Händlergruppen. Ob ein Shop oder ein Portal überhaupt zu Ihren Händlern passt, klärt [B2B Commerce oder Händlerportal](../b2b-commerce-oder-haendlerportal/), das ganze Kostenbild steht in [Kapitel 1 der Masterclass B2B Commerce](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/). Lizenzprognosen wie diese gehören zu meiner Arbeit bei [Make-or-Buy und Lizenzen](../../leistungen/make-or-buy-lizenzen/).

Zählen Sie die Login-Tage pro Käufer vor der Unterschrift, denn sie bestimmen die Lizenzrechnung stärker als die Zahl der Händler; wenn Sie einen zweiten Blick auf Ihre Zahlen möchten, [schreiben Sie mir](#contact).
