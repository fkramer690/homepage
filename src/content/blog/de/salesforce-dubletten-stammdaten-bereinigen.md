---
title: "Dubletten in Salesforce: Stammdaten vor der KI bereinigen"
description: "Wie Hersteller Dubletten bei Accounts, Kontakten und Anlagen in Salesforce finden, bereinigen und verhindern, bevor ein KI-Agent mit den Daten arbeitet."
pubDate: 2026-10-29
lang: de
slug: salesforce-dubletten-stammdaten-bereinigen
translationKey: duplicates-master-data-cleanup
topic: data
categories: [architecture, ai]
contactBrief: architecture
tags: [Datenqualität, Dubletten, Stammdaten, Agentforce]
takeaways:
  - "Dubletten entstehen bei Herstellern meist an Schnittstellen und Ländergrenzen, etwa durch mehrfache ERP-Importe oder pro Land neu angelegte Kunden."
  - "Vor dem Bereinigen steht die Frage, welches System den Datensatz führt und welcher Schlüssel ihn eindeutig macht, etwa ERP-Kundennummer oder Seriennummer."
  - "Salesforce bringt Matching Rules und Duplicate Rules mit. Sie verhindern neue Dubletten, bereinigen aber keine alten."
  - "Ein KI-Agent wählt bei zwei gleichen Accounts den falschen genauso sicher wie den richtigen. Deshalb kommt die Bereinigung vor dem Agenten."
faq:
  - q: "Wie finde ich Dubletten in Salesforce?"
    a: "Mit Matching Rules, die festlegen, wann zwei Datensätze als gleich gelten, und einem Bericht über die gefundenen Paare. Duplicate Jobs durchsuchen den Bestand in einem Lauf, sind aber nur in Performance und Unlimited Edition enthalten."
  - q: "Was ist der Unterschied zwischen Matching Rule und Duplicate Rule?"
    a: "Die Matching Rule legt fest, welche Felder verglichen werden. Die Duplicate Rule legt fest, was beim Speichern einer möglichen Dublette passiert: warnen, blockieren oder nur berichten."
  - q: "Wie verhindere ich Dubletten aus der ERP-Schnittstelle?"
    a: "Mit einer External ID, etwa der ERP-Kundennummer, und einem Upsert statt eines Inserts. Dann aktualisiert die Schnittstelle den vorhandenen Datensatz, statt einen neuen anzulegen."
  - q: "Warum sind Dubletten für KI-Agenten ein Problem?"
    a: "Ein Agent sucht einen Kunden oder eine Anlage und arbeitet mit dem ersten Treffer. Gibt es zwei, nennt er womöglich den falschen Vertrag, den falschen Händler oder die falsche Servicehistorie."
draft: false
---

Dubletten in Salesforce bereinigen Hersteller am besten in einer festen Reihenfolge: zuerst messen, dann das führende System und einen eindeutigen Schlüssel pro Objekt festlegen, dann zusammenführen und erst danach neue Dubletten verhindern. Bei Accounts ist der Schlüssel meist die ERP-Kundennummer, bei Anlagen die Seriennummer. Salesforce bringt mit Matching Rules und Duplicate Rules Werkzeuge mit, die neue Dubletten beim Speichern abfangen. Alte Dubletten räumen sie nicht auf. Diese Arbeit gehört vor jeden KI-Agenten, denn ein Agent wählt bei zwei gleichen Accounts den falschen genauso sicher wie den richtigen.

## Woher kommen Dubletten bei Herstellern?

Dubletten entstehen selten, weil jemand schlampig arbeitet. Bei Herstellern sehe ich vor allem diese Ursachen:

- **Schnittstellen, die anlegen statt aktualisieren.** Ein ERP-Import legt einen Kunden neu an, wenn er den vorhandenen nicht findet, etwa weil sich die Schreibweise geändert hat.
- **Länder und Gesellschaften.** Ein Konzernkunde kauft in drei Ländern, und jede Vertriebsgesellschaft legt ihn selbst an, einmal mit „GmbH“, einmal mit „AG“, einmal unter dem Namen der Tochter.
- **Händler und Endkunden.** Ein Endkunde kommt über zwei Händler und taucht zweimal auf, jeweils unter dem Händler.
- **Anlagen ohne eindeutige Kennung.** Seriennummern werden mit und ohne Präfix erfasst, oder Ersatzmaschinen bekommen die Nummer der alten.
- **Portale.** Kontakte registrieren sich selbst und legen dabei einen neuen Kontakt an, statt sich mit dem vorhandenen zu verbinden.

```praxis
In meinen Field-Service-Projekten kam die installierte Basis aus dem ERP, und die Datenqualität der Assets war einer der Stolpersteine. Eine Anlage, die zweimal existiert, hat zwei halbe Servicehistorien, und der Techniker sieht vor Ort nur eine davon.
```

Wie die installierte Basis aufgebaut sein sollte, beschreibe ich in [Asset-Hierarchie im Field Service](../field-service-asset-hierarchie-maschinen/) und in [Field Service Stammdaten](../salesforce-field-service-stammdaten/).

## Warum kommt die Bereinigung vor dem KI-Agenten?

Ein Mensch, der zwei ähnliche Accounts sieht, wird stutzig und fragt nach. Ein Agent sucht den Kunden, nimmt den passenden Treffer und arbeitet damit weiter. Gibt es zwei Treffer, nennt er womöglich den falschen Vertrag, schickt das Angebot an den falschen Ansprechpartner oder prüft eine Garantie gegen die falsche Anlage. Er tut das in einem überzeugenden Ton, und genau das macht den Fehler teuer. Business Value und Datenqualität stehen deshalb bei mir vor jedem Agenten, siehe [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/).

