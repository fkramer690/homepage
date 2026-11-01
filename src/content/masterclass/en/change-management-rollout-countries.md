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
    a: "No. At headquarters the goal of harmonisation is clear, in the countries often not. For a subsidiary with its own processes, the global template is first of all an outside requirement. It takes a person in the country whom employees listen to."
  - q: "What does change management include per country?"
    a: "A sponsor from local management, a review of the country deviations, key users, communication in the local language, training on real cases, clarifying co-determination and a look at usage from the first month."
  - q: "How much time is needed between two waves?"
    a: "Enough to review the first wave. Whoever starts the next country while the first still has questions spreads the project team's attention too thin, and the second country starts with the same gaps."
draft: false
---

In a global Salesforce rollout every country goes through the ADKAR stages from the start. So change management belongs in every wave. Per country you need a sponsor from local management, key users who know the template, communication in the local language explaining why something changes, clarity on co-determination and a look at usage after go-live. A country's list of deviation requests shows where awareness is missing. The first wave is as much a test for change management as for the technology: what goes wrong there is fixed before the next wave. The same applies to waves by region in field service or to dealers.

## Why is change management at headquarters not enough?

The strategic goal of a global rollout is usually to harmonise processes. At headquarters that goal is clear, in the countries often not. For a subsidiary that has worked successfully with its own processes for years, the global template is first of all an outside requirement. Whoever does not explain there why it is worth it gets deviation requests instead of support.

In the ADKAR model from [chapter 1](../change-management-adkar-diagnosis/), the first two stages are missing in this situation. Neither can be produced by a circular email from headquarters. An English email reaches the people it is sent to, but it rarely convinces them.

```praxis
In the worldwide Manufacturing Cloud rollout it was clear from the start that the goal was to harmonise processes. What I would do differently today: keep bringing up change management, even when the client thinks they do not need it. Per country we needed at least key users, communication before go-live and a look at usage afterwards.
```

## The same building blocks in every country

I plan the same building blocks for every country. The content differs, the list does not:

| Building block | Who | When |
|---|---|---|
| Sponsor in the country | country managing director or head of sales | from the country's planning |
| Review of country deviations | sponsor, key users, architect | before the country configuration is built |
| Key users | one or two per team or site | from the first workshops |
| Communication on why things change | sponsor, in the local language | weeks before go-live |
| Training on real cases | key users with project team | shortly before go-live |
| Co-determination | HR, works council where one exists | before setup, different per country |
| Measuring usage | sponsor, project team | from the first month after go-live |

The two most underestimated are the sponsor in the country and co-determination. A global sponsor does not replace the person who stands in front of their team in the country. And whether and how employee representatives are involved differs per country and needs to be clarified early. The building blocks in detail are in [Change management in a global Salesforce rollout](../../../blog/change-management-global-salesforce-rollout/), the order of countries in the Manufacturing Cloud chapter [ERP, AI and rollout](../../manufacturing-cloud/erp-ai-and-rollout/).

## What must the message in the country explain?

Communication before go-live explains what changes and why, not just where to click. I give each country's sponsor these questions their message should answer:

| Question | What the message says |
|---|---|
| Why is anything changing? | The reason in one sentence, for example a global view of group customers who buy in several countries. |
| What does the country gain? | A concrete benefit for the employees on site, not only for headquarters. |
| What changes for whom? | Split by group, because inside sales has different questions from field sales. |
| What stays as it is? | Almost always forgotten, and it removes a lot of uncertainty. |
| Where is help? | Names of the key users, not a support address. |

## Deviation requests show where awareness is missing

Every request to deviate from the template is also a change management question. Requests out of habit almost always come with a business justification. When the sponsor in the country understands why the template is built the way it is, they can sort these requests before they reach the architect.

The other way round, the list of deviations shows where change management has to start. When one country submits twenty requests and the others three, awareness is usually missing there. So I take the deviation list into every conversation with a country's sponsor. How to separate legal, business and habitual deviations is in [Global Salesforce template: how much local variation?](../../../blog/salesforce-global-template-country-deviations/).

## Waves in field service and with dealers follow the same logic

The same logic holds for waves that are not cut by country. I roll out Field Service region by region. Each region brings its own dispatchers, technicians and master data, and the works council belongs in the planning of the first wave, as described in [Salesforce Field Service rollout: why in waves?](../../../blog/salesforce-field-service-rollout/). Dealers are a group of their own with their own leadership: a dealer portal or B2B shop is adopted when the dealer sees an advantage, and the message comes from the sales manager the dealer knows. More in [Rolling out a B2B shop to dealers](../../../blog/b2b-shop-dealer-rollout/).

## After the first wave: a review before the next country

After go-live in the first country or region, I review three questions with the sponsor and the key users:

1. **Which questions came up most often?** They show where training or communication was missing.
2. **Where do people keep working with their own lists next to Salesforce?** That shows which stage was missing. How to measure it is in [chapter 5](../measure-adoption-and-reinforce/).
3. **What would the key users have liked to know earlier?** The answer goes straight into the plan for the next country.

```hinweis tipp
Have key users of the next country work along for a few days in the country of the running wave. They see real cases, learn the questions that come after go-live and bring that back to their own country.
```

That needs breathing room between two waves. Whoever starts the next wave while the first country still has questions spreads the project team's attention too thin. So name the sponsor for each country before it enters planning, and plan a review after the first country. How key users and training run per country is in [chapter 3](../key-users-and-training/).
