---
title: "Partner visit management: dealer visits with KPIs"
description: "How partner visit management in Manufacturing Cloud turns dealer visits into tasks and KPIs, what reps capture on mobile and what to ask Salesforce first."
pubDate: 2026-10-28
lang: en
slug: partner-visit-management-dealer-visits
translationKey: manufacturing-cloud-partner-visit-management
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Partner Visit Management, Dealers, Distributors, KPIs, Mobile]
takeaways:
  - "Partner visit management plans dealer visits with location, account, priority and an assigned rep, and gives every visit tasks with KPIs that reps capture on their phone."
  - "Each KPI has an expected value, so the back office compares expected and actual per task across dealers instead of reading free-text visit reports."
  - "Tasks can carry context such as a sales agreement, an order, an asset or a warranty term, so the rep sees the right record at the dealer."
  - "The feature has its own switch, enablePartnerVisitManagement, since API version 56.0. Trailhead documents neither the licence nor offline use, so ask Salesforce before you plan with them."
  - "With a few dealers and no fixed KPIs, a simple visit report object is enough. The feature pays off when many dealers are visited with the same checklist."
faq:
  - q: "What is partner visit management in Salesforce?"
    a: "A Manufacturing Cloud feature for planned and ad hoc visits to dealers, distributors and suppliers. Managers define tasks and KPIs with expected values, reps execute the visit in a mobile app and record the actual values, notes and screenshots."
  - q: "Which KPIs can reps capture during a visit?"
    a: "Trailhead names spare parts counts, scrap percentages and safety training dates as examples. Metrics can be boolean, percentage, decimal, integer, date and time, or text."
  - q: "Does partner visit management work offline?"
    a: "The Trailhead units do not say. The pricing page lists full offline mobile functionality in the sales feature list without stating whether it covers the Partner Visits app. Ask Salesforce to confirm it in writing."
  - q: "Do I need partner visit management for dealer visits?"
    a: "Not with a handful of dealers and visits without fixed KPIs. A custom visit object with a few fields or standard Salesforce events is cheaper to run. The feature pays off with many dealers and a recurring checklist."
draft: false
---

Partner visit management can turn dealer visits into comparable data, provided you define the KPIs before the first visit. The Manufacturing Cloud feature plans visits with tasks, each task carries KPIs with an expected value, and reps record the actual values on their phone. The back office then compares expected and actual across all dealers instead of reading visit reports. Trailhead documents the process well. It does not document the licence for the reps or whether the app works offline, so those two points belong in the quote. With few dealers and no fixed checklist, a simple visit report object does the job.

## What does partner visit management do?

