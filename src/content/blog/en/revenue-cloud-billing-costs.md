---
title: "Revenue Cloud Billing costs: what billing events mean"
metaTitle: "Revenue Cloud Billing pricing: one billing event per $50"
description: "Revenue Cloud Billing is charged in billing events: one per $50 of posted invoice amount, and unused events expire. A worked estimate and order form tips."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: revenue-cloud-billing-costs
translationKey: revenue-cloud-billing-costs-billing-events
topic: revenue
categories: [revenue-cloud]
contactBrief: licences
tags: [revenue cloud billing, billing events, licenses, pricing, order form]
takeaways:
  - "Salesforce does not publish a price per billing event. Get the price, any tiers and the overage rate in writing on the order form before you sign."
  - "The invoice amount is the subtotal of posted invoices without tax but with shipping; other currencies are converted to US dollars at the average daily rate."
  - "Billing events must be used before the order end date and do not roll over, so check whether a multi-year order has one pool or annual pools."
  - "What you invoice through Billing drives the cost: high-value machine invoices consume many more events than subscription and service invoices."
faq:
  - q: "How much does Revenue Cloud Billing cost?"
    a: "Salesforce lists Revenue Cloud Billing as an add-on with 'Request a Quote' and does not publish a price per billing event. The consumption metric is public: one billing event per $50 of total invoice amount, according to the February 2026 rate sheet."
  - q: "What is a billing event in Revenue Cloud Billing?"
    a: "A billing event is the unit Salesforce uses to measure Revenue Cloud Billing consumption. The rate sheet counts 0.02 billing events per dollar of total invoice amount, for each dollar or portion thereof, which is one event per $50 before rounding."
  - q: "Do unused billing events roll over?"
    a: "No. According to the rate sheet, billing events must be used before the Order End Date shown in the usage details table of the order form, and no rollover is permitted."
  - q: "Does tax count toward the billing event calculation?"
    a: "No. The rate sheet counts the subtotal of posted invoices, which includes goods, services and shipping and handling, but excludes taxes."
draft: false
---

Revenue Cloud Billing is charged in billing events: according to the February 2026 rate sheet, one billing event is used for every $50 of total invoice amount. Billing is an add-on to Revenue Cloud, and Salesforce quotes its price only on request. The relevant amount is the subtotal of posted invoices, excluding tax and including shipping, and other currencies are converted to US dollars at the average daily rate. Unused events expire at the order end date. So the cost depends on the invoice volume you run through Billing, not on the number of users. Estimate that volume per year before you negotiate.

## How is Revenue Cloud Billing priced?

