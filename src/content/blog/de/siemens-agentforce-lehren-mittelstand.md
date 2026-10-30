---
title: "Siemens und Agentforce: Lehren für den Mittelstand"
description: "Was bei Siemens mit Agentforce live ist, was nur angekündigt ist und welche Reihenfolge der KI-Anwendungsfälle daraus für einen Maschinenbauer folgt."
pubDate: 2026-10-27
lang: de
slug: siemens-agentforce-lehren-mittelstand
translationKey: siemens-agentforce-lessons
topic: ai
categories: [manufacturing-cloud, ai]
tags: [Agentforce, Siemens, Maschinenbau, KI-Agenten, Anwendungsfälle, Leadqualifizierung]
takeaways:
  - "In der Meldung von Siemens und Salesforce vom 15. September 2026 sind nur zwei Agenten für eingehende Leads live; Teamcenter, der Händler-SDR-Agent und das Lieferanten-Onboarding in SAP stehen im Futur."
  - "Siemens hat dort angefangen, wo das Volumen hoch war, die Daten schon in der Sales Cloud lagen und ein Fehler wenig kostete: über 2.500 unqualifizierte Leads im Monat für 18.000 Vertriebler."
  - "Das einzige veröffentlichte Ergebnis ist, dass Siemens 100 Prozent der eingehenden Leads anspricht; Konversionsrate, Pipeline-Wert oder eingesparte Vertriebsstunden nennt die Meldung nicht."
  - "Ein mittelständischer Maschinenbauer sollte die Kriterien hinter der Siemens-Reihenfolge übernehmen, nicht den Lead-Fall, denn bei wenigen Hundert Leads im Monat sind eine Bewertungsregel und eine Person günstiger."
  - "Ersatzteile per Seriennummer brauchen As-built-Daten zu jeder Maschine; diese Datenarbeit sollte am ersten Tag beginnen, auch wenn der Agent erst an zweiter oder dritter Stelle kommt."
faq:
  - q: "Was ist bei Siemens mit Agentforce live?"
    a: "Laut Meldung vom 15. September 2026 arbeiten ein Engagement-Agent und ein Qualifizierungsagent in der Sales Cloud an eingehenden Leads und leiten die besten an den Vertrieb weiter. Siemens spricht so alle eingehenden Leads in 132 Ländern an."
  - q: "Ist die Anbindung von Teamcenter an Agentforce verfügbar?"
    a: "Die Meldung sagt, Teamcenter \"will work with Agentforce\", also im Futur, und nennt keinen Termin. Ersatzteile per Seriennummer und technisch gültige Upgrades stehen dort als Beispiele, Zahlen oder Verfügbarkeit für diesen Teil fehlen."
  - q: "Was ist Piper in der Siemens-Ankündigung?"
    a: "Piper ist ein KI-SDR-Agent auf der Plattform von Qualified, der eingehende Gespräche auf der Website führt. Bei Siemens ist er für potenzielle Vertriebspartner geplant; die Meldung leitet ihn mit \"Looking ahead\" ein."
  - q: "Mit welchem KI-Anwendungsfall sollte ein mittelständischer Hersteller starten?"
    a: "Mit dem Prozess, der das höchste Volumen hat, dessen Daten schon erreichbar sind und bei dem ein Fehler wenig kostet, oft Händleranfragen zu Auftragsstatus und Lieferterminen aus dem ERP. Schreibende Schritte in SAP oder proALPHA kommen zuletzt."
draft: false
---

Die Siemens-Agentforce-Ankündigung vom 15. September 2026 hat einen Teil, der live ist: zwei Agenten, die eingehende Leads in der Sales Cloud für 18.000 Vertriebsmitarbeitende ansprechen und qualifizieren. Teamcenter-Antworten für den Service, ein SDR-Agent für Vertriebspartner und das Lieferanten-Onboarding in SAP stehen im Futur. Für einen mittelständischen Maschinenbauer liegt die Lehre in der Reihenfolge. Siemens hat dort angefangen, wo das Volumen hoch war, die Daten schon in Salesforce lagen und eine falsche Antwort wenig kostete. Ich würde diese Kriterien übernehmen, nicht den Lead-Anwendungsfall, und die Datenarbeit für Seriennummern am ersten Tag starten.

