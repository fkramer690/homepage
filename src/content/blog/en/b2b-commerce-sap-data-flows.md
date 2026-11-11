---
title: "B2B Commerce and SAP: which data flows where?"
description: "Which data flows between Salesforce B2B Commerce and SAP: master data by batch, live calls in cart and checkout, the order out and status back."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-commerce-sap-data-flows
translationKey: commerce-sap-data-flows
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: integration
tags: [b2b commerce, sap, erp integration, commerce extensions, mulesoft, interfaces]
takeaways:
  - "Data flows four ways: master data in by batch, live calls during cart and checkout, the order out to SAP, and status, delivery and invoice back."
  - "Accounts, products, categories, price books and entitlements are copied into Salesforce; the product import reads CSV files as asynchronous jobs."
  - "Price, stock, tax, shipping and the pre-order check run through extension points such as Commerce_Domain_Pricing_Service."
  - "Since Winter '24, Salesforce recommends extensions over the older checkout integrations. Payments cannot be customized with an extension."
  - "Every connected app integration that uses the OAuth username-password flow must move, usually to client credentials, before 20 February 2027."
faq:
  - q: "Which data does Salesforce B2B Commerce need from SAP?"
    a: "Customer accounts, products with categories, prices and the rules for who may see which product, plus live answers for price, availability and credit during checkout. After the order is placed, the store needs the SAP order number, delivery status and invoices back."
  - q: "Does B2B Commerce have a standard SAP connector?"
    a: "No such connector is part of B2B Commerce. MuleSoft offers an Accelerator for SAP with reusable SAP and Salesforce APIs and templates, including quote-to-cash between Sales Cloud and S/4HANA, which is a starting point. The store side is built with Commerce extensions and import APIs."
  - q: "Should prices and stock be copied to Salesforce or called live from SAP?"
    a: "Decide per data item. A copy is fast and keeps the store running when SAP is down. A live call is accurate but adds waiting time and load. I copy where some staleness is acceptable and call live where the answer must be binding for the current order."
  - q: "Do I need MuleSoft for B2B Commerce and SAP?"
    a: "Not necessarily. Direct Apex callouts with named credentials can be enough for one store with a few fast live calls, if timeouts, retries and monitoring are designed carefully. Middleware pays off when several Salesforce clouds and agents use the same SAP data."
draft: false
---

Between Salesforce B2B Commerce and SAP, data flows four ways. Master data such as accounts, products, price books and entitlements is loaded into Salesforce in batches. In the cart and at checkout, the store makes live calls to SAP for price, availability and credit through Commerce extensions. The finished order goes out to SAP. Order confirmation, delivery and invoice come back so buyers see the status in the store. SAP stays the master for prices, stock, credit and the order. Salesforce holds the buying experience and a copy of what it needs for that. The real design work is deciding, per data item, whether it is copied or called live.

## What flows between B2B Commerce and SAP?

I draw the same map at the start of every integration discussion. For a typical B2B store on Salesforce it has four blocks:

| Data | Direction | When | Typical mechanism |
|---|---|---|---|
| Customer accounts, buyers, products, categories, price books, buyer groups, entitlements | SAP to Salesforce | Batch, nightly or on change | Import APIs, middleware |
| Price, availability, credit, tax, shipping | Store asks SAP | Live, in cart and checkout | Commerce extensions |
| Order with PO number, ship-to, requested date | Salesforce to SAP | When the order is placed | Order export after checkout |
| Order number, confirmed dates, delivery, invoice | SAP to Salesforce | On change | Order summary and its item summaries; deliveries and invoices need their own model |

The table looks simple. The decisions sit in the second column of every row: which system writes, and how old the data in the store may be.

## Master data comes in by batch as a copy

Copy data where some staleness is acceptable and the store must keep running when SAP is slow; call live where the answer must be binding for the current order. In practice that means copying SAP customer masters, which become accounts and buyer accounts in Salesforce, contacts who become buyers, materials that become products, product hierarchies that become categories, and prices for the store.

For products Salesforce offers a [product import API](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-import-apis.html). It reads a CSV file whose column headings map to product, category and price book information, and it runs as an asynchronous job with a status you can query. Price books are mapped through the import settings of the same job. That is enough for a first load and for regular updates from middleware that writes the file.

Buyer groups and entitlement policies decide who sees which product. They rarely exist in SAP in that form. They have to be derived, for example from sales organization, customer group or brand. Write that derivation down as a rule, because otherwise someone maintains buyer groups by hand in Salesforce and the store drifts away from SAP within months.

Who owns which object is the question my [object ownership matrix](../salesforce-object-ownership-matrix/) answers. For a store I add one column: copied or live.

## Price, stock, tax and shipping live through extension points

Salesforce B2B Commerce has named extension points where your own Apex code takes over a service. The [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) shows the ones that matter for SAP:

- **Commerce_Domain_Pricing_Service** for prices. By default it uses Salesforce price books.
- **Commerce_Domain_Inventory_Service** for stock. By default it uses Omnichannel Inventory.
- **Commerce_Domain_Tax_CartCalculator** and **Commerce_Domain_Shipping_CartCalculator** for tax and freight. By default there is no shipping charge at all.
- **Commerce_Domain_Checkout_PlaceOrder**, with its `validate` method, is the place for a credit or order block check right before the order is placed.
- **Commerce_Domain_Checkout_CreateOrder**, which creates the order from the cart.

Each extension can call SAP live. Each live call also means waiting time for the buyer, load on SAP and a question nobody likes to answer: what does the store do when SAP does not respond?

