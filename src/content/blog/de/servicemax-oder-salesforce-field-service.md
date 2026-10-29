---
title: "ServiceMax oder Salesforce Field Service?"
description: "ServiceMax läuft weiter auf Salesforce, mit zweitem Hersteller und Planung auf AWS. Wann es gegen Salesforce Field Service gewinnt und wann nicht."
pubDate: 2026-10-29
lang: de
slug: servicemax-oder-salesforce-field-service
translationKey: servicemax-vs-salesforce-field-service
topic: field-service
categories: [field-service]
tags: [Field Service, ServiceMax, PTC, Außendienst, Softwareauswahl]
takeaways:
  - "ServiceMax Core läuft laut PTC-Leistungsbeschreibung vom Februar 2025 weiterhin als Managed Package in der Salesforce-Org des Kunden. Wer ServiceMax kauft, kauft immer auch Salesforce-Lizenzen."
  - "Die PTC-Produktseite nennt ServiceMax eine eigenständige Plattform mit eigener Roadmap. Das stimmt für Eigentum und Roadmap, technisch bleibt Salesforce die Basis (Stand Oktober 2026)."
  - "ServiceMax Core hat ein eigenes Datenmodell neben den Field-Service-Objekten von Salesforce. Planung und Optimierung betreibt PTC auf AWS in Irland, die Kommunikationsapp Zinc in den USA."
  - "ServiceMax bringt Depotreparatur, Retouren und regelbasierte Entitlements im Kern mit und passt zu Herstellern mit PLM von PTC. Salesforce Field Service hält Daten, Lizenzen, Releases und KI bei einem Hersteller."
  - "Laut Leistungsbeschreibung gilt die Verfügbarkeitszusage des PTC-Vertrags für die ServiceMax-Suiten nicht. Klären Sie Betrieb, Haftung und Releasekalender vor der Auswahl."
faq:
  - q: "Läuft ServiceMax auf Salesforce?"
    a: "Ja, Stand Oktober 2026. ServiceMax Core und Asset 360 werden laut PTC in Salesforce-Rechenzentren betrieben, Core wird als Managed Package über AppExchange installiert. Service Board und Schedule Optimization betreibt PTC zusätzlich auf AWS in Irland."
  - q: "Brauche ich für ServiceMax Salesforce-Lizenzen?"
    a: "Ja. Die PTC-Doku ordnet die ServiceMax-Lizenz Nutzern mit Salesforce-, Salesforce-Platform- oder Community-Lizenz zu. Für Asset 360 verlangt PTC zusätzlich Service Cloud und mindestens eine Field-Service-Lizenz."
  - q: "Gehört ServiceMax zu Salesforce?"
    a: "Nein. ServiceMax gehört seit dem 4. Januar 2023 zu PTC, die Übernahme kostete laut Ankündigung 1,46 Milliarden Dollar. Salesforce ist Plattformanbieter und Wettbewerber mit eigenem Field Service."
  - q: "Was kostet ServiceMax?"
    a: "PTC veröffentlicht keine Preise. Rechnen Sie mit einem Angebot von PTC und zusätzlich mit den Salesforce-Lizenzen für jeden Nutzer, und vergleichen Sie beides mit den Listenpreisen von Salesforce Field Service."
draft: false
---

ServiceMax von PTC und Salesforce Field Service stehen nicht auf getrennten Plattformen. ServiceMax Core läuft laut PTC-Leistungsbeschreibung vom Februar 2025 als Paket in der Salesforce-Org des Kunden, mit eigenem Datenmodell. Planung und Optimierung betreibt PTC auf AWS. Sie kaufen also immer Salesforce-Lizenzen und dazu einen zweiten Hersteller. ServiceMax lohnt sich aus meiner Sicht, wenn Depotreparatur, Retouren und regelbasierte Entitlements Ihren Service prägen und Ihr PLM von PTC kommt. Sonst ist Salesforce Field Service die einfachere Wahl.

## Läuft ServiceMax noch auf Salesforce?

