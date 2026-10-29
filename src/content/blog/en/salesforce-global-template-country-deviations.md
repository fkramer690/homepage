---
title: "Global Salesforce template: how much country fits?"
description: "How much country deviation a global Salesforce template can take, which deviations are justified and how to keep the delta per country small."
pubDate: 2026-10-29
lang: en
slug: salesforce-global-template-country-deviations
translationKey: global-template-country-deviations
topic: governance
categories: [architecture, manufacturing-cloud]
contactBrief: architecture
tags: [global template, rollout, harmonisation, Salesforce architecture]
takeaways:
  - "A global template is the shared core of processes, data model and automation that every country adopts. Countries only add what is really different there."
  - "My guideline: every country is at least 80 percent identical to the template, and the delta per country is kept as small as possible."
  - "Deviations from law, tax, language and real differences in the business are justified. Habit alone is not a reason."
  - "Country differences belong in configuration, such as custom metadata per country, not in separate flows or code per country."
faq:
  - q: "What is a global template in Salesforce?"
    a: "A global template is the shared state of processes, data model, automation and permissions that all countries of a worldwide rollout adopt. Country specifics are added as small, documented extensions."
  - q: "How much may a country deviate from the template?"
    a: "I consider at least 80 percent match per country the right guideline. Every deviation needs a reason from law, tax, language or business model, and an approval."
  - q: "Who decides on deviations from the template?"
    a: "A global process owner together with the architect on the client side. The country requests, justifies and carries the follow-up cost of the deviation."
  - q: "Which country should a global template start with?"
    a: "A large country with reasonable complexity. It has to test the template seriously, but must not be so special that its edge cases shape the template for everyone else."
draft: false
---

A global Salesforce template is the shared core of processes, data model, automation and permissions that every country of a worldwide rollout adopts. My guideline: every country is at least 80 percent identical to the template, and the delta per country stays as small as possible. Deviations from law, tax, language and real differences in the business are justified. Every deviation needs a request, a reason and an approval, and it belongs in configuration instead of code per country. Without these rules the template turns into a collection of country solutions after three countries.

## Why does a global template fall apart?

The strategic goal of a worldwide rollout is usually to harmonise processes. At the start everyone agrees. From the second country on, the exceptions arrive: in France inside sales needs an additional field, in Italy quote approval runs through one more level, and in the US the subsidiary has a different name and trades under a different brand.

Each exception is small. Together they have three consequences:

- **Every change gets more expensive.** A new feature has to be tested in every country variant. With ten countries that have their own flows, one release is ten releases.
- **Reports across countries stop adding up.** If a status means something different in every country, worldwide order intake is an estimate.
- **New countries get slower.** Instead of adopting the template, every new country picks the variant it likes best.

```praxis
In the worldwide Manufacturing Cloud rollout I accompanied as architect, it was clear from the start that the goal was to harmonise processes. We started with a large country with reasonable complexity, and the other countries only had marginal deviations. My guideline since then: all countries at least 80 percent identical, minimise the delta per country. What I would do differently: keep bringing up change management, even when the client thinks they do not need it.
```

I describe the order of countries in detail in [Manufacturing Cloud global rollout](../manufacturing-cloud-global-rollout/). This article is about the question every country asks again: may this deviation go into the system?

## Which deviations are justified?

I sort every request for a deviation into one of five groups:

| Reason | Example | Into the template? |
|---|---|---|
| Law and tax | e-invoicing mandate, tax number, retention periods | yes, as country configuration |
| Language and formats | translations, address formats, currency | yes, through standard features |
| Brand and legal entity | subsidiary trades under a different name | yes, as master data, not as a process |
| Different business | country sells through dealers instead of directly | yes if several countries are affected, otherwise review |
| Habit | "the field has always been at the top here" | no |

The last group is the largest, and the hardest, because it rarely goes by that name. A request out of habit almost always comes with a business reason. A good test question is: what does it cost the country to adopt the template's process? If the answer is "getting used to it", it is habit. If the answer is "an invoice the tax office will not accept", it is law.

The fourth group deserves a second look. If one country sells through dealers and the others sell directly, that is a second variant of the sales process. If the same variant appears in several countries, it belongs in the template, and only once.

## How do you build country differences without splitting the template?

The technical rule is simple: country differences belong in configuration, not in code or separate flows per country.

- **Values per country in custom metadata types.** Approval limits, VAT rates or required fields per country sit in a table. The automation reads the value for the record's country. A new country is then a new entry, not a new release.
- **Translations through Salesforce's translation features**, not through extra fields per language.
- **Record types only for real process variants**, not per country. Ten countries with one record type each are ten page layouts that drift apart.
- **Visibility by country through roles and sharing rules**, as described in the [permission concept](../salesforce-permission-concept-permission-sets/).

These rules belong in the [development standards](../salesforce-development-standards-definition-of-done/), so every partner who rolls out a country knows them.

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

A country requests a deviation in writing: what it needs, why, and what it costs to adopt the template instead. The decision is made by a global process owner together with the architect on the client side. It goes into the [decision log](../salesforce-architecture-decision-log/), so the next country does not ask the same question again.

Two rules help. First, the country carries the follow-up cost of its deviation, including the tests in every future release. That makes many requests smaller. Second, every deviation is reviewed after a year: is it still needed, or can the country go back to the template?

## How do you measure whether the template holds?

The 80 percent is a guideline, not an exact measurement. Still, the direction is easy to follow with three simple numbers per country:

- **Number of approved deviations**, split by the five groups in the table. If the group "different business" grows in several countries, it is time to extend the template.
- **Country-specific metadata.** Flows, record types or page layouts that exist for one country only. The number should be close to zero.
- **Test effort per release for the country.** If a country needs clearly more test cases than the others, it carries more deviations than the list shows.

## Where do you start?

Before the first country, decide what the goal is and write it down. If it is harmonisation, the guideline for the match and the request path for deviations follow from it. Then keep a list of deviations per country, with reason and approval date. In the steering committee this list shows better than any status report whether the template holds.

A global template holds when every deviation has a reason, an owner and a price. If you are planning a worldwide rollout, [send me a message](#contact) or read more about [change management](../../services/change-management-salesforce/).
