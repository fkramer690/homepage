---
title: "B2B store orders to the ERP: who owns the order?"
metaTitle: "Salesforce B2B Commerce and SAP: who owns the order?"
description: "Should SAP or Salesforce Order Management own orders from B2B Commerce? Managed or unmanaged order summaries, status updates from SAP and licenses."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-store-orders-to-erp
translationKey: commerce-order-to-erp
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: integration
tags: [b2b commerce, order management, sap, order summary, erp integration, order history]
takeaways:
  - "Every order summary carries an OrderLifeCycleType: managed means Salesforce Order Management runs the order, unmanaged means a system such as SAP does."
  - "If SAP already handles availability checks, delivery and invoicing, it usually stays the order owner. The integration writes the status back."
  - "Growth Edition includes Order Management Lite, Advanced the full version; orders from other channels need a standalone Order Management purchase."
  - "According to Salesforce, LWR stores create managed summaries. Set the WebStore field OrderLifeCycleType to unmanaged before the first order is placed."
  - "The extension Commerce_Domain_Checkout_CreateOrder adds the fields SAP needs for the sales order before the order leaves the store."
faq:
  - q: "Do I need Salesforce Order Management for B2B Commerce?"
    a: "Not if SAP runs the order lifecycle. The store then creates unmanaged order summaries, after the WebStore field OrderLifeCycleType has been switched in LWR stores, and the integration keeps them up to date. Order Management makes sense when Salesforce itself should handle allocation, fulfillment, cancellations and returns."
  - q: "What is the difference between managed and unmanaged order summaries?"
    a: "Managed means Salesforce Order Management processes the order and calculates the financial fields itself. Unmanaged means an external system such as SAP processes it, and changes made there have to be written back to Salesforce. The type is set when the order summary is created."
  - q: "Can Salesforce Order Management also handle phone and EDI orders?"
    a: "Yes, but the pricing page says orders taken on other channels or integrated from third-party systems need a standalone Salesforce Order Management purchase when they use its features. Whether that also applies to orders shown only in the order history is a question to settle with Salesforce in writing."
  - q: "Which permission does the integration user need to update orders?"
    a: "According to the developer guide, users with B2B Commerce Integrator User or the Edit Unmanaged Order Summaries permission can export or update unmanaged order summaries. Give that permission to a dedicated integration user, not to a person."
draft: false
---

If SAP already handles availability checks, delivery and invoicing, it should also own the order from the B2B store. That is the case for most manufacturers. The store creates the order and an order summary in Salesforce, sends it to SAP, and SAP creates the sales order, delivers and invoices. Salesforce marks such summaries as unmanaged, and the integration writes status, deliveries and invoices back so buyers see them in the store. Salesforce Order Management, included as Lite in Growth and in full in Advanced, makes sense when Salesforce itself should handle allocation, shipping, cancellations and returns. In a company already running fulfillment in SAP, that means two order systems.

## What happens to an order in B2B Commerce?

When a buyer places an order in a Salesforce B2B store, the store converts the cart into an order and creates an order summary. The order summary is the record buyers see in their order history and the record integrations work with afterwards.

Each order summary carries the field `OrderLifeCycleType`. The [developer guide on managed and unmanaged order summaries](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html) defines it like this:

- **Managed** means an order summary was created by Salesforce Order Management. Salesforce runs the lifecycle.
- **Unmanaged** means an order summary was created by B2B Commerce and has a lifecycle that is "often managed by an external order management system". Changes there "must be reflected in Salesforce".

The [Salesforce Help page on lifecycle types](https://help.salesforce.com/s/articleView?id=commerce.om_order_lifecycle_types.htm&language=en_US&type=5) describes it from the processing side: managed for orders processed only by Order Management, unmanaged for orders processed by an external system. The type is set when the order summary is created.

```hinweis achtung
Which type the checkout process creates depends on the store. According to a [Salesforce knowledge article](https://help.salesforce.com/s/articleView?id=000395308&type=1), LWR stores create managed order summaries. Set the WebStore field `OrderLifeCycleType` to unmanaged before the first real order is placed. Check the value in your store instead of relying on a default.
```

That one field answers the question in the title, at least technically. The organizational answer has to come first.

A note on names: Salesforce now also markets B2B Commerce as "Agentforce Commerce for B2B". The order model is the same.

## What does Salesforce Order Management do?

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/scom-order-management/scom-som-get-started), Order Management covers allocation (which location ships), fulfillment (picking, packing, shipping, invoicing) and servicing (cancellations, discounts, returns, reshipments and exchanges). It gives "a single view of orders, actions taken on orders, and order history". In the Trailhead reference flow, invoices are exported to the ERP through an integration after invoicing.

That is a standalone order fulfillment setup, built with flows and integrations with payment, warehouse and shipping systems. It fits companies that ship from several locations and want to run returns and exchanges in Salesforce, as many retailers do. A machine builder with SAP SD (sales and distribution), warehouse management and invoicing already has all of that in SAP.

## Order Management Lite in Growth, full Order Management in Advanced

The [B2B pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) lists:

| | Growth Edition | Advanced Edition |
|---|---|---|
| Order Management | Order Management Lite | Full Order Management |
| Inventory locations | 20 | 20 |
| Price | Contact for pricing, share of GMV | Contact for pricing, share of GMV |

Two footnotes matter more than the table. Orders "taken on other channels or integrated from any other third-party system" need a standalone Salesforce Order Management purchase. And existing customers with Order Management "will need to renew on Commerce Cloud Advanced".

```hinweis offen
The pricing page does not spell out what Lite leaves out compared to the full version. If Order Management is part of your plan, ask Salesforce for that list before choosing the edition.
```

## Why SAP should usually stay the order owner

I see three reasons in manufacturing.

**Most orders do not come through the store.** Phone, email, EDI and field sales orders are entered in SAP today, and will do so for years. If Salesforce Order Management ran only the store orders, inside sales would work in two systems. Using it for all orders requires the standalone license and a migration of order processes that rarely pays off for a store project.

**Fulfillment is in SAP.** Availability check, delivery, picking, goods issue and invoicing are configured there, often with years of customer-specific logic. Rebuilding that in Salesforce is a program of its own.

**Credit, prices and taxes are in SAP.** The order is only final when SAP has accepted it. My article on [distributor replenishment](/en/blog/distributor-inventory-replenishment-agentforce/) follows the same rule: a request becomes a binding order only once the ERP has accepted it and returned an order number.

So the store is the place where the order starts and where the buyer follows it. SAP is the place where it is processed.

```ablauf
sf: Cart, Order summary, Order history
erp: Sales order, Delivery, Invoice
Cart --> Order summary
Order summary --Order--> Sales order
Sales order --> Delivery
Delivery --> Invoice
Sales order ..Order number..> Order summary
Delivery ..Tracking number..> Order summary
Invoice ..> Order summary
Order summary --> Order history
```

## What comes back from SAP, and when?

The store's order history shows only what SAP writes back. Salesforce offers the buyer a set of [order summary APIs](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-order-summaries-apis.html): order history, a single order summary, delivery groups, items, shipments and shipment items. There is also Add Order to Cart, which copies a past order into the cart for a reorder.

For unmanaged summaries, your integration populates all of that data. Invoices are not part of it: the API list has no endpoint for them, so an invoice number or PDF link needs its own field and its own display in the store. The same goes for any other extra field you write back from SAP. I would write back at least:

- the SAP sales order number, within minutes of the order,
- confirmed delivery dates per line,
- deliveries with tracking numbers,
- invoices or a link to them,
- cancellations and changes made by inside sales in SAP.

Per the developer guide, the integration user needs B2B Commerce Integrator User or the Edit Unmanaged Order Summaries permission. Use a dedicated integration user with a certificate or client credentials. The OAuth username-password flow for connected apps ends on February 20, 2027, as described in [password integrations end in 2027](/en/blog/salesforce-password-integrations-end-2027/).

Dealers who want order status in a chat need the same data. An [agent reading order status from SAP](/en/blog/agentforce-sap-order-status-mulesoft/) and the store's order history should use the same API, so both show the same date.

## Shape the order for SAP with CreateOrder

The extension point **Commerce_Domain_Checkout_CreateOrder** "creates an order from cart information during checkout", according to the [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html). That is where you add fields that SAP needs and that the standard order does not have, such as a sales organization, an order type or a shipping condition. Checks that must run before the order exists, such as credit checks or order blocks, belong in **Commerce_Domain_Checkout_PlaceOrder**, as described in [B2B checkout with purchase order](/en/blog/b2b-checkout-purchase-order-card-invoice/). That extension allows only one external callout and no DML. A synchronous check in SAP also makes checkout depend on SAP being available.

Keep the order lean. Each extra field is a mapping that has to be tested in every Salesforce release.

## Example: a Growth Edition store for dealers

A manufacturer of compressors starts a store on Growth Edition for 180 dealers. Phone and EDI orders stay in SAP. The design could look like this:

1. The store creates unmanaged order summaries, with the WebStore set accordingly. Order Management Lite stays unused at first.
2. The CreateOrder extension adds sales organization and order type.
3. Middleware sends the order to SAP and writes the sales order number back within two minutes.
4. Deliveries and invoices are written back on change, and so are cancellations by inside sales.
5. Buyers see one order history for store orders. Phone orders stay invisible in the store in the first release, and the inside sales team knows this and explains it.

Point five is a real limit. Showing all SAP orders in the store means bringing phone and EDI orders into Salesforce as order summaries too. Whether that falls under the pricing page footnote on orders from other channels is a question to put to Salesforce in writing before you promise dealers a complete history.

## First step: write down who owns the order at each step

Write down who owns the order at each step, from cart to invoice, and what status the buyer sees at each step. Also record which number links the Salesforce order to the SAP sales order, and what happens when SAP rejects an order or is unreachable. Then decide whether Order Management has a role at all. How the order fits into the other data flows is covered in [B2B Commerce and SAP: which data flows where](/en/blog/b2b-commerce-sap-data-flows/), and the [ERP integration chapter of the masterclass](/en/masterclass/b2b-commerce/erp-integration-stock-orders/) puts it into context. An independent review of such designs is part of my work on [Salesforce architecture](/en/services/salesforce-architecture/).
