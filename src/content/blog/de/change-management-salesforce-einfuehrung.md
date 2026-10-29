---
title: "Salesforce Change Management: warum Einführungen scheitern"
description: "Salesforce Change Management: warum CRM-Einführungen im Alltag scheitern, wie das ADKAR-Modell die Ursache zeigt und wo Hersteller anfangen sollten."
pubDate: 2026-10-29
lang: de
slug: change-management-salesforce-einfuehrung
translationKey: change-management-hub
topic: governance
categories: [change-management, architecture]
contactBrief: change
tags: [Change Management, ADKAR, Prosci, Salesforce-Einführung]
takeaways:
  - "Eine Salesforce-Einführung scheitert selten an der Technik. Sie scheitert, wenn Menschen nach dem Go-live weiter so arbeiten wie vorher, mit Excel, E-Mail und eigenen Listen."
  - "Das ADKAR-Modell von Prosci zeigt, an welcher von fünf Stufen es hängt: Bewusstsein, Bereitschaft, Wissen, Fähigkeit oder Verankerung. Eine weitere Schulung hilft nur bei zwei davon."
  - "In der Prosci-Studie erreichten Projekte mit sehr gutem Change Management ihre Ziele in 88 Prozent der Fälle, mit schlechtem in 13 Prozent."
  - "Change Management betrifft nicht nur Fachbereiche, sondern auch Entwicklerteams und Partner, die nach neuen Standards bauen sollen."
faq:
  - q: "Was ist Change Management in einem Salesforce-Projekt?"
    a: "Change Management heißt, neue Prozesse, Standards und Releases so einzuführen, dass die Menschen, die damit arbeiten, sie auch nutzen. Es läuft parallel zur technischen Umsetzung und endet nicht mit dem Go-live."
  - q: "Was ist das ADKAR-Modell?"
    a: "Ein Modell von Prosci mit fünf Stufen, die jede Person bei einer Veränderung durchläuft: Awareness, Desire, Knowledge, Ability und Reinforcement. Hakt eine Einführung, fehlt meist eine dieser Stufen."
  - q: "Braucht jedes Salesforce-Projekt Change Management?"
    a: "Jedes Projekt, das ändert, wie Menschen arbeiten. Viele Kunden meinen, sie bräuchten keins, weil Schulungen geplant sind. Schulungen decken aber nur Wissen und Fähigkeit ab, nicht Bewusstsein, Bereitschaft und Verankerung."
  - q: "Wer ist im Salesforce-Programm für Change Management verantwortlich?"
    a: "Der Kunde, mit einem Sponsor im Management, der sichtbar hinter der Einführung steht. Partner bauen das System, die Veränderung im Unternehmen können sie nicht verantworten."
  - q: "Ist Change Management dasselbe wie IT-Change-Management?"
    a: "Nein. IT-Change-Management nach ITIL steuert Änderungen an Systemen: wer eine Änderung beantragt, prüft und freigibt. In Salesforce ist das Aufgabe von Release-Management und Deployment. Change Management im Sinne dieses Artikels sorgt dafür, dass die Menschen die Änderung annehmen. Eine CRM-Einführung braucht beides."
draft: false
---

Salesforce-Einführungen scheitern selten an der Technik. Sie scheitern, wenn Vertrieb, Service und Außendienst nach dem Go-live weiter so arbeiten wie vorher, mit Excel, E-Mail und eigenen Listen neben dem neuen System. Salesforce Change Management ist die Arbeit, die das verhindert: neue Prozesse, Standards und Releases so einführen, dass die Menschen sie nutzen. Ich orientiere mich dabei an Prosci und dem ADKAR-Modell, weil es zeigt, an welcher Stelle eine Einführung hängt. Eine weitere Schulung hilft nämlich nur, wenn Wissen fehlt, nicht wenn niemand versteht, wozu das Ganze gut ist.

## Warum kommt Salesforce im Alltag nicht an?

Ein Release ist technisch in Minuten ausgerollt. Danach entscheidet sich, ob jemand anders arbeitet. Die Gründe, warum das nicht passiert, sind in Salesforce-Programmen fast immer dieselben:

