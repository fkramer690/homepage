---
title: "API 67.0: Warum Apex im User Mode weniger sieht"
description: "Ab API 67.0 läuft Apex im User Mode und mit Sharing. Warum ein Versionssprung Datensätze ausblendet, warum KI-Code besonders betroffen ist und wie Sie planen."
pubDate: 2026-10-27
lang: de
slug: api-67-apex-user-mode-weniger-datensaetze
translationKey: api-67-user-mode-apex
topic: release
categories: [devops]
tags: [Apex, API 67.0, User Mode, KI-Coding, Release-Management, Maschinenbau]
takeaways:
  - "Ab API-Version 67.0 laufen Datenbankoperationen in Apex im User Mode und Klassen ohne Sharing-Deklaration mit Sharing; Code mit 66.0 oder älter behält das alte Verhalten, bis jemand die Version anhebt."
  - "Datensätze, die das Sharing ausblendet, fehlen ohne Fehlermeldung im Ergebnis; eine fehlende Feldberechtigung lässt eine Abfrage im User Mode dagegen mit einer QueryException scheitern."
  - "WITH SECURITY_ENFORCED kompiliert mit 67.0 nicht mehr; der Ersatz WITH USER_MODE prüft auch polymorphe Felder und die WHERE-Klausel, ersetzte Abfragen brauchen also einen Test."
  - "KI-Agenten haben Apex von vor 2026 gelernt, heben API-Versionen nebenbei an und schreiben Tests ohne System.runAs(); ein Versionssprung braucht daher einen eigenen Pull Request und Tests mit echten Benutzern."
  - "Mit 67.0 umgeht without sharing allein das Sharing bei einer Abfrage ohne Zugriffsmodus nicht mehr; bewusster Systemzugriff braucht without sharing, WITH SYSTEM_MODE und eine Begründung."
faq:
  - q: "Ändert API 67.0 meinen bestehenden Apex-Code automatisch?"
    a: "Nein. Die Änderung ist versioniert: Sie gilt für Klassen und Trigger, die mit API-Version 67.0 oder neuer gespeichert sind. Bestehender Code läuft weiter im System Mode, bis jemand seine Version anhebt; deshalb braucht jeder Versionssprung einen Testplan."
  - q: "Laufen Apex-Trigger ab API 67.0 im User Mode?"
    a: "Laut Salesforce laufen Trigger weiterhin ohne Sharing und können keinen Sharing-Modus deklarieren. Die Handler-Klassen, die sie aufrufen, sind betroffen, wenn ihnen eine Deklaration fehlt. Der aktuelle Apex Developer Guide empfiehlt einen expliziten Zugriffsmodus für jede Datenbankoperation in Triggern und Handlern."
  - q: "Was ersetzt WITH SECURITY_ENFORCED in API 67.0?"
    a: "WITH USER_MODE. Mit 67.0 kompiliert eine Abfrage mit WITH SECURITY_ENFORCED nicht mehr. WITH USER_MODE erzwingt zusätzlich das Sharing und prüft polymorphe Felder und die WHERE-Klausel; testen Sie jede ersetzte Abfrage mit einem eingeschränkten Benutzer."
  - q: "Wie erkenne ich, ob eine Abfrage wegen des Sharings weniger Datensätze liefert?"
    a: "Führen Sie die Logik in einem Test mit System.runAs() als eingeschränkter Benutzer aus, etwa als Techniker, Händler oder Integrationsuser, und vergleichen Sie das Ergebnis mit einem Lauf ohne Einschränkung. Das Sharing filtert ohne Fehlermeldung, nur dieser Vergleich zeigt die Lücke."
  - q: "Sollten wir auf API 66.0 bleiben, um die Änderung zu vermeiden?"
    a: "Nur eine Weile. Salesforce empfiehlt die neueste API-Version und möglichst wenige Versionen in einer Codebasis, und Winter '27 warnt bereits bei Code mit 9.0 bis 19.0. Planen Sie den Umstieg in Etappen, statt Versionen einzufrieren."
draft: false
---

Apex-Code kann nach dem Anheben auf API-Version 67.0 weniger Datensätze sehen, denn ab dieser Version laufen Datenbankoperationen im User Mode, und Klassen ohne Sharing-Deklaration laufen mit Sharing. Die Änderung gilt pro Klasse: Nichts passiert, bis jemand eine Klasse anhebt. Dann liefern Abfragen nur noch, was der ausführende Benutzer sehen darf, ohne Fehlermeldung. KI-Agenten machen diesen Versionssprung wahrscheinlicher und testen ihn schlechter. Ich würde jeden Umstieg auf API 67.0 als geplante Änderung behandeln und mit den Benutzern testen, die den Code tatsächlich ausführen: Außendiensttechniker, Händler und der SAP-Integrationsuser.

