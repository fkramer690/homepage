---
title: "AI coding costs in a Salesforce project: who pays?"
description: "What AI coding with Claude Code, Codex, Copilot or Agentforce Vibes costs in a Salesforce project, how the token math works and who should pay for it."
pubDate: 2026-10-27
lang: en
slug: ai-coding-costs-salesforce-project
translationKey: ai-coding-costs-salesforce-project
topic: devops
category: devops
tags: [ai coding, claude code, github copilot, agentforce vibes, partner governance, costs]
takeaways:
  - "AI coding in a Salesforce project costs about $19 to $250 per developer and month at list price, from Copilot Business with included credits to Claude Code at API rates."
  - "Anthropic reports about $13 per developer per active day for Claude Code; caching makes repeated context cheap, so output and thinking tokens become the expensive part."
  - "In the scenario, AI tools for a partner team of eight cost about $650 to $1,500 a month, around one percent of what the team costs in day rates."
  - "Metered Agentforce Vibes draws on the same Flex Credits as your production agents and counts usage in units of 2,000 tokens; Opus models cost 16 credits per unit."
  - "In time and materials the client should own the accounts and pay for the tokens; in a fixed price the partner pays, and the contract names the allowed tools and data rules."
faq:
  - q: "What does Claude Code cost per developer per month?"
    a: "Anthropic reports an average of about $13 per developer per active day and $150 to $250 per developer per month in enterprise deployments at API rates. A Claude Team Premium seat costs $125 a month, or $100 billed annually, with a usage allowance instead of a token bill."
  - q: "Is GitHub Copilot cheaper than Claude Code for Salesforce work?"
    a: "The seat is cheaper: Copilot Business costs $19 per user and month and includes 1,900 AI credits, worth $19 of model usage. Agent sessions consume credits at the model's token rates, and above the pooled credits each credit costs $0.01, so heavy agent use narrows the gap."
  - q: "Should the client or the implementation partner pay for AI coding tools?"
    a: "It follows the commercial model. In time and materials the client gets the productivity gain through fewer billed days, so the client should own the accounts and pay. In a fixed price the partner keeps the gain and should carry the token cost."
  - q: "Does Agentforce Vibes use my Agentforce Flex Credits?"
    a: "Metered Vibes does. Salesforce says it consumes the same credits as Agentforce, counted in units of 2,000 tokens. The flat fee of $125 per user and month avoids this, but caps premium models at 2,500 requests or 36 million tokens per 30 days."
  - q: "Why does prompt caching matter so much for AI coding costs?"
    a: "A coding agent re-sends the whole conversation with every step. On Claude Opus 5.5 and Sonnet 5.5 a cache read costs 5 percent of the normal input price, which turns a session of about $9.80 into one of about $2.20 in the worked example."
draft: false
---

AI coding costs in a Salesforce project are lower than most budget discussions assume: about $19 to $250 per developer and month at list price. Copilot Business costs $19, Claude and ChatGPT seats $20 to $125, and Anthropic puts Claude Code at API rates at $150 to $250 a month. For a partner team of eight that is roughly $650 to $1,500 a month, about one percent of its day rates. The harder question is who holds the accounts and carries the consumption risk. My rule: in time and materials the client pays, in a fixed price the partner.

## What does AI coding cost per developer and month?

Most coding tools now sell a seat with a budget and bill usage above it per token. List prices on 27 October 2026:

- **Claude Code at API rates.** Anthropic [reports](https://code.claude.com/docs/en/costs) about $13 per developer per active day and $150 to $250 per month across enterprise deployments, with 90 percent of users below $30 per active day.
- **Claude Team and Enterprise.** Team Standard costs $25 per seat and month ($20 annually), Premium $125 ($100 annually), Enterprise $20 per seat plus usage at API rates, according to [Anthropic's pricing page](https://claude.com/pricing). Seat usage draws from an allowance that resets in a five-hour and a weekly window. Its size in tokens is not published.
- **OpenAI Codex.** The [Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card-2) gives an average of about $100 to $200 per developer per month. OpenAI lists Codex among the features of [ChatGPT Business](https://openai.com/business/pricing/) at $25 per seat ($20 annually).
- **GitHub Copilot.** Business costs [$19 per user with 1,900 AI credits](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan), Enterprise $39 with 3,900. One credit is $0.01, credits are [pooled across the organisation](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/billing/organizations-and-enterprises/usage-based-billing), and code completions are not billed.
- **Agentforce Vibes.** Flat fee of $125 per user and month or metered Flex Credits, see below.

The seat price says little about the bill. GitHub converts tokens into credits at the model's rate, so $19 of included usage covers only a handful of the agent sessions below.

## How do tokens turn into a bill?

A token is the unit models are billed in, roughly a piece of a word or of code. A coding agent works in a loop: it reads files, runs a command and sends everything back to the model. In a Salesforce repository that context holds the rules file, Apex classes, metadata XML and test output. Three rules on [Anthropic's pricing page](https://platform.claude.com/docs/en/about-claude/pricing) decide the price:

- **Caching.** Context already sent is read from the prompt cache. On Claude Opus 5.5 a cache read costs $0.20 per million tokens instead of $4, 5 percent of the input price. Writing to the five-minute cache costs 1.25 times the input price.
- **Output and thinking.** Output costs $20 per million tokens on Opus 5.5, five times input. Thinking tokens are billed as output, and on Opus 5.5 and Sonnet 5.5 thinking [cannot be switched off](https://code.claude.com/docs/en/costs).
- **Model choice.** Sonnet 5.5 costs half: $2 input, $10 output, $0.10 cache read per million tokens.

### Worked example: one agent session

Assume a developer asks the agent for a trigger handler for warranty claims, including tests. The session has 30 model calls, the context grows from 25,000 to about 115,000 tokens, and each call returns 2,000 output tokens including thinking. These numbers are assumptions.

- Cache writes: 115,000 tokens at $5 per million = $0.58
- Cache reads: 30 calls of about 68,000 tokens, 2.04 million at $0.20 per million = $0.41
- Output: 60,000 tokens at $20 per million = $1.20
- **Total on Opus 5.5: about $2.20.** On Sonnet 5.5: about $1.10.

Without caching, the 2.16 million input tokens cost $8.62 and the session about $9.80. Output is under 3 percent of the tokens and more than half the cost. Six such sessions per active day give about $13, Anthropic's average.

Two effects push this up: Claude 4.7 and later produce about 30 percent more tokens for the same text, and agent teams use about 7 times more tokens than a standard session in plan mode.

## A typical scenario: a partner team builds service processes

Assume a machine builder with SAP, Service Cloud, Field Service for its service technicians and a dealer portal. A nearshore partner team of eight builds the next release: six developers who use a coding agent on 18 days a month, plus a lead consultant and a project manager with chat seats. All volumes are assumptions; prices are the list prices above.

- **Claude Code at API rates:** 6 × 18 × $13 = $1,404, plus two Standard seats, about $1,450 a month, with no ceiling unless someone sets one.
- **Claude Team:** six Premium and two Standard seats = $800 a month, $640 annually. Predictable, but a developer who exhausts the allowance waits for the reset unless usage credits are enabled.
- **Codex in ChatGPT Business:** at OpenAI's average, $600 to $1,200 for the six developers plus two seats.
- **Copilot Business:** eight seats = $152 with a pool of 15,200 credits. If GitHub's model rate is close to Anthropic's list price, the pool lasts about 70 sessions, two working days at six sessions per developer and day. After that every credit is billed, and the month ends near $1,400.

At an assumed blended rate of $800 per person and day, the team itself costs 8 × 18 × $800 = $115,200 a month. AI coding adds about one percent. McKinsey [expects](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) that as agents take on more work, spending on tokens, compute, infrastructure and AI Ops can rise to as much as 20 percent of existing labour costs. In my view the bigger risks today are a meter without limits and the open question of who gets the productivity gain.

## Why does Agentforce Vibes need its own calculation?

Agentforce Vibes is Salesforce's coding agent. Two points matter:

1. **Metered Vibes uses your agents' Flex Credits.** The [Vibes pricing page](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/) says metered use "consumes the same credits used by Agentforce". A partner team on metered Vibes draws from the pool you planned for a dealer service agent, see [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).
2. **The unit is 2,000 tokens.** The [billing documentation](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html) counts input and output in units of 2,000 tokens, rounded up. Opus models count as Advanced prompts at 16 credits per unit on the [rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), $0.08 per unit. Salesforce does not say whether re-sent context counts in full. If it does, one Opus request with 70,000 tokens of context costs 560 credits or $2.80, more than the whole session above. I would measure a week in Digital Wallet first.

The flat fee caps premium models at 2,500 requests or 36 million tokens per 30 days, and Opus is only available metered. Vibes is not available in the EU Operating Zone. In its favour, the licence sits in the client's org, and the [FAQ](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html) says data stays within Salesforce's trust boundary. The tool choice itself is covered in [Agentforce Vibes, Claude Code or Copilot](../agentforce-vibes-claude-code-copilot/).

## Who should pay for AI coding: client or partner?

The answer follows the commercial model. In time and materials the client pays for days; when the partner's developers get faster, the client pays for fewer days, so the client should pay for the tokens too. In a fixed price the partner keeps the gain and carries the cost. Three setups exist:

- **The client provides the accounts.** Partner developers work with seats in the client's Claude, ChatGPT or GitHub organisation, or a Vibes licence in the client's org. The client sets limits, sees spend per person and removes access when the partner leaves. This is the logic of [client-owned DevOps tools](../why-clients-should-own-their-devops-tools/).
- **The partner brings its own tools.** The cost sits in the rate, and so does the consumption risk. But your source code then runs through a contract you have never read, so the contract must name the allowed tools, models and data rules, as in [contract rules for partners coding with AI](../partners-using-ai-coding-contract-rules/).
- **Pass-through at cost.** The partner invoices tokens monthly. I would accept this only with a cap per developer, a usage report per person and no mark-up, or nobody has a reason to pick Sonnet over Opus.

In time and materials I prefer the first setup: for $650 to $1,500 a month, the client controls data, limits and offboarding. In a German company the works council has a say, see [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/). Whether to buy seats at all is part of my [make-or-buy and licence planning](../../services/make-or-buy-licences/).

## How do you keep AI coding costs under control?

1. **Decide who pays before the first sprint** and write it into the statement of work.
2. **Set limits.** Claude Team and Enterprise have spend limits per organisation, group and member for usage beyond the seat allowance, the Claude Console has workspace limits, and GitHub has budgets per user and cost centre.
3. **Default to Sonnet.** Anthropic recommends Sonnet for most coding tasks and Opus for complex architectural decisions.
4. **Keep the rules file short.** Anthropic advises keeping CLAUDE.md under 200 lines, see [the AI rules file for your repository](../ai-rules-file-salesforce-repository/).
5. **Pilot with two developers for two weeks** and read the real spend.
6. **Budget the review.** A human reviewer for generated Apex costs more than the tokens, see [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/).

AI coding costs about one percent of a Salesforce partner team in the scenario, so settle accounts and limits before you negotiate the price. If you want a second opinion on your setup or your partner's offer, [send me a message](#contact).
