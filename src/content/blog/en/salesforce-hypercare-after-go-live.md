---
title: "Salesforce hypercare after go-live: duration and setup"
description: "What hypercare after a Salesforce go-live has to deliver, who belongs on the team, how long it lasts and which criteria tell you when it ends."
pubDate: 2026-10-29
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
  - "A fixed meeting sorts every ticket into defect, how-to question, data issue or change request. Small requests are delivered during hypercare."
  - "In my projects hypercare at times ran for up to three months, with weekly status calls and the delivery of feedback and quick wins."
  - "Hypercare is also change management: the questions of the first weeks show at which ADKAR stage a group is stuck."
faq:
  - q: "What is hypercare?"
    a: "Hypercare is the phase right after a go-live in which the project team, partners and key users are more available, defects are fixed faster and user questions are collected until operations takes over."
  - q: "How long does hypercare last after a Salesforce go-live?"
    a: "A few weeks up to about three months. What matters are exit criteria fixed in advance, such as no open critical defects and a falling number of new tickets. In a rollout in waves it starts again in every country."
  - q: "Who belongs on the hypercare team?"
    a: "The product owner, an admin, developers from the delivery partner, the key users of the affected groups and one person from the future support team who will take over operations."
  - q: "Can you deliver new features during hypercare?"
    a: "Small improvements from user feedback, yes, as quick wins through the regular pipeline with testing. Larger new features go to the backlog and come with the next regular release."
draft: false
---

Hypercare is the period right after a Salesforce go-live in which the project team, partners and key users stay more available until the new process runs stably in daily work. It lasts a few weeks up to about three months and ends on criteria agreed in advance, not on a fixed date. A fixed meeting sorts every ticket into defect, how-to question, data issue or change request. Defects get fixed, questions answered, small requests delivered as quick wins, large ones go to the backlog. Hypercare is also the best source for change management, because the questions of the first weeks show where a group is stuck.

## Why does a go-live need hypercare?

In the first days after a go-live three things come together: defects that testing did not find, questions from users handling real cases for the first time, and migrated data that is not quite right. Regular support is not built for this. It does not know the new processes yet, and its response times do not fit a sales team that has to send a quote today.

Anyone who gets no quick answer in this phase finds a way around it. The quote goes out of Word again after all, a job is assigned by phone. These detours quickly become habits, and habits are harder to change later than any defect. In the [ADKAR model](../change-management-salesforce-rollout/) this is the ability stage: users know how it works but cannot yet manage it alone in daily work.

## A small hypercare team that can decide

A small team that can make decisions and fix defects:

- **The client's product owner.** Decides what is a defect and what is a change request, and sets priorities.
- **Admin.** Fixes permissions, layouts and data corrections right away.
- **Developers from the delivery partner.** Fix defects in code, flows and interfaces.
- **[Key users](../salesforce-key-user-network/) of the affected groups.** Answer how-to questions on site and report what does not work in their team.
- **One person from future support.** Learns the cases from the start, so the handover leaves no gap.

With interfaces to the ERP, someone from the ERP team belongs there too. Many tickets in the first days are data that arrives in the ERP differently than expected, and they can only be resolved together.

## A fixed meeting every morning

My recommendation for the first days after go-live: a fixed slot in the morning, 15 to 30 minutes, with all tickets from the previous day. Once the number of tickets falls, a weekly status call is enough. Every ticket gets one of four categories:

| Category | Example | What happens |
|---|---|---|
| Defect | Quote cannot be approved | Partner fixes it, the fix goes through the pipeline |
| How-to question | "Where do I find the spare parts list?" | Key user answers, the question goes on the list for refresher training |
| Data issue | Migrated customer without a contact person | Admin or data team corrects it |
| Change request | "We would like that field further up" | small: quick win during hypercare, large: backlog |

The last row deserves attention. After a go-live many reasonable requests come in. Small improvements that are quick to deliver belong in hypercare: users see that their feedback changes something, and that builds desire more than a newsletter. Two rules apply. Defects always come first, and quick wins too go through the regular pipeline with testing, because every change can bring new defects. Larger requests go to the backlog and come with the next regular release. How releases continue afterwards is covered in [Communicating Salesforce releases to the business](../salesforce-release-communication-business/).

```hinweis tipp
Count tickets per category and per group every day. Many how-to questions from one team point to a gap in training. Many change requests from one team show it was not involved in the decisions beforehand.
```

## Which tools in Salesforce help?

Salesforce brings several things that save time in hypercare. With "Log in as another user" the admin sees what a user sees and finds missing permissions in minutes instead of after long back and forth. The Setup Audit Trail shows who changed what in setup and when, which helps when something else stops working after a fix. Login history and simple reports on created records show which groups use the system at all.

For usage it pays to have the reports ready at go-live that will later measure success. Then hypercare shows from day one whether a team works in the system or only reads. Which figures these are is covered in [Measuring Salesforce adoption after go-live](../salesforce-adoption-metrics-after-go-live/).

## When does hypercare end?

When the criteria agreed beforehand are met. A fixed date means hypercare ends while critical defects are still open, or that it keeps running out of habit. Agree the criteria with the product owner and operations before go-live, for example:

- No open defect of the highest priority for a week.
- The number of new tickets per day has been falling for at least a week.
- The key usage figures are at the level set as the target before go-live.
- Support knows the most frequent cases and has the guides for them.

```praxis
I usually combined hypercare with implementing feedback and quick wins. At times it ran for up to three months, with weekly status calls. The time is worth it, because in those weeks feedback turns into visible improvements.
```

So plan in weeks to months rather than days, depending on the number of groups and ERP interfaces. In a rollout in waves, hypercare starts again in every country, as described in [Change management in a global Salesforce rollout](../change-management-global-salesforce-rollout/).

## How do you hand over to operations?

The handover is the moment the project team moves on. It works well when support sat at the table from the start and the handover happens step by step: first it takes over how-to questions, then data issues, and last the steering of defects with the partner.

After the handover one task remains for change management: the collected questions and tickets show which groups still need support. That list belongs to the sponsor, not in the archive.

## Put team, meetings and exit criteria in writing

Before the next go-live, put in writing who is on the hypercare team, how often it meets and on which criteria hypercare ends. Plan the person from support in from the start, so the handover to operations can happen step by step. How we set up hypercare in programmes is described under [Salesforce change management consulting](../../services/change-management-salesforce/).
