---
title: "Salesforce Agent Context Engine explained"
description: "What the Salesforce Agent Context Engine does, how it gives AI agents governed context from Data 360, and what companies should prepare before using it."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: en
slug: salesforce-agent-context-engine-explained
translationKey: agent-context-engine
topic: data
categories: [ai]
tags: [agentforce, data 360, ai agents, data governance, architecture]
takeaways:
  - "For each request the engine assembles a small data package: the unified customer profile, memories, real-time signals and a slice of the knowledge graph."
  - "Besides Agentforce, Salesforce has announced support for agents on Google ADK, AWS Bedrock, LangGraph or the OpenAI SDK, through an SDK, APIs or MCP."
  - "Business terms like active customer are defined once for a job in a semantic layer and reused, so the agents working on that job use the same definition."
  - "Existing permissions and data classification also apply to the context. Durable memories keep their source and can be updated and deleted through APIs."
  - "The engine is in preview. Identity resolution, data classification and agreed definitions of business terms pay off now, with or without the engine."
faq:
  - q: "What is the Salesforce Agent Context Engine?"
    a: "It is a shared context layer built on Data 360. For each agent request it assembles a scoped package of data, such as the resolved customer profile, relevant memories, real-time signals and the relevant part of the knowledge graph, while respecting permissions."
  - q: "Does the Agent Context Engine only work with Agentforce?"
    a: "No. Salesforce has announced that agents built on Google ADK, AWS Bedrock, LangGraph or the OpenAI SDK can also use it through an SDK, APIs or MCP tools, limited to their permitted scope. During the preview, check which platforms and functions are actually available for your org."
  - q: "Is the Agent Context Engine generally available?"
    a: "No. As of November 2026 Salesforce describes it as being in preview. Salesforce has not published pricing or consumption meters for it. Data 360 itself is priced by consumption, so clarify which context, graph and memory operations will use credits."
  - q: "What do companies need before using the Agent Context Engine?"
    a: "Companies need Data 360 with reliable identity mapping, including identity resolution wherever context spans several systems or records. Add data classification that defines what is sensitive, agreed and owned definitions for key business terms, and clean permissions in Salesforce."
  - q: "Can one agent see memories that another agent created?"
    a: "Yes, by default. Every request has to include the identity of the end user, otherwise the engine returns nothing. The identity of the requesting agent is optional; without it there is no agent filter, and any agent serving that customer can read the customer's memories. Decide deliberately which agents may share memories."
---

The Salesforce Agent Context Engine gives AI agents the context they need for a single task, and only the context they are allowed to see. It sits on top of Data 360, assembles a small, governed package of data for each request and makes it available to Agentforce and to agents built on other platforms. Salesforce described it in detail on 20 October 2026. As of November 2026 it is in preview, so production readiness, support terms and pricing still have to be clarified with Salesforce. It is worth understanding now, because it shows where the real work in agent projects lies: in data, definitions and permissions.

## What problem does the Agent Context Engine solve?

An AI agent cannot use information it is never given. In a typical enterprise, that information is spread across CRM objects, data warehouses, ERP systems, knowledge bases and previous conversations. Without a common layer, every agent project solves the same problems again:

- **Which data is relevant** for this task, and which is noise?
- **Which customer** is meant, when the same company exists several times across systems?
- **What does a term mean**, for example "active customer" or "open order"?
- **What may this agent see**, and what must be hidden from it?
- **What did other agents already learn**, for example a price agreement recorded by a customer success agent?

