---
title: "Agentforce EU data residency: where do models run?"
description: "Where Agentforce sends prompts with dealer data: Bedrock vs shared trust zone, geo-aware routing, the EU Operating Zone and what to get confirmed in writing."
pubDate: 2026-10-27
lang: en
slug: agentforce-eu-data-residency-models
translationKey: agentforce-eu-data-residency
topic: security
categories: [architecture, ai]
tags: [agentforce, data residency, gdpr, hyperforce, llm, manufacturing]
takeaways:
  - "Claude and Amazon models in Agentforce run on Amazon Bedrock inside the Salesforce trust boundary; other models run with partners in a shared trust zone or at the LLM provider directly."
  - "Salesforce's sub-processor list names OpenAI with the location United States and Microsoft Azure with European locations such as Germany, France and Sweden, so the model behind an agent decides where a prompt goes."
  - "Geo-aware routing sends LLM requests to a data center near your org's Data 360 region, but Salesforce publishes no list of models that stay in the EU, and for Agentforce Vibes it documents a US fallback."
  - "The Hyperforce EU Operating Zone covers a vetted set of products and its pages do not mention Agentforce; Koa, Salesforce's own reasoning model, is expected in US regions first."
  - "Before go-live, get in writing per agent: model, processing region, failover path, sub-processor and retention terms."
faq:
  - q: "Does Agentforce process data in the EU?"
    a: "It depends on the model and your org's Data 360 region. Salesforce routes LLM requests to a nearby data center based on that region and lists European locations for AWS and Azure, but publishes no per-model EU list. Ask your account executive to confirm it for your org in writing."
  - q: "What is the shared trust zone in Agentforce?"
    a: "Salesforce's term for models that partners operate outside its own trust boundary, for example OpenAI models. Trailhead summarises shared trust as data retained in Salesforce with joint moderation, and Salesforce states zero data retention for the LLM providers it currently uses."
  - q: "Is Agentforce available in the Hyperforce EU Operating Zone?"
    a: "I found no Salesforce page that says so for Agentforce agents. The EU Operating Zone page names Sales Cloud, Service Cloud, the platform and industries without mentioning AI, and the Agentforce Vibes FAQ says Vibes is not available there. Ask Salesforce before you plan on it."
  - q: "Does Salesforce's zero data retention cover our own model via BYOLLM?"
    a: "No. Salesforce's Agentforce privacy FAQ says its answers do not apply to BYO LLM. Your provider is then a non-Salesforce application, and your own contract with it governs the data."
  - q: "Can we use Koa in Europe?"
    a: "Not yet, as I read the announcement. Salesforce announced Koa on 15 September 2026 as a pilot, with general availability expected in Winter 2026 in U.S. regions. No EU date is published."
draft: false
---

When an Agentforce agent answers a European dealer, the CRM records stay in your org, but the prompt built from them goes to a large language model, and the model decides where that happens. Salesforce runs Claude and Amazon models on Amazon Bedrock inside its own trust boundary; other models run with partners in a "shared trust zone" or at the provider. Geo-aware routing follows your org's Data 360 region, the Hyperforce EU Operating Zone pages say nothing about AI, and Koa starts in US regions. For Agentforce EU data residency, get model, region and fallback confirmed in writing.

## Where does an Agentforce prompt go?

A service agent that answers "where is my spare parts order?" puts the dealer account, the order and perhaps a delivery date from SAP into a prompt. The records stay put: Salesforce's [Agentforce privacy FAQ](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/legal/Privacy/agentforce-privacy-FAQ.pdf) (June 2025) says customer data "is not stored in Agentforce" but in the underlying Salesforce services. The prompt travels. The [Supported Models page](https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html) describes three routes:

- **Inside the trust boundary.** "Anthropic and Amazon models are operated on Amazon Bedrock infrastructure entirely within the Salesforce Trust Boundary." When the partnership was expanded in [October 2025](https://www.anthropic.com/news/salesforce-anthropic-expanded-partnership), Anthropic described all of Claude's traffic as "contained within the Salesforce virtual private cloud".
- **Shared trust zone.** Other models "are operated by Salesforce partners, either inside a shared trust zone or through the LLM provider directly". Trailhead's [module on large language models](https://trailhead.salesforce.com/content/learn/modules/large-language-models/learn-how-salesforce-uses-large-language-models) summarises shared trust as "Data retained in Salesforce with joint moderation".
- **Bring your own LLM (BYOLLM).** You connect your own contract with Amazon Bedrock, Azure OpenAI, OpenAI or Vertex AI. Inference runs at your provider, while the request still passes the Models API and the Trust Layer.

According to the privacy FAQ, in some cases "Customer Data is sent to OpenAI directly and OpenAI is Salesforce's Sub-processor". For "Anthropic which is hosted on AWS and OpenAI which is hosted on Microsoft Azure", the hosting provider is the sub-processor. Salesforce states a zero data retention policy for the third-party LLM providers it currently uses. The same FAQ says its answers "do not apply to BYO LLM": with your own model, your own contract with the provider governs the data.

## Which model answers your dealer today?

The first question is which model your agent uses. The Supported Models page says the "Salesforce Default" option for Agentforce is a managed mix that currently includes GPT-4o, and the "AWS-Hosted" option uses Claude Sonnet 4 on Bedrock. Trailhead says Agentforce reasoning engine calls use OpenAI GPT-4o, "and in some cases Azure OpenAI GPT-4o", as the default. Since the [Claudeforce release](https://www.salesforce.com/ap/news/press-releases/2026/08/27/sg-salesforce-and-anthropic-announce-claudeforce-the-1-ai-meets-the-1-ai-crm/) of 27 August 2026, Claude also serves "as a reasoning model for the Atlas Reasoning Engine".

Salesforce's [Infrastructure and Sub-processors document](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/documents/legal/misc/salesforce-infrastructure-and-subprocessors.pdf) of 19 December 2025 counts Agentforce under Einstein Generative AI Services and lists, among others:

| Provider | Locations listed | Routing note |
|---|---|---|
| OpenAI | United States | failover to a Microsoft Azure endpoint; "priority will be given to the region in which Customer's org is provisioned, subject to availability" |
| Microsoft Azure | United States, Switzerland, France, Germany, Sweden, United Kingdom and others | none |
| Amazon Web Services | United States, Germany, France, Italy, Sweden, Switzerland, United Kingdom and others | for LLM calls via AWS endpoints, "the disclosed region closest to Customer's Salesforce Org applies"; Swiss data may be re-routed through AWS in the US on failover |

My reading: a model on Bedrock has a documented rule that ties it to the AWS region closest to your org. For GPT models the documents allow both OpenAI in the US and Azure in Europe, and they do not say which one your org gets. That gap needs closing with Salesforce, and model choice per agent is the lever.

## Does geo-aware routing keep requests in the EU?

According to the Supported Models page, geo-aware models route "your LLM request to a nearby data center based on where Data 360 is provisioned for your org", and your Einstein generative AI platform region is the same as your Data 360 region. A [Salesforce Help article](https://help.salesforce.com/s/articleView?id=000396615&language=en_US&type=1) lists Einstein Platform and Agentforce instances on AWS in Frankfurt, Paris, Milan, Stockholm, London and Zurich.

Three points remain open:

- **Which models are geo-aware.** The Supported Models page names no models and no regions.
- **What happens on an outage.** For Agentforce Vibes, the coding assistant, Salesforce [documents](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-geo-aware-routing.html) that requests fall back to the United States by default when the regional endpoint is unavailable. A setting in Einstein Setup, "Enable In-Region Model Request Only", requires Data 360 and returns an error instead. The same page says: "This setting currently has no effect for Anthropic and Gemini models." Ask Salesforce whether it governs your service agents too.
- **Switzerland.** For Swiss data, the sub-processor document names a failover through AWS in the US, relevant for Swiss sites and dealers.

In-region only has a price: during an outage the agent returns an error. For order status that is acceptable with a handover to a person. For a [breakdown hotline](../breakdown-hotline-agentforce-voice/) I would not accept it without a tested fallback to a dispatcher.

## What does the Hyperforce EU Operating Zone cover?

Salesforce [launched](https://www.salesforce.com/news/press-releases/2023/03/02/hyperforce-eu-operating-zone-news/) the Hyperforce EU Operating Zone on 2 March 2023, so customers can store and process their data in the EU, with support by EU-based personnel. The [product page](https://salesforce.com/platform/data-residence-eu-oz) speaks of processing and storing customer data "strictly within the region (EU and Switzerland)" and of "a select set of products and features that have been vetted", spanning Sales Cloud, Service Cloud, the platform and industries. Neither page mentions Agentforce, Einstein or Data 360.

The only explicit AI statement I found is in the [Agentforce Vibes FAQ](https://developer.salesforce.com/docs/platform/agentforcevibes/guide/afv-faqs.html): "Agentforce Vibes isn't available in the EU Operating Zone." If your org runs in the EU Operating Zone, I would treat Agentforce agents as unconfirmed there until Salesforce states the scope in writing.

Koa, Salesforce's own CRM reasoning model, comes to the US first. According to the [investor release](https://investor.salesforce.com/news/news-details/2026/Announcing-Koa-Salesforces-First-CRM-Reasoning-Model-Built-on-NVIDIA-Nemotron/default.aspx) of 15 September 2026, it is "Available to select pilot customers now", with general availability "expected Winter 2026 in U.S. regions", and Salesforce runs inference "entirely within its own trust boundary". There is no EU date yet.

## Is EU processing a legal requirement?

I am a Salesforce architect, not a lawyer, and this is not legal advice. As I read it, GDPR does not demand that data stays in the EU, and Salesforce's privacy FAQ says all Salesforce services, Agentforce included, are covered by the EU Standard Contractual Clauses, with Binding Corporate Rules for processors on top. Whether that is enough is your data protection officer's call. Some data protection officers in manufacturing still ask for EU processing when prompts carry dealer contacts, technician names or warranty cases.

Three neighbouring topics follow other rules: the [EU AI Act deadlines for Agentforce](../eu-ai-act-deadlines-agentforce/), [AI coding tools under works council and GDPR](../ai-coding-tools-works-council-gdpr/), and external models reading Salesforce data through [hosted MCP servers](../salesforce-hosted-mcp-servers-data-access/), where Salesforce's retention agreements do not reach.

## A typical scenario: dealer enquiries from five countries

Assume a machine builder in Germany with 300 dealers in France, Italy, Austria, Switzerland and Poland, Service Cloud, SAP S/4HANA for orders and Data 360 provisioned in a European region. All numbers are assumptions. A service agent is to answer about 3,000 dealer enquiries per month on order status, spare parts availability and warranty case status. Prompts contain dealer contact names, serial numbers and order values.

**The model.** The agent runs on Salesforce Default. The data protection officer finds OpenAI in the United States on the sub-processor list. The team switches to a Claude model on Bedrock and asks Salesforce to confirm the processing region and failover path for its org.

**Switzerland.** The documented failover for Swiss data runs through AWS in the US. The data protection officer accepts it under the Standard Contractual Clauses and documents it.

**The prompt.** The agent identifies dealers by account number and leaves contact names out of the prompt, which the answer does not need.

**Koa.** The evaluation is postponed until an EU date exists.

Waiting for the written confirmation delays go-live by about three weeks. In my judgement that is cheaper than explaining the data flow afterwards.

## What should a manufacturer get confirmed in writing?

Ask Salesforce per agent and file the answers in the architecture documentation:

1. **Model.** Which model does each agent use, and what does Salesforce Default mean for your org today?
2. **Region.** Where is Data 360 provisioned, and in which region does the Einstein generative AI platform process your prompts?
3. **Failover.** Where does a request go when the regional endpoint is unavailable, and does an in-region-only setting apply to your agents and your model provider?
4. **Sub-processor.** Who processes the prompt for that model: OpenAI, Azure, AWS or Google?
5. **EU Operating Zone.** If your org runs there, may it use Agentforce, and with which limits?
6. **Retention.** Does zero data retention apply to your model, and if you use BYOLLM, which clauses in your own provider contract cover it?
7. **Changes.** How will you learn when the default model or the sub-processor list changes?

Settling these questions per agent is part of my work on [Salesforce architecture](../../services/salesforce-architecture/); the wider map of agents in manufacturing is in [chapter 10 of the AI masterclass](../../ai-masterclass/ai-agents-in-manufacturing/).

Where an Agentforce agent processes your dealer data depends on the model you choose, and only Salesforce's written confirmation for your org settles it. If you want a second opinion before your data protection officer signs off, [send me a message](#contact).
