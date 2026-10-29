---
title: "Reinforcement: making standards stick with partners"
description: "Why development standards erode at Salesforce partners after a few months and how pipeline, review and a Center of Excellence anchor them for good."
pubDate: 2026-10-29
lang: en
slug: partner-standards-reinforcement
translationKey: change-reinforcement-standards
topic: governance
categories: [architecture, devops, change-management]
contactBrief: partner-governance
tags: [reinforcement, change management, partner governance, development standards]
takeaways:
  - "Reinforcement is the last ADKAR stage: making sure nobody falls back. At partners, standards erode when new developers join and deadline pressure rises."
  - "If a partner's developers know the naming conventions but nobody checks them in the pipeline, reinforcement is missing. Then an automatic check belongs in the release process."
  - "What cannot be checked automatically is anchored by pull request reviews and a regular Center of Excellence call with the technical leads."
  - "Standards are only anchored once an internal owner runs them. As long as everything depends on one external person, the anchoring ends with their contract."
faq:
  - q: "What does reinforcement mean in change management?"
    a: "In Prosci's ADKAR model, reinforcement is the fifth stage: measures that make sure a change stays and nobody falls back into old habits."
  - q: "Why do partners not stick to agreed standards?"
    a: "Usually not on purpose. New developers do not know the standards, under deadline pressure exceptions are made, and if nobody checks, the exception becomes the rule."
  - q: "How long does it take until standards are lived across several partners?"
    a: "In my largest programme with five partners about three months. After that only single edge cases were added, discussed in the Center of Excellence call."
  - q: "Do standards belong in the partner contract?"
    a: "Yes, as a reference to the current version held by the client. That makes clear that a delivery that breaks the standards is not accepted."
draft: false
---

Reinforcement is the last stage in the ADKAR model: making sure a change stays. With Salesforce partners it is the hardest stage, because standards erode after a few months when new developers join and deadline pressure rises. They are anchored in three places: in the pipeline for everything that can be checked automatically, in the pull request review for the rest, and in a regular Center of Excellence call where new edge cases are discussed. They only hold for good once an internal owner runs them.

## Why do standards erode at partners?

The first introduction of new standards usually goes well. Teams pay attention, the rules are new, and someone looks closely. After a few months three things change:

- **New developers arrive.** Partners rotate people, and whoever joins the team knows the standards only from a document, if at all.
- **Deadline pressure rises.** Before an important release an exception is made, "just this once". If nobody checks, the exception becomes the rule.
- **Attention fades.** Whoever checked every pull request at the start now has other tasks.

In the [ADKAR model](../change-management-salesforce-rollout/) what is missing then is not knowledge but reinforcement. An example: if a partner's developers know the naming conventions but nobody checks them in the pipeline, reinforcement is missing. Another training session changes nothing. Then an automatic check belongs in the release process.

```praxis
In my largest programme with more than 30 developers in eight streams and five implementation partners, every pull request went across my desk at the start. It took about three months until the standards were lived. After that we brought new topics to the table every two weeks in a Center of Excellence call with the technical leads of the streams. Once the process ran smoothly, I handed it over to an internal colleague who has owned it since.
```

## Which levers anchor standards?

Each lever covers a different part of the standards. Together they leave little room for quiet erosion:

| Lever | What it anchors | Who |
|---|---|---|
| Automatic check in the pipeline | names, forbidden patterns, test coverage, validation against the target org | runs on every pull request |
| Pull request review | design, ownership of objects, fit with the architecture | reviewer on the client side |
| Center of Excellence call | new edge cases, upcoming changes with lead time | technical leads of the streams |
| Onboarding of new developers | knowledge of the current version | partner, checked by the client |
| Contract | standards as an acceptance criterion | procurement, programme management |
| Handover to an internal owner | continuity after the project | client |

The pipeline is the cheapest lever, because it never gets tired. Whatever it checks, no reviewer has to comment on any more. Which rules belong in the standards and which of them can be automated is described in [Salesforce development standards for several partners](../salesforce-development-standards-definition-of-done/).

## How does the Center of Excellence call help?

Standards are never finished. New cases come up, such as a stream that needs a field on another stream's object. Without a fixed place these cases are decided between two developers, and every partner decides differently. A regular call with the technical leads of all streams gives them a place. Every decision there is added to the standards.

The call has a second effect that is almost more important for reinforcement: the technical leads carry the decisions into their teams. A new developer then learns a rule from their own lead, not from a client document. Format and cadence are described in [Salesforce Center of Excellence: format and cadence](../salesforce-center-of-excellence-cadence/).

## How do you onboard a partner's new developers?

Every change of people at a partner is a small restart. I recommend a short, fixed onboarding that the partner owns and the client checks: the current standards, the [object ownership matrix](../salesforce-object-ownership-matrix/), the path of a pull request through the pipeline and the most important entries in the decision log. A new developer's first pull request gets a more thorough review than usual, so misunderstandings show up early. That costs half a day and saves weeks of corrections. The more often a partner rotates people, the more it pays off, which is why onboarding belongs in the agreement with the partner as a duty.

## What about exceptions under deadline pressure?

There will be exceptions. What matters is that they are visible. An exception to the standards needs a reason in the pull request and a ticket that plans the correction in the next release. That way the exception stays an exception. If exceptions pile up for one rule, the rule belongs in the next Center of Excellence call: either it does not fit, or the plan leaves too little time.

## What belongs in the contract?

A contract does not replace a review, but it makes clear what applies. I recommend referring in every partner contract to the current version of the standards held by the client, not to a copy in an annex. Then every change from the Center of Excellence call applies without new negotiation. And a delivery that breaks the standards is not accepted. The same applies to AI-generated code, see [partners using AI coding: what belongs in the contract](../partners-using-ai-coding-contract-rules/).

```hinweis offen
Check whether your partner contracts refer to the standards and whether a violation prevents acceptance. If not, the standards legally count as a recommendation.
```

## How do you know standards are anchored?

Three signs show it. Reviewers comment on the same points less often, because the pipeline finds them first. New edge cases come to the Center of Excellence call before they are built, instead of afterwards as a conflict. And a partner's new developers follow the rules without anyone explaining them one by one. In my programme the edge cases eventually disappeared, because topics were discussed before they turned into conflicts.

## Where do you start?

Look at the review comments of the last two months and count which remarks repeat. Every remark that can be checked automatically goes into the pipeline, with a clear error message that names the standard. For the rest, set up a fixed call with the technical leads. And plan from the start who on the client side takes over the standards when the project ends.

Standards are anchored when they hold even without the person who introduced them. If you want to bring several partners onto one line, [send me a message](#contact) or read more about [partner governance](../../services/partner-governance/).
