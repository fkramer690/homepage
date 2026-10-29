---
title: "Communicating Salesforce releases to the business"
description: "How business users learn before every Salesforce release what changes for them: a rollout plan per release, release notes in plain words and a way back."
pubDate: 2026-10-29
lang: en
slug: salesforce-release-communication-business
translationKey: change-release-communication
topic: release
categories: [devops, architecture]
contactBrief: change
tags: [release management, change management, release notes, business users]
takeaways:
  - "Smaller, more frequent releases lower the technical risk, but they need a fixed path through which business users learn beforehand what changes."
  - "Before every release the release plan states which teams are affected, what changes in their workflows and who informs them, before development is finished."
  - "Release notes for the business describe what changes in daily work, not which fields and flows were deployed."
  - "Communication needs a way back: whatever does not fit in daily work lands in the backlog instead of an email."
faq:
  - q: "How do you inform business users about a Salesforce release?"
    a: "With a rollout plan per release that names affected groups, changes and owners, with release notes in plain words, and through key users who pass the change on in their team."
  - q: "When should the business hear about a release?"
    a: "At the latest before the acceptance test, for larger changes already during planning. Whoever first sees a change in production looks for a way around it."
  - q: "What belongs in release notes for the business?"
    a: "What changes for which group, why, from when, what stays the same and whom to ask. Technical details belong in the release notes for IT."
  - q: "Do Salesforce's own releases affect the business too?"
    a: "Yes. Salesforce publishes three releases a year that can change interfaces and features. Whatever affects your own users belongs in the same communication."
draft: false
---

Business users should learn before every Salesforce release what changes for them, not afterwards. That takes three things: a rollout plan per release that defines which teams are affected, what changes in their workflows and who informs them; release notes in plain words instead of a list of deployed components; and a way back through which users report what does not fit in daily work. With smaller, more frequent releases this matters more, because changes come more often. The plan is in place before development is finished.

## Why is a good release not enough?

With a clean release process, releases get smaller and more frequent. That lowers the risk of each release. For the business, though, it also means: small changes more often instead of one big package per quarter. Whoever does not know that something has changed takes the change for a defect, calls support or builds a workaround.

In the [ADKAR model](../change-management-salesforce-rollout/) the first stage, awareness, is missing in this case. The user does not know that and why something changes. No training can make up for that if it only happens after the release.

```praxis
Before every release I clarify with the responsible people in the business which teams are affected, what changes in their workflows and who informs them. That is in the release plan before development is finished. After the release I check whether the new processes are used and bring feedback from daily work into the backlog.
```

## What is in the rollout plan per release?

The rollout plan is a table with one row per affected group. It is created when the scope of the release is fixed and is maintained together with the release plan:

| Group | What changes | Who informs | When |
|---|---|---|---|
| Inside sales Germany | new required field delivery date on the quote | team lead, key user | two weeks before |
| Field service | new form for the maintenance report in the app | contact in the region | before the next app update |
| Sales all countries | no visible change | nobody | not needed |

The last row is not a joke. If a release does not affect a group, that group should not get an email either. Whoever gets release emails every week that do not concern them will not read the one that does.

## What do release notes for the business look like?

Technical release notes list user stories, fields and flows. For the business they are useless. Release notes for users answer five questions:

- **What changes for me?** Split by group, with a screenshot when the interface changes.
- **Why?** One sentence, for example: the delivery date becomes required because demand planning needs it.
- **From when?** Date of the release.
- **What stays the same?** That removes a lot of uncertainty.
- **Whom do I ask?** The team's key user, by name.

More than half a page per group is too much. At manufacturers with subsidiaries in several countries the release notes come in the local language. Key users pass them on in the team and answer the first questions, see [key users in Salesforce rollouts](../salesforce-key-user-network/).

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

For hints directly inside Salesforce the platform offers In-App Guidance: short prompts on a page that explain new fields or workflows. They do not replace release notes, but they help in the first week when a user sees the change for the first time.

## How does the way back work?

One-way communication is not enough. Otherwise problems from daily work end up in emails to individual people, and after a month nobody knows how often the same question came up. That is why I set up a fixed way back:

- **One place for feedback**, such as a simple form or a category in the ticket system that key users and users know.
- **A distinction between defect and request.** Defects go to support, requests go into the backlog, where the product owner assesses them.
- **A visible answer.** Whoever reports something learns what happens with it, even if the answer is no.

The way back is the part that builds trust. A business that sees its feedback implemented in the next release also reads the next release notes.

## What if a change is contested?

Some changes do not please everyone, such as a new required field that creates work for inside sales and helps demand planning. Such changes should not become known for the first time through the release notes. This is where the sponsor steps in: they explain beforehand why the change is coming and decide when two departments cannot agree. In the rollout plan I mark these rows so they are discussed before the acceptance test.

## What about Salesforce's own releases?

Salesforce publishes three releases a year: Spring, Summer and Winter. They can change interfaces, introduce features or switch old ones off. Most changes affect admins and developers, some affect users too. I described what mattered for the pipeline in [Winter '27](../salesforce-winter-27-what-changes-for-your-pipeline/). For the business the same path applies: whatever your own users see goes into the rollout plan of your next own release.

## Where do you start?

For your next release, create a rollout plan with one row per affected group before development is finished. Write the release notes for users separately from the technical ones and have a key user read them: if they understand them without explanation, they work. After the release, ask the key users which questions came up and add the answers to the next release notes.

A release has only landed once the people affected know what changes. If your business learns about changes too late, [send me a message](#contact) or read more about [DevOps and release management](../../services/devops-release-management/).
