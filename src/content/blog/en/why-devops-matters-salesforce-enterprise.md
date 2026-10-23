---
title: "Why DevOps decides Salesforce enterprise projects"
description: "Change sets work for one admin. With several partners, global rollouts and three releases a year, DevOps decides whether a programme stays in control."
pubDate: 2026-10-23
lang: en
slug: why-devops-matters-salesforce-enterprise
translationKey: devops-salesforce-enterprise
tags: [devops, release management, partner governance, sfdx-hardis]
---

Salesforce is easy to start with. A few clicks in Setup, a change set, done. That ease is exactly why many enterprise programmes run into trouble a year later. As soon as several teams, partners and countries work on the same org, the question is no longer how to build something. It is how to get it into production safely, repeatedly and traceably. That is what DevOps is about, and in enterprise projects it decides whether a programme stays in control.

## What changes when a project gets big

In a small org, one admin knows every change. In an enterprise programme that picture is gone. I have steered programmes with up to eight project teams and more than 30 developers working on one platform. In that setting, a few things happen very reliably without a proper DevOps setup:

- **Changes overwrite each other.** Team A deploys a page layout, Team B deploys the same object a day later with an older version. Nobody notices until users complain.
- **Nobody knows what is in production.** If the org itself is the only source of truth, there is no history, no review and no easy way back.
- **Releases become events.** Deployments happen late in the evening, with manual pre- and post-steps in a spreadsheet, and the whole team holds its breath.
- **Partners become hard to replace.** If the deployment knowledge sits in the heads and tools of one implementation partner, the client depends on that partner.

None of this is a tooling problem first. It is a governance problem that tooling can solve.

## Why change sets don't scale

Change sets are fine for small, isolated changes. For enterprise work they lack almost everything you need:

- no version history and no rollback
- no code review before a change reaches the next environment
- no automated tests or quality checks as a gate
- manual, click-based assembly that is easy to get wrong
- no way to run the same deployment repeatably across several environments

Add Salesforce's three major releases per year, sandboxes on different release versions during preview windows, and global rollouts with country-specific requirements. Manual deployments simply can't keep up with that.

## What good Salesforce DevOps looks like

A solid setup does not need to be complicated. In my projects these building blocks matter most:

1. **Git as the source of truth.** All metadata lives in a repository. Every change is a commit with an author, a reason and a link to the user story.
2. **A defined branch and environment strategy.** For example: developer sandboxes, integration, UAT, production, plus a fast path for hotfixes. Every team knows where its work goes next.
3. **Pull requests with review.** Changes are reviewed before they move on, with a clear owner for architecture decisions.
4. **Automated quality gates.** Validation deployments, Apex tests and static code analysis run on every pull request. A green pipeline is the requirement for a merge, not a nice-to-have.
5. **Delta deployments.** Only what changed is deployed. That keeps deployments fast and reduces side effects.
6. **Monitoring and backup.** Regular metadata backups and checks show changes made directly in production, outdated API versions or unused components.

> The pipeline belongs to the client, not to the partner. Whoever owns the release process owns the platform.

That last point matters a lot to me as an architect on the client side. A repository and pipeline under the client's control make partners comparable and replaceable. They also make onboarding a new partner much easier, because the standards are written down and enforced automatically.

## sfdx-hardis as an example

You don't have to buy a commercial platform to get there. A good example is [sfdx-hardis](https://sfdx-hardis.cloudity.com/), an open-source toolkit maintained by Cloudity together with an active community. It bundles many of the building blocks above:

- **A ready-made CI/CD pipeline** for GitHub, GitLab, Azure DevOps, Bitbucket and Jenkins, so the pipeline runs where the client's IT already works.
- **Delta and smart deployments** based on sfdx-git-delta, which only deploy changed metadata.
- **Org monitoring and metadata backup**, with notifications to Slack, Microsoft Teams or other channels.
- **Generated documentation** of the project, including flows, straight from the repository.
- **A VS Code extension** that gives admins and consultants a visual way into the Git workflow, so DevOps is not only for developers.

Commercial tools like Gearset or Copado have their place too, especially when a team wants a fully managed interface. The choice depends on the team, the existing toolchain and the budget. What matters is that a decision is made early and enforced for everyone, including every partner.

## Where to start

If your Salesforce programme still works with change sets or manual deployments, you don't need a big-bang migration. A pragmatic order:

1. Put the current production metadata into a Git repository.
2. Add validation deployments and tests for every pull request.
3. Define the branch and environment strategy and make it binding for all partners.
4. Switch production deployments to the pipeline.
5. Add monitoring, backups and generated documentation.

DevOps is not an extra layer for later. In enterprise projects it is part of the architecture, and it should be in place before the second partner starts working on the org.
