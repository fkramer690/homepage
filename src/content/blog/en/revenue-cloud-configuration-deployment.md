---
title: "Revenue Cloud deployments: configuration in the pipeline"
description: "How catalog, pricing procedures and context definitions move from sandbox to production when most Revenue Cloud configuration is data, and what stays manual."
pubDate: 2026-10-28
lang: en
slug: revenue-cloud-configuration-deployment
translationKey: revenue-cloud-configuration-deployment
topic: devops
categories: [revenue-cloud, devops]
tags: [Revenue Cloud, deployment, configuration data, context definitions, SFDMU, Gearset]
takeaways:
  - "Most Revenue Cloud configuration is records on standard objects: attributes, classifications, products, selling models, price book entries, billing policies. A metadata deployment alone carries little of it."
  - "Salesforce has no built-in deployment tool for Revenue Cloud. The Developer Guide gives a deployment sequence per area: metadata first, parents before children."
  - "Context definitions: only custom ones can be retrieved and deployed, activation is a manual step, and deploying to an org on an older release is not supported."
  - "After every deployment, decision tables are refreshed, pricing data is synced and the product index is rebuilt. These steps belong in the release checklist."
  - "Configuration data needs a stable unique ID per record and a data tool the client owns. Products and prices from SAP never travel by deployment into production."
faq:
  - q: "Can Revenue Cloud configuration be deployed with change sets or the Metadata API?"
    a: "Only partly. Decision tables, pricing recipes and context definitions are metadata, but catalog, attributes, selling models, price book entries and billing policies are records. Those need a data deployment with SFDMU, Gearset, Copado or a similar tool."
  - q: "Why do context definitions fail to deploy?"
    a: "Gearset documents two typical errors that come from definitions being out of sync in the target org; the fix is to click Sync on the Context Service page there and deploy again. Standard definitions cannot be deployed at all, only custom ones."
  - q: "Do product configurator rules move between orgs like other records?"
    a: "No. According to the Developer Guide, the rule content references product IDs that cannot be migrated as they are, and Salesforce points to an npm utility, rev-config-rule-migrator, for the migration."
  - q: "Does deploying Revenue Cloud configuration differ from deploying CPQ configuration?"
    a: "In both products most configuration is data. The difference is the objects: CPQ keeps it in package objects with the SBQQ prefix, Revenue Cloud in standard objects with activation states and post-deployment steps such as refreshing decision tables."
draft: false
---

Most Revenue Cloud configuration is data: attribute definitions, product classifications, products, selling models, price book entries, adjustments and billing policies are records on standard objects. Only part of it, such as decision tables, pricing recipes and context definitions, is metadata. Salesforce offers no Revenue Cloud specific deployment tool and documents a sequence per area instead: metadata first, parent records before children. Several steps stay manual, such as activating context definitions, refreshing decision tables, syncing pricing data and rebuilding the product index. My rule: configuration data lives in the client's repository with a stable unique ID per record, and ERP master data never travels by deployment.

## Why is Revenue Cloud configuration mostly data?

