---
title: "Botsitting im Salesforce-Projekt: Miro und Figma streichen"
description: "Botsitting kostet laut Glean 6,4 Stunden pro Woche. Warum ich in Salesforce-Projekten Miro, Lucid und Figma streiche und Claude das Ergebnis direkt baut."
pubDate: 2026-11-12
lang: de
slug: botsitting-salesforce-projekt-tools
translationKey: botsitting-salesforce-tools
topic: ai
categories: [ai, devops]
contactBrief: architecture
tags: [Botsitting, Claude, MCP, Miro, Figma, Lightning Web Components]
takeaways:
  - "Botsitting ist die Arbeit, KI-Ergebnisse brauchbar zu machen. Laut Work AI Index 2026 kostet sie Beschäftigte 6,4 Stunden pro Woche."
  - "Wer mehrere KI-Werkzeuge nutzt, gehört laut Glean 35 % häufiger zu den Vielfach-Botsittern. Jedes Zwischenwerkzeug ist eine weitere Übergabe."
  - "Die MCP-Schnittstellen von Miro, Lucid und Figma übertragen das Artefakt. Entscheidungen und Gründe aus dem Workshop fehlen darin meist."
  - "Ein Claude-Artifact ist teilbar, klickbar und mit dem Jira-Ticket verlinkt. Aus HTML und CSS baut Claude danach die Lightning Web Component."
  - "Geprüft wird weiterhin, aber am Ergebnis: Der Fachbereich prüft das Artifact, der Architekt das Lösungsdesign, niemand einen Zwischenstand."
faq:
  - q: "Was bedeutet Botsitting?"
    a: "Botsitting bezeichnet die unsichtbare Arbeit, die nötig ist, damit KI-Ergebnisse brauchbar werden: fehlenden Kontext liefern, Ausgaben prüfen, Fehler beheben und Prompts wiederholen. Der Begriff stammt aus dem Work AI Index 2026 des Work AI Institute, einer Forschungseinheit von Glean."
  - q: "Was ist der Unterschied zwischen Botsitting und Botshitting?"
    a: "Botsitting ist der Aufwand, KI-Ergebnisse zu prüfen und nachzubessern. Botshitting heißt, Ergebnisse weiterzugeben, die man nicht geprüft hat und auf Nachfrage nicht erklären könnte. Laut Glean geben 69 % der KI-Nutzer mindestens eine solche Verhaltensweise zu."
  - q: "Brauche ich Figma, um Lightning Web Components zu entwerfen?"
    a: "Nein. Claude erzeugt einen klickbaren Prototyp in HTML und CSS nach dem Salesforce Lightning Design System und baut daraus anschließend die Lightning Web Component. Ein Figma-Entwurf als Zwischenschritt fügt eine Übergabe hinzu, ohne dem Ergebnis etwas hinzuzufügen."
  - q: "Wie teile ich Claude-Ergebnisse mit dem Fachbereich?"
    a: "Als Artifact aus Claude Code: eine Seite mit eigenem Link, die sich teilen und mit dem Jira-Ticket verknüpfen lässt. Sie ist klickbar und kann als Dashboard dienen, was ein Screenshot oder ein PDF nicht leisten."
draft: false
---

Botsitting ist die Arbeit, die Menschen leisten, damit KI-Ergebnisse brauchbar werden: Kontext nachliefern, Ausgaben prüfen, Fehler korrigieren. In Salesforce-Projekten entsteht unnötig viel Botsitting, wenn Workshop-Ergebnisse erst in Miro, die Architektur in Lucidchart und die Oberfläche in Figma festgehalten werden und eine KI danach weiterarbeitet. Alle drei Werkzeuge haben inzwischen eine MCP-Schnittstelle und eigene KI-Funktionen. Trotzdem geht bei jeder Übergabe Kontext verloren. Deshalb empfehle ich, diese Zwischenwerkzeuge zu streichen. Claude baut das Ergebnis direkt: als teilbares Artifact, als Diagramm im Repository oder als Lightning Web Component. Zwischenversionen braucht niemand, es zählt das Ergebnis.

## Was bedeutet Botsitting?

