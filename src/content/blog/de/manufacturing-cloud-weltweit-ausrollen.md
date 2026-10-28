---
title: "Manufacturing Cloud weltweit ausrollen: die Reihenfolge"
description: "In welcher Reihenfolge Hersteller die Manufacturing Cloud in Ländern einführen, warum 80 Prozent gleich sein sollten und warum Change Management dazugehört."
pubDate: 2026-10-27
lang: de
slug: manufacturing-cloud-weltweit-ausrollen
translationKey: manufacturing-cloud-global-rollout
topic: governance
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Rollout, Harmonisierung, Change Management, Fertigung]
series: { id: manufacturing-cloud, part: 8 }
takeaways:
  - "Ein weltweiter Rollout der Manufacturing Cloud beginnt mit dem strategischen Ziel. Meistens ist das die Harmonisierung von Prozessen, und daraus folgt die Reihenfolge der Länder."
  - "Ich starte mit einem großen Land mit angemessener Komplexität und nehme eine der größten Regionen in die ersten zwei Phasen auf, damit das globale Template früh unter echter Last steht."
  - "Alle Länder sollten zu mindestens 80 Prozent identisch arbeiten. Jede Abweichung pro Land wird begründet und so klein wie möglich gehalten."
  - "Unterschiedliche Prozesse, Business Units, IT-Landschaften und Marken pro Land bestimmen, welches Land wann kommt."
  - "Change Management gehört in jeden Rollout, auch wenn der Kunde meint, er brauche keins."
faq:
  - q: "Mit welchem Land sollte ein weltweiter Salesforce-Rollout beginnen?"
    a: "Mit einem großen Land mit angemessener Komplexität. Es muss groß genug sein, um das globale Template ernsthaft zu prüfen, und darf nicht so speziell sein, dass seine Sonderfälle das Template für alle anderen prägen."
  - q: "Wie viel darf ein Land vom globalen Template abweichen?"
    a: "Mein Richtwert: Alle Länder arbeiten zu mindestens 80 Prozent identisch, und das Delta pro Land wird aktiv klein gehalten. Rechtliche Vorgaben sind gesetzt, alles andere wird begründet und entschieden."
  - q: "Braucht ein Salesforce-Rollout Change Management?"
    a: "Ja. Ein Rollout mit dem Ziel, Prozesse zu harmonisieren, ändert die Arbeit von Menschen in jedem Land. Ich bringe Change Management deshalb immer wieder ins Gespräch, auch wenn der Kunde es zunächst nicht für nötig hält."
draft: false
---

Ein weltweiter Rollout der Manufacturing Cloud beginnt mit einer Entscheidung, die vor jeder Konfiguration steht: Welches strategische Ziel soll er erreichen? Meistens ist es die Harmonisierung von Prozessen. Daraus folgt, wie ich den Rollout plane: mit einem großen Land mit angemessener Komplexität beginnen, eine der größten Regionen in die ersten zwei Phasen aufnehmen und alle Länder zu mindestens 80 Prozent identisch halten. Das sind meine Lehren aus dem ersten weltweiten Rollout der Manufacturing Cloud, den ich begleitet habe. Die wichtigste davon klingt am wenigsten technisch: Change Management gehört dazu, auch wenn niemand danach fragt.

## Was muss vor dem ersten Land feststehen?

Das Ziel. Ein Rollout, der Prozesse harmonisieren soll, wird anders geplant als einer, der jedem Land ein eigenes CRM geben soll. Bei Herstellern mit Gesellschaften in vielen Ländern geht es meistens um Harmonisierung: gleiche Abläufe im Vertrieb, gleiche Sales Agreements, gleiche Berichte für die Zentrale. Wie der Rollout mit ERP-Anbindung und KI zusammenhängt, steht in [Kapitel 5 der Masterclass Manufacturing Cloud](../../masterclass/manufacturing-cloud/erp-ki-und-rollout/).

