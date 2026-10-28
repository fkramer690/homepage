---
title: "Field Service asset hierarchy: how deep for a machine?"
description: "How deep a machine builder should model machines, assemblies and components as assets in Salesforce Field Service, which limits apply and who keeps the tree current."
pubDate: 2026-10-28
lang: en
slug: field-service-asset-hierarchy-machines
translationKey: field-service-asset-hierarchy
topic: field-service
categories: [field-service, architecture]
tags: [field service, assets, installed base, asset hierarchy, PLM, ERP]
takeaways:
  - "Salesforce allows 2,000 child assets per asset, 50 levels and 10,000 assets per hierarchy, but the tree grid view shows only hierarchies up to 500 assets."
  - "Rule of thumb: an asset for everything with its own serial number, its own maintenance or its own warranty. Everything else stays in the PLM parts list."
  - "Asset attributes store measured values and states per asset, so you do not need new custom fields for every machine series."
  - "The installed base comes from the ERP at delivery. Who updates it after a retrofit or an exchanged assembly must be decided before go-live, or the tree goes stale."
  - "Every extra level weighs on maintenance plans, data loads and the mobile app, so keep the hierarchy as flat as service allows."
faq:
  - q: "How many levels can a Salesforce asset hierarchy have?"
    a: "According to the Field Service limits in Salesforce Help, up to 50 levels, 2,000 child assets per asset and 10,000 assets per hierarchy. The tree grid view displays hierarchies of up to 500 assets."
  - q: "Should every part of a machine become an asset?"
    a: "No. I model as assets the machine and the components with their own serial number, maintenance or warranty. Screws, seals and cables stay in the parts list in PLM and are shown when needed."
  - q: "What are asset attributes in Salesforce?"
    a: "AssetAttribute is a standard object since API version 57.0 that stores attribute values per asset, for example a firmware version or a counter. Each value refers to an attribute definition, so new values need no new custom field."
  - q: "Who should update assets after a retrofit?"
    a: "Usually the technician who exchanges a serialised assembly records it in the mobile app, and the ERP receives the change. Whoever owns it, it has to be one defined process, otherwise the hierarchy no longer matches the machine."
draft: false
---

A machine builder should model as assets only what has its own serial number, its own maintenance or its own warranty. For most machines that means two or three levels: the line or machine, its serialised main assemblies and perhaps a few bought-in components with their own warranty. Everything else stays in the PLM parts list. Salesforce Field Service allows far more: 2,000 child assets per asset, 50 levels and 10,000 assets per hierarchy. The real limits come earlier, from maintenance plans, data upkeep and the tree view, which shows hierarchies of up to 500 assets.

## What does Salesforce allow?

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field_service_maint/field_service_maint_assets), an asset "represents a specific purchased or installed product". It can be linked to cases, work orders, maintenance plans, entitlements and service contracts, and every asset must be linked to an account, a contact or both. A hierarchy is built with the Parent Asset field. Trailhead describes asset hierarchies as a way to track related assets, "like components of a machine, as a unit", and shows them in a collapsible tree grid.

