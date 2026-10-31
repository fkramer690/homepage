---
title: "SAP CRM oder Salesforce: Was nach 2027 kommt"
description: "SAP vs Salesforce nach dem Wartungsende von SAP CRM 7.0: welche Wege es gibt, wann Salesforce passt, wann SAP, und was Abwarten bis 2030 kostet."
pubDate: 2026-10-30
lang: de
slug: sap-crm-oder-salesforce-wartungsende
translationKey: sap-crm-or-salesforce
topic: data
categories: [architecture]
contactBrief: make-or-buy
tags: [SAP CRM, SAP vs Salesforce, S/4HANA, Make-or-buy, CRM-Auswahl, Wartungsende]
takeaways:
  - "Die reguläre Wartung für SAP CRM 7.0 endet Ende 2027. Bis Ende 2030 gibt es eine optionale verlängerte Wartung mit zwei Prozentpunkten Aufschlag auf die Wartungsbasis."
  - "Nach SAP CRM gibt es drei Wege: CRM-Funktionen in S/4HANA, SAP Sales und Service Cloud oder Salesforce. Ein Weiterbetrieb ohne Plan ist der teuerste."
  - "Salesforce passt, wenn Vertrieb, Service, Portale und Partner im Mittelpunkt stehen und das CRM mehr sein soll als die Vorstufe zum ERP-Auftrag."
  - "Der SAP-Weg passt, wenn das CRM vor allem Aufträge und Serviceaufträge vorbereitet, die ohnehin in S/4HANA abgewickelt werden."
  - "Welcher Weg gewinnt, entscheiden Prozesse, Schnittstellen und Lizenzen über mehrere Jahre, nicht der Produktname. Diese Rechnung gehört vor jedes Angebot."
faq:
  - q: "Wann endet die Wartung für SAP CRM?"
    a: "SAP CRM 7.0 gehört zur SAP Business Suite 7. Die reguläre Wartung endet laut SAP Ende 2027. Die optionale verlängerte Wartung läuft von Anfang 2028 bis Ende 2030 und kostet zwei Prozentpunkte Aufschlag auf die Wartungsbasis."
  - q: "Was ist der Nachfolger von SAP CRM?"
    a: "SAP bietet zwei Richtungen an: CRM-Funktionen direkt in SAP S/4HANA, etwa SAP S/4HANA for customer management und S/4HANA Service, und die Cloud-Lösungen SAP Sales Cloud und SAP Service Cloud Version 2. Viele Unternehmen prüfen daneben Salesforce."
  - q: "Ist Salesforce besser als SAP für das CRM?"
    a: "Das hängt vom Schwerpunkt ab. Salesforce ist stark bei Vertrieb, Service, Portalen und Partnern. Der SAP-Weg ist naheliegend, wenn das CRM vor allem ERP-Aufträge vorbereitet. Entscheidend sind Prozesse, Schnittstellen und Lizenzen über mehrere Jahre."
  - q: "Kann ich SAP CRM nach 2030 weiter betreiben?"
    a: "Laut SAP erhalten Kunden ohne verlängerte Wartung oder nach deren Ende eine kundenspezifische Wartung. Neue Funktionen und gesetzliche Anpassungen sind darin nicht mehr zu erwarten. Als Dauerlösung taugt das selten."
draft: false
---

Wer heute SAP CRM betreibt, muss bis spätestens 2030 entscheiden, wie es weitergeht: Die reguläre Wartung für SAP CRM 7.0 endet Ende 2027, die verlängerte Wartung Ende 2030. Zur Wahl stehen CRM-Funktionen in S/4HANA, SAP Sales und Service Cloud oder Salesforce. Wer nach „SAP vs Salesforce“ sucht, findet meist Funktionsvergleiche. Für Hersteller zählt eine andere Frage: Ist das CRM vor allem die Vorstufe zum ERP-Auftrag, oder soll es Vertrieb, Service, Portale und Partner tragen? Davon hängt ab, welcher Weg passt.

## Wann endet die Wartung für SAP CRM?

