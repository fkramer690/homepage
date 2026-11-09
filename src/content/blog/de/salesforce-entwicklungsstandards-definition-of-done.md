---
title: "Salesforce-Entwicklungsstandards für mehrere Partner"
description: "Wie Sie Salesforce-Entwicklungsstandards und eine gemeinsame Definition of Done für mehrere Umsetzungspartner festlegen und prüfen, ob alle Teams sie einhalten."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: salesforce-entwicklungsstandards-definition-of-done
translationKey: development-standards-definition-of-done
topic: code-review
categories: [architecture, devops]
contactBrief: partner-governance
tags: [Entwicklungsstandards, Definition of Done, Partnersteuerung, Codequalität]
takeaways:
  - "Die Definition of Done legt fest, wann eine User Story fertig ist, und gehört wie die Entwicklungsstandards dem Kunden."
  - "Die erste Version muss nicht vollständig sein, in meinem größten Programm deckte sie die meisten wiederkehrenden Review-Themen ab, Randfälle folgten."
  - "Den größten Unterschied machten bei mir die Object Ownership Matrix und Regeln für Konfiguration."
  - "Was sich automatisch prüfen lässt, prüft die Pipeline, und das Review prüft den Rest."
faq:
  - q: "Was ist eine Definition of Done?"
    a: "Eine Definition of Done ist eine kurze Liste von Bedingungen, die jede User Story erfüllen muss, bevor sie als fertig gilt, etwa Akzeptanzkriterien erfüllt, Review freigegeben, Tests grün, Rechte in Permission Sets und Doku aktualisiert. Ein gemeinsamer Kern gilt für alle Teams; Integrations-, Migrations- oder UI-Teams ergänzen eigene Prüfungen."
  - q: "Wer sollte Entwicklungsstandards schreiben, Kunde oder Partner?"
    a: "Schreiben können sie beide, gehören sollten sie dem Kunden. Legt ein Partner die Regeln fest, entscheidet er auch, wie seine Wettbewerber in derselben Org bauen."
  - q: "Wie lange dauert es, Standards über mehrere Partner zu etablieren?"
    a: "Eine allgemeine Dauer gibt es nicht; sie hängt von vorhandenen Standards, Org-Größe, Automatisierungsdichte und Entscheidungswegen ab. In meinem größten Programm mit fünf Partnern waren es etwa drei Monate, bis die Standards stabil waren. Danach kamen nur noch einzelne Randfälle dazu."
  - q: "Welche Testabdeckung verlangt Salesforce?"
    a: "Mit dem üblichen Testlevel RunLocalTests verlangt Salesforce für ein Deployment in Produktion mindestens 75 Prozent Apex-Codeabdeckung über die Org, und jeder Trigger braucht etwas Abdeckung. Mit RunSpecifiedTests muss jede deployte Klasse und jeder Trigger einzeln 75 Prozent erreichen. Das ist eine Untergrenze; aussagekräftige Tests prüfen Ergebnisse, nicht nur ausgeführte Zeilen."
draft: false
---

Salesforce-Entwicklungsstandards legen fest, wie in einer Org gebaut wird: Namen, Automatisierung, Konfiguration, Tests und Sicherheit. Die Definition of Done legt fest, wann eine User Story fertig ist. Arbeiten mehrere Partner an einer Org, gehören beide dem Kunden, mit einem gemeinsamen Kern für alle Teams. Ich empfehle, mit einer kurzen ersten Version zu starten, die die häufigsten Fälle abdeckt, und den Rest nachzuziehen. Durchgesetzt werden die Standards in der Pipeline und im Pull-Request-Review. Ohne diese Prüfung bleiben sie ein Dokument im Wiki, das niemand liest.

## Warum brauchen mehrere Partner gemeinsame Standards?

Jeder erfahrene Partner hat eigene Standards. Das Problem ist, dass sie sich unterscheiden. Ein Partner baut Automatisierung in Apex-Triggern, der nächste in Flows, der dritte in beidem. Ein Team schreibt Schwellenwerte fest in den Code, ein anderes legt sie in Custom Metadata ab. Jede Lösung für sich ist vertretbar. Zusammen auf einer Org entsteht ein System, in dem ähnliche Probleme sehr unterschiedlich gelöst sind, je nachdem, wer sie gebaut hat.

Die Folgen zeigen sich spät: Apex-Trigger und Flows auf demselben Objekt reagieren auf dieselbe Änderung, ohne dass jemand eine Reihenfolge festgelegt hat, ein Wert muss an drei Stellen geändert werden, und ein neuer Partner braucht Wochen, bis er versteht, wie die Org gebaut ist. Gemeinsame Standards machen Partner außerdem vergleichbar, weil alle nach denselben Regeln arbeiten. Mehr zum Rahmen dahinter steht auf der Seite [Partnersteuerung](../../leistungen/partnersteuerung/).

