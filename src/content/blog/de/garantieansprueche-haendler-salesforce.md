---
title: "Garantieansprüche von Händlern in Salesforce prüfen"
description: "Wie die Manufacturing Cloud Garantiebedingungen, Garantieansprüche von Händlern und Regress beim Lieferanten abbildet und warum alles an den Anlagendaten hängt."
pubDate: 2026-10-27
lang: de
slug: garantieansprueche-haendler-salesforce
translationKey: manufacturing-cloud-warranty-claims
topic: service
category: manufacturing-cloud
tags: [Manufacturing Cloud, Garantie, Händler, After-Sales, Fertigung]
series: { id: manufacturing-cloud, part: 6 }
takeaways:
  - "Die Manufacturing Cloud bildet Garantien in drei Ebenen ab: Garantiebedingungen pro Produktfamilie oder Produkt, Anpassungen pro Teil und die Garantie der einzelnen Anlage."
  - "Händler reichen Garantieansprüche über ein Portal ein, mit Teilen, Arbeitszeit und Kosten. Ein Prüfer passt die Beträge an und gibt frei."
  - "Ob ein Anspruch gedeckt ist, hängt an den Daten der Anlage: Seriennummer, Kauf- oder Installationsdatum und Nutzung. Fehlen sie, kann weder ein Mensch noch ein Agent sauber prüfen."
  - "Aus einem Garantieanspruch erzeugt Salesforce pro verursachendem Teil einen Regressanspruch an den Lieferanten."
  - "Die Garantie ist ein kaufmännischer Prozess. Der Einsatz vor Ort, Wartungsverträge und Reaktionszeiten gehören zu Field Service."
faq:
  - q: "Wie reichen Händler Garantieansprüche in Salesforce ein?"
    a: "Über ein Partnerportal auf Experience Cloud. Laut Trailhead legen Partner den Anspruch mit der betroffenen Anlage, Fehler- und Reparaturdatum und den Kosten für Teile, Arbeit und Transport an und setzen ihn auf eingereicht. Ansprüche per E-Mail oder Telefon kann ein Sachbearbeiter erfassen."
  - q: "Was ist ein Supplier Recovery Claim?"
    a: "Ein Regressanspruch an den Lieferanten, wenn ein Garantiefall auf ein zugekauftes Teil zurückgeht. Salesforce erzeugt aus einem Garantieanspruch pro verursachendem Teil einen Entwurf, der an den Lieferanten eingereicht wird."
  - q: "Kann ein Agent Garantieansprüche prüfen?"
    a: "Laut Salesforce prüft der Warranty Claims Adjudication Agent ab Winter '27 die Deckung und markiert mögliche Betrugsfälle. Er ist auf vollständige Anlagen- und Garantiedaten angewiesen."
draft: false
---

Die Manufacturing Cloud lohnt sich für Garantieprozesse, wenn Händler und Servicepartner regelmäßig Garantieansprüche einreichen und die Prüfung heute viel Handarbeit kostet. Sie bildet Garantiebedingungen, die Garantie jeder Anlage, die Ansprüche der Händler und den Regress beim Lieferanten in einem Datenmodell ab. Ob ein Anspruch gedeckt ist, entscheidet sich an den Daten der Anlage: Seriennummer, Kauf- oder Installationsdatum und Nutzung. Wie Teil 4 und 5 schreibe ich diesen Teil als Leitfaden für die Bewertung, nicht als Projektbericht. Die Garantie behandle ich als kaufmännischen Prozess, den Einsatz vor Ort deckt die Field-Service-Serie ab.

## Wie bildet die Manufacturing Cloud eine Garantie ab?

In drei Ebenen. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/warranty-administration-and-claims-management-in-manufacturing-cloud/administer-warranty-terms) gilt:

- **Warranty Term, die Garantiebedingung.** Sie enthält Art, Dauer und Beginn der Garantie, die Deckung für Arbeit, Teile und Nebenkosten in Prozent, die abgedeckte Nutzung und Ausschlüsse. Eine Bedingung kann eine ganze Produktfamilie, ein Produkt oder einzelne Anlagen abdecken.
- **Warranty Term Coverage, die Anpassung pro Teil.** Damit wird eine Bedingung für ein bestimmtes Teil erweitert oder eingeschränkt. Trailhead nennt als Beispiel einen Gabelstapler, bei dem der Motor zusätzlich gedeckt und der Hubmast ausgeschlossen ist.
- **Asset Warranty, die Garantie der einzelnen Anlage.** Sie wird beim Kauf oder bei der Installation zugeordnet. Für eine einzelne Anlage lässt sich die Deckung erweitern oder einschränken, etwa als Kulanz.

