---
title: "Revenue Cloud Konfigurator: Wann lohnen Constraint-Regeln?"
description: "Wann der Revenue-Cloud-Konfigurator mit Constraint-Regeln und CML für technische Produkte reicht und wann Hersteller einen externen Konfigurator behalten."
pubDate: 2026-10-28
lang: de
slug: revenue-cloud-konfigurator-constraint-regeln
translationKey: revenue-cloud-configurator-constraint-rules
topic: revenue
categories: [revenue-cloud, architecture]
tags: [Revenue Cloud, Produktkonfigurator, Constraint-Regeln, CML, SAP-Variantenkonfiguration]
takeaways:
  - "Der Revenue-Cloud-Konfigurator bietet zwei Regelwerke: Konfigurationsregeln auf der Business Rules Engine für Validierung, Ausschluss und Pflicht sowie die Constraint Rules Engine für Constraint-Modelle."
  - "Constraint-Regeln lohnen sich, wenn Attribute voneinander abhängen und Optionen zahlreich sind, weil die Engine alle Kombinationen prüft und ungültige in Echtzeit herausfiltert."
  - "Constraint-Modelle werden in CML geschrieben. Visual Builder erzeugt CML ohne Code, der CML Editor ist für komplexe Logik, und die Pflege braucht jemanden mit Modellierungswissen."
  - "Der CML-Leitfaden von Salesforce nennt als Ziel unter 100 Millisekunden und weniger als 1.000 Backtracks pro Modelllauf, jedes Constraint-Modell braucht also Performance- und Regressionstests."
  - "Wo die Regeln heute liegen, entscheidet den Weg: Regeln aus Tabellen ziehen in Revenue Cloud um, Regeln, die SAP-Variantenkonfiguration ohnehin prüft, brauchen ein führendes System."
faq:
  - q: "Was ist CML in Salesforce Revenue Cloud?"
    a: "CML, die Constraint Modeling Language, ist eine domänenspezifische Sprache für Constraint-Modelle. Sie beschreibt Typen, Attribute, Beziehungen und Constraints eines Produkts. Visual Builder erzeugt CML, im CML Editor schreiben Sie es direkt."
  - q: "Was unterscheidet Konfigurationsregeln von Constraint-Regeln?"
    a: "Konfigurationsregeln auf der Business Rules Engine sind explizite Wenn-dann-Regeln für Validierung, Ausschluss und Pflicht. Constraint-Regeln beschreiben gültige Beziehungen zwischen Optionen deklarativ, und die Engine prüft alle Kombinationen. Das skaliert besser bei voneinander abhängigen Attributen."
  - q: "Kann ich meinen bestehenden Konfigurator mit Revenue Cloud weiter nutzen?"
    a: "Ja. Laut Trailhead verbindet sich ein Drittanbieter-Konfigurator über APIs mit Salesforce, während Salesforce weiter Preise, Produktdaten und Angebote verantwortet. Die Regeln pflegen Sie dann an einer Stelle und übergeben das Ergebnis."
  - q: "Brauche ich für die Constraint Rules Engine einen Entwickler?"
    a: "Für einfache Regeln reicht Visual Builder. Größere Modelle mit Tabellen-Constraints, Proxy-Variablen und Performance-Tuning brauchen jemanden, der wie ein Entwickler denkt, dazu Testfälle und Versionskontrolle."
draft: false
---

Der Konfigurator in Revenue Cloud mit der Constraint Rules Engine reicht für technische Produkte, wenn sich die Regeln als Beziehungen zwischen Attributen und Bestandteilen schreiben lassen und jemand beim Hersteller sie nach dem Go-live pflegt. Am meisten bringt er bei voneinander abhängigen Attributen und vielen Optionen, wo Wenn-dann-Regeln bei jeder Produktänderung brechen. Ein externer Konfigurator sollte bleiben, wenn die Regeln in der SAP-Variantenkonfiguration oder im PLM liegen und dort ohnehin geprüft werden, oder wenn die Konstruktion aus Zeichnungen konfiguriert. Dann übernimmt Salesforce das Ergebnis über eine API und behält Preise und Angebot. Wo die Regeln heute liegen, entscheidet den Weg.

