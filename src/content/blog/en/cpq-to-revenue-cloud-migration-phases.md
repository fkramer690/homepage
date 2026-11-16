---
title: "CPQ to Revenue Cloud migration: phases, effort, cutover"
description: "How a move from Salesforce CPQ to Revenue Cloud runs: three readiness phases from Salesforce Help, data order, 3 to 6 months of effort and client decisions."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: cpq-to-revenue-cloud-migration-phases
translationKey: cpq-to-revenue-cloud-migration-plan
topic: revenue
categories: [revenue-cloud, devops]
tags: [Salesforce CPQ, Revenue Cloud, migration, cutover, data migration]
takeaways:
  - "According to Salesforce Help the data models differ significantly. Reports on CPQ objects are rebuilt, not migrated."
  - "CPQ has no end-of-life date, so you choose the cutover. Keep at least one CPQ license while CPQ data is still in use."
  - "Data moves in dependency order: attributes and catalog first, then selling models and prices, then assets with their order history, then billing data."
  - "Migration tools from Forsys, IdeaHelix and Prodly speed up mapping. Price master, cutover date and the scope of history remain client decisions."
faq:
  - q: "How long does a migration from Salesforce CPQ to Revenue Cloud take?"
    a: "Salesforce gives 3 to 6 months from discovery to go-live as typical and says complex implementations can take longer. Salesforce Help sets no fixed timeframe and recommends a pace that fits the business and its complexity."
  - q: "Can Salesforce CPQ and Revenue Cloud run in the same org?"
    a: "Yes, if the org has the Revenue Cloud Advanced licenses that the documented coexistence requires. Salesforce Help also allows for a new org. In the same-org setup, CPQ keeps quoting in production while Revenue Cloud is built and tested."
  - q: "Is there a tool that converts CPQ into Revenue Cloud automatically?"
    a: "No tool does it completely. Salesforce names Forsys RevRamp, IdeaHelix and Prodly for mapping and automation, and Salesforce Help states that tools do not replace human design decisions, especially for custom logic and integration remapping."
  - q: "Do CPQ reports and dashboards carry over?"
    a: "No. Salesforce Help says reports, dashboards and analytics built on CPQ objects must be recreated on the standard objects of Revenue Cloud. Plan them as their own work package."
draft: false
---

A migration from Salesforce CPQ to Revenue Cloud is a rebuild on Salesforce standard objects, with a new pricing logic, a new configurator and new reports. Salesforce Help puts three readiness phases before the data migration: understand your current state, decide your migration strategy, build readiness. Salesforce names 3 to 6 months from discovery to go-live as typical, longer for complex orgs. In the usual same-org setup, CPQ keeps running during that time. Tools speed up the mapping of products and prices, but three decisions stay with you: who owns the price, when you cut over and how much history you move. Without those decisions, any partner estimate is guesswork.

## What actually changes between CPQ and Revenue Cloud?

Salesforce CPQ and Salesforce Billing came from SteelBrick, which Salesforce [agreed to buy in December 2015 (closed in February 2016)](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/). Both are managed packages with their own objects. Revenue Cloud, which Salesforce Help currently calls Revenue Management and which started as Revenue Lifecycle Management (RLM), is built on standard objects. Salesforce's [CPQ end-of-life page](https://www.salesforce.com/sales/cpq/end-of-life/) puts it briefly: CPQ uses custom objects in a managed package, Revenue Cloud a standard data model with API-first quoting logic, and "CPQ-specific objects, custom fields, pricing rules, and scripts don't map directly".

What that means for the migration, block by block:

| Area | Salesforce CPQ and Billing (SteelBrick) | Revenue Cloud | Consequence for the migration |
|---|---|---|---|
| Data model | Package objects, such as `SBQQ__Quote__c` | Standard objects such as Quote, Order, Asset | Remap every field, flow and integration |
| Products | Products with options and features | Catalog, classifications, attributes, bundles | Redesign the catalog, not just copy it |
| Configuration rules | Product rules | Configuration rules and the constraint rules engine with CML | Model the rules again |
| Pricing | Price rules, [JavaScript Quote Calculator Plugin](https://developer.salesforce.com/docs/revenue/cpq-plugins/guide/cpq-dev-jsqcp-parent.html) | Pricing procedures, decision tables | Rebuild logic and test it with real quotes |
| Contracted business | CPQ subscriptions | Assets with state periods | Create assets for every open subscription |
| Billing | `blng` package | Revenue Cloud Billing on standard objects | Separate cutover, see below |
| Reporting | Reports on package objects | Reports on standard objects | Recreate reports on CPQ objects |

The detailed comparison is in [Salesforce CPQ vs Revenue Cloud: the real differences](/en/blog/salesforce-cpq-vs-revenue-cloud-differences/). For planning, one point is enough: there is no upgrade button, and every line in this table is a work package.

## Salesforce puts three readiness phases before the migration

The Help article [Migrate to Revenue Management](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) sets out the framework. Readiness runs in [three phases](https://help.salesforce.com/s/articleView?id=ind.rev_migration_phases.htm&language=en_US&type=5), and Salesforce asks you to "complete all the tasks of each phase in the mentioned sequence before moving to the next phase". The data migration itself follows afterwards:

```schritte
Understand your current state
  Assess which Revenue Cloud capabilities you need and what your CPQ org contains. Help says to complete this phase before any strategic decision.
Decide your migration strategy
  Select the strategy, how transactional data moves, how rollout and cutover work and who helps deliver. Help says these decisions affect scope, integrations, cutover and change management.
Build readiness
  Prepare the organization, including retaining the CPQ license and planning coexistence. In Help's words, the goal "isn't to start the migration, but to make sure that the migration starts successfully".
Migrate
  Move product data, asset data and billing data, rebuild reporting and run change management as a parallel workstream from the start.
```

Salesforce Help gives no fixed timeframe. The CPQ page gives 3 to 6 months as typical and adds that complex implementations can take longer. My reading: 3 months is realistic for a clean org with few price rules, while an org that has grown over years with custom scripts belongs at the upper end or beyond. A [technical debt assessment](/en/blog/ai-org-assessment-technical-debt/) before the estimate tells you which one you have.

The license point matters for the budget. Help asks you to [retain at least one active CPQ license](https://help.salesforce.com/s/articleView?id=ind.rev_migration_operational_considerations_cpq_license.htm&language=en_US&type=5) throughout the migration and as long as CPQ data is still referenced; without one you lose access to historical CPQ data and reports. While you build, CPQ usually keeps quoting in production, so plan for overlapping license costs and confirm the commercial terms with Salesforce. That is one more reason not to stretch the migration over years.

## Data moves in the order of its dependencies

Salesforce Help identifies three groups: product data, asset data and billing data. The order within those groups follows the dependencies that the Revenue Cloud Developer Guide lists in its [object deployment reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm). Parents before children, metadata before records. The list below is a simplified view of that reference:

1. **Catalog structure:** attribute picklists and their values, attribute definitions, product classifications, then the products themselves.
2. **Selling and pricing:** product selling models and their options, price books, cost books, price book entries, then price adjustments.
3. **Bundles and catalogs:** component groups and related components, catalogs and categories.
4. **Assets:** CPQ subscriptions become assets, and Help says the full history chain is required. The preferred method generates assets from historical orders; creating assets directly is the alternative when the order history cannot be rebuilt. Without that chain, amendments and renewals do not work. On [Trailhead](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments), every amendment starts from an asset and runs through a quote and an order.
5. **Billing data:** only if you use Salesforce Billing today, with its own method and cutover plan. That part has its own article: [from Salesforce Billing to Revenue Cloud Billing](/en/blog/from-salesforce-billing-to-revenue-cloud-billing/).

```hinweis tipp
Two rules from my side. First, **if a renewal is meant to run in Revenue Cloud, migrate the subscription before its renewal date.** A contract that renews in CPQ two weeks after go-live creates exactly the double work you want to avoid.

Second, **leave closed quotes behind**, as Help says is typical, unless audit or reporting needs them. They either stay in CPQ as read-only history, which requires a CPQ license, or go to an archive.
```

How catalog and prices then move from sandbox to production is a separate topic: [Revenue Cloud deployments](/en/blog/revenue-cloud-configuration-deployment/).

## What do migration tools do, and what don't they do?

On its CPQ page, Salesforce names three partner offerings: Forsys RevRamp for data transformation and schema mapping, IdeaHelix with automation across the migration lifecycle, and Prodly, which analyses the existing CPQ setup. Salesforce also says that about 15% of Revenue Cloud Advanced customers are companies that migrated from CPQ.

These tools save time on products, price book entries and subscriptions. Salesforce Help is clear about the limit: tools do not replace human design decisions, "especially for custom logic and integration remapping". A price rule that fixes a historical rounding problem, a script that reads a field from SAP, an approval chain with exceptions for one country: someone has to decide whether that logic is still needed and how it should be represented in a pricing procedure.

When you compare partner offers, I would ask each partner for the same three numbers: how many price rules, product rules and scripts they found in your org, and what they plan to do with each. A partner who quotes without counting is selling a range. How to set up such a comparison and which commercial model fits is covered in [fixed price vs time and materials](/en/blog/fixed-price-vs-time-and-materials-ai/) and in the AI masterclass chapter on [AIforce and system integrators](/en/masterclass/ai-salesforce/aiforce-and-system-integrators/).

## Worked example: a component maker on CPQ since 2018

Assume a component maker has used Salesforce CPQ since 2018. It has 60 quoting users, 1,200 products, 40 price rules, a quote calculator plugin with logic added over the years, and 3,500 active service subscriptions for remote monitoring. Invoices come from SAP. All figures are assumptions.

The plan could look like this:

- **Weeks 1 to 4, prepare:** count rules and scripts, decide which logic disappears, set SAP as price master for list prices and Revenue Cloud for discounts.
- **Weeks 5 to 8, strategy:** cutover per product line, starting with spare parts and service, machines last. Subscriptions move in batches, always before their renewal month.
- **Months 3 to 5, execute:** catalog and pricing in the pipeline, assets for the first batch of subscriptions, reports rebuilt, sales trained per product line.
- **Month 6:** last product line moves and CPQ goes read-only. One CPQ license stays as long as quotes and subscriptions in CPQ are still referenced; the rest end at the next renewal date.

Since Billing is not in use, this scenario has no billing cutover. With Salesforce Billing, the plan would also include a period-end cutover and sign-off from finance.

Training per product line covers only part of the change management that Help asks for as a parallel workstream. 60 users who have quoted in CPQ for years also need to understand why their tool is changing. Why training alone rarely does it is described in [Salesforce change management: why rollouts fail](/en/blog/change-management-salesforce-rollout/).

## What must the client decide itself?

These decisions belong to you, not to the partner or the tool:

- **Price master:** which prices come from SAP, which are calculated in Revenue Cloud. Each price component needs one source.
- **Cutover model:** all at once, per product line or per country, and the date CPQ becomes read-only.
- **History:** what moves, what is archived, what stays readable in CPQ.
- **Ownership after go-live:** who maintains classifications, constraint rules and pricing procedures. An [object ownership matrix](/en/blog/salesforce-object-ownership-matrix/) helps when several partners work in the same org.
- **License end:** when the CPQ contract ends. CPQ has no end-of-life date, so this date is yours to choose, subject to your contract terms and the need to keep CPQ data readable.

Whether you should move at all, or stay on CPQ for now, is the question of [keep Salesforce CPQ or move to Revenue Cloud](/en/blog/keep-salesforce-cpq-or-revenue-cloud/). The whole topic is covered in the masterclass chapter [from CPQ to Revenue Cloud](/en/masterclass/revenue-cloud/from-cpq-to-revenue-cloud/), and steering several partners through such a move is part of my work in [partner governance](/en/services/partner-governance/).