```praxis
Das größte Programm, das ich gesteuert habe, hatte mehr als 30 Entwickler in acht Streams, geliefert von fünf Umsetzungspartnern und internen Teams. In einer Kalibrierungsphase lief jeder Pull Request über meinen Schreibtisch, und aus diesen Reviews haben wir die Standards aufgeschrieben. Danach übernahmen Reviewer aus den Streams, und nur riskante Änderungen kamen zu mir zurück. Bis die Standards stabil waren, hat es etwa drei Monate gedauert. Die erste Version deckte die meisten wiederkehrenden Review-Themen ab, die Randfälle haben wir in den Wochen danach besprochen und ergänzt.
```

## Was gehört in Salesforce-Entwicklungsstandards?

Die meisten Standarddokumente sind zu lang. In meinem Programm deckten die Standards die üblichen Themen ab, etwa Namenskonventionen, einen Einstiegspunkt für Automatisierung pro Objekt und Testabdeckung. Den größten Unterschied machten zwei Elemente: die Verantwortung für Objekte und Regeln für Konfiguration. Diese Tabelle fasst zusammen, was ich heute in eine erste Version schreibe:

| Bereich | Regel | Warum |
|---|---|---|
| Namen | Präfix des Streams, sprechende API-Namen, aussagekräftige Beschreibung an jedem benutzerdefinierten Feld, das das Programm anlegt oder ändert | Man sieht im Setup, wem etwas gehört und wozu es dient |
| Automatisierung | ein Einstiegspunkt pro Objekt (Flow oder Apex), Flows nach Verantwortung getrennt und mit fester Reihenfolge | Reihenfolge und Seiteneffekte bleiben vorhersehbar |
| Konfiguration | Schwellen und Parameter in Custom Metadata Types, übersetzbare Texte in Custom Labels, Zugangsdaten in Named Credentials | Ein Wert lässt sich an einer Stelle ändern, ohne Apex anzupassen; die Änderung läuft weiter durch die Pipeline |
| Tests | Apex-Tests prüfen Ergebnisse, nicht nur Zeilen | Tests finden Fehler statt nur die Quote zu erfüllen |
| Sicherheit | Ausführungskontext bewusst gewählt (User Mode als Standard, System Mode nur als begründete Ausnahme), Rechte über Permission Sets | Kein Nutzer sieht über Code mehr, als er sehen darf |
| Verantwortung | Änderungen an fremden Objekten nur nach Abstimmung | Teams überschreiben sich nicht gegenseitig |

Die letzte Zeile regelt eine [Object Ownership Matrix](../object-ownership-matrix-salesforce/): Sie legt fest, welcher Stream für welches Objekt verantwortlich ist. Bevor ein Team ein fremdes Objekt ändert, stimmt es sich mit dem Verantwortlichen ab. Dazu kommen die Regeln für Rechte aus dem [Berechtigungskonzept](../salesforce-berechtigungskonzept-permission-sets/).

