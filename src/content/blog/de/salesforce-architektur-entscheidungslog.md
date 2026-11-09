---
title: "Entscheidungslog: Salesforce-Architektur nachvollziehbar"
description: "Warum ein Entscheidungslog für Salesforce-Architekturentscheidungen Partnerwechsel übersteht, was in einen Eintrag gehört und wem das Log gehören sollte."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: salesforce-architektur-entscheidungslog
translationKey: architecture-decision-log
topic: governance
categories: [architecture]
tags: [Entscheidungslog, Architekturentscheidung, Salesforce-Architektur, Partnersteuerung]
takeaways:
  - "Zum ADR-Format von Michael Nygard ergänze ich Optionen, Lizenz- und Kostenfolgen, Annahmen, wer entschied und wann neu zu prüfen ist."
  - "Das Log beantwortet zwei Jahre später die Frage, warum etwas so gebaut wurde, auch wenn Partner und Beteiligte längst gewechselt haben."
  - "Ins Log gehören Entscheidungen, die teuer zu ändern sind: Clouds und Add-ons, führendes System pro Datenbereich, Datenmodell, Sichtbarkeit und Integration."
  - "Das Log gehört dem Kunden und liegt in seinen Tools. Partner und interne Teams schlagen Einträge vor, das Architekturteam des Kunden hält es aktuell."
faq:
  - q: "Was ist ein Entscheidungslog?"
    a: "Ein Entscheidungslog ist eine Sammlung kurzer Einträge, in denen jede Architekturentscheidung mit ihrem Kontext, den geprüften Optionen, der Wahl, den Gründen und den Folgen steht. In der Softwareentwicklung heißt ein solcher Eintrag Architecture Decision Record, kurz ADR."
  - q: "Welche Entscheidungen gehören ins Entscheidungslog?"
    a: "Alle, die später teuer zu ändern sind oder die jemand ohne Kontext anzweifeln würde, etwa die Wahl einer Industry Cloud, das führende System für Kunden oder Preise oder das Sichtbarkeitsmodell."
  - q: "Wo sollte das Entscheidungslog liegen?"
    a: "In einem Tool, das dem Kunden gehört, etwa als Markdown-Dateien im Repository oder im Wiki des Unternehmens. Liegt es beim Partner, geht es mit dem Partner."
  - q: "Darf man eine Entscheidung im Log später ändern?"
    a: "Ja, aber eine angenommene Entscheidung wird nie stillschweigend umgeschrieben. Eine wesentliche Änderung bekommt einen neuen Eintrag, der alte den Status ersetzt und einen Verweis darauf. Kleine Korrekturen wie Links oder Namen bleiben in der Versionshistorie sichtbar."
draft: false
---

Ein Entscheidungslog hält die wesentlichen Salesforce-Architekturentscheidungen mit Kontext, geprüften Optionen, Wahl, Gründen und Folgen fest, eine kurze Seite pro Entscheidung. Es ist das Dokument, das zwei Jahre später erklärt, warum ein Prozess so gebaut wurde, auch wenn der Partner längst gewechselt hat. Ins Log gehören die Entscheidungen, die später teuer zu ändern sind: Clouds und Add-ons, das führende System pro Datenbereich, Datenmodell, Sichtbarkeit und Integrationsmuster. Das Log gehört dem Kunden. Partner und interne Teams schlagen Einträge vor, das Architekturteam des Kunden pflegt es.

## Warum gehen Architekturentscheidungen verloren?

Architekturentscheidungen fallen in Workshops, in Calls und in Kommentaren zu einem Ticket. Das Ergebnis steht danach im System, die Begründung nirgends. Solange dieselben Leute im Projekt sind, fällt das nicht auf. Zwei Jahre später fragt ein neuer IT-Leiter, warum die Händler-Accounts nie als Partnerkonten mit Partnernutzern aktiviert wurden, und niemand kann es beantworten.

Dann passiert eines von zwei Dingen. Entweder traut sich niemand, die Entscheidung anzufassen, und das Team baut um sie herum. Oder ein neuer Partner baut sie zurück, weil er die Gründe nicht kennt, und stößt dabei auf genau das Problem, das die ursprüngliche Entscheidung gelöst hat. Beides kostet mehr als die halbe Stunde, die ein Eintrag zum Schreiben braucht.

