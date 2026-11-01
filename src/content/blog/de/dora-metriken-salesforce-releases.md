---
title: "DORA-Metriken für Salesforce: Werden Releases besser?"
description: "Mit welchen DORA-Metriken die IT-Leitung sieht, ob Salesforce-Releases schneller und stabiler werden, woher die Zahlen kommen und welche Fallen es gibt."
pubDate: 2026-10-29
lang: de
slug: dora-metriken-salesforce-releases
translationKey: dora-metrics-salesforce-releases
topic: release
categories: [devops]
tags: [DORA-Metriken, Release-Management, DevOps, Kennzahlen]
takeaways:
  - "DORA-Metriken messen Durchlaufzeit, Deployment-Häufigkeit, Wiederherstellungszeit, Fehlerquote und Nacharbeitsquote von Änderungen bis in Produktion."
  - "Für die IT-Leitung zählt der Trend über mehrere Monate, nicht der einzelne Wert und nicht der Vergleich mit Softwarefirmen."
  - "In Salesforce kommen die Zahlen aus Git und der Pipeline. Änderungen direkt in Produktion fehlen darin, deshalb gehört der Setup Audit Trail mit in den Blick."
  - "Die Metriken taugen, um den Release-Prozess zu verbessern, nicht als Rangliste der Partner. Wer Partner daran misst, bekommt geschönte Zahlen."
faq:
  - q: "Was sind DORA-Metriken?"
    a: "DORA-Metriken sind Kennzahlen aus der Forschung des DevOps Research and Assessment Programms. Sie messen, wie schnell Änderungen in Produktion kommen und wie oft sie Probleme verursachen."
  - q: "Wie viele DORA-Metriken gibt es?"
    a: "Lange waren es vier: Deployment-Häufigkeit, Durchlaufzeit von Änderungen, Fehlerquote und Wiederherstellungszeit. 2024 kam die Nacharbeitsquote dazu, der Anteil ungeplanter Deployments zur Fehlerbehebung."
  - q: "Kann man DORA-Metriken in Salesforce messen?"
    a: "Ja, wenn Änderungen über Git und eine Pipeline laufen. Tools wie sfdx-hardis liefern einen Bericht über die Kennzahlen; ohne Pipeline gibt es keine verlässliche Datengrundlage."
  - q: "Welche DORA-Metrik ist für Salesforce-Programme am wichtigsten?"
    a: "Für den Lenkungsausschuss meist die Fehlerquote, weil sie zeigt, wie oft ein Release den Betrieb stört. Für das Team die Durchlaufzeit, weil sie zeigt, wo Arbeit wartet."
draft: false
---

DORA-Metriken zeigen der IT-Leitung, ob Salesforce-Releases schneller und stabiler werden. Sie messen, wie lange eine Änderung bis in Produktion braucht, wie oft deployt wird, wie oft ein Deployment Probleme macht und wie schnell sie behoben sind. In Salesforce kommen die Zahlen aus Git und der Pipeline, Werkzeuge wie sfdx-hardis berichten sie direkt. Entscheidend ist der Trend über mehrere Monate. Ich nutze die Metriken, um den Release-Prozess zu verbessern, nicht um Partner gegeneinander zu messen. Wer das tut, bekommt geschönte Zahlen.

## Was sind DORA-Metriken?

