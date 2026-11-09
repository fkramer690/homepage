---
title: "Installed base in Manufacturing Cloud: asset data"
description: "Which asset data Manufacturing Cloud needs before warranty, recalls and agents work: serial numbers, asset milestones, participants, fleets and data owners."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: installed-base-asset-milestones
translationKey: manufacturing-cloud-installed-base-assets
topic: service
categories: [manufacturing-cloud, field-service]
tags: [Manufacturing Cloud, installed base, assets, warranty, serial numbers, after-sales]
takeaways:
  - "Asset milestones exist since API 58.0. They record events such as manufacturing, registration or resale with date, stage and source system."
  - "Participants link several companies and people to one machine, and fleets group the machines of one customer."
  - "ERP, dealer registration and commissioning each know a part. Every field needs an owner before the first claim is checked."
  - "Maintenance plans belong to Field Service. Connected Assets lists at $15,000 per org and month as an add-on; Field Service Max includes it."
faq:
  - q: "What is an asset milestone in Manufacturing Cloud?"
    a: "An asset milestone records a key event in the lifecycle of an asset, such as manufacturing, registration or resale. It holds the date, a stage (Active, Expired or Tentative), a location and the name and ID of the source system. The object is available from API version 58.0."
  - q: "Which asset data does warranty checking in Salesforce need?"
    a: "To identify the machine: serial number, product and owning account. To check coverage: an asset warranty with start and end date from the warranty term, and the fault date on the claim item. The start date is the purchase or installation date depending on your terms. If your warranty is limited by usage, you also need operating hours or cycles per asset."
  - q: "What is a fleet in Manufacturing Cloud?"
    a: "A fleet is a group of assets used in commercial, service or transport operations. It has an owner account, a location, a type, a status and can sit in a hierarchy. Fleet asset records link machines to the fleet with start and end dates and usage."
  - q: "Do I need Connected Assets for an installed base in Salesforce?"
    a: "No. Assets, milestones, participants and fleets are records you load from the ERP, the dealer portal and commissioning. Connected Assets adds telemetry; the add-ons page lists it at $15,000 per org and month, billed annually, and Field Service Max includes it."
draft: false
---

Before warranty checks, recalls or an agent can work in Manufacturing Cloud, every machine needs one asset record with serial number, product, owning account, location and the date that starts the warranty. Manufacturing Cloud adds three things on top: asset milestones for lifecycle events, account and contact participants for everyone involved with a machine, and fleets for customers with many machines. The data model is the easy part. The hard part is the source, because ERP delivery, dealer registration and commissioning each know a piece of the truth. I would settle who owns which field before the first warranty claim is checked.

## What does Manufacturing Cloud need to know about each machine?

