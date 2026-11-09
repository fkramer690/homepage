---
title: "Change management in a rollout across countries and teams"
description: "What change management needs in every wave of a global Salesforce rollout: a sponsor per country, key users, communication, co-determination and a review."
lang: en
slug: change-management-rollout-countries
course: change-management
translationKey: cm-04
chapter: 4
pubDate: 2026-10-29
short: "Rollout across countries and teams"
summary: "Every wave goes through ADKAR again: a sponsor per country, template deviations, communication in the local language and lessons from the first wave."
takeaways:
  - "Every country needs its own sponsor from local management; a global sponsor at headquarters does not replace them."
  - "The list of deviation requests shows where awareness is missing: when one country submits twenty and the others three, it is rarely the business."
  - "The message before go-live comes in the local language from the country's own leadership and also says what stays as it is."
  - "After the first wave, a review with sponsor and key users shows which questions came up most and where people keep working with their own lists."
articles: [change-global-rollout, global-template-country-deviations, manufacturing-cloud-global-rollout, field-service-rollout, commerce-dealer-rollout]
faq:
  - q: "Is change management at headquarters enough in a global rollout?"
    a: "No. At headquarters the goal of harmonization is clear, in the countries often not. For a subsidiary with its own processes, the global template is first of all an outside requirement. It takes a person in the country whom employees listen to."
  - q: "What does change management include per country?"
    a: "A sponsor from local management, a review of the country deviations, key users, communication in the local language, training on real cases, clarifying co-determination and a look at usage from the first month."
  - q: "How much time is needed between two waves?"
    a: "Enough to review the first wave. Whoever starts the next country while the first still has questions spreads the project team's attention too thin, and the second country starts with the same gaps."
draft: false
---

A global Salesforce rollout restarts ADKAR in every country. What headquarters understood long ago, each subsidiary has to reach on its own: awareness, desire, knowledge, ability and reinforcement. That is why I plan change management for every wave. It includes a sponsor from local management, key users, a message in the local language, co-determination settled early and a look at usage after go-live. How many deviation requests a country submits tells you which stage it is at. The first wave tests change management just as much as the technology. The same holds for waves by region in field service or for dealers.

## Why is change management at headquarters not enough?

Behind a global template there is almost always the wish to align processes. Headquarters knows that reason, the subsidiary often does not. A team that has delivered good numbers with its own processes for years first sees the template as a rule imposed from outside. Without the reasoning, the country sends deviation requests instead of support.

In the ADKAR model from [chapter 1](../change-management-adkar-diagnosis/), awareness and desire are missing then. Neither stage comes from a circular email sent by headquarters. An English email may reach every recipient, but it convinces hardly any of them.

```praxis
In the worldwide Manufacturing Cloud rollout, harmonising the processes was set from day one. Today I would put change management on the table more often, even against the client saying they do not need it. Key users, a message before go-live and a look at usage afterwards belonged in every country.
```

## Which stage is missing in which country?

The building blocks per country are always the same. The more useful question is which ADKAR stage a country needs right now, because that decides where the sponsor and the project team spend their time. So I map the building blocks to the stages:

| ADKAR stage | How I notice it is missing in the country | Building block that creates it |
|---|---|---|
| Awareness | Many deviation requests, questions about the point of the template | Sponsor from local management, message in the local language |
| Desire | The template counts as a headquarters project, workshops stay empty | Sponsor reviews the country deviations, co-determination settled early |
| Knowledge | The same questions in every team after go-live | Key users from the first workshops, training on real cases |
| Ability | Old spreadsheets keep running in parallel | Key users on site in the first weeks |
| Reinforcement | Usage drops after the first month | Measuring usage, review before the next wave |

Two building blocks get dropped most often: the sponsor in the country and co-determination. A global sponsor cannot stand in front of every team. And each country handles the involvement of employee representatives differently, so it belongs at the start of planning. The full list with roles and timing is in [Change management in a global Salesforce rollout](../../../blog/change-management-global-salesforce-rollout/), the order of countries in the Manufacturing Cloud chapter [ERP, AI and rollout](../../manufacturing-cloud/erp-ai-and-rollout/).

## What must the message in the country explain?

The message before go-live pays into awareness and desire. It says why something changes, what the country gains, what changes for which group, what stays the same and who helps on site. The point about what stays the same is missing from almost every draft, yet it removes the most uncertainty. Help here means names of key users, not a support address. The sender is the country's own management, writing in the local language. How I go through these questions with the sponsor is described in the article on the global rollout. What else the sponsor does and what a rollout plan per group looks like is in [chapter 2](../sponsor-and-communication/).

## Deviation requests show where awareness is missing

A request to deviate from the template almost always has a change side too. Someone who wants to keep a habit still brings a business justification. When the sponsor in the country knows why the template is built the way it is, they sort out such requests before they land with the architect.

The list also works the other way. When one country submits twenty requests and its neighbours three each, the cause is rarely the business and usually awareness. That is why the deviation list is on the table at every meeting with a country's sponsor. How to separate legal, business and habitual deviations is in [Global Salesforce template: how much local variation?](../../../blog/salesforce-global-template-country-deviations/).

## Waves in field service and with dealers follow the same logic

The same logic holds for waves that are not cut by country. I roll out Field Service region by region. Each region brings its own dispatchers, technicians and master data, and the works council belongs in the planning of the first wave, as described in [Salesforce Field Service rollout: why in waves?](../../../blog/salesforce-field-service-rollout/). Dealers are a group of their own with their own leadership: a dealer portal or B2B shop is adopted when the dealer sees an advantage, and the message comes from the sales manager the dealer knows. More in [Rolling out a B2B shop to dealers](../../../blog/b2b-shop-dealer-rollout/).

## After the first wave: a review before the next country

Once the first country or region is live, I sit down with the sponsor and the key users. Three points are on the agenda:

1. **The most frequent questions since go-live.** They reveal whether knowledge was missing, meaning training or the message was too thin.
2. **Lists that keep running next to Salesforce.** They point to a gap in ability or desire. How to measure it is in [chapter 5](../measure-adoption-and-reinforce/).
3. **What the key users would have wanted to know earlier.** I take that unchanged into the plan for the next country.

```hinweis tipp
Send the key users of the next country for a few days to the country that has just gone live. There they see real cases and the questions of the first weeks, and they take both home.
```

This review takes time, and that time has to be planned between the waves. If the next country starts while the first one still has questions, the project team's attention is enough for neither. Name a country's sponsor before its planning starts, and keep time free for the review after the first country. How key users and training run per country is in [chapter 3](../key-users-and-training/).
