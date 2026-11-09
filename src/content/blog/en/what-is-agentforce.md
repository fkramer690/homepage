---
title: "What Is Agentforce? Explained for IT Leaders"
description: "What is Agentforce? Definition, building blocks such as subagents, actions and Agent Script, how it differs from bots and Prompt Builder, costs and data."
pubDate: 2026-11-06
lang: en
slug: what-is-agentforce
translationKey: what-is-agentforce
topic: ai
categories: [ai, architecture]
tags: [Agentforce, AI agents, Agent Script, subagents, Salesforce AI, IT leadership]
takeaways:
  - "A flow runs a process modeled in advance. An agent interprets each request and chooses actions within set limits, and only its actions act."
  - "You configure subagents, instructions and actions. The reasoning engine and trust layer run underneath; Data 360 adds native knowledge and monitoring."
  - "Agent Script fixes order and conditions. Checks such as warranty or price belong in deterministic actions, not in the language model."
  - "With Flex Credits, a standard action costs 20 credits, $0.10 or €0.10 at list price. There are also per-user licenses, conversations and flat fees."
  - "For manufacturers, ERP data and the question of who may see which installed base decide whether an agent helps or harms."
faq:
  - q: "What is Agentforce?"
    a: "Agentforce is Salesforce's platform for building and running AI agents. An agent combines a language model that interprets requests with logic and actions you define, such as flows, Apex or interfaces."
  - q: "What is the difference between Agentforce and an Einstein Bot?"
    a: "An Einstein Bot runs dialogues modeled in advance, optionally with intent recognition. An Agentforce agent chooses subagents and actions dynamically. According to Salesforce, Einstein Bots have been in maintenance mode since 17 August 2026."
  - q: "What are subagents in Agentforce?"
    a: "Subagents describe the jobs an agent takes on, such as looking up order status or creating a service case. Salesforce used to call them topics. Each subagent has its own instructions and actions."
  - q: "How much does Agentforce cost?"
    a: "It depends on the license model. With Flex Credits, Salesforce lists $500 or €500 per 100,000 credits, and a standard action uses 20 credits, or $0.10 or €0.10 at list price. There are also per-user licenses, conversation pricing and flat-fee agreements."
draft: false
---

Agentforce is Salesforce's platform for AI agents: software that uses generative AI to interpret a request and choose the next step within limits you define, then carries it out through actions in Salesforce or connected systems. Asking "what is Agentforce" often gets you marketing terms as an answer. For IT leaders, what counts is what an agent is made of technically, which parts behave predictably, under whose permissions it runs, what it costs and which data it needs. This article puts that in order.

## What is Agentforce?

