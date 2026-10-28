---
title: "Field Service work orders: from case to technician"
description: "How a customer call becomes a technician visit in Salesforce Field Service: case, work order, line item, service appointment, and who creates which record."
pubDate: 2026-10-28
lang: en
slug: field-service-case-to-work-order
translationKey: field-service-case-to-work-order
topic: field-service
categories: [field-service, architecture]
tags: [field service, work order, service appointment, case, work type, manufacturing]
takeaways:
  - "In Salesforce Field Service a case holds the customer's problem, a work order the job to be done, line items the subtasks and a service appointment the visit that gets scheduled."
  - "Work types are templates for kinds of jobs such as annual maintenance or breakdown repair. They carry duration and required skills and can create the service appointment automatically."
  - "Not every case needs a visit. The hotline decides with the entitlement and a triage checklist whether remote help, a part shipment or a technician solves the problem."
  - "Maintenance plans create work orders without a case, so planned and unplanned work end up in the same dispatch queue and compete for the same technicians."
  - "Whoever works cases in the contact centre cannot do that on a Dispatcher or Technician licence, so the record chain decides the licence mix as well."
faq:
  - q: "What is the difference between a case and a work order in Salesforce?"
    a: "A case records the customer's problem and the communication around it. A work order describes the job that has to be done in the field. A work order can reference the case it belongs to."
  - q: "What is a service appointment in Field Service?"
    a: "A service appointment is the visit that gets scheduled and assigned to a technician. Its parent is usually a work order or a work order line item."
  - q: "Can Salesforce create the service appointment automatically?"
    a: "Yes. If the work type has the Auto-Create Service Appointment option, a service appointment is created every time a work order or line item with that work type is created."
  - q: "Do maintenance plans create cases?"
    a: "No. Maintenance plans generate work orders directly from maintenance work rules, manually or automatically three times a day according to Trailhead. No case is involved."
draft: false
---

In Salesforce Field Service a customer request passes through four records before a technician arrives. The case holds the customer's problem, the work order the job to be done, work order line items the subtasks, and the service appointment the visit that gets scheduled. The hotline creates the case and decides whether a visit is needed at all. If so, it creates a work order, and a work type with the right setting creates the appointment automatically. Dispatch or the scheduling engine then assigns a technician. Planned maintenance takes a shortcut: maintenance plans create work orders without any case.

## Which records carry a field service job?

Salesforce sells the product today as Field Service and Operations; the data model has stayed the same. The [Field Service developer guide](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm) describes the core objects like this:

| Record | What it holds | Example at a machine builder |
|---|---|---|
| Case | The customer's problem and the communication | "Packaging machine stops with error 412" |
| Work order | Work to be completed for the customer | Breakdown repair on serial number X |
| Work order line item | A child record of the work order, a subtask | Replace sensor, recalibrate, test run |
| Service appointment | The visit to the field to perform the work | Tuesday 8:00 to 11:00, technician Y |

The developer guide states that a work order can reference a case "to indicate that the work is being performed as part of a customer case". The parent of a service appointment is typically a work order or a work order line item. Line items help when one visit has several steps that need different skills or are billed separately.

## What do work types do?

A work type is a template for a kind of job, for example annual maintenance, breakdown repair or commissioning. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_center/field_service_center_worktypes), it carries the estimated duration and the required skills, and knowledge articles attached to the work type show up on every work order that uses it. Work types can be applied to work orders and to line items, so a line item can carry its own work type with its own skills.

The most important setting is Auto-Create Service Appointment. If it is set, Trailhead says, "every time a work order is created with this work type, a service appointment is created". The appointment takes duration and date settings from the work type. Without this option, someone has to create the appointment by hand, and that step gets forgotten.

Clean work types are part of the master data that scheduling needs. Which data that is and which system leads is covered in [Salesforce Field Service: what data does scheduling need?](../salesforce-field-service-master-data/).

## Does every case need a technician?

No, and this is where most of the money in service is saved or lost. Before a work order is created, the hotline should answer two questions.

