---
title: "Agentforce for distributor stock and replenishment"
description: "Can Agentforce check distributor stock and trigger replenishment orders? What the manufacturing templates do and why the ERP keeps ATP, prices and credit."
pubDate: 2026-10-27
lang: en
slug: distributor-inventory-replenishment-agentforce
translationKey: distributor-replenishment-agent
topic: data
categories: [manufacturing-cloud, ai]
tags: [agentforce, manufacturing cloud, distributors, inventory, sap, erp]
takeaways:
  - "Agentforce for Manufacturing can summarise inventory and create replenishment requests; Salesforce announced the inventory template in August 2025 and lists distributor procurement automation for Summer '26."
  - "Distributor stock, min/max policies and the replenishment proposal can live in Salesforce; availability, prices, credit limits and the order itself stay in SAP or proALPHA."
  - "By default, a replenishment request in Manufacturing Cloud is a Product Request record in Salesforce; it becomes a binding order only once the ERP has accepted it and returned an order number."
  - "Every write action needs gates set by code: credit status from the ERP, a quantity cap, confirmation by the distributor and a duplicate check before the order is sent."
  - "Start read-only with stock summaries and proposals, and let the agent create orders only after the ERP simulation path works and is tested."
faq:
  - q: "Can Agentforce place replenishment orders for distributors automatically?"
    a: "Technically yes: the Manufacturing inventory template includes an action that creates a product request, and Salesforce lists distributor procurement automation for Summer '26. I would let the agent propose and prepare orders, and let the ERP accept them after checking availability, price and credit."
  - q: "Which data must stay in SAP or proALPHA?"
    a: "Available-to-promise and confirmed dates, prices and conditions, credit limits and blocks, and the sales order itself. Salesforce can hold distributor stock reports, min/max policies and the replenishment proposal."
  - q: "How current is the stock the agent sees?"
    a: "Only as current as the last update. Distributor stock usually reaches Salesforce through a portal upload, EDI or an integration, so the agent should show the date of the last report and ask the distributor to confirm quantities before ordering."
  - q: "Do I need Manufacturing Cloud for an inventory agent?"
    a: "Salesforce Help lists the inventory subagent for Enterprise, Performance and Unlimited Editions with the Agentforce for Manufacturing add-on per user, or Agentforce 1 Manufacturing Edition. The inventory objects belong to Manufacturing Cloud. The Max editions include the full suite of Agentforce for Industries; the Core editions include Flex Credits."
draft: false
---

Agentforce can check distributor stock and trigger replenishment, but it should not decide whether the goods are available, at what price, or whether the distributor's credit allows the order. Salesforce's inventory template for Agentforce for Manufacturing searches inventory and creates replenishment requests, and Salesforce lists distributor procurement automation for Summer '26. Availability, prices, credit limits and the order itself stay in SAP or proALPHA. The agent proposes and prepares, the ERP confirms. I would start read-only and add write actions only behind gates that code sets, never the model.

## What does Agentforce for Manufacturing offer for distributor inventory?

