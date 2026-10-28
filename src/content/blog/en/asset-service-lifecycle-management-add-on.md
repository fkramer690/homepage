---
title: "Asset Service Lifecycle Management: worth the add-on?"
description: "What the $75 Asset Service Lifecycle Management add-on and Connected Assets add to Field Service, what the core licence covers and when they pay off."
pubDate: 2026-10-28
lang: en
slug: asset-service-lifecycle-management-add-on
translationKey: asset-service-lifecycle-management-addon
topic: field-service
categories: [field-service, manufacturing-cloud]
contactBrief: licences
tags: [field service, asset management, licences, warranty, connected assets]
takeaways:
  - "Asset Service Lifecycle Management costs $75 per user and month, Connected Assets $15,000 per org and month (Field Service price list, October 2026)."
  - "Assets, asset hierarchies, maintenance plans, service contracts and entitlements are part of core Field Service. The add-on adds workflows on top, such as coverage selection, repair quotes, recalls and depot repair."
  - "The price list marks the Asset Coverage View and the interactive hierarchy as available for purchase, even for Agentforce 1 Field Service."
  - "Several add-on functions, such as inventory counts and replenishment, overlap with the ERP. If SAP owns stock, they add little."
  - "Warranty claims, recalls and product service campaigns also exist in Manufacturing Cloud. Decide which product owns them before you buy both."
faq:
  - q: "What is Asset Service Lifecycle Management in Salesforce?"
    a: "It is a paid add-on for Field Service and several industry clouds. Salesforce Help lists functions such as the Asset Coverage View, an interactive asset hierarchy, work order estimation, product service campaigns, depot repair, advanced exchange, inventory functions and timesheets."
  - q: "How much does Asset Service Lifecycle Management cost?"
    a: "According to the Field Service price list of October 2026 it costs $75 per user and month, billed annually; the price list shows the add-ons in US dollars only. Connected Assets is priced separately at $15,000 per org and month."
  - q: "Is Asset Service Lifecycle Management included in Agentforce 1 Field Service?"
    a: "Not according to the comparison table on the price list. It marks the Asset Coverage View and Interactive Hierarchy as available for purchase for Dispatcher, Technician, Field Service Plus and Agentforce 1 Field Service. Confirm it in your quote."
  - q: "Do I need Connected Assets for usage-based maintenance?"
    a: "No. Maintenance plans with usage-based work rules are part of core Field Service. An operating hours counter written to the asset once a day from the ERP or IoT platform is enough. Connected Assets adds connectors, real-time telemetry and the Asset Health Score."
draft: false
---

Asset Service Lifecycle Management (ASLM) is an add-on for Salesforce Field Service at $75 per user and month, according to the price list of October 2026. It adds workflows around the installed base: a coverage view per asset, an interactive asset hierarchy, repair quotes, recall campaigns, depot repair, inventory functions and timesheets. Assets, maintenance plans, service contracts and entitlements are already in the core licence. Connected Assets is a separate add-on at $15,000 per org and month for telemetry. I would buy ASLM when you quote repairs, run recalls or repair parts in a depot. For maintenance plans alone, the core licence is enough.

## What does Asset Service Lifecycle Management include?