In its [Agentforce Guide](https://www.salesforce.com/agentforce/guide/), Salesforce describes Agentforce as a platform for building agents that go beyond simple chat interactions. According to Salesforce, an agent is a type of software that uses generative AI to make decisions about what to do next and how to do it.

The difference from earlier automation lies in that decision. A flow runs a process whose paths and criteria were modeled in advance. An agent receives a request in natural language, such as "When will my spare parts order arrive?", recognises the task, picks an action and writes the answer. Agents work in customer service, in sales or for employees. They can be called from chat and portal, from Flow or Apex, and through an API, as described in [Agentforce Agent API](../agentforce-agent-api-dealer-apps/).

## What you configure and what runs underneath

The Agentforce Guide names a few building blocks. They sit on different levels: some you configure per agent, some are platform services, and one is only needed for certain use cases.

```tabelle
title: Building blocks of an Agentforce agent
columns: Building block | Level | What it does
Subagents | You configure | Describe the agent's jobs, such as order status or a service case
Instructions | You configure | Set how a subagent handles conversations and what it does not do
Actions | You configure | Read or change data through Flow, Apex, prompt templates or interfaces *
Reasoning engine | Platform | Picks the next step from subagents, instructions, actions and Agent Script
Trust layer | Platform | Prompt defence, zero data retention at the model provider, audit; no data masking for agents
Data 360 | Depends on use | Needed for native knowledge from your documents and for some audit and observability features
note: An agent can only do what its actions can do. The actions are where architecture work happens.
```

One point in the table surprises many: according to [Salesforce Help on the trust layer](https://help.salesforce.com/s/articleView?id=sf.copilot_trust.htm&language=en_US&type=5), pattern-based and field-based data masking is disabled for agents. Protecting sensitive data therefore depends on what the agent's user and actions may read in the first place. What the trust layer does instead is described in [Einstein Trust Layer: what it protects in Agentforce](../einstein-trust-layer-what-it-protects/).

```hinweis achtung
The permissions depend on the agent type. An employee agent can run in the context of the logged-in user. A service agent for customers or dealers usually runs as a dedicated agent user. For a dealer portal, that is the core question. The portal user must be authenticated, and each action must take the dealer from that verified login, not from what someone types into the chat. Only then do the agent user's rights and the filters in the actions keep each dealer to its own installed base.
```

How to protect such a portal against manipulated input is covered in [prompt injection in dealer portals](../prompt-injection-dealer-portals-agentforce/).

Salesforce has renamed topics to subagents. Older Trailhead modules and articles, including some of my own, still say "topics". They mean the same thing. Whether a planned action needs an extra license depends on what it calls, for example a product-specific standard action. Check this per action before you estimate costs.

## Which parts of an agent are deterministic?

A common objection to AI agents is that their behavior is not predictable. Salesforce's answer is Agent Script, its own language for agents. According to the Agentforce Guide, it combines decisions by the language model with rules-based execution. The deterministic part is what you model as logic in the script: order of steps, conditions, transitions. Prompt instructions and generated answers are still interpreted by the language model.

For manufacturers, this suggests a division of work. Whether a warranty applies, which price a dealer gets or whether a spare part fits an asset are checks for a deterministic action, such as a flow, Apex or a call to the ERP. Agent Script makes sure the agent calls that check before it answers, and the language model phrases the answer.

Testing follows the same logic. The Testing Center runs defined test cases repeatedly and evaluates subagent and action selection and results. It supports the release, but it does not replace business acceptance, integration and security tests. How to prepare an agent for production is described in [testing Agentforce agents](../testing-agentforce-agents-before-go-live/).

## How does Agentforce differ from bots and Prompt Builder?

Agentforce does not replace every AI feature in Salesforce. Three tools are often confused:

```tabelle
title: Einstein Bot, Prompt Builder and Agentforce agent
columns: Tool | How it works | Fits when
Einstein Bot | Dialogues modeled in advance, optionally with intent recognition and actions | Existing bots; in maintenance mode since 17 August 2026
Prompt Builder | Generates output from a template; Flow, Apex or an app controls the process | The process is fixed and only the text varies *
Agentforce agent | Chooses subagents and actions per request, reads and changes data | Requests vary and need data from several places
note: Many tasks in service and sales do not need an agent. A flow with a prompt template is usually simpler to test.
```

According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.bots_service_terminology.htm&language=en_US&type=5), Einstein Bots have been in maintenance mode since 17 August 2026; for new implementations, Salesforce points to Agentforce. When switching pays off is covered in [moving an Einstein Bot to Agentforce](../einstein-bots-to-agentforce-upgrade/), and when a template is enough in [Prompt Builder or Agentforce agent](../prompt-builder-or-agentforce-agent/).

## What does Agentforce cost?

Salesforce sells Agentforce in several models: Flex Credits by consumption, conversation pricing, per-user licenses with included use and flat-fee agreements. In the Flex Credits model, the [pricing page](https://www.salesforce.com/agentforce/pricing/) lists $500 or €500 per 100,000 credits. According to the [Flex Credits rate card](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-02.23.2026.pdf), each action uses:

```kennzahlen
20 | Flex Credits per standard action in production
16 | Flex Credits per standard action in a sandbox
30 | Flex Credits per voice action
$0.10 | per standard action at $500 per 100,000 credits
source: Salesforce Agentforce pricing page and Flex Credits rate card, list prices as of November 2026
```

These are list prices, not contract prices. Depending on license and context, prompts by model tier and Data 360 processing can come on top. How to estimate this for one agent is shown in [Flex Credits: Agentforce cost per action](../flex-credits-agentforce-cost-per-action/), which also compares flat fees such as the AELA.

Also on the table early: which language model answers and where it runs, covered in [Agentforce data residency](../agentforce-eu-data-residency-models/).

## For manufacturers, the data from the ERP counts

An agent in the dealer portal that does not know the order status helps nobody. For manufacturers, the data customers and dealers ask about often sits in the ERP or in the installed base: order status and confirmed delivery dates, stock, customer-specific prices, serial numbers and the spare parts that fit a machine. The agent needs actions that query these sources, for example through MuleSoft, as in [Agentforce and SAP: order status via MuleSoft](../agentforce-sap-order-status-mulesoft/).

Three questions decide whether that works. Which dealer may see which assets and prices? What does the agent say when the ERP is down or the data is old? And which dates may the agent pass on? Which system leads for the delivery date, what status it has, whether that status may go to a customer and when a person has to approve, for example for a return, has to be decided per status before go-live. Read-only actions are the easier start. As soon as an agent changes something in the ERP, the interface needs the same checks as for a person in inside sales: permission, plausibility and a log.

The quality of the data in Salesforce matters just as much. If assets are assigned to the wrong customer, the agent gives wrong answers, only faster and more politely. Why business value and data quality come first is in [Agentforce: business value and data quality first](../agentforce-business-value-data-quality-first/).

## Pick one process with a target figure for the first agent

For the start, pick a process with many similar requests, clear rules and data an action can reach, such as order status or spare parts requests from dealers. Set target figures that measure the result, not only the deflection: the share of correctly resolved requests, how often customers come back with the same question, correct handovers to people and the cost per resolved request. Set a date on which you decide about expanding. Which criteria count is described in [Agentforce for manufacturers: start now or wait?](../agentforce-yes-or-no-manufacturers/). The architecture questions behind it, from actions and permissions to ERP integration, are part of my [Salesforce architecture](../../services/salesforce-architecture/) service.
