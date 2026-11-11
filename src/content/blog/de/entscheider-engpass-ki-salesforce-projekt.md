---
title: "Entscheider als Engpass im KI-Salesforce-Projekt"
metaTitle: "Engpass Entscheider: KI-getriebene Salesforce-Projekte"
description: "Mit Coding-Agenten baut das Team schneller, als der Kunde entscheidet. Warum Entscheider zum Engpass werden und wie Sie Entscheidungen organisieren."
pubDate: 2026-11-05
updatedDate: 2026-11-09
lang: de
slug: entscheider-engpass-ki-salesforce-projekt
translationKey: decision-makers-bottleneck-ai
topic: governance
categories: [architecture, ai, change-management]
tags: [KI-native Delivery, Product Owner, Programmsteuerung, Entscheidungen, Change Management, Maschinenbau]
takeaways:
  - "Setzt ein Agent eine Story an einem Tag um, braucht die Antwort auf eine Rückfrage aber drei Tage, bestimmt die Wartezeit beim Kunden das Projekttempo."
  - "Entscheider sind im Tagesgeschäft gebunden, Prozesse sind nicht abgestimmt, und selten kennt jemand den Alltag der Nutzer und verantwortet zugleich den Scope."
  - "Mehr Druck auf dieselben Personen löst den Engpass nicht, er erzeugt Entscheidungen ohne Abstimmung und damit Änderungen nach der Umsetzung."
  - "Entscheidungszeit gehört ins Budget: ein freigestellter Product Owner, Prozessverantwortliche mit Entscheidungsbefugnis, Fristen mit klarer Eskalation."
  - "Wer durch Entscheidungen blockierte Zeit misst und neben der Umsetzungszeit berichtet, kann dem Management zeigen, warum das Projekt nicht schneller wird."
faq:
  - q: "Warum werden KI-getriebene Salesforce-Projekte nicht automatisch schneller?"
    a: "Coding-Agenten verkürzen die Umsetzungszeit, nicht die Zeit, bis jemand beim Kunden über Prozess und Scope entscheidet. Entsteht der größte Teil der Durchlaufzeit auf dem kritischen Pfad durch das Warten auf Antworten, ändert eine schnellere Umsetzung wenig."
  - q: "Wie viel Zeit braucht ein Product Owner in einem KI-getriebenen Salesforce-Projekt?"
    a: "Nach meiner Einschätzung rund die Hälfte der Arbeitszeit für einen Stream, wenn das Team täglich lauffähige Software zeigt. Der Bedarf hängt von Teamgröße, Stakeholdern und dem Umfang der Delegation an Prozessverantwortliche ab. Ohne Vertretung im Tagesgeschäft bleibt diese Zeit auf dem Papier."
  - q: "Muss der Product Owner alle fachlichen Detailfragen selbst beantworten?"
    a: "Nein. Er verantwortet Scope und Prioritäten; Detailfragen zum Prozess beantworten Prozessverantwortliche oder Key User innerhalb vereinbarter Leitplanken, technische Fragen beantwortet der Architekt auf Kundenseite."
  - q: "Was tun, wenn eine Entscheidung nicht rechtzeitig kommt?"
    a: "Vereinbaren Sie Fristen nach Art der Entscheidung und einen Eskalationsweg. Bei risikoarmen, reversiblen Entscheidungen innerhalb vereinbarter Leitplanken kann der dokumentierte Vorschlag des Teams gelten und wird im Entscheidungslog festgehalten. Für Datenschutz, Preise, Garantie, Berechtigungen und irreversible Migrationen braucht es eine ausdrückliche Freigabe; Schweigen reicht nicht."
draft: false
---

Wenn Coding-Agenten die Salesforce-Delivery beschleunigen, ist das Entwicklungsteam oft nicht mehr der Engpass. Mit KI-getriebenen Projekten meine ich den Einsatz von KI im Delivery-Prozess und nicht die Einführung eines KI-Produkts. Coding-Agenten setzen eine Story innerhalb von Stunden um. Warten muss das Team dann nach meiner Erfahrung auf die Entscheider beim Kunden: auf Antworten zum Prozess, auf Freigaben, auf Abnahmen. Diese Personen sind im Tagesgeschäft gebunden, die Prozesse sind intern oft nicht abgestimmt, und selten kennt jemand den Alltag der Nutzer und verantwortet zugleich den Scope. Mehr Druck hilft nicht. Entscheidungen brauchen eigenes Budget, explizite und delegierte Entscheidungsrechte sowie Fristen.

