---
title: "Salesforce development standards for multiple partners"
description: "How to set Salesforce development standards and a shared definition of done for multiple implementation partners, and check that every team follows them."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-development-standards-definition-of-done
translationKey: development-standards-definition-of-done
topic: code-review
categories: [architecture, devops]
contactBrief: partner-governance
tags: [development standards, definition of done, partner governance, code quality]
takeaways:
  - "The definition of done defines when a user story is finished, and, like the development standards, it belongs to the client."
  - "The first version does not have to be complete; in my largest program it covered most recurring review topics, and edge cases followed."
  - "What made the biggest difference for me was the object ownership matrix and rules for configuration."
  - "Whatever can be checked automatically is checked by the pipeline, and the review checks the rest."
faq:
  - q: "What is a definition of done?"
    a: "A definition of done is a short list of conditions every user story must meet before it counts as finished, such as acceptance criteria met, review approved, tests green, permissions in permission sets and documentation updated. A shared core applies to all teams; integration, data migration or UI teams add their own checks."
  - q: "Who should write development standards, the client or the partner?"
    a: "Either can write them, but the client should own them. If one partner sets the rules, it also decides how its competitors build in the same org."
  - q: "How long does it take to establish standards across several partners?"
    a: "There is no universal timeline; it depends on existing standards, org size, automation density and decision paths. In my largest program with five partners, it took about three months for the standards to stabilize. After that, only individual edge cases were added."
  - q: "What test coverage does Salesforce require?"
    a: "With the usual test level RunLocalTests, Salesforce requires at least 75 percent overall Apex code coverage for a production deployment, and every trigger needs some coverage. With RunSpecifiedTests, each deployed class and trigger must reach 75 percent on its own. That is a floor; meaningful tests check results, not just executed lines."
draft: false
---

Salesforce development standards define how an org is built: names, automation, configuration, tests and security. The definition of done defines when a user story is finished. When several partners work on one org, both belong to the client, with a shared core that applies to every team. I recommend starting with a short first version that covers the most common cases and adding the rest later. The standards are enforced in the pipeline and in the pull request review. Without that check, they remain just a document in the wiki that nobody reads.

## Why do several partners need shared standards?

Every experienced partner has their own standards. The problem is that they differ. One partner builds automation in Apex triggers, the next in flows, the third in both. One team hard-codes thresholds, another puts them into custom metadata. Each solution is defensible on its own. In a single org, however, they create a system in which similar problems are solved very differently, depending on who built them.

The consequences show up late: Apex triggers and flows on the same object react to the same change without a defined execution order, a value has to be changed in three places, and a new partner needs weeks to understand how the org is built. Shared standards also make partners comparable, because everyone works by the same rules. The wider framework is described on the [partner governance](../../services/partner-governance/) page.

```praxis
The largest program I have led had more than 30 developers in eight streams, delivered by five implementation partners and internal teams. For a calibration phase I reviewed every pull request myself, and we wrote the standards down from those reviews. After that, reviewers from the streams took over and only risky changes were still escalated to me. It took about three months for the standards to stabilize. The first version covered most recurring review topics; we discussed and added the edge cases in the weeks after.
```

## What belongs in Salesforce development standards?

Most standards documents are too long. In my program the standards covered the usual topics, such as naming conventions, one entry point for automation per object, and test coverage. Two elements made the biggest difference: ownership of objects and rules for configuration. This table sums up what I would put into a first version today:

| Area | Rule | Why |
|---|---|---|
| Names | stream prefix, meaningful API names, a meaningful description on every custom field the program adds or changes | Setup shows who owns something and what it is for |
| Automation | one entry point per object (flow or Apex), flows split by responsibility with a defined order | order and side effects stay predictable |
| Configuration | thresholds and parameters in custom metadata types, translatable texts in custom labels, credentials in named credentials | a value changes in one place without changing Apex, and still goes through the pipeline |
| Tests | Apex tests check results, not just lines | tests find defects instead of just meeting the quota |
| Security | execution context chosen explicitly (user mode as default, system mode only as a justified exception), permissions through permission sets | no user sees more through code than they are allowed to |
| Ownership | changes to other streams' objects only after agreement | teams do not overwrite each other |

