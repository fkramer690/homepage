---
title: "Handing orders to SAP: Dynamic Revenue Orchestrator"
description: "How Dynamic Revenue Orchestrator turns a Revenue Cloud order into fulfilment steps, where the SAP callout belongs and when a plain integration is enough."
pubDate: 2026-10-28
lang: en
slug: revenue-cloud-order-orchestration-sap
translationKey: revenue-cloud-order-orchestration-erp
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: integration
tags: [Revenue Cloud, Dynamic Revenue Orchestrator, SAP, order management, integration]
takeaways:
  - "Decomposition turns commercial products into technical products for downstream systems, controlled by decomposition rules."
  - "An orchestration plan has five step types: auto task, callout, manual task, milestone and pause. The hand-over to SAP is a callout."
  - "Failed steps are fallout. DRO retries them a set number of times, then moves them to a queue where someone fixes them."
  - "If an order goes to SAP in one piece and nothing else happens in Salesforce, a plain integration without DRO is enough and saves an add-on."
faq:
  - q: "What is Dynamic Revenue Orchestrator in Salesforce?"
    a: "Dynamic Revenue Orchestrator (DRO) is the order fulfilment engine of Revenue Cloud. It breaks orders into technical products and runs an orchestration plan with steps in Salesforce and in external systems such as an ERP."
  - q: "Do I need DRO to send Revenue Cloud orders to SAP?"
    a: "No. A record-triggered flow or a middleware call can send an activated order to SAP directly. DRO pays off when one order triggers several fulfilment steps with dependencies, owners and deadlines."
  - q: "How much does Dynamic Revenue Orchestrator cost?"
    a: "The Revenue Cloud pricing page lists Dynamic Revenue Orchestration as an add-on available for purchase with Revenue Cloud Advanced, marked with freemium access. The page does not say what the freemium access covers, so ask Salesforce in writing before you plan with it."
  - q: "What happens when SAP rejects an order from Revenue Cloud?"
    a: "In DRO the failed step becomes fallout. It is retried as often as configured and then lands in a queue, where an operator corrects the data, retries the step or marks it complete manually."
  - q: "Which step types does an orchestration plan have?"
    a: "Five: an auto task runs a flow, a callout calls an external system, a manual task waits for a person, a milestone marks a checkpoint, and a pause holds the plan until another task is finished."
draft: false
---

In Revenue Cloud, an activated order is handed to Dynamic Revenue Orchestrator (DRO), usually by a record-triggered flow. DRO breaks the commercial products the customer bought into technical products and runs an orchestration plan: auto tasks, callouts, manual tasks, milestones and pauses in a defined order. The hand-over to SAP belongs in a callout step that writes the SAP order number back, and failures land as fallout in a queue. DRO is an add-on for Revenue Cloud Advanced. If your order goes to SAP in one piece and nothing else happens in Salesforce, a plain integration is enough.

## What does Dynamic Revenue Orchestrator do?

Dynamic Revenue Orchestrator is the part of Revenue Cloud that takes over once an order is sold. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/meet-dynamic-revenue-orchestrator) calls it the engine for end-to-end order processing and splits it into two parts: decomposition breaks the order into technical products and services, orchestration maps the steps needed to fulfil it across systems, including fallout management for failed steps. Trailhead files DRO under "Agentforce Revenue Management", one of the names Salesforce currently uses for Revenue Cloud, and the pricing page sells it as "Dynamic Revenue Orchestration".

Trailhead names three roles, and I would staff them before the first sprint:

- **DRO admin:** sets up DRO and configures the fallout and SLA settings.
- **Fulfilment designer:** builds decomposition rules and orchestration plans and tests them.
- **Fulfilment operator:** works the manual tasks in the queues and resolves failed steps.

I would put the operator role in order management or inside sales, not in IT. These are the people who know why an order is stuck, and they need the training and the licence.

## A record-triggered flow hands the order to DRO

The path starts with an accepted quote that becomes an order. According to [Trailhead on managing orders](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/manage-orders), you create a record-triggered flow that submits the order to DRO when, for example, its status changes to Activated. Two context definitions carry the data: SalesTransactionContext holds the order and its fulfilment line items, FulfillmentAssetContext is used for decomposition and mapped to the asset entities.

Activation is a business event, so decide who may activate an order and what must be true before: approvals complete, the customer known in SAP, the credit check passed. I would put these checks into the flow's entry conditions or into validation rules, instead of relying on the sales rep to remember them.

## What is order decomposition?

Decomposition separates what the customer sees from what the back office needs. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/discover-order-decomposition), a commercial product is any product a customer can find in the catalog. A technical product also sits in the catalog, is generally hidden from customers and is defined around the needs of downstream systems such as billing, fulfilment or logistics. Product fulfillment decomposition rules map a source, a product or a product classification, to a technical product, including fields and attributes, and can carry conditions.

A worked example: a customer buys "packaging line L200 with installation and remote monitoring". Decomposition turns that into three technical products: a sales order item for SAP, an installation job for service and the activation of the monitoring service. Neither the customer nor the sales rep sees these three.

