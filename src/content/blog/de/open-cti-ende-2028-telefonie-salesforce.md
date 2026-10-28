---
title: "Open CTI endet 2028: Welche Telefonie für Salesforce?"
description: "Salesforce schaltet Open CTI am 28. Februar 2028 ab. Welche Wege es zu Salesforce Voice gibt, was sie kosten und was das für Genesys, Mirage und Teams heißt."
pubDate: 2026-10-28
lang: de
slug: open-cti-ende-2028-telefonie-salesforce
translationKey: open-cti-retirement-telephony
topic: service
categories: [architecture]
contactBrief: integration
tags: [Open CTI, Salesforce Voice, Telefonie, Service Cloud, Genesys, Microsoft Teams]
takeaways:
  - "Salesforce schaltet Open CTI am 28. Februar 2028 ab. Danach funktionieren Softphones, Call-Center-Adapter und eigene CTI-Logik auf Basis von Open CTI nicht mehr."
  - "Der Nachfolger ist Salesforce Voice, früher Service Cloud Voice. Es gibt vier Wege: den eigenen Telefonieanbieter behalten, Amazon Connect selbst oder über Salesforce betreiben oder Telefonie direkt von Salesforce."
  - "Laut Preisliste kostet Partner Contact Center 50 € pro Nutzer und Monat zusätzlich zur Lizenz des Telefonieanbieters, das native Contact Center 125 €."
  - "Wichtiger als die Abschaltung selbst ist der Umbau: Anrufe werden VoiceCall-Datensätze statt Aufgaben, Screen Pop und Präsenz laufen über Omni-Channel, Berichte müssen neu gebaut werden."
  - "Wer heute ein Open-CTI-Produkt nutzt, sollte den Anbieter jetzt nach seinem Weg zu Salesforce Voice fragen und Rufnummern, Nutzer, Berichte und eigene Logik erfassen."
faq:
  - q: "Wann wird Open CTI abgeschaltet?"
    a: "Am 28. Februar 2028. Seit dem 16. Februar 2026 ist Open CTI in neu angelegten Agentforce-Service-Orgs nicht mehr verfügbar. Bestehende Orgs können es bis zur Abschaltung weiter nutzen, bekommen aber keine neuen Funktionen."
  - q: "Was ersetzt Open CTI?"
    a: "Salesforce Voice, früher Service Cloud Voice. Es bringt Anrufe in dasselbe Omni-Channel-Fenster wie Chat und E-Mail, legt jeden Anruf als VoiceCall-Datensatz an und liefert Transkripte, die Agentforce nutzen kann."
  - q: "Kann ich Genesys oder Microsoft Teams weiter nutzen?"
    a: "Ja, über Partner Contact Center, den früheren Weg Partner Telephony. Genesys bietet dafür CX Cloud mit einem Voice-Paket an, für Teams Phone gibt es Partnerprodukte, etwa Unaric Voice. Prüfen Sie, ob Ihr Anbieter ein Paket für Salesforce Voice hat."
  - q: "Was kostet Salesforce Voice?"
    a: "Laut EU-Preisseite (Oktober 2026) kostet Partner Contact Center 50 € pro Nutzer und Monat plus Telefonielizenz des Partners, Partner Contact Center mit Amazon Connect 75 € bis 200 € je nach Minutenpaket und das native Contact Center 125 €, jeweils mit Jahresvertrag."
draft: false
---

Salesforce schaltet Open CTI am 28. Februar 2028 ab. Jedes Softphone, das heute über Open CTI in der Service Cloud läuft, muss bis dahin auf Salesforce Voice umgestellt sein, den Nachfolger von Service Cloud Voice. Dafür gibt es vier Wege, von „Telefonieanbieter behalten“ bis „Telefonie direkt von Salesforce“. Für Hersteller mit Servicehotline oder Kundendienst heißt das: Die Telefonie-Entscheidung kommt jetzt auf den Tisch, auch wenn heute alles funktioniert. Ich habe mit den CTI-Anbietern Genesys und Mirage gearbeitet und beschreibe, worauf es bei der Wahl ankommt.

## Was ändert sich mit der Abschaltung?

Open CTI ist die JavaScript-Schnittstelle, über die Softphones von Drittanbietern seit Jahren in Salesforce laufen. Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/open-cti-to-voice-migration/prepare-for-open-cti-retirement) gilt dieser Zeitplan:

| Datum | Was passiert |
|---|---|
| seit 2020 | Open CTI im Wartungsmodus, keine neuen Funktionen |
| 16. Februar 2026 | Nicht mehr verfügbar in neu angelegten Agentforce-Service-Orgs |
| 28. Februar 2028 | Abschaltung für alle Orgs |

Mit der Abschaltung funktionieren die Open-CTI-Schnittstelle, Call-Center-Adapter aus dem AgentExchange, Softphone-Layouts und Call-Center-Definitionen nicht mehr. Dasselbe gilt für eigene CTI-Logik, also Screen Pops, Routing-Regeln und eigenen Code. Die [Entwicklerdokumentation](https://developer.salesforce.com/docs/service/api-cti/guide/sforce-api-cti-when-to-use.html) empfiehlt, neue Entwicklung nur noch auf Salesforce Voice zu machen.

Das betrifft viele Produkte, die in deutschen Serviceorganisationen verbreitet sind. Der Mirage CTI Data Connector zum Beispiel, der Swyx-Telefonanlagen an Salesforce anbindet, ist laut [Produktbeschreibung](https://www.enreach.de/en/products/complete-your-telephone-system/third-party-products/connectors/tap-product/mirage-cti-data-connector-for-salesforce.html) eine Integration auf Basis von Open CTI.

## Welche Wege zu Salesforce Voice gibt es?

Salesforce hat die Produkte gerade umbenannt, deshalb tauchen in Angeboten und Dokumentation noch alte Namen auf. Das [Trailhead-Modul zur Migration](https://trailhead.salesforce.com/content/learn/modules/open-cti-to-voice-migration/choose-your-migration-path) nennt vier Wege:

1. **Partner Contact Center**, früher Partner Telephony. Der bisherige Telefonieanbieter bleibt, nur die Anbindung an Salesforce wird ersetzt. Salesforce nennt Genesys, Cisco, Five9 und Talkdesk als Beispiele.
2. **Partner Contact Center mit Telefonie von Amazon Connect.** Für Unternehmen, die schon eine eigene Amazon-Connect-Instanz im eigenen AWS-Konto betreiben.
3. **Partner Contact Center mit Amazon Connect.** Amazon Connect als Telefonie, Salesforce stellt und betreibt die AWS-Infrastruktur.
4. **Agentforce Contact Center.** Telefonie direkt von Salesforce, ohne Drittanbieter und ohne AWS-Konto.

Für den ersten Weg zählt, ob der Anbieter ein Paket für Salesforce Voice hat. Genesys bietet mit [CX Cloud](https://help.genesys.cloud/286118) ein Voice-Paket an, das laut Genesys die Partner-Telefonie für Salesforce Voice einrichtet. Für Microsoft Teams Phone gibt es Partnerprodukte wie [Unaric Voice](https://www.unaric.com/unaric-voice-for-microsoft-teams/service-cloud-voice-v2), bei denen die Gespräche in Teams bleiben und die Anrufdaten als VoiceCall in Salesforce landen.

## Was kostet Salesforce Voice?

Die [EU-Preisseite](https://www.salesforce.com/eu/service/call-center-integration/voice-pricing/) und die Seite zum [Contact Center](https://www.salesforce.com/service/contact-center/pricing/) nennen im Oktober 2026 diese Listenpreise pro Nutzer und Monat:

| Variante | Listenpreis | Telefonie |
|---|---|---|
| Partner Contact Center | 50 € | vom eigenen Partner, separat lizenziert |
| Partner Contact Center mit Amazon Connect | 75 € bis 200 € | 750 bis 5.000 Minuten pro Nutzer und Monat |
| Contact Center (nativ) | 125 € | native Telefonie, Jahresvertrag |
| Contact Center Plus | 250 € | dazu Workforce und Quality Management |

Ein Rechenbeispiel mit Listenpreisen: 40 Servicemitarbeiter mit Partner Contact Center kosten 2.000 € pro Monat oder 24.000 € pro Jahr, zusätzlich zur Lizenz des Telefonieanbieters. Transkription muss bei diesem Weg laut Fußnote ebenfalls beim Partner lizenziert werden. Mit dem nativen Contact Center sind es 60.000 € pro Jahr, dafür entfällt der Telefonieanbieter.

Der Vergleich gelingt nur mit den Kosten der heutigen Telefonie daneben. Wer einen Vertrag mit Genesys hat, der noch Jahre läuft, rechnet anders als jemand, dessen Telefonanlage ohnehin ersetzt wird. Wie ich Lizenzen über mehrere Jahre plane, beschreibe ich in [Salesforce-Lizenzen: braucht jeder eine volle Lizenz?](../salesforce-lizenzen-volle-lizenz/).

## Was ist mehr Arbeit als gedacht?

Die Umstellung bedeutet mehr als ein neues Softphone. Laut [Migrationsleitfaden](https://developer.salesforce.com/docs/service/api-cti/guide/migrate-cti.html) ändern sich drei Dinge grundlegend:

- **Datenmodell.** Open CTI protokolliert Anrufe meist als Aufgaben. Salesforce Voice legt VoiceCall-Datensätze an. Jeder Bericht und jedes Dashboard über Anrufe muss auf das neue Objekt umgebaut werden.
- **Screen Pop und Präsenz.** Beides läuft künftig über Omni-Channel. Screen Pop wird zu einer Aktion in einem Omni-Channel-Flow, der Status der Mitarbeiter wird in Omni-Channel gesteuert.
- **Eigene Oberflächen.** Was heute in einem iFrame des Softphones läuft, muss mit Voice Extensions und dem Voice Toolkit neu gebaut werden.

Dazu kommen die Schnittstellen. Telefonie hängt selten nur an Salesforce: Rufnummernerkennung braucht Kundendaten, Rückrufe brauchen Termine, und manche Informationen kommen aus dem ERP. Ich war an einem globalen CTI-Rollout mit Service Cloud Voice, Genesys, MuleSoft und Microsoft Teams beteiligt. Schon diese Liste zeigt, wie viele Systeme an einer Hotline hängen, und jede dieser Verbindungen muss bei der Umstellung neu getestet werden. Wie ich Schnittstellen plane, steht unter [Salesforce-Schnittstellen](../../leistungen/salesforce-schnittstellen/).

Der Gewinn ist dafür real. Anrufe erscheinen im selben Omni-Channel-Fenster wie Chat und E-Mail, Supervisoren sehen alle Kanäle an einem Ort, und Transkripte liegen in Salesforce, wo Agentforce sie nutzen kann. Wer später einen Sprachagenten an der Hotline plant, braucht diese Grundlage ohnehin, wie in [Störungshotline mit Agentforce Voice](../stoerungshotline-agentforce-voice-deutsch/) beschrieben.

## Wie entscheide ich mich?

Ich beginne mit drei Fragen, bevor es um Produkte geht:

1. **Wie lange läuft der heutige Telefonievertrag, und wer betreibt die Anlage?** Ein Genesys-Vertrag mit drei Jahren Laufzeit spricht für Partner Contact Center. Eine alte Anlage, die ohnehin ersetzt wird, öffnet die Frage nach nativer Telefonie.
2. **Telefonieren Servicemitarbeiter heute schon über Teams?** Dann ist ein Weg, bei dem Gespräche in Teams bleiben, für die Mitarbeiter am einfachsten. Teams wird als Telefonieplattform wichtiger, weil viele Unternehmen es intern schon nutzen.
3. **Wie viel eigene CTI-Logik gibt es?** Screen Pops mit Sonderlogik, eigene Routing-Regeln und Berichte bestimmen den Aufwand mehr als die Zahl der Nutzer.

Telefon und E-Mail bleiben in den meisten Serviceorganisationen die wichtigsten Kanäle. Eine Hotline, die im Februar 2028 nicht mehr in Salesforce klingelt, trifft den Service direkt.

## Wo sollten Sie anfangen?

Erfassen Sie in diesem Quartal, was Open CTI bei Ihnen heute tut: wie viele Nutzer am Call Center hängen, welche Rufnummern und Warteschlangen es gibt, welche Berichte Anrufdaten nutzen und welche eigene Logik existiert. Fragen Sie parallel Ihren Telefonieanbieter schriftlich, wie sein Weg zu Salesforce Voice aussieht und ab wann er verfügbar ist. Planen Sie dann die Umstellung so, dass sie nicht mit einem großen Release oder der Hochsaison im Service zusammenfällt.

Bis Februar 2028 klingt nach viel Zeit. Mit Auswahl, Vertrag, Umbau und Tests über mehrere Länder ist sie schnell aufgebraucht. Wenn Sie vor dieser Entscheidung stehen und eine unabhängige Einschätzung möchten, [schreiben Sie mir](#contact).
