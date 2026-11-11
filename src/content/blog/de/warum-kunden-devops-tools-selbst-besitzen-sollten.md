---
title: "Warum Kunden ihre DevOps-Tools selbst besitzen sollten"
description: "Git-Repository, Pipeline, Jira, Miro: warum der Kunde und nicht der Umsetzungspartner die Arbeitsbereiche, Lizenzen und Zugriffsrechte kontrollieren sollte."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: warum-kunden-devops-tools-selbst-besitzen-sollten
translationKey: client-owned-devops-tools
topic: ownership
categories: [devops]
tags: [Partnersteuerung, DevOps, Jira, Vendor Lock-in, Berechtigungsmanagement]
takeaways:
  - "Arbeitsbereiche, Lizenzen, Admin-Rechte und Zugriffe gehören dem Kunden, vom Git-Repository und der Pipeline bis zu Jira, Confluence und Miro."
  - "Tools zu besitzen heißt nicht, eigene Server zu betreiben: Cloud-Dienste sind in Ordnung, solange Arbeitsbereich und Admin-Rechte beim Kunden liegen."
  - "Partner erhalten persönliche Zugriffe mit Rollen passend zu ihrer Aufgabe, für die Dauer der Zusammenarbeit, und ihre Arbeit bleibt in den Systemen des Kunden."
  - "Partnereigene Tools schaffen Abhängigkeiten, erschweren Partnervergleiche und gefährden Historie, Dokumentation und Entscheidungen am Ende der Zusammenarbeit."
  - "Kundeneigene Tools einzurichten ist am Anfang wenig Aufwand verglichen mit einer späteren Korrektur bei einem Partnerausstieg."
faq:
  - q: "Müssen Kunden ihre DevOps-Tools auf eigenen Servern betreiben?"
    a: "Nein. Cloud-Dienste wie GitHub, GitLab, Jira oder Miro sind in Ordnung. Entscheidend ist, dass Arbeitsbereich, Daten, Admin-Rechte und, soweit das Lizenzmodell es zulässt, der Vertrag beim Kunden liegen und nicht bei einem Umsetzungspartner."
  - q: "Warum ist es ein Problem, wenn die Jira-Site oder der Git-Arbeitsbereich dem Partner gehört?"
    a: "Dann hängt der Kunde bei Zugriffen, Historie und Dokumentation vom Partner ab. Endet die Zusammenarbeit oder steigt ein zweiter Partner ein, müssen Daten migriert werden oder gehen verloren. Außerdem lassen sich Partner nur schwer vergleichen."
  - q: "Welche Tools sollten dem Kunden gehören?"
    a: "Alles, was Projektwissen enthält oder Releases steuert: Salesforce-Orgs und Dev Hub, Git-Repository, CI/CD-Pipeline, Jira, Confluence, Miro, Passwort-Tresore, Integrationsuser und Zertifikate sowie Nebentools, in denen sich Wissen sammelt, etwa Chat-Kanäle und Arbeitsbereiche für API-Tests."
  - q: "Wie sollten Partner Zugriff erhalten?"
    a: "Über persönliche, benannte Identitäten in den Tools des Kunden, meist über eigene Accounts, die in den Arbeitsbereich des Kunden eingeladen werden. Die Rollen passen zur Aufgabe, und der Zugriff endet mit der Zusammenarbeit. Der Kunde muss diesen Zugriff selbst vergeben und entziehen können. Geteilte oder anonyme Accounts sollten tabu sein."
---

Kunden sollten ihre Salesforce-DevOps-Tools selbst besitzen, denn wer Arbeitsbereiche, Lizenzen und Zugriffsrechte kontrolliert, kontrolliert das Projekt. Das gilt für Git-Repository und CI/CD-Pipeline genauso wie für Jira, Confluence und Miro. Selbst besitzen heißt nicht, eigene Server zu betreiben. Cloud-Dienste sind in Ordnung, solange Arbeitsbereiche und Admin-Rechte dem Kunden gehören und auch über jede Partnerschaft hinaus beim Kunden bleiben. Partner erhalten persönliche Zugänge mit den Rechten, die sie für ihre Aufgabe brauchen.

