---
title: "Salesforce Field Service Scheduling: How Much to Automate?"
metaTitle: "Automate Salesforce Field Service scheduling and dispatch"
description: "How to automate technician scheduling and dispatch in Salesforce Field Service: scheduling policies, the dispatcher's role and when dispatch runs automatically."
pubDate: 2026-10-26
updatedDate: 2026-11-09
lang: en
slug: salesforce-field-service-scheduling-automation
translationKey: field-service-scheduling-automation
topic: field-service
categories: [field-service]
series: { id: field-service, part: 3 }
tags: [Field Service, Scheduling, Dispatching, Manufacturing]
takeaways:
  - "To start, automation schedules appointments up to the Scheduled status. A dispatcher reviews the plan and releases each appointment by setting it to Dispatched."
  - "The engine decides using a scheduling policy: work rules exclude technicians, and weighted service objectives rank the rest."
  - "The dispatcher adds context that is not in the data, for example a customer who must first shut down the machine for maintenance."
  - "More automation pays off when the numbers show it: few changed proposals, response times met, a stable plan. Then simple jobs can dispatch automatically."
faq:
  - q: "What is the difference between Scheduled and Dispatched in Field Service?"
    a: "Scheduled means an appointment has a technician and a time slot. Dispatched means it is released to the technician. Whether the technician sees it only once it is Dispatched depends on the sharing settings, for example sharing dispatched appointments with their assigned resources."
  - q: "What is a scheduling policy?"
    a: "A scheduling policy defines the rules and objectives Field Service uses to assign appointments to technicians. Work rules exclude unsuitable technicians, and service objectives rank the rest using weights."
  - q: "Which scheduling policies come with Salesforce Field Service?"
    a: "Field Service ships four default policies: Customer First, High Intensity for peak periods, Soft Boundaries for work across territories and Emergency for urgent jobs. They are a starting point and are usually adjusted."
  - q: "Can Field Service release appointments to technicians automatically?"
    a: "Yes. Scheduled jobs can change appointments from Scheduled to Dispatched automatically. With drip feed, Field Service keeps only a set number of appointments in each technician's queue."
  - q: "How do you automate technician scheduling and dispatch in Salesforce Field Service?"
    a: "Do it in four steps. Let a shipped scheduling policy schedule appointments up to Scheduled while a dispatcher releases each one. Have dispatchers note for four weeks why they change proposals and turn those reasons into data or work rules. Once proposals are hardly ever changed, dispatch simple work types automatically with drip feed."
draft: false
---

How much scheduling in Salesforce Field Service should run automatically depends above all on how much the company trusts the technology, and that trust should rest on measured planning quality. A good start is a division of work: automation schedules appointments up to the Scheduled status. A dispatcher reviews the plan, corrects it where needed and releases each appointment to the technician by setting it to Dispatched. As the numbers prove that the plan works, automation takes over more, until simple jobs run without a dispatcher at all.

This article is part 3 of the series. Whether Field Service is worth it is covered in [part 1](/en/blog/salesforce-field-service-worth-it/). The master data that scheduling needs is covered in [part 2](/en/blog/salesforce-field-service-master-data/). Without that data, even the best automation produces bad plans.

## What happens between None and Dispatched?

A service appointment in Field Service moves through several statuses. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=pfs_lifecycle.htm&language=en_US&type=5) the defaults are None, Scheduled, Dispatched, In Progress, Completed, Cannot Complete and Canceled. For the question of automation, the first three matter:

- **None:** the appointment exists but has no technician and no time.
- **Scheduled:** scheduling has picked a technician and a time slot. The plan is in place but has not been released yet.
- **Dispatched:** the appointment is released to the technician. With the appropriate mobile settings, they get a notification.

The point between Scheduled and Dispatched is where a person can still step in before a technician relies on the plan. That is where the division of work happens. The status alone does not control what the technician sees, though. Sharing does. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=service.fs_sharing.htm&language=en_US&type=5), the Field Service settings offer "Share dispatched service appointments with their assigned resources", so dispatchers control access until the plan is final. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field-service-dispatcher-console-for-dispatchers/manage-service-appointments), appointments can also be marked private until they are dispatched. Decide both before go-live, otherwise technicians see the draft plan.

## How does the scheduling engine decide?

The engine assigns appointments using a scheduling policy. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.pfs_scheduling.htm&language=en_US&type=5), the policy has two parts:

- **Work rules** filter out technicians who cannot take an appointment, for example because a skill is missing or the customer is closed at that time. Some are mandatory, such as technician availability.
- **Service objectives** rank the remaining candidates, for example by short travel, early appointment or preferred technician. Each objective has a weight that you can tune step by step to your own metrics.

