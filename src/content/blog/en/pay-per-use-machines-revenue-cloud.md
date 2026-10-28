---
title: "Pay-per-use for machines: billing with Revenue Cloud"
description: "Can a machine builder bill operating hours with Revenue Cloud Usage Management? How rating works, where machine data comes from and what the contract must say."
pubDate: 2026-10-28
lang: en
slug: pay-per-use-machines-revenue-cloud
translationKey: usage-based-pricing-machines-revenue-cloud
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, pay-per-use, usage management, billing, IoT, manufacturing]
takeaways:
  - "Revenue Cloud Usage Management can rate machine hours or output with grants, rate cards and wallets and hands a liable summary to billing; Salesforce's own examples are cloud storage and mobile plans."
  - "The hard part of pay-per-use for machines sits outside Salesforce: one reliable counter per machine from the IoT platform, mapped to a serial number and checked before it is rated."
  - "Send one usage record per machine and day into Salesforce, never raw sensor readings; time series stay in the IoT platform or historian."
  - "The contract must define what counts as usage, which counter is binding, how data gaps are handled and the minimum fee, before anyone configures a rate card."
  - "Usage rating is listed in the Revenue Cloud Billing add-on, priced on request and charged in Billing Events, one per $50 of invoice subtotal."
faq:
  - q: "Can Salesforce Revenue Cloud bill machine operating hours?"
    a: "Yes, technically. Usage Management lets you define a usage resource such as operating hours, sell it with a grant and an overage rate, and rate the recorded usage into a liable summary for billing. Salesforce documents examples from cloud storage and telecoms, so the machine data feed is your own integration work."
  - q: "What is a liable summary in Revenue Cloud?"
    a: "According to Trailhead, the liable summary is the final amount a customer owes for usage in a period. It is created from the rated usage records, for example by the scheduled Orchestrate Usage Management flow, and is passed to billing for the invoice."
  - q: "Where does the usage data for pay-per-use come from?"
    a: "From the machine, usually through the controller and an IoT platform or historian. Salesforce receives time-stamped usage records with account, product, resource and quantity. Mapping each counter to a serial number and checking it for gaps and resets is part of your integration."
  - q: "Which licence do I need for usage-based billing in Revenue Cloud?"
    a: "The pricing pages list Consumption & Invoicing in Revenue Cloud Advanced and Usage Rating & Digital Wallet in the Revenue Cloud Billing add-on, which is priced on request. Confirm in the order form which licence covers rating and invoicing in your case."
draft: false
---

A machine builder can bill operating hours or output per use with Revenue Cloud. Usage Management defines what is measured, rates it with grants and rate cards, tracks balances in wallets and passes a liable summary to billing. Salesforce documents this with cloud storage and mobile plans, though, and the difficult part for machines lies outside Salesforce: one trustworthy counter per machine, mapped to a serial number and checked before it is rated, plus a contract that says what counts as an hour. I would use Revenue Cloud for pay-per-use only when that data feed exists and the usage invoice comes from Salesforce anyway.

## What does Revenue Cloud Usage Management do?

Usage Management is the part of Revenue Cloud for consumption-based products. Trailhead still calls the product "Agentforce Revenue Management", the Winter '27 developer guide says "Revenue Management", the pricing pages say Revenue Cloud. According to the [Trailhead unit on Usage Management](https://trailhead.salesforce.com/content/learn/modules/usage-management-foundations/get-to-know-usage-management), it lets companies "define, measure, rate, and bill for consumption-based products" and connects quoting, assets and billing.

