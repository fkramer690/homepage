---
title: "Field Service per KI-Assistent einrichten: Was prüfen?"
description: "Salesforce lässt Field Service headless von einem KI-Assistenten einrichten. Was er konfiguriert, was er nicht wissen kann und was Sie vor der Freigabe prüfen."
pubDate: 2026-10-28
lang: de
slug: field-service-einrichtung-ki-assistent
translationKey: field-service-headless-setup-ai
topic: field-service
categories: [field-service, ai]
tags: [Field Service, Headless 360, KI-Assistent, Einrichtung, Stammdaten, DevOps]
takeaways:
  - "Der Assistent legt Gebiete, Betriebszeiten, Arbeitstypen, Skill-Anforderungen und Scheduling Policies an, dazu Branding und Formulare für die App."
  - "Welche Skills die Techniker haben, wann Kunden Besuche zulassen und welches Lager welche Region bedient, weiß er nicht. Das kommt aus HR, ERP und Disposition."
  - "Das meiste, was er baut, sind Konfigurationsdaten. Er arbeitet in einer Sandbox, und das Ergebnis geht über Git und Pipeline in Produktion."
  - "Service- und Dispositionsleitung prüfen Gebiete, Arbeitstypen und Policies Abschnitt für Abschnitt, bevor jemand den Plan freigibt."
faq:
  - q: "Was ist eine Headless-Einrichtung von Salesforce Field Service?"
    a: "Die Konfiguration von Field Service im Gespräch mit einem KI-Assistenten statt über die Setup-Menüs. Laut Trailhead nutzt der Assistent Headless Skills in drei Stufen, Orchestrierung, Konfiguration und Feature, und baut die Org erst, nachdem Sie seinen Umsetzungsplan freigegeben haben."
  - q: "Welche KI-Assistenten können Field Service einrichten?"
    a: "Die Trailhead-Einheit nennt Gemini, Claude und Slackbot. Sie brauchen einen unterstützten Assistenten und Zugriff auf die Headless Skills."
  - q: "Kann ich die Headless-Einrichtung direkt in Produktion laufen lassen?"
    a: "Ich würde es nicht tun. Die Einrichtung lädt auch Beispieltermine, und das meiste, was sie anlegt, sind Datensätze, die ein Metadaten-Deployment nicht mitnimmt. Sandbox plus normale Pipeline hält Produktion und Repository gleich."
  - q: "Ersetzt der KI-Assistent den Field-Service-Partner?"
    a: "Er ersetzt das Tippen in Setup-Masken. Gebiete schneiden, Arbeitstypen mit realistischen Dauern festlegen, HR- und ERP-Daten anbinden und mobile Formulare mit dem Betriebsrat abstimmen bleibt Projektarbeit."
draft: false
---

Bei der Headless-Einrichtung von Field Service liest ein KI-Assistent wie Gemini, Claude oder Slackbot Ihre Unternehmenswebsite, fragt nach Gebieten, Skills und Prioritäten in der Terminplanung und schlägt einen Umsetzungsplan vor. Nach Ihrer Freigabe konfiguriert er Gebiete, Betriebszeiten, Arbeitstypen, Skill-Anforderungen, Scheduling Policies und die mobile App der Techniker. So entsteht in Stunden ein erster Entwurf. Der Assistent kennt aber nur, was öffentlich ist und was Sie ihm sagen. Prüfen Sie deshalb jeden Abschnitt mit Serviceleitung und Dispositionsleitung, bevor Sie freigeben. Und lassen Sie ihn in einer Sandbox arbeiten, das Ergebnis geht dann wie jede andere Änderung über Git und Pipeline.

## Was heißt Headless-Einrichtung bei Field Service?

