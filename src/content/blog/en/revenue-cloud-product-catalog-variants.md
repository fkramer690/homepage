---
title: "Revenue Cloud product catalog: modelling machine variants"
description: "How machine builders model variants, options and spare parts in the Revenue Cloud catalog with classifications, attributes and bundles, without copying SAP."
pubDate: 2026-10-28
lang: en
slug: revenue-cloud-product-catalog-variants
translationKey: revenue-cloud-product-catalog-variants
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, product catalog, variants, product classification, bundles, SAP]
takeaways:
  - "The Revenue Cloud product catalog models what sales sells: catalogs, categories, product classifications with attributes, simple products, bundles and selling models."
  - "A product classification is a template with a set of attributes. Products created from it inherit the attributes and can override them, so one machine family needs one template."
  - "A variant becomes its own product when the ERP has its own material number for it, when it is planned in a sales agreement or when it is stocked and serviced separately. Otherwise it stays an attribute."
  - "The ERP delivers material numbers and list prices. Categories, selling attributes, bundle structure and selling models exist only in Salesforce and need an owner there."
  - "Catalog records are data: the Developer Guide lists a deployment sequence and lookup fields for them, so they move through the pipeline as data in a fixed order."
faq:
  - q: "What is a product classification in Revenue Cloud?"
    a: "A product classification is a template with a set of attributes, for example motor power, voltage and control type for one machine family. Products created from the classification inherit these attributes and can override single ones that do not apply."
  - q: "Should every machine variant be its own product in Salesforce?"
    a: "No. I create a separate product only when the ERP has its own material number for the variant, when it is planned in a sales agreement or when it is stocked and serviced separately. Everything else is an attribute value on the base machine."
  - q: "Do I have to copy the SAP material master into Revenue Cloud?"
    a: "No. Salesforce needs the sellable products with material number, description and list price. Bills of materials, plant data and purchasing data stay in SAP, because the quote does not use them."
  - q: "Can spare parts and services sit in separate catalogs?"
    a: "Yes. According to Trailhead you can create several catalogs, for example one for products and one for services, and assign a product to several categories or subcategories."
draft: false
---

In the Revenue Cloud product catalog, a machine builder models the sales view, not the ERP material master. Each machine family gets a product classification, a template with attributes such as press force or control type. The base machines inherit these attributes, and options that have no material number of their own stay attribute values. Accessories with their own material number become components of a configurable bundle. SAP delivers material numbers and list prices, Salesforce owns categories, selling attributes and bundle structure. Spare parts and services go into catalogs of their own. That keeps the catalog at a few hundred records instead of thousands of variants.

## What does the Revenue Cloud product catalog consist of?

Product Catalog Management is the part of Revenue Cloud that holds products and their structure. Trailhead calls it "a centralized product model that's the single source of truth for product data", and other clouds such as Agentforce Manufacturing (Manufacturing Cloud) can use the same product and pricing information through APIs, according to the [Revenue Cloud foundations module](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management). A note on names: Trailhead currently says Agentforce Revenue Management, the Developer Guide says Revenue Management, salesforce.com says Revenue Cloud. The [overview of product names](../revenue-cloud-product-names-rlm-rca/) sorts this out.

The building blocks, per the [Trailhead module on product catalog management](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/get-started-with-product-catalog-management):

- **Catalogs** hold the products and bundles a company offers. You can create several, for example one for products and one for services.
- **Categories and subcategories** group products for browsing and search. A product can sit in several categories.
- **Attributes** describe products. An attribute is defined once and reused across products, picklists are reusable too, and attribute categories group related attributes.
- **Product classifications** are templates with a set of attributes. A product created from a classification inherits them, and single attributes can be overridden.
- **Simple products and bundles.** Simple products stand alone, bundles have a hierarchy of several items.
- **Product selling models** define how a product is sold, for example as a one-time sale, an evergreen subscription or a term-defined subscription. A product can have several, according to the [object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productsellingmodel.htm).

