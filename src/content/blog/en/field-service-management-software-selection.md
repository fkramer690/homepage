---
title: "Field Service Management Software for Manufacturers"
description: "Field service management software for manufacturers: how to shortlist Salesforce Field Service, SAP Field Service Management, IFS or ServiceNow."
pubDate: 2026-11-06
lang: en
slug: field-service-management-software-selection
translationKey: field-service-management-software
topic: field-service
categories: [field-service, architecture]
contactBrief: make-or-buy
tags: [field service management, FSM software, SAP Field Service Management, IFS, ServiceNow, Salesforce Field Service]
takeaways:
  - "The system that already manages customers, orders or assets helps narrow the shortlist. It does not make the decision on its own."
  - "The same feature names can refer to different packages, add-ons and ERP integrations. Check what the quoted license actually includes."
  - "For manufacturers, the critical areas are installed base, multi-day jobs, contracts and warranty, spare parts and the feedback to the ERP."
  - "In my projects, the risks lay in asset data quality, technician acceptance and ERP interfaces. They recur with every product, only their size varies."
  - "Compare two vendors using your own jobs, with dispatchers, back office and technicians, rather than using feature lists."
faq:
  - q: "What is field service management software?"
    a: "Field service management software plans and manages technician jobs at the customer's site. It assigns orders by skill and availability, sends them to a mobile app and records working time, material and results, which usually flow to the ERP for billing."
  - q: "What is SAP Field Service Management?"
    a: "SAP Field Service Management is SAP's cloud solution for planning, dispatching and mobile execution of service jobs. According to SAP, a backend such as S/4HANA or SAP Service Cloud typically handles master data and order creation, and the commercial follow-up runs there too."
  - q: "Does S/4HANA automatically mean SAP Field Service Management?"
    a: "No. S/4HANA puts SAP Field Service Management on the shortlist because SAP offers standard integration content, but you still need to check it against your actual S/4HANA process. Where customer service and sales run in Salesforce, Salesforce Field Service belongs on the list too. The decision should come from tests with your own jobs."
  - q: "When is ServiceNow an option for field service?"
    a: "ServiceNow is a natural candidate when customer service already runs on ServiceNow Customer Service Management, not only IT service management. As of November 2026, ServiceNow offers Advanced and Prime packages; only Prime includes Schedule Optimization."
draft: false
---

Four platforms come up most often when manufacturers look for field service management software: Salesforce Field Service, SAP Field Service Management, IFS Cloud Field Service Management and ServiceNow Field Service Management. Others exist, such as Microsoft Dynamics 365 Field Service, Oracle Field Service or ServiceMax. The system that already manages customers, orders or assets helps narrow the shortlist because it strongly influences how much integration you need. The decision itself should rest on tests with your own jobs. I work with Salesforce and have not implemented the other three; I describe them based on vendor information, last checked on 6 November 2026.

## What does field service management software have to do for manufacturers?

The vendors use the same words: scheduling, mobile app, assets, parts. The same terms can refer to different packages, add-ons and integrations. For manufacturers, these are the areas worth testing:

```tabelle
title: What to test in a field service selection
columns: Area | What it covers | What to test
Scheduling and dispatch | Jobs by skill, availability, travel time; manual or optimized | Your job mix, crews and multi-day jobs
Mobile app | Order, asset and history, also offline; time, material, photos, signature | Technicians use it themselves on real jobs
Installed base | Which machine is where, in which configuration, with which history | Real asset hierarchies from the ERP
Contracts and warranty | What is covered, entitlements, SLAs, maintenance plans | Your contract types and warranty rules
Spare parts | Stock in the warehouse and van, reservation, returns | Reservation and returns against the ERP
Reports and checklists | Service report, measurements, acceptance by the customer | Your report and the signature on site
Service partners | External technicians and subcontractors | Partner access, assignment, confirmation and settlement
ERP feedback | Time, material and travel back for billing | Which data flows, in which package, at what effort
note: The fact that a feature exists is not enough as a test criterion. What matters is which license or add-on it requires and how much you still have to build.
```

At manufacturers, billing usually stays in the ERP; in the programs I have seen, it always did. That is why the interface to the ERP is part of the selection for every product, including the one from the ERP vendor.

## Four platforms for the shortlist

```tabelle
title: Four platforms for manufacturers
columns: Product | Basis | Natural shortlist candidate when
Salesforce Field Service | Salesforce platform, closely tied to Service Cloud; separate licenses for dispatchers, technicians and contractors | Customer service and sales already run in Salesforce
SAP Field Service Management | SAP cloud solution used alongside a backend such as S/4HANA or SAP Service Cloud | S/4HANA leads for service orders and billing
IFS Cloud Field Service Management | Part of IFS Cloud, alongside ERP and asset management | IFS is already the ERP or asset management system
ServiceNow Field Service Management | ServiceNow platform, part of its customer service offering | Customer service already runs on ServiceNow, not only IT service management
note: A natural candidate is not a decision. Especially when customer contact and ERP data reside in different systems, test at least one alternative.
```

