---
title: "ServiceMax oder Salesforce Field Service?"
metaTitle: "ServiceMax: Teil von Salesforce? Vergleich mit Field Service"
description: "ServiceMax gehört zu PTC, nicht zu Salesforce, läuft aber in Ihrer Salesforce-Org. Wann es Salesforce Field Service für Hersteller schlägt und wann nicht."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: servicemax-oder-salesforce-field-service
translationKey: servicemax-vs-salesforce-field-service
topic: field-service
categories: [field-service]
tags: [Field Service, ServiceMax, PTC, Außendienst, Softwareauswahl]
takeaways:
  - "ServiceMax Core läuft als Managed Package in der Salesforce-Org des Kunden, Core-Nutzer brauchen also Salesforce-Lizenzen. Andere Rollen haben eigene Regeln."
  - "PTC nennt ServiceMax eine eigenständige Plattform. Das trifft auf Eigentum und Roadmap zu, technisch bleibt Salesforce die Basis (Stand Oktober 2026)."
  - "ServiceMax Core hat ein eigenes Datenmodell. Planung und Optimierung betreibt PTC auf AWS in Irland, die Kommunikationsapp Zinc in den USA."
  - "ServiceMax bringt Depotreparatur, Retouren und regelbasierte Entitlements mit. Bei Field Service bleiben Daten, Lizenzen, Releases und KI bei einem Hersteller."
  - "Das Standard-SLA von PTC gilt für die ServiceMax-Suiten nicht, PTC sagt nur angemessene Anstrengungen zu. Klären Sie Betrieb, Haftung und Releasekalender."
faq:
  - q: "Gehört ServiceMax zu Salesforce?"
    a: "Nein. ServiceMax gehört seit dem 4. Januar 2023 zu PTC, die Übernahme kostete laut Ankündigung 1,46 Milliarden Dollar. Salesforce ist Plattformanbieter und Wettbewerber mit eigenem Field Service."
  - q: "Läuft ServiceMax auf Salesforce?"
    a: "Ja, Stand Oktober 2026. ServiceMax Core und Asset 360 werden laut PTC in Salesforce-Rechenzentren betrieben, Core wird als Managed Package über AppExchange installiert. Service Board und Schedule Optimization betreibt PTC zusätzlich auf AWS in Irland."
  - q: "Brauche ich für ServiceMax Salesforce-Lizenzen?"
    a: "Für Core-Nutzer ja. Nach der PTC-Doku wird die ServiceMax-Lizenz Nutzern mit Salesforce-, Salesforce-Platform- oder Community-Lizenz zugeordnet. Andere Rollen unterscheiden sich: Techniker, die nur über Service Board disponiert werden, brauchen eine Service-Board-Lizenz, Zinc läuft auch ohne Core-Lizenz, und Engage-Nutzer brauchen eine Customer-Community-Plus-Lizenz. Für Asset 360 verlangt PTC zusätzlich Service Cloud und mindestens eine Field-Service-Lizenz."
  - q: "Was kostet ServiceMax?"
    a: "Öffentliche Listenpreise für ServiceMax habe ich nicht gefunden. Rechnen Sie mit einem Angebot von PTC und zusätzlich mit den Salesforce-Lizenzen für jeden Core-Nutzer, und vergleichen Sie beides mit den Listenpreisen von Salesforce Field Service."
draft: false
---

