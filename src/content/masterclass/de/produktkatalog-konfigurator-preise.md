---
title: "Revenue Cloud: Produktkatalog, Konfigurator und Preise"
description: "Wie Produktkatalog, Constraint-Konfigurator und Salesforce Pricing in Revenue Cloud für Hersteller zusammenspielen und welche Preise aus SAP kommen sollten."
lang: de
slug: produktkatalog-konfigurator-preise
course: revenue-cloud
translationKey: revenue-02
chapter: 2
pubDate: 2026-10-28
short: "Katalog, Konfigurator, Preise"
summary: "Wie Produktkatalog, Constraint-Konfigurator und Salesforce Pricing zusammenspielen und welcher Preis aus SAP kommen sollte."
takeaways:
  - "Produktklassifizierungen mit Attributen beschreiben eine Maschinenfamilie. Varianten bleiben Attributwerte und werden keine tausend Produktdatensätze."
  - "Konfigurationsregeln decken einfache Wenn-dann-Logik ab. Für voneinander abhängige Attribute gibt es die Constraint Rules Engine mit Modellen in CML."
  - "Pricing Procedures lesen Decision Tables. Nach jeder Änderung der Preisdaten müssen diese aktualisiert werden, sonst rechnen Angebote mit alten Werten."
  - "Konditionen, die auch für EDI-, Telefon- oder Shop-Aufträge ohne Salesforce gelten, bleiben in SAP und werden per API abgefragt."
  - "Katalogdaten, Constraint-Modelle und Pricing Procedures brauchen je eine verantwortliche Person beim Hersteller, Versionen und Regressionsfälle."
articles: [revenue-cloud-product-catalog-variants, revenue-cloud-configurator-constraint-rules, revenue-cloud-pricing-procedures, customer-prices-sap-or-salesforce-pricing, manufacturing-cloud-quote-to-agreement]
faq:
  - q: "Was ersetzt Produktregeln und Preisregeln aus CPQ in Revenue Cloud?"
    a: "Produktregeln werden als Konfigurationsregeln oder Constraint-Modelle im Product Configurator neu gebaut. Preisregeln und das Quote Calculator Plugin werden zu Pricing Procedures in Salesforce Pricing. Automatisch umgewandelt wird nichts, weil das Datenmodell ein anderes ist."
  - q: "Muss ich den SAP-Materialstamm in Revenue Cloud kopieren?"
    a: "Nein. Salesforce braucht die verkaufsfähigen Produkte mit Materialnummer, Bezeichnung und Listenpreis. Stücklisten, Werksdaten und Einkaufsdaten bleiben in SAP, weil das Angebot sie nicht nutzt."
  - q: "Wann braucht eine Maschinenvariante einen eigenen Produktdatensatz?"
    a: "Wenn das ERP eine eigene Materialnummer für sie hat, wenn sie in einem Sales Agreement geplant wird oder wenn sie separat gelagert und gewartet wird. Alles andere bleibt ein Attributwert an der Grundmaschine."
  - q: "Kann ein Portal oder ein Agent einen Preis aus Revenue Cloud ohne Angebot abfragen?"
    a: "Ja. Die Salesforce Pricing Business APIs enthalten eine Ressource für Headless Pricing, die einen Kontext anlegt und in einem Aufruf bepreist. Portale, Shops und Agenten sollten sie aufrufen, statt Preise selbst zu rechnen."
  - q: "Wer sollte Pricing Procedures nach dem Go-live verantworten?"
    a: "Eine Pricing-Administration im Vertriebsinnendienst oder in Sales Operations, Änderungen gibt das Controlling frei. Der Implementierungspartner baut die Prozeduren, entscheidet aber nicht über die Reihenfolge der Rabatte oder die Preislogik."
draft: false
---

In Revenue Cloud entscheiden drei Bausteine, was der Vertrieb anbieten kann. Der Produktkatalog beschreibt, was verkauft wird, mit Produktklassifizierungen und Attributen statt eines Datensatzes pro Variante. Der Product Configurator entscheidet, welche Kombinationen gültig sind, mit Konfigurationsregeln für einfache Logik und der Constraint Rules Engine für voneinander abhängige Attribute. Salesforce Pricing berechnet den Preis mit Pricing Procedures, Decision Tables und Kontextdefinitionen. Für einen Hersteller mit SAP liegt die wichtigste Entscheidung zwischen diesen Bausteinen: Welche Preise und Regeln bleiben in SAP, welche ziehen nach Salesforce um? Meine Regel: ein führendes System pro Preisart und Regelwerk, und für jedes eine verantwortliche Person beim Hersteller.