## Was kann der Konfigurator in Revenue Cloud?

Der Product Configurator ist die Oberfläche, in der der Vertrieb Optionen eines Bundles auswählt und Attributwerte setzt. Er übernimmt das konfigurierte Produkt in Angebot oder Auftrag, und Konfigurationen lassen sich speichern und wiederverwenden, so die [Trailhead-Einheit zum Konfigurator](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/get-started-with-product-configurator). Trailhead nennt drei Ansätze, die mit der Produktkomplexität wachsen: einfache Validierungsregeln, Auswahlregeln und Constraint-basierte Modellierung. (Trailhead nennt das Produkt Agentforce Revenue Management, salesforce.com Revenue Cloud; der [Artikel zu den Produktnamen](../revenue-cloud-produktnamen-rlm-rca/) ordnet das.)

Dahinter stehen zwei Regelwerke, die jeweils in den Revenue Settings eingeschaltet werden:

- **Konfigurationsregeln auf der Business Rules Engine.** Laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/use-product-configurator-with-business-rules-engine) gibt es Validierungsregeln, die ungültige Auswahlen blockieren, Ausschlussregeln für Produkte, die sich gegenseitig ausschließen, und Pflichtregeln, die nötige Produkte oder Attribute ergänzen. Sie gelten auf Ebene der Transaktion, des Bundles oder des Produkts und werden per Klick gebaut.
- **Die Constraint Rules Engine.** Salesforce nennt sie die Lösung "for complicated, high-volume configurations". Sie arbeitet mit Constraint-Modellen und prüft laut [Trailhead](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/explore-product-configurator-with-constraint-rules-engine) alle möglichen Kombinationen der Produktauswahl und filtert ungültige in Echtzeit heraus.

Der Konfigurator arbeitet auf dem Katalog: Klassifizierungen, Attribute und Bundles. Ist der Katalog schlecht modelliert, rettet das keine Regel-Engine. Wie ich ihn modelliere, steht in [Produktkatalog in Revenue Cloud: Varianten abbilden](../revenue-cloud-produktkatalog-varianten/).

## Wann lohnen sich Constraint-Regeln?

Trailhead vergleicht beide Ansätze in einer Tabelle, die ich hier zusammenfasse:

| | Regelbasiert | Constraint-basiert |
|---|---|---|
| Logik | Explizite Wenn-dann-Regeln | Deklarative Beziehungen zwischen Optionen |
| Skalierung | Schwierig bei wachsender Komplexität | Für komplexe Kataloge gebaut |
| Pflege | Manuelle Anpassung bei jeder Produktänderung | Ungültige Kombinationen fallen dynamisch weg |
| Passt für | Einfache bis mittlere Produkte mit fester Logik | Abhängige Attribute, viele Optionen |

Für einen Maschinenbauer ist die Grenze recht klar. Eine Pumpe mit fünf Optionen und drei Ausschlüssen funktioniert gut mit Konfigurationsregeln. Eine Maschine, bei der Rahmengröße, Antriebsleistung, Spannung, Steuerung und Sicherheitskategorie voneinander abhängen, braucht schnell Dutzende Wenn-dann-Regeln, die sich nach der nächsten Produktänderung widersprechen. Dort lohnt sich die Constraint Engine.

Der Developer Guide zeigt ein passendes Beispiel mit einem Stromaggregat: Ein Tabellen-Constraint listet die gültigen Kombinationen aus Spannung und Betriebsart, und ein ungültiges Paar erzeugt die Meldung "Selected Voltage is not compatible with the required Duty Rating". Genau solche Verträglichkeitstabellen pflegen Anwendungstechniker in der Fertigung in Excel.

## Was ist CML, und wer schreibt es?

