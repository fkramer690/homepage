---
title: "Data and configuration in the Salesforce pipeline"
description: "How Field Service rules, custom settings and price books move through the pipeline with SFDMU, Gearset or Copado, and how sandbox data stays masked."
lang: en
slug: data-and-configuration
course: devops
translationKey: devops-07
chapter: 7
pubDate: 2026-10-28
short: "Data and configuration"
summary: "Which configuration and reference data is not metadata, how it moves through the pipeline and how sandboxes stay masked."
takeaways:
  - "Field Service scheduling policies, work rules, operating hours and custom settings records are data; a metadata deployment does not carry them."
  - "Configuration data belongs in the repository and runs through the same pipeline after the metadata deployment, matched on external IDs instead of Salesforce IDs."
  - "SFDMU is an open-source Salesforce CLI plugin for data migration; sfdx-hardis runs it as a deployment action, and Gearset, Copado and Flosum have their own data modules."
  - "Master data such as products and prices from SAP arrives through the integration or as a seed data set, never by deployment from a sandbox to production."
  - "After every refresh of a partial or full sandbox, masking runs before partners get access; Salesforce Data Mask & Seed is one option for this."
articles: [sandbox-data-ai-coding-agents, sfdx-hardis-introduction, sfdx-hardis-training, client-owned-devops-tools]
faq:
  - q: "Why don't custom settings records come along with a deployment?"
    a: "According to Trailhead, custom settings records cannot be deployed with a package, the Metadata API or change sets. The definition travels, the values do not. Custom metadata type records, on the other hand, are metadata and do travel."
  - q: "Do I need a commercial tool for configuration data?"
    a: "No. SFDMU is open source and runs as a Salesforce CLI plugin, and sfdx-hardis calls it as a deployment action. Gearset, Copado and Flosum offer a user interface with dependency analysis, which helps admins who do not work on the command line."
  - q: "Can I roll back a data deployment?"
    a: "Usually not. Gearset's documentation states plainly that data deployments cannot be rolled back. Plan a backup of the affected objects before the release."
  - q: "Does Salesforce Data Mask run automatically after a sandbox refresh?"
    a: "According to Trailhead, a sandbox picks up the masking configuration when it is created or refreshed, but you start the run yourself from the Data Mask tab in the sandbox. The Data Mask & Seed product page also lists scheduled jobs, daily, weekly or monthly."
  - q: "What does Data Mask & Seed cost?"
    a: "Salesforce's product page lists no price; it offers a 30-day trial and a call with sales. Ask your account executive for a quote."
draft: false
---

Data and configuration that is not metadata slips through many Salesforce pipelines: Field Service scheduling policies and work rules, operating hours, custom settings records, products and price books. A metadata deployment does not carry them, so they end up as manual release steps. My rule: configuration data lives in the repository and runs through the same pipeline after the metadata deployment, with SFDMU or the data module of a commercial tool. Master data from SAP arrives through the integration, test data as a seed set. Customer data in partial and full sandboxes is masked after every refresh, for example with Salesforce Data Mask & Seed.

## Which data counts as configuration, and which does not?

[Chapter 6](../quality-tests-reviews/) covered how metadata reaches production with checks. A Salesforce org also depends on records that drive behaviour. I split them into four groups, because each one needs a different route:

| Group | Manufacturing examples | Source of truth | Route into the orgs |
|---|---|---|---|
| Configuration data | scheduling policies, work rules, service objectives, operating hours, custom settings values, mapping tables in custom objects | repository | pipeline, after the metadata deployment |
| Master data | products, price books, material numbers, dealer master | SAP or another leading system | integration in production, seed set in sandboxes |
| Test data | 30 dealers, 200 assets, edge cases from service | repository | seeded into scratch orgs and developer sandboxes |
| Customer data | cases, work orders, contracts, warranty claims | production | copied into partial and full, then masked |

