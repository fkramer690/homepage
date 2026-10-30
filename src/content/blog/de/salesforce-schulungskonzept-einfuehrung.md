---
title: "Schulungskonzept für die Salesforce-Einführung"
description: "Wie ein Schulungskonzept für Salesforce aussieht, das im Alltag ankommt: nach Rollen, am eigenen Fall, mit Key Usern, Schulungs-Sandbox und Hilfe im System."
pubDate: 2026-10-29
lang: de
slug: salesforce-schulungskonzept-einfuehrung
translationKey: change-training-plan
topic: governance
categories: [change-management]
coAuthor: juliane
contactBrief: change
tags: [Schulungskonzept, Salesforce-Schulung, Change Management, Key User, Train the Trainer]
takeaways:
  - "Ein Schulungskonzept für Salesforce plant nach Rollen und Abläufen, nicht nach Funktionen. Ein Disponent lernt seinen Arbeitstag, keinen Rundgang durch das System."
  - "Schulung deckt im ADKAR-Modell Wissen und Fähigkeit ab. Fehlen Bewusstsein oder Bereitschaft, hilft auch die beste Schulung nicht."
  - "Geschult wird am eigenen Fall in einer Sandbox mit echten Abläufen und anonymisierten Daten, kurz vor dem Go-live, nicht Monate vorher."
  - "Key User schulen ihr eigenes Team besser als ein Trainer aus dem Projekt, wenn sie vorher selbst gründlich geschult wurden."
  - "Der Erfolg einer Schulung zeigt sich in den Fragen und Nutzungszahlen der ersten Wochen, nicht in der Zahl der Teilnehmenden."
faq:
  - q: "Was gehört in ein Schulungskonzept für Salesforce?"
    a: "Die betroffenen Rollen, die Abläufe, die jede Rolle lernen muss, das Format pro Rolle, die Schulungsumgebung, der Zeitplan entlang der Releases, wer schult und woran Sie messen, ob es gewirkt hat."
  - q: "Wann sollte die Salesforce-Schulung stattfinden?"
    a: "Kurz vor dem Go-live, wenn das System weitgehend fertig ist. Wer Wochen vorher geschult wird, hat bis zum ersten echten Fall vieles vergessen, und Änderungen aus dem Abnahmetest fehlen."
  - q: "Was ist Train the Trainer in Salesforce-Projekten?"
    a: "Das Projektteam schult zuerst die Key User gründlich, und die Key User schulen danach ihre Teams. So lernen Anwender von Kollegen, die ihren Alltag kennen und auch nach dem Go-live erreichbar sind."
  - q: "Brauche ich eine eigene Sandbox für Schulungen?"
    a: "Für größere Einführungen ja. Schulungen in der Test-Sandbox stören den Abnahmetest, und Schulungen in Produktion erzeugen echte Datensätze. Eine Partial Copy Sandbox mit anonymisierten Daten reicht meist."
draft: false
---

Ein Schulungskonzept für die Salesforce-Einführung plant nach Rollen und Abläufen, nicht nach Funktionen: Der Disponent lernt seinen Arbeitstag in Salesforce, der Vertriebler den Weg vom Besuch zum Angebot. Geschult wird am eigenen Fall, in einer eigenen Schulungs-Sandbox, kurz vor dem Go-live und möglichst durch Key User, die ihr Team kennen. Danach hilft das System selbst mit kurzen Hinweisen an der richtigen Stelle. Ob die Schulung gewirkt hat, zeigen die Fragen und Nutzungszahlen der ersten Wochen, nicht die Zahl der Teilnehmenden.

## Was kann eine Schulung leisten und was nicht?

Im [ADKAR-Modell](../change-management-salesforce-einfuehrung/) deckt Schulung zwei von fünf Stufen ab: Wissen (Knowledge) und Fähigkeit (Ability). Sie zeigt, wie etwas geht, und lässt es üben. Sie erklärt nicht überzeugend, warum sich etwas ändert, und sie macht niemanden bereit, mitzuziehen. Das ist Aufgabe des Sponsors und der direkten Führungskraft, und es muss vor der Schulung passiert sein.