## Wie spielen Katalog, Konfigurator und Preisfindung zusammen?

Der Katalog hält Produkte, Attribute und die Bundle-Struktur. Der Konfigurator prüft, welche Optionen und Attributwerte zusammenpassen. Salesforce Pricing nimmt die konfigurierte Position und rechnet den Nettopreis Schritt für Schritt aus. Ein schlecht modellierter Katalog macht Regeln und Preisfindung schwerer, deshalb steht das Katalogdesign am Anfang.

```ablauf
erp: SAP
sf: Katalog, Konfigurator, Pricing, Angebot, Sales Agreement
SAP --Produkte, Preise--> Katalog
Katalog --> Konfigurator
Konfigurator --Position--> Pricing
Pricing --Nettopreis--> Angebot
Angebot --Preis übernommen--> Sales Agreement
```

Alle drei laufen auf Standardobjekten der Core-Plattform und nicht in einem Managed Package. Zu den Namen: salesforce.com sagt Revenue Cloud, Trailhead sagt Agentforce Revenue Management, und der Developer Guide für Winter '27 heißt Revenue Management Developer Guide. Die [Übersicht der Produktnamen](../../../blog/revenue-cloud-produktnamen-rlm-rca/) ordnet das ein.

Wer von Salesforce CPQ kommt, kann die Zuordnung schnell aufschreiben und braucht lange, um sie umzusetzen. Produktregeln werden zu Konfigurationsregeln oder Constraint-Modellen. Preisregeln und das Quote Calculator Plugin werden zu Pricing Procedures. Automatisch umgewandelt wird nichts; die weiteren Unterschiede stehen in [Salesforce CPQ vs. Revenue Cloud](../../../blog/salesforce-cpq-revenue-cloud-unterschiede/). Ob Revenue Cloud überhaupt zu Ihrem Geschäft passt, klärt [Kapitel 1](../revenue-cloud-ueberblick/).

## Der Produktkatalog: Klassifizierungen statt tausender Produkte

Product Catalog Management hält die Produkte und ihre Struktur. Laut [Trailhead-Modul zum Produktkatalog](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/get-started-with-product-catalog-management) sind das die Bausteine:

- **Kataloge**, zum Beispiel einer für Produkte und einer für Services.
- **Kategorien und Unterkategorien** zum Navigieren; ein Produkt kann in mehreren stehen.
- **Attribute**, einmal definiert und von vielen Produkten genutzt.
- **Produktklassifizierungen**, Vorlagen mit einer Reihe von Attributen. Ein Produkt, das aus einer Klassifizierung entsteht, erbt sie und kann einzelne überschreiben.
- **Einfache Produkte und Bundles**. Einfache Produkte stehen für sich, Bundles haben eine Hierarchie aus mehreren Positionen.

Für einen Maschinenbauer heißt das: eine Klassifizierung pro Maschinenfamilie, mit den Attributen, die der Vertrieb abfragen muss, etwa Arbeitsbreite, Antrieb, Steuerung und Spannung. Die Grundmaschinen entstehen daraus. Die Entscheidung, die den ganzen Katalog prägt, ist die Frage, wann eine Variante ein eigenes Produkt wird. Ich nutze drei Tests: Das ERP hat eine eigene Materialnummer für sie, sie wird in einem Sales Agreement geplant, oder sie wird separat gelagert und gewartet. Alles andere bleibt ein Attributwert. Zubehör mit eigener Materialnummer wird Bestandteil eines konfigurierbaren Bundles. Mit dieser Regel bleibt ein Katalog für 40 Grundmaschinen bei einigen hundert Datensätzen. Die Details mit einem durchgerechneten Beispiel stehen in [Produktkatalog in Revenue Cloud: Varianten abbilden](../../../blog/revenue-cloud-produktkatalog-varianten/).

### Welche Produktdaten kommen aus dem ERP?

Den Materialstamm würde ich nicht kopieren. Salesforce braucht die verkaufsfähigen Produkte, keine Werksdaten, Einkaufsdaten oder Stücklisten.

| Daten | Führendes System |
|---|---|
| Materialnummer, Bezeichnung, Listenpreis | ERP |
| Kategorien, Klassifizierungen, Vertriebsattribute | Salesforce |
| Bundle-Struktur und Kardinalität | Salesforce |
| Stückliste | ERP oder PLM |

