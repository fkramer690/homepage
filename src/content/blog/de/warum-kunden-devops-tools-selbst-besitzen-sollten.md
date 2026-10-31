---
title: "Warum Kunden ihre DevOps-Tools selbst besitzen sollten"
description: "Git-Repository, Pipeline, Jira, Miro: warum der Kunde und nicht der Umsetzungspartner die Accounts, Lizenzen und Zugriffsrechte eines Projekts halten sollte."
pubDate: 2026-10-23
lang: de
slug: warum-kunden-devops-tools-selbst-besitzen-sollten
translationKey: client-owned-devops-tools
topic: ownership
categories: [devops]
tags: [Partnersteuerung, DevOps, Jira, Vendor Lock-in, Berechtigungsmanagement]
takeaways:
  - "Accounts, Lizenzen und Zugriffsrechte gehören dem Kunden, vom Git-Repository und der Pipeline bis zu Jira, Confluence und Miro."
  - "Tools zu besitzen heißt nicht, eigene Server zu betreiben: Cloud-Dienste sind in Ordnung, solange Arbeitsbereich und Admin-Rechte beim Kunden liegen."
  - "Partner erhalten persönliche Benutzer mit Rollen passend zu ihrer Aufgabe, für die Dauer der Zusammenarbeit, und ihre Arbeit bleibt in den Systemen des Kunden."
  - "Tools im Besitz eines Partners schaffen Abhängigkeit, machen Partner schwer vergleichbar und gefährden die Historie beim Partnerwechsel."
  - "Kundeneigene Tools einzurichten kostet am Anfang wenig und ist später sehr teuer nachzuholen."
faq:
  - q: "Müssen Kunden ihre DevOps-Tools auf eigenen Servern betreiben?"
    a: "Nein. Cloud-Dienste wie GitHub, GitLab, Jira oder Miro sind in Ordnung. Entscheidend ist, dass Arbeitsbereich, Lizenzen und Admin-Rechte dem Kunden gehören und nicht einem Umsetzungspartner."
  - q: "Warum ist es ein Problem, wenn der Partner Jira oder das Git-Repository besitzt?"
    a: "Dann hängt der Kunde für Zugriff, Historie und Dokumentation vom Partner ab. Endet die Zusammenarbeit oder kommt ein zweiter Partner dazu, müssen Daten migriert werden oder gehen verloren."
  - q: "Welche Tools sollten dem Kunden gehören?"
    a: "Alles, was Projektwissen enthält oder Releases steuert: Salesforce-Orgs und Dev Hub, Git-Repository, CI/CD-Pipeline, Jira, Confluence, Miro, Passwort-Tresore, Integrationsuser und Zertifikate."
  - q: "Wie sollten Partner Zugriff erhalten?"
    a: "Über persönliche, benannte Benutzer in den Tools des Kunden, mit Rollen passend zur Aufgabe und einem Zugriff, der mit der Zusammenarbeit endet. Geteilte oder anonyme Accounts sollten tabu sein."
---

Kunden sollten ihre Salesforce-DevOps-Tools selbst besitzen, denn wer Accounts, Lizenzen und Zugriffsrechte kontrolliert, kontrolliert das Projekt. Das gilt für Git-Repository und CI/CD-Pipeline genauso wie für Jira, Confluence und Miro. Selbst besitzen heißt nicht, eigene Server zu betreiben. Cloud-Dienste sind in Ordnung, solange Arbeitsbereiche und Admin-Rechte dem Kunden gehören und auch über jede Partnerschaft hinaus beim Kunden bleiben. Partner bekommen persönliche Benutzer mit den Rechten, die sie für ihre Aufgabe brauchen.

## Was heißt es, die eigenen DevOps-Tools zu besitzen?

Tools zu besitzen heißt, die Schlüssel in der Hand zu halten, egal wo die Software läuft. In der Praxis bedeutet das:

- **Vertrag und Lizenzen** jedes Tools laufen auf den Kunden,
- die **Admin-Rechte** liegen bei Mitarbeitenden des Kunden, nicht nur bei Partnern,
- der **Arbeitsbereich** (die GitHub-Organisation, die Jira-Instanz, das Miro-Team) gehört dem Kunden,
- **Partner werden eingeladen** in den Arbeitsbereich des Kunden, nicht umgekehrt.

