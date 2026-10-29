---
title: "B2B Commerce or dealer portal: when a shop pays off"
description: "When manufacturers need Salesforce B2B Commerce instead of an Experience Cloud or Manufacturing Cloud portal: functions, buyer licences and four criteria."
pubDate: 2026-10-28
lang: en
slug: b2b-commerce-or-dealer-portal
translationKey: commerce-shop-or-portal
topic: commerce
categories: [b2b-commerce, manufacturing-cloud]
tags: [B2B Commerce, Experience Cloud, dealer portal, Manufacturing Cloud, spare parts, licences]
takeaways:
  - "A portal on Experience Cloud or Manufacturing Cloud shows data and takes requests. Salesforce B2B Commerce adds a catalogue, product visibility per buyer group, buyer prices, a cart and a checkout."
  - "Buyers in a B2B store need a Customer Community Plus licence, the same licence family as a customer portal. At list price that is $35 per member or $15 per login per month."
  - "A store pays off when dealers reorder known part numbers in volume and a large share of those orders still arrives by phone or email."
  - "Configured machines stay with sales and quotes. A store sells what a dealer can order without a conversation."
  - "In a typical scenario with 250 dealers and 30,000 spare parts order lines a year, each dealer orders about ten lines a month, enough to justify a catalogue with a cart."
faq:
  - q: "What is the difference between a dealer portal and a B2B shop in Salesforce?"
    a: "A portal on Experience Cloud shows records such as orders, agreements and cases and takes requests through forms. Salesforce B2B Commerce adds a product catalogue, visibility rules per buyer group, prices per buyer, a cart, a checkout and reordering from past orders."
  - q: "Which licence do buyers need in Salesforce B2B Commerce?"
    a: "According to Trailhead, buyers and buyer managers use Customer Community Plus with the B2B Commerce User or B2B Commerce Super User permission. In Experience Cloud for Manufacturing the list price is $35 per member or $15 per login per month, billed annually."
  - q: "Can dealers order in a Manufacturing Cloud portal without B2B Commerce?"
    a: "Yes, a portal can take orders, for example as an order record or a form. What it lacks is a searchable catalogue with entitlements, price calculation per buyer and a cart. That is enough for occasional orders, not for hundreds of order lines a month."
  - q: "Is Salesforce B2B Commerce now called Agentforce Commerce?"
    a: "Trailhead says B2B Commerce is now Agentforce Commerce for B2B. Salesforce Help still calls the product Salesforce B2B Commerce, and the pricing page sells it as Commerce Cloud B2B Growth and Advanced Edition."
draft: false
---

A manufacturer needs Salesforce B2B Commerce instead of a portal when dealers and customers reorder known items in volume: spare parts, consumables, accessories. A portal on Experience Cloud or Manufacturing Cloud shows agreements, orders and cases and takes requests. A B2B store adds what repeat buying needs: a catalogue, visibility per buyer group, buyer prices, a cart and a checkout. The buyer licence is the same family in both cases. The difference in cost is the commerce fee and the implementation. My rule of thumb: if dealers send you order lists every week, build a store. If they call twice a year about a machine, a portal is enough.

## What does a portal do, and what does a store add?

A portal is an Experience Cloud site where external users see their own records and act on them. In [Manufacturing Cloud customer portal: what to show](../manufacturing-cloud-customer-portal/) I describe a portal where customers saw sales agreements, orders, master data and cases, and could request products and prices or place orders. That covers "show me" and "please do this for me".

Salesforce B2B Commerce covers "let me buy this myself". According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5), merchants launch a store from a template in Experience Builder and define search, carts and checkouts for business customers. The data model behind it, as [Trailhead](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-basics/b2b2c-data-model) describes it:

- **Buyer accounts** are normal Salesforce accounts whose contacts are enabled as buyers.
- **Buyer groups** bundle similar buyer accounts, for example all premium dealers in one country.
- **Entitlement policies** define which products a buyer group can see.
- **Price books** set the prices a buyer group gets.

On top of that come the cart, the checkout and the order summary that the buyer sees in the order history. Salesforce now also markets the product as "Agentforce Commerce for B2B", according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping). Help and the pricing page still use the older names.

| | Portal (Experience Cloud, Manufacturing Cloud) | Salesforce B2B Commerce |
|---|---|---|
| Typical use | View records, request, report a case | Search, select, order, reorder |
| Products | Shown on records, no catalogue | Catalogue with search and filters |
| Who sees what | Sharing rules on records | Entitlement policies per buyer group |
| Prices | Shown if someone maintains them on records | Price books per buyer group, calculated in the cart |
| Ordering | Form or order record | Cart and checkout |
| Extra fee | None beyond licences | Share of the store's revenue |

