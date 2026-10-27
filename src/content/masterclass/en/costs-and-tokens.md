---
title: "AI costs in Salesforce: tokens, Flex Credits, budget"
description: "What AI development and Agentforce runtime cost in Salesforce: token prices, Flex Credits, editions, worked examples and budget rules for manufacturers."
lang: en
slug: costs-and-tokens
translationKey: masterclass-07
chapter: 7
short: "Costs and tokens"
summary: "How token prices in development and Flex Credits at Agentforce runtime fit together, and how a manufacturer budgets for both."
takeaways:
  - "AI in a Salesforce programme costs in two currencies: coding agents bill by tokens, Agentforce agents at runtime bill by actions and prompts in Flex Credits. Keep them on separate budget lines."
  - "Prompt caching is the biggest lever for coding agents: an example session on Claude Opus 5.5 costs about $2.34 with caching and about $12.40 without."
  - "Anthropic puts Claude Code at around $13 per developer per active day and $150 to $250 a month; seat prices now buy a usage budget, not unlimited use."
  - "Core, Advanced and Max include 500,000, 1 million and 2.75 million Flex Credits per org per year; a single dealer agent can use about 3 million in its first year."
  - "Data 360 for spare part catalogues and the still unpriced Headless Platform Interactions meter are the items most often missing from estimates."
articles: [flex-credits-agentforce-costs, salesforce-editions-core-advanced-max, dealer-service-agent-costs, ai-coding-costs-salesforce-project, data-360-costs-for-agents, headless-platform-interactions-budget]
faq:
  - q: "What does a coding agent like Claude Code cost per developer?"
    a: "For enterprise deployments Anthropic gives an average of around $13 per developer per active day and $150 to $250 a month, with 90 percent of users below $30 per active day. Team and Enterprise seats cap usage through a five-hour and a weekly window."
  - q: "Is the Agentforce Vibes flat fee cheaper than Flex Credits?"
    a: "For daily agentic work, usually yes. The flat fee is $125 per user and month. At 30,000 tokens per request on a Standard model, break-even is around 420 requests a month, about 20 per working day."
  - q: "Does German text cost more tokens than English?"
    a: "Anthropic only says that characters per token depend on the model and the language. I found no official ratio for German. Count a typical specification with the free token counting endpoint of the Claude API before you budget."
  - q: "Which Agentforce costs are most often missing from estimates?"
    a: "Prompts by model tier, test runs in the sandbox, document processing in Data 360, and Headless Platform Interactions, whose rate is still TBA on the rate card. In the example of a spare parts agent, text actions are only 55 percent of the monthly credits."
draft: false
---

AI in a Salesforce programme costs in two currencies. Coding agents such as Claude Code, Codex, Copilot or Agentforce Vibes bill by tokens, and the context the agent re-sends at every step drives the bill harder than the prompt does. Agentforce agents at runtime bill by actions and prompts in Flex Credits, at half a cent per credit. Put both on one line and your estimate will be wrong. The biggest levers are prompt caching in development and, at runtime, Data 360 and test load, which many estimates leave out.

## What are you paying for when AI enters a Salesforce programme?

The two cost worlds side by side:

| | Development with coding agents | Running Agentforce agents |
|---|---|---|
| Billing unit | Tokens: input, cache, output | Flex Credits per action, prompt, MB, row |
| Examples | Claude Code, Codex, Copilot, Agentforce Vibes | Dealer agent, service agent, warranty check |
| Who pays | Partner or client, depending on the contract | Client, through the Salesforce contract |
| Biggest lever | Caching, model choice, short sessions | Actions per conversation, document volume, tests |
| Typical blind spot | Output and thinking tokens | Data 360, Headless Platform Interactions |

Agentforce Vibes sits in between. According to its [billing documentation](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html) it counts tokens in 2,000-token increments, rounded up, but you pay in Flex Credits or through a flat fee per user.

