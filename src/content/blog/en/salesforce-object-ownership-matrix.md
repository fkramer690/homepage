---
title: "Salesforce Object Ownership Matrix: Who Owns What?"
description: "Several partners on one Salesforce org? An object ownership matrix sets who owns which object. Structure, rules and lessons from a program with 8 streams."
pubDate: 2026-10-26
updatedDate: 2026-11-09
lang: en
slug: salesforce-object-ownership-matrix
translationKey: object-ownership-matrix
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [partner governance, object ownership matrix, governance, pull request review, automation]
takeaways:
  - "When a team changes another stream's object, it agrees the change with the owner first, so fields, flows and triggers do not overwrite each other."
  - "Shared objects like Account need one owner and one automation entry point: Flow or one Apex trigger, not both side by side."
  - "In my program with more than 30 developers in eight streams, the matrix and standards were stable after about three months."
  - "The matrix is enforced in pull request reviews and regular center of excellence calls, not by a page in the wiki."
faq:
  - q: "What is an object ownership matrix in Salesforce?"
    a: "A simple table that sets which stream or team owns each Salesforce object and its metadata. Other teams agree on changes with the owner before they touch the object."
  - q: "Who should own the object ownership matrix?"
    a: "The client should own it, for example through an architect or a center of excellence. If a partner defines the matrix, it also decides what its competitors are allowed to build."
  - q: "What happens to objects every team needs?"
    a: "I assign exactly one owner to Account or Contact as well. The other teams submit their requirements, and the owner incorporates them into the agreed automation for the object, after consulting the streams affected by the change."
  - q: "How long does it take to introduce an object ownership matrix?"
    a: "The first version takes a few weeks. In my largest program it took about three months until the matrix and standards were stable and new edge cases became rare."
draft: false
---

A Salesforce object ownership matrix defines which stream owns which object and its metadata in an org. If another team wants to change the object, it agrees on the change with the owner first. That sounds trivial, which is exactly why the matrix is missing in many programs with several implementation partners. In my largest program, with more than 30 developers in eight streams and five partners, it was one of the two things that made the biggest difference.

## What is an object ownership matrix?

An object ownership matrix is a table with one row per object in scope, typically for objects that several teams touch. For each object it states which stream owns it. A stream is a team with a business focus, such as sales, service or field service, staffed either by a partner or by an internal team.

Ownership means more than "created the object". The owning stream decides on:

- **Fields and validation rules** of the object.
- **Automation**, meaning record-triggered flows and Apex triggers that run when a record is saved.
- **Page layouts and Lightning pages** for the object.
- **Data model changes**, such as new relationships to other objects.

Other streams may read the object, use it and include it in their processes. If they want to change it, they go to the owner. In turn, the owner consults the streams that use the object before making changes that affect them, such as new required fields, validation rules or interface fields. If a change touches a second object, its owner has to agree as well.

## Why does a program with several partners need one?

In a small org, one admin knows every change. In a program with several partners, teams work on the same objects at the same time, often without knowing about each other. Account is the classic example: sales needs it for opportunities, service for cases, field service for jobs and the ERP team for the interface.

