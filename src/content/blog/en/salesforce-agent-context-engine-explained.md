---
title: "Salesforce Agent Context Engine explained"
description: "What the Salesforce Agent Context Engine does, how it gives AI agents governed context from Data 360, and what companies should prepare before using it."
pubDate: 2026-10-23
lang: en
slug: salesforce-agent-context-engine-explained
translationKey: agent-context-engine
topic: data
category: ai
tags: [agentforce, data 360, ai agents, data governance, architecture]
takeaways:
  - "The Agent Context Engine is a shared context layer on top of Data 360 that assembles, for each request, exactly the data an AI agent needs and is allowed to see."
  - "It works for Agentforce and for agents built on other platforms such as Google ADK, AWS Bedrock, LangGraph or the OpenAI SDK, connected through an SDK or MCP tools."
  - "Business terms like active customer are defined once in a semantic layer, so every agent uses the same definition."
  - "Existing Salesforce and Data 360 permissions, sharing rules and data classification apply to the context, and agent memories are stored with their source and can require human confirmation."
  - "The Agent Context Engine is in preview; companies should first work on identity resolution, data classification and agreed business definitions, because the engine can only pass on what the data holds."
faq:
  - q: "What is the Salesforce Agent Context Engine?"
    a: "It is a shared context layer built on Data 360. For each agent request it assembles a scoped package of data, such as the resolved customer profile, relevant memories, real-time signals and the relevant part of the knowledge graph, while respecting permissions."
  - q: "Does the Agent Context Engine only work with Agentforce?"
    a: "No. According to Salesforce, agents built on Google ADK, AWS Bedrock, LangGraph or the OpenAI SDK can also use it through an SDK or MCP tools, limited to their permitted scope."
  - q: "Is the Agent Context Engine generally available?"
    a: "No. In October 2026 Salesforce describes it as being in preview. Salesforce has not published pricing in its announcement."
  - q: "What do companies need before using the Agent Context Engine?"
    a: "Data 360 with working identity resolution, a data classification that defines what is sensitive, agreed definitions for key business terms and clean permissions in Salesforce."
---

The Salesforce Agent Context Engine gives AI agents the context they need for a single task, and only the context they are allowed to see. It sits on top of Data 360, assembles a small, governed package of data for each request and makes it available to Agentforce and to agents built on other platforms. Salesforce presented it at Dreamforce and described it in detail on 20 October 2026. It is currently in preview. For companies planning AI agents, it is worth understanding now, because it shows where the real work in agent projects lies: in data, definitions and permissions.

## What problem does the Agent Context Engine solve?

An AI agent is only as good as the information it works with. In a typical enterprise, that information is spread across CRM objects, data warehouses, ERP systems, knowledge bases and previous conversations. Without a common layer, every agent project solves the same problems again:

- **Which data is relevant** for this task, and which is noise?
- **Which customer** is meant, when the same company exists several times across systems?
- **What does a term mean**, for example "active customer" or "open order"?
- **What may this agent see**, and what must be hidden from it?
- **What did other agents already learn**, for example a price agreement recorded by a customer success agent?

