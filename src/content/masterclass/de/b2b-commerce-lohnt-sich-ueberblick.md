---
title: "Lohnt sich Salesforce B2B Commerce für Hersteller?"
description: "Was Salesforce B2B Commerce ist, wie das GMV-Modell abrechnet, wann ein Portal reicht und was Sie entscheiden, bevor ein Partner den B2B-Shop baut."
lang: de
slug: b2b-commerce-lohnt-sich-ueberblick
course: b2b-commerce
translationKey: commerce-01
chapter: 1
pubDate: 2026-10-28
short: "Lohnt sich B2B Commerce?"
summary: "Was Salesforce B2B Commerce ist, was es kostet und wann ein Portal oder ein anderes Shopsystem reicht."
takeaways:
  - "Salesforce B2B Commerce lohnt sich, wenn Händler und Kunden bekannte Artikel wie Ersatzteile, Verbrauchsmaterial und Zubehör in Menge nachbestellen. Konfigurierte Maschinen bleiben im Vertrieb."
  - "Der Store läuft als Experience-Cloud-Site auf der Kernplattform. Käufergruppen, Entitlement Policies und Preisbücher steuern, wer welches Produkt zu welchem Preis sieht."
  - "Salesforce berechnet einen Anteil am Store-Umsatz ohne Steuern und Versand (GMV) und veröffentlicht keinen Satz. Käuferlizenzen, Umsetzung und ERP-Anbindung kommen dazu."
  - "Aura-Store-Templates gibt es nur für Orgs, die vor Spring '23 für Commerce aktiviert waren. Ein Abkündigungsdatum für Aura oder das Visualforce-Paket hat Salesforce nicht veröffentlicht."
  - "Vor dem Bau entscheiden Sie, wem Preise und Bestand gehören, welche Käufergruppen es gibt, welches Store-Template Sie nutzen und welche ERP-Aufrufe live laufen."
articles: [commerce-shop-or-portal, commerce-gmv-pricing, commerce-business-case, commerce-buyer-licences, commerce-versions-visualforce-aura-lwr, manufacturing-cloud-customer-portal, salesforce-licence-types]
faq:
  - q: "Was ist Salesforce B2B Commerce?"
    a: "Salesforce B2B Commerce ist die Shoplösung von Salesforce für Geschäftskunden. Der Store läuft als Experience-Cloud-Site, die Daten liegen auf der Kernplattform: Buyer Accounts, Käufergruppen, Entitlement Policies, Preisbücher, Warenkorb, Checkout und Order Summaries. Salesforce vermarktet das Produkt inzwischen auch als Agentforce Commerce for B2B."
  - q: "Was kostet Salesforce B2B Commerce?"
    a: "Salesforce nennt keinen Preis. Growth und Advanced Edition stehen auf \"Contact for Pricing\", die Gebühr ist ein Prozentsatz des Bruttowarenwerts über den Store. Dazu kommen Käuferlizenzen, laut Preisliste für Experience Cloud for Manufacturing 35 € pro Mitglied oder 15 € pro Login im Monat für Customer Community Plus, sowie Umsetzung und ERP-Anbindung."
  - q: "Reicht ein Händlerportal statt eines B2B-Shops?"
    a: "Ja, wenn Händler vor allem Status, Dokumente, Verträge und Cases sehen und gelegentlich etwas anfragen. Bestellen sie regelmäßig Hunderte Positionen mit bekannten Teilenummern, fehlen im Portal Katalog, Sichtbarkeit je Käufergruppe, Preisberechnung und Warenkorb."
  - q: "Muss ich einen Aura-Store jetzt auf LWR umstellen?"
    a: "Nicht wegen einer Frist. Stand 27. Oktober 2026 hat Salesforce kein Abkündigungsdatum für Aura-Stores oder B2B Commerce for Visualforce veröffentlicht. Für neue Stores empfiehlt Salesforce LWR. Ein Umzug lohnt sich, wenn Sie eine Funktion brauchen, die es nur dort gibt."
draft: false
---

Salesforce B2B Commerce lohnt sich für Hersteller, deren Händler und Kunden bekannte Artikel in Menge nachbestellen: Ersatzteile, Verbrauchsmaterial, Zubehör. Für konfigurierte Maschinen ersetzt es den Vertrieb nicht. Der Store läuft als Experience-Cloud-Site, Käufergruppen und Preisbücher steuern Sichtbarkeit und Preise. Salesforce berechnet einen Anteil am Store-Umsatz und nennt keinen Satz, dazu kommen Käuferlizenzen, Umsetzung und die ERP-Anbindung, die in der Fertigung oft der größte Posten ist. Ein Portal reicht, wenn Händler vor allem fragen statt kaufen. Bevor ein Partner baut, legen Sie fest, wem Preise und Bestand gehören, welche Käufergruppen es gibt und welche ERP-Aufrufe live laufen.

