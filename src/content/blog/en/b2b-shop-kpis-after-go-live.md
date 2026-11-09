---
title: "B2B shop KPIs: what to measure after go-live"
description: "Which KPIs show whether a Salesforce B2B store works after go-live: share of order lines, zero-result searches, conversion, inside sales effort, Data 360."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: b2b-shop-kpis-after-go-live
translationKey: commerce-kpis-after-go-live
topic: commerce
categories: [b2b-commerce]
tags: [b2b commerce, kpis, search analytics, data 360, inside sales, conversion]
takeaways:
  - "The main KPI is the share of eligible order lines through the store, per buyer group. Store revenue alone does not show whether dealers switched."
  - "Zero-result searches show missing part numbers and synonyms. The Search Intelligence dashboard on Data 360 reports them, along with click-through rates."
  - "The Merchant Agent, included in Growth and Advanced, can summarise average order value and site conversion for a store in conversation."
  - "Inside sales minutes per order line and correction effort per store order line show whether the store saves work or only moves it."
  - "Growth includes 250K and Advanced 500K Data 360 credits. They are a cost factor, not a hard limit, so check consumption in Digital Wallet."
faq:
  - q: "Which KPIs matter most for a B2B shop after go-live?"
    a: "The share of eligible order lines through the store per buyer group, zero-result searches, conversion from search to order, inside sales minutes per order line and the correction effort per store order line. Together they show adoption, findability and whether the store saves work."
  - q: "Does Salesforce B2B Commerce have search analytics?"
    a: "Yes. Salesforce announced search analytics with the July 2026 B2B Commerce release. The Search Intelligence dashboard in Salesforce Help shows total searches, searches with and without results, click-through rates and search terms. It needs Data 360 (formerly Data Cloud) for B2B Commerce, so it consumes Data 360 credits. Conversion from a search to an order is not part of the documented dashboard."
  - q: "How many Data 360 credits are included in B2B Commerce?"
    a: "According to the Salesforce pricing page, which still says Data Cloud credits, Commerce Cloud B2B Growth Edition includes 250K and Advanced Edition 500K. Salesforce does not publish how many credits search analytics uses. Once the allowance is used up, extra credits or overage at your contract rate apply, so watch consumption in Digital Wallet."
  - q: "When should the first KPI review take place?"
    a: "Errors, ERP rejections and zero-result searches need a weekly look from day one. I plan the first adoption review about three months after a buyer group goes live and repeat it per wave, because earlier figures mostly show curiosity, not habits. The baseline has to be collected before go-live."
draft: false
---

After go-live, five numbers show whether a B2B store works: the share of order lines that arrive through the store per buyer group, zero-result searches, conversion from search to order, inside sales minutes per order line, and the correction effort per store order line. They show adoption, findability and whether the store saves work or only moves it. Salesforce supplies part of the data through search analytics on Data 360 and the Merchant Agent; the rest comes from the ERP and your own baseline. Review adoption per buyer group about three months after each wave, and watch the Data 360 credits.

## Which KPIs show whether a B2B shop works?

A B2B store for dealers has a different job than a consumer shop. Dealers often already have an established ordering channel; the question is whether they order through the store and whether that costs you less. So I use these five KPIs and leave out traffic figures such as visits:

| KPI | Question it answers | Source |
|---|---|---|
| Share of eligible order lines through the store | Do dealers switch? | ERP, by order channel |
| Zero-result searches | Do dealers find their parts? | Search Intelligence on Data 360 |
| Conversion from search to order | Does finding lead to buying? | Own analysis: click-through from Search Intelligence plus order data |
| Inside sales minutes per order line | Does the store save work? | Own time study, before and after |
| Correction effort per store order line | Is the data right? | ERP rejection and change logs, integration errors or a correction reason field |

These five are the same ones I would put into the [business case for a B2B webshop](../b2b-webshop-business-case-manufacturers/). The review after go-live checks the assumptions of that business case against reality.

## Why order lines and not revenue?

Revenue through the store is the number every dashboard shows first, but on its own it does not prove channel adoption. One large project order through the store pushes revenue up without a single dealer changing habits. Order lines are usually a better proxy for the work, because typing effort grows with the number of lines more than with their value. Price deviations, configuration and delivery dates add effort too, so check the proxy against the time study.

I measure the share of order lines through the store per buyer group, counted against the lines that are eligible for the store. EDI orders, configured products and project orders stay out of the denominator, otherwise a group can never reach a high share and the KPI rewards moving efficient EDI into the store. I measure per buyer group, because buyer groups are the waves of the rollout described in [B2B shop rollout to dealers](../b2b-shop-dealer-rollout/). A group that stays at 10 percent after three months needs a conversation with its dealers. A group at 60 percent shows what works. The total across all dealers hides both.

The source is the ERP, because it holds all orders from all channels. The store's orders need a channel marker that survives the transfer to the ERP, so that each order line can be assigned to the store, phone, email or EDI. Agree on that field when you design the order interface, not at the first KPI review.

## What does search analytics show?

Spare parts dealers search by part number, old part number or description. If the search finds nothing, the dealer picks up the phone. That makes zero-result searches the most useful early warning a store has.