Für Hersteller mit vielen Varianten ist die mittlere Ebene der eigentliche Nutzen. Statt für jede Kombination eine eigene Bedingung zu pflegen, gibt es eine Grundbedingung pro Familie und Ausnahmen pro Teil. Wer heute Garantiebedingungen in Tabellen oder Verträgen sucht, sollte diese Struktur zuerst auf Papier nachbauen. Dabei zeigt sich schnell, ob die eigenen Regeln in drei Ebenen passen.

## Wie läuft ein Garantieanspruch vom Händler bis zur Gutschrift?

Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/warranty-administration-and-claims-management-in-manufacturing-cloud/capture-warranty-claims) reicht der Partner den Anspruch über ein Partnerportal auf Experience Cloud ein. Kommt er per E-Mail, Telefon oder Web, legt ein Sachbearbeiter ihn an. Der Anspruch besteht aus mehreren Objekten:

| Objekt | Was darin steht |
|---|---|
| Claim | Nummer, Account, Schwere, Art und Grund des Anspruchs |
| Claim Item | Betroffene Anlage, Fehler- und Reparaturdatum, Nutzung der Anlage |
| Claim Coverage | Verursachendes Teil und Fehlercode, verknüpft mit der Garantie der Anlage |
| Claim Coverage Payment Detail | Kosten pro Posten, etwa Teile, Arbeit oder Transport |
| Claim Participant | Beteiligte und ihre Rollen |

