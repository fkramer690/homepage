---
title: "Account manager targets: sales targets per customer"
description: "What account manager targets in Manufacturing Cloud do, how targets flow down to accounts and products, and which data they need before the spreadsheet can go."
pubDate: 2026-10-28
lang: en
slug: account-manager-targets-sales-targets
translationKey: manufacturing-cloud-account-manager-targets
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Account Manager Targets, Sales Targets, Account Forecasting, CRM Analytics]
takeaways:
  - "Account manager targets set yearly targets on revenue, product volume or a custom measure and pass them down the team hierarchy, by account, by product and by month."
  - "Changes do not flow down on their own. A manager propagates them, or a flow calls the Update Account Manager Target Values action, which recalculates assignments from the parent value and percentage."
  - "When someone leaves or the manager hierarchy changes, assignments become invalid and have to be reassigned, moved, given a new owner or deleted."
  - "Targets only make sense next to forecasts and actuals when all three use the same customers, products and periods. Otherwise the review compares three numbers that cannot match."
  - "Commission calculation is outside the feature. Salesforce sells it separately as Spiff, and many manufacturers run it in payroll or a dedicated tool."
faq:
  - q: "What are account manager targets in Manufacturing Cloud?"
    a: "A Manufacturing Cloud feature for yearly sales targets. Managers create a target on revenue, product volume or a custom measure, split it across their direct reports, and those reports split it further by account, product and month."
  - q: "Do account manager targets replace the target spreadsheet?"
    a: "They can replace the distribution part: who has which target for which customer, product and month. They do not calculate commissions, and they only show attainment if actuals arrive in Salesforce in the same structure."
  - q: "What happens to targets when an account manager leaves?"
    a: "According to Trailhead, the assignments become invalid. The manager then reassigns them to another team member, moves them to team assignments, changes the owner or deletes them."
  - q: "Which licence do account manager targets need?"
    a: "The developer guide says the Update Account Manager Target Values action requires a Manufacturing Cloud licence. The pricing page lists the feature without showing per edition which one includes it, so ask Salesforce to confirm it for your edition."
draft: false
---

Account manager targets can replace the distribution part of a sales target spreadsheet: who has which yearly target, for which customers, products and months. The Manufacturing Cloud feature sets targets on revenue, volume or a custom measure and passes them down the team hierarchy. It does not calculate commissions, and it only shows attainment when actuals reach Salesforce in the same customer and product structure as forecasts and sales agreements. Before you switch it on, settle the hierarchy, the price book, the record limit and the source of actuals. Then the spreadsheet can go.

## What are account manager targets?

