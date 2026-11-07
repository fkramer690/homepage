---
title: "Sponsor und Kommunikation in der Salesforce-Einführung"
description: "Wie ein Sponsor-Plan und ein Einführungsplan je Release Bewusstsein und Bereitschaft schaffen, mit Release Notes in Alltagssprache und frühem Betriebsrat."
lang: de
slug: sponsor-und-kommunikation
course: change-management
translationKey: cm-02
chapter: 2
pubDate: 2026-10-29
short: "Sponsor und Kommunikation"
summary: "Awareness und Desire: was der Sponsor sichtbar tut, wie ein Einführungsplan je Release aussieht und wann der Betriebsrat dazukommt."
takeaways:
  - "Awareness und Desire schafft die eigene Führung. Sie erklärt, warum sich etwas ändert, und entscheidet, wenn Bereiche sich nicht einigen."
  - "Ein Sponsor-Plan legt fest, was das Management wann sichtbar tut, damit „das Management steht dahinter“ mehr ist als eine Zeile auf der ersten Folie."
  - "Ein Einführungsplan je Release hat eine Zeile pro betroffener Gruppe: was sich ändert, wer informiert und wann, und steht, bevor die Entwicklung fertig ist."
  - "Release Notes für Anwender beantworten fünf Fragen in Alltagssprache und kommen in der Landessprache, höchstens eine halbe Seite pro Gruppe."
  - "Standortdaten, Zeiten und Auswertungen über Personen gehören in Deutschland vor der Einrichtung mit dem Betriebsrat geklärt."
articles: [change-release-communication, change-management-hub, ai-coding-works-council-gdpr]
faq:
  - q: "Was macht ein Sponsor in einer Salesforce-Einführung?"
    a: "Er steht sichtbar hinter der Einführung: Er erklärt im eigenen Bereich, warum sich etwas ändert, entscheidet, wenn zwei Bereiche sich nicht einigen, und fragt im Monatsbericht nach der Nutzung. Ohne diese drei Dinge bleibt eine neue Regel eine Empfehlung."
  - q: "Wann sollten Fachbereiche von einem Release erfahren?"
    a: "Key User etwa zwei Wochen vorher, wenn sie die Änderung im Abnahmetest sehen, die betroffenen Gruppen wenige Tage vorher mit Release Notes in Alltagssprache. Umstrittene Änderungen erklärt der Sponsor, bevor die Release Notes kommen."
  - q: "Muss jede Gruppe über jedes Release informiert werden?"
    a: "Nein. Gruppen ohne sichtbare Änderung bekommen keine Mail. Wer jede Woche Release-Mails liest, die ihn nicht betreffen, überliest die eine, die ihn betrifft."
draft: false
---

Bewusstsein und Bereitschaft, die ersten beiden Stufen im ADKAR-Modell, entstehen in einer Salesforce-Einführung durch die eigene Führung und nicht durch das Projektteam. Dafür braucht es zwei Werkzeuge. Ein Sponsor-Plan legt fest, was das Management wann sichtbar tut: erklären, entscheiden und nach der Nutzung fragen. Ein Einführungsplan je Release legt fest, welche Gruppe was erfährt, von wem und wann, bevor die Entwicklung fertig ist. Dazu kommen Release Notes in Alltagssprache, ein fester Rückweg für Rückmeldungen und, in Deutschland, ein früher Termin mit dem Betriebsrat.

## Warum entscheidet der Sponsor über die Einführung?

In der Prosci-Studie [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf) nannten die Teilnehmenden aktives und sichtbares Sponsoring als wichtigsten Erfolgsfaktor. In Salesforce-Programmen fehlt genau das am häufigsten. Ein Sponsor ist eine Person aus dem Management, die sichtbar hinter der Einführung steht. Sie sitzt nicht nur im Lenkungsausschuss, sie tritt vor die betroffenen Teams.

Wirksam wird ein Sponsor so:

```saeulen
dach: Ein wirksamer Sponsor
mic | Erklären | Im eigenen Bereich | Im Vertriebsmeeting sagt der Vertriebsleiter, warum Prognosen künftig aus Salesforce kommen. Dieselbe Botschaft vom Projektteam hat weniger Gewicht.
steer | Entscheiden | Bei Konflikten | Wenn Innendienst und Absatzplanung sich über ein Pflichtfeld nicht einigen, fällt die Entscheidung bei ihm und nicht im Sprint.
analyse | Nachfragen | Im Monatsbericht | Er fragt nach der Nutzung seiner Teams. Damit merken die Teams, dass es zählt.
basis: Festgehalten im Sponsor-Plan
```

Ich schreibe deshalb einen Sponsor-Plan: eine kurze Liste mit Terminen, an denen der Sponsor auftritt, Entscheidungen, die bei ihm liegen, und den Zahlen, die er monatlich bekommt. Ohne diesen Plan wird aus „das Management steht dahinter“ eine Zeile auf der ersten Folie.

## Der Einführungsplan hat eine Zeile pro betroffener Gruppe

Ein guter Release-Prozess macht Releases kleiner und häufiger. Der Fachbereich bekommt dann laufend kleine Änderungen statt eines großen Pakets pro Quartal. Eine Änderung, von der niemand wusste, wirkt wie ein Fehler. Dagegen hilft der Einführungsplan, den ich zusammen mit dem Release-Plan pflege. Für die Masterclass ergänze ich eine Spalte: welche ADKAR-Stufe bei dieser Gruppe gerade gefährdet ist. Daran hängt, ob eine Mail reicht oder der Sponsor ran muss.

