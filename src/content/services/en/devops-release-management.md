---
title: "Salesforce DevOps and release management consulting"
headline: "Salesforce releases that no longer take a weekend"
description: "Git-based Salesforce releases with branching, automated checks and pull request reviews, on the platform the client already owns, such as GitHub or GitLab."
lang: en
slug: devops-release-management
translationKey: service-devops
contactBrief: devops
order: 3
lead: "Change sets, manual deployment steps and releases that need a weekend are still common in large Salesforce orgs. I set up a Git-based release process with automated checks and reviews on the client's own platform, so releases become smaller, more frequent and predictable."
situations:
  - "Deployments still run with change sets or by hand, and nobody can say exactly what went into production last month."
  - "Every release needs a long list of manual pre- and post-deployment steps that live in someone's head or a spreadsheet."
  - "Sandboxes drift apart, and a feature that worked in UAT breaks in production."
  - "Several teams deploy to the same org without a shared branching model."
  - "A commercial DevOps tool is in place, but licence costs keep rising and only a few people know how to use it."
deliverables:
  - "I agree the branching model, the environments and the checks per stage with you, to fit the number of teams and the release rhythm."
  - "I build the pipeline on the Git platform you already use, usually with the open-source tool sfdx-hardis."
  - "I turn the manual steps before and after a deployment into automated steps and data deployments."
  - "At the start I review alongside the teams, until internal colleagues take the reviews over."
  - "I train your colleagues until they run and extend the pipeline themselves."
results:
  - "A CI/CD pipeline in your repository that validates every pull request against the target org and runs Apex tests and static code analysis"
  - "Review rules and code quality standards that apply to internal teams and partners"
  - "A history in which every change in production is traceable to a pull request and a reviewer"
  - "The process documentation in the repository, right next to the code"
phases:
  - title: "Assessment"
    icon: "analyse"
    text: "I look at the current release process, environments, repository and the pain points of the teams: where do deployments fail, what is done by hand, who approves what."
  - title: "Target process"
    icon: "target"
    text: "We agree on the branching model, the environments, the checks per stage and the review rules. The design depends on team size and how often the business wants to release."
  - title: "Pipeline setup"
    icon: "pipeline"
    text: "I build the pipeline on the client's Git platform, usually with sfdx-hardis, and move the first team onto it. Further teams follow once the process is stable."
  - title: "Handover"
    icon: "handshake"
    text: "Internal colleagues learn to run and extend the pipeline. The documentation stays in the client's repository, next to the code."
faq:
  - q: "Which Git platforms can a Salesforce pipeline run on?"
    a: "I have built Salesforce pipelines on GitHub, GitLab, Azure DevOps and Bitbucket. Each platform has its own details, but the pipelines are defined in YAML, so the backbone of the process is the same on all of them. The best choice is usually the platform the company already uses."
  - q: "Do we need a commercial DevOps tool such as Gearset or Copado?"
    a: "Not necessarily. Commercial tools work, but they come with running licence costs. Open-source tools like sfdx-hardis cover branching, checks, deployments and monitoring on the client's own Git platform. Which way fits depends on the team, the budget and how much the client wants to own."
  - q: "How do you measure whether the new release process works?"
    a: "Before and after numbers are often hard to get, because many companies cannot measure their current process and because releases change shape: they become smaller and more frequent. I focus on metrics the pipeline itself provides, such as deployment frequency, failed deployments and lead time for changes."
  - q: "How long does it take to introduce a Git-based release process?"
    a: "It depends on the number of teams and the state of the org. The first team usually works on the new process after a few weeks; further teams follow step by step, so nobody has to switch overnight."
blogTags: [devops, release management, release-management, sfdx-hardis, ci/cd, pull request review]
---

Salesforce DevOps means every change goes through Git, a pull request and an automated pipeline before it reaches production. Release management adds the rules around it: which branches exist, which checks run at which stage, who approves and when the business gets new features. In large orgs with several teams, this is what turns stressful release weekends into routine. I set up this process on the client side, on the Git platform the client already owns.

## Why do Salesforce releases cause so much trouble?

Salesforce makes it easy to change things directly in an org. That is useful at the beginning and becomes a problem once several teams work in parallel. I describe the typical symptoms in more detail in [why DevOps matters in Salesforce enterprise projects](../../blog/why-devops-matters-salesforce-enterprise/).

```vergleich
without: Changes made directly in the org
- Whoever changes something changes it directly in a sandbox or in production.
- Only the person who last worked on it knows which version is valid.
- Before and after the deployment, someone works through a checklist.
- A release needs the two or three people who know the routine.
with: Git, pull request and pipeline
- Every change starts as a branch and ends as a pull request.
- The valid version lives in Git, not in an org.
- The checklist is code and runs with every deployment.
- A release starts with a merge, not with a weekend appointment.
```

## What a good Salesforce pipeline covers

For enterprise teams I build the pipeline on these basics:

```saeulen
roof: A good Salesforce pipeline
check | Checks | On every pull request | A validation deployment against the target org, Apex tests and static code analysis run before anyone reviews the change.
pipeline | Environments | A clear path to production | Changes move from development to integration, UAT and production through promotion branches, so it is always visible which change sits in which org.
gear | Automation | After the deployment | Steps that used to be manual are part of the deployment, and reference data can be deployed with SFDMU, an open-source data migration plugin.
analyse | Review | For every change | Automation catches the repeatable errors, people review design and readability.
base: On the client's Git platform
```

More on reviews in [why pull request reviews are a must in enterprise projects](../../blog/why-pull-request-reviews-are-a-must-in-enterprise-projects/).

```praxis
In one programme I built the release process myself. At first every pull request went across my desk; later I handed this task over to an internal colleague.
```

## The pipeline runs on your Git platform, usually with sfdx-hardis

```kennzahlen
4 | Git platforms: GitHub, GitLab, Azure DevOps and Bitbucket
1 | YAML backbone, the same on every platform
€0 | running licence costs for sfdx-hardis
source: my pipelines in client projects
```

I build pipelines on the Git platform the company already uses. So far that has been GitHub, GitLab, Azure DevOps and Bitbucket. The pipelines are defined in YAML, so the backbone is the same on every platform, even though each one has its own details, for example how the validation status of a pull request is shown.

For the Salesforce part I often use sfdx-hardis, an open-source DevOps tool that I use in my own projects. It has no running licence costs, and the repository, the pipeline and the access rights stay with the client. I explain what it does in [sfdx-hardis: open-source DevOps for Salesforce](../../blog/sfdx-hardis-open-source-salesforce-devops/). I support the project, but I have no financial ties to it. If a client already has a commercial tool that works, I build on it.

```hinweis tipp
Platform changes are part of release management too. Each Salesforce release, such as [Winter '27](../../blog/salesforce-winter-27-what-changes-for-your-pipeline/), can change API versions, CLI behaviour or security settings that a pipeline depends on.
```

## One release process for all partners

A shared release process is the base for steering several implementation partners. Every partner delivers through pull requests into the same repository, every delivery runs through the same checks, and the approval sits with the client. If every partner deploys in its own way instead, no governance framework holds. I describe the rules for standards, ownership and reviews across several partners under [partner governance](../partner-governance/).
