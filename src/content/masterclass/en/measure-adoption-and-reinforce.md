---
title: "Measuring Salesforce adoption and reinforcing standards"
description: "Reinforcement in Salesforce programmes: measure usage on four levels, spot shadow lists and anchor standards with partners through the pipeline and a CoE call."
lang: en
slug: measure-adoption-and-reinforce
course: change-management
translationKey: cm-05
chapter: 5
pubDate: 2026-10-29
short: "Measure and reinforce"
summary: "Reinforcement: measure usage on four levels, spot shadow lists and keep standards in place with partners for good."
takeaways:
  - "Whether a process has arrived shows in records created and maintained per group and country, not in logins or the number of training sessions."
  - "I measure on four levels: activity, use of the process, data quality and outcome, each against a baseline from before go-live."
  - "Measure monthly for at least six months; whether a process sticks only shows after three to six months."
  - "With partners, the pipeline, pull request reviews and a Center of Excellence call anchor the standards; they only last with an internal owner."
articles: [change-adoption-metrics, change-reinforcement-standards, salesforce-center-of-excellence, development-standards-definition-of-done, field-service-kpis-after-go-live]
faq:
  - q: "Which figures show whether Salesforce is used?"
    a: "Figures at the level of the process, such as the share of quotes created in Salesforce or of work orders completed in the app. Add data quality such as new duplicates. Logins alone say little, because someone who only exports also counts."
  - q: "How do you spot shadow lists next to Salesforce?"
    a: "By gaps between logins and records created, by bulk updates just before reporting dates and by frequent exports to Excel. None of these signs is proof, but each is a reason to talk to the team."
  - q: "How do development standards stay in place with partners?"
    a: "Whatever can be checked automatically goes into the pipeline. The rest runs through pull request reviews on the client side and a regular call with the technical leads. The contract refers to the current version of the standards, and an internal owner takes them over."
draft: false
---

Reinforcement, the last stage of the ADKAR model, makes sure a change sticks. In Salesforce programmes that means two things. With business teams you measure usage on four levels, activity, use of the process, data quality and outcome, against a baseline from before go-live, and the sponsor discusses the figures every month. With developer teams and partners, the pipeline, pull request reviews and a regular Center of Excellence call anchor the standards. Both only last once an internal owner leads them.

## Why does usage drop after go-live?

The first weeks after go-live are distorted. Attention is high, key users are present and many people try out the new system. After three to six months the project team has moved on, and that is when it shows whether a process sticks. If a figure drops in this period, reinforcement is missing. Another training session changes nothing, because people know how it works. What is missing are reasons to stay with it: a sponsor who asks, reports built on the data and checks that make shortcuts visible.

Many programmes report after go-live how many people were trained. That figure says the project did its job. It does not say whether anyone works differently.

## Four levels, measured against the baseline before go-live

Salesforce helps with measuring, because almost everything a user does leaves a record with a timestamp and an owner. I measure on four levels:

| Level | Question | Examples |
|---|---|---|
| Activity | Do users open the system? | active users per week, logins, page views |
| Use of the process | Does the process happen in Salesforce? | quotes from Salesforce instead of Word, orders completed in the app |
| Data quality | Is the data usable? | required fields filled sensibly instead of with dots, new duplicates |
| Outcome | Does it deliver what it was built for? | forecast accuracy, first-time fix rate, lead time from quote to order |

Salesforce delivers the first level almost for free through login history and Lightning usage data. The meaningful figures are on the second and third levels, and you have to define those for your own processes. For field service the list of KPIs is in [Field Service KPIs after go-live](../../../blog/field-service-kpis-after-go-live/), for all other areas the method is in [Measuring Salesforce adoption after go-live](../../../blog/salesforce-adoption-metrics-after-go-live/).

```hinweis achtung
Set a baseline before go-live, for example how many quotes are created per month today, whatever the system. Without a baseline you will not know after go-live whether 200 quotes in Salesforce is a lot or a little.
```

## How do you spot shadow lists?

The most expensive form of low usage is the list next to the system. Three signs point to it:

- **Gaps between activity and process.** A team logs in daily but hardly creates records. Then people read here and work elsewhere.
- **Bulk updates after the fact.** Records are updated in large batches once a month, just before the report to management.
- **Frequent exports.** Reports that regularly go to Excel are often the basis of a separate list.

None of these signs is proof. Each is a reason to talk to the team, ideally through the key user from [chapter 3](../key-users-and-training/). Then the diagnosis from [chapter 1](../change-management-adkar-diagnosis/) follows: at which stage is the group stuck?

## Who gets which figure?

The steering committee needs two or three figures per process on the levels of use and outcome, with the trend since go-live. The sponsor of a country or department needs the same figures for their teams. When they ask about them in the monthly report, that is reinforcement in itself. Key users and team leads need the detailed view, but for conversations, not for rankings. Whoever compares individuals publicly gets well kept figures instead of well kept data, and in Germany such an evaluation needs to be agreed with the works council beforehand, as described in [chapter 2](../sponsor-and-communication/). In a global rollout you measure per country, because every country has its own curve.

## With partners, pipeline, review and Center of Excellence call anchor the standards

Change management also affects developer teams and implementation partners. New standards for development and release water down after a few months, when new developers join, deadline pressure rises and attention fades. Then knowledge is not what is missing; reinforcement is.

```praxis
In my largest programme with more than 30 developers in eight streams and five implementation partners, every pull request went across my desk at the start. It took about three months until the standards were lived. After that we brought new topics to the table every two weeks in a Center of Excellence call with the technical leads of the streams. Once the process ran smoothly, I handed it over to an internal colleague.
```

Each lever covers a different part:

- **Automatic checks in the pipeline** for names, forbidden patterns and test coverage. This is the cheapest lever, because it never gets tired.
- **Pull request review on the client side** for design, object ownership and fit with the architecture.
- **Center of Excellence call** for new edge cases. The technical leads carry the decisions into their teams; format and cadence are in [Salesforce Center of Excellence: format and cadence](../../../blog/salesforce-center-of-excellence-cadence/).
- **Onboarding of new developers,** owned by the partner and checked by the client.
- **Contract** that refers to the current version of the standards and excludes violations from acceptance.

There will be exceptions under deadline pressure. They need a justification in the pull request and a ticket for the fix. All levers in detail are in [Reinforcement: anchoring standards with partners](../../../blog/partner-standards-reinforcement/).

## The change lasts when it holds without the people who introduced it

With business teams, the figures at process level stay stable after six months, and new colleagues learn the process from key users instead of from old lists. With partners, reviewers flag the same points less often, new edge cases come to the call before they are built, and new developers follow the rules without anyone explaining them one by one. In both cases the change is anchored when it holds without the person who introduced it. So plan from the start who takes over on the client side. How I support you with this is on the page [Change management for Salesforce programmes](../../../services/change-management-salesforce/).

This chapter ends the masterclass. All chapters and articles are on the [overview page](../).
