---
title: "Agentforce costs for manufacturers: Flex Credits to AELA"
metaTitle: "Agentforce pricing 2026: $0.10 per action, full cost example"
description: "A standard Agentforce action costs 20 Flex Credits ($0.10). Prompts, voice, Data 360 and tests add to it: a dealer service agent costs about $14,000 in year 1."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: flex-credits-agentforce-cost-per-action
translationKey: flex-credits-agentforce-costs
topic: ai
categories: [ai, architecture]
contactBrief: licences
tags: [agentforce, flex credits, AELA, digital wallet, cost estimation, manufacturing]
takeaways:
  - "Prompts cost 2, 4 or 16 credits per 2,000 tokens, but only for direct LLM calls. Prompt-template actions of an agent count as actions."
  - "Pay per resolution (400 credits) beats Flex Credits only when a resolved conversation needs more than 20 actions; unresolved conversations are metered anyway."
  - "Digital Wallet breaks consumption down by agent, channel and your own tags, but does not stop an agent when a plant has used up its budget."
  - "MCP calls from external agents are billed as Headless Platform Interactions. As of November 2026 the rate is still TBA."
  - "Measured against Flex Credits alone, an AELA at an assumed $150,000 a year pays off only from 30 million credits, or 1.5 million actions."
faq:
  - q: "What does an Agentforce action cost?"
    a: "A standard or custom action uses 20 Flex Credits. At $500 per 100,000 credits that is $0.10. In a sandbox or scratch org it costs 16 credits, a voice action 30 in production and 24 in a sandbox."
  - q: "What does an Agentforce service agent for dealers cost per month?"
    a: "In the worked example with 3,000 conversations and three actions each, it uses 180,000 credits, about $900 a month. With catalog updates in Data 360 it is 195,000. The first year needs about 2.7 million credits with build and tests."
  - q: "What happens to Flex Credits I do not use?"
    a: "They expire at the order end date and do not roll over into the next term. Overage is billed monthly in arrears at the contracted rate without a penalty. For that reason, buy credits in line with the go-live plan."
  - q: "Can I give each plant its own Flex Credit limit?"
    a: "Not as a hard limit, at least not in the documentation I opened. Digital Wallet sends threshold alerts and takes tags such as cost center, but the pool applies per org. Plant budgets are agreed internally and checked against tagged consumption."
  - q: "Do MCP calls to Salesforce cost money today?"
    a: "Not as of November 2026. According to Salesforce, agentic usage is not metered yet, Salesforce will announce the start 30 days in advance, and sandboxes are excluded. The rate card already lists the Headless Platform Interactions meter, with the rate TBA."
  - q: "What is a Salesforce AELA?"
    a: "Salesforce describes it as a fixed-price, fixed-term agreement with unlimited access to its consumption services, no overages and no usage-based billing. Forrester names Agentforce, Data 360 and MuleSoft over two or three years. Prices are not public. Negotiate what applies after the term when you sign."
draft: false
---

A standard Agentforce action costs 20 Flex Credits, or $0.10. On top come prompts by model tier, voice, Data 360 for manuals and parts catalogs, sandbox tests and, soon, MCP calls from external AI agents, still without a price. Unused credits expire at the order end date. In the worked example below, a service agent for dealer requests uses credits worth just under $1,000 a month and about $14,000 in the first year, before implementation, MuleSoft and user licenses. I estimate per conversation type, buy along the go-live plan, name one budget owner for the pool and look at a flat fee only once several agents are live.

## Flex Credits: a rate card with its own rate per usage type

Flex Credits are the currency in which Salesforce bills Agentforce consumption. The [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/) lists them at $500 per 100,000 credits, and the EU page at €500, so one credit costs half a cent. I use dollars throughout; euro amounts are the same. Almost every usage type draws a fixed rate from the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) as of November 3, 2026, checked on November 9:

- **Actions:** 20 credits in production, 16 in a sandbox or scratch org. According to the [help article on billable usage types](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5), also when they run deterministically.
- **Voice actions:** 30 credits in production, 24 in a sandbox. Speech to text costs 150 credits per hour of audio and text to speech 6,000 per million characters, metered separately from voice actions.
- **Data 360:** 150 credits per MB for unstructured processing, 600 for intelligent processing, and 3 credits per million rows for queries. The tiers apply per usage type and reset monthly: above 300,000 credits the rate drops in steps. Sandboxes pay a flat 120 per MB. According to [Salesforce Ben](https://www.salesforceben.com/data-360-formerly-data-cloud-deep-dive-your-guide-to-the-vector-database/), hybrid search costs twice as much as vector search, and new files rebuild the index.
- **Headless Platform Interactions:** listed, but without a rate ("TBA").

Prompts are easy to overlook, because the examples on the pricing page count only actions. They are metered per call to the LLM gateway in units of up to 2,000 tokens, so a call with 6,500 tokens counts as four prompts. The [model support page](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm&type=5) assigns every model to a tier:

| Tier | Credits per prompt | Example models |
|---|---|---|
| Basic | 2 | GPT-5 Mini, Gemini 2.5 Flash |
| Standard | 4 | Claude Sonnet 5, GPT-5, Gemini 2.5 Pro |
| Advanced | 16 | Claude Opus 4.8, GPT 5.5 |
| Starter | 2 | only bring-your-own models (BYOLLM) |

For a case summary that a service rep reads and corrects, I would start on a Standard model and move up only if tests show a quality gap. Prompt rates apply to features that call the LLM gateway directly, such as Service Replies or a summary in the console. According to the [help article on Help Agent billing](https://help.salesforce.com/s/articleView?id=ai.help_agent_billing.htm&language=en_US&type=5), they "don't apply to actions run by an Agentforce agent"; an agent's prompt-template action is metered as an action.

## Worked example: a service agent for dealer requests

Take a machine builder with 400 dealers, SAP S/4HANA, a dealer portal and about 2,000 MB of spare parts catalogs and manuals as PDF. The agent answers 3,000 conversations a month about order status, delivery dates and spare parts availability, with three actions each. All volumes are assumptions; the rates come from the rate card.

| Item | Credits | USD |
|---|---|---|
| Actions per month: 3,000 × 3 × 20 | 180,000 | 900 |
| Data 360, 100 MB of changed documents per month | 15,000 | 75 |
| **Running cost per month** | **195,000** | **975** |
| First processing of the 2,000 MB | 300,000 | 1,500 |
| Sandbox tests: 500 conversations × 4 regression runs × 3 actions × 16 | 96,000 | 480 |
| Sandbox: 200 MB catalog sample × 120 | 24,000 | 120 |
| **First year: 12 months of conversations, 11 months of changes, build, tests** | **2,745,000** | **13,725** |

Not included are MuleSoft licenses, implementation, service staff licenses and upkeep; all values are list prices. Processing the catalog once costs as much as seven weeks of dealer conversations. Sorting out outdated catalog versions first is the cheapest saving in the whole project, more in [Data 360 costs for AI agents](/en/blog/data-360-costs-for-ai-agents/). Agent tests run only in sandboxes, and the [testing documentation](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html) says they consume credits; how many runs make sense is in [testing Agentforce agents before go-live](/en/blog/testing-agentforce-agents-before-go-live/).

```hinweis achtung
Processing the full 2,000 MB catalog in a sandbox costs 240,000 credits, almost as much as in production, because no tiers apply there. A representative sample of 200 MB costs 24,000 credits.
```

On the benefit side: if a service rep needs six minutes per request today and the agent resolves 60 percent, 180 hours a month are freed up, at about $5 in consumption per hour. In my view, consumption rarely decides this business case. Build, tests and upkeep decide it.

## Pay per action, per conversation or per resolution?

Salesforce offers several pricing models, and they are far apart. Not every model fits every agent, so check the prerequisites first:

- **Flex Credits per action.** In the worked example 60 credits per conversation, $900 a month, without catalog updates.
- **Per conversation.** The pricing page lists $2 per conversation, so $6,000 a month. According to the same page, Flex Credits and conversation pricing are not supported in the same org.
- **Per resolution.** The Help Agent, now called Casey (see [Casey and the Service Rep Assistant](/en/blog/service-cloud-casey-service-rep-assistant/)), costs 400 credits per resolved conversation. Actions and Data 360 queries in a resolved session are included in the resolution. Outside a resolved session, they are metered under their own usage types, according to the [help article on Help Agent billing](https://help.salesforce.com/s/articleView?id=ai.help_agent_billing.htm&language=en_US&type=5). At 60 percent resolved conversations that is $3,600 for resolutions plus $360 for the actions of the other 1,200 conversations. According to [Salesforce Germany](https://www.salesforce.com/de/news/press-releases/2026/06/30/salesforce-agentforce-help-agent/), resolutions in a sandbox are free. For a Help Agent on a service portal there are also login-based and member-based licenses.

The comparison is simple: because unresolved conversations are metered either way, pay per resolution only wins when a resolved conversation would cost more than 400 credits in actions, so more than 20 actions. With three actions per conversation, Flex Credits are cheaper at any resolution rate. What counts as resolved is in [Salesforce Ben's pricing guide](https://www.salesforceben.com/complete-guide-to-agentforce-pricing-options/); without feedback, a session left open for two hours counts too. For narrow dealer requests I would plan with Flex Credits. Pay per resolution fits agents that need many steps per case. For employees working in Salesforce, there is another path: the per-user add-on with "Unmetered Agentforce usage for employees" at $125 per user per month (US list price). It does not cover dealers or customers.

## An edition's pool covers the pilot, not the program

The [Core, Advanced and Max editions](/en/blog/salesforce-editions-core-advanced-max/) include a Flex Credit pool. The [EU pricing page for Sales Cloud](https://www.salesforce.com/eu/products/sales-pricing/) lists it per org and year:

```kennzahlen
500,000 | Flex Credits per org and year in Core
1 million | Flex Credits per org and year in Advanced
2.75 million | Flex Credits per org and year in Max
source: Salesforce EU pricing page for Sales Cloud and the 2026 editions announcement
```

The service agent from the worked example needs almost the whole Max pool in its first year, and that pool also covers every other consumption-based use in the org. Extra credits come as Pre-Purchase, Pre-Commit or PayGo, and the [Flex Agreement](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) allows converting user licenses into Flex Credits and back. Overage is billed in arrears at the contracted rate without a penalty. Unused credits, by contrast, expire at the order end date: "no rollover will be permitted".

That leads to the most important buying rule: buy credits in line with the go-live plan, not the budget year. If go-live slips from March to June, three months of volume are paid for and lost. I would start with a small Pre-Purchase for pilot and tests, cover the ramp-up with PayGo or Pre-Commit and buy larger volumes only once Digital Wallet shows real numbers.

## Cost control across plants: Digital Wallet and one budget owner

The pool belongs to the org and the contract. If two plants, a US subsidiary and a service region share one org, they all draw on the same pool, and the invoice goes to whoever signed. [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) provides the data for chargeback:

- **Breakdown** down to agent, action and channel.
- **Custom tags** for categories such as department or cost center, according to the [Salesforce help](https://help.salesforce.com/s/articleView?language=en_US&id=xcloud.wallet_about.htm&type=5) with separate permissions for viewing and assigning.
- **Threshold alerts** through a flow template to admins, as a system notification or in Slack.

It requires a Digital Wallet-enabled product, a Data 360 license (a Customer Data Platform license is not enough) and the View Consumption permission; Digital Wallet is not available in sandboxes. For internal invoices, [Trailhead](https://trailhead.salesforce.com/content/learn/modules/salesforce-digital-wallet-quick-look/get-to-know-salesforce-digital-wallet) names the monthly statement as the source of truth, not a dashboard screenshot. The same page points to a trap for groups: if a subsidiary buys its own credits for the same org, Digital Wallet draws from the contract that expires first.

```hinweis offen
I did not find an automatic stop. The pages I opened describe alerts only. A plant budget therefore remains a controlling figure, and anyone who needs a hard limit has to deactivate the agent themselves.
```

I would make one person in group IT or the [Salesforce Center of Excellence](/en/blog/salesforce-center-of-excellence-cadence/) the budget owner, set tags for legal entity, cost center and environment from day one and run six months of showback before plants pay. After that I charge a fixed rate of $5 per 1,000 credits. Write down before the first regional go-live who carries expired credits. Without a rule, the loss lands in the central IT budget and nobody notices. Which metrics to track per agent is in [Agentforce KPIs after go-live](/en/blog/agentforce-kpis-after-go-live/).

## MCP calls from external agents: the meter without a price

If your key account managers use Claude or ChatGPT on Salesforce data, a cost item appears that no project plans. According to [Salesforce Ben on 24 September 2026](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/), citing a Salesforce help article, every successful call by a registered agent through MCP or an API classed as agentic counts as one Headless Platform Interaction. Metering has not started, Salesforce announces the start 30 days ahead, sandboxes are excluded, and existing integrations with SAP or middleware keep their terms.

With your own Agentforce agent, you define the actions. With an external agent, its behavior determines how many calls a question needs. Take 60 key account managers with 15 questions each on 220 working days, 198,000 questions a year, and three hypothetical rates:

| Assumed rate per call | 2 calls per question | 8 calls per question |
|---|---|---|
| 1 credit | $1,980 | $7,920 |
| 4 credits | $7,920 | $31,680 |
| 20 credits, like an action | $39,600 | $158,400 |

Tool design changes the bill as much as the rate does. A targeted tool, such as a flow that returns a dealer's order overview in one answer, saves calls on every question; who may read what through these servers is covered in [hosted MCP servers and data access](/en/blog/salesforce-hosted-mcp-servers-data-access/). You also pay twice: the AI vendor for licenses or tokens and Salesforce for the calls. Count calls per task in a sandbox, where Salesforce does not meter (the AI vendor still bills), budget a range and get the rate and a cap in writing before the announcement. Separately, direct API calls use the [org's daily API allocation](https://developer.salesforce.com/docs/platform/salesforce-app-limits-cheatsheet/guide/salesforce-app-limits-platform-api.html), which your SAP integration shares.

## When does an AELA beat Flex Credits?

Salesforce describes the Agentic Enterprise License Agreement (AELA) on its [page on buying models](https://www.salesforce.com/pricing/flexible-buying-models/) as "a fixed-price, fixed-term agreement" with "unlimited access to Salesforce consumption services", "no overages, and no usage-based billing". According to [Forrester](https://www.forrester.com/blogs/ai-agents-become-economic-actors-salesforce-rewrites-the-rules-of-pricing), it gives customers "unlimited use of consumption‑based products such as Agentforce, Data 360/Data Cloud, and MuleSoft for a fixed fee over two or three years". According to the [Q4 FY26 earnings call transcript](https://s205.q4cdn.com/626266368/files/doc_financials/2026/q4/Transcript-Salesforce-Inc-Q4-FY26-Earnings-Conference-Call-2-25-26.pdf), Salesforce sold more than 120 of them in one quarter. Price, fair use rules and the post-term model are not public, and "unlimited" does not mean the same in every contract: at Adecco, a footnote makes usage subject to the agreement.

Measured against additional Flex Credits alone, the threshold is clear. If the flat fee on top of today's licenses is an assumed $150,000 a year, the same money buys 30 million Flex Credits, or 1.5 million standard actions. If a manufacturer plans three agents that grow to 13.5 million credits over three years, that costs $67,500 at list price, the AELA $450,000. That is a comparison of nominal cost, not a break-even analysis for the AELA: the contract can include other consumption services, discounts and license components. If the offer includes licenses you would buy anyway, compare the whole contract.

```pro-contra
pro: When an AELA makes sense
- **Several agents are approved,** in at least two areas such as dealer service and field service.
- **The offer includes licenses you would buy anyway,** such as an edition upgrade or Field Service.
- **Consumption is hard to estimate,** because large document stocks or the MCP rate are open.
contra: Do not sign
- In the pilot phase or for a single plant.
- While spare parts and asset data are unreliable.
- Without agreed renewal terms.
```

Salesforce's CFO spoke on the same call about moving AELA customers to consumption later. The second contract therefore determines what the AELA really costs. Put the following into the first one: pricing model and price cap from year four, annual exit points (the [US Department of Veterans Affairs](https://www.salesforce.com/news/press-releases/2026/07/24/missionforce-transforms-veteran-care/) contract runs one year plus two optional one-year renewals), scope and fair use rules. This is a commercial checklist, not legal advice.

## First step: a three-year consumption plan per agent

```schritte
Count actions and direct prompts per conversation type
  From sandbox test logs, tokens of direct LLM calls rounded up to units of 2,000.
Size the documents for Data 360
  Initial load and monthly changes in MB, outdated catalogs removed first.
Spread over months
  Pilot, ramp-up and full load, with a reserve for the MCP meter.
Choose the buying model
  Edition pool, Pre-Purchase for the pilot, PayGo for the ramp-up.
Assign the budget
  One budget owner, tags per legal entity, alerts at 50, 80 and 95 percent.
Recalculate four weeks after go-live
  Digital Wallet against the estimate, then decide on more agents or an AELA.
```

The estimation method is in the [masterclass chapter on costs and tokens](/en/masterclass/ai-salesforce/costs-and-tokens/). Comparing license models over several years and legal entities is part of my work in [make-or-buy and license planning](/en/services/make-or-buy-licences/), on the client side and without a stake in the deal. Bring your consumption plan and, if you have one, the written AELA offer to our first call, and we price both paths for your agents side by side.
