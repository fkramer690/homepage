---
title: "Agentforce LLM choice: default, Claude or your own model"
description: "Which LLM should run your Agentforce agent? Salesforce Default, a pinned Claude, GPT or Gemini model per subagent, or BYOLLM with your own Azure contract."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: agentforce-llm-choice-bring-your-own
translationKey: agentforce-llm-choice-byollm
topic: ai
categories: [ai, architecture]
tags: [agentforce, llm, byollm, model choice, architecture, manufacturing]
takeaways:
  - "The org default is Salesforce Default, a managed mix that still includes GPT-4o, which Salesforce plans to deprecate in Spring 2027."
  - "Agent Script pins a model per agent, subagent and router; Salesforce names GPT 4.1, Claude Haiku 4.5 and Gemini 3.5 Flash as tested with agents."
  - "Each 2,000 tokens of input and output cost 2 Flex Credits on Basic, 4 on Standard, 16 on Advanced and 2 on your own model, plus your provider's bill."
  - "With BYOLLM the request still runs through the Trust Layer; only the inference runs at your provider, under your own contract."
  - "Since October 2026 Salesforce lists Claude Opus 5.5, Sonnet 5.5 and GPT-6 models. They roll out per org, so check what your org actually offers."
faq:
  - q: "Which LLM does Agentforce use by default?"
    a: "The default option is Salesforce Default, which the Supported Models page describes as a managed mix of trusted models that currently includes GPT-4o. Salesforce decides what is in the mix, so pin a model per agent or subagent. A pin protects you from changes to the default, not from Salesforce rerouting a deprecated model."
  - q: "Can I use a different model for each subagent?"
    a: "Yes. In Agent Script you set model_config at agent level, inside a subagent or on the agent router. A subagent model overrides the agent model, which overrides the org default set in Setup."
  - q: "Can I use my existing Azure OpenAI contract with Agentforce?"
    a: "Yes, through bring your own LLM, which supports Amazon Bedrock, Azure OpenAI, OpenAI and Vertex AI with your own credentials. Salesforce documents it for prompt templates, the Models API and custom actions; confirm in writing before you plan it as the agent's reasoning model."
  - q: "Is a bring your own LLM model cheaper in Flex Credits?"
    a: "Per prompt, yes: Starter prompts for your own model cost 2 credits per 2,000 tokens, against 4 on a Standard managed model. Your provider then bills the tokens under your own contract, so the total is rarely much lower."
  - q: "Is Claude Opus 5.5 available in Agentforce?"
    a: "Yes. According to the release note it is generally available, rolling out from the week of 12 October 2026 to orgs on Winter '27 in Enterprise, Performance and Unlimited Edition with Foundations or Agentforce 1. Because the rollout is rolling, check your own org before you plan with it."
draft: false
---

For most manufacturers, the right Agentforce LLM choice is a pinned Salesforce-managed model per subagent, chosen from the few models Salesforce has tested with agents, with a more expensive model only where tests show a quality gap. Salesforce Default is a managed mix you do not control. Bring your own LLM, for example through an existing Azure OpenAI contract, fits prompt templates and custom actions, costs fewer Flex Credits per prompt and puts the provider-side inference under your own contract. New models roll out per org, so check your org's list before you plan with one.

## Which models can an Agentforce agent use today?

The [Supported Models page](https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html), which carries no update date, lists three groups:

- **Salesforce Default**, "a managed mix of trusted models" that currently includes GPT-4o. You change the org default on the Agentforce Agents page in Setup.
- **Salesforce-managed models** (as of 9 November 2026): Claude Haiku 4.5 up to Haiku 5.5, Sonnet 5.5 and Opus 5.5, Amazon Nova and NVIDIA Nemotron 3 (Beta) on Bedrock; GPT-4o up to GPT 5.6, GPT-6 Luna, Sol and Astra and GPT-6.1 Sol from OpenAI and Azure OpenAI; Gemini 3 Flash up to 3.8 Flash and Gemini 3.1 Pro (Beta) on Vertex AI.
- **Bring your own LLM (BYOLLM)**: your own account at Amazon Bedrock, Azure OpenAI, OpenAI or Vertex AI, or any model behind the LLM Open Connector.

Anthropic and Amazon models run on Bedrock "entirely within the Salesforce Trust Boundary", other managed models "inside a shared trust zone" with Salesforce's partners. What that means for masking and logging is covered in [what the Einstein Trust Layer protects](../einstein-trust-layer-what-it-protects/).

