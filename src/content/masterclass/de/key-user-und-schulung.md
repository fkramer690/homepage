---
title: "Key User und Schulung in der Salesforce-Einführung"
description: "Wie Key User, Schulung am echten Fall und der Abnahmetest Wissen und Fähigkeit in Vertrieb, Service und Außendienst bringen, mit Auswahl und Zeitbedarf."
lang: de
slug: key-user-und-schulung
course: change-management
translationKey: cm-03
chapter: 3
pubDate: 2026-10-29
short: "Key User und Schulung"
summary: "Knowledge und Ability: wie Sie Key User auswählen und freistellen, am echten Fall schulen und Techniker vor dem Rollout einbinden."
takeaways:
  - "Eine Schulung vermittelt Wissen, erst der Alltag zeigt Fähigkeit. Dafür braucht jedes Team einen Key User, den Kollegen ohnehin um Rat fragen."
  - "Key User wählt man nach Ansehen im Team und Kenntnis des Prozesses aus, nicht danach, wer gerade Zeit hat."
  - "Als Annahme für die Planung braucht ein Key User rund um den Go-live knapp acht Arbeitstage, die die Führungskraft vorher schriftlich zusagt."
  - "Geschult wird am echten Fall aus dem eigenen Alltag, kurz vor dem Go-live, von Key Usern mit dem Projektteam."
  - "Im Außendienst übernehmen drei bis fünf erfahrene Techniker pro Region diese Rolle und testen die App vorher im echten Einsatz."
articles: [change-key-users, salesforce-uat-business-testing, change-technician-adoption]
faq:
  - q: "Was ist ein Key User in einer Salesforce-Einführung?"
    a: "Ein Fachanwender, der das neue System vor allen anderen kennt, an Workshops und Tests mitwirkt und nach dem Go-live die erste Anlaufstelle für Fragen in seinem Team ist. Er trägt außerdem Rückmeldungen aus dem Alltag zurück ins Projekt."
  - q: "Wie viele Key User braucht ein Hersteller?"
    a: "Einen pro Team, Standort oder Land, bei kritischen Bereichen zwei. Fällt der einzige Key User eines Landes in der Woche nach dem Go-live aus, fällt die Unterstützung für das ganze Land aus."
  - q: "Ersetzt ein Key User den Support?"
    a: "Nein. Er beantwortet Fragen zur Nutzung, ändert aber keine Konfiguration und behebt keine Fehler in Schnittstellen. Fehler gehen weiter über das Ticketsystem, damit sie gezählt und priorisiert werden."
draft: false
---

Wissen und Fähigkeit, die mittleren Stufen im ADKAR-Modell, bringen in einer Salesforce-Einführung vor allem Key User ins Team. Eine Schulung erklärt, wo eine Funktion liegt. Ob jemand sie im Kundentermin, am Telefon oder vor der Maschine anwenden kann, zeigt erst der Alltag, und dort hilft die Kollegin am Nachbartisch mehr als eine Hotline. Ich wähle Key User nach Ansehen im Team aus, plane ihre Zeit vorher mit der Führungskraft und lasse sie am eigenen Fall schulen. Im Außendienst übernimmt eine kleine Gruppe erfahrener Techniker diese Rolle.

## Was leisten Key User in der Einführung?

Key User sind Fachanwender, die das neue System vor allen anderen kennen. Bei Herstellern haben sie eine zweite Aufgabe: Vertrieb, Innendienst und Service arbeiten an jedem Standort ein wenig anders, und das Projektteam kennt diese Unterschiede nicht. Key User kennen sie und sagen früh, wo der geplante Prozess im eigenen Team nicht funktionieren wird. In ADKAR-Sprache tragen sie Knowledge und Ability ins Team, und je nach Phase verschiebt sich der Schwerpunkt:

```schritte
Vor dem Bau | Workshops · Key User mit Product Owner
  Knowledge entsteht beim Key User selbst: Er erklärt die Abläufe seines Teams samt Sonderfällen und schreibt Akzeptanzkriterien mit.
Vor dem Go-live | Abnahmetest · Key User
  Er testet mit Fällen aus seinem Team und gibt das Wissen in kurzen Runden an die Kollegen weiter.
Erste Wochen | Alltag · Key User vor Ort
  Ability wächst am Arbeitsplatz: Er beantwortet Fragen sofort und meldet Probleme gesammelt ans Projekt.
Betrieb | laufend · Key User und Admin
  Reinforcement: Er arbeitet Neue ein und übersetzt jedes Release für sein Team.
```

Im Abnahmetest sind Key User die besten Tester, weil sie wissen, welche Fälle in ihrem Team vorkommen. Wie ein Abnahmetest mit dem Fachbereich aufgebaut ist, steht in [Salesforce UAT: Wer testet vor dem Release?](../../../blog/salesforce-uat-abnahmetest-fachbereich/).

## Key User nach Ansehen im Team auswählen

Oft wird Key User, wer gerade Luft im Kalender hat. Das ist die schlechteste Wahl. Jedes meiner Kriterien hat einen Grund im ADKAR-Modell:

| Kriterium | Woran Sie es erkennen | Welche Stufe es stützt |
|---|---|---|
| Ansehen | Schon heute holt sich das Team bei dieser Person Rat, ganz gleich zu welchem System | Desire: Den Rat einer geschätzten Kollegin nimmt das Team an |
| Prozesswissen | Sie kennt den Alltag von Angebot, Auftrag oder Serviceeinsatz im Team, Ausnahmen eingeschlossen | Knowledge: Sie übersetzt das System in die eigenen Fälle |
| Kritischer Blick | Sie fragt nach, statt zu jubeln, und findet so Schwächen früh | Desire: Ist sie überzeugt, glaubt man ihr |
| Verbleib | Kein Stellenwechsel in den nächsten Monaten absehbar | Reinforcement: Das Wissen bleibt im Team |

Ein einfacher Weg zu den Kandidaten: Fragen Sie in jedem Team, wen die Leute heute fragen, wenn sie im System nicht weiterkommen. Die Namen, die mehrfach fallen, sind Ihre Kandidaten. Die Grenzen der Rolle, Aufgaben im Betrieb und wie das Netzwerk zusammenhält, beschreibe ich in [Key User in Salesforce-Einführungen: was sie leisten](../../../blog/salesforce-key-user-netzwerk/).

## Wie viel Zeit muss der Fachbereich freistellen?

Ohne freigestellte Zeit bleibt Key User ein Etikett. Den Bedarf bestimmt der Umfang. Für die Planung rechne ich mit vier halbtägigen Workshops, einer Woche Abnahmetest mit halber Kapazität und den ersten zwei Wochen nach dem Go-live mit einem Drittel. Das sind knapp acht Arbeitstage, Vorbereitung und Kurzschulungen für Kollegen kommen hinzu. Im Betrieb bleiben ein paar Stunden im Monat, meist rund um Releases.

```hinweis tipp
Halten Sie mit der Führungskraft schriftlich fest, in welchen Wochen und wie viele Stunden der Key User fürs Projekt arbeitet und wer so lange seine Aufgaben macht. Das Papier gehört in den Sponsor-Plan aus Kapitel 2.
```

Anerkennung, die andere sehen, kostet nichts und wirkt. Die Projektarbeit gehört ins Jahresgespräch. Das entscheidet darüber, ob sich beim nächsten Projekt wieder jemand meldet.

## Schulung kurz vor dem Go-live, mit Fällen aus dem eigenen Alltag

Eine Schulung zwei Monate vor dem Go-live ist vergessen, wenn das System kommt. Eine Schulung mit erfundenen Beispieldaten zeigt die Funktion, aber nicht den eigenen Fall. Ich plane Schulungen deshalb nach drei Regeln:

1. **Kurz vor dem Go-live.** Wenige Tage bis zwei Wochen vorher, damit das Wissen bis zum ersten Kundenfall hält.
2. **Am echten Fall.** Der Innendienst legt ein Angebot für einen Kunden an, den er kennt, mit den Produkten, die er verkauft. Dafür braucht die Schulungsumgebung realistische Daten.
3. **Von Key Usern mit dem Projektteam.** Key User erklären in der Sprache des Teams, das Projektteam beantwortet die Fragen, die tiefer gehen.

Danach entscheidet die erste Woche. In dieser Zeit sollten Key User vor Ort erreichbar sein, und das Projektteam sollte nicht schon das nächste Thema starten. Für Hinweise direkt in Salesforce gibt es In-App Guidance: kurze Einblendungen, die neue Felder oder Abläufe erklären, wenn ein Anwender sie zum ersten Mal sieht.

## Was ist im Außendienst anders?

Servicetechniker sind selten im Büro, kommen zu Schulungen oft nur einmal und haben wenig Geduld mit Software, die beim Kunden nicht funktioniert. Wenn die App in der ersten Woche zweimal versagt, gilt sie im Team als unbrauchbar. Bei Technikern fehlt deshalb häufig Ability, etwa wenn die App im Keller ohne Netz keine Daten hat, und das löst eine technische Änderung, keine Schulung.

```praxis
In meinen Field-Service-Projekten mit Wartung, Störungseinsätzen und Inbetriebnahmen lagen die Stolpersteine an drei Stellen: Datenqualität der Anlagen, Akzeptanz bei den Technikern und Schnittstellen zum ERP. Alle drei bekommt man in einer Region leichter in den Griff als im ganzen Außendienst auf einmal.
```

Ich empfehle drei bis fünf erfahrene Techniker pro Region, die vor dem Rollout mitarbeiten. Sie testen Formulare im echten Einsatz, nehmen die App dorthin mit, wo kein Netz ist, schulen ihre Kollegen und bleiben danach Ansprechpartner wie Key User im Innendienst. Wichtig ist, dass ihre Rückmeldungen sichtbare Änderungen bewirken. Was Techniker von der App abhält und wie Sie Standortdaten offen klären, steht in [Field Service App: wie Techniker sie annehmen](../../../blog/field-service-app-akzeptanz-techniker/), die Einführung in Wellen im Field-Service-Kapitel [KI-Agenten, Einführung und Kennzahlen](../../field-service/field-service-ki-agenten-einfuehrung/).

## In jedem Team fragen, wen die Leute heute um Rat fragen

Fragen Sie in jedem betroffenen Team, wen die Leute heute um Rat fragen, und sprechen Sie mit den Führungskräften dieser Personen über Zeit und Vertretung. Nehmen Sie die Key User in die ersten Workshops mit, bevor gebaut wird, und planen Sie die Schulung am echten Fall in die letzten zwei Wochen vor dem Go-live. Wie das in einem Rollout über mehrere Länder aussieht, zeigt [Kapitel 4](../change-management-rollout-laender/). Die Rolle der Führung dahinter steht in [Kapitel 2](../sponsor-und-kommunikation/).
