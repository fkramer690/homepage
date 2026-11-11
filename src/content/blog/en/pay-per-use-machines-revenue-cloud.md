---
title: "Pay-per-use for machines: billing with Revenue Cloud"
description: "Can a machine builder bill operating hours with Revenue Cloud Usage Management? How rating works, where machine data comes from and what the contract must say."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: pay-per-use-machines-revenue-cloud
translationKey: usage-based-pricing-machines-revenue-cloud
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, pay-per-use, usage management, billing, IoT, manufacturing]
takeaways:
  - "The hard part lies outside Salesforce: one reliable counter per machine, mapped to a serial number and checked before the usage is rated."
  - "Send billing-relevant usage records into Salesforce. For simple hour contracts, send one per machine per day; time series remain in the IoT platform."
  - "The contract defines usage, the binding counter, how data gaps are handled and the minimum fee, before anyone configures a rate card."
  - "Consumption, wallets and usage invoices require Revenue Cloud Billing in addition to Advanced, priced on request and charged in Billing Events."
faq:
  - q: "Can Salesforce Revenue Cloud bill machine operating hours?"
    a: "Yes, technically. Usage Management lets you define a usage resource such as operating hours, sell it with a grant and an overage rate, and convert the recorded usage into a liable summary for billing. Salesforce documents examples for cloud storage and telecoms, so the machine data feed remains your own integration work."
  - q: "What is a liable summary in Revenue Cloud?"
    a: "According to Trailhead, the liable summary is the final amount a customer owes for usage in a period. It is created from the rated usage records, for example by the scheduled Orchestrate Usage Management flow, and is passed to billing for the invoice."
  - q: "Where does the usage data for pay-per-use come from?"
    a: "It comes from the machine, usually through the controller and an IoT platform or historian. Salesforce receives time-stamped usage records with account, asset, usage resource, quantity and a unique identifier. Mapping each counter to a serial number and checking the data for gaps and resets is part of your integration."
  - q: "Which license do I need for usage-based billing in Revenue Cloud?"
    a: "Rate management and usage selling are in Revenue Cloud Growth and Advanced. According to the Salesforce license comparison, consumption management, wallet management and usage-based invoices need the Revenue Cloud Billing add-on, which also requires Advanced and is priced on request. Confirm the combination in the order form."
draft: false
---

A machine builder can bill operating hours or output per use with Revenue Cloud. Usage Management defines what is measured, rates it with grants and rate cards, tracks balances in wallets and passes a liable summary to billing. Salesforce documents this using cloud storage and mobile plans, though, and the difficult part for machines lies outside Salesforce: one trustworthy counter per machine, mapped to a serial number and checked before the usage is rated, plus a contract that defines what counts as an hour. I would use Revenue Cloud for pay-per-use only when that data feed exists and the usage invoice is created in Salesforce anyway.

## What does Revenue Cloud Usage Management do?

