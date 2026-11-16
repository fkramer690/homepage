---
title: "B2B Commerce product data: PIM, ERP or Salesforce?"
description: "Where product data for a Salesforce B2B Commerce store should be maintained, what the store needs from ERP and PIM, and which catalog limits apply."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-commerce-product-data-pim-erp
translationKey: commerce-product-data-pim
topic: data
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, product data, PIM, ERP, catalog, data quality]
takeaways:
  - "The ERP should own the material number, unit and sales status; a PIM should own texts, attributes and images; and Salesforce should hold a copy."
  - "A store has exactly one catalog and can hold 4 million products, of which 1 million are searchable. A variation parent can have 200 variants."
  - "Each product can carry 9 images and 5 file attachments. Since July 2026, product media can also come from external URLs, for all stores in the org."
  - "Name, description, SKU, product code and category name are searchable by default; parent products of variations are not. Data quality decides."
  - "Write down one owner per product field before the first import. Changes that the next ERP load overwrites cost more than the import itself."
faq:
  - q: "Do I need a PIM for Salesforce B2B Commerce?"
    a: "Not always. With a few thousand spare parts and texts that come from the ERP, the ERP can be the only source. A PIM pays off when marketing texts, many technical attributes, images and several languages have to be maintained for a large catalog."
  - q: "How many products can a B2B Commerce store hold?"
    a: "According to the Salesforce limits page, a store can hold 4 million products, of which 1 million are supported for search. A store has one product catalog with up to 3 million products."
  - q: "How many images can a product have in B2B Commerce?"
    a: "9 images and up to 5 file attachments per product. Since July 2026, product media can also come from external URLs; this setting applies to all stores in the org. Richer content such as 3D models needs LWC-based integration."
  - q: "Should merchandisers edit product data directly in Salesforce?"
    a: "Only for fields that Salesforce owns, such as store categories or search settings. Fields that come from the ERP or PIM should be read-only in Salesforce; otherwise, the next load overwrites the change."
draft: false
---

Product data that the ERP or a PIM owns should not be maintained in Salesforce. The ERP owns what it already owns today: material number, unit of measure, sales status and the link to price and stock. A PIM, if you have one, owns texts, technical attributes, images and translations. Salesforce holds a copy of both and adds only what belongs to the store, such as categories and search settings. The store limits matter less than this split: one catalog per store, 4 million products, of which 1 million are searchable, 200 variants per parent and 9 images per product. Dealers find what the data allows them to find.

## What does a B2B store need from product data?

Salesforce B2B Commerce builds on standard objects. According to the [data model overview](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-dev-data-model.html), Product2 holds the items you sell, a ProductCatalog organizes them into categories, and ProductCategory forms the tree buyers navigate. Images and attachments are stored in separate media objects, and attributes for variations are stored in their own objects.

For a dealer ordering spare parts, a store needs the following for each product:

- **Identification:** material number, name, older or alternative numbers.
- **Buying information:** unit of measure, minimum order quantity, packaging unit, sales status such as "orderable" or "phased out".
- **Description and attributes:** short text, technical data such as dimensions, material, voltage or thread.
- **Media:** at least one picture, often a drawing or a data sheet.
- **Navigation:** category in the store catalog.

Prices come from Salesforce price books or, through a Commerce extension, from another pricing provider such as the ERP; stock comes from Omnichannel Inventory or a custom provider. I treat them separately in the chapter on ERP integration.

## Who should own which product data?

My rule is one owner per field, and the owner is the system where the data is created. For most manufacturers that gives this split:

| Data | Owner | In Salesforce |
|---|---|---|
| Material number, unit, sales status, weight | ERP | Copy, read only |
| Short and long texts, translations | PIM, or ERP if no PIM exists | Copy, read only |
| Technical attributes for filters | PIM | Copy, read only |
| Images, drawings, data sheets | PIM or DAM | Reference or copy |
| Store categories, search settings, sort order | Salesforce | Maintained here |

In this split, the last row is the only one that merchandisers maintain in the store; store-specific fields such as badges or SEO texts can be added to it if you decide to do so. Everything else arrives through an interface, and that interface has to say which side wins. If a merchandiser corrects a typo in Salesforce and the nightly ERP load overwrites it, the dealer sees the typo again the next day, and the merchandiser stops trusting the store. The same principle applies to every object in a Salesforce org. I describe it in the [object ownership matrix](/en/blog/salesforce-object-ownership-matrix/).

Do you need a PIM? Not for every store. Worked example: a manufacturer with 6,000 spare parts, German and English texts from the ERP, and one photo per part. The ERP can be the only source here, and a PIM would add another system without adding more data. With 60,000 parts, 15 languages, technical attributes for filters and several images per part, I would want a PIM, because ERP material masters are rarely built for that kind of enrichment. The numbers are examples; languages, attributes and approval workflows decide, not the part count alone.

