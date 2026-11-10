---
title: "Field Service asset hierarchy: how deep for a machine?"
description: "How deep machine builders should model machines, assemblies and parts as assets in Salesforce Field Service, which limits apply and who maintains the tree."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: field-service-asset-hierarchy-machines
translationKey: field-service-asset-hierarchy
topic: field-service
categories: [field-service, architecture]
tags: [field service, assets, installed base, asset hierarchy, PLM, ERP]
takeaways:
  - "Salesforce allows 50 levels and 10,000 assets per hierarchy, but the tree grid navigates only 20 levels and works only for hierarchies of up to 500 assets."
  - "Strong signals for an asset: own serial number, own maintenance or own warranty, if a service process has to track that unit separately."
  - "Asset attributes save custom fields per machine series, but allow 25 per asset and are not part of offline briefcases."
  - "The installed base is taken from the system with the serial-specific configuration. Who updates it after an exchange must be decided before go-live."
  - "Every extra service-relevant asset adds work to maintenance plans and data upkeep, so keep the asset count as low as service allows."
faq:
  - q: "How many levels can a Salesforce asset hierarchy have?"
    a: "According to the Field Service limits in Salesforce Help, Salesforce supports up to 50 levels, 2,000 child assets per asset and 10,000 assets per hierarchy. The View Asset Hierarchy action supports navigation through up to 20 levels and works only for hierarchies of up to 500 assets."
  - q: "Should every part of a machine become an asset?"
    a: "No. I model the machine and the components that a service process has to identify, maintain, cover under warranty or exchange separately as assets; their own serial number, maintenance requirement or warranty are strong signals. Screws, seals and cables stay in the parts list in PLM and are shown when needed."
  - q: "What are asset attributes in Salesforce?"
    a: "AssetAttribute is a standard object that stores attribute values per asset, for example a firmware version or a counter. Each value refers to an attribute definition, so adding a new value does not require a new custom field. Salesforce allows 25 attributes per asset and recommends at most 10 when they drive usage-based maintenance."
  - q: "Who should update assets after a retrofit?"
    a: "Usually the technician who exchanges a serialized assembly records it in the mobile app, and the system of record for the installed base receives the change. Whichever system owns the installed base, there must be one defined process; otherwise, the hierarchy no longer matches the machine."
draft: false
---

A machine builder should create assets only for what a service process has to track separately, typically parts with their own serial number, maintenance requirement or warranty. For most machines that means two or three levels: the line or machine, its serialized main assemblies and perhaps a few bought-in components with their own warranty. Everything else stays in the PLM parts list. Salesforce Field Service allows far more: 50 levels and 10,000 assets per hierarchy. The real limits are reached earlier, in maintenance plans, data upkeep and the tree view, which navigates 20 levels and hierarchies of up to 500 assets.

## What does Salesforce allow?

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets), an asset "represents a specific purchased or installed product". It can be linked to cases, work orders, maintenance plans, entitlements and service contracts, and is usually linked to an account, a contact or both. A hierarchy is built with the Parent Asset field. Trailhead describes asset hierarchies as a way to track related assets, "like components of a machine, as a unit", and shows them in a collapsible tree grid.

The [Field Service limits](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5) in Salesforce Help list the following values for the product now officially called Agentforce Field Service and Operations:

| Limit | Value |
|---|---|
| Child assets per asset | 2,000 |
| Levels in a hierarchy (data model) | 50 |
| Levels navigable in the tree grid | 20 |
| Assets in a hierarchy | 10,000 |
| Hierarchy size for the tree grid action | 500 |

