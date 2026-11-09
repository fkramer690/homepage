---
title: "Garantie-Prüfagent aus Winter '27: was vorher stehen muss"
description: "Was der Warranty Claims Adjudication Agent der Manufacturing Cloud ab Winter '27 prüft und welche Anlagendaten, Regeln und Freigaben Sie vorher brauchen."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: garantie-pruefagent-winter-27
translationKey: warranty-adjudication-agent-winter-27
topic: ai
categories: [ai, manufacturing-cloud]
tags: [Agentforce, Garantie, Manufacturing Cloud, KI-Agenten, Händler, After-Sales]
takeaways:
  - "Der Agent aus Winter '27 priorisiert offene Ansprüche, markiert Lücken und Betrugsverdacht, entwirft Nachfragen. Genehmigen oder ablehnen kann er nicht."
  - "Die Manufacturing Cloud kann Ansprüche mit Flow, Business Rules Engine und Expression Sets prüfen. Die verbindliche Deckungsentscheidung würde ich dort lassen."
  - "Der Agent stützt sich auf Anlagen, Garantiebedingungen, Anlagengarantien und Ansprüche. Seriennummer und Garantiebeginn würde ich zusätzlich verlangen."
  - "Ansprüche über einer vereinbarten Grenze, Betrugsverdacht, Kulanz und fehlende Anlagendaten gehören zu einem Menschen, bevor eine Gutschrift entsteht."
  - "Er braucht das Add-on Agentforce for Manufacturing, laut Liste 150 Dollar pro Nutzer und Monat, oder Agentforce 1 Manufacturing, dazu Flex Credits."
faq:
  - q: "Was macht der Warranty Claims Adjudication Agent?"
    a: "Laut Salesforce-Hilfe fasst er die Warteschlange zusammen, priorisiert offene Ansprüche nach Wert, Alter und Komplexität, prüft sie auf fehlende Angaben, entwirft Nachfragen und markiert möglichen Betrug. Sachbearbeiter nutzen ihn im Agentforce-Panel oder in Slack. Er gehört zu Winter '27, seit dem 12. Oktober 2026 allgemein verfügbar."
  - q: "Ersetzt der Agent den Garantiesachbearbeiter?"
    a: "Nein. Laut Salesforce-Hilfe unterstützt der Agent die Sachbearbeiter, genehmigt oder lehnt aber keine Ansprüche ab; eine Nachfrage kann er entwerfen, aber nicht senden. Ansprüche über einer vereinbarten Grenze, mit Betrugsverdacht oder fehlenden Anlagendaten würde ich trotzdem ausdrücklich einem Menschen zuweisen."
  - q: "Was muss stehen, bevor ich den Agenten einschalte?"
    a: "Die Datensätze aus der Einrichtungsanleitung: Account, Asset, Warranty Term, Asset Warranty, Claim, Claim Item, Claim Coverage und Claim Coverage Payment Detail. Dazu würde ich Seriennummer und verlässlichen Garantiebeginn verlangen, Garantiebedingungen als gepflegte Regeln, eine vereinbarte Freigabegrenze und ein Händlerportal, dessen Freitextfelder als nicht vertrauenswürdige Eingabe gelten."
  - q: "Was kostet der Agent?"
    a: "Er läuft in Enterprise, Unlimited oder Developer Edition mit dem Add-on Agentforce for Manufacturing, laut US-Liste 150 Dollar pro Nutzer und Monat, oder in der Agentforce 1 Manufacturing Edition. Dazu kommen Flex Credits: 20 pro Aktion in Produktion, 16 in der Sandbox, plus Prompts und Data-360-Verbrauch. Lassen Sie den vollständigen Produktumfang vom Account-Team bestätigen."
draft: false
---