For coding tools, 2026 turned request counters into token budgets. GitHub Copilot bills in AI credits at $0.01 each, with each token priced "based on the model used" ([GitHub docs](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/billing/billing-for-individuals)). Codex has billed in credits per million tokens since 2 April 2026 ([OpenAI](https://help.openai.com/en/articles/20001106-codex-rate-card-2)). The seat price buys a budget, and the API price table becomes the common denominator. Which tool fits which task is in [chapter 6](../ai-tool-decision-matrix/), the vendors themselves in [chapter 4](../external-coding-agents/).

## What is a token, and why does context matter more than the prompt?

A token is the smallest unit a language model processes: a word, part of a word or a single character. According to [Anthropic's glossary](https://platform.claude.com/docs/en/about-claude/glossary), a token represents about 3.5 English characters on older Claude models, and Claude 4.7 and later use a newer tokenizer that produces about 30 percent more tokens for the same text. By that rule of thumb, an Apex class of 40,000 characters comes to roughly 11,400 tokens, closer to 14,900 on the 5.5 models. Anthropic adds that characters per token depend on model and language; I found no official ratio for German. The [token counting endpoint of the Claude API](https://platform.claude.com/docs/en/build-with-claude/token-counting) is free; use it on a real specification and a typical class from your repository.

The tokenizer also shifts price comparisons: Sonnet 5.5 costs $2 per million input tokens against $3 for Sonnet 4.6, but needs about 30 percent more tokens, so it is about 13 rather than 33 percent cheaper.

The loop makes agentic work expensive. The [Claude Code cost documentation](https://code.claude.com/docs/en/costs) names the drivers:

- **Context at every step:** Claude Code sends the full conversation with every request, and every tool call creates another request carrying the results.
- **Thinking as output:** thinking tokens are billed as output, and thinking cannot be turned off on Opus 5.5, Sonnet 5.5 or Haiku 5.5. Output costs five times input on Claude 5.5.
- **Cache misses after breaks:** the first message after a break longer than the cache lifetime reprocesses the full context.
- **Agent teams:** in plan mode they use about seven times the tokens of a standard session.
- **Rules files and MCP:** CLAUDE.md loads at every session start, and Anthropic recommends keeping it under 200 lines. CLI tools use less context than MCP servers.

## What does AI-assisted development cost?

### Claude API token prices

Prices in USD per million tokens from the [Claude pricing page](https://platform.claude.com/docs/en/about-claude/pricing), as of 27 October 2026:

| Model | Input | 5-min cache write | Cache read | Output |
|---|---|---|---|---|
| Claude Opus 5.5 | $4.00 | $5.00 | $0.20 | $20.00 |
| Claude Sonnet 5.5 | $2.00 | $2.50 | $0.10 | $10.00 |
| Claude Haiku 5.5, prompt up to 100,000 tokens | $0.10 | $0.125 | $0.01 | $0.50 |
| Claude Haiku 5.5, prompt over 100,000 tokens | $0.50 | $0.625 | $0.05 | $2.50 |
| Claude Opus 4.5 to 4.8 | $5.00 | $6.25 | $0.50 | $25.00 |
| Claude Sonnet 4.6 | $3.00 | $3.75 | $0.30 | $15.00 |

Three rules from the same page matter. The Batch API halves input and output. The cache read at 0.05 times the input price applies only to Opus 5.5 and Sonnet 5.5; older models and Haiku 5.5 stay at 0.1 times. And Haiku 5.5 jumps to five times the rate above 100,000 prompt tokens, cache included. Agentic sessions pass that mark quickly, so Haiku is cheap mainly for short tasks. For comparison, [GPT-5.5](https://developers.openai.com/api/docs/models/gpt-5.5.md) costs $5 input, $0.50 cached and $30 output, and above 272,000 input tokens twice the input and 1.5 times the output rate for the whole session.

### Seats and subscriptions

| Offer | Price per user and month | What the price buys |
|---|---|---|
| Claude Pro | $20, $17 annual | Claude Code, allowance without a published token figure |
| Claude Max | from $100 | larger allowance |
| Claude Team, Standard or Premium | $25 or $125, $20 or $100 annual | allowance in a five-hour and weekly window, shared with chat |
| Claude Enterprise | $20 per seat annual, 20 seat minimum | usage on top at API rates |
| GitHub Copilot Business or Enterprise | $19 or $39 | 1,900 or 3,900 AI credits, pooled |
| Codex | $100 to $200 average usage, per OpenAI | credits per million tokens |
| Agentforce Vibes flat fee | $125 | premium model up to 2,500 requests or 36M tokens per 30 days |
| Gemini Code Assist Standard or Enterprise | about $19 or $45 on annual commitment | converted from hourly rates |

Sources: [claude.com/pricing](https://claude.com/pricing), [Copilot plans](https://docs.github.com/pt/copilot/get-started/plans-for-github-copilot), [Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card-2), [Vibes pricing](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/), [Vibes billing](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html), [Gemini pricing](https://cloud.google.com/products/gemini/pricing). Cursor is missing because I could not open its official pricing page.

For Claude Code in [enterprise deployments](https://code.claude.com/docs/en/costs), Anthropic gives around $13 per developer per active day and $150 to $250 a month, with 90 percent of users below $30 a day. At 20 active days that is $260 at API rates. A Team Premium seat can be cheaper for heavy users while the windows suffice, though their size in tokens is not published. I would measure one month at API rates first. Who should carry the cost, client or partner, is covered in [AI coding costs in a Salesforce project](../../blog/ai-coding-costs-salesforce-project/). My default: if the agent works in your repository and your sandboxes, the accounts belong to you, for the same reasons as with [DevOps tools](../../blog/why-clients-should-own-their-devops-tools/).

### Worked example: one agentic session

Assumptions: 40 model calls, context growing from 20,000 to 120,000 tokens, 70,000 on average. Each call adds 2,500 new tokens and produces 1,500 output tokens including thinking, with five-minute caching.

1. Cache writes: 20,000 + 40 × 2,500 = 120,000 tokens × $5.00 per million = **$0.60**
2. Cache reads: 40 × 67,500 = 2.7 million tokens × $0.20 per million = **$0.54**
3. Output: 40 × 1,500 = 60,000 tokens × $20.00 per million = **$1.20**
4. Total on Opus 5.5: **$2.34**

Without caching, 2.8 million input tokens at $4 cost $11.20 alone, **$12.40** with output, a good five times as much. On Sonnet 5.5 with caching: $0.30 + $0.27 + $0.60 = **$1.17**. Five Opus sessions a day come to $11.70, close to Anthropic's $13 per active day. Output is about 2 percent of the tokens and a good half of the cost, which is why Anthropic recommends Sonnet as default and Opus for architecture questions.

### Worked example: Agentforce Vibes metered or flat fee

1. A request with 6,500 tokens counts as four units; the example comes from the billing documentation.
2. On a Standard model such as Sonnet 4.6: 4 × 4 credits = 16 credits = **$0.08**. Opus runs as Advanced: 4 × 16 = 64 credits = **$0.32**.
3. An agentic request with 30,000 tokens: 15 units × 4 = 60 credits = **$0.30**.
4. Flat fee break-even: $125 ÷ $0.30 ≈ **417 requests a month**, about 20 per working day. In tokens: 25,000 credits ÷ 4 × 2,000 = **12.5 million tokens** on Standard models.

Daily agentic users are better off on the flat fee, up to its cap; after that, work continues on Flex Credits or the included GPT-5.

### Batch: an org assessment before the programme starts

Assume a ten-year-old org with 2,000 Apex classes to summarise before a restart, at 8,000 input and 1,000 output tokens per class on Sonnet 5.5 through the Batch API: 16 million × $1 + 2 million × $5 = **$26** instead of $52. Thinking may push output higher; even triple would not register in a programme budget.

## What does Agentforce cost at runtime?

Agentforce bills in Flex Credits, listed on the [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/) at $500 per 100,000 credits. The multipliers are in the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), updated as of 31 August 2026:

| Item | Credits production / sandbox | Price in production |
|---|---|---|
| Standard or custom action | 20 / 16 | $0.10 |
| Voice action | 30 / 24 | $0.15 |
| Prompt Basic, Standard, Advanced per 2,000 tokens | 2, 4, 16 | $0.01, $0.02, $0.08 |
| Help Agent resolution | 400 / 0 | $2.00 |
| Data 360 unstructured processing, base tier | 150 / 120 per MB | $0.75 per MB |
| Data 360 queries, base tier | 3 / 2.4 per million rows | $0.015 |
| Headless Platform Interaction | TBA | open |

According to the [Salesforce model support page](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm&type=5), Claude Sonnet 4.6, Sonnet 5 and GPT-5 run as Standard, Claude Opus and GPT 5.5 as Advanced. The same summary costs four times as much on Opus. Unused credits expire at the order end date; the rate card rules out rollover. Flex Credits and the $2 per conversation model are not supported in the same org. Agentforce add-ons cost $125 per user and month, the Agentforce User License $5 plus Flex Credits. For large customers, [Forrester](https://www.forrester.com/blogs/ai-agents-become-economic-actors-salesforce-rewrites-the-rules-of-pricing) describes the AELA, a fixed fee over two or three years, with no public terms. How to estimate per action is in [Flex Credits and Agentforce cost per action](../../blog/flex-credits-agentforce-cost-per-action/).

### What the editions include

The [Sales Cloud pricing page](https://www.salesforce.com/sales-cloud/pricing/) lists "500K Flex Credits/org/year" for Core, 1 million for Advanced and 2.75 million for Max, per org per year. At list price that is $2,500, $5,000 and $13,750. Against seat prices of $195, $395 and $550 per user and month, the pools are small: credits are no reason to pick an edition. Salesforce announced new pricing for the Industries editions, which matter for Manufacturing Cloud, for ["later this fall"](https://www.salesforce.com/news/stories/salesforce-simplifies-editions-2026/). The trade-off per edition is in [Salesforce editions Core, Advanced and Max](../../blog/salesforce-editions-core-advanced-max/).

### Worked example: an agent for dealer enquiries

Assumption: 3,000 conversations a month about order status, delivery dates and spare parts, with three actions and two Standard prompts each.

1. Actions: 3,000 × 3 × 20 = 180,000 credits
2. Prompts: 3,000 × 2 × 4 = 24,000 credits
3. Total: 204,000 credits = **$1,020 a month**, against $6,000 on the per-conversation model
4. Twelve months: 2,448,000 credits, more than the Core and Advanced pools, just under Max

With 2,000 MB of spare part catalogues processed in Data 360 (300,000 credits) and sandbox tests, the first year comes to about 3 million credits or $15,000. The full calculation with test load and resolution pricing is in [Agentforce dealer service agent: cost per month](../../blog/dealer-service-agent-cost-calculation/).

### The two most common gaps

**Data 360.** When an agent relies on manuals, exploded drawings or spare part catalogues, 1 GB of unstructured documents costs about 150,000 credits in the base tier, roughly $750, and four times that if exploded drawings need LLM-based Intelligent Processing at 600 credits per MB. In a sandbox there are no volume tiers. Test with a subset and remove outdated catalogue versions first. More in [Data 360 costs for AI agents](../../blog/data-360-costs-for-ai-agents/).

**Headless Platform Interactions.** When Claude, ChatGPT or other agents access Salesforce through MCP or API, every successful call by a registered agent is to count, according to [SalesforceBen](https://www.salesforceben.com/salesforce-will-charge-flex-credits-for-agentic-mcp-and-api-calls/), only in active production orgs and with 30 days' notice. Classic integrations keep their current pricing. Using Claude on Salesforce data then means paying twice: Anthropic for tokens, Salesforce for interactions. You can estimate the volume, as shown in [chapter 3](../mcp-and-interfaces/); the budget line is in [MCP and API calls to Salesforce as a budget risk](../../blog/mcp-api-calls-salesforce-budget-risk/).

## A typical scenario: a machine builder's first AI year

Assume a machine builder with 80 Service Cloud users on Core Edition, SAP S/4 and a partner whose six developers use Claude Code at API rates. Planned are the dealer agent from above, an org assessment and Hosted MCP for 25 people in the service back office. All volumes are assumptions.

| Item | Assumption | Per year at list price |
|---|---|---|
| Partner coding agents | 6 × 20 active days × $13 × 12 months | $18,720 |
| Dealer agent with Data 360 and tests | about 3 million credits | about $15,000 |
| Less Core pool | 500,000 credits, if otherwise unused | minus $2,500 |
| Org assessment via Batch | one-off | $26 |
| Headless Platform Interactions | 42,000 calls a month | unknown, rate TBA |
| **Total without HPI** | | **about $31,000** |

The 80 Core seats alone cost $187,200 a year at list price, so AI consumption is not the big number. The risks: a partner team defaulting to Opus instead of Sonnet can double the development line, and the HPI rate can change the back office bill later without anyone touching the system.

## How do you budget AI costs in a Salesforce programme?

1. **Keep two budget lines:** tokens for development, Flex Credits for runtime, each with its own owner.
2. **Count your own documents** with token counting instead of copying rules of thumb.
3. **Choose the model by task:** Sonnet as default, Opus for architecture and hard bugs, Haiku for short bulk jobs under 100,000 tokens.
4. **Keep context small:** `/clear` between tasks, rules file under 200 lines, only the MCP servers you need. The rules for clean AI code are in [chapter 8](../ai-code-best-practices/).
5. **Buy seats after measuring:** run one month at API rates or metered, then decide per person between flat fee and seat.
6. **Estimate Agentforce per conversation type:** actions, prompts, sandbox tests and documents in MB; buy credits along the go-live plan, because they expire.
7. **Hold a reserve for open meters** and get written confirmation from your account executive on how the pool, multiple orgs and Headless Platform Interactions are billed.
8. **Measure monthly:** [Digital Wallet](https://www.salesforce.com/agentforce/digital-wallet/) shows Agentforce consumption by agent, action and channel and needs Data 360 turned on; for Claude use the spend report or Console.

These questions are part of my [make-or-buy and licence planning](../../services/make-or-buy-licences/). All chapters are on the [overview page](../).

AI costs in Salesforce are easy to plan once you price tokens and actions separately and name the open meters openly. If you want a second look at your estimate or a partner offer with an AI component, [send me a message](#contact).
