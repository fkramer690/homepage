---
title: "Product recalls in Salesforce: service campaigns"
description: "How product service campaigns in Salesforce organize a recall or upgrade across hundreds of machines and dealers, and what data identifies the right ones."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: product-recalls-service-campaigns
translationKey: manufacturing-cloud-product-service-campaigns
topic: service
categories: [manufacturing-cloud, field-service]
tags: [Manufacturing Cloud, recalls, product service campaigns, dealers, after-sales]
takeaways:
  - "Product service campaigns have existed since API 50.0, items since 51.0. In a machine recall each affected unit receives one item with its own status."
  - "Since API 65.0, the model has included serial ranges, production batches, causal parts, partners and unsold dealer stock."
  - "Preferred partners carry out the work by region. Scheduling and the technician app need Field Service licenses."
  - "Campaigns are part of Asset Service Lifecycle Management and need the Industries Field Service add-on. Confirm the packaging and price in the quote."
faq:
  - q: "What is a product service campaign in Salesforce?"
    a: "A product service campaign represents a set of activities to be performed on a group of assets, for example a recall for safety issues or product defects, a fix, or an upgrade. For a machine recall, each affected asset becomes a product service campaign item with its own status. The campaign object is available from API version 50.0, and the item is available from 51.0."
  - q: "How does Salesforce know which machines a recall affects?"
    a: "The campaign definition records the scope: product, production period, serial number range and linked production batches. The assets themselves are selected through an actionable list and added to the campaign, or campaign items are created by hand. That only works if Salesforce holds the data needed for segmentation, usually loaded from the ERP or production."
  - q: "Can dealers carry out recall work in Salesforce?"
    a: "The data model includes preferred partners that carry out the work by region, partners to be informed with their communication channel, and the unsold inventory each partner holds. The work itself is usually handled as work orders and service appointments in Field Service, or through a dealer portal that you design and license separately."
  - q: "Are product service campaigns included in Manufacturing Cloud?"
    a: "Trailhead lists product service campaigns among the Manufacturing Cloud service capabilities. Salesforce Help documents them as part of Asset Service Lifecycle Management, which needs the Industries Field Service add-on license. The Manufacturing Cloud pricing page does not mention them, so confirm the packaging and price in writing."
draft: false
---

A product service campaign in Salesforce organizes a recall, fix or upgrade for a defined set of assets: the campaign describes the activity, and in a machine recall one item per affected unit tracks the status. Since API 65.0 it also records the faulty part, serial ranges, batches, partners and dealer stock. Whether a campaign covering hundreds of machines works depends on traceability: without a reliable link from the faulty part to each machine, it covers too many machines or misses some. Before implementation, I would define who triggers a campaign, who pays and how dealers report each machine.

## What is a product service campaign?

