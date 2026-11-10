---
title: "Salesforce-Partner wechseln ohne Stillstand"
metaTitle: "Salesforce-Partner wechseln: Ablauf und Übergabe-Checkliste"
description: "Salesforce-Implementierungspartner wechseln, ohne das Projekt anzuhalten: Ablauf, Übergabe-Checkliste und was Sie vor der Kündigung besitzen müssen."
pubDate: 2026-11-10
lang: de
slug: salesforce-partner-wechseln
translationKey: switch-salesforce-partner
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Partnerwechsel, Implementierungspartner, Übergabe, Partnersteuerung, Repository, Org-Analyse]
takeaways:
  - "Ein Partnerwechsel scheitert selten am neuen Partner. Meist fehlt dem Kunden, was ihm nie gehörte: Repository, Pipeline, Zugänge und Wissen."
  - "Sichern Sie Zugänge, Code und offene Arbeit, bevor Sie kündigen. Nach der Kündigung verhandeln Sie aus der schwächeren Position."
  - "Eine Org-Analyse durch den Kunden zeigt dem neuen Partner, was er übernimmt, und verhindert, dass er als Erstes einen Neubau verkauft."
  - "Liegen Jira, Confluence, Pipeline und Miro beim Kunden und sind Stand und offene Stories gepflegt, ist rund 80 Prozent der Arbeit schon getan."
  - "Ich empfehle einen harten Cut zum Stichtag. Danach stellt der alte Partner nur noch offene Tickets fertig und beantwortet Rückfragen."
faq:
  - q: "Wie lange dauert ein Wechsel des Salesforce-Partners?"
    a: "Das hängt vor allem von der Projektphase ab. Nach dem Go-live geht ein Wechsel deutlich schneller als mitten in der Einführung. Entscheidend ist außerdem, wie gut der aktuelle Stand und die offenen Stories dokumentiert sind und ob Jira, Confluence, Pipeline und Miro beim Kunden liegen. Mitten in der Einführung einer großen Org können es einige Monate werden, die Auswahl des neuen Partners allein dauert meist vier bis acht Wochen."
  - q: "Gehört der Code meiner Salesforce-Org mir oder dem Partner?"
    a: "Die Metadaten liegen technisch in Ihrer Org, das Git-Repository, die Pipeline und die DevOps-Tool-Lizenzen aber oft beim Partner. Die Nutzungsrechte an Code, Partner-Bausteinen und Paketen regelt Ihr Vertrag. Klären Sie vor der Kündigung, was Sie weiter nutzen und dem neuen Partner geben dürfen."
  - q: "Kann der alte Partner die Übergabe verweigern?"
    a: "Ob er das darf, ist eine Vertrags- und Rechtsfrage, die Sie mit Einkauf und Rechtsabteilung klären. Praktisch wird es schwierig, wenn Umfang, Preis und Fristen der Übergabe nicht im Vertrag stehen. Deshalb gehört eine Übergabeklausel in jeden Partnervertrag."
  - q: "Harter Cut oder sanftes Auslaufen des alten Partners?"
    a: "Ich empfehle einen harten Cut: Ab einem Stichtag verantwortet der neue Partner die Org. Der alte Partner stellt danach nur noch seine offenen Tickets fertig und steht für Rückfragen zur Verfügung, neue Arbeit bekommt er nicht mehr. Ein sanftes Auslaufen, bei dem beide Partner neue Arbeit übernehmen, verwischt die Verantwortung."
  - q: "Sollte der neue Partner die Org-Analyse machen?"
    a: "Lieber nicht allein. Ein neuer Partner hat ein Interesse daran, viel Neubaubedarf zu finden. Lassen Sie die Analyse von der Kundenseite durchführen und geben Sie dem neuen Partner das Ergebnis."
draft: false
---

Einen Salesforce-Partner wechseln Sie ohne Projektstopp, wenn Sie vor der Kündigung alles sichern, was der alte Partner mitnehmen könnte: Repository, Pipeline, Zugänge, offene Arbeit und das Wissen über Entscheidungen. Danach lassen Sie die Org von der Kundenseite analysieren, wählen den neuen Partner anhand dieser Analyse aus und wechseln mit einem harten Cut zu einem festen Stichtag. Als Architekt auf Kundenseite habe ich vier Partnerwechsel in Enterprise-Projekten begleitet. Über den Verlauf haben dabei vor allem die Projektphase, die Dokumentation und die Frage entschieden, wem die Tools gehören.

