---
title: "Einstein Trust Layer: what it protects in Agentforce"
metaTitle: "Einstein Trust Layer in Agentforce: masking is disabled"
description: "Agentforce agents send data to the LLM unmasked. What the Einstein Trust Layer still covers and how to protect dealer prices, contracts and personal data."
pubDate: 2026-10-27
updatedDate: 2026-11-09
lang: en
slug: einstein-trust-layer-what-it-protects
translationKey: einstein-trust-layer-explained
topic: security
categories: [ai, architecture]
tags: [einstein trust layer, agentforce, data masking, security, manufacturing]
takeaways:
  - "In an Agentforce agent the Einstein Trust Layer protects mainly through zero data retention agreements, toxicity scoring and an audit trail in Data 360."
  - "Salesforce disabled pattern-based and field-based masking for agents, including for prompt templates an agent calls as an action."
  - "In an agent, only permissions and actions protect dealer prices and terms. Outside agents, field-based masking can help."
  - "The audit trail stores the prompt text in Data 360, which makes it a sensitive data store of its own that needs access rules and a retention period."
  - "With hosted MCP, the tool type matters: agents and prompt templates run under the Trust Layer, while data from direct tools falls under your AI contract."
faq:
  - q: "Does the Einstein Trust Layer mask personal data in Agentforce agents?"
    a: "No. According to Salesforce Help, pattern-based and field-based data masking for LLMs is disabled for agents. It still applies to Prompt Builder templates used directly and embedded features such as Einstein Service Replies. Check the audit trail of your own org to see what reaches the model."
  - q: "What does zero data retention mean for Agentforce?"
    a: "Salesforce has agreements with its LLM partners that they do not store prompts or responses. Trailhead states that no customer data, including prompt text and generated responses, is stored outside of Salesforce."
  - q: "Does the Trust Layer stop prompt injection?"
    a: "Salesforce lists security guardrails against prompt injection among its Agentforce guardrails but does not say how complete they are. I would treat them as one layer alongside narrow permissions and actions that return only the fields the agent needs."
  - q: "Does a Prompt Builder template still mask data when an agent calls it?"
    a: "No. Salesforce Help says masking follows the Trust Layer configuration when a template is used directly, for example in Service Replies, but is disabled when the template is called through an agent action."
  - q: "What does the Einstein Trust Layer audit trail record?"
    a: "According to Trailhead, it stores the prompt ID and user, the prompt text and the PII-masked prompt, safety and toxicity scores and user feedback, all in Data 360. That makes the audit trail itself sensitive data: define access and retention before go-live."
draft: false
---

The Einstein Trust Layer protects an Agentforce agent mainly through contracts, scoring and logging. Zero data retention agreements keep Salesforce's model partners from storing prompts, toxicity scoring flags harmful answers, and an audit trail records prompts and scores in Data 360. Data masking, the feature most people associate with it, is disabled for agents according to Salesforce, so values an agent retrieves reach the model unmasked. So dealer prices, contract terms and personal data in an agent are protected by the agent's permissions, the actions you build and the model you choose. That is where a manufacturer has to do the configuration work.

## What does the Einstein Trust Layer do in an Agentforce agent?

Salesforce's [developer documentation](https://developer.salesforce.com/docs/ai/agentforce/guide/trust.html) lists five components: grounding in CRM data, masking of sensitive data, toxicity detection, an audit trail with feedback, and zero data retention agreements with third-party LLM partners. For an agent they do the following:

- **Zero data retention.** The LLM partner is contractually bound not to keep prompts or responses. Trailhead's [response journey](https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer/follow-the-response-journey) puts it this way: "no customer data including the prompt text and generated responses are stored outside of Salesforce."
- **Toxicity detection.** The same unit describes a score from 0 to 1 across categories such as violence, hate and profanity, returned with the response. Salesforce's [guardrails unit](https://trailhead.salesforce.com/content/learn/modules/trusted-agentic-ai/explore-agentforce-guardrails-and-trust-patterns) says: "Potentially harmful LLM responses are detected and flagged."
- **Audit trail.** According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/data-cloud-powered-agentforce/enable-trusted-agents-with-data-cloud), it holds prompt ID and user, "Prompt text and PII-masked prompt", safety and toxicity scores and user feedback. "This data is stored and analyzed in Data 360." Pre-built dashboards cover masking, toxicity, user trends and acceptance rates.
- **Grounding.** Selected CRM records and Data 360 content are added to the prompt so the model can base its answer on them. That improves relevance but does not guarantee a correct answer.

