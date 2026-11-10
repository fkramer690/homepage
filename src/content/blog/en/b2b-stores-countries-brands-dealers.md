---
title: "One B2B store or several: countries, brands, dealers"
description: "When a manufacturer needs several Salesforce B2B Commerce stores instead of one: store limits, included storefronts, buyer groups and the effort per store."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-stores-countries-brands-dealers
translationKey: commerce-stores-countries-brands
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, store design, buyer groups, multi-country, brands]
takeaways:
  - "Countries and dealer tiers rarely need their own store. Buyer groups, entitlement policies and price books handle them inside one store."
  - "One store supports up to 25 languages, one catalog and five price books; an org can have up to 100 B2B stores."
  - "A second store is justified when the brand, the catalog structure, the checkout or the ERP behind it really differs."
  - "Growth includes 6 storefronts, Advanced 10; more cost extra. Every extra store adds settings, extension mappings and regression tests after each release."
faq:
  - q: "How many stores can a Salesforce org have for B2B Commerce?"
    a: "The store data limits set a hard limit of 100 B2B stores per org. The included allotment is reached earlier: Commerce Cloud B2B Growth includes 6 storefronts, Advanced includes 10. Additional storefronts are an add-on without a published price."
  - q: "Do I need one B2B store per country?"
    a: "Usually not. One store supports up to 25 languages, carts in the buyer account's default currency or another supported currency, and country-specific assortments and prices through buyer groups. A separate store per country makes sense only when the checkout or the ERP differs."
  - q: "Can two B2B stores share one catalog?"
    a: "Yes. A store can be associated with only one catalog, but a catalog can be associated with several stores. Two brands with the same parts can therefore share product data and still have their own storefront."
  - q: "How many price books can a B2B store have?"
    a: "A store can have five assigned price books, as a hard limit. Buyer groups have their own price books, with a soft limit of 50 per buyer group. What matters in practice: a single pricing call evaluates at most 25 valid price books, as a hard limit."
draft: false
---

Most manufacturers need one Salesforce B2B Commerce store per brand or per legal unit with its own checkout, with buyer groups for everything else. Countries and dealer tiers rarely justify a separate store: one store handles up to 25 languages, carts in the buyer's currency, and different assortments and prices through buyer groups. A second store is justified when the catalog structure, the brand experience, the checkout or the ERP behind it really differ. Each extra store adds settings, tests and release effort, and the editions include 6 (Growth) or 10 (Advanced) storefronts; more are a paid add-on.

## What decides the number of B2B stores?

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping), Salesforce B2B Commerce is now called "Agentforce Commerce for B2B"; the store is its hub. Around the store sit the catalog, the buyer groups, the entitlement policies and the price books. [Trailhead on the data model](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) describes these objects as spokes around a hub and says that a company can create several stores "to serve different business areas or regions".

Three objects decide whether one store is enough:

- **Buyer groups** connect buyer accounts to a store. A store can have many buyer groups, and each group gets its own entitlement policies and price books.
- **Entitlement policies** define which products a buyer group may see and buy.
- **The catalog** holds the category tree and the products. A store has exactly one catalog, but the [product and catalog data model](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-catalog.html) allows the same catalog to serve several stores.

Together with the Experience Cloud site that displays it, the store is the unit buyers experience as "the shop": catalog structure, checkout and the logic behind it, and usually the look and domain. Who sees what at which price is determined one level below, by the buyer groups. How to define those groups is covered in [buyer groups and entitlements](../buyer-groups-entitlements-product-visibility/).

## 25 languages, one catalog, five price books per store

These limits come from the Salesforce Developers pages on [store limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-store-limits.html), [product limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-limits.html), [price book limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-price-book-limits.html) and [buyer group limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html), as of October 2026:

| Limit | Value | Type |
|---|---|---|
| B2B stores per org | 100 | hard |
| Catalogs per store | 1 | hard |
| Languages per store | 25 | soft |
| Price books assigned to a store | 5 | hard |
| Price books per buyer group | 50 (a note says 25) | soft |
| Valid price books evaluated per pricing call | 25 | hard |
| Buyer groups per buyer account | 20 (a note says 100; 30 with an Apex extension) | soft |
| Products per store | 4 million, 1 million with Salesforce search | hard (not with an external search provider) |

Soft limits can be raised through Salesforce support, hard limits cannot. The 100-store limit is unlikely to constrain any manufacturer I can think of. The limits that matter earlier are the single catalog and the five price books assigned to a store. It is hard to fit a brand that needs its own, separately published category tree into a shared store, and a price structure with many lists has to be handled through buyer group price books rather than store price books, with no more than 25 valid price books per pricing call. Where the prices themselves should come from is the subject of [customer prices: price books or ERP](../b2b-commerce-customer-prices-price-books-erp/).

```hinweis offen
The limit pages contradict themselves in places: 50 or 25 price books per buyer group, 20 or 100 buyer groups per buyer account. If your design comes close to either number, have Salesforce confirm the value for your org.
```

## When is one store with buyer groups enough?