Der Garantie-Prüfagent der Manufacturing Cloud, offiziell Warranty Claims Adjudication Agent und Teil von Winter '27, hilft Garantiesachbearbeitern bei ihrer Warteschlange. Laut Salesforce-Hilfe priorisiert er offene Ansprüche, prüft sie auf fehlende Angaben, entwirft Nachfragen und markiert möglichen Betrug. Genehmigen oder ablehnen kann er nicht. Er ist so gut wie die Anlagen-, Garantie- und Anspruchsdaten dahinter. Bevor Sie ihn einschalten, müssen Ihre Garantiebedingungen als Regeln und Anlagengarantien existieren, und jemand muss den Punkt verantworten, an dem ein Mensch das Geld freigibt. Ich würde den Agenten sortieren und vorbereiten lassen, die Deckungslogik in Regeln halten und jede Entscheidung beim Sachbearbeiter lassen.

## Was macht der Warranty Claims Adjudication Agent?

Salesforce führt ihn auf der [Produktseite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/) unter Winter '27 mit einem Satz: Er soll Entscheidungen über Ansprüche beschleunigen, indem er die Deckung prüft und mögliche Betrugsfälle markiert. Die [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=ind.mfg_genai_warranty_claims_adjudication.htm&language=en_US&type=5) ist genauer: Der Agent fasst das Volumen der Warteschlange zusammen, priorisiert offene Ansprüche nach Wert, Alter und Komplexität, prüft Anspruchsdaten auf Vollständigkeit, markiert fehlende Angaben, entwirft Nachfragen und erkennt möglichen Betrug früher. Sachbearbeiter erreichen ihn über das Agentforce-Panel oder Slack. Die [Hinweise zum Agenten](https://help.salesforce.com/s/articleView?id=ind.mfg_genai_warranty_claims_adjudication_agent_considerations.htm&language=en_US&type=5) sind eindeutig: Er genehmigt oder lehnt keine Ansprüche ab, und eine Nachfrage kann er entwerfen, aber nicht senden. Mit Winter '27 hat Salesforce die Manufacturing Cloud in Agentforce Manufacturing umbenannt; ich bleibe beim alten Namen, weil Produkt- und Preisseiten ihn weiter nutzen. Dasselbe Release bringt eine geführte Rücksendung von Garantieteilen für Händler. Mit Summer '26 kam bereits der AI Warranty Concierge, der Kunden durch einen Anspruch führt. Winter '27 ist seit dem [12. Oktober 2026 allgemein verfügbar](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/).

```hinweis offen
Die [Einrichtungsanleitung](https://help.salesforce.com/s/articleView?id=ind.mfg_genai_warranty_claims_adjudication_prepare_org.htm&language=en_US&type=5) nennt fünf Add-ons, die die Org braucht, von Manufacturing Cloud for Service und Warranty Lifecycle Management bis zum Agentforce Employee Agent Add-on. Welche Signale die Betrugsprüfung nutzt, beschreiben die Seiten, die ich öffnen konnte, nicht im Detail. Lassen Sie Produktumfang und Betrugslogik vom Account-Team bestätigen, bevor eine Zahl ins Budget geht.
```

