---
title: "Salesforce-Implementierungspartner auswählen"
metaTitle: "Salesforce-Implementierungspartner auswählen: Prüffragen"
description: "Wie Hersteller einen Salesforce-Implementierungspartner auswählen: Warnsignale im Angebot, Fragen im Pitch und warum Referenzen wenig über Qualität verraten."
pubDate: 2026-11-06
updatedDate: 2026-11-10
lang: de
slug: salesforce-implementierungspartner-auswaehlen
translationKey: choose-salesforce-implementation-partner
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Implementierungspartner, Partnerauswahl, Partnersteuerung, Festpreis, Vendor Lock-in, Codequalität]
takeaways:
  - "Der Partner wählt Referenzen und Umfragekontakt selbst aus. Fragen Sie, was in einem Projekt schiefging und was er seitdem geändert hat."
  - "Beruht die Schätzung auf einer Discovery, in der nur der Happy Path betrachtet wurde, tauchen die Randfälle später als Change Request wieder auf."
  - "Lassen Sie sich die Schlüsselrollen namentlich zusagen. Im Pitch treten Senior-Leute auf, im Projekt arbeitet oft ein gemischtes Team mit vielen Junioren."
  - "Fragen Sie, wie Meilensteine, Lieferung und Quality Gates zusammenhängen. Gerade bei KI-Coding zeigt die Antwort, ob der Partner Qualität plant."
  - "Code, Metadaten und Pipeline-Konfiguration gehören Ihnen. In den meisten Angeboten fehlt das Thema ganz."
faq:
  - q: "Wie finde ich einen Salesforce-Implementierungspartner in Deutschland?"
    a: "Für die Vorauswahl eignet sich der Consultant-Bereich auf AppExchange, wenn Sie nach Produkt, Branche und Standort filtern. Die Entscheidung sollte aber auf der Discovery, dem benannten Team und den Antworten zur Qualitätssicherung beruhen, nicht auf Sternen und Partnerstufe."
  - q: "Sagt die Partnerstufe (Summit, Crest, Ridge) etwas über die Qualität aus?"
    a: "Nur begrenzt. Die Stufe ergibt sich aus einem Punktwert mit mehreren Bestandteilen, darunter die durchschnittliche Kundenzufriedenheit abgeschlossener Projekte, Zertifizierungen und Navigator-Status. Darüber, wie das Team arbeitet, das Sie erhalten, sagt sie kaum etwas aus."
  - q: "Festpreis oder Aufwand: Was ist bei einem Salesforce-Partner besser?"
    a: "Ein Festpreis schützt Sie, wenn die Discovery die Randfälle Ihrer Prozesse erfasst und das Angebot Annahmen, Ausschlüsse und Abnahmekriterien nennt. Sonst verlagert sich das Risiko über Change Requests zurück zu Ihnen."
  - q: "Was tun, wenn der Partner nach dem Projektstart Schlüsselpersonen austauscht?"
    a: "Regeln Sie das vorher im Vertrag: benannte Schlüsselrollen, Austausch nur mit Ihrer Zustimmung, gleichwertiger Ersatz und eine Übergabezeit auf Kosten des Partners. Ohne diese Regel merken Sie den Wechsel meist erst an der Qualität."
draft: false
---

Einen Salesforce-Implementierungspartner wählen Sie besser nach Punkten aus, die in Angeboten oft fehlen, als nach der Aufmachung der Präsentation und den Referenzen, die der Partner aussucht: wie gründlich der Partner Ihre Prozesse untersucht hat, bevor er einen Preis nennt, wer die Schlüsselrollen ab Tag 1 besetzt, wie er Qualität an Meilensteine bindet und ob Sie ohne ihn weitermachen könnten. Als Architekt auf Kundenseite habe ich schon öfter erlebt, dass ein Partner gewechselt werden musste. Viele Gründe dafür waren schon im Angebot erkennbar.

## Nach welchen Kriterien wählen Sie einen Salesforce-Partner aus?

