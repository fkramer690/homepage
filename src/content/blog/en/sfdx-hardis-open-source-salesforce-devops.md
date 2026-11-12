---
title: "sfdx-hardis: open-source Salesforce DevOps explained"
metaTitle: "sfdx-hardis: free open-source Salesforce DevOps toolkit"
description: "sfdx-hardis is a free open-source Salesforce DevOps toolkit: CI/CD, delta deployments, org monitoring, backups and docs. Compared with Gearset and Copado."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: en
slug: sfdx-hardis-open-source-salesforce-devops
translationKey: sfdx-hardis-introduction
topic: open-source
categories: [devops]
tags: [sfdx-hardis, devops, open source, release management, ci/cd]
takeaways:
  - "sfdx-hardis consists of a Salesforce CLI plugin and a VS Code extension and is led by Nicolas Vuillamy and Cloudity."
  - "It covers the technical release process: CI/CD pipeline, optional delta deployments, quality checks, org monitoring, metadata backup and documentation."
  - "The pipeline runs on the client's existing Git platform, for example GitHub, GitLab, Azure DevOps, Bitbucket or Jenkins."
  - "Unlike Gearset or Copado, sfdx-hardis itself has no license fees, but the team needs Git and pipeline know-how and is responsible for upgrades."
  - "It fits best when the client wants to own its release process and has, or builds, internal DevOps skills."
faq:
  - q: "What is sfdx-hardis?"
    a: "sfdx-hardis is a free, open-source toolkit for Salesforce DevOps. It consists of a Salesforce CLI plugin and a VS Code extension and provides a ready-made CI/CD pipeline, monitoring, metadata backups and documentation."
  - q: "Is sfdx-hardis really free?"
    a: "The tool itself is open source under the AGPL-3.0 license and has no license fees. Costs come from the Git platform and CI minutes, from the time needed to set it up, upgrade it and run it, and optionally from a paid support subscription with Cloudity."
  - q: "Which Git platforms does sfdx-hardis support?"
    a: "sfdx-hardis supports GitHub, GitLab, Azure DevOps, Bitbucket and Jenkins, and provides Docker images for pipelines. The pipeline runs on the platform the client's IT team already uses."
  - q: "Is sfdx-hardis suitable for admins, not only developers?"
    a: "Yes, for daily work. The VS Code extension offers menus and buttons for the typical steps, so admins and consultants can work with branches, pull requests and deployments without memorizing Git commands. The people who set up and maintain the pipeline still need Git, CI/CD and Salesforce deployment skills."
  - q: "How does sfdx-hardis compare to Gearset or Copado?"
    a: "Gearset and Copado are commercial platforms with a managed interface and vendor support, mostly billed per user. sfdx-hardis has no license costs and runs on the client's own Git platform, but needs more internal know-how."
---

sfdx-hardis is a free, open-source toolkit for Salesforce DevOps. It combines a Salesforce CLI plugin with a VS Code extension and gives teams a ready-made CI/CD pipeline, optional delta deployments, quality checks, org monitoring, metadata backups and generated documentation. It runs on the Git platform a company already uses. I use sfdx-hardis in client projects and rate it very highly, mainly because it delivers what most enterprise programs need without license fees for the tool itself.

This article is my overview of sfdx-hardis. Two related articles go into more detail: the [comparison of sfdx-hardis and DevOps Center](/en/blog/sfdx-hardis-vs-devops-center-comparison/) shows when the native Salesforce tool is enough, and my [review of the free sfdx-hardis training](/en/blog/sfdx-hardis-free-devops-training/) explains how to try the toolkit yourself in one day.

## What is sfdx-hardis?

