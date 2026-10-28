---
title: "KI-native Delivery: kleinere Salesforce-Teams"
description: "KI-native Delivery verkleinert Salesforce-Teams auf Pods aus Architekt, Builder-Reviewer und Fachexperte. Was sich in der Programmorganisation ändert."
pubDate: 2026-10-27
lang: de
slug: ki-kleinere-salesforce-teams-delivery
translationKey: smaller-teams-ai-native-delivery
topic: governance
categories: [architecture, ai]
tags: [KI-native Delivery, Programmsteuerung, Teamaufstellung, KI-Coding, Partnersteuerung, Maschinenbau]
takeaways:
  - "KI-native Delivery heißt: Coding-Agenten entwerfen, bauen und testen, Menschen geben die Absicht vor, prüfen das Ergebnis und verantworten es; Teams schrumpfen auf Pods aus Architekt, Builder-Reviewer und Fachexperte."
  - "In der McKinsey-Umfrage von 2026 meldeten 79 Prozent der Befragten aus Organisationen mit dem größten Tempogewinn kleinere Teams, der Median sank von etwa zehn auf sieben Personen."
  - "Der Engpass wandert zum Hersteller: Jeder Pod braucht einen Fachexperten aus Service, Vertrieb oder After-Sales, der täglich laufende Software abnimmt."
  - "Ein kurzer Intent mit prüfbaren Akzeptanzkriterien ersetzt für die meisten Stories das lange Lastenheft; SAP-Schnittstellen sowie Garantie- und Preisregeln brauchen weiter genaue Spezifikationen."
  - "Jedes Artefakt hat einen benannten Verantwortlichen, Agenten arbeiten nur in Sandboxes und Scratch Orgs, und für Menschen- und Agentencode gelten dieselben Pipeline-Prüfungen."
faq:
  - q: "Was ist KI-native Delivery in Salesforce-Projekten?"
    a: "Ein Liefermodell, das von Anfang an um Coding-Agenten herum gebaut ist: Agenten entwerfen Stories, Code, Tests und Runbooks, Menschen definieren den Intent, prüfen das Ergebnis und verantworten jedes Artefakt. Kleine Pods ersetzen die klassische Pyramide aus vielen Junior-Entwicklern."
  - q: "Brauchen KI-native Salesforce-Teams wirklich weniger Personen?"
    a: "Die Evidenz deutet darauf hin, ist aber dünn. McKinsey meldet, dass 79 Prozent der Befragten aus den Spitzenorganisationen kleinere Teams sehen, Median von etwa zehn auf sieben, in einer Umfrage mit Selbstauskunft. Messen Sie Ihre eigenen Durchlaufzeiten, bevor Sie ein Team verkleinern."
  - q: "Wer sollte bei einem Hersteller Fachexperte im Pod sein?"
    a: "Jemand aus dem Fachbereich, der den Prozess kennt und darüber entscheiden darf, etwa eine Garantiesachbearbeiterin aus dem After-Sales oder ein Disponent aus dem Außendienst. Planen Sie rund die Hälfte der Arbeitszeit dieser Person ein; ohne sie baut der Pod auf Annahmen."
  - q: "Ersetzt die tägliche Demo den Abnahmetest?"
    a: "Für die meisten Stories ersetzt sie das lange Warten auf den Abnahmetest, weil der Fachexperte täglich in der Sandbox abnimmt. Prozesse, die in SAP buchen, etwa Gutschriften für Garantieanträge, brauchen vor dem Release weiter einen End-to-End-Test."
draft: false
---

KI-native Delivery verkleinert ein Salesforce-Team auf kleine Pods: ein Architekt, ein Builder-Reviewer, der die Coding-Agenten steuert, und ein Fachexperte aus dem Fachbereich. Für Hersteller liegt die größere Änderung auf der eigenen Seite, weniger beim Partner. Jeder Pod braucht jemanden aus Service, Vertrieb oder After-Sales, der täglich über den Prozess entscheidet und in einer täglichen Demo laufende Software abnimmt. Kurze Intents ersetzen lange Lastenhefte, und jedes Artefakt hat einen benannten Verantwortlichen. Kann Ihre Organisation diese Personen nicht freistellen, machen kleinere Partnerteams das Programm nicht schneller.

