---
title: "Reorders in B2B Commerce: templates, CSV, reorder"
description: "How dealers reorder fastest in Salesforce B2B Commerce: past orders to cart, order templates, CSV import, cart limits, shared carts and the reorder portal."
pubDate: 2026-10-28
lang: en
slug: b2b-commerce-reorder-order-templates
translationKey: commerce-reorder-order-templates
topic: commerce
categories: [b2b-commerce]
tags: [b2b commerce, reorder, order templates, cart, spare parts, dealers]
takeaways:
  - "Salesforce B2B Commerce has four ways to reorder: a past order back into the cart, saved order templates, a CSV or JSON file into the cart, and the lighter reorder portal."
  - "The Add Order to Cart API copies all items of a past order summary into the current cart and creates a cart if none is active."
  - "Order templates for buyers and sales reps are listed by Salesforce as GA September 2026; cart import and export by CSV or JSON came with the July 2026 release."
  - "Most stores limit a cart to 500 line items; with large cart support it is 2,000. A user can have 100 carts, one active and up to 99 secondary."
  - "Multi-cart live collaboration, where several users build and approve one cart together, is listed for January 2027."
faq:
  - q: "How do dealers reorder a previous order in Salesforce B2B Commerce?"
    a: "The Add Order to Cart API adds all items from a past order summary to the buyer's current cart, and creates a new cart if no active cart exists. The buyer then changes quantities and checks out as usual."
  - q: "What are order templates in B2B Commerce?"
    a: "Order templates let buyers and sales reps create, save and reuse common orders. Salesforce lists them as GA September 2026 on its Commerce innovations page."
  - q: "How many lines can a B2B Commerce cart hold?"
    a: "According to the Salesforce cart limits, most stores limit cart size to 500 line items per order. With large cart support enabled, a store can process up to 2,000 line items per order."
  - q: "What is the Salesforce reorder portal?"
    a: "A small Commerce service that focuses buyers on their past orders. Sales reps invite buyers from sales cadences or the order record. Integrating it with Sales Cloud requires an Agentforce Commerce licence and an enabled Digital Experience."
  - q: "Can several people at a dealer work on the same cart?"
    a: "Salesforce lists multi-cart live collaboration for January 2027: several users build and review the same cart at the same time, with role permissions and an audit trail. Before that date, plan with one cart per user."
draft: false
---

Dealers reorder fastest in Salesforce B2B Commerce when the store offers the way that matches how they buy. For "the same as last time" there is the Add Order to Cart API, which copies a past order into the cart. For recurring baskets, such as quarterly consumables, there are order templates, listed by Salesforce as GA September 2026. For long lists from the dealer's own system there is cart import by CSV or JSON from the July 2026 release. A cart holds 500 lines in most stores and 2,000 with large cart support. Shared carts for team approvals are listed for January 2027.

## Why does reordering decide whether dealers use the store?

Most spare parts and consumables a dealer buys are items they have bought before. The dealer knows the part number, often the quantity, and wants the order done in a minute. If the store makes them search for each part again, they go back to email or the phone, and inside sales types the order into the ERP as before.

So in a manufacturer's B2B store I look at reorder paths before I look at the product detail page. Search and catalogue matter for new parts; reorders carry the volume. Salesforce now also markets the product as "Agentforce Commerce for B2B", and all reorder features below belong to the same product.

## Which reorder options does Salesforce B2B Commerce offer?

| Option | What the buyer does | Status, October 2026 |
|---|---|---|
| Past order to cart | Picks an order from history, gets all items in the cart | Available, API documented |
| Order templates | Saves a common order and reuses it | Listed as GA September 2026 |
| Cart import and export | Uploads a CSV or JSON file, exports the cart for approval | Released July 2026 |
| Multi-cart collaboration | Several users build and approve one cart | Listed for January 2027 |
| Reorder portal | Uses a small site focused on past orders | Available, Trailhead module |

**Past order to cart.** The [order summary APIs](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-order-summaries-apis.html) include Add Order to Cart, which "simplifies the reorder process by adding all items from a specified order summary directly to your current cart". If no active cart exists, the API creates one. The documentation does not say how items are handled that are no longer orderable, so a superseded part number is something to test in the sandbox, not to assume.

