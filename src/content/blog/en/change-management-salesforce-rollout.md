---
title: "Salesforce change management: why rollouts fail"
description: "Salesforce change management: why CRM rollouts fail in daily work, how the ADKAR model shows the cause and where manufacturers should start."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: change-management-salesforce-rollout
translationKey: change-management-hub
topic: governance
categories: [change-management, architecture]
coAuthor: juliane
contactBrief: change
tags: [change management, ADKAR, Prosci, Salesforce rollout]
takeaways:
  - "A rollout fails when people keep working with Excel, email and their own lists after go-live."
  - "ADKAR shows which of five elements is missing. Training builds knowledge; practice and coaching build ability. Neither fixes missing awareness or desire."
  - "In Prosci's benchmarking, 88 percent of projects with excellent change management met or exceeded their objectives, against 13 percent with poor."
  - "Change management affects not only business users but also development teams and partners who are supposed to build to new standards."
faq:
  - q: "What is change management in a Salesforce project?"
    a: "Change management means introducing new processes, standards and releases so that the people who work with them actually use them. It runs alongside the technical delivery and does not end at go-live."
  - q: "What is the ADKAR model?"
    a: "It is a Prosci model with five elements a person needs for a change to succeed: awareness, desire, knowledge, ability and reinforcement. They build on each other, but people can fall back. When an adoption stalls, one of these elements is often missing."
  - q: "Does every Salesforce project need change management?"
    a: "Every project that changes how people work needs change management. Many clients think they do not need it because training is planned. Training mainly builds knowledge, and practice builds ability; neither solves missing awareness, desire or reinforcement on its own."
  - q: "Who is responsible for change management in a Salesforce program?"
    a: "The client, with a sponsor in management who visibly backs the change. Partners can lead or deliver change work, but sponsorship and accountability for adoption stay with the client's leadership and line managers."
  - q: "Is change management the same as IT change management?"
    a: "No. In ITIL, the practice for changes to systems is called Change Enablement: it assesses risks, authorizes changes and plans their schedule alongside release and deployment management. Change management in the sense of this article helps people adopt the change. A CRM rollout needs both."
draft: false
---

A technically successful Salesforce rollout can still fail to deliver value. It fails when sales, service and field service keep working the way they did before go-live, with Excel, email and their own lists alongside the new system. Salesforce change management is the work that prevents this: introducing new processes, standards and releases so that people use them. I follow Prosci and the ADKAR model, because it shows where adoption is stuck. Another training session builds knowledge; it does not help when nobody understands what the whole thing is for.

## Why does Salesforce not take hold in daily work?

The metadata deployment is often the shortest part of a release. What happens before and after the release decides whether anyone works differently. In Salesforce programs, common reasons include these:

- **The people affected hear about it too late.** People who first see a change in production look for a way around it.
- **Nobody explains why.** A sales team maintains opportunities because it has to, without knowing that demand planning depends on those opportunities.
- **Management backing is missing.** Without decisions from the top, new rules remain recommendations.
- **There is no structured feedback loop.** Day-to-day problems end up in emails, not in the backlog.

Low adoption can also point to real problems in the solution: extra typing, irrelevant required fields, poor mobile use or missing integrations. Those need fixing, not more communication.

This does not only apply to business users. When a program introduces new standards for development and release, development teams and implementation partners are just as affected. They may know the rules, but they interpret them differently until someone makes them binding.

```praxis
Many clients think they do not need change management. The budget is allocated, training is planned, and users will get used to it. I keep bringing it up anyway, during planning, before every country rollout and after every go-live. In the worldwide Manufacturing Cloud rollout I would do it even earlier and more often today.
```

## What does the ADKAR model show?

Prosci has surveyed projects about their experience with change since 1998. In the executive summary of the 12th edition of its study [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf), 88 percent of projects with excellent change management met or exceeded their objectives, compared with 13 percent of projects with poor change management. These figures come from Prosci's cumulative benchmarking data of more than 10,800 respondents and show a correlation, not proof of cause; the 12th edition itself had 2,668 participants. Participants named active and visible sponsorship by management as the most important success factor.