Account manager targets are the Manufacturing Cloud feature for yearly sales targets. On the [product page](https://salesforce.com/manufacturing/cloud/sales) Salesforce describes the goal as converting "your organization's growth plans into measurable targets for your customer-facing teams". The object reference lists the target as [AcctMgrTarget](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/manufacturing_standard_object_account_manager_target.htm). Agentforce Manufacturing is the newer name Trailhead uses for the product. Targets themselves involve no agent.

The building blocks, according to the Trailhead module:

- **Measure.** Revenue, product volume or a custom measure. In the example, the admin adds values such as Quantity, CSAT and NPS in Object Manager.
- **Fiscal year.** Targets use the fiscal year defined in Setup. A manager can create them for the current year and the two following ones.
- **Distribution frequency.** Monthly, quarterly or yearly. By default the target is split equally across periods, and account managers can change the share per period.
- **Team hierarchy.** Either the manager hierarchy, taken from the Manager field on each user record, or the forecasts hierarchy from Sales Cloud collaborative forecasting.
- **Price book.** A default price book, used to turn a revenue target into a product volume.

In Setup the feature has its own switch, and users need the permission set Manufacturing Account Manager Targets. In the metadata the switch is `enableIndustriesMfgTargets`, available since API version 49.0 according to the [IndustriesManufacturingSettings reference](https://developer.salesforce.com/docs/atlas.en-us.automotive_cloud.meta/automotive_cloud/auto_metadata_api_industriesmanufacturingsettings.htm).

## How do targets flow from the sales head to a product?

Top down. The [AcctMgrTarget](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/manufacturing_standard_object_account_manager_target.htm) object stores the measure, the target value and the percentage of the parent target: the head of sales creates a revenue target for the year and assigns percentages to direct reports, for example 35, 35 and 30 percent. Enter a percentage and Salesforce calculates the value, and the other way round. Each report can keep part of the target and pass the rest on.

Below the team level there are three more cuts; the [distribution](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/manufacturing_standard_object_account_manager_target_distribution.htm) stores account, product and price book for them:

1. **By account.** A share of a person's target goes to a key account, and Salesforce fills in the amount.
2. **By product.** A share goes to a product. Salesforce divides the amount by the list price from the default price book and gets a volume.
3. **By month.** The target is split equally across twelve months, and each month can be edited.

Two details matter in practice. First, the assigned values do not have to add up to the parent target. Trailhead calls that a feature, because a manager can keep a share. For controlling it means a gap or an overshoot nobody notices unless a report shows it. Second, changes do not flow down by themselves. The manager clicks Propagate to Assignments, and Salesforce sends in-app notifications to the people affected.

```vertiefung For developers
title: Updating targets from a flow
For automation there is the [Update Account Manager Target Values action](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_actions_account_manager_target.htm), available since API version 49.0. It takes the ID of a target record and updates the assignment values "based on the parent's target value and percentage". A flow can call it when the board changes the yearly target in March. The developer guide notes that the action requires a Manufacturing Cloud licence.
```

## What happens after a reorganisation?

Targets become invalid. Trailhead names a team member leaving and a changed manager hierarchy as typical causes. The manager then has four options per invalid assignment:

| Option | What it does |
|---|---|
| Reassign to Team Member | Moves the assignment to someone without an assignment on that target |
| Move to Team Assignments | Moves it into the team section, if measure and fiscal year match |
| Change Owner | Gives it to another user in the hierarchy |
| Delete Assignment | Removes it |

At a manufacturer with a yearly sales reorganisation in January, this is real work. If the manager hierarchy is the basis, the Manager field on every user record has to be correct before targets are assigned. That field is often maintained by whoever creates users, not by sales management. I would make one person responsible for it during target season.

## Which data do targets need next to forecasts and actuals?

The same structure. Salesforce promises to "track business performance from target performance to forecasts in one place". That only works when three numbers line up:

- **Target** per account manager, account, product and month, from this feature.
- **Forecast** per account, product and period, from [account forecasting](../account-forecasting-sales-volume-planning/).
- **Actuals** per account, product and period, usually from the ERP, as described for [sales agreements and volume shortfalls](../sales-agreements-volume-shortfall-erp/).

If targets are set per product and the forecast runs per product category, the review compares two numbers that cannot match. The same happens when the ERP books revenue on the sold-to party and the target sits on a parent account. I would fix one customer level, one product level and one period type for all three before anyone enters a target. How the actuals feed from SAP should look is part of my work on [integration with ERP and middleware](../../services/salesforce-integration/).

For the comparison itself, Trailhead describes the [dashboards of the CRM Analytics template](https://trailhead.salesforce.com/content/learn/modules/crm-analytics-dashboards-for-account-manager-targets/explore-sales-targets) for targets, including a Team Performance dashboard for the account manager target record page. It compares targets with actual data for the current and the last year and shows the unassigned share. It comes from the CRM Analytics app for Manufacturing Cloud, and its content depends on the objects the admin selects when creating the app. The unit names no licence. The current [pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) lists Tableau Next per edition and does not mention CRM Analytics, so ask Salesforce whether your edition includes the dashboard.

## Scenario: 40 account managers and a record limit

A typical scenario, as an assumption: a manufacturer of drive components with one head of sales, six regional managers and 40 account managers. Each account manager has 150 accounts, and targets should run per account, per product and per month for 60 products.

If every account manager distributed every account by every product and month, that would be 40 × 150 × 60 × 12, or 4.32 million period records. Trailhead's setup unit mentions a limit for Account Manager Periodic Target Distribution records that the Salesforce account executive sets together with the admin; its example uses 10 million.

```hinweis offen
The example value is no promise for your contract. I would calculate the expected number of period records before the first target year and get the limit confirmed in the quote.
```

In practice I would cut the scenario down. Targets per account for the 20 largest customers per person, per product category instead of product, and the rest as one team target. That still covers most of the revenue and keeps the record count well below a million.

## Where do commissions and incentives stay?

Outside this feature. Account manager targets distribute and display targets. They do not calculate commission, accelerators or payouts. Salesforce sells that as a separate product, [Salesforce Spiff](https://salesforce.com/sales/incentive-compensation-management), listed at $75 per user and month. Many manufacturers calculate variable pay in payroll or HR anyway, often with works council agreements attached.

The clean split: Salesforce holds the target and the attainment, the compensation system reads both and calculates the payout. Then the target in Salesforce must be the one the contract refers to, frozen at a defined date. If managers keep changing targets during the year, document who changed what, because someone will ask at bonus time.

The Sales Planning agent does not work on targets either. Which subagents Salesforce documents is in [what the Sales Planning agent really does](../agentforce-sales-planning-agreements-forecasts/), and the wider chapter on [agreements and forecasting](../../masterclass/manufacturing-cloud/agreements-and-forecasting/) shows where targets fit next to sales agreements and forecasts.

## Where should you start?

1. **Hierarchy.** Manager hierarchy or forecasts hierarchy, and who keeps the Manager field correct.
2. **Levels.** One customer level, one product level, one period type for targets, forecasts and actuals.
3. **Records.** Expected period records against the limit in the quote.
4. **Licence.** Feature and dashboard confirmed for your edition in writing.

Account manager targets replace the target spreadsheet once targets, forecasts and actuals share one structure. If you want to check that for your sales team, [send me a message](#contact).
