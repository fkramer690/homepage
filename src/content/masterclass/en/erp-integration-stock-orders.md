---
title: "B2B Commerce and the ERP: stock, prices and orders"
description: "How a Salesforce B2B store works with SAP: data flows, Commerce extensions, live or copied stock, who owns the order, and when headless makes sense."
lang: en
slug: erp-integration-stock-orders
course: b2b-commerce
translationKey: commerce-04
chapter: 4
pubDate: 2026-10-28
short: "ERP integration"
summary: "Which data flows between store and ERP, what is called live and who owns the order."
takeaways:
  - "B2B Commerce holds the buying experience and a copy of what the store needs. The ERP owns prices, stock, credit and the order."
  - "Decide per data item whether it is copied into Salesforce or called live: copy what changes rarely, call live where a wrong value costs money or trust."
  - "Live calls run through Commerce extensions for price and stock. Salesforce has recommended them over the older checkout integrations since Winter '24."
  - "Store orders become unmanaged order summaries, SAP fulfils them, and the integration writes back order number, dates, deliveries and invoices."
  - "Every integration that still logs in to Salesforce with the OAuth username-password flow must be switched before 20 February 2027."
articles: [commerce-sap-data-flows, commerce-stock-availability-erp, commerce-order-to-erp, commerce-extensions-custom-code, commerce-headless-b2b, agentforce-sap-order-status, legacy-erp-without-api-agents, salesforce-password-integrations-2027]
faq:
  - q: "Is there a ready-made connector between Salesforce B2B Commerce and SAP?"
    a: "No, B2B Commerce does not include one. The MuleSoft Accelerator for SAP brings API templates, including a quote-to-cash use case between Sales Cloud and S/4HANA. You build the store side with Commerce extensions and the import and order summary APIs."
  - q: "Do I need Salesforce Order Management for a B2B store?"
    a: "Not if SAP fulfils the order. The store then creates unmanaged order summaries and the integration keeps them current. Order Management pays off when Salesforce itself should allocate, ship, cancel and handle returns."
  - q: "Where does B2B Commerce take stock and prices from by default?"
    a: "According to the extensions documentation, stock comes from Omnichannel Inventory and prices from Salesforce price books. Shipping is free without an extension. Each of these sources can be replaced by an ERP call through an extension."
  - q: "Can I customise payments with a Commerce extension?"
    a: "No. Salesforce states that payments currently cannot be customised with an extension. Payment gateways still use the payment integration. In manufacturing, though, dealers mostly buy on account with a purchase order number."
  - q: "Is a headless B2B store worth it for a manufacturer?"
    a: "Only if buyers already use a website or customer app and a team will run it for years. For a first store, an LWR store is cheaper because Salesforce hosts and scales it."
draft: false
---

In a B2B store on Salesforce, the ERP stays master for prices, stock, credit and the order. Salesforce B2B Commerce holds the buying experience and a copy of what the store needs for it. The real work is one decision per data item: copy or call live. Master data comes in by batch, the store asks the ERP live for price, availability and credit through Commerce extensions, the order goes to SAP, and status, delivery and invoice come back. Write the object ownership matrix and the interface list before anyone designs store pages. Every password login of an integration must be replaced before 20 February 2027.

## Which data flows between the store and the ERP?

[Chapter 3](../prices-cart-checkout/) covered what the buyer sees and pays in the cart. This chapter is about where those values come from. Salesforce now also markets the product as [Agentforce Commerce for B2B](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-guided-shopping-for-b2b-and-d2c/increase-revenue-with-agentforce-for-guided-shopping); the name changes nothing in the integration architecture.

Every interface discussion I lead starts with the same map of four blocks:

| Data | Direction | When |
|---|---|---|
| Customer master, buyers, products, categories, price books, buyer groups | ERP to Salesforce | Batch, nightly or on change |
| Price, availability, credit, tax, freight | Store asks the ERP | Live, in cart and checkout |
| Order with PO number, ship-to address, requested date | Salesforce to ERP | On submit |
| Order number, confirmed dates, delivery, invoice | ERP to Salesforce | On change |

The table looks simple. The decisions sit in two questions per row: which system writes, and how old may the data in the store be? The detailed version, with the product import API and how to derive buyer groups from SAP, is in [B2B Commerce and SAP: which data flows where?](../../../blog/b2b-commerce-sap-data-flows/).

Buyer groups and entitlement policies almost never exist as such in the ERP. They are derived from sales organisation, customer group or brand, as described in [chapter 2](../catalog-search-entitlements/). Write that derivation down as a rule. Otherwise someone maintains the groups by hand and the store drifts away from the ERP.

## Copy or call live: the rule