## Was heißt es, die eigenen DevOps-Tools zu besitzen?

Tools zu besitzen heißt, die Schlüssel in der Hand zu halten, egal wo die Software läuft. In der Praxis bedeutet das:

- **Die Verträge und Lizenzen** für jedes Tool lauten auf den Namen des Kunden, soweit das Lizenzmodell dies zulässt. In jedem Fall behält der Kunde die administrative Kontrolle, den Datenzugriff und die Ausstiegsrechte.
- Die **Admin-Rechte** liegen bei Mitarbeitenden des Kunden, nicht nur bei Partnern.
- Der **Arbeitsbereich** (die GitHub-Organisation, die Jira-Instanz, das Miro-Team) gehört dem Kunden.
- **Partner werden eingeladen** in den Arbeitsbereich des Kunden, nicht umgekehrt.

Eine leere GitHub-Organisation, eine Jira-Cloud-Instanz oder ein Miro-Team lassen sich an einem Nachmittag anlegen. Keine eigenen Server, kein Infrastrukturprojekt. Sie mit Single Sign-on, Rollen und den Sicherheitsregeln des Kunden produktionsreif zu machen, braucht gezielte Vorbereitung. Der entscheidende Unterschied liegt aber darin, auf wessen Namen der Arbeitsbereich registriert ist und wer Zugriffe vergeben und entziehen kann.

![Was wem in einem Salesforce-Programm gehört: Der Kunde besitzt Accounts, Lizenzen und Admin-Rechte, Git-Repository und CI/CD-Pipeline, Jira-, Confluence- und Miro-Bereiche, Salesforce-Orgs, Sandboxes und Dev Hub sowie Secrets, Integrationsuser und Zertifikate. Der Kunde vergibt und entzieht Zugriffe. Der Partner erhält persönliche, namentlich zugeordnete Benutzerkonten und auf die Aufgabe beschränkte Rollen. Sein Zugriff gilt nur für die Dauer der Zusammenarbeit, und die Arbeit bleibt in den Systemen des Kunden. Verlässt ein Partner das Projekt, wird der Zugriff entzogen und nichts muss migriert werden.](../../../assets/blog/tool-ownership-de.png)

## Um welche Tools geht es?

In einem typischen Salesforce-Programm verteilen sich Projektwissen und Kontrolle auf mehr Tools, als vielen bewusst ist:

1. **Salesforce-Orgs, Sandboxes und Dev Hub.** Sie gehören meist schon dem Kunden. Prüfen Sie aber, wer die Systemadministrator-Accounts hält und ob es sich um persönliche Accounts handelt. Der Dev Hub braucht besondere Aufmerksamkeit: Er besitzt Scratch-Orgs, Paketversionen und Namespaces. Für kundenspezifische Pakete gehört er deshalb in die Produktions-Org des Kunden und nicht in eine Developer Edition oder Trial-Org eines Partners.
2. **Git-Repository und CI/CD-Pipeline.** Das Repository enthält die Historie jeder Änderung. Die Pipeline entscheidet, was in die Produktion gelangt. Warum beides unverzichtbar ist, erkläre ich im Artikel [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/).
3. **Jira oder Azure Boards.** Sie enthalten User Stories, Akzeptanzkriterien, Fehler und Entscheidungen. Ohne sie kann später niemand erklären, warum etwas so gebaut wurde.
4. **Confluence oder ein Wiki.** Dort liegen Architekturentscheidungen, Schnittstellenbeschreibungen und Betriebshandbücher.
5. **Miro oder ähnliche Whiteboards.** Dort liegen Prozesslandkarten, Datenmodelle und Workshop-Ergebnisse. Oft ist dies der einzige Ort, an dem das Zielbild je gezeichnet wurde.
6. **Secrets und technische Benutzer.** Dazu gehören Integrationsuser, Zertifikate, API-Schlüssel und der Passwort-Tresor, in dem sie liegen.