In Salesforce CPQ, price rules, product rules and options are records in package objects. Revenue Cloud, also listed in Salesforce Help as Revenue Management and earlier as Revenue Lifecycle Management, keeps the same principle on standard objects. Gearset sums it up in its [comparison of CPQ and Revenue Cloud](https://docs.gearset.com/en/articles/10981375-understanding-the-difference-between-salesforce-cpq-and-revenue-lifecycle-management-rlm-revenue-cloud-advanced-rca): in both products "most configuration is stored as data, not metadata".

For teams coming from CPQ, the differences look like this:

| Topic | Salesforce CPQ | Revenue Cloud |
|---|---|---|
| Where configuration lives | Package objects with the `SBQQ` prefix | Standard objects such as ProductClassification, ProductSellingModel, PriceBookEntry |
| Metadata part | Small | Decision tables, pricing recipes, context definitions, flows |
| Status of records | Mostly active flags | Draft, active and inactive states, some activated only through the UI or an API |
| After the deployment | Usually nothing | Refresh decision tables, sync pricing data, rebuild product index |
| Tool support | Mature, for example Gearset's external ID wizard | Data templates; Gearset's external ID wizard does not support Revenue Cloud yet |

The consequence: a Revenue Cloud release is always two deployments, metadata and data, plus a short list of manual steps. The detailed comparison of both products is in [Salesforce CPQ vs Revenue Cloud: the real differences](../salesforce-cpq-vs-revenue-cloud-differences/).

## In which order does configuration move?

The [Revenue Management deployment guide](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-overview.html) says plainly: "There's no built-in, Revenue Management-specific deployment tool." Instead it describes the rules in [deployment workflows and sequence](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-workflows-and-sequence.html): metadata has to be in place before the records of an object, parents come before children, and circular references sometimes need a second pass. Two of Salesforce's examples: the product specification record type before any product, and decision tables before pricing recipes.

The [object deployment reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm) has one table per area: product catalog, pricing, configurator, transactions, Dynamic Revenue Orchestrator, usage, billing and contracts. Shortened, the catalog and pricing order reads:

1. Product specification type and record type (metadata).
2. Attribute picklists and values, units of measure, attribute definitions and categories.
3. Product classifications and their attributes, then Product2.
4. Product selling models and their options, then bundle components.
5. Catalogs, categories and their product assignments.
6. Price books, cost books, price book entries, then price adjustment schedules and tiers.

Billing has its own sequence, from legal entity and billing policy to tax engine, payment terms and accounting periods. I keep these tables as the source for the order of data steps in the pipeline, not a partner's memory.

## What does the pipeline deploy, and what stays manual?

Some parts move only with care. From the Developer Guide and Gearset:

- **Context definitions.** According to [Gearset](https://docs.gearset.com/en/articles/11384495-how-to-deploy-context-definitions), only custom context definitions can be retrieved and deployed; standard ones cannot. If a deployment fails because the target is out of sync, click Sync on the Context Service page in the target org and deploy again. Salesforce's [notes on the context service](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-context-service-additional-info.html) add that activation and deactivation are a manual step outside the deployment, and that deploying from the current release to an older one is not supported.
- **Pricing.** Per the [pricing notes](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-salesforce-pricing-additional-info.html), decision tables and pricing procedures must be activated, a decision table needs a refresh for every new or changed record, and an active or inactive record cannot be set back to draft.
- **Configurator rules.** Per the [configurator notes](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-product-configurator-additional-info.html), rules in active status cannot be updated, and the target constraint model must be deactivated before an update. The rule content references product IDs, so Salesforce points to an npm utility, `rev-config-rule-migrator`, for migrating rules.
- **After every deployment.** The [post-deployment steps](https://developer.salesforce.com/docs/revenue/revenue-management/guide/post-deployment-steps.html) are: refresh decision tables, sync pricing data, rebuild the product index, create manually what the API could not deploy, and set up test users.

The release point is the one that catches teams out. During the Salesforce preview window, sandboxes run the new release weeks before production. A context definition built in a preview sandbox then cannot go to production until production has the same release. Which sandbox runs which release is part of the [environments and branching](../../masterclass/devops-release-management/environments-and-branching/) plan.

## How do records find each other across orgs?

A product has a different Salesforce ID in every org. The guide on [global unique ID setup](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-global-uid-setup.html) states that this ID "isn't portable" and recommends a unique ID column on all objects from day one, or a maintained mapping of record IDs between orgs. For metadata types, the API name serves as the ID.

I would set this up before the first configuration record is created, as a field marked as external ID on every configuration object with a readable value such as `PSM_TERM_MONTHLY` or `PCL_PUMP_STANDARD`. Added later, it means a cleanup of every sandbox.

## Which tool moves the data?

Any data tool that loads related records in order and matches on external IDs. The DevOps masterclass chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/) compares SFDMU, the open-source Salesforce CLI plugin, with the data modules of Gearset, Copado and Flosum. For Revenue Cloud, Gearset recommends its data deployment templates. Which tool fits your programme overall is decided in [DevOps tools compared](../../masterclass/devops-release-management/devops-tools-compared/).

One rule applies whatever the tool: the data templates, the SFDMU workspaces and the tool account belong to the client. Revenue Cloud configuration is your price logic and your catalog. If it lives in a partner's Gearset account, a partner change becomes a migration project. The reasons are in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).

## Where is the line between configuration and ERP master data?

The deployment reference lists Product2 and PriceBookEntry as configuration objects. At a manufacturer that is only half true. If material numbers and list prices come from SAP, they arrive in production through the integration, and a sandbox gets a seed set. A deployment from sandbox to production would be a second, competing route.

My split:

- **Repository and pipeline:** attributes, classifications, selling models, bundle structures, adjustment rules, pricing procedures, decision tables, context definitions, billing and tax policies.
- **Integration from SAP:** products with material numbers, list prices, customer conditions if SAP is the price master.

Which prices SAP should own is covered in [customer prices: SAP conditions or Salesforce Pricing](../customer-prices-sap-conditions-or-salesforce-pricing/).

## A typical scenario, as an assumption

A machine builder runs Revenue Cloud with three sandboxes and production. 300 products and list prices come from SAP; 45 attributes, 12 classifications, 4 selling models and 6 pricing procedures are maintained in Salesforce. All figures are assumptions.

A release that adds a new attribute-based surcharge then runs like this: the pull request contains the attribute definition, the classification change and the new adjustment rule as SFDMU records with external IDs, plus the changed decision table as metadata. The pipeline deploys metadata, then data, in the order of the reference tables. The release checklist covers the rest: activate the procedure, refresh decision tables, sync pricing data, rebuild the product index, and run five regression quotes. Setting up such a pipeline is part of my work in [DevOps and release management](../../services/devops-release-management/), and the migration that comes before it is in [CPQ to Revenue Cloud migration](../cpq-to-revenue-cloud-migration-phases/) and the masterclass chapter [from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/).

Revenue Cloud configuration belongs in the pipeline like code, with a fixed order, unique IDs and a checklist for the manual steps. If you want to set that up, [send me a message](#contact).
