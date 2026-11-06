---
title: "Salesforce-Implementierungspartner auswählen"
metaTitle: "Salesforce-Implementierungspartner auswählen: Prüffragen"
description: "Wie Hersteller einen Salesforce-Implementierungspartner auswählen: Warnsignale im Angebot, Fragen im Pitch und warum Referenzen wenig über Qualität verraten."
pubDate: 2026-11-06
lang: de
slug: salesforce-implementierungspartner-auswaehlen
translationKey: choose-salesforce-implementation-partner
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Implementierungspartner, Partnerauswahl, Partnersteuerung, Festpreis, Vendor Lock-in, Codequalität]
takeaways:
  - "Der Partner wählt die Referenzen und den Kontakt für die Zufriedenheitsumfrage. Fragen Sie, was in einem Projekt schiefging und was er seitdem geändert hat."
  - "Beruht die Schätzung auf einer Discovery, die nur den Happy Path kennt, kommen die Randfälle später als Change Request zurück."
  - "Lassen Sie sich die Schlüsselrollen mit Namen zusagen. Im Pitch sitzen Senior-Leute, im Projekt oft ein gemischtes Team mit vielen Junioren."
  - "Fragen Sie, wie Meilensteine, Lieferung und Quality Gates zusammenhängen. Gerade bei KI-Coding zeigt die Antwort, ob der Partner Qualität plant."
  - "Code, Metadaten und Pipeline-Konfiguration gehören Ihnen. In den meisten Angeboten kommt das Thema gar nicht vor."
faq:
  - q: "Wie finde ich einen Salesforce-Implementierungspartner in Deutschland?"
    a: "Für die Vorauswahl eignet sich der Consultant-Bereich auf AppExchange, gefiltert nach Produkt, Branche und Standort. Die Entscheidung sollte aber auf der Discovery, dem benannten Team und den Antworten zur Qualitätssicherung beruhen, nicht auf Sternen und Partnerstufe."
  - q: "Sagt die Partnerstufe (Summit, Crest, Ridge) etwas über die Qualität aus?"
    a: "Nur begrenzt. Die Stufe folgt aus einem Punktwert mit mehreren Bestandteilen, darunter die durchschnittliche Kundenzufriedenheit abgeschlossener Projekte, Zertifizierungen und Navigator-Status. Wie das Team arbeitet, das Sie bekommen, sagt sie kaum."
  - q: "Festpreis oder Aufwand: was ist bei einem Salesforce-Partner besser?"
    a: "Ein Festpreis schützt Sie, wenn die Discovery die Randfälle Ihrer Prozesse kennt und das Angebot Annahmen, Ausschlüsse und Abnahmekriterien nennt. Sonst wandert das Risiko über Change Requests zurück zu Ihnen."
  - q: "Was tun, wenn der Partner nach dem Projektstart Schlüsselpersonen austauscht?"
    a: "Regeln Sie das vorher im Vertrag: benannte Schlüsselrollen, Austausch nur mit Ihrer Zustimmung, gleichwertiger Ersatz und eine Übergabezeit, die der Partner trägt. Ohne diese Regel merken Sie den Wechsel meist erst an der Qualität."
draft: false
---

Einen Salesforce-Implementierungspartner wählen Sie besser nach Punkten aus, die in Angeboten oft fehlen, als nach der Aufmachung der Präsentation und den Referenzen, die der Partner aussucht: wie gründlich der Partner Ihre Prozesse untersucht hat, bevor er einen Preis nennt, wer die Schlüsselrollen ab Tag 1 besetzt, wie er Qualität an Meilensteine bindet und ob Sie ohne ihn weitermachen könnten. Als Architekt auf Kundenseite habe ich schon öfter erlebt, dass ein Partner gewechselt werden musste. Viele Gründe dafür waren schon im Angebot erkennbar.

## Warum Referenzen wenig über einen Implementierungspartner verraten

