---
title: "Field Service: KI-Agenten, Einführung und Kennzahlen"
description: "Welche KI-Agenten in Salesforce Field Service heute tragen und was sie kosten, wie Sie in Wellen einführen und welche Kennzahlen nach dem Go-live zählen."
lang: de
slug: field-service-ki-agenten-einfuehrung
course: field-service
translationKey: fsl-05
chapter: 5
pubDate: 2026-10-28
short: "KI-Agenten, Einführung, Betrieb"
summary: "Welche Field-Service-Agenten heute tragen, wie Sie in Wellen einführen, was ein KI-Assistent einrichten darf und welche Kennzahlen danach zählen."
takeaways:
  - "Zuerst lohnen sich die proaktive Wartungsbuchung und der vorformulierte Einsatzbericht, weil beide häufig vorkommen und bekannten Regeln folgen."
  - "Kundenseitige Agenten kosten 20 Flex Credits pro Aktion, Sprachaktionen 30. Funktionen für Mitarbeitende kosten 125 Dollar pro Nutzer und Monat als Add-on."
  - "Agenten für Fehlersuche und Ersatzteile brauchen Handbücher mit dem Produktschlüssel des Assets und eine As-built-Stückliste je Seriennummer."
  - "Ein KI-Assistent kann Field Service ohne Setup-Masken einrichten. Lassen Sie ihn in einer Sandbox arbeiten und bringen Sie das Ergebnis über die Pipeline live."
  - "Führen Sie in Wellen nach Region ein, holen Sie den Betriebsrat vor der ersten Welle dazu und messen Sie gegen eine Ausgangsbasis aus dem Altsystem."
articles: [field-service-ai-agents-today, breakdown-hotline-voice-agent, field-service-ai-troubleshooting-manuals, spare-parts-serial-number-ai, field-service-headless-setup-ai, field-service-rollout, field-service-kpis-after-go-live]
faq:
  - q: "Mit welchem KI-Agenten sollte ein Maschinenbauer in Field Service beginnen?"
    a: "Mit der proaktiven Wartungsbuchung aus Wartungsplänen. Sie läuft oft, die Regeln sind bekannt, und eine Buchung kostet Cent in Flex Credits. Der vorformulierte Einsatzbericht folgt, sobald Teile, Arbeitszeit und Fehlercodes strukturierte Felder am Arbeitsauftrag sind."
  - q: "Darf ein Sprachagent bei Maschinenstillstand selbst einen Techniker buchen?"
    a: "Salesforce nennt Autonomous Scheduling mit Agentforce Voice in den Winter-'27-Highlights. Ich würde ihn nur buchen lassen, wenn die Maschine noch läuft, das Entitlement den Einsatz deckt und die Fehlerklasse bekannt ist. Stillstände mit zugesagter Reaktionszeit gehen mit gefülltem Case an die Disposition."
  - q: "Kann ein KI-Assistent Field Service direkt in Produktion einrichten?"
    a: "Davon rate ich ab. Das meiste, was er anlegt, sind Konfigurationsdatensätze, die ein Metadaten-Deployment nicht mitnimmt, und die Einrichtung lädt Beispieltermine. Lassen Sie ihn in einer Sandbox arbeiten, prüfen Sie den Plan mit Service und Disposition und deployen Sie über die Pipeline."
  - q: "Welche Kennzahlen zeigen nach dem Go-live, ob Field Service wirkt?"
    a: "Einsätze pro Techniker und Tag, Fahrzeitanteil, Erstlösungsquote, eingehaltene Reaktionszeiten, Ankunft im zugesagten Zeitfenster und der Anteil der Vorschläge, den die Disposition ändert. Messen Sie diese Werte vorher drei Monate im Altsystem, mit denselben Definitionen."
  - q: "Muss der Betriebsrat bei der Einführung von Field Service mitreden?"
    a: "In Deutschland in der Regel ja. Nach § 87 BetrVG bestimmt er bei technischen Einrichtungen mit, die Verhalten oder Leistung überwachen können, und Standortübermittlung, Stundenzettel und Spracheingabe berühren das. Holen Sie ihn vor der ersten Welle dazu, nicht erst, wenn die App auf den Geräten ist."
