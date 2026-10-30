---
title: "SAP CRM or Salesforce: What Comes After 2027"
description: "SAP vs Salesforce after SAP CRM 7.0 maintenance ends: the options, when Salesforce fits, when SAP fits, and what waiting until 2030 costs."
pubDate: 2026-10-30
lang: en
slug: sap-crm-or-salesforce-end-of-maintenance
translationKey: sap-crm-or-salesforce
topic: data
categories: [architecture]
contactBrief: make-or-buy
tags: [SAP CRM, SAP vs Salesforce, S/4HANA, make or buy, CRM selection, end of maintenance]
takeaways:
  - "Mainstream maintenance for SAP CRM 7.0 ends at the end of 2027. Optional extended maintenance runs until the end of 2030 with a premium of two percentage points on the maintenance base."
  - "After SAP CRM there are three paths: CRM functions in S/4HANA, SAP Sales and Service Cloud, or Salesforce. Running on without a plan is the most expensive option."
  - "Salesforce fits when sales, service, portals and partners are at the centre and the CRM should be more than the step before the ERP order."
  - "The SAP path fits when the CRM mainly prepares orders and service orders that are processed in S/4HANA anyway."
  - "Which path wins depends on processes, interfaces and licences over several years, not on the product name. That calculation belongs before any quote."
faq:
  - q: "When does maintenance for SAP CRM end?"
    a: "SAP CRM 7.0 is part of SAP Business Suite 7. According to SAP, mainstream maintenance ends at the end of 2027. Optional extended maintenance runs from the start of 2028 to the end of 2030 and costs a premium of two percentage points on the maintenance base."
  - q: "What is the successor to SAP CRM?"
    a: "SAP offers two directions: CRM functions directly in SAP S/4HANA, such as SAP S/4HANA for customer management and S/4HANA Service, and the cloud solutions SAP Sales Cloud and SAP Service Cloud Version 2. Many companies also evaluate Salesforce."
  - q: "Is Salesforce better than SAP for CRM?"
    a: "It depends on the focus. Salesforce is strong in sales, service, portals and partners. The SAP path is the obvious choice when the CRM mainly prepares ERP orders. What decides is processes, interfaces and licences over several years."
  - q: "Can I keep running SAP CRM after 2030?"
    a: "According to SAP, customers without extended maintenance, or after it ends, receive customer-specific maintenance. New functions and legal changes are no longer to be expected. As a permanent solution, that rarely works."
draft: false
---

If you run SAP CRM today, you have to decide by 2030 at the latest how to continue: mainstream maintenance for SAP CRM 7.0 ends at the end of 2027, extended maintenance at the end of 2030. The options are CRM functions in S/4HANA, SAP Sales and Service Cloud, or Salesforce. Searching for "SAP vs Salesforce" mostly turns up feature comparisons. For manufacturers, a different question counts: is the CRM mainly the step before the ERP order, or should it carry sales, service, portals and partners? The answer decides which path fits.

## When does maintenance for SAP CRM end?

