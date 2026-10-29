---
title: "Field Service assets: maintenance, parts and partners"
description: "How machine builders model assets in Salesforce Field Service, trigger maintenance by operating hours, keep spare parts in the ERP and bring in partners."
lang: en
slug: field-service-assets-maintenance-parts
course: field-service
translationKey: fsl-04
chapter: 4
pubDate: 2026-10-28
short: "Assets, maintenance, parts, partners"
summary: "How machines become assets, maintenance by calendar or operating hours, spare parts with the ERP and service partners in the same process."
takeaways:
  - "A component becomes an asset when it has its own serial number, its own maintenance or its own warranty; everything else stays in the PLM parts list, which usually leaves two or three levels per machine."
  - "A maintenance contract spreads across three objects in Field Service: service contract for what was sold, maintenance plan for planned visits and entitlement for the committed response time."
  - "Maintenance by operating hours needs one counter on the asset, updated once a day from the ERP, the IoT platform or the technician, and one criteria-based rule for \"2,000 hours or 12 months\"."
  - "The ERP keeps spare parts stock and the material master; Field Service holds a copy for vans and technicians and reports consumed parts back."
  - "Service partners work in the same process when each partner technician is a service resource and each partner company gets its own service territory."
articles: [field-service-asset-hierarchy, field-service-maintenance-contracts, field-service-usage-based-maintenance, predictive-maintenance-data-readiness, asset-service-lifecycle-management-addon, field-service-spare-parts, field-service-service-partners]
faq:
  - q: "How deep should a machine builder model assets in Salesforce Field Service?"
    a: "As deep as service uses it. I make a component an asset when it has its own serial number, its own maintenance or its own warranty. Salesforce allows 50 levels and 10,000 assets per hierarchy, but the tree grid shows only 500, and every extra asset adds upkeep."
  - q: "Can Field Service trigger maintenance by operating hours?"
    a: "Yes. Maintenance work rules can be calendar-based, usage-based or criteria-based. Usage and criteria rules read a field on the asset, such as an operating hours counter, and create a work order when the threshold is reached."
  - q: "Do I need Asset Service Lifecycle Management for maintenance plans?"
    a: "No. Assets, maintenance plans, service contracts and entitlements are in core Field Service. The add-on at $75 per user and month (price list, October 2026) adds workflows such as the Asset Coverage View, work order estimation, product service campaigns and depot repair."
  - q: "Should spare parts stock be managed in Field Service or in the ERP?"
    a: "In the ERP. It values stock, runs purchasing and posts to accounting. Field Service needs a copy of the van stock for scheduling and the offline app, and it sends consumed parts back to the ERP."
  - q: "How do subcontractors work in Salesforce Field Service?"
    a: "Either each partner technician is a service resource with a user, or the partner company is one capacity-based resource that assigns its own people. Contractor Plus costs $80 per user or $32 per login and month (price list, October 2026)."
draft: false
---

For a machine builder, Salesforce Field Service works best with a flat installed base: the machine and the assemblies with their own serial number, maintenance or warranty become assets, everything else stays in PLM. A maintenance contract spreads across service contract, maintenance plan and entitlement. Maintenance runs by calendar, by operating hours or by criteria such as "2,000 hours or 12 months", fed by a daily counter from the ERP or the IoT platform. The ERP keeps spare parts stock, Field Service holds a copy for the vans. Service partners get one resource per technician and one territory per company. Add-ons come last.

## How deep should the installed base go?

