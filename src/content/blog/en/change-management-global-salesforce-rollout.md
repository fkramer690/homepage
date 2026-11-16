---
title: "Change management in a global Salesforce rollout"
description: "What change management has to deliver per country in a global Salesforce rollout: sponsor, key users, communication and a look at usage afterwards."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: change-management-global-salesforce-rollout
translationKey: change-global-rollout
topic: governance
categories: [change-management, architecture, manufacturing-cloud]
coAuthor: juliane
contactBrief: change
tags: [change management, rollout, global template, harmonization]
takeaways:
  - "Change management belongs in every wave of a global rollout, not only the first, because each country has different habits that need to change."
  - "Every country needs a named sponsor with decision rights. The global sponsor is not enough if the country does not share the reason for harmonization."
  - "Each country needs at least key users with agreed time, communication from the planning stage and usage measured against a baseline taken before go-live."
  - "The first wave is also the test for change management: whatever does not work there is adjusted before the next wave."
faq:
  - q: "Why does a global template need change management?"
    a: "Because harmonization means that processes, reports and habits change in every country. A sales team that used to track its volumes in its own spreadsheet does not automatically work with the new process just because it is live."
  - q: "Who is responsible for the rollout in the country?"
    a: "A sponsor with decision rights, usually from local management, who visibly backs the change, and key users who know the template. The central project team supports them but cannot replace these roles."
  - q: "Should communication be in the local language?"
    a: "Usually yes. Explanations of why something changes are better received in the local language and from local management than in an English email from headquarters. Where English is the working language, local management should at least review central texts and add its own examples."
  - q: "When does change management start for a country?"
    a: "When the country enters planning, not two weeks before go-live. The question of what changes for each group belongs in the review of country deviations."
  - q: "How do you measure usage after go-live in each country?"
    a: "With a few metrics agreed before go-live: active users per role, the share of work handled entirely in Salesforce, such as forecasts or quotes, and signs of parallel spreadsheets. The baseline is taken before go-live, then the sponsor reviews the trend every month."
draft: false
---

In a worldwide Salesforce rollout with a global template, people in every country work differently after go-live than before. That is why change management belongs in every wave, not only the first. Each country needs its own sponsor with decision rights, usually from local management, key users who know the template, communication from the planning stage that explains why something changes, and usage measured afterwards. The first wave is a test for change management just as much as for the technology: whatever gets stuck there is adjusted before the next wave.

## Change management at headquarters is not enough

The strategic goal of a worldwide rollout is usually to harmonize processes. At headquarters that goal is clear; in the countries it often is not. For a subsidiary that has worked successfully with its own processes for years, the global template is initially something imposed from outside. If nobody there explains why it is worth it, you get deviation requests instead of support. Here, "country" stands for the unit that goes live together; depending on the organization, that can also be a region, a subsidiary or a business unit.

Prosci's [ADKAR model](/en/blog/change-management-salesforce-rollout/) describes five stages every person goes through in a change: awareness, desire, knowledge, ability and reinforcement. In this situation the first two are often at risk: awareness, the understanding of why something changes, and desire, the willingness to take part. Only conversations with the affected groups show whether that is really where the barrier lies. Neither can be produced from headquarters by email. It takes a person in the country whom employees listen to. That person alone is not enough: if time, suitable targets or features are missing, even the best sponsor achieves little.

```praxis
In the worldwide Manufacturing Cloud rollout it was clear from the start that the goal was to harmonize processes. What I would do differently today: keep bringing up change management, even when the client thinks they do not need it. Every country needed at least key users, communication before go-live and a look at usage afterwards.
```

The order of countries is covered in [Manufacturing Cloud global rollout](/en/blog/manufacturing-cloud-global-rollout/), and how to handle deviations in [global Salesforce template: how much country fits?](/en/blog/salesforce-global-template-country-deviations/).

## What does each country need?

I plan the same building blocks for every country. The content differs, the list does not:

| Building block | Who | When |
|---|---|---|
| Sponsor in the country | country managing director or head of sales | from the planning of the country |
| Review of country deviations | sponsor, key users, architect | before the country configuration is built |
| Key users | enough for every role, language, site and shift, with agreed time | from the first workshops |
| Communication on why things change | sponsor, in the local language | from planning, concrete go-live information in the weeks before |
| Training on real cases | key users with project team | shortly before go-live |
| Co-determination and data protection | works council or comparable body where one exists, data protection, HR | early in the design, differs per country |
| Measuring usage | sponsor, project team | baseline before go-live, then monthly |

Two points are underestimated most often. The first is the sponsor in the country. A global sponsor at headquarters is necessary, but does not replace the person who stands in front of the local team and says that forecasts will come from Salesforce from now on. The second is co-determination. Whether and how a works council or a comparable body is involved differs by country and region and should be clarified early; for reports that can show performance or behavior, already during the design. For field service I describe this in the [Field Service rollout](/en/blog/salesforce-field-service-rollout/).

## What does the communication in the country have to explain?

Communication before go-live explains what changes and why, not only where to click. I give each country's sponsor five questions their message should answer:

- **Why is something changing?** The reason in one sentence, for example a worldwide view of group customers who buy in several countries.
- **What does the country get out of it?** A specific benefit for the employees on site, not only for headquarters.
- **What changes for whom?** Split by group, because inside sales has different questions than field sales.
- **What stays the same?** This is almost always forgotten and removes a lot of uncertainty.
- **Where is help?** Names of the key users, not a support address.

This message should come in the local language and from local management. An English email from headquarters reaches its recipients but rarely convinces them.

## How is change management linked to country deviations?

Many requests to deviate from the template are also a change management question. I classify each request first: required by law or regulation, justified by the business case, caused by technical or organizational constraints, or habit. Only the last group is mainly a task for change management. Requests driven by habit, however, almost always come with a business reason. If the sponsor in the country understands why the template is built the way it is, they can put these requests in context before they reach the architect.

Conversely, the list of deviations shows where change management has to start. If one country submits twenty requests and the others three each, it is worth asking why. Sometimes the country really has different requirements; more often, awareness is missing. That is why I bring the deviation list to every conversation with a country's sponsor.

## The first wave is the test for all others

Change management is tested in the first wave too. After the first country goes live, I check with the sponsor and the key users:

1. **Which questions came up most often after go-live?** They show where training or communication was missing.
2. **Where do people keep working with their own lists alongside Salesforce?** That shows where the new process has not been adopted. Whether the issue is knowledge, usability, missing functions or willingness becomes clear in conversations with the users. How to measure this is covered in [measuring Salesforce adoption after go-live](/en/blog/salesforce-adoption-metrics-after-go-live/).
3. **What would the key users have liked to know earlier?** The answer goes straight into the plan for the next country.

Between two waves this needs a short checkpoint, even when waves overlap: critical defects from the first wave are fixed, training material is updated, decisions on changes to the template are made and the key users of the next wave are ready. Whoever starts the next wave while the first country still has questions spreads the project team's attention too thin, and the second country starts with the same gaps.

```hinweis tipp
Have key users from the next country work for a few days in the country that is currently going live. They see real cases, learn which questions come up after go-live and take that back to their own country.
```

## Name a sponsor per country before planning starts

Name a sponsor for every country before the country enters planning, and have them review the list of country deviations. Define key users per country and agree their availability with their managers, as described in [key users in Salesforce rollouts](/en/blog/salesforce-key-user-network/). After the first country goes live, plan a review before the second one starts. Without a named sponsor, detailed design does not start for a country, even when the schedule is tight. How we set this up in programs is described in [change management for Salesforce programs](/en/services/change-management-salesforce/).
