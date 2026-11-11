---
title: "Agentforce for manufacturers: start now or wait?"
description: "Should a manufacturer start with Agentforce now? Five criteria from process volume to ERP access and editions, and where Salesforce is not the right answer."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: agentforce-yes-or-no-manufacturers
translationKey: agentforce-yes-or-no-manufacturers
topic: ai
categories: [ai, manufacturing-cloud]
tags: [agentforce, ai agents, manufacturing, business case, flex credits, erp]
takeaways:
  - "If you lack volume, clear rules, clean asset and order data, or access to the ERP API, fix that before the first agent."
  - "One Agentforce action costs 20 Flex Credits, which is $0.10 at the list price of $500 per 100,000 credits; the same action in a sandbox costs 16 credits."
  - "Core, Advanced and Max include 500,000, 1 million and 2.75 million Flex Credits per org and year; usage above that is billed at the contracted rate."
  - "Decisions the ERP already makes, shop-floor processes and rare expert questions do not belong in an agent in Salesforce."
  - "Gartner expects more than 40 percent of agentic AI projects to be canceled by the end of 2027. A fixed go or no-go date protects the budget."
faq:
  - q: "Is Agentforce worth it for a mid-sized manufacturer?"
    a: "It is worth it when one process has thousands of similar requests per month, the data behind it is maintained and the ERP can be reached through an API. For rare or highly technical questions, the cost of building, testing and maintaining an agent rarely pays off."
  - q: "What does Agentforce cost per action?"
    a: "According to the Salesforce rate card, a standard or custom action costs 20 Flex Credits in production and 16 in a sandbox. Flex Credits cost $500 per 100,000, so one action costs $0.10. Prompts and Data 360 processing are charged on top."
  - q: "Do I need one of the new Salesforce editions to use Agentforce?"
    a: "No. Salesforce says pricing for existing customers on legacy editions stays unchanged, and Flex Credits can be bought separately. The new editions bundle credits, which changes the calculation at renewal. Credits only cover consumption; the add-on a given agent needs, such as Agentforce for Manufacturing, depends on the agent type."
  - q: "Can Agentforce work with SAP or proALPHA?"
    a: "Yes, if the ERP exposes an API. Salesforce documents a path where a MuleSoft API is synced into the API Catalog and becomes an agent action. Without an API, RPA or the Systems Integration Agent can work through the ERP screens, but UI automation is more sensitive to screen changes than an API."
draft: false
---

Agentforce for manufacturers makes sense now if you have one process with high volume, clear rules, clean data and an API to your ERP. Dealer questions about order status, delivery dates and spare part availability are typical candidates. If the data behind the process is patchy or the ERP has no interface, a pilot will mainly expose that gap, and you will pay for the lesson. I would rather spend the first months fixing it. For decisions that are already made in SAP or proALPHA, Salesforce is often the wrong place for an agent.

## Should a manufacturer start with Agentforce now?

The product is ready for narrow processes. Salesforce launched Agentforce for Manufacturing in [August 2025](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) with templates for sales planning, inventory management and asset service, plus field service functions such as appointment booking and job reports. According to the [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/), Summer '26 added an AI Warranty Concierge and an AI Partner Sales Assistant, and Winter '27 adds a Warranty Claims Adjudication Agent.

What is live at manufacturers is narrower than what Salesforce has announced. Siemens, the most visible industrial reference, [announced in September 2026](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) that two agents engage and qualify inbound leads for 18,000 sellers across 132 countries. Before that, more than 2,500 unqualified leads were received each month. The SAP steps for supplier onboarding and the Teamcenter link for service are described as plans. I read that as a sensible order: start where the volume is high and a wrong answer has limited consequences.

So the open question is whether your first process is ready. Five criteria decide that.

```ring
title: What must be in place before the first agent
centre: Agentforce | ready?
- message | Volume | Enough repetition | Thousands of similar requests; Requests and minutes counted; Build cost covered
- search | Data | Reliable master data | Installed base with serial numbers; Spare part master data; Maintained knowledge articles
- integration | ERP | Access through an API | Order status, stock, prices; API as an agent action; RPA only as a fallback
- budget | Cost | Billing per action | Flex Credits per action; Unused credits expire; Documents cost extra
- license | Edition | Credits in the contract | Core, Advanced or Max; Pool per org and year; Switch at renewal
```

## The criteria for the Agentforce decision

### 1. Is there enough volume?

An agent pays for itself through repetition. A process with a few hundred requests a month rarely covers the cost of building, testing and maintaining the agent. Good candidates in manufacturing have thousands of similar requests: dealer questions about orders and delivery dates, spare part availability, appointment requests in field service, first-level warranty questions. Count the requests per month and the minutes each one takes today before anyone writes a prompt.

### 2. Does the data hold?

An agent reads what is in the system and, unlike an experienced service rep, does not know which fields to distrust. For a machine builder that means installed base with serial numbers, warranty start dates, spare part master data and maintained knowledge articles. Gartner [predicts](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk) that through 2026 organizations will abandon 60 percent of AI projects that lack AI-ready data. I explain why I check data before anything else in [business value and data quality first](../agentforce-business-value-data-quality-first/).

### 3. Can the agent reach the ERP?

In manufacturing the answers are usually stored in the ERP: order status, stock, prices, credit limits. Salesforce documents a path where a [MuleSoft API is synced into the API Catalog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog), Named Credentials and External Services are created automatically, and the agent calls the API as an action. If your ERP has no API, the options are RPA or the Systems Integration Agent that Salesforce [released at Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/). Both work through the user interface. Salesforce says the agent relearns changed screens; I would test exactly that before relying on it, because UI automation reacts more sensitively to screen changes than an API. The API remains my preferred path because it is easier to test and audit. I cover both paths in [Agentforce and SAP order status](../agentforce-sap-order-status-mulesoft/) and [legacy ERP without an API](../legacy-erp-without-api-ai-agents/).