The [Field Service limits](https://help.salesforce.com/s/articleView?id=service.fs_limits.htm&language=en_US&type=5) in Salesforce Help:

| Limit | Value |
|---|---|
| Child assets per asset | 2,000 |
| Levels in a hierarchy | 50 |
| Assets in a hierarchy | 10,000 |
| Hierarchy size shown in the tree grid view | 500 |

When one component replaces another, an asset relationship records it, for example of type Upgrade. The old asset stays with its history and the new one takes its place.

## Which components should become assets?

My rule of thumb has three questions. If one of them is answered yes, the component becomes an asset:

- **Does it have its own serial number?** A bought-in gearbox, a robot or a control cabinet with a type plate. The technician has to record which unit was installed or exchanged.
- **Does it have its own maintenance?** A spindle with its own interval in operating hours, a filter unit with its own inspection. Maintenance work rules hang on assets, so the component needs one.
- **Does it have its own warranty?** A supplier part with a warranty that starts at a different date than the machine. Without its own asset, nobody can tell whether the claim goes to the supplier.

Everything else stays in the parts list: screws, seals, cables, standard parts. The technician still needs to find them, but that is a question for PLM and the spare parts catalogue. In [spare parts by serial number](../spare-parts-by-serial-number-ai/) I recommend the same split: Salesforce holds the machine and its service-relevant main assemblies, the full as-built parts list stays in PLM and is read live.

## Fields or asset attributes for machine data?

Machine series differ. One has a firmware version and a counter for strokes, the next has a laser source with hours and a coolant type. If every series gets its own custom fields on the asset, the object grows with every new product line.

The [AssetAttribute object](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/sforce_api_objects_assetattribute.htm), available since API version 57.0, "stores asset attributes to track and analyze asset conditions to improve their uptime". Each record links an asset to an attribute definition and stores a value, with picklist values where the attribute is a picklist. New attributes need a new definition, not a new field.

I use attributes for descriptive values that vary by series. For counters that drive maintenance plans and reports across all series, such as operating hours, I prefer a number field on the asset, because filter criteria for maintenance rules cannot use every field type. How that works in detail is in [usage-based maintenance in Field Service](../field-service-usage-based-maintenance/).

## Who keeps the hierarchy current?

The installed base usually comes from the ERP at delivery: machine, serial numbers of the main assemblies, customer, site, delivery date. That load is the easy part. The hard part starts a year later, when a technician exchanges a gearbox, a customer retrofits a second robot or a dealer moves the machine to another plant.

Without a defined process, the Salesforce hierarchy then shows the machine as delivered, and nobody trusts it. Three questions decide it:

1. **Who records an exchanged assembly?** In my view, the technician in the mobile app, with the serial number of the new unit, because they have it in their hands.
2. **Which system leads afterwards?** If the ERP stays the master for the installed base, the change from the app has to go back to the ERP. If Salesforce leads after delivery, the ERP gets a copy. Both work, a mix does not. This is the same ownership question as in [master data for scheduling](../salesforce-field-service-master-data/), and it belongs in the interface design on the [Salesforce integration](../../services/salesforce-integration/) page.
3. **What about retrofits by dealers or the customer?** If a dealer exchanges a component and reports only warranty cases, the hierarchy has gaps. That also hurts every later analysis, as described in [predictive maintenance in Salesforce: what data you need](../predictive-maintenance-salesforce-data-needed/).

Warranty claims on the installed base belong to Manufacturing Cloud and are covered in the [warranty and after-sales chapter](../../masterclass/manufacturing-cloud/warranty-and-after-sales/) of that masterclass.

## Why does a deep hierarchy cost you later?

Each level looks cheap when the data is loaded once. It costs later, in three places:

- **Maintenance plans.** Help gives a practical limit of 2,600 assets per plan, and less than 1,300 with two maintenance work rules per asset. If every component is a maintenance asset, plans fill up fast.
- **The tree view.** Above 500 assets the hierarchy can no longer be displayed in the tree grid. A line with 900 parts as assets is then unreadable for the back office.
- **The mobile app.** The technician's device loads the records belonging to their jobs. In my view, every additional record per machine adds to load time and to the data that has to stay in step offline, so I would rather leave a part in PLM than carry it onto every tablet.

The same applies to dealer portals: every asset a dealer may see has to be shared correctly, as in the [spare parts shop per machine](../spare-parts-shop-parts-per-machine/).

## A typical scenario, as an assumption: a packaging line

A typical scenario, as an assumption: a packaging machine builder delivers a line with 6 machines. They contain 40 serialised assemblies, such as servo drives, robots and labelling units, and around 900 other parts.

**Full copy.** Line, machines, assemblies and parts as assets: about 947 records per line. That is well within the 10,000 limit, but above the 500 the tree grid can show, and 900 records per line have to stay in step with PLM.

**Recommended depth.** The line as the top asset, because the service contract covers it as a whole. Below it the 6 machines, below those the 40 serialised assemblies: 47 assets in three levels. Twelve assemblies with their own intervals get maintenance work rules. The 900 parts stay in PLM and appear on the machine page or in the agent when someone needs them.

With 50 lines in the field that is 2,350 assets instead of about 47,000, and every one of them carries information that service uses.

## Where should you start?

Take one machine type and go through its bill of materials with the three questions: serial number, own maintenance, own warranty. Write down the resulting levels and count the assets per machine. Then decide who records an exchanged assembly and which system leads after delivery, before the first load from the ERP. The [masterclass chapter on assets, maintenance and parts](../../masterclass/field-service/field-service-assets-maintenance-parts/) shows how the hierarchy connects to maintenance plans, spare parts and service partners.

The right depth is the one service actually uses, usually three levels and far fewer assets than the parts list. If you want to check your installed base model before the ERP load, [send me a message](#contact).
