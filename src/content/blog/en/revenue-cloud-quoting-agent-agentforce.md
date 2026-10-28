---
title: "Revenue Cloud quoting agent: what it can do today"
description: "What the Agentforce quoting agent in Revenue Cloud does for an internal sales desk, what has to be in place first, what it costs and where it stops."
pubDate: 2026-10-28
lang: en
slug: revenue-cloud-quoting-agent-agentforce
translationKey: revenue-cloud-quoting-agent
topic: revenue
categories: [revenue-cloud, ai]
tags: [revenue cloud, agentforce, quoting agent, quotes, flex credits, ai agents]
takeaways:
  - "The Revenue Cloud quoting agent creates, changes and summarises quotes from plain language, quotes only valid catalog products and keeps pricing and discounts within the system's guardrails."
  - "Salesforce reports 75 percent less quoting time and 87 percent fewer clicks for its own sales team; that is a vendor figure from one company, not a benchmark for machine builders."
  - "The agent is only as good as the catalog, the synced pricing data, the configuration rules and the approval limits behind it; these come first."
  - "Winter '27 extends agent quoting to customer self-service, partners in their own workspace and renewal drafts for account executives."
  - "Each agent action costs 20 Flex Credits, so a quote built in five actions costs about $0.50 at list price before prompts."
faq:
  - q: "What does the quoting agent in Revenue Cloud do?"
    a: "It creates, modifies and summarises quotes while respecting role-based access, quotes valid products according to catalog and fulfillment rules, keeps pricing and discounting within system guardrails and handles new business quotes, asset amendments and quote updates through the Quote Management subagent."
  - q: "What do I need before using the quoting agent?"
    a: "Revenue Cloud with a maintained product catalog, pricing data synced through Salesforce Pricing, Agentforce enabled and an employee agent with the Quote Management subagent. In practice also discount limits as rules and approval workflows that catch what the agent must not decide."
  - q: "Can dealers and customers use the quoting agent?"
    a: "Salesforce announced self-service quoting for customer buyers and integrated quoting for partners with Winter '27, generally available since 12 October 2026. Help also documents community and partner access for Agentforce in Revenue Management. Licences for external users need to be clarified separately."
  - q: "What does the quoting agent cost?"
    a: "Agent actions are billed in Flex Credits: 20 credits per standard action, with credits listed at $500 per 100,000. Prompts are billed on top depending on the model tier. You also need Revenue Cloud licences for the users the agent works for."
draft: false
---

The quoting agent in Revenue Cloud turns a request in plain language into a quote: it picks valid products from the catalog, prices them with Salesforce Pricing, applies discounts within the guardrails and can amend, summarise and email quotes. For an internal sales desk with standard products and clean pricing data, that saves real time. Before it goes live, you need a maintained catalog, synced prices, configuration rules in Salesforce and discount limits that approvals enforce. For configured machines whose rules live outside Salesforce, the agent cannot help yet.

## What does the Revenue Cloud quoting agent do?

