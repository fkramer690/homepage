---
title: "Agentforce dealer service agent: cost per month"
description: "What an Agentforce service agent for dealer enquiries costs per month: a worked calculation with Flex Credits, per conversation, Data 360 and test load."
pubDate: 2026-10-27
lang: en
slug: dealer-service-agent-cost-calculation
translationKey: dealer-service-agent-costs
topic: ai
categories: [ai]
tags: [agentforce, flex credits, dealer service, data 360, manufacturing, business case]
takeaways:
  - "In the scenario, 3,000 dealer conversations a month with three actions and two prompts each cost 204,000 Flex Credits, about $1,020 a month in production."
  - "The same volume costs $6,000 a month at $2 per conversation, and Salesforce does not support Flex Credits and conversation pricing in the same org."
  - "Indexing 2,000 MB of spare part catalogues in Data 360 costs 300,000 credits once; the same catalogue in a sandbox costs 240,000 credits, so test with a subset."
  - "With Help Agent resolutions at 400 credits, Flex Credits are cheaper in the scenario as soon as more than 17 percent of conversations are resolved."
  - "The first year in the scenario needs about 3 million credits, more than the 2.75 million included in a Max edition, and unused credits expire at the order end date."
faq:
  - q: "What does an Agentforce service agent for dealers cost per month?"
    a: "It depends on volume and actions per conversation. With 3,000 conversations, three actions and two Standard Prompts each, the agent uses 204,000 Flex Credits, about $1,020 a month at list price. Data 360, MuleSoft and implementation come on top."
  - q: "Is Agentforce cheaper per action or per conversation?"
    a: "For narrow enquiries with few actions, Flex Credits are usually cheaper. In the scenario a conversation costs 68 credits or $0.34, against $2 on the conversation model. The two models cannot run in the same org."
  - q: "Does testing an Agentforce agent cost Flex Credits?"
    a: "Yes. Salesforce says running tests consumes requests and credits. Actions cost 16 credits in a sandbox instead of 20, and Data 360 processing of documents costs 120 credits per MB in a sandbox."
  - q: "What does Data 360 cost for spare part catalogues?"
    a: "The rate card charges 150 credits per MB of unstructured processing in the base tier. A 2,000 MB catalogue therefore costs 300,000 credits, about $1,500, for the initial processing."
  - q: "Do the Flex Credits in my Salesforce edition cover a dealer agent?"
    a: "Core includes 500,000, Advanced 1 million and Max 2.75 million credits. The scenario needs about 3 million in the first year, and the pool is shared with all other metered usage in the org."
draft: false
---

An Agentforce service agent for dealer enquiries costs about $1,020 a month in production if it handles 3,000 conversations with three actions and two prompts each, billed in Flex Credits. The same volume costs $6,000 a month on the $2 per conversation model. In the first year the bill grows to around 3 million credits, roughly $15,000, because indexing spare part catalogues in Data 360 and testing in the sandbox come on top. The volumes below are assumptions; the multipliers come from the Salesforce rate card.

## What does an Agentforce service agent cost per month?

