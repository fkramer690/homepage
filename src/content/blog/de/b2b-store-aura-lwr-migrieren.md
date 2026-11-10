---
title: "Von Aura zu LWR: einen B2B-Commerce-Store migrieren"
description: "Wann Hersteller einen Aura-B2B-Store auf LWR umstellen sollten, was sich bei Komponenten, Checkout und Styling ändert und wie Sie die Migration planen."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: de
slug: b2b-store-aura-lwr-migrieren
translationKey: commerce-aura-to-lwr-migration
topic: commerce
categories: [b2b-commerce, devops]
tags: [B2B Commerce, LWR, Aura, Migration, Lightning Web Components, Experience Cloud]
takeaways:
  - "Stand 9. November 2026 hat Salesforce für Aura-B2B-Stores kein Abschaltdatum angekündigt, empfiehlt für neue Stores aber das LWR-Template."
  - "Ein LWR-Store unterstützt nur Lightning Web Components. Theme-Styling erfolgt über --dxp-Hooks, Wire-Adapter sind der bevorzugte Datenzugriff."
  - "Migrieren heißt, einen neuen LWR-Store anzulegen. Ein Umwandlungswerkzeug dokumentiert Salesforce nicht, nur Umbauschritte und den Umzug der Konfiguration."
  - "LWR-Stores ordnen den Checkout in Experience Builder an statt in Aura-Checkout-Flows. Eigene Subflow-Logik wird neu gebaut, oft als Extension."
  - "Bleibt der Store noch eine Weile auf Aura, verkleinert der frühe Austausch von Aura-Komponenten durch Lightning Web Components den späteren Umstieg."
faq:
  - q: "Schaltet Salesforce Aura-Stores in B2B Commerce ab?"
    a: "Stand 9. November 2026 hat Salesforce kein Abschaltdatum öffentlich angekündigt. Aura-Stores stehen nicht auf der Liste der aktiven Produkt- und Funktionsabkündigungen, Abkündigungen können aber auch über Release Notes oder E-Mails mitgeteilt werden. Salesforce empfiehlt LWR für neue Stores, und nur Orgs, die vor Spring '23 für Commerce aktiviert wurden, können noch Aura-Stores anlegen."
  - q: "Gibt es ein Werkzeug, das einen Aura-Store in LWR umwandelt?"
    a: "Der Migrationsleitfaden von Salesforce dokumentiert kein automatisches Umwandlungswerkzeug. Sie legen einen neuen Store aus dem Template B2B Commerce (LWR) an, stellen Ihre Komponenten auf Lightning Web Components um, übertragen die Store-Konfiguration und veröffentlichen den neuen Store. Testen Sie in einer Sandbox, wie die Konfiguration in den neuen Store übertragen wird."
  - q: "Unterstützen Aura-Stores Lightning Web Components?"
    a: "Ja. Ein Aura-Store unterstützt Aura-Komponenten und Lightning Web Components, ein LWR-Store nur Lightning Web Components. Bleibt der Store noch mehrere Releases auf Aura, senkt der Austausch von Aura-Komponenten im laufenden Store den späteren Migrationsaufwand."
  - q: "Was passiert mit dem Checkout-Flow beim Wechsel auf LWR?"
    a: "In Aura-Stores wird der Checkout als Flow im Flow Builder umgesetzt. LWR-Stores nutzen den mit dem Store installierten Salesforce Commerce Checkout, dessen Seite und Komponenten Sie in Experience Builder anordnen; Versand, Steuern und Zahlung werden weiterhin über Integrationen oder Extensions abgewickelt. Logik aus eigenen Checkout-Subflows, etwa eine Kreditprüfung, muss neu gebaut werden, zum Beispiel als Extension."
draft: false
---

Stellen Sie einen Aura-B2B-Store auf LWR um, wenn Sie Funktionen oder Änderungen benötigen, die in Aura schwer umzusetzen sind, oder wenn eigener Aura-Code immer weiter wächst. Stand 9. November 2026 hat Salesforce kein Abschaltdatum für Aura-Stores angekündigt. Salesforce empfiehlt das LWR-Template für neue Stores und bietet für bestehende einen [Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide), dokumentiert aber kein Umwandlungswerkzeug. Sie legen einen neuen Store aus dem Template B2B Commerce (LWR) an und übertragen Komponenten, Checkout und Konfiguration. Ich plane das als Neubau der Storefront, der die Commerce-Datensätze in derselben Org weiter nutzt, und beginne meist im laufenden Aura-Store.

