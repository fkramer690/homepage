---
title: "From Salesforce CPQ and Billing to Revenue Cloud"
description: "What Salesforce commits to for CPQ and Billing, how both differ from Revenue Cloud, when to move and how the migration runs in three phases up to cutover."
lang: en
slug: from-cpq-to-revenue-cloud
course: revenue-cloud
translationKey: revenue-05
chapter: 5
pubDate: 2026-10-28
short: "From CPQ to Revenue Cloud"
summary: "What Salesforce commits to for CPQ and Billing, how the products differ and how the migration runs in three phases."
takeaways:
  - "Existing customers keep using CPQ, add users and get support, but no new features. No end-of-life date is announced."
  - "Revenue Cloud runs on standard objects, so product rules, price rules, subscriptions, approvals and reports are redesigned, not upgraded."
  - "Stay on CPQ while the quoting process is stable, and move when you need what only Revenue Cloud gets."
  - "The CPQ page names 3 to 6 months as a typical migration, with CPQ and Revenue Cloud running side by side."
  - "Price master, cutover model, history and the billing cutover date are decisions for the client and finance. Partners and tools carry them out."
articles: [salesforce-cpq-end-of-sale-status, cpq-vs-revenue-cloud-differences, stay-on-cpq-or-migrate, cpq-to-revenue-cloud-migration-plan, salesforce-billing-to-revenue-cloud-billing, revenue-cloud-configuration-deployment]
faq:
  - q: "Do I have to migrate from Salesforce CPQ to Revenue Cloud?"
    a: "No. Salesforce states that there is no forced migration and has announced no end-of-life date. Existing customers can keep using CPQ, buy additional users, renew and receive support and critical fixes. CPQ will not receive new features."
  - q: "Is Revenue Cloud an upgrade of Salesforce CPQ?"
    a: "No. Salesforce Help says the data models differ significantly. CPQ is a managed package with the SBQQ namespace, Revenue Cloud uses standard objects. Rules, prices, subscriptions and reports are redesigned or migrated, there is no version upgrade."
  - q: "How long does a migration from CPQ to Revenue Cloud take?"
    a: "Salesforce's CPQ page names 3 to 6 months from discovery to go-live as typical. Salesforce Help sets no fixed timeframe. I would plan the lower end only for a clean org with few price rules and little custom code."
  - q: "What happens to the Salesforce Billing package?"
    a: "A Salesforce spokesperson said in March 2025 that current CPQ and Billing customers keep full access including support; new customers are directed to Revenue Cloud Advanced and Revenue Cloud Billing. I found no separate end-of-sale page for the Billing package."
  - q: "Can CPQ and Revenue Cloud run in the same org?"
    a: "Yes, during the migration. Salesforce Help lists retaining the CPQ licence and coexistence during the transition as planning topics. CPQ keeps quoting in production while Revenue Cloud is built, so both licences overlap for the length of the project."
draft: false
---

Salesforce CPQ is end of sale, not end of life. Existing customers keep using it, add users, renew and get support, but no new features. Salesforce has announced no end-of-life date and says there is no forced migration. Revenue Cloud is the successor and a separate product: standard objects instead of the `SBQQ` and `blng` packages, a constraint engine instead of product rules, pricing procedures instead of price rules, assets instead of subscription records. A move is therefore a redesign, which Salesforce Help splits into three phases and the CPQ page puts at typically 3 to 6 months. I would decide it at the next CPQ renewal.

## What has Salesforce committed to for CPQ and Billing?

Salesforce CPQ and Salesforce Billing come from SteelBrick, which Salesforce bought for $360 million in December 2015, according to [SiliconANGLE](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/). Both are managed packages, with the namespaces `SBQQ` and `blng`. The successor appeared from Spring '24 as Revenue Lifecycle Management; Help now says "Revenue Management (formerly Revenue Cloud)", the CPQ page says Agentforce Revenue Management, and salesforce.com sells it as Revenue Cloud. [Chapter 1](../revenue-cloud-overview/) sorts out the names.

