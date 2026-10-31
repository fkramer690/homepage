---
title: "Buyer groups and entitlements: who sees which product"
description: "How manufacturers structure buyer groups and entitlement policies in Salesforce B2B Commerce: data model, hard limits and why one group per dealer fails."
pubDate: 2026-10-28
lang: en
slug: buyer-groups-entitlements-product-visibility
translationKey: commerce-buyer-groups-entitlements
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, buyer groups, entitlement policies, product visibility, dealers, data model]
takeaways:
  - "Entitlement policies decide which products a buyer sees. Buyer groups decide which policies and price books apply to the buyer's account."
  - "A buyer account belongs to at most 20 buyer groups, a policy serves up to 200 groups, and a product should be entitled to no more than 2,000 groups."
  - "Beyond 2,000 groups per product, search indexes only the first 2,000. Data load does not check it, so the error shows up only in the store."
  - "Cut buyer groups by country, dealer tier and brand, never one group per dealer. The number of groups then stays stable when new dealers join."
  - "Assignment by rule works through an Apex buyer group extension or Revenue Management qualification rules, both with conditions."
faq:
  - q: "What is a buyer group in Salesforce B2B Commerce?"
    a: "A buyer group bundles buyer accounts that share store access, entitlement policies and price books. Buyers reach a store only through a buyer group, so every buyer account needs at least one membership."
  - q: "What is an entitlement policy?"
    a: "An entitlement policy links buyer groups to products. Its fields CanViewProduct and CanViewPrice control whether members see the product and its price. A buyer group can carry any number of entitlement policies."
  - q: "How many buyer groups can a buyer account belong to?"
    a: "20 by default. Salesforce marks this as a soft limit that support can raise. With the Apex extension for buyer group assignment, the limits page lists 30."
  - q: "Can buyer group membership be calculated at runtime?"
    a: "Yes. The extension point Commerce_Domain_BuyerGroup_EvaluationService runs your own Apex logic to assign buyer groups. Salesforce asks you to disable its CDN and Edge Network for it, because cached pages can show the wrong assignment."
draft: false
---

In Salesforce B2B Commerce, a dealer sees a product when the dealer's buyer account belongs to a buyer group, and that buyer group has an entitlement policy containing the product. Prices follow the same path through price books assigned to the buyer group. Product visibility is therefore a question of how you cut buyer groups. My recommendation for manufacturers: build groups from country, dealer tier and brand, keep their number small, and never create one group per dealer. The limits of 20 buyer groups per account and 2,000 buyer groups per product in the search index punish that design later, when the store is live.

## How does product visibility work in B2B Commerce?

Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B" ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping)), controls access through a chain of standard objects. The [Trailhead unit on how buyers access a store](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) sums it up in one sentence: "Buyers are connected to stores using buyer groups."

- **Buyer account:** a normal Account that is enabled for buying. Its contacts become buyers or buyer managers.
- **Buyer group** (BuyerGroup): bundles buyer accounts that share settings. Each membership is a BuyerGroupMember record.
- **Store assignment** (WebStoreBuyerGroup): connects a buyer group to a store.
- **Entitlement policy** (CommerceEntitlementPolicy): links buyer groups to products. According to the [data model overview](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-dev-data-model.html), it carries the fields CanViewProduct and CanViewPrice.
- **Buyer group price book** (BuyerGroupPricebook): assigns price books to buyer groups.

Visibility and price therefore hang on the same buyer groups. That is why I design both together. How the price side works, and when prices should come live from the ERP instead, is covered in [customer prices in B2B Commerce](../b2b-commerce-customer-prices-price-books-erp/).

## 20, 200 and 2,000: the limits that shape the design

Salesforce documents the limits for [buyer groups and buyer accounts](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) and for [entitlements](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) on two pages. Soft limits can be raised through Salesforce support, hard limits cannot. The ones that matter for a manufacturer, as of October 2026:

| Limit | Value | Type |
|---|---|---|
| Buyer groups per buyer account | 20 | soft |
| Buyer groups per buyer account with the Apex buyer group extension | 30 | soft |
| Buyer groups per entitlement policy | 200 | hard |
| Buyer entitlements per product (buyer groups a product is entitled to) | 2,000 | hard |
| Products per entitlement policy | 3 million | soft |
| Entitlement policies per org | 105,000 | hard |
| Accounts per buyer in the Account Switcher | 200 | soft |

```hinweis achtung
The 2,000 limit has the worst failure mode. Salesforce writes that only the first 2,000 buyer groups of a product are indexed for search, and that buyer groups beyond that return no entitlements in a search. The limit is not enforced when you load data. So the import runs without an error, and some dealers simply stop finding the product.
```

