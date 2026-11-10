---
title: "Revenue Cloud Billing or SAP: where should invoices live?"
description: "When invoices should come from Revenue Cloud Billing and when from SAP: what Billing does, what a subledger means for finance and a typical split."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: revenue-cloud-billing-or-sap-invoicing
translationKey: revenue-cloud-billing-or-erp-invoicing
topic: revenue
categories: [revenue-cloud, architecture]
tags: [revenue cloud billing, sap, invoicing, subledger, finance, manufacturing]
takeaways:
  - "For one-off machine sales the invoice usually stays in SAP, because delivery, acceptance and down payments are handled there."
  - "Billing makes Salesforce a receivables subledger with its own legal entities, periods and accounts; the SAP interface is a separate project."
  - "Billing usage is measured by posted invoice amounts, so high-value machine invoices use up contracted billing events without adding much value."
  - "Finance owns the decision: which revenue types Salesforce invoices, who closes periods and how receivables are reconciled with SAP."
faq:
  - q: "What does Revenue Cloud Billing do?"
    a: "Revenue Cloud Billing creates invoices from billing schedules, calculates tax through an external tax engine, handles credit memos, payments and collections, and can work as an accounting subledger. Journal entries reach the ERP through an integration you design and run."
  - q: "Can Revenue Cloud Billing replace SAP for invoicing?"
    a: "Technically it can invoice many revenue types, but for machine sales I would not move invoicing out of SAP. Delivery, acceptance, down payments and the general ledger stay there, and Billing would duplicate that structure."
  - q: "Does Revenue Cloud Billing need its own accounting setup?"
    a: "Yes. Billing works with legal entities, accounting periods, general ledger accounts, tax policies and payment terms in Salesforce. Finance has to map them to company codes, periods and accounts in SAP and agree on who closes the periods."
  - q: "Who should decide whether invoices come from Salesforce?"
    a: "Finance should decide, together with sales and IT. The CRM team can show what Billing does, but a second receivables ledger and a second period close are finance topics."
draft: false
---

For a manufacturer, machine invoices should usually stay in SAP, and Revenue Cloud Billing should only create invoices for revenue streams that are sold and changed in Salesforce: subscriptions, service contracts and usage-based fees. Billing turns Salesforce into a subledger with its own legal entities, accounting periods and journal entries, which a separately built integration transfers to the ERP. That is a second accounting structure alongside SAP. It pays off when the recurring business is large and changes often. The decision belongs to finance, and the CRM team prepares it.

## What does Revenue Cloud Billing do?

