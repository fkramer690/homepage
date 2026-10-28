---
title: "Product recalls in Salesforce: service campaigns"
description: "How product service campaigns in Salesforce handle a recall or upgrade across hundreds of machines and dealers, and which data you need to find the right ones."
pubDate: 2026-10-28
lang: en
slug: product-recalls-service-campaigns
translationKey: manufacturing-cloud-product-service-campaigns
topic: service
categories: [manufacturing-cloud, field-service]
tags: [Manufacturing Cloud, recalls, product service campaigns, dealers, after-sales]
takeaways:
  - "A product service campaign in Salesforce, available since API 51.0, describes activities on a set of assets, such as a recall, a fix or an upgrade. Each affected asset becomes one campaign item."
  - "Since API 65.0 the data model adds definitions with affected product, serial range and production batches, causal parts with a remediation type, partners and unsold dealer stock."
  - "Selecting the right machines depends on serial numbers and production batches in Salesforce. Without them a campaign hits too many machines or misses some."
  - "Dealers and service partners carry out the work. Work orders and appointments are Field Service and need Field Service licences."
  - "Before building, decide who triggers a campaign, who pays for parts and labour, and how dealers report completion per machine."
faq:
  - q: "What is a product service campaign in Salesforce?"
    a: "A product service campaign represents a set of activities to be performed on a group of assets, for example a recall for safety issues or product defects, a fix or an upgrade. Each affected asset is a product service campaign item with its own status. The object is available from API version 51.0."
  - q: "How does Salesforce know which machines a recall affects?"
    a: "Through campaign definitions that name the affected product, the production start date, the last affected serial number and linked production batches. That only works if serial numbers and production batches exist in Salesforce, usually loaded from the ERP or production."
  - q: "Can dealers carry out recall work in Salesforce?"
    a: "The data model includes partners with their role and communication channel and the unsold inventory each partner holds. The work itself usually runs as work orders and service appointments, which belong to Field Service, or through the dealer portal."
  - q: "Are product service campaigns included in Manufacturing Cloud?"
    a: "Trailhead lists product service campaigns among the Manufacturing Cloud service capabilities, but the pricing page does not mention them. Ask Salesforce in writing which edition includes them before you plan a recall process on them."
draft: false
---

A product service campaign in Salesforce bundles a recall, fix or upgrade for a defined set of assets: the campaign describes the activity, and one item per affected machine tracks the status. Since API 65.0 the data model also holds the faulty part, serial ranges, production batches, partners and unsold dealer stock. Whether a campaign over hundreds of machines works depends on traceability. Without serial numbers and production batches in Salesforce, the campaign hits too many machines or misses some. Before anything is built, I would settle who triggers a campaign, who pays and how dealers report each completed machine.

## What is a product service campaign?

