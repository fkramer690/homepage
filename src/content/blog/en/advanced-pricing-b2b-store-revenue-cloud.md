---
title: "Advanced Pricing in B2B stores: when Revenue Cloud?"
description: "When a Salesforce B2B store needs Advanced Pricing powered by Revenue Cloud: licences, pricing procedures, contract prices, and when SAP pricing is enough."
pubDate: 2026-10-28
lang: en
slug: advanced-pricing-b2b-store-revenue-cloud
translationKey: commerce-advanced-pricing-revenue-cloud
topic: revenue
categories: [b2b-commerce, revenue-cloud]
tags: [B2B Commerce, Revenue Cloud, Advanced Pricing, contract pricing, pricing procedures]
takeaways:
  - "Agentforce Revenue Management for B2B Commerce needs a Commerce Growth or Commerce Advanced licence plus a Revenue Cloud Advanced licence, bought through the Salesforce account executive."
  - "It replaces simple price book logic with pricing procedures, decision tables, contract-based prices, volume tiers, configurable bundles, qualification rules and subscriptions."
  - "Salesforce Help lists Advanced Pricing for Commerce Powered by Revenue Cloud as a requirement for Request for Quote in B2B stores."
  - "The main benefit is one pricing logic for quotes, orders and the store. It pays off when sales already prices in Revenue Cloud."
  - "If SAP calculates all customer prices and sales quotes outside Revenue Cloud, Advanced Pricing adds a second pricing engine next to SAP. Then a live ERP call is usually the simpler answer."
faq:
  - q: "What is Advanced Pricing for Commerce Powered by Revenue Cloud?"
    a: "It is the pricing engine of Revenue Cloud used inside a B2B Commerce store. Instead of only price books it calculates prices with pricing procedures, decision tables and contract prices, and Salesforce names it as the basis for features such as Request for Quote."
  - q: "Which licences does Advanced Pricing in B2B Commerce need?"
    a: "According to Salesforce Help, a Commerce Growth or Commerce Advanced licence together with a Revenue Cloud Advanced licence. Revenue Settings must be enabled. The licences are bought through the Salesforce account executive."
  - q: "Can a B2B store show contract prices from Revenue Cloud?"
    a: "Yes. Salesforce Help lists contract-based pricing for B2B stores under Advanced Pricing. In Revenue Cloud, contract prices live on Contract Item Price records and are applied by the pricing procedure once the contract is active."
  - q: "Do I need Revenue Cloud if SAP calculates my prices?"
    a: "Not necessarily. If SAP is the price master and stays so, a live call to SAP through the pricing extension is usually simpler than building the same logic again in Revenue Cloud. Revenue Cloud pays off when sales already quotes there."
draft: false
---

A B2B store needs Advanced Pricing powered by Revenue Cloud when its prices follow rules that price books cannot express, and when those rules already live, or should live, in Salesforce. Salesforce sells it as Agentforce Revenue Management for B2B Commerce: a Commerce Growth or Advanced licence plus Revenue Cloud Advanced. It adds pricing procedures, decision tables, contract prices, volume tiers, configurable bundles and qualification rules, and Salesforce lists it as a requirement for Request for Quote. My rule: worth it when sales already prices in Revenue Cloud. If SAP is the price master, it mostly gives you a second pricing engine.

## What does Advanced Pricing add to a B2B store?

Standard pricing in Salesforce B2B Commerce, which Salesforce now also markets as Agentforce Commerce for B2B, works with price books and a pricing strategy. That covers list prices and dealer tiers, as I describe in [customer prices in B2B Commerce](../b2b-commerce-customer-prices-price-books-erp/). Everything that is a calculation rather than a stored price needs either custom code or a pricing engine.

[Salesforce Help on Agentforce Revenue Management for B2B Commerce](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) lists what the Revenue Cloud side brings into the store:

- **Complex pricing** with pricing recipes, decision tables, context definitions and pricing procedures, applied across quotes, orders and subscriptions without custom code.
- **Tiered pricing**, where volume discounts adjust at quantity thresholds and the tiers are shown to buyers.
- **Configurable bundles** with a constraint-based configuration engine for made-to-order products.
- **Request for Quote**, so buyers can start a price negotiation from the cart.
- **Qualification rules**, which decide product and category visibility for buyer groups from account data and replace manual upkeep of entitlement policies.
- **Subscriptions** for digital products, one-time, evergreen or term-based.

Two terms explained, because the rest of the article uses them. A pricing procedure is the ordered sequence of steps that turns a list price into a net price. A decision table is a lookup table the procedure reads, for example the discount per customer group and material group. The [pricing section of Salesforce Help for B2B stores](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.comm_pricebooks.htm&type=5) has its own articles for Advanced Pricing, among them pricing procedure plans, refreshing the store's pricing decision tables, custom fields in the pricing procedure and contract-based pricing for B2B stores.

## Which licences do you need?