Revenue Cloud Billing is the billing add-on for Revenue Cloud, which Salesforce now calls Revenue Management (Agentforce Revenue Management in the Winter '27 release notes); its earlier name was Revenue Lifecycle Management. Billing alone does not include pricing, the product configurator, transaction management or contracts: the quote, amendment and usage process described here typically combines Revenue Cloud Advanced with Billing. Confirm the exact licenses against Salesforce's current license matrix. According to the [product page](https://www.salesforce.com/sales/revenue-cloud-billing/), Billing covers:

- **Invoices** "on any schedule, with traceability to the quote and order".
- **Tax** through external tax engines that calculate tax per invoice line.
- **Payments** across electronic payment methods and gateways.
- **Collections**, meaning automated follow-up for overdue accounts.
- **An accounting subledger** for journal entries, closing periods and currency conversion.

The mechanics follow the order. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/generate-invoices), activating an order creates billing schedule groups and billing schedules. Invoice runs pick up the schedules that are ready for invoicing and use the Data Processing Engine for large volumes. Draft invoices show estimated tax; posting an invoice calculates the actual tax in the external engine. The [Billing module on Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/generate-invoices-revenue) also covers invoice previews, credit memos, payment runs and invoice PDFs that can be emailed to the bill-to contact.

The [developer guide](https://developer.salesforce.com/docs/revenue/revenue-management/guide/billing-overview.html) describes standard objects for billing and tax configuration, credit memos, invoices and "accounting periods for legal entities", plus payment objects that require the Revenue Cloud Billing license. Pricing is available on request. Salesforce measures billing usage based on the positive amounts of posted invoice lines; the details are in [Revenue Cloud Billing costs](../revenue-cloud-billing-costs/).

## What does "Salesforce as a subledger" mean for finance?

Salesforce writes that Billing allows "Salesforce to function as a sub-ledger while synchronizing journal entries". In practice that needs configuration: transaction journal creation is a setting that is off by default, and it needs general ledger account assignment rules. The transfer to SAP, with mapping, error handling and reconciliation, is an integration you build. A subledger records the details behind receivables, here every invoice, credit memo and payment, and passes journal entries to the general ledger. The general ledger stays in SAP.

That sounds harmless until you look at the configuration. The [list of billing objects to deploy](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_billing_objects.htm) starts with LegalEntity and continues with billing policies, tax engines and tax policies, payment terms, AccountingPeriod, LegalEntityAccountingPeriod, GeneralLedgerAccount and rules for journal entries. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/set-up-billing-basics) puts it plainly: "In Billing, all transactions relate to legal entity records that define how an organization is structured." Several of these structures have counterparts in SAP, especially company codes, fiscal periods, G/L accounts and payment terms. They still have to be modeled in Salesforce and mapped explicitly, and a legal entity is not automatically one company code. Billing policies and journal rules are additional Salesforce configuration.

So finance has to answer questions it has probably never discussed with the CRM team:

1. Which company codes invoice from Salesforce, and which legal entity records match them?
2. Who closes a Salesforce accounting period, and in which order relative to the SAP period close? According to Trailhead, a Data Processing Engine definition closes the period per legal entity.
3. Who maintains the mapping of general ledger accounts when the chart of accounts changes?
4. How are receivables in Salesforce and in SAP reconciled at month end, and who looks into differences?
5. Where do the authoritative open items live, and where are incoming payments, clearing, dunning, refunds, disputes and write-offs handled?
6. Does SAP get summary postings or customer-level items?

Trailhead lists an [Accounts Receivable Admin role](https://trailhead.salesforce.com/content/learn/modules/billing-basics-in-revenue-cloud/explore-billing-features-and-roles) that "manages accounting periods, journal entries, and financial reporting". The permission set says nothing about the department. Finance must own the accounting policy and period-close decisions, even if a Salesforce operations team performs parts of the administration. If nobody in finance takes on that ownership, Billing should not go live.

## The machine invoice stays in SAP

For one-off machine sales I would keep the invoice in SAP, where shipment, acceptance, down payments and milestones are controlled in SAP. The reasons are practical:

- **Delivery drives the invoice.** Machines are often invoiced after shipment or acceptance, and in many companies shipping, customs and acceptance are handled in SAP.
- **Down payments and milestones** are usually booked against the SAP order. Billing has billing milestone plans in its data model, but moving down payment accounting out of SAP for one product line rarely pays off.
- **Cost.** Billing usage is measured by the positive amounts of posted invoice lines. A €2 million machine invoice posted in Salesforce uses up billing events for the full amount, even though SAP could create the invoice anyway. Whether that costs extra depends on the events included in your contract.
- **E-invoicing.** From 1 January 2027, issuers with more than €800,000 prior-year turnover generally lose the transitional option to send paper or unstructured invoices for domestic B2B transactions. Statutory exceptions and the EDI transition until the end of 2027 still have to be checked. If SAP already produces them, a second invoicing system means a second compliance project. Details are in [e-invoicing in Germany from 2027](../e-invoicing-germany-2027-revenue-cloud/).

The same applies to spare parts that are invoiced with the delivery. Payment in a B2B store is a separate question, covered in [B2B checkout: purchase order, card or invoice](../b2b-checkout-purchase-order-card-invoice/).

## When does Revenue Cloud Billing pay off?

Billing pays off where the invoice follows the contract rather than the delivery:

- **Subscriptions** such as remote monitoring, software options or data services, billed monthly or quarterly.
- **Service and maintenance contracts** with a fixed fee per period, amended when machines are added or retired. The billing approach is covered in [maintenance contracts with recurring billing](../maintenance-contracts-recurring-billing/).
- **Usage-based fees** such as machine hours or output, where Revenue Cloud rates the usage and passes it to billing. The machine case is in [pay-per-use for machines](../pay-per-use-machines-revenue-cloud/).
- **Frequent amendments.** In Revenue Cloud an amendment creates a quote and an order against the existing assets, and the billing schedules follow. If SAP invoices instead, every amendment has to reach SAP through an interface before the next invoice run.

The signal I look for is this: if sales changes contracts every week and finance corrects invoices every month because SAP did not hear about a change, Billing in Salesforce removes a handoff. If contracts rarely change, usage is small and there is one invoice a year, invoicing from SAP is usually enough. The number of contracts alone is not decisive: change frequency, retroactive changes, usage volume, legal entities and reconciliation effort matter more.

## Worked example: the split at a machine builder

Assume a machine builder with SAP S/4HANA sells machines, spare parts, a remote monitoring subscription per machine and maintenance contracts. Sales quotes all of it in Revenue Cloud.

I would split it like this:

| Revenue | Invoice from | Why |
|---|---|---|
| Machine | SAP | Delivery, acceptance, down payments |
| Spare parts | SAP | Invoiced with the delivery |
| Remote monitoring subscription | Revenue Cloud Billing | Sold, amended and renewed in Salesforce |
| Maintenance contract fee | Revenue Cloud Billing | Fixed fee per period, amendments from sales |
| Usage beyond included hours | Revenue Cloud Billing | Rated in Salesforce |

For subscription and contract invoices, Billing creates the journal entries once transaction journals and account rules are configured, and SAP receives them through the interface:

```ablauf
sf: Order, Billing schedule, Billing invoice
erp: SAP delivery, SAP invoice, SAP general ledger
Order --Recurring fees--> Billing schedule
Billing schedule --Invoice run--> Billing invoice
Billing invoice --Journal entries--> SAP general ledger
Order --Machine, parts--> SAP delivery
SAP delivery --> SAP invoice
SAP invoice --> SAP general ledger
```

The customer gets two kinds of invoices, which customer service has to be able to explain. If that is not acceptable, the alternative is to keep every invoice in SAP and send SAP the billing data from Revenue Cloud, which requires a reliable interface for amendments. The question of which system owns which object is covered in [Revenue Cloud and SAP: who owns what in quote to cash](../revenue-cloud-sap-quote-to-cash-ownership/).

## Finance draws the line

Finance. The CRM team can show what Billing does, but finance carries the consequences: a second receivables ledger, a second period close and a second place for auditors to examine. The [object ownership matrix](../salesforce-object-ownership-matrix/) helps here as well: every billing object needs an owner, and for legal entities, accounting periods and general ledger accounts that owner is in finance.

I would bring the head of accounting into the first architecture workshop, not into user acceptance testing.

```hinweis offen
At a minimum, agree with finance in writing on: which revenue types Salesforce invoices, invoice numbering and legal issuer, who closes periods, cancellation and correction, payment and clearing ownership, dunning and write-offs, document retention, error handling of the SAP interface, and how the reconciliation with SAP works.
```

The interfaces for journal entries and invoice status are part of my work on [Salesforce integration](../../services/salesforce-integration/).

## List revenue types with their invoice source

List your revenue types and note for each one which system invoices today and how often the contract changes. Rows with recurring fees and frequent changes are candidates for Billing; everything else stays in SAP. The masterclass chapter [billing and usage-based pricing](../../masterclass/revenue-cloud/billing-and-usage-based-pricing/) places this decision in the wider quote-to-cash process.
