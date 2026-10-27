---
title: "Salesforce Object Ownership Matrix: Who Owns What?"
description: "Several partners on one Salesforce org? An object ownership matrix sets who owns which object. Structure, rules and lessons from a programme with 8 streams."
pubDate: 2026-10-26
lang: en
slug: salesforce-object-ownership-matrix
translationKey: object-ownership-matrix
topic: governance
categories: [architecture]
contactBrief: partner-governance
tags: [partner governance, object ownership matrix, governance, pull request review, automation]
takeaways:
  - "An object ownership matrix is a table that assigns every Salesforce object and its metadata to exactly one owning stream."
  - "When a team wants to change another stream's object, it agrees the change with the owner first. That stops teams from overwriting each other's fields, flows and triggers."
  - "Shared objects like Account need one owner and a rule for how automation is bundled there, because Salesforce does not guarantee the order of several triggers."
  - "In a programme with more than 30 developers in eight streams it took about three months until the matrix and standards were stable. The first version covered around 80 percent of cases."
  - "The matrix is enforced in pull request reviews and regular centre of excellence calls, not by a page in the wiki."
faq:
  - q: "What is an object ownership matrix in Salesforce?"
    a: "A simple table that sets which stream or team owns each Salesforce object and its metadata. Other teams agree changes with the owner before they touch the object."
  - q: "Who should own the object ownership matrix?"
    a: "The client, for example through an architect or a centre of excellence. If a partner defines the matrix, it also decides what its competitors are allowed to build."
  - q: "What happens to objects every team needs?"
    a: "Account or Contact also get exactly one owner. The other teams submit their requirements, and the owner builds them into the object's shared automation."
  - q: "How long does it take to introduce an object ownership matrix?"
    a: "The first version takes a few weeks. In my largest programme it took about three months until the matrix and standards were stable and new edge cases became rare."
draft: false
---

A Salesforce object ownership matrix defines which stream owns which object and its metadata in an org. If another team wants to change the object, it agrees the change with the owner first. That sounds trivial, which is exactly why the matrix is missing in many programmes with several implementation partners. In my largest programme, with more than 30 developers in eight streams and five partners, it was one of the two elements that made the biggest difference.

## What is an object ownership matrix?

An object ownership matrix is a table with one row per object. For each object it states which stream owns it. A stream is a team with a business focus, such as sales, service or field service, whether a partner or an internal team staffs it.

Ownership means more than "created the object". The owning stream decides on:

- **Fields and validation rules** of the object.
- **Automation**, meaning record-triggered flows and Apex triggers that run when a record is saved.
- **Page layouts and Lightning pages** for the object.
- **Data model changes**, such as new relationships to other objects.

Other streams may use the object, read it and work with it in their processes. If they want to change it, they go to the owner.

## Why does a programme with several partners need one?

In a small org, one admin knows every change. In a programme with several partners, teams work on the same objects at the same time, often without knowing about each other. Account is the classic example: sales needs it for opportunities, service for cases, field service for jobs and the ERP team for the interface.

Without clear ownership, every team builds its own automation on Account. That gets risky quickly. According to the [Salesforce Architect decision guide on record-triggered automation](https://architect.salesforce.com/docs/architect/decision-guides/guide/record-triggered), the platform does not guarantee the execution order of several Apex triggers on the same object and event. The guide recommends one trigger per object and advises against mixing Flow and Apex as entry points on the same object.

Five teams with five approaches on one object follow none of these recommendations. The results are familiar to anyone who has worked in such programmes: two automations set the same field, one deployment overwrites another team's layout, and a production bug cannot be traced to any team.

## What did this look like in my programme?

When I joined the programme, nobody had clearly defined which team led on which processes, objects and metadata. Changes overwrote each other, and the teams' technical approaches were far apart.

The first step was to route every change through a pull request with a review. For a while, every single one went across my desk. From those reviews we wrote down standards, including naming conventions, one automation per object and context, and test coverage. Two elements made the biggest difference: the object ownership matrix, and rules for configuration, such as which values belong in custom metadata types or custom labels instead of being hard-coded.

![Simplified example of an object ownership matrix: the sales stream owns Account, Opportunity and Quote, the service stream owns Case and Asset, the field service stream owns Work Order. Every other stream coordinates with the owner before it changes one of these objects.](../../../assets/blog/object-ownership-matrix-en.png)

The rule was simple: before a team changed another stream's object, it had to agree the change with the owner. In the simplified example above, sales owns Account, Opportunity and Quote, service owns Case and Asset, and field service owns Work Order.

It took about three months until the standards were stable. The first version covered around 80 percent of cases. Edge cases came up afterwards, and we discussed them in regular centre of excellence calls. Eventually they almost disappeared, because upcoming changes came up early enough, before they turned into conflicts.

## What belongs in the matrix?

The matrix should stay small enough that anyone can read it in two minutes. I recommend these columns:

1. **Object**, with its API name so nothing gets mixed up.
2. **Owning stream** and a named person as contact.
3. **Automation entry point**, meaning whether the object is automated through Flow or an Apex trigger framework.
4. **Streams that use it**, so the owner knows who a change affects.

The hard part is shared objects like Account, Contact or Product. They also get exactly one owner. The other streams submit their requirements there, and the owner builds them into the shared automation. That is slower than everyone building for themselves. It is also the only way the object will still be maintainable in two years.

What does not belong in the matrix: detailed rules for naming, tests or code style. Those live in the development standards. The matrix answers one question only: who decides.

## How do you enforce the matrix?

A table in the wiki changes nothing on its own. The matrix only works once it is checked in the daily workflow.

- **In the pull request review.** If a change touches another stream's object, the reviewer asks whether the owner agreed. How such reviews work is described in [why pull request reviews are a must in enterprise projects](../why-pull-request-reviews-are-a-must-in-enterprise-projects/).
- **Technically in the repository.** Once the metadata lives in Git, parts of the matrix can be mapped. On GitHub, a [CODEOWNERS file](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) assigns paths to a team, for example an object's folder. If a pull request changes those files, the team is requested as reviewer automatically, and a branch protection rule makes its approval mandatory.
- **In the centre of excellence.** Regular calls where streams present upcoming changes to shared objects, with enough lead time for everyone else.

The matrix belongs to the client, not to a partner. If a partner decides who owns which object, it also decides what its competitors may build. The same applies to repository and pipeline, as described in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).

## Where should you start?

A first matrix is ready sooner than most people expect:

1. **List the 15 to 20 most important objects**, standard and custom, that more than one team touches.
2. **Assign one stream to each object**, even when the decision for Account or Contact is uncomfortable.
3. **Record the automation entry point per object** and allow new automation only there.
4. **Ask about it in every review**, from day one.
5. **Settle edge cases in the centre of excellence** and update the matrix.

In my experience the first version is never complete, and it does not need to be. You start with 80 percent, and the reviews deliver the rest. More on how I steer programmes with several partners is on the [partner governance](../../services/partner-governance/) page.

An object ownership matrix is quick to write down and saves a programme with several partners a lot of conflict between teams. If several partners work on one org in your programme and you want a second opinion, [send me a message](#contact).
