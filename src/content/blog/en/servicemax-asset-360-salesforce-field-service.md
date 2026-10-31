---
title: "ServiceMax Asset 360: worth adding to Field Service?"
description: "ServiceMax Asset 360 adds asset functions to Salesforce Field Service. What it does, what it requires and where it overlaps with Salesforce's own add-on."
pubDate: 2026-10-29
lang: en
slug: servicemax-asset-360-salesforce-field-service
translationKey: servicemax-asset-360
topic: field-service
categories: [field-service]
contactBrief: licences
tags: [field service, ServiceMax, Asset 360, PTC, entitlements, asset management]
takeaways:
  - "Asset 360 sits on Field Service's standard objects. PTC requires Service Cloud and at least one Field Service licence."
  - "Its core is an entitlement engine that picks the right warranty or service contract on cases, work orders and return orders, interactively or by rule."
  - "Since 2024 Salesforce has sold Asset Service Lifecycle Management at $75 per user. It overlaps on coverage, hierarchy and campaigns."
  - "Asset 360 ships twice a year, most recently 26R2 on 9 September 2026. According to PTC, patches only ship when agreed fixes are due."
  - "PTC Asset 360 has been called PTC Orbit since June 2026 and is a different product. Check which one any quote refers to."
faq:
  - q: "What is ServiceMax Asset 360?"
    a: "A managed package from PTC for Salesforce Field Service. It adds entitlement checks, maintenance plans based on time, condition or IoT data, technical attributes and guided workflows in the Field Service mobile app, stored on Salesforce's standard objects."
  - q: "Do I need Salesforce Field Service for Asset 360?"
    a: "Yes. According to PTC's service description of February 2025, the customer needs Service Cloud, at least one Field Service licence and an active Salesforce agreement."
  - q: "Is ServiceMax Asset 360 the same as PTC Asset 360?"
    a: "No. PTC Asset 360 has been called PTC Orbit since June 2026 and combines asset data from PLM, ERP, CRM and field service. ServiceMax Asset 360 for Salesforce is the field service package on Salesforce."
  - q: "How much does ServiceMax Asset 360 cost?"
    a: "PTC does not publish a price. The AppExchange listing says from $50 per user and month but was last updated in 2022. Ask for a quote and add the Field Service licences."
draft: false
---

ServiceMax Asset 360 is a managed package from PTC that adds asset functions to Salesforce Field Service: an entitlement engine, maintenance plans based on time, condition or IoT data, technical attributes and more than 60 preconfigured workflows. It stores everything on Salesforce's standard objects and requires Service Cloud and at least one Field Service licence. Since 2024 Salesforce has sold its own add-on for similar tasks, Asset Service Lifecycle Management. I would look at Asset 360 when automatic entitlement checks or PTC PLM tip the balance, and evaluate the Salesforce add-on first otherwise.

## What is ServiceMax Asset 360 for Salesforce?

ServiceMax has two products on Salesforce. ServiceMax Core brings its own data model; I compare it with Salesforce Field Service in [ServiceMax vs Salesforce Field Service: which one?](../servicemax-vs-salesforce-field-service/). Asset 360 takes the other route. The [AppExchange listing](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N4V00000FN7u3UAD) describes it as natively built on Salesforce Field Service, and PTC's documentation shows how: the [work order](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/work-order-object.html) is the standard WorkOrder object, and Asset 360 adds its own fields with the `SVMXA360` namespace.

For you this means: dispatchers keep planning with Salesforce's scheduling engine, technicians keep working in the Salesforce Field Service mobile app. Asset 360 puts its workflows on top. The requirements are in the [ServiceMax SaaS Service Description](https://ptc-p-001.sitecorecontenthub.cloud/api/public/content/44a3614523d341ccb446db0c1b052c62?v=b6f25473) of 1 February 2025: Service Cloud, at least one Field Service licence and an active Salesforce agreement for the whole term.

```zeitleiste
2020-09 | Asset 360 for Salesforce launches on AppExchange
2023-01 | PTC completes the acquisition of ServiceMax
2024-03 | Release 24R1 brings workflows into the Field Service app
2026-03 | Release 26R1 (version 14.0)
2026-09 | Release 26R2 (version 15.0)
```

```hinweis tipp
PTC had two products called Asset 360. The second one has been called [PTC Orbit](https://www.ptc.com/en/products/ptc-orbit) since June 2026 and combines asset data from PLM, ERP and field service. Check which one a quote or presentation refers to.
```

## Asset 360 adds an entitlement engine and more than 60 workflows

