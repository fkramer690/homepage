---
title: "Handing orders to SAP: Dynamic Revenue Orchestrator"
description: "How Dynamic Revenue Orchestrator turns a Revenue Cloud order into fulfillment steps, where the SAP callout belongs and when a plain integration is enough."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: revenue-cloud-order-orchestration-sap
translationKey: revenue-cloud-order-orchestration-erp
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: integration
tags: [Revenue Cloud, Dynamic Revenue Orchestrator, SAP, order management, integration]
takeaways:
  - "Decomposition turns commercial products into technical products for downstream systems, controlled by decomposition rules."
  - "A plan uses five general step types plus Staged Assetize: auto task, callout, manual task, milestone and pause. The SAP hand-over is a callout."
  - "Failed steps are fallout. A matching fallout rule sets retries and the queue; without one, the step fails fatally with no retry."
  - "If an order goes to SAP in one piece and nothing else happens in Salesforce, a plain integration without DRO is usually enough."
faq:
  - q: "What is Dynamic Revenue Orchestrator in Salesforce?"
    a: "Dynamic Revenue Orchestrator (DRO) is the order fulfillment engine of Revenue Cloud for orders you submit to it. It breaks orders into technical products and runs an orchestration plan with steps in Salesforce and in external systems such as an ERP."
  - q: "Do I need DRO to send Revenue Cloud orders to SAP?"
    a: "No. A record-triggered flow or a middleware call can send an activated order to SAP directly. DRO pays off when one order triggers several fulfillment steps with dependencies, owners and deadlines."
  - q: "How much does Dynamic Revenue Orchestrator cost?"
    a: "The Revenue Cloud pricing page lists Dynamic Revenue Orchestration as available for purchase with Revenue Cloud Advanced and marked as having freemium access, but it publishes no separate DRO price. The page does not say what the freemium access covers, so ask Salesforce in writing before you base your plans on it."
  - q: "What happens when SAP rejects an order from Revenue Cloud?"
    a: "In DRO the failed step becomes fallout. With a matching fallout rule it is retried as configured and then assigned to a queue, where an operator corrects the data and retries the step. Without a matching rule it fails fatally without retry. Marking it complete manually should be an approved exception."
  - q: "Which step types does an orchestration plan have?"
    a: "Six: an auto task runs a flow, a callout calls an external system, a manual task waits for a person, a milestone marks a checkpoint, a pause holds the plan until a Resume On rule is met, and Staged Assetize creates assets for some lines while others are still in process."
draft: false
---

In Revenue Cloud, an activated order is handed to Dynamic Revenue Orchestrator (DRO), usually by a record-triggered flow. DRO breaks the commercial products the customer bought into technical products and runs an orchestration plan of auto tasks, callouts, manual tasks, milestones, pauses and other steps in a defined order. The hand-over to SAP belongs in a callout step that writes the SAP order number back, and failures appear as fallout in a queue. DRO is an add-on for Revenue Cloud Advanced. If your order goes to SAP in one piece and nothing else happens in Salesforce, a plain integration is enough.

## What does Dynamic Revenue Orchestrator do?

Dynamic Revenue Orchestrator is the part of Revenue Cloud that takes over once an order is sold. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/meet-dynamic-revenue-orchestrator) calls it the engine for end-to-end order processing and splits it into two parts: decomposition breaks the order into technical products and services, orchestration maps the steps needed to fulfill it across systems, including fallout management for failed steps. Trailhead lists DRO under "Agentforce Revenue Management", the name Salesforce now uses for Revenue Cloud, while the pricing page still says Revenue Cloud and sells it as "Dynamic Revenue Orchestration".

Trailhead names three roles, and I would fill them before the first sprint:

- **DRO admin:** sets up DRO and configures the fallout and SLA settings.
- **Fulfillment designer:** builds decomposition rules and orchestration plans and tests them.
- **Fulfillment operator:** works the manual tasks in the queues and resolves failed steps.