Referenzen werden vom Partner gebrieft. Kein Partner nennt Ihnen das Projekt, in dem es richtig schiefging. Das ist kein Vorwurf: Jeder Implementierungspartner hat Leichen im Keller, und wer etwas anderes behauptet, hat entweder wenige Projekte gemacht oder sagt nicht alles.

Die Zahlen auf AppExchange helfen bei der Vorauswahl ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/consultants-on-appexchange/find-the-right-consultant-on-appexchange)). Die Zufriedenheitsumfrage nach Projektende geht an den Kontakt, den der Partner selbst einträgt, und abgebrochene Projekte zählen nicht in den Durchschnitt ([Salesforce Partner Community](https://partners.salesforce.com/s/Customer_Satisfaction_new)).

```tabelle
titel: Was die Angaben auf AppExchange zeigen
spalten: Angabe | Zeigt | Zeigt nicht
Zertifizierte Mitarbeitende | Größe der Salesforce-Practice | Wer in Ihrem Projekt sitzt *
Spezialisierungen | Produkt- und Branchenerfahrung der Firma | Erfahrung des Teams, das Sie bekommen *
Sterne und Zufriedenheit | Urteil der Kontakte, die der Partner eingetragen hat | Projekte, die abgebrochen wurden *
Partnerstufe | Punktwert aus Zufriedenheit, Zertifizierungen und Navigator-Status | Qualität in einem einzelnen Projekt *
fazit: Gut für die Vorauswahl, zu wenig für die Entscheidung.
```

Die bessere Frage lautet: Welches Projekt ist bei Ihnen schiefgegangen, was haben Sie daraus gelernt, und woran sehe ich, dass es nicht wieder passiert? Wer darauf eine konkrete Antwort hat, mit einer geänderten Regel oder einem neuen Prüfschritt, hat aus seinen Fehlern etwas gemacht. Wenn Sie können, sprechen Sie zusätzlich mit einem früheren Kunden, der nicht auf der Referenzliste steht.

## Welche Warnsignale stehen im Angebot?

Die folgenden Punkte habe ich in Angeboten gesehen, und jeder davon hat sich später im Projekt bemerkbar gemacht.

```tabelle
titel: Warnsignale im Angebot eines Salesforce-Partners
spalten: Warnsignal | Was daraus wird | Was Sie fragen
Optimistischer Festpreis | Prozesse, die in den Arbeitspaketen fehlen, tauchen im Projekt auf | Welcher unserer Prozesse ist nicht abgedeckt? *
Discovery nur für den Happy Path | Randfälle kommen als Change Request | Welche Sonderfälle haben Sie besprochen? *
Senior-Leute im Pitch | Im Projekt ein gemischtes Team mit vielen Junioren | Wer besetzt ab Tag 1 die Schlüsselrollen, mit Namen? *
Kein Wort zu Repository und Pipeline | Der Partner ist schwer austauschbar | Könnten wir nach dem Go-live ohne Sie weitermachen? *
Keine Aussage zur Qualitätssicherung | Fehler zeigen sich erst im Test | Wie hängen Meilensteine und Quality Gates zusammen? *
fazit: Jeder Punkt lässt sich vor der Vergabe klären. Nach der Vergabe kostet er Geld.
```

Der erste Punkt wird oft unterschätzt. In meinen Fällen war der Festpreis zu optimistisch, und der Kunde wusste gar nicht, welche Funktionen in den einzelnen Arbeitspaketen enthalten waren und ob sie seinen Bedarf decken. Fehlt dann ein Prozess, deckt der Preis den tatsächlichen Umfang nicht mehr, und mit jedem Change Request schwindet der Schutz des Festpreises. Wie sich Festpreis und Aufwand verschieben, seit Partner mit KI bauen, steht in [Festpreis statt Aufwand](../festpreis-statt-aufwand-ki-salesforce/).

## Die Discovery entscheidet, wie belastbar die Schätzung ist

Eine Schätzung ganz ohne Discovery ist selten geworden. Häufiger ist eine Discovery, die zu oberflächlich bleibt: Ich habe Schätzungen gesehen, für die nur der Happy Path besprochen wurde, der Standardfall nach Schema F. Bei Herstellern liegt der Aufwand aber oft in den Randfällen.

```vergleich
ohne: Discovery nur für den Happy Path
- Nur der Standardfall nach Schema F ist besprochen.
- Geräte ohne Seriennummer, Aufträge über zwei Werke oder eigene Rahmenverträge fehlen.
- Regeln, Datenmodell und Schnittstellen dafür stehen in keiner Schätzung.
- Die Randfälle kommen später als Change Request.
mit: Discovery mit Randfällen
- Die Liste der Sonderfälle liegt dem Angebot bei.
- Annahmen hinter der Schätzung und offene Entscheidungen sind aufgeschrieben.
- Sie sehen vor der Vergabe, was im Preis steckt und was nicht.
```

Fragen Sie deshalb nicht, ob eine Discovery stattfand, sondern lassen Sie sich diese Belege zeigen. Kann der Partner nichts davon vorlegen, haben Sie keinen Beleg, dass Randfälle besprochen wurden.

Ein Teil der Verantwortung liegt beim Kunden. In jedem meiner Projekte dauerte der Abnahmetest länger als geplant, weil Mitarbeitende des Kunden nicht verfügbar waren, und es kamen Change Requests, weil der Fachbereich vorher zu wenig auf die eigene Lösung und den Ist-Zustand geschaut hatte. Fragen Sie den Partner deshalb auch, was er von Ihnen erwartet: welche Prozessverantwortlichen er wie viele Tage braucht, wann Sie welche Entscheidungen treffen müssen und wer Testfälle vorbereitet, Testdaten liefert und testet.

## Das Team aus dem Pitch ist nicht automatisch das Team im Projekt

Im Pitch sitzen die erfahrenen Leute. Im Projekt war das Team dann in meinen Fällen sehr durchmischt, mit vielen Junioren. Das muss nicht schlecht sein, Junioren brauchen Projekte. Es wird schlecht, wenn niemand Erfahrenes ihre Arbeit prüft und der Kunde das erst an der Qualität merkt.

```praxis
Partnerwechsel habe ich schon öfter erlebt. Die Gründe waren ähnlich: Die Qualität war nie da, oder sie ließ nach, weil Leute des Partners das Projekt oder die Firma verlassen hatten. Oder der Vertrieb hatte etwas verkauft, was das Team noch nie gemacht hatte, und das Projekt brauchte mehr Zeit und mehr Budget.
```

Daraus ergeben sich die Fragen für den Pitch. Wer besetzt ab Tag 1 die Schlüsselrollen, mit Namen und Zeitanteil, und welche Seniorität hat der Rest des Teams? Wer hat genau dieses Produkt und die Szenarien schon eingeführt, die Sie brauchen, bei Herstellern oft Installed Base und Anlagenhierarchien, Ersatzteile aus dem ERP oder Einsatzplanung für Servicetechniker? Und wer übernimmt, wenn eine Schlüsselperson geht, und wer bezahlt die Einarbeitung?

## Wie fragen Sie nach Qualität, ohne die Antwort vorzugeben?

Auf „Arbeiten Sie in unserem Repository nach unseren Standards?“ antwortet jeder Partner mit Ja. Ich stelle diese Fragen deshalb über Umwege: Ich beschreibe ein Problem und lasse den Partner erzählen, wie er es lösen würde. Ein Partner mit gutem Vorgehen beschreibt es dann als seine Lösung, ohne dass ich es vorgegeben habe. Code-Review und Testregeln stehen selten im Angebot, und gerade seit Partner mit KI-Werkzeugen programmieren, sollte er von sich aus erklären, wie er jede Änderung prüft, egal wer oder was sie geschrieben hat.

- **Meilensteine und Qualität.** „Wie hängen Ihre Projektmeilensteine mit der Lieferung und den Quality Gates zusammen?“ Gute Antworten nennen konkrete Prüfungen: Code-Review, Testabdeckung und automatische Prüfungen in der Pipeline, aber auch Datenmigration, Integrationstests und Abnahmereife. Ein Meilenstein gilt erst als technisch fertig, wenn alle bestanden sind; die fachliche Abnahme kommt mit eigenen Kriterien hinzu. Mehr dazu in [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/) und [Partner codet mit KI](../partner-ki-coding-regeln-vertrag/).
- **Ein zweiter Partner.** „In zwei Jahren kommt für Field Service ein weiterer Partner dazu. Wie verhindern wir, dass sich beide gegenseitig überschreiben?“ Gute Antworten erwähnen Pull Requests, eine [Object Ownership Matrix](../object-ownership-matrix-salesforce/) und eine gemeinsame [Sandbox-Strategie](../salesforce-sandbox-strategie-mehrere-partner/).
- **Übernahme nach dem Go-live.** „Wir wollen den Betrieb später selbst führen. Was bekommen wir dann von Ihnen?“ Hier zeigt sich, ob Code, Konfiguration und Dokumentation bei Ihnen liegen sollen oder beim Partner bleiben.

## Was in den Vertrag mit dem Partner gehört

Was im Pitch gut klingt, muss in den Vertrag, sonst gilt es nicht. Diese Punkte gehören mindestens hinein:

- **Benannte Schlüsselrollen,** Austausch nur mit Ihrer Zustimmung, gleichwertiger Ersatz und eine Übergabezeit auf Kosten des Partners.
- **Eigentum und Zugriff:** Code, Metadaten, Dokumentation und Pipeline-Konfiguration, die für Sie erstellt werden, gehören Ihnen von Anfang an, mit Administratorzugriff auf Repository und Pipeline. Für Accelerators und Vorlagen des Partners regelt der Vertrag Ihr Nutzungsrecht.
- **Quality Gates mit festgelegten Prüfungen** für die technische Fertigstellung jedes Meilensteins, mit den Nachweisen, die der Partner liefert.
- **Annahmen und Ausschlüsse** der Schätzung und eine Regel für Randfälle, die die Discovery nicht abgedeckt hat: Wer bewertet sie, und unter welchen Bedingungen werden sie zum Change Request?

Arbeiten mehrere Partner an einer Org, kommt die Frage dazu, wer die Regeln für alle festlegt. In meinem größten Programm bauten fünf Partner mit über 30 Entwicklern an einer Org, und die Standards kamen von der Kundenseite, wie auf der Seite zur [Partnersteuerung](../../leistungen/partnersteuerung/) beschrieben. Wann dafür ein unabhängiger Architekt sinnvoll ist, steht in [Salesforce-Freelancer oder Agentur](../salesforce-freelancer-oder-agentur/).

## Erster Schritt: drei Problemfälle für alle Partner aufschreiben

Bevor Sie Partner einladen, legen Sie fest, woran Sie sie messen, und geben allen dieselben Fälle aus Ihrem eigenen Programm.

```schritte
Fälle aufschreiben | vor der Einladung · Kunde
  Ein Randfall aus Ihrem Prozess, ein zweiter Partner kommt dazu, eine Schlüsselperson des Partners geht.
Kriterien festlegen | vor dem ersten Pitch · Kunde
  Für alle Partner dieselben Kriterien, damit nicht die beste Präsentation gewinnt.
Fälle im Pitch durchspielen | im Pitch · jeder Partner
  Jeder Partner erzählt, wie er bei denselben drei Fällen vorgehen würde.
Belege verlangen | mit dem Angebot · Partner
  Schlüsselrollen mit Namen, Liste der Sonderfälle aus der Discovery, Annahmen hinter dem Preis.
```
