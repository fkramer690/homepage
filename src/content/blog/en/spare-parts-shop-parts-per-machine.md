---
title: "Spare parts shop: show only parts for each machine"
description: "How a Salesforce B2B Commerce store shows dealers only the spare parts that fit their installed machine: entitlement limits, machine page, endpoint extensions."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: spare-parts-shop-parts-per-machine
translationKey: commerce-spare-parts-per-machine
topic: commerce
categories: [b2b-commerce, field-service]
tags: [B2B Commerce, spare parts, installed base, assets, PLM, endpoint extensions]
takeaways:
  - "Entitlements work per buyer group, not per serial number, so they cannot answer which parts fit one specific machine."
  - "One buyer group per machine fails because of limits: 2,000 buyer groups per product (hard) and 20 buyer groups per buyer account by default."
  - "The robust option is a machine page: a custom component lists the dealer's assets and the spare parts for each one from Salesforce or PLM."
  - "Filtering search per machine works through endpoint extensions, but the base class is still Beta and filtering afterwards leaves gaps in result pages."
  - "The dealer may only see machines registered to their own account; the server checks every asset and serial number against that account."
faq:
  - q: "Can B2B Commerce entitlements restrict parts by serial number?"
    a: "No. Entitlement policies give buyer groups access to products. A serial number is an attribute of an installed machine, usually an asset record, and I found no standard link between assets and entitlements in the B2B Commerce documentation."
  - q: "What is a machine page in a spare parts shop?"
    a: "It is a custom page in the store that lists the machines registered to the dealer's account and, for each machine, the spare parts that fit it. The parts list comes from asset records or live from PLM, and the dealer adds parts to the cart from there."
  - q: "What are Commerce endpoint extensions?"
    a: "They are Apex classes that change the request or response of a Commerce Connect API endpoint, for example product search. Salesforce lists Commerce_Endpoint_Search_Products, Commerce_Endpoint_Search_ProductSearch, Commerce_Endpoint_Catalog_Product and Commerce_Endpoint_Catalog_Products among them. They cannot replace the endpoint's default behavior."
  - q: "Can dealers see assets in an Experience Cloud store?"
    a: "According to Salesforce Help, Customer Community Plus and Partner Community licenses, among others, allow read, create and edit access to assets. Which assets a dealer can see is then governed by sharing, which should follow the account to which the machine is registered."
draft: false
---

A Salesforce B2B Commerce store cannot filter spare parts by serial number out of the box. Entitlements decide visibility per buyer group, and the limits rule out one group per machine. The workable approach is a machine page: a custom component lists the machines registered to the dealer's account and shows the parts for each one, from Salesforce assets or live from PLM. Filtering standard search results by machine requires endpoint extensions, whose base class is still Beta. The data matters more than the component: without an as-built parts list per serial number, or rules precise enough to derive one from variant and revision, no store can answer the question.

## Why do entitlements not solve parts per machine?

In Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B" according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping), visibility works in a chain. A buyer account belongs to buyer groups, and [Trailhead on the data model](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) says that entitlement policies "define which products a buyer can see based on their buyer group memberships". That answers "may this dealer buy this part?", which is a question about the dealer.

"Does this part fit this machine?" is, by contrast, a question about the machine. A dealer with 40 installed machines from five series needs a different parts list for each machine, and a seal that fits series A may also be orderable for series B as a spare. An entitlement says yes or no per product and buyer group, without considering a specific machine.

The obvious workaround is one buyer group per machine. The [entitlement limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) and the [buyer group limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) quickly rule that out:

```kennzahlen
2,000 | buyer groups per product, hard limit
20 | buyer groups per buyer account by default, can be raised by support
30 | buyer groups per buyer account with an Apex extension, also a soft limit
source: Salesforce Commerce developer guide, entitlement limits and buyer group limits
```

During search indexing "only the first two thousand buyer groups for a product are included in the index". A standard screw built into 6,000 machines would appear in search for only a third of them. And a dealer with 40 machines exceeds the default limit per buyer account. The Apex extension also requires turning off the Salesforce CDN and Edge Network for the store.

So entitlements stick to what they are good at: which countries, tiers and brands may buy which parts. How to define those groups is covered in [buyer groups and entitlements](/en/blog/buyer-groups-entitlements-product-visibility/).

## Which data does a parts list per machine need?

A parts list per machine needs three sources, the same as for the [spare parts agent by serial number](/en/blog/spare-parts-by-serial-number-ai/):

- **Installed base in Salesforce.** The machine as an asset with serial number, account and machine type, ideally as an asset hierarchy with main assemblies. This is the anchor for the dealer: which machines are mine?
- **As-built parts list from PLM.** The bill of materials of the delivered machine, with the variants and revisions actually installed, and a flag for spare-relevant positions.
- **Material data from the ERP.** Material number, successor material and sales status. Prices and availability reach the store through the usual pricing and inventory route.

The third source is the one projects forget. A part that PLM lists as built in may have been superseded years ago. If the successor is not resolved before the store shows the part, the dealer orders a part that no longer exists. Confirmed part replacements on completed work orders also change the machine over time. Consumed material alone is not proof, because a part may have been taken along and not installed. Why parts belong in the system is explained in [Field Service spare parts: ERP or Salesforce](/en/blog/salesforce-field-service-spare-parts-erp/).

## Option A: a machine page with its own component

The machine page is the option I would start with. A Lightning web component on its own store page lists the assets of the logged-in buyer's account. The dealer picks a machine, sees its main assemblies and the spare-relevant positions, and adds parts to the cart. LWR stores, which Salesforce recommends for new stores, support only Lightning web components, according to the [LWR migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html), so the component is built that way from the start.

