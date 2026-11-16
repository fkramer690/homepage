---
title: "Global Salesforce template: how much country fits?"
description: "How much country deviation a global Salesforce template can take, which deviations are justified and how to keep the delta per country small."
pubDate: 2026-10-29
updatedDate: 2026-11-09
lang: en
slug: salesforce-global-template-country-deviations
translationKey: global-template-country-deviations
topic: governance
categories: [architecture, manufacturing-cloud]
contactBrief: architecture
tags: [global template, rollout, harmonization, Salesforce architecture]
takeaways:
  - "My guideline: every country is at least 80 percent identical to the template, and the delta per country is kept as small as possible."
  - "Legal, tax, language-related and genuine business reasons can justify deviations. Habit alone is not a reason."
  - "Country differences belong in configuration, such as custom metadata per country; use code per country only with a documented legal or integration reason."
  - "A global process owner decides on deviations together with the architect on the client side, and every decision goes into the log."
faq:
  - q: "What is a global template in Salesforce?"
    a: "A global template is the shared set of processes, the data model, automation and permissions that all countries in a worldwide rollout adopt. Country specifics are added as small, documented extensions."
  - q: "How much may a country deviate from the template?"
    a: "Based on my programs, at least 80 percent common process coverage per country is a useful guideline, not a Salesforce benchmark. Every deviation needs a legal, tax, language or business model reason, plus approval."
  - q: "Who decides on deviations from the template?"
    a: "A global process owner and the architect on the client side make the decision. The country requests and justifies the deviation, and carries its follow-up costs."
  - q: "Which country should a global template start with?"
    a: "A large country with reasonable complexity. That country has to test the template seriously, but it must not be so special that its edge cases shape the template for everyone else."
draft: false
---

A global Salesforce template is the shared core of processes, the data model, automation and permissions that every country in a worldwide rollout adopts. My guideline: every country is at least 80 percent identical to the template, and the delta per country stays as small as possible. Legal, tax, language-related and genuine business reasons can justify deviations. Every deviation needs a request, a reason and an approval, and it belongs in configuration instead of code per country. Without these rules the template turns into a collection of country solutions after three countries.

## Why does a global template fall apart?

The strategic goal of a worldwide rollout is usually to harmonize processes. At the start everyone agrees. Starting with the second country, the exceptions arrive: in France, inside sales needs an additional field; in Italy, quote approval runs through one more level; and in the US, the subsidiary has a different name and trades under a different brand.

Each exception is small. Together they have three consequences:

- **Every change gets more expensive.** A new feature has to be tested in every country variant. With ten countries that have their own flows, one release is ten releases.
- **Reports across countries stop adding up.** If a status means something different in every country, worldwide order intake is an estimate.
- **New countries take longer.** Instead of adopting the template, every new country picks the variant it likes best.

```praxis
In the worldwide Manufacturing Cloud rollout I accompanied as architect, it was clear from the start that the goal was to harmonize processes. We started with a large country with reasonable complexity, and the other countries only had marginal deviations. My guideline since then: all countries should be at least 80 percent identical to the template, and the delta per country should be minimized. What I would do differently: keep raising change management, even when the client thinks they do not need it.
```

I describe the order of countries in detail in [Manufacturing Cloud global rollout](/en/blog/manufacturing-cloud-global-rollout/). This article is about the question every country asks again and again: may this deviation go into the system?

## Which deviations are justified?

I sort every request for a deviation into one of five groups:

| Reason | Example | Into the template? |
|---|---|---|
| Law and tax | e-invoicing mandate, tax number, retention periods | yes, as configuration where possible; e-invoicing or archiving may need an integration or another system |
| Language and formats | translations, address formats, currency | yes, through standard features where they cover it |
| Brand and legal entity | subsidiary trades under a different name | yes, as master data, not as a process |
| Different business | country sells through dealers instead of directly | yes if several countries are affected, otherwise review |
| Habit | "the field has always been at the top here" | no |

The last group is the largest, and the hardest, because it rarely goes by that name. A habit-driven request almost always comes with a business reason. A good test question is: what does it cost the country to adopt the template's process? If the answer is "getting used to it", it is habit. If the answer is "an invoice the tax office will not accept", it is law.

The fourth group deserves a second look. If one country sells through dealers and the others sell directly, that is a second variant of the sales process. If the same variant appears in several countries, it belongs in the template, and only once.

## Country differences belong in configuration, not in code

The technical rule is simple: country differences belong in configuration, not in code or separate flows per country. Exceptions need a documented legal, integration or security reason, such as an e-invoicing interface.

- **Values per country in custom metadata types.** Approval limits, routing parameters or required fields per country are stored in a table. A validation rule or flow reads the value for the record's country and enforces it. A new country then adds entries rather than new automation, and those entries are tested and deployed like any other change. Tax rates stay in the ERP or tax system, which is their system of record.
- **Translations through Salesforce's translation features**, not through extra fields per language.
- **Record types only for real process variants**, not per country. Ten countries with one record type each multiply layouts, picklist values and tests that drift apart.
- **Visibility by country, legal entity or region through roles, territories and sharing rules**, as described in the [permission concept](/en/blog/salesforce-permission-concept-permission-sets/).

These rules belong in the [development standards](/en/blog/salesforce-development-standards-definition-of-done/), so every partner who rolls out the template in a country knows them.

```pro-contra
pro: Strict template
- One release applies to all countries
- Worldwide reports compare like with like
- New countries go live faster
contra: What you give up
- Countries have to change routines they are used to
- Without change management, resistance grows
```

## Who decides on deviations?

A country requests a deviation in writing: what it needs, why, and what it costs to adopt the template instead. A global process owner decides together with the architect on the client side, and the decision goes into the [decision log](/en/blog/salesforce-architecture-decision-log/), so the next country does not ask the same question again.

Two rules help. First, the country carries the follow-up costs of its deviation, including testing in every future release. That reduces the scope of many requests. Second, every deviation is reviewed after a year: is it still needed, or can the country go back to the template? Many requests come from habit. If the sponsor in the country understands why the template is built the way it is, they can put these requests in context before they reach the architect. More on that in [Change management in a global Salesforce rollout](/en/blog/change-management-global-salesforce-rollout/).

## Metrics per country show whether the template holds

The 80 percent figure is a guideline, not an exact measurement. Still, the trend is easy to track with three simple numbers per country:

- **Number of approved deviations**, split by the five groups in the table. If the number of deviations in the group "different business" grows in several countries, it is time to extend the template.
- **Country-specific metadata.** Flows, record types or page layouts that exist for one country only. The number should be close to zero.
- **Test effort per release for the country.** If a country needs clearly more test cases than the others, it has more deviations than the list shows.

## Write down the goal before the first country

Before the first country rollout, decide what the goal is and write it down. If the goal is harmonization, the target level of template fit and the request path for deviations follow from it. Then keep a list of deviations per country, with reason and approval date. The list should also say what each deviation costs in operation, such as an extra test case in every release. In the steering committee it shows at a glance whether the template holds. How countries adopt the template is also a question of [change management](/en/services/change-management-salesforce/).