For countries, in most cases. Languages are configured per store, up to 25. For currencies, the developer guide on [currency changes](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-cart-currency-change.html) says that a cart uses the account's default currency unless it is created in another currency through the cart API, and that products and price books must be set up in each currency the store supports. A dealer in Switzerland can therefore buy in CHF and a dealer in Germany in EUR in the same store. One detail matters for the design: carts do not support currency changes automatically, and Salesforce recommends deactivating the currency picker once an item is in the cart. For authenticated B2B buyers, stores can also use [markets](https://help.salesforce.com/s/articleView?id=commerce.comm_markets_b2bauthbuyers.htm&language=en_US&type=5), which switch products and price books when a buyer changes location. The feature is off by default, and switching it on or off means deleting active carts, so decide before go-live whether to use it.

The same applies to dealer tiers. A buyer group per tier, each with its own price book, covers gold, silver and standard dealers. Whether a buyer with several price books sees the lowest price or the price book with the highest priority is a store setting, according to [Salesforce Help on pricing strategies](https://help.salesforce.com/s/articleView?id=sf.comm_priority_pricing.htm&language=en_US&type=5): Best Price or Priority Price.

The same applies to country assortments. A part that may not be sold in one country simply stays out of that country's entitlement policy.

My rule for segmentation: buyer groups by country and dealer tier, not one group per account. With [2,000 buyer entitlements per product](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) as a hard limit, a part sold to 3,000 individually grouped dealers is indexed for the first 2,000 groups only, and the rest cannot find it in search.

## When does a second store make sense?

I would plan a second store in four cases:

1. **Another brand with its own look and domain.** Each store is designed in Experience Builder, and the [B2B Commerce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5) lists custom domain setup and publishing as steps for each store. A brand B dealer should not log into a shop that looks like brand A. Branding sets can change colors and logos inside one site, but it is easier to give a separate brand experience with its own domain and content its own store.
2. **Another catalog structure.** One catalog per store means one category tree. If brand B sorts its parts by machine series and brand A by function, two catalogs and therefore two stores are the cleaner design. The products themselves can still be shared, because the same product can sit in the categories of both catalogs.
3. **Another checkout or ERP.** Commerce extensions for pricing, inventory, tax or order creation are mapped to a store with `sf commerce:extension:map`, according to the [extensions guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html). An extension can route calls by account or legal entity, but a legal unit that sells through a different ERP with its own checkout and order process is usually easier to run as its own store.
4. **Different buyers.** The Help page says a company can operate a B2B and a D2C channel from one org with shared data. End customers alongside dealers therefore mean a separate D2C store, with the product data shared.

If two brands share most parts, a shared catalog helps: two storefronts, one set of product data.

## Every extra store costs upkeep after each release

Licensing is simple. The [B2B pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) includes 6 storefronts in Growth and 10 in Advanced. The [Commerce add-ons page](https://www.salesforce.com/commerce/pricing/add-ons/) lists additional storefronts with "Request a Quote" and no price. If your plan gets close, include the number of storefronts and the price of additional ones in the contract. The GMV fee is charged on revenue through the storefronts, so a second store changes the GMV only if it brings new orders. For details, see [B2B Commerce pricing and the GMV model](../b2b-commerce-pricing-gmv-model/).

The effort is more substantial. Every store has its own extension mappings and settings, and usually its own pages, navigation and translations, unless it shares an existing site. After each of the three Salesforce releases a year, every store needs a regression test, and every custom component must be tested in every store that uses it. How to plan that rhythm is covered in the DevOps chapter on [Salesforce release planning](../../masterclass/devops-release-management/release-planning-salesforce-releases/). Two stores are not twice the work of one, but they are clearly more than one store with two buyer groups.

## Worked example: two brands in 14 countries

Assume a machine builder sells spare parts under two brands. Brand A is sold in 9 countries, and brand B, acquired a few years ago, is sold in 5 countries. Brand B still uses its own ERP client. Dealers have three tiers for brand A and two for brand B.

One store per country would mean 14 stores, which is above the 10 storefronts included in Advanced, and would require 14 regression tests per release. One store for everything would send brand B dealers to a shop with brand A's look and brand A's ERP calls.

The design in this scenario: two stores, one per brand. Brand A gets one combined buyer group per country and tier, 9 × 3 = 27 in total; brand B gets 5 × 2 = 10. Each buyer account belongs to one or two groups, far below the 20 per account. Both stores share the catalog for common parts only if the category trees match; in this scenario they do not, so there are two catalogs. Two stores fit easily within the 6 storefronts included in Growth.

This follows the same sequencing as a [global Manufacturing Cloud rollout](../manufacturing-cloud-global-rollout/): brand decisions must be part of the template from day one, even if the first country has only one brand.

## First step: brands, ERP clients and countries on one page

```schritte
Put it on one page
  One row per brand, legal unit, ERP client, country, currency, language and dealer tier.
Mark the real differences
  Only rows that differ in look, catalog structure, checkout or ERP get their own store. Everything else becomes a buyer group.
Check the limits
  Count languages per store, store price books and buyer groups per buyer account against the table above.
Settle the commercials
  Number of storefronts and price of additional ones in writing.
```

The chapter [catalog, search and entitlements](../../masterclass/b2b-commerce/catalog-search-entitlements/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) puts this decision into the broader context of store design. My approach to such segmentation decisions is described under [Salesforce architecture](../../services/salesforce-architecture/).
