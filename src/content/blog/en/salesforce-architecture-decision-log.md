---
title: "Decision log: traceable Salesforce architecture"
description: "Why a decision log for Salesforce architecture decisions survives partner changes, what goes into an entry and who the log should belong to."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-architecture-decision-log
translationKey: architecture-decision-log
topic: governance
categories: [architecture]
tags: [decision log, architecture decision record, Salesforce architecture, partner governance]
takeaways:
  - "To Michael Nygard's ADR format I add options, license and cost impact, assumptions, who decided and when to reconsider."
  - "Two years later, the log explains why something was built this way, even when partners and people have long moved on."
  - "The log holds decisions that are expensive to change: clouds and add-ons, the leading system per data domain, data model, visibility and integration."
  - "The log belongs to the client and is kept in its tools. Partners and internal teams propose entries; the client's architecture team keeps it current."
faq:
  - q: "What is a decision log?"
    a: "A decision log is a collection of short entries, each recording one architecture decision with its context, the options considered, the choice, the reasons and the consequences. In software development such an entry is called an architecture decision record, or ADR."
  - q: "Which decisions belong in the decision log?"
    a: "All decisions that are expensive to change later or that someone without context would question, such as choosing an industry cloud, the leading system for customers or prices, or the visibility model."
  - q: "Where should the decision log live?"
    a: "The decision log should live in a tool the client owns, for example as Markdown files in the repository or in the company wiki. If it is kept by the partner, it leaves with the partner."
  - q: "Can a decision in the log be changed later?"
    a: "Yes, but an accepted decision is never silently rewritten. A material change is recorded in a new entry; the old one receives the status superseded and a link to it. Small corrections such as links or names stay visible in the version history."
draft: false
---

A decision log records the material Salesforce architecture decisions with context, options considered, the choice, the reasons and the consequences, one short page per decision. It is the document that explains two years later why a process was built this way, even after the partner has changed. The log holds the decisions that are expensive to change later: clouds and add-ons, the leading system per data domain, data model, visibility and integration patterns. It belongs to the client. Partners and internal teams propose entries, and the client's architecture team maintains it.

## Why do architecture decisions get lost?

Architecture decisions are made in workshops, in calls and in comments on a ticket. Afterwards, the result is in the system, but the reasoning is nowhere to be found. As long as the same people are on the project, nobody notices. Two years later a new head of IT asks why dealer accounts were never enabled as partner accounts with partner users, and nobody can answer.

Then one of two things happens. Either nobody dares to touch the decision and the team builds around it. Or a new partner rolls it back because they do not know the reasons, and runs into exactly the problem the original decision solved. Both cost more than the half hour an entry takes to write.

In programs with several partners a third effect is added: every partner documents in their own Confluence. When the partner leaves, the reasoning leaves with them.

## What is a decision log?

In software development such an entry is called an architecture decision record, or ADR. Michael Nygard described the format in 2011 ([Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)): title, context, decision, status and consequences. For Salesforce programs, I add fields that steering committees and license reviews need: which options were considered, the license and cost impact, the assumptions behind the decision, who decided and when to review it again. Salesforce's [Well-Architected guidance](https://architect.salesforce.com/docs/architect/well-architected/guide/resource-and-cost-optimization-governance-patterns.html) also treats ADRs alongside license and cost analysis.

```vertiefung Template
title: What goes into an entry?
- **Title and number**, for example "D-014: Manufacturing Cloud will not be used".
- **Status:** proposed, accepted, rejected, deprecated, or superseded by another entry.
- **Context:** the starting point in two to four sentences, with facts instead of opinions.
- **Options:** what was considered, each with pros and cons.
- **Decision:** the choice in one sentence.
- **Reasons:** why this option, with numbers where they exist.
- **Consequences:** what becomes easier, harder or more expensive as a result.
- **License and cost impact:** products, editions and add-ons needed, recurring cost.
- **Assumptions:** user groups, volumes and limits the decision rests on.
- **Reconsider when:** the change that would reopen the decision.
- **Who and when:** date and the role or board that decided.
```

