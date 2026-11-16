---
title: "B2B Commerce search: finding parts by part number"
description: "How to set up Salesforce B2B Commerce search so dealers find spare parts by current number, old number or description: limits, synonyms and search analytics."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-commerce-search-part-numbers
translationKey: commerce-search-part-numbers
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, search, spare parts, part numbers, synonyms, search analytics]
takeaways:
  - "Standard search matches whole terms only. Partial SKU Search finds incomplete SKUs and ignores separators, but only in Product SKU and Product Code."
  - "A store allows 25 searchable and 50 filterable attributes and 100 synonym rules; for synonyms and boost and bury the API pages state lower values."
  - "Old and cross-reference part numbers belong in a searchable field on the current product. Synonym rules fit terms like O-ring and seal better."
  - "Search analytics via Data 360, announced in July 2026, shows zero-result searches: a diagnostic list for data, access, index and assortment."
  - "After changes to products, categories or entitlements the search index needs an update; new searchable fields need a full update."
faq:
  - q: "Can B2B Commerce search find part numbers?"
    a: "Yes. Product SKU is searchable by default, as are the product name and description. Standard search needs whole terms, but B2B stores can enable Partial SKU Search for Product SKU and Product Code: it finds incomplete SKUs from three characters onward and ignores hyphens, spaces, dots, underscores and slashes. Old numbers in custom fields still follow the standard rules."
  - q: "How many synonym rules does a B2B Commerce store support?"
    a: "The search limits page lists 100 synonym rules per store as a hard limit. The search settings API page states 50 include rules per web store, so check the value in your org before you plan around it."
  - q: "How do dealers find superseded part numbers?"
    a: "Store every old number in a searchable text field on the successor product. A dealer who types the old number then finds the current part, without a synonym rule per number."
  - q: "What is B2B Search from June 2026?"
    a: "It is a marketing name, not a separate product. In June 2026 Salesforce announced AI-driven and attribute-based search for B2B Commerce. In the documentation, these capabilities show up as semantic search, Partial SKU Search, weighted searchable fields and merchandising rules."
draft: false
---

Dealers find spare parts in a Salesforce B2B Commerce store when the numbers they type are where search looks. Standard store search needs whole terms, but B2B stores can enable Partial SKU Search, which finds incomplete current SKUs and ignores separators. So the work lies in the settings and the product data: Partial SKU Search switched on, the current number as SKU, old and cross-reference numbers in a searchable field, with their common spellings. Synonym rules are for terms like "O-ring" and "seal", not for thousands of numbers. Search analytics then shows which searches return nothing, and that list tells you what to fix next.

## How does B2B Commerce search match a part number?

Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B", builds a search index per store. B2B and D2C stores on the core platform share the same store search capability, as the [search data model](https://developer.salesforce.com/docs/platform/data-models/guide/b2b-commerce-d2c-commerce-search.html) shows. The product name, product description and product SKU are searchable by default, and you can add more fields. Salesforce's [B2B search considerations](https://help.salesforce.com/s/articleView?id=commerce.comm_search_comm_admin_cons.htm&language=en_US&type=5) describe these standard matching rules:

- Search matches word stems.
- A result appears only when all search terms are present in it.
- Partial matches at the start or in the middle of a word are not supported.