- **Betroffene erfahren zu spät davon.** Wer eine Änderung erst in Produktion sieht, sucht sich einen Weg drumherum.
- **Niemand erklärt, wozu.** Ein Vertriebsteam pflegt Opportunities, weil es muss, und weiß nicht, dass die Absatzplanung darauf aufbaut.
- **Es fehlt der Rückhalt im Management.** Ohne Entscheidungen von oben bleiben neue Regeln eine Empfehlung.
- **Es gibt keinen Rückweg.** Probleme aus dem Alltag landen in E-Mails und nicht im Backlog.

Das gilt nicht nur für Fachbereiche. Wenn ein Programm neue Standards für Entwicklung und Release einführt, sind Entwicklerteams und Umsetzungspartner genauso Betroffene. Sie kennen die Regeln, legen sie aber unterschiedlich aus, solange niemand sie verankert.

```praxis
Viele Kunden meinen, sie bräuchten kein Change Management. Das Budget ist verteilt, die Schulungen sind geplant, und die Nutzer werden sich schon gewöhnen. Ich bringe es trotzdem immer wieder ins Gespräch, in der Planung, vor jedem Land und nach jedem Go-live. Beim weltweiten Manufacturing-Cloud-Rollout würde ich es heute noch früher und noch öfter tun.
```

## Was zeigt das ADKAR-Modell?

Prosci befragt seit 1998 Projekte nach ihren Erfahrungen mit Veränderungen. In der 12. Ausgabe der Studie [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf) mit 2.668 Teilnehmenden erreichten Projekte mit sehr gutem Change Management ihre Ziele in 88 Prozent der Fälle, Projekte mit schlechtem in 13 Prozent. Als wichtigsten Erfolgsfaktor nannten die Teilnehmenden aktives und sichtbares Sponsoring durch das Management.

