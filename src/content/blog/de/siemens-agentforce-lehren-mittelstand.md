---
title: "Siemens und Agentforce: Lehren für Maschinenbauer"
description: "Was bei Siemens mit Agentforce live ist, was nur angekündigt ist und welche Reihenfolge der KI-Anwendungsfälle daraus für einen Maschinenbauer folgt."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: siemens-agentforce-lehren-mittelstand
translationKey: siemens-agentforce-lessons
topic: ai
categories: [manufacturing-cloud, ai]
tags: [Agentforce, Siemens, Maschinenbau, KI-Agenten, Anwendungsfälle, Leadqualifizierung]
takeaways:
  - "Siemens-Agenten kontaktieren alle rund 2.500 Leads im Scope pro Monat; 11 Prozent reagieren, 6 Prozent werden qualifiziert."
  - "Konversion, Pipeline-Wert, Vertriebsstunden und ROI sind nicht veröffentlicht. Aktivitäts- und Trichterzahlen sind kein Umsatzeffekt."
  - "Bei wenigen Hundert Leads im Monat erst prüfen, ob eine Bewertungsregel und eine Person reichen."
  - "Ersatzteile per Seriennummer brauchen pro Maschine die aktuelle, durch alle Wartungen fortgeschriebene Konfiguration. Diese Datenarbeit beginnt am ersten Tag."
faq:
  - q: "Was ist bei Siemens mit Agentforce live?"
    a: "Von den vier Teilen der Meldung vom 15. September 2026 sind nur die Lead-Agenten klar live: Ein Engagement-Agent und ein Qualifizierungsagent kontaktieren rund 2.500 eingehende Leads im Scope pro Monat in 132 Ländern. Die Fallstudie nennt 11 Prozent Engagement-Rate und 6 Prozent Qualifizierungsrate. Salesforce beschreibt außerdem einen Partner-Management-Agenten für über 14.500 Partner als produktiv."
  - q: "Ist die Anbindung von Teamcenter an Agentforce verfügbar?"
    a: "Die Meldung sagt, Teamcenter \"will work with Agentforce\", also im Futur, und nennt keinen Termin. Im November 2026 hat Siemens eine Agent-zu-Agent-Funktion für die App Teamcenter SLM for Salesforce vorgestellt und in einem Demovideo gezeigt. Einen Verfügbarkeitstermin oder Produktionszahlen habe ich mit Stand 9. November 2026 nicht gefunden."
  - q: "Was ist Piper in der Siemens-Ankündigung?"
    a: "Piper ist ein KI-SDR-Agent auf der Plattform von Qualified, der eingehende Gespräche auf der Website führt. Bei Siemens ist er für potenzielle Vertriebspartner geplant; die Meldung leitet ihn mit \"Looking ahead\" ein."
  - q: "Mit welchem KI-Anwendungsfall sollte ein mittelständischer Hersteller starten?"
    a: "Mit einem Prozess mit hohem Volumen, erreichbaren Daten und Fehlern, die leicht auffallen und sich korrigieren lassen, oft Händleranfragen zu Auftragsstatus und Lieferterminen aus dem ERP. Schreibende Schritte in SAP oder proALPHA kommen meist später, je nach Risiko, Umkehrbarkeit und Kontrollen."
draft: false
---

Von den vier Teilen der Siemens-Agentforce-Ankündigung vom 15. September 2026 ist einer klar live: zwei Agenten, die eingehende Leads in der Sales Cloud für 18.000 Vertriebsmitarbeitende ansprechen und qualifizieren. Teamcenter-Antworten für den Service, ein SDR-Agent für Vertriebspartner und das Lieferanten-Onboarding in SAP stehen im Futur. Für einen mittelständischen Maschinenbauer liegt die Lehre in der Reihenfolge. Der Lead-Fall hat hohes Volumen, eine schmale Aufgabe und Fehler, die ein Vertriebler bemerken kann. Ich würde diese Kriterien übernehmen, nicht den Lead-Anwendungsfall, und die Datenarbeit für Seriennummern am ersten Tag starten.

## Was haben Siemens und Salesforce tatsächlich angekündigt?

Die [Meldung auf der Investor-Seite von Salesforce](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) erschien zur Dreamforce. Sie verbindet Agentforce mit Teamcenter Service Lifecycle Management, der Siemens-Software für Servicedaten über den Lebenszyklus eines Produkts. Satz für Satz gelesen beschreibt sie vier Teile in unterschiedlichen Zeitformen:

| Teil | Formulierung in der Meldung | Genannte Zahlen |
|---|---|---|
| Engagement-Agent und Qualifizierungsagent für eingehende Leads in der Sales Cloud | "Today, Siemens engages 100% of these inbound leads" | 18.000 Vertriebler, 132 Länder, vorher über 2.500 unqualifizierte Leads im Monat; die Fallstudie ergänzt 11 Prozent Engagement und 6 Prozent Qualifizierung |
| Teamcenter mit Agentforce: Ersatzteile per Seriennummer, gültige Upgrades, Teilebestellung durch Kunden | Teamcenter "will work with Agentforce" | keine |
| Piper, ein SDR-Agent für potenzielle Vertriebspartner | "Looking ahead" | keine |
| Slackbot und Agentforce Operations für das Lieferanten-Onboarding, letzte Schritte in SAP | "will" | Onboarding "from weeks to days", als Erwartung |

In sich ist die Meldung nicht ganz stimmig. Über Fragen, die früher an die Konstruktion zurückgingen, heißt es dort auch, sie "can now be answered in seconds", also schon heute. Ohne Termin, Nutzerzahl oder Kennzahl für den Teamcenter-Teil lese ich die Antworten aus Engineering-Daten als noch nicht breit produktiv. Das ist meine Lesart des Textes, keine Aussage von Siemens.