For spare parts, the third rule matters, and [Partial SKU Search](https://help.salesforce.com/s/articleView?id=commerce.comm_search_enable_partial_sku.htm&language=en_US&type=5), available since Winter '26, is the answer for current numbers. Once enabled under Settings, Search, it finds a SKU such as "123-57-ABC" from "ABC", "57-AB" or "1235", for queries from three to 12 characters of the SKU, and ignores hyphens, underscores, spaces, periods and slashes. It works only on Product SKU and Product Code and needs a full index update. Old numbers in a custom field still follow the standard rules, so I would test with 50 real part numbers, current and old, before making any design decision.

Visibility comes first. A dealer only finds products that its buyer groups are entitled to see, and only the first 2,000 buyer groups of a product are indexed. I explain that limit in [buyer groups and entitlements](/en/blog/buyer-groups-entitlements-product-visibility/). Field-level security matters too: Trailhead warns that a shopper without access to an indexed searchable field cannot search the store at all.

## 25 searchable attributes and 100 synonym rules per store

Salesforce lists the [search limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) on one page. As of October 2026:

| Limit | Value | Type |
|---|---|---|
| Searchable attributes per store | 25 | soft |
| Filterable attributes per store | 50 | soft |
| Facets shown per query | 10, up to 50 on request | soft |
| Filter fields per query | 10 | hard |
| Sort rules per store | 15 | hard |
| Synonym rules per store | 100 | hard |
| Boost and bury rules per store | 100 | hard, see note |
| Products per results page | 200 | hard |
| Languages (locales) in the index | 25 | hard |

25 searchable attributes sound like a lot until you list what dealers type: current number, old numbers, cross-references, machine type, name, short text, maybe an EAN. That leaves room, but not for one field per language and number type. I plan the searchable fields like any scarce resource and write down why each one is there.

```hinweis offen
The [search settings API page](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-search-settings-apis.html) says synonyms are added through search include rules and that "you can create up to 50 rules for a web store". The limits page says 100 synonym rules. For boost and bury, the same API page states 25 rules per web store, compared with 100 on the limits page. Check the values in your org before you plan close to either number.
```

## Where do old and cross-reference numbers go?

Manufacturers rename parts. A seal gets a new number after a design change, a supplier part gets the manufacturer's own number, and a dealer still has the number from a 15-year-old parts list. Dealers type all of them.

There are two ways to make an old number findable: use a synonym rule per number, with the search settings API supporting single-word and multi-word synonyms, or use a searchable text field "former and alternative numbers" on the current product. That field holds the old numbers, supplier numbers and cross-references, separated by spaces.

```pro-contra
pro: Searchable field on the product
- Holds many old and cross-reference numbers, within the field's and the index's practical limits
- Counts as one of the 25 searchable attributes, regardless of how many numbers it contains
contra: Synonym rule per number
- Only 100 rules per store, or 50 according to the API page
- Covers a handful of numbers, not a parts history
```

I would always use the field for numbers. The data already exists in the ERP, in supersession chains or material master notes, and the integration can populate the field on every load. Worked example: a manufacturer with 30,000 active spare parts, of which 8,000 have one or more predecessor numbers. With synonym rules, that is impossible. With a field, it is one more column in the product import. The ERP or PIM keeps the structured supersession chain; the search field is only a flat copy of it for search.

Because Partial SKU Search ignores separators only in SKU and Product Code, the old-number field still needs spellings: "4711-0020" and "47110020" side by side if dealers type both. Search analytics will show after a few weeks which spellings matter.

In the store's search settings, you can also weight searchable fields from 1 to 10, so a hit in the SKU or the old-number field ranks above a hit in the description. Synonym rules remain useful for words. Examples include "O-ring", "seal ring" and the German "Dichtring" for the same thing, "filter cartridge" and "filter element", or the internal name of a machine series and the name on the dealer's sales brochure. That is where 100 rules go a long way.

## Three announcements from 2026 for parts search

**AI-driven search (June 2026).** In its [June release post](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/), Salesforce describes AI-driven and attribute-based search; in the documentation, that maps to features such as semantic search and merchandising rules, not to a separately named product. Buyers no longer need "the exact product name or SKU" and can describe what they need in plain language. Merchandisers get "granular control over attribute-based search and product visibility". For dealers who know their part number, this changes little. For end customers or new dealers who describe a part, it can help. I would test it with your own descriptions before relying on it.

**Boost and bury, facet order and search analytics (July 2026).** According to the [July release post](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/), merchandisers can move products up or down in search and category results, set the order of values within filters such as brand, size or material, and see search queries, click-through rates, conversion and zero-result searches through Data 360, formerly Data Cloud. The Search Intelligence Analytics dashboard needs Data 360 for B2B Commerce, the Commerce data kit, CRM Analytics and the matching permission sets, and it must be set up and fed with data.

**Extensible search endpoints.** The [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) includes endpoint extensions for product search (Commerce_Endpoint_Search_ProductSearch and Commerce_Endpoint_Search_Products) and, from API version 67.0, for search suggestions. They let developers change the request before the search runs or the response after. That is the place for logic search settings cannot express, such as check digits or company-specific number logic for old numbers. Configure Partial SKU Search first and use an extension only for a proven gap; Salesforce now prefers the GET endpoint search/products over the older POST product-search. It is custom code and should go through the client's pipeline like any other.

## How do boost and bury and facets help with spare parts?

Boost and bury is useful for parts in two cases. Boosting successor parts makes it likely that a dealer searching a general term sees the current part before the old one. Burying phased-out parts with remaining stock pushes them down while keeping them findable. Rules influence the ranking but do not guarantee a position; only pinning does. With a limited number of rules per store, I would base them on attributes such as sales status, not on single products.

Facets help when a search returns many hits, for example "filter" in a catalog with 400 filters. Then machine series, dimension and material narrow the list. 10 facets per query are enough if they are chosen well: the attributes dealers actually use to decide. They require clean attribute values, which depends on [product data from ERP and PIM](/en/blog/b2b-commerce-product-data-pim-erp/).

Showing dealers only parts that fit a specific machine is a different requirement. Search and facets cannot know which machines a dealer owns. The options for that are covered in [show only parts for each machine](/en/blog/spare-parts-shop-parts-per-machine/), and the AI side is covered in [spare parts by serial number](/en/blog/spare-parts-by-serial-number-ai/).

## Test 200 search terms from inside sales

Collect what dealers actually type before you configure anything. Inside sales has emails and phone notes full of part numbers, old numbers and descriptions. Take 200 search terms and run them against a test store with your real data. Every miss points to missing data, a missing searchable field, a spelling variant, missing access or entitlement, an outdated index or a part you simply do not sell.

After go-live, the list of zero-result searches is the diagnostic list for the next cleanup: data, access, index, search settings and assortment. Check it every week in the first months. How that fits with other KPIs is covered in [B2B shop KPIs after go-live](/en/blog/b2b-shop-kpis-after-go-live/). After changes to products, categories or entitlement policies, update the search index; a partial update covers those changes, while changed searchable fields or sort rules need a full update. In production orgs, automatic updates check for changes every five minutes.

This topic is covered in the [chapter on catalog, search and entitlements](/en/masterclass/b2b-commerce/catalog-search-entitlements/) of my B2B Commerce masterclass. Defining which ERP fields feed search is part of my work on [Salesforce integration](/en/services/salesforce-integration/).