Kurz gesagt: Vergleichen Sie alle Kandidaten anhand derselben sechs Kriterien und stellen Sie allen dieselben Fragen. Die ersten fünf Warnsignale habe ich in echten Angeboten gesehen, und jedes hat sich später im Projekt bemerkbar gemacht.

```tabelle
titel: Kriterien für die Wahl eines Salesforce-Implementierungspartners
spalten: Kriterium | Was Sie fragen | Warnsignal im Angebot
Umfang | Welcher unserer Prozesse ist nicht abgedeckt? * | Optimistischer Festpreis
Discovery | Welche Sonderfälle haben Sie besprochen? * | Discovery nur für den Happy Path
Team | Wer besetzt ab Tag 1 die Schlüsselrollen, mit Namen? * | Senior-Leute nur im Pitch
Austauschbarkeit | Könnten wir nach dem Go-live ohne Sie weitermachen? * | Kein Wort zu Repository und Pipeline
Qualität | Wie hängen Meilensteine und Quality Gates zusammen? * | Keine Aussage zur Qualitätssicherung
Lernen | Welches Projekt ging schief, und was haben Sie geändert? * | Nur vom Partner vorbereitete Referenzen
fazit: Jeder Punkt lässt sich vor der Vergabe klären. Nach der Vergabe kostet er Geld.
```

Der erste Punkt wird oft unterschätzt. In meinen Fällen war der Festpreis zu optimistisch, und der Kunde wusste gar nicht, welche Funktionen in den einzelnen Arbeitspaketen enthalten waren und ob sie seinen Bedarf decken. Fehlt dann ein Prozess, deckt der Preis den tatsächlichen Umfang nicht mehr, und mit jedem Change Request schwindet der Schutz des Festpreises. Wie sich Festpreis und Aufwand verschieben, seit Partner mit KI arbeiten, steht in [Festpreis statt Aufwand](../festpreis-statt-aufwand-ki-salesforce/).

## Warum Referenzen wenig über einen Implementierungspartner verraten

Referenzen werden vom Partner vorbereitet. Kein Partner nennt Ihnen das Projekt, in dem es richtig schiefging. Das ist kein Vorwurf: Jeder Implementierungspartner hat Leichen im Keller, und wer etwas anderes behauptet, hat entweder wenige Projekte gemacht oder sagt nicht alles.

