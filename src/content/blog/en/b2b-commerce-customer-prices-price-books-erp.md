---
title: "Customer prices in B2B Commerce: price books or ERP?"
description: "How Salesforce B2B Commerce shows buyer-specific prices: price books, pricing strategy, limits, and when a live ERP call via the pricing extension is better."
pubDate: 2026-10-28
lang: en
slug: b2b-commerce-customer-prices-price-books-erp
translationKey: commerce-customer-prices
topic: commerce
categories: [b2b-commerce, architecture]
tags: [B2B Commerce, pricing, price books, SAP, ERP integration, commerce extensions]
takeaways:
  - "Prices come from price books assigned to the store and to buyer groups. The pricing strategy, Best Price or Priority Price, decides which one wins."
  - "A store can have 5 price books, a price book up to 350,000 entries, and a pricing call evaluates only the first 25 valid price books. The last limit is hard."
  - "SAP condition logic with customer prices, group discounts and surcharges rarely maps one to one to price books, which hold one price per product per book."
  - "The extension Commerce_Domain_Pricing_Service replaces price books with your own logic, such as a live ERP call, and the ERP must then answer fast."
  - "Decide in writing which system is the price master before any buyer sees a price, and what happens when store price and order price differ."
faq:
  - q: "Where do customer prices in Salesforce B2B Commerce come from?"
    a: "By default from price books: a standard price book, store price books and buyer group price books. If a buyer has several, the pricing strategy decides: Best Price shows the lowest, Priority Price follows the priority you set per buyer group."
  - q: "How many price books can a B2B store use?"
    a: "5 price books can be assigned to a store, and a price book holds up to 350,000 entries (soft limit). Per pricing call only the first 25 active price books in the buyer's currency are evaluated; that limit is hard."
  - q: "Can B2B Commerce take prices live from SAP?"
    a: "Yes, through the pricing extension point Commerce_Domain_Pricing_Service, which uses price books by default and can be replaced with Apex logic that calls the ERP. The cart uses a separate pricing cart calculator."
  - q: "How many price books can one buyer group have?"
    a: "The Salesforce limits page states both values: 50 in the table and 25 in a note on the same page. Confirm the figure with Salesforce before you design one price book per buyer."
draft: false
---

Customer prices in Salesforce B2B Commerce come from price books by default. Store price books and buyer group price books cover list prices, dealer tier prices and quantity tiers well. If your dealer prices are the result of SAP condition logic, with customer prices, group discounts, surcharges and validity dates, you have two options: replicate the calculated net prices into price books, or call the ERP live through the pricing extension. Both work. Which one fits depends on how many price combinations you have and how fast your ERP answers. Decide the price master in writing before any buyer sees a price.

## How do price books work in a B2B store?

Salesforce B2B Commerce, which Salesforce now also markets as Agentforce Commerce for B2B, uses the same price book objects as Sales Cloud. Every product needs an entry in the standard price book before it can go into another price book. On top of that you assign custom price books to the store or to buyer groups. A buyer group is a set of buyer accounts that share visibility and prices, such as all gold-tier dealers in Germany. According to [Salesforce Help on pricing for B2B stores](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.comm_pricebooks.htm&type=5), a new store automatically gets a default price book and a default strikethrough price book. The strikethrough price book shows a reference price crossed out next to the buyer's price.

