---
title: "Field Service Data Capture: inspection forms without paper"
description: "How to turn a paper inspection or commissioning protocol into a Field Service Data Capture form whose results the back office and the ERP can actually use."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: field-service-data-capture-inspection-forms
translationKey: field-service-data-capture-forms
topic: field-service
categories: [field-service]
tags: [field service, data capture, mobile, inspection, commissioning]
takeaways:
  - "Forms work offline and save every entry; record changes run once the device is online. Pausing depends on how the form is launched."
  - "Voice to Form is GA since app release 260.0 and supports German since Winter '27. It needs the Agentforce for Field Service license."
  - "Readings and the overall result become fields, parts become products consumed. The proof per checkpoint stays a form answer."
  - "A protocol with 80 checkpoints for three variants becomes short forms per variant and job phase that can be tested one by one."
faq:
  - q: "What is Data Capture in Salesforce Field Service?"
    a: "Data Capture is the form feature of the Field Service mobile app. Admins build the forms in Flow Builder with fields, checkboxes, lookups, signatures, photos and conditional sections, and technicians fill them in the app, also offline."
  - q: "Does Data Capture work offline?"
    a: "Yes. According to Trailhead it uses an offline-first architecture, saves every entry automatically and logs each submission online or offline. Creating, updating or deleting records waits until the device is online again, and the records a form needs must be in the technician's briefcase."
  - q: "Is Voice to Form available in German?"
    a: "Voice to Form became generally available with mobile release 260.0 in Spring '26. The Winter '27 release highlights add multilingual support for Spanish, Japanese, Italian, French and German. Users need the Agentforce for Field Service license and the Einstein Field Service User permission."
  - q: "Should I rebuild every paper protocol as a Data Capture form?"
    a: "Not one to one. First decide which answers the back office, the ERP or maintenance planning needs as fields, remove questions whose answers already exist on the asset or work order, and split long protocols by variant."
draft: false
---

A paper inspection or commissioning protocol becomes a Data Capture form in Flow Builder that runs in the Field Service mobile app, offline as well, and is tied to the work order, the service appointment or a line item. The form is quick to build. The decision before it takes longer: which answers become fields on the asset or the work order, so that maintenance planning, the back office and the ERP can use them, and which stay as form answers for the record. Split long protocols by machine variant and job phase. A form with 80 checkpoints, most of them hidden, is hard to test and hard to change.

## What is Field Service Data Capture?

