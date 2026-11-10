---
title: "Salesforce Well-Architected: Was das neue Framework ändert"
metaTitle: "Salesforce Well-Architected 2026: 5 Säulen und Checkliste"
description: "Fünf Säulen statt Trusted, Easy und Adaptable: wohin die alten Inhalte gewandert sind, welche Zahlen Sie vorsichtig lesen sollten und eine Review-Agenda."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: de
slug: salesforce-well-architected-framework-neu
translationKey: salesforce-well-architected-2026
topic: governance
categories: [architecture]
tags: [Well-Architected, Architektur, Governance, Agentforce, Kosten]
takeaways:
  - "Nach der Dreamforce 2024 aktualisierte Salesforce Well-Architected nicht mehr. Im August 2025 folgte die Ankündigung, am 14. September 2026 das neue Framework."
  - "Aus drei Säulen (Trusted, Easy, Adaptable) wurden fünf: Trust, Reliability, Operational Excellence, Resource and Cost Optimization und Fairness."
  - "Neu ist eine Agentic-Enterprise-Linse: Für jede Säule gibt es eine Agenten-Variante, und Agenten müssen dieselben Anforderungen erfüllen wie jede andere Lösung."
  - "Kosten stecken jetzt in einer eigenen Säule, Resource and Cost Optimization, mit Lizenzen, Sandboxes und Make-or-Buy. Für Kunden ist das am nützlichsten."
  - "Das Framework ist eine gute gemeinsame Sprache für Design Reviews mit mehreren Partnern, die Abwägungen zwischen den Säulen trifft aber der Kunde."
faq:
  - q: "Was ist das Salesforce Well-Architected Framework?"
    a: "Ein Leitfaden von Salesforce, nach dem Architekten Lösungen auf der Plattform entwerfen und prüfen. Es liefert Fragen, Muster und ein gemeinsames Vokabular und liegt kostenlos im Salesforce Architecture Center auf architect.salesforce.com."
  - q: "Welche fünf Säulen hat das neue Well-Architected Framework?"
    a: "Trust, Reliability, Operational Excellence, Resource and Cost Optimization und Fairness. Dazu kommt für jede Säule eine Variante für die Agentic Enterprise, also für Lösungen mit KI-Agenten."
  - q: "Was ist mit Trusted, Easy und Adaptable passiert?"
    a: "Salesforce hat die meisten alten Inhalte auf die fünf neuen Säulen verteilt und dokumentiert die Zuordnung auf der Seite Legacy Framework Mapping. Einige Bereiche wurden auf mehrere Säulen aufgeteilt, Messaging, Eventing und API-Management wurden vollständig in die Integration Patterns verschoben."
  - q: "Gibt es ein Tool, das eine Org anhand des Well-Architected Frameworks prüft?"
    a: "Eine einzelne automatische Prüfung mit dem Ergebnis „bestanden“ oder „nicht bestanden“ gehört nicht zum Framework. Werkzeuge wie Health Check, Scale Center und Event Monitoring decken einzelne Bereiche ab, ein vollständiges Review braucht aber Geschäftsziele, Architekturnachweise und Entscheidungen von Menschen. Auf der Dreamforce 2026 hat Salesforce zudem einen Architect Agent gezeigt, der Architekturfragen auf Basis dieser Inhalte beantwortet. Verfügbarkeit und Preis nannte Salesforce nicht."
  - q: "Ist das Well-Architected Framework nur für Agentforce gedacht?"
    a: "Nein. Die fünf Säulen gelten für jede Salesforce-Lösung. Die Agenten-Linse ergänzt sie für Agentforce und andere KI-Agenten, ersetzt sie aber nicht."
---

Das Salesforce Well-Architected Framework ist neu aufgebaut: Seit dem 14. September 2026 hat es fünf Säulen statt drei, nämlich Trust, Reliability, Operational Excellence, Resource and Cost Optimization und Fairness, dazu eine Linse für Lösungen mit KI-Agenten. Die meisten Inhalte aus Trusted, Easy und Adaptable sind in diese Säulen umsortiert. Für CIOs und CRM-Verantwortliche in der Fertigung ist vor allem eins neu: Kosten und Betrieb haben jetzt eigene Säulen. Damit taugt das Framework als gemeinsamer Maßstab für Design Reviews mit mehreren Umsetzungspartnern. Die Abwägungen nimmt es Ihnen nicht ab; unten zeige ich, wie ich ein solches Review führe.

## Was ist seit dem Relaunch passiert?

Die Geschichte ist kurz, aber sie erklärt, warum das Framework heute anders aussieht:

- **Nach der Dreamforce 2024** wurde die Website nicht mehr aktualisiert, wie [Salesforce Ben berichtete](https://www.salesforceben.com/salesforce-well-architected-set-to-return-community-news-and-validating-data-models/). Das Programm war faktisch eingestellt.
- **Am 8. August 2025** kündigten Chief Architect Emin Gerba und Christophe Coenraets im [Salesforce-Blog](https://www.salesforce.com/blog/relaunching-well-architected-program/) die Rückkehr an. Bemerkenswert offen war die Aussage: Viele Architekten hätten ihnen gesagt, das Ende sei ein Fehler gewesen.
- **Zur Dreamforce 2025 im Oktober** ging das überarbeitete [Architecture Center](https://www.salesforce.com/blog/relaunching-salesforce-architecture-program/) online, mit neuen Decision Guides (etwa zu Data 360, Event-Driven Architecture und Asynchronous Processing) und neuen Grundlagen zu Agentforce und zur Agentic Enterprise. Am Framework selbst wurden nur Teile von Trusted und Adaptable aufgefrischt.
- **Am 14. September 2026** veröffentlichte Salesforce das [neue Well-Architected Framework](https://www.salesforce.com/blog/new-well-architected-framework/). Laut Salesforce haben Hunderte Architekten in Fokusgruppen, Umfragen und Community-Events mitgearbeitet.
- **Auf der Dreamforce 2026** stellte Salesforce laut [Salesforce Ben](https://www.salesforceben.com/new-well-architected-framework-and-agent-revealed-at-dreamforce-26/) zusätzlich einen Architect Agent vor, einen KI-Assistenten im Architecture Center, der auf diesen Inhalten aufsetzt.

Der eigentliche Umbau ist also die Version von September 2026. Der Relaunch 2025 hat vor allem die Plattform drumherum neu aufgestellt.

## Was hat sich am Well-Architected Framework geändert?

Das alte Framework hatte drei Säulen mit zusammen acht Eigenschaften: Trusted (secure, compliant, reliable), Easy (intentional, automated, engaging) und Adaptable (resilient, composable). Das neue [Framework](https://architect.salesforce.com/docs/architect/well-architected/guide/framework.html) hat fünf Säulen:

1. **Trust:** Sicherheit, Zugriff, Datenschutz, Data Governance und Integrationssicherheit.
2. **Reliability:** Verfügbarkeit, Wiederherstellung und Skalierung, inklusive Disaster Recovery und Lasttests.
3. **Operational Excellence:** Monitoring, DevOps, Automatisierung, Incident Management und laufende Verbesserung.
4. **Resource and Cost Optimization:** Codeorganisation, Packaging, Datenlebenszyklus, Performance, Make-or-Buy, Lizenzen und Sandboxes.
5. **Fairness:** Barrierefreiheit, Transparenz, Nichtdiskriminierung und KI-Ethik.

Salesforce hat die alten Inhalte nicht weggeworfen, sondern umsortiert. Die Seite [Legacy Framework Mapping](https://architect.salesforce.com/docs/architect/well-architected/guide/tea-pillar-mapping.html) zeigt, wohin welche Inhalte verschoben wurden. Einige Beispiele: Monitoring lag früher unter Reliable und gehört jetzt zu Operational Excellence. Disaster Recovery lag unter Resilient und gehört jetzt zu Reliability. Business Value und ROI lagen unter Automated und gehören jetzt zu Resource and Cost Optimization. Barrierefreiheit und Datenschutzrechte stehen unter Fairness, rechtliche Vorgaben und Data Residency bleiben bei Trust. Messaging, Eventing und API-Management wurden vollständig aus dem Framework in die Integration Patterns verschoben.

```saeulenwechsel
bisher: Bisher: drei Säulen
alt: Trusted | secure, compliant, reliable
alt: Easy | intentional, automated, engaging
alt: Adaptable | resilient, composable
titel: Well-Architected: von drei auf fünf Säulen
Trust | Sicherheit < Secure | Recht, Data Residency < Compliant
Reliability | Verfügbarkeit, Skalierung < Reliable | Disaster Recovery < Resilient
Operational Excellence | Monitoring < Reliable | Strategie, Governance < Intentional | Automatisierung < Automated | ALM, Incidents < Resilient
Resource and Cost Optimization * | Performance < Reliable | ROI, Wartbarkeit < Automated, Intentional | Lizenzen, Sandboxes < Framework 2026
Fairness | Ethik, Datenschutzrechte < Compliant | Barrierefreiheit < Engaging
fazit: **Neu:** Agentic-Enterprise-Linse für jede Säule.
fazit: **Ausgelagert:** Messaging, Eventing und APIs in die Integration Patterns.
```

Auffällig ist, wie konkret die neuen Seiten geworden sind. Zwei Zahlen daraus:

```kennzahlen
70 % | der Governor Limits als Obergrenze im Normalbetrieb, damit Reserve für Lastspitzen bleibt
99,5 % | als Beispielziel der eigenen Lösung bei 99,9 % Plattform-SLA
quelle: Salesforce Well-Architected Framework im Architecture Center
```

Weitere Beispiele aus dem Text:

- **Disaster Recovery:** RTO und RPO pro Fachfunktion festlegen, Backups regelmäßig zurückspielen, für kritische Systeme einmal im Jahr einen vollständigen Failover üben und jedes Quartal eine Tabletop-Übung durchspielen.
- **Multi-Org:** nur, wenn Geschäftsanforderungen den Mehraufwand rechtfertigen, etwa regulatorische Datentrennung.
- **DevOps:** DORA-Metriken messen (Deployment-Häufigkeit, Durchlaufzeit, Fehlerquote bei Änderungen, Wiederherstellungszeit, Nacharbeit) und regelmäßig prüfen, ob Produktion vom Stand in der Versionsverwaltung abweicht.
- **Barrierefreiheit:** Tests gegen WCAG 2.2 AA.

Beide Zahlen sind Planungshilfen, keine Vorschriften. Salesforce selbst nennt die 70-Prozent-Grenze eine verbreitete Best Practice aus der Community und keine offizielle Spezifikation. Der Wert von 99,5 Prozent ist ein Beispiel aus einer Spanne von 99 bis 99,99 Prozent, je nachdem, wie kritisch der Prozess ist.

## Was bedeutet die Agentic-Enterprise-Linse?

Die zweite große Änderung ist die Agentic-Enterprise-Linse. Sie ist keine sechste Säule. Für jede der fünf Säulen gibt es eine Variante, die beschreibt, was zusätzlich gilt, wenn KI-Agenten eigenständig entscheiden und handeln: Berechtigungen und Prüfpfade für Agenten, Umgang mit Fehlern in der Orchestrierung mehrerer Agenten, der Agent Development Lifecycle, Token-Verbrauch und Nachvollziehbarkeit von Entscheidungen.

Der wichtigste Satz dazu steht im Ankündigungsblog: „Agents don't get their own rulebook." Ein Agent muss also dieselben Anforderungen an Sicherheit, Stabilität und Kosten erfüllen wie jede andere Lösung in Ihrer Org. Das passt zu meiner Haltung aus Agentforce-Projekten: Business Value und Datenqualität haben Vorrang vor dem Agenten. Mehr dazu in [Agentforce: Business Value und Datenqualität zuerst](../agentforce-business-value-datenqualitaet/).

## Für CIOs zählen Kosten, Betrieb und benannte Zielkonflikte

Aus Sicht eines Architekten auf Kundenseite sind drei Änderungen relevant.

**Kosten stecken in einer eigenen Säule.** Im alten Framework tauchten Kosten nur am Rand auf. Jetzt stehen Lizenzen, Sandboxes und Make-or-Buy in Resource and Cost Optimization, neben Performance und Wartbarkeit. Das ist überfällig. In meiner Pre-Sales-Arbeit mit Salesforce wurden Angebote meist zunächst mit vollen Lizenzen für alle kalkuliert, obwohl viele Nutzer sie nicht brauchten. In einer größeren Organisation sind das schnell sechsstellige Beträge pro Jahr. Eine Architekturprüfung, die das nicht berücksichtigt, ist unvollständig.

**Betrieb steht gleichberechtigt neben dem Design.** Operational Excellence bündelt DevOps, Monitoring und Incident Management. Damit gehört der Betrieb in jede Architekturprüfung und darf nicht erst nach dem Go-live Thema werden. Dass DORA-Metriken jetzt im offiziellen Framework stehen, gibt Kunden ein Argument gegenüber Partnern, die Deployments noch manuell durchführen. Warum ich darauf bestehe, steht in [Warum DevOps in Salesforce-Enterprise-Projekten zählt](../warum-devops-salesforce-enterprise-projekte/).

**Das Framework benennt Zielkonflikte.** Mehr Verschlüsselung und Audit-Logs kosten Geld. Höhere Verfügbarkeit kostet Geld. Mehr Autonomie für Agenten erhöht das Risiko unfairer Entscheidungen. Salesforce schreibt dazu: „The goal is not to maximize every pillar simultaneously." Genau diese Abwägungen gehören in ein Entscheidungsprotokoll, und zwar mit dem Namen der Person, die entschieden hat.

## Wo hat das Framework Grenzen?

Bei aller Zustimmung: Es bleibt ein Herstellerdokument.

- **Es empfiehlt Salesforce-Werkzeuge.** Shield Platform Encryption, Event Monitoring und Field Audit Trail werden als Lösungen genannt. Dabei handelt es sich um lizenzpflichtige Zusatzprodukte. Ich behandle genannte Produkte als Optionen, nicht als Pflicht guter Architektur: zuerst festlegen, welche Kontrolle Sie brauchen, dann Standardfunktionen, Zusatzprodukte und externe Werkzeuge vergleichen.
- **Das Change Log enthält keine Datumsangaben.** Es listet, was veröffentlicht oder erweitert wurde, aber nicht wann. Wer Architekturentscheidungen auf eine bestimmte Empfehlung stützt, sollte den Stand mit Datum im eigenen Entscheidungsprotokoll festhalten.
- **Der Architect Agent ist noch nicht greifbar.** Salesforce hat ihn auf der Dreamforce gezeigt, Verfügbarkeit und Preis aber nicht genannt. Ich würde ihn testen, bevor ich ihm Architekturfragen anvertraue.
- **Es ersetzt keine Entscheidung.** Das Framework liefert Fragen und Muster. Ob Sie 99,5 Prozent Verfügbarkeit brauchen oder 99 Prozent, ob Sie Make oder Buy wählen, entscheidet Ihr Geschäftsmodell und nicht das Dokument.

## So nutze ich das Framework in einem Programm mit mehreren Partnern

Ich habe schon das alte Framework mit Trusted, Easy und Adaptable in Kundenprojekten genutzt und in User-Group-Vorträgen vorgestellt.

```praxis
In meinem bisher größten Programm arbeiteten über 30 Entwickler in 8 Streams von 5 Umsetzungspartnern in derselben Org. Wir haben rund drei Monate gebraucht, bis die gemeinsamen Standards standen: Namenskonventionen, eine Automatisierung pro Objekt, Vorgaben zur Testabdeckung, eine Matrix, welcher Stream welches Objekt verantwortet, und Regeln, was in Custom Metadata Types oder Custom Labels gehört. 80 Prozent standen nach der ersten Runde, der Rest folgte im Lauf der Monate.
```

Mit dem neuen Framework würde ich diese Standards heute entlang der fünf Säulen ordnen. Namenskonventionen, Packaging und Objektverantwortung gehören zu Resource and Cost Optimization und Operational Excellence. Berechtigungen und Integrationsbenutzer sind Trust. Der Vorteil: Das Framework ist eine veröffentlichte Referenz, die keinem einzelnen Partner gehört. Die Diskussion beginnt also nicht bei null, und Abweichungen lassen sich einer Säule zuordnen. Das funktioniert aber nur, wenn der Kunde daraus verbindliche Review-Fragen und Abnahmekriterien macht.

Konkret heißt das:

1. **Design Reviews nach Säulen gliedern.** Für eine größere Änderung reicht der vorschlagende Partner vorab eine Seite ein: betroffene Nutzer, Systeme und Schnittstellen, Nachweise zu jeder relevanten Säule, verworfene Alternativen, zusätzliche Lizenz- und Betriebskosten sowie die Information, wer Monitoring und Wiederherstellung verantwortet. Das Review endet mit einem der vier Ergebnisse: Freigabe, Freigabe mit Auflagen, Nacharbeit oder Eskalation für eine Geschäftsentscheidung.
2. **Zielkonflikte protokollieren.** Wo Anforderungen einer Säule zugunsten einer anderen zurückstehen, wird das mit Begründung im Entscheidungsprotokoll festgehalten.
3. **Agenten nicht separat behandeln.** Agentforce-Vorhaben durchlaufen dasselbe Review, ergänzt um die Agenten-Variante jeder Säule.
4. **Kostensäule ernst nehmen.** Salesforce empfiehlt, monatlich Kostenausreißer zu prüfen, vierteljährlich Lizenzzuweisungen und Kapazität zu überprüfen und einmal im Jahr eine vollständige Kostenprüfung vorzunehmen.

Wie ich Standards und Reviews in solchen Programmen aufsetze, gehört zu meiner [Arbeit an Partnersteuerung und Architektur](../../leistungen/partnersteuerung/).

## Die eigenen Entwicklungsstandards gegen die fünf Säulen prüfen

Lesen Sie die [Übersicht im Architecture Center](https://architect.salesforce.com/docs/architect/well-architected/guide/overview.html) und das Legacy Mapping, wenn Ihre Teams noch mit Trusted, Easy und Adaptable arbeiten. Prüfen Sie dann Ihre bestehenden Entwicklungsstandards gegen die fünf Säulen. Meist fehlen Kosten und Betrieb.