## Warum wird der Entscheider zum Engpass, wenn KI entwickelt?

Ein Projekt ist so schnell wie sein langsamster Schritt. Solange Entwickler Wochen für einen Stream brauchten, fiel nicht auf, dass Rückfragen an den Fachbereich ein paar Tage unbeantwortet blieben. Coding-Agenten können die Umsetzungszeit verkürzen, die Wartezeit bleibt. Den Ablauf, bei dem der Agent die Vorarbeit übernimmt und Menschen an festgelegten Entscheidungspunkten entscheiden, beschreibe ich in [KI-nativer Delivery-Prozess für Salesforce](../ki-native-salesforce-delivery-prozess/). Er ist mein Zielbild; einzelne Schritte nutze ich schon, aber noch nicht durchgängig. Schon in dieser Skizze liegt die Verantwortung für drei der fünf Entscheidungspunkte beim Kunden.

Der DORA-Bericht 2025 beschreibt KI als Verstärker: Sie vergrößert die Stärken guter Organisationen und die Schwächen der anderen. Google warnt im [DORA-Beitrag vom Dezember 2025](https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work?hl=en) ausdrücklich davor, dass Tempogewinne einzelner Schritte nur Arbeit vor dem nächsten Schritt aufstauen; DORA nennt Reviews, Tests, Sicherheit und Deployment als Beispiele. Dass Entscheidungen beim Kunden zum nächsten Engpass werden, ist meine eigene Beobachtung aus Projekten und kein Forschungsergebnis.