## Warum Hersteller ihren Salesforce-Partner wechseln

```praxis
Bei den vier Partnerwechseln, die ich begleitet habe, waren die Gründe ähnlich: Die Qualität war nie da, oder sie ließ nach, weil Berater des Partners das Projekt oder die Firma verlassen hatten. Oder der Vertrieb hatte etwas verkauft, was das Team noch nie gemacht hatte, und das Projekt brauchte mehr Zeit und mehr Budget.
```

Bei Herstellern kommt ein Muster dazu: Die Org ist über Jahre gewachsen, und mehrere Partner haben daran gebaut. Einer hat den Vertrieb eingeführt, ein zweiter den Kundenservice, ein dritter die SAP-Schnittstelle. Wechselt einer davon, betrifft die Übergabe auch gemeinsame Objekte, Trigger und Flows, an denen die anderen Partner hängen.

Selten ist der Grund ein einzelner Fehler. Meist sammeln sich verpasste Termine, Releases, die Fehler in die Produktion bringen, und ein Team, das bei jeder Frage erst nachsehen muss, wer das gebaut hat. Wenn Sie in dieser Lage sind, bleibt nur noch die Frage, wie Sie wechseln, ohne dass das laufende Geschäft leidet.

## Was Sie vor der Kündigung besitzen müssen

Vor der Kündigung ist die Bereitschaft des alten Partners zur Zusammenarbeit meist am größten. Danach läuft jede offene Frage über Vertrag, Budget und Priorität. Prüfen Sie deshalb vorher, was bei Ihnen liegt und was nicht.

```tabelle
titel: Übergabe-Checkliste für den Partnerwechsel
spalten: Bereich | Was Sie prüfen | Woran es oft hängt
Repository | Liegt das Git-Repository in Ihrem Account, mit Admin-Zugriff für Sie? * | Repository im Account des Partners
Pipeline | Laufen Pipeline, DevOps-Tool und CI-Runner unter Ihrer Lizenz und Ihrem Account? * | DevOps-Tool auf den Partner lizenziert
Zugänge | Welche Nutzer, Integrationsbenutzer, Connected Apps, Zertifikate und Named Credentials hängen an Leuten des Partners? | Schnittstellen laufen über persönliche Accounts
Offene Arbeit | Welche Branches, Pull Requests, Stories und Sandboxes sind in Arbeit? | Halbfertiges liegt nur in Sandboxes
Wissen | Liegen Jira, Confluence, Miro und das Entscheidungslog in Ihren Accounts, und sind Stand und offene Stories gepflegt? | Tickets und Dokumentation im Account des Partners
Verträge | Auf wen laufen AppExchange-Pakete und Drittlizenzen, welche Übergabepflicht gibt es? | Keine Übergabeleistung im Vertrag
fazit: Die markierten Punkte kosten nach der Kündigung am meisten Zeit.
```

Meine Erfahrung aus vier Wechseln: Liegen Jira, Confluence, Pipeline und Miro beim Kunden und sind der aktuelle Stand und die offenen Stories, vor allem für die nächsten Sprints, sauber gepflegt, ist rund 80 Prozent des Aufwands schon geschafft. Je mehr davon beim Partner liegt, desto länger dauert der Wechsel.

Das Repository ist der wichtigste Punkt. Die Metadaten stehen zwar in Ihrer Org, aber wer wann was geändert hat, steht nur im Git-Repository. Warum es geändert wurde, steht in Tickets, Pull Requests und im Entscheidungslog. Liegen Repository und Tickets im Account des Partners, verlieren Sie beim Wechsel genau das Wissen, das der neue Partner zum Einarbeiten braucht. Ob Sie Code und Bausteine des Partners weiter nutzen dürfen, regelt Ihr Vertrag; klären Sie das, bevor Sie das Repository übernehmen. Warum Repository und DevOps-Tools grundsätzlich beim Kunden liegen sollten, steht in [Warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/).

```hinweis achtung
Prüfen Sie vor der Kündigung, ob Schnittstellen zu SAP oder anderen Systemen über einen Benutzer, ein Zertifikat oder eine Connected App laufen, die an einer Person des Partners hängen. Wird der Benutzer beim Ausscheiden deaktiviert oder läuft das Zertifikat ab, fällt die Schnittstelle aus. Stellen Sie solche Verbindungen vorher auf eigene Integrationsbenutzer um und tauschen Sie Zugangsdaten aus, die der Partner kennt.
```

