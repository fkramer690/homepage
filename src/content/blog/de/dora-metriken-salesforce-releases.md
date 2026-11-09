---
title: "DORA-Metriken für Salesforce: Werden Releases besser?"
description: "Mit welchen DORA-Metriken die IT-Leitung sieht, ob Salesforce-Releases schneller und stabiler werden, woher die Zahlen kommen und welche Fallen es gibt."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: de
slug: dora-metriken-salesforce-releases
translationKey: dora-metrics-salesforce-releases
topic: release
categories: [devops]
tags: [DORA-Metriken, Release-Management, DevOps, Kennzahlen]
takeaways:
  - "DORA-Metriken messen Durchlaufzeit, Deployment-Häufigkeit, Wiederherstellungszeit, Fehlerquote und Nacharbeitsquote von Änderungen bis in Produktion."
  - "Für die IT-Leitung zählt der Trend über mehrere Monate, nicht der einzelne Wert und nicht der Vergleich mit Softwarefirmen."
  - "In Salesforce kommen die Zahlen aus Git, der Pipeline und Störungsdaten. Änderungen direkt in Produktion fehlen, prüfen Sie deshalb auch den Setup Audit Trail."
  - "Die Metriken taugen, um den Release-Prozess zu verbessern, nicht als Rangliste der Partner. Wer Partner daran misst, bekommt geschönte Zahlen."
faq:
  - q: "Was sind DORA-Metriken?"
    a: "DORA-Metriken sind Kennzahlen aus der Forschung des DevOps Research and Assessment Programms. Sie messen, wie schnell Änderungen in Produktion kommen und wie oft sie Probleme verursachen."
  - q: "Wie viele DORA-Metriken gibt es?"
    a: "Lange waren es vier: Deployment-Häufigkeit, Durchlaufzeit von Änderungen, Fehlerquote und Wiederherstellungszeit. 2024 kam die Nacharbeitsquote dazu, der Anteil ungeplanter Deployments zur Fehlerbehebung."
  - q: "Kann man DORA-Metriken in Salesforce messen?"
    a: "Ja, wenn alle Produktions-Deployments über Git und eine Pipeline laufen und Störungen erfasst werden. Tools wie sfdx-hardis berechnen Näherungswerte aus den Pipeline-Daten; Fehler in Produktion brauchen zusätzlich Störungsdaten."
  - q: "Welche DORA-Metrik ist für Salesforce-Programme am wichtigsten?"
    a: "Eine einzelne Kennzahl reicht nicht, davor warnt DORA selbst. Für den Lenkungsausschuss beginne ich mit der Fehlerquote zusammen mit der Wiederherstellungszeit, weil sie zeigen, wie oft und wie lange ein Release den Betrieb stört. Für das Team die Durchlaufzeit, weil sie zeigt, wo Arbeit wartet."
draft: false
---

DORA-Metriken zeigen der IT-Leitung, ob Salesforce-Releases schneller und stabiler werden. Sie messen, wie lange eine Änderung bis in Produktion braucht, wie oft deployt wird, wie oft ein Deployment Probleme macht und wie schnell sie behoben sind. In Salesforce kommen die Zahlen aus Git, der Pipeline und Störungsdaten. Werkzeuge wie sfdx-hardis berechnen Näherungswerte aus der Pipeline. Entscheidend ist der Trend über mehrere Monate. Ich nutze die Metriken, um den Release-Prozess zu verbessern, nicht um Partner gegeneinander zu messen. Wer das tut, bekommt geschönte Zahlen.

## Was sind DORA-Metriken?