With the July 2026 B2B Commerce release, Salesforce announced [search analytics via Data Cloud](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/), now Data 360, with "conversion outcomes" in the announcement. The [Search Intelligence dashboard](https://help.salesforce.com/s/articleView?id=commerce.comm_intelligence_dashboards_search.htm&type=5) documented in Salesforce Help shows total searches, searches with and without results, click-through rates and the search terms behind them. Conversion from a search to an order is not among them, so treat it as your own analysis with a defined attribution, for example a click on a result and an order in the same session. I review the list of zero-result terms every two weeks in the first months. Most entries belong to one of four causes: an old part number missing as an attribute or synonym, a spelling the dealers use, a part missing from the catalog or entitlement by mistake, or a part the buyer group correctly may not buy, where the store should explain that and point to a successor or a contact. The first two are search setup, see [B2B Commerce search: finding parts by part number](../b2b-commerce-search-part-numbers/). Keep the limits in mind: the [search limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html) allow 100 synonym rules per store as a hard limit, so superseded numbers belong in attributes rather than synonyms.

Click-through shows the next step: a search that finds 50 results but leads to no click usually means bad sorting. Boost and bury rules help here; Salesforce allows up to 100 of them.

## The Merchant Agent summarises order value and conversion

According to the [Salesforce pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/), both B2B editions, Growth and Advanced, include the Merchant Agent. The [Trailhead module on the Merchant Agent](https://trailhead.salesforce.com/content/learn/modules/agentforce-merchant-quick-look/get-to-know-your-merchant-agent) shows it retrieving and summarising the average order value of a store and naming the weakest category, and it answers requests for site conversion details. For setup, you activate generative AI, Agentforce, bots and Data 360 for the store.

I find that useful for a merchandiser's weekly question, "which category dropped?". For the KPI review with management I would not rely on chat answers. Use the agent to find a topic, then check the number in a report you can reproduce. The editions also include CRM Analytics user licenses, 3 on Growth and 5 on Advanced. Check whether that covers administrators, dashboard owners and regular readers in your operating model.

## Measure saved work in inside sales minutes per line

Inside sales minutes per order line is the KPI that pays for the store, and Salesforce cannot measure it for you. It needs a baseline from before go-live: for two weeks, inside sales notes how long typing in a phone or email order takes, split by order lines. Repeat the same study three months after each wave.

The second number is the correction effort: manual correction minutes divided by store order lines. Track it alongside the share of store orders that need any correction, and record the cause in a correction reason field or from ERP rejection logs. Typical causes are a wrong delivery address, a price difference or a part the ERP rejects. A high rate means the store creates work instead of saving it. Usually the cause is data: price books that differ from the ERP, or entitlements for parts that can no longer be ordered.

Worked example: before go-live, inside sales handles 40,000 order lines a year at 4 minutes each, about 2,670 hours. After six months, 45 percent of the lines, 18,000, arrive through the store, and 3 percent of those lines need a correction of 10 minutes. The saving is about 1,200 hours of typing minus 90 hours of corrections. At a correction rate of 20 percent, corrections would eat 600 hours, half of the saving.

## 250K or 500K Data 360 credits make consumption a cost factor

Search analytics runs on Data 360, formerly Data Cloud, and Data 360 work consumes credits from your edition's allowance. The credits do not stop the analysis: once they are used up, extra credits or overage at your contract rate apply.

```kennzahlen
250K | Data 360 credits in Commerce Cloud B2B Growth
500K | Data 360 credits in Commerce Cloud B2B Advanced
source: Salesforce pricing page for Commerce Cloud B2B (still labeled Data Cloud credits), as of November 9, 2026
```

According to [Trailhead on credit consumption](https://trailhead.salesforce.com/content/learn/modules/data-cloud-credit-consumption-quick-look/get-started-with-data-cloud-credit-consumption), ingestion, queries for reports and dashboards, segmentation and calculated insights each consume credits, calculated insights again on every refresh. Ingesting data from your Salesforce org through the CRM connector does not consume credits.

Salesforce does not publish how many credits search analytics uses. So check consumption in Digital Wallet after the first month and again after changes to data volume, transform schedules or dashboard refresh frequency. Those drive consumption more than the number of dashboards. How credits relate to other AI costs is covered in the AI masterclass chapter on [costs and tokens](../../masterclass/ai-salesforce/costs-and-tokens/).

## Take baselines before go-live

Measuring starts before go-live, not after it.

```schritte
Collect the baseline | 2 weeks · inside sales
  Order lines per channel and buyer group from the ERP, plus inside sales time per order line.
Agree on the channel marker
  In the design of the order interface, so every line keeps its channel.
First review | 3 months after the first wave
  Fix the date before go-live and repeat the same measurements. Errors, ERP rejections and zero-result searches get a weekly look from day one.
Repeat per wave
  Every further buyer group is measured three months after its go-live.
```

The same discipline for agents is described in [Agentforce KPIs after go-live](../agentforce-kpis-after-go-live/). The whole chapter is in the masterclass on [agents, migration and rollout](../../masterclass/b2b-commerce/agentforce-migration-rollout/).
