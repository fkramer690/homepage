---
title: "Agentforce Sales Planning: What the Agent Really Does"
metaTitle: "Agentforce Sales Planning: not included in Agentforce Sales"
description: "Agentforce for Sales Planning is not part of Agentforce for Sales, it needs the Manufacturing add-on. What it does with sales agreements, and its limits."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: agentforce-sales-planning-agreements-forecasts
translationKey: sales-planning-agent-agreements
topic: data
categories: [manufacturing-cloud, ai]
tags: [Agentforce, Manufacturing Cloud, Sales Agreements, Account Forecasting, ERP, Sales Planning]
takeaways:
  - "The help pages document three subagents. None of them is described as working on account forecasts."
  - "I could not find the proactive alerts on build plan deviations from the 2025 announcement in the help pages."
  - "If the ERP holds the actuals, a daily feed per customer, product and period comes first, or the agent can report gaps that do not exist."
  - "Not every feature labeled Agentforce Manufacturing is an agent. Ask which subagent, action and license stand behind it."
faq:
  - q: "What is Agentforce for Sales Planning?"
    a: "An agent template for Manufacturing Cloud. According to Salesforce Help, it answers questions about sales agreements, generates performance summaries, assists with visits and emails, bulk updates sales agreements and converts program component forecasts to opportunities."
  - q: "Which license does the Sales Planning agent need?"
    a: "Salesforce Help names Enterprise, Performance or Unlimited Edition with the Agentforce for Manufacturing add-on, or Agentforce 1 Manufacturing Edition, and every user needs the add-on to access the action. Clarify with your account team how this maps to the new Max editions."
  - q: "Does the Sales Planning agent work on account forecasts?"
    a: "The help page for the template does not name account forecasts in its body, and none of the three documented subagents is about them. Recalculating forecasts exists as a Flow action, which a custom agent action could call, but that is your own build."
  - q: "Where does the agent get actual quantities from?"
    a: "From the actual values stored on sales agreement product schedules. When orders live in SAP or proALPHA, an integration has to load them, for example through Bulk API in the mode Manually using API upload, and a daily job refreshes the agreements."
  - q: "Is Sales Planning included with Agentforce for Sales?"
    a: "The agent template is not. Salesforce Help ties Agentforce for Sales Planning to the Agentforce for Manufacturing add-on or Agentforce 1 Manufacturing Edition. The separate Sales Planning product for territory and quota planning is included in Agentforce 1 Sales Edition and the Sales Cloud Max edition; for other editions availability differs between Salesforce's regional pricing pages."
draft: false
---

Agentforce for Sales Planning is not included in Agentforce for Sales: the agent template belongs to Manufacturing Cloud and needs the Agentforce for Manufacturing add-on or Agentforce 1 Manufacturing Edition. It answers questions about sales agreements, writes performance summaries, helps set up customer visits and bulk updates agreements. That is what Salesforce Help documents today, with tight limits: the bulk update preview shows the first 50 agreements, and one update covers at most 450 agreement products. When the actual quantities live in SAP or proALPHA, the actuals feed comes before the agent.

## What does Agentforce for Sales Planning do according to Salesforce?

Salesforce announced Agentforce for Manufacturing on [21 August 2025](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) and said the Sales Planning template was "available today". The announcement describes an agent that can "monitor and alert" sales and operations staff "to notable deviations in build plans based on planned and actual product sales". Based on these deviations, it "can automatically schedule an onsite visit" with "proposed talking points for the account team".

