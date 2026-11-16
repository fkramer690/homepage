---
title: "B2B Commerce Preise: Was das GMV-Modell kostet"
metaTitle: "Salesforce B2B Commerce Preise: was das GMV-Modell kostet"
description: "Salesforce veröffentlicht keinen Satz für B2B Commerce. So rechnen Hersteller GMV-Gebühr, Growth oder Advanced, Käuferlizenzen und Zusatzkosten durch."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: b2b-commerce-preise-gmv-modell
translationKey: commerce-gmv-pricing
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: licences
tags: [B2B Commerce, Preise, GMV, Lizenzen, Order Management, Make-or-Buy]
takeaways:
  - "B2B Commerce gibt es als Growth und Advanced Edition. Die Gebühr ist ein Prozentsatz des Bruttowarenwerts (GMV), den Satz veröffentlicht Salesforce nicht."
  - "GMV ist der Store-Umsatz abzüglich Steuern und Versand. Es zählen nur Bestellungen über die Storefront, nicht per EDI, Telefon oder aus anderen Kanälen."
  - "Growth enthält 6 Storefronts, Order Management Lite und 250.000 Data-Cloud-Credits, Advanced 10 Storefronts, volles Order Management und 500.000 Credits."
  - "Nicht in der Gebühr: Lizenzen für externe Nutzer, Revenue Cloud Advanced für Preislogik, eigenständiges Order Management, Umsetzung und ERP-Anbindung."
  - "Lassen Sie sich GMV-Definition, Satz, Mindestbetrag und Nachberechnung schriftlich geben. Die 1 bis 2 Prozent stammen von Integratoren, nicht von Salesforce."
faq:
  - q: "Was kostet Salesforce B2B Commerce?"
    a: "Salesforce veröffentlicht keinen Preis. Growth und Advanced Edition stehen beide auf \"Preisangebot anfordern\", und die Preisseite sagt, Salesforce berechne einen Prozentsatz des Bruttowarenwerts je nach benötigtem Funktionsumfang. Der Satz steht in Ihrem Angebot."
  - q: "Was zählt bei Salesforce B2B Commerce als GMV?"
    a: "Laut Preisseite ist GMV der Gesamtumsatz über Ihre Website abzüglich Steuern und Versandkosten. Bei Growth und Advanced berechnet Salesforce GMV nur für den Umsatz, der über die Commerce-Storefront erzielt wird."
  - q: "Was ist der Unterschied zwischen B2B Commerce Growth und Advanced?"
    a: "Growth enthält 6 Storefronts, Order Management Lite, 250.000 Data-Cloud-Credits und 3 CRM-Analytics-Nutzer. Advanced enthält 10 Storefronts, volles Order Management, 500.000 Credits und 5 Nutzer. Beide enthalten 20 Lagerorte und Merchant Agent."
  - q: "Brauchen Käufer in B2B Commerce zusätzliche Lizenzen?"
    a: "Ja, abhängig von der Rolle. Laut Salesforce-Hilfe benötigen Käufer eine External-Apps-Lizenz oder höher; Buyer Manager und Account Switcher benötigen Customer Community Plus oder höher. Customer Community Plus kostet laut Preisliste für Experience Cloud for Manufacturing 35 € pro Mitglied oder 15 € pro Login im Monat, zusätzlich zur GMV-Gebühr."
  - q: "Stimmt es, dass B2B Commerce 1 oder 2 Prozent vom GMV kostet?"
    a: "Integratoren nennen etwa 1 Prozent für Growth und 2 Prozent für Advanced. Salesforce bestätigt diese Zahlen auf der Preisseite nicht, dort steht nur \"Preisangebot anfordern\". Nutzen Sie sie als groben Startwert und ersetzen Sie sie durch den Satz aus Ihrem Angebot."
draft: false
---

Salesforce B2B Commerce hat keinen Listenpreis. Beide Editionen, Growth und Advanced, stehen auf "Preisangebot anfordern", und die Gebühr ist ein Prozentsatz des Bruttowarenwerts (Gross Merchandise Value, GMV): der Umsatz über den Store abzüglich Steuern und Versandkosten. Einen Prozentsatz veröffentlicht Salesforce nicht. Die Kosten wachsen also mit dem Erfolg des Shops, und bei einem Hersteller mit mehreren Millionen Euro Ersatzteilumsatz wird die Gebühr schnell zum größten Posten. Zusätzlich fallen Käuferlizenzen, eventuell Revenue Cloud Advanced und eigenständiges Order Management sowie die Umsetzung an. Ich würde mit einer Spanne möglicher Prozentsätze planen und die GMV-Definition vor der Unterschrift schriftlich festhalten.

## Wie funktioniert das GMV-Modell?

