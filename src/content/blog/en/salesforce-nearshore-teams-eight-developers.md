---
title: "Salesforce Nearshore Teams: Why Eight Developers?"
description: "Why I cap Salesforce nearshore teams at about eight developers, what happens when teams grow larger, and how several small teams work together on one org."
pubDate: 2026-10-27
lang: en
slug: salesforce-nearshore-teams-eight-developers
translationKey: nearshore-team-size
topic: governance
categories: [architecture]
contactBrief: nearshore
tags: [nearshore, team size, programme management, partner governance, scrum]
takeaways:
  - "I cap Salesforce nearshore teams at about eight developers. With a product owner and a scrum master, the team stays at ten people, the upper limit in the Scrum Guide."
  - "With every extra person, the number of communication paths grows faster than capacity: eight people have 28 paths between them, twelve have 66 and sixteen have 120."
  - "If a programme needs more capacity, I set up several teams with clear responsibilities instead of one large team, for example through an object ownership matrix."
  - "Rotation, turnover and overly senior teams slow nearshore teams down more often than missing skills. A minimum stay of about six months belongs in the agreement before the first sprint."
faq:
  - q: "How large should a Salesforce nearshore team be?"
    a: "Up to about eight developers per team. With a product owner and a scrum master that makes ten people, the upper limit the Scrum Guide names. Beyond that, coordination takes over and sprint meetings get long."
  - q: "What if the programme needs more than eight developers?"
    a: "Set up several teams, each with a clear area of responsibility, such as a stream with its own objects. All teams work with the same standards, reviews and pipeline, and plan releases together."
  - q: "Why are very experienced teams not automatically better?"
    a: "In a team made up only of experienced developers, many want to design and few want to build. That causes friction and slows the team down. A mix of a few seniors who carry architecture and reviews and developers who like to build delivers more steadily."
  - q: "Does this apply to Eastern Europe and India alike?"
    a: "In my experience, yes. I have worked with nearshore teams in both regions, and the success factors and problems were the same: team size, turnover, culture and backing from management."
draft: false
---

I cap Salesforce nearshore teams at about eight developers. With a product owner and a scrum master that makes ten people, which is also the upper limit the Scrum Guide names. Beyond that, coordination grows faster than capacity, sprint meetings get long, and the team delivers less per person. If a programme needs more developers, I set up several small teams with clear responsibilities. Team size is only one of several levers, but it is the one that is easiest to get wrong.

## Why eight developers at most?

