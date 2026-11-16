---
title: "Buyer groups and entitlements: who sees which product"
description: "How manufacturers structure buyer groups and entitlement policies in Salesforce B2B Commerce: data model, hard limits and why one group per dealer fails."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: buyer-groups-entitlements-product-visibility
translationKey: commerce-buyer-groups-entitlements
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, buyer groups, entitlement policies, product visibility, dealers, data model]
takeaways:
  - "Entitlement policies decide which products a buyer sees. Buyer groups decide which policies and price books apply to the buyer's account."
  - "A buyer account belongs to at most 20 buyer groups, a policy serves up to 200 groups, and a product should be made available to no more than 2,000 groups."
  - "Beyond 2,000 groups per product, search indexes only the first 2,000. A data load does not check this hard limit, so the error shows up only in the store."
  - "Structure buyer groups for entitlements by country, dealer tier and brand, never one per dealer. Groups add up; they do not filter each other."
  - "An Apex buyer group extension assigns buyer groups at runtime. Qualification rules replace entitlement policies for visibility."
faq:
  - q: "What is a buyer group in Salesforce B2B Commerce?"
    a: "A buyer group bundles buyer accounts that share store access, entitlement policies and price books. A logged-in buyer needs a buyer group assigned to the store, plus access to the store site through a profile or permission set."
  - q: "What is an entitlement policy?"
    a: "An entitlement policy links buyer groups to products. Its fields CanViewProduct and CanViewPrice control whether members see the product and its price. A buyer group can carry any number of entitlement policies."
  - q: "How many buyer groups can a buyer account belong to?"
    a: "20 by default. Salesforce marks this as a soft limit that support can raise. With the Apex extension for buyer group assignment, the limit is the configured value plus 10, so 30 at the default."
  - q: "Can buyer groups be assigned at runtime?"
    a: "Yes. The extension point Commerce_Domain_BuyerGroup_EvaluationService runs your own Apex logic to assign buyer groups to users dynamically. It does not create BuyerGroupMember records. Salesforce asks you to disable its CDN and Edge Network when using it, because cached pages can show the wrong assignment."
  - q: "Why can't a dealer find a product it is entitled to see?"
    a: "Check two things first. Changes to policy products or policy buyer groups require a rebuild of the search index before they appear in search. And if the product is entitled to more than 2,000 buyer groups, search ignores every group above the first 2,000."
draft: false
---

In a Salesforce B2B Commerce store that uses entitlement policies, a dealer sees a product when its buyer account belongs to a buyer group whose entitlement policy contains the product. In the standard setup, prices follow the same path through price books assigned to the buyer group. Product visibility is therefore a question of how you structure buyer groups. My recommendation for manufacturers: build groups from country, dealer tier and brand, keep their number low, and never create one entitlement group per dealer. The limits of 20 buyer groups per account and 2,000 buyer groups per product in the search index punish that design once the store is live.

## How does product visibility work in B2B Commerce?

Salesforce B2B Commerce, which some Salesforce documentation also calls "Agentforce Commerce for B2B" ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping)), controls access through a chain of standard objects. The [Trailhead unit on how buyers access a store](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) sums it up in one sentence: "Buyers are connected to stores using buyer groups."

- **Buyer account:** a normal Account that is enabled for buying. Its contacts become buyers or buyer managers.
- **Buyer group** (BuyerGroup): bundles buyer accounts that share settings. Each membership is a BuyerGroupMember record.
- **Store assignment** (WebStoreBuyerGroup): connects a buyer group to a store.
- **Entitlement policy** (CommerceEntitlementPolicy): links buyer groups to products. According to the [data model overview](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-dev-data-model.html), it carries the fields CanViewProduct and CanViewPrice.
- **Buyer group price book** (BuyerGroupPricebook): assigns price books to buyer groups.

Visibility and price therefore depend on the same buyer groups. Store price books, contract pricing and a custom pricing service are further price sources. That is why I design both together. How the pricing side works, and when prices should be fetched live from the ERP instead, is covered in [customer prices in B2B Commerce](/en/blog/b2b-commerce-customer-prices-price-books-erp/).

## 20, 200 and 2,000: the limits that shape the design

Salesforce documents the limits for [buyer groups and buyer accounts](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) and for [entitlements](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) on two pages. Soft limits can be raised through Salesforce support, hard limits cannot. The ones that matter for a manufacturer, as of November 2026:

| Limit | Value | Type |
|---|---|---|
| Buyer groups per buyer account | 20 | soft |
| Buyer groups per buyer account with the Apex buyer group extension | configured limit plus 10 (30 at the default) | soft |
| Buyer groups per entitlement policy | 200 | hard |
| Buyer entitlements per product (buyer groups a product is entitled to) | 2,000 | hard |
| Products per entitlement policy | 3 million | soft |
| Entitlement policies per org | 105,000 | hard |
| Accounts per buyer in the Account Switcher | 200 | soft |

```hinweis achtung
The 2,000 limit has the worst failure mode. Salesforce writes that only the first 2,000 buyer groups for a product are indexed for search, and that search returns no entitlements for buyer groups beyond that. The limit is not enforced during data loads. The import therefore runs without an error, and some dealers simply stop finding the product.
```

The same symptom can also have a harmless cause: after you change which products or buyer groups a policy contains, the search index has to be rebuilt. I count entitlements per product as part of every data load and alert well before 2,000.

