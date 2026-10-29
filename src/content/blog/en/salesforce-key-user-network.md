---
title: "Key users in Salesforce rollouts: what they do"
description: "What key users have to do in a Salesforce rollout, how to choose the right ones and how much time the business should free up for them."
pubDate: 2026-10-29
lang: en
slug: salesforce-key-user-network
translationKey: change-key-users
topic: governance
categories: [change-management, architecture]
contactBrief: change
tags: [key users, change management, Salesforce rollout, rollout]
takeaways:
  - "Key users are business users who know the new system early, answer the first questions in their own team and carry feedback from daily work back into the project."
  - "In the ADKAR model they mainly cover knowledge and ability: they show how it works on a real case and are there when daily work gets stuck."
  - "The right key users are the people colleagues already ask for advice, not the ones who happen to have time."
  - "A key user without freed-up time is a title. The time belongs in the business's planning before the project starts."
faq:
  - q: "What is a key user?"
    a: "A key user is a business user who gets to know the new system before everyone else, takes part in testing and is the first point of contact for questions in their team after go-live."
  - q: "How many key users does a Salesforce rollout need?"
    a: "At least one per team, site or country who knows daily work there. In large sales or service organisations two are better, so holidays and sick leave do not leave a gap."
  - q: "How much time do key users need?"
    a: "Clearly more before and shortly after go-live than in operations. How much exactly depends on the scope; what matters is that the time is agreed with their manager in advance."
  - q: "What is the difference between a key user and an admin?"
    a: "The admin configures the system. The key user knows the business process, helps colleagues use it and reports what does not fit in daily work."
draft: false
---

Key users are business users who know the new Salesforce system before everyone else, take part in testing and are the first point of contact for questions in their team after go-live. They also carry feedback from daily work back into the project. Without them every question lands with the project team or support, and many questions are never asked but worked around with an Excel list. Good key users are chosen by standing in the team, not by spare time, and the time they need belongs in the business's planning beforehand.

## Why does a rollout need key users?

In the [ADKAR model](../change-management-salesforce-rollout/) key users mainly cover two stages: knowledge and ability. Training conveys knowledge, but only daily work shows whether someone can really use the feature in a customer meeting or on the phone. In that moment no hotline helps, but the colleague at the next desk who has done it before.

Manufacturers have an extra layer: sales, inside sales and service work a little differently in every country and at every site. The project team does not know these differences. Key users do, and they can say early where the planned process will not work in their own team.

```praxis
In the worldwide Manufacturing Cloud rollout, every country had key users who knew the template and answered the first questions in their country. In Field Service rollouts it helps when dispatchers of the next wave watch in the region that is already live beforehand. They learn more there than in any training, because they see real cases from their own daily work.
```

## What does a key user actually do?

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

In the acceptance test key users are the best testers, because they know which cases really occur in their team. How UAT should be set up is in [Salesforce UAT: who tests before the release?](../salesforce-uat-business-acceptance-testing/).

## How do you choose the right key users?

The most common choice is the worst: whoever has time becomes a key user. They are rarely the people the team turns to with questions anyway. I look at other criteria:

- **Standing in the team.** Colleagues already ask this person for advice today, whatever the system.
- **Knowledge of the process.** They know how a quote, an order or a service visit really works in their team, including the exceptions.
- **Curiosity rather than enthusiasm.** A key user does not have to love Salesforce. Critical key users find the weaknesses earlier, and once they are convinced, they convince others.
- **Staying for a while.** Whoever changes jobs in three months takes the knowledge with them.

In large organisations one key user per team, site or country pays off, two in critical areas. If the only key user of a country is out sick in the week after go-live, the support for the whole country is out.

## What is a key user not?

A key user replaces neither support nor the admin. They answer questions about usage, but they do not change configuration and do not fix interface errors. Defects keep going through the ticket system so they get counted and prioritised. A key user is not a trainer who runs whole training programmes either. They show on a real case how it works. If you do not draw these lines, the role is overloaded within a few weeks and the key user stops answering questions.

## How much time does the business need to free up?

A key user without freed-up time is a title. Before and shortly after go-live the role needs clearly more time than in operations, because workshops, testing and the first weeks with many questions fall together. How much exactly depends on the scope of the rollout. As an assumption for planning: four workshops of four hours each, one week of acceptance testing at half the time and two weeks after go-live at a third add up to almost eight working days. Preparation and short sessions with colleagues come on top. In operations the effort drops to a few hours a month, mostly around releases.

The manager has to commit this time before the project starts, and someone has to take over the key user's work during that time. Otherwise the key user tests on the side, and the first questions after go-live stay unanswered because daily business comes first.

```hinweis tipp
Agree the key users' time in writing with their manager, with weeks and hours, and define who takes over their work in that time. This agreement is part of the sponsor plan.
```

## How do you keep the network together?

A network of key users needs a fixed slot. I recommend a short exchange where key users bring in their most important feedback and learn in advance what the next release changes. That turns every key user into a channel in both directions: changes reach the team through them, and problems from the team reach the project through them. What this path looks like before a release is in [communicating Salesforce releases to the business](../salesforce-release-communication-business/).

It also matters that the role is visibly recognised. Whoever takes on extra work for the project should find it in their annual review. That costs nothing and decides whether anyone volunteers for the next project.

## Where do you start?

Ask every affected team: whom do you ask today when you get stuck in the system? The names that come up several times are your candidates. Then agree the time with the managers and bring the key users into the first workshops, before anything is built.

Key users are the cheapest way to bring knowledge from the project into daily work and feedback from daily work into the project. If you are planning a rollout, [send me a message](#contact) or read more about [change management for Salesforce programmes](../../services/change-management-salesforce/).
