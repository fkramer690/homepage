---
title: "One B2B store or several: countries, brands, dealers"
description: "When a manufacturer needs several Salesforce B2B Commerce stores instead of one: store limits, included storefronts, buyer groups and the effort per store."
pubDate: 2026-10-28
lang: en
slug: b2b-stores-countries-brands-dealers
translationKey: commerce-stores-countries-brands
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, store design, buyer groups, multi-country, brands]
takeaways:
  - "In Salesforce B2B Commerce, countries and dealer tiers rarely need their own store; buyer groups, entitlement policies and price books handle them inside one store."
  - "One store supports up to 25 languages, one catalogue and five price books; an org can have up to 100 B2B stores."
  - "A second store is justified when the brand, the catalogue structure, the checkout or the ERP behind it really differs."
  - "Growth includes 6 storefronts and Advanced 10. Every extra store adds pages, translations, extension mappings and regression tests after each Salesforce release."
faq:
  - q: "How many stores can a Salesforce org have for B2B Commerce?"
    a: "The store data limits allow 100 B2B stores per org as a hard limit. The commercial limit comes earlier: Commerce Cloud B2B Growth includes 6 storefronts, Advanced includes 10."
  - q: "Do I need one B2B store per country?"
    a: "Usually not. One store supports up to 25 languages, carts in the buyer account's currency, and country-specific assortments and prices through buyer groups. A separate store per country makes sense only when the checkout or the ERP differs."
  - q: "Can two B2B stores share one catalogue?"
    a: "Yes. A store can be associated with only one catalogue, but a catalogue can be associated with several stores. Two brands with the same parts can therefore share product data and still have their own storefront."
  - q: "How many price books can a B2B store have?"
    a: "Five price books can be assigned to a store, as a hard limit. Buyer groups have their own price books; the limit table says 50 per buyer group, a note on the same page says 25, so confirm the number with Salesforce."
draft: false
---

Most manufacturers need one Salesforce B2B Commerce store per brand, or per legal unit with its own checkout, and buyer groups for everything else. Countries and dealer tiers rarely justify a separate store: one store handles up to 25 languages, carts in the buyer's currency, and different assortments and prices through buyer groups. A second store becomes necessary when the catalogue structure, the look, the checkout or the ERP behind it really differ. Each extra store multiplies content, tests and release effort, and the editions include only 6 (Growth) or 10 (Advanced) storefronts.

## What decides the number of B2B stores?

The store is the hub of Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B", according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping). Around the store sit the catalogue, the buyer groups, the entitlement policies and the price books. [Trailhead on the data model](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-experience-data-model/organize-your-store) describes it like spokes around a hub and says that a company can create several stores "to serve different business areas or regions".

Three objects decide whether one store is enough:

- **Buyer groups** connect buyer accounts to a store. A store can have many buyer groups, and each group gets its own entitlement policies and price books.
- **Entitlement policies** define which products a buyer group may see and buy.
- **The catalogue** holds the category tree and the products. A store has exactly one catalogue, but the [product and catalogue data model](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-catalog.html) allows the same catalogue to serve several stores.

So the store is the unit for everything buyers experience as "the shop": look, domain, catalogue structure, checkout and the logic behind it. Who sees what at which price is decided one level below, in the buyer groups. How to cut them is covered in [buyer groups and entitlements](../buyer-groups-entitlements-product-visibility/).

## Which limits shape the decision?

These limits come from the Salesforce Developers pages on [store limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-store-limits.html), [product limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-limits.html), [price book limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-price-book-limits.html) and [buyer group limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html), as of October 2026:

| Limit | Value | Type |
|---|---|---|
| B2B stores per org | 100 | hard |
| Catalogues per store | 1 | hard |
| Languages per store | 25 | soft |
| Price books assigned to a store | 5 | hard |
| Price books per buyer group | 50 in the table, 25 in a note | soft |
| Buyer groups per buyer account | 20 (30 with an Apex extension) | soft |
| Products per store | 4 million, 1 million searchable | hard |

Soft limits can be raised through Salesforce support, hard limits cannot. The 100 stores are far away for any manufacturer I can think of. The limits that bite earlier are the single catalogue and the five store price books. A brand that needs its own category tree cannot get it inside a shared store, and a price structure with many lists has to live in buyer group price books instead of store price books. Where the prices themselves should come from is the subject of [customer prices: price books or ERP](../b2b-commerce-customer-prices-price-books-erp/).

```hinweis offen
For price books per buyer group, the price book limits page says 50 in the table and 25 in a note. If you plan many price lists in buyer groups, have Salesforce confirm the number that applies.
```

## When is one store with buyer groups enough?

