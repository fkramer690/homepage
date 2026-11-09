---
title: "Dubletten in Salesforce: Stammdaten vor der KI bereinigen"
description: "Wie Hersteller Dubletten bei Accounts, Kontakten und Anlagen in Salesforce finden, bereinigen und verhindern, bevor ein KI-Agent mit den Daten arbeitet."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: salesforce-dubletten-stammdaten-bereinigen
translationKey: duplicates-master-data-cleanup
topic: data
categories: [architecture, ai]
contactBrief: architecture
tags: [Datenqualität, Dubletten, Stammdaten, Agentforce]
takeaways:
  - "Dubletten entstehen bei Herstellern meist an Schnittstellen und Ländergrenzen, etwa durch mehrfache ERP-Importe oder pro Land neu angelegte Kunden."
  - "Vor dem Bereinigen steht die Frage nach dem führenden System und einem eindeutigen Schlüssel, etwa Quellsystem plus Kunden- oder Seriennummer."
  - "Salesforce bringt Matching Rules und Duplicate Rules mit. Sie verhindern neue Dubletten, bereinigen aber keine alten."
  - "Erhält ein Agent zwei plausible Accounts ohne eindeutige Auswahlregel, kann er den falschen nutzen. Deshalb kommt die Bereinigung zuerst."
faq:
  - q: "Wie finde ich Dubletten in Salesforce?"
    a: "In Performance und Unlimited Edition mit Duplicate Jobs, die vorhandene Accounts, Kontakte und Leads anhand einer Matching Rule durchsuchen. Duplicate Reports zeigen sonst nur, was Duplicate Rules beim Speichern protokolliert haben. In anderen Editionen oder bei Objekten wie Anlagen exportieren Sie die Daten und analysieren sie außerhalb oder nutzen ein spezialisiertes Werkzeug."
  - q: "Was ist der Unterschied zwischen Matching Rule und Duplicate Rule?"
    a: "Die Matching Rule legt fest, welche Felder verglichen werden. Die Duplicate Rule legt fest, was beim Speichern einer möglichen Dublette passiert: warnen, blockieren oder nur berichten."
  - q: "Wie verhindere ich Dubletten aus der ERP-Schnittstelle?"
    a: "Mit einer stabilen External ID, etwa aus Quellsystem plus ERP-Kundennummer, die als eindeutig markiert ist, und einem Upsert statt eines Inserts. Dann aktualisiert die Schnittstelle den vorhandenen Datensatz. Datensätze ohne Schlüssel sollten abgewiesen und neu angelegte Datensätze überwacht werden."
  - q: "Warum sind Dubletten für KI-Agenten ein Problem?"
    a: "Liefert eine Agentenaktion mehrere plausible Kunden oder Anlagen und gibt es keine eindeutige Auswahlregel, kann der Agent mit dem falschen Datensatz arbeiten. Er nennt womöglich den falschen Vertrag, den falschen Händler oder die falsche Servicehistorie."
draft: false
---

Dubletten in Salesforce bereinigen Hersteller am besten in einer festen Reihenfolge: zuerst messen, dann das führende System und einen eindeutigen Schlüssel pro Objekt festlegen, dann zusammenführen und erst danach neue Dubletten verhindern. Bei Accounts ist der Schlüssel meist die ERP-Kundennummer plus Quellsystem, wo das nötig ist, bei Anlagen die Seriennummer. Salesforce bringt mit Matching Rules und Duplicate Rules Werkzeuge mit, die neue Dubletten beim Speichern abfangen. Alte Dubletten räumen sie nicht auf. Diese Arbeit gehört vor jeden KI-Agenten, denn ein Agent kann bei zwei plausiblen Accounts ohne klare Auswahlregel den falschen genauso sicher wählen wie den richtigen.

## Woher kommen Dubletten bei Herstellern?

Dubletten entstehen selten, weil jemand schlampig arbeitet. Bei Herstellern sehe ich vor allem diese Ursachen:

- **Schnittstellen, die anlegen statt aktualisieren.** Ein ERP-Import legt einen Kunden neu an, wenn er den vorhandenen nicht findet, etwa weil sich die Schreibweise geändert hat.
- **Länder und Gesellschaften.** Ein Konzernkunde kauft in drei Ländern, und jede Vertriebsgesellschaft legt ihn selbst an, einmal mit „GmbH“, einmal mit „AG“, einmal unter dem Namen der Tochter.
- **Händler und Endkunden.** Ein Endkunde kommt über zwei Händler und taucht zweimal auf, jeweils unter dem Händler.
- **Anlagen ohne eindeutige Kennung.** Seriennummern werden mit und ohne Präfix erfasst, oder Ersatzmaschinen bekommen die Nummer der alten.
- **Portale.** Kontakte registrieren sich selbst und legen dabei einen neuen Kontakt an, statt sich mit dem vorhandenen zu verbinden. Die Duplicate Rules von Salesforce greifen nicht bei der Selbstregistrierung in Experience Cloud, deshalb braucht der Registrierungsprozess einen eigenen Kontaktabgleich.

