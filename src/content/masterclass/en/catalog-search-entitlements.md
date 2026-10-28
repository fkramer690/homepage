---
title: "B2B Commerce: catalogue, search and entitlements"
description: "How buyer groups, entitlement policies, product data and search work together in Salesforce B2B Commerce, and which hard limits shape the store design."
lang: en
slug: catalog-search-entitlements
course: b2b-commerce
translationKey: commerce-02
chapter: 2
short: "Catalogue, search, entitlements"
summary: "How product data, buyer groups and search work together so every dealer finds the right parts."
takeaways:
  - "Buyer groups and entitlement policies decide whether a dealer sees a product; product data and search settings decide whether the dealer finds it."
  - "A product should be entitled to no more than 2,000 buyer groups. Beyond that, Salesforce leaves the extra groups out of the search index, and the data load reports no error."
  - "Cut buyer groups by country, dealer tier and brand, never one group per dealer. Their number then stays stable when new dealers join."
  - "A store has exactly one catalogue and up to 4 million products, of which 1 million are searchable. A second brand with its own category tree therefore needs a second store."
  - "Entitlements know nothing about serial numbers. Parts per machine come from a dedicated machine page fed by assets and PLM, not from one buyer group per machine."
articles: [commerce-buyer-groups-entitlements, commerce-product-data-pim, commerce-search-part-numbers, commerce-stores-countries-brands, commerce-spare-parts-per-machine, spare-parts-serial-number-ai]
faq:
  - q: "What is a buyer group in Salesforce B2B Commerce?"
    a: "A buyer group bundles buyer accounts that share a store, entitlement policies and price books. Buyers reach a store only through a buyer group, so every buyer account needs at least one membership."
  - q: "How many products can a B2B Commerce store search?"
    a: "According to the Salesforce limits page, a store holds up to 4 million products, of which 1 million are supported by native search. If you need more, talk to your Salesforce account team or use a third-party search provider."
  - q: "Do I need one store per country?"
    a: "Usually not. One store supports up to 25 languages, and assortment and prices per country run through buyer groups. A separate store makes sense when the brand, category tree, checkout or the ERP behind it really differ."
  - q: "How do dealers find old part numbers in the store?"
    a: "Through a searchable text field on the current product that holds every predecessor and cross-reference number. At 100 per store, synonym rules are too few for numbers and better used for terms like O-ring and seal."
  - q: "Can B2B Commerce filter spare parts by serial number?"
    a: "Not out of the box. Entitlements work per buyer group. Parts per machine need a custom component that shows the dealer's assets and their parts list from Salesforce or PLM."
draft: false
---

In Salesforce B2B Commerce, two separate mechanisms decide whether a dealer orders the right spare part. Visibility is set by buyer groups and entitlement policies: a buyer account belongs to buyer groups, and those groups get products and price books assigned. Findability is set by product data and search settings: what is not in the product record, no search will find. Both sides have hard limits worth knowing before design, such as 2,000 buyer groups per product in the search index, one catalogue per store and 1 million searchable products. My recommendation: few buyer groups by country, tier and brand, one owner for every product field, and the entitlement concept on one page before any data is loaded.

## How does B2B Commerce decide who sees which product?

Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B" ([Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping)), controls access through a chain of standard objects. The [Trailhead unit on how buyers access a store](https://trailhead.salesforce.com/content/learn/modules/b2b-commerce-lightning-experience-data-model/organize-how-buyers-access-your-store) puts it briefly: "Buyers are connected to stores using buyer groups", and entitlement policies "define which products a buyer can see based on their buyer group memberships".

- **BuyerAccount:** a normal account that is enabled for buying. Its contacts become buyers or buyer managers.
- **BuyerGroup and BuyerGroupMember:** the group bundles buyer accounts with the same settings; each membership is its own record.
- **WebStoreBuyerGroup:** connects a buyer group to a store.
- **CommerceEntitlementPolicy:** connects buyer groups to products and controls whether product and price are visible.
- **BuyerGroupPricebook:** attaches price books to the buyer group.

Visibility and price therefore hang on the same groups. If you cut buyer groups for the assortment only, you find out in [chapter 3](../prices-cart-checkout/) that prices would need a different split. That is why I design both together. What B2B Commerce is and what it costs is covered in [chapter 1](../b2b-commerce-worth-it-overview/).

## Which limits shape the design?