Ja. Die Frage ist berechtigt, weil PTC selbst Verwirrung stiftet. In der FAQ der [englischen Produktseite](https://www.ptc.com/en/products/servicemax) steht, ServiceMax sei ursprünglich auf Salesforce gebaut worden und heute eine eigenständige Plattform mit eigener Roadmap. Die technischen Unterlagen von PTC sagen etwas anderes:

- Die [ServiceMax SaaS Service Description](https://ptc-p-001.sitecorecontenthub.cloud/api/public/content/44a3614523d341ccb446db0c1b052c62?v=b6f25473) vom 1. Februar 2025 nennt Salesforce-Rechenzentren als Betriebsort von Core und Asset 360.
- Die [Installationsanleitung](https://support.ptc.com/help/servicemaxcore/en/articles/core/svmx-installation.html) beschreibt Core als Managed Package auf der Force.com-Plattform, installiert über AppExchange.
- Der [Patch vom August 2026](https://support.ptc.com/help/servicemaxcore/en/articles/release_notes/august-2026-patch.html) behebt einen Fehler für Nutzer mit Salesforce-Platform-Lizenz.
- Die [deutsche Produktseite](https://www.ptc.com/de/products/servicemax) schreibt selbst, ServiceMax sei als Anwendung auf der Salesforce-Plattform entwickelt worden.

Eigenständig ist ServiceMax als Produkt: Es gehört seit dem [4. Januar 2023](https://investor.ptc.com/resources/news/news-details/2023/PTC-Completes-Acquisition-of-ServiceMax/default.aspx) zu PTC, PTC entscheidet über die Roadmap. Die technische Basis ist weiter Salesforce. Einen Plattformwechsel habe ich in keiner Primärquelle gefunden.

```hinweis achtung
Lesen Sie Herstellerseiten zu ServiceMax genau. „Standalone“ beschreibt Eigentum und Roadmap, nicht den Betrieb. Lassen Sie sich im Angebot schriftlich geben, in welcher Umgebung Ihre Daten liegen und welche Salesforce-Lizenzen Sie brauchen.
```

## Woraus besteht ServiceMax heute?

ServiceMax ist eine Produktfamilie. Für Hersteller zählen zwei Kernprodukte und mehrere Zusätze. Die Angaben stammen aus der [PTC-Doku](https://support.ptc.com/help/servicemaxcore/en/articles/core/servicemax-core-solutions.html) und der Leistungsbeschreibung, Stand Oktober 2026:

| Produkt | Was es ist | Wo es läuft |
|---|---|---|
| ServiceMax Core | Komplette Außendienstsuite mit Installed Base, Verträgen, Disposition, Lager, Retouren, Depotreparatur | Salesforce-Org, eigenes Datenmodell (Arbeitsauftrag als Objekt `SVMXC__Service_Order__c`) |
| ServiceMax Asset 360 | Erweiterung für Salesforce Field Service | Salesforce-Org, auf den Standardobjekten von Field Service |
| ServiceMax Go | Techniker-App mit Offline-Speicher | Synchronisiert über ein Gateway von PTC |
| Service Board, Schedule Optimization | Plantafel und Optimierung | PTC-Plattform auf AWS in Irland |
| ServiceMax AI | Assistent für Techniker, seit Februar 2025 | Eigenes Paket, Sprachmodell nicht dokumentiert |

Der wichtigste Punkt steckt in der ersten Zeile. Der [Arbeitsauftrag in Core](https://support.ptc.com/help/servicemaxcore/en/articles/core/work-order1.html) ist ein eigenes Objekt mit 207 Feldern, die Installed Base ein eigenes Objekt „Installed Product“. Core nutzt also nicht WorkOrder, ServiceAppointment und Asset von Salesforce Field Service, sondern baut ein paralleles Modell in derselben Org. Asset 360 macht es umgekehrt und erweitert die Standardobjekte, mehr dazu in [ServiceMax Asset 360: Lohnt sich die Ergänzung?](../servicemax-asset-360-field-service/).

## Was bringt ServiceMax Core mit, was Salesforce Field Service nicht im Kern hat?

Der Abstand ist kleiner als vor zehn Jahren. Salesforce Field Service hat Assets mit Hierarchien, Wartungspläne, Serviceverträge und Entitlements in der Basislizenz. Die Unterschiede liegen bei den Abläufen rund um die installierte Basis.

ServiceMax Core listet Ersatzteile, Retouren und Depotreparatur, Verträge mit einer regelbasierten Entitlement-Engine und einen Service Flow Manager für eigene Abläufe als Kernfunktionen. Bei Salesforce kommen Depotreparatur, Reparaturangebote und Deckungsauswahl erst mit dem Add-on Asset Service Lifecycle Management für 75 Dollar pro Nutzer und Monat. Was das Add-on genau enthält, steht in [Asset Service Lifecycle Management: Lohnt das Add-on?](../asset-service-lifecycle-management-zusatz/).

Mit Release 26R2 hat PTC laut [Übersicht der Neuerungen](https://www.ptc.com/en/products/servicemax/whats-new) Arbeitspläne mit Abhängigkeiten, eine Tagesoptimierung bis alle 15 Minuten und eine Teilefilterung nach Konfiguration der Anlage ergänzt. Das zielt auf komplexe Reparaturen an Maschinen mit vielen Varianten.

Der zweite Unterschied ist das PTC-Portfolio. PTC verkauft Windchill und Servigistics. Asset 360 hat seit Release 24R2 [Anbindungen an beide](https://www.arcweb.com/node/152476), und Daten aus Core fließen über eine [dokumentierte Integration](https://support.ptc.com/help/ptc_asset360/en/articles/implementers/servicemax_integration_with_asset_hub.html) in PTC Orbit, die Asset-Datenplattform von PTC. Wer Konstruktion und Ersatzteilplanung schon bei PTC hat, bekommt dort kürzere Wege.

Salesforce Field Service hat dafür die Plattform auf seiner Seite. Enhanced Scheduling and Optimization, die Field Service App, Agentforce for Field Service und neue Funktionen jedes Releases arbeiten auf den Standardobjekten. Ob sie mit den Core-Objekten zusammenspielen, beschreibt keine der Quellen, die ich gelesen habe. Ich gehe davon aus, dass nicht, und würde es vor jeder Auswahl schriftlich klären.

## Was bedeutet der zweite Hersteller für Betrieb und Datenschutz?

Hier liegen die Punkte, die in Auswahlverfahren am häufigsten fehlen. Alle stehen in der Leistungsbeschreibung vom Februar 2025:

- **Verfügbarkeit.** Die Verfügbarkeitszusage des PTC-Vertrags gilt für die ServiceMax-Suiten nicht, weil PTC die Hosting-Umgebungen nicht kontrolliert. PTC sagt kaufmännisch angemessene Anstrengungen zu. Für die Salesforce-Umgebung ist Salesforce verantwortlich.
- **Datenorte.** Service Board und Schedule Optimization liegen auf AWS in Irland, Zinc auf AWS in den USA mit Kundendaten in den USA. Die [Liste der Unterauftragsverarbeiter](https://www.ptc.com/es/documents/legal-agreements/data-processing-terms-and-conditions/sub-processors) nennt zusätzlich Kartendienste und Twilio.
- **Lizenzen.** Service Board braucht eine Salesforce-Lizenz für die Integration. Jeder Nutzer braucht eine ServiceMax-Lizenz und eine Salesforce-Lizenz.
- **Releases.** Salesforce liefert drei Releases im Jahr. ServiceMax folgt ab 2027 laut [Releaseplan](https://support.ptc.com/help/servicemaxcore/en/articles/release_notes/release-schedule.html) vier Major Releases mit je vier Wochen Vorschau, dazu monatliche Patches. Ihr Testteam prüft also zwei Kalender.

Dazu kommt die Strategie von PTC. PTC hat ThingWorx und Kepware an TPG verkauft, angekündigt im [November 2025](https://www.ptc.com/en/news/2025/tpg-to-acquire-ptcs-industrial-connectivity-and-iot-businesses), abgeschlossen im März 2026. Laut Ankündigung konzentriert sich PTC auf CAD, PLM, ALM und Service Lifecycle Management. ServiceMax gehört zum Kern. Die IoT-Plattform, die PTC auf der ServiceMax-Seite noch als Anbindung nennt, gehört heute einem anderen Unternehmen.

## Was ich aus Field-Service-Projekten mitnehme

ServiceMax habe ich selbst nicht eingeführt, und ich habe es auch nicht in einer Auswahl gegen Salesforce erlebt. Was ich kenne, sind die Stellen, an denen Außendienstprojekte bei Herstellern hängen bleiben.

```praxis
In meinen Field-Service-Projekten mit Wartung, Störungseinsätzen und Inbetriebnahmen kamen Installed Base und Ersatzteile aus dem ERP, die Planung lief automatisch. Die Stolpersteine waren die Datenqualität der Assets, die Akzeptanz der Techniker und die ERP-Schnittstellen.
```

Keiner dieser drei Punkte hängt am Produkt. Eine bessere Entitlement-Engine hilft nicht, wenn die Seriennummern im ERP nicht stimmen. Deshalb gewichte ich in einer Auswahl die Frage, welches Produkt mit Ihren Daten und Ihrer Schnittstelle am wenigsten Sonderwege braucht, höher als die Funktionsliste. Wie die Teile zwischen ERP und Salesforce fließen, beschreibe ich in [Ersatzteile zwischen ERP und Salesforce](../salesforce-field-service-ersatzteile-erp/).

## Wie entscheiden Sie zwischen ServiceMax und Salesforce Field Service?

```pro-contra
pro: ServiceMax Core
- Depotreparatur, Retouren und Entitlement-Engine im Kern
- Arbeitspläne mit Abhängigkeiten für komplexe Reparaturen
- Anbindung an Windchill, Servigistics und PTC Orbit
contra: Was Sie dafür in Kauf nehmen
- Zwei Hersteller, zwei Releasekalender, keine PTC-Verfügbarkeitszusage
- Eigenes Datenmodell neben den Field-Service-Objekten
- Planungsdaten auf AWS, Zinc-Daten in den USA
- Keine öffentlichen Preise
```

Meine Faustregel: Salesforce Field Service ist der Standard für Hersteller, die Vertrieb und Service schon auf Salesforce haben und vor allem Wartung und Störungseinsätze planen. Ob sich Field Service überhaupt rechnet, zeigt [Salesforce Field Service: Wann lohnt es sich?](../salesforce-field-service-lohnt-sich/). ServiceMax Core gehört auf die Liste, wenn Reparaturen im eigenen Depot, Rücksendungen und vertragliche Ansprüche Ihren Service prägen und Ihr PLM von PTC kommt. Wenn Sie Salesforce Field Service behalten und nur Anlagentiefe ergänzen wollen, ist Asset 360 die Variante, die ich mir zuerst ansehen würde.

## Wo fangen Sie an?

1. **Listen Sie Ihre Serviceprozesse auf** und markieren Sie, welche davon Depot, Retouren und Vertragsprüfung betreffen.
2. **Fordern Sie zwei Angebote an**: PTC inklusive aller Salesforce-Lizenzen, Salesforce Field Service inklusive Add-ons. Die Rollenlogik für Salesforce steht in [Salesforce Field Service Lizenzen: Wer braucht welche?](../field-service-lizenzen-rollen-dispatcher-techniker/).
3. **Stellen Sie PTC vier Fragen schriftlich**: Datenorte, Verfügbarkeit, Sprachmodell von ServiceMax AI und Zusammenspiel mit Salesforce-Funktionen.
4. **Lassen Sie die Bewertung unabhängig rechnen.** Wie ich solche Varianten vergleiche, steht unter [Make-or-Buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

ServiceMax ist eine ernsthafte Option für anlagenlastigen Service, aber immer eine zweite Schicht auf Salesforce. Wenn Sie eine Auswahl unabhängig begleiten lassen möchten, [schreiben Sie mir](#contact).
