---
title: "Salesforce hypercare after go-live: duration and setup"
metaTitle: "Salesforce hypercare plan: team, duration and exit criteria"
description: "Hypercare after a Salesforce go-live: the team, daily triage, escalation, rules for quick wins and the exit criteria that tell you when it can end."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-hypercare-after-go-live
translationKey: change-hypercare
topic: governance
categories: [change-management, devops]
coAuthor: juliane
contactBrief: change
tags: [hypercare, go-live, change management, Salesforce rollout, support]
takeaways:
  - "Regular support does not know the new processes yet, and its response times do not fit a sales team that has to send a quote today."
  - "It ends on criteria agreed in advance, such as no open critical defects and a falling number of new questions, not on a fixed date."
  - "Critical incidents are escalated right away, all other tickets sorted daily. Small, testable requests are delivered during hypercare."
  - "The intensive phase usually lasts a few weeks. In my projects hypercare then continued at times for up to three months with weekly calls."
  - "Hypercare is also change management: the questions of the first weeks show at which ADKAR stage a group is stuck."
faq:
  - q: "What is hypercare?"
    a: "Hypercare is the phase right after a go-live in which the project team, partners and key users are more available, defects are fixed faster and user questions are collected until operations takes over."
  - q: "How long does hypercare last after a Salesforce go-live?"
    a: "The intensive phase with daily triage usually lasts a few weeks; in complex rollouts a calmer stabilization with weekly meetings follows, up to about three months in total. What matters are exit criteria fixed in advance, such as no open critical defects and a falling number of new tickets. In a rollout in waves it starts again in every country."
  - q: "Who belongs on the hypercare team?"
    a: "The product owner, an admin, developers from the delivery partner, the key users of the affected groups and one person from the future support team who will take over operations."
  - q: "Can you deliver new features during hypercare?"
    a: "Small improvements from user feedback, yes, if they are testable and easy to roll back, do not delay a defect fix and go through the regular pipeline with testing."
  - q: "Who runs hypercare when several delivery partners are involved?"
    a: "The client. It keeps one shared list of all tickets, and every ticket has exactly one coordinating owner, even when Salesforce, ERP and integration partners look for the cause together. Partners may keep their own tickets, but those do not replace the shared status. Larger new features go to the backlog and come with the next regular release."
draft: false
---

Hypercare is the period right after a Salesforce go-live in which the project team, partners and key users stay more available until the new process runs stably in daily work. The intensive phase usually lasts a few weeks, up to three months with a calmer stabilization, and ends on exit criteria agreed in advance, not on a fixed date. Critical incidents are escalated right away; a daily meeting sorts all other tickets into defect, how-to question, data issue or change request. Small requests become quick wins, large ones go to the backlog. It is also the best source for change management: early questions show where a group is stuck.

## Why does a go-live need hypercare?

In the first days after a go-live three things come together: defects that testing did not find, questions from users handling real cases for the first time, and migrated data that is not quite right. Regular support is not built for this. It does not know the new processes yet, and its response times do not fit a sales team that has to send a quote today.

Anyone who gets no quick answer in this phase finds a way around it. The quote goes out of Word again after all, a job is assigned by phone. These detours quickly become habits, and habits are harder to change later than any defect. In the [ADKAR model](../change-management-salesforce-rollout/) this usually points to the ability stage: users know how it works but cannot yet manage it alone in daily work. Deliberate workarounds can also mean that the benefit is not understood.

## A small hypercare team that can decide

A small team that can make decisions and fix defects:

- **The client's product owner.** Assesses the business impact and sets priorities. When it is disputed whether something is a defect or a change request, the product owner settles it with architecture and the partner, based on requirement, design and acceptance.
- **Admin.** Sorts out permissions, layouts and data issues quickly. Changes go through the agreed approval path depending on risk, and data corrections are documented.
- **Developers from the delivery partner.** Fix defects in code, flows and interfaces.
- **[Key users](../salesforce-key-user-network/) of the affected groups.** Answer how-to questions on site and report what does not work in their team.
- **One person from future support.** Learns the cases from the start, so the handover leaves no gap.

With interfaces to the ERP, someone from the ERP team belongs there too. Many tickets in the first days are data that arrives in the ERP differently than expected, and they can only be resolved together.

