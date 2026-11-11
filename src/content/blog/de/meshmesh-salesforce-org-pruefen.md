---
title: "Bevor Sie MeshMesh mit Ihrer Salesforce-Org verbinden"
metaTitle: "MeshMesh Salesforce: Checkliste vor dem Beta-Test"
description: "MeshMesh von Salesforce ist in der offenen Beta. Was die Dokumentation zu Rechten, Datenregion, Deploy und Health Check sagt und was Sie vor dem Test klären."
pubDate: 2026-11-11
lang: de
slug: meshmesh-salesforce-org-pruefen
translationKey: meshmesh-salesforce-checklist
topic: ai
categories: [ai, devops]
tags: [MeshMesh, KI-Agent, Salesforce-Org, Berechtigungen, Datenschutz, Health Check]
takeaways:
  - "MeshMesh arbeitet mit den Rechten des angemeldeten Salesforce-Nutzers. Meldet sich ein Admin an, hat der Agent im Build Mode Adminrechte."
  - "Die Beta ist auf 1.000 Accounts begrenzt, enthält 100.000 Credits und endet voraussichtlich am 31.01.2027. Preis und Umfang danach sind offen."
  - "Manufacturing Cloud, CPQ und Flows führt MeshMesh als experimentell. Die Ankündigung spricht von mehr als 40 Produkten."
  - "MeshMesh verarbeitet in der Region US East mit Modellen von Anthropic. Datenschutz und Betriebsrat gehören vor den ersten Login."
  - "Änderungen des Agenten sollten als Branch durch Ihre Pipeline gehen und nicht per Direkt-Deploy in eine geteilte Sandbox."
faq:
  - q: "Was ist MeshMesh von Salesforce?"
    a: "MeshMesh ist ein KI-Agent, der eine Salesforce-Org analysiert, Fehler behebt und neue Funktionen baut. Salesforce hat das Start-up im Juli 2026 übernommen, seit November 2026 läuft eine offene Beta."
  - q: "Was kostet MeshMesh?"
    a: "In der Beta nichts: Jeder Account erhält 100.000 Credits bis zum Ende der Beta. Preis und Paketierung für die allgemeine Verfügbarkeit, geplant im Salesforce-Geschäftsjahr 2028, stehen noch nicht fest."
  - q: "Wer kann an der MeshMesh-Beta teilnehmen?"
    a: "Kunden mit einer aktiven Salesforce-SKU und anerkannte Salesforce-Partner. Die Beta ist auf 1.000 Accounts begrenzt, die in Kohorten aufgenommen werden; danach gibt es eine Warteliste."
  - q: "Darf MeshMesh in einer Produktionsorg arbeiten?"
    a: "Technisch ja. Für die Beta empfehle ich eine Developer-Sandbox. Für Analysen in Produktion bietet MeshMesh eine Verbindung über Salesforce Headless 360 an, bei der nur Lesezugriff möglich ist."
  - q: "Welche KI-Modelle nutzt MeshMesh?"
    a: "Laut FAQ von MeshMesh Modelle von Anthropic, mit einem Enterprise-Vertrag ohne Training mit Kundendaten und ohne Datenspeicherung. Verarbeitet wird in der Region US East."
draft: false
---

MeshMesh ist ein KI-Agent von Salesforce, der eine Org analysiert, Fehler behebt und neue Funktionen baut, gesteuert über ein Gespräch. Seit November 2026 läuft eine offene Beta mit kostenlosen Credits. Bevor Sie MeshMesh mit Ihrer Salesforce-Org verbinden, sollten fünf Punkte geklärt sein: mit welchem Nutzer der Agent arbeitet, in welcher Umgebung, ob seine Änderungen Ihre Pipeline durchlaufen, wo die Daten verarbeitet werden und wer die Befunde des Health Checks prüft. Meine Empfehlung für den Test: eine Developer-Sandbox, ein eigener Integrationsnutzer ohne Adminrechte und zuerst nur der Plan Mode.

## Was ist MeshMesh von Salesforce?

