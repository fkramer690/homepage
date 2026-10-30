---
title: "Assets in Revenue Cloud: amendments and renewals"
description: "How Revenue Cloud keeps sold products as assets, how amendments, renewals and cancellations work, and how this fits with Field Service machine assets."
pubDate: 2026-10-28
lang: en
slug: revenue-cloud-assets-amendments-renewals
translationKey: revenue-cloud-installed-base-assets
topic: revenue
categories: [revenue-cloud, field-service]
tags: [Revenue Cloud, assets, amendments, renewals, installed base, Field Service]
takeaways:
  - "In Revenue Cloud, activating an order makes the sold products available as assets under the customer account. Every later change runs through a new quote and a new order."
  - "An amendment quote shows the start quantity, the change as a positive or negative delta and the resulting end quantity, for example 5 plus 8 gives 13."
  - "Each change creates an asset action, and asset state periods record quantity, amount and monthly recurring revenue per time span. Their fields cannot be edited."
  - "Renewals run automatically with the asset's renewal term or with an overridden term. A cancellation sets the quantity to the negative of the total, so the end quantity is zero."
  - "Field Service uses the same Asset object for the installed machine with its serial number. Decide early whether sold subscriptions and physical machines share records."
faq:
  - q: "What is a lifecycle-managed asset in Salesforce?"
    a: "An asset with the Lifecycle-managed asset flag set. Salesforce records each change to it as an asset action and keeps its quantity, amount and monthly recurring revenue per time span in asset state periods."
  - q: "How do I change a subscription in Revenue Cloud?"
    a: "You amend the asset. Revenue Cloud creates an amendment quote with the change as a delta, you create an order from it and activate the order, and the asset gets a new asset action and a new state period."
  - q: "Which renewal options does Revenue Cloud offer?"
    a: "Automatic Renewal extends the subscription at the end of the term with the asset's predefined renewal term. Override Renewal Term sets custom start and end dates and creates a quote or order that refunds the unused part of the current subscription."
  - q: "Can Revenue Cloud and Field Service use the same assets?"
    a: "Both work on the standard Asset object. Revenue Cloud tracks what was sold with quantity and recurring revenue, Field Service tracks the installed machine with serial number and hierarchy. In my view one record can carry both only if every machine is sold as its own line with quantity one."
draft: false
---

In Revenue Cloud, what a customer bought becomes an asset under the account when the order is activated. Every later change, whether an amendment, a renewal or a cancellation, runs through a new quote and a new order on that asset. Salesforce records each change as an asset action and keeps quantity, amount and monthly recurring revenue per time span in asset state periods. Field Service uses the same Asset object for the installed machine with its serial number. For most machine builders I recommend two kinds of asset records, one for what was sold and one for the physical machine, with a defined link between them.

## How do assets come into being in Revenue Cloud?

