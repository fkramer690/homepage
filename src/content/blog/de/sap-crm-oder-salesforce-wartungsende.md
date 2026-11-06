---
title: "SAP CRM oder Salesforce: Was nach 2027 kommt"
description: "SAP vs Salesforce nach dem Wartungsende von SAP CRM 7.0: welche Wege es gibt, welche Fragen für Hersteller entscheiden, warum Abwarten bis 2030 riskant ist."
pubDate: 2026-11-06
lang: de
slug: sap-crm-oder-salesforce-wartungsende
translationKey: sap-crm-or-salesforce
topic: data
categories: [architecture]
contactBrief: make-or-buy
tags: [SAP CRM, SAP vs Salesforce, S/4HANA, Make-or-buy, CRM-Auswahl, Wartungsende]
takeaways:
  - "Die Mainstream-Wartung für SAP CRM 7.0 endet 2027, die verlängerte 2030. Planen Sie die Entscheidung vom Abschaltdatum aus rückwärts."
  - "Einen Eins-zu-eins-Nachfolger gibt es nicht. S/4HANA, SAP Sales und Service Cloud, Salesforce und Mischformen werden je Funktion geprüft."
  - "Für Hersteller entscheiden installierte Basis, Verträge, Ersatzteile, Außendienst, Händler und Preise aus SAP, nicht der Produktname."
  - "Weiterbetrieb ohne Enddatum erhöht Support-, Technik- und Projektrisiko, denn nach 2030 bleibt nur kundenspezifische Wartung."
  - "Vergleichen Sie Lizenzen, Schnittstellen, Migration, Parallelbetrieb und Schulung über mehrere Jahre, bevor Sie Angebote einholen."
faq:
  - q: "Wann endet die Wartung für SAP CRM?"
    a: "SAP CRM 7.0 gehört zur SAP Business Suite 7. Die Mainstream-Wartung endet laut SAP Ende 2027. Die optionale verlängerte Wartung läuft bis Ende 2030 und kostet zwei Prozentpunkte Aufschlag auf die Wartungsbasis."
  - q: "Gibt es einen direkten Nachfolger für SAP CRM?"
    a: "Nicht als Eins-zu-eins-Produkt. SAP verweist auf Vertriebs- und Servicefunktionen in S/4HANA und auf SAP Sales Cloud und SAP Service Cloud Version 2; viele Hersteller prüfen auch Salesforce. Welche Funktion wohin wandert, zeigt ein Fit-Gap-Abgleich."
  - q: "Muss SAP CRM bis Ende 2030 abgeschaltet sein?"
    a: "Nein, aber danach bietet SAP nur noch kundenspezifische Wartung, ohne neue gesetzliche Anpassungen oder Support Packages. Laut SAP endet 2030 außerdem der Support für Fremddatenbanken und für Java 8 mit AS Java 7.5."
  - q: "Kann Salesforce SAP CRM vollständig ersetzen?"
    a: "Nur nach einer Analyse von Funktionen, Daten, Schnittstellen und Betrieb. Salesforce deckt Vertrieb, Service, Außendienst und Portale ab, lizenziert nach Produkt und Nutzerart. Daten, für die das ERP führend ist, etwa der Auftragsstatus, werden bei Bedarf synchronisiert."
draft: false
---

Die Mainstream-Wartung für SAP CRM 7.0 endet am 31. Dezember 2027, die verlängerte Wartung am 31. Dezember 2030. Weil Auswahl, Einführung und Migration Zeit brauchen, fällt die Entscheidung deutlich vor der Abschaltung. Zur Wahl stehen Vertrieb und Service in S/4HANA, SAP Sales und Service Cloud, Salesforce oder eine Mischung. Für Hersteller sortiert eine Frage die Wege: Ist das CRM vor allem die Vorstufe zum ERP-Auftrag, oder soll es Vertrieb, Service, Portale und Partner tragen? Ich gestalte und steuere Salesforce-Programme für Hersteller auf Kundenseite; die SAP-Wege beschreibe ich nach den veröffentlichten Angaben von SAP.

