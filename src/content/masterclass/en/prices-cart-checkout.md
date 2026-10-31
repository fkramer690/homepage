---
title: "B2B Commerce: prices, cart and checkout"
description: "Customer prices from price books or the ERP, Advanced Pricing, request for quote, checkout with a purchase order and reordering in a Salesforce B2B store."
lang: en
slug: prices-cart-checkout
course: b2b-commerce
translationKey: commerce-03
chapter: 3
pubDate: 2026-10-28
short: "Prices, cart and checkout"
summary: "Customer prices, request for quote, purchase order instead of card and fast reordering in the B2B store."
takeaways:
  - "Price books cover list prices and dealer tiers. SAP condition logic needs a live call to the ERP or Advanced Pricing powered by Revenue Cloud."
  - "A pricing call in a B2B store evaluates only the first 25 valid price books; anything beyond that is ignored without an error."
  - "Advanced Pricing requires Commerce Growth or Advanced plus Revenue Cloud Advanced and pays off when sales already calculates its quotes in Revenue Cloud."
  - "Dealers pay with a purchase order, which triggers no payment in Salesforce. The store checks credit limit and order block live in the ERP first."
  - "Volume comes from reorders: past order to cart, order templates, CSV import. Most stores cap a cart at 500 lines, 2,000 with large cart support."
articles: [commerce-customer-prices, commerce-advanced-pricing-revenue-cloud, commerce-request-for-quote, commerce-checkout-purchase-order, commerce-reorder-order-templates, partner-sales-assistant-dealer-quotes]
faq:
  - q: "Can Salesforce B2B Commerce show dealer prices straight from SAP?"
    a: "Yes, through the extension point Commerce_Domain_Pricing_Service. By default it uses price books, and you can replace it with Apex logic that calls SAP live. SAP then has to answer fast, and you need a rule for when it is unreachable."
  - q: "Do I need Revenue Cloud for a B2B store?"
    a: "Not for list and tier prices; price books cover those. Revenue Cloud Advanced comes in when you want pricing procedures, contract prices held in Salesforce, configurable bundles or Request for Quote. Salesforce Help names Advanced Pricing as a prerequisite for Request for Quote."
  - q: "Does a B2B store need a payment gateway?"
    a: "Not if every buyer orders on account. The Purchase Order component works without a gateway. You need one only when a group of buyers pays by card, for example through Dual Payment or Salesforce Payments with Stripe."
  - q: "What is the fastest way for dealers to reorder?"
    a: "The feature that matches their pattern: Add Order to Cart to repeat a past order, order templates for fixed baskets and CSV or JSON import for long lists from their own system. Shared carts for team approvals are announced for January 2027."
draft: false
---

A B2B store on Salesforce shows customer prices from price books by default. That covers list prices and dealer tiers. If your prices come from SAP condition logic or contracts, you need either a live call to the ERP through the pricing extension or Advanced Pricing powered by Revenue Cloud, which is a second licence. Large or unusual quantities go through Request for Quote. At checkout dealers pay with a purchase order, and the store first asks the ERP about credit limit and order block. Reordering is where the volume is. The most important decision in this chapter is still a written one: which system is the price master.

## Where do prices in a B2B store come from?