Partner visit management plans and records visits to dealers, distributors and suppliers. The [Trailhead module](https://trailhead.salesforce.com/content/learn/modules/partner-visit-management-for-dealers-and-distributors/get-started-with-partner-visit-management) describes three parts:

- **Visits.** A visit has a location, special instructions and an assigned field rep. Recurring visits follow a template. Ad hoc visits handle urgent issues, in the Trailhead example a reported fault in one model.
- **Tasks.** Each visit has tasks that give it a purpose, such as reviewing quarterly targets, checking warranty renewals or auditing inventory.
- **KPIs.** Tasks carry metrics such as spare parts count, scrap percentage or safety training dates. Formats are boolean, percentage, decimal, integer, date and time, and text.

On the [product page](https://salesforce.com/manufacturing/cloud/sales) Salesforce adds that visits show location, priority, estimated visit time and previous visit history, and that admins build visit pages from components called Visit Overview, Visit Actions and Visit Task List.

## How does a visit run from plan to KPI?

The [unit on creating and executing visits](https://trailhead.salesforce.com/content/learn/modules/partner-visit-management-for-dealers-and-distributors/create-and-execute-partner-visits) shows the steps in the back office:

```schritte
Tasks
  Create generic tasks and mark reusable ones as task definitions.
Context
  Link a task to a distributor account, a product, an order or a sales agreement.
Assessment indicator definitions
  Define what is measured and in which data type.
Generic visit KPIs
  Store the expected value per task.
Action plan templates
  Bundle tasks and metrics for recurring visits. Ad hoc visits do not need one.
Visit
  Enter location, account and priority, optionally assign a rep.
```

The rep opens the Partner Visits app from the App Launcher, sees scheduled visits, taps Get Directions and works through the tasks. For each task the app shows context, metrics and expected values. The rep enters values, adds notes and uploads screenshots. When all metrics of a task are captured, the task completes, and when all tasks are done, the visit completes. If a mandatory task cannot be done, the rep abandons the visit and has to give a reason.

The first unit also shows tasks linked to customer records, for example a warranty term on a warranty renewal task or an asset on a damage inspection. That is useful for dealers who handle [warranty claims](../warranty-claims-dealers-salesforce/): the rep sees the open warranty terms while standing in the workshop.

## How do you switch it on, and what is unclear?

The feature has its own setting. In the [IndustriesManufacturingSettings metadata](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm) it is `enablePartnerVisitManagement`, available since API version 56.0, next to `enablePartnerLeadManagement` and `enablePartnerPerformanceManagement`. All default to off. So "we have Manufacturing Cloud" does not mean visits are running.

Two points are not documented in the sources I checked:

- **Licence.** Trailhead links a help article on permission sets for partner visit management, but the units name no permission set and no licence. The [pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) lists "Visit Management" in its feature list without showing per edition where it is included. Whether internal reps need a Manufacturing Cloud licence and whether dealer staff can execute visits on a portal licence: ask Salesforce.
- **Offline.** The units speak of "their mobile app" and the Partner Visits app. The pricing page lists "Full Offline Mobile Functionality" in the same feature list, again without per edition availability, and says nothing about the visit app in particular. Dealer workshops and warehouses often have poor reception. Ask Salesforce whether visits, tasks and KPI capture work offline, and test it in a basement before rollout.

How I would treat both points in the licence plan is described in [Salesforce licences: does everyone need a full one?](../salesforce-licences-full-licence-needed/).

## Scenario: 60 dealers, quarterly, five KPIs

A typical scenario, as an assumption: a manufacturer of agricultural machinery has 60 dealers and six area sales managers. Each dealer is visited once a quarter. The visit checks five KPIs: spare parts stock of the 20 fast movers, number of trained mechanics, demo machines on site, open warranty claims older than 30 days and the share of the quarterly target reached.

That gives 240 visits and 1,200 KPI values per year, each with an expected value. After one year the head of sales can see which dealers miss the spare parts target every quarter and which area manager never records the training dates. Today that information sits in Word documents or emails, if it exists at all.

Three things decide whether it works:

1. **KPIs before the visit.** Five KPIs with clear definitions, agreed with sales management. "Spare parts stock" needs a list of parts and a counting rule.
2. **Expected values per dealer.** A small dealer and a flagship dealer should not have the same target. Someone has to maintain the expected values, ideally once a year.
3. **One action plan template.** All quarterly visits use the same template, so values are comparable. Special topics go in ad hoc visits.

Abandoned visits produce data too. Because the app asks for a reason when a rep ends a visit early, after a year you can see whether mandatory tasks fail for lack of time, a missing contact at the dealer or an unclear KPI. Set the reasons up as a picklist, not as free text, or you cannot report on them.

If the shared KPIs cannot be agreed, the feature collects data that nobody compares. Then the problem is a management question in sales, and no software solves it.

## When is a simple visit report enough?

With few dealers, rare visits or no fixed checklist. A custom object with date, dealer, rep, three picklists and a notes field, or standard Salesforce events with a short page layout, covers that.

```pro-contra
pro: Partner visit management pays off with
- Many dealers visited on a fixed cycle, so templates save planning time
- The same KPIs for every dealer, so comparisons make sense
- Context such as sales agreements, assets or warranty terms that the rep needs on site
- Managed dealer performance, for example as input for [dealer rebates](../rebate-management-dealer-rebates/) or the [Manufacturing Cloud customer portal](../manufacturing-cloud-customer-portal/)
contra: What speaks for the simple report
- It costs little to build and runs on the licences your sales team already has
- It is easy to report on
- Licence and offline use of the visit app are not documented
```

The chapter on the [dealer and partner channel](../../masterclass/manufacturing-cloud/dealer-and-partner-channel/) shows how visits sit next to rebates, portals and ship and debit. Whether to buy or build such a feature is part of my [make-or-buy and licence forecasts](../../services/make-or-buy-licences/).

## Where should you start?

1. **KPIs.** Write down five KPIs with definition, data type and expected value per dealer group.
2. **Licence and offline.** Get both confirmed in writing for reps and, if planned, dealer staff.
3. **Pilot.** One region, one quarter, one template.
4. **Review.** After the quarter, check which KPIs were filled and which led to a decision.

Partner visit management turns dealer visits into comparable data once the KPIs are agreed and the app works where your reps are.
