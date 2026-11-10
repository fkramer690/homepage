---
title: "Field Service work orders: from case to technician"
description: "How a customer call becomes a technician visit in Salesforce Field Service: case, work order, line item, service appointment, and who creates which record."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: field-service-case-to-work-order
translationKey: field-service-case-to-work-order
topic: field-service
categories: [field-service, architecture]
tags: [field service, work order, service appointment, case, work type, manufacturing]
takeaways:
  - "The case holds the problem, the work order describes the job, line items capture the substeps, and the service appointment represents the planned visit."
  - "Work types are templates for kinds of jobs with duration and skills, and they can create the service appointment automatically."
  - "The hotline uses the entitlement and a triage checklist to decide whether remote help, a parts shipment or a technician solves the problem."
  - "Maintenance plans create work orders without a case. Planned and unplanned work therefore compete for the same technicians."
  - "Whoever handles cases in the contact center cannot do that with only a Dispatcher or Technician license. The record chain also determines the license mix."
faq:
  - q: "What is the difference between a case and a work order in Salesforce?"
    a: "A case records the customer's problem and the communication around it. A work order describes the job that has to be done in the field. A work order can reference the case it belongs to."
  - q: "What is a service appointment in Field Service?"
    a: "A service appointment is the visit that gets scheduled and assigned to a technician. Its parent is usually a work order or a work order line item."
  - q: "Can Salesforce create the service appointment automatically?"
    a: "Yes. If the work type has the Auto-Create Service Appointment option, a service appointment is created when that work type is applied to a work order or line item that has no appointment yet. Records created before the option was switched on do not get an appointment."
  - q: "Do maintenance plans create cases?"
    a: "Not in the standard. Maintenance plans generate work orders manually or, according to Trailhead, automatically three times a day. No case is involved."
draft: false
---

In Salesforce Field Service a typical break-fix request passes through up to four records before a technician arrives; case and line items are optional. The case holds the customer's problem, the work order describes the job, line items the subtasks, and the service appointment the visit that gets scheduled. The hotline creates the case and decides whether a visit is needed at all. If so, it creates a work order, and a work type with the right setting creates the appointment automatically. The dispatch team or the scheduling engine then assigns a technician. Planned maintenance takes a shortcut: maintenance plans create work orders without any case.

## Which records carry a field service job?

Salesforce sells the product today as Field Service and Operations; the data model has stayed the same. The [Field Service developer guide](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm) describes the core objects like this:

| Record | What it holds | Example at a machine builder |
|---|---|---|
| Case | The customer's problem and the communication | "Packaging machine stops with error 412" |
| Work order | Work to be completed for the customer | Breakdown repair on serial number X |
| Work order line item | A child record of the work order, a subtask | Replace sensor, recalibrate, test run |
| Service appointment | The visit to the field to perform the work | Tuesday 8:00 to 11:00, technician Y |

The developer guide states that a work order can reference a case "to indicate that the work is being performed as part of a customer case". The parent of a service appointment is typically a work order or a work order line item. Line items help when a job has several steps that are billed separately or need different skills. Skills affect scheduling only on the record that owns the appointment, so steps with their own skills need their own appointment on the line item.

## Work types are templates for kinds of jobs

