---
title: "Garantie-Prüfagent aus Winter '27: was vorher stehen muss"
description: "Was der Warranty Claims Adjudication Agent der Manufacturing Cloud ab Winter '27 prüft und welche Anlagendaten, Regeln und Freigaben Sie vorher brauchen."
pubDate: 2026-10-27
lang: de
slug: garantie-pruefagent-winter-27
translationKey: warranty-adjudication-agent-winter-27
topic: ai
category: ai
tags: [Agentforce, Garantie, Manufacturing Cloud, KI-Agenten, Händler, After-Sales]
takeaways:
  - "Laut Salesforce prüft der Warranty Claims Adjudication Agent aus Winter '27 die Deckung von Garantieansprüchen und markiert mögliche Betrugsfälle; Winter '27 ist seit dem 12. Oktober 2026 allgemein verfügbar."
  - "Die Manufacturing Cloud prüft Garantieansprüche schon heute mit Flow, Business Rules Engine und Expression Sets; der Agent sollte um diese Regeln herum arbeiten und die Deckungsentscheidung ihnen überlassen."
  - "Bevor der Agent prüft, braucht jede beanstandete Maschine Seriennummer und Garantiebeginn in Salesforce, bei nutzungsabhängigen Bedingungen auch eine Quelle für Betriebsstunden."
  - "Ansprüche über einer vereinbarten Grenze, jeder Betrugsverdacht, Kulanz und Fälle mit fehlenden Anlagendaten gehören zu einem Menschen, bevor eine Gutschrift entsteht."
  - "In den Quellen, die ich öffnen konnte, hat Salesforce Lizenz, Betrugssignale und Einrichtungsanleitung für diesen Agenten nicht veröffentlicht; klären Sie alle drei vor der Budgetplanung."
faq:
  - q: "Was macht der Warranty Claims Adjudication Agent?"
    a: "Laut Produktseite der Manufacturing Cloud prüft er die Deckung von Garantieansprüchen und markiert mögliche Betrugsfälle, um Entscheidungen zu beschleunigen. Er gehört zum Release Winter '27, das seit dem 12. Oktober 2026 allgemein verfügbar ist."
  - q: "Ersetzt der Agent den Garantiesachbearbeiter?"
    a: "Ich würde das nicht zulassen. Ansprüche über einer vereinbarten Grenze, mit Betrugsverdacht oder mit fehlenden Anlagendaten bleiben bei einem Menschen. Der Agent sortiert und bereitet vor, der Sachbearbeiter gibt das Geld frei."
  - q: "Was muss stehen, bevor ich den Agenten einschalte?"
    a: "Anlagen mit Seriennummer und Garantiebeginn in Salesforce, Garantiebedingungen als gepflegte Regeln, eine vereinbarte Freigabegrenze und ein Händlerportal, dessen Freitextfelder als nicht vertrauenswürdige Eingabe behandelt werden."
  - q: "Was kostet der Agent?"
    a: "Einen eigenen Preis hat Salesforce in den Quellen, die ich öffnen konnte, nicht genannt. Die vorhandenen Garantie-Aktionen von Agentforce for Manufacturing brauchen eine Add-on-Lizenz pro Nutzer, und eine Agentforce-Aktion kostet zum Listenpreis 20 Flex Credits (0,10 €), in der Sandbox 16."
draft: false
---

Der Garantie-Prüfagent der Manufacturing Cloud, offiziell Warranty Claims Adjudication Agent und Teil von Winter '27, prüft, ob ein Garantieanspruch eines Händlers gedeckt ist, und markiert mögliche Betrugsfälle. Er ist so gut wie die Anlagendaten und Regeln dahinter. Bevor Sie ihn einschalten, braucht jede beanstandete Maschine Seriennummer und Garantiebeginn in Salesforce, Ihre Garantiebedingungen müssen als Regeln existieren, und jemand muss den Punkt verantworten, an dem ein Mensch das Geld freigibt. Ich würde den Agenten sortieren und vorbereiten lassen, die Deckungslogik in Regeln halten und die Zahlungsfreigabe beim Sachbearbeiter lassen.

