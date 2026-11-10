---
title: "Reinforcement: making standards stick with partners"
description: "Why development standards erode at Salesforce partners after a few months and how pipeline, review and a Center of Excellence anchor them for good."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: partner-standards-reinforcement
translationKey: change-reinforcement-standards
topic: governance
categories: [architecture, devops, change-management]
coAuthor: juliane
contactBrief: partner-governance
tags: [reinforcement, change management, partner governance, development standards]
takeaways:
  - "At implementation partners, standards are at risk when developers rotate, deadline pressure rises and controls weaken."
  - "If developers know the naming conventions but neither the pipeline nor reviews catch deviations, reinforcement is too weak."
  - "What cannot be checked automatically is reinforced through pull request reviews and a regular Center of Excellence call with the technical leads."
  - "Standards only stick once an internal owner is responsible for them; otherwise, they end with the external person's contract."
faq:
  - q: "What does reinforcement mean in change management?"
    a: "In Prosci's ADKAR model, reinforcement is the fifth element: measures that make sure a change sticks and nobody falls back into old habits."
  - q: "Why do partners not stick to agreed standards?"
    a: "Usually, they do not do so on purpose. New developers do not know the standards, under deadline pressure exceptions are made, and if nobody checks, the exception becomes the rule."
  - q: "How long does it take until standards are lived across several partners?"
    a: "There is no fixed duration. In my largest program with five partners the first stabilization took about three months; immature pipelines, frequent staff changes or unclear decision rights make it longer. After that, only isolated edge cases were added and discussed in the Center of Excellence call."
  - q: "Do standards belong in the partner contract?"
    a: "Yes, with the applicable version, where the standards are kept, how changes are announced and approved, and which serious violations affect acceptance. Align the wording with your contract lawyer."
draft: false
---

Reinforcement is the fifth element of Prosci's ADKAR model: making sure a change sticks. This article applies it to development standards across several Salesforce implementation partners, where reinforcement is often the hardest part because standards erode after a few months when developers rotate and deadline pressure rises. Three mechanisms do most of the daily work: the pipeline for everything that can be checked automatically, the pull request review for the rest, and a regular Center of Excellence call where new edge cases are discussed. Onboarding, the contract and an internal owner help the standards last.

## Why do standards erode at partners?

The initial introduction of new standards usually goes well. Teams pay attention, the rules are new, and someone looks closely. After a few months three things change:

- **New developers arrive.** Partners rotate people, and whoever joins the team knows the standards only from a document, if at all.
- **Deadline pressure rises.** Before an important release an exception is made, "just this once". If nobody checks, the exception becomes the rule.
- **Attention fades.** Whoever checked every pull request at the start now has other tasks.

In the [ADKAR model](../change-management-salesforce-rollout/) what is missing then is not knowledge but reinforcement. For example, if a partner's developers know the naming conventions but neither the pipeline nor reviews catch deviations, reinforcement is too weak. Another general training session does not help people who already know the rule. Then an automatic check belongs in the release process.

```praxis
In my largest program with more than 30 developers in eight streams and five implementation partners, I reviewed every pull request at the start. That was a deliberate calibration phase. It took about three months before the standards were consistently applied; after that, review responsibility shifted to qualified reviewers in the streams, and I retained responsibility for pull requests with architectural impact. From then on we discussed new topics every two weeks in a Center of Excellence call with the technical leads of the streams. Once the process was stable, I handed it over to an internal colleague who has owned it since.
```

## Each lever anchors a different part of the standards

Together the levers leave little room for quiet erosion:

| Lever | What it anchors | Who |
|---|---|---|
| Automatic check in the pipeline | names, forbidden patterns, Apex tests with the agreed coverage; deployment validation at an agreed gate | static checks on every pull request |
| Pull request review | design, ownership of objects, fit with the architecture | reviewer on the client side |
| Center of Excellence call | new edge cases, upcoming changes with lead time | technical leads of the streams |
| Onboarding of new developers | knowledge of the current version | partner, checked by the client |
| Contract | standards as an acceptance criterion | procurement, program management |
| Handover to an internal owner | continuity after the project | client |

For recurring violations that can be detected objectively, the pipeline is the cheapest lever, because it never gets tired; custom rules still need to be built and maintained. Whatever it checks no longer needs a reviewer comment. Which rules belong in the standards and which of them can be automated is described in [Salesforce development standards for several partners](../salesforce-development-standards-definition-of-done/).

## The Center of Excellence call settles new edge cases

Standards are never finished. New cases come up, such as a stream that needs a field on another stream's object. Without a fixed forum, two developers decide these cases, and every partner decides differently. A regular call with the technical leads of all streams, a clear mandate and a decision log creates that forum. Each decision is classified: a change to the standards, an architecture decision or a one-off exception. Changes to the standards are assigned a version and an effective date.

The call has a second effect that is almost more important for reinforcement: the technical leads take the decisions back to their teams. A new developer then learns a rule from their own lead, not from a client document. Format and cadence are described in [Salesforce Center of Excellence: format and cadence](../salesforce-center-of-excellence-cadence/).

## How do you onboard a partner's new developers?

Every staffing change at a partner is a small restart. I recommend a short, fixed onboarding that the partner owns and the client checks: the current standards, the [object ownership matrix](../salesforce-object-ownership-matrix/), the path of a pull request through the pipeline and the most important entries in the decision log. A new developer's first pull request receives a more thorough review than usual, so misunderstandings are identified early. In my experience that extra effort is small compared with correcting the same misunderstanding over several releases. The more often a partner rotates people, the more this effort pays off, which is why onboarding belongs in the partner agreement as an obligation.

## Exceptions under deadline pressure need a reason and a ticket

There will be exceptions. What matters is that they are visible. An exception to the standards needs a reason in the pull request, a named approver and a ticket with an agreed correction or review date. That way the exception stays an exception. If exceptions accumulate for one rule, the rule belongs in the next Center of Excellence call: either it does not fit, or the schedule leaves too little time.

## What belongs in the contract?

A contract does not replace a review, but it makes clear what applies. I recommend stating in every partner contract which version of the standards applies, where the client keeps the standards, how changes are announced and how material changes are approved, since they can affect effort and dates. Consequences for acceptance should be tied to clearly defined serious violations, such as security, data integrity or a broken deployment, not to a missing description. This is not legal advice; align the wording with your contract lawyer. The same applies to AI-generated code; see [partners using AI coding: what belongs in the contract](../partners-using-ai-coding-contract-rules/).

```hinweis offen
Check whether your partner contracts refer to the standards, how changes to the standards are agreed upon and which violations affect acceptance. Without that, standards are hard to enforce.
```

## How do you know standards are anchored?

Three signs show it, and each can be counted. Repeated review findings per pull request go down, because the pipeline finds them first. New edge cases are brought to the Center of Excellence call before they are built, rather than surfacing later as conflicts. And a partner's new developers follow the rules without anyone explaining them one by one. Exceptions without a date and violations found after a release are two more metrics worth tracking. In my program late conflicts eventually became rare, because new edge cases were raised before they were built.

## Count the review comments that repeat

Look at the review comments of the last two months and count which remarks repeat. For every remark that can be checked automatically, add a pipeline check with a clear error message that names the standard. Typical candidates are hard-coded IDs, missing Flow descriptions and project-specific naming conventions. Some are covered by built-in rules of Salesforce Code Analyzer v5, others need a custom rule in the pipeline; either way, they are found before a reviewer starts the review. For the rest, set up a fixed call with the technical leads. And plan from the start who on the client side takes over the standards when the project ends. How I set this up with several partners is described on the [partner governance](../../services/partner-governance/) page.
