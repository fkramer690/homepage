---
title: "Revenue Cloud deployments: configuration in the pipeline"
description: "How catalog, pricing procedures and context definitions move from sandbox to production when most Revenue Cloud configuration is data, and what stays manual."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: revenue-cloud-configuration-deployment
translationKey: revenue-cloud-configuration-deployment
topic: devops
categories: [revenue-cloud, devops]
tags: [Revenue Cloud, deployment, configuration data, context definitions, SFDMU, Gearset]
takeaways:
  - "Context definitions, decision tables and product specification types are metadata. Products, attributes and prices are records."
  - "Salesforce has no built-in deployment tool specific to Revenue Management. The guide sets the order: metadata first, parents before children."
  - "Custom context definitions can be deployed, but you activate them by hand. Deploying to an org on an older release is not supported."
  - "Most deployments need follow-up steps such as refreshing decision tables or rebuilding the product index, depending on what changed."
  - "Configuration records need a stable unique ID. If SAP is the master for products or prices, they reach production through the integration."
faq:
  - q: "Can Revenue Cloud configuration be deployed with change sets or the Metadata API?"
    a: "Only partly. Decision tables, pricing recipes, context definitions, product specification types, flows and fields are metadata, but catalog, attributes, selling models, price book entries and billing policies are records. Those need a data deployment with SFDMU, Gearset, Copado or a similar tool."
  - q: "Why do context definitions fail to deploy?"
    a: "Common causes are definitions that are out of sync in the target org (Gearset's fix: click Sync on the Context Service page in the target org and deploy again), duplicate context tags or mappings, version conflicts and a target org on an older release. Standard definitions cannot be deployed at all, only custom ones."
  - q: "Do product configurator rules move between orgs like other records?"
    a: "No. According to the Developer Guide, the rule content references product IDs that cannot be migrated unchanged, and Salesforce points to an npm package, rev-config-rule-migrator, for the migration."
  - q: "Does deploying Revenue Cloud configuration differ from deploying CPQ configuration?"
    a: "In both products, most configuration is data. The difference is in the objects: CPQ keeps configuration in package objects with the SBQQ prefix, while Revenue Cloud keeps it in standard objects with activation states and post-deployment steps such as refreshing decision tables. CPQ is a managed package, while Revenue Cloud is native to the platform."
draft: false
---

Most Revenue Cloud configuration is data: attribute definitions, product classifications, products, selling models, price book entries, adjustments and billing policies are records on standard objects. Other parts, such as decision tables, pricing recipes, context definitions and product specification types, are metadata. Salesforce offers no built-in deployment tool specific to Revenue Cloud and instead documents deployment sequences by area: metadata first, parent records before children. Several steps stay manual, such as activating context definitions and, depending on the change, refreshing decision tables or rebuilding the product index. My rule: configuration data lives in the client's repository with a stable unique ID, and ERP master data comes through the integration.

## Why is Revenue Cloud configuration mostly data?

