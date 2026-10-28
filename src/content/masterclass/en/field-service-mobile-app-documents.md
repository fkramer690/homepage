---
title: "Field Service mobile app: offline, forms and reports"
description: "What technicians need offline in the Salesforce Field Service app, how inspection forms replace paper, when Document Builder is enough and how to test updates."
lang: en
slug: field-service-mobile-app-documents
course: field-service
translationKey: fsl-03
chapter: 3
short: "Mobile app and documents"
summary: "What technicians need offline, how inspection reports work without paper, when the service report is enough and how to test every app update."
takeaways:
  - "The Field Service mobile app is a separate app for technicians. Every Field Service org can use offline Lightning web components in it, while the Salesforce mobile app needs the Mobile App Plus licence for that."
  - "Briefcase Builder decides which records each group of technicians holds offline. Salesforce publishes no record limit, so size briefcases by role and test them with a partner user."
  - "Data Capture forms are built in Flow Builder and work offline. Voice to Form has been GA since mobile release 260.0, and Winter '27 adds German, French, Italian, Spanish and Japanese."
  - "Document Builder covers the service report with signature and offline creation, with 250 documents per user and month; inspection reports with conditional logic usually need a second tool."
  - "The app has its own versions next to the three platform releases. Beta builds arrive one month before major versions, so a pilot group can test before every device updates."
articles: [field-service-mobile-offline, field-service-data-capture-forms, field-service-mobile-guided-voice, service-documents-document-builder, document-builder-limits-workarounds, visual-remote-assistant-instead-of-visit, field-service-mobile-release-testing]
faq:
  - q: "What is the difference between the Field Service mobile app and the Salesforce mobile app?"
    a: "They are two separate apps in the App Store and Google Play. The Field Service app is built for technicians: appointments, work orders, parts, forms and service reports, also offline. According to Salesforce Developers, every Field Service org can opt into offline Lightning web components there, while the Salesforce mobile app needs the Mobile App Plus licence for them."
  - q: "Does the Salesforce Field Service app work without network?"
    a: "Yes. It has basic offline support out of the box. With Briefcase Builder an admin defines which records each group of technicians downloads, and performance priming syncs the most critical changes every five minutes while there is a connection."
  - q: "How many service reports does Document Builder include?"
    a: "According to the Field Service limits in Salesforce Help, each user with a Field Service Dispatcher or Field Service Mobile licence brings 250 documents per month. For peak months the org gets a one-time allowance of 10,000 extra documents."
  - q: "Can technicians fill in forms by voice in German?"
    a: "Voice to Form became generally available with mobile release 260.0 in Spring '26. The Winter '27 release highlights add Spanish, Japanese, Italian, French and German. Clarify data protection and, where one exists, the works council before the pilot."
  - q: "How do I test a new version of the Field Service app?"
    a: "Join the Field Service Mobile beta programme, which provides builds one month before major releases and one week before patches. Run a fixed routine on iOS and Android with offline work, a form, the service report and a partner user before the version reaches all devices."
draft: false
---

The Field Service mobile app has to work where the network ends, so the first decision is which records each technician group holds offline. Data Capture forms built in Flow Builder replace paper protocols, and Document Builder creates the service report with signature and photos. Inspection reports with conditional logic usually need a second tool. Visual Remote Assistant saves visits where the operator can fix a fault with guidance. The app has its own versions next to the platform releases, so each one needs a short test before it reaches the devices. All of this rests on one data model decision made before the first form.

## What does the Field Service mobile app do?

