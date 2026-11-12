---
title: "Agentforce pilots: business value and data quality first"
description: "Most surveyed Salesforce customers have tried Agentforce, but many stall in pilot. Why business value and data quality decide success, and how to start."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: en
slug: agentforce-business-value-data-quality-first
translationKey: agentforce-business-value-data-quality
topic: ai
categories: [ai]
tags: [agentforce, ai agents, data quality, business case, architecture]
takeaways:
  - "In an Oppenheimer survey, 85 percent of responding Salesforce customers had tested or deployed Agentforce, but nearly half were still in pilot or testing."
  - "In the projects I see, a missing business case, poor data and unclear permissions block agents more often than the agent configuration itself."
  - "Every agent needs one primary value metric before the first prompt, plus guardrails for quality, escalation and cost per successful outcome."
  - "Cleaning up master data, knowledge articles and access rules is part of the agent project, because that is exactly the data the agent reads."
  - "Start with a narrow, high-volume use case, keep a human in the loop for high-risk or irreversible decisions and measure from day one."
faq:
  - q: "Why do so many Agentforce projects stay in the pilot phase?"
    a: "Common reasons are a missing business case, data that is incomplete or inconsistent, unclear access rights and no agreed way to measure success. In the projects I see today, these block agents more often than the technology does, although product maturity was a real limit in my own first pilot."
  - q: "What should an Agentforce business case contain?"
    a: "One clear process, the current volume and cost, a measurable target such as shorter handling time or more cases solved without escalation, the expected consumption costs and who owns the result on the business side."
  - q: "How important is data quality for AI agents?"
    a: "Very important, but not sufficient on its own. An agent answers and acts based on CRM data, knowledge articles and connected systems, so duplicates, outdated records or contradictory articles raise the risk of wrong answers or actions. Retrieval, instructions, permissions, actions and testing also determine reliability."
  - q: "Which use case is a good first Agentforce project?"
    a: "A narrow, frequent and well-documented process with clear rules, for example answering standard service questions using maintained knowledge articles or preparing case summaries for service reps."
---

Agentforce projects succeed when business value and data quality come first and the technology comes second. Most Salesforce customers in a recent survey have tried Agentforce, yet many projects never leave the pilot phase. In the projects I see today, the agent itself is less often the problem. The bigger issues are a missing business case, data the agent can't trust and access rules nobody thought through. My own first Agentforce pilot was what we call a green banana in German: a product delivered before it was ripe. Today several Agentforce projects I am involved in are being implemented, and the difference lies largely in how they started.

## 85 percent tested or deployed, nearly half still in pilot