## Was ändert sich in Apex mit API-Version 67.0?

Summer '26 kam je nach Instanz zwischen dem 15. Mai und dem 13. Juni 2026 in die Produktions-Orgs und brachte die API-Version 67.0 ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/the-salesforce-developers-guide-to-the-summer-26-release)). Der [Apex Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apex/versioned_behavior_changes.htm) nennt drei versionierte Verhaltensänderungen:

- **User Mode als Standard.** SOQL, SOSL, DML und Database-Methoden erzwingen die Objektberechtigungen und die Feldsicherheit (Field-Level Security) des ausführenden Benutzers. Bis 66.0 war der System Mode Standard, und der Code musste diese Prüfungen selbst übernehmen.
- **With Sharing als Standard.** Eine Klasse ohne Sharing-Deklaration läuft im Sharing-Kontext des aktuellen Benutzers. Bis 66.0 lief eine solche Klasse ohne Sharing, wenn sie ein Einstiegspunkt war, oder übernahm den Modus ihres Aufrufers. Aura-Controller und `@AuraEnabled`-Methoden, die eine Lightning Web Component aufruft, liefen schon vorher mit Sharing.
- **WITH SECURITY_ENFORCED entfällt.** Eine Abfrage damit kompiliert nicht mehr, das Deployment scheitert mit „WITH SECURITY_ENFORCED is no longer supported, use WITH USER_MODE instead“. Laut Developers Blog prüft `WITH USER_MODE` zusätzlich polymorphe Felder und die WHERE-Klausel; der Ersatz kann also strenger sein als das Original.

Das Risiko steckt im Wort „versioniert“. Jede Klasse und jeder Trigger speichert seine API-Version in den Metadaten, und das neue Verhalten gilt nur für Code mit 67.0 oder neuer. Eine Klasse mit 62.0 läuft im System Mode weiter, bis jemand die Version anhebt. Eine Nebenwirkung übersieht man leicht: Laut [Sharing-Dokumentation](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/pages/apex_classes_keywords_sharing.htm) läuft eine ältere Klasse ohne Deklaration mit Sharing, sobald irgendeine Klasse in ihrer Vererbungskette mit 67.0 gespeichert ist. Wer eine Basisklasse anhebt, ändert Klassen, die niemand angefasst hat.