I would put the operator role in order management or inside sales, not in IT. These are the people who know why an order is stuck. Each of them needs appropriate training, the Fulfillment User permission set license and the DRO permission set for the role.

## A record-triggered flow hands the order to DRO

The path starts with an accepted quote that becomes an order. According to [Trailhead on managing orders](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/manage-orders), you create a record-triggered flow that submits the order to DRO when, for example, its status changes to Activated. Two context definitions carry the data: SalesTransactionContext holds the order and its fulfillment line items; FulfillmentAssetContext is used for decomposition and is mapped to the asset entities.

Without such a flow nothing reaches DRO, and simple orders can deliberately bypass it. Activation is a business event, so decide who may activate an order and what must be true beforehand: approvals complete, the customer created in SAP, the credit check passed. I would put these checks into the flow's entry conditions or into validation rules, instead of relying on the sales rep to remember them.

## What is order decomposition?

Decomposition separates what the customer sees from what the back office needs. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/discover-order-decomposition), a commercial product is any product a customer can find in the catalog. A technical product also sits in the catalog, is generally hidden from customers and is defined around the needs of downstream systems such as billing, fulfillment or logistics. Product fulfillment decomposition rules map a source, such as a product or product classification, to a technical product, including fields and attributes, and can include conditions.

A worked example: a customer buys "packaging line L200 with installation and remote monitoring". Decomposition turns that into three technical products: a sales order item for SAP, an installation job for service and the activation of the monitoring service. Neither the customer nor the sales rep sees these three.

Trailhead also says decomposition is not needed for simple orders, which can be orchestrated directly. Because rules can point to product classifications, one rule can cover a whole product family instead of every single machine. That keeps the rules maintainable when the catalog has hundreds of variants.

## Step types in the orchestration plan

An orchestration plan splits fulfillment into steps that run in a defined sequence. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/explore-order-orchestration) names five step types; current [Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.fulfillment_step_types.htm&language=en_US&type=5) adds a sixth, Staged Assetize, which creates assets for finished lines while others are still in process. The examples in the right column are my assumptions for a machine builder:

| Step type | What it does | Example in manufacturing |
|---|---|---|
| Auto task | Runs a Salesforce flow | Create the installation work order |
| Callout | Calls a third-party system | Create the sales order in SAP |
| Manual task | Waits for a person to enter data or confirm | Application engineer confirms the layout |
| Milestone | Marks a checkpoint to track dependencies | Machine delivered |
| Pause | Holds the plan until a Resume On rule is met | Wait until the installation status on the line item is set to complete |

Steps are grouped in swimlanes, usually one per fulfillment system, and can depend on each other; if a step only has to wait for another step, a dependency is enough and no pause is needed. A step's scope sets whether it is created once per plan, once per bundle, once per line item or per custom grouping, such as one SAP order per plant or site. Each step can carry an estimated duration as its SLA and a jeopardy threshold that warns before the SLA is missed: Trailhead's example flags a 24-hour step after 23 hours.

## The hand-over to SAP belongs in a callout

It belongs in a callout step early in the plan. SAP needs the sales order before it can plan production, deliver and invoice, so most other steps depend on it.

I have not found a Salesforce reference pattern for Revenue Cloud and SAP. The closest is the [MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/), documented in 2021 for Sales Cloud and Salesforce CPQ, not for Revenue Cloud or DRO: creating the order in Salesforce triggers creation of the order in SAP S/4HANA, and the SAP order number is displayed in Salesforce. I use only the correlation and order number ideas from it; the other rules are my own architecture choices:

1. The callout sends a stable idempotency key, such as the Salesforce order ID, and the integration layer or SAP checks it before creating an order. Merely sending the ID does not prevent duplicates.
2. The SAP order number comes back and is stored on the Salesforce order, either in the synchronous response or, in the asynchronous pattern, through a later callback: the callout stays in progress after an HTTP 202 until the result arrives.
3. In the architecture assumed here, SAP owns delivery, confirmed dates and the invoice after the hand-over. Salesforce shows the status and does not change it.
4. Changes after submission need an explicit amendment design. Revenue Cloud can create a linked supplemental order, DRO reconciles the running plan and can run compensation steps, and whether SAP gets a change, a cancellation or a replacement order is an integration decision. How amendments work on the asset side is explained in [assets, amendments and renewals](/en/blog/revenue-cloud-assets-amendments-renewals/).

