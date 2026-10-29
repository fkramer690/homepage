---
title: "Revenue Cloud Billing and usage-based pricing"
description: "When invoices should come from Revenue Cloud Billing, what billing events cost, what German e-invoicing requires and how pay-per-use for machines works."
lang: en
slug: billing-and-usage-based-pricing
course: revenue-cloud
translationKey: revenue-04
chapter: 4
pubDate: 2026-10-28
short: "Billing and usage"
summary: "When invoices should come from Revenue Cloud Billing, what Billing costs, what e-invoicing requires and how pay-per-use works."
takeaways:
  - "For one-off machine sales the invoice usually stays in SAP; Revenue Cloud Billing pays off for subscriptions, maintenance contracts and usage fees that are sold and changed in Salesforce."
  - "Revenue Cloud Billing turns Salesforce into a subledger with legal entities, accounting periods and journal entries, so finance owns the decision and the period close."
  - "Billing is an add-on priced on request and consumes one billing event per $50 of invoice subtotal without tax; unused events expire at the order end date."
  - "From 1 January 2027, German companies above €800,000 prior-year turnover must issue structured e-invoices to domestic business customers; plan the route before Billing sends its first invoice."
  - "Pay-per-use for machines needs one trusted counter per machine from the IoT platform and a contract that defines the unit, gaps and the minimum fee before anyone builds a rate card."
articles: [revenue-cloud-billing-or-erp-invoicing, revenue-cloud-billing-costs-billing-events, e-invoicing-germany-revenue-cloud, usage-based-pricing-machines-revenue-cloud, service-contracts-recurring-billing]
faq:
  - q: "Should a machine builder invoice from Revenue Cloud Billing or from SAP?"
    a: "Machines and spare parts are invoiced with delivery, acceptance and down payments, which run in SAP, so their invoices usually stay there. Subscriptions, maintenance contracts and usage fees that sales amends often in Salesforce are the candidates for Revenue Cloud Billing."
  - q: "How is Revenue Cloud Billing charged?"
    a: "Billing is an add-on with price on request. According to the rate sheet of February 2026, it consumes 0.02 billing events per dollar of total invoice amount, one event per $50. Taxes are excluded, shipping is included, and unused events do not roll over."
  - q: "Can Revenue Cloud Billing create XRechnung or ZUGFeRD invoices?"
    a: "I found no Salesforce documentation for native EN 16931 output from Revenue Cloud Billing as of October 2026; Salesforce documents invoice PDFs. Ask Salesforce in writing and plan SAP or an e-invoicing service as the route for German business customers."
  - q: "Can Revenue Cloud bill machine operating hours?"
    a: "Yes. Usage Management defines operating hours as a usage resource, rates them with grants and rate cards and passes a liable summary to billing. The machine data feed from the IoT platform, with serial numbers and plausibility checks, is your own integration work."
draft: false
---

For a manufacturer, the machine invoice usually stays in SAP. Revenue Cloud Billing pays off for recurring and usage-based revenue that is sold and changed in Salesforce: subscriptions, maintenance contracts and pay-per-use fees. Billing makes Salesforce a subledger with its own legal entities and accounting periods, so finance owns the decision. It is an add-on priced on request and consumes one billing event per $50 of invoice amount. From 2027, German invoices to business customers must be structured e-invoices, and I found no native EN 16931 output in Salesforce's documentation. Pay-per-use works when each machine has a reliable counter and the contract defines what an hour is.

## Which invoices belong in Revenue Cloud Billing?

Billing can invoice almost any revenue type. What decides is which system already knows everything the invoice depends on.

A machine invoice depends on shipment, acceptance and down payments, and all three run in SAP. A remote monitoring subscription depends on the quote, the term and every amendment since, and in Revenue Cloud all of those live in Salesforce. That is why I split by revenue type:

| Revenue type | Invoice from | Reason |
|---|---|---|
| Machine | SAP | Delivery, acceptance, down payments |
| Spare parts | SAP | Invoiced with the delivery |
| Subscriptions such as remote monitoring | Revenue Cloud Billing | Sold, amended and renewed in Salesforce |
| Maintenance contract fees | Revenue Cloud Billing | Fixed fee per period, amendments from sales |
| Usage above an allowance | Revenue Cloud Billing | Rated in Salesforce |

The signal I look for: sales changes contracts every week, and finance corrects invoices every month because SAP did not hear about a change. Then Billing in Salesforce removes a hand-over. If the recurring business is a few hundred contracts with one invoice a year, SAP is enough. The full reasoning is in [Revenue Cloud Billing or SAP](../../../blog/revenue-cloud-billing-or-sap-invoicing/), and the system boundary for the whole process from [chapter 1](../revenue-cloud-overview/) is in [who owns what in quote to cash](../../../blog/revenue-cloud-sap-quote-to-cash-ownership/).

Payment in a B2B store is a separate boundary. Dealers who order spare parts in the shop usually pay on account, and the ERP issues the invoice; the [B2B Commerce chapter on prices, cart and checkout](../../b2b-commerce/prices-cart-checkout/) covers that side.

## What does Revenue Cloud Billing do?

Revenue Cloud Billing is the billing add-on for Revenue Cloud. Salesforce Help and the Winter '27 [developer guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/billing_overview.htm) call the product family Revenue Management, Trailhead says Agentforce Revenue Management, and the earlier name was Revenue Lifecycle Management. Search under all of them.

The mechanics follow the order from [chapter 3](../quote-contract-order/). According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/generate-invoices), order activation creates billing schedule groups and one billing schedule per order item, for new sales, amendments, renewals and cancellations alike. Invoice schedulers pick up the schedules marked ready for invoicing, and the invoice run uses the Data Processing Engine for large volumes. An external tax engine calculates the tax through tax policies and treatments.

The [product page](https://www.salesforce.com/sales/revenue-cloud-billing/) adds payments across gateways, collections with automated reminders, and an accounting backbone for journal entries, closing periods and currency conversion. Salesforce's own wording is that Billing allows "Salesforce to function as a sub-ledger while synchronizing journal entries". That sentence is the reason finance has to be in the room.

## Who closes the period: finance or the CRM team?

A subledger records the detail of receivables, every invoice, credit memo and payment, and passes journal entries to the general ledger. The general ledger stays in SAP. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/set-up-billing-basics), legal entity records tie every billing transaction to the right accounting periods and general ledger accounts. Each of these already exists in SAP as company codes, fiscal periods and G/L accounts.

So before a partner configures anything, finance answers four questions:

1. Which company codes invoice from Salesforce, and which legal entity records match them?
2. Who closes a Salesforce accounting period, and in which order relative to the SAP period close?
3. Who maintains the mapping of general ledger accounts when the chart of accounts changes?
4. How are receivables in Salesforce and SAP reconciled at month end, and who looks into differences?