Trigger sind die bewusste Ausnahme, und die Quellen von Salesforce beschreiben sie unterschiedlich. Die [Summer-'26-Highlights für Architekten](https://www.salesforce.com/blog/summer-26-release-architect-highlights/) sagen, Trigger „always run in system mode and always will“. Die aufgerufenen Handler-Klassen sind aber betroffen, wenn ihnen eine Deklaration fehlt. Der aktuelle Guide sagt, der Trigger läuft ohne Sharing, im Beispiel für 67.0 läuft eine Abfrage im Trigger-Body ohne Zugriffsmodus aber im User Mode. Einig sind sich beide in der Empfehlung, und der folge ich: Zugriffsmodus in Triggern und Handlern explizit setzen und die Logik in die Handler legen.

## Warum sieht Apex nach dem Versionssprung weniger Datensätze?

Hier wirken zwei Mechanismen, und sie zeigen sich sehr unterschiedlich.

**Das Sharing filtert still.** Läuft eine Klasse mit Sharing, liefert eine Abfrage nur die Datensätze, die der Benutzer über Organisationsweite Standards, Rollen, Freigaberegeln und Teams sehen darf. Keine Exception, kein Log-Eintrag. Eine Methode, die alle offenen Servicefälle einer Maschine gezählt hat, zählt jetzt die im Gebiet des Servicemitarbeiters, und der Code rechnet mit der kleineren Zahl weiter.

**Berechtigungen scheitern laut.** Im User Mode schlägt eine Abfrage fehl, die ein Feld auswählt, das der Benutzer nicht lesen darf. Die [Dokumentation zum Zugriffsmodus](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexcode.meta/apexref/apex_classes_enforce_usermode.htm) beschreibt `getInaccessibleFields()` an der `QueryException`, die alle betroffenen Felder auflistet, und `getDmlFieldNames()` für DML. Das tut im Abnahmetest weh, aber wenigstens merkt es jemand.

Dieselbe Seite klärt ein Detail, das für jede Migration zählt: Eine Datenbankoperation im User Mode „always respects the user's sharing rules“. Mit 67.0 reicht `without sharing` an der Klasse für eine Abfrage ohne Zugriffsmodus also nicht mehr. Wer das alte Verhalten bewusst behalten will, braucht beides, das Schlüsselwort an der Klasse und `WITH SYSTEM_MODE`.

Für einen Hersteller zählt weniger der Code als die Frage, wer ihn ausführt:

- **Integrationsuser.** Ein Apex-REST-Service, den SAP oder proALPHA aufruft, um den Auftragsstatus zu aktualisieren, läuft als Integrationsuser. Dessen Berechtigungssatz wurde oft für den System Mode gebaut und deckt nur die Felder ab, die die API selbst brauchte.
- **Händler im Portal.** Controller hinter einem Händlerportal auf Experience Cloud liefen meist schon mit Sharing, weil `@AuraEnabled`-Methoden das taten. Neu ist die Feldsicherheit: Ein Feld, das das Händlerprofil nicht lesen darf und das abgefragt, aber nie angezeigt wird, bricht jetzt die Komponente. Mehr zu Portalen steht in [das Kundenportal der Manufacturing Cloud](../manufacturing-cloud-kundenportal/).
- **Techniker und Servicemitarbeitende.** Techniker im Außendienst (Field Service) und Servicemitarbeitende sehen oft nur ihr Gebiet oder ihre Accounts. Logik, die über Kulanz, Garantie oder Ersatzteile anhand von Zählungen über alle Datensätze entscheidet, gibt andere Antworten.

## Warum ist KI-generierter Apex-Code besonders betroffen?

Vier Gründe, jeder mit der heutigen Arbeitsweise von Coding-Agenten verbunden.

**Die Modelle haben die alten Muster gelernt.** Der größte Teil des öffentlichen Apex-Codes ist älter als Summer '26, und vieles davon nutzt `WITH SECURITY_ENFORCED` oder verlässt sich stillschweigend auf den System Mode. Das Erste scheitert mit 67.0 beim Kompilieren, das ist der gute Fall. Das Zweite kompiliert und scheitert erst an echten Daten. Der [Leitfaden von Salesforce zu sicherem Apex für Lightning Web Components](https://developer.salesforce.com/docs/platform/lwc/guide/apex-security) baut inzwischen auf `WITH USER_MODE` und `Security.stripInaccessible()`.

**Agenten wählen die Version.** Ein Agent, der eine Klasse anlegt, schreibt eine `-meta.xml`-Datei mit API-Version, und Agenten räumen gern Metadaten auf, während sie eine Klasse ändern. Salesforce selbst empfiehlt die neueste API-Version und möglichst wenige Versionen in einer Codebasis, idealerweise eine. Nach meiner Einschätzung hebt ein Agent, der diesem Rat folgt, ohne die Folgen zu kennen, Klassen als Nebeneffekt fremder User Stories an.

**Generierte Tests prüfen keine Sichtbarkeit.** Ein Agent, der 75 Prozent Abdeckung erreichen soll, schreibt Tests, die eigene Datensätze anlegen und als Benutzer laufen, der alles sieht. Die Architekten-Highlights halten fest, dass Tests, die unter 66.0 bestehen, das Verhalten unter 67.0 nicht garantieren, und empfehlen Tests mit eingeschränkten Benutzern. Ohne `System.runAs()` und ein realistisches Profil fallen die fehlenden Datensätze nie auf.

**Leitplanken lösen das halbe Problem.** Die Skills von Salesforce für Claude Code „force the sharing keyword on all classes“ ([Salesforce Developers Blog](https://developer.salesforce.com/blogs/2026/06/build-production-ready-apps-in-claude-code-with-salesforce-skills)). Eine explizite Deklaration ist besser als der Standard, aber ein Agent, der `with sharing` an einen SAP-Integrationsservice schreibt, hat eine fachliche Entscheidung getroffen, die niemand geprüft hat. Die typischen Fehler von KI-Code beschreibe ich in [KI-generierten Salesforce-Code prüfen](../ki-generierten-salesforce-code-pruefen/); hier geht es darum, dass die Versionsnummer auf die Review-Liste gehört.

## Ein typisches Szenario: API-Versionen bei einem Maschinenbauer vereinheitlichen

Nehmen wir einen Maschinenbauer mit Service Cloud, einem Händlerportal und SAP S/4, angebunden über Apex-REST-Services. Alle Zahlen sind Annahmen. Nach den Compiler-Warnungen für sehr alte API-Versionen aus Winter '27, beschrieben in [Salesforce Winter '27: Was sich für Ihre Pipeline ändert](../salesforce-winter-27-aenderungen-pipeline/), beschließt die IT, 220 Apex-Klassen mit Versionen zwischen 38.0 und 62.0 auf 67.0 zu heben. Der Partner arbeitet mit einem Coding-Agenten. Der hebt die Versionen an, ersetzt in 15 Abfragen `WITH SECURITY_ENFORCED` durch `WITH USER_MODE` und behebt jeden Kompilierfehler. Alle Tests laufen durch, die Abdeckung bleibt bei 84 Prozent.

Der Abnahmetest findet drei Probleme:

1. **Die Auftragsstatus-Aktualisierung aus SAP scheitert.** Der REST-Service fragt jetzt im User Mode ab, und der Integrationsuser darf zwei Felder nicht lesen, die im letzten Jahr dazukamen. Das Schnittstellenmonitoring zeigt in der ersten Stunde `QueryException`-Fehler. Die Lösung sind zwei Zeilen in einem Berechtigungssatz.
2. **Die Händlerseite für offene Garantieanträge bleibt leer.** Ihre Abfrage wählt ein internes Kostenfeld aus, das Händler nicht lesen dürfen. Die Lösung: Feld aus der Abfrage nehmen.
3. **Die Kulanzregel entscheidet falsch.** Ein Trigger-Handler ohne Deklaration zählt die Garantieanträge pro Maschine der letzten zwölf Monate; mehr als zwei bedeuten keine automatische Kulanz. Mit 67.0 läuft der Handler im Sharing-Kontext der Servicemitarbeiterin. Anträge, die ein Händler aus einer anderen Region gestellt hat, sieht sie nicht, also zählt der Handler einen statt drei Anträge und gibt Kulanz frei. Nirgends ein Fehler. Aufgefallen ist es nur, weil eine Testerin aus dem Garantieteam die Ergebnisse mit einem Bericht verglichen hat.

Zwei von drei Problemen melden sich selbst. Das dritte wäre live gegangen und hätte Geld gekostet, eine Gutschrift nach der anderen.

## Wie planen Sie den Umstieg auf API 67.0?

Ich würde ihn als kleines Projekt mit eigenem Releaseplan aufsetzen:

1. **Bestand aufnehmen.** Klassen und Trigger nach API-Version auflisten und markieren: ohne Sharing-Deklaration, mit `WITH SECURITY_ENFORCED`, aufgerufen von Integrationsusern, dem Portal oder Trigger-Handlern.
2. **Versionssprünge nebenbei verbieten.** Eine Versionsänderung bekommt einen eigenen Pull Request. Den Rest fängt eine Pipeline-Prüfung ab, die API-Versionen in geänderten Metadaten-Dateien vergleicht, wie in [Quality Gates für KI-Code](../quality-gates-ki-code-salesforce-pipeline/) beschrieben. Die Regel gehört außerdem in die [KI-Regeldatei Ihres Repositorys](../ki-regeldatei-salesforce-repository/), damit Agenten sie vorher kennen.
3. **Absicht im Code erklären.** Jede angefasste Klasse bekommt ein explizites Sharing-Schlüsselwort, jede Abfrage einen expliziten Zugriffsmodus. Systemzugriff braucht eine schriftliche Begründung:

```apex
// Liest alle offenen Aufträge für den SAP-Abgleich, unabhängig vom Benutzer.
// Begründung: Integrationspfad, freigegeben durch den Architekten des Kunden.
public without sharing class SapOrderSyncSelector {
    public static List<Order> pendingOrders() {
        return [SELECT Id, OrderNumber, Status FROM Order
                WHERE Sync_Status__c = 'Pending' WITH SYSTEM_MODE];
    }
}
```

4. **Mit echten Benutzern testen.** Pro Fachbereich mindestens ein Test mit `System.runAs()` als Techniker, Händler und Integrationsuser, der Datensatzanzahlen prüft und nicht nur „nicht null“.
5. **Berechtigungssätze der Integrationsuser zuerst prüfen.** Geben Sie Integrationsusern die Feldzugriffe, die ihre Services brauchen, vor dem Versionssprung, damit die Schnittstelle es nicht in der Produktion herausfindet.
6. **In Etappen nach Fachbereich anheben.** Schnittstellen, Händlerportal, Servicelogik: Jede Etappe geht durch einen Abnahmetest mit jemandem aus dem Fachbereich, der weiß, welche Zahlen herauskommen müssen.

Einen solchen Umstieg über mehrere Partner hinweg zu planen, gehört zu meiner Arbeit in [DevOps und Release-Management](../../leistungen/devops-und-release-management/).

API 67.0 macht Apex standardmäßig sicherer, der Preis ist, dass jeder Versionssprung zu einer Änderung des Datenzugriffs wird, die einen eigenen Test verdient. Wenn Sie eine zweite Meinung möchten, wie Sie den Umstieg für Ihre Org planen, [schreiben Sie mir](#contact).
