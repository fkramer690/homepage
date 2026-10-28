---
title: "Account Forecasting: Sales Volume Planning"
description: "When Manufacturing Cloud account forecasting pays off for sales volume planning, which data it needs and where planning in the ERP should take over."
pubDate: 2026-10-27
updatedDate: 2026-10-27
lang: en
slug: account-forecasting-sales-volume-planning
translationKey: manufacturing-cloud-account-forecasting
topic: data
categories: [manufacturing-cloud]
tags: [Manufacturing Cloud, Account Forecasting, Demand Planning, ERP, Manufacturing]
series: { id: manufacturing-cloud, part: 4 }
takeaways:
  - "Account forecasting plans quantities and revenue per customer, product and period, combining orders, opportunities and sales agreements."
  - "The forecast is only as good as the order history behind it. At manufacturers that history lives in the ERP and has to reach Salesforce through an integration."
  - "Customers times products times periods quickly adds up to millions of combinations. Salesforce counts forecast records against a limit, so the scope has to be set before go-live."
  - "Salesforce provides the sales view. Capacity, materials and production planning stay in the ERP or the planning system, and one number has to count as the leading one."
faq:
  - q: "What is account forecasting in Manufacturing Cloud?"
    a: "Account forecasting is the sales forecast in Manufacturing Cloud. It plans quantities and revenue per customer, product and period and, according to Salesforce, uses orders, opportunities, sales agreements and custom objects that the Data Processing Engine aggregates."
  - q: "How often is the forecast adjusted?"
    a: "An adjustment period defines that, for example the first week of every month. During that time account managers change the values; afterwards the forecast for the period is fixed."
  - q: "Does account forecasting replace production planning?"
    a: "No. Account forecasting provides what sales expects per customer and product. Capacity, materials and production plans stay in the ERP or a planning system that uses the sales forecast as an input."
  - q: "Are there limits for account forecasting?"
    a: "Yes. Salesforce counts, among other things, forecast records per customer, product and period, and recalculations, against a limit. Once it is exceeded, further calculations only run again after old records are deleted."
draft: false
---

Account forecasting pays off for manufacturers whose sales team should plan quantities per customer and product over months and whose business consists largely of recurring offtake. The Manufacturing Cloud feature combines orders, opportunities and sales agreements into a forecast that account managers adjust. It only holds up when order history arrives reliably from the ERP, when the scope of customers, products and periods fits within the limit, and when it is clear where planning in the ERP takes over. I am writing this part of the series as an evaluation guide, not as a project report.

## What is account forecasting in Manufacturing Cloud?

