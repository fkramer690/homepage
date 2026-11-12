---
title: "Salesforce Field Service mobile: guided work and voice"
description: "Guided workflows, forms from paper templates and voice input: what the Salesforce Field Service mobile features mean for manufacturers with field service."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: en
slug: salesforce-field-service-mobile-guided-voice
translationKey: field-service-mobile-guided-voice
topic: field-service
categories: [field-service]
tags: [field service, mobile, manufacturing, service, voice]
takeaways:
  - "In Salesforce surveys, US mobile workers estimate that they waste 18 percent of their time on admin, and 43 percent of organizations still use paper logs."
  - "For manufacturers, complete service data matters: with a sound data model and ERP integration, results and parts reach the back office without retyping."
  - "A quickly digitized paper form only helps with a sound data model behind it. Otherwise a bad form simply becomes digital."
  - "Spoken input and transcripts can contain personal data and could be evaluated per technician, so involve data protection and the works council early."
faq:
  - q: "What is new in the Salesforce Field Service mobile app?"
    a: "Salesforce presented three approaches together: a guided experience with step-by-step guidance that adapts to the job, a headless setup that creates digital forms from paper templates or existing mobile flows, and Voice to Form, which fills form fields from spoken input. Voice to Form and the guided experience had already appeared in the release notes; the headless setup is not yet documented as a configurable feature."
  - q: "When are the new Field Service mobile features available?"
    a: "Availability differs by feature. Voice to Form needs Enterprise, Unlimited or Developer Edition, the Field Service Mobile User license, the Agentforce for Field Service SKU and the Einstein Field Service User permission set. The documentation for forms in a guided experience references Workforce Scheduling, Discovery Framework and app version 264 or later. For the headless setup I found no setup documentation (as of 9 November 2026)."
  - q: "How do manufacturers benefit from guided workflows in field service?"
    a: "If the logic behind the guidance is well defined, technicians get the right checks and questions for the actual situation, documentation happens during the job, and the back office receives more complete, structured data for invoicing, warranty and quality analysis."
  - q: "What should be considered before using voice input for technicians?"
    a: "Clarify data protection, storage and purpose of the speech data, involve the works council where one exists, test the supported languages with real technicians and define which fields may be filled by voice."
---

Salesforce has presented three approaches for the Agentforce Field Service and Operations mobile app, formerly Field Service: guided workflows that adapt to the situation on site, a headless setup that turns paper forms into digital forms, and voice input that fills forms based on what the technician says. Licenses and prerequisites are documented for Voice to Form and the guided experience; so far, the headless setup has only appeared in Salesforce's demo. For manufacturers this addresses an old problem: too much paperwork for technicians, incomplete or late data for the back office. The value depends on the data model, the integration with the ERP and questions specific to Germany.

## What exactly did Salesforce announce?

