---
title: "B2B Commerce Preise: Was das GMV-Modell kostet"
description: "Wie Salesforce B2B Commerce als Anteil am GMV abrechnet, was Growth und Advanced enthalten und was dazukommt: Käuferlizenzen, Order Management, Preislogik."
pubDate: 2026-10-28
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
  - "Nicht in der Gebühr: Käuferlizenzen, Revenue Cloud Advanced für Preislogik, eigenständiges Order Management, Umsetzung und ERP-Anbindung."
  - "Lassen Sie sich GMV-Definition, Satz, Mindestbetrag und Nachberechnung schriftlich geben. Die 1 bis 2 Prozent stammen von Integratoren, nicht von Salesforce."
faq:
  - q: "Was kostet Salesforce B2B Commerce?"
    a: "Salesforce veröffentlicht keinen Preis. Growth und Advanced Edition stehen beide auf \"Preisangebot anfordern\", und die Preisseite sagt, Salesforce berechne einen Prozentsatz des Bruttowarenwerts je nach benötigtem Funktionsumfang. Der Satz steht in Ihrem Angebot."
  - q: "Was zählt bei Salesforce B2B Commerce als GMV?"
    a: "Laut Preisseite ist GMV der Gesamtumsatz über Ihre Website abzüglich Steuern und Versandkosten. Bei Growth und Advanced berechnet Salesforce GMV nur für den Umsatz, der über die Commerce-Storefront läuft."
  - q: "Was ist der Unterschied zwischen B2B Commerce Growth und Advanced?"
    a: "Growth enthält 6 Storefronts, Order Management Lite, 250.000 Data-Cloud-Credits und 3 CRM-Analytics-Nutzer. Advanced enthält 10 Storefronts, volles Order Management, 500.000 Credits und 5 Nutzer. Beide enthalten 20 Lagerorte und Merchant Agent."
  - q: "Brauchen Käufer in B2B Commerce zusätzliche Lizenzen?"
    a: "Ja. Laut Trailhead brauchen Käufer und Buyer Manager eine Customer-Community-Plus-Lizenz. Laut Preisliste für Experience Cloud for Manufacturing kostet sie 35 € pro Mitglied oder 15 € pro Login im Monat, jährlich abgerechnet, zusätzlich zur GMV-Gebühr."
  - q: "Stimmt es, dass B2B Commerce 1 oder 2 Prozent vom GMV kostet?"
    a: "Integratoren nennen etwa 1 Prozent für Growth und 2 Prozent für Advanced. Salesforce bestätigt diese Zahlen auf der Preisseite nicht, dort steht nur \"Preisangebot anfordern\". Nutzen Sie sie als groben Startwert und ersetzen Sie sie durch den Satz aus Ihrem Angebot."
draft: false
---

Salesforce B2B Commerce hat keinen Listenpreis. Beide Editionen, Growth und Advanced, stehen auf "Preisangebot anfordern", und die Gebühr ist ein Prozentsatz des Bruttowarenwerts (Gross Merchandise Value, GMV): der Umsatz über den Store abzüglich Steuern und Versandkosten. Einen Prozentsatz veröffentlicht Salesforce nicht. Die Kosten wachsen also mit dem Erfolg des Shops, und bei einem Hersteller mit mehreren Millionen Ersatzteilumsatz wird die Gebühr schnell zum größten Posten. Dazu kommen Käuferlizenzen, eventuell Revenue Cloud Advanced und eigenständiges Order Management sowie die Umsetzung. Ich würde mit einer Spanne von Sätzen planen und die GMV-Definition vor der Unterschrift schriftlich festhalten.

## Wie funktioniert das GMV-Modell?

