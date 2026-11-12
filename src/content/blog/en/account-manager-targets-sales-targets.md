---
title: "Account manager targets: sales targets per customer"
description: "What account manager targets in Manufacturing Cloud do, how targets flow down to accounts and products, and which data they need before the spreadsheet can go."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: account-manager-targets-sales-targets
translationKey: manufacturing-cloud-account-manager-targets
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Account Manager Targets, Sales Targets, Account Forecasting, CRM Analytics]
takeaways:
  - "Changes do not flow down on their own. A manager propagates them, or a flow calls Update Account Manager Target Values."
  - "When someone leaves or a Manager field changes, assignments become invalid. Switching the hierarchy type makes all existing targets read-only."
  - "Targets, forecasts and actuals only line up when all three use the same customers, products and periods."
  - "The feature does not calculate commission. Salesforce sells Spiff for that, and many manufacturers use payroll."
faq:
  - q: "What are account manager targets in Manufacturing Cloud?"
    a: "A Manufacturing Cloud feature for yearly sales targets. Managers create a target for revenue or for a measure the admin adds, such as quantity, split it across their direct reports, and those reports split it further by account, product and month."
  - q: "Do account manager targets replace the target spreadsheet?"
    a: "They can replace the distribution part: who has which target for which customer, product and month. They do not calculate commissions, and they only show attainment if actuals arrive in Salesforce in the same structure."
  - q: "What happens to targets when an account manager leaves?"
    a: "According to Trailhead, the assignments become invalid. The manager then reassigns them to another team member, moves them to team assignments, changes the owner or deletes them."
  - q: "Which license do account manager targets need?"
    a: "The developer guide says the Update Account Manager Target Values action requires a Manufacturing Cloud license. The pricing page lists the feature without showing which edition includes it, so ask Salesforce to confirm it for your edition."
draft: false
---

Account manager targets can replace the distribution part of a sales target spreadsheet: who has which yearly target, for which customers, products and months. The Manufacturing Cloud feature sets targets for revenue or for a measure the admin adds, such as quantity, and passes them down the team hierarchy. It does not calculate commissions, and it only shows attainment when actuals reach Salesforce in the same customer and product structure as forecasts and sales agreements. Before you switch it on, settle the hierarchy, the price book, the record limit and the source of actuals. Then the spreadsheet can be retired.

## What are account manager targets?