The [product page](https://www.ptc.com/en/products/servicemax/asset-360) names four areas. I checked them against the documentation:

- **Entitlement engine.** According to the [documentation](https://support.ptc.com/help/servicemax_asset360/en/articles/asset-360/entitlement-management.html) it checks on cases, work orders and return orders which service the customer is entitled to. In interactive mode it lists all matching warranties and service contracts; in automatic mode it picks one by rule. If an asset has both a warranty and a contract, you decide which takes priority. One limit is stated explicitly: the engine does not handle entitlements linked directly to an account or asset without a service contract.
- **Installed base.** A view of the asset, its subcomponents, service history and contract coverage.
- **Maintenance planning.** Plans based on time, frequency, condition or IoT data, with templates and automatically created work orders.
- **Preconfigured workflows.** PTC names more than 60. Since release 24R1, Service Process Manager and wizards run in the Salesforce Field Service mobile app according to [PTC's blog](https://www.ptc.com/en/blogs/service/continuous-innovation-field-service-servicemax-enhancements), with technical attributes on site. Release 24R2 added [connections to Windchill and Servigistics](https://www.arcweb.com/node/152476).

If you know the maintenance plans in the base licence, you see the overlap: Field Service handles maintenance by operating hours itself, see [usage-based maintenance](../field-service-usage-based-maintenance/). The added value of Asset 360 lies in entitlement checks and the ready-made workflows.

## Where does Asset 360 overlap with Asset Service Lifecycle Management?

In several places. Salesforce announced Asset Service Lifecycle Management (ASLM) as an add-on in June 2024 and sells it at $75 per user and month. Its contents are in [Asset Service Lifecycle Management: worth the add-on?](../asset-service-lifecycle-management-add-on/). The comparison based on both vendors' documents:

| Area | ServiceMax Asset 360 | Salesforce ASLM |
|---|---|---|
| Entitlement check | Engine, interactive and by rule, on case, work order, return | Asset Coverage View with selection on case or work order |
| Asset hierarchy | View of subcomponents | Interactive hierarchy |
| Campaigns | Product service campaigns with search by technical attributes | Product service campaigns |
| Returns, depot | Automated return and workshop processes per references | Depot repair, advanced exchange |
| PLM | Windchill, Servigistics | No PLM connection of its own |
| Vendors | PTC and Salesforce | Salesforce |
| Price | Not published | $75 per user and month |

Both work on the same standard objects. If you buy both, you get two solutions for coverage checks in one org. Decide per workflow which one owns it.

## What I have seen with entitlement checks

```praxis
In one Field Service project, entitlements were in scope and influenced prioritisation in dispatch. In my projects the ERP always owned spare parts stock, and problems came from the quality of the data.
```

I have not implemented Asset 360 myself. From this experience I take two checks. First: if your entitlements hang directly on the asset or account without a service contract today, the engine does not fit without rework, according to the documentation. Second: return and inventory workflows in Asset 360 meet an ERP that owns stock. Where I draw that line is in [Spare parts between ERP and Salesforce](../salesforce-field-service-spare-parts-erp/).

## A second managed package adds two releases a year

According to its [release schedule](https://support.ptc.com/help/servicemax_asset360/en/articles/servicemax-asset-360-release-notes/releases.html), Asset 360 ships twice a year: 26R1 on 5 March 2026, 26R2 on 9 September 2026. Patches only ship when agreed fixes are due. Salesforce ships three times a year. PTC publishes an [assessment of the Salesforce release updates](https://support.ptc.com/help/servicemax_asset360/en/articles/servicemax-asset-360-release-notes/assessment-for-2025-releases.html) for each round, which helps with testing. Your team still tests two packages against every Salesforce release.

Then there are the contract points from the service description. The availability commitment of the PTC agreement does not apply to the ServiceMax suites, and Salesforce is responsible for the Salesforce environment. There is no public price. The AppExchange listing says from $50 per user and month but was last updated in 2022. I would not plan with that figure.

## When is Asset 360 worth it?

In my view in three cases:

1. **Entitlement checks should run automatically.** If the help desk and dispatch should get warranty or contract by rule on every order, the engine is the strongest point.
2. **Your PLM and spare parts planning come from PTC.** Then the connections to Windchill and Servigistics are a real advantage.
3. **You want ready-made workflows instead of custom builds.** More than 60 preconfigured workflows save build time if your processes fit them.

If none of these applies, I would evaluate ASLM first. One vendor means less coordination, and there is no second managed package to test twice a year.

## First step: list your own asset workflows

1. **List your asset workflows**: coverage checks, maintenance, campaigns, returns, depot.
2. **Check where your entitlements sit today**: on the service contract, the asset or the account.
3. **Request quotes for Asset 360 and ASLM** and ask which users need a licence in each case. The role logic of Field Service is in [Salesforce Field Service licences by role](../field-service-licences-by-role/).
4. **Calculate both options over three years** including release testing. How I set up such comparisons is described under [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).
