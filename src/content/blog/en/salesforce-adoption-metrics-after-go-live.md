---
title: "Measuring Salesforce adoption after go-live"
description: "Which numbers show after go-live whether a new Salesforce process has landed, where they come from and why logins alone say little about adoption."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-adoption-metrics-after-go-live
translationKey: change-adoption-metrics
topic: data
categories: [change-management, architecture]
coAuthor: juliane
contactBrief: change
tags: [adoption, usage, change management, KPIs]
takeaways:
  - "The number of training sessions shows readiness at best. It does not show whether anyone works differently after go-live."
  - "Logins say little. Anyone who logs in to export a list and keeps working in Excel counts as an active user."
  - "I measure on four levels: activity, use of the process, data quality and business outcome, as rates per group and country where possible."
  - "The numbers are defined before go-live, with a baseline and a target, and discussed regularly with the sponsor after go-live."
faq:
  - q: "How do you measure Salesforce adoption?"
    a: "Use reports on records users create and maintain, as a share of the relevant cases per group and country, plus logins and active users from Salesforce's usage data. What matters is whether the new process happens in Salesforce; interviews explain why it does or does not happen there."
  - q: "Are login numbers enough as an adoption metric?"
    a: "No. A login only shows that someone opened the system. The records they create and change, excluding imports and integration users, show more clearly whether they work in it or only export data."
  - q: "When should you measure adoption?"
    a: "Weekly in the first weeks after go-live, then monthly, at least until the process is stable, often six months or longer in rollout waves. The metrics, baseline and target should be fixed before go-live."
  - q: "What if a group hardly uses Salesforce?"
    a: "First rule out technical and process causes, then ask which ADKAR element is missing. If users do not understand why the change is needed, further training rarely helps; the group's manager has to explain what the data is needed for."
draft: false
---

Reports on records created and maintained by group and country show more reliably than a survey alone whether a new Salesforce process has landed after go-live; conversations with users then explain the numbers. Logins say little: anyone who logs in, exports a list and keeps working in Excel counts as an active user. That is why I measure on four levels: activity, use of the process, data quality and business outcome. The numbers and the baseline are defined before go-live. Afterwards, the sponsor discusses them every month, so it becomes clear when a group keeps working with its own lists alongside Salesforce.

## Training numbers say nothing about adoption

After go-live, many programs report how many people were trained. That number shows readiness at best. It does not say whether anyone works differently. That is why at the start I define how success is measured, for example by usage numbers in Salesforce instead of the number of training sessions.

Salesforce helps with measuring, because every record stores who created it, who last changed it and when. Whether a sales team maintains its opportunities, whether inside sales creates quotes in Salesforce and whether technicians close work orders can be counted with standard reports. Tracking whether they did it in the mobile app requires a field or action that records the channel. Reading, exporting and earlier changes leave no trace in a normal report; field history must be switched on beforehand, and imports or integrations can hide who did the work. For observable system activity, this is still more reliable than a survey in which everyone states that they use the system regularly.

## Which numbers show whether a process has landed?

I measure on four levels. Each answers a different question:

| Level | Question | Examples |
|---|---|---|
| Activity | Do users open the system? | active users per week, logins, page views |
| Use of the process | Does the process happen in Salesforce? | share of quotes from Salesforce instead of Word, share of work orders closed on mobile, opportunities with a maintained next step |
| Data quality | Is the data usable? | required fields filled validly instead of with dots, new duplicates, outdated records |
| Business outcome | Does it deliver what it was built for? | forecast accuracy, first-time fix rate in service, lead time from quote to order |

The first three levels measure adoption, the fourth is benefit: an outcome can move for reasons that have nothing to do with Salesforce. Absolute record counts can be misleading when comparing countries of different sizes, so I divide by the number of relevant cases or expected users and leave out integration and admin users.

Salesforce provides the first level with little effort. The login history in Setup shows who logged in when, and the Lightning Usage App shows daily and monthly active users and the most viewed pages; for your own reports over time you need its API. For ready-made dashboards, Salesforce Labs offers the free Adoption Dashboards on AppExchange, a community project without official Salesforce support that focuses on sales objects. The meaningful numbers, though, are on the second and third levels, and you have to define those for your own processes.

