---
title: "Salesforce-Freelancer oder Agentur: wann was passt"
description: "Wann ein Hersteller eine Salesforce-Agentur braucht, wann einen freiberuflichen Architekten auf Kundenseite und warum große Programme meist beides haben."
pubDate: 2026-10-29
lang: de
slug: salesforce-freelancer-oder-agentur
translationKey: salesforce-freelancer-or-consultancy
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [Freelancer, Agentur, Implementierungspartner, Partnersteuerung, Salesforce Architekt]
takeaways:
  - "Eine Agentur liefert Umsetzungskapazität, also ein Team, das baut, testet und betreibt, und ein einzelner Freelancer ersetzt dieses Team nicht."
  - "Ein freiberuflicher Architekt auf Kundenseite lohnt sich, wenn Entscheidungen und Standards beim Kunden liegen sollen und nicht beim Partner, der davon lebt."
  - "Die Warnungen vor Freelancern stimmen für den Freelancer als günstigeren Ersatz für ein Entwicklerteam, nicht für die Architektenrolle."
  - "In meinem größten Programm bauten 5 Partner mit über 30 Entwicklern in 8 Streams, die Standards dafür kamen von der Kundenseite."
  - "Gegen das Ausfallrisiko eines Freelancers helfen ein Entscheidungslog, dokumentierte Standards und ein interner Kollege als Vertretung."
faq:
  - q: "Ist ein Salesforce-Freelancer günstiger als eine Agentur?"
    a: "Pro Tag oft ja, weil Vertrieb, Overhead und Marge einer Agentur wegfallen. Die Frage ist aber, welche Rolle Sie besetzen. Für ein ganzes Umsetzungsteam ist eine Agentur fast immer die bessere Wahl, für die Architektenrolle auf Kundenseite ein unabhängiger Architekt."
  - q: "Wann sollte ich keinen Salesforce-Freelancer beauftragen?"
    a: "Wenn Sie eine komplette Einführung aus einer Hand brauchen, Gewährleistung für ein Gesamtergebnis wollen oder Support rund um die Uhr erwarten. Das kann eine einzelne Person nicht leisten."
  - q: "Kann ein freiberuflicher Architekt mit unserem Implementierungspartner zusammenarbeiten?"
    a: "Ja, das ist der Normalfall. Der Partner baut, der Architekt auf Kundenseite legt Standards fest, prüft Entwürfe und Pull Requests und bereitet Entscheidungen für den Kunden vor."
  - q: "Wie vermeide ich, dass das Wissen beim Freelancer hängen bleibt?"
    a: "Entscheidungen gehören in ein Entscheidungslog, Standards in ein gemeinsames Dokument und Code in ein Repository des Kunden. Planen Sie von Anfang an einen internen Kollegen ein, der Reviews und den CoE-Call später übernimmt."
draft: false
---

Ob Sie für Salesforce einen Freelancer oder eine Agentur beauftragen, hängt an der Rolle, die Sie besetzen wollen. Brauchen Sie ein Team, das eine Einführung baut, testet und betreibt, ist eine Agentur oder ein Implementierungspartner die richtige Wahl. Ein einzelner Salesforce-Freelancer ersetzt dieses Team nicht. Sollen dagegen Architekturentscheidungen, Standards und die Steuerung mehrerer Partner beim Kunden liegen, passt ein freiberuflicher Architekt auf Kundenseite, weil er nicht an der Umsetzung verdient. In größeren Programmen von Herstellern arbeiten beide zusammen.

## Was spricht gegen einen Salesforce-Freelancer?

Wer nach Salesforce-Freelancern sucht, findet weit oben Artikel von Agenturen, die davon abraten. Die Argumente sind nicht falsch:

- **Eine Person fällt aus.** Krankheit, Urlaub, ein anderes Projekt, und niemand übernimmt.
- **Kein Team dahinter.** Ein Freelancer kann nicht kurzfristig drei Entwickler mehr stellen, wenn der Go-live näher rückt.
- **Qualität schwer zu prüfen.** Profile auf Portalen sind oft anonym, Zertifikate sagen wenig über Projekterfahrung.
- **Keine Haftung für ein Gesamtergebnis.** Wer einen Freelancer nach Aufwand beauftragt, trägt das Ergebnisrisiko selbst.