The [help page for the template](https://help.salesforce.com/s/articleView?id=ind.mfg_gen_ai_agentforce_sales_planning_agent.htm&language=en_US&type=5) is more modest. The agent "can answer questions about your sales agreements, generate performance summaries, and assist with related actions such as setting up visits or drafting emails". It can also "perform bulk updates on sales agreements, and update records based on related data". For Program Based Business, the Manufacturing Cloud area for manufacturing programs, it converts program component forecast records to opportunities.

| Topic | Announcement, August 2025 | Help page, October 2026 |
|---|---|---|
| Sales agreements | not named | questions, summaries, bulk updates |
| Build plan deviations | monitor and alert | not described |
| Visits | schedule automatically, with talking points | assist with setting up visits, draft emails |
| Account forecasts | not named | not named in the body |
| Program forecasts | not named | convert to opportunities |

The help page lists three subagents: Sales Agreement Management, Sales Agreement Bulk Update and Program Forecasts to Opportunities. The [bulk update subagent](https://help.salesforce.com/s/articleView?id=ind.mfg_gen_ai_agentforce_sales_agreement_bulk_update_topic.htm&language=en_US&type=5), for example, uses the actions Summarize Attribute Details for Sales Agreements, Perform Bulk Update for Sales Agreement Metrics in preview mode and then for real. Setup needs more than the license: the help lists provisioning and feature settings and a separate permission set for bulk updates.

```hinweis offen
Licensing is stated as Enterprise, Performance or Unlimited Edition with the Agentforce for Manufacturing add-on, or Agentforce 1 Manufacturing Edition, and "each user" needs the add-on. The [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/) lists the "full suite of Agentforce for Industries" in the Max editions. How the two fit together for your contract is a question for the account team before the pilot, not after.
```

## "Agentforce Manufacturing" is also a product name

Salesforce has renamed the product itself: Help now says ["Agentforce Manufacturing (formerly Manufacturing Cloud)"](https://help.salesforce.com/s/articleView?id=ind.mfg_manufacturing_cloud.htm&language=en_US&type=5), while many Help pages, edition names and feature names still say Manufacturing Cloud. For license checks the new name matters. The [Trailhead quick look](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) lists "Agent-powered sales agreements" and "Advanced account forecasting" as capabilities, next to "Agentforce for sales planning". The unit names no Agentforce actions.

The same naming shows up in the forecast settings. Trailhead writes that "Agentforce Manufacturing also generates forecasts automatically for new products at the start of each adjustment period". In the [same unit](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/define-account-forecast-settings) this is the forecast recalculation at the start of each adjustment period, a scheduled calculation of the older account forecasting; for new implementations Salesforce recommends Advanced Account Forecasting. No subagent or prompt is involved.

The branding becomes a problem in a vendor workshop when "the agent forecasts your new products" ends up in the business case. My question in such a meeting is always the same: which subagent, which action, which license, and where is it in the help pages?

## Is Sales Planning included with Agentforce for Sales?

The agent template Agentforce for Sales Planning is not included with Agentforce for Sales or any Sales Cloud edition. The [help page for the template](https://help.salesforce.com/s/articleView?id=ind.mfg_gen_ai_agentforce_sales_planning_agent.htm&language=en_US&type=5) ties it to the Agentforce for Manufacturing add-on or Agentforce 1 Manufacturing Edition, so it needs Manufacturing Cloud.

The confusion comes from a second product with almost the same name. Sales Planning is Salesforce's tool for territory, quota and capacity planning. According to its [pricing page](https://www.salesforce.com/sales/sales-planning/pricing/) it is included in Agentforce 1 Sales Edition and otherwise costs $75 per user and month, billed annually, as an add-on (as of 9 November 2026). The [Sales Cloud pricing page](https://www.salesforce.com/uk/sales/pricing/) lists it as included in Max and available for purchase in Starter, Pro Suite and Core (as of November 2026). It plans territories and quotas. It does not read sales agreements.

So when a quote says "Sales Planning", ask which one it means: the manufacturing agent or the planning product.

## How far does the agent really work on sales agreements and account forecasts?

On sales agreements, the documentation is concrete. The agent reads them, summarizes them and changes them in bulk. The agent's own limits come first: the preview shows only the first 50 filtered agreements, and a bulk update through the agent may not exceed 450 sales agreement products in total. The general [considerations for sales agreements](https://help.salesforce.com/s/articleView?id=sf.mfg_sa_considerations.htm&language=en_US&type=5) set the frame it works in:

- **Size.** A sales agreement can hold at most 1,500 products or product categories and 72 schedules.
- **Mass update.** The standard mass update processes at most 100,000 filtered schedules across all selected products. Above that, the whole update fails for all selected products.
- **Summary.** The AI summary component on the sales agreement page shows only "the top three products and up to five schedules per product".

The help does not say whether the 100,000 cap also applies to the agent or whether its performance summary uses the same cut. I would test both with the largest agreement in the org before anyone relies on them.

On account forecasts, the documentation is silent. The template page does not name them in its body, and none of the three subagents works on them. What exists are [Flow actions](https://help.salesforce.com/s/articleView?id=sf.admin_manufacturing_standard_invocable_actions.htm&language=en_US&type=5) such as Calculate Advanced Account Forecasts, Recalculate Forecasts Actions and Refresh Actuals Calculation. A custom agent action that calls one of these flows is technically plausible. It is then your build, with your tests and your support, not the template. Sales targets per customer are a separate feature again, see [account manager targets](../account-manager-targets-sales-targets/).

The build plan comparison from the announcement is the biggest gap. I found no description of where the build plan comes from, which object holds it or what triggers an alert. As I read the help page, the agent answers when someone asks. Salesforce's [AI page for manufacturing](https://www.salesforce.com/manufacturing/artificial-intelligence/) speaks of "surfacing run-rate agreements, demand forecasts, and opportunity data conversationally" and adds that capabilities "may not reflect actual product details". I take that disclaimer literally.

## The ERP actuals feed has to exist first

When an account manager asks which agreements are behind, the agent compares planned and actual quantities on the sales agreement product schedules. Salesforce [calculates actuals](https://help.salesforce.com/s/articleView?id=sf.mfg_sa_actuals_reference.htm&language=en_US&type=5) from direct orders, from orders through contracts or from data uploaded through the API. At most manufacturers the orders live in the ERP, so the third mode applies. If those quantities are missing or late, the agent can report a shortfall with full confidence.

```praxis
I have introduced sales agreements with actuals from the ERP in Manufacturing Cloud. The stumbling block was the ERP interface.
```

According to [Salesforce Help on importing actuals](https://help.salesforce.com/s/articleView?id=ind.mfg_sa_actuals_api_external.htm&language=en_US&type=5), the admin first sets the actuals calculation to "Manually using API upload". An integration writes Actual Quantity and Actual Amount on Sales Agreement Product Schedule records through Bulk API or Data Loader, and the daily job runs in the org's time zone. Users who correct values by hand need the permission "Edit Actual Quantity of Sales Agreements Products".

```ablauf
erp: ERP orders
sf: Product Schedules, Daily job, Sales Agreements, Sales Planning agent
ERP orders --actual quantities--> Product Schedules
Product Schedules --at 1:00 AM--> Daily job
Daily job --refreshes--> Sales Agreements
Sales Agreements --plan and actuals--> Sales Planning agent
```

Which calculation mode fits and why it is hard to change later is covered in [sales agreements: spot customers behind on volume](../sales-agreements-volume-shortfall-erp/). For the agent, three extra points matter. The feed has to cover every ERP that books orders for a customer, including the subsidiary on a second system. The mapping from sold-to party to agreement account needs an owner. And the agent's answer should show the date of the last load, so a gap from a missing night run is visible as such. That is not a standard output of the template: store the load timestamp from the source system and add it to the agent's grounding.

If you want the build plan comparison, the plan quantities from production planning have to be reachable for the agent too, stored in Salesforce or fetched by an action from the planning system. Account forecasts need configured inputs, such as orders, opportunities or sales agreements, as described in [account forecasting for sales volume planning](../account-forecasting-sales-volume-planning/). How I split leading systems between ERP and Salesforce is part of my [integration with ERP, middleware and telephony](../../services/salesforce-integration/).

## Worked example: the Monday review at a compressor maker

Assume a compressor manufacturer with 35 account managers and 280 sales agreements with distributors and OEM customers, orders in SAP. All numbers here are assumptions for illustration.

An account manager asks the agent on Monday which of her agreements are more than 15 percent behind for the quarter. The agent answers from the actuals of the 1:00 AM run. Two distributors show up. One is real. The other orders through a Polish subsidiary that runs on a separate ERP instance not yet in the feed. Without a load date in the answer, she would have called a customer who is on plan.

For the real shortfall, the agent drafts an email and a visit with talking points. The largest distributor agreement holds an assumed 900 spare part items over 36 monthly schedules, 32,400 schedules in total. That is within the general limits. If the agent's summary has the same cut as that summary component, it talks about three of 900 items, which is thin for a spare parts agreement.

Then a price increase for one product family has to go into 60 agreements. The agent shows a preview of only 50 of them, and with more than 450 affected agreement products the update exceeds its limit, which happens at an average of eight products per agreement. So I would split the update into batches of at most 50 agreements and 450 products, run it first in a full copy sandbox and use the built-in preview and confirmation for each batch.

## What would I check before switching it on?

1. **License.** Help names the add-on per user or Agentforce 1 Manufacturing Edition; the product page says the Max editions include the full Agentforce for Industries suite. Get written confirmation that your SKU provisions the Sales Planning template and its actions. Consumption on top is covered in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).
2. **Actuals feed.** Live, daily, reconciled with the ERP for the 20 largest agreements.
3. **Limits.** Preview of 50 agreements, 450 products per bulk update, summary tested with your largest agreement.
4. **Provisioning and permissions.** Feature settings from the setup page and the bulk update permission set assigned.
5. **Language.** The help says the user interface is available in English only and may not be fully supported in other languages. Test with German questions from your sales team.
6. **Write access.** Bulk updates in batches, with the built-in preview and confirmation, tested as described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).
7. **Alerts.** If you need proactive alerts on build plan deviations, plan them as your own build or ask Salesforce for a dated roadmap.

Whether agents fit your company at all is covered in [Agentforce for manufacturers: start now or wait?](../agentforce-yes-or-no-manufacturers/), and the overview of manufacturing agents in the masterclass chapter [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/).

Point 2 decides the rest. As long as actuals from the ERP are not reconciled daily, I do not switch the agent on for sales.
