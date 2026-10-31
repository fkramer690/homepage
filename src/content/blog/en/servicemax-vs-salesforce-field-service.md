---
title: "ServiceMax vs Salesforce Field Service: which one?"
description: "ServiceMax still runs on Salesforce, with a second vendor and scheduling on AWS. When it beats Salesforce Field Service for manufacturers and when it does not."
pubDate: 2026-10-29
lang: en
slug: servicemax-vs-salesforce-field-service
translationKey: servicemax-vs-salesforce-field-service
topic: field-service
categories: [field-service]
tags: [field service, ServiceMax, PTC, software selection]
takeaways:
  - "Buying ServiceMax always means buying Salesforce licences too. ServiceMax Core runs as a managed package in the customer's Salesforce org."
  - "PTC calls ServiceMax a standalone platform. That holds for ownership and roadmap; technically Salesforce remains the base (as of October 2026)."
  - "ServiceMax Core has its own data model. PTC runs scheduling and optimisation on AWS in Ireland and the Zinc messaging app in the US."
  - "ServiceMax brings depot repair, returns and rule-based entitlements. Salesforce Field Service keeps data, licences, releases and AI with one vendor."
  - "The availability commitment of the PTC agreement does not cover the ServiceMax suites. Clarify operations, liability and release calendars first."
faq:
  - q: "Does ServiceMax run on Salesforce?"
    a: "Yes, as of October 2026. PTC states that ServiceMax Core and Asset 360 are hosted in Salesforce data centres, and Core is installed as a managed package from AppExchange. PTC also runs Service Board and Schedule Optimization on AWS in Ireland."
  - q: "Do I need Salesforce licences for ServiceMax?"
    a: "Yes. PTC's documentation assigns the ServiceMax licence to users with a Salesforce, Salesforce Platform or Community licence. For Asset 360, PTC also requires Service Cloud and at least one Field Service licence."
  - q: "Is ServiceMax part of Salesforce?"
    a: "No. ServiceMax has belonged to PTC since 4 January 2023; the deal was announced at $1.46 billion. Salesforce is the platform provider and a competitor with its own Field Service product."
  - q: "How much does ServiceMax cost?"
    a: "PTC does not publish prices. Expect a quote from PTC plus Salesforce licences for every user, and compare both with the list prices of Salesforce Field Service."
draft: false
---

ServiceMax from PTC and Salesforce Field Service do not sit on separate platforms. According to PTC's service description of February 2025, ServiceMax Core runs as a package in the customer's Salesforce org, with its own data model. PTC runs scheduling and optimisation on AWS. So you always buy Salesforce licences plus a second vendor. In my view ServiceMax pays off when depot repair, returns and rule-based entitlements shape your service and your PLM comes from PTC. Otherwise Salesforce Field Service is the simpler choice.

## Does ServiceMax still run on Salesforce?