Salesforce dokumentiert außerdem die [Garantie-Aktionen von Agentforce for Manufacturing](https://help.salesforce.com/s/articleView?id=ai.agent_ref_mfg_get_wrnty_claims_for_acct.htm&language=en_US&type=5): Check Asset For Warranty, Check Coverage for Parts, Get Asset Warranties und Get Warranty Claims for Account, die Ansprüche über Anlagen-ID, Seriennummer oder Anspruchsnummer findet. Sie setzen pro Nutzer das Add-on Agentforce for Manufacturing voraus oder die Agentforce 1 Manufacturing Edition. Ich erwarte, dass der Prüfagent auf diesen Aktionen aufsetzt, das ist aber meine Annahme.

Das Datenmodell darunter, von der Garantiebedingung bis zum Lieferantenregress, beschreibe ich in [Garantieansprüche von Händlern in Salesforce prüfen](../garantieansprueche-haendler-salesforce/). Hier geht es nur um den Agenten und was er braucht.

## Die regelbasierte Prüfung gibt es schon heute

Die Manufacturing Cloud kann Garantieansprüche schon heute ohne KI prüfen. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=mfg_warranties_adjudication_process_worflow.htm&language=en_US&type=5) startet ein datensatzausgelöster Flow, sobald ein Anspruch festgelegte Bedingungen erfüllt, sammelt die Daten über den Context Service und übergibt sie an ein Expression Set der Business Rules Engine. Das Expression Set prüft den Anspruch, liefert angepasste Beträge und einen Status zurück, und der Flow aktualisiert den Anspruch und informiert die Beteiligten per E-Mail. Ein [Claim-Validation-Element](https://help.salesforce.com/s/articleView?id=mfg_warranties_flow_bre.htm&language=en_US&type=5) meldet, ob ein Anspruch genehmigt ist und welche Produkte nicht gedeckt sind. Ein Scoring Framework schätzt zusätzlich anhand früherer Freigaben, wie wahrscheinlich eine Genehmigung ist.

In der Praxis sieht so ein Regelwerk etwa so aus: Ein Anspruch geht in die manuelle Prüfung, wenn sein Betrag eine Grenze pro Produktfamilie überschreitet oder der Fehler wenige Monate nach der Installation auftrat. Routinefälle laufen durch, der Rest geht an einen Menschen.

Die Frage „Ist das gedeckt?“ kann also eine deterministische Antwort haben, sobald Regeln und Daten stehen. Ein Agent schafft dort Mehrwert, wo Regeln nicht ausreichen. Dokumentiert sind die Priorisierung der Warteschlange, Vollständigkeitsprüfungen, Hinweise auf möglichen Betrug und Entwürfe für Nachfragen. Den Abgleich der freien Fehlerbeschreibung mit Fehlercode und beanspruchten Teilen beschreibt Salesforce nicht als Standardfunktion; ich würde ihn als Erweiterung behandeln und getrennt testen. Salesforces eigener [Architektur-Leitfaden zu Hybrid Reasoning](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) formuliert die Regel, die ich anwenden würde: Was sich als Code ausdrücken lässt, gehört in Logik. Wie Sie diese Trennung bauen, beschreibe ich in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/).

## Was vor dem Agenten stehen muss

### Anlagendaten mit Seriennummer und Garantiebeginn

Jede Deckungsprüfung ist eine Frage an eine Maschine. Die Einrichtungsanleitung nennt die Datensätze, auf die sich der Agent stützt: Account, Asset, Warranty Term, Asset Warranty, Claim, Claim Item, Claim Coverage und Claim Coverage Payment Detail. Seriennummer und Garantiebeginn stehen dort nicht als Pflichtfelder, aus meiner Sicht entscheiden sie aber, ob die Anlagengarantie stimmt. Fehlt die Anlage in Salesforce oder hat sie keinen Garantiebeginn, hat der Agent keine verlässliche Grundlage für die Prüfung und arbeitet mit lückenhaften Daten. Bei Herstellern mit Händlervertrieb liegt die Lücke meist in der Registrierung: Der Händler weiß, wann die Maschine übergeben wurde, der Hersteller nicht. Nehmen Sie die Ansprüche der letzten zwölf Monate und zählen Sie, wie viele Seriennummern als Anlage mit Startdatum existieren. Unter etwa 95 Prozent würde ich zuerst die Registrierung reparieren. Wie diese Anlagendaten entstehen, steht in [Installierte Basis in Manufacturing Cloud](../installierte-basis-asset-meilensteine/).

### Garantiebedingungen als Regeln, nicht als PDF

Der Agent prüft gegen das, was gepflegt ist. Bedingungen, die in Verträgen, Tabellen oder Köpfen des Garantieteams stehen, müssen zuerst zu Warranty Terms und Regeln im Expression Set werden. Nutzungsgrenzen brauchen eine Quelle für Betriebsstunden. Tippt der Händler die Stunden von Hand ein, ist dieser Wert Teil des Anspruchs und keine gesicherte Tatsache.

