---
title: "Salesforce-Nutzung nach dem Go-live messen"
description: "Welche Zahlen nach dem Go-live zeigen, ob ein neuer Salesforce-Prozess angekommen ist, woher sie kommen und warum Logins allein wenig über die Nutzung sagen."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: salesforce-nutzung-messen-nach-go-live
translationKey: change-adoption-metrics
topic: data
categories: [change-management, architecture]
coAuthor: juliane
contactBrief: change
tags: [Nutzung, Adoption, Change Management, Kennzahlen]
takeaways:
  - "Die Zahl der Schulungen zeigt höchstens Einsatzbereitschaft. Ob nach dem Go-live jemand anders arbeitet, zeigt sie nicht."
  - "Logins sagen wenig. Wer sich anmeldet, um eine Liste zu exportieren und in Excel weiterzuarbeiten, zählt als aktiver Nutzer."
  - "Ich messe Aktivität, Prozessnutzung, Datenqualität und Geschäftsergebnis, möglichst als Quoten pro Gruppe und Land."
  - "Die Zahlen werden vor dem Go-live mit Ausgangswert und Ziel festgelegt und danach regelmäßig mit dem Sponsor besprochen."
faq:
  - q: "Wie misst man die Nutzung von Salesforce?"
    a: "Mit Berichten über Datensätze, die Nutzer anlegen und pflegen, als Anteil der relevanten Fälle pro Gruppe und Land, ergänzt um Logins und aktive Nutzer aus den Nutzungsdaten von Salesforce. Entscheidend ist, ob der neue Prozess in Salesforce stattfindet; Gespräche erklären, warum das der Fall ist oder nicht."
  - q: "Reichen Login-Zahlen als Kennzahl für Adoption?"
    a: "Nein. Ein Login zeigt nur, dass jemand das System geöffnet hat. Ob er darin arbeitet oder nur exportiert, zeigen die Datensätze, die er anlegt und ändert, besser, wenn Importe und Integrationsnutzer herausgerechnet werden."
  - q: "Wann sollte man die Nutzung messen?"
    a: "In den ersten Wochen nach dem Go-live wöchentlich, danach monatlich, mindestens bis der Prozess stabil ist, oft sechs Monate oder länger bei Rollout-Wellen. Kennzahlen, Ausgangswert und Ziel gehören schon vor dem Go-live fest."
  - q: "Was tun, wenn eine Gruppe Salesforce kaum nutzt?"
    a: "Zuerst technische und prozessuale Ursachen ausschließen, dann fragen, welches ADKAR-Element fehlt. Fehlt das Verständnis, warum, hilft eine weitere Schulung selten; dann muss die Führungskraft der Gruppe erklären, wofür die Daten gebraucht werden."
draft: false
---

Ob ein neuer Salesforce-Prozess nach dem Go-live angekommen ist, zeigen Berichte über angelegte und gepflegte Datensätze, pro Gruppe und Land, zuverlässiger als eine Umfrage allein; Gespräche mit Nutzern erklären dann die Zahlen. Logins sagen wenig: Wer sich anmeldet, eine Liste exportiert und in Excel weiterarbeitet, zählt als aktiver Nutzer. Ich messe deshalb auf vier Ebenen: Aktivität, Nutzung des Prozesses, Datenqualität und Geschäftsergebnis. Welche Zahlen es sind und welcher Ausgangswert gilt, steht vor dem Go-live fest. Danach bespricht der Sponsor sie jeden Monat, damit auffällt, wenn eine Gruppe neben Salesforce weiter mit eigenen Listen arbeitet.

## Schulungszahlen sagen nichts über Nutzung

Viele Programme berichten nach dem Go-live, wie viele Personen geschult wurden. Die Zahl zeigt höchstens Einsatzbereitschaft. Ob jemand anders arbeitet, sagt sie nicht. Deshalb lege ich zu Beginn fest, woran Erfolg gemessen wird, zum Beispiel an Nutzungszahlen in Salesforce und nicht an der Zahl der Schulungen.

Salesforce hilft beim Messen, weil Datensätze enthalten, wer sie wann angelegt und zuletzt geändert hat. Ob ein Vertriebsteam seine Opportunities pflegt, ob der Innendienst Angebote in Salesforce erstellt und ob Techniker Aufträge abschließen, lässt sich mit Standardberichten zählen. Ob sie das in der mobilen App getan haben, erfordert ein Feld oder eine Aktion, die den Kanal erfasst. Lesen, Exportieren und frühere Änderungen hinterlassen in einem normalen Bericht keine Spur; die Feldhistorie muss vorher eingeschaltet werden, und Importe oder Integrationen können verschleiern, wer die Arbeit erledigt hat. Für beobachtbare Systemaktivität ist das trotzdem genauer als eine Umfrage, in der jeder angibt, das System regelmäßig zu nutzen.

