---
title: "B2B store orders to the ERP: who owns the order?"
description: "Who owns an order from a Salesforce B2B store, Order Management or SAP? Managed and unmanaged order summaries, edition differences and the status flow back."
pubDate: 2026-10-28
lang: en
slug: b2b-store-orders-to-erp
translationKey: commerce-order-to-erp
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: integration
tags: [b2b commerce, order management, sap, order summary, erp integration, order history]
takeaways:
  - "Salesforce marks every order summary with OrderLifeCycleType: managed means Salesforce Order Management runs the lifecycle, unmanaged means an external system such as SAP does."
  - "For most manufacturers SAP stays the order owner: the store sends the order, SAP creates the sales order, and status, deliveries and invoices are written back to the unmanaged summary."
  - "Growth Edition includes Order Management Lite, Advanced full Order Management; orders from other channels need a standalone Order Management purchase."
  - "Buyers see their orders through the order summary APIs in the store, so the data written back from SAP decides what the order history shows."
  - "The extension Commerce_Domain_Checkout_CreateOrder shapes the order before it leaves the store, for example with fields SAP needs for the sales order."
faq:
  - q: "Do I need Salesforce Order Management for B2B Commerce?"
    a: "Not if SAP runs the order lifecycle. The store then creates unmanaged order summaries, and the integration keeps them up to date. Order Management makes sense when Salesforce itself should allocate, fulfil, cancel and return orders."
  - q: "What is the difference between managed and unmanaged order summaries?"
    a: "Managed order summaries are created and run by Salesforce Order Management. Unmanaged ones are created by B2B Commerce when an external system manages the lifecycle; changes made there have to be written back to Salesforce."
  - q: "Can Salesforce Order Management also handle phone and EDI orders?"
    a: "Yes, but the pricing page says orders taken on other channels or integrated from third-party systems need Salesforce Order Management bought standalone. The Order Management included in the Commerce editions covers storefront orders."
  - q: "Which permission does the integration user need to update orders?"
    a: "According to the developer guide, users with B2B Commerce Integrator User or Edit Unmanaged Order Summaries can export or update unmanaged order summaries. Give that permission to a dedicated integration user, not to a person."
draft: false
---

For most manufacturers SAP should own an order from the B2B store. The store creates the order and an order summary in Salesforce, sends it to SAP, and SAP creates the sales order, delivers and invoices. Salesforce marks such summaries as unmanaged, and the integration writes status, deliveries and invoices back so buyers see them in the store. Salesforce Order Management, included as Lite in Growth and in full in Advanced, makes sense when Salesforce itself should allocate, ship, cancel and return. In a company that already runs order fulfilment in SAP, that would mean two order systems.

## What happens to an order in B2B Commerce?

When a buyer places an order in a Salesforce B2B store, the store converts the cart into an order and creates an order summary. The order summary is the record buyers see in their order history, and the one integrations work with afterwards.

Each order summary carries the field `OrderLifeCycleType`. The [developer guide on managed and unmanaged order summaries](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html) defines it like this:

- **Managed** identifies an order summary created by Salesforce Order Management. Salesforce runs the lifecycle.
- **Unmanaged** identifies an order summary created by B2B Commerce whose lifecycle is "often managed by an external order management system". Changes there "must be reflected in Salesforce".

That one field answers the question in the title, at least technically. The organisational answer has to come first.

A note on names: Salesforce now also markets B2B Commerce as "Agentforce Commerce for B2B". The order model is the same.

## What does Salesforce Order Management do?

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/scom-order-management/scom-som-get-started), Order Management covers allocation (which location ships), fulfilment (picking, packing, shipping, invoicing) and servicing (cancellations, discounts, returns, reshipments and exchanges). It gives "a single view of orders, actions taken on orders, and order history". After invoicing, it exports invoices to the ERP.

That is a full order management system. It fits companies that ship from several locations and want to run returns and exchanges in Salesforce, as many retailers do. A machine builder with SAP SD (sales and distribution), warehouse management and invoicing already has all of that in SAP.

## Which edition includes what?

The [B2B pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) lists:

| | Growth Edition | Advanced Edition |
|---|---|---|
| Order Management | Order Management Lite | Full Order Management |
| Inventory locations | 20 | 20 |
| Price | Contact for pricing, share of GMV | Contact for pricing, share of GMV |

