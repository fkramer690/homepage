---
title: "Account Forecasting: Sales Volume Planning"
description: "When Manufacturing Cloud account forecasting pays off for sales volume planning, which data it needs and where planning in the ERP should take over."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: account-forecasting-sales-volume-planning
translationKey: manufacturing-cloud-account-forecasting
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Account Forecasting, Demand Planning, ERP, Manufacturing]
series: { id: manufacturing-cloud, part: 4 }
takeaways:
  - "Account forecasting plans quantities and revenue per customer, product and period, combining orders, opportunities and sales agreements."
  - "The forecast can build on order history, which at manufacturers lives in the ERP. It has to reach Salesforce through an integration."
  - "Multiplying customers by products and periods quickly produces millions of records. Salesforce publishes recommended limits, so set the scope before go-live."
  - "Salesforce provides the sales view, the ERP plans capacity and materials. Each number needs an owner, a version and a fixed handover date."
faq:
  - q: "What is account forecasting in Manufacturing Cloud?"
    a: "Account forecasting is the sales forecast in Manufacturing Cloud. It plans quantities and revenue per customer, product and period and, according to Salesforce, uses orders, opportunities, sales agreements and custom objects that the Data Processing Engine aggregates."
  - q: "How often is the forecast adjusted?"
    a: "The adjustment period defines the schedule, for example the first week of every month. During that time account managers change the values; afterwards the forecast for the period is fixed."
  - q: "Does account forecasting replace production planning?"
    a: "No. Account forecasting provides what sales expects per customer and product. Capacity, materials and production plans stay in the ERP or a planning system that uses the sales forecast as an input."
  - q: "Are there limits for account forecasting?"
    a: "Yes. For Advanced Account Forecasting, Salesforce recommends among other things at most 10 forecast sets, 3 custom dimensions, 56 periods and 4 regenerations per year. Salesforce Help also lists volume limits for the calculation runs; larger volumes have to be split."
draft: false
---

Account forecasting pays off for manufacturers with recurring call-offs whose sales team should plan quantities per customer and product over months. The Manufacturing Cloud feature combines orders, opportunities and sales agreements into a forecast that account managers adjust. It only holds up under three conditions: order history arrives reliably from the ERP, the scope of customers, products and periods fits within the volumes Salesforce recommends, and it is clear where planning in the ERP takes over.

I am writing this part of the series as an evaluation guide, not as a project report.

## What is account forecasting in Manufacturing Cloud?

Account forecasting is the sales forecast in Manufacturing Cloud. It plans quantities and revenue per customer, product and period. For the current version, Advanced Account Forecasting, [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=ind.aaf_admin_customize_task.htm&type=5) describes a few building blocks:

- **Forecast set:** the configuration for one planning objective, with dimensions, measures, adjustment periods and calculation settings.
- **Dimensions:** the axes of the forecast, such as customer and product or product category.
- **Period groups:** duration and number of periods, meaning week, month, quarter or year. According to Help, weeks require a custom fiscal year in Salesforce.
- **Data Processing Engine:** the part that filters and aggregates orders, opportunities, sales agreements and custom objects. Flows orchestrate it.

