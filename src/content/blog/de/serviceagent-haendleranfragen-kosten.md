---
title: "Agentforce-Serviceagent für Händler: Kosten pro Monat"
description: "Was ein Agentforce-Serviceagent für Händleranfragen pro Monat kostet: Rechenbeispiel mit Flex Credits, Preis pro Gespräch, Data 360 und Testlast."
pubDate: 2026-10-27
lang: de
slug: serviceagent-haendleranfragen-kosten
translationKey: dealer-service-agent-costs
topic: ai
category: ai
tags: [Agentforce, Flex Credits, Händlerservice, Data 360, Maschinenbau, Business Case]
takeaways:
  - "Im Szenario kosten 3.000 Händlergespräche im Monat mit je drei Aktionen und zwei Prompts 204.000 Flex Credits, in Produktion also rund 1.020 $ im Monat."
  - "Dasselbe Volumen kostet im Modell mit 2 $ pro Gespräch 6.000 $ im Monat, und Salesforce unterstützt Flex Credits und Gesprächspreise nicht in derselben Org."
  - "2.000 MB Ersatzteilkataloge in Data 360 aufzubereiten kostet einmalig 300.000 Credits; derselbe Katalog in der Sandbox kostet 240.000 Credits, testen Sie also mit einem Ausschnitt."
  - "Bei Help-Agent-Lösungen zu 400 Credits sind Flex Credits im Szenario günstiger, sobald mehr als 17 Prozent der Gespräche gelöst werden."
  - "Das erste Jahr braucht im Szenario rund 3 Mio. Credits, mehr als die 2,75 Mio. einer Max-Edition, und nicht genutzte Credits verfallen zum Ende der Bestellung."
faq:
  - q: "Was kostet ein Agentforce-Serviceagent für Händler pro Monat?"
    a: "Das hängt von Volumen und Aktionen pro Gespräch ab. Bei 3.000 Gesprächen mit je drei Aktionen und zwei Standard Prompts verbraucht der Agent 204.000 Flex Credits, zum Listenpreis rund 1.020 $ im Monat. Data 360, MuleSoft und die Umsetzung kommen dazu."
  - q: "Ist Agentforce pro Aktion oder pro Gespräch günstiger?"
    a: "Bei engen Anfragen mit wenigen Aktionen sind Flex Credits meist günstiger. Im Szenario kostet ein Gespräch 68 Credits oder 0,34 $, im Gesprächsmodell 2 $. Beide Modelle laufen nicht in derselben Org."
  - q: "Kostet das Testen eines Agentforce-Agenten Flex Credits?"
    a: "Ja. Laut Salesforce verbrauchen Testläufe Requests und Credits. Aktionen kosten in der Sandbox 16 statt 20 Credits, die Verarbeitung von Dokumenten in Data 360 dort 120 Credits pro MB."
  - q: "Was kostet Data 360 für Ersatzteilkataloge?"
    a: "Die Rate Card berechnet in der Grundstufe 150 Credits pro MB für Unstructured Processing. Ein Katalogbestand von 2.000 MB kostet damit für die erste Aufbereitung 300.000 Credits, rund 1.500 $."
  - q: "Reichen die Flex Credits meiner Salesforce-Edition für einen Händleragenten?"
    a: "Core enthält 500.000, Advanced 1 Mio. und Max 2,75 Mio. Credits. Das Szenario braucht im ersten Jahr rund 3 Mio., und der Pool deckt auch jede andere verbrauchsabhängige Nutzung in der Org."
draft: false
---

Ein Agentforce-Serviceagent für Händleranfragen kostet in Produktion rund 1.020 $ im Monat, wenn er 3.000 Gespräche mit je drei Aktionen und zwei Prompts beantwortet und über Flex Credits abgerechnet wird. Im Modell mit 2 $ pro Gespräch kostet dasselbe Volumen 6.000 $. Im ersten Jahr wächst die Rechnung auf rund 3 Mio. Credits, etwa 15.000 $, weil die Aufbereitung der Ersatzteilkataloge in Data 360 und die Tests in der Sandbox dazukommen. Die Mengen unten sind Annahmen, die Multiplikatoren stammen aus der Rate Card von Salesforce.

## Was kostet ein Agentforce-Serviceagent pro Monat?

