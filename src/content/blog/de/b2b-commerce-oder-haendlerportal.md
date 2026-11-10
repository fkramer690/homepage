---
title: "B2B Commerce oder Händlerportal: Wann lohnt sich ein Shop?"
description: "Wann Hersteller Salesforce B2B Commerce statt eines Portals auf Experience Cloud brauchen: Funktionen, Käuferlizenzen und vier Kriterien für die Entscheidung."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: b2b-commerce-oder-haendlerportal
translationKey: commerce-shop-or-portal
topic: commerce
categories: [b2b-commerce, manufacturing-cloud]
tags: [B2B Commerce, Experience Cloud, Händlerportal, Manufacturing Cloud, Ersatzteile, Lizenzen]
takeaways:
  - "Ein Portal zeigt Daten und nimmt Anfragen an. B2B Commerce ergänzt Katalog, Sichtbarkeit je Käufergruppe, Käuferpreise, Warenkorb und Checkout von Haus aus."
  - "Einfache Käufer brauchen External Apps oder höher. Buyer Manager und Käufer, die Accounts wechseln, brauchen Customer Community Plus."
  - "Ein Shop lohnt sich, wenn Händler bekannte Teilenummern oft nachbestellen und viele dieser Bestellungen noch per Telefon oder E-Mail eingehen."
  - "Maschinen mit Engineering-Aufwand laufen weiter über Vertrieb und Angebot. Standardoptionen und Bundles lassen sich mit Revenue Management im Shop verkaufen."
  - "Im Rechenbeispiel mit 250 Händlern und 30.000 Positionen im Jahr passt ein Shop gut; ob er sich rechnet, zeigt erst ein eigener Business Case."
faq:
  - q: "Was ist der Unterschied zwischen Händlerportal und B2B-Shop in Salesforce?"
    a: "Ein Portal auf Experience Cloud zeigt Datensätze wie Bestellungen, Verträge und Cases und nimmt Anfragen über Formulare an. Salesforce B2B Commerce ergänzt einen Produktkatalog, Sichtbarkeitsregeln je Käufergruppe, Preise je Käufer, Warenkorb, Checkout und Nachbestellen aus früheren Aufträgen."
  - q: "Welche Lizenz brauchen Käufer in Salesforce B2B Commerce?"
    a: "Laut Salesforce-Hilfe braucht ein Käufer eine External-Apps-Lizenz oder höher mit dem Berechtigungssatz Buyer. Ein Buyer Manager, der Bestellungen anderer Käufer sieht, zwischen Accounts wechselt oder Berichte nutzt, braucht Customer Community Plus oder höher mit dem Berechtigungssatz Buyer Manager."
  - q: "Können Händler im Portal ohne B2B Commerce bestellen?"
    a: "Ja, ein Portal kann Bestellungen annehmen, etwa als Auftragsdatensatz oder Formular, und Katalog- oder Warenkorbfunktionen lassen sich mit eigenen Komponenten bauen. Von Haus aus fehlen aber ein durchsuchbarer Katalog mit Sichtbarkeitsregeln, eine Preisberechnung je Käufer und ein Warenkorb. Nach meiner Erfahrung reicht das für gelegentliche Bestellungen, für Hunderte Positionen im Monat nicht."
  - q: "Heißt Salesforce B2B Commerce jetzt Agentforce Commerce?"
    a: "Laut Trailhead heißt B2B Commerce jetzt Agentforce Commerce for B2B. Die Salesforce-Hilfe nennt das Produkt weiter Salesforce B2B Commerce, und die Preisseite verkauft es als Commerce Cloud B2B Growth und Advanced Edition."
draft: false
---

Ein Hersteller braucht Salesforce B2B Commerce statt eines Portals, wenn Händler und Kunden bekannte Artikel in größeren Mengen nachbestellen: Ersatzteile, Verbrauchsmaterial, Zubehör. Ein Portal auf Experience Cloud, auf Wunsch mit Experience Cloud for Manufacturing, zeigt Verträge, Bestellungen und Cases und nimmt Anfragen an. Ein B2B-Store ergänzt von Haus aus, was Käufer für wiederkehrende Einkäufe brauchen: Katalog, Sichtbarkeit je Käufergruppe, Käuferpreise, Warenkorb und Checkout. Die Kosten unterscheiden sich vor allem durch die Commerce-Gebühr und die Umsetzung. Meine Faustregel: Schicken Ihnen Händler jede Woche Bestelllisten, bauen Sie einen Shop. Rufen sie zweimal im Jahr wegen einer Maschine an, reicht ein Portal.

## Was leistet ein Portal, und was ergänzt ein Shop?

Ein Portal ist eine Experience-Cloud-Site, auf der externe Nutzer ihre eigenen Datensätze sehen und bearbeiten. In [Kundenportal in der Manufacturing Cloud: was Kunden sehen](../manufacturing-cloud-kundenportal/) beschreibe ich ein Portal, in dem Kunden Sales Agreements, Bestellungen, Stammdaten und Cases sahen und Produkte und Preise anfragen oder Bestellungen aufgeben konnten. Das deckt "zeig mir" und "erledige das bitte für mich" ab.