Field Service, which Salesforce sells today as [Field Service and Operations](https://www.salesforce.com/service/field-service-management/pricing/), hangs almost everything in this chapter on the asset. [Chapter 3](../field-service-mobile-app-documents/) covered how technicians document their work; this one covers what they document it against.

An asset is a product bought or installed at a customer, linked to an account, a contact or both. The Parent Asset field builds the hierarchy. The [Field Service limits](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5) in Salesforce Help allow 2,000 child assets per asset, 50 levels and 10,000 assets per hierarchy, while the tree grid view shows hierarchies of up to 500 assets.

Those limits rarely matter. Depth costs you earlier, in data upkeep, maintenance plans and on the tablets. My rule of thumb has three questions, and one yes makes a component an asset:

- **Own serial number?** The technician has to record which gearbox or robot was installed or exchanged.
- **Own maintenance?** Maintenance work rules hang on assets, so a spindle with its own interval needs one.
- **Own warranty?** A bought-in part whose warranty starts on a different date than the machine's.

Everything else stays in the PLM parts list. For most machines that leaves two or three levels. The calculation for a packaging line with 6 machines, 40 serialised assemblies and 900 parts is in [asset hierarchy: how deep for a machine?](../../../blog/field-service-asset-hierarchy-machines/).

Two decisions come before the first ERP load. First, values that differ per series, such as a firmware version, go into asset attributes. The [AssetAttribute object](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetattribute.htm), available since API version 57.0, stores a value per asset against an attribute definition, so a new machine series needs no new custom field. Counters that drive maintenance stay number fields on the asset. Second, someone owns the tree after delivery. The ERP delivers the installed base, but a year later a technician exchanges a gearbox. One system has to lead from then on, or nobody trusts the tree.

```praxis
In my Field Service projects, spare parts and the installed base came from the ERP, and that is where two stumbling blocks were, the data quality of the assets and the ERP interfaces.
```

Check serial numbers and locations before maintenance plans build on them.

## Service contract, maintenance plan, entitlement: which object does what?

A maintenance contract does not live in one object. In Field Service it is split three ways:

| Object | Answers | Example |
|---|---|---|
| Service contract with contract line items | What was sold, for which assets | Three-year contract for a production line |
| Maintenance plan with maintenance work rules | When planned maintenance happens | Service every 2,000 operating hours |
| Entitlement with entitlement process and milestones | What the customer is entitled to, and whether it was met | Technician on site within 24 hours |

The maintenance plan creates work orders in advance. The entitlement matters for breakdowns: according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/entitlement-management-for-lightning-experience/use-entitlements-with-work-orders), entitlement processes only run on records that match their type, so work orders need their own process of type Work Order. A flow can then raise the priority of a work order with a committed response time, and the engine schedules it first. How the three objects work together, including the priority logic, is in [how to model maintenance contracts](../../../blog/salesforce-field-service-maintenance-contracts/).

The commercial side is a separate question. If you sell maintenance contracts as subscriptions and invoice them quarterly, Revenue Cloud can handle the billing, while Field Service knows nothing about those subscriptions. The handover between the two is described in [maintenance contracts: recurring billing in Revenue Cloud](../../../blog/maintenance-contracts-recurring-billing/) and in the Revenue Cloud chapter on [billing and usage-based pricing](../../revenue-cloud/billing-and-usage-based-pricing/).

## Calendar or operating hours: which trigger fits?