| Gruppe | Änderung | Gefährdete Stufe | Wer spricht |
|---|---|---|---|
| Innendienst Deutschland | Liefertermin wird Pflichtfeld im Angebot | Desire, weil das Feld Arbeit macht | Sponsor vor dem Abnahmetest, dann Teamleitung |
| Außendienst Service | neues Wartungsprotokoll in der App | Knowledge und Ability | Key User der Region, vor dem App-Update |
| Vertrieb in allen Ländern | nichts Sichtbares | keine | niemand |

Gerade die leere Zeile zählt. Wer jede Woche Release-Mails ohne Bezug zur eigenen Arbeit bekommt, überliest irgendwann auch die eine, die ihn trifft. Wie Repository, Pipeline und Freigaben dahinter organisiert sind, steht im DevOps-Kapitel [Release-Prozess: Eigentum, Rollen und Freigaben](../../devops-release-management/release-prozess-eigentum-rollen/).

## Wie sehen Release Notes für Anwender aus?

User Stories, Felder und Flows interessieren den Fachbereich nicht. Release Notes für Anwender sind deshalb ein eigenes Dokument, und jede ihrer Fragen zahlt auf eine ADKAR-Stufe ein. Was sich für meine Gruppe ändert, notfalls mit Bildschirmfoto, und ab welchem Datum, schafft Awareness. Der Grund in einem Satz, etwa dass die Absatzplanung den Liefertermin braucht, stützt Desire. Was gleich bleibt, nimmt Unsicherheit und fehlt fast immer. Der Name des Key Users als Ansprechpartner sichert Knowledge. Pro Gruppe genügt eine halbe Seite, in mehreren Ländern in der jeweiligen Landessprache. Als Probe gebe ich den Text einem Key User ohne weitere Erklärung. Den ganzen Ablauf mit Beispielen beschreibe ich in [Salesforce-Releases an den Fachbereich kommunizieren](../../../blog/salesforce-releases-fachbereich-kommunizieren/).

```schritte
Planung | sobald der Umfang klar ist · Product Owner und Fachbereich
  Für jede Gruppe eine Zeile im Einführungsplan, strittige Zeilen gehen an den Sponsor.
Vor dem Abnahmetest | rund zwei Wochen davor · Key User
  Die Key User probieren die Änderung aus und sammeln vorab, was ihr Team fragen wird.
Kurz vor dem Release | ein paar Tage davor · Teamleitung und Key User
  Die betroffenen Gruppen erhalten ihre Release Notes in der eigenen Sprache.
Nach dem Release | erste Woche · Key User, Projektteam
  Key User sammeln Fragen, das Projekt schaut auf die Nutzung, Rückmeldungen wandern in den Backlog.
```

## Umstrittene Änderungen erklärt der Sponsor vor dem Abnahmetest

Manche Änderungen gefallen nicht allen. Ein neues Pflichtfeld macht dem Innendienst Arbeit und hilft der Absatzplanung. Solche Änderungen sollten nicht über die Release Notes zum ersten Mal bekannt werden. Im Einführungsplan markiere ich diese Zeilen, und der Sponsor erklärt vor dem Abnahmetest, warum die Änderung kommt. Hier entscheidet sich Desire: Wer den Grund kennt und weiß, dass die eigene Führung ihn trägt, füllt das Feld. Wer ihn nicht kennt, füllt es mit einem Punkt.

Ohne Rückkanal verpufft das. Rückmeldungen bekommen bei mir einen festen Ort, Fehler und Wünsche werden getrennt, und auf jede Rückmeldung folgt eine sichtbare Antwort, auch ein Nein. Ein Fachbereich, der erlebt, dass seine Rückmeldung im nächsten Release umgesetzt ist, liest auch die nächsten Release Notes.

## Wann kommt der Betriebsrat dazu?

In Deutschland hat der Betriebsrat nach [§ 87 BetrVG](https://www.gesetze-im-internet.de/betrvg/__87.html) ein Mitbestimmungsrecht bei technischen Einrichtungen, die Verhalten oder Leistung überwachen können. Salesforce berührt das an mehreren Stellen: Standortdaten der Field Service App, Stundenzettel, Auswertungen über einzelne Personen und KI-Werkzeuge. Für Change Management zählt neben der Rechtsfrage die Offenheit. Ein Techniker, der vom Betriebsrat erfährt, dass sein Standort nur während der Anfahrt übertragen wird, reagiert anders als einer, der es auf einer Karte im Büro entdeckt.

```hinweis achtung
Klären Sie Standortdaten, Zeiten und Auswertungen über Personen mit dem Betriebsrat, bevor sie eingerichtet sind, und schreiben Sie das Ergebnis in einfachen Worten in die Kommunikation vor dem Go-live. Eine nachträgliche Einigung kostet Wochen und Vertrauen.
```

Für KI-Werkzeuge in der Entwicklung gilt dasselbe, siehe [KI-Coding: Betriebsrat und DSGVO](../../../blog/ki-coding-betriebsrat-dsgvo/). Wie Techniker die App annehmen, behandelt [Kapitel 3](../key-user-und-schulung/).

## Einführungsplan für das nächste Release schreiben

Schreiben Sie für das nächste Release einen Einführungsplan mit einer Zeile pro betroffener Gruppe und markieren Sie die umstrittenen Zeilen. Gehen Sie mit dieser Liste zum Sponsor und vereinbaren Sie, wann er welche Änderung erklärt. Wenn kein Sponsor zu finden ist, ist das die wichtigste Erkenntnis des Plans. Die Diagnose dahinter steht in [Kapitel 1](../change-management-adkar-diagnose/), meine Arbeit dazu auf der Seite [Change Management für Salesforce-Programme](../../../leistungen/change-management/).