Wie Sie Integrationsbenutzer und Connected Apps aufräumen, steht in [Salesforce-Integrationsbenutzer aufräumen](../salesforce-integrationsbenutzer-aufraeumen/).

## Wie läuft ein Partnerwechsel ab?

Ein Wechsel hat vier Phasen. Wie lange sie dauern, hängt vor allem von der Projektphase ab: Nach dem Go-live geht es deutlich schneller als mitten in der Einführung. Die Zeiten unten sind Richtwerte für eine große Org mitten in der Einführung.

```schritte
Sichern | 2 bis 4 Wochen · Kunde
  Repository, Pipeline, Zugänge und offene Arbeit unter die eigene Kontrolle bringen, noch vor der Kündigung.
Analysieren | 2 bis 4 Wochen · Kunde
  Org-Analyse von der Kundenseite: was es gibt, was vermutlich genutzt wird, was riskant ist.
Auswählen | 4 bis 8 Wochen · Kunde
  Neue Partner auf Basis der Analyse anbieten lassen, mit denselben Fragen für alle.
Übergeben | Stichtag · neuer Partner
  Harter Cut nach einem stabilen Release. Der alte Partner stellt nur noch offene Tickets fertig und beantwortet Rückfragen.
```

**Sichern.** Legen Sie das Repository in Ihren eigenen Account oder lassen Sie es dorthin übertragen, mit allen Branches und der Historie. Lassen Sie es vorher auf Passwörter, Schlüssel und Kundendaten durchsuchen, und tauschen Sie gefundene Zugangsdaten aus. Lassen Sie sich die Pipeline-Konfiguration geben und prüfen Sie, ob ein Deployment ohne den Partner funktioniert. Erst wenn das gelingt, ist der Partner austauschbar. Klären Sie in dieser Phase auch, wie lange die Vergabe von Berechtigungen in Ihrem Haus braucht: Der neue Partner benötigt nach der Auswahl Zugänge, teilweise bis ins Active Directory.

**Analysieren.** Eine Org-Analyse zeigt, was in der Org steckt: wie viele Apex-Klassen, Flows und Permission Sets es gibt, wo Regeln verletzt werden und wie hoch die Testabdeckung ist. Ob etwas genutzt wird, zeigen die Tools nur als Hinweis; das bestätigt der Fachbereich. Ich lasse zuerst deterministische Tools laufen und gebe die Ergebnisse dann einem Sprachmodell, das Zweck und Geschäftsprozess jeder Komponente beschreibt, als Vorschlag, den jemand fachlich prüft. Mit KI geht die Analyse heute schneller. Wie lange sie dauert, hängt davon ab, wie groß die Org ist und ob der Partner einen oder mehrere Streams betreut hat. Wie das geht und was es kostet, steht in [KI-Org-Analyse vor dem Partnerwechsel](../ki-org-analyse-technische-schulden/).

**Auswählen.** Geben Sie allen Kandidaten dieselbe Analyse und dieselben Fragen. Ein Partner, der nach zwei Stunden Präsentation einen Neubau empfiehlt, ohne die Analyse gelesen zu haben, verkauft Ihnen ein Projekt. Geht es um Time and Material, ist eine Ausschreibung schneller erledigt als bei fest vereinbarten Ergebnissen. Worauf Sie bei der Auswahl achten, steht in [Salesforce-Implementierungspartner auswählen](../salesforce-implementierungspartner-auswaehlen/).

**Übergeben.** Sie können den alten Partner sanft auslaufen lassen oder zu einem Stichtag hart wechseln. Ich bin ein Freund des harten Cuts nach einem stabilen Release: Ab dem Stichtag verantwortet der neue Partner die Org und übernimmt alle neuen Stories. Der alte Partner stellt nur noch seine offenen Tickets fertig und steht für Rückfragen zur Verfügung. Lassen Sie ihn diese Tickets als Pull Requests liefern, die der neue Partner prüft und deployt, damit es ab dem Stichtag nur einen Weg in die Produktion gibt. Das erste Release bringt der neue Partner allein durch die Pipeline, mit Abnahmetest und Plan für den Rückweg. Sind die offenen Tickets erledigt und ist die vereinbarte Zeit für Rückfragen vorbei, entziehen Sie dem alten Partner die Zugänge.

## Harter Cut mit kurzer Überlappung

