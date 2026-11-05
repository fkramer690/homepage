---
title: "Entscheider als Engpass im KI-Salesforce-Projekt"
metaTitle: "Engpass Entscheider: KI-getriebene Salesforce-Projekte"
description: "Mit Coding-Agenten baut das Team schneller, als der Kunde entscheidet. Warum Entscheider zum Engpass werden und wie Sie Entscheidungen organisieren."
pubDate: 2026-11-05
lang: de
slug: entscheider-engpass-ki-salesforce-projekt
translationKey: decision-makers-bottleneck-ai
topic: governance
categories: [architecture, ai, change-management]
tags: [KI-native Delivery, Product Owner, Programmsteuerung, Entscheidungen, Change Management, Maschinenbau]
takeaways:
  - "Baut ein Agent eine Story an einem Tag, die Antwort auf eine Rückfrage braucht aber drei, bestimmt die Wartezeit auf den Kunden das Tempo des Projekts."
  - "Entscheider stecken im Tagesgeschäft, Prozesse sind nicht abgestimmt, und selten kennt jemand den Alltag der Nutzer und verantwortet zugleich den Scope."
  - "Mehr Druck auf dieselben Personen löst den Engpass nicht, er erzeugt Entscheidungen ohne Abstimmung und damit Änderungen nach dem Bau."
  - "Entscheidungszeit gehört ins Budget: ein freigestellter Product Owner, Prozessverantwortliche mit eigenen Rechten, Fristen mit Standardregel."
  - "Wer die Wartezeit auf Entscheidungen misst und neben der Bauzeit berichtet, kann dem Management zeigen, warum das Projekt nicht schneller wird."
faq:
  - q: "Warum werden KI-getriebene Salesforce-Projekte nicht automatisch schneller?"
    a: "Coding-Agenten verkürzen die Bauzeit, nicht die Zeit, bis jemand beim Kunden über Prozess und Scope entscheidet. Liegt der größte Teil der Durchlaufzeit im Warten auf Antworten, ändert schnelleres Bauen wenig."
  - q: "Wie viel Zeit braucht ein Product Owner in einem KI-getriebenen Salesforce-Projekt?"
    a: "Nach meiner Einschätzung rund die Hälfte der Arbeitszeit pro Stream, wenn das Team täglich laufende Software zeigt. Ohne Vertretung im Tagesgeschäft bleibt diese Zeit auf dem Papier."
  - q: "Muss der Product Owner alle fachlichen Detailfragen selbst beantworten?"
    a: "Nein. Er verantwortet Scope und Prioritäten; Detailfragen zum Prozess beantworten Prozessverantwortliche oder Key User innerhalb vereinbarter Leitplanken, technische Fragen der Architekt auf Kundenseite."
  - q: "Was tun, wenn eine Entscheidung nicht rechtzeitig kommt?"
    a: "Vereinbaren Sie eine Frist, etwa zwei Arbeitstage, und eine Standardregel: Ohne Antwort gilt der dokumentierte Vorschlag des Teams und landet im Entscheidungslog. Wer später widerspricht, löst einen Change Request aus."
draft: false
---

In einem KI-getriebenen Salesforce-Projekt ist das Entwicklungsteam nicht mehr der Engpass. Coding-Agenten bauen eine Story in Stunden, der Entwickler reviewt, die Pipeline prüft. Warten muss das Team dann auf die Entscheider beim Kunden: auf Antworten zum Prozess, auf Freigaben, auf Abnahmen. Diese Personen stecken im Tagesgeschäft, die Prozesse sind intern oft nicht abgestimmt, und selten kennt jemand den Alltag der Nutzer und verantwortet zugleich den Scope. Wer nur den Druck auf diese Personen erhöht, macht das Projekt nicht schneller. Entscheidungen brauchen eigenes Budget, verteilte Rechte und Fristen.

## Warum wird der Entscheider zum Engpass, wenn KI entwickelt?

Ein Projekt ist so schnell wie sein langsamster Schritt. Solange Entwickler Wochen für einen Stream brauchten, fiel nicht auf, dass Rückfragen an den Fachbereich ein paar Tage lagen. Mit Coding-Agenten schrumpft die Bauzeit, die Wartezeit bleibt. Den Ablauf, in dem der Agent die Fleißarbeit macht und Personen an festen Toren entscheiden, beschreibe ich in [KI-nativer Delivery-Prozess für Salesforce](../ki-native-salesforce-delivery-prozess/). Er ist mein Zielbild; einzelne Schritte nutze ich schon, durchgängig noch nicht. Schon in dieser Skizze stehen drei der fünf Tore beim Kunden.