Salesforce introduced agent quoting for Revenue Cloud in July 2025. In the [announcement](https://www.salesforce.com/news/stories/agentforce-for-revenue-announcement/), reps describe what they need, and the agent generates the quote, "automatically pulling the correct products, pricing, and terms". The headline numbers come from Salesforce's own sales team: 75 percent less quoting time and 87 percent fewer clicks. That is a vendor figure from one company with a very standardised catalog. I would not put it into a business case for a machine builder.

The [Trailhead quick start for a quoting agent](https://trailhead.salesforce.com/content/learn/projects/quick-start-build-an-agent-to-create-quotes-fast/build-your-first-agentforce-quoting-agent) is more precise about the scope. The agent:

- creates, modifies and summarises quotes and respects role-based access,
- follows product catalog and fulfillment rules, so it quotes only valid products,
- keeps pricing and discounting within system guardrails,
- handles new business quotes, amendments to assets and quote updates.

The work is done by the Quote Management subagent, whose actions are based on flows. In the exercise you ask for 15 headsets with 15 percent discount for an account and opportunity, then change the discount to 10 percent and email the quote with a template. Salesforce Help lists a second building block, the Product Selection subagent, for searching and filtering products. The product is called Revenue Cloud on salesforce.com; Help and Trailhead file the agent under Agentforce Revenue Management or Revenue Management.

## What has to be in place before the agent quotes?

The agent reads the same records your sales desk reads. What an experienced rep corrects by habit, the agent passes on. So the preparation is mostly data and rules work:

- **Catalog.** Every sellable product, option and spare part as a catalog entry with an active flag and a description a rep would type. How to model variants without copying the ERP material master is covered in the chapter [catalog, configurator, pricing](../../masterclass/revenue-cloud/product-catalog-configurator-pricing/).
- **Synced pricing data.** The Trailhead setup starts with Sync Pricing Data in Salesforce Pricing Setup. If prices are not synced, the agent quotes nothing useful.
- **Configuration rules in Salesforce.** The agent stays within catalog rules. If your rules sit in SAP variant configuration or in an engineer's head, the agent does not see them.
- **Discount limits as approvals.** The agent may apply a discount a rep asks for. Whether it needs approval should be decided by the approval workflow, as described in [discount approvals in Revenue Cloud](../revenue-cloud-discount-approvals/).
- **Agentforce setup.** Agentforce enabled, an employee agent with the Quote Management subagent and a permission set that grants agent access.

I would count the share of products that a rep can find by the words customers use. If it is low, fix that before the pilot.

## What changes with Winter '27?

The [Winter '27 announcement](https://www.salesforce.com/news/stories/winter-2027-product-release-announcement/), generally available since 12 October 2026, extends agent quoting to three groups: "self-service quoting for customer buyers, integrated quoting for partners, and automated renewal package assembly for account executives". Customers "order without a rep", partners "transact without leaving their workspace", and account executives get "a drafted quote and risk signals" before a renewal.

For manufacturers, renewal drafts are the most interesting part. Maintenance and remote monitoring subscriptions renew every year, and preparing the renewal quote is routine work. Partner and self-service quoting raise commercial questions first: which prices a dealer sees, and whether a customer's self-service quote may undercut the dealer. Help documents a setup page for community and partner access to Agentforce in Revenue Management; the licences for external users are a separate item to clarify.

If your dealers quote in Manufacturing Cloud instead, look at the [AI Partner Sales Assistant for dealer quotes](../ai-partner-sales-assistant-dealer-quotes/). Two quoting agents on two quote models is the setup I would avoid.

## What does the quoting agent cost?

Two cost blocks apply. First the Revenue Cloud licences for the users the agent works for. Second the agent's consumption in Flex Credits. The [Agentforce pricing page](https://www.salesforce.com/agentforce/pricing/) lists credits at $500 per 100,000, and a standard action uses 20 credits, so $0.10. Prompts come on top and depend on the model tier.

A rough estimate, as an assumption: a quote dialogue needs five actions, such as finding the account, searching products, creating the quote, adding lines and applying a discount. That is 100 credits or $0.50 per quote. At 1,500 agent quotes a month you are at about $750 plus prompts. Tests in a sandbox also consume credits. How to estimate all meters is in [Flex Credits: estimating Agentforce cost per action](../flex-credits-agentforce-cost-per-action/), and the AI masterclass chapter on [costs and tokens](../../masterclass/ai-salesforce/costs-and-tokens/) puts it into a budget.

## When is the quoting agent the wrong tool?

I would not use it, or not yet, in four situations:

1. **Engineered to order.** If each machine is designed for the order, the quote comes from engineering, not from a catalog.
2. **Rules outside Salesforce.** If configuration logic sits in SAP variant configuration or a PLM, the agent quotes combinations that cannot be built.
3. **Prices only in SAP conditions.** If Salesforce holds list prices and the net price comes from SAP, the agent quotes the wrong price unless pricing calls SAP.
4. **Few quotes with high value.** Ten quotes a month with weeks of negotiation do not need an agent; they need a good sales engineer.

## A typical scenario, as an assumption

A maker of packaging machines runs a sales desk that answers spare parts and retrofit requests from existing customers: wear part kits, upgrade packages and service hours. Prices are in Salesforce price books, synced from SAP every night, and the catalog has clean descriptions. The desk handles a large number of small quotes.

Here the agent fits well. A rep types "wear part kit for line 3 plus two service days, usual discount", and the agent finds the kit and the service item in the catalog and builds the quote for the customer's account. Discounts above the limit go to the approval workflow. New machine quotes stay with the sales engineers, because their configuration rules still live in SAP. The agent is introduced in one country first and tested with real requests from the last quarter.

## Where should you start?

Pick one quote type with standard products and synced prices, write 30 test requests from real cases and define the expected quote for each. Run them in a sandbox before any customer or dealer sees an agent quote, as described in [testing Agentforce agents before go-live](../testing-agentforce-agents-before-go-live/). Where agents fit in manufacturing beyond quoting is covered in the chapter [AI agents in manufacturing](../../masterclass/ai-salesforce/ai-agents-in-manufacturing/), and the whole path from quote to order in [quote, contract, order](../../masterclass/revenue-cloud/quote-contract-order/).

The quoting agent pays off where quotes are frequent, products are standard and the data is clean. If you want to check whether that applies to your sales desk, [send me a message](#contact).
