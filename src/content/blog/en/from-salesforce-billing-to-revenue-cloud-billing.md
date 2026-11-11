---
title: "From Salesforce Billing to Revenue Cloud Billing"
description: "What happens to open invoices, billing schedules and payments when you move from the Salesforce Billing package to Revenue Cloud Billing, and who signs off."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: from-salesforce-billing-to-revenue-cloud-billing
translationKey: salesforce-billing-to-revenue-cloud-billing
topic: revenue
categories: [revenue-cloud]
tags: [Salesforce Billing, Revenue Cloud Billing, migration, cutover, finance]
takeaways:
  - "Revenue Cloud Billing runs on standard objects such as Invoice, CreditMemo, BillingSchedule and AccountingPeriod, rather than objects in the blng namespace."
  - "Salesforce says current Billing customers keep full access, including support. New customers are offered Revenue Cloud Advanced and Billing."
  - "Billing schedules are rebuilt from migrated orders or assets, or through APIs, not copied from the old package. Salesforce documents the steps."
  - "I cut over at a period end and decide per open invoice: migrate it, finish it in the package, or move only the balance."
  - "Finance signs off the financial side of the cutover: tax engine, payment gateway, journal entries to the ERP and invoice numbering."
faq:
  - q: "Is Salesforce Billing still supported?"
    a: "Yes. A Salesforce spokesperson told SalesforceBen in March 2025 that current Salesforce CPQ and Salesforce Billing customers will continue to receive full access, including customer support. As of 9 November 2026 I found no separate end-of-sale statement for the Billing package on Salesforce's own pages; confirm your renewal status in writing."
  - q: "Can Salesforce Billing invoices be converted into Revenue Cloud Billing invoices?"
    a: "There is no in-place conversion because the package objects and Revenue Cloud Billing's standard objects are different. Salesforce Help documents how to rebuild billing schedules, generate historical posted invoices and migrate unsettled credit memos, debit memos and payments. Whether you rebuild the full history or only open items is a decision for finance."
  - q: "When is the best time to switch billing systems?"
    a: "At the end of an accounting period, after the last invoice run in the old package and after finance has reconciled the subledger with the ERP. Then opening balances in the new system start from a closed, agreed state."
  - q: "Does Revenue Cloud Billing replace the ERP for accounting?"
    a: "Not necessarily. Salesforce says Revenue Cloud Billing can act as a sub-ledger while synchronizing journal entries. The general ledger usually stays in the ERP, and finance decides that split."
draft: false
---

Moving from the Salesforce Billing package (namespace blng) to Revenue Cloud Billing means moving to a new billing data model on standard objects. There is no in-place conversion, but Salesforce documents how to rebuild billing schedules and historical invoices and migrate open items. My recommendation: cut over at the end of an accounting period, run the last invoices in the package, decide for each open invoice whether to migrate it or let it run off, and keep closed history readable or archived. Finance signs off the financial controls, together with IT and the business owners, because tax, payments and journal entries change with the system.

## What is the status of Salesforce Billing?

