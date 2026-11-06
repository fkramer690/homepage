---
title: "Decision makers as the bottleneck in AI Salesforce projects"
metaTitle: "Client decisions slow AI-driven Salesforce projects"
description: "With coding agents the team builds faster than the client decides. Why decision makers become the bottleneck and how to organise decisions instead."
pubDate: 2026-11-05
lang: en
slug: decision-makers-bottleneck-ai-salesforce
translationKey: decision-makers-bottleneck-ai
topic: governance
categories: [architecture, ai, change-management]
tags: [ai-native delivery, product owner, programme management, decisions, change management, manufacturing]
takeaways:
  - "When an agent builds a story in a day but the answer to a question takes three, waiting for the client sets the pace of the project."
  - "Decision makers are tied up in daily business, processes are not agreed internally, and rarely does one person know the users' work and own the scope."
  - "More pressure on the same people does not remove the bottleneck; it produces decisions without alignment and with them changes after the build."
  - "Decision time belongs in the budget: a released product owner, process owners with their own rights and a deadline with a default rule for every question."
  - "If you measure the waiting time for decisions and report it next to build time, you can show management why the project does not get faster."
faq:
  - q: "Why don't AI-driven Salesforce projects get faster automatically?"
    a: "Coding agents shorten the build, not the time until someone at the client decides on process and scope. If most of the lead time is spent waiting for answers, faster building changes little."
  - q: "How much time does a product owner need in an AI-driven Salesforce project?"
    a: "In my estimate about half of their working time per stream, when the team shows working software every day. Without a stand-in for their daily business, that time only exists on paper."
  - q: "Does the product owner have to answer every detailed business question?"
    a: "No. They own scope and priorities; process owners or key users answer detailed process questions within agreed guardrails, and the client-side architect answers technical ones."
  - q: "What if a decision does not come in time?"
    a: "Agree a deadline, for example two working days, and a default rule: without an answer the team's documented proposal applies and goes into the decision log. Anyone who objects later raises a change request."
draft: false
---

In an AI-driven Salesforce project the development team is no longer the bottleneck. Coding agents build a story in hours, the developer reviews, the pipeline checks. What the team waits for are the decision makers at the client: answers on the process, approvals, acceptance. These people are tied up in daily business, processes are often not agreed internally, and rarely does anyone know the users' daily work and own the scope at the same time. Raising the pressure on these people does not make the project faster. Decisions need their own budget, shared decision rights and deadlines.

## Why does the decision maker become the bottleneck when AI builds?

A project is as fast as its slowest step. As long as developers needed weeks for a stream, nobody noticed that questions to the business sat for a few days. Coding agents shrink the build time, the waiting time stays. I describe the flow in which the agent does the legwork and people decide at fixed gates in [AI-native Salesforce delivery process](../ai-native-salesforce-delivery-process/). It is my target picture; I already use single steps, not yet end to end. Even in that sketch, three of the five gates sit with the client.

The DORA report 2025 calls AI an amplifier: it magnifies the strengths of good organisations and the dysfunctions of the others. Google's [DORA post from December 2025](https://cloud.google.com/blog/products/ai-machine-learning/from-adoption-to-impact-putting-the-dora-ai-capabilities-model-to-work?hl=en) warns that speed gains in single steps only pile up work in front of the next one. An older figure from the Standish Group shows how much decision speed decides projects:

```kennzahlen
75 % | of projects with decisions in hours or days were successful
21 % | where decisions took weeks or months
source: Standish Group, CHAOS 2020, quoted in the SAFe Fellow Blog "Improving Decision Latency"
```