Salesforce sells Field Service today as Field Service and Operations. The [price list](https://www.salesforce.com/service/field-service-management/pricing/) shows two asset add-ons: Asset Service Lifecycle Management at $75 per user and month and Connected Assets at $15,000 per org and month. Both were [announced in June 2024](https://www.salesforce.com/news/stories/field-service-asset-management-news/) as separate add-ons. The [asset management page](https://www.salesforce.com/service/field-service-management/asset-management/) describes ASLM in marketing terms, so I took the function list from the [ASLM section in Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.aslm_asset_service_lifecycle_management.htm&type=5):

| Function | What it does according to Help | Who uses it at a machine builder |
|---|---|---|
| Asset Coverage View | Lists the entitlements of an asset, including maintenance plans, warranties and service contracts | Hotline, back office |
| Asset Interactive Hierarchy | Shows complex assets and their child assets as a navigable tree | Hotline, technicians |
| Work Order Estimation | Estimates cost and effort before work starts and produces quotes | Back office, sales |
| Product Service Campaign | Services, recalls or upgrades products at scale | Service management, quality |
| Depot Repair | Creates work orders from return order lines for repairs in a depot | Repair centre |
| Advanced Exchange and Service Parts Return | Handles return and replacement of defective parts | Parts desk |
| Inventory functions | Allocation, batches, search and transfer, counts, replenishment | Warehouse, technicians |
| Timesheets and Labor Cost Optimization | Timesheets with labour rules | Technicians, payroll |
| Agentforce for ASLM | Agent templates for asset service, inventory and upsell | Several roles |

Two details matter for planning. Work Order Estimation runs as a screen flow on top of Omnistudio document generation and Salesforce Pricing, according to the [setup guide](https://help.salesforce.com/s/articleView?id=sf.aslm_woe_setup_configure.htm&language=en_US&type=5). That is a real setup project with pricing procedures and lookup tables. And Help lists the ASLM features as [available with Field Service and several industry clouds](https://help.salesforce.com/s/articleView?id=xcloud.aslm_editions.htm&language=en_US&type=5), Manufacturing Cloud and Automotive Cloud among them, in Enterprise, Unlimited and Developer Editions.

## What is already in the core Field Service licence?

More than many quotes suggest. Assets with parent and child assets, maintenance plans with work rules, service contracts and entitlements belong to every Field Service org. How these three contract objects work together is described in [modelling maintenance contracts](../salesforce-field-service-maintenance-contracts/). Product service campaigns as objects are in the [Field Service setup guide](https://help.salesforce.com/s/articleView?language=en_US&id=sf.fs_setup_product_service_campaigns.htm&type=5) too, with a note for orgs created before Spring '21. And Salesforce's [warranty management data model](https://developer.salesforce.com/docs/platform/data-models/guide/field-service-warranty-management.html) for Field Service and Operations lists warranty terms, product warranty terms and asset warranties.

The add-on therefore buys work done on top of the data model:

- **Coverage at the hotline.** With the [Asset Coverage View](https://help.salesforce.com/s/articleView?id=xcloud.fs_entitlements_use.htm&language=en_US&type=5) an agent filters coverages by parent, child, root or account and links the right one to the case or work order with "Choose Coverage". Without it, someone builds that screen.
- **Quotes before the visit.** A repair estimate that uses entitlements and warranties to decide what the customer pays.
- **Campaigns at scale.** The product page lists automation and execution of service campaigns. Core Field Service gives you the objects, ASLM the tooling to fill them for hundreds of assets.

What surprised me in the [comparison table of the price list](https://www.salesforce.com/service/field-service-management/pricing/): the row "Asset Coverage View and Interactive Hierarchy" says "Available for Purchase" for Dispatcher, Technician, Field Service Plus and even Agentforce 1 Field Service at $650. Even the largest edition does not include it. The asset management page adds that "some editions already include these capabilities", without naming them.

```hinweis offen
Get it clarified in your quote which statement applies to your edition: available for purchase per the price list, or included per the asset management page.
```

## Which ASLM functions does a manufacturer with SAP actually need?

Fewer than the list suggests. Five of the functions deal with stock: allocation, batches, search and transfer, counts and replenishment. In most manufacturing companies I see the ERP as the owner of stock and material master, with Field Service holding a copy for van stock and parts consumed. I explain that split in [spare parts between ERP and Salesforce](../salesforce-field-service-spare-parts-erp/). If SAP plans replenishment and runs inventory counts, the same functions in Salesforce create a second truth.

The functions that usually fit a machine builder are the ones the ERP does not do well on the service side: the coverage view for the hotline, the hierarchy for machines with many assemblies, estimation for repair quotes and campaigns for retrofits. Depot repair fits companies that repair returned assemblies in their own repair centre.

## What does Connected Assets add, and when is $15,000 a month justified?

Connected Assets is the telemetry add-on. The asset management page lists prebuilt connectors, real-time telemetry, an Asset Health Score calculated from age, usage, telemetry and repair history and an "Actionable Telematics Framework". The June 2024 announcement describes the idea: when the health score crosses a threshold, the system can try an automatic fix, such as a firmware update, and open a work order if that fails.

```kennzahlen
$15,000 | Connected Assets per org and month
$180,000 | per org and year at list price
10,000 | connected digital assets per the asset management page
source: Salesforce Field Service price list, October 2026, and asset management page
```

In my view the list price pays off only when a large connected fleet produces signals that should start service work without anyone looking at a dashboard. For most machine builders the first step is smaller. An operating hours counter written once a day from the ERP or the IoT platform is enough for usage-based maintenance plans in core Field Service. Aggregated condition signals through Data 360 cost a fraction of the add-on, as the calculation in [predictive maintenance: what data you need](../predictive-maintenance-salesforce-data-needed/) shows.

## Who owns warranty: Field Service, ASLM or Manufacturing Cloud?

This is the decision I would make before buying anything. The asset management page lists "warranty definition and claims management" under ASLM. Manufacturing Cloud has its own warranty process with warranty terms, dealer claims and supplier recovery, described in [warranty claims from dealers](../warranty-claims-dealers-salesforce/), and Winter '27 adds the [Warranty Claims Adjudication Agent](../warranty-claims-adjudication-agent/). Product service campaigns show up in both products.

My rule of thumb:

- **Dealers submit warranty claims and you recover costs from suppliers.** Manufacturing Cloud owns warranty. The [Manufacturing Cloud chapter on warranty and after-sales](../../masterclass/manufacturing-cloud/warranty-and-after-sales/) covers it.
- **Your own technicians need to see coverage when the visit is booked.** The Asset Coverage View is enough, and claims stay in the ERP.
- **Both apply.** One product owns warranty terms and claims, the other reads them. Two warranty models on the same asset produce two answers to the same customer.

## A typical scenario, as an assumption: a component maker with 30 users

Assume a maker of hydraulic components with SAP as ERP and Field Service for 30 users: 8 people in hotline and back office on Field Service Plus, 4 dispatchers and 18 technicians. Service sells repairs on returned pumps and runs one or two retrofit campaigns a year. All numbers are assumptions.

**Option A, the add-on for everyone.** 30 × $75 × 12 = $27,000 a year at list price. Salesforce does not state on the pages I opened whether every Field Service user needs the add-on, so this is the upper bound. Setup of estimation with pricing procedures and campaigns takes an assumed 20 partner days.

**Option B, core plus own build.** A Lightning component that lists entitlements on the asset page, a repair quote flow with prices from the ERP and campaign items loaded from a spreadsheet. Assume 60 partner days to build and 10 days of upkeep per year, because each release and each change to contracts touches the custom parts.

**The comparison.** At an assumed day rate of $1,200, option A costs $24,000 for setup plus $54,000 in licences over two years, $78,000 in total. Option B costs $72,000 plus $24,000 upkeep, $96,000 in total, and the company owns every bug. The company uses three functions: coverage view, estimation for depot repairs and campaigns. With three functions in use the add-on wins. If only the coverage view were needed, I would ask Salesforce for a quote limited to the hotline users before building anything. How I compare such options is part of [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

## Where should you start?

1. **List your asset processes**: coverage check at the hotline, repair quotes, recalls and retrofits, depot repair, van stock counts.
2. **Mark the owner of each process**: core Field Service, ASLM, Manufacturing Cloud or the ERP.
3. **Ask Salesforce three questions in writing**: which users need the add-on, whether your edition already includes parts of it, and whether your Manufacturing Cloud licence covers the same functions.
4. **Keep Connected Assets for later**, until daily counters and a few aggregated signals show that real-time telemetry would change service decisions.

How assets, maintenance and parts fit together is the topic of the [Field Service masterclass chapter on assets, maintenance and parts](../../masterclass/field-service/field-service-assets-maintenance-parts/).

Asset Service Lifecycle Management pays off when you use at least a few of its workflows, and rarely for maintenance plans alone. If you want an independent look at your asset processes before the quote is signed, [send me a message](#contact).