Trailhead also says decomposition is not needed for simple orders, which can be orchestrated directly. Because rules can point to product classifications, one rule can cover a whole product family instead of every single machine. That keeps the rules maintainable when the catalog has hundreds of variants.

## Five step types in the orchestration plan

An orchestration plan splits fulfilment into steps that run in a defined sequence. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/dynamic-revenue-orchestrator-foundations/explore-order-orchestration) names five step types. The examples in the right column are my assumptions for a machine builder:

| Step type | What it does | Example in manufacturing |
|---|---|---|
| Auto task | Runs a Salesforce flow | Create the installation work order |
| Callout | Calls a third-party system | Create the sales order in SAP |
| Manual task | Waits for a person to enter data or confirm | Application engineer confirms the layout |
| Milestone | Marks a checkpoint to track dependencies | Machine delivered |
| Pause | Holds the plan until another task is finished | Wait until installation is complete |

Steps are grouped in swimlanes, usually one per fulfilment system, and can depend on each other. A step's scope sets whether it is created once per plan, once per bundle or once per line item. Each step can carry an estimated duration as its SLA and a jeopardy threshold that warns before the SLA is missed: Trailhead's example flags a 24-hour step after 23 hours.

## The hand-over to SAP belongs in a callout

In a callout step, early in the plan. SAP needs the sales order before it can plan production, deliver and invoice, so most other steps depend on it.

I have not found a Salesforce reference pattern for Revenue Cloud and SAP. The closest is the [MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/), documented for Sales Cloud and Salesforce CPQ: creating the order in Salesforce triggers the order in SAP S/4HANA, and the SAP order number is displayed in Salesforce. I would carry these rules over to Revenue Cloud:

1. The callout sends the Salesforce order ID as a reference, so a retry finds the existing SAP order instead of creating a second one.
2. The SAP order number comes back and is stored on the Salesforce order.
3. After the hand-over, SAP owns delivery, confirmed dates and the invoice. Salesforce shows the status and does not change it.
4. Changes after the hand-over run as new orders in Revenue Cloud, which DRO hands to SAP again. How amendments work on the asset side is in [assets, amendments and renewals](../revenue-cloud-assets-amendments-renewals/).

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

Which system owns which step from quote to invoice is the topic of [Revenue Cloud and SAP: who owns what](../revenue-cloud-sap-quote-to-cash-ownership/). The same split belongs in your [object ownership matrix](../salesforce-object-ownership-matrix/), so no partner builds a second path to SAP. Reading the order status back from SAP for dealers is covered in [Agentforce and SAP: order status through MuleSoft](../agentforce-sap-order-status-mulesoft/).

## What happens when SAP rejects the order?

Then the step becomes fallout. Trailhead defines fallout as an order that failed because of inadequate inventory, wrong information, a system error or another reason. You set a retry count. If the retries fail, the step moves to a queue where an operator resolves the problem and retries. Where a retry makes no sense, the operator can mark the step complete manually. The [design-time data model](https://developer.salesforce.com/docs/platform/data-models/guide/dro-design-time.html) has separate objects for fallout rules, jeopardy rules and task assignment rules, so this is configuration rather than custom code.

Typical rejections from SAP, as an assumption: the ship-to party does not exist in SAP yet, a material is blocked for sales, or the customer has a credit block. Retrying helps with none of them. The queue therefore needs an owner in order management, a target time and a short list of what to check. Without that, fallout becomes a list nobody reads while the customer waits.

## When is a plain integration without DRO enough?

DRO pays off when one order sets several things in motion in several places that depend on each other. A classic machine sale is often simpler: the order goes to SAP in one piece, and production, delivery and invoice all happen there. Then a record-triggered flow or a middleware call on activation is enough, with the same rules for reference, order number and error handling.

I would look at DRO when at least two of these apply:

- One order line becomes work in more than one system, such as SAP, service and a monitoring platform.
- Steps depend on each other, and someone has to see where an order is stuck.
- Commitments have deadlines that should be tracked per step.
- Orders mix one-off products and subscriptions that need different handling.

On cost, the [Revenue Cloud pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) lists Dynamic Revenue Orchestration as available for purchase with Revenue Cloud Advanced, which costs €200 per user and month at list price, marked "Freemium access available".

```hinweis offen
What the freemium access includes is not stated on the pricing page. Get it in writing before your design depends on it.
```

## First step: sketch your five most common order types

Take your five most common order types and sketch for each what happens after the signature: which system, which team, in which order. If every sketch ends in "SAP does the rest", start with a plain integration. If you see several systems and dependencies, model one order type in DRO first, including the callout to SAP and the fallout queue, and test the rejections before the happy path. The chapter [quote, contract, order](../../masterclass/revenue-cloud/quote-contract-order/) shows where this step sits in the whole process, and the integration design is part of my work in [Salesforce integration](../../services/salesforce-integration/).