SAP CRM 7.0 is part of SAP Business Suite 7. According to [SAP's maintenance strategy](https://support.sap.com/en/release-upgrade-maintenance/maintenance-information/maintenance-strategy/s4hana-business-suite7.html), these dates apply to the core applications of the suite, including SAP ERP 6.0 and SAP CRM 7.0:

```zeitleiste
2027-12-31 | Mainstream maintenance for SAP CRM 7.0 ends
2028-01-01 | Optional extended maintenance starts, with a two percentage point premium
2030-12-31 | Extended maintenance ends, customer-specific maintenance after that
```

According to SAP, the premium of two percentage points on the maintenance base applies to all support offerings covering Business Suite 7. After 2030, SAP only offers customer-specific maintenance. A CRM that has not been replaced by then keeps running without further development.

For planning, this means: replacing a CRM, with selection, contract, implementation, data migration and training, easily takes two years in an international company. If you want to be done by 2030, you have to decide in 2027 or 2028.

## What are the options after SAP CRM?

Roughly, there are three directions, plus the option of doing nothing for now:

| Path | What it means | Fits when |
|---|---|---|
| CRM functions in S/4HANA | Sales and service processes directly in the ERP, such as S/4HANA for customer management and S/4HANA Service | the CRM mainly prepares orders and service orders |
| SAP Sales and Service Cloud | SAP's cloud CRM, according to SAP with standard lead-to-cash integration to S/4HANA | a cloud CRM is wanted and SAP systems should lead |
| Salesforce | Sales Cloud, Service Cloud, Field Service, portals, possibly Manufacturing Cloud | sales, service, portals and partners are at the centre |
| Keep running | SAP CRM with extended, later customer-specific maintenance | as a bridge to a fixed replacement date |

SAP itself positions [Version 2 of SAP Sales and Service Cloud](https://www.sap.com/engage/sscv2.html) as the cloud target and highlights the integration with S/4HANA. For companies that have to replace SAP CRM alongside the move from ECC to S/4HANA anyway, that is a serious argument.

## When does Salesforce fit, and when the SAP path?

The decision depends less on the product than on what the CRM is supposed to do. With manufacturers, I see two patterns.

In the first pattern, the CRM is a step before the ERP. Inside sales enters quotes and orders, service creates service orders, and almost everything ends up in S/4HANA anyway. Here a lot speaks for the SAP path, because data and processes stay in one world.

In the second pattern, the CRM carries its own processes: sales steering with forecasts and frame agreements, customer service across several channels, field service, dealer and customer portals. This is where Salesforce is strong, and the interface to the ERP is the price for it.

```pro-contra
pro: Salesforce
- Broad offering for sales, service, field service and portals on one platform
- Industry functions such as sales agreements in Manufacturing Cloud
- Large market of partners and specialists
contra: What you need to plan for
- Interfaces to SAP for customers, products, prices and orders
- One clear leading system per type of data
- Per-user licences that need careful planning over years
```

For the integration, one simple rule helps: exactly one system leads for each type of data. Which data flows between SAP and Salesforce I describe using the example of [Manufacturing Cloud](../manufacturing-cloud-sap-integration-data-flows/), and for prices in [customer prices: SAP conditions or Salesforce pricing?](../customer-prices-sap-conditions-or-salesforce-pricing/). The architecture behind it is described under [Salesforce integration](../../services/salesforce-integration/).

## Why does the calculation over several years decide?

Quotes often compare licence costs in the first year. For a CRM replacement, that is not enough. The calculation should include at least:

1. **Licences over the contract term**, split by user group. Not every user needs a full licence, as described in [Salesforce licences: does everyone need a full licence?](../salesforce-licences-full-licence-needed/)
2. **Interfaces**, meaning build and operation. They are larger on the Salesforce path, and not zero on the SAP path.
3. **Data migration** of customers, contacts, history and open cases from SAP CRM.
4. **Maintenance of the old system** until it is switched off, including the premium from 2028.
5. **Training and rollout**, because a new CRM only works if sales and service use it.

```praxis
In one project, I deliberately did not recommend Manufacturing Cloud, because sales agreements played no role for the client. The same logic applies to a CRM replacement: what matters is which processes the new system really has to carry, not which product is in the quote.
```

How I prepare such decisions with clients is described under [make or buy and licence forecasts](../../services/make-or-buy-licences/). When Manufacturing Cloud pays off compared with Sales Cloud is covered in [Manufacturing Cloud: is it worth it?](../salesforce-manufacturing-cloud-is-it-worth-it/).

## What does waiting until 2030 cost?

Waiting looks cheap at first, because the system runs and nobody has to ask for budget. The costs come in three places. First, the maintenance premium from 2028, every year until the system is switched off. Second, time: whoever decides only in 2029 has hardly any buffer for selection, implementation and migration, and negotiates with vendors and partners under time pressure. Third, standstill in the system itself. New requirements from sales and service land in a CRM that nobody wants to invest in any more. They move into Excel lists and extra tools that later have to be migrated as well.

On top of that, the same dates apply to SAP ERP 6.0, and many companies move to S/4HANA in the same years. Specialists for SAP, for Salesforce and for data migration are in demand then, and whoever asks late gets the teams that are still free. Keeping SAP CRM running therefore only works as a bridge with a fixed end date.

## Where should you start?

Start with an inventory before you ask for quotes: which processes run in SAP CRM today, how many users work with it, which interfaces depend on it, and which data has to move? At the same time, clarify when the move from ECC to S/4HANA is planned, because both projects share interfaces, master data and often the same team.

Then decide which of the two patterns applies to you: CRM as the step before the ERP, or CRM with its own processes for sales, service and partners. With that answer, you can narrow the selection to two paths and set up the calculation over several years.

The end of maintenance is a fixed date, and the decision behind it needs more lead time than the year 2030 suggests.