My rule: copy what changes less often than a dealer clicks, and call live where a wrong value costs money or trust. The trade-off is the same for prices and stock:

- **Copy:** fast, and the store keeps working when the ERP is down, but the data is as old as the last update.
- **Live call:** exact, but every call costs the dealer waiting time and the ERP load, and you need an answer to what the store does when the ERP does not respond.

Contract prices from SAP condition logic and the credit check usually belong in the live group; list prices, dealer tiers and product data in the copy. For every live call, write down a fallback rule before the first line of code. An ERP without a usable API changes the calculation: often only a read-only replica behind a small API is left, as I describe in [Legacy ERP without an API](../../../blog/legacy-erp-without-api-ai-agents/). For a store I would only read through it, never enter orders through screens.

## Commerce extensions call the ERP live

Commerce extensions are Apex classes that Salesforce runs at named extension points. The [list of available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html) names the points that matter for an ERP integration and their defaults:

| Need | Extension point | Default without extension |
|---|---|---|
| Customer price | `Commerce_Domain_Pricing_Service` | Salesforce price books |
| Stock | `Commerce_Domain_Inventory_Service` | Omnichannel Inventory |
| Tax | `Commerce_Domain_Tax_CartCalculator` | Salesforce tax service |
| Freight | `Commerce_Domain_Shipping_CartCalculator` | no shipping charge |
| Credit, delivery block | `Commerce_Domain_Checkout_PlaceOrder`, method `validate` | standard cart validations |
| Shape the order | `Commerce_Domain_Checkout_CreateOrder` | order created from the cart |

According to the [integration architecture page](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-integration-architecture.html), extensions for pricing, inventory, shipping and tax have existed since Winter '24, and Salesforce recommends them over the older checkout integrations framework, which remains supported. Payments cannot be customised with an extension, according to the [extensions guide](https://developer.salesforce.com/docs/commerce/extensions/guide/extensions.html).

```vertiefung For developers
title: Keeping extensions maintainable: `super()` and registration in the repository
Two points from the same guide decide how maintainable this is. Salesforce strongly recommends calling `super()` in domain extensions, so your code adds to the default and later releases still reach you. And registering and mapping a class to the store is easiest with the Salesforce CLI and its Commerce plug-in, or through the `RegisteredExternalService` and `StoreIntegratedService` objects. That means code, registration and mapping can live in the client's repository and pipeline. How to review partner code against this is in [Commerce extensions: custom code that survives updates](../../../blog/commerce-extensions-custom-code/); how store configuration moves through environments is in the DevOps masterclass chapter [Data and configuration](../../devops-release-management/data-and-configuration/).
```

My rule for existing stores: new logic goes into extensions, working old integrations stay until the code has to change anyway.

## Stock: a copy in Omnichannel Inventory or a live check in SAP?

By default the store reads stock from Omnichannel Inventory. [Trailhead](https://trailhead.salesforce.com/content/learn/modules/omnichannel-inventory/get-started-with-omnichannel-inventory) describes the service as near real-time availability at location level and also says it does not replace the inventory system of record, nor the ERP. So SAP has to fill the copy. The [B2B pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) lists 20 inventory locations for both Growth and Advanced. A manufacturer with many plants and regional warehouses should clarify before signing how Salesforce counts locations.

The alternative is the inventory extension calling the availability check in SAP. It returns a confirmed date that a stock copy never knows, because SAP can, depending on customising, also consider planned receipts and existing requirements. I would not rebuild that logic in Salesforce.

My recommendation is a mix: product list and product page read the copy and show "available" or "on request", and checkout asks SAP live for the date. Dealers rarely need exact quantities. Details and a comparison table are in [Stock in the B2B store: live from the ERP or copied?](../../../blog/b2b-store-stock-availability-erp/). An agent telling dealers their order status follows the same rule and passes on only the confirmed date from SAP, as described in [Agentforce and SAP: order status through MuleSoft](../../../blog/agentforce-sap-order-status-mulesoft/).

## Who owns the order?

When a buyer submits an order, B2B Commerce creates an order and an order summary. The field `OrderLifeCycleType` separates two cases according to the [developer guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-import-export-managed-unmanaged.html): managed, created by Salesforce Order Management, and unmanaged, created by the store. Users with the B2B Commerce Integrator User or Edit Unmanaged Order Summaries permission can update unmanaged summaries. Give that permission to a dedicated integration user, not a person.

The editions differ clearly here. Growth includes Order Management Lite, Advanced full Order Management. According to the pricing page, orders from other channels or third-party systems need a separately purchased Order Management, and existing customers with Order Management renew on Advanced.

```hinweis offen
The pricing page does not list what Order Management Lite in Growth leaves out. Get that in writing before you choose an edition.
```

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/scom-order-management/scom-som-get-started), Order Management covers allocation, fulfilment and servicing with cancellations, returns and exchanges, and exports invoices to the ERP. A machine builder with SAP SD, warehouse management and billing already has all of that. On top come phone, email and EDI orders that keep landing in SAP. That is why for most manufacturers SAP should stay the order owner: the store takes the order, SAP fulfils it, and the integration writes back order number, dates, deliveries and invoices. The reasoning and what the return path must carry at minimum are in [B2B store orders to the ERP: who owns the order?](../../../blog/b2b-store-orders-to-erp/).

