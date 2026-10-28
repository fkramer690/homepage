---
title: "Revenue Cloud Billing costs: what billing events mean"
description: "How Revenue Cloud Billing is charged: one billing event per $50 of invoice amount, no rollover, a worked estimate and what to settle on the order form."
pubDate: 2026-10-28
lang: en
slug: revenue-cloud-billing-costs
translationKey: revenue-cloud-billing-costs-billing-events
topic: revenue
categories: [revenue-cloud]
contactBrief: licences
tags: [revenue cloud billing, billing events, licences, pricing, order form]
takeaways:
  - "Revenue Cloud Billing is an add-on to Revenue Cloud with price on request; Salesforce publishes no price per billing event."
  - "According to the rate sheet of February 2026, one billing event is consumed for every $50 of total invoice amount, which is 0.02 events per dollar."
  - "The invoice amount is the subtotal of posted invoices without tax but with shipping; other currencies are converted to US dollars at the average daily rate."
  - "Billing events must be used before the order end date and do not roll over, so an entitlement sized for year three is wasted in year one."
  - "What you route through Billing drives the cost: high-value machine invoices consume many more events than subscription and service invoices."
faq:
  - q: "How much does Revenue Cloud Billing cost?"
    a: "Salesforce lists Revenue Cloud Billing as an add-on with 'Request a Quote' and publishes no price per billing event. The consumption is public: one billing event per $50 of total invoice amount, according to the rate sheet of February 2026."
  - q: "What is a billing event in Revenue Cloud Billing?"
    a: "A billing event is the unit Salesforce uses to measure Revenue Cloud Billing consumption. The rate sheet counts 0.02 billing events per dollar of total invoice amount, so one event per $50, including any partial $50."
  - q: "Do unused billing events roll over?"
    a: "No. According to the rate sheet, billing events must be used before the order end date in the usage details table of the order form, and no rollover is permitted."
  - q: "Does tax count toward the billing event calculation?"
    a: "No. The rate sheet counts the subtotal of posted invoices, which includes goods, services and shipping and handling, but excludes taxes."
draft: false
---

Revenue Cloud Billing is an add-on to Revenue Cloud, and Salesforce quotes it only on request. Consumption is measured in billing events: according to the rate sheet of February 2026, one billing event is used for every $50 of total invoice amount. The amount is the subtotal of posted invoices without tax but with shipping, and other currencies are converted to US dollars at the average daily rate. Unused events expire at the order end date. So the cost depends on the invoice volume you run through Billing, not on the number of users. Estimate that volume per year before you negotiate.

## How is Revenue Cloud Billing priced?