The [components and personas unit](https://trailhead.salesforce.com/content/learn/modules/usage-management-foundations/explore-components-and-personas) names five building blocks:

| Component | What it does |
|---|---|
| Usage modelling | Consumable products, usage resources, units of measure, usage grants |
| Rate management | Rules that turn usage into charges |
| Usage selling | Quote, order and activate usage products |
| Wallet management | One wallet per purchased usage resource and account, with balances |
| Consumption management | Tracks consumption and produces invoice-ready summaries |

The flow behind it: raw usage events land in the transaction journal. Usage records are checked against the wallet, summarised by day, week, month or billing cycle and rated with the rate card. The liable summary is the final amount the customer owes; the Orchestrate Usage Management flow can create it on a schedule. Billing then turns it into an invoice. The [developer guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/usage_management_overview.htm) lists Usage Management for Enterprise, Unlimited and Developer Editions in Lightning Experience.

## How do grants, rate cards and overage fit a machine?

The [unit on usage resources and grants](https://trailhead.salesforce.com/content/learn/modules/usage-management-with-agentforce-revenue-management/create-usage-resources-and-grants) uses a mobile plan with texts, data and minutes. Translated to a machine, it looks like this:

- **Usage resource:** operating hours, with the unit of measure hour. Pieces produced or cycles would be a second resource.
- **Product usage resource:** links the sold product, for example "compressor on pay-per-use", to the resource. One product can carry several resources.
- **Product usage grant:** the included allowance, such as 300 hours per month, with a validity period, a rollover policy for unused hours and a drawdown order.
- **Overage:** a grant marked as overage chargeable lets usage above the allowance be charged at the rate card price.
- **Rate card:** flat or tiered prices per resource, with entries that can depend on quantity or attributes such as region or customer type.

Wallets can raise alerts, block further usage or offer a top-up when a balance runs out. For machines I would use only the alerts. Blocking in Salesforce does not stop a compressor, and switching off a customer's machine because of a billing balance belongs in the contract and the controller, if anywhere.

## Where does the machine data come from?

Salesforce expects time-stamped usage records with customer, product, resource and quantity. How they get there from a machine is your integration. In a typical setup the controller reports to an IoT platform or historian, which keeps the time series. From there a job sends one aggregated record per machine and day into Salesforce.

Between the two systems sit the checks that decide whether the invoice holds:

1. **Serial number to asset and account.** Every counter must point to the asset that was sold to a specific customer. Machines that were moved or resold break this first.
2. **Counter resets.** After a controller swap the counter starts at zero again. A negative delta must stop the record, not create a credit.
3. **Gaps.** A machine offline for three days sends nothing, then a large jump. The contract decides whether that is allowed.
4. **Duplicates.** A retried transfer must not bill the same day twice.

Raw readings do not belong in Salesforce. The same rule applies to [predictive maintenance](../predictive-maintenance-salesforce-data-needed/), where streaming raw data through Data 360 gets expensive fast. The daily operating-hours counter is also what Field Service needs for maintenance by usage, so one feed can serve both; the Field Service view is in the [chapter on assets and maintenance](../../masterclass/field-service/field-service-assets-maintenance-parts/). How I would design that interface is part of my work on [Salesforce integration](../../services/salesforce-integration/).

## A typical scenario, as an assumption

A compressor maker offers 120 compressors at 40 customers on pay-per-use. Each contract has a monthly base fee that includes 300 operating hours, extra hours are charged in two tiers, and invoices go out monthly in arrears.

In Revenue Cloud the base fee is a subscription, the operating hours are a usage resource with a grant of 300 hours per month that does not roll over, and the rate card holds the two tiers. When the order is activated, each customer gets an asset and a wallet for operating hours. The IoT platform sends one record per compressor and day. At month end the scheduled flow rates the usage, the liable summary goes to billing, and the customer receives one invoice with base fee and overage.

In such a setup the errors usually come from the data: two compressors swapped between sites, a counter replaced during service, a customer who disputes 40 hours from a week the machine stood still.

## What must the pay-per-use contract define?

Before anyone builds a rate card, legal, finance and sales have to agree on these points:

- **The unit.** Operating hours, load hours, cycles or good parts. Load hours and good parts are fairer to the customer and harder to measure.
- **The binding counter.** Which device and which system count for the invoice, and who may correct it.
- **Gaps and failures.** Estimated values, last known value or no charge for periods without data.
- **Minimum fee.** A base fee or a minimum quantity protects your financing of the machine. Without one, a customer can park the machine for a quarter.
- **Prepaid or in arrears.** A prepaid hour package uses the wallet as a budget; billing in arrears is simpler for most industrial customers.
- **Disputes.** A period in which the customer can object, and the usage report you hand over with each invoice.

These are commercial and legal decisions. A partner configures them; your company has to make them.

## Which licences does pay-per-use need?

The [Revenue Cloud pricing page](https://www.salesforce.com/sales/cpq/pricing/) shows Revenue Cloud Advanced at $200 or €200 per user and month, billed annually, with "Consumption & Invoicing" in its scope. The same page lists Revenue Cloud Billing as an add-on with "Usage Rating & Digital Wallet", the invoicing engine and the accounting subledger, price on request. Which of the two covers rating and invoicing for your contract belongs in writing in the order form.

Billing is charged in Billing Events. According to the [rate sheet of February 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf), one event is consumed per $50 of invoice subtotal, other currencies are converted at the average daily rate, and unused events do not roll over. In the scenario above, $1 million of usage invoices a year would consume 20,000 events. The price per event is not public. The details are in [Revenue Cloud Billing costs](../revenue-cloud-billing-costs/).

## When would I not use Revenue Cloud for pay-per-use?

In these cases I would look elsewhere first:

- **The invoice stays in SAP.** If all invoices come from SAP, rating in Salesforce only to hand the amount to SAP adds a system. I did not find a documented standard hand-over of rated usage to an external billing system, so ask Salesforce and your partner before you plan one. The general question is in [Revenue Cloud Billing or SAP](../revenue-cloud-billing-or-sap-invoicing/).
- **A few dozen machines.** A monthly export and a billing plan in the ERP can be enough.
- **No reliable counter.** Then the project starts with the machine connection, not with Revenue Cloud.
- **Pay-per-use is a pilot.** Test the commercial model with a few customers before you configure rate cards for everyone.

How pay-per-use fits next to classic service contracts is covered in [maintenance contracts with recurring billing](../maintenance-contracts-recurring-billing/), and the whole chapter on [billing and usage-based pricing](../../masterclass/revenue-cloud/billing-and-usage-based-pricing/) puts both in context.

Pay-per-use with Revenue Cloud works when the counter and the contract are clean, and Salesforce only rates what you send it. If you are designing a usage model for your machines, [send me a message](#contact).