My rule: call live where a wrong value costs money or trust, copy everything else. Contract prices from SAP condition logic often fall into the first group, which I cover in [customer prices in B2B Commerce](../b2b-commerce-customer-prices-price-books-erp/). Stock is a case of its own, so I cover it separately in [live or copied stock](../b2b-store-stock-availability-erp/). The credit check belongs in `validate` before the order exists, as described in [B2B checkout with purchase order](../b2b-checkout-purchase-order-card-invoice/).

## Extensions or the older integrations?

The [integration architecture page](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-integration-architecture.html) is clear: since Winter '24 Salesforce has offered Commerce extensions for pricing, inventory, shipping, tax and other services and recommends them over the older checkout integrations framework. The older framework is still supported, and the page names no date for retiring it.

There is one exception. According to the [extensions guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html), payments cannot be customized with an extension yet; for payments, the older integrations framework remains the way. In practice that rarely touches SAP, because dealers usually buy on account with a purchase order.

For new stores I would build every synchronous SAP call in the cart and at checkout, such as price, stock, tax and the order check, as an extension. Batch imports, the order export and SAP callbacks use import APIs, middleware or other integration patterns. Registration and store mapping run through the Salesforce CLI, so they can live in the repository and the pipeline. More on that in [Commerce extensions: custom code that survives updates](../commerce-extensions-custom-code/).

## How does the order get to SAP, and what comes back?

When the buyer places the order, B2B Commerce creates an order and an order summary in Salesforce. The order summary has a field `OrderLifeCycleType`. According to the [developer guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html), "unmanaged" marks a summary created by B2B Commerce whose lifecycle runs in an external system, and changes there "must be reflected in Salesforce". B2B Commerce creates unmanaged orders by default. The lifecycle type cannot be changed once the summary exists, and most Salesforce Order Management features do not work on unmanaged orders, so decide early who owns the order.

That is the normal case with SAP. The order goes out, SAP creates the sales order, and the integration writes the status back. Treat the order export as its own integration process, usually asynchronous after the Salesforce order exists, with retries, a duplicate check so SAP does not create the order twice, and a rule for orders SAP rejects:

```ablauf
sf: Checkout, Order Summary
erp: Credit and price, Sales order, Delivery and invoice
Checkout --live call--> Credit and price
Checkout --> Order Summary
Order Summary --order out--> Sales order
Sales order --> Delivery and invoice
Sales order ..number, dates..> Order Summary
Delivery and invoice ..status back..> Order Summary
```

Users with the B2B Commerce Integrator User or Edit Unmanaged Order Summaries permission may update supported fields on these summaries and their related records. Order number and confirmation can be stored on the order summary; several deliveries with tracking or partial invoices need their own objects or a link to SAP documents. Who should own the order, and when Salesforce Order Management makes sense instead, is the subject of [B2B store orders to the ERP](../b2b-store-orders-to-erp/).

Plan the return flow as carefully as the outbound one. A dealer who sees "order received" for three days calls inside sales, and the store has saved nothing.

## Middleware or direct callouts?

MuleSoft offers an [Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/) for SAP ECC, S/4HANA and Salesforce. It provides reusable SAP and Salesforce APIs, for example for accounts, products, orders, pricing and availability, and templates including a quote-to-cash use case between Sales Cloud and S/4HANA and a B2B EDI use case. It does not contain a ready-made B2B Commerce store integration, so you still have to build the store side.

Direct Apex callouts with named credentials can be fine for one store with a few fast live calls, as long as timeouts, retries and monitoring are designed carefully; Apex has no guaranteed delivery and a default timeout of ten seconds per callout. The order export often benefits from an asynchronous or queued pattern even with one store. A middleware layer pays off when the same SAP data also feeds Field Service, Manufacturing Cloud or Agentforce agents. Then one order status API serves the store, the [order status agent](../agentforce-sap-order-status-mulesoft/) and the service team. The AI masterclass explains in the chapter on [MCP and interfaces](../../masterclass/ai-salesforce/mcp-and-interfaces/) why agents should reuse such APIs instead of getting their own.

```hinweis achtung
One deadline applies to many batch interfaces. Salesforce retires the [OAuth username-password flow](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5) for connected apps on 20 February 2027. A nightly product import that uses this flow can then no longer get an access token. Salesforce recommends the client credentials flow for server-to-server integrations. Logins through SOAP `login()` follow their own schedule and need to be checked separately. How to find and move those interfaces is described in [password integrations end in 2027](../salesforce-password-integrations-end-2027/).
```

## Worked example: S/4HANA and 300 dealers in Europe

A machine builder runs SAP S/4HANA and wants a store for 300 dealers in Europe with 15,000 spare parts. The interface list after the first workshop could look like this:

1. Customer master to accounts and buyer accounts, nightly.
2. Materials and product hierarchy to products and categories, nightly, through the product import.
3. List and dealer tier prices to price books, nightly.
4. Contract prices of the 40 largest dealers live through the pricing extension.
5. Stock status copied hourly, confirmed date live at checkout.
6. Credit and order block live in `validate`.
7. Order to SAP, order number and status back within minutes, deliveries and invoices on change.

Seven data flows, three of them with live calls, become more than seven technical interfaces once initial loads, deltas and error handling are counted. In this example that is a manageable scope for a first release, and each flow needs an owner on the client side.

## First step: object ownership matrix and interface list

Write the object ownership matrix and the interface list before anyone designs the store pages. For every data item, note the master system, copy or live, maximum age and what happens when SAP is down. The [ERP integration chapter of the B2B Commerce masterclass](../../masterclass/b2b-commerce/erp-integration-stock-orders/) puts these decisions in order, and an independent review of interfaces is part of my work on [Salesforce integration](../../services/salesforce-integration/).