## Was ist KI-native Delivery?

KI-native Delivery bedeutet, den gesamten Lieferprozess um KI-Agenten herum zu gestalten, statt dem alten Prozess einen Coding-Assistenten hinzuzufügen. Die klarste Beschreibung für Salesforce stammt aus der Praxis, nicht aus einer Studie: der [Beitrag von Amit Chaudhary auf ApexHours](https://www.apexhours.com/ai-native-delivery-for-salesforce/) vom 19. Oktober 2026. In seinem Framework entwerfen, bauen, testen und dokumentieren Agenten, während Menschen „set intent and guardrails, review output, own the outcome“: Absicht und Leitplanken vorgeben, Ergebnisse prüfen, das Resultat verantworten. Die Alternative nennt er „the old process with faster typing“, also den alten Prozess mit schnellerem Tippen.

Für die Programmorganisation zählen fünf Bausteine:

- **Intents statt Lastenheft.** Ein Intent ist eine ergebnisorientierte Anforderung: erwartetes Ergebnis, warum es zählt, betroffene Nutzer, Rahmenbedingungen und Leitplanken sowie Erfolgskriterien.
- **Kleine Pods statt Pyramide.** Die große Pyramide aus Junior-Entwicklern weicht kleinen Pods aus Architekt, Builder-Reviewer und Fach- oder BA-Lead.
- **Tägliche Demo statt Status-Standup.** Das Team zeigt dem Product Owner laufende Software, die seit dem Vortag entstanden ist.
- **Benannte Verantwortung.** „A named human owns every artifact“, jedes Artefakt hat also einen namentlich benannten Menschen als Verantwortlichen. Agenten arbeiten nur in freigegebenen Sandboxes und Scratch Orgs, nie in Produktion.
- **Dieselben Prüfungen für alle.** PMD, Code Analyzer und ApexGuru laufen in der CI für Menschen- und Agentencode gleichermaßen.

Ich lese ApexHours als gut begründetes Praxis-Framework. Es nennt keine Teamgrößen und keine gemessenen Ergebnisse, die Zahlen müssen also aus anderen Quellen kommen.

## Warum werden Salesforce-Teams kleiner?

McKinsey hat im Mai 2026 334 Führungskräfte aus Produkt und Engineering befragt und die Ergebnisse im August unter dem Titel [Beyond the copilot](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) veröffentlicht.

```kennzahlen
79 % | der Befragten aus Organisationen mit dem größten Tempogewinn melden kleinere Teams
7 | Personen hat ein Team dort im Median, vorher etwa zehn
50 bis 80 % | kürzere Entwicklungszyklen meldet ein globales Technologieunternehmen
quelle: McKinsey, Beyond the copilot, August 2026
```

Dieses Technologieunternehmen ging von Produktteams mit 8 bis 10 Personen auf agentische Teams mit 4 bis 6 über und meldet etwa doppelte Kapazität. McKinsey sieht zwei Rollenfamilien entstehen: „Definers“, die Produkt und Design verbinden, und „Builders“, die Entwicklung, Test und Betrieb verbinden.

Zwei Einschränkungen aus derselben Quelle. Die Zahlen sind Selbstauskünfte von Führungskräften, und 30 Prozent der Befragten sagen, die Produktivität ihrer Teams sei gesunken. McKinsey schreibt außerdem, dass sich das Tempo schneller verbessert als die Qualität. Der DORA-Bericht 2025 fand weiter einen [negativen Zusammenhang zwischen KI-Einsatz und Lieferstabilität](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report), und DORA zählt [kleine Batches und Nutzerzentrierung](https://dora.dev/capabilities/) zu den sieben Fähigkeiten, die den Nutzen von KI verstärken. Kleine Pods mit täglichem Feedback sind eine direkte Antwort auf beide Punkte. Wie Sie prüfen, ob Ihr eigenes Programm schneller wird, beschreibe ich in [KI-Nutzen im Salesforce-Projekt messen](../ki-nutzen-salesforce-projekt-messen/).

## Was ändert sich in der Programmorganisation eines Herstellers?

### Der Fachbereich wird zum Engpass

Im klassischen Programm schreibt der Fachbereich Anforderungen und wartet dann wochenlang auf den Abnahmetest. Im Pod sieht der Fachexperte jeden Tag laufende Software und entscheidet sofort. Für einen Maschinenbauer heißt das: eine Garantiesachbearbeiterin aus dem After-Sales, ein Disponent aus dem Außendienst oder jemand aus dem Händlervertrieb, der über seinen Prozess entscheiden darf. Nach meiner Einschätzung braucht diese Person rund die Hälfte ihrer Zeit für den Pod. Serviceleiter planen das selten ein, und genau das würde ich vor jedem Partnerangebot verhandeln.

### Intents ersetzen den größten Teil des Lastenhefts

Ein guter Intent für eine Story im Händlerportal passt auf eine halbe Seite: Händler sehen den Liefertermin ihrer Ersatzteilbestellung, ohne anzurufen, gemessen an weniger Telefonanfragen; Rahmenbedingungen sind händlerspezifische Preise und Freigaben pro Account. McKinsey ergänzt, Spezifikationen sollten so klar sein, dass ein Agent danach handeln kann. Ich lese das als prüfbare Akzeptanzkriterien, nicht als mehr Prosa. Zwei Dinge behalten eine genaue Spezifikation: Schnittstellen zu SAP oder proALPHA, weil das ERP-Team einem eigenen Releaseplan folgt, und Regeln mit finanzieller Wirkung wie Garantieberechtigung oder Preisfreigabe.

### Statusrunden werden zu Demos

Die tägliche Demo ersetzt das Standup und einen guten Teil des Statusberichts. Ein Lenkungsausschuss, der das Garantieantragsformular in der Sandbox laufen sieht, braucht weniger Ampeln. McKinsey nennt zweitägige Sprints als illustrativen Richtwert. Das würde ich nicht übernehmen, solange SAP-Transporte in festen Fenstern laufen; ein kurzer Zyklus in Salesforce mit einem Release-Rhythmus, der zum ERP passt, funktioniert besser.

### Verantwortung muss aufgeschrieben werden

Mit weniger Personen trägt jede einzelne mehr Wissen, und ein Agent verantwortet nichts. Der benannte Verantwortliche pro Artefakt passt zur [Object Ownership Matrix](../object-ownership-matrix-salesforce/), die ich nutze, wenn sich mehrere Partner eine Org teilen: Ein Team verantwortet jedes Objekt, eine Person jeden Flow, jede Klasse und jeden Agenten. Dazu kommen die Prüfungen in der Pipeline, siehe [Quality Gates für KI-Code in der Salesforce-Pipeline](../quality-gates-ki-code-salesforce-pipeline/).

## Ein typisches Szenario: aus einem großen Partnerteam werden drei Pods

Nehmen wir einen Maschinenbauer mit Sales Cloud, Service Cloud, Field Service und einer SAP-Anbindung. Sein Partner arbeitet mit einem klassischen Team aus zwölf Personen: ein Architekt, eine Projektleitung, zwei Business Analysts, sechs Entwickler (davon vier Junior) und zwei Tester. Alle Zahlen sind Annahmen, die das Vorgehen zeigen sollen. Geplant sind drei Streams: Garantieanträge von Händlern, Ersatzteilbestellung im Händlerportal und Arbeitsaufträge im Außendienst mit Ersatzteilreservierung.

Der Partner schlägt drei Pods vor. Jeder Pod bekommt einen Architekten und einen Builder-Reviewer vom Partner; eine Person für Plattform und DevOps arbeitet für alle drei. Das sind sieben Personen beim Partner statt zwölf. Die Fachexperten stellt der Hersteller: eine Garantiesachbearbeiterin, eine Koordinatorin aus dem Händlervertrieb und einen Disponenten aus dem Außendienst, jeweils zur Hälfte, also 1,5 Vollzeitstellen, die der Fachbereich bisher nicht gegeben hat.

Drei Entscheidungen tragen oder kippen dieses Setup:

- **Kein Fachexperte, kein Pod.** Kann die Serviceleitung den Disponenten nicht freistellen, wartet der Field-Service-Pod. Ohne tägliche Abnahme baut er auf Vermutungen, und die Demo wird zur Vorführung für den Partner.
- **Ein leitender Architekt über alle Pods.** Drei Pod-Architekten würden jeweils ihr eigenes Account- und Asset-Modell entwerfen. Datenmodell, Freigaben und die SAP-Schnittstelle würde ich bei einem Architekten auf Kundenseite halten.
- **Formaler Test bleibt dort, wo SAP bucht.** Garantiegutschriften gehen nach SAP, dieser Stream behält deshalb vor jedem Release einen End-to-End-Test. Der Portal-Stream geht nach täglicher Abnahme live.

Ob sieben Personen liefern, was vorher zwölf geliefert haben, bleibt offen, bis die Durchlaufzeiten gemessen sind. Der Preis des Partners für das neue Setup gehört ins kaufmännische Modell, siehe [Festpreis statt Aufwand](../festpreis-statt-aufwand-ki-salesforce/).

## Wo passt das Pod-Modell noch nicht?

- **Streams, in denen vor allem gewartet wird.** Verbringt eine Story den größten Teil ihrer Durchlaufzeit mit Warten auf das SAP-Team oder eine Middleware-Änderung, ändert ein schnellerer Salesforce-Pod wenig.
- **Fachbereiche, die niemanden freistellen können.** Ohne tägliche Entscheidungen aus Service oder Vertrieb ist ein klassisches Team mit Product Owner und geplantem Abnahmetest die sicherere Aufstellung. Dessen Entwickler können trotzdem mit Coding-Agenten arbeiten.
- **Teams ohne funktionierende Pipeline.** Pods liefern mehr Änderungen pro Tag. Ohne Versionskontrolle, automatisierte Tests und Validierungsdeployments entstehen im höheren Tempo vor allem schneller Fehler.
- **Dünne Seniorität beim Partner.** Ein Pod hat keine Juniors, die nebenbei lernen. Geht der Builder-Reviewer, geht ein großer Teil des Wissens mit. Mindestverweildauern zählen hier noch mehr als in dem Setup, das ich in [warum Nearshore-Teams höchstens acht Entwickler haben sollten](../nearshore-teams-salesforce-acht-entwickler/) beschreibe. Was sich für Nearshore-Teams mit KI-Agenten ändert, steht in [Nearshore-Teams für Salesforce mit KI-Agenten](../nearshore-salesforce-teams-ki-agenten/).

## Wo sollten Sie anfangen?

```schritte
Einen Stream wählen
  Mit klarem Prozess, einer entscheidungsbefugten Person im Fachbereich und wenigen ERP-Abhängigkeiten. Stories im Händlerportal passen oft gut.
Fachexperten zuerst benennen
  Seine Zeit von der Führungskraft freigeben lassen, bevor der Partner umbaut.
Intents schreiben
  Für die ersten zehn Stories, mit prüfbaren Akzeptanzkriterien; genaue Spezifikationen bleiben für Schnittstellen und Regeln mit finanzieller Wirkung.
Leitplanken vereinbaren
  Mit dem Partner: benannter Verantwortlicher pro Artefakt, Agenten nur in Sandboxes und Scratch Orgs, dieselben Prüfungen für allen Code. Die Vertragsseite beschreibe ich in [Partner mit KI-Coding: Regeln für den Vertrag](../partner-ki-coding-regeln-vertrag/).
Messen und entscheiden | 3 Monate
  Durchlaufzeit und Nacharbeit messen und erst dann über die anderen Streams entscheiden.
```

Streams, Teamaufstellungen und die Fachbereichszeit dahinter zu planen, ist der Kern meiner [Programmsteuerung für Salesforce-Programme](../../leistungen/projektsteuerung-nearshore/).

Kleinere Salesforce-Teams funktionieren, wenn der Hersteller seine eigenen Prozessexperten täglich in die Pods gibt. Wenn Sie prüfen möchten, ob Ihr Programm dafür bereit ist, [schreiben Sie mir](#contact).
