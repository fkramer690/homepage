---
title: "Salesforce CPQ vs Revenue Cloud: the real differences"
description: "What separates the SteelBrick-based CPQ and Billing packages from Revenue Cloud: data model, configurator, pricing, renewals, billing and why it is no upgrade."
pubDate: 2026-10-28
lang: en
slug: salesforce-cpq-vs-revenue-cloud-differences
translationKey: cpq-vs-revenue-cloud-differences
topic: revenue
categories: [revenue-cloud, architecture]
tags: [Salesforce CPQ, Revenue Cloud, Salesforce Billing, SteelBrick, data model, migration]
takeaways:
  - "Salesforce CPQ and Salesforce Billing are managed packages from the SteelBrick acquisition with the namespaces SBQQ and blng. Revenue Cloud does not use these packages and works on standard objects."
  - "In CPQ, product rules and price rules plus an optional JavaScript quote calculator plugin decide configuration and price. In Revenue Cloud, a constraint engine and pricing procedures do that."
  - "CPQ amends contracts through subscription records and a new quote and opportunity. Revenue Cloud keeps sold products as assets with state periods, and every change runs through a quote and an order."
  - "Salesforce Help states that the data models differ significantly and that Revenue Cloud is not just the next version of CPQ. Reports and dashboards are rebuilt on standard objects."
  - "A move from CPQ to Revenue Cloud is a redesign of rules, prices and data, so it should be planned and budgeted like a new implementation."
faq:
  - q: "Is Revenue Cloud an upgrade of Salesforce CPQ?"
    a: "No. Salesforce Help says Revenue Cloud is not just the next version of Salesforce CPQ and that the data models differ significantly. There is no version upgrade; configuration, prices and data are rebuilt or migrated."
  - q: "Does Revenue Cloud use the SBQQ objects?"
    a: "No. Revenue Cloud does not use the CPQ package or its SBQQ namespace. It works on standard Salesforce objects such as Product2, Quote, Order and Asset, plus objects for catalog, pricing and configuration."
  - q: "What replaces CPQ price rules in Revenue Cloud?"
    a: "Pricing procedures in Salesforce Pricing. A procedure runs pricing elements in sequence, reads data through decision tables and shows every step in a price waterfall. Custom logic from a JavaScript quote calculator plugin has to be redesigned for it."
  - q: "What replaces CPQ product rules?"
    a: "The Product Configurator with product classifications and attributes, and for complex products the constraint rules engine with the Constraint Modeling Language (CML). Rules are written as declarative constraints instead of if-then rules."
  - q: "Can CPQ and Revenue Cloud run in the same org?"
    a: "Salesforce Help lists coexistence during the transition and keeping the CPQ licence as planning topics for a migration. In practice both run side by side for a while, so plan which products and customers move first."
draft: false
---

Salesforce CPQ and Revenue Cloud solve the same task, configure, price, quote and bill, but they are different products. CPQ and Salesforce Billing are managed packages from SteelBrick with their own objects under the SBQQ and blng namespaces. Revenue Cloud runs on standard objects, configures with a constraint engine, calculates prices with pricing procedures and manages sold products as assets. Salesforce Help says the data models "differ significantly" and that Revenue Cloud is "not just the next version of Salesforce CPQ". For a CPQ customer that means a redesign of rules, prices and data, because there is no upgrade path.

## Where do both products come from?

