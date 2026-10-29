---
title: "Salesforce change management: why rollouts fail"
description: "Salesforce change management: why CRM rollouts fail in daily work, how the ADKAR model shows the cause and where manufacturers should start."
pubDate: 2026-10-29
lang: en
slug: change-management-salesforce-rollout
translationKey: change-management-hub
topic: governance
categories: [change-management, architecture]
contactBrief: change
tags: [change management, ADKAR, Prosci, Salesforce rollout]
takeaways:
  - "A Salesforce rollout rarely fails because of the technology. It fails when people keep working the way they did before go-live, with Excel, email and their own lists."
  - "Prosci's ADKAR model shows at which of five stages it is stuck: awareness, desire, knowledge, ability or reinforcement. Another training session only helps with two of them."
  - "In the Prosci study, projects with excellent change management met their objectives in 88 percent of cases, projects with poor change management in 13 percent."
  - "Change management concerns not only business users but also development teams and partners who are supposed to build to new standards."
faq:
  - q: "What is change management in a Salesforce project?"
    a: "Change management means introducing new processes, standards and releases so that the people who work with them actually use them. It runs alongside the technical delivery and does not end at go-live."
  - q: "What is the ADKAR model?"
    a: "A model by Prosci with five stages every person goes through in a change: awareness, desire, knowledge, ability and reinforcement. When an adoption stalls, one of these stages is usually missing."
  - q: "Does every Salesforce project need change management?"
    a: "Every project that changes how people work. Many clients think they do not need it because training is planned. Training only covers knowledge and ability, not awareness, desire and reinforcement."
  - q: "Who is responsible for change management in a Salesforce programme?"
    a: "The client, with a sponsor in management who visibly backs the change. Partners build the system; they cannot own the change inside the company."
  - q: "Is change management the same as IT change management?"
    a: "No. IT change management in the ITIL sense controls changes to systems: who requests, reviews and approves a change. In Salesforce that is the job of release management and deployment. Change management in the sense of this article makes sure people adopt the change. A CRM rollout needs both."
draft: false
---

Salesforce rollouts rarely fail because of the technology. They fail when sales, service and field service keep working the way they did before go-live, with Excel, email and their own lists next to the new system. Salesforce change management is the work that prevents this: introducing new processes, standards and releases so that people use them. I follow Prosci and the ADKAR model, because it shows where an adoption is stuck. Another training session only helps when knowledge is missing, not when nobody understands what the whole thing is for.

## Why does Salesforce not take hold in daily work?

A release is rolled out technically in minutes. What happens afterwards decides whether anyone works differently. In Salesforce programmes the reasons why they do not are almost always the same:

- **The people affected hear about it too late.** Whoever first sees a change in production looks for a way around it.
- **Nobody explains why.** A sales team maintains opportunities because it has to and does not know that demand planning depends on them.
- **Management backing is missing.** Without decisions from the top, new rules stay a recommendation.
- **There is no way back.** Problems from daily work end up in emails, not in the backlog.

This does not only apply to business users. When a programme introduces new standards for development and release, development teams and implementation partners are just as affected. They know the rules but interpret them differently as long as nobody anchors them.

```praxis
Many clients think they do not need change management. The budget is allocated, training is planned, and users will get used to it. I keep bringing it up anyway, during planning, before every country and after every go-live. In the worldwide Manufacturing Cloud rollout I would do it even earlier and more often today.
```

## What does the ADKAR model show?

Prosci has surveyed projects about their experience with change since 1998. In the 12th edition of its study [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf) with 2,668 participants, projects with excellent change management met their objectives in 88 percent of cases, projects with poor change management in 13 percent. Participants named active and visible sponsorship by management as the most important success factor.