## Was haben Siemens und Salesforce tatsächlich angekündigt?

Die [Meldung auf der Investor-Seite von Salesforce](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) erschien zur Dreamforce. Sie verbindet Agentforce mit Teamcenter Service Lifecycle Management, der Siemens-Software für Servicedaten über den Lebenszyklus eines Produkts. Satz für Satz gelesen beschreibt sie vier Teile in unterschiedlichen Zeitformen:

| Teil | Formulierung in der Meldung | Genannte Zahlen |
|---|---|---|
| Engagement-Agent und Qualifizierungsagent für eingehende Leads in der Sales Cloud | "Today, Siemens engages 100% of these inbound leads" | 18.000 Vertriebler, 132 Länder, vorher über 2.500 unqualifizierte Leads im Monat |
| Teamcenter mit Agentforce: Ersatzteile per Seriennummer, gültige Upgrades, Teilebestellung durch Kunden | Teamcenter "will work with Agentforce" | keine |
| Piper, ein SDR-Agent für potenzielle Vertriebspartner | "Looking ahead" | keine |
| Slackbot und Agentforce Operations für das Lieferanten-Onboarding, letzte Schritte in SAP | "will" | Onboarding "from weeks to days", als Erwartung |

In sich ist die Meldung nicht ganz stimmig. Über Fragen, die früher an die Konstruktion zurückgingen, heißt es dort auch, sie "can now be answered in seconds", also schon heute. Ohne Termin, Nutzerzahl oder Kennzahl für den Teamcenter-Teil lese ich die Antworten aus Engineering-Daten als noch nicht breit produktiv. Das ist meine Lesart des Textes, keine Aussage von Siemens.

Den Fokus auf den Service begründet die Meldung mit einer "industry analysis": Das Aftermarket-Geschäft wachse rund sechsmal schneller als der Neumaschinenverkauf und bringe etwa die vierfache Marge. Eine Quelle dafür fehlt. Ich würde diese Zahl erst in einen eigenen Business Case übernehmen, wenn Sie sie mit Ihrem eigenen Serviceanteil am Umsatz abgeglichen haben.

## Warum hat Siemens mit eingehenden Leads angefangen?

Der Lead-Fall hat die Eigenschaften, die ich bei einem ersten Agenten suche:

- **Volumen.** Siemens erhielt laut Meldung über 2.500 unqualifizierte Leads im Monat und konnte nicht erkennen, welche die Zeit der Vertriebler wert waren.
- **Erreichbare Daten.** Lead, Kontakt und Account liegen in der Sales Cloud. Der Agent braucht für seine Aufgabe keinen Aufruf an SAP oder Teamcenter.
- **Geringe Fehlerkosten.** Ein schlecht qualifizierter Lead landet bei einem Vertriebler, der es merkt. Niemand verschickt ein falsches Ersatzteil oder genehmigt einen falschen Garantiefall.
- **Eine klare Übergabe.** Der Engagement-Agent spricht den Lead an und gibt Interessierte an den Qualifizierungsagenten weiter, der die besten an einen Vertriebler übergibt.

Im Aufbau steckt eine zweite Lehre. Siemens setzt zwei schmale Agenten hintereinander ein statt eines Agenten, der alles macht. Jeder hat eine Aufgabe und eine Übergaberegel, also können Sie die Qualifizierungskriterien getrennt vom Ton der Ansprache testen. Wie ich solche Tests aufsetzen würde, steht in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/).

```hinweis achtung
Was die Meldung weglässt, ist genauso wichtig. Das einzige Ergebnis ist der Anteil angesprochener Leads, 100 Prozent. Eine Konversionsrate, einen Pipeline-Wert oder eingesparte Vertriebsstunden nennt sie nicht. Jeden Lead anzusprechen ist eine Aktivitätskennzahl. Wenn Sie den Siemens-Fall Ihrer Geschäftsführung zeigen, sagen Sie das dazu, sonst erwartet jemand einen Umsatzeffekt, der nie veröffentlicht wurde.
```

