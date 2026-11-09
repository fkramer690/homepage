---
title: "Change management process in a Salesforce project"
description: "Which change work belongs in which phase of a Salesforce project, from planning through build and acceptance testing to go-live and operations, with outputs."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: change-management-process-salesforce
translationKey: change-process-salesforce
topic: governance
categories: [change-management]
coAuthor: juliane
contactBrief: change
tags: [change management process, Prosci, ADKAR, Salesforce rollout, project phases]
takeaways:
  - "Every project phase has its own change task with a tangible output, from the impact assessment to the handover to internal roles."
  - "Planning sets the base: which groups are affected, what changes for each, who backs it in management and how success is measured."
  - "From go-live the new process is the binding standard. Old routes get an end date; fallbacks are approved, measured and time-limited."
  - "After go-live it is decided whether the change lasts: measure, close gaps and hand ownership to internal roles."
faq:
  - q: "What does a change management process look like?"
    a: "According to Prosci, three phases: prepare approach, manage change, sustain outcomes. In a Salesforce project they run in parallel to planning, build, acceptance testing, go-live and operations."
  - q: "When does change management start in a Salesforce project?"
    a: "In planning, with a first impact assessment before the build, refined as design decisions become concrete. Which groups are affected and what changes for them also shapes the solution itself. Starting just before go-live leaves room only for information."
  - q: "What is a change impact assessment?"
    a: "An overview per affected group of what changes for them, for example processes, systems, roles, behaviors or reporting lines. It is the basis for communication, training and the sponsor plan."
  - q: "When does the change management process end?"
    a: "With a closeout: target values reached over several measurement periods, remaining gaps with owner and date, internal roles active and the sponsor accepting the handover, so well after go-live. In a rollout in waves, the local part runs again for each wave."
draft: false
---

The change management process in a Salesforce project runs in parallel to the project plan, and every project phase has its own change task. In planning you clarify which groups are affected, what changes for each, who in management backs it and how you measure success. During build and acceptance testing you involve key users and prepare communication and training. From go-live the new process is the binding standard, and old routes get an end date. Afterwards you measure usage, close gaps and hand ownership to internal roles. I follow the Prosci process and adapt it to the phases of a Salesforce project.

## The three Prosci phases on the Salesforce project plan

Prosci structures the work in three phases: prepare approach, manage change, sustain outcomes. What the phases mean in general is explained by Juliane Winterscheid in [What is change management?](../what-is-change-management/), and how Prosci differs from Lewin and Kotter in [Change management models compared](../change-management-models/). Here the question is the one that matters in a project: what has to happen in which project phase, and what is on the table at the end? Prosci's own deliverables are the change management strategy, the master change management plan with sponsor, people manager, communication and training plans, and the change management closeout. The table is my adaptation to a Salesforce project; I prepare the sponsor plan earlier than Prosci assigns it.

| Project phase | Prosci phase | Change work | Output |
|---|---|---|---|
| Planning | Prepare approach | Clarify affected groups and impact, win a sponsor, define success | Change strategy with impact assessment, first sponsor plan, metrics |
| Design and build | Manage change | Involve key users and managers, plan per group along ADKAR, start communication and training logistics | Plan per group, people manager plan, communication plan, draft training plan |
| Acceptance testing | Manage change | Key users test end to end processes, finalize training content, check resistance | Final training plan, list of open concerns |
| Go-live | Manage change | Training, close old routes in a controlled way, start hypercare | Switch-off date with criteria and exceptions, hypercare team |
| Operations | Sustain outcomes | Measure usage, close gaps, hand over ownership | Monthly report to sponsor, closeout and handover to internal roles |

The table describes a release with one big go-live. In a rollout in waves, by country, plant, brand or service organization, the global design and assets are reused, while impact assessment, local fit gap, sponsor and manager activation, communication, training and sustainment run again for each wave, as described in [Change management in a global Salesforce rollout](../change-management-global-salesforce-rollout/).

## What belongs in planning?

Planning lays the base, and in the programs I see, this is where change management is most often missing. Three outputs should be established before the build starts and refined as design decisions become concrete.