Jedes dieser Tools kann im Account eines Partners enden, ohne dass jemand diese Entscheidung bewusst getroffen hat. Ein Partner startet schnell, nutzt seine eigene Jira-Instanz und seine eigene Git-Organisation, und ein Jahr später liegt die Projekthistorie des Kunden im System eines Dritten.

## Was geht schief, wenn der Partner die Tools besitzt?

Solange die Zusammenarbeit gut funktioniert, merkt es niemand. Die Probleme zeigen sich, wenn sich etwas ändert:

- **Die Zusammenarbeit endet.** Daten müssen exportiert und migriert werden. Je nach Tool und Migrationsweg können Konfigurationen, App-Daten, Verknüpfungen oder Versionshistorien verloren gehen. Manchmal hat der Export bei einem scheidenden Partner schlicht keine Priorität.
- **Ein zweiter Partner steigt ein.** Dann braucht der neue Partner Zugriff auf den Arbeitsbereich eines Wettbewerbers, oder es entsteht ein zweiter Satz Tools. Standards entwickeln sich auseinander, und die Teams überschreiben gegenseitig ihre Arbeit.
- **Partner sind schwer vergleichbar.** Besitzt ein Partner Repository und Pipeline, besitzt er auch den Release-Prozess, und alle anderen Partner arbeiten nach seinen Regeln.
- **Menschen gehen.** Ist der einzige Admin eines Tools ein Mitarbeiter des Partners, der den Job wechselt, hat sogar der Partner Schwierigkeiten, die Kontrolle zurückzubekommen.
- **Sicherheit und Compliance.** Der Kunde kann einfache Audit-Fragen nicht beantworten: Wer hat Zugriff auf unseren Quellcode, unsere Anforderungen, unsere Zugangsdaten?

```vergleich
ohne: Tools beim Partner
- Beim Wechsel können Konfiguration, Verknüpfungen und Historie im Export verloren gehen.
- * Mit dem Partner gehen Repository, Backlog und Begründungen.
- Der einzige Admin eines Tools arbeitet beim Partner.
mit: Tools beim Kunden
- Ein scheidender Partner übergibt Wissen, keine Systeme.
- * Repository, Backlog und Entscheidungen bleiben im Unternehmen.
- Der Kunde beantwortet Audit-Fragen zu Zugriffen selbst.
zitat: Partner kommen und gehen. Repository, Backlog und Architekturentscheidungen sollten bleiben.
```

Das ist kein Vorwurf an Partner. Professionelle Partner können in einer vom Kunden kontrollierten Toolchain arbeiten, wenn diese gut nutzbar ist und die Verantwortung klar geregelt ist. So können sie geordnet aussteigen, und ihre Arbeit bleibt sichtbar. Der Besitz der Tools ersetzt keine vertraglichen Rechte an den Arbeitsergebnissen. Beides gehört in den Vertrag.

## Eigene Tools machen Partner vergleichbar und austauschbar

