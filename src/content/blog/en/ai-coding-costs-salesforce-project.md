---
title: "AI coding costs in a Salesforce project: who pays?"
description: "What AI coding with Claude Code, Codex, Copilot or Agentforce Vibes costs in a Salesforce project, how the token math works and who should pay for it."
pubDate: 2026-10-27
lang: en
slug: ai-coding-costs-salesforce-project
translationKey: ai-coding-costs-salesforce-project
topic: devops
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
    a: "Metered Vibes does. Salesforce bills it in the same Flex Credits as Agentforce, counted in units of 2,000 tokens. The flat fee of $125 per user and month avoids this, but caps premium models at 2,500 requests or 36 million tokens per 30 days."
  - q: "Why does prompt caching matter so much for AI coding costs?"
    a: "A coding agent re-sends the whole conversation with every step. On Claude Opus 5.5 and Sonnet 5.5 a cache read costs 5 percent of the normal input price, which turns a session of about $9.80 into one of about $2.20 in the worked example."
draft: false
---

AI coding costs in a Salesforce project are lower than most budget discussions assume: about $19 to $250 per developer and month at list price. Copilot Business costs $19 with included credits, Claude and ChatGPT seats $20 to $125, and Anthropic puts Claude Code at API rates at $150 to $250 per developer and month. For a partner team of eight that comes to roughly $650 to $1,500 a month, about one percent of its day rates. The harder question is who holds the accounts and carries the consumption risk. My rule: in time and materials the client pays, in a fixed price the partner does.

## What does AI coding cost per developer and month?

In 2026 almost every coding tool sells a seat with a budget and bills usage above it per token. The list prices on 27 October 2026:

- **Claude Code at API rates.** Anthropic [reports](https://code.claude.com/docs/en/costs) an average of about $13 per developer per active day and $150 to $250 per developer per month across enterprise deployments, with 90 percent of users below $30 per active day.
- **Claude Team and Enterprise.** A Team Standard seat costs $25 a month ($20 billed annually), a Premium seat $125 ($100 annually). Enterprise costs $20 per seat plus usage at API rates, with a minimum of 20 seats, according to [Anthropic's pricing page](https://claude.com/pricing). Seat usage draws from an allowance that resets in a rolling five-hour window and a weekly window. Anthropic does not publish its size in tokens.
- **OpenAI Codex.** The [Codex rate card](https://help.openai.com/en/articles/20001106-codex-rate-card-2) gives an average of about $100 to $200 per developer per month. Codex is part of [ChatGPT Business](https://openai.com/business/pricing/) at $25 per seat and month ($20 annually), and Business workspaces can buy credits for more usage.
- **GitHub Copilot.** Business costs [$19 per user and month with 1,900 AI credits](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/choose-enterprise-plan), Enterprise $39 with 3,900. One credit is $0.01, the credits are [pooled across the organisation](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/billing/organizations-and-enterprises/usage-based-billing), and code completions are not billed in credits.
- **Agentforce Vibes.** Salesforce lists Flat Fee Access at $125 per user and month, or metered use with Flex Credits. Vibes gets its own section below because its meter works differently.

The seat price says little about the bill. A Copilot Business seat includes $19 of model usage, and GitHub prices each token at the rate of the model used. The agent session calculated below costs about $2 at Anthropic's list price, so if GitHub's rate is similar, the included credits cover around nine such sessions per developer and month.

## How do tokens turn into a bill?

A token is the unit models are billed in, roughly a piece of a word or of code. A coding agent such as Claude Code works in a loop: it reads files, runs a command, reads the result and sends all of it back to the model. Anthropic [writes](https://code.claude.com/docs/en/costs) that Claude Code sends the full conversation with every request. In a Salesforce repository that context holds the rules file, Apex classes, metadata XML and test output.

Three mechanisms on [Anthropic's pricing page](https://platform.claude.com/docs/en/about-claude/pricing) decide the price:

- **Caching.** Context that was already sent is read from the prompt cache. On Claude Opus 5.5 a cache read costs $0.20 per million tokens instead of $4 for fresh input, 5 percent of the price. Writing to the five-minute cache costs 1.25 times the input price.
- **Output and thinking.** Output costs $20 per million tokens on Opus 5.5, five times the input price. Thinking tokens are billed as output, and on Opus 5.5 and Sonnet 5.5 thinking cannot be switched off.
- **Model choice.** Sonnet 5.5 costs half as much as Opus 5.5: $2 input, $10 output, $0.10 cache read per million tokens.

### Worked example: one agent session

Assume a developer asks the agent for a trigger handler for warranty claims, including tests. The session has 30 model calls. The context starts at 25,000 tokens and grows by about 3,000 new tokens per call to roughly 115,000. Each call returns 2,000 output tokens including thinking. These numbers are assumptions to show the method.

- Cache writes: 25,000 + 30 × 3,000 = 115,000 tokens at $5 per million = $0.58
- Cache reads: on average 68,000 tokens per call, 2.04 million in total, at $0.20 per million = $0.41
- Output: 30 × 2,000 = 60,000 tokens at $20 per million = $1.20
- **Total on Opus 5.5: about $2.20.** On Sonnet 5.5 the same session costs about $1.10.

Without caching, the 2.16 million input tokens would cost $8.62 at the full input price, and the session about $9.80. Output is less than 3 percent of the tokens and more than half of the cost. Six such sessions per active day come to about $13, the average Anthropic reports.

Two effects push the number up. Claude 4.7 and later models use a tokenizer that produces about 30 percent more tokens for the same text, so prices per million are only comparable within one model generation. And agent teams, where several Claude instances work in parallel, use about 7 times more tokens than a standard session when the teammates run in plan mode.

## A typical scenario: a partner team builds service processes

Assume a machine builder with SAP, Service Cloud, Field Service for its service technicians and a dealer portal. A nearshore partner team of eight builds the next release: six developers who work with a coding agent on 18 days a month, plus a lead consultant and a project manager who only need a chat seat. All volumes are assumptions; the prices are the list prices above.

- **Claude Code at API rates:** 6 × 18 days × $13 = $1,404, plus two Team Standard seats at $25, about $1,450 a month. The team pays for what it uses, with no ceiling unless someone sets one.
- **Claude Team:** six Premium seats at $125 and two Standard seats at $25 = $800 a month, $640 with annual billing. Predictable, but when a developer exhausts the allowance, work pauses until the window resets, unless the admin has enabled usage credits.
- **Codex in ChatGPT Business:** at OpenAI's average of $100 to $200 per developer, the six developers land at $600 to $1,200 a month, plus seats for the two others.
- **Copilot Business:** eight seats at $19 = $152, with a pool of 15,200 credits worth $152 of usage. At about $2 per agent session the pool lasts for roughly 76 sessions, about two working days if each of the six developers runs six sessions a day. After that, every credit costs $0.01, and over a month the team lands near $1,300.

So the team ends up at roughly $650 to $1,500 a month, whichever tool it picks. Now compare that with the team itself. Assume a blended rate of $800 per person and day: 8 people × 18 days = $115,200 a month. AI coding adds about one percent. McKinsey [writes](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/beyond-the-copilot-scaling-the-agentic-product-development-life-cycle) that as agents take on more work, spending on tokens, compute, infrastructure and AI Ops can rise to as much as 20 percent of existing labour costs. The line item will grow.

In my view the token bill is not today's budget risk. The risks are a meter without limits and an open question about who gets the productivity gain.

## Why does Agentforce Vibes need its own calculation?

Agentforce Vibes is Salesforce's own coding agent. It bills differently from the tools above in two ways that matter to a manufacturer:

1. **Metered Vibes uses the same Flex Credits as your agents.** The [Vibes pricing page](https://www.salesforce.com/agentforce/developers/vibe-coding/pricing/) says metered use "consumes the same credits used by Agentforce". A partner team on metered Vibes draws from the pool you planned for a dealer service agent. How that pool works is explained in [Flex Credits and Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).
2. **The unit is 2,000 tokens.** According to the [billing documentation](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-admin-billing.html), usage is counted in units of 2,000 input and output tokens, rounded up. Opus models count as Advanced prompts, which cost 16 credits per unit on the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf), so $0.08 per 2,000 tokens. The documentation does not say whether context that the agent re-sends with every step counts in full. If it does, one request with 70,000 tokens of context on an Opus model costs 35 units, 560 credits or $2.80, more than the whole session on the Anthropic API above. I would measure this for a week in Digital Wallet before anyone works metered.

The flat fee of $125 per user and month avoids the meter, but caps premium models at 2,500 requests or 36 million tokens per 30 days. After that, users fall back to GPT-5 under fair use or switch to Flex Credits, and Opus models are only available metered. Vibes is not available in the EU Operating Zone. One point in its favour: the licence is assigned in the client's org, so the client holds the accounts by default, and according to the [FAQ](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html) data stays within Salesforce's trust boundary and is not stored after the session. Which tool fits your team overall is the topic of [Agentforce Vibes, Claude Code or Copilot](../agentforce-vibes-claude-code-copilot/).

## Who should pay for AI coding: client or partner?

The answer follows the commercial model. In time and materials the client pays for days. When the partner's developers get faster with an agent, the client pays for fewer days, so the client should pay for the tokens as well. In a fixed price the partner keeps the gain and should carry the token cost. There are three setups:

- **The client provides the accounts.** Partner developers work with seats in the client's Claude, ChatGPT or GitHub organisation, or with a Vibes licence in the client's org. The client sees spend per person: Claude Team exports a spend report per user and model, and GitHub supports budgets per user and cost centre. Prompts and code run under the client's contract, and access ends when the partner leaves. This follows the same logic as [client-owned DevOps tools](../why-clients-should-own-their-devops-tools/).
- **The partner brings its own tools.** The cost sits in the day rate or the fixed price. That is simple and puts the consumption risk on the partner. But your source code and metadata then go through a contract you have never read, so your contract with the partner must name the allowed tools, models and data rules, as described in [contract rules for partners coding with AI](../partners-using-ai-coding-contract-rules/).
- **Pass-through at cost.** The partner uses its own accounts and invoices tokens monthly. I would accept this only with a monthly cap per developer, a usage report per person and no mark-up on tokens. Without a cap, the partner has no reason to pick Sonnet over Opus.

In time and materials I prefer the first setup. In the scenario the tools cost the client $650 to $1,500 a month, and in return the client controls data, limits and offboarding. In a German company the works council and data protection officer have a say in that, see [AI coding tools, works council and GDPR](../ai-coding-tools-works-council-gdpr/). How AI shifts projects towards fixed prices is covered in [fixed price or time and materials](../fixed-price-vs-time-and-materials-ai/), and whether to buy seats at all is part of my [make-or-buy and licence planning](../../services/make-or-buy-licences/).

## How do you keep AI coding costs under control?

1. **Decide who pays before the first sprint** and write it into the statement of work.
2. **Set limits.** Claude Team and Enterprise allow spend limits per organisation, group and member, the Claude Console has workspace spend limits, and GitHub offers budgets per user and cost centre, where a $0 budget blocks a user immediately.
3. **Default to Sonnet.** Anthropic recommends Sonnet for most coding tasks and Opus for complex architectural decisions. That halves the token price.
4. **Keep the rules file short.** Anthropic advises keeping CLAUDE.md under 200 lines, because it is loaded at the start of every session. What belongs in it is covered in [the AI rules file for your repository](../ai-rules-file-salesforce-repository/).
5. **Pilot with two developers for two weeks** and read the real spend before rolling out, as Anthropic itself suggests starting with a small pilot group.
6. **Budget the review.** Generated Apex still needs a human reviewer, and that time costs more than the tokens, see [reviewing AI-generated Salesforce code](../reviewing-ai-generated-salesforce-code/).

AI coding costs about one percent of a Salesforce partner team in the scenario, so settle who holds the accounts and the limits before you negotiate the price. If you want a second opinion on your setup or on your partner's offer, [send me a message](#contact).