The October 2026 numbers show a mixed picture. An Oppenheimer survey of Salesforce customers, [reported by Salesforce Ben](https://www.salesforceben.com/85-of-customers-have-tried-agentforce-but-demand-hasnt-picked-up-why/), found that 85 percent of the customers who responded had tested or deployed Agentforce. The figure covers the customers who answered, not the whole customer base. In the same survey nearly half said they were still in the pilot or testing stage. Salesforce reported more than 29,000 Agentforce deals since launch as of January 31, 2026, without saying how many were paid; the last separate figure was more than 9,500 paid deals as of October 31, 2025.

At the same time, demand for Agentforce skills is growing fast. According to the 10K talent report, also [covered by Salesforce Ben](https://www.salesforceben.com/agentforce-jobs-are-booming-while-projects-stall-in-pilot/), mentions of Agentforce in Salesforce job listings rose by 63 percent year on year, while overall Salesforce talent demand fell by 13 percent.

![Agentforce in October 2026: 85% of surveyed Salesforce customers have tested or deployed Agentforce, nearly half say they are still in the pilot or testing stage, Salesforce reported more than 29,000 Agentforce deals since launch as of January 2026, and Agentforce mentions in Salesforce job listings rose 63% year on year while overall Salesforce talent demand fell 13%. Plenty of interest, plenty of demos, production use lags behind.](../../../assets/blog/agentforce-adoption-en.png)

So companies are experimenting, and Agentforce appears more often as a skill in Salesforce job listings, but production use lags behind. That matches what I see on the client side: plenty of interest, plenty of demos, and a gap between a convincing demo and an agent that works reliably every day.

## My first pilot came too early

```praxis
The first Agentforce pilot I was involved in was simply too early. The platform was young and not yet mature enough for what we wanted to do. That is a normal risk with new technology, and it taught me to look harder at the conditions around an agent than at the agent itself.
```

Three conditions have to be in place before a business pilot with real users starts. A short technical spike can come earlier, precisely to find out what is missing:

- **A measurable goal.** "Try out AI in service" is not a goal. Without a number to improve, nobody can decide whether the pilot was a success.
- **Reliable data.** An agent reads knowledge articles and CRM records that were usually never maintained for automated reading. Duplicates and outdated content show up in the answers immediately.
- **Clear ownership on the business side.** If IT runs the pilot alone and nobody in the department owns the result, the pilot ends up as a demo.

The projects now being implemented are built on these conditions, and they are progressing.

## Why does business value come first?

An AI agent costs money in several ways: licenses or consumption credits, implementation, testing, maintenance and the time of the people who supervise it. Depending on the product, Salesforce charges per user, through Flex Credits, per conversation or resolution, or includes usage in certain editions and add-ons. Agent actions, prompts, Data 360 services, voice usage, test runs and sandbox runs can each consume units, and Salesforce has announced Flex Credit charges for agentic MCP and API calls; check the current rate card for each. That makes a clear business case more important, not less.

A good Agentforce business case answers a few simple questions:

1. **Which process?** One process, described concretely, for example "answering B2B customers' questions about delivery status".
2. **How big is it today?** Volume per month, average handling time, cost per case, error rate.
3. **What should change?** One primary target number, for example 30 percent of requests answered without a service rep, or two minutes less handling time per case, plus guardrails such as escalation rate, reopened cases and cost per successful outcome, so that the agent does not trade quality for speed.
4. **What does it cost?** Implementation, expected consumption including tests and Data 360, and the effort for maintaining knowledge and testing.
5. **Who owns the result?** A person in the business, not in IT, who reports whether the target is reached.

If a use case can't answer these questions, it is not ready for an agent. That is not a failure. It saves money that would otherwise go into a pilot nobody can evaluate.

## Why is data quality the second deciding factor?

An agent answers and acts on the basis of what it can read: CRM records, knowledge articles, documents and data from connected systems. Poor or contradictory data raises the risk of a wrong answer or wrong action that is delivered with great confidence. Good data is necessary, but not sufficient: retrieval, instructions, permissions and actions also affect reliability.

In practice I check these points before an agent goes live:

- **Master data.** Are accounts, contacts and assets free of duplicates? Is it clear which record is the right one? An agent that picks the wrong account sends the wrong information to the wrong customer.
- **Knowledge.** Are knowledge articles current, consistent and owned by someone? Two articles with contradictory return policies will produce contradictory answers.
- **Process data.** Are statuses, dates and fields maintained reliably? If the delivery date in Salesforce is only updated once a week, the agent will give outdated answers.
- **Access rights.** What may the agent see, and what may it show to whom? Sharing rules, field-level security and data classification must be configured correctly before an agent works with them. Which user context applies depends on the agent type: employee agents can run with the logged-in user's rights, while external service agents often run as a dedicated agent user. A customer ID passed in a context variable does not restrict record access by itself, so flows and actions must scope the data to the verified customer.

Salesforce is building more tooling for this, such as the Agent Context Engine, which assembles governed context for agents from Data 360. Check its availability before planning with it. I describe it in more detail in [the Agent Context Engine explained](/en/blog/salesforce-agent-context-engine-explained/). But even the best context layer can only pass on what the data contains.

Cleaning up data is not glamorous work, and it is easy to push it to "later" or to someone else. In the projects that move forward, it is part of the project plan from the start.

## How should an Agentforce project start?

From what I have learned, this order works:

```schritte
Pick one narrow process
  Frequent, with clear rules and good documentation. Service questions answered from maintained knowledge articles or case summaries for service reps are typical candidates.
Measure the current state
  Before you build anything.
Fix the data
  For this one process, including knowledge, master data and permissions.
Build with a human in the loop
  For high-risk, high-value or irreversible decisions, such as larger discounts, refunds or contract changes, with defined thresholds for lower-risk cases. Approval can run through existing Salesforce approval processes or Flow, or through products such as Agentforce Operations; availability and licenses depend on the approach.
Test with real cases
  Including the awkward ones, and agree on what the agent must not do.
Go live in a limited scope
  In one channel or region, measure against the target and only then expand.
```

This is ordinary project discipline, applied to a new kind of system. Agents should go through the same release process as every other change, with supported metadata in the repository and deployment through a pipeline, plus documented setup steps for what Salesforce does not package, such as MCP server registrations, as I describe in [why DevOps decides Salesforce enterprise projects](/en/blog/why-devops-matters-salesforce-enterprise/).

## The architect asks whether the agent is worth its cost

On the client side, my job in Agentforce projects is to keep the focus on value and to make sure the foundations hold: data model, integrations, permissions and the release process. Partners and vendors understandably want to show what the technology can do. Someone has to ask whether a specific agent is worth its cost and whether the data supports it. That is a core part of [architecture and partner governance](/en/services/salesforce-architecture/).
