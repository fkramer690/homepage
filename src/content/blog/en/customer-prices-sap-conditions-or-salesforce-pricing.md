---
title: "Customer prices: SAP conditions or Salesforce Pricing?"
description: "Should dealer and customer prices come from SAP conditions or be rebuilt in Revenue Cloud? Three routes compared with their effort, risks and a decision rule."
pubDate: 2026-10-28
lang: en
slug: customer-prices-sap-conditions-or-salesforce-pricing
translationKey: customer-prices-sap-or-salesforce-pricing
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: integration
tags: [Revenue Cloud, SAP, pricing conditions, Salesforce Pricing, integration, price master]
takeaways:
  - "Every price type needs exactly one master system. If SAP and Salesforce both calculate the same net price, they drift apart, and the difference lands with inside sales."
  - "Route A: SAP calculates and Salesforce asks for the net price through an API. The MuleSoft Accelerator for SAP documents this with SAP sales order simulation for Salesforce CPQ, not for Revenue Cloud."
  - "Route B rebuilds SAP conditions in Revenue Cloud with price books, volume tiers, contract prices and decision tables. Pricing is fast and explainable, but SAP must stop calculating the same price."
  - "Route C loads list prices from SAP and calculates discounts in Salesforce Pricing. It fits when sales really decides discounts per deal."
  - "Prices that also apply to orders arriving by EDI, phone or shop without Salesforce should stay in SAP."
faq:
  - q: "Should customer prices be calculated in SAP or in Salesforce?"
    a: "Where the conditions are maintained and where they also apply to orders that do not come from Salesforce. For most manufacturers with SAP that means customer and contract conditions stay in SAP, while discounts negotiated per deal can be calculated in Revenue Cloud."
  - q: "Can Revenue Cloud get net prices live from SAP?"
    a: "Not out of the box. The MuleSoft Accelerator for SAP documents a net price call through SAP sales order simulation for Salesforce CPQ. For Revenue Cloud you build the call yourself and should test the response time with real quote sizes."
  - q: "What is the risk of copying SAP conditions into Salesforce?"
    a: "The logic exists twice. Every condition change in SAP must be loaded and synced before the quote is right, and if SAP recalculates the order, the quote and the order confirmation can show different prices."
  - q: "Where do contract prices live in Revenue Cloud?"
    a: "On Contract Item Price records linked to an active contract, with optional volume tiers. The list price element of the pricing procedure uses them when contract-based pricing is selected."
draft: false
---

For most manufacturers with SAP, customer and dealer prices should be calculated where the conditions are maintained today, and Revenue Cloud should ask for them instead of copying them. That is route A: SAP calculates, Salesforce requests the net price through an API. Route B rebuilds the conditions in Salesforce Pricing and fits when sales takes over pricing for good. Route C, list prices from SAP and discounts in Salesforce, fits when sales really decides discounts per deal. Whichever you choose, each price type gets one master, never two, written down before the first quote goes out.

## Why does every price need exactly one master?

SAP calculates prices with the condition technique: customer prices, price lists, discounts per material group, surcharges and scales, each with its own validity period. Revenue Cloud calculates with [pricing procedures](../revenue-cloud-pricing-procedures-explained/), price books and decision tables. Both can produce a net price. The problem starts when both do it for the same price.

The quote is the first binding price your customer sees, the order confirmation from SAP the second. If two engines calculate them, they will differ sooner or later: an expired promotion, a freight surcharge, a rounding rule, a condition changed in SAP after the last load. Then someone has to decide which price applies, correct the order and explain it to the customer. If nobody decided that before go-live, inside sales does it, one order at a time.

Salesforce now even has a pricing engine that mirrors the SAP condition technique for telesales orders in Manufacturing Cloud. I describe in [Penny Perfect Pricing](../penny-perfect-pricing-erp-prices/) why that does not remove the question of the master, and the same applies here.

## Route A: SAP calculates, Salesforce asks

The pattern is documented in the [MuleSoft Accelerator for SAP, use case 3a](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/minor/1.6/pages/Use%20case%203a%20-%20Quote-to-cash%20-%20Salesforce%20and%20SAP%20S4HANA/). SAP S/4HANA is the system of record for pricing conditions. In the variant with Salesforce CPQ, the sales rep clicks Calculate, the integration calls SAP through MuleSoft APIs and gets back the net price for the requested quantity, including scales and contract pricing from SAP. An API uses the SAP sales order simulation for this and also checks additional discounts against thresholds configured in SAP. Creating the order in Salesforce then creates the order in SAP, and the SAP order number comes back.

The accelerator covers Sales Cloud and Salesforce CPQ, not Revenue Cloud. For Revenue Cloud you build the call yourself. Salesforce documents procedure plans with the Apex namespace [RevSignaling](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/apex_namespace_RevSignaling.htm) as the way to extend the standard pricing flow with custom logic. Whether a synchronous SAP call fits into your response times there, test in a prototype with real quote sizes. The simpler alternative is a defined point, such as a "check price" action before approval, instead of a call on every recalculation.

