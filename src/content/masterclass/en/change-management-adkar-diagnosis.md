---
title: "ADKAR model: a diagnosis for Salesforce rollouts"
description: "The ADKAR model as a diagnosis: why Salesforce rollouts at manufacturers get stuck in daily work, which stage is missing per group and what to settle first."
lang: en
slug: change-management-adkar-diagnosis
course: change-management
translationKey: cm-01
chapter: 1
pubDate: 2026-10-29
short: "ADKAR as a diagnosis"
summary: "Why rollouts get stuck in daily work, how ADKAR shows the cause per group and what has to be settled before the first release."
takeaways:
  - "A Salesforce rollout rarely fails on technology. It fails when people keep working in Excel, email and their own lists after go-live."
  - "ADKAR splits the change into five stages: awareness, desire, knowledge, ability and reinforcement. Training helps with knowledge and ability only."
  - "The diagnosis runs per affected group, because inside sales, field teams and partners get stuck at different stages."
  - "Before the first release three answers are written down: which groups are affected, what changes for each and who in management visibly backs it."
articles: [change-management-hub, salesforce-center-of-excellence, change-adoption-metrics]
faq:
  - q: "What is the ADKAR model?"
    a: "A model by Prosci with five stages every person goes through in a change: awareness, desire, knowledge, ability and reinforcement. When a rollout is stuck, one of these stages is usually missing, and each stage needs a different measure."
  - q: "When should change management start in a Salesforce programme?"
    a: "During planning, before anything is built. Change management that starts two weeks before go-live can only inform. Which groups are affected and what changes for them even shapes the architecture, for example with a global template."
  - q: "Isn't good training enough?"
    a: "Only when knowledge or ability is missing. When a team does not know what a new process is for, or does not want to take part, another training session changes nothing. The group's own manager has to explain that."
draft: false
---

Salesforce rollouts at manufacturers rarely fail on technology. They fail when sales, inside sales and service keep working in Excel, email and their own lists after go-live. Change management prevents that by taking every affected group through the change. I use Prosci's ADKAR model as a diagnosis: per group it shows whether awareness, desire, knowledge, ability or reinforcement is missing. The measure follows from that. Another training session helps with two of the five stages only. This chapter covers the diagnosis; the other four go through the stages in order.

## Why does Salesforce get stuck in daily work?

A release is deployed in minutes. Whether anyone works differently afterwards is decided in the weeks that follow. In Salesforce programmes I keep seeing the same reasons:

- **Affected people hear about it too late.** Whoever sees a change for the first time in production finds a way around it.
- **Nobody explains why.** A sales team maintains opportunities because it has to and does not know that sales planning is built on them.
- **Management backing is missing.** Without decisions from the top, new rules stay a recommendation.
- **There is no way back.** Problems from daily work end up in emails and not in the backlog.

Prosci has surveyed projects about their experience since 1998. In the 12th edition of the study [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf) with 2,668 participants, projects with excellent change management met their objectives in 88 percent of cases, projects with poor change management in 13 percent. Participants named active and visible executive sponsorship as the top success factor.

```kennzahlen
88 % | projects with excellent change management that met their objectives
13 % | projects with poor change management that met their objectives
2,668 | participants in the 12th edition of the study
source: Prosci, Best Practices in Change Management, 12th edition, executive summary
```

Business teams are not the only ones affected. When a programme introduces new standards for development and release, developer teams and implementation partners are affected just as much. [Chapter 5](../measure-adoption-and-reinforce/) covers that.

## What does the ADKAR model show for a Salesforce programme?

