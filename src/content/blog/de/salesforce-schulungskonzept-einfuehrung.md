---
title: "Schulungskonzept für die Salesforce-Einführung"
description: "Wie ein Schulungskonzept für Salesforce aussieht, das im Alltag ankommt: nach Rollen, an realitätsnahen Fällen, mit Key Usern, Schulungs-Sandbox und Hilfe im System."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: salesforce-schulungskonzept-einfuehrung
translationKey: change-training-plan
topic: governance
categories: [change-management]
coAuthor: juliane
contactBrief: change
tags: [Schulungskonzept, Salesforce-Schulung, Change Management, Key User, Train the Trainer]
takeaways:
  - "Schulung baut im ADKAR-Modell vor allem Wissen auf und beginnt Fähigkeit durch Übung. Fehlen Bewusstsein oder Bereitschaft, hilft sie wenig."
  - "Geschult wird an typischen Fällen in einer Schulungsumgebung mit synthetischen oder geprüft maskierten Daten, nah am Go-live statt Monate vorher."
  - "Key User sind oft die besten Trainer für ihr Team, wenn sie gründlich geschult wurden, eine Probeschulung gehalten haben und gemeinsame Unterlagen nutzen."
  - "Der Erfolg einer Schulung zeigt sich in Fragen, Aufgabenchecks und Nutzungszahlen der ersten Wochen, nicht in der Teilnahme allein."
faq:
  - q: "Was gehört in ein Schulungskonzept für Salesforce?"
    a: "Die betroffenen Rollen, die Abläufe, die jede Rolle lernen muss, das Format pro Rolle, die Schulungsumgebung, der Zeitplan entlang der Releases, wer schult und woran Sie messen, ob es gewirkt hat."
  - q: "Wann sollte die Salesforce-Schulung stattfinden?"
    a: "Die Anwenderschulung liegt meist nah am Go-live der jeweiligen Rolle oder Welle, wenn das System weitgehend fertig ist. Key User kommen früher, vor dem Abnahmetest, und Änderungen aus dem Test bekommen eine kurze Nachschulung. Wer Wochen vorher geschult wird, hat bis zum ersten echten Fall vieles vergessen."
  - q: "Was ist Train the Trainer in Salesforce-Projekten?"
    a: "Das Projektteam schult zuerst die Key User gründlich, mit Probeschulung und gemeinsamen Unterlagen, und die Key User schulen danach ihre Teams. So lernen Anwender von Kollegen, die ihren Alltag kennen und auch nach dem Go-live erreichbar sind."
  - q: "Brauche ich eine eigene Sandbox für Schulungen?"
    a: "Meist ja, wenn der Abnahmetest parallel läuft, viele Personen geschult werden oder die Übungsdaten zurückgesetzt werden müssen. Schulungen in Produktion erzeugen echte Datensätze, die E-Mails, Freigaben oder ERP-Buchungen auslösen können. Eine Partial Copy Sandbox ist oft ein Kandidat, abhängig von Edition, freien Sandboxes und Datenschutz; sie maskiert kopierte Daten nicht von selbst."
draft: false
---

Ein Schulungskonzept für die Salesforce-Einführung plant nach Rollen und Abläufen, nicht nach Funktionen: Der Disponent lernt seinen Arbeitstag in Salesforce, der Vertriebler den Weg vom Besuch zum Angebot. Geschult wird an typischen Fällen, in einer eigenen Schulungsumgebung, nah am Go-live der jeweiligen Rolle und möglichst durch gut vorbereitete Key User, die ihr Team kennen. Danach hilft das System selbst mit kurzen Hinweisen an der richtigen Stelle. Ob die Schulung gewirkt hat, zeigen Fragen, Aufgabenchecks und Nutzungszahlen der ersten Wochen, nicht die Teilnahme allein.

## Was kann eine Schulung leisten und was nicht?

Im [ADKAR-Modell](../change-management-salesforce-einfuehrung/) baut Schulung vor allem Wissen (Knowledge) auf und kann durch praktische Übung Fähigkeit (Ability) anstoßen. Fähigkeit zeigt sich erst, wenn jemand den Ablauf im Alltag zuverlässig ausführt, mit Begleitung und ohne praktische Hindernisse. Schulung erklärt nicht überzeugend, warum sich etwas ändert, und sie macht niemanden bereit, mitzuziehen. Den geschäftlichen Grund und die persönliche Bedeutung müssen Sponsor und Führungskräfte vor der Schulung vermitteln.

Man erkennt das an der Stimmung in einer Schulung. Wenn die erste halbe Stunde aus Fragen besteht wie „Warum machen wir das überhaupt?“, fehlt Awareness. Ein gut gebriefter Trainer kann die abgestimmte Begründung erklären, offene Führungsfragen aber nicht ersetzen. Eine kurze Einleitung durch die Führungskraft der Gruppe, warum der neue Ablauf kommt und was er dem Team bringt, spart diese halbe Stunde.

