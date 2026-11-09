---
title: "ServiceMax Asset 360: Lohnt sich die Ergänzung?"
description: "ServiceMax Asset 360 erweitert Salesforce Field Service um Anlagenfunktionen. Was es kann, was es voraussetzt und wo es sich mit dem Salesforce-Add-on deckt."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: servicemax-asset-360-field-service
translationKey: servicemax-asset-360
topic: field-service
categories: [field-service]
contactBrief: licences
tags: [Field Service, ServiceMax, Asset 360, PTC, Entitlements, Asset Management]
takeaways:
  - "Asset 360 baut auf Standardobjekten von Field Service auf und ergänzt eigene Felder und Objekte. PTC setzt Service Cloud und Field Service voraus."
  - "Der Kern ist eine Entitlement-Engine. Sie wählt an Case, Arbeitsauftrag und Retourenauftrag per Regel die passende Garantie oder den Vertrag."
  - "Salesforce listet Asset Service Lifecycle Management mit 75 Dollar pro Nutzer und Monat. Es überschneidet sich bei Deckung, Hierarchie, Kampagnen und Depot."
  - "Asset 360 hatte 2026 zwei Hauptreleases, zuletzt 26R2 am 9. September. Ab 2027 stellt PTC ServiceMax auf einen Quartalsrhythmus um."
  - "PTC Asset 360 heißt seit Juni 2026 PTC Orbit und ist ein anderes Produkt. Prüfen Sie in jedem Angebot, welches gemeint ist."
faq:
  - q: "Was ist ServiceMax Asset 360?"
    a: "Ein Managed Package von PTC für Salesforce Field Service. Es ergänzt Entitlement-Prüfung, Wartungspläne nach Zeit, Zustand oder IoT-Daten, technische Attribute und geführte Abläufe in der Field Service App. Es erweitert Salesforce-Standardobjekte wie WorkOrder und bringt eigene Objekte mit."
  - q: "Brauche ich für Asset 360 Salesforce Field Service?"
    a: "Ja. Laut PTC-Leistungsbeschreibung vom Februar 2025 braucht der Kunde Service Cloud, mindestens eine Field-Service-Lizenz und einen laufenden Salesforce-Vertrag."
  - q: "Ist ServiceMax Asset 360 dasselbe wie PTC Asset 360?"
    a: "Nein. PTC Asset 360 heißt seit Juni 2026 PTC Orbit und führt Asset-Daten aus PLM, ERP, CRM und Field Service zusammen. ServiceMax Asset 360 for Salesforce ist das Field-Service-Paket auf Salesforce."
  - q: "Was kostet ServiceMax Asset 360?"
    a: "PTC veröffentlicht keinen Preis. Das AppExchange-Listing nennt ab 50 Dollar pro Nutzer und Monat, wurde aber zuletzt 2022 aktualisiert. PTC lizenziert Asset 360 je registriertem Nutzer. Fordern Sie ein Angebot an, klären Sie, welche Nutzer zählen, und rechnen Sie die Field-Service-Lizenzen dazu."
draft: false
---

ServiceMax Asset 360 ist ein Managed Package von PTC, das Salesforce Field Service um anlagenorientierte Funktionen erweitert: eine Entitlement-Engine, Wartungspläne nach Zeit, Zustand oder IoT-Daten, technische Attribute und über 60 fertige Prozessvorlagen und Transaktionen. Es baut auf Salesforce-Standardobjekten auf, ergänzt eigene Felder und Objekte und setzt Service Cloud und mindestens eine Field-Service-Lizenz voraus. Salesforce verkauft mit Asset Service Lifecycle Management ein eigenes Add-on für ähnliche Aufgaben. Ich würde Asset 360 prüfen, wenn seine Anspruchslogik, die fertigen Vorlagen oder PTC-Systeme den Ausschlag geben, und sonst zuerst das Salesforce-Add-on bewerten.

## Was ist ServiceMax Asset 360 for Salesforce?

ServiceMax hat zwei Angebote auf Salesforce, die für diesen Vergleich zählen (FieldFX für Öl- und Gasdienstleister ist ein drittes). ServiceMax Core bringt ein eigenes Datenmodell mit, den Vergleich mit Salesforce Field Service beschreibe ich in [ServiceMax oder Salesforce Field Service?](../servicemax-oder-salesforce-field-service/). Asset 360 geht den anderen Weg. Das [AppExchange-Listing](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000FN7u3UAD) beschreibt es als nativ auf Salesforce Field Service gebaut, und die PTC-Doku zeigt, wie: Der [Arbeitsauftrag](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/work-order-object.html) ist das Standardobjekt WorkOrder, Asset 360 ergänzt eigene Felder mit dem Namensraum `SVMXA360` und eigene Objekte für Wartungspläne, technische Attribute, Anspruchshistorie und Konfiguration.

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

## Asset 360 bringt eine Entitlement-Engine und über 60 Vorlagen

