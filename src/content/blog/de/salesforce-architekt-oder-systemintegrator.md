---
title: "Salesforce-Architekt oder Systemintegrator?"
metaTitle: "Salesforce-Architekt oder Systemintegrator: wer entscheidet"
description: "Der Systemintegrator bringt eigene Architekten mit. Wann reicht das, und wann braucht ein Hersteller einen Salesforce-Architekten auf Kundenseite?"
pubDate: 2026-11-16
lang: de
slug: salesforce-architekt-oder-systemintegrator
translationKey: salesforce-architect-or-system-integrator
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Salesforce Architekt, Systemintegrator, Implementierungspartner, Partnersteuerung, Solution Architect, Interessenkonflikt]
takeaways:
  - "Der Architekt des Systemintegrators plant oft sehr gut, aber für eine Firma, die an Aufwand, Umfang und Folgegeschäft verdient. Das prägt Scope-Fragen."
  - "Ein Architekt auf Kundenseite entscheidet nichts allein, er bereitet Entscheidungen für den Kunden vor und prüft, was der Partner liefert."
  - "Mit einem Partner, kleinem Umfang und eigener erfahrener IT reicht der Architekt des Systemintegrators oft aus."
  - "Sobald zwei Partner an einer Org bauen, SAP tief angebunden wird oder ein Partnerwechsel ansteht, braucht der Kunde ein eigenes technisches Mandat."
faq:
  - q: "Was ist der Unterschied zwischen einem Salesforce-Architekten und einem Systemintegrator?"
    a: "Ein Systemintegrator ist eine Firma, die Salesforce einführt und dafür ein Team mit Beratern, Entwicklern und eigenen Architekten stellt. Ein Salesforce-Architekt ist eine Rolle. Sie kann beim Systemintegrator sitzen oder auf Kundenseite, und davon hängt ab, wessen Interessen sie vertritt."
  - q: "Brauche ich einen eigenen Architekten, wenn mein Partner einen Solution Architect stellt?"
    a: "Nicht immer. Bei einem Partner, überschaubarem Umfang und einer internen IT, die Entwürfe beurteilen kann, reicht der Solution Architect des Partners. Arbeiten mehrere Partner an einer Org oder fehlt intern die technische Erfahrung, brauchen Sie eine eigene Stimme."
  - q: "Ersetzt ein Forward Deployed Engineer von Salesforce den Architekten?"
    a: "Nein. Ein FDE-Pod von Salesforce oder einem Partner bringt einen einzelnen Agentforce-Anwendungsfall in Produktion und verlässt das Projekt danach. Zielbild, Standards über alle Partner und die Entscheidungen im Architekturboard bleiben Aufgaben auf Kundenseite."
  - q: "Wie viel Zeit braucht ein Architekt auf Kundenseite?"
    a: "Zum Start oft drei bis fünf Tage pro Woche, wenn Zielbild, Standards und Partnerauswahl anstehen. Läuft das Programm stabil, reichen meist zwei Tage pro Woche für Reviews, Entscheidungen und den Termin mit den technischen Leads."
  - q: "Arbeitet ein Architekt auf Kundenseite gegen den Partner?"
    a: "Nein. Er sorgt dafür, dass der Partner klare Vorgaben bekommt und Entscheidungen schnell fallen. Gute Partner schätzen das, weil es Diskussionen über Zuständigkeiten und Change Requests verkürzt."
draft: true
---

Ein Salesforce-Architekt auf Kundenseite und der Architekt eines Systemintegrators können dasselbe Fachwissen haben. Der Unterschied liegt darin, für wen sie arbeiten. Der Architekt des Systemintegrators arbeitet für eine Firma, die an Aufwand, Umfang und Folgegeschäft verdient; der Salesforce Enterprise Architect auf Kundenseite arbeitet für den Hersteller, der die Org zehn Jahre betreiben muss. Mit einem Partner, kleinem Umfang und erfahrener interner IT reicht der Architekt des Systemintegrators meist aus. Sobald zwei Partner an einer Org bauen, SAP tief angebunden wird oder ein Partnerwechsel ansteht, braucht der Kunde ein eigenes technisches Mandat.

## Was ein Systemintegrator ist und was er mitbringt

Ob ein Freelancer, ein Beratungshaus oder ein interner Kollege die Rolle des Architekten auf Kundenseite besetzt, ist eine andere Frage, die [Salesforce-Freelancer oder Agentur](/blog/salesforce-freelancer-oder-agentur/) beantwortet. Hier geht es darum, wer welche Entscheidungen vorbereitet, wenn der Systemintegrator schon eigene Architekten mitbringt.

Ein Systemintegrator, im Salesforce-Umfeld meist Implementierungspartner genannt, ist eine Firma, die Salesforce einführt und weiterentwickelt. Er stellt ein Team: Projektleitung, Berater für die Fachprozesse, Entwickler, Tester und einen oder mehrere Architekten, oft Solution Architect oder Technical Architect genannt.