In Programmen mit mehreren Partnern kommt ein dritter Effekt dazu: Jeder Partner dokumentiert in seinem eigenen Confluence. Wechselt der Partner, gehen die Begründungen mit ihm.

## Was ist ein Entscheidungslog?

In der Softwareentwicklung heißt ein solcher Eintrag Architecture Decision Record, kurz ADR. Michael Nygard hat das Format 2011 beschrieben ([Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)): Titel, Kontext, Entscheidung, Status und Folgen. Für Salesforce-Programme ergänze ich Felder, nach denen Lenkungsausschüsse und Lizenzprüfungen fragen: welche Optionen geprüft wurden, Lizenz- und Kostenfolgen, die Annahmen dahinter, wer entschieden hat und wann neu zu prüfen ist. Auch Salesforce stellt ADRs in seinem [Well-Architected-Leitfaden](https://architect.salesforce.com/docs/architect/well-architected/guide/resource-and-cost-optimization-governance-patterns.html) neben Lizenz- und Kostenanalyse.

```vertiefung Vorlage
titel: Was steht in einem Eintrag?
- **Titel und Nummer**, etwa „E-014: Manufacturing Cloud wird nicht eingesetzt“.
- **Status:** vorgeschlagen, angenommen, abgelehnt, veraltet oder ersetzt durch einen anderen Eintrag.
- **Kontext:** die Ausgangslage in zwei bis vier Sätzen, mit Fakten statt Meinungen.
- **Optionen:** was geprüft wurde, jeweils mit Vor- und Nachteilen.
- **Entscheidung:** die Wahl in einem Satz.
- **Gründe:** warum diese Option, mit Zahlen, wo es sie gibt.
- **Folgen:** was dadurch leichter, schwerer oder teurer wird.
- **Lizenz- und Kostenfolgen:** nötige Produkte, Editionen und Add-ons, laufende Kosten.
- **Annahmen:** Nutzergruppen, Mengen und Limits, auf denen die Entscheidung beruht.
- **Neu prüfen, wenn:** die Änderung, die die Entscheidung wieder öffnen würde.
- **Wer und wann:** Datum und die Rolle oder das Gremium, das entschieden hat.
```

Ein Eintrag passt auf ein bis zwei Seiten. Wird er länger, stecken meist zwei Entscheidungen darin.

## Welche Entscheidungen gehören ins Log?

Nicht jede Feldentscheidung braucht einen Eintrag. Meine Faustregel: Ins Log gehört, was später teuer zu ändern ist oder was jemand ohne Kontext anzweifeln würde.

| Bereich | Beispiel einer Entscheidung |
|---|---|
| Clouds und Add-ons | Agentforce Field Service and Operations (früher Field Service) ja, Manufacturing Cloud nein |
| Führendes System | Listenpreise führt das ERP, Angebotsrabatte und Vertriebskontakte führt Salesforce |
| Datenmodell | Händler als Accounts mit Partnerkonto, Anlagen als Assets mit Hierarchie |
| Sichtbarkeit | Accounts privat; Führungskräfte sehen ihr Land über Rollenzweige, Freigaberegeln oder Territorien geben Zugriff über Ländergrenzen |
| Integration | Aufträge über Middleware, Lagerbestand live statt kopiert |
| Eigenentwicklung | eigener Konfigurator statt Standardprodukt |
| Plattform | eine Org für alle Länder statt einer Org pro Region |

Die Wahl von Clouds und Add-ons gehört zu den Bereichen, die am häufigsten eine dauerhafte Begründung brauchen, weil Partner oder Hersteller ein Produkt regelmäßig neu vorschlagen. Steht die Begründung im Log, dauert die Antwort fünf Minuten statt einer neuen Bewertung. Wie ich solche Bewertungen rechne, beschreibe ich unter [Make-or-buy und Lizenzen](../../leistungen/make-or-buy-lizenzen/).

```praxis
In einem Fertigungsprojekt habe ich die Manufacturing Cloud für den Umfang des Programms bewertet und abgelehnt, weil Sales Agreements, damals der Kern des Produkts, für das Geschäft dieses Kunden nicht relevant waren. Genau diese Art von Entscheidung gehört ins Log: Kommt das Produkt im nächsten Jahr wieder auf den Tisch, steht dort, warum es nicht passt und was sich ändern müsste, damit es passt.
```

Welche Fragen eine solche Bewertung klären muss, steht in [Manufacturing Cloud: Wann lohnt sie sich?](../manufacturing-cloud-wann-lohnt-sie-sich/).

## Das Log gehört dem Kunden und liegt in seinem Repository

Das Log gehört dem Kunden und liegt in seinen Tools. Ich lege es am liebsten als Markdown-Dateien im Salesforce-Repository des Kunden ab, eine Datei pro Entscheidung. Dann ist es versioniert, Änderungen laufen über einen Pull Request, und ein Entwickler findet die Begründung direkt neben dem Code. Service- oder Vertriebsleitung öffnen selten ein Repository, deshalb veröffentliche ich eine lesbare Ansicht im Wiki des Unternehmens oder lasse das Wiki die Heimat sein, solange es nicht dem Partner gehört. Die Gründe sind dieselben wie bei [Repository und Pipeline](../warum-kunden-devops-tools-selbst-besitzen-sollten/).

Die Rollen sind einfach:

- **Partner und interne Teams schlagen Einträge vor**, wenn ihr Design eine Architekturfrage berührt. Ein Pull Request, der eine neue Integration oder ein neues Objekt einführt, verweist auf den Eintrag.
- **Das Architekturteam des Kunden**, geführt vom Architekten auf Kundenseite mit benannter Vertretung, prüft den Vorschlag, ergänzt Optionen und hält das Log aktuell. Entfernt sich der Bau vom Zielbild, spricht er es mit Verweis auf den Eintrag an.
- **Fachbereich und IT-Leitung** entscheiden die großen Einträge, etwa Clouds und Add-ons, und stehen namentlich darin.

Eine angenommene Entscheidung wird nie stillschweigend umgeschrieben. Ändert sich die Lage wesentlich, bekommt der alte Eintrag den Status „ersetzt“ und einen Verweis auf den neuen. Korrekturen an Links, Namen oder Verantwortlichen bleiben in der Versionshistorie sichtbar. So bleibt sichtbar, was früher galt und warum es sich geändert hat.

## Im laufenden Programm: neue Partner, Design-Reviews, Lenkungsausschuss

Ein Log, das niemand liest, ist Papierkram. Drei Gelegenheiten machen es nützlich:

- **Einarbeitung neuer Partner.** Ein neuer Partner liest die Einträge, bevor er das erste Angebot schreibt. Damit fallen die Vorschläge weg, die etwas zurückbauen wollen, das aus gutem Grund so ist.
- **Review von Partner-Designs.** Bevor ein Design gebaut wird, prüfe ich es gegen die Einträge. Widerspricht es einer Entscheidung, gibt es zwei Wege: das Design anpassen oder einen neuen Eintrag vorschlagen, der die alte Entscheidung ersetzt.
- **Lenkungsausschuss.** Wird eine Entscheidung dort angezweifelt, liegt der Eintrag mit Optionen und Gründen auf dem Tisch. Die Diskussion beginnt dann bei der Frage, was sich seitdem geändert hat.

## Die fünf meistdiskutierten Entscheidungen nachtragen

Beginnen Sie mit den fünf Entscheidungen, die in Ihrem Programm am häufigsten angezweifelt werden, eine Vorlage im Wiki braucht es dafür nicht. Für den ersten Eintrag eignet sich fast immer die Frage, die im letzten Lenkungsausschuss offen geblieben ist. Schreiben Sie für jede einen Eintrag, auch rückwirkend. Danach gilt die Regel, dass eine wesentliche Architekturentscheidung angenommen ist, bevor sie für die Produktion gebaut wird. Dringende Änderungen bekommen einen schnellen Weg und werden binnen weniger Tage dokumentiert. Nach einem halben Jahr haben Sie zwanzig bis dreißig Einträge und eine Dokumentation, die ein neuer Partner in einem Nachmittag liest. Wie ich das Log als Architekt auf Kundenseite führe, beschreibe ich unter [Salesforce-Architektur auf Kundenseite](../../leistungen/salesforce-architektur/).