Die Meldung ist nicht die einzige Quelle. Eine [Fallstudie von Salesforce](https://www.salesforce.com/customer-stories/siemens/agentic-sales-leads/) vom 14. September 2026 ist genauer: "100% process coverage of approximately 2,500 in-scope inbound leads per month", eine Engagement-Rate von 11 Prozent, eine Qualifizierungsrate von 6 Prozent, Reaktionszeit "from days to minutes" und 80 Prozent der Interaktionen mit gut oder sehr gut bewertet. Sie nennt außerdem einen Partner-Management-Agenten, der in sechs Wochen vom Prototyp in Produktion ging, für über 14.500 Partner. "Engages 100%" heißt also: Jeder Lead im Scope wird kontaktiert, nicht jeder antwortet. Dieser Artikel behandelt die vier Teile der Meldung, nicht alles, was bei Siemens läuft.

Den Fokus auf den Service begründet die Meldung mit einer "industry analysis": Das Aftermarket-Geschäft wachse rund sechsmal schneller als der Neumaschinenverkauf und bringe etwa die vierfache Marge. Eine Quelle dafür fehlt. Ich würde diese Zahl erst in einen eigenen Business Case übernehmen, wenn Sie sie mit Ihrem eigenen Serviceanteil am Umsatz abgeglichen haben.

## Was macht den Siemens-Lead-Fall zu einem guten ersten Agenten?

Warum Siemens diesen Fall gewählt hat, erklärt Siemens nicht. Nach meiner Lesart hat er die Eigenschaften, die ich bei einem ersten Agenten suche:

- **Volumen.** Siemens erhielt laut Meldung über 2.500 unqualifizierte Leads im Monat und konnte nicht erkennen, welche die Zeit der Vertriebler wert waren.
- **Erreichbare Daten.** Das Gespräch läuft auf Lead, Kontakt und Account in der Sales Cloud. Der weitere Kundenkontext ist aber nicht trivial: Laut Fallstudie liest Data 360 per Zero-Copy-Integration aus Snowflake, dahinter stehen harmonisierte CRM-, ERP- und Installed-Base-Daten.
- **Fehler, die auffallen.** Ein zu hoch bewerteter Lead landet bei einem Vertriebler, der es merkt. Ein zu niedrig bewerteter ist gefährlicher: Leads unter dem Schwellenwert laufen in einen vordefinierten Abschlusspfad, eine falsche Ablehnung kann also verlorenes Geschäft bedeuten. Trotzdem verschickt niemand ein falsches Ersatzteil oder genehmigt einen falschen Garantiefall.
- **Eine klare Übergabe.** Der Engagement-Agent spricht den Lead an, fasst bis zu zweimal nach und gibt Interessierte an den Qualifizierungsagenten weiter, der die besten an einen Vertriebler übergibt.

Im Aufbau steckt eine zweite Lehre. Siemens setzt zwei schmale Agenten hintereinander ein statt eines Agenten, der alles macht. Jeder hat eine schmale Aufgabe und eine klare Übergabe. Allein der Qualifizierungsagent arbeitet mit rund 50 vordefinierten Regeln und BANT-Fragen, also können Sie die Qualifizierungskriterien, auch die abgelehnten Leads, getrennt vom Ton der Ansprache testen. Wie ich solche Tests aufsetzen würde, steht in [Agentforce-Agenten testen und freigeben](../agentforce-agenten-testen-freigeben/).

```hinweis achtung
Was die Quellen weglassen, ist genauso wichtig. Veröffentlicht sind Abdeckung, Engagement-Rate, Qualifizierungsrate und Reaktionszeit. Konversion zu Aufträgen, Pipeline-Wert, eingesparte Vertriebsstunden und ROI fehlen. Jeden Lead zu kontaktieren ist eine Aktivitätskennzahl, eine Qualifizierungsrate eine Trichterkennzahl. Wenn Sie den Siemens-Fall Ihrer Geschäftsführung zeigen, sagen Sie das dazu, sonst erwartet jemand einen Umsatzeffekt, der nie veröffentlicht wurde.
```

Die anderen Industriereferenzen folgen demselben Muster. In der [Ankündigung von Agentforce for Manufacturing](https://www.salesforce.com/news/stories/agentforce-for-manufacturing-announcement/) vom August 2025 sagt Terri Eshleman von JPW Industries, die manuelle Auftragsbearbeitung habe früher 16 bis 24 Stunden gedauert und dauere jetzt weniger als eine Stunde; die Bearbeitungszeit von Fällen sei trotz 15 Prozent mehr Arbeitslast um fast 40 Prozent gesunken. Der Chemiedistributor Brenntag [meldete im November 2024](https://corporate.brenntag.com/en/media/news/brenntag-implements-autonomous-ai-agents-on-its-salesforce-platform-as-first-customer-in-germany.html) Agenten für Auftrags- und Produktanfragen als Pilot für ausgewählte Kunden und Lieferpartner, ohne Zahlen. Die Referenzen mit Kennzahlen betreffen enge, häufige Prozesse in Auftragsabwicklung und Servicefällen. Das Teamcenter-Szenario von Siemens und der Pilot von Brenntag liefern keine vergleichbaren Produktionsergebnisse.

## Wovon hängen die angekündigten Teile ab?

**Teamcenter-Antworten.** Ein Techniker im Außendienst, der vor dem ersten Einsatz das richtige Ersatzteil zu einer Seriennummer findet, braucht die aktuelle, durch alle Wartungen fortgeschriebene Konfiguration genau dieser Maschine: welche Variante das Werk verlassen hat, welche Teile verbaut wurden, welche bei späteren Serviceeinsätzen getauscht wurden, welche Änderungen und Revisionen gelten und welche Upgrades freigegeben sind. Eine As-built-Stückliste zeigt nur den Auslieferungszustand. Bei Siemens liegen diese Daten in Teamcenter. Im Mittelstand verteilen sie sich oft auf PLM, SAP und Excel-Listen des Service. Der Agent ist dabei der kleine Teil; jede Seriennummer mit ihrer Stückliste zu verknüpfen ist der große. Mehr dazu in [Ersatzteile per Seriennummer mit einem KI-Agenten](../ersatzteile-seriennummer-ki-agent/). In einem [Siemens-Blogbeitrag vom 3. November 2026](https://blogs.sw.siemens.com/service-lifecycle-management/2026/11/03/agent-to-agent/) stellen Siemens und Salesforce eine Agent-zu-Agent-Funktion für die App Teamcenter SLM for Salesforce vor, mit Demovideo. Einen Verfügbarkeitstermin nennt der Beitrag nicht.

**Piper.** Das Produkt gibt es. Der [Hilfeartikel von Salesforce](https://help.salesforce.com/s/articleView?id=005317771&language=en_US&type=1) beschreibt Piper als "AI SDR superagent" für eingehende Gespräche auf der Website und weiteren Kanälen, gebaut auf der Plattform von Qualified. Angekündigt ist der Einsatz bei Siemens für potenzielle Vertriebspartner, die heute laut Meldung die Website durchsuchen, ein Formular ausfüllen und auf Rückmeldung warten. Zu Preis und Lizenzierung sagt der Hilfeartikel nichts.

**Agentforce Operations.** Salesforce hat das Produkt am [29. April 2026 als allgemein verfügbar](https://www.salesforce.com/news/stories/agentforce-operations-announcement/) gemeldet, gebaut auf Technologie von Regrello. Laut aktueller Salesforce-Hilfe ist es ein externer Arbeitsbereich getrennt von der Salesforce-Org und braucht eine eigene Agentforce-Operations-Lizenz. Dokumentiert sind Integrationen mit SharePoint und eigenen HTTP-Aufrufen; SAP wird nicht genannt. Das Produkt ist also GA, die SAP-Schritte bei Siemens sind ein Plan, und wie sie SAP erreichen, ist nicht beschrieben. Was auch immer ein Agent ins ERP schreibt, die Regeln dafür gehören in deterministische Logik, wie in [Agent Script: Regeln statt LLM](../agent-script-regeln-statt-llm/) beschrieben.

## Rechenbeispiel: ein Maschinenbauer mit 1.100 Beschäftigten

Nehmen wir einen Maschinenbauer mit 1.100 Beschäftigten, SAP S/4HANA, Sales Cloud und Service Cloud, 140 Händlern in 35 Ländern und 9.000 Maschinen in der installierten Basis. Alle Zahlen sind Annahmen, um die Methode zu zeigen. Vier Ideen aus der Siemens-Meldung liegen auf dem Tisch.

**Händleranfragen zu Auftragsstatus und Lieferterminen.** Angenommen 1.400 im Monat, heute beantwortet von vier Personen im Innendienst. Eine MuleSoft-API zu SAP gibt es, und der Agent liest nur. Das ist dasselbe Profil wie der Lead-Fall bei Siemens: hohes Volumen, erreichbare Daten, eine Person übernimmt, wenn die Antwort unklar ist. Dieser Fall kommt zuerst. Den Integrationsweg beschreibe ich in [Agentforce und der SAP-Auftragsstatus](../agentforce-sap-auftragsstatus/).

**Eingehende Leads.** Angenommen 180 im Monat aus Website und Messen, also etwa neun pro Arbeitstag. Das schaffen wahrscheinlich eine Bewertungsregel im Flow und eine Person im Vertriebsinnendienst, sofern Sie nicht rund um die Uhr in vielen Sprachen antworten müssen. Siemens meldet allein für die Leads im Scope rund das Vierzehnfache, dazu 18.000 Vertriebler, die auf qualifizierte Leads warten. Vor einem Agenten würde ich die Vollkosten der Person mit Verbrauch, Lizenzen und Bauaufwand vergleichen. In diesem Szenario wartet die Idee, bis das Lead-Volumen wächst.

**Ersatzteile per Seriennummer.** Für die Serviceleitung die wertvollste Idee und die am wenigsten reife. Angenommen nur 60 Prozent der 9.000 Maschinen haben eine Seriennummer, die mit einer As-built-Stückliste verknüpft ist. Das Datenprojekt startet jetzt, weil es am längsten dauert; der Agent folgt, sobald die Abdeckung einen Stand erreicht, den die Serviceleitung freigibt.

**Lieferanten-Onboarding.** Angenommen 25 neue Lieferanten im Jahr. Ein Genehmigungsprozess mit Checkliste deckt das wahrscheinlich ab. Bei so seltenen Prüfungen würde ich einen Agenten nur bauen, wenn jedes Onboarding komplex oder riskant genug ist, um den Bau- und Testaufwand zu rechtfertigen. Die Siemens-Meldung nennt kein Lieferantenvolumen, also sagt das Versprechen "from weeks to days" nichts über Ihren Fall.

## Für ein kleineres Unternehmen folgt eine eigene Reihenfolge

Aus dem Szenario leite ich diese Reihenfolge ab:

```schritte
Nur lesen, hohes Volumen
  Händleranfragen, Auftragsstatus, Liefertermine, und eine Person übernimmt. Nehmen Sie den Prozess in Ihrem Haus mit den meisten gleichartigen Anfragen.
Aus dem ERP per API lesen
  Weiterhin ohne Schreibrechte. Bestand, Preise und Kreditstatus kommen aus SAP oder proALPHA; der Agent erklärt, er rechnet nicht neu.
Antworten aus PLM und Seriennummern
  Sobald das Datenprojekt vom ersten Tag geliefert hat. Hier liegt der Wert im Aftermarket, und hier ist die Datenarbeit am größten.
Schreibende Schritte ins ERP
  Meist zuletzt, mit Regeln in Logik, einer Freigabe durch einen Menschen für finanziell, rechtlich oder operativ wesentliche Schritte und einem vorab vereinbarten Testset. Ein validierter, umkehrbarer Schreibschritt kann risikoärmer sein als eine automatische Lead-Ablehnung; entscheiden Sie nach Risiko und Kontrollen, nicht nur nach Lesen oder Schreiben.
```

Bevor einer dieser Fälle live geht, vereinbaren Sie eine Ergebniskennzahl jenseits der Aktivität, etwa den Anteil der Händleranfragen, die ohne Antwort des Innendienstes abgeschlossen werden. Siemens hat Aktivitäts- und Trichterzahlen veröffentlicht; Ihre Geschäftsführung wird nach einem Ergebnis fragen. Die fünf Kriterien hinter dieser Reihenfolge stehen in [Agentforce für Hersteller: jetzt starten oder warten?](../agentforce-ja-oder-nein-hersteller/), das Gesamtbild dessen, was heute läuft, im Masterclass-Kapitel [KI-Agenten in der Fertigung](../../masterclass/ki-salesforce/ki-agenten-in-der-fertigung/).

Wenn in Ihrem Haus jemand sagt "Siemens macht das schon", stellen Sie diese Fragen: In welcher Zeitform spricht die Quelle, ist die Zahl ein Ausgangswert oder ein Ergebnis, wessen Zahl ist es, und nennt sie eine Quelle. Das vor einer Budgetentscheidung zu klären, gehört zu meiner Arbeit in [Architektur und Partnersteuerung](../../leistungen/salesforce-architektur/).
