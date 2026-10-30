---
title: "Service Cloud: Casey und der Service Rep Assistant"
description: "Casey antwortet Kunden, der Service Rep Assistant unterstützt Servicemitarbeitende, das Contact Center ist in Europa live. Was das für den B2B-Service bedeutet."
pubDate: 2026-10-23
lang: de
slug: service-cloud-casey-und-service-rep-assistant
translationKey: service-cloud-casey-assistant
topic: service
categories: [ai]
tags: [Service Cloud, Agentforce, Contact Center, Kundenservice, Fertigung]
takeaways:
  - "Casey ist der fertige Agentforce-Agent von Salesforce für den Kundenservice, früher Help Agent genannt; er wird aus Wissensartikeln, PDFs und URLs eingerichtet und kann an Kanäle wie Telefon angebunden werden."
  - "Der Service Rep Assistant unterstützt Servicemitarbeitende, indem er Stimmung und Fallkontext in Echtzeit auswertet und einen Aktionsplan im Gesprächsverlauf anpasst."
  - "Erreicht Casey eine Richtliniengrenze, etwa bei Rabatten oder Kulanz, kann er eine Freigabeanfrage an einen Menschen in der Konsole weiterleiten."
  - "Das native Contact Center von Salesforce ist seit dem 16. Oktober 2026 in mehr als 30 europäischen Ländern allgemein verfügbar."
  - "Im B2B-Service der Fertigung entscheiden die Qualität der Wissensartikel und klare Freigaberegeln, ob Casey hilft oder zusätzliche Arbeit erzeugt."
faq:
  - q: "Was ist Casey in der Salesforce Service Cloud?"
    a: "Casey ist ein fertiger Agentforce-Agent für den Kundenservice, früher als Help Agent bekannt. Er beantwortet Kundenfragen auf Basis von Wissensartikeln, Dokumenten und Webseiten und kann in Kanälen wie Chat und Telefon arbeiten."
  - q: "Was macht der Service Rep Assistant?"
    a: "Er unterstützt Servicemitarbeitende während eines Falls, indem er Stimmung und Fallkontext in Echtzeit auswertet und einen Aktionsplan erstellt oder anpasst, wenn sich das Gespräch verändert."
  - q: "Ist das native Contact Center von Salesforce in Deutschland verfügbar?"
    a: "Laut Salesforce ist das native Contact Center seit dem 16. Oktober 2026 in mehr als 30 europäischen Ländern allgemein verfügbar. Die Details für Ihr Land und Ihre Edition sollten Sie mit Salesforce klären."
  - q: "Eignet sich Casey für den B2B-Service in der Fertigung?"
    a: "Für Standardfragen mit klaren Antworten wie Auftragsstatus, Dokumentation oder Rückgaberegeln ja. Bei technischer Diagnose, Gewährleistung oder Kulanz sollte Casey an einen Menschen übergeben oder eine Freigabe anfordern."
---

Salesforce ordnet sein Service-Angebot um zwei Arten von Hilfe: Casey, einen KI-Agenten, der Kunden direkt antwortet, und den Service Rep Assistant, der Servicemitarbeitende während eines Falls unterstützt. Im Oktober 2026 hat Salesforce außerdem sein natives Contact Center in Europa allgemein verfügbar gemacht. Für Hersteller mit B2B-Service können diese Neuerungen Antwortzeiten verkürzen und Serviceteams entlasten, aber nur, wenn das Wissen dahinter verlässlich ist und die Regeln für die Übergabe an Menschen klar sind. Es folgen ein Überblick über die Neuerungen und eine Einschätzung aus Kundensicht.

## Was hat Salesforce in der Service Cloud vorgestellt?

