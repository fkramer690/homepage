---
title: "Field Service: How to Model Maintenance Contracts"
description: "Service contracts, maintenance plans and entitlements in Salesforce Field Service: what each object covers and how response times steer scheduling."
pubDate: 2026-10-27
lang: en
slug: salesforce-field-service-maintenance-contracts
translationKey: field-service-maintenance-contracts
topic: field-service
categories: [field-service]
series: { id: field-service, part: 5 }
tags: [Field Service, Maintenance contracts, Entitlements, Manufacturing]
takeaways:
  - "In Salesforce Field Service a maintenance contract spreads across three objects: service contract for what was sold, maintenance plan for planned maintenance and entitlement for the committed service level."
  - "Entitlements are only partly about maintenance contracts. They can also come from a warranty or a support package and describe what a customer is entitled to."
  - "Maintenance plans generate work orders for maintenance in advance, according to Salesforce at most 2,600 work orders and line items per run."
  - "Entitlements can influence priority in dispatching. Field Service schedules high-priority appointments first and can push out low-priority ones to do so."
  - "Response times from the contract are measured with entitlement processes and milestones on the work order, which makes them provable."
faq:
  - q: "What is the difference between a service contract and an entitlement?"
    a: "A service contract is the agreement with the customer, with line items for the covered products or assets. An entitlement describes the right to a service, such as a response time, and can sit on a contract, an asset or an account."
  - q: "How does Field Service create maintenance visits?"
    a: "A maintenance plan defines how often assets are maintained and generates the work orders for a set period in advance, automatically if you want. Different intervals for single assets are handled by maintenance work rules."
  - q: "How does Salesforce measure response times in field service?"
    a: "With an entitlement process of type Work Order. It consists of milestones, such as a time until the technician is on site, which run on the work order and show whether the commitment was met."
  - q: "How does priority influence scheduling in Field Service?"
    a: "By default, priority uses a scale from 1 to 10, where 1 is the highest. When technicians are scarce, optimization schedules high-priority appointments first and can push out low-priority ones."
draft: false
---

In Salesforce Field Service a maintenance contract spreads across three objects. The service contract records what was sold. The maintenance plan generates the planned maintenance. The entitlement describes the service level the customer is entitled to, such as a response time. Entitlements are only partly about maintenance contracts, because a right to service can also come from a warranty or a support package. In one project, entitlements were part of the scope and influenced prioritization in dispatching. That is where their value for field service shows.

This article is part 5 of the series. How Field Service schedules and what the dispatcher checks is in [part 3](../salesforce-field-service-scheduling-automation/). Which master data this needs, such as assets and visiting hours, is in [part 2](../salesforce-field-service-master-data/).

## Which object covers what?

The terms sound alike and often get mixed up in projects. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=service.entitlements_terms.htm&language=en_US&type=5):

| Object | What it covers | Example |
|---|---|---|
| Service contract | The agreement with the customer | Maintenance contract for a production line, three years |
| Contract line item | The covered products or assets | Two presses and a robot from that line |
| Maintenance plan | How often maintenance happens | Inspection every six months |
| Entitlement | What the customer is entitled to | Technician on site within 24 hours |
| Entitlement process with milestones | How the entitlement is measured | Clock starts when the work order is created |

The service contract is the commercial side; how it is billed on a recurring basis is covered in [maintenance contracts: recurring billing in Revenue Cloud](../maintenance-contracts-recurring-billing/). The maintenance plan is the plannable work. The entitlement is the unplanned work with a commitment, the breakdown where a response time applies. A contract can have all three, but does not have to. A pure warranty case often has only an entitlement on the asset and no maintenance plan. How warranty claims run in Manufacturing Cloud is in [chapter 4 of the Manufacturing Cloud masterclass](../../masterclass/manufacturing-cloud/warranty-and-after-sales/).

## How is planned maintenance created?

A maintenance plan defines how often a customer's assets are maintained and generates the work orders for that. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.fs_create_maintenance.htm&language=en_US&type=5), it belongs to an account and contact, can point to a service contract and lists the covered assets. Different intervals, for example for an asset running three shifts, are handled by maintenance work rules directly on the asset.

Two settings deserve attention:

- **Generation timeframe.** It sets how far ahead work orders are created. Too short leaves scheduling no room, too long fills the system with work orders that will still change.
- **Limit per run.** One run creates at most 2,600 work orders and line items combined. For a customer with many assets and a short interval, that limit comes sooner than you think.

Maintenance visits are the jobs where the automation from part 3 can most likely run without a dispatcher. They are plannable, recurring and usually have a fixed work type with known skills and parts.

## How do entitlements steer dispatching?

An entitlement on its own changes nothing about scheduling. It only takes effect when it triggers two things: a measurement and a priority.

**Measurement.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=service.entitlements_supported_objects.htm&type=5), milestones also run on work orders. That needs an entitlement process of type Work Order. A process of type Case does not run on a work order, even if the same entitlement is behind it. The milestone then shows whether the technician was on site within the committed time and makes the commitment provable to the customer.

**Priority.** Field Service schedules by a priority field. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.pfs_scheduling_priority_optimization.htm&language=en_US&type=5), it uses a scale from 1 to 10 by default, where 1 is the highest. The work order comes with a Priority field from Low to Critical, which a formula turns into numbers. When technicians are scarce, optimization schedules high-priority appointments first and can push out low-priority ones to do so.

You build the link between the two yourself, usually with a flow: a work order with a "response within 24 hours" entitlement gets a higher priority than one without a commitment. That way the commitment from the contract goes straight into the scheduling engine's decision, and the dispatcher does not have to look up the contract for every breakdown.

Played through once, it looks like this: a press fails at a customer with a premium contract. The back office creates a work order for the asset, and the entitlement "technician on site within 24 hours" is assigned. The milestone starts. A flow sets the priority to Critical, which the formula turns into a 1. The next optimization run schedules the appointment ahead of another customer's half-yearly inspection, which comes from a maintenance plan and still fits a day later. The dispatcher reviews the proposal and releases it. When the milestone counts as met, for example with the status In Progress on site, you define yourself in the entitlement process.

## What should you watch out for?

First: separate the objects cleanly from the start. If response times live in a text field on the service contract, you can neither measure them nor bring them into scheduling. If maintenance intervals hide in entitlements, you get no automatically generated work orders.

Second: keep the number of service levels small. Each level needs its own process, its own milestones and its own priority rule. Three levels can be explained and checked, ten cannot.

Third: check the hours. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=fs_oh_considerations.htm&language=en_US&type=5), entitlements can carry their own operating hours for appointment booking, for example shorter time windows for customers with a premium contract. On top come the visiting hours on the account from part 2. If you maintain both, know which one applies before a customer asks why their 24-hour appointment did not happen on Saturday.

Fourth: settle the line to warranty. Whether a visit runs under warranty, under contract or is billed decides the invoicing. That commercial side does not belong in scheduling, but it has to be visible on the work order. Otherwise the technician fits a part that nobody can invoice later, or the customer gets a bill for a visit that ran under warranty.

## Where should you start?

Take your three most common contract types and write down for each what the customer bought, which maintenance is planned and which response time is committed. Service contracts, maintenance plans and entitlements follow almost by themselves. Then decide which priority each commitment gets in scheduling.

The next part of the series covers service partners and subcontractors. If you want an independent look at translating your contracts into Field Service before then, [get in touch](#contact).