In Salesforce CPQ, price rules, product rules and options are records in package objects. Revenue Cloud, which Salesforce now calls Agentforce Revenue Management (the developer guide says Revenue Management), applies the same principle to standard objects. I use the old name because it lives on in licenses such as Revenue Cloud Advanced. Gearset sums it up in its [comparison of CPQ and Revenue Cloud](https://docs.gearset.com/en/articles/11169961-how-to-compare-and-deploy-revenue-cloud-advanced): in both products "most configuration is stored as data, not metadata".

For teams coming from CPQ, the differences look like this:

| Topic | Salesforce CPQ | Revenue Cloud |
|---|---|---|
| Where configuration lives | Package objects with the `SBQQ` prefix | Standard objects such as ProductClassification, ProductSellingModel, PriceBookEntry |
| Metadata part | Managed package version plus your own customization; business configuration mainly in `SBQQ` records | Native platform metadata such as decision tables, pricing recipes, context definitions, product specification types and flows |
| Record states | Active checkbox on price and product rules | Varies by object, for example draft, active and inactive on selling models; some activation is manual |
| Gearset support | Compare and deploy with the external ID wizard | External ID wizard plus deployment of configuration data alongside metadata, sequenced automatically |

The consequence: a Revenue Cloud release can contain metadata, configuration data and manual setup steps. When it contains both metadata and data, the deployment steps have to run in the right order. The detailed comparison of both products is in [Salesforce CPQ vs Revenue Cloud: the real differences](../salesforce-cpq-vs-revenue-cloud-differences/).

## Metadata first, parents before children

The [Revenue Management deployment guide](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-overview.html) says plainly: "There's no built-in, Revenue Management-specific deployment tool." Instead it describes the rules in [deployment workflows and sequence](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-workflows-and-sequence.html): metadata has to be in place before the records of an object, parents come before children, and circular references sometimes need a second pass. Two of Salesforce's examples are the product specification record type before any product, and decision tables before pricing recipes.

The [object deployment reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm) has one table per area: product catalog, pricing, configurator, transactions, Dynamic Revenue Orchestrator, usage, billing and contracts. The shortened order for catalog and pricing is here:

```vertiefung For developers
title: Catalog and pricing order, from top to bottom
- Product specification type and record type (metadata).
- Attribute picklists and values, units of measure, attribute definitions and categories.
- Product classifications and their attributes, then Product2.
- Product selling models and their options, then bundle components.
- Catalogs, categories and their product assignments.
- Price books, cost books, price book entries, then price adjustment schedules and tiers.
```

Billing has its own sequence, from legal entity and billing policy to tax engine, payment terms and accounting periods. I use these tables as the source for ordering data steps in the pipeline, not a partner's memory.

## What does the pipeline deploy, and what stays manual?

Some parts can be moved only with care. From the Developer Guide and Gearset:

- **Context definitions.** According to [Gearset](https://docs.gearset.com/en/articles/11384495-how-to-deploy-context-definitions), only custom context definitions can be retrieved and deployed; standard ones cannot. If a deployment fails because the target is out of sync, click Sync on the Context Service page in the target org and deploy again. Salesforce's [notes on the context service](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-context-service-additional-info.html) add that activation and deactivation are manual steps outside the deployment, and that deploying from the current release to an older one is not supported.
- **Pricing.** According to the [pricing notes](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-salesforce-pricing-additional-info.html), decision tables and pricing procedures must be activated, a decision table needs to be refreshed for every new or changed record, and an active or inactive product selling model cannot be set back to draft. Also check pricing procedure constants: Salesforce notes that they can contain sandbox record IDs, including price adjustment schedule IDs, which you have to replace with the target org's IDs.
- **Configurator rules.** According to the [configurator notes](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-product-configurator-additional-info.html), rules with an active status cannot be updated, and the target constraint model must be deactivated before an update. The rule content references product IDs, so Salesforce points to an npm package, `rev-config-rule-migrator`, for migrating rules.
- **After the deployment.** According to the [post-deployment steps](https://developer.salesforce.com/docs/revenue/revenue-management/guide/post-deployment-steps.html), "most deployments" need follow-up. Salesforce's examples: refresh decision tables, sync pricing data, rebuild the product index, create manually what the API could not deploy, and set up test users. Which of these steps a release needs depends on what changed; a full pricing sync, for instance, is not a routine step for every deployment.

The release point is the easiest one to miss:

```hinweis achtung
During the Salesforce preview window, sandboxes run the new release weeks before production. A context definition built in a preview sandbox then cannot go to production until production has the same release.
```

Which sandbox runs which release is part of the [environments and branching](../../masterclass/devops-release-management/environments-and-branching/) plan.

## Every configuration record needs a stable unique ID

A product has a different Salesforce ID in every org. The guide on [global unique ID setup](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-global-uid-setup.html) states that this ID "isn't portable" and recommends a unique ID column on all objects from day one, or a maintained mapping of record IDs between orgs. For metadata types, the API name serves as the ID.

I would set this up before the first configuration record is created, as a field marked as an external ID on every extensible configuration object. Salesforce's [GUID design notes](https://developer.salesforce.com/docs/revenue/revenue-management/guide/deployment-guid-design-concept.html) ask for a value that is immutable, globally unique and generated by a program, not typed in, and warn against names or combined keys. A few objects are protected and cannot be given a new field; for those, you keep the ID in an external reference table. A readable code such as `PSM_TERM_MONTHLY` can sit next to it as a business key, but it is not the deployment ID. If the ID is added later, every sandbox needs to be cleaned up.

## Which tool moves the data?

Use any data tool that loads related records in order and matches on external IDs. The DevOps masterclass chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/) compares SFDMU, the open-source Salesforce CLI plugin, with the data modules of Gearset, Copado and Flosum. For Revenue Cloud, Gearset runs its External ID wizard first and then deploys configuration data together with metadata. Which tool fits your program overall is covered in [DevOps tools compared](../../masterclass/devops-release-management/devops-tools-compared/).

One rule applies whatever the tool: the data templates, the SFDMU workspaces and the tool account belong to the client. Revenue Cloud configuration is your price logic and your catalog. If it lives in a partner's Gearset account, changing partners becomes a migration project. The reasons are in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).

## Where is the line between configuration and ERP master data?

The deployment reference lists Product2 and PriceBookEntry as configuration objects. For a manufacturer, that is only half true. If material numbers and list prices come from SAP, they arrive in production through the integration, and a sandbox gets a seed set. A deployment from sandbox to production would be a second, competing route.

My split:

- **Repository and pipeline:** attributes, classifications, selling models, bundle structures, adjustment rules, pricing procedures, decision tables, context definitions, billing and tax policies.
- **Integration from SAP:** products with material numbers, list prices, customer conditions if SAP is the price master.

Which prices SAP should own is covered in [customer prices: SAP conditions or Salesforce Pricing](../customer-prices-sap-conditions-or-salesforce-pricing/).

## Worked example: a release with a new attribute surcharge

A machine builder runs Revenue Cloud with three sandboxes and production. 300 products and list prices come from SAP; 45 attributes, 12 classifications, 4 selling models and 6 pricing procedures are maintained in Salesforce. All figures are assumptions.

A release that adds a new attribute-based surcharge then works like this: the pull request contains the attribute definition, the classification change and the new adjustment rule as SFDMU records with external IDs, plus the changed decision table as metadata. The pipeline deploys metadata, then data, in the order of the reference tables. The release checklist covers the rest: replace any sandbox IDs in pricing procedure constants, activate the procedure, refresh the affected decision tables, rebuild the product index if catalog or search changed, and run five regression quotes. Setting up such a pipeline is part of my work in [DevOps and release management](../../services/devops-release-management/), and the migration that comes before it is covered in [CPQ to Revenue Cloud migration](../cpq-to-revenue-cloud-migration-phases/) and the masterclass chapter [from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/).