A six-month calendar fits badly when the same machine runs one shift at one customer and three at another. According to Salesforce Help on [preventive maintenance](https://help.salesforce.com/s/articleView?id=service.fs_preventive_maintenance.htm&language=en_US&type=5), maintenance work rules can also work with usage and criteria:

| Rule type | Reads | Fits |
|---|---|---|
| Calendar-based | An interval in days, weeks or months | Statutory inspections, fixed contract dates |
| Usage-based | A usage field on the asset, which may be a formula, and a next occurrence field the system updates | Operating hours, cycles, strokes |
| Criteria-based | Recordset filter criteria on asset fields | Thresholds and "whichever comes first" |

Three details shape the design. A criteria-based rule creates no new work order while its last one is still open, according to the help page on [criteria-based maintenance](https://help.salesforce.com/s/articleView?id=sf.fs_rfc_create_any_criteria.htm&language=en_US&type=5). The same page shows that a criteria rule and a calendar rule generate work orders independently, even with the same suggested date, so "2,000 hours or 12 months" belongs in one rule with OR logic. And the condition has to reset after the visit, for example with a flow that stores the counter reading when the work order closes.

The limits that matter: one generation run creates at most 2,600 work orders and line items per plan, a plan with a count-based rule takes at most 2,000 assets, and Salesforce recommends no more than five maintenance work rules per plan or asset. I split plans by series or region so each stays well below that and has an owner.

The counter comes from the IoT platform, the ERP or the technician on site, and a daily value is enough. The setup step by step, including the reset flow, is in [usage-based maintenance in Field Service](../../../blog/field-service-usage-based-maintenance/).

## When is predictive maintenance realistic?

Predictive maintenance needs a service history more than it needs sensors. Salesforce announced Asset Service Prediction in [June 2024](https://www.salesforce.com/news/stories/field-service-asset-management-news/) as an AI model that predicts when and why an asset may fail, based on current asset data and the service history of similar assets, with an open beta planned for that winter. The current [asset management page](https://www.salesforce.com/service/field-service-management/asset-management/) describes it without a status, so ask for availability in your edition in writing.

The model learns only from what your work orders contain. Without serial numbers on corrective work orders and coded failure causes, I recommend the usage and criteria rules above plus a few aggregated condition signals.

Machine data costs money once it lands in Data 360. The [Flex Credits rate card of 31 August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) prices the Streaming Pipeline at 3,500 credits per million rows in the base tier, and 15-minute aggregates have 900 times fewer rows than one-second readings. Raw time series belong in the IoT platform or historian. The data check and the full cost calculation are in [predictive maintenance in Salesforce: what data you need](../../../blog/predictive-maintenance-salesforce-data-needed/).

## Do you need Asset Service Lifecycle Management or Connected Assets?

Usually not at the start. Assets with hierarchies, maintenance plans, service contracts and entitlements are part of core Field Service. The [price list](https://www.salesforce.com/service/field-service-management/pricing/) (October 2026) shows two asset add-ons:

- **Asset Service Lifecycle Management** at $75 per user and month. The [ASLM section in Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.aslm_asset_service_lifecycle_management.htm&type=5) lists, among others, the Asset Coverage View, the Asset Interactive Hierarchy, work order estimation, product service campaigns, depot repair, advanced exchange, inventory functions and timesheets.
- **Connected Assets** at $15,000 per org and month, so $180,000 a year at list price, for telemetry, the Asset Health Score and 10,000 connected digital assets.

```hinweis offen
The price list marks the Asset Coverage View as "Available for Purchase" even for Agentforce 1 Field Service. Confirm that in your quote.
```

Several ASLM functions handle stock, such as counts and replenishment; if SAP owns stock, they create a second truth. For a machine builder I see the fit in what the ERP does poorly on the service side: coverage at the hotline, repair quotes, retrofit campaigns and depot repair. The comparison of add-on and own build for 30 users is in [Asset Service Lifecycle Management: worth the add-on?](../../../blog/asset-service-lifecycle-management-add-on/).

## Spare parts: why does the ERP keep the stock?

In the ERP a spare part has a value, a purchasing process and postings to accounting. Field Service only needs quantities per location. According to the [inventory data model](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_inventory.htm), a product item holds the stock of one part at one location, products required list what a job needs, and products consumed record what was used, with the product item quantity updated automatically. A [location](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_location.htm) can be a warehouse or a service vehicle.

The ERP sends material master and stock, Salesforce sends back consumed parts and part requests. Bring only the vans and the warehouses that restock them into Salesforce. 40 vans with 300 parts each are already 12,000 product items, and every one of them ends up offline on a device. Which data the app should hold offline is in [Field Service mobile offline](../../../blog/field-service-mobile-app-offline-data/), the split of tasks in [spare parts: ERP or Salesforce?](../../../blog/salesforce-field-service-spare-parts-erp/).

```ablauf
sf: Product Item, Products Consumed, Part request
erp: ERP
ERP --Master and stock--> Product Item
Products Consumed ..Quantity update..> Product Item
Products Consumed --Consumed parts--> ERP
Part request --> ERP
```

Many spare parts calls need no visit. If customers order a known part for their machine themselves, the hotline has less to do; the B2B Commerce chapter on [catalogue, search and entitlements](../../b2b-commerce/catalog-search-entitlements/) shows how parts per machine become visible in a store.

## Where does warranty belong?

Warranty touches three products, so decide the owner first. Field Service has warranty terms and asset warranties in its [warranty management data model](https://developer.salesforce.com/docs/platform/data-models/guide/field-service-warranty-management.html), ASLM adds coverage views and campaigns, and Manufacturing Cloud brings [Warranty Lifecycle Management](https://trailhead.salesforce.com/content/learn/modules/warranty-administration-and-claims-management-in-manufacturing-cloud/get-started-with-warranty-lifecycle-management) with warranty terms at several product levels and claims that partners and distributors submit through a portal.

My rule: if dealers submit warranty claims, Manufacturing Cloud owns warranty, as described in the Manufacturing Cloud chapter on [warranty and after-sales](../../manufacturing-cloud/warranty-and-after-sales/). If only your own technicians need to see coverage when a visit is booked, the entitlement on the asset is enough and claims stay in the ERP. Two warranty models on the same asset give two answers to the same customer.

## How do service partners fit into the same process?

Partners belong in the same process as your own technicians: same plan, same app, same service report. Salesforce's [architecture guide on contractor sharing](https://architect.salesforce.com/docs/architect/fundamentals/guide/field-service-contractor-sharing-patterns) describes two models. A named contractor is treated much like an employee and needs a user licence of their own. A contractor company can be modelled as a capacity-based resource, and the partner assigns its own people. The guide uses the service territory as the main security boundary, with a child territory per contractor company.

I prefer the first model for regular partners and the second for partners who step in at peaks. Contractor Plus costs $80 per user or $32 per login and month according to the price list, so per user wins above 2.5 logins a month. Roles and licence rules are in [Field Service licences by role](../../../blog/field-service-licences-by-role/), the setup and what stays deliberately different in [how to bring in service partners](../../../blog/salesforce-field-service-service-partners/).

## A typical scenario, as an assumption: 1,200 machines in three series

A typical scenario, as an assumption: a builder of machining centres has 1,200 machines in the field in three series. The service contract says: service every 2,000 operating hours or every 12 months, whichever comes first. 700 machines are connected, 500 are not. Two partner companies cover Scandinavia.

- **Installed base.** Each machine has six serialised assemblies: 8,400 assets in two levels, loaded from SAP. Technicians record exchanges in the app, and SAP stays the master.
- **Maintenance.** One criteria-based rule per machine with two conditions joined by OR. The IoT platform writes hours every night, technicians enter the reading for unconnected machines. Six plans, one per series and region, with at most 250 machines each.
- **Effect.** Assume 300 machines run two shifts at about 4,000 hours a year and get two services, while 900 single-shift machines fall back to the 12-month condition. That is 1,500 visits a year instead of 2,400 with a fixed six-month calendar.
- **Parts and partners.** 30 vans in Salesforce as locations, stock synced nightly from SAP. The two partners get a territory each, regular technicians on Contractor Plus per user.
- **Add-ons.** None in the first year. Connected Assets would cost $180,000 a year without changing a single decision.

## What should you decide before a partner builds?

1. **Asset depth per machine type**, with the three questions above, and which system leads the installed base after delivery.
2. **Contract types** with their objects: what was sold, which maintenance, which response time.
3. **Counter source per series** and the rule that wins when the ERP and the technician disagree.
4. **Stock ownership** and the list of locations that go into Salesforce.
5. **Warranty owner**: Field Service, ASLM or Manufacturing Cloud.
6. **Partner model** per partner company.

Most of these are interface questions, which I work on in [Salesforce integration](../../../services/salesforce-integration/). [Chapter 5](../field-service-ai-agents-rollout/) adds AI agents, rollout and operations; the [overview page](../) lists all chapters.

Assets, contracts and parts carry everything that comes later in Field Service, so they deserve the first decisions.