## Welche Zahlen zeigen, ob ein Prozess angekommen ist?

Ich messe auf vier Ebenen. Jede beantwortet eine andere Frage:

| Ebene | Frage | Beispiele |
|---|---|---|
| Aktivität | Öffnen die Nutzer das System? | aktive Nutzer pro Woche, Logins, Seitenaufrufe |
| Nutzung des Prozesses | Findet der Prozess in Salesforce statt? | Anteil der Angebote aus Salesforce und nicht aus Word, Anteil der mobil abgeschlossenen Aufträge, Opportunities mit gepflegtem nächsten Schritt |
| Datenqualität | Sind die Daten brauchbar? | Pflichtfelder gültig gefüllt statt mit Punkten, neue Dubletten, veraltete Datensätze |
| Geschäftsergebnis | Bringt es, wofür es gebaut wurde? | Prognosegenauigkeit, Erstlösungsquote im Service, Durchlaufzeit vom Angebot zum Auftrag |

Die ersten drei Ebenen betreffen die Nutzung, die vierte den Nutzen: Ein Ergebnis kann sich aus Gründen verändern, die nichts mit Salesforce zu tun haben. Absolute Datensatzmengen führen beim Vergleich unterschiedlich großer Länder in die Irre. Deshalb teile ich sie durch die relevanten Fälle oder erwarteten Nutzer und lasse Integrationsnutzer und Administratoren heraus.

Die erste Ebene liefert Salesforce mit wenig Aufwand. Die Login-Historie im Setup zeigt, wer sich wann angemeldet hat, und die Lightning Usage App zeigt täglich und monatlich aktive Nutzer sowie die meistaufgerufenen Seiten; für eigene Berichte im Zeitverlauf brauchen Sie ihre API. Für fertige Dashboards gibt es die kostenlosen Adoption Dashboards von Salesforce Labs auf dem AppExchange, ein Community-Projekt ohne offiziellen Salesforce-Support, das sich auf Vertriebsobjekte konzentriert. Die aussagekräftigen Zahlen liegen aber auf der zweiten und dritten Ebene, und die müssen Sie für Ihre Prozesse selbst definieren.

Für die Datenqualität sind Dubletten ein guter Frühindikator: Steigt die Zahl neuer Dubletten in einem Land, legen Nutzer dort möglicherweise Kunden an, statt die vorhandenen zu suchen. Schließen Sie zuerst Integrationsläufe, Berechtigungen und geänderte Abgleichsregeln aus. Wie Sie das messen und verhindern, beschreibe ich in [Dubletten in Salesforce: Stammdaten vor der KI bereinigen](../salesforce-dubletten-stammdaten-bereinigen/).

```hinweis achtung
Legen Sie vor dem Go-live einen Ausgangswert fest, etwa wie viele Angebote heute pro Monat erstellt werden, egal in welchem System, und ein Ziel für den Anteil, der aus Salesforce kommen soll. Ohne Ausgangswert wissen Sie nach dem Go-live nicht, ob 200 Angebote in Salesforce viel oder wenig sind.
```

## Wie erkennen Sie Schattenlösungen?

Die teuerste Form niedriger Nutzung ist die Liste neben dem System. Ein Vertrieb, der seine Mengen bisher in einer eigenen Tabelle geführt hat, arbeitet nicht automatisch mit dem neuen Prozess, nur weil er live ist. Drei Zeichen deuten auf eine Schattenlösung hin:

- **Lücken zwischen Aktivität und Prozess.** Ein Team meldet sich täglich an, legt aber kaum Datensätze an. Dann wird gelesen und anderswo gearbeitet.
- **Nachträgliche Massenpflege.** Datensätze werden einmal im Monat in großen Mengen aktualisiert, kurz vor dem Bericht an die Geschäftsführung. Die Arbeit findet woanders statt, Salesforce bekommt nur das Ergebnis. Um das im Zeitverlauf zu erkennen, brauchen Sie Feldhistorie, Snapshots oder Ereignisdaten, weil das Datum der letzten Änderung nur die jüngste Änderung zeigt.
- **Häufige Exporte.** Berichte, die regelmäßig nach Excel exportiert werden, sind oft die Grundlage einer eigenen Liste. Das Ereignis Report Export im kostenpflichtigen Event Monitoring, das einzeln oder als Teil von Salesforce Shield erhältlich ist, zeigt solche Exporte.