## Wie bereinigen Sie Dubletten Schritt für Schritt?

```schritte
Messen | 1 bis 2 Wochen · Kunde
  Matching Rules für Accounts, Kontakte und Anlagen anlegen und einen Bericht über mögliche Paare erstellen. Die Zahl ist der Ausgangswert.
Führendes System und Schlüssel | vor dem Bereinigen · Architekt und Fachbereich
  Pro Objekt festlegen, welches System führt und welches Feld den Datensatz eindeutig macht, etwa ERP-Kundennummer oder Seriennummer.
Zusammenführen | je nach Menge · Fachbereich pro Land
  Paare prüfen und zusammenführen, die wichtigsten Kunden zuerst. Was im ERP doppelt ist, wird dort bereinigt, nicht nur in Salesforce.
Verhindern | parallel · Partner
  Duplicate Rules aktivieren, Schnittstellen auf Upsert mit External ID umstellen, Portalregistrierung mit vorhandenen Kontakten abgleichen.
Pflegen | dauerhaft · Datenverantwortliche
  Monatlicher Bericht über neue mögliche Dubletten mit einem Verantwortlichen pro Land.
```

Der zweite Schritt ist der wichtigste und wird am häufigsten übersprungen. Wer zusammenführt, ohne zu wissen, welches System führt, führt in Salesforce zusammen, was das ERP beim nächsten Import wieder trennt.

Beim Zusammenführen wählen Sie einen Hauptdatensatz, und Salesforce hängt die verknüpften Datensätze wie Kontakte, Opportunities und Cases an ihn um. In der Oberfläche gehen höchstens drei Datensätze auf einmal. Bei Hunderten von Paaren braucht es ein Werkzeug oder ein Skript, und davor eine Sicherung.

## Matching Rules und Duplicate Rules verhindern neue Dubletten, bereinigen aber keine alten

Salesforce trennt zwei Dinge ([Salesforce Help: Duplicate Management](https://resources.docs.salesforce.com/224/latest/en-us/sfdc/pdf/salesforce_data_quality_duplicate_prevention.pdf)):

| Regel | Aufgabe | Wichtige Grenzen |
|---|---|---|
| Matching Rule | legt fest, welche Felder wie verglichen werden, exakt oder unscharf | Standardregeln für Accounts, Kontakte und Leads; höchstens 5 aktive pro Objekt |
| Duplicate Rule | legt fest, was beim Speichern einer möglichen Dublette passiert: warnen, blockieren, berichten | höchstens 5 aktive pro Objekt |
| Duplicate Job | durchsucht den vorhandenen Bestand in einem Lauf | nur Performance und Unlimited Edition |

Für Anlagen gibt es keine Standardregel, aber eigene Matching Rules sind möglich, etwa auf Seriennummer und Produkt. Duplicate Rules greifen auch bei Schnittstellen. Blockiert eine Regel, schlägt der Import fehl, statt eine Dublette anzulegen. Das ist richtig, braucht aber eine Fehlerbehandlung, die jemand liest.

```hinweis tipp
Starten Sie Duplicate Rules mit der Aktion „Warnen“ und einem Bericht. Nach zwei bis drei Wochen sehen Sie, ob die Matching Rule zu viele falsche Treffer liefert. Erst dann stellen Sie auf „Blockieren“ um.
```

## Gegen Dubletten aus dem ERP hilft ein Upsert über die External ID

Die wirksamste Maßnahme liegt in der Schnittstelle. Jeder Datensatz aus dem ERP trägt dessen Schlüssel in einem External-ID-Feld, und die Schnittstelle schreibt per Upsert: Gibt es den Schlüssel schon, wird aktualisiert, sonst angelegt. Damit kann ein Import keine Dublette mehr erzeugen, egal wie sich der Name schreibt. Welches System welche Daten führt, gehört in die Integrationsarchitektur, die ich unter [Integration mit ERP, Middleware und Telefonie](../../leistungen/salesforce-schnittstellen/) beschreibe.

## Wer ist für die Datenqualität verantwortlich?

Datenqualität ist eine Aufgabe des Fachbereichs, nicht der IT und nicht des Partners. Der Partner kann Regeln bauen und Schnittstellen umstellen, aber er kann nicht entscheiden, ob „Muster Maschinenbau GmbH“ und „Muster Maschinenbau AG“ derselbe Kunde sind. Das weiß der Vertrieb im jeweiligen Land.

Ich empfehle deshalb pro Land und pro Objekt eine verantwortliche Person auf Kundenseite. Sie bekommt den monatlichen Bericht über neue mögliche Dubletten, entscheidet über das Zusammenführen und meldet, wenn eine Schnittstelle immer wieder dieselben Fehler erzeugt. Für die installierte Basis ist das oft der Serviceinnendienst, weil er die Anlagen am besten kennt. Ohne diese Rolle beginnt die Bereinigung nach einem Jahr von vorn.

## Erster Schritt: eine Matching Rule für die 100 wichtigsten Kunden

Legen Sie eine Matching Rule für Accounts an und lassen Sie den Bericht laufen. Die Zahl der möglichen Paare unter Ihren hundert wichtigsten Kunden zeigt Ihnen in einer Stunde, wie es um Ihre Daten steht. Für den ersten Bericht reicht die Standard-Matching-Rule für Accounts; eigene Kriterien wie die ERP-Kundennummer ergänzen Sie, sobald der Schlüssel feststeht. Danach legen Sie pro Objekt das führende System und den Schlüssel fest und stellen die Schnittstelle auf Upsert um, bevor Sie mit dem Zusammenführen beginnen.
