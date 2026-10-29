---
title: "KI-Nutzen im Salesforce-Projekt messen"
description: "Macht KI Ihr Salesforce-Programm wirklich schneller? Was METR, DORA und McKinsey zeigen, welche Kennzahlen zählen und warum die Basislinie zuerst kommt."
pubDate: 2026-10-27
lang: de
slug: ki-nutzen-salesforce-projekt-messen
translationKey: measuring-ai-benefit-salesforce-projects
topic: governance
categories: [architecture, ai]
tags: [KI-Coding, Produktivität, DORA-Metriken, Programmsteuerung, Salesforce DevOps]
takeaways:
  - "Den KI-Nutzen im Salesforce-Programm messen Sie mit Durchlaufzeit pro Story, Fehlerdurchschlupf, Nacharbeit und Change Fail Rate gegen die eigene Basislinie, nie mit Selbstauskünften der Entwickler."
  - "In der METR-Studie brauchten erfahrene Entwickler mit KI in ihren eigenen großen Codebasen 19 Prozent länger und glaubten hinterher trotzdem, KI habe sie 20 Prozent schneller gemacht."
  - "DORA 2025 zeigt: Mehr KI-Nutzung geht mit höherem Durchsatz, aber weiter mit geringerer Stabilität der Auslieferung einher. KI verstärkt die Stärken und Schwächen, die ein Team schon hat."
  - "Laut McKinsey-Umfrage 2026 sparen Teams im Schnitt 11,8 Prozent Zeit, aber nur 6,2 Prozent Nacharbeit, und 30 Prozent der Führungskräfte melden sinkende Produktivität."
  - "Schnelleres Programmieren verkürzt ein Salesforce-Programm nur, wenn Review, Test und Abnahme durch die Fachbereiche mithalten; sonst wandert die Warteschlange nur weiter."
faq:
  - q: "Wie messe ich, ob KI-Coding mein Salesforce-Projekt beschleunigt?"
    a: "Erfassen Sie zwei bis drei Monate vor Einführung der Werkzeuge Durchlaufzeit pro Story, Fehlerdurchschlupf, Nacharbeit und Change Fail Rate. Vergleichen Sie danach dieselben Arten von Stories. Eindrücke der Entwickler und Nutzungszahlen sind kein Beleg, denn METR hat fast 40 Punkte Abstand zwischen gefühlter und gemessener Geschwindigkeit gefunden."
  - q: "Macht KI Salesforce-Entwickler schneller?"
    a: "Das hängt vom Umfeld ab. GitHub hat bei einer kleinen, neuen JavaScript-Aufgabe 55 Prozent Zeitgewinn gemessen, METR bei erfahrenen Entwicklern in großen bestehenden Codebasen 19 Prozent Zeitverlust. Eine Salesforce-Org mit Jahren an Triggern, Flows und Schnittstellen liegt näher an METR, deshalb sollten Sie den Gewinn messen statt annehmen."
  - q: "Welche Kennzahlen taugen nicht, um KI-Produktivität zu bewerten?"
    a: "Codezeilen, der Anteil KI-generierten Codes, Lizenzzahlen, aktive Nutzer und Prompt-Volumen. McKinsey weist darauf hin, dass sie nur zeigen, ob die Werkzeuge benutzt werden, nicht ob Releases schneller oder zuverlässiger werden. Ergebniskennzahlen wie Qualität, Tempo und Produktivität sagen mehr."
  - q: "Was sind die DORA-Metriken?"
    a: "DORA nutzt derzeit fünf Kennzahlen: Change Lead Time, Deployment-Häufigkeit und Wiederherstellungszeit nach fehlgeschlagenem Deployment für den Durchsatz, Change Fail Rate und Deployment Rework Rate für die Instabilität. Die Rework Rate kam 2024 dazu."
draft: false
---