Agentforce rechnet Nutzung in Flex Credits ab. Salesforce nennt [500 $ je 100.000 Credits](https://www.salesforce.com/agentforce/pricing/), ein Credit kostet also einen halben Cent. Die [Flex Credits Rate Card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) mit Stand 31. August 2026 legt pro Nutzungsart einen Multiplikator fest:

- **Standard- oder Custom-Aktion:** 20 Credits in Produktion, 16 in Sandbox oder Scratch Org.
- **Prompts auf von Salesforce bereitgestellten Modellen:** Basic 2, Standard 4, Advanced 16 Credits.
- **Help-Agent-Lösung:** 400 Credits, 0 in der Sandbox.
- **Data 360:** Unstructured Processing 150 Credits pro MB und Queries 3 Credits je 1 Mio. Zeilen in der Grundstufe.
- **Headless Platform Interaction:** „TBA“.

Eine Aktion ist ein Schritt, den der Agent ausführt, etwa einen Auftrag aus SAP lesen. Das Beispiel „Where is my order?“ auf der Preisseite von Salesforce hat zwei Aktionen, 40 Credits pro Anfrage, und kommt bei 20 Anfragen am Tag auf 120 $ im Monat. Bei den übrigen Beispielen vermerkt die Seite, dass Data-360-Credits nicht enthalten sind. Genau diese Lücke sehe ich in den meisten Schätzungen.

Nicht genutzte Flex Credits verfallen und müssen vor dem Ende der Bestellung verbraucht sein. Ein großer Pool „zur Sicherheit“ kostet also genauso sicher Geld wie ein zu kleiner.

## Ein typisches Szenario: 3.000 Händleranfragen im Monat

Nehmen wir einen Maschinenbauer mit 400 Händlern in Europa, SAP S/4HANA als ERP, einem Händlerportal auf Experience Cloud und einer bestehenden MuleSoft-API für Auftragsdaten. Die Händler fragen nach Auftragsstatus, bestätigten Lieferterminen und Ersatzteilverfügbarkeit. Alle Mengen und Anteile unten sind Annahmen, die das Vorgehen zeigen; nur die Multiplikatoren stammen von Salesforce.

### Produktion: Aktionen und Prompts

Angenommen sind 3.000 Gespräche im Monat mit je drei Aktionen: Händler und Auftrag identifizieren, Status und Liefertermin über MuleSoft aus SAP lesen, Ersatzteilverfügbarkeit prüfen. Dazu kommen pro Gespräch zwei Standard Prompts aus Prompt-Vorlagen, etwa eine Antwort in der Sprache des Händlers und eine Fallzusammenfassung.

- Aktionen: 3.000 × 3 × 20 = 180.000 Credits
- Prompts: 3.000 × 2 × 4 = 24.000 Credits
- Summe: 204.000 Credits, 1.020 $ im Monat oder 68 Credits (0,34 $) pro Gespräch

Ob Ihr Agent wirklich zwei Prompts aufruft oder fünf, zeigt sich nach der ersten Testwoche im [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/), das den Verbrauch nach Agent, Aktion und Kanal aufschlüsselt. Das Digital Wallet setzt ein aktiviertes Data 360 voraus.

### Data 360: Ersatzteilkataloge und Handbücher

Für Ersatzteilfragen braucht der Agent Dokumente: Kataloge, Explosionszeichnungen mit Teilenummern, Betriebsanleitungen. Agentforce stützt sich bei Dateien auf eine Data Library, die der [Workshop von Salesforce](https://developer.salesforce.com/workshops/agentforce-new-workshop/rag/1-ingest-unstructured-data-index) auf einem Suchindex in Data Cloud aufbaut.

Angenommen sind 2.000 MB PDFs. Die erste Aufbereitung kostet 2.000 × 150 = 300.000 Credits, also 1.500 $. Das ist genau die Obergrenze der Grundstufe, die pro Nutzungsart gilt und am Ersten jedes Monats zurückgesetzt wird. Angenommen sind weitere 100 MB geänderte Dokumente pro Monat: 15.000 Credits, 75 $.

Den Katalog einmal aufzubereiten kostet so viel wie sechs Wochen Händlergespräche. Veraltete Katalogstände vor der Aufbereitung auszusortieren ist die günstigste Einsparung im ganzen Projekt. Details stehen in [Data-360-Kosten für KI-Agenten](../data-360-kosten-fuer-ki-agenten/).

### Testlast in der Sandbox

Die [Testdokumentation von Salesforce](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html) sagt, dass Testläufe „requests and credits“ verbrauchen. Angenommen sind 500 Testgespräche vor dem Go-live: 500 × (3 × 16 + 2 × 4) = 28.000 Credits, 140 $. Dazu vier Regressionsläufe mit je 200 Gesprächen pro Jahr: 44.800 Credits, 224 $.

Die teure Falle ist Data 360 in der Sandbox: 120 Credits pro MB, ohne Staffel. Den vollen Katalog mit 2.000 MB dort aufzubereiten kostet 240.000 Credits, 1.200 $, fast so viel wie in Produktion. Ein repräsentativer Ausschnitt von 200 MB kostet 24.000 Credits, 120 $.

### Das erste Jahr in Summe

| Posten | Credits | USD |
|---|---|---|
| Gespräche in Produktion, 12 Monate | 2.448.000 | 12.240 |
| Data 360, erster Katalog | 300.000 | 1.500 |
| Data 360, Änderungen über 11 Monate | 165.000 | 825 |
| Sandbox-Tests vor dem Go-live | 28.000 | 140 |
| Katalogausschnitt in der Sandbox | 24.000 | 120 |
| Regressionstests, 4 Läufe | 44.800 | 224 |
| **Summe** | **3.009.800** | **15.049** |

Nicht enthalten sind MuleSoft-Lizenzen, die Umsetzung, Lizenzen für Ihre Servicemitarbeitenden und die Menschen, die den Agenten pflegen. Alle Werte sind Listenpreise ohne Rabatte.

Jetzt die Nutzenseite. Angenommen, eine Servicemitarbeiterin braucht heute sechs Minuten pro Anfrage, dann binden 3.000 Anfragen 300 Stunden im Monat. Löst der Agent 60 Prozent, werden 180 Stunden frei. Im laufenden Betrieb kostet der Agent 219.000 Credits im Monat, rund 1.095 $, also etwa 6 $ pro frei gewordener Stunde. Nach meiner Einschätzung entscheidet der Verbrauch diesen Business Case selten. Aufbau, Tests und Pflege entscheiden ihn.

## Flex Credits, pro Gespräch oder pro Lösung: Welches Modell passt?

Salesforce bietet drei Wege, diesen Agenten zu bezahlen:

- **Flex Credits pro Aktion und Prompt.** Im Szenario 1.020 $ im Monat in Produktion.
- **Pro Gespräch.** Die Preisseite nennt 2 $ pro Gespräch, also 6.000 $ im Monat. Laut derselben Seite werden Flex Credits und Gesprächspreise nicht in derselben Org unterstützt, und Gesprächspreise gibt es nicht mit den Modellen PayGo und Pre-Commit.
- **Pro Lösung.** Der Help Agent, inzwischen Casey genannt (siehe [Casey und der Service Rep Assistant](../service-cloud-casey-und-service-rep-assistant/)), kostet 400 Credits oder 2 $ pro gelöstem Gespräch. Laut [Salesforce Deutschland](https://www.salesforce.com/de/news/press-releases/2026/06/30/salesforce-agentforce-help-agent/) fällt bei einer Übergabe keine Gebühr an, auch nicht für die zuvor getätigten Aufrufe von Data 360 oder Agentforce. Das Modell ist seit Juli 2026 allgemein verfügbar, Portale gehören zu den Kanälen. Bei 60 Prozent gelösten Gesprächen: 1.800 × 2 $ = 3.600 $ im Monat.

Wichtig ist, was als gelöst zählt. [Salesforce Ben](https://www.salesforceben.com/complete-guide-to-agentforce-pricing-options/) nennt die Bedingungen: mindestens zwei Nachrichtenwechsel, keine ausdrücklich negative Rückmeldung am Ende und entweder keine Eskalation an einen Menschen oder eine ausdrücklich positive Rückmeldung. Ohne Rückmeldung zählt eine Messaging-Sitzung als gelöst, wenn sie länger als zwei Stunden läuft. Ein Händler, der zweimal fragt, den Status liest und das Fenster schließt, wird abgerechnet. Einer, der einen falschen Termin bekam und ohne Rückmeldung gegangen ist, ebenfalls.

Der Break-even ist einfach. Flex Credits kosten im Szenario 68 Credits pro Gespräch, eine Lösung 400. Sobald mehr als 17 Prozent der Gespräche gelöst werden, sind Flex Credits günstiger. Bei 60 Prozent bräuchte der Agent zwölf oder mehr Aktionen pro Gespräch, bevor sich der Preis pro Lösung rechnet.

Für enge Händleranfragen würde ich deshalb mit Flex Credits planen. Der Preis pro Lösung hat in den ersten Monaten einen echten Vorteil: Solange niemand die Lösungsquote kennt, kostet ein schwacher Agent nichts, und Lösungen in der Sandbox sind kostenlos.

## Reichen die Credits Ihrer Edition?

Die [Editionen Core, Advanced und Max](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) enthalten 500.000, 1 Mio. und 2,75 Mio. Flex Credits. Die Preisseite für Agentforce nennt für Max „2.75M Flex Credits per org per year“; für Core und Advanced habe ich keine solche Angabe gefunden. Den Help Agent führt die Meldung zu den Editionen in Advanced und Max.

Das Szenario braucht im ersten Jahr rund 3 Mio. Credits, mehr als selbst der Max-Pool, und dieser Pool deckt auch jeden anderen verbrauchsabhängigen Agenten in der Org. Zusätzliche Credits gibt es als PayGo oder Pre-Commit. Planen Sie den Hochlauf: Ein Händleragent erreicht selten im ersten Monat das volle Volumen, und Credits, die für ein Jahr gebucht, aber erst ab dem vierten Monat genutzt werden, verfallen zum Teil. Wie Sie das pro Aktion schätzen, beschreibe ich in [Flex Credits: Agentforce-Kosten pro Aktion](../flex-credits-agentforce-kosten-pro-aktion/), die Editionen selbst in [Core, Advanced und Max](../salesforce-editionen-core-advanced-max/). Ob Sie Credits kaufen, bei der Verlängerung die Edition wechseln oder gar nichts in Salesforce bauen, ist eine Frage für [Make-or-buy und Lizenzprognosen](../../leistungen/make-or-buy-lizenzen/).

## Wann ist ein Agent für Händleranfragen die falsche Antwort?

- **Wenn Händler vor allem den Auftragsstatus wollen.** Eine Statusliste im [Händlerportal](../manufacturing-cloud-kundenportal/), die über die bestehende API aus SAP liest, antwortet ohne einen einzigen Credit. Ein Agent rechnet sich dort, wo Fragen als Freitext kommen, Aufträge und Ersatzteile mischen oder per E-Mail eintreffen.
- **Wenn der Liefertermin in SAP nicht gepflegt ist.** Dann wiederholt der Agent einen falschen Termin 3.000-mal im Monat. Den Integrationsweg beschreibe ich in [Agentforce und SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/).
- **Wenn die KI-Assistenten Ihrer Händler Ihr Salesforce abfragen.** Agentische Aufrufe über MCP oder APIs fallen unter Headless Platform Interactions, und dieser Satz steht noch auf „TBA“. Dieses Risiko betrachte ich in [MCP-Zugriffe als Budgetrisiko](../mcp-zugriffe-salesforce-budgetrisiko/).

## Wie budgetieren Sie einen Serviceagenten für Händler?

1. **Anfragen nach Typ zählen**, aus Cases und E-Mails der letzten drei Monate.
2. **Aktionen und Prompts pro Gespräch festlegen**, für jeden Typ.
3. **Das Dokumentenvolumen in MB messen**, nachdem veraltete Kataloge aussortiert sind.
4. **Die Sandbox planen**, mit einem Dokumentausschnitt und einer festen Zahl an Testgesprächen.
5. **Den Vertrag prüfen:** Pool der Edition, Ende der Bestellung und ob die Org schon mit Gesprächspreisen läuft.
6. **Zwei Testwochen fahren**, das Digital Wallet auswerten, neu rechnen und Warnschwellen auf den Credit-Pool setzen.

Ein Serviceagent für Händler kostet pro Gespräch wenig, das Budgetrisiko liegt in Dokumenten, Sandboxes und einem zu großen Credit-Pool. Wenn Sie einen zweiten Blick auf Ihre Rechnung möchten, [schreiben Sie mir](#contact).
