---
title: "Revenue Cloud pricing: Growth, Advanced and add-ons"
description: "What Revenue Cloud Growth, Advanced, Billing and the add-ons cost in October 2026, what each contains and how a manufacturer works out which licences it needs."
pubDate: 2026-10-28
lang: en
slug: revenue-cloud-editions-pricing
translationKey: revenue-cloud-editions-pricing
topic: revenue
categories: [revenue-cloud, architecture]
contactBrief: licences
tags: [revenue cloud, pricing, licences, billing, make-or-buy]
takeaways:
  - "Revenue Cloud Growth costs €150 and Revenue Cloud Advanced €200 per user and month at list price, billed annually, as of October 2026."
  - "Revenue Cloud is bought on top of a Sales Cloud subscription, so a quoting user on Sales Cloud Core and Revenue Cloud Advanced costs €395 per month at list price."
  - "Contract Lifecycle Management, Dynamic Revenue Orchestration, Invoice Management and External User Support are add-ons; the last three are marked for Advanced."
  - "Revenue Cloud Billing has no published price and consumes one Billing Event per $50 of invoice amount, with no rollover past the order end date."
  - "The biggest lever is the number of licences, so group users by what they do in quotes before you compare editions."
faq:
  - q: "How much does Salesforce Revenue Cloud cost?"
    a: "According to the Salesforce pricing page (October 2026), Revenue Cloud Growth costs €150 or $150 and Revenue Cloud Advanced €200 or $200 per user and month, billed annually. Revenue Cloud Billing is priced on request."
  - q: "What is the difference between Revenue Cloud Growth and Advanced?"
    a: "Growth covers quoting with the configurator, order capture and subscriptions. Advanced adds contracts and orders, consumption and invoicing, and AI and analytics."
  - q: "Is Revenue Cloud included in Sales Cloud?"
    a: "No. The pricing page says Revenue Cloud is a paid add-on that you buy in addition to your Sales Cloud subscription."
  - q: "What does freemium access mean for Dynamic Revenue Orchestration?"
    a: "The pricing page marks Dynamic Revenue Orchestration and Invoice Management with 'Freemium access available' but does not say what is included. Ask for the included volume in writing before you plan with it."
  - q: "How is Revenue Cloud Billing charged?"
    a: "Through Billing Events. The rate sheet from February 2026 counts one Billing Event per $50 of total invoice amount, excluding tax and including shipping. The price per event is not published."
draft: false
---

Revenue Cloud costs €150 per user and month in the Growth edition and €200 in the Advanced edition at list price, billed annually, as of October 2026. Both come on top of a Sales Cloud subscription. Growth covers quoting with the configurator, order capture and subscriptions; Advanced adds contracts and orders, consumption and invoicing, and AI and analytics. Several functions are add-ons, and Revenue Cloud Billing is priced on request and charged by invoice volume. For most manufacturers the bigger question is not Growth or Advanced, but which users need a Revenue Cloud licence at all.

## What do Revenue Cloud Growth and Advanced cost?

The [Revenue Cloud pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/), last modified on 28 September 2026, lists these list prices per user and month, billed annually:

| Edition | EUR | USD | GBP | Contains |
|---|---|---|---|---|
| Revenue Cloud Growth | €150 | $150 | £120 | Quoting and configurator, order capture, subscriptions |
| Revenue Cloud Advanced | €200 | $200 | £160 | Everything in Growth plus contracts and orders, consumption and invoicing, AI and analytics |

Three details from the same page matter for the budget:

