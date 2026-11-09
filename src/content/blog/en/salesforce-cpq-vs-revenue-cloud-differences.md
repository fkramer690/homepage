---
title: "Salesforce CPQ vs Revenue Cloud: the real differences"
description: "What separates the SteelBrick-based CPQ and Billing packages from Revenue Cloud: data model, configurator, pricing, renewals, billing and why it is no upgrade."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: salesforce-cpq-vs-revenue-cloud-differences
translationKey: cpq-vs-revenue-cloud-differences
topic: revenue
categories: [revenue-cloud, architecture]
tags: [Salesforce CPQ, Revenue Cloud, Salesforce Billing, SteelBrick, data model, migration]
takeaways:
  - "CPQ and Billing are managed packages with the namespaces SBQQ and blng. Revenue Cloud does not use these packages."
  - "Where CPQ uses product rules, price rules and a JavaScript plugin, Revenue Cloud uses a constraint engine and pricing procedures."
  - "Revenue Cloud keeps sold products as assets with state periods. Changes are activated through an order, usually after a quote."
  - "Reports on CPQ package objects are rebuilt on standard objects. For a customized org, budget the move like a new implementation."
faq:
  - q: "Is Revenue Cloud an upgrade of Salesforce CPQ?"
    a: "No. Salesforce Help says Revenue Cloud is not just the next version of Salesforce CPQ and that the data models differ significantly. There is no version upgrade; configuration, prices and data are rebuilt or migrated."
  - q: "Does Revenue Cloud use the SBQQ objects?"
    a: "No. Revenue Cloud does not use the CPQ package or its SBQQ namespace. It works on standard Salesforce objects such as Product2, Quote, Order and Asset, plus objects for catalog, pricing and configuration."
  - q: "What replaces CPQ price rules in Revenue Cloud?"
    a: "Pricing procedures in Salesforce Pricing. A procedure runs pricing elements in a defined order, usually reads pricing data through decision tables and, once enabled, shows every step in a price waterfall. Custom logic from a JavaScript quote calculator plugin has to be redesigned for it."
  - q: "What replaces CPQ product rules?"
    a: "The Product Configurator with product classifications and attributes, and for complex products the constraint rules engine with the Constraint Modeling Language (CML). Simple dependencies can stay if-then configuration rules; complex ones are written as declarative constraints."
  - q: "Can CPQ and Revenue Cloud run in the same org?"
    a: "Yes, Salesforce Help documents coexistence when the CPQ package is installed and Revenue Cloud is provisioned, and lists keeping the CPQ license as a planning topic for a migration. In a phased move both run side by side for a while, so plan which products and customers move first."
draft: false
---

Salesforce CPQ and Revenue Cloud solve the same task, configure, price, quote and bill, but they are different products. CPQ and Salesforce Billing are managed packages from SteelBrick whose core objects sit under the SBQQ and blng namespaces. Revenue Cloud runs on standard objects, configures with a constraint engine, calculates prices with pricing procedures and manages sold products as assets. Salesforce Help says the data models "differ significantly" and that Revenue Cloud is "not just the next version of Salesforce CPQ". For a CPQ customer that means a redesign of rules, prices and data, because there is no in-place package upgrade, only a migration.

## Where do both products come from?

Salesforce announced the acquisition of SteelBrick in December 2015 for about $360 million, according to [SiliconANGLE](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/), and closed it in early 2016. SteelBrick's quote-to-cash software already ran natively on the Salesforce platform. It became Salesforce CPQ and Salesforce Billing, both installed as managed packages. CPQ objects carry the `SBQQ__` prefix, for example `SBQQ__Quote__c`, and the [Billing developer guide](https://developer.salesforce.com/docs/atlas.en-us.blng_dev.meta/blng_dev/blng_custom_objects_parent.htm) lists its objects under `blng__`.