Salesforce B2B Commerce deckt "ich kaufe das selbst" ab. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5) starten Shopbetreiber einen Store aus einer Vorlage im Experience Builder und legen Suche, Warenkorb und Checkout für Geschäftskunden fest. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) beschreibt das Datenmodell dahinter so:

- **Buyer Accounts** sind normale Salesforce-Accounts, deren Kontakte als Käufer freigeschaltet werden.
- **Buyer Groups** (Käufergruppen) bündeln ähnliche Buyer Accounts, zum Beispiel alle Premiumhändler eines Landes.
- **Entitlement Policies** legen fest, welche Produkte eine Käufergruppe im Store sieht. Damit das als Zugriffskontrolle greift, sollte die externe Freigabe für Produkte auf privat stehen; sonst finden angemeldete Nutzer nicht freigegebene Produkte weiterhin über die API.
- **Preisbücher** bestimmen, welche Preise eine Käufergruppe bekommt.

Dazu kommen Warenkorb, Checkout und die Order Summary, die der Käufer in seiner Bestellhistorie sieht. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) heißt Commerce Cloud jetzt Agentforce Commerce und B2B Commerce jetzt Agentforce Commerce for B2B. Die Hilfe spricht weiter von B2B Commerce, und die Preisseite verkauft Commerce Cloud B2B Growth und Advanced Edition.

| Von Haus aus | Portal (Experience Cloud) | Salesforce B2B Commerce |
|---|---|---|
| Typischer Einsatz | Datensätze ansehen, Anfragen stellen, Cases melden | Suchen, auswählen, bestellen, nachbestellen |
| Produkte | Auf Datensätzen angezeigt, Katalog nur als Eigenbau | Katalog mit Suche und Filtern |
| Wer sieht was | Freigaberegeln auf Datensätzen | Entitlement Policies je Käufergruppe |
| Preise | Sichtbar, wenn jemand sie auf Datensätzen pflegt | Preisbücher je Käufergruppe, im Warenkorb berechnet |
| Bestellen | Formular oder Auftragsdatensatz | Warenkorb und Checkout |
| Zusätzliche Gebühr | Nur Lizenzen | Commerce-Edition, abgerechnet als Anteil am GMV des Stores |

## Einfache Käufer brauchen weniger als ein Portalnutzer

