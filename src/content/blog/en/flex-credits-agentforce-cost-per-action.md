---
title: "Flex Credits: estimating Agentforce cost per action"
description: "How Flex Credits work and how to estimate Agentforce costs per action, prompt tier, voice call, sandbox test and Data 360 document, with a worked example."
pubDate: 2026-10-27
lang: en
slug: flex-credits-agentforce-cost-per-action
translationKey: flex-credits-agentforce-costs
topic: ai
tags: [agentforce, flex credits, cost estimation, licensing, data 360, manufacturing]
takeaways:
  - "An Agentforce estimate needs several meters: actions at 20 Flex Credits, voice actions at 30, prompts priced by model tier, Data 360 document processing and test runs in the sandbox."
  - "Prompts are billed per 2,000 tokens, rounded up: 2 credits on Basic models, 4 on Standard models such as Claude Sonnet, 16 on Advanced models such as Claude Opus or GPT 5.5."
  - "Sandbox actions cost 16 credits instead of 20, but prompts cost the same as in production, and Data 360 in a sandbox runs at a flat 120 credits per MB without volume tiers."
  - "Unused Flex Credits expire at the order end date and do not roll over, so buy credits along the go-live plan rather than the budget year."
  - "In the illustrative scenario, a spare parts agent for dealers uses about 218,000 credits a month, and plain text actions make up only 55 percent of that."
faq:
  - q: "What is one Flex Credit worth?"
    a: "Salesforce lists Flex Credits at $500 or €500 per 100,000 credits, so one credit costs half a cent. A standard or custom Agentforce action uses 20 credits, which is $0.10."
  - q: "Are prompts charged on top of Agentforce actions?"
    a: "Prompts are metered per call to the LLM gateway, in units of up to 2,000 tokens. The Salesforce help article does not say whether the agent's own reasoning calls count as prompts, so confirm it with your account executive and watch Digital Wallet during the pilot."
  - q: "Do agent tests in a sandbox cost Flex Credits?"
    a: "Yes. Agent testing runs only in sandboxes, and Salesforce notes that running tests consumes requests and credits. Actions cost 16 credits there, prompts the full rate."
  - q: "What happens to Flex Credits I do not use?"
    a: "They expire. Flex Credits must be used before the order end date and do not roll over into the next term. Usage above your entitlement is billed at the contracted rate without a penalty."
  - q: "How can I see what my agent actually consumes?"
    a: "Digital Wallet shows consumption in near real time down to agent, action and channel and sends alerts at thresholds you set. It is free with Digital Wallet-enabled products but requires Data 360 to be turned on."
draft: false
---

Agentforce cost per action is easy to state and easy to underestimate. A standard action costs 20 Flex Credits, or $0.10. A realistic estimate also counts prompts priced by model tier, voice actions at 30 credits, Data 360 processing for manuals and spare parts catalogues, and test runs in the sandbox. Unused credits expire at the order end date. I estimate per conversation type, count every meter separately and buy credits along the go-live plan. In the illustrative scenario below, plain text actions make up only 55 percent of the monthly credits.

## How do Flex Credits work?

Flex Credits are the currency in which Salesforce bills Agentforce consumption. The [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/) lists them at $500 per 100,000 credits, and the euro price on the same page is €500. Every billable event draws a fixed number of credits defined in the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), updated as of 31 August 2026. Salesforce defines an action as "a specific function that an AI agent executes on the platform", for example reading an order from SAP, looking up a spare part or creating a case.

Three details matter for planning:

- **Credits come from one pool.** The pricing page says Flex Credits are fungible across actions, prompts, translations and voice actions. Data 360 usage is billed in credits on the same rate card.
- **Deterministic steps are billed too.** According to the [help article on billable usage types](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5), agent actions are billed when they run, whether deterministically or through LLM reasoning. Moving a warranty rule into [Agent Script](../agent-script-deterministic-rules/) makes the agent more reliable, but each action still costs the same.
- **One pricing model per org.** Flex Credits and the $2 per conversation model are not supported in the same org.

