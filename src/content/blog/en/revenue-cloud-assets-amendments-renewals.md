---
title: "Assets in Revenue Cloud: amendments and renewals"
description: "How Revenue Cloud keeps sold products as assets, how amendments, renewals and cancellations work, and how this fits with Field Service machine assets."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: revenue-cloud-assets-amendments-renewals
translationKey: revenue-cloud-installed-base-assets
topic: revenue
categories: [revenue-cloud, field-service]
tags: [Revenue Cloud, assets, amendments, renewals, installed base, Field Service]
takeaways:
  - "An amendment quote shows the start quantity, the change as a positive or negative delta and the end quantity, for example 5 plus 8 equals 13."
  - "Asset state periods record quantity, amount and monthly recurring revenue per time span. They are system-maintained history, not master data for interfaces."
  - "A cancellation sets the quantity to the negative of the total, so the end quantity is zero."
  - "Field Service uses the same Asset object to represent the machine. Decide early whether subscriptions and machines share records and how they are linked."
faq:
  - q: "What is a lifecycle-managed asset in Salesforce?"
    a: "An asset with the Lifecycle-managed asset flag set. Salesforce records each change to the asset as an asset action and stores its quantity, amount and monthly recurring revenue for each time span in asset state periods."
  - q: "How do I change a subscription in Revenue Cloud?"
    a: "You amend the asset. In the standard flow, Revenue Cloud creates an amendment quote with the change as a delta, you create an order from it and activate the order, and the asset receives a new asset action and a new state period. The flow can also be configured to create an order directly, and the asset lifecycle APIs can change assets without a quote."
  - q: "Which renewal options does Revenue Cloud offer?"
    a: "Automatic Renewal extends the subscription at the end of the term with the asset's predefined renewal term. Override Renewal Term sets custom start and end dates and creates a quote or order with a credit for the unused part of the current subscription. Whether that credit becomes a credit memo or an offset on the next invoice depends on billing."
  - q: "Can Revenue Cloud and Field Service use the same assets?"
    a: "Both use the standard Asset object. Revenue Cloud tracks what was sold, including quantity and recurring revenue; Field Service tracks the installed machine, including serial number and hierarchy. Technically, one record can contain both sets of fields. I only use one shared record when every machine is sold as its own line with quantity one."
  - q: "Can assets migrated from SAP be amended in Revenue Cloud?"
    a: "Not if only asset records are loaded. Amendments, renewals and cancellations need the lifecycle history of asset actions and asset state periods. Create that history with the asset lifecycle APIs or by turning historical orders into assets in the right order, and test an amendment on migrated assets before go-live."
draft: false
---

For products set up to create assets, Revenue Cloud turns what a customer bought into an asset under the account once the order is processed, usually on activation. In the standard flow, every later amendment, renewal or cancellation is processed through a new quote and order for that asset. Salesforce records each change as an asset action and stores quantity, amount and monthly recurring revenue for each time span in asset state periods. Field Service uses the same Asset object for the installed machine. For most machine builders I recommend two kinds of asset records, one for what was sold and one for the physical machine, with a defined link.

## How do assets come into being in Revenue Cloud?