Where the parts list comes from determines the effort required:

- **From Salesforce.** Spare-relevant positions are stored per asset or per machine type, for example as child assets or a custom object. Fast and simple, but every position is a record to load and keep in step with PLM.
- **Live from PLM.** The component calls an Apex method, which calls a parts API in PLM or middleware for the serial number. There is no replicated copy in Salesforce, but PLM has to respond within the time a dealer is willing to wait for a page, and the page needs a clear message when PLM does not respond.

In both cases the component only shows part numbers. Each one has to be mapped to a store product. Whether the dealer may buy it and at what price has to come from the standard Commerce product and pricing APIs in the buyer's context. A custom Apex method that returns raw product data would bypass entitlements. A part that PLM lists but that the dealer's buyer group is not entitled to buy should appear as "on request", not disappear without comment.

The advantage of the machine page is that it does not change the standard search or product pages, which keeps it less coupled to their behavior. The drawback is that dealers who type a part number into the search box still see every part their buyer group may buy, whether it fits or not.

## Option B: filtering search and product lists per machine

Salesforce offers endpoint extensions for exactly this kind of change. According to the [extensions guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html), they "modify the request and response of the Connect API endpoint" but cannot replace its default behavior. The [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) includes `Commerce_Endpoint_Search_Products` and the older `Commerce_Endpoint_Search_ProductSearch` for product search, `Commerce_Endpoint_Search_Suggestions` for search suggestions, and `Commerce_Endpoint_Catalog_Product` and `Commerce_Endpoint_Catalog_Products` for product details and lists. An after method could remove every product that is not in the parts list of the selected machine from the response. That only works if the selected machine is stored or validated on the server for every request, and if every one of these endpoints is covered; filtering search alone still leaves product pages reachable by URL.

I would use this only as a second step, for three reasons:

1. **Beta status.** The [Apex reference](https://developer.salesforce.com/docs/commerce/salesforce-commerce/references/comm-apex-reference/BaseEndpointExtension.html) names the base class "BaseEndpointExtension (Beta)", including for API version 67.0. Salesforce does not guarantee that beta features become generally available.
2. **Distorted results.** Search returns at most 200 results per page, according to the [search limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html). If the extension removes 150 of them afterwards, the page shows 50, and in my assessment facet counts and total hits no longer match what the dealer sees.
3. **Speed.** Every search then needs the parts list of the selected machine. Without a cache in Salesforce, frequent searches and suggestions hit PLM synchronously.

A compromise avoids extensions: the machine page sets a search filter on an attribute such as machine series. That works only if parts carry the series as a filterable attribute and the series is precise enough. How attributes and synonyms for part numbers are set up is covered in [B2B Commerce search by part number](/en/blog/b2b-commerce-search-part-numbers/).

## Who may see which machine?

This is the rule I would never relax: the dealer sees only machines registered to their own account. Whether the serial number comes from a list or a text field, the server resolves it to the asset and checks it against the assets shared with the buyer's account before it calls PLM. A selection made only in the browser can be manipulated, and then one dealer reads the configuration of a machine another dealer sold.

On the license side, [Salesforce Help on Experience Cloud licenses](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) lists read, create and edit access to assets for Customer Community Plus and Partner Community, among other licenses. Which assets a buyer actually sees is a question of sharing. In practice that means: the asset's account must be the buyer account, or the dealer relationship must be modeled so that sharing follows it. Machines sold through a dealer but registered to the end customer need a clear rule before the store goes live. Which portal license covers what in Manufacturing Cloud is described in [the Manufacturing Cloud customer portal](/en/blog/manufacturing-cloud-customer-portal/).

## Worked example: 6,000 machines and 150 dealers

Assume a machine builder has 6,000 installed machines in eight series, 150 dealers and a PLM with as-built lists for machines delivered in the last ten years.

One buyer group per machine is ruled out by the limits above. One buyer group per series would mean up to eight groups per dealer, well within the limit of 20, but it only narrows the list to the series, not to the variant built into one machine.

The decision in this scenario is that buyer groups stay per country and dealer tier. A machine page shows the dealer's assets and calls PLM in real time for the spare-relevant positions of the selected machine; the as-built list is cached on the asset for a day, while price, stock and sales status are fetched fresh from the store. For machines older than ten years, the page falls back to the parts list of the machine series and states that clearly. Search filtering by extension is postponed until the class is generally available.

## Trace 20 orders to the as-built list

```schritte
Check the data first
  Take 20 recent spare part orders and test whether serial number, asset and as-built list lead to the part that was ordered.
Clean up the asset sharing
  Settle which machines belong to which dealer account, including machines sold to end customers.
Build the parts API before the page
  The parts desk can use it first; the store, the [Field Service technicians](/en/blog/salesforce-field-service-spare-parts-erp/) and an agent can reuse it later.
Start with the machine page
  Consider search filtering only when dealers ask for it.
```

The chapter [catalog, search and entitlements](/en/masterclass/b2b-commerce/catalog-search-entitlements/) of the [B2B Commerce masterclass](/en/masterclass/b2b-commerce/) places this topic in the broader store design. Which system is the system of record for which data is the subject of [Salesforce integration](/en/services/salesforce-integration/). Which other Salesforce topics machine builders face besides the spare parts shop is covered under [Salesforce consulting for machine builders](/en/salesforce-for-machinery-manufacturers/).