Man erkennt das an der Stimmung in einer Schulung. Wenn die erste halbe Stunde aus Fragen besteht wie „Warum machen wir das überhaupt?“, fehlt Awareness. Der Trainer kann die Frage nicht beantworten, weil er die Entscheidung nicht getroffen hat. Eine kurze Einleitung durch die Führungskraft der Gruppe, warum der neue Ablauf kommt und was er dem Team bringt, spart diese halbe Stunde.

## Wie planen Sie Schulungen nach Rollen?

Ein Funktionsrundgang durch Salesforce zeigt alles und bleibt bei niemandem hängen. Besser ist eine Matrix aus Rollen und Abläufen. Für jede betroffene Rolle steht fest, welche Abläufe sie können muss, in welchem Format sie lernt und wann.

| Rolle | Abläufe | Format | Zeitpunkt |
|---|---|---|---|
| Key User | alle Abläufe der eigenen Gruppe, auch Sonderfälle | mehrtägig mit Projektteam, danach UAT | vor dem Abnahmetest |
| Vertrieb | Besuch, Opportunity, Angebot | 2 bis 3 Stunden am eigenen Kunden | letzte Woche vor dem Go-live |
| Innendienst | Angebot, Auftrag, Rahmenvertrag | halber Tag mit Übungsfällen | letzte Woche vor dem Go-live |
| Disponent | Einsatzplanung, Umplanung, Notfall | halber Tag, danach Zuschauen in laufender Region | vor der eigenen Welle |
| Techniker | Auftrag annehmen, Bericht, Ersatzteile | kurz am Gerät, offline geübt | vor der eigenen Welle |
| Führungskraft | Dashboards, Prognose, Pipeline-Meeting | eine Stunde | vor dem Go-live |

Die Dauer in der Tabelle ist eine Annahme für die Planung und hängt vom Umfang ab. Wichtig ist die letzte Zeile: Führungskräfte werden gern vergessen, weil sie selten selbst Datensätze anlegen. Sie entscheiden aber mit ihren Fragen im Meeting, ob das System genutzt wird, wie ich in [Salesforce-Akzeptanz im Vertrieb](../salesforce-akzeptanz-vertrieb/) beschreibe.

## Warum schulen Key User besser als Trainer?

Anwender lernen lieber von Kollegen, die dieselben Kunden, Maschinen und Ausnahmen kennen. Beim Train-the-Trainer-Ansatz schult das Projektteam zuerst die [Key User](../salesforce-key-user-netzwerk/) gründlich, und die Key User schulen danach ihr Team. Der Vorteil wirkt über den Go-live hinaus: Wer die Schulung gehalten hat, ist in den ersten Wochen die natürliche Anlaufstelle für Fragen.

Der Ansatz hat Voraussetzungen. Key User brauchen die freigestellte Zeit, fertige Schulungsunterlagen und Übungsfälle, die das Projekt vorbereitet. Ohne diese Vorbereitung improvisiert jeder Key User anders, und die Teams lernen unterschiedliche Wege.

```praxis
Ich habe Schulungen in allen diesen Formen umgesetzt, je nach Wunsch des Kunden: Train the Trainer über Key User, eine eigene Schulungs-Sandbox und Schulungen je Rolle. In Field-Service-Einführungen hilft es außerdem, wenn Disponenten der nächsten Welle vorher in der laufenden Region zuschauen. Echte Fälle aus dem Alltag einer Kollegin bringen ihnen mehr als jede Übung im Schulungsraum.
```

## Wo wird geschult?

