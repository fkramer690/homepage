---
title: "Stock in the B2B store: live from the ERP or copied?"
description: "Should a Salesforce B2B store show stock copied from SAP or ask the ERP live? Omnichannel Inventory, the inventory extension and what dealers should see."
pubDate: 2026-10-28
lang: en
slug: b2b-store-stock-availability-erp
translationKey: commerce-stock-availability-erp
topic: commerce
categories: [b2b-commerce, architecture]
contactBrief: integration
tags: [b2b commerce, inventory, sap, available to promise, omnichannel inventory, erp integration]
takeaways:
  - "By default the store reads stock from Omnichannel Inventory. The extension Commerce_Domain_Inventory_Service replaces it, for example with a live ERP call."
  - "Omnichannel Inventory holds a near real-time copy per location, but Salesforce says it does not replace the inventory system of record. The ERP stays master."
  - "A copy is fast and keeps the store running when SAP is down. Live is exact and returns a confirmed date, but SAP has to answer within the checkout."
  - "Dealers need a usable signal more than an exact quantity: in stock, on request, or a confirmed date. That also protects stock levels from competitors."
  - "Both B2B editions include 20 inventory locations. Unified Omnichannel Inventory from Winter '27 is described for store and online stock and does not mention B2B."
faq:
  - q: "Where does Salesforce B2B Commerce get stock data from?"
    a: "By default from Omnichannel Inventory, a Salesforce service that holds availability per location and location group. With the inventory extension, the store can ask another source instead, for example SAP live."
  - q: "Is Omnichannel Inventory the system of record for stock?"
    a: "No. Salesforce states that Omnichannel Inventory does not replace the inventory system of record, the ERP or the warehouse system. It holds a copy that the ERP has to keep up to date through import or update APIs."
  - q: "Should a B2B store show exact stock quantities?"
    a: "Usually not. Dealers need to know whether a part ships now, on request or on a confirmed date. Exact quantities invite questions about reserved stock and tell competitors more than they should know."
  - q: "How many inventory locations are included in B2B Commerce?"
    a: "The pricing page lists 20 inventory locations for both Growth and Advanced Edition. If you plan more warehouses or plants, clarify with Salesforce how locations are counted before signing."
draft: false
---

A Salesforce B2B store should show a copy of the stock for browsing and ask the ERP live only where a promise is made, at checkout. Out of the box, B2B Commerce reads stock from Omnichannel Inventory, a Salesforce service that SAP has to feed. With the inventory extension, the store can instead ask SAP's availability check, which returns a confirmed date but costs waiting time and load. Dealers rarely need exact quantities. They need to know whether a part ships now, on request or on a confirmed date. SAP stays the master for stock either way.

## Where does the store get stock from?