For countries, in most cases. Languages are configured per store, up to 25. For currencies, the developer guide on [currency changes](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-cart-currency-change.html) says that the cart uses the account's default currency, and that products and price books must be set up in each currency the store supports. A dealer in Switzerland and one in Germany can therefore buy in the same store in CHF and EUR. One detail matters for the design: carts do not support currency changes automatically, and Salesforce recommends deactivating the currency picker once an item is in the cart.

For dealer tiers, too. A buyer group per tier, each with its own price book, covers gold, silver and standard dealers. Whether a buyer with several price books sees the lowest price or the price book with the highest priority is a store setting, according to [Salesforce Help on pricing strategies](https://help.salesforce.com/s/articleView?id=sf.comm_priority_pricing.htm&language=en_US&type=5): Best Price or Priority Price.

For country assortments as well. A part that may not be sold in one country simply stays out of that country's entitlement policy.

My rule for the cut: buyer groups by country and dealer tier, never one group per account. With [2,000 buyer entitlements per product](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) as a hard limit, a part sold to 3,000 individually grouped dealers is indexed for the first 2,000 groups only, and the rest cannot find it in search.

## When does a second store make sense?

I would plan a second store in four cases:

1. **Another brand with its own look.** Each store is designed in Experience Builder, and the [B2B Commerce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5) lists custom domain and publishing as steps per store. A dealer of brand B should not log into a shop that looks like brand A.
2. **Another catalogue structure.** One catalogue per store means one category tree. If brand B sorts its parts by machine series and brand A by function, they need two catalogues and therefore two stores.
3. **Another checkout or ERP.** Commerce extensions for pricing, inventory, tax or order creation are mapped to a store with `sf commerce:extension:map`, according to the [extensions guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html). A legal unit that sells from a different ERP needs different calls and is easier to run as its own store.
4. **Different buyers.** The Help page says a company can operate a B2B and a D2C channel from one org with shared data. End customers next to dealers therefore mean a separate D2C store, with the product data shared.

If two brands share most parts, the shared catalogue helps: two storefronts, one set of product data.

## What does each extra store cost?

The licence side is short. The [B2B pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) includes 6 storefronts in Growth and 10 in Advanced and states no price for more. If your plan gets close, put the number of storefronts and the price of additional ones into the contract. The GMV fee is charged on revenue through the storefronts, so a second store changes the GMV only if it brings new orders, see [B2B Commerce pricing and the GMV model](../b2b-commerce-pricing-gmv-model/).

The effort side is longer. Every store has its own pages, navigation, translations, extension mappings and settings. After each of the three Salesforce releases a year, every store needs its regression test, and every custom component is tested in every store that uses it. How to plan that rhythm is covered in the DevOps chapter on [Salesforce release planning](../../masterclass/devops-release-management/release-planning-salesforce-releases/). Two stores are not twice the work of one, but they are clearly more than one store with two buyer groups.

## A typical scenario: two brands in 14 countries

A typical scenario, as an assumption: a machine builder sells spare parts under two brands. Brand A is sold in 9 countries, brand B, acquired a few years ago, in 5 countries. Brand B still runs on its own ERP client. Dealers have three tiers in brand A and two in brand B.

One store per country would mean 14 stores, above the 10 storefronts in Advanced and with 14 regression tests per release. One store for everything would put brand B dealers into a shop with brand A's look and brand A's ERP calls.

The cut in the scenario: two stores, one per brand. Brand A gets buyer groups per country and tier, 27 in total; brand B gets 10. Each buyer account sits in one or two groups, far below the 20 per account. Both stores share the catalogue for common parts only if the category trees match; in this scenario they do not, so there are two catalogues. Two stores fit easily into the 6 storefronts of Growth.

This follows the same order as a [global Manufacturing Cloud rollout](../manufacturing-cloud-global-rollout/): the brand is a question for the template from day one, even if the first country has only one.

## Where should you start?

```schritte
Put it on one page
  One row per brand, legal unit, ERP client, country, currency, language and dealer tier.
Mark the real differences
  Only rows that differ in look, catalogue structure, checkout or ERP get their own store. Everything else becomes a buyer group.
Check the limits
  Count languages per store, store price books and buyer groups per buyer account against the table above.
Settle the commercials
  Number of storefronts and price of additional ones in writing.
```

The chapter [catalogue, search and entitlements](../../masterclass/b2b-commerce/catalog-search-entitlements/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) puts this decision into the wider store design, and my approach to such cuts is described under [Salesforce architecture](../../services/salesforce-architecture/).

One store per brand or ERP and buyer groups for countries and tiers is the default I would argue against only with a concrete reason; if you want to check your cut, [send me a message](#contact).
