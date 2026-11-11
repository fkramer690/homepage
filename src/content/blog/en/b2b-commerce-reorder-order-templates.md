---
title: "Reorders in B2B Commerce: templates, CSV, reorder portal"
metaTitle: "Salesforce B2B Commerce: reorders in a spare parts store"
description: "Reordering in Salesforce B2B Commerce: past orders, order templates, CSV import, shared carts and the reorder portal, with limits and when to use which."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-commerce-reorder-order-templates
translationKey: commerce-reorder-order-templates
topic: commerce
categories: [b2b-commerce]
tags: [b2b commerce, reorder, order templates, cart, spare parts, dealers]
takeaways:
  - "Reordering works in four ways: a past order, an order template, a CSV file and the reorder portal. Shared carts help with team approval."
  - "The Add Order to Cart API copies all items of a past order summary into the current cart and creates a cart if none is active."
  - "Order templates have been generally available since September 2026. Cart import and export came in July 2026; the help documentation covers CSV."
  - "Most stores limit a cart to 500 line items, or 2,000 with large cart support. Buyers can import up to 15 carts by CSV every 48 hours."
  - "Carts can already be shared within the dealer account, with view, edit and checkout rights. Real-time collaboration on one cart is announced for January 2027."
faq:
  - q: "How do dealers reorder a previous order in Salesforce B2B Commerce?"
    a: "The Add Order to Cart API adds all items from a past order summary to the buyer's current cart, and creates a new cart if no active cart exists. The buyer then changes quantities and checks out as usual."
  - q: "What are order templates in B2B Commerce?"
    a: "Order templates let buyers and sales reps create, save and reuse common orders. They have been generally available since September 2026; older stores may need new components on their pages."
  - q: "How many lines can a B2B Commerce cart hold?"
    a: "According to the Salesforce cart limits, most stores limit cart size to 500 line items per order. With large cart support enabled, a store can process up to 2,000 line items per order."
  - q: "What is the Salesforce reorder portal?"
    a: "It is a small Commerce service that gives buyers access to their past orders. Sales reps invite buyers through sales cadences or from the order record. Integrating it with Sales Cloud requires an Agentforce Commerce license and an enabled Digital Experience."
  - q: "Can several people at a dealer work on the same cart?"
    a: "Yes. The owner shares the cart with other people on the same account and grants view, edit or checkout permission to each person. This requires Customer Community Plus licenses or higher and the same currency and pricing for everyone. Salesforce has also announced simultaneous real-time editing for January 2027."
draft: false
---

Dealers reorder fastest in Salesforce B2B Commerce when the store offers the reorder path that matches how they buy. For "the same as last time", buyers can use the Add Order to Cart API, which copies a past order into the cart. For recurring baskets, such as quarterly consumables, there are order templates, generally available since September 2026. For long lists from the dealer's own system, buyers can use cart import by CSV. A cart holds 500 lines in most stores and 2,000 with large cart support. For team approval, carts can already be shared.

## Why does reordering decide whether dealers use the store?

Many spare parts and consumables a dealer buys are items they have bought before. The dealer knows the part number, often the quantity, and wants to place the order in a minute. If the store makes them search for each part again, they return to email or the phone, and the inside sales team types the order into the ERP as before.

So in a manufacturer's B2B store I look at reorder paths before I look at the product detail page. Search and catalog matter for new parts, but reorders account for a large share of the volume. Salesforce now also markets the product as "Agentforce Commerce for B2B", and all reorder features below belong to the same product.

## Four ways to reorder in Salesforce B2B Commerce

In addition, there is cart sharing, which is not an ordering path itself but helps with team approval.

| Option | What the buyer does | Status, November 2026 |
|---|---|---|
| Past order to cart | Picks an order from history, gets all items in the cart | Available, API documented |
| Order templates | Saves a common order and reuses it | Available since September 2026 |
| Cart import and export | Uploads a CSV file, exports the cart for approval | Available since July 2026 |
| Cart sharing | Shares the cart within the account to view, edit or check out | Available, real-time collaboration announced for January 2027 |
| Reorder portal | Uses a small site focused on past orders | Available, Trailhead module |

**Past order to cart.** The [order summary APIs](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-order-summaries-apis.html) include Add Order to Cart, which "simplifies the reorder process by adding all items from a specified order summary directly to your current cart". If no active cart exists, the API creates one.

```hinweis achtung
The documentation does not say how items that are no longer orderable are handled, so a superseded part number is something to test in the sandbox, not to assume.
```

One consequence for manufacturers: the API works with order summaries in Salesforce. A phone order that exists only in SAP is not an order summary, so a dealer cannot reorder it from the order history in the store. If dealers expect to see all their orders, that becomes an integration decision, covered in the masterclass chapter [ERP integration](../../masterclass/b2b-commerce/erp-integration-stock-orders/).

