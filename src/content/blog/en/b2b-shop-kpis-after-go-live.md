---
title: "B2B shop KPIs: what to measure after go-live"
description: "Which KPIs show whether a Salesforce B2B store works after go-live: share of order lines, zero-result searches, conversion, inside sales effort, credits."
pubDate: 2026-10-28
lang: en
slug: b2b-shop-kpis-after-go-live
translationKey: commerce-kpis-after-go-live
topic: commerce
categories: [b2b-commerce]
tags: [b2b commerce, kpis, search analytics, data cloud, inside sales, conversion]
takeaways:
  - "The main KPI of a B2B store is the share of order lines that arrive through the store, per buyer group. Revenue through the store alone hides whether dealers really switched."
  - "Zero-result searches show missing part numbers and synonyms. Salesforce announced search analytics via Data Cloud in July 2026, with queries, click-through, conversions and zero-result searches."
  - "The Merchant Agent, included in Growth and Advanced, can summarise average order value and site conversion for a store in conversation."
  - "Inside sales minutes per order line and the rate of orders that need manual correction show whether the store saves work or only moves it."
  - "Growth includes 250K and Advanced 500K Data Cloud credits. Check consumption in Digital Wallet before you build more dashboards on Data Cloud."
faq:
  - q: "Which KPIs matter most for a B2B shop after go-live?"
    a: "The share of order lines through the store per buyer group, zero-result searches, conversion from search to order, inside sales minutes per order line and the rate of orders that need manual correction. Together they show adoption, findability and whether the store saves work."
  - q: "Does Salesforce B2B Commerce have search analytics?"
    a: "Salesforce announced search analytics via Data Cloud with the July 2026 B2B Commerce release. It reports search queries, click-through rates, conversion outcomes and zero-result searches. It uses Data Cloud, so it consumes the Data Cloud credits included in your edition."
  - q: "How many Data Cloud credits are included in B2B Commerce?"
    a: "According to the Salesforce pricing page, Commerce Cloud B2B Growth Edition includes 250K Data Cloud credits and Advanced Edition 500K. Salesforce does not publish how many credits search analytics uses, so watch consumption in Digital Wallet."
  - q: "When should the first KPI review take place?"
    a: "I plan the first review about three months after a buyer group goes live and repeat it per wave. Earlier figures mostly show curiosity, not habits. The baseline from the time before the store has to be collected before go-live."
draft: false
---

After go-live, five numbers show whether a B2B store works: the share of order lines that arrive through the store per buyer group, zero-result searches, conversion from search to order, inside sales minutes per order line, and the rate of orders that need manual correction. They show adoption, findability and whether the store saves work or only moves it. Salesforce supplies part of the data through search analytics via Data Cloud and the Merchant Agent; the rest comes from the ERP and your own baseline. Measure per buyer group, about three months after each wave, and watch the Data Cloud credits.

## Which KPIs show whether a B2B shop works?

A B2B store for dealers has a different job than a consumer shop. Dealers order anyway; the question is whether they order through the store and whether that costs you less. So I use these five KPIs and leave out traffic figures such as visits:

| KPI | Question it answers | Source |
|---|---|---|
| Share of order lines through the store | Do dealers switch? | ERP, by order channel |
| Zero-result searches | Do dealers find their parts? | Search analytics via Data Cloud |
| Conversion from search to order | Does finding lead to buying? | Search analytics, Merchant Agent |
| Inside sales minutes per order line | Does the store save work? | Own time study, before and after |
| Orders needing manual correction | Is the data right? | ERP or order summaries in Salesforce |

These five are the same ones I would put into the [business case for a B2B webshop](../b2b-webshop-business-case-manufacturers/). The review after go-live checks the assumptions of that business case against reality.

## Why order lines and not revenue?

Revenue through the store is the number every dashboard shows first, and it is misleading. One large project order through the store pushes revenue up without a single dealer changing habits. Order lines show the work: inside sales effort grows with the number of lines typed in, not with their value.

I measure the share of order lines through the store per buyer group, because buyer groups are the waves of the rollout described in [B2B shop rollout to dealers](../b2b-shop-dealer-rollout/). A group that stays at 10 percent after three months needs a conversation with its dealers. A group at 60 percent shows what works. The total across all dealers hides both.

The source is the ERP, because it holds all orders from all channels. The store's orders need a channel marker that survives the transfer to the ERP, so that each order line can be assigned to the store, phone, email or EDI. Agree on that field when you design the order interface, not at the first KPI review.

## What does search analytics show?