SAP CRM 7.0 gehört zur SAP Business Suite 7. Laut der [Wartungsstrategie von SAP](https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html) gelten für die Kernanwendungen der Suite, darunter SAP ERP 6.0 und SAP CRM 7.0, diese Fristen:

```zeitleiste
2027-12-31 | Reguläre Wartung für SAP CRM 7.0 endet
2028-01-01 | Optionale verlängerte Wartung beginnt, mit zwei Prozentpunkten Aufschlag
2030-12-31 | Verlängerte Wartung endet, danach kundenspezifische Wartung
```

Der Aufschlag von zwei Prozentpunkten auf die Wartungsbasis gilt laut SAP für alle Supportangebote im Umfang der Business Suite 7. Nach 2030 bietet SAP nur noch eine kundenspezifische Wartung an. Ein CRM, das bis dahin nicht abgelöst ist, läuft also ohne Weiterentwicklung weiter.

Für die Planung heißt das: Eine CRM-Ablösung mit Auswahl, Vertrag, Umsetzung, Datenmigration und Schulung dauert in einem internationalen Unternehmen leicht zwei Jahre. Wer 2030 fertig sein will, muss 2027 oder 2028 entscheiden.

## Welche Wege gibt es nach SAP CRM?

Grob gibt es drei Richtungen, dazu die Option, vorerst nichts zu tun:

| Weg | Was dahinter steckt | Passt, wenn |
|---|---|---|
| CRM-Funktionen in S/4HANA | Vertriebs- und Serviceprozesse direkt im ERP, etwa S/4HANA for customer management und S/4HANA Service | das CRM vor allem Aufträge und Serviceaufträge vorbereitet |
| SAP Sales und Service Cloud | Cloud-CRM von SAP, laut SAP mit Standardintegration Lead-to-Cash zu S/4HANA | ein Cloud-CRM gewünscht ist und die SAP-Landschaft führen soll |
| Salesforce | Sales Cloud, Service Cloud, Field Service, Portale, ggf. Manufacturing Cloud | Vertrieb, Service, Portale und Partner im Mittelpunkt stehen |
| Weiterbetrieb | SAP CRM mit verlängerter, später kundenspezifischer Wartung | als Brücke bis zu einem festen Ablösetermin |

