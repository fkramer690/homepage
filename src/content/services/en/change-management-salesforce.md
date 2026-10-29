---
title: "Change management for Salesforce programmes"
headline: "Salesforce is live, but hardly anyone uses it?"
description: "Change management for Salesforce programmes based on Prosci and ADKAR: introduce processes and releases so business teams and partners use them."
lang: en
slug: change-management-salesforce
translationKey: service-change
contactBrief: change
order: 7
note: "I developed this approach together with Juliane Winterscheid, my cooperation partner for change management. Juliane is Prosci certified."
notePartner: "Juliane Winterscheid"
lead: "A new Salesforce release is rolled out quickly. Whether business teams, developers and partners work differently afterwards is another question. I plan the introduction of new processes and standards on the client side following the Prosci approach, so they reach daily work and stay there."
situations:
  - "Salesforce is live, but parts of the business still work with Excel, email and their own lists."
  - "Training has taken place, yet usage stays low, and nobody can say exactly where it gets stuck."
  - "New standards for development and release have been agreed, but every partner and team reads them differently."
  - "Releases become smaller and more frequent, and business teams learn about changes only once they are in production."
  - "Management expects results from the programme but is rarely there when decisions about the rollout are due."
deliverables:
  - "A definition of how you measure success, for example usage figures in Salesforce instead of the number of training sessions"
  - "Rollout plan per release: which groups are affected, what changes for them and when they hear about it"
  - "An assessment per affected group based on the ADKAR model: at which of the five stages the rollout is stuck"
  - "Sponsor plan: what management does visibly and when, so new rules become binding"
  - "A format in which business teams, developers and partners see upcoming changes early and can have a say"
  - "Introduction of new standards in stages, starting with the most common cases"
  - "A feedback route from daily work back into the backlog, and handover to internal owners"
results:
  - "Processes and standards that are used in daily work, not only written down"
  - "Business teams that know before a release what changes for them"
  - "Management that visibly backs the rollout"
  - "Teams and partners that work by the same rules"
  - "Fewer shadow solutions next to Salesforce"
phases:
  - title: "Prepare the approach"
    text: "We define how success is measured, which groups are affected and what changes for each of them in daily work. That includes the risks and who in management sponsors the rollout."
  - title: "Manage the change"
    text: "Each group gets a plan along the ADKAR stages, tied to the release plan. The most common cases come first. We measure usage in Salesforce and adjust where it gets stuck."
  - title: "Sustain the outcomes"
    text: "We check where gaps remain, anchor new rules in the pipeline, reports and Center of Excellence calls, and hand ownership over to internal owners."
faq:
  - q: "Why do you follow Prosci?"
    a: "Because to me Prosci is the gold standard in change management. The approach rests on surveys since 1998 with more than 10,000 participants and is widely used in the industry. It gives structure to the part of a Salesforce programme that is often left to chance: whether people actually work differently."
  - q: "What is the ADKAR model?"
    a: "A Prosci model with five stages each person goes through in a change: Awareness, Desire, Knowledge, Ability and Reinforcement. When a rollout stalls, one of these stages is usually missing. The model shows which one."
  - q: "How long does it take to introduce new standards in a large programme?"
    a: "In my largest programme, with more than 30 developers and five implementation partners, about three months. The first version covered around 80 percent of the cases, and the edge cases were added over time."
  - q: "Who has to take part in change management?"
    a: "Business teams, developer teams, partners and management. Without backing from management, decisions and attention are missing, and new rules become a recommendation that not everyone follows."
  - q: "What changes with smaller, more frequent releases?"
    a: "Business teams get small changes more often instead of rare large packages. That lowers the risk of each release but needs a fixed route on which the people affected learn in advance what is coming."
blogTags: [Partner governance, Governance, DevOps training, Release management]
---

Change management in a Salesforce programme means introducing new processes, standards and releases so that the people who work with them actually use them. That applies to the business teams who do their daily work in Salesforce as much as to the developer teams and implementation partners who are meant to build by common rules. I take on this work on the client side, closely tied to architecture, partner governance and release management, and I follow the Prosci approach.

## Why do new processes not reach daily work?

A release is technically rolled out in minutes. What happens next decides whether anyone works differently. The reasons it does not happen are usually the same:

- **The people affected hear about it too late.** Anyone who first sees a change in production looks for a way around it.
- **Everything is meant to be settled at once.** A first version that tries to cover every edge case arrives late and is rarely read.
- **Backing from management is missing.** Without decisions from the top, new rules stay a recommendation.
- **There is no way back.** Problems from daily work end up in emails, not in the backlog.

## Why Prosci?

To me, Prosci is the gold standard in change management. The reason is the research behind it: Prosci has surveyed projects about their experience with change since 1998. In the 12th edition of its study [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf), with 2,668 participants, projects with excellent change management met their objectives seven times as often as projects with poor change management, 88 against 13 percent. Participants name active and visible sponsorship by management as the biggest contributor to success. That matches what I see in Salesforce programmes.

Together with Juliane Winterscheid, who is Prosci certified, I have applied two building blocks from Prosci to Salesforce programmes:

- **The [ADKAR model](https://www.prosci.com/blog/adkar-model)** describes five stages each person goes through in a change: Awareness of why something changes, Desire to take part, Knowledge of how it works, Ability to do it in daily work, and Reinforcement so nobody slips back.
- **The [Prosci 3-Phase Process](https://www.prosci.com/methodology/3-phase-process)** gives the rollout a frame at the level of the organisation: Prepare Approach, Manage Change and Sustain Outcomes. The three steps further up this page follow these phases.

## What does ADKAR look like in a Salesforce programme?

A common picture: the training has taken place, yet usage stays low. Instead of scheduling another session, we ask per affected group at which stage it is stuck. If a sales team does not know what the maintained opportunities are needed for, Awareness is missing, and the head of sales has to explain that, not the trainer. If a partner's developers know the naming conventions but nobody checks them in the pipeline, Reinforcement is missing. Then an automatic check belongs in the [release process](../devops-release-management/).

Salesforce helps with measuring. Whether a new process is used shows in reports on created and maintained records better than in any survey. We define these figures in the first phase and look at them regularly in the second.

## How did I introduce new standards in a large programme?

In my largest programme, more than 30 developers worked in eight streams with five implementation partners. Common standards for naming conventions, one automation per object, test coverage and an [object ownership matrix](../../blog/salesforce-object-ownership-matrix/) took about three months until people lived by them.

The first version covered around 80 percent of the cases. The edge cases were added step by step as they came up in the project. Later we raised new topics with lead time in regular [Center of Excellence calls](../../blog/salesforce-center-of-excellence-cadence/), before they turned into problems. At some point hardly any new edge cases came up. I describe the rules for several partners under [partner governance](../partner-governance/).

## What changes for business teams?

With a clean release process, releases become smaller and more frequent. For business teams this means small changes more often instead of one large package per quarter. For that to work, they need a fixed route on which they learn in advance what changes, and a route back on which they report what does not fit their daily work. Before each release I clarify with the owners in the business which teams are affected, what changes in their processes and who informs them. That goes into the release plan before development is finished. After the release I check whether the new processes are used and bring feedback from daily work into the backlog.

Prosci and ADKAR are registered trademarks of Prosci, Inc. The Prosci certification is held by Juliane Winterscheid, not by FK Solution Design, and FK Solution Design is not a Prosci partner. This page describes how we apply elements of the approach in Salesforce programmes.

If a rollout is coming up or new processes are not being used, [write to me](#contact) or read more [about me](../../#about).
