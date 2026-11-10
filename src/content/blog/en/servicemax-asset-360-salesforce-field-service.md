---
title: "ServiceMax Asset 360: worth adding to Field Service?"
description: "ServiceMax Asset 360 adds asset functions to Salesforce Field Service. What it does, what it requires and where it overlaps with Salesforce's own add-on."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: servicemax-asset-360-salesforce-field-service
translationKey: servicemax-asset-360
topic: field-service
categories: [field-service]
contactBrief: licences
tags: [field service, ServiceMax, Asset 360, PTC, entitlements, asset management]
takeaways:
  - "Asset 360 builds on Field Service standard objects and adds its own fields and objects. PTC requires Service Cloud and a Field Service license."
  - "Its core is an entitlement engine that picks the right warranty or service contract on cases, work orders and return orders, interactively or by rule."
  - "Salesforce lists Asset Service Lifecycle Management at $75 per user per month. It overlaps on coverage, hierarchy, campaigns and depot repair."
  - "Asset 360 had two major releases in 2026, most recently 26R2 on September 9. Starting in 2027, PTC is moving ServiceMax to a quarterly schedule."
  - "PTC Asset 360, a separate product from ServiceMax Asset 360, has been called PTC Orbit since June 2026. Check which product any quote refers to."
faq:
  - q: "What is ServiceMax Asset 360?"
    a: "A managed package from PTC for Salesforce Field Service. It adds entitlement checks, maintenance plans based on time, condition or IoT data, technical attributes and guided workflows in the Field Service mobile app. It extends Salesforce standard objects such as WorkOrder and adds its own objects."
  - q: "Do I need Salesforce Field Service for Asset 360?"
    a: "Yes. According to PTC's service description from February 2025, the customer needs Service Cloud, at least one Field Service license and an active Salesforce agreement."
  - q: "Is ServiceMax Asset 360 the same as PTC Asset 360?"
    a: "No. PTC Asset 360, now called PTC Orbit, is a separate product that combines asset data from PLM, ERP, CRM and field service. ServiceMax Asset 360 for Salesforce is the field service package on Salesforce."
  - q: "How much does ServiceMax Asset 360 cost?"
    a: "PTC does not publish a price. The AppExchange listing says from $50 per user and month but was last updated in 2022. PTC licenses Asset 360 per registered user, so ask for a quote, confirm which users count and add the Field Service licenses."
draft: false
---

ServiceMax Asset 360 is a managed package from PTC that adds asset functions to Salesforce Field Service: an entitlement engine, maintenance plans based on time, condition or IoT data, technical attributes and more than 60 packaged process flow templates and transactions. It builds on Salesforce standard objects, adds its own fields and objects, and requires Service Cloud and at least one Field Service license. Salesforce sells its own add-on for similar tasks, Asset Service Lifecycle Management. I would look at Asset 360 when its entitlement logic, its ready-made templates or PTC systems tip the balance, and otherwise evaluate the Salesforce add-on first.

## What is ServiceMax Asset 360 for Salesforce?

ServiceMax has two Salesforce-based offerings that matter for this comparison (FieldFX, for oil and gas services, is a third). ServiceMax Core brings its own data model; I compare it with Salesforce Field Service in [ServiceMax vs Salesforce Field Service: which one?](../servicemax-vs-salesforce-field-service/). Asset 360 takes the other route. The [AppExchange listing](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000FN7u3UAD) describes it as natively built on Salesforce Field Service, and PTC's documentation shows how: the [work order](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/work-order-object.html) is the standard WorkOrder object, and Asset 360 adds its own fields with the `SVMXA360` namespace, plus its own objects for maintenance plans, technical attributes, entitlement history and configuration.

For you this means: dispatchers keep planning with Salesforce's scheduling engine, technicians keep working in the Salesforce Field Service mobile app. Asset 360 puts its workflows on top. The requirements are in the [ServiceMax SaaS Service Description](https://ptc-p-001.sitecorecontenthub.cloud/api/public/content/44a3614523d341ccb446db0c1b052c62?v=b6f25473) from February 1, 2025: Service Cloud, at least one Field Service license and an active Salesforce agreement for the whole term.

```zeitleiste
2020-09 | Asset 360 for Salesforce launches on AppExchange
2023-01 | PTC completes the acquisition of ServiceMax
2024-03 | Release 24R1 brings workflows into the Field Service app
2026-03 | Release 26R1 (version 14.0)
2026-09 | Release 26R2 (version 15.0)
```

```hinweis tipp
PTC had two products called Asset 360. The other product has been called [PTC Orbit](https://www.ptc.com/en/products/ptc-orbit) since June 2026 and combines asset data from PLM, ERP and field service. Check which one a quote or presentation refers to.
```

## Asset 360 adds an entitlement engine and more than 60 templates