draft: false
---

KI-Agenten in Salesforce Field Service tragen heute bei einer Handvoll Aufgaben: Termine buchen, Wartung aus Wartungsplänen einplanen, Techniker vor dem Einsatz briefen und den Einsatzbericht vorformulieren. Für einen Maschinenbauer würde ich mit der Wartungsbuchung und dem Einsatzbericht beginnen, weil beide häufig sind und bekannten Regeln folgen. Störungsanrufe, Fehlersuche und Ersatzteile brauchen zuerst Triage-Regeln, gepflegte Handbücher und As-built-Daten. Ein KI-Assistent kann eine erste Konfiguration bauen, die trotzdem über Git läuft. Die Einführung erfolgt in Wellen nach Region oder Land, mit dem Betriebsrat vor der ersten Welle. Den Erfolg zeigen sechs Kennzahlen, gemessen gegen eine Ausgangsbasis aus dem Altsystem.

## Welche Field-Service-Agenten tragen heute, und was kosten sie?

Salesforce verkauft Field Service heute als [Field Service and Operations](https://www.salesforce.com/de/products/field-service/pricing/). Die Agenten bedienen drei Gruppen. Kunden buchen, verschieben und stornieren Termine über einen Agenten und bekommen proaktive Wartungsangebote auf Basis der Termine aus dem Wartungsplan. Disponenten bekommen einen Assistenten, der Lücken nach Absagen füllt. Techniker bekommen vor dem Einsatz einen Pre-Work Brief, danach eine vorformulierte Post-Work Summary und vor Ort eine Fehlersuche Schritt für Schritt. Salesforce hat diese Funktionen im [April 2025](https://www.salesforce.com/news/stories/agentforce-for-field-service-announcement/) angekündigt. Den Status je Funktion finden Sie in [KI-Agenten im Außendienst: Was Field Service heute kann](../../../blog/ki-agenten-aussendienst-field-service/).

Der Preis folgt der Linie zwischen Kunden und Mitarbeitenden:

| Einsatz des Agenten | Preismodell | Listenpreis, Oktober 2026 |
|---|---|---|
| Kundenseitig, etwa der Scheduling Agent | Flex Credits pro Aktion | 20 Credits pro Aktion, 30 pro Sprachaktion |
| Funktionen für Disponenten und Techniker | Add-on Agentforce for Field Service and Operations | 125 Dollar pro Nutzer und Monat (die deutsche Preisseite nennt Add-ons nur in Dollar) |
| Alles für Mitarbeitende plus Credits | Agentforce 1 Field Service | 650 € pro Nutzer und Monat, 1 Million Flex Credits und 2,5 Millionen Data-Cloud-Credits pro Org und Jahr |

Die Credit-Sätze stammen aus der [Flex-Credits-Rate-Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) vom 31. August 2026. Bei [500 € je 100.000 Credits](https://www.salesforce.com/eu/agentforce/pricing/) kostet eine Aktion 0,10 €. Ein Buchungsagent kostet also Cent pro Buchung, das Add-on für 60 Techniker dagegen 90.000 Dollar im Jahr. Wann sich das Paket gegenüber einzelnen Add-ons rechnet, steht in [Kapitel 1](../field-service-lohnt-sich-lizenzen/), wie Sie Credits pro Prozess schätzen, im KI-Kapitel [KI-Kosten in Salesforce: Token, Flex Credits, Budget](../../ki-salesforce/kosten-und-token/).

Meine Reihenfolge für einen Maschinenbauer: zuerst die Wartungsbuchung, weil Wartungspläne die Arbeitsaufträge ohnehin erzeugen und der Agent nur noch einen Termin abstimmt. Die Schwachstelle ist das Stillstandsfenster beim Kunden. Ist keines gepflegt, schlägt der Agent Termine vor und übergibt an die Disposition. Danach kommt der vorformulierte Einsatzbericht, und zwar erst, wenn Teile, Arbeitszeit und Fehlercodes strukturierte Felder bleiben. Garantie, Abrechnung und ERP können keinen Fließtext lesen. Wo Field Service unter den übrigen Agenten in einem Fertigungsunternehmen steht, zeigt das KI-Kapitel [KI-Agenten in der Fertigung](../../ki-salesforce/ki-agenten-in-der-fertigung/).

## Wie sollte ein Sprachagent die Störungshotline bedienen?

Für eine Hotline auf Deutsch zählen zwei Ankündigungen:

| Funktion | Was sie tut | Stand Oktober 2026 |
|---|---|---|
| Agentforce Voice auf Deutsch | Deutsch ist eine von sechs neuen Sprachen | GA laut [Dreamforce-Ankündigungen 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/) |
| Autonomous Scheduling mit Agentforce Voice | Sprachagenten prüfen die Verfügbarkeit und finden einen Techniker im richtigen Gebiet, während der Kunde am Telefon ist | in den [Winter-'27-Highlights](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center) ohne Status, Verfügbarkeit in Ihrer Org prüfen |

Ein Störungsanruf ist schwerer als ein Buchungsanruf: Vier Fakten entscheiden über den nächsten Schritt, welche Maschine, ob sie steht, was der Vertrag zusagt und ob jemand gefährdet ist. Ich würde dem Sprachagenten zuerst Annahme und Triage übertragen. Er erkennt Anrufer und Maschine über Rufnummer, Kontakt und installierte Assets, stellt eine geschlossene Frage zum Maschinenzustand und prüft das Entitlement. Einen Techniker bucht er nur selbst, wenn die Maschine noch läuft, das Entitlement den Einsatz deckt und die Fehlerklasse bekannt ist. Eine stehende Presse mit vier Stunden Reaktionszeit geht an die Disposition, die einen Techniker von einem anderen Einsatz abziehen kann.

```hinweis tipp
Diese Schranken gehören in deterministische Logik, nicht in den Prompt. Ich würde außerhalb der Geschäftszeiten nur mit Triage starten und die Buchung für die eindeutigen Fälle erst nach vier Wochen Vergleich mit dem Bereitschaftstechniker einschalten.
```

Die Regeltabelle, die Muster in Agent Script und die Kosten eines Anrufs in Sprachaktionen oder Sprachminuten stehen in [Störungshotline mit Agentforce Voice: erst die Triage](../../../blog/stoerungshotline-agentforce-voice-deutsch/).

## Agenten für Fehlersuche und Ersatzteile brauchen zuerst Ihre Daten

Beide Agenten hängen an Dokumenten und Stücklisten, die nur der Hersteller in Ordnung bringen kann.

### Handbücher mit den Schlüsseln des Assets

Laut der Ankündigung vom April 2025 liest der Agent für die Fehlersuche Produkthandbücher, ähnliche Reparaturen und Sensordaten und führt den Techniker Schritt für Schritt. Er findet Text, der zur Frage passt. Variante A und Variante B unterscheidet er nur, wenn das Dokument diese Information als Daten trägt. Jedes Handbuch, jedes Service-Bulletin und jeder Knowledge-Artikel braucht deshalb den Produktschlüssel, den das Asset schon trägt, und einen Seriennummernbereich, wenn ein Bulletin nur für einen Teil der Maschinen gilt. Im Index liegt eine gültige Fassung je Variante und Baustand. Die Attribute und wann eine Data Library reicht, stehen in [KI-Fehlersuche im Außendienst: erst die Handbücher](../../../blog/ki-fehlersuche-handbuecher-aussendienst/).

### Ersatzteile per Seriennummer

Ein Agent nennt das richtige Ersatzteil zu einer Seriennummer nur, wenn eines Ihrer Systeme diese Frage schon nach Regeln beantwortet. Die Daten kommen aus drei Quellen: die As-built-Stückliste aus dem PLM, Material, Verfügbarkeit und Preis aus dem ERP, die installierte Basis mit Servicehistorie aus den Salesforce-Assets.

```ablauf
sf: Salesforce-Assets, Ersatzteilagent
erp: Material und Preis
ext: PLM-Stückliste
PLM-Stückliste --As-built--> Ersatzteilagent
Material und Preis --Verfügbarkeit--> Ersatzteilagent
Salesforce-Assets --Servicehistorie--> Ersatzteilagent
```

Der Agent versteht die Frage, grenzt sie auf eine Baugruppe ein und zeigt das Ergebnis. Eine Teilenummer wählt er nie selbst. Ob Sie Stücklisten nach Salesforce kopieren oder das PLM live abfragen und was Händler sehen dürfen, steht in [Ersatzteile per Seriennummer: Kann ein KI-Agent das?](../../../blog/ersatzteile-seriennummer-ki-agent/). Die Asset-Hierarchie dahinter behandelt [Kapitel 4](../field-service-assets-wartung-teile/).

## Was darf ein KI-Assistent einrichten?

Salesforce bietet inzwischen eine Einrichtung von Field Service ohne Setup-Masken an, Headless Setup genannt. Laut der [Trailhead-Einheit](https://trailhead.salesforce.com/content/learn/modules/headless-360-use-cases-in-action/set-up-field-service-headlessly) liest ein KI-Assistent wie Gemini, Claude oder Slackbot Ihre Website, stellt Rückfragen und schlägt einen Umsetzungsplan vor. Headless Skills in drei Stufen, Orchestrierung, Konfiguration und Feature, legen danach Gebiete, Betriebszeiten, Arbeitstypen, Skill-Anforderungen und Scheduling Policies an, dazu Branding der App, Pre-Work Briefs und Data-Capture-Formulare. Nichts ist endgültig, bevor Sie den Plan freigeben.

Der Assistent baut den Rahmen gut und den Inhalt schlecht. Er kennt Ihre öffentliche Website. Er weiß nicht, welcher Techniker welchen Skill hat, wann welcher Kunde Besuche zulässt und welches Lager welche Region versorgt. Ein Gebietsvorschlag aus der Website folgt den Vertriebsbüros, der richtige Zuschnitt folgt Lagern und Fahrzeiten. Wie der Assistent über MCP und APIs auf Salesforce zugreift, erklärt das KI-Kapitel [MCP und Salesforce-Schnittstellen für KI-Agenten](../../ki-salesforce/mcp-und-schnittstellen/).

Zwei Regeln würde ich nicht aufweichen:

| Regel | Warum |
|---|---|
| Prüfen Sie den Plan Abschnitt für Abschnitt mit Serviceleitung und Leitung der Disposition, bevor jemand ihn freigibt. | Der Assistent kennt Ihre Website, aber nicht Skills, Besuchszeiten und Lager. |
| Lassen Sie ihn in einer Sandbox laufen. | Das meiste, was der Assistent anlegt, sind Konfigurationsdatensätze, die ein Metadaten-Deployment nicht mitnimmt, wie das DevOps-Kapitel [Daten und Konfiguration in der Pipeline](../../devops-release-management/daten-und-konfiguration/) zeigt, und die Einrichtung lädt Beispieltermine. Flows kommen in einen Branch, Datensätze in einen Daten-Workspace, beides geht über die Pipeline in Produktion. |

Die Prüftabelle je Planabschnitt steht in [Field Service per KI-Assistent einrichten: Was prüfen?](../../../blog/field-service-einrichtung-ki-assistent/).

## Field Service kommt in Wellen nach Region oder Land

Ich empfehle, Field Service in Wellen einzuführen, Region für Region oder Land für Land. Jede Welle bringt ihre eigenen Stammdaten, Disponenten, Techniker und Partner mit, und die erste Welle testet alles, worauf die späteren bauen. Fehlen Skills oder Besuchszeiten, trifft das ein Gebiet und nicht den ganzen Außendienst.

Der Betriebsrat gehört in die Planung der ersten Welle. In Deutschland hat er nach [§ 87 BetrVG](https://www.gesetze-im-internet.de/betrvg/__87.html) ein Mitbestimmungsrecht bei technischen Einrichtungen, die Verhalten oder Leistung überwachen können. Field Service berührt das mit Stundenzetteln, mit der Standortübermittlung der App und mit Spracheingabe. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?language=en_US&id=service.mfs_resource_tracking.htm&type=5) lassen sich Intervall und Genauigkeit der Standortübermittlung einstellen und einzelne Techniker ausnehmen. Genau diese Einstellungen verhandeln Sie, bei Bedarf pro Land. Inhalt einer Welle und die Tabelle der Einstellungen stehen in [Salesforce Field Service Einführung: Warum in Wellen?](../../../blog/salesforce-field-service-einfuehrung/). Die Release-Pipeline, die die Konfiguration jeder Welle transportiert, sollte vor der ersten Welle stehen; wie Sie dorthin kommen, zeigt das DevOps-Kapitel [Fahrplan und Messung](../../devops-release-management/einfuehrung-fahrplan/).

Agenten passen in dieselben Wellen. Ich würde einen Agenten in einer Region einschalten, die schon einige Monate live ist. So lässt sich seine Wirkung von der Wirkung von Field Service selbst trennen.

## Welche Kennzahlen zählen nach dem Go-live?

Field Service muss die Zahlen aus dem Business Case bewegen. Ich verfolge sechs pro Region und Monat: Einsätze pro Techniker und Tag, Fahrzeitanteil, Erstlösungsquote, eingehaltene Reaktionszeiten, Ankunft im zugesagten Zeitfenster und den Anteil der Vorschläge, den die Disposition vor der Freigabe ändert. Die letzte Zahl ist in den ersten Monaten die nützlichste, weil sie zeigt, ob Daten und Scheduling Policy passen.

Salesforce bietet zwei fertige Ansichten. Laut [Salesforce-Blog vom September 2025](https://www.salesforce.com/blog/how-to-transform-field-service-operations-with-agentic-analytics/) zeigt Operations Home 12 Kennzahlen, darunter Erstlösungsquote, Auslastung, Einsatzdauer und Stillstandszeit der Assets, und Field Service Intelligence hat fünf Dashboards mit mehr als 30 Kennzahlen. Der Blog nennt Tableau Next, Data Cloud und Agentforce als Basis, und die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=service.ifs_intro.htm&language=en_US&type=5) beschreibt Field Service Intelligence als Paket aus Data 360, CRM Analytics und Agentforce Service. Für die erste Welle decken Standardberichte auf Terminen und Arbeitsaufträgen die Zahlen aus dem Business Case ab.

```hinweis offen
Die Preisseite führt Operations Home und Field Service Intelligence mit Einträgen "Available for Purchase" und enthält Tableau Next nur in Agentforce 1 Field Service. Lassen Sie sich deshalb schriftlich bestätigen, welche Positionen Sie brauchen.
```

Legen Sie vor jedem Dashboard schriftlich fest, wie jede Kennzahl definiert ist. Die Erstlösungsquote braucht ein Zeitfenster, einen Bezug wie dasselbe Asset, eine Regel zu Fehlercodes und eine Liste geplanter Folgeeinsätze, die nicht zählen. Dann messen Sie drei Monate lang eine Ausgangsbasis im Altsystem, mit denselben Definitionen. Die Kennzahlentabelle und die fünf Entscheidungen zur Definition stehen in [Field Service Kennzahlen nach dem Go-live: Was messen?](../../../blog/field-service-kennzahlen-operations-home/).

## Wer verantwortet Field Service nach dem Go-live?

Scheduling Policies, Gebiete, Arbeitstypen und Betriebszeiten sind Datensätze, die jeden Monat jemand anpasst. Die App bekommt neben den drei Plattform-Releases eigene Versionen, wie in [Kapitel 3](../field-service-mobile-app-dokumente/) beschrieben. Und Agenten brauchen gepflegte Prompts, Aktionen und Testfälle. Ich würde die Verantwortlichen vor der ersten Welle benennen:

| Rolle | Verantwortet |
|---|---|
| Serviceleitung | Definitionen der Kennzahlen und der monatliche Termin pro Region, 30 Minuten mit sechs Zahlen und einer Entscheidung. |
| Leitung der Disposition | Scheduling Policies, Gebiete und die Gründe, warum Vorschläge geändert werden, wie in [Kapitel 2](../field-service-terminplanung-disposition/). |
| Release-Manager | Plattform-Releases, App-Versionen und Konfigurationsdatensätze über die Pipeline. |
| Product Owner für Agenten | Triage-Regeln, Buchungsschranken und der Testbestand aus echten Anrufen und Fehlern. |
| IT | Schnittstellen zu ERP und PLM, Monitoring und Backup, wie im DevOps-Kapitel [Monitoring und Backup nach dem Go-live](../../devops-release-management/betrieb-monitoring-backup/) beschrieben. |

## Rechenbeispiel: drei Wellen in neun Monaten

Angenommen ist ein Komponentenhersteller mit 90 Technikern in drei Regionen, SAP als ERP und Field Service in drei Wellen über neun Monate. Alle Zahlen sind Annahmen, sie zeigen die Reihenfolge der Entscheidungen.

```schritte
Vor der ersten Welle
  Sechs Kennzahlen definiert, drei Monate Ausgangsbasis aus SAP-Serviceaufträgen und Stundenzetteln, Vereinbarung mit dem Betriebsrat zur Standortübermittlung mit grober Genauigkeit und festem Intervall.
Region eins mit 30 Technikern | Monate 1 bis 3
  Keine Agenten. Die Disposition ändert im ersten Monat 40 Prozent der Vorschläge, meist wegen fehlender Zugangszeiten der Kunden. Das Team pflegt sie vor der zweiten Welle nach.
Region zwei | Monate 4 bis 6
  Region eins bekommt den Agenten für die Wartungsbuchung. Angenommen werden 250 geplante Einsätze im Monat mit je fünf Aktionen: 25.000 Credits, etwa 125 € im Monat zum Listenpreis. Stillstandsfenster gibt es für zwei Drittel der Kunden, der Rest bleibt bei der Disposition.
Region drei in einem anderen Land | Monate 7 bis 9
  Eigene Prüfung der örtlichen Mitbestimmungsregeln, bevor Termine feststehen. Region eins bekommt nachts einen Sprachagenten auf der Hotline, nur für die Triage.
```

Die Fehlersuche wartet, bis die Handbücher den Produktschlüssel des Assets tragen, der Ersatzteilagent, bis das PLM As-built-Stücklisten über eine API liefert. Der monatliche Kennzahlentermin entscheidet, wo der nächste Agent hinkommt.

## Den ersten Agenten mit einem messbaren Ziel auswählen

| Entscheidung | Was dazugehört |
|---|---|
| Erster Agent | Mit einem messbaren Ziel wie dem Anteil der Wartungseinsätze, die ohne Disposition gebucht werden. |
| Add-on oder Agentforce 1 Field Service | Eine Lizenzfrage, die ich in [Make-or-Buy und Lizenzplanung](../../../leistungen/make-or-buy-lizenzen/) kläre. |
| Reihenfolge der Wellen | Mit dem Zeitpunkt für den Betriebsrat je Land. |
| Definitionen der Kennzahlen und Ausgangsbasis | Vor dem Go-live. |
| Verantwortliche | Dazu die Regel, dass KI-gebaute Konfiguration nur über die Pipeline in Produktion kommt, wie in meiner Arbeit zu [DevOps und Release-Management](../../../leistungen/devops-und-release-management/). |

Legen Sie diese Punkte schriftlich fest, bevor die erste Region plant. Mit diesem Kapitel endet die Masterclass; Assets und Teile stehen in [Kapitel 4](../field-service-assets-wartung-teile/), alle Kapitel auf der [Übersichtsseite](../).