The figures date from before coding agents. The [analysis in the SAFe Fellow Blog](https://framework.scaledagile.com/blog/safe-fellow-blog-improving-decision-latency) names decision latency as a stronger factor than the choice between agile and waterfall. When building gets cheaper, that factor weighs even more.

## Three reasons why decisions stall at the client

```praxis
In every one of my projects, user acceptance testing or the acceptance of stories took longer than the client had planned. The people on the client side were not available. Then change requests came up, because the business had not looked closely enough at its own solution and the status quo beforehand. Behind it I always see the same patterns: decision makers tied up in daily business, processes not settled internally, and nobody close enough to the users' daily work who can still own the scope and direction of the project.
```

### Daily business wins

The head of service who is supposed to decide on the warranty claims process also runs a team. When a machine is down at a customer site, the machine wins. In a classic project this hardly showed, because between concept and acceptance testing the business had little to do for weeks anyway. With daily demos the team needs an answer every day. In [AI-native delivery: smaller Salesforce teams](../ai-native-delivery-smaller-salesforce-teams/) I estimate about half of the working time per stream. That rarely appears in the project plan.

### The process is not settled internally

Many of the team's questions are ones the company has not answered for itself yet: who approves a goodwill credit above 5,000 euros? Does the rule apply to dealer sales the same way as to direct sales? An agent turns an unclear story into something that runs within hours. That helps, because the business sees the gap in the prototype, and it gets expensive when the same story is rebuilt after every internal alignment.

### The person who can do both is rare

A product owner needs two things that pull apart in many organisations. They need to be close to the daily work of dispatchers or inside sales, or they decide past what those people need. And they need the mandate to cut scope and defend priorities against other departments. People close to daily business usually lack that mandate. People who have it are usually far from daily work.

## More pressure on decision makers speeds up nothing

Management hears that AI speeds up development and expects shorter, cheaper projects. When that does not happen, pressure rises on the people who already have too little time. They answer faster and with less alignment, and the alignment comes back after the build as a change.

A worked example with assumed figures shows why looking at development alone misleads. A story used to take five days of development and testing. On top, the business has to answer three of the team's questions, each of which waits two days: six days. Lead time is eleven days. With a coding agent, build and review drop to a day and a half, lead time to seven and a half. That is a gain. If the next tool leap halves the build time again, lead time only drops to just under seven days, because 80 percent of it is waiting. Costs behave the same way: the partner books fewer developer hours, but the hours for workshops, alignment and rework after late decisions stay.

For management this means the saving at the partner is only half of the calculation. The other half is time from your own staff that never stood in a budget, because it was spread across a long project. With coding agents it falls into a few weeks and becomes visible. If you do not plan for it, you get a project that is cheaper on paper and takes longer in the calendar. How to measure whether a programme gets faster with AI is in [Measuring AI productivity in Salesforce projects](../measuring-ai-productivity-salesforce-projects/).

## What helps against the bottleneck at the client?

The bottleneck goes away when decisions are planned like any other project resource. I would agree these levers before the start:

```hebel
Budget decision time | Questions get answered the same day
  The product owner is released for a fixed share, and their manager arranges a stand-in for daily business. That time stands in the business case as a cost, next to the partner budget.
Spread decision rights | The product owner decides only what only they can decide
  Scope and priorities with the product owner, process details with process owners or key users within guardrails, technology with the client-side architect.
Settle processes before building | Fewer changes after the build
  Open process questions become their own tasks with an owner and a date; no story with an unclear process goes into the build.
```

Add a rule for questions: every question has a deadline, for example two working days, and a documented proposal from the team. Without an answer the proposal applies and goes into the [decision log](../salesforce-architecture-decision-log/). Anyone who objects later raises a change request, not a silent rebuild. The delay then no longer sits invisibly with the team.

The roles can be split like this:

```tabelle
title: Who decides what in the project
columns: | Decides | Hands off
Product owner | Scope, priorities, acceptance of the stream * | Detailed process questions
Process owners, key users | Process details within the guardrails * | Anything that changes scope
Client-side architect | Data model, interfaces, technical guardrails * | Business priorities
Steering committee | Conflicts between departments, releasing people * | Daily decisions
note: A key user network only takes load off the product owner when it has its own rights.
```

How to build such a network is in [Salesforce key user network](../salesforce-key-user-network/). For the decision makers their own role changes, and that is a change like any other in the project. It needs communication and backing from the top. That is why it belongs in the [change management of my Salesforce programmes](../../services/change-management-salesforce/), which I run together with Juliane Winterscheid.

## First step: measure the waiting time for decisions for two weeks

Before you rebuild roles, you need a figure management understands.

```schritte
Log questions | 2 weeks · team
  Every question to the business as a ticket with the date asked and the date answered.
Analyse waiting time | 1 day · project lead
  Share of waiting time in the lead time per story and the three most frequent topics of the questions.
Show it to the steering committee | next meeting
  Build time and waiting time side by side, with the request for released time and deadlines.
```

The analysis usually also shows which processes are not settled internally: that is where the questions pile up. Those processes are the first candidates for clarification before the next sprint, and the measurement is part of my [programme management for Salesforce programmes](../../services/program-management-nearshore/).
