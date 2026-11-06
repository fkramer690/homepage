---
title: "SAP CRM or Salesforce: What Comes After 2027"
description: "SAP vs Salesforce after SAP CRM 7.0 maintenance ends: the options, the questions that decide for manufacturers, and why waiting until 2030 is risky."
pubDate: 2026-11-06
lang: en
slug: sap-crm-or-salesforce-end-of-maintenance
translationKey: sap-crm-or-salesforce
topic: data
categories: [architecture]
contactBrief: make-or-buy
tags: [SAP CRM, SAP vs Salesforce, S/4HANA, make or buy, CRM selection, end of maintenance]
takeaways:
  - "Mainstream maintenance for SAP CRM 7.0 ends in 2027, extended maintenance in 2030. Plan the decision backwards from the switch-off date."
  - "There is no one-to-one successor. S/4HANA, SAP Sales and Service Cloud, Salesforce and hybrid setups are building blocks, checked per function."
  - "For manufacturers, installed base, contracts, spare parts, field service, dealers and prices from SAP decide, not the product name."
  - "Running on without an end date raises support, technology and delivery risk, because after 2030 only customer-specific maintenance remains."
  - "Compare licences, interfaces, migration, parallel operation and training over several years before you ask for quotes."
faq:
  - q: "When does maintenance for SAP CRM end?"
    a: "SAP CRM 7.0 is part of SAP Business Suite 7. According to SAP, mainstream maintenance ends at the end of 2027. Optional extended maintenance runs until the end of 2030 at a premium of two percentage points on the maintenance base."
  - q: "Is there a direct successor to SAP CRM?"
    a: "Not as a one-to-one product. SAP points to sales and service functions in S/4HANA and to SAP Sales Cloud and SAP Service Cloud Version 2; many manufacturers also evaluate Salesforce. Which functions move where comes from a fit-gap check."
  - q: "Does SAP CRM have to be switched off by the end of 2030?"
    a: "No, but after that SAP only offers customer-specific maintenance, without new legal changes or support packages. According to SAP, support for third-party databases and Java 8 with AS Java 7.5 also ends in 2030."
  - q: "Can Salesforce replace SAP CRM completely?"
    a: "Only after an analysis of functions, data, interfaces and operation. Salesforce covers sales, service, field service and portals, licensed by product and user type. ERP-owned data such as order status has to be synchronised where needed."
draft: false
---

Mainstream maintenance for SAP CRM 7.0 ends on 31 December 2027, extended maintenance on 31 December 2030. Because selection, implementation and migration take time, the decision falls well before the switch-off. The options are sales and service in S/4HANA, SAP Sales and Service Cloud, Salesforce or a mix. For manufacturers, one question sorts them: is the CRM mainly the step before the ERP order, or should it carry sales, service, portals and partners? I design and steer Salesforce programmes for manufacturers on the client side; I describe the SAP options from SAP's published information.

## When does maintenance for SAP CRM end?

