---
title: "Merchandising Agent: what it does for a parts catalog"
metaTitle: "Salesforce Merchandising Agent: features and limits"
description: "The Merchandising Agent in Salesforce B2B Commerce for spare parts stores: what is documented, what it consumes, which languages it supports and its limits."
pubDate: 2026-10-28
updatedDate: 2026-11-09
lang: en
slug: merchandising-agent-parts-catalog
translationKey: commerce-merchandising-agent
topic: commerce
categories: [b2b-commerce, ai]
tags: [B2B Commerce, Merchandising Agent, Agentforce, search, spare parts, catalog]
takeaways:
  - "The Salesforce pricing page lists Merchant Agent under Agentforce for both B2B Commerce editions, Growth and Advanced; no separate price is published."
  - "The Merchandising Agent for B2B has been generally available since August 2026. The help mainly documents promotions and business insights."
  - "Salesforce documents only English for Agentforce Merchandising. Test prompts and part terminology in other languages before a pilot."
  - "The agent needs generative AI, Agentforce and Data 360 and consumes Einstein Requests, including in sandboxes. Search rule limits still apply."
  - "Material numbers, units and sales status stay in the ERP or PIM; let the agent change search ranking and campaigns, not product master data."
faq:
  - q: "What is the Merchandising Agent in Salesforce B2B Commerce?"
    a: "It is a back-office agent for merchandisers. According to Salesforce, it boosts or buries products in search, creates new products and manages buyer accounts through conversation instead of clicks. Salesforce lists it for B2B as generally available since August 2026. You should check in a sandbox which actions are actually available in your org."
  - q: "Which languages does the Merchandising Agent support?"
    a: "Salesforce currently documents only English as a supported language for Agentforce Merchandising. For a team working in German or other languages, I would not assume that prompts work in production; I would test language, terminology and part numbers in your own org."
  - q: "Is the Merchant Agent included in B2B Commerce?"
    a: "The B2B pricing page lists Merchant Agent under Agentforce in both the Growth and the Advanced edition. The page does not state how agent usage is counted, so ask Salesforce to confirm the usage model in writing."
  - q: "What do I need to activate Agentforce Skills for Merchandising?"
    a: "Trailhead names Salesforce generative AI, Agentforce, bots and Data 360, all activated for the store, as prerequisites. Setup is done in the Commerce app without code, and licensing details are in the Salesforce Help article on enabling the skills."
  - q: "Should the Merchandising Agent create spare parts in the store?"
    a: "I would not let it create parts that exist in the ERP. Material number, unit and sales status are supplied by the ERP or PIM through the interface; the agent is suited to search ranking, campaigns and products that exist only in the store."
draft: false
---

The Merchandising Agent in Salesforce B2B Commerce handles back-office work through conversation: according to Salesforce, it boosts or buries products in search, creates products and manages buyer accounts. Its merchandising skills summarize order value and conversion and draft promotions. It is currently documented for English only. For a manufacturer's parts catalog, the most useful capability is search ranking: superseded parts move down, while current kits and wear parts move up. Product master data stays in the ERP or PIM, and I would have every change the agent makes reviewed. Merchant Agent is listed in both B2B Commerce editions; the B2B Merchandising Agent has been generally available since August 2026.

## What is the Merchandising Agent?

For running a store in Salesforce B2B Commerce, two agents matter. The Buyer Agent talks to dealers, which I cover in [B2B Buyer Agent: ordering through WhatsApp and SMS](/en/blog/b2b-buyer-agent-whatsapp-ordering/). The Merchandising Agent works for the team that runs the store.

Salesforce uses three names here, on different pages, and does not describe exactly the same scope on each page:

- **Merchant Agent** is the line item under Agentforce on the [B2B pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/), in both the Growth and the Advanced edition.
- **Merchandising Agent (B2B)** is listed on the [Commerce innovations page](https://www.salesforce.com/ca/commerce/innovations/) with "GA August '26". Salesforce calls it the back-office agent that "comes to B2B" and says you can tell it, through conversation instead of clicks, to boost or bury products in search, create new products or manage buyer accounts.
- **Agentforce Skills for Merchandising** is the title of the [Trailhead unit](https://trailhead.salesforce.com/content/learn/modules/agentforce-merchant-quick-look/get-to-know-your-merchant-agent) that explains KPI summaries and promotions. The B2B help also lists mainly promotions and business insights as topics.

Important for stores outside the English-speaking world: according to [Salesforce Help](https://help.salesforce.com/s/articleView?id=commerce.comm_agent_merchant_considerations.htm&language=en_US&type=5), Agentforce Merchandising currently supports English only. A merchandising team that works in German or another language should test language, terminology and part numbers in its own org before building a process on it.

```hinweis offen
Salesforce does not explain on these pages how the three are related for licensing purposes. I would ask the account team in writing which skills the included Merchant Agent covers in your contract.
```

## What can it do for a parts catalog?

A parts catalog is a store where search decides almost everything. Dealers type a part number, an old number or a short description, and they expect the current part at the top. Three of the agent's capabilities fit this use case well.

**Boost and bury.** Boost and bury rules raise or lower products in search and category results. Salesforce's [July 2026 post on B2B Commerce](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) gives these examples: raise high-margin, surplus or promoted products, and lower low-stock or end-of-life items. For spare parts this means superseded numbers down, the successor part and complete repair kits up. Today a merchandiser sets these rules by hand. Search supports rules based on attributes, and according to the innovations page the agent boosts or buries products in conversation. Whether it turns a request like "bury all filters marked end of life" into such a rule is something I would test in your own org.

**New products.** The agent can create products. That suits items that exist only in the store, such as a bundle of wear parts for a service interval. Parts from the ERP should continue to be supplied through the interface.

**Buyer accounts.** The agent can manage buyer accounts. For a manufacturer that means requests like "add the new branch of dealer X as a buyer account". The buyer group the account is assigned to decides what it sees and what it pays, so I would treat this skill with the most care. How buyer groups and entitlements are structured is the topic of the chapter [Catalog, search, entitlements](/en/masterclass/b2b-commerce/catalog-search-entitlements/).

## Summarise KPIs, draft promotions

According to Trailhead, Agentforce Skills for Merchandising retrieve and summarise average order value (AOV) and conversion rate for a store and identify derived insights such as the weakest category. Trailhead's example is a B2B store. The skills also suggest promotions by matching predefined promotion templates in Salesforce Commerce and generate the text, terms and configuration.

Trailhead calls this "semiautonomous": you review the promotion details and make changes before you publish it. For a manufacturer, promotions in a parts store are often small: a discount on a maintenance kit before the season, or free shipping above an order value. The agent saves the clicks. Whether a discount is allowed under dealer agreements and pricing rules remains a decision for sales.

Two KPIs matter more in parts stores than AOV: zero-result searches and the share of order lines placed through the store. Search analytics in Data Cloud, which the July post lists, show zero-result searches. Whether the agent can summarise those as well is not documented on the pages I read.

## Generative AI, Agentforce and Data 360 come first

Trailhead lists the prerequisites: Salesforce generative AI, Agentforce, bots and Data 360, all activated for the store. The current setup help no longer lists bots as a separate step; the help for your release is authoritative. Setup is guided in the Commerce app, and the topics and actions are preconfigured for Commerce. For licensing, Trailhead points to the Salesforce Help article on enabling Agentforce Skills for Merchandising.

The editions include Data Cloud credits: 250K in Growth and 500K in Advanced, according to the pricing page. For Agentforce Merchandising, however, Salesforce names Einstein Requests as the usage metric, possibly plus Data 360 credits, for both production and sandboxes. What a single request consumes is not published. I would therefore measure consumption in a sandbox with real requests before go-live; how such an estimate works is shown in [Agentforce costs for manufacturers](/en/blog/flex-credits-agentforce-cost-per-action/).

The store's limits also apply to the agent. The developer guide lists these values:

```kennzahlen
100 | boost and bury rules per store
100 | synonym rules per store
70 | searchable and filterable attributes plus sort rules combined
source: Salesforce Developers, [search limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html)
```

The help and release pages also split the limits by store-wide, category and keyword rules, some with lower values. Check the limits for your release in your org. An agent that writes a new rule for every request can exhaust the limit quickly either way. Rules must be cleaned up regularly, regardless of who created them.

## What should the agent not do?

Product master data belongs in the ERP or PIM. Material number, unit, sales status and successor part are maintained there, and the store receives a copy. If the agent changes a product in Salesforce, the next nightly load overwrites it, or worse, the store and the ERP diverge. I explain where which product data belongs in [B2B Commerce product data: PIM, ERP or Salesforce?](/en/blog/b2b-commerce-product-data-pim-erp/).

My rule for a parts store:

| Task | Agent | Reason |
|---|---|---|
| Boost and bury in search | Yes, with review | Store-only setting, reversible |
| Promotion from a template | Yes, with release by sales | Price effect, needs approval |
| Product that exists only in the store | Yes, with review | No ERP master |
| Part from the ERP material master | No | ERP or PIM is master |
| New buyer account | Only with a named approver | Decides visibility and prices |

Every agent change should be traceable: who requested it, what changed and who approved it. The Salesforce logs available for this are covered in [Audit trail for AI agents in Salesforce: which logs?](/en/blog/audit-trail-ai-agents-salesforce/).

## Example: 60,000 spare parts for 300 dealers

Assume a manufacturer of compressors runs a B2B store with 60,000 spare parts for 300 dealers. Every quarter, engineering supersedes a few hundred part numbers. Today one merchandiser maintains search rules by hand and is two months behind.

With the agent, after each ERP update the merchandiser asks: "bury every part whose sales status is superseded and boost its successor". The agent proposes the rules, the merchandiser checks a sample and releases them. Once a month, the merchandiser asks for the previous month's zero-result searches and passes missing old numbers to the PIM team as synonyms or attributes. The search side of this is covered in [B2B Commerce search: finding parts by part number](/en/blog/b2b-commerce-search-part-numbers/).

## Clarify the license and included skills

1. **Clarify the license.** Ask which skills the included Merchant Agent covers and how usage is counted.
2. **Fix the data first.** A clean sales status and successor part in the ERP are what make good boost and bury requests possible.
3. **Start with search ranking.** It is reversible, stays within the store and can quickly show measurable improvements in zero-result searches.
4. **Set review rules.** Promotions and buyer accounts only with a named approver.
5. **Watch the limits.** Know the rule limits of your release and clean up monthly.
6. **Test the language.** Check non-English prompts and part numbers in the pilot as long as Salesforce documents English only.

The chapter [Agents, migration, rollout](/en/masterclass/b2b-commerce/agentforce-migration-rollout/) of the [B2B Commerce masterclass](/en/masterclass/b2b-commerce/) discusses the Merchandising Agent alongside the Buyer Agent and the rollout. For the question of who owns which data between ERP, PIM and Salesforce, see [Salesforce architecture](/en/services/salesforce-architecture/).
