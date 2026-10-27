---
title: "B2B Commerce pricing: what the GMV model costs"
description: "How Salesforce prices B2B Commerce as a share of GMV, what Growth and Advanced include and which costs come on top: buyer licences, Order Management, pricing."
pubDate: 2026-10-28
lang: en
slug: b2b-commerce-pricing-gmv-model
translationKey: commerce-gmv-pricing
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: licences
tags: [B2B Commerce, pricing, GMV, licences, Order Management, make-or-buy]
takeaways:
  - "Salesforce sells B2B Commerce as Growth and Advanced Edition, both at \"Contact for Pricing\". The fee is a percentage of gross merchandise value (GMV), and Salesforce publishes no percentage."
  - "GMV is the revenue through the store minus tax and shipping. Only orders placed through the commerce storefront count, not orders from EDI, phone or other channels."
  - "Growth includes 6 storefronts, Order Management Lite and 250K Data Cloud credits, Advanced 10 storefronts, full Order Management and 500K credits. Both include 20 inventory locations and Merchant Agent."
  - "Not in the fee: buyer licences, Revenue Cloud Advanced for advanced pricing, standalone Order Management for orders from other channels, implementation and ERP integration."
  - "Get the GMV definition, the rate, any minimum and the true-up rule in writing. Figures of 1 to 2 percent come from integrators and are not confirmed by Salesforce."
faq:
  - q: "How much does Salesforce B2B Commerce cost?"
    a: "Salesforce publishes no price. Both the Growth and the Advanced Edition show \"Contact for Pricing\", and the pricing page says Salesforce takes a percentage of gross merchandise value based on the functions you need. The rate is part of your quote."
  - q: "What counts as GMV in Salesforce B2B Commerce?"
    a: "According to the pricing page, GMV is the total revenue through your website minus tax and shipping. For Growth and Advanced, Salesforce charges GMV only for revenue going through the commerce storefront."
  - q: "What is the difference between B2B Commerce Growth and Advanced?"
    a: "Growth includes 6 storefronts, Order Management Lite, 250K Data Cloud credits and 3 CRM Analytics users. Advanced includes 10 storefronts, full Order Management, 500K credits and 5 users. Both include 20 inventory locations and Merchant Agent."
  - q: "Do I need extra licences for buyers in B2B Commerce?"
    a: "Yes. According to Trailhead, buyers and buyer managers need a Customer Community Plus licence. On the Experience Cloud for Manufacturing price list it costs $35 per member or $15 per login per month, billed annually, on top of the GMV fee."
  - q: "Is it true that B2B Commerce costs 1 or 2 percent of GMV?"
    a: "Integrators report about 1 percent for Growth and 2 percent for Advanced. Salesforce does not confirm these figures on its pricing page, which only says \"Contact for Pricing\". Use them as a rough starting point and replace them with the rate in your quote."
draft: false
---

Salesforce B2B Commerce has no list price. Both editions, Growth and Advanced, show "Contact for Pricing", and the fee is a percentage of gross merchandise value (GMV): the revenue through the store minus tax and shipping. Salesforce publishes no percentage. So the cost grows with the success of the store, and for a manufacturer with several million in spare parts revenue the fee quickly becomes the largest item. On top come buyer licences, possibly Revenue Cloud Advanced and standalone Order Management, and the implementation. I would plan with a range of rates and get the GMV definition in writing before signing.

## How does the GMV model work?

The [B2B Commerce pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) says: "We take a percentage of Gross Merchandise Value (GMV) based on commerce functionality needed." The FAQ on the same page defines GMV as "the total revenue through your website, minus tax and shipping". For Growth and Advanced, Salesforce charges GMV "for the revenue going through your commerce storefront only". The [German pricing page](https://www.salesforce.com/de/commerce/b2b-ecommerce/pricing/) says the same.

That has three consequences for a manufacturer:

- **Only store orders count.** Orders that still arrive by EDI, email or phone and are entered in the ERP are not GMV. Neither are orders that sales places on behalf of a dealer outside the store, as long as they do not go through the storefront.
- **Tax and shipping are out.** The base is the net merchandise value.
- **The fee grows with adoption.** Every dealer you move from email to the store raises the bill. That is the point of the model, and it belongs in the business case.

Salesforce now also markets the product as "Agentforce Commerce for B2B", according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping). On the pricing page the editions are still called Commerce Cloud B2B Growth Edition and Commerce Cloud B2B Advanced Edition.

## What do Growth and Advanced include?

The pricing page lists these items (October 2026):