SAP selbst positioniert die [Version 2 von SAP Sales und Service Cloud](https://www.sap.com/engage/sscv2.html) als Cloud-Ziel und hebt die Integration mit S/4HANA hervor. Für Unternehmen, die SAP CRM ohnehin parallel zum Umstieg von ECC auf S/4HANA ablösen müssen, ist das ein ernstzunehmendes Argument.

## Wann passt Salesforce, wann der SAP-Weg?

Die Entscheidung hängt weniger am Produkt als daran, was das CRM leisten soll. Bei Herstellern sehe ich zwei Muster.

Im ersten Muster ist das CRM eine Vorstufe zum ERP. Innendienst erfasst Angebote und Aufträge, Service legt Serviceaufträge an, und fast alles endet ohnehin in S/4HANA. Hier spricht viel für den SAP-Weg, weil Daten und Prozesse in einer Welt bleiben.

Im zweiten Muster trägt das CRM eigene Prozesse: Vertriebssteuerung mit Forecasts und Rahmenverträgen, Kundenservice über mehrere Kanäle, Außendienst, Händler- und Kundenportale. Hier ist Salesforce stark, und die Schnittstelle zum ERP ist der Preis dafür.

```pro-contra
pro: Salesforce
- Breites Angebot für Vertrieb, Service, Außendienst und Portale auf einer Plattform
- Branchenfunktionen wie Sales Agreements in der Manufacturing Cloud
- Großer Markt an Partnern und Fachleuten
contra: Was Sie dafür einplanen müssen
- Schnittstellen zu SAP für Kunden, Produkte, Preise und Aufträge
- Ein klares führendes System pro Datenart
- Lizenzen pro Nutzer, die über Jahre sauber geplant sein wollen
```

Bei der Integration hilft eine einfache Regel: Für jede Art von Daten führt genau ein System. Welche Daten zwischen SAP und Salesforce fließen, beschreibe ich am Beispiel der [Manufacturing Cloud](../manufacturing-cloud-sap-integration-datenfluesse/) und für Preise in [Kundenpreise: SAP-Konditionen oder Salesforce Pricing?](../kundenpreise-sap-konditionen-oder-salesforce-pricing/). Die Architektur dahinter steht unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

## Warum entscheidet die Rechnung über mehrere Jahre?

Angebote vergleichen oft Lizenzkosten im ersten Jahr. Für eine CRM-Ablösung reicht das nicht. In die Rechnung gehören mindestens:

1. **Lizenzen über die Vertragslaufzeit**, getrennt nach Nutzergruppen. Nicht jeder Nutzer braucht eine volle Lizenz, wie in [Salesforce-Lizenzen: braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/) beschrieben.
2. **Schnittstellen**, also Aufbau und Betrieb. Beim Salesforce-Weg sind sie größer, beim SAP-Weg nicht null.
3. **Datenmigration** von Kunden, Kontakten, Historie und offenen Vorgängen aus SAP CRM.
4. **Wartung des Altsystems** bis zur Abschaltung, inklusive Aufschlag ab 2028.
5. **Schulung und Einführung**, weil ein neues CRM nur wirkt, wenn Vertrieb und Service es nutzen.

```praxis
Ich habe Manufacturing Cloud in einem Projekt bewusst nicht empfohlen, weil Sales Agreements für den Kunden keine Rolle spielten. Dieselbe Logik gilt für die CRM-Ablösung: Entscheidend ist, welche Prozesse das neue System wirklich tragen soll, nicht welches Produkt im Angebot steht.
```

Wie ich solche Entscheidungen mit Kunden vorbereite, steht unter [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/). Wann sich die Manufacturing Cloud gegenüber der Sales Cloud lohnt, vergleicht [Manufacturing Cloud: Wann lohnt sie sich?](../manufacturing-cloud-wann-lohnt-sie-sich/).

## Was kostet es, bis 2030 abzuwarten?

Abwarten wirkt zunächst günstig, weil das System läuft und niemand Budget beantragen muss. Die Kosten entstehen an drei Stellen. Erstens der Aufschlag auf die Wartung ab 2028, jedes Jahr bis zur Abschaltung. Zweitens die Zeit: Wer erst 2029 entscheidet, hat für Auswahl, Umsetzung und Migration kaum Puffer und verhandelt mit Anbietern und Partnern unter Zeitdruck. Drittens der Stillstand im System selbst. Neue Anforderungen aus Vertrieb und Service landen in einem CRM, in das niemand mehr investieren will. Sie wandern in Excel-Listen und Zusatzwerkzeuge, die später ebenfalls migriert werden müssen.

Dazu kommt, dass für SAP ERP 6.0 dieselben Fristen gelten und viele Unternehmen in denselben Jahren auf S/4HANA umsteigen. Fachleute für SAP, für Salesforce und für Datenmigration sind dann gefragt, und wer spät anfragt, bekommt die Teams, die noch frei sind. Der Weiterbetrieb taugt deshalb nur als Brücke mit festem Enddatum.

## Wo sollten Sie anfangen?

Beginnen Sie mit einer Bestandsaufnahme, bevor Sie Angebote einholen: Welche Prozesse laufen heute in SAP CRM, wie viele Nutzer arbeiten damit, welche Schnittstellen hängen daran, und welche Daten müssen mit? Klären Sie parallel, wann der Umstieg von ECC auf S/4HANA geplant ist, denn beide Projekte teilen sich Schnittstellen, Stammdaten und oft dasselbe Team.

Dann legen Sie fest, welches der beiden Muster bei Ihnen gilt: CRM als Vorstufe zum ERP oder CRM mit eigenen Prozessen für Vertrieb, Service und Partner. Mit dieser Antwort lässt sich die Auswahl auf zwei Wege eingrenzen und die Rechnung über mehrere Jahre aufstellen.

Das Wartungsende ist ein fester Termin, die Entscheidung dafür braucht mehr Vorlauf, als die Jahreszahl 2030 vermuten lässt.
