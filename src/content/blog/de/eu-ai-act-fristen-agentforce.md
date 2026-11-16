---
title: "EU AI Act: Was die neuen Fristen für Agentforce bedeuten"
description: "Die Verordnung (EU) 2026/1744 verschiebt Hochrisiko-Pflichten auf 2027 und 2028. Was für Agentforce in der Industrie schon gilt, welche Agenten Hochrisiko sind."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: de
slug: eu-ai-act-fristen-agentforce
translationKey: eu-ai-act-agentforce-deadlines
topic: security
categories: [ai]
tags: [EU AI Act, KI-Verordnung, Agentforce, Compliance, KI-Agenten, Maschinenbau]
takeaways:
  - "Seit 2. August 2026 müssen Menschen im Chat mit einem Agentforce-Agenten zu Beginn erfahren, dass sie mit KI sprechen, sofern das nicht offensichtlich ist."
  - "Die Verordnung (EU) 2026/1744 verschiebt Hochrisiko-Pflichten auf den 2. Dezember 2027 für Anhang III und auf den 2. August 2028 für Anhang I."
  - "Ein Agent, der Bewerbungen bewertet oder Arbeit nach persönlichen Merkmalen verteilt, kann Hochrisiko sein; wer ihn einrichtet, kann Anbieter werden."
  - "KI-Anforderungen der Maschinenverordnung folgen über delegierte Rechtsakte, die spätestens ab 2. August 2028 gelten, und betreffen die Maschine, nicht CRM."
  - "Betreiber von Hochrisiko-Systemen bewahren Protokolle mindestens sechs Monate auf und informieren Beschäftigte und ihre Vertretung vorab. Keine Rechtsberatung."
faq:
  - q: "Ist ein Agentforce-Serviceagent ein Hochrisiko-KI-System nach dem EU AI Act?"
    a: "In der Regel nicht. Ein Agent, der Auftragsstatus, Liefertermine oder Ersatzteilfragen beantwortet, steht nicht in Anhang III. Er ist ein Transparenzfall nach Art. 50 Abs. 1: Menschen müssen zu Beginn erfahren, dass sie mit einer KI sprechen. Lassen Sie die Einstufung von Ihrer Rechtsabteilung bestätigen."
  - q: "Gilt Art. 50 auch im B2B, zum Beispiel im Händlerportal?"
    a: "In der Regel ja, so lese ich das FAQ der Kommission. Entscheidend ist, ob der Agent direkt mit einer natürlichen Person kommuniziert; die Mitarbeiterin eines Händlers im Chat ist eine natürliche Person, sofern die KI nicht ohnehin offensichtlich ist. Agenten, die nur im Hintergrund arbeiten und mit niemandem sprechen, fallen nicht unter Art. 50 Abs. 1."
  - q: "Ab wann gelten die Hochrisiko-Pflichten des AI Act?"
    a: "Laut konsolidiertem Art. 113 ab dem 2. Dezember 2027 für eigenständige Hochrisiko-Systeme nach Anhang III und ab dem 2. August 2028 für KI in Produkten nach Anhang I. Systeme, die schon vorher im Einsatz sind, werden grundsätzlich erst nach einer wesentlichen Änderung erfasst (Art. 111 Abs. 2). Die Transparenzpflichten aus Art. 50 gelten seit dem 2. August 2026."
  - q: "Ist Salesforce oder mein Unternehmen nach dem AI Act verantwortlich?"
    a: "Beide haben Rollen, und die Grenze ist nicht geklärt. Salesforce stellt die Plattform bereit, Sie betreiben die Agenten, die Sie konfigurieren; legen Sie den Zweck eines Agenten fest und nehmen ihn unter eigenem Namen in Betrieb, können Sie nach Art. 3 als Anbieter gelten. Geben Sie einem System einen Zweck, der es zum Hochrisiko-System macht, können Sie auch nach Art. 25 zum Anbieter werden. Salesforce selbst rät Kunden, eigenen Rechtsrat einzuholen."
  - q: "Was bedeutet die Änderung bei der Maschinenverordnung für Maschinenbauer?"
    a: "Laut Cuatrecasas wird die Maschinenverordnung in Abschnitt B von Anhang I verschoben; die inhaltlichen Hochrisiko-Anforderungen an KI in Maschinen sollen über delegierte Rechtsakte geregelt werden, die spätestens ab 2. August 2028 gelten. Das ist ein Thema der Produktentwicklung, getrennt von CRM-Agenten."