The object reference describes the [product service campaign](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productservicecampaign.htm) as "a set of activities to be performed on a product service campaign asset", such as "a product recall for safety issues or product defects". It is available from API 50.0 and requires Field Service to be enabled. The [product service campaign item](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productservicecampaignitem.htm), available from API 51.0, "represents a product service campaign's asset"; it can reference an asset, a product or a serialized product. For a machine recall I create a separate item for every affected machine. The Field Service developer guide lists both objects, plus an item status object, among the [Field Service standard objects](https://developer.salesforce.com/docs/service/field-service-dev/guide/fsl-dev-soap-objects.html). Salesforce Help places the feature in Asset Service Lifecycle Management, which needs the Industries Field Service add-on license.

Manufacturing Cloud builds on that. The [Trailhead overview](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) lists product service campaigns among its service capabilities: "Launch and manage proactive service campaigns for recalls, upgrades, or maintenance initiatives". The campaign is not limited to safety recalls. A retrofit kit offered to all machines of one series fits the same model. The campaign does not cover regulatory reporting, sales holds or legally reviewed customer letters; these stay in your quality and legal processes.

## Since API 65.0 the data model knows batches and causal parts

The [product service campaign data model](https://developer.salesforce.com/docs/platform/data-models/guide/product-service-campaign-management.html) shows the full picture; the table below highlights the objects that matter for this example. The objects added in API 65.0 are documented in the Manufacturing Cloud and Automotive Cloud developer guides:

| Object | What it holds |
|---|---|
| Product service campaign | The campaign itself |
| Product service campaign item | One affected asset with its status |
| Group definition | Parent record of definitions, causal parts and partners |
| [Campaign definition](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/sforce_api_objects_productsvccampaigndef.htm) | Affected product, production start and end date, starting and ending serial number, number of affected units |
| [Definition production batch](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/sforce_api_objects_productsvccmpndefprodtbtch.htm) | Links a production batch to the definition |
| [Causal item](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpngrpdefcausalitm.htm) | The faulty product that caused the campaign, with remediation type Notation, Repair or Replace |
| [Group definition partner](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpngrpdefptnr.htm) | A supplier, distributor or dealer to inform, with point of contact and communication channel |
| Preferred partner | The service partner that carries out the work in a region, with a ranking |
| [Definition partner inventory](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpndefptnrinv.htm) | Unsold affected units at a partner, with quantity and inventory status |

The causal item also stores a replacement request type: either a credit from the supplier without returning the part, or a credit against a product return. That records the intended treatment; the actual recovery is handled as a separate supplier recovery claim, which the supplier can approve in full, in part or not at all. [Warranty claims from dealers](/en/blog/warranty-claims-dealers-salesforce/) describes that process for single claims. The data model diagram also lists work orders, service appointments, return orders and claims.

## How do you find the affected machines?

This is where most recalls go wrong, in Salesforce or anywhere else. The definition records the scope by product, production period and serial number range, and it can link production batches. The selection itself is done through an actionable list that segments the assets and adds them to the campaign, or you create items by hand. Either way, the data has to be in place:

- **Every machine exists as an asset, usually with a serial number.** How to load the installed base is covered in [installed base in Manufacturing Cloud](/en/blog/installed-base-asset-milestones/).
- **Serial numbers run in order** within a product, if you want to use ranges at all.
- **The link from component batch to machine is known.** If a supplier's valve batch is faulty, you need to know which machines it was installed in. That as-built information is usually stored in production or PLM, as described in [spare parts by serial number](/en/blog/spare-parts-by-serial-number-ai/).

If one of these is missing, you choose between two bad options. If you select too broadly, you pay for work on machines that are unaffected. If you select too narrowly, faulty machines remain in the field. I would test the selection logic against one past quality case before trusting it with a real recall.

## Worked example: a faulty valve batch

Assume a machine builder learns that a supplier's valve batch is faulty. The valve is installed in 1,800 machines of two series, sold through 70 dealers. 120 of those machines are still unsold in dealer stock.

In the data model this becomes a campaign and a group definition. The causal item is the valve, remediation type Replace, with a product return in exchange for credit as the intended treatment; the claim against the supplier is handled separately through supplier recovery. Two definitions cover the two series, each with production period, serial number range and the linked production batches. An actionable list selects the affected assets from the batch links. The supplier and the 70 dealers are group definition partners to be informed, and the dealers that carry out the work are preferred partners for their region. The 120 unsold machines appear as partner inventory with their quantity. A sales hold and a completion record per machine still have to be set up so that the machines are fixed before they reach a customer.

1,680 machines at end-customer sites become campaign items. Dealers contact their customers, schedule the visit, replace the valve and report each machine as completed. If each work order is linked to the executing dealer, the quality team sees per item and per dealer how far the campaign has progressed. All numbers in this example are assumptions used to illustrate the method.

## Who carries out the work?

The work is usually carried out by dealers and service partners, and sometimes by the manufacturer's own technicians. Licenses depend on the role: the campaign itself needs the Asset Service Lifecycle Management add-on, work orders depend on your base product, and dispatching, scheduling and the technician app need Field Service dispatcher and technician licenses. How partner technicians work with Field Service is covered in [Field Service service partners](/en/blog/salesforce-field-service-service-partners/) and in the [Field Service masterclass chapter on assets and parts](/en/masterclass/field-service/field-service-assets-maintenance-parts/).

Dealers without Field Service can report through an Experience Cloud portal, but the external license, object permissions and update flow have to be designed and confirmed separately. Licenses for the portal are covered in [the Manufacturing Cloud customer portal](/en/blog/manufacturing-cloud-customer-portal/). Whichever path you choose, completion must be reported per machine, not per dealer as a number, or the campaign status in Salesforce does not reflect reality.

## When is a list in the quality system enough?

Not every manufacturer needs this data model. For small service actions, a list of serial numbers in the quality system plus one work order or case per machine is enough. The overhead of definitions, partners and partner inventory only pays off at scale. I would use product service campaigns when several of the points in their favor apply:

```pro-contra
pro: What speaks for service campaigns
- **Hundreds of machines per action**, spread across many customers
- **Dealers or service partners do the work**, and you need status per machine from outside your own company
- **Unsold stock sits at dealers** and has to be fixed before sale
- **Supplier recovery matters**, because the faulty part was bought in
- **Upgrades happen regularly**, for example retrofit kits for a whole series
contra: When a list is enough
- One or two field actions a year
- A few dozen machines per action
- Your own technicians do the work
```

The selection problem stays the same either way: without clean serial numbers and batches, the best list does not help.

## Settle trigger, costs and reporting in writing

These are the questions I would answer in writing before building:

1. **Who triggers a campaign?** Usually quality, sometimes product management for upgrades. One role creates it, and another approves it.
2. **Who pays?** Decide who pays for parts, dealer labor and travel. The causal item records the intended credit, the supplier recovery claim is a separate process; how dealers are paid for labor, through claims or a flat rate, is your decision.
3. **How is completion reported?** Completion is reported per machine, with the date and the person who performed the work, through a work order, a portal or a claim.

Then there is the license question:

```hinweis offen
Salesforce Help names the Industries Field Service add-on (Asset Service Lifecycle Management) as the license for product service campaigns, but the [Manufacturing Cloud pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) does not mention them. Ask Salesforce to confirm in writing which of your editions include the feature, for which users and at what price.
```

I walk through the reporting route from question 3 with two dealers before the first campaign starts. For the full after-sales picture, see the [warranty and after-sales chapter](/en/masterclass/manufacturing-cloud/warranty-and-after-sales/) of the Manufacturing Cloud masterclass.
