---
title: "Change management process in a Salesforce project"
description: "Which change work belongs in which phase of a Salesforce project, from planning through build and acceptance testing to go-live and operations, with outputs."
pubDate: 2026-10-29
lang: en
slug: change-management-process-salesforce
translationKey: change-process-salesforce
topic: governance
categories: [change-management]
coAuthor: juliane
contactBrief: change
tags: [change management process, Prosci, ADKAR, Salesforce rollout, project phases]
takeaways:
  - "The change management process runs alongside the Salesforce project plan, not after it. Every project phase has its own change task with a tangible output."
  - "Planning produces the most important part: which groups are affected, what changes for each, who in management backs it and how success is measured."
  - "During build and acceptance testing, key users get involved, communication and training are prepared and resistance is spotted early."
  - "At go-live you have to make sure there is no way back to the old way of working. Otherwise no change happens."
  - "After go-live it is decided whether the change lasts: measure, close gaps and hand ownership to internal roles."
faq:
  - q: "What does a change management process look like?"
    a: "According to Prosci, three phases: prepare approach, manage change, sustain outcomes. In a Salesforce project they run in parallel to planning, build, acceptance testing, go-live and operations."
  - q: "When does change management start in a Salesforce project?"
    a: "In planning, before anything is built. Which groups are affected and what changes for them also shapes the solution itself. Starting just before go-live leaves room only for information."
  - q: "What is a change impact assessment?"
    a: "An overview per affected group of what changes for them, for example processes, systems, roles, behaviours or reporting lines. It is the basis for communication, training and the sponsor plan."
  - q: "When does the change management process end?"
    a: "When the new way of working is measurably in use and internal roles have taken over ownership, so well after go-live. In a rollout in waves it starts again in every country."
draft: false
---

The change management process in a Salesforce project runs in parallel to the project plan, and every project phase has its own change task. In planning you clarify which groups are affected, what changes for each, who in management backs it and how you measure success. During build and acceptance testing you involve key users and prepare communication and training. At go-live you make sure there is no way back. Afterwards you measure usage, close gaps and hand ownership to internal roles. I follow the Prosci process and translate it into the phases of a Salesforce project.

## How does the change management process attach to the project plan?

Prosci structures the work in three phases: prepare approach, manage change, sustain outcomes. What the phases mean in general is explained by Juliane Winterscheid in [What is change management?](../what-is-change-management/), and how Prosci differs from Lewin and Kotter in [Change management models compared](../change-management-models/). Here the question is the one that matters in a project: what has to happen in which project phase, and what is on the table at the end?

| Project phase | Prosci phase | Change work | Output |
|---|---|---|---|
| Planning | Prepare approach | Clarify affected groups and impact, win a sponsor, define success | Impact assessment, sponsor plan, metrics with baseline |
| Design and build | Manage change | Involve key users, plan per group along ADKAR, start communication | Plan per group, communication plan |
| Acceptance testing | Manage change | Key users test their own cases, prepare training, check resistance | Training plan, list of open concerns |
| Go-live | Manage change | Training, close old routes, start hypercare | Switch-off date for old lists, hypercare team |
| Operations | Sustain outcomes | Measure usage, close gaps, hand over ownership | Monthly report to sponsor, handover to internal roles |

The table describes a release with one big go-live. In a rollout in waves the sequence runs again for every country from design onwards, as described in [Change management in a global Salesforce rollout](../change-management-global-salesforce-rollout/).

## What belongs in planning?

Planning decides the most, and this is exactly where change management is most often missing. Three outputs should be in place before anything is built.

**An impact assessment per group.** Prosci looks at ten aspects of a change, among them processes, systems, tools, job roles, critical behaviours, reporting structure and performance reviews ([Prosci: Defining Change Impact](https://www.prosci.com/blog/defining-change-impact)). In a Salesforce project at a manufacturer it can look like this: inside sales creates quotes in the configurator instead of Word (process, tool). Sales maintains opportunities that feed the sales forecast (behaviour). Sales management discusses the pipeline from a dashboard instead of an Excel list (reporting). The more aspects change for a group, the more support it needs.

**A sponsor plan.** It defines who in management carries the rollout and what that person visibly does when: explain in the sales meeting why forecasts will come from Salesforce, decide when departments disagree, ask about usage in the monthly report.

**Success metrics with a baseline.** How will you know in six months that the process has landed? For example by the share of quotes that come from Salesforce. Measure the baseline before go-live, otherwise there is nothing to compare against. Which figures work is covered in [Measuring Salesforce adoption after go-live](../salesforce-adoption-metrics-after-go-live/).

```praxis
Many clients think at first that training is enough change management. That is why I do not raise the topic only once, but again in planning, before every country and after every go-live.
```

It has the strongest effect in planning, because the impact assessment can still shape the solution itself there.

## What happens during build and acceptance testing?

This is when the actual steering happens. For every affected group a plan is built along the five ADKAR stages: who explains why things change, who builds desire, when training happens, who helps in daily work, how it gets reinforced. How to find out at which stage a group is stuck is shown in the masterclass chapter [ADKAR model: diagnosis for Salesforce rollouts](../../masterclass/change-management/change-management-adkar-diagnosis/).

Three things work particularly well in this phase:

- **Involve [key users](../salesforce-key-user-network/).** They describe their team's processes, help write acceptance criteria and test their own cases in acceptance testing. Whoever helped build the solution will defend it in the team later.
- **Communicate early.** Affected people learn before the build what is coming, and before every release what changes. How that works for ongoing releases is covered in [Communicating Salesforce releases to the business](../salesforce-release-communication-business/).
- **Take concerns seriously.** Questions and objections from workshops and acceptance testing go on a list with an answer and an owner. An objection raised in acceptance testing comes back as an Excel list after go-live if nobody answers it.

At the end of acceptance testing the [training plan](../salesforce-training-plan-rollout/) is in place: which role learns which processes, in which format and when.

## What changes at go-live?

At go-live comes the part many projects underestimate. I make sure there is no way back. As long as the option to work the old way remains, no change happens. That means: old templates and lists get a switch-off date that leadership announces, and reports to the management board come from Salesforce from that day on.

```hinweis achtung
A go-live without a switch-off date for the old routes is parallel operation without an end. Set the date with the sponsor before training starts, and say it in every training session.
```

At the same time [hypercare](../salesforce-hypercare-after-go-live/) begins. Project team, partners and key users stay more available, defects are fixed quickly and small improvements from feedback are delivered as quick wins. For the change management process it is the most important source: the questions of the first weeks show which group is stuck where.

## How do you sustain the outcome after go-live?

The third Prosci phase starts after go-live and is the one most often cut, because the project team moves on. It has three parts. First, measure: the sponsor gets the metrics from planning every month, per group and country. Second, close gaps: where usage stalls, ask for the missing ADKAR stage instead of retraining by default. Third, hand over ownership: internal roles take over what the project built, such as the key user exchange, release communication and regular meetings like a [Center of Excellence call](../salesforce-center-of-excellence-cadence/) where new topics come up in advance.

The process ends when the new way of working is measurably in use and nobody from the project is needed for it any more. That is well after go-live.

## Where should you start?

Take the project plan of your next Salesforce initiative and write down for every phase which change output should exist at its end. If planning is missing the impact assessment, the sponsor plan or the metrics, that is your first step. The hub article [Salesforce change management: why rollouts fail](../change-management-salesforce-rollout/) shows which topics belong to it.

Change management is a process that starts with the project plan and ends after go-live. Read more about [Salesforce change management consulting](../../services/change-management-salesforce/).