Das [ADKAR-Modell](https://www.prosci.com/blog/adkar-model) beschreibt fünf Stufen, die jede Person bei einer Veränderung durchläuft. Für ein Salesforce-Programm übersetze ich sie so:

| Stufe | Frage | Typisches Zeichen, dass sie fehlt | Wer hilft |
|---|---|---|---|
| Awareness (Bewusstsein) | Warum ändert sich etwas? | „Das alte System ging doch auch.“ | Führungskraft der Gruppe |
| Desire (Bereitschaft) | Will ich mitmachen? | Pflichtfelder werden mit Punkten gefüllt | Sponsor, direkte Führungskraft |
| Knowledge (Wissen) | Weiß ich, wie es geht? | Fragen nach dem Weg zu einer Funktion | Schulung, Key User |
| Ability (Fähigkeit) | Kann ich es im Alltag? | Funktioniert in der Schulung, nicht im Kundentermin | Key User vor Ort, Übung |
| Reinforcement (Verankerung) | Bleibe ich dabei? | Nach drei Monaten zurück bei Excel | Berichte, Prüfungen, Anerkennung |

Der Nutzen liegt in der Diagnose. Statt bei niedriger Nutzung die nächste Schulung anzusetzen, fragen wir je betroffener Gruppe, an welcher Stufe es hängt. Wenn der Vertrieb nicht weiß, wofür gepflegte Opportunities gebraucht werden, fehlt Awareness, und das muss der Vertriebsleiter erklären, nicht der Trainer.

Der Sponsor verdient einen eigenen Satz, weil er in Salesforce-Programmen am häufigsten fehlt. Gemeint ist eine Person aus dem Management, die sichtbar hinter der Einführung steht: Sie erklärt im Vertriebsmeeting, warum Prognosen künftig aus Salesforce kommen, entscheidet, wenn zwei Bereiche sich nicht einigen, und fragt im Monatsbericht nach der Nutzung. Ich schreibe deshalb einen Sponsor-Plan, der festlegt, was das Management wann sichtbar tut. Ohne diesen Plan wird aus „das Management steht dahinter“ eine Zeile auf der ersten Folie.

Prosci und ADKAR sind eingetragene Marken von Prosci, Inc. Das Vorgehen habe ich gemeinsam mit [Juliane Winterscheid](../../partner/juliane-winterscheid/) auf Salesforce-Programme übertragen, meiner Kooperationspartnerin für Change Management.

## Welche Themen gehören zu Change Management in Salesforce-Programmen?

Change Management ist kein einzelner Arbeitsschritt. In Salesforce-Programmen von Herstellern kommen immer wieder dieselben Themen vor. Jedes hat einen eigenen Artikel:

1. **[Key User aufbauen](../salesforce-key-user-netzwerk/):** Wer im Fachbereich die ersten Fragen beantwortet und wie viel Zeit das kostet.
2. **[Change Management im weltweiten Rollout](../change-management-weltweiter-rollout/):** Was pro Land dazugehört, wenn ein globales Template ausgerollt wird.
3. **[Akzeptanz der Techniker für die Field Service App](../field-service-app-akzeptanz-techniker/):** Warum der Außendienst die App annimmt oder umgeht.
4. **[Releases an den Fachbereich kommunizieren](../salesforce-releases-fachbereich-kommunizieren/):** Wie Fachbereiche vor einem Release erfahren, was sich ändert.
5. **[Reinforcement: Standards bei Partnern verankern](../standards-partner-verankern-reinforcement/):** Wie neue Regeln für Entwicklung im Alltag der Partner bleiben.
6. **[Nutzung nach dem Go-live messen](../salesforce-nutzung-messen-nach-go-live/):** Welche Zahlen zeigen, ob ein Prozess angekommen ist.
7. **[Akzeptanz im Vertrieb](../salesforce-akzeptanz-vertrieb/):** Warum der Vertrieb Salesforce umgeht und was dagegen hilft.
8. **[Schulungskonzept](../salesforce-schulungskonzept-einfuehrung/):** Wie Schulungen nach Rollen, am eigenen Fall und durch Key User geplant werden.
9. **[Hypercare-Phase nach dem Go-live](../hypercare-phase-salesforce-go-live/):** Wer in den ersten Wochen dabei ist und wann sie endet.
10. **[Change-Management-Prozess im Projekt](../change-management-prozess-salesforce/):** Welche Change-Arbeit in welche Projektphase gehört, von der Planung bis zum Betrieb.

## Wie läuft Change Management neben der Umsetzung?

Prosci gliedert die Arbeit auf Ebene der Organisation in drei Phasen, den [Prosci 3-Phase Process](https://www.prosci.com/methodology/3-phase-process). In einem Salesforce-Programm laufen sie neben dem Release-Plan:

```schritte
Vorgehen vorbereiten | vor dem ersten Release · Kunde mit Sponsor
  Festlegen, woran Erfolg gemessen wird, welche Gruppen betroffen sind, was sich für jede ändert und wer im Management die Einführung trägt.
Veränderung steuern | mit jedem Release · Kunde, Key User
  Je Gruppe ein Plan entlang der ADKAR-Stufen, verknüpft mit dem Release-Plan. Nutzung messen und nachsteuern, wo sie hängt.
Ergebnisse sichern | nach dem Go-live · interne Verantwortliche
  Lücken prüfen, neue Regeln in Pipeline, Berichten und Center-of-Excellence-Calls verankern, Verantwortung übergeben.
```

Entscheidend ist der Zeitpunkt. Change Management, das zwei Wochen vor dem Go-live beginnt, kann nur noch informieren. Die Frage, welche Gruppen betroffen sind und was sich für sie ändert, gehört in die Planung, bevor gebaut wird. Bei einem [globalen Template](../salesforce-globales-template-laenderabweichungen/) ist sie sogar Teil der Architektur, weil jede Abweichung pro Land auch eine Frage der Gewohnheit ist.

## Wo fangen Sie an?

Beantworten Sie für Ihr nächstes Release drei Fragen schriftlich: Welche Gruppen sind betroffen? Was ändert sich für jede im Alltag? Wer im Management steht sichtbar dahinter? Fehlt die dritte Antwort, ist das der erste Schritt. Danach legen Sie fest, woran Sie Erfolg messen, zum Beispiel an Nutzungszahlen in Salesforce statt an der Zahl der Schulungen.

Wer die fünf Stufen der Reihe nach durchgehen möchte, findet sie in der [Masterclass Change Management](../../masterclass/change-management/), ein Kapitel pro Stufe mit den passenden Artikeln.

Salesforce ist erst eingeführt, wenn die Menschen damit arbeiten. Wenn eine Einführung ansteht oder neue Prozesse nicht genutzt werden, [schreiben Sie mir](#contact) oder lesen Sie mehr über meine [Change Management Beratung für Salesforce](../../leistungen/change-management/).