| | Growth | Advanced |
|---|---|---|
| Storefronts | 6 | 10 |
| Inventory locations | 20 | 20 |
| Order Management | Order Management Lite | Full Order Management |
| Data Cloud for Commerce | Analytics and segmentation | Advanced analytics and segmentation |
| Data Cloud credits | 250K | 500K |
| Agentforce | Merchant Agent | Merchant Agent |
| CRM Analytics | 3 users | 5 users |
| Knowledge Management | 3 users | 5 users |

For most manufacturers the decisive line is Order Management. Order Management is the Salesforce solution that processes an order after checkout: allocation to a location, fulfilment, changes and returns. If the ERP stays the owner of the order, which is the normal case with SAP, full Order Management in Salesforce adds little. The storefront count matters when you run separate stores per brand or legal entity. For countries and dealer tiers, buyer groups in one store are usually enough.

One rule applies to existing customers: the pricing page says customers who already use Order Management "will need to renew on Commerce Cloud Advanced". Upgrades during the contract term are possible.

## What is not included in the fee?

This is where estimates go wrong most often. The GMV fee covers the store and the items above. These come on top:

1. **Buyer licences.** According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-roles-permissons-store-setup/define-personas-permissions), buyers and buyer managers need Customer Community Plus. The [Experience Cloud for Manufacturing price list](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) shows $35 per member or $15 per login per month, billed annually. Merchandisers need the "B2B and D2C Commerce" licence.
2. **Advanced pricing.** Contract prices, pricing procedures and Request for Quote come with Agentforce Revenue Management for B2B Commerce. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) it needs a Commerce Growth or Advanced licence plus a Revenue Cloud Advanced licence.
3. **Order Management for other channels.** Orders from other channels or third-party systems that should run through Salesforce Order Management need a standalone Order Management purchase, says the pricing page.
4. **Implementation and ERP integration.** Catalogue, entitlements, price calls, stock and order transfer to SAP are project work, usually the largest one-off item.
5. **Agent consumption beyond the included credits.** Data Cloud credits are included, but how far 250K or 500K go depends on your use. How Flex Credits and Data 360 consumption add up is in the [masterclass chapter on costs and tokens](../../masterclass/ai-salesforce/costs-and-tokens/).

## What do the 1 to 2 percent figures mean?

Integrators publish rates of about 1 percent of GMV for Growth and 2 percent for Advanced, for example [Elogic's pricing overview](https://elogic.co/blog/salesforce-pricing-plans). Salesforce does not confirm these figures: its pricing page shows "Contact for Pricing" for both editions. I treat them as a rough starting point for a first estimate and nothing more.

What I would rather do is calculate with the rate as a variable. A typical scenario, as an assumption: a manufacturer expects 15 million euros of spare parts revenue through the store in year three, net of tax and shipping. Every percentage point of GMV is then 150,000 euros a year. The difference between a quote at 1 percent and one at 2 percent is the salary of more than one inside sales employee. That is why the rate, not the licence count, is what you negotiate.

Buyer licences are still not small change. In the same scenario with 250 dealers and one buyer each on a member licence, that is 250 times $35 times 12, so $105,000 a year at list price. If some dealers only order on a few days a month, the login licence at $15 can be cheaper, because according to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) several logins on the same day consume only one login. Work out that split before the quote, not after it.

## What should be in the contract?

Before signing, I would get these points in writing:

- **The GMV definition.** Which orders count, how returns and credit notes are treated, which currency and exchange rate apply.
- **The rate and its base.** A fixed percentage, tiers by volume, or a minimum fee.
- **Minimum and true-up.** Whether there is a committed GMV, and what happens when the store sells more or less than planned. The pricing page says nothing about minimums.
- **Orders entered by sales.** Whether orders that inside sales places in the store on behalf of a dealer count as GMV.
- **Renewal.** Which edition you renew on, especially if Order Management is part of the plan.

How the editions of the core platform affect a licence plan is described in [Salesforce editions Core, Advanced, Max](../salesforce-editions-core-advanced-max/). Which licence type each user group needs is in [Salesforce licences: does everyone need a full one?](../salesforce-licences-full-licence-needed/).

## Where should you start?

Estimate store GMV for three years with a rising digital share, then calculate the fee at 1, 2 and 3 percent next to buyer licences and implementation. If the business case only works at the lowest rate, you know your negotiating position before the first call. The full calculation is in the [B2B webshop business case for manufacturers](../b2b-webshop-business-case-manufacturers/), and the place of pricing in the overall decision is in the [masterclass chapter on whether B2B Commerce is worth it](../../masterclass/b2b-commerce/b2b-commerce-worth-it-overview/). An independent check of quotes is part of my work on [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

The GMV fee is fair when the store sells, but only if you know the rate and the definition before you sign. If a B2B Commerce quote is on your desk, [send me a message](#contact).
