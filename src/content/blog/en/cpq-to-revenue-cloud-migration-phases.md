---
title: "CPQ to Revenue Cloud migration: phases, effort, cutover"
description: "How a move from Salesforce CPQ to Revenue Cloud runs: the three phases in Salesforce Help, data order, 3 to 6 months of effort and what the client decides."
pubDate: 2026-10-28
lang: en
slug: cpq-to-revenue-cloud-migration-phases
translationKey: cpq-to-revenue-cloud-migration-plan
topic: revenue
categories: [revenue-cloud, devops]
tags: [Salesforce CPQ, Revenue Cloud, migration, cutover, data migration]
takeaways:
  - "A migration from Salesforce CPQ to Revenue Cloud is a rebuild on standard objects. Salesforce Help says the data models differ significantly and reports must be recreated."
  - "Salesforce Help splits the migration into three phases: prepare, choose a strategy, execute. Each phase is finished before the next one starts."
  - "Salesforce names 3 to 6 months from discovery to go-live as typical, and more for complex implementations. There is no deadline, because CPQ has no end-of-life date."
  - "Data moves in dependency order: catalog and attributes first, then selling models and prices, then assets from open subscriptions, billing data last."
  - "Migration tools from Forsys, IdeaHelix and Prodly speed up mapping. Price master, cutover date and the scope of history remain decisions for the client."
faq:
  - q: "How long does a migration from Salesforce CPQ to Revenue Cloud take?"
    a: "Salesforce names 3 to 6 months from discovery to go-live as typical and says complex implementations can take longer. Salesforce Help sets no fixed timeframe and recommends a pace that fits the business and its complexity."
  - q: "Can Salesforce CPQ and Revenue Cloud run in the same org?"
    a: "Salesforce Help lists coexistence during the transition and retaining the CPQ licence as operational topics to plan before configuration starts. In practice, CPQ keeps quoting in production while Revenue Cloud is built and tested in the same org."
  - q: "Is there a tool that converts CPQ into Revenue Cloud automatically?"
    a: "No tool does it completely. Salesforce names Forsys RevRamp, IdeaHelix and Prodly for mapping and automation, and Salesforce Help states that tools do not replace human design decisions, especially for custom logic and integration remapping."
  - q: "Do CPQ reports and dashboards carry over?"
    a: "No. Salesforce Help says reports, dashboards and analytics built on CPQ objects must be recreated on the standard objects of Revenue Cloud. Plan them as their own work package."
draft: false
---

A migration from Salesforce CPQ to Revenue Cloud is a rebuild on Salesforce standard objects, with a new pricing logic, a new configurator and new reports. Salesforce Help splits it into three phases: prepare, choose a strategy, execute, each finished before the next. Salesforce names 3 to 6 months from discovery to go-live as typical, longer for complex orgs. During that time CPQ keeps running in the same org. Tools speed up the mapping of products and prices, but three decisions stay with you: who owns the price, when you cut over and how much history you move. Without those decisions, any partner estimate is guesswork.

## What actually changes between CPQ and Revenue Cloud?

Salesforce CPQ and Salesforce Billing came from SteelBrick, which Salesforce [bought in December 2015](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/). Both are managed packages with their own objects. Revenue Cloud, which Salesforce Help currently calls Revenue Management and which started as Revenue Lifecycle Management (RLM), is built on standard objects. Salesforce's [CPQ end-of-life page](https://www.salesforce.com/sales/cpq/end-of-life/) puts it briefly: CPQ uses custom objects in a managed package, Revenue Cloud a standard data model with API-first quoting logic, and "CPQ-specific objects, custom fields, pricing rules, and scripts don't map directly".

What that means for the migration, block by block:

| Area | Salesforce CPQ and Billing (SteelBrick) | Revenue Cloud | Consequence for the migration |
|---|---|---|---|
| Data model | Package objects, such as `SBQQ__Quote__c` | Standard objects such as Quote, Order, Asset | Remap every field, flow and integration |
| Products | Products with options and features | Catalog, classifications, attributes, bundles | Redesign the catalog, not just copy it |
| Configuration rules | Product rules | Configuration rules and the constraint rules engine with CML | Model the rules again |
| Pricing | Price rules, [JavaScript Quote Calculator Plugin](https://developer.salesforce.com/docs/revenue/cpq-plugins/guide/cpq-dev-jsqcp-parent.html) | Pricing procedures, decision tables | Rebuild logic and test it with real quotes |
| Contracted business | CPQ subscriptions | Assets with state periods | Create assets for every open subscription |
| Billing | `blng` package | Revenue Cloud Billing on standard objects | Separate cutover, see below |
| Reporting | Reports on package objects | Reports on standard objects | Recreate everything |

The detailed comparison is in [Salesforce CPQ vs Revenue Cloud: the real differences](../salesforce-cpq-vs-revenue-cloud-differences/). For planning, one point is enough: there is no upgrade button, and every line in this table is a work package.

## How does Salesforce structure the migration?

The Help article [Migrate to Revenue Management](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) sets out the frame. The work runs in phases, and Salesforce asks you to "complete all the tasks of each phase in the mentioned sequence before moving to the next phase":

```schritte
Prepare
  Assess which Revenue Cloud capabilities you need, and settle operational planning. Help lists two practical requirements here that apply "regardless of your migration strategy": retaining the CPQ licence and coexistence during the transition.
Choose a strategy
  Decide the migration strategy, how transactional data moves and how rollout and cutover work. Help says these rollout decisions belong early, because they affect scope, integrations, cutover and change management.
Execute
  Migrate product data, asset data and billing data, rebuild reporting and run change management as a parallel workstream from the start.
```

Help sets no fixed timeframe. The CPQ page names 3 to 6 months as typical and adds that complex implementations can take longer. My reading: 3 months is realistic for a clean org with few price rules, and a grown org with years of custom scripts belongs at the upper end or beyond. A [technical debt assessment](../ai-org-assessment-technical-debt/) before the estimate tells you which one you have.

The licence point matters for the budget. While you build, CPQ keeps quoting in production, so you pay for CPQ and Revenue Cloud in parallel for the length of the project. That is one more reason not to stretch the migration over years.

## In which order does the data move?

Help names three groups: product data, asset data and billing data. The order inside them follows the dependencies that the Revenue Cloud Developer Guide lists in its [object deployment reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm). Parents before children, metadata before records:

1. **Catalog structure:** attribute definitions and picklists, product classifications, then the products themselves.
2. **Selling and pricing:** product selling models, price books, cost books, price book entries, then price adjustments.
3. **Bundles and catalogs:** component groups and related components, catalogs and categories.
4. **Assets:** one asset for every open CPQ subscription, so that amendments and renewals work in Revenue Cloud. On [Trailhead](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments), every amendment starts from an asset and runs through a quote and an order.
5. **Billing data:** only if you use Salesforce Billing today. That part has its own article: [from Salesforce Billing to Revenue Cloud Billing](../from-salesforce-billing-to-revenue-cloud-billing/).

```hinweis tipp
Two rules from my side. First, **migrate open subscriptions before their next renewal date.** A contract that renews in CPQ two weeks after go-live creates exactly the double work you want to avoid.

Second, **do not migrate closed quotes.** They stay in CPQ as read-only history, or go to an archive. Nobody amends a quote from 2021.
```

How catalog and prices then move from sandbox to production is a separate topic: [Revenue Cloud deployments](../revenue-cloud-configuration-deployment/).

## What do migration tools do, and what do they not?

On its CPQ page, Salesforce names three partner offerings: Forsys RevRamp for data transformation and schema mapping, IdeaHelix with automation across the migration lifecycle, and Prodly, which analyses the existing CPQ setup. Salesforce also says that about 15% of Revenue Cloud Advanced customers are companies that migrated from CPQ.

These tools save time on products, price book entries and subscriptions. Help is clear about the limit: tools do not replace human design decisions, "especially for custom logic and integration remapping". A price rule that fixes a historical rounding problem, a script that reads a field from SAP, an approval chain with exceptions for one country: someone has to decide whether that logic is still needed and how it looks in a pricing procedure.

When you compare partner offers, I would ask each partner for the same three numbers: how many price rules, product rules and scripts they counted in your org, and what they plan for each. A partner who quotes without counting is selling a range. How to set up such a comparison and which commercial model fits is covered in [fixed price vs time and materials](../fixed-price-vs-time-and-materials-ai/) and in the AI masterclass chapter on [AIforce and system integrators](../../masterclass/ai-salesforce/aiforce-and-system-integrators/).

## A typical scenario, as an assumption

A component maker has used Salesforce CPQ since 2018. It has 60 quoting users, 1,200 products, 40 price rules, a quote calculator plugin with logic added over the years, and 3,500 active service subscriptions for remote monitoring. Invoices come from SAP. All figures are assumptions.

The plan could look like this:

- **Weeks 1 to 4, prepare:** count rules and scripts, decide which logic disappears, set SAP as price master for list prices and Revenue Cloud for discounts.
- **Weeks 5 to 8, strategy:** cutover per product line, starting with spare parts and service, machines last. Subscriptions move in batches, always before their renewal month.
- **Months 3 to 5, execute:** catalog and pricing in the pipeline, assets for the first batch of subscriptions, reports rebuilt, sales trained per product line.
- **Month 6:** last product line moves, CPQ goes read-only, the CPQ licence ends at the next renewal date.

Since Billing is not in use, this scenario has no billing cutover. With Salesforce Billing it would add a period-end cutover and the sign-off from finance.

Training per product line covers only part of the change management that Help asks for as a parallel workstream. 60 users who have quoted in CPQ for years also need to understand why their tool is changing. Why training alone rarely does it is described in [Salesforce change management: why rollouts fail](../change-management-salesforce-rollout/).

## What must the client decide itself?

These decisions belong to you, not to the partner or the tool:

- **Price master:** which prices come from SAP, which are calculated in Revenue Cloud. Two masters for one price never work.
- **Cutover model:** all at once, per product line or per country, and the date CPQ becomes read-only.
- **History:** what moves, what is archived, what stays readable in CPQ.
- **Ownership after go-live:** who maintains classifications, constraint rules and pricing procedures. An [object ownership matrix](../salesforce-object-ownership-matrix/) helps when several partners work in the same org.
- **Licence end:** when the CPQ contract ends. CPQ has no end-of-life date, so this date is entirely yours.

Whether you should move at all, or stay on CPQ for now, is the question of [keep Salesforce CPQ or move to Revenue Cloud](../keep-salesforce-cpq-or-revenue-cloud/). The whole topic is covered in the masterclass chapter [from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/), and steering several partners through such a move is part of my work in [partner governance](../../services/partner-governance/).

A CPQ migration succeeds when price master, cutover and history are decided before the first partner starts building. If you are planning this move, [send me a message](#contact).
