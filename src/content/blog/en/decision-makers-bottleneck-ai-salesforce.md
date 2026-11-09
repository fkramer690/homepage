---
title: "Decision makers as the bottleneck in AI Salesforce projects"
metaTitle: "Client decisions slow AI-driven Salesforce projects"
description: "With coding agents the team builds faster than the client decides. Why decision makers become the bottleneck and how to organize decisions instead."
pubDate: 2026-11-05
updatedDate: 2026-11-09
lang: en
slug: decision-makers-bottleneck-ai-salesforce
translationKey: decision-makers-bottleneck-ai
topic: governance
categories: [architecture, ai, change-management]
tags: [ai-native delivery, product owner, program management, decisions, change management, manufacturing]
takeaways:
  - "When an agent builds a story in a day but the answer to a question takes three, waiting for the client sets the pace of the project."
  - "Decision makers are tied up in daily business, processes are not agreed internally, and rarely does one person know the users' work and own the scope."
  - "More pressure on the same people does not remove the bottleneck; it produces decisions without alignment and with them changes after the build."
  - "Decision time belongs in the budget: a released product owner, process owners with decision authority and deadlines with clear escalation."
  - "If you measure blocked time for decisions and report it next to build time, you can show management why the project does not get faster."
faq:
  - q: "Why don't AI-driven Salesforce projects get faster automatically?"
    a: "Coding agents shorten the build, not the time until someone at the client decides on process and scope. If most of the lead time on the critical path is spent waiting for answers, faster building changes little."
  - q: "How much time does a product owner need in an AI-driven Salesforce project?"
    a: "In my estimate about half of their working time for one stream, when the team shows working software every day. It depends on team size, stakeholders and how much is delegated to process owners. Without a stand-in for their daily business, that time only exists on paper."
  - q: "Does the product owner have to answer every detailed business question?"
    a: "No. They own scope and priorities; process owners or key users answer detailed process questions within agreed guardrails, and the client-side architect answers technical ones."
  - q: "What if a decision does not come in time?"
    a: "Agree deadlines by type of decision and an escalation path. For low-risk, reversible decisions within agreed guardrails, the team's documented proposal can apply and go into the decision log. Data protection, pricing, warranty, permissions and irreversible migrations need an explicit approval, never silence."
draft: false
---

When coding agents speed up Salesforce delivery, the development team is often no longer the bottleneck. By AI-driven I mean AI in the delivery process, not introducing an AI product. Coding agents build a story in hours. What the team then waits for, in my experience, are the decision makers at the client: answers on the process, approvals, acceptance. These people are tied up in daily business, processes are often not agreed internally, and rarely does anyone know the users' daily work and own the scope at the same time. More pressure does not help. Decisions need their own budget, explicit and delegated decision rights and deadlines.

## Why does the decision maker become the bottleneck when AI builds?

A project is as fast as its slowest step. As long as developers needed weeks for a stream, nobody noticed that questions to the business sat for a few days. Coding agents can shrink the build time; the waiting time stays. I describe the flow in which the agent does the legwork and people decide at fixed gates in [AI-native Salesforce delivery process](../ai-native-salesforce-delivery-process/). It is my target picture; I already use single steps, not yet end to end. Even in that sketch, three of the five gates sit with the client.

The DORA report 2025 calls AI an amplifier: it magnifies the strengths of good organizations and the dysfunctions of the others. Google's [DORA post from December 2025](https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work?hl=en) warns that speed gains in single steps only pile up work in front of the next one; DORA names review, testing, security and deployment as examples. That client decisions become the next bottleneck is my own observation from projects, not a research result.

