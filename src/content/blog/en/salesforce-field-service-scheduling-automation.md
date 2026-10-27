---
title: "Field Service Scheduling: How Much Should Be Automatic?"
description: "How much scheduling in Salesforce Field Service should run automatically: scheduling policies, the dispatcher's role and a path to more automation."
pubDate: 2026-10-26
lang: en
slug: salesforce-field-service-scheduling-automation
translationKey: field-service-scheduling-automation
topic: field-service
categories: [field-service]
series: { id: field-service, part: 3 }
tags: [Field Service, Scheduling, Dispatching, Manufacturing]
takeaways:
  - "How much scheduling in Salesforce Field Service should run automatically depends above all on how much the company trusts the technology."
  - "A good start: automation schedules appointments up to the status Scheduled, a dispatcher reviews the plan and releases each appointment to the technician with the status Dispatched."
  - "The scheduling engine decides by a scheduling policy made of work rules, which exclude technicians, and weighted service objectives, which rank the rest."
  - "The dispatcher adds what is not in the data, for example a customer who first has to shut down the machine for maintenance."
  - "More automation pays off when dispatchers hardly change the engine's proposals any more. Then dispatch can also run automatically for simple jobs."
faq:
  - q: "What is the difference between Scheduled and Dispatched in Field Service?"
    a: "Scheduled means an appointment has a technician and a time slot. Dispatched means it is released to the technician, who then sees it in the mobile app and can get a notification."
  - q: "What is a scheduling policy?"
    a: "A scheduling policy defines the rules and objectives Field Service uses to assign appointments to technicians. Work rules exclude unsuitable technicians, service objectives rank the rest with a weight."
  - q: "Which scheduling policies come with Salesforce Field Service?"
    a: "Field Service ships four default policies: Customer First, High Intensity for peak periods, Soft Boundaries for work across territories and Emergency for urgent jobs. They are a starting point and usually get adjusted."
  - q: "Can Field Service release appointments to technicians automatically?"
    a: "Yes. Scheduled jobs can change appointments from Scheduled to Dispatched automatically. With drip feed, Field Service keeps only a set number of appointments in each technician's queue."
draft: false
---

How much scheduling in Salesforce Field Service should run automatically depends above all on how much the company trusts the technology. A good start is a split of work: automation schedules appointments up to the status Scheduled. A dispatcher looks over the plan, corrects it where needed and releases each appointment to the technician with the status Dispatched. As trust grows, automation takes over more, until simple jobs run without a dispatcher at all.

This article is part 3 of the series. Whether Field Service is worth it is covered in [part 1](../salesforce-field-service-worth-it/). Which master data scheduling needs is covered in [part 2](../salesforce-field-service-master-data/). Without that data, even the best automation plans wrongly.

## What happens between None and Dispatched?

A service appointment in Field Service moves through several statuses. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=pfs_lifecycle.htm&language=en_US&type=5) the defaults are None, Scheduled, Dispatched, In Progress, Completed, Cannot Complete and Canceled. For the question of automation, the first three matter:

- **None:** the appointment exists but has no technician and no time.
- **Scheduled:** scheduling has picked a technician and a time slot. The plan stands but has not reached the technician yet.
- **Dispatched:** the appointment is released to the technician. They see it in the mobile app and, if configured, get a notification.

Between Scheduled and Dispatched is the point where a person can still step in before a technician relies on the plan. That is where the split of work sits. According to [Trailhead](https://trailhead.salesforce.com/content/learn/modules/field-service-dispatcher-console-for-dispatchers/manage-service-appointments), appointments can also be marked private until they are dispatched, so technicians do not see the whole draft plan.

## How does the scheduling engine decide?

The engine assigns appointments by a scheduling policy. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=sf.pfs_scheduling.htm&language=en_US&type=5) it has two parts:

- **Work rules** filter out technicians who cannot take an appointment, for example because a skill is missing or the customer is closed at that time. Some are mandatory, such as technician availability.
- **Service objectives** rank the remaining candidates, for example by short travel, early appointment or preferred technician. Each objective has a weight that you can tune step by step to your own metrics.

Salesforce ships four policies. Customer First balances customer preference and short travel. High Intensity puts technician productivity above customer preferences, meant for peak periods. Soft Boundaries lets technicians work across territory borders. Emergency is for urgent jobs. As a starting point I recommend Customer First with adjusted weights, instead of building a policy from scratch.

On top comes optimization. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=pfs_optimization.htm&language=en_US&type=5) it can rearrange the plan for one or more territories over several days, for example every night. On the day of service, in-day optimization absorbs short-notice changes, and there is a separate optimization for a single technician when an appointment is cancelled or runs late.

## Why does a dispatcher review before dispatch?

The engine only knows what is in the data. An experienced dispatcher knows more. They know that a customer has to shut down the machine for maintenance first and can only do that on certain days. They know that a spare part is booked in the warehouse but not yet in the van. They know which technician once had trouble with a customer, even if that is written down nowhere.

In my experience it is the customer's trust in the technology that decides how much they leave to automation. A company that had scheduling in experienced hands for years does not hand it to software on day one. A model in which automation schedules up to Scheduled and the dispatcher releases with Dispatched takes that seriously. The dispatcher stays responsible, but starts from a finished proposal instead of an empty calendar.

A fixed rhythm helps with the review. Trailhead suggests releasing the morning appointments first and checking the plan again before midday, before the afternoon appointments go out. That keeps the afternoon flexible if something goes wrong in the morning.

The model has a cost too. Every dispatcher needs a Dispatcher licence, and according to the price list it costs as much as a Technician licence. The numbers are in part 1. If dispatchers check every appointment by hand forever, you pay for automation you do not use.

## When can dispatch run automatically?

Field Service can also release appointments automatically. According to [Salesforce Help](https://help.salesforce.com/s/articleView?id=service.pfs_dispatching_appointments.htm&language=en_US&type=5), a scheduled job changes appointments from Scheduled to Dispatched. With drip feed, Field Service keeps only a set number of appointments in each technician's queue, two for a value of two. When one is done, the next one follows. The rest of the plan stays flexible.

I would tie the step there to one number: how often does the dispatcher change the engine's proposal before releasing it? If they change it often, data is missing or the policy does not fit. Then it helps to collect the reason for each change and turn it into data or work rules. Typical reasons and what follows from them:

| Reason for the change | What is missing in Field Service |
|---|---|
| Customer only accessible on certain days | Operating hours on the account and the visiting hours work rule |
| Part not in the van | Stock on the van as a mobile location |
| Technician does not know the equipment | Skill on the technician or a preferred technician on the account |
| Technician is in training that day | Absence in Salesforce |

According to the [Salesforce data model](https://developer.salesforce.com/docs/atlas.en-us.field_service_dev.meta/field_service_dev/fsl_dev_soap_core.htm), preferred, required or excluded technicians can be stored as resource preferences on the account or work order. That captures part of the knowledge that otherwise lives only in the dispatcher's head. If they hardly change it any more, dispatch can run automatically for simple work types, such as planned maintenance. Breakdowns with an unclear cause or jobs that need a shutdown at the customer stay with the dispatcher longer.

That way automation grows with trust, and not by a plan someone fixed before the project. Which role spare parts play in this, meaning who knows whether the part is in the van, is the topic of the next part of the series.

## Where should you start?

Start with Customer First, the work rules for skills and visiting hours and the rule that the dispatcher releases every appointment. Have the dispatchers note for four weeks why they change a proposal. That list is the basis for every further step of automation and shows which data is still missing.

If you are about to introduce scheduling and want an independent view on how much automation fits your field service, [get in touch](#contact).
