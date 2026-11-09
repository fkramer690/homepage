---
title: "What I learned from the free sfdx-hardis training"
description: "I completed all three levels of the free sfdx-hardis DevOps training. What it covers, how long it takes, who it is for and my five takeaways."
pubDate: 2026-10-23
updatedDate: 2026-11-09
lang: en
slug: sfdx-hardis-free-devops-training
translationKey: sfdx-hardis-training
topic: training
categories: [devops]
tags: [sfdx-hardis, devops training, release management, dora metrics]
takeaways:
  - "27 labs in three levels build an end-to-end reference pipeline for Salesforce on free orgs, without a paid subscription."
  - "Badges are earned by doing, not by quizzes: a job re-runs the checks of a level, and those below it, against your public repository."
  - "Even with about two years of sfdx-hardis experience and solid Git knowledge, all three badges took me almost a full day."
  - "For my way of working it is the most useful Salesforce DevOps course I have taken, ahead of courses from Gearset, Flosum and Copado."
  - "Level 3 is the most valuable part for anyone who runs releases: pull request reviews, UAT, production, DORA metrics, hotfixes and monitoring."
faq:
  - q: "Is the sfdx-hardis training really free?"
    a: "Yes. The training is free and publicly available. You need a free GitHub account and free Salesforce Developer Edition orgs, plus free tools such as Node.js, Salesforce CLI and GitHub CLI. No paid subscription or credit card is required."
  - q: "How long does the sfdx-hardis training take?"
    a: "The course lists about 2 h 15 for Level 1, about 4 h for Level 2 and about 6 h 55 for Level 3. That adds up to about 13 hours. With prior experience I needed almost a day for all three."
  - q: "Who is the sfdx-hardis training for?"
    a: "Levels 1 and 2 are for contributors who build and deliver user stories, including admins and consultants. Level 3 is for release managers who run the pipeline up to production."
  - q: "Is the sfdx-hardis badge a certification?"
    a: "No. Cloudity describes it as a badge, not a certification. It is stronger evidence of hands-on work than a quiz, because an automated job checks your own repository."
---

The free DevOps training for [sfdx-hardis](../sfdx-hardis-open-source-salesforce-devops/) is the most useful Salesforce DevOps course I have taken. In 27 hands-on labs across three levels, you build an end-to-end reference pipeline on free Salesforce orgs, from your first user story to production releases, hotfixes and monitoring. Badges are only awarded when an automated job has verified your work in your own repository. I completed all three levels in October 2026, and even with almost two years of sfdx-hardis experience it took me nearly a full day.

## Why did I take the training?

Honestly, LinkedIn made me do it. Every day more sfdx-hardis badges appeared in my feed, and every day it bothered me a little more that I didn't have them. So I made the time.

I did not start from zero. I use sfdx-hardis in client projects, have worked with it for almost two years and know Git well. I have also completed DevOps courses from Gearset, Flosum and Copado. That gave me a good comparison, and my criteria were simple: the share of hands-on work, exercises that are checked automatically, end-to-end coverage and cost. On those, this course comes out on top for me.

If you don't know the tool yet, start with my [introduction to sfdx-hardis](../sfdx-hardis-open-source-salesforce-devops/). It explains what the toolkit does and how it compares to commercial platforms.

## What does the sfdx-hardis training cover?

