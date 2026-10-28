---
title: "Sales agreements and forecasting in Manufacturing Cloud"
description: "Sales agreements, account forecasting, program-based business and targets in Manufacturing Cloud: what each one does and which ERP data it needs first."
lang: en
slug: agreements-and-forecasting
course: manufacturing-cloud
translationKey: mfg-02
chapter: 2
short: "Agreements and forecasting"
summary: "Sales agreements, account forecasting, program-based business and targets: what they do and which ERP data they need."
takeaways:
  - "The sales agreement is the core of sales planning in Manufacturing Cloud: planned quantity, actual quantity and forecast per customer, product and period in one record."
  - "At manufacturers, actuals come from the ERP. The Actuals Calculation Mode decides how they are calculated, and every sales agreement copies it when it is created."
  - "On Trailhead, Salesforce recommends advanced account forecasting: separate forecast sets per business unit, free dimensions and calculations through the Data Processing Engine."
  - "Targets, forecasts and actuals only make sense together when all three use the same customer level, the same product level and the same period type."
  - "Production, material and capacity planning stay in the ERP or planning system. Before the start, decide which sales volume figure is the leading one."
articles: [manufacturing-cloud-quote-to-agreement, manufacturing-cloud-sales-agreements-actuals, manufacturing-cloud-account-forecasting, manufacturing-cloud-program-based-business, manufacturing-cloud-account-manager-targets, sales-planning-agent-agreements]
faq:
  - q: "What is a sales agreement in Manufacturing Cloud?"
    a: "A framework contract with a customer about quantities per product and period. It belongs to an account and a price book, Salesforce spreads the total quantity across months or quarters, and plan, actuals and forecast sit side by side for each period."
  - q: "Where do the actuals in a sales agreement come from?"
    a: "From orders in Salesforce, linked directly or through contracts, from an upload through the API, or from a custom Data Processing Engine definition. When orders live in the ERP, an interface loads quantities per customer, product and period."
  - q: "What is the difference between account forecasting and advanced account forecasting?"
    a: "Account forecasting uses one configuration for the whole org and plans only at customer, product and period level. Advanced account forecasting allows separate forecast sets per business unit, region or country, free dimensions such as product category, and custom calculations. Salesforce recommends the advanced version."
  - q: "Does Manufacturing Cloud replace sales and production planning in the ERP?"
    a: "No. It provides the sales view per customer and product. What gets produced, with which material and on which line, is still planned in the ERP or a planning system that takes the sales forecast as an input."
  - q: "Does every feature in this chapter need its own licence?"
    a: "Sales agreements, forecasts, program-based business and targets each have their own switches and permission sets. The pricing page does not say for every feature which edition contains it. Have the list confirmed in the quote."
draft: false
---

Sales planning in Manufacturing Cloud has four building blocks. Sales agreements hold framework contracts with quantities per customer, product and period and compare them with actuals. Account forecasting, today in its advanced version, combines them with orders and opportunities into a sales volume forecast. Program-based business derives component demand from OEM programmes for suppliers. Account manager targets distribute annual targets from sales leadership down to customer and product. All four only work when order history and actuals arrive reliably from the ERP and when target, forecast and actuals share one structure. Production and material planning stay in the ERP.

## Why is the sales agreement at the centre?

Many manufacturers earn their money with recurring business: a customer orders similar quantities month after month, often under a framework contract with an annual volume. This is called run-rate business. For it, one question matters more than any opportunity: is the customer on plan?

The sales agreement answers it. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/sales-agreements-forecasting-manufacturing-cloud/create-sales-agreement), it belongs to an account and a price book. You enter a total quantity per product, Salesforce spreads it across the periods, and the end date follows from start date, frequency and number of periods. An agreement starts as a draft, gets approved and activates on its start date. For each period, plan, actuals and forecast then sit side by side.

The [considerations in Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.mfg_sa_considerations.htm&language=en_US&type=5) set limits: at most 1,500 products or product categories and 72 schedules per agreement. For a spare parts contract with thousands of items, that is a design question before it becomes a technical one.

Why I consider the sales agreement the main reason to look at Manufacturing Cloud at all is in [chapter 1](../scope-and-business-case/). How it works day to day is described in [sales agreements: spotting volume shortfalls](../../../blog/sales-agreements-volume-shortfall-erp/).

## From quote to sales agreement

A sales agreement plans quantities per product. That sets a requirement for everything before it: every variant that is planned and measured needs its own product identity, which the ERP also knows as a material number. With configurable products, the configurator therefore decides when a configuration becomes a product.

There is a standard route for the handover. The [Manufacturing Cloud Connect API](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/connect_resources_sales_agreement.htm) creates a sales agreement from a quote, an opportunity or a custom object, controlled by a mapping of type ConvertToSalesAgreement. The mapping has to settle four points cleanly: account level, product, price and term. I approve the price once, on the quote, and not a second time on the agreement. The details are in [from quote to sales agreement](../../../blog/quote-to-sales-agreement-product-configurator/).