Without clear ownership, every team builds its own automation on Account. That gets risky quickly. According to the [Salesforce Architect decision guide on record-triggered automation](https://architect.salesforce.com/docs/architect/decision-guides/guide/record-triggered), the platform does not guarantee the execution order of several Apex triggers on the same object and event. The guide recommends one trigger per object and advises against mixing Flow and Apex as entry points on the same object. Several record-triggered flows are fine if their order is set in the Flow Trigger Explorer.

Five teams with five approaches on one object do not follow any of these recommendations. The results are familiar to anyone who has worked in such programs: two automations set the same field, one deployment overwrites another team's layout, and a production bug cannot be traced to any team.

## How it went in my program with eight streams

When I joined the program, nobody had clearly defined which team was responsible for which processes, objects and metadata. Changes overwrote each other, and the teams' technical approaches were far apart.

The first step was to route every change through a pull request with a review. For a while, every single one went across my desk. From those reviews we wrote down standards, including naming conventions, one automation entry point per object with a defined execution order, and test coverage. Two things made the biggest difference: the object ownership matrix, and rules for configuration, such as which values belong in custom metadata types or custom labels instead of being hard-coded.

```tabelle matrix
title: Object ownership matrix, simplified example
columns: Object | Sales stream | Service stream | Field service stream
Account | Owner * | coordinates | coordinates
Opportunity | Owner * | coordinates | coordinates
Quote | Owner * | coordinates | coordinates
Case | coordinates | Owner * | coordinates
Asset | coordinates | Owner * | coordinates
Work Order | coordinates | coordinates | Owner *
note: Before a team changes another team's object, it coordinates with the owner.
```
The rule was simple: before a team changed another stream's object, it had to agree on the change with the owner. In the simplified example above, sales owns Account, Opportunity and Quote, service owns Case and Asset, and field service owns Work Order.

```praxis
It took about three months until the standards were stable. The first version covered around 80 percent of cases. Edge cases came up afterwards, and we discussed them in regular center of excellence calls. Eventually they almost disappeared, because upcoming changes were raised before they turned into conflicts.
```

## What belongs in the matrix?

The matrix should stay small enough that anyone can read it in two minutes. I recommend these columns:

1. **Object**, with its API name so nothing is confused.
2. **Owning stream** and a named person as contact.
3. **Automation entry point**, meaning whether the object is automated through Flow or an Apex trigger framework.
4. **Streams that use it**, so the owner knows who a change affects.

The hard part is shared objects like Account, Contact or Product. I assign exactly one owner to them as well. The other streams submit their requirements to that owner, who incorporates them into the agreed automation, for example several ordered flows or one trigger with a handler framework. That is slower than each team building its own solution. In my experience it is what keeps the object maintainable two years from now. For a B2B store, the order needs the same clarity across Salesforce and the ERP. See [chapter 4 of the B2B Commerce masterclass](/en/masterclass/b2b-commerce/erp-integration-stock-orders/).

What does not belong in the matrix: detailed rules for naming, tests or code style. Those live in the development standards. The matrix answers one main question: who decides.

## The matrix is enforced in review, not in the wiki

A table in the wiki changes nothing on its own. The matrix only works once it is checked as part of the daily workflow.

- **In the pull request review.** If a change touches another stream's object, the reviewer asks whether the owner agreed. How such reviews work is described in [why pull request reviews are a must in enterprise projects](/en/blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/).
- **Technically in the repository.** Once the metadata lives in Git and changes to these objects only reach the org through the pipeline, parts of the matrix can be enforced technically, on GitHub for example with a CODEOWNERS file. Direct changes in the org bypass it, so emergency fixes need their own path back into the repository.
- **In the center of excellence.** These are regular calls where streams present upcoming changes to shared objects, with enough lead time for everyone else. How to set one up is described in [Salesforce Center of Excellence: format and cadence](/en/blog/salesforce-center-of-excellence-cadence/).

```vertiefung For developers
title: How does CODEOWNERS map the matrix?
A [CODEOWNERS file](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) assigns paths to a team, for example an object's folder. Layouts, Lightning pages, flows and triggers sit in other folders, so they need their own patterns and a naming convention. If a pull request changes those files, the team is automatically requested as a reviewer. Its approval becomes mandatory only with "Require review from Code Owners" in branch protection. The team also needs write access, and the CODEOWNERS file itself needs an owner.
```

The matrix belongs to the client, not to a partner. If a partner decides who owns which object, it also decides what its competitors may build. The same applies to the repository and the pipeline, as described in [why clients should own their DevOps tools](/en/blog/why-clients-should-own-their-devops-tools/).

## List the 15 to 20 most important objects

A first matrix is ready sooner than most people expect:

1. **List the 15 to 20 most important objects**, both standard and custom, that more than one team touches.
2. **Assign one stream to each object**, even when the decision about Account or Contact is uncomfortable.
3. **Record the automation entry point per object** and allow new automation only through it.
4. **Ask about it in every review**, from day one.
5. **Settle edge cases in the center of excellence** and update the matrix.

In my experience the first version is never complete, and it does not need to be. You start with 80 percent, and the reviews deliver the rest. You can find more on how I steer programs with several partners on the [partner governance](/en/services/partner-governance/) page.