DORA steht für DevOps Research and Assessment, ein Forschungsprogramm, das seit 2014 untersucht, was gute Softwareauslieferung ausmacht. Die Kennzahlen sind heute in zwei Gruppen eingeteilt ([dora.dev: History of DORA's software delivery metrics](https://dora.dev/guides/dora-metrics/history/)):

| Kennzahl | Bedeutung | Gruppe |
|---|---|---|
| Durchlaufzeit von Änderungen | Zeit vom Commit bis zum erfolgreichen Deployment in Produktion | Durchsatz |
| Deployment-Häufigkeit | wie oft Änderungen in Produktion deployt werden | Durchsatz |
| Wiederherstellungszeit | Zeit bis zur Erholung nach einem Deployment, das sofortiges Eingreifen braucht | Durchsatz |
| Fehlerquote von Änderungen | Anteil der Deployments, die sofortiges Eingreifen brauchen | Instabilität |
| Nacharbeitsquote | Anteil ungeplanter Deployments infolge einer Störung in Produktion | Instabilität |

Die Nacharbeitsquote ist 2024 als fünfte Kennzahl dazugekommen. Viele Tools und Artikel sprechen deshalb noch von den vier DORA-Metriken.

Mir haben die Zahlen gefallen, als ich sie mir in sfdx-hardis zum ersten Mal angesehen habe, weil ein Lenkungsausschuss sie versteht. Niemand dort will wissen, wie viele Pull Requests gemergt wurden. Aber die Frage, ob ein Release seltener den Betrieb stört als vor einem halben Jahr, versteht jeder. Was ich im Training dazu gelernt habe, steht in [Was ich aus dem kostenlosen sfdx-hardis-Training lernte](../sfdx-hardis-kostenloses-devops-training/).

## Woher kommen die Zahlen in Salesforce?

Die Metriken brauchen eine Datenquelle, in der jede Änderung mit Zeitstempel steht. In Salesforce ist das am verlässlichsten, wenn alle Änderungen über Git und eine Pipeline laufen und Störungen dem verursachenden Deployment zugeordnet werden:

- **Durchlaufzeit** aus Git: Zeitpunkt des Commits oder des Pull Requests und Zeitpunkt des Deployments in Produktion.
- **Deployment-Häufigkeit** aus den Läufen der Pipeline gegen die Produktions-Org.
- **Fehlerquote und Nacharbeitsquote** aus Störungen und Hotfixes: Eine Störung wird dem Deployment zugeordnet, das sie verursacht hat. Hotfix-Branches und Rollbacks sind Hinweise, aber nicht jeder Hotfix repariert das letzte Deployment.
- **Wiederherstellungszeit** aus dem Ticketsystem: Zeit vom Beginn der durch das Deployment verursachten Störung, bis der Betrieb wieder läuft, per Korrektur, Rollback oder Deaktivieren der Änderung.

sfdx-hardis liefert dafür einen Bericht über die Kennzahlen, und auch kommerzielle DevOps-Tools für Salesforce bieten solche Auswertungen. Achten Sie darauf, was so ein Bericht misst: sfdx-hardis zählt fehlgeschlagene Deployment-Jobs als Fehler und misst die Durchlaufzeit ab Erstellung des Pull Requests, die Werte sind also Näherungen aus der Pipeline. Ein roter Job, der nie in Produktion ankam, ist kein Fehler im Sinne von DORA, und ein grüner Job kann trotzdem den Betrieb stören. Das Tool stuft die Werte außerdem nach DORA-Benchmarks von Elite bis Low ein; diese Einstufung würde ich nicht ungeprüft in den Lenkungsausschuss tragen. Die Pipeline dafür setze ich auf der Plattform des Kunden auf, siehe [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

```hinweis achtung
Änderungen, die direkt in der Produktions-Org gemacht werden, tauchen in keiner Git-Statistik auf. Prüfen Sie deshalb regelmäßig den Setup Audit Trail und exportieren Sie ihn, denn Salesforce hält ihn nur 180 Tage vor, und er erfasst Setup-Änderungen, keine Daten. Stehen dort viele Änderungen von Nutzern außerhalb der Pipeline, sind die DORA-Zahlen zu gut, um wahr zu sein.
```

## Salesforce hat eigene Fallen, die die Zahlen verzerren

Salesforce-Programme haben ein paar Eigenheiten, die die Zahlen verzerren:

- **Feste Release-Termine.** Wird einmal im Monat deployt, besteht die Durchlaufzeit zum größten Teil aus Warten auf den nächsten Termin. Das ist eine Entscheidung des Programms und kein Problem der Entwickler. Die Zahl zeigt trotzdem, was diese Entscheidung kostet.
- **Manuelle Schritte.** Ein Deployment gilt als erfolgreich, aber danach muss jemand drei Flows von Hand aktivieren, etwa weil "Deploy processes and flows as active" nicht eingeschaltet ist. Läuft das schief, ist es ein Fehler, der in keiner Statistik als fehlgeschlagenes Deployment auftaucht.
- **Daten statt Metadaten.** Produktkataloge, Preisregeln oder Konfiguratorregeln liegen in manchen Clouds als Datensätze vor. Werden sie von Hand geändert, fehlen sie in den Metriken.
- **Große Pakete.** Ein Release mit 200 Änderungen, das einen Fehler hat, zählt als ein fehlgeschlagenes Deployment. Kleinere Releases machen die Fehlerquote aussagekräftiger.

## Die IT-Leitung schaut auf den Trend, nicht auf den Einzelwert

Ich empfehle drei Regeln:

1. **Trend statt Einzelwert.** Ein Monat sagt wenig. Bei monatlichen Releases betrachten Sie ein rollierendes Fenster von mindestens sechs bis zwölf Deployments und zeigen neben dem Prozentwert die absoluten Zahlen, etwa "2 von 6".
2. **Kein Vergleich mit Softwarefirmen.** Die Spitzenwerte aus den DORA-Berichten stammen von Teams, die mehrmals täglich deployen. Ein Hersteller mit monatlichem Salesforce-Release vergleicht sich mit sich selbst.
3. **Keine Rangliste der Partner.** Mit mehreren Partnern liegt es nahe, jeden Partner an seiner Fehlerquote zu messen. Dann werden Hotfixes umbenannt und Fehler als neue Anforderungen erfasst. Die Metriken gehören dem Programm, für die Qualität einzelner Lieferungen gibt es das [Pull-Request-Review](../warum-pull-request-reviews-pflicht-sind/).

```pro-contra
pro: DORA-Metriken im Lenkungsausschuss
- Zahlen, die ohne technisches Wissen verständlich sind
- Zeigen, ob Investitionen in den Release-Prozess wirken
- Lassen sich teilweise aus Pipeline-Daten automatisieren
contra: Was Sie beachten müssen
- Brauchen vereinbarte Definitionen und Störungsdaten, nicht nur die Pipeline
- Direkte Änderungen in Produktion fehlen in den Zahlen
- Als Partnervergleich verlieren sie ihre Aussagekraft
```

## Welcher Hebel verbessert welche Zahl?

Die Metriken sind nur nützlich, wenn aus einer schlechten Zahl eine Maßnahme folgt. Diese Zuordnung passt für Salesforce-Programme, weil jeder Hebel im Release-Prozess selbst liegt und nicht im Budget für neue Tools:

- **Lange Durchlaufzeit:** Wo wartet die Änderung? Oft auf das Review, auf UAT oder auf den Release-Termin. Kleinere Pull Requests und vereinbarte Reaktionszeiten im Review helfen bei der ersten Ursache, ein kürzerer Release-Takt bei der letzten.
- **Niedrige Deployment-Häufigkeit:** Releases sind zu groß oder zu aufwendig. Automatisierte Post-Deployment-Schritte machen ein Release billiger und damit häufiger möglich.
- **Hohe Fehlerquote:** Fehler entkommen den Tests. Ein [UAT mit Testnutzern pro Rolle](../salesforce-uat-abnahmetest-fachbereich/) und Regressionstests für die wichtigsten Prozesse fangen viele davon vor der Produktion ab.
- **Lange Wiederherstellungszeit:** Es gibt keinen schnellen Weg für Korrekturen. Eine Hotfix-Sandbox, die zeitnah auf den Stand der Produktion gebracht wird, und ein eigener Hotfix-Branch verkürzen ihn.

Rechenbeispiel: Ein Programm mit zwölf Releases im Jahr, von denen vier eine Störung mit sofortigem Eingriff verursacht haben, hat eine Fehlerquote von 33 Prozent. Zusammen mit der Wiederherstellungszeit und den betroffenen Prozessen sagt das dem Lenkungsausschuss mehr als eine Liste offener Tickets und lässt sich nach jeder Maßnahme erneut prüfen.

## Erster Schritt: Deployment-Häufigkeit und Fehlerquote

Fangen Sie mit zwei Zahlen an: Deployment-Häufigkeit und Fehlerquote. Die Deployment-Häufigkeit lässt sich aus der Pipeline ablesen, die Fehlerquote aus den Deployments und den ihnen zugeordneten Störungen, auch wenn noch kein Tool sie automatisch berichtet. Legen Sie den heutigen Wert als Ausgangspunkt fest und berichten Sie den Trend einmal im Monat. Die Durchlaufzeit kommt dazu, sobald alle Änderungen über Pull Requests laufen. Als Nacharbeit zählt jede ungeplante Änderung, die wegen einer Störung in Produktion nötig wird, auch eine Korrektur direkt im Setup, die Sie nur im Setup Audit Trail finden.