Salesforce B2B Commerce, which according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping) Salesforce now also markets as "Agentforce Commerce for B2B", uses the same price book objects as Sales Cloud. According to [Salesforce Help on pricing in B2B stores](https://help.salesforce.com/s/articleView?language=en_US&id=commerce.comm_pricebooks.htm&type=5), every new store automatically gets a default price book and a default strikethrough price book, which shows a crossed-out reference price. You assign further price books to the store or to buyer groups. How buyer groups and visibility fit together is covered in [chapter 2](../catalog-search-entitlements/).

When a buyer has access to several price books, the [pricing strategy](https://help.salesforce.com/s/articleView?id=sf.comm_priority_pricing.htm&language=en_US&type=5) decides:

- **Best Price** shows the lowest price across all of the buyer's price books.
- **Priority Price** follows the order you set per buyer group; the smaller number wins.

I would start with Priority Price when dealers sit in several buyer groups, such as country and tier. Best Price rewards every overlap that slips in by accident during a data load.

For quantity tiers, the pricing data model contains Price Adjustment Schedule and Price Adjustment Tier. Tiered pricing also appears in the list of Revenue Management features. Check which variant covers your tiers in a prototype before you buy licences.

The [price book limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-price-book-limits.html) shape the design early:

| Limit | Value |
|---|---|
| Price books per store | 5 |
| Entries per price book | 350,000 (soft) |
| Price books evaluated per pricing call | 25 (hard) |
| Buyer groups per price book | 100 (soft) |
| Price books per buyer group | 50 in the table, 25 in a note on the same page |

The 25 per call is the limit that can hurt: price books beyond it are left out of the price evaluation, without an error. Get the contradictory figure per buyer group confirmed by Salesforce in writing if your design depends on it. Details and patterns are in [customer prices in B2B Commerce](../../../blog/b2b-commerce-customer-prices-price-books-erp/).

## Copy price books or ask the ERP live?

A price book entry holds one price for one product in one price book. SAP condition logic, in contrast, calculates the net price at order time from customer prices, discounts per material group, surcharges and validity dates. The store has two routes:

- **Replicate:** a job calculates net prices in advance and loads them into price books.
- **Ask live:** according to the [list of extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html), `Commerce_Domain_Pricing_Service` uses price books by default, and `Commerce_Domain_Pricing_CartCalculator` prices cart and checkout based on that service. Replace the service with Apex that calls SAP and the buyer sees the real net price. In return, SAP must answer as fast as a buyer is willing to wait on a product list.

```pro-contra
pro: Replicate
- The store is fast
- The store is independent of the ERP
contra: The price you pay
- Prices are as old as the last load
- The pricing logic exists twice
```

With four dealer tiers and a stable price list, four price books and a nightly load are enough. With prices negotiated per customer I would call SAP live or split: price books for the bulk of dealers, a live call for key accounts. One detail from the extension list: if the store uses Faster Add-to-Cart, every product still needs an entry in a store price book.

Whichever route you choose, one question needs an answer before go-live: which price applies when the store shows a different price from the one SAP calculates when the order arrives? Without a rule it lands with inside sales, order by order. I describe the same risk for AI quotes in [AI dealer quotes with the Partner Sales Assistant](../../../blog/ai-partner-sales-assistant-dealer-quotes/). Which interfaces follow from it is the topic of [chapter 4](../erp-integration-stock-orders/).

## When does the store need Advanced Pricing from Revenue Cloud?

The third option is a pricing engine inside Salesforce. [Salesforce Help on Agentforce Revenue Management for B2B Commerce](https://help.salesforce.com/s/articleView?id=commerce.comm_revenue_intro.htm&language=en_US&type=5) requires a Commerce Growth or Commerce Advanced licence together with Revenue Cloud Advanced, bought through the account executive. It adds complex pricing strategies with pricing procedures, tiered pricing, configurable bundles, Request for Quote, qualification rules for visibility and subscriptions. Contract-based pricing for B2B stores has its own article in Help.

On budget: the B2B editions say "Contact for Pricing", and the [Revenue Cloud pricing page](https://www.salesforce.com/sales/revenue-lifecycle-management/pricing/) lists Revenue Cloud Advanced at $200 per user per month, billed annually. Neither page says how many of these user licences a store with external buyers needs. Ask Salesforce in writing before you build a business case.

```hinweis tipp
My rule: Advanced Pricing pays off when sales already calculates quotes in Revenue Cloud, when contract prices are negotiated in Salesforce or when you need Request for Quote. If SAP calculates every customer price and should keep doing so, Revenue Cloud gives you a second pricing engine that has to agree with SAP. Then the live call is simpler. The trade-offs in detail are in [Advanced Pricing in B2B stores](../../../blog/advanced-pricing-b2b-store-revenue-cloud/). Sales agreements with volumes and terms, which plan demand rather than set the store price, belong to Manufacturing Cloud; the chapter [agreements and forecasting](../../manufacturing-cloud/agreements-and-forecasting/) covers them.
```

## From request to quote to order

Dealers ask for a price on 200 pieces instead of 5, or for a project with a delivery date. Today that is an email with a spreadsheet. With Request for Quote, signed-in buyers send their cart as a quote request, and inside sales works on the quote in Sales Cloud or Agentforce Revenue Management. In its [June 2026 post](https://www.salesforce.com/blog/b2b-commerce-innovations-june-26/) Salesforce calls RFQ "already generally available". The same post introduces Quote to Cart and round-trip quoting: an approved quote comes back to the buyer as a cart, ready to order in the store.

```vertiefung For developers
title: Which Apex methods handle quotes in the store?
For custom components there is the Apex class [ConnectApi.CommerceQuotes](https://developer.salesforce.com/docs/atlas.en-us.264.0.apexref.meta/apexref/apex_ConnectAPI_CommerceQuotes_static_methods.htm): getQuotes and getQuoteDetail from API 66.0, createQuoteFromProduct and updateQuote from API 67.0. With updateQuote the buyer renegotiates or declines an approved quote.
```

```hinweis offen
On licensing, the sources read differently. Help names Advanced Pricing as a prerequisite for RFQ, while the Apex reference supports simple products in createQuoteFromProduct with a B2B Commerce licence alone. Get the answer for your products in writing.
```

Inside sales matters more than the technology. A buyer who waits three days for a quote from the store sends the next request by email again. Response time, ownership per queue and discount limits go on paper before go-live. I describe the whole loop in [Request for Quote in B2B Commerce](../../../blog/request-for-quote-b2b-commerce-cart-to-quote/).

## Checkout on account: purchase order instead of card

A manufacturer's dealers mostly pay on account. The Salesforce developer guide on [payment components](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-payment-component-options.html) describes a purchase order as a form of payment that is "not technically a payment" and triggers no payment flow; the ERP uses the number for the invoice. Without payment authorisation or a purchase order, the order cannot be placed.

The options for B2B stores:

- **Purchase Order:** purchase orders only, no payment gateway.
- **Dual Payment:** card and purchase order, B2B only, with a server-side gateway for the card.
- **Salesforce Payments:** native Stripe integration that can also offer a purchase order in B2B stores.
- **Custom component** or your own server-side gateway with an Apex adapter.

According to the [extensions guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html), payments cannot be customised with extensions. Special payment rules are therefore custom code your team carries through every release.

What the standard does not do is check whether a dealer may order at all. Credit limit and order block live in the ERP. The place for that check is `Commerce_Domain_Checkout_PlaceOrder`: it runs cart validations when the buyer places the order, and you override its `validate` method with a live call to the ERP. Decide what happens on a timeout and what the buyer reads when blocked. Copying credit limits into Salesforce every night is wrong in my view: the copy is out of date exactly when a dealer placed three large orders this morning. More in [B2B checkout: purchase order, card or invoice?](../../../blog/b2b-checkout-purchase-order-card-invoice/).

## Reordering: where does the volume come from?

A dealer has bought most spare parts and consumables before. If they have to search for every part again, they go back to the phone. Salesforce offers several routes:

| Route | Status October 2026 |
|---|---|
| Past order to cart ([Add Order to Cart](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-order-summaries-apis.html)) | available |
| Order templates for buyers and sales reps | "GA September '26" on the [innovations page](https://www.salesforce.com/ca/commerce/innovations/) |
| Import and export the cart as CSV or JSON | [July 2026 release](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) |
| Several users edit one cart live | "GA January '27" |
| Reorder portal for sales teams in Sales Cloud | available, needs an Agentforce Commerce licence |

Add Order to Cart works with order summaries in Salesforce. A phone order that exists only in SAP therefore cannot be reordered from the store history unless you bring those orders into Salesforce.

The [cart limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-cart-limits.html): most stores cap a cart at 500 lines, 2,000 with large cart support. A user has up to 100 carts, one active and 99 secondary. Before anyone promises "upload your whole list", check how long the longest orders in the ERP really are.

The [reorder portal](https://trailhead.salesforce.com/content/learn/modules/salesforce-reorder-portal-quick-look/boost-sales-with-the-reorder-portal) is the lightweight option: sales reps invite buyers, who then repeat their past orders. Integrating it with Sales Cloud needs an Agentforce Commerce licence and an enabled Digital Experience. It fits when no catalogue project is planned. Which feature fits which ordering pattern is in [reorders in B2B Commerce](../../../blog/b2b-commerce-reorder-order-templates/).

## Worked example: 600 dealers in 9 countries

A compressor manufacturer sells spare parts to 600 dealers in 9 countries. SAP holds a list price per country, a discount per dealer tier and customer prices for 40 large dealers. All dealers have a customer account in SAP. Sales calculates machines in SAP; there is no Revenue Cloud.

This is how I would decide:

| Topic | Decision |
|---|---|
| Prices: | 27 price books for 9 countries and 3 tiers, calculated from SAP every night; each dealer sees exactly one. The 40 large dealers get their price live from SAP through the pricing extension. No Advanced Pricing, because the pricing logic stays in SAP. |
| Quotes: | RFQ in a second stage once the licence question is settled; until then project business goes to inside sales as today. |
| Checkout: | Purchase Order component only, credit check in `validate` against SAP. On a timeout the store accepts the order, because SAP checks credit again when it creates the sales order. |
| Reordering: | Add Order to Cart and order templates for everyone, CSV import for the large dealers. |

The numbers are made up to show the method. Change one assumption, such as a sales team that already quotes in Revenue Cloud, and point 1 tips towards Advanced Pricing.

## First step: write the price master decision on one page

Write one page on the price master decision before anyone designs the store:

1. Which system calculates the price per buyer group: SAP, price books or Revenue Cloud?
2. Which price appears where: product list, cart, order confirmation?
3. What does the store show when the live call fails?
4. Which price applies when store and ERP differ, and who resolves it?
5. Which buyer groups pay by purchase order, which by card, and who checks credit?

This page belongs next to your [object ownership matrix](../../../blog/salesforce-object-ownership-matrix/) and drives the interface list for [chapter 4](../erp-integration-stock-orders/). I design the price and credit calls as part of [Salesforce integration](../../../services/salesforce-integration/), and the Revenue Cloud licence question under [make or buy and licences](../../../services/make-or-buy-licences/). All chapters are on the [overview page](../).
