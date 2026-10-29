---
title: "Salesforce development standards for several partners"
description: "Which development standards and which definition of done to set for your Salesforce partners, and how to check that every team actually follows them."
pubDate: 2026-10-29
lang: en
slug: salesforce-development-standards-definition-of-done
translationKey: development-standards-definition-of-done
topic: code-review
categories: [architecture, devops]
contactBrief: partner-governance
tags: [development standards, definition of done, partner governance, code quality]
takeaways:
  - "Development standards define how things are built in a Salesforce org; the definition of done defines when a user story is finished. Both belong to the client."
  - "The first version does not have to be complete. In my largest programme it covered about 80 percent of cases, and the rest followed over the next weeks."
  - "Standards cover names, automation per object and context, and test coverage. What made the biggest difference for me was the object ownership matrix and rules for configuration."
  - "Whatever can be checked automatically is checked by the pipeline. The review checks the rest, otherwise standards stay a document nobody reads."
faq:
  - q: "What is a definition of done?"
    a: "A definition of done is a short list of conditions every user story must meet before it counts as finished, such as review approved, tests green, permissions in a permission set and documentation updated. It is the same for all teams."
  - q: "Who should write development standards, the client or the partner?"
    a: "Either can write them, but the client should own them. If one partner sets the rules, it also decides how its competitors build in the same org."
  - q: "How long does it take to establish standards across several partners?"
    a: "In my largest programme with five partners it took about three months until the standards were stable. After that only single edge cases were added."
  - q: "What test coverage does Salesforce require?"
    a: "Salesforce requires at least 75 percent Apex test coverage for a deployment to production. That is a floor; meaningful tests check results, not just executed lines."
draft: false
---

Salesforce development standards define how an org is built: names, automation, configuration, tests and security. The definition of done defines when a user story is finished. When several partners work on one org, both belong to the client and apply to every team in the same way. I recommend starting with a short first version that covers the most common cases and adding the rest later. The standards are enforced in the pipeline and in the pull request review. Without that check they stay a document in the wiki that nobody reads.

## Why do several partners need shared standards?

Every experienced partner has their own standards. The problem is that they differ. One partner builds automation in Apex triggers, the next in flows, the third in both. One team hard-codes thresholds, another puts them into custom metadata. Each solution is defensible on its own. Together on one org they create a system in which similar problems are solved very differently, depending on who built them.

The consequences show up late: two automations on the same object run in an unclear order, a value has to be changed in three places, and a new partner needs weeks to understand how the org is built. Shared standards also make partners comparable, because everyone works by the same rules. The wider framework is described on the [partner governance](../../services/partner-governance/) page.

```praxis
The largest programme I have steered had more than 30 developers in eight streams, delivered by five implementation partners and internal teams. For a while every pull request went across my desk, and we wrote the standards down from those reviews. It took about three months until they were stable. The first version covered about 80 percent of cases; we discussed and added the edge cases in the weeks after.
```

## What belongs in Salesforce development standards?

Most standards documents are too long. In my programme the standards covered the usual topics, such as naming conventions, one automation per object and context, and test coverage. Two elements made the biggest difference: ownership of objects and rules for configuration. This table sums up what I put into a first version today:

| Area | Rule | Why |
|---|---|---|
| Names | stream prefix, meaningful API names, a description on every field | Setup shows who owns something and what it is for |
| Automation | one automation per object and context | order and side effects stay predictable |
| Configuration | values in custom metadata types or custom labels instead of hard-coded | a value changes in one place, without a code deployment |
| Tests | Apex tests check results, not just lines | tests find defects instead of just meeting the quota |
| Security | data access in user context, permissions through permission sets | no user sees more through code than they are allowed to |
| Ownership | changes to other streams' objects only after agreement | teams do not overwrite each other |

The last row is covered by an [object ownership matrix](../salesforce-object-ownership-matrix/): it defines which stream owns which object. Before a team changes an object it does not own, it agrees with the owner. The rules for permissions from the [permission concept](../salesforce-permission-concept-permission-sets/) come on top.

"One automation per object and context" means in practice: for the work order object there is, for example, one flow that runs before save and one that runs after save, instead of five flows and two triggers all reacting to the same change. When a stream needs new logic, it extends the existing automation or plugs in a subflow.

## What goes into a definition of done?

The definition of done is shorter than the standards and is ticked off for every user story. I consider these points the minimum:

- The pull request is approved by a second person and the pipeline is green.
- Apex tests and the validation deployment against the target org run without errors.
- New permissions sit in a permission set of the stream, not in a profile.
- Post-deployment steps are automated or described in the ticket.
- The system test with the real roles is documented in the ticket.
- Fields, flows and classes have a description, and affected documentation is updated.

One definition of done for all teams matters more than a perfect one. With two partners and two definitions on one org, the looser one quietly wins. Before UAT it is the line between partner and business, see [Salesforce UAT: who tests before the release?](../salesforce-uat-business-acceptance-testing/).

## How do you check that partners follow the standards?

Standards nobody checks are ignored after two sprints. I split the check in two:

1. **Automatically in the pipeline.** Every pull request runs a validation deployment, Apex tests and static code analysis. Salesforce requires at least 75 percent test coverage for production; the pipeline can set a higher threshold for new code. Naming conventions and forbidden patterns, such as hard-coded IDs, can be checked with rules in Code Analyzer.
2. **In the review.** Whether a new automation extends the existing one or is built next to it, whether an object belongs to the stream and whether a design fits the architecture can only be seen by a person. How to do this without slowing down is in [why pull request reviews are a must](../why-pull-request-reviews-are-a-must-in-enterprise-projects/).

The same rules apply to AI-generated code. A rules file in the repository turns the standards into instructions for coding agents, see [an AI rules file in the Salesforce repository](../ai-rules-file-salesforce-repository/).

## What happens to the edge cases?

The first version never covers everything. In the weeks after, cases come up that nobody thought of: a stream needs a field on another stream's object, or two teams plan a change to the same flow at the same time. In my programme we discussed these cases in regular [Center of Excellence calls](../salesforce-center-of-excellence-cadence/), where upcoming changes came to the table with enough lead time for all streams. Every decision from these calls went into the standards. At some point the edge cases disappeared, because topics were discussed before they turned into conflicts.

## Where do you start?

Do not write standards at your desk. For two to three weeks, have every pull request reviewed and note what you keep commenting on. That becomes the first version, and it fits your org instead of a textbook. After that come the definition of done, the automatic checks and a fixed slot where new edge cases are discussed with all streams.

Good standards are short, belong to the client and are checked with every pull request. If you want to set up standards for your partners, [send me a message](#contact).