Keines dieser Zeichen ist ein Beweis. Es ist ein Grund, mit dem Team zu sprechen, am besten über den Key User, wie in [Key User in Salesforce-Einführungen](../salesforce-key-user-netzwerk/) beschrieben.

## Was tun, wenn die Zahlen schlecht sind?

Eine schlechte Zahl ist eine Frage, keine Antwort. Ich schließe zuerst technische und prozessuale Ursachen aus und frage dann, welches Element des [ADKAR-Modells](../change-management-salesforce-einfuehrung/) fehlt. Wenn ein Vertriebsteam nicht weiß, wofür gepflegte Opportunities gebraucht werden, fehlt Awareness, und das muss der zuständige Vertriebsleiter erklären, nicht der Trainer. Wenn Techniker die App kennen, aber offline nicht weiterkommen, ist die Ursache oft technisch, etwa Offline-Priming oder die Geräte, und das löst eine technische Änderung, keine Schulung. Für den Außendienst beschreibe ich das in [Field Service App: wie Techniker sie annehmen](../field-service-app-akzeptanz-techniker/).

Die Zahlen gehören in den regelmäßigen Termin mit dem Sponsor. Wenn der Sponsor im Monatsbericht nach der Nutzung seiner Teams fragt, ist das selbst schon Reinforcement: Die Teams merken, dass es zählt.

## Lenkungsausschuss, Sponsor und Key User brauchen verschiedene Zahlen

Nicht jede Zahl gehört in jeden Bericht. Der Lenkungsausschuss braucht zwei oder drei Zahlen pro Prozess, am besten auf den Ebenen Nutzung und Ergebnis, mit dem Verlauf seit dem Go-live. Der Sponsor eines Landes oder Bereichs braucht dieselben Zahlen für seine Teams, damit er gezielt nachfragen kann. Key User und Teamleitungen brauchen die Detailsicht: Welche Personen legen kaum Datensätze an, welche Felder bleiben leer? Diese Sicht ist für Gespräche gedacht, nicht für Ranglisten. Wer Einzelpersonen öffentlich vergleicht, bekommt gepflegte Zahlen statt gepflegter Daten. In deutschen Unternehmen mit Betriebsrat können personenbezogene Nutzungsberichte die Mitbestimmung nach § 87 Abs. 1 Nr. 6 BetrVG auslösen. Stimmen Sie sie deshalb vor ihrer Einführung ab, einschließlich Zweck, Zugriffsrechten und Löschfristen.

## Zuerst wöchentlich, dann mindestens sechs Monate monatlich messen

In den ersten Wochen wöchentlich, danach mindestens ein halbes Jahr monatlich, bei Rollout-Wellen länger. Die ersten Wochen nach dem Go-live sind verzerrt: Die Aufmerksamkeit ist hoch, Key User sind präsent, und viele probieren das neue System aus. Ob ein Prozess bleibt, zeigt sich erst nach drei bis sechs Monaten, wenn das Projektteam weitergezogen ist. Fällt eine Zahl in dieser Zeit ab, prüfen Sie zuerst Saisonalität, Fallzahlen und technische Probleme. Erklärt nichts davon den Rückgang, fehlt wahrscheinlich Reinforcement. Bei einem weltweiten Rollout messen Sie pro Land, weil jedes Land einen eigenen Verlauf hat, siehe [Change Management im weltweiten Salesforce-Rollout](../change-management-weltweiter-rollout/).

## Eine Nutzungszahl für den wichtigsten Prozess festlegen

Wählen Sie für Ihren wichtigsten neuen Prozess eine Zahl auf der Ebene „Nutzung des Prozesses“, etwa den Anteil der in Salesforce erstellten Angebote an allen relevanten Angeboten. Erfassen Sie vor dem Go-live den Ausgangswert und die Gesamtzahl der Angebote pro Land und Monat und legen Sie ein Ziel für den Salesforce-Anteil fest. Bauen Sie einen Bericht, der den Anteil pro Gruppe und Land zeigt. Nach dem Go-live geht dieser Bericht jeden Monat an den Sponsor. Liegt der Anteil nach drei Monaten in einem Land unter dem Ziel, fragen Sie die Key User dort, an welcher Stelle die Arbeit aus Salesforce herausgeht. Wie wir das in Programmen aufsetzen, steht unter [Change Management für Salesforce-Programme](../../leistungen/change-management/).
