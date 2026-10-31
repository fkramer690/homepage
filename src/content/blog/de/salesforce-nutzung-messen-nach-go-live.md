---
title: "Salesforce-Nutzung nach dem Go-live messen"
description: "Welche Zahlen nach dem Go-live zeigen, ob ein neuer Salesforce-Prozess angekommen ist, woher sie kommen und warum Logins allein wenig über die Nutzung sagen."
pubDate: 2026-10-29
lang: de
slug: salesforce-nutzung-messen-nach-go-live
translationKey: change-adoption-metrics
topic: data
categories: [change-management, architecture]
coAuthor: juliane
contactBrief: change
tags: [Nutzung, Adoption, Change Management, Kennzahlen]
takeaways:
  - "Die Zahl der Schulungen zeigt, dass das Projekt seine Arbeit gemacht hat. Ob jemand anders arbeitet, zeigt sie nicht."
  - "Logins sagen wenig. Wer sich anmeldet, um eine Liste zu exportieren und in Excel weiterzuarbeiten, zählt als aktiver Nutzer."
  - "Ich messe auf vier Ebenen: Aktivität, Nutzung des Prozesses, Datenqualität und Ergebnis, jeweils pro Gruppe und Land."
  - "Die Zahlen werden vor dem Go-live festgelegt, mit einem Ausgangswert, und nach dem Go-live regelmäßig mit dem Sponsor besprochen."
faq:
  - q: "Wie misst man die Nutzung von Salesforce?"
    a: "Mit Berichten über Datensätze, die Nutzer anlegen und pflegen, getrennt nach Gruppen und Ländern, ergänzt um Logins und Seitenaufrufe aus den Nutzungsdaten von Salesforce. Entscheidend ist, ob der neue Prozess in Salesforce stattfindet."
  - q: "Reichen Login-Zahlen als Kennzahl für Adoption?"
    a: "Nein. Ein Login zeigt nur, dass jemand das System geöffnet hat. Ob er darin arbeitet oder nur exportiert, zeigen erst die Datensätze, die er anlegt und ändert."
  - q: "Wann sollte man die Nutzung messen?"
    a: "Ab dem ersten Monat nach dem Go-live, monatlich, über mindestens ein halbes Jahr. Die Kennzahlen und ihr Ausgangswert gehören schon vor dem Go-live fest."
  - q: "Was tun, wenn eine Gruppe Salesforce kaum nutzt?"
    a: "Fragen, an welcher ADKAR-Stufe es hängt. Fehlt das Verständnis, warum, hilft keine weitere Schulung; dann muss die Führungskraft der Gruppe erklären, wofür die Daten gebraucht werden."
draft: false
---

Ob ein neuer Salesforce-Prozess nach dem Go-live angekommen ist, zeigen Berichte über angelegte und gepflegte Datensätze, pro Gruppe und Land, zuverlässiger als eine Umfrage. Logins sagen wenig: Wer sich anmeldet, eine Liste exportiert und in Excel weiterarbeitet, zählt als aktiver Nutzer. Ich messe deshalb auf vier Ebenen: Aktivität, Nutzung des Prozesses, Datenqualität und Ergebnis. Welche Zahlen es sind und welcher Ausgangswert gilt, steht vor dem Go-live fest. Danach bespricht der Sponsor sie jeden Monat, damit auffällt, wenn eine Gruppe neben Salesforce weiter mit eigenen Listen arbeitet.

## Schulungszahlen sagen nichts über Nutzung

Viele Programme berichten nach dem Go-live, wie viele Personen geschult wurden. Die Zahl sagt, dass das Projekt seine Arbeit gemacht hat. Ob jemand anders arbeitet, sagt sie nicht. Deshalb lege ich zu Beginn fest, woran Erfolg gemessen wird, zum Beispiel an Nutzungszahlen in Salesforce und nicht an der Zahl der Schulungen.

Salesforce hilft beim Messen, weil fast alles, was ein Nutzer tut, einen Datensatz mit Zeitstempel und Besitzer hinterlässt. Ob ein Vertriebsteam seine Opportunities pflegt, ob der Innendienst Angebote in Salesforce erstellt und ob Techniker Aufträge in der App abschließen, lässt sich mit Standardberichten zählen. Das ist genauer als eine Umfrage, in der jeder angibt, das System regelmäßig zu nutzen.

## Welche Zahlen zeigen, ob ein Prozess angekommen ist?

Ich messe auf vier Ebenen. Jede beantwortet eine andere Frage:

| Ebene | Frage | Beispiele |
|---|---|---|
| Aktivität | Öffnen die Nutzer das System? | aktive Nutzer pro Woche, Logins, Seitenaufrufe |
| Nutzung des Prozesses | Findet der Prozess in Salesforce statt? | Angebote aus Salesforce und nicht aus Word, Aufträge in der App abgeschlossen, Opportunities mit gepflegtem nächsten Schritt |
| Datenqualität | Sind die Daten brauchbar? | Pflichtfelder sinnvoll gefüllt statt mit Punkten, neue Dubletten, veraltete Datensätze |
| Ergebnis | Bringt es, wofür es gebaut wurde? | Prognosegenauigkeit, Erstlösungsquote im Service, Durchlaufzeit vom Angebot zum Auftrag |

Die erste Ebene liefert Salesforce fast ohne Aufwand. Die Login-Historie im Setup zeigt, wer sich wann angemeldet hat, und die Nutzungsdaten der Lightning-Oberfläche zeigen aktive Nutzer und aufgerufene Seiten. Für fertige Dashboards gibt es die kostenlosen Adoption Dashboards von Salesforce Labs auf dem AppExchange. Die aussagekräftigen Zahlen liegen aber auf der zweiten und dritten Ebene, und die müssen Sie für Ihre Prozesse selbst definieren.

