---
title: "Spare parts shop: show only parts for each machine"
description: "How a Salesforce B2B Commerce store shows dealers only the spare parts that fit their installed machine: entitlement limits, machine page, endpoint extensions."
pubDate: 2026-10-28
lang: en
slug: spare-parts-shop-parts-per-machine
translationKey: commerce-spare-parts-per-machine
topic: commerce
categories: [b2b-commerce, field-service]
tags: [B2B Commerce, spare parts, installed base, assets, PLM, endpoint extensions]
takeaways:
  - "Entitlements in Salesforce B2B Commerce work per buyer group, not per serial number, so they cannot answer which parts fit one specific machine."
  - "One buyer group per machine fails on hard limits: 2,000 buyer entitlements per product and 20 buyer groups per buyer account by default."
  - "The robust option is a machine page: a custom Lightning web component lists the dealer's assets and the spare parts for each one from Salesforce or PLM."
  - "Filtering normal search results per machine is possible through endpoint extensions, but the base class is still labelled Beta and filtering afterwards leaves gaps in result pages."
  - "The dealer may only see machines registered to their own account, read from the asset record and never typed in as free text."
faq:
  - q: "Can B2B Commerce entitlements restrict parts by serial number?"
    a: "No. Entitlement policies give buyer groups access to products. A serial number is an attribute of an installed machine, usually an asset record, and in the B2B Commerce documentation I found no standard link between assets and entitlements."
  - q: "What is a machine page in a spare parts shop?"
    a: "A custom page in the store that lists the machines registered to the dealer's account and, for each machine, the spare parts that fit it. The parts list comes from asset records or live from PLM, and the dealer adds parts to the cart from there."
  - q: "What are Commerce endpoint extensions?"
    a: "Apex classes that change the request or the response of one Commerce Connect API endpoint, for example product search. Salesforce lists Commerce_Endpoint_Search_ProductSearch and Commerce_Endpoint_Catalog_Products among them. They cannot replace the endpoint's default behaviour."
  - q: "Can dealers see assets in an Experience Cloud store?"
    a: "Customer Community Plus and Partner Community licences include read, create and edit access to assets, according to Salesforce Help. Which assets a dealer sees is then a question of sharing, which should follow the account the machine is registered to."
draft: false
---

A Salesforce B2B Commerce store cannot filter spare parts by serial number out of the box. Entitlements decide visibility per buyer group, and hard limits rule out one group per machine. The way that works is a machine page: a custom component lists the machines registered to the dealer's account and shows the parts for each, from Salesforce assets or live from PLM, with an add-to-cart button. Filtering the normal search per machine is possible through endpoint extensions, but the base class is still labelled Beta. The data matters more than the component: without an as-built parts list per serial number, no store can answer the question.

## Why do entitlements not solve parts per machine?

In Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B" according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping), visibility works in a chain. A buyer account belongs to buyer groups, and [Trailhead on the data model](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) says that entitlement policies "define which products a buyer can see based on their buyer group memberships". That answers "may this dealer buy this part?", which is a question about the dealer.

"Does this part fit this machine?" is a question about the machine. A dealer with 40 installed machines from five series needs a different parts list for each one, and a seal that fits series A may also be orderable for series B as a spare. An entitlement says yes or no per product and buyer group, without a machine in between.

The obvious workaround is one buyer group per machine. The [entitlement limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html) and the [buyer group limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html) end that quickly:

```kennzahlen
2,000 | buyer entitlements per product, hard limit
20 | buyer groups per buyer account by default
30 | buyer groups per buyer account with an Apex extension
source: Salesforce Commerce developer guide, entitlement limits and buyer group limits
```

During search indexing "only the first two thousand buyer groups for a product are included in the index". A standard screw built into 6,000 machines would be findable for only a third of them. And a dealer with 40 machines fits neither limit per buyer account.

So entitlements stay what they are good at: which countries, tiers and brands may buy which parts. How to cut those groups is covered in [buyer groups and entitlements](../buyer-groups-entitlements-product-visibility/).

## Which data does a parts list per machine need?

Three sources, the same as for the [spare parts agent by serial number](../spare-parts-by-serial-number-ai/):

- **Installed base in Salesforce.** The machine as an asset with serial number, account and machine type, ideally as an asset hierarchy with main assemblies. This is the anchor for the dealer: which machines are mine?
- **As-built parts list from PLM.** The bill of materials of the delivered machine, with the variants and revisions actually installed, and a flag for spare-relevant positions.
- **Material data from the ERP.** Material number, successor material and sales status. Prices and availability come into the store through the usual pricing and inventory route.

The third source is the one projects forget. A part that PLM lists as built in may have been superseded years ago. If the successor is not resolved before the store shows it, the dealer orders a part that no longer exists. Consumed parts on completed work orders also change the machine over time; why they belong in the system is explained in [Field Service spare parts: ERP or Salesforce](../salesforce-field-service-spare-parts-erp/).