When Salesforce [announced Agentforce for Manufacturing](https://www.salesforce.com/news/stories/agentforce-for-manufacturing-announcement/) on 21 August 2025, it described the inventory management template in two sentences: employees can "quickly search for inventory", and "Agentforce can also automatically request inventory to be replenished across distributor locations based on customer needs." The inventory template was listed as available that day; according to the announcement, Agentforce for Manufacturing is built on Data Cloud and the Atlas Reasoning Engine and brings agents to Manufacturing Cloud and Field Service. The [Trailhead unit on Agentforce Manufacturing](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) is more careful and speaks of "replenishment recommendations".

The Salesforce Help page for the [Inventory Management subagent](https://help.salesforce.com/s/articleView?language=en_US&id=ind.mfg_gen_ai_agentforce_inventory_management_topic.htm&type=5) lists three actions: Get Search Criteria and Results, Create Product Request and Summarize Inventory Details. It requires the Agentforce for Manufacturing add-on for each user, or Agentforce 1 Manufacturing Edition. The public pages say little about inputs and outputs, so the exact behaviour is something to check in a sandbox.

For Summer '26, the [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/) promises to "automate distributor procurement to reduce manual effort and cost". The Manufacturing Cloud developer guide documents a [PurchaseOrder](https://developer.salesforce.com/docs/atlas.en-us.264.0.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_purchaseorder.htm) object with a usage type value `DistributorManagement`, and a [GoodsReceivedNote](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_goodsreceivednote.htm) object that confirms the delivery of goods against a purchase order, both from API version 65.0. My reading is that this is the data model behind the product page sentence, but Salesforce does not connect the two explicitly, and I found no Help page that describes the distributor procurement feature.

```hinweis offen
Salesforce's own [manufacturing AI page](https://www.salesforce.com/manufacturing/artificial-intelligence/) adds that its prebuilt capabilities "may not reflect actual product details". So I would ask the partner to show the template in your sandbox, with your data, before anyone plans with it.
```

## Which stock data lives in Salesforce?

Manufacturing Cloud uses the inventory objects known from Field Service. A [ProductItem](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_productitem.htm) is one product at one location, with quantity on hand, available, allocated, ordered from suppliers and in transit. A distributor warehouse can be such a location.

Replenishment rules sit in [InventoryReplenishmentPolicy](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_inventoryreplenishmentpolicy.htm), available from API version 63.0. A policy holds a minimum and a maximum quantity for a product or product category at a location, a source location and a formula for the quantity; the documented example is maximum minus quantity on hand. The default action is a Product Request. According to the [help article on inventory replenishment](https://help.salesforce.com/s/articleView?id=ind.mfg_inventory_replenishment.htm&language=en_US&type=5), an automated process runs periodically, finds items below their threshold and carries out the replenishment action.

Two consequences for a decision maker:

- **A Product Request is a Salesforce record.** It does not reserve stock in SAP and does not create a sales order. Something has to turn it into an ERP order, and that integration is your project, not part of the template. If dealers should place reorders themselves in a B2B store instead, see [reorders in B2B Commerce](../b2b-commerce-reorder-order-templates/).
- **The stock is a copy.** Distributors report their stock through a portal upload, EDI or an interface. If they report weekly, the agent works with figures up to seven days old and should say so.

## Where must SAP or proALPHA stay the system of record?

Wherever a figure has one right answer that the ERP calculates. For a machine builder selling through distributors I would split it like this:

| Data | System of record | What the agent does |
|---|---|---|
| Distributor stock as reported | Salesforce | reads and summarises it |
| Min/max per distributor location | Salesforce, owned by sales ops | proposes a quantity |
| Availability and confirmed date (ATP) | SAP or proALPHA | passes on what the ERP returns |
| Prices, discounts, surcharges | SAP or proALPHA | shows the ERP price, never a portal list price |
| Credit limit and blocks | SAP or proALPHA | stops and hands over |
| The order itself | SAP or proALPHA | reports the ERP order number |

The order status side of this, how an agent reads SAP through MuleSoft, is covered in [Agentforce and SAP: order status through MuleSoft](../agentforce-sap-order-status-mulesoft/). Replenishment adds the write direction. The API therefore needs a simulation call that returns price, availability and credit status without creating anything, and a separate create call. If your ERP has no such interface, read [legacy ERP without an API](../legacy-erp-without-api-ai-agents/) first.

Who owns each row is a governance question as much as a technical one. If sales ops maintains min/max in Salesforce and supply chain maintains safety stock in SAP, both must agree on which wins, the same discipline as in the [object ownership matrix](../salesforce-object-ownership-matrix/).

## How should write actions be gated?

The Salesforce Architects guide on [hybrid reasoning with Agent Script](https://architect.salesforce.com/docs/architect/fundamentals/guide/hybrid-reasoning-agentforce-builder-agent-script) gives the rule: "if you can express a decision as code, it should be written as logic." An action whose `available when` condition is false is removed from the model's tool list, and the guide warns that relying on the LLM to set the gate variable reintroduces the variability the gate was meant to prevent.

For a replenishment order I would put four gates in code:

1. **Credit status from the ERP.** The simulation call sets a variable; with a block, the create action is invisible to the model.
2. **A quantity cap.** Orders above, say, the policy maximum or a value limit go to inside sales for approval instead of straight to the ERP.
3. **Confirmation by the distributor.** The agent shows positions, ERP prices and confirmed dates, and the distributor approves explicitly.
4. **A duplicate check.** Agents retry. Each proposal carries a unique reference, and the ERP interface rejects a second order with the same reference.

How these building blocks work is in [Agent Script: why business rules don't belong in the LLM](../agent-script-deterministic-rules/). What the simulation and create calls cost in consumption is estimated in [Flex Credits per action](../flex-credits-agentforce-cost-per-action/).

## A typical scenario: replenishment for 120 distributors

Assume a manufacturer of compressed air components with SAP S/4HANA, 120 distributors in Germany, Austria and the Benelux, and a distributor portal on Experience Cloud. All numbers here are assumptions.

Assume each distributor uploads stock for 300 fast-moving spare parts every Monday. With one min/max policy per part and distributor location, that is 36,000 policy records. Nobody maintains 36,000 records by hand, so the minimum should come from consumption history or from [account forecasting](../account-forecasting-sales-volume-planning/), and sales ops only maintains exceptions.

On Monday night the periodic process finds 40 parts below minimum at one distributor and creates product requests. On Tuesday the distributor opens the portal, and the agent summarises the proposal, says the stock figures date from Monday, and asks whether quantities are still right. The distributor removes two items. The agent then calls the SAP simulation. Prices come back from SAP, not from the portal list. Three items have no confirmed date yet, and the agent says exactly that. The distributor confirms, the create call returns an SAP order number, and the agent reports it.

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

## Where should you start?

1. **Write down the system of record** for every row of the table above, signed off by sales and supply chain.
2. **Get distributor stock in reliably.** Agree on frequency and format, and show the report date everywhere the stock appears.
3. **Go read-only first.** Stock summaries and replenishment proposals, with orders still entered the usual way.
4. **Build the ERP simulation call** before the create call, and test the unhappy paths: credit block, missing confirmed date, price changes, SAP offline.
5. **Add the four gates** and an approval threshold, then let the agent create orders.
6. **Check licences early.** On the Manufacturing Cloud pricing page, the Core editions (US list price 275 USD per user and month) list Flex Credits for AI and Agentforce, and the Max editions (from 650 USD) include the full suite of Agentforce for Industries. Have the partner demonstrate the Summer '26 distributor procurement features in your sandbox.

The interface design between Salesforce and the ERP is the larger part of this work; it is what I cover under [Salesforce integration](../../services/salesforce-integration/). The wider picture of agents in manufacturing is in the masterclass chapter [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/).

A replenishment agent pays off when Salesforce owns the proposal and the ERP owns every figure with a right answer. If you want a second opinion on that split for your distributor network, [send me a message](#contact).
