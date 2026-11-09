---
title: "Salesforce end user training plan for a rollout"
description: "What a Salesforce training plan looks like that reaches daily work: by role, on realistic cases, with key users, a training sandbox and in-app help."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-training-plan-rollout
translationKey: change-training-plan
topic: governance
categories: [change-management]
coAuthor: juliane
contactBrief: change
tags: [training plan, Salesforce training, change management, key users, train the trainer]
takeaways:
  - "In the ADKAR model, training mainly builds knowledge and starts ability through practice. When awareness or desire is missing, even good training helps little."
  - "Training uses realistic cases in a training environment with synthetic or verified masked data, close to each role's go-live, not months earlier."
  - "Key users are often the best trainers for their own team, provided they were trained thoroughly, ran a trial session and use shared material."
  - "Whether training worked shows in the questions, task checks and usage figures of the first weeks, not from attendance alone."
faq:
  - q: "What belongs in a Salesforce training plan?"
    a: "The affected roles, the processes each role has to learn, the format per role, the training environment, the schedule along the releases, who trains and how you measure whether it worked."
  - q: "When should Salesforce end user training take place?"
    a: "End user training typically takes place close to the go-live of each role or wave, when the system is largely finished. Key users come earlier, before acceptance testing, and changes from testing get a short delta session. People trained weeks earlier have forgotten much of it by their first real case."
  - q: "What is train the trainer in Salesforce projects?"
    a: "The project team first trains the key users thoroughly, including a trial session and shared material, and the key users then train their teams. Users learn from colleagues who know their daily work and are still around after go-live."
  - q: "Do I need a separate sandbox for training?"
    a: "Usually, when acceptance testing runs in parallel, many users train or the practice data needs resetting. Training in production creates real records that can trigger emails, approvals or ERP postings. A Partial Copy sandbox is often a candidate, depending on edition, available sandboxes and data protection; it does not mask copied data by itself."
draft: false
---

A Salesforce training plan for a rollout is built around roles and processes, not features: the dispatcher learns their working day in Salesforce, the sales rep the route from visit to quote. Training uses realistic cases, in its own training environment, close to each role's go-live and ideally by well prepared key users who know their team. Afterwards the system itself helps with short hints in the right place. Whether training worked shows in the questions, task checks and usage figures of the first weeks, not from attendance alone.

## What can training achieve and what not?

In the [ADKAR model](../change-management-salesforce-rollout/), training mainly builds knowledge and can start to build ability through hands-on practice. Ability only shows when people perform the process reliably in their daily work, with coaching and practical obstacles removed. Training does not convincingly explain why something changes, and it does not make anyone willing to go along. The sponsor and the managers have to establish the business reason and the personal relevance before training.

You can tell by the mood in a training session. When the first half hour consists of questions like "Why are we doing this at all?", awareness is missing. A briefed trainer can explain the agreed reasoning, but cannot make up for open leadership questions. A short introduction by the group's manager, on why the new process is coming and what it brings the team, saves that half hour.

## Plan training by roles and processes

A feature tour of Salesforce shows everything and sticks with nobody. A matrix of roles and processes works better. For every affected role it is clear which processes it has to master, in which format it learns and when.

| Role | Processes | Format | Timing |
|---|---|---|---|
| Key user | all processes of their group, including special cases | several days with the project team, separate UAT role, then train the trainer with a trial session | before acceptance testing |
| Sales | visit, opportunity, quote | 2 to 3 hours on customers typical of their work | shortly before go-live |
| Inside sales | quote, order, sales agreement | half a day with practice cases | shortly before go-live |
| Dispatcher | scheduling, rescheduling, emergency | half a day, then shadowing in a live region | before their own wave |
| Technician | accept job, report, spare parts | session on the configured device, online and offline, including sync | before their own wave |
| Manager | dashboards, forecast, pipeline meeting | one hour | before go-live |

The durations in the table are an assumption for planning and depend on scope. With shifts, several sites, holidays or partners, "shortly before" can mean several weeks of sessions; changes from acceptance testing get a short delta session, and office hours and refreshers follow after go-live. The last row matters: managers are easily forgotten because they rarely create records themselves. Yet their questions in meetings decide whether the system gets used, as I describe in [Sales team not using Salesforce?](../salesforce-adoption-sales-team/).

## When should key users deliver the training?