Als [Architekt auf Kundenseite](../../#about) ist eines meiner wichtigsten Ziele, Umsetzungspartner vergleichbar und austauschbar zu halten. Das funktioniert nur, wenn die Grundlagen dem Kunden gehören: Repository, Pipeline, Backlog und Dokumentation. Dann lässt sich ein neuer Partner in ein bekanntes Setup mit schriftlichen Standards einarbeiten. Ein scheidender Partner übergibt weiterhin Wissen, offene Risiken und laufende Aufgaben, aber niemand muss Repositories oder Backlogs aus seinen Systemen herauslösen. Partner zu vergleichen erfordert außerdem gemeinsame Lieferstandards und Kennzahlen.

Eigene Tools sind auch die Voraussetzung dafür, interne Verantwortung aufzubauen. In dem Programm, das ich in meinem DevOps-Artikel beschreibe, wurde der Release-Prozess am Ende an einen internen Kollegen übergeben. Eine solche Übergabe ist nur realistisch, wenn Tools und Rechte bereits auf Kundenseite liegen. Sonst erbt die interne Person einen Prozess, der weiter an fremden Accounts hängt. Der Besitz der Tools ist die Grundlage guter [Partnersteuerung und Governance](../../leistungen/partnersteuerung/).

## Regeln für die Praxis, bevor der erste Partner startet

Diese Regeln haben sich bewährt und sollten möglichst gelten, bevor der erste Umsetzungspartner startet:

1. **Der Kunde legt die Arbeitsbereiche an.** GitHub- oder GitLab-Organisation, Jira- und Confluence-Instanz, Miro-Team: Alles wird vom Kunden eingerichtet, mit Lizenzen im Vertrag des Kunden.
2. **Mindestens zwei Admins des Kunden pro Tool.** Es sollte nie nur einen einzelnen Admin geben und nie ausschließlich Partner als Admins. Dazu kommt ein getestetes Verfahren für den Notfall. Weitreichende Admin-Rechte gibt es nur, wenn zeitlich begrenzte Rechte nicht ausreichen.
3. **Nur persönliche, benannte Identitäten.** Jeder Mitarbeitende eines Partners erhält eine eigene Identität, meist einen eigenen Account, der in den Arbeitsbereich des Kunden eingeladen wird. Keine geteilten Logins, damit Zugriffe nachvollziehbar sind und einzeln entzogen werden können.
4. **Rollen passend zur Aufgabe.** Entwickler erhalten Schreibrechte auf das Repository, keine Admin-Rechte auf die Organisation. Änderungen an Pipeline-Sicherheit und Branch-Schutz brauchen die Zustimmung des Kunden, auch wenn ein autorisierter Spezialist des Partners sie ausführt.
5. **Starke Authentifizierung.** Admins auf beiden Seiten verwenden phishingresistente MFA. In Salesforce ist das seit Juli 2026 für privilegierte Benutzer verpflichtend, in Produktionsumgebungen und Sandboxes sowie bei Single Sign-on.
6. **Zugriffe haben ein Enddatum.** Partner-Accounts werden regelmäßig überprüft und entfernt, wenn die Zusammenarbeit oder die Rolle der Person endet.
7. **Secrets bleiben im Tresor des Kunden.** Jede Integration hat einen eigenen, vom Kunden verwalteten Integrationsuser mit minimalen Rechten. Zugangsdaten und Schlüssel werden erneuert, wenn Mitarbeitende eines Partners darauf Zugriff hatten.
8. **Im Vertrag festhalten.** Die Leistungsbeschreibung regelt, dass alle Arbeitsergebnisse, auch Code, Tickets und Dokumentation, in den Tools des Kunden entstehen und wer die Rechte daran hat.

```hinweis tipp
Besitzt ein Partner bereits einige der Tools, planen Sie den Umzug früh und in einer ruhigen Phase, nicht während eines Ausstiegs. Die Git-Historie selbst lässt sich meist leicht migrieren. Berechtigungen, Branch-Regeln, Secrets, Runner und Webhooks brauchen eine Bestandsaufnahme und einen Test. Jira und Miro brauchen mehr Planung, lassen sich aber jetzt immer noch deutlich günstiger umziehen als später.
```

## Alle Tools mit Vertrag und Admins auflisten

Erstellen Sie eine einfache Liste mit jedem Tool im Projekt, dem Vertragsinhaber, den Admins, den zugriffsberechtigten Mitarbeitenden von Partnern, den Exportmöglichkeiten für Daten und dem Datum der letzten Zugriffsprüfung. Nehmen Sie auch Nebentools wie Chat-Kanäle des Partners und Arbeitsbereiche für API-Tests auf. In vielen Programmen zeigt schon diese Liste, wo die Risiken liegen. Legen Sie für jeden Eintrag, bei dem ein Partner den Vertrag hält oder die Admin-Rechte besitzt, einen Termin fest, bis zu dem Vertrag oder Admin-Rechte auf Sie übertragen werden.
