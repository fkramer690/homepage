---
title: "Penny Perfect Pricing: ERP prices in Salesforce?"
description: "Penny Perfect Pricing brings an SAP-style pricing engine into Manufacturing Cloud. When it fits telesales orders, and why the ERP usually stays price master."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: penny-perfect-pricing-erp-prices
translationKey: penny-perfect-pricing-erp-prices
topic: revenue
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Penny Perfect Pricing, SAP, pricing, telesales, Winter '27]
takeaways:
  - "Penny Perfect Pricing also exists in Automotive Cloud and Consumer Goods Cloud. Its 19 objects arrived with API 68.0 (Winter '27)."
  - "Its objects mirror the SAP condition technique, from calculation schema and search strategy to condition records with scales."
  - "In Manufacturing Cloud, it prices telesales orders; quotes belong to Revenue Cloud, and store prices belong to B2B Commerce, so it does not replace either."
  - "Before the first order, decide who owns the pricing rules, condition data, the order price and the invoice price."
faq:
  - q: "What is Penny Perfect Pricing in Salesforce?"
    a: "A pricing engine that calculates real-time prices for advanced order line items, for example in telesales. Salesforce lists it under Winter '27 for Manufacturing Cloud and documents it for Manufacturing, Automotive and Consumer Goods Cloud."
  - q: "Does Penny Perfect Pricing replace SAP pricing?"
    a: "It can reproduce supported ERP-style pricing patterns inside Salesforce, within documented limits such as 28 schema steps, and only if your custom SAP logic maps to them. Whether it should do so depends on whether you can keep condition records in sync. For most manufacturers with SAP, I would keep SAP as the price master."
  - q: "Is Penny Perfect Pricing included in the Manufacturing Cloud license?"
    a: "It requires the Enterprise or Unlimited Edition of Manufacturing Cloud, Automotive Cloud or Consumer Goods Cloud plus several add-ons that Salesforce Help lists, such as Core Pricing and the Manufacturing Foundation or Penny-Perfect Pricing add-on. Their prices are not public, so ask your account executive in writing."
  - q: "Can I use Penny Perfect Pricing for quotes or the B2B store?"
    a: "The documentation describes it for advanced order line items in the telesales ordering flow in Manufacturing Cloud. Quotes belong to Revenue Cloud, and store prices belong to B2B Commerce; both have their own pricing."
draft: false
---

For most manufacturers with SAP, the ERP should remain the price master, and Penny Perfect Pricing is worth a look only where orders are taken in Salesforce. With Winter '27, Penny Perfect Pricing was added to Manufacturing Cloud as a pricing engine for advanced order line items in the telesales ordering flow; it was already used in Consumer Goods Cloud. Its objects mirror the SAP condition technique, so it can calculate customer-specific prices without calling the ERP. Salesforce documents the add-ons and a CSV load process, but no SAP connector and no public price. Two price engines drift apart unless the roles are clear, so decide them first.

## What is Penny Perfect Pricing?