Salesforce documents the limits on separate pages for [entitlements](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-entitlement-limits.html), [buyer groups](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-shopper-buyer-groups-accounts-limits.html), [products](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-product-limits.html), [search](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html), [stores](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-store-limits.html) and [price books](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-price-book-limits.html). Salesforce support raises soft limits on request; hard limits stay. The ones that matter for manufacturers, as of October 2026:

| Limit | Value | Type |
|---|---|---|
| Buyer groups per buyer account | 20, 30 with the Apex extension | soft |
| Buyer groups per entitlement policy | 200 | hard |
| Buyer groups per product (buyer entitlements) | 2,000 | hard |
| Catalogues per store | 1 | hard |
| Products per store | 4 million, of which 1 million searchable | hard |
| Variants per variation parent | 200 | hard |
| Images per product | 9, plus 5 file attachments | hard |
| Category depth | 5 levels | soft |
| Stores per org | 100 | hard |
| Price books per store | 5 | hard |

The 2,000 buyer groups per product have the nastiest effect. According to Salesforce, search indexing includes only the first 2,000 buyer groups of a product, and the limit is not enforced when you load data. So the import runs through, and some dealers simply stop finding the part. The buyer group page also has a note with a different value than its table; I plan with the 20 from the table.

## Why never one buyer group per dealer?

The idea is tempting because it mirrors the ERP: every customer has its own conditions, so every customer gets its own group. With 50 dealers that works. With 2,500 dealers, a spare part that everyone may buy is entitled to 2,500 groups and sits above the index limit. A policy "all spare parts" serves at most 200 groups and would have to be copied several times and kept identical. Every new dealer turns into a data project.

I cut buyer groups by attributes that change rarely and that the ERP already holds in the customer master: country or sales organisation, dealer tier such as service partner or sales partner, and brand where dealers carry only one brand. Entitlement policies then follow assortments, not customers: "spare parts general", "spare parts for service partners", "consumables". How to set memberships from the ERP, and when assignment by Apex or by rule pays off, is covered in [buyer groups and entitlements](../../../blog/buyer-groups-entitlements-product-visibility/).

## Who owns the product data?

Product data for the store should not be maintained in Salesforce. The ERP owns what it already owns today: material number, unit of measure, sales status. A PIM, if you have one, owns texts, technical attributes, images and translations. Salesforce holds a copy and maintains only what belongs to the store, such as categories and search settings. If a merchandiser fixes a typo in Salesforce and the nightly ERP load overwrites it, the dealer sees the typo again the next day, and the merchandiser stops trusting the store. The principle applies to every object in the org and is explained in the [object ownership matrix](../../../blog/salesforce-object-ownership-matrix/).

Whether you need a PIM depends on scale. With a few thousand parts and German and English texts from the ERP, the ERP is enough as the only source. With tens of thousands of parts, many languages and filter attributes, nobody maintains that in the material master.

Two limits from the table shape the product data. Nine images per product cover most spare parts, but drawings and data sheets with revisions are better kept in the DAM or PLM. In [July 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) Salesforce announced that external DAM platforms, 3D models and technical specs can be shown on product pages through LWC wrappers; I would test that in a sandbox before planning around it. And variations need clean attribute values. "50 mm", "50mm" and "DN50" in three material masters become three filter values. The split between ERP, PIM and Salesforce in detail is in [B2B Commerce product data](../../../blog/b2b-commerce-product-data-pim-erp/).

## How do dealers find spare parts by part number?