Viele Kunden wollen den alten Partner so schnell wie möglich los sein, und ich verstehe das: Er hat das Vertrauen verloren, und jeder Tag mit ihm fühlt sich wie verschwendetes Geld an. Ganz ohne Überlappung lief trotzdem keiner der vier Wechsel, die ich begleitet habe. Der alte Partner hat jedes Mal seine offenen Tickets fertiggestellt und Rückfragen beantwortet, neue Arbeit hat er nicht mehr bekommen.

Diese kurze Überlappung lohnt sich. Ohne sie muss der neue Partner vieles aus Code und Metadaten ableiten, vor allem wenn die Dokumentation Lücken hat. Er findet Trigger, deren Zweck niemand kennt, und Flows, die sich gegenseitig auslösen. Die erste Änderung dauert dann Wochen statt Tage, und das erste Release bringt Fehler in Produktion, die der alte Partner in fünf Minuten erklärt hätte.

Regeln Sie die Übergabe deshalb im Vertrag, am besten schon beim Projektstart. In eine Übergabeklausel gehören mindestens:

- Herausgabe des Repositorys mit Historie, Pipeline-Konfiguration und Dokumentation
- Liste der offenen Branches, Stories und Sandboxes zum Stichtag
- Fertigstellung offener Tickets und Beantwortung von Rückfragen nach dem Stichtag, mit Umfang, Dauer und Tagessatz
- Stichtag, Entzug der Zugänge und Austausch der Zugangsdaten
- Nutzungsrechte an Code und Bausteinen des Partners

Steht nichts davon im Vertrag, verhandeln Sie es nach der Kündigung, und dann hat der alte Partner wenig Anlass, Ihnen entgegenzukommen.

## Typische Fallen beim Wechsel

Diese Fehler machen einen Partnerwechsel teuer:

- **Der neue Partner bekommt keine Analyse.** Dann schätzt er auf Basis einer Präsentation und findet die Überraschungen im Projekt. Das Ergebnis sind Change Requests in den ersten drei Monaten.
- **Mitten im Release wechseln.** Ein halbfertiges Release mit Arbeit von zwei Partnern versteht später keiner mehr. Beginnen Sie die Übergabe nach einem stabilen Release.
- **Nur Code übergeben, keine Entscheidungen.** Der neue Partner sieht, was gebaut wurde, aber nicht warum. Ein [Entscheidungslog](../salesforce-architektur-entscheidungslog/) beantwortet diese Frage, ohne dass jemand nachfragen muss.
- **Zuständigkeiten nicht neu verteilen.** Arbeiten mehrere Partner an der Org, muss für jedes Objekt klar sein, wer es nach dem Wechsel verantwortet. Dafür eignet sich eine [Object Ownership Matrix](../object-ownership-matrix-salesforce/).
- **Dieselben Fehler wiederholen.** Wenn der alte Partner wegen schlechter Qualität gehen musste, braucht der neue Regeln, die das verhindern: Pull Requests, Testabdeckung, ein Quality Gate vor jedem Release. Sonst wechseln Sie in zwei Jahren wieder.

## Wer steuert den Wechsel auf Kundenseite?

Den Wechsel sollte jemand auf Kundenseite steuern, der die Org technisch versteht und keinem der beiden Partner verpflichtet ist. Beide Partner haben eigene wirtschaftliche Interessen: Der alte möchte seine Arbeit gut dastehen lassen, der neue findet eher zu viel Neubaubedarf als zu wenig. Das ist verständlich. Deshalb braucht der Kunde eine eigene technische Bewertung.

Haben Sie intern einen Salesforce-Architekten oder einen technischen Produktverantwortlichen, sollte diese Person den Wechsel steuern. Haben Sie niemanden, holen Sie sich für die Zeit des Wechsels einen unabhängigen Architekten, der Analyse, Auswahl und Übergabe begleitet und danach die Standards für den neuen Partner festlegt. So arbeite ich in der [Partnersteuerung](../../leistungen/partnersteuerung/): auf Kundenseite, ohne Provisionen von Partnern oder Toolherstellern.

## Erster Schritt: ein Deployment ohne den alten Partner

Bevor Sie über die Kündigung sprechen, testen Sie, ob Sie ohne den alten Partner deployen können. Nehmen Sie eine kleine Änderung, etwa ein neues Feld in einer Sandbox, und bringen Sie sie mit eigenen Leuten über Ihr Repository und Ihre Pipeline bis in eine Testumgebung. Gelingt das, ist der Partner austauschbar. Gelingt es nicht, wissen Sie genau, was Sie vor der Kündigung noch übernehmen müssen.
