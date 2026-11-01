---
title: "What Is Agentforce? Explained for IT Leaders"
description: "What is Agentforce? Definition, building blocks such as subagents, actions and Agent Script, how it differs from chatbots and Prompt Builder, costs and data."
pubDate: 2026-11-01
lang: en
slug: what-is-agentforce
translationKey: what-is-agentforce
topic: ai
categories: [ai, architecture]
tags: [Agentforce, AI agents, Agent Script, subagents, Salesforce AI, IT leadership]
takeaways:
  - "A flow follows a path someone built in advance. An agent picks the path for each request, but it can only do what its actions can do."
  - "Its building blocks are subagents (formerly topics), instructions and actions. The reasoning engine connects them, the trust layer protects the data."
  - "With Agent Script, you fix business logic firmly. The language model then mainly shapes the conversation style."
  - "Billing is by consumption: according to the price list, an action costs 20 Flex Credits. Costs therefore follow the number of actions."
  - "For manufacturers, access to ERP data such as order status, stock and assets decides whether an agent helps in daily work."
faq:
  - q: "What is Agentforce?"
    a: "Agentforce is Salesforce's platform for building and running AI agents. An agent uses generative AI to decide what to do next and carries out the steps through actions, such as flows, Apex or interfaces."
  - q: "What is the difference between Agentforce and a chatbot?"
    a: "A classic chatbot follows a fixed dialogue tree. An Agentforce agent understands the request, picks suitable subagents and actions, and can read and change data. Fixed rules can still be set with Agent Script."
  - q: "What are subagents in Agentforce?"
    a: "Subagents describe the jobs an agent takes on, such as looking up order status or creating a service case. Salesforce used to call them topics. Each subagent has its own instructions and actions."
  - q: "How much does Agentforce cost?"
    a: "Agentforce is billed by consumption in Flex Credits. According to the price list, an action costs 20 Flex Credits, which at €500 per 100,000 credits comes to €0.10. There are also editions with included credits and flat-fee agreements."
draft: false
---

Agentforce is Salesforce's platform for AI agents: software that uses generative AI to decide which step comes next and carries it out through actions in Salesforce or connected systems. Asking "what is Agentforce" often gets you marketing terms as an answer. For IT leaders, what counts is what an agent is made of technically, how much control you have over its behaviour, what it costs and which data it needs. This article puts that in order and links the detailed articles.

## What is Agentforce?