Kevin Nuest, David DeVore und Calvin Hoenes haben MeshMesh 2023 gegründet. Im Juli 2026 wechselte das Team zu Salesforce. Ob das eine Übernahme war, ließ Salesforce gegenüber [Salesforce Ben](https://www.salesforceben.com/has-salesforce-acquired-meshmesh/) zunächst offen. Die [Investor-Mitteilung vom 24. Juli 2026](https://investor.salesforce.com/news/news-details/2026/Salesforce-Grants-Equity-Awards-to-Qualified-and-MeshMesh-Under-Its-Inducement-Equity-Incentive-Plan/default.aspx) spricht dann von einer Übernahme und nennt drei MeshMesh-Mitarbeitende, die Aktien erhielten. Einen Kaufpreis nennt Salesforce nicht.

Mike Wolff, Chief Growth Officer bei Salesforce, hat die offene Beta im November [auf LinkedIn](https://www.linkedin.com/posts/mwolff1_introducing-the-meshmesh-from-salesforce-activity-7525971855753789440-9X06) angekündigt. Sein Kernsatz: „Work that used to be complex, slow, and expensive becomes a conversation.“ Die Arbeit gliedert er in Diagnose, Fix und Build. Laut [MeshMesh-Website](https://meshmesh.io) gehört das Produkt zu Maestro, einer Salesforce-Initiative, die Nutzung und Einführung aller Salesforce-Produkte vereinfachen soll. Eine Primärquelle von Salesforce zu Maestro habe ich nicht gefunden.

Laut [Dokumentation der Agenten](https://docs.meshmesh.io/concepts/agents) liest MeshMesh im Plan Mode und im Research Mode nur. Erst im Build Mode deployt der Agent Metadaten, ändert Daten und bedient bei Bedarf die Oberfläche im Browser. Das Wissen über Salesforce ist in einer Kontextschicht abgelegt, die MeshMesh Cloud Control nennt; die Sprachmodelle stammen laut [MeshMesh-FAQ](https://docs.meshmesh.io/faq) von Anthropic. So sieht ein Lauf aus, wenn Sie die Pipeline einbinden, wie ich es empfehle:

```prozess
titel: Ein Lauf in MeshMesh, mit Ihrer Pipeline
spuren: Personen | Agent | Pipeline
Personen | Ziel beschreiben | In normaler Sprache, mit Kriterium für fertig
Agent | Org erfassen | Objekte, Flows, Apex, Integrationen, nur lesend
Agent | Plan schreiben | Plan Mode, ändert nichts
tor: Ein Mensch gibt den Plan frei
Agent | Bauen | Build Mode schreibt in einen Branch
Pipeline | Branch prüfen | Validierungs-Deployment, Tests, Review
zurueck: Befunde gehen an den Agenten zurück
tor: Release nur über die Pipeline
```

## Die Dokumentation von MeshMesh ist vorsichtiger als die Ankündigung

Die Ankündigung klingt nach einem fertigen Produkt für alle Clouds. Die eigene Dokumentation von MeshMesh beschreibt eine Beta mit Grenzen, und für Ihre Planung zählt die Dokumentation.

```tabelle
titel: MeshMesh: Ankündigung und Dokumentation, Stand 11.11.2026
spalten: | Ankündigung | Dokumentation *
Produkte | Kontextschicht versteht mehr als 40 Produkte | Website: 34 Clouds, Kontextmodell: 18+ Produkte in der Tiefe, viele als experimentell markiert
Zugang | Beta für alle offen | 1.000 Accounts in Kohorten, danach Warteliste
Voraussetzung | keine Angabe | Kunden mit aktiver Salesforce-SKU oder anerkannte Partner
Kosten | keine Angabe | 100.000 Credits je Account kostenlos, Preis nach der Beta offen
Zeitraum | keine Angabe | Start ab 02.11.2026, Ende voraussichtlich 31.01.2027
fazit: Quellen: LinkedIn-Beitrag von Mike Wolff, meshmesh.io sowie FAQ und Produktübersicht der MeshMesh-Dokumentation.
```

Für Hersteller ist ein Detail wichtig. In der [Produktübersicht](https://docs.meshmesh.io/) stehen Manufacturing Cloud, CPQ, Flows sowie Reports und Dashboards als experimentell. Sales Cloud, Service Cloud, Field Service, Data Cloud und Agentforce sind ohne diesen Zusatz gelistet. Wer Sales Agreements oder komplexe Flows von MeshMesh bearbeiten lässt, testet also eine experimentelle Funktion in einer Beta.

Die allgemeine Verfügbarkeit plant MeshMesh für das Salesforce-Geschäftsjahr 2028, das im Februar 2027 beginnt. Bis dahin können sich Umfang, Preis und Paketierung ändern, ein Budget lässt sich heute nicht seriös planen. Unabhängige Berater ohne Partnerstatus und ohne eigene SKU bleiben in der Beta außen vor. Ich kann MeshMesh deshalb selbst nicht testen; alle Angaben hier stammen aus der Dokumentation und den genannten Quellen.

## Mit wessen Rechten arbeitet MeshMesh in Ihrer Org?

Der Standardweg ist ein Managed Package. Ein Salesforce-Admin installiert es einmal pro Org und aktiviert die External Client App „MeshMesh Studio“. Danach verbindet sich jeder Nutzer der Org per OAuth, also mit seinem eigenen Salesforce-Login. Die [Anleitung zum Managed Package](https://docs.meshmesh.io/guides/connect-salesforce-managed-package) sagt deutlich, was daraus folgt: Der Agent darf alles, was der angemeldete Nutzer darf, und nicht mehr.

```vergleich
ohne: Ein Admin meldet sich an
- MeshMesh darf im Build Mode Apex schreiben, Berechtigungen ändern und Daten löschen.
- * Der Agent arbeitet in einer Full Copy mit Händlerpreisen und Servicefällen.
mit: Eigener Integrationsnutzer
- Ohne Modify All Data, Customize Application, Author Apex und Manage Users, wie MeshMesh selbst empfiehlt.
- * Der Agent arbeitet nur in einer Developer-Sandbox mit Testdaten.
- In Produktion liest er nur, über Headless 360.
zitat: Der Agent darf, was der angemeldete Nutzer darf. Deshalb meldet sich bei mir nie ein Admin an.
```

Die Verbindung über [Salesforce Headless 360](https://docs.meshmesh.io/guides/connect-salesforce-headless-360) ist selbst noch in der Beta; MeshMesh lässt dabei bei jeder Anfrage nur Lesezugriff zu. Die FAQ von MeshMesh rät ebenfalls, immer eine Sandbox oder Testumgebung zu verbinden. Welche Daten dort gespeichert sein dürfen, beschreibe ich in [Sandbox-Kundendaten: was KI-Coding-Agenten lesen dürfen](../sandbox-kundendaten-ki-coding-agenten/).

## Änderungen von MeshMesh gehören ins Repository

Im Build Mode deployt MeshMesh Metadaten direkt in die verbundene Org. Laut Website testet der Agent Änderungen in einer Sandbox, bevor sie in Produktion deployt werden, und jede Änderung lässt sich zurückrollen. Das ersetzt nicht den Weg, den in einem gepflegten Programm jede andere Änderung durchläuft: Branch, Pull Request, Review, Validierungs-Deployment und Release.

MeshMesh kann laut [Anleitung zur GitHub-Anbindung](https://docs.meshmesh.io/guides/connect-github) Repositories klonen, Branches anlegen, committen und pushen. Der Agent nutzt dabei das GitHub-Konto der Person, die ihn startet. Nutzen Sie diesen Weg: MeshMesh liefert einen Branch, und Ihre Pipeline entscheidet, ob die Änderung in die Org deployt wird. Ein Agent, der direkt in eine geteilte Sandbox deployt, erzeugt dieselben Konflikte wie ein Entwickler, der an der Pipeline vorbei arbeitet. Für GitLab, Azure DevOps oder Bitbucket nennt die Dokumentation keine fertige Integration, nur die allgemeine Anbindung über MCP-Server.

```praxis
In einem Programm mit mehreren Implementierungspartnern lief anfangs jeder Pull Request über meinen Schreibtisch, später habe ich das an einen internen Kollegen übergeben. Die gemeinsamen Standards haben nur gegriffen, weil keine Änderung diesen Weg umging. Einen KI-Agenten behandle ich wie einen weiteren Entwickler: Er hält sich an dieselben Regeln, oder er arbeitet nur in seiner eigenen Sandbox.
```

Was ein Review bei Code von Agenten zusätzlich prüfen sollte, steht in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/). Wie eine Pipeline für mehrere Teams aufgebaut ist, beschreibe ich auf der Seite zu [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

## Wo verarbeitet MeshMesh Ihre Daten?

Für Ihre Datenschutzprüfung zählen diese Angaben aus der Dokumentation von MeshMesh:

- **Region:** US East laut [Dokumentation zur Netzwerkfreigabe](https://docs.meshmesh.io/network-allowlist). Für Daten, die in der EU verarbeitet werden müssen, stellt MeshMesh auf Anfrage eigene regionale Infrastruktur bereit.
- **Modelle:** Anthropic, laut FAQ mit einem Enterprise-Vertrag ohne Training mit Kundendaten und ohne Speicherung beim Modellanbieter.
- **Netzwerk:** zwei feste IPv4-Adressen, die sich alle Kunden teilen. Wer die Login-IP-Bereiche seiner Org einschränkt, muss beide freigeben.
- **Protokolle:** vollständige Audit Trails für alle Aktionen laut [Sicherheitsseite](https://docs.meshmesh.io/security).

Für Ihren Datenschutzbeauftragten ist MeshMesh damit ein weiterer Dienstleister mit Verarbeitung in den USA. Das schließt einen Test nicht aus, gehört aber vor den ersten Login in die Prüfung. An deutschen Standorten ist außerdem der Betriebsrat beteiligt: Ein Werkzeug, das Nutzungsdaten pro Person erzeugt, unterliegt in der Regel der Mitbestimmung nach § 87 Abs. 1 Nr. 6 BetrVG. Die Einzelheiten beschreibe ich in [KI-Coding-Tools: Betriebsrat und DSGVO](../ki-coding-betriebsrat-dsgvo/). Lassen Sie sich vor dem ersten Login außerdem schriftlich bestätigen, welche Unterauftragsverarbeiter beteiligt sind, wie lange MeshMesh Org-Metadaten und Abfrageergebnisse aufbewahrt und auf welcher Vertragsgrundlage Sie an der Beta teilnehmen.

## Der Health Check von MeshMesh ersetzt keine eigene Prüfung

Das Video in Mike Wolffs Beitrag zeigt einen Data 360 Health Check. Seit dem [9. November 2026](https://docs.meshmesh.io/releases/2026-11-09) bietet MeshMesh dafür das Rezept „Audit Snapshot of Org Health“ an. Laut [Beschreibung des Rezepts](https://docs.meshmesh.io/recipes/audit-snapshot-of-org-health) liest es die Org nur, braucht 30 bis 45 Minuten und einen Admin-Nutzer mit Lesezugriff auf das Setup. Das Ergebnis ist ein Score über sechs Dimensionen, eine Lizenzübersicht mit aktiven und ungenutzten Plätzen, ein Funnel von der Datenaufnahme bis zur Aktivierung in Data Cloud, ein Abschnitt zu Sicherheit und Code sowie bis zu 15 priorisierte Maßnahmen.

```staerken-grenzen
titel: Audit Snapshot of Org Health: guter Startpunkt, kein Gutachten
+ Nur lesend | Ändert nichts in der Org, kostet in der Beta nur Credits
+ Breite | Lizenzen, Data Cloud, Sicherheit und Code, bis zu 15 Maßnahmen *
- Lizenzart | Login-Daten zeigen nicht, ob eine günstigere Lizenz reicht
- Datenströme | Ob ein Strom nötig ist, ist eine Architekturentscheidung
- Absender | Der Bericht stammt vom Hersteller, der die Lizenzen verkauft
besser: Für Lizenzverhandlung und Zielarchitektur: Aufgaben der Nutzer und Datenflüsse unabhängig prüfen.
```

Aus meiner Pre-Sales-Arbeit mit Salesforce weiß ich, dass standardmäßig volle Lizenzen angeboten werden, auch für Nutzer, die nur lesen oder Datensätze freigeben. Bei großer Nutzerbasis sind das schnell sechsstellige Beträge pro Jahr. Ungenutzte Plätze zeigt der Health Check an; ob ein aktiver Nutzer eine günstigere Lizenzart bräuchte, zeigt erst der Blick auf seine Aufgaben, wie ich ihn bei [Make-or-Buy und Lizenzen](../../leistungen/make-or-buy-lizenzen/) mache. Was eine KI-gestützte Analyse vor einem Partnerwechsel leisten muss, beschreibe ich in [KI-Org-Analyse: technische Schulden vor dem Partnerwechsel](../ki-org-analyse-technische-schulden/).

## Erster Schritt: MeshMesh bis Ende Januar in einer Developer-Sandbox testen

Die Beta läuft voraussichtlich bis zum 31. Januar 2027. Das reicht für einen kleinen, sauberen Test, der Ihnen vor der allgemeinen Verfügbarkeit eine eigene Grundlage gibt. Die Dauer der Schritte ist mein Vorschlag für eine Org mittlerer Größe.

```schritte
Sandbox vorbereiten | 1 Woche · IT
  Developer-Sandbox mit Testdaten, eigener Integrationsnutzer, Datenschutz und Betriebsrat informiert.
Lesen und planen | 1 Woche · Architektur
  MeshMesh erstellt den Health Check und plant im Plan Mode zwei echte Stories.
Build per Branch | 2 Wochen · Entwicklung
  Der Build Mode schreibt in einen Branch, die Pipeline prüft, ein Mensch reviewt.
Bewerten | 1 Tag · IT-Leitung
  Zeit, Qualität und Review-Aufwand mit der bisherigen Umsetzung vergleichen.
```

Wählen Sie für den Test zwei Stories aus Ihrem Backlog, die Ihr Team bereits geschätzt hat, etwa eine Validierungsregel mit Ausnahmen und einen Flow mit Freigabe. Messen Sie MeshMesh dann an dieser Schätzung und am Aufwand für das Review, nicht an den bis zu 90 Prozent Zeitersparnis, die auf der Website stehen.
