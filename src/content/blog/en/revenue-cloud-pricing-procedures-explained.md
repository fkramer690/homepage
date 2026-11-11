---
title: "Salesforce Pricing: how Revenue Cloud calculates prices"
description: "How pricing procedures, decision tables and context definitions calculate a price in Revenue Cloud, and what that means for maintenance and regression tests."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: revenue-cloud-pricing-procedures-explained
translationKey: revenue-cloud-pricing-procedures
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, Salesforce Pricing, pricing procedures, decision tables, price waterfall, testing]
takeaways:
  - "A pricing procedure runs pricing elements in a fixed order, such as list price, volume discount, attribute discount and manual discount."
  - "The standard lookup elements read decision tables, not the objects. Without a refresh after a pricing data change, quotes calculate with old values."
  - "The price waterfall shows the adjustments from list price to net price. It explains a price to sales and is one of the main tools for testing."
  - "Every pricing procedure needs one owner, versioning and a fixed set of regression cases that are checked before each change."
faq:
  - q: "What is a pricing procedure in Revenue Cloud?"
    a: "A pricing procedure is an ordered sequence of pricing elements that turns a list price into a net price. Each element takes its input from the context definition or the previous element, applies its logic and passes the result on."
  - q: "What is the difference between a price book and a decision table?"
    a: "The price book stores the prices. Decision tables are lookup tables the standard pricing elements read; they are filled from price book entries, volume tiers or contract prices when you refresh them or run Sync Pricing Data."
  - q: "What is the price waterfall in Salesforce Pricing?"
    a: "The price waterfall shows the pricing adjustments from list price to final price; some outputs, such as Aggregate Price, appear only in the output JSON of the simulation. You see it when you simulate a pricing procedure and when you hover over the net unit price on a quote line."
  - q: "Can other systems use Revenue Cloud pricing?"
    a: "Yes. The Salesforce Pricing Business APIs include a headless pricing resource that builds a context and prices it in one call, plus resources for the price waterfall. A portal or an agent can ask for a price without creating a quote."
  - q: "How do you test a change to a pricing procedure?"
    a: "Test single cases with the simulation in the Pricing Procedure Builder, and test the whole change against a fixed set of reference quotes with documented expected net prices. The change is activated only when all of them match."
draft: false
---

Revenue Cloud calculates prices with Salesforce Pricing. The price book holds the list price, decision tables make pricing data readable for the engine, a context definition carries the quote line into the calculation, and a pricing procedure runs the steps in a fixed order, for example list price, volume discount, attribute discount, manual discount and aggregate price. The price waterfall then shows the adjustments. For a manufacturer this means pricing logic becomes configuration that changes prices on every quote. I treat a pricing procedure like code: one owner, versions, and regression cases before every change.

## What does Salesforce Pricing consist of?

Salesforce Pricing is the pricing part of Revenue Cloud, which Salesforce's documentation currently also calls Revenue Management or Agentforce Revenue Management. You work in the Price Management app. The Trailhead unit [Configure Pricing for Products](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/configure-pricing-for-products) names price books, price adjustments, pricing procedures and pricing recipes as the foundation; the recipe determines which decision tables a procedure can use. For how a price is calculated, four parts matter:

- **Price books** hold the product prices. A product must be in the standard price book before it can be added to a custom one, as [Explore Salesforce Pricing](https://trailhead.salesforce.com/content/learn/modules/price-management-with-revenue-cloud/explore-salesforce-pricing) explains.
- **Decision tables** are the bridge to the data. The standard lookup elements of a pricing procedure do not read price book entries directly; rules in decision tables fetch the values from the underlying tables. Custom elements can also use formulas or other objects.
- **Context definitions** describe which data serves as input and output. Revenue Cloud includes SalesTransactionContext, which connects sales transactions to quotes, assets and orders. A pricing admin can extend it with custom fields.
- **Pricing procedures** are the calculation itself.

On top of that, there are price adjustment schedules for volume tiers, contract prices on Contract Item Price records and [derived prices](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/implement-derived-pricing), where one product's price is derived from another, such as an accessory at 10 percent of the main product's list price.

If you are moving from Salesforce CPQ, you have to rebuild in pricing procedures what price rules and the quote calculator plugin did there. Migration tools can help with price books, discount schedules and analysis, but the logic of price rules and the plugin is redesigned by hand. The other differences are in [Salesforce CPQ vs Revenue Cloud](../salesforce-cpq-vs-revenue-cloud-differences/).

## How does a pricing procedure calculate a price?

Salesforce describes a pricing procedure as a defined set of pricing elements with an execution order. Each element takes its input from the context definition, applies its logic and passes its output to the next element. The final output goes back to the context definition, which writes it to the quote line.

The Trailhead examples build a procedure from these elements:

1. **Pricing Setting** maps the line item and defines the outputs: price waterfall, net unit price and subtotal.
2. **List Price** looks up the price book entry by product, price book and product selling model. With "Use contract-based pricing" selected, it first looks for a [contract price on the customer's active contract](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/configure-contract-based-pricing).
3. **Volume Discount** reads the tiers of a price adjustment schedule by quantity and effective date. The [Trailhead example](https://trailhead.salesforce.com/content/learn/modules/price-management-with-revenue-cloud/add-volume-and-manual-discounts) uses 10 percent starting at 100 units and 25 percent starting at 300.
4. **Attribute discount** adjusts the price based on product attributes, for example a cheaper version with a simpler control unit.
5. **Manual Discount** applies the discount a sales rep enters, by type and value.
6. **Aggregate Price** [rolls up values from several lines](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/apply-aggregate-pricing), for example per product family. The result is written back to the lines; Revenue Cloud does not roll these totals up to the quote header, and the simulation shows the aggregate price in the output JSON, not in the price waterfall.

The order is business logic. Whether a fixed-amount manual discount comes before or after a percentage volume discount changes the net price, and so does whether a contract price replaces the list price before volume tiers apply. Sales management and controlling decide that, not the person who builds the procedure.

A procedure created from scratch starts as an empty version V1, and each element you add becomes a step; for quotes and orders, Salesforce recommends cloning its predefined default pricing procedure instead. Revenue Settings determine which procedure prices quotes and orders; product discovery and headless pricing have their own settings. After a change you save and activate the version.

## Refresh decision tables after every pricing data change

This step is the easiest to forget in the first weeks. Change a price book entry or a volume tier, and the quote still calculates with the old value until the decision table has been refreshed. Trailhead shows two ways: run Sync Pricing Data in Salesforce Pricing Setup, or refresh individual decision tables in Setup, such as Volume Discount Entries or, for contract prices, Contract Pricing Entries and Contract Pricing Volume Tiers.

```hinweis achtung
For a manufacturer whose list prices arrive from SAP every night, the refresh belongs in the load job. The load is finished only when the decision tables are current. I would add a check that compares a handful of reference prices after each load, because a forgotten refresh usually shows no error on the quote, only stale prices.
```

## What does the price waterfall show?

The price waterfall shows the pricing adjustments from list price to final price. Some outputs, such as Aggregate Price, appear only in the output JSON of the simulation. You see the waterfall in two places: in the simulation of the Pricing Procedure Builder, and on the quote line when you hover over the net unit price. In the contract pricing example, it shows the contract price as the base and the volume discount on top.

For sales, it answers "why is this the price?" without a ticket to IT. For controlling it documents how a price came about. For testing it is the most useful tool: the simulation has a simplified mode with input fields and an advanced mode with JSON input. Trailhead notes that developers tend to prefer the JSON mode, and I agree, because a JSON case can be stored and run again after every change, manually in the builder or automatically against the headless pricing API.

## Can other systems ask Revenue Cloud for a price?

Yes. The [Salesforce Pricing Business APIs](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/pricing_business_apis.htm) in the Revenue Management Developer Guide (Winter '27, API 68.0) include resources for headless pricing, for refreshing the lookup tables and for the price waterfall.

```vertiefung For developers
title: Which Pricing Business API resources do you need?
- `/connect/core-pricing/pricing` for headless pricing, which builds and fills a context in one call and returns prices per line plus any errors
- `/connect/core-pricing/price-contexts/{contextId}` to price an existing context
- `/connect/core-pricing/sync/{pricingSyncOrigin}` to refresh the lookup tables
- `/connect/core-pricing/waterfall` resources to write and read the price waterfall of a line
```

This matters when the same price should appear in a dealer portal, a B2B store or an agent's answer. The store case is covered in [Advanced Pricing in B2B stores](../advanced-pricing-b2b-store-revenue-cloud/) and in the chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/). An agent should call the pricing API and never work out a price itself. This is the same rule I describe in [Agent Script: why business rules don't belong in the LLM](../agent-script-deterministic-rules/).

## Every pricing procedure needs one owner

A pricing procedure changes prices on every quote. I treat it like code, even though it is built by clicks:

- **One owner.** Usually a pricing admin in sales operations, with controlling signing off on changes. The implementation partner builds, but does not decide.
- **Versions.** Each change becomes a new version with a short note on what changed and why.
- **Regression cases.** A fixed set of reference quotes with documented expected net prices: standard products, each volume tier, contract customers, attribute discounts, manual discounts above and below approval thresholds. Every change runs against all of them before it is activated.
- **Deployment.** Procedures move between orgs as metadata, while price books, tiers and contract prices are data. According to [Gearset's documentation](https://docs.gearset.com/en/articles/10776213-how-to-deploy-pricing-procedures), pricing procedures are ExpressionSetDefinitions in the Metadata API, a deployment creates a new version in the target org, and the decision tables need a refresh afterwards. Context definitions and decision tables have to exist in the target before the procedure, so deploy in that order. How this fits into a pipeline is covered in [Revenue Cloud deployments](../revenue-cloud-configuration-deployment/).

The chapter [quality, tests and reviews](../../masterclass/devops-release-management/quality-tests-reviews/) in the DevOps masterclass covers how tests and reviews fit into the release process in general.

## Worked example: pump manufacturer with dealers and contract prices

A pump manufacturer sells 60 product families through its own sales force and through dealers. List prices are loaded from SAP into the standard price book every night. Dealers receive a volume discount, 20 key accounts have contract prices for two years, and a version with a simpler control unit is 8 percent cheaper.

The procedure would contain a list price step with contract-based pricing, an attribute discount for the control unit, the volume discount, the manual discount and an aggregate per product family. The nightly job loads the prices and then runs the sync. The regression set has 25 reference quotes, covering each product group, each volume tier and several contract customers. When sales asks for a promotion, the pricing admin builds a new version in a sandbox, runs the 25 cases, controlling checks the differences in the waterfall and, for the aggregates, in the output JSON, and only then is the version activated in production.

Whether SAP or Salesforce should calculate dealer and contract prices at all is a separate decision, covered in [Customer prices: SAP conditions or Salesforce Pricing?](../customer-prices-sap-conditions-or-salesforce-pricing/).

## Write down your pricing logic as steps

Write down your pricing logic as steps before anyone opens the builder: which price is the starting point, which discounts follow in which order, which ones need approval. That list becomes the procedure and the first regression cases at the same time. How pricing fits together with catalog and configurator is explained in the chapter [catalog, configurator, pricing](../../masterclass/revenue-cloud/product-catalog-configurator-pricing/) of the Revenue Cloud masterclass, and approvals in [discount approvals in Revenue Cloud](../revenue-cloud-discount-approvals/).