Diese Architekten sind häufig sehr gut. Sie kennen die Produkte, haben viele Einführungen gesehen und bringen Vorlagen mit, die sich bewährt haben. Ein guter Systemintegrator spart Ihnen damit viele Fehler, die ein internes Team beim ersten Projekt machen würde.

Ein Salesforce-Architekt bezeichnet dagegen eine Rolle. Sie kann beim Systemintegrator sitzen, in Ihrer eigenen IT oder bei einem unabhängigen Architekten, den Sie selbst beauftragen. Wo sie sitzt, entscheidet über die Antworten auf die Fragen, bei denen Kunde und Partner verschiedene Interessen haben.

## Wo die Interessen auseinandergehen

Bei den meisten Fragen wollen Kunde und Partner dasselbe: ein Projekt, das funktioniert und pünktlich fertig wird. Bei einigen Fragen nicht, und genau dort zeigt sich, für wen ein Architekt arbeitet.

```tabelle
titel: Fragen, bei denen Kunde und Systemintegrator verschiedene Interessen haben
spalten: Frage | Interesse des Kunden | Interesse des Systemintegrators
Umfang | So wenig bauen wie nötig * | Mehr Umfang heißt meist mehr Umsatz
Standardprodukt, Industry Cloud oder Eigenbau | Was über zehn Jahre billiger ist * | Was das Team kennt und gut verkauft
Repository und Pipeline | Gehören dem Kunden * | Liegen gern beim Partner
Zweiter Partner | Wettbewerb und Ausweichmöglichkeit * | Ein Wettbewerber in der eigenen Org
Change Requests | Randfälle gehören in die Schätzung * | Randfälle sind neue Aufträge
fazit: Diese Interessen folgen aus dem Geschäftsmodell des Partners.
```

Ein Architekt beim Systemintegrator kann bei diesen Fragen ehrlich beraten, und viele tun das. Er steht aber in einem Konflikt, den er nicht auflösen kann: Sein Arbeitgeber verdient am Umfang und am Folgegeschäft. Beim Festpreis kehrt sich das teilweise um, dann ist jeder zusätzliche Randfall ein Risiko, das der Partner lieber als Change Request abrechnet. Bei Make-or-Buy-Fragen können außerdem Vermittlungsprovisionen, Rabatte als Wiederverkäufer, gemeinsame Vertriebsziele mit dem Hersteller oder die eigene Partnerstufe eine Rolle spielen. Ich nehme keine Provisionen von Salesforce, Toolherstellern oder Implementierungspartnern, damit diese Frage bei mir gar nicht erst entsteht.

## Wer entscheidet was?

Ein Architekt auf Kundenseite nimmt dem Partner keine Arbeit weg. Er sorgt dafür, dass Entscheidungen beim Kunden liegen und dass der Partner weiß, woran er gemessen wird. So teile ich die Arbeit in größeren Programmen auf:

```tabelle matrix
titel: Aufteilung zwischen Architekt auf Kundenseite und Systemintegrator
spalten: Thema | Architekt Kundenseite | Systemintegrator
Zielarchitektur und Systemgrenzen | Entwirft, Kunde entscheidet * | liefert Input
Lösungsentwurf je Stream | prüft | Entwirft *
Entwicklungsstandards | Entwirft, Kunde setzt in Kraft * | wendet an
Code und Metadaten | prüft per Pull Request | Baut *
Schätzung und Angebot | Prüft * | Erstellt *
Make-or-Buy und Lizenzen | Bereitet Entscheidung vor * | liefert Input
Technische Freigabe vor dem Release | Go oder No-Go * | liefert Nachweise
```

Die Entscheidung selbst trifft der Kunde, meist der Head of CRM oder der Programmverantwortliche, die fachliche Abnahme bleibt beim Fachbereich. Der Architekt bereitet sie so vor, dass sie in einer Sitzung fällt: mit Optionen, Kosten über die Laufzeit und einer Empfehlung, und hält sie danach im [Entscheidungslog](/blog/salesforce-architektur-entscheidungslog/) fest.

## Wann reicht der Architekt des Systemintegrators?

Nicht jeder Hersteller braucht einen eigenen Architekten. Diese Kriterien entscheiden:

```tabelle
titel: Architekt des Systemintegrators oder Architekt auf Kundenseite
spalten: Kriterium | Architekt des SI reicht meist | Architekt auf Kundenseite ratsam
Partner | Ein Partner, kein zweiter in Sicht | Zwei oder mehr Partner an einer Org *
SAP und ERP | Wenige, einfache Schnittstellen | Kunden, Preise, Aufträge, Anlagen über SAP *
Interne Erfahrung | Jemand kann Salesforce-Entwürfe beurteilen | Niemand intern kann Nein sagen *
Repository und Pipeline | Gehören schon Ihnen | Liegen beim Partner *
Anlass | Laufende Weiterentwicklung | Partnerwechsel, Schieflage, Make-or-Buy *
fazit: Trifft keine Zeile rechts zu, investieren Sie besser in einen guten Partner und eine interne Person, die Salesforce lernt.
```