The 20-level navigation limit and the 500-asset hierarchy limit are taken from the help article on [asset hierarchies](https://help.salesforce.com/s/articleView?id=service.assets_rel_hierarchical.htm&language=en_US&type=5); larger hierarchies can still be accessed through the Child Assets related list and the Parent Asset, Root Asset and Asset Level fields. The hierarchy view is not available in the Field Service mobile app.

When one component replaces another, an asset relationship records it, for example with the type Upgrade. It does not by itself move the new asset into the parent hierarchy or retire the old one; that needs a defined process or automation.

## Which components should become assets?

My rule of thumb has three questions. Each "yes" is a strong signal; the deciding factor is whether a Salesforce service process has to identify, maintain, cover under warranty or exchange that installed unit separately:

- **Does it have its own serial number?** For example, a bought-in gearbox, a robot or a control cabinet with a type plate. The technician has to record which unit was installed or exchanged.
- **Does it have its own maintenance?** For example, a spindle with its own interval in operating hours or a filter unit with its own inspection. Maintenance work rules are attached to assets, so the component needs one.
- **Does it have its own warranty?** For example, a supplier part with a warranty that starts on a different date from the machine warranty. Without its own asset, nobody can tell whether the claim goes to the supplier.

Everything else stays in the parts list: screws, seals, cables, standard parts. The technician still needs to find them, but that is a question for PLM and the spare parts catalog. In [spare parts by serial number](../spare-parts-by-serial-number-ai/) I recommend the same split: Salesforce holds the machine and its service-relevant main assemblies, the full as-built parts list stays in PLM and is read live.

## Fields or asset attributes for machine data?

Machine series differ. One has a firmware version and a counter for strokes, the next has a laser source with hours and a coolant type. If every series receives its own custom fields on the asset, the object grows with every new product line.

The [AssetAttribute object](https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_assetattribute.htm) "stores asset attributes to track and analyze asset conditions to improve their uptime". Each record links an asset to an attribute definition and stores a value, including picklist values when the attribute is a picklist. New attributes need a new definition, not a new field.

Attributes have limits, according to the [considerations](https://help.salesforce.com/s/articleView?id=fs_asset_attrib_manage_monit_consider.htm&language=en_US&type=5): 25 per asset, and at most 10 recommended when usage-based maintenance creates work orders from them. Validation rules, record types and history tracking are not supported. And briefcases for offline priming [do not include asset attributes](https://help.salesforce.com/s/articleView?id=service.wfs_mobile_work_with_performance_priming.htm&language=en_US&type=5), so technicians need a connection to read them.

I use attributes for descriptive values that vary by series. For a few counters, such as operating hours, that matter across all series, need validation or history, or have to be readable offline, I prefer a number field on the asset. Usage-based maintenance can work with either. How that works in detail is in [usage-based maintenance in Field Service](../field-service-usage-based-maintenance/).

## Who keeps the hierarchy current?

At delivery, the installed base is taken from the system that holds the serial-specific configuration, often the ERP, sometimes MES, PLM or a configurator: machine, serial numbers of the main assemblies, customer, site, delivery date. That load is the easy part. The hard part starts a year later, when a technician exchanges a gearbox, a customer retrofits a second robot or a dealer moves the machine to another plant.

Without a defined process, the Salesforce hierarchy then shows the machine as delivered, and nobody trusts it. These questions need to be answered before go-live:

1. **Who records an exchanged assembly?** In my view, the technician should record it in the mobile app, including the serial number of the new unit, because they can physically verify it.
2. **Which system leads afterwards?** If the ERP stays the master for the installed base, the change from the app has to flow back to the ERP. If Salesforce leads after delivery, the ERP receives a copy. Both work. A mixed model works only with explicit ownership for each data domain and change event, plus rules for conflicts and reconciliation. This is the same ownership question as in [master data for scheduling](../salesforce-field-service-master-data/), and it should be addressed in the interface design described on the [Salesforce integration](../../services/salesforce-integration/) page.
3. **What about retrofits by dealers or the customer?** If a dealer exchanges a component and reports only warranty cases, the hierarchy has gaps. That also undermines every later analysis, as described in [predictive maintenance in Salesforce: what data you need](../predictive-maintenance-salesforce-data-needed/).

Field Service can store warranty terms and asset warranties. Partner claim capture, adjudication and supplier recovery are part of Warranty Lifecycle Management in Manufacturing Cloud, with its own licensing, and are covered in the [warranty and after-sales chapter](../../masterclass/manufacturing-cloud/warranty-and-after-sales/) of that masterclass.

## Every extra asset costs you later

Each asset may seem inexpensive when the data is loaded once. It creates costs later in three places, and the number of service-relevant assets matters more than the depth alone:

```kennzahlen
2,600 | Assets per maintenance plan as a practical limit
1,300 | Assets per plan with two maintenance work rules per asset
500 | Assets above which the tree view no longer shows the hierarchy
source: Salesforce Help, Field Service limits
```

- **Maintenance plans.** Salesforce Help gives a practical limit of 2,600 assets per plan, and fewer than 1,300 with two maintenance work rules per asset, because a plan run can create at most 2,600 work order records. Child assets without a maintenance plan do not count, but if every component is a maintenance asset, plans reach their limit quickly.
- **The tree view.** Above 500 assets the View Asset Hierarchy action is not available, and it navigates only 20 levels. A line with 900 parts modeled as assets is then hard for the back office to read.
- **The mobile app.** What the technician's device loads depends on the briefcase rules, not automatically on the whole hierarchy. Still, every asset you prime adds data that has to stay in step offline, so I would test load times with a real machine before loading parts onto every tablet.

The same applies to dealer portals: every asset a dealer may see has to be shared correctly, as described in the [spare parts shop per machine](../spare-parts-shop-parts-per-machine/).

## Worked example: a packaging line

All numbers are assumptions. A packaging machine builder delivers a line with 6 machines. The line contains 40 serialized assemblies, such as servo drives, robots and labeling units, and around 900 other parts.

**Full copy.** If the line, machines, assemblies and parts are modeled as assets, the result is about 947 records per line. That is well within the 10,000 limit, but above the 500-asset limit for the tree grid action, and 900 records per line have to stay synchronized with PLM.

**Recommended depth.** The line is modeled as the top asset, because the service contract covers it as a whole. Below it are the 6 machines, and below those are the 40 serialized assemblies: 47 assets in three levels. Twelve assemblies with their own intervals receive maintenance work rules. The 900 parts stay in PLM and appear on the machine page or in the agent interface when someone needs them.

With 50 lines in the field, that is 2,350 assets instead of about 47,000, and every one of them contains information that the service organization uses.

## Run one machine type through the rule of thumb

Take one machine type and go through its bill of materials with the rule of thumb: serial number, its own maintenance requirement, its own warranty, and whether a service process has to track the unit separately. Write down the resulting levels and count the assets per machine. Then decide who records an exchanged assembly and which system is authoritative after delivery, before the first load from the ERP. The [masterclass chapter on assets, maintenance and parts](../../masterclass/field-service/field-service-assets-maintenance-parts/) shows how the hierarchy connects to maintenance plans, spare parts and service partners.
