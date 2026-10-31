---
title: "From Salesforce Billing to Revenue Cloud Billing"
description: "What happens to open invoices, billing schedules and payments when you move from the Salesforce Billing package to Revenue Cloud Billing, and who signs off."
pubDate: 2026-10-28
lang: en
slug: from-salesforce-billing-to-revenue-cloud-billing
translationKey: salesforce-billing-to-revenue-cloud-billing
topic: revenue
categories: [revenue-cloud]
tags: [Salesforce Billing, Revenue Cloud Billing, migration, cutover, finance]
takeaways:
  - "Revenue Cloud Billing runs on standard objects such as Invoice, CreditMemo, BillingSchedule and AccountingPeriod, not in the blng namespace."
  - "Salesforce says current Billing customers keep full access with support. New customers get Revenue Cloud Advanced and Revenue Cloud Billing."
  - "Billing schedules in Revenue Cloud are created from orders, so they come from migrated assets and orders, not from a copy of the old schedules."
  - "I cut over at a period end: finish open invoices in the package, move open balances, archive closed history."
  - "Finance signs off the billing cutover, including tax engine, payment gateway, journal entries to the ERP and invoice numbering."
faq:
  - q: "Is Salesforce Billing still supported?"
    a: "Yes. A Salesforce spokesperson told SalesforceBen in March 2025 that current Salesforce CPQ and Salesforce Billing customers will continue to receive full access, including customer support. I found no separate end-of-sale statement for the Billing package on Salesforce's own pages."
  - q: "Can Salesforce Billing invoices be converted into Revenue Cloud Billing invoices?"
    a: "There is no in-place conversion, because the package objects and the standard objects of Revenue Cloud Billing are different. Salesforce Help treats billing data as its own migration topic. I would move open balances and keep closed invoices as read-only history."
  - q: "When is the best time to switch billing systems?"
    a: "At the end of an accounting period, after the last invoice run in the old package and after finance has reconciled the subledger with the ERP. Then opening balances in the new system start from a closed, agreed state."
  - q: "Does Revenue Cloud Billing replace the ERP for accounting?"
    a: "Not necessarily. Salesforce describes Revenue Cloud Billing as able to act as a sub-ledger while synchronizing journal entries. The general ledger usually stays in the ERP, and finance decides that split."
draft: false
---

Moving from the Salesforce Billing package (namespace `blng`) to Revenue Cloud Billing means a new billing data model on standard objects. There is no in-place conversion. Open invoices, billing schedules and payment history are either finished in the old package or moved as balances. My recommendation: cut over at the end of an accounting period, run the last invoices in the package, move open receivables and active contracts, and keep closed history readable or archived. Billing schedules in Revenue Cloud come from orders, so they follow the migrated assets. Finance signs off, not the CRM team, because tax, payments and journal entries change with the system.

## What is the status of Salesforce Billing?