On 20 October 2026 Salesforce described the three capabilities together in a [blog post on guided mobile work](https://www.salesforce.com/blog/guided-mobile-work/). Voice to Form had been in beta since release 258, and the guided experience had appeared in the mobile patch notes for version 264 before the post:

- **Guided Experience.** The app gives technicians step-by-step guidance on what to do next. When conditions change, for example when a technician marks something as urgent, the guidance adapts: relevant steps and questions appear, irrelevant ones disappear. Documentation prompts come up at each step, so data is captured during the job instead of afterwards. The setup documentation I found ties forms in a guided experience to Workforce Scheduling visits and references Discovery Framework and app version 264 or later.
- **Headless setup.** Digital forms can be created from existing paper forms or from existing mobile flows, with the same data fields. Salesforce describes it as being as easy as taking a picture. The goal is to avoid long projects just to digitize a form. I found no release notes or setup documentation for it yet; Data Capture forms are still documented as flows built in Flow Builder.
- **Voice to Form.** Technicians speak, and the system fills the matching fields of a Data Capture form. According to the [setup guide](https://help.salesforce.com/s/articleView?id=service.mfs_voice_to_form_setup.htm&language=en_US&type=5), users should name the field they want to fill, so it works more like a structured command than free narration, and not every form component supports it. Dictation works in English, French, German, Italian, Japanese and Spanish; for each language other than English you deploy a translated Data Capture flow. Data Cloud is not required.

Salesforce backs this with its own research:

```kennzahlen
18% | of their time US mobile workers estimate as wasted on admin, more than seven hours a week (survey of 350, 2025)
43% | of the organizations surveyed still use paper logs in the field (State of Field Service 2026)
16% | say their field and back-office technology work together on one platform (State of Field Service 2026)
source: Salesforce research from two surveys, cited in the blog post on guided mobile work of 20 October 2026
```

```hinweis offen
The blog post shows demos but does not state any license requirements. The documentation lists them by feature: Voice to Form needs Enterprise, Unlimited or Developer Edition, the Field Service Mobile User license, the Agentforce for Field Service SKU and the Einstein Field Service User permission set. Forms in a guided experience need Workforce Scheduling and Discovery Framework. For the headless setup, ask your account team before planning on it.
```

## For manufacturers, complete service data is what counts

In manufacturing, field service is often where the customer relationship is decided. Technicians install machines, carry out maintenance, repair breakdowns and inspect equipment. What they record on site feeds several processes at once:

- **Invoicing**, based on working time, travel and spare parts.
- **Warranty and goodwill decisions**, based on the documented cause of a fault.
- **Quality and product management**, which need structured fault codes and measured values to see patterns across the installed base.
- **Spare parts and logistics**, which need to know what was used and what has to be reordered.
- **Sales**, which learns from service reports where a machine is nearing the end of its life.

When this information arrives as free text, on paper or days later, every one of these processes suffers. Guided workflows and voice input target exactly this problem: better data, captured during the job, with less effort for the technician. They fill fields in Salesforce; getting the data into the ERP still requires its own integration, mapping and error handling.

![One service report feeds five processes: the technician on site records working time, travel, spare parts, the cause of the fault, fault codes and measured values. This feeds invoicing, warranty and goodwill, quality and product management, spare parts and logistics, and sales, which learns about machines nearing the end of their life. As free text, on paper or days later, every one of these processes suffers.](../../../assets/blog/field-service-report-en.png)

## Where do guided workflows help most?

Guided workflows make the biggest difference where jobs vary and mistakes are expensive:

- **Inspections and safety checks**, where the required checks depend on the machine type, the country or the result of a previous step.
- **Complex repairs**, where the scope changes on site and additional questions have to be documented, for example about safety or customer approval for extra work.
- **New or less experienced technicians**, who benefit from guidance that experienced colleagues carry in their heads.

The prerequisite is that the logic behind the guidance is well defined. Someone has to decide which steps apply to which asset, which values are mandatory and which results trigger follow-up actions. That is process and data work, and it belongs to the service organization, not only to IT.

## Quick digitizing keeps the flaws of the paper form

Salesforce's demo of the headless setup promises to turn a paper form into a digital one in very little time. That is useful, because many service organizations have dozens of protocols and checklists that never made it into the system.

But a fast digital copy keeps every flaw of the paper form. Typical problems I would check first:

- **Fields without a clear meaning**, such as a free text field "remarks" that contains half the relevant information.
- **Duplicate data**, where the form asks for information that already exists on the asset or work order.
- **Missing structure**, for example fault descriptions as free text instead of codes that quality management can evaluate.
- **Forms that differ by region or team** for the same job.

Before forms are digitized at scale, it is worth deciding on a target data model for service protocols: which values are captured as fields, which picklists are shared, how results link to the asset and the work order. This is classic [architecture work](/en/services/salesforce-architecture/), and it decides whether the data can be used later for reporting, AI agents or integration with the ERP. How inspection forms look in Data Capture is covered in [Field Service Data Capture: inspection forms without paper](/en/blog/field-service-data-capture-inspection-forms/).

## What needs to be clarified before using voice input?

Voice input is attractive for technicians who wear gloves, work at height or work in noisy environments. For companies in Germany, three questions need answers before a pilot:

1. **Data protection.** Spoken input and transcripts can contain personal data about technicians and customers. Clarify where audio, transcripts and field values are processed and stored, for how long, by which sub-processors and for what purpose. The data protection officer should be involved early.
2. **Works council.** Where a works council exists, it has a say when a technical system is capable of monitoring behavior or performance (section 87(1) no. 6 of the Works Constitution Act), for example through timestamps, corrections or comparisons by technician. Involving it early saves months later. This is not legal advice.
3. **Language and environment.** Test the supported languages and dialects with real technicians in real conditions, including noise. Technical terms and product names are the hardest part.

It also makes sense to define which fields may be filled by voice and which values the technician has to confirm, for example measured values relevant to safety.

## Pick one high-volume job type

A pragmatic sequence for a manufacturer with field service:

```schritte
Confirm availability
  Confirm licenses per feature, and whether you use the classic service appointment model or Workforce Scheduling visits.
Pick one job type
  High volume and a clear protocol, for example annual maintenance of a common machine type.
Clean up the data model
  For this job type: asset data, mandatory values, fault codes, link to spare parts.
Build the guided workflow
  Build it with the service organization and test it with technicians from different experience levels.
Pilot voice input separately
  Only after data protection and the works council have agreed.
Measure the effect
  Time spent on documentation, completeness of reports, time until invoicing.
```

Whether technicians then actually use the new features depends on what they get out of them. That is the subject of [Field Service app: getting technicians on board](/en/blog/field-service-app-technician-adoption/). Complete field service data is also what any AI agent for service will need later, as I explain in [why Agentforce needs business value and data quality first](/en/blog/agentforce-business-value-data-quality-first/).