Two footnotes matter more than the table. Orders "taken on other channels or integrated from any other third-party system" need Salesforce Order Management bought standalone. And existing customers with Order Management "will need to renew on Commerce Cloud Advanced".

```hinweis offen
The pricing page does not spell out what Lite leaves out compared to the full version. If Order Management is part of your plan, ask Salesforce for that list before choosing the edition.
```

## Why SAP should usually stay the order owner

I see three reasons in manufacturing.

**Most orders do not come through the store.** Phone, email, EDI and field sales orders land in SAP today, and they will for years. If Salesforce Order Management ran only the store orders, inside sales would work in two systems. Making it run all orders needs the standalone licence and a migration of order processes that rarely pays off for a store project.

**Fulfilment is in SAP.** Availability check, delivery, picking, goods issue and invoicing are configured there, often with years of customer-specific logic. Rebuilding that in Salesforce is a programme of its own.

**Credit, prices and taxes are in SAP.** The order is only final when SAP has accepted it. My article on [distributor replenishment](../distributor-inventory-replenishment-agentforce/) follows the same rule: a request becomes a binding order only once the ERP has accepted it and returned an order number.

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

The store's order history is only as good as the data written back. Salesforce offers the buyer a set of [order summary APIs](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-d2c-comm-order-summaries-apis.html): order history, a single order summary, delivery groups, items, shipments and shipment items. There is also Add Order to Cart, which copies a past order into the cart for a reorder.

For unmanaged summaries all of that is filled by your integration. I would write back at least:

- the SAP sales order number, within minutes of the order,
- confirmed delivery dates per line,
- deliveries with tracking numbers,
- invoices or a link to them,
- cancellations and changes made by inside sales in SAP.

The integration user needs the permission B2B Commerce Integrator User or Edit Unmanaged Order Summaries, per the developer guide. Use a dedicated integration user with a certificate or client credentials. Password logins for connected apps end on 20 February 2027, as described in [password integrations end in 2027](../salesforce-password-integrations-end-2027/).

Dealers who want status in a chat need the same data. An [agent reading order status from SAP](../agentforce-sap-order-status-mulesoft/) and the store's order history should use the same API, so both show the same date.

## How do I shape the order for SAP?

The extension point **Commerce_Domain_Checkout_CreateOrder** "creates an order from cart information during checkout", according to the [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html). That is where you add what SAP needs and the standard order does not have, such as a sales organisation, an order type or a shipping condition. The check before the order exists, credit or order block, belongs in **Commerce_Domain_Checkout_PlaceOrder**, as described in [B2B checkout with purchase order](../b2b-checkout-purchase-order-card-invoice/).

Keep the order lean. Each extra field is a mapping that has to be tested in every Salesforce release.

## A typical scenario, as an assumption

A manufacturer of compressors starts a store on Growth Edition for 180 dealers. Phone and EDI orders stay in SAP. The design could look like this:

1. The store creates unmanaged order summaries. Order Management Lite stays unused at first.
2. The CreateOrder extension adds sales organisation and order type.
3. Middleware sends the order to SAP and writes the sales order number back within two minutes.
4. Deliveries and invoices are written back on change; cancellations by inside sales too.
5. Buyers see one order history for store orders. Phone orders stay invisible in the store in the first release, which inside sales knows and explains.

Point five is a real limit. Showing all SAP orders in the store means bringing phone and EDI orders into Salesforce as order summaries too. Whether that touches the pricing page footnote on orders from other channels is a question to put to Salesforce in writing before you promise dealers a complete history.

## Where should you start?

Write down who owns the order at each step, from cart to invoice, and which status the buyer sees at each step. Then decide whether Order Management has a role at all. How the order fits into the other data flows is covered in [B2B Commerce and SAP: which data flows where](../b2b-commerce-sap-data-flows/), and the [ERP integration chapter of the masterclass](../../masterclass/b2b-commerce/erp-integration-stock-orders/) puts it into context. An independent review of such designs is part of my work on [Salesforce architecture](../../services/salesforce-architecture/).

The store takes the order and SAP processes it, as long as the status comes back reliably; if you are deciding who owns your orders, [send me a message](#contact).
