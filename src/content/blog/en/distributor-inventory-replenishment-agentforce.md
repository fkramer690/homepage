---
title: "Agentforce for distributor stock and replenishment"
metaTitle: "Can Agentforce check distributor stock and reorder?"
description: "Yes, Agentforce can check distributor stock and prepare replenishment, but availability, price and credit stay in SAP. What the manufacturing templates do."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: distributor-inventory-replenishment-agentforce
translationKey: distributor-replenishment-agent
topic: data
categories: [manufacturing-cloud, ai]
tags: [agentforce, manufacturing cloud, distributors, inventory, sap, erp]
takeaways:
  - "The inventory subagent searches stock and creates Product Requests. Distributor purchase orders are a separate Summer '26 feature with its own workflow."
  - "No standard action turns a Product Request into a purchase order or an ERP order. That bridge is your integration project."
  - "Code sets four gates, not the model, and the write API checks them again: credit status, a quantity cap, distributor approval and a duplicate check."
  - "I start read-only and let the agent create orders only once the ERP simulation call has been tested."
faq:
  - q: "Can Agentforce place replenishment orders for distributors automatically?"
    a: "Not out of the box. The documented inventory subagent creates Product Requests, not purchase orders. Since Summer '26, Salesforce documents a separate distributor purchase order workflow with approval and ERP handoff. Connecting the two is custom work. I would let the agent propose and prepare orders, and let the ERP accept them after checking availability, price and credit."
  - q: "Which data must stay in SAP or proALPHA?"
    a: "That is an architecture decision, not a product rule. I would keep available-to-promise and confirmed dates, customer conditions, credit limits and blocks, the sales order and the invoice in the ERP. Salesforce can hold distributor stock, min/max policies, the replenishment proposal and, with the Summer '26 workflow, the distributor purchase order."
  - q: "How current is the stock the agent sees?"
    a: "If the stock comes from an external system, only as current as the last successful update, so the agent should show that date and ask the distributor to confirm quantities before ordering. If distributors book goods receipts directly in Salesforce, it can be the operational inventory record."
  - q: "Do I need Manufacturing Cloud for an inventory agent?"
    a: "Salesforce Help lists the inventory subagent for Enterprise, Performance and Unlimited Editions with the Agentforce for Manufacturing add-on per user, or Agentforce 1 Manufacturing Edition. The inventory data model and replenishment policies are not exclusive to Manufacturing Cloud; the prebuilt subagent is. The current pricing page positions the Max editions with the Agentforce for Industries suite, so confirm the exact entitlement on the order form."
draft: false
---

Agentforce can check distributor stock and prepare replenishment, but it should not decide whether the goods are available, at what price, or whether the distributor's credit allows the order. Salesforce's inventory subagent for Agentforce for Manufacturing searches inventory and creates Product Requests, and since Summer '26 a separate workflow handles distributor purchase orders. In my target architecture, availability, customer conditions, credit limits and the sales order stay in SAP or proALPHA. The agent proposes and prepares, the ERP confirms. I would start read-only and add write actions only behind gates that code sets, never the model.

## What does Agentforce for Manufacturing offer for distributor inventory?

