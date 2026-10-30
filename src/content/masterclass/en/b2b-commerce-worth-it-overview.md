---
title: "Is Salesforce B2B Commerce worth it for manufacturers?"
description: "What Salesforce B2B Commerce is, how the GMV model charges, when a portal is enough and what to decide before a partner builds your B2B store."
lang: en
slug: b2b-commerce-worth-it-overview
course: b2b-commerce
translationKey: commerce-01
chapter: 1
pubDate: 2026-10-28
short: "Is B2B Commerce worth it?"
summary: "What Salesforce B2B Commerce is, what it costs and when a portal or another shop system is enough."
takeaways:
  - "Salesforce B2B Commerce pays off when dealers and customers reorder known items such as spare parts, consumables and accessories in volume. Configured machines stay with sales."
  - "The store runs as an Experience Cloud site on the core platform. Buyer groups, entitlement policies and price books control who sees which product at which price."
  - "Salesforce charges a share of store revenue minus tax and shipping (GMV) and publishes no percentage. Buyer licences, implementation and ERP integration come on top."
  - "Aura store templates are only available to orgs enabled for Commerce before Spring '23. Salesforce has published no retirement date for Aura stores or the Visualforce package."
  - "Before the build, decide who owns prices and stock, which buyer groups exist, which store template you use and which ERP calls run live."
articles: [commerce-shop-or-portal, commerce-gmv-pricing, commerce-business-case, commerce-buyer-licences, commerce-versions-visualforce-aura-lwr, manufacturing-cloud-customer-portal, salesforce-licence-types]
faq:
  - q: "What is Salesforce B2B Commerce?"
    a: "Salesforce B2B Commerce is the Salesforce shop for business customers. The store runs as an Experience Cloud site and its data lives on the core platform: buyer accounts, buyer groups, entitlement policies, price books, cart, checkout and order summaries. Salesforce now also markets the product as Agentforce Commerce for B2B."
  - q: "How much does Salesforce B2B Commerce cost?"
    a: "Salesforce publishes no price. Growth and Advanced Edition both show \"Contact for Pricing\", and the fee is a percentage of gross merchandise value through the store. On top come buyer licences, which the Experience Cloud for Manufacturing price list shows at $35 per member or $15 per login per month for Customer Community Plus, plus implementation and ERP integration."
  - q: "Is a dealer portal enough instead of a B2B store?"
    a: "Yes, if dealers mainly look up status, documents, agreements and cases and only occasionally request something. If they regularly order hundreds of lines with known part numbers, a portal lacks a catalogue, visibility per buyer group, price calculation and a cart."
  - q: "Do I have to move an Aura store to LWR now?"
    a: "Not because of a deadline. As of 27 October 2026 Salesforce has published no retirement date for Aura stores or B2B Commerce for Visualforce. Salesforce recommends LWR for new stores. A move pays off when you need a feature that only exists there."
draft: false
---

Salesforce B2B Commerce pays off for manufacturers whose dealers and customers reorder known items in volume: spare parts, consumables, accessories. For configured machines it does not replace sales. The store runs as an Experience Cloud site, and buyer groups and price books control visibility and prices. Salesforce charges a share of store revenue and publishes no percentage; on top come buyer licences, implementation and the ERP integration, which in manufacturing is often the largest item. A portal is enough when dealers mostly ask rather than buy. Before a partner builds, settle who owns prices and stock, which buyer groups exist and which ERP calls run live.

## The path through the masterclass

The masterclass has five chapters. Each answers one decision and points to separate articles for the detail.

1. **Is B2B Commerce worth it?** This chapter: product, names, generations, costs, portal or shop.
2. **[Catalogue, search, entitlements](../catalog-search-entitlements/):** buyer groups, entitlements, product data and search by part number.
3. **[Prices, cart and checkout](../prices-cart-checkout/):** customer prices, request for quote, buying on account, reordering.
4. **[ERP integration](../erp-integration-stock-orders/):** which data comes live from SAP and who owns the order.
5. **[Agents, migration, rollout](../agentforce-migration-rollout/):** Buyer Agent, the path from Aura to LWR and rolling out to dealers in waves.

If you have one question, jump straight to the matching chapter. If you face the decision, read this one first.

## What is Salesforce B2B Commerce?