```praxis
In meinen Field-Service-Projekten kam die installierte Basis aus dem ERP, und die Datenqualität der Assets war einer der Stolpersteine. Eine Anlage, die zweimal existiert, hat zwei halbe Servicehistorien, und der Techniker sieht vor Ort nur eine davon.
```

Wie die installierte Basis aufgebaut sein sollte, beschreibe ich in [Asset-Hierarchie im Field Service](../field-service-asset-hierarchie-maschinen/) und in [Field Service Stammdaten](../salesforce-field-service-stammdaten/).

## Warum kommt die Bereinigung vor dem KI-Agenten?

Ein Mensch, der zwei ähnliche Accounts sieht, wird stutzig und fragt nach. Ein Agent tut, was seine Aktionen und Anweisungen erlauben: Liefert eine Suche zwei plausible Treffer und entscheidet nichts zwischen ihnen, nennt er womöglich den falschen Vertrag, schickt das Angebot an den falschen Ansprechpartner oder prüft eine Garantie gegen die falsche Anlage. Er tut das in einem überzeugenden Ton, und genau das macht den Fehler teuer. Neben der Bereinigung sollten Agentenaktionen präzise filtern, stabile Datensatz-IDs übergeben und bei mehreren Treffern nachfragen. Business Value und Datenqualität stehen deshalb bei mir vor jedem Agenten, siehe [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/).

## Wie bereinigen Sie Dubletten Schritt für Schritt?

```schritte
Messen | 1 bis 2 Wochen · Kunde
  In Performance und Unlimited Edition Duplicate Jobs für Accounts und Kontakte ausführen; sonst und für Anlagen exportieren und außerhalb von Salesforce analysieren. Betroffene Datensätze und Dublettengruppen pro Objekt, Land und Quelle zählen. Das ist der Ausgangswert.
Führendes System und Schlüssel | vor dem Bereinigen · Architekt und Fachbereich
  Pro Objekt festlegen, welches System führt und welches Feld den Datensatz eindeutig macht, etwa ERP-Kundennummer oder Seriennummer.
Zusammenführen | je nach Menge · Fachbereich pro Land
  Paare prüfen und zusammenführen, die wichtigsten Kunden zuerst. Was im ERP doppelt ist, wird dort bereinigt, nicht nur in Salesforce.
Verhindern | parallel · Partner
  Duplicate Rules aktivieren, Schnittstellen auf Upsert mit eindeutiger External ID umstellen, Kontaktabgleich in die Portalregistrierung einbauen.
Pflegen | dauerhaft · Datenverantwortliche
  Monatlicher Bericht über neue mögliche Dubletten mit einem Verantwortlichen pro Land.
```

Der zweite Schritt ist der wichtigste und wird am häufigsten übersprungen. Wer zusammenführt, ohne zu wissen, welches System führt, führt in Salesforce zusammen, was das ERP beim nächsten Import wieder trennt.

Beim Zusammenführen wählen Sie einen Hauptdatensatz, und Salesforce hängt die meisten verknüpften Datensätze wie Kontakte, Opportunities und Cases an ihn um. Es gibt Ausnahmen und Voraussetzungen, etwa bei Partner-Accounts, Experience-Cloud-Benutzern, Account Teams und Gebieten. In der Oberfläche gehen höchstens drei Datensätze auf einmal. Bei Hunderten von Paaren braucht es ein Werkzeug oder ein Skript, Testzusammenführungen und davor eine Sicherung.

## Matching Rules und Duplicate Rules verhindern neue Dubletten, bereinigen aber keine alten