Salesforce customers also come across ServiceMax, which now belongs to PTC and is built on Salesforce. I compared the two in [ServiceMax vs Salesforce Field Service](../servicemax-vs-salesforce-field-service/).

## Salesforce Field Service fits when customer interactions are managed in Salesforce

Salesforce Field Service uses the Salesforce platform and is closely tied to Service Cloud: a work order can link to the case, the account and the asset. If the data model, integration and permissions are set up for it, a customer reports a breakdown in the portal, the service team turns it into a work order, and the technician sees the same history. I describe this path in [from case to work order](../field-service-case-to-work-order/). According to the [Salesforce pricing page](https://www.salesforce.com/service/field-service-management/pricing/), dispatchers, technicians and contractors need their own licenses, and some functions, such as asset service lifecycle management, are add-ons; Salesforce now sells the product as Field Service and Operations.

In my cost calculation, scheduling optimization paid off most with many short jobs per day; with few long jobs, the benefit was smaller. The assumptions are in [Salesforce Field Service: is it worth it?](../salesforce-field-service-worth-it/)

The trade-off is that the handoff between customer service and field service can disappear. In the architectures I have seen, the ERP remained the leading system for spare parts, installed base and billing, so data had to be integrated or replicated. I show which data flows in [spare parts from the ERP in Field Service](../salesforce-field-service-spare-parts-erp/).

## When is SAP Field Service Management on the shortlist?

In its [learning portal on SAP Field Service Management](https://learning.sap.com/courses/managing-sap-field-service-management/exploring-sap-solution-portfolio-for-service), SAP describes a division of responsibilities: a backend, typically S/4HANA or SAP Service Cloud, handles master data and order creation, and the commercial follow-up is usually handled there or in the ERP behind it. SAP Field Service Management covers planning, dispatch and mobile execution, with apps for iOS, Android and Windows that SAP says work offline. With Crowd Service, it can involve service partners.

For manufacturers whose service orders are created and billed in S/4HANA, SAP offers standard integration content. Check it against your actual process, such as service orders or plant maintenance; you still have to implement and operate the interface. SAP also offers SAP Service and Asset Manager, a mobile app that works directly with S/4HANA without SAP Field Service Management. This changes the architecture, not just the app. Clarify early which option a proposal refers to.

If sales and customer service run in Salesforce but field service runs in SAP, the view of the customer is split across two systems. That is the same trade-off as when choosing the CRM itself.

## IFS and ServiceNow belong on the list when they are already leading systems

**IFS** presents [field service management](https://www.ifs.com/en/products/fsm) as part of IFS Cloud, with scheduling, mobile workforce, contractor management and parts logistics. IFS also positions it for use alongside other enterprise systems. It is a natural candidate when IFS is already the ERP or asset management system.

**ServiceNow** offers [field service management](https://www.servicenow.com/products/field-service-management/pricing.html) in two packages, as of November 2026. FSM Advanced includes dispatch, mobile apps, planned work, parts and contractor management; FSM Prime adds Schedule Optimization and Workforce Optimization. Prices are on request. Having ServiceNow in place for IT tickets is not reason enough; it only becomes a natural candidate when customer service already runs on its Customer Service Management.

In scheduling, the products differ in which constraints the optimization handles, such as crews, parts or multi-day jobs, how it replans during the day and how dispatchers can override it. Test this on your own jobs.

```praxis
In my Field Service projects with maintenance, breakdown jobs and commissioning, spare parts and installed base came from the ERP, and scheduling ran automatically. The stumbling blocks were asset data quality, technician acceptance and the interfaces to the ERP. These three risks recur with every product, but their severity depends on the product and architecture. They belong in every selection.
```

## Compare two vendors on real jobs

The feature lists look alike. Differences only show up on your own jobs, with the people who run them. I recommend this order:

```schritte
Starting point | 2 to 4 weeks · client
  Leading systems, job types, technicians, partners, ERP interfaces.
Shortlist | 2 weeks · client
  Two or three vendors for demos, at most two for the scenario test.
Scenarios | 4 to 6 weeks · client and vendors
  Real jobs with dispatchers, back office, parts logistics and technicians.
Calculation | 2 weeks · client
  Licenses, add-ons, implementation, integration and operation over years.
```

Three jobs work well as scenarios: a planned maintenance, a breakdown with a spare part and a commissioning over several days. Let technicians use the mobile app themselves and let dispatchers replan a day's schedule. Use an approved, representative extract of real asset data from the ERP, anonymized where needed and deleted after the test, to see what the [asset hierarchy](../field-service-asset-hierarchy-machines/) looks like in the new system.

The scenarios provide the evidence for the functional decision. Alongside these scenarios, check security and permissions, data residency, offline sync with large data volumes, monitoring of failed interfaces and the vendor's release model. Weight the test areas from the table before the first demo, so that the result does not depend on the best presentation.

The calculation includes licenses by role for dispatchers, technicians and service partners, add-ons such as optimization, implementation, data migration, integration, test environments, training and the internal team that runs the platform. For Salesforce, I broke down the licenses in [Field Service licenses by role](../field-service-licences-by-role/). I describe how I prepare such decisions with clients under [make or buy and license forecasts](../../services/make-or-buy-licences/).