Field Service, which Salesforce sells today as [Field Service and Operations](https://www.salesforce.com/service/field-service-management/pricing/), gives technicians their own app. [Chapter 2](../field-service-scheduling-dispatch/) covered how a job gets scheduled. This chapter starts when the technician opens the job.

The Field Service mobile app is a separate app in the App Store and Google Play. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field-service-mobile/work-from-anywhere), it gives technicians their jobs, customer details, work order updates and signature capture without calling the office. The Salesforce mobile app is the general app for sales and service staff. For a manufacturer the difference that matters most is offline: according to [Salesforce Developers](https://developer.salesforce.com/docs/atlas.en-us.mobile_offline.meta/mobile_offline/intro_enabled_apps.htm), any Field Service org can opt into offline Lightning web components in the Field Service app, while the Salesforce mobile app needs the Mobile App Plus licence for them. My rule: technicians work in the Field Service app, and dispatchers and inside service stay in the browser.

## Which data does the technician need offline?

The app has basic offline support out of the box. According to the [Trailhead module on offline briefcases](https://trailhead.salesforce.com/content/learn/modules/offline-briefcase/allow-access-to-information-online), Briefcase Builder defines which records each group of technicians downloads, and performance priming syncs the most critical changes every five minutes while there is a connection. Changes made offline are saved on the device and synced later.

For a machine builder I put on the device what the technician needs to finish and document today's jobs without calling the office: appointments for today and tomorrow, work order with line items, the asset with its recent history, the van stock and the manual for that machine. Full price lists and every asset of a territory stay online. Salesforce publishes no fixed number of records a device can hold, so measure the morning sync with your busiest region instead of planning with a number.

The [considerations for LWC Offline](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sfs_gs_lwc_considerations.htm) name five known issues. Three of them shape the test plan:

- **Tasks are not primed.** A Task object in a briefcase triggers an error during priming.
- **Partner users.** A community licence user who opens a service appointment can get a missing record error. Partner technicians therefore need their own briefcase and their own test.
- **iOS cold start.** Changed Lightning web components load only after the app is fully closed and started again.

The briefcase per role, the full list of gaps and a day in a basement without network are in [Field Service mobile offline: which data goes on the device?](../../../blog/field-service-mobile-app-offline-data/).

## How do paper protocols become forms?

Data Capture is the form feature of the Field Service app. According to the [Trailhead quick look](https://trailhead.salesforce.com/content/learn/modules/data-capture-quick-look), it is built directly on Flow Builder, and forms connect to service appointments, work orders and work order line items. They contain signature capture, text fields, lookups and checkboxes, and sections can appear based on earlier answers. Forms work offline, auto-save captures every entry, and every submission is logged.

Building the form is quick. The decision before it takes longer: which answers become fields on the asset or work order, and which stay as form answers. Operating hours, trended readings and the overall result belong in fields, because maintenance plans, reports and the ERP interface work on fields. Pass or fail per checkpoint can stay in the form. Parts used are booked as products consumed, never as free text, otherwise the van stock and the ERP do not see them. The full mapping table and how to split a long protocol by variant are in [Field Service Data Capture: inspection forms without paper](../../../blog/field-service-data-capture-inspection-forms/).

### Voice to Form and guided work: what is available?

The status moves with every mobile release, so I keep it apart from the form design:

| Feature | Status, October 2026 | Source |
|---|---|---|
| Voice to Form | GA since mobile release 260.0 (Spring '26) | [Release post in the Trailblazer Community](https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000j9vu70AA) |
| Voice to Form in German, French, Italian, Spanish, Japanese | Winter '27 | [Winter '27 highlights](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center) |
| Lookup component offline, multi-image preview, forms from assets and timesheets | Listed in 260.0, check the status in your org | Release post 260.0 |
| Guided Experience, forms from a photo of a paper form | Announced on 20 October 2026, no release date | [Salesforce blog](https://www.salesforce.com/blog/guided-mobile-work/) |

German voice input makes the feature relevant for service teams in the DACH region. It also processes employees' speech, which brings in data protection and, where one exists, the works council. I describe these questions and the risk of digitising a bad paper form one to one in [Salesforce Field Service mobile: guided work and voice](../../../blog/salesforce-field-service-mobile-guided-voice/). My order: form and fields first, voice in a second step.

## When is the service report from Document Builder enough?

Document Builder creates the service report as a PDF from a work order, a work order line item or a service appointment. According to the [Field Service limits](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5), each user with a Field Service Dispatcher or Field Service Mobile licence brings 250 documents per month, and the org gets a one-time allowance of 10,000 extra documents for peak months. A technician with five jobs a day creates about 105 reports a month, well below the limit.

For the classic report at the machine, with working time, parts, photos and the customer's signature, created offline, it is the right choice. The limits from the same page matter for planning:

- **Three objects only.** No document on the asset or on a custom object.
- **Android is behind.** On iOS documents come from work order and service appointment, on Android only from the service appointment.
- **Size.** At most 50 pages and 100 MB per document.

Plan for five smaller gaps in the standard report: template choice, file name, email, default values and styling. Flows and small components close them without another licence, as I describe in [Document Builder: five limits and workarounds](../../../blog/salesforce-document-builder-limits-workarounds/).

### When do you need a second tool?

Inspection reports with conditional sections, machine files on the asset, certificates and Word output go beyond Document Builder. For these I would license Salesforce Document Generation or an AppExchange tool for the office users who need it, and leave the service report in Document Builder. The comparison is in [Salesforce Service Documents: is Document Builder enough?](../../../blog/salesforce-service-documents-document-builder/).

Quotes are a separate case. When technicians spot extra work or a worn part and the customer wants a price on site, the quote belongs in the sales process with its approvals. How quotes, contracts and orders run there is covered in the Revenue Cloud masterclass chapter on [quote, contract and order](../../revenue-cloud/quote-contract-order/).

## When can a video call replace a visit?

Visual Remote Assistant is a video tool for Service Cloud and Field Service. According to the [product page](https://salesforce.com/products/visual-remote-assistant), the customer taps a link sent by SMS or email, and a two-way video opens in the mobile browser, without app download, login or password. Sessions can be recorded. The add-on costs $50 per user and month on the [price list, October 2026](https://www.salesforce.com/service/field-service-management/pricing/), and it is included in Agentforce 1 Field Service. The customer needs no licence.

In my view video replaces a visit when the operator can fix the fault with guidance: a changed parameter, an operating error, a reset. For mechanical repairs it saves the second visit instead, because the technician arrives with the right part. Before the first session, settle recording consent with the customer, the works council for your own staff and which faults may be closed remotely. How to estimate the potential from last year's breakdown visits is in [Visual Remote Assistant: video help instead of a visit?](../../../blog/visual-remote-assistant-remote-help-instead-of-visit/).

## How do you test every app version?

Next to the three platform releases a year, the app has its own major and patch versions. According to the [Field Service Mobile beta programme](https://developer.salesforce.com/tools/field-service-mobile-beta), beta builds are available one month before major releases and one week before patch releases, and debug builds let developers test their own components in an emulator or simulator. The release post for 260.0 says Salesforce rolls out versions over several days, and some users get an update only seven days after general availability. For up to a week, technicians run different versions.

My routine per version, on iOS and Android, fits into half a day:

1. Login and resume after an hour in the background.
2. Priming with a real technician profile, then a full job in airplane mode with parts consumed.
3. A real Data Capture form, closed halfway and resumed.
4. The service report with signature, offline.
5. Your own components after a cold start.
6. The same with a partner user.
7. After sync, consumption and report in the back office and the ERP.

The pilot group, the calendar and who owns app versions are in [Field Service app updates: how to test each release](../../../blog/field-service-mobile-app-updates-testing/). App versions belong in the same calendar as the platform releases, described in the DevOps masterclass chapter on [release planning](../../devops-release-management/release-planning-salesforce-releases/). How such scripted tests fit into quality gates is in the chapter on [quality, tests and reviews](../../devops-release-management/quality-tests-reviews/).

## A typical scenario, as an assumption: the commissioning protocol leaves paper

A typical scenario, as an assumption: a machine builder with 60 technicians commissions packaging machines in three variants. The paper protocol has 80 checkpoints. The technician fills it in by hand, scans it in the evening, and the back office types the readings into the ERP. All numbers are assumptions to show the order of decisions.

1. **Weeks 1 and 2, data model.** Service, back office and the ERP team mark every checkpoint as field, form answer, follow-up line item or already known. Twelve questions disappear because serial number, customer and machine type are on the asset already.
2. **Week 3, briefcase.** One briefcase for internal technicians, one for the two partner companies, both filtered on territory and date.
3. **Weeks 4 to 7, forms.** Three forms: general checks on the service appointment, one variant form per machine type on the line item, acceptance with signature. Readings such as cycle rate go to fields on the asset.
4. **Week 8, report.** The service report template shows the overall result from the work order field. The detailed inspection report with variant logic stays a separate document from the office.
5. **Weeks 9 and 10, pilot.** Eight technicians, including one partner, run real commissioning jobs and the test routine on both platforms.

Voice to Form waits until data protection and the works council have agreed. After the pilot the readings are on the asset the evening of the job, and nobody types them in again.

## What should you decide before the first form?

Four decisions need a name next to them before a partner builds forms:

- **Target data model for service data.** Which values become fields on asset and work order, which picklists are shared, how defects become follow-up work.
- **Briefcase per role.** Internal technician, partner technician, supervisor.
- **Document split.** Service report in Document Builder, documents with logic in a second tool, quotes in the sales process.
- **Owner of app versions.** Usually the release manager, together with device management.

The data model is [architecture work](../../../services/salesforce-architecture/) and decides whether forms, reports and later AI agents can use the data. [Chapter 4](../field-service-assets-maintenance-parts/) builds on it with assets, maintenance plans and spare parts, and the [overview](../) lists all chapters.

The technician's app works when the data model comes before the first form and every app version is tested before it reaches the devices. If you want an independent view of your mobile and document setup, [send me a message](#contact).
