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
  - "According to Prosci, projects with excellent change management met their objectives in 88 percent of cases, those with poor change management in 13 percent."
  - "ADKAR splits the change into five stages: awareness, desire, knowledge, ability and reinforcement. Training helps with knowledge and ability only."
  - "The diagnosis is made per affected group, because inside sales, field teams and partners get stuck at different stages."
  - "Before the first release it is written down which groups are affected, what changes for each and who in management backs it."
articles: [change-management-hub, salesforce-center-of-excellence, change-adoption-metrics]
faq:
  - q: "What is the ADKAR model?"
    a: "A model by Prosci with five stages every person goes through in a change: awareness, desire, knowledge, ability and reinforcement. When a rollout is stuck, one of these stages is usually missing, and each stage needs a different measure."
  - q: "When should change management start in a Salesforce program?"
    a: "During planning, before anything is built. Change management that starts two weeks before go-live can only inform. Which groups are affected and what changes for them even shapes the architecture, for example with a global template."
  - q: "Isn't good training enough?"
    a: "Only when knowledge or ability is missing. When a team does not know what a new process is for, or does not want to take part, another training session changes nothing. The group's own manager has to explain that."
draft: false
---

Salesforce rollouts at manufacturers rarely fail on technology. They fail when sales, inside sales and service keep working in Excel, email and their own lists after go-live. Change management prevents that by taking every affected group through the change. I use Prosci's ADKAR model as a diagnosis: per group it shows whether awareness, desire, knowledge, ability or reinforcement is missing. The measure follows from that. Another training session helps with two of the five stages only. This chapter covers the diagnosis; the other four work through the stages in order.

## Why does Salesforce get stuck in daily work?

A release is deployed in minutes. Whether anyone works differently afterwards is decided in the weeks that follow. The causes I see in Salesforce programs almost always map to one ADKAR stage. Someone who first discovers a change in production had no awareness and builds a workaround. Someone who maintains opportunities only because it is mandatory does not know the purpose, such as the sales planning that depends on them. Without decisions from management every new rule stays optional, which weakens desire and reinforcement. And when problems from daily work vanish into email instead of reaching the backlog, the feedback channel that grows knowledge and ability is missing. The full list of reasons is in the article [Salesforce change management: why rollouts fail](/en/blog/change-management-salesforce-rollout/).

Prosci's long-running study shows the effort pays. For the 12th edition of [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf), 2,668 people took part. The gap between good and poor change management is wide, and at the top of the success factors is management that carries the rollout actively and visibly.

```kennzahlen
88 % | projects with excellent change management that met their objectives
13 % | projects with poor change management that met their objectives
2,668 | participants in the 12th edition of the study
source: Prosci, Best Practices in Change Management, 12th edition, executive summary
```

The diagnosis applies to the technical side too. When a program brings new rules for development and release, developer teams and implementation partners stand at the same stages as sales. [Chapter 5](/en/masterclass/change-management/measure-adoption-and-reinforce/) covers that.

## The five ADKAR stages in a Salesforce program

The [ADKAR model](https://www.prosci.com/blog/adkar-model) breaks a change into five stages that each person goes through one after the other. A missing stage blocks all later ones: no reason, no willingness; no willingness, only half the learning. For Salesforce programs I read the stages like this:

| Stage | What the person asks | How you spot the gap | Who closes it | Chapter |
|---|---|---|---|---|
| Awareness | What is this for? | Remarks like "The old system did the job" | Their own manager | 2 |
| Desire | Am I in? | Required fields contain a single dot | Sponsor and team lead | 2 |
| Knowledge | How does it work? | Users ask where a function is hidden | Training and key users | 3 |
| Ability | Can I manage it in daily business? | Fine in training, not with the customer | Key users on site, practice on real cases | 3 |
| Reinforcement | Will I keep at it? | Three months later the old Excel list is back | Reports, checks, recognition | 5 |

Chapter 4 applies the same stages to a rollout across several countries and teams, because every wave goes through them again.

The value lies in the diagnosis. When usage is low, many programs book the next training session by reflex. With ADKAR we instead ask per group at which stage it is stuck. If sales does not know what well maintained opportunities are needed for, awareness is missing, and the head of sales has to explain that, not the trainer. If technicians know the app but cannot continue offline, ability is missing, and a technical change solves that.

Prosci and ADKAR are registered trademarks of Prosci, Inc. I brought the model into Salesforce programs together with [Juliane Winterscheid](/en/partners/juliane-winterscheid/), with whom I work on change management.

## Diagnosis with one row per group

A diagnosis for "the users" is too coarse. Inside sales, field teams, dispatch, dealers and partners get stuck at different stages. So I create a table with one row per group and answer these questions in it:

1. **What changes for this group in daily work?** Concretely, for example: quotes are created in Salesforce instead of Word, with the delivery date as a required field.
2. **At which ADKAR stage is the group today?** An honest estimate from talks with team leads and future key users is enough to start.
3. **Who helps at this stage?** A name, not a role.

Before go-live the estimate is an assumption. After go-live usage figures replace it: a team that logs in daily but hardly creates quotes is working somewhere else. How to measure that is in [Measuring Salesforce adoption after go-live](/en/blog/salesforce-adoption-metrics-after-go-live/).

```praxis
I often hear "we do not need change management". The budget is spent, training is in the plan, people will get used to the rest. I raise the topic anyway, during planning, before every new country and after every go-live.
```

## Change management runs in phases next to the release plan

For the organization as a whole, Prosci describes three phases, the [Prosci 3-Phase Process](https://www.prosci.com/methodology/3-phase-process). In a Salesforce program I tie them to the release plan:

```schritte
Prepare approach | before the first release · client with sponsor
  Write down the success measure, the affected groups and their changes, and the sponsor in management.
Manage change | with every release · client, key users
  Plan measures per ADKAR stage for every group, tie them to the releases, track usage and add more where it stalls.
Sustain outcomes | after go-live · internal owners
  Close remaining gaps, embed the rules in the pipeline, reports and Center of Excellence meetings, hand ownership to the company.
```

Timing decides. If change management starts two weeks before go-live, all that is left is information. Which groups have to change belongs in planning, before anything is built. With a global template this becomes an architecture question, because many deviation requests from a country come from habit, as [chapter 4](/en/masterclass/change-management/change-management-rollout-countries/) shows.

## Who owns change management?

The client. An implementation partner builds the system, but cannot own the change inside your company, because it cannot tell a head of sales how their team will work in the future. In the programs I support, the roles split like this:

| Role | Task |
|---|---|
| Sponsor in management | Visibly backs the rollout, decides conflicts between departments and asks about usage. More in [chapter 2](/en/masterclass/change-management/sponsor-and-communication/). |
| Product owner and program lead | Keep the rollout plan per release together with the release plan. |
| Key users | Carry knowledge into the team and feedback into the project, see [chapter 3](/en/masterclass/change-management/key-users-and-training/). |
| Change manager | Plans the measures per group and stage and advises the sponsor and managers. In large programs a dedicated person with method experience pays off. |
| Architect | Makes sure decisions on template, required fields and releases take the people affected into account. |

## First step: name the sponsor for the next release

Take the next release and write down three answers: which groups it affects, what changes for each in daily work and who in management visibly stands up for it. If the last answer is empty, start there. Then set the success measure, for example the share of quotes from Salesforce, and not the number of training sessions. How I set this up with you is on the page [Change management for Salesforce programs](/en/services/change-management-salesforce/).

The next chapter covers the first two stages, awareness and desire, with the sponsor plan and communication per release. All chapters are on the [overview page](/en/masterclass/change-management/).
