---
title: "Salesforce-Entwicklungsstandards für mehrere Partner"
description: "Welche Entwicklungsstandards und welche Definition of Done Sie Salesforce-Partnern vorgeben sollten und wie Sie prüfen, ob alle Teams sie einhalten."
pubDate: 2026-10-29
lang: de
slug: salesforce-entwicklungsstandards-definition-of-done
translationKey: development-standards-definition-of-done
topic: code-review
categories: [architecture, devops]
contactBrief: partner-governance
tags: [Entwicklungsstandards, Definition of Done, Partnersteuerung, Codequalität]
takeaways:
  - "Entwicklungsstandards legen fest, wie in einer Salesforce-Org gebaut wird; die Definition of Done legt fest, wann eine User Story fertig ist. Beide gehören dem Kunden."
  - "Die erste Version muss nicht vollständig sein. In meinem größten Programm deckte sie rund 80 Prozent der Fälle ab, der Rest kam in den folgenden Wochen dazu."
  - "Standards decken Namen, Automatisierung pro Objekt und Kontext und Testabdeckung ab. Den größten Unterschied machten bei mir die Object Ownership Matrix und Regeln für Konfiguration."
  - "Was sich automatisch prüfen lässt, prüft die Pipeline. Das Review prüft den Rest, sonst bleiben Standards ein Dokument, das niemand liest."
faq:
  - q: "Was ist eine Definition of Done?"
    a: "Eine Definition of Done ist eine kurze Liste von Bedingungen, die jede User Story erfüllen muss, bevor sie als fertig gilt, etwa Review freigegeben, Tests grün, Rechte im Permission Set und Doku aktualisiert. Sie gilt für alle Teams gleich."
  - q: "Wer sollte Entwicklungsstandards schreiben, Kunde oder Partner?"
    a: "Schreiben können sie beide, besitzen sollte sie der Kunde. Legt ein Partner die Regeln fest, entscheidet er auch, wie seine Wettbewerber in derselben Org bauen."
  - q: "Wie lange dauert es, Standards über mehrere Partner zu etablieren?"
    a: "In meinem größten Programm mit fünf Partnern etwa drei Monate, bis die Standards stabil waren. Danach kamen nur noch einzelne Randfälle dazu."
  - q: "Welche Testabdeckung verlangt Salesforce?"
    a: "Salesforce verlangt für ein Deployment in Produktion mindestens 75 Prozent Apex-Testabdeckung. Das ist eine Untergrenze; aussagekräftige Tests prüfen Ergebnisse, nicht nur ausgeführte Zeilen."
draft: false
---

Salesforce-Entwicklungsstandards legen fest, wie in einer Org gebaut wird: Namen, Automatisierung, Konfiguration, Tests und Sicherheit. Die Definition of Done legt fest, wann eine User Story fertig ist. Arbeiten mehrere Partner an einer Org, gehören beide dem Kunden und gelten für alle Teams gleich. Ich empfehle, mit einer kurzen ersten Version zu starten, die die häufigsten Fälle abdeckt, und den Rest nachzuziehen. Durchgesetzt werden die Standards in der Pipeline und im Pull-Request-Review. Ohne diese Prüfung bleiben sie ein Dokument im Wiki, das niemand liest.

## Warum brauchen mehrere Partner gemeinsame Standards?

Jeder erfahrene Partner hat eigene Standards. Das Problem ist, dass sie sich unterscheiden. Ein Partner baut Automatisierung in Apex-Triggern, der nächste in Flows, der dritte in beidem. Ein Team schreibt Schwellenwerte fest in den Code, ein anderes legt sie in Custom Metadata ab. Jede Lösung für sich ist vertretbar. Zusammen auf einer Org entsteht ein System, in dem ähnliche Probleme sehr unterschiedlich gelöst sind, je nachdem, wer sie gebaut hat.

Die Folgen zeigen sich spät: Zwei Automatisierungen auf demselben Objekt laufen in unklarer Reihenfolge, ein Wert muss an drei Stellen geändert werden, und ein neuer Partner braucht Wochen, bis er versteht, wie die Org gebaut ist. Gemeinsame Standards machen Partner außerdem vergleichbar, weil alle nach denselben Regeln arbeiten. Mehr zum Rahmen dahinter steht auf der Seite [Partnersteuerung](../../leistungen/partnersteuerung/).

```praxis
Das größte Programm, das ich gesteuert habe, hatte mehr als 30 Entwickler in acht Streams, geliefert von fünf Umsetzungspartnern und internen Teams. Eine Zeit lang lief jeder Pull Request über meinen Schreibtisch, und aus diesen Reviews haben wir die Standards aufgeschrieben. Bis sie stabil waren, hat es etwa drei Monate gedauert. Die erste Version deckte rund 80 Prozent der Fälle ab, die Randfälle haben wir in den Wochen danach besprochen und ergänzt.
```

## Was gehört in Salesforce-Entwicklungsstandards?

Die meisten Standarddokumente sind zu lang. In meinem Programm deckten die Standards die üblichen Themen ab, etwa Namenskonventionen, eine Automatisierung pro Objekt und Kontext und Testabdeckung. Den größten Unterschied machten zwei Elemente: die Verantwortung für Objekte und Regeln für Konfiguration. Diese Tabelle fasst zusammen, was ich heute in eine erste Version schreibe:

| Bereich | Regel | Warum |
|---|---|---|
| Namen | Präfix des Streams, sprechende API-Namen, Beschreibung an jedem Feld | Man sieht im Setup, wem etwas gehört und wozu es dient |
| Automatisierung | eine Automatisierung pro Objekt und Kontext | Reihenfolge und Seiteneffekte bleiben vorhersehbar |
| Konfiguration | Werte in Custom Metadata Types oder Custom Labels statt fest im Code | Ein Wert ändert sich an einer Stelle, ohne Deployment von Code |
| Tests | Apex-Tests prüfen Ergebnisse, nicht nur Zeilen | Tests finden Fehler statt nur die Quote zu erfüllen |
| Sicherheit | Datenzugriff im Kontext des Nutzers, Rechte über Permission Sets | Kein Nutzer sieht über Code mehr, als er sehen darf |
| Verantwortung | Änderungen an fremden Objekten nur nach Abstimmung | Teams überschreiben sich nicht gegenseitig |

Die letzte Zeile regelt eine [Object Ownership Matrix](../object-ownership-matrix-salesforce/): Sie legt fest, welcher Stream für welches Objekt verantwortlich ist. Bevor ein Team ein fremdes Objekt ändert, stimmt es sich mit dem Verantwortlichen ab. Dazu kommen die Regeln für Rechte aus dem [Berechtigungskonzept](../salesforce-berechtigungskonzept-permission-sets/).

„Eine Automatisierung pro Objekt und Kontext“ heißt konkret: Für das Objekt Arbeitsauftrag gibt es zum Beispiel einen Flow, der vor dem Speichern läuft, und einen, der nach dem Speichern läuft, statt fünf Flows und zwei Trigger, die alle auf dieselbe Änderung reagieren. Braucht ein Stream neue Logik, erweitert er die vorhandene Automatisierung oder hängt einen Unterflow ein.

## Was steht in einer Definition of Done?

Die Definition of Done ist kürzer als die Standards und wird bei jeder User Story abgehakt. Diese Punkte halte ich für das Minimum:

- Der Pull Request ist von einer zweiten Person freigegeben, und die Pipeline ist grün.
- Apex-Tests und Validierungs-Deployment gegen die Ziel-Org laufen ohne Fehler.
- Neue Rechte liegen in einem Permission Set des Streams, nicht in einem Profil.
- Post-Deployment-Schritte sind automatisiert oder im Ticket beschrieben.
- Der Systemtest mit den echten Rollen ist im Ticket dokumentiert.
- Felder, Flows und Klassen haben eine Beschreibung, und betroffene Doku ist aktualisiert.

Eine Definition of Done für alle Teams ist wichtiger als eine perfekte. Mit zwei Partnern und zwei Definitionen auf einer Org gilt sonst still die lockerere. Vor UAT ist sie die Grenze zwischen Partner und Fachbereich, siehe [Salesforce UAT: Wer testet vor dem Release?](../salesforce-uat-abnahmetest-fachbereich/).

## Wie prüfen Sie, ob Partner die Standards einhalten?

Standards, die niemand prüft, werden nach zwei Sprints ignoriert. Ich teile die Prüfung in zwei Teile:

1. **Automatisch in der Pipeline.** Bei jedem Pull Request laufen Validierungs-Deployment, Apex-Tests und statische Codeanalyse. Salesforce verlangt für Produktion mindestens 75 Prozent Testabdeckung; die Pipeline kann für neuen Code eine höhere Schwelle setzen. Namenskonventionen und verbotene Muster, etwa fest codierte IDs, lassen sich mit Regeln im Code Analyzer prüfen.
2. **Im Review.** Ob eine neue Automatisierung die vorhandene erweitert oder daneben baut, ob ein Objekt dem Stream gehört und ob ein Design zur Architektur passt, sieht nur ein Mensch. Wie das ohne Bremse geht, beschreibe ich in [warum Pull-Request-Reviews Pflicht sind](../warum-pull-request-reviews-pflicht-sind/).

Für KI-generierten Code gelten dieselben Regeln. Eine Regeldatei im Repository übersetzt die Standards in Anweisungen für Coding-Agenten, siehe [KI-Regeldatei im Salesforce-Repository](../ki-regeldatei-salesforce-repository/).

## Was passiert mit den Randfällen?

Die erste Version deckt nie alles ab. In den Wochen danach tauchen Fälle auf, die niemand bedacht hat: ein Stream braucht ein Feld auf einem fremden Objekt, oder zwei Teams planen gleichzeitig eine Änderung am selben Flow. In meinem Programm haben wir diese Fälle in regelmäßigen [Center-of-Excellence-Calls](../salesforce-center-of-excellence-format/) besprochen, in denen anstehende Änderungen mit genug Vorlauf für alle Streams auf den Tisch kamen. Jede Entscheidung aus diesen Calls wurde in die Standards übernommen. Irgendwann fielen die Randfälle weg, weil Themen besprochen wurden, bevor sie zu Konflikten wurden. Warum Standards bei Partnern ohne solche Termine nach einigen Monaten verwässern, beschreibe ich in [Reinforcement: Standards bei Partnern verankern](../standards-partner-verankern-reinforcement/).

## Wo fangen Sie an?

Schreiben Sie keine Standards am Schreibtisch. Lassen Sie zwei bis drei Wochen lang jeden Pull Request reviewen und notieren Sie, was Sie wiederholt anmerken. Daraus entsteht die erste Version, und sie passt zu Ihrer Org statt zu einem Lehrbuch. Danach kommen die Definition of Done, die automatischen Prüfungen und ein fester Termin, an dem neue Randfälle mit allen Streams besprochen werden.

Gute Standards sind kurz, gehören dem Kunden und werden bei jedem Pull Request geprüft. Wenn Sie Standards für Ihre Partner aufsetzen möchten, [schreiben Sie mir](#contact).