Die Standish Group bringt Entscheidungslatenz seit Langem mit Projekterfolg in Verbindung, und die [Auswertung im SAFe Fellow Blog](https://framework.scaledagile.com/blog/safe-fellow-blog-improving-decision-latency) nennt sie als stärkeren Faktor als die Wahl zwischen agil und Wasserfall. Die aus den CHAOS-Berichten zitierten Zahlen unterscheiden sich je nach Sekundärquelle, deshalb wiederhole ich sie hier nicht. Meine Hypothese: Wenn die Umsetzung billiger wird, wiegt das Entscheidungstempo noch schwerer.

## Drei Gründe, warum Entscheidungen beim Kunden liegen bleiben

```praxis
In jedem meiner Projekte hat der Abnahmetest oder die Abnahme der Stories länger gedauert, als der Kunde eingeplant hatte. Die Personen auf Kundenseite waren nicht verfügbar. Danach wurden viele Change Requests gestellt, weil sich der Fachbereich vorher nicht ausreichend mit der eigenen Lösung und dem Status quo auseinandergesetzt hatte. Dahinter sehe ich auf Kundenseite immer wieder dieselben Muster: Entscheider im Tagesgeschäft, intern ungeklärte Prozesse und niemand, der nah genug am Alltag der Anwender ist und trotzdem Scope und Ausrichtung des Projekts verantworten kann.
```

### Das Tagesgeschäft gewinnt

Der Serviceleiter, der im Projekt über den Prozess für Garantiefälle entscheiden soll, führt zugleich ein Team. Fällt eine Maschine beim Kunden aus, hat die Störungsbehebung Vorrang. Im klassischen Projekt fiel das kaum auf, weil der Fachbereich zwischen Konzept und Abnahmetest ohnehin wochenlang wenig zu tun hatte. Mit täglichen Demos braucht das Team jeden Tag eine Antwort. In [KI-native Delivery: kleinere Salesforce-Teams](../ki-kleinere-salesforce-teams-delivery/) schätze ich den Bedarf auf rund die Hälfte der Arbeitszeit pro Stream. Diese Zeit steht selten im Projektplan.

### Der Prozess ist intern nicht geklärt

Auf viele Rückfragen des Teams hat das Unternehmen selbst noch keine Antwort: Wer gibt eine Kulanzgutschrift über 5.000 Euro frei? Gilt die Regel im Händlervertrieb genauso wie im Direktvertrieb? Ein Agent macht aus einer unklaren Story innerhalb weniger Stunden eine lauffähige Lösung. Das ist hilfreich, weil der Fachbereich die Lücke am Prototyp sieht, und teuer, wenn dieselbe Story nach jeder internen Abstimmung neu umgesetzt wird.

Ein Teil der Verzögerung entsteht auch auf der Delivery-Seite: durch Rückfragen ohne Optionen, Folgen oder Empfehlung, durch eskalierte Details, die das Team selbst entscheiden könnte, und durch Stories, die ohne klare Akzeptanzkriterien umgesetzt werden. Bevor für den Kunden eine Frist gilt, muss eine Frage entscheidungsreif sein.

### Die Person, die beides kann, gibt es selten

Ein Product Owner braucht zwei Voraussetzungen, die in vielen Organisationen schwer miteinander zu vereinbaren sind. Er braucht die Nähe zum Alltag der Disponenten oder Vertriebsinnendienstler, sonst entscheidet er an deren Bedarf vorbei. Und er braucht das Mandat, Scope zu streichen und Prioritäten gegen andere Abteilungen durchzusetzen. Wer nah am Tagesgeschäft ist, hat dieses Mandat meist nicht. Wer es hat, ist meist weit weg vom Alltag.

## Mehr Druck auf die Entscheider erhöht den Durchsatz nicht

Das Management hört, dass KI die Entwicklung beschleunigt, und erwartet kürzere und billigere Projekte. Bleibt das aus, steigt der Druck auf die Personen, die ohnehin schon zu wenig Zeit haben. Sie antworten dann schneller, aber weniger abgestimmt, und die fehlende Abstimmung kehrt nach der Umsetzung als Änderung zurück.

Ein Rechenbeispiel mit angenommenen Zahlen zeigt, warum der Blick auf die Entwicklung allein täuscht. Eine Story brauchte bisher fünf Tage Entwicklung und Test. Dazu kommen drei Rückfragen an den Fachbereich, die nacheinander beantwortet werden müssen und die Story jeweils zwei Tage blockieren: sechs Tage auf dem kritischen Pfad. Die Durchlaufzeit liegt bei elf Tagen. Mit einem Coding-Agenten sinkt die Zeit für Umsetzung und Review auf eineinhalb Tage, die Durchlaufzeit auf siebeneinhalb Tage, von denen 80 Prozent auf Wartezeit entfallen. Das ist ein Gewinn. Halbiert der nächste Werkzeugsprung die Umsetzungszeit noch einmal, sinkt die Durchlaufzeit nur noch auf knapp sieben Tage, weil fast 90 Prozent davon auf Wartezeit entfallen. Bei den Kosten zeigt sich ein ähnliches Muster: Der Partner bucht weniger Entwicklerstunden, aber die Stunden für Workshops, Abstimmung und Nacharbeit nach späten Entscheidungen bleiben, und blockierte Teamkapazität kostet zusätzlich.

Für das Management heißt das: Die Einsparung beim Partner ist nur ein Teil der Rechnung. Der andere Teil ist interne Zeit, die bisher in keinem Budget stand, weil sie sich über den langen Projektverlauf verteilt hat. Mit Coding-Agenten konzentriert sie sich auf wenige Wochen und wird sichtbar. Wer sie nicht einplant, erhält ein Projekt, das auf dem Papier billiger ist und im Kalender länger dauert. Wie Sie messen, ob ein Programm mit KI schneller wird, beschreibe ich in [KI-Nutzen im Salesforce-Projekt messen](../ki-nutzen-salesforce-projekt-messen/).

## Was hilft gegen den Engpass beim Kunden?

Der Engpass schrumpft, wenn Entscheidungen wie jede andere Projektressource geplant werden. Diese Hebel würde ich vor dem Start vereinbaren:

```hebel
Entscheidungszeit budgetieren | Einfache Rückfragen werden innerhalb eines Tages beantwortet
  Der Product Owner wird für einen festen Anteil freigestellt, und seine Führungskraft regelt die Vertretung im Tagesgeschäft. Diese Zeit wird im Business Case als Kosten ausgewiesen, neben dem Partnerbudget.
Entscheidungsrechte verteilen | Der Product Owner entscheidet nur, was nur er entscheiden kann
  Scope und Prioritäten beim Product Owner, Prozessdetails bei Prozessverantwortlichen oder Key Usern innerhalb von Leitplanken, Technik beim Architekten auf Kundenseite.
Prozesse vor der Umsetzung klären | Weniger Änderungen nach der Umsetzung
  Offene Prozessfragen werden zu eigenen Aufgaben mit Verantwortlichem und Termin; ein ungeklärter Prozess wird in einem zeitlich begrenzten Prototyp geklärt und nicht als vermeintlich fertige Story für den Produktivbetrieb umgesetzt.
```

Dazu kommt eine Regel für Rückfragen: Jede Frage hat einen dokumentierten Vorschlag des Teams und eine Frist nach Art der Entscheidung, zum Beispiel bis zum nächsten Arbeitstag für reversible operative Fragen und zwei Arbeitstage für Fragen, die einen Stream betreffen. Bei risikoarmen, reversiblen Entscheidungen innerhalb vereinbarter Leitplanken gilt der Vorschlag ohne Antwort und wird im [Entscheidungslog](../salesforce-architektur-entscheidungslog/) festgehalten; wer später widerspricht, löst einen Change Request aus und keinen stillen Umbau. Für Datenschutz, Preise, Garantieregeln, Berechtigungen und irreversible Migrationen braucht es eine ausdrückliche Freigabe oder Eskalation; Schweigen reicht nicht. Damit liegt die Verzögerung nicht mehr unsichtbar beim Team.

Die Rollen lassen sich so aufteilen:

```tabelle
titel: Wer im Projekt worüber entscheidet
spalten: | Entscheidet | Gibt ab
Product Owner | Scope, Prioritäten, Abnahme der Stories * | Detailfragen zum Prozess
Prozessverantwortliche, Key User | Prozessdetails innerhalb der Leitplanken * | Alles, was den Scope ändert
Architekt auf Kundenseite | Datenmodell, Schnittstellen, technische Leitplanken * | Fachliche Prioritäten
Lenkungsausschuss | Konflikte zwischen Bereichen, Freistellung von Personen * | Tagesentscheidungen
fazit: Das Netzwerk aus Key Usern entlastet den Product Owner nur, wenn es eigene Entscheidungsbefugnisse hat.
```

Wie ein solches Netzwerk aufgebaut wird, steht in [Key-User-Netzwerk für Salesforce](../salesforce-key-user-netzwerk/). Dass sich die Rolle der Entscheider ändert, ist eine Veränderung wie jede andere im Projekt. Sie braucht Kommunikation und Rückhalt von oben. Deshalb gehört sie in das [Change Management meiner Salesforce-Programme](../../leistungen/change-management/), das ich gemeinsam mit Juliane Winterscheid begleite.

## Erster Schritt: zwei Wochen lang die Wartezeit auf Entscheidungen messen

Bevor Sie Rollen umbauen, brauchen Sie eine Zahl, die das Management versteht.

```schritte
Rückfragen erfassen | 2 Wochen · Team
  Jede Rückfrage an den Fachbereich als Ticket mit dem Datum, an dem sie entscheidungsreif war, dem Datum der Antwort und der Angabe, ob sie die Umsetzung blockiert hat.
Wartezeit auswerten | 1 Tag · Projektleitung
  Median und 85. Perzentil der Antwortzeit, blockierte Tage je Story auf dem kritischen Pfad, Nacharbeit nach späten Entscheidungen und die drei häufigsten Themen.
Im Lenkungsausschuss zeigen | nächster Termin
  Umsetzungszeit und Wartezeit nebeneinander, verbunden mit der Forderung nach verbindlich freigestellter Zeit und klaren Fristen.
```

Die Auswertung zeigt meist auch, welche Prozesse intern ungeklärt sind: Dort häufen sich die Rückfragen. Diese Prozesse sind die ersten Kandidaten für eine Klärung vor dem nächsten Sprint, und die Messung ist Teil meiner [Programmsteuerung für Salesforce-Programme](../../leistungen/projektsteuerung-nearshore/).