Der Partner trägt pro Posten den geforderten Betrag ein und setzt den Anspruch auf eingereicht. Der Prüfer trägt den genehmigten Betrag ein. Auf der [Produktseite](https://www.salesforce.com/manufacturing/cloud/service/) nennt Salesforce außerdem automatische Freigaben über Geschäftsregeln. Laut [Produktseite](https://www.salesforce.com/manufacturing/cloud/) kommt mit Winter '27 der Warranty Claims Adjudication Agent dazu, der die Deckung prüft und mögliche Betrugsfälle markiert, und eine geführte Rücksendung von Garantieteilen für Händler.

Die Gutschrift an den Händler würde ich wie bei den Boni in [Teil 5](../rebate-management-haendlerboni/) im ERP buchen. Salesforce prüft und gibt frei, eine Schnittstelle überträgt den genehmigten Betrag, und die Finanzabteilung bucht. Diese Schnittstelle gehört von Anfang an in die Planung, sonst sieht der Händler einen genehmigten Anspruch im Portal und wartet trotzdem auf sein Geld.

## Warum hängt alles an den Anlagendaten?

Weil jede Prüfung eine Frage an die Anlage ist. Ist diese Seriennummer noch in der Garantie? Seit wann läuft sie, ab Kauf oder ab Installation? Liegt die Nutzung unter dem Grenzwert? Ist das defekte Teil gedeckt?

Diese Fragen beantwortet die Asset Warranty nur, wenn die Anlage mit ihren Daten in Salesforce steht. Bei vielen Herstellern ist genau das die Lücke:

- **Verkauf über Händler.** Der Hersteller liefert an den Händler, der Händler verkauft an den Endkunden. Ob und wann die Anlage installiert wurde, weiß nur der Händler. Ohne Registrierung beim Verkauf fehlt das Startdatum der Garantie.
- **Installierte Basis im ERP.** Seriennummern stehen im ERP oder in der Fertigung, aber nicht als Anlagen in Salesforce. Dann braucht es eine Schnittstelle, bevor der erste Anspruch geprüft werden kann.
- **Nutzung.** Betriebsstunden oder Zyklen kommen von der Anlage selbst, vom Händler oder gar nicht. Ist die Nutzung Teil der Bedingung, braucht sie eine Quelle.

Für den Agenten aus Winter '27 gilt das noch stärker. Ein Agent, der Deckung prüft, liest dieselben Felder wie ein Mensch, nur schneller und ohne nachzufragen. Fehlen die Daten, bewertet er auf Lücken. Warum ich bei Agenten zuerst auf die Datenqualität schaue, beschreibe ich in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/).

Laut der Übersicht der Portallizenzen, die ich in [Teil 7](../manufacturing-cloud-kundenportal/) beschreibe, deckt die Kundenlizenz Customer Community Plus for Manufacturing Anlagen und Garantien ab, Garantieansprüche nennt Salesforce bei der Partnerlizenz. Für Händler, die Ansprüche einreichen, plant man also Partnerlizenzen ein.

## Was ist Supplier Recovery?

Der Regress beim Lieferanten. Geht ein Garantiefall auf ein zugekauftes Teil zurück, holt sich der Hersteller die Kosten vom Lieferanten zurück. Laut [Salesforce-Hilfe](https://help.salesforce.com/s/articleView?id=sf.mfg_warranties_suppliers_create_claims.htm&language=en_US&type=5) erzeugt eine Aktion am Garantieanspruch pro verursachendem Teil einen Regressanspruch als Entwurf. Er wird geprüft und an den Lieferanten eingereicht.

Damit das funktioniert, muss das verursachende Teil im Anspruch sauber erfasst sein, mit Fehlercode und Zuordnung zum Lieferanten. Das ist der Teil des Prozesses, den Händler am wenigsten interessiert, weil er ihnen nichts bringt. Ein Pflichtfeld im Portal und eine Prüfung durch den Sachbearbeiter sind deshalb mehr wert als eine spätere Auswertung.

## Wo endet die Garantie, wo beginnt Field Service?

An der Tür des Kunden. Die Manufacturing Cloud klärt, ob ein Schaden gedeckt ist, wer welchen Betrag bekommt und wer am Ende zahlt. Wer wann mit welchem Ersatzteil zum Kunden fährt, ist eine Frage für Field Service. Dasselbe gilt für Wartungsverträge und zugesagte Reaktionszeiten, die in Salesforce über Service-Verträge und Entitlements laufen. Wie das aussieht, beschreibt [Teil 5 der Field-Service-Serie](../salesforce-field-service-wartungsvertraege/).

Beide Themen treffen sich an der Anlage. Dieselbe Anlage trägt die Garantie, die Wartungshistorie und die Arbeitsaufträge. Wer beides einführt, sollte das Anlagenmodell einmal entwerfen, nicht pro Projekt. Ob sich Field Service lohnt, beschreibt die [Field-Service-Serie](../salesforce-field-service-lohnt-sich/).

## Wann lohnt sich die Garantieabwicklung in Salesforce?

Ich würde sie empfehlen, wenn mehrere dieser Punkte zutreffen:

- **Ansprüche kommen von außen.** Händler und Servicepartner reichen regelmäßig Garantieansprüche ein, heute per E-Mail oder Formular.
- **Die Bedingungen sind vielfältig.** Mehrere Produktfamilien, Teile mit eigenen Regeln, Kulanz für einzelne Anlagen.
- **Regress lohnt sich.** Ein relevanter Teil der Garantiekosten geht auf zugekaufte Teile zurück.
- **Die Anlagendaten sind da oder kommen.** Seriennummern und Startdaten liegen in Salesforce oder können per Schnittstelle kommen.

Zurückhaltend wäre ich bei wenigen Garantiefällen im Jahr, die eine Qualitätsabteilung im ERP gut bearbeitet, und wenn die Anlagendaten fehlen und niemand sie beschaffen will. Dann bringt das Datenmodell wenig. Ob sich die Manufacturing Cloud insgesamt lohnt, behandelt [Teil 1 der Serie](../manufacturing-cloud-wann-lohnt-sie-sich/).

## Wo sollten Sie anfangen?

Bevor die erste Garantiebedingung angelegt wird, klären Sie vier Punkte:

1. **Anlagendaten.** Wo stehen Seriennummer, Kauf- oder Installationsdatum und Nutzung, und wie kommen sie nach Salesforce?
2. **Bedingungen.** Lassen sich die eigenen Regeln in Grundbedingung, Ausnahmen pro Teil und Anpassung pro Anlage abbilden?
3. **Einreichung.** Welche Felder füllt der Händler im Portal, und welche sind Pflicht, auch für den Regress?
4. **Gutschrift.** Wie kommt der genehmigte Betrag ins ERP, und wann sieht der Händler, dass gezahlt wurde?

Die Garantieabwicklung in der Manufacturing Cloud ist so gut wie die Anlagendaten, auf denen sie prüft. Wenn Sie Garantieprozesse mit Händlern in Salesforce bewerten, [schreiben Sie mir](#contact).