"An asset in Salesforce represents a specific purchased or installed product", as [Trailhead on customer assets](https://trailhead.salesforce.com/modules/field_service_maint/units/field_service_maint_assets) puts it. Revenue Cloud, which Salesforce Help and Trailhead now also call Agentforce Revenue Management, creates these records from orders for products that are set up to create assets; an automation such as a record-triggered flow does the work. According to [Trailhead on asset amendments](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments), activating the order fulfills it, and the assets appear under the customer account in the Managed Assets section. If the order runs through Dynamic Revenue Orchestrator first, the Trailhead exercise has you check the assets once the orchestration steps are complete. How that works is covered in [handing orders to SAP with DRO](/en/blog/revenue-cloud-order-orchestration-sap/).

These are lifecycle-managed assets. In addition to classic fields such as serial number, parent asset and root asset, the Asset object has a Lifecycle-managed asset flag, a current quantity and a current monthly recurring revenue, as listed in the [Salesforce field reference](https://developer.salesforce.com/docs/atlas.en-us.226.0.sfFieldRef.meta/sfFieldRef/salesforce_field_reference_Asset.htm). Two related objects hold the history:

- **Asset action:** according to the [object reference](https://developer.salesforce.com/docs/atlas.en-us.264.0.object_reference.meta/object_reference/sforce_api_objects_assetaction.htm), it represents a change made to a lifecycle-managed asset. Trailhead shows business categories such as Upsells, Renewals and Cancellations.
- **Asset state period:** according to the [object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetstateperiod.htm), this is a time span in which an asset has the same quantity, amount and monthly recurring revenue. Amendments and renewals add a new period.

The fields of both objects cannot be edited directly, so treat them as system-maintained history. The history is built from quotes and orders, or from the [asset lifecycle APIs](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/features_asset_lifecycle_use_cases.htm). The same applies to a migration: assets loaded from SAP without asset actions and state periods cannot be amended or renewed reliably. Build their history through the asset lifecycle APIs or from historical orders, in chronological order.

```hinweis achtung
An interface from SAP should not overwrite quantities on lifecycle-managed assets as if they were ordinary master data. A change in quantity is a commercial change and should be captured in a quote and an order, or in a call to the asset lifecycle APIs, so asset actions and state periods stay consistent.
```

## How does an amendment work?

In the standard flow, an amendment starts as a quote that becomes an order. Trailhead's example: a customer has five licenses and needs eight more. The rep selects the asset, clicks Amend and sets an amendment date, the day the change takes effect. Revenue Cloud creates an amendment quote with three quantities:

```kennzahlen
5 | Start quantity: what the customer has today
+8 | Quantity: the delta, a negative number such as -3 to reduce
13 | End quantity: the result
source: Trailhead, Manage Customer Asset Amendments (Asset Lifecycle Management with Revenue Cloud)
```

From the quote the rep creates an order and activates it. The asset receives a new asset action with the business category Upsells and a new state period with the higher quantity from the amendment date onwards.

For a manufacturer this means: a customer who adds remote monitoring for three more machines receives a quote and an order, just like in a new sale. That takes more effort than editing a number, and it is why the history stays correct. The amendment quote can reuse your pricing and approval rules, as long as your pricing procedures and approval rules cover amendment transactions.

## Renewals extend the term, cancellations set the quantity to zero

[Trailhead on renewals and cancellations](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-renewals-and-cancellations) describes two renewal options:

- **Automatic Renewal** extends the subscription at the end of the current term with the asset's predefined renewal term.
- **Override Renewal Term** sets your own start and end dates. It replaces the existing renewal term and creates a quote or order with a credit for the unused part of the current subscription. Whether that credit becomes a credit memo, an offset on the next invoice or a refund depends on your billing process.

In Trailhead's example, setting the renewal term creates a renewal quote. The rep creates an order from it and activates it, and the asset receives an asset action with the category Renewals and a new period with the new dates.

A cancellation starts with a cancellation date. In the cancellation quote, Revenue Cloud sets the quantity to the negative of the asset's total quantity, so the end quantity becomes zero. After the order is activated, the asset receives an asset action with the category Cancellations. Unlike amendments and renewals, a cancellation creates no new state period; the dashboard shows the last day of the current one.

Decide early who triggers renewals. Automatic renewal suits fixed-term service contracts that renew on the same terms. A contract without an end date is better modeled as an evergreen subscription, which needs no renewal transaction. Overriding the term suits renewals that are renegotiated in any case, for example with a new price. Whether sales, inside service or a quoting agent prepares the renewal quote is a process decision you should write down before go-live.

## How do Revenue Cloud assets fit with Field Service?

Field Service uses the same Asset object. There, the asset is the machine at the customer site, with a serial number, an assembly hierarchy represented through the Parent Asset field, linked work orders and maintenance plans. The data Field Service needs is described in [Field Service master data](/en/blog/salesforce-field-service-master-data/), and how service contracts and maintenance plans are linked to assets is described in [modeling maintenance contracts](/en/blog/salesforce-field-service-maintenance-contracts/).

The two views count differently. Revenue Cloud counts quantities: Trailhead's five licenses are one asset with quantity 5. Field Service needs one record per serial number, because a technician repairs one machine. Two models are possible:

| | One record per machine | Separate records, linked |
|---|---|---|
| Idea | The asset from the order is also the machine asset | Sold asset from Revenue Cloud, machine asset from SAP or commissioning |
| Works when | Every machine is sold as its own line with quantity 1 | Quantities above 1, subscriptions across several machines |
| Serial number | Added to the sold asset after delivery | On the machine asset, from SAP |
| Risk | A line with quantity 3 cannot become three machines | The link has to be maintained |

For most machine builders I recommend the second model. The sold asset answers "what the customer pays for"; the machine asset answers "what is installed where". Link them with a defined relationship and agree who owns which record. A lookup is enough if each machine belongs to exactly one sold asset. If a machine can be covered by several subscriptions, or coverage changes over time, use a junction object with coverage start and end dates. If you use Dynamic Revenue Orchestrator, Salesforce adds a fulfillment asset for the technical side of the order; it does not replace the Field Service machine asset, so decide how the two map to each other. In an [object ownership matrix](/en/blog/salesforce-object-ownership-matrix/), Asset is a typical shared object: one stream builds Revenue Cloud, another builds Field Service, and both write to Asset. One owner and one automation entry point prevent two teams from building conflicting triggers. How Field Service models machines, maintenance and parts is covered in the chapter on [assets, maintenance and parts](/en/masterclass/field-service/field-service-assets-maintenance-parts/).

## Worked example: remote monitoring per machine

Assume a machine builder sells a remote monitoring subscription for 12 installed machines to one customer. In Revenue Cloud this is one quote line with quantity 12, so one asset with quantity 12. Field Service contains 12 machine assets with serial numbers from SAP.

A year later the customer sells two machines and cancels monitoring for them. The amendment reduces the quantity by 2, to 10. Revenue Cloud now knows the customer pays for 10. It does not know which two machines are no longer covered, because the sold asset never contained serial numbers. Unless a separate coverage list shows which ten machines are covered, the service team still sees 12 machines with active monitoring.

There are two options. Either you sell monitoring per machine, one line per serial number, which makes quotes longer but also makes every change precise. Or you keep the quantity-based model and maintain a separate list of covered machines, owned by inside service. I prefer one line per machine as long as quotes stay readable for the customer and serial numbers are known when the quote is created, because the asset then answers the question that technicians and billing both ask. With hundreds of machines per customer, the coverage list is usually the better choice. How such subscriptions are invoiced is covered in [maintenance contracts: recurring billing](/en/blog/maintenance-contracts-recurring-billing/).

## List the products that live on after the order

List the products you sell that remain relevant after the order: subscriptions, service contracts, software licenses, monitoring. For each one, decide whether it is quantity-based or tied to a serial number, who may amend and renew it, and which record Field Service uses. Write the decision into the ownership matrix before the first sprint for either cloud. The chapter [quote, contract, order](/en/masterclass/revenue-cloud/quote-contract-order/) shows where assets fit between quote and SAP.