## Schulung nach Rollen und Abläufen planen

Ein Funktionsrundgang durch Salesforce zeigt alles und bleibt bei niemandem hängen. Besser ist eine Matrix aus Rollen und Abläufen. Für jede betroffene Rolle steht fest, welche Abläufe sie können muss, in welchem Format sie lernt und wann.

| Rolle | Abläufe | Format | Zeitpunkt |
|---|---|---|---|
| Key User | alle Abläufe der eigenen Gruppe, auch Sonderfälle | mehrtägig mit Projektteam, eigene UAT-Rolle, danach Train the Trainer mit Probeschulung | vor dem Abnahmetest |
| Vertrieb | Besuch, Opportunity, Angebot | 2 bis 3 Stunden an typischen Kunden | kurz vor dem Go-live |
| Innendienst | Angebot, Auftrag, Rahmenvertrag (Sales Agreement) | halber Tag mit Übungsfällen | kurz vor dem Go-live |
| Disponent | Einsatzplanung, Umplanung, Notfall | halber Tag, danach Hospitation in einer produktiven Region | vor der eigenen Welle |
| Techniker | Auftrag annehmen, Bericht, Ersatzteile | am eingerichteten Gerät, online und offline, inklusive Synchronisation | vor der eigenen Welle |
| Führungskraft | Dashboards, Prognose, Pipeline-Meeting | eine Stunde | vor dem Go-live |

Die Dauer in der Tabelle ist eine Annahme für die Planung und hängt vom Umfang ab. Bei Schichtbetrieb, mehreren Standorten, Urlaub oder Partnern kann „kurz vorher“ mehrere Wochen mit Terminen bedeuten; Änderungen aus dem Abnahmetest bekommen eine kurze Nachschulung, Sprechstunden und Auffrischungen folgen nach dem Go-live. Wichtig ist die letzte Zeile: Führungskräfte werden gern vergessen, weil sie selten selbst Datensätze anlegen. Sie entscheiden aber mit ihren Fragen im Meeting, ob das System genutzt wird, wie ich in [Salesforce-Akzeptanz im Vertrieb](../salesforce-akzeptanz-vertrieb/) beschreibe.

## Wann sollten Key User die Schulung halten?

Anwender lernen oft lieber von Kollegen, die dieselben Kunden, Maschinen und Ausnahmen kennen. Beim Train-the-Trainer-Ansatz schult das Projektteam zuerst die [Key User](../salesforce-key-user-netzwerk/) gründlich, und die Key User schulen danach ihr Team. Der Vorteil wirkt über den Go-live hinaus: Wer die Schulung gehalten hat, ist in den ersten Wochen die natürliche Anlaufstelle für Fragen.

Der Ansatz hat Voraussetzungen. Key User brauchen die freigestellte Zeit, fertige Schulungsunterlagen, einen Trainerleitfaden und Übungsfälle, die das Projekt vorbereitet, dazu eine Probeschulung, die das Projektteam abnimmt. Nicht jeder Key User ist ein guter Trainer; bei kritischen Abläufen würde ich Key User und Projekttrainer gemeinsam schulen lassen. Ohne diese Vorbereitung improvisiert jeder Key User anders, gibt eigene Umwege weiter, und die Teams lernen unterschiedliche Wege.

```praxis
Ich habe Schulungen in allen diesen Formen umgesetzt, je nach Wunsch des Kunden: Train the Trainer über Key User, eine eigene Schulungs-Sandbox und Schulungen je Rolle. In Field-Service-Einführungen hilft es außerdem, wenn Disponenten der nächsten Welle vorher bei Kollegen in einer bereits produktiven Region hospitieren. Echte Fälle aus dem Alltag einer Kollegin bringen ihnen mehr als eine Übung im Schulungsraum.
```

## Wo sollte geschult werden?