Eine GitHub-Organisation, eine Jira-Cloud-Instanz oder ein Miro-Team sind an einem Nachmittag eingerichtet. Keine eigenen Server, kein Infrastrukturprojekt. Der Unterschied liegt nur darin, auf wessen Namen der Account läuft und wer Zugriffe vergeben und entziehen kann.

![Wem was in einem Salesforce-Programm gehört: Der Kunde besitzt Accounts, Lizenzen und Admin-Rechte, Git-Repository und CI/CD-Pipeline, Jira-, Confluence- und Miro-Bereiche, Salesforce-Orgs, Sandboxes und Dev Hub sowie Secrets, Integrationsuser und Zertifikate. Der Kunde vergibt und entzieht Zugriffe. Der Partner erhält persönliche, benannte Benutzer, Rollen passend zur Aufgabe und Zugriff nur für die Zusammenarbeit, die Arbeit bleibt in Kundensystemen. Verlässt ein Partner das Projekt, wird der Zugriff entzogen und nichts muss migriert werden.](../../../assets/blog/tool-ownership-de.png)

## Um welche Tools geht es?

In einem typischen Salesforce-Programm verteilt sich Projektwissen und Kontrolle auf mehr Tools, als vielen bewusst ist:

1. **Salesforce-Orgs, Sandboxes und Dev Hub.** Sie gehören meist schon dem Kunden. Prüfen Sie aber, wer die Systemadministrator-Accounts hält und ob sie persönlich sind.
2. **Git-Repository und CI/CD-Pipeline.** Das Repository ist die Historie jeder Änderung, die Pipeline entscheidet, was in die Produktion kommt. Warum beides unverzichtbar ist, erkläre ich im Artikel [warum DevOps über Salesforce-Großprojekte entscheidet](../warum-devops-salesforce-enterprise-projekte/).
3. **Jira oder Azure Boards.** User Stories, Akzeptanzkriterien, Fehler und Entscheidungen. Ohne sie kann später niemand erklären, warum etwas so gebaut wurde.
4. **Confluence oder ein Wiki.** Architekturentscheidungen, Schnittstellenbeschreibungen, Betriebshandbücher.
5. **Miro oder ähnliche Whiteboards.** Prozesslandkarten, Datenmodelle und Workshop-Ergebnisse, oft der einzige Ort, an dem das Zielbild je gezeichnet wurde.
6. **Secrets und technische Benutzer.** Integrationsuser, Zertifikate, API-Schlüssel und der Passwort-Tresor, in dem sie liegen.

Jedes dieser Tools kann im Account eines Partners landen, ohne dass es jemand entschieden hat. Ein Partner startet schnell, nutzt seine eigene Jira-Instanz und seine eigene Git-Organisation, und ein Jahr später liegt die Projekthistorie des Kunden im System eines anderen.

## Was geht schief, wenn der Partner die Tools besitzt?

Solange die Zusammenarbeit gut läuft, merkt es niemand. Die Probleme zeigen sich, wenn sich etwas ändert:

- **Die Zusammenarbeit endet.** Daten müssen exportiert und migriert werden. Kommentare, Verknüpfungen, Anhänge und Historie gehen oft verloren. Manchmal hat der Export für einen scheidenden Partner schlicht keine Priorität.
- **Ein zweiter Partner kommt dazu.** Dann braucht der neue Partner Zugriff auf den Arbeitsbereich eines Wettbewerbers, oder es entsteht ein zweiter Satz Tools. Standards driften auseinander und Teams überschreiben sich gegenseitig.
- **Partner sind nicht vergleichbar.** Besitzt ein Partner Repository und Pipeline, besitzt er auch den Release-Prozess, und alle anderen Partner arbeiten nach seinen Regeln.
- **Menschen gehen.** Ist der einzige Admin eines Tools ein Mitarbeiter des Partners, der den Job wechselt, tut sich sogar der Partner schwer, die Kontrolle zurückzubekommen.
- **Sicherheit und Compliance.** Der Kunde kann einfache Audit-Fragen nicht beantworten: Wer hat Zugriff auf unseren Quellcode, unsere Anforderungen, unsere Zugangsdaten?

