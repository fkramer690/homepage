---
title: "B2B Commerce search: finding parts by part number"
description: "How to set up Salesforce B2B Commerce search so dealers find spare parts by current number, old number or description: limits, synonyms and search analytics."
pubDate: 2026-10-28
lang: en
slug: b2b-commerce-search-part-numbers
translationKey: commerce-search-part-numbers
topic: commerce
categories: [b2b-commerce]
tags: [B2B Commerce, search, spare parts, part numbers, synonyms, search analytics]
takeaways:
  - "Salesforce documents for its store search that all search terms must match and that prefix and infix partial matches are not supported. Part numbers must be stored the way dealers type them."
  - "A store allows 25 searchable and 50 filterable attributes, 100 synonym rules and 100 boost and bury rules. 10 facets per query are standard, 50 on request."
  - "Old and cross-reference part numbers belong in a searchable field on the current product. Synonym rules are too few for numbers and better used for terms like O-ring and seal."
  - "Search analytics via Data Cloud, announced in July 2026, shows zero-result searches. They are the best list of product data that is missing."
  - "After changes to searchable fields, products, categories or entitlement policies, the search index has to be rebuilt before dealers see the result."
faq:
  - q: "Can B2B Commerce search find part numbers?"
    a: "Yes. Product SKU is searchable by default, as are name and description. Salesforce does not support prefix or infix partial matches, so a number typed without leading zeros or with different separators may not match unless that spelling is also stored."
  - q: "How many synonym rules does a B2B Commerce store support?"
    a: "The search limits page lists 100 synonym rules per store as a hard limit. The search settings API page states 50 rules per web store for its include rules, so check the value in your org before you plan around it."
  - q: "How do dealers find superseded part numbers?"
    a: "Store every old number in a searchable text field on the successor product. A dealer who types the old number then finds the current part, without a synonym rule per number."
  - q: "What is B2B Search from June 2026?"
    a: "Salesforce announced AI-driven and attribute-based search for B2B Commerce in June 2026. Buyers can describe a part in plain language, and merchandisers control attribute-based search and ranking."
draft: false
---

Dealers find spare parts in a Salesforce B2B Commerce store when the part number they type is stored exactly as they type it. According to Salesforce, store search needs all search terms to match and does not support prefix or infix partial matches. So the work lies in the product data: the current number as SKU, old and cross-reference numbers in a searchable field, spellings without separators added where dealers use them. Synonym rules, of which a store has 100, are for terms like "O-ring" and "seal", not for thousands of numbers. Search analytics then shows which searches return nothing, and that list tells you what to fix next.

## How does B2B Commerce search match a part number?

Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B", builds a search index per store. B2B and D2C stores on the core platform share this store search, as the [search data model](https://developer.salesforce.com/docs/platform/data-models/guide/b2b-commerce-d2c-commerce-search.html) shows. The [Trailhead unit on making a store searchable](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-for-merchandisers/b2b2c-make-store-searchable), written for D2C merchandisers, says that product name, product description and product SKU are searchable by default and that you can add more fields. It describes these matching rules:

- Search matches word stems.
- A result appears only when all search terms are present in it.
- Partial matches at the start or in the middle of a word are not supported.

The unit states them for D2C stores; I found no separate description for B2B, so treat them as the starting assumption and test. For spare parts, the third rule is the important one. A dealer who types only the first digits of a number does not find the full number. A dealer who types "815" does not find "0815". How the index splits numbers with hyphens, dots or slashes into words is not documented in the sources I read, so I would test it with 50 real part numbers before any design decision.

Visibility comes first. A dealer only finds products that its buyer groups are entitled to see, and only the first 2,000 buyer groups of a product are indexed. I explain that limit in [buyer groups and entitlements](../buyer-groups-entitlements-product-visibility/). Field-level security matters too: Trailhead warns that a shopper without access to an indexed searchable field cannot search the store at all.

## Which search limits apply?

Salesforce lists the [search limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) on one page. As of October 2026:

| Limit | Value | Type |
|---|---|---|
| Searchable attributes per store | 25 | soft |
| Filterable attributes per store | 50 | soft |
| Facets shown per query | 10, up to 50 on request | soft |
| Filter fields per query | 10 | hard |
| Sort rules per store | 15 | hard |
| Synonym rules per store | 100 | hard |
| Boost and bury rules per store | 100 | hard |
| Products per results page | 200 | hard |
| Languages (locales) in the index | 25 | hard |

25 searchable attributes sound like a lot until you list what dealers type: current number, old numbers, cross-references, machine type, name, short text, maybe an EAN. That leaves room, but not for one field per language and number type. I plan the searchable fields like any scarce resource and write down why each one is there.