The object reference describes the [product service campaign](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productservicecampaign.htm) as "a set of activities to be performed on a product service campaign asset", such as "a product recall for safety issues or product defects". It is available from API 51.0. The [product service campaign item](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/api/sforce_api_objects_productservicecampaignitem.htm) "represents a product service campaign's asset", so every affected machine gets its own line. The Field Service developer guide lists both objects, plus an item status object, among the [Field Service standard objects](https://developer.salesforce.com/docs/atlas.en-us.232.0.field_service_dev.meta/field_service_dev/fsl_dev_soap_objects.htm).

Manufacturing Cloud builds on that. The [Trailhead overview](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) lists product service campaigns among its service capabilities: "Launch and manage proactive service campaigns for recalls, upgrades, or maintenance initiatives". The campaign is not limited to safety recalls. A retrofit kit offered to all machines of one series fits the same model.

## Which objects does the data model use?

The [product service campaign data model](https://developer.salesforce.com/docs/platform/data-models/guide/product-service-campaign-management.html) shows the full picture. The objects added in API 65.0 are documented in the Manufacturing Cloud and Automotive Cloud developer guides:

| Object | What it holds |
|---|---|
| Product service campaign | The campaign itself |
| Product service campaign item | One affected asset with its status |
| Group definition | Parent record of definitions, causal parts and partners |
| [Campaign definition](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/sforce_api_objects_productsvccampaigndef.htm) | Affected product, production start date, last affected serial number, number of affected units |
| [Definition production batch](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/sforce_api_objects_productsvccmpndefprodtbtch.htm) | Links a production batch to the definition |
| [Causal item](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpngrpdefcausalitm.htm) | The faulty product that caused the campaign, with remediation type Notation, Repair or Replace |
| [Group definition partner](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpngrpdefptnr.htm) | A supplier, distributor or dealer, with point of contact and communication channel |
| [Definition partner inventory](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_prodtsvccmpndefptnrinv.htm) | Unsold affected units at a partner, with quantity and inventory status |

The causal item also carries a replacement request type: either a credit from the supplier without returning the part, or a credit against a product return. That links the campaign to supplier recovery, which [warranty claims from dealers](../warranty-claims-dealers-salesforce/) describes for single claims. The data model diagram also lists work orders, service appointments, return orders and claims.

## How do you find the affected machines?

This is where most recalls go wrong, in Salesforce or anywhere else. The definition selects by product, production start date and the last affected serial number, and it can link production batches. That assumes three things:

- **Every machine exists as an asset with a serial number.** How the installed base gets there is covered in [installed base in Manufacturing Cloud](../installed-base-asset-milestones/).
- **Serial numbers run in order** within a product, so a range means something.
- **The link from component batch to machine is known.** If a supplier's valve batch is faulty, you need to know which machines it went into. That as-built information usually lives in production or PLM, as described in [spare parts by serial number](../spare-parts-by-serial-number-ai/).

If one of these is missing, you choose between two bad options. Select too broadly and you pay for work on machines that are fine. Select too narrowly and faulty machines stay in the field. I would test the selection logic against one past quality case before trusting it with a real recall.

## A typical scenario, as an assumption

A machine builder learns that a supplier's valve batch is faulty. The valve sits in 1,800 machines of two series, sold through 70 dealers. 120 of those machines are still unsold in dealer stock.

In the data model this becomes a campaign and a group definition. The causal item is the valve, remediation type Replace, with a product return against credit so the supplier pays. Two definitions cover the two series, each with production start date, last affected serial number and the linked production batches. The supplier and the 70 dealers are group definition partners. The 120 unsold machines appear as partner inventory, so they are fixed before they reach a customer.

1,680 machines at end customers become campaign items. Dealers contact their customers, book the visit, replace the valve and report each machine as done. The quality team sees per item and per dealer how far the campaign has come. All numbers here are assumptions that show the method.

## Who carries out the work?

Usually dealers and service partners, sometimes the manufacturer's own technicians. Work orders, service appointments and technician scheduling belong to Field Service and need Field Service licences. How partner technicians work in it is covered in [Field Service service partners](../salesforce-field-service-service-partners/) and in the [Field Service masterclass chapter on assets and parts](../../masterclass/field-service/field-service-assets-maintenance-parts/).

Dealers without Field Service report through the portal. Which licence that needs is covered in [the Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/). Whichever path you choose, completion must be reported per machine, not per dealer as a number, or the campaign status in Salesforce is fiction.

## What should you decide before building?

Four questions I would answer in writing:

1. **Who triggers a campaign?** Usually quality, sometimes product management for upgrades. One role creates it, another approves.
2. **Who pays?** Parts, labour for the dealer and travel. The causal item covers supplier recovery; how dealers get paid for labour, through claims or a flat rate, is your decision.
3. **How is completion reported?** Per machine, with date and who did it, through work order, portal or claim.
4. **Which licence covers it?** The [Manufacturing Cloud pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) does not mention service campaigns, and the reference pages name no licence. Ask in writing.

The full after-sales picture is in the [warranty and after-sales chapter](../../masterclass/manufacturing-cloud/warranty-and-after-sales/) of the Manufacturing Cloud masterclass.

A recall in Salesforce works when the affected machines can be found by serial number and batch, and stalls when they cannot. If you are preparing a recall or upgrade process, [send me a message](#contact).