## Wann brauchen Hersteller einen Architekten auf Kundenseite?

Anders sieht es aus, sobald eine dieser Situationen eintritt:

- **Mehrere Partner an einer Org.** Ohne gemeinsame Standards baut jeder Partner nach seinen eigenen Regeln. In meinem größten Programm arbeiteten fünf Implementierungspartner mit über 30 Entwicklern in acht Streams an einer Org. Die Standards kamen von der Kundenseite, und es dauerte etwa drei Monate, bis sie standen.
- **SAP und andere Kernsysteme.** Für Kunden, Material, Preise, Aufträge, Anlagen mit Seriennummer und Servicefälle muss jemand festlegen, welches System führt. Diese Entscheidung wirkt über Jahre, und ein reiner Salesforce-Stream sieht davon oft nur seinen Ausschnitt.
- **Standardprodukt, Industry Cloud oder Eigenbau.** Ob sich Manufacturing Cloud, Field Service, eine AppExchange-Lösung oder eine Eigenentwicklung rechnet, hängt vom Geschäftsmodell ab. Das sollte jemand bewerten, der weder an Lizenzen noch an der Umsetzung verdient.
- **Partnerwechsel oder Projekt in Schieflage.** Dann braucht der Kunde jemanden, der die Org versteht und keinem der Partner verpflichtet ist. Wie ein Wechsel abläuft, steht in [Salesforce-Partner wechseln ohne Stillstand](/blog/salesforce-partner-wechseln/).
- **Keine eigene technische Erfahrung.** Wenn intern niemand die Entwürfe des Partners beurteilen kann, entscheidet faktisch der Partner.

```praxis
In einem Programm, das ich begleitet habe, lief anfangs jeder Pull Request über meinen Schreibtisch. Als der Prozess stabil lief, habe ich ihn an einen internen Kollegen übergeben.
```

Ein Architekt auf Kundenseite muss nicht für immer bleiben. Das Ziel ist, dass die Rolle irgendwann intern besetzt ist, mit dokumentierten Standards und einem Kollegen, der Reviews und den Termin mit den technischen Leads übernimmt.

## Und der Forward Deployed Engineer?

Seit 2025 setzt Salesforce für Agentforce eigene Forward Deployed Engineers ein, kurz FDEs: Pods aus zwei Engineers und einem Deployment Strategist, die einen Agenten direkt in der Org des Kunden bauen und bis in den Produktivbetrieb begleiten. Seit April 2026 stellen auch Partner aus dem FDE Partner Network solche Engineers, darunter Accenture und Deloitte. Damit gibt es neben Systemintegrator und Architekt auf Kundenseite eine dritte Rolle im Programm.

Ein FDE arbeitet für einen Anwendungsfall und für das Produkt seines Arbeitgebers. Er meldet Plattformgrenzen an das Produktmanagement von Salesforce zurück und verlässt das Projekt nach der Hypercare. Die Fragen, bei denen Kunde und Systemintegrator verschiedene Interessen haben, beantwortet er nicht: Umfang, Make-or-Buy, Repository und Pipeline, ein zweiter Partner. Er braucht sogar mehr Vorarbeit auf Kundenseite, weil er schnell baut und auf Entscheidungen zu Daten, Berechtigungen und Freigaben wartet. Was ein FDE kostet und wann er sich lohnt, steht in [Forward Deployed Engineer bei Salesforce erklärt](/blog/forward-deployed-engineer-salesforce/).

## Was ein Architekt auf Kundenseite kostet

Ein unabhängiger Salesforce-Architekt rechnet meist nach Tagessatz ab. Ich arbeite zu 1.200 Euro netto pro Tag remote, vor Ort kommen Pauschale oder Spesen dazu, mit mindestens zwei Tagen pro Woche und zum Start bis zu fünf. Im Vergleich zum Partnerbudget ist das ein kleiner Posten: Bei einem Programm mit 30 Entwicklern zahlt der Kunde ein Vielfaches davon an die Partner. Wartet ein Teil dieses Teams auch nur einen Tag auf eine Entscheidung, kostet das schnell mehr als eine Woche Architekt.

Wie die Steuerung mehrerer Partner konkret aussieht, beschreibe ich auf der Seite zur [Partnersteuerung](/leistungen/partnersteuerung/).

## Erster Schritt: die fünf Konfliktfragen Ihrem Programm zuordnen

Nehmen Sie die Tabelle mit den Fragen, bei denen Kunde und Systemintegrator verschiedene Interessen haben, und schreiben Sie für jede Frage auf, wer sie in Ihrem Programm heute beantwortet. Steht bei mehr als zwei Fragen der Partner, ohne dass jemand auf Ihrer Seite die Antwort prüfen kann, fehlt Ihnen die Rolle eines Architekten auf Kundenseite, intern oder extern.