- **Sales Cloud is the prerequisite.** The FAQ says Revenue Cloud is a paid add-on bought in addition to a standard Sales Cloud subscription. With Sales Cloud Core at €195 per user and month according to the [Sales Cloud pricing page](https://www.salesforce.com/eu/sales/pricing/), a quoting user on Core and Advanced costs €395 a month at list price.
- **Annual contract.** The page states that the edition requires an annual contract.
- **Information only.** The prices are given "for information purposes only and subject to change". The quote decides.

There is no free trial. The FAQ points to hands-on workshops instead.

## What does each edition contain?

The edition cards on the pricing page name three features for Growth and three more for Advanced, as listed in the table above. Below them the page has a comparison table with these rows: product catalog and price management, product configurator, price and quote, order management, subscription and asset lifecycle, Advanced Approvals, Advanced Doc Gen, usage selling, Contract Lifecycle Management, Revenue Management Intelligence, Agentforce templates, Dynamic Revenue Orchestration, Invoice Management and External User Support.

Which of these rows are included in which edition I could not read reliably from the page, because the markers did not come through in the page text. I would therefore not plan with my own reading of the table, but ask Salesforce for the feature list per edition as part of the quote.

What the edition cards do show is enough for a first cut. For a manufacturer whose order goes to SAP and whose invoice stays in SAP FI, Growth may cover quoting with configured products and service subscriptions. If contracts, usage-based pricing or invoicing are to run in Salesforce, Advanced is the starting point. Which steps stay in SAP is the subject of [Revenue Cloud and SAP: who owns what in quote to cash?](../revenue-cloud-sap-quote-to-cash-ownership/).

## Which add-ons are there?

The comparison table marks four rows as "Available for purchase":

| Add-on | Marked in column | Note on the page |
|---|---|---|
| Contract Lifecycle Management | Growth | Advanced already contains contracts and orders |
| Dynamic Revenue Orchestration | Advanced | "Freemium access available" |
| Invoice Management | Advanced | "Freemium access available" |
| External User Support | Advanced | No further description |

"Freemium access" is not defined on the page. Dynamic Revenue Orchestration splits an order into fulfilment steps, for example a callout to SAP. If your design relies on it, ask what the free access covers and from which volume it costs money. External User Support is not described either. I would ask whether it covers dealers or customers who create quotes in a portal, because that changes the licence plan for a dealer network.

For contract management there is a second data point. Salesforce's older [billing pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/billing-pricing/), last modified in May 2025, lists Salesforce Contracts from $50 per user and month. The same page still lists CPQ from $75, although Salesforce no longer sells CPQ licences to new customers according to the [CPQ end-of-sale page](https://www.salesforce.com/sales/cpq/end-of-life/). Check the modification date of every pricing page you quote internally.

## How is Revenue Cloud Billing charged?

Revenue Cloud Billing is a separate add-on with the price "Request a Quote". According to the pricing page it contains usage rating and digital wallet, the invoicing engine with document production, and the accounting subledger. Add-ons are sold separately from their prerequisite products and need an annual contract.

Consumption is counted in Billing Events. The [rate sheet from February 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf) sets 0.02 Billing Events per $1 of total invoice amount, which is one event per $50. The subtotal includes shipping and handling and excludes taxes. Invoices in other currencies are converted to US dollars at the average daily rate. Events must be used before the order end date, and nothing rolls over.

An example as an assumption: a manufacturer invoices $20 million a year through Revenue Cloud Billing. That is 400,000 Billing Events. What one event costs is not public, so the budget only comes from the quote. How to estimate the volume and what to negotiate is covered in [Revenue Cloud Billing costs: what billing events mean](../revenue-cloud-billing-costs/).

## How many Revenue Cloud licences does a manufacturer need?

The edition decides the price per user. The licence forecast decides the number of users, and that has the bigger effect. I group users by what they do with quotes:

1. **Users who create and change quotes**, such as inside sales and project sales. They clearly need a Revenue Cloud licence.
2. **Users who only see quotes**, for example on the opportunity. Ask Salesforce in writing whether read access needs a Revenue Cloud licence.
3. **Approvers** of discounts and margins. Same question.
4. **Product management and pricing**, who maintain the catalog, rules and pricing procedures. Clarify which licence admins and maintainers need.
5. **Dealers and customers** who quote themselves. That is a question for External User Support or a portal licence.
6. **Finance** working in invoices. That belongs to the Billing add-on.

A typical scenario, as an assumption: a machine builder has 80 Sales Cloud users. 35 of them create quotes, the other 45 work on accounts and opportunities and look at quotes now and then. 35 users on Advanced cost 35 × €200 × 12 = €84,000 a year at list price, on Growth €63,000. If all 80 users got Advanced, it would be €192,000. The difference of €108,000 a year only holds if read access works without a Revenue Cloud licence, which is exactly why that question belongs in the quote.

Whether Growth and Advanced can be mixed in one org is not stated on the pricing page either. If only project sales needs contracts and usage, a mix would be the cheaper plan, so ask for it explicitly. How I build such a forecast in general is described in [Salesforce licences: does everyone need a full one?](../salesforce-licences-full-licence-needed/).

## What should you clarify before you sign?

List prices are a starting point, and Salesforce is changing its edition model across clouds. Sales Cloud now comes as Core, Advanced and Max, as described in [Salesforce editions Core, Advanced, Max for manufacturers](../salesforce-editions-core-advanced-max/). Before signing I would get these points in writing:

- the feature list per edition, row by row, as it applies to your contract,
- whether read-only users and approvers need a Revenue Cloud licence,
- whether Growth and Advanced can be mixed in one org,
- what "freemium access" includes for Dynamic Revenue Orchestration and Invoice Management,
- the price per Billing Event and the number of events included,
- a price cap for the renewal.

Whether Revenue Cloud pays off at all is covered in [Revenue Cloud for manufacturers: when is it worth it?](../revenue-cloud-worth-it-manufacturers/), and the [overview chapter of the Revenue Cloud masterclass](../../masterclass/revenue-cloud/revenue-cloud-overview/) puts pricing next to the other decisions. Licence forecasts are part of my work in [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

The list price per user matters less than the number of users and the add-ons you really need. If you have a Revenue Cloud quote on the table and want it checked independently, [send me a message](#contact).
