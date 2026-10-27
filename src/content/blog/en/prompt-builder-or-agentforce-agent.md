---
title: "Prompt Builder or Agentforce agent: when to use which"
description: "When a Prompt Builder template is enough for service reports, case summaries and dealer replies, when you need an agent, and what each costs in Flex Credits."
pubDate: 2026-10-27
lang: en
slug: prompt-builder-or-agentforce-agent
translationKey: prompt-builder-or-agent
topic: ai
categories: [ai]
tags: [prompt builder, agentforce, flex credits, ai agents, manufacturing, governance]
takeaways:
  - "A Prompt Builder template is enough when one input produces one text and a person reads it before anything happens: service report text, case summary, dealer reply draft or a nightly warranty summary."
  - "You need an agent with actions when the system must choose its next step, answer without a person in between, or write records such as cases, orders or field service appointments."
  - "On a Standard model a prompt costs 4 Flex Credits per 2,000 tokens, while every agent action costs 20 credits before any prompt; on an Advanced model one long summary costs more than two actions."
  - "Salesforce listed JSON output and asynchronous batches of up to 1,000 prompts for Prompt Builder in Winter '26, which covers many summary jobs without an agent."
  - "A tested template stays useful when an agent follows, because it can become the agent's reference action. Start with the template and add the agent only where dialogue or a write step pays for it."
faq:
  - q: "What is the difference between Prompt Builder and an Agentforce agent?"
    a: "Prompt Builder creates reusable prompt templates that a button, a Flow, Apex or an agent calls for one generation step. An Agentforce agent decides at runtime which action to run, holds a conversation and changes records only through predefined actions."
  - q: "Can an Agentforce agent use a prompt template?"
    a: "Yes. A prompt template can be the reference action behind a custom agent action, next to Flow and Apex. Salesforce describes Flow and Apex actions as deterministic and prompt template actions as involving a degree of randomness."
  - q: "What does a prompt template cost per call?"
    a: "Salesforce meters prompts per call to the LLM gateway in units of up to 2,000 tokens, rounded up. A unit costs 2 credits on Basic, 4 on Standard and 16 on Advanced models. At $500 per 100,000 credits, a 5,000-token summary on a Standard model costs $0.06."
  - q: "Is a prompt template billed again when an agent calls it?"
    a: "The Salesforce help article on billable usage types does not say whether a prompt template called as an agent action counts as one action plus its prompts. I budget both and compare with the actual consumption in the pilot."
  - q: "How do I test a prompt template compared with an agent?"
    a: "Agent tests run only in sandboxes, consume credits and can modify data. For templates, Salesforce announced batch prompt testing at Dreamforce 2026 as a beta that runs one template against many real inputs in one pass."
draft: false
---

Prompt Builder or Agentforce agent: a template is enough when one record goes in, one text comes out and a person reads it before anything happens. Service report texts, case summaries, dealer reply drafts and a nightly warranty summary fit that pattern. You need an agent when the system chooses its next step, answers a dealer without a person in between or writes records. A Standard prompt costs 4 Flex Credits per 2,000 tokens, an agent action 20 credits before any prompt. I start with the template and add the agent only where the dialogue pays for it.

## What is the difference between a prompt template and an agent?

