---
title: "Salesforce Field Service: Modeling Maintenance Contracts"
description: "Service contracts, maintenance plans and entitlements in Salesforce Field Service: what each object covers and how response times reach scheduling."
pubDate: 2026-10-27
lang: en
slug: salesforce-field-service-maintenance-contracts
translationKey: field-service-maintenance-contracts
topic: field-service
categories: [field-service]
series: { id: field-service, part: 5 }
tags: [Field Service, Maintenance contracts, Entitlements, Manufacturing]
takeaways:
  - "A maintenance contract typically uses three objects: service contract (what was sold), maintenance plan (planned maintenance) and entitlement (service level)."
  - "Entitlements can also come from a warranty or a support package. They describe what a customer is entitled to."
  - "Maintenance plans generate maintenance work orders in advance. Size large plans based on assets, rules and timeframe, because each run has a limit."
  - "Entitlements influence scheduling once automation turns the service level into a priority. High-priority appointments are then scheduled first."
  - "Response times from the contract are measured with entitlement processes and milestones on the work order, which makes compliance provable."
faq:
  - q: "What is the difference between a service contract and an entitlement?"
    a: "A service contract is the agreement with the customer, with line items for the covered products or assets. An entitlement describes the right to a service, such as a response time, and can sit on a contract, an asset or an account."
  - q: "How does Field Service create maintenance visits?"
    a: "A maintenance plan defines how often assets are maintained and generates the work orders for a set period in advance, automatically if configured. Different intervals for individual assets are handled by maintenance work rules."
  - q: "How does Salesforce measure response times in field service?"
    a: "With an entitlement process of type Work Order. It consists of milestones, such as the time allowed until the technician is on site. These milestones run on the work order and show whether the commitment was met."
  - q: "How does priority influence scheduling in Field Service?"
    a: "By default, priority is rated on a scale from 1 to 10, where 1 is the highest. When technicians are scarce, optimization schedules high-priority appointments first and can push out low-priority ones. An entitlement only affects scheduling if a flow or formula turns it into that priority."
draft: false
---

In Salesforce Field Service, a maintenance contract is typically modeled with three separate objects. The service contract records what was sold. The maintenance plan generates the planned maintenance. The entitlement describes the service level the customer is entitled to, such as a response time. Entitlements are only partly about maintenance contracts, because a right to service can also come from a warranty or a support package. In one project, entitlements were part of the scope and influenced prioritization in dispatching. They do not do that by themselves: automation has to translate the service level into a scheduling priority. That is where their value for field service becomes visible.

This article is part 5 of the series. How Field Service schedules and what the dispatcher checks are covered in [part 3](../salesforce-field-service-scheduling-automation/). The master data needed for this, such as assets and visiting hours, is covered in [part 2](../salesforce-field-service-master-data/).

## Which object covers what?

The terms sound alike and often get mixed up in projects. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=service.entitlements_terms.htm&language=en_US&type=5):

| Object | What it covers | Example |
|---|---|---|
| Service contract | The agreement with the customer | Maintenance contract for a production line, three years |
| Contract line item | The covered products or assets | Two presses and a robot from that line |
| Maintenance plan | How often maintenance happens | Inspection every six months |
| Entitlement | What the customer is entitled to | Technician on site within 24 hours |
| Entitlement process with milestones | How the entitlement is measured | Clock starts when the work order is created |

The service contract is the commercial side; how it is billed on a recurring basis is covered in [maintenance contracts: recurring billing in Revenue Cloud](../maintenance-contracts-recurring-billing/). The maintenance plan is the plannable work. The entitlement is a right to a service level; in field service it matters most for breakdowns where a response time applies. A contract can have all three, but does not have to. A pure warranty case often has only an entitlement on the asset and no maintenance plan. How warranty claims are handled in Manufacturing Cloud is covered in [chapter 4 of the Manufacturing Cloud masterclass](../../masterclass/manufacturing-cloud/warranty-and-after-sales/).

## How is planned maintenance created?

A maintenance plan defines how often a customer's assets are maintained and generates the work orders for that. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.fs_create_maintenance.htm&language=en_US&type=5), it belongs to an account and contact, can point to a service contract and lists the covered assets. Different intervals, for example for an asset running three shifts, are handled by maintenance work rules directly on the asset.

Two settings deserve attention:

- **Generation timeframe.** It sets how far ahead work orders are created. A timeframe that is too short leaves scheduling no room; one that is too long fills the system with work orders that will still change.
- **Limit per run.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.fs_limits.htm&language=en_US&type=5), one run creates at most 2,600 work orders per maintenance plan, which in practice also limits the number of assets per plan. With several maintenance work rules per asset, the practical limit drops further. For a customer with many assets and a short interval, that limit is reached sooner than you think. Salesforce recommends reducing frequency, generation timeframe or the number of assets per plan.

