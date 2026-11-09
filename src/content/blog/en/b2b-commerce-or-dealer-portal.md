---
title: "B2B Commerce or dealer portal: when a shop pays off"
description: "When manufacturers need Salesforce B2B Commerce instead of an Experience Cloud portal: functions, buyer licenses and four criteria for the decision."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-commerce-or-dealer-portal
translationKey: commerce-shop-or-portal
topic: commerce
categories: [b2b-commerce, manufacturing-cloud]
tags: [B2B Commerce, Experience Cloud, dealer portal, Manufacturing Cloud, spare parts, licenses]
takeaways:
  - "A portal shows data and takes requests. B2B Commerce adds a catalog, visibility per buyer group, buyer prices, a cart and a checkout out of the box."
  - "A plain store buyer needs an External Apps license or higher. Buyer managers and account switchers need Customer Community Plus."
  - "A store pays off when dealers reorder known part numbers in volume and a large share of those orders still arrives by phone or email."
  - "Machines that need engineering stay with sales and quotes. Standard options and bundles can be sold through B2B Commerce with Revenue Management."
  - "In the worked example with 250 dealers and 30,000 order lines a year, the volume makes a store a good fit; the payback needs its own business case."
faq:
  - q: "What is the difference between a dealer portal and a B2B shop in Salesforce?"
    a: "A portal on Experience Cloud shows records such as orders, agreements and cases and takes requests through forms. Salesforce B2B Commerce adds a product catalog, visibility rules per buyer group, prices per buyer, a cart, a checkout and reordering from past orders."
  - q: "Which license do buyers need in Salesforce B2B Commerce?"
    a: "According to Salesforce Help, a buyer needs an External Apps license or higher with the Buyer permission set. A buyer manager, who sees other buyers' orders, switches accounts or uses reports, needs Customer Community Plus or higher with the Buyer Manager permission set."
  - q: "Can dealers order in a portal without B2B Commerce?"
    a: "Yes, a portal can take orders, for example as an order record or a form, and a team can build catalog or cart features with custom components. What it lacks out of the box is a searchable catalog with entitlements, price calculation per buyer and a cart. In my experience that is enough for occasional orders, not for hundreds of order lines a month."
  - q: "Is Salesforce B2B Commerce now called Agentforce Commerce?"
    a: "Trailhead says B2B Commerce is now Agentforce Commerce for B2B. Salesforce Help still calls the product Salesforce B2B Commerce, and the pricing page sells it as Commerce Cloud B2B Growth and Advanced Edition."
draft: false
---

A manufacturer needs Salesforce B2B Commerce instead of a portal when dealers and customers reorder known items in volume: spare parts, consumables, accessories. An Experience Cloud portal, optionally with Experience Cloud for Manufacturing, shows agreements, orders and cases and takes requests. A B2B store adds what repeat buying needs out of the box: a catalog, visibility per buyer group, buyer prices, a cart and a checkout. The main cost differences are the commerce fee and the implementation. My rule of thumb: if dealers send you order lists every week, build a store. If they call twice a year about a machine, a portal is enough.

## What does a portal do, and what does a store add?

A portal is an Experience Cloud site where external users see their own records and act on them. In [Manufacturing Cloud customer portal: what to show](../manufacturing-cloud-customer-portal/) I describe a portal where customers saw sales agreements, orders, master data and cases, and could request products and prices or place orders. That covers "show me" and "please do this for me".

Salesforce B2B Commerce covers "let me buy this myself". According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5), merchants launch a store from a template in Experience Builder and define search, carts and checkouts for business customers. The data model behind it, as [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) describes it:

- **Buyer accounts** are normal Salesforce accounts whose contacts are enabled as buyers.
- **Buyer groups** bundle similar buyer accounts, for example all premium dealers in one country.
- **Entitlement policies** define which products a buyer group sees in the store. For access control, external sharing on products should be private, or authenticated users can still find unentitled products through the API.
- **Price books** set the prices a buyer group gets.

On top of that come the cart, the checkout and the order summary that the buyer sees in the order history. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping), "Commerce Cloud is now Agentforce Commerce and B2B Commerce is now Agentforce Commerce for B2B." Help still says B2B Commerce, and the pricing page sells Commerce Cloud B2B Growth and Advanced Edition.

| Out of the box | Portal (Experience Cloud) | Salesforce B2B Commerce |
|---|---|---|
| Typical use | View records, request, report a case | Search, select, order, reorder |
| Products | Shown on records, catalog only as custom build | Catalog with search and filters |
| Who sees what | Sharing rules on records | Entitlement policies per buyer group |
| Prices | Shown if someone maintains them on records | Price books per buyer group, calculated in the cart |
| Ordering | Form or order record | Cart and checkout |
| Extra fee | None beyond licenses | Commerce edition, priced as a share of store GMV |

## Plain buyers need less than a portal user