Attributwerte brauchen eine Zuordnung zu den Merkmalswerten in SAP. Hat das Attribut „Steuerung“ in Salesforce den Wert „S2“, muss SAP denselben Wert kennen, sonst scheitert der Auftrag bei der Übergabe. Ersatzteile und Services kommen in eigene Kataloge mit eigenen Verantwortlichen.

## Der Konfigurator: welches Regelwerk für welches Produkt?

Der Product Configurator ist die Oberfläche, in der der Vertrieb Bundle-Optionen auswählt und Attributwerte setzt; das konfigurierte Produkt geht dann ins Angebot oder in den Auftrag. Trailhead nennt [drei Ansätze, die mit der Komplexität der Produkte wachsen](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/get-started-with-product-configurator): einfache Validierungsregeln, Auswahlregeln und Constraint-basierte Modellierung.

Dahinter stehen zwei Regelwerke. Konfigurationsregeln arbeiten mit expliziter Wenn-dann-Logik und passen zu einfachen bis mittleren Produkten. Die Constraint Rules Engine, laut Salesforce die Lösung „for complicated, high-volume configurations“, arbeitet mit einem Constraint-Modell, wertet alle möglichen Kombinationen aus und [filtert ungültige in Echtzeit heraus](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/explore-product-configurator-with-constraint-rules-engine). Eine Pumpe mit fünf Optionen und drei Ausschlüssen braucht kein Constraint-Modell. Eine Maschine, bei der Baugröße, Antriebsleistung, Spannung und Sicherheitskategorie voneinander abhängen, braucht eines.

Constraint-Modelle werden in CML geschrieben, der Constraint Modeling Language. Visual Builder ist eine Oberfläche ohne Code, die CML erzeugt, der CML Editor ein Skripteditor für komplexe Logik. Für mich ist CML Code, auch wenn ein Teil davon zusammengeklickt wird, und es braucht jemanden, der in Typen, Wertebereichen und Kardinalitäten denkt. In den meisten Fertigungsunternehmen ist das weder der Admin noch der Anwendungstechniker, der die Regeln kennt. Planen Sie also beide ein. Trailhead beschreibt auch den anderen Weg: Ein externer Konfigurator wird per API angebunden, und Salesforce behält Preisfindung, Produktdaten und Angebot. Wann sich die Constraint Engine lohnt und wann nicht, steht in [Revenue Cloud Konfigurator: Wann lohnen Constraint-Regeln?](../../../blog/revenue-cloud-konfigurator-constraint-regeln/).

### Wo liegen Ihre Konfigurationsregeln heute?

Diese Frage entscheidet den Weg stärker als die Funktionsliste:

| Wo die Regeln liegen | Was daraus folgt |
|---|---|
| In Tabellen und in den Köpfen der Anwendungstechnik | Der beste Fall für Revenue Cloud. Die Regeln müssen ohnehin aufgeschrieben werden, und CML gibt ihnen ein Zuhause mit Tests. |
| In der SAP-Variantenkonfiguration | Prüft SAP jeden Auftrag erneut, entsteht mit einem Nachbau in CML ein zweites Regelwerk, das sich vom ersten entfernt. Entweder bleibt SAP führend und Salesforce übernimmt das Ergebnis, oder die Führung wandert nach Salesforce und SAP übernimmt die Konfiguration. |
| Im PLM oder in einem technischen Konfigurator | Der Zeichnungen oder Stücklisten erzeugt. Dann bleibt dieses Werkzeug, und Salesforce bekommt das konfigurierte Produkt mit seinen preisrelevanten Attributen. |

Welchen Weg Sie auch wählen: Benennen Sie vor dem Projektstart, wer die Regeln nach dem Go-live pflegt.

## Wie berechnet Salesforce Pricing einen Preis?

Salesforce Pricing hat laut [Trailhead-Einheit zur Preisfindung](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/configure-pricing-for-products) vier Grundbausteine. Preisbücher speichern die Preise. Decision Tables verweisen auf die Tabellen mit den Preisdaten, weil Pricing Procedures die Objekte nicht direkt lesen. Eine Kontextdefinition, standardmäßig SalesTransactionContext, bringt Daten aus Angebot, Auftrag oder Asset in die Berechnung und das Ergebnis zurück. Eine Pricing Procedure legt die Preiselemente fest und führt sie nacheinander aus, jedes mit dem Ergebnis des vorherigen.