Den KI-Nutzen im Salesforce-Projekt messen Sie mit Ergebniskennzahlen gegen Ihre eigene Basislinie: Durchlaufzeit pro Story, Fehlerdurchschlupf, Nacharbeit und Change Fail Rate, erfasst bevor der erste Coding-Agent kommt. Eindrücke der Entwickler und Lizenzzahlen beweisen nichts. Die veröffentlichten Studien reichen von 55 Prozent schneller bis 19 Prozent langsamer, je nach Aufgabe und Codebasis. Eine gewachsene Org mit Jahren an Triggern, Flows und SAP-Schnittstelle liegt am schwierigen Ende dieser Spanne. Die ehrliche Antwort auf „Macht KI unser Programm schneller?“ ist deshalb eine Zahl, die Sie selbst erhoben haben.

## Was sagen die Studien zur Produktivität mit KI-Coding?

Fünf Quellen tauchen in jeder Diskussion auf, und sie messen sehr Unterschiedliches.

- **GitHub, 2022.** In einem [kontrollierten Experiment](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/) schrieben 95 Entwickler einen HTTP-Server in JavaScript. Die Gruppe mit Copilot brauchte rund 1 Stunde 11 Minuten, die Kontrollgruppe 2 Stunden 41 Minuten: 55 Prozent schneller. Eine kleine, neue, klar umrissene Aufgabe.
- **METR, 2025.** In einer [randomisierten Studie](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) bearbeiteten 16 erfahrene Open-Source-Entwickler 246 echte Issues in ihren eigenen Projekten mit im Schnitt über einer Million Codezeilen. Mit KI brauchten sie 19 Prozent länger. Vorher erwarteten sie 24 Prozent Beschleunigung, hinterher glaubten sie immer noch, KI habe sie 20 Prozent schneller gemacht.
- **METR, Februar 2026.** Im [Update](https://metr.org/blog/2026-02-24-uplift-update/) schreibt METR, Entwickler würden mit heutigen Werkzeugen wahrscheinlich stärker beschleunigt, die Daten seien aber „only very weak evidence for the size of this increase“. Ein Grund: Mehr Entwickler wollten gar nicht mehr ohne KI arbeiten, und 30 bis 50 Prozent gaben an, Aufgaben zurückgehalten zu haben, die sie nicht ohne KI erledigen wollten.
- **DORA, 2025.** Für den [State of AI-assisted Software Development](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) wurden fast 5.000 Fachleute befragt. 90 Prozent nutzen KI im Job, mehr als 80 Prozent glauben, dass sie produktiver geworden sind. Mehr KI-Nutzung geht inzwischen mit höherem Durchsatz einher, aber weiterhin mit geringerer Stabilität der Auslieferung. DORA fasst es so zusammen: „AI doesn't fix a team; it amplifies what's already there.“
- **McKinsey, August 2026.** Eine [Umfrage unter 334 Produkt- und Engineering-Verantwortlichen](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) ergab im Schnitt 11,8 Prozent Zeitersparnis über den Entwicklungszyklus, aber nur 6,2 Prozent weniger Nacharbeit. 30 Prozent meldeten sinkende Produktivität im Team. Rund 80 Prozent der Entwickler gewannen etwa 3 Prozent, die besten 20 Prozent etwa 55 Prozent.

```kennzahlen
55 % | weniger Zeit mit Copilot bei einer kleinen, neuen JavaScript-Aufgabe (GitHub 2022)
19 % | mehr Zeit mit KI für erfahrene Entwickler in ihrer eigenen großen Codebasis (METR 2025)
20 % | Zeitgewinn, den dieselben Entwickler hinterher trotzdem vermuteten (METR 2025)
11,8 % | durchschnittliche Zeitersparnis über den Entwicklungszyklus (McKinsey 2026)
quelle: GitHub, kontrolliertes Experiment 2022; METR, randomisierte Studie Juli 2025; McKinsey, Umfrage unter 334 Verantwortlichen, August 2026
```

Meine Lesart: Die Beschleunigung ist für manche Personen und manche Aufgaben echt, der Durchschnitt aber deutlich kleiner als auf den Folien der Anbieter. Die Wahrnehmungslücke aus der METR-Studie würde ich jedem Lenkungsausschuss zeigen. Wenn sich die Leute, die die Arbeit machen, bei der eigenen Geschwindigkeit um fast 40 Punkte verschätzen, ist das „wir sind 30 Prozent schneller“ eines Partners eine Meinung.

## Warum ähnelt eine Salesforce-Org eher METR als GitHub?

Die Org eines Herstellers nach fünf oder mehr Jahren ist eine große bestehende Codebasis mit viel implizitem Wissen. Garantielogik in Apex, ein Händlerportal auf Experience Cloud, Field Service für den Außendienst mit Ersatzteilreservierung, Auftragsdaten aus SAP oder proALPHA über eine Middleware, dazu ein oder zwei Managed Packages. Ein Agent, der einen neuen Trigger auf Case schreibt, muss die vier Automatisierungen kennen, die dort schon laufen. Das ist das METR-Umfeld, nicht das von GitHub.

Der zweite Grund ist, wo die Zeit hingeht. Nach meiner Einschätzung ist das Programmieren in einem typischen Salesforce-Programm der kleinere Teil der Durchlaufzeit einer Story. Der größere Teil ist Warten: auf ein Review, auf eine freie Sandbox, auf den Test der Serviceleitung in UAT, auf das nächste Release-Fenster. KI verkürzt den Bauschritt. Ändert sich sonst nichts, wartet die Story an der nächsten Stelle länger. Dazu passt McKinseys Befund, dass Unternehmen, die ihre Abläufe vor der KI-Einführung umgebaut haben, mehr als doppelt so oft Gewinne über 20 Prozent melden.

## Welche Kennzahlen zeigen, ob KI Ihr Salesforce-Programm beschleunigt?

Ich würde fünf Zahlen verfolgen, getrennt nach Art der Story (Konfiguration, Apex, Schnittstelle), weil KI bei einer Flow-Änderung ganz anders hilft als bei einer SAP-Schnittstelle.

1. **Durchlaufzeit pro Story**, von „bereit zur Entwicklung“ bis Produktion, aufgeteilt in Bauen, Warten auf Review, Test und Warten auf UAT. Erst die Aufteilung zeigt, wo die Zeit geblieben ist.
2. **Fehlerdurchschlupf** (Defect Escape Rate): Fehler nach dem Release geteilt durch alle Fehler zu diesen Stories. Daran sehen Sie, ob Tempo mit Qualität bezahlt wird.
3. **Nacharbeit**: Stories, die nach „fertig“ wieder geöffnet werden, plus das, was DORA Deployment Rework Rate nennt, den Anteil der Deployments, die ungeplant Fehler beheben.
4. **Change Fail Rate und Change Lead Time.** Zwei der fünf [DORA-Metriken](https://dora.dev/guides/dora-metrics/history/). Sie kommen aus der Pipeline, nicht aus einer Umfrage; eine Open-Source-Option, die sie ausweist, beschreibe ich in [sfdx-hardis als Einstieg in Salesforce DevOps](../sfdx-hardis-einfuehrung-salesforce-devops/).
5. **Größe der Pull Requests und Wartezeit im Review.** KI macht große Änderungen billig. DORA zählt [Arbeiten in kleinen Paketen](https://dora.dev/capabilities/) zu den sieben Fähigkeiten, die den Nutzen von KI verstärken, und ich erwarte, dass genau diese Disziplin als Erstes nachlässt, wenn Agenten den Code schreiben.

Als Erfolgsmaß weglassen würde ich Codezeilen, den Anteil KI-generierten Codes, Lizenzen und Prompt-Volumen. McKinsey weist darauf hin, dass Nutzungskennzahlen nur zeigen, ob die Werkzeuge benutzt werden, nicht ob Releases schneller oder zuverlässiger werden, und 86 Prozent der Spitzenreiter in der Umfrage messen stattdessen Ergebnisse. Token-Kosten pro Story sind für das Budget nützlich, dazu mehr in [was KI-Coding im Salesforce-Projekt kostet](../ki-coding-kosten-salesforce-projekt/).

## Ein typisches Szenario: zwei Zahlen, zwei Geschichten

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud und Field Service, einer SAP-Anbindung über Middleware und zwei Umsetzungspartnern mit zusammen acht Entwicklern. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen. Partner A schlägt Coding-Agenten vor und verspricht „rund 30 Prozent schneller“.

Die Programmleitung zieht zuerst drei Monate Historie aus Jira und Git. Angenommen sind rund 40 Stories im Monat und eine mittlere Durchlaufzeit von 18 Arbeitstagen: 4 Tage Bauen, 3 Tage Warten auf Review, 6 Tage Warten auf die UAT-Abnahme durch den Service und 5 Tage für Test und Release-Fenster. Fehlerdurchschlupf 12 Prozent, Nacharbeit 8 Prozent.

Nach drei Monaten mit Agenten sinkt der Bauschritt angenommen von 4 auf 2,5 Tage. Das ist das gute Drittel, das die Entwickler spüren. Die Pull Requests sind aber doppelt so groß geworden, also steigt die Review-Wartezeit von 3 auf 4 Tage. UAT wartet weiter 6 Tage, weil das Serviceteam zweimal pro Woche testet. Die Durchlaufzeit sinkt von 18 auf 17,5 Tage, weniger als 3 Prozent. Die Nacharbeit steigt von 8 auf 11 Prozent.

Beide Zahlen stimmen. Das Programmieren ist schneller, das Programm kaum. Nützlich ist die Erkenntnis, wo Sie ansetzen: kleinere Pull Requests mit automatischen Prüfungen, feste tägliche UAT-Termine mit der Serviceleitung und ein Reviewer auf Kundenseite, der dafür eingeplant ist. Ohne Basislinie hätte der Lenkungsausschuss nur die 30 Prozent gehört.

## Wo fangen Sie an?

Fangen Sie an, bevor die Werkzeuge kommen, denn eine Basislinie lässt sich nicht aus dem Gedächtnis rekonstruieren.

```schritte
Status-Workflow aufräumen
  In Jira oder Azure DevOps, sodass „bereit“, „im Review“, „in UAT“ und „fertig“ Zeitstempel haben. Die meisten Programme haben schon drei Monate brauchbare Historie.
Definitionen festlegen
  Mit allen Partnern: wann die Durchlaufzeit beginnt, was als durchgerutschter Fehler zählt, was als Nacharbeit. Das gehört ins Governance-Modell, nicht in den Bericht jedes einzelnen Partners.
KI-Pull-Requests kennzeichnen
  Damit Sie Gleiches mit Gleichem vergleichen. Die Offenlegung von KI-Nutzung ist ein Vertragsthema, siehe [Regeln für Partner mit KI-Coding](../partner-ki-coding-regeln-vertrag/).
Monatlich als Trend berichten
  Nie als Rangliste von Teams oder Partnern. Wer gerankt wird, optimiert die Zahl.
Prüftermin vereinbaren
  Etwa nach drei Monaten, und dann entscheiden, ob sich Setup, Prozess oder Vertragsmodell ändern. Liefert ein Partner wirklich schneller, sollte sich das im Preis zeigen. Das ist die Frage hinter [Festpreis statt Aufwand](../festpreis-statt-aufwand-ki-salesforce/).
```

So setze ich [Projektsteuerung für Salesforce-Programme](../../leistungen/projektsteuerung-nearshore/) auf, und das Ganze steht auf einer funktionierenden Pipeline, wie in [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/) beschrieben.

Messen Sie den KI-Nutzen wie jede andere Investition: erst die Basislinie, dann wenige Ergebniszahlen und ein fester Entscheidungstermin.