All of these are standard objects on the core platform, from ProductCatalog and ProductClassification to ProductRelatedComponent and ProductSellingModel, as the [data model](https://developer.salesforce.com/docs/platform/data-models/guide/product-catalog-mgmt.html) shows.

## How do you model machine variants without thousands of products?

The key decision is when a variant becomes a product and when it stays an attribute value. I use three tests. A variant gets its own product record when:

1. **the ERP has its own material number for it**, because the order must reach SAP with that number,
2. **it is planned in a sales agreement**, because agreements hold quantities per product, as described in [from quote to sales agreement](../quote-to-sales-agreement-product-configurator/),
3. **it is stocked or serviced separately**, for example as an installed asset with a serial number.

Everything else stays an attribute value on the base machine. A press brake with three bending lengths, two controls and an optional backgauge is one product with three attributes, as long as SAP builds it from one configurable material.

The classification carries the attributes per machine family. Trailhead shows the mechanism with a simple example: products inherit the attributes of their classification, and a WiFi tablet does not need the SIM type its category would give it, so the attribute is overridden. For a machine family this means one template with the attributes sales needs to ask about, and a few overrides for models where an attribute does not apply.

Accessories and packages that carry their own material number belong in a bundle. The [Trailhead unit on bundles](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/create-a-product-bundle) explains the parts: product groups inside the bundle, local cardinality per component (required, included by default, quantity changeable or not) and group cardinality with a minimum and maximum number of products. Customers cannot change static bundles, configurable bundles can be customised during the sale. For a machine with tooling, a safety package and commissioning, that is a configurable bundle with three groups.

Which combinations are allowed is decided by the configurator, not by the catalog. How its rules work is covered in [Revenue Cloud configurator: when constraint rules pay off](../revenue-cloud-configurator-constraint-rules/).

## Which data comes from the ERP and which lives only in Salesforce?

The first mistake I would avoid in a catalog design is copying the material master. Salesforce needs the sellable products, not the plant data, purchasing data or bills of materials. A bill of materials describes how a machine is built. The bundle describes how it is sold. The two look similar and are maintained by different people.

| Data | Master | Note |
|---|---|---|
| Material number | ERP | Key for the order hand-over |
| Product name and short text | ERP or PIM | Translations come with it |
| List price | ERP | Lands in the price book |
| Category assignment | Salesforce | Sales structure, not the ERP material group |
| Classification and selling attributes | Salesforce | Attribute values must match the ERP characteristics |
| Bundle structure and cardinality | Salesforce | Product management owns it |
| Selling model | Salesforce | One-time, term-defined or evergreen |
| Bill of materials | ERP or PLM | Not in Salesforce |

The fifth row needs care. When the attribute "control" has the value "S2" in Salesforce, the same value must exist as a characteristic value in SAP, or the order fails at hand-over. I would keep a mapping table per attribute and let the integration check it. Who owns each object in the org is set in an [object ownership matrix](../salesforce-object-ownership-matrix/). How prices then come from the price book is covered in [Salesforce Pricing: how Revenue Cloud calculates prices](../revenue-cloud-pricing-procedures-explained/).

## Should spare parts and services get their own catalog?

In most cases, yes. A machine builder sells a few dozen machines and often tens of thousands of spare parts. In a quote, the sales rep needs the machines, their options and the accessories. Spare parts mostly come up in service and in the dealer business. Trailhead explicitly mentions several catalogs, for example a product catalog and a service catalog, and products can sit in several categories when one item is needed in both places.

Services such as maintenance contracts or remote monitoring need a term-defined or evergreen selling model in addition, because they are sold as subscriptions. I would put them in a separate catalog so that product management and service management each maintain their own part.

## A typical scenario, as an assumption: 40 base machines with options

A machine builder sells 40 base machines in four families, each with around a dozen selling options, plus 60 accessories with their own material numbers and around 8,000 spare parts. Without a model, someone suggests creating every sold combination as a product, which quickly runs into the thousands.

With the catalog model it looks like this:

- **4 classifications**, one per machine family, each with about 12 attributes such as working width, drive, control and voltage.
- **40 products** for the base machines, created from the classifications, with overrides where an attribute does not apply.
- **40 configurable bundles**, one per base machine, with groups for tooling, safety and services.
- **60 accessory products** as simple products, used as bundle components.
- **A spare parts catalog** with the 8,000 parts, loaded from SAP, and a service catalog with three subscription products.

The product catalog for quotes then holds around 140 records plus the bundles, and every combination a customer can order is still described completely.

## Catalog data is configuration: who maintains it and how does it move?

Classifications, attributes and bundles are records, not metadata. The Developer Guide has an [object deployment reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm) that lists the deployment sequence, object types, lookup fields and data translation requirements for Product Catalog Management. So catalog changes are tested in a sandbox and moved as data, in that order, through the same pipeline as metadata. How that works with SFDMU or commercial tools is in the DevOps chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/), and the Revenue Cloud specifics are in [Revenue Cloud deployments](../revenue-cloud-configuration-deployment/).

The owner should be product management at the manufacturer, not the implementation partner. After go-live new machines, options and price changes arrive every quarter, and whoever maintains the catalog decides how fast sales can quote them.

## Where should you start?

1. **List the machine families** and the questions sales asks per family. They become classifications and attributes.
2. **Apply the three tests** to every variant: own material number, planned in a sales agreement, stocked or serviced separately.
3. **Agree the attribute mapping with SAP** before the first data load.
4. **Separate machines, spare parts and services** into catalogs with different owners.
5. **Name the catalog owner** and put the catalog under version control as data.

The whole chapter is in the masterclass part [catalog, configurator, pricing](../../masterclass/revenue-cloud/product-catalog-configurator-pricing/), and drawing the line between SAP and Salesforce is part of my [Salesforce architecture](../../services/salesforce-architecture/) work.

A good Revenue Cloud catalog describes every machine a customer can order with a few hundred records, as long as variants stay attributes until the ERP says otherwise. If you are planning your catalog, [send me a message](#contact).