The asset is the anchor of everything in after-sales. The [Manufacturing Cloud service page](https://salesforce.com/manufacturing/cloud/service) describes the Asset Service Console as the place to capture "serial number and associated contacts" and to see "warranties, cases, work orders, and claims tied to an asset". Each of those records relates to the asset, directly or, like claims through their claim items, indirectly. Without a correctly identified asset, coverage checks, recalls and agent answers become incomplete.

The minimum per machine, in my view:

- **Serial number.** The business key that ERP, PLM, dealers and Salesforce all recognize. As the technical integration key I would keep the source system's asset ID and define a uniqueness rule, such as product plus serial number.
- **Product.** The machine type, so warranty terms and campaigns can select by product.
- **Owning account and location.** Who operates the machine and where it stands.
- **Warranty start date.** The purchase or installation date, depending on your terms. [Warranty claims from dealers](../warranty-claims-dealers-salesforce/) shows how the asset warranty uses it.
- **Usage**, if your warranty is limited by operating hours or cycles.

Main assemblies can sit below the machine as child assets. How that hierarchy helps with spare parts is covered in [spare parts by serial number](../spare-parts-by-serial-number-ai/).

## What do asset milestones record?

An asset milestone is a dated event in the life of one machine. The [AssetMilestone reference](https://developer.salesforce.com/docs/atlas.en-us.264.0.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_assetmilestone.htm) describes it as "the key events in the lifecycle of an asset, such as manufacturing, registration, or resale". The object is available from API 58.0 and hangs master-detail on the asset. Its fields:

| Field | What it holds |
|---|---|
| MilestoneDate, ExpiredDate | When the event happened and when it stops counting |
| MilestoneType | The kind of event; the reference lists no values, so you define them |
| Stage, StageComment | Active, Expired or Tentative, with a reason, for example why a date is still tentative |
| Address, Location | Where the event happened |
| SourceSystemName, SourceSystemIdentifier | Which system reported the event, and its ID there |

Two fields matter most to me. The source system fields make every date traceable: you can see whether the delivery date came from the ERP or was typed in by a dealer. And the Tentative stage fits a common gap: the dealer reports a handover date that nobody has confirmed yet.

Milestones are history, though. The warranty start date should still be one value, the start date on the asset warranty (mirrored on the asset only if you need it there), derived by a written rule such as "installation milestone, otherwise delivery plus 90 days". Otherwise every adjudicator picks a different milestone.

## Manufacturer, dealer, operator and service partner all hang on one machine

The manufacturer builds it, a dealer sells it, a customer operates it, a service partner maintains it. Manufacturing Cloud links these parties to the machine with two junction objects, both available from API 59.0 in its developer guide:

- **Asset account participant** links an account to an asset. The [reference](https://developer.salesforce.com/docs/atlas.en-us.246.0.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_assetaccountparticipant.htm) lists "Customer" as a stakeholder role.
- **Asset contact participant** links a contact to an asset. The [reference](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_assetcontactparticipant.htm) lists "Service Manager" as the role.

```hinweis achtung
Both role fields are restricted picklists with very short value lists in the documentation. Check in a sandbox whether you can add roles such as dealer or service partner before you design the portal sharing around them.
```

For customers with many machines there are fleets. The [Fleet reference](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_fleet.htm) describes "a group of assets used in commercial, service, or transport operations in the manufacturing industry", with an owner account, a location, a parent fleet, a status and the types Commercial, Employee, Executive and Material. The [fleet asset](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/sforce_api_objects_fleetasset.htm) record links a machine to a fleet with start and end dates and holds its usage with a unit of measure. That suits a rental company or a logistics customer with forklifts at several sites.

## The asset data comes from three places

None of them knows everything. A worked example with assumed numbers: a machine builder sells 6,000 machines a year, mostly through 50 dealers. The ERP knows the serial number, the product, the build date and the dealer it shipped to. It does not know the end customer.

| Data | Source | Owner |
|---|---|---|
| Serial number, product, build date | ERP delivery or production | ERP |
| Dealer that received the machine | ERP delivery | ERP |
| End customer, handover date | Dealer registration in the portal | Dealer enters, manufacturer checks |
| Installation date, location | Commissioning report | Service |
| Operating hours | Dealer, customer or telemetry | Depends on the warranty terms |

In this scenario the warranty start date depends on the dealer. If registration is optional, a large share of machines has no start date, and every claim on them turns into a manual check. I would make registration a required step in the portal, ideally tied to something the dealer wants, such as the first warranty claim being accepted only for registered machines. Which license dealers need for that is covered in [the Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/).

The owner column is the actual work. Write it down per field, as in the [object ownership matrix](../salesforce-object-ownership-matrix/), and plan the ERP interface accordingly. I help with that under [Salesforce integration](../../services/salesforce-integration/).

## What does the Asset Service Console show?

Everything that hangs on one machine. According to the service page, it shows "alerts, milestones, and service history" for an asset, plus its warranties, cases, work orders and claims. The [Trailhead overview](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) calls it a workspace "to manage cases, assets, warranties, and service histories".

A console only looks as complete as the data behind it. The same is true for the [Warranty Claims Adjudication Agent](../warranty-claims-adjudication-agent/): it relies on asset, warranty and claim data like a person does, just without asking when they are missing. That article suggests a simple test: count how many serial numbers from last year's claims exist as assets with a start date.

## Field Service begins at the work order

Assets, milestones, participants and fleets are shared ground. Maintenance plans, work orders, service appointments and technician stock belong to Field Service, covered in the [Field Service masterclass chapter on assets and maintenance](../../masterclass/field-service/field-service-assets-maintenance-parts/) and in [maintenance contracts](../salesforce-field-service-maintenance-contracts/). Design the asset model once for both, not per project.

Two add-ons often come up here. According to the [add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/), Connected Assets costs $15,000 per org and month, billed annually, and brings telemetry; Asset Service Lifecycle Management costs $75 per user and month, available with Field Service editions (Field Service Max includes both ASLM and Connected Assets, according to the Field Service pricing page). Neither is needed for a clean installed base. Whether telemetry pays off is covered in [predictive maintenance in Salesforce](../predictive-maintenance-salesforce-data-needed/).

## Count the gaps in last year's warranty claims

```schritte
Count the gaps
  Take last year's warranty claims and check how many serial numbers exist as assets with owner and start date.
Write the start date rule
  Which milestone starts the warranty, and what applies when it is missing.
Assign owners per field
  ERP, dealer or service, one per field.
Define milestone types
  Delivery, registration, installation, resale, scrapping: only those someone will actually maintain.
Make registration required
  As a fixed step in the dealer process.
```

The ratio from the first step, serial numbers with owner and start date divided by all claims, is the number I measure the project by. The full after-sales picture is in the [warranty and after-sales chapter](../../masterclass/manufacturing-cloud/warranty-and-after-sales/) of the Manufacturing Cloud masterclass.
