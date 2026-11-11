---
title: "KI-Nutzen im Salesforce-Projekt messen"
description: "Macht KI Ihr Salesforce-Programm wirklich schneller? Was METR, DORA und McKinsey zeigen, welche Kennzahlen zählen und warum die Basislinie zuerst kommt."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: ki-nutzen-salesforce-projekt-messen
translationKey: measuring-ai-benefit-salesforce-projects
topic: governance
categories: [architecture, ai]
tags: [KI-Coding, Produktivität, DORA-Metriken, Programmsteuerung, Salesforce DevOps]
takeaways:
  - "In der METR-Studie brauchten erfahrene Entwickler mit KI 19 Prozent länger und hielten sich hinterher für 20 Prozent schneller."
  - "Bei DORA 2025 geht mehr KI-Nutzung mit mehr Durchsatz, aber weiterhin mit geringerer Stabilität einher: KI verstärkt, was ein Team schon hat."
  - "In einer McKinsey-Umfrage meldeten Führungskräfte 11,8 Prozent Zeitersparnis, aber nur 6,2 Prozent weniger Nacharbeit; 30 Prozent sahen sinkende Produktivität."
  - "Auch wenn KI das Programmieren beschleunigt, wird ein Salesforce-Programm nur schneller, wenn Review, Test und Abnahme mithalten."
faq:
  - q: "Wie messe ich, ob KI-Coding mein Salesforce-Projekt beschleunigt?"
    a: "Erfassen Sie vor Einführung der Werkzeuge Durchlaufzeit pro Story, Fehlerdurchschlupf, Nacharbeit und Change Fail Rate über mindestens einen vollständigen Release-Zyklus hinweg und mit ausreichend vielen Stories je Story-Art. Vergleichen Sie danach dieselben Arten von Stories, am besten mit einem Team, das später startet. Eindrücke der Entwickler und Nutzungszahlen belegen keine schnellere Lieferung, denn METR hat fast 40 Prozentpunkte Abstand zwischen gefühlter und gemessener Geschwindigkeit gefunden."
  - q: "Macht KI Salesforce-Entwickler schneller?"
    a: "Das hängt vom Umfeld ab. GitHub hat bei einer kleinen, neuen JavaScript-Aufgabe 55 Prozent Zeitgewinn gemessen, METR bei erfahrenen Entwicklern in großen bestehenden Codebasen 19 Prozent Zeitverlust. Eine Salesforce-Org mit Jahren an Triggern, Flows und Schnittstellen hat mehr mit dem METR-Umfeld gemeinsam, deshalb sollten Sie den Gewinn messen statt annehmen."
  - q: "Welche Kennzahlen taugen nicht, um KI-Produktivität zu bewerten?"
    a: "Codezeilen, der Anteil KI-generierten Codes, Lizenzzahlen, aktive Nutzer und Prompt-Volumen. McKinsey weist darauf hin, dass sie nur zeigen, ob die Werkzeuge benutzt werden, nicht aber, ob Releases schneller oder zuverlässiger werden. Ergebniskennzahlen wie Qualität, Tempo und Produktivität sagen mehr."
  - q: "Was sind die DORA-Metriken?"
    a: "DORA nutzt derzeit fünf Kennzahlen: Change Lead Time, Deployment-Häufigkeit und Wiederherstellungszeit nach fehlgeschlagenem Deployment als Kennzahlen für den Durchsatz sowie Change Fail Rate und Deployment Rework Rate als Kennzahlen für die Instabilität. Die Rework Rate wurde 2024 ergänzt."
draft: false
---

Den KI-Nutzen im Salesforce-Projekt messen Sie mit Ergebniskennzahlen im Vergleich mit Ihrer eigenen Basislinie: Durchlaufzeit pro Story, Fehlerdurchschlupf, Nacharbeit und Change Fail Rate, erfasst, bevor der erste Coding-Agent eingesetzt wird. Eindrücke der Entwickler und Lizenzzahlen belegen keine schnellere Lieferung. Die Studien unten reichen von 55 Prozent schneller bis 19 Prozent langsamer, je nach Aufgabe und Codebasis. Eine gewachsene Org mit über Jahre entstandenen Triggern, Flows und einer SAP-Schnittstelle liegt am schwierigen Ende dieser Spanne. Ob KI Ihr Programm schneller macht, beantwortet deshalb nur eine Zahl, die Sie selbst erhoben haben.

## Was sagen die Studien zur Produktivität mit KI-Coding?