If a buyer has access to several price books, the store needs a rule. [Salesforce Help on pricing strategies](https://help.salesforce.com/s/articleView?id=sf.comm_priority_pricing.htm&language=en_US&type=5) offers two:

- **Best Price** shows the lowest price across all of the buyer's price books.
- **Priority Price** follows the order you set per buyer group. The lower the number, the higher the priority.

For volume discounts there is tiered pricing. The pricing data model contains Price Adjustment Schedule and Price Adjustment Tier, and the LWR store has a Tiered Discounts component that shows the tiers on the product page.

Salesforce Help names three typical designs: one buyer group, entitlement policy and price book per dealer tier; one price book and buyer group per buyer when you want buyer-specific prices; and buyer groups per product group to steer visibility. The first one is what I would start with.

## 5 price books per store, 25 per pricing call

The [price book data limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-price-book-limits.html) decide early whether price books are realistic for you:

| Limit | Value | Type |
|---|---|---|
| Price books assigned to a store | 5 | hard |
| Entries per price book | 350,000 | soft |
| Price books evaluated per pricing call | 25 | hard |
| Buyer groups per price book | 100 | soft |
| Price books per org | 300,000 | soft |
| Price book entries per org | 50 million | soft |
| Price books per buyer group | 50 or 25 | unclear |

The 25 per call matters most. Only the first 25 valid price books are evaluated, meaning active and in the buyer's currency; anything beyond is ignored without an error. A buyer who belongs to many buyer groups, each with several price books, can therefore see a price that is not the one you intended. A buyer account can belong to up to 20 buyer groups by default.

```hinweis offen
The last row is a documentation problem. The same Salesforce page states 50 price books per buyer group in the table and 25 in a note. If your design depends on that number, get the answer from Salesforce in writing.
```

## Why do SAP conditions rarely fit price books one to one?

A price book entry is one price for one product in one price book, with a currency and an active flag. SAP pricing works differently. The condition technique searches through customer-specific prices, price lists, discounts per material group, surcharges and scales, each with its own validity period, and calculates the net price at order time.

To bring that into price books, you have to calculate the result in advance for every combination a buyer can see. With four dealer tiers and a stable price list that is easy: four price books, one nightly load. With prices negotiated per customer it grows quickly, and every change in SAP needs a new load before the store shows the right price. Temporary promotions, freight surcharges and minimum quantity surcharges are usually where replication fails first.

The second risk is quieter. If the store shows a price calculated from a copy and SAP calculates a different one when the order arrives, someone has to decide which one applies. If nobody decided it before go-live, that question lands with inside sales, one order at a time. I describe the same risk for AI-built quotes in [AI Partner Sales Assistant: dealer quotes with AI](../ai-partner-sales-assistant-dealer-quotes/).

## When should the price come live from the ERP?

B2B Commerce has extension points for this. According to the [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html), Commerce_Domain_Pricing_Service uses Salesforce price books by default, and Commerce_Domain_Pricing_CartCalculator calculates prices for cart and checkout based on the pricing service. You extend the base class [PricingService](https://developer.salesforce.com/docs/commerce/salesforce-commerce/references/comm-apex-reference/PricingService.html) in Apex. It has two methods: processPrice for product prices and processTransactionalPrice for prices and totals, which starts from the catalogue price and then applies adjustments.

The [extension guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html) shows an example that fetches the price from an external service, and it strongly recommends calling super() when you only modify the default behaviour. One detail from the extensions list: if the store uses Faster Add-to-Cart, every product still needs an entry in a store price book, even with your own pricing logic.

The trade-offs are clear:

- **Live call:** the buyer sees the SAP net price. In return, the ERP and the middleware must answer in a time a buyer accepts on a product list, and you need a rule for what the store shows when SAP is down.
- **Replicated price books:** fast and independent of the ERP. In return, prices are as old as the last load, and the pricing logic exists twice.
- **Mixed:** price books for list and tier prices on product pages, the live call where the price becomes binding. The documentation does not say which method runs on which page, so I would prove this split in a prototype before committing to it.

A third option is Advanced Pricing powered by Revenue Cloud, a pricing engine inside Salesforce. When it is worth the extra licence is covered in [Advanced Pricing in B2B stores](../advanced-pricing-b2b-store-revenue-cloud/).

## Worked example: compressor maker with 600 dealers

Assume a maker of compressors sells spare parts to 600 dealers in 9 countries. SAP holds a list price per country, a discount per dealer tier and material group, and customer prices for about 40 large dealers. Around 25,000 parts are sold online.

I would split it. For the roughly 560 dealers on tier discounts, a nightly job calculates the net prices into one price book per country and tier; with 9 countries and 3 tiers that is 27 price books of at most 25,000 entries each, and each buyer sees exactly one of them. For the 40 large dealers with customer prices, the pricing extension asks SAP live in the cart. Freight and minimum quantity surcharges come from SAP at checkout for everyone. The order that goes back to SAP carries the price the buyer saw, and SAP checks it against its own result with a defined tolerance.

```ablauf
sf: Store price books, Pricing extension, Cart
erp: SAP pricing, SAP order
SAP pricing --nightly load--> Store price books
Store price books --560 dealers--> Cart
SAP pricing --live price--> Pricing extension
Pricing extension --40 dealers--> Cart
Cart --order with price--> SAP order
```

The numbers are invented to show the method. The point is that the split follows how prices are made in SAP, not what the store can technically do.

## First step: a one-page price master decision

Write a one-page price master decision before the store design:

1. Which system calculates the price for each buyer group: SAP, price books or Revenue Cloud?
2. Which price is shown where: product list, product page, cart, order confirmation?
3. How old may a replicated price be, and who loads it?
4. What does the store show when the live call fails?
5. Which price applies when store and ERP differ, and who resolves it?

This decision belongs in the same document as your [object ownership matrix](../salesforce-object-ownership-matrix/), and it shapes the interface list for the ERP, as described in [B2B Commerce and SAP: which data flows where?](../b2b-commerce-sap-data-flows/). How prices, quotes, checkout and reorders fit together is the subject of the chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/) in the [B2B Commerce masterclass](../../masterclass/b2b-commerce/). Designing the interface itself is part of my work on [Salesforce integration](../../services/salesforce-integration/).