Salesforce offers three buying models. Pre-Purchase pays for the full term upfront. Pre-Commit sets a baseline that is billed monthly in arrears, with a true-up at the end of the term. PayGo bills what you use. Usage above the entitlement is billed at the contracted rate, and the pricing page states there is no overage penalty. Since the [Flex Agreement of May 2025](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/) you can also convert user licences into Flex Credits and back.

## What do prompts cost, and why does the model matter?

Prompts are the meter that is easiest to overlook, because the examples on the pricing page count only actions. The help article explains the logic: prompt usage is calculated per call to the LLM gateway, one prompt covers up to 2,000 tokens of input and output, and a larger call counts as several prompts. A call with 6,500 tokens is metered as four prompts. The price per prompt depends on the tier of the model, and Salesforce's [model support page](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm&type=5) assigns every model to a tier:

| Tier | Credits per prompt | Example models |
|---|---|---|
| Basic | 2 | GPT-5 Mini, Gemini 2.5 Flash, Nova Lite |
| Standard | 4 | Claude Sonnet 4.6, Claude Sonnet 5, GPT-5, Gemini 2.5 Pro |
| Advanced | 16 | Claude Opus 4.8, GPT 5.5, GPT 5.6 Sol |
| Starter | 2 | your own model through the LLM gateway |

Metering of Advanced prompts started on 21 July 2026. Model choice is therefore a cost decision: the same 6,500-token summary costs 8 credits on a Basic model, 16 on Standard and 64 on Advanced. For a case summary that a service rep reads and corrects, I would start with a Standard model and only move up if tests show a quality gap.

Prompts also appear outside agents. The help article names embedded generative features such as Service Replies. One point stays open: the article does not say whether the reasoning engine's own LLM calls are metered as prompts on top of the actions. I budget prompts for every prompt template and generative feature in the design, and check in the pilot whether Digital Wallet shows anything else.

## Voice, sandbox and Data 360: where estimates go wrong

### Voice

Voice actions cost 30 credits in production and 24 in a sandbox. The voice example on the pricing page counts four voice actions per call, so 120 credits. The rate card also lists Speech Foundations: speech to text at 150 credits per hour of audio, text to speech at 6,000 credits per million characters and translation at 4,000 per million characters. The help article says these are metered independently of other usage types. Whether your voice channel triggers them on top of the voice actions is a question for your account executive before the estimate is final. For a machine builder, voice makes sense where technicians or dealers call a spare parts line from the workshop. In a dealer portal, text is cheaper per step.

### Sandbox and tests

Actions in sandboxes and scratch orgs cost 16 credits, voice actions 24. Prompts cost the same in a sandbox as in production. Agent testing [runs only in sandboxes](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html), and Salesforce notes that running tests consumes requests and credits. A test suite that runs after every change to the agent is a recurring cost. How many runs make sense before go-live is the topic of [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).

### Data 360

When the agent grounds its answers on manuals, service bulletins or spare parts catalogues, Data 360 processes these documents. The rate card charges 150 credits per MB for unstructured processing and 600 per MB for intelligent processing in the base tier. Tiers reset on the first day of each month and apply per usage type: up to 300,000 credits the base rate applies, above that the rate drops in three steps to a fifth, 30 credits per MB from 12.5 million credits. Queries cost 3 credits per million rows. In a sandbox there are no tiers, and unstructured processing costs a flat 120 credits per MB.

