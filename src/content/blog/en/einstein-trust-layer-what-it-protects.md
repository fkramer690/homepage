---
title: "Einstein Trust Layer: what it protects in Agentforce"
description: "What the Einstein Trust Layer does in an Agentforce agent, why masking is off for agents, and what manufacturers should set up for prices and personal data."
pubDate: 2026-10-27
lang: en
slug: einstein-trust-layer-what-it-protects
translationKey: einstein-trust-layer-explained
topic: security
categories: [ai, architecture]
tags: [einstein trust layer, agentforce, data masking, security, manufacturing]
takeaways:
  - "In an Agentforce agent the Einstein Trust Layer protects mainly through zero data retention agreements, toxicity scoring and an audit trail in Data 360."
  - "Salesforce disabled data masking for Agentforce use cases because it added latency and hurt accuracy; masking still works for Prompt Builder and embedded features."
  - "Masking only detects patterns such as names, email addresses, phone and card numbers; dealer prices and contract terms are never masked, so permissions and action design have to protect them."
  - "The audit trail stores the prompt text in Data 360, which makes it a sensitive data store of its own that needs access rules and a retention period."
  - "The Trust Layer covers LLM calls that Salesforce makes; an external model reading CRM data through MCP falls under your contract with that AI provider."
faq:
  - q: "Does the Einstein Trust Layer mask personal data in Agentforce agents?"
    a: "According to Salesforce's Trailhead module and a June 2025 Salesforce blog post, data masking is disabled for agents. It still applies to Prompt Builder templates and embedded features such as Einstein Service Replies. Check the audit trail of your own org to see what reaches the model."
  - q: "What does zero data retention mean for Agentforce?"
    a: "Salesforce has agreements with its LLM partners that they do not store prompts or responses. Trailhead states that no customer data, including prompt text and generated responses, is stored outside of Salesforce."
  - q: "Does the Trust Layer stop prompt injection?"
    a: "Salesforce lists security guardrails against prompt injection among its Agentforce guardrails but does not say how complete they are. I would treat them as one layer next to narrow permissions and actions that return only the fields the agent needs."
  - q: "Why is the context limited to 65,536 tokens?"
    a: "Salesforce limits all models to 65,536 tokens when data masking is turned on in the Trust Layer. Turning masking off restores the full context window, which matters for prompt templates that summarise long contracts or service histories."
draft: false
---

The Einstein Trust Layer protects an Agentforce agent mainly through contracts, scoring and logging. Zero data retention agreements keep Salesforce's model partners from storing prompts, toxicity scoring flags harmful answers, and an audit trail records prompts and scores in Data 360. Data masking, the feature most people associate with it, is disabled for agents according to Salesforce. So dealer prices, contract terms and personal data in an agent are protected by the agent's permissions, the actions you build and the model you choose. That is where a manufacturer has to do the configuration work.

## What does the Einstein Trust Layer do in an Agentforce agent?

Salesforce's [developer documentation](https://developer.salesforce.com/docs/ai/agentforce/guide/trust.html) lists five components: grounding in CRM data, masking of sensitive data, toxicity detection, an audit trail with feedback, and zero data retention agreements with third-party LLM partners. For an agent they do the following:

- **Zero data retention.** The LLM partner is contractually bound not to keep prompts or responses. Trailhead's [response journey](https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer/follow-the-response-journey) puts it this way: "no customer data including the prompt text and generated responses are stored outside of Salesforce."
- **Toxicity detection.** The same unit describes a score from 0 to 1 across categories such as violence, hate and profanity, returned with the response. Salesforce's [guardrails unit](https://trailhead.salesforce.com/content/learn/modules/trusted-agentic-ai/explore-agentforce-guardrails-and-trust-patterns) says: "Potentially harmful LLM responses are detected and flagged."
- **Audit trail.** According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/data-cloud-powered-agentforce/enable-trusted-agents-with-data-cloud), it holds prompt ID and user, "Prompt text and PII-masked prompt", safety and toxicity scores and user feedback. "This data is stored and analyzed in Data 360." Pre-built dashboards cover masking, toxicity, user trends and acceptance rates.
- **Grounding.** Answers are built from CRM records and Data 360 content instead of the model's general knowledge.

Notice what is missing from that list: anything that decides which records an agent may read. That comes from the agent's user. A service agent runs as its own agent user; the [Trailhead example](https://trailhead.salesforce.com/content/learn/modules/programmatic-instructions-in-agentforce/give-your-agent-more-information-with-flows-actions-and-permissions) has to grant read access to a custom field explicitly in the "Service Agent Permissions" permission set. Employee agents, according to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/agentforce-for-employees-quick-look/get-started-with-agentforce-for-employees), are "logged in as the person they're helping" and follow that user's permissions.

## Why is data masking switched off for agents?

