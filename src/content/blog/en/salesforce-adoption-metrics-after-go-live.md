---
title: "Measuring Salesforce adoption after go-live"
description: "Which numbers show after go-live whether a new Salesforce process has landed, where they come from and why logins alone say little about adoption."
pubDate: 2026-10-29
lang: en
slug: salesforce-adoption-metrics-after-go-live
translationKey: change-adoption-metrics
topic: data
categories: [architecture]
contactBrief: change
tags: [adoption, usage, change management, KPIs]
takeaways:
  - "Whether a process has landed is shown better by reports on records created and maintained than by any survey or by the number of training sessions."
  - "Logins say little. Whoever logs in to export a list and keeps working in Excel counts as an active user."
  - "I measure on four levels: activity, use of the process, data quality and outcome, each per group and country."
  - "The numbers are defined before go-live, with a baseline, and discussed regularly with the sponsor after go-live."
faq:
  - q: "How do you measure Salesforce adoption?"
    a: "With reports on records users create and maintain, split by group and country, plus logins and page views from Salesforce's usage data. What matters is whether the new process happens in Salesforce."
  - q: "Are login numbers enough as an adoption metric?"
    a: "No. A login only shows that someone opened the system. Whether they work in it or only export is shown by the records they create and change."
  - q: "When should you measure adoption?"
    a: "From the first month after go-live, monthly, for at least six months. The metrics and their baseline should be fixed before go-live."
  - q: "What if a group hardly uses Salesforce?"
    a: "Ask at which ADKAR stage it is stuck. If understanding of why is missing, no further training helps; then the group's manager has to explain what the data is needed for."
draft: false
---

Whether a new Salesforce process has landed after go-live is shown better by reports on records created and maintained, per group and country, than by any survey. Logins say little: whoever logs in, exports a list and keeps working in Excel counts as an active user. That is why I measure on four levels: activity, use of the process, data quality and outcome. Which numbers they are and which baseline applies is fixed before go-live. Afterwards the sponsor discusses them every month, so it shows when a group keeps working with its own lists next to Salesforce.

## Why measure adoption instead of training?

Many programmes report after go-live how many people were trained. That number says the project did its job. It does not say whether anyone works differently. That is why at the start I define how success is measured, for example by usage numbers in Salesforce instead of the number of training sessions.

Salesforce helps with measuring, because almost everything a user does leaves a record with a timestamp and an owner. Whether a sales team maintains its opportunities, whether inside sales creates quotes in Salesforce and whether technicians close work orders in the app can be counted with standard reports. That is more accurate than a survey in which everyone states that they use the system regularly.

## Which numbers show whether a process has landed?

I measure on four levels. Each answers a different question:

| Level | Question | Examples |
|---|---|---|
| Activity | Do users open the system? | active users per week, logins, page views |
| Use of the process | Does the process happen in Salesforce? | quotes from Salesforce instead of Word, work orders closed in the app, opportunities with a maintained next step |
| Data quality | Is the data usable? | required fields filled meaningfully instead of with dots, new duplicates, outdated records |
| Outcome | Does it deliver what it was built for? | forecast accuracy, first-time fix rate in service, lead time from quote to order |

Salesforce delivers the first level almost without effort. The login history in Setup shows who logged in when, and the usage data of the Lightning interface shows active users and pages viewed. For ready-made dashboards there are the free Adoption Dashboards by Salesforce Labs on AppExchange. The meaningful numbers, though, are on the second and third level, and you have to define those for your own processes.

For data quality, duplicates are a good early indicator: if the number of new duplicates rises in a country, users there create customers instead of searching for the existing ones. How to measure and prevent this is in [Salesforce duplicates: clean master data before AI](../salesforce-duplicates-master-data-cleanup/).

```hinweis achtung
Set a baseline before go-live, for example how many quotes are created per month today, in whatever system. Without a baseline you will not know after go-live whether 200 quotes in Salesforce are a lot or a little.
```

## How do you spot shadow solutions?

The most expensive form of low adoption is the list next to the system. A sales team that used to track its volumes in its own spreadsheet does not automatically work with the new process just because it is live. Three signs point to a shadow solution:

- **Gaps between activity and process.** A team logs in daily but hardly creates records. Then it reads in Salesforce and works elsewhere.
- **Bulk maintenance after the fact.** Records are updated once a month in large numbers, shortly before the report to management. The work happens elsewhere, Salesforce only gets the result.
- **Frequent exports.** Reports regularly exported to Excel are often the basis of a private list. In large orgs, Event Monitoring from Salesforce Shield shows such exports.

None of these signs is proof. It is a reason to talk to the team, ideally through the key user, as described in [key users in Salesforce rollouts](../salesforce-key-user-network/).

## What if the numbers are bad?

A bad number is a question, not an answer. I then ask at which stage of the [ADKAR model](../change-management-salesforce-rollout/) it is stuck. If a sales team does not know what maintained opportunities are needed for, awareness is missing, and the head of sales has to explain that, not the trainer. If technicians know the app but get stuck offline, ability is missing, and a technical change solves that, not a training session. For field service I describe this in [Field Service app: getting technicians on board](../field-service-app-technician-adoption/).

The numbers belong in the regular meeting with the sponsor. When the sponsor asks about their teams' usage in the monthly report, that is reinforcement in itself: the teams notice that it counts.

## Who gets which number?

Not every number belongs in every report. The steering committee needs two or three numbers per process, ideally on the levels of use and outcome, with the trend since go-live. A country's or department's sponsor needs the same numbers for their teams, so they can ask specific questions. Key users and team leads need the detailed view: which people hardly create records, which fields stay empty? This view is meant for conversations, not rankings. Whoever compares individuals publicly gets polished numbers instead of maintained data, and in Germany such an evaluation has to be clarified with the works council beforehand anyway.

## How long should you measure?

At least six months, monthly. The first weeks after go-live are distorted: attention is high, key users are present, and many people try out the new system. Whether a process stays only shows after three to six months, when the project team has moved on. If a number drops during that time, reinforcement is missing. In a worldwide rollout, measure per country, because every country follows its own curve, see [change management in a global Salesforce rollout](../change-management-global-salesforce-rollout/).

## Where do you start?

For your most important new process, choose one number on the level "use of the process", such as the share of quotes created in Salesforce. Set the baseline before go-live and build a report that shows the number per group and country. After go-live, this report goes to the sponsor every month.

Salesforce is introduced when the work happens in it, not when everyone can log in. If you want to know whether your rollout has landed, [send me a message](#contact) or read more about [change management for Salesforce programmes](../../services/change-management-salesforce/).
