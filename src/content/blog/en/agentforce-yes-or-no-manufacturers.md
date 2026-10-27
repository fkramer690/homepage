---
title: "Agentforce for manufacturers: start now or wait?"
description: "Should a manufacturer start with Agentforce now? Five criteria from process volume to ERP access and editions, and where Salesforce is not the right answer."
pubDate: 2026-10-27
lang: en
slug: agentforce-yes-or-no-manufacturers
translationKey: agentforce-yes-or-no-manufacturers
topic: ai
categories: [ai, manufacturing-cloud]
tags: [agentforce, ai agents, manufacturing, business case, flex credits, erp]
takeaways:
  - "Start with Agentforce now if one process has high volume, clear rules, clean asset and order data and an API to the ERP; if one of these is missing, fix it first."
  - "One Agentforce action costs 20 Flex Credits, which is $0.10 at the list price of $500 per 100,000 credits; the same action in a sandbox costs 16 credits."
  - "The Core, Advanced and Max editions include 500,000, 1 million and 2.75 million Flex Credits per org and year; if the pool runs out, you buy more credits."
  - "Salesforce is not the answer for decisions the ERP already makes, for the shop floor or for rare expert questions where volume never pays back the build and test effort."
  - "Gartner expects more than 40 percent of agentic AI projects to be cancelled by the end of 2027; a go or no-go date agreed before the pilot protects the budget."
faq:
  - q: "Is Agentforce worth it for a mid-sized manufacturer?"
    a: "It is worth it when one process has thousands of similar requests per month, the data behind it is maintained and the ERP can be reached through an API. For rare or highly technical questions the cost of building, testing and maintaining an agent rarely pays back."
  - q: "What does Agentforce cost per action?"
    a: "According to the Salesforce rate card, a standard or custom action costs 20 Flex Credits in production and 16 in a sandbox. Flex Credits cost $500 per 100,000, so one action costs $0.10. Prompts and Data 360 processing come on top."
  - q: "Do I need one of the new Salesforce editions to use Agentforce?"
    a: "No. Salesforce says pricing for existing customers on legacy editions stays unchanged, and Flex Credits can be bought separately. The new editions bundle credits, which changes the calculation at renewal, not the technical requirement."
  - q: "Can Agentforce work with SAP or proALPHA?"
    a: "Yes, if the ERP exposes an API. Salesforce documents a path where a MuleSoft API is synced into the API Catalog and becomes an agent action. Without an API, document extraction with RPA or the Systems Integration Agent are options, but RPA breaks when ERP screens change."
draft: false
---

Agentforce for manufacturers makes sense now if you have one process with high volume, clear rules, clean data and an API to your ERP. Dealer questions about order status, delivery dates and spare part availability are the typical candidate. If the data behind the process is patchy or the ERP has no interface, a pilot will mostly show you that gap, and you pay for the lesson. I would rather spend the first months fixing it. For decisions that already live in SAP or proALPHA, Salesforce is often the wrong place for an agent.

## Should a manufacturer start with Agentforce now?