For data quality, duplicates are a good early indicator: if the number of new duplicates rises in a country, users there may create customers instead of searching for existing customers. Rule out integration loads, permissions and changed matching rules first. How to measure and prevent this is in [Salesforce duplicates: clean master data before AI](../salesforce-duplicates-master-data-cleanup/).

```hinweis achtung
Set a baseline before go-live, for example, how many quotes are created per month today, in whatever system, and define a target for the share that should come from Salesforce. Without a baseline you will not know after go-live whether 200 quotes in Salesforce are a lot or a little.
```

## How do you spot shadow solutions?

The most expensive form of low adoption is the list kept outside the system. A sales team that used to track its sales volumes in its own spreadsheet does not automatically use the new process just because it is live. Three signs point to a shadow solution:

- **Gaps between activity and process.** A team logs in daily but hardly creates records. The team then reads in Salesforce and works elsewhere.
- **Bulk maintenance after the fact.** Records are updated once a month in large numbers, shortly before the management report. The work happens elsewhere; Salesforce only gets the result. Seeing this over time requires field history, snapshots or event data, because the last modified date only shows the latest change.
- **Frequent exports.** Reports regularly exported to Excel are often the basis of a private list. The Report Export event in paid Event Monitoring, available on its own or as part of Salesforce Shield, shows such exports.

None of these signs is proof. Each is a reason to talk to the team, ideally through the key user, as described in [key users in Salesforce rollouts](../salesforce-key-user-network/).

## What if the numbers are bad?

A bad number is a question, not an answer. I first rule out technical and process causes, then ask which element of the [ADKAR model](../change-management-salesforce-rollout/) is missing. If a sales team does not know why opportunities need to be maintained, awareness is missing, and the head of sales has to explain that, not the trainer. If technicians know the app but get stuck offline, the cause is often technical, such as offline priming or device issues, and a technical change solves that, not a training session. For field service I describe this in [Field Service app: getting technicians on board](../field-service-app-technician-adoption/).

The numbers belong in the regular meeting with the sponsor. When the sponsor asks about their teams' usage in the monthly report, that is reinforcement in itself: the teams notice that it matters.

## Steering committee, sponsor and key users need different numbers

Not every number belongs in every report. The steering committee needs two or three numbers per process, ideally at the use and outcome levels, with the trend since go-live. The sponsor for a country or department needs the same numbers for their teams, so they can ask specific questions. Key users and team leads need the detailed view: which people rarely create records, which fields stay empty? This view is meant for conversations, not rankings. Anyone who compares individuals publicly gets polished numbers instead of maintained data. In German companies with a works council, person-level usage reports can trigger co-determination under section 87(1) no. 6 of the Works Constitution Act, so agree on them before they are introduced, together with purpose, access rights and deletion periods.

## Measure weekly at first, then monthly for at least six months

Measure weekly in the first weeks, then monthly for at least six months, and longer with rollout waves. The first weeks after go-live are distorted: attention is high, key users are present, and many people try out the new system. Whether a process has taken hold only becomes clear after three to six months, when the project team has moved on. If a number drops during that time, check seasonality, case volumes and technical issues first; if none of these explains it, reinforcement is probably missing. In a worldwide rollout, measure by country, because every country follows its own curve. See [change management in a global Salesforce rollout](../change-management-global-salesforce-rollout/).

## Pick one adoption number for your most important process

For your most important new process, choose one number at the "use of the process" level, such as the share of all relevant quotes created in Salesforce. Before go-live, record the baseline, meaning the total number of quotes per country and month, and set a target for the Salesforce share. Build a report that shows the share per group and country. After go-live, this report goes to the sponsor every month. If the share in a country is below the target after three months, ask the key users there where in the process the work leaves Salesforce. We describe how we set this up in programs under [change management for Salesforce programs](../../services/change-management-salesforce/).