The [ADKAR model](https://www.prosci.com/blog/adkar-model) describes five elements a person needs for a change. They build on each other, but not in a straight line; people can fall back. For a Salesforce program I translate them like this:

| Element | Question | Possible sign it is missing | Who helps |
|---|---|---|---|
| Awareness | Why is something changing? | "The old system worked fine." | the group's manager |
| Desire | Do I want to take part? | required fields filled with dots | sponsor, direct manager |
| Knowledge | Do I know how it works? | questions about how to find a feature | training, key users |
| Ability | Can I do it in daily work? | works in training, not in the customer meeting | key users on site, practice |
| Reinforcement | Do I stick with it? | back to Excel after three months | reports, checks, recognition |

These signs are hypotheses, not diagnoses: dots in required fields can also indicate a badly designed field. Check them with the users concerned. The value lies in diagnosing the gap. Instead of scheduling the next training when usage is low, we ask which element is missing for each affected group. If sales does not know why opportunities need to be maintained, awareness is missing, and the head of sales has to explain that, not the trainer.

The sponsor deserves a sentence of its own, because it is the role most often missing in Salesforce programs. It means a person from management who visibly backs the change: they explain in the sales meeting why forecasts will come from Salesforce from now on, decide when two departments cannot agree, and ask about usage in the monthly report. That is why I write a sponsor plan that defines which visible actions management takes and when. Without it, "management supports this" becomes a line on the first slide.

Prosci and ADKAR are registered trademarks of Prosci, Inc. I adapted the approach to Salesforce programs together with [Juliane Winterscheid](/en/partners/juliane-winterscheid/), my partner for change management.

## These topics belong to change management in Salesforce programs

Change management is not a single step. The same topics come up again and again in Salesforce programs at manufacturers. Each one has its own article:

1. **[Building up key users](/en/blog/salesforce-key-user-network/):** who answers the first questions from the business and how much time that takes.
2. **[Change management in a global rollout](/en/blog/change-management-global-salesforce-rollout/):** what each country needs when a global template is rolled out.
3. **[Technician adoption of the Field Service app](/en/blog/field-service-app-technician-adoption/):** why field service accepts the app or works around it.
4. **[Communicating releases to the business](/en/blog/salesforce-release-communication-business/):** how business users learn what changes before a release.
5. **[Reinforcement: making standards stick with partners](/en/blog/partner-standards-reinforcement/):** how new development rules stay part of the partners' daily work.
6. **[Measuring adoption after go-live](/en/blog/salesforce-adoption-metrics-after-go-live/):** which numbers show whether a process has landed.
7. **[Adoption in sales](/en/blog/salesforce-adoption-sales-team/):** why sales works around Salesforce and what helps.
8. **[Training plan](/en/blog/salesforce-training-plan-rollout/):** how to plan training by role, using real cases and key users.
9. **[Hypercare after go-live](/en/blog/salesforce-hypercare-after-go-live/):** who is on hand in the first weeks and when it ends.
10. **[Change management process in the project](/en/blog/change-management-process-salesforce/):** which change work belongs in which project phase, from planning to operations.

Juliane Winterscheid explains the general tools behind this in her own articles on the basics: the [stakeholder analysis](/en/blog/stakeholder-analysis/) with a template, the [communication plan](/en/blog/change-management-communication-plan/) and the [change curve](/en/blog/change-curve/).

## Change management runs in three phases alongside delivery

Prosci structures the work at the organizational level in three phases, the [Prosci 3-Phase Process](https://www.prosci.com/methodology/3-phase-process). In a Salesforce program they run alongside the release plan:

```schritte
Prepare approach | before the first release · client with sponsor
  Define how success is measured, which groups are affected, what changes for each and who in management carries the change.
Manage change | with every release · client, key users
  One plan per group along the ADKAR elements, linked to the release plan. Measure usage and adjust where it is stuck.
Sustain outcomes | after go-live · internal owners
  Check for gaps, anchor new rules in pipeline, reports and Center of Excellence calls, hand over responsibility.
```

Timing is what matters. Change management that starts two weeks before go-live can do little more than inform people. The question of which groups are affected and what changes for them should be answered during planning, before anything is built. With a [global template](/en/blog/salesforce-global-template-country-deviations/) it is even part of the architecture, because some deviations per country are a question of habit, while others come from law, tax, contracts or the local ERP, and the rollout team has to tell them apart.

## Write down groups, changes and sponsor of your next release

For your next release, answer three questions in writing: which groups are affected? What changes for each group in their day-to-day work? Who in management visibly backs it? If the third answer is missing, start there. Then decide how you measure success, instead of counting training sessions: adoption (do the intended roles use the new process?), proficiency and data quality (do they do it correctly?) and business outcome, such as forecast quality or first-time fix rate.

If you want to go through the five elements one by one, the [change management masterclass](/en/masterclass/change-management/) has one chapter for each stage with the relevant articles. How Juliane Winterscheid and I support this in programs is described under [Salesforce change management consulting](/en/services/change-management-salesforce/).