Die Salesforce-Hilfe beschreibt die [Personas und Berechtigungssätze](https://help.salesforce.com/s/articleView?id=commerce.commerce_buyer_and_buyer_mgr_perm_sets.htm&language=de&type=5) für einen B2B-Store: Ein Käufer braucht eine Lizenz für External Apps oder höher und bekommt den Berechtigungssatz Buyer. Ein Buyer Manager, der Bestellungen anderer Käufer sieht, zwischen Accounts wechselt oder Berichte nutzt, braucht Customer Community Plus oder höher und bekommt den Berechtigungssatz Buyer Manager. Delegated External User Administration ist nur nötig, wenn Buyer Manager andere externe Nutzer verwalten. Merchandiser und Commerce-Admins, die den Store intern pflegen, nutzen eine interne Standardlizenz mit dem Berechtigungssatz Merchandiser oder Commerce Admin.

Für Händler hängt die Portallizenz davon ab, was das Portal leisten soll: Customer Community Plus passt für Bestellen und Service, Partner Community für echten Partnervertrieb mit Leads, Opportunities und Angeboten. Die Listenpreise des Add-ons [Experience Cloud for Manufacturing](https://www.salesforce.com/eu/manufacturing/cloud/experience-cloud/), jährlich abgerechnet, Stand 9. November 2026:

```kennzahlen
35 € | Customer Community Plus pro Mitglied und Monat
15 € | Customer Community Plus pro Login und Monat
50 € | Partner Community pro Mitglied und Monat
20 € | Partner Community pro Login und Monat
quelle: Salesforce, Add-on Experience Cloud for Manufacturing, Listenpreise, jährliche Abrechnung
```

Die Käuferlizenz entscheidet also selten zwischen Portal und Shop; pro einfachem Käufer kann der Store sogar günstiger sein. Den Unterschied machen die Commerce-Edition und der Aufwand für Katalog, Preise und ERP-Aufrufe. Die Preisseite berechnet die Edition als Anteil am Warenwert, der über den Store läuft (GMV), und nennt Preise nur auf Anfrage. Die Gebühr erkläre ich in [B2B Commerce Preise: Was das GMV-Modell kostet](../b2b-commerce-preise-gmv-modell/). Wie sich Portallizenzen von internen Lizenzen unterscheiden, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Wann lohnt sich ein Shop?

Ich schaue auf vier Zahlen, bevor jemand über Store-Vorlagen spricht:

1. **Wiederholte Bestellungen bekannter Teilenummern.** Ein Store spielt seine Stärke aus, wenn der Käufer weiß, was er will: den Filter vom letzten Quartal, das Verschleißteil aus der Stückliste. Je öfter dieselbe Teilenummer bestellt wird, desto mehr hilft ein Katalog.
2. **Bestellpositionen pro Jahr.** Jede Position, die der Innendienst abtippt, kostet Zeit und birgt ein Fehlerrisiko. Nach meiner Erfahrung rechtfertigen ein paar Hundert Positionen im Jahr selten einen Store, Zehntausende oft schon. Ob er sich rechnet, hängt von den Kosten je Position, den Fehlerkosten und davon ab, wie viele Händler umsteigen.
3. **Anzahl bestellender Händler und Kunden.** Bei fünf Großkunden, die über EDI bestellen, bringt ein Store wenig. Bei Hunderten kleiner Händler, die per E-Mail bestellen, bringt er viel.
4. **Anteil der Bestellungen per Telefon und E-Mail.** Das ist das Volumen, das ein Store tatsächlich verschieben kann. Was heute schon per EDI kommt, bleibt dort.

Bekommen Sie diese Zahlen nicht innerhalb einer Woche aus dem ERP, würde ich sie vor jedem weiteren Schritt erheben. Sie zeigen, ob ein Store passt. Ob er sich lohnt, zeigt eine Dreijahresrechnung: Gebühr, Lizenzen, Umsetzung und Betrieb werden gesparter Zeit, weniger Fehlern und zusätzlicher Marge gegenübergestellt. Diese Rechnung gehe ich im [Business Case eines B2B-Webshops](../b2b-webshop-business-case-hersteller/) durch.

## Rechenbeispiel: 250 Händler, 30.000 Positionen im Jahr

Angenommen, ein Hersteller von Kompressoren verkauft über 250 Händler in Europa. Zusammen bestellen die Händler rund 30.000 Ersatzteilpositionen im Jahr, meist per E-Mail mit einer Liste von Teilenummern, manche per Telefon. Der Innendienst erfasst jede Position in SAP. Für Garantiefälle nutzen die Händler bereits ein Portal.

Das sind rund 120 Positionen pro Händler und Jahr, etwa zehn im Monat. Die Händler kennen ihre Teilenummern, sie bestellen dieselben Verschleißteile nach, und sie würden auch außerhalb der Geschäftszeiten bestellen, wenn sie könnten. Hier passt ein Store gut, und ich würde den Business Case rechnen und das Portal für Cases behalten. Der [B2B-Commerce-Teil der Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5) beschreibt, wie man einen B2B-Store zu einer bestehenden Experience-Cloud-Site hinzufügt. Portal und Store können dann auf einer Site laufen, sofern die Site eine unterstützte Vorlage statt einer eigenen nutzt und noch keinen Store hat. Käufergruppe, Katalog, Preisbuch und Entitlement Policy legen Sie dann selbst an.

Ändern Sie eine Annahme: Derselbe Hersteller hat 20 Händler, die zweimal im Jahr komplette Kompressoren bestellen, jeweils in einer anderen Konfiguration. Dann bringt ein Store wenig. Der Händler braucht ein Angebot, und das Portal zeigt dessen Status.

## Wo reicht ein Portal?

Ein Portal ist in diesen Fällen die bessere Antwort:

- **Maschinen mit Engineering-Aufwand.** Eine Maschine mit Aufstellungsplan und einem Liefertermin, den der Vertrieb bestätigen muss, gehört in einen Angebotsprozess. Standardoptionen und konfigurierbare Bundles lassen sich in einem Store mit Anbindung an Revenue Management verkaufen. Dafür brauchen Sie aber weitere Lizenzen und eine größere Umsetzung.
- **Wenige Bestellungen, viele Fragen.** Fragen Händler vor allem nach Status, Dokumenten oder Garantie, erledigt das ein Portal mit Cases, Bestellungen und Assets.
- **Bestellungen laufen schon über EDI.** Großkunden, die aus ihrem eigenen ERP bestellen, steigen selten auf Bestellungen im Webshop um.

Und manchmal ist Salesforce gar nicht die Antwort. Hat das Unternehmen kein Salesforce-CRM, holt es sich mit dem Store die ganze Plattform ins Haus. Deckt das Commerce-Modul Ihres ERP-Anbieters Preise und Bestand schon ab, prüfen Sie das zuerst. Bei einem sehr kleinen Katalog und wenigen Händlern ist ein einfaches Bestellformular günstiger als jedes Shopsystem.

## Erster Schritt: vier Zahlen aus zwölf Monaten Bestellungen

Ermitteln Sie die vier Zahlen für die letzten zwölf Monate: Bestellpositionen, Anteil mit Teilenummer, bestellende Händler, Anteil per Telefon und E-Mail. Sprechen diese Zahlen für einen Store, folgen die Fragen, wer für Preise und Bestand verantwortlich ist, welche Käufergruppen Sie brauchen und welche ERP-Aufrufe in Echtzeit laufen müssen. Diese Fragen behandle ich im [Masterclass-Kapitel zur Frage, ob sich B2B Commerce lohnt](../../masterclass/b2b-commerce/b2b-commerce-lohnt-sich-ueberblick/). Eine unabhängige Sicht auf Make or Buy biete ich im Rahmen von [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).