Strengths: the quote shows the SAP price, so quote and order confirmation match, and conditions are maintained in one place. Weaknesses: every call depends on SAP and the middleware, a quote with many lines waits for the answer, and the price waterfall in Salesforce shows only the result, while the explanation stays in SAP.

## Route B: rebuild conditions in Salesforce Pricing

Revenue Cloud has the tools for it: price books per country and currency, price adjustment schedules for volume tiers, and [Contract Item Price records](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/configure-contract-based-pricing) for negotiated customer prices, with their own volume tiers. The list price element uses them when contract-based pricing is selected. After every change, the decision tables Contract Pricing Entries and Contract Pricing Volume Tiers must be refreshed.

Strengths: pricing is fast, works without SAP, and the price waterfall explains every step. The same price is available to a portal, a store or an agent through the pricing API.

Weaknesses: SAP conditions rarely map one to one. Every condition with its validity has to be translated, loaded and kept current. And unless SAP accepts the price from Salesforce as fixed on the order, SAP calculates again with its own logic, and you have two engines. Route B only works if the price authority really moves to Salesforce and SAP stops calculating those prices for orders from Salesforce.

## Route C: list prices from SAP, discounts in Salesforce

List prices are loaded from SAP into the price book, followed by the sync of the decision tables. Volume discounts, attribute discounts, manual discounts and their approvals run in the pricing procedure in Salesforce.

This fits when list prices are stable and discounts are negotiated per deal by sales, as with machines and plants. The risk is a double discount: if SAP still holds a customer discount that applies automatically on the order, and sales grants a discount in Salesforce, the customer gets both. So for this route, SAP must not apply those conditions to orders from Salesforce, or Salesforce must not grant them.

## How do the three routes compare?

| Criterion | A: SAP calculates | B: rebuild in Salesforce | C: list price from SAP |
|---|---|---|---|
| Price master | SAP | Salesforce | SAP for list, Salesforce for discounts |
| Speed in the quote | Depends on SAP and middleware | Fast | Fast |
| Quote matches order confirmation | Yes, if SAP takes the same inputs | Only if SAP accepts the price | Only if SAP adds no own discounts |
| Explanation of the price | In SAP | Price waterfall in Salesforce | Price waterfall for discounts |
| Build effort | API, middleware, error handling | Migration of conditions, loads, syncs | Load job and sync |
| Ongoing effort | Operation of the interface | Two places to maintain, or a process change in SAP | Rules for discounts and approvals |

I do not put euro figures on the routes, because they depend on your conditions, your middleware and the size of your quotes. In my view the biggest cost item is the reconciliation work when two engines disagree, more than the build, and only a clear master avoids it.

## Where do contract prices and sales agreements fit?

Customer-specific contract prices follow the same rule. If they are negotiated and maintained in SAP, route A or a replication into Contract Item Price records with clear ownership. If they are negotiated in Salesforce, Revenue Cloud can hold them.

Sales agreements in Manufacturing Cloud plan quantities per period and carry a sales price per product. I would approve that price once, on the quote, and carry it into the agreement, as described in [From quote to sales agreement](../quote-to-sales-agreement-product-configurator/). The agreement does not need its own pricing logic.

The B2B store must show the same price as the quote. How price books and a live ERP call work there is covered in [customer prices in B2B Commerce](../b2b-commerce-customer-prices-price-books-erp/) and in the chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/). The same applies to AI-built dealer quotes, see [AI Partner Sales Assistant](../ai-partner-sales-assistant-dealer-quotes/).

## A typical scenario, as an assumption

A manufacturer of conveyor systems sells machines through direct sales and spare parts through 200 dealers. SAP holds list prices per country, dealer discounts per material group and customer prices for 30 key accounts. Machine quotes have 20 to 80 lines and are recalculated often during configuration. Dealers also order spare parts by EDI.

I would split by price type. For machines, route C: list prices from SAP every night, discounts and approvals in Revenue Cloud, and SAP takes the order price as fixed. For spare parts, route A: dealer discounts and key account prices stay in SAP because they also apply to EDI orders, and Salesforce asks SAP for the net price when the quote is checked before sending. One master per price type, written down in the [object ownership matrix](../salesforce-object-ownership-matrix/).

## Where should you start?

List your price types: list price, dealer discount, customer price, contract price, promotion, freight surcharge. For each, note where it is maintained today, who changes it, how often, and whether it also applies to orders that do not come from Salesforce. The last question usually decides: prices that apply to EDI, phone or shop orders without Salesforce stay in SAP. The wider split of quote to cash between the systems is covered in [Revenue Cloud and SAP: who owns what?](../revenue-cloud-sap-quote-to-cash-ownership/), the context in the chapter [catalog, configurator, pricing](../../masterclass/revenue-cloud/product-catalog-configurator-pricing/) of the Revenue Cloud masterclass. Designing the interface itself is part of my work on [Salesforce integration](../../services/salesforce-integration/).

Decide per price type which system calculates it, and let the other one ask. If you want to talk through your price master decision, [send me a message](#contact).