Account forecasting is the sales forecast in Manufacturing Cloud. It plans quantities and revenue per customer, product and period. For the current version, Advanced Account Forecasting, [Salesforce Help](https://help.salesforce.com/s/articleView?language=en_US&id=ind.aaf_admin_customize_task.htm&type=5) describes a few building blocks:

- **Forecast set:** the configuration for one planning objective, with dimensions, measures, adjustment periods and calculation settings.
- **Dimensions:** the axes of the forecast, such as customer and product or product category.
- **Period groups:** duration and number of periods, meaning week, month, quarter or year. According to Help, weeks require a custom fiscal year in Salesforce.
- **Data Processing Engine:** the part that filters and aggregates orders, opportunities, sales agreements and custom objects. Flows orchestrate it.

On the [product page](https://www.salesforce.com/manufacturing/cloud/sales/), Salesforce also lists account manager targets, which turn growth plans into measurable targets per customer, product and region.

The difference to the forecast many know from Sales Cloud: there, sales mainly estimates which opportunities close in which quarter. Account forecasting also plans the running business, meaning the volumes existing customers take month after month. For a manufacturer with a lot of recurring business, that is often the larger share of revenue.

## Which data does the forecast need?

Three sources carry the forecast, and at manufacturers two of them rarely live in Salesforce:

1. **Order history.** What a customer took in recent months is the best starting point for the next ones. That history lives in the ERP. Trailhead describes exactly this problem in its example: forecasts were inaccurate because sales had no access to the history in the ERP.
2. **Sales agreements.** Agreed volumes are a fixed input to the forecast. How actuals for them come from the ERP is covered in [part 3: sales agreements, spotting customers behind on volume](../sales-agreements-volume-shortfall-erp/).
3. **Opportunities.** New business that has not closed yet. This is the only source that is created in Salesforce anyway.

For the architecture, that means account forecasting is an integration project first. In the global rollout I describe in part 3, orders and inventory came from the ERP. A forecast needs exactly that data too. Anyone introducing account forecasting should therefore plan the order history integration before configuring the forecast set. How I decide leading systems for orders and prices is described under [integration with ERP, middleware and telephony](../../services/salesforce-integration/).

## How big does the forecast get?

Bigger than you think in the first workshop. The forecast stores one value per customer, product and period. A worked example: 2,000 customers, 500 products and 24 months give 24 million possible combinations. Not every customer buys every product, but the order of magnitude shows the problem.

Salesforce counts these records against a limit. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/define-account-forecast-settings), setup shows usage for forecast records per customer, product and period, for recalculations and for regenerations, with a traffic light from green to red. If a regeneration exceeds the limit, it still finishes. After that, further calculations and the rollover into the next period only run again once old records are deleted.

That leads to three scoping decisions:

- **Product or product category.** A forecast at category level is orders of magnitude smaller and precise enough for many sales questions.
- **Which customers.** A forecast per customer pays off for the large customers with framework agreements. For the long tail, a forecast at region or customer group level may be enough.
- **How many periods.** 24 months of display plus history are set up quickly. Every extra month multiplies the records.

I fix this scope before the first forecast set is activated, and I check the expected number of records against the limit stated in the quote.

## How often and by whom is it adjusted?

The system calculates the forecast, people adjust it. According to Trailhead, the admin sets an adjustment frequency and an adjustment period in days for this, for example the first week of every month. During that time account managers change their values; afterwards the forecast for the period stands.

That requires a fixed rhythm in sales. A forecast that is only adjusted when someone remembers barely differs from the system's calculation after three months. So before go-live I ask:

- **Who adjusts?** The account manager for their customers, a sales manager for the region, or both in turn?
- **When?** In the same rhythm as production and procurement plan. Otherwise the sales forecast arrives too late for the decision it is needed for.
- **How are deviations explained?** A field for the reason behind a larger adjustment costs little and makes the number traceable later.

## Where does sales forecasting in Salesforce end?

At the question of what gets produced. Account forecasting provides what sales expects: which customer will take which quantity of which product in which month. Whether that quantity can be produced, with which material and on which line, is decided by planning in the ERP or a dedicated planning system. How forecasts, sales agreements and targets fit together is covered in [chapter 2 of the Manufacturing Cloud masterclass](../../masterclass/manufacturing-cloud/agreements-and-forecasting/).

Two points matter for the architecture:

1. **One leading number.** If there is a sales forecast in Salesforce and demand planning in the ERP, it has to be clear which number counts and when it is handed over. Two forecasts that are both maintained drift apart, and then the meeting argues about numbers instead of customers.
2. **One direction.** If the sales forecast flows into the ERP, the integration needs the same granularity as planning there. If the ERP plans by material number and plant, a forecast by product category helps only so much.

A note on Agentforce: Trailhead says that "Agentforce Manufacturing" generates forecasts automatically for new products at the start of each adjustment period. Agentforce Manufacturing is the product name there. As I read the Trailhead unit, this is the forecast calculation at the start of the period, not an agent, and the Salesforce Help page for the Sales Planning agent documents no subagent for it ([what the agent really does](../agentforce-sales-planning-agreements-forecasts/)). That sounds useful. I would only rely on it once history from the ERP arrives cleanly, because an automatic forecast on bad data is just wrong faster.

## When does account forecasting pay off?

I would recommend account forecasting when several of these points apply:

- **A lot of recurring business.** A large share of revenue comes from regular offtake by existing customers.
- **Sales agreements are already planned.** Then agreed volumes live in Salesforce anyway, and the forecast builds on them.
- **The sales forecast lives in spreadsheets today.** One file per account manager that someone merges every month.
- **Production or procurement is waiting for the number.** There is a fixed date when the sales view is needed.

I would hold back with a few large projects instead of running offtake, with demand planning that works well in the ERP and only needs read access in the CRM, and when the order history cannot reach Salesforce. Then the company pays for a feature that cannot work with its own data. Whether Manufacturing Cloud pays off as a whole is covered in [part 1 of this series](../salesforce-manufacturing-cloud-is-it-worth-it/).

## Where should you start?

Before the first forecast set is configured, settle four points:

1. **Order history.** Which data comes from the ERP, at which level and how often?
2. **Scope.** Product or category, which customers, how many periods, checked against the limit.
3. **Rhythm.** Who adjusts when, aligned with planning in production and procurement.
4. **Leading number.** Which forecast counts, and how does it reach the ERP?

Account forecasting is a good sales forecast when the data from the ERP is right and it is clear where planning takes over. If you are evaluating whether the feature fits your sales team, [send me a message](#contact).