For the 200 buyer groups per policy, Salesforce warns that going beyond capacity "can lead to data scaling issues". The Account Switcher limit matters for dealers with many branches: one buyer who orders for more than 200 accounts needs a custom switcher, and the standard one fails at 2,000.

## Why not one buyer group per dealer?

The idea is tempting because it mirrors the ERP: every customer has its own conditions, so every customer gets its own buyer group, its own policy and its own price book. With 50 dealers this works. The arithmetic changes with size:

- A spare part that every dealer may buy is entitled to as many buyer groups as there are dealers. At 2,000 dealers, every common part hits the search limit.
- A policy such as "all spare parts" serves at most 200 buyer groups. With 1,000 dealer groups you need at least five copies of the same policy and have to keep them identical.
- Every new dealer means a new group, new policy assignments and a new price book assignment. Onboarding becomes a data project.

Individual prices are rarely a good reason for individual groups. At manufacturers with SAP or a similar ERP, net prices usually come from conditions per customer. Those belong either in a live price call or in a small number of price books per tier, not in one price book per dealer.

## Cut buyer groups by country, dealer tier and brand

I build buyer groups from attributes that change rarely and that the ERP already holds in the customer master:

1. **Country or sales organisation.** It decides assortment, language, currency and legal restrictions such as export control.
2. **Dealer tier.** For example service partner, sales partner or end customer. It decides the price book and sometimes visibility, such as service parts only for certified partners.
3. **Brand or product line**, when dealers sell only one brand.

Entitlement policies then follow assortments, not customers: "spare parts general", "spare parts for service partners", "consumables", "accessories brand B".

Worked example: a manufacturer with 800 dealers in 12 countries, three dealer tiers and two brands. Country and tier give 36 buyer groups, the two brands two more. Each dealer account sits in two groups, well below 20. A common spare part is entitled to 36 groups instead of 800, and the policy "spare parts general" serves 36 groups instead of hitting 200. A new dealer means two memberships and no new policy.

Exceptions stay exceptions. If one dealer needs a special part for a special machine, a small "special agreements" group is fine. Showing every dealer only the parts for the machines it owns is a different problem, which buyer groups do not solve. I describe the options in [show only parts for each machine](../spare-parts-shop-parts-per-machine/). And if countries or brands differ so much that catalogue or checkout differ, the question becomes [one store or several](../b2b-stores-countries-brands-dealers/).

## When do rules beat manual upkeep?

Memberships and policy assignments are data that someone has to maintain. Salesforce offers two ways to assign by rule.

**Apex buyer group extension.** The extension point Commerce_Domain_BuyerGroup_EvaluationService is described in the [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) as a way to "dynamically assign users to buyer groups by executing custom Apex business logic". Your code could read country and tier from the account at runtime. The [Apex reference](https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_class_CommerceBuyGrp_BuyerGroupEvaluationService.htm) names the condition: assignments may not take effect immediately while caching is active, so Salesforce asks you to disable the Salesforce CDN and Edge Network, sandbox first. For a store with dealers on several continents I would measure page load times before I accept that.

**Qualification rules from Revenue Management.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5), these rules "dynamically evaluate the product visibility for buyer groups based on their account data" and replace manually maintained entitlement policies. They require a Commerce Growth or Advanced licence plus Revenue Cloud Advanced. If sales already runs Revenue Cloud, that is worth a look. For visibility alone I would not buy it.

My default is simpler: the integration sets memberships from the ERP customer master, for example in a nightly job that maps country and tier fields to buyer groups. That is easy to test and easy to explain to the business. Rules only pay off when the number of combinations keeps growing.

## First step: the entitlement concept on one page

Write the entitlement concept on one page before anyone loads data:

- the list of buyer groups with the criteria that put an account into each group,
- the list of entitlement policies with the assortment each one covers,
- a matrix of which group gets which policy and price book,
- a count against the limits above, for today and for three years from now.

The ERP fields that drive membership then go into the interface list. This page is the first deliverable of the [chapter on catalogue, search and entitlements](../../masterclass/b2b-commerce/catalog-search-entitlements/) in my [B2B Commerce masterclass](../../masterclass/b2b-commerce/). Whether dealers then actually find the parts they are entitled to depends on search, covered in [finding parts by part number](../b2b-commerce-search-part-numbers/). Reviewing such concepts before a partner builds is part of my work on [Salesforce architecture](../../services/salesforce-architecture/).