According to Salesforce Help, the Revenue Management features for B2B Commerce are available in orgs with a Commerce Growth or Commerce Advanced licence together with a Revenue Cloud Advanced licence. Revenue Settings must be enabled, and you buy the licences through your account executive.

Two facts from the official pricing pages for budgeting. The [B2B Commerce editions](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) show "Contact for Pricing" and are charged as a share of gross merchandise value through the storefront; Salesforce publishes no percentage. The [Revenue Cloud pricing page](https://www.salesforce.com/sales/revenue-lifecycle-management/pricing/) lists Revenue Cloud Advanced at $200 per user and month, billed annually, and describes it as a separate product bought in addition to a Sales Cloud subscription.

```hinweis offen
How many Revenue Cloud Advanced users a store with external buyers needs is not stated on either page. Ask that question before the business case, because the answer can move the number a lot.
```

## How do contract prices reach the buyer?

Contract prices are the most common reason manufacturers look at Advanced Pricing. A large dealer negotiates a price for a set of spare parts for two years, and the store should show exactly that price.

The [Trailhead unit on contract-based pricing](https://trailhead.salesforce.com/content/learn/modules/advanced-price-management-with-revenue-cloud/configure-contract-based-pricing) shows how Revenue Cloud does it. The negotiated price sits on a Contract Item Price record linked to a contract. Volume discounts on top come from Contract Item Price Adjustment Tiers. The pricing procedure has a list price step with "Use contract-based pricing" selected, which looks for a contract price on the active contract and replaces the list price with it. Two operational details matter: the contract must be activated, and the decision tables for contract pricing entries and volume tiers must be refreshed before pricing sees the data. The unit shows this on a quote; for the store, Salesforce Help has its own article on contract-based pricing for B2B stores.

The refresh is where I would look first in a design. If contract prices are created in Salesforce, the refresh is part of the process. If they come from SAP, every SAP change needs an import plus a refresh before the store is right.

```ablauf
erp: SAP contract price
sf: Contract Item Price, Decision table, Pricing procedure, Store cart
SAP contract price --Import--> Contract Item Price
Contract Item Price --Refresh--> Decision table
Decision table --> Pricing procedure
Pricing procedure --Contract price--> Store cart
```

## When is Advanced Pricing worth it?

The strongest argument is consistency. Salesforce wrote in its [Spring '26 B2B innovations post](https://www.salesforce.com/blog/b2b-commerce-innovations-spring-26/) that buyers should see "one price, one catalog, and one history" across site, agent and sales rep. With Advanced Pricing, the procedure that prices a quote for the sales desk also prices the dealer's cart.

```pro-contra
pro: I would recommend it when
- sales already quotes in Revenue Cloud and maintains the pricing logic there
- the store sells configured bundles or made-to-order variants
- contract prices are negotiated and stored in Salesforce, not in SAP
- you want Request for Quote, which needs Advanced Pricing according to Salesforce Help
contra: I would be cautious when
- SAP calculates every customer price and will keep doing so; then you replicate SAP's logic into decision tables (two engines that must agree) or call SAP anyway
- sales quotes in SAP or another CPQ tool and has no plan to move
- the store sells mainly spare parts at tier prices, which price books handle
```

Where your pricing engine should live in general is covered in the chapter [catalog, configurator and pricing](../../masterclass/revenue-cloud/product-catalog-configurator-pricing/) of the Revenue Cloud masterclass. For the store, the decision follows the price master: the system that sales trusts for a quote should also price the cart.

## A typical scenario, as an assumption

A typical scenario, as an assumption: a manufacturer of packaging machines introduced Revenue Cloud for machine quotes a year ago, with pricing procedures for country surcharges and contract prices for 30 key accounts. Now it wants a store for spare parts and service kits for its 300 customers. SAP still holds list prices.

Here Advanced Pricing fits. List prices come from SAP into price books as today, the existing procedure adds the country surcharge and applies the contract prices, and key accounts see in the store what their sales rep would quote. Large or unusual orders go through Request for Quote to the same sales desk.

Change one assumption: the manufacturer quotes machines in SAP and has no Revenue Cloud. Then I would price spare parts with price books for tiers and a live SAP call for the 30 key accounts, and not buy a pricing engine only for the store.

## Where should you start?

Write down three things before you talk to Salesforce about licences: where your pricing logic lives today, who maintains contract prices, and whether you need Request for Quote or configured bundles in the store. If two of the three point to Salesforce, Advanced Pricing is worth a proof of concept with your real procedures. The licence question belongs in the same make-or-buy review I describe under [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

The wider picture of prices, quotes and checkout is in the chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/). How buyers turn a cart into a quote is covered in [Request for Quote in B2B Commerce](../request-for-quote-b2b-commerce-cart-to-quote/), and the dealer side of AI-built quotes in [AI Partner Sales Assistant](../ai-partner-sales-assistant-dealer-quotes/).

Advanced Pricing pays off when the store should price like sales already does in Revenue Cloud.