„Ein Einstiegspunkt pro Objekt“ heißt konkret: Am Objekt Arbeitsauftrag, das Service-Stream, ERP-Schnittstelle und Ersatzteilprozess gemeinsam nutzen, reagieren entweder Flows oder ein Apex-Trigger auf Änderungen, nicht beides. Salesforces [Architekturleitfaden für datensatzgesteuerte Automatisierung](https://architect.salesforce.com/docs/architect/decision-guides/guide/record-triggered) rät davon ab, beides zu mischen, und bezeichnet einen einzigen Mega-Flow pro Objekt als Anti-Pattern. Der Arbeitsauftrag bekommt also wenige Flows mit klarer Verantwortung und einem Reihenfolgewert im Flow Trigger Explorer, statt fünf ungeordneter Flows und zwei Trigger. Braucht ein Stream neue Logik, ergänzt er sie an der vereinbarten Stelle.

## Was steht in einer Definition of Done?

Die Definition of Done ist kürzer als die Standards und wird bei jeder User Story abgehakt. Diese Punkte halte ich für das Minimum:

- Die Akzeptanzkriterien sind erfüllt und im Ticket nachgewiesen.
- Der Pull Request ist von einer zweiten Person freigegeben, und die Pipeline ist grün.
- Das Deployment wird mit dem vereinbarten Testlevel gegen die vorgesehene Zielumgebung validiert, wo relevant mit Negativ- und Massentests.
- Neue fachliche Rechte liegen im Permission Set oder in der Permission Set Group der jeweiligen Fachfunktion, nicht in einem Profil.
- Post-Deployment-Schritte sind automatisiert oder im Ticket beschrieben.
- Der Systemtest wurde mit den relevanten Benutzern, Permission Set Groups und Datensatzfreigaben bestanden; das Ergebnis steht im Ticket.
- Felder und Flows haben eine aussagekräftige Beschreibung, Apex-Klassen einen Kopfkommentar, und betroffene Doku ist aktualisiert.
- Offene Fehler und akzeptierte Risiken sind aufgeführt.

Ein gemeinsamer Kern für alle Teams ist wichtiger als ein perfekter. Mit zwei Partnern und zwei Definitionen auf einer Org gilt sonst still die lockerere. Teams ergänzen Prüfungen für ihre Art von Arbeit, etwa Abgleich bei Datenmigration oder Fehlerfalltests bei Schnittstellen. Die Definition of Done markiert technische Fertigstellung und Bereitschaft für UAT; die fachliche Abnahme folgt im UAT, siehe [Salesforce UAT: Wer testet vor dem Release?](../salesforce-uat-abnahmetest-fachbereich/).

## Die Pipeline prüft, was automatisch geht, das Review den Rest

Standards, die niemand prüft, werden nach zwei Sprints ignoriert. Ich teile die Prüfung in zwei Teile:

1. **Automatisch in der Pipeline.** Bei jedem Pull Request laufen ein Validierungs-Deployment, Apex-Tests und eine statische Codeanalyse. Salesforce verlangt für ein Deployment in Produktion mindestens 75 Prozent Apex-Codeabdeckung; die Pipeline kann für neuen Code eine höhere Schwelle setzen. Salesforce Code Analyzer v5 erkennt unterstützte verbotene Muster wie fest codierte IDs; programmeigene Namenskonventionen brauchen eventuell eigene Regeln. Auch Verantwortung lässt sich automatisieren: Eine CODEOWNERS-Datei oder Pfadregeln setzen den verantwortlichen Stream als Pflicht-Reviewer.
2. **Im Review.** Ob eine neue Automatisierung an der vereinbarten Stelle sitzt und ob ein Design zur Architektur passt, braucht einen Menschen. Wie das ohne Bremse geht, beschreibe ich in [warum Pull-Request-Reviews Pflicht sind](../warum-pull-request-reviews-pflicht-sind/).

Für KI-generierten Code gelten dieselben Regeln. Eine Regeldatei im Repository übersetzt die Standards in Anweisungen für Coding-Agenten, siehe [KI-Regeldatei im Salesforce-Repository](../ki-regeldatei-salesforce-repository/).

## Randfälle gehören in den Center-of-Excellence-Call

Die erste Version deckt nie alles ab. In den Wochen danach tauchen Fälle auf, die niemand bedacht hat: ein Stream braucht ein Feld auf einem fremden Objekt, oder zwei Teams planen gleichzeitig eine Änderung am selben Flow. In meinem Programm haben wir diese Fälle in regelmäßigen [Center-of-Excellence-Calls](../salesforce-center-of-excellence-format/) besprochen, in denen anstehende Änderungen mit genug Vorlauf für alle Streams auf den Tisch kamen. Jede verbindliche Entscheidung aus diesen Calls ging mit Datum, Entscheider und Begründung in die Standards und das [Architektur-Entscheidungslog](../salesforce-architektur-entscheidungslog/). Abweichungen laufen denselben Weg: eine dokumentierte Ausnahme mit Begründung, Verantwortlichem und Prüftermin, damit Regeln weder heimlich gebrochen noch dort angewandt werden, wo sie schaden. Irgendwann fielen die Randfälle weg, weil Themen besprochen wurden, bevor sie zu Konflikten wurden. Warum Standards bei Partnern ohne solche Termine nach einigen Monaten verwässern, beschreibe ich in [Reinforcement: Standards bei Partnern verankern](../standards-partner-verankern-reinforcement/).

## Zwei bis drei Wochen lang Review-Anmerkungen sammeln

Schreiben Sie keine Standards am Schreibtisch. Lassen Sie zwei bis drei Wochen lang jeden Pull Request reviewen und notieren Sie, was Sie wiederholt anmerken. Daraus entsteht die erste Version, und sie passt zu Ihrer Org statt zu einem Lehrbuch. Danach kommen die Definition of Done, die automatischen Prüfungen und ein fester Termin, an dem neue Randfälle mit allen Streams besprochen werden. Ob es wirkt, zeigen wenige Zahlen: der Anteil der Pull Requests, die alle Prüfungen im ersten Lauf bestehen, wiederkehrende Review-Befunde, Zahl und Alter der Ausnahmen und Fehler nach dem UAT.
