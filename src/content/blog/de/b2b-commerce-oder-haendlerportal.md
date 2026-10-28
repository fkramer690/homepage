---
title: "B2B Commerce oder Händlerportal: Wann lohnt ein Shop?"
description: "Wann Hersteller Salesforce B2B Commerce statt eines Portals auf Experience Cloud oder Manufacturing Cloud brauchen: Funktionen, Käuferlizenzen, vier Kriterien."
pubDate: 2026-10-28
lang: de
slug: b2b-commerce-oder-haendlerportal
translationKey: commerce-shop-or-portal
topic: commerce
categories: [b2b-commerce, manufacturing-cloud]
tags: [B2B Commerce, Experience Cloud, Händlerportal, Manufacturing Cloud, Ersatzteile, Lizenzen]
takeaways:
  - "Ein Portal auf Experience Cloud oder Manufacturing Cloud zeigt Daten und nimmt Anfragen an. Salesforce B2B Commerce ergänzt Katalog, Sichtbarkeit je Käufergruppe, Käuferpreise, Warenkorb und Checkout."
  - "Käufer in einem B2B-Store brauchen eine Customer-Community-Plus-Lizenz, dieselbe Lizenzfamilie wie im Kundenportal. Zum Listenpreis sind das 35 € pro Mitglied oder 15 € pro Login im Monat."
  - "Ein Shop lohnt sich, wenn Händler bekannte Teilenummern in Menge nachbestellen und ein großer Teil dieser Bestellungen noch per Telefon oder E-Mail kommt."
  - "Konfigurierte Maschinen bleiben im Vertrieb und im Angebot. Ein Shop verkauft, was ein Händler ohne Gespräch bestellen kann."
  - "In einem typischen Szenario mit 250 Händlern und 30.000 Ersatzteil-Bestellpositionen im Jahr bestellt jeder Händler rund zehn Positionen im Monat, genug für einen Katalog mit Warenkorb."
faq:
  - q: "Was ist der Unterschied zwischen Händlerportal und B2B-Shop in Salesforce?"
    a: "Ein Portal auf Experience Cloud zeigt Datensätze wie Bestellungen, Verträge und Cases und nimmt Anfragen über Formulare an. Salesforce B2B Commerce ergänzt einen Produktkatalog, Sichtbarkeitsregeln je Käufergruppe, Preise je Käufer, Warenkorb, Checkout und Nachbestellen aus früheren Aufträgen."
  - q: "Welche Lizenz brauchen Käufer in Salesforce B2B Commerce?"
    a: "Laut Trailhead nutzen Käufer und Buyer Manager Customer Community Plus mit der Berechtigung B2B Commerce User oder B2B Commerce Super User. In Experience Cloud for Manufacturing kostet sie laut Preisliste 35 € pro Mitglied oder 15 € pro Login im Monat, jährlich abgerechnet."
  - q: "Können Händler im Manufacturing-Cloud-Portal ohne B2B Commerce bestellen?"
    a: "Ja, ein Portal kann Bestellungen annehmen, etwa als Auftragsdatensatz oder Formular. Es fehlen aber ein durchsuchbarer Katalog mit Sichtbarkeitsregeln, eine Preisberechnung je Käufer und ein Warenkorb. Für gelegentliche Bestellungen reicht das, für Hunderte Positionen im Monat nicht."
  - q: "Heißt Salesforce B2B Commerce jetzt Agentforce Commerce?"
    a: "Trailhead schreibt, B2B Commerce heiße jetzt Agentforce Commerce for B2B. Die Salesforce-Hilfe nennt das Produkt weiter Salesforce B2B Commerce, und die Preisseite verkauft es als Commerce Cloud B2B Growth und Advanced Edition."
draft: false
---

Ein Hersteller braucht Salesforce B2B Commerce statt eines Portals, wenn Händler und Kunden bekannte Artikel in Menge nachbestellen: Ersatzteile, Verbrauchsmaterial, Zubehör. Ein Portal auf Experience Cloud oder Manufacturing Cloud zeigt Verträge, Bestellungen und Cases und nimmt Anfragen an. Ein B2B-Store ergänzt, was wiederkehrendes Einkaufen braucht: Katalog, Sichtbarkeit je Käufergruppe, Käuferpreise, Warenkorb und Checkout. Die Käuferlizenz stammt in beiden Fällen aus derselben Familie. Den Unterschied machen die Commerce-Gebühr und die Umsetzung. Meine Faustregel: Schicken Ihnen Händler jede Woche Bestelllisten, bauen Sie einen Shop. Rufen sie zweimal im Jahr wegen einer Maschine an, reicht ein Portal.