## Wann endet die Wartung für SAP CRM?

SAP CRM 7.0 gehört zur SAP Business Suite 7. Laut der [Wartungsstrategie von SAP](https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html) gelten für die Kernanwendungen der Suite, darunter SAP ERP 6.0 und SAP CRM 7.0, auf unterstützten Erweiterungspaketen diese Fristen:

```zeitleiste
2027-12-31 | Mainstream-Wartung für SAP CRM 7.0 endet
2028-01-01 | Optionale verlängerte Wartung beginnt, mit zwei Prozentpunkten Aufschlag
2030-12-31 | Verlängerte Wartung endet, danach kundenspezifische Wartung
```

Laut SAP gilt der Aufschlag für die Supportangebote rund um die Business Suite 7. Was er Sie kostet, hängt von Vertrag und Wartungsbasis ab; klären Sie das mit SAP, statt ihn als CRM-Aufschlag zu verbuchen. Fragen Sie dabei auch, ob Ihr installierter Release- und Erweiterungspaketstand abgedeckt ist.

Nach 2030 heißt kundenspezifische Wartung: keine neuen gesetzlichen Anpassungen und keine neuen Support Packages. Im Oktober 2026 hat SAP außerdem [angekündigt](https://news.sap.com/2026/10/beyond-2030-sap-business-suite-7-sap-netweaver-customers-third-party-databases-java/), dass Ende 2030 der Datenbanksupport für Systeme auf Fremddatenbanken und der Support für Java 8 mit AS Java 7.5 enden. Ein SAP CRM, das dann noch läuft, läuft weiter, aber mit wachsendem technischem Risiko.

## Fünf Wege nach SAP CRM

Einen einzelnen Nachfolger gibt es nicht. Die Funktionen von SAP CRM verteilen sich auf mehrere Ziele, und viele Unternehmen kombinieren sie:

```tabelle
titel: Wege nach SAP CRM
spalten: Weg | Was dahinter steckt | Naheliegend, wenn
Vertrieb und Service in S/4HANA | Vertrieb in S/4HANA, Serviceaufträge und Serviceverträge in SAP S/4HANA Service | Das CRM vor allem Aufträge und Serviceaufträge für das ERP vorbereitet
SAP Sales und Service Cloud | Cloud-CRM von SAP, laut SAP mit Standardintegration zu S/4HANA | SAP-Standardintegration wichtiger ist als Flexibilität im Frontoffice und der Cloud-Umfang Ihre Funktionen abdeckt
Salesforce | Sales Cloud, Service Cloud, Field Service, Portale, eventuell Manufacturing Cloud | Vertrieb, Service, Portale und Partner eigene Prozesse tragen
Mischform | Etwa Salesforce für Vertrieb und Portale, S/4HANA für die Serviceabwicklung | Frontoffice und Backoffice unterschiedlichen Prioritäten folgen
Weiterbetrieb | SAP CRM mit verlängerter, später kundenspezifischer Wartung | Nur als Brücke zu einem festen Enddatum
fazit: Prüfen Sie jede SAP-CRM-Funktion, die Sie tatsächlich nutzen: Zieht sie um, wird sie neu gestaltet oder entfällt sie?
```

SAP positioniert [Version 2 der SAP Sales und Service Cloud](https://www.sap.com/engage/sscv2.html) als Ziel in der Cloud. Sie ist eine eigene Lösung mit eigenem Datenmodell und braucht deshalb wie Salesforce eine Integration zu S/4HANA, auch wenn SAP mehr davon als Standardinhalt liefert. Lösungen desselben Herstellers bilden kein gemeinsames System.

## Welche Fragen entscheiden zwischen Salesforce und SAP?

Zwei Muster helfen, die Ausgangslage zu sortieren. Im ersten ist das CRM eine Vorstufe zum ERP: Der Innendienst erfasst Angebote und Aufträge, der Service legt Serviceaufträge an, und fast alles landet in S/4HANA. Hier gehören die SAP-Wege in die engere Auswahl. Im zweiten trägt das CRM eigene Prozesse: Vertriebssteuerung mit Prognosen und Sales Agreements, Kundenservice über mehrere Kanäle, Außendienst, Händler- und Kundenportale. Hier gehört Salesforce in die engere Auswahl. Viele Unternehmen liegen dazwischen.

Die Muster grenzen die Liste ein. Die Entscheidung kommt aus den Fragen, die für Hersteller zählen:

```tabelle
titel: Was für Hersteller entscheidet
spalten: Thema | Zu klärende Frage | In der Demo testen
Installierte Basis | Wo liegen Maschinen, Konfigurationen und Historie, und wer pflegt sie? | Ihre Anlagenhierarchie mit realen Daten
Verträge und Garantie | Welches System prüft Deckung, Ansprüche und Garantiefälle? | Einen Garantiefall von Anfang bis Ende
Ersatzteile | Brauchen Techniker und Service Desk Bestand und Reservierungen aus dem ERP in Echtzeit? | Verfügbarkeitsprüfung bei einer Störung
Außendienst | Brauchen Techniker eine offlinefähige mobile App und automatische Einsatzplanung? | Einen Techniker-Tag, offline
Händler und Partner | Bearbeiten Händler Leads, Deals, Anlagen oder Garantiefälle in einem Portal? | Einen Händler, der einen Deal registriert
Produkte und Preise | Gibt es einen Konfigurator, und bleiben Kundenpreise in den SAP-Konditionen? | Ein Angebot mit Kundenpreis aus SAP
Aufträge | Welchen Auftrags- und Lieferstatus müssen Vertrieb oder Kunde sehen? | Status eines Auftrags im Portal
fazit: Jede Antwort zeigt in eine Richtung, entscheiden kann nur das Gesamtbild.
```

Bei den [Sales Agreements der Manufacturing Cloud](https://help.salesforce.com/s/articleView?id=sf.sa_admin_parent_concept.htm&language=en_US&type=5) gilt: Sie planen Mengen und Umsatz über die Zeit. Das ist nicht dasselbe wie ein rechtlich bindender Rahmenvertrag oder ein Kontrakt in SAP; klären Sie, wo die verbindliche Fassung liegt.

Neben den fachlichen Fragen prüfen Sie Berechtigungs- und Sicherheitsmodell, Datenresidenz, Anforderungen an Offline-Betrieb und Performance, den Release-Zyklus mit seinem Testaufwand und wer die Plattform betreibt und unterstützt. Eine gute Prozessdemo allein entscheidet nicht.

## Jeder Weg braucht Schnittstellen

Jeder Weg braucht Integration, auch die SAP-Wege. Den Aufwand bestimmt weniger die Zahl der Schnittstellen als die Zahl der führenden Systeme, die Flussrichtung, die nötige Aktualität, die Nachverarbeitung von Fehlern und die Verantwortung für den Betrieb. Für jedes fachliche Merkmal und jede Phase sollte genau ein System führend sein: Bei einem Kunden kann SAP für die rechtlichen Daten führend sein, während Vertriebsrollen und Ansprechpartner in Salesforce gepflegt werden.

Welche Daten zwischen SAP und Salesforce fließen, beschreibe ich am Beispiel der [Manufacturing Cloud](../manufacturing-cloud-sap-integration-datenfluesse/) und für Preise in [Kundenpreise: SAP-Konditionen oder Salesforce Pricing?](../kundenpreise-sap-konditionen-oder-salesforce-pricing/). Die Architektur dahinter steht unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/). Salesforce bildet Vertrieb, Service, [Field Service](https://help.salesforce.com/s/articleView?id=fs_overview.htm&language=en_US&type=5) und Portale auf einer Plattform ab; Lizenzen und Berechtigungen unterscheiden sich aber nach Produkt und Nutzerart, planen Sie sie getrennt.

## Die Rechnung über mehrere Jahre entscheidet

Angebote vergleichen oft die Lizenzkosten im ersten Jahr. Bei einer CRM-Ablösung umfasst die Rechnung die ganze Laufzeit:

```tabelle
titel: Was in die Rechnung gehört
spalten: Posten | Was hineingehört | Oft vergessen
Lizenzen | Je Nutzergruppe über die Vertragslaufzeit | Externe Nutzer in Portalen
Einführung | Prozessdesign, Konfiguration, Erweiterungen, Tests | Umgebungen und Deployment
Schnittstellen | Aufbau und Betrieb, auf jedem Weg | Überwachung und Nachverarbeitung
Datenmigration | Kunden, Kontakte, Historie und offene Vorgänge aus SAP CRM | Excel-Listen, die drumherum entstanden sind
Altsystem | Wartung und Aufschlag bis zur Abschaltung | Parallelbetrieb und späte Änderungen
Rollout | Schulung und Begleitung für Vertrieb und Service | Zeit der Key User
Betrieb | Application Management, Releases, Weiterentwicklung | Archivierung und Stilllegung von SAP CRM
fazit: Fragen Sie SAP nach der tatsächlichen Wartungsbasis und dem Aufschlag, bevor Sie Wege vergleichen.
```

Welche Lizenzen Nutzergruppen wirklich brauchen, steht in [Salesforce-Lizenzen: Braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/)

```praxis
In einem Projekt habe ich bewusst von der Manufacturing Cloud abgeraten, weil Sales Agreements für den Kunden keine Rolle spielten. Bei einer CRM-Ablösung gilt dieselbe Logik: Entscheidend ist, welche Prozesse das neue System wirklich tragen muss, nicht welches Produkt im Angebot steht.
```

Wie ich solche Entscheidungen mit Kunden vorbereite, steht unter [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/). Wann sich die Manufacturing Cloud gegenüber der Sales Cloud lohnt, beschreibe ich in [Manufacturing Cloud: Wann lohnt sie sich?](../manufacturing-cloud-wann-lohnt-sie-sich/).

## Warum erhöht Abwarten bis 2030 Kosten und Risiko?

Abwarten wirkt zunächst günstig, weil das System läuft und niemand Budget beantragen muss. In der verlängerten Wartung fällt der Aufschlag jedes Jahr an. Wer erst 2029 entscheidet, hat wenig Puffer für Auswahl, Einführung und Migration und verhandelt unter Zeitdruck. Neue Anforderungen aus Vertrieb und Service landen in einem CRM, in das oft nicht mehr investiert wird, wandern in Excel-Listen und Zusatzwerkzeuge und müssen später ebenfalls migriert werden.

Dieselben Fristen gelten für SAP ERP 6.0, und viele Unternehmen wechseln in denselben Jahren auf S/4HANA. Beide Projekte teilen Schnittstellen, Stammdaten und oft dieselben Leute und konkurrieren um dieselben internen Fachleute und Umsetzungskapazitäten. Ein Weiterbetrieb von SAP CRM lässt sich am besten als Brücke mit festem Enddatum vertreten.

## Mit Zielen und einer Bestandsaufnahme beginnen

Bevor Sie Angebote einholen, klären Sie, was besser werden soll: welche Ergebnisse Vertrieb und Service brauchen, welche Prozesse entfallen sollen, wo SAP CRM heute scheitert und welche Nutzergruppen es umgehen. Dann nehmen Sie auf: Prozesse, Nutzer, Schnittstellen, Daten, Eigenentwicklungen und die technische Basis mit Datenbank, Java-Komponenten und Add-ons. Parallel klären Sie, wann der Wechsel von ECC auf S/4HANA geplant ist.

Damit entscheiden Sie, welches Muster bei Ihnen gilt und welche Fragen aus der Tabelle für Sie am meisten zählen. Das grenzt die Auswahl auf zwei oder drei Wege ein und gibt Ihnen die Grundlage für die Rechnung über mehrere Jahre.
