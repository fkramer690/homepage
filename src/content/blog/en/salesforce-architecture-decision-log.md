---
title: "Decision log: traceable Salesforce architecture"
description: "Why a decision log for Salesforce architecture decisions survives partner changes, what goes into an entry and who the log should belong to."
pubDate: 2026-10-29
lang: en
slug: salesforce-architecture-decision-log
translationKey: architecture-decision-log
topic: governance
categories: [architecture]
tags: [decision log, architecture decision record, Salesforce architecture, partner governance]
takeaways:
  - "To Michael Nygard's ADR format I add two fields for Salesforce: which options were considered and who decided."
  - "Two years later the log answers why something was built this way, even when partners and people have long moved on."
  - "The log holds decisions that are expensive to change: clouds and add-ons, the leading system per object, data model, visibility and integration patterns."
  - "The log belongs to the client and lives in the client's tools. Partners propose entries, the architect on the client side keeps it current."
faq:
  - q: "What is a decision log?"
    a: "A decision log is a collection of short entries, each recording one architecture decision with its context, the options considered, the choice, the reasons and the consequences. In software development such an entry is called an architecture decision record, or ADR."
  - q: "Which decisions belong in the decision log?"
    a: "All decisions that are expensive to change later or that someone without context would question, such as choosing an industry cloud, the leading system for customers or prices, or the visibility model."
  - q: "Where should the decision log live?"
    a: "In a tool the client owns, for example as Markdown files in the repository or in the company wiki. If it lives with the partner, it leaves with the partner."
  - q: "Can a decision in the log be changed later?"
    a: "Yes, but never overwritten. The old decision gets the status superseded and a link to the new entry, so it stays visible what changed and why."
draft: false
---

A decision log records every Salesforce architecture decision with context, options considered, the choice, the reasons and the consequences, one short page per decision. It is the document that explains two years later why a process was built this way, even when the partner has long changed. The log holds the decisions that are expensive to change later: clouds and add-ons, the leading system per object, data model, visibility and integration patterns. It belongs to the client. Partners propose entries, and the architect on the client side maintains it.

## Why do architecture decisions get lost?

Architecture decisions are made in workshops, in calls and in comments on a ticket. Afterwards the result is in the system, the reasoning nowhere. As long as the same people are on the project, nobody notices. Two years later a new head of IT asks why dealers are modelled as accounts rather than partner accounts, and nobody can answer.

Then one of two things happens. Either nobody dares to touch the decision and the team builds around it. Or a new partner rolls it back because they do not know the reasons, and runs into exactly the problem the original decision solved. Both cost more than the half hour an entry takes to write.

In programmes with several partners a third effect comes on top: every partner documents in their own Confluence. When the partner leaves, the reasoning leaves with them.

## What is a decision log?

In software development such an entry is called an architecture decision record, or ADR. Michael Nygard described the format in 2011 ([Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)): title, context, decision, status and consequences. For Salesforce programmes I add two fields, because steering committees always ask for them: which options were considered and who decided.

```vertiefung Template
title: What goes into an entry?
- **Title and number**, for example "D-014: Manufacturing Cloud will not be used".
- **Status:** proposed, decided, or superseded by another entry.
- **Context:** the starting point in two to four sentences, with facts instead of opinions.
- **Options:** what was considered, each with pros and cons.
- **Decision:** the choice in one sentence.
- **Reasons:** why this option, with numbers where they exist.
- **Consequences:** what becomes easier, harder or more expensive as a result.
- **Who and when:** date and the person or board that decided.
```

An entry fits on one page. If it gets longer, it usually contains two decisions.

## Which decisions belong in the log?

Not every field decision needs an entry. My rule of thumb: the log holds whatever is expensive to change later or whatever someone without context would question.

| Area | Example of a decision |
|---|---|
| Clouds and add-ons | Field Service yes, Manufacturing Cloud no |
| Leading system | the ERP leads prices, Salesforce leads contacts |
| Data model | dealers as accounts with partner access, machines as assets with a hierarchy |
| Visibility | accounts private, visibility by country through the role hierarchy |
| Integration | orders through middleware, stock read live instead of copied |
| Custom build | own configurator instead of a standard product |
| Platform | one org for all countries instead of one org per region |

The choice of clouds and add-ons is the most important area, because partners or the vendor regularly propose a product again. If the reasoning is in the log, the answer takes five minutes instead of a new assessment. How I calculate such assessments is described under [make-or-buy and licences](../../services/make-or-buy-licences/).

```praxis
In one manufacturing project I assessed Manufacturing Cloud and rejected it, because sales agreements were not relevant to this client's business. This is exactly the kind of decision that belongs in the log: when the product comes up again next year, the entry says why it does not fit and what would have to change for it to fit.
```

The questions such an assessment has to answer are in [Salesforce Manufacturing Cloud: is it worth it?](../salesforce-manufacturing-cloud-is-it-worth-it/).

## The log belongs to the client and lives in the client's repository

The log belongs to the client and lives in the client's tools. I prefer to keep it as Markdown files in the org's repository, one file per decision. That way it is versioned, changes go through a pull request, and a developer finds the reasoning right next to the code. If the company maintains its own wiki, that works too, as long as it does not belong to the partner. The reasons are the same as for [repository and pipeline](../why-clients-should-own-their-devops-tools/).

The roles are simple:

- **Partners propose entries** when their design touches an architecture question. A pull request that introduces a new integration or a new object refers to the entry.
- **The architect on the client side** reviews the proposal, adds options and keeps the log current. When the build drifts from the target picture, they raise it with a reference to the entry.
- **Business and IT leadership** decide the big entries, such as clouds and add-ons, and are named in them.

A decision is never overwritten. When the situation changes, the old entry gets the status "superseded" and a link to the new one. That keeps visible what applied before and why it changed.

## In the running programme: new partners, design reviews, steering committee

A log nobody reads is paperwork. Three occasions make it useful:

- **Onboarding new partners.** A new partner reads the entries before writing their first proposal. That removes the suggestions to roll back something that is the way it is for a good reason.
- **Reviewing partner designs.** Before a design is built, I check it against the entries. If it contradicts a decision, there are two ways forward: adjust the design, or propose a new entry that supersedes the old decision.
- **Steering committee.** When a decision is questioned there, the entry with options and reasons is on the table. The discussion then starts with what has changed since.

## First step: write up the five most questioned decisions

Begin with the five decisions that are questioned most often in your programme; you do not need a wiki template for that. The first entry is almost always the question that stayed open in the last steering committee. Write an entry for each, even after the fact. From then on the rule is that every new architecture decision needs an entry before anything is built. After six months you have twenty to thirty entries and documentation a new partner can read in an afternoon. How I run the log as the architect on the client side is described under [Salesforce architecture on the client side](../../services/salesforce-architecture/).