[sfdx-hardis](https://sfdx-hardis.cloudity.com/) is led by Nicolas Vuillamy and Cloudity, a Salesforce consultancy, together with a large community of external contributors and translators. Technically it consists of two parts:

- **A Salesforce CLI plugin** with commands for deployments, monitoring, documentation and project setup. These commands run locally and in the pipeline.
- **A VS Code extension** that puts those commands behind menus and buttons. It also works in VS Code forks such as Cursor.

Both components are published under the AGPL-3.0 license, so they should be included in your normal open-source review.

The idea behind sfdx-hardis is that Salesforce DevOps should not depend on an expensive platform. Most building blocks of a good release process can be assembled from open tools, and sfdx-hardis bundles them into one consistent setup. If you are new to the topic, my article on [why DevOps decides Salesforce enterprise projects](/en/blog/why-devops-matters-salesforce-enterprise/) explains the basics first.

A note on transparency: I support the open-source project, but I have no financial or other ties to Cloudity.

## sfdx-hardis covers the technical release process

The scope is wider than most people expect from an open-source tool. The most important areas:

1. **CI/CD pipeline.** A pre-configured pipeline for GitHub, GitLab, Azure DevOps, Bitbucket and Jenkins, with Docker images for the pipeline runners. Every pull request against a configured major branch triggers a validation deployment, Apex tests and quality checks.
2. **Smart and delta deployments.** Once delta deployment is enabled, sfdx-git-delta deploys only the changed metadata for pull requests from feature branches; promotions between major branches use full deployments by default. When a deployment fails, sfdx-hardis shows tips on how to fix the error, which saves a lot of searching.
3. **Deployment actions.** Pre- and post-deployment steps, for example data fixes or reference data loaded with SFDMU, an open-source data migration plugin for the Salesforce CLI, run as part of the pipeline instead of being managed from a spreadsheet of manual steps.
4. **Quality checks.** Pull request results include static analysis via MegaLinter, so code quality problems show up before the merge.
5. **Org monitoring and metadata backup.** Scheduled jobs back up metadata to Git and check for things like Apex and flow errors, org limits, deprecated API versions, inactive users or selected unused metadata. This is not a backup of your business data. Results go to Slack, Microsoft Teams, Google Chat or email, and can feed dashboards.
6. **Generated documentation.** Project documentation, including flows, is generated from the repository and can be published, for example to Confluence or Salesforce.
7. **Ticketing integration.** Jira, Azure Boards and other tools can be linked so that user stories and deployments are connected.
8. **DORA metrics.** A report on five core metrics: deployment frequency, lead time for changes, change failure rate, mean time to recovery and deployment rework rate.

What I like most is where all of this lives. Because sfdx-hardis runs on the client's own Git platform, the repository, pipeline and configuration stay with the client, regardless of which partner builds the features.

## How does sfdx-hardis compare to Gearset or Copado?

Commercial tools like Gearset or Copado have their place. They offer a managed web interface, vendor support and features that compare orgs in a few clicks. For some teams that is worth the money. But there are trade-offs:

- **License costs.** Commercial platforms are typically billed per user per year. In a program with dozens of developers and admins across several partners, that adds up quickly. sfdx-hardis itself has no license fees.
- **Where the process lives.** With a commercial platform, part of the release process lives in the vendor's product. With sfdx-hardis it lives in the client's repository and pipeline configuration, in plain files.
- **Know-how.** sfdx-hardis expects the team to understand Git, branches and pipelines, at least at a basic level. A commercial platform hides more of that. The VS Code extension closes much of the gap for admins, but not all of it.
- **Support.** Free support is provided by the community on a best-effort basis. Cloudity also sells monthly and yearly support subscriptions with priority handling. For most enterprise teams I work with, that is acceptable if at least one internal person owns the setup, including pinning tested versions instead of always running the latest version.

```tabelle
title: sfdx-hardis compared with commercial platforms
columns: | sfdx-hardis * | Commercial platforms such as Gearset or Copado ~ Gearset, Copado and co.
License costs | No license fees | Typically billed per user and year
Where the process lives | In the client's repository and pipeline configuration, in plain files | Partly in the vendor's product
Know-how | Git basics needed. The VS Code extension closes much of the gap for admins | Hides more of Git behind a managed web interface
Support | Community support, paid support subscription or consulting | Vendor support
note: No tool is right for every team. Choose early, justify it, make it binding for every partner.
```
Salesforce's own DevOps Center, now called Lifecycle Center, is another free option. It is a good start for click-based teams, but covers fewer pipeline, monitoring and documentation capabilities. The full comparison, including the supported Git platforms, is in [sfdx-hardis vs DevOps Center](/en/blog/sfdx-hardis-vs-devops-center-comparison/).

What matters most to me: no tool is right for every team. The choice should be made early, justified properly and then made binding for everyone involved, including every partner. A program where each partner brings its own tool ends up with several release processes, and therefore with none.

## When is sfdx-hardis the right choice?

From my project experience, the answer depends on these points:

```pro-contra
pro: sfdx-hardis fits well when
- several teams or partners work on the same org and need one binding release process
- the client wants to own the process and reduce dependence on a partner or a tool vendor
- the client already runs GitHub, GitLab or Azure DevOps and wants the pipeline there
- there is, or will be, at least one internal person who takes ownership of the setup
- license budgets are tight, or better spent on people than on per-user fees
contra: Less suitable when
- nobody on the client side wants to touch Git at all
- a team needs a fully managed tool with a contractual support line from day one
```

In the second case a commercial platform can be the more honest answer.

The point about license budgets is often underestimated. The saved license costs are best invested in an internal role that maintains the setup, onboards new teams and owns the release calendar. Without that role, even the best tool loses its impact after a few months. The same goes for development standards at partners. See [Reinforcement: making standards stick with partners](/en/blog/partner-standards-reinforcement/).

## Get started with the free training

The fastest way to understand sfdx-hardis is to try it. Cloudity offers a free, hands-on training with three levels and verified badges. I completed all three and wrote about my experience in [what I learned from the free sfdx-hardis training](/en/blog/sfdx-hardis-free-devops-training/).

Choosing the toolchain is part of [architecture and partner governance](/en/services/partner-governance/), not a secondary decision left to developers. For an ongoing program I recommend this order:

```schritte
Build the repository
  Put the production metadata into a repository on the client's Git platform.
Set up the pipeline
  Set up the sfdx-hardis pipeline with validation on every pull request.
Set the rules
  Define the branch strategy and make pull request reviews mandatory.
Deployment actions
  Move deployment steps from spreadsheets into deployment actions.
Switch on operations
  Turn on monitoring, metadata backups and generated documentation.
```