Am 13. Oktober 2026 hat Salesforce [zehn Neuerungen in der Service Cloud](https://www.salesforce.com/blog/?p=155993) zusammengefasst. Für Serviceorganisationen in Unternehmen sind diese am wichtigsten:

- **Natives Contact Center in Europa.** Seit 16. Oktober 2026 in mehr als 30 europäischen Ländern allgemein verfügbar, Australien und Neuseeland folgen im November. Es verbindet Telefon, digitale Kanäle, CRM-Daten und KI-Agenten in einem System.
- **Service Rep Assistant.** Wertet Stimmung und Fallkontext in Echtzeit aus und erstellt oder passt einen Aktionsplan für den Mitarbeitenden an, wenn sich das Gespräch verändert.
- **Slack Swarming.** Der Service Rep Assistant kann für einen schwierigen Fall einen eigenen Slack-Kanal öffnen, Experten hinzuziehen und den Fallkontext teilen. Das ist in der offenen Beta.
- **Workforce Engagement Management.** Planung für gemischte Teams aus Menschen und KI-Agenten, mit Echtzeitüberwachung der Einsatzpläne, Prognosen und Planungsvorschlägen in natürlicher Sprache.
- **Kundensignale und Themen-Clustering.** Live-Stimmung und Auswertungen über Fälle, Telefon und Chat sowie eine automatische Rangfolge der häufigsten Kontaktgründe.
- **Neue Kanäle.** WhatsApp mit Verkauf und Zahlung im Gespräch sowie RCS für Rich Media in nativen Nachrichtenverläufen.

Salesforce hat zudem neue Service-Cloud-Editionen vorgestellt, Core, Advanced und Max, die Service Cloud, Contact Center, Workforce Management, Slack und Tableau Next mit einem festen Kontingent an Verbrauchs-Credits bündeln.

```hinweis offen
Welche Edition welche KI-Funktionen enthält, sagt die Ankündigung nicht. Klären Sie das vor der Planung mit Salesforce.
```

## Wer ist Casey?

Casey ist der neue Name für das, was Salesforce bisher Help Agent nannte: ein fertiger Agentforce-Agent für den Kundenservice. Er gehörte zur Welle benannter Agenten, die Salesforce im September veröffentlicht hat, wie [Salesforce Ben von der Dreamforce berichtet](https://www.salesforceben.com/top-service-cloud-announcements-at-dreamforce-26/).

Laut den Demos ist die Einrichtung bewusst einfach gehalten:

1. Salesforce Knowledge hinzufügen und Artikel, PDFs und Webseiten als Quellen hineinziehen.
2. Casey an Kanäle anbinden, auch an das Telefon über eine Rufnummer.
3. Den Agenten auf demselben Bildschirm live testen.

Zwei verwandte Funktionen machen Casey für den Service in Unternehmen interessanter:

- **Freigaben für Agenten.** Erreicht Casey eine Richtliniengrenze, etwa einen Rabatt oder eine Kulanzleistung über einem Schwellenwert, kann er eine Freigabeanfrage an einen Menschen schicken. Dieser gibt sie in der Konsole frei oder lehnt sie ab.
- **Agent Optimizer.** Analysiert Gespräche, ordnet Kontaktgründe nach Häufigkeit und kann bestehende Flows und Apex-Klassen in Aktionen umwandeln, die der Agent nutzen kann.

## Wie unterscheidet sich der Service Rep Assistant von Casey?

Casey spricht mit dem Kunden. Der Service Rep Assistant arbeitet neben dem Menschen. Er verfolgt das Gespräch, erkennt die Stimmung, behält den Fallkontext im Blick und schlägt die nächsten Schritte vor. Salesforce hat außerdem eine neu gebaute Servicekonsole gezeigt, die Arbeit nach Kundenwert und Abwanderungsrisiko priorisiert und nicht nur nach dem Alter eines Falls.

Für viele B2B-Serviceorganisationen ist der Assistent der leichtere Einstieg. Der Mitarbeitende bleibt für die Antwort verantwortlich, und die KI spart Zeit beim Suchen, Zusammenfassen und Dokumentieren. Fehler fängt ein Mensch ab, bevor sie den Kunden erreichen.

## Was bedeutet das für den B2B-Service in der Fertigung?

Service in der Fertigung unterscheidet sich vom Endkundenservice. Kunden sind Unternehmen, Fragen sind oft technisch, und es steht mehr auf dem Spiel: Eine stehende Maschine kostet den Kunden jede Stunde Geld. Das bestimmt, wo Casey und der Assistent passen.

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

Der Start des Contact Centers ist für deutsche Hersteller relevant, die ihre Hotline heute auf einer separaten Telefonanlage betreiben. Ein natives Contact Center bringt Anrufe, Fälle und Kundendaten zusammen. Ob es passt, hängt von der bestehenden Telefonie, den Anforderungen an die Datenspeicherung und der Anbindung an Ticketsysteme in anderen Bereichen ab.

## Was muss vor dem Go-live stehen?

Aus Architektursicht entscheiden vier Dinge, ob Casey und der Assistent helfen:

1. **Verlässliches Wissen.** Casey antwortet aus Wissensartikeln und Dokumenten. Veraltete, widersprüchliche oder verwaiste Artikel führen zu falschen Antworten. Jeder Artikel braucht einen Verantwortlichen und ein Prüfdatum.
2. **Klare Freigaberegeln.** Legen Sie fest, welche Entscheidungen Casey allein treffen darf, welche eine Freigabe brauchen und bis zu welchem Betrag. Schreiben Sie sie vor dem ersten Gespräch auf.
3. **Saubere Daten.** Auftragsstatus, Anlagendaten und Verträge müssen in Salesforce aktuell oder zuverlässig aus dem ERP verfügbar sein. Sonst gibt der Agent überzeugte, aber veraltete Antworten.
4. **Messbare Ziele.** Zum Beispiel der Anteil der Anfragen ohne Mitarbeitende, die Erstlösungsquote oder die Zeit bis zur ersten Antwort, gemessen vorher und nachher.

Diese Punkte gelten für jeden KI-Agenten, und deshalb plädiere ich dafür, [Business Value und Datenqualität an die erste Stelle zu setzen](../agentforce-business-value-datenqualitaet/). Sie erklären auch, warum KI-Funktionen in die Zielarchitektur gehören und nicht nur in einen Piloten.

## Wie sollte eine Serviceorganisation starten?

Ein pragmatischer Weg:

```schritte
Mit dem Service Rep Assistant starten
  In einem Team, damit Menschen die Kontrolle behalten, während die Organisation lernt.
Wissen aufräumen
  Für die häufigsten Kontaktgründe, die das Themen-Clustering sichtbar macht.
Casey eng einführen
  Für einen Kanal und ein Thema, etwa Dokumentationsanfragen im Kundenportal.
Freigaben einrichten
  Für jede Entscheidung mit finanzieller Wirkung.
Messen und ausweiten
  Erst wenn die Zahlen es tragen.
```

Die Service Cloud entwickelt sich schnell, und die Wahl der richtigen Bausteine gehört zu [Architektur und Partnersteuerung](../../leistungen/salesforce-architektur/).
