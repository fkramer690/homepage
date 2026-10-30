---
title: "Penny Perfect Pricing: ERP prices in Salesforce?"
description: "Penny Perfect Pricing brings an SAP-style pricing engine into Manufacturing Cloud. When it fits telesales orders, and why the ERP usually stays price master."
pubDate: 2026-10-28
lang: en
slug: penny-perfect-pricing-erp-prices
translationKey: penny-perfect-pricing-erp-prices
topic: revenue
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Penny Perfect Pricing, SAP, pricing, telesales, Winter '27]
takeaways:
  - "Penny Perfect Pricing is a pricing engine for advanced order line items in Manufacturing Cloud, Automotive Cloud and Consumer Goods Cloud; its 19 objects are available from API version 68.0 (Winter '27)."
  - "Its objects mirror the SAP condition technique: calculation schema, pricing specifications, search strategies, key types and pricing condition records with volume tiers."
  - "It prices telesales orders; quotes belong to Revenue Cloud and store prices to B2B Commerce, so it does not replace either."
  - "The developer documentation names no licence and no standard way to load condition records from SAP; ask Salesforce in writing before you plan with it."
  - "Two price engines drift apart. Decide one price master and which price wins when Salesforce and SAP disagree, before the first order is priced."
faq:
  - q: "What is Penny Perfect Pricing in Salesforce?"
    a: "A pricing engine that calculates real-time prices for advanced order line items, for example in telesales. Salesforce lists it under Winter '27 for Manufacturing Cloud and documents it for Manufacturing, Automotive and Consumer Goods Cloud."
  - q: "Does Penny Perfect Pricing replace SAP pricing?"
    a: "Technically it can calculate prices with the same logic inside Salesforce. Whether it should depends on whether you can keep condition records in sync. For most manufacturers with SAP I would keep SAP as price master."
  - q: "Is Penny Perfect Pricing included in the Manufacturing Cloud licence?"
    a: "I could not find that in any official source on 28 October 2026. The pricing page does not mention it, and the developer documentation has no licence or permission set information. Ask your account executive in writing."
  - q: "Can I use Penny Perfect Pricing for quotes or the B2B store?"
    a: "The documentation describes it for advanced order line items, the telesales ordering flow. Quotes belong to Revenue Cloud and store prices to B2B Commerce, which have their own pricing."
draft: false
---

For most manufacturers with SAP, the ERP should stay price master, and Penny Perfect Pricing is worth a look only where orders are taken in Salesforce. Penny Perfect Pricing arrived with Winter '27 as a pricing engine for advanced order line items, the telesales ordering flow in Manufacturing Cloud. Its objects mirror the SAP condition technique, so it can calculate customer-specific prices without calling the ERP. The developer documentation names no licence and no standard way to load SAP condition records. Two price engines drift apart unless one is the master, so decide that first and get the licence question answered in writing.

## What is Penny Perfect Pricing?