An entry fits on one or two pages. If it gets longer, it usually contains two decisions.

## Which decisions belong in the log?

Not every field-level decision needs an entry. My rule of thumb: the log holds whatever is expensive to change later or whatever someone without context would question.

| Area | Example of a decision |
|---|---|
| Clouds and add-ons | Agentforce Field Service and Operations (formerly Field Service) yes, Manufacturing Cloud no |
| Leading system | the ERP leads list prices, Salesforce leads quote discounts and sales contacts |
| Data model | dealers as accounts with partner access, machines as assets with a hierarchy |
| Visibility | accounts private; managers see their country through role branches, sharing rules or territories add access across countries |
| Integration | orders through middleware, stock read live instead of copied |
| Custom build | own configurator instead of a standard product |
| Platform | one org for all countries instead of one org per region |

The choice of clouds and add-ons is one of the areas that most often needs a durable record, because partners or the vendor regularly propose a product again. If the reasoning is in the log, the answer takes five minutes instead of a new assessment. I describe how I evaluate such assessments in [make-or-buy and licenses](../../services/make-or-buy-licences/).

```praxis
In one manufacturing project, I assessed Manufacturing Cloud against the program's scope and rejected it because sales agreements, the core of the product at the time, were not relevant to this client's business. This is exactly the kind of decision that belongs in the log: when the product is proposed again next year, the entry explains why it does not fit and what would have to change for it to fit.
```

I discuss the questions such an assessment has to answer in [Salesforce Manufacturing Cloud: is it worth it?](../salesforce-manufacturing-cloud-is-it-worth-it/).

## The log belongs to the client and lives in the client's repository

The log belongs to the client and is kept in the client's tools. I prefer to keep it as Markdown files in the client-owned Salesforce source repository, one file per decision. That way it is versioned, changes go through a pull request, and a developer finds the reasoning right next to the code. Heads of service or sales rarely open a repository, so I publish a readable view in the company wiki or keep the log in the wiki itself, as long as it does not belong to the partner. The reasons are the same as those I describe in [repository and pipeline](../why-clients-should-own-their-devops-tools/).

The roles are simple:

- **Partners and internal teams propose entries** when their design touches an architecture question. A pull request that introduces a new integration or a new object refers to the entry.
- **The client's architecture team**, led by the architect on the client side with a named deputy, reviews the proposal, adds options and keeps the log current. When the build deviates from the target architecture, they raise it with a reference to the entry.
- **Business and IT leadership** make the major decisions, such as clouds and add-ons, and are named in the corresponding entries.

An accepted decision is never silently rewritten. When the situation changes materially, the old entry receives the status "superseded" and a link to the new one. Corrections to links, names or owners stay visible in the version history. That makes it clear what applied before and why it changed.

## In the running program: new partners, design reviews, steering committee

A log nobody reads is paperwork. Three occasions make it useful:

- **Onboarding new partners.** A new partner reads the entries before writing their first proposal. That prevents proposals to reverse something that was designed that way for a good reason.
- **Reviewing partner designs.** Before a design is built, I check it against the entries. If it contradicts a decision, there are two ways forward: adjust the design, or propose a new entry that supersedes the old decision.
- **Steering committee.** When a decision is questioned there, the entry with options and reasons is on the table. The discussion then starts with what has changed since.

## Write up the five most questioned decisions

Begin with the five decisions that are questioned most often in your program; you do not need a wiki template for that. The first entry is almost always the question that remained unresolved in the last steering committee. Write an entry for each, even after the fact. From then on, the rule is that a material architecture decision must be accepted before implementation for production begins. Urgent changes go through a fast track and are documented within a few days. After six months you have twenty to thirty entries and documentation a new partner can read in an afternoon. I describe how I run the log as the architect on the client side in [Salesforce architecture on the client side](../../services/salesforce-architecture/).