[Prompt Builder](https://trailhead.salesforce.com/content/learn/modules/prompt-builder-basics/get-to-know-prompt-builder) creates reusable prompt templates. Trailhead lists four types: Sales Email, Field Generation, Record Summary and Flex for everything else. A template reads Salesforce data through merge fields, Flow, Data 360 or Apex, and the resolved prompt passes the Einstein Trust Layer, which masks sensitive data. A template is called from outside: an Einstein button next to a field on the record page, an [invocable action in Flow, Apex or the Connect REST API](https://developer.salesforce.com/blogs/2024/04/invoke-prompt-templates-from-flow-apex-or-the-rest-api).

An agent decides for itself which action comes next. According to [Trailhead on agent customisation](https://trailhead.salesforce.com/content/learn/modules/agent-customization-quick-look/customize-your-agents), an agent can read data but "can't change records without a predefined agent action". Actions are built on Flow, Apex or a prompt template. Salesforce calls Flow and Apex actions deterministic and says a prompt template action "involves a degree of randomness".

So the real question is who decides the next step. With a template, your process decides: the technician presses the button, the Flow runs at 2 a.m. With an agent, the language model decides within limits you design, as described in [Agent Script instead of LLM judgement](../agent-script-deterministic-rules/).

## Which manufacturing tasks does a template cover?

Four typical tasks in after-sales service work well with a template:

- **Service report text.** The technician's notes and the parts used on the work order become a readable text for the customer. A Field Generation template writes into a long text field, and [Trailhead](https://trailhead.salesforce.com/content/learn/modules/prompt-builder-basics/build-a-field-generation-prompt-template) notes that read-only fields are not supported. The technician corrects the text before the report goes out.
- **Case summary.** A Record Summary template condenses a case with its emails and history when second level support or field service takes over. The reader is a colleague who knows the machine.
- **Dealer reply draft.** A Sales Email or Flex template drafts the answer to a dealer's question about a spare part or a delivery date. The service rep checks it and sends it.
- **Nightly summary of open warranty claims.** Salesforce's [developer blog of October 2025](https://developer.salesforce.com/blogs/2025/10/build-and-optimize-agents-with-new-agentforce-360-features) lists batch processing for Winter '26: up to 1,000 prompts run asynchronously, started from Flow or through an `AiJobRun` record in Apex. The same post adds JSON output with syntax checks, so the result can go straight into fields. The warranty reviewer starts the morning with a short status per claim. The process behind it is in [warranty claims from dealers](../warranty-claims-dealers-salesforce/).

The blog marks only Prompt Builder itself as GA, so check the release notes for your org before you plan the batch.

All four share one shape: a known input, one generation step and a person who reads the result. The text itself orders, books or credits nothing.

## When do you need an agent with actions?

I would only build an agent when at least one of these conditions holds:

1. **Nobody reads the answer first.** A dealer asks in the portal at 10 p.m. and the reply goes out directly, so you need guardrails, tests and an escalation path.
2. **The order of steps depends on the answer.** Identify the dealer, check the entitlement, read the order status from SAP, offer an alternative part. A Flow can do that when the path is fixed; an agent is useful when the dealer's question decides the path.
3. **Something has to be written.** Creating a case, booking a field service appointment or placing a spare parts order is an action.
4. **The conversation has several turns.** Follow-up questions such as "and the seal kit?" need context across messages.

If none of these applies, the agent adds cost and test effort without adding value. One SAP lookup plus one text is a Flow that calls a template.

## What does a prompt cost compared with an agent action?

Salesforce meters prompts per call to the LLM gateway. According to the [help article on billable usage types](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5), each prompt covers up to 2,000 tokens of input and output, rounded up, so 6,500 tokens count as four prompts. The [rate card of 31 August 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-08.31.2026.pdf) prices them by model tier, and the [model support page](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm&type=5) assigns the models:

| Meter | Credits | Example models | USD at list price |
|---|---|---|---|
| Basic prompt | 2 | GPT-5 Mini | $0.01 |
| Standard prompt | 4 | Claude Haiku 4.5, Claude Sonnet 4.6, Claude Sonnet 5, GPT-5 | $0.02 |
| Advanced prompt | 16 | Claude Opus 4.8, GPT 5.5 | $0.08 |
| Agent action | 20 (sandbox 16) | | $0.10 |

The dollar values use the $500 per 100,000 credits from the [Flex Credits announcement](https://www.salesforce.com/news/press-releases/2025/05/15/agentforce-flexible-pricing-news/). Prompts cost the same in the sandbox as in production.

A 5,000-token case summary on a Standard model is three prompts, 12 credits. On an Advanced model the same summary costs 48 credits, more than two agent actions. What makes a template cheap is the model tier you choose.

The help article says nothing about whether a prompt template called as an agent action counts as one action plus its prompts. I budget both until the pilot shows the actual consumption. All other meters are in [Flex Credits per action](../flex-credits-agentforce-cost-per-action/).

## A typical scenario: templates first, then the dealer agent

Assume a machine builder with Service Cloud, Field Service, a dealer portal and SAP. All volumes are assumptions, priced on a Standard model:

| Task per month | Assumption | Credits |
|---|---|---|
| Case summaries | 2,000 × 5,000 tokens = 3 prompts × 4 | 24,000 |
| Dealer reply drafts | 1,500 × 3,000 tokens = 2 prompts × 4 | 12,000 |
| Service report texts | 600 × 4,000 tokens = 2 prompts × 4 | 4,800 |
| Warranty batch | 80 changed claims × 20 nights × 2 prompts × 4 | 12,800 |
| **Templates total** | | **53,600, about $268** |

The head of service now wants dealers to get answers in the portal without a rep. Assume the agent runs four actions per conversation and calls the reply template once with two prompts. 1,500 conversations then cost 1,500 × (80 + 8) = 132,000 credits, about $660 a month. That is eleven times the $60 for the drafts.

A test suite of 100 conversations with four actions at 16 credits and two prompts each costs 7,200 credits per run. Ten runs before go-live are 72,000 credits, about $360.

The agent is worth it if it saves more rep time than the extra $600 a month and the tests cost, for example when dealers in other time zones wait until the next morning today. If reps answer within the hour anyway, I would keep the drafts. The full calculation for an order status agent is in [what a dealer service agent costs](../dealer-service-agent-cost-calculation/).

## How do testing and governance differ?

A template has one input and one output, so you test it with real records. Salesforce announced at [Dreamforce 2026](https://www.salesforce.com/blog/dreamforce-2026-announcements/) batch prompt testing, which runs a template against many real inputs in one pass, as a beta. Reference visibility is GA and shows every Flow and action that depends on a template before you change it. Templates are metadata of the type [GenAiPromptTemplate](https://developer.salesforce.com/docs/atlas.en-us.252.0.api_meta.meta/api_meta/meta_genaiprompttemplate.htm), so they belong in the repository and go through the pipeline like a Flow.

An agent needs more. [Agent tests run only in sandboxes](https://developer.salesforce.com/docs/ai/agentforce/guide/testing-api-get-started.html), and Salesforce warns that "running tests consumes requests and credits and can modify data". You test action choice and answers, define pass rates and decide which user the agent runs as, as described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/). For a draft that a rep corrects anyway, this effort is out of proportion.

A Flex template also works outside Salesforce. [Hosted MCP servers](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/prompt-builder.html) publish it as an MCP prompt that a user picks in Claude or Cursor, with the user's permissions and the same credit consumption as in the Salesforce UI. ChatGPT does not support MCP prompts, according to that page.

## Where should you start?

1. **List the text tasks** in service and sales with volume and reader.
2. **Build templates** for the tasks where a person reads the text. Start on a Standard model and switch only if tests show a quality gap.
3. **Measure how much people edit.** If the reps send most drafts unchanged, that is the argument for the next step.
4. **Add an agent** only where nobody should have to read first, where the path varies or where something must be written. Reuse the tested template as the agent's reference action.

Which tool fits which job across the Salesforce platform is in the masterclass chapter on [Salesforce AI development tools](../../masterclass/ai-salesforce/salesforce-ai-development-tools/), and this kind of decision is part of my [Salesforce architecture work](../../services/salesforce-architecture/).

For the four text tasks above a template does the job, and an agent earns its higher price only where it answers or acts without a person in between. If you want a second opinion on which of your use cases needs which, [send me a message](#contact).