### 4. Does the cost model fit?

Under the Flex Credits model, Agentforce is billed per action. The rates are in the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf), and Flex Credits cost [$500 per 100,000](https://www.salesforce.com/agentforce/pricing/). A voice action costs 30 credits. Unused credits do not roll over past the order end date. Usage above the purchased credits is billed monthly at the contracted rate, according to the [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/). The older per-conversation model is an alternative per org: Salesforce does not support Flex Credits and conversations in the same org.

```kennzahlen
20 | Flex Credits per standard or custom action in production
16 | Flex Credits per action in a sandbox
$0.10 | per action at list price
source: Salesforce Flex Credits rate card (as of November 3, 2026) and Agentforce pricing page
```

```hinweis offen
The rate for Headless Platform Interactions, the meter for agentic API and MCP calls, is still listed as "TBA" in the rate card.
```

Data 360 also charges for processing unstructured documents such as manuals and spare part catalogs: 150 credits per processed MB in the base tier, less at higher monthly volumes, and 120 in a sandbox. I explain how to estimate this per action in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).

### 5. Which edition are you on?

On September 3, 2026 Salesforce announced [Core, Advanced and Max editions](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) at $195, $395 and $550 per user and month, with 500,000, 1 million and 2.75 million Flex Credits included. The release itself does not specify the period, but the [Sales Cloud pricing page](https://www.salesforce.com/sales-cloud/pricing/) lists the pools per org and year. One pool for the whole org can be depleted quickly when several agents draw on it. Pricing for existing customers on legacy editions stays unchanged. Manufacturing Cloud has its own price list: the [pricing page](https://www.salesforce.com/manufacturing/cloud/pricing/) shows Core at $275 with 500,000 credits and Max at $650 or $700 with 2.75 million credits, with no Advanced tier, and lists the full Agentforce for Industries suite only in Max. If you are mid-contract, the practical question is whether to buy credits for one process now or change editions at renewal. I cover that in [the editions Core, Advanced and Max](../salesforce-editions-core-advanced-max/).

## Worked example: three candidates at a machine builder

Assume a machine builder with SAP, Sales Cloud and Service Cloud, a dealer network and a dealer portal. All numbers below are assumptions to show the method. IT collects three ideas for a first agent.

**Dealer enquiries on order status and delivery dates.** Assume 1,500 enquiries a month and three billable actions each, for example verify the dealer, read the order from SAP, read the delivery date. The sandbox trace shows how many actions an enquiry really triggers. That is 4,500 actions at 20 credits, 90,000 credits or about $450 a month before prompts and tests. With the $2 per conversation model Salesforce published in 2025, the same volume would cost $3,000, but that model is chosen per org, not per agent. A MuleSoft API to SAP already exists. This candidate is ready. The full calculation is in [what a dealer service agent costs](../flex-credits-agentforce-cost-per-action/).

**Warranty pre-check for dealer claims.** Assume 200 claims a month. The rules are clear, but a third of the machines in the installed base have no warranty start date in Salesforce. The agent would decide on incomplete data. This candidate waits until the asset data is complete, and the eligibility rules belong in deterministic logic, as described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/).

**Troubleshooting for special machines.** Assume 40 cases a month, each different, with the relevant knowledge held by four senior technicians. Volume is low, the risk of a wrong answer is high, and there are hardly any written articles to ground the answers in. For now this stays with the technicians.

One of three is ready. In my judgment, that is a normal ratio, and one solid start is better than three parallel pilots.

## Where Salesforce is not the answer

Part of an honest decision is stating clearly where an agent in Salesforce does not belong:

- **Decisions the ERP already makes.** Available-to-promise, credit limits, price conditions and production planning are handled in SAP or proALPHA. An agent in Salesforce may ask and explain, but it should not recalculate. Two places with the same rule diverge within a year.
- **The shop floor.** Machine data, MES and production orders have their own systems. Salesforce becomes relevant when a machine needs service, not while it runs.
- **Rare expert questions.** Low volume plus high risk means the build and test effort never pays back.
- **Routine work without language.** If a process has no free text and no dialogue, a Flow or an ERP job handles it at lower cost. Gartner also recommends [automation for routine workflows](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) and agents for decisions.
- **Users outside Salesforce.** If your service team primarily works in SAP and Teams, check which functions the agent really needs there: the [Agentforce User License](https://www.salesforce.com/agentforce/pricing/) at $5 per user and month plus Flex Credits is cheaper than a full seat, but every CRM object the agent reads still has to be maintained in Salesforce.

These questions are part of my [make-or-buy and license planning](../../services/make-or-buy-licences/), because sometimes the cheapest agent is the one you do not build in Salesforce.

## Pick one process and one target number

Gartner [expects](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) more than 40 percent of agentic AI projects to be canceled by the end of 2027, citing rising costs, unclear business value and inadequate risk controls. These steps address all three:

```schritte
Pick one process
  One process that passes all the criteria above, and one target number, for example the share of dealer enquiries answered without a service rep.
Measure the baseline
  Volume, handling time, error rate.
Check your contract
  Edition, included Flex Credits per org and year, how many of them other agents already use, and when the order ends.
Budget the full cost
  Production actions, sandbox tests at 16 credits per action, prompts, Data 360 for documents, required add-ons and user licenses, the integration work and the test and monitoring effort in operation.
Put rules into logic
  Leave only language and intent to the model.
Agree a go or no-go date
  Before the pilot starts, for example after eight weeks against the target number.
```
