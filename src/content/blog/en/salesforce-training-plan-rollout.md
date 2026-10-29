---
title: "Salesforce end user training plan for a rollout"
description: "What a Salesforce training plan looks like that reaches daily work: by role, on real cases, with key users, a training sandbox and help inside the system."
pubDate: 2026-10-29
lang: en
slug: salesforce-training-plan-rollout
translationKey: change-training-plan
topic: governance
categories: [change-management]
coAuthor: juliane
contactBrief: change
tags: [training plan, Salesforce training, change management, key users, train the trainer]
takeaways:
  - "A Salesforce training plan is built around roles and processes, not features. A dispatcher learns their working day, not a tour of the system."
  - "In the ADKAR model, training covers knowledge and ability. When awareness or desire is missing, even the best training does not help."
  - "Training happens on real cases in a sandbox with real processes and anonymised data, shortly before go-live, not months earlier."
  - "Key users train their own team better than a trainer from the project, provided they were trained thoroughly themselves first."
  - "Whether training worked shows in the questions and usage figures of the first weeks, not in the number of participants."
faq:
  - q: "What belongs in a Salesforce training plan?"
    a: "The affected roles, the processes each role has to learn, the format per role, the training environment, the schedule along the releases, who trains and how you measure whether it worked."
  - q: "When should Salesforce end user training take place?"
    a: "Shortly before go-live, when the system is largely finished. People trained weeks earlier have forgotten much of it by their first real case, and changes from acceptance testing are missing."
  - q: "What is train the trainer in Salesforce projects?"
    a: "The project team first trains the key users thoroughly, and the key users then train their teams. Users learn from colleagues who know their daily work and are still around after go-live."
  - q: "Do I need a separate sandbox for training?"
    a: "For larger rollouts, yes. Training in the test sandbox disrupts acceptance testing, and training in production creates real records. A Partial Copy sandbox with anonymised data is usually enough."
draft: false
---

A Salesforce training plan for a rollout is built around roles and processes, not features: the dispatcher learns their working day in Salesforce, the sales rep the route from visit to quote. Training happens on real cases, in a separate training sandbox, shortly before go-live and ideally by key users who know their team. Afterwards the system itself helps with short hints in the right place. Whether training worked shows in the questions and usage figures of the first weeks, not in the number of participants.

## What can training achieve and what not?

In the [ADKAR model](../change-management-salesforce-rollout/), training covers two of five stages: knowledge and ability. It shows how something works and lets people practise it. It does not convincingly explain why something changes, and it does not make anyone willing to go along. That is the job of the sponsor and the direct manager, and it has to happen before training.

You can tell by the mood in a training session. When the first half hour consists of questions like "Why are we doing this at all?", awareness is missing. The trainer cannot answer, because they did not make the decision. A short introduction by the group's manager, on why the new process is coming and what it brings the team, saves that half hour.

## How do you plan training by role?

A feature tour of Salesforce shows everything and sticks with nobody. A matrix of roles and processes works better. For every affected role it is clear which processes it has to master, in which format it learns and when.

| Role | Processes | Format | Timing |
|---|---|---|---|
| Key user | all processes of their group, including special cases | several days with the project team, then UAT | before acceptance testing |
| Sales | visit, opportunity, quote | 2 to 3 hours on their own customers | last week before go-live |
| Inside sales | quote, order, sales agreement | half a day with practice cases | last week before go-live |
| Dispatcher | scheduling, rescheduling, emergency | half a day, then shadowing in a live region | before their own wave |
| Technician | accept job, report, spare parts | short session on the device, practised offline | before their own wave |
| Manager | dashboards, forecast, pipeline meeting | one hour | before go-live |

The durations in the table are an assumption for planning and depend on scope. The last row matters: managers are easily forgotten because they rarely create records themselves. Yet their questions in meetings decide whether the system gets used, as I describe in [Sales team not using Salesforce?](../salesforce-adoption-sales-team/).

## Why do key users train better than trainers?

Users prefer to learn from colleagues who know the same customers, machines and exceptions. In the train the trainer approach, the project team first trains the [key users](../salesforce-key-user-network/) thoroughly, and the key users then train their team. The benefit lasts beyond go-live: whoever ran the training is the natural first contact for questions in the first weeks.

The approach has prerequisites. Key users need the time freed up, finished training material and practice cases prepared by the project. Without that preparation every key user improvises differently, and teams learn different routes.

```praxis
I have run training in all of these forms, depending on what the client wanted: train the trainer through key users, a separate training sandbox and training per role. In Field Service rollouts it also helps when dispatchers of the next wave first shadow colleagues in the region that is already live. Real cases from a colleague's day teach them more than any exercise in a training room.
```

## Where does training take place?

In a separate training sandbox. Salesforce explicitly names training as one of the purposes of [sandboxes](https://help.salesforce.com/s/articleView?id=platform.deploy_sandboxes_parent.htm&type=5). Training in the test sandbox disrupts acceptance testing, and training in production creates real quotes and orders that someone has to clean up.

For most rollouts a Partial Copy sandbox is enough. It holds a subset of production data, up to 5 GB of data storage, and according to the [Salesforce documentation](https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/deploy_sandboxes.pdf) can be refreshed every five days. A Full sandbox can only be refreshed every 29 days and is usually reserved for load and integration tests. How the training environment fits next to development and test sandboxes is covered in the [sandbox strategy with multiple partners](../salesforce-sandbox-strategy-multiple-partners/).

```hinweis achtung
Real customer data does not belong in a training sandbox that many people can access unless it is anonymised. Create practice customers or anonymise the copy, and agree this with data protection beforehand.
```

Every exercise needs a case participants know from their daily work: a typical customer, a typical machine, a typical fault. People who recognise their own processes transfer what they learned to daily work faster.

## What helps after training?

What people learned in training fades quickly when they do not use it in daily work. That is why help belongs inside the system. With Salesforce In-App Guidance you can show short prompts and guided walkthroughs directly on the pages where someone works, for example when creating a quote for the first time ([Trailhead: Create In-App Prompts](https://trailhead.salesforce.com/content/learn/modules/user-engagement/create-in-app-prompts)). Prompts are included; more than three custom walkthroughs need an additional licence. Check this for your org before planning many walkthroughs.

Add short guides per process, linked from inside the system, and key users nearby. Nobody reads an 80-page manual after training.

## How do you measure whether training worked?

Not by the number of participants. That figure shows the project trained people, not that anyone works differently. Two sources say more: the questions of the first weeks, collected by key users and support, and usage figures per group. When questions pile up around one process, knowledge is missing there and a short refresher pays off. When records stay away although nobody asks, desire is usually missing. How to build these figures is covered in [Measuring Salesforce adoption after go-live](../salesforce-adoption-metrics-after-go-live/).

## Where should you start?

Write down the affected roles and, next to each, the three to five processes that role has to master from day one. That list is the core of your training plan. Then decide who trains which role, and plan the training sandbox early enough for practice cases to be ready before acceptance testing.

Good training comes shortly before go-live, on real cases and from a colleague. If you are planning a rollout and the training plan is still missing, [send me a message](#contact) or read more about [Salesforce change management consulting](../../services/change-management-salesforce/). I plan training and change management together with my cooperation partner [Juliane Winterscheid](../../partners/juliane-winterscheid/).