Salesforce illustrates this in its [announcement](https://www.salesforce.com/blog/?p=157012) with a sales example: an opportunity is marked as "commit" and a sales agent drafts a closing email. With the right context, the agent also sees declining product usage, an open billing dispute and an unsigned compliance document, and it respects a price hold that another agent had already agreed with the customer. Instead of a closing email it recommends a service-oriented conversation with the sponsor.

## Definitions, data package, graph and memories

According to Salesforce, the engine combines several building blocks:

1. **Shared definitions.** Business experts define the relevant sources, business terms and intended use once for a job. A semantic layer based on Tableau semantic data models, now part of Data 360, keeps terms consistent across all agents.
2. **A scoped package per request.** For each request the engine assembles the resolved customer profile, relevant memories, real-time signals and the relevant part of the knowledge graph. Salesforce's goal is to provide the minimum data needed for the best result.
3. **Graph traversal.** Instead of searching all data every time, the engine starts from the identified customer and follows only relevant and permitted connections in a knowledge graph. This approach is often called GraphRAG.
4. **Governed memory.** The engine extracts facts, preferences and learnings from agent conversations and keeps durable memories with their source. Not every conversation becomes long-term memory, and memories can require human confirmation before other agents rely on them.

The engine builds on Data 360 and inherits its real-time pipeline, zero-copy access, identity resolution and governance. Data that stays in Snowflake, Databricks or BigQuery can be used via zero copy, with Data 360 governance on top of the controls in those platforms, not instead of them. Real time does not mean every part of the package is equally fresh: a sensor alert can arrive in seconds while a unified profile is updated in batches. Define how old each context element may be.

![How the Agent Context Engine assembles context: data from CRM objects, ERP systems, data warehouses such as Snowflake, Databricks and BigQuery via zero copy, knowledge bases and previous conversations flow into the Agent Context Engine on Data 360. The engine combines shared definitions, a scoped package per request, graph traversal (GraphRAG) and governed memory, and applies existing object, field and row-level security, sharing rules and data classification. Agents on Agentforce, Google ADK, AWS Bedrock, LangGraph and the OpenAI SDK use it via SDK or MCP tools. Agents inherit every weakness of the existing permission model.](../../../assets/blog/agent-context-engine-en.png)

## Agents outside Agentforce can use it too

This is one of the more interesting points. The Agent Context Engine is not limited to Agentforce. Salesforce has announced that agents built on Google ADK, AWS Bedrock, LangGraph or the OpenAI SDK can use it as well, through an SDK, APIs or MCP tools, within their permitted scope. The developer documentation describes the engine as API first. Whether every platform gets the same range of functions during the preview is something to test, not to assume.

For enterprise architecture that matters. Many companies will not run all their agents on one platform. A shared context layer that several agent platforms can use helps avoid building the same data access logic in each of them. At the same time it makes Data 360 a central part of the AI architecture, which is a strategic decision in its own right.

## How are permissions and sensitive data handled?

Salesforce states that context assembly applies existing Salesforce and Data 360 entitlements: object, field and row-level security, sharing rules and data classification. Sensitive content is masked or withheld before it reaches the agent, based on the classification policy and not on the model's judgment. Changes to systems of record still go through each system's own permissions.

Access also depends on the identities the calling agent passes along. According to the [developer documentation on memory governance](https://developer.salesforce.com/docs/data/agentic-memory-context/guide/agentic-memory-governance.html), every request must include the end user's identity, the individual for a customer or the user ID for an employee. The identity of the agent itself is optional. Without it, results are not filtered by agent, so any agent serving that customer can read the same memories.

This is the right principle. It also means that agents inherit every weakness of the existing permission model. If sharing rules are too broad today, an agent will see too much tomorrow. If sensitive fields are not classified, they cannot be masked. Before an agent project, the permission model deserves the same attention as the agent design.

```hinweis offen
The memory function raises a further question for European companies: how are stored memories handled when a customer asks for deletion or access to information under GDPR? Salesforce states that every memory is traceable to its source, and the [memory management APIs](https://developer.salesforce.com/docs/data/agentic-memory-context/guide/agentic-memory-memory-management.html) can retrieve, update and permanently delete individual entries. Expired entries, however, are not physically deleted. So the process for requests, retention periods and deletion across all of a person's memories and in the source systems should be defined before memories are switched on.
```

## Prepare now: identity resolution, classification and terms

The Agent Context Engine is in preview, and Salesforce did not publish pricing in its announcement. That is a good reason not to rush, and an equally good reason to start with the groundwork, because it pays off with or without the engine:

| Area | What to decide |
|---|---|
| Identity resolution | Make sure customers and contacts can be matched across systems. In manufacturing that often means bringing together CRM accounts and ERP customer numbers. Installed base machines and serial numbers are linked through the data model and clean keys, not through customer identity resolution. |
| Data classification | Decide which fields are sensitive, for example personal data, prices, contract terms or legal information. |
| Business definitions | Agree on what key terms mean, and who owns each definition. "Active customer" means something different to sales, service and finance unless someone decides. |
| Permissions | Review sharing rules and field-level security, especially for broad access that has grown over the years. |
| Data quality | Duplicates and outdated records lead to wrong context, no matter how good the engine is. |
| Source authority and freshness | Decide which system wins when prices, contracts or asset states contradict each other, and how current each piece of context must be. |
| Agent identity and memory scope | Decide which agents identify themselves, which agents may share memories about the same customer, and who approves memories before other agents use them. |

I describe why these foundations matter more than the agent itself in [Agentforce pilots: business value and data quality first](/en/blog/agentforce-business-value-data-quality-first/).

## Should Data 360 become the core of the AI architecture?

The Agent Context Engine is a sign of where Salesforce is heading: Data 360 as the shared foundation for data, context and governance, with agents from different platforms on top. Whether that fits your architecture is a decision, not a given. For an architect on the client side, it raises the usual questions: how much depends on one vendor, which data really needs to flow into Data 360, what it costs at scale, how memories and definitions can be exported if you change course, and who owns definitions and permissions.

These are decisions for the client, not for a single implementation partner, and they belong in the target architecture before the first production agent. That is a core part of my [architecture and governance work](/en/services/salesforce-architecture/).