When Salesforce [announced Agentforce for Manufacturing](https://www.salesforce.com/news/stories/agentforce-for-manufacturing-announcement/) on August 21, 2025, it described the inventory management template in two sentences: employees can "quickly search for inventory", and "Agentforce can also automatically request inventory to be replenished across distributor locations based on customer needs." The inventory template was listed as available that day; according to the announcement, Agentforce for Manufacturing is built on Data Cloud (now Data 360) and the Atlas Reasoning Engine and brings agents to Manufacturing Cloud, which Salesforce Help now calls Agentforce Manufacturing, and Field Service. The [Trailhead unit on Agentforce Manufacturing](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) is more careful and speaks of "replenishment recommendations".

The Salesforce Help page for the [Inventory Management subagent](https://help.salesforce.com/s/articleView?language=en_US&id=ind.mfg_gen_ai_agentforce_inventory_management_topic.htm&type=5) lists three actions: Get Search Criteria and Results, Create Product Request and Summarize Inventory Details. It requires the Agentforce for Manufacturing add-on for each user, or Agentforce 1 Manufacturing Edition. The public pages say little about inputs and outputs, so the exact behavior is something to check in a sandbox.

With Summer '26, Salesforce introduced distributor purchase order management, and Help describes the [workflow](https://help.salesforce.com/s/articleView?id=ind.mfg_distributor_purchase_order_management_workflow.htm&language=en_US&type=5): the distributor creates a purchase order in a partner Experience Cloud site and submits it, unit prices come from the selected active price book, a sales manager checks quantities against value limits and stock and approves it, and approval triggers the integration that creates the sales order and invoice in the ERP. On delivery, a goods received note records the quantities, and "Update Inventory" raises the stock at the warehouse location. It needs purchase order management, account relationships and the matching partner permissions, so it is configuration work, not a switch. The developer guide documents a [PurchaseOrder](https://developer.salesforce.com/docs/atlas.en-us.264.0.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_purchaseorder.htm) object with a usage type value `DistributorManagement`, and a [GoodsReceivedNote](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_goodsreceivednote.htm) object that confirms the delivery of goods against a purchase order, both from API version 65.0. Note what the two features do not do: the inventory subagent has no action that creates a purchase order, and Salesforce documents no standard conversion from a Product Request to a purchase order.

```hinweis offen
Salesforce's own [manufacturing AI page](https://www.salesforce.com/manufacturing/artificial-intelligence/) adds that its prebuilt capabilities "may not reflect actual product details". So I would ask the partner to show the template in your sandbox, with your data, before anyone plans with it.
```

## Distributor stock and replenishment rules live in Salesforce

Manufacturing Cloud uses the inventory objects known from Field Service. A [ProductItem](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_productitem.htm) is one product at one location, with quantity on hand, available, allocated, ordered from suppliers and in transit. A distributor warehouse can be such a location.

Replenishment rules sit in [InventoryReplenishmentPolicy](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_inventoryreplenishmentpolicy.htm), available from API version 63.0. A policy holds a minimum and a maximum quantity for a product or product category at a location, a source location and a formula for the quantity; the documented example is maximum minus quantity on hand. The default action is a Product Request. According to the [help article on inventory replenishment](https://help.salesforce.com/s/articleView?id=ind.mfg_inventory_replenishment.htm&language=en_US&type=5), an automated process runs periodically, finds items below their threshold and carries out the replenishment action.

Two consequences for a decision maker:

- **A Product Request is a Salesforce record.** It does not reserve stock in SAP and does not create a sales order or a purchase order. Something has to turn it into an order, and that integration is your project, not part of the template. If dealers should place reorders themselves in a B2B store instead, see [reorders in B2B Commerce](../b2b-commerce-reorder-order-templates/).
- **Externally reported stock is a copy.** If distributors report stock through a portal upload, EDI or an interface weekly, the agent works with figures up to seven days old and should say so, together with the status of the last successful import. If distributors book goods receipts in Salesforce, it can be the operational record instead.

## Where must SAP or proALPHA stay the system of record?

Wherever a figure has one right answer that the ERP calculates. This is an architecture decision, not a Salesforce rule. For a machine builder selling through distributors I would split it like this:

| Data | System of record | What the agent does |
|---|---|---|
| Distributor stock as reported | Salesforce | reads and summarizes it |
| Min/max per distributor location | Salesforce, owned by sales ops | proposes a quantity |
| Availability and confirmed date (ATP) | SAP or proALPHA | passes on what the ERP returns |
| Customer prices, discounts, surcharges | SAP or proALPHA | shows the ERP price; a price book price only where it is the agreed price |
| Credit limit and blocks | SAP or proALPHA | stops and hands over |
| Replenishment proposal (Product Request) | Salesforce | prepares it |
| Distributor purchase order | Salesforce or ERP, depending on the target design | prepares it for approval |
| Sales order and invoice | SAP or proALPHA | reports the ERP order number |

The order status side of this, how an agent reads SAP through MuleSoft, is covered in [Agentforce and SAP: order status through MuleSoft](../agentforce-sap-order-status-mulesoft/). Replenishment adds the write direction. The API therefore needs a simulation call that returns price, availability and credit status without creating anything, and a separate create call. If your ERP has no such interface, read [legacy ERP without an API](../legacy-erp-without-api-ai-agents/) first.

Who owns each row is a governance question as much as a technical one. If sales ops maintains min/max in Salesforce and supply chain maintains safety stock in SAP, both must agree on which wins, the same discipline as in the [object ownership matrix](../salesforce-object-ownership-matrix/).

## Write actions need gates set in code

The Salesforce Architects guide on [hybrid reasoning with Agent Script](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) gives the rule: "if you can express a decision as code, it should be written as logic." An action whose `available when` condition is false is removed from the model's tool list, and the guide warns that relying on the LLM to set the gate variable reintroduces the variability the gate was meant to prevent.

For a replenishment order I would put four gates in code:

1. **Credit status from the ERP.** The simulation call sets a variable; with a block, the create action is invisible to the model. That only stops this agent: the create API checks credit again when it commits.
2. **A quantity cap.** Orders above, say, the policy maximum or a value limit go to inside sales for approval instead of straight to the ERP.
3. **Confirmation by the distributor.** The agent shows positions, ERP prices and confirmed dates, and the distributor approves explicitly.
4. **A duplicate check.** Timeouts, repeated user input or middleware can send the same request twice. Each proposal carries a unique reference, and the ERP interface rejects a second order with the same reference.

How these building blocks work is in [Agent Script: why business rules don't belong in the LLM](../agent-script-deterministic-rules/). What the simulation and create calls cost in consumption is estimated in [Flex Credits per action](../flex-credits-agentforce-cost-per-action/).

## Worked example: replenishment for 120 distributors

Assume a manufacturer of compressed air components with SAP S/4HANA, 120 distributors in Germany, Austria and the Benelux, and a distributor portal on Experience Cloud. All numbers here are assumptions.

Assume each distributor uploads stock for 300 fast-moving spare parts every Monday. With one min/max policy per part and distributor location, the most granular design, that is 36,000 policy records; policies per product category or shared across locations reduce the number. Nobody maintains 36,000 records by hand, so the minimum should come from consumption history or from [account forecasting](../account-forecasting-sales-volume-planning/), and sales ops only maintains exceptions.

On Monday night the periodic process finds 40 parts below minimum at one distributor and creates product requests. On Tuesday the distributor opens the portal, and the agent summarizes the proposal, says the stock figures date from Monday, and asks whether quantities are still right. The distributor removes two items. The agent then calls the SAP simulation. Prices come back from SAP, because in this example SAP holds the customer conditions. Three items have no confirmed date yet, and the agent says exactly that. The distributor confirms, the create call returns an SAP order number, and the agent reports it.

```ablauf
sf: Distributor stock, Product Request, Agent in portal
erp: SAP simulation, SAP order
ext: Credit management
Distributor stock --below minimum--> Product Request
Product Request --> Agent in portal
Agent in portal --> SAP simulation
SAP simulation ..price and date..> Agent in portal
Agent in portal --after approval--> SAP order
SAP order ..order number..> Agent in portal
Agent in portal --on credit block--> Credit management
```

Now assume the same distributor is over its credit limit. The simulation returns a block, the create action stays hidden, and the agent hands the conversation to credit management with the proposal attached. It does not explain the credit situation itself; what a distributor is told about a block is a business decision that belongs in the API response.

What I would expect to surface in such a pilot is data, not AI: distributors who do not upload on time, parts mapped to the wrong material number, and min/max values nobody has reviewed in years. Upload files are also untrusted input, a risk described in [prompt injection through dealer portals](../prompt-injection-dealer-portals-agentforce/).

## Name the system of record for every data row

1. **Write down the system of record** for every row of the table above, signed off by sales and supply chain.
2. **Get distributor stock in reliably.** Agree on frequency and format, and show the report date everywhere the stock appears.
3. **Go read-only first.** Stock summaries and replenishment proposals, with orders still entered the usual way.
4. **Build the ERP simulation call** before the create call, and test the unhappy paths: credit block, missing confirmed date, price changes, SAP offline.
5. **Add the four gates** and an approval threshold, then let the agent create orders.
6. **Check licenses early.** As of November 9, 2026, the US pricing page lists the Core editions at $275 per user and month and the Max editions at $650 ($700 for Sales & Service Max), billed annually; Max includes the Agentforce for Industries suite. The Help page of the inventory subagent still names the Agentforce for Manufacturing add-on or Agentforce 1 Manufacturing Edition, so confirm the entitlement on the order form. Have the partner demonstrate the Summer '26 distributor purchase order workflow in your sandbox.

The interface design between Salesforce and the ERP is the larger part of this work; it is what I cover under [Salesforce integration](../../services/salesforce-integration/). The wider picture of agents in manufacturing is in the masterclass chapter [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/).
