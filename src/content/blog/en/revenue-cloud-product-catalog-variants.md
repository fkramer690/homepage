---
title: "Revenue Cloud product catalog: modeling machine variants"
description: "How machine builders model variants, options and spare parts in the Revenue Cloud catalog with classifications, attributes and bundles, without copying SAP."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: revenue-cloud-product-catalog-variants
translationKey: revenue-cloud-product-catalog-variants
topic: revenue
categories: [revenue-cloud]
tags: [Revenue Cloud, product catalog, variants, product classification, bundles, SAP]
takeaways:
  - "Products created from a classification inherit its attributes, and those attributes can be overridden. A machine family usually starts with one template."
  - "A separate material number alone does not require a separate product. Several ERP SKUs can map to one commercial product with attributes."
  - "Categories, bundles and selling models need records in Salesforce and an owner, regardless of which system is their master."
  - "Catalog records move through the pipeline as data, with the Developer Guide sequence as the dependency baseline."
faq:
  - q: "What is a product classification in Revenue Cloud?"
    a: "A product classification is a template with a set of attributes, for example motor power, voltage and control type for one machine family. Products created from the classification inherit these attributes, and individual attributes that do not apply can be overridden."
  - q: "Should every machine variant be its own product in Salesforce?"
    a: "No. I keep a variant as an attribute value on the base machine as long as sales sells it as one offer. If SAP needs distinct material numbers, Dynamic Revenue Orchestrator can map the attribute selection to them. A separate product makes sense when the variant has its own price list, its own service model or its own lifecycle. Sales agreements can hold the same product several times with different attribute values."
  - q: "Do I have to copy the SAP material master into Revenue Cloud?"
    a: "No. Salesforce needs the sellable products with a key that maps to SAP, a description and the prices used in the quote. Bills of materials, plant data and purchasing data stay in SAP, because the quote does not use them."
  - q: "Can spare parts and services sit in separate catalogs?"
    a: "Yes. According to Trailhead you can create several catalogs, for example one for products and one for services, and assign a product to several categories or subcategories."
draft: false
---

In the Revenue Cloud product catalog, a machine builder models the sales view, not the ERP material master. Each machine family is given a product classification, a template with attributes such as press force or control type. The base machines inherit these attributes, and options stay attribute values as long as sales sells them as one offer. Accessories that are chosen separately become components of a configurable bundle. SAP typically provides material numbers and list prices, while Salesforce holds categories, selling attributes and bundle structure. That keeps the quote catalog at around 140 product records instead of thousands of variants.

## What does the Revenue Cloud product catalog consist of?