For the 200 buyer groups per policy, Salesforce warns that going beyond capacity "can lead to data scaling issues". The Account Switcher limit matters for dealers with many branches: one buyer who orders for more than 200 accounts needs a custom switcher, and the standard one fails at 2,000.

## Why not one buyer group per dealer?

The idea is tempting because it mirrors the ERP: every customer has its own terms, so every customer gets its own buyer group, its own policy and its own price book. With 50 dealers this works. As soon as the dealer groups also carry the shared policies, the arithmetic changes as the setup grows:

- A spare part that every dealer may buy must be available to as many buyer groups as there are dealers. At 2,000 dealers, every common part hits the search limit.
- A policy such as "all spare parts" serves at most 200 buyer groups. With 1,000 dealer groups you need at least five copies of the same policy and have to keep them identical.
- Every new dealer means a new group, new policy assignments and a new price book assignment. Onboarding becomes a data project.

A dealer group that only has a price book assigned is a different case. Salesforce describes that pattern: one shared group and policy for the assortment, plus one group and one price book per buyer. It does not hit the product limit, but it still means one group and one price book per dealer to maintain.

Individual prices are rarely a good reason for individual groups. In the SAP-centric programs I work on, net prices come from customer-specific conditions. Those belong in a live price call, in account-specific contract prices or in a small number of price books per tier, not in one price book per dealer.

## Structure buyer groups by country, dealer tier and brand

I build buyer groups based on attributes that rarely change and that the ERP already holds in the customer master:

1. **Country or sales organization.** It determines the assortment, language and currency. Hiding a product is not an export control check, though: that check belongs in the cart, checkout or order creation. And store visibility is not data security, so the org-wide default for Product2 has to stay Private, or logged-in users can find non-entitled products through the API.
2. **Dealer tier.** For example, service partner, sales partner or end customer. It determines the price book and sometimes visibility, such as service parts being visible only to certified partners.
3. **Brand or product line**, when dealers sell only one brand.

Entitlement policies then follow assortments, not customers: "spare parts general", "spare parts for service partners", "consumables", "accessories brand B".

Worked example: a manufacturer with 800 dealers in 12 countries, three dealer tiers and two brands. Country and tier give 36 buyer groups, and the two brands add two more. Each dealer account belongs to two groups, well below 20. One point matters here: buyer groups add up. A dealer in "Germany service partner" and "brand B" gets the policies of both groups, and the brand group does not filter the other one. If a product may be available only to service partners in Germany who carry brand B, you need a combined group or a policy assigned only to that intersection. A common spare part is available to 36 groups instead of 800, and the policy "spare parts general" serves 36 groups instead of hitting 200. A new dealer means two memberships and no new policy.

Exceptions stay exceptions. If one dealer needs a special part for a special machine, a small "special agreements" group is fine. Showing every dealer only the parts for the machines it owns is a different problem that buyer groups do not solve. I describe the options in [show only parts for each machine](/en/blog/spare-parts-shop-parts-per-machine/). And if countries or brands differ so much that the catalog or checkout process differs, the question becomes [one store or several](/en/blog/b2b-stores-countries-brands-dealers/).

## When do rules beat manual upkeep?

Memberships and policy assignments are data that someone has to maintain. Salesforce offers two ways to reduce that upkeep, and they solve different problems: one assigns buyer groups, the other replaces entitlement policies.

**Apex buyer group extension.** The extension point Commerce_Domain_BuyerGroup_EvaluationService is described in the [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) as a way to "dynamically assign users to buyer groups by executing custom Apex business logic". Your code could read country and tier from the account at runtime. The [Apex reference](https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/apex_class_CommerceBuyGrp_BuyerGroupEvaluationService.htm) names the condition: assignments may not take effect immediately while caching is active, so Salesforce asks you to disable the Salesforce CDN and Edge Network, sandbox first. For a store with dealers on several continents I would measure page load times before I accept that.

**Qualification rules from Revenue Management.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5), these rules "dynamically evaluate the product visibility for buyer groups based on their account data" and replace manually maintained entitlement policies. Once they are active, the store no longer uses entitlement policies for visibility, so the change needs its own test plan. They require a Commerce Growth or Advanced license plus Revenue Cloud Advanced. If sales already runs Revenue Cloud, that is worth a look. I would not buy it for visibility alone.

My default is simpler: the integration sets memberships based on the ERP customer master, for example in a nightly job that maps country and tier fields to buyer groups. That is easy to test and easy to explain to the business. Rules only pay off when the number of combinations keeps growing.

## First step: the entitlement concept on one page

Write the entitlement concept on a single page before anyone loads data:

- the list of buyer groups with the criteria that put an account into each group,
- the list of entitlement policies with the assortment each one covers,
- a matrix of which group gets which policy and price book,
- a count checked against the limits above, for today and for three years from now.

The ERP fields that drive membership then go into the interface list. This page is the first deliverable of the [chapter on catalog, search and entitlements](/en/masterclass/b2b-commerce/catalog-search-entitlements/) in my [B2B Commerce masterclass](/en/masterclass/b2b-commerce/). Whether dealers then actually find the parts they are entitled to depends on search, covered in [finding parts by part number](/en/blog/b2b-commerce-search-part-numbers/). Reviewing such concepts before an implementation partner starts building is part of my work on [Salesforce architecture](/en/services/salesforce-architecture/).
