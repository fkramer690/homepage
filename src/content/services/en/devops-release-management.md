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
  - "A commercial DevOps tool is in place, but license costs keep rising and only a few people know how to use it."
deliverables:
  - "Together with you I define the branching model, the environments and the checks per stage, to fit the number of teams and the release rhythm."
  - "I build the pipeline on the Git platform you already use, usually with the open-source tool sfdx-hardis."
  - "I turn the manual steps before and after a deployment into automated steps and data deployments."
  - "At the start I handle part of the reviews myself, until internal colleagues take them over completely."
  - "I train your colleagues until they run and extend the pipeline themselves."
results:
  - "A CI/CD pipeline in your repository that validates every pull request against the target org and runs Apex tests and static code analysis"
  - "Review rules and code quality standards that apply to internal teams and partners"
  - "A history in which every change in production is traceable to a pull request and a reviewer"
  - "The process documentation in the repository, right next to the code"
phases:
  - title: "Assessment"
    icon: "analyse"
    text: "I analyze the current release process, the environments, the repository and the pain points of the teams: where deployments fail, what is done by hand and who approves what."
  - title: "Target process"
    icon: "target"
    text: "We agree on the branching model, the environments, the checks per stage and the review rules. The design depends on team size and how often the business wants to release."
  - title: "Pipeline setup"
    icon: "pipeline"
    text: "I build the pipeline on the client's Git platform, usually with sfdx-hardis, and move the first team onto it. More teams follow once the process is stable."
  - title: "Handover"
    icon: "handshake"
    text: "Internal colleagues learn to run and extend the pipeline. The documentation stays in the client's repository, next to the code."
duration: "Assessment and target process 1 to 2 weeks. The first team works with the pipeline after 4 to 6 weeks. All teams have switched after 2 to 4 months, depending on how many teams there are."
notFit:
  - "A single admin makes changes by hand, and that is sufficient."
  - "A commercial DevOps tool works well, and nobody wants to switch."
alternatives: "A commercial tool such as Gearset or Copado is set up faster but comes with per-user license costs. An internal DevOps engineer can take over the pipeline once it runs. With several partners, however, that person often lacks the mandate to enforce rules."
progress:
  - measure: "Manual steps per release"
    how: "Which deployment steps are still done by hand."
  - measure: "Release rhythm"
    how: "How often changes go live and how big a release is."
  - measure: "Fixes after a release"
    how: "How many hotfixes a release causes."
  - measure: "Time to production"
    how: "How long a finished change waits for its release."
reference: governance
faq:
  - q: "Which Git platforms can a Salesforce pipeline run on?"
    a: "I have built Salesforce pipelines on GitHub, GitLab, Azure DevOps and Bitbucket. Each platform needs its own pipeline definition, but the deployment steps and checks behind it are the same on all of them. The best choice is usually the platform the company already uses."
  - q: "Do we need a commercial DevOps tool such as Gearset or Copado?"
    a: "Not necessarily. Salesforce's own DevOps Center is free but supports fewer Git platforms. Commercial tools work, but they come with ongoing license costs. Open-source tools like sfdx-hardis cover branching, checks, deployments and monitoring on the client's own Git platform. Which option fits depends on the team, the budget and how much the client wants to own."
  - q: "How do you measure whether the new release process works?"
    a: "Before-and-after numbers are often hard to collect, because many companies cannot measure their current process and because releases change shape: they become smaller and more frequent. I focus on metrics the pipeline itself provides, such as deployment frequency, failed deployments and lead time for changes."
  - q: "How long does it take to introduce a Git-based release process?"
    a: "It depends on the number of teams and the state of the org. The first team usually works with the new process after a few weeks, and more teams follow step by step, so nobody has to switch overnight."
  - q: "Do you replace our implementation partner?"
    a: "No. Your partners keep building, and I steer them on the client side according to shared rules. If you want to replace a partner, I help you do it without losing knowledge and without delaying the program."
  - q: "How do you avoid becoming a bottleneck?"
    a: "I keep my work transparent. Decisions, standards and review criteria are documented where your team and your partners can see them, so nobody has to wait for me and the work does not depend on me."
blogTags: [devops, release management, release-management, sfdx-hardis, ci/cd, pull request review]
readMore: [devops-salesforce-enterprise, sfdx-hardis-introduction, client-owned-devops-tools, pull-request-reviews-enterprise, sandbox-strategy-multiple-partners, salesforce-release-schedule, dora-metrics-salesforce-releases, quality-gates-ai-code-pipeline]
masterclass: devops
---

Salesforce DevOps means every change that can be deployed as metadata goes through Git, a pull request and an automated pipeline before it reaches production. The rare change that has to be made directly in production follows a documented exception and is pulled back into Git afterwards. Release management sets the rules around it: which branches exist, which checks run at which stage, who approves and when the business gets new features. In large orgs with several teams, this is what turns stressful release weekends into routine. I set up this process on the client side, on the Git platform the client already owns.

## Why do Salesforce releases cause so much trouble?

Salesforce makes it easy to change things directly in an org. That is useful at the beginning, but it becomes a problem once several teams work in parallel. I describe the typical symptoms in more detail in [why DevOps matters in Salesforce enterprise projects](../../blog/why-devops-matters-salesforce-enterprise/).

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
In one program I built the release process myself. At first every pull request went across my desk, and later I handed this task over to an internal colleague.
```

## The pipeline runs on your Git platform, usually with sfdx-hardis

```kennzahlen
4 | Git platforms: GitHub, GitLab, Azure DevOps and Bitbucket
1 | set of deployment steps and checks, reused on every platform
€0 | license fee for sfdx-hardis
source: my pipelines in client projects
```

I build pipelines on the Git platform the company already uses. So far that has been GitHub, GitLab, Azure DevOps and Bitbucket. Each platform needs its own pipeline definition, but the deployment steps and checks behind it are the same everywhere, even though each one has its own quirks, for example how the validation status of a pull request is shown.

For the Salesforce part I often use sfdx-hardis, an open-source DevOps tool that I use in my own projects. It has no license fee (runners and maintenance still cost time and money), and the repository, the pipeline and the access rights stay with the client. I explain what it does in [sfdx-hardis: open-source DevOps for Salesforce](../../blog/sfdx-hardis-open-source-salesforce-devops/). I support the project, but I have no financial ties to it. If a client already has a commercial tool that works, I build on it.

```hinweis tipp
Platform changes are part of release management too. Each Salesforce release, such as [Winter '27](../../blog/salesforce-winter-27-what-changes-for-your-pipeline/), can change API versions, metadata behavior or security settings that a pipeline depends on. On top of that, a new version of the Salesforce CLI comes out every week, so I pin the tool versions in the pipeline and test updates before they reach the release path.
```

## One release process for all partners

A shared release process is the foundation for steering several implementation partners. Every partner delivers through pull requests into the same repository, every delivery runs through the same checks, and the approval sits with the client. If every partner deploys in its own way instead, no governance framework holds. I describe the rules for standards, ownership and reviews across several partners under [partner governance](../partner-governance/).
