---
title: "KI-Org-Analyse: technische Schulden vor dem Partnerwechsel"
description: "Kann ein LLM eine gewachsene Salesforce-Org vor Relaunch oder Partnerwechsel bewerten? Was ein Batch-Lauf kostet und was deterministische Tools liefern müssen."
pubDate: 2026-10-27
lang: de
slug: ki-org-analyse-technische-schulden
translationKey: ai-org-assessment-technical-debt
topic: code-review
categories: [devops, architecture]
contactBrief: partner-governance
tags: [Org-Analyse, Technische Schulden, Claude Batch API, Code Analyzer, sfdx-hardis, Partnerwechsel]
takeaways:
  - "Ein LLM übernimmt bei der Org-Analyse gut das Lesen: was jede Klasse, jeder Flow und jedes Permission Set tut, welchem Prozess es dient und wo zwei Partner dieselbe Logik doppelt gebaut haben."
  - "Anzahlen, Nutzung, API-Versionen, Regelverstöße und Testabdeckung müssen aus deterministischen Tools kommen, etwa Code Analyzer, sfdx-hardis-Monitoring und einem Apex-Testlauf, nie aus dem Modell."
  - "Im Szenario kostet ein Batch-Lauf über 2.250 Komponenten zu US-Listenpreisen rund 59 $ mit Sonnet 5.5 und 119 $ mit Opus 5.5, weil die Claude Batch API Input- und Output-Preise halbiert."
  - "Die echten Kosten liegen in der Architektenzeit für Fragenkatalog und Stichproben; im Szenario rund zehn Tage, gegenüber angenommenen 47 Tagen, wenn jemand alles von Hand liest."
  - "Der Kunde sollte die Analyse mit eigenen Tools und eigenem Account durchführen, denn der scheidende Partner verteidigt seinen Code und der neue möchte einen Neubau verkaufen."
faq:
  - q: "Kann ChatGPT oder Claude eine Salesforce-Org bewerten?"
    a: "Die Modelle können abgerufene Metadaten und Code lesen und erklären: Zweck, Geschäftsprozess, doppelte Logik und Risiko in verständlicher Sprache. Was ungenutzt ist, wie viele Komponenten es gibt und welche Regeln verletzt sind, sagen sie nicht verlässlich. Dafür braucht es deterministische Tools."
  - q: "Was kostet eine KI-Org-Analyse an Tokens?"
    a: "Im Szenario mit 1.400 Apex-Klassen und Triggern, 600 Flows und 250 Permission Sets kostet der erste Durchlauf über die Batch API zu US-Listenpreisen rund 59 $ mit Claude Sonnet 5.5 und 119 $ mit Opus 5.5. Ein zweiter Durchlauf pro Objekt kommt mit rund 10 $ dazu."
  - q: "Eignet sich die Claude Batch API für vertraulichen Quellcode?"
    a: "Anthropic führt die Batch-Verarbeitung als nicht geeignet für Zero Data Retention, die Ergebnisse werden 29 Tage gespeichert. Gespeicherte Daten werden ohne Ihre Zustimmung nicht zum Training genutzt. Entfernen Sie fest codierte personenbezogene Daten vorher und stimmen Sie das Setup mit Ihrem Datenschutzbeauftragten ab."
  - q: "Welche Tools finden technische Schulden in Salesforce ohne KI?"
    a: "Salesforce Code Analyzer bündelt acht Engines, darunter PMD für Apex, CPD für duplizierten Code und einen Flow Scanner. Das Monitoring von sfdx-hardis findet ungenutzte Apex-Klassen, veraltete API-Versionen, inaktive Nutzer und wenig genutzte Permission Sets. Ein Apex-Testlauf liefert die Abdeckung."
  - q: "Wer sollte die Org-Analyse vor einem Partnerwechsel beauftragen?"
    a: "Der Kunde. Führen Sie sie mit Ihrem eigenen API-Account und in Ihrem eigenen Repository durch, dann bleiben die Ergebnisse bei Ihnen, und weder der scheidende noch der neue Partner prägt die Befunde."
draft: false
---