Salesforce Billing came with Salesforce CPQ from SteelBrick and is a managed package. In March 2025 a Salesforce spokesperson told [SalesforceBen](https://www.salesforceben.com/salesforce-confirms-the-future-of-cpq/) that current Salesforce CPQ and Salesforce Billing customers "will continue to receive full access", including customer support. For new customers and existing customers who want to update their products, Salesforce offers Revenue Cloud Advanced and Revenue Cloud Billing.

The [CPQ end-of-life page](https://www.salesforce.com/sales/cpq/end-of-life/) only describes Revenue Cloud Billing as a separate, complementary product in the suite. A separate end-of-sale statement for the Billing package is something I did not find on Salesforce's pages in October 2026. So there is no deadline for billing either. The trigger for a move is usually the CPQ migration: once quotes, orders and assets live on standard objects, a billing package that reads CPQ objects no longer fits.

A note on names: Salesforce Help currently calls the product Revenue Management, earlier Revenue Lifecycle Management, and the CPQ page says Agentforce Revenue Management. Salesforce's product pages say Revenue Cloud, with Revenue Cloud Billing as the billing add-on.

## Package objects in the blng namespace against standard objects

The package has 59 custom objects in its [developer guide](https://developer.salesforce.com/docs/atlas.en-us.blng_dev.meta/blng_dev/blng_custom_objects_parent.htm). Revenue Cloud Billing uses standard objects from the [Revenue Management Developer Guide](https://developer.salesforce.com/docs/revenue/revenue-management/guide/billing-std-objects-parent.html). Salesforce publishes no official mapping between them; the table is my orientation by function:

| Function | Salesforce Billing (package) | Revenue Cloud Billing (standard objects) |
|---|---|---|
| Billing logic | `blng__BillingRule__c`, `blng__BillingTreatment__c` | BillingPolicy, BillingTreatment, BillingTreatmentItem |
| Tax | `blng__TaxRule__c`, `blng__TaxIntegration__c` | TaxPolicy, TaxTreatment, TaxEngine with a provider adapter |
| Invoice | `blng__Invoice__c`, `blng__InvoiceLine__c` | Invoice, InvoiceLine, InvoiceLineTax |
| Invoice run | `blng__InvoiceRun__c` | InvoiceBatchRun |
| Credit and debit | `blng__CreditNote__c`, `blng__DebitNote__c` | CreditMemo, DebitMemo |
| Accounting | `blng__FinanceBook__c`, `blng__FinancePeriod__c`, `blng__GLAccount__c` | AccountingPeriod, GeneralLedgerAccount, GeneralLedgerJrnlEntryRule |
| Legal entity | `blng__LegalEntity__c` | LegalEntity |
| Payments | `blng__Payment__c`, `blng__PaymentGateway__c` | Salesforce Payments objects plus PaymentLineInvoiceLine |

Two differences matter more than the names, and a third point is open:

- **Billing schedules come from orders.** According to the [Billing overview](https://developer.salesforce.com/docs/revenue/revenue-management/guide/billing-overview.html), Revenue Cloud generates billing schedules through the context service and creates invoices from them. An old schedule is therefore rebuilt from a migrated asset and order.
- **Tax and payments are connected differently.** Tax runs through a TaxEngine record with a provider adapter and a named credential. Payments use standard Salesforce Payments objects with an external gateway. Your tax provider and payment provider both need to confirm the new connection.

```hinweis offen
**Revenue recognition.** The package has objects such as `blng__RevenueSchedule__c`. In the Billing standard object list I found no revenue schedule object. If you recognise revenue in the package today, ask Salesforce in writing where that happens after the move.
```

## What happens to open invoices, schedules and payments?

Salesforce Help lists billing data as its own topic in the [migration guide](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5), next to product and asset data. For each kind of record, I would decide like this:

- **Closed invoices and paid history:** do not migrate. Keep them readable in the package for the retention period or export them to an archive that finance can search.
- **Open invoices:** finish them in the package. Collect the payments there or move the open amount as a balance into the new system, with a reference to the old invoice number.
- **Open credit notes:** apply them before the cutover where possible. What remains moves as a balance, like an open invoice.
- **Billing schedules for active contracts:** rebuild them from migrated assets and orders. The first invoice run in Revenue Cloud must start exactly after the last billed period in the package, otherwise a customer gets billed twice or not at all.
- **Stored payment methods:** clarify with your payment provider whether tokens can be reused in the new connection.

## The cutover belongs at a period end

Revenue Cloud Billing works with accounting periods per legal entity. The [billing deployment notes](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-billing-additional-info.html) state that accounting periods can only be created in Open status, and that a legal entity must be active when child records are created. Journal entries then flow from Salesforce to the ERP; Salesforce's [Revenue Cloud Billing page](https://www.salesforce.com/sales/revenue-cloud-billing/) describes Salesforce acting as a sub-ledger "while synchronizing journal entries".

```ablauf
sf: Order, Billing schedule, Invoice, Journal entry
erp: ERP
Order --Context service--> Billing schedule
Billing schedule --Invoice run--> Invoice
Invoice --> Journal entry
Journal entry --Synchronisation--> ERP
```

At a period end the old subledger is closed and reconciled with the ERP. The new system starts with opening balances that finance has agreed. In the middle of a period you would have to split one month across two subledgers, and reconciliation gets twice as hard.

Invoice numbers need the same care. Revenue Cloud Billing has sequence policy objects (SequencePolicy, SequenceGapReconciliation); check with your partner that they cover your invoice numbering. Set the starting number so that new invoices continue the series without collisions, and check the format with your tax adviser.

## What has to be ready before the first invoice run?

The deployment notes name several setup steps that are easy to miss:

```schritte
Data pipeline
  Is enabled before Billing is enabled.
Order to Billing Schedule flow
  Is copied from its template and activated.
Legal entities and periods
  Legal entities and open accounting periods exist.
Configuration in order
  Billing treatment item, billing treatment, billing policy; tax treatment, tax policy; payment term item, payment term.
Tax and payments
  Tax engine and payment gateway are connected and tested with real addresses and amounts.
```

How these configuration records move from sandbox to production is covered in [Revenue Cloud deployments](../revenue-cloud-configuration-deployment/), and the general approach in the DevOps masterclass chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/).

## Worked example: 800 subscription customers invoiced quarterly

A machine builder sells remote monitoring and maintenance subscriptions to 800 customers and invoices them quarterly from Salesforce Billing. Machine invoices come from SAP. The company moves quoting to Revenue Cloud. All figures are assumptions.

The billing team plans the cutover for 31 March, the end of a quarter. The last invoice run in the package covers Q1. In April finance reconciles the subledger with SAP. 120 open invoices stay in the package until paid. Assets for the 800 subscriptions are migrated in March, and the first billing schedules in Revenue Cloud start on 1 April, so the first invoice run in July bills Q2. Closed invoices remain readable in the package until the CPQ and Billing licences end.

Before the cutover, finance checks one more topic: from 2027 German e-invoicing duties apply. Whether invoices should come from Revenue Cloud at all is covered in [Revenue Cloud Billing or SAP](../revenue-cloud-billing-or-sap-invoicing/) and [e-invoicing in Germany from 2027](../e-invoicing-germany-2027-revenue-cloud/).

## First step: finance signs the cutover checklist

Finance signs off, not the CRM team. The decisions here are accounting decisions: opening balances, period close, tax treatment, journal entries to the ERP and invoice numbering. I would set up the cutover with a written checklist that finance signs, and plan the licence cost of Revenue Cloud Billing early; how it is charged is explained in [Revenue Cloud Billing costs](../revenue-cloud-billing-costs/). The overall migration order sits in [CPQ to Revenue Cloud migration](../cpq-to-revenue-cloud-migration-phases/) and in the masterclass chapter [from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/). The interfaces between Salesforce and SAP are part of my work in [Salesforce integration](../../services/salesforce-integration/).