Fünf oft zitierte Veröffentlichungen zeigen, wie stark das Ergebnis von Aufgabe, Personen und Messmethode abhängt.

- **GitHub, 2022.** In einem [kontrollierten Experiment](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/) schrieben 95 Entwickler einen HTTP-Server in JavaScript. Die Gruppe mit Copilot brauchte rund 1 Stunde 11 Minuten, die Kontrollgruppe 2 Stunden 41 Minuten: 55 Prozent schneller. Es handelte sich um eine kleine, neue, klar umrissene Aufgabe.
- **METR, 2025.** In einer [randomisierten Studie](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) bearbeiteten 16 erfahrene Open-Source-Entwickler 246 echte Issues in ihren eigenen Projekten mit im Schnitt über einer Million Codezeilen. Mit KI brauchten sie 19 Prozent länger. Vorher erwarteten sie 24 Prozent Beschleunigung, hinterher glaubten sie immer noch, KI habe sie 20 Prozent schneller gemacht.
- **METR, Februar 2026.** Im [Update](https://metr.org/blog/2026-02-24-uplift-update/) schreibt METR, Heutige Werkzeuge würden Entwickler wahrscheinlich stärker beschleunigen, die Daten lieferten aber nur sehr schwache Hinweise darauf, wie groß diese Beschleunigung ist. Ein Grund: Es ist schwieriger geworden, Entwickler für die Studie zu gewinnen, und 30 bis 50 Prozent von ihnen gaben an, manche Aufgaben nicht eingereicht zu haben, weil sie diese nicht ohne KI erledigen wollten.
- **DORA, 2025.** Für den [State of AI-assisted Software Development](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) wurden fast 5.000 Fachleute befragt. 90 Prozent nutzen KI bei der Arbeit, mehr als 80 Prozent glauben, dass sie produktiver geworden sind. Mehr KI-Nutzung hängt inzwischen statistisch mit höherem Durchsatz zusammen, aber weiterhin mit geringerer Stabilität der Auslieferung. DORA fasst es so zusammen: KI repariert kein Team, sie verstärkt, was schon da ist.
- **McKinsey, August 2026.** Eine [Umfrage unter 334 Produkt- und Engineering-Verantwortlichen](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) ergab im Schnitt 11,8 Prozent gemeldete Zeitersparnis über den Entwicklungszyklus, aber nur 6,2 Prozent weniger Nacharbeit, und 30 Prozent sagten, die Produktivität im Team sei gesunken. In einer separaten Umfrage unter 198 Entwicklern meldeten rund 80 Prozent etwa 3 Prozent Gewinn, die besten 20 Prozent etwa 55 Prozent. Alle diese Zahlen sind Selbstauskünfte.

```kennzahlen
55 % | weniger Zeit mit Copilot bei einer kleinen, neuen JavaScript-Aufgabe (GitHub 2022)
19 % | mehr Zeit mit KI für erfahrene Entwickler in ihrer eigenen großen Codebasis (METR 2025)
20 % | Zeitgewinn, den dieselben Entwickler hinterher trotzdem vermuteten (METR 2025)
11,8 % | durchschnittlich gemeldete Zeitersparnis über den Entwicklungszyklus (McKinsey 2026)
quelle: GitHub, kontrolliertes Experiment 2022; METR, randomisierte Studie Juli 2025; McKinsey, Umfrage unter 334 Verantwortlichen, August 2026
```

Meine Lesart: Die Beschleunigung ist bei manchen Personen und manchen Aufgaben real, der Durchschnitt ist aber deutlich kleiner als auf den Folien der Anbieter. DORA hat 2026 einen Bericht zum [ROI von KI-gestützter Softwareentwicklung](https://dora.dev/ai/roi) nachgelegt, der auch den Produktivitätseinbruch zu Beginn einer Einführung behandelt. Die Wahrnehmungslücke aus der METR-Studie würde ich jedem Lenkungsausschuss zeigen. Wenn sich diejenigen, die die Arbeit ausführen, bei der eigenen Geschwindigkeit um fast 40 Prozentpunkte verschätzen, ist die Aussage eines Partners, „wir sind 30 Prozent schneller“, eine Behauptung, bis sie gemessen ist.

## Warum ähnelt eine Salesforce-Org eher METR als GitHub?

Eine Org, die ein Hersteller fünf oder mehr Jahre betrieben hat, ist eine große bestehende Codebasis mit viel implizitem Wissen. Dazu gehören Garantielogik in Apex, ein Händlerportal auf Experience Cloud, Field Service (heute Agentforce Field Service and Operations) mit Ersatzteilreservierung, Auftragsdaten aus SAP oder proALPHA über eine Middleware sowie ein oder zwei Managed Packages. Ein Agent, der einen neuen Trigger auf Case schreibt, muss die vier Automatisierungen kennen, die dort bereits aktiv sind. Das liegt viel näher am METR-Umfeld als an dem von GitHub. Identisch ist das Umfeld nicht, weil eine Org Code mit Metadaten, Konfiguration und Flows mischt. METR ist deshalb eine Warnung vor angenommenen Gewinnen, kein Salesforce-Benchmark.

Der zweite Grund ist, wo die Zeit bleibt. Nach meiner Einschätzung ist das Programmieren in einem typischen Salesforce-Programm der kleinere Teil der Durchlaufzeit einer Story. Der größere Teil ist Warten: auf ein Review, auf eine freie Sandbox, auf den Test der Serviceleitung in UAT, auf das nächste Release-Fenster. Wenn KI den Entwicklungsschritt verkürzt, sinkt die Durchlaufzeit nur, wenn Review, Test und UAT den zusätzlichen Durchsatz bewältigen können. Ändert sich sonst nichts, wartet die Story im nächsten Prozessschritt länger. Dazu passt McKinseys Befund, dass Unternehmen, die ihre Abläufe vor der KI-Einführung umgebaut haben, mehr als doppelt so oft Gewinne über 20 Prozent melden.

## Welche Kennzahlen zeigen, ob KI Ihr Salesforce-Programm beschleunigt?

Ich würde fünf Zahlen verfolgen, getrennt nach Art der Story (Konfiguration, Apex, Schnittstelle) und nach neuer oder geänderter Komponente, weil KI bei einer Flow-Änderung ganz anders hilft als bei einer SAP-Schnittstelle.

1. **Durchlaufzeit pro Story**, von „bereit zur Entwicklung“ bis Produktion, aufgeteilt in Bauen, Warten auf Review, Test und Warten auf UAT. Erst die Aufteilung zeigt, wo die Zeit geblieben ist.
2. **Fehlerdurchschlupf** (Defect Escape Rate): Fehler in einem festen Zeitraum nach dem Release, etwa 60 Tage, geteilt durch alle Fehler zu diesen Stories. Daran sehen Sie, ob höheres Tempo zulasten der Qualität geht.
3. **Nacharbeitsanteil**: Anteil der Stories, die nach „fertig“ wieder geöffnet werden. Berichten Sie ihn getrennt von dem, was DORA Deployment Rework Rate nennt, dem Anteil der Deployments für ungeplante Fehlerbehebung.
4. **Change Fail Rate und Change Lead Time.** Zwei der fünf [DORA-Metriken](https://dora.dev/guides/dora-metrics/history/). DORA misst die Change Lead Time vom Commit bis zur Produktion, sie ist also nicht die Story-Durchlaufzeit aus Punkt 1. Im eigenen Programm stammen beide aus Versionsverwaltung, Deployment- und Incident-Daten, nicht aus einer Umfrage; eine Open-Source-Option, die sie ausweist, beschreibe ich in [sfdx-hardis als Einstieg in Salesforce DevOps](../sfdx-hardis-einfuehrung-salesforce-devops/).
5. **Größe der Pull Requests und Wartezeit im Review.** KI senkt den Aufwand für große Änderungen. DORA zählt [Arbeiten in kleinen Paketen](https://dora.dev/capabilities/) zu den sieben Fähigkeiten, die den Nutzen von KI verstärken, und ich erwarte, dass genau diese Disziplin als Erstes nachlässt, wenn Agenten den Code schreiben.

Für den Lenkungsausschuss würde ich eine wirtschaftliche Sicht ergänzen: abgenommener Umfang pro Euro Lieferkosten. Als Erfolgsmaß weglassen würde ich Codezeilen, den Anteil KI-generierten Codes, Lizenzen und Prompt-Volumen. McKinsey weist darauf hin, dass Nutzungskennzahlen nur zeigen, ob die Werkzeuge benutzt werden, nicht aber, ob Releases schneller oder zuverlässiger werden; 86 Prozent der Spitzenreiter in der Umfrage messen stattdessen Ergebnisse. Token-Kosten pro Story sind für das Budget nützlich; mehr dazu steht in [was KI-Coding im Salesforce-Projekt kostet](../ki-coding-kosten-salesforce-projekt/).

## Rechenbeispiel: zwei Zahlen, zwei Geschichten

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud und Field Service, einer SAP-Anbindung über Middleware und zwei Umsetzungspartnern mit insgesamt acht Entwicklern. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen. Partner A schlägt Coding-Agenten vor und verspricht „rund 30 Prozent schneller“.

Die Programmleitung wertet zuerst drei Monate Historie aus Jira und Git aus. Angenommen werden rund 40 Stories im Monat und ein Median der Durchlaufzeit von 18 Arbeitstagen: 4 Tage Bauen, 3 Tage Warten auf Review, 6 Tage Warten auf die UAT-Abnahme durch den Service und 5 Tage für Test und Release-Fenster. Der Fehlerdurchschlupf liegt bei 12 Prozent, die Nacharbeit bei 8 Prozent.

Nach drei Monaten mit Agenten sinkt der Bauschritt im Beispiel von 4 auf 2,5 Tage. Diese Einsparung von gut einem Drittel nehmen die Entwickler wahr. Die Pull Requests sind aber doppelt so groß geworden, also steigt die Review-Wartezeit von 3 auf 4 Tage. Die Wartezeit auf die UAT-Abnahme bleibt bei 6 Tagen, weil das Serviceteam zweimal pro Woche testet. Die Durchlaufzeit sinkt von 18 auf 17,5 Tage, weniger als 3 Prozent. Die Nacharbeit steigt von 8 auf 11 Prozent.

Beide Zahlen stimmen. Das Programmieren ist schneller, das Gesamtprogramm kaum. Nützlich ist die Erkenntnis, wo Sie ansetzen: kleinere Pull Requests mit automatischen Prüfungen, feste tägliche UAT-Termine mit der Serviceleitung und ein Reviewer auf Kundenseite, der dafür eingeplant ist. Ohne Basislinie hätte der Lenkungsausschuss nur die 30 Prozent gehört.

## Den Status-Workflow aufräumen, bevor die Werkzeuge kommen

Fangen Sie an, bevor die Werkzeuge eingeführt werden, denn eine Basislinie lässt sich nicht aus dem Gedächtnis rekonstruieren.

```schritte
Status-Workflow aufräumen
  In Jira oder Azure DevOps, sodass „bereit“, „im Review“, „in UAT“ und „fertig“ Zeitstempel haben. Vorhandene Historie zählt nur, wenn die alten Status zu den neuen Definitionen passen.
Definitionen festlegen
  Mit allen Partnern: wann die Durchlaufzeit beginnt, was als durchgerutschter Fehler zählt, was als Nacharbeit. Das gehört ins Governance-Modell, nicht in den Bericht jedes einzelnen Partners.
KI-Pull-Requests kennzeichnen
  Mit einer kleinen Einteilung statt Ja oder Nein: welches Werkzeug und ob es Code ergänzt, Tests erzeugt oder als Agent gearbeitet hat. Damit Sie Gleiches mit Gleichem vergleichen. Die Offenlegung von KI-Nutzung ist ein Vertragsthema, siehe [Regeln für Partner mit KI-Coding](../partner-ki-coding-regeln-vertrag/).
Monatlich als Trend berichten
  Mit Medianen und der Zahl der Stories dahinter, nie als Rangliste von Teams oder Partnern. Ein Vorher-nachher-Vergleich zeigt einen Trend, keine Ursache; starten Teams zu verschiedenen Zeiten mit den Werkzeugen, vergleichen Sie sie. Wer gerankt wird, optimiert die Zahl.
Prüftermin vereinbaren
  Etwa nach drei Monaten, und dann entscheiden, ob sich Setup, Prozess oder Vertragsmodell ändern. Liefert ein Partner wirklich schneller, sollte sich das wirtschaftlich zeigen: als niedrigerer Preis, mehr abgenommener Umfang oder kürzere Durchlaufzeit. Das ist die Frage hinter [Festpreis statt Aufwand](../festpreis-statt-aufwand-ki-salesforce/).
```

Für den ersten Bericht genügen Durchlaufzeit und Nacharbeit, die übrigen Zahlen folgen, sobald die Definitionen stehen. So setze ich [Projektsteuerung für Salesforce-Programme](../../leistungen/projektsteuerung-nearshore/) auf; sie setzt eine funktionierende Pipeline voraus, wie in [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/) beschrieben.