## Was macht der Warranty Claims Adjudication Agent?

Salesforce führt ihn auf der [Produktseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/) unter Winter '27 mit einem Satz: Er soll Entscheidungen über Ansprüche beschleunigen, indem er die Deckung prüft und mögliche Betrugsfälle markiert. Dasselbe Release bringt eine geführte Rücksendung von Garantieteilen für Händler. Mit Summer '26 kam bereits der AI Warranty Concierge, der Kunden durch einen Anspruch führt. Winter '27 ist seit dem [12. Oktober 2026 allgemein verfügbar](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/).

Für eine Kaufentscheidung ist das dünn. In den Quellen, die ich öffnen konnte, hat Salesforce weder die Betrugssignale noch die nötige Lizenz noch eine Einrichtungsanleitung veröffentlicht, wie es sie für die anderen Fertigungsagenten gibt. Dokumentiert sind die [Garantie-Aktionen von Agentforce for Manufacturing](https://help.salesforce.com/s/articleView?id=ai.agent_ref_mfg_get_wrnty_claims_for_acct.htm&language=en_US&type=5): Check Asset For Warranty, Check Coverage for Parts, Get Asset Warranties und Get Warranty Claims for Account, die Ansprüche über Anlagen-ID, Seriennummer oder Anspruchsnummer findet. Sie setzen pro Nutzer das Add-on Agentforce for Manufacturing voraus oder die Agentforce 1 Manufacturing Edition. Ich erwarte, dass der Prüfagent auf diesen Aktionen aufsetzt, das ist aber meine Annahme. Fragen Sie Ihr Account-Team, bevor eine Zahl ins Budget geht.

Das Datenmodell darunter, von der Garantiebedingung bis zum Lieferantenregress, beschreibe ich in [Garantieansprüche von Händlern in Salesforce prüfen](../garantieansprueche-haendler-salesforce/). Hier geht es nur um den Agenten und was er braucht.

## Was ändert sich gegenüber der regelbasierten Prüfung?

Die Manufacturing Cloud kann Garantieansprüche schon heute ohne KI prüfen. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=mfg_warranties_adjudication_process_worflow.htm&language=en_US&type=5) startet ein datensatzausgelöster Flow, sobald ein Anspruch festgelegte Bedingungen erfüllt, sammelt die Daten über den Context Service und übergibt sie an ein Expression Set der Business Rules Engine. Das Expression Set prüft den Anspruch, liefert angepasste Beträge und einen Status zurück, und der Flow aktualisiert den Anspruch und informiert die Beteiligten per E-Mail. Ein [Claim-Validation-Element](https://help.salesforce.com/s/articleView?id=mfg_warranties_flow_bre.htm&language=en_US&type=5) meldet, ob ein Anspruch genehmigt ist und welche Produkte nicht gedeckt sind. Ein Scoring Framework schätzt zusätzlich anhand früherer Freigaben, wie wahrscheinlich eine Genehmigung ist.

In der Praxis sieht so ein Regelwerk etwa so aus: Ein Anspruch geht in die manuelle Prüfung, wenn sein Betrag eine Grenze pro Produktfamilie überschreitet oder der Fehler wenige Monate nach der Installation auftrat. Routinefälle laufen durch, der Rest geht an einen Menschen.

Die Frage „Ist das gedeckt?“ hat also schon eine deterministische Antwort. Ein Agent bringt dort etwas, wo Regeln schwach sind: die freie Fehlerbeschreibung des Händlers lesen, sie mit Fehlercode und beanspruchten Teilen abgleichen, bemerken, dass dieselbe Seriennummer zweimal kam, den Fall für den Sachbearbeiter zusammenfassen und eine Nachforderung fehlender Angaben entwerfen. Salesforces eigener [Architektur-Leitfaden zu Hybrid Reasoning](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) formuliert die Regel, die ich anwenden würde: Was sich als Code ausdrücken lässt, gehört in Logik. Wie Sie diese Trennung bauen, beschreibe ich in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/).