Yes. The question is fair, because PTC adds to the confusion itself. The FAQ on the [product page](https://www.ptc.com/en/products/servicemax) says ServiceMax was originally built on Salesforce and is now a standalone platform with its own roadmap. PTC's technical documents say something else:

- The [ServiceMax SaaS Service Description](https://ptc-p-001.sitecorecontenthub.cloud/api/public/content/44a3614523d341ccb446db0c1b052c62?v=b6f25473) of 1 February 2025 names Salesforce data centres as the hosting location of Core and Asset 360.
- The [installation guide](https://support.ptc.com/help/servicemaxcore/en/articles/core/svmx-installation.html) describes Core as a managed package on the Force.com platform, installed from AppExchange.
- The [August 2026 patch](https://support.ptc.com/help/servicemaxcore/en/articles/release_notes/august-2026-patch.html) fixes a defect for users with a Salesforce Platform licence.
- PTC's [German product page](https://www.ptc.com/de/products/servicemax) states that ServiceMax was developed as an application on the Salesforce platform.

ServiceMax is standalone as a product: it has belonged to PTC since [4 January 2023](https://investor.ptc.com/resources/news/news-details/2023/PTC-Completes-Acquisition-of-ServiceMax/default.aspx), and PTC decides the roadmap. The technical base is still Salesforce. I found no primary source for a platform change.

```hinweis achtung
Read vendor pages on ServiceMax closely. "Standalone" describes ownership and roadmap, not operations. Ask for the hosting location of your data and the Salesforce licences you need in writing, as part of the quote.
```

## What does ServiceMax consist of today?

ServiceMax is a product family. Two core products and several add-ons matter for manufacturers. The details come from [PTC's documentation](https://support.ptc.com/help/servicemaxcore/en/articles/core/servicemax-core-solutions.html) and the service description, as of October 2026:

| Product | What it is | Where it runs |
|---|---|---|
| ServiceMax Core | Complete field service suite with installed base, contracts, dispatch, inventory, returns, depot repair | Salesforce org, own data model (work order as object `SVMXC__Service_Order__c`) |
| ServiceMax Asset 360 | Extension for Salesforce Field Service | Salesforce org, on the standard Field Service objects |
| ServiceMax Go | Technician app with offline storage | Syncs through a PTC gateway |
| Service Board, Schedule Optimization | Dispatch board and optimisation | PTC platform on AWS in Ireland |
| ServiceMax AI | Assistant for technicians, since February 2025 | Own package, language model not documented |

The key point is in the first row. The [work order in Core](https://support.ptc.com/help/servicemaxcore/en/articles/core/work-order1.html) is a separate object with 207 fields, and the installed base is a separate object called Installed Product. Core does not use WorkOrder, ServiceAppointment and Asset from Salesforce Field Service; it builds a parallel model in the same org. Asset 360 does the opposite and extends the standard objects, see [ServiceMax Asset 360: worth adding to Field Service?](../servicemax-asset-360-salesforce-field-service/).

## ServiceMax Core brings depot repair, returns and entitlements

The gap is smaller than ten years ago. Salesforce Field Service includes assets with hierarchies, maintenance plans, service contracts and entitlements in the base licence. The differences are in the workflows around the installed base.

ServiceMax Core lists spare parts, returns and depot repair, contracts with a rule-based entitlement engine and a Service Flow Manager for your own workflows as core functions. At Salesforce, depot repair, repair quotes and coverage selection come with the Asset Service Lifecycle Management add-on at $75 per user and month. What the add-on contains is in [Asset Service Lifecycle Management: worth the add-on?](../asset-service-lifecycle-management-add-on/).

With release 26R2, PTC added work plans with dependencies, intraday optimisation as often as every 15 minutes and part filtering by asset configuration, according to its [overview of new features](https://www.ptc.com/en/products/servicemax/whats-new). That targets complex repairs on machines with many variants.

The second difference is the PTC portfolio. PTC sells Windchill and Servigistics. Asset 360 has had [connections to both](https://www.arcweb.com/node/152476) since release 24R2, and Core data flows through a [documented integration](https://support.ptc.com/help/ptc_asset360/en/articles/implementers/servicemax_integration_with_asset_hub.html) into PTC Orbit, PTC's asset data platform. If engineering and spare parts planning already run on PTC, the paths are shorter.

Salesforce Field Service has the platform on its side. Enhanced Scheduling and Optimization, the Field Service mobile app, Agentforce for Field Service and the new features of each release work on the standard objects. None of the sources I read says whether they work with the Core objects. I assume they do not, and I would get it in writing before any selection.

## A second vendor changes operations and data protection

These are the points most often missing from selection projects. All of them are in the service description of February 2025:

- **Availability.** The availability commitment of the PTC agreement does not apply to the ServiceMax suites, because PTC does not control the hosting environments. PTC commits to commercially reasonable efforts. Salesforce is responsible for the Salesforce environment.
- **Data locations.** Service Board and Schedule Optimization run on AWS in Ireland, Zinc on AWS in the US with customer data in the US. The [list of sub-processors](https://www.ptc.com/es/documents/legal-agreements/data-processing-terms-and-conditions/sub-processors) also names map services and Twilio.
- **Licences.** Service Board needs one Salesforce licence for the integration. Every user needs a ServiceMax licence and a Salesforce licence.
- **Releases.** Salesforce ships three releases a year. From 2027, ServiceMax follows four major releases a year according to its [release schedule](https://support.ptc.com/help/servicemaxcore/en/articles/release_notes/release-schedule.html), each with a four-week preview, plus monthly patches. Your test team checks two calendars.

Then there is PTC's strategy. PTC sold ThingWorx and Kepware to TPG, announced in [November 2025](https://www.ptc.com/en/news/2025/tpg-to-acquire-ptcs-industrial-connectivity-and-iot-businesses) and completed in March 2026. According to the announcement, PTC focuses on CAD, PLM, ALM and service lifecycle management. ServiceMax is part of that core. The IoT platform that the ServiceMax page still names as a connection now belongs to another company.

## What I take from Field Service projects

I have not implemented ServiceMax myself, and I have not seen it in a selection against Salesforce. What I know are the places where field service projects at manufacturers get stuck.

```praxis
In my Field Service projects with maintenance, breakdown jobs and commissioning, the installed base and spare parts came from the ERP and scheduling ran automatically. The stumbling blocks were asset data quality, technician acceptance and the ERP interfaces.
```

None of these three depends on the product. A better entitlement engine does not help when the serial numbers in the ERP are wrong. So in a selection I weigh the question which product needs the fewest workarounds with your data and your interface higher than the feature list. How parts flow between the ERP and Salesforce is in [Spare parts between ERP and Salesforce](../salesforce-field-service-spare-parts-erp/).

## How do you choose between ServiceMax and Salesforce Field Service?

```pro-contra
pro: ServiceMax Core
- Depot repair, returns and entitlement engine in the core
- Work plans with dependencies for complex repairs
- Connections to Windchill, Servigistics and PTC Orbit
contra: What you accept in return
- Two vendors, two release calendars, no PTC availability commitment
- Own data model next to the Field Service objects
- Scheduling data on AWS, Zinc data in the US
- No public prices
```

My rule of thumb: Salesforce Field Service is the default for manufacturers who already run sales and service on Salesforce and mainly schedule maintenance and breakdown jobs. Whether Field Service pays off at all is covered in [Salesforce Field Service: when is it worth it?](../salesforce-field-service-worth-it/). ServiceMax Core belongs on the list when repairs in your own depot, returns and contractual entitlements shape your service and your PLM comes from PTC. If you want to keep Salesforce Field Service and only add asset depth, Asset 360 is the variant I would look at first.

## First step: mark the service processes with depot, returns and contracts

1. **List your service processes** and mark the ones that involve the depot, returns and entitlement checks.
2. **Request two quotes**: PTC including all Salesforce licences, Salesforce Field Service including add-ons. The role logic for Salesforce is in [Salesforce Field Service licences by role](../field-service-licences-by-role/).
3. **Ask PTC four questions in writing**: data locations, availability, the language model behind ServiceMax AI and how it works with Salesforce features.
4. **Have the comparison calculated independently.** How I compare such options is described under [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).
