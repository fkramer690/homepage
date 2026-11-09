---
title: "Change Management im weltweiten Salesforce-Rollout"
description: "Was Change Management in einem weltweiten Salesforce-Rollout pro Land leisten muss: Sponsor, Key User, Kommunikation und der Blick auf die Nutzung danach."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: change-management-weltweiter-rollout
translationKey: change-global-rollout
topic: governance
categories: [change-management, architecture, manufacturing-cloud]
coAuthor: juliane
contactBrief: change
tags: [Change Management, Rollout, globales Template, Harmonisierung]
takeaways:
  - "Change Management gehört in jede Welle eines globalen Rollouts, nicht nur in die erste, weil sich in jedem Land andere Gewohnheiten ändern."
  - "Jedes Land braucht einen benannten Sponsor mit Entscheidungsrechten. Der globale Sponsor reicht nicht, wenn das Land den Grund der Harmonisierung nicht teilt."
  - "Pro Land gehören mindestens Key User mit vereinbarter Zeit, Kommunikation ab der Planung und eine Messung der Nutzung mit Ausgangswert vor dem Go-live dazu."
  - "Die erste Welle ist auch für das Change Management der Test: Was dort hakt, wird vor der nächsten Welle angepasst."
faq:
  - q: "Warum braucht ein globales Template Change Management?"
    a: "Weil Harmonisierung heißt, dass Abläufe, Berichte und Gewohnheiten in jedem Land sich ändern. Ein Vertrieb, der seine Mengen bisher in einer eigenen Tabelle geführt hat, arbeitet nicht automatisch mit dem neuen Prozess, nur weil er live ist."
  - q: "Wer ist im Land für die Einführung verantwortlich?"
    a: "Ein Sponsor mit Entscheidungsrechten, meist aus der Landesleitung, der sichtbar hinter der Einführung steht, und Key User, die das Template kennen. Das zentrale Projektteam unterstützt, kann diese Rollen aber nicht ersetzen."
  - q: "Sollte die Kommunikation in der Landessprache sein?"
    a: "In der Regel ja. Erklärungen, warum sich etwas ändert, kommen in der Landessprache und von der eigenen Führung besser an als eine englische Rundmail aus der Zentrale. Wo Englisch Arbeitssprache ist, sollte die lokale Führung zentrale Texte zumindest prüfen und mit eigenen Beispielen ergänzen."
  - q: "Wann beginnt Change Management für ein Land?"
    a: "Wenn das Land in die Planung kommt, nicht zwei Wochen vor dem Go-live. Die Frage, was sich für jede Gruppe ändert, gehört in die Prüfung der Landesabweichungen."
  - q: "Wie misst man die Nutzung nach dem Go-live in jedem Land?"
    a: "Mit wenigen Kennzahlen, die vor dem Go-live feststehen: aktive Nutzer je Rolle, Anteil der Vorgänge, die vollständig in Salesforce laufen, etwa Prognosen oder Angebote, und Hinweise auf parallele Listen. Der Ausgangswert wird vor dem Go-live erhoben, danach schaut der Sponsor monatlich auf den Verlauf."
draft: false
---

In einem weltweiten Salesforce-Rollout mit globalem Template arbeiten Menschen in jedem Land nach dem Go-live anders als vorher. Change Management gehört deshalb in jede Welle, nicht nur in die erste. Pro Land braucht es einen eigenen Sponsor mit Entscheidungsrechten, meist aus der Landesleitung, Key User, die das Template kennen, Kommunikation ab der Planung, die erklärt, warum sich etwas ändert, und eine Messung der Nutzung danach. Die erste Welle ist für das Change Management genauso ein Test wie für die Technik: Was dort hakt, wird vor der nächsten Welle angepasst.

## Change Management in der Zentrale reicht nicht

Das strategische Ziel eines weltweiten Rollouts ist meist die Harmonisierung von Prozessen. In der Zentrale ist dieses Ziel klar, in den Ländern oft nicht. Für eine Landesgesellschaft, die seit Jahren erfolgreich mit eigenen Abläufen arbeitet, ist das globale Template zuerst einmal eine Vorgabe von außen. Wer dort nicht erklärt, warum es sich lohnt, bekommt Abweichungswünsche statt Unterstützung. „Land“ steht hier für die Einheit, die gemeinsam live geht; je nach Organisation ist das auch eine Region, eine Landesgesellschaft oder ein Geschäftsbereich.