Die [deutsche Preisseite für B2B Commerce](https://www.salesforce.com/de/commerce/b2b-ecommerce/pricing/) sagt: "Wir berechnen einen Prozentsatz des Bruttowarenwerts (GMV)". In den FAQ derselben Seite heißt es: "GMV ist der Bruttowarenwert, also der Gesamtwert der verkauften Waren. Er errechnet sich aus dem Gesamtumsatz über Ihre Website abzüglich Steuern und Versandkosten." Bei Growth und Advanced zählt nur der Umsatz über die Commerce-Storefront. Die [englische Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) formuliert es genauso.

Für einen Hersteller folgt daraus dreierlei:

- **Nur Store-Bestellungen zählen.** Bestellungen, die weiterhin per EDI, E-Mail oder Telefon eingehen und im ERP erfasst werden, sind kein GMV. Ebenso wenig zählen Aufträge, die der Vertrieb für einen Händler außerhalb des Stores anlegt, solange sie nicht über die Storefront erfasst werden.
- **Steuern und Versand fallen heraus.** Wie Rabatte, Stornos, Retouren und Gutschriften zählen, sagt die Preisseite nicht. Das muss der Vertrag regeln.
- **Die Gebühr wächst mit der Nutzung.** Jeder Händler, den Sie vom Bestellweg E-Mail auf den Store umstellen, erhöht die Rechnung. Das ist der Sinn des Modells, und es gehört in den Business Case.

Salesforce vermarktet das Produkt inzwischen auch als "Agentforce Commerce for B2B", so steht es auf [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping). Auf der Preisseite heißen die Editionen weiter Commerce Cloud B2B Growth Edition und Commerce Cloud B2B Advanced Edition.

## Growth und Advanced im Vergleich

Die Preisseite nennt diese Positionen (Oktober 2026):

| | Growth | Advanced |
|---|---|---|
| Storefronts | 6 | 10 |
| Lagerorte (Inventory Locations) | 20 | 20 |
| Order Management | Order Management Lite | Volles Order Management |
| Data Cloud for Commerce | Analyse und Segmentierung | Erweiterte Analyse und Segmentierung |
| Data-Cloud-Credits | 250.000 | 500.000 |
| Agentforce | Merchant Agent | Merchant Agent |
| CRM Analytics | 3 Nutzer | 5 Nutzer |
| Knowledge Management | 3 Nutzer | 5 Nutzer |

Für die meisten Hersteller ist die Zeile Order Management die entscheidende. [Order Management](https://trailhead.salesforce.com/content/learn/modules/scom-order-management/scom-som-get-started) ist die Salesforce-Lösung, die einen Auftrag nach dem Checkout weiterverarbeitet: Zuordnung zum Lager, Lieferung, Änderungen und Retouren. Bleibt das ERP das führende System für den Auftrag, was bei SAP der Normalfall ist, und sollen Zuordnung, Stornos und Retouren nicht in Salesforce abgewickelt werden, bietet volles Order Management meist wenig Mehrwert. Entscheidend ist, welche Prozessschritte Salesforce übernehmen soll. Die Zahl der Storefronts ist relevant, wenn Sie getrennte Stores je Marke oder Gesellschaft betreiben. Für Länder und Händlerstufen reichen meist Käufergruppen in einem Store.

Für Bestandskunden gilt eine Regel: Laut Preisseite müssen Kunden, die bereits Order Management nutzen, auf Commerce Cloud Advanced verlängern. Upgrades während der Vertragslaufzeit sind möglich.

## Käuferlizenzen, Umsetzung und ERP-Anbindung kommen dazu

Hier liegen Schätzungen am häufigsten daneben. Die GMV-Gebühr deckt den Store und die Positionen aus dem Editionsvergleich ab. Dazu kommen:

1. **Lizenzen für externe Nutzer.** Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.commerce_buyer_and_buyer_mgr_perm_sets.htm&language=en_US&type=5) benötigen Käufer eine External-Apps-Lizenz oder höher; Buyer Manager und Account Switcher benötigen Customer Community Plus oder höher. Für Customer Community Plus nennt die [Preisliste für Experience Cloud for Manufacturing](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) 35 € pro Mitglied oder 15 € pro Login im Monat, jährlich abgerechnet. Interne Merchandiser und Commerce-Admins erhalten laut [Hilfe](https://help.salesforce.com/s/articleView?id=sf.comm_personas.htm&language=en_US&type=5) ein Permission Set, das sich mit einer Identity-Lizenz kombinieren lässt.
2. **Erweiterte Preislogik.** Vertragspreise, Pricing Procedures und Request for Quote sind Teil von Agentforce Revenue Management for B2B Commerce. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) sind dafür eine Commerce-Growth- oder Advanced-Lizenz plus eine Revenue-Cloud-Advanced-Lizenz erforderlich.
3. **Order Management für andere Kanäle.** Bestellungen aus anderen Kanälen oder Drittsystemen, die über Salesforce Order Management abgewickelt werden sollen, erfordern laut Preisseite ein eigenständig gekauftes Order Management.
4. **Umsetzung und ERP-Anbindung.** Katalog, Sichtbarkeitsregeln, Preisaufrufe, Bestand und Auftragsübergabe an SAP sind Projektarbeit, meist der größte einmalige Posten.
5. **Verbrauch.** Die Editionen enthalten Data-Cloud-Credits und führen Merchant Agent auf. Daraus folgt nicht, dass jede Agentforce-Nutzung abgedeckt ist. Lassen Sie sich im Angebot getrennt zeigen, welche Data-360- und Agentforce-Kontingente enthalten sind und was Mehrverbrauch kostet. Wie sich Flex Credits und Data-360-Verbrauch summieren, steht im [Masterclass-Kapitel zu Kosten und Token](/masterclass/ki-salesforce/kosten-und-token/).

## Was bedeuten die Zahlen von 1 bis 2 Prozent?

Integratoren veröffentlichen Sätze von etwa 1 Prozent des GMV für Growth und 2 Prozent für Advanced, zum Beispiel in [Elogics Preisübersicht](https://elogic.co/blog/salesforce-pricing-plans).

```hinweis achtung
Salesforce bestätigt diese Zahlen nicht: Die Preisseite zeigt für beide Editionen nur "Preisangebot anfordern". Ich behandle sie als groben Startwert für eine erste Schätzung, mehr nicht.
```

Lieber rechne ich mit dem Satz als Variable. Rechenbeispiel: Ein Hersteller erwartet im dritten Jahr 15 Millionen Euro Ersatzteilumsatz über den Store, ohne Steuern und Versand. Jeder Prozentpunkt GMV entspricht dann 150.000 Euro im Jahr. Der Unterschied zwischen einem Angebot mit 1 Prozent und einem mit 2 Prozent ist mehr als das Gehalt einer Person im Innendienst. Deshalb verhandeln Sie den Satz, nicht die Lizenzanzahl.

Die Lizenzen für externe Nutzer sind trotzdem kein Nebenposten, und der Rollenmix entscheidet. Im selben Szenario mit 250 Händlern: Hätte jeder Händler einen Buyer Manager mit Customer Community Plus als Mitgliedslizenz, wären das 250 mal 35 € mal 12, also 105.000 € im Jahr zum Listenpreis. Reicht für die meisten Käufer eine External-Apps-Lizenz, fällt der Betrag niedriger aus. Bestellt ein Teil der Händler nur an wenigen Tagen im Monat, kann eine Login-Lizenz günstiger sein, weil laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) mehrere Logins am selben Tag nur einen Login verbrauchen. Diese Aufteilung sollte vor dem Angebot geprüft werden, nicht danach.

## Was gehört in den Vertrag?

Vor der Unterschrift würde ich diese Punkte schriftlich festhalten:

- **Die GMV-Definition.** Welche Bestellungen zählen, wie Retouren und Gutschriften behandelt werden, welche Währung und welcher Umrechnungskurs gelten.
- **Den Satz und seine Basis.** Ein fester Prozentsatz, Staffeln nach Volumen oder ein Mindestbetrag.
- **Mindestmenge und Nachberechnung.** Ob ein GMV zugesagt wird und was passiert, wenn über den Store mehr oder weniger verkauft wird als geplant. Die Preisseite enthält keine Angaben zu Mindestbeträgen.
- **Vom Innendienst erfasste Bestellungen.** Ob Bestellungen, die der Innendienst für einen Händler im Store anlegt, als GMV zählen.
- **Verlängerung.** Auf welche Edition Sie verlängern, vor allem wenn Order Management Teil des Plans ist.
- **Support.** Welcher Success Plan enthalten ist und was ein höherer kostet.

Wie die Editionen der Kernplattform einen Lizenzplan verändern, beschreibe ich in [Salesforce-Editionen Core, Advanced, Max](/blog/salesforce-editionen-core-advanced-max/). Welchen Lizenztyp welche Nutzergruppe braucht, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](/blog/salesforce-lizenzen-volle-lizenz/).

## Die Gebühr mit 1, 2 und 3 Prozent rechnen

Schätzen Sie das Store-GMV für drei Jahre mit steigendem digitalem Anteil und rechnen Sie die Gebühr mit 1, 2 und 3 Prozent neben Lizenzen für externe Nutzer, Support und Umsetzung. Trägt der Business Case nur beim niedrigsten Satz, kennen Sie Ihre Verhandlungsposition vor dem ersten Termin. Die vollständige Rechnung steht im [Business Case für einen B2B-Webshop](/blog/b2b-webshop-business-case-hersteller/), und welche Rolle die Preise in der Gesamtentscheidung spielen, zeigt das [Masterclass-Kapitel zur Frage, ob sich B2B Commerce lohnt](/masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/). Eine unabhängige Prüfung von Angeboten gehört zu meiner Arbeit bei [Make-or-Buy und Lizenzprognosen](/leistungen/make-or-buy-lizenzen/).