Der DORA-Bericht 2025 beschreibt KI als Verstärker: Sie vergrößert die Stärken guter Organisationen und die Schwächen der anderen. Google warnt im [DORA-Beitrag vom Dezember 2025](https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work?hl=en) ausdrücklich davor, dass Tempogewinne einzelner Schritte nur Arbeit vor dem nächsten Schritt aufstauen. Wie stark Entscheidungstempo über Projekte entscheidet, zeigt eine ältere Zahl der Standish Group:

```kennzahlen
75 % | der Projekte mit Entscheidungen in Stunden oder Tagen waren erfolgreich
21 % | waren es bei Entscheidungen, die Wochen oder Monate dauerten
quelle: Standish Group, CHAOS 2020, zitiert im SAFe Fellow Blog „Improving Decision Latency“
```

Die Zahlen stammen aus der Zeit vor Coding-Agenten. Die [Auswertung im SAFe Fellow Blog](https://framework.scaledagile.com/blog/safe-fellow-blog-improving-decision-latency) nennt die Entscheidungslatenz als stärkeren Faktor als die Wahl zwischen agil und Wasserfall. Wenn der Bau billiger wird, wiegt dieser Faktor noch schwerer.

## Drei Gründe, warum Entscheidungen beim Kunden liegen bleiben

```praxis
Auf Kundenseite sehe ich drei Muster: Die Entscheider sind zu stark ins Tagesgeschäft eingebunden und haben zu wenig Kapazität für das Projekt. Die Prozesse sind intern nicht klar, deshalb kommen viele Rückfragen ins Team oder Änderungen nach dem Bau. Und es ist schwierig, eine Person zu finden, die nah genug am Tagesgeschäft ist, um die Bedarfe der Anwender zu verstehen, und trotzdem Scoping und strategische Ausrichtung des Projekts verantworten kann.
```

### Das Tagesgeschäft gewinnt

Der Serviceleiter, der im Projekt über den Prozess für Garantieanträge entscheiden soll, führt nebenbei sein Team. Steht eine Maschine beim Kunden, gewinnt die Maschine. Im klassischen Projekt fiel das kaum auf, weil der Fachbereich zwischen Konzept und Abnahmetest ohnehin wochenlang wenig zu tun hatte. Mit täglichen Demos braucht das Team jeden Tag eine Antwort. In [KI-native Delivery: kleinere Salesforce-Teams](../ki-kleinere-salesforce-teams-delivery/) schätze ich den Bedarf auf rund die Hälfte der Arbeitszeit pro Stream. Die steht selten im Projektplan.

### Der Prozess ist intern nicht geklärt

Viele Rückfragen des Teams hat sich das Unternehmen selbst noch nicht beantwortet: Wer gibt eine Kulanz über 5.000 Euro frei? Gilt die Regel im Händlervertrieb genauso wie im Direktvertrieb? Ein Agent baut auf eine unklare Story in Stunden etwas Lauffähiges. Das ist hilfreich, weil der Fachbereich die Lücke am Prototyp sieht, und teuer, wenn dieselbe Story nach jeder internen Abstimmung neu gebaut wird.

### Die Person, die beides kann, gibt es selten

Ein Product Owner muss zwei Dinge können, die sich in vielen Organisationen widersprechen. Er braucht die Nähe zum Alltag der Disponenten oder Vertriebsinnendienstler, sonst entscheidet er an deren Bedarf vorbei. Und er braucht das Mandat, Scope zu streichen und Prioritäten gegen andere Abteilungen durchzusetzen. Wer nah am Tagesgeschäft ist, hat dieses Mandat meist nicht. Wer es hat, ist meist weit weg vom Alltag.

## Mehr Druck auf die Entscheider macht nichts schneller

Das Management hört, dass KI die Entwicklung beschleunigt, und erwartet kürzere und billigere Projekte. Bleibt das aus, steigt der Druck auf die Personen, die ohnehin schon zu wenig Zeit haben. Sie antworten dann schneller und weniger abgestimmt, und die Abstimmung kommt nach dem Bau als Änderung zurück.

Ein Rechenbeispiel mit angenommenen Zahlen zeigt, warum der Blick auf die Entwicklung allein täuscht. Eine Story brauchte bisher fünf Tage Entwicklung und Test. Dazu kommen drei Rückfragen an den Fachbereich, die jeweils zwei Tage warten: sechs Tage. Die Durchlaufzeit liegt bei elf Tagen. Mit einem Coding-Agenten sinken Bau und Review auf eineinhalb Tage, die Durchlaufzeit auf siebeneinhalb. Das ist ein Gewinn. Halbiert der nächste Werkzeugsprung die Bauzeit noch einmal, sinkt die Durchlaufzeit nur noch auf knapp sieben Tage, weil 80 Prozent davon Warten sind. Bei den Kosten ist es ähnlich: Der Partner bucht weniger Entwicklerstunden, aber die Stunden für Workshops, Abstimmung und Nacharbeit nach späten Entscheidungen bleiben.

Für das Management heißt das: Die Einsparung beim Partner ist nur die halbe Rechnung. Die andere Hälfte ist Zeit aus dem eigenen Haus, die bisher in keinem Budget stand, weil sie sich im langen Projektverlauf verteilt hat. Mit Coding-Agenten fällt sie in wenige Wochen und wird sichtbar. Wer sie nicht einplant, bekommt ein Projekt, das auf dem Papier billiger ist und im Kalender länger dauert. Wie Sie messen, ob ein Programm mit KI schneller wird, beschreibe ich in [KI-Nutzen im Salesforce-Projekt messen](../ki-nutzen-salesforce-projekt-messen/).

## Was hilft gegen den Engpass beim Kunden?

Der Engpass verschwindet, wenn Entscheidungen wie jede andere Projektressource geplant werden. Diese Hebel würde ich vor dem Start vereinbaren:

```hebel
Entscheidungszeit budgetieren | Rückfragen werden am selben Tag beantwortet
  Der Product Owner wird für einen festen Anteil freigestellt, und seine Führungskraft regelt die Vertretung im Tagesgeschäft. Diese Zeit steht im Business Case als Kosten, neben dem Partnerbudget.
Entscheidungsrechte verteilen | Der Product Owner entscheidet nur, was nur er entscheiden kann
  Scope und Prioritäten beim Product Owner, Prozessdetails bei Prozessverantwortlichen oder Key Usern innerhalb von Leitplanken, Technik beim Architekten auf Kundenseite.
Prozesse vor dem Bau klären | Weniger Änderungen nach dem Bau
  Offene Prozessfragen werden eigene Aufgaben mit Verantwortlichem und Termin, keine Story geht mit ungeklärtem Prozess in den Bau.
```

Dazu kommt eine Regel für Rückfragen: Jede Frage hat eine Frist, etwa zwei Arbeitstage, und einen dokumentierten Vorschlag des Teams. Kommt keine Antwort, gilt der Vorschlag und landet im [Entscheidungslog](../salesforce-architektur-entscheidungslog/). Wer später widerspricht, löst einen Change Request aus und keinen stillen Umbau. Damit liegt die Verzögerung nicht mehr unsichtbar beim Team.

Die Rollen lassen sich so aufteilen:

```tabelle
titel: Wer im Projekt worüber entscheidet
spalten: | Entscheidet | Gibt ab
Product Owner | Scope, Prioritäten, Abnahme des Streams * | Detailfragen zum Prozess
Prozessverantwortliche, Key User | Prozessdetails innerhalb der Leitplanken * | Alles, was den Scope ändert
Architekt auf Kundenseite | Datenmodell, Schnittstellen, technische Leitplanken * | Fachliche Prioritäten
Lenkungsausschuss | Konflikte zwischen Bereichen, Freistellung von Personen * | Tagesentscheidungen
fazit: Das Netzwerk aus Key Usern entlastet den Product Owner nur, wenn es eigene Rechte hat.
```

Wie ein solches Netzwerk aufgebaut wird, steht in [Key-User-Netzwerk für Salesforce](../salesforce-key-user-netzwerk/). Dass sich für die Entscheider die eigene Rolle ändert, ist eine Veränderung wie jede andere im Projekt. Sie braucht Kommunikation und Rückhalt von oben. Deshalb gehört sie in das [Change Management meiner Salesforce-Programme](../../leistungen/change-management/), das ich gemeinsam mit Juliane Winterscheid begleite.

## Erster Schritt: zwei Wochen lang die Wartezeit auf Entscheidungen messen

Bevor Sie Rollen umbauen, brauchen Sie eine Zahl, die das Management versteht.

```schritte
Rückfragen erfassen | 2 Wochen · Team
  Jede Rückfrage an den Fachbereich als Ticket mit Datum der Frage und Datum der Antwort.
Wartezeit auswerten | 1 Tag · Projektleitung
  Anteil der Wartezeit an der Durchlaufzeit je Story und die drei häufigsten Themen der Rückfragen.
Im Lenkungsausschuss zeigen | nächster Termin
  Bauzeit und Wartezeit nebeneinander, mit dem Antrag auf Freistellung und Frist.
```

Die Auswertung zeigt meist auch, welche Prozesse intern ungeklärt sind: Dort häufen sich die Rückfragen. Diese Prozesse sind die ersten Kandidaten für eine Klärung vor dem nächsten Sprint, und die Messung ist Teil meiner [Programmsteuerung für Salesforce-Programme](../../leistungen/projektsteuerung-nearshore/).