A work type is a template for a kind of job, for example annual maintenance, breakdown repair or commissioning. According to [Trailhead](https://trailhead.salesforce.com/content/learn/projects/modify-the-field-service-center/create-a-work-type), it carries the estimated duration and the required skills, and knowledge articles attached to the work type show up on every work order that uses it. Work types can be applied to work orders and to line items, so a line item can carry its own work type with its own skills.

The most important setting is Auto-Create Service Appointment. If it is set, Trailhead says, "every time a work order is created with this work type, a service appointment is created". The appointment uses the duration and date settings from the work type. Without this option, the appointment has to be created by a user or by other automation such as a flow, and that step can be forgotten.

Clean work types are part of the master data that scheduling needs. Which data that is and which system leads is covered in [Salesforce Field Service: what data does scheduling need?](../salesforce-field-service-master-data/).

## Does every case need a technician?

No, and this is where most of the money in service is saved or lost. Before a work order is created, the hotline should answer two questions.

**What is the customer entitled to?** The entitlement on the asset or the service contract says which response time applies and what is covered. Salesforce measures response times with entitlement processes and milestones. One detail from the [Trailhead unit on entitlements with work orders](https://trailhead.salesforce.com/content/learn/modules/entitlement-management-for-lightning-experience/use-entitlements-with-work-orders) is that entitlement processes only run on records of their type, so cases and work orders need separate processes. How the service contract, maintenance plan and entitlement fit together is covered in [Field Service: how to model maintenance contracts](../salesforce-field-service-maintenance-contracts/).

**What solves the problem?** I recommend a short triage checklist that sorts calls into three outcomes:

- **Remote help.** The issue is operator error, a parameter setting or a reset. The case is closed without a work order. With [visual remote assistance](../visual-remote-assistant-remote-help-instead-of-visit/) the agent sees the machine through the customer's phone camera instead of guessing from a description.
- **Part shipment.** The fault is clear and the customer's staff can swap the part. The order goes to the ERP, and the case waits for confirmation.
- **Technician visit.** Only then is a work order created.

On a breakdown hotline, a voice agent can take over the intake and triage. Where it should stop and hand over to a person is covered in [Breakdown hotline with Agentforce Voice](../breakdown-hotline-agentforce-voice/). For human agents working in the console, [Casey and the Service Rep Assistant](../service-cloud-casey-service-rep-assistant/) describes what Service Cloud adds.

## Who creates which record?

| Record | Created by | When |
|---|---|---|
| Case | Hotline, customer portal or agent | At the first contact |
| Work order | Hotline, from the case | When triage says "visit" |
| Work order line items | Hotline, work type or technician | With the work order or on site |
| Service appointment | Automatically via the work type | When the work order is created |
| Assigned resource | Dispatcher or scheduling engine | Appointment status moves to Scheduled, then Dispatched |
| Work order without case | Maintenance plan | Planned maintenance |

Planned maintenance follows a different path. According to the [Trailhead unit on generating work orders](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field-service-generate-work-orders), a maintenance plan creates work orders manually or automatically, and automatic generation "runs 3 times a day". Depending on the generation method and the auto-create option on the work type, these work orders come with an appointment. No case is involved.

The consequence: if planned and unplanned work use the same territories and technicians, they compete for the same capacity. If the planned maintenance for the next four weeks is already booked, a machine-down call on Tuesday has to push something out. Priorities and service objectives decide what moves, and somebody has to own that rule.

## The record chain also determines the license mix

```hinweis achtung
According to the [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/), Dispatcher and Technician licenses may not be used for contact center, call center or customer case management. The footnote allows it for Field Service and Operations Plus, a name the current price table no longer uses. Whoever handles cases needs Service Cloud or a Field Service+ edition.
```

In practice this hits the small service team where the dispatcher also answers the hotline. A Dispatcher license at $175 per user per month does not cover case management on its own. Since the US price list changed on 5 November 2026, the obvious bundle is Field Service+ Core at $250, though the footnote on case management still names the old Field Service and Operations Plus. I would have the exact combination and the right to perform case management confirmed in the order form. The full role matrix is in [Salesforce Field Service licenses: who needs which?](../field-service-licences-by-role/).

## Worked example: a "machine down" call

All details are assumptions. A customer calls at 7:40 on a Tuesday because a packaging machine stops with an error.

```schritte
Create the case | Hotline
  The hotline agent finds the asset by serial number and creates a case. The entitlement shows a service contract with 8 hours response time.
Triage | Hotline
  The error code points to a defective sensor, the customer has no spare. Remote help does not solve it.
Create the work order | Hotline
  The agent creates a work order from the case with the work type "Breakdown repair, sensor". The work type carries 3 hours duration and the skill "Sensors, series B". A line item for the test run follows.
Appointment appears | Work type and hotline
  The work type creates the service appointment automatically. The agent sets its due date so the 8-hour response time is met.
Schedule | Dispatcher
  The dispatcher runs the candidate search, moves a planned maintenance visit from Tuesday to Thursday and schedules a technician. Whether the sensor is in that technician's van is checked separately, because standard work rules do not look at van stock. Status Scheduled, then Dispatched.
Visit and close | Technician
  The technician sees the job in the mobile app, documents the replacement and the test run, and closes the work order. The case is closed after the customer confirms.
```

Steps 3 and 4 are where the data model pays off. Without the work type, the agent has to know duration and skills, and the appointment is created by hand.

## Map your three most common call types

Draw the path for your three most common call types, from the first call to the closed work order, and write down who creates which record. That drawing answers the license question and shows which work types you need. How this fits into the business case is covered in [chapter 1 of the Field Service masterclass](../../masterclass/field-service/field-service-business-case-licences/).