Eine KI-Org-Analyse lohnt sich vor einem Relaunch oder Partnerwechsel, solange das Modell liest und die Tools zählen. Ein LLM erklärt, was jede Apex-Klasse, jeder Flow und jedes Permission Set tut, welchem Geschäftsprozess es dient und wo Partner dieselbe Logik doppelt gebaut haben. Über die Claude Batch API kostet ein Lauf über 2.250 Komponenten im Szenario unten rund 59 $ bis 119 $. Ob etwas ungenutzt ist, welche Regeln es verletzt und wie hoch die Testabdeckung ist, müssen deterministische Tools liefern: Code Analyzer, sfdx-hardis-Monitoring und ein Apex-Testlauf. Diese lasse ich zuerst laufen und gebe die Ergebnisse dem Modell mit.

## Warum vor dem Partnerwechsel auf die gewachsene Org schauen?

Eine Salesforce-Org, die zehn Jahre unter mehreren Partnern gewachsen ist, trägt deren Handschrift. Bei einem Maschinenbauer hat vielleicht ein Partner das Händlerportal gebaut, ein zweiter die Prozesse für den Außendienst mit Field Service, ein dritter die SAP-Schnittstelle für Aufträge und Ersatzteile. Jeder brachte sein eigenes Trigger-Framework, seine Namenskonventionen und seinen Teststil mit. Bevor ein neuer Partner übernimmt oder ein Relaunch startet, muss jemand klären, was in der Org steckt, was davon genutzt wird und was riskant wäre, einfach weiterzubetreiben.

Die naheliegenden Kandidaten für diese Antwort sind schlecht geeignet. Der scheidende Partner verteidigt seinen Code. Der neue Partner hat ein Interesse daran, möglichst viel Neubaubedarf zu finden. Eine Analyse, die der Kunde mit eigenen Tools durchführt, ist die neutrale Ausgangslage, und sie fließt später in die [Object Ownership Matrix](../object-ownership-matrix-salesforce/) für die neue Aufstellung.

## Was kann eine KI-Org-Analyse, was Scanner nicht können?

Ein Scanner prüft Regeln. Er findet eine Abfrage in einer Schleife oder eine Klasse ohne Sharing-Schlüsselwort. Er erkennt nicht, dass zwei Klassen von zwei Partnern beide das Garantieende berechnen, mit unterschiedlichen Regeln für Händler in verschiedenen Ländern. Das ist eine Frage der Bedeutung, und hier hilft ein LLM. Pro Komponente würde ich das Modell nach diesen Punkten fragen:

- **Zweck in zwei Sätzen**, so formuliert, dass eine Serviceleiterin ihn versteht.
- **Fachlicher Bereich (Business Capability)**, etwa Garantie, Ersatzteile, Wartungsverträge, Händleraufträge oder Angebote.
- **Berührte Objekte**, damit sich Komponenten später nach Objekt gruppieren lassen.
- **Doppelte Bedeutung**, also Logik, die dasselbe tut wie eine andere Komponente, auch wenn der Code anders aussieht.
- **Testqualität**: Prüft eine Testklasse fachliche Ergebnisse oder hebt sie nur die Abdeckung?
- **Eine Empfehlung**: behalten, umbauen oder durch Standardfunktionen ersetzen.

Jeder Befund muss auf einen Methodennamen oder eine Zeilennummer zeigen. Einen KI-Befund ohne Fundstelle würde ich verwerfen, denn ein Modell beschreibt Falsches genauso überzeugt wie Richtiges.

## Welche Befunde müssen aus deterministischen Tools kommen?

Alles, was eine Anzahl, eine Nutzungszahl oder ein Regelverstoß ist. Ein Modell, das eine Klasse nach der anderen liest, weiß nicht, ob diese Klasse irgendwo aufgerufen wird, und es kann nicht beweisen, dass etwas fehlt. Diese Tools können das:

- **[Salesforce Code Analyzer](https://developer.salesforce.com/docs/platform/salesforce-code-analyzer/guide/engines.html)** bündelt acht Engines, darunter PMD für Apex, CPD, das laut Doku „blocks of duplication across files“ findet, einen Flow Scanner für Sicherheitsprobleme in Flows und die Salesforce Graph Engine für tiefere Apex-Analysen.
- **ApexGuru** ist laut [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/04/performance-first-apex-development-with-apexguru-in-salesforce-dx-mcp-server) „available only in Production and Full Copy Sandbox orgs“ und gewichtet Befunde mit Laufzeitdaten. Für eine Analyse gegen Produktion ist das genau richtig: Performance-Befunde sortiert nach echter CPU-Last.
- **Das Monitoring von sfdx-hardis** führt laut [Monitoring-Übersicht](https://sfdx-hardis.cloudity.com/salesforce-monitoring-home/) Prüfungen wie „Detect unused Apex classes in an org“, „Detect Apex classes and triggers with deprecated API version“, „Detect underused permission sets“ und „Detect inactive metadata“ aus, dazu aktive Nutzer ohne Login seit sechs Monaten und den Salesforce Security Health Check.
- **Ein Apex-Testlauf** liefert die echte Abdeckung pro Klasse, die kein Modell schätzen sollte.
- **Abhängigkeiten** kommen aus dem Tooling-API-Objekt [MetadataComponentDependency](https://developer.salesforce.com/docs/atlas.en-us.api_tooling.meta/api_tooling/tooling_api_objects_metadatacomponentdependency.htm), das Salesforce weiterhin als Beta kennzeichnet. Wer was gebaut hat, steht in der Git-Historie oder in den Feldern LastModifiedBy, nicht in der Vermutung eines Modells über den Programmierstil.

Meine Regel: Enthält ein Satz im Bericht eine Zahl oder das Wort „ungenutzt“, hat ihn ein Tool erzeugt. Dieselben Tools als Prüfschritte in der Pipeline beschreibe ich in [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/); für die Analyse laufen sie einmal gegen die ganze Org.

## Ein typisches Szenario: drei Partner, eine Org, ein Relaunch

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, Field Service, einem Händlerportal und SAP. In zwölf Jahren haben drei Partner an der Org gearbeitet, ein vierter soll übernehmen. Die Org enthält 1.400 Apex-Klassen und Trigger, 600 Flows und 250 Permission Sets. Alle Mengen und Token-Größen unten sind Annahmen.

Die Reihenfolge:

1. Alle Metadaten in ein Repository abrufen, das dem Kunden gehört.
2. Code Analyzer, das sfdx-hardis-Monitoring und einen vollständigen Apex-Testlauf ausführen.
3. Fest codierte personenbezogene Daten per Mustersuche aus Testklassen entfernen.
4. Jede Komponente mit dem Fragenkatalog und den Tool-Befunden zu genau dieser Komponente an das Modell schicken.
5. Die Antworten nach Objekt gruppieren und pro Objekt einen zweiten Durchlauf starten, denn ein Trigger, zwei Flows und eine Validierungsregel auf dem Arbeitsauftrag ergeben nur zusammen Sinn.

### Was der Batch-Lauf kostet

Die [Claude Batch API](https://platform.claude.com/docs/en/build-with-claude/batch-processing) verarbeitet Anfragen asynchron, die meisten Batches innerhalb einer Stunde, und berechnet 50 Prozent der Standardpreise. Laut [Preisseite](https://platform.claude.com/docs/en/about-claude/pricing) sind das für Sonnet 5.5 1 $ Input und 5 $ Output pro Million Tokens, für Opus 5.5 2 $ und 10 $. Einen Euro-Listenpreis veröffentlicht Anthropic dort nicht, die Beträge sind US-Listenpreise. Ein Batch fasst bis zu 100.000 Anfragen oder 256 MB, je nachdem, was zuerst erreicht ist. Der Input im Szenario umfasst grob 150 MB Text (meine Schätzung), ich würde ihn deshalb auf zwei Batches aufteilen.

- Code und Metadaten: 1.400 Klassen zu 6.000 Tokens, 600 Flows zu 10.000 Tokens Flow-XML, 250 Permission Sets zu 4.000 Tokens = 15,4 Mio. Tokens.
- Fragenkatalog und Tool-Befunde: 12.000 Tokens pro Anfrage × 2.250 Anfragen = 27 Mio. Tokens.
- Output: 1.500 Tokens pro Komponente = 3,4 Mio. Tokens.
- **Sonnet 5.5:** 42,4 Mio. × 1 $ + 3,4 Mio. × 5 $ = **rund 59 $**.
- **Opus 5.5:** 42,4 Mio. × 2 $ + 3,4 Mio. × 10 $ = **rund 119 $**.
- **Zweiter Durchlauf** für 40 Objekte mit je 100.000 Tokens Input und 5.000 Output auf Opus 5.5: **rund 10 $**.

Prompt-Caching lässt sich mit dem Batch-Rabatt kombinieren, im Batch sind Cache-Treffer aber nicht garantiert; Anthropic nennt Trefferquoten von 30 bis 98 Prozent. Ich rechne ohne Caching und betrachte jede Ersparnis als Zugabe. Thinking-Tokens werden [als Output abgerechnet](https://code.claude.com/docs/en/costs) und lassen sich bei den 5.5-Modellen nicht abschalten; verdreifachen sie den Output, steigt der Opus-Lauf auf rund 187 $. Die Grundlagen der Token-Rechnung stehen im [Masterclass-Kapitel zu Kosten und Token](../../masterclass-ki/kosten-und-token/).

### Wo die echten Kosten liegen

Die Token-Rechnung ist klein. Die Arbeit liegt bei Menschen. Im Szenario würde ich rund zehn Architektentage einplanen: drei bis vier für die Einrichtung der Tools und den Fragenkatalog, den Rest für eine Stichprobe von 10 Prozent der Befunde und jeden Befund mit hohem Risiko. 2.250 Komponenten von Hand zu lesen, bei angenommenen zehn Minuten pro Stück, dauert rund 375 Stunden oder 47 Tage. Das LLM übernimmt das erste Lesen, Menschen entscheiden.

## Was ist mit Quellcode und Datenschutz?

Der Quellcode der Org gehört dem Kunden, und Testklassen enthalten oft Namen, E-Mail-Adressen oder Datensatz-IDs. Anthropics [Seite zur Datenaufbewahrung](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) führt die Batch-Verarbeitung als nicht geeignet für Zero Data Retention, weil die Ergebnisse 29 Tage gespeichert werden. Auf derselben Seite steht, dass gespeicherte Daten „never used for model training without your express permission“ sind. Entfernen Sie personenbezogene Daten vor dem Lauf und stimmen Sie das Setup mit Ihrem Datenschutzbeauftragten ab; Betriebsrat und DSGVO behandle ich in [KI-Coding, Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/).

Gilt die Vorgabe ohne Datenaufbewahrung streng, gibt es zwei Alternativen. Sie zahlen den vollen Preis ohne Batch, im Szenario rund 119 $ bis 238 $, nachdem Sie geprüft haben, welche Endpunkte Ihr Vertrag abdeckt. Oder Sie nutzen die KI-Dokumentation von sfdx-hardis, die laut [Seite zum KI-Setup](https://sfdx-hardis.cloudity.com/salesforce-ai-setup/) mit Agentforce, OpenAI oder über LangChain.js mit Anthropic, Google GenAI und Ollama für lokal betriebene Modelle arbeitet. Dieselbe Seite warnt, dass der erste Dokumentationslauf „can make hundreds of API calls“, empfiehlt, den KI-Cache einzuchecken, und begrenzt die Aufrufe pro Befehl standardmäßig auf 10.000.

## Wem sollte die Analyse gehören?

Dem Kunden. Lassen Sie die Scans in Ihrer Pipeline und die Modellaufrufe in Ihrem eigenen API-Account laufen und legen Sie die Ergebnisse in Ihr Repository, so wie ich es für DevOps-Werkzeuge in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/) begründe. Übernimmt ein Partner die Arbeit, nennt sein Vertrag die erlaubten Tools und Datenregeln, siehe [Regeln für Partner mit KI-Coding im Vertrag](../partner-ki-coding-regeln-vertrag/).

Die Analyse ist der Startpunkt für die Übergabe: welche Objekte an welchen Partner gehen, welche Komponenten gelöscht und welche neu gebaut werden. Diese Steuerung gehört zu meiner Arbeit in der [Partnersteuerung](../../leistungen/partnersteuerung/).

## Wo fangen Sie an?

1. Rufen Sie alle Metadaten in ein Repository ab, das Ihnen gehört.
2. Schalten Sie das sfdx-hardis-Monitoring für zwei Wochen ein, um Nutzungsdaten zu sammeln.
3. Führen Sie Code Analyzer und einen vollständigen Apex-Testlauf gegen die Produktionsmetadaten aus.
4. Schreiben Sie zehn Analysefragen und testen Sie sie an 50 Komponenten, zweimal; weichen die beiden Läufe bei vielen Risikobewertungen voneinander ab, schärfen Sie die Fragen nach.
5. Starten Sie den Batch und danach den zweiten Durchlauf pro Objekt.
6. Prüfen Sie Stichproben und jeden Befund mit hohem Risiko, bevor etwas in den Übergabeplan geht.

Eine KI-Org-Analyse kostet an Tokens weniger als ein Workshop-Tag, solange die Tools die Fakten liefern und das Modell sie nur erklärt; wenn Sie einen Partnerwechsel oder Relaunch planen, [schreiben Sie mir](#contact).