The quote itself is outside Manufacturing Cloud. [Salesforce CPQ](https://www.salesforce.com/sales/cpq/end-of-life/) is no longer sold to new customers, and new features are built in Revenue Cloud. Catalogue, configurator and pricing are covered in the Revenue Cloud masterclass chapter [product catalogue, configurator and pricing](../../revenue-cloud/product-catalog-configurator-pricing/).

## Actuals: why the ERP interface decides everything

Sales enters the planned quantities when the deal closes. At manufacturers, actuals are almost always created in the ERP, where orders are entered and shipped. Without them a sales agreement shows only a plan.

According to [Salesforce Help](https://help.salesforce.com/apex/HTViewHelpDoc?id=sa_admin_actualscalc_task.htm&language=en_us), the Actuals Calculation Mode setting decides how actuals are calculated: from directly linked orders, from orders through contracts, by upload through the API or with a custom Data Processing Engine definition. Every agreement copies the mode when it is created. Switch after a year and you have two kinds of agreements in the org. So I set the mode before the first productive agreement.

When orders live in the ERP, an interface writes Actual Quantity and Actual Amount into the schedules of the agreement products, according to the [Help page on importing actuals](https://help.salesforce.com/s/articleView?id=ind.mfg_sa_actuals_api_external.htm&language=en_US&type=5), using the Bulk API or Data Loader. A daily job at 1:00 in the org's time zone then updates the agreements. For a recalculation outside that run, the [Refresh Actuals Calculation](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_actions_refresh_actuals_calculation.htm) action has existed since API version 47.0. It recalculates the current period of one agreement, optionally past or future periods too, and requires the Manufacturing Sales Agreements permission set.

Three decisions determine whether the numbers are right:

- **Account level.** When the group negotiates and the plants order, the interface has to map orders from several sold-to parties in the ERP to one agreement. That mapping table needs an owner.
- **Totals or orders.** Totals per customer, product and period are enough for plan versus actuals. Full orders pay off when sales or service should see them in Salesforce anyway.
- **Stock next to the gap.** According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/configure-sales-agreements-to-negotiate-better), custom metrics such as stock can be carried in the agreement. Only then does sales see whether an open quantity can be delivered.

Which system leads for which data is part of my work on [Salesforce integration](../../../services/salesforce-integration/).

## Account forecasting or advanced account forecasting?

Account forecasting is the sales volume forecast of Manufacturing Cloud: quantities and revenue per customer, product and period, calculated from orders, opportunities and sales agreements and adjusted by people. It comes in two versions.

| | Account forecasting | Advanced account forecasting |
|---|---|---|
| Configuration | one for the whole org | separate forecast sets per business unit, region or country |
| Granularity | customer, product and period only | free dimensions, such as product category or region |
| Calculation | fixed | Data Processing Engine templates you can clone |
| Adjustment | one window | separate adjustment periods per profile, such as partners, account managers, regional managers |

That is how the [Trailhead module on advanced account forecasting](https://trailhead.salesforce.com/content/learn/modules/advanced-account-forecasting-with-manufacturing-cloud/explore-advanced-account-forecasting) describes it. The predefined templates are Generate, Regenerate, Rollover and Recalculate Account Forecast. In the [unit on forecasting strategy](https://trailhead.salesforce.com/content/learn/modules/advanced-account-forecasting-with-manufacturing-cloud/decide-your-forecasting-strategies), Salesforce recommends the advanced version and names a second option: running both side by side for separate business units. For a new implementation I see no reason to start with the simple version.

Two consequences for the architecture. First, account forecasting is an integration project before anything else, because the order history lives in the ERP. Second, Salesforce counts forecast records against a limit; 2,000 customers, 500 products and 24 months add up to 24 million possible combinations. How to cut customers, products and periods is in [account forecasting for sales volume planning](../../../blog/account-forecasting-sales-volume-planning/).

Forecast sets, dimensions and cloned DPE definitions are configuration. They belong in the release process like any other change, as described in the DevOps chapter [data and configuration](../../devops-release-management/data-and-configuration/).

## Program-based business for suppliers to OEM programmes

Program-based business is meant for suppliers whose parts go into series products of large customers. When an OEM launches a programme, the supplier has to estimate how many of its parts each variant needs long before the first order arrives.

According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/program-based-business-with-manufacturing-cloud/get-started-with-program-based-business), programme and variant forecasts arrive as CSV files, often from external market data. Data Processing Engine templates calculate component forecasts from them, based on quantity per unit, minimum quantity and lead time of each component. An approved forecast becomes an opportunity through the Transformation API and, once won, a sales agreement through the Sales Agreement Connect API. Prerequisites are advanced account forecasting, Data Pipelines and the feature itself.

With a handful of programmes, or when a planning system already derives component demand, you get a second forecast instead of a better one. When it pays off is in [program-based business: forecasts for suppliers](../../../blog/program-based-business-supplier-forecasts/).

## Account manager targets: targets from the top down

Account manager targets replace the distribution part of the target spreadsheet. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/account-manager-targets-in-manufacturing-cloud/learn-about-account-manager-targets), sales leadership creates an annual target on revenue, quantity or a custom measure and distributes it through the manager or forecast hierarchy. Each level distributes further to customers, products and months; Salesforce converts a revenue target per product into units using the list price from the default price book chosen in setup.

Changes do not flow down on their own. A manager propagates them, or a flow calls the [Update Account Manager Target Values](https://developer.salesforce.com/docs/atlas.en-us.mfg_api_devguide.meta/mfg_api_devguide/mfg_actions_account_manager_target.htm) action. After a reorganisation, assignments become invalid and have to be redistributed. The feature calculates no commission. The details, including the record limit, are in [account manager targets: sales targets per customer](../../../blog/account-manager-targets-sales-targets/).

## Which data does sales volume planning in Salesforce need?

More from the ERP than most workshops assume. The overview:

| Building block | What comes from Salesforce | What has to come from outside |
|---|---|---|
| Sales agreements | plan per customer, product and period | actuals and stock from the ERP, material numbers |
| Account forecasting | opportunities, adjustments | order history from the ERP |
| Program-based business | adjustments, opportunities | programme and variant forecasts, quantity per unit, lead times |
| Account manager targets | targets and distribution | actual revenue in the same structure, a maintained Manager field |

The most important rule is in no table: target, forecast and actuals need the same customer level, the same product level and the same period type. If the target sits on products and the forecast on product categories, or the ERP books revenue to the sold-to party while the target hangs on the group, the monthly review compares three numbers that cannot match. I fix these three levels before the first feature is switched on.

## Where does planning in Salesforce end?

At the question of what gets produced. Salesforce provides the sales expectation: which customer will take which quantity in which month. Whether that quantity can be produced, with which material and on which line, is decided by planning in the ERP or a dedicated planning system.

Two decisions follow. There is one leading sales volume figure and a date on which it is handed over; two maintained forecasts drift apart. And the handover needs the granularity the ERP plans at, often material number and plant. A forecast by product category then helps production planning only so much.

## What can the Sales Planning agent add?

The Agentforce for Sales Planning agent template sits on top of sales agreements. [Salesforce Help](https://help.salesforce.com/s/articleView?id=ind.mfg_gen_ai_agentforce_sales_planning_agent.htm&language=en_US&type=5) names three subagents: Sales Agreement Management, Sales Agreement Bulk Update and Program Forecasts to Opportunities. The agent answers questions about agreements, writes summaries, helps with visits and emails and updates agreements in bulk. According to the description, none of the three works with account forecasts or targets.

Every answer about a customer's shortfall rests on actuals from the ERP. If a subsidiary is missing from the data flow, the agent reports a shortfall that does not exist. What the template does and which licence it needs is in [Agentforce sales planning: what the agent really does](../../../blog/agentforce-sales-planning-agreements-forecasts/); the overview of agents in manufacturing is in [AI agents in manufacturing](../../ai-salesforce/ai-agents-in-manufacturing/).

## A typical scenario, as an assumption

A maker of industrial valves with 30 account managers has 200 framework contracts with dealers and plant builders, orders in SAP. Today every account manager keeps a spreadsheet with plan and forecast, and the sales controller merges them every month.

The order I would suggest:

1. **Fix the levels.** Account level per large customer, product category or product, month as the period type.
2. **Build the actuals feed.** Totals per customer, product and month from SAP, loaded daily, with the load date in the report.
3. **Introduce sales agreements.** Actuals mode set before the first agreement, the 20 largest contracts reconciled against SAP.
4. **Advanced account forecasting** with one forecast set and a fixed adjustment window in the first week of the month.
5. **Targets** only in the next fiscal year, once actuals and forecast share one structure.

This manufacturer does not need program-based business, because it does not supply OEM programmes. I would evaluate the agent only after the actuals feed has run stably for a quarter.

## Where does it continue?

Framework contracts and forecasts concern direct sales to large customers. If you sell through dealers, you also need rebates, portals and dealer visits; that is [chapter 3: dealer and partner channel](../dealer-and-partner-channel/). All chapters are on the [overview page](../).

Sales planning in Manufacturing Cloud is as good as the actuals feed from the ERP and the shared structure of target, forecast and actuals. If you plan to introduce sales agreements or forecasts and want the data checked first, [send me a message](#contact).
