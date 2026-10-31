---
title: "Vom Angebot zum Sales Agreement: der Konfigurator"
description: "Wie Hersteller konfigurierte Produkte aus dem Angebot in ein Sales Agreement übernehmen, was der Konfigurator klären muss und wo Freigaben hingehören."
pubDate: 2026-10-26
lang: de
slug: angebot-zu-sales-agreement-produktkonfigurator
translationKey: manufacturing-cloud-quote-to-agreement
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Sales Agreements, CPQ, Produktkonfigurator, Fertigung]
series: { id: manufacturing-cloud, part: 2 }
takeaways:
  - "Konfiguriert werden Eigenschaften mit Kostenwirkung, etwa physikalisch-chemische Kriterien, Rohstoffe oder Zertifikate."
  - "Jede Variante, die im Sales Agreement geplant werden soll, braucht eine eigene Produktidentität, die auch das ERP kennt."
  - "Die Connect API erzeugt ein Sales Agreement aus Angebot, Opportunity oder eigenem Objekt. Ein Mapping legt die Felder fest."
  - "Salesforce CPQ gibt es für Neukunden nicht mehr. Zur Wahl stehen Revenue Cloud Advanced, Partnerprodukte und ein eigener Ansatz."
faq:
  - q: "Kann man ein Sales Agreement aus einem Angebot erzeugen?"
    a: "Ja. Die Connect API der Manufacturing Cloud erzeugt ein Sales Agreement aus einem Angebot, einer Opportunity oder einem eigenen Objekt. Welche Felder übernommen werden, steht in einem Mapping vom Typ ConvertToSalesAgreement."
  - q: "Wird Salesforce CPQ noch verkauft?"
    a: "An Neukunden nicht mehr. Laut Salesforce ist CPQ end of sale, aber nicht end of life: Bestandskunden können weiter Nutzer kaufen, verlängern und erhalten Support. Neue Funktionen entstehen in Revenue Cloud Advanced."
  - q: "Was konfiguriert ein Produktkonfigurator bei einem Hersteller?"
    a: "Alles, was dem Endkunden wichtig ist und Preis oder Kosten beim Hersteller beeinflusst. In meinem Projekt waren das physikalisch-chemische Kriterien wie der Mahlgrad, die Rohstoffe und Zertifikate wie Halal."
  - q: "Braucht jede Konfiguration ein eigenes Produkt?"
    a: "Jede Variante, die in einem Sales Agreement geplant und gemessen wird, braucht eine eigene Produktidentität, weil das Agreement Mengen pro Produkt führt und die Ist-Mengen aus dem ERP einem Produkt zugeordnet werden müssen."
draft: false
---

Bei einem Hersteller mit technisch definierten Produkten entscheidet der Produktkonfigurator, was im Angebot steht und was später im Sales Agreement geplant und gemessen wird. In einem weltweiten Manufacturing-Cloud-Rollout haben wir dafür einen eigenen CPQ-Ansatz verfolgt und einen Produktkonfigurator gebaut. Die konfigurierten Produkte wurden ins Angebot und danach ins Sales Agreement übernommen. Damit das trägt, muss vor dem ersten Angebot feststehen, wann aus einer Konfiguration ein Produkt wird, welche Daten vom Angebot ins Agreement wandern und wer den Preis freigibt.

## Was wird bei einem Hersteller eigentlich konfiguriert?

Bei Konfiguratoren denken viele an Maschinen: Motor, Steuerung, Zubehör, also eine Stückliste aus Optionen. In der Prozessindustrie sieht das anders aus. In meinem Projekt wurden Eigenschaften des Produkts selbst konfiguriert:

- **Physikalisch-chemische Kriterien**, zum Beispiel der Mahlgrad.
- **Rohstoffe**, aus denen das Produkt hergestellt wird.
- **Zertifikate**, zum Beispiel Halal.

Die Regel dahinter war einfach: Konfiguriert wird alles, was dem Endkunden wichtig ist und für den Hersteller einen Einfluss auf Preis oder Kosten hat. Ein feinerer Mahlgrad kostet mehr Maschinenzeit, ein zertifizierter Rohstoff mehr im Einkauf. Der Konfigurator muss diese Kostenwirkung kennen, sonst rechnet der Vertrieb mit einem Preis, der die Kosten nicht deckt.