Salesforce illustrates this in its [announcement](https://www.salesforce.com/blog/?p=157012) with a sales example: an opportunity is marked as "commit" and a sales agent drafts a closing email. With the right context, the agent also sees declining product usage, an open billing dispute and an unsigned compliance document, and it respects a price hold that another agent had already agreed with the customer. Instead of a closing email it recommends a service-oriented conversation with the sponsor.

## How does the Agent Context Engine work?

According to Salesforce, the engine combines several building blocks:

1. **Shared definitions.** Business experts define the relevant sources, business terms and intended use for a job once. A semantic layer based on Tableau semantic data models, now part of Data 360, keeps terms consistent across all agents.
2. **A scoped package per request.** For each request the engine assembles the resolved customer profile, relevant memories, real-time signals and the relevant part of the knowledge graph. Salesforce's goal is the minimum data needed for the best result.
3. **Graph traversal.** Instead of searching all data every time, the engine starts from the identified customer and follows only relevant and permitted connections in a knowledge graph. This approach is often called GraphRAG.
4. **Governed memory.** The engine extracts facts, preferences and learnings from agent conversations and stores them with their source. Memories can require human confirmation before other agents rely on them.

The engine builds on Data 360 and inherits its real-time pipeline, zero-copy access, identity resolution and governance. Data that stays in Snowflake, Databricks or BigQuery can be used via zero copy, with Data 360 governance on top.

![How the Agent Context Engine assembles context: data from CRM objects, ERP systems, data warehouses such as Snowflake, Databricks and BigQuery via zero copy, knowledge bases and previous conversations flows into the Agent Context Engine on Data 360. The engine combines shared definitions, a scoped package per request, graph traversal (GraphRAG) and governed memory, and applies existing object, field and row-level security, sharing rules and data classification. Agents on Agentforce, Google ADK, AWS Bedrock, LangGraph and the OpenAI SDK use it via SDK or MCP tools. Agents inherit every weakness of the existing permission model.](../../../assets/blog/agent-context-engine-en.png)

## Which agents can use it?

This is one of the more interesting points. The Agent Context Engine is not limited to Agentforce. According to Salesforce, agents built on Google ADK, AWS Bedrock, LangGraph or the OpenAI SDK can use it as well, through an SDK or MCP tools, and limited to their permitted scope.

For enterprise architecture that matters. Many companies will not run all their agents on one platform. A shared context layer that several agent platforms can use avoids building the same data access logic in each of them. At the same time it makes Data 360 a central part of the AI architecture, which is a strategic decision in its own right.

## How are permissions and sensitive data handled?

Salesforce states that context assembly applies existing Salesforce and Data 360 entitlements: object, field and row-level security, sharing rules and data classification. Sensitive content is masked or withheld before it reaches the agent, based on the classification policy and not on the model's judgement. Changes to systems of record still go through each system's own permissions.

This is the right principle. It also means that agents inherit every weakness of the existing permission model. If sharing rules are too broad today, an agent will see too much tomorrow. If sensitive fields are not classified, they cannot be masked. Before an agent project, the permission model deserves the same attention as the agent design.

The memory function raises a further question for European companies: how are stored memories handled when a customer asks for deletion or information under GDPR? Salesforce states that every memory is traceable to its source. That is a good starting point, but the process for deletion and retention should be defined before memories are switched on.

## What should companies prepare now?

The Agent Context Engine is in preview, and Salesforce has not published pricing in its announcement. That is a good reason not to rush, and an equally good reason to start with the groundwork, because it pays off with or without the engine:

- **Identity resolution.** Make sure customers, contacts and assets can be matched across systems. In manufacturing that often means bringing together CRM accounts, ERP customer numbers and the installed base.
- **Data classification.** Decide which fields are sensitive, for example personal data, prices, contract terms or legal information.
- **Business definitions.** Agree on what key terms mean, and who owns each definition. "Active customer" means something different to sales, service and finance unless someone decides.
- **Permissions.** Review sharing rules and field-level security, especially for broad access that grew over the years.
- **Data quality.** Duplicates and outdated records lead to wrong context, no matter how good the engine is.

I describe why these foundations matter more than the agent itself in [Agentforce pilots: business value and data quality first](../agentforce-business-value-data-quality-first/).

## How does this fit into the overall architecture?

The Agent Context Engine is a sign of where Salesforce is heading: Data 360 as the shared foundation for data, context and governance, with agents from different platforms on top. For a client-side architect, that raises the usual questions: how much depends on one vendor, which data really needs to flow into Data 360, what it costs at scale, and who owns definitions and permissions.

These are decisions for the client, not for a single implementation partner, and they belong in the target architecture before the first productive agent. That is a core part of my [architecture and governance work](../../services/salesforce-architecture/). If you want to discuss what the Agent Context Engine means for your AI plans, [send me a message](#contact).
