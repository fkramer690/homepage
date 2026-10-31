---
title: "ServiceMax Asset 360: Lohnt sich die Ergänzung?"
description: "ServiceMax Asset 360 erweitert Salesforce Field Service um Anlagenfunktionen. Was es kann, was es voraussetzt und wo es sich mit dem Salesforce-Add-on deckt."
pubDate: 2026-10-29
lang: de
slug: servicemax-asset-360-field-service
translationKey: servicemax-asset-360
topic: field-service
categories: [field-service]
contactBrief: licences
tags: [Field Service, ServiceMax, Asset 360, PTC, Entitlements, Asset Management]
takeaways:
  - "Asset 360 liegt auf den Standardobjekten von Field Service. PTC setzt Service Cloud und mindestens eine Field-Service-Lizenz voraus."
  - "Der Kern ist eine Entitlement-Engine. Sie wählt an Case, Arbeitsauftrag und Retourenauftrag per Regel die passende Garantie oder den Vertrag."
  - "Salesforce verkauft seit 2024 Asset Service Lifecycle Management für 75 Dollar pro Nutzer. Es überschneidet sich bei Deckung, Hierarchie und Kampagnen."
  - "Asset 360 erscheint zweimal im Jahr, zuletzt 26R2 am 9. September 2026. Patches gibt es laut PTC nur, wenn vereinbarte Fehlerbehebungen anstehen."
  - "PTC Asset 360 heißt seit Juni 2026 PTC Orbit und ist ein anderes Produkt. Prüfen Sie in jedem Angebot, welches gemeint ist."
faq:
  - q: "Was ist ServiceMax Asset 360?"
    a: "Ein Managed Package von PTC für Salesforce Field Service. Es ergänzt Entitlement-Prüfung, Wartungspläne nach Zeit, Zustand oder IoT-Daten, technische Attribute und geführte Abläufe in der Field Service App, gespeichert auf den Standardobjekten von Salesforce."
  - q: "Brauche ich für Asset 360 Salesforce Field Service?"
    a: "Ja. Laut PTC-Leistungsbeschreibung vom Februar 2025 braucht der Kunde Service Cloud, mindestens eine Field-Service-Lizenz und einen laufenden Salesforce-Vertrag."
  - q: "Ist ServiceMax Asset 360 dasselbe wie PTC Asset 360?"
    a: "Nein. PTC Asset 360 heißt seit Juni 2026 PTC Orbit und führt Asset-Daten aus PLM, ERP, CRM und Field Service zusammen. ServiceMax Asset 360 for Salesforce ist das Field-Service-Paket auf Salesforce."
  - q: "Was kostet ServiceMax Asset 360?"
    a: "PTC veröffentlicht keinen Preis. Das AppExchange-Listing nennt ab 50 Dollar pro Nutzer und Monat, wurde aber zuletzt 2022 aktualisiert. Fordern Sie ein Angebot an und rechnen Sie die Field-Service-Lizenzen dazu."
draft: false
---

ServiceMax Asset 360 ist ein Managed Package von PTC, das Salesforce Field Service um anlagenorientierte Funktionen erweitert: eine Entitlement-Engine, Wartungspläne nach Zeit, Zustand oder IoT-Daten, technische Attribute und über 60 vorkonfigurierte Abläufe. Es speichert alles auf den Standardobjekten von Salesforce und setzt Service Cloud und mindestens eine Field-Service-Lizenz voraus. Seit 2024 verkauft Salesforce mit Asset Service Lifecycle Management ein eigenes Add-on für ähnliche Aufgaben. Ich würde Asset 360 prüfen, wenn automatische Anspruchsprüfung oder Ihr PLM von PTC den Ausschlag geben, und sonst zuerst das Salesforce-Add-on bewerten.

## Was ist ServiceMax Asset 360 for Salesforce?

ServiceMax hat zwei Produkte auf Salesforce. ServiceMax Core bringt ein eigenes Datenmodell mit, den Vergleich mit Salesforce Field Service beschreibe ich in [ServiceMax oder Salesforce Field Service?](../servicemax-oder-salesforce-field-service/). Asset 360 geht den anderen Weg. Das [AppExchange-Listing](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000FN7u3UAD) beschreibt es als nativ auf Salesforce Field Service gebaut, und die PTC-Doku zeigt, wie: Der [Arbeitsauftrag](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/work-order-object.html) ist das Standardobjekt WorkOrder, Asset 360 ergänzt eigene Felder mit dem Namensraum `SVMXA360`.