The Standish Group has long linked decision latency with project success, and the [SAFe Fellow Blog](https://framework.scaledagile.com/blog/safe-fellow-blog-improving-decision-latency) reads it as a stronger factor than the choice between agile and waterfall. The figures quoted from the CHAOS reports differ between secondary sources, so I do not repeat them here. My hypothesis: when building gets cheaper, decision speed weighs even more.

## Three reasons why decisions stall at the client

```praxis
In every one of my projects, user acceptance testing or the acceptance of stories took longer than the client had planned. The people on the client side were not available. Then change requests came up, because the business had not looked closely enough at its own solution and the status quo beforehand. Behind it I keep seeing the same patterns on the client side: decision makers tied up in daily business, processes not settled internally, and nobody close enough to the users' daily work who can still own the scope and direction of the project.
```

### Daily business wins

The head of service who is supposed to decide on the warranty claims process also runs a team. When a machine is down at a customer site, the machine wins. In a classic project this hardly showed, because between concept and acceptance testing the business had little to do for weeks anyway. With daily demos the team needs an answer every day. In [AI-native delivery: smaller Salesforce teams](../ai-native-delivery-smaller-salesforce-teams/) I estimate about half of the working time per stream. That rarely appears in the project plan.

### The process is not settled internally

Many of the team's questions are ones the company has not answered for itself yet: who approves a goodwill credit above 5,000 euros? Does the rule apply to dealer sales the same way as to direct sales? An agent turns an unclear story into something that runs within hours. That helps, because the business sees the gap in the prototype, and it gets expensive when the same story is rebuilt after every internal alignment.

Part of the delay sits with the delivery side too: questions without options, consequences or a recommendation, details escalated that the team could decide, stories in the build without clear acceptance criteria. Before a deadline applies to the client, a question has to be ready for decision.

### The person who can do both is rare

A product owner needs two things that pull apart in many organizations. They need to be close to the daily work of dispatchers or inside sales, or they decide past what those people need. And they need the mandate to cut scope and defend priorities against other departments. People close to daily business usually lack that mandate. People who have it are usually far from daily work.

## More pressure on decision makers does not raise throughput

Management hears that AI speeds up development and expects shorter, cheaper projects. When that does not happen, pressure rises on the people who already have too little time. They answer faster but with less alignment, and the alignment comes back after the build as a change.

A worked example with assumed figures shows why looking at development alone misleads. A story used to take five days of development and testing. On top, the business has to answer three of the team's questions one after the other, each of which blocks the story for two days: six days on the critical path. Lead time is eleven days. With a coding agent, build and review drop to a day and a half, lead time to seven and a half, of which 80 percent is waiting. That is a gain. If the next tool leap halves the build time again, lead time only drops to just under seven days, because almost 90 percent of it is waiting. Costs follow a similar pattern: the partner books fewer developer hours, but the hours for workshops, alignment and rework after late decisions stay, and blocked team capacity costs extra.

For management this means the saving at the partner is only part of the calculation. The other part is time from your own staff that never stood in a budget, because it was spread across a long project. With coding agents it falls into a few weeks and becomes visible. If you do not plan for it, you get a project that is cheaper on paper and takes longer in the calendar. How to measure whether a program gets faster with AI is in [Measuring AI productivity in Salesforce projects](../measuring-ai-productivity-salesforce-projects/).

## What helps against the bottleneck at the client?

The bottleneck shrinks when decisions are planned like any other project resource. I would agree these levers before the start:

```hebel
Budget decision time | Simple questions get answered within a day
  The product owner is released for a fixed share, and their manager arranges a stand-in for daily business. That time stands in the business case as a cost, next to the partner budget.
Spread decision rights | The product owner decides only what only they can decide
  Scope and priorities with the product owner, process details with process owners or key users within guardrails, technology with the client-side architect.
Settle processes before building | Fewer changes after the build
  Open process questions become their own tasks with an owner and a date; an unclear process goes into a time-boxed prototype, not as a supposedly finished story into the productive build.
```

Add a rule for questions: every question has a documented proposal from the team and a deadline by type, for example the next working day for reversible operational questions and two working days for questions that affect a stream. For low-risk, reversible decisions within agreed guardrails, the proposal applies without an answer and goes into the [decision log](../salesforce-architecture-decision-log/); whoever objects later raises a change request, not a silent rebuild. Data protection, pricing, warranty rules, permissions and irreversible migrations need explicit approval or escalation, never silence. The delay then no longer sits invisibly with the team.

The roles can be split like this:

```tabelle
title: Who decides what in the project
columns: | Decides | Hands off
Product owner | Scope, priorities, story acceptance * | Detailed process questions
Process owners, key users | Process details within the guardrails * | Anything that changes scope
Client-side architect | Data model, interfaces, technical guardrails * | Business priorities
Steering committee | Conflicts between departments, releasing people * | Daily decisions
note: A key user network only takes load off the product owner when it has its own decision authority.
```

How to build such a network is in [Salesforce key user network](../salesforce-key-user-network/). For the decision makers their own role changes, and that is a change like any other in the project. It needs communication and backing from the top. That is why it belongs in the [change management of my Salesforce programs](../../services/change-management-salesforce/), which I run together with Juliane Winterscheid.

## First step: measure the waiting time for decisions for two weeks

Before you rebuild roles, you need a figure management understands.

```schritte
Log questions | 2 weeks · team
  Every question to the business as a ticket with the date it was ready for decision, the date answered and whether it blocked the build.
Analyse waiting time | 1 day · project lead
  Median and 85th percentile of the answer time, blocked days per story on the critical path, rework after late decisions and the three most frequent topics.
Show it to the steering committee | next meeting
  Build time and waiting time side by side, with the request for released time and deadlines.
```

The analysis usually also shows which processes are not settled internally: that is where the questions pile up. Those processes are the first candidates for clarification before the next sprint, and the measurement is part of my [program management for Salesforce programs](../../services/program-management-nearshore/).