**An impact assessment per group.** Prosci looks at ten aspects of a change, among them processes, systems, tools, job roles, critical behaviors, reporting structure and performance reviews ([Prosci: Defining Change Impact](https://www.prosci.com/blog/defining-change-impact)). In a Salesforce project at a manufacturer it can look like this: inside sales creates quotes in the configurator instead of Word (process, tool). Sales maintains opportunities that feed the sales forecast (behavior). Sales management discusses the pipeline from a dashboard instead of an Excel list (reporting). The more aspects change for a group, the more support it needs.

**A sponsor plan.** It defines who in management carries the rollout and what that person visibly does when: explain in the sales meeting why forecasts will come from Salesforce, decide when departments disagree, ask about usage in the monthly report.

**Success metrics.** How will you know in six months that the process has landed? Separate three levels: usage, such as the share of quotes created in Salesforce; process performance, such as quote lead time or rework; and business results, such as forecast accuracy. Measure a baseline before go-live where a comparable value exists today, for example quote lead time. For new usage figures, which start at zero, set a target value, a measurement window and an expected ramp-up instead. Which figures work is covered in [Measuring Salesforce adoption after go-live](../salesforce-adoption-metrics-after-go-live/).

```praxis
Many clients think at first that training is enough change management. That is why I do not raise the topic only once, but again in planning, before every country and after every go-live.
```

It has the strongest effect in planning, because the impact assessment can still shape the solution itself there.

## What happens during build and acceptance testing?

This is when the actual steering happens. For every affected group a plan is built along the five ADKAR elements: who explains why things change, who builds desire, when training happens, who helps in daily work, how it gets reinforced. ADKAR describes individual change, so the group plan bundles typical barriers; people in the same group can still be stuck at different elements. How to find out at which stage a group is stuck is shown in the masterclass chapter [ADKAR model: diagnosis for Salesforce rollouts](../../masterclass/change-management/change-management-adkar-diagnosis/).

In my experience, four things work particularly well in this phase:

- **Involve [key users](../salesforce-key-user-network/).** They describe their team's processes, help write acceptance criteria and test end to end processes, including exceptions and role changes, in acceptance testing. Involvement builds trust when decisions and the handling of their feedback are transparent; key users whose feedback is ignored become credible critics.
- **Prepare the managers.** Heads of sales and service and team leads enforce new rules in daily work, see resistance first and coach their people. A people manager plan defines what they say, when, and what they check, for example the head of sales running the pipeline meeting from Salesforce.
- **Communicate early.** Affected people learn before the build what is coming, and before every release what changes. How that works for ongoing releases is covered in [Communicating Salesforce releases to the business](../salesforce-release-communication-business/).
- **Take concerns seriously.** Questions and objections from workshops and acceptance testing go on a list with an answer and an owner. An objection raised in acceptance testing comes back as an Excel list after go-live if nobody answers it.

Planning for the [training plan](../salesforce-training-plan-rollout/) starts during build: roles and learning paths, languages, trainers, training environment and data, devices and shift schedules. At the end of acceptance testing the content is final: which role learns which processes, in which format and when.

## At go-live the new process becomes the standard

At go-live comes the part that, in my experience, many projects underestimate. From a fixed date the new process is the binding standard. If the option to work the old way stays open without limit, little changes. That does not rule out a controlled fallback: exceptions and fallbacks are approved, measured and time-limited. Old templates and lists get a switch-off date that leadership announces. Before the switch-off, the sponsor confirms the criteria: migration reconciled, data quality good enough, permissions and integrations validated, a read-only route to the old data and its retention settled, and who may trigger a rollback. Reports to the management board move to Salesforce once their figures have been checked against the old source.

```hinweis achtung
A go-live without a switch-off date for the old routes is parallel operation without an end. Set the date and its criteria with the sponsor before training starts, and say it in every training session.
```

At the same time [hypercare](../salesforce-hypercare-after-go-live/) begins. Project team, partners and key users stay more available, and feedback is triaged quickly into three groups: critical defects are fixed under release control, usage questions get help or a short training, and enhancement requests go into the backlog. For the change management process it is the most important source: the questions of the first weeks show which group is stuck where.

## How do you sustain the outcome after go-live?

The third Prosci phase starts after go-live and, in my experience, is the one most often cut, because the project team moves on. It has three parts. Measure: the sponsor gets the metrics from planning every month, per group and country. Close gaps: where usage stalls, ask for the missing ADKAR stage instead of retraining by default. Hand over ownership: internal roles take over what the project built, such as the key user exchange, release communication and regular meetings like a [Center of Excellence call](../salesforce-center-of-excellence-cadence/) where new topics come up in advance.

The process ends with a closeout: target values reached over several measurement periods, remaining gaps documented with owner and date, internal roles active, materials and measurement handed over, and the sponsor accepting the closeout. That is well after go-live.

## Write one change output into every project phase

Take the project plan of your next Salesforce initiative and write down for every phase which change output should exist at its end. If planning is missing the impact assessment, the sponsor plan or the metrics, that is your first step. The hub article [Salesforce change management: why rollouts fail](../change-management-salesforce-rollout/) shows which topics belong to it. How we run the process in programs is described under [Salesforce change management consulting](../../services/change-management-salesforce/).