Store search finds only what is in the data, and it is strict. According to [Trailhead on store search](https://trailhead.salesforce.com/content/learn/modules/b2b2c-commerce-for-merchandisers/b2b2c-make-store-searchable), product name, description and SKU are searchable by default, a result appears only when all search terms are present, and prefix and infix partial matches are not supported. The unit is written for D2C merchandisers; B2B uses the same platform search. A dealer who types "815" will not find "0815".

The search limits per store: 25 searchable and 50 filterable attributes, 100 synonym rules, 100 boost and bury rules, 10 facets per query and 200 results per page. Three rules follow for parts catalogues:

1. **Old numbers go into a field.** Predecessor, supplier and cross-reference numbers sit in one searchable text field on the current product. The field counts as one of the 25 attributes, however many numbers it holds.
2. **Synonyms are for words.** 100 rules cover "O-ring" and "seal ring", not 8,000 predecessor numbers.
3. **Rebuild the index after every change.** Trailhead names changed searchable fields, products, categories and entitlement policies as reasons to rebuild the search index.

Salesforce added more in 2026. With its [June 2026](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) release, Salesforce describes B2B search where buyers describe a part in their own words instead of knowing its name or SKU. July brought boost and bury, the order of filter groups and search analytics through Data Cloud with click-through, conversion and zero-result searches. After go-live, those zero-result searches are the best list of missing product data. Setup and limits in detail are in [B2B Commerce search: finding parts by part number](../../../blog/b2b-commerce-search-part-numbers/).

## One store or several?

Most manufacturers need one store per brand, or per legal unit with its own checkout, and buyer groups for everything else. Countries and dealer tiers rarely justify their own store: one store supports up to 25 languages, and assortment and prices per country run through buyer groups and their price books.

I plan a second store in four cases:

- **Another brand with its own look.** A dealer of brand B should not log into a shop that looks like brand A.
- **Another category tree.** One catalogue per store means one category tree. The other way round, according to Salesforce one catalogue can serve several stores, so two brands with the same parts can share product data.
- **Another checkout or another ERP.** Extensions for pricing, inventory or order creation are mapped per store.
- **Different buyers.** End customers next to dealers get their own D2C store with shared product data.

The licence sets an earlier limit than the 100 stores per org. According to the [pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/), Growth Edition includes six storefronts and Advanced Edition ten. And every extra store brings its own pages, translations and its own regression test after each of the three Salesforce releases a year. The decision with an example is in [one B2B store or several](../../../blog/b2b-stores-countries-brands-dealers/).

## Parts per machine: where entitlements stop

"May this dealer buy this part?" is what entitlements answer. "Does this part fit this machine?" they cannot answer, because a serial number does not appear anywhere in the chain. One buyer group per machine fails on the limits: a standard screw in 6,000 machines would sit far above 2,000 groups, and a dealer with 40 machines would need more than 20 groups.

The robust route is a machine page. A custom Lightning web component shows the machines registered to the dealer's account and, for each one, the spare-relevant positions, from Salesforce assets or live from PLM. Price and the right to buy still come from entitlements and price books. Filtering the normal search per machine is possible through endpoint extensions such as `Commerce_Endpoint_Search_ProductSearch` from the [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html), but the [Apex reference](https://developer.salesforce.com/docs/commerce/salesforce-commerce/references/comm-apex-reference/BaseEndpointExtension.html) still labels the base class as beta. I would wait with that.

The data matters more than the component: without an as-built parts list per serial number, meaning the parts built into exactly this machine, no store can answer the question. The options are in [spare parts shop: show only parts for each machine](../../../blog/spare-parts-shop-parts-per-machine/), and the same data from an agent's point of view in [spare parts by serial number](../../../blog/spare-parts-by-serial-number-ai/). How the installed base is kept as assets is covered in the Manufacturing Cloud masterclass chapter [warranty and after-sales](../../manufacturing-cloud/warranty-and-after-sales/). One rule I never relax: the dealer sees only machines registered to their own account, read from the asset, never from a free text field.

## A typical scenario, as an assumption

A machine builder sells spare parts through 800 dealers in 12 countries, with three dealer tiers and two brands. All details are assumptions.

- Country and tier give 36 buyer groups, the brands two more. Each dealer account sits in two groups, well below 20, and a common part is entitled to 36 groups instead of 800.
- Both brands have their own category trees, so two stores. That fits into the six storefronts of Growth Edition.
- 30,000 active spare parts come from SAP, 8,000 of them with predecessor numbers. Those go into a searchable field; synonym rules stay for terms.
- Parts per machine start with a machine page for the three most important machine series.

## Where should you start?

Write the entitlement concept on one page before anyone loads data:

- the list of buyer groups with the criteria that put an account into each one,
- the list of entitlement policies with the assortment each one covers,
- a matrix of which group gets which policy and which price book,
- a count against the limits above, for today and for three years from now,
- 200 real search terms from dealers, taken from emails and phone notes and tested against a test store.

The ERP fields that feed memberships and search then go into the interface list from [chapter 4](../erp-integration-stock-orders/). I review such concepts before a partner builds as part of [Salesforce architecture](../../../services/salesforce-architecture/); which data comes from which system is part of [Salesforce integration](../../../services/salesforce-integration/). All chapters are on the [overview page](../).

Few buyer groups and clean product data decide more about a B2B store than any search setting. If you would like your entitlement concept reviewed, [send me a message](#contact).