In einer eigenen Schulungs-Sandbox. Salesforce nennt Schulung ausdrücklich als einen der Zwecke von [Sandboxes](https://help.salesforce.com/s/articleView?id=platform.deploy_sandboxes_parent.htm&type=5). Schulungen in der Test-Sandbox stören den Abnahmetest, und Schulungen in Produktion erzeugen echte Angebote und Aufträge, die jemand wieder aufräumen muss.

Für die meisten Einführungen reicht eine Partial Copy Sandbox. Sie enthält einen Ausschnitt der Produktionsdaten, bis 5 GB Datenspeicher, und lässt sich laut [Salesforce-Dokumentation](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/deploy_sandboxes.pdf) alle fünf Tage neu aufbauen. Eine Full Sandbox geht nur alle 29 Tage und ist meist für Last- und Integrationstests reserviert. Wie die Schulungsumgebung neben Entwicklungs- und Test-Sandboxes in die Landschaft passt, beschreibe ich in der [Sandbox-Strategie bei mehreren Partnern](../salesforce-sandbox-strategie-mehrere-partner/).

```hinweis achtung
Echte Kundendaten gehören nicht unanonymisiert in eine Schulungs-Sandbox, auf die viele Personen Zugriff haben. Legen Sie Übungskunden an oder anonymisieren Sie die Kopie, und klären Sie das vorher mit dem Datenschutz.
```

Jede Übung braucht einen Fall, den die Teilnehmenden aus ihrem Alltag kennen: ein typischer Kunde, eine typische Maschine, eine typische Störung. Wer seine eigenen Abläufe wiedererkennt, überträgt das Gelernte schneller in den Alltag.

## Was hilft nach der Schulung?

Was in der Schulung gelernt wurde, geht ohne Anwendung im Alltag schnell wieder verloren. Deshalb gehört Hilfe in das System selbst. Mit der In-App Guidance von Salesforce lassen sich kurze Hinweise und geführte Walkthroughs direkt auf den Seiten einblenden, auf denen jemand arbeitet, zum Beispiel beim ersten Anlegen eines Angebots ([Trailhead: In-App-Prompts erstellen](https://trailhead.salesforce.com/content/learn/modules/user-engagement/create-in-app-prompts)). Hinweise sind enthalten, für mehr als drei eigene Walkthroughs braucht es eine Zusatzlizenz. Prüfen Sie das für Ihre Org, bevor Sie viele Walkthroughs planen.

Dazu kommen kurze Anleitungen pro Ablauf, die im System verlinkt sind, und die Key User in der Nähe. Ein Handbuch mit 80 Seiten liest nach der Schulung niemand.

## Woran messen Sie, ob die Schulung gewirkt hat?

Nicht an der Zahl der Teilnehmenden. Die Zahl zeigt, dass das Projekt geschult hat, nicht, dass jemand anders arbeitet. Zwei Quellen sind aussagekräftiger: die Fragen der ersten Wochen, die Key User und Support sammeln, und die Nutzungszahlen pro Gruppe. Häufen sich Fragen zu einem Ablauf, fehlt dort Wissen, und eine kurze Nachschulung lohnt sich. Bleiben Datensätze aus, obwohl niemand fragt, fehlt meist Bereitschaft. Wie Sie diese Zahlen aufbauen, beschreibe ich in [Salesforce-Nutzung nach dem Go-live messen](../salesforce-nutzung-messen-nach-go-live/).

## Wo fangen Sie an?

Schreiben Sie die betroffenen Rollen untereinander und daneben die drei bis fünf Abläufe, die jede Rolle ab dem ersten Tag können muss. Diese Liste ist der Kern Ihres Schulungskonzepts. Danach legen Sie fest, wer welche Rolle schult, und planen die Schulungs-Sandbox früh genug, damit Übungsfälle vor dem Abnahmetest fertig sind.

Eine gute Schulung kommt kurz vor dem Go-live, am eigenen Fall und von einem Kollegen. Mit meiner Kooperationspartnerin [Juliane Winterscheid](../../partner/juliane-winterscheid/) plane ich Schulung und Change Management gemeinsam. Mehr dazu lesen Sie unter [Change Management Beratung für Salesforce](../../leistungen/change-management/).