Die [deutsche Preisseite für B2B Commerce](https://www.salesforce.com/de/commerce/b2b-ecommerce/pricing/) sagt: "Wir berechnen einen Prozentsatz des Bruttowarenwerts (GMV)". In den FAQ derselben Seite heißt es: "GMV ist der Bruttowarenwert, also der Gesamtwert der verkauften Waren. Er errechnet sich aus dem Gesamtumsatz über Ihre Website abzüglich Steuern und Versandkosten." Bei Growth und Advanced zählt nur der Umsatz über die Commerce-Storefront. Die [englische Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) formuliert es genauso.

Für einen Hersteller folgt daraus dreierlei:

- **Nur Store-Bestellungen zählen.** Bestellungen, die weiter per EDI, E-Mail oder Telefon kommen und im ERP erfasst werden, sind kein GMV. Ebenso wenig Aufträge, die der Vertrieb für einen Händler außerhalb des Stores anlegt, solange sie nicht über die Storefront laufen.
- **Steuern und Versand fallen heraus.** Basis ist der Nettowarenwert.
- **Die Gebühr wächst mit der Nutzung.** Jeder Händler, den Sie von der E-Mail in den Store holen, erhöht die Rechnung. Das ist der Sinn des Modells, und es gehört in den Business Case.

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

Für die meisten Hersteller ist die Zeile Order Management die entscheidende. [Order Management](https://trailhead.salesforce.com/content/learn/modules/scom-order-management/scom-som-get-started) ist die Salesforce-Lösung, die einen Auftrag nach dem Checkout weiterverarbeitet: Zuordnung zum Lager, Lieferung, Änderungen und Retouren. Bleibt das ERP Eigentümer des Auftrags, was bei SAP der Normalfall ist, bringt volles Order Management in Salesforce wenig. Die Zahl der Storefronts zählt, wenn Sie getrennte Stores je Marke oder Gesellschaft betreiben. Für Länder und Händlerstufen reichen meist Käufergruppen in einem Store.

Für Bestandskunden gilt eine Regel: Laut Preisseite müssen Kunden, die bereits Order Management nutzen, auf Commerce Cloud Advanced verlängern. Upgrades während der Vertragslaufzeit sind möglich.

## Käuferlizenzen, Umsetzung und ERP-Anbindung kommen dazu

Hier liegen Schätzungen am häufigsten daneben. Die GMV-Gebühr deckt den Store und die Positionen oben ab. Dazu kommen:

1. **Käuferlizenzen.** Laut Salesforce brauchen Käufer und Buyer Manager Customer Community Plus. Die [Preisliste für Experience Cloud for Manufacturing](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) nennt 35 € pro Mitglied oder 15 € pro Login im Monat, jährlich abgerechnet. Merchandiser brauchen die Lizenz "B2B and D2C Commerce".
2. **Erweiterte Preislogik.** Vertragspreise, Pricing Procedures und Request for Quote kommen mit Agentforce Revenue Management for B2B Commerce. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) braucht das eine Commerce-Growth- oder Advanced-Lizenz plus eine Revenue-Cloud-Advanced-Lizenz.
3. **Order Management für andere Kanäle.** Bestellungen aus anderen Kanälen oder Drittsystemen, die über Salesforce Order Management laufen sollen, brauchen laut Preisseite ein eigenständig gekauftes Order Management.
4. **Umsetzung und ERP-Anbindung.** Katalog, Sichtbarkeitsregeln, Preisaufrufe, Bestand und Auftragsübergabe an SAP sind Projektarbeit, meist der größte einmalige Posten.
5. **Agentenverbrauch über die enthaltenen Credits hinaus.** Data-Cloud-Credits sind enthalten, aber wie weit 250.000 oder 500.000 reichen, hängt von Ihrer Nutzung ab. Wie sich Flex Credits und Data-360-Verbrauch summieren, steht im [Masterclass-Kapitel zu Kosten und Token](../../masterclass/ki-salesforce/kosten-und-token/).

## Was bedeuten die Zahlen von 1 bis 2 Prozent?

Integratoren veröffentlichen Sätze von etwa 1 Prozent des GMV für Growth und 2 Prozent für Advanced, zum Beispiel in [Elogics Preisübersicht](https://elogic.co/blog/salesforce-pricing-plans).

```hinweis achtung
Salesforce bestätigt diese Zahlen nicht: Die Preisseite zeigt für beide Editionen nur "Preisangebot anfordern". Ich behandle sie als groben Startwert für eine erste Schätzung, mehr nicht.
```

Lieber rechne ich mit dem Satz als Variable. Rechenbeispiel: Ein Hersteller erwartet im dritten Jahr 15 Millionen Euro Ersatzteilumsatz über den Store, ohne Steuern und Versand. Jeder Prozentpunkt GMV sind dann 150.000 Euro im Jahr. Der Unterschied zwischen einem Angebot mit 1 Prozent und einem mit 2 Prozent ist mehr als das Gehalt einer Person im Innendienst. Deshalb verhandeln Sie den Satz, nicht die Lizenzanzahl.

Die Käuferlizenzen sind trotzdem kein Kleingeld. Im selben Szenario mit 250 Händlern und je einem Käufer auf Mitgliedslizenz sind das 250 mal 35 € mal 12, also 105.000 € im Jahr zum Listenpreis. Bestellt ein Teil der Händler nur an wenigen Tagen im Monat, kann die Login-Lizenz zu 15 € günstiger sein, weil laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) mehrere Logins am selben Tag nur einen Login verbrauchen. Diese Aufteilung lohnt sich vor dem Angebot, nicht danach.

## Was gehört in den Vertrag?

Vor der Unterschrift würde ich diese Punkte schriftlich festhalten:

- **Die GMV-Definition.** Welche Bestellungen zählen, wie Retouren und Gutschriften behandelt werden, welche Währung und welcher Umrechnungskurs gelten.
- **Den Satz und seine Basis.** Ein fester Prozentsatz, Staffeln nach Volumen oder ein Mindestbetrag.
- **Mindestmenge und Nachberechnung.** Ob ein GMV zugesagt wird und was passiert, wenn der Store mehr oder weniger verkauft als geplant. Die Preisseite sagt zu Mindestbeträgen nichts.
- **Vom Innendienst erfasste Bestellungen.** Ob Bestellungen, die der Innendienst für einen Händler im Store anlegt, als GMV zählen.
- **Verlängerung.** Auf welche Edition Sie verlängern, vor allem wenn Order Management Teil des Plans ist.

Wie die Editionen der Kernplattform einen Lizenzplan verändern, beschreibe ich in [Salesforce-Editionen Core, Advanced, Max](../salesforce-editionen-core-advanced-max/). Welchen Lizenztyp welche Nutzergruppe braucht, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Erster Schritt: die Gebühr mit 1, 2 und 3 Prozent rechnen

Schätzen Sie das Store-GMV für drei Jahre mit steigendem digitalem Anteil und rechnen Sie die Gebühr mit 1, 2 und 3 Prozent neben Käuferlizenzen und Umsetzung. Trägt der Business Case nur beim niedrigsten Satz, kennen Sie Ihre Verhandlungsposition vor dem ersten Termin. Die vollständige Rechnung steht im [Business Case für einen B2B-Webshop](../b2b-webshop-business-case-hersteller/), und wo die Preise in der Gesamtentscheidung stehen, zeigt das [Masterclass-Kapitel zur Frage, ob sich B2B Commerce lohnt](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/). Eine unabhängige Prüfung von Angeboten gehört zu meiner Arbeit bei [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).