ServiceMax gehört nicht zu Salesforce: PTC besitzt ServiceMax seit Januar 2023, doch ServiceMax Core läuft weiter als Paket in der Salesforce-Org des Kunden. Laut PTC-Leistungsbeschreibung vom Februar 2025 bringt Core ein eigenes Datenmodell mit, und Service Board und Schedule Optimization betreibt PTC auf AWS. Die native Alternative ist Salesforce Field Service, heute Agentforce Field Service and Operations. Core-Nutzer brauchen also Salesforce-Lizenzen, dazu kommt ein zweiter Hersteller. Auf Basis des dokumentierten Funktionsumfangs verdient ServiceMax einen genaueren Blick, wenn Depotreparatur, Retouren und regelbasierte Entitlements Ihren Service prägen und Ihr PLM von PTC stammt. Sonst würde ich mit Salesforce Field Service beginnen.

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
| ServiceMax AI | Assistent für Techniker, seit Februar 2025 | Eigenes Paket, nutzt [OpenAI-Modelle](https://support.ptc.com/help/servicemaxcore/en/articles/ai/ai-architecture-overview.html) und Pinecone; Modellversionen nicht dokumentiert |

Der wichtigste Punkt steckt in der ersten Zeile. Der [Arbeitsauftrag in Core](https://support.ptc.com/help/servicemaxcore/en/articles/core/work-order1.html) ist ein eigenes Objekt mit 207 Feldern, die Installed Base ein eigenes Objekt „Installed Product“. Core baut in derselben Org ein paralleles Modell auf; die Standardobjekte WorkOrder, ServiceAppointment und Asset von Salesforce Field Service bleiben dabei ungenutzt. Asset 360 macht es umgekehrt und erweitert die Standardobjekte, mehr dazu in [ServiceMax Asset 360: Lohnt sich die Ergänzung?](/blog/servicemax-asset-360-field-service/).

## ServiceMax Core bringt Depotreparatur, Retouren und Entitlements mit

Der Unterschied zwischen den Produkten ist kleiner als vor zehn Jahren. Salesforce stellt Standardobjekte für Assets und Asset-Hierarchien sowie für Wartungspläne, Serviceverträge und Entitlements bereit. Für fertige Abläufe wie interaktive Asset-Hierarchie, Deckungsauswahl und Schätzung kann ein Add-on nötig sein. Die Unterschiede liegen bei diesen Abläufen rund um die installierte Basis.

Für ServiceMax Core listet PTC Ersatzteile, Retouren und Depotreparatur, Verträge mit einer regelbasierten Entitlement-Engine und einen Service Flow Manager für eigene Abläufe als Kernfunktionen. Bei Salesforce sind Depotreparatur, Work Order Estimation und Deckungsauswahl Teil des Add-ons Asset Service Lifecycle Management, laut US-Liste 75 Dollar pro Nutzer und Monat; welche Editionen es schon enthalten, ändert sich gerade, siehe den Artikel dazu. Was das Add-on genau enthält, steht in [Asset Service Lifecycle Management: Lohnt sich das Add-on?](/blog/asset-service-lifecycle-management-zusatz/).

Mit Release 26R2 Mitte 2026 hat PTC laut [Übersicht der Neuerungen](https://www.ptc.com/en/products/servicemax/whats-new) Arbeitspläne mit Abhängigkeiten, Intraday-Optimierung in Intervallen von bis zu 15 Minuten und Teilefilterung anhand der Anlagenkonfiguration ergänzt. Das zielt auf komplexe Reparaturen an Maschinen mit vielen Varianten. Release 26R3 folgte am 9. Oktober 2026, das geplante 26R4 ist als 2027.0 für Januar 2027 vorgesehen.

Der zweite Unterschied ist das PTC-Portfolio. PTC verkauft Windchill und Servigistics. Die Doku zu Asset 360 beschreibt [einzelne Integrationen](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/product-integration.html): die Optimierung der Außendienstbestände mit Servigistics und, als Beta, Problemmeldungen an Windchill. Außerdem fließen Daten aus Core über eine [dokumentierte Integration](https://support.ptc.com/help/ptc_asset360/en/articles/implementers/servicemax_integration_with_asset_hub.html) in PTC Orbit, die Asset-Datenplattform von PTC. Wer Konstruktion und Ersatzteilplanung schon bei PTC hat, hat dort kürzere Wege.

Salesforce Field Service hat dafür die Plattform auf seiner Seite. Enhanced Scheduling and Optimization, die mobile Field Service App, Agentforce for Field Service und neue Funktionen jedes Releases basieren auf den Standardobjekten. Die Planung basiert auf WorkOrder und ServiceAppointment; ohne Mapping würde ich also nicht annehmen, dass sie Core-Arbeitsaufträge plant. Zur App und zu Agentforce sagen die Quellen, die ich gelesen habe, nichts über die Core-Objekte; prüfen Sie die Unterstützung je Funktion und lassen Sie sich die Kompatibilität vor der Auswahlentscheidung schriftlich bestätigen.

## Ein zweiter Hersteller verändert Betrieb und Datenschutz

Hier liegen die Punkte, die in Auswahlverfahren am häufigsten fehlen. Die meisten stehen in der Leistungsbeschreibung vom Februar 2025:

- **Verfügbarkeit.** Das SLA des PTC-Vertrags gilt für die ServiceMax-Suiten nicht, weil PTC die Hosting-Umgebungen nicht kontrolliert. PTC sagt nur wirtschaftlich vertretbare Bemühungen zu, ohne messbares SLA. Für die Salesforce-Umgebung ist Salesforce verantwortlich.
- **Datenorte.** Service Board und Schedule Optimization liegen auf AWS in Irland, Zinc auf AWS in den USA mit Kundendaten in den USA. Die [Liste der Unterauftragsverarbeiter](https://www.ptc.com/es/documents/legal-agreements/data-processing-terms-and-conditions/sub-processors) nennt zusätzlich Kartendienste und Twilio.
- **Lizenzen.** Service Board braucht eine Salesforce-Lizenz für die Integration. Core-Nutzer brauchen eine ServiceMax- und eine Salesforce-Lizenz; Techniker, die nur über Service Board disponiert werden, brauchen eine Service-Board-Lizenz, Zinc läuft ohne Core, Engage braucht Customer Community Plus.
- **Releases.** Salesforce liefert drei Releases im Jahr. ServiceMax folgt ab 2027 laut [Releaseplan](https://support.ptc.com/help/servicemaxcore/en/articles/release_notes/release-schedule.html) vier Major Releases mit je vier Wochen Vorschau, dazu Patches am letzten Freitag jedes Monats, wenn es Korrekturen gibt. Ihr Testteam prüft also zwei Kalender.

Dazu kommt die Strategie von PTC. PTC hat ThingWorx und Kepware an TPG verkauft, angekündigt im [November 2025](https://www.ptc.com/en/news/2025/tpg-to-acquire-ptcs-industrial-connectivity-and-iot-businesses), abgeschlossen im März 2026. Laut Ankündigung konzentriert sich PTC auf CAD, PLM, ALM und Service Lifecycle Management. ServiceMax gehört zum Kern. Die IoT-Plattform, die PTC auf der ServiceMax-Seite noch als Anbindung nennt, gehört heute einem anderen Unternehmen. Außerdem bekommt PTC selbst einen neuen Eigentümer: Am [5. Oktober 2026](https://investor.ptc.com/resources/news/news-details/2026/Schneider-Electric-to-acquire-PTC-creating-the-next-level-of-Energy-and-Industrial-Intelligence/default.aspx) hat Schneider Electric vereinbart, PTC zu übernehmen; der Abschluss wird bis Q3 2027 erwartet, vorbehaltlich Aktionärs- und Behördenzustimmung. Das bringt zusätzliche Unsicherheit über Eigentum und Roadmap in eine mehrjährige Auswahlentscheidung.

## Was ich aus Field-Service-Projekten mitnehme

ServiceMax habe ich selbst nicht eingeführt, und ich habe es auch nicht in einer Auswahl gegen Salesforce erlebt. Was ich kenne, sind die Stellen, an denen Außendienstprojekte bei Herstellern hängen bleiben.

```praxis
In meinen Field-Service-Projekten mit Wartung, Störungseinsätzen und Inbetriebnahmen stammten Installed Base und Ersatzteile aus dem ERP, die Planung erfolgte automatisch. Die Stolpersteine waren die Datenqualität der Assets, die Akzeptanz der Techniker und die ERP-Schnittstellen.
```

Keinen dieser Punkte löst die Produktwahl allein, auch wenn die Architektur die Arbeit daran erleichtern oder erschweren kann. Eine bessere Entitlement-Engine hilft nicht, wenn die Seriennummern im ERP nicht stimmen. Deshalb gewichte ich in einer Auswahl die Frage, welches Produkt mit Ihren Daten und Ihrer Schnittstelle am wenigsten Sonderwege braucht, höher als die Funktionsliste. Wie Ersatzteildaten zwischen ERP und Salesforce fließen, beschreibe ich in [Ersatzteile zwischen ERP und Salesforce](/blog/salesforce-field-service-ersatzteile-erp/).

## Wie entscheiden Sie zwischen ServiceMax und Salesforce Field Service?

```pro-contra
pro: ServiceMax Core
- Depotreparatur, Retouren und Entitlement-Engine im Kern
- Arbeitspläne mit Abhängigkeiten für komplexe Reparaturen
- Anbindung an Windchill, Servigistics und PTC Orbit
contra: Was Sie dafür in Kauf nehmen
- Zwei Hersteller, zwei Releasekalender, kein Standard-SLA von PTC
- Eigenes Datenmodell neben den Field-Service-Objekten
- Planungsdaten auf AWS, Zinc-Daten in den USA
- Keine öffentlichen Listenpreise gefunden
```

Meine Faustregel: Salesforce Field Service ist der Standard für Hersteller, die Vertrieb und Service schon auf Salesforce haben und vor allem Wartung und Störungseinsätze planen. Ob sich Field Service überhaupt rechnet, zeigt [Salesforce Field Service: Wann lohnt es sich?](/blog/salesforce-field-service-lohnt-sich/). ServiceMax Core verdient einen genaueren Blick, wenn Reparaturen im eigenen Depot, Rücksendungen und vertragliche Ansprüche Ihren Service prägen und Ihr PLM von PTC stammt. Wenn Sie Salesforce Field Service behalten und nur Anlagentiefe ergänzen wollen, ist Asset 360 die Variante, die ich mir zuerst ansehen würde.

## Serviceprozesse mit Depot, Retouren und Verträgen markieren

1. **Listen Sie Ihre Serviceprozesse auf** und markieren Sie, welche davon Depotreparatur, Retouren und Vertragsprüfung betreffen.
2. **Fordern Sie zwei Angebote an**: PTC inklusive aller Salesforce-Lizenzen, Salesforce Field Service inklusive Add-ons. Die Rollenlogik für Salesforce steht in [Salesforce Field Service Lizenzen: Wer braucht welche?](/blog/field-service-lizenzen-rollen-dispatcher-techniker/).
3. **Stellen Sie PTC vier Fragen schriftlich**: Datenorte, Verfügbarkeit, welche OpenAI-Modelle ServiceMax AI nutzt und wo Prompts verarbeitet werden, und Zusammenspiel mit Salesforce-Funktionen.
4. **Lassen Sie den Vergleich unabhängig kalkulieren.** Wie ich solche Varianten vergleiche, steht unter [Make-or-Buy und Lizenzprognosen](/leistungen/make-or-buy-lizenzen/). Wie ich Maschinenbauer bei solchen Entscheidungen begleite, steht unter [Salesforce-Beratung für Maschinenbauer](/salesforce-maschinenbau/).