The Field Service examples are real. In the Trailhead module on [scheduling policies](https://trailhead.salesforce.com/content/learn/modules/field-service-lightning-scheduling-basics/examine-scheduling-policies), you create work rules from their own tab and pick a record type; the policy brings work rules and service objectives together for the scheduling engine. Operating hours, according to the [object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_operatinghours.htm), are the `OperatingHours` object, which sets when a service territory, a resource or an account is available for work. If someone changes a work rule in the integration sandbox so that technicians only get assets that match their skills, that change is a record. No metadata deployment carries it forward.

The most important line runs between configuration data and master data. A price book, per the [object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_pricebook2.htm), holds the list of products an org sells. If that list comes from SAP, a deployment from a sandbox to production would be a second, competing route. That is why I never let master data run through the release pipeline into production.

## Custom metadata types, custom settings and where deployment stops

For new configuration, one simple decision saves a lot of data work. Trailhead's module on [custom metadata types](https://trailhead.salesforce.com/content/learn/modules/custom_metadata_types_dec/cmt_overview) states the difference clearly: custom metadata type records can be packaged and deployed through the Metadata API or change sets. Custom settings records cannot be deployed by any of those routes.

For a manufacturer, that means:

- **Custom metadata types** for configuration that is versioned in the repository and rolled out with the release: mapping product groups to service queues, thresholds for warranty checks, switches for integration endpoints. They go through the normal pull request with review. In delta deployments with dependencies, still in beta according to its [documentation](https://sfdx-hardis.cloudity.com/salesforce-devops-config-delta-deployment/), sfdx-hardis deploys all records of a custom metadata type as soon as one of them has changed.
- **Custom settings** only where the business case needs them, for example values per user or profile. Their records then need a data step in the pipeline.
- **Custom and standard objects used as configuration**, such as the Field Service objects or pricing rules in a configurator. Here you have no choice; they are data.

In an existing org I would not rebuild every custom setting. I would write into the partner rules, though, that new configuration is built as a custom metadata type unless there is a business reason against it. Who sets and enforces these rules is covered in [chapter 2](../release-process-ownership-roles/).

## How does configuration data move through the pipeline?

Three things make a data step repeatable.

**External IDs instead of Salesforce IDs.** A work rule has a different Salesforce ID in every org. A data step has to recognise the record by a business key, or it creates duplicates on the second run. I give every configuration object a field marked as external ID, holding a readable code such as `WR_SKILL_HYDRAULICS`.

**The data lives in the repository.** Then the same rules apply as for code: pull request, review, history. A changed threshold shows up in the diff, and nobody has to guess who changed it and when.

**Metadata first, then data.** A record can only be loaded once the field it writes to exists. So the data step runs after the metadata deployment, and only if that succeeded.

### SFDMU and sfdx-hardis

[SFDMU](https://help.sfdmu.com/) is an open-source Salesforce CLI plugin for data migration, licensed under BSD-3 according to its [npm entry](https://www.npmjs.com/package/sfdmu). It copies records directly from org to org or from CSV files, supports insert, upsert, update and delete, handles several related objects in one run and is configured through a single `export.json` file. Field mapping, anonymisation and composite external ID keys come on top. Processing runs locally or on the pipeline runner, with no cloud service in between.

sfdx-hardis runs SFDMU through [deployment actions](https://sfdx-hardis.cloudity.com/salesforce-devops-work-on-user-story-deployment-actions/). An action of type `data` loads records from one of the project's SFDMU workspaces into the target org. Actions are stored in `config/.sfdx-hardis.yml` or in a file per pull request, run once per org by default and are skipped when the metadata deployment failed. A failed action runs again with the next deployment that carries its pull request. How deployment actions fit into the pull request flow is covered in [chapter 5](../building-the-pipeline/). In the free sfdx-hardis training, deployment actions for reference data are part of level 2; my notes are in [what I learned from the free sfdx-hardis training](../../../blog/sfdx-hardis-free-devops-training/), and an introduction is in [sfdx-hardis: open-source Salesforce DevOps explained](../../../blog/sfdx-hardis-open-source-salesforce-devops/).

For small seed sets the Salesforce CLI itself is often enough. Salesforce recommends the [data tree commands](https://developer.salesforce.com/docs/platform/sfdx-dev/guide/sfdx-dev-test-data.html) for small sets, such as fewer than 3,000 records, and the data bulk commands for large volumes.

## What do Gearset, Copado and Flosum offer for data?

The commercial platforms have their own data modules with a user interface. According to the vendors' documentation:

| Tool | What it does with data | Keep in mind |
|---|---|---|
| [Gearset data deployments](https://docs.gearset.com/en/articles/2529745-running-your-first-data-deployment) | dependencies up to 15 levels deep, matching on external ID, masking with fake values, flows, triggers and validation rules can be switched off during the run, [templates](https://gearset.com/blog/data-deployment-templates/), [CPQ and Vlocity configuration](https://gearset.com/product/data-deploy) | part of the "Sandbox seeding & compliance" add-on, not the deployment licence; per [Gearset](https://docs.gearset.com/en/articles/1376661-data-deployments-with-gearset) no rollback, no deletion, production disabled by default |
| [Copado Data Deploy](https://www.copado.com/platform/deliver/) | data templates for configuration records with complex relationships, ready-made templates from the DevOps Exchange, masking of sensitive values | in Copado Essentials, per its [documentation](https://docs.essentials.copado.com/en/articles/6325474-how-to-deploy-relational-data-with-data-deploy-essentials), an Essentials Plus option with a per-user licence |
| [Flosum Data Migrator](https://docs.flosum.com/data-migrator) | templates with objects, fields and filters, relationships preserved, masking, triggers can be switched off | error report per failed record |

What these tools do well: an admin sees before the run which related records will go along and does not have to write an `export.json`. For CPQ configuration with many nested objects, that is a real advantage. Which tool fits your programme overall is decided in [chapter 4](../devops-tools-compared/); for data the same rule applies as for metadata. The tool runs in your name, and the data templates sit with you, not in a partner's account. The reasons are in [why clients should own their DevOps tools](../../../blog/why-clients-should-own-their-devops-tools/).

One point applies to every tool. Gearset says openly that a failed data deployment can leave data only partly deployed. Back up the affected objects before every release with a data step; backup and restore are covered in [chapter 9](../operations-monitoring-backup/).

## How does customer data in sandboxes stay protected?

Partial and full sandboxes hold real customer data after every refresh. Which environment may carry which data was set in [chapter 3](../environments-and-branching/); which fields are sensitive at a manufacturer and what coding agents may read is covered in [sandbox customer data: what AI coding agents may read](../../../blog/sandbox-customer-data-ai-coding-agents/).

Salesforce sells [Data Mask & Seed](https://www.salesforce.com/platform/data-masking/) for this. According to Trailhead, [Data Mask](https://trailhead.salesforce.com/content/learn/modules/salesforce-data-mask/get-to-know-salesforce-data-mask) is a managed package you install in production that masks data in full and partial sandboxes; production stays unchanged, and masked data cannot be unmasked. Per field, the [configuration module](https://trailhead.salesforce.com/content/learn/modules/salesforce-data-mask/install-and-configure-salesforce-data-mask) lets you choose random characters or numbers, a replacement from a library such as names or addresses, or deletion. Checkbox, lookup and picklist fields are not supported. The configuration carries over on refresh, and you start the run in the sandbox.

The seed part, according to the product page, fills developer, developer pro, partial and full sandboxes with records filtered by seed templates. Mask and seed jobs can be scheduled daily, weekly or monthly, and seeding bypasses automations. The page lists no price. Gearset, Copado and Flosum also mask data in transit, and SFDMU can anonymise. The difference: Data Mask works on an existing sandbox copy, the others mask data while they move it.

My order after every refresh of a partial or full sandbox:

1. Start the mask and check the execution log.
2. Add fields created since the last run to the mask; this check sits in the release checklist.
3. Make sure email fields on contacts are on the mask list, so no dealer receives a test notification.
4. Load configuration data from the repository if the sandbox needs a newer state than production.
5. Only then open access for partners and business users.

Coding agents get a stricter rule, described in [chapter 8 of the AI masterclass](../../ai-salesforce/ai-code-best-practices/): they work in scratch orgs and developer sandboxes with seed data, never in a full copy.

## A typical scenario, as an assumption: Field Service for maintenance

Assume a machine builder introducing Field Service for maintenance and repairs at customer sites. Two partners work on the same org, and SAP supplies products, material numbers and prices. All numbers are assumptions.

Without a data step in the pipeline, go-live looks like this: the metadata deploys cleanly, then a consultant spends two days re-entering 6 scheduling policies, 25 work rules, 40 operating hours records and 15 service territories by hand in production, working from a spreadsheet taken from the UAT sandbox. Afterwards three rules differ from the tested state, which only shows when technicians get jobs outside their territory.

With a data step, the same go-live looks different:

- Every configuration object has a field marked as external ID, and the records sit as an SFDMU workspace in the manufacturer's repository.
- Changes to work rules go through a pull request reviewed by the service process owner.
- After the metadata deployment, a deployment action loads the configuration into integration, UAT, staging and production, with the same state each time.
- In production, products and price books come from SAP; sandboxes get a seed set with 300 parts and two price books.
- The UAT sandbox, a partial copy, is masked after every refresh before the partner gets access.

On Gearset, Copado or Flosum the structure would be the same, with a data template instead of `export.json`. What counts is that no manual data step is left in the release plan.

## What belongs in the partner rules?

I would write five rules into every contract:

1. Configuration data is never edited directly in a stage org, only in the repository.
2. Every configuration object has an external ID.
3. New configuration is built as a custom metadata type unless there is a business reason against it.
4. Master data from SAP never runs through the release pipeline into production.
5. No partner gets access to a sandbox before masking has run after the refresh.

When to schedule data steps in the release calendar, and how the three Salesforce releases a year fit in, is covered in [chapter 8](../release-planning-salesforce-releases/). Data steps and sandbox levels are part of my work in [DevOps and release management](../../../services/devops-release-management/).

Configuration data deserves the same route as code: repository, review, pipeline, with customer data kept masked. If you want to remove the manual data step from your release plan, [send me a message](#contact).
