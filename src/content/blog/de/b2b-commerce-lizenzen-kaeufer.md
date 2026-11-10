---
title: "B2B Commerce Lizenzen für Käufer: Wer braucht welche?"
description: "Welche Salesforce-Lizenzen Käufer, Buyer Manager, Merchandiser und Vertrieb in B2B Commerce brauchen, Member oder Login und welche Limits Sie früh prüfen."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: b2b-commerce-lizenzen-kaeufer
translationKey: commerce-buyer-licences
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: licences
tags: [B2B Commerce, Lizenzen, Customer Community Plus, Experience Cloud, Händler]
takeaways:
  - "Einfache Käufer brauchen nur External Apps; Buyer Manager und Käufer, die andere Käufer sehen oder Accounts wechseln, brauchen Customer Community Plus."
  - "Käuferlizenzen sind nicht Teil der Commerce-Editionen. Die B2B-Preisseite nennt Storefronts, Order Management und Data-Cloud-Credits."
  - "Zum Listenpreis von Experience Cloud for Manufacturing kostet Customer Community Plus 35 € pro Mitglied oder 15 € pro Login, Mitglied lohnt ab drei Tagen."
  - "Für Customer Community Plus sind Rollen erforderlich. Standard sind 50.000 Portalrollen pro Org, Salesforce kann das für B2B erweitern."
  - "Wer für viele Accounts bestellt, nutzt den Account Switcher. Er wird ab 200 Accounts langsamer und fällt bei 2.000 aus."
faq:
  - q: "Welche Lizenz brauchen Käufer in Salesforce B2B Commerce?"
    a: "Laut Salesforce-Hilfe gibt eine External-Apps-Lizenz Käufern den Mindestzugang, als Login-Lizenz über die SKU Registered Shopper. Buyer Manager und Käufer, die andere Käufer sehen müssen, brauchen Customer Community Plus oder höher."
  - q: "Ist für B2B-Käufer eine Member- oder eine Login-Lizenz besser?"
    a: "Bei Customer Community Plus hängt das an den Login-Tagen pro Monat. Bei 35 € pro Mitglied und 15 € pro Login ist ein Käufer mit bis zu zwei Login-Tagen im Monat per Login günstiger, ab drei Tagen die Member-Lizenz. Mehrere Logins an einem Tag zählen einmal."
  - q: "Sind Käuferlizenzen in der B2B-Commerce-Edition enthalten?"
    a: "Die Preisseite nennt keine Käuferlizenzen. Growth wird als Anteil am Bruttowarenwert abgerechnet, für Advanced nennt die Hilfe GMV oder einen Preis pro Bestellung. Fragen Sie, ob External-Apps-Lizenzen enthalten sind, und führen Sie jede Lizenz als eigene Zeile im Angebot."
  - q: "Können Buyer Manager selbst Nutzer für ihre Firma anlegen?"
    a: "Ja, wenn Sie ihnen Delegated External User Administration zuweisen, die Trailhead für die Persona Buyer Manager nennt. Damit verwalten sie die Käufer ihrer Firma in einem oder mehreren Buyer Accounts."
draft: false
---

Laut Salesforce-Hilfe braucht ein einfacher Käufer in einem Salesforce-B2B-Commerce-Store nur eine External-Apps-Lizenz oder alternativ External Apps Login über die SKU Registered Shopper. Buyer Manager und Käufer, die andere Käufer sehen oder zwischen Accounts wechseln, brauchen Customer Community Plus oder höher. Merchandiser brauchen eine Salesforce-Standard- oder Identity-Lizenz mit dem Berechtigungssatz Merchandiser. Die Preisseite der Commerce-Editionen nennt keine dieser Nutzerlizenzen. Zum Listenpreis von Experience Cloud for Manufacturing kostet Customer Community Plus 35 € pro Mitglied oder 15 € pro Login und Monat.

## Welche Lizenzen braucht B2B Commerce?

