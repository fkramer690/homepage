---
title: "Service Cloud: Casey und der Service Rep Assistant"
description: "Casey antwortet Kunden, der Service Rep Assistant unterstützt Servicemitarbeitende, Agentforce Contact Center startet in Europa. Was das für den B2B-Service bedeutet."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: service-cloud-casey-und-service-rep-assistant
translationKey: service-cloud-casey-assistant
topic: service
categories: [ai]
tags: [Service Cloud, Agentforce, Contact Center, Kundenservice, Fertigung]
takeaways:
  - "Casey, der benannte Help Agent von Salesforce, wird aus Wissensartikeln, PDFs und URLs eingerichtet und läuft in Kanälen wie Telefon."
  - "Der Service Rep Assistant wertet Stimmung und Fallkontext in Echtzeit aus und passt den Aktionsplan im Gesprächsverlauf an."
  - "Salesforce hat Freigabeanfragen von Casey an Menschen bei Richtliniengrenzen gezeigt; prüfen Sie den Status, bevor Sie damit planen."
  - "Salesforce hat Agentforce Contact Center ab 16. Oktober 2026 in mehr als 30 europäischen Ländern als allgemein verfügbar angekündigt."
  - "Im B2B-Service der Fertigung entscheiden die Qualität der Wissensartikel und klare Freigaberegeln, ob Casey hilft oder zusätzliche Arbeit erzeugt."
faq:
  - q: "Was ist Casey in der Salesforce Service Cloud?"
    a: "Casey ist der benannte, vorkonfigurierte Help Agent von Salesforce für den Kundenservice. Er beantwortet Kundenfragen auf Basis von Wissensartikeln, Dokumenten und Webseiten und kann in Kanälen wie Chat und Telefon arbeiten."
  - q: "Was macht der Service Rep Assistant?"
    a: "Er unterstützt Servicemitarbeitende während eines Falls, indem er Stimmung und Fallkontext in Echtzeit auswertet und einen Aktionsplan erstellt oder anpasst, wenn sich das Gespräch verändert."
  - q: "Ist das native Contact Center von Salesforce in Deutschland verfügbar?"
    a: "Salesforce hat Agentforce Contact Center ab 16. Oktober 2026 in mehr als 30 europäischen Ländern einschließlich Deutschland als allgemein verfügbar angekündigt. Bestellbarkeit, Telefonie-Optionen und Aktivierungstermin für Ihr Land und Ihre Edition sollten Sie vor der Planung mit Salesforce klären."
  - q: "Eignet sich Casey für den B2B-Service in der Fertigung?"
    a: "Für Standardfragen mit klaren Antworten wie Auftragsstatus, Dokumentation oder Rückgaberegeln kann er passen, wenn Identität, Rechte und Datenzugriff je Kundenkonto geklärt sind. Bei technischer Diagnose, Gewährleistung oder Kulanz sollte Casey an einen Menschen übergeben oder eine Freigabe anfordern."
---

Dieser Beitrag betrachtet zwei Arten von Hilfe in der Salesforce Service Cloud: Casey, einen KI-Agenten, der Kunden direkt antwortet, und den Service Rep Assistant, der Servicemitarbeitende während eines Falls unterstützt. Im Oktober 2026 hat Salesforce außerdem Agentforce Contact Center in Europa als allgemein verfügbar angekündigt. Für Hersteller mit B2B-Service können diese Neuerungen Antwortzeiten verkürzen und Serviceteams entlasten, aber nur, wenn das Wissen dahinter verlässlich ist und die Regeln für die Übergabe an Menschen klar sind. Es folgen ein Überblick über die Neuerungen und eine Einschätzung aus Kundensicht.

## Ausgewählte Neuerungen in der Service Cloud vom 13. Oktober 2026