Daraus folgt eine Anforderung, die oft spät auffällt: Die Regeln, welche Kombination machbar ist und was sie kostet, liegen meist in Produktion, Qualität und Einkauf, selten im Vertrieb. Ohne gepflegte Regeln rechnet der Konfigurator falsch, und für die Pflege braucht es Verantwortliche außerhalb von Salesforce.

## Eigener Ansatz oder Standardprodukt?

Für die Angebotserstellung gibt es heute drei Wege: Revenue Cloud Advanced von Salesforce, ein Produkt eines Partners oder ein eigener Ansatz auf der Plattform. Salesforce CPQ ist für Neukunden keine Option mehr. Laut [Salesforce](https://www.salesforce.com/sales/cpq/end-of-life/) wird CPQ an Neukunden nicht mehr verkauft, Bestandskunden können weiter Nutzer kaufen, verlängern und bekommen Support. Neue Funktionen entstehen in Revenue Cloud Advanced, eine erzwungene Migration gibt es nicht. Was heute gilt, steht in [Salesforce CPQ Verkaufsende](../salesforce-cpq-verkaufsende-status/), wie Sie den Umstieg planen, in [Kapitel 5 der Masterclass Revenue Cloud](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/).

Im Projekt haben wir einen eigenen CPQ-Ansatz verfolgt. Ob das heute wieder die richtige Wahl wäre, hängt von denselben Fragen ab, die ich bei jeder Make-or-buy-Entscheidung stelle:

- **Wie gut passt das Standardmodell?** Konfiguratoren von der Stange sind oft für Optionen und Stücklisten gebaut. Produkteigenschaften mit Kostenwirkung, wie oben beschrieben, passen nicht immer in dieses Modell.
- **Wer pflegt die Regeln?** Ein eigener Konfigurator ist eigener Code, der bei jedem Release mitgetestet und von jemandem gepflegt werden muss.
- **Was kostet die Lizenz über mehrere Jahre?** Ein Standardprodukt kostet pro Nutzer, ein eigener Ansatz kostet Entwicklung und Wartung.

Wie ich solche Fälle rechne, beschreibe ich unter [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/). Die Frage, ob sich die Manufacturing Cloud selbst lohnt, behandelt [Teil 1 der Serie](../manufacturing-cloud-wann-lohnt-sie-sich/).

## Wann wird aus einer Konfiguration ein Produkt?

Ein Sales Agreement plant Mengen pro Produkt. Laut [Objektreferenz](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_salesagreement.htm) hängt es an einem Account und einem Preisbuch, und für jedes Produkt wird eine Gesamtmenge eingetragen, die Salesforce auf die Zeiträume verteilt. Die Ist-Mengen, die später aus dem ERP kommen, werden ebenfalls einem Produkt zugeordnet.

Daraus folgt: Jede konfigurierte Variante, die in einem Sales Agreement geplant und gemessen werden soll, braucht eine eigene Produktidentität. In Salesforce ist das ein Produktdatensatz, im ERP meist eine Materialnummer. Fehlt die Verbindung zwischen beiden, landen die Ist-Mengen beim falschen Produkt oder gar nicht im Agreement.

Für das Design heißt das, früh zu entscheiden:

1. **Welche Eigenschaften erzeugen ein neues Produkt?** Ändert ein anderer Mahlgrad die Materialnummer im ERP, ist es ein eigenes Produkt. Ändert er nur den Preis, reicht vielleicht ein Merkmal am Angebot.
2. **Wer legt das Produkt an?** Entsteht eine neue Variante im Angebot, muss sie im ERP angelegt werden, bevor sie bestellt werden kann. Das ist ein Prozess mit Freigabe, meist außerhalb des Vertriebs.
3. **Wie wächst der Katalog?** Wenn fast jede Konfiguration einzigartig ist, wächst der Produktkatalog schnell. Dann hilft eine Regel, wann eine Variante wiederverwendet wird.

Wie die Ist-Mengen danach aus dem ERP ins Sales Agreement kommen, beschreibe ich in [Teil 3: Sales Agreements, fehlende Abnahmemengen erkennen](../sales-agreements-abnahmemengen-erp/).

## Die Connect API macht aus dem Angebot ein Sales Agreement

Salesforce bietet dafür einen Standardweg. Die [Connect API der Manufacturing Cloud](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/connect_resources_sales_agreement.htm) erzeugt ein Sales Agreement aus einem Angebot, einer Opportunity oder einem eigenen Objekt. Welche Felder übernommen werden, steht in einem Mapping vom Typ ConvertToSalesAgreement. Felder, die das Mapping nicht abdeckt, lassen sich beim Aufruf mit Standardwerten füllen. Das passt auch zu einem eigenen CPQ-Ansatz, weil das Angebot ein eigenes Objekt sein darf.

```ablauf
sf: Konfigurator, Angebot, Sales Agreement
erp: Materialnummer, Ist-Mengen
Konfigurator --> Angebot
Konfigurator ..neue Variante..> Materialnummer
Angebot --Connect API--> Sales Agreement
Ist-Mengen --pro Produkt--> Sales Agreement
```

Inhaltlich muss das Mapping diese Punkte abdecken:

| Was | Im Angebot | Im Sales Agreement |
|---|---|---|
| Kunde | Account des Angebots | Account des Agreements, auf der richtigen Ebene der Account-Struktur |
| Produkt | konfigurierte Variante | Produkt mit eigener Identität |
| Preis | Preis aus der Konfiguration, ggf. mit Rabatt | Verkaufspreis und Rabatt pro Produkt |
| Menge | Gesamtmenge oder Abrufmenge | Gesamtmenge, auf Zeiträume verteilt |
| Laufzeit | Gültigkeit des Angebots, Vertragslaufzeit | Startdatum, Häufigkeit und Anzahl der Zeiträume |

Die Zeile Laufzeit wird gern übersehen. Laut Trailhead berechnet Salesforce das Enddatum aus Startdatum, Häufigkeit und Anzahl der Zeiträume. Steht im Angebot nur ein Datum von bis, muss jemand festlegen, wie daraus Monate oder Quartale werden.

Ein Sales Agreement startet laut Trailhead immer als Entwurf, wird freigegeben und aktiviert sich am Startdatum automatisch. Damit stellt sich die nächste Frage.

## Der Preis wird an genau einer Stelle freigegeben

Ein Angebot mit konfigurierten Produkten braucht oft eine Freigabe, weil der Preis von der Konfiguration und damit von den Kosten abhängt. Das Sales Agreement hat einen eigenen Freigabeschritt, den der Admin laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/configure-sales-agreements-to-negotiate-better) auch abschalten kann.

