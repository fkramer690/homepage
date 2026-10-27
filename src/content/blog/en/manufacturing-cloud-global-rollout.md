---
title: "Rolling Out Manufacturing Cloud Globally: the Order"
description: "In which order manufacturers roll out Manufacturing Cloud across countries, why 80 percent should be identical and why change management belongs in it."
pubDate: 2026-10-27
lang: en
slug: manufacturing-cloud-global-rollout
translationKey: manufacturing-cloud-global-rollout
topic: governance
category: manufacturing-cloud
tags: [Manufacturing Cloud, Rollout, Harmonisation, Change Management, Manufacturing]
series: { id: manufacturing-cloud, part: 8 }
takeaways:
  - "A global Manufacturing Cloud rollout starts with the strategic goal. Usually that is process harmonisation, and the order of countries follows from it."
  - "I start with a large country of reasonable complexity and include one of the biggest regions in the first two phases, so the global template is tested under real load early."
  - "All countries should work at least 80 percent identically. Every deviation per country is justified and kept as small as possible."
  - "Differences in processes, business units, IT systems and brands per country decide which country comes when."
  - "Change management belongs in every rollout, even when the client thinks they do not need it."
faq:
  - q: "Which country should a global Salesforce rollout start with?"
    a: "With a large country of reasonable complexity. It has to be big enough to test the global template seriously and must not be so special that its edge cases shape the template for everyone else."
  - q: "How much may a country deviate from the global template?"
    a: "My rule of thumb: all countries work at least 80 percent identically, and the delta per country is actively kept small. Legal requirements are given, everything else is justified and decided."
  - q: "Does a Salesforce rollout need change management?"
    a: "Yes. A rollout aimed at harmonising processes changes how people work in every country. So I keep bringing change management up, even when the client does not think it is needed at first."
draft: false
---

A global Manufacturing Cloud rollout starts with a decision that comes before any configuration: which strategic goal is it meant to achieve? Usually it is process harmonisation. That shapes how I plan the rollout: start with a large country of reasonable complexity, include one of the biggest regions in the first two phases, and keep all countries at least 80 percent identical. These are my lessons from the first global Manufacturing Cloud rollout I worked on. The most important one sounds the least technical: change management belongs in it, even when nobody asks for it.

## What has to be settled before the first country?

The goal. A rollout meant to harmonise processes is planned differently from one meant to give every country its own CRM. For manufacturers with entities in many countries it is usually about harmonisation: the same sales processes, the same sales agreements, the same reports for headquarters.

That goal leads to a global template, the shared configuration every country adopts. For Manufacturing Cloud it includes at least the decisions from the earlier parts of this series:

- **The level of the account hierarchy** sales agreements sit on, from [part 3](../sales-agreements-volume-shortfall-erp/).
- **The rule for when a configuration becomes its own product**, from [part 2](../quote-to-sales-agreement-product-configurator/).
- **What customers see in the portal**, from [part 7](../manufacturing-cloud-customer-portal/).

After the first country, these points can hardly be changed without touching every country already live. So each of them goes into the decision log before the first country goes live. How I keep that log is described under [Salesforce architecture](../../services/salesforce-architecture/).

## Which country do you start with?

A large country of reasonable complexity. Both count:

- **Big enough** for the template to see real volumes, real users and real edge cases. A small pilot country confirms a template that later fails at the first large country.
- **Not too special**, so its quirks do not shape the template for everyone else. A country with an unusual sales model or its own product line is a poor starting point, even if it is large.

A second rule comes with it: one of the biggest regions should be part of the first two phases. If it only comes in phase five, it meets a template that grew on smaller countries and demands changes that affect every country already live. The earlier the large region is in, the cheaper those changes are.

## What decides the order after that?

Three questions, answered differently for each country:

1. **How similar are the processes?** Countries that already sell and invoice in a similar way go faster. Countries with their own processes need more time for harmonisation.
2. **Which business units are there?** An entity with several business units is a bigger step than one with a single unit.
3. **What do the IT systems look like?** A country with its own ERP, its own middleware or its own legacy systems needs new integrations. If it shares the ERP with a country already live, the path is shorter.

That does not produce a formula, but it does produce an order you can justify. I lay it out in a table with one row per country and one column per question. It makes visible why one country comes in phase two and another in phase four, and the discussion about it becomes more factual.

## What if entities operate under different brands?

Plan for it. In some companies, entities in different countries operate under different brands or names, often after acquisitions. To the customer it is a different company, internally it is the same group.

In Salesforce that touches more than you expect in the first workshop:

- **Customer portal:** which brand does the customer see when they log in?
- **Documents and emails:** quotes, order confirmations and notifications carry the logo and name of the right entity.
- **Reports:** headquarters wants to report across brands, the country by its own brand.
- **Data:** the brand has to live somewhere in the data model so portal, documents and reports know it.

So I put the brand into the template as its own question, even if the first country only has one. If the second brand only appears in the third country, it otherwise becomes a deviation every other country has to carry.

## How do you keep deviations per country small?

With a rule of thumb and a process. The rule of thumb: all countries work at least 80 percent identically, and for each country the aim is to minimise the delta. Countries after the first should only show marginal deviations.

The process is simple but needs discipline:

1. **Every local requirement is recorded**, with a reason.
2. **Legal requirements are given.** Tax, invoicing or data protection differ, and they are not up for debate.
3. **Everything else is decided** by one body responsible for the template. The requirement either goes into the template for everyone, becomes a local exception, or is rejected.
4. **Exceptions are counted.** If you know the exceptions per country, you see early when a country drifts away from the template.

With several implementation partners, for example one per region, that decision belongs on the client side. Otherwise each partner builds its own template. How I steer several partners within one framework is described under [partner governance](../../services/partner-governance/).

## Why change management, even when nobody asks for it?

Because harmonisation means people work differently. In every country that follows the template, processes, reports and habits change. A sales team that kept its volumes in its own spreadsheet does not automatically work with sales agreements just because they are live.

Many clients think they do not need change management. The budget is allocated, the training is planned, and users will get used to it. I still keep bringing it up, during planning, before each country and after each go-live. At least three things belong to it per country:

- **Key users** who know the template and answer the first questions in the country.
- **Communication before go-live** that explains what changes and why, not just where to click.
- **A look at usage after go-live**, so it shows when a country keeps working with its own lists next to Salesforce.

How I plan the introduction of new processes on the client side is described under [change management for Salesforce programmes](../../services/change-management-salesforce/).

## Where should you start?

Before the first country is planned, settle five points:

1. **The goal.** Harmonisation or local freedom, in writing and backed by management.
2. **The template.** Account level, product rule, portal and the other base decisions in the decision log.
3. **The first country and the large region.** Big enough, not too special, and the large region in the first two phases.
4. **The order.** A table with processes, business units, IT systems and brands per country.
5. **Change management.** Key users, communication and usage per country, planned from the start.

A global rollout succeeds when the template is tested under real load early and every further country changes only a little. If you are planning a Manufacturing Cloud rollout across several countries, [send me a message](#contact).