## Der Weg durch die Masterclass

Die Masterclass hat fünf Kapitel. Jedes beantwortet eine Entscheidung und verweist für die Details auf eigene Artikel.

1. **Lohnt sich B2B Commerce?** Dieses Kapitel: Produkt, Namen, Generationen, Kosten, Portal oder Shop.
2. **[Katalog, Suche, Sichtbarkeit](../katalog-suche-sichtbarkeit/):** Käufergruppen, Entitlements, Produktdaten und Suche nach Teilenummern.
3. **[Preise, Warenkorb, Checkout](../preise-warenkorb-checkout/):** Kundenpreise, Angebotsanfrage, Kauf auf Rechnung, Nachbestellen.
4. **[ERP-Anbindung](../erp-integration-bestand-auftraege/):** welche Daten live aus SAP kommen und wem der Auftrag gehört.
5. **[Agenten, Migration, Einführung](../agentforce-migration-einfuehrung/):** Buyer Agent, der Weg von Aura zu LWR und die Einführung bei Händlern in Wellen.

Wer nur eine Frage hat, springt direkt in das passende Kapitel. Wer vor der Entscheidung steht, liest dieses zuerst.

## Was ist Salesforce B2B Commerce?

Salesforce B2B Commerce ist die Shoplösung von Salesforce für Geschäftskunden. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5) legen Sie den Store aus einer Vorlage an und gestalten ihn im Experience Builder, Checkout und Konfiguration laufen über Standardwerkzeuge der Plattform. Technisch ist der Store eine Experience-Cloud-Site, und die Daten liegen in denselben Objekten wie Ihr CRM.

```vertiefung Für Admins
titel: Wie sieht das Datenmodell aus?
Das Datenmodell in einem Absatz, so wie [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) es beschreibt: Ein **Buyer Account** ist ein normaler Account, dessen Kontakte als Käufer freigeschaltet werden. **Käufergruppen** (Buyer Groups) bündeln ähnliche Buyer Accounts, etwa alle Premiumhändler eines Landes, und verbinden sie mit einem Store. **Entitlement Policies** legen fest, welche Produkte eine Käufergruppe sieht, **Preisbücher**, welche Preise sie bekommt. Der Käufer legt Produkte in den **Warenkorb**, schließt im **Checkout** ab, und die Bestellung erscheint als **Order Summary** in seiner Historie. Laut [Entwicklerdoku](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html) kann ein externes System den Lebenszyklus dieser Order Summary führen, Änderungen dort müssen dann nach Salesforce zurückfließen. Für Hersteller mit SAP ist genau das der Normalfall, mehr dazu in Kapitel 4.
```

Der Vorteil gegenüber einem fremden Shopsystem liegt darin, dass Accounts, Kontakte, Cases und Vertriebsdaten schon in Salesforce sind. Der Innendienst sieht dieselben Bestellungen wie der Händler, und ein Service-Mitarbeiter sieht im Case, was der Kunde zuletzt gekauft hat.

### Warum das Produkt drei Namen hat

Sie werden in Unterlagen drei Bezeichnungen finden. Trailhead schreibt: "B2B Commerce is now Agentforce Commerce for B2B" ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping)). Die Salesforce-Hilfe heißt weiter "Salesforce B2B Commerce", und die [Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) verkauft die Editionen als Commerce Cloud B2B Growth und Advanced. Gemeint ist dasselbe Produkt. Ich schreibe in dieser Masterclass Salesforce B2B Commerce. Wichtig ist der Name im Angebot: Lassen Sie sich die Edition und den Funktionsumfang mit dem Namen bestätigen, der auf der Preisseite steht.

## Welche Generation betreiben Sie?

Viele Hersteller haben schon einen Shop auf Salesforce, oft von einem Partner vor Jahren aufgesetzt. Es gibt drei Generationen:

| Generation | Technik | Stand Oktober 2026 |
|---|---|---|
| B2B Commerce for Visualforce | Managed Package aus der Übernahme von CloudCraze | laut Trailhead weiter unterstützt, kein Wechselzwang |
| Aura-Store | Kernplattform, Experience-Cloud-Site mit Aura-Template | nur für Orgs, die vor Spring '23 für Commerce aktiviert waren |
| LWR-Store | Kernplattform, Experience-Cloud-Site mit LWR-Template | von Salesforce für neue Stores empfohlen |