SAP CRM 7.0 is part of SAP Business Suite 7. According to [SAP's maintenance strategy](https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html), these dates apply to the core applications of the suite, including SAP ERP 6.0 and SAP CRM 7.0, on supported enhancement package levels:

```zeitleiste
2027-12-31 | Mainstream maintenance for SAP CRM 7.0 ends
2028-01-01 | Optional extended maintenance starts, with a two percentage point premium
2030-12-31 | Extended maintenance ends, customer-specific maintenance after that
```

According to SAP, the premium applies to the support offerings covering Business Suite 7. What it costs you depends on your contract and maintenance base, so check it with SAP rather than booking it as a CRM surcharge. Ask at the same time whether your installed release and enhancement package level is covered.

After 2030, customer-specific maintenance means no new legal changes and no new support packages. In October 2026, SAP also [announced](https://news.sap.com/2026/10/beyond-2030-sap-business-suite-7-sap-netweaver-customers-third-party-databases-java/) that database support for systems on third-party databases and support for Java 8 with AS Java 7.5 end at the end of 2030. An SAP CRM that still runs then keeps running, but with growing technical risk.

## Five paths after SAP CRM

There is no single successor. SAP CRM functions are spread over several targets, and many companies combine them:

```tabelle
title: Paths after SAP CRM
columns: Option | What it means | Natural candidate when
Sales and service in S/4HANA | Sales in S/4HANA, service orders and contracts in SAP S/4HANA Service | The CRM mainly prepares orders and service orders for the ERP
SAP Sales and Service Cloud | SAP's cloud CRM, according to SAP with standard integration to S/4HANA | SAP standard integration matters more than front office flexibility, and the SAP cloud scope covers your functions
Salesforce | Sales Cloud, Service Cloud, Field Service, portals, possibly Manufacturing Cloud | Sales, service, portals and partners carry their own processes
Hybrid | For example Salesforce for sales and portals, S/4HANA for service execution | Front office and back office follow different priorities
Keep running | SAP CRM with extended, later customer-specific maintenance | Only as a bridge to a fixed end date
note: Check per SAP CRM function you actually use: does it move, is it redesigned or does it go?
```

SAP positions [Version 2 of SAP Sales and Service Cloud](https://www.sap.com/engage/sscv2.html) as its cloud target. It is a separate solution with its own data model, so it needs integration with S/4HANA just like Salesforce does, even if SAP delivers more of it as standard content. Same vendor does not mean one system.

## Which questions decide between Salesforce and SAP?

Two patterns help to sort the starting point. In the first, the CRM is a step before the ERP: inside sales enters quotes and orders, service creates service orders, and almost everything ends up in S/4HANA. Here the SAP options deserve priority on the shortlist. In the second, the CRM carries its own processes: sales steering with forecasts and run-rate agreements, customer service across channels, field service, dealer and customer portals. Here Salesforce belongs on the shortlist. Many companies sit between the two.

The patterns narrow the list. The decision comes from the questions that matter for manufacturers:

```tabelle
title: What decides for manufacturers
columns: Topic | Question to answer | Test in the demo
Installed base | Where do machines, configurations and history live, and who maintains them? | Your asset hierarchy with real data
Contracts and warranty | Which system checks coverage, entitlements and warranty claims? | A warranty case from start to end
Spare parts | Do technicians and the service desk need stock and reservations from the ERP in real time? | Availability check during a breakdown
Field service | Do technicians need offline mobile execution and automatic scheduling? | A technician day, offline
Dealers and partners | Do dealers work on leads, deals, assets or warranty cases in a portal? | A dealer registering a deal
Products and prices | Is there a configurator, and do customer prices stay in SAP conditions? | A quote with a customer price from SAP
Orders | Which order and delivery status does sales or the customer need to see? | Status of an order in the portal
note: Each answer points towards an option, but only the full picture decides.
```

For [sales agreements in Manufacturing Cloud](https://help.salesforce.com/s/articleView?id=sf.sa_admin_parent_concept.htm&language=en_US&type=5), note that they plan quantities and revenue over time. They are not the same as a legally binding framework contract or a contract in SAP; check where the binding version lives.

Alongside the functional questions, check the permission and security model, data residency, offline and performance needs, the release cycle with its test effort, and who runs and supports the platform. A good process demo alone does not decide.

## Every option needs integration

Every option needs integration, including the SAP ones. What drives the effort is less the number of interfaces than how many systems lead, in which direction data flows, how fresh it has to be, how errors are reprocessed and who runs the interfaces. For each business attribute and stage, exactly one system should lead: for a customer, the legal data can lead in SAP while sales roles and contacts are maintained in Salesforce.

Which data flows between SAP and Salesforce I describe using the example of [Manufacturing Cloud](../manufacturing-cloud-sap-integration-data-flows/), and for prices in [customer prices: SAP conditions or Salesforce pricing?](../customer-prices-sap-conditions-or-salesforce-pricing/). The architecture behind it is described under [Salesforce integration](../../services/salesforce-integration/). Salesforce runs sales, service, [field service](https://help.salesforce.com/s/articleView?id=fs_overview.htm&language=en_US&type=5) and portals on one platform, but licences and permissions differ by product and user type, so plan them separately.

## The calculation over several years decides

Quotes often compare licence costs in the first year. For a CRM replacement, the calculation covers the whole term:

```tabelle
title: What belongs in the calculation
columns: Item | What goes in | Often forgotten
Licences | Per user group over the contract term | External users in portals
Implementation | Process design, configuration, extensions, tests | Environments and deployment
Interfaces | Build and operation, on every path | Monitoring and reprocessing
Data migration | Customers, contacts, history and open cases from SAP CRM | Excel lists that grew around it
Old system | Maintenance and premium until switch-off | Parallel operation and late changes
Rollout | Training and support for sales and service | Time of the key users
Operation | Application management, releases, further development | Archiving and decommissioning SAP CRM
note: Ask SAP for the actual maintenance base and the premium before you compare paths.
```

Which licences user groups really need is covered in [Salesforce licences: does everyone need a full licence?](../salesforce-licences-full-licence-needed/)

```praxis
In one project, I deliberately did not recommend Manufacturing Cloud, because sales agreements played no role for the client. The same logic applies to a CRM replacement: what matters is which processes the new system really has to carry, not which product is in the quote.
```

How I prepare such decisions with clients is described under [make or buy and licence forecasts](../../services/make-or-buy-licences/). When Manufacturing Cloud pays off compared with Sales Cloud is covered in [Manufacturing Cloud: is it worth it?](../salesforce-manufacturing-cloud-is-it-worth-it/).

## Why does waiting until 2030 increase cost and risk?

Waiting looks cheap at first, because the system runs and nobody has to ask for budget. During extended maintenance, the premium applies every year. Whoever decides only in 2029 has little buffer left for selection, implementation and migration, and negotiates under time pressure. New requirements from sales and service land in a CRM that often gets no more investment, move into Excel lists and extra tools, and have to be migrated later as well.

The same dates apply to SAP ERP 6.0, and many companies move to S/4HANA in the same years. Both projects share interfaces, master data and often the same people, and they compete for the same internal experts and implementation capacity. Keeping SAP CRM running is easiest to defend as a bridge with a fixed end date.

## Start with goals and an inventory

Before you ask for quotes, clarify what should get better: which results sales and service need, which processes should go, where SAP CRM fails today and which user groups work around it. Then take stock: processes, users, interfaces, data, custom developments, and the technical base with database, Java components and add-ons. At the same time, clarify when the move from ECC to S/4HANA is planned.

With that, decide which pattern applies and which questions from the table matter most for you. That narrows the selection to two or three options and gives you the basis for the calculation over several years.