Salesforce Billing came with Salesforce CPQ from SteelBrick and is a managed package. In March 2025 a Salesforce spokesperson told [SalesforceBen](https://www.salesforceben.com/salesforce-confirms-the-future-of-cpq/) that current Salesforce CPQ and Salesforce Billing customers "will continue to receive full access", including customer support. For new customers and existing customers who want to update their products, Salesforce offers Revenue Cloud Advanced and Revenue Cloud Billing. Advanced already contains basic invoicing; payments, the accounting subledger and invoice numbering require Billing.

The [CPQ end-of-life page](https://www.salesforce.com/sales/cpq/end-of-life/) only describes Revenue Cloud Billing as a separate, complementary product in the suite. I did not find a separate end-of-sale statement for the Billing package on Salesforce's pages as of 9 November 2026. So I am not aware of any public deadline for Salesforce Billing, but confirm your contract and renewal status with Salesforce in writing. The trigger for a move is usually the CPQ migration: once quotes, orders and assets live on standard objects, a billing package that reads CPQ objects no longer fits.

A note on names: Salesforce renamed the product Agentforce Revenue Management, Help often shortens it to Revenue Management, and earlier it was Revenue Lifecycle Management. The licenses are still called Revenue Cloud Growth, Advanced and Billing.

## Package objects in the blng namespace against standard objects

The package has 59 custom objects in its [developer guide](https://developer.salesforce.com/docs/atlas.en-us.blng_dev.meta/blng_dev/blng_custom_objects_parent.htm). Revenue Cloud Billing uses standard objects from the [Revenue Management Developer Guide](https://developer.salesforce.com/docs/revenue/revenue-management/guide/billing-std-objects-parent.html). Salesforce publishes no official mapping between them; the table below is my functional guide:

| Function | Salesforce Billing (package) | Revenue Cloud Billing (standard objects) |
|---|---|---|
| Billing logic | blng__BillingRule__c, blng__BillingTreatment__c | BillingPolicy, BillingTreatment, BillingTreatmentItem |
| Tax | blng__TaxRule__c, blng__TaxIntegration__c | TaxPolicy, TaxTreatment, TaxEngine with a provider adapter |
| Invoice | blng__Invoice__c, blng__InvoiceLine__c | Invoice, InvoiceLine, InvoiceLineTax |
| Invoice run | blng__InvoiceRun__c | InvoiceBatchRun |
| Credit and debit | blng__CreditNote__c, blng__DebitNote__c | CreditMemo, DebitMemo |
| Accounting | blng__FinanceBook__c, blng__FinancePeriod__c, blng__GLAccount__c | AccountingPeriod, GeneralLedgerAccount, GeneralLedgerJrnlEntryRule |
| Legal entity | blng__LegalEntity__c | LegalEntity |
| Payments | blng__Payment__c, blng__PaymentGateway__c | Payment, PaymentLineInvoice or PaymentLineInvoiceLine and other Salesforce Payments objects |

Two differences matter more than the names, and a third point is unresolved:

- **Billing schedules are rebuilt, not copied.** According to the [Billing overview](https://developer.salesforce.com/docs/revenue/revenue-management/guide/billing-overview.html), Revenue Cloud generates billing schedules from orders through the context service and then creates invoices from those schedules. The [billing migration steps](https://help.salesforce.com/s/articleView?id=ind.rev_billing_migration_flow.htm&language=en_US&type=5) offer three routes: activate migrated historical orders in sequence, use the standalone billing schedules API (Billing license) for orders, assets or external assets, or create schedules manually through the sObject APIs.
- **Tax and payments are connected differently.** Tax runs through a TaxEngine record with a provider adapter and a named credential. Payments use standard Salesforce Payments objects with an external gateway. Your tax provider and payment provider both need to confirm the new connection.

```hinweis offen
**Revenue recognition.** The package has objects such as blng__RevenueSchedule__c. In the Billing standard object list I found no revenue schedule object. If you recognize revenue in the package today, ask Salesforce in writing where that happens after the move.
```

## What happens to open invoices, schedules and payments?

Salesforce Help lists billing data as its own topic in the [migration guide](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5), next to product and asset data, and documents generating historical posted invoices and migrating unsettled credit memos, debit memos and payments. For each kind of record, I would make the following decision:

- **Closed invoices and paid history:** usually not migrated. Keep them readable in the package for the retention period or export them to an archive that finance can search. If finance wants the full history in the new system, generate historical posted invoices as documented.
- **Open invoices:** either migrate them with their lines, due dates and tax, or finish them in the package and collect the payments there. Moving only the open amount as a balance with a reference to the old invoice number is the minimal option; it loses aging and line detail in the new system.
- **Open credit notes:** apply them before the cutover where possible. Any remaining credit is migrated as a credit memo or handled like an open invoice.
- **Billing schedules for active contracts:** rebuild them from migrated orders, assets or through APIs. The first invoice run in Revenue Cloud must start exactly after the last billed period in the package, otherwise a customer is billed twice or not at all.
- **Stored payment methods:** clarify with your payment provider whether tokens can be reused in the new connection.

## The cutover belongs at a period end

Revenue Cloud Billing links accounting periods to legal entities through LegalEntityAccountingPeriod records. The [billing deployment notes](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-billing-additional-info.html) state that accounting periods can only be created in Open status, and that a legal entity must be active when that link record is created. Journal entries are then sent to the ERP through an integration that you build and reconcile; Salesforce's [Revenue Cloud Billing page](https://www.salesforce.com/sales/revenue-cloud-billing/) describes Salesforce acting as a sub-ledger "while synchronizing journal entries".

```ablauf
sf: Order, Billing schedule, Invoice, Journal entry
erp: ERP
Order --Context service--> Billing schedule
Billing schedule --Invoice run--> Invoice
Invoice --> Journal entry
Journal entry --ERP integration--> ERP
```

At the end of an accounting period, the old subledger is closed for new business and reconciled with the ERP. The new system starts with opening balances that finance has agreed. In the middle of a period you would have to split one month across two subledgers, and reconciliation gets twice as hard. If open invoices are allowed to run off in the package, both systems stay active for a while; Salesforce documents this [coexistence](https://help.salesforce.com/s/articleView?id=ind.rev_cloud_coexistence_billing_package.htm&language=en_US&type=5) for orgs with Revenue Cloud Advanced and Billing licenses, but it needs its own reconciliation.

Invoice numbers need the same care. Revenue Cloud Billing has sequence policy objects (SequencePolicy, SequenceGapReconciliation); check with your partner that they support your invoice numbering. Set the starting number so that new invoices continue the series without collisions, and check the format with your tax adviser.

## What has to be ready before the first invoice run?

The deployment notes name several setup steps that are easy to miss:

```schritte
Data pipeline
  Is enabled before Billing is enabled.
Order to Billing Schedule flow
  Is copied from its template and activated.
Legal entities and periods
  Legal entities and open accounting periods exist.
Activation order
  Billing treatment item, billing treatment, billing policy; tax treatment, tax policy; payment term item, payment term.
Tax and payments
  Tax engine and payment gateway are connected and tested with real addresses and amounts.
```

How these configuration records move from sandbox to production is covered in [Revenue Cloud deployments](../revenue-cloud-configuration-deployment/), and the general approach in the DevOps masterclass chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/).

## Worked example: 800 subscription customers invoiced quarterly

A machine builder sells remote monitoring and maintenance subscriptions to 800 customers and invoices them quarterly in arrears using Salesforce Billing. Machine invoices come from SAP. The company moves quoting to Revenue Cloud. All figures are assumptions.

The billing team plans the cutover for 31 March, the end of a quarter. The last invoice run in the package covers Q1. In April finance reconciles the subledger with SAP. 120 open invoices stay in the package until paid, so for about two months both billing systems run side by side and finance reconciles both. Assets for the 800 subscriptions are migrated in March, and the first billing schedules in Revenue Cloud start on 1 April, so the first invoice run in July bills Q2. Closed invoices remain readable in the package; before the CPQ and Billing licenses end, finance exports them to an archive that meets the retention rules.

Before the cutover, finance checks one more issue: German businesses must already be able to receive e-invoices, and the transition period for issuing them ends at the end of 2026, or at the end of 2027 for companies with up to €800,000 prior-year turnover. Whether invoices should be issued from Revenue Cloud at all is covered in [Revenue Cloud Billing or SAP](../revenue-cloud-billing-or-sap-invoicing/) and [e-invoicing in Germany from 2027](../e-invoicing-germany-2027-revenue-cloud/).

## First step: finance signs the cutover checklist

Finance signs off on the financial controls, not the CRM team alone; the overall go-live remains a joint decision with IT and the business owners. The core decisions here are accounting decisions: opening balances, period close, tax treatment, journal entries to the ERP and invoice numbering. I would set up the cutover with a written checklist that finance signs, and plan for the license cost of Revenue Cloud Billing early; how Salesforce charges for it is explained in [Revenue Cloud Billing costs](../revenue-cloud-billing-costs/). The overall migration order is covered in [CPQ to Revenue Cloud migration](../cpq-to-revenue-cloud-migration-phases/) and in the masterclass chapter [from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/). The interfaces between Salesforce and SAP are part of my work in [Salesforce integration](../../services/salesforce-integration/).
