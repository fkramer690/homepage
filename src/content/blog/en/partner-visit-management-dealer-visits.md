---
title: "Partner visit management: dealer visits with KPIs"
description: "How partner visit management in Manufacturing Cloud turns dealer visits into tasks and KPIs, what reps capture on mobile and what to ask Salesforce first."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: partner-visit-management-dealer-visits
translationKey: manufacturing-cloud-partner-visit-management
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Partner Visit Management, Dealers, Distributors, KPIs, Mobile]
takeaways:
  - "A visit can contain tasks with location, priority and KPIs that reps capture on their phone."
  - "Tasks contain context such as a sales agreement, an order or an asset, so the rep sees the right record at the dealer."
  - "The switch enablePartnerVisitManagement has been available since API 56.0. Which editions include the licenses and whether visits work offline needs confirming."
  - "The feature is a strong candidate when many dealers are visited with the same checklist."
faq:
  - q: "What is partner visit management in Salesforce?"
    a: "A Manufacturing Cloud feature for planned and ad hoc visits to dealers, distributors and suppliers. Managers define tasks and KPIs with expected values, reps carry out the visit in a mobile app and record the actual values, notes and screenshots."
  - q: "Which KPIs can reps capture during a visit?"
    a: "Trailhead names spare parts counts, scrap percentages and safety training dates as examples. Metrics can be boolean, percentage, decimal, integer, date and time, or text."
  - q: "Does partner visit management work offline?"
    a: "The sources I checked for partner visits do not confirm offline support. Ask Salesforce to confirm in writing which steps work offline, from starting a visit to KPI entry and file upload, and test airplane mode and reconnection before rollout."
  - q: "Do I need partner visit management for dealer visits?"
    a: "Not if you have only a handful of dealers and visits without fixed KPIs. A custom visit object with a few fields or standard Salesforce events can be enough, depending on your licenses and how much logic you need. The feature is a strong candidate with many dealers and a recurring checklist."
draft: false
---

Partner visit management can turn dealer visits into comparable data, provided you define the KPIs before the first visit. The Manufacturing Cloud feature plans visits with tasks, tasks can contain KPIs with expected values, and reps record the actual values on their phone. With the right reports, the back office can compare expected and actual values across dealers instead of reading visit reports. Salesforce documents the process and the permission sets well. The quote should state which editions include the licenses and whether the app works offline. With few dealers and no fixed checklist, a simple visit report object is sufficient.

## What does partner visit management do?