Maintenance visits are the jobs for which the automation from part 3 is most likely to run without a dispatcher. They are plannable, recurring and usually have a fixed work type with known skills and parts.

## How do entitlements influence dispatching?

An entitlement on its own changes nothing about scheduling. It only takes effect when it drives two things: measurement and priority.

**Measurement.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=service.entitlements_supported_objects.htm&type=5), milestones also run on work orders. A configured milestone can show whether the technician was on site within the committed time, as long as an agreed status or timestamp marks the arrival. That makes the commitment provable to the customer.

```hinweis achtung
Milestones on work orders need an entitlement process of type Work Order. A process of type Case does not run on a work order, even if the same entitlement is behind it.
```

**Priority.** Field Service uses a priority field for scheduling. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.pfs_scheduling_priority_optimization.htm&language=en_US&type=5), Field Service uses a scale from 1 to 10 by default, where 1 is the highest; a formula translates the work order priority into that scheduling priority. When technicians are scarce, optimization schedules high-priority appointments first and can push out low-priority ones to do so.

You build the link between entitlement and priority yourself, usually with a flow: a work order with a "response within 24 hours" entitlement gets a higher priority than one without a commitment. That way the commitment from the contract goes straight into the scheduling engine's decision, and the dispatcher does not have to look up the contract for every breakdown.

Played through once: a press fails at a customer with a premium contract.

```schritte
Create the work order | Back office
  The back office creates a work order for the asset and assigns the entitlement "technician on site within 24 hours". The milestone starts.
Set the priority | Flow
  A flow sets the priority to Critical, which the formula turns into a 1.
Optimize | Scheduling engine
  The next optimization run schedules the appointment ahead of another customer's half-yearly inspection, which comes from a maintenance plan and still fits a day later.
Release | Dispatcher
  The dispatcher reviews the proposal and releases it.
```

You define in the entitlement process itself when the milestone counts as met, for example with the status In Progress on site.

## Separate the objects, keep levels few, settle hours and warranty

**Separate the objects cleanly from the start.** If response times live in a text field on the service contract, you can neither measure them nor bring them into scheduling. If maintenance intervals hide in entitlements, you get no automatically generated work orders.

**Keep the number of service levels small.** Several levels can share one entitlement process if milestones with different criteria are enough. A separate process makes sense when levels differ in business hours, start or exit logic. Each level still needs its own milestones and priority rule. Three levels can be explained and checked, but ten cannot.

**Keep the hours apart.** Three time concepts come together here and are easily mixed up:

- **The SLA clock.** Business hours on the entitlement process and its milestones decide whether a 24-hour commitment counts Saturday or not.
- **The booking window.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=fs_oh_considerations.htm&language=en_US&type=5), operating hours on the entitlement set the arrival windows offered to the customer, for example two hours for premium customers instead of four.
- **Customer availability.** The visiting hours on the account from part 2, copied to the work order, say when the technician can reach the machine.

Decide for each contract type which of the three applies, before a customer asks why their 24-hour appointment did not happen on Saturday.

**Settle the boundary with warranty.** Whether a visit runs under warranty, is covered by a contract or is billed separately determines invoicing. That commercial side does not belong in scheduling, but it has to be visible on the work order. Otherwise the technician installs a part that cannot be invoiced later, or the customer gets a bill for a visit that ran under warranty.

## Sales, service and finance decide what goes into the objects

The objects are configuration. What goes into them is a business decision, and it belongs to service management, sales and finance together:

- **How many service levels sales may sell.** Every level that sales promises has to be set up and measured. Only levels that should change the order of visits need a scheduling priority, and several levels can share one. Agree on a short list before the first contract is negotiated, not afterwards.
- **What a missed response time costs.** Penalties, credits or simply a lost renewal. Together with machine criticality and any safety or regulatory consequences, those factors decide how much priority a commitment gets in scheduling and how much it is worth to measure it reliably.
- **Who decides between warranty, contract and invoice.** Someone has to record this on each work order, ideally before the visit. Otherwise service and finance argue about it after every visit.

Three warning signs that the contract model is not working: response times live in a text field, dispatchers look up the contract for every breakdown, and nobody can report how many commitments were met last month.

## Write down your three most common contract types

Take your three most common contract types and write down for each what the customer bought, which maintenance is planned and what response time has been committed. Service contracts, maintenance plans and entitlements will then be almost self-evident. Then decide which scheduling priority each commitment gets. How service partners and subcontractors fit into the same scheduling is covered in the [next part of the series](../salesforce-field-service-service-partners/).