On the [product page](https://www.salesforce.com/manufacturing/cloud/sales/), Salesforce also lists account manager targets, which turn growth plans into measurable targets per customer, product and region.

The difference from the forecast that many know from Sales Cloud is this: there, sales mainly estimates which opportunities will close in which quarter. Account forecasting also plans ongoing business, meaning the volumes existing customers buy month after month. For a manufacturer with a lot of recurring business, that is often the larger share of revenue.

## The forecast needs data from the ERP

There is no single Salesforce formula. For each measure in the forecast set, the company decides whether the Data Processing Engine calculates it, a forecast formula derives it, or users enter or import the value. The calculation template Salesforce provides aggregates orders, opportunities and sales agreements, and at manufacturing companies, two of these sources rarely live in Salesforce:

1. **Order history.** For products customers buy regularly, what a customer bought in recent months is a good starting point for the coming months. For new products or after a shift in the market, it is less informative. That history lives in the ERP. Trailhead describes exactly this problem in its example: forecasts were inaccurate because sales had no access to the history in the ERP.
2. **Sales agreements.** Agreed volumes are a fixed input to the forecast. How actuals for sales agreements come from the ERP is covered in [part 3: sales agreements, spotting customers behind on volume](../sales-agreements-volume-shortfall-erp/).
3. **Opportunities.** New business that has not closed yet. This is the only one of these sources that is created in Salesforce in any case.

```ablauf
sf: Sales agreements, Opportunities, Account forecast
erp: Order history, ERP planning
Order history --integration--> Account forecast
Sales agreements --> Account forecast
Opportunities --> Account forecast
Account forecast ..handover..> ERP planning
```

From an architecture perspective, that means account forecasting is first and foremost an integration project. In the global rollout I describe in part 3, orders and inventory came from the ERP. A forecast needs exactly that data too. Anyone introducing account forecasting should therefore plan the order history integration before configuring the forecast set. How I decide which systems of record to use for orders and prices is described under [integration with ERP, middleware and telephony](../../services/salesforce-integration/).

## How big does the forecast get?

Bigger than you think in the first workshop. Advanced Account Forecasting stores its values as forecast fact records, one per combination of dimensions and period. A worked example: 2,000 customers, 500 products and 24 months give up to 24 million combinations. Not every customer buys every product, so first estimate how many combinations actually occur. The order of magnitude still shows the problem.

In its [considerations for Advanced Account Forecasting](https://help.salesforce.com/s/articleView?id=ind.aaf_considerations_concept.htm&language=en_US&type=5), Salesforce recommends, among other things, at most 10 forecast sets, 3 custom dimensions, 56 periods and 4 regenerations per year. For the underlying Data Processing Engine runs, Salesforce Help also lists volume limits; larger volumes have to be split. These are recommendations rather than hard limits, but anyone planning beyond them should have Salesforce confirm it.

The same page warns against activating the older account forecasting and Advanced Account Forecasting at the same time, because that can corrupt data. Salesforce recommends Advanced Account Forecasting for new implementations and a [migration](https://help.salesforce.com/s/articleView?id=ind.aaf_admin_migrate_af.htm&language=en_US&type=5) for existing ones. This article is about Advanced Account Forecasting only.

That leads to three scoping decisions:

- **Product or product category.** A forecast at category level is orders of magnitude smaller and precise enough for many sales questions.
- **Which customers.** A forecast per customer pays off for the large customers with framework agreements. For the long tail, a forecast at region or customer group level may be enough.
- **How many periods.** A display horizon of 24 months plus history is quick to configure. Every extra month multiplies the records.

I fix this scope before the first forecast set is activated, and I check the expected number of forecast records against the volumes Salesforce documents.

## How often and by whom is it adjusted?

The system calculates the forecast, people adjust it. To support this, the admin defines adjustment periods in the forecast set, for example the first week of every month. During that time account managers change their values; afterwards the forecast for the period is fixed.

That requires a fixed cadence in sales. After three months, a forecast that is adjusted only when someone remembers barely differs from the system's calculation. So before go-live I ask:

- **Who adjusts?** The account manager for their customers, a sales manager for the region, or both in turn?
- **When?** In the same rhythm as production and procurement planning. Otherwise the sales forecast arrives too late for the decision it is needed for.
- **How are deviations explained?** A field for the reason behind a larger adjustment costs little and makes the number traceable later.

## Sales forecasting ends where production planning begins

Sales forecasting ends when the question is what gets produced. Account forecasting provides what sales expects: which customer will buy which quantity of which product in which month. Whether that quantity can be produced, with which materials and on which line, is decided by planning in the ERP or a dedicated planning system. How forecasts, sales agreements and targets fit together is covered in [chapter 2 of the Manufacturing Cloud masterclass](../../masterclass/manufacturing-cloud/agreements-and-forecasting/).

Two points matter for the architecture:

1. **A clear role for each number.** A sales forecast in Salesforce and a demand plan in the ERP may differ, because one is the unconstrained sales view and the other takes capacity into account. The team has to settle which number serves which decision, who owns it, which version is handed over when, and how capacity limits are fed back to sales. Two forecasts for the same purpose that are both maintained drift apart, and then people argue about numbers instead of customers.
2. **Matching granularity.** If the sales forecast flows into the ERP, the integration needs the same granularity as planning there. If the ERP plans by material number and plant, a forecast by product category helps only so much.

A note on Agentforce: Trailhead says that "Agentforce Manufacturing" generates forecasts automatically for new products at the start of each adjustment period. Agentforce Manufacturing is the product name used there. As I read the Trailhead unit, this is the forecast calculation at the start of the period, not an agent, and the Salesforce Help page for the Sales Planning agent does not document a subagent for it ([what the agent really does](../agentforce-sales-planning-agreements-forecasts/)). That sounds useful. I would only rely on it once history from the ERP arrives cleanly, because an automatic forecast based on bad data only produces the wrong result faster.

## When does account forecasting pay off?

I would recommend account forecasting when several of the first four conditions apply:

```pro-contra
pro: Account forecasting pays off
- **A lot of recurring business:** a large share of revenue comes from regular offtake by existing customers.
- **Sales agreements are already planned:** agreed volumes live in Salesforce anyway, and the forecast builds on them.
- **The sales forecast lives in spreadsheets today:** one file per account manager that someone merges every month.
- **Production or procurement is waiting for the number:** there is a fixed date by which the sales view is needed.
contra: I would hold back
- When the business has a few large projects instead of recurring call-offs.
- When demand planning works well in the ERP and only needs read access in the CRM.
- When the order history cannot reach Salesforce.
```

In the last case the company pays for a feature that cannot work with its own data. Whether Manufacturing Cloud pays off as a whole is covered in [part 1 of this series](../salesforce-manufacturing-cloud-is-it-worth-it/).

## Settle order history and scope before the first forecast set

Before the first forecast set is configured, settle these points:

1. **Order history.** Which data comes from the ERP, at which granularity and how often?
2. **Scope.** Product or category, which customers, how many periods, checked against the recommended volumes.
3. **Rhythm.** Who adjusts when, aligned with planning in production and procurement.
4. **Roles of the numbers.** Which forecast serves which decision, who owns it, and how does it reach the ERP?

I calculate the scope in the first workshop by multiplying customers by products and periods, then comparing the result with the volumes Salesforce recommends. If the combinations that actually occur exceed those volumes, I plan at product category level and shorten the horizon before anyone creates the first forecast set.
