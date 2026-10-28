---
title: "Merchandising Agent: what it does for a parts catalog"
description: "What the Merchandising Agent in Salesforce B2B Commerce does for a manufacturer's parts catalog: boost and bury, products, buyer accounts, KPIs, and its limits."
pubDate: 2026-10-28
lang: en
slug: merchandising-agent-parts-catalog
translationKey: commerce-merchandising-agent
topic: commerce
categories: [b2b-commerce, ai]
tags: [B2B Commerce, Merchandising Agent, Agentforce, search, spare parts, catalogue]
takeaways:
  - "Both B2B Commerce editions, Growth and Advanced, list Merchant Agent under Agentforce on the Salesforce pricing page; no separate price is published."
  - "The Merchandising Agent for B2B is dated August 2026 and boosts or buries products in search, creates new products and manages buyer accounts in conversation."
  - "Agentforce Skills for Merchandising summarise AOV and conversion rate for a store and draft promotions from predefined templates, which a person reviews before use."
  - "The agent needs generative AI, Agentforce and Data 360 activated; a store allows at most 100 boost and bury rules, whether a person or an agent writes them."
  - "Material numbers, units and sales status stay in the ERP or PIM; let the agent change search ranking and campaigns, not product master data."
faq:
  - q: "What is the Merchandising Agent in Salesforce B2B Commerce?"
    a: "It is a back office agent for merchandisers. According to Salesforce, it boosts or buries products in search, creates new products and manages buyer accounts through conversation instead of clicks. Salesforce lists it for B2B with general availability in August 2026."
  - q: "Is the Merchant Agent included in B2B Commerce?"
    a: "The B2B pricing page lists Merchant Agent under Agentforce in both the Growth and the Advanced edition. How agent usage is counted is not stated there, so ask for it in writing."
  - q: "What do I need to activate Agentforce Skills for Merchandising?"
    a: "Trailhead names Salesforce generative AI, Agentforce, bots and Data 360, activated for the store. Setup runs in the Commerce app without code, and licensing details are in the Salesforce Help article on enabling the skills."
  - q: "Should the Merchandising Agent create spare parts in the store?"
    a: "I would not let it create parts that exist in the ERP. Material number, unit and sales status come from the ERP or PIM through the interface; the agent fits search ranking, campaigns and products that exist only in the store."
draft: false
---

The Merchandising Agent in Salesforce B2B Commerce does back office work in conversation: it boosts or buries products in search, creates products and manages buyer accounts, and its merchandising skills summarise order value and conversion and draft promotions. For a manufacturer's parts catalogue the useful part is search ranking: superseded parts down, current kits and wear parts up. Product master data stays in the ERP or PIM, and I would have every change the agent makes reviewed. Merchant Agent is listed in both editions; Salesforce dates the B2B Merchandising Agent to August 2026.

## What is the Merchandising Agent?

Salesforce B2B Commerce, which Salesforce now also markets as "Agentforce Commerce for B2B", has two kinds of agents. The Buyer Agent talks to dealers, which I cover in [B2B Buyer Agent: ordering through WhatsApp and SMS](../b2b-buyer-agent-whatsapp-ordering/). The Merchandising Agent works for the people who run the store.

Salesforce uses three names here, and they appear on different pages:

- **Merchant Agent** is the line item under Agentforce on the [B2B pricing page](https://www.salesforce.com/editions-pricing/commerce-cloud/b2b/), in both the Growth and the Advanced edition.
- **Merchandising Agent (B2B)** is listed on the [Commerce innovations page](https://www.salesforce.com/ca/commerce/innovations/) with "GA August '26". Salesforce calls it the back office agent that "comes to B2B" and says you can tell it to boost or bury products in search, spin up new products or manage buyer accounts, done in conversation instead of clicks.
- **Agentforce Skills for Merchandising** is the title of the [Trailhead unit](https://trailhead.salesforce.com/content/learn/modules/agentforce-merchant-quick-look/get-to-know-your-merchant-agent) that explains KPI summaries and promotions.

Salesforce does not explain on these pages how the three relate in licensing. I would ask the account team in writing which skills the included Merchant Agent covers in your contract.

## What can it do for a parts catalogue?

A parts catalogue is a store where search decides almost everything. Dealers type a part number, an old number or a short description, and they expect the current part at the top. Three of the agent's jobs fit this well.

**Boost and bury.** Boost and bury rules raise or lower products in search and category results. Salesforce's [July 2026 post on B2B Commerce](https://www.salesforce.com/blog/b2b-commerce-innovations-july-26/) names the examples: high margin, surplus or promoted products up, low stock or end of life items down. For spare parts this means superseded numbers down, the successor part and complete repair kits up. Today a merchandiser sets these rules by hand; with the agent, a request like "bury all filters marked end of life" becomes a rule.

**New products.** The agent can create products. That suits items that exist only in the store, such as a bundle of wear parts for a service interval. Parts that come from the ERP should keep arriving through the interface.

**Buyer accounts.** The agent can manage buyer accounts. For a manufacturer that means requests like "add the new branch of dealer X as a buyer account". Which buyer group the account lands in decides what it sees and what it pays, so I would treat this skill with the most care. How buyer groups and entitlements are structured is the topic of the chapter [Catalogue, search, entitlements](../../masterclass/b2b-commerce/catalog-search-entitlements/).

## What do KPI summaries and promotions add?

According to Trailhead, Agentforce Skills for Merchandising retrieve and summarise average order value (AOV) and conversion rate for a store and name derived insights such as the weakest category. Trailhead's example is a B2B store. The skills also suggest promotions by matching predefined promotion templates in Salesforce Commerce and generate the text, terms and configuration.

Trailhead calls this "semiautonomous": you review the promotion details and make changes before you send it out. For a manufacturer, promotions in a parts store are often small: a discount on a maintenance kit before the season, or free shipping above an order value. The agent saves the clicks. Whether a discount is allowed under dealer agreements and pricing rules stays a decision for sales.

Two KPIs matter more in parts stores than AOV: zero result searches and the share of order lines through the store. Search analytics through Data Cloud, which the July post lists, shows zero result searches. Whether the agent can summarise those as well is not documented on the pages I read.

## What does the agent need before it works?

Trailhead lists the prerequisites: Salesforce generative AI, Agentforce, bots and Data 360 activated for the store. Setup runs in the Commerce app with guided steps, and the topics and actions come preconfigured for Commerce. For licensing, Trailhead points to the Salesforce Help article on enabling Agentforce Skills for Merchandising.

The editions include Data Cloud credits: 250K in Growth and 500K in Advanced, according to the pricing page. What the agent consumes per request is not published. I would therefore measure consumption in a sandbox with real requests before go-live; how such an estimate works is shown in [Flex Credits: estimating Agentforce cost per action](../flex-credits-agentforce-cost-per-action/).

The store's limits also apply to the agent. According to the [search limits](https://developer.salesforce.com/docs/commerce/salesforce-commerce/guide/b2b-b2c-comm-data-model-search-limits.html), a store has at most 100 boost and bury rules and 100 synonym rules, both hard limits, and searchable attributes, filterable attributes and sort rules share a maximum of 70. An agent that writes a new rule for every request uses up the 100 quickly. Someone has to clean up rules regularly, whoever created them.

## What should the agent not do?

Product master data belongs in the ERP or PIM. Material number, unit, sales status and successor part are maintained there, and the store receives a copy. If the agent changes a product in Salesforce, the next nightly load overwrites it, or worse, the store and the ERP diverge. I explain where which product data belongs in [B2B Commerce product data: PIM, ERP or Salesforce?](../b2b-commerce-product-data-pim-erp/).

My rule for a parts store:

| Task | Agent | Reason |
|---|---|---|
| Boost and bury in search | Yes, with review | Store-only setting, reversible |
| Promotion from a template | Yes, with release by sales | Price effect, needs approval |
| Product that exists only in the store | Yes, with review | No ERP master |
| Part from the ERP material master | No | ERP or PIM is master |
| New buyer account | Only with a named approver | Decides visibility and prices |

Every agent change should be traceable: who asked, what changed, who released it. Which logs Salesforce offers for this is covered in [Audit trail for AI agents in Salesforce: which logs?](../audit-trail-ai-agents-salesforce/).

## What could this look like in practice?

A typical scenario, as an assumption: a manufacturer of compressors runs a B2B store with 60,000 spare parts for 300 dealers. Every quarter, engineering supersedes a few hundred part numbers. Today one merchandiser maintains search rules by hand and is two months behind.

With the agent, the merchandiser asks after each ERP update: "bury every part whose sales status is superseded and boost its successor". The agent proposes the rules, the merchandiser checks a sample and releases them. Once a month the merchandiser asks for the zero result searches of the last month and passes missing old numbers to the PIM team as synonyms or attributes. The search side of this is covered in [B2B Commerce search: finding parts by part number](../b2b-commerce-search-part-numbers/).

## Where should you start?

1. **Clarify the licence.** Ask which skills the included Merchant Agent covers and how usage is counted.
2. **Fix the data first.** A clean sales status and successor part in the ERP are what make good boost and bury requests possible.
3. **Start with search ranking.** It is reversible, stays within the store and shows results in zero result searches quickly.
4. **Set review rules.** Promotions and buyer accounts only with a named approver.
5. **Watch the limits.** 100 boost and bury rules per store, with a monthly cleanup.

The chapter [Agents, migration, rollout](../../masterclass/b2b-commerce/agentforce-migration-rollout/) of the [B2B Commerce masterclass](../../masterclass/b2b-commerce/) places the Merchandising Agent next to the Buyer Agent and the rollout. For the question of who owns which data between ERP, PIM and Salesforce, see [Salesforce architecture](../../services/salesforce-architecture/).

The Merchandising Agent saves clicks in search and campaigns, as long as product master data stays where it is maintained today. If you want an independent view on your parts store, [send me a message](#contact).