DORA steht für DevOps Research and Assessment, ein Forschungsprogramm, das seit 2014 untersucht, was gute Softwareauslieferung ausmacht. Die Kennzahlen sind heute in zwei Gruppen eingeteilt ([dora.dev: History of DORA's software delivery metrics](https://dora.dev/guides/dora-metrics/history/)):

| Kennzahl | Bedeutung | Gruppe |
|---|---|---|
| Durchlaufzeit von Änderungen | Zeit vom Commit bis zum erfolgreichen Deployment in Produktion | Durchsatz |
| Deployment-Häufigkeit | wie oft Änderungen in Produktion deployt werden | Durchsatz |
| Wiederherstellungszeit | Zeit, bis ein fehlgeschlagenes Deployment behoben ist | Durchsatz |
| Fehlerquote von Änderungen | Anteil der Deployments, die in Produktion Fehler verursachen | Stabilität |
| Nacharbeitsquote | Anteil der Deployments, die ungeplante Fehlerbehebung sind | Stabilität |

Die Nacharbeitsquote ist 2024 als fünfte Kennzahl dazugekommen. Viele Tools und Artikel sprechen deshalb noch von den vier DORA-Metriken.

Mir haben die Zahlen gefallen, als ich sie mir in sfdx-hardis zum ersten Mal angesehen habe, weil ein Lenkungsausschuss sie versteht. Niemand dort will wissen, wie viele Pull Requests gemergt wurden. Aber die Frage, ob ein Release seltener den Betrieb stört als vor einem halben Jahr, versteht jeder. Was ich im Training dazu gelernt habe, steht in [Was ich aus dem kostenlosen sfdx-hardis-Training lernte](../sfdx-hardis-kostenloses-devops-training/).

## Woher kommen die Zahlen in Salesforce?

Die Metriken brauchen eine Datenquelle, in der jede Änderung mit Zeitstempel steht. In Salesforce ist das nur dann verlässlich, wenn alle Änderungen über Git und eine Pipeline laufen:

- **Durchlaufzeit** aus Git: Zeitpunkt des Commits oder des Pull Requests und Zeitpunkt des Deployments in Produktion.
- **Deployment-Häufigkeit** aus den Läufen der Pipeline gegen die Produktions-Org.
- **Fehlerquote und Nacharbeitsquote** aus Hotfixes: Jeder Hotfix-Branch und jedes Rollback zeigt auf ein Deployment, das Probleme gemacht hat.
- **Wiederherstellungszeit** aus dem Ticketsystem: Zeit von der Störungsmeldung bis zum Deployment der Korrektur.

sfdx-hardis liefert dafür einen Bericht über die Kennzahlen, und auch kommerzielle DevOps-Tools für Salesforce bieten solche Auswertungen. Die Pipeline dafür setze ich auf der Plattform des Kunden auf, siehe [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

```hinweis achtung
Änderungen, die direkt in der Produktions-Org gemacht werden, tauchen in keiner Git-Statistik auf. Prüfen Sie deshalb regelmäßig den Setup Audit Trail. Stehen dort viele Änderungen von Nutzern außerhalb der Pipeline, sind die DORA-Zahlen zu gut, um wahr zu sein.
```

## Salesforce hat eigene Fallen, die die Zahlen verzerren

Salesforce-Programme haben ein paar Eigenheiten, die die Zahlen verzerren:

- **Feste Release-Termine.** Wird einmal im Monat deployt, besteht die Durchlaufzeit zum größten Teil aus Warten auf den nächsten Termin. Das ist eine Entscheidung des Programms und kein Problem der Entwickler. Die Zahl zeigt trotzdem, was diese Entscheidung kostet.
- **Manuelle Schritte.** Ein Deployment gilt als erfolgreich, aber danach muss jemand drei Flows von Hand aktivieren. Läuft das schief, ist es ein Fehler, der in keiner Statistik als fehlgeschlagenes Deployment auftaucht.
- **Daten statt Metadaten.** Produktkataloge, Preisregeln oder Konfiguratorregeln liegen in manchen Clouds als Datensätze vor. Werden sie von Hand geändert, fehlen sie in den Metriken.
- **Große Pakete.** Ein Release mit 200 Änderungen, das einen Fehler hat, zählt als ein fehlgeschlagenes Deployment. Kleinere Releases machen die Fehlerquote aussagekräftiger.

## Die IT-Leitung schaut auf den Trend, nicht auf den Einzelwert

Ich empfehle drei Regeln:

1. **Trend statt Einzelwert.** Ein Monat sagt wenig. Erst über drei bis sechs Monate sieht man, ob kleinere Releases, mehr Automatisierung oder Reviews wirken.
2. **Kein Vergleich mit Softwarefirmen.** Die Spitzenwerte aus den DORA-Berichten stammen von Teams, die mehrmals täglich deployen. Ein Hersteller mit monatlichem Salesforce-Release vergleicht sich mit sich selbst.
3. **Keine Rangliste der Partner.** Mit mehreren Partnern liegt es nahe, jeden Partner an seiner Fehlerquote zu messen. Dann werden Hotfixes umbenannt und Fehler als neue Anforderungen erfasst. Die Metriken gehören dem Programm, für die Qualität einzelner Lieferungen gibt es das [Pull-Request-Review](../warum-pull-request-reviews-pflicht-sind/).

```pro-contra
pro: DORA-Metriken im Lenkungsausschuss
- Zahlen, die ohne technisches Wissen verständlich sind
- Zeigen, ob Investitionen in den Release-Prozess wirken
- Kommen ohne Mehraufwand aus der Pipeline
contra: Was Sie beachten müssen
- Ohne Pipeline gibt es keine verlässliche Datengrundlage
- Direkte Änderungen in Produktion fehlen in den Zahlen
- Als Partnervergleich verlieren sie ihre Aussagekraft
```

## Welcher Hebel verbessert welche Zahl?

Die Metriken sind nur nützlich, wenn aus einer schlechten Zahl eine Maßnahme folgt. Diese Zuordnung passt für Salesforce-Programme, weil jeder Hebel im Release-Prozess selbst liegt und nicht im Budget für neue Tools:

- **Lange Durchlaufzeit:** Wo wartet die Änderung? Meist auf das Review, auf UAT oder auf den Release-Termin. Kleinere Pull Requests und vereinbarte Reaktionszeiten im Review helfen bei der ersten Ursache, ein kürzerer Release-Takt bei der letzten.
- **Niedrige Deployment-Häufigkeit:** Releases sind zu groß oder zu aufwendig. Automatisierte Post-Deployment-Schritte machen ein Release billiger und damit häufiger möglich.
- **Hohe Fehlerquote:** Fehler entkommen den Tests. Ein [UAT mit Testnutzern pro Rolle](../salesforce-uat-abnahmetest-fachbereich/) und Regressionstests für die wichtigsten Prozesse fangen die meisten ab.
- **Lange Wiederherstellungszeit:** Es gibt keinen schnellen Weg für Korrekturen. Eine Hotfix-Umgebung mit dem Stand der Produktion und ein eigener Hotfix-Branch verkürzen ihn.

Rechenbeispiel: Ein Programm mit zwölf Releases im Jahr, von denen vier einen Hotfix brauchten, hat eine Fehlerquote von 33 Prozent. Diese Zahl allein sagt dem Lenkungsausschuss mehr als eine Liste offener Tickets, und sie lässt sich nach jeder Maßnahme erneut prüfen.

## Erster Schritt: Deployment-Häufigkeit und Fehlerquote

Fangen Sie mit zwei Zahlen an: Deployment-Häufigkeit und Fehlerquote. Beide lassen sich aus der Pipeline und aus der Zahl der Hotfixes ablesen, auch wenn noch kein Tool sie automatisch berichtet. Legen Sie den heutigen Wert als Ausgangspunkt fest und berichten Sie den Trend einmal im Monat. Die Durchlaufzeit kommt dazu, sobald alle Änderungen über Pull Requests laufen. Als Hotfix zählt dabei jede Änderung, die außerhalb des geplanten Releases in Produktion geht, auch eine Korrektur direkt im Setup, die Sie nur im Setup Audit Trail finden.