Salesforce bought SteelBrick in December 2015 for $360 million, according to [SiliconANGLE](https://siliconangle.com/2015/12/24/salesforce-confirms-360m-acquisition-of-quote-to-cash-startup-steelbrick/). SteelBrick's quote-to-cash software already ran natively on the Salesforce platform. It became Salesforce CPQ and Salesforce Billing, both installed as managed packages. CPQ objects carry the `SBQQ__` prefix, for example `SBQQ__Quote__c`, and the [Billing developer guide](https://developer.salesforce.com/docs/atlas.en-us.blng_dev.meta/blng_dev/blng_custom_objects_parent.htm) lists its objects under `blng__`.

Revenue Cloud's developer documentation goes back to Spring '24 (API 60.0), when the product was called Revenue Lifecycle Management. It was then sold as Revenue Cloud Advanced and appears in current documentation as Revenue Management. The [Winter '27 developer guide](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/pcm_parent.htm) is titled "Revenue Management Developer Guide" and describes standard objects and business APIs per area. Salesforce itself wrote in July 2025 that it "rebuilt its CPQ solution as the all-new Revenue Cloud". CPQ is now end of sale, without an end-of-life date; the details are in [Salesforce CPQ end of sale: what applies in October 2026](../salesforce-cpq-end-of-sale-status/).

## The differences at a glance

| Area | Salesforce CPQ and Billing | Revenue Cloud |
|---|---|---|
| Technical form | Managed packages, namespaces `SBQQ` and `blng` | Part of the platform, no CPQ package |
| Data model | Package objects such as `SBQQ__Quote__c`, subscription records on the contract | Standard objects such as Product2, Quote, Order, Asset |
| Product model | Products, bundles with features and options | Catalogs, categories, product classifications with attributes, bundles |
| Configuration rules | Product rules: validation, selection, filter, alert | Constraint rules engine with CML, Visual Builder for simple rules |
| Pricing | Price rules, optional JavaScript quote calculator plugin | Pricing procedures, context definitions, decision tables, price waterfall |
| After the sale | Contract with subscription records | Assets with asset state periods and asset actions |
| Amendment | New quote and opportunity on the contract | Amendment quote, then an order |
| Approvals | Advanced Approvals package | Advanced Approvals as invocable actions and business APIs |
| Order to fulfilment | Order generated from the quote | Dynamic Revenue Orchestrator as add-on |
| Billing | Salesforce Billing package | Revenue Cloud Billing add-on with usage rating, digital wallet, invoicing engine, accounting subledger |
| Configuration storage | Mostly data records | Mostly data records |
| Status October 2026 | End of sale, maintenance phase, no new features | Actively developed |

Sources for the table follow in the sections below. The row on configuration storage is the one similarity that matters for operations: according to [Gearset](https://docs.gearset.com/en/articles/10981375-understanding-the-difference-between-salesforce-cpq-and-revenue-lifecycle-management-rlm-revenue-cloud-advanced-rca), most configuration lives as data in both products, so deployments need data templates in both cases, just for different objects.

## How do product model and configurator differ?

In CPQ a configurable product is a bundle with features and options. [Product rules](https://trailhead.salesforce.com/content/learn/modules/salesforce-cpq-features/product-and-price-rules) come in four types: validation rules check combinations, selection rules add, remove, hide or disable options, filter rules prefilter what can be added, and alert rules show messages. Each rule is an explicit if-then statement with its own condition and action records.

Revenue Cloud starts with the catalog. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/get-started-with-product-catalog-management), a product classification is a template with a set of attributes. Products created from it inherit the attributes and can override some. For variant-rich machines that changes the modelling question: properties such as voltage or colour become attributes instead of separate options or products.

For the rules, Revenue Cloud offers the [constraint rules engine](https://trailhead.salesforce.com/content/learn/modules/product-configuration-with-revenue-cloud/explore-product-configurator-with-constraint-rules-engine). It evaluates all possible combinations and removes invalid ones while the user configures. Rules are written in the Constraint Modeling Language (CML), either directly in the CML editor or generated by the no-code Visual Builder. Trailhead describes the difference itself: rule-based setups use explicit if-then logic, constraint-based setups use declarative constraints between options and need fewer rules for complex products.

My view: this is the biggest change for a manufacturer. Three hundred product rules do not translate into three hundred constraints. Someone has to understand what the rules mean technically and model them again, and that person usually sits in product management or engineering, not in the CRM team.

## How do price calculations differ?

In CPQ, [price rules](https://trailhead.salesforce.com/content/learn/modules/salesforce-cpq-features/product-and-price-rules) automate calculations and update quote line fields. Where they were not enough, many orgs added the [JavaScript quote calculator plugin](https://developer.salesforce.com/docs/revenue/cpq-plugins/guide/cpq-dev-jsqcp-parent.html), custom JavaScript stored as custom scripts that changes how the quote line editor calculates.

Revenue Cloud calculates with [Salesforce Pricing](https://trailhead.salesforce.com/content/learn/modules/revenue-cloud-design/configure-pricing-for-products). A context definition passes product data from the quote to a pricing procedure. The procedure runs its pricing elements in sequence, decision tables fetch the pricing data, and the result goes back to the quote. A price waterfall shows every step from list price to net price. For finance and audits that waterfall is a real improvement, because the question "why this price?" gets an answer on screen.

A quote calculator plugin has no direct counterpart. Its logic has to be split into procedure elements, decision tables or an external call. In a typical scenario, as an assumption, a component maker has 40 price rules and a plugin with a few hundred lines of JavaScript for dealer discounts. Each rule and each branch of the plugin becomes a design decision: is it still needed, does it belong in a procedure, or should the price come from SAP?

## How do contracts, amendments and renewals differ?

In CPQ the sale ends in a contract. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/sf_cpq/sf_cpq_manage_contracts_renewals), the contract holds subscription records for subscription products. An amendment creates a new quote and opportunity, priced for the remaining term, and CPQ can create renewal opportunities and quotes automatically.

Revenue Cloud keeps the installed base as assets. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments) describes that every change is processed as a quote and completed through an order. Asset state periods record the quantity over time, asset actions log each change such as an upsell, and the quote shows start quantity, change and end quantity.

For manufacturers with service contracts and subscriptions this is the second big change. Open CPQ subscriptions have to become assets with a correct history, which Salesforce Help covers under asset data in its migration guide.

## What about billing and approvals?

The Salesforce Billing package and Revenue Cloud Billing are also separate products. According to [Salesforce](https://www.salesforce.com/sales/revenue-cloud-billing/), Revenue Cloud Billing includes usage rating with a digital wallet, an invoicing engine with document production, payments, collections, tax through external engines and an accounting subledger that syncs journal entries to the ERP. What a move means for open invoices and payment history is covered in [from Salesforce Billing to Revenue Cloud Billing](../from-salesforce-billing-to-revenue-cloud-billing/).

Approvals have the same name in both worlds, which causes confusion. In CPQ, Advanced Approvals is a [package of its own](https://trailhead.salesforce.com/content/learn/modules/advanced-approvals-for-admins/discover-advanced-approvals). In Revenue Cloud, [Advanced Approvals](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/advanced_approvals_overview.htm) consists of invocable actions, business APIs and fields on standard objects. Approval chains have to be rebuilt.

## Why is the move no upgrade?

Salesforce says so itself. The Help page [Migrate to Revenue Management](https://help.salesforce.com/s/articleView?language=en_US&id=ind.rev_data_migration.htm&type=5) states that the data models "differ significantly", that the move "requires updates to the system architecture", that reports and dashboards are rebuilt on the standard objects, and that "tools don't replace human design decisions, particularly for custom logic and integration remapping". It describes three phases that are completed in sequence and no fixed timeframe.

From this I draw three conclusions for a manufacturer:

1. **Budget it like a new implementation.** Migration tools move data, but rules, prices and approvals are redesigned. Salesforce names three to six months as typical, which I would only plan for a clean org.
2. **Clean up first.** Every unused product rule, price rule and plugin branch you delete before the migration is one less design decision. An [org assessment](../ai-org-assessment-technical-debt/) shows what is actually used.
3. **Plan deployments for data.** Catalog, pricing and configuration are records in Revenue Cloud too. The DevOps chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/) covers how such data moves through the pipeline.

Whether the move pays off at all is a separate question, which I answer in [keep Salesforce CPQ or move to Revenue Cloud?](../keep-salesforce-cpq-or-revenue-cloud/).

## Where should you start?

Count what you have: product rules, price rules, lines in the quote calculator plugin, quote templates, approval chains, open subscriptions and integrations that write to SBQQ objects. That list is the scope of the redesign. How the migration then runs in phases is described in [CPQ to Revenue Cloud migration](../cpq-to-revenue-cloud-migration-phases/) and in the masterclass chapter [from CPQ to Revenue Cloud](../../masterclass/revenue-cloud/from-cpq-to-revenue-cloud/).

CPQ and Revenue Cloud share a purpose and differ in almost everything underneath, so treat the move as a new design. If you want help assessing your CPQ org before that decision, [send me a message](#contact).