Eine typische Abfolge bei einem Hersteller: Listenpreis (oder Vertragspreis), Attributrabatt, Mengenrabatt, manueller Rabatt und ein Aggregat pro Produktfamilie. Die Reihenfolge ist Geschäftslogik. Ob der manuelle Rabatt vor oder nach dem Mengenrabatt greift, ändert den Nettopreis. Das entscheiden Vertriebsleitung und Controlling, nicht die Person, die die Prozedur baut. Das Ergebnis ist ein Preiswasserfall, der jeden Schritt vom Listenpreis zum Nettopreis zeigt, in der Simulation und an der Angebotsposition.

Ein Detail wird in den ersten Wochen leicht übersehen:

```hinweis achtung
Ändert sich ein Preisbucheintrag oder eine Staffel, rechnet das Angebot weiter mit dem alten Wert, bis Sync Pricing Data die Decision Tables aktualisiert hat. Lädt SAP die Listenpreise jede Nacht, gehört der Sync in denselben Job.
```

Die [Salesforce Pricing Business APIs](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/pricing_business_apis.htm) bieten außerdem Headless Pricing, das einen Kontext anlegt und in einem Aufruf bepreist. So fragen Portal, Shop oder Agent denselben Preis ab, ohne ein Angebot anzulegen. Wie der B2B-Shop das macht, steht im B2B-Commerce-Kapitel [Preise, Warenkorb und Checkout](../../b2b-commerce/preise-warenkorb-checkout/). Die Elemente, den Sync und die Tests erklärt [Salesforce Pricing: Wie Revenue Cloud Preise berechnet](../../../blog/revenue-cloud-preisprozeduren/).

## Welche Preise sollten aus SAP kommen?

SAP rechnet Kundenpreise mit der Konditionstechnik: Preislisten, Kundenpreise, Rabatte pro Materialgruppe, Zuschläge und Staffeln, jeweils mit Gültigkeit. Revenue Cloud kann dieselben Preise rechnen. Ärger entsteht, wenn beide es für denselben Preis tun, weil Angebot und SAP-Auftragsbestätigung dann früher oder später voneinander abweichen und der Vertriebsinnendienst das Auftrag für Auftrag klärt.

Es gibt drei Wege, und Sie können pro Preisart wählen:

| Weg | Führend | Passt, wenn |
|---|---|---|
| A: SAP rechnet, Salesforce fragt per API | SAP | Konditionen auch für Aufträge ohne Salesforce gelten |
| B: Konditionen in Salesforce Pricing nachbauen | Salesforce | die Preishoheit dauerhaft in den Vertrieb wandert und SAP den Preis übernimmt |
| C: Listenpreise aus SAP, Rabatte in Salesforce | geteilt | der Vertrieb Rabatte pro Geschäft verhandelt |

Für Weg A beschreibt der [MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/) das Muster mit der SAP-Auftragssimulation, allerdings für Sales Cloud und Salesforce CPQ, nicht für Revenue Cloud. Für Revenue Cloud bauen Sie den Aufruf selbst und testen die Antwortzeit mit echten Angebotsgrößen. Meine übliche Aufteilung, als Annahme für einen typischen Maschinenbauer: Maschinen über Weg C, Ersatzteile und Händlerkonditionen über Weg A, weil sie auch für EDI-Aufträge gelten. Den vollständigen Vergleich finden Sie in [Kundenpreise: SAP-Konditionen oder Salesforce Pricing?](../../../blog/kundenpreise-sap-konditionen-oder-salesforce-pricing/), die gesamte Aufteilung von Quote-to-Cash zwischen beiden Systemen in [Kapitel 1](../revenue-cloud-ueberblick/).

## Vom konfigurierten Angebot zum Sales Agreement

Im Seriengeschäft wird das konfigurierte Produkt in einem Sales Agreement in Manufacturing Cloud geplant, mit Mengen pro Produkt und Periode. Daraus folgen zwei Dinge. Jede Variante, die in einem Rahmenvertrag geplant wird, braucht eine eigene Produktidentität, die auch SAP kennt; das ist der zweite der drei Katalogtests oben. Und der Preis wird einmal freigegeben, am Angebot, und in den Rahmenvertrag übernommen, sodass das Sales Agreement keine eigene Preislogik braucht.

Wie konfigurierte Produkte vom Angebot in den Rahmenvertrag kommen und was der Konfigurator vorher klären muss, beschreibt [Vom Angebot zum Sales Agreement: der Produktkonfigurator](../../../blog/angebot-zu-sales-agreement-produktkonfigurator/). Die Seite des Rahmenvertrags behandelt das Manufacturing-Cloud-Kapitel [Rahmenverträge und Prognosen](../../manufacturing-cloud/rahmenvertraege-und-prognosen/).

