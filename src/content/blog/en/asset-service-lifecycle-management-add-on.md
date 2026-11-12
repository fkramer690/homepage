---
title: "Asset Service Lifecycle Management: worth the add-on?"
description: "What the $75 Asset Service Lifecycle Management add-on and Connected Assets add to Field Service, what the core license covers and when they pay off."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: asset-service-lifecycle-management-add-on
translationKey: asset-service-lifecycle-management-addon
topic: field-service
categories: [field-service, manufacturing-cloud]
contactBrief: licences
tags: [field service, asset management, licenses, warranty, connected assets]
takeaways:
  - "Connected Assets costs $15,000 per org per month. It pays off when real-time events prevent enough downtime, not by fleet size alone."
  - "Assets and maintenance plans are core Field Service; contracts and entitlements come from Service Cloud. The add-on adds coverage view, quotes, recalls."
  - "Since November 2026, the price page has listed ASLM and Connected Assets under Field Service Max, while its table still marks them as available for purchase."
  - "Inventory functions overlap with the ERP. If SAP runs replenishment and counts, use ASLM only for service steps such as reservations and van stock."
  - "Warranty claims, recalls and product service campaigns also exist in Manufacturing Cloud. Decide which product owns them before you buy both."
faq:
  - q: "What is Asset Service Lifecycle Management in Salesforce?"
    a: "It is a paid add-on for Field Service and several industry clouds. Salesforce Help lists functions such as the Asset Coverage View, an interactive asset hierarchy, work order estimation, product service campaigns, depot repair, advanced exchange, inventory functions and timesheets."
  - q: "How much does Asset Service Lifecycle Management cost?"
    a: "Salesforce's add-ons page lists it at $75 per user per month, billed annually, in US dollars, for Field Service editions. Connected Assets is priced separately at $15,000 per org per month. The Field Service price page removed both prices in its 5 November 2026 update."
  - q: "Is Asset Service Lifecycle Management included in Field Service Max?"
    a: "The price page is inconsistent as of 9 November 2026. The summary of Field Service Max at $650 lists Asset Service Lifecycle Management and Connected Assets, while the comparison table still marks their functions as available for purchase. Confirm the entitlement and included capacity in the order form."
  - q: "Do I need Connected Assets for usage-based maintenance?"
    a: "No. Maintenance plans with usage-based work rules are part of core Field Service. An operating hours counter written to the asset once a day from the ERP or IoT platform is enough when a day of delay is acceptable. Connected Assets adds connectors, real-time telemetry and the Asset Health Score."
draft: false
---

Asset Service Lifecycle Management (ASLM) is an add-on for Salesforce Field Service at $75 per user per month, according to Salesforce's add-ons page in November 2026. It adds workflows around the installed base: a coverage view per asset, an interactive asset hierarchy, repair quotes, recall campaigns, depot repair, inventory functions and timesheets. Assets and maintenance plans are already in core Field Service, service contracts and entitlements in Service Cloud. Connected Assets is a separate add-on for telemetry at $15,000 per org per month. I would buy ASLM when you quote repairs, run recalls or repair parts in a depot. For maintenance plans alone, the core license is enough.

## What does Asset Service Lifecycle Management include?

