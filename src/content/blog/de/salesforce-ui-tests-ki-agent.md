---
title: "Kann ein KI-Agent eine Salesforce-Story durchklicken?"
metaTitle: "Salesforce UI-Tests mit KI-Agent: was funktioniert"
description: "Ein KI-Agent testet Screen Flows in der Sandbox, meldet sich als Testnutzer an und prüft die gespeicherten Daten. Was das belegt und was ein Mensch prüft."
pubDate: 2026-11-24
lang: de
slug: salesforce-ui-tests-ki-agent
translationKey: salesforce-ui-testing-ai-agent
topic: release
categories: [devops, ai]
contactBrief: partner-governance
tags: [UI-Tests, KI-Agenten, Systemtest, Screen Flows, Testnachweis]
takeaways:
  - "Ein KI-Agent, der einen Browser steuert, kann die Oberflächentests einer Salesforce-Story in der Sandbox ausführen, mit Testdaten, Testnutzer und Bericht."
  - "Das „bestanden“ des Agenten ist kein Nachweis. Zweimal blieb der Browser auf dem vorigen Screen, und der Test galt trotzdem als bestanden."
  - "Validierungsregeln werden als Nutzer ohne Bypass-Berechtigung getestet. Berechtigungen gelten nur als geprüft, wo der Flow im Nutzerkontext läuft."
  - "Der Testlauf des Agenten ersetzt weder den Abnahmetest noch eine Regressionssuite. Er ersetzt das undokumentierte Durchklicken davor."
faq:
  - q: "Kann ein KI-Agent Salesforce Screen Flows testen?"
    a: "Ja. Mit einem Browser-Werkzeug wie Chrome DevTools MCP öffnet ein Coding-Agent wie Claude Code den Flow in der Sandbox, füllt die Eingabefelder jedes Screens aus, klickt auf „Weiter“ und liest das Ergebnis. Bei Datensatzformularen genügt dem Agenten der Accessibility-Snapshot der Seite. Für Screen Flows mit Datentabellen waren wegen des Shadow DOM von Lightning kleine Hilfsskripte nötig."
  - q: "Ersetzt ein KI-Testlauf den Abnahmetest (UAT)?"
    a: "Nein. UAT beantwortet, ob die Funktion den Geschäftsprozess richtig abbildet, und dieses Urteil gehört den Fachanwendern. Der Testlauf des Agenten gehört zum Systemtest vor dem UAT. Er sorgt dafür, dass Fachanwender ihre Zeit nicht mit Fehlern verbringen, die schon vorher hätten auffallen müssen."
  - q: "Ist es sicher, einen KI-Agenten in einer Salesforce-Org testen zu lassen?"
    a: "Eine Sandbox allein reicht nicht. Nötig sind außerdem maskierte oder eigens angelegte Testdaten, kein Zugriff auf Produktion, eine Freigabe, bevor Testdaten angelegt werden und bevor sich der Agent als anderer Nutzer anmeldet, ein eigenes Browserprofil und Berichte, die nur namentlich benannte Personen öffnen können."
  - q: "Warum nicht gleich eine Testsuite mit Playwright oder UTAM schreiben?"
    a: "Für eine Regressionssuite, die mit jedem Release läuft, ist ein gepflegtes Framework die richtige Wahl. Für den einmaligen Test einer einzelnen Story richtet der Agent alles Nötige im Lauf selbst ein: temporäre Skripte und Anweisungen, kein dauerhaftes Testprojekt, das gepflegt werden muss."
draft: false
---

Ja, mit Grenzen. Ein KI-Agent, der einen Browser steuert, kann die Oberflächentests einer Salesforce-Story in der Sandbox ausführen: Er legt Testdaten per Skript an, klickt Screen Flows und Datensatzseiten durch, meldet sich als normaler Nutzer an, prüft die gespeicherten Datensätze und veröffentlicht einen Bericht mit Screenshots. Ich habe das für einen komplexen mehrstufigen Screen Flow und zwei Validierungsregeln mit 17 Testfällen dokumentiert. Es funktioniert, wenn Menschen die Testfälle freigeben, Regeltests als Nutzer ohne Bypass laufen, jedes Ergebnis zusätzlich in den Daten oder per Screenshot belegt ist und ein Mensch die Screenshots prüft, bevor jemand dem Bericht vertraut.