Am 13. Oktober 2026 hat Salesforce [zehn Neuerungen in der Service Cloud](https://www.salesforce.com/blog/?p=155993) zusammengefasst. Für Serviceorganisationen in Unternehmen sind diese am wichtigsten:

- **Agentforce Contact Center in Europa.** Ab 16. Oktober 2026 in mehr als 30 europäischen Ländern als allgemein verfügbar angekündigt, Australien und Neuseeland folgen im November. Es verbindet Telefon, digitale Kanäle, CRM-Daten und KI-Agenten in einem System.
- **Service Rep Assistant.** Wertet Stimmung und Fallkontext in Echtzeit aus und erstellt oder passt einen Aktionsplan für den Mitarbeitenden an, wenn sich das Gespräch verändert.
- **Slack Swarming.** Der Service Rep Assistant kann für einen schwierigen Fall einen eigenen Slack-Kanal öffnen, Experten hinzuziehen und den Fallkontext teilen. Das ist in der offenen Beta.
- **Workforce Engagement Management.** Planung für gemischte Teams aus Menschen und KI-Agenten, mit Echtzeitüberwachung der Planeinhaltung sowie Prognosen und Planungsvorschlägen in natürlicher Sprache.
- **Kundensignale und Themen-Clustering.** Live-Stimmung und Auswertungen über Fälle, Telefon und Chat sowie eine automatische Rangfolge der häufigsten Kontaktgründe.
- **Neue Kanäle.** WhatsApp mit Verkauf und Zahlung im Gespräch sowie RCS für Rich Media in nativen Nachrichtenverläufen, jeweils abhängig von Land, Edition, Add-on, Mobilfunkanbieter und Zahlungsdienstleister.

Salesforce hat zudem neue Service-Cloud-Editionen vorgestellt, Core, Advanced und Max, mit 500.000, 1 Million und 2,75 Millionen Flex Credits. Laut der [Ankündigung der Editionen](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) vom September 2026 ist der Help Agent (Casey) in Advanced und Max enthalten, Service Rep Assistant und Workforce Engagement in Max.

```hinweis offen
Die Ankündigung deckt nicht jede KI-Funktion und nicht das native Contact Center ab. Klären Sie den genauen Umfang Ihrer Edition und mögliche Add-ons vor der Planung mit Salesforce.
```

## Wer ist Casey?

Casey ist der benannte, vorkonfigurierte Help Agent von Salesforce für den Kundenservice. Er gehörte zur Welle benannter Agenten, die Salesforce [im September 2026 veröffentlicht](https://www.salesforce.com/news/stories/agentforce-job-ready-ai-agents/) hat.

In den Demos von Salesforce ist die Einrichtung bewusst einfach gehalten:

1. Salesforce Knowledge hinzufügen und Artikel, PDFs und Webseiten als Quellen hineinziehen.
2. Casey in unterstützten Kanälen bereitstellen, auch am Telefon über eine Rufnummer.
3. Den Agenten auf demselben Bildschirm live testen.

Gezeigt wurden zwei verwandte Funktionen, die Casey für den Service in Unternehmen interessanter machen. Für die erste habe ich keine Produktdokumentation gefunden, deshalb behandle ich beide als Ankündigung, bis Ihre Org sie zeigt:

- **Freigaben für Agenten.** In der Dreamforce-Demo erreichte Casey eine Richtliniengrenze, etwa einen Rabatt oder eine Kulanzleistung über einem Schwellenwert, und schickte eine Freigabeanfrage an einen Menschen, der sie in der Konsole freigab oder ablehnte. Einen solchen Freigabeschritt für Entscheidungen oberhalb festgelegter Schwellenwerte können Sie auch selbst umsetzen.
- **Agent Optimizer.** Analysiert Gespräche und gruppiert Kontaktgründe. In Agentforce Builder sucht er nach vorhandenen Aktionen, Flows und Apex und legt einen Platzhalter an, wo nichts passt; ein Entwickler vervollständigt ihn anschließend. Salesforce führt ihn in Winter '27 als Beta, die Casey-spezifische Optimierung war für November 2026 angekündigt.

## Der Service Rep Assistant arbeitet neben dem Menschen

Casey spricht mit dem Kunden. Der Service Rep Assistant arbeitet neben dem Menschen. Er verfolgt das Gespräch, erkennt die Stimmung, behält den Fallkontext im Blick und schlägt die nächsten Schritte vor. In der Demo hat Salesforce außerdem eine neu gestaltete Servicekonsole gezeigt, die Arbeit nach Kundenwert und Abwanderungsrisiko priorisierte und nicht nur nach dem Alter eines Falls; prüfen Sie, ob Ihre Edition das als Standard bietet.

Für viele B2B-Serviceorganisationen ist der Assistent der leichtere Einstieg, sofern Ihre Edition ihn enthält (bei den neuen Editionen ist das Max) oder Sie ihn als Add-on kaufen. Der Mitarbeitende bleibt für die Antwort verantwortlich, und die KI spart Zeit beim Suchen, Zusammenfassen und Dokumentieren. Ein Mensch kann Vorschläge prüfen und korrigieren, bevor sie den Kunden erreichen.

## Was bedeutet das für den B2B-Service in der Fertigung?

Service in der Fertigung unterscheidet sich vom Endkundenservice. Kunden sind Unternehmen, Fragen sind oft technisch, und es steht mehr auf dem Spiel: Ein Maschinenstillstand kostet den Kunden mit jeder Stunde Geld. Das bestimmt, wo Casey und der Assistent passen.

**Gute Kandidaten für Casey:**

- Auftrags- und Lieferstatus, wenn die Daten in Salesforce aktuell sind.
- Anfragen nach Dokumentation, Handbüchern, Zertifikaten oder Ersatzteilinformationen.
- Standardfragen zu Rückgaberegeln, Servicezeiten oder Vertragsbedingungen.
- Das Einsammeln der richtigen Informationen, bevor ein Fall bei einem Techniker landet, etwa Seriennummer, Fehlercode und Fotos.

**Besser bei Menschen, unterstützt durch den Assistenten:**

- Technische Diagnose komplexer Störungen.
- Gewährleistungs- und Kulanzentscheidungen, die über Freigaben mit klaren Schwellenwerten laufen sollten.
- Eskalationen von Schlüsselkunden, bei denen die Beziehung wichtiger ist als die Geschwindigkeit.

![Wer im B2B-Service was beantwortet: Casey antwortet dem Kunden zu Auftrags- und Lieferstatus, Dokumentation, Handbüchern, Zertifikaten und Ersatzteilinformationen, Standardfragen zu Rückgaben, Servicezeiten und Verträgen und sammelt Seriennummer, Fehlercode und Fotos ein. Bei Rabatt oder Kulanz über dem Schwellenwert schickt Casey eine Freigabeanfrage an Servicemitarbeitende. Diese übernehmen, unterstützt vom Service Rep Assistant, die technische Diagnose komplexer Störungen, Gewährleistungs- und Kulanzentscheidungen und Eskalationen von Schlüsselkunden und geben in der Konsole frei oder lehnen ab. Vor dem Go-live: verlässliches Wissen, klare Freigaberegeln, saubere Daten, messbare Ziele.](../../../assets/blog/casey-or-service-rep-de.png)

Der Start von Agentforce Contact Center ist für deutsche Hersteller relevant, die ihre Hotline heute auf einer separaten Telefonanlage betreiben. Ein natives Contact Center bringt Anrufe, Fälle und Kundendaten zusammen. Lassen Sie sich von Salesforce bestätigen, dass die Pakete für Deutschland bestellbar sind, bevor Sie planen. Ob es passt, hängt von der bestehenden Telefonie, den Anforderungen an die Datenspeicherung und der Anbindung an Ticketsysteme in anderen Bereichen ab.

## Vor dem Go-live muss das Wissen stimmen

Aus Architektursicht entscheiden diese Punkte, ob Casey und der Assistent helfen:

1. **Verlässliches Wissen.** Casey antwortet aus Wissensartikeln und Dokumenten. Veraltete, widersprüchliche oder verwaiste Artikel führen zu falschen Antworten. Meine Regel: Jeder Artikel braucht einen Verantwortlichen und ein Prüfdatum.
2. **Klare Freigaberegeln.** Legen Sie fest, welche Entscheidungen Casey allein treffen darf, welche eine Freigabe brauchen und bis zu welchem Betrag. Schreiben Sie sie vor dem ersten Gespräch auf.
3. **Saubere Daten.** Auftragsstatus, Anlagendaten und Verträge müssen in Salesforce aktuell oder zuverlässig aus dem ERP verfügbar sein. Sonst gibt der Agent selbstsicher formulierte, aber veraltete Antworten.
4. **Identität und Rechte.** Welcher Portalnutzer darf welche Aufträge, Assets, Verträge und Preise sehen, und welche Aktionen (lesen, ändern, stornieren, gutschreiben) darf der Agent für ihn ausführen. Ein Agent darf einem Kunden nie Daten eines anderen zeigen.
5. **Überwachung und Ausweichverfahren.** Antworten, Aktionen und Übergaben werden protokolliert, und der Agent weiß, was zu tun ist, wenn das ERP ausfällt oder Quellen sich widersprechen. PDFs und Webseiten als Quellen bringen außerdem das Risiko der [Prompt Injection](../prompt-injection-haendlerportal-agentforce/).
6. **Messbare Ziele.** Zum Beispiel der Anteil der Anfragen, die ohne Servicemitarbeitende gelöst werden, die Erstlösungsquote oder die Zeit bis zur ersten Antwort, gemessen vorher und nachher.

Diese Punkte gelten für jeden KI-Agenten, und deshalb plädiere ich dafür, [Business Value und Datenqualität an die erste Stelle zu setzen](../agentforce-business-value-datenqualitaet/). Sie erklären auch, warum KI-Funktionen in die Zielarchitektur gehören und nicht nur in einen Piloten.

## Mit dem Service Rep Assistant in einem Team beginnen

Welche Bausteine der Service Cloud passen, kläre ich im Rahmen von [Architektur und Partnersteuerung](../../leistungen/salesforce-architektur/). Mein Weg:

```schritte
Lizenzen prüfen
  Ob Service Rep Assistant und Casey in Ihrer Edition stecken oder ein Add-on oder der Wechsel auf Max nötig ist.
Mit dem Service Rep Assistant starten
  In einem Team, damit Menschen die Kontrolle behalten, während die Organisation lernt.
Wissen aufräumen
  Für die häufigsten Kontaktgründe, die das Themen-Clustering sichtbar macht, sofern es lizenziert und verfügbar ist.
Casey eng einführen
  Für einen Kanal und ein Thema, etwa Dokumentationsanfragen im Kundenportal.
Freigaben einrichten
  Für jede Entscheidung mit finanzieller Wirkung.
Messen und ausweiten
  Erst wenn die Zahlen es tragen.
```