Salesforce verkauft Field Service heute als Field Service and Operations. Im April 2026 hat Salesforce [Headless 360 vorgestellt](https://www.salesforce.com/news/?p=93116): Funktionen der Plattform stehen als API, als MCP-Tool oder als CLI-Befehl bereit, damit Menschen und KI-Agenten mit Salesforce arbeiten können, ohne die Browseroberfläche zu öffnen. MCP, das Model Context Protocol, ist der offene Standard, über den ein KI-Werkzeug Funktionen in einem anderen System aufruft. Wo es in einer Salesforce-Architektur sitzt, beschreibt das Masterclass-Kapitel [MCP und Salesforce-Schnittstellen](../../masterclass/ki-salesforce/mcp-und-schnittstellen/).

Die [Trailhead-Einheit zur Headless-Einrichtung von Field Service](https://trailhead.salesforce.com/content/learn/modules/headless-360-use-cases-in-action/set-up-field-service-headlessly) wendet das auf Field Service an. Sie nennt drei Stufen von Headless Skills:

- **Orchestrierung** startet den Ablauf. Diese Skills sammeln Grunddaten von Ihrer Website und machen daraus Empfehlungen für die Einrichtung.
- **Konfiguration** läuft nach der Freigabe des Plans und richtet die Grundstruktur ein.
- **Feature** setzt den Aufbau in zwei Bereichen um. Die Grundeinrichtung legt Servicegebiete, Betriebszeiten, Arbeitstypen, Skill-Anforderungen und Scheduling Policies an. Die Konfiguration der mobilen App richtet Branding, Pre-Work Briefs und Datenerfassungs-Flows wie Voice to Form ein.

In Slack erscheinen die vorgeschlagenen Gebiete, Arbeitstypen und Policies als Listenansichten neben den Antworten des Assistenten. Laut Trailhead ist nichts endgültig, bevor Sie freigeben, und gebaut wird genau die freigegebene Konfiguration. Die Techniker finden danach Branding, vorab geladene Beispieltermine, Pre-Work Briefs, Arbeitspläne und Erfassungsformulare in der App. Wie Salesforce seine Plattform allgemein in Claude und Slack bringt, steht in [AIforce: Salesforce in Claude und Slack](../aiforce-salesforce-in-claude-und-slack/).

## Der Assistent kennt Ihre Website, nicht Ihre Disposition

Er beginnt mit der Adresse Ihrer Website. Die Website eines Maschinenbauers zeigt Produktlinien, Standorte und vielleicht ein Serviceversprechen. Das Wissen, mit dem die Terminplanung funktioniert, steht dort nicht. In [Welche Stammdaten Field Service braucht](../salesforce-field-service-stammdaten/) nenne ich sechs Datenarten und ihre führenden Systeme:

| Daten | Führendes System | Kann der Assistent das wissen? |
|---|---|---|
| Gebiete und Betriebszeiten | Salesforce | Er schlägt sie aus den Standorten der Website vor |
| Techniker und Skills | HR- oder Schulungssystem | Nein, er kann nur die Skill-Namen anlegen |
| Arbeitstypen mit Dauer | Salesforce, Dauern aus der ERP-Historie | Er schätzt aus den Produktseiten |
| Assets beim Kunden | ERP | Nein |
| Besuchszeiten der Kunden | Salesforce | Nein |
| Abwesenheiten | Zeiterfassung | Nein |

Der Assistent baut also den Rahmen gut und den Inhalt schlecht. Gebiete sind das typische Beispiel. Ein Vorschlag aus der Website folgt den Vertriebsbüros. Die [Richtlinien für Servicegebiete](https://help.salesforce.com/s/articleView?id=service.fs_territory_guidelines.htm&language=en_US&type=5) empfehlen bis zu 50 Techniker pro Gebiet, und der richtige Schnitt folgt Lagern, Fahrzeiten und Wohnorten der Techniker. Das weiß Ihre Serviceleitung, die Website weiß es nicht.

Ähnlich bei den Scheduling Policies. Salesforce liefert vier Standard-Policies mit, wie in [Wie viel Terminplanung automatisch laufen sollte](../salesforce-field-service-terminplanung-automatisieren/) beschrieben. Welche passt und wie die Gewichte stehen, hängt davon ab, was Ihre Disponenten heute ändern und warum.

## Was prüfen Sie, bevor Sie den Plan freigeben?

Ich würde den Plan in einem Workshop mit Serviceleitung und Dispositionsleitung Abschnitt für Abschnitt durchgehen:

| Abschnitt | Was prüfen | Wer prüft |
|---|---|---|
| Gebiete | Anzahl, Schnitt nach Lagern und Fahrzeit, Techniker pro Gebiet | Serviceleitung |
| Betriebszeiten | Regelzeiten pro Gebiet, Samstage, Bereitschaft | Serviceleitung, Betriebsrat |
| Arbeitstypen | Dauern aus den Serviceaufträgen des Vorjahrs, benötigte Skills | Serviceplanung |
| Skills und Anforderungen | Stufen passen zu Ihrer Schulungsskala, Quelle ist HR | HR und Service |
| Scheduling Policies | Start mit Standard-Policy, Gewichte begründet | Dispositionsleitung |
| Mobile App | Welche Werte ein Formular als Feld erfasst, Spracheingabe, Standort | Service, Datenschutz |

Zwei Punkte verdienen besondere Aufmerksamkeit. Erstens die Erfassungsformulare. Bevor Formulare in großem Stil entstehen, legen Sie fest, welche Werte Felder am Asset oder Arbeitsauftrag werden, wie ich in [Field Service mobil: Führung und Sprache](../salesforce-field-service-mobile-aussendienst/) begründe. Voice to Form verarbeitet, was Techniker sagen, das betrifft in Deutschland den Betriebsrat. Zweitens die Beispieldaten. Die Einrichtung lädt Beispieltermine für Techniker, die gehören in eine Sandbox und nirgendwo sonst hin.

## Auch eine KI-gebaute Konfiguration geht über Git

Weil der Assistent vor allem Datensätze anlegt. Gebiete, Betriebszeiten, Arbeitstypen, Skill-Anforderungen und Scheduling Policies mit ihren Work Rules sind in Salesforce Daten. Ein Metadaten-Deployment nimmt sie nicht mit, wie das DevOps-Masterclass-Kapitel [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/) zeigt. Die Erfassungsformulare dagegen sind Flows und damit Metadaten.

Daraus folgt ein klarer Weg:

```schritte
In der Sandbox einrichten
  Die Headless-Einrichtung läuft in einer Sandbox.
Metadaten holen
  Flows und andere Metadaten holen Sie in einen Branch.
Daten exportieren
  Die Konfigurationsdatensätze exportieren Sie mit einer externen ID pro Datensatz in einen Datenbereich im Repository, zum Beispiel für SFDMU.
Prüfen und ausrollen
  Beides wird im Pull Request geprüft und über die Pipeline ausgerollt: erst Metadaten, dann Daten.
```

Eine Freigabe im Chat ersetzt kein Review. Wer den Assistenten beauftragt, gibt auch dessen Plan frei, genau wie beim Setup-Agenten. Warum das zählt, habe ich in [Setup with Agentforce: Admin-KI in Produktion zulassen?](../setup-with-agentforce-admin-aenderungen/) beschrieben. Der Assistent baut eine Konfiguration schnell und eignet sich schlecht, sie auszurollen.

## Rechenbeispiel: aus 14 Gebieten werden 6

Angenommen ist ein Maschinenbauer mit 45 Technikern in Deutschland, Österreich und der Schweiz. Die Website nennt 14 Vertriebs- und Servicestandorte. Alle Zahlen sind Annahmen.

**Der Vorschlag.** In einer zweistündigen Sitzung schlägt der Assistent 14 Gebiete vor, eins pro Standort, 22 Arbeitstypen aus den Produktseiten und eine Scheduling Policy auf Basis von Customer First.

**Der Schnitt.** Die Serviceleitung reduziert auf 6 Gebiete, entlang der drei Lager und der Fahrzeiten, mit je 6 bis 10 Technikern. Vier Standorte sind reine Vertriebsbüros ohne Techniker. Die Arbeitstypen schrumpfen auf 9, mit Dauern aus den Serviceaufträgen des Vorjahrs im ERP. Die Skills kommen über eine Schnittstelle aus der Schulungsmatrix, niemand tippt sie ein.

**Das Zurückstellen.** Die mobilen Formulare warten, bis das Datenmodell für Prüfprotokolle steht und der Betriebsrat die Spracheingabe gesehen hat.

**Der Aufwand.** Zwei Stunden Chat, drei Workshoptage für die Prüfung, zwei Tage, um Flows und Datensätze in Repository und Pipeline zu bringen. Der Assistent hat das Tippen in Setup-Masken gespart. Die Entscheidungen haben so lange gedauert wie vorher.

## Erster Schritt: vorbereiten, was die Website nicht hergibt

Die Website liefert dem Assistenten Standorte und Produkte, aber keine Skills, Lager und Reaktionszeiten. Wo die Headless-Einrichtung neben Agenten und Einführungswellen steht, behandelt das [Kapitel KI-Agenten, Einführung und Betrieb der Field-Service-Masterclass](../../masterclass/field-service/field-service-ki-agenten-einfuehrung/).

1. **Bereiten Sie vor, was die Website nicht hergibt**: Lagerliste mit Technikern, Schulungsmatrix, Liste der Arbeitstypen mit Dauern, Reaktionszeiten aus den Verträgen.
2. **Wählen Sie eine Sandbox** ohne Produktionsdaten für die Headless-Einrichtung.
3. **Prüfen Sie den Plan** mit Service- und Dispositionsleitung, bevor Sie freigeben.
4. **Bringen Sie das Ergebnis in Git**: Flows als Metadaten, Konfigurationsdatensätze als Datenbereich.
5. **Legen Sie fest, wer einen Assistenten mit welcher Org verbinden darf.** Produktion bleibt der Pipeline vorbehalten, wie in meiner Arbeit zu [DevOps und Release-Management](../../leistungen/devops-und-release-management/).