draft: false
---

Für die meisten Agentforce-Projekte in der Fertigungsindustrie zählt bei den Fristen des EU AI Act weniger, was die Verordnung (EU) 2026/1744 verschoben hat, als das, was schon gilt. Seit dem 2. August 2026 verlangt Art. 50, dass Menschen im Chat mit einem KI-Agenten erfahren, dass sie mit einer KI sprechen, sofern das nicht offensichtlich ist; ein Serviceagent für Händler fällt nach meiner Lesart darunter. Die neuen Hochrisiko-Termine, 2. Dezember 2027 für Anhang III und 2. August 2028 für Anhang I, treffen Sie nur, wenn ein Agent über Bewerber oder Beschäftigte mitentscheidet oder KI eine Sicherheitskomponente Ihrer Maschinen ist. Das ist meine Einschätzung als Architekt, keine Rechtsberatung.

## Was hat die Verordnung (EU) 2026/1744 geändert?

Laut [White & Case](https://www.whitecase.com/insight-alert/eu-ai-omnibus-enters-force-amending-ai-act) ist die als Digital Omnibus on AI bekannte Verordnung am 24. Juli 2026 im Amtsblatt erschienen und am 27. Juli in Kraft getreten. Sie verschiebt die Hochrisiko-Pflichten aus Kapitel III, in dem der größte Umsetzungsaufwand steckt. Der konsolidierte [Art. 113](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-113) im AI Act Service Desk der Kommission nennt die unten aufgeführten Termine; der 2. Dezember 2026 für die maschinenlesbare Kennzeichnung stammt aus dem [FAQ der Kommission zu Art. 50](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act):

```zeitleiste
2026-08-02 | Transparenz nach Art. 50: Chatbots (Anbieter), Deepfakes und bestimmte veröffentlichte Texte (Betreiber)
2026-12-02 | Maschinenlesbare Kennzeichnung nach Art. 50 Abs. 2 für generative Systeme, die vor dem 2. August 2026 am Markt waren
2027-12-02 | Hochrisiko nach Anhang III, eigenständige Einsätze wie Personalauswahl und Personalsteuerung
2028-08-02 | Hochrisiko nach Anhang I, KI in regulierten Produkten
```

White & Case betont, dass die Verschiebung nur Kapitel III betrifft und nicht die Transparenzpflichten. Die Pflicht zur KI-Kompetenz in Art. 4 wurde abgeschwächt: Anbieter und Betreiber ergreifen jetzt Maßnahmen, die die KI-Kompetenz ihrer Beschäftigten fördern, statt ein ausreichendes Niveau sicherzustellen.

## Wer ist Anbieter, wer Betreiber im Agentforce-Projekt?

Der AI Act verteilt Pflichten nach Rollen. Nach [Art. 3](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-3) ist Anbieter, wer ein KI-System entwickelt oder entwickeln lässt und es unter eigenem Namen in Verkehr bringt oder in Betrieb nimmt. Betreiber ist, wer ein KI-System in eigener Verantwortung beruflich verwendet. Salesforce stellt die Plattform bereit, und Sie als Hersteller betreiben die Agenten, die Sie in Ihrer Org konfigurieren. Wo genau die Grenze verläuft, ist offen: Legen Sie Zweck, Anweisungen, Aktionen und Kanal eines Agenten fest und nehmen ihn unter eigenem Namen in Betrieb, können Sie schon nach Art. 3 als Anbieter gelten.

[Art. 25 Abs. 1](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-25) verschiebt diese Aufteilung: Ein Betreiber wird zum Anbieter, wenn er ein Hochrisiko-System unter eigenem Namen anbietet, es wesentlich verändert oder die Zweckbestimmung eines Systems so ändert, dass es zum Hochrisiko-System wird. Agentforce ist eine allgemeine Agentenplattform. Konfigurieren Sie einen Agenten, der Bewerbungen in eine Rangfolge bringt, begründen Sie diesen Hochrisiko-Zweck vermutlich selbst, entweder unmittelbar nach Art. 3 oder über Art. 25, und damit auch die Anbieterpflichten aus Art. 16. Salesforce rät in seinem [Leitfaden zu KI-Kompetenz](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/guides/ai-literacy-and-compliance.pdf) vom Mai 2025 Kunden, eigenen Rechtsrat einzuholen. Das würde ich wörtlich nehmen: Die Einstufung Ihrer Agenten gehört in die Rechtsabteilung.

## Ein Chat-Agent für Händler ist ein Transparenzfall

Die meisten Agentforce-Agenten bei Herstellern antworten Händlern, Kunden oder Servicepartnern zu Auftragsstatus, Lieferterminen, Ersatzteilen oder Terminen. Nichts davon steht in Anhang III. Diese Agenten fallen unter Art. 50 Abs. 1, der seit dem 2. August 2026 gilt.

Laut FAQ der Kommission greift die Pflicht, wenn es sich bei dem System um KI handelt, es für einen wechselseitigen Austausch gebaut ist, direkt kommuniziert und das Gegenüber eine natürliche Person ist. Ein Einkäufer beim Händler ist eine natürliche Person; B2B schließt Sie nach meiner Lesart des FAQ also nicht aus. Ein Agent, der Fälle nur im Hintergrund klassifiziert, fällt nicht darunter; einer, der dem Händler antwortet, schon. Der Hinweis muss zu Beginn der ersten Interaktion erfolgen, klar erkennbar und barrierefrei. Art. 50 Abs. 1 nimmt KI, die für eine verständige, aufmerksame Person im Kontext offensichtlich ist, von der Pflicht aus. Diese Ausnahme soll aber eng ausgelegt werden; auf ein Roboter-Symbol würde ich mich also nicht verlassen. Das FAQ nennt Bußgelder bis 15 Mio. Euro oder 3 Prozent des weltweiten Jahresumsatzes, je nachdem, was höher ist, mit niedrigeren Obergrenzen für kleine und mittlere Unternehmen.

Formal ist Art. 50 Abs. 1 eine Pflicht des Anbieters. Ob damit Salesforce oder Sie gemeint sind, klärt das FAQ für diese Konstellation nicht; praktisch wird die Welcome Message des Agenten in Ihrer Org hinterlegt. Meine Empfehlung: Setzen Sie den Hinweis dorthin, in jeder Portalsprache. Das [Trailhead-Modul zu Guardrails und Trust Patterns](https://trailhead.salesforce.com/content/learn/modules/trusted-agentic-ai/explore-agentforce-guardrails-and-trust-patterns) nennt außerdem klare Regeln für die Übergabe an einen Menschen (gute Praxis, keine Pflicht aus Art. 50) und führt den Audit Trail im [Einstein Trust Layer](/blog/einstein-trust-layer-was-er-schuetzt/) unter den Best Practices für die Umsetzung.

```hinweis offen
Die maschinenlesbare Kennzeichnung nach Abs. 2 ist eine Anbieterpflicht für generierte Inhalte; fragen Sie Salesforce schriftlich, wie es sie für seine Funktionen erfüllt.
```

Die Kennzeichnung veröffentlichter Texte nach Abs. 4 betrifft Informationen zu Angelegenheiten von öffentlichem Interesse, die an die Öffentlichkeit gerichtet sind, nicht den Liefertermin für einen Händler.

## Wann wird ein Agentforce-Agent zum Hochrisiko-System?

Anhang III listet eigenständige Hochrisiko-Einsätze. In der Salesforce-Org eines Herstellers ist Nummer 4 zur Beschäftigung die kritische. Die [Seite des Service Desk zur Beschäftigung](https://ai-act-service-desk.ec.europa.eu/en/node/464) unterscheidet die Fälle:

- **Erfasst, 4(a) Personalauswahl:** Ranking von Kandidaten, Bewertung von Bewerberantworten, gezielte Stellenanzeigen.
- **Erfasst, 4(b) Arbeitsverhältnisse:** Schichten oder Bereitschaften nach Leistung zuweisen, Leistung bewerten.
- **Ausgenommen nach Art. 6 Abs. 3:** Gespräche terminieren, Eingangsbestätigungen senden, Lebenslaufdaten ordnen, als eng begrenzte Verfahrens- oder Vorbereitungsaufgaben.
- **Nie ausgenommen:** Systeme, die Profiling natürlicher Personen betreiben.

Der Außendienst wird dabei leicht übersehen. 4(b) erfasst die Zuweisung von Aufgaben nach individuellem Verhalten oder persönlichen Merkmalen. Aufträge nach zertifizierter Qualifikation, Gebiet und Verfügbarkeit zu verteilen, ist nicht automatisch Hochrisiko, aber Qualifikationen sind persönliche Merkmale, also braucht es dieselbe Prüfung. Techniker nach Erstlösungsquote zu sortieren und ihnen danach Arbeit zuzuweisen, kommt der Zuweisung nach individuellem Verhalten nahe; ob ein regelbasierter Optimierer überhaupt ein KI-System ist, ist eine eigene Frage. Wie die Engine entscheidet, steht in [Terminplanung im Field Service automatisieren](/blog/salesforce-field-service-terminplanung-automatisieren/).

Ist ein Agent Hochrisiko, gibt Ihnen [Art. 26](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26) als Betreiber ab dem 2. Dezember 2027 konkrete Pflichten: Verwendung nach der Betriebsanleitung des Anbieters, menschliche Aufsicht durch Personen mit Kompetenz und Befugnis, Prüfung der Eingabedaten, die Sie steuern, Überwachung des Betriebs, Aufbewahrung automatisch erzeugter Protokolle für mindestens sechs Monate, soweit nichts anderes gesetzlich geregelt ist, und Information der betroffenen Beschäftigten und ihrer Arbeitnehmervertretungen vor dem Einsatz. In Deutschland ist der Betriebsrat nach BetrVG ohnehin viel früher einzubeziehen; diesen Weg beschreibe ich in [KI-Coding, Betriebsrat und DSGVO](/blog/ki-coding-betriebsrat-dsgvo/).

## Anhang I betrifft die Maschine, nicht den CRM-Agenten

Anhang I erfasst KI in Produkten nach EU-Harmonisierungsrecht. Für Maschinenbauer nennt [Cuatrecasas](https://www.cuatrecasas.com/en/spain/intellectual-property/art/digital-omnibus-ai-has-been-published) die entscheidende Änderung: Die Maschinenverordnung (EU) 2023/1230 rückt von Abschnitt A in Abschnitt B von Anhang I. Für KI in Maschinen gelten dann nur wenige Vorschriften des AI Act unmittelbar. Die inhaltlichen Hochrisiko-Anforderungen sollen über delegierte Rechtsakte in die Maschinenverordnung aufgenommen werden, die spätestens ab 2. August 2028 gelten sollen. Bis es diese delegierten Rechtsakte oder die passenden harmonisierten Normen gibt, können Hersteller laut Cuatrecasas weiter auf die harmonisierten Normen oder gemeinsamen Spezifikationen nach dem AI Act verweisen, um die Konformitätsvermutung zu belegen.

Nach [Art. 6 Abs. 1](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-6) ist ein System nach Anhang I nur dann Hochrisiko, wenn zwei Bedingungen zusammenkommen: Die KI ist Sicherheitskomponente des Produkts oder selbst das Produkt, und das Produkt braucht nach seinem Fachrecht eine Konformitätsbewertung durch Dritte. Das betrifft KI in Maschinensteuerung oder Sicherheitsfunktionen und gehört in die Produktentwicklung und in die Rechtsabteilung, nicht zu Ihren Agentforce-Agenten. Der neue [Art. 6 Abs. 1a](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-6) stellt zudem klar, dass KI-Systeme, die ausschließlich für nicht sicherheitsbezogene Aspekte der Nutzerunterstützung eingesetzt werden, keine Sicherheitskomponenten sind. Art. 6 Abs. 1b hat Vorrang: KI, deren Ausfall oder Fehlfunktion Gesundheit und Sicherheit gefährden würde, ist eine Sicherheitskomponente. Ein CRM-Agent, der einem Techniker ein Ersatzteil vorschlägt, ist nach meiner Lesart Nutzerunterstützung in diesem Sinn, solange sein Vorschlag nicht Teil eines sicherheitskritischen Wartungsschritts ist.

## Beispiel: vier KI-Ideen bei einem Maschinenbauer

Nehmen wir einen Maschinenbauer mit SAP, Service Cloud, Field Service mit 60 Technikern im Außendienst und einem Portal für 250 Händler. Alle Umstände sind Annahmen. Der KI-Lenkungskreis fragt, welche Frist des AI Act für vier Ideen gilt.

**Serviceagent für Händler im Portal.** Er beantwortet Auftragsstatus und Liefertermine. Das ist ein Das ist ein Transparenzfall nach Art. 50 Abs. 1, fällig seit dem 2. August 2026. Jetzt ist zu tun: Hinweis in der Welcome Message in allen Portalsprachen, Übergabe an einen Menschen auf Wunsch und ein Testfall, der den Hinweis prüft, wie in [Agentforce-Agenten testen und freigeben](/blog/agentforce-agenten-testen-freigeben/) beschrieben.

**Technikerzuweisung nach Leistungskennzahl.** Der Außendienst möchte komplexe Einsätze an die Techniker mit der besten Erstlösungsquote geben. Das fällt möglicherweise ab dem 2. Dezember 2027 unter Anhang III 4(b) und ist schon heute ein Thema für den Betriebsrat. Meine Empfehlung: nach zertifizierten Qualifikationen und Verfügbarkeit zuweisen und Leistungsdaten aus der Disposition heraushalten.

**Vorauswahl von Bewerbungen für Servicetechniker.** Die Personalabteilung wünscht sich einen Agenten, der Bewerbungen in eine Rangfolge bringt. Das fällt klar unter Anhang III 4(a), und nach Art. 25 wird das Unternehmen vermutlich Anbieter. Die Alternative ist ein Agent, der nur Gespräche terminiert und Eingangsbestätigungen verschickt, was die Kommission unter den Ausnahmen nach Art. 6 Abs. 3 führt.

**Zustandsüberwachung in der nächsten Maschinengeneration.** Die Produktentwicklung integriert ein Modell, das Verschleiß erkennt. Anhang I greift nur, wenn es als Sicherheitskomponente wirkt und die Maschine eine Konformitätsbewertung durch Dritte braucht; reine Wartungsunterstützung kann unter Art. 6 Abs. 1a fallen, außer ihr Ausfall würde nach Art. 6 Abs. 1b Gesundheit und Sicherheit gefährden. So oder so ist das ein Arbeitsstrang der Produktentwicklung, außerhalb des CRM-Programms.

Für eine Idee muss vor dem Start Art. 50 umgesetzt werden, zwei werden so umgeplant, dass sie außerhalb von Hochrisiko bleiben, und eine gehört in ein anderes Team.

## Alle Agenten der Org erfassen

1. **Alle Agenten erfassen**, dazu die KI-Funktionen der Org, mit Zweck und den Menschen, mit denen sie sprechen.
2. **Jeden einordnen** nach Rolle, Anbieter oder Betreiber, und nach Kategorie: Transparenz, Anhang III, Anhang I oder nichts davon.
3. **Art. 50 jetzt umsetzen** für jeden Agenten, der mit Menschen spricht.
4. **Anwendungsfälle in Personalgewinnung und Personaleinsatz** möglichst in die Ausnahmen nach Art. 6 Abs. 3 planen, sonst Art. 26 einplanen.
5. **Aufbewahrung** von Agentensitzungen und Audit Trail des Trust Layer an den sechs Monaten aus Art. 26 messen; die Aufbewahrungsdauer stellen Sie selbst ein. Ob der Inhalt als Protokoll nach Art. 26 reicht, ist eine Rechtsfrage.
6. **Geprüfte Rollen nach AI Act dokumentieren** und Mitwirkungs- und Nachweispflichten in den Verträgen mit Salesforce und Ihrem Implementierungspartner regeln.
7. **Freigabe der Rechtsabteilung** für die Einstufung vor dem Go-live einholen.

Wo die Einstufung die Architektur prägt, etwa welche Entscheidung eine menschliche Freigabe braucht, unterstütze ich die Kundenseite im Rahmen der [Salesforce-Architektur](/leistungen/salesforce-architektur/). Ob Agentforce überhaupt der richtige Einstieg ist, behandelt [Agentforce für Hersteller: jetzt starten oder warten?](/blog/agentforce-ja-oder-nein-hersteller/), und Kapitel 9 der [KI-Masterclass](/masterclass/ki-salesforce/teamarbeit-und-delivery/) ordnet den AI Act neben Betriebsrat und DSGVO ein.