```ablauf
sf: Checkout, Order summary
erp: SAP order, Delivery, Invoice
Checkout --unmanaged--> Order summary
Checkout --order to SAP--> SAP order
SAP order --> Delivery
SAP order --> Invoice
SAP order ..number, dates..> Order summary
Delivery ..written back..> Order summary
Invoice ..written back..> Order summary
```

Plan the way back as carefully as the way out. A dealer who sees "order received" for three days calls inside sales.

## Middleware or direct callouts?

For a store with two or three live calls and one order export, direct Apex callouts with named credentials are enough. Middleware pays off when the same SAP data also feeds service, Field Service and agents. Then one order status API serves the store, the agent and inside sales, and all show the same date. Why agents should reuse existing APIs is covered in the AI masterclass chapter [MCP and interfaces](../../ai-salesforce/mcp-and-interfaces/).

The [MuleSoft Accelerator for SAP](https://anypoint.mulesoft.com/exchange/org.mule.examples/mulesoft-accelerator-for-sap/) contains a quote-to-cash use case that syncs order, inventory and customer data between Sales Cloud and S/4HANA, and one for B2B EDI. These are API templates to start from. A finished integration for a B2B Commerce store they are not.

```hinweis achtung
One deadline applies to every batch integration. Salesforce retires the [OAuth username-password flow](https://help.salesforce.com/s/articleView?id=release-notes.rn_security_unpw_flow_retirement.htm&language=en_US&release=262&type=5) for connected apps on 20 February 2027. A nightly product import that logs in with a password stops working, often without anyone noticing right away. How to find and switch these integrations is in [Password integrations end in 2027](../../../blog/salesforce-password-integrations-end-2027/).
```

## When does a headless store pay off?

Headless means your own website or app is the store, and Salesforce delivers catalogue, prices, cart, checkout and orders through the Commerce Connect REST APIs. The [Commerce innovations page](https://www.salesforce.com/ca/commerce/innovations/) lists Headless B2B Commerce as available today, with a React B2B Storefront Blueprint. The [developer guide](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-comm-headless-journey-overview.html) points to a reference app in the GitHub repository `commerce-b2b-headless`.

For the ERP integration this means: extensions are triggered by Connect API calls, so the same price and stock logic applies in the LWR store and in your app. The costs sit in the frontend. Hosting, login, pipeline and regression tests against every Salesforce release are yours. I would only recommend headless when a website or customer app that buyers use already exists and a team will run it for years. I did not find in the documentation which licence headless buyers need; get that confirmed in writing. More in [Headless B2B Commerce: own frontend, Salesforce core](../../../blog/headless-b2b-commerce-own-frontend/).

## Worked example: an interface list for 250 dealers

A machine builder with SAP S/4HANA plans a store on Growth Edition for 250 dealers and 15,000 spare parts. Phone and EDI orders stay in SAP. The interface list after the first workshop could look like this:

1. Customer master to accounts and buyer accounts, nightly.
2. Materials and product hierarchy to products and categories, nightly.
3. List and tier prices into price books, nightly; contract prices of the 40 largest dealers live through the pricing extension.
4. Stock status every 15 minutes into Omnichannel Inventory, confirmed date live in checkout.
5. Credit and delivery block live in `validate`.
6. Order to SAP, order number back within minutes, deliveries and invoices on change, as unmanaged order summaries.

Six interfaces, three of them live, all through an integration user with a certificate instead of a password. If SAP does not answer in time during checkout, the store accepts the order with "date to follow". Every interface gets an owner on the client side.

## Write the ownership matrix and the interface list before the store design

Write two documents before anyone designs store pages. One is an [object ownership matrix](../../../blog/salesforce-object-ownership-matrix/) with one extra column: copied or live. The other is an interface list with master system, maximum data age, fallback rule and login method per interface. With these two pages you can compare any partner proposal. [Chapter 5](../agentforce-migration-rollout/) then covers agents that build on the same interfaces and the rollout to dealers. An independent review of such designs is part of my work in [Salesforce integration](../../../services/salesforce-integration/) and [Salesforce architecture](../../../services/salesforce-architecture/).