Salesforce trennt zwei Dinge ([Salesforce Help: Duplicate Management](https://help.salesforce.com/s/articleView?id=sf.managing_duplicates_overview.htm&language=en_US&type=5)):

| Regel | Aufgabe | Wichtige Grenzen |
|---|---|---|
| Matching Rule | legt fest, welche Felder wie verglichen werden, exakt oder unscharf | Standardregeln für Accounts, Kontakte und Leads; höchstens 5 aktive pro Objekt |
| Duplicate Rule | legt fest, was beim Speichern einer möglichen Dublette passiert: warnen, blockieren, berichten | höchstens 5 aktive pro Objekt |
| Duplicate Job | durchsucht vorhandene Accounts, Kontakte und Leads in einem Lauf | nur Performance und Unlimited Edition |

Bei Anlagen würde ich mich nicht auf Matching Rules verlassen: Eine eindeutige External ID aus Seriennummer und Produkt, die in der Schnittstelle geprüft wird, ist die verlässliche Kontrolle. Unscharfe Vergleiche unterstützen nur lateinische Zeichen. Verwenden Sie für internationale Daten deshalb exakte Vergleiche auf normalisierten Feldern wie Umsatzsteuer-ID oder Ländercodes. Duplicate Rules greifen auch bei Schnittstellen. Blockiert eine Regel, schlägt der Import fehl, statt eine Dublette anzulegen. Das ist richtig, braucht aber eine Fehlerbehandlung, die jemand liest.

```hinweis tipp
Starten Sie Duplicate Rules mit der Aktion „Warnen“ und einem Bericht. Nach zwei bis drei Wochen sehen Sie, ob die Matching Rule zu viele falsche Treffer liefert. Erst dann stellen Sie auf „Blockieren“ um. Testen Sie jeden Kanal einzeln: In der Oberfläche ist eine Warnung eine Meldung, während Importe und API-Aufrufe mit DUPLICATES_DETECTED fehlschlagen können.
```

## Ein Upsert über eine eindeutige External ID hält ERP-Dubletten fern

Die wirksamste Maßnahme liegt in der Schnittstelle. Jeder Datensatz aus dem ERP trägt dessen Schlüssel in einem External-ID-Feld, und die Schnittstelle schreibt per Upsert: Gibt es den Schlüssel schon, wird aktualisiert, sonst angelegt. Markieren Sie das Feld als eindeutig, weisen Sie Datensätze ohne Schlüssel ab und überwachen Sie neu angelegte Datensätze. Dann erzeugt ein Import keine Dublette mehr, nur weil sich ein Name anders schreibt. Ein Upsert kann nicht entscheiden, ob zwei verschiedene ERP-Schlüssel für denselben Kunden stehen. Das bleibt eine fachliche Entscheidung. Welches System welche Daten führt, gehört in die Integrationsarchitektur, die ich unter [Integration mit ERP, Middleware und Telefonie](../../leistungen/salesforce-schnittstellen/) beschreibe.

## Wer ist für die Datenqualität verantwortlich?

Der Fachbereich verantwortet die Datenqualität: Er entscheidet, was als derselbe Kunde gilt und welcher Datensatz der führende Datensatz ist. IT und Architektur verantworten Schlüsselmodell, Integrationslogik, Validierung und Überwachung, und interne Teams oder Partner setzen sie um. Der Partner kann Regeln bauen und Schnittstellen umstellen, aber er kann nicht entscheiden, ob „Muster Maschinenbau GmbH“ und „Muster Maschinenbau AG“ derselbe Kunde sind. Das weiß der Vertrieb im jeweiligen Land.

Ich empfehle deshalb pro Land und pro Objekt eine verantwortliche Person auf Kundenseite. Sie bekommt den monatlichen Bericht über neue mögliche Dubletten, entscheidet über das Zusammenführen und meldet, wenn eine Schnittstelle immer wieder dieselben Fehler erzeugt. Für die installierte Basis ist das oft der Serviceinnendienst, weil er die Anlagen am besten kennt. Ohne diese Rolle beginnt die Bereinigung nach einem Jahr von vorn.

## Die 100 wichtigsten Kunden prüfen

Exportieren Sie Ihre hundert wichtigsten Kunden mit Name, Website, Adresse und ERP-Schlüssel und suchen Sie nach demselben Unternehmen unter verschiedenen Datensätzen. In Performance oder Unlimited Edition erledigt ein Duplicate Job für Accounts dasselbe in größerem Maßstab. So sehen Sie innerhalb eines Tages, wie es um Ihre Daten steht. Die Standard-Matching-Rule für Accounts benötigt womöglich Ort oder Postleitzahl, um zwei Accounts mit demselben Namen zu markieren. Eigene Kriterien wie die ERP-Kundennummer ergänzen Sie, sobald der Schlüssel feststeht. Danach legen Sie pro Objekt das führende System und den Schlüssel fest und stellen die Schnittstelle auf Upsert um, bevor Sie mit dem Zusammenführen beginnen.