## Option A: a machine page with its own component

The machine page is the option I would start with. A Lightning web component on its own store page lists the assets of the logged-in buyer's account. The dealer picks a machine, sees its main assemblies and the spare-relevant positions, and adds parts to the cart. LWR stores, which Salesforce recommends for new stores, support only Lightning web components, according to the [LWR migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide/key-differences.html), so the component is built that way from the start.

Where the parts list comes from decides the effort:

- **From Salesforce.** Spare-relevant positions are stored per asset or per machine type, for example as child assets or a custom object. Fast and simple, but every position is a record to load and keep in step with PLM.
- **Live from PLM.** The component calls an Apex method, which calls a parts API in PLM or middleware for the serial number. No copy, always current, but PLM has to answer within the time a dealer waits for a page.

In both cases the component only shows part numbers. Whether the dealer may buy a part and at what price still comes from the store's entitlements and pricing. A part that PLM lists but the dealer's buyer group is not entitled to should appear as "on request", not disappear without comment.

The advantage of the machine page: it does not touch the standard search or product pages, so Salesforce releases rarely break it. The drawback: dealers who type a part number into the search box still see every part their buyer group may buy, fitting or not.

## Option B: filtering search and product lists per machine

Salesforce offers endpoint extensions for exactly this kind of change. According to the [extensions guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html), they "modify the request and response of the Connect API endpoint" but cannot replace its default behaviour. The [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) includes `Commerce_Endpoint_Search_ProductSearch` for product search and `Commerce_Endpoint_Catalog_Products` for product lists. An after method could remove from the response every product that is not in the parts list of the machine the dealer selected.

I would use this only as a second step, for three reasons:

1. **Beta status.** The [Apex reference](https://developer.salesforce.com/docs/commerce/salesforce-commerce/references/comm-apex-reference/BaseEndpointExtension.html) names the base class "BaseEndpointExtension (Beta)", also for API version 67.0. Salesforce does not guarantee that beta features become generally available.
2. **Distorted results.** Search returns at most 200 results per page, according to the [search limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html). If the extension removes 150 of them afterwards, the page shows 50, and in my assessment facet counts and total hits no longer match what the dealer sees.
3. **Speed.** Every search then needs the parts list of the selected machine. Without a cache in Salesforce, every keystroke ends in PLM.

A middle way avoids extensions: the machine page sets a search filter on an attribute such as machine series. That works only if parts carry the series as a filterable attribute and the series is precise enough. How attributes and synonyms for part numbers are set up is covered in [B2B Commerce search by part number](../b2b-commerce-search-part-numbers/).

## Who may see which machine?

This is the rule I would never relax: the dealer sees only machines registered to their own account. The serial number comes from the asset record shared with that account, never from a free text field. Otherwise one dealer reads the configuration of a machine another dealer sold.

On the licence side, [Salesforce Help on Experience Cloud licences](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) lists read, create and edit access to assets for Customer Community Plus and Partner Community. Which assets a buyer actually sees is a question of sharing. In practice that means: the asset's account must be the buyer account, or the dealer relation must be modelled so that sharing follows it. Machines sold through a dealer but registered to the end customer need a clear rule before the store goes live. Which portal licence covers what in Manufacturing Cloud is described in [the Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/).

## A typical scenario: 6,000 machines and 150 dealers

A typical scenario, as an assumption: a machine builder has 6,000 installed machines in eight series, 150 dealers and a PLM with as-built lists for machines delivered in the last ten years.

One buyer group per machine is ruled out by the limits above. One buyer group per series would mean up to eight groups per dealer, within the 20, but it only narrows the list to the series, not to the variant built into one machine.

The decision in the scenario: buyer groups stay per country and dealer tier. A machine page shows the dealer's assets and calls PLM live for the spare-relevant positions of the selected machine; the result is cached on the asset for a day. For machines older than ten years, the page falls back to the parts list of the machine series and says so. Search filtering by extension is postponed until the class is generally available.

## Where should you start?

```schritte
Check the data first
  Take 20 recent spare part orders and test whether serial number, asset and as-built list lead to the part that was ordered.
Clean up the asset sharing
  Settle which machines belong to which dealer account, including machines sold to end customers.
Build the parts API before the page
  The parts desk can use it first; the store, the [Field Service technicians](../salesforce-field-service-spare-parts-erp/) and an agent can reuse it later.
Start with the machine page
  Consider search filtering only when dealers ask for it.
```

The chapter [catalogue, search and entitlements](../../masterclass/b2b-commerce/catalog-search-entitlements/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) places this in the store design; which system leads for which data is the subject of [Salesforce integration](../../services/salesforce-integration/).

A spare parts shop shows the right parts per machine only as reliably as your serial numbers lead to an as-built list.