Salesforce introduces it in the [Winter '27 release highlights on Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-manfacturing-media-netzero-nonprofit) with one sentence: "Apply SAP-grade pricing precision across every manufacturing order, with multimarket, multi-unit of measure (UoM), calculation schema, and ERP integration built into Manufacturing Cloud." Winter '27 has been [generally available since 12 October 2026](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/). The name is not new: Penny Perfect Pricing was already used for orders in Consumer Goods Cloud. What is new is the use in Manufacturing Cloud and the shared object model from API 68.0.

The [developer guide](https://developer.salesforce.com/docs/industries/penny-perfect-pricing/guide/overview.html) is more concrete. Penny Perfect Pricing "provides accurate, real-time pricing for advanced order line items". Penny Perfect Pricing and the APIs it works with can:

- return instant prices for line items while an order is being built,
- calculate the final prices for an order,
- set up pricing data,
- place a complete order in a single request,
- flatten account hierarchies for reporting and analytics.

The guide covers 19 objects, all available from API version 68.0, and names Manufacturing Cloud, Automotive Cloud and Consumer Goods Cloud as the clouds that use them. The [Manufacturing Cloud developer guide](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_penny_perfect_pricing_dev.htm) has its own entry for it, right next to Advanced Orders for Telesales.

## In its structure it is close to SAP pricing

SAP calculates prices with the condition technique: according to [SAP Learning](https://learning.sap.com/courses/configuring-pricing-in-sap-s-4hana-sales), a pricing procedure lists the condition types, each condition type has an access sequence, and the access sequence searches condition tables for a valid condition record, including scales by quantity.

The [object reference](https://developer.salesforce.com/docs/industries/penny-perfect-pricing/references/penny-perfect-pricing-objects) of Penny Perfect Pricing reads like a translation of that model. Salesforce does not publish the mapping; the right column is my reading of the object descriptions:

| Penny Perfect Pricing object | Description in the reference | Closest SAP concept |
|---|---|---|
| Pricing Calculation Schema | ordered set of calculation steps | pricing procedure |
| Pricing Specification | "Pricing Condition Template", a type of pricing condition | condition type |
| Pricing Search Strategy | ordered steps for how the engine looks up conditions | access sequence |
| Pricing Key Type | combination of up to 10 key attributes | condition table key |
| External Pricing Key Value | "a resolved pricing condition record" | condition record |
| External Pricing Key Value Tier | volume or quantity tier | scale |

Alongside these are shared objects such as Account, Product2, account relations and internal organization units, which carry business unit specific settings per account.

The similarity cuts both ways. Someone who knows SAP pricing will recognize the logic. It also means similar configuration effort: every pricing rule, access sequence and condition record relevant to the Salesforce order channel needs a supported counterpart, and custom SAP routines or formulas must be addressed explicitly.

## Where does Penny Perfect Pricing fit, and where not?

In Manufacturing Cloud, the clearest documented use case is telesales. The [Advanced Orders for Telesales](https://developer.salesforce.com/docs/industries/advanced-orders-for-telesales/overview) APIs browse assortments and products, show previously ordered products, return valid delivery dates, get instant prices and place an order in one request. The [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/) lists a "unified telesales order view" under Winter '27. Penny Perfect Pricing is the price step in that flow.

It does not replace two other price engines:

- **Quotes** with configuration, approval and contract terms belong to Revenue Cloud. Penny Perfect Pricing prices order lines, not quotes.
- **Store prices** for dealers ordering online come from B2B Commerce's own pricing: price books, pricing strategies, a custom pricing provider such as a live ERP call, or Advanced Pricing powered by Revenue Cloud, as described in [customer prices in B2B Commerce](../b2b-commerce-customer-prices-price-books-erp/) and in the masterclass chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/).

Agents that build dealer quotes, such as the AI Partner Sales Assistant, have the same problem from the other side: if Salesforce holds only list prices, the agent quotes list prices. I describe that in [AI Partner Sales Assistant: dealer quotes with AI](../ai-partner-sales-assistant-dealer-quotes/).

## What is documented, and what is not?

When I first wrote this article on 28 October 2026, I found no licensing information and no load process. When I checked again on 9 November 2026, Salesforce Help documented both:

1. **Editions and add-ons.** Penny Perfect Pricing runs in the [Enterprise or Unlimited Edition](https://help.salesforce.com/s/articleView?id=xcloud.ppp_editions_permissions.htm&language=en_US&type=5) of Manufacturing Cloud, Automotive Cloud or Consumer Goods Cloud, plus [required add-ons](https://help.salesforce.com/s/articleView?id=xcloud.ppp_verify_addons.htm&language=en_US&type=5): Core Pricing Design Time, Core Pricing Run Time, Core Pricing Monthly Per Unit Entitlement, the Manufacturing Foundation or Penny-Perfect Pricing add-on, Industries Sales Excellence, Data Pipelines and Data Processing Engine. Permission set licenses and permission sets are required in addition. The [Manufacturing Cloud pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) shows no price for these add-ons.
2. **Loading condition records.** Salesforce [describes a load process](https://help.salesforce.com/s/articleView?id=xcloud.ppp_load_condition_data.htm&language=en_US&type=5): export the conditions from the ERP as CSV, import them with Data Loader into External Pricing Key Value and External Pricing Key Value Tier, then run the packaged Data Processing Engine job "External Pricing Key Value Consolidation". Orders can only be priced after that job has run successfully. Delta runs use the last sync date, and scheduling requires a flow. There is no SAP connector: extraction, mapping and monitoring remain integration work.
3. **Limits.** The [considerations](https://help.salesforce.com/s/articleView?id=xcloud.ppp_considerations.htm&language=en_US&type=5) name up to 1,000 lines per order, 40 million condition records per sales organization, 28 calculation schema steps, 7 account and 5 product hierarchy levels, and 2, 4 or 6 decimal places. It calculates net prices only, posts no ledger entries, creates no tax invoices and does not work with standard Commerce or Loyalty promotions in this release.
4. **Units, taxes and markets.** The [Manufacturing Cloud help](https://help.salesforce.com/s/articleView?id=ind.mfg_ppp_pointer.htm&language=en_US&type=5) mentions unit-of-measure conversion and primary and secondary taxes. I would test in a sandbox how several markets map to sales organizations before relying on it.

```hinweis offen
So the load process exists, but the SAP extraction and its monitoring are yours to build. Ask for the price of the add-ons in writing, and check the limits against your largest orders and your condition volume before a project plan depends on them.
```

## Two price engines drift apart because conditions change

Condition records change all the time. Pricing teams add customer discounts, end promotions and update scales in SAP every week. If Salesforce calculates with copies, every change has to arrive before the next order is priced. Typical gaps:

- **Timing.** A condition changes in SAP at ten in the morning, the copy arrives overnight, and the telesales rep quotes yesterday's price all day.
- **New condition types.** Finance adds a surcharge in SAP. Nobody adds the matching pricing specification to the calculation schema in Salesforce.
- **Rounding.** "Penny perfect" depends on identical rounding per step. A single difference in the calculation order can make order and invoice prices differ by a few cents per line, which customers notice on large orders.
- **Which price wins.** When the order reaches SAP, does SAP take the Salesforce price as given or determine its own? If both calculate, the customer can get an order confirmation with one price and an invoice with another.

These gaps are manageable once four roles are defined before any rep relies on a Salesforce price: who owns the pricing rules, who owns the condition data, which system calculates the order price and which one decides the invoice price, plus a rule for disagreements. SAP can remain the master for rules and data while Salesforce calculates the order price from copies.

## Worked example: a telesales desk for spare parts

Assume a machine builder has a telesales desk of ten people who take spare parts orders by phone. It has 30,000 spare parts, 2,500 customers and prices from SAP with four condition types: list price, customer discount, a small quantity surcharge and quantity scales. Orders should be entered in Salesforce, where the rep also sees the customer's installed base and open cases.

**Option A: SAP stays price master.** Salesforce calls SAP for the price of each line while the order is built, through an API like the one in [order status from SAP via MuleSoft](../agentforce-sap-order-status-mulesoft/). Salesforce shows SAP's current price, and the order and invoice match as long as SAP prices the order with the same partners, date and quantities. The cost is a dependency: if SAP is in a maintenance window, the desk cannot price orders.

**Option B: Penny Perfect Pricing calculates.** The four condition types are rebuilt as pricing specifications, and the condition records for 2,500 customers are copied to External Pricing Key Values, with a delta load and a consolidation run several times a day. The limits of 1,000 lines per order and 28 schema steps are no issue here, but they should still be checked. Prices are returned instantly without calling SAP. The cost is the sync and one more pricing configuration that someone has to own.

I would choose A when SAP responds quickly and is reliably available. I would look at B when the pricing logic is stable, condition changes are rare and the desk must keep working when SAP does not respond. Either way, SAP should decide the final invoice price, and the interface should flag any order where the two prices differ.

## Count condition types and fix the price master

1. **Count your condition types** and how often condition records change per week.
2. **Write down the four roles**: who owns pricing rules and condition data, which system calculates the order price and which one decides the invoice price, and which price wins when Salesforce and SAP disagree.
3. **Ask Salesforce in writing** what the required add-ons cost for your edition, and check the documented limits against your largest orders and your condition volume.
4. **Plan the data flows** together with the rest of the SAP interface, as in [Manufacturing Cloud and SAP: which data flows where](../manufacturing-cloud-sap-integration-data-flows/).
5. **Test with real orders**: 200 historical orders priced in both systems, compared line by line.

The full chapter on ERP integration, agents and rollout is [ERP, AI and rollout](../../masterclass/manufacturing-cloud/erp-ai-and-rollout/) in the Manufacturing Cloud masterclass. Drawing the line between ERP and Salesforce is part of my [architecture work](../../services/salesforce-architecture/).