Masking replaces sensitive values with placeholders before the prompt leaves Salesforce and restores them in the answer. For agents it is off. In a [Salesforce blog post from 10 June 2025](https://www.salesforce.com/blog/llm-data-masking/), Tejas Sanghavi, Senior Director of Product Management for Agentforce, writes: "Last year, we made the decision to disable data masking for Agentforce use cases." The reasons given: masking "adds latency and hinders the planner and action workflows", and "Many customers report accuracy degradation in agent responses when masking is enabled." The current Trailhead module [Meet the Einstein Trust Layer](https://trailhead.salesforce.com/content/learn/modules/the-einstein-trust-layer/meet-the-einstein-trust-layer) says the same: "Data masking for LLMs is currently disabled for agents."

The documentation is not consistent. A Trailhead unit for [Marketing Cloud Next agents](https://trailhead.salesforce.com/content/learn/modules/conversational-marketing-fundamentals-for-marketing-cloud-next/secure-agents-with-the-einstein-trust-layer) describes masking before the prompt is sent. I would not rely on either statement and would compare prompt text and masked prompt in the audit trail of your own org.

Outside Agentforce masking works "the same as it always has", according to the blog post. The [masking module](https://trailhead.salesforce.com/content/learn/modules/llm-data-masking-in-the-einstein-trust-layer/configure-llm-data-masking-policies) shows how it decides: name, email address, phone number, credit card and US social security number are masked by default, company name can be switched on, and formats are validated: "If an item isn't a valid value, it won't be masked." For a manufacturer the important point follows from that list. A dealer net price, a 3 percent rebate or "payment 60 days net" matches none of these patterns. Even where masking is on, it never protects commercial data.

## Where does the Trust Layer stop?

Four limits matter for an architecture decision.

**The checks are probabilistic.** Masking uses pattern matching and machine learning, and the [Models API documentation](https://developer.salesforce.com/docs/einstein/genai/guide/data-masking.html) says plainly that "no model can guarantee 100% accuracy" and that "cross-region and multi-country use cases can affect the ability to detect specific data patterns." A dealer network across many countries is exactly such a case. Toxicity is a score, not a verdict. Salesforce's guardrails unit lists prompt injection under Agentforce guardrails rather than among the Trust Layer features, and how far it reaches into text read from records is covered in [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

**Masking costs context.** The [Supported Models page](https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html) states: "All models are currently limited to a context size of 65,536 tokens when data masking is turned on". A Prompt Builder template that summarises a long service contract or ten years of machine history can hit that limit. When to use a template and when an agent is covered in [Prompt Builder or Agentforce agent](../prompt-builder-or-agentforce-agent/).

**Where the model runs is a separate question.** The same page says "Anthropic and Amazon models are operated on Amazon Bedrock infrastructure entirely within the Salesforce Trust Boundary", while other models run with Salesforce partners "inside a shared trust zone". With bring your own LLM, "Trust Layer features are fully supported", but inference is handled by your provider. As I read it, the retention terms then come from your contract with that provider, not from Salesforce's partner agreements. Regions and data residency are the topic of [Agentforce EU data residency](../agentforce-eu-data-residency-models/).

**External models are outside.** When Claude or ChatGPT reads CRM data through hosted MCP, Salesforce makes no LLM call, so the Trust Layer has no step where it could act. I explain that path in [hosted MCP servers and data access](../salesforce-hosted-mcp-servers-data-access/).

One more point is easy to miss: the audit trail itself stores the prompt text. Whatever an agent puts into a prompt, including prices and personal data, ends up in Data 360 objects. The Trailhead units I read state no retention period, so that decision is yours, and it touches the logging duties described in [EU AI Act deadlines for Agentforce](../eu-ai-act-deadlines-agentforce/).

## A typical scenario: a dealer agent with net prices

Assume a machine builder with 60 dealers in 14 countries, Service Cloud, a dealer portal on Experience Cloud and SAP as the source for prices and stock. All numbers are assumptions. A service agent in the portal should answer spare part availability and the dealer's own net price; an employee agent should help 15 key account managers prepare dealer reviews.

What the Trust Layer contributes here: the model provider keeps no prompts, harmful answers are flagged, and every conversation is logged. What it does not contribute: masking of the net price, which would not match a pattern anyway, or any check whether dealer A sees dealer B's price.

So the design carries the protection:

- **Agent user.** The service agent's permission set gets read access to part number, description and availability. It gets no access to the price agreement object.
- **Price action.** A Flow calls SAP with the dealer account taken from the logged-in portal user, never from text the model produced, and returns one price for one part. The pattern of keeping such decisions in code is described in [Agent Script rules instead of LLM judgement](../agent-script-deterministic-rules/).
- **Contract terms.** Payment terms and liability caps stay out of the agent. A question about them gets a handover to the key account manager.
- **Employee agent.** It inherits the key account managers' rights, so their field-level security on margin fields is reviewed before go-live.
- **Audit trail.** Read access to the audit data in Data 360 goes to three named people, with a retention period agreed with data protection.

In my judgement this is the normal division of labour: the Trust Layer handles the model provider, your design handles who sees what.

## What should a manufacturer configure?

1. **Check the masking state per feature.** Agents: assume off and verify in the audit trail. Prompt Builder and embedded features: decide in Einstein Trust Layer setup which data types to mask, including company name.
2. **Cut the agent user to the minimum.** One permission set per service agent, no price, margin or contract fields unless an action needs them.
3. **Review the users behind employee agents.** Field-level security on prices, rebates and personal data of technicians decides what reaches the model.
4. **Build narrow actions.** Each action returns the fields the answer needs, and identity comes from the session, not from the prompt.
5. **Choose the model consciously.** Bedrock-hosted models inside the trust boundary, partner models in a shared trust zone, or your own contract with bring your own LLM.
6. **Treat the audit trail as sensitive data.** Access, retention and deletion are settled before go-live.
7. **Check languages.** Salesforce tells developers to verify that each language and locale is supported in the Trust Layer; do it for every dealer country.
8. **Watch the dashboards.** Toxicity and masking dashboards belong in the weekly review of a new agent.

This configuration is part of my work on [Salesforce architecture](../../services/salesforce-architecture/), because the decisions sit in the data model and permissions, not in the agent prompt.

The Einstein Trust Layer keeps your data away from the model provider's storage, and everything else depends on permissions and action design you control. If you want a second view on an agent before it reads dealer prices, [send me a message](#contact).