## Was muss stehen, bevor der Agent Ansprüche prüft?

### Anlagendaten mit Seriennummer und Garantiebeginn

Jede Deckungsprüfung ist eine Frage an eine Maschine. Fehlt die Anlage in Salesforce oder hat sie keinen Garantiebeginn, hat der Agent nichts, wogegen er prüfen kann, und entscheidet auf Lücken. Bei Herstellern mit Händlervertrieb liegt die Lücke meist in der Registrierung: Der Händler weiß, wann die Maschine übergeben wurde, der Hersteller nicht. Nehmen Sie die Ansprüche der letzten zwölf Monate und zählen Sie, wie viele Seriennummern als Anlage mit Startdatum existieren. Unter etwa 95 Prozent würde ich zuerst die Registrierung reparieren.

### Garantiebedingungen als Regeln, nicht als PDF

Der Agent prüft gegen das, was gepflegt ist. Bedingungen, die in Verträgen, Tabellen oder Köpfen des Garantieteams stehen, müssen zuerst zu Warranty Terms und Regeln im Expression Set werden. Nutzungsgrenzen brauchen eine Quelle für Betriebsstunden. Tippt der Händler die Stunden von Hand ein, ist dieser Wert Teil des Anspruchs und keine gesicherte Tatsache.

### Eine Freigabegrenze mit Verantwortlichem

Legen Sie vor dem Go-live fest, welche Ansprüche automatisch durchlaufen dürfen und welche immer zum Sachbearbeiter gehen. Meine Standardliste: Beträge über einer vereinbarten Grenze, jeder Betrugsverdacht, jeder Anspruch mit fehlenden Anlagendaten und jede Kulanz. Die Grenze vereinbaren Sie mit Serviceleitung und Finanzabteilung, denn sie ist eine kaufmännische Entscheidung. Technisch hilft Agent Script: Eine Aktion hinter einer `available when`-Bedingung verschwindet aus der Werkzeugliste des Modells, bis deterministischer Code sie freischaltet. Eine Freigabeaktion bleibt so unsichtbar, bis die Regeln bestanden sind.

### Das Händlerportal als Angriffsfläche