Usage Management is the part of Revenue Cloud for consumption-based products. Salesforce renamed the product Agentforce Revenue Management, Help and the developer guide often shorten it to Revenue Management, and the pricing pages still use the name Revenue Cloud. According to the [Trailhead unit on Usage Management](https://trailhead.salesforce.com/content/learn/modules/usage-management-foundations/get-to-know-usage-management), it lets companies "define, measure, rate, and bill for consumption-based products" and connects quoting, assets and billing.

The [components and personas unit](https://trailhead.salesforce.com/content/learn/modules/usage-management-foundations/explore-components-and-personas) names five building blocks:

| Component | What it does |
|---|---|
| Usage modeling | Consumable products, usage resources, units of measure, usage grants |
| Rate management | Rules that turn usage into charges |
| Usage selling | Quote, order and activate usage products |
| Wallet management | Wallets with balances per usage resource, bound to an asset, account or contract |
| Consumption management | Tracks consumption and produces invoice-ready summaries |

The flow behind it: raw usage events are recorded in the transaction journal. Usage records are checked against the wallet, summarized by day, week, month or billing cycle and rated with the rate card. The liable summary is the final amount the customer owes; the Orchestrate Usage Management flow can create it on a schedule. Billing then converts it into an invoice. The [developer guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/usage_management_overview.htm) lists Usage Management for Enterprise, Unlimited and Developer Editions in Lightning Experience.

## How do grants, rate cards and overage fit a machine?

The [unit on usage resources and grants](https://trailhead.salesforce.com/content/learn/modules/usage-management-with-agentforce-revenue-management/create-usage-resources-and-grants) uses a mobile plan with texts, data and minutes. Translated to a machine, it looks like this:

- **Usage resource:** operating hours, with the unit of measure hour. Pieces produced or cycles would be a second resource.
- **Product usage resource:** links the sold product, for example "compressor on pay-per-use", to the resource. One product can be linked to several resources.
- **Product usage grant:** the included allowance, such as 300 hours per month, with a validity period, a rollover policy for unused hours and a drawdown order.
- **Overage:** an overage rule on the grant, in newer releases a usage overage policy, lets usage above the allowance be charged at the rate card price.
- **Rate card:** flat or tiered prices per resource, with entries that can depend on quantity or attributes such as region or customer type.

Wallets can raise alerts, block further usage or offer a top-up when a balance runs out. For machines I would use only the alerts. Blocking usage in Salesforce does not stop a compressor, and switching off a customer's machine because of a billing balance should be governed by the contract and enforced in the controller, if anywhere.

## Billing-relevant usage records from the IoT platform

Salesforce expects time-stamped usage records in the transaction journal with account, asset, usage resource, quantity and a unique identifier. How they reach it from a machine is up to your integration. In a typical setup the controller reports to an IoT platform or historian, which keeps the time series. From there a job sends usage records into Salesforce at the granularity the contract needs. For a simple operating-hours contract, I would send one aggregated record per machine per day; time-of-day tariffs or peak billing need finer records.

```ablauf
ext: Controller, IoT platform
sf: Usage record, Rating, Liable summary, Invoice
Controller --> IoT platform
IoT platform --daily aggregate--> Usage record
Usage record --wallet, rate card--> Rating
Rating --> Liable summary
Liable summary --> Invoice
```

Between the two systems sit the checks that decide whether the invoice is correct:

1. **Serial number to asset and account.** Every counter must be mapped to the asset that was sold to a specific customer. This mapping breaks first for machines that were moved or resold.
2. **Counter resets.** After a controller swap the counter starts at zero again. A negative delta must block the record from being processed, not create a credit.
3. **Gaps.** A machine that is offline for three days sends nothing and then reports a large jump. The contract defines whether that is allowed.
4. **Duplicates.** A retried transfer must not result in the same day being billed twice.

High-frequency sensor readings do not belong in Salesforce. The same rule applies to [predictive maintenance](../predictive-maintenance-salesforce-data-needed/), where streaming raw data through Data 360 quickly becomes expensive. The daily operating-hours counter is also what Field Service needs for maintenance by usage, so one feed can serve both, provided the integration also updates the counter field on the asset; the Field Service view is in the [chapter on assets and maintenance](../../masterclass/field-service/field-service-assets-maintenance-parts/). How I would design that interface is part of my work on [Salesforce integration](../../services/salesforce-integration/).

## Worked example: 120 compressors with 300 included hours

A compressor maker offers 120 compressors to 40 customers under a pay-per-use model. Each contract has a monthly base fee that includes 300 operating hours, extra hours are charged in two tiers, and invoices are issued monthly in arrears.

In Revenue Cloud the base fee is a subscription, the operating hours are a usage resource with a grant of 300 hours per month that does not roll over, and the rate card contains the two tiers. When the order is activated, each compressor becomes an asset, and because the 300 hours apply per compressor, each asset receives its own wallet for operating hours. If the hours were pooled per customer, the grant would be bound to the account instead. You cannot change that choice after the assets exist. The IoT platform sends one record per compressor and day. At month end the scheduled flow rates the usage, the liable summary is passed to billing, and the customer receives one invoice with base fee and overage.

In such a setup, I would expect most errors to originate in the data: two compressors swapped between sites, a counter replaced during service, or a customer who disputes 40 hours from a week when the machine was idle.

## What must the pay-per-use contract define?

Before anyone configures a rate card, legal, finance and sales have to agree on these points:

- **The unit.** Operating hours, load hours, cycles or good parts. Load hours and good parts are fairer to the customer and harder to measure.
- **The binding counter.** Which device and which system are authoritative for the invoice, and who may correct the data.
- **Gaps and failures.** Estimated values, last known value or no charge for periods without data.
- **Minimum fee.** A base fee or a minimum quantity protects your financing of the machine. Without one, a customer can leave the machine idle for a quarter.
- **Prepaid or in arrears.** A prepaid hour package uses the wallet as a budget; in my view billing in arrears is simpler for most industrial customers.
- **Disputes.** A period in which the customer can object, and the usage report you provide with each invoice.

These are commercial and legal decisions. The implementation team configures the result; your company has to make the decisions.

## Usage invoicing needs the Revenue Cloud Billing add-on

The [Revenue Cloud pricing page](https://www.salesforce.com/sales/cpq/pricing/) shows Revenue Cloud Advanced at $200 or €200 per user and month, billed annually, as of November 9, 2026. The same page lists Revenue Cloud Billing as an add-on with "Usage Rating & Digital Wallet", the invoicing engine and the accounting subledger, price on request. The license comparison in Salesforce Help draws the line as follows: rate management and usage selling are in Growth and Advanced, while consumption management, wallet management and usage-based invoices need Billing; consumption management with Billing also requires Advanced. Details are in [Revenue Cloud editions and pricing](../revenue-cloud-editions-pricing/).

Billing is charged in Billing Events. According to the [rate sheet of February 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf), one event is consumed per $50 of total invoice amount (posted invoice subtotals including shipping, excluding taxes), other currencies are converted at the average daily rate, and unused events do not roll over. If the invoices in the scenario above added up to $1 million a year, they would consume 20,000 events. The price per event is not public. The details are in [Revenue Cloud Billing costs](../revenue-cloud-billing-costs/).

## When would I not use Revenue Cloud for pay-per-use?

In these cases I would look elsewhere first:

- **The invoice stays in SAP.** If all invoices are created in SAP, rating in Salesforce only to hand the amount to SAP adds a system. I did not find a packaged connector that passes rated usage to SAP in the form of billing documents. The liable summaries are accessible through the API, so a custom integration is possible, but ask Salesforce and your partner before you plan one. The general question is covered in [Revenue Cloud Billing or SAP](../revenue-cloud-billing-or-sap-invoicing/).
- **A few dozen machines.** In my view a monthly export and a billing plan in the ERP can be enough.
- **No reliable counter.** Then the project starts with the machine connection, not with Revenue Cloud.
- **Pay-per-use is a pilot.** Test the commercial model with a few customers before you configure rate cards for everyone.
- **Machines change hands often.** According to Salesforce Help, Usage Management does not support account and asset transfers, upgrades, downgrades and swaps, or usage products inside bundles. Machines that are resold, moved or rented out need a manual process for those cases.

Before you configure the first rate card, I would compare the counter from the IoT platform with the hour meter on the machine for three machines over one month. How pay-per-use relates to classic service contracts is covered in [maintenance contracts with recurring billing](../maintenance-contracts-recurring-billing/), and the whole chapter on [billing and usage-based pricing](../../masterclass/revenue-cloud/billing-and-usage-based-pricing/) puts both in context.