**Order templates.** [Order templates](https://help.salesforce.com/s/articleView?id=commerce.comm_ordertemplates.htm&language=en_US&type=5) have been generally available since September 2026: buyers and sales reps save single products or whole carts as a template and add them back later, and can even combine several templates in one cart. Older stores may need new components on their pages. That fits dealers with a fixed basket, for example the filter and seal set for every maintenance visit.

**Cart import and export.** The [July 2026 B2B Commerce release](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) added import and export of the cart. The announcement mentions CSV and JSON; the [help documentation on cart import and export](https://help.salesforce.com/s/articleView?id=commerce.comm_cartimportexport.htm&language=en_US&type=5) covers only CSV for the buyer interface. Buyers upload a prepared spreadsheet into the cart and export the cart with one click for internal approval, with up to 15 imports every 48 hours and 1,000 exports per account per day. If you need JSON, test it in your own store. For dealers who plan their stock in their own merchandise management system, a file is faster than clicking through the store.

## 500 lines per cart, 2,000 with large cart support

The [cart limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-cart-limits.html) define the limits for imports and templates. The number of carts per user is a soft limit that Salesforce support can raise.

```kennzahlen
500 | line items per cart in most stores
2,000 | line items with large cart support enabled
100 | carts per user, a soft limit
7 days | checkout time to live by default, at most 30 days
source: Salesforce Developer Documentation, cart limits, as of October 2026
```

500 lines sound like plenty until a dealer imports the annual stock order for a new branch. Before anyone promises "upload your whole list", I would use the ERP to check how many line items the longest orders really have and decide on large cart support based on that number. Long carts also mean long pricing and stock calls to the ERP at checkout, and those calls have their own response time limits.

## How do dealer teams approve a cart together?

At larger dealers, a technician or warehouse clerk builds the cart, and someone in purchasing approves it. [Shared carts](https://help.salesforce.com/s/articleView?id=commerce.comm_sharecartsetup.htm&language=en_US&type=5) already cover this: the owner shares the cart with people on the same account and grants view, edit or checkout permission to each person. During checkout the cart is locked for everyone else. Prerequisites are Customer Community Plus licenses or higher, the Buyer and Account Switcher permission sets, and the same currency and pricing for all collaborators. Where that does not fit, the export by email remains the fallback.

Salesforce has announced multi-cart live collaboration for January 2027: several users can build and review the same cart at the same time. The [Winter '27 release highlights on Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-marketing-commerce-revenue-management) add "real-time sync, role permissions, and an audit trail". So I would not build a custom approval process, but start with shared carts and check whether the dealer users' licenses support them.

## When is the reorder portal enough?

The reorder portal is a lighter option for companies that do not need a full store. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-reorder-portal-quick-look/boost-sales-with-the-reorder-portal), it is a Commerce micro-service for buyers' past orders: view orders, change quantities, place new orders, check status. Sales reps invite buyers through sales cadences or from the order record. Integrating the portal with Sales Cloud requires an Agentforce Commerce license and an enabled Digital Experience; Trailhead says it can be installed and configured in 30 minutes and is built from a template with LWR components. That covers the basic setup, not ERP integration, permissions and testing.

My view: the reorder portal fits when demand consists almost entirely of repeating existing orders and no catalog project is planned. Once dealers need to find new parts, see buyer-specific assortments or import long lists, the full store is the better base.

## Example: 180 dealers, two thirds repeat orders

A manufacturer of compressors has 180 dealers. Two thirds of the dealers' spare parts orders repeat an earlier order with small changes, a quarter are maintenance kits with fixed contents, and a few large dealers send lists of 300 to 800 lines from their own system twice a year.

For this mix I would enable all three paths: past orders to cart for the repeats, order templates for the maintenance kits and CSV import for the large dealers, with large cart support because 800 lines exceed the usual 500. I would measure for three months which path each buyer group uses before investing further. For approvals at the large dealers I would enable cart sharing.

## Sort the order lines of the last twelve months

Export the order lines of the last twelve months from the ERP and sort them into repeats, fixed baskets and long lists. That tells you which reorder path matters most, and whether 500 lines are enough. How the order then leaves the store, including the PO number and credit check, is covered in [B2B checkout: purchase order, card or invoice?](../b2b-checkout-purchase-order-card-invoice/). Reordering through chat on WhatsApp is the topic of [the B2B Buyer Agent](../b2b-buyer-agent-whatsapp-ordering/), and replenishment proposals from distributor stock are covered in [Agentforce for distributor stock and replenishment](../distributor-inventory-replenishment-agentforce/). The chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) brings these decisions together, and the target architecture across store, ERP and sales is part of my [Salesforce architecture](../../services/salesforce-architecture/) work.