The [product page](https://www.ptc.com/en/products/servicemax/asset-360) names four areas. I checked them against the documentation:

- **Entitlement engine.** According to the [documentation](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/entitlement-management.html) it checks which services the customer is entitled to on cases, work orders and return orders. In interactive mode it lists all matching warranties and service contracts; in automatic mode it picks one by rule. If an asset has both a warranty and a contract, you decide which takes priority. One limit is stated explicitly: the engine does not handle entitlements linked directly to an account or asset without a service contract.
- **Installed base.** A view of the asset, its subcomponents, service history and contract coverage.
- **Maintenance planning.** Plans based on time, frequency, condition or IoT data, with templates and automatically created work orders.
- **Preconfigured workflows.** PTC names [more than 60 packaged process flow templates and transactions](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/about-servicemax-asset360-suite.html). According to [PTC's blog](https://www.ptc.com/en/blogs/service/continuous-innovation-field-service-servicemax-enhancements), Service Process Manager and wizards have run in the Salesforce Field Service mobile app since release 24R1, with technical attributes available on site. PTC documents a [Windchill integration](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/product-integration.html) for issue reports and product feedback, which it labels Beta, and a Servigistics integration for service parts planning that requires several data flows to be set up.

If you are familiar with the maintenance plans in the base license, the overlap is clear: Field Service can handle maintenance by operating hours, see [usage-based maintenance](../field-service-usage-based-maintenance/). Entitlements overlap too: since Winter '26 Salesforce can [apply entitlements automatically](https://help.salesforce.com/s/articleView?id=service.auto_mapping_entitlements.htm&language=en_US&type=5) to cases, work orders and incidents by rule, but only when the record is created and only for entitlements with an SLA policy. The added value of Asset 360 lies in the scope of its entitlement logic, including return orders and the choice between warranty and contract, and in the ready-made templates.

## Where does Asset 360 overlap with Asset Service Lifecycle Management?

In several places. Salesforce announced Asset Service Lifecycle Management (ASLM) as an add-on in June 2024 and lists it at $75 per user and month, billed annually, as of November 9, 2026, subject to edition and other prerequisites. Besides coverage, hierarchy and campaigns it includes work order estimation, advanced exchange, inventory functions and service parts return, so the overlap is larger than the table shows. What it contains is covered in [Asset Service Lifecycle Management: worth the add-on?](../asset-service-lifecycle-management-add-on/). The comparison is based on both vendors' documents:

| Area | ServiceMax Asset 360 | Salesforce ASLM |
|---|---|---|
| Entitlement check | Engine, interactive and by rule, on case, work order, return | Asset Coverage View with selection on case or work order; base Service Cloud applies entitlements by rule on creation |
| Asset hierarchy | View of subcomponents | Interactive hierarchy |
| Campaigns | Product service campaigns with search by technical attributes | Product service campaigns |
| Returns, depot | Automated return and workshop processes per references | Depot repair, advanced exchange |
| PLM and product feedback | Windchill integration (Beta) | No packaged PLM connector found in public documentation |
| Service parts planning | Servigistics integration with data flows to set up | Inventory functions in ASLM |
| Vendors | PTC and Salesforce | Salesforce |
| Price | Not published | $75 per user and month |

Both use parts of the Field Service data model, but Asset 360 adds managed package fields and objects. If you buy both, you get two solutions for coverage checks in one org. Decide per workflow which one owns it.

## What I have seen with entitlement checks

```praxis
In one Field Service project, entitlements were in scope and influenced prioritization in dispatch. In my projects the ERP always owned spare parts stock, and problems came from the quality of the data.
```

I have not implemented Asset 360 myself. From this experience I derive two checks. First: if your entitlements are attached directly to the asset or account without a service contract today, the engine does not fit without rework, according to the documentation. Second: return and inventory workflows in Asset 360 intersect with an ERP that owns stock. I discuss where to draw that line in [Spare parts between ERP and Salesforce](../salesforce-field-service-spare-parts-erp/).

## A second managed package adds its own release cycle

According to its [release schedule](https://support.ptc.com/help/servicemax_asset360/en/articles/servicemax-asset-360-release-notes/releases.html), Asset 360 had two major releases in 2026: 26R1 on March 5 and 26R2 on September 9, with push upgrades to sandboxes and production in the following weeks. Starting in 2027, PTC [moves ServiceMax to a quarterly schedule](https://support.ptc.com/help/servicemaxcore/en/articles/release_notes/release-schedule.html) with a full stack preview that lists Asset 360; confirm the 2027 dates for the Asset 360 package with PTC. Salesforce ships three times a year. PTC publishes an [assessment of the Salesforce release updates](https://support.ptc.com/help/servicemax_asset360/en/articles/servicemax-asset-360-release-notes/salesforce-release-updates.html) for each round. It covers the managed package, not your customizations, so your team still tests both against every Salesforce release.

Then there are the contract points from the service description. The standard SLA of PTC's master agreement does not apply to the ServiceMax suites; PTC commits to commercially reasonable efforts for availability, with stated exclusions, and Salesforce is responsible for the Salesforce environment. PTC licenses Asset 360 per registered user, and according to the service description everyone who accesses or receives suite data needs a license, regardless of how that access happens. That affects integrations and portals. There is no public price. The AppExchange listing says from $50 per user and month but was last updated in 2022. I would not plan with that figure.

## When is Asset 360 worth it?

In my view, in three cases:

1. **Entitlement logic goes beyond rules on creation.** If the help desk and dispatch need to choose between warranty and contract on cases, work orders and returns, and Salesforce's rule-based assignment is not enough, the engine is the strongest point.
2. **Your PLM and spare parts planning are based on PTC products.** Then the Windchill and Servigistics integrations can be an advantage, once you account for the Beta status and the setup effort.
3. **You want ready-made workflows instead of custom builds.** More than 60 packaged templates and transactions save build time if your processes fit them.

If none of these applies, I would evaluate ASLM first. A single vendor means less coordination, and there is no second managed package with its own release cycle to test.

## List your own asset workflows

1. **List your asset workflows**: coverage checks, maintenance, campaigns, returns, depot.
2. **Check where your entitlements sit today**: on the service contract, the asset or the account.
3. **Request quotes for Asset 360 and ASLM** and ask which users need a license in each case, including users and systems that only receive Asset 360 data. The role logic of Field Service is covered in [Salesforce Field Service licenses by role](../field-service-licences-by-role/).
4. **Calculate both options over three years** including release testing. I describe how I set up such comparisons in [make-or-buy and license forecasts](../../services/make-or-buy-licences/).