Product Catalog Management is the part of Agentforce Revenue Management, formerly Revenue Cloud, that holds products and their structure. I keep the name Revenue Cloud here because the licenses still carry it, for example Revenue Cloud Advanced. Trailhead calls it "a centralized product model that's the single source of truth for product data", and other clouds such as Agentforce Manufacturing (Manufacturing Cloud) can use the same product and pricing information through APIs, according to the [Revenue Cloud foundations module](https://trailhead.salesforce.com/content/learn/modules/revenue-lifecycle-management-foundations/explore-revenue-lifecycle-management). The documentation also uses the shorter Revenue Management; the [overview of product names](../revenue-cloud-product-names-rlm-rca/) sorts this out.

The building blocks, per the [Trailhead module on product catalog management](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/get-started-with-product-catalog-management):

- **Catalogs** hold the products and bundles a company offers. You can create several, for example one for products and one for services.
- **Categories and subcategories** group products for browsing and search. A product can belong to several categories.
- **Attributes** describe products. An attribute is defined once and reused across products. Picklists are reusable too, and attribute categories group related attributes.
- **Product classifications** are templates with a set of attributes. A product created from a classification inherits them, and single attributes can be overridden.
- **Simple products and bundles.** Simple products stand alone, while bundles have a hierarchy of several items.
- **Product selling models** define how a product is sold, for example as a one-time sale, an evergreen subscription or a term-defined subscription. They are optional for a basic catalog, and a product can have several, according to the [object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productsellingmodel.htm).

All of these are Salesforce standard objects provided by Product Catalog Management, from ProductCatalog and ProductClassification to ProductRelatedComponent and ProductSellingModel, as the [data model](https://developer.salesforce.com/docs/platform/data-models/guide/product-catalog-mgmt.html) shows. They are available with the Revenue Cloud license and feature enablement, not in every org.

## How do you model machine variants without thousands of products?

The key decision is when a variant becomes a product and when it stays an attribute value. Salesforce offers four models, and each fits a different case:

| Model | Fits when |
|---|---|
| Product with attributes | Sales sells one offer with selectable values |
| Product variations | Several sellable products with their own SKUs belong together |
| Bundle component | A part is chosen, priced or counted separately |
| Decomposition | The ERP needs technical SKUs that sales never sees |

A separate material number in SAP is not enough for a separate product. Salesforce [describes the opposite](https://help.salesforce.com/s/articleView?id=ind.rev_product_and_attributes_migration.htm&language=en_US&type=5): several ERP SKUs can become one commercial product with attributes, and Dynamic Revenue Orchestrator uses decomposition rules to map the selection to the SKU fulfillment needs. Product variations, available since Summer '26, group sellable products under a shared parent.

Sales agreements do not force separate products either. The [help article](https://help.salesforce.com/s/articleView?id=ind.sa_user_addprod_task.htm&language=en_US&type=5) shows the same diesel generator twice, with 2,000 and 2,500 kilowatts, as two lines in one agreement. See also [from quote to sales agreement](../quote-to-sales-agreement-product-configurator/).

I give a variant its own product when it has its own price list, its own service model or its own lifecycle. A serial number alone is not a reason, because it identifies one installed machine, not a product definition. A press brake with three bending lengths, two controls and an optional backgauge is one product with three attributes.

The classification contains the attributes for each machine family. Trailhead shows the mechanism with a simple example: products inherit the attributes of their classification, and a WiFi tablet does not need the SIM type its category would assign to it, so the attribute is overridden. For a machine family this usually means one template with the attributes sales needs to ask about, and a few overrides for models where an attribute does not apply. If models need very different attribute sets, separate classifications are the cleaner choice.

Accessories and packages that sales chooses, prices or counts separately belong in a bundle. The [Trailhead unit on bundles](https://trailhead.salesforce.com/content/learn/modules/product-catalog-management-with-revenue-cloud/create-a-product-bundle) explains the parts: product groups inside the bundle, local cardinality per component (required, included by default, whether the quantity can be changed, with default, minimum and maximum quantity) and group cardinality with a minimum and maximum number of products. Customers cannot change static bundles, while configurable bundles can be customized during the sale. For a machine with tooling, a safety package and commissioning, that is a configurable bundle with three groups.

The configurator, not the catalog, determines which combinations are allowed. How its rules work is covered in [Revenue Cloud configurator: when constraint rules pay off](../revenue-cloud-configurator-constraint-rules/).

## Which data comes from the ERP and which lives only in Salesforce?

The first mistake I would avoid in a catalog design is copying the material master. Salesforce needs its own records for catalogs, categories, bundles and selling models in any case; you need to decide explicitly which system is the master for them. Salesforce needs the sellable products, not the plant data, purchasing data or bills of materials. A bill of materials describes how a machine is built. The bundle describes how it is sold. The two look similar and are maintained by different people.

| Data | Typical master | Note |
|---|---|---|
| Material number | ERP | Key for the order hand-over |
| Product name and short text | ERP or PIM | Translations come with it |
| List price | ERP, if pricing is led there | Needs synchronized price book entries |
| Category assignment | Usually Salesforce | Sales structure, not the ERP material group |
| Classification and selling attributes | Salesforce | Attribute values must map to valid ERP values |
| Bundle structure and cardinality | Salesforce | Product management owns it |
| Selling model | Usually Salesforce | One-time, term-defined or evergreen |
| Bill of materials | ERP or PLM | Not in Salesforce |

The fifth row needs care.

```hinweis achtung
When the attribute "control" has the value "S2" in Salesforce, that value must map to a valid characteristic value or a technical product in SAP, or the order fails at handover. The codes do not have to be identical, but the mapping must be complete. I would keep a mapping table per attribute and let the integration check it before the order is activated.
```

Who owns each object in the org is set in an [object ownership matrix](../salesforce-object-ownership-matrix/). How prices are then determined from the price book is covered in [Salesforce Pricing: how Revenue Cloud calculates prices](../revenue-cloud-pricing-procedures-explained/).

## Should spare parts and services get their own catalog?

Often, yes. A machine builder sells a few dozen machines and often tens of thousands of spare parts. In a quote, the sales rep needs the machines, their options and the accessories. Spare parts mostly matter in service and in the dealer business. Trailhead explicitly mentions several catalogs, for example a product catalog and a service catalog, and products can belong to several categories when one item is needed in both places.

Recurring services such as maintenance contracts or remote monitoring typically use a term-defined or evergreen selling model; one-off services can use a one-time model. Whether they receive a separate catalog depends on who searches for them, through which channel, with which price book and in which quote process. Different owners in product and service management are an additional argument, not the only one.

## Worked example: 40 base machines with options

A machine builder sells 40 base machines in four families, each with around a dozen selling options, plus 60 accessories with their own material numbers and around 8,000 spare parts. Without a model, someone suggests creating every sold combination as a product, so the number of products quickly runs into the thousands.

With the catalog model it looks like this:

- **4 classifications**, one per machine family, each with about 12 attributes such as working width, drive, control and voltage.
- **40 products** for the base machines, created from the classifications, with overrides where an attribute does not apply. Each is set up as a configurable bundle root with groups for tooling, safety and services, so there is no second record per machine.
- **60 accessory products** as simple products, used as bundle components.
- **A spare parts catalog** with the 8,000 parts, loaded from SAP, and a service catalog with three subscription products.

The catalog for machine sales then contains around 140 product records. The org still contains the 8,000 spare parts and the related catalog records, but every combination a customer can order is described without creating a separate product for each combination.

## Catalog data is configuration and needs an owner

Classifications, attributes and bundles are records, not metadata. So catalog changes are tested in a sandbox and moved as data through the same pipeline as metadata. How that works with SFDMU or commercial tools is in the DevOps chapter on [data and configuration](../../masterclass/devops-release-management/data-and-configuration/), and the Revenue Cloud specifics are in [Revenue Cloud deployments](../revenue-cloud-configuration-deployment/).

```vertiefung For developers
title: What the object deployment reference sets
The Developer Guide has an [object deployment reference](https://developer.salesforce.com/docs/atlas.en-us.revenue_lifecycle_management_dev_guide.meta/revenue_lifecycle_management_dev_guide/deployment_appendix_A.htm) that lists the deployment sequence, object types, lookup fields and data translation requirements for Product Catalog Management. I use that sequence as the dependency baseline. Incremental deployments still need a dependency check and sometimes a second update pass.
```

The owner should be product management at the manufacturer, not the implementation partner. After go-live new machines, options and price changes arrive every quarter, and whoever maintains the catalog decides how fast sales can quote them.

## List machine families and the questions sales asks

1. **List the machine families** and the questions sales asks per family. They become classifications and attributes.
2. **Choose the model for every variant**: attribute value, product variation, bundle component or decomposition to ERP SKUs.
3. **Agree on the attribute mapping with SAP** before the first data load.
4. **Separate machines, spare parts and services** into catalogs with different owners.
5. **Name the catalog owner** and put the catalog under version control as data.

Point 2 decides the size of the catalog: a variant without its own price list, service model or lifecycle stays an attribute and receives no product record of its own. The full chapter is in the masterclass section [catalog, configurator, pricing](../../masterclass/revenue-cloud/product-catalog-configurator-pricing/), and drawing the line between SAP and Salesforce is part of my [Salesforce architecture](../../services/salesforce-architecture/) work.
