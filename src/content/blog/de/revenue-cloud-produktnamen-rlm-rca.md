---
title: "Revenue Cloud, RLM, RCA: Welcher Name gilt jetzt?"
description: "Revenue Cloud, Revenue Lifecycle Management, Revenue Cloud Advanced, Agentforce Revenue Management: was die Namen bedeuten und welcher in den Vertrag gehört."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-produktnamen-rlm-rca
translationKey: revenue-cloud-product-names
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, Revenue Lifecycle Management, CPQ, Lizenzen, Produktnamen]
takeaways:
  - "Im Oktober 2026 verkauft salesforce.com das Produkt als Revenue Cloud, mit den Editionen Revenue Cloud Growth und Revenue Cloud Advanced und dem Zusatzprodukt Revenue Cloud Billing."
  - "Die Dokumentation mischt die Namen: Der Developer Guide zu Winter '27 sagt Revenue Management, Trailhead sagt Agentforce Revenue Management, ältere Guides Revenue Lifecycle Management."
  - "Revenue Cloud von 2020 war eine Suite rund um die Pakete Salesforce CPQ und Billing. Das heutige Revenue Cloud ist ein anderes Produkt auf Standardobjekten der Plattform."
  - "Ins Bestellformular oder in die Ausschreibung gehören Edition, Zusatzprodukte und die SKUs aus dem Salesforce-Angebot, nie nur Revenue Cloud."
  - "Wer in Hilfe, Trailhead oder Partnerblogs sucht, sollte unter allen Namen suchen, weil jede Quelle einen anderen verwendet."
faq:
  - q: "Ist Revenue Lifecycle Management dasselbe wie Revenue Cloud?"
    a: "Ja, für das heutige Produkt. Salesforce schreibt auf seiner CPQ-Seite, dass Revenue Lifecycle Management (RLM) ein früherer Produktname war. Verkauft wird das Produkt heute als Revenue Cloud mit den Editionen Growth und Advanced."
  - q: "Wofür steht RCA bei Salesforce?"
    a: "RCA steht für Revenue Cloud Advanced, die größere der beiden Revenue-Cloud-Editionen. Salesforce nennt sie den Nachfolger von Salesforce CPQ."
  - q: "Ist Agentforce Revenue Management ein eigenes Produkt?"
    a: "Nein. Salesforce hat den Namen für die Produktsuite verwendet, zu der Revenue Cloud Advanced und Revenue Cloud Billing gehören. Trailhead und die CPQ-Seite zum Verkaufsende nutzen ihn noch, Produkt- und Preisseiten sagen Revenue Cloud."
  - q: "Gehört Salesforce CPQ zu Revenue Cloud?"
    a: "Zum heutigen Revenue Cloud nicht. CPQ ist ein Managed Package mit dem Namespace SBQQ und wird an Neukunden nicht mehr verkauft. Im Revenue-Cloud-Paket von 2020 war es einer der Bausteine."
draft: false
---

Im Oktober 2026 verkauft Salesforce sein Quote-to-Cash-Produkt als Revenue Cloud, mit den Editionen Revenue Cloud Growth und Revenue Cloud Advanced (RCA) und dem Zusatzprodukt Revenue Cloud Billing. So steht es auf den Produkt- und Preisseiten von salesforce.com. Die Dokumentation mischt die Namen: Der Developer Guide zu Winter '27 heißt Revenue Management, Trailhead sagt Agentforce Revenue Management, ältere Guides sagen Revenue Lifecycle Management (RLM). Gemeint ist immer dasselbe Produkt. Ins Bestellformular würde ich deshalb Edition, Zusatzprodukte und SKUs aus dem Salesforce-Angebot schreiben, und in der Dokumentation unter allen Namen suchen.

## Wie sind die Namen entstanden?

Die Geschichte erklärt den größten Teil der Verwirrung. Kurz gefasst:

| Wann | Name | Bedeutung | Quelle |
|---|---|---|---|
| Dezember 2015 | SteelBrick | Quote-to-Cash-Startup mit CPQ und Abrechnung, von Salesforce für 360 Millionen Dollar gekauft | [SiliconANGLE](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/) |
| Nach der Übernahme | Salesforce CPQ, Salesforce Billing | Managed Packages mit den Namespaces SBQQ und blng | Entwicklerdokumentation zu [CPQ](https://developer.salesforce.com/docs/revenue/cpq-developer-guide/guide/cpq-api-get-started.html) und [Billing](https://developer.salesforce.com/docs/atlas.en-us.254.0.blng_dev.meta/blng_dev/apex_blng_apex_reference_overview.htm) |
| Ende 2020 | Revenue Cloud (erstes) | Suite rund um CPQ, Billing und weitere Bausteine | [Salesforce-Blog, Dezember 2020](https://www.salesforce.com/uk/blog/2020/12/rev-up-the-b2b-journey-with-revenue-cloud.html) |
| Spring '24 | Revenue Lifecycle Management | Neues Produkt auf Standardobjekten der Plattform | [Developer Guide, API 60.0](https://developer.salesforce.com/docs/atlas.en-us.248.0.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/rlm_get_started.htm) |
| Später | Revenue Cloud Advanced, Agentforce Revenue Management | Name der Edition und Name der Suite, zu der sie gehört | [CPQ-Seite zum Verkaufsende](https://www.salesforce.com/sales/cpq/end-of-life/) |
| Winter '27 | Revenue Management | Titel des Developer Guide | [Developer Guide, API 68.0](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/pcm_parent.htm) |
| Oktober 2026 | Revenue Cloud | Überschrift der Produkt- und Preisseiten | [Produktseite](https://www.salesforce.com/uk/products/revenue-cycle-management) |

Eine Anmerkung zur Tabelle: Der Developer Guide zu Spring '24 ist die älteste Version, die ich gefunden habe, mit dem Titel Revenue Lifecycle Management Developer Guide. Die beiden Pakete tragen ihre Namen und Namespaces bis heute, deshalb meint "CPQ" im Gespräch fast immer das SBQQ-Paket.

## Warum verwenden Salesforce-Quellen verschiedene Namen?

Weil sie zu verschiedenen Zeitpunkten aktualisiert wurden. Stand Ende Oktober 2026:

- **salesforce.com** zeigt "Revenue Cloud" als Überschrift der [Produktseite](https://www.salesforce.com/uk/products/revenue-cycle-management), zuletzt geändert am 22. Oktober 2026, und der [Preisseite](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/). Die Editionen heißen Revenue Cloud Growth und Revenue Cloud Advanced.
- **Der Developer Guide** zu Winter '27 heißt Revenue Management Developer Guide und schreibt: "Revenue Cloud is now Revenue Management. You may see references to Revenue Cloud in our application and documentation."
- **Trailhead** nennt das Grundlagenmodul [Agentforce Revenue Management Foundations](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management). Die Release Highlights zu Winter '27 führen die Neuerungen dagegen unter "Revenue Cloud".
- **Die CPQ-Seite zum Verkaufsende** beschreibt Revenue Cloud Advanced als Teil der Suite Agentforce Revenue Management und sagt, dass Revenue Lifecycle Management ein früherer Produktname war.

Suchmaschinen verstärken das. Ende Oktober 2026 erscheinen mehrere Seiten von salesforce.com in den Suchergebnissen noch mit dem Titel "Agentforce Revenue Management (formerly Revenue Cloud)", während die Seiten selbst längst Revenue Cloud sagen. Partnerblogs berichten, dass der Agentforce-Name mit der Dreamforce 2025 kam und Salesforce um September 2026 still zu Revenue Cloud zurückgekehrt ist. Eine formale Ankündigung von Salesforce habe ich für keinen der beiden Schritte gefunden. Ich behandle das deshalb als Bericht, nicht als offizielle Aussage.

Das Muster zieht sich durch das Portfolio: Der Name Agentforce steht inzwischen auf vielen Salesforce-Produkten, Trailhead spricht zum Beispiel auch von Agentforce Manufacturing. Das [Kapitel zu Begriffen und Landkarte](../../masterclass/ki-salesforce/begriffe-und-landkarte/) meiner KI-Masterclass sortiert diese Namen.

## Welches Revenue Cloud meint ein Partner?

Das ist in der Praxis die wichtigste Frage. "Revenue Cloud" hat zwei verschiedene Dinge bezeichnet:

- **Revenue Cloud von 2020** war eine Suite rund um die Pakete Salesforce CPQ und Billing. Die Daten liegen in Paketobjekten mit den Namespaces SBQQ und blng. Preisregeln, Produktregeln und das Quote Calculator Plugin gehören in diese Welt.
- **Revenue Cloud heute** ist das Produkt, das früher Revenue Lifecycle Management hieß. Es läuft auf Standardobjekten der Plattform, mit Produktklassifizierungen und Attributen, Preisprozeduren und einem regelbasierten Konfigurator.

Ein Partner, der von "30 Revenue-Cloud-Projekten" spricht, meint vielleicht CPQ-Projekte aus den Jahren 2020 bis 2023. Diese Erfahrung ist für eine CPQ-Migration wertvoll, sagt über das neue Datenmodell aber wenig. Ich stelle drei Fragen:

1. Welches Datenmodell hatten die Referenzen, CPQ-Objekte mit Namespace SBQQ oder Standardobjekte?
2. Wie viele Projekte liefen seit Spring '24 auf Revenue Lifecycle Management oder Revenue Cloud Advanced?
3. Wer im vorgeschlagenen Team hat im neuen Produkt Preisprozeduren und Konfiguratorregeln gebaut?

```hinweis achtung
Für CPQ-Bestandskunden gilt umgekehrt: Beschreibt ein Angebot "Revenue Cloud", prüfen Sie, ob damit eine Neueinführung auf dem neuen Datenmodell gemeint ist. Ein Versionsupgrade von CPQ gibt es nicht. Salesforce schreibt selbst, Revenue Cloud Advanced sei nicht einfach CPQ mit neuem Namen, und nennt für eine typische Migration drei bis sechs Monate von der Analyse bis zum Go-live.
```

Der Status der alten Pakete ist ein eigenes Thema: CPQ wird an Neukunden nicht mehr verkauft, Bestandskunden können aber verlängern und bekommen Support. Was das bedeutet, behandelt das [Kapitel zum Umstieg von CPQ auf Revenue Cloud](../../masterclass/revenue-cloud/von-cpq-zu-revenue-cloud/).

## Welcher Name gehört ins Bestellformular oder in die Ausschreibung?

Marketingnamen wechseln schneller, als Verträge laufen. Ein Bestellformular über drei Jahre, das heute unterschrieben wird, erlebt mindestens noch einen Namen. Meine Regeln:

- **Bestellformular:** die genauen Produktnamen und SKUs aus dem Salesforce-Angebot übernehmen, einschließlich Edition (Growth oder Advanced) und jedem Zusatzprodukt wie Revenue Cloud Billing, Dynamic Revenue Orchestration, Invoice Management oder Contract Lifecycle Management. "Revenue Cloud" allein reicht nicht.
- **Ausschreibung:** das Produkt über Namen und Datenmodell beschreiben, zum Beispiel "Revenue Cloud Advanced (auch Revenue Lifecycle Management oder Revenue Management), nativ auf der Salesforce-Plattform, nicht das Managed Package Salesforce CPQ". Das schließt ein Missverständnis mit dem Paket von 2020 aus.
- **Lizenzprognose:** Revenue Cloud als eigene Zeile neben Sales Cloud führen, weil es zusätzlich zu einem Sales-Cloud-Abonnement gekauft wird. Wie ich so eine Prognose aufbaue, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).
- **Projektglossar:** einen Namen für das Projekt festlegen und dabei bleiben. Ich würde Revenue Cloud nehmen, weil salesforce.com das heute zeigt.

## Wie finden Sie die richtige Dokumentation?

Jede Quelle hat ihren eigenen Namen. Wer nur unter einem sucht, findet die Hälfte nicht:

- **Developer Guide und Hilfe:** nach "Revenue Management" suchen. Die Adressen des Developer Guide enthalten weiterhin "revenue_lifecycle_management", das hilft beim Filtern.
- **Trailhead:** nach "Agentforce Revenue Management" und "Revenue Cloud" suchen.
- **Partnerblogs und Foren:** zusätzlich "RLM" und "RCA", die dort üblichen Abkürzungen.
- **Andere Anbieter beachten:** Certinia, ein Anbieter auf der Salesforce-Plattform, führt einen eigenen Produktbereich namens Revenue Management mit eigenen [Release Notes](https://help.certinia.com/main/2026.1/Content/RevenueManagement/Release/WhatsNew/WhatsNew.htm). Treffer von help.certinia.com beschreiben ein anderes Produkt.

Was das Produkt unter welchem Namen auch immer abdeckt, steht in [Revenue Cloud für Hersteller: Wann lohnt es sich?](../revenue-cloud-lohnt-sich-hersteller/), was es kostet in [Revenue Cloud Preise: Growth, Advanced und Add-ons](../revenue-cloud-editionen-preise/). Das [Überblickskapitel der Masterclass Revenue Cloud](../../masterclass/revenue-cloud/revenue-cloud-ueberblick/) führt diese Themen zusammen.

Der Name auf der Website wird sich wahrscheinlich wieder ändern, deshalb zählen Edition und SKU in Ihrem Vertrag. Wenn Sie unsicher sind, welches Produkt ein Angebot oder ein Partnervorschlag tatsächlich beschreibt, [schreiben Sie mir](#contact).