Salesforce hat den Abschluss der [Übernahme von CloudCraze](https://salesforce.com/news/stories/salesforce-completes-its-acquisition-of-cloudcraze/) im April 2018 gemeldet. Zur Visualforce-Variante sagte Salesforce in seinem Schulungsmaterial, Kunden müssten nicht wechseln und Salesforce unterstütze sie weiter. Den Hinweis auf Spring '23 und die Empfehlung für LWR finden Sie im [Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide). Ein Abkündigungsdatum für Aura-Stores oder das Visualforce-Paket hat Salesforce Stand 27. Oktober 2026 nicht veröffentlicht, beide stehen nicht in der [Liste der aktiven Abkündigungen](https://help.salesforce.com/s/articleView?id=000381744&language=en_US&type=1). Ich plane deshalb nach Funktionen: Braucht Ihre Roadmap etwas, das Salesforce nur für LWR dokumentiert, ziehen Sie um. Sonst investieren Sie in Daten und Prozesse. Wie Sie in einer Stunde herausfinden, was Sie betreiben, steht in [B2B Commerce Versionen: Visualforce, Aura oder LWR?](../../../blog/b2b-commerce-versionen-visualforce-aura-lwr/).

## Was kostet B2B Commerce?

Salesforce nennt keinen Listenpreis. Beide Editionen stehen auf der [Preisseite](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) auf "Contact for Pricing". Die Gebühr ist ein Prozentsatz des Bruttowarenwerts (Gross Merchandise Value, GMV), also des Umsatzes über den Store abzüglich Steuern und Versand. Bei Growth und Advanced zählt nur der Umsatz über die Commerce-Storefront, Bestellungen per EDI, E-Mail oder Telefon nicht.

```hinweis offen
Einen Prozentsatz veröffentlicht Salesforce nicht. Integratoren nennen Werte um 1 bis 2 Prozent, die Salesforce nicht bestätigt.
```

Die Preisseite nennt diesen Umfang:

| | Growth | Advanced |
|---|---|---|
| Storefronts | 6 | 10 |
| Lagerorte | 20 | 20 |
| Order Management | Lite | voll |
| Data-Cloud-Credits | 250.000 | 500.000 |
| Agentforce | Merchant Agent | Merchant Agent |

Für die meisten Hersteller zählt die Zeile Order Management weniger als gedacht, weil SAP den Auftrag führt. Bestellungen aus anderen Kanälen, die über Salesforce Order Management laufen sollen, brauchen laut Preisseite ein eigenständiges Order Management.

Was nicht in der GMV-Gebühr steckt:

| Posten | Was dahinter steckt |
|---|---|
| Käuferlizenzen | Laut Salesforce brauchen Käufer und Buyer Manager Customer Community Plus, Merchandiser die Lizenz "B2B and D2C Commerce". Die [Preisliste für Experience Cloud for Manufacturing](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) nennt 35 € pro Mitglied oder 15 € pro Login im Monat, jährlich abgerechnet. Ob Member oder Login günstiger ist, hängt an den Login-Tagen, siehe [B2B Commerce Lizenzen für Käufer](../../../blog/b2b-commerce-lizenzen-kaeufer/). Wie sich externe von internen Lizenzen unterscheiden, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../../../blog/salesforce-lizenzen-volle-lizenz/). |
| Erweiterte Preislogik | mit Revenue Cloud, Thema von Kapitel 3. |
| Umsetzung und ERP-Anbindung | Katalog, Käufergruppen, Preis- und Bestandsaufrufe, Auftragsübergabe. |
| Verbrauch über die enthaltenen Credits hinaus | Wie Data-Cloud- und Flex-Credits zusammenkommen, erklärt das Kapitel [Kosten und Token](../../ki-salesforce/kosten-und-token/) der KI-Masterclass. |

```hinweis tipp
Die GMV-Gebühr wächst mit dem Erfolg des Stores. Jeder Händler, den Sie von der E-Mail in den Shop holen, erhöht die Rechnung. Ich rechne deshalb immer drei Jahre mit steigendem digitalem Anteil und dem Satz als Variable bei 1, 2 und 3 Prozent. Die Details stehen in [B2B Commerce Preise: Was das GMV-Modell kostet](../../../blog/b2b-commerce-preise-gmv-modell/), die vollständige Rechnung mit Innendienstzeit und Fehlerkosten im [Business Case für einen B2B-Webshop](../../../blog/b2b-webshop-business-case-hersteller/). Dort zeigt ein angenommenes Szenario auch, dass Zeitersparnis allein einen Shop selten trägt. Er rechnet sich meist über zusätzlichen Umsatz.
```

## Portal oder Shop: Was brauchen Ihre Händler?

Ein Portal auf Experience Cloud oder Manufacturing Cloud zeigt Datensätze und nimmt Anfragen an. Kunden sehen Verträge, Bestellungen, Stammdaten und Cases und schicken Anfragen per Formular. Wie so ein Portal aussieht, beschreibe ich in [Kundenportal in der Manufacturing Cloud](../../../blog/manufacturing-cloud-kundenportal/). Ein Shop ergänzt, was wiederkehrendes Einkaufen braucht: einen durchsuchbaren Katalog, Sichtbarkeit je Käufergruppe, Preise je Käufer, Warenkorb, Checkout und Nachbestellen aus früheren Aufträgen.