The binding source for CPQ is the Salesforce page [Navigating the Future of Salesforce CPQ](https://www.salesforce.com/sales/cpq/end-of-life/). As of October 2026 it says:

- "Salesforce CPQ is end of sale, not end of life."
- Existing customers "can continue using Salesforce CPQ, buy additional users, renew licenses, and receive support".
- CPQ "will not receive new features or innovations".
- "Salesforce has not announced an end-of-life date for CPQ."
- "There is no forced migration" to the new product.

In a [press release of 16 July 2025](https://www.salesforce.com/news/stories/agentforce-for-revenue-announcement/), Salesforce wrote that it "rebuilt its CPQ solution as the all-new Revenue Cloud". That sentence explains this chapter: there is no upgrade path from CPQ, only a move to a new product.

For the Billing package the statements are thinner. A Salesforce spokesperson told [SalesforceBen](https://www.salesforceben.com/salesforce-confirms-the-future-of-cpq/) in March 2025 that current CPQ and Billing customers "will continue to receive full access", including support, and that new customers are directed to Revenue Cloud Advanced and Revenue Cloud Billing. I found no separate end-of-sale statement for the Billing package on Salesforce's own pages. The often quoted end-of-sale date of March 2025 also comes from third-party reports; the Salesforce page names no date.

The practical deadline is your next renewal. What exactly to secure is in [Salesforce CPQ end of sale: what applies in October 2026](../../../blog/salesforce-cpq-end-of-sale-status/).

```hinweis offen
At the renewal, agree the term, a cap on price increases and the right to run CPQ and Revenue Cloud side by side during a migration.
```

## Revenue Cloud is a redesign on standard objects

Both products configure, price, quote and bill, and underneath they share almost nothing. Salesforce Help says on its [migration page](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5): the data models "differ significantly". The CPQ page adds that "CPQ-specific objects, custom fields, pricing rules, and scripts don't map directly". The comparison per area:

| Area | Salesforce CPQ and Billing (SteelBrick) | Revenue Cloud |
|---|---|---|
| Technical form | Managed packages, namespaces `SBQQ` and `blng` | Standard data model of the platform, API-first quoting |
| Quote, order, sold products | Package objects such as `SBQQ__Quote__c`, subscription records on the contract | Standard objects Quote, Order, Asset |
| Product model | Products and bundles with features and options | Catalogs, categories, product classifications with attributes, bundles |
| Configuration rules | Product rules: validation, selection, filter, alert | Configuration rules and the constraint rules engine with CML |
| Pricing | Price rules, optional JavaScript quote calculator plugin | Pricing procedures, decision tables, context definitions, price waterfall |
| After the sale | Contract with subscription records | Assets with asset state periods and asset actions |
| Amendment and renewal | New quote and opportunity on the contract | Amendment or renewal quote, then an order |
| Approvals | Advanced Approvals package | Advanced Approvals as invocable actions and business APIs |
| Order to fulfilment | Order generated from the quote | Order, optionally through Dynamic Revenue Orchestrator (add-on) |
| Billing | Salesforce Billing package | Revenue Cloud Billing add-on: usage rating and digital wallet, invoicing, payments, collections, accounting subledger |
| Reports and dashboards | Built on package objects | Rebuilt on standard objects |
| Configuration storage | Mostly records | Mostly records |
| Status October 2026 | End of sale, maintenance phase, no new features | Actively developed, sold as Growth and Advanced |

Three rows carry most of the effort.

**Configuration rules.** CPQ product rules are explicit if-then records. Revenue Cloud describes variants through classifications and attributes and checks combinations with declarative constraints in CML. Three hundred product rules do not become three hundred constraints. Someone who understands the machines has to model them again, as described in [chapter 2](../product-catalog-configurator-pricing/).

**Pricing.** Price rules become elements of a pricing procedure. A quote calculator plugin with years of JavaScript has no direct counterpart; each branch is either dropped, rebuilt in a procedure or replaced by a price from SAP. The gain is the price waterfall, which answers "why this price?" on screen.

**Subscriptions.** Every open CPQ subscription becomes an asset with a correct history, so amendments and renewals work through quote and order as described in [chapter 3](../quote-contract-order/). For maintenance contracts and remote monitoring this is the riskiest data in the whole migration.

One row is a similarity: according to [Gearset](https://docs.gearset.com/en/articles/11169961-how-to-compare-and-deploy-revenue-cloud-advanced), most configuration is stored as data in both products. The sources per row are in [Salesforce CPQ vs Revenue Cloud: the real differences](../../../blog/salesforce-cpq-vs-revenue-cloud-differences/).

## Stay on CPQ, move, or take a third route?

Staying is allowed and often right for now, at a price: every release adds to Revenue Cloud and nothing to CPQ. I sort the signals like this:

- **Move** when you need what only Revenue Cloud gets, such as the quoting agent or usage-based and recurring billing in Salesforce; when the product model is redesigned anyway; when the org is rebuilt or a new partner takes over; or when a fragile quote calculator plugin depends on one person.
- **Wait** when the quoting process is stable, prices come from SAP anyway, an S/4HANA migration ties up the same people, or there is no budget for a redesign this year. Use the time to delete unused rules and document the price logic.
- **Check a third route**, a partner product or a custom approach, when configuration rules live in SAP variant configuration, a PLM system or with application engineers and Salesforce would only display the result.

According to the CPQ page, about 15 percent of Revenue Cloud Advanced customers migrated from CPQ. Migrations happen, and nobody is out of time. The full decision matrix is in [Keep Salesforce CPQ or move to Revenue Cloud?](../../../blog/keep-salesforce-cpq-or-revenue-cloud/), and a licence comparison of both routes over several years is part of [make-or-buy and licence forecasts](../../../services/make-or-buy-licences/).

## How does the migration run?

The Help page [Migrate to Revenue Management](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) asks you to "complete all the tasks of each phase in the mentioned sequence before moving to the next phase":

```schritte
Prepare
  Assess which Revenue Cloud capabilities you need and plan operations. Help lists "Retain CPQ License" and "Coexistence During Transition" here: CPQ keeps quoting in production while Revenue Cloud is built in the same org.
Choose a strategy
  Decide how transactional data moves and how rollout and cutover work, for example per product line.
Execute
  Migrate product, asset and billing data, rebuild reports, and run change management in parallel from the start.
```

Help says "There's no set time frame". The CPQ page names 3 to 6 months from discovery to go-live as typical. I would plan 3 months only for a clean org; an [org assessment](../../../blog/ai-org-assessment-technical-debt/) before the estimate shows which kind you have. Both licences run in parallel during that time, so do not stretch the project. Coexistence also needs sandboxes in which both run with realistic data, a point for the [environments and branching](../../devops-release-management/environments-and-branching/) plan.

The CPQ page names three partner offerings: Forsys RevRamp, IdeaHelix and Prodly. They speed up mapping and loading, and Help sets the limit: "tools don't replace human design decisions, particularly for custom logic and integration remapping". Ask each partner how many product rules, price rules and scripts they counted in your org and what they plan for each; partner selection is covered in the AI masterclass chapter on [AIforce and system integrators](../../ai-salesforce/aiforce-and-system-integrators/).

### In which order does the data move?

The order follows the [object deployment reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm) of the Developer Guide, parents before children:

| Step | What moves |
|---|---|
| 1 | Attribute definitions, product classifications, then products. |
| 2 | Product selling models, price books, price book entries, price adjustments. |
| 3 | Bundle components, catalogs and categories. |
| 4 | Assets for every open subscription, built from historical orders. |
| 5 | Billing data, if you use Salesforce Billing today. |

My rules: migrate each open subscription before its next renewal date, and leave closed quotes in CPQ as read-only history. The phases, the work packages and a sample plan are in [CPQ to Revenue Cloud migration: phases, effort, cutover](../../../blog/cpq-to-revenue-cloud-migration-phases/).

## What changes for Salesforce Billing customers?

The Billing package has its own objects under `blng`; Revenue Cloud Billing uses standard objects such as Invoice, CreditMemo and AccountingPeriod, and generates billing schedules from orders. There is no in-place conversion, and schedules follow the migrated assets instead of being copied.

I cut over at the end of an accounting period: last invoice run in the package, reconciliation of the subledger with the ERP, open receivables moved as balances with the old invoice number as reference, closed invoices kept readable or archived. The first Revenue Cloud invoice run starts exactly after the last billed period, or customers are billed twice or not at all. Tax engine, payment gateway and invoice numbering are connected and tested again.

Finance signs off this cutover, not the CRM team. Whether invoices should come from Salesforce at all after the move, and what German e-invoicing from 2027 requires, is covered in [chapter 4](../billing-and-usage-based-pricing/). The cutover itself is in [From Salesforce Billing to Revenue Cloud Billing](../../../blog/from-salesforce-billing-to-revenue-cloud-billing/).

## Configuration and deployments work differently

Catalog, selling models, price book entries and billing policies are records; decision tables, pricing recipes and context definitions are metadata. The [deployment guide](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-overview.html) states: "There's no built-in, Revenue Management-specific deployment tool." Every release is a metadata deployment, a data deployment in the documented order and manual steps such as refreshing decision tables and syncing pricing data.

My rules, set before the first record exists:

| Rule | What it includes |
|---|---|
| A stable unique ID on every configuration object | Because Salesforce record IDs differ between orgs. |
| Products and list prices from SAP arrive through the integration | Never by deployment from a sandbox. |
| Data templates and the data tool belong to the client | For the reasons in [why clients should own their DevOps tools](../../../blog/why-clients-should-own-their-devops-tools/). |

How configuration data moves through a pipeline is covered in the DevOps chapter on [data and configuration](../../devops-release-management/data-and-configuration/), which tool fits in [DevOps tools compared](../../devops-release-management/devops-tools-compared/), and the Revenue Cloud details, including context definitions and configurator rules, in [Revenue Cloud deployments](../../../blog/revenue-cloud-configuration-deployment/).

## Worked example: dosing systems with 45 CPQ users

A maker of dosing systems has used CPQ since 2019: 45 quoting users, about 150 product rules, a quote calculator plugin for dealer discounts and the Billing package for 600 maintenance contracts billed quarterly. The CPQ renewal is due in ten months. All details are assumptions.

- **Renewal:** two years, with a cap on increases and a written option to run Revenue Cloud next to CPQ for nine months.
- **Clean-up now:** unused product rules deleted, plugin logic documented, SAP confirmed as list price master.
- **Proof of concept:** the five most configured systems as constraint models, before any migration contract.
- **Cutover:** spare parts and services first, configured systems second. Subscriptions move in batches before their renewal month, and billing moves at the fiscal year end.

## Decide price master, cutover and billing date yourself

| Topic | The client decides | Partner and tools carry out |
|---|---|---|
| Timing | Renewal term, start date, CPQ read-only date | Plan and estimate |
| Price master | Which price comes from SAP, which from Revenue Cloud | Pricing procedures and price interface |
| Rules | Which product and price rules are still needed | Constraint models and procedures |
| Cutover | All at once, per product line or per country | Data mapping and loads with migration tools |
| History | What moves, what is archived, what stays readable | Extraction and archive |
| Billing | Cutover period and opening balances, signed by finance | Billing configuration and balance loads |
| Operation | Owner per configuration object, tool accounts | Pipeline in the client's tools |

The left column belongs in the decision log before you ask for estimates. Steering several partners through such a move is part of my work in [partner governance](../../../services/partner-governance/), and an [object ownership matrix](../../../blog/salesforce-object-ownership-matrix/) keeps catalog, pricing and assets assigned after go-live. This is the last chapter; [chapter 4](../billing-and-usage-based-pricing/) covers billing and usage, and all chapters are on the [overview page](../).