Data Capture is the form feature of the Field Service mobile app. According to the [Trailhead quick look on Data Capture](https://trailhead.salesforce.com/content/learn/modules/data-capture-quick-look), it is built directly on Flow Builder, the tool admins already use for automation. The forms are native to the app and can be tied to work orders, service appointments and work order line items.

What a form can contain:

- **Fields and inputs:** text, checkboxes, lookups and signature capture.
- **Conditional visibility:** fields appear or disappear based on what the technician has already entered.
- **Media:** photos, annotations and image grids.

For field work, two properties matter more than the components. The forms work offline with a dedicated offline engine, and auto-save captures every entry, so a technician can close a form at the machine and resume it later. Every submission is logged, online or offline.

```hinweis achtung
Offline only works if the records the form reads are on the device. Which records belong in the briefcase is covered in [Field Service mobile offline: which data goes on the device?](../field-service-mobile-app-offline-data/). Which flow features Data Capture still lacks compared with a desktop flow, such as the data table, is covered in [Field Service mobile flow limitations](../field-service-mobile-flow-limitations/).
```

## Voice to Form has been generally available since Spring '26

The status changes with every mobile release, so it is worth knowing where it stands.

- **Mobile release 260.0 (Spring '26).** The [Salesforce release post in the Trailblazer Community](https://trailhead.salesforce.com/trailblazer-community/feed/0D5KX00000j9vu70AA) marks Data Capture Voice to Form as GA. Technicians dictate, the app transcribes and fills the form fields. The same post lists a lookup component that also works offline, a multi-image preview and the option to launch forms from assets, custom objects and mobile timesheets. Check their status in your org before you plan with them.
- **Winter '27.** The [release highlights on Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-service-field-service-it-hr-service-and-contact-center) add Voice to Form in Spanish, Japanese, Italian, French and German. According to the [setup guide](https://help.salesforce.com/s/articleView?id=service.mfs_voice_to_form_setup.htm&language=en_US&type=5) users need the Agentforce for Field Service license and the Einstein Field Service User permission, so Voice to Form is a separate license decision.

German voice input makes the feature relevant for many service organizations in the DACH region. It also processes employees' speech, which brings in data protection and, where one exists, the works council. I described those questions in [Salesforce Field Service mobile: guided work and voice](../salesforce-field-service-mobile-guided-voice/). For the form design it means: decide which fields may be filled by voice and which values the technician confirms by hand, for example a measured value that affects safety.

## Which answers should become fields?

This is the decision I would make before the first form. A form answer is fine for the record of what was checked. A value that someone evaluates later belongs in a field on the asset or the work order, because reports, maintenance plans and interfaces work on fields.

| Answer in the protocol | Where it belongs | Why |
|---|---|---|
| Operating hours or counter reading | Field on the asset | Usage-based maintenance reads it |
| Measured values that are trended (pressure, temperature) | Field on the work order, or a record per measurement for long series | Comparison across visits |
| Pass or fail per checkpoint | Form answer | Record of the inspection |
| Overall result of the inspection | Field on the work order | Reporting and invoicing |
| Defect found | New work order line item or follow-up work order | Gets planned and dispatched |
| Parts used | Products consumed on the work order | Van stock and ERP |
| Customer signature | Form and service report | Proof of acceptance |

Two rules follow from this table. A form does not ask for anything that already exists on the asset or the work order, such as serial number, customer or machine type. And consumption is booked as products consumed, never as a free text field in the form, otherwise the van stock and the ERP do not see it.

Readings on the asset connect the form to maintenance planning. How maintenance plans and entitlements fit together is covered in [Field Service: how to model maintenance contracts](../salesforce-field-service-maintenance-contracts/). This is classic [architecture work](../../services/salesforce-architecture/) and belongs to the service organization as much as to IT.

## How does the form relate to the service report?

Data Capture collects the data. The PDF the customer receives comes from Document Builder or, in orgs that still use them, Service Reports. A PDF of the completed form itself is available only in Unlimited Edition and not for forms launched from a quick action, which create no form record. Document Builder works on work orders, work order line items and service appointments, as described in [Salesforce Service Documents: is Document Builder enough?](../salesforce-service-documents-document-builder/). If the customer needs the inspection results in the report, check in the first sprint how the answers reach the template. Values that are fields on the work order can be placed in the template directly.

Inspection reports with a lot of conditional content can outgrow Document Builder. In that case a separate inspection document from Document Generation or an AppExchange tool is the better solution, and the form still provides the data.

## Worked example: 80 checkpoints, three variants

All numbers are assumptions. A machine builder commissions packaging machines in three variants. The paper protocol has 80 checkpoints over twelve pages, plus a page for the customer's acceptance. Today the technician fills it in by hand, scans it in the evening, and the back office types the readings into the ERP.

Built as one form, it would contain every checkpoint of every variant, with conditional visibility hiding most of them. Every change to one variant would touch the form for all three. I would split it:

- **Form 1, general checks (30 points).** Site, power supply, safety devices, emergency stop. The same for every variant, tied to the service appointment.
- **Form 2, variant checks (35 points).** One form per variant, tied to the work order line item for the variant's commissioning step. Readings such as cycle rate and sealing temperature are written to fields on the asset.
- **Form 3, acceptance (15 points).** Open points, customer instruction, signature. The overall result goes to a field on the work order.

A machine therefore still gets 80 checkpoints, but each form is short enough to test. Defects found in form 2 become line items; if another visit is needed, the process also creates a service appointment so the dispatcher can plan it.

In this example the back office gains the most. After the sync the readings are on the asset and work order, nobody types them in again, and the overall result on the work order shows when the invoice can go out. If a limit value changes for one variant, the admin changes only that variant's form and tests only that one.

## Pick one high-volume protocol

Forms, offline data and the service report together make up [chapter 3 of the Field Service masterclass](../../masterclass/field-service/field-service-mobile-app-documents/). For the first form I would proceed like this:

```schritte
Pick one protocol
  One with high volume, for example annual maintenance of your most common machine type.
Mark every question
  As field, form answer, line item or "already known". Delete the last group.
Agree the fields
  With the back office and the ERP team, before anyone opens Flow Builder.
Build and test offline
  On iOS and Android, with an internal and a partner technician.
Add Voice to Form
  In a separate step, after data protection and the works council have agreed.
```