Alle vier Punkte treffen zu, wenn ein Hersteller einen Freelancer als günstigeren Ersatz für ein Entwicklerteam einsetzt. Dann sitzt eine Person dort, wo ein Team hingehört, und der Kunde wundert sich, dass es nicht vorangeht.

Für die Rolle, in der ich selbst arbeite, stellen sich andere Fragen. Ein Architekt auf Kundenseite baut nicht die Einführung. Er sorgt dafür, dass die Teams, die bauen, nach denselben Regeln bauen und dass der Kunde die Entscheidungen trifft, die er treffen muss.

## Wann ist eine Agentur die bessere Wahl?

Eine Agentur oder ein Implementierungspartner ist die richtige Wahl, wenn Sie Kapazität und Verantwortung für ein Ergebnis einkaufen wollen:

- **Neueinführung ohne eigenes Salesforce-Team.** Sie brauchen Berater, Entwickler, Tester und einen Projektleiter, die sich kennen und eingespielt sind.
- **Festpreis oder Werkvertrag.** Wer ein Ergebnis zu einem festen Preis will, braucht einen Vertragspartner mit Team, der dafür einsteht.
- **Betrieb und Support.** Störungen am Montagmorgen, Releases dreimal im Jahr, neue Nutzer: Das braucht eine Organisation, keinen Einzelnen.
- **Spitzen in der Umsetzung.** Vor einem Go-live mehr Leute, danach weniger. Das kann ein Partner, ein Freelancer kann es nicht.

Ein guter Partner bringt dazu eigene Architekten mit. Das ist sinnvoll, solange es nur einen Partner gibt und der Kunde dessen Entscheidungen nachvollziehen kann.

## Wann passt ein unabhängiger Architekt besser?

Kritisch wird es, wenn der Partner auch über Dinge entscheidet, an denen er verdient, oder wenn mehrere Partner an derselben Org bauen. Dann braucht der Kunde jemanden auf seiner Seite des Tisches.

```pro-contra
pro: Freiberuflicher Architekt auf Kundenseite
- Arbeitet nur für den Kunden und verdient nicht am Umfang der Umsetzung
- Legt Standards fest, die für alle Partner gleich gelten
- Prüft Entwürfe und Pull Requests unabhängig vom Lieferanten
- Bereitet Entscheidungen wie Industry Cloud oder Eigenbau ohne Verkaufsinteresse vor
contra: Was er nicht leistet
- Keine Umsetzungskapazität für eine ganze Einführung
- Kein Werkvertrag über ein Gesamtergebnis
- Keine Vertretung durch Kollegen, wenn er ausfällt
- Kein Betrieb und kein Support rund um die Uhr
```

Typische Situationen, in denen ich gerufen werde:

- **Mehrere Partner an einer Org.** Jeder Partner baut nach seinen eigenen Regeln, bis die Automationen auf einem Objekt sich gegenseitig blockieren. Wer welches Objekt verantwortet, regelt eine [Object Ownership Matrix](../object-ownership-matrix-salesforce/), und die gehört dem Kunden.
- **Entscheidungen vor der Unterschrift.** Ob sich die Manufacturing Cloud lohnt oder ein Eigenbau auf der Plattform reicht, sollte nicht der beantworten, der die Lizenzen oder das Projekt verkauft. Bei Lizenzen sehe ich regelmäßig, dass standardmäßig volle Lizenzen angeboten werden, obwohl viele Nutzer sie nicht brauchen. Das kann schnell sechsstellige Beträge pro Jahr ausmachen.
- **Qualität sichern, die der Kunde nicht selbst prüfen kann.** Ein Architekt auf Kundenseite liest mit, bevor etwas in Produktion geht. Warum das in Enterprise-Projekten Pflicht ist, steht in [Pull-Request-Reviews](../warum-pull-request-reviews-pflicht-sind/).
- **Werkzeuge und Wissen beim Kunden halten.** Repository, Pipeline und Entscheidungen gehören dem Kunden, damit ein Partnerwechsel möglich bleibt. Das beschreibe ich ausführlich in [warum Kunden ihre DevOps-Tools selbst besitzen sollten](../warum-kunden-devops-tools-selbst-besitzen-sollten/).

## Architekt und Partner haben getrennte Rollen