Salesforce B2B Commerce is the Salesforce shop for business customers. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5), you create the store from a template and design it in Experience Builder, while checkout and configuration use standard platform tools. Technically the store is an Experience Cloud site, and its data sits in the same objects as your CRM.

```vertiefung For admins
title: What does the data model look like?
The data model in one paragraph, as [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) describes it: a **buyer account** is a normal account whose contacts are enabled as buyers. **Buyer groups** bundle similar buyer accounts, for example all premium dealers in one country, and connect them to a store. **Entitlement policies** decide which products a buyer group sees, **price books** which prices it gets. The buyer puts products in the **cart**, completes the **checkout**, and the order appears as an **order summary** in the order history. According to the [developer docs](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html), an external system can own the lifecycle of that order summary; changes made there must then flow back into Salesforce. For manufacturers with SAP this is the normal case, more on it in chapter 4.
```

The advantage over a separate shop system is that accounts, contacts, cases and sales data are already in Salesforce. Inside sales sees the same orders as the dealer, and a service agent sees in the case what the customer bought last.

### Why the product has three names

You will find three names in documents. Trailhead says: "B2B Commerce is now Agentforce Commerce for B2B" ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping)). Salesforce Help still says "Salesforce B2B Commerce", and the [pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) sells the editions as Commerce Cloud B2B Growth and Advanced. They all mean the same product. In this masterclass I write Salesforce B2B Commerce. What matters is the name in the quote: have the edition and its scope confirmed under the name used on the pricing page.

## Which generation do you run?

Many manufacturers already have a shop on Salesforce, often set up by a partner years ago. There are three generations:

| Generation | Technology | As of October 2026 |
|---|---|---|
| B2B Commerce for Visualforce | Managed package from the CloudCraze acquisition | still supported according to Trailhead, no obligation to move |
| Aura store | Core platform, Experience Cloud site with Aura template | only for orgs enabled for Commerce before Spring '23 |
| LWR store | Core platform, Experience Cloud site with LWR template | recommended by Salesforce for new stores |