The [Revenue Cloud pricing page](https://www.salesforce.com/sales/cpq/pricing/) lists two editions and the Billing add-on, as of October 2026:

| Product | List price | Contents named on the page |
|---|---|---|
| Revenue Cloud Growth | €150 / $150 per user and month | Quoting & Configurator, Order Capture, Subscriptions |
| Revenue Cloud Advanced | €200 / $200 per user and month | Everything in Growth, Contracts & Orders, Consumption & Invoicing, AI & Analytics |
| Revenue Cloud Billing | Request a Quote | Usage Rating & Digital Wallet, Invoicing Engine & Document Production, Accounting Subledger |

The footnote says the add-on products "are sold separately from pre-requisite products and require an annual contract". The [EU pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) also lists Invoice Management as an add-on for Advanced, with "freemium access available". Salesforce Help and the Winter '27 developer documentation call the product family Revenue Management, and it started as Revenue Lifecycle Management, so you may find all three names in quotes.

The page does not explain where "Consumption & Invoicing" in Advanced ends and Invoice Management or the Billing add-on begins. Ask your account executive to put that line in writing, per feature you need. The editions themselves are covered in [Revenue Cloud pricing: Growth, Advanced and add-ons](../revenue-cloud-editions-pricing/).

## What is a billing event?

A billing event is the unit Salesforce uses to measure Revenue Cloud Billing. The [Revenue Cloud Billing rate sheet](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf) from February 2026 defines one usage type, "Invoicing", with this meter:

- **Unit:** per $1 (or portion thereof) of total invoice amount.
- **Multiplier:** 0.02.
- **Footnote:** one billing event is consumed for each $50 of total invoice amount, including any partial $50.

The entitlement is part of the order form, in the usage details table. Billing events "must be used before the Order End Date", and no rollover is permitted. The rate sheet also says that usage types and multipliers may change over time. That is the same logic as with [Flex Credits for Agentforce](../flex-credits-agentforce-cost-per-action/): you buy a pool for the term and lose what you do not use.

## What counts toward the invoice amount?

The definitions in the rate sheet are short, and every word matters:

- **Total invoice amount** is the sum of all subtotals of invoices posted during the order term.
- **Invoice** means an invoice the customer posts through the service. Drafts and previews do not count, posted invoices do.
- **Subtotal** is the value of goods or services plus shipping and handling. Taxes are excluded.
- **Currency:** subtotals in other currencies are converted to US dollars at the average exchange rate of the day, from Salesforce's exchange rate provider at the time.

For a German manufacturer invoicing in euros, that means the event count also moves with the euro to dollar rate. Three things the rate sheet does not answer: whether credit memos reduce the counted amount, whether the "portion thereof" rounding applies per invoice or to the total, and what happens when you use more events than you bought. Ask for all three in writing.

## How do you estimate the cost?

The formula is simple: invoice subtotal per year in US dollars, divided by 50. The hard part is the invoice volume.

A typical scenario, as an assumption: a machine builder plans to invoice remote monitoring subscriptions and maintenance contracts from Revenue Cloud Billing, €18 million a year without tax. For the estimate I assume an exchange rate of 1.15 dollars per euro; that is an assumption, not a forecast.

| Scope in Billing | Subtotal per year | In USD at 1.15 | Billing events per year |
|---|---|---|---|
| Subscriptions and maintenance contracts | €18 million | $20.7 million | 414,000 |
| Plus machine invoices of €120 million | €138 million | $158.7 million | 3,174,000 |

The second row shows why scope drives the cost. Machine invoices would multiply the event count by more than seven, for invoices that SAP creates anyway. That is one reason I keep machine invoices in SAP, as described in [Revenue Cloud Billing or SAP](../revenue-cloud-billing-or-sap-invoicing/).

Two effects are easy to miss. Invoice frequency hardly matters: twelve monthly invoices of €1,000 count about the same as one annual invoice of €12,000, unless rounding applies per invoice. Growth matters a lot: if recurring revenue grows by 20 percent a year, year three needs about 44 percent more events than year one.

The price per event comes from your quote, because Salesforce does not publish it. Multiply your event forecast by that price and compare the result with the cost of invoicing the same revenue from SAP, including the interface you would need for amendments.

## What should you settle on the order form?

I would take these points into the negotiation:

1. **Entitlement per contract year.** Ask for a ramp that follows your forecast instead of one pool sized for the last year.
2. **Overage.** Get the price and the process for additional events in writing before you sign.
3. **Credit memos and rounding.** Clarify whether credit memos reduce the counted amount and whether rounding to $50 applies per invoice.
4. **Exchange rate.** The rate sheet uses the average daily rate from Salesforce's provider. Agree how you can check the conversion.
5. **Feature split.** Which features you need come with Advanced, which with Invoice Management and which only with the Billing add-on.
6. **Renewal.** A price cap for the event price at renewal, because consumption usually grows.

Licence decisions like this belong in a licence forecast with real numbers, not in the last week before signature. The same applies to user licences, as described in [does everyone need a full licence](../salesforce-licences-full-licence-needed/) and [Salesforce editions Core, Advanced, Max](../salesforce-editions-core-advanced-max/). Preparing such forecasts is part of [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

## Who should own the forecast?

Finance has the invoice volumes per revenue type, sales knows the planned growth of subscriptions, and procurement negotiates. I would have finance own the number, because finance will also see the subledger and the invoices. The masterclass chapter [billing and usage-based pricing](../../masterclass/revenue-cloud/billing-and-usage-based-pricing/) shows where Billing fits into the rest of quote to cash.

Revenue Cloud Billing costs one billing event per $50 of invoice amount, so decide what you invoice in Salesforce before you negotiate the price. If you want a second view on your forecast or order form, [send me a message](#contact).