Das [ADKAR-Modell](../change-management-salesforce-einfuehrung/) von Prosci beschreibt fünf Stufen, die jeder Mensch bei einer Veränderung durchläuft: Awareness, Desire, Knowledge, Ability und Reinforcement. In dieser Lage sind oft die ersten beiden gefährdet: Awareness, also das Verständnis, warum sich etwas ändert, und Desire, die Bereitschaft mitzumachen. Ob dort die Hürde liegt, zeigt erst das Gespräch mit den betroffenen Gruppen. Beides lässt sich nicht aus der Zentrale per Rundmail herstellen. Es braucht eine Person im Land, der die Mitarbeitenden zuhören. Allein reicht sie nicht: Fehlen Zeit, passende Ziele oder Funktionen, hilft auch der beste Sponsor wenig.

```praxis
Beim weltweiten Manufacturing-Cloud-Rollout stand vorher fest, dass das Ziel die Harmonisierung der Prozesse ist. Was ich heute anders machen würde: Change Management immer wieder ins Gespräch bringen, auch wenn der Kunde meint, er brauche keins. Pro Land gehörten mindestens Key User, Kommunikation vor dem Go-live und ein Blick auf die Nutzung danach dazu.
```

Die Reihenfolge der Länder beschreibe ich in [Manufacturing Cloud weltweit ausrollen](../manufacturing-cloud-weltweit-ausrollen/), den Umgang mit Abweichungen in [Globales Salesforce-Template: wie viel Land verträgt es?](../salesforce-globales-template-laenderabweichungen/).

## Was gehört pro Land dazu?

Ich plane für jedes Land dieselben Bausteine. Die Inhalte unterscheiden sich, die Liste nicht:

| Baustein | Wer | Wann |
|---|---|---|
| Sponsor im Land | Landesgeschäftsführung oder Vertriebsleitung | ab der Planung des Landes |
| Prüfung der Landesabweichungen | Sponsor, Key User, Architekt | vor dem Bau der Landeskonfiguration |
| Key User | genug für jede Rolle, Sprache, jeden Standort und jede Schicht, mit vereinbarter Zeit | ab den ersten Workshops |
| Kommunikation, warum sich etwas ändert | Sponsor, in Landessprache | ab der Planung, konkrete Go-live-Informationen in den Wochen davor |
| Schulung am echten Fall | Key User mit Projektteam | kurz vor dem Go-live |
| Mitbestimmung und Datenschutz | Betriebsrat oder vergleichbare Vertretung, wo vorhanden, Datenschutz, Personalabteilung | früh in der Konzeption, je Land unterschiedlich |
| Nutzung messen | Sponsor, Projektteam | Ausgangswert vor dem Go-live, danach monatlich |

Zwei Punkte werden am häufigsten unterschätzt. Der erste ist der Sponsor im Land. Ein globaler Sponsor in der Zentrale ist nötig, ersetzt aber nicht die Person, die im Land vor ihrem Team steht und sagt, dass Prognosen künftig aus Salesforce kommen. Der zweite ist die Mitbestimmung. Ob und wie ein Betriebsrat oder eine vergleichbare Vertretung beteiligt wird, ist je Land und Region anders und gehört früh geklärt, bei Auswertungen, die Leistung oder Verhalten zeigen können, schon während der Konzeption. Für den Außendienst beschreibe ich das in der [Field-Service-Einführung](../salesforce-field-service-einfuehrung/).

## Was muss die Kommunikation im Land erklären?

Kommunikation vor dem Go-live erklärt, was sich ändert und warum, nicht nur, wo man klickt. Ich gebe dem Sponsor jedes Landes dafür fünf Fragen mit, die seine Botschaft beantworten sollte:

- **Warum ändert sich etwas?** Der Grund in einem Satz, etwa eine weltweite Sicht auf Konzernkunden, die in mehreren Ländern kaufen.
- **Was hat das Land davon?** Ein konkreter Nutzen für die Mitarbeitenden vor Ort, nicht nur für die Zentrale.
- **Was ändert sich für wen?** Getrennt nach Gruppen, weil der Innendienst andere Fragen hat als der Außendienst.
- **Was bleibt, wie es ist?** Das wird fast immer vergessen und nimmt viel Unsicherheit.
- **Wo gibt es Hilfe?** Namen der Key User, nicht eine Adresse des Supports.

Diese Botschaft kommt in der Landessprache und von der eigenen Führung. Eine englische Rundmail aus der Zentrale erreicht die Leute, an die sie geht, aber sie überzeugt sie selten.

## Wie hängt Change Management mit den Landesabweichungen zusammen?

Viele Wünsche nach Abweichung vom Template sind auch eine Frage des Change Managements. Ich ordne jeden Wunsch zuerst ein: gesetzlich oder regulatorisch nötig, wirtschaftlich begründet, durch Technik oder Organisation bedingt, oder Gewohnheit. Nur die letzte Gruppe ist vor allem eine Aufgabe für das Change Management. Wünsche aus Gewohnheit kommen allerdings fast immer mit einer fachlichen Begründung. Wenn der Sponsor im Land versteht, warum das Template so gebaut ist, kann er diese Wünsche einordnen, bevor sie beim Architekten ankommen.

Umgekehrt zeigt die Liste der Abweichungen, wo das Change Management ansetzen muss. Wenn ein Land zwanzig Wünsche einreicht und die anderen drei, ist das ein Anlass nachzufragen. Manchmal hat das Land wirklich andere Anforderungen, häufiger fehlt dort Awareness. Ich nehme die Abweichungsliste deshalb in jedes Gespräch mit dem Sponsor eines Landes mit.

## Die erste Welle ist der Test für alle weiteren

Die erste Welle ist der Test für alle weiteren, auch für das Change Management. Nach dem Go-live des ersten Landes prüfe ich mit dem Sponsor und den Key Usern:

1. **Welche Fragen kamen nach dem Go-live am häufigsten?** Sie zeigen, wo Schulung oder Kommunikation gefehlt hat.
2. **Wo wird neben Salesforce weiter mit eigenen Listen gearbeitet?** Das zeigt, wo der neue Prozess nicht angekommen ist. Ob Wissen, Bedienung, fehlende Funktionen oder Bereitschaft dahinterstehen, klärt das Gespräch mit den Nutzern. Wie man das misst, beschreibe ich in [Salesforce-Nutzung nach dem Go-live messen](../salesforce-nutzung-messen-nach-go-live/).
3. **Was hätten die Key User gern früher gewusst?** Die Antwort geht direkt in den Plan für das nächste Land.

Zwischen zwei Wellen braucht es dafür einen kurzen Prüfpunkt, auch wenn sich Wellen überlappen: Kritische Fehler aus der ersten Welle sind gelöst, Schulungsunterlagen angepasst, Änderungen am Template entschieden und die Key User der nächsten Welle bereit. Wer die nächste Welle startet, während das erste Land noch Fragen hat, verteilt die Aufmerksamkeit des Projektteams zu dünn, und das zweite Land startet mit denselben Lücken.

```hinweis tipp
Lassen Sie Key User des nächsten Landes einige Tage im Land der laufenden Welle mitarbeiten. Sie sehen echte Fälle, lernen die Fragen kennen, die nach dem Go-live kommen, und bringen das in ihr eigenes Land mit.
```

## Pro Land einen Sponsor benennen, bevor die Planung beginnt

Benennen Sie für jedes Land einen Sponsor, bevor das Land in die Planung kommt, und lassen Sie ihn die Liste der Landesabweichungen mit prüfen. Legen Sie pro Land Key User fest und vereinbaren Sie ihre Zeit mit den Führungskräften, wie in [Key User in Salesforce-Einführungen](../salesforce-key-user-netzwerk/) beschrieben. Nach dem ersten Land planen Sie eine Auswertung ein, bevor das zweite startet. Ohne benannten Sponsor beginnt für ein Land kein Detaildesign, auch wenn der Zeitplan drängt. Wie wir das in Programmen aufsetzen, steht unter [Change Management für Salesforce-Programme](../../leistungen/change-management/).
