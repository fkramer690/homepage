---
title: "B2B Commerce and SAP: which data flows where?"
description: "Which data flows between Salesforce B2B Commerce and SAP: master data by batch, live calls in cart and checkout, the order out and status back."
pubDate: 2026-10-28
lang: en
slug: b2b-commerce-sap-data-flows
translationKey: commerce-sap-data-flows
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: integration
tags: [b2b commerce, sap, erp integration, commerce extensions, mulesoft, interfaces]
takeaways:
  - "Between Salesforce B2B Commerce and SAP data flows four ways: master data in by batch, live calls during cart and checkout, the order out, and status, delivery and invoice back."
  - "Accounts, products, categories, price books and entitlements are copied into Salesforce; the Commerce product import takes CSV files with product, category and price book columns as asynchronous jobs."
  - "Price, stock, tax, shipping and the check before an order is placed run through Commerce extension points such as Commerce_Domain_Pricing_Service and Commerce_Domain_Checkout_PlaceOrder."
  - "Salesforce recommends extensions over the older checkout integrations since Winter '24; the older framework is still supported, and payments cannot be customised with an extension."
  - "Every interface that still logs in to Salesforce with username and password has to move to another OAuth flow before 20 February 2027."
faq:
  - q: "Which data does Salesforce B2B Commerce need from SAP?"
    a: "Customer accounts, products with categories, prices and the rules for who may see which product, plus live answers for price, availability and credit during checkout. After the order, the store needs the SAP order number, delivery status and invoices back."
  - q: "Does B2B Commerce have a standard SAP connector?"
    a: "No such connector is part of B2B Commerce. MuleSoft offers an Accelerator for SAP with a quote-to-cash use case between Sales Cloud and S/4HANA, which is a starting point for APIs. The store side is built with Commerce extensions and import APIs."
  - q: "Should prices and stock be copied to Salesforce or called live from SAP?"
    a: "Decide per data item. A copy is fast and keeps the store running when SAP is down, a live call is exact but adds waiting time and load. I copy what changes rarely and call live where a wrong value costs money."
  - q: "Do I need MuleSoft for B2B Commerce and SAP?"
    a: "Not for a few interfaces. Direct Apex callouts with named credentials are enough for one store with two or three live calls. Middleware pays off when several Salesforce clouds and agents use the same SAP data."
draft: false
---

Between Salesforce B2B Commerce and SAP, data flows four ways. Master data such as accounts, products, price books and entitlements comes into Salesforce by batch. During cart and checkout the store asks SAP live for price, availability and credit through Commerce extensions. The finished order goes out to SAP. Order confirmation, delivery and invoice come back so buyers see the status in the store. SAP stays the master for prices, stock, credit and the order. Salesforce holds the buying experience and a copy of what it needs for that. The real design work is deciding, per data item, whether it is copied or called live.

## What flows between B2B Commerce and SAP?

I draw the same map at the start of every integration discussion. For a typical B2B store on Salesforce it has four blocks:

| Data | Direction | When | Typical mechanism |
|---|---|---|---|
| Customer accounts, buyers, products, categories, price books, buyer groups, entitlements | SAP to Salesforce | Batch, nightly or on change | Import APIs, middleware |
| Price, availability, credit, tax, shipping | Store asks SAP | Live, in cart and checkout | Commerce extensions |
| Order with PO number, ship-to, requested date | Salesforce to SAP | When the order is placed | Order export after checkout |
| Order number, confirmed dates, delivery, invoice | SAP to Salesforce | On change | Update of the order summary |

The table looks simple. The decisions sit in the second column of every row: which system writes, and how old the data in the store may be.

A note on names: Salesforce now also markets the product as "Agentforce Commerce for B2B". The integration architecture is the same.

## Which master data comes in by batch?

Everything that changes less often than a buyer clicks belongs in a copy. That covers SAP customer masters, which become accounts and buyer accounts in Salesforce, contacts who become buyers, materials that become products, product hierarchies that become categories, and prices for the store.

For products Salesforce offers a [product import API](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-import-apis.html). It reads a CSV file whose column headings map to product, category and price book information, and it runs as an asynchronous job with a status you can query. Price books are mapped through the import settings of the same job. That is enough for a first load and for regular updates from a middleware that writes the file.

Buyer groups and entitlement policies decide who sees which product. They are rarely in SAP as such. They have to be derived, for example from sales organisation, customer group or brand. Write that derivation down as a rule, because otherwise someone maintains buyer groups by hand in Salesforce and the store drifts away from SAP within months.

Who owns which object is the question my [object ownership matrix](../salesforce-object-ownership-matrix/) answers. For a store I add one column: copied or live.

## What should the store ask SAP live?

Salesforce B2B Commerce has named extension points where your own Apex code takes over a service. The [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) shows the ones that matter for SAP:

- **Commerce_Domain_Pricing_Service** for prices. By default it uses Salesforce price books.
- **Commerce_Domain_Inventory_Service** for stock. By default it uses Omnichannel Inventory.
- **Commerce_Domain_Tax_CartCalculator** and **Commerce_Domain_Shipping_CartCalculator** for tax and freight. By default there is no shipping charge at all.
- **Commerce_Domain_Checkout_PlaceOrder** with its `validate` method, the place for a credit or order block check right before the order is placed.
- **Commerce_Domain_Checkout_CreateOrder**, which creates the order from the cart.

Each extension can call SAP live. Each live call also means waiting time for the buyer, load on SAP and a question nobody likes to answer: what does the store do when SAP does not respond?

My rule: call live where a wrong value costs money or trust, copy everything else. Contract prices from SAP condition logic often fall into the first group, which I cover in [customer prices in B2B Commerce](../b2b-commerce-customer-prices-price-books-erp/). Stock is a case of its own and has its own article on [live or copied stock](../b2b-store-stock-availability-erp/). The credit check belongs in `validate` before the order exists, as described in [B2B checkout with purchase order](../b2b-checkout-purchase-order-card-invoice/).

## Extensions or the older integrations?

The [integration architecture page](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-integration-architecture.html) is clear: since Winter '24 Salesforce has offered Commerce extensions for pricing, inventory, shipping, tax and other services and recommends them over the older checkout integrations framework. The older framework is still supported, and the page names no date for retiring it.

There is one exception. According to the [extensions guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html), payments cannot be customised with an extension yet; for those the integrations remain the way. In practice that rarely touches SAP, because dealers usually buy on account with a purchase order.

For new stores I would build every SAP call as an extension. Registration and store mapping run through the Salesforce CLI, so they can live in the repository and the pipeline. More on that in [Commerce extensions: custom code that survives updates](../commerce-extensions-custom-code/).

## How does the order get to SAP, and what comes back?

When the buyer places the order, B2B Commerce creates an order and an order summary in Salesforce. The order summary has a field `OrderLifeCycleType`. According to the [developer guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html), "unmanaged" marks a summary created by B2B Commerce whose lifecycle runs in an external system, and changes there "must be reflected in Salesforce".

That is the normal case with SAP. The order goes out, SAP creates the sales order, and the integration writes the SAP order number, confirmed dates, deliveries and invoices back. Users with the permission B2B Commerce Integrator User or Edit Unmanaged Order Summaries may update these summaries. Who should own the order, and when Salesforce Order Management makes sense instead, is the subject of [B2B store orders to the ERP](../b2b-store-orders-to-erp/).

Plan the return flow as carefully as the outbound one. A dealer who sees "order received" for three days calls inside sales, and the store has saved nothing.

## Middleware or direct callouts?

MuleSoft offers an [Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/) for SAP ECC, S/4HANA and Salesforce. Its quote-to-cash use case syncs order, inventory and customer data between Sales Cloud and S/4HANA, and a second use case covers B2B EDI. It gives you API templates to start from. It does not contain a ready-made B2B Commerce store integration, so the store side remains your work.

Direct Apex callouts with named credentials are fine for one store with two or three live calls and one order export. A middleware layer pays off when the same SAP data also feeds Field Service, Manufacturing Cloud or Agentforce agents. Then one order status API serves the store, the [order status agent](../agentforce-sap-order-status-mulesoft/) and the service team. The AI masterclass explains in the chapter on [MCP and interfaces](../../masterclass/ai-salesforce/mcp-and-interfaces/) why agents should reuse such APIs instead of getting their own.

One deadline applies to every batch interface. Salesforce retires the [OAuth username-password flow](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5) for connected apps on 20 February 2027. A nightly product import that logs in with a password then stops working, often without anyone noticing. How to find and move those interfaces is described in [password integrations end in 2027](../salesforce-password-integrations-end-2027/).

## A typical scenario, as an assumption

A machine builder runs SAP S/4HANA and wants a store for 300 dealers in Europe with 15,000 spare parts. The interface list after the first workshop could look like this:

1. Customer master to accounts and buyer accounts, nightly.
2. Materials and product hierarchy to products and categories, nightly, through the product import.
3. List and dealer tier prices to price books, nightly.
4. Contract prices of the 40 largest dealers live through the pricing extension.
5. Stock status copied hourly, confirmed date live at checkout.
6. Credit and order block live in `validate`.
7. Order to SAP, order number and status back within minutes, deliveries and invoices on change.

Seven interfaces, three of them live. That is a realistic scope for a first release, and each of them needs an owner on the client side.

## Where should you start?

Write the object ownership matrix and the interface list before anyone designs the store pages. For every data item, note the master system, copy or live, maximum age and what happens when SAP is down. The [ERP integration chapter of the B2B Commerce masterclass](../../masterclass/b2b-commerce/erp-integration-stock-orders/) puts these decisions in order, and an independent review of interfaces is part of my work on [Salesforce integration](../../services/salesforce-integration/).

A B2B store is only as good as its data flows from SAP, so decide them first; if you want a second opinion on your interface list, [send me a message](#contact).