Meist in einer eigenen Schulungs-Sandbox. Salesforce nennt Schulung ausdrücklich als einen der Zwecke von [Sandboxes](https://help.salesforce.com/s/articleView?id=platform.deploy_sandboxes_parent.htm&type=5). Schulungen in der Test-Sandbox können den Abnahmetest stören, wenn beides gleichzeitig läuft, und Schulungen in Produktion erzeugen echte Angebote und Aufträge, die E-Mails, Freigaben oder ERP-Buchungen auslösen können. Eine gemeinsame Umgebung funktioniert nur mit getrennten Zeitfenstern, Benutzern und Datensätzen und klarer Verantwortung.

Eine Partial Copy Sandbox ist oft ein Kandidat. Sie enthält einen per Sandbox-Vorlage gewählten Ausschnitt der Produktionsdaten, bis zu 5 GB Daten, und lässt sich laut [Salesforce-Dokumentation](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/deploy_sandboxes.pdf) alle fünf Tage neu aufbauen. Ob eine frei ist, hängt von Edition und Sandbox-Lizenzen ab; die Enterprise Edition enthält eine, die oft schon für den Abnahmetest gebraucht wird. Für eine kleinere Einführung kann eine Developer Pro Sandbox mit synthetischen Daten reichen. Eine Full Sandbox lässt sich nur alle 29 Tage aktualisieren, deshalb reservieren viele Programme sie für produktionsnahe Szenarien wie End-to-End-Tests, Abnahmetest, Staging oder Lasttests. Wie Sie die Schulungsumgebung mit Entwicklungs- und Test-Sandboxes abstimmen, beschreibe ich in der [Sandbox-Strategie bei mehreren Partnern](../salesforce-sandbox-strategie-mehrere-partner/).

```hinweis achtung
Eine Partial Copy maskiert kopierte Produktionsdaten nicht von selbst. Nutzen Sie synthetische Übungsdaten oder einen freigegebenen, geprüft maskierten Datenbestand, etwa mit Salesforce Data Mask & Seed, und denken Sie an Freitexte, Anhänge und E-Mails. Klären Sie das vorher mit dem Datenschutz. Testen Sie außerdem Schulungsbenutzer, Permission Sets, Anmeldung, Geräte und App-Versionen, und deaktivieren Sie ausgehende E-Mails. Schnittstellen schalten Sie ab oder binden sie kontrolliert an.
```

Jede Übung braucht einen Fall, der für den Alltag der Teilnehmenden typisch ist: ein typischer Kunde, eine typische Maschine, eine typische Störung. Wer seine eigenen Abläufe wiedererkennt, überträgt das Gelernte schneller in den Alltag.

## Nach der Schulung gehört die Hilfe ins System

Was in der Schulung gelernt wurde, geht ohne Anwendung im Alltag schnell wieder verloren. Deshalb gehört Hilfe in das System selbst. Mit der In-App Guidance von Salesforce lassen sich kurze Hinweise und geführte Walkthroughs direkt auf den Seiten einblenden, auf denen jemand arbeitet, zum Beispiel beim ersten Anlegen eines Angebots ([Trailhead: In-App-Prompts erstellen](https://trailhead.salesforce.com/content/learn/modules/user-engagement/create-in-app-prompts)). Hinweise sind im Rahmen der dokumentierten Grenzen verfügbar. Ohne das Enablement-Add-on können bis zu drei eigene Walkthroughs gleichzeitig aktiv sein; für mehr braucht es das Add-on und die passende Benutzerberechtigung. Prüfen Sie das für Ihre Org, bevor Sie viele Walkthroughs planen.

Dazu kommen kurze Anleitungen pro Ablauf, die im System verlinkt sind, und die Key User in der Nähe. Ein Handbuch mit 80 Seiten liest nach der Schulung niemand.

## Woran messen Sie, ob die Schulung gewirkt hat?

Nicht an der Teilnahme allein. Teilnahme- und Abschlussquoten zeigen die Abdeckung, die für die Einsatzbereitschaft zählt, aber nicht, ob jemand den Ablauf beherrscht. Ergänzen Sie kurze Aufgabenchecks und zwei Quellen aus den ersten Wochen: die Fragen, die Key User und Support sammeln, und die Nutzungszahlen pro Gruppe im Vergleich zu dem, was der Ablauf erzeugen sollte. Sie zeigen, wo Sie hinschauen sollten, nicht die Ursache. Häufen sich Fragen zu einem Ablauf, kann Wissen fehlen; ebenso möglich sind ein unklarer Prozess, eine unübersichtliche Seite oder fehlende Berechtigungen. Bleiben Datensätze aus, obwohl niemand fragt, können fehlende Bereitschaft, ein Parallelsystem, eine Integrationslücke oder Zeitdruck die Ursache sein. Kurze Gespräche oder Beobachtungen bei der Arbeit helfen, das zu unterscheiden. Wie Sie diese Zahlen aufbauen, beschreibe ich in [Salesforce-Nutzung nach dem Go-live messen](../salesforce-nutzung-messen-nach-go-live/).

## Rollen und ihre Abläufe für den ersten Tag auflisten

Schreiben Sie die betroffenen Rollen untereinander und daneben die drei bis fünf Abläufe, die jede Rolle ab dem ersten Tag können muss. Diese Liste ist der Kern Ihres Schulungskonzepts. Danach legen Sie fest, wer welche Rolle schult, und planen die Schulungs-Sandbox früh genug, damit Übungsfälle vor dem Abnahmetest fertig sind. Mit meiner Kooperationspartnerin [Juliane Winterscheid](../../partner/juliane-winterscheid/) plane ich Schulung und Change Management gemeinsam. Mehr dazu lesen Sie unter [Change Management Beratung für Salesforce](../../leistungen/change-management/).
