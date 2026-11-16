---
title: "B2B Commerce pricing: what the GMV model costs"
metaTitle: "Salesforce B2B Commerce pricing: what the GMV model costs"
description: "Salesforce publishes no rate for B2B Commerce. How manufacturers model the GMV fee, Growth or Advanced, buyer licenses and the costs on top."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-commerce-pricing-gmv-model
translationKey: commerce-gmv-pricing
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: licences
tags: [B2B Commerce, pricing, GMV, licenses, Order Management, make-or-buy]
takeaways:
  - "B2B Commerce is available in Growth and Advanced editions. The fee is a percentage of gross merchandise value (GMV), and Salesforce publishes no rate."
  - "GMV is store revenue minus tax and shipping. Only orders through the commerce storefront count, not orders from EDI, phone or other channels."
  - "Growth includes 6 storefronts, Order Management Lite and 250K Data Cloud credits, Advanced 10 storefronts, full Order Management and 500K credits."
  - "Not in the fee: licenses for external users by role, Revenue Cloud Advanced for pricing logic, standalone Order Management, implementation and ERP integration."
  - "Get the GMV definition, rate, minimum and true-up rule in writing. The 1 to 2 percent figures are published by integrators, not by Salesforce."
faq:
  - q: "How much does Salesforce B2B Commerce cost?"
    a: "Salesforce publishes no price. Both the Growth and the Advanced Edition are listed as \"Contact for Pricing\", and the pricing page says Salesforce takes a percentage of gross merchandise value based on the functions you need. The rate is part of your quote."
  - q: "What counts as GMV in Salesforce B2B Commerce?"
    a: "According to the pricing page, GMV is the total revenue through your website minus tax and shipping. For Growth and Advanced, Salesforce calculates the GMV fee only on revenue going through the commerce storefront."
  - q: "What is the difference between B2B Commerce Growth and Advanced?"
    a: "Growth includes 6 storefronts, Order Management Lite, 250K Data Cloud credits and 3 CRM Analytics users. Advanced includes 10 storefronts, full Order Management, 500K credits and 5 users. Both include 20 inventory locations and Merchant Agent."
  - q: "Do I need extra licenses for buyers in B2B Commerce?"
    a: "Yes, depending on the role. According to Salesforce Help, buyers need an External Apps license or higher, while buyer managers and account switchers need Customer Community Plus or higher. On the Experience Cloud for Manufacturing price list, Customer Community Plus costs $35 per member or $15 per login per month, on top of the GMV fee."
  - q: "Is it true that B2B Commerce costs 1 or 2 percent of GMV?"
    a: "Integrators report about 1 percent for Growth and 2 percent for Advanced. Salesforce does not confirm these figures on its pricing page, which only says \"Contact for Pricing\". Use them as a rough starting point and replace them with the rate in your quote."
draft: false
---

Salesforce B2B Commerce has no list price. Both editions, Growth and Advanced, are listed as "Contact for Pricing", and the fee is a percentage of gross merchandise value (GMV): the revenue through the store minus tax and shipping. Salesforce publishes no percentage. So the cost grows with the success of the store, and for a manufacturer with several million in spare parts revenue the fee quickly becomes the largest item. Buyer licenses, possibly Revenue Cloud Advanced, standalone Order Management and the implementation are additional costs. I would plan using a range of rates and get the GMV definition in writing before signing.

## How does the GMV model work?

The [B2B Commerce pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) says: "We take a percentage of Gross Merchandise Value (GMV) based on commerce functionality needed." The FAQ on the same page defines GMV as "the total revenue through your website, minus tax and shipping". For Growth and Advanced, Salesforce charges GMV "for the revenue going through your commerce storefront only". The [German pricing page](https://www.salesforce.com/de/commerce/b2b-ecommerce/pricing/) says the same.

That has three consequences for a manufacturer:

- **Only store orders count.** Orders that still arrive by EDI, email or phone and are entered in the ERP are not GMV. Nor are orders that the sales team places on behalf of a dealer outside the store, as long as they are not placed through the storefront.
- **Tax and shipping are out.** How discounts, cancellations, returns and credit notes count, the pricing page does not say. The contract has to settle it.
- **The fee grows with adoption.** Every dealer you move from email to the store increases the fee. That is the point of the model, and it belongs in the business case.

Salesforce now also markets the product as "Agentforce Commerce for B2B", according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping). On the pricing page the editions are still called Commerce Cloud B2B Growth Edition and Commerce Cloud B2B Advanced Edition.

## Growth and Advanced compared

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