Salesforce now sells Field Service as Field Service and Operations. Until 5 November 2026, the [price list](https://www.salesforce.com/service/field-service-management/pricing/) showed two asset add-ons; today the [Manufacturing Cloud add-ons page](https://www.salesforce.com/manufacturing/cloud/pricing/add-ons/) still lists Asset Service Lifecycle Management at $75 per user per month for Field Service editions and Connected Assets at $15,000 per org per month. Both were [announced in June 2024](https://www.salesforce.com/news/stories/field-service-asset-management-news/) as separate add-ons. The [asset management page](https://www.salesforce.com/service/field-service-management/asset-management/) describes ASLM in marketing terms, so I took the function list from the [ASLM section in Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.aslm_asset_service_lifecycle_management.htm&type=5):

| Function | What it does according to Help | Who uses it at a machine builder |
|---|---|---|
| Asset Coverage View | Lists the entitlements of an asset, including maintenance plans, warranties and service contracts | Hotline, back office |
| Asset Interactive Hierarchy | Shows complex assets and their child assets as a navigable tree | Hotline, technicians |
| Work Order Estimation | Estimates cost and effort before work starts and produces quotes | Back office, sales |
| Product Service Campaign | Services, recalls or upgrades products at scale | Service management, quality |
| Depot Repair | Creates work orders from return order lines for repairs in a depot | Repair center |
| Advanced Exchange and Service Parts Return | Handles return and replacement of defective parts | Parts desk |
| Inventory functions | Allocation, batches, search and transfer, counts, replenishment | Warehouse, technicians |
| Timesheets and Labor Cost Optimization | Timesheets with labor rules | Technicians, payroll |
| Agentforce for ASLM | Agent templates for asset service, inventory and upsell; they need separate Agentforce licenses and credits | Several roles |

Two details matter for planning. Work Order Estimation runs as a configurable flow, according to the [setup guide](https://help.salesforce.com/s/articleView?id=sf.aslm_woe_setup_configure.htm&language=en_US&type=5). Field Service is required; Omnistudio document generation for proposals and Salesforce Pricing for coverage-based discounts are optional. With pricing enabled, it becomes a real setup project with pricing procedures and lookup tables. Help also lists the ASLM features as [available with Field Service and several industry clouds](https://help.salesforce.com/s/articleView?id=xcloud.aslm_editions.htm&language=en_US&type=5), including Manufacturing Cloud and Automotive Cloud, in Enterprise, Unlimited and Developer Editions.

## The core Field Service license includes more than many quotes suggest

Parent and child assets and maintenance plans with work rules are included in every Field Service org; service contracts and entitlements come from the Service Cloud base that Field Service requires. How these three contract objects work together is described in [modeling maintenance contracts](/en/blog/salesforce-field-service-maintenance-contracts/). Product service campaigns are not core, though: the object shows up in the data model, but Salesforce Help says that to [set up and use Product Service Campaign](https://help.salesforce.com/s/articleView?id=sf.aslm_psc_enable_aslm.htm&language=en_US&type=5) you turn on Asset Service Lifecycle Management. And Salesforce's [warranty management data model](https://developer.salesforce.com/docs/platform/data-models/guide/field-service-warranty-management.html) for Field Service and Operations lists warranty terms, product warranty terms and asset warranties.

With the add-on you therefore buy functions that build on the data model:

- **Coverage at the hotline.** With the [Asset Coverage View](https://help.salesforce.com/s/articleView?id=xcloud.fs_entitlements_use.htm&language=en_US&type=5), an agent filters coverages by parent, child, root or account and links the right one to the case or work order with "Choose Coverage". Without it, someone has to build that screen.
- **Quotes before the visit.** A repair estimate that uses entitlements and warranties to decide what the customer pays.
- **Campaigns at scale.** The product page lists automation and execution of service campaigns, from the campaign items to work orders for hundreds of assets.

The editions changed on 5 November 2026. The [price list](https://www.salesforce.com/service/field-service-management/pricing/) now sells Field Service+ Core at $250, Field Service+ Advanced at $450 and Field Service Max at $650, and Field Service Plus and Agentforce 1 Field Service no longer appear on it. The summary of Field Service Max names Asset Service Lifecycle Management and Connected Assets, while the comparison table still marks the row "Asset Coverage View and Interactive Hierarchy" and Connected Assets as "Available for purchase". The asset management page adds that "some editions already include these capabilities", without naming them.

```hinweis offen
Have your order form clarify which statement applies to your edition and what capacity is included: available for purchase per the comparison table, or included per the Field Service Max summary.
```

## A manufacturer with SAP needs only part of ASLM

Five of the functions deal with stock: allocation, batches, search and transfer, counts and replenishment. In most manufacturing companies I see the ERP as the owner of stock and the material master, with Field Service holding a copy for van stock and consumed parts. I explain that split in [spare parts between ERP and Salesforce](/en/blog/salesforce-field-service-spare-parts-erp/). If SAP plans replenishment and runs inventory counts, the same functions in Salesforce risk creating a second source of truth. ASLM can still help with service steps the ERP integration does not cover well, such as reserving parts for a work order, managing van stock and handling returns.

The functions that usually fit a machine builder are the ones the ERP does not do well on the service side: the coverage view for the hotline, the hierarchy for machines with many assemblies, estimation for repair quotes and campaigns for retrofits. Depot repair fits companies that repair returned assemblies in their own repair center.

## What does Connected Assets add, and when is $15,000 a month justified?

Connected Assets is the telemetry add-on. The asset management page lists prebuilt connectors, real-time telemetry, an Asset Health Score calculated from age, usage, telemetry and repair history, and an "Actionable Telematics Framework". The June 2024 announcement describes the idea: when the health score crosses a threshold, the system can try an automatic fix, such as a firmware update, and open a work order if that fails.

```kennzahlen
$15,000 | Connected Assets per org and month
$180,000 | per org and year at list price
10,000 | connected digital assets per the asset management page
source: Salesforce Manufacturing Cloud add-ons page, November 2026, and asset management page
```

In my view the list price pays off only when real-time signals need to trigger service work without anyone looking at a dashboard, and the downtime they prevent is worth $180,000 a year. Fleet size alone does not decide it; ten critical machines can justify more than thousands of uncritical ones. Also ask how many event orchestrations and how much Data 360 consumption the price includes. For most machine builders the first step is smaller. An operating hours counter written once a day from the ERP or the IoT platform is enough for usage-based maintenance plans in core Field Service. A few aggregated condition signals through Data 360 can cost much less than the add-on, depending on consumption and integration, as the calculation in [predictive maintenance: what data you need](/en/blog/predictive-maintenance-salesforce-data-needed/) shows.

## Who owns warranty: Field Service, ASLM or Manufacturing Cloud?

This is the decision I would make before buying anything. The asset management page lists "warranty definition and claims management" under ASLM, but the ASLM section in Help covers coverage for cases, work orders and estimates, not a full claims process. Manufacturing Cloud, now also called Agentforce Manufacturing, has its own warranty process with warranty terms, dealer claims, adjudication and supplier recovery, described in [warranty claims from dealers](/en/blog/warranty-claims-dealers-salesforce/), and Winter '27 introduced the [Warranty Claims Adjudication Agent](/en/blog/warranty-claims-adjudication-agent/). Product service campaigns show up in both products. Ask which SKUs and permission set licenses are required for each step.

My rule of thumb:

- **Dealers submit warranty claims and you recover costs from suppliers.** Manufacturing Cloud owns warranty. The [Manufacturing Cloud chapter on warranty and after-sales](/en/masterclass/manufacturing-cloud/warranty-and-after-sales/) covers it.
- **Your own technicians need to see coverage when the visit is booked.** The Asset Coverage View is enough, and claims stay in the ERP.
- **Both apply.** One product owns warranty terms and claims, the other reads them. Two warranty models on the same asset produce two answers for the same customer.

## Worked example: a component maker with 30 users

Assume a maker of hydraulic components with SAP as ERP and Field Service for 30 users: 8 people in hotline and back office on Field Service+ Core, 4 dispatchers and 18 technicians. The service team sells repairs for returned pumps and runs one or two retrofit campaigns a year. All numbers are assumptions.

**Option A, the add-on for everyone.** 30 × $75 × 12 = $27,000 a year at list price. Salesforce does not state on the pages I reviewed whether every Field Service user needs the add-on, so this is the upper bound. Setting up estimation with pricing procedures and campaigns takes an assumed 20 partner days.

**Option B, core plus a custom build.** This option uses a Lightning component that lists entitlements on the asset page, a repair quote flow with prices from the ERP and campaign items loaded from a spreadsheet. Assume 60 partner days to build and 10 days of upkeep per year, because each release and each contract change can affect the custom components.

**The comparison.** At an assumed day rate of $1,200, option A costs $24,000 for setup plus $54,000 in licenses over two years, $78,000 in total. Option B costs $72,000 plus $24,000 upkeep, $96,000 in total, and the company owns every bug. Under these assumptions option A is $18,000 cheaper over two years, for three functions in use: coverage view, estimation for depot repairs and campaigns. Fewer licensed users, extra dependencies such as Salesforce Pricing or a different build effort would change the result. If only the coverage view were needed, I would ask Salesforce for a quote limited to the hotline users before building anything. How I compare such options is part of [make-or-buy and license forecasts](/en/services/make-or-buy-licences/).

## List your asset processes and decide who owns each

How assets, maintenance and parts fit together is the topic of the [Field Service masterclass chapter on assets, maintenance and parts](/en/masterclass/field-service/field-service-assets-maintenance-parts/). Step 2 below decides whether ASLM or Manufacturing Cloud owns warranty. Before the quote I would proceed like this:

1. **List your asset processes**: coverage check at the hotline, repair quotes, recalls and retrofits, depot repair, van stock counts.
2. **Mark the owner of each process**: core Field Service, ASLM, Manufacturing Cloud or the ERP.
3. **Ask Salesforce three questions in writing**: which users need the add-on, whether your edition, for example Field Service Max, already includes it and what capacity is included, and whether your Manufacturing Cloud license covers the same functions.
4. **Keep Connected Assets for later**, until daily counters and a few aggregated signals show that real-time telemetry would change service decisions.