"An asset in Salesforce represents a specific purchased or installed product", as [Trailhead on customer assets](https://trailhead.salesforce.com/modules/field_service_maint/units/field_service_maint_assets) puts it. Revenue Cloud creates these records from orders. According to [Trailhead on asset amendments](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-amendments), activating the order fulfils it, and the assets appear under the customer account in the Managed Assets section. If the order runs through Dynamic Revenue Orchestrator first, the Trailhead exercise checks the assets once the orchestration steps are complete. How that works is in [handing orders to SAP with DRO](../revenue-cloud-order-orchestration-sap/).

These are lifecycle-managed assets. Next to the classic fields such as serial number, parent asset and root asset, the Asset object has a Lifecycle-managed asset flag, a current quantity and a current monthly recurring revenue, as the [Salesforce field reference](https://developer.salesforce.com/docs/atlas.en-us.226.0.sfFieldRef.meta/sfFieldRef/salesforce_field_reference_Asset.htm) lists. Two related objects hold the history:

- **Asset action:** according to the [object reference](https://developer.salesforce.com/docs/atlas.en-us.264.0.object_reference.meta/object_reference/sforce_api_objects_assetaction.htm), it represents a change made to a lifecycle-managed asset. Trailhead shows business categories such as Upsells, Renewals and Cancellations.
- **Asset state period:** per the [object reference](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetstateperiod.htm), a time span in which an asset has the same quantity, amount and monthly recurring revenue. Amendments and renewals add a new period.

The fields of both objects cannot be edited. The history comes from quotes and orders, or from the [asset lifecycle APIs](https://developer.salesforce.com/docs/atlas.en-us.chatterapi.meta/chatterapi/features_asset_lifecycle_use_cases.htm).

```hinweis achtung
An interface from SAP should never overwrite quantities on lifecycle-managed assets. A change in quantity is a commercial change and belongs in a quote and an order.
```

## How does an amendment work?

Every amendment is a quote, and every quote becomes an order. Trailhead's example: a customer has five licences and needs eight more. The rep selects the asset, clicks Amend and sets an amendment date, the day the change takes effect. Revenue Cloud creates an amendment quote with three quantities:

```kennzahlen
5 | Start quantity: what the customer has today
+8 | Quantity: the delta, a negative number such as -3 to reduce
13 | End quantity: the result
source: Trailhead, Manage Customer Asset Amendments (Asset Lifecycle Management with Revenue Cloud)
```

From the quote the rep creates an order and activates it. The asset gets a new asset action with the business category Upsells and a new state period with the higher quantity from the amendment date onwards.

For a manufacturer this means: a customer who adds remote monitoring for three more machines gets a quote and an order, just like a new sale. That is more process than editing a number, and it is the reason the history stays correct. Because the amendment is a normal quote, your pricing and approval rules run on it too.

## How do renewals and cancellations work?

[Trailhead on renewals and cancellations](https://trailhead.salesforce.com/content/learn/modules/asset-lifecycle-management-with-revenue-cloud/manage-customer-asset-renewals-and-cancellations) describes two renewal options:

- **Automatic Renewal** extends the subscription at the end of the current term with the asset's predefined renewal term.
- **Override Renewal Term** sets your own start and end dates. It replaces the existing renewal term and creates a quote or order that refunds the unused part of the current subscription.

In Trailhead's example, setting the renewal term creates a renewal quote. The rep creates an order from it and activates it, and the asset gets an asset action with the category Renewals and a new period with the new dates.

A cancellation starts with a cancellation date. In the cancellation quote, Revenue Cloud sets the quantity to the negative of the asset's total quantity, so the end quantity becomes zero. After the order is activated, the asset gets an asset action with the category Cancellations. Unlike amendments and renewals, a cancellation creates no new state period; the dashboard shows the last day of the current one.

Decide early who triggers renewals. Automatic renewal suits service contracts that simply continue. Overriding the term suits renewals that are renegotiated anyway, for example with a new price. Whether sales, inside service or a quoting agent prepares the renewal quote is a process decision you should write down before go-live.

## How do Revenue Cloud assets fit with Field Service?

Field Service works on the same Asset object. There the asset is the machine at the customer site, with serial number, a hierarchy of assemblies through the Parent Asset field, linked work orders and maintenance plans. Which data Field Service needs is described in [Field Service master data](../salesforce-field-service-master-data/), and how service contracts and maintenance plans hang on assets in [modelling maintenance contracts](../salesforce-field-service-maintenance-contracts/).

The two views count differently. Revenue Cloud counts quantities: Trailhead's five licences are one asset with quantity 5. Field Service needs one record per serial number, because a technician repairs one machine. Two models are possible:

| | One record per machine | Separate records, linked |
|---|---|---|
| Idea | The asset from the order is also the machine asset | Sold asset from Revenue Cloud, machine asset from SAP or commissioning |
| Works when | Every machine is sold as its own line with quantity 1 | Quantities above 1, subscriptions across several machines |
| Serial number | Added to the sold asset after delivery | On the machine asset, from SAP |
| Risk | A line with quantity 3 cannot become three machines | The link has to be maintained |

For most machine builders I recommend the second model. The sold asset answers "what does the customer pay for", the machine asset answers "what stands where". Link them with a lookup and agree who owns which record. In an [object ownership matrix](../salesforce-object-ownership-matrix/), Asset is a typical shared object: one stream builds Revenue Cloud, another builds Field Service, and both write to Asset. One owner and one automation entry point stop two teams from building triggers against each other. How Field Service models machines, maintenance and parts is covered in the chapter on [assets, maintenance and parts](../../masterclass/field-service/field-service-assets-maintenance-parts/).

## A typical scenario: remote monitoring per machine

A typical scenario, as an assumption: a machine builder sells a remote monitoring subscription for 12 installed machines at one customer. In Revenue Cloud this is one quote line with quantity 12, so one asset with quantity 12. Field Service holds 12 machine assets with serial numbers from SAP.

A year later the customer sells two machines and cancels monitoring for them. The amendment reduces the quantity by 2, to 10. Revenue Cloud now knows the customer pays for 10. It does not know which two machines are out, because the sold asset never knew serial numbers. Service still sees 12 machines with active monitoring.

There are two ways out. Either you sell monitoring per machine, one line per serial number, which makes quotes longer and every change precise. Or you keep the quantity and maintain a separate list of covered machines, owned by inside service. I prefer one line per machine as long as a customer has no more than a few dozen machines, because the asset then answers the question that technicians and billing both ask. How such subscriptions are invoiced is covered in [maintenance contracts: recurring billing](../maintenance-contracts-recurring-billing/).

## Where should you start?

List the products you sell that live on after the order: subscriptions, service contracts, software licences, monitoring. For each one decide whether it is counted or tied to a serial number, who may amend and renew it, and which record Field Service uses. Write the decision into the ownership matrix before the first sprint on either cloud. The chapter [quote, contract, order](../../masterclass/revenue-cloud/quote-contract-order/) shows where assets sit between quote and SAP.

Assets in Revenue Cloud keep a reliable history of what was sold, as long as every change goes through a quote and an order and the link to the machine is decided up front.