Salesforce Help describes the [personas and permission sets](https://help.salesforce.com/s/articleView?id=commerce.commerce_buyer_and_buyer_mgr_perm_sets.htm&language=en_US&type=5) for a B2B store: a buyer needs an External Apps license or higher and gets the Buyer permission set. A buyer manager, who sees orders of other buyers, switches between accounts or uses reports, needs Customer Community Plus or higher and gets the Buyer Manager permission set. Delegated External User Administration comes in only where buyer managers administer other external users. Merchandisers and commerce admins who maintain the store internally use a standard internal license with the Merchandiser or Commerce Admin permission set.

For dealers, the license for a portal depends on what it does: Customer Community Plus fits ordering and service, Partner Community fits real partner sales with leads, opportunities and quotes. The US list prices of the [Experience Cloud for Manufacturing add-on](https://www.salesforce.com/manufacturing/cloud/experience-cloud/), billed annually, as of November 9, 2026:

```kennzahlen
$35 | Customer Community Plus per member per month
$15 | Customer Community Plus per login per month
$50 | Partner Community per member per month
$20 | Partner Community per login per month
source: Salesforce, Experience Cloud for Manufacturing add-on, US list prices, billed annually
```

So the buyer license rarely decides between portal and store; a store can even be cheaper per plain buyer. The difference is the commerce edition, which the pricing page lists as a share of the gross merchandise value through the store with prices on request, and the effort to build catalog, prices and ERP calls. I cover the fee in [B2B Commerce pricing: what the GMV model costs](../b2b-commerce-pricing-gmv-model/). How portal licenses compare to internal ones is in [Salesforce licenses: does everyone need a full one?](../salesforce-licences-full-licence-needed/).

## When does a shop pay off?

I look at four numbers before anyone talks about store templates:

1. **Repeat orders of known part numbers.** A store is strong when the buyer knows what they want: the filter they ordered last quarter, the wear part from the parts list. The more orders refer to a part number, the more a catalog helps.
2. **Order lines per year.** Every line typed in by inside sales costs time and carries a risk of error. In my experience a few hundred lines a year rarely justify a store, while tens of thousands often do. The payback depends on handling cost per line, error cost and how many dealers actually switch.
3. **Number of ordering dealers and customers.** With five large customers on EDI, a store adds little. With hundreds of small dealers ordering by email, it adds a lot.
4. **Share of phone and email orders.** This is the volume a store can actually move. Orders already coming through EDI stay there.

If you cannot get these numbers from the ERP within a week, I would collect them before any further step. They tell you whether a store fits; whether it pays off is a three-year calculation of fee, licenses, implementation and operations against saved time, fewer errors and extra margin, which I walk through in the [business case for a B2B webshop](../b2b-webshop-business-case-manufacturers/).

## Worked example: 250 dealers, 30,000 order lines a year

Assume a manufacturer of compressors sells through 250 dealers in Europe. The dealers order about 30,000 spare parts order lines a year, mostly by email with a part number list, some by phone. Inside sales enters each line in SAP. Dealers already use a portal for warranty cases.

That is about 120 lines per dealer and year, roughly ten a month. The dealers know their part numbers, they reorder the same wear parts, and they would order outside office hours if they could. Here a store is a good fit, and I would run the business case and keep the portal for cases. The [B2B Commerce section of Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5) has a guide for adding a B2B store to an existing Experience Cloud site, so portal and store can run on one site, provided the site uses a supported template, not a custom one, and has no store yet. Buyer group, catalog, price book and entitlement policy then have to be set up by hand.

Change one assumption: the same manufacturer has 20 dealers who order complete compressors twice a year, each with a different configuration. Then a store adds little. The dealer needs a quote, and the portal shows its status.

## Where is a portal enough?

A portal is the better answer in these cases:

- **Machines that need engineering.** A machine with a layout drawing and a delivery date that sales has to confirm belongs in a quote process. Standard options and configurable bundles can be sold in a store connected to Revenue Management, but that needs further licenses and a larger implementation.
- **Few orders, many questions.** If dealers mainly ask for status, documents or warranty, a portal with cases, orders and assets does the job.
- **Ordering already runs through EDI.** Large customers who send orders from their own ERP rarely switch to clicking in a store.

And sometimes Salesforce is not the answer at all. If the company has no Salesforce CRM, the store brings the whole platform with it. If the ERP vendor's own commerce module already covers your prices and stock, check that first. With a very small catalog and few dealers, a simple ordering form is cheaper than any shop system.

## First step: four numbers from twelve months of orders

Pull the four numbers for the last twelve months: order lines, share referring to a part number, ordering dealers, share by phone and email. If they point to a store, the next questions are who owns prices and stock, which buyer groups you need and which ERP calls must be live. They are in the [masterclass chapter on whether B2B Commerce is worth it](../../masterclass/b2b-commerce/b2b-commerce-worth-it-overview/). An independent view of make or buy is part of my work on [make-or-buy and license forecasts](../../services/make-or-buy-licences/).