The [Scrum Guide](https://scrumguides.org/scrum-guide.html) describes a Scrum Team as typically ten or fewer people. Small enough to remain nimble, large enough to complete significant work within a sprint. It also notes that smaller teams tend to communicate better and be more productive. Take away the product owner and the scrum master, and you are left with about eight developers.

The arithmetic behind it is simple. A team of n people has n times (n minus 1) divided by two possible communication paths between any two people:

| People in the team | Communication paths |
|---|---|
| 5 | 10 |
| 8 | 28 |
| 12 | 66 |
| 16 | 120 |

Going from eight to sixteen people doubles capacity, while the number of paths more than quadruples. Not every path is used every day. In a Salesforce team working on the same org, many of them are, though: whoever works on a flow on Account needs to know who is changing the validation rules or the layout of the same object.

With nearshore teams, part of the coordination also runs across time zones, languages and company boundaries. Every question to the business on the client side takes longer than it would in your own office. A small team asks fewer of these questions, because more knowledge sits with fewer people.

## What happens when a team grows larger?

A team with twelve or fifteen developers rarely works the way it was planned on paper. Three patterns are typical:

- **Sprint meetings get long.** A daily with fifteen people no longer takes fifteen minutes, and most people just listen to the others' topics. Planning and review fill half days.
- **Coordination moves into small groups.** Inside the large team, informal subgroups form and make their own agreements. You end up with small teams anyway, only without clear responsibility.
- **Conflicts in the org increase.** More developers changing the same objects at the same time means more merge conflicts, more overwritten metadata and more bugs that cannot be traced to any team.

There is also a commercial effect. A nearshore partner is paid per head. If extra developers mostly create extra coordination, the team's daily cost goes up, but delivery does not.

## How do I spread more capacity across several teams?

If a programme needs more than eight developers, I set up several teams, each with a clear area of responsibility. The Scrum Guide recommends the same: a team that grows too large should reorganise into several cohesive teams working on the same product.

![Several small teams on a shared foundation: each team has up to about eight developers and clear responsibilities. From day one, every team works with the same standards, pull request reviews and pipeline as everyone else. Rules on staffing and rotation are agreed before the first sprint, and a programme plan with streams and dependencies plus a release process hold the teams together.](../../../assets/blog/nearshore-team-setup-en.png)

To keep several teams from turning back into one large team, they need four shared foundations:

1. **Clear responsibility per team.** Ideally through streams with their own processes and objects. An [object ownership matrix](../salesforce-object-ownership-matrix/) sets who owns which object. In my largest programme, with more than 30 developers in eight streams and five partners, it was one of the two elements that made the biggest difference.
2. **The same standards for everyone.** Naming conventions, one automation per object and context, rules for test coverage. New teams learn them fastest in [pull request reviews](../why-pull-request-reviews-are-a-must-in-enterprise-projects/).
3. **One pipeline and one release process.** All teams deliver to production the same way, and releases are planned across teams. Repository and pipeline belong to the client, as described in [why clients should own their DevOps tools](../why-clients-should-own-their-devops-tools/).
4. **A programme plan with dependencies.** What team A must deliver by when so that team B can continue is written in the plan, not just in people's heads.

The teams do not have to be the same size. A stream with many interfaces may need six developers, a small stream three. What matters is that none grows beyond eight and that each one knows what it is responsible for.

In practice the limit is rarely a problem when teams are cut along streams. A stream is rarely so large that more than eight people work on, say, Sales Cloud. When a team grows bigger, the tasks are usually far enough apart that two teams make more sense. I often see the opposite: sales and service end up in one pot because both work on Account and Contact. That only makes limited sense, because their processes, business owners and releases differ a lot.

```praxis
My largest programme included nearshore teams as well. Mostly they carried individual streams completely, from backlog to release. That works well, because the team then has a clear area and does not work for several streams at once.
```

## What slows nearshore teams down besides size?

When a nearshore team delivers less than expected, skills are often blamed first. I have worked with nearshore teams in Eastern Europe and India, and in both regions the reasons were usually elsewhere:

- **Rotating resources.** If developers are moved to other projects every few months, knowledge of the org leaves with them. Every new person needs weeks to become productive.
- **High turnover.** The effect is the same, and it also unsettles the rest of the team.
- **Overly senior teams.** A team made up only of experienced developers sounds like a safe choice. In practice, too many want to design and too few want to build. A mix of a few seniors who carry architecture and reviews and developers who like to build works better.
- **No backing from management.** A nearshore team needs decisions, access and attention from the client. Without them it waits, and the client pays for the waiting.

Culture counts as much as skills: shared values, trust and the will to deliver, on both sides. A small, stable team builds that faster than a large one that keeps changing its members.

## Which rules belong before the first sprint?

Most of these problems can be limited contractually and organisationally if you raise them before the start. The client and the nearshore partner should therefore agree rules on:

- **Team size and roles**, meaning how many developers, which seniority and who does reviews.
- **Staffing and rotation.** How long does a person stay in the team at least, and how much notice is there before a change? Depending on the size of the programme, I consider a minimum of six months sensible.
- **Handover on changes.** Who onboards a new person, and how long do the old and new person overlap?
- **Communication.** Which meetings are shared, who on the client side is available for questions, and how quickly are they answered?

These rules protect both sides from the moment when, after six months, half the team has changed and nobody remembers why an automation was built the way it was.

## Where should you start?

If you already have a nearshore team, answer three questions:

1. **How many developers does each team have?** If one is well above eight, check along which streams or objects it can be split.
2. **How many people left the team in the last six months?** If the number is high, rotation is probably a bigger problem than size.
3. **Who owns which objects?** If that is not written down anywhere, start with an object ownership matrix before splitting teams.

If you are planning a new setup, define team size, roles and rotation rules before you compare quotes. Then you compare partners on the same basis, not just on the daily rate. How I plan and steer programmes with nearshore teams is described under [programme management and nearshore teams](../../services/program-management-nearshore/).

Eight developers per team is not a rigid number, but it is a good upper limit that saves a lot of coordination. If you are setting up a nearshore team or want to get an existing one back on track, [send me a message](#contact).