Die [Produktseite](https://www.ptc.com/en/products/servicemax/asset-360) nennt vier Bereiche. Ich habe sie mit der Doku abgeglichen:

- **Entitlement-Engine.** Laut [Doku](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/entitlement-management.html) prüft sie an Case, Arbeitsauftrag und Retourenauftrag, auf welche Leistung der Kunde Anspruch hat. Interaktiv zeigt sie alle passenden Garantien und Serviceverträge, automatisch wählt sie per Regel. Hat ein Asset Garantie und Vertrag, legen Sie fest, was Vorrang hat. Eine Grenze steht ausdrücklich drin: Entitlements, die direkt am Account oder Asset hängen, ohne Servicevertrag, verarbeitet die Engine nicht.
- **Installed Base.** Sicht auf Asset, Unterkomponenten, Servicehistorie und Vertragsdeckung.
- **Wartungsplanung.** Pläne nach Zeit, Häufigkeit, Zustand oder IoT-Daten, mit Vorlagen und automatisch erzeugten Arbeitsaufträgen.
- **Vorkonfigurierte Abläufe.** PTC nennt [über 60 fertige Prozessvorlagen und Transaktionen](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/about-servicemax-asset360-suite.html). Seit Release 24R1 laufen Service Process Manager und Assistenten laut [PTC-Blog](https://www.ptc.com/en/blogs/service/continuous-innovation-field-service-servicemax-enhancements) in der Salesforce Field Service App, mit technischen Attributen vor Ort. PTC dokumentiert eine [Windchill-Integration](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/product-integration.html) für Problemmeldungen und Produktfeedback, die es als Beta kennzeichnet, und eine Servigistics-Integration für die Ersatzteilplanung, für die mehrere Datenflüsse einzurichten sind.

Wer die Wartungspläne der Basislizenz kennt, sieht die Überschneidung: Wartung nach Betriebsstunden kann Field Service selbst, siehe [Wartung nach Betriebsstunden](../field-service-wartung-nach-betriebsstunden/). Auch bei Ansprüchen gibt es Überschneidung: Seit Winter '26 kann Salesforce [Entitlements per Regel automatisch zuordnen](https://help.salesforce.com/s/articleView?id=service.auto_mapping_entitlements.htm&language=en_US&type=5), an Cases, Arbeitsaufträgen und Incidents, allerdings nur beim Anlegen des Datensatzes und nur für Entitlements mit SLA Policy. Der Mehrwert von Asset 360 liegt im Umfang seiner Anspruchslogik, etwa an Retouren und bei der Wahl zwischen Garantie und Vertrag, und in den fertigen Vorlagen.

## Wo überschneidet sich Asset 360 mit Asset Service Lifecycle Management?

An mehreren Stellen. Salesforce hat im Juni 2024 Asset Service Lifecycle Management (ASLM) als Add-on angekündigt und listet es mit 75 Dollar pro Nutzer und Monat bei jährlicher Abrechnung (Stand 9.11.2026), mit Editions- und Lizenzvoraussetzungen. Neben Deckung, Hierarchie und Kampagnen enthält es Work Order Estimation, Advanced Exchange, Lagerfunktionen und Teilerückgaben, die Überschneidung ist also größer, als die Tabelle zeigt. Was drin ist, steht in [Asset Service Lifecycle Management: Lohnt das Add-on?](../asset-service-lifecycle-management-zusatz/). Der Vergleich nach den Unterlagen beider Hersteller:

| Bereich | ServiceMax Asset 360 | Salesforce ASLM |
|---|---|---|
| Anspruchsprüfung | Engine interaktiv und per Regel an Case, Arbeitsauftrag, Retoure | Asset Coverage View mit Auswahl am Case oder Arbeitsauftrag; Service Cloud ordnet Entitlements beim Anlegen per Regel zu |
| Asset-Hierarchie | Sicht auf Unterkomponenten | Interaktive Hierarchie |
| Kampagnen | Product Service Campaigns mit Suche nach technischen Attributen | Product Service Campaigns |
| Retouren, Depot | Automatisierte Retouren- und Werkstattprozesse laut Referenzen | Depot Repair, Advanced Exchange |
| PLM und Produktfeedback | Windchill-Integration (Beta) | Kein fertiger PLM-Connector in der öffentlichen Doku gefunden |
| Ersatzteilplanung | Servigistics-Integration mit einzurichtenden Datenflüssen | Lagerfunktionen in ASLM |
| Hersteller | PTC und Salesforce | Salesforce |
| Preis | Nicht veröffentlicht | 75 Dollar pro Nutzer und Monat |

Beide nutzen Teile des Field-Service-Datenmodells, Asset 360 ergänzt aber eigene Felder und Objekte. Wer beide kauft, bekommt zwei Lösungen für die Deckungsprüfung in einer Org. Entscheiden Sie pro Ablauf, wer ihn führt.

## Was ich bei der Anspruchsprüfung gesehen habe

```praxis
In einem Field-Service-Projekt waren Entitlements Teil des Umfangs und haben die Priorisierung im Dispatching beeinflusst. Den Ersatzteilbestand führte in meinen Projekten immer das ERP, Probleme kamen von der Pflegequalität der Daten.
```

Asset 360 habe ich selbst nicht eingeführt. Aus dieser Erfahrung leite ich zwei Prüfpunkte ab. Erstens: Hängen Ihre Ansprüche heute direkt am Asset oder Account ohne Servicevertrag, passt die Engine laut Doku nicht ohne Umbau. Zweitens: Retouren- und Lagerabläufe in Asset 360 treffen auf ein ERP, das den Bestand führt. Wie ich diese Grenze ziehe, steht in [Ersatzteile zwischen ERP und Salesforce](../salesforce-field-service-ersatzteile-erp/).

## Ein zweites Managed Package bringt einen eigenen Releasezyklus

Asset 360 hatte laut [Releaseplan](https://support.ptc.com/help/servicemax_asset360/en/articles/servicemax-asset-360-release-notes/releases.html) 2026 zwei Hauptreleases: 26R1 am 5. März, 26R2 am 9. September, mit Push-Upgrades auf Sandboxes und Produktion in den Wochen danach. Ab 2027 stellt PTC ServiceMax auf einen [Quartalsrhythmus](https://support.ptc.com/help/servicemaxcore/en/articles/release_notes/release-schedule.html) mit Full-Stack-Preview um, in der Asset 360 aufgeführt ist; die Termine 2027 für das Asset-360-Paket lassen Sie sich von PTC bestätigen. Salesforce liefert dreimal im Jahr. PTC veröffentlicht für jede Runde eine [Bewertung der Salesforce Release Updates](https://support.ptc.com/help/servicemax_asset360/en/articles/servicemax-asset-360-release-notes/salesforce-release-updates.html). Sie deckt das Managed Package ab, nicht Ihre Anpassungen, Ihr Team testet also beides gegen jeden Salesforce-Release.

Dazu kommen die Vertragspunkte aus der Leistungsbeschreibung. Das Standard-SLA des PTC-Rahmenvertrags gilt für die ServiceMax-Suiten nicht; PTC sagt wirtschaftlich angemessene Anstrengungen für die Verfügbarkeit zu, mit genannten Ausnahmen, und für die Salesforce-Umgebung ist Salesforce verantwortlich. PTC lizenziert Asset 360 je registriertem Nutzer, und laut Leistungsbeschreibung braucht jeder eine Lizenz, der auf Suite-Daten zugreift oder sie erhält, egal auf welchem Weg. Das betrifft Schnittstellen und Portale. Einen öffentlichen Preis gibt es nicht. Das AppExchange-Listing nennt ab 50 Dollar pro Nutzer und Monat, wurde aber zuletzt 2022 aktualisiert. Ich würde mit dieser Zahl nicht rechnen.

## Wann lohnt sich Asset 360?

Aus meiner Sicht in drei Fällen:

1. **Die Anspruchslogik geht über Regeln beim Anlegen hinaus.** Wenn Hotline und Disposition an Cases, Arbeitsaufträgen und Retouren zwischen Garantie und Vertrag wählen sollen und die regelbasierte Zuordnung von Salesforce nicht reicht, ist die Engine der stärkste Punkt.
2. **Ihr PLM und Ihre Ersatzteilplanung kommen von PTC.** Dann können die Integrationen mit Windchill und Servigistics ein Vorteil sein, wenn Sie Beta-Status und Einrichtungsaufwand einrechnen.
3. **Sie wollen fertige Abläufe statt Eigenbau.** Über 60 fertige Vorlagen und Transaktionen sparen Aufbauzeit, wenn Ihre Prozesse dazu passen.

Trifft keiner davon zu, würde ich zuerst ASLM bewerten. Ein Hersteller bedeutet weniger Abstimmung, und es gibt kein zweites Managed Package mit eigenem Releasezyklus zu testen.

## Die eigenen Asset-Abläufe auflisten

1. **Listen Sie Ihre Asset-Abläufe auf**: Deckungsprüfung, Wartung, Kampagnen, Retouren, Depot.
2. **Prüfen Sie, wo Ihre Ansprüche heute hängen**: am Servicevertrag, am Asset oder am Account.
3. **Fordern Sie Angebote für Asset 360 und ASLM an** und lassen Sie sich die Nutzer nennen, die jeweils eine Lizenz brauchen, auch Nutzer und Systeme, die Asset-360-Daten nur erhalten. Die Rollenlogik von Field Service steht in [Salesforce Field Service Lizenzen: Wer braucht welche?](../field-service-lizenzen-rollen-dispatcher-techniker/).
4. **Rechnen Sie beide Varianten über drei Jahre** inklusive Releasetests. Wie ich solche Vergleiche aufsetze, steht unter [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).