> Partner kommen und gehen. Repository, Backlog und Architekturentscheidungen sollten bleiben.

Das ist kein Vorwurf an Partner. Die meisten guten Partner arbeiten lieber in den Tools des Kunden, weil das ihren eigenen Ausstieg sauber und ihre Arbeit sichtbar macht.

## Eigene Tools machen Partner vergleichbar und austauschbar

Sehr viel. Als [Architekt auf Kundenseite](../../#about) ist eines meiner wichtigsten Ziele, Umsetzungspartner vergleichbar und austauschbar zu halten. Das funktioniert nur, wenn die Grundlagen dem Kunden gehören: Repository, Pipeline, Backlog und Dokumentation. Dann lässt sich ein neuer Partner in ein bekanntes Setup mit schriftlichen Standards einarbeiten, und ein scheidender Partner gibt nichts weiter ab als seine Benutzer.

Es ist auch die Voraussetzung, um internes Ownership aufzubauen. In dem Programm, das ich in meinem DevOps-Artikel beschreibe, wurde der Release-Prozess am Ende an einen internen Kollegen übergeben. Eine solche Übergabe ist nur realistisch, wenn Tools und Rechte bereits auf Kundenseite liegen. Sonst erbt die interne Person einen Prozess, der weiter an fremden Accounts hängt. Der Besitz der Tools ist die Grundlage guter [Partnersteuerung und Governance](../../leistungen/partnersteuerung/).

## Regeln für die Praxis, bevor der erste Partner startet

Am besten, bevor der erste Partner startet. Diese Regeln haben sich bewährt:

1. **Der Kunde legt die Arbeitsbereiche an.** GitHub- oder GitLab-Organisation, Jira- und Confluence-Instanz, Miro-Team: alles vom Kunden eingerichtet, mit Lizenzen im Vertrag des Kunden.
2. **Mindestens zwei Admins des Kunden pro Tool.** Nie ein einzelner Admin und nie nur Partner.
3. **Nur persönliche, benannte Accounts.** Jeder Mitarbeitende eines Partners bekommt einen eigenen Benutzer. Keine geteilten Logins, damit Zugriffe nachvollziehbar sind und einzeln entzogen werden können.
4. **Rollen passend zur Aufgabe.** Entwickler bekommen Schreibrechte auf das Repository, keine Admin-Rechte auf die Organisation. Pipeline- und Branch-Schutz-Einstellungen bleiben dem Kunden vorbehalten.
5. **Zugriffe haben ein Enddatum.** Partner-Accounts werden regelmäßig überprüft und entfernt, wenn die Zusammenarbeit oder die Rolle der Person endet.
6. **Secrets bleiben im Tresor des Kunden.** Integrationsuser und Zertifikate gehören dem Kunden und werden beim Partnerwechsel erneuert.
7. **Im Vertrag festhalten.** Die Leistungsbeschreibung regelt, dass alle Arbeitsergebnisse, auch Code, Tickets und Dokumentation, in den Tools des Kunden entstehen.

```hinweis tipp
Besitzt ein Partner bereits einige der Tools, planen Sie den Umzug früh und in einer ruhigen Phase, nicht während eines Ausstiegs. Ein Repository lässt sich mit voller Historie an einem Tag umziehen. Jira und Miro brauchen mehr Planung, sind aber jetzt immer noch deutlich günstiger umzuziehen als später.
```

## Alle Tools mit Vertrag und Admins auflisten

Machen Sie eine einfache Liste: jedes Tool im Projekt, wer den Vertrag hält, wer die Admins sind und welche Mitarbeitenden von Partnern Zugriff haben. In vielen Programmen zeigt schon diese Liste, wo die Risiken liegen. Jede Zeile, in der ein Partner den Vertrag oder die Admin-Rechte hält, bekommt ein Datum, bis zu dem sie auf Sie übertragen ist.