Trailhead describes an [Accounts Receivable Admin](https://trailhead.salesforce.com/content/learn/modules/billing-basics-in-revenue-cloud/explore-billing-features-and-roles) who manages accounting periods, journal entries and financial reporting. In a manufacturing company that person sits in accounting. If nobody there takes the role, I would not take Billing live. The interfaces for journal entries and invoice status are part of my work on [Salesforce integration](../../../services/salesforce-integration/).

## What does Billing cost?

Revenue Cloud itself has list prices. The [EU pricing page](https://www.salesforce.com/eu/sales/revenue-lifecycle-management/pricing/) shows Revenue Cloud Growth at €150 and Revenue Cloud Advanced at €200 per user and month, billed annually, with "Consumption & Invoicing" in Advanced. On the [US pricing page](https://www.salesforce.com/sales/cpq/pricing/), Revenue Cloud Billing sits next to them as an add-on with "Request a Quote", containing Usage Rating & Digital Wallet, Invoicing Engine & Document Production and Accounting Subledger.

Billing is charged by invoice volume, not by user. The [rate sheet of February 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/pricing/revenue-cloud-billing-rate-sheet-feb-2026.pdf) sets 0.02 billing events per dollar of total invoice amount, so one event per $50. The amount is the subtotal of posted invoices, with shipping and without tax. Other currencies are converted to US dollars at the average rate of the day. Events must be used before the order end date, and nothing rolls over. Salesforce does not publish a price per event.

```kennzahlen
€150 | Revenue Cloud Growth per user and month, billed annually
€200 | Revenue Cloud Advanced per user and month, with Consumption & Invoicing
0.02 | Billing events per dollar of invoice amount, one event per $50
source: Revenue Cloud EU pricing page and Revenue Cloud Billing rate sheet of February 2026
```

A typical scenario, as an assumption: a machine builder invoices €18 million a year of subscriptions and maintenance fees from Billing, without tax. At an assumed 1.15 dollars per euro that is $20.7 million, or 414,000 billing events a year. Put €120 million of machine invoices through Billing as well and the count grows more than sevenfold, for invoices SAP creates anyway. Scope drives the cost more than anything you negotiate.

What to settle on the order form, how rounding and credit memos might count and how to ramp the entitlement over the term is in [Revenue Cloud Billing costs](../../../blog/revenue-cloud-billing-costs/). Licence forecasts like this are part of my [make-or-buy and licence](../../../services/make-or-buy-licences/) work.

## What does German e-invoicing from 2027 require?

According to the [IHK Köln](https://www.ihk.de/koeln/hauptnavigation/recht-steuern/recht/e-rechnungen-5943094), these stages apply to German businesses:

```zeitleiste
2025-01-01 | Every German business has to be able to receive e-invoices
2027-01-01 | Other invoices such as PDFs remain allowed only for issuers with up to €800,000 turnover in the previous year, and EDI invoices with the recipient's consent
2028-01 | From 2028, e-invoices are mandatory for all domestic B2B invoices
```

An e-invoice is issued, transmitted and received in a structured format that follows EN 16931. A PDF sent by email has not counted as an e-invoice since 2025. The [IHK Stuttgart](https://www.ihk.de/stuttgart/fuer-unternehmen/recht-und-steuern/steuerrecht/steuermeldungen/e-rechnungen-5864496) names XRechnung and ZUGFeRD from version 2.0.1 as accepted formats.

For a typical machine builder that means 1 January 2027, and it applies to every invoice to a German business customer: machines, parts, maintenance fees and subscriptions.

On the Salesforce side, [Trailhead](https://trailhead.salesforce.com/content/learn/modules/billing-management-with-revenue-cloud/generate-invoices-revenue) documents invoice PDFs from Billing, generated per invoice run or one at a time, and emailed to the bill-to contact. The product page does not mention e-invoicing, and I found no Salesforce documentation for native EN 16931, XRechnung or ZUGFeRD output as of October 2026. Three routes remain:

- **Invoice from SAP.** Revenue Cloud sends billing data, SAP issues the e-invoice. One compliance setup, but every amendment has to reach SAP before the next invoice run.
- **E-invoicing service.** Billing posts the invoice, middleware maps it to the structured format, a service validates and delivers it. I prefer a service that also handles SAP's invoices, so customers receive everything through one channel.
- **Partner app in the org.** Keeps the logic in Salesforce and adds a vendor to every release.

If Billing invoices go out after 1 January 2027, they need a structured route from the first invoice. Do not start with PDFs and fix the format later. The checklist and the legal details are in [e-invoicing in Germany from 2027](../../../blog/e-invoicing-germany-2027-revenue-cloud/). Have your tax advisor confirm the setup; I describe the system side, not the tax law.

## How does pay-per-use work with Usage Management?

Usage Management is the part of Revenue Cloud for consumption-based products. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/usage-management-foundations/explore-components-and-personas) names five components: usage modelling, rate management, usage selling, wallet management and consumption management. Raw usage events land in the transaction journal. Rated usage ends up in a liable summary, the final amount the customer owes, which goes to billing for the invoice.

```ablauf
ext: IoT platform
sf: Transaction journal, Liable summary, Billing invoice
IoT platform --Value per day--> Transaction journal
Transaction journal --Rate card--> Liable summary
Liable summary --> Billing invoice
```

For a machine that translates directly. Operating hours become a usage resource, the sold product carries a grant of, say, 300 hours per month, and a rate card prices the hours above the grant in tiers. Each customer gets a wallet per resource when the order is activated. Salesforce's own examples are cloud storage and mobile plans, though, and the hard part for machines lies outside Salesforce:

- **One trusted counter per machine.** The controller reports to an IoT platform or historian, which keeps the time series. Salesforce receives one record per machine and day, never raw readings.
- **Checks before rating.** Serial number to asset and account, counter resets after a controller swap, gaps when a machine was offline, duplicates from retried transfers.
- **A contract that defines the unit.** Operating hours, load hours or good parts; which counter is binding; how gaps are handled; the minimum fee that protects the financing of the machine.

The same daily counter often drives maintenance by operating hours in Field Service, so one feed can serve both; the [Field Service chapter on assets and maintenance](../../field-service/field-service-assets-maintenance-parts/) covers that side. Rating sits in the Billing add-on as "Usage Rating & Digital Wallet", so confirm in the order form which licence covers it. The scenario and the contract checklist are in [pay-per-use for machines](../../../blog/pay-per-use-machines-revenue-cloud/).

If all invoices stay in SAP, I would think twice before rating usage in Salesforce. I did not find a documented standard hand-over of rated usage to an external billing system.

## Maintenance contracts as recurring revenue

Most machine builders already have the recurring revenue that Billing is built for: maintenance contracts. In Revenue Cloud the contract is a product with a subscription selling model. Order activation creates an asset for the contract and billing schedules, and an invoice scheduler bills it, for example quarterly in advance. Every upsell, renewal or cancellation runs through a quote and an order, as described in [chapter 3](../quote-contract-order/). A service manager who adds a machine on the phone has changed nothing Billing sees.

Field Service does not read Revenue Cloud subscriptions. Service contract, contract line items, maintenance plan and entitlement deliver the visits, and I found no documented standard link from the sold subscription to the service contract. Plan a flow on order activation that creates or updates them. My rule for the records:

- The Revenue Cloud asset answers what was sold, for how long and at what price.
- The Field Service service contract answers which machines get which service level.
- The machine asset with serial number belongs to service and is usually fed from the ERP.

The details, including a scenario with 800 machines billed quarterly, are in [maintenance contracts with recurring billing](../../../blog/maintenance-contracts-recurring-billing/).

## What to decide before a partner configures Billing

A typical scenario, as an assumption: a machine builder with SAP S/4HANA quotes machines, spare parts, remote monitoring and maintenance contracts in Revenue Cloud. Machines and parts are invoiced from SAP, which already issues e-invoices. Subscriptions, maintenance fees and extra operating hours move to Billing, connected to the e-invoicing service SAP already uses. The customer receives two kinds of invoices through one channel, and customer service can explain why.

To get there, the client settles these points before the partner configures anything:

1. **Invoice owner per revenue type**, written down, with finance's signature.
2. **The Accounts Receivable Admin** in accounting, plus the order of the period close in Salesforce and SAP.
3. **The e-invoicing route** for each German legal entity, before the first Billing invoice.
4. **A billing event forecast** per contract year, owned by finance, with the price per event from the quote.
5. **The usage feed and the contract terms** for pay-per-use, before any rate card exists.
6. **The link to Field Service** for maintenance contracts, as automation with an owner.

If you run the old Salesforce Billing package today, open invoices, schedules and payment history have to move as well. That migration is part of [chapter 5, from CPQ to Revenue Cloud](../from-cpq-to-revenue-cloud/).

Revenue Cloud Billing is worth it where contracts change faster than SAP can follow, and finance has to decide where that line runs.
