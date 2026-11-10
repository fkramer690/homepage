---
title: "Salesforce renewal negotiation: start early"
metaTitle: "Salesforce Renewal Negotiation: Licenses, Terms, Timing"
description: "Renewing a Salesforce contract: what the Main Services Agreement says about notice, reductions and prices, and how to negotiate licenses before renewal."
pubDate: 2026-11-23
lang: en
slug: salesforce-renewal-negotiation
translationKey: salesforce-renewal-negotiation
topic: governance
categories: [architecture]
contactBrief: licences
tags: [licenses, contract renewal, renewal, negotiation, license forecast, make or buy]
takeaways:
  - "Unless notice is given 30 days before the end of the term, a Salesforce subscription renews automatically for one year under the Main Services Agreement."
  - "If you reduce license quantities or the term at renewal, the Main Services Agreement no longer entitles you to the previous per-unit price."
  - "You pay for user licenses by quantity purchased, not by usage. A forecast based on what users do in the system should be ready before you request the offer."
  - "Salesforce's fiscal year ends on 31 January. With a clear roadmap, you can often add products planned for the next two to three years at that point."
faq:
  - q: "Can I reduce Salesforce licenses during the term?"
    a: "Not under the Salesforce Main Services Agreement: quantities purchased cannot be decreased during the subscription term. Without a right agreed in your contract, you can reduce quantities only at renewal, and then Salesforce may re-price the remaining licenses."
  - q: "When do I have to give notice on a Salesforce contract?"
    a: "Unless your order form says otherwise, a subscription renews automatically for one year if neither party gives written notice of non-renewal at least 30 days before the end of the term. The Main Services Agreement allows email for this; send it to the address named in the contract and obtain confirmation of receipt."
  - q: "Does the Salesforce price go up automatically at renewal?"
    a: "Promotional and one-time prices renew at the list price then in effect under the Main Services Agreement, and Salesforce raises list prices from time to time, for example by an average of 6 percent for Enterprise and Unlimited Editions of Sales Cloud, Service Cloud and Field Service on 1 August 2025. Written terms in the order form, such as a price cap or fixed per-unit prices, protect you."
  - q: "Do I need a license advisor for a Salesforce negotiation?"
    a: "A license advisor understands discounts, but rarely knows what your users do in Salesforce. The biggest lever is usually the license forecast per user group, and that requires someone who knows the org and the processes and does not sell licenses."
draft: false
---

The best time to start a Salesforce renewal negotiation is four to six months before the contract ends, and earlier for large contracts or when a reduction is planned. Bring a license forecast based on what your users do in the system, your roadmap for the next two to three years and the rules of your contract. The Salesforce Main Services Agreement renews subscriptions automatically unless notice is given, does not allow reductions during the term and permits new pricing when you buy fewer licenses. If you only start once the renewal quote arrives, all that is left to negotiate is the discount.

## What the Salesforce contract says about renewal

A Salesforce contract consists, at a minimum, of the Main Services Agreement and the order form with products, quantities, prices and term; amendments and product-specific terms may also apply. The current [Salesforce Main Services Agreement](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/legal/salesforce_MSA.pdf), last updated on 15 October 2026, contains four rules that shape every renewal:

```tabelle
title: Renewal rules in the Salesforce Main Services Agreement
columns: Rule | What the contract says | What it means for you
You pay for what you purchase | Fees are based on subscriptions purchased, not on actual usage | Unused licenses cost money until the end of the term
No reduction | Quantities purchased cannot be decreased during the term | You pay for any excess purchases until renewal
Automatic renewal | Without notice at least 30 days before the end of the term, the subscription renews for one year | Miss the deadline and you are bound for another year
New prices for lower volume | Fewer licenses or a shorter term allow re-pricing, promotional prices renew at the list price * | The previous discount is not an entitlement
note: These rules apply unless your order form or amendments say otherwise. The version your signed contract refers to is the one that counts.
```

The fourth rule is the one that surprises people most in negotiations. It is in the section on the term and says that any renewal with a lower volume or a shorter term is re-priced without regard to the previous per-unit price.

```hinweis offen
Have the price cap for the next renewal, the treatment of reductions and the notice period written into the order form. Commitments that only exist in an email offer little protection at the next renewal.
```

## Why fewer licenses can cost more than expected

Many companies start renewal planning with the aim of cutting licenses. That makes sense when users do not need them, but the saving is often smaller than expected.

Worked example: you have 200 licenses at a list price of 100 euros per user per month with a 25 percent discount, so 75 euros. That is 180,000 euros a year. You reduce to 150 licenses and expect 135,000 euros, so 45,000 euros less. If Salesforce re-prices the 150 licenses, say, with a 10 percent discount, you pay 162,000 euros. The saving shrinks to 18,000 euros.

So when you reduce, negotiate the per-unit prices of the remaining licenses explicitly and have them written into the order form. What counts for Salesforce is contract volume. If it stays stable because products from your roadmap are added, you have more room to negotiate per-unit prices than with a straightforward reduction. Still compare the options by total cost over the term: a new product nobody uses makes the deal expensive, whatever its per-unit price.

## How many licenses do you need?

```praxis
From my pre-sales work with Salesforce I know the other side of the table. The list price is a starting point and rarely the final offer. Full licenses are offered by default, including for users who only read data or approve records. With large user groups the difference can easily reach six figures a year.
```

A license forecast starts in your own org. Your admin can pull this data together in a few days:

- **Purchased and assigned licenses.** In Setup under Company Information, you can find the purchased, used and remaining licenses by license type. "Used" only means a user has the license, not that the user uses it.
- **Last login.** Active users who have not logged in for months still cost you money.
- **What users do in the system.** Users who work with leads and opportunities or handle cases as service agents need a Sales or Service Cloud license. Users who only read, approve or work with custom objects can often use a Platform license; the license type determines which objects they can access. The license types and their limits are in [Salesforce licenses: does everyone need a full one?](../salesforce-licences-full-licence-needed/).
- **Add-on licenses.** Permission set licenses and feature licenses for add-ons that were purchased but are rarely assigned. You can only reduce costs for items that appear as their own line items in the order form.
- **Integrations.** Interfaces that still run via a user with a full license. How to clean that up is described in [Salesforce Integration User: remove admin rights](../salesforce-integration-users-cleanup/).
- **Growth.** Countries, plants or business units that join in the next two to three years.

The result is a forecast by user group that you compare with the Salesforce offer. At manufacturers, the largest user groups are usually sales, inside sales, customer service and field service, plus many users in production, quality or purchasing who only view or approve data.

## When is the best time to negotiate?

Salesforce's fiscal year ends on 31 January, as the [results for fiscal year 2026](https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Fourth-Quarter-Fiscal-2026-Results/default.aspx) show. At fiscal year-end or during promotions, there is often scope to add products planned for the next two to three years of your roadmap at little extra cost.

```kennzahlen
31 Jan | End of the Salesforce fiscal year
30 days | Notice period before the end of the term, unless the order form says otherwise
1 year | Automatic renewal without notice
6 % | Average list price increase on 1 August 2025 for Enterprise and Unlimited Editions of Sales Cloud, Service Cloud and Field Service
source: Salesforce Main Services Agreement (as of 15 Oct 2026), Salesforce Investor Relations, Salesforce newsroom "Pricing Update" 2025
```

Year-end only helps if you know your roadmap: which countries, plants or business units will join, when, and which clouds they will need. Without a roadmap, you risk buying shelfware at year-end: licenses that are paid for but never used. So only buy a product with a start date and an owner; if both are still undecided, negotiate a price commitment for a later purchase instead. When you buy more, also ask whether the new line items run until your existing contract end date, so you only have one renewal date in the future.

## Factor list price increases into the negotiation

Salesforce raised the list prices of the Enterprise and Unlimited Editions for Sales Cloud, Service Cloud, Field Service and select Industries clouds by an average of 6 percent on 1 August 2025; Foundations, Starter and Pro stayed unchanged ([Salesforce newsroom](https://www.salesforce.com/news/stories/pricing-update-2025/)). For your renewal, what counts is your order form. If you have promotional or one-time prices, they renew at the list price then in effect under the Main Services Agreement.

So negotiate a cap on the price increase at the next renewal, for every line item you expect to keep. In a multi-year contract, also agree which prices apply to licenses you buy during the term.

## What Salesforce sells alongside the renewal

For the account executive, a renewal is a chance to sell new products: a higher edition, Agentforce add-ons or an industry cloud. That can be appropriate if it fits your roadmap. The editions and what they include are described in [Salesforce editions Core, Advanced, Max for manufacturers](../salesforce-editions-core-advanced-max/).

Check every new product with the same questions as in a [fit-gap analysis](../fit-gap-analysis-salesforce/): which requirement does it cover that you do not cover today, who will use it, and from when? For Agentforce, business value and data quality are my first priorities. My first Agentforce pilot was a green banana, too early for what the product could do at the time. Buy Agentforce capacity for a clearly defined use case with clean data, as set out in [Agentforce pilots: business value and data quality first](../agentforce-business-value-data-quality-first/), and clarify beforehand how consumption is measured and what happens to unused credit. The billing models are explained in [Agentforce costs for manufacturers](../flex-credits-agentforce-cost-per-action/).

## Timeline for a Salesforce contract renewal

Count backwards from the end of the contract:

```schritte
Take stock | 6 months before · client
  Read the order form, extract license, add-on and usage data from the org.
Forecast and roadmap | 5 months before · client and architect
  Define the license type per user group and demand for the next two to three years.
Request the offer | 4 months before · procurement
  Based on the forecast and roadmap, with a per-unit price for each line item.
Negotiate | 2 to 3 months before · procurement and IT
  Agree the discount, price cap, term and rules for reductions.
Check the order form | before signing · procurement and legal
  Put deadlines, prices and commitments in writing and enter the notice date in the calendar.
```

The 30-day notice period marks the last day on which you can still prevent an automatic renewal. If you only start negotiating then, you negotiate under time pressure.

## Who negotiates on the client side

Your procurement team negotiates the contract. IT has to define what belongs in the offer: which users need which license, which products will be added within two years and which ones nobody uses today. The Salesforce account executive calculates too, but from Salesforce's perspective. A license advisor understands discounts, but rarely knows what your users do in the org.

I review offers using what I know from pre-sales work, do not sell licenses myself and take no commissions from Salesforce, tool vendors or implementation partners. I explain how a license check works on the page [license check and make or buy](../../services/make-or-buy-licences/).

## First step: list users who have not logged in for 90 days

Have your Salesforce admin create a report this week listing all active users who have not logged in for 90 days, with license type and department. The last login field is on every user record. The list shows candidates: before changing anything, check whether a user owns records, approves records or is used for an integration. Then decide for each user whether to deactivate them, move them to a cheaper license type or keep them on purpose, and reduce the purchased quantity at renewal.