Partner visit management plans and records visits to dealers, distributors and suppliers. The [Trailhead module](https://trailhead.salesforce.com/content/learn/modules/partner-visit-management-for-dealers-and-distributors/get-started-with-partner-visit-management) describes three parts:

- **Visits.** A visit has a location, special instructions and an assigned field rep. For repeated visit types, managers reuse an action plan template. Ad hoc visits handle urgent issues, such as the reported fault in one model in the Trailhead example.
- **Tasks.** Each visit has tasks that give it a purpose, such as reviewing quarterly targets, checking warranty renewals or auditing inventory.
- **KPIs.** Tasks contain metrics such as spare parts count, scrap percentage or safety training dates. Formats are boolean, percentage, decimal, integer, date and time, and text.

On the [product page](https://salesforce.com/manufacturing/cloud/sales), Salesforce adds that visits show location, priority, estimated visit time and previous visit history, and that admins build visit pages using components called Visit Overview, Visit Actions and Visit Task List.

## A visit runs from plan to KPI

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

The rep opens the visit app from the App Launcher (Salesforce documentation currently calls it both Partner Visits and Generic Visits, so check the label in your org), sees scheduled visits, taps Get Directions and works through the tasks. For each task the app shows context, metrics and expected values. The rep enters values, adds notes and uploads screenshots. When all metrics of a task are captured, the task is complete, and when all tasks are done, the rep ends the visit. If only optional tasks are open, the rep can complete the visit with a reason. If a mandatory task cannot be completed, the rep abandons the visit and has to provide a reason. So "completed" does not always mean every task was completed.

The first unit also shows tasks linked to customer records, for example a warranty term on a warranty renewal task or an asset on a damage inspection. That is useful for dealers who handle [warranty claims](/en/blog/warranty-claims-dealers-salesforce/): the rep sees the open warranty terms while standing in the workshop.

## Switching it on is easy, license scope and offline are open

The feature has its own setting. In the [IndustriesManufacturingSettings metadata](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm), it is `enablePartnerVisitManagement`, available as of API version 56.0, next to `enablePartnerLeadManagement` and `enablePartnerPerformanceManagement`. All default to off. So "we have Manufacturing Cloud" does not mean visit planning is active.

Two points need to be confirmed before you base your plan on it:

- **License.** Salesforce Help lists the Partner Visit Management permission set and permission set license for internal users, and Partner Visit Management for Experience Cloud for external users, in its example for a Partner Community license. The [pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) lists "Visit Management" in its edition comparison. Ask Salesforce to confirm in writing which of your contracted editions include these permission set licenses, in which quantity, and whether the external flow matches the internal mobile flow.
- **Offline.** The sources I checked for partner visits do not confirm offline support. The general "Full Offline Mobile Functionality" line on the pricing page says nothing about the visit components. Dealer workshops and warehouses often have poor reception. Ask Salesforce whether starting and ending a visit, working through tasks, entering KPIs and uploading files work offline, and test the app in airplane mode and during reconnection with conflicting changes before rollout.

I describe how to treat both points in the license plan in [Salesforce licenses: does everyone need a full one?](/en/blog/salesforce-licences-full-licence-needed/).

## Worked example: 60 dealers, quarterly, five KPIs

Assume a manufacturer of agricultural machinery has 60 dealers and six area sales managers. Each dealer is visited once a quarter. The visit checks five KPIs: spare parts stock of the 20 fast movers, number of trained mechanics, demo machines on site, open warranty claims older than 30 days and the share of the quarterly target reached.

That gives 240 visits and 1,200 KPI values per year, each with an expected value. With reports built for this data, after one year the head of sales can see which dealers miss the spare parts target every quarter and which area manager never records the training dates. Today that information is kept in Word documents or emails, if it exists at all.

Three things decide whether it works:

1. **KPIs before the visit.** Five KPIs with clear definitions, agreed with sales management. "Spare parts stock" needs a list of parts and a counting rule.
2. **Expected values per dealer.** A small dealer and a flagship dealer should not have the same target. Someone has to maintain the expected values, ideally once a year.
3. **One action plan template.** All quarterly visits use the same template, so values are comparable. Special topics are handled as ad hoc visits.

Abandoned visits produce data too. Because the app asks for a reason when a rep ends a visit early, after a year you can see whether mandatory tasks are not completed because of a lack of time, a missing contact at the dealer or an unclear KPI. The standard reason field (StatusRemarks on Visit) is free text. If you want to report on reasons, add your own picklist field and check whether the standard mobile action prompts for it or whether the flow needs to be extended.

If the shared KPIs cannot be agreed, the feature collects data that nobody compares. Then the problem is a sales management issue, and no software will solve it.

## When is a simple visit report enough?

A simple visit report is enough when visits are rare and there is no fixed checklist and no need for tasks, expected values or templates. Then a custom object with date, dealer, rep, three picklists and a notes field, or standard Salesforce events with a short page layout, can cover it. The deciding factor is how complex and repeatable the visit process is, not the number of dealers alone.

```pro-contra
pro: Partner visit management is a strong candidate with
- Many dealers visited on a fixed cycle, so templates save planning time
- The same KPIs for every dealer, so comparisons make sense
- Context such as sales agreements, assets or warranty terms that the rep needs on site
- Managed dealer performance, for example as input for [dealer rebates](/en/blog/rebate-management-dealer-rebates/) or the [Manufacturing Cloud customer portal](/en/blog/manufacturing-cloud-customer-portal/)
contra: What speaks for the simple report
- It is quick to build for a narrow process and may work with licenses your sales team already has (check this)
- It is easy to report on
- License scope and offline use of the visit app still need to be confirmed
```

The chapter on the [dealer and partner channel](/en/masterclass/manufacturing-cloud/dealer-and-partner-channel/) shows how visits relate to rebates, portals and ship and debit. I cover whether to buy or build such a feature in my [make-or-buy and license forecasts](/en/services/make-or-buy-licences/).

## Write down KPIs with expected values, then pilot one region

1. **KPIs.** Write down five KPIs with definition, data type and expected value per dealer group.
2. **License and offline.** Get license scope and offline use confirmed in writing for reps and, if planned, dealer staff.
3. **Pilot.** One region, one quarter, one template.
4. **Review.** After the quarter, check which KPI values were recorded and which led to a decision.

I review the pilot with the head of sales. KPIs that did not lead to a decision after one quarter are removed from the template before it is rolled out to all regions.