Constraint-Modelle werden in CML geschrieben, der Constraint Modeling Language. Der [CML User Guide](https://resources.docs.salesforce.com/rel1/doc/en-us/static/pdf/CML_User_Guide.pdf) beschreibt sie als domänenspezifische Sprache mit Typen (ähnlich wie Klassen), Variablen mit Wertebereichen, Beziehungen mit Kardinalität, die die Bundle-Struktur abbilden, und Constraints. Zu den Constraint-Arten im [Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.264.0.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/cml_constraints.htm) gehören logische Constraints, Tabellen-Constraints sowie Require-, Exclude-, Message-, Preference-, Hide-or-Disable-, Recommendation- und Action-Regeln.

Es gibt zwei Editoren. Visual Builder ist eine No-Code-Oberfläche für einfache Regeln und erzeugt im Hintergrund CML. Der CML Editor ist ein Skript-Editor für komplexe Logik. Beide unterstützen dieselben Regelarten, der Editor erlaubt mehr. Eine Einschränkung aus dem CML-Leitfaden: In Visual Builder steht für Attributwerte nur die Hide-Regel zur Verfügung.

Meine Sicht: CML ist Code, auch wenn ein Teil davon zusammengeklickt wird. Ein Modell für eine Maschinenfamilie mit einigen hundert Zeilen braucht dieselbe Behandlung wie Apex: Versionskontrolle, Review und Tests. Wer es pflegt, muss in Typen, Wertebereichen und Kardinalitäten denken. In den meisten Fertigungsunternehmen ist das weder der klassische Admin noch der Anwendungstechniker, der die Regeln kennt. Planen Sie beide ein, als Team.

Ein nützliches Detail: Tabellen-Constraints können ihre Zeilen laut Developer Guide aus einem Standard- oder Custom-Objekt in Salesforce importieren. Eine Verträglichkeitstabelle, die in SAP oder im PLM gepflegt wird, lässt sich so über die Schnittstelle in ein Custom-Objekt laden, statt sie von Hand in CML abzutippen. Das führende System bleibt draußen, die Prüfung läuft in Salesforce.

## Wie testen Sie Constraint-Modelle?

Der CML-Leitfaden setzt klare Ziele: Ausführungszeit pro Modell idealerweise unter 100 Millisekunden, weniger als 1.000 Backtracks und keine Verletzungen. Dafür empfiehlt er kleine Wertebereiche, die kleinste nötige Kardinalität und wenige Nachkommastellen, weil jedes davon die Kombinationen vervielfacht, die die Engine durchprobiert. Zur Analyse zeigen Debug-Logs auf Stufe FINE einen Abschnitt RLM_CONFIGURATOR_STATS mit Ausführungszeit, Verletzungen und Backtracking.

Ich ergänze für jede Produktfamilie zwei Arten von Tests:

1. **Regressionsfälle.** Eine Liste gültiger Konfigurationen, die funktionieren müssen, und ungültiger, die abgelehnt werden müssen, jeweils mit der erwarteten Meldung. Sie laufen nach jeder Modelländerung.
2. **Performancefälle.** Die größte realistische Konfiguration, gemessen am Ziel von 100 Millisekunden.

Wer ein Modell ohne diese Fälle ändert, findet den Fehler beim Kunden. Wie Tests und Reviews in den Release-Prozess passen, beschreibt das DevOps-Kapitel [Qualität, Tests und Reviews](../../masterclass/devops-release-management/qualitaet-tests-reviews/). Wer von Salesforce CPQ kommt, baut Produktregeln in diesem Modell neu; die Unterschiede stehen in [Salesforce CPQ vs. Revenue Cloud](../salesforce-cpq-revenue-cloud-unterschiede/).

## Wann sollten Sie einen externen Konfigurator behalten?

Laut Trailhead verbindet sich ein Drittanbieter-Konfigurator über APIs mit Salesforce und ermöglicht eigene Oberflächen und Abläufe, während Salesforce weiter Preise, Produktdaten und Angebote verantwortet. Die Anbindung lässt sich in beide Richtungen bauen, die entscheidende Frage ist also, wo die Regeln leben sollen.

Ich schaue darauf, wo sie heute liegen:

- **In Excel-Tabellen und in den Köpfen der Anwendungstechniker.** Das ist der beste Fall für Revenue Cloud. Die Regeln müssen ohnehin aufgeschrieben werden, und CML gibt ihnen ein Zuhause mit Tests.
- **In der SAP-Variantenkonfiguration.** Prüft SAP die Konfiguration beim Auftragseingang noch einmal, gibt es nach einem Nachbau in CML zwei Regelwerke. Sie laufen bei der ersten Änderung auseinander, die nur an einer Stelle gepflegt wird. Hier lasse ich entweder SAP führen und rufe es auf, oder ich verlege die Führung nach Salesforce, und SAP übernimmt das Ergebnis. Beides funktioniert, zwei führende Systeme nicht. Dasselbe Argument gilt für Agenten: Geschäftsregeln gehören an eine deterministische Stelle, wie in [Agent Script: Warum Geschäftsregeln nicht ins LLM gehören](../agent-script-regeln-statt-llm/).
- **Im PLM oder in einem Konstruktionskonfigurator**, der Zeichnungen oder Stücklisten erzeugt. Dann bleibt der externe Konfigurator, und Salesforce erhält das konfigurierte Produkt mit seinen preisrelevanten Attributen.

Für Angebote mit KI hat das eine Nebenwirkung. Ein Agent kann nur Regeln einhalten, die er aufrufen kann. Liegen die Regeln außerhalb von Salesforce, lasse ich konfigurierte Maschinen beim Innendienst, wie in [KI-Angebote für Händler mit dem Partner Sales Assistant](../ki-angebote-haendler-partner-sales-assistant/) beschrieben.

## Ein typisches Szenario, als Annahme

Ein typisches Szenario, als Annahme: Ein Maschinenbauer hat drei Produktlinien. Zwei pflegen Anwendungstechniker in Excel mit rund 150 Verträglichkeitsregeln. Die dritte nutzt die SAP-Variantenkonfiguration mit Beziehungswissen, das die Fertigung bei jedem Auftrag prüft.

Meine Empfehlung in diesem Fall: Die beiden Excel-Linien gehen in Constraint-Modelle, mit Tabellen-Constraints aus einem Custom-Objekt, Regressionsfällen pro Linie und einem benannten Verantwortlichen im Produktmanagement. Die SAP-Linie behält vorerst ihren Konfigurator. Salesforce erhält das konfigurierte Ergebnis über eine Schnittstelle, bepreist es und erstellt das Angebot. Nach einem Jahr kann der Hersteller entscheiden, ob die dritte Linie folgt, auf Basis des echten Pflegeaufwands statt Annahmen.

## Wo starten Sie?

1. **Erfassen Sie die Regeln**: wie viele, wo sie liegen, wer sie ändert und wie oft.
2. **Wählen Sie eine Produktfamilie** als Pilot, am besten eine, deren Regeln in Excel liegen.
3. **Schreiben Sie zuerst die Testfälle**, gültige und ungültige Konfigurationen mit erwarteten Meldungen.
4. **Legen Sie das führende System fest** pro Produktlinie: Revenue Cloud, SAP oder ein externer Konfigurator, nie zwei.
5. **Benennen Sie den Verantwortlichen**, der das Modell nach dem Go-live pflegt.

Das ganze Kapitel steht im Masterclass-Teil [Katalog, Konfigurator, Preise](../../masterclass/revenue-cloud/produktkatalog-konfigurator-preise/), und wie Hersteller konfigurierte Produkte in ein Sales Agreement übernehmen, beschreibt [vom Angebot zum Sales Agreement](../angebot-zu-sales-agreement-produktkonfigurator/). Das führende System für Regeln zwischen SAP und Salesforce festzulegen gehört zu meiner Arbeit in der [Salesforce-Architektur](../../leistungen/salesforce-architektur/).

Constraint-Regeln lohnen sich, wenn die Regeln ein Zuhause und einen Verantwortlichen haben, ob dieses Zuhause Revenue Cloud ist oder nicht. Wenn Sie den Konfigurator gegen Ihre heutige Lösung abwägen, [schreiben Sie mir](#contact).