The [ADKAR model](https://www.prosci.com/blog/adkar-model) describes five stages every person goes through in a change. For a Salesforce programme I translate them like this:

| Stage | Question | Typical sign it is missing | Who helps |
|---|---|---|---|
| Awareness | Why is something changing? | "The old system worked fine." | the group's manager |
| Desire | Do I want to take part? | required fields filled with dots | sponsor, direct manager |
| Knowledge | Do I know how it works? | questions about how to find a feature | training, key users |
| Ability | Can I do it in daily work? | works in training, not in the customer meeting | key users on site, practice |
| Reinforcement | Do I stick with it? | back to Excel after three months | reports, checks, recognition |

The value lies in the diagnosis. Instead of scheduling the next training when usage is low, we ask for each affected group at which stage it is stuck. If sales does not know what maintained opportunities are needed for, awareness is missing, and the head of sales has to explain that, not the trainer.

The sponsor deserves a sentence of its own, because it is the role most often missing in Salesforce programmes. It means a person from management who visibly backs the change: they explain in the sales meeting why forecasts will come from Salesforce from now on, decide when two departments cannot agree, and ask about usage in the monthly report. That is why I write a sponsor plan that defines what management does visibly and when. Without it, "management supports this" becomes a line on the first slide.

Prosci and ADKAR are registered trademarks of Prosci, Inc. I adapted the approach to Salesforce programmes together with [Juliane Winterscheid](../../partners/juliane-winterscheid/), my cooperation partner for change management.

## Which topics belong to change management in Salesforce programmes?

Change management is not a single work step. The same topics come up again and again in Salesforce programmes at manufacturers. Each one has its own article:

1. **[Building up key users](../salesforce-key-user-network/):** who answers the first questions in the business and how much time that takes.
2. **[Change management in a global rollout](../change-management-global-salesforce-rollout/):** what each country needs when a global template is rolled out.
3. **[Technician adoption of the Field Service app](../field-service-app-technician-adoption/):** why field service accepts the app or works around it.
4. **[Communicating releases to the business](../salesforce-release-communication-business/):** how business users learn before a release what changes.
5. **[Reinforcement: making standards stick with partners](../partner-standards-reinforcement/):** how new development rules stay part of the partners' daily work.
6. **[Measuring adoption after go-live](../salesforce-adoption-metrics-after-go-live/):** which numbers show whether a process has landed.
7. **[Adoption in sales](../salesforce-adoption-sales-team/):** why sales works around Salesforce and what helps.
8. **[Training plan](../salesforce-training-plan-rollout/):** how to plan training by role, on real cases and through key users.
9. **[Hypercare after go-live](../salesforce-hypercare-after-go-live/):** who is on hand in the first weeks and when it ends.
10. **[Change management process in the project](../change-management-process-salesforce/):** which change work belongs in which project phase, from planning to operations.

The general tools behind this are explained by Juliane Winterscheid in her own articles on the basics: the [stakeholder analysis](../stakeholder-analysis/) with a template, the [communication plan](../change-management-communication-plan/) and the [change curve](../change-curve/).

## How does change management run alongside delivery?

Prosci structures the work at the level of the organisation in three phases, the [Prosci 3-Phase Process](https://www.prosci.com/methodology/3-phase-process). In a Salesforce programme they run alongside the release plan:

```schritte
Prepare approach | before the first release · client with sponsor
  Define how success is measured, which groups are affected, what changes for each and who in management carries the change.
Manage change | with every release · client, key users
  One plan per group along the ADKAR stages, linked to the release plan. Measure usage and adjust where it is stuck.
Sustain outcomes | after go-live · internal owners
  Check for gaps, anchor new rules in pipeline, reports and Center of Excellence calls, hand over responsibility.
```

Timing is what matters. Change management that starts two weeks before go-live can only inform. The question of which groups are affected and what changes for them belongs in planning, before anything is built. With a [global template](../salesforce-global-template-country-deviations/) it is even part of the architecture, because every deviation per country is also a question of habit.

## Where do you start?

For your next release, answer three questions in writing: which groups are affected? What changes for each in their daily work? Who in management visibly backs it? If the third answer is missing, that is the first step. Then decide how you measure success, for example by usage numbers in Salesforce instead of the number of training sessions.

If you want to go through the five stages in order, the [change management masterclass](../../masterclass/change-management/) has a chapter per stage with the matching articles.

Salesforce is only introduced once people work with it. If a rollout is coming up or new processes are not being used, [send me a message](#contact) or read more about my [Salesforce change management consulting](../../services/change-management-salesforce/).