In its [Agentforce Guide](https://www.salesforce.com/agentforce/guide/), Salesforce describes Agentforce as a platform for building agents that go beyond simple chat interactions. According to Salesforce, an agent is a type of software that uses generative AI to make decisions about what to do next and how to do it.

The difference from earlier automation lies in that decision. A flow follows a fixed path that someone built in advance. An agent receives a request in natural language, such as "When will my spare parts order arrive?", recognises the task, picks the right action and writes the answer. Agents work in customer service, in sales or for employees. They can be called from chat and portal, from Flow or Apex, and through an API from your own applications, as described in [Agentforce Agent API](../agentforce-agent-api-dealer-apps/).

## An agent consists of subagents, instructions and actions

According to the Agentforce Guide, an agent is made of a few building blocks:

| Building block | What it does |
|---|---|
| Subagents | describe the agent's jobs, such as looking up order status or creating a service case |
| Instructions | set how a subagent handles conversations and what it does not do |
| Actions | get information or perform tasks, for example through Flow, Apex, prompt templates or interfaces |
| Reasoning engine | picks the next step based on subagents, instructions, actions and rules |
| Trust layer | routes prompts to the language model, honours permissions and masks sensitive data |
| Data 360 | indexes knowledge for answers based on your own documents and supplies data for analytics |

For the architecture, this means: an agent can only do what its actions can do. The actions use the same permissions, flows and interfaces as the rest of the org. If you already have clean flows and integrations today, you will build agents faster.

Actions come as standard actions from Salesforce and as custom actions. According to the Agentforce Guide, some types of custom actions need an additional licence. Check this for every planned action before you estimate costs.

```hinweis tipp
Salesforce has renamed topics to subagents. Older Trailhead modules, diagrams and articles, including some of my own, still say "topics". They mean the same thing.
```

## Agent Script fixes the flow of work

A common objection to AI agents is that their behaviour is not predictable. Salesforce's answer is Agent Script, its own language for agents. According to the Agentforce Guide, the reasoning engine uses it to combine decisions by the language model with rules-based execution. Script gives full deterministic control over agent behaviour and replaces overloaded system prompts with structured business logic.

Salesforce recommends this division of work: instructions shape the conversation style, the script handles the actual business logic. For manufacturers, this matters because many rules in service are fixed. A warranty applies or it does not, a return needs a serial number. Such rules belong in the script, so the agent applies them the same way every time.

Before go-live, the Testing Center checks the agent's behaviour, and in operation Agentforce Observability shows where logic needs refining. How I release an agent for production is described in [testing Agentforce agents](../testing-agentforce-agents-before-go-live/).

## How does Agentforce differ from chatbots and Prompt Builder?

Agentforce does not replace every existing AI feature in Salesforce. Three tools are often confused:

- **Einstein Bot.** Follows a fixed dialogue tree with menus. Good for a few clearly structured requests. Whether and when switching pays off is covered in [moving an Einstein Bot to Agentforce](../einstein-bots-to-agentforce-upgrade/).
- **Prompt Builder.** Generates text from a template, such as a summary of a service case or a draft reply. It does not act on its own. When a template is enough is compared in [Prompt Builder or Agentforce agent](../prompt-builder-or-agentforce-agent/).
- **Agentforce agent.** Understands the request, picks subagents and actions, and can read and change data.

Many tasks in service and sales do not need an agent at all. A prompt template that drafts a reply is easier to test and cheaper to run.

## Costs arise per action

Agentforce is billed by consumption. According to the price list, an action costs 20 Flex Credits, which at the list price of €500 per 100,000 credits comes to €0.10. Prompts by model tier and processing in Data 360 come on top. How to estimate this for one agent is shown in [Flex Credits: Agentforce cost per action](../flex-credits-agentforce-cost-per-action/). For larger programmes there are flat-fee agreements, which I compare in [AELA or Flex Credits](../aela-agentforce-flat-fee-vs-credits/).

Also on the table early: which language model answers the requests and where it runs. That is covered in [Agentforce data residency](../agentforce-eu-data-residency-models/). Which deadlines the EU AI Act sets for agents is in [EU AI Act deadlines for Agentforce](../eu-ai-act-deadlines-agentforce/).

## For manufacturers, the data from the ERP counts

An agent in the dealer portal that does not know the order status helps nobody. For manufacturers, the data customers and dealers ask about often sits in the ERP: order status, delivery dates, stock, prices and assets. The agent needs an action that queries the ERP for this, for example through MuleSoft. I describe one example in [Agentforce and SAP: order status via MuleSoft](../agentforce-sap-order-status-mulesoft/).

Read-only actions are the easier start. As soon as an agent is supposed to change something in the ERP, such as a delivery date or a return, the interface needs the same checks as for a person in inside sales: permission, plausibility and a log.

The quality of the data in Salesforce itself matters just as much. If assets are assigned to the wrong customer or customers exist twice, the agent gives wrong answers, only faster and more politely. Why I therefore start with business value and data quality is in [Agentforce: business value and data quality first](../agentforce-business-value-data-quality-first/).

## Pick one process with a target figure for the first agent

For the start, pick a process with many similar requests, clear rules and data an action can reach, such as order status or spare parts requests from dealers. Set a target figure, for example the share of requests the agent resolves without handing over to a person, and a date on which you decide about expanding. Which criteria count is described in [Agentforce for manufacturers: start now or wait?](../agentforce-yes-or-no-manufacturers/). I plan the architecture behind it with clients under [Salesforce architecture](../../services/salesforce-architecture/).