The [training](https://sfdx-hardis.cloudity.com/salesforce-devops-training/) is built by Cloudity and runs entirely on free resources: a GitHub account, VS Code, Node.js, Salesforce CLI, GitHub CLI and free Salesforce Developer Edition orgs (a second one for Level 3). If you can't install software on your machine, it also runs in Salesforce's Agentforce Vibes IDE, formerly Code Builder. Every lab comes with screenshots of the real screens. The course has three consecutive levels:

```schritte
Level 1, Contributor Basics | 7 labs · about 2 h 15
  Installing VS Code, Git and sfdx-hardis, setting up a Dev Hub, scratch orgs and the pipeline, working on a branch, building a custom field, publishing the change, passing the deployment check and merging.
Level 2, Contributor Advanced | 9 labs · about 4 h
  Fixing a missing dependency, deployment actions for data fixes and reference data, the code quality gate and Apex test coverage, permission sets and profiles, resolving a merge conflict and recovering from committing the wrong metadata.
Level 3, Release Manager | 11 labs · about 6 h 55
  Configuring the pipeline, reviewing pull requests, reading deployment logs, merging colliding pull requests, promoting to UAT with release notes, releasing to production with DORA metrics, hotfixes and retrofits, production monitoring, generated documentation and promotion branches.
```

```level
title: sfdx-hardis DevOps training · three levels
Contributor Basics | 7 labs · about 2 h 15
  Setup: VS Code, Git, sfdx-hardis
  First user story on a branch
  Deployment check and merge
Contributor Advanced | 9 labs · about 4 h
  Missing dependencies
  Deployment actions, quality gate
  Merge conflicts and recovery
Release Manager | 11 labs · about 6 h 55
  Review pull requests
  UAT, production, DORA metrics
  Hotfixes, monitoring, docs
done: Badge earned
note: Each badge is verified by a job that re-runs every check against your own repository.
```

## Badges are earned only for verified work

This is what sets the course apart. There is no multiple-choice quiz. At the end of each level, a job clones your public repository and runs the checks of that level, and of the levels below it, against it again. Only when everything passes do you receive the badge, which you can share on LinkedIn. Cloudity is explicit that it is a badge, not a certification. For me that is the more honest model: it is stronger evidence of hands-on work than any quiz.

My [three badges](https://sfdx-hardis-training.cloudity.com/badges/fkramer/) were awarded on 18 and 20 October 2026, with every check passed on all three levels.

## My five takeaways

Even with experience, several things were new or gave me a fresh perspective:

1. **GitHub instead of GitLab and Azure DevOps.** In my projects I had mostly used GitLab and Azure DevOps. Working through the course on GitHub was a nice change. Small detail, big smile: GitHub shows the validation status of a pull request right in the browser tab icon.
2. **Post-deployment steps and SFDMU in the pipeline.** Running deployment actions and data loads with SFDMU, the open-source data migration plugin, through a hardis-backed pipeline shows how much manual release work can disappear from spreadsheets.
3. **Promotion branches.** This is a new beta feature I kept asking Nicolas Vuillamy about, and then took a month to test myself. It felt like being a typical end customer.
4. **The DevOps Pipeline page.** Instead of checking everything directly in the repository, the pipeline view in the VS Code extension shows the state of branches and environments in one place.
5. **DORA metrics.** I looked at DORA metrics in sfdx-hardis for the first time: deployment frequency, lead time for changes, change failure rate and time to restore. These are numbers a steering committee understands.

I won't use every feature in every project. But knowing what is available helps me give better advice and recommend the right approach for each team. For admins in particular, some of these helpers can make everyday release work much easier. And anyone who advises clients on their DevOps tooling should know the options first-hand, not only from slide decks.

## Who should take the training?

I would recommend it to three groups:

- **Admins and consultants** who want to stop fearing Git. Levels 1 and 2 show that branches, pull requests and merge conflicts are manageable with the VS Code extension.
- **Developers and tech leads** who know Git but have not seen a complete Salesforce pipeline, including deployment actions, quality gates and monitoring.
- **Release managers and architects** who own the release process. Level 3 is the part I would make mandatory for anyone in that role, especially in programs with several partners, where [pull request reviews](../why-pull-request-reviews-are-a-must-in-enterprise-projects/) and a clear release rhythm make the difference.

For clients, it is also a license-free way to build internal DevOps knowledge, with a real time investment of about 13 hours per person, which is the basis for owning the release process instead of leaving it with a partner. That is a theme in most of my [architecture and governance work](../../services/partner-governance/).

## My verdict: plan one day with experience, two without

The official times add up to about 13 hours. With experience, plan a full day; without it, plan two. It is time well spent.

```hinweis tipp
Work through each level in one go rather than spread over weeks, because the labs build directly on each other and the links between branch, pull request, pipeline and org become clearest that way.
```

The course is free and hands-on, and the badge means something because it is verified. It does not replace your own enterprise setup: protected branches, approval rights, secrets, data protection and several real partners are not part of a training project. Badges require a public repository, so use only the fictional training project and never client metadata or secrets. Huge credit and thanks to Nicolas Vuillamy and the Cloudity team.