```ablauf
sf: Order, DRO plan, Fallout queue
erp: SAP sales order, Delivery, Invoice
Order --activated--> DRO plan
DRO plan --callout--> SAP sales order
SAP sales order ..order number..> Order
SAP sales order ..rejected..> Fallout queue
SAP sales order --> Delivery
Delivery --> Invoice
```

Which system owns which step from quote to invoice is the topic of [Revenue Cloud and SAP: who owns what](/en/blog/revenue-cloud-sap-quote-to-cash-ownership/). The same split belongs in your [object ownership matrix](/en/blog/salesforce-object-ownership-matrix/), so no partner builds a second path to SAP. Reading the order status back from SAP for dealers is covered in [Agentforce and SAP: order status through MuleSoft](/en/blog/agentforce-sap-order-status-mulesoft/).

## What happens when SAP rejects the order?

Then the step becomes fallout. Trailhead defines fallout as an order that failed because of inadequate inventory, wrong information, a system error or another reason. A [fallout rule](https://help.salesforce.com/s/articleView?id=sf.dro_fallout_design_and_management.htm&language=en_US&type=5) sets retry count, interval and the queue for steps that fail for good; without a matching rule the step is set to fatally failed and not retried. In the queue an operator resolves the problem and retries the step. The operator can also mark the step complete, which lets the plan continue despite the failure: I would allow that only as an approved exception with a reason, never for a rejected SAP order that later steps depend on. The [design-time data model](https://developer.salesforce.com/docs/platform/data-models/guide/dro-design-time.html) has separate objects for fallout rules, jeopardy rules and task assignment rules, so this is configuration rather than custom code.

Assume these typical SAP rejections: the ship-to party does not exist in SAP yet, a material is blocked for sales, or the customer has a credit block. Retrying does not help with any of them. The queue therefore needs an owner in order management, a target time and a short list of what to check. Assigning a step to a fallout queue sends no email and creates no task, so you need your own notification. Without that, fallout becomes a list nobody reads while the customer waits.

## When is a plain integration without DRO enough?

DRO pays off when one order triggers several dependent fulfillment steps in different systems. A classic machine sale is often simpler: the order goes to SAP in one piece, and production, delivery and invoicing all happen there. Then a record-triggered flow or a middleware call on activation is enough, with the same rules for reference, order number and error handling.

I would consider DRO when at least two of these apply:

- One order line becomes work in more than one system, such as SAP, service and a monitoring platform.
- Steps depend on each other, and someone has to see where an order is stuck.
- Commitments have deadlines that should be tracked per step.
- Orders mix one-off products and subscriptions that need different handling.

For large configured orders, also check the current [DRO limits](https://help.salesforce.com/s/articleView?id=ind.dro_dynamic_revenue_orchestrator_limits.htm&language=en_US&type=5), which differ for synchronous and asynchronous submission.

On cost, the [Revenue Cloud pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) lists Revenue Cloud Advanced at €200 per user and month, billed annually (as of 9 November 2026). That is the base product price, not a DRO price: Dynamic Revenue Orchestration is listed separately as available for purchase, marked "Freemium access available".

```hinweis offen
What the freemium access includes is not stated on the pricing page. Get it in writing before your design depends on it.
```

## Sketch your five most common order types

Take your five most common order types and, for each one, sketch what happens after signing: which system, which team, in which order. If every sketch ends in "SAP does the rest", start with a plain integration. If you see several systems and dependencies, model one order type in DRO first, including the callout to SAP and the fallout queue, and test the rejections before the happy path. The chapter [quote, contract, order](/en/masterclass/revenue-cloud/quote-contract-order/) shows where this step sits in the whole process, and the integration design is part of my work in [Salesforce integration](/en/services/salesforce-integration/).
