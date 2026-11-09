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
  - "Awareness and desire come from the group's own leadership. It explains why something changes and decides when departments disagree."
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

In the Prosci study [Best Practices in Change Management](https://www.prosci.com/hubfs/Website_English/2.downloads/research-executive-summaries/Best-Practices-in-Change-Management-12th-Edition-Executive-Summary.pdf), participants named active and visible sponsorship as the top success factor. In Salesforce programs that is exactly what is missing most often. A sponsor is a person from management who visibly backs the rollout. They do not just sit on the steering committee; they stand in front of the teams affected.

This is what makes a sponsor effective:

```saeulen
dach: An effective sponsor
mic | Explaining | In their own department | In the sales meeting, the head of sales says why forecasts will come from Salesforce. The same message from the project team carries less weight.
steer | Deciding | When departments disagree | When inside sales and sales planning cannot agree on a required field, the decision is theirs and not the sprint's.
analyse | Asking | In the monthly report | They ask about their teams' usage. That way the teams notice that it counts.
basis: Written down in the sponsor plan
```

So I write a sponsor plan: a short list of dates when the sponsor appears, decisions that sit with them and the figures they receive each month. Without this plan, "management is behind it" turns into a line on the first slide.

## The rollout plan has one row per affected group

A good release process makes releases smaller and more frequent. The business then gets a steady flow of small changes instead of one big package per quarter. A change nobody knew about looks like a bug. The answer is the rollout plan, which I keep together with the release plan. For this masterclass I add one column: which ADKAR stage is at risk for this group right now. That decides whether an email is enough or the sponsor has to step in.

| Group | Change | Stage at risk | Who speaks |
|---|---|---|---|
| Inside sales Germany | delivery date becomes a required field on the quote | Desire, because the field means extra work | Sponsor before acceptance testing, then team lead |
| Field service | new maintenance report in the app | Knowledge and ability | Key user of the region, before the app update |
| Sales in all countries | nothing visible | none | nobody |

The empty row is the important one. Someone who gets release emails every week that have nothing to do with their work will eventually skip the one that does. How the repository, pipeline and approvals behind this are organized is in the DevOps chapter [Release process: ownership, roles and approvals](../../devops-release-management/release-process-ownership-roles/).

## What do release notes for users look like?

User stories, fields and flows mean nothing to the business. Release notes for users are therefore a document of their own, and each of their questions pays into one ADKAR stage. What changes for my group, with a screenshot if needed, and from which date creates awareness. The reason in one sentence, for example that sales planning needs the delivery date, supports desire. What stays the same removes uncertainty and is almost always missing. The key user's name as contact secures knowledge. Half a page per group is enough, in several countries in each local language. As a test I hand the text to a key user without further explanation. The full routine with examples is in [Communicating Salesforce releases to business teams](../../../blog/salesforce-release-communication-business/).

```schritte
Planning | once the scope is clear · product owner and business
  One row per group in the rollout plan, contested rows go to the sponsor.
Before acceptance testing | around two weeks ahead · key users
  Key users try the change and collect what their team is going to ask.
Shortly before the release | a few days ahead · team lead and key users
  The affected groups receive their release notes in their own language.
After the release | first week · key users, project team
  Key users gather questions, the project watches usage, feedback goes into the backlog.
```

## The sponsor explains contested changes before acceptance testing

Some changes do not please everyone. A new required field creates work for inside sales and helps sales planning. Such changes should not become known through the release notes for the first time. I mark these rows in the rollout plan, and the sponsor explains before acceptance testing why the change is coming. This is where desire is decided: whoever knows the reason and knows their own leadership backs it fills in the field. Whoever does not fills it with a dot.

Without a feedback channel all of this fades. Feedback gets one fixed place, bugs and requests are kept apart, and every piece of feedback gets a visible answer, a no included. A business team that sees its feedback implemented in the next release will read the next release notes too.

## When does the works council join?

In Germany the works council has a right of co-determination under [section 87 of the Works Constitution Act](https://www.gesetze-im-internet.de/betrvg/__87.html) for technical systems that can monitor behavior or performance. Salesforce touches that in several places: location data in the Field Service app, timesheets, evaluations of individuals and AI tools. For change management, openness counts as much as the legal question. A technician who hears from the works council that their location is only transmitted while travelling to a job reacts differently from one who discovers it on a map in the office.

```hinweis achtung
Agree location data, working times and evaluations of individuals with the works council before they are set up, and put the result in plain words into the communication before go-live. Agreeing afterwards costs weeks and trust.
```

The same applies to AI tools in development, see [AI coding tools: works council and GDPR](../../../blog/ai-coding-tools-works-council-gdpr/). How technicians adopt the app is covered in [chapter 3](../key-users-and-training/).

## Write the rollout plan for the next release

Write a rollout plan for the next release with one row per affected group and mark the contested rows. Take this list to the sponsor and agree when they explain which change. If no sponsor can be found, that is the most important finding of the plan. The diagnosis behind it is in [chapter 1](../change-management-adkar-diagnosis/), my work on it on the page [Change management for Salesforce programs](../../../services/change-management-salesforce/).