Für die Datenqualität sind Dubletten ein guter Frühindikator: Steigt die Zahl neuer Dubletten in einem Land, legen Nutzer dort Kunden an, statt die vorhandenen zu suchen. Wie Sie das messen und verhindern, beschreibe ich in [Dubletten in Salesforce: Stammdaten vor der KI bereinigen](../salesforce-dubletten-stammdaten-bereinigen/).

```hinweis achtung
Legen Sie vor dem Go-live einen Ausgangswert fest, etwa wie viele Angebote heute pro Monat erstellt werden, egal in welchem System. Ohne Ausgangswert wissen Sie nach dem Go-live nicht, ob 200 Angebote in Salesforce viel oder wenig sind.
```

## Wie erkennen Sie Schattenlösungen?

Die teuerste Form niedriger Nutzung ist die Liste neben dem System. Ein Vertrieb, der seine Mengen bisher in einer eigenen Tabelle geführt hat, arbeitet nicht automatisch mit dem neuen Prozess, nur weil er live ist. Drei Zeichen deuten auf eine Schattenlösung hin:

- **Lücken zwischen Aktivität und Prozess.** Ein Team meldet sich täglich an, legt aber kaum Datensätze an. Dann wird gelesen und anderswo gearbeitet.
- **Nachträgliche Massenpflege.** Datensätze werden einmal im Monat in großen Mengen aktualisiert, kurz vor dem Bericht an die Geschäftsführung. Die Arbeit findet woanders statt, Salesforce bekommt nur das Ergebnis.
- **Häufige Exporte.** Berichte, die regelmäßig nach Excel exportiert werden, sind oft die Grundlage einer eigenen Liste. In großen Orgs zeigt das Event Monitoring aus Salesforce Shield solche Exporte.

Keines dieser Zeichen ist ein Beweis. Es ist ein Grund, mit dem Team zu sprechen, am besten über den Key User, wie in [Key User in Salesforce-Einführungen](../salesforce-key-user-netzwerk/) beschrieben.

## Was tun, wenn die Zahlen schlecht sind?

Eine schlechte Zahl ist eine Frage, keine Antwort. Ich frage dann, an welcher Stufe des [ADKAR-Modells](../change-management-salesforce-einfuehrung/) es hängt. Wenn ein Vertriebsteam nicht weiß, wofür gepflegte Opportunities gebraucht werden, fehlt Awareness, und das muss der zuständige Vertriebsleiter erklären, nicht der Trainer. Wenn Techniker die App kennen, aber offline nicht weiterkommen, fehlt Ability, und das löst eine technische Änderung, keine Schulung. Für den Außendienst beschreibe ich das in [Field Service App: wie Techniker sie annehmen](../field-service-app-akzeptanz-techniker/).

Die Zahlen gehören in den regelmäßigen Termin mit dem Sponsor. Wenn der Sponsor im Monatsbericht nach der Nutzung seiner Teams fragt, ist das selbst schon Reinforcement: Die Teams merken, dass es zählt.

## Lenkungsausschuss, Sponsor und Key User brauchen verschiedene Zahlen

Nicht jede Zahl gehört in jeden Bericht. Der Lenkungsausschuss braucht zwei oder drei Zahlen pro Prozess, am besten auf den Ebenen Nutzung und Ergebnis, mit dem Verlauf seit dem Go-live. Der Sponsor eines Landes oder Bereichs braucht dieselben Zahlen für seine Teams, damit er gezielt nachfragen kann. Key User und Teamleitungen brauchen die Detailsicht: Welche Personen legen kaum Datensätze an, welche Felder bleiben leer? Diese Sicht ist für Gespräche gedacht, nicht für Ranglisten. Wer Einzelpersonen öffentlich vergleicht, bekommt gepflegte Zahlen statt gepflegter Daten, und in Deutschland gehört eine solche Auswertung ohnehin vorher mit dem Betriebsrat geklärt.

## Mindestens sechs Monate messen, monatlich

Mindestens ein halbes Jahr, monatlich. Die ersten Wochen nach dem Go-live sind verzerrt: Die Aufmerksamkeit ist hoch, Key User sind präsent, und viele probieren das neue System aus. Ob ein Prozess bleibt, zeigt sich erst nach drei bis sechs Monaten, wenn das Projektteam weitergezogen ist. Fällt eine Zahl in dieser Zeit ab, fehlt Reinforcement. Bei einem weltweiten Rollout messen Sie pro Land, weil jedes Land einen eigenen Verlauf hat, siehe [Change Management im weltweiten Salesforce-Rollout](../change-management-weltweiter-rollout/).

## Erster Schritt: eine Nutzungszahl für den wichtigsten Prozess

Wählen Sie für Ihren wichtigsten neuen Prozess eine Zahl auf der Ebene „Nutzung des Prozesses“, etwa den Anteil der Angebote, die in Salesforce erstellt werden. Legen Sie den Ausgangswert vor dem Go-live fest und bauen Sie einen Bericht, der die Zahl pro Gruppe und Land zeigt. Nach dem Go-live geht dieser Bericht jeden Monat an den Sponsor. Liegt der Anteil nach drei Monaten in einem Land unter dem Ausgangswert, fragen Sie die Key User dort, an welcher Stelle die Arbeit aus Salesforce herausgeht. Wie wir das in Programmen aufsetzen, steht unter [Change Management für Salesforce-Programme](../../leistungen/change-management/).
