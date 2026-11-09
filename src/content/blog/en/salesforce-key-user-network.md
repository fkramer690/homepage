---
title: "Key users in Salesforce rollouts: what they do"
metaTitle: "Salesforce key users: tasks, selection and time needed"
description: "Salesforce key users: tasks per project phase, how to choose them, and about eight working days as a planning figure for workshops, UAT and go-live."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-key-user-network
translationKey: change-key-users
topic: governance
categories: [change-management, architecture]
coAuthor: juliane
contactBrief: change
tags: [key users, change management, Salesforce rollout, rollout]
takeaways:
  - "Key users are business users who know the new system early, answer first questions in their team and carry feedback from daily work back to the project."
  - "In the ADKAR model they mainly strengthen knowledge and ability: they show how it works on a real case and are there when daily work gets stuck."
  - "The right key users are the people colleagues already ask for advice, not the ones who happen to have time."
  - "A key user without freed-up time is a title. The time belongs in the business's planning before the project starts."
faq:
  - q: "What is a key user?"
    a: "A key user is a business user who gets to know the new system before everyone else, takes part in testing and is the first point of contact for questions in their team after go-live."
  - q: "How many key users does a Salesforce rollout need?"
    a: "Enough to cover every important process, user group, site and language. One key user per country is only enough where the country runs a largely uniform process. In critical areas two are better, so holidays and sick leave do not leave a gap."
  - q: "How much time do key users need?"
    a: "As a first planning assumption, about eight working days per key user for workshops, UAT and the first two weeks after go-live, then a few hours a month in operations. That is a figure from experience, not a benchmark: scope, waves and training needs change it. What matters is that the time is agreed with their manager in advance."
  - q: "What is the difference between a key user and an admin?"
    a: "The admin runs and configures the platform, with users, permissions, data and releases. The key user represents the business process, tests real cases, helps colleagues use the system and reports what does not fit in daily work. Where exactly the support boundary lies is up to the company."
draft: false
---

Key users are business users who know the new Salesforce system before everyone else, take part in testing and are the first point of contact for questions in their team after go-live. They also carry feedback back into the project. Without them every question lands with the project team or support, and many questions are never asked but worked around with an Excel list. Good key users are chosen by standing in the team, not by spare time. As a planning figure for workshops, UAT and the first weeks after go-live I count on about eight working days per key user, and that belongs in the business's planning beforehand.

## Key users mainly strengthen knowledge and ability

In the [ADKAR model](../change-management-salesforce-rollout/) key users mainly contribute to two stages: knowledge and ability. Depending on who is chosen, they also build desire and keep the new way of working stable after go-live, but they replace neither the sponsor nor line management. Training conveys knowledge, but only daily work shows whether someone can use the feature in a customer meeting or on the phone. In that moment no hotline helps, but the colleague at the next desk who has done it before.

Manufacturers have an extra layer: sales, inside sales and service work a little differently in every country and at every site. The project team does not know these differences. Key users do, and they can say early where the planned process will not work in their own team.

```praxis
In the worldwide Manufacturing Cloud rollout, every country had key users who knew the template and answered the first questions in their country. In Field Service rollouts it helps when dispatchers of the next wave watch in the region that is already live beforehand. They learn more there than in any training, because they see real cases from their own daily work.
```

## The tasks change with the project phase

The tasks change with the phase of the project:

```schritte
Before the build | workshops · key users with product owner
  Describe how their team works, name special cases, help write acceptance criteria for user stories.
Before go-live | testing · key users
  Run through their own cases in the acceptance test and show colleagues in short sessions on real cases what changes.
First weeks | daily work · key users on site
  First point of contact for questions, collect problems and report them to the project in bundles.
Operations | ongoing · key users and admin
  Onboard new colleagues, learn before every release what is coming and pass it on to the team.
```

Key users belong in the acceptance test, because they know which cases and exceptions occur in their team. They run predefined end-to-end scenarios with realistic data; the formal sign-off stays with the named business owners. How UAT should be set up is in [Salesforce UAT: who tests before the release?](../salesforce-uat-business-acceptance-testing/).

## How do you choose the right key users?

The most common choice is the worst: whoever has time becomes a key user. They are rarely the people the team turns to with questions anyway. I look at other criteria:

- **Standing in the team.** Colleagues already ask this person for advice today, whatever the system.
- **Knowledge of the process.** They know how a quote, an order or a service visit really works in their team, including the exceptions.
- **Curiosity rather than enthusiasm.** A key user does not have to love Salesforce. Critical key users find the weaknesses earlier, and once they are convinced, they convince others.
- **Staying for a while.** Whoever changes jobs in three months takes the knowledge with them.

Do not size the network by country alone, but so that every important combination of process, role, site or language and rollout wave is covered, with a deputy in critical areas. If the only key user of a country is out sick in the week after go-live, the support for the whole country is out.

## What is a key user not?

A key user replaces neither support nor the admin. The key user represents the business view of their area; the admin runs the platform with users, permissions, configuration and releases. The key user answers questions about usage, but does not change configuration and does not fix interface errors. Defects keep going through the ticket system so they get counted and prioritized. A key user should not be solely responsible for planning and running the whole training program either. Short walkthroughs and office hours on real cases fit the role well; whole training programs do not. If you do not draw these lines, the role is overloaded within a few weeks and the key user stops answering questions.

## How much time does the business need to free up?

A key user without freed-up time is a title. Before and shortly after go-live the role needs clearly more time than in operations, because workshops, testing and the first weeks with many questions fall together. How much exactly depends on the scope of the rollout. As an assumption for planning: four workshops of four hours each, one week of acceptance testing at half the time and two weeks after go-live at a third add up to almost eight working days. Preparation and short sessions with colleagues come on top. In operations the effort drops to a few hours a month, mostly around releases.

The manager has to commit this time before the project starts, and someone has to take over the key user's work during that time. Otherwise the key user tests on the side, and the first questions after go-live stay unanswered because daily business comes first.

```hinweis tipp
Agree the key users' time in writing with their manager, with weeks and hours, and define who takes over their work in that time. This agreement is part of the sponsor plan.
```

## The network needs a fixed slot

A network of key users needs a fixed slot. I recommend a short exchange where key users bring in their most important feedback and learn in advance what the next release changes. That turns every key user into a channel in both directions: changes reach the team through them, and problems from the team reach the project through them. What this path looks like before a release is in [communicating Salesforce releases to the business](../salesforce-release-communication-business/).

It also matters that the role is visibly recognized. Whoever takes on extra work for the project should find it in their annual review and in adjusted daily targets. That decides whether anyone volunteers for the next project.

## Ask whom the team turns to today

Ask every affected team: whom do you ask today when you get stuck in the system? The names that come up several times are your candidates. Then agree the time with the managers and bring the key users into the first workshops, before anything is built. If no name comes up in a team, nobody there carries the topic yet, and that team needs more support during training. How we build the network in programs is described under [change management for Salesforce programs](../../services/change-management-salesforce/).