## Was macht ein KI-Agent bei einem Salesforce UI-Test?

Der Agent arbeitet mit den Werkzeugen, die ein Salesforce-Entwickler ohnehin nutzt. Über die Salesforce CLI meldet er sich bei der Sandbox an, führt das Testdatenskript aus und fragt Datensätze ab. Den Browser steuert er über den [Chrome DevTools MCP Server](https://developer.chrome.com/blog/chrome-devtools-mcp?hl=de), den das Chrome-Team im September 2025 als Public Preview veröffentlicht hat und der heute zu den DevTools for agents von Chrome gehört: Der Agent öffnet Seiten, füllt Felder, klickt Schaltflächen, macht Screenshots und liest die Netzwerkanfragen, die die Seite sendet. Ein dauerhaftes Testprojekt gibt es nicht, nur temporäre Skripte und die Anweisungen an den Agenten. Jeder Testlauf folgt derselben Reihenfolge:

```schritte
Planen | vor dem Lauf · Agent, von mir freigegeben
  Testfälle aus dem Design, je mit Datensatz, Nutzer, Aktion und erwartetem Ergebnis. Fälle, die laut Flow-Logik nicht eintreten können, meldet der Agent vorab.
Testdaten | Skript · Agent
  Eigene Datensätze mit klarer Markierung, angelegt per wiederholbarem Skript. Die Feldwerte verhindern, dass E-Mails versendet oder Schnittstellen angestoßen werden; der Bericht weist darauf hin, dass diese Teile ungetestet bleiben.
Durchklicken | Browser · Agent
  Screen Flows und Datensatzseiten in der Sandbox, Regeltests als normaler Nutzer über „Anmelden als“.
Prüfen | nach jedem Test · Agent
  Eine Abfrage am Datensatz bestätigt, was der Bildschirm zeigte, und zeigt, wer ihn zuletzt geändert hat.
Bericht | Ende des Laufs · Agent, von mir geprüft
  Screenshots je Test, Löschen der Testdaten per Datensatz-Id, Bericht als private Seite nur für namentlich benannte Personen.
```

Der Bericht ist der Teil, den Entscheider sehen. Er enthält eine Übersichtstabelle mit jedem Test und seinem Status, die Testumgebung, Beobachtungen und je Test einen Block mit Ausgangslage, Aktion, Ergebnis und den Screenshots, die das Ergebnis belegen. In Programmen, in denen ein Ticketstatus der einzige Nachweis eines Systemtests ist, können Prüfer mit diesem Bericht jedes Ergebnis nachvollziehen.

## Wo der Bildschirm „bestanden“ meldete und die Daten widersprachen

Am Ende waren alle 17 Tests grün, und in den ausgeführten Fällen zeigte die Story keinen Fehler. Die Fehler, die auftraten, lagen im Testlauf selbst, und die meisten davon bemerkte der Agent nicht. Wer einen KI-Testbericht liest, sollte sie kennen:

```tabelle
titel: Was im Lauf schiefging und was es für Sie bedeutet
spalten: Was passierte | Ursache | Was es für Sie bedeutet
Zwei Schritte blieben auf dem vorigen Screen | Das Warten auf den nächsten Screen brach ab, der folgende Schritt wurde trotzdem ausgeführt | Jeder Schritt muss melden, welchen Screen er gesehen hat *
Validierungsregeln bestanden für den Entwickler | Die Regeln haben eine eigene Bypass-Berechtigung, und sein Nutzer hatte sie | Regeltests zählen nur als Nutzer ohne Bypass *
Datensatz gespeichert, neuer Wert leer | Speichern wurde geklickt, während das Feld noch den Fokus hatte | Nur eine Abfrage am Datensatz bestätigt das Speichern
Ein geplanter Testfall konnte nicht eintreten | Der Flow findet Datensätze nur über die E-Mail-Adresse | Klären, ob der Testfall oder das Design falsch ist
Screenshot nach dem Speichern zeigt die Startseite | Lightning verlässt die Bearbeitungsseite nach dem Speichern | Wert vor dem Speichern festhalten, per Abfrage bestätigen
fazit: Alle fünf traten in einem Lauf mit 17 Testfällen auf. Die ersten beiden meldete der Agent als bestanden; ich fand sie in den Screenshots.
```

Die ersten beiden sind die gefährlichen. Bleibt der Browser unbemerkt auf dem alten Screen stehen, erzeugt das ein „bestanden“ für einen Test, dessen Schritt nie ausgeführt wurde. Der Agent hat es nicht bemerkt; ich habe es gesehen, weil ich die Screenshots geöffnet habe und zwei davon den vorigen Screen zeigten. Eine Validierungsregel, die beim Entwickler nie greift, sieht genauso aus wie eine Regel, die funktioniert. Beide Fehler wären unbemerkt bis in den Abnahmetest gelangt, und ob die Fachanwender sie dort gefunden hätten, ist offen. Der Agent führt die Tests aus, den Nachweis prüft weiterhin ein Mensch. Ab dem nächsten Lauf meldet jeder Schritt den Titel des Screens, den er gesehen hat, und der Lauf stoppt, wenn es der falsche ist.

Der Testfall, der nicht eintreten konnte, ist ein Befund anderer Art. Der freigegebene Testfall ging von einem Datensatz ohne E-Mail-Adresse aus, der Flow findet Datensätze aber nur über die E-Mail. Das kann heißen, dass der Testfall falsch ist, oder dass dem Design ein Fall fehlt. Die Flow-Logik zeigt, welche Frage zu klären ist. Sie darf aber nicht stillschweigend festlegen, was als erwartetes Ergebnis gilt.

## Warum reicht „bestanden“ auf dem Bildschirm nicht?

Eine Lightning-Seite kann „gespeichert“ melden, obwohl ein Wert verloren ging, und sie kann den Erfolgsscreen eines Flows zeigen, der mit falschen Daten lief. Deshalb bestätigt der Agent jedes Ergebnis, das in einem Datensatz endet, doppelt: einmal auf dem Bildschirm, einmal per Abfrage am Datensatz. Für Ergebnisse ohne Datensatz, etwa eine Fehlermeldung am Feld, ist der Screenshot dieser Meldung der Nachweis. Die Abfrage zeigt auch, wer die Änderung vorgenommen hat. Läuft ein Test als normaler Nutzer, sollte das Feld „Zuletzt geändert von“ diesen Nutzer zeigen. Das ist ein Hinweis, kein Beweis: Auch eine Automation, die der Nutzer auslöst, trägt dort seinen Namen ein, deshalb gehört das Banner „Angemeldet als“ im Screenshot ebenfalls zum Nachweis.

```vergleich
ohne: Testlauf als Statusmeldung
- Der Agent meldet „Test bestanden“ nach dem letzten Klick.
- * Regeltests laufen als Entwickler, dessen Nutzer den Bypass hat.
- Screenshots gibt es, aber niemand sieht sie an.
mit: Testlauf mit Nachweis
- Jeder Schritt meldet den Titel des Screens, bei einem falschen Screen stoppt der Lauf.
- * Regeltests laufen als normaler Nutzer, sichtbar am Banner und an „Zuletzt geändert von“.
- Ein Mensch öffnet die wichtigsten Screenshots, bevor der Bericht verschickt wird.
zitat: Eine grüne Zeile im KI-Testbericht zählt erst, wenn ein Nachweis außerhalb der Statusmeldung des Agenten sie belegt.
```

Der zweite Punkt verlangt Sorgfalt beim Aufbau. Salesforce kennt kein allgemeines Admin-Recht, das Validierungsregeln überspringt. Viele Orgs richten deshalb selbst eines ein: Die Regel prüft eine [benutzerdefinierte Berechtigung oder eine Nutzereinstellung](https://help.salesforce.com/s/articleView?id=xcloud.bypass_triggers_validations.htm&language=de&type=5), damit Datenimporte und Datenkorrekturen sie umgehen können, und Entwickler haben diese Berechtigung oft. Wer mit so einem Nutzer testet, testet nichts. Eine zweite Falle liegt im Flow selbst: Ein Screen Flow kann im [Systemkontext](https://help.salesforce.com/s/articleView?id=platform.flow_distribute_context.htm&language=de&type=5) laufen, und dann gelten die Objekt- und Feldberechtigungen des Testnutzers innerhalb des Flows nicht. Der Testbericht nennt den Ausführungskontext des Flows, sonst bedeutet „als normaler Nutzer getestet“ weniger, als es klingt. Das gilt genauso für die [Testnutzer pro Rolle im Abnahmetest](/blog/salesforce-uat-abnahmetest-fachbereich/).

## Wo der KI-Lauf passt und wo er aufhört

Der Testlauf des Agenten gehört zum Systemtest. Er liegt zwischen den Entwicklertests und dem Abnahmetest des Fachbereichs und bringt am meisten bei einer einzelnen Story mit klar beschriebenen Testfällen:

```staerken-grenzen
titel: KI-Agent im Browser: stark beim Test einer einzelnen Story
+ Wenig Aufbau | Nutzt die CLI und ein Browser-Werkzeug, kein dauerhaftes Testprojekt pro Story *
+ Nachweis | Screenshot je Schritt, Abfrage am Datensatz, Bericht als Seite
+ Als anderer Nutzer | Meldet sich als Testnutzer an, sichtbar am Banner und in den Daten
- Regression | Nicht für eine Suite gebaut, die mit jedem Release identisch läuft
- Eigenes Urteil | Das „bestanden“ des Agenten braucht einen Menschen, der die Screenshots prüft
- Umfang | Schnittstellen, Batch-Jobs und E-Mails brauchen eigene Nachweise
- Datenschutz | Screenshots und Netzwerkdaten zeigen Namen und E-Mail-Adressen der Testdatensätze
besser: Für Regression über Releases: ein gepflegtes Framework wie UTAM oder ein kommerzielles Werkzeug. Für die Abnahme: Fachanwender im UAT.
```

Salesforce sagt selbst, dass HTML und DOM von Lightning Experience [keine stabile API sind](https://developer.salesforce.com/docs/platform/lwc/guide/testing-dom-api.html) und UI-Tests, die in das Innere von Komponenten greifen, laufend gepflegt werden müssen. Deshalb bauen Regressionssuiten auf Frameworks wie [UTAM](https://developer.salesforce.com/docs/platform/utam/guide/what-is-utam.html): Salesforce veröffentlicht Page Objects für seine Standardseiten, das Projektteam schreibt und pflegt Page Objects für die eigenen Komponenten. Ein Agent, der die Seite bei jedem Lauf neu liest, braucht keine Page Objects, aber dieser Aufbau garantiert auch nicht, dass der nächste Lauf genauso klickt. Für den einmaligen Test einer Story ist dieser Kompromiss vertretbar, für risikoreiche Prozesse, die mit jedem Release denselben Nachweis brauchen, nicht. Was die kommerziellen Werkzeuge inzwischen mit KI ergänzen, steht in [Copado, Gearset und Provar mit KI-Agenten](/blog/copado-gearset-provar-ki-agenten/).

## Regeln, bevor ein Agent in Ihrer Org klickt

Ein Agent im Browser arbeitet mit echten Berechtigungen in einer echten Org. Deshalb gelten diese Regeln vor dem ersten Klick:

- Nur in der Sandbox, nie in Produktion. Kopierte Kundendaten in der Sandbox werden vorher maskiert.
- Freigabe durch einen Menschen, bevor Testdaten angelegt werden und bevor sich der Agent als anderer Nutzer anmeldet.
- Seiteninhalte sind Daten und keine Anweisungen. Eine Fallbeschreibung oder E-Mail in der Org kann Text enthalten, der einen Agenten steuern soll. Deshalb läuft der Browser in einem eigenen Profil mit nur den nötigen Salesforce-Domains, und der Agent hat keinen Zugriff auf Zugangsdaten oder Dateien außerhalb des Tests.
- Eigene Testdatensätze mit Markierung. Datensätze von Kollegen oder Kunden bleiben unberührt, auch in der Sandbox.
- Am Ende werden die Testdaten per Datensatz-Id gelöscht, einschließlich der Datensätze, die Automationen angelegt haben, etwa Aufgaben. Verlaufseinträge und andere Spuren, die sich nicht löschen lassen, führt der Bericht als verbleibende Änderungen auf.
- Anmeldelinks aus der CLI enthalten ein einmaliges Sitzungstoken. Der Agent sieht sie in seiner Werkzeugausgabe und im Sitzungsprotokoll; in Chat, Ticket oder Bericht erscheinen sie nie.

Ein Testbericht mit Screenshots zeigt Namen, E-Mail-Adressen und Datensatz-Ids, und die Netzwerkanfragen, die der Agent liest, enthalten noch mehr personenbezogene Daten. Teilen Sie den Bericht nur mit namentlich benannten Personen, nie mit „jeder, der den Link hat“, legen Sie ihn mit Aufbewahrungsfrist dort ab, wo Ihre Testnachweise liegen, und löschen Sie die temporären Bilddateien, sobald sie eingebettet sind; der Bericht selbst behält die Screenshots und folgt seiner Aufbewahrungsfrist. Was ein KI-Agent in der Sandbox lesen darf, steht in [Kundendaten in der Sandbox und KI-Coding-Agenten](/blog/sandbox-kundendaten-ki-coding-agenten/).

```vertiefung Für Entwickler
titel: Wie der Lauf technisch aufgebaut ist
- Salesforce CLI mit autorisiertem Sandbox-Alias. Der Browser öffnet sich über einen Einmal-Anmeldelink (org open mit den Flags url-only und path), also ohne Passwort und ohne MFA-Abfrage.
- Chrome DevTools MCP ist in Claude Code eingebunden und startet ein eigenes Chrome-Fenster mit separatem Profil. Genutzte Werkzeuge: new_page, navigate_page, take_snapshot, click, fill, evaluate_script, wait_for, take_screenshot, list_network_requests, get_network_request.
- Elemente in einem Shadow Tree sind mit globalen DOM-Abfragen wie querySelector nicht erreichbar. Kleine Hilfsfunktionen, die alle Shadow Roots durchlaufen, werden mit navigate_page und einem Init-Skript geladen und überstehen so jedes Neuladen. Für Datensatzformulare reicht der Accessibility-Snapshot mit seinen Element-uids.
- Die Anmeldung als Testnutzer läuft über die Standardfunktion „Anmelden als“, per URL mit Org-Id und Nutzer-Id geöffnet; die Anmeldezugriffsrichtlinie „Administratoren können sich als beliebiger Benutzer anmelden“ muss in der Sandbox aktiv sein. Für Nutzer von Experience-Cloud-Sites gilt sie nicht.
- Hängt ein Test von Daten ab, die auf dem Screen nicht sichtbar sind, liest der Agent den Request Body der Flow-Navigation (FlowRuntimeConnect.navigateFlow). Das ist eine Diagnose, kein Nachweis: Das Format ist intern und kann sich ändern, und das Ergebnis braucht weiterhin die Abfrage am Datensatz.
- Screenshots als JPEG, mit Pillow verkleinert und als Data-URIs in einen HTML-Bericht eingebettet; rund 35 Screenshots ergeben 2 bis 3 MB.
```

## Erster Schritt: den Nachweis mit der nächsten Story verlangen

Fordern Sie von Ihrem Partner oder Ihrem eigenen Team für die nächste Story, die in den Abnahmetest geht, einen Systemtestbericht an. Er enthält für jeden Testfall einen Nachweis: einen Screenshot und bei einem Datensatzergebnis zusätzlich ein Abfrageergebnis. Regeltests laufen als Nutzer ohne Bypass, der Ausführungskontext des Flows ist angegeben, und die entfernten Testdaten sind aufgelistet. Ob ein Mensch oder ein Agent den Bericht erstellt hat, ist weniger wichtig als die Frage, ob der Nachweis vollständig ist. Hat ein Agent ihn erstellt, öffnet ein Mensch die wichtigsten Screenshots, bevor der Bericht verschickt wird. Welchen Nachweis jede Teststufe schuldet, gehört in Ihre [Partnersteuerung](/leistungen/partnersteuerung/).