Salesforce introduces it in the [Winter '27 release highlights on Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-manfacturing-media-netzero-nonprofit) with one sentence: "Apply SAP-grade pricing precision across every manufacturing order, with multimarket, multi-unit of measure (UoM), calculation schema, and ERP integration built into Manufacturing Cloud." Winter '27 has been [generally available since 12 October 2026](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/).

The [developer guide](https://developer.salesforce.com/docs/industries/penny-perfect-pricing/guide/overview.html) is more concrete. Penny Perfect Pricing "provides accurate, real-time pricing for advanced order line items". The REST APIs can:

- return instant prices for line items while an order is being built,
- calculate the final prices for an order,
- set up pricing data,
- place a complete order in a single request,
- flatten account hierarchies for reporting and analytics.

The guide covers 19 objects, all available from API version 68.0, and names Manufacturing Cloud, Automotive Cloud and Consumer Goods Cloud as the clouds that use them. The [Manufacturing Cloud developer guide](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_penny_perfect_pricing_dev.htm) has its own entry for it, right next to Advanced Orders for Telesales.

## How close is it to SAP pricing?

Very close in its structure. SAP calculates prices with the condition technique: according to [SAP Learning](https://learning.sap.com/courses/configuring-pricing-in-sap-s-4hana-sales), a pricing procedure lists the condition types, each condition type has an access sequence, and the access sequence searches condition tables for a valid condition record, including scales by quantity.

The [object reference](https://developer.salesforce.com/docs/industries/penny-perfect-pricing/references/penny-perfect-pricing-objects) of Penny Perfect Pricing reads like a translation of that model. Salesforce does not publish the mapping; the right column is my reading of the object descriptions:

| Penny Perfect Pricing object | Description in the reference | Closest SAP concept |
|---|---|---|
| Pricing Calculation Schema | ordered set of calculation steps | pricing procedure |
| Pricing Specification | "Pricing Condition Template", a type of pricing condition | condition type |
| Pricing Search Strategy | ordered steps for how the engine looks up conditions | access sequence |
| Pricing Key Type | combination of up to 10 key attributes | condition table key |
| External Pricing Key Value | "a resolved pricing condition record" | condition record |
| External Pricing Key Value Tier | volume or quantity tier | scale |

Next to these come shared objects such as Account, Product2, account relations and internal organisation units, which carry business unit specific settings per account.

The similarity cuts both ways. Someone who knows SAP pricing will recognise the logic. It also means the same configuration effort: every condition type, every access and every condition record that SAP has would need a counterpart in Salesforce.

## Where does Penny Perfect Pricing fit, and where not?

It fits telesales. The [Advanced Orders for Telesales](https://developer.salesforce.com/docs/industries/advanced-orders-for-telesales/overview) APIs browse assortments and products, show previously ordered products, return valid delivery dates, get instant prices and place an order in one request. The [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/) lists a "unified telesales order view" under Winter '27. Penny Perfect Pricing is the price step in that flow.

It does not replace two other price engines:

- **Quotes** with configuration, approval and contract terms belong to Revenue Cloud. Penny Perfect Pricing prices order lines, not quotes.
- **Store prices** for dealers ordering online come from B2B Commerce price books or a live ERP call, as described in [customer prices in B2B Commerce](../b2b-commerce-customer-prices-price-books-erp/) and in the masterclass chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/).

Agents that build dealer quotes, such as the AI Partner Sales Assistant, have the same problem from the other side: if Salesforce holds only list prices, the agent quotes list prices. I describe that in [AI Partner Sales Assistant: dealer quotes with AI](../ai-partner-sales-assistant-dealer-quotes/).

## What is not documented?

Three things I could not find in any official source on 28 October 2026:

1. **Licence.** The [Manufacturing Cloud pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) does not mention Penny Perfect Pricing, and the developer pages have no licence or permission set information.
2. **Loading condition records from SAP.** The highlights promise "ERP integration", but the developer guide describes no import or sync of SAP condition records. The [Consumer Goods Trailhead module](https://trailhead.salesforce.com/content/learn/modules/penny-perfect-pricing-with-consumer-goods-cloud-offline-mobile-app/set-up-pricing-configuration) says pricing conditions from the ERP can be used and mentions an import of condition records, without describing how.
3. **Multimarket and units of measure.** The highlights name both. The object reference I read does not explain how currencies or unit conversion are configured.

```hinweis offen
So the ERP integration is yours to build, and the licence is yours to ask about. Both belong in writing before a project plan depends on them.
```

## Why do two price engines drift apart?

Because condition records change all the time. Pricing teams add customer discounts, end promotions and update scales in SAP every week. If Salesforce calculates with copies, every change has to arrive before the next order is priced. Typical gaps:

- **Timing.** A condition changes in SAP at ten in the morning, the copy arrives overnight, and the telesales rep quotes yesterday's price all day.
- **New condition types.** Finance adds a surcharge in SAP. Nobody adds the matching pricing specification to the calculation schema in Salesforce.
- **Rounding.** "Penny perfect" depends on identical rounding per step. One difference in the calculation order and invoice and order differ by a few cents per line, which customers notice on large orders.
- **Which price wins.** When the order reaches SAP, does SAP take the Salesforce price as given or determine its own? If both calculate, the customer can get an order confirmation with one price and an invoice with another.

These gaps are manageable once one price master and a rule for disagreements are set, before any rep relies on a Salesforce price.

## A typical scenario: a telesales desk for spare parts

A typical scenario, as an assumption: a machine builder with a telesales desk of ten people takes spare parts orders by phone. 30,000 spare parts, 2,500 customers, prices from SAP with four condition types: list price, customer discount, a small quantity surcharge and quantity scales. Orders should be entered in Salesforce, where the rep also sees the customer's installed base and open cases.

**Option A: SAP stays price master.** Salesforce calls SAP for the price of each line while the order is built, through an API like the one in [order status from SAP via MuleSoft](../agentforce-sap-order-status-mulesoft/). Prices are always identical. The cost is a dependency: if SAP is in a maintenance window, the desk cannot price orders.

**Option B: Penny Perfect Pricing calculates.** The four condition types are rebuilt as pricing specifications, and the condition records for 2,500 customers are copied to External Pricing Key Values, with a delta run several times a day. Prices come instantly without SAP. The cost is the sync and one more pricing configuration that someone owns.

I would choose A when SAP answers fast and is reliably available, which is the more common case. I would look at B when the pricing logic is stable, condition changes are rare and the desk must keep working when SAP does not answer. Either way, SAP should decide the final invoice price, and the interface should flag any order where the two prices differ.

## Where should you start?

1. **Count your condition types** and how often condition records change per week.
2. **Write down the price master** and which price wins when Salesforce and SAP disagree.
3. **Ask Salesforce in writing**: which licence includes Penny Perfect Pricing, and is there a supported way to load SAP condition records?
4. **Plan the data flows** together with the rest of the SAP interface, as in [Manufacturing Cloud and SAP: which data flows where](../manufacturing-cloud-sap-integration-data-flows/).
5. **Test with real orders**: 200 historical orders priced in both systems, compared line by line.

The full chapter on ERP integration, agents and rollout is [ERP, AI and rollout](../../masterclass/manufacturing-cloud/erp-ai-and-rollout/) in the Manufacturing Cloud masterclass, and drawing the line between ERP and Salesforce is part of my [architecture work](../../services/salesforce-architecture/).

Penny Perfect Pricing brings SAP-style pricing into Salesforce, but one system still has to own the price.