The [ADKAR model](https://www.prosci.com/blog/adkar-model) describes five stages every person goes through in a change. The stages build on each other: whoever does not understand why something changes will not want to take part, and whoever does not want to take part only half learns the new function. For a Salesforce programme I translate them like this:

| Stage | Question of the people affected | Sign that it is missing | Who helps | Chapter |
|---|---|---|---|---|
| Awareness | Why is anything changing? | "The old system worked too." | The group's manager | 2 |
| Desire | Do I want to take part? | Required fields filled with dots | Sponsor, direct manager | 2 |
| Knowledge | Do I know how it works? | Questions about where a function is | Training, key users | 3 |
| Ability | Can I do it in daily work? | Works in training, not in the customer meeting | Key users on site, practice | 3 |
| Reinforcement | Will I stick with it? | Back to Excel after three months | Reports, checks, recognition | 5 |

Chapter 4 applies the same stages to a rollout across several countries and teams, because every wave goes through them again.

The value lies in the diagnosis. When usage is low, many programmes book the next training session by reflex. With ADKAR we ask per group at which stage it is stuck instead. If sales does not know what well maintained opportunities are needed for, awareness is missing, and the head of sales has to explain that, not the trainer. If technicians know the app but cannot continue offline, ability is missing, and a technical change solves that.

Prosci and ADKAR are registered trademarks of Prosci, Inc. I adapted the approach to Salesforce programmes together with [Juliane Winterscheid](../../../partners/juliane-winterscheid/), my cooperation partner for change management. More in the article [Salesforce change management: why rollouts fail](../../../blog/change-management-salesforce-rollout/).

## How do you diagnose per group?

A diagnosis for "the users" is too coarse. Inside sales, field teams, dispatch, dealers and partners get stuck at different stages. So I create a table with one row per group and answer three questions:

1. **What changes for this group in daily work?** Concretely, for example: quotes are created in Salesforce instead of Word, with the delivery date as a required field.
2. **At which ADKAR stage is the group today?** An honest estimate from talks with team leads and future key users is enough to start.
3. **Who helps at this stage?** A name, not a role.

Before go-live the estimate is an assumption. After go-live usage figures replace it: a team that logs in daily but hardly creates quotes is working somewhere else. How to measure that is in [Measuring Salesforce adoption after go-live](../../../blog/salesforce-adoption-metrics-after-go-live/).

```praxis
Many clients think they do not need change management. The budget is allocated, training is planned, and users will get used to it. I keep bringing it up anyway, during planning, before every country and after every go-live.
```

## How does change management run next to the release plan?

At the level of the organisation, Prosci splits the work into three phases, the [Prosci 3-Phase Process](https://www.prosci.com/methodology/3-phase-process). In a Salesforce programme they run next to the release plan:

```schritte
Prepare approach | before the first release · client with sponsor
  Decide how success is measured, which groups are affected, what changes for each and who in management carries the rollout.
Manage change | with every release · client, key users
  One plan per group along the ADKAR stages, linked to the release plan. Measure usage and adjust where it is stuck.
Sustain outcomes | after go-live · internal owners
  Check gaps, anchor new rules in the pipeline, reports and Center of Excellence calls, hand over ownership.
```

Timing decides. Change management that starts two weeks before go-live can only inform. The question of which groups are affected belongs in planning, before anything is built. With a global template it is part of the architecture, because every country deviation is also a question of habit, as [chapter 4](../change-management-rollout-countries/) shows.

## Who owns change management?

The client. An implementation partner builds the system, but cannot own the change inside your company, because it cannot tell a head of sales how their team will work in future. In the programmes I support, the roles split like this:

- **Sponsor in management:** visibly backs the rollout, decides conflicts between departments and asks about usage. More in [chapter 2](../sponsor-and-communication/).
- **Product owner and programme lead:** keep the rollout plan per release together with the release plan.
- **Key users:** carry knowledge into the team and feedback into the project, see [chapter 3](../key-users-and-training/).
- **Change manager:** plans the measures per group and stage and advises the sponsor and managers. In large programmes a dedicated person with method experience pays off.
- **Architect:** makes sure decisions on template, required fields and releases take the people affected into account.

## What do you settle before the first release?

For the next release, answer three questions in writing: Which groups are affected? What changes for each in daily work? Who in management visibly backs it? If the third answer is missing, that is the first step. Then decide how you measure success, for example by the share of quotes created in Salesforce instead of the number of training sessions. How I set this up with you is on the page [Change management for Salesforce programmes](../../../services/change-management-salesforce/).

The next chapter covers the first two stages, awareness and desire, with the sponsor plan and communication per release. All chapters are on the [overview page](../).