The [Claudeforce press release of 27 August 2026](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) names Claude as "a reasoning model for the Atlas Reasoning Engine" and "available in Agent Builder". It does not call Claude the default for agents, and the developer documentation still names GPT-4o in the default mix. Salesforce's own CRM reasoning model Koa is, according to the [announcement of 15 September 2026](https://investor.salesforce.com/news/news-details/2026/Announcing-Koa-Salesforces-First-CRM-Reasoning-Model-Built-on-NVIDIA-Nemotron/default.aspx), in pilot, with general availability "expected Winter 2026 in U.S. regions". For a German machine builder planning now, Koa is not yet an option.

## Pin the model per agent and subagent

According to the [model configuration guide](https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-model.html), every agent uses the org default unless Agent Script sets `model_config`: for the whole agent, inside a single subagent, or on the agent router that picks the subagent. A subagent model overrides the agent model.

Salesforce names three models as "thoroughly tested with agents": GPT 4.1, Claude Haiku 4.5 and Gemini 3.5 Flash. For routing, new agents from the Agentforce Service agent template use EinsteinHyperClassifier, a Salesforce model that only classifies and cannot call other tools.

I would pin a model even when the default works. Salesforce can change the mix, and an agent that passed its tests in May may answer differently in November without a change on your side. Defaults also move on their own: Salesforce [switches legacy builder agents from GPT-4o to GPT-5.6 Luna](https://help.salesforce.com/s/articleView?id=release-notes.rn_einstein_models_legacy_builder_model_change.htm&language=en_US&type=5) to prepare for the GPT-4o deprecation in Spring 2027. A pinned model is part of the agent version, so a model change goes through the same gates as any other change, described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/).

## What does the model tier cost?

Salesforce assigns every managed model to a usage tier on its [model support page](https://help.salesforce.com/s/articleView?id=ai.generative_ai_large_language_model_support.htm&type=5). The [rate card updated as of 3 November 2026](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf) prices a prompt by tier and calls prompts to your own model "Starter Prompts". According to the [help article on billable usage](https://help.salesforce.com/s/articleView?language=en_US&id=ai.usage_flex_credits.htm&type=5), usage is counted in chunks of 2,000 tokens of input and output combined, rounded up. According to the rate card, these prompt meters apply to Agentforce 1, Agentforce for Sales, Service or Industries and other products that no longer use Einstein Requests, on top of the actions. At the [list price of $500 per 100,000 credits](https://www.salesforce.com/agentforce/pricing/), one Advanced prompt costs $0.08.

```kennzahlen
2 | Flex Credits per prompt on Basic
4 | Flex Credits per prompt on Standard
16 | Flex Credits per prompt on Advanced
2 | Flex Credits per Starter Prompt to your own model
source: Flex Credits rate card, updated as of 3 November 2026
```

The tested models fall into different tiers: Gemini 3.5 Flash is Basic, Claude Haiku 4.5 and GPT 4.1 are Standard. The Claude Opus models up to 4.8 and GPT 5.6 Sol are Advanced, so moving a subagent from Haiku to Opus multiplies its prompt cost by four.

That help article does not say whether the reasoning engine's own LLM calls are metered as prompts on top of the 20 credits per action. For prompt templates the tier applies for certain; for reasoning, I would measure it in the pilot with Digital Wallet. The full meter set is in [Flex Credits: estimating cost per action](../flex-credits-agentforce-cost-per-action/), the template side in [Prompt Builder or Agentforce agent](../prompt-builder-or-agentforce-agent/).

## When does bring your own LLM make sense?

BYOLLM connects a model from your own Bedrock, Azure OpenAI, OpenAI or Vertex AI account with your own credentials. The [LLM Open Connector](https://developer.salesforce.com/blogs/2024/10/build-generative-ai-solutions-with-llm-open-connector) accepts any model behind a REST endpoint that follows Salesforce's specification, including one you host. Your team then runs that endpoint. Three points decide whether it is worth it.

**Where it is documented.** The Supported Models page says custom actions that run prompt templates, Apex or the Models API "can use any Salesforce-managed or BYO model". The Agent Script guide only refers to models on the supported list and says nothing about BYO models for reasoning.

```hinweis offen
Whether a BYOLLM model may also run the agent's reasoning is something to get Salesforce to confirm in writing. Until then, I plan BYOLLM for template-based actions, such as a case summary, and keep the agent's reasoning on a managed model.
```

**Who is responsible for the data.** Trust Layer features are "fully supported" for BYOLLM, according to the Supported Models page. The contract side changes. Salesforce's [Agentforce privacy FAQ](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/legal/Privacy/agentforce-privacy-FAQ.pdf) (June 2025) states that its answers "do not apply to BYO LLM", that the provider is "a Non-SFDC Application" and that the customer must comply "with its own contract with the LLM provider". Retention, training use and region then follow your Azure or AWS agreement. If your IT has already negotiated that agreement, this can be the reason to use BYOLLM; for everyone else it is extra contract work. That is my reading of the documents, not legal advice.

**What it saves.** Starter prompts cost 2 credits instead of 4 on Standard, The Supported Models page also speaks of "30% fewer Einstein Requests", which is the older meter, not a second saving on top of the Flex Credits. Your provider bills the tokens on top.

## Check the model list in your org, not only the vendor's

Anthropic's [model overview](https://platform.claude.com/docs/en/about-claude/models/overview) and Salesforce's Supported Models page are two separate lists. Claude Opus 5.5 reached Agentforce as generally available from the week of 12 October 2026, on a rolling basis per org. I never build a business case on a model that is not on the Salesforce list and active in the org.

Models also leave. A deprecated model keeps working for a while and can then be rerouted to a replacement, for example Claude Sonnet 4 to Sonnet 4.6, or retired, as Gemini 3 Pro (Beta) was on 23 April 2026. The model page lists deprecation and reroute dates, and I found no stated notice period. A reroute is a model change your tests have not seen, so I test the replacement as soon as the deprecation is announced.

Region is the third check. Managed models "eventually re-route to a US region" when a request fails in the designated region, unless an admin turns on "Enable In-Region Model Requests Only", which covers "some models". The help page listed `eu` inference profiles for Claude Sonnet 5 and Opus 4.8, and only the United States for GPT 5.6 Terra. More in [Agentforce EU data residency](../agentforce-eu-data-residency-models/).

## Worked example: a service agent with an Azure OpenAI contract

Assume a machine builder with Service Cloud, Field Service, a dealer portal and SAP. Corporate IT has an Azure OpenAI contract and asks why Agentforce should not use it. All numbers are assumptions.

- **Router:** EinsteinHyperClassifier, as in the service template.
- **Order status** for dealers from SAP via MuleSoft: Gemini 3.5 Flash (Basic), because the answer is a lookup.
- **Warranty pre-check**, the rule itself in [Agent Script logic](../agent-script-deterministic-rules/): Claude Haiku 4.5 (Standard) reads serial number and fault description from free text.
- **Troubleshooting** from manuals for dealer technicians: Claude Haiku 4.5, tested against Opus 4.8 on 100 real fault descriptions before anyone pays for Advanced.

A prompt template also writes a case summary for the field service technician: 3,000 a month at about 5,000 tokens of input and output, three prompts each.

| Option for the summary | Prompt credits per month | Prompt cost |
|---|---|---|
| Managed Standard model | 3,000 × 3 × 4 = 36,000 | $180 |
| BYOLLM via Azure OpenAI (Starter) | 3,000 × 3 × 2 = 18,000 | $90 plus Azure tokens |
| Managed Advanced model | 3,000 × 3 × 16 = 144,000 | $720 |

The table shows prompt charges only. If an agent runs the summary as a custom action, each run adds 20 Flex Credits, 60,000 a month or $300, for every option. BYOLLM saves at most $90 a month, about $1,080 a year, before the Azure token bill. That alone does not justify a second contract path; the model tier moves four times as much. Here I would recommend managed models for the agent, BYOLLM only if the Azure agreement is IT's approved data path for service data, and Opus for troubleshooting only if the test shows a clear gap.

## Pin and document the model per subagent

1. **Pin the model** per agent and subagent in Agent Script.
2. **Start with a tested model** in the lowest tier that passes; upgrade a subagent only with test evidence.
3. **Check the region** of each model and decide on in-region only.
4. **Use BYOLLM with a reason**: an approved contract, a model Salesforce does not offer, or data rules that require your own provider.
5. **Check the model page and release notes regularly** and rerun the tests as soon as a deprecation is announced.
6. **Measure in Digital Wallet** whether reasoning calls show up as prompts.

I treat these decisions as [Salesforce architecture](../../services/salesforce-architecture/) work, next to data model and permissions. For each subagent I write down model, tier, region and test result, because every change touches cost, contracts and tests.