The product side is ready for narrow processes. Salesforce launched Agentforce for Manufacturing in [August 2025](https://salesforce.com/news/stories/agentforce-for-manufacturing-announcement) with templates for sales planning, inventory management and asset service, plus field service functions such as appointment booking and job reports. According to the [Manufacturing Cloud product page](https://www.salesforce.com/manufacturing/cloud/), Summer '26 added an AI Warranty Concierge and an AI Partner Sales Assistant, and Winter '27 adds a Warranty Claims Adjudication Agent.

What is live at manufacturers is narrower than what is announced. Siemens, the most visible industrial reference, [announced in September 2026](https://investor.salesforce.com/news/news-details/2026/Siemens-and-Salesforce-Deepen-AI-Partnership-to-Redefine-Industrial-Sales-and-Service/default.aspx) that two agents engage and qualify inbound leads for 18,000 sellers across 132 countries. Before that, more than 2,500 unqualified leads arrived each month. The SAP steps for supplier onboarding and the Teamcenter link for service are described as plans. I read that as a sensible order: start where the volume is high and a wrong answer costs little.

So the open question is whether your first process is ready. Five criteria decide that.

## Five criteria for the Agentforce decision

### 1. Is there enough volume?

An agent pays back through repetition. A process with a few hundred requests a month rarely covers the cost of building, testing and maintaining the agent. Good candidates in manufacturing have thousands of similar requests: dealer questions about orders and delivery dates, spare part availability, appointment requests in field service, first-level warranty questions. Count the requests per month and the minutes each one takes today before anyone writes a prompt.

### 2. Does the data hold?

An agent reads what is in the system, and unlike an experienced service rep it does not know which fields to distrust. For a machine builder that means installed base with serial numbers, warranty start dates, spare part master data and maintained knowledge articles. Gartner [predicts](https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk) that through 2026 organisations will abandon 60 percent of AI projects that lack AI-ready data. Why I check data before anything else is in [business value and data quality first](../agentforce-business-value-data-quality-first/).

### 3. Can the agent reach the ERP?

In manufacturing the answers usually sit in the ERP: order status, stock, prices, credit limits. Salesforce documents a path where a [MuleSoft API is synced into the API Catalog](https://developer.salesforce.com/blogs/2025/06/explore-mulesoft-for-agentforce-with-topic-center-and-api-catalog), Named Credentials and External Services are created automatically, and the agent calls the API as an action. If your ERP has no API, the options are document extraction with RPA or the Systems Integration Agent that Salesforce [released at Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/). RPA works through the user interface and breaks when screens change, and I would test the same risk for the Systems Integration Agent before relying on it. I cover both paths in [Agentforce and SAP order status](../agentforce-sap-order-status-mulesoft/) and [legacy ERP without an API](../legacy-erp-without-api-ai-agents/).

### 4. Does the cost model fit?

Agentforce is billed per action. According to the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), a standard or custom action costs 20 credits in production and 16 in a sandbox, a voice action 30. Flex Credits cost [$500 per 100,000](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/), so one action costs $0.10. Unused credits do not roll over past the order end date. Two items are still open. The rate for Headless Platform Interactions, the meter for agentic API and MCP calls, is listed as "TBA". And Data 360 charges 150 credits per MB for unstructured documents such as manuals and spare part catalogues. How to estimate this per action is the topic of [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).

### 5. Which edition are you on?

On 3 September 2026 Salesforce announced [Core, Advanced and Max editions](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) at $195, $395 and $550 per user and month, with 500,000, 1 million and 2.75 million Flex Credits included. The release itself gives no period, but the [Sales Cloud pricing page](https://www.salesforce.com/sales-cloud/pricing/) lists the pools per org and year. One pool for the whole org runs out quickly when several agents draw on it. Pricing for existing customers on legacy editions stays unchanged. New pricing for the Industries editions was announced for "later this fall". For manufacturers, the Manufacturing Cloud page already lists the full Agentforce for Industries suite only in the Max editions, at $650 or $700 per user and month. If you are mid-contract, the practical question is whether to buy credits for one process now or change editions at renewal. I look at that in [the editions Core, Advanced and Max](../salesforce-editions-core-advanced-max/).

## A typical scenario: three candidates at a machine builder

Assume a machine builder with SAP, Sales Cloud and Service Cloud, a dealer network and a dealer portal. All numbers below are assumptions to show the method. IT collects three ideas for a first agent.

**Dealer enquiries on order status and delivery dates.** Assume 1,500 enquiries a month, each with three actions: read the order from SAP, read the delivery date, write a summary. That is 4,500 actions at 20 credits, 90,000 credits or about $450 a month before prompts and tests. With the $2 per conversation model Salesforce named in 2025, the same volume would cost $3,000. A MuleSoft API to SAP already exists. This candidate is ready. The full calculation is in [what a dealer service agent costs](../dealer-service-agent-cost-calculation/).

**Warranty pre-check for dealer claims.** Assume 200 claims a month. The rules are clear, but a third of the machines in the installed base have no warranty start date in Salesforce. The agent would decide on gaps. This candidate waits until the asset data is complete, and the eligibility rules belong in deterministic logic, as described in [Agent Script: rules instead of the LLM](../agent-script-deterministic-rules/).

**Troubleshooting for special machines.** Assume 40 cases a month, each different, with the knowledge in the heads of four senior technicians. Volume is low, the risk of a wrong answer is high, and there are hardly any written articles to ground on. For now this stays with the technicians.

One of three is ready. In my judgement that is a normal ratio, and one solid start beats three parallel pilots.

## Where is Salesforce not the answer?

Part of an honest decision is naming where an agent in Salesforce does not belong:

- **Decisions the ERP already makes.** Available-to-promise, credit limits, price conditions and production planning live in SAP or proALPHA. An agent in Salesforce may ask and explain, but it should not recalculate. Two places with the same rule drift apart within a year.
- **The shop floor.** Machine data, MES and production orders have their own systems. Salesforce comes in when a machine needs service, not while it runs.
- **Rare expert questions.** Low volume plus high risk means the build and test effort never pays back.
- **Routine work without language.** If a process has no free text and no dialogue, a Flow or an ERP job does it cheaper. Gartner also recommends [automation for routine workflows](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) and agents for decisions.
- **Users outside Salesforce.** If your service team works in SAP and Teams all day, buying Salesforce licences only to run an agent rarely pays off.

These questions are part of my [make-or-buy and licence planning](../../services/make-or-buy-licences/), because sometimes the cheapest agent is the one you do not build in Salesforce.

## How do you start without a pilot that goes nowhere?

Gartner [expects](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) more than 40 percent of agentic AI projects to be cancelled by the end of 2027, citing rising costs, unclear business value and inadequate risk controls. These steps address all three:

1. **Pick one process** that passes the five criteria and write down one target number, for example the share of dealer enquiries answered without a service rep.
2. **Measure today's baseline**: volume, handling time, error rate.
3. **Check your contract**: edition, included Flex Credits per org and year, how many of them other agents already use, and when the order ends.
4. **Budget the full cost**: production actions, sandbox tests at 16 credits per action, prompts, Data 360 for documents and the integration work.
5. **Put rules into logic** and leave only language and intent to the model.
6. **Agree a go or no-go date** before the pilot starts, for example after eight weeks against the target number.

Start with Agentforce where volume, data and ERP access are in place, and use the time elsewhere to get them there. If you want a second opinion on which of your processes is ready, [send me a message](#contact).