**What is the customer entitled to?** The entitlement on the asset or the service contract says which response time applies and what is covered. Salesforce measures response times with entitlement processes and milestones. One detail from the [Trailhead unit on entitlements with work orders](https://trailhead.salesforce.com/content/learn/modules/entitlement-management-for-lightning-experience/use-entitlements-with-work-orders): entitlement processes only run on records of their type, so cases and work orders need separate processes. How service contract, maintenance plan and entitlement fit together is covered in [Field Service: how to model maintenance contracts](../salesforce-field-service-maintenance-contracts/).

**What solves the problem?** I recommend a short triage checklist that sorts calls into three outcomes:

- **Remote help.** Operator error, a parameter, a reset. The case is closed without a work order.
- **Part shipment.** The fault is clear and the customer's staff can swap the part. The order goes to the ERP, the case waits for confirmation.
- **Technician visit.** Only then is a work order created.

On a breakdown hotline, a voice agent can take over the intake and triage. Where it should stop and hand over to a person is covered in [Breakdown hotline with Agentforce Voice](../breakdown-hotline-agentforce-voice/). For the human agents in the console, [Casey and the Service Rep Assistant](../service-cloud-casey-service-rep-assistant/) describe what Service Cloud adds.

## Who creates which record?

| Record | Created by | When |
|---|---|---|
| Case | Hotline, customer portal or agent | At the first contact |
| Work order | Hotline, from the case | When triage says "visit" |
| Work order line items | Hotline, work type or technician | With the work order or on site |
| Service appointment | Automatically via the work type | When the work order is created |
| Assignment | Dispatcher or scheduling engine | Status Scheduled, then Dispatched |
| Work order without case | Maintenance plan | Planned maintenance |

Planned maintenance enters through a different door. According to the [Trailhead unit on generating work orders](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field-service-generate-work-orders), a maintenance plan creates work orders manually or automatically, and automatic generation "runs 3 times a day". With the auto-create option on the work type, each of these work orders comes with an appointment. No case is involved.

The consequence: planned and unplanned work land in the same dispatch queue and compete for the same technicians. If the planned maintenance for the next four weeks is already booked, a machine-down call on Tuesday has to push something out. Priorities and service objectives decide what moves, and somebody has to own that rule.

## Where is the licence trap in this chain?

The record chain also decides the licence mix. According to the [Field Service pricing page](https://www.salesforce.com/service/field-service-management/pricing/), Dispatcher and Technician licences may not be used for contact centre, call centre or customer case management. Whoever works cases needs Service Cloud or Field Service Plus.

In practice this hits the small service team where the dispatcher also answers the hotline. That person needs Field Service Plus at $230 instead of Dispatcher at $175 (price list, October 2026). The full role matrix is in [Field Service licences: which role needs which one?](../field-service-licences-by-role/).

## A typical scenario: a "machine down" call

A typical scenario, as an assumption: a customer calls at 7:40 on a Tuesday because a packaging machine stops with an error.

1. The hotline agent finds the asset by serial number and creates a case. The entitlement shows a service contract with 8 hours response time.
2. Triage: the error code points to a defective sensor, the customer has no spare. Remote help does not solve it.
3. The agent creates a work order from the case with the work type "Breakdown repair, sensor". The work type carries 3 hours duration and the skill "Sensors, series B". A line item for the test run follows.
4. The work type creates the service appointment automatically. The agent sets its due date so the 8-hour response time is met.
5. The dispatcher runs the candidate search, moves a planned maintenance visit from Tuesday to Thursday and schedules the technician who has the sensor in his van. Status Scheduled, then Dispatched.
6. The technician sees the job in the mobile app, documents the replacement and the test run, and closes the work order. The case is closed after the customer confirms.

Steps 3 and 4 are where the data model pays off. Without the work type, the agent has to know duration and skills, and the appointment is created by hand.

## Where should you start?

Draw the path for your three most common call types, from the first call to the closed work order, and write down who creates which record. That drawing answers the licence question and shows which work types you need. How this fits into the business case is covered in [chapter 1 of the Field Service masterclass](../../masterclass/field-service/field-service-business-case-licences/).

Case, work order and appointment are three records with three owners, and the work type connects them; if you want to check your process against this chain, [send me a message](#contact).