Für Sie heißt das: Disponenten planen weiter mit der Scheduling-Engine von Salesforce, Techniker arbeiten weiter in der Salesforce Field Service App. Asset 360 legt seine Abläufe darüber. Die Voraussetzungen stehen in der [ServiceMax SaaS Service Description](https://ptc-p-001.sitecorecontenthub.cloud/api/public/content/44a3614523d341ccb446db0c1b052c62?v=b6f25473) vom 1. Februar 2025: Service Cloud, mindestens eine Field-Service-Lizenz und ein laufender Salesforce-Vertrag für die gesamte Laufzeit.

```zeitleiste
2020-09 | Asset 360 for Salesforce erscheint auf AppExchange
2023-01 | PTC schließt die Übernahme von ServiceMax ab
2024-03 | Release 24R1 bringt Abläufe in die Field Service App
2026-03 | Release 26R1 (Version 14.0)
2026-09 | Release 26R2 (Version 15.0)
```

```hinweis tipp
PTC hatte zwei Produkte namens Asset 360. Das zweite heißt seit Juni 2026 [PTC Orbit](https://www.ptc.com/en/products/ptc-orbit) und führt Asset-Daten aus PLM, ERP und Field Service zusammen. Prüfen Sie in Angeboten und Präsentationen, welches gemeint ist.
```

## Asset 360 bringt eine Entitlement-Engine und über 60 Abläufe

Die [Produktseite](https://www.ptc.com/en/products/servicemax/asset-360) nennt vier Bereiche. Ich habe sie mit der Doku abgeglichen:

- **Entitlement-Engine.** Laut [Doku](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/entitlement-management.html) prüft sie an Case, Arbeitsauftrag und Retourenauftrag, auf welche Leistung der Kunde Anspruch hat. Interaktiv zeigt sie alle passenden Garantien und Serviceverträge, automatisch wählt sie per Regel. Hat ein Asset Garantie und Vertrag, legen Sie fest, was Vorrang hat. Eine Grenze steht ausdrücklich drin: Entitlements, die direkt am Account oder Asset hängen, ohne Servicevertrag, verarbeitet die Engine nicht.
- **Installed Base.** Sicht auf Asset, Unterkomponenten, Servicehistorie und Vertragsdeckung.
- **Wartungsplanung.** Pläne nach Zeit, Häufigkeit, Zustand oder IoT-Daten, mit Vorlagen und automatisch erzeugten Arbeitsaufträgen.
- **Vorkonfigurierte Abläufe.** PTC nennt über 60 davon. Seit Release 24R1 laufen Service Process Manager und Assistenten laut [PTC-Blog](https://www.ptc.com/en/blogs/service/continuous-innovation-field-service-servicemax-enhancements) in der Salesforce Field Service App, mit technischen Attributen vor Ort. Release 24R2 brachte [Anbindungen an Windchill und Servigistics](https://www.arcweb.com/node/152476).

Wer die Wartungspläne der Basislizenz kennt, sieht die Überschneidung: Wartung nach Betriebsstunden kann Field Service selbst, siehe [Wartung nach Betriebsstunden](../field-service-wartung-nach-betriebsstunden/). Der Mehrwert von Asset 360 liegt bei der Anspruchsprüfung und bei den fertigen Abläufen.

## Wo überschneidet sich Asset 360 mit Asset Service Lifecycle Management?

An mehreren Stellen. Salesforce hat im Juni 2024 Asset Service Lifecycle Management (ASLM) als Add-on angekündigt und verkauft es für 75 Dollar pro Nutzer und Monat. Was drin ist, steht in [Asset Service Lifecycle Management: Lohnt das Add-on?](../asset-service-lifecycle-management-zusatz/). Der Vergleich nach den Unterlagen beider Hersteller:

| Bereich | ServiceMax Asset 360 | Salesforce ASLM |
|---|---|---|
| Anspruchsprüfung | Engine interaktiv und per Regel an Case, Arbeitsauftrag, Retoure | Asset Coverage View mit Auswahl am Case oder Arbeitsauftrag |
| Asset-Hierarchie | Sicht auf Unterkomponenten | Interaktive Hierarchie |
| Kampagnen | Product Service Campaigns mit Suche nach technischen Attributen | Product Service Campaigns |
| Retouren, Depot | Automatisierte Retouren- und Werkstattprozesse laut Referenzen | Depot Repair, Advanced Exchange |
| PLM | Windchill, Servigistics | Keine eigene PLM-Anbindung |
| Hersteller | PTC und Salesforce | Salesforce |
| Preis | Nicht veröffentlicht | 75 Dollar pro Nutzer und Monat |

Beide arbeiten auf denselben Standardobjekten. Wer beide kauft, bekommt zwei Lösungen für die Deckungsprüfung in einer Org. Entscheiden Sie pro Ablauf, wer ihn führt.

## Was ich bei der Anspruchsprüfung gesehen habe

```praxis
In einem Field-Service-Projekt waren Entitlements Teil des Umfangs und haben die Priorisierung im Dispatching beeinflusst. Den Ersatzteilbestand führte in meinen Projekten immer das ERP, Probleme kamen von der Pflegequalität der Daten.
```

Asset 360 habe ich selbst nicht eingeführt. Aus dieser Erfahrung leite ich zwei Prüfpunkte ab. Erstens: Hängen Ihre Ansprüche heute direkt am Asset oder Account ohne Servicevertrag, passt die Engine laut Doku nicht ohne Umbau. Zweitens: Retouren- und Lagerabläufe in Asset 360 treffen auf ein ERP, das den Bestand führt. Wie ich diese Grenze ziehe, steht in [Ersatzteile zwischen ERP und Salesforce](../salesforce-field-service-ersatzteile-erp/).

## Ein zweites Managed Package bringt zwei Releases mehr im Jahr

Asset 360 erscheint laut [Releaseplan](https://support.ptc.com/help/servicemax_asset360/en/articles/servicemax-asset-360-release-notes/releases.html) zweimal im Jahr: 26R1 am 5. März 2026, 26R2 am 9. September 2026. Patches gibt es nur, wenn vereinbarte Fehlerbehebungen anstehen. Salesforce liefert dreimal im Jahr. PTC veröffentlicht für jede Runde eine [Bewertung der Salesforce Release Updates](https://support.ptc.com/help/servicemax_asset360/en/articles/servicemax-asset-360-release-notes/assessment-for-2025-releases.html), das hilft beim Testen. Ihr Team testet trotzdem zwei Pakete gegen jeden Salesforce-Release.

Dazu kommen die Vertragspunkte aus der Leistungsbeschreibung. Die Verfügbarkeitszusage des PTC-Vertrags gilt für die ServiceMax-Suiten nicht, für die Salesforce-Umgebung ist Salesforce verantwortlich. Einen öffentlichen Preis gibt es nicht. Das AppExchange-Listing nennt ab 50 Dollar pro Nutzer und Monat, wurde aber zuletzt 2022 aktualisiert. Ich würde mit dieser Zahl nicht rechnen.

## Wann lohnt sich Asset 360?

Aus meiner Sicht in drei Fällen:

1. **Die Anspruchsprüfung soll automatisch laufen.** Wenn Hotline und Disposition bei jedem Auftrag Garantie oder Vertrag per Regel bekommen sollen, ist die Engine der stärkste Punkt.
2. **Ihr PLM und Ihre Ersatzteilplanung kommen von PTC.** Dann sind die Anbindungen an Windchill und Servigistics ein echter Vorteil.
3. **Sie wollen fertige Abläufe statt Eigenbau.** Über 60 vorkonfigurierte Abläufe sparen Aufbauzeit, wenn Ihre Prozesse dazu passen.

Trifft keiner davon zu, würde ich zuerst ASLM bewerten. Ein Hersteller bedeutet weniger Abstimmung, und es gibt kein zweites Managed Package, das zweimal im Jahr getestet werden muss.

## Erster Schritt: die eigenen Asset-Abläufe auflisten

1. **Listen Sie Ihre Asset-Abläufe auf**: Deckungsprüfung, Wartung, Kampagnen, Retouren, Depot.
2. **Prüfen Sie, wo Ihre Ansprüche heute hängen**: am Servicevertrag, am Asset oder am Account.
3. **Fordern Sie Angebote für Asset 360 und ASLM an** und lassen Sie sich die Nutzer nennen, die jeweils eine Lizenz brauchen. Die Rollenlogik von Field Service steht in [Salesforce Field Service Lizenzen: Wer braucht welche?](../field-service-lizenzen-rollen-dispatcher-techniker/).
4. **Rechnen Sie beide Varianten über drei Jahre** inklusive Releasetests. Wie ich solche Vergleiche aufsetze, steht unter [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).