Die Käuferlizenz entscheidet die Frage nicht, beide nutzen Customer Community Plus. Den Unterschied machen GMV-Gebühr und Umsetzungsaufwand. Ich schaue auf vier Zahlen der letzten zwölf Monate:

1. Bestellpositionen pro Jahr,
2. Anteil der Positionen mit bekannter Teilenummer,
3. Zahl der bestellenden Händler und Kunden,
4. Anteil der Bestellungen per Telefon und E-Mail.

Ein typisches Szenario, als Annahme: Ein Hersteller von Kompressoren hat 250 Händler, die 30.000 Ersatzteilpositionen im Jahr bestellen, meist als E-Mail mit Teilenummern. Das sind rund zehn Positionen pro Händler und Monat. Hier würde ich einen Store bauen und das bestehende Portal für Garantie und Cases behalten. Hat derselbe Hersteller 20 Händler, die zweimal im Jahr eine konfigurierte Anlage kaufen, bringt ein Store nichts. Die Anlage braucht ein Angebot, und das Portal zeigt dessen Status. Die vier Kriterien im Detail stehen in [B2B Commerce oder Händlerportal: Wann lohnt ein Shop?](../../../blog/b2b-commerce-oder-haendlerportal/). Was Manufacturing Cloud für den Vertrieb über Händler bietet, von Boni bis Partnerportal, behandelt das Kapitel [Händler und Partnerkanal](../../manufacturing-cloud/haendler-und-partnerkanal/) der Masterclass Manufacturing Cloud.

## Wann ist Salesforce nicht die Antwort?

Drei Fälle, in denen ich von Salesforce B2B Commerce abraten würde:

- **Kein Salesforce-CRM im Unternehmen.** Der größte Vorteil ist die gemeinsame Datenbasis mit Vertrieb und Service. Ohne CRM kaufen Sie eine Plattform für einen Shop, und andere Shopsysteme sind dann mindestens gleichwertige Kandidaten.
- **Das ERP bringt ein eigenes Commerce-Modul mit**, das Preise, Bestand und Kreditlimit ohne Schnittstelle kennt. Das prüfen Sie zuerst, weil die ERP-Anbindung in Salesforce der teuerste Teil des Projekts ist.
- **Sehr kleiner Katalog, wenige Händler.** Bei 200 Artikeln und 15 Händlern ist ein Bestellformular im Portal oder eine Liste im ERP günstiger als jedes Shopsystem mit Umsatzbeteiligung.

## Was entscheiden Sie, bevor ein Partner baut?

Einen Store aus der Vorlage anzulegen ist der kleinste Teil des Projekts. Die Entscheidungen, die danach teuer zu ändern sind, liegen bei Ihnen:

| Entscheidung | Was Sie klären |
|---|---|
| Wem gehören Preise und Bestand? | Kommen Händlerpreise aus Preisbüchern in Salesforce oder live aus den SAP-Konditionen? Wird der Bestand kopiert oder live abgefragt? Das beantworten Kapitel 3 und Kapitel 4, entschieden wird es schriftlich vor dem ersten Sprint. |
| Welche Käufergruppen gibt es? | Gruppieren Sie nach Land, Händlerstufe und Marke, nie eine Gruppe pro Account. Die Limits dafür stehen in Kapitel 2. |
| Welches Store-Template? | Für neue Stores LWR, für bestehende Aura-Stores eine Entscheidung nach Funktionen. |
| Welche ERP-Aufrufe laufen live? | Preis, Verfügbarkeit, Kreditprüfung und Auftragsübergabe brauchen ein ERP, das schnell antwortet. Das klären Sie mit dem SAP-Team, bevor das Store-Design steht. |

Diese vier Punkte gehören in ein kurzes Dokument, das Sie besitzen, nicht der Partner. Wie ich Architekturentscheidungen dieser Art auf Kundenseite begleite, steht unter [Salesforce-Architektur](../../../leistungen/salesforce-architektur/). Eine unabhängige Prüfung von Angebot und Lizenzplan gehört zu [Make-or-Buy und Lizenzen](../../../leistungen/make-or-buy-lizenzen/). Weiter geht es mit [Kapitel 2 zu Katalog, Suche und Sichtbarkeit](../katalog-suche-sichtbarkeit/), alle Kapitel finden Sie auf der [Übersichtsseite](../).

Ein B2B-Shop auf Salesforce lohnt sich, wenn Händler bekannte Teile in Menge nachbestellen und Sie Preise, Bestand und ERP-Aufrufe vor dem Bau geklärt haben. Wenn Sie prüfen möchten, ob das auf Ihre Händler zutrifft, [schreiben Sie mir](#contact).