In den meisten Programmen, in denen ich arbeite, gibt es beides: Partner, die bauen, und mich auf Kundenseite. Die Rollen sind klar getrennt.

| Aufgabe | Kunde | Architekt auf Kundenseite | Implementierungspartner |
|---|---|---|---|
| Zielbild und Architekturentscheidungen | entscheidet | bereitet vor, dokumentiert im Entscheidungslog | bringt Vorschläge ein |
| Standards und Object Ownership Matrix | gibt frei | entwirft und pflegt | hält sich daran, meldet Randfälle |
| Umsetzung, Tests, Deployment | nimmt ab | prüft Entwürfe und Pull Requests | baut und liefert |
| Center of Excellence | leitet | führt den technischen Call | stellt Änderungen vor |
| Lizenzen und Verträge | verhandelt | rechnet Bedarf und Varianten | liefert Mengengerüst |

```praxis
In meinem größten Programm haben 5 Implementierungspartner mit über 30 Entwicklern in 8 Streams an derselben Org gebaut. Die Standards dafür, von Namenskonventionen über eine Automation pro Objekt bis zur Object Ownership Matrix, haben rund drei Monate gebraucht. 80 Prozent standen nach der ersten Runde, die Randfälle kamen nach und nach dazu. Später wurden Änderungen mit Vorlauf im technischen CoE-Call alle zwei Wochen vorgestellt, bis neue Randfälle fast ganz verschwunden waren.
```

Kein einzelner Partner hätte diese Rolle übernehmen können, ohne Regeln für seine Wettbewerber festzulegen. Und kein Freelancer hätte die Arbeit der 30 Entwickler leisten können. Wie das Gremium dazu aussieht, steht in [Salesforce Center of Excellence: Format und Rhythmus](../salesforce-center-of-excellence-format/).

## Mit diesen Fragen prüfen Sie einen freiberuflichen Architekten

Wenn Sie einen Architekten für Ihre Seite des Tisches suchen, helfen andere Fragen als bei einem Entwickler:

- **Welche Entscheidung hat er zuletzt vorbereitet, und wie ist sie dokumentiert?** Lassen Sie sich ein anonymisiertes [Entscheidungslog](../salesforce-architektur-entscheidungslog/) zeigen. Wer keines führt, hinterlässt Ihnen später nur seine Erinnerung.
- **Wie viele Partner hat er gleichzeitig gesteuert?** Ein Architekt, der nur innerhalb eines Partners gearbeitet hat, kennt die Konflikte zwischen Partnern nicht aus eigener Anschauung.
- **Wo sagt er Nein?** Fragen Sie nach einer Rolle, die er abgelehnt hat. Ich nehme zum Beispiel keine reinen Admin- oder Entwicklerrollen an und keine Rollen, in denen die Architektur schon feststeht und nur noch abgenommen werden soll.
- **Wie regelt er Ausfälle?** Eine Vertretung durch Kollegen gibt es bei einem Freelancer nicht. Was es geben muss: dokumentierte Standards, ein Entscheidungslog und einen internen Kollegen, der Reviews und Calls übernehmen kann. In einem Programm lief anfangs jeder Pull Request über meinen Schreibtisch, als der Prozess stabil lief, habe ich ihn an einen internen Kollegen übergeben.
- **Wer ist Vertragspartner?** Bei mir ist das die FK Solution Design GmbH, abgerechnet wird monatlich nach Aufwand. Viele Kunden beauftragen über einen Personaldienstleister, auch das ist möglich.

## Aufschreiben, welche Rolle fehlt

Schreiben Sie zuerst auf, welche Rolle fehlt: Kapazität, die baut, oder Kontrolle, die entscheidet. Fehlt Kapazität, suchen Sie einen Partner, und kein Freelancer-Portal löst das Problem. Fehlt Kontrolle, weil ein Partner seine eigene Arbeit prüft oder mehrere Partner nach eigenen Regeln bauen, holen Sie sich einen Architekten auf Ihre Seite, bevor die nächste Ausschreibung rausgeht. Wie ich diese Rolle ausfülle, steht auf der Seite [Freiberuflicher Salesforce Architect](../../freiberuflicher-salesforce-architect/) und unter [Partnersteuerung](../../leistungen/partnersteuerung/).
