---
title: "Salesforce sandbox strategy for multiple partners"
description: "Which sandboxes a Salesforce program with several partners needs, who owns them, which data goes into them and how often you should refresh them."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-sandbox-strategy-multiple-partners
translationKey: sandbox-strategy-multiple-partners
topic: devops
categories: [devops, architecture]
contactBrief: devops
tags: [sandbox strategy, DevOps, release management, partner governance]
takeaways:
  - "A refresh can carry production endpoints into the sandbox, while secrets are not copied. A post-refresh script sets which systems the sandbox connects to."
  - "The target picture: isolated development per active stream, one shared integration sandbox, a Partial Copy for ERP tests and a Full Copy for UAT."
  - "A refresh replaces the sandbox with a new org. Metadata not in Git is gone afterwards, so only the pipeline moves changes through the environments."
  - "All sandboxes belong to the client and are recorded in one list with purpose, owner and refresh date."
faq:
  - q: "How many sandboxes does a Salesforce program need?"
    a: "It depends on test types, parallel releases, data volumes and your entitlements. A common baseline: isolated development environments, one shared integration sandbox, a Partial Copy for interface tests and a Full Copy for UAT. More environments only pay off when each has its own purpose and an owner."
  - q: "How often can a Full Copy sandbox be refreshed?"
    a: "Salesforce allows a Full Copy refresh every 29 days, a Partial Copy refresh every 5 days and a Developer sandbox refresh once a day."
  - q: "Should every partner have their own sandboxes?"
    a: "Every developer needs their own development environment, but all sandboxes should hang off the client's production org and be listed in one shared inventory. A separate integration environment per partner only pushes the conflicts further back."
  - q: "What has to happen after a sandbox refresh?"
    a: "Point interfaces to test systems and set up authentication for those connections again, check email deliverability, create test users, mask personal data, restart scheduled jobs and load reference data. These steps belong in a script and a release checklist, not in one person's head."
draft: false
---

A Salesforce sandbox strategy defines for every test environment what it is for, who works in it, which data it holds and when it gets refreshed. When several implementation partners work on one org, I recommend a fixed chain: each developer has their own development environment, followed by one shared integration sandbox, a Partial Copy for tests with the ERP and a Full Copy for UAT and the dress rehearsal before each release. Changes only move through this chain via the pipeline. Without these rules every partner builds their own world, and the differences only show up in production.

## Which sandbox types does Salesforce offer?