## Was leistet ein Portal, und was ergänzt ein Shop?

Ein Portal ist eine Experience-Cloud-Site, auf der externe Nutzer ihre eigenen Datensätze sehen und bearbeiten. In [Kundenportal in der Manufacturing Cloud: was Kunden sehen](../manufacturing-cloud-kundenportal/) beschreibe ich ein Portal, in dem Kunden Sales Agreements, Bestellungen, Stammdaten und Cases sahen und Produkte, Preise oder Bestellungen anfragen konnten. Das deckt "zeig mir" und "erledige das bitte für mich" ab.

Salesforce B2B Commerce deckt "ich kaufe das selbst" ab. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5) startet der Hersteller einen Store aus einer Vorlage im Experience Builder und legt Suche, Warenkorb und Checkout für Geschäftskunden fest. Das Datenmodell dahinter, wie [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-experience-data-model/organize-how-buyers-access-your-store) es beschreibt:

- **Buyer Accounts** sind normale Salesforce-Accounts, deren Kontakte als Käufer freigeschaltet werden.
- **Buyer Groups** (Käufergruppen) bündeln ähnliche Buyer Accounts, zum Beispiel alle Premiumhändler eines Landes.
- **Entitlement Policies** legen fest, welche Produkte eine Käufergruppe sieht.
- **Preisbücher** bestimmen, welche Preise eine Käufergruppe bekommt.

Dazu kommen Warenkorb, Checkout und die Order Summary, die der Käufer in seiner Bestellhistorie sieht. Salesforce vermarktet das Produkt inzwischen auch als "Agentforce Commerce for B2B", so steht es auf [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping). Hilfe und Preisseite verwenden noch die älteren Namen.

| | Portal (Experience Cloud, Manufacturing Cloud) | Salesforce B2B Commerce |
|---|---|---|
| Typischer Einsatz | Datensätze ansehen, anfragen, Case melden | Suchen, auswählen, bestellen, nachbestellen |
| Produkte | Auf Datensätzen angezeigt, kein Katalog | Katalog mit Suche und Filtern |
| Wer sieht was | Freigaberegeln auf Datensätzen | Entitlement Policies je Käufergruppe |
| Preise | Sichtbar, wenn jemand sie auf Datensätzen pflegt | Preisbücher je Käufergruppe, im Warenkorb berechnet |
| Bestellen | Formular oder Auftragsdatensatz | Warenkorb und Checkout |
| Zusätzliche Gebühr | Nur Lizenzen | Anteil am Umsatz über den Store |

## Welche Lizenz brauchen Käufer?

Hier liegen beide Varianten näher beieinander, als viele erwarten. Trailhead nennt die [Personas und Berechtigungen](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-roles-permissons-store-setup/define-personas-permissions) für einen B2B-Store: Käufer und Buyer Manager nutzen eine Customer-Community-Plus-Lizenz. Käufer bekommen die Berechtigung B2B Commerce User, Buyer Manager B2B Commerce Super User plus Delegated External User Administration, damit sie die Käufer ihres eigenen Unternehmens betreuen können. Merchandiser, die den Store intern pflegen, brauchen die Lizenz "B2B and D2C Commerce".

Customer Community Plus ist auch die Lizenzfamilie für ein Kundenportal. Laut [Preisliste für Experience Cloud for Manufacturing](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) kostet Customer Community Plus 35 € pro Mitglied oder 15 € pro Login im Monat, jährlich abgerechnet. Partner Community kostet 50 € oder 20 €.

Die Käuferlizenz entscheidet also nicht zwischen Portal und Shop. Den Unterschied machen die Commerce-Gebühr, die Salesforce als Anteil am Umsatz über den Store berechnet, und der Aufwand für Katalog, Preise und ERP-Aufrufe. Die Gebühr erkläre ich in [B2B Commerce Preise: Was das GMV-Modell kostet](../b2b-commerce-preise-gmv-modell/). Wie sich Portallizenzen von internen Lizenzen unterscheiden, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Wann lohnt sich ein Shop?

Ich schaue auf vier Zahlen, bevor jemand über Store-Vorlagen spricht:

1. **Wiederholte Bestellungen bekannter Teilenummern.** Ein Store ist stark, wenn der Käufer weiß, was er will: den Filter vom letzten Quartal, das Verschleißteil aus der Stückliste. Je mehr Bestellungen sich auf eine Teilenummer beziehen, desto mehr hilft ein Katalog.
2. **Bestellpositionen pro Jahr.** Jede Position, die der Innendienst abtippt, kostet Zeit und birgt ein Fehlerrisiko. Ein paar Hundert Positionen im Jahr rechtfertigen keinen Store. Zehntausende meist schon.
3. **Anzahl bestellender Händler und Kunden.** Bei fünf Großkunden über EDI bringt ein Store wenig. Bei Hunderten kleiner Händler, die per E-Mail bestellen, bringt er viel.
4. **Anteil der Bestellungen per Telefon und E-Mail.** Das ist das Volumen, das ein Store tatsächlich verschieben kann. Was heute schon per EDI kommt, bleibt dort.

Bekommen Sie diese Zahlen nicht innerhalb einer Woche aus dem ERP, würde ich sie vor jedem weiteren Schritt erheben. Sie sind auch die Grundlage für den [Business Case eines B2B-Webshops](../b2b-webshop-business-case-hersteller/).

## Ein typisches Szenario, als Annahme

Ein typisches Szenario, als Annahme: Ein Hersteller von Kompressoren verkauft über 250 Händler in Europa. Die Händler bestellen rund 30.000 Ersatzteil-Bestellpositionen im Jahr, meist per E-Mail mit einer Liste von Teilenummern, manche per Telefon. Der Innendienst erfasst jede Position in SAP. Für Garantiefälle nutzen die Händler bereits ein Portal.

Das sind rund 120 Positionen pro Händler und Jahr, etwa zehn im Monat. Die Händler kennen ihre Teilenummern, sie bestellen dieselben Verschleißteile nach, und sie würden auch außerhalb der Geschäftszeiten bestellen, wenn sie könnten. Hier würde ich einen Store bauen und das Portal für Cases behalten. Der [B2B-Commerce-Teil der Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5) enthält eine Anleitung, wie man einen B2B-Store zu einer bestehenden Experience-Cloud-Site hinzufügt, sodass Portal und Store auf einer Site laufen können.

Ändern Sie eine Annahme: Derselbe Hersteller hat 20 Händler, die zweimal im Jahr komplette Kompressoren bestellen, jeden in einer anderen Konfiguration. Dann bringt ein Store nichts. Der Händler braucht ein Angebot, und das Portal zeigt dessen Status.

## Wo reicht ein Portal?

Ein Portal ist in diesen Fällen die bessere Antwort:

- **Konfigurierte Maschinen.** Eine Maschine mit Optionen, Aufstellungsplan und einem Liefertermin, den der Vertrieb bestätigen muss, gehört in einen Angebotsprozess. Ein Store verkauft, was ein Käufer ohne Gespräch bestellen kann.
- **Wenige Bestellungen, viele Fragen.** Fragen Händler vor allem nach Status, Dokumenten oder Garantie, erledigt das ein Portal mit Cases, Bestellungen und Anlagen.
- **Bestellungen laufen schon über EDI.** Großkunden, die aus ihrem eigenen ERP bestellen, steigen nicht auf Klicken im Store um.

Und manchmal ist Salesforce gar nicht die Antwort. Hat das Unternehmen kein Salesforce-CRM, bringt der Store die ganze Plattform mit. Deckt das Commerce-Modul Ihres ERP-Anbieters Preise und Bestand schon ab, prüfen Sie das zuerst. Bei einem sehr kleinen Katalog und wenigen Händlern ist ein einfaches Bestellformular günstiger als jedes Shopsystem.

## Wo starten Sie?

Ziehen Sie die vier Zahlen für die letzten zwölf Monate: Bestellpositionen, Anteil mit Teilenummer, bestellende Händler, Anteil per Telefon und E-Mail. Sprechen sie für einen Store, folgen die Fragen, wem Preise und Bestand gehören, welche Käufergruppen Sie brauchen und welche ERP-Aufrufe live sein müssen. Sie stehen im [Masterclass-Kapitel zur Frage, ob sich B2B Commerce lohnt](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/). Eine unabhängige Sicht auf Make or Buy gehört zu meiner Arbeit bei [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

Ein Shop lohnt sich, wenn Händler bekannte Teile in Menge nachbestellen, und ein Portal reicht, wenn sie vor allem Fragen haben. Wenn Sie prüfen möchten, was Ihre Händler brauchen, [schreiben Sie mir](#contact).