Salesforce ships four policies. Customer First balances customer preference and short travel time. High Intensity puts technician productivity above customer preferences and is meant for peak periods. Soft Boundaries lets technicians work across territory borders. Emergency is for urgent jobs. Which one to start from depends on your main goal: committed response times, short travel, customer preference, utilization or scarce specialists. Whatever you pick, start from a shipped policy and adjust the weights instead of building one from scratch.

Optimization is added on top of that. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=pfs_optimization.htm&language=en_US&type=5) it can rearrange the plan for one or more territories over several days, for example every night. On the day of service, in-day optimization absorbs short-notice changes, and a separate optimization option handles a single technician when an appointment is canceled or runs late. Whether to switch to the newer engine is covered in [Enhanced Scheduling and Optimization: switch now?](/en/blog/field-service-enhanced-scheduling-optimization-switch/). The full picture of engine, console and rules is in [chapter 2 of the Field Service masterclass](/en/masterclass/field-service/field-service-scheduling-dispatch/).

## The dispatcher adds what is not in the data

The engine only knows what is in the data. An experienced dispatcher knows more. They know that a customer has to shut down the machine for maintenance first and can only do that on certain days. They know that a spare part is booked in the warehouse but not yet in the van. They know which technician once had trouble with a customer, even if that is not written down anywhere.

```praxis
In my Field Service projects with automatic scheduling, it was the customer's trust in the technology that determined how much they left to automation. A company that has relied on experienced people for scheduling for years does not hand it over to software on day one.
```

Trust alone is a weak criterion, though. It should grow from numbers, not from habit. That is why I measure from the first day how good the engine's proposals are.

A model in which automation schedules appointments up to Scheduled and the dispatcher releases them by setting them to Dispatched takes that seriously. The dispatcher stays responsible, but starts from a finished proposal instead of an empty calendar.

A fixed rhythm helps with the review. Trailhead suggests releasing the morning appointments first and checking the plan again before midday, before the afternoon appointments go out. That keeps the afternoon flexible if something goes wrong in the morning.

The model has a cost too. Every dispatcher needs a Dispatcher license, and according to the price list it costs as much as a Technician license. The numbers are in part 1. If dispatchers check every appointment by hand forever, you pay for automation you do not use.

## When can dispatch run automatically?

Field Service can also release appointments automatically. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=service.pfs_dispatching_appointments.htm&language=en_US&type=5), a scheduled job changes appointments from Scheduled to Dispatched. With drip feed, Field Service keeps only a set number of appointments in each technician's queue, for example two when the value is set to two. When one is done, the next one follows. The rest of the plan stays flexible.

I would tie that step to measured planning quality. The primary metric is how often the dispatcher changes the engine's proposal before releasing it. A low rate alone is not enough, because a dispatcher under time pressure may just wave proposals through. So I look at it together with whether response times are met, first-time fix rate, wrong assignments and how stable the daily plan remains. If the dispatcher changes proposals often, data is missing or the policy does not fit. Then it helps to collect the reason for each change and turn it into data or work rules. Typical reasons and what follows from them:

| Reason for the change | What is missing in Field Service |
|---|---|
| Customer only accessible on certain days | Operating hours on the account and the visiting hours work rule |
| Part not in the van | Stock on the van as a mobile location, plus a dispatcher check or custom automation that compares required parts with that stock |
| Technician does not know the equipment | Skill or certification on the technician, and, if needed, a preferred technician on the account |
| Technician is in training that day | Absence in Salesforce |

According to the [Salesforce data model](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm), preferred, required or excluded technicians can be stored as resource preferences on the account or work order. That captures part of the knowledge that otherwise lives only in the dispatcher's head. If dispatchers hardly change the proposals anymore and the other numbers hold, dispatch can run automatically for simple work types, such as planned maintenance. Breakdowns with an unclear cause or jobs that need a shutdown at the customer's site stay with the dispatcher longer.

That way automation grows with proven quality, rather than following a plan someone set before the project. The role spare parts play in this, meaning who knows whether the part is in the van, is the topic of the next part of the series.

## Automate technician scheduling and dispatch in four steps

The first step keeps the dispatcher responsible for releasing every appointment:

```schritte
Start with release
  A shipped policy that fits your main goal, the work rules for skills and visiting hours and the rule that the dispatcher releases every appointment.
Note the changes | 4 weeks · dispatchers
  The dispatchers write down why they change a proposal from the engine.
Turn reasons into data
  The list becomes operating hours, skills, absences, resource preferences or work rules.
Automate dispatch
  Once the dispatcher hardly changes the proposals and response times and first-time fix hold, simple work types such as planned maintenance run without them.
```