## Welchen Store betreiben Sie, und gibt es eine Frist?

Salesforce B2B Commerce, Teil der Suite Agentforce Commerce, gab es in drei Generationen: als Managed Package auf Visualforce, als Store auf der Kernplattform mit dem Aura-Template und als Store mit dem LWR-Template (Lightning Web Runtime). Wie Sie die Generationen unterscheiden, steht in [B2B Commerce Versionen: Visualforce, Aura oder LWR?](../b2b-commerce-versionen-visualforce-aura-lwr/).

Laut [Migrationsleitfaden](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/get-started.html) können nur Orgs, die vor Spring '23 für Commerce aktiviert wurden, noch das Aura-Template wählen. Salesforce empfiehlt für neue Stores das B2B-LWR-Template und legt Betreibern bestehender Aura-Stores nahe, eine Migration zu prüfen.

Stand 9. November 2026 ist kein Abschaltdatum angekündigt. Aura-Stores stehen nicht auf der [Liste der aktiven Abkündigungen](https://help.salesforce.com/s/articleView?id=000381744&language=en_US&type=1), und der Leitfaden nennt keines. Die Liste weist selbst darauf hin, dass nicht aufgeführte Abkündigungen über Release Notes, Hilfeartikel oder gezielte E-Mails mitgeteilt werden. Beobachten Sie daher nicht nur die drei Plattform-Releases: B2B Commerce liefert zusätzlich monatlich Funktionen und Dokumentationsänderungen. Solange kein Datum feststeht, entscheiden Sie nach Funktionen und Aufwand, nicht aus Angst vor einem Datum, das niemand angekündigt hat.

## Ein LWR-Store kennt nur Lightning Web Components

Die [wichtigsten Unterschiede](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html) sind schnell aufgezählt, aber jeder betrifft eigenen Code:

| Bereich | Aura-Store | LWR-Store |
|---|---|---|
| Komponenten | Aura-Komponenten und Lightning Web Components | Nur Lightning Web Components |
| Styling | Eigene CSS-Klassen | Komponenten-CSS plus `--dxp`-Styling-Hooks für Branding nach Theme, verknüpft mit dem Theme-Panel |
| Datenzugriff | `force:recordData`, `lightning:recordForm` | Wire-Adapter bevorzugt; Commerce-APIs und Apex bleiben möglich |
| Checkout | Checkout-Flows in Flow Builder | Salesforce Commerce Checkout, angeordnet in Experience Builder |
| Warenkorbseite | Record Page | Named Page |

Zwei Zeilen verdienen Aufmerksamkeit. Die erste ist der Checkout. Für Aura-Stores schreibt Salesforce, dass Sie [Checkout-Flows mit Flow Builder bauen](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-setup-checkout-flow.html). LWR-Stores nutzen den Salesforce Commerce Checkout, der mit dem Store installiert wird. Dort sind vier Ebenen relevant: Checkout-Seite und Layout in Experience Builder, eigene Checkout-Komponenten, die Integrationen für Versand, Steuern und Zahlung sowie Extensions wie die Prüfung vor der Bestellung. Die Integrationen für Versand, Steuern und Zahlung sind von den Aura-Subflows getrennt, und für eigene Logik empfiehlt Salesforce [Extensions statt Integrationen](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2c-comm-integration-arch.html). Wenn Ihr Aura-Checkout einen Subflow hat, der das ERP für eine Kreditprüfung aufruft, muss diese Logik neu gebaut werden. Wie Extensions funktionieren, steht in [Commerce Extensions: Eigenentwicklung, die Updates übersteht](../commerce-extensions-eigenentwicklung/).

Die zweite ist die Warenkorbseite. Aus der Record Page wurde eine Named Page. Jede Komponente, die mit `lightning/navigation` zum Warenkorb navigiert oder einen Link dorthin erzeugt, muss angepasst werden, wie auf der Seite [Migrate Your Store](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/store-migration.html) des Leitfadens beschrieben.

## Erst im Aura-Store vorbereiten, dann wechseln

Der Leitfaden trennt die Vorbereitung im Aura-Store vom Wechsel auf einen neuen LWR-Store. Ich halte mich an diese Trennung, weil die Vorbereitung stattfinden kann, während Händler weiter bestellen.

**Vorbereitung im laufenden Aura-Store** ([Prepare for Store Migration](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/prepare-for-migration.html)):

1. **Bestand aufnehmen.** Suchen Sie im Setup nach Lightning Components, um alle Aura-Komponenten und Lightning Web Components zu sehen.
2. **Aura-Komponenten ersetzen.** Lightning Web Components werden in Aura- und LWR-Stores unterstützt, oft ohne Änderung. Das lohnt sich, wenn der Store noch mehrere Releases auf Aura bleibt; steht ein Neubau kurz bevor, können doppelte Regressionstests mehr Aufwand verursachen, als sie einsparen. Aura-Komponenten können Lightning Web Components enthalten, aber nicht umgekehrt. Stellen Sie deshalb zuerst die untersten Komponenten um. Lässt sich eine Aura-Komponente noch nicht ersetzen, reduzieren Sie sie auf einen dünnen Wrapper. Am Ende müssen alle Aura-Komponenten ersetzt sein.

```vertiefung Für Entwickler
titel: Wie baue ich Datenzugriff und Events für LWR um?
- **Datenzugriffe nach oben ziehen.** Bündeln Sie Datenoperationen in der äußersten Komponente. Dann muss die Datenschicht nur an einer Stelle geändert werden, und innere Komponenten bleiben wiederverwendbar.
- **Events umbauen.** Aura-Events, deklariert mit `aura:event`, werden in Lightning Web Components zu DOM-Events.
- **Wire-Adapter bevorzugen.** Ersetzen Sie `force:recordData` durch `@wire` und Adapter aus den Namespaces `lightning/ui*Api` und Commerce. Apex-Methoden, die Sie behalten wollen, lassen sich in Lightning Web Components importieren.
```

**Der Wechsel:**

```schritte
Store anlegen
  Im Setup einen Store aus dem Template **B2B Commerce (LWR)** anlegen. Laut Leitfaden ist ein neues Template nötig, um die Migration abzuschließen ([Create a Store with the LWR Template](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/create-lwr-template.html)).
Umbau abschließen
  Komponenten in ein SFDX-Projekt legen, den Umbau abschließen, die Navigation zum Warenkorb anpassen und das Theme-Branding auf Styling-Hooks übertragen, wo es dem Theme-Panel folgen soll.
Konfiguration übertragen
  Der Leitfaden überträgt die Store-Konfiguration per Change Set. Die Hilfeseite beschreibt Change Sets zwischen verbundenen Orgs. Testen Sie deshalb in einer Sandbox, wie die Konfiguration in derselben Org in den neuen Store übertragen wird.
Veröffentlichen
  Deployen, Komponenten in Experience Builder platzieren, Vorschau auf Desktop und Mobilgerät prüfen, veröffentlichen.
```

Salesforce schreibt, dass Sie den Store nicht von Grund auf neu bauen müssen und die Migration vor allem aus Umbauarbeiten besteht. Für die Commerce-Datensätze in der Org stimmt das; Store-Zuordnungen und Konfiguration müssen trotzdem übertragen und geprüft werden. Für die Storefront würde ich mich nicht darauf verlassen: neue Site, neues Styling, neuer Checkout und neue Warenkorbseite machen faktisch einen Neubau der gesamten Käuferoberfläche erforderlich. Entsprechend schätze und teste ich ihn.

## Was lässt der Leitfaden offen?

Der Leitfaden behandelt Komponenten und Store-Konfiguration. Zum Katalog, zu Buyer Groups, Entitlement Policies und Preisbüchern sagt er nichts, ebenso wenig zu URLs und Lesezeichen der Händler. Planen Sie ausdrücklich, wie der neue Store an die bestehenden Buyer Groups und Preisbücher angebunden wird, und testen Sie das mit echten Käuferkonten, bevor ein Händler den Store sieht.

Experience-Metadaten lassen sich in einer Pipeline besser verwalten als mit Change Sets. Salesforce beschreibt das [Deployment von Store-Metadaten](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-deploy-experience-metadata.html) mit der Salesforce CLI und den Typen ExperienceBundle oder DigitalExperienceBundle und deren Ablage in der Versionskontrolle. Dieselbe Seite warnt, dass manche Einstellungen nicht in den Metadaten enthalten sind und manuell nachgepflegt werden müssen, und nennt Domains, URLs und Single Sign-on als Aufgaben nach dem Deployment. Schreiben Sie diese Einstellungen vor dem Wechsel auf. Welchen Platz die Store-Konfiguration in einer Pipeline hat, beschreibt das DevOps-Kapitel [Daten und Konfiguration](../../masterclass/devops-release-management/daten-und-konfiguration/).

## Wann lohnt sich der Umstieg?

Ich würde die Migration planen, wenn mindestens einer dieser Punkte zutrifft:

- **Eine Funktion, die Sie brauchen, fehlt im Aura-Store oder ist dort schwer zu bauen.** Prüfen Sie für jede neue Funktion in den Release Notes, welches Template sie voraussetzt, bevor Sie die Migration damit begründen. Headless Commerce ist eine eigene Frontend-Architektur. Der Buyer Agent arbeitet zudem außerhalb des Stores über WhatsApp oder SMS. Keiner der beiden Punkte ist allein ein Grund für LWR.
- **Eigener Aura-Code wächst weiter.** Jede neue Aura-Komponente ist Code, den Sie später neu schreiben.
- **Der Checkout muss ohnehin geändert werden.** Eine neue ERP-Schnittstelle oder eine neue Zahlart ist ein guter Anlass, den Checkout für LWR mit Extensions neu umzusetzen, statt einen Flow zu erweitern.
- **Der Partner, der den Store gebaut hat, geht.** Ein neuer Partner sollte sich nicht erst in Aura einarbeiten müssen.

Ist der Store stabil, mit wenig eigenem Code und ohne geplante Änderungen, ist Abwarten eine legitime Entscheidung. Die Vorbereitungsschritte lohnen sich trotzdem, weil Lightning Web Components in beiden Stores unterstützt werden.

Praxisbeispiel: Ein Maschinenbauer betreibt seit 2021 einen Aura-Store mit rund 30 eigenen Komponenten und einem Checkout-Flow mit Kreditprüfung im ERP. Im ersten Quartal ersetzt das Team zunächst die untersten Komponenten im Aura-Store durch Lightning Web Components und liefert sie mit den regulären Releases aus. Im zweiten Quartal baut es den LWR-Store in einer Sandbox auf, setzt die Kreditprüfung als Extension zur Prüfung vor der Bestellung neu um, einschließlich Timeout und klarer Meldung, wenn das ERP nicht antwortet, und überträgt das Styling ins Theme-Panel. Dann wird eine Pilot-Buyer-Group auf den neuen Store umgestellt. Vorher sind Domains und Weiterleitungen, Single Sign-on, offene Warenkörbe, Buyer-Group-Zuordnungen, Suchindex und Links in Bestellmails geklärt und Rollback-Kriterien dokumentiert. Der alte Store bleibt zwei Wochen als Ausweichlösung online, und die übrigen Gruppen folgen, wie in [B2B-Shop für Händler einführen](../b2b-shop-haendler-einfuehren/) beschrieben.

## Aura-Komponenten und Checkout-Subflows auflisten

Beginnen Sie mit der Bestandsaufnahme: Erfassen Sie alle Aura-Komponenten, den Checkout-Flow mit seinen Subflows und jede Stelle, die auf den Warenkorb verlinkt. Entscheiden Sie dann, welche Komponenten Sie in den nächsten zwei Releases im Aura-Store ersetzen. Den Wechsel selbst planen Sie in Ihren [Release-Kalender](../../masterclass/devops-release-management/release-planung-salesforce-releases/) ein, mit Regressionstests für Suche, Warenkorb und Checkout, denn drei Salesforce-Releases im Jahr plus monatliche Commerce-Änderungen betreffen den alten und den neuen Store. Die übrigen Themen, von Agenten bis zur Einführung, behandelt das Masterclass-Kapitel [Agenten, Migration, Einführung](../../masterclass/b2b-commerce/agentforce-migration-einfuehrung/).