Agentforce bills usage in Flex Credits, listed at [$500 per 100,000 credits](https://www.salesforce.com/agentforce/pricing/), so one credit costs half a cent. The [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), updated as of 31 August 2026, sets a multiplier per usage type:

- **Standard or custom action:** 20 credits in production, 16 in a sandbox or scratch org.
- **Prompts on Salesforce-enabled models:** Basic 2, Standard 4, Advanced 16 credits.
- **Help Agent resolution:** 400 credits, 0 in a sandbox.
- **Data 360:** Unstructured Processing 150 credits per MB and Queries 3 credits per million rows in the base tier.
- **Headless Platform Interaction:** "TBA".

An action is one step the agent executes, for example reading an order from SAP. Salesforce's own "Where is my order?" example on the pricing page has two actions, 40 credits per request, and comes to $120 a month at 20 requests a day. For its other examples the page notes that Data 360 credits are not included. Most estimates I see share that gap.

Unused Flex Credits do not roll over and must be used before the order end date. An oversized pool costs money just as surely as running short.

## A typical scenario: 3,000 dealer enquiries a month

Assume a machine builder with 400 dealers in Europe, SAP S/4HANA as ERP, a dealer portal on Experience Cloud and an existing MuleSoft API for order data. Dealers ask about order status, confirmed delivery dates and spare part availability. All volumes and shares below are assumptions to show the method; only the multipliers come from Salesforce.

### Production: actions and prompts

Assume 3,000 conversations a month with three actions each: identify dealer and order, read status and delivery date from SAP through MuleSoft, check spare part availability. On top come two Standard Prompts per conversation from prompt templates, for example an answer in the dealer's language and a case summary.

- Actions: 3,000 × 3 × 20 = 180,000 credits
- Prompts: 3,000 × 2 × 4 = 24,000 credits
- Total: 204,000 credits, $1,020 a month, or 68 credits ($0.34) per conversation

Whether your agent really calls two prompts or five shows after the first test week in [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/), which breaks consumption down by agent, action and channel. Digital Wallet requires Data 360 to be enabled.

### Data 360: spare part catalogues and manuals

For spare part questions the agent needs documents: catalogues, exploded drawings with part numbers, manuals. Agentforce grounds on files through a Data Library, which Salesforce's own [workshop](https://developer.salesforce.com/workshops/agentforce-new-workshop/rag/1-ingest-unstructured-data-index) builds on a Data Cloud search index.

Assume 2,000 MB of PDFs. The initial processing costs 2,000 × 150 = 300,000 credits, $1,500. That is exactly the upper limit of the base tier, which applies per usage type and resets on the first day of each month. Assume a further 100 MB of updated documents per month: 15,000 credits, $75.

Indexing the catalogue once costs as much as six weeks of dealer conversations. Removing superseded catalogue versions before indexing is the cheapest saving in the whole project. The details are in [Data 360 costs for AI agents](../data-360-costs-for-ai-agents/).

### Test load in the sandbox

Salesforce's [testing documentation](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html) says that running tests "consumes requests and credits". Assume 500 test conversations before go-live: 500 × (3 × 16 + 2 × 4) = 28,000 credits, $140. Assume four regression runs of 200 conversations a year: 44,800 credits, $224.

The expensive trap is Data 360 in the sandbox: 120 credits per MB, without tiers. Indexing the full 2,000 MB catalogue there costs 240,000 credits, $1,200, almost as much as in production. A representative subset of 200 MB costs 24,000 credits, $120.

### The first year in total

| Item | Credits | USD |
|---|---|---|
| Production conversations, 12 months | 2,448,000 | 12,240 |
| Data 360, initial catalogue | 300,000 | 1,500 |
| Data 360, updates for 11 months | 165,000 | 825 |
| Sandbox tests before go-live | 28,000 | 140 |
| Sandbox catalogue subset | 24,000 | 120 |
| Regression tests, 4 runs | 44,800 | 224 |
| **Total** | **3,009,800** | **15,049** |

Not included: MuleSoft licences, implementation, licences for your service reps and the people who maintain the agent. All figures are list prices without discounts.

Now the value side. Assume a service rep needs six minutes per enquiry today, so 3,000 enquiries take 300 hours a month. If the agent resolves 60 percent, 180 hours are freed. In steady state the agent costs 219,000 credits a month, about $1,095, or around $6 per freed hour. In my judgement consumption rarely decides this business case. Build, test and maintenance effort does.

## Flex Credits, per conversation or per resolution: which model fits?

Salesforce offers three ways to pay for this agent:

- **Flex Credits per action and prompt.** In the scenario $1,020 a month in production.
- **Per conversation.** The pricing page lists $2 per conversation, so $6,000 a month. According to the same page, Flex Credits and conversations are not supported in the same org, and conversation pricing is not available with the PayGo and Pre-Commit models.
- **Per resolution.** Help Agent, now called Casey (see [Casey and the Service Rep Assistant](../service-cloud-casey-service-rep-assistant/)), costs 400 credits or $2 per resolved conversation. According to [Salesforce Germany](https://www.salesforce.com/de/news/press-releases/2026/06/30/salesforce-agentforce-help-agent/), there is no fee when a case is handed over, including the Data 360 and Agentforce calls made before. It has been generally available since July 2026, portals included. At 60 percent resolved: 1,800 × $2 = $3,600 a month.

What counts as resolved matters. [Salesforce Ben](https://www.salesforceben.com/complete-guide-to-agentforce-pricing-options/) lists the conditions: at least two message turns, final feedback not explicitly negative, and either no escalation to a human or explicitly positive feedback. Without feedback, a messaging session that runs past two hours counts as resolved. A dealer who asks twice, reads the status and closes the window is billed. So is a dealer who got a wrong date and left without feedback.

The break-even is simple. Flex Credits cost 68 credits per conversation in the scenario, a resolution 400. As soon as more than 17 percent of conversations are resolved, Flex Credits are cheaper. At 60 percent the agent would need twelve or more actions per conversation before resolution pricing wins.

For narrow dealer enquiries I would therefore plan with Flex Credits. Resolution pricing has one real advantage in the first months: when nobody knows the resolution rate yet, a weak agent costs nothing, and sandbox resolutions are free.

## Do the credits in your edition cover it?

The [Core, Advanced and Max editions](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) include 500,000, 1 million and 2.75 million Flex Credits. The Agentforce pricing page states "2.75M Flex Credits per org per year" for Max; for Core and Advanced I found no such statement. The editions release lists Help Agent in Advanced and Max.

The scenario needs about 3 million credits in the first year, more than even the Max pool, and that pool also covers every other metered agent in the org. Additional credits are sold as PayGo or Pre-Commit. Plan the ramp-up: a dealer agent rarely reaches full volume in its first month, and credits committed for a year but used only from month four partly expire. How to estimate this per action is the topic of [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/), and the editions themselves are covered in [Core, Advanced and Max](../salesforce-editions-core-advanced-max/). Whether you buy credits, change edition at renewal or build nothing in Salesforce is a question for [make-or-buy and licence planning](../../services/make-or-buy-licences/).

## When is an agent the wrong answer for dealer enquiries?

- **When dealers mainly want the order status.** A status list in the [dealer portal](../manufacturing-cloud-customer-portal/) that reads SAP through the existing API answers without a single credit. An agent pays off where questions arrive as free text, mix orders and spare parts, or come in by email.
- **When the delivery date in SAP is not maintained.** Then the agent repeats a wrong date 3,000 times a month. The integration path is described in [Agentforce and SAP order status](../agentforce-sap-order-status-mulesoft/).
- **When dealers' own AI assistants query your Salesforce.** Agentic calls through MCP or APIs fall under Headless Platform Interactions, and that rate is still "TBA". I look at this risk in [MCP access as a budget risk](../mcp-api-calls-salesforce-budget-risk/).

## How do you budget a dealer service agent?

1. **Count enquiries by type** from cases and emails of the last three months.
2. **Define actions and prompts per conversation** for each type.
3. **Measure the document volume** in MB after removing superseded catalogues.
4. **Plan the sandbox** with a document subset and a fixed number of test conversations.
5. **Check the contract:** edition pool, order end date and whether the org already runs on conversation pricing.
6. **Run two test weeks**, read Digital Wallet, recalculate and set alerts on the credit pool.

A dealer service agent costs little per conversation, so the budget risk sits in documents, sandboxes and an oversized credit pool. If you want a second pair of eyes on your calculation, [send me a message](#contact).