Die anderen Industriereferenzen folgen demselben Muster. In der [Ankündigung von Agentforce for Manufacturing](https://www.salesforce.com/news/stories/agentforce-for-manufacturing-announcement/) vom August 2025 sagt Terri Eshleman von JPW Industries, die manuelle Auftragserfassung habe früher 16 bis 24 Stunden gedauert und dauere jetzt weniger als eine Stunde; die Bearbeitungszeit von Fällen sei trotz 15 Prozent mehr Arbeitslast um fast 40 Prozent gesunken. Der Chemiedistributor Brenntag [meldete im November 2024](https://corporate.brenntag.com/en/media/news/brenntag-implements-autonomous-ai-agents-on-its-salesforce-platform-as-first-customer-in-germany.html) Agenten für Auftrags- und Produktanfragen als Pilot für ausgewählte Kunden und Lieferpartner, ohne Zahlen. Die Referenzen mit Kennzahlen betreffen enge, häufige Prozesse in Vertrieb und Auftragsabwicklung. Die Geschichten zu Service und Engineering sind noch Ankündigungen.

## Wovon hängen die angekündigten Teile ab?

**Teamcenter-Antworten.** Ein Techniker im Außendienst, der vor dem ersten Einsatz das richtige Ersatzteil zu einer Seriennummer findet, braucht die As-built-Konfiguration genau dieser Maschine: welche Variante das Werk verlassen hat, welche Teile verbaut wurden, welche bei späteren Serviceeinsätzen getauscht wurden. Bei Siemens liegen diese Daten in Teamcenter. Im Mittelstand verteilen sie sich oft auf PLM, SAP und Excel-Listen des Service. Der Agent ist dabei der kleine Teil; jede Seriennummer mit ihrer Stückliste zu verknüpfen ist der große. Mehr dazu in [Ersatzteile per Seriennummer mit einem KI-Agenten](../ersatzteile-seriennummer-ki-agent/).

**Piper.** Das Produkt gibt es. Der [Hilfeartikel von Salesforce](https://help.salesforce.com/s/articleView?id=005317771&language=en_US&type=1) beschreibt Piper als "AI SDR superagent" für eingehende Gespräche auf der Website und weiteren Kanälen, gebaut auf der Plattform von Qualified. Angekündigt ist der Einsatz bei Siemens für potenzielle Vertriebspartner, die heute laut Meldung die Website durchsuchen, ein Formular ausfüllen und auf Rückmeldung warten. Zu Preis und Lizenzierung sagt der Hilfeartikel nichts.

**Agentforce Operations.** Salesforce hat das Produkt am [29. April 2026 als allgemein verfügbar](https://www.salesforce.com/news/stories/agentforce-operations-announcement/) gemeldet, gebaut auf Technologie von Regrello; Integrationsfunktionen wie das Auslösen von Flows sollten im Mai 2026 in die Beta gehen. Diese Meldung spricht allgemein von ERP und nennt SAP nicht. Das Produkt ist also GA, die SAP-Schritte bei Siemens sind ein Plan, und wie sie SAP erreichen, ist nicht beschrieben. Was auch immer ein Agent ins ERP schreibt, die Regeln dafür gehören in deterministische Logik, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben.

## Ein typisches Szenario: ein Maschinenbauer mit 1.100 Beschäftigten

Nehmen wir einen Maschinenbauer mit 1.100 Beschäftigten, SAP S/4HANA, Sales Cloud und Service Cloud, 140 Händlern in 35 Ländern und 9.000 Maschinen in der installierten Basis. Alle Zahlen sind Annahmen, um die Methode zu zeigen. Vier Ideen aus der Siemens-Meldung liegen auf dem Tisch.

**Händleranfragen zu Auftragsstatus und Lieferterminen.** Angenommen 1.400 im Monat, heute beantwortet von vier Personen im Innendienst. Eine MuleSoft-API zu SAP gibt es, und der Agent liest nur. Das ist dasselbe Profil wie der Lead-Fall bei Siemens: hohes Volumen, erreichbare Daten, eine Person übernimmt, wenn die Antwort unklar ist. Dieser Fall kommt zuerst. Den Integrationsweg beschreibe ich in [Agentforce und der SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/).

**Eingehende Leads.** Angenommen 180 im Monat aus Website und Messen, also etwa neun pro Arbeitstag. Das schaffen eine Bewertungsregel im Flow und eine Person im Vertriebsinnendienst. Siemens hat rund das Vierzehnfache an Volumen und 18.000 Vertriebler, die auf qualifizierte Leads warten. Diese Idee wartet, bis das Lead-Volumen wächst.

**Ersatzteile per Seriennummer.** Für die Serviceleitung die wertvollste Idee und die am wenigsten reife. Angenommen nur 60 Prozent der 9.000 Maschinen haben eine Seriennummer, die mit einer As-built-Stückliste verknüpft ist. Das Datenprojekt startet jetzt, weil es am längsten dauert; der Agent folgt, sobald die Abdeckung einen Stand erreicht, den die Serviceleitung freigibt.

**Lieferanten-Onboarding.** Angenommen 25 neue Lieferanten im Jahr. Das deckt ein Genehmigungsprozess mit Checkliste ab, ein Agent würde seinen Bau- und Testaufwand nie einspielen. Die Siemens-Meldung nennt kein Lieferantenvolumen, also sagt das Versprechen "from weeks to days" nichts über Ihren Fall.

## Welche Reihenfolge der Anwendungsfälle folgt für ein kleineres Unternehmen?

Aus dem Szenario leite ich diese Reihenfolge ab:

```schritte
Nur lesen, hohes Volumen
  Händleranfragen, Auftragsstatus, Liefertermine, und eine Person übernimmt. Nehmen Sie den Prozess in Ihrem Haus mit den meisten gleichartigen Anfragen.
Aus dem ERP per API lesen
  Weiterhin ohne Schreibrechte. Bestand, Preise und Kreditstatus kommen aus SAP oder proALPHA; der Agent erklärt, er rechnet nicht neu.
Antworten aus PLM und Seriennummern
  Sobald das Datenprojekt vom ersten Tag geliefert hat. Hier liegt der Wert im Aftermarket, und hier ist die Datenarbeit am größten.
Schreibende Schritte ins ERP
  Zuletzt, mit Regeln in Logik, einer Freigabe durch einen Menschen für alles mit Folgen und einem vorab vereinbarten Testset.
```

Bevor einer dieser Fälle live geht, vereinbaren Sie eine Ergebniskennzahl jenseits der Aktivität, etwa den Anteil der Händleranfragen, die ohne Antwort des Innendienstes abgeschlossen werden. Siemens hat eine Aktivitätszahl veröffentlicht; Ihre Geschäftsführung wird nach einem Ergebnis fragen. Die fünf Kriterien hinter dieser Reihenfolge stehen in [Agentforce für Hersteller: jetzt starten oder warten?](../agentforce-ja-oder-nein-hersteller/), das Gesamtbild dessen, was heute läuft, im Masterclass-Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/).

Wenn in Ihrem Haus jemand sagt "Siemens macht das schon", stellen Sie vier Fragen: In welcher Zeitform spricht die Quelle, ist die Zahl ein Ausgangswert oder ein Ergebnis, wessen Zahl ist es, und nennt sie eine Quelle. Das vor einer Budgetentscheidung zu klären, gehört zu meiner Arbeit in [Architektur und Partnersteuerung](../../leistungen/salesforce-architektur/).

Siemens zeigt eher eine vernünftige Reihenfolge als eine fertige Lösung, und diese Reihenfolge passt auch zu einem mittelständischen Maschinenbauer.