The last row is covered by an [object ownership matrix](../salesforce-object-ownership-matrix/): it defines which stream owns which object. Before a team changes an object it does not own, it agrees with the owner. The rules for permissions from the [permission concept](../salesforce-permission-concept-permission-sets/) are added.

"One entry point per object" means in practice: on the work order object, which the service stream, the ERP integration and the spare parts process all touch, either flows or an Apex trigger react to changes, not both. Salesforce's [architecture guide for record-triggered automation](https://architect.salesforce.com/docs/architect/decision-guides/guide/record-triggered) advises against mixing them and calls a single mega-flow per object an anti-pattern. So the work order receives a few flows, each with a clear responsibility and an order value in Flow Trigger Explorer, instead of five unordered flows and two triggers. When a stream needs new logic, it adds it in the agreed place.

## What goes into a definition of done?

The definition of done is shorter than the standards and is checked for every user story. I consider these points the minimum:

- The acceptance criteria are met and shown in the ticket.
- The pull request is approved by a second person and the pipeline is green.
- The deployment validates against the intended target environment with the agreed test level, including negative and bulk tests where relevant.
- New functional access is granted through the permission set or permission set group for the relevant business capability, not in a profile.
- Post-deployment steps are automated or described in the ticket.
- The system test has passed with the relevant users, permission set groups and sharing, and the result is in the ticket.
- Fields and flows have a meaningful description, Apex classes have a header comment, and affected documentation is updated.
- Open defects and accepted risks are listed.

One shared core for all teams matters more than a perfect one. With two partners and two definitions on one org, the looser one quietly wins. Teams add checks for their type of work, such as reconciliation for data migration or error case tests for integrations. The definition of done marks technical completion and readiness for UAT; business acceptance follows in UAT, see [Salesforce UAT: who tests before the release?](../salesforce-uat-business-acceptance-testing/).

## The pipeline checks what it can, the review checks the rest

Standards nobody checks are ignored after two sprints. I split the checks into two parts:

1. **Automatically in the pipeline.** Every pull request runs a validation deployment, Apex tests and static code analysis. Salesforce requires at least 75 percent Apex code coverage for production; the pipeline can set a higher threshold for new code. Salesforce Code Analyzer v5 detects the forbidden patterns it supports, such as hard-coded IDs; program-specific naming conventions may need custom rules. Ownership can be automated too: a CODEOWNERS file or path rules assign the owning stream as a required reviewer.
2. **In the review.** Whether a new automation is implemented in the agreed place and whether a design fits the architecture needs a person. How to do this without slowing down is in [why pull request reviews are a must](../why-pull-request-reviews-are-a-must-in-enterprise-projects/).

The same rules apply to AI-generated code. A rules file in the repository turns the standards into instructions for coding agents, see [an AI rules file in the Salesforce repository](../ai-rules-file-salesforce-repository/).

## Edge cases belong in the Center of Excellence call

The first version never covers everything. In the following weeks, cases arise that nobody had thought of: a stream needs a field on another stream's object, or two teams plan a change to the same flow at the same time. In my program we discussed these cases in regular [Center of Excellence calls](../salesforce-center-of-excellence-cadence/), where upcoming changes were presented with enough lead time for all streams. Every binding decision from these calls was added to the standards and the [architecture decision log](../salesforce-architecture-decision-log/), with date, decider and reason. Deviations follow the same route: a documented exception with reason, owner and review date, so rules are neither broken quietly nor applied where they would be harmful. At some point the edge cases disappeared, because topics were discussed before they turned into conflicts. Why partner standards lose effect after a few months without such a slot is described in [Reinforcement: making standards stick with partners](../partner-standards-reinforcement/).

## Collect review comments for two to three weeks

Do not write standards at your desk. For two to three weeks, have every pull request reviewed and note what you keep commenting on. That becomes the first version, and it fits your org instead of a textbook. Then follow the definition of done, the automatic checks and a fixed slot where new edge cases are discussed with all streams. A few metrics show whether it works: the share of pull requests that pass all gates on the first run, recurring review findings, the number and age of exceptions, and defects after UAT.