## One catalog, 4 million products, 1 million searchable

Salesforce lists the [product and category limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-limits.html) on one page. As of October 2026:

| Limit | Value | Type |
|---|---|---|
| Product catalogs per store | 1 | hard |
| Products per store | 4 million, of which 1 million searchable | hard |
| Products per catalog | 3 million | hard |
| Variants per variation parent | 200 | hard |
| Images per product | 9, plus 5 file attachments | hard |
| Attributes per attribute set | 5 | soft |
| Category depth | 5 levels | soft |
| Categories per catalog | 15,000 | soft |

Two of these shape the design. One catalog per store means that a second assortment with its own category structure needs a second store, while different assortments for customer groups work in one store through buyer groups and entitlements, which I discuss in [one B2B store or several](/en/blog/b2b-stores-countries-brands-dealers/). And the gap between 4 million products and 1 million searchable ones matters for manufacturers with large spare parts ranges.

```hinweis achtung
Salesforce writes that only up to 1 million products are supported for search and asks you to contact your account representative if you need to upload more than a million SKUs. With a third-party search provider such as Coveo, Algolia or Bloomreach, the 4 million limit does not apply.
```

A category depth of 5 levels is rarely a problem for spare parts. ERP material groups are often deeper, but buyers do not click through eight levels. I would flatten them to three or four levels and let search and filters do the rest.

## Up to 200 variants per variation parent

Variations bundle products that differ in one or more attributes, such as a seal in five diameters. A variation parent groups up to 200 variants, and the attributes that define the variants belong to an attribute set. The soft limit of 5 attributes per set is enough for most parts.

The source data causes more trouble than the limit. Variations need clean, consistent attribute values: "50 mm", "50mm" and "DN50" in three material masters produce three values in the filter. In many ERP systems, such information is stored in free text rather than in fields. Before variations go live, someone has to normalise these values in the owning system, not in Salesforce.

For many spare parts, variations are not needed at all. A dealer usually searches for one specific part number. Variations make more sense for consumables and accessories, where the buyer chooses size or color.

## Where do images, drawings and 3D models live?

The limit of 9 images per product covers most spare parts. Drawings, data sheets and certificates are a different matter: they change with revisions and often already live in a DAM or PLM system. Copying them into Salesforce creates a second version that falls out of step.

With its July 2026 release, Salesforce delivered product media extensibility. According to the [Salesforce blog](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/), it lets you "connect external digital asset management (DAM) platforms, 3D models, technical specs, and hosted CMS videos" and show them on product detail pages through LWC wrappers. This is the right direction: the media stays in the system that manages revisions, and the store displays it.

```hinweis offen
External product media URLs are a [setting in Setup](https://help.salesforce.com/s/articleView?id=commerce.comm_productmediaurls.htm&language=en_US&type=5) that applies to all stores in the org. Turning it on hides product media added through Salesforce CMS, so test it in a sandbox before switching.
```

## Search finds only what is in the data

Store search can only find what is in the data. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_search_mark_fields.htm&language=en_US&type=5), category name, product name, SKU, product description and product code are searchable by default, and further fields can be made searchable. With variations, parent products and their fields are not searchable. B2B stores can also switch on [partial SKU search](https://help.salesforce.com/s/articleView?id=commerce.comm_search_enable_partial_sku.htm&language=en_US&type=5), which matches fragments from three characters and ignores hyphens, spaces, periods and slashes.

For a parts catalog, that has direct consequences:

- A dealer who types "seal 50" finds nothing if the name says "O-ring" and the diameter sits in a field that is not searchable.
- A part number with a different separator only matches once partial SKU search is on; whether missing leading zeros match depends on the SKU and the setup.
- An old part number that only exists in the ERP history cannot be found at all.
- Text that exists only on a variation parent is not found.

All of this is fixed in the product data and in the search setup, which I cover in [finding parts by part number](/en/blog/b2b-commerce-search-part-numbers/).

## Check 200 spare parts from the ERP

Take a sample of 200 typical spare parts from the ERP and check each one against the list above: is there a usable name, a picture, the attributes a dealer would filter by, a clean sales status? The result shows how much data work is needed before the store can launch. Then write the ownership table for product fields and add it to the interface list. Which data flows from SAP to the store and how often is covered in [B2B Commerce and SAP data flows](/en/blog/b2b-commerce-sap-data-flows/), and the whole topic sits in the [chapter on catalog, search and entitlements](/en/masterclass/b2b-commerce/catalog-search-entitlements/) of my B2B Commerce masterclass. Designing such interfaces is part of my work on [Salesforce integration](/en/services/salesforce-integration/).
