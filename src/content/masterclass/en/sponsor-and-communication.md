---
title: "Sponsor and communication in a Salesforce rollout"
description: "How a sponsor plan and a rollout plan per release create awareness and desire, with release notes in plain language and the works council involved early."
lang: en
slug: sponsor-and-communication
course: change-management
translationKey: cm-02
chapter: 2
pubDate: 2026-10-29
short: "Sponsor and communication"
summary: "Awareness and desire: what the sponsor visibly does, what a rollout plan per release looks like and when the works council joins."
takeaways:
  - "Training does not create awareness and desire; the group's own leadership does, by explaining why something changes and deciding when departments disagree."
  - "A sponsor plan states what management visibly does and when, so that \"management is behind it\" is more than a line on the first slide."
  - "A rollout plan per release has one row per affected group: what changes, who informs and when. It stands before development is finished."
  - "Release notes for users answer five questions in plain language and come in the local language, at most half a page per group."
  - "In Germany, location data, working times and evaluations of individuals are agreed with the works council before anything is set up."
articles: [change-release-communication, change-management-hub, ai-coding-works-council-gdpr]
faq:
  - q: "What does a sponsor do in a Salesforce rollout?"
    a: "They visibly back the rollout: they explain in their own department why something changes, decide when two departments disagree and ask about usage in the monthly report. Without these three, a new rule stays a recommendation."
  - q: "When should business teams hear about a release?"
    a: "Key users about two weeks before, when they see the change in acceptance testing; the affected groups a few days before, with release notes in plain language. The sponsor explains contested changes before the release notes go out."
  - q: "Does every group need to hear about every release?"
    a: "No. Groups without a visible change get no email. Whoever reads release emails every week that do not concern them will skip the one that does."
draft: false
---

Awareness and desire, the first two stages of the ADKAR model, come from the group's own leadership in a Salesforce rollout and not from the project team. Two tools make that work. A sponsor plan states what management visibly does and when: explain, decide and ask about usage. A rollout plan per release states which group learns what, from whom and when, before development is finished. Add release notes in plain language, a fixed way back for feedback and, in Germany, an early meeting with the works council.

## Why does the sponsor decide the rollout?

In the Prosci study [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf), participants named active and visible sponsorship as the top success factor. In Salesforce programmes that is exactly what is missing most often. A sponsor is a person from management who visibly backs the rollout. They do not just sit on the steering committee; they stand in front of the teams affected.

Three things make a sponsor effective:

```saeulen
dach: An effective sponsor
mic | Explaining | In their own department | In the sales meeting, the head of sales says why forecasts will come from Salesforce. The same message from the project team carries less weight.
steer | Deciding | When departments disagree | When inside sales and sales planning cannot agree on a required field, the decision is theirs and not the sprint's.
analyse | Asking | In the monthly report | They ask about their teams' usage. That way the teams notice that it counts.
basis: Written down in the sponsor plan
```

So I write a sponsor plan: a short list of dates when the sponsor appears, decisions that sit with them and the figures they receive each month. Without this plan, "management is behind it" turns into a line on the first slide.

## What is in the rollout plan per release?

With a clean release process, releases get smaller and more frequent. For business teams that means small changes more often instead of one big package a quarter. Whoever does not know something changed takes the change for a bug. The rollout plan prevents that. It has one row per affected group and is maintained together with the release plan:

| Group | What changes | Who informs | When |
|---|---|---|---|
| Inside sales Germany | new required field delivery date on the quote | team lead, key user | two weeks before |
| Field service | new form for the maintenance report in the app | regional contact | before the next app update |
| Sales, all countries | no visible change | nobody | not needed |

The last row is meant seriously. Whoever gets release emails every week that do not concern them will not read the one that does. How the repository, pipeline and approvals behind this are organised is in the DevOps chapter [Release process: ownership, roles and approvals](../../devops-release-management/release-process-ownership-roles/).

## What do release notes for users look like?

Technical release notes list user stories, fields and flows. For business teams they are useless. Release notes for users answer five questions:

- **What changes for me?** Split by group, with a screenshot when the screen changes.
- **Why?** One sentence, for example: the delivery date becomes required because sales planning needs it.
- **From when?** Release date.
- **What stays the same?** That removes a lot of uncertainty and is almost always forgotten.
- **Whom do I ask?** The team's key user, by name.

More than half a page per group is too much. With subsidiaries in several countries, release notes come in the local language. A good test: a key user reads them without explanation and understands them. The full routine with examples is in [Communicating Salesforce releases to business teams](../../../blog/salesforce-release-communication-business/).

```schritte
Planning | when the scope is fixed · product owner with business team
  Create the rollout plan per group, mark contested rows and discuss them with the sponsor.
Before acceptance testing | about two weeks before · key users
  Key users see the change, test it and prepare their team's questions.
Shortly before the release | a few days before · team lead, key users
  Release notes for users go to the groups affected, in the local language.
After the release | first week · key users, project team
  Collect questions, check usage, take feedback into the backlog.
```

## What if a change is contested?

Some changes do not please everyone. A new required field creates work for inside sales and helps sales planning. Such changes should not become known through the release notes for the first time. I mark these rows in the rollout plan, and the sponsor explains before acceptance testing why the change is coming. This is where desire is decided: whoever knows the reason and knows their own leadership backs it fills in the field. Whoever does not fills it with a dot.

The way back matters just as much. I set up one place for feedback, separate bugs from requests and make sure every piece of feedback gets a visible answer, even when the answer is no. A business team that sees its feedback implemented in the next release will read the next release notes too.

## When does the works council join?

In Germany the works council has a right of co-determination under [section 87 of the Works Constitution Act](https://www.gesetze-im-internet.de/betrvg/__87.html) for technical systems that can monitor behaviour or performance. Salesforce touches that in several places: location data in the Field Service app, timesheets, evaluations of individuals and AI tools. For change management, openness counts as much as the legal question. A technician who hears from the works council that their location is only transmitted while travelling to a job reacts differently from one who discovers it on a map in the office.

```hinweis achtung
Agree location data, working times and evaluations of individuals with the works council before they are set up, and put the result in plain words into the communication before go-live. Agreeing afterwards costs weeks and trust.
```

The same applies to AI tools in development, see [AI coding tools: works council and GDPR](../../../blog/ai-coding-tools-works-council-gdpr/). How technicians adopt the app is covered in [chapter 3](../key-users-and-training/).

## Where do you start?

Write a rollout plan for the next release with one row per affected group and mark the contested rows. Take this list to the sponsor and agree when they explain which change. If no sponsor can be found, that is the most important finding of the plan. The diagnosis behind it is in [chapter 1](../change-management-adkar-diagnosis/), my work on it on the page [Change management for Salesforce programmes](../../../services/change-management-salesforce/).