Two more cost drivers come from [Salesforce Ben's guide to the Data 360 vector database](https://www.salesforceben.com/data-360-formerly-data-cloud-deep-dive-your-guide-to-the-vector-database/): hybrid search costs twice as many credits as vector search, and search indexes must be rebuilt when new content is added. I go deeper on this in [Data 360 costs for AI agents](../data-360-costs-for-ai-agents/).

## A typical scenario: a spare parts agent for dealers

Assume a machine builder with SAP, Service Cloud, a dealer portal and about 2 GB of spare parts catalogues and manuals as PDF files. The agent answers dealers on part numbers, availability and delivery dates, in the portal and on a phone line. All numbers are assumptions to show the method.

| Item per month | Assumption | Credits |
|---|---|---|
| Text actions | 2,000 portal conversations × 3 actions × 20 | 120,000 |
| Prompts | 2,000 summaries of 3,000 tokens = 2 prompts × 4 (Standard) | 16,000 |
| Voice actions | 400 calls × 4 voice actions × 30 | 48,000 |
| Speech to text, if charged | 400 calls × 4 minutes ≈ 27 hours × 150 | 4,000 |
| Data 360 updates | 200 MB of changed documents × 150 | 30,000 |
| **Total** | | **218,000, about $1,090** |

On top come set-up and tests. Processing the 2,000 MB once costs 300,000 credits, or $1,500, which exactly fills the base tier of that month. Ten test runs with 200 conversations each cost 112,000 credits: 9,600 for actions at 16 and 1,600 for prompts per run. A 200 MB sample of the catalogues in the sandbox costs 24,000 credits; the full 2 GB there would cost 240,000. Twelve months at full volume plus set-up and tests come to about 3.05 million credits.

The scenario shows three things:

- **Text actions are only 55 percent of the monthly credits.** An estimate that multiplies conversations by actions misses almost half.
- **The model is a price lever.** On an Advanced model the same summaries would cost 64,000 instead of 16,000 credits a month.
- **Included pools run out fast.** One agent of this size uses more than the 2.75 million credits per org per year that the pricing page lists for Max Edition, and about six times the 500,000 included in Core Edition. What that means for licence planning is covered in [the editions Core, Advanced and Max](../salesforce-editions-core-advanced-max/).

The full calculation for an order status agent, including the comparison with conversation pricing, is in [what a dealer service agent costs](../dealer-service-agent-cost-calculation/).

## How do you estimate Agentforce costs per action?

I work through these steps in this order:

1. **Count actions per conversation type.** Walk each topic of the agent design through: which actions run for an order status question, which for a spare part query. The pricing page examples give a feel, with two actions for an order status check and five for scheduling a field service appointment. Confirm the count later with transcripts from sandbox tests.
2. **List every LLM call** outside the actions: prompt templates, summaries, generated replies. Estimate tokens per call, round up to 2,000-token units and multiply by the tier of the chosen model.
3. **Treat voice separately**, with voice actions at 30 credits plus the speech meters if they apply to your setup.
4. **Size the documents for Data 360**: MB for the initial load, MB that change each month and the tier that applies.
5. **Budget the test load**: test cases × runs × actions at 16, prompts at the full rate, and a document sample in the sandbox.
6. **Spread it over the months**: pilot, ramp-up, full volume. This profile decides how many credits to buy and when.
7. **Keep a reserve for open meters.** Headless Platform Interactions, the meter for agentic MCP and API calls, are listed as "TBA" on the rate card. [Salesforce Ben reports](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/) 30 days' notice before metering starts, limited to production orgs. If external agents will call your org, read [MCP access as a budget risk](../mcp-api-calls-salesforce-budget-risk/).

Four weeks after go-live, compare the estimate with [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/). It shows consumption in near real time down to agent, action and channel and sends alerts at thresholds you set. It requires Data 360 to be turned on, which is one more reason to plan Data 360 from the start.

## What happens to unused Flex Credits?

They expire. The rate card says Flex Credits must be used before the order end date and allows no rollover, and the pricing page confirms they do not roll over into the next subscription term. If a manufacturer buys a year of credits in January and the go-live slips from March to June, three months of planned volume are paid for and never used.

I would therefore buy the first year along the ramp-up profile: a small pre-purchase for pilot and tests, then PayGo or Pre-Commit for the ramp-up, and a larger volume once Digital Wallet shows real numbers. The pricing page describes Pre-Commit as "widely available later this year", so ask whether it is available for your contract. Because usage above the entitlement is billed at the contracted rate without a penalty, a tight first purchase carries little risk. Also ask whether included edition credits are per org and per year: the pricing page says so for Max, while the [editions announcement of September 2026](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/) does not say it for Core and Advanced. These questions are part of my [make-or-buy and licence planning](../../services/make-or-buy-licences/).

Flex Credits are simple to price per action, but you can only plan them per conversation with every meter counted. If you want a second pair of eyes on your Agentforce estimate, [send me a message](#contact).
