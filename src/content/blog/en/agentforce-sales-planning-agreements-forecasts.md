---
title: "Agentforce Sales Planning: What the Agent Really Does"
description: "What the Agentforce for Sales Planning template does with sales agreements and forecasts, what Salesforce leaves undocumented and which ERP data comes first."
pubDate: 2026-10-27
lang: en
slug: agentforce-sales-planning-agreements-forecasts
translationKey: sales-planning-agent-agreements
topic: data
categories: [manufacturing-cloud, ai]
tags: [Agentforce, Manufacturing Cloud, Sales Agreements, Account Forecasting, ERP, Sales Planning]
takeaways:
  - "According to Salesforce Help, the Sales Planning agent answers questions about sales agreements, writes performance summaries, helps set up visits and draft emails, and bulk updates sales agreements."
  - "The help pages document three subagents: Sales Agreement Management, Sales Agreement Bulk Update and Program Forecasts to Opportunities. None of them is described as working on account forecasts."
  - "The proactive alerts on build plan deviations from the August 2025 announcement are not described in the help pages for the template, as far as I could find."
  - "Every answer about agreement performance rests on actual quantities from the ERP. Without a daily actuals feed per customer, product and period, the agent reports gaps that do not exist."
  - "Agentforce Manufacturing is also the product name on Trailhead, so a feature with that label is not automatically an agent. Ask which subagent, which action and which licence."
faq:
  - q: "What is Agentforce for Sales Planning?"
    a: "An agent template for Manufacturing Cloud. According to Salesforce Help, it answers questions about sales agreements, generates performance summaries, assists with visits and emails, bulk updates sales agreements and converts program component forecasts to opportunities."
  - q: "Which licence does the Sales Planning agent need?"
    a: "Salesforce Help names Enterprise, Performance or Unlimited Edition with the Agentforce for Manufacturing add-on, or Agentforce 1 Manufacturing Edition, and every user needs the add-on to access the action. Clarify with your account team how this maps to the new Max editions."
  - q: "Does the Sales Planning agent work on account forecasts?"
    a: "The help page for the template does not name account forecasts in its body, and none of the three documented subagents is about them. Recalculating forecasts exists as a Flow action, which a custom agent action could call, but that is your own build."
  - q: "Where does the agent get actual quantities from?"
    a: "From the actual values stored on sales agreement product schedules. When orders live in SAP or proALPHA, an integration has to load them, for example through Bulk API in the mode Manually using API upload, and a daily job refreshes the agreements."
draft: false
---

Agentforce for Sales Planning is an agent template for Manufacturing Cloud that answers questions about sales agreements, writes performance summaries, helps set up customer visits and bulk updates agreements. That is what Salesforce Help documents today. Two things from the August 2025 announcement are thinner in the documentation: proactive alerts when build plans and sales drift apart, and any work on account forecasts. All answers about agreement performance rest on actual quantities from the ERP, so for a manufacturer the actuals feed from SAP or proALPHA comes before the agent.

## What does Agentforce for Sales Planning do according to Salesforce?

Salesforce announced Agentforce for Manufacturing on [21 August 2025](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) and said the Sales Planning template was "available today". The announcement describes an agent that can "monitor and alert" sales and operations staff "to notable deviations in build plans based on planned and actual product sales". Based on these deviations, it "can automatically schedule an onsite visit" with "proposed talking points for the account team".