Der Agent liest Text, den Händler schreiben. 2025 hat die Schwachstelle ForcedLeak (CVSS 9,4) gezeigt, dass versteckte Anweisungen im Beschreibungsfeld eines Web-to-Lead-Formulars Agentforce dazu bringen konnten, Lead-Daten an eine fremde Domain zu senden; Salesforce hat daraufhin eine Trusted-URL-Allowlist erzwungen, wie [The Hacker News berichtet](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html). Die Fehlerbeschreibung in einem Garantieanspruch ist dieselbe Art Feld. Den Schutz beschreibe ich in [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

### Lizenz und Testbudget

Laut [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) kostet eine Standard- oder Custom-Aktion in Produktion 20 Credits, in der Sandbox 16. Flex Credits kosten [500 € je 100.000](https://www.salesforce.com/eu/agentforce/pricing/), eine Aktion also 0,10 €. Planen Sie zwei getrennte Posten: den Verbrauch, den Sie schätzen können, und die Lizenz, die vorerst nur Salesforce beantworten kann.

## Ein typisches Szenario: Landmaschinen über 90 Händler

Nehmen wir einen Landmaschinenhersteller mit 90 Händlern in Deutschland und Österreich, SAP als ERP und Manufacturing Cloud mit Händlerportal. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

**Volumen.** 350 Garantieansprüche im Monat, zwei Sachbearbeiter, im Schnitt 1.400 € pro Anspruch.

**Datenprüfung.** Bei 18 Prozent der beanstandeten Seriennummern fehlt das Installationsdatum, weil Händler die Übergabe nicht registriert haben. Betriebsstunden tippt der Händler ein.

**Erster Schritt ohne KI.** Eine Pflicht-Übergaberegistrierung im Portal mit Installationsdatum und Stunden, dazu eine einmalige Übernahme der installierten Basis aus SAP. Danach übernimmt das Expression Set Garantiezeitraum, Stundengrenze und gedeckte Teile. Angenommen sind drei Monate für beides.

**Dann der Agent.** Er liest die Fehlerbeschreibung, gleicht sie mit Fehlercode und Teilen ab, markiert wiederholte Seriennummern und Fehler kurz nach der Installation, schreibt eine Zusammenfassung und entwirft die Nachforderung fehlender Angaben. Ansprüche über 2.500 €, jede Markierung und jede Datenlücke gehen an die Sachbearbeiter. Angenommen sind das 30 Prozent des Volumens.

**Verbrauch.** Angenommen sind fünf Aktionen pro Anspruch: 350 × 5 × 20 = 35.000 Credits, rund 175 € im Monat. Ein Testsatz aus 200 echten, anonymisierten Ansprüchen kostet 200 × 5 × 16 = 16.000 Credits, also 80 € pro Sandbox-Lauf. Zehn Läufe vor dem Go-live ergeben 800 €.

Der Verbrauch ist klein. Die eigentlichen Kosten stecken in den drei Monaten Datenarbeit, und offen bleibt die Lizenz.

## Wer entscheidet was: Regel, Agent oder Sachbearbeiter?

| Entscheidung | Wo | Warum |
|---|---|---|
| War die Maschine am Fehlerdatum in der Garantie? | Expression Set | Datumsvergleich, muss nachvollziehbar sein |
| Ist das Teil gedeckt, liegen die Stunden unter der Grenze? | Expression Set | Klare Regel aus der Garantiebedingung |
| Passen Beschreibung, Fehlercode und Teile zusammen? | Agent | Freitext braucht Sprachverständnis |
| Ist der Anspruch verdächtig? | Agent markiert, Mensch entscheidet | Eine Markierung ist ein Hinweis, kein Beweis |
| Beträge über der Grenze, Kulanz | Sachbearbeiter | Kaufmännische Verantwortung |
| Gutschrift an den Händler | ERP | Die Finanzabteilung bucht die Zahlung |

Der Agent geht wie jede andere Änderung in Produktion: mit einem Testsatz aus echten Ansprüchen, einer vereinbarten Bestehensquote und Monitoring danach, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) beschrieben. Diese Grenzen zwischen Regeln, Agent und Menschen zu ziehen, gehört zu meiner [Arbeit als Salesforce-Architekt](../../leistungen/salesforce-architektur/). Ist die Entscheidung für die Manufacturing Cloud selbst noch offen, beginnen Sie mit [wann sich die Manufacturing Cloud lohnt](../manufacturing-cloud-wann-lohnt-sie-sich/).

## Wo sollten Sie anfangen?

1. **Anlagenabdeckung messen**: Anteil der Ansprüche des letzten Jahres, deren Seriennummer als Anlage mit Startdatum existiert.
2. **Zuerst regelbasiert prüfen.** Laut Salesforce-Hilfe ist das in Enterprise, Unlimited und Developer Edition verfügbar, und es zeigt schnell, ob Ihre Bedingungen als Regeln funktionieren.
3. **Freigabegrenze vereinbaren**, mit Service und Finanzen, schriftlich.
4. **Portal-Freitext als nicht vertrauenswürdig behandeln**, bevor ein Agent ihn liest.
5. **Salesforce drei Fragen stellen**: welche Lizenz, welche Betrugssignale, welche Einrichtungsdokumentation.
6. **Einen Testsatz bauen** aus echten Ansprüchen, auch abgelehnten und bekannten Betrugsfällen.

Der Garantie-Prüfagent kann Entscheidungen beschleunigen, aber nur auf sauberen Anlagendaten, funktionierenden Regeln und einer klaren Freigabegrenze. Wenn Sie eine zweite Meinung möchten, ob Ihr Garantieprozess dafür bereit ist, [schreiben Sie mir](#contact).
