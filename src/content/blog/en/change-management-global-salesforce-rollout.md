---
title: "Change management in a global Salesforce rollout"
description: "What change management has to deliver per country in a global Salesforce rollout: sponsor, key users, communication and a look at usage afterwards."
pubDate: 2026-10-29
lang: en
slug: change-management-global-salesforce-rollout
translationKey: change-global-rollout
topic: governance
categories: [architecture, manufacturing-cloud]
contactBrief: change
tags: [change management, rollout, global template, harmonisation]
takeaways:
  - "A worldwide rollout with a global template means people in every country work differently. That is why change management belongs in every wave, not only the first."
  - "Every country needs its own sponsor from local management. A global sponsor at headquarters is not enough if the local subsidiary does not share the reason for harmonisation."
  - "Per country you need at least key users, communication before go-live and a look at usage afterwards."
  - "The first wave is also the test for change management: whatever gets stuck there is adjusted before the next wave."
faq:
  - q: "Why does a global template need change management?"
    a: "Because harmonisation means that processes, reports and habits change in every country. A sales team that used to track its volumes in its own spreadsheet does not automatically work with the new process just because it is live."
  - q: "Who is responsible for the rollout in the country?"
    a: "A sponsor from local management who visibly backs the change, and key users who know the template. The central project team supports them but cannot replace these roles."
  - q: "Should communication be in the local language?"
    a: "Yes. Explanations of why something changes land better in the local language and from local management than in an English email from headquarters."
  - q: "When does change management start for a country?"
    a: "When the country enters planning, not two weeks before go-live. The question of what changes for each group belongs in the review of country deviations."
draft: false
---

In a worldwide Salesforce rollout with a global template, people in every country work differently after go-live than before. That is why change management belongs in every wave, not only the first. Each country needs its own sponsor from local management, key users who know the template, communication before go-live that explains why something changes, and a look at usage afterwards. The first wave is a test for change management just as much as for the technology: whatever gets stuck there is adjusted before the next wave.

## Why is change management at headquarters not enough?

The strategic goal of a worldwide rollout is usually to harmonise processes. At headquarters that goal is clear, in the countries often not. For a subsidiary that has worked successfully with its own processes for years, the global template is first of all a requirement from outside. If nobody there explains why it is worth it, you get deviation requests instead of support.

In the [ADKAR model](../change-management-salesforce-rollout/) the first two stages are missing in this situation: awareness, the understanding of why something changes, and desire, the willingness to take part. Neither can be produced from headquarters by email. It takes a person in the country whom employees listen to.

```praxis
In the worldwide Manufacturing Cloud rollout it was clear from the start that the goal was to harmonise processes. What I would do differently today: keep bringing up change management, even when the client thinks they do not need it. Per country we needed at least key users, communication before go-live and a look at usage afterwards.
```

The order of countries is described in [Manufacturing Cloud global rollout](../manufacturing-cloud-global-rollout/), how to handle deviations in [global Salesforce template: how much country fits?](../salesforce-global-template-country-deviations/).

## What does each country need?

I plan the same building blocks for every country. The content differs, the list does not:

| Building block | Who | When |
|---|---|---|
| Sponsor in the country | country managing director or head of sales | from the planning of the country |
| Review of country deviations | sponsor, key users, architect | before the country configuration is built |
| Key users | one or two per team or site | from the first workshops |
| Communication on why things change | sponsor, in the local language | weeks before go-live |
| Training on real cases | key users with project team | shortly before go-live |
| Co-determination | HR, works council where one exists | before setup, differs per country |
| Measuring usage | sponsor, project team | from the first month after go-live |

Two points are underestimated most often. The first is the sponsor in the country. A global sponsor at headquarters is necessary, but does not replace the person who stands in front of their team in the country and says that forecasts will come from Salesforce from now on. The second is co-determination. Whether and how a works council or a comparable body is involved differs by country and region and should be clarified early. For field service I describe this in the [Field Service rollout](../salesforce-field-service-rollout/).

## What does the communication in the country have to explain?

Communication before go-live explains what changes and why, not only where to click. I give the sponsor of every country five questions their message should answer:

- **Why is something changing?** The reason in one sentence, for example a worldwide view of group customers who buy in several countries.
- **What does the country get out of it?** A concrete benefit for the employees on site, not only for headquarters.
- **What changes for whom?** Split by group, because inside sales has different questions than field sales.
- **What stays the same?** This is almost always forgotten and removes a lot of uncertainty.
- **Where is help?** Names of the key users, not a support address.

This message comes in the local language and from local management. An English email from headquarters reaches the people it is sent to, but it rarely convinces them.

## How is change management linked to country deviations?

Every request to deviate from the template is also a change management question. Requests out of habit almost always come with a business reason. If the sponsor in the country understands why the template is built the way it is, they can put these requests in context before they reach the architect.

The other way round, the list of deviations shows where change management has to start. If one country submits twenty requests and the others three, it is rarely the business. Usually awareness is missing there. That is why I bring the deviation list to every conversation with a country's sponsor.

## What do you learn from the first wave?

The first wave is the test for all others, including for change management. After the go-live of the first country I check three questions with the sponsor and the key users:

1. **Which questions came up most often after go-live?** They show where training or communication was missing.
2. **Where do people keep working with their own lists next to Salesforce?** That shows which ADKAR stage was missing. How to measure this is in [measuring Salesforce adoption after go-live](../salesforce-adoption-metrics-after-go-live/).
3. **What would the key users have liked to know earlier?** The answer goes straight into the plan for the next country.

This needs breathing room between two waves. Whoever starts the next wave while the first country still has questions spreads the project team's attention too thin, and the second country starts with the same gaps.

```hinweis tipp
Let key users of the next country work for a few days in the country of the current wave. They see real cases, learn the questions that come after go-live and bring that back to their own country.
```

## Where do you start?

Name a sponsor for every country before the country enters planning, and have them review the list of country deviations. Define key users per country and agree their time with their managers, as described in [key users in Salesforce rollouts](../salesforce-key-user-network/). After the first country, plan a review before the second one starts.

A global template is introduced anew in every country, and every country needs its own people to carry it. If you are planning a worldwide rollout, [send me a message](#contact) or read more about [change management for Salesforce programmes](../../services/change-management-salesforce/).