## Triage daily, escalate critical incidents right away

All tickets come in through one channel, not through chat, email and hallway requests in parallel. Anything that blocks the business, such as quotes that cannot be approved or orders that do not reach the ERP, does not wait until the next morning but goes straight through the agreed escalation path. For everything else my recommendation for the first days after go-live is a fixed slot in the morning, 15 to 30 minutes, with all tickets from the previous day. Once the number of tickets falls, a weekly status call is enough. Every ticket gets one of four categories:

| Category | Example | What happens |
|---|---|---|
| Defect | Quote cannot be approved | Partner fixes it, the fix goes through the pipeline |
| How-to question | "Where do I find the spare parts list?" | Key user answers, the question goes on the list for refresher training |
| Data issue | Migrated customer without a contact person | Admin or data team corrects it |
| Change request | "We would like that field further up" | small: quick win during hypercare, large: backlog |

The last row deserves attention. After a go-live many reasonable requests come in. Small improvements that are quick to deliver, easy to test and easy to roll back belong in hypercare: users see that their feedback changes something, and that builds desire more than a newsletter. Two rules apply. Defects always come first, and quick wins too go through the regular pipeline with testing, because every change can bring new defects. Larger requests go to the backlog and come with the next regular release. How releases continue afterwards is covered in [Communicating Salesforce releases to the business](../salesforce-release-communication-business/).

```hinweis tipp
Count tickets per category and per group every day. Many how-to questions from one team point to a gap in training. Many change requests from one team show it was not involved in the decisions beforehand.
```

## Which tools in Salesforce help?

Salesforce brings several things that save time in hypercare. With "Log in as another user" the admin sees what a user sees and finds missing permissions without long back and forth. This needs the right permission, and depending on the settings the user has to grant access first. The Setup Audit Trail shows who changed what in setup and when, which helps when something else stops working after a fix. Login history shows who logs in, and reports on created records show which groups work in the system at all. Both are signals of activity, not proof that a process works.

For usage it pays to have the reports ready at go-live that will later measure success. Then hypercare shows from day one whether a team works in the system or only reads. Which figures these are is covered in [Measuring Salesforce adoption after go-live](../salesforce-adoption-metrics-after-go-live/).

## When does hypercare end?

When the criteria agreed beforehand are met. A fixed date means hypercare ends while critical defects are still open, or that it keeps running out of habit. Agree the criteria with the product owner and operations before go-live, for example:

- No open defect of the highest priority for a week.
- The number of new tickets per day has been falling for at least a week.
- Interfaces and batch jobs to the ERP run stably.
- Every open item has an owner, a date and a target release.
- Support knows the most frequent cases and has the guides for them.

Usage figures belong on the radar, but not necessarily in the exit criteria. A system can be stable and handed over to operations while change management continues for individual groups.

```praxis
I usually combined hypercare with implementing feedback and quick wins. At times it ran for up to three months, with weekly status calls. The time is worth it, because in those weeks feedback turns into visible improvements.
```

So plan in weeks to months rather than days, depending on the number of groups and ERP interfaces. In a rollout in waves, hypercare starts again in every country, as described in [Change management in a global Salesforce rollout](../change-management-global-salesforce-rollout/).

A shorter version without the Salesforce detail, which applies just as well to ERP or a service portal, is on LinkedIn: [Hypercare after go-live: what it means, how long it lasts and when it ends](https://www.linkedin.com/pulse/hypercare-after-go-live-what-means-how-long-lasts-edmee/).

## How do you hand over to operations?

The handover is the moment the project team moves on. It works well when support sat at the table from the start and the handover happens step by step: first it takes over how-to questions, then data issues, and last the steering of defects with the partner.

After the handover one task remains for change management: the collected questions and tickets show which groups still need support. That list belongs to the sponsor, not in the archive.

## Put team, meetings and exit criteria in writing

Before the next go-live, put in writing who is on the hypercare team, how often it meets and on which criteria hypercare ends. Plan the person from support in from the start, so the handover to operations can happen step by step. How we set up hypercare in programs is described under [Salesforce change management consulting](../../services/change-management-salesforce/).