Botsitting bezeichnet den Aufwand, den Beschäftigte leisten, damit die Ergebnisse von KI-Werkzeugen nutzbar werden. Der Begriff ist ein Wortspiel mit Babysitting. Bekannt wurde er durch den [Work AI Index 2026](https://glean.com/work-ai-institute/work-ai-index) des Work AI Institute, einer Forschungseinheit des KI-Anbieters Glean, veröffentlicht im Juni 2026. Befragt wurden 6.000 vollzeitbeschäftigte Wissensarbeiter in den USA, Großbritannien und Australien. In der deutschen Fachpresse hat [it-daily.net](https://www.it-daily.net/it-management/ki/top-qualifiziert-bot-kindermaedchen) das Phänomen als „Bot-Kindermädchen“ beschrieben.

```kennzahlen
6,4 Std. | Botsitting pro Woche, bei rund 11 Stunden Zeitersparnis durch KI
37 % | der KI-Zeit entfallen auf Botsitting, mehr als auf das Produzieren (36 %)
2,3 Std. | pro Woche nur dafür, der KI fehlenden Kontext zu liefern
+35 % | häufiger Vielfach-Botsitter, wer mehrere KI-Werkzeuge nutzt
quelle: Glean, Work AI Index 2026, Befragung von 6.000 Wissensarbeitern, Dezember 2025 bis Januar 2026
```

Glean unterscheidet zwei Arten von Botsitting. Produktiv ist es, wenn Menschen wichtige Ergebnisse prüfen und Fachwissen einbringen. Unproduktiv ist es, wenn sie denselben Kontext in mehrere Werkzeuge eingeben oder denselben Prompt in einem zweiten Werkzeug wiederholen, weil das erste Ergebnis nicht brauchbar war. Laut [Glean-Blog](https://www.glean.com/blog/work-ai-index-hidden-work) wiederholen 60 % der Befragten einen Prompt in einem zweiten Werkzeug. Glean beschreibt den Menschen dabei als Integrationsschicht, die Kontext, Daten und Absicht von einem System ins nächste trägt.

Die Studie stammt von einem Anbieter, der eine Plattform für Unternehmenswissen verkauft. Die Vergleiche zwischen Werkzeugen sind nur Korrelationen. Die Richtung deckt sich trotzdem mit dem, was ich in Salesforce-Projekten sehe.

## Jede Übergabe zwischen Werkzeugen kostet Kontext

Anthropic beschreibt dasselbe Muster für KI-Agenten. Im Artikel [Building agents: When to fold subagents into your main agent loop](https://claude.com/de/resources/articles/building-agents-when-to-fold-subagents-into-your-main-agent-loop) vom Oktober 2026 berichtet das Applied-AI-Team, dass in mehreren Unternehmensprojekten ein einzelner Agent mit Skills besser abschnitt als Architekturen mit vielen Subagenten, oft günstiger und schneller. Bei einem Kunden halbierte sich damit die Laufzeit ungefähr. Der Grund: Bei jeder Übergabe muss jemand entscheiden, welcher Kontext übergeben wird, und dabei gehen Details verloren. Der Artikel nennt das ein Telefonspiel, bei dem die Genauigkeit mit jeder Übergabe sinkt. Ein Agent, der alle bisherigen Schritte im selben Kontext sieht, kann sie verknüpfen. Zusammenfassungen von Subagenten enthalten weniger Kontext.

Ich sehe dasselbe Muster bei Werkzeugen. Ein Miro-Board, ein Lucidchart-Diagramm und ein Figma-Entwurf sind Übergabepunkte. Jedes enthält nur das, was jemand hineingeschrieben hat. Das folgende Beispiel zeigt, wie eine fachliche Ausnahme auf diesem Weg verloren geht:

```kette
titel: Beispiel: eine Freigaberegel auf dem Weg durch vier Werkzeuge
Satz im Workshop | „Aufträge über 50.000 Euro gibt der Vertriebsleiter frei, außer bei Abrufen aus Rahmenverträgen.“
Miro-Notiz | „Freigabe ab 50.000 Euro“
Lucidchart | Raute „Betrag über 50.000?“ mit Pfeil zum Vertriebsleiter
Figma | Schaltfläche „Zur Freigabe senden“
Jira-Story | Freigabe ab 50.000 Euro, die Ausnahme fehlt
fazit: Die Ausnahme stand nur im Gespräch. Claude mit Mitschrift und Org-Metadaten übernimmt sie direkt in die Story.
```

Der Fehler fällt erst im Abnahmetest auf, wenn ein Abruf aus einem Rahmenvertrag unnötig auf eine Freigabe wartet. Dann wird daraus ein Change Request, und die Diskussion beginnt von vorn.

## Warum MCP-Schnittstellen das Problem nicht lösen

Die Hersteller der Werkzeuge haben darauf reagiert. Miro hat im Februar 2026 einen [MCP-Server](https://miro.com/it/newsroom/miro-launches-mcp-server-to-connect-visual-collaboration-with-ai-coding) als Beta-Version für Coding-Agenten wie Claude Code veröffentlicht. Der [MCP-Server von Lucid](https://community.lucid.co/community-news-and-announcements-9/new-capabilities-for-the-lucid-mcp-server-generate-mermaid-diagrams-timelines-and-more-14121) erzeugt inzwischen Mermaid-, BPMN- und UML-Diagramme sowie Datenmodelle. Figma bietet einen MCP-Server für den Dev Mode und wandelt seit Februar 2026 mit dem gemeinsam mit Anthropic entwickelten [„Code to Canvas“](https://news.designrush.com/figma-code-to-canvas-ux-to-code-workflow) Code wieder in bearbeitbare Entwürfe um. Das Model Context Protocol (MCP) ist ein offener Standard, über den KI-Agenten auf externe Anwendungen zugreifen.

Das hilft, wenn das Artefakt ohnehin existieren muss. MCP überträgt aber nur das Artefakt. Ein Diagramm zeigt, welche Systeme verbunden sind. Es zeigt nicht, warum die SAP-Schnittstelle asynchron sein muss, welcher Bereichsleiter das Pflichtfeld verlangt hat oder welche Variante im Workshop verworfen wurde. Diese Gründe stehen in der Mitschrift, im Ticket und im Repository. Wenn Claude diese Quellen direkt liest, ist das Diagramm als Zwischenschritt überflüssig.

Für die IT-Leitung ist ein zweiter Punkt wichtig. Jedes zusätzliche Werkzeug bedeutet in der Regel eine Lizenz, ein Berechtigungskonzept, eine Datenschutzprüfung und eine weitere Schnittstelle, die ein Agent nutzen darf. Was das für Freigaben bedeutet, beschreibe ich in [Connected Apps und OAuth für KI-Integrationen](../connected-apps-oauth-ki-integrationen/) und in [Community-MCP-Server: Risiken für Salesforce](../community-mcp-server-salesforce-risiken/).

## Was Claude statt der Zwischenwerkzeuge liefert

```praxis
Ich habe die komplette Kette vom Workshop bis zum Deployment KI-gestützt umgesetzt, nach dem [KI-nativen Delivery-Prozess](../ki-native-salesforce-delivery-prozess/). Dabei habe ich gemerkt, wie viel Qualität an jeder Stelle verloren geht, an der ein Ergebnis in ein anderes Werkzeug übertragen und danach wieder an die KI übergeben wird.
```

Seitdem lasse ich keine Zwischenversionen in Miro oder Figma mehr erstellen. Die Handgriffe führt die KI aus, also reicht ein Ausgabeformat, das Claude selbst erzeugt. Am häufigsten nutze ich Artifacts aus Claude Code: Seiten mit eigenem Link, die ich teilen und mit dem Jira-Ticket verknüpfen kann. Sie sind klickbar, und einige nutzen wir als vollwertiges Dashboard. Das ist deutlich interaktiver als ein Screenshot oder ein PDF.

```tabelle
titel: Was ich statt des Zwischenwerkzeugs einsetze
spalten: Aufgabe | Bisher | Mit Claude *
Workshop und Prozessaufnahme | Miro-Board, danach abgetippt | Protokoll, Prozessdiagramm und Story-Entwürfe als Artifact am Jira-Ticket
Architektur und Integration | Lucidchart-Diagramm in Confluence | Lösungsdesign mit Mermaid-Diagramm im Repository
Datenmodell | ERD in Lucidchart, von Hand abgeglichen | ERD aus den Objektmetadaten der Org
Oberfläche | Figma-Entwurf, danach Umsetzung | Klickbarer Prototyp in HTML und CSS, danach Lightning Web Component
Projektstatus | Folien oder PDF | Interaktives Dashboard als Artifact
```

Bei Oberflächen ist der Unterschied am größten. Claude erzeugt HTML und CSS nach dem Salesforce Lightning Design System (SLDS) und baut daraus anschließend die Lightning Web Component. Nach meiner Erfahrung entstehen dabei keine Reibungsverluste. Salesforce zeigt im [Salesforce Developers Blog](https://developer.salesforce.com/blogs/2025/10/vibe-code-lightning-web-components-with-salesforce-dx-mcp) selbst, wie ein Figma-Link in Agentforce Vibes zur Lightning Web Component wird. Figma ist dort nur noch die Eingabe für die KI. Wenn kein Figma-Entwurf existiert, beschreibt der Fachbereich die Maske im Workshop, und Claude baut den Prototyp direkt. Welcher Coding-Agent dafür passt, vergleiche ich in [Agentforce Vibes, Claude Code, Codex oder Copilot](../agentforce-vibes-claude-code-copilot-vergleich/).

## Welche Einwände höre ich, und was antworte ich?

**„Der Fachbereich denkt in Bildern.“** Das stimmt, und Claude liefert die Bilder mit: Prozessdiagramm, Datenmodell, klickbarer Prototyp. Die Visualisierung ist ein Ausgabeformat. Sie braucht dafür kein eigenes Werkzeug.

**„Salesforce liefert selbst Vorlagen für Lucidchart.“** Salesforce stellt seine Referenzdiagramme und Symbolbibliotheken für Lucidchart bereit, wie der [Salesforce Ben Guide zu Architekturdiagrammen](https://www.salesforceben.com/ultimate-guide-to-salesforce-architecture-diagrams/) beschreibt. Die Notation ist gut und lässt sich übernehmen. Die Frage ist, wo die Arbeit stattfindet. Bei mir ist das das Repository.

**„Das Designteam arbeitet in Figma.“** Für interne Salesforce-Oberflächen gibt SLDS das Designsystem vor. Claude hält sich daran und braucht keinen Entwurf als Vorlage. Jedes Werkzeug, das sich einsparen lässt, sollte eingespart werden.

**„Gut genug heißt ungeprüft.“** Das ist der ernsteste Einwand, und die Glean-Studie stützt ihn. Sie nennt das Gegenstück zum Botsitting „Botshitting“: Ergebnisse weitergeben, die man nicht geprüft hat und nicht erklären könnte. Ausgerechnet unter Claude-Nutzern gaben das 92 % zu, bei ChatGPT 71 % und bei Microsoft Copilot 34 %. Weniger Werkzeuge rechtfertigen also keine schwächere Prüfung. Geprüft wird aber am Ergebnis: Der Architekt prüft das Lösungsdesign, der Entwickler den Pull Request, der Fachbereich klickt den Prototyp durch. Wie ich KI-Code prüfe, steht in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/). Die Zeit, die vorher für Übergaben nötig war, steht für diese Prüfung zur Verfügung.

```vergleich
ohne: Zwischenstände in vier Werkzeugen
- Der Kontext ist auf Board, Diagramm, Entwurf und Ticket verteilt.
- * Jede Übergabe braucht jemanden, der erklärt, was gemeint war.
- Jedes Werkzeug braucht Lizenz, Berechtigung und eigenen MCP-Zugang.
mit: Claude liefert das Ergebnis direkt
- Claude sieht Mitschrift, Org-Metadaten und Repository im selben Kontext.
- * Das Ergebnis ist ein Artifact, ein Diagramm im Repository oder eine LWC.
- Fachbereich und Architekt prüfen ein Ergebnis, keinen Zwischenstand.
zitat: Jedes Werkzeug, das wir weglassen können, lassen wir weg.
```

## Beim nächsten Feature das Miro-Board weglassen

Nehmen Sie ein abgegrenztes Feature aus dem nächsten Sprint, zum Beispiel eine Freigaberegel oder eine neue Maske für den Innendienst. Geben Sie Claude die Mitschrift des Workshops, die Metadaten der betroffenen Objekte und das Repository. Lassen Sie Protokoll, Prozessdiagramm, Story-Entwürfe und einen klickbaren Prototyp als Artifact erstellen und verknüpfen Sie es mit dem Jira-Ticket. Der Fachbereich prüft das Artifact, der Architekt das Lösungsdesign. Zählen Sie danach, wie oft jemand Kontext neu erklären musste, und vergleichen Sie diese Zahl mit dem letzten Feature, das in Miro und Figma bearbeitet wurde.