```hinweis offen
The [search settings API page](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-search-settings-apis.html) says synonyms are added through search include rules and that "you can create up to 50 rules for a web store". The limits page says 100 synonym rules. Check the value in your org before you plan close to either number.
```

## Where do old and cross-reference numbers go?

Manufacturers rename parts. A seal gets a new number after a design change, a supplier part gets the manufacturer's own number, a dealer still has the number from a 15-year-old parts list. Dealers type all of them.

There are two ways to make an old number findable: a synonym rule per number, where the search settings API supports single-word and multi-word synonyms, or a searchable text field "former and alternative numbers" on the current product. That field holds every old number, every supplier number and every cross-reference, separated by spaces.

```pro-contra
pro: Searchable field on the product
- Holds any number of old and cross-reference numbers
- Counts as one of the 25 searchable attributes, regardless of how many numbers it contains
contra: Synonym rule per number
- Only 100 rules per store, or 50 according to the API page
- Covers a handful of numbers, not a parts history
```

I would always take the field for numbers. The data already exists in the ERP, in supersession chains or material master notes, and the interface can fill the field with every load. A typical scenario, as an assumption: a manufacturer with 30,000 active spare parts, of which 8,000 have one or more predecessor numbers. As synonym rules that is impossible. As a field it is one more column in the product import.

The same field can hold spellings: "4711-0020" and "47110020" side by side if dealers type both. Which spellings matter, the search analytics will show after a few weeks.

Synonym rules remain useful for words. "O-ring", "seal ring" and the German "Dichtring" for the same thing, "filter cartridge" and "filter element", the internal name of a machine series and the name on the dealer's sales brochure. That is where 100 rules go a long way.

## What did Salesforce change in 2026?

Three announcements from 2026 matter for parts search.

**B2B Search (June 2026).** In its [June release post](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/), Salesforce describes AI-driven and attribute-based search. Buyers no longer need "the exact product name or SKU" and can describe what they need in plain language. Merchandisers get "granular control over attribute-based search and product visibility". For dealers who know their part number this changes little. For end customers or new dealers who describe a part, it can help. I would test it with your own descriptions before relying on it.

**Boost and bury, facet order and search analytics (July 2026).** According to the [July release post](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/), merchandisers can move products up or down in search and category results, set the order of filter groups such as brand, size or material, and see search queries, click-through rates, conversion and zero-result searches through Data Cloud.

**Extensible search endpoints.** The [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) includes endpoint extensions for product search (Commerce_Endpoint_Search_ProductSearch and Commerce_Endpoint_Search_Products) and, from API version 67.0, for search suggestions. They let developers change the request before the search runs or the response after. That is the place for logic search settings cannot express, such as normalising a typed part number before the query. It is custom code and should go through the client's pipeline like any other.

## How do boost and bury and facets help with spare parts?

Boost and bury is useful for parts in two cases. Successor parts go up, so a dealer searching a general term sees the current part before the old one. Phased-out parts with remaining stock go down but stay findable. With 100 rules per store, I would build rules on attributes such as sales status, not on single products.

Facets help when a search returns many hits, for example "filter" in a catalogue with 400 filters. Then machine series, dimension and material narrow the list. 10 facets per query are enough if they are chosen well: the attributes dealers actually use to decide, in the order they use them. They require clean attribute values, which is a question of [product data from ERP and PIM](../b2b-commerce-product-data-pim-erp/).

Showing dealers only parts that fit a specific machine is a different requirement. Search and facets cannot know which machines a dealer owns. The options for that are in [show only parts for each machine](../spare-parts-shop-parts-per-machine/), and the AI side in [spare parts by serial number](../spare-parts-by-serial-number-ai/).

## Where should you start?

Collect what dealers actually type before you configure anything. Inside sales has emails and phone notes full of part numbers, old numbers and descriptions. Take 200 of them and run them against a test store with your real data. Every miss is either missing data, a missing searchable field or a spelling problem.

After go-live, the list of zero-result searches is the working list for the next data cleanup. Check it every week in the first months. How that fits with other KPIs is covered in [B2B shop KPIs after go-live](../b2b-shop-kpis-after-go-live/). And after every change to searchable fields, products, categories or entitlement policies, rebuild the search index, because Trailhead names all of these as triggers.

The topic belongs to the [chapter on catalogue, search and entitlements](../../masterclass/b2b-commerce/catalog-search-entitlements/) of my B2B Commerce masterclass. Defining which ERP fields feed search is part of my work on [Salesforce integration](../../services/salesforce-integration/).

Dealers find parts when the numbers they type are in the data, so start with their search terms, not with the search settings. If you want to test your part numbers against a store design, [send me a message](#contact).