Notice what is missing from that list: anything that decides which records an agent may read. Retrieval respects existing permissions, but it does not define them. They come from the agent's user.

```tabelle
title: Einstein Trust Layer at a glance
columns: Component | Prompt template used directly | Agentforce agent
Grounding | Adds CRM and Data 360 data to the prompt | Active; reads only what the agent user may see
Data masking | Configurable per data type | Disabled *
Zero data retention | Contract with the LLM partners | Active
Toxicity detection | Score from 0 to 1 per response | Active
Audit trail | Prompt, masked prompt, scores and feedback in Data 360 | Active once enabled; stores the prompt text
note: As of November 2026, according to Salesforce Help and Trailhead. Check the masking state in the audit trail of your own org.
```

```vertiefung For admins
title: Which user does an agent read data as?
A service agent runs as its own agent user; in the [Trailhead example](https://trailhead.salesforce.com/content/learn/modules/programmatic-instructions-in-agentforce/give-your-agent-more-information-with-flows-actions-and-permissions), read access to a custom field has to be granted explicitly in the "Service Agent Permissions" permission set. Employee agents, according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-employees-quick-look/get-started-with-agentforce-for-employees), are "logged in as the person they're helping" and follow that user's permissions.
```

## Why is data masking switched off for agents?

Masking replaces sensitive values with placeholders before the prompt leaves Salesforce and restores them in the answer. For agents it is off. In a [Salesforce blog post from 10 June 2025](https://www.salesforce.com/blog/llm-data-masking/), Tejas Sanghavi, Senior Director of Product Management for Agentforce, writes: "Last year, we made the decision to disable data masking for Agentforce use cases." The reasons given: masking "adds latency and hinders the planner and action workflows", and "Many customers report accuracy degradation in agent responses when masking is enabled." The current Trailhead module [Meet the Einstein Trust Layer](https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer/meet-the-einstein-trust-layer) says the same: "Data masking for LLMs is currently disabled for agents." [Salesforce Help](https://help.salesforce.com/s/articleView?id=ai.agent_trust_data_masking.htm&language=en_US&type=5) is more precise: "pattern-based and field-based data masking for large language models (LLMs) is disabled for agents", and "When a prompt template is called through an agent action, data masking is disabled." A template keeps its masking only when it is used directly.

A Trailhead unit for [Marketing Cloud Next agents](https://trailhead.salesforce.com/content/learn/modules/conversational-marketing-fundamentals-for-marketing-cloud-next/secure-agents-with-the-einstein-trust-layer) still describes masking before the prompt is sent. I treat the Help article as the baseline and compare prompt text and masked prompt in the audit trail of your own org.

Outside Agentforce masking works "the same as it always has", according to the blog post. The [masking module](https://trailhead.salesforce.com/content/learn/modules/llm-data-masking-in-the-einstein-trust-layer/configure-llm-data-masking-policies) shows how it decides: name, email address, phone number, credit card and US social security number are masked by default, company name can be switched on, and formats are validated: "If an item isn't a valid value, it won't be masked." For a manufacturer, the important point is what follows from that list.

```hinweis achtung
A dealer net price, a 3 percent rebate or "payment 60 days net" matches none of these patterns. Outside agents, field-based masking can still protect a price or contract field that is classified through data classification or Shield encryption. In an agent, neither kind of masking applies.
```

## The limits of the Trust Layer

Four limits matter for an architecture decision.

**The checks are probabilistic.** Masking relies on detection models that work with patterns and context, and the [Models API documentation](https://developer.salesforce.com/docs/einstein/genai/guide/data-masking.html) says plainly that "no model can guarantee 100% accuracy" and that "cross-region and multi-country use cases can affect the ability to detect specific data patterns." A dealer network across many countries is exactly such a case. Toxicity is a score, not a verdict. Salesforce's guardrails unit lists prompt injection under Agentforce guardrails rather than among the Trust Layer features. I cover how far those guardrails reach into text read from records in [prompt injection in dealer portals](/en/blog/prompt-injection-dealer-portals-agentforce/).

**Masking costs context.** The [Supported Models page](https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html) states: "All models are currently limited to a context size of 65,536 tokens when data masking is turned on". A Prompt Builder template that summarizes a long service contract or ten years of machine history can hit that limit. When to use a template and when an agent is covered in [Prompt Builder or Agentforce agent](/en/blog/prompt-builder-or-agentforce-agent/).

**Where the model runs is a separate question.** The same page says "Anthropic and Amazon models are operated on Amazon Bedrock infrastructure entirely within the Salesforce Trust Boundary", while other models run with Salesforce partners "inside a shared trust zone". With bring your own LLM, "Trust Layer features are fully supported", but inference is handled by your provider. As I read it, the retention terms then come from your contract with that provider, not from Salesforce's partner agreements. Regions and data residency are the topic of [Agentforce EU data residency](/en/blog/agentforce-eu-data-residency-models/).

**External models depend on the tool.** When Claude or ChatGPT calls an Agentforce agent or a prompt template through [hosted MCP](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/agentforce.html), Salesforce runs it on its side and "Einstein Trust Layer policies apply"; the external model then receives the result. When it calls record or query tools directly, Salesforce makes no LLM call, so there is no point at which the Trust Layer could act, and the data enters the external model under your contract with that provider. I explain that path in [hosted MCP servers and data access](/en/blog/salesforce-hosted-mcp-servers-data-access/).

```hinweis achtung
The audit trail itself stores the prompt text. Whatever an agent puts into a prompt, including prices and personal data, ends up in Data 360 objects. The Trailhead units I read do not state a retention period, so that decision is yours; it also affects the logging duties described in [EU AI Act deadlines for Agentforce](/en/blog/eu-ai-act-deadlines-agentforce/).
```

## Worked example: a dealer agent with net prices

Assume a machine builder with 60 dealers in 14 countries, Service Cloud, a dealer portal on Experience Cloud and SAP as the source for prices and stock. All numbers are assumptions. A service agent in the portal should answer questions about spare part availability and the dealer's own net price; an employee agent should help 15 key account managers prepare dealer reviews.

What the Trust Layer contributes here: the model provider keeps no prompts, harmful answers are flagged, and conversations can be logged, depending on the audit and session tracing features you enable. What it does not contribute is masking of the net price, because masking is disabled for agents, or any check that prevents dealer A from seeing dealer B's price.

So protection has to come from the design:

- **Agent user.** The service agent's permission set gets read access to part number, description and availability. It gets no access to the price agreement object.
- **Price action.** A Flow calls SAP with the dealer account taken from the logged-in portal user, never from text the model produced, and returns one price for one part. The pattern of keeping such decisions in code is described in [Agent Script rules instead of LLM judgment](/en/blog/agent-script-deterministic-rules/).
- **Contract terms.** Payment terms and liability caps stay out of the agent. A question about them is handed over to the key account manager.
- **Employee agent.** It inherits the key account managers' rights, so their field-level security on margin fields is reviewed before go-live.
- **Audit trail.** Read access to the audit data in Data 360 is limited to three named people, with a retention period agreed with data protection.

In my judgment this is the normal division of labor: the Trust Layer handles the model provider, your design handles who sees what.

## Configure masking, agent users and actions

1. **Check the masking state per feature.** Agents: assume off and verify in the audit trail. Prompt Builder and embedded features: decide in Einstein Trust Layer setup which data types to mask, including company name.
2. **Cut the agent user to the minimum.** Each service agent gets its own execution user with a minimal, reviewable permission set assignment, and no access to price, margin or contract fields unless an action needs them. Share permission sets only where agents really need the same access.
3. **Review the users behind employee agents.** Field-level security on prices, rebates and technicians' personal data determines what reaches the model.
4. **Build narrow actions.** Each action returns the fields the answer needs, and identity comes from the session, not from the prompt.
5. **Choose the model consciously.** Bedrock-hosted models inside the trust boundary, partner models in a shared trust zone, or your own contract with bring your own LLM.
6. **Treat the audit trail as sensitive data.** Access, retention and deletion are defined before go-live; the same applies to session tracing data if you enable it.
7. **Check languages.** Salesforce tells developers to verify that each language and locale is supported in the Trust Layer; do it for every dealer country.
8. **Watch the dashboards.** Toxicity and masking dashboards belong in the weekly review of a new agent.

This configuration is part of my work on [Salesforce architecture](/en/services/salesforce-architecture/), because the decisions are made in the data model and permissions, not in the agent prompt. What the Trust Layer itself still gives an agent is mainly that the model provider does not store your data.