Aus diesem Ziel ergibt sich ein globales Template, also die gemeinsame Konfiguration, die jedes Land übernimmt. Für die Manufacturing Cloud gehören dazu mindestens die Entscheidungen aus den früheren Teilen dieser Serie:

- **Die Ebene der Account-Struktur**, auf der Sales Agreements liegen, aus [Teil 3](../sales-agreements-abnahmemengen-erp/).
- **Die Regel, wann eine Konfiguration ein eigenes Produkt wird**, aus [Teil 2](../angebot-zu-sales-agreement-produktkonfigurator/).
- **Was Kunden im Portal sehen**, aus [Teil 7](../manufacturing-cloud-kundenportal/).

```hinweis achtung
Diese Punkte lassen sich nach dem ersten Land kaum noch ändern, ohne alle bereits eingeführten Länder anzufassen. Jede davon gehört deshalb ins Entscheidungslog, bevor das erste Land live geht.
```

Wie ich dieses Log führe, beschreibe ich unter [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

## Mit welchem Land fängt man an?

Mit einem großen Land mit angemessener Komplexität. Beides zählt:

- **Groß genug**, damit das Template echte Mengen, echte Nutzer und echte Sonderfälle sieht. Ein kleines Pilotland bestätigt ein Template, das später am ersten großen Land scheitert.
- **Nicht zu speziell**, damit seine Eigenheiten nicht das Template für alle anderen prägen. Ein Land mit ungewöhnlichem Vertriebsmodell oder einer eigenen Produktlinie ist ein schlechter Startpunkt, auch wenn es groß ist.

Dazu kommt eine zweite Regel: Eine der größten Regionen sollte in den ersten zwei Phasen dabei sein. Kommt sie erst in Phase fünf, stößt sie auf ein Template, das an kleineren Ländern gewachsen ist, und fordert Änderungen, die alle schon eingeführten Länder betreffen. Je früher die große Region dabei ist, desto günstiger sind diese Änderungen.

## Wonach richtet sich die Reihenfolge danach?

Nach drei Fragen, die für jedes Land anders beantwortet werden:

1. **Wie ähnlich sind die Prozesse?** Länder, die schon heute ähnlich verkaufen und abrechnen, gehen schneller. Länder mit eigenen Abläufen brauchen mehr Zeit für die Harmonisierung.
2. **Welche Business Units gibt es dort?** Eine Gesellschaft mit mehreren Geschäftsbereichen ist ein größerer Schritt als eine mit einem.
3. **Wie sieht die IT-Landschaft aus?** Ein Land mit eigenem ERP, eigener Middleware oder eigenen Altsystemen braucht neue Schnittstellen. Teilt es das ERP mit einem schon eingeführten Land, ist der Weg kürzer.

Daraus entsteht keine Formel, aber eine Reihenfolge, die sich begründen lässt. Ich lege sie in einer Tabelle mit einer Zeile pro Land und einer Spalte pro Frage fest. Damit wird sichtbar, warum ein Land in Phase zwei kommt und ein anderes in Phase vier, und die Diskussion darüber wird sachlicher.

## Was tun, wenn Gesellschaften unter anderen Marken auftreten?

Es einplanen. Bei manchen Unternehmen treten Gesellschaften in verschiedenen Ländern unter anderen Marken oder Namen auf, oft nach Übernahmen. Für den Kunden ist das eine andere Firma, intern dieselbe Gruppe.

In Salesforce betrifft das mehr, als man im ersten Workshop denkt:

- **Kundenportal:** Welche Marke sieht der Kunde, wenn er sich anmeldet?
- **Dokumente und E-Mails:** Angebote, Auftragsbestätigungen und Benachrichtigungen tragen Logo und Namen der richtigen Gesellschaft.
- **Berichte:** Die Zentrale will über Marken hinweg auswerten, das Land nach seiner eigenen Marke.
- **Daten:** Die Marke muss irgendwo im Datenmodell stehen, damit Portal, Dokumente und Berichte sie kennen.

Ich nehme die Marke deshalb als eigene Frage ins Template auf, auch wenn das erste Land nur eine hat. Kommt die zweite Marke erst im dritten Land, ist sie sonst eine Abweichung, die alle anderen Länder mittragen müssen.

## Wie hält man die Abweichungen pro Land klein?

Mit einem Richtwert und einem Prozess. Der Richtwert: Alle Länder arbeiten zu mindestens 80 Prozent identisch, und pro Land wird versucht, das Delta zu minimieren. Andere Länder als das erste sollten nur marginale Abweichungen haben.

Der Prozess dazu ist einfach, braucht aber Disziplin:

1. **Jede lokale Anforderung wird erfasst**, mit Begründung.
2. **Rechtliche Vorgaben sind gesetzt.** Steuern, Rechnungsstellung oder Datenschutz unterscheiden sich, und darüber wird nicht diskutiert.
3. **Alles andere wird entschieden**, von einer Stelle, die für das Template verantwortlich ist. Entweder kommt die Anforderung ins Template für alle, oder sie wird eine lokale Ausnahme, oder sie wird abgelehnt.
4. **Ausnahmen werden gezählt.** Wer die Ausnahmen pro Land kennt, sieht früh, wenn ein Land aus dem Template driftet.

Bei mehreren Implementierungspartnern, etwa einem pro Region, gehört diese Entscheidung auf die Kundenseite. Sonst baut jeder Partner sein eigenes Template. Wie ich mehrere Partner unter einem Rahmen führe, steht unter [Partnersteuerung und Governance](../../leistungen/partnersteuerung/).

## Warum Change Management, auch wenn niemand danach fragt?

Weil Harmonisierung heißt, dass Menschen anders arbeiten. In jedem Land, das dem Template folgt, ändern sich Abläufe, Berichte und Gewohnheiten. Ein Vertrieb, der seine Mengen bisher in einer eigenen Tabelle geführt hat, arbeitet nicht automatisch mit Sales Agreements, nur weil sie live sind.

```praxis
Viele Kunden meinen, sie bräuchten kein Change Management. Das Budget ist verteilt, die Schulungen sind geplant, und die Nutzer werden sich schon gewöhnen. Ich bringe es trotzdem immer wieder ins Gespräch, in der Planung, vor jedem Land und nach jedem Go-live.
```

Mindestens drei Dinge gehören pro Land dazu:

- **Key User**, die das Template kennen und im Land die ersten Fragen beantworten.
- **Kommunikation vor dem Go-live**, die erklärt, was sich ändert und warum, nicht nur, wo man klickt.
- **Ein Blick auf die Nutzung nach dem Go-live**, damit auffällt, wenn ein Land neben Salesforce weiter mit eigenen Listen arbeitet.

Wie ich die Einführung neuer Prozesse auf Kundenseite plane, beschreibe ich unter [Change Management für Salesforce-Programme](../../leistungen/change-management/).

## Wo sollten Sie anfangen?

Bevor das erste Land geplant wird, klären Sie fünf Punkte:

1. **Das Ziel.** Harmonisierung oder lokale Freiheit, schriftlich und von der Geschäftsführung getragen.
2. **Das Template.** Account-Ebene, Produktregel, Portal und die anderen Grundentscheidungen im Entscheidungslog.
3. **Das erste Land und die große Region.** Groß genug, nicht zu speziell, und die große Region in den ersten zwei Phasen.
4. **Die Reihenfolge.** Eine Tabelle mit Prozessen, Business Units, IT-Landschaft und Marken pro Land.
5. **Change Management.** Key User, Kommunikation und Nutzung pro Land, eingeplant von Anfang an.

Ein weltweiter Rollout gelingt, wenn das Template früh unter echter Last steht und jedes weitere Land nur noch wenig ändert. Wenn Sie einen Rollout der Manufacturing Cloud in mehreren Ländern planen, [schreiben Sie mir](#contact).
