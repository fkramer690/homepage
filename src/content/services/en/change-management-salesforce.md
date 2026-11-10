---
title: "Salesforce change management consulting"
headline: "Change management when hardly anyone uses Salesforce"
description: "Salesforce change management consulting based on Prosci and ADKAR: introduce processes and releases so that business teams and partners use them."
lang: en
slug: change-management-salesforce
translationKey: service-change
contactBrief: change
section: change-management
order: 4
note: "I developed this approach together with Juliane Winterscheid, my cooperation partner for change management. Juliane is Prosci certified."
notePartner: "Juliane Winterscheid"
lead: "A new Salesforce release is rolled out quickly. Whether business teams, developers and partners work differently afterwards is another question. Together with Juliane Winterscheid I plan the introduction of new processes and standards following Prosci and ADKAR, so they are used in daily work for good."
situations:
  - "Salesforce is live, but parts of the business still work with Excel, email and their own lists."
  - "Training has taken place, yet usage stays low, and nobody can say exactly why."
  - "New standards for development and release have been agreed, but every partner and team reads them differently."
  - "Releases become smaller and more frequent, and business teams learn about changes only once they are in production."
  - "Management expects results from the program but is rarely present when decisions about the rollout are due."
deliverables:
  - "For each affected group we use the ADKAR model to assess at which of the five stages the rollout is stuck."
  - "We introduce new standards in stages and start with the most common cases."
  - "We set up a fixed format in which business teams, developers and partners see upcoming changes early and can have a say."
  - "We measure usage in Salesforce and adjust where it falls behind."
results:
  - "Agreed success measures from Salesforce reports, for example on records created and maintained"
  - "A rollout plan per release that shows which groups are affected, what changes for them and when they hear about it"
  - "A sponsor plan that sets out what management does visibly and when, so that new rules become binding"
  - "A fixed route by which feedback from daily work reaches the backlog"
  - "Internal owners who carry the rollout on after the handover"
phases:
  - title: "Prepare the approach"
    icon: "compass"
    text: "We define how success is measured, which groups are affected and what changes for each of them in daily work. That includes the risks and who in management sponsors the rollout."
  - title: "Manage the change"
    icon: "steer"
    text: "Each group gets a plan along the ADKAR stages, tied to the release plan. We settle the most common cases first. We measure usage in Salesforce and adjust where it falls behind."
  - title: "Sustain the outcomes"
    icon: "check"
    text: "We check where gaps remain, anchor new rules in the pipeline, reports and Center of Excellence calls, and hand ownership over to internal owners."
duration: "Preparation 2 to 4 weeks. Support through to the rollout usually takes 3 to 9 months, securing the results 1 to 2 months after go-live."
notFit:
  - "The task is only training on new features."
  - "Management is not willing to stand up visibly for the change itself."
alternatives: "An internal change team or the HR department fits if it has experience with IT rollouts. Large consultancies bring a method, but rarely Salesforce knowledge."
progress:
  - measure: "Use of the new processes"
    how: "Whether business teams use the new processes in Salesforce, visible in the records created there."
  - measure: "Workarounds"
    how: "How much work is still done in Excel, email or legacy systems."
  - measure: "Questions after a release"
    how: "Which questions key users and support get after a release and whether their number goes down."
faq:
  - q: "Why do you follow Prosci?"
    a: "Because to me Prosci is the gold standard in change management. The approach rests on surveys conducted since 1998 with more than 10,000 participants and is widely used in the industry. It gives structure to the part of a Salesforce program that is often left to chance: whether people work differently afterwards."
  - q: "What is the ADKAR model?"
    a: "ADKAR is a Prosci model with five stages each person goes through in a change: Awareness, Desire, Knowledge, Ability and Reinforcement. When a rollout stalls, one of these stages is usually missing. The model shows which one."
  - q: "How long does it take to introduce new standards in a large program?"
    a: "In my largest program, with more than 30 developers and five implementation partners, it took about three months. The first version covered around 80 percent of the cases, and the edge cases were added over time."
  - q: "Who has to take part in change management?"
    a: "Everyone who is affected by the change or who drives it: business teams, developer teams, partners and management. Without backing from management, decisions and attention are missing, and new rules become a recommendation that not everyone follows."
  - q: "What changes with smaller, more frequent releases?"
    a: "Business teams get small changes more often instead of rare large packages. That lowers the risk of each release but needs a fixed route through which the people affected learn in advance what is changing."
  - q: "Do you replace our implementation partner?"
    a: "No. Your partners keep building. We work on the client side, alongside them, and I steer them according to shared rules. If you want to replace a partner, I help you do it without losing knowledge and without delaying the program."
blogTags: [change management, Partner governance, Governance, DevOps training, Release management]
---