For most manufacturers, the decisive item is Order Management. [Order Management](https://trailhead.salesforce.com/content/learn/modules/scom-order-management/scom-som-get-started) is the Salesforce solution that processes an order after checkout: allocation to a location, fulfillment, changes and returns. If the ERP remains the system of record for the order, which is the normal case with SAP, and allocation, cancellations and returns are not intended to be handled in Salesforce, full Order Management usually adds little. The key question is which process steps Salesforce should take over. The storefront count matters when you run separate stores per brand or legal entity. To support countries and dealer tiers, buyer groups in one store are usually enough.

One rule applies to existing customers: the pricing page says customers who already use Order Management "will need to renew on Commerce Cloud Advanced". Upgrades during the contract term are possible.

## Buyer licenses, implementation and ERP integration come on top

This is where estimates go wrong most often. The GMV fee covers the store and the items above. The following items are additional costs:

1. **Licenses for external users.** According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.commerce_buyer_and_buyer_mgr_perm_sets.htm&language=en_US&type=5), buyers need an External Apps license or higher, while buyer managers and account switchers need Customer Community Plus or higher. For Customer Community Plus the [Experience Cloud for Manufacturing price list](https://www.salesforce.com/manufacturing/cloud/experience-cloud/) shows $35 per member or $15 per login per month, billed annually. Internal merchandisers and commerce admins can be assigned a permission set that, according to [Help](https://help.salesforce.com/s/articleView?id=sf.comm_personas.htm&language=en_US&type=5), can be paired with an Identity license.
2. **Advanced pricing.** Contract prices, pricing procedures and Request for Quote are available with Agentforce Revenue Management for B2B Commerce. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5), this requires a Commerce Growth or Advanced license plus a Revenue Cloud Advanced license.
3. **Order Management for other channels.** Orders from other channels or third-party systems that should be processed through Salesforce Order Management require a standalone Order Management purchase, says the pricing page.
4. **Implementation and ERP integration.** Catalog, entitlements, price calls, stock and order transfer to SAP are part of the implementation project and usually make up the largest one-off item.
5. **Consumption.** The editions include Data Cloud credits and list Merchant Agent. That does not mean all Agentforce usage is covered. Make sure the offer shows separately which Data 360 and Agentforce allowances are included and what overage costs. The [masterclass chapter on costs and tokens](/en/masterclass/ai-salesforce/costs-and-tokens/) explains how Flex Credits and Data 360 consumption add up.

## What do the 1 to 2 percent figures mean?

Integrators publish rates of about 1 percent of GMV for Growth and 2 percent for Advanced, for example [Elogic's pricing overview](https://elogic.co/blog/salesforce-pricing-plans).

```hinweis achtung
Salesforce does not confirm these figures: its pricing page shows "Contact for Pricing" for both editions. I treat them as a rough starting point for a first estimate and nothing more.
```

I would instead treat the rate as a variable in the calculation. Worked example: a manufacturer expects 15 million euros of spare parts revenue through the store in year three, net of tax and shipping. Every percentage point of GMV is then 150,000 euros a year. The difference between a quote at 1 percent and one at 2 percent is the salary of more than one inside sales employee. That is why the rate, not the license count, is what you negotiate.

Licenses for external users are still a significant cost, and the total depends on the role mix. In the same scenario with 250 dealers: if each dealer were assigned one buyer manager on a Customer Community Plus member license, that is 250 times $35 times 12, or $105,000 a year at list price. If External Apps is sufficient for most buyers, the cost is lower. If some dealers only order on a few days a month, a login license can be cheaper, because according to [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=sf.users_license_types_communities.htm&type=5) several logins on the same day consume only one login. Work out that split before the quote, not after it.

## What should be in the contract?

Before signing, I would get these points in writing:

- **The GMV definition.** Which orders count, how returns and credit notes are treated, which currency and exchange rate apply.
- **The rate and its base.** A fixed percentage, tiers by volume, or a minimum fee.
- **Minimum and true-up.** Whether there is a committed GMV, and what happens when the store sells more or less than planned. The pricing page says nothing about minimums.
- **Orders entered by sales.** Whether orders that inside sales places in the store on behalf of a dealer count as GMV.
- **Renewal.** Which edition you renew on, especially if Order Management is part of the plan.
- **Support.** Which Success Plan is included and what a higher one costs.

How the editions of the core platform affect a license plan is described in [Salesforce editions Core, Advanced, Max](/en/blog/salesforce-editions-core-advanced-max/). [Salesforce licenses: does everyone need a full one?](/en/blog/salesforce-licences-full-licence-needed/) explains which license type each user group needs.

## Calculate the fee at 1, 2 and 3 percent

Estimate store GMV for three years with a rising digital share, then calculate the fee at 1, 2 and 3 percent alongside licenses for external users, support and implementation. If the business case only works at the lowest rate, you know your negotiating position before the first call. The full calculation is in the [B2B webshop business case for manufacturers](/en/blog/b2b-webshop-business-case-manufacturers/), and the [masterclass chapter on whether B2B Commerce is worth it](/en/masterclass/b2b-commerce/b2b-commerce-worth-it-overview/) explains how pricing fits into the overall decision. An independent check of quotes is part of my work on [make-or-buy and license forecasts](/en/services/make-or-buy-licences/).