Users often prefer to learn from colleagues who know the same customers, machines and exceptions. In the train the trainer approach, the project team first trains the [key users](../salesforce-key-user-network/) thoroughly, and the key users then train their team. The benefit lasts beyond go-live: whoever ran the training is the natural first contact for questions in the first weeks.

The approach has prerequisites. Key users need the time freed up, finished training material, a trainer guide and practice cases prepared by the project, plus a trial session that the project team signs off. Not every key user is a good trainer; for critical processes I would have a key user and a project trainer run the session together. Without that preparation every key user improvises differently, passes on their own workarounds, and teams learn different routes.

```praxis
I have run training in all of these forms, depending on what the client wanted: train the trainer through key users, a separate training sandbox and training per role. In Field Service rollouts it also helps when dispatchers of the next wave first shadow colleagues in the region that is already live. Real cases from a colleague's day teach them more than an exercise in a training room.
```

## Where should training take place?

Usually in its own training sandbox. Salesforce explicitly names training as one of the purposes of [sandboxes](https://help.salesforce.com/s/articleView?id=platform.deploy_sandboxes_parent.htm&type=5). Training in the test sandbox can disrupt acceptance testing when both run at the same time, and training in production creates real quotes and orders that can trigger emails, approvals or ERP postings. A shared environment only works with separate time slots, users and records and a clear owner.

A Partial Copy sandbox is often a candidate. It holds a subset of production data selected by a sandbox template, up to 5 GB of data storage, and according to the [Salesforce documentation](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/deploy_sandboxes.pdf) can be refreshed every five days. Whether you have one free depends on your edition and sandbox licenses; Enterprise Edition includes one, which may already be needed for UAT. For a smaller rollout, a Developer Pro sandbox with synthetic data can be enough. A Full sandbox can only be refreshed every 29 days, so many programs reserve it for production-like scenarios such as end-to-end testing, UAT, staging or performance tests. How the training environment fits next to development and test sandboxes is covered in the [sandbox strategy with multiple partners](../salesforce-sandbox-strategy-multiple-partners/).

```hinweis achtung
A Partial Copy does not mask copied production data by itself. Use synthetic practice records or an approved, verified masked data set, for example with Salesforce Data Mask & Seed, and remember free text, attachments and emails. Agree this with data protection beforehand. Also test training users, permission sets, login, devices and app versions, and switch off outgoing emails and integrations or connect them in a controlled way.
```

Every exercise needs a case that is representative of participants' daily work: a typical customer, a typical machine, a typical fault. People who recognize their own processes transfer what they learned to daily work faster.

## After training, help belongs inside the system

What people learned in training fades quickly when they do not use it in daily work. That is why help belongs inside the system. With Salesforce In-App Guidance you can show short prompts and guided walkthroughs directly on the pages where someone works, for example when creating a quote for the first time ([Trailhead: Create In-App Prompts](https://trailhead.salesforce.com/content/learn/modules/user-engagement/create-in-app-prompts)). Prompts are available within the documented limits. Up to three custom walkthroughs can be active at the same time without the Enablement add-on; more need the add-on and the matching user permission. Check this for your org before planning many walkthroughs.

Add short guides per process, linked from inside the system, and key users nearby. Nobody reads an 80-page manual after training.

## How do you measure whether training worked?

Not from attendance alone. Attendance and completion rates show training coverage, which matters for readiness, but not whether anyone can perform the process. Add short task-based checks and two sources from the first weeks: the questions collected by key users and support, and usage figures per group compared with what the process should produce. They show where to look, not the cause. Questions piling up around one process can mean missing knowledge, but also an unclear process, a confusing page or missing permissions. Records that stay away although nobody asks can mean missing desire, but also a parallel system, an integration gap or time pressure. Short interviews or watching people work tell them apart. How to build these figures is covered in [Measuring Salesforce adoption after go-live](../salesforce-adoption-metrics-after-go-live/).

## List the roles and their processes for day one

Write down the affected roles and, next to each, the three to five processes that role has to master from day one. That list is the core of your training plan. Then decide who trains which role, and plan the training sandbox early enough for practice cases to be ready before acceptance testing. I plan training and change management together with my cooperation partner [Juliane Winterscheid](../../partners/juliane-winterscheid/). Read more about [Salesforce change management consulting](../../services/change-management-salesforce/).