Change management in a Salesforce program means introducing new processes, standards and releases so that the people who work with them actually use them. That applies to the business teams who do their daily work in Salesforce as much as to the developer teams and implementation partners who are meant to build by shared rules. Juliane Winterscheid and I take on this work on the client side: Juliane guides the people through the change, and I make sure architecture, partner governance and releases fit with it. Wherever this page says "we", it means the two of us. Our approach follows Prosci, and further down you can read why.

## Why do new processes not reach daily work?

Deploying a release is the technical part. What happens next decides whether anyone works differently. The reasons it does not happen are usually the same, and each one has an answer:

```pro-contra
pro: What we do about it
- A rollout plan per release defines who hears about it and when.
- The first version covers the most common cases, edge cases come later.
- Management backs new rules itself, not only the project team.
- The old way is closed as soon as the new one works.
contra: Where it fails
- **The people affected hear about it too late** and look for a way around it.
- **Everything is meant to be settled at once**, so the first version arrives late and is rarely read.
- **Backing from management is missing**, so new rules stay a recommendation.
- **The old way stays open**, Excel lists and emails keep working.
```

## What does ADKAR look like in a Salesforce program?

The [ADKAR model](https://www.prosci.com/blog/adkar-model) by Prosci describes five stages each person goes through in a change. When a rollout stalls, one of them is usually missing. We often see the following: the training has taken place, yet usage stays low. Instead of scheduling another session, we ask per affected group at which stage it is stuck:

```stufen
A | Awareness | Why it changes | Why is something changing? *
D | Desire | Taking part | Do I want to take part?
K | Knowledge | Know-how | How does it work?
A | Ability | Doing it | Can I do it in daily work?
R | Reinforcement | Making it stick | Does it last, or do I slip back? *
case: Awareness is missing | A sales team does not know what the maintained opportunities are needed for. | The head of sales has to explain that, not the trainer.
case: Reinforcement is missing | A partner's developers know the naming conventions, but nobody checks them in the pipeline. | Then an automatic check belongs in the [release process](../devops-release-management/).
```

Salesforce helps with measuring. Reports on created and maintained records show more reliably than a survey whether a new process is used. We define these figures in the first phase and look at them regularly in the second. I describe the individual topics, from key users to measuring adoption, in [Salesforce change management: why rollouts fail](../../blog/change-management-salesforce-rollout/). The [change management masterclass](../../masterclass/change-management/) goes through the five stages chapter by chapter.

## Shared standards for five partners in three months

```kennzahlen
30+ | developers in eight streams
5 | implementation partners
3 | months until all teams worked by the standards
80 % | of cases covered by the first version
source: my largest program as architect on the client side
```

At the start of this program, the technical approaches of the teams had drifted far apart. So we introduced shared standards for naming conventions, one automation entry point per object, test coverage and an [object ownership matrix](../../blog/salesforce-object-ownership-matrix/) in stages.

The first version covered around 80 percent of the cases. We added the edge cases step by step as they came up in the project. Later we discussed new topics with lead time in regular [Center of Excellence calls](../../blog/salesforce-center-of-excellence-cadence/), before they turned into problems. Over time, hardly any new edge cases came up. I describe the rules for several partners under [partner governance](../partner-governance/).

## Smaller releases need a fixed route into the business

With a clean release process, releases become smaller and more frequent. For business teams this means small changes more often instead of one large package per quarter. For that to work, they need a fixed route through which they learn in advance what changes, and a route back through which they report what does not fit their daily work. Before each release I clarify with the owners in the business which teams are affected, what changes in their processes and who informs them. That goes into the release plan before development is finished. After the release I check whether the new processes are used and add feedback from daily work to the backlog.

## Prosci is built on research since 1998

To me, Prosci is the gold standard in change management. The reason is the research behind it: Prosci has surveyed project leaders about their experience with change since 1998.

```kennzahlen
88 % | of projects with excellent change management met their objectives
13 % | with poor change management
7× | as often successful
source: Prosci, Best Practices in Change Management, 12th edition, 2,668 participants
```

In the 12th edition of its study [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf), Prosci reports from its benchmark data that projects with excellent change management met their objectives seven times as often as projects with poor change management, 88 against 13 percent. Participants name active and visible sponsorship by management as the biggest contributor to success. That matches what I see in Salesforce programs.

Together with [Juliane Winterscheid](../../partners/juliane-winterscheid/), who is Prosci certified, I have applied two building blocks from Prosci to Salesforce programs: the ADKAR model described above and the [Prosci 3-Phase Process](https://www.prosci.com/methodology/3-phase-process). The 3-Phase Process gives the rollout a frame at the level of the organization: Prepare Approach, Manage Change and Sustain Outcomes. The steps under “How we work together” follow these phases.

Prosci and ADKAR are registered trademarks of Prosci, Inc. The Prosci certification is held by Juliane Winterscheid, not by FK Solution Design, and FK Solution Design is not a Prosci partner. This page describes how we apply elements of the approach in Salesforce programs.
