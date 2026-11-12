---
title: "Communicating Salesforce releases to the business"
description: "How business users learn before every Salesforce release what changes for them: a rollout plan per release, release notes in plain words, a feedback loop."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-release-communication-business
translationKey: change-release-communication
topic: release
categories: [change-management, devops, architecture]
coAuthor: juliane
contactBrief: change
tags: [release management, change management, release notes, business users]
takeaways:
  - "Smaller, more frequent releases can lower the risk per release, but they need a fixed process that tells business users in advance what will change."
  - "Before development is finished, the plan states which teams are affected, what will change for them and who will inform them."
  - "Release notes for the business describe what changes in daily work, not which fields and flows were deployed."
  - "Communication needs a feedback loop: whatever does not fit in daily work goes through triage into the backlog, not into an email."
faq:
  - q: "How do you inform business users about a Salesforce release?"
    a: "With a rollout plan for each release that names affected groups, changes and owners, with release notes in plain language, and through key users who pass information about the change on to their teams."
  - q: "When should the business hear about a release?"
    a: "The business should hear about a release before the acceptance test at the latest, and about larger changes already during planning. Users who first encounter a change in production look for a way around it."
  - q: "What belongs in release notes for the business?"
    a: "What changes for which group, why, when the change takes effect, what users need to do, what stays the same and whom to ask. Technical details belong in the release notes for IT."
  - q: "Do Salesforce's own releases affect the business too?"
    a: "Yes. Salesforce publishes three major seasonal releases a year, and some products update monthly. They can change interfaces and features. Anything that affects your users belongs in the same communication and should be timed to the date Salesforce activates it."
draft: false
---

Business users should learn before every Salesforce release what changes for them, not afterwards. That takes a rollout plan per release that defines which teams are affected, what changes in their workflows and who informs them; release notes in plain words instead of a list of deployed components; and a feedback loop through which users report what does not fit in daily work. With smaller, more frequent releases this matters more, because changes occur more often. The plan is in place before development is finished.

## Smaller releases need more communication

With a well structured release process, releases usually become smaller and more frequent. With automated tests and controlled dependencies, that can lower the risk of each release. For the business, though, it also means receiving small changes more often instead of one large package per quarter. Users who do not know that something has changed may assume it is a defect, call support or build a workaround.

In the [ADKAR model](/en/blog/change-management-salesforce-rollout/) the first stage, awareness, is missing in this case. The user does not know that something is changing or why. Training cannot make up for missing awareness if users receive it only after the release.

```praxis
Before every release, I clarify with the responsible business stakeholders which teams are affected, what will change in their workflows and who will inform them. That is in the release plan before development is finished. After the release, I check whether the new processes are being used and feed feedback from daily work into the backlog.
```

## What is in the rollout plan per release?

The rollout plan is a table with one row per affected group. It is created when the scope of the release is fixed and is maintained together with the release plan:

| Group | What changes | Who informs | When |
|---|---|---|---|
| Inside sales Germany | new required field delivery date on the quote | team lead, key user | two weeks before |
| Field service | new form for the maintenance report in the app | contact in the region | before the next app update |
| Sales all countries | no visible change | nobody | not needed |

The last row is not a joke. If a release does not affect a group, that group should not receive an email either. Whoever receives release emails every week that do not concern them will not read the one that does.

## Release notes for the business describe daily work

Technical release notes list user stories, components, dependencies and deployment steps. On their own, they are not effective user communication. Release notes for users answer six questions:

- **What changes for me?** Split by group, with a screenshot when the interface changes.
- **Why?** One sentence, for example: the delivery date becomes required because demand planning needs it. Make a field required only once it is clear that users have the value available at that point in the process.
- **From when?** Date of the release.
- **What do I need to do?** For example, fill in a new field, update the app or attend a short training.
- **What stays the same?** That removes a lot of uncertainty.
- **Whom do I ask?** The team's key user, by name.

More than half a page per group is too much. At manufacturers with subsidiaries in several countries the release notes are issued in the local language. Key users share them with their teams and answer the first questions, see [key users in Salesforce rollouts](/en/blog/salesforce-key-user-network/).

## Who learns what, and when?

A fixed sequence per release helps, because the business learns when to expect information:

```schritte
Planning | when the scope is fixed · product owner with business
  Create the rollout plan per group, inform the sponsor if a change is contested.
Before the acceptance test | about two weeks before · key users
  Key users see the change, test it in the acceptance test and prepare their team's questions.
Shortly before the release | a few days before · team lead, key users
  Release notes for users go to the affected groups, in the local language.
After the release | first week · key users, project team
  Collect questions, check usage, take feedback into the backlog.
```

For guidance directly inside Salesforce, the platform offers In-App Guidance. Its scope and limits depend on edition and licenses. It provides short prompts on a page that explain new fields or workflows. They do not replace release notes, but they help in the first week when a user sees the change for the first time.

## The feedback loop leads into the backlog

One-way communication is not enough. Otherwise, problems from daily work are sent by email to individual people, and after a month nobody knows how often the same question was raised. That is why I set up a fixed feedback loop:

- **One place for feedback**, such as a simple form or a category in the ticket system that key users and users know.
- **A short triage.** Defects go to support, questions and training needs go to the key users, and genuine change requests go into the backlog, where the product owner assesses them.
- **A visible answer.** People who submit feedback are told what will happen to it, even if the answer is no.

The feedback loop is the part that builds trust. A business that sees its feedback implemented in the next release also reads the next release notes.

## What if a change is contested?

Some changes are unpopular, such as a new required field that creates work for inside sales and helps demand planning. Users should not learn about such changes for the first time from the release notes. This is where the sponsor steps in: they explain beforehand why the change is needed and decide when the process owners of two departments cannot agree. In the rollout plan I mark these rows so they are discussed before the acceptance test.

## What about Salesforce's own releases?

Salesforce publishes three major seasonal releases a year, Spring, Summer and Winter, and some products and features are also updated monthly. They can change interfaces, introduce features or switch off old ones. Most changes affect admins and developers, some affect users too. I described what mattered for the pipeline in [Winter '27](/en/blog/salesforce-winter-27-what-changes-for-your-pipeline/). For the business, the same communication process applies, but the timing follows Salesforce: these changes are deployed to production on Salesforce's date, and some are activated automatically or enforced later as release updates. I check the release notes and release updates, test in the preview sandbox and inform the affected users before the change becomes active, in the rollout plan of the release that is scheduled first.

## First step: a rollout plan for your next release

For your next release, create a rollout plan with one row per affected group before development is finished. Write the release notes for users separately from the technical ones and have a key user read them: if they understand them without explanation, the notes are fit for purpose. After the release, ask the key users which questions were raised and add the answers to the next release notes. Repeat this in the same order for every release, so the business knows when to expect information. I describe how I set up releases in programs in [DevOps and release management](/en/services/devops-release-management/).