The [Revenue Cloud pricing page](https://www.salesforce.com/sales/cpq/pricing/) lists two editions and the Billing add-on, as of October 2026:

| Product | List price | Contents named on the page |
|---|---|---|
| Revenue Cloud Growth | €150 / $150 per user per month | Quoting & Configurator, Order Capture, Subscriptions |
| Revenue Cloud Advanced | €200 / $200 per user per month | Everything in Growth, Contracts & Orders, Consumption & Invoicing, AI & Analytics |
| Revenue Cloud Billing | Request a Quote | Usage Rating & Digital Wallet, Invoicing Engine & Document Production, Accounting Subledger |

The footnote says the add-on products "are sold separately from pre-requisite products and require an annual contract". The [EU pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) also lists Invoice Management as an add-on for Advanced, with "freemium access available". Salesforce Help and the Winter '27 developer documentation call the product family Revenue Management, and the product started as Revenue Lifecycle Management, so you may find all three names in Salesforce quotes.

The page does not explain where "Consumption & Invoicing" in Advanced ends and where Invoice Management or the Billing add-on begins. Ask your account executive to document that boundary for each feature you need. The editions themselves are covered in [Revenue Cloud pricing: Growth, Advanced and add-ons](../revenue-cloud-editions-pricing/).

## What is a billing event?

A billing event is the unit Salesforce uses to measure Revenue Cloud Billing consumption. The February 2026 [Revenue Cloud Billing rate sheet](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf) defines one usage type, "Invoicing", metered per $1 (or portion thereof) of total invoice amount:

```kennzahlen
0.02 | Multiplier: billing events per dollar of invoice amount
$50 | Invoice amount per billing event, before rounding
source: Revenue Cloud Billing rate sheet, February 2026
```

The entitlement appears in the usage details table of the order form. Billing events "must be used before the Order End Date", and no rollover is permitted. The rate sheet also says that usage types and multipliers may change over time. That is the same logic as with [Flex Credits for Agentforce](../flex-credits-agentforce-cost-per-action/): you buy a pool for the term and lose what you do not use.

## The subtotal without tax counts

The definitions in the rate sheet are short, and every word matters:

- **Total invoice amount** is the sum of all subtotals of invoices posted during the order term.
- **Invoice** means an invoice the customer posts through the service. Drafts and previews do not count, posted invoices do.
- **Subtotal** is the value of goods or services plus shipping and handling. Taxes are excluded.
- **Currency:** subtotals in other currencies are converted to US dollars at the average exchange rate of the day, from Salesforce's exchange rate provider at the time.

For a German manufacturer invoicing in euros, that means the event count also moves with the euro to dollar rate.

```hinweis offen
According to Salesforce Help, consumption is based on positive posted invoice line amounts, and voiding a posted invoice does not restore the consumed events. Three things the documents leave open: whether a separately posted credit memo reduces the counted amount, how the "portion thereof" rounding is applied, and what happens when you use more events than you bought. Ask for all three in writing.
```

## How do you estimate the cost?

The formula for a first estimate is simple: multiply positive posted invoice amounts per year in US dollars by 0.02. The hard part is the invoice volume.

Worked example: a machine builder plans to invoice remote monitoring subscriptions and maintenance contracts through Revenue Cloud Billing, €18 million a year excluding tax. For the estimate, I assume an exchange rate of 1.15 dollars per euro; that is an assumption, not a forecast.

| Scope in Billing | Subtotal per year | In USD at 1.15 | Billing events per year |
|---|---|---|---|
| Subscriptions and maintenance contracts | €18 million | $20.7 million | 414,000 |
| Plus machine invoices of €120 million | €138 million | $158.7 million | 3,174,000 |

The second row shows why scope drives the cost. Machine invoices would increase the event count by a factor of more than seven, for invoices that SAP creates anyway. That is one reason I keep machine invoices in SAP, as described in [Revenue Cloud Billing or SAP](../revenue-cloud-billing-or-sap-invoicing/).

Two effects are easy to miss. Invoice frequency matters little: twelve monthly invoices of $1,000 count about the same as one annual invoice of $12,000, unless rounding applies per invoice. For invoices in euros, timing can shift the result because of the daily exchange rate. Growth matters a lot: if recurring revenue grows by 20 percent a year, year three needs about 44 percent more events than year one.

The price per event comes from your quote, because Salesforce does not publish it. Multiply your event forecast by that price and compare the result with the cost of invoicing the same revenue in SAP, including the interface you would need for amendments.

## Tiers, overage and exchange rate belong on the order form

I would bring these points into the negotiation:

1. **Entitlement per contract year.** Ask whether a multi-year order has one pool or annual entitlements, and for a ramp that follows your forecast.
2. **Overage.** Get the price and the process for additional events in writing before you sign.
3. **Credit memos and rounding.** Clarify whether credit memos reduce the counted amount and whether rounding to $50 applies per invoice.
4. **Exchange rate.** The rate sheet uses the average daily rate from Salesforce's provider. Agree how you can check the conversion.
5. **Feature split.** Clarify which features you need come with Advanced, which come with Invoice Management and which come only with the Billing add-on.
6. **Renewal.** A price cap for the event price at renewal, because consumption usually grows.

License decisions like this belong in a license forecast with real numbers, not in the last week before signing. The same applies to user licenses, as described in [does everyone need a full license](../salesforce-licences-full-licence-needed/) and [Salesforce editions Core, Advanced, Max](../salesforce-editions-core-advanced-max/). Preparing such forecasts is part of [make-or-buy and license forecasts](../../services/make-or-buy-licences/).

## First step: finance owns the forecast

Finance has the invoice volumes per revenue type, sales knows the planned growth of subscriptions, and procurement negotiates. I would have finance own the number, because finance will also see the subledger and the invoices. The masterclass chapter [billing and usage-based pricing](../../masterclass/revenue-cloud/billing-and-usage-based-pricing/) shows where Billing fits into the rest of quote-to-cash.