One consequence for manufacturers: the API works on order summaries in Salesforce. A phone order that exists only in SAP is not an order summary, so a dealer cannot reorder it from the store history. If dealers expect to see all their orders, that becomes an integration decision, covered in the masterclass chapter [ERP integration](../../masterclass/b2b-commerce/erp-integration-stock-orders/).

**Order templates.** On its [Commerce innovations page](https://www.salesforce.com/ca/commerce/innovations/), Salesforce lists order templates as "GA September '26": "Buyers and sales reps create, save, and reuse common orders". That fits dealers with a fixed basket, for example the filter and seal set for every maintenance visit.

**Cart import and export.** The [July 2026 B2B Commerce release](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) added import and export of the cart as CSV or JSON. Buyers upload a prepared spreadsheet into the cart and export the cart with one click for internal approval. For dealers who plan their stock in their own merchandise management system, a file is faster than any clicking.

## How large can a cart get?

The [cart limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-cart-limits.html) set the frame for imports and templates:

- **Line items per cart:** most stores limit cart size to 500 line items per order. With large cart support enabled, a store can process up to 2,000.
- **Carts per user:** 100, one active cart and up to 99 secondary carts. This is a soft limit that Salesforce support can raise.
- **Checkout time to live:** 7 days by default, at most 30 days.

500 lines sound like plenty until a dealer imports the annual stock order for a new branch. Before anyone promises "upload your whole list", I would ask how long the longest orders really are, from the ERP, and decide on large cart support with that number. Long carts also mean long pricing and stock calls to the ERP at checkout, which has its own response time limits.

## How do dealer teams approve a cart together?

At larger dealers, a technician or warehouse clerk builds the cart and someone in purchasing approves it. Today the export to a file covers this: the cart goes out by email, comes back approved, and the buyer checks out.

Salesforce lists multi-cart live collaboration on the innovations page as "GA January '27": several users build and review the same cart at the same time. The [Winter '27 release highlights on Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-marketing-commerce-revenue-management) add "real-time sync, role permissions, and an audit trail". I would not build a custom approval process now that the standard will replace in a few months. If approvals are a must for go-live before January, the export route is the bridge.

## When is the reorder portal enough?

The reorder portal is a lighter option for companies that do not want a full store. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-reorder-portal-quick-look/boost-sales-with-the-reorder-portal), it is a Commerce micro-service that focuses buyers on their past orders: view orders, change quantities, place new orders, check status. Sales reps invite buyers through sales cadences or from the order record. Integrating the portal with Sales Cloud requires an Agentforce Commerce licence and an enabled Digital Experience; Trailhead says it can be installed and configured in 30 minutes, built from a template with LWR components.

My view: the reorder portal fits when a sales team wants repeat orders from a few hundred existing customers and has no catalogue project. Once dealers need to find new parts, see buyer-specific assortments or import long lists, the full store is the better base.

## A typical scenario, as an assumption

A manufacturer of compressors has 180 dealers. Two thirds of their spare parts orders repeat an earlier order with small changes, a quarter are maintenance kits with fixed contents, and a few large dealers send lists of 300 to 800 lines from their own system twice a year.

For this mix I would switch on all three paths: past orders to cart for the repeats, order templates for the maintenance kits, CSV import for the large dealers, with large cart support because 800 lines exceed the usual 500. I would measure for three months which path each buyer group uses before investing in more. Shared carts for the large dealers come with the January 2027 release.

## Where should you start?

Pull the order lines of the last twelve months from the ERP and sort them into repeats, fixed baskets and long lists. That tells you which reorder path matters most, and whether 500 lines are enough. How the order then leaves the store with PO number and credit check is covered in [B2B checkout: purchase order, card or invoice?](../b2b-checkout-purchase-order-card-invoice/). Reordering through chat on WhatsApp is the topic of [the B2B Buyer Agent](../b2b-buyer-agent-whatsapp-ordering/), and replenishment proposals from distributor stock are covered in [Agentforce for distributor stock and replenishment](../distributor-inventory-replenishment-agentforce/). The chapter [prices, cart and checkout](../../masterclass/b2b-commerce/prices-cart-checkout/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) puts these decisions together, and the target picture across store, ERP and sales is part of my [Salesforce architecture](../../services/salesforce-architecture/) work.

Dealers keep using a store when the reorder they do every week takes a minute. If you want to check which paths your dealers need, [send me a message](#contact).