Salesforce B2B Commerce ist inzwischen in "Agentforce Commerce for B2B" umbenannt, auch wenn Hilfe und Preisseiten noch beide Namen nutzen. Der Shop läuft als Site auf Experience Cloud. Jeder, der mit dem Store arbeitet, braucht eine Lizenz. Welche das ist, hängt von der Rolle ab. Die [Salesforce-Hilfe zu B2B-Commerce-Lizenzen](https://help.salesforce.com/s/articleView?id=commerce.comm_b2b_licenses.htm&language=en_US&type=5) und die Personas auf Trailhead ergeben dieses Bild (geprüft am 9. November 2026):

| Rolle | Was die Rolle tut | Lizenz | Berechtigungen |
|---|---|---|---|
| Käufer (Buyer) | Sieht und kauft Produkte für eine Firma | External Apps oder External Apps Login (SKU Registered Shopper) | B2B Commerce User, Flow User |
| Käufer, der andere Käufer sieht oder den Account Switcher nutzt | Bestellt für mehrere Accounts, sieht Bestellungen von Kollegen | Customer Community Plus oder höher | B2B Commerce User |
| Buyer Manager | Verwaltet Käufer, Warenkörbe und Adressen | Customer Community Plus oder höher | B2B Commerce Super User, Manage Account Address, Delegated External User Administration |
| Merchandiser | Pflegt Katalog, Store-Funktionen und Einführungen | Salesforce-Standard- oder Identity-Lizenz | Berechtigungssatz Merchandiser oder Commerce Admin |
| Entwickler, Frontend-Builder | Lädt Produktdaten, baut Checkout und Seiten | Interne Salesforce-Lizenz, je nach Aufgabe | Customize Application, Author Apex, Create and Set Up Experiences |

Die [Preisseite für B2B Commerce](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) nennt 6 oder 10 Storefronts, 20 Lagerorte, Order Management, Data-Cloud-Credits, den Merchant Agent und je 3 oder 5 Nutzer für CRM Analytics und Knowledge. Käuferlizenzen tauchen dort nicht auf; fragen Sie, ob Ihre Edition welche enthält. Sonst kommen sie zur GMV-Gebühr dazu, die ich in [B2B Commerce Preise: Was das GMV-Modell kostet](../b2b-commerce-preise-gmv-modell/) beschreibe.

## Buyer Manager brauchen Customer Community Plus, einfache Käufer nicht

Die Grenze ist der Zugriff auf andere Käufer. Laut Hilfe gilt: "B2B Commerce requires a Customer Community Plus or higher license to access other buyers." Der Zentraleinkauf eines Händlers, der für mehrere Filialen bestellt, oder ein Buyer Manager, der Kollegen verwaltet, braucht deshalb Customer Community Plus. Ein Käufer, der nur für seinen eigenen Account bestellt, kommt mit External Apps aus. Laut [Salesforce-Hilfe zu externen Lizenzen](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) ist diese Lizenz für externe Nutzer gedacht, die Berichte, Dashboards und das normale Freigabemodell brauchen. Die Hilfe beschreibt Partner Community als Lizenz für B2B-Sites mit Zugriff auf Vertriebsdaten, etwa Partner Relationship Management. Für den Store erwähnt Trailhead Partner Community nicht.

```hinweis offen
Haben Ihre Händler schon Partner-Community-Lizenzen für ein Partnerportal, würde ich Salesforce schriftlich fragen, ob diese Nutzer mit ihrer vorhandenen Lizenz im Store kaufen dürfen. Zwei Lizenzen für dieselbe Person beim selben Händler wären die teuerste Lösung.
```

Ein Buyer Manager kann laut Trailhead:

- Käufer in einem oder mehreren Buyer Accounts verwalten,
- Warenkörbe und Bestellungen wie ein Käufer lesen, anlegen und bearbeiten,
- Adressfelder von Kontaktpunktadressen bearbeiten, die Käufer nur lesen können.

Weisen Sie Delegated External User Administration zu, legt der Buyer Manager beim Händler neue Mitarbeiter selbst an, ohne ein Ticket an Ihren Innendienst zu schicken. Bei einer Einführung spart das mehr Arbeit als die meisten Shop-Funktionen. Deshalb sollte es Teil der [Einführung bei Händlern](../b2b-shop-haendler-einfuehren/) sein.

## Member- oder Login-Lizenz: Was ist bei Customer Community Plus günstiger?

Die Hilfe erklärt die beiden Modelle so: Eine Member-Lizenz ist einer Person fest zugeordnet, die sich beliebig oft anmelden darf. Bei Login-Lizenzen kaufen Sie ein monatliches Login-Kontingent, und jede Anmeldung an der Site wird darauf angerechnet. Mehrere Anmeldungen derselben Person am selben Tag zählen einmal, Salesforce nennt das Daily Unique Login. Die Logins bilden einen gemeinsamen Monatspool aller Login-Nutzer. Planen Sie also mit Spitzen, nicht mit Durchschnitten.

Die [Seite zu Experience Cloud for Manufacturing](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) nennt diese Add-on-Listenpreise bei jährlicher Abrechnung (geprüft am 9. November 2026). Für External Apps fand ich keinen öffentlichen Listenpreis:

| Lizenz | Pro Mitglied und Monat | Pro Login und Monat |
|---|---|---|
| Customer Community Plus | 35 € | 15 € |
| Partner Community | 50 € | 20 € |

Die Schwelle ist schnell gerechnet. Ein Käufer mit zwei Login-Tagen im Monat kostet per Login 30 € und als Mitglied 35 €. Ab drei Login-Tagen, also 45 €, ist die Member-Lizenz günstiger. Als Faustregel bekommt ein Buyer Manager, der wöchentlich arbeitet, eine Member-Lizenz; einer, der sich nur ein paar Mal im Jahr anmeldet, bekommt eine Login-Lizenz.

Rechenbeispiel: Ein Hersteller hat 250 Händler, jeder mit einem Buyer Manager und zwei Käufern, also 750 Nutzer. Die 500 Käufer bestellen nur für ihren eigenen Account und bekommen External Apps; der Preis steht im Angebot. Die 250 Buyer Manager brauchen Customer Community Plus: 100 arbeiten wöchentlich mit Member-Lizenz, 100 × 35 € = 3.500 € im Monat, die übrigen 150 melden sich etwa einmal im Monat an, 150 Logins × 15 € = 2.250 €. Zusammen sind das 5.750 € im Monat oder 69.000 € im Jahr zum Listenpreis. Customer Community Plus als Mitgliedslizenz für alle 750 Nutzer käme auf 26.250 € im Monat oder 315.000 € im Jahr.

```hinweis achtung
Ein Login-Tag ist jeder Tag, an dem sich jemand anmeldet, auch wenn es nur um einen Lieferstatus geht. Wird der Shop zum Ort, an dem Händler Liefertermine nachsehen, steigen die Login-Tage, auch wenn die Bestellungen gleich bleiben.
```

## Rollen und Account Switcher begrenzen die Planung

Neben der Lizenz gibt es Grenzen, die spät auffallen, wenn niemand sie prüft. Der [Commerce-Entwicklerleitfaden zu Käufer-Limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) und die Hilfe nennen diese:

- **Rollen.** Customer Community Plus und Partner Community brauchen Rollen für externe Nutzer. Standardmäßig sind es 50.000 Rollen über alle Portale einer Org. Laut Entwicklerleitfaden kann Salesforce das für B2B erweitern. Ab einer Million Käufer sollten Sie mit Ihrem Account-Team sprechen. Die Hilfe nennt außerdem Account Role Optimization; dabei wird eine Rolle erst angelegt, wenn ein Account einen zweiten Nutzer hat.
- **Käufer.** 1,5 Millionen Käufer und Buyer Manager zusammen, als weiches Limit.
- **Account Switcher.** Ein Käufer, der für mehrere Accounts bestellt, etwa der Zentraleinkauf einer Händlergruppe mit vielen Filialen, wechselt zwischen ihnen. Das weiche Limit liegt bei 200 Accounts. Darüber sinkt die Leistung, bei 2.000 Accounts fällt der Switcher aus. Bei mehr als 200 Accounts brauchen Sie einen eigenen Switcher.
- **Berichtsabos.** Customer Community Plus enthält keine Report Subscriptions. Ein Buyer Manager, der wöchentlich einen Bericht per E-Mail erwartet, bekommt ihn auf diesem Weg nicht.

## Was gilt für Vertrieb und Innendienst?

Interne Mitarbeiter arbeiten in Salesforce mit ihrer internen Lizenz. In der Trailhead-Liste der Store-Personas kommt kein Außendienst vor. Zwei aktuelle Funktionen zielen auf ihn:

- **Bestellvorlagen**, laut [Seite zu den Commerce-Neuerungen](https://www.salesforce.com/de/commerce/innovations/) seit September 2026 allgemein verfügbar: Käufer und Vertriebsmitarbeiter legen häufige Bestellungen an, speichern sie und verwenden sie wieder.
- **Reorder Portal**: Ein Vertriebsmitarbeiter lädt einen Käufer auf eine Seite mit früheren Bestellungen ein, die er direkt nachbestellen kann. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-reorder-portal-quick-look/boost-sales-with-the-reorder-portal) braucht die Anbindung an Sales Cloud eine Agentforce-Commerce-Lizenz und eine aktivierte Digital Experience.

Mein Rat: Schreiben Sie pro interner Gruppe auf, was sie im Store tut, zum Beispiel ob sie den Shop aus Händlersicht ansieht, im Namen eines Händlers bestellt oder den Katalog pflegt, und lassen Sie sich im Angebot bestätigen, welche Lizenz welche Tätigkeit abdeckt. Welche internen Nutzer wirklich eine volle Lizenz brauchen, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Login-Tage pro Käufer zählen

Legen Sie eine Liste mit vier Spalten an: Rolle, Anzahl Personen, Login-Tage pro Monat und Lizenz. Füllen Sie die Liste mit Daten aus Ihren Aufträgen der letzten zwölf Monate: Wer hat wie oft per Telefon, E-Mail oder Portal bestellt? Prüfen Sie dann die Limits oben, vor allem Rollen und den Account Switcher bei Händlergruppen. Ob ein Shop oder ein Portal überhaupt zu Ihren Händlern passt, klärt [B2B Commerce oder Händlerportal](../b2b-commerce-oder-haendlerportal/), das ganze Kostenbild steht in [Kapitel 1 der Masterclass B2B Commerce](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/). Lizenzprognosen wie diese gehören zu meiner Arbeit bei [Make-or-Buy und Lizenzen](../../leistungen/make-or-buy-lizenzen/).