Salesforce announced the completion of the [CloudCraze acquisition](https://salesforce.com/news/stories/salesforce-completes-its-acquisition-of-cloudcraze/) in April 2018. On the Visualforce variant, Salesforce's training material said customers do not need to move and Salesforce will continue to support it. The note on Spring '23 and the recommendation for LWR are in the [migration guide](https://developer.salesforce.com/docs/commerce/lwr-migration/guide). As of 27 October 2026 Salesforce has published no retirement date for Aura stores or the Visualforce package; neither appears in the [list of active retirements](https://help.salesforce.com/s/articleView?id=000381744&language=en_US&type=1). So I plan by features: if your roadmap needs something Salesforce documents only for LWR, move. Otherwise invest in data and processes. How to find out within an hour what you run is in [B2B Commerce versions: Visualforce, Aura or LWR?](../../../blog/b2b-commerce-versions-visualforce-aura-lwr/).

## What does B2B Commerce cost?

Salesforce publishes no list price. Both editions show "Contact for Pricing" on the [pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/). The fee is a percentage of gross merchandise value (GMV), the revenue through the store minus tax and shipping. For Growth and Advanced only revenue through the commerce storefront counts, not orders by EDI, email or phone.

```hinweis offen
Salesforce publishes no percentage. Integrators report figures around 1 to 2 percent, which Salesforce does not confirm.
```

The pricing page lists this scope:

| | Growth | Advanced |
|---|---|---|
| Storefronts | 6 | 10 |
| Inventory locations | 20 | 20 |
| Order Management | Lite | full |
| Data Cloud credits | 250,000 | 500,000 |
| Agentforce | Merchant Agent | Merchant Agent |

For most manufacturers the Order Management row matters less than expected, because SAP owns the order. Orders from other channels that should run through Salesforce Order Management need a standalone Order Management purchase, according to the pricing page.

What the GMV fee does not cover:

| Item | What is behind it |
|---|---|
| Buyer licences | According to Salesforce, buyers and buyer managers need Customer Community Plus, merchandisers the "B2B and D2C Commerce" licence. The [Experience Cloud for Manufacturing price list](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) shows $35 per member or $15 per login per month, billed annually. Whether member or login is cheaper depends on login days, see [B2B Commerce buyer licences](../../../blog/b2b-commerce-buyer-licences/). How external licences differ from internal ones is in [Salesforce licences: does everyone need a full licence?](../../../blog/salesforce-licences-full-licence-needed/). |
| Advanced pricing logic | with Revenue Cloud, the topic of chapter 3. |
| Implementation and ERP integration | Catalogue, buyer groups, price and stock calls, order handover. |
| Consumption beyond the included credits | How Data Cloud and Flex Credits add up is explained in the [costs and tokens](../../ai-salesforce/costs-and-tokens/) chapter of the AI masterclass. |

```hinweis tipp
The GMV fee grows with the store's success. Every dealer you move from email into the shop raises the bill. So I always model three years with a rising digital share and the rate as a variable at 1, 2 and 3 percent. The detail is in [B2B Commerce pricing: what the GMV model costs](../../../blog/b2b-commerce-pricing-gmv-model/), and the full calculation with inside sales time and error costs in the [B2B webshop business case for manufacturers](../../../blog/b2b-webshop-business-case-manufacturers/). An assumed scenario there also shows that time savings alone rarely carry a shop. It usually pays off through additional revenue.
```

## Portal or shop: what do your dealers need?

A portal on Experience Cloud or Manufacturing Cloud shows records and takes requests. Customers see agreements, orders, master data and cases and send requests through forms. What such a portal looks like is in [Manufacturing Cloud customer portal](../../../blog/manufacturing-cloud-customer-portal/). A shop adds what repeat buying needs: a searchable catalogue, visibility per buyer group, prices per buyer, cart, checkout and reordering from past orders.

The buyer licence does not decide the question, since both use Customer Community Plus. The GMV fee and the implementation effort do. I look at four figures from the last twelve months:

1. order lines per year,
2. share of lines with a known part number,
3. number of ordering dealers and customers,
4. share of orders by phone and email.

A typical scenario, as an assumption: a compressor manufacturer has 250 dealers who order 30,000 spare parts lines a year, mostly as emails with part numbers. That is about ten lines per dealer per month. Here I would build a store and keep the existing portal for warranty and cases. If the same manufacturer had 20 dealers who buy a configured system twice a year, a store would add nothing. The system needs a quote, and the portal shows its status. The four criteria in detail are in [B2B Commerce or dealer portal: when a shop pays off](../../../blog/b2b-commerce-or-dealer-portal/). What Manufacturing Cloud offers for selling through dealers, from rebates to the partner portal, is covered in the [dealer and partner channel](../../manufacturing-cloud/dealer-and-partner-channel/) chapter of the Manufacturing Cloud masterclass.

## When is Salesforce not the answer?

Three cases where I would advise against Salesforce B2B Commerce:

- **No Salesforce CRM in the company.** The biggest advantage is the shared data with sales and service. Without a CRM you buy a platform for one shop, and other shop systems are at least equal candidates.
- **The ERP comes with its own commerce module** that knows prices, stock and credit limits without an interface. Check that first, because the ERP integration is the most expensive part of a Salesforce project.
- **Very small catalogue, few dealers.** With 200 items and 15 dealers, an order form in the portal or a list in the ERP costs less than any shop system with a revenue share.

## What do you decide before a partner builds?

Creating a store from the template is the smallest part of the project. The decisions that are expensive to change afterwards are yours:

| Decision | What you clarify |
|---|---|
| Who owns prices and stock? | Do dealer prices come from price books in Salesforce or live from SAP conditions? Is stock copied or called live? Chapters 3 and 4 answer this; decide it in writing before the first sprint. |
| Which buyer groups exist? | Group by country, dealer tier and brand, never one group per account. The limits are in chapter 2. |
| Which store template? | LWR for new stores, a feature-based decision for existing Aura stores. |
| Which ERP calls run live? | Price, availability, credit check and order handover need an ERP that answers fast. Settle this with the SAP team before the store design is fixed. |

These four points belong in a short document that you own, not the partner. How I support architecture decisions of this kind on the client side is described under [Salesforce architecture](../../../services/salesforce-architecture/). An independent review of quote and licence plan is part of [make or buy and licences](../../../services/make-or-buy-licences/). Continue with [chapter 2 on catalogue, search and entitlements](../catalog-search-entitlements/); all chapters are on the [overview page](../).

A B2B store on Salesforce pays off when dealers reorder known parts in volume and you have settled prices, stock and ERP calls before the build.