A sandbox is a copy of the production org for development and testing. Salesforce has four types, which differ mainly in data and refresh interval ([Salesforce Help: sandbox licenses and storage](https://help.salesforce.com/s/articleView?id=sf.data_sandbox_environments.htm&language=en_US&type=5)):

| Type | Content | Storage data / files | Earliest refresh |
|---|---|---|---|
| Developer | metadata only | 200 MB / 200 MB | daily |
| Developer Pro | metadata only | 1 GB / 1 GB | daily |
| Partial Copy | metadata and a sample defined by a template | 5 GB / same as production | every 5 days |
| Full Copy | metadata and all data, or a subset via template | same as production | every 29 days |

On top of that there are scratch orgs: empty, short-lived orgs created from a configuration file in the repository, with a lifetime of 1 to 30 days, 7 days by default. They suit developers whose work lives entirely in Git.

Your Salesforce edition and contract determine how many sandboxes of each type are included. Full Copies are often limited by the purchased entitlement. That is the first reason you need a strategy: the most expensive environment must not belong to one partner who uses it for their own development.

## With several partners, sandboxes drift apart

In a small org with one admin, sandboxes rarely cause trouble. With several partners I keep seeing the same causes:

- **Changes made directly in the sandbox.** A developer adjusts a field in the UAT sandbox so the test passes. The change is not in the repository, so the next deployment overwrites it, or production never gets it.
- **Every partner has their own integration environment.** Each partner tests against its own environment state, not against everyone else's. Conflicts between two streams only show up when both arrive in UAT.
- **Nobody knows what a sandbox is for.** After two years an org has twenty sandboxes with names like `test2` and `partnernew`, and nobody dares to delete one.
- **Refreshes without a plan.** Someone refreshes a sandbox, and afterwards an interface configuration still points to the production ERP, while the credentials for the test ERP are missing because secrets are not copied.

The symptoms are always the same: a feature works in UAT and breaks in production. I describe the causes in more detail in [why DevOps decides Salesforce enterprise projects](../why-devops-matters-salesforce-enterprise/).

## What does a sandbox strategy for several partners look like?

The strategy follows the path of a change. Every stage has a purpose and an owner.

1. **Development.** Ideally, every developer has their own Developer sandbox or scratch org, or at least every active stream has one, within the available entitlements. Test data is loaded from the repository as a seed data set. This environment is allowed to break.
2. **Integration.** One shared sandbox, often a Developer Pro, sized for the data the tests need. Pull requests are validated and tested before the merge; after the merge, their changes are deployed here, and the streams test together for the first time. Partners have read access, but they cannot change anything there directly.
3. **Interface tests.** A Partial Copy connected to the ERP test system. The sample comes from a sandbox template that defines which objects are copied. Personal data gets masked.
4. **UAT and dress rehearsal.** The Full Copy. Business users test here with real data volumes, and the release is played through once completely, including post-deployment steps, in an agreed window after UAT. Personal data is masked here too, access is restricted, and the sandbox is approved for use after each refresh.
5. **Hotfix.** A sandbox with the production metadata and a branch from production, so an urgent defect can be fixed without dragging half-finished features along.

Larger programs with parallel release trains may need a second integration or staging lane, and around each Salesforce release, preview sandboxes get the new version about six weeks before production. Decide which sandbox is used to test the new release and which stays on the production version.

```hinweis achtung
A refresh creates a new org from the source, usually production, with a new org ID, and replaces the old one on activation. Anything built only in the sandbox is gone afterwards. So the rule is: every change lives in Git first and reaches the sandbox through the pipeline. Data, secrets, scheduled jobs and connections are not in Git and need the post-refresh steps.
```

With a pipeline on the client's own Git platform you see which release was last deployed to which environment; drift from direct changes still needs to be checked regularly. That is the part I set up under [DevOps and release management](../../services/devops-release-management/).

## The sandboxes belong to the client

All sandboxes hang off the production org, so technically they always belong to the client. In practice, though, a partner often decides who gets access and when a refresh happens. I think that is a mistake, for the same reason [clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/): whoever controls the environments sets the pace for everyone else.

So I keep a simple list that the client owns:

- Name, type and purpose of every sandbox
- Owner on the client side
- Which teams have access, and with which rights
- Which external systems it is connected to
- Source org, last and next planned refresh
- Preview or non-preview status around Salesforce releases
- Data classification and masking status

A sandbox without an entry in this list gets deleted after notice. That sounds strict, but it frees an allocated sandbox for a real purpose and stops forgotten environments full of customer data from lying around. What AI coding agents may read in such environments is covered in [sandbox customer data and AI coding agents](../sandbox-customer-data-ai-coding-agents/).

## How often should you refresh your sandboxes?

The refresh calendar follows the release calendar. I recommend this rhythm:

- **Full Copy** after every production release, so UAT tests the state users actually have. Check the dates: the 29-day period is counted from the refresh request, a four-week rhythm has only 28 days, and a Full Copy refresh can take days.
- **Partial Copy** before every larger round of interface testing.
- **Integration** only when it has drifted too far from production. Since all metadata comes from Git, it can be rebuilt; data and integration settings come from the post-refresh steps.
- **Developer sandboxes** as often as the developer needs. Scratch orgs are created fresh for every task anyway.

After every refresh, the same steps should run: point interface endpoints to the test ERP and set up credentials for those connections, confirm that email deliverability is still set to system email only and define who may change it, create test users, mask data, reschedule jobs and load reference data. Salesforce lets you run an Apex class (SandboxPostCopy) automatically after a sandbox is created or refreshed; it runs as the Automated Process user with limited rights, so some steps belong in the pipeline or a checked manual step. Salesforce Data Mask & Seed can run masking policies automatically after a refresh. Reference data can be loaded from the repository with SFDMU, an open-source plugin for the Salesforce CLI (sf sfdmu run). If these steps only exist on a checklist, every refresh depends on the one person who knows them.

```pro-contra
pro: Fixed chain with one shared integration
- Conflicts between streams show up early
- UAT tests the state that goes to production
- Fewer sandboxes, clear ownership
contra: What you give up
- Partners lose full control over their environment
- The pipeline has to exist before the chain works
```

## List every sandbox with its owner

Start with the list. Write down every existing sandbox with its purpose and owner, and delete the ones nobody claims. Then define the chain and block direct changes in integration and UAT. The refresh calendar comes last, once the post-refresh steps have been scripted.