Salesforce B2B Commerce calculates stock through two extension points, listed in the [available extensions](https://developer.salesforce.com/docs/commerce/extensions/guide/available-extensions.html):

- **Commerce_Domain_Inventory_Service** reserves and tracks available inventory. The documentation says: "By default, this extension uses the Omnichannel Inventory (OCI) system for inventory data."
- **Commerce_Domain_Inventory_CartCalculator** calculates inventory for cart and checkout using that service.

So there are two paths. Either SAP feeds Omnichannel Inventory and the store uses the standard. Or your own Apex class replaces the inventory service and asks SAP or a middleware directly.

A note on names: Salesforce now also markets B2B Commerce as "Agentforce Commerce for B2B". The inventory logic is the same.

## What is Omnichannel Inventory, and what is it not?

[Trailhead](https://trailhead.salesforce.com/content/learn/modules/omnichannel-inventory/get-started-with-omnichannel-inventory) describes Omnichannel Inventory as a service with "near real-time inventory availability at the location level". It knows locations such as warehouses and plants, and location groups that aggregate several locations. A location group can be tied to a storefront. Reservations reduce the available-to-sell quantity as soon as a buyer orders.

The same page also says what it is not: it "does not replace the inventory system of record", and it does not replace the ERP, warehouse or supply chain system. For a manufacturer that means SAP keeps the stock, and Omnichannel Inventory holds a copy.

The copy gets in through APIs. According to the [Omnichannel Inventory API unit](https://trailhead.salesforce.com/content/learn/modules/omnichannel-inventory/explore-omnichannel-inventory-apis), you upload inventory files for larger volumes and send real-time count updates from an external system. Locations and location groups must exist before the first import.

The [B2B pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/) lists 20 inventory locations for both Growth and Advanced Edition. For most spare parts businesses that is enough. A manufacturer with many plants and regional warehouses should clarify before signing how Salesforce counts locations.

## Copied or live: the trade-off in one table

This is the same decision as for prices, with different numbers. I put it in a table for the steering committee:

| | Copy in Omnichannel Inventory | Live call to SAP |
|---|---|---|
| Speed in the store | Fast, no call to SAP | Every check waits for SAP |
| Accuracy | As old as the last update | Current at the moment of the call |
| SAP down | Store keeps showing stock | Store needs a fallback |
| Load on SAP | Batch and delta updates | One call per product list, cart or checkout |
| Confirmed date | No, only quantities | Yes, from the availability check |
| Build effort | Feed the copy, map locations | Inventory extension, error handling |

The row that usually decides it is the confirmed date. SAP's availability check, often called ATP (available to promise), does more than read a stock figure. According to [SAP's learning material](https://learning.sap.com/courses/performing-the-availability-check/acquiring-a-basic-understanding-of-available-to-promise-atp-_ae470c8e-1483-46ce-b5cc-e80647e8a32b), it considers stock and, depending on configuration, planned receipts and existing requirements. If the requested date cannot be met, it proposes the next possible date. A copy of the stock figure in Salesforce knows none of this.

For that reason I would not rebuild ATP logic in Salesforce. Whoever tries ends up maintaining a second availability check that is always slightly wrong.

## What should dealers actually see?

Most dealers do not need "37 pieces in plant 1200". They need an answer to one question: when will I have the part?

I suggest three states in the product list and on the product page:

- **In stock**, when the copy shows enough stock at the relevant location group.
- **On request**, when the part is made to order or the copy shows nothing.
- **Delivery date**, at checkout, from the live availability check in SAP.

```ablauf
erp: Stock in SAP, SAP availability
sf: Copy in OCI, Product list, Checkout
Stock in SAP --updates--> Copy in OCI
Copy in OCI --stock state--> Product list
Product list --> Checkout
Checkout --extension--> SAP availability
SAP availability ..date..> Checkout
```

That has three advantages. The product list stays fast, because it only reads the copy. The one moment where the store makes a promise, the order, uses the exact value. And exact quantities stay internal, which matters when resellers or competitors have store access.

The same logic applies to agents. My article on [order status from SAP](../agentforce-sap-order-status-mulesoft/) makes the point that an agent passes on the confirmed date from SAP and never estimates one from stock figures. A store should do the same.

## Worked example: 12,000 spare parts in three warehouses

A manufacturer of pumps sells 12,000 spare parts to 250 dealers. Stock sits in SAP in three warehouses. The architecture could look like this:

1. SAP sends stock changes every 15 minutes to Omnichannel Inventory, with a full upload at night.
2. The three warehouses are locations, grouped into one location group for the European store.
3. The product list shows "in stock" or "on request" from the copy.
4. At checkout, the inventory extension calls the SAP availability check through middleware for the cart lines and shows the confirmed date per line.
5. If SAP does not answer within a set time, the store accepts the order with "date follows" and SAP confirms it later.

```hinweis achtung
The fifth point is the one teams forget. Write the fallback down before the first line of code.
```

## How does this fit with Field Service and distributors?

The stock the store shows is often the same stock Field Service technicians draw from. In my article on [Field Service spare parts](../salesforce-field-service-spare-parts-erp/) the ERP owns stock including the service van, and Salesforce works with a copy. The store adds a second consumer of the same data. If both read different copies with different update cycles, a technician and a dealer see different numbers for the same part.

Distributor stock is a separate topic again. Stock held at the distributor, and replenishment proposals for it, are covered in [Agentforce for distributor stock](../distributor-inventory-replenishment-agentforce/). The store only shows the manufacturer's own stock.

## Check Unified Omnichannel Inventory from Winter '27 against B2B first

The [Winter '27 highlights on Trailhead](https://trailhead.salesforce.com/content/learn/modules/winter-27-release-highlights/see-whats-new-marketing-commerce-revenue-management) list Unified Omnichannel Inventory: store and digital inventory in one real-time record, aimed at removing "ghost stock" and enabling pick-up in store. The description does not mention B2B. For a manufacturer with plants and warehouses rather than shops, I would check in a sandbox whether it changes anything before planning with it.

## First step: decide the stock source per screen

Decide per screen which stock source applies: product list, product page, cart, checkout. Then define the three states for dealers, the update cycle of the copy and the fallback when SAP does not answer. How stock fits into the full interface list is described in [B2B Commerce and SAP: which data flows where](../b2b-commerce-sap-data-flows/), and the [ERP integration chapter of the masterclass](../../masterclass/b2b-commerce/erp-integration-stock-orders/) puts it into context. Reviewing such interfaces independently is part of my work on [Salesforce integration](../../services/salesforce-integration/).
