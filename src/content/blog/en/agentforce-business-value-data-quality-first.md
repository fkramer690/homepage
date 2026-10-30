---
title: "Agentforce pilots: business value and data quality first"
description: "Most companies have tried Agentforce, but many projects stall in pilot. Why business value and data quality decide success, and how to start the right way."
pubDate: 2026-10-23
lang: en
slug: agentforce-business-value-data-quality-first
translationKey: agentforce-business-value-data-quality
topic: ai
categories: [ai]
tags: [agentforce, ai agents, data quality, business case, architecture]
takeaways:
  - "According to an Oppenheimer survey, 85 percent of Salesforce customers have tested or deployed Agentforce, but nearly half are still in pilot or testing."
  - "Agentforce projects rarely fail on the technology; they fail on a missing business case, poor data quality and unclear permissions."
  - "Every agent needs one measurable business goal before the first prompt is written, for example handling time, first-contact resolution or hours saved per week."
  - "An agent can only be as good as the data and knowledge it reads; cleaning up master data, knowledge articles and access rules is part of the project, not a prerequisite someone else handles."
  - "Start with a narrow, high-volume use case, keep a human in the loop for decisions with consequences and measure from day one."
faq:
  - q: "Why do so many Agentforce projects stay in the pilot phase?"
    a: "Common reasons are a missing business case, data that is incomplete or inconsistent, unclear access rights and no agreed way to measure success. The technology itself is rarely the bottleneck."
  - q: "What should an Agentforce business case contain?"
    a: "One clear process, the current volume and cost, a measurable target such as shorter handling time or more cases solved without escalation, the expected consumption costs and who owns the result on the business side."
  - q: "How important is data quality for AI agents?"
    a: "Decisive. An agent answers and acts based on CRM data, knowledge articles and connected systems. Duplicates, outdated records or contradictory articles lead directly to wrong answers or wrong actions."
  - q: "Which use case is a good first Agentforce project?"
    a: "A narrow, frequent and well-documented process with clear rules, for example answering standard service questions from maintained knowledge articles or preparing case summaries for service reps."
---

Agentforce projects succeed when business value and data quality come first and the technology comes second. Most Salesforce customers have tried Agentforce by now, yet many projects never leave the pilot phase. In my experience the reason is rarely the agent itself. It is a missing business case, data the agent can't trust and access rules nobody thought through. My own first Agentforce pilot was what we call a green banana in German: a product delivered before it was ripe. Today several Agentforce projects I am involved in are being implemented, and the difference lies almost entirely in how they started.

## Where does Agentforce adoption really stand?

The numbers from October 2026 show a split picture. An Oppenheimer survey of Salesforce customers, [reported by Salesforce Ben](https://www.salesforceben.com/85-of-customers-have-tried-agentforce-but-demand-hasnt-picked-up-why/), found that 85 percent have tested or deployed Agentforce. In the same survey nearly half said they were still in the pilot or testing stage. Salesforce itself reports more than 29,000 paid deals.

At the same time, demand for Agentforce skills is growing fast. According to the 10K talent report, also [covered by Salesforce Ben](https://www.salesforceben.com/agentforce-jobs-are-booming-while-projects-stall-in-pilot/), mentions of Agentforce in Salesforce job listings rose by 63 percent year on year, while overall Salesforce talent demand fell by 13 percent.

![Agentforce in October 2026: 85% of surveyed Salesforce customers have tested or deployed Agentforce, nearly half say they are still in the pilot or testing stage, Salesforce reports more than 29,000 paid deals, and Agentforce mentions in Salesforce job listings rose 63% year on year while overall Salesforce talent demand fell 13%. Plenty of interest, plenty of demos, production use lags behind.](../../../assets/blog/agentforce-adoption-en.png)

So companies are experimenting and hiring, but production use lags behind. That matches what I see on the client side: plenty of interest, plenty of demos, and a gap between a convincing demo and an agent that works reliably every day.

## What did I learn from my first pilot?

```praxis
The first Agentforce pilot I was involved in was simply too early. The platform was young and not yet mature enough for what we wanted to do. That is a normal risk with new technology, and it taught me to look harder at the conditions around an agent than at the agent itself.
```

Three conditions have to be in place before a pilot starts:

- **A measurable goal.** "Try out AI in service" is not a goal. Without a number to improve, nobody can decide whether the pilot was a success.
- **Reliable data.** An agent reads knowledge articles and CRM records that were usually never maintained with an automated reader in mind. Duplicates and outdated content show up in the answers immediately.
- **Clear ownership on the business side.** If IT runs the pilot alone and nobody in the department owns the result, the pilot ends as a demo.

The projects that are now in implementation are built on these conditions, and they are moving.

## Why does business value come first?

An AI agent costs money in several ways: licences or consumption credits, implementation, testing, maintenance and the time of the people who supervise it. Salesforce bundles consumption credits into its editions, and partners and customers are still discussing how agentic API and MCP calls are charged. That makes a clear business case more important, not less.

A good Agentforce business case answers a few simple questions:

1. **Which process?** One process, described concretely, for example "answering questions about delivery status from B2B customers".
2. **How big is it today?** Volume per month, average handling time, cost per case, error rate.
3. **What should change?** A target number, for example 30 percent of requests answered without a service rep, or two minutes less handling time per case.
4. **What does it cost?** Implementation, expected consumption, and the effort for maintaining knowledge and testing.
5. **Who owns the result?** A person in the business, not in IT, who reports whether the target is reached.

If a use case can't answer these questions, it is not ready for an agent. That is not a failure. It saves money that would otherwise go into a pilot nobody can evaluate.

## Why is data quality the second deciding factor?

An agent answers and acts on the basis of what it can read: CRM records, knowledge articles, documents and data from connected systems. Whatever is wrong there becomes a wrong answer or a wrong action, delivered with great confidence.

In practice I check these points before an agent goes live:

- **Master data.** Are accounts, contacts and assets free of duplicates? Is it clear which record is the right one? An agent that picks the wrong account sends the wrong information to the wrong customer.
- **Knowledge.** Are knowledge articles current, consistent and owned by someone? Two articles with contradictory return policies will produce contradictory answers.
- **Process data.** Are statuses, dates and fields maintained reliably? If the delivery date in Salesforce is only updated once a week, the agent will give outdated answers.
- **Access rights.** What may the agent see, and what may it show to whom? Sharing rules, field-level security and data classification must be right before an agent works with them, because Salesforce applies them to agents too.

Salesforce is building more tooling for this, such as the Agent Context Engine, which assembles governed context for agents from Data 360. I describe it in more detail in [the Agent Context Engine explained](../salesforce-agent-context-engine-explained/). But even the best context layer can only pass on what is in the data.

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
  For every decision with consequences, such as discounts, refunds or contract changes. Salesforce now offers approval steps where an agent hands such decisions to a person.
Test with real cases
  Including the awkward ones, and agree on what the agent must not do.
Go live in a limited scope
  In one channel or region, measure against the target and only then expand.
```

This is ordinary project discipline, applied to a new kind of system. Agents should go through the same release process as every other change, with configuration in the repository and deployment through a pipeline, as I describe in [why DevOps decides Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/).

## What role does the architect play?

On the client side, my job in Agentforce projects is to keep the focus on value and to make sure the foundations hold: data model, integrations, permissions and the release process. Partners and vendors understandably want to show what the technology can do. Someone has to ask whether a specific agent is worth its cost and whether the data supports it. That is a core part of [architecture and partner governance](../../services/salesforce-architecture/).

Agentforce can deliver real value, but only where a clear business goal meets data the agent can trust.