Ich rate dazu, den Preis einmal freizugeben, am Angebot, wo die Konfiguration und ihre Kosten sichtbar sind. Wird das Agreement direkt aus dem freigegebenen Angebot erzeugt, kann seine eigene Freigabe schlanker sein oder entfallen. Zwei Freigaben für denselben Preis kosten Zeit und erzeugen die Frage, welche gilt, wenn sie sich unterscheiden.

Ändert sich später etwas, etwa eine neue Variante oder ein neuer Preis während der Laufzeit, wiederholt sich der Weg: Konfiguration, Angebot, Freigabe, Anpassung des Agreements. In meinem Projekt konnten Kunden neue Produkte und Preise auch selbst über das Kundenportal anfragen. Wie das Portal dazu passt, behandelt ein späterer Teil dieser Serie.

## Erster Schritt: Eigenschaften mit Kostenwirkung auflisten

Bevor der Konfigurator gebaut oder ein Produkt ausgewählt wird, klären Sie diese Punkte:

1. **Was wird konfiguriert?** Eine Liste der Eigenschaften mit Kostenwirkung, abgestimmt mit Produktion, Qualität und Einkauf.
2. **Wann entsteht ein Produkt?** Die Regel, welche Eigenschaft eine neue Materialnummer im ERP erzeugt.
3. **Welche Felder wandern ins Agreement?** Das Mapping aus der Tabelle oben, inklusive Laufzeit und Account-Ebene.
4. **Wo wird freigegeben?** Eine Stelle für den Preis, dokumentiert im Entscheidungslog der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Punkt 2 entscheide ich zusammen mit dem ERP-Team, weil jede neue Variante dort eine Materialnummer bekommt. Ohne diese Regel landen im Sales Agreement Produkte, die das ERP nicht kennt.
