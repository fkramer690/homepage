---
title: "Salesforce Well-Architected: Was das neue Framework ändert"
description: "Das Salesforce Well-Architected Framework hat seit September 2026 fünf Säulen und eine Agenten-Linse. Was sich geändert hat und wie Sie es im Projekt nutzen."
pubDate: 2026-10-23
lang: de
slug: salesforce-well-architected-framework-neu
translationKey: salesforce-well-architected-2026
topic: governance
category: architecture
tags: [Well-Architected, Architektur, Governance, Agentforce, Kosten]
takeaways:
  - "Salesforce hat Well-Architected nach der Dreamforce 2024 nicht mehr gepflegt, im August 2025 die Rückkehr angekündigt und am 14. September 2026 ein neues Framework veröffentlicht."
  - "Aus drei Säulen (Trusted, Easy, Adaptable) wurden fünf: Trust, Reliability, Operational Excellence, Resource and Cost Optimization und Fairness."
  - "Neu ist eine Agentic-Enterprise-Linse: Für jede Säule gibt es eine Agenten-Variante, und Agenten müssen dieselben Anforderungen erfüllen wie jede andere Lösung."
  - "Kosten sind jetzt eine eigene Säule, mit Lizenzen, Sandboxes und Make-or-Buy; für Kunden ist das die nützlichste Änderung."
  - "Das Framework ist eine gute gemeinsame Sprache für Design Reviews mit mehreren Partnern, die Abwägungen zwischen den Säulen muss aber der Kunde selbst treffen."
faq:
  - q: "Was ist das Salesforce Well-Architected Framework?"
    a: "Ein Leitfaden von Salesforce, nach dem Architekten Lösungen auf der Plattform entwerfen und prüfen. Es liefert Fragen, Muster und ein gemeinsames Vokabular und liegt kostenlos im Salesforce Architecture Center auf architect.salesforce.com."
  - q: "Welche fünf Säulen hat das neue Well-Architected Framework?"
    a: "Trust, Reliability, Operational Excellence, Resource and Cost Optimization und Fairness. Dazu kommt für jede Säule eine Variante für die Agentic Enterprise, also für Lösungen mit KI-Agenten."
  - q: "Was ist mit Trusted, Easy und Adaptable passiert?"
    a: "Die alten Inhalte sind in die fünf neuen Säulen gewandert. Salesforce dokumentiert die Zuordnung in einer eigenen Seite, dem Legacy Framework Mapping; einige alte Bereiche wurden dabei auf mehrere Säulen verteilt."
  - q: "Gibt es ein Tool, das eine Org gegen das Well-Architected Framework prüft?"
    a: "Ein automatischer Org-Check ist nicht Teil des Frameworks. Auf der Dreamforce 2026 hat Salesforce einen Architect Agent im Architecture Center gezeigt, der Architekturfragen auf Basis dieser Inhalte beantwortet; Verfügbarkeit und Preis hat Salesforce dabei nicht genannt."
  - q: "Ist das Well-Architected Framework nur für Agentforce gedacht?"
    a: "Nein. Die fünf Säulen gelten für jede Salesforce-Lösung. Die Agenten-Linse ergänzt sie für Agentforce und andere KI-Agenten, ersetzt sie aber nicht."
---

Das Salesforce Well-Architected Framework ist neu aufgebaut: Seit dem 14. September 2026 hat es fünf Säulen statt drei, nämlich Trust, Reliability, Operational Excellence, Resource and Cost Optimization und Fairness, dazu eine Linse für Lösungen mit KI-Agenten. Vorher war das Programm fast ein Jahr eingeschlafen. Für CIOs und CRM-Verantwortliche in der Fertigung ist vor allem eins neu: Kosten und Betrieb haben jetzt eigene Säulen. Damit taugt das Framework als gemeinsamer Maßstab für Design Reviews mit mehreren Umsetzungspartnern. Die Abwägungen zwischen den Säulen nimmt es Ihnen nicht ab.

## Was ist seit dem Relaunch passiert?

Die Geschichte ist kurz, aber sie erklärt, warum das Framework heute anders aussieht:

- **Nach der Dreamforce 2024** wurde die Website nicht mehr aktualisiert, wie [Salesforce Ben berichtete](https://www.salesforceben.com/salesforce-well-architected-set-to-return-community-news-and-validating-data-models/). Das Programm war faktisch eingestellt.
- **Am 8. August 2025** kündigten Chief Architect Emin Gerba und Christophe Coenraets im [Salesforce-Blog](https://www.salesforce.com/blog/relaunching-well-architected-program/) die Rückkehr an. Bemerkenswert offen: Viele Architekten hätten ihnen gesagt, das Ende sei ein Fehler gewesen.
- **Zur Dreamforce 2025, ab dem 13. Oktober,** ging das überarbeitete [Architecture Center](https://www.salesforce.com/blog/relaunching-salesforce-architecture-program/) online, mit neuen Decision Guides (etwa zu Data 360, Event-Driven Architecture und Asynchronous Processing) und neuen Grundlagen zu Agentforce und zur Agentic Enterprise. Am Framework selbst wurden nur Teile von Trusted und Adaptable aufgefrischt.
- **Am 14. September 2026** veröffentlichte Salesforce das [neue Well-Architected Framework](https://www.salesforce.com/blog/new-well-architected-framework/). Laut Salesforce haben Hunderte Architekten über Fokusgruppen, Umfragen und Community-Events mitgearbeitet.
- **Auf der Dreamforce 2026** kam laut [Salesforce Ben](https://www.salesforceben.com/new-well-architected-framework-and-agent-revealed-at-dreamforce-26/) ein Architect Agent dazu, ein KI-Assistent im Architecture Center, der auf diesen Inhalten aufsetzt.

Der eigentliche Umbau ist also die Version von September 2026. Der Relaunch 2025 hat vor allem die Plattform drumherum neu aufgestellt.

## Was hat sich am Well-Architected Framework geändert?

Das alte Framework hatte drei Säulen mit zusammen acht Eigenschaften: Trusted (secure, compliant, reliable), Easy (intentional, automated, engaging) und Adaptable (resilient, composable). Das neue [Framework](https://architect.salesforce.com/docs/architect/well-architected/guide/framework.html) hat fünf Säulen:

1. **Trust:** Sicherheit, Zugriff, Datenschutz, Data Governance und Integrationssicherheit.
2. **Reliability:** Verfügbarkeit, Wiederherstellung und Skalierung, inklusive Disaster Recovery und Lasttests.
3. **Operational Excellence:** Monitoring, DevOps, Automatisierung, Incident Management und laufende Verbesserung.
4. **Resource and Cost Optimization:** Codeorganisation, Packaging, Datenlebenszyklus, Performance, Make-or-Buy, Lizenzen und Sandboxes.
5. **Fairness:** Barrierefreiheit, Transparenz, Nichtdiskriminierung und KI-Ethik.

Salesforce hat die alten Inhalte nicht weggeworfen, sondern umsortiert. Die Seite [Legacy Framework Mapping](https://architect.salesforce.com/docs/architect/well-architected/guide/tea-pillar-mapping.html) zeigt, wohin was gewandert ist. Einige Beispiele: Monitoring lag früher unter Reliable und gehört jetzt zu Operational Excellence. Disaster Recovery lag unter Resilient und gehört jetzt zu Reliability. Business Value und ROI lagen unter Automated und gehören jetzt zu Resource and Cost Optimization. Barrierefreiheit und Datenschutzrechte stehen unter Fairness, rechtliche Vorgaben und Data Residency bleiben bei Trust. Messaging, Eventing und API-Management sind ganz aus dem Framework in die Integration Patterns gezogen.

![Wie die alten Well-Architected-Bereiche auf die fünf neuen Säulen verteilt wurden: Secure geht zu Trust. Reliable geht zu Reliability, Performance zu Resource and Cost Optimization, Monitoring zu Operational Excellence. Compliant geht zu Fairness, Recht und Data Residency bleiben bei Trust. Intentional und Automated gehen zu Operational Excellence, ROI und Wartbarkeit zu Resource and Cost Optimization. Engaging geht zu Fairness. Resilient geht zu Operational Excellence, Disaster Recovery zu Reliability. Composable geht zu Resource and Cost Optimization, Messaging, Eventing und APIs zu den Integration Patterns. Neu dazu kommt die Agentic-Enterprise-Linse für jede Säule.](../../../assets/blog/well-architected-mapping-de.png)

Auffällig ist, wie konkret die neuen Seiten geworden sind. Ein paar Beispiele aus dem Text:

- **Governor Limits:** Planen Sie im Normalbetrieb mit 70 Prozent der Limits als Obergrenze, damit Reserve für Lastspitzen bleibt.
- **Service Level:** Legen Sie das Ziel der eigenen Lösung unter das SLA der Plattform, etwa 99,5 Prozent bei 99,9 Prozent Plattform-SLA, damit ein Fehlerbudget bleibt.
- **Disaster Recovery:** RTO und RPO pro Fachfunktion festlegen, Backups regelmäßig zurückspielen, für kritische Systeme einmal im Jahr einen vollständigen Failover üben.
- **Multi-Org:** nur, wenn Geschäftsanforderungen den Mehraufwand rechtfertigen, etwa regulatorische Datentrennung.
- **DevOps:** DORA-Metriken messen (Deployment-Häufigkeit, Durchlaufzeit, Fehlerquote bei Änderungen, Wiederherstellungszeit, Nacharbeit) und regelmäßig prüfen, ob Produktion vom Stand in der Versionsverwaltung abweicht.
- **Barrierefreiheit:** Tests gegen WCAG 2.2 AA.

## Was bedeutet die Agentic-Enterprise-Linse?

Die zweite große Änderung ist die Agentic-Enterprise-Linse. Sie ist keine sechste Säule. Für jede der fünf Säulen gibt es eine Variante, die beschreibt, was zusätzlich gilt, wenn KI-Agenten eigenständig entscheiden und handeln: Berechtigungen und Prüfpfade für Agenten, Umgang mit Fehlern in der Orchestrierung mehrerer Agenten, der Agent Development Lifecycle, Token-Verbrauch und Nachvollziehbarkeit von Entscheidungen.

Der wichtigste Satz dazu steht im Ankündigungsblog: „Agents don't get their own rulebook." Ein Agent muss also dieselben Anforderungen an Sicherheit, Stabilität und Kosten erfüllen wie jede andere Lösung in Ihrer Org. Das passt zu meiner Haltung aus Agentforce-Projekten: Business Value und Datenqualität kommen vor dem Agenten. Mehr dazu in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/).

## Was ist für CIOs und CRM-Verantwortliche wirklich neu?

Aus Sicht eines Architekten auf Kundenseite sind drei Änderungen relevant.

**Kosten sind eine eigene Säule.** Im alten Framework tauchten Kosten nur am Rand auf. Jetzt stehen Lizenzen, Sandboxes und Make-or-Buy in einer eigenen Säule. Das ist überfällig. Aus meiner Pre-Sales-Arbeit mit Salesforce weiß ich, dass standardmäßig volle Lizenzen angeboten werden, obwohl viele Nutzer sie nicht brauchen. Bei einem Kunden sind das schnell sechsstellige Beträge pro Jahr. Eine Architekturprüfung, die das nicht ansieht, ist unvollständig.

**Betrieb steht gleichberechtigt neben dem Design.** Operational Excellence bündelt DevOps, Monitoring und Incident Management. Damit gehört der Betrieb in jede Architekturprüfung und nicht erst in die Zeit nach dem Go-live. Dass DORA-Metriken jetzt im offiziellen Framework stehen, gibt Kunden ein Argument gegenüber Partnern, die Deployments noch von Hand machen. Warum ich darauf bestehe, steht in [Warum DevOps in Salesforce-Enterprise-Projekten zählt](../warum-devops-salesforce-enterprise-projekte/).

**Das Framework benennt Zielkonflikte.** Mehr Verschlüsselung und Audit-Logs kosten Geld. Höhere Verfügbarkeit kostet Geld. Mehr Autonomie für Agenten erhöht das Risiko unfairer Entscheidungen. Salesforce schreibt dazu: „The goal is not to maximize every pillar simultaneously." Genau diese Abwägungen gehören in ein Entscheidungsprotokoll, und zwar mit Namen dessen, der entschieden hat.

## Wo hat das Framework Grenzen?

Bei aller Zustimmung: Es bleibt ein Herstellerdokument.

- **Es empfiehlt Salesforce-Werkzeuge.** Shield Platform Encryption, Event Monitoring und Field Audit Trail werden als Lösungen genannt. Diese Produkte sind lizenzpflichtige Zusatzprodukte. Ob sich das für Ihre Daten lohnt, gehört in die Kostensäule und nicht automatisch in die Trust-Säule.
- **Das Change Log hat keine Daten.** Es listet, was veröffentlicht oder erweitert wurde, aber nicht wann. Wer Architekturentscheidungen auf eine bestimmte Empfehlung stützt, sollte den Stand mit Datum im eigenen Entscheidungsprotokoll festhalten.
- **Der Architect Agent ist noch nicht greifbar.** Salesforce hat ihn auf der Dreamforce gezeigt, Verfügbarkeit und Preis aber nicht genannt. Ich würde ihn testen, bevor ich ihm Architekturfragen anvertraue.
- **Es ersetzt keine Entscheidung.** Das Framework liefert Fragen und Muster. Ob Sie 99,5 Prozent Verfügbarkeit brauchen oder 99, ob Sie Make oder Buy wählen, entscheidet Ihr Geschäftsmodell und nicht das Dokument.

## Wie nutze ich das Framework in einem Programm mit mehreren Partnern?

In meinem bisher größten Programm arbeiteten über 30 Entwickler in 8 Streams für 5 Umsetzungspartner in derselben Org. Wir haben rund drei Monate gebraucht, bis die gemeinsamen Standards standen: Namenskonventionen, eine Automatisierung pro Objekt, Vorgaben zur Testabdeckung, eine Matrix, welcher Stream welches Objekt verantwortet, und Regeln, was in Custom Metadata Types oder Custom Labels gehört. 80 Prozent standen nach der ersten Runde, der Rest kam über die Monate dazu.

Mit dem neuen Framework würde ich diese Standards heute entlang der fünf Säulen ordnen. Namenskonventionen, Packaging und Objektverantwortung sind Resource and Cost Optimization und Operational Excellence. Berechtigungen und Integrationsbenutzer sind Trust. Der Vorteil: Jeder Partner kennt das Framework, die Diskussion beginnt also nicht bei null, und Abweichungen lassen sich einer Säule zuordnen.

Konkret heißt das:

1. **Design Reviews nach Säulen gliedern.** Jeder Partner beantwortet für größere Änderungen dieselben fünf Fragenblöcke.
2. **Zielkonflikte protokollieren.** Wo eine Säule zugunsten einer anderen nachgibt, kommt das mit Begründung ins Entscheidungsprotokoll.
3. **Agenten nicht separat behandeln.** Agentforce-Vorhaben laufen durch dasselbe Review, ergänzt um die Agenten-Variante jeder Säule.
4. **Kostensäule ernst nehmen.** Lizenzen und Sandboxes jährlich gegen die tatsächliche Nutzung prüfen.

Wie ich Standards und Reviews in solchen Programmen aufsetze, gehört zu meiner [Arbeit an Partnersteuerung und Architektur](../../leistungen/partnersteuerung/).

## Wo sollten Sie anfangen?

Lesen Sie die [Übersicht im Architecture Center](https://architect.salesforce.com/docs/architect/well-architected/guide/overview.html) und das Legacy Mapping, wenn Ihre Teams noch mit Trusted, Easy und Adaptable arbeiten. Prüfen Sie dann Ihre bestehenden Entwicklungsstandards gegen die fünf Säulen. Meist fehlen Kosten und Betrieb. Das neue Well-Architected Framework ist ein brauchbarer gemeinsamer Maßstab, solange Sie die Entscheidungen selbst treffen. Wenn Sie Ihre Org oder Ihre Partnerstandards dagegen prüfen möchten, [schreiben Sie mir](#contact).
