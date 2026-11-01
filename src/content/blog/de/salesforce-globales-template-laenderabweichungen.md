---
title: "Globales Salesforce-Template: wie viel Land verträgt es?"
description: "Wie viel Landesabweichung ein globales Salesforce-Template verträgt, welche Abweichungen berechtigt sind und wie Sie das Delta pro Land klein halten."
pubDate: 2026-10-29
lang: de
slug: salesforce-globales-template-laenderabweichungen
translationKey: global-template-country-deviations
topic: governance
categories: [architecture, manufacturing-cloud]
contactBrief: architecture
tags: [globales Template, Rollout, Harmonisierung, Salesforce-Architektur]
takeaways:
  - "Mein Richtwert: Jedes Land ist mindestens zu 80 Prozent identisch mit dem Template, und das Delta pro Land bleibt so klein wie möglich."
  - "Berechtigt sind Abweichungen aus Recht, Steuern, Sprache und echten Unterschieden im Geschäft. Gewohnheit allein ist kein Grund."
  - "Landesunterschiede gehören in Konfiguration, etwa Custom Metadata pro Land, nicht in eigene Flows oder eigenen Code pro Land."
  - "Über Abweichungen entscheidet ein globaler Prozessverantwortlicher mit dem Architekten auf Kundenseite, und jede Entscheidung kommt ins Log."
faq:
  - q: "Was ist ein globales Template in Salesforce?"
    a: "Ein globales Template ist der gemeinsame Stand aus Prozessen, Datenmodell, Automatisierung und Rechten, den alle Länder eines weltweiten Rollouts übernehmen. Landesspezifisches kommt als kleine, dokumentierte Ergänzung dazu."
  - q: "Wie viel darf ein Land vom Template abweichen?"
    a: "Ich halte mindestens 80 Prozent Übereinstimmung pro Land für den richtigen Richtwert. Jede Abweichung braucht einen Grund aus Recht, Steuern, Sprache oder Geschäftsmodell und eine Freigabe."
  - q: "Wer entscheidet über Abweichungen vom Template?"
    a: "Ein globaler Verantwortlicher für den Prozess zusammen mit dem Architekten auf Kundenseite. Das Land beantragt, begründet und trägt die Folgekosten der Abweichung."
  - q: "Mit welchem Land sollte ein globales Template starten?"
    a: "Mit einem großen Land mit angemessener Komplexität. Es muss das Template ernsthaft prüfen, darf aber nicht so speziell sein, dass seine Sonderfälle das Template für alle anderen prägen."
draft: false
---

Ein globales Salesforce-Template ist der gemeinsame Kern aus Prozessen, Datenmodell, Automatisierung und Rechten, den jedes Land eines weltweiten Rollouts übernimmt. Mein Richtwert: Jedes Land ist mindestens zu 80 Prozent identisch mit dem Template, und das Delta pro Land bleibt so klein wie möglich. Berechtigt sind Abweichungen aus Recht, Steuern, Sprache und echten Unterschieden im Geschäft. Jede Abweichung braucht einen Antrag, eine Begründung und eine Freigabe, und sie gehört in die Konfiguration statt in eigenen Code pro Land. Ohne diese Regeln wird aus dem Template nach drei Ländern eine Sammlung von Landeslösungen.

## Warum zerfällt ein globales Template?

Das strategische Ziel eines weltweiten Rollouts ist meist die Harmonisierung von Prozessen. Am Anfang sind alle dafür. Ab dem zweiten Land kommen die Ausnahmen: In Frankreich braucht der Innendienst ein zusätzliches Feld, in Italien läuft die Freigabe von Angeboten über eine weitere Stufe, und in den USA heißt die Gesellschaft anders und tritt unter einer anderen Marke auf.

Jede einzelne Ausnahme ist klein. Zusammen haben sie drei Folgen:

- **Jede Änderung wird teurer.** Eine neue Funktion muss in jeder Landesvariante getestet werden. Bei zehn Ländern mit eigenen Flows ist ein Release zehn Releases.
- **Berichte über Länder hinweg stimmen nicht.** Wenn ein Status in jedem Land etwas anderes bedeutet, ist der weltweite Auftragseingang eine Schätzung.
- **Neue Länder werden langsamer.** Statt das Template zu übernehmen, sucht jedes neue Land die Variante aus, die ihm am besten gefällt.

```praxis
Beim weltweiten Manufacturing-Cloud-Rollout, den ich als Architekt begleitet habe, stand vorher fest, dass das Ziel die Harmonisierung der Prozesse ist. Wir sind mit einem großen Land mit angemessener Komplexität gestartet, und die anderen Länder hatten nur marginale Abweichungen. Mein Richtwert seitdem: alle Länder mindestens zu 80 Prozent identisch, das Delta pro Land minimieren. Was ich anders machen würde: Change Management immer wieder ins Gespräch bringen, auch wenn der Kunde meint, er brauche keins.
```

Die Reihenfolge der Länder beschreibe ich ausführlich in [Manufacturing Cloud weltweit ausrollen](../manufacturing-cloud-weltweit-ausrollen/). Hier geht es um die Frage, die in jedem Land neu gestellt wird: Darf diese Abweichung ins System?

## Welche Abweichungen sind berechtigt?

Ich sortiere jeden Wunsch nach Abweichung in eine von fünf Gruppen:

| Grund | Beispiel | Ins Template? |
|---|---|---|
| Recht und Steuern | E-Rechnungspflicht, Steuernummer, Aufbewahrungsfristen | ja, als Landeskonfiguration |
| Sprache und Formate | Übersetzungen, Adressformate, Währung | ja, über Standardfunktionen |
| Marke und Gesellschaft | Gesellschaft tritt unter anderem Namen auf | ja, als Stammdatum, nicht als Prozess |
| Anderes Geschäft | Land verkauft über Händler statt direkt | ja, wenn es mehrere Länder betrifft, sonst prüfen |
| Gewohnheit | „Bei uns war das Feld immer oben“ | nein |

Die letzte Gruppe ist die größte, und sie ist die schwierigste, weil sie selten so heißt. Ein Wunsch aus Gewohnheit kommt fast immer mit einer fachlichen Begründung. Eine gute Prüffrage ist: Was kostet es das Land, wenn es den Prozess des Templates übernimmt? Ist die Antwort „Umgewöhnung“, ist es Gewohnheit. Ist die Antwort „eine Rechnung, die das Finanzamt nicht akzeptiert“, ist es Recht.

Bei der vierten Gruppe lohnt ein zweiter Blick. Verkauft ein Land über Händler und die anderen direkt, ist das eine zweite Variante des Vertriebsprozesses. Taucht dieselbe Variante in mehreren Ländern auf, gehört sie ins Template, und zwar einmal.

## Landesunterschiede gehören in Konfiguration, nicht in Code

Die technische Regel ist einfach: Landesunterschiede gehören in Konfiguration, nicht in Code oder eigene Flows pro Land.

- **Werte pro Land in Custom Metadata Types.** Freigabegrenzen, Mehrwertsteuersätze oder Pflichtfelder pro Land stehen in einer Tabelle. Die Automatisierung liest den Wert für das Land des Datensatzes. Ein neues Land ist dann ein neuer Eintrag, kein neues Release.
- **Übersetzungen über die Übersetzungsfunktionen von Salesforce**, nicht über eigene Felder pro Sprache.
- **Datensatztypen nur für echte Prozessvarianten**, nicht pro Land. Zehn Länder mit je einem Datensatztyp sind zehn Seitenlayouts, die auseinanderlaufen.
- **Sichtbarkeit nach Land über Rollen und Freigaberegeln**, wie im [Berechtigungskonzept](../salesforce-berechtigungskonzept-permission-sets/) beschrieben.

Diese Regeln gehören in die [Entwicklungsstandards](../salesforce-entwicklungsstandards-definition-of-done/), damit jeder Partner sie kennt, der ein Land einführt.

```pro-contra
pro: Strenges Template
- Ein Release gilt für alle Länder
- Weltweite Berichte vergleichen Gleiches mit Gleichem
- Neue Länder gehen schneller live
contra: Was Sie dafür aufgeben
- Länder müssen Abläufe umstellen, die sie gewohnt sind
- Ohne Change Management wächst der Widerstand
```

## Wer entscheidet über Abweichungen?

Ein Land beantragt eine Abweichung schriftlich: was es braucht, warum, und was es kostet, wenn es das Template übernimmt. Entschieden wird von einem globalen Verantwortlichen für den Prozess zusammen mit dem Architekten auf Kundenseite. Die Entscheidung kommt ins [Entscheidungslog](../salesforce-architektur-entscheidungslog/), damit das nächste Land dieselbe Frage nicht noch einmal stellt.

Zwei Regeln helfen dabei. Erstens trägt das Land die Folgekosten seiner Abweichung, auch die Tests bei jedem künftigen Release. Das macht viele Wünsche kleiner. Zweitens wird jede Abweichung nach einem Jahr geprüft: Wird sie noch gebraucht, oder kann das Land zum Template zurück? Viele Wünsche entstehen aus Gewohnheit. Versteht der Sponsor im Land, warum das Template so gebaut ist, ordnet er sie ein, bevor sie beim Architekten ankommen, mehr dazu in [Change Management im weltweiten Salesforce-Rollout](../change-management-weltweiter-rollout/).

## Ob das Template hält, zeigen Kennzahlen pro Land

Die 80 Prozent sind ein Richtwert, keine exakte Messung. Trotzdem lässt sich die Richtung gut verfolgen, mit drei einfachen Zahlen pro Land:

- **Zahl der freigegebenen Abweichungen**, getrennt nach den fünf Gruppen aus der Tabelle. Steigt die Gruppe „Anderes Geschäft“ in mehreren Ländern, ist es Zeit, das Template zu erweitern.
- **Landesspezifische Metadaten.** Flows, Datensatztypen oder Seitenlayouts, die nur für ein Land existieren. Die Zahl sollte nahe null liegen.
- **Testaufwand pro Release für das Land.** Braucht ein Land deutlich mehr Testfälle als die anderen, trägt es mehr Abweichungen, als die Liste zeigt.

## Das Ziel vor dem ersten Land aufschreiben

Legen Sie vor dem ersten Land fest, was das Ziel ist, und schreiben Sie es auf. Ist es Harmonisierung, folgt daraus der Richtwert für die Übereinstimmung und der Antragsweg für Abweichungen. Führen Sie dann eine Liste der Abweichungen pro Land, mit Grund und Datum der Freigabe. In die Liste gehört auch, was die Abweichung im Betrieb kostet, etwa einen zusätzlichen Testfall in jedem Release. Im Lenkungsausschuss zeigt sie auf einen Blick, ob das Template hält. Wie Länder das Template annehmen, ist auch eine Frage des [Change Managements](../../leistungen/change-management/).