### Eine Freigabegrenze mit Verantwortlichem

Legen Sie vor dem Go-live fest, welche Ansprüche automatisch durchlaufen dürfen und welche immer zum Sachbearbeiter gehen. Meine Standardliste: Beträge über einer vereinbarten Grenze, jeder Betrugsverdacht, jeder Anspruch mit fehlenden Anlagendaten und alle Kulanzfälle. Die Grenze vereinbaren Sie mit Serviceleitung und Finanzabteilung, denn sie ist eine kaufmännische Entscheidung. Der Standardagent hat gar keine Freigabeaktion. Erweitern Sie ihn um eigene Aktionen, hilft Agent Script: Eine Aktion hinter einer `available when`-Bedingung verschwindet aus der Werkzeugliste des Modells, bis deterministischer Code sie freischaltet.

### Das Händlerportal als Angriffsfläche

Der Agent liest Text, den Händler schreiben. 2025 hat die Schwachstelle ForcedLeak (vom Entdecker Noma Security mit CVSS 9,4 bewertet) gezeigt, dass versteckte Anweisungen im Beschreibungsfeld eines Web-to-Lead-Formulars Agentforce dazu bringen konnten, Lead-Daten in eine Bild-URL auf einer abgelaufenen, aber weiter vertrauten Domain einzubauen, die der Browser dann lud; Salesforce hat daraufhin eine Trusted-URL-Allowlist erzwungen, wie [The Hacker News berichtet](https://thehackernews.com/2025/09/salesforce-patches-critical-forcedleak.html). Eine Allowlist begrenzt, wohin Daten gehen, macht den Text aber nicht sicher. Die Fehlerbeschreibung in einem Garantieanspruch ist dieselbe Art Feld. Den Schutz beschreibe ich in [Prompt Injection im Händlerportal](../prompt-injection-haendlerportal-agentforce/).

### Lizenz und Testbudget

Für den Verbrauch gibt es veröffentlichte Preise:

```kennzahlen
20 Credits | pro Standard- oder Custom-Aktion in Produktion
16 Credits | pro Aktion in der Sandbox
0,10 € | pro Aktion in Produktion, bei 500 € je 100.000 Flex Credits
quelle: [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) und [Agentforce-Preisseite](https://www.salesforce.com/eu/agentforce/pricing/)
```

Planen Sie zwei getrennte Posten. Die Lizenz: Die [Add-on-Seite der Manufacturing Cloud](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) nennt Agentforce for Manufacturing mit 150 Dollar pro Nutzer und Monat, zusätzlich zu den Produkten aus der Einrichtungsanleitung. Und den Verbrauch: Laut den [Hinweisen zum Agenten](https://help.salesforce.com/s/articleView?id=ind.mfg_genai_warranty_claims_adjudication_agent_considerations.htm&language=en_US&type=5) nutzen Employee Agents auch generative Prompts und Data 360, die ebenfalls Credits verbrauchen.

## Rechenbeispiel: Landmaschinen über 90 Händler

Nehmen wir einen Landmaschinenhersteller mit 90 Händlern in Deutschland und Österreich, SAP als ERP und Manufacturing Cloud mit Händlerportal. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen.

**Volumen.** 350 Garantieansprüche im Monat, zwei Sachbearbeiter, im Schnitt 1.400 € pro Anspruch.

**Datenprüfung.** Bei 18 Prozent der beanstandeten Seriennummern fehlt das Installationsdatum, weil Händler die Übergabe nicht registriert haben. Betriebsstunden tippt der Händler ein.

**Erster Schritt ohne KI.** Eine Pflicht-Übergaberegistrierung im Portal mit Installationsdatum und Stunden, dazu eine einmalige Übernahme der installierten Basis aus SAP. Danach übernimmt das Expression Set Garantiezeitraum, Stundengrenze und gedeckte Teile. Angenommen sind drei Monate für beides.

**Dann der Agent.** Er priorisiert die Warteschlange, markiert fehlende Daten und möglichen Betrug und entwirft die Nachforderung fehlender Angaben. Der Abgleich von Fehlerbeschreibung, Fehlercode und Teilen wäre eine eigene Erweiterung, getrennt getestet. Ansprüche über 2.500 €, jeder Betrugsverdacht und jede Datenlücke gehen an die Sachbearbeiter. Angenommen sind das 30 Prozent des Volumens.

**Verbrauch.** Angenommen sind fünf Aktionen pro Anspruch: 350 × 5 × 20 = 35.000 Credits, rund 175 € im Monat allein für Aktionen. Ein Testsatz aus 200 echten, anonymisierten Ansprüchen kostet 200 × 5 × 16 = 16.000 Credits, also 80 € pro Sandbox-Lauf. Zehn Läufe vor dem Go-live ergeben 800 €.

Prompts und Data 360 kommen dazu, messen Sie sie in der Sandbox. Der Anteil der Aktionen ist klein. Die eigentlichen Kosten stecken in den drei Monaten Datenarbeit, dazu das Add-on für zwei Sachbearbeiter, 300 Dollar im Monat zum Listenpreis.

## Wer entscheidet was: Regel, Agent oder Sachbearbeiter?

| Entscheidung | Wo | Warum |
|---|---|---|
| War die Maschine am Fehlerdatum in der Garantie? | Expression Set | Datumsvergleich, muss nachvollziehbar sein |
| Ist das Teil gedeckt, liegen die Stunden unter der Grenze? | Expression Set | Klare Regel aus der Garantiebedingung |
| Passen Beschreibung, Fehlercode und Teile zusammen? | Agent, als Erweiterung | Freitext braucht Sprachverständnis |
| Ist der Anspruch verdächtig? | Agent markiert, Mensch entscheidet | Eine Markierung ist ein Hinweis, kein Beweis |
| Beträge über der Grenze, Kulanz | Sachbearbeiter | Kaufmännische Verantwortung |
| Gutschrift an den Händler | ERP | Die Finanzabteilung bucht die Zahlung |

Der Agent geht wie jede andere Änderung in Produktion: mit einem Testsatz aus echten Ansprüchen, einer vereinbarten Zielquote und anschließender Überwachung, wie in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/) beschrieben. Diese Grenzen zwischen Regeln, Agent und Menschen zu ziehen, gehört zu meiner [Arbeit als Salesforce-Architekt](../../leistungen/salesforce-architektur/). Ist die Entscheidung für die Manufacturing Cloud selbst noch offen, beginnen Sie mit [wann sich die Manufacturing Cloud lohnt](../manufacturing-cloud-wann-lohnt-sie-sich/).

## Daten vor dem Go-live prüfen

1. **Anlagenabdeckung messen**: Anteil der Ansprüche des letzten Jahres, deren Seriennummer als Anlage mit Startdatum existiert.
2. **Zuerst regelbasiert prüfen.** Laut Salesforce-Hilfe ist das in Enterprise, Unlimited und Developer Edition verfügbar, und es zeigt schnell, ob Ihre Bedingungen als Regeln funktionieren.
3. **Freigabegrenze vereinbaren**, mit Service und Finanzen, schriftlich.
4. **Portal-Freitext als nicht vertrauenswürdig behandeln**, bevor ein Agent ihn liest.
5. **Salesforce drei Fragen stellen**: welche Add-ons Ihre Org braucht, welche Signale die Betrugsprüfung nutzt und wie viele Credits Prompts und Data 360 verbrauchen.
6. **Einen Testsatz bauen** aus echten Ansprüchen, auch abgelehnten und bekannten Betrugsfällen.