Spare parts dealers search by part number, old part number or description. If the search finds nothing, the dealer picks up the phone. That makes zero-result searches the most useful early warning a store has.

With the July 2026 B2B Commerce release, Salesforce announced [search analytics via Data Cloud](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/): visibility into search queries, click-through rates, conversion outcomes and zero-result searches. I review the list of zero-result terms every two weeks in the first months. Most entries belong to one of three causes: an old part number missing as an attribute or synonym, a spelling the dealers use, or a part that is not in the buyer group's entitlement. The first two are search setup, see [B2B Commerce search: finding parts by part number](../b2b-commerce-search-part-numbers/). Keep the limits in mind: the [search limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) allow 100 synonym rules per store as a hard limit, so superseded numbers belong in attributes rather than synonyms.

Click-through and conversion show the next step: a search that finds 50 results but leads to no click usually means bad sorting. Boost and bury rules help here; Salesforce allows up to 100 of them.

## What can the Merchant Agent report?

According to the [Salesforce pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/), both B2B editions, Growth and Advanced, include the Merchant Agent. The [Trailhead module on the Merchant Agent](https://trailhead.salesforce.com/content/learn/modules/agentforce-merchant-quick-look/get-to-know-your-merchant-agent) shows it retrieving and summarising the average order value of a store and naming the weakest category, and it answers requests for site conversion details. For setup, you activate generative AI, Agentforce, bots and Data 360 for the store.

I find that useful for a merchandiser's weekly question, "which category dropped?". For the KPI review with management I would not rely on chat answers. Use the agent to find a topic, then check the number in a report you can reproduce. The editions also include CRM Analytics, 3 users on Growth and 5 on Advanced, which is enough for the people who build and own the dashboard.

## How do you measure the work saved?

Inside sales minutes per order line is the KPI that pays for the store, and Salesforce cannot measure it for you. It needs a baseline from before go-live: for two weeks, inside sales notes how long typing in a phone or email order takes, split by order lines. Repeat the same study three months after each wave.

The second number is the rate of store orders that someone has to correct by hand, for example because of a wrong delivery address, a price difference or a part the ERP rejects. A high rate means the store creates work instead of saving it. Usually the cause is data: price books that differ from the ERP, or entitlements for parts that can no longer be ordered.

A typical scenario, as an assumption: before go-live, inside sales handles 40,000 order lines a year at 4 minutes each, about 2,670 hours. After six months, 45 percent of the lines, 18,000, arrive through the store, and 3 percent of those lines need a correction of 10 minutes. The saving is about 1,200 hours of typing minus 90 hours of corrections. At a correction rate of 20 percent, corrections would eat 600 hours, half of the saving.

## What do the Data Cloud credits limit?

Search analytics runs on Data Cloud, and Data Cloud work consumes credits from your edition's allowance.

```kennzahlen
250K | Data Cloud credits in Commerce Cloud B2B Growth
500K | Data Cloud credits in Commerce Cloud B2B Advanced
source: Salesforce pricing page for Commerce Cloud B2B
```

According to [Trailhead on credit consumption](https://trailhead.salesforce.com/content/learn/modules/data-cloud-credit-consumption-quick-look/get-started-with-data-cloud-credit-consumption), ingestion, queries for reports and dashboards, segmentation and calculated insights each consume credits, calculated insights again on every refresh. Ingesting data from your Salesforce org through the CRM connector does not consume credits.

Salesforce does not publish how many credits search analytics uses. So check consumption in Digital Wallet after the first month, before someone builds ten more dashboards on Data Cloud. How credits relate to other AI costs is covered in the AI masterclass chapter on [costs and tokens](../../masterclass/ai-salesforce/costs-and-tokens/).

## Where should you start?

Measuring starts before go-live, not after it.

```schritte
Collect the baseline | 2 weeks · inside sales
  Order lines per channel and buyer group from the ERP, plus inside sales time per order line.
Agree on the channel marker
  In the design of the order interface, so every line keeps its channel.
First review | 3 months after the first wave
  Fix the date before go-live and repeat the same measurements.
Repeat per wave
  Every further buyer group is measured three months after its go-live.
```

The same discipline for agents is described in [Agentforce KPIs after go-live](../agentforce-kpis-after-go-live/), and the whole chapter is in the masterclass on [agents, migration and rollout](../../masterclass/b2b-commerce/agentforce-migration-rollout/).

A B2B store works when dealers order more lines through it and inside sales types fewer, and only a baseline from before go-live proves that.