Die Zahlen auf AppExchange helfen bei der Vorauswahl ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/consultants-on-appexchange/find-the-right-consultant-on-appexchange)). Die Zufriedenheitsumfrage nach Projektende geht an den Kontakt, den der Partner selbst einträgt, und abgebrochene Projekte zählen nicht in den Durchschnitt ([Salesforce Partner Community](https://partners.salesforce.com/s/Customer_Satisfaction_new)).

```tabelle
titel: Was die Angaben auf AppExchange zeigen
spalten: Angabe | Zeigt | Zeigt nicht
Zertifizierte Mitarbeitende | Größe der Salesforce-Practice | Wer in Ihrem Projekt arbeitet *
Spezialisierungen | Produkt- und Branchenerfahrung der Firma | Erfahrung des Teams, das Sie erhalten *
Sterne und Zufriedenheit | Urteil der Kontakte, die der Partner eingetragen hat | Projekte, die abgebrochen wurden *
Partnerstufe | Punktwert aus Zufriedenheit, Zertifizierungen und Navigator-Status | Qualität in einem einzelnen Projekt *
fazit: Gut für die Vorauswahl, zu wenig für die Entscheidung.
```

Die bessere Frage lautet: Welches Projekt ist bei Ihnen schiefgegangen, was haben Sie daraus gelernt, und woran sehe ich, dass es nicht wieder passiert? Wer darauf konkret antwortet und eine geänderte Regel oder einen neuen Prüfschritt nennt, hat aus seinen Fehlern etwas gemacht. Wenn Sie können, sprechen Sie zusätzlich mit einem früheren Kunden, der nicht auf der Referenzliste steht.

## Die Discovery entscheidet, wie belastbar die Schätzung ist

Eine Schätzung ganz ohne Discovery ist selten geworden. Häufiger ist eine Discovery, die zu oberflächlich bleibt: Ich habe Schätzungen gesehen, für die nur der Happy Path besprochen wurde, der Standardfall nach Schema F. Bei Herstellern liegt der Aufwand aber oft in den Randfällen.

```vergleich
ohne: Discovery nur für den Happy Path
- Nur der Standardfall nach Schema F ist besprochen.
- Geräte ohne Seriennummer, Aufträge über zwei Werke oder eigene Rahmenverträge fehlen.
- Regeln, Datenmodell und Schnittstellen dafür stehen in keiner Schätzung.
- * Die Randfälle tauchen später als Change Request auf.
mit: Discovery mit Randfällen
- * Die Liste der Sonderfälle liegt dem Angebot bei.
- Annahmen hinter der Schätzung und offene Entscheidungen sind aufgeschrieben.
- Sie sehen vor der Vergabe, was im Preis steckt und was nicht.
zitat: Bei Herstellern liegt der Aufwand in den Randfällen, nicht im Standardfall.
```

Fragen Sie deshalb nicht, ob eine Discovery stattfand, sondern lassen Sie sich diese Belege zeigen. Kann der Partner nichts davon vorlegen, haben Sie keinen Beleg, dass Randfälle besprochen wurden.

Ein Teil der Verantwortung liegt beim Kunden. In jedem meiner Projekte dauerte der Abnahmetest länger als geplant, weil Mitarbeitende des Kunden nicht verfügbar waren, und es entstanden Change Requests, weil der Fachbereich sich vorher zu wenig mit der eigenen Lösung und dem Ist-Zustand beschäftigt hatte. Fragen Sie den Partner deshalb auch, was er von Ihnen erwartet: welche Prozessverantwortlichen er für wie viele Tage braucht, wann Sie welche Entscheidungen treffen müssen und wer Testfälle vorbereitet, Testdaten liefert und testet.

## Das Team aus dem Pitch ist nicht automatisch das Team im Projekt

Im Pitch treten die erfahrenen Leute auf. Im Projekt war das Team dann in meinen Fällen sehr durchmischt, mit vielen Junioren. Das muss nicht schlecht sein, Junioren brauchen Projekte. Es wird schlecht, wenn niemand Erfahrenes ihre Arbeit prüft und der Kunde das erst an der Qualität merkt.

```praxis
Partnerwechsel habe ich schon öfter erlebt. Die Gründe waren ähnlich: Die Qualität stimmte von Anfang an nicht, oder sie ließ nach, weil Mitarbeitende des Partners das Projekt oder die Firma verlassen hatten. Oder der Vertrieb hatte etwas verkauft, was das Team noch nie gemacht hatte, und das Projekt brauchte mehr Zeit und mehr Budget.
```

Daraus ergeben sich die Fragen für den Pitch. Wer besetzt ab Tag 1 die Schlüsselrollen, mit Namen und Zeitanteil, und welche Seniorität hat der Rest des Teams? Wer hat genau dieses Produkt und die Szenarien schon eingeführt, die Sie brauchen, bei Herstellern zum Beispiel Installed Base und Anlagenhierarchien, Ersatzteile aus dem ERP oder Einsatzplanung für Servicetechniker? Und wer übernimmt, wenn eine Schlüsselperson geht, und wer bezahlt die Einarbeitung?

## Wie fragen Sie nach Qualität, ohne die Antwort vorzugeben?

Auf „Arbeiten Sie in unserem Repository nach unseren Standards?“ antwortet jeder Partner mit Ja. Ich stelle diese Fragen deshalb über Umwege: Ich beschreibe ein Problem und lasse den Partner erzählen, wie er es lösen würde. Ein Partner mit gutem Vorgehen erkennt das dann von selbst, ohne dass ich es vorgebe. Code-Review und Testregeln stehen selten im Angebot, und gerade seit Partner mit KI-Werkzeugen programmieren, sollte jeder Partner von sich aus erklären, wie er jede Änderung prüft, egal wer oder was sie geschrieben hat.

- **Meilensteine und Qualität.** „Wie hängen Ihre Projektmeilensteine mit der Lieferung und den Quality Gates zusammen?“ Gute Antworten nennen konkrete Prüfungen: Code-Review, Testabdeckung und automatische Prüfungen in der Pipeline, aber auch Datenmigration, Integrationstests und Abnahmereife. Ein Meilenstein gilt erst als technisch fertig, wenn alle bestanden sind; die fachliche Abnahme folgt mit eigenen Kriterien. Mehr dazu in [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/) und [Partner codet mit KI](../partner-ki-coding-regeln-vertrag/).
- **Ein zweiter Partner.** „In zwei Jahren übernimmt ein weiterer Partner Field Service. Wie verhindern wir, dass sich beide gegenseitig überschreiben?“ Gute Antworten erwähnen Pull Requests, eine [Object Ownership Matrix](../object-ownership-matrix-salesforce/) und eine gemeinsame [Sandbox-Strategie](../salesforce-sandbox-strategie-mehrere-partner/).
- **Übernahme nach dem Go-live.** „Wir wollen den Betrieb später selbst führen. Was bekommen wir dann von Ihnen?“ Hier zeigt sich, ob Code, Konfiguration und Dokumentation bei Ihnen liegen sollen oder beim Partner bleiben.

Warum ich Partner gezielt nach gescheiterten Projekten frage, beschreibe ich auf Englisch in einem Artikel auf LinkedIn: [Every Salesforce partner has skeletons in the closet. Ask about them.](https://www.linkedin.com/pulse/every-salesforce-partner-has-skeletons-closet-ask-them-fabian-kramer-crtke/)

## Was in den Vertrag mit dem Partner gehört

Was im Pitch gut klingt, muss in den Vertrag, sonst gilt es nicht. Diese Punkte gehören mindestens hinein:

- **Benannte Schlüsselrollen,** Austausch nur mit Ihrer Zustimmung, gleichwertiger Ersatz und eine Übergabezeit auf Kosten des Partners.
- **Eigentum und Zugriff:** Code, Metadaten, Dokumentation und Pipeline-Konfiguration, die für Sie erstellt werden, gehören Ihnen von Anfang an, mit Administratorzugriff auf Repository und Pipeline. Für Accelerators und Vorlagen des Partners regelt der Vertrag Ihr Nutzungsrecht.
- **Quality Gates mit festgelegten Prüfungen** für die technische Fertigstellung jedes Meilensteins, mit den Nachweisen, die der Partner liefert.
- **Annahmen und Ausschlüsse** der Schätzung und eine Regel für Randfälle, die die Discovery nicht abgedeckt hat: Wer bewertet sie, und unter welchen Bedingungen werden sie zum Change Request?

Arbeiten mehrere Partner an einer Org, stellt sich zusätzlich die Frage, wer die Regeln für alle festlegt. In meinem größten Programm arbeiteten fünf Partner mit über 30 Entwicklern an einer Org, und die Standards wurden auf Kundenseite vorgegeben, wie auf der Seite zur [Partnersteuerung](../../leistungen/partnersteuerung/) beschrieben. Wann dafür ein unabhängiger Architekt sinnvoll ist, steht in [Salesforce-Freelancer oder Agentur](../salesforce-freelancer-oder-agentur/).

## Erster Schritt: drei Problemfälle für alle Partner aufschreiben

Bevor Sie Partner einladen, legen Sie fest, woran Sie sie messen, und geben allen dieselben Fälle aus Ihrem eigenen Programm.

```schritte
Fälle aufschreiben | vor der Einladung · Kunde
  Ein Randfall aus Ihrem Prozess, ein zweiter Partner steigt ein, eine Schlüsselperson des Partners geht.
Kriterien festlegen | vor dem ersten Pitch · Kunde
  Für alle Partner dieselben Kriterien, damit nicht die beste Präsentation gewinnt.
Fälle im Pitch durchspielen | im Pitch · jeder Partner
  Jeder Partner erzählt, wie er bei denselben drei Fällen vorgehen würde.
Belege verlangen | mit dem Angebot · Partner
  Schlüsselrollen mit Namen, Liste der Sonderfälle aus der Discovery, Annahmen hinter dem Preis.
```