Revenue Cloud's developer documentation goes back to Spring '24 (API 60.0), when the product was called Revenue Lifecycle Management. It was then sold as Revenue Cloud Advanced; Salesforce Help now calls the product Revenue Management or Agentforce Revenue Management, while the licenses are still Revenue Cloud Growth, Advanced and Billing. I use Revenue Cloud, the name on the order form. The [Winter '27 developer guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/pcm_parent.htm) is titled "Revenue Management Developer Guide" and describes standard objects and business APIs per area. Salesforce itself wrote in July 2025 that it "rebuilt its CPQ solution as the all-new Revenue Cloud". CPQ is now end of sale, without an end-of-life date; the details are in [Salesforce CPQ end of sale: what applies in October 2026](../salesforce-cpq-end-of-sale-status/). How Revenue Cloud Growth, Revenue Cloud Advanced and the old names fit together is in [Revenue Cloud Advanced vs Revenue Cloud vs CPQ](../revenue-cloud-product-names-rlm-rca/).

```zeitleiste
2015-12 | Salesforce announces the SteelBrick acquisition (closed in early 2016), the base of Salesforce CPQ and Salesforce Billing
Spring '24 | Revenue Lifecycle Management in the developer documentation (API 60.0)
2025-07 | Salesforce: CPQ rebuilt as the "all-new Revenue Cloud"
Winter '27 | Developer guide titled "Revenue Management Developer Guide"
```

## The differences at a glance

| Area | Salesforce CPQ and Billing (SteelBrick) | Revenue Cloud |
|---|---|---|
| Technical form | Managed packages, namespaces `SBQQ` and `blng` | Standard data model of the platform, API-first quoting |
| Quote, order, sold products | Package objects such as `SBQQ__Quote__c` next to standard objects, subscription records on the contract | Standard objects Quote, Order, Asset |
| Product model | Products and bundles with features and options | Catalogs, categories, product classifications with attributes, bundles |
| Configuration rules | Product rules: validation, selection, filter, alert | Configuration rules and the constraint rules engine with CML |
| Pricing | Price rules, optional JavaScript quote calculator plugin | Pricing procedures, decision tables, context definitions, price waterfall |
| After the sale | Contract with subscription records | Assets with asset state periods and asset actions |
| Amendment and renewal | New quote and opportunity on the contract | Amendment or renewal, activated through an order, usually after a quote |
| Approvals | Advanced Approvals package | Advanced Approvals as invocable actions and business APIs |
| Order to fulfilment | Order generated from the quote | Order, optionally through Dynamic Revenue Orchestrator (Advanced, freemium access, volume terms to clarify) |
| Billing | Salesforce Billing package (requires CPQ) | Basic invoicing in Advanced; Revenue Cloud Billing add-on for usage rating and digital wallet, payments, collections, accounting subledger |
| Reports and dashboards | Partly built on package objects | Reports on CPQ objects rebuilt on standard objects |
| Configuration storage | Mostly records, plus metadata | Catalog, pricing and rules mostly records, settings and flows metadata |
| Status October 2026 | End of sale, maintenance phase, no new features | Actively developed, sold as Growth and Advanced |

Sources for the table follow in the sections below. The row on configuration storage is the one similarity that matters for operations: according to [Gearset](https://docs.gearset.com/en/articles/11169961-how-to-compare-and-deploy-revenue-cloud-advanced), much of the configuration lives as data in both products, while settings, flows and pricing procedures are metadata. Deployments need data templates and metadata deployments in both cases, just for different objects.

## How do product model and configurator differ?

In CPQ a configurable product is a bundle with features and options. [Product rules](https://trailhead.salesforce.com/content/learn/modules/salesforce-cpq-features/product-and-price-rules) come in four types: validation rules check combinations, selection rules add, remove, hide or disable options, filter rules prefilter what can be added, and alert rules show messages. Each rule is an explicit if-then statement with its own condition and action records.

Revenue Cloud starts with the catalog. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/get-started-with-product-catalog-management), a product classification is a template with a set of attributes. Products created from it inherit the attributes and can override some. For variant-rich machines that changes the modeling question: properties such as voltage or color can become attributes instead of separate options or products. Whether attributes, product variants or a constraint model fit best is a design decision per product line.

For the rules, Revenue Cloud offers the [constraint rules engine](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/explore-product-configurator-with-constraint-rules-engine). It enforces declarative relationships between options and restricts the user to valid values and combinations while they configure. Rules are written in the Constraint Modeling Language (CML), either directly in the CML editor or generated by the no-code Visual Builder. Trailhead describes the difference itself: rule-based setups use explicit if-then logic, constraint-based setups use declarative constraints between options and need fewer rules for complex products.

My view: this is the biggest change for a manufacturer. Three hundred product rules do not translate into three hundred constraints. Someone has to understand what the rules mean technically and model them again, and that person usually sits in product management or engineering, not in the CRM team.

## Pricing procedures replace price rules and the plugin

In CPQ, [price rules](https://trailhead.salesforce.com/content/learn/modules/salesforce-cpq-features/product-and-price-rules) automate calculations and update quote line fields. Where they were not enough, many orgs added the [JavaScript quote calculator plugin](https://developer.salesforce.com/docs/revenue/cpq-plugins/guide/cpq-dev-jsqcp-parent.html), custom JavaScript stored as custom scripts that changes how the quote line editor calculates.

Revenue Cloud calculates with [Salesforce Pricing](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/configure-pricing-for-products). A context definition passes product data from the quote to a pricing procedure. The procedure runs its pricing elements in a defined order, decision tables usually fetch the pricing data, and the result goes back to the quote. Once enabled and mapped in the procedure, a price waterfall shows every step from list price to net price. For finance and audits that waterfall is a real improvement, because the question "why this price?" gets an answer on screen.

A quote calculator plugin has no direct counterpart. Its logic has to be split into procedure elements, decision tables or an external call. In a worked example with assumed numbers, a component maker has 40 price rules and a plugin with a few hundred lines of JavaScript for dealer discounts. Each rule and each branch of the plugin becomes a design decision: is it still needed, does it belong in a procedure, or should the price come from SAP?

## How do contracts, amendments and renewals differ?

In CPQ the sale ends in a contract. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/sf_cpq/sf_cpq_manage_contracts_renewals), the contract holds subscription records for subscription products. An amendment creates a new quote and opportunity, priced for the remaining term, and CPQ can create renewal opportunities and quotes automatically.

Revenue Cloud keeps the installed base as assets. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments) describes changes to assets that are processed as a quote and completed through an order; orders from other channels such as a store can skip the quote. Asset state periods record the quantity over time, asset actions log each change such as an upsell, and the quote shows start quantity, change and end quantity.

For manufacturers with service contracts and subscriptions this is the second big change. If open CPQ subscriptions are migrated for later amendments and renewals, they have to become assets with a correct history, which Salesforce Help covers under asset data in its migration guide. In a greenfield approach CPQ stays as the reference for old contracts instead.

## Billing and approvals are separate products too

The Salesforce Billing package and Revenue Cloud Billing are also separate products. Revenue Cloud Advanced already covers basic invoicing, such as billing schedules and invoices for one-time and subscription products. According to [Salesforce](https://www.salesforce.com/sales/revenue-cloud-billing/), the Revenue Cloud Billing add-on includes usage rating with a digital wallet, an invoicing engine with document production, payments, collections, tax through external engines and an accounting subledger that syncs journal entries to the ERP. What a move means for open invoices and payment history is covered in [from Salesforce Billing to Revenue Cloud Billing](../from-salesforce-billing-to-revenue-cloud-billing/).

Approvals have the same name in both worlds, which causes confusion. In CPQ, Advanced Approvals is a [package of its own](https://trailhead.salesforce.com/content/learn/modules/advanced-approvals-for-admins/discover-advanced-approvals). In Revenue Cloud, [Advanced Approvals](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm) consists of invocable actions, business APIs and fields on standard objects. Approval chains have to be rebuilt.

## Why is the move no upgrade?

Salesforce says so itself. The Help page [Migrate to Revenue Management](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) states that the data models "differ significantly", that the move "requires updates to the system architecture", that reports and dashboards on CPQ objects are rebuilt on the standard objects, and that "tools don't replace human design decisions, particularly for custom logic and integration remapping". It describes three phases that are completed in sequence and no fixed timeframe. There is no in-place upgrade; Salesforce documents several migration strategies instead, from a partial move to a full migration and a greenfield start.

From this I draw three conclusions for a manufacturer:

1. **Budget a customized org like a new implementation.** Migration tools move data, but rules, prices and approvals are redesigned. Salesforce's [CPQ end-of-sale page](https://www.salesforce.com/sales/cpq/end-of-life/) names three to six months as typical and adds that complex implementations take longer. I would plan with that range only for a clean org.
2. **Clean up first.** Every unused product rule, price rule and plugin branch you delete before the migration is one less design decision. An [org assessment](../ai-org-assessment-technical-debt/) shows what is actually used.
3. **Plan deployments for data.** Catalog, pricing and configuration are records in Revenue Cloud too. The DevOps chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/) covers how such data moves through the pipeline.

Whether the move pays off at all is a separate question, which I answer in [keep Salesforce CPQ or move to Revenue Cloud?](../keep-salesforce-cpq-or-revenue-cloud/).

## Count rules, plugin lines and integrations

Count what you have: product rules, price rules, lines in the quote calculator plugin, quote templates, approval chains, open subscriptions and integrations that write to SBQQ objects. Then note for each item whether it is still used, who owns it and what depends on it. That list is the scope of the redesign. How the migration then runs in phases is described in [CPQ to Revenue Cloud migration](../cpq-to-revenue-cloud-migration-phases/) and in the masterclass chapter [from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/).
