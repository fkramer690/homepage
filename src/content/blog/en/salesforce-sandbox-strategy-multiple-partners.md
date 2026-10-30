---
title: "Salesforce sandbox strategy for multiple partners"
description: "Which sandboxes a Salesforce programme with several partners needs, who owns them, which data goes into them and how often you should refresh them."
pubDate: 2026-10-29
lang: en
slug: salesforce-sandbox-strategy-multiple-partners
translationKey: sandbox-strategy-multiple-partners
topic: devops
categories: [devops, architecture]
contactBrief: devops
tags: [sandbox strategy, DevOps, release management, partner governance]
takeaways:
  - "A sandbox strategy defines for every environment what it is for, who works in it, which data it holds and when it gets refreshed."
  - "With several partners, every developer needs an own environment, plus one shared integration sandbox, a Partial Copy for ERP tests and a Full Copy for UAT."
  - "A refresh overwrites everything in the sandbox. Whatever is not in Git is gone afterwards, so only the pipeline moves changes through the environments."
  - "All sandboxes belong to the client and sit in one list with purpose, owner and refresh date."
faq:
  - q: "How many sandboxes does a Salesforce programme need?"
    a: "One development environment per developer, one shared integration sandbox, a Partial Copy for interface tests and a Full Copy for UAT. More environments only pay off when each has its own purpose and an owner."
  - q: "How often can a Full Copy sandbox be refreshed?"
    a: "Salesforce allows a Full Copy refresh every 29 days, a Partial Copy refresh every 5 days and a Developer sandbox refresh once a day."
  - q: "Should every partner have their own sandboxes?"
    a: "Every developer needs an own development environment, but all sandboxes should hang off the client's production org and be listed in one shared inventory. A separate integration environment per partner only pushes the conflicts further back."
  - q: "What has to happen after a sandbox refresh?"
    a: "Point interfaces to test systems, check email deliverability, create test users, mask personal data and load reference data. These steps belong in a script, not in a checklist in one person's head."
draft: false
---

A Salesforce sandbox strategy defines for every test environment what it is for, who works in it, which data it holds and when it gets refreshed. When several implementation partners work on one org, I recommend a fixed chain: an own development environment per developer, one shared integration sandbox, a Partial Copy for tests with the ERP and a Full Copy for UAT and the dress rehearsal before each release. Changes only move through this chain via the pipeline. Without these rules every partner builds their own world, and the differences only show up in production.

## Which sandbox types does Salesforce offer?

A sandbox is a copy of the production org for development and testing. Salesforce has four types, which differ mainly in data and refresh interval ([Salesforce: What is a Salesforce Sandbox?](https://www.salesforce.com/platform/what-is-salesforce-sandbox/)):

| Type | Content | Storage data / files | Earliest refresh |
|---|---|---|---|
| Developer | metadata only | 200 MB / 5 MB | daily |
| Developer Pro | metadata only | 1 GB / 1 GB | daily |
| Partial Copy | metadata and a sample defined by a template | 5 GB / 5 GB | every 5 days |
| Full Copy | metadata, all data and files | same as production | every 29 days |

On top of that there are scratch orgs: short-lived orgs created from a configuration file in the repository that disappear again after a few days. They suit developers whose work lives entirely in Git.

How many sandboxes of each type your contract includes depends on edition and contract. Full Copies are almost always scarce. That is the first reason you need a strategy: the most expensive environment must not belong to one partner who uses it for their own development.

## Why do sandboxes drift apart in programmes with several partners?

In a small org with one admin, sandboxes rarely cause trouble. With several partners I keep seeing the same causes:

- **Changes made directly in the sandbox.** A developer adjusts a field in the UAT sandbox so the test passes. The change is not in the repository, so the next deployment overwrites it, or production never gets it.
- **Every partner has their own integration environment.** Each one tests against their own state, not against everyone else's. Conflicts between two streams only show up when both arrive in UAT.
- **Nobody knows what a sandbox is for.** After two years an org has twenty sandboxes with names like `test2` and `partnernew`, and nobody dares to delete one.
- **Refreshes without a plan.** Someone refreshes the Full Copy, and afterwards the interface points to the production ERP because the endpoints were copied from production.

The symptoms are always the same: a feature works in UAT and breaks in production. I describe the causes in more detail in [why DevOps decides Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/).

## What does a sandbox strategy for several partners look like?

The strategy follows the path of a change. Every stage has a purpose and an owner.

1. **Development.** Every developer works in their own Developer sandbox or scratch org. Test data comes as a seed data set from the repository. This environment is allowed to break.
2. **Integration.** One shared Developer Pro sandbox into which every pull request is merged and deployed after review. This is where the streams meet for the first time. Partners can read, but they cannot change anything there directly.
3. **Interface tests.** A Partial Copy connected to the ERP test system. The sample comes from a sandbox template that defines which objects are copied. Personal data gets masked.
4. **UAT and dress rehearsal.** The Full Copy. Business users test here with real data volumes, and the release is played through once completely, including post-deployment steps.
5. **Hotfix.** A Developer Pro sandbox with the production state, so an urgent defect can be fixed without dragging half-finished features along.

```hinweis achtung
A refresh replaces the sandbox completely with a new copy of production. Anything built only in the sandbox is gone afterwards. So the rule is: every change lives in Git first and reaches the sandbox through the pipeline.
```

With a pipeline on the client's own Git platform you can always see which state sits in which environment. That is the part I set up under [DevOps and release management](../../services/devops-release-management/).

## Who owns the sandboxes?

All sandboxes hang off the production org, so technically they always belong to the client. In practice, though, a partner often decides who gets access and when a refresh happens. I think that is a mistake, for the same reason [clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/): whoever controls the environments sets the pace for everyone else.

So I keep a simple list that the client owns:

- Name, type and purpose of every sandbox
- Owner on the client side
- Which teams have access, and with which rights
- Which external systems it is connected to
- Next planned refresh

A sandbox without an entry in this list gets deleted after notice. That sounds strict, but it saves licences and stops forgotten environments full of customer data from lying around. What AI coding agents may read in such environments is covered in [sandbox customer data and AI coding agents](../sandbox-customer-data-ai-coding-agents/).

## How often should you refresh your sandboxes?

The refresh calendar follows the release calendar. I recommend this rhythm:

- **Full Copy** after every production release, so UAT tests the state users actually have. With a monthly release this fits the 29-day interval.
- **Partial Copy** before every larger round of interface testing.
- **Integration** only when it has drifted too far from production. Since everything comes from Git, it can be filled again at any time.
- **Developer sandboxes** as often as the developer needs. Scratch orgs are created fresh for every task anyway.

After every refresh the same steps run: point interface endpoints to the test ERP, check that email deliverability is set to system email only, create test users, mask data and load reference data. Salesforce lets you run an Apex class automatically after a sandbox is created or refreshed. Reference data can be loaded from the repository with SFDMU, an open-source plugin for the Salesforce CLI. If these steps only exist on a checklist, every refresh depends on the one person who knows them.

```pro-contra
pro: Fixed chain with one shared integration
- Conflicts between streams show up early
- UAT tests the state that goes to production
- Fewer sandboxes, clear ownership
contra: What you give up
- Partners lose full control over their environment
- The pipeline has to exist before the chain works
```

## Where should you start?

Start with the list. Write down every existing sandbox with its purpose and owner, and delete the ones nobody claims. Then define the chain and block direct changes in integration and UAT. The refresh calendar comes last, once the post-refresh steps exist as a script.

A sandbox strategy is one page of paper that saves a lot of release weekends.