## Which licence do buyers need?

Here the two options are closer than many expect. Salesforce describes the personas and permissions for a B2B store like this: buyers and buyer managers use a Customer Community Plus licence. Buyers get the permission B2B Commerce User, buyer managers B2B Commerce Super User plus Delegated External User Administration, so they can look after the buyers of their own company. Merchandisers who maintain the store internally need the "B2B and D2C Commerce" licence.

Customer Community Plus is also the licence family for a customer portal. The list prices on the [Experience Cloud for Manufacturing price list](https://www.salesforce.com/manufacturing/cloud/experience-cloud/), billed annually:

```kennzahlen
$35 | Customer Community Plus per member per month
$15 | Customer Community Plus per login per month
$50 | Partner Community per member per month
$20 | Partner Community per login per month
source: Salesforce, Experience Cloud for Manufacturing price list, billed annually
```

So the buyer licence does not decide between portal and store. The difference is the commerce fee, which Salesforce charges as a share of the revenue through the store, and the effort to build catalogue, prices and ERP calls. I cover the fee in [B2B Commerce pricing: what the GMV model costs](../b2b-commerce-pricing-gmv-model/). How portal licences compare to internal ones is in [Salesforce licences: does everyone need a full one?](../salesforce-licences-full-licence-needed/).

## When does a shop pay off?

I look at four numbers before anyone talks about store templates:

1. **Repeat orders of known part numbers.** A store is strong when the buyer knows what they want: the filter they ordered last quarter, the wear part from the parts list. The more orders refer to a part number, the more a catalogue helps.
2. **Order lines per year.** Every line typed in by inside sales costs time and carries a risk of error. A few hundred lines a year do not justify a store. Tens of thousands usually do.
3. **Number of ordering dealers and customers.** With five large customers on EDI, a store adds little. With hundreds of small dealers ordering by email, it adds a lot.
4. **Share of phone and email orders.** This is the volume a store can actually move. Orders already coming through EDI stay there.

If you cannot get these numbers from the ERP within a week, I would collect them before any further step. They are also the basis for the [business case for a B2B webshop](../b2b-webshop-business-case-manufacturers/).

## A typical scenario, as an assumption

A typical scenario, as an assumption: a manufacturer of compressors sells through 250 dealers in Europe. The dealers order about 30,000 spare parts order lines a year, mostly by email with a part number list, some by phone. Inside sales enters each line in SAP. Dealers already use a portal for warranty cases.

That is about 120 lines per dealer and year, roughly ten a month. The dealers know their part numbers, they reorder the same wear parts, and they would order outside office hours if they could. Here I would build a store and keep the portal for cases. The [B2B Commerce section of Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_intro.htm&language=en_US&type=5) has a guide for adding a B2B store to an existing Experience Cloud site, so portal and store can run on one site.

Change one assumption: the same manufacturer has 20 dealers who order complete compressors twice a year, each with a different configuration. Then a store adds nothing. The dealer needs a quote, and the portal shows its status.

## Where is a portal enough?

A portal is the better answer in these cases:

- **Configured machines.** A machine with options, a layout drawing and a delivery date that sales has to confirm belongs in a quote process. A store sells what a buyer can order without a conversation.
- **Few orders, many questions.** If dealers mainly ask for status, documents or warranty, a portal with cases, orders and assets does the job.
- **Ordering already runs through EDI.** Large customers who send orders from their own ERP will not switch to clicking in a store.

And sometimes Salesforce is not the answer at all. If the company has no Salesforce CRM, the store brings the whole platform with it. If the ERP vendor's own commerce module already covers your prices and stock, check that first. With a very small catalogue and few dealers, a simple ordering form is cheaper than any shop system.

## Where should you start?

Pull the four numbers for the last twelve months: order lines, share referring to a part number, ordering dealers, share by phone and email. If they point to a store, the next questions are who owns prices and stock, which buyer groups you need and which ERP calls must be live. They are in the [masterclass chapter on whether B2B Commerce is worth it](../../masterclass/b2b-commerce/b2b-commerce-worth-it-overview/). An independent view of make or buy is part of my work on [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

A store pays off when dealers reorder known parts in volume, and a portal is enough when they mainly ask questions. If you want to check which one your dealers need, [send me a message](#contact).