Account manager targets are the Manufacturing Cloud feature for yearly sales targets. On the [product page](https://salesforce.com/manufacturing/cloud/sales) Salesforce describes the goal as converting "your organization's growth plans into measurable targets for your customer-facing teams". The object reference lists the target as [AcctMgrTarget](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/manufacturing_standard_object_account_manager_target.htm). Trailhead now calls the product Agentforce Manufacturing, but the targets themselves do not involve an agent.

The building blocks, according to the Trailhead module:

- **Measure.** Revenue is predefined. In the example, the admin adds measures such as Quantity, CSAT and NPS in Object Manager.
- **Fiscal year.** Targets use the fiscal year defined in Setup, and the [considerations in Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.mfg_amt_considerations.htm&language=en_US&type=5) say that they support only a standard fiscal year, not a custom one. That rules out 4-4-5 calendars. A manager can create targets for the current year and the following two years.
- **Distribution frequency.** Monthly, quarterly or yearly. By default the target is split equally across periods, and account managers can change the share per period.
- **Team hierarchy.** Either the manager hierarchy, taken from the Manager field on each user record, or the forecasts hierarchy from Sales Cloud collaborative forecasting.
- **Price book.** A default price book that supplies the list price for product distributions.

In Setup the feature has its own switch, and users need the permission set Manufacturing Account Manager Targets. In the metadata the switch is `enableIndustriesMfgTargets`, available since API version 49.0 according to the [IndustriesManufacturingSettings reference](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm).

## Targets flow down from the head of sales to the product

Targets move top down. The [AcctMgrTarget](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/manufacturing_standard_object_account_manager_target.htm) object stores the measure, the target value and the percentage of the parent target: the head of sales creates a revenue target for the year and assigns percentages to direct reports, for example 35, 35 and 30 percent. When a user enters a percentage, Salesforce calculates the value, or vice versa. Each direct report can keep part of the target and pass the rest on.

Below the team level, there are three more dimensions; the [distribution](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/manufacturing_standard_object_account_manager_target_distribution.htm) stores the account, product and price book for each one:

1. **By account.** A share of a person's target goes to a key account, and Salesforce fills in the amount.
2. **By product.** A share goes to a product. Salesforce fills in the list price from the selected price book; Help does not describe how the amount is converted into a quantity.
3. **By month.** The target is split equally across twelve months, and each month can be edited.

Two details matter in practice. First, the assigned values do not have to add up to the parent target. Trailhead calls that a feature, because a manager can keep a share. For the controlling team, that means a gap or an overshoot that nobody notices unless a report shows it. Second, changes do not flow down by themselves. The manager clicks Propagate to Assignments, and Salesforce sends in-app notifications to the people affected.

```vertiefung For developers
title: Updating targets from a flow
For automation there is the [Update Account Manager Target Values action](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_actions_account_manager_target.htm), available since API version 49.0. It takes the ID of a target record and updates the assignment values "based on the parent's target value and percentage". A flow can call it when the board changes the yearly target in March. The developer guide notes that the action requires a Manufacturing Cloud license.
```

## What happens after a reorganisation?

Assignments become invalid. Trailhead lists a team member leaving and a changed manager hierarchy as typical causes. Switching the hierarchy type itself, for example from manager hierarchy to forecasts hierarchy, has more serious consequences: according to Help, all existing targets become read-only. The manager then has four options per invalid assignment:

| Option | What it does |
|---|---|
| Reassign to Team Member | Moves the assignment to someone without an assignment on that target |
| Move to Team Assignments | Moves it into the team section, if measure and fiscal year match |
| Change Owner | Gives it to another user in the hierarchy |
| Delete Assignment | Removes it |

At a manufacturer with a yearly sales reorganisation in January, this creates significant work. If the manager hierarchy is the basis, the Manager field on every user record has to be correct before targets are assigned. That field is often maintained by whoever creates users, not by sales management. I would make one person responsible for it during target season.

## Targets, forecasts and actuals need one structure

They need the same structure. Salesforce promises to "track business performance from target performance to forecasts in one place". That only works when three numbers line up:

- **Target** per account manager, account, product and month, from this feature.
- **Forecast** per account, product and period, from [account forecasting](/en/blog/account-forecasting-sales-volume-planning/).
- **Actuals** per account, product and period, usually from the ERP, as described for [sales agreements and volume shortfalls](/en/blog/sales-agreements-volume-shortfall-erp/).

If targets are set per product and the forecast runs per product category, the review compares two numbers that cannot match. The same happens when the ERP posts revenue to the sold-to party and the target is assigned to a parent account. I would fix one customer level, one product level and one period type for all three before anyone enters a target. I cover the design of the actuals feed from SAP in [integration with ERP and middleware](/en/services/salesforce-integration/).

For the comparison itself, Trailhead describes the [dashboards of the CRM Analytics template](https://trailhead.salesforce.com/content/learn/modules/crm-analytics-dashboards-for-account-manager-targets/explore-sales-targets) for targets, including a Team Performance dashboard for the account manager target record page. It compares targets with actual data for the current year and the previous year and shows the unassigned share. It comes from the CRM Analytics app for Manufacturing Cloud, and its content depends on the objects the admin selects when creating the app. The unit does not name a license. The current [pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) lists Tableau Next by edition and does not mention CRM Analytics, so ask Salesforce whether your edition includes the dashboard.

## Worked example: 40 account managers and a record limit

Assume a manufacturer of drive components with one head of sales, six regional managers and 40 account managers. Each account manager has 150 accounts, and targets should be distributed per account, per product and per month for 60 products.

Help describes account and product distributions on separate tabs, not a matrix of account by product. That gives 40 × (150 + 60) = 8,400 distributions. Even if every distribution stored one record per month, that would be about 100,000 period records. The [considerations in Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.mfg_amt_considerations.htm&language=en_US&type=5) set the maximum for Account Manager Periodic Target Distribution records at 10 million.

```hinweis offen
Whether your setup creates one period record per distribution or one per month, I would check in a sandbox before the first target year, together with the planned team targets.
```

In practice, I would still cut the scenario down to keep it readable, not because of the limit: targets per account for the 20 largest customers per person, products only for the strategic lines, and the rest as one team target. That still covers most of the revenue and keeps the review meeting manageable.

## Where do commissions and incentives stay?

Outside this feature. Account manager targets distribute and display targets. They do not calculate commission, accelerators or payouts. Salesforce sells that as a separate product, [Salesforce Spiff](https://salesforce.com/sales/incentive-compensation-management), listed at $75 per user per month. Many manufacturers calculate variable pay in payroll or HR anyway, often with works council agreements in place.

A clean split is this: Salesforce holds the target and the attainment data, and the compensation system reads both and calculates the payout. Then the target in Salesforce must be the one the contract refers to, frozen as of a defined date. If managers keep changing targets during the year, document who changed what, because someone will ask at bonus time.

The Sales Planning agent does not manage targets either. I cover the subagents Salesforce documents in [what the Sales Planning agent really does](/en/blog/agentforce-sales-planning-agreements-forecasts/), and the wider chapter on [agreements and forecasting](/en/masterclass/manufacturing-cloud/agreements-and-forecasting/) shows where targets fit next to sales agreements and forecasts.

## Fix hierarchy and levels with sales and controlling

1. **Hierarchy.** Manager hierarchy or forecasts hierarchy, and who keeps the Manager field correct.
2. **Levels.** One customer level, one product level, one period type for targets, forecasts and actuals.
3. **Records and calendar.** Expected period records against the 10 million limit, and a standard fiscal year.
4. **License.** Feature and dashboard confirmed for your edition in writing.

I settle the levels in one meeting with the head of sales and the controlling team, because the controlling team provides the actuals. Only then do I calculate the period records and have the limit confirmed in the quote.