The [help page for the template](https://help.salesforce.com/s/articleView?id=ind.mfg_gen_ai_agentforce_sales_planning_agent.htm&language=en_US&type=5) is more modest. The agent "can answer questions about your sales agreements, generate performance summaries, and assist with related actions such as setting up visits or drafting emails". It can also "perform bulk updates on sales agreements, and update records based on related data". For Program Based Business, the Manufacturing Cloud area for manufacturing programmes, it converts program component forecast records to opportunities.

| Topic | Announcement, August 2025 | Help page, October 2026 |
|---|---|---|
| Sales agreements | not named | questions, summaries, bulk updates |
| Build plan deviations | monitor and alert | not described |
| Visits | schedule automatically, with talking points | assist with setting up visits, draft emails |
| Account forecasts | not named | not named in the body |
| Program forecasts | not named | convert to opportunities |

The help page lists three subagents: Sales Agreement Management, Sales Agreement Bulk Update and Program Forecasts to Opportunities. Licensing is stated as Enterprise, Performance or Unlimited Edition with the Agentforce for Manufacturing add-on, or Agentforce 1 Manufacturing Edition, and "each user" needs the add-on. The [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/) lists the "full suite of Agentforce for Industries" in the Max editions. How the two fit together for your contract is a question for the account team before the pilot, not after.

## Why is "Agentforce Manufacturing" not always an agent?

Trailhead now calls the product itself Agentforce Manufacturing. The [Trailhead quick look](https://trailhead.salesforce.com/content/learn/modules/agentforce-manufacturing-quick-look/explore-agentforce-manufacturing-capabilities) lists "Agent-powered sales agreements" and "Advanced account forecasting" as capabilities, next to "Agentforce for sales planning". The unit names no Agentforce actions.

The same naming shows up in the forecast settings. Trailhead writes that "Agentforce Manufacturing also generates forecasts automatically for new products at the start of each adjustment period". In the [same unit](https://trailhead.salesforce.com/content/learn/modules/manufacturing-cloud-admin-essentials/define-account-forecast-settings) this is the forecast recalculation at the start of each adjustment period, a scheduled calculation. No subagent or prompt is involved.

I do not mind the branding. It becomes a problem in a vendor workshop when "the agent forecasts your new products" ends up in the business case. My question in such a meeting is always the same: which subagent, which action, which licence, and where is it in the help pages?

## How far does the agent really work on sales agreements and account forecasts?

On sales agreements, the documentation is concrete. The agent reads them, summarises them and changes them in bulk. The [considerations for sales agreements](https://help.salesforce.com/s/articleView?id=sf.mfg_sa_considerations.htm&language=en_US&type=5) set the frame it works in:

- **Size.** A sales agreement can hold at most 1,500 products or product categories and 72 schedules.
- **Mass update.** It processes at most 100,000 filtered schedules across all selected products. Above that, the whole update fails for all selected products.
- **Summary.** The AI summary component on the sales agreement page shows only "the top three products and up to five schedules per product".

The help does not say whether the agent's bulk update runs into the same cap or whether its performance summary uses the same cut. I would test both with the largest agreement in the org before anyone relies on them.

On account forecasts, the documentation is silent. The template page does not name them in its body, and none of the three subagents works on them. What exists are [Flow actions](https://help.salesforce.com/s/articleView?id=sf.admin_manufacturing_standard_invocable_actions.htm&language=en_US&type=5) such as Calculate Advanced Account Forecasts, Recalculate Forecasts Actions and Refresh Actuals Calculation. A custom agent action that calls one of these flows is technically plausible. It is then your build, with your tests and your support, not the template.

The build plan comparison from the announcement is the biggest gap. I found no description of where the build plan comes from, which object holds it or what triggers an alert. As I read the help page, the agent answers when someone asks. Salesforce's [AI page for manufacturing](https://www.salesforce.com/manufacturing/artificial-intelligence/) speaks of "surfacing run-rate agreements, demand forecasts, and opportunity data conversationally" and adds that capabilities "may not reflect actual product details". I take that disclaimer literally.

## Which ERP actuals feed must exist first?

When an account manager asks which agreements are behind, the agent compares planned and actual quantities on the sales agreement product schedules. At a manufacturer, the actual quantities live in the ERP. If they are missing or late, the agent reports a shortfall with full confidence.

According to [Salesforce Help on importing actuals](https://help.salesforce.com/s/articleView?id=ind.mfg_sa_actuals_api_external.htm&language=en_US&type=5), external actuals arrive like this:

1. The admin sets the actuals calculation to "Manually using API upload".
2. An integration writes Actual Quantity and Actual Amount on Sales Agreement Product Schedule records, through Bulk API or Data Loader.
3. A daily job at 1:00 AM in the org's time zone refreshes the related agreements.
4. Users who correct values by hand need the permission "Edit Actual Quantity of Sales Agreements Products".

Which calculation mode fits and why it is hard to change later is covered in [sales agreements: spot customers behind on volume](../sales-agreements-volume-shortfall-erp/). For the agent, three extra points matter. The feed has to cover every ERP that books orders for a customer, including the subsidiary on a second system. The mapping from sold-to party to agreement account needs an owner. And the agent's answer should show the date of the last load, so a gap from a missing night run is visible as such.

If you want the build plan comparison, the plan quantities from production planning have to reach Salesforce too. Account forecasts additionally need order history, as described in [account forecasting for sales volume planning](../account-forecasting-sales-volume-planning/). How I split leading systems between ERP and Salesforce is part of my [integration with ERP, middleware and telephony](../../services/salesforce-integration/).

## A typical scenario: the Monday review at a compressor maker

Assume a compressor manufacturer with 35 account managers and 280 sales agreements with distributors and OEM customers, orders in SAP. All numbers here are assumptions for illustration.

An account manager asks the agent on Monday which of her agreements are more than 15 percent behind for the quarter. The agent answers from the actuals of the 1:00 AM run. Two distributors show up. One is real. The other orders through a Polish subsidiary that runs on a separate ERP instance not yet in the feed. Without a load date in the answer, she would have called a customer who is on plan.

For the real shortfall, the agent drafts an email and a visit with talking points. The largest distributor agreement holds an assumed 900 spare part items over 36 monthly schedules, 32,400 schedules in total. That is within the limits. If the agent's summary has the same cut as that summary component, it talks about three of 900 items, which is thin for a spare parts agreement.

Then a price increase for one product family has to go into 60 agreements. The bulk update saves an afternoon of clicking, and it is a write action on commercial data. I would run it first in a full copy sandbox and let a person confirm the list of agreements before the agent writes.

## What would I check before switching it on?

1. **Licence.** Add-on per user, Agentforce 1 Manufacturing Edition or a Max edition: get it in writing. Consumption on top is covered in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).
2. **Actuals feed.** Live, daily, reconciled with the ERP for the 20 largest agreements.
3. **Limits.** Bulk update and summary tested with your largest agreement.
4. **Language.** The help says the user interface is available in English only and may not be fully supported in other languages. Test with German questions from your sales team.
5. **Write access.** Bulk updates only with confirmation, tested as described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).
6. **Alerts.** If you need proactive alerts on build plan deviations, plan them as your own build or ask Salesforce for a dated roadmap.

Whether agents fit your company at all is covered in [Agentforce for manufacturers: start now or wait?](../agentforce-yes-or-no-manufacturers/), and the overview of manufacturing agents in the masterclass chapter [AI agents in manufacturing](../../ai-masterclass/ai-agents-in-manufacturing/).

The Sales Planning agent is a useful assistant on top of sales agreements once the ERP actuals are right, and less than the 2025 announcement suggests. If you are evaluating it for your sales team, [send me a message](#contact).
