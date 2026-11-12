---
title: "Measuring Salesforce adoption and reinforcing standards"
description: "Reinforcement in Salesforce programs: measure usage on four levels, spot shadow lists and anchor standards with partners through the pipeline and a CoE call."
lang: en
slug: measure-adoption-and-reinforce
course: change-management
translationKey: cm-05
chapter: 5
pubDate: 2026-10-29
short: "Measure and reinforce"
summary: "Reinforcement: measure usage on four levels, spot shadow lists and keep standards in place with partners for good."
takeaways:
  - "Whether a process is used shows in records created and maintained per group and country, not in logins or the number of training sessions."
  - "I measure on four levels: activity, use of the process, data quality and outcome, each against a baseline from before go-live."
  - "Measure monthly for at least six months; whether a process sticks only shows after three to six months."
  - "With partners, the pipeline, pull request reviews and a Center of Excellence call anchor the standards; they only last with an internal owner."
articles: [change-adoption-metrics, change-reinforcement-standards, salesforce-center-of-excellence, development-standards-definition-of-done, field-service-kpis-after-go-live]
faq:
  - q: "Which figures show whether Salesforce is used?"
    a: "Figures at the level of the process, such as the share of quotes created in Salesforce or of work orders completed in the app. Add data quality such as new duplicates. Logins alone say little, because they also count people who only export."
  - q: "How do you spot shadow lists next to Salesforce?"
    a: "By gaps between logins and records created, by bulk updates just before reporting dates and by frequent exports to Excel. None of these signs is proof, but each is a reason to talk to the team."
  - q: "How do development standards stay in place with partners?"
    a: "Whatever can be checked automatically is checked in the pipeline. Pull request reviews on the client side and a regular call with the technical leads cover the rest. The contract refers to the current version of the standards, and an internal owner takes them over."
draft: false
---

Reinforcement, the last stage of the ADKAR model, makes sure a change sticks. In Salesforce programs that means two things. With business teams you measure usage on four levels, activity, use of the process, data quality and outcome, against a baseline from before go-live, and the sponsor discusses the figures every month. With developer teams and partners, the pipeline, pull request reviews and a regular Center of Excellence call anchor the standards. Both only last once an internal owner leads them.

## Why does usage drop after go-live?

What happens in the first weeks after go-live is misleading. Everyone is watching, key users sit with the teams, and many people try the new system out of curiosity. After three to six months the project team has moved on, and that is when it shows whether a process sticks. If a figure drops in this period, reinforcement is missing. Another training session changes nothing, because people know how it works. What is missing are reasons to stay with it: a sponsor who asks, reports built on the data and checks that make shortcuts visible.

The number of people trained is no measure for this. It proves the project's work and says nothing about how the teams actually work.

## Four levels, measured against the baseline before go-live

In Salesforce almost every action leaves a record with a timestamp and an owner, which makes measuring easy. I measure on four levels. For this masterclass the more useful part is what a drop on one level says about the ADKAR stage:

| Level | Typical figure | If it drops, usually missing |
|---|---|---|
| Activity | active users per week | Awareness or desire: the team sees no reason to log in |
| Use of the process | share of quotes from Salesforce | Ability: the process does not work in daily business, or a side list is more convenient |
| Data quality | required fields with real content, new duplicates | Desire or knowledge: fields are filled because they must be, without knowing why |
| Outcome | forecast accuracy, lead time from quote to order | Reinforcement: nobody asks about the figures, so everything stays as it was |

Salesforce delivers the first level almost for free through login history and Lightning usage data. The meaningful figures are on the second and third levels, and you have to define those for your own processes. For field service the list of KPIs is in [Field Service KPIs after go-live](/en/blog/field-service-kpis-after-go-live/), for all other areas the method is in [Measuring Salesforce adoption after go-live](/en/blog/salesforce-adoption-metrics-after-go-live/).

```hinweis achtung
Record before go-live how many quotes are created per month today, in whatever tool. Without that figure you cannot read 200 quotes in Salesforce later as either a success or a warning.
```

## How do you spot shadow lists?

Low usage gets most expensive when a separate list is still kept next to Salesforce. It gives itself away in three ways. High login figures with few new records mean the team looks things up and works elsewhere. Large waves of updates just before the monthly report to management mean records are filled in afterwards. And reports exported to Excel on a regular basis often feed exactly that list.

None of this proves anything, but each sign is a reason for a conversation with the team, ideally through the key user from [chapter 3](/en/masterclass/change-management/key-users-and-training/). Then the diagnosis from [chapter 1](/en/masterclass/change-management/change-management-adkar-diagnosis/) follows: at which stage is the group stuck?

## Who gets which figure?

In the steering committee two or three figures per process from use and outcome are enough, each with the trend since go-live. The sponsor of a country or department sees the same figures for their teams, and their question in the monthly report already works as reinforcement. Key users and team leads get the detailed view as a basis for conversations. A public ranking of individuals leads to polished figures rather than maintained data, and in Germany such an evaluation needs to be agreed with the works council beforehand, as described in [chapter 2](/en/masterclass/change-management/sponsor-and-communication/). In a global rollout you measure per country, because every country has its own curve.

## With partners, pipeline, review and Center of Excellence call anchor the standards

Change management also affects developer teams and implementation partners. New standards for development and release water down after a few months, when new developers join, deadline pressure rises and attention fades. Then knowledge is not what is missing; reinforcement is.

```praxis
In my largest program with more than 30 developers in eight streams and five implementation partners, I reviewed every pull request myself at the start. It took about three months until the standards were followed in daily work. After that we discussed new topics every two weeks in a Center of Excellence call with the technical leads of the streams. Once the process ran smoothly, I handed it over to an internal colleague.
```

Each lever covers a different part:

- **Automatic checks in the pipeline** for names, forbidden patterns and test coverage. This is the cheapest lever, because it never gets tired.
- **Pull request review on the client side** for design, object ownership and fit with the architecture.
- **Center of Excellence call** for new edge cases. The technical leads carry the decisions into their teams; format and cadence are in [Salesforce Center of Excellence: format and cadence](/en/blog/salesforce-center-of-excellence-cadence/).
- **Onboarding of new developers,** owned by the partner and checked by the client.
- **Contract** that refers to the current version of the standards and excludes violations from acceptance.

There will be exceptions under deadline pressure. They need a justification in the pull request and a ticket for the fix. All levers in detail are in [Reinforcement: anchoring standards with partners](/en/blog/partner-standards-reinforcement/).

## The change lasts when it holds without the people who introduced it

With business teams, the figures at process level stay stable after six months, and new colleagues learn the process from key users instead of from old lists. With partners, reviewers flag the same points less often, new edge cases are raised in the call before they are built, and new developers follow the rules without anyone explaining them one by one. In both cases the change is anchored when it holds without the person who introduced it. So plan from the start who takes over on the client side. How I support you with this is on the page [Change management for Salesforce programs](/en/services/change-management-salesforce/).

This chapter ends the masterclass. All chapters and articles are on the [overview page](/en/masterclass/change-management/).