## Wie testen Sie Preise und Regeln?

Katalog, Constraint-Modelle und Pricing Procedures ändern, was jeder Vertriebsmitarbeiter anbieten kann. Eine falsche Regel zeigt sich beim Kunden, nicht im Log. Ich behandle alle drei wie Code:

- **Regressionsfälle für Preise.** Ein fester Satz Referenzangebote mit dokumentierten Nettopreisen: jede Produktgruppe, jede Staffel, Vertragskunden, manuelle Rabatte über und unter den Freigabegrenzen. Im JSON-Modus der Preissimulation lässt sich ein Fall speichern und nach jeder Änderung erneut ausführen.
- **Regressions- und Performancefälle für Constraint-Modelle.** Gültige Konfigurationen, die funktionieren müssen, ungültige, die mit der erwarteten Meldung abgelehnt werden. Die Zielwerte für die Performance stehen unter der Liste.
- **Katalog als Daten.** Klassifizierungen, Attribute und Bundles sind Datensätze. Der Developer Guide hat eine [Referenz für das Deployment der Objekte](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm) mit Reihenfolge und Lookup-Feldern pro Bereich, darunter Katalog, Preisfindung und Konfigurator.

```kennzahlen
< 100 ms | pro Lauf eines Constraint-Modells
< 1.000 | Backtracks pro Modelllauf
0 | Verletzungen
quelle: [CML User Guide](https://resources.docs.salesforce.com/rel1/doc/en-us/static/pdf/CML_User_Guide.pdf)
```

Wie Konfigurationsdaten durch eine Pipeline wandern, behandelt das DevOps-Kapitel [Daten und Konfiguration](../../devops-release-management/daten-und-konfiguration/), wie Tests in den Release-Prozess gehören, das Kapitel [Qualität, Tests und Reviews](../../devops-release-management/qualitaet-tests-reviews/).

## Rechenbeispiel: 30 Verpackungsmaschinen in drei Familien

Ein Hersteller von Verpackungsmaschinen verkauft 30 Grundmaschinen in drei Familien über den Direktvertrieb und Ersatzteile über Händler. Zwei Familien haben ihre Verträglichkeitsregeln in Tabellen der Anwendungstechnik, die dritte nutzt die SAP-Variantenkonfiguration.

Drei Klassifizierungen mit je etwa einem Dutzend Attributen, 30 Grundmaschinen, konfigurierbare Bundles für Werkzeuge und Sicherheitspakete, ein eigener Ersatzteilkatalog, der aus SAP geladen wird. Constraint-Modelle für die beiden Tabellenfamilien, mit Verträglichkeitstabellen aus einem eigenen Objekt und Regressionsfällen pro Familie. Die SAP-Familie behält vorerst ihren Konfigurator, Salesforce übernimmt das Ergebnis über eine Schnittstelle. Maschinenpreise laufen über Weg C, mit Listenpreisen aus SAP jede Nacht und dem Sync direkt nach dem Laden. Händlerpreise für Ersatzteile laufen über Weg A. Das Produktmanagement verantwortet Katalog und Constraint-Modelle, eine Pricing-Administration in Sales Operations die Prozeduren, und das Controlling gibt jede Preisänderung frei.

## Erster Schritt: die Verantwortung für den Katalog festlegen

1. **Verantwortung für den Katalog und die drei Variantentests**, schriftlich vor dem ersten Datenladen.
2. **Führendes Regelwerk pro Produktlinie**: Revenue Cloud, SAP-Variantenkonfiguration oder externer Konfigurator, nie zwei.
3. **Führendes System pro Preisart**, einschließlich Vertragspreisen und Händlerkonditionen.
4. **Reihenfolge der Preiselemente**, abgestimmt zwischen Vertriebsleitung und Controlling.
5. **Regressionsfälle** für Preise und Constraint-Modelle, im Besitz des Herstellers.

Diese Grenzen zwischen SAP und Salesforce zu ziehen, ist Teil meiner Arbeit in der [Salesforce-Architektur](../../../leistungen/salesforce-architektur/), die Preisschnittstelle selbst gehört zu [Salesforce-Schnittstellen](../../../leistungen/salesforce-schnittstellen/). [Kapitel 3](../angebot-vertrag-auftrag/) geht weiter mit Freigaben, Verträgen und der Auftragsübergabe an SAP, alle Kapitel finden Sie auf der [Übersichtsseite](../).
